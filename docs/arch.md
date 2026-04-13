# Architecture

## Overview

```
┌─────────────────────────────────────────────────────────┐
│                        Browser                          │
│                                                         │
│  ┌──────────┐  ┌────────────┐  ┌─────────────────────┐ │
│  │ SolidJS  │  │  KaTeX     │  │  CodeMirror 6       │ │
│  │ Router   │  │  (LaTeX)   │  │  (Python editor)    │ │
│  └────┬─────┘  └─────┬──────┘  └──────────┬──────────┘ │
│       │              │                     │            │
│  ┌────┴──────────────┴─────────────────────┴──────────┐ │
│  │              Lesson Viewer                          │ │
│  │  - Renders markdown → HTML                         │ │
│  │  - Injects CodeRunner components for Python blocks │ │
│  │  - Resolves prerequisite links via metadata API    │ │
│  └────────────────────────┬───────────────────────────┘ │
│                           │                             │
│  ┌────────────────────────┴───────────────────────────┐ │
│  │              Pyodide (WASM)                         │ │
│  │  - CPython 3.12 compiled to WebAssembly             │ │
│  │  - Loaded from CDN on first "Run" click             │ │
│  │  - Executes Python code in-browser                  │ │
│  │  - stdout/stderr captured and displayed              │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                         │
│  ┌─────────────────────┐  ┌──────────────────────────┐  │
│  │  localStorage       │  │  Static JSON (/api/)     │  │
│  │  - Theme preference │  │  - tiers.json            │  │
│  │  - Lesson progress  │  │  - {tier}/{slug}.json    │  │
│  │    (completed map)  │  │  - {tier}/{slug}.meta    │  │
│  └─────────────────────┘  └──────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Deployment Modes

### 1. Static Site (default — recommended)

```
tutorials/*.md  ──→  build-static.py  ──→  /public/api/*.json
                                               │
SolidJS app     ──→  vite build       ──→  dist/  ──→  GitHub Pages
                                                       Netlify
                                                       Vercel
                                                       Cloudflare Pages
```

No backend. Everything served as static files. Python runs via Pyodide WASM in the browser.

### 2. Development (with FastAPI backend)

```
tutorials/*.md  ←──  FastAPI reads directly
                         │
                    localhost:8000/api/tiers
                    localhost:8000/api/tiers/{tier}/{slug}
                    localhost:8000/api/tiers/{tier}/{slug}/meta
                         │
SolidJS dev     ←──  Vite dev server (localhost:5173)
                     VITE_API_URL=http://localhost:8000
```

Backend parses markdown on-the-fly. Useful for content editing with hot reload.

---

## Frontend Architecture

### Tech Stack

| Component | Library | Purpose |
|-----------|---------|---------|
| Framework | SolidJS 1.9 | Reactive UI (fine-grained reactivity, no virtual DOM) |
| Router | @solidjs/router 0.16 | SPA routing with base path support |
| Bundler | Vite 8 | Dev server + production build |
| Math | KaTeX | LaTeX rendering ($...$ and $$...$$) |
| Markdown | marked + marked-highlight | Markdown → HTML conversion |
| Code highlight | highlight.js | Python syntax highlighting (static render) |
| Code editor | CodeMirror 6 | Editable Python code blocks with one-dark theme |
| Code execution | Pyodide 0.27.7 | CPython via WebAssembly |
| Language | TypeScript | Type safety |

### Directory Structure

```
frontend/src/
├── index.tsx              # Entry point: Router setup with base path
├── index.css              # CSS variables (light/dark theme definitions)
├── Layout.tsx             # App shell: sidebar + main content + theme toggle
├── App.css                # All component styles (no inline CSS)
│
├── components/
│   ├── Sidebar.tsx        # Navigation: tier tree, progress indicators
│   ├── CodeRunner.tsx     # Wraps CodeEditor + Run/Reset buttons + output
│   └── CodeEditor.tsx     # CodeMirror 6 instance with Python support
│
├── pages/
│   ├── Home.tsx           # Landing page: tier grid with descriptions
│   └── Lesson.tsx         # Lesson viewer: markdown + code runners + nav
│
└── lib/
    ├── api.ts             # API client (static JSON or FastAPI, auto-detected)
    ├── markdown.ts        # Markdown → HTML pipeline (LaTeX + prereq links)
    ├── pyodide.ts         # Pyodide loader + Python execution wrapper
    └── progress.ts        # localStorage-based lesson completion tracking
```

### Data Flow: Rendering a Lesson

```
1. Route: /lesson/tier-3/04-chain-rule
          │
2. Lesson.tsx fetches:
   ├── fetchLesson("tier-3", "04-chain-rule")  → raw markdown
   └── fetchLessonMeta("tier-3", "04-chain-rule") → title, prereqs, sections
          │
3. renderMarkdown(content):
   ├── linkPrerequisites()  → convert "Tier X, Lesson Y" to <a> tags
   ├── renderLatex()        → $$...$$ and $...$ → KaTeX HTML
   └── marked.parse()       → markdown → HTML (with highlight.js for code)
          │
4. innerHTML set on <article>
          │
5. Post-render effects:
   ├── mountCodeRunners()    → replace <pre><code class="python"> with CodeRunner
   └── resolvePrereqLinks()  → fix <a> hrefs using metadata slugs
          │
6. User clicks "Run":
   ├── loadPyodide()     → download WASM runtime (cached after first load)
   ├── runPython(code)   → redirect stdout/stderr, exec code
   └── display output    → green panel below editor
```

### Theme System

CSS custom properties defined in `index.css`:

```css
:root {              /* Light theme (default) */
  --bg: #fafafa;
  --text: #1e1e2e;
  --code-bg: #f5f5f5;
  ...
}

[data-theme="dark"] {  /* Dark theme */
  --bg: #181825;
  --text: #cdd6f4;
  --code-bg: #11111b;
  ...
}
```

Toggle sets `document.documentElement.setAttribute("data-theme", "dark")`.
Persisted in `localStorage("theme")`.

### Progress Tracking

```typescript
// localStorage key: "maths-for-cs-progress"
{
  "completed": {
    "tier-0/01-number-systems": true,
    "tier-3/04-chain-rule": true,
    ...
  }
}
```

- Sidebar shows ✓/○ per lesson, count per tier, overall total
- "Mark as complete" button at bottom of each lesson
- Polls every 1s for sidebar refresh (cross-component reactivity)

---

## Backend Architecture (Optional)

### Tech Stack

| Component | Library | Purpose |
|-----------|---------|---------|
| Framework | FastAPI 0.135 | REST API |
| Server | Uvicorn | ASGI server with hot reload |
| Package manager | uv | Fast Python dependency management |

### Endpoints

| Method | Path | Response |
|--------|------|----------|
| GET | `/api/tiers` | List all tiers with lesson slugs |
| GET | `/api/tiers/{tier}/{slug}` | Raw markdown content |
| GET | `/api/tiers/{tier}/{slug}/meta` | Parsed metadata (title, prereqs, sections) |

### Metadata Parser

Extracts from markdown:
- **Title**: first `# H1` heading
- **Prerequisites**: `- Tier X, Lesson Y: Description` lines under `## Prerequisites`
- **Sections**: all `## H2` headings
- **Slug resolution**: maps lesson numbers to full filenames via filesystem lookup

---

## Build Scripts

### `scripts/build-static.py`

Generates static JSON from tutorial markdown:

```
tutorials/
  tier-0/01-number-systems.md
  tier-0/02-number-bases.md
  ...
        │
        ▼
frontend/public/api/
  tiers.json                              # [{tier, title, lessons}]
  tiers/tier-0/01-number-systems.json     # {tier, slug, filename, content}
  tiers/tier-0/01-number-systems.meta.json # {tier, slug, title, prerequisites, sections}
  ...
```

- Reuses the same parsing logic as the FastAPI backend
- Output goes to `public/api/` so Vite copies it to `dist/` on build
- 111 lessons → 223 JSON files (content + meta + 1 index)

### `scripts/deploy-gh-pages.sh`

```
1. cd frontend
2. GITHUB_PAGES=true npm run build    # sets base to /maths-for-cs-ai/
3. cp dist/index.html dist/404.html   # SPA fallback for client-side routing
4. touch dist/.nojekyll               # prevent Jekyll processing
5. git init + commit in dist/
6. git push -f origin gh-pages        # force-push to gh-pages branch
```

### npm Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Vite dev server (localhost:5173) |
| `npm run build` | Generate JSON + TypeScript check + Vite build |
| `npm run build:ghpages` | Same but with `/maths-for-cs-ai/` base path |
| `npm run deploy` | Full build + push to gh-pages |
| `npm run preview` | Preview production build locally |

---

## Content Architecture

### Lesson Structure (Markdown)

Every lesson follows this template:

```markdown
# Title

## Intuition
[1-3 sentences: real-world analogy]

## Prerequisites
- Tier X, Lesson Y: Topic Name

## From First Principles
[Derivations with pen & paper examples]

## Python Verification
```python
# Runnable code that verifies hand computations
```

## Connection to CS / Games / AI
[Where this math appears in practice]

## Check Your Understanding
[Mix of computation, proof, and conceptual questions]
```

### Section Organisation

```
tutorials/
├── tier-0/          # 5 lessons  — Number Systems & Arithmetic
├── tier-1/          # 6 lessons  — Discrete Mathematics
├── tier-2/          # 12 lessons — Linear Algebra
├── tier-3/          # 10 lessons — Calculus & Analysis
├── tier-4/          # 9 lessons  — Probability & Statistics
├── tier-5/          # 7 lessons  — Optimisation
├── tier-6/          # 6 lessons  — Neural Networks (from scratch)
├── tier-7/          # 6 lessons  — CNNs
├── tier-8/          # 10 lessons — Geometry & Trig (Game Dev)
├── tier-9/          # 6 lessons  — Signals & Fourier
├── tier-10/         # 7 lessons  — Advanced (Transformers, RL, etc.)
├── supplementary-graphs/        # 5 lessons  — Curve types
├── supplementary-activations/   # 1 lesson   — Deep dive
├── supplementary-foundations/   # 13 lessons — Pre-calculus (Cambridge)
└── supplementary-applied/       # 8 lessons  — Mechanics & Stats
                                 ─────────────
                                 111 total
```

### Naming Convention

```
{number}-{topic-slug}.md

Examples:
  01-number-systems.md
  04-chain-rule.md
  12-norms.md
```

Number determines order within a tier. Slugs are URL-friendly.

---

## Key Design Decisions

1. **Paper-and-pen first**: Every concept is derived by hand before Python verification. Python code blocks are for checking, not teaching.

2. **Static-first architecture**: The entire app works without a server. The backend is optional for development convenience.

3. **No framework for math**: KaTeX renders LaTeX client-side. No server-side rendering of math needed.

4. **Pyodide over server execution**: Running Python in the browser via WASM eliminates server costs, latency, and security concerns. Trade-off: first load is ~6MB.

5. **localStorage for progress**: No user accounts needed. Progress persists per browser. Server-side persistence (POST /api/progress) is stubbed but not implemented — would only be needed for cross-device sync.

6. **CSS variables for theming**: Single source of truth for colours. Dark mode is a `data-theme` attribute flip, not a separate stylesheet.

7. **Markdown as source of truth**: Lessons are plain markdown files. The build script generates JSON for the frontend. No database, no CMS, no lock-in.
