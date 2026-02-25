"""
resume_parser/github_enricher.py
---------------------------------
Enriches extracted resume data with live GitHub data.
Pulls pinned repos, top languages, and contribution stats via GitHub REST API.
No auth token required for public profiles (60 req/hr limit).
Pass a token via env var GITHUB_TOKEN for 5000 req/hr.
"""

import os
import re
import httpx
from dataclasses import dataclass, field


@dataclass
class GitHubRepo:
    name: str = ""
    description: str = ""
    url: str = ""
    stars: int = 0
    forks: int = 0
    language: str = ""
    topics: list[str] = field(default_factory=list)
    is_pinned: bool = False


@dataclass
class GitHubProfile:
    username: str = ""
    avatar_url: str = ""
    bio: str = ""
    followers: int = 0
    public_repos: int = 0
    top_languages: list[str] = field(default_factory=list)
    pinned_repos: list[GitHubRepo] = field(default_factory=list)
    top_repos: list[GitHubRepo] = field(default_factory=list)   # by stars if no pinned


class GitHubEnricher:
    """
    Fetches GitHub profile data to enrich portfolio generation.
    
    Usage:
        enricher = GitHubEnricher()
        profile = enricher.fetch("torvalds")
    """

    BASE_URL = "https://api.github.com"

    def __init__(self, token: str | None = None):
        self.token = token or os.environ.get("GITHUB_TOKEN")
        self.headers = {
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        }
        if self.token:
            self.headers["Authorization"] = f"Bearer {self.token}"

    def fetch(self, username: str) -> GitHubProfile | None:
        """
        Main entry point. Returns None if the profile doesn't exist
        or GitHub is unreachable (graceful degradation — don't break portfolio gen).
        """
        username = self._extract_username(username)
        if not username:
            return None

        try:
            with httpx.Client(headers=self.headers, timeout=10) as client:
                user_data = self._get_user(client, username)
                if not user_data:
                    return None

                repos = self._get_repos(client, username)
                pinned = self._get_pinned_repos(client, username)
                top_languages = self._get_top_languages(repos)

                # If no pinned repos detected, fall back to top 6 by stars
                top_repos = pinned if pinned else sorted(
                    repos, key=lambda r: r.stars, reverse=True
                )[:6]

                return GitHubProfile(
                    username=username,
                    avatar_url=user_data.get("avatar_url", ""),
                    bio=user_data.get("bio", "") or "",
                    followers=user_data.get("followers", 0),
                    public_repos=user_data.get("public_repos", 0),
                    top_languages=top_languages,
                    pinned_repos=pinned,
                    top_repos=top_repos,
                )
        except Exception:
            # GitHub enrichment is optional — never crash portfolio generation
            return None

    def _extract_username(self, raw: str) -> str:
        """
        Handle various GitHub input formats:
        - "torvalds"
        - "https://github.com/torvalds"
        - "github.com/torvalds"
        """
        if not raw:
            return ""
        match = re.search(r"github\.com/([a-zA-Z0-9\-]+)", raw)
        if match:
            return match.group(1)
        # Assume it's already a plain username
        return raw.strip().lstrip("@")

    def _get_user(self, client: httpx.Client, username: str) -> dict | None:
        resp = client.get(f"{self.BASE_URL}/users/{username}")
        if resp.status_code == 200:
            return resp.json()
        return None

    def _get_repos(self, client: httpx.Client, username: str) -> list[GitHubRepo]:
        """Fetch all public repos (up to 100, sorted by updated)."""
        resp = client.get(
            f"{self.BASE_URL}/users/{username}/repos",
            params={"per_page": 100, "sort": "updated", "type": "owner"}
        )
        if resp.status_code != 200:
            return []

        repos = []
        for r in resp.json():
            if r.get("fork"):  # skip forks
                continue
            repos.append(GitHubRepo(
                name=r.get("name", ""),
                description=r.get("description", "") or "",
                url=r.get("html_url", ""),
                stars=r.get("stargazers_count", 0),
                forks=r.get("forks_count", 0),
                language=r.get("language", "") or "",
                topics=r.get("topics", []),
            ))
        return repos

    def _get_pinned_repos(self, client: httpx.Client, username: str) -> list[GitHubRepo]:
        """
        GitHub REST API doesn't expose pinned repos — use the GraphQL API.
        Returns empty list if token is missing (GraphQL requires auth).
        """
        if not self.token:
            return []

        query = """
        query($login: String!) {
          user(login: $login) {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  name
                  description
                  url
                  stargazerCount
                  forkCount
                  primaryLanguage { name }
                  repositoryTopics(first: 5) {
                    nodes { topic { name } }
                  }
                }
              }
            }
          }
        }
        """
        resp = client.post(
            "https://api.github.com/graphql",
            json={"query": query, "variables": {"login": username}},
        )
        if resp.status_code != 200:
            return []

        try:
            nodes = resp.json()["data"]["user"]["pinnedItems"]["nodes"]
            return [
                GitHubRepo(
                    name=n.get("name", ""),
                    description=n.get("description", "") or "",
                    url=n.get("url", ""),
                    stars=n.get("stargazerCount", 0),
                    forks=n.get("forkCount", 0),
                    language=(n.get("primaryLanguage") or {}).get("name", ""),
                    topics=[
                        t["topic"]["name"]
                        for t in n.get("repositoryTopics", {}).get("nodes", [])
                    ],
                    is_pinned=True,
                )
                for n in nodes
            ]
        except (KeyError, TypeError):
            return []

    def _get_top_languages(self, repos: list[GitHubRepo], top_n: int = 5) -> list[str]:
        """Rank languages by how many repos use them."""
        lang_count: dict[str, int] = {}
        for repo in repos:
            if repo.language:
                lang_count[repo.language] = lang_count.get(repo.language, 0) + 1

        sorted_langs = sorted(lang_count, key=lang_count.get, reverse=True)
        return sorted_langs[:top_n]
