"""
backend/pipeline.py
--------------------------
Top-level pipeline: PDF → raw text → structured data → GitHub enrichment.
This is the single entry point your Next.js API route will call.
"""

from dataclasses import dataclass, field, asdict
from pathlib import Path

from parser import extract_text_from_pdf
from extractor import ResumeExtractor, ResumeData
from github_enricher import GitHubEnricher, GitHubProfile


@dataclass
class PortfolioData:
    """Final output — everything needed to render any portfolio template."""
    resume: ResumeData = field(default_factory=ResumeData)
    github: GitHubProfile | None = None
    raw_text: str = ""          # useful for debugging / re-extraction

    def to_dict(self) -> dict:
        result = {
            "resume": self.resume.to_dict(),
            "github": asdict(self.github) if self.github else None,
        }
        return result


class ResumePipeline:
    """
    Orchestrates the full parsing pipeline.

    Usage:
        pipeline = ResumePipeline()
        data = pipeline.run("path/to/resume.pdf")
        print(data.resume.contact.name)
        print(data.github.top_repos)
    """

    def __init__(
        self,
        github_token: str | None = None,
    ):
        self.extractor = ResumeExtractor()
        self.enricher = GitHubEnricher(token=github_token)

    # def __init__(
    #     self,
    #     anthropic_api_key: str | None = None,
    #     github_token: str | None = None,
    #     model: str = "claude-sonnet-4-6",
    # ):
    #     self.extractor = ResumeExtractor(api_key=anthropic_api_key, model=model)
    #     self.enricher = GitHubEnricher(token=github_token)

    def run(self, pdf_path: str, github_username: str | None = None) -> PortfolioData:
        """
        Full pipeline:
        1. Extract text from PDF
        2. Parse structured data via LLM
        3. Optionally enrich with GitHub data

        Args:
            pdf_path: Local path to the uploaded resume PDF.
            github_username: Optional override. If not provided, uses whatever
                             GitHub handle was found in the resume itself.

        Returns:
            PortfolioData ready for template rendering.
        """
        if not Path(pdf_path).exists():
            raise FileNotFoundError(f"PDF not found: {pdf_path}")

        # Step 1: Extract text
        print(f"[1/3] Extracting text from {pdf_path}...")
        raw_text = extract_text_from_pdf(pdf_path)

        # Step 2: LLM extraction
        print("[2/3] Running LLM extraction...")
        resume_data = self.extractor.extract(raw_text)

        # Step 3: GitHub enrichment
        handle = github_username or resume_data.contact.github
        github_data = None
        if handle:
            print(f"[3/3] Fetching GitHub data for '{handle}'...")
            github_data = self.enricher.fetch(handle)
            if github_data:
                # Merge GitHub projects into resume projects if not already there
                resume_data = self._merge_github_projects(resume_data, github_data)
        else:
            print("[3/3] No GitHub handle found — skipping enrichment.")

        return PortfolioData(
            resume=resume_data,
            github=github_data,
            raw_text=raw_text,
        )

    def _merge_github_projects(
        self, resume: ResumeData, github: GitHubProfile
    ) -> ResumeData:
        """
        If GitHub has repos that aren't mentioned in resume projects,
        add them. Avoids duplicates by checking repo name against existing project names.
        """
        from .extractor import Project

        existing_names = {p.name.lower() for p in resume.projects}

        for repo in github.top_repos:
            if repo.name.lower() not in existing_names:
                resume.projects.append(Project(
                    name=repo.name,
                    description=repo.description,
                    tech_stack=[repo.language] if repo.language else [],
                    github_url=repo.url,
                ))
                existing_names.add(repo.name.lower())

        return resume
