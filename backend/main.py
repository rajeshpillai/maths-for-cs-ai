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
TIER_PREFIXES = ("foundation-", "tier-", "vedic-", "supplementary-")


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
    slug: str | None = None


class LessonMeta(BaseModel):
    tier: str
    slug: str
    title: str
    prerequisites: list[Prerequisite]
    sections: list[str]


def _find_tier_dir(tier_name: str) -> Path | None:
    """Find a tier directory by name across all group folders."""
    for group_dir in TUTORIALS_DIR.iterdir():
        if not group_dir.is_dir():
            continue
        candidate = group_dir / tier_name
        if candidate.is_dir():
            return candidate
    return None


def _discover_tiers() -> list[Path]:
    """Find all tier directories inside group folders."""
    def tier_sort_key(p: Path) -> tuple[int, int]:
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
        elif name.startswith("vedic-"):
            return (0, 500)
        elif name.startswith("supplementary-"):
            return (1, hash(name) % 1000)
        return (2, 0)

    tiers = []
    for group_dir in sorted(TUTORIALS_DIR.iterdir()):
        if not group_dir.is_dir():
            continue
        for tier_dir in group_dir.iterdir():
            if tier_dir.is_dir() and any(tier_dir.name.startswith(p) for p in TIER_PREFIXES):
                tiers.append(tier_dir)
    return sorted(tiers, key=tier_sort_key)


def _resolve_slug(tier: str, lesson_num: str) -> str | None:
    tier_dir = _find_tier_dir(tier)
    if tier_dir is None:
        return None
    prefix = lesson_num.zfill(2)
    for f in tier_dir.glob(f"{prefix}-*.md"):
        return f.stem
    return None


def _parse_meta(tier: str, slug: str, content: str) -> LessonMeta:
    lines = content.split("\n")

    title = slug
    for line in lines:
        if line.startswith("# "):
            title = line[2:].strip()
            break

    prereqs: list[Prerequisite] = []
    in_prereqs = False
    prereq_re = re.compile(
        r"(?:Tier|Foundation)\s+(\d+),\s*Lesson\s+(\d+)(?::\s*(.+))?"
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
                kind = "foundation-" if "Foundation" in line else "tier-"
                tier_num, lesson_num, desc = m.group(1), m.group(2), m.group(3)
                prereq_tier = f"{kind}{tier_num}"
                resolved_slug = _resolve_slug(prereq_tier, lesson_num)
                prereqs.append(Prerequisite(
                    tier=prereq_tier,
                    lesson_num=lesson_num.zfill(2),
                    description=desc.strip() if desc else "",
                    slug=resolved_slug,
                ))

    sections = [line[3:].strip() for line in lines if line.startswith("## ")]

    return LessonMeta(
        tier=tier,
        slug=slug,
        title=title,
        prerequisites=prereqs,
        sections=sections,
    )


@app.get("/api/tiers", response_model=list[TierInfo])
def list_tiers():
    """Return every tier that has at least one .md file."""
    tiers: list[TierInfo] = []
    for tier_dir in _discover_tiers():
        lessons = sorted(f.stem for f in tier_dir.glob("*.md"))
        title = tier_dir.name.replace("-", " ").title()
        tiers.append(TierInfo(tier=tier_dir.name, title=title, lessons=lessons))
    return tiers


@app.get("/api/tiers/{tier}/{slug}", response_model=LessonContent)
def get_lesson(tier: str, slug: str):
    tier_dir = _find_tier_dir(tier)
    if tier_dir is None:
        raise HTTPException(status_code=404, detail="Lesson not found")
    md_path = tier_dir / f"{slug}.md"
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
    tier_dir = _find_tier_dir(tier)
    if tier_dir is None:
        raise HTTPException(status_code=404, detail="Lesson not found")
    md_path = tier_dir / f"{slug}.md"
    if not md_path.is_file():
        raise HTTPException(status_code=404, detail="Lesson not found")
    return _parse_meta(tier, slug, md_path.read_text())


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
