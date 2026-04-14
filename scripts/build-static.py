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

ROOT = Path(__file__).resolve().parent.parent
TUTORIALS_DIR = ROOT / "tutorials"
OUTPUT_DIR = ROOT / "frontend" / "public" / "api"

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
    "geometry-trigonometry": 0, "fourier-analysis": 1, "advanced-ml": 2,
    "jee-problem-solving": 3, "vedic-maths": 4,
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
    """Find all tier directories inside group folders, sorted by group then tier order."""
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


def find_tier_dir(tier_name: str) -> Path | None:
    """Find a tier directory by name across all group folders."""
    for group_dir in TUTORIALS_DIR.iterdir():
        if not group_dir.is_dir():
            continue
        candidate = group_dir / tier_name
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


def parse_meta(tier: str, slug: str, content: str) -> dict:
    lines = content.split("\n")

    title = slug
    for line in lines:
        if line.startswith("# "):
            title = line[2:].strip()
            break

    prereqs = []
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
        lessons = sorted(f.stem for f in tier_dir.glob("*.md"))
        title = tier_dir.name.replace("-", " ").title()

        tiers_list.append({
            "tier": tier_dir.name,
            "title": title,
            "lessons": lessons,
        })

        tier_out = OUTPUT_DIR / "tiers" / tier_dir.name
        tier_out.mkdir(parents=True, exist_ok=True)

        for lesson_file in sorted(tier_dir.glob("*.md")):
            slug = lesson_file.stem
            content = lesson_file.read_text()

            content_data = {
                "tier": tier_dir.name,
                "slug": slug,
                "filename": lesson_file.name,
                "content": content,
            }
            (tier_out / f"{slug}.json").write_text(
                json.dumps(content_data, ensure_ascii=False)
            )

            meta_data = parse_meta(tier_dir.name, slug, content)
            (tier_out / f"{slug}.meta.json").write_text(
                json.dumps(meta_data, ensure_ascii=False)
            )

            search_text = extract_search_text(content)
            search_index.append({
                "tier": tier_dir.name,
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

    for extra in ("learning-paths.json", "ml-curriculum.json", "jee-curriculum.json"):
        src = TUTORIALS_DIR / extra
        if src.exists():
            shutil.copy2(src, OUTPUT_DIR / extra)

    print(f"Built {total_lessons} lessons across {len(tiers_list)} sections → {OUTPUT_DIR}")


if __name__ == "__main__":
    build()
