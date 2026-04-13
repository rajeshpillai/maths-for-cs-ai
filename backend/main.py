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


@app.get("/api/tiers", response_model=list[TierInfo])
def list_tiers():
    """Return every tier that has at least one .md file."""
    tiers: list[TierInfo] = []
    def tier_sort_key(p: Path) -> tuple[int, int]:
        """Sort tiers numerically, supplementary sections after main tiers."""
        name = p.name
        if name.startswith("tier-"):
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
        if not (tier_dir.name.startswith("tier-") or tier_dir.name.startswith("supplementary-")):
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


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
