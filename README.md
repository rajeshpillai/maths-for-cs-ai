# Mathematics from First Principles

Live Site at: https://rajeshpillai.github.io/maths-for-cs-ai/

A structured learning platform for mastering the mathematics behind computer science, game development, and AI/ML. **111 lessons** across 15 sections, from number systems to Transformers.

## Philosophy

Learn math so you can solve it with **paper and pen**. Python is used only to verify your hand-computed answers.

## Structure

```
maths-for-cs/
  frontend/          # SolidJS web app
  backend/           # FastAPI server (optional — can deploy as static site)
  tutorials/         # Markdown lessons organised by tier
  scripts/           # Build tools
    build-static.py  # Generate static JSON for deployment
```

## Quick Start (Static — no backend needed)

```bash
cd frontend>
npm install
npm run build    # generates static JSON + builds app
npm run preview  # preview at http://localhost:4173
```

## Development (with backend)

```bash
# Terminal 1: Backend
cd backend
uv sync
uv run python main.py    # API at http://localhost:8000

# Terminal 2: Frontend (Vite dev server proxies /api → backend)
cd frontend
npm install
npm run dev
```

The Vite dev server proxies any request matching `/api/*` to
`http://localhost:8000` by default, so no env var is needed. To point at a
different backend, set `VITE_API_URL=http://host:port` before `npm run dev`.

## Deploy as Static Site

The app can be deployed to any static host with zero server:

```bash
cd frontend
npm run build    # outputs to dist/
```

Deploy `dist/` to:
- **Netlify**: drag-and-drop or connect repo (SPA redirects via `_redirects`)
- **Vercel**: `npx vercel --prod`
- **GitHub Pages**: push `dist/` to `gh-pages` branch
- **Cloudflare Pages**: connect repo, build command `cd frontend && npm run build`

## Tech Stack

- **Frontend**: SolidJS + TypeScript + Vite
- **Backend**: Python FastAPI (optional)
- **Code execution**: Pyodide (Python in the browser via WebAssembly)
- **Math rendering**: KaTeX for LaTeX
- **Code editor**: CodeMirror 6 with Python syntax
- **Tutorials**: 111 Markdown lessons with LaTeX math notation

## Content

| Section | Lessons | Topics |
|---------|---------|--------|
| Tier 0 | 5 | Number systems, binary/hex, IEEE 754, modular arithmetic, primes/GCD |
| Tier 1 | 6 | Logic, sets, relations, combinatorics, graph theory, proof techniques |
| Tier 2 | 12 | Vectors, matrices, transformations, determinants, eigenvalues, SVD, PCA |
| Tier 3 | 10 | Limits, derivatives, gradient, chain rule, integrals, Taylor series |
| Tier 4 | 9 | Probability, Bayes, distributions, CLT, MLE, entropy, covariance |
| Tier 5 | 7 | Loss functions, gradient descent, SGD, Adam, convexity, Lagrange |
| Tier 6 | 6 | Neurons, activations, forward pass, backpropagation, network from scratch |
| Tier 7 | 6 | 2D convolution, stride/padding, pooling, receptive fields |
| Tier 8 | 10 | Trig, rotations, quaternions, projections, Bezier, ray tracing, collision |
| Tier 9 | 6 | Fourier series/transform, DFT/FFT, convolution theorem |
| Tier 10 | 7 | GNNs, Transformers, RNNs, Markov/MDP, Monte Carlo, auto-diff |
| Supplementary | 27 | Graph shapes, activation functions, pre-calculus, applied maths |
| **Total** | **111** | |
