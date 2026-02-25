"""
resume_parser/parser.py
-----------------------
PDF text extraction using pdfplumber (primary) with PyMuPDF as fallback.
Handles messy layouts, multi-column resumes, and scanned PDFs gracefully.
"""

import re
import pdfplumber
import fitz  # PyMuPDF fallback


def extract_text_from_pdf(file_path: str) -> str:
    """
    Extract raw text from a PDF resume.
    Tries pdfplumber first (better for structured/formatted PDFs),
    falls back to PyMuPDF for edge cases.
    """
    text = _extract_with_pdfplumber(file_path)

    # If pdfplumber returns too little text, try PyMuPDF
    if len(text.strip()) < 100:
        text = _extract_with_pymupdf(file_path)

    return _clean_text(text)


def _extract_with_pdfplumber(file_path: str) -> str:
    """
    pdfplumber is best for resumes with tables, columns, and structured layouts.
    We sort words by their vertical (top) position to preserve reading order.
    """
    full_text = []

    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            # Crop out headers/footers (top 5% and bottom 5% of page)
            cropped = page.within_bbox((
                0,
                page.height * 0.05,
                page.width,
                page.height * 0.95
            ))

            # Extract words with position data for smarter ordering
            words = cropped.extract_words(
                x_tolerance=3,
                y_tolerance=3,
                keep_blank_chars=False,
                use_text_flow=True,
            )

            if not words:
                continue

            # Group words into lines based on vertical proximity
            lines = _group_words_into_lines(words, y_tolerance=5)
            page_text = "\n".join(" ".join(w["text"] for w in line) for line in lines)
            full_text.append(page_text)

    return "\n\n".join(full_text)


def _group_words_into_lines(words: list[dict], y_tolerance: int = 5) -> list[list[dict]]:
    """Group words that share roughly the same vertical position into lines."""
    if not words:
        return []

    sorted_words = sorted(words, key=lambda w: (round(w["top"] / y_tolerance), w["x0"]))
    lines = []
    current_line = [sorted_words[0]]

    for word in sorted_words[1:]:
        last = current_line[-1]
        if abs(word["top"] - last["top"]) <= y_tolerance:
            current_line.append(word)
        else:
            lines.append(current_line)
            current_line = [word]

    lines.append(current_line)
    return lines


def _extract_with_pymupdf(file_path: str) -> str:
    """PyMuPDF fallback — faster, handles more PDF variants including some scanned ones."""
    doc = fitz.open(file_path)
    pages_text = []

    for page in doc:
        text = page.get_text("text")  # plain text, preserves layout
        pages_text.append(text)

    doc.close()
    return "\n\n".join(pages_text)


def _clean_text(text: str) -> str:
    """
    Normalize extracted text:
    - Remove excessive whitespace/blank lines
    - Fix ligatures (ﬁ → fi, ﬂ → fl)
    - Normalize Unicode punctuation
    """
    # Common PDF ligature artifacts
    ligatures = {
        "\ufb01": "fi", "\ufb02": "fl", "\ufb00": "ff",
        "\ufb03": "ffi", "\ufb04": "ffl", "\u2019": "'",
        "\u2018": "'", "\u201c": '"', "\u201d": '"',
        "\u2013": "-", "\u2014": "-", "\u00a0": " ",
    }
    for char, replacement in ligatures.items():
        text = text.replace(char, replacement)

    # Collapse 3+ consecutive newlines into 2
    text = re.sub(r"\n{3,}", "\n\n", text)

    # Remove lines that are just punctuation or single characters (page artifacts)
    lines = text.split("\n")
    cleaned = [line for line in lines if len(line.strip()) > 1 or line.strip().isalpha()]
    text = "\n".join(cleaned)

    return text.strip()
