# Resume Parser — PDF → Structured Portfolio Data

The core parsing pipeline for the portfolio generator. Takes a PDF resume and returns clean, structured JSON ready for template rendering.

## Architecture

```
PDF file
   │
   ▼
parser.py          ← pdfplumber (primary) + PyMuPDF (fallback)
   │ raw text
   ▼
extractor.py       ← Claude API extracts structured JSON
   │ ResumeData
   ▼
github_enricher.py ← GitHub REST + GraphQL API enrichment
   │ GitHubProfile
   ▼
pipeline.py        ← Orchestrates all three steps → PortfolioData
   │
   ▼
api.py             ← FastAPI endpoint for your Next.js frontend
```

## Quickstart

```bash
pip install -r requirements.txt

# Set env vars
cp .env.example .env
# Add ANTHROPIC_API_KEY and optionally GITHUB_TOKEN

# Run the API server
uvicorn resume_parser.api:app --reload --port 8000
```

## Usage in code

```python
from resume_parser import ResumePipeline

pipeline = ResumePipeline()
data = pipeline.run("resume.pdf", github_username="yourusername")

print(data.resume.contact.name)       # "Jane Doe"
print(data.resume.skills)             # ["Python", "React", "AWS", ...]
print(data.resume.experience[0].role) # "Senior Software Engineer"
print(data.github.top_repos[0].name)  # "awesome-project"

# Serialize to dict for JSON response
print(data.to_dict())
```

## Output Schema

```json
{
  "resume": {
    "contact": {
      "name": "", "email": "", "phone": "",
      "location": "", "linkedin": "", "github": "", "website": ""
    },
    "summary": "",
    "skills": [],
    "experience": [{
      "company": "", "role": "", "duration": "",
      "location": "", "highlights": []
    }],
    "projects": [{
      "name": "", "description": "",
      "tech_stack": [], "url": "", "github_url": ""
    }],
    "education": [{
      "institution": "", "degree": "",
      "field_of_study": "", "graduation_year": "", "gpa": ""
    }],
    "certifications": [],
    "languages": []
  },
  "github": {
    "username": "", "avatar_url": "", "bio": "",
    "followers": 0, "public_repos": 0,
    "top_languages": [],
    "pinned_repos": [],
    "top_repos": []
  }
}
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | ✅ Yes | Claude API key for LLM extraction |
| `GITHUB_TOKEN` | Optional | Enables pinned repo fetching + higher rate limits |
| `FRONTEND_URL` | Optional | CORS origin for your Next.js app (default: localhost:3000) |

## Design Decisions

**Why pdfplumber over PyPDF2?** pdfplumber preserves layout and handles multi-column resumes far better. PyMuPDF is kept as a fallback for edge cases.

**Why not regex for extraction?** Resume formats are wildly inconsistent. LLM extraction handles everything from "Work Experience" to "Where I've Worked" to "Career History" without brittle pattern matching.

**Why graceful GitHub failure?** GitHub enrichment is a nice-to-have. If the API is down or the user has no GitHub, the portfolio still generates — just without the extra data.
