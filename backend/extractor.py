"""
backend/extractor.py
--------------------------
Uses Ollama (local) to extract structured data from raw resume text.
Returns a clean, typed ResumeData object ready for portfolio generation.
No API key required — runs 100% locally.
"""

import json
import re
import os
import httpx
from dataclasses import dataclass, field, asdict


# ─── Data Models ─────────────────────────────────────────────────────────────

@dataclass
class ContactInfo:
    name: str = ""
    email: str = ""
    phone: str = ""
    location: str = ""
    linkedin: str = ""
    github: str = ""
    website: str = ""


@dataclass
class Experience:
    company: str = ""
    role: str = ""
    duration: str = ""          # e.g. "Jan 2022 – Present"
    location: str = ""
    highlights: list[str] = field(default_factory=list)


@dataclass
class Project:
    name: str = ""
    description: str = ""
    tech_stack: list[str] = field(default_factory=list)
    url: str = ""
    github_url: str = ""


@dataclass
class Education:
    institution: str = ""
    degree: str = ""
    field_of_study: str = ""
    graduation_year: str = ""
    gpa: str = ""


@dataclass
class ResumeData:
    contact: ContactInfo = field(default_factory=ContactInfo)
    summary: str = ""
    skills: list[str] = field(default_factory=list)
    experience: list[Experience] = field(default_factory=list)
    projects: list[Project] = field(default_factory=list)
    education: list[Education] = field(default_factory=list)
    certifications: list[str] = field(default_factory=list)
    languages: list[str] = field(default_factory=list)

    def to_dict(self) -> dict:
        return asdict(self)


# ─── Prompts ──────────────────────────────────────────────────────────────────

EXTRACTION_SYSTEM_PROMPT = """You are an expert resume parser. Extract structured information from resume text and return it as valid JSON.

Rules:
- Extract ONLY what is explicitly present. Do not infer or fabricate data.
- If a field is missing, use an empty string "" or empty array [].
- For skills, extract individual skills as a flat list (e.g. ["Python", "React", "AWS"]).
- For experience highlights, keep the original bullet point wording but clean up formatting.
- Normalize dates to "Month YYYY" format where possible (e.g. "Jan 2022").
- For GitHub/LinkedIn, extract just the URL or handle — whichever is present.
- Return ONLY the JSON object, no explanation, no markdown."""

EXTRACTION_USER_PROMPT = """Extract structured data from this resume text and return a JSON object matching EXACTLY this schema:

{{
  "contact": {{
    "name": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "github": "",
    "website": ""
  }},
  "summary": "",
  "skills": [],
  "experience": [
    {{
      "company": "",
      "role": "",
      "duration": "",
      "location": "",
      "highlights": []
    }}
  ],
  "projects": [
    {{
      "name": "",
      "description": "",
      "tech_stack": [],
      "url": "",
      "github_url": ""
    }}
  ],
  "education": [
    {{
      "institution": "",
      "degree": "",
      "field_of_study": "",
      "graduation_year": "",
      "gpa": ""
    }}
  ],
  "certifications": [],
  "languages": []
}}

Resume text:
---
{resume_text}
---"""


# ─── Extractor ────────────────────────────────────────────────────────────────

class ResumeExtractor:
    """
    Extracts structured resume data using a local Ollama model.

    Usage:
        extractor = ResumeExtractor()
        data = extractor.extract(raw_text)
    """

    def __init__(
        self,
        model: str | None = None,
        base_url: str | None = None,
    ):
        self.model = model or os.environ.get("OLLAMA_MODEL", "llama3.1")
        self.base_url = base_url or os.environ.get("OLLAMA_BASE_URL", "http://localhost:11434")

    def extract(self, resume_text: str) -> ResumeData:
        """Main entry point. Takes raw resume text, returns a ResumeData object."""
        if not resume_text.strip():
            raise ValueError("Resume text is empty — PDF extraction may have failed.")

        raw_json = self._call_ollama(resume_text)
        parsed = self._parse_response(raw_json)
        return self._dict_to_resume_data(parsed)

    def _call_ollama(self, resume_text: str) -> str:
        """Send resume text to local Ollama and get back a JSON string."""

        # Truncate very long resumes to avoid context limits
        if len(resume_text) > 12000:
            resume_text = resume_text[:12000] + "\n[truncated...]"

        prompt = EXTRACTION_SYSTEM_PROMPT + "\n\n" + EXTRACTION_USER_PROMPT.format(
            resume_text=resume_text
        )

        response = httpx.post(
            f"{self.base_url}/api/generate",
            json={
                "model": self.model,
                "prompt": prompt,
                "stream": False,
                "format": "json",   # forces Ollama to output valid JSON
            },
            timeout=500,            # local models can be slow, give them time
        )
        response.raise_for_status()
        return response.json()["response"]

    def _parse_response(self, raw: str) -> dict:
        """Parse LLM response into a dict, stripping markdown fences if present."""
        raw = raw.strip()
        if raw.startswith("```"):
            raw = re.sub(r"^```(?:json)?\n?", "", raw)
            raw = re.sub(r"\n?```$", "", raw)

        try:
            return json.loads(raw)
        except json.JSONDecodeError as e:
            raise ValueError(f"LLM returned invalid JSON: {e}\n\nRaw response:\n{raw}")

    def _dict_to_resume_data(self, data: dict) -> ResumeData:
        """Map raw dict to typed ResumeData dataclass."""
        contact_raw = data.get("contact", {})
        contact = ContactInfo(
            name=contact_raw.get("name", ""),
            email=contact_raw.get("email", ""),
            phone=contact_raw.get("phone", ""),
            location=contact_raw.get("location", ""),
            linkedin=contact_raw.get("linkedin", ""),
            github=contact_raw.get("github", ""),
            website=contact_raw.get("website", ""),
        )

        experience = [
            Experience(
                company=e.get("company", ""),
                role=e.get("role", ""),
                duration=e.get("duration", ""),
                location=e.get("location", ""),
                highlights=e.get("highlights", []),
            )
            for e in data.get("experience", [])
        ]

        projects = [
            Project(
                name=p.get("name", ""),
                description=p.get("description", ""),
                tech_stack=p.get("tech_stack", []),
                url=p.get("url", ""),
                github_url=p.get("github_url", ""),
            )
            for p in data.get("projects", [])
        ]

        education = [
            Education(
                institution=e.get("institution", ""),
                degree=e.get("degree", ""),
                field_of_study=e.get("field_of_study", ""),
                graduation_year=e.get("graduation_year", ""),
                gpa=e.get("gpa", ""),
            )
            for e in data.get("education", [])
        ]

        return ResumeData(
            contact=contact,
            summary=data.get("summary", ""),
            skills=data.get("skills", []),
            experience=experience,
            projects=projects,
            education=education,
            certifications=data.get("certifications", []),
            languages=data.get("languages", []),
        )
