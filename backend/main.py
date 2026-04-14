import re
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Maths for CS — API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

TUTORIALS_DIR = Path(__file__).resolve().parent.parent / "tutorials"


class TierInfo(BaseModel):
    tier: str
    title: str
    lessons: list[str]


class LessonContent(BaseModel):
    tier: str
    slug: str
    filename: str
    content: str


class Prerequisite(BaseModel):
    tier: str
    lesson_num: str
    description: str
    slug: str | None = None  # resolved slug if found


class LessonMeta(BaseModel):
    tier: str
    slug: str
    title: str
    prerequisites: list[Prerequisite]
    sections: list[str]


def _parse_meta(tier: str, slug: str, content: str) -> LessonMeta:
    """Extract metadata from lesson markdown."""
    lines = content.split("\n")

    # Title: first H1
    title = slug
    for line in lines:
        if line.startswith("# "):
            title = line[2:].strip()
            break

    # Prerequisites: between "## Prerequisites" and next "##"
    prereqs: list[Prerequisite] = []
    in_prereqs = False
    prereq_re = re.compile(
        r"Tier\s+(\d+),\s*Lesson\s+(\d+)(?::\s*(.+))?"
    )
    for line in lines:
        if line.strip().startswith("## Prerequisites"):
            in_prereqs = True
            continue
        if in_prereqs and line.startswith("## "):
            break
        if in_prereqs and line.strip().startswith("- "):
            m = prereq_re.search(line)
            if m:
                tier_num, lesson_num, desc = m.group(1), m.group(2), m.group(3)
                prereq_tier = f"tier-{tier_num}"
                # Try to resolve slug
                resolved_slug = _resolve_slug(prereq_tier, lesson_num)
                prereqs.append(Prerequisite(
                    tier=prereq_tier,
                    lesson_num=lesson_num.zfill(2),
                    description=desc.strip() if desc else "",
                    slug=resolved_slug,
                ))

    # Sections: all H2 headings
    sections = [
        line[3:].strip()
        for line in lines
        if line.startswith("## ")
    ]

    return LessonMeta(
        tier=tier,
        slug=slug,
        title=title,
        prerequisites=prereqs,
        sections=sections,
    )


def _resolve_slug(tier: str, lesson_num: str) -> str | None:
    """Find the full slug for a lesson number within a tier."""
    tier_dir = TUTORIALS_DIR / tier
    if not tier_dir.is_dir():
        return None
    prefix = lesson_num.zfill(2)
    for f in tier_dir.glob(f"{prefix}-*.md"):
        return f.stem
    return None


@app.get("/api/tiers", response_model=list[TierInfo])
def list_tiers():
    """Return every tier that has at least one .md file."""
    tiers: list[TierInfo] = []
    def tier_sort_key(p: Path) -> tuple[int, int]:
        """Sort tiers: foundation first, then tiers, then supplementary."""
        name = p.name
        if name.startswith("foundation-"):
            try:
                return (-1, int(name.split("-", 1)[1]))
            except (IndexError, ValueError):
                return (-1, 999)
        elif name.startswith("tier-"):
            try:
                return (0, int(name.split("-", 1)[1]))
            except (IndexError, ValueError):
                return (0, 999)
        elif name.startswith("supplementary-"):
            return (1, hash(name) % 1000)
        return (2, 0)

    for tier_dir in sorted(TUTORIALS_DIR.iterdir(), key=tier_sort_key):
        if not tier_dir.is_dir():
            continue
        if not (tier_dir.name.startswith("foundation-") or tier_dir.name.startswith("tier-") or tier_dir.name.startswith("supplementary-")):
            continue
        lessons = sorted(f.stem for f in tier_dir.glob("*.md"))
        title = tier_dir.name.replace("-", " ").title()
        tiers.append(TierInfo(tier=tier_dir.name, title=title, lessons=lessons))
    return tiers


@app.get("/api/tiers/{tier}/{slug}", response_model=LessonContent)
def get_lesson(tier: str, slug: str):
    """Return the raw markdown for a single lesson."""
    md_path = TUTORIALS_DIR / tier / f"{slug}.md"
    if not md_path.is_file():
        raise HTTPException(status_code=404, detail="Lesson not found")
    return LessonContent(
        tier=tier,
        slug=slug,
        filename=md_path.name,
        content=md_path.read_text(),
    )


@app.get("/api/tiers/{tier}/{slug}/meta", response_model=LessonMeta)
def get_lesson_meta(tier: str, slug: str):
    """Return structured metadata for a lesson (title, prerequisites, sections)."""
    md_path = TUTORIALS_DIR / tier / f"{slug}.md"
    if not md_path.is_file():
        raise HTTPException(status_code=404, detail="Lesson not found")
    return _parse_meta(tier, slug, md_path.read_text())


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
