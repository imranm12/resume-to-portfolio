"""
api/parse_resume.py
--------------------
FastAPI endpoint that accepts a PDF upload and returns structured portfolio data.
Wire this up as a Next.js API route or deploy as a standalone microservice.

Run locally:
    uvicorn api.parse_resume:app --reload --port 8000

Then POST to:
    curl -X POST http://localhost:8000/api/parse-resume \
      -F "file=@resume.pdf" \
      -F "github_username=yourusername"
"""

import os
import tempfile
from pathlib import Path

from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from backend import ResumePipeline

app = FastAPI(title="Resume Parser API", version="1.0.0")

# Allow requests from your Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("FRONTEND_URL", "http://localhost:3000"),
    ],
    allow_methods=["POST"],
    allow_headers=["*"],
)

pipeline = ResumePipeline(
    anthropic_api_key=os.getenv("ANTHROPIC_API_KEY"),
    github_token=os.getenv("GITHUB_TOKEN"),
)


@app.post("/api/parse-resume")
async def parse_resume(
    file: UploadFile = File(...),
    github_username: str = Form(default=""),
):
    # Validate file type
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    # Validate file size (max 10MB)
    MAX_SIZE = 10 * 1024 * 1024
    contents = await file.read()
    if len(contents) > MAX_SIZE:
        raise HTTPException(status_code=400, detail="File too large. Max 10MB.")

    # Write to a temp file (pipeline expects a file path)
    with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as tmp:
        tmp.write(contents)
        tmp_path = tmp.name

    try:
        data = pipeline.run(
            pdf_path=tmp_path,
            github_username=github_username or None,
        )
        return data.to_dict()

    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Parsing failed: {str(e)}")

    finally:
        Path(tmp_path).unlink(missing_ok=True)


@app.get("/health")
def health():
    return {"status": "ok"}
