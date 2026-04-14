#!/usr/bin/env python3
"""
Build static JSON files from tutorial markdown.

Generates:
  dist/api/tiers.json                          — list of all tiers
  dist/api/tiers/{tier}/{slug}.json            — lesson content
  dist/api/tiers/{tier}/{slug}.meta.json       — lesson metadata

Tutorials are organised in group folders:
  tutorials/01-foundations/foundation-1/
  tutorials/02-core-mathematics/tier-0/
  etc.
"""

import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TUTORIALS_DIR = ROOT / "tutorials"
OUTPUT_DIR = ROOT / "frontend" / "public" / "api"

TIER_PREFIXES = ("foundation-", "tier-", "supplementary-")


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
    elif name.startswith("supplementary-"):
        return (1, hash(name) % 10000)
    return (2, 0)


def discover_tiers() -> list[Path]:
    """Find all tier directories inside group folders (one level of nesting)."""
    tiers = []
    for group_dir in sorted(TUTORIALS_DIR.iterdir()):
        if not group_dir.is_dir():
            continue
        # Look for tier dirs inside each group folder
        for tier_dir in group_dir.iterdir():
            if tier_dir.is_dir() and any(tier_dir.name.startswith(p) for p in TIER_PREFIXES):
                tiers.append(tier_dir)
    return sorted(tiers, key=tier_sort_key)


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

    # Title
    title = slug
    for line in lines:
        if line.startswith("# "):
            title = line[2:].strip()
            break

    # Prerequisites
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
                prereq_tier = f"{kind}{tier_num}"
                resolved = resolve_slug(prereq_tier, lesson_num)
                prereqs.append({
                    "tier": prereq_tier,
                    "lesson_num": lesson_num.zfill(2),
                    "description": desc.strip() if desc else "",
                    "slug": resolved,
                })

    # Sections
    sections = [line[3:].strip() for line in lines if line.startswith("## ")]

    return {
        "tier": tier,
        "slug": slug,
        "title": title,
        "prerequisites": prereqs,
        "sections": sections,
    }


def extract_search_text(content: str) -> str:
    """Extract plain text from markdown for search indexing (strip code blocks, LaTeX)."""
    lines = content.split("\n")
    result = []
    in_code = False
    for line in lines:
        if line.strip().startswith("```"):
            in_code = not in_code
            continue
        if in_code:
            continue
        # Strip LaTeX blocks
        if line.strip().startswith("$$"):
            continue
        # Strip inline LaTeX, keep surrounding text
        clean = re.sub(r'\$[^$]+\$', '', line)
        # Strip markdown formatting
        clean = re.sub(r'[#*_`|>]', '', clean)
        clean = clean.strip()
        if clean:
            result.append(clean)
    return " ".join(result)


def build():
    # Clean output
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

        # Generate per-lesson JSON
        tier_out = OUTPUT_DIR / "tiers" / tier_dir.name
        tier_out.mkdir(parents=True, exist_ok=True)

        for lesson_file in sorted(tier_dir.glob("*.md")):
            slug = lesson_file.stem
            content = lesson_file.read_text()

            # Content JSON
            content_data = {
                "tier": tier_dir.name,
                "slug": slug,
                "filename": lesson_file.name,
                "content": content,
            }
            (tier_out / f"{slug}.json").write_text(
                json.dumps(content_data, ensure_ascii=False)
            )

            # Meta JSON
            meta_data = parse_meta(tier_dir.name, slug, content)
            (tier_out / f"{slug}.meta.json").write_text(
                json.dumps(meta_data, ensure_ascii=False)
            )

            # Search index entry
            search_text = extract_search_text(content)
            # Keep first ~500 chars of plain text as snippet
            snippet = search_text[:500]
            search_index.append({
                "tier": tier_dir.name,
                "slug": slug,
                "title": meta_data["title"],
                "sections": meta_data["sections"],
                "text": search_text,
            })

            total_lessons += 1

    # Tiers index
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    (OUTPUT_DIR / "tiers.json").write_text(
        json.dumps(tiers_list, ensure_ascii=False, indent=2)
    )

    # Search index
    (OUTPUT_DIR / "search-index.json").write_text(
        json.dumps(search_index, ensure_ascii=False)
    )

    # Copy learning paths and ML curriculum if present
    for extra in ("learning-paths.json", "ml-curriculum.json"):
        src = TUTORIALS_DIR / extra
        if src.exists():
            shutil.copy2(src, OUTPUT_DIR / extra)

    print(f"Built {total_lessons} lessons across {len(tiers_list)} sections → {OUTPUT_DIR}")


if __name__ == "__main__":
    build()
