import re
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel

app = FastAPI(title="Maths for CS + AI/ML — API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

TUTORIALS_DIR = Path(__file__).resolve().parent.parent / "tutorials"

# Sort order
GROUP_ORDER = {
    "01-foundations": 0, "02-core-mathematics": 1, "03-applied-ml": 2,
    "04-specializations": 3, "05-university": 4, "06-formal-mathematics": 5,
    "07-supplementary": 6,
}

TIER_ORDER = {
    "foundation-1": 0, "foundation-2": 1, "foundation-3": 2, "foundation-4": 3,
    "number-systems": 0, "discrete-mathematics": 1, "linear-algebra": 2,
    "calculus": 3, "probability-statistics": 4,
    "optimisation": 0, "neural-networks": 1, "cnns": 2,
    "geometry-trigonometry": 0, "fourier-analysis": 1, "advanced-ml": 2,
    "jee-problem-solving": 3, "vedic-maths": 4,
    "differential-equations": 0, "multivariable-calculus": 1,
    "advanced-discrete-math": 2, "advanced-statistics": 3,
    "methods-of-proof": 0, "abstract-algebra": 1,
    "supplementary-activations": 0, "supplementary-graphs": 1,
    "supplementary-foundations": 2, "supplementary-applied": 3,
}

PREREQ_MAP = {
    "tier-0": "number-systems", "tier-1": "discrete-mathematics",
    "tier-2": "linear-algebra", "tier-3": "calculus",
    "tier-4": "probability-statistics", "tier-5": "optimisation",
    "tier-6": "neural-networks", "tier-7": "cnns",
    "tier-8": "geometry-trigonometry", "tier-9": "fourier-analysis",
    "tier-10": "advanced-ml", "tier-11": "differential-equations",
    "tier-12": "multivariable-calculus", "tier-13": "advanced-discrete-math",
    "tier-14": "advanced-statistics", "tier-15": "methods-of-proof",
    "tier-16": "abstract-algebra", "tier-17": "jee-problem-solving",
    "foundation-1": "foundation-1", "foundation-2": "foundation-2",
    "foundation-3": "foundation-3", "foundation-4": "foundation-4",
}


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
    for group_dir in TUTORIALS_DIR.iterdir():
        if not group_dir.is_dir():
            continue
        candidate = group_dir / tier_name
        if candidate.is_dir():
            return candidate
    return None


def _discover_tiers() -> list[Path]:
    tiers = []
    for group_dir in sorted(TUTORIALS_DIR.iterdir()):
        if not group_dir.is_dir() or group_dir.name.startswith("."):
            continue
        group_order = GROUP_ORDER.get(group_dir.name, 99)
        for tier_dir in group_dir.iterdir():
            if tier_dir.is_dir() and any(tier_dir.glob("*.md")):
                tier_order = TIER_ORDER.get(tier_dir.name, 99)
                tiers.append((group_order, tier_order, tier_dir))
    tiers.sort(key=lambda x: (x[0], x[1]))
    return [t[2] for t in tiers]


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
    prereq_re = re.compile(r"(?:Tier|Foundation)\s+(\d+),\s*Lesson\s+(\d+)(?::\s*(.+))?")
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
                old_tier = f"{kind}{tier_num}"
                new_tier = PREREQ_MAP.get(old_tier, old_tier)
                resolved_slug = _resolve_slug(new_tier, lesson_num)
                prereqs.append(Prerequisite(
                    tier=new_tier,
                    lesson_num=lesson_num.zfill(2),
                    description=desc.strip() if desc else "",
                    slug=resolved_slug,
                ))

    sections = [line[3:].strip() for line in lines if line.startswith("## ")]

    return LessonMeta(tier=tier, slug=slug, title=title,
                      prerequisites=prereqs, sections=sections)


@app.get("/api/tiers", response_model=list[TierInfo])
@app.get("/api/tiers.json", response_model=list[TierInfo])
def list_tiers():
    tiers: list[TierInfo] = []
    for tier_dir in _discover_tiers():
        lessons = sorted(f.stem for f in tier_dir.glob("*.md"))
        title = tier_dir.name.replace("-", " ").title()
        tiers.append(TierInfo(tier=tier_dir.name, title=title, lessons=lessons))
    return tiers


@app.get("/api/tiers/{tier}/{slug}")
def get_lesson(tier: str, slug: str):
    is_meta = False
    if slug.endswith(".json"):
        slug = slug[:-5]
    if slug.endswith(".meta"):
        slug = slug[:-5]
        is_meta = True
    tier_dir = _find_tier_dir(tier)
    if tier_dir is None:
        raise HTTPException(status_code=404, detail="Lesson not found")
    md_path = tier_dir / f"{slug}.md"
    if not md_path.is_file():
        raise HTTPException(status_code=404, detail="Lesson not found")
    content = md_path.read_text()
    if is_meta:
        return _parse_meta(tier, slug, content)
    return LessonContent(tier=tier, slug=slug, filename=md_path.name,
                         content=content)


@app.get("/api/tiers/{tier}/{slug}/meta", response_model=LessonMeta)
def get_lesson_meta(tier: str, slug: str):
    tier_dir = _find_tier_dir(tier)
    if tier_dir is None:
        raise HTTPException(status_code=404, detail="Lesson not found")
    md_path = tier_dir / f"{slug}.md"
    if not md_path.is_file():
        raise HTTPException(status_code=404, detail="Lesson not found")
    return _parse_meta(tier, slug, md_path.read_text())


_CURRICULUM_FILES = {
    "learning-paths.json",
    "ml-curriculum.json",
    "jee-curriculum.json",
}


def _extract_search_text(content: str) -> str:
    lines = content.split("\n")
    result: list[str] = []
    in_code = False
    for line in lines:
        if line.strip().startswith("```"):
            in_code = not in_code
            continue
        if in_code:
            continue
        if line.strip().startswith("$$"):
            continue
        clean = re.sub(r"\$[^$]+\$", "", line)
        clean = re.sub(r"[#*_`|>]", "", clean)
        clean = clean.strip()
        if clean:
            result.append(clean)
    return " ".join(result)


@app.get("/api/search-index.json")
def get_search_index():
    index: list[dict] = []
    for tier_dir in _discover_tiers():
        for lesson_file in sorted(tier_dir.glob("*.md")):
            slug = lesson_file.stem
            content = lesson_file.read_text()
            meta = _parse_meta(tier_dir.name, slug, content)
            index.append({
                "tier": tier_dir.name,
                "slug": slug,
                "title": meta.title,
                "sections": meta.sections,
                "text": _extract_search_text(content),
            })
    return index


@app.get("/api/{filename}")
def get_curriculum_file(filename: str):
    if filename not in _CURRICULUM_FILES:
        raise HTTPException(status_code=404, detail="Not found")
    path = TUTORIALS_DIR / filename
    if not path.is_file():
        raise HTTPException(status_code=404, detail="Not found")
    return FileResponse(path, media_type="application/json")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
