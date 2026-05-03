#!/usr/bin/env python3
"""
Build static JSON files from tutorial markdown.

Generates:
  api/tiers.json                          — list of all tiers
  api/tiers/{tier}/{slug}.json            — lesson content
  api/tiers/{tier}/{slug}.meta.json       — lesson metadata
  api/search-index.json                   — full-text search index
"""

import json
import re
import shutil
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
TUTORIALS_DIR = ROOT / "tutorials"
OUTPUT_DIR = ROOT / "frontend" / "public" / "api"

# Strand directories follow `tutorials/strand-*/<level>/NN-slug.md`.
# A (strand-root, level) pair is exposed to the API as a single tier whose
# id concatenates them, so existing /api/tiers/{tier}/{slug}.json routing
# keeps working unchanged.
STRAND_LEVEL_ORDER = {
    "foundation": 0, "intermediate": 1, "advanced": 2,
    "master": 3, "research": 4,
}

# Sort order for tier directories (by group folder prefix, then alphabetically)
GROUP_ORDER = {
    "01-foundations": 0,
    "02-core-mathematics": 1,
    "03-applied-ml": 2,
    "04-specializations": 3,
    "05-university": 4,
    "06-formal-mathematics": 5,
    "07-supplementary": 6,
}

# Within each group, define explicit ordering for tiers
TIER_ORDER = {
    "foundation-1": 0, "foundation-2": 1, "foundation-3": 2, "foundation-4": 3,
    "number-systems": 0, "discrete-mathematics": 1, "linear-algebra": 2,
    "calculus": 3, "probability-statistics": 4,
    "optimisation": 0, "neural-networks": 1, "cnns": 2,
    "geometry-trigonometry": 0, "classical-geometry": 1, "fourier-analysis": 2,
    "advanced-ml": 3, "jee-problem-solving": 4, "vedic-maths": 5,
    "differential-equations": 0, "multivariable-calculus": 1,
    "advanced-discrete-math": 2, "advanced-statistics": 3,
    "methods-of-proof": 0, "abstract-algebra": 1,
    "supplementary-activations": 0, "supplementary-graphs": 1,
    "supplementary-foundations": 2, "supplementary-applied": 3,
}

# Map old "Tier N" / "Foundation N" references to new directory names
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


def discover_tiers() -> list[Path]:
    """Find all tier directories inside group folders, sorted by group then tier order.

    Also discovers strand directories: `tutorials/strand-*/{level}/*.md`.
    Each (strand, level) pair is treated as a tier whose id is
    `{strand-root}-{level}` (e.g. `strand-1-number-quantity-foundation`).
    Strands sort before everything else so the pilot is visible.
    """
    tiers = []
    for top in sorted(TUTORIALS_DIR.iterdir()):
        if not top.is_dir() or top.name.startswith("."):
            continue
        if top.name.startswith("strand-"):
            for level_dir in top.iterdir():
                if not level_dir.is_dir() or not any(level_dir.glob("*.md")):
                    continue
                tiers.append((-1, STRAND_LEVEL_ORDER.get(level_dir.name, 99), level_dir))
            continue
        group_order = GROUP_ORDER.get(top.name, 99)
        for tier_dir in top.iterdir():
            if tier_dir.is_dir() and any(tier_dir.glob("*.md")):
                tier_order = TIER_ORDER.get(tier_dir.name, 99)
                tiers.append((group_order, tier_order, tier_dir))
    tiers.sort(key=lambda x: (x[0], x[1]))
    return [t[2] for t in tiers]


def tier_id(tier_dir: Path) -> str:
    """The id used in the API URL for this tier directory."""
    parent = tier_dir.parent
    if parent.name.startswith("strand-"):
        return f"{parent.name}-{tier_dir.name}"
    return tier_dir.name


def strand_info(tier_dir: Path) -> dict | None:
    """Return strand/level pair if this tier_dir lives under a strand root."""
    parent = tier_dir.parent
    if parent.name.startswith("strand-"):
        return {"strand": parent.name, "level": tier_dir.name}
    return None


_FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?\n)---\s*\n", re.DOTALL)


def parse_frontmatter(content: str) -> tuple[dict, str]:
    """Split YAML frontmatter from body. Returns ({}, content) when absent."""
    m = _FRONTMATTER_RE.match(content)
    if not m:
        return {}, content
    try:
        meta = yaml.safe_load(m.group(1)) or {}
    except yaml.YAMLError:
        return {}, content
    body = content[m.end():]
    return meta if isinstance(meta, dict) else {}, body


def find_tier_dir(tier_name: str) -> Path | None:
    """Find a tier directory by name across all group folders.

    Accepts both legacy tier ids (`number-systems`) and strand-tier ids
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


def resolve_slug(tier: str, lesson_num: str) -> str | None:
    tier_dir = find_tier_dir(tier)
    if tier_dir is None:
        return None
    prefix = lesson_num.zfill(2)
    for f in tier_dir.glob(f"{prefix}-*.md"):
        return f.stem
    return None


def parse_meta(tier: str, slug: str, content: str, fm: dict | None = None) -> dict:
    """Build lesson metadata. Frontmatter (when present) wins over prose scraping."""
    fm = fm or {}
    lines = content.split("\n")

    title = fm.get("title")
    if not title:
        title = slug
        for line in lines:
            if line.startswith("# "):
                title = line[2:].strip()
                break

    prereqs: list[dict] = []
    # Frontmatter form: list of "tier-id/slug" strings or {tier, slug, description} objects.
    if "prerequisites" in fm and isinstance(fm["prerequisites"], list):
        for entry in fm["prerequisites"]:
            if isinstance(entry, str) and "/" in entry:
                # Accept "tier-id/slug" or "tier-id/NN-…"
                t, s = entry.split("/", 1)
                num_match = re.match(r"(\d+)", s)
                prereqs.append({
                    "tier": t,
                    "lesson_num": (num_match.group(1).zfill(2) if num_match else ""),
                    "description": "",
                    "slug": s,
                })
            elif isinstance(entry, dict):
                t = entry.get("tier", "")
                s = entry.get("slug")
                num_match = re.match(r"(\d+)", s or "")
                prereqs.append({
                    "tier": t,
                    "lesson_num": (num_match.group(1).zfill(2) if num_match else ""),
                    "description": entry.get("description", ""),
                    "slug": s,
                })
    else:
        # Legacy prose-scraping fallback: "## Prerequisites" section with
        # "- Tier N, Lesson M: …" or "- Foundation N, Lesson M: …" bullets.
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
                    resolved = resolve_slug(new_tier, lesson_num)
                    prereqs.append({
                        "tier": new_tier,
                        "lesson_num": lesson_num.zfill(2),
                        "description": desc.strip() if desc else "",
                        "slug": resolved,
                    })

    sections = [line[3:].strip() for line in lines if line.startswith("## ")]

    return {
        "tier": tier,
        "slug": slug,
        "title": title,
        "prerequisites": prereqs,
        "sections": sections,
        "strand": fm.get("strand"),
        "level": fm.get("level"),
        "connections": fm.get("connections", []),
        "applications": fm.get("applications", []),
    }


def extract_search_text(content: str) -> str:
    lines = content.split("\n")
    result = []
    in_code = False
    for line in lines:
        if line.strip().startswith("```"):
            in_code = not in_code
            continue
        if in_code:
            continue
        if line.strip().startswith("$$"):
            continue
        clean = re.sub(r'\$[^$]+\$', '', line)
        clean = re.sub(r'[#*_`|>]', '', clean)
        clean = clean.strip()
        if clean:
            result.append(clean)
    return " ".join(result)


def build():
    if OUTPUT_DIR.exists():
        shutil.rmtree(OUTPUT_DIR)

    tiers_list = []
    search_index = []
    total_lessons = 0

    for tier_dir in discover_tiers():
        tid = tier_id(tier_dir)
        lessons = sorted(f.stem for f in tier_dir.glob("*.md"))
        strand = strand_info(tier_dir)
        title = tid.replace("-", " ").title()

        tier_entry = {
            "tier": tid,
            "title": title,
            "lessons": lessons,
        }
        if strand:
            tier_entry.update(strand)
        tiers_list.append(tier_entry)

        tier_out = OUTPUT_DIR / "tiers" / tid
        tier_out.mkdir(parents=True, exist_ok=True)

        for lesson_file in sorted(tier_dir.glob("*.md")):
            slug = lesson_file.stem
            raw = lesson_file.read_text()
            fm, body = parse_frontmatter(raw)

            content_data = {
                "tier": tid,
                "slug": slug,
                "filename": lesson_file.name,
                "content": body,
            }
            (tier_out / f"{slug}.json").write_text(
                json.dumps(content_data, ensure_ascii=False)
            )

            meta_data = parse_meta(tid, slug, body, fm)
            (tier_out / f"{slug}.meta.json").write_text(
                json.dumps(meta_data, ensure_ascii=False)
            )

            search_text = extract_search_text(body)
            search_index.append({
                "tier": tid,
                "slug": slug,
                "title": meta_data["title"],
                "sections": meta_data["sections"],
                "text": search_text,
            })

            total_lessons += 1

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    (OUTPUT_DIR / "tiers.json").write_text(
        json.dumps(tiers_list, ensure_ascii=False, indent=2)
    )
    (OUTPUT_DIR / "search-index.json").write_text(
        json.dumps(search_index, ensure_ascii=False)
    )

    # Strand index: one entry per strand-* directory, with per-level lesson lists.
    # A manually-authored tutorials/strand-*/strand.json provides title and
    # description; without it we fall back to a slug-derived title.
    strands_index = []
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
        strands_index.append({
            "id": strand_root.name,
            "title": manifest.get("title", strand_root.name.replace("-", " ").title()),
            "description": manifest.get("description", ""),
            "levels": levels,
        })
    (OUTPUT_DIR / "strands.json").write_text(
        json.dumps(strands_index, ensure_ascii=False, indent=2)
    )

    for extra in ("learning-paths.json", "ml-curriculum.json", "jee-curriculum.json"):
        src = TUTORIALS_DIR / extra
        if src.exists():
            shutil.copy2(src, OUTPUT_DIR / extra)

    print(f"Built {total_lessons} lessons across {len(tiers_list)} sections → {OUTPUT_DIR}")


if __name__ == "__main__":
    build()
