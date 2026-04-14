#!/usr/bin/env python3
"""
Build static JSON files from tutorial markdown.

Generates:
  dist/api/tiers.json                          — list of all tiers
  dist/api/tiers/{tier}/{slug}.json            — lesson content
  dist/api/tiers/{tier}/{slug}.meta.json       — lesson metadata
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TUTORIALS_DIR = ROOT / "tutorials"
OUTPUT_DIR = ROOT / "frontend" / "public" / "api"


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
        # Sort supplementary alphabetically after tiers
        return (1, hash(name) % 10000)
    return (2, 0)


def resolve_slug(tier: str, lesson_num: str) -> str | None:
    tier_dir = TUTORIALS_DIR / tier
    if not tier_dir.is_dir():
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
    prereq_re = re.compile(r"Tier\s+(\d+),\s*Lesson\s+(\d+)(?::\s*(.+))?")
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


def build():
    # Clean output
    if OUTPUT_DIR.exists():
        import shutil
        shutil.rmtree(OUTPUT_DIR)

    tiers_list = []
    total_lessons = 0

    for tier_dir in sorted(TUTORIALS_DIR.iterdir(), key=tier_sort_key):
        if not tier_dir.is_dir():
            continue
        if not (tier_dir.name.startswith("foundation-") or tier_dir.name.startswith("tier-") or tier_dir.name.startswith("supplementary-")):
            continue

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

            total_lessons += 1

    # Tiers index
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    (OUTPUT_DIR / "tiers.json").write_text(
        json.dumps(tiers_list, ensure_ascii=False, indent=2)
    )

    # Copy learning paths if present
    lp = TUTORIALS_DIR / "learning-paths.json"
    if lp.exists():
        import shutil
        shutil.copy2(lp, OUTPUT_DIR / "learning-paths.json")

    print(f"Built {total_lessons} lessons across {len(tiers_list)} sections → {OUTPUT_DIR}")


if __name__ == "__main__":
    build()
