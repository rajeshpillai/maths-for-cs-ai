import json
import re
from pathlib import Path

import yaml
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

STRAND_LEVEL_ORDER = {
    "foundation": 0, "intermediate": 1, "advanced": 2,
    "master": 3, "research": 4,
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
    strand: str | None = None
    level: str | None = None
    connections: list[str] = []
    applications: list[dict] = []


_FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?\n)---\s*\n", re.DOTALL)


def _parse_frontmatter(content: str) -> tuple[dict, str]:
    """Split YAML frontmatter from body. Returns ({}, content) when absent."""
    m = _FRONTMATTER_RE.match(content)
    if not m:
        return {}, content
    try:
        meta = yaml.safe_load(m.group(1)) or {}
    except yaml.YAMLError:
        return {}, content
    return (meta if isinstance(meta, dict) else {}), content[m.end():]


def _tier_id(tier_dir: Path) -> str:
    parent = tier_dir.parent
    if parent.name.startswith("strand-"):
        return f"{parent.name}-{tier_dir.name}"
    return tier_dir.name


def _find_tier_dir(tier_name: str) -> Path | None:
    """Resolve a tier id back to its directory.

    Accepts both legacy ids (`number-systems`) and synthesized strand ids
    (`strand-1-number-quantity-foundation`).
    """
    for top in TUTORIALS_DIR.iterdir():
        if not top.is_dir():
            continue
        if top.name.startswith("strand-") and tier_name.startswith(top.name + "-"):
            level = tier_name[len(top.name) + 1:]
            candidate = top / level
            if candidate.is_dir():
                return candidate
            continue
        candidate = top / tier_name
        if candidate.is_dir():
            return candidate
    return None


def _discover_tiers() -> list[Path]:
    tiers = []
    for top in sorted(TUTORIALS_DIR.iterdir()):
        if not top.is_dir() or top.name.startswith("."):
            continue
        if top.name.startswith("strand-"):
            for level_dir in top.iterdir():
                if level_dir.is_dir() and any(level_dir.glob("*.md")):
                    tiers.append((-1, STRAND_LEVEL_ORDER.get(level_dir.name, 99), level_dir))
            continue
        group_order = GROUP_ORDER.get(top.name, 99)
        for tier_dir in top.iterdir():
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


def _parse_meta(tier: str, slug: str, content: str, fm: dict | None = None) -> LessonMeta:
    fm = fm or {}
    lines = content.split("\n")

    title = fm.get("title")
    if not title:
        title = slug
        for line in lines:
            if line.startswith("# "):
                title = line[2:].strip()
                break

    prereqs: list[Prerequisite] = []
    if "prerequisites" in fm and isinstance(fm["prerequisites"], list):
        for entry in fm["prerequisites"]:
            if isinstance(entry, str) and "/" in entry:
                t, s = entry.split("/", 1)
                num_match = re.match(r"(\d+)", s)
                prereqs.append(Prerequisite(
                    tier=t,
                    lesson_num=(num_match.group(1).zfill(2) if num_match else ""),
                    description="",
                    slug=s,
                ))
            elif isinstance(entry, dict):
                t = entry.get("tier", "")
                s = entry.get("slug")
                num_match = re.match(r"(\d+)", s or "")
                prereqs.append(Prerequisite(
                    tier=t,
                    lesson_num=(num_match.group(1).zfill(2) if num_match else ""),
                    description=entry.get("description", ""),
                    slug=s,
                ))
    else:
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

    return LessonMeta(
        tier=tier, slug=slug, title=title,
        prerequisites=prereqs, sections=sections,
        strand=fm.get("strand"),
        level=fm.get("level"),
        connections=fm.get("connections", []),
        applications=fm.get("applications", []),
    )


@app.get("/api/tiers", response_model=list[TierInfo])
@app.get("/api/tiers.json", response_model=list[TierInfo])
def list_tiers():
    tiers: list[TierInfo] = []
    for tier_dir in _discover_tiers():
        tid = _tier_id(tier_dir)
        lessons = sorted(f.stem for f in tier_dir.glob("*.md"))
        title = tid.replace("-", " ").title()
        tiers.append(TierInfo(tier=tid, title=title, lessons=lessons))
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
    fm, body = _parse_frontmatter(md_path.read_text())
    if is_meta:
        return _parse_meta(tier, slug, body, fm)
    return LessonContent(tier=tier, slug=slug, filename=md_path.name,
                         content=body)


@app.get("/api/tiers/{tier}/{slug}/meta", response_model=LessonMeta)
def get_lesson_meta(tier: str, slug: str):
    tier_dir = _find_tier_dir(tier)
    if tier_dir is None:
        raise HTTPException(status_code=404, detail="Lesson not found")
    md_path = tier_dir / f"{slug}.md"
    if not md_path.is_file():
        raise HTTPException(status_code=404, detail="Lesson not found")
    fm, body = _parse_frontmatter(md_path.read_text())
    return _parse_meta(tier, slug, body, fm)


@app.get("/api/strands.json")
def list_strands():
    """Strand index: one entry per tutorials/strand-* directory."""
    strands: list[dict] = []
    for strand_root in sorted(TUTORIALS_DIR.glob("strand-*")):
        if not strand_root.is_dir():
            continue
        manifest_path = strand_root / "strand.json"
        manifest: dict = {}
        if manifest_path.is_file():
            try:
                manifest = json.loads(manifest_path.read_text())
            except json.JSONDecodeError:
                manifest = {}
        levels = []
        for level_dir in sorted(
            (d for d in strand_root.iterdir() if d.is_dir() and any(d.glob("*.md"))),
            key=lambda d: STRAND_LEVEL_ORDER.get(d.name, 99),
        ):
            level_lessons = sorted(f.stem for f in level_dir.glob("*.md"))
            levels.append({
                "id": level_dir.name,
                "title": manifest.get("levels", {}).get(level_dir.name, level_dir.name.title()),
                "tier_id": f"{strand_root.name}-{level_dir.name}",
                "lessons": level_lessons,
            })
        strands.append({
            "id": strand_root.name,
            "title": manifest.get("title", strand_root.name.replace("-", " ").title()),
            "description": manifest.get("description", ""),
            "levels": levels,
        })
    return strands


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
        tid = _tier_id(tier_dir)
        for lesson_file in sorted(tier_dir.glob("*.md")):
            slug = lesson_file.stem
            fm, body = _parse_frontmatter(lesson_file.read_text())
            meta = _parse_meta(tid, slug, body, fm)
            index.append({
                "tier": tid,
                "slug": slug,
                "title": meta.title,
                "sections": meta.sections,
                "text": _extract_search_text(body),
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
