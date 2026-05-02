# Mathematics from First Principles

Live Site at: https://rajeshpillai.github.io/maths-for-cs-ai/

A structured learning platform for mastering the mathematics behind computer science, game development, and AI/ML. **312 lessons** across 28 sections, from number systems to Transformers.

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
cd frontend
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
- **Cloudflare Pages**: connect repo, build command `cd frontend && npm run build`
- **GitHub Pages**: see below — there's a one-command helper that handles
  the subpath base, SPA fallback, and `.nojekyll`.

### GitHub Pages (one-command deploy)

```bash
cd frontend
npm run deploy   # runs ../scripts/deploy-gh-pages.sh
```

Under the hood this:

1. Runs `GITHUB_PAGES=true npm run build`, which switches Vite's `base` to
   `/maths-for-cs-ai/` so every asset and every `/api/...` URL resolves
   correctly under the GitHub Pages subpath.
2. Copies `dist/index.html` → `dist/404.html` so client-side routing works
   for direct visits to lesson URLs (GitHub Pages serves `404.html` for any
   unmatched path, and the SPA then takes over).
3. Adds `dist/.nojekyll` so GitHub doesn't run Jekyll on the output.
4. Force-pushes `dist/` to the `gh-pages` branch of the configured remote.

**First-time setup (once per repo):**

1. Push your repo to GitHub. The script's remote is hard-coded to
   `https://github.com/rajeshpillai/maths-for-cs-ai.git` — edit
   [scripts/deploy-gh-pages.sh](scripts/deploy-gh-pages.sh) if your repo lives elsewhere.
2. Run `npm run deploy` once to create the `gh-pages` branch.
3. In GitHub: **Settings → Pages**, set **Source: Deploy from a branch →
   `gh-pages` → `/ (root)`**.
4. The site appears at `https://<user>.github.io/<repo>/` (live demo:
   <https://rajeshpillai.github.io/maths-for-cs-ai/>).

After the first deploy, every subsequent push is just `npm run deploy`.

## Tech Stack

- **Frontend**: SolidJS + TypeScript + Vite
- **Backend**: Python FastAPI (optional)
- **Code execution**: Pyodide (Python in the browser via WebAssembly)
- **Math rendering**: KaTeX for LaTeX
- **Code editor**: CodeMirror 6 with Python syntax
- **Tutorials**: 312 Markdown lessons with LaTeX math notation

## Content

| Section | Lessons | Topics |
|---------|---------|--------|
| Foundation 1 | 12 | Algebra: surds, indices, logs, polynomials, exponent rules |
| Foundation 2 | 10 | Functions, coordinate geometry, basic trig, transformations |
| Foundation 3 | 10 | Advanced algebra, sequences, rational equations, matrices |
| Foundation 4 | 8 | Pre-calculus: limits intro, advanced trig, conics, complex numbers |
| Tier 0 — Number Systems | 7 | Binary/hex, IEEE 754, modular arithmetic, primes/GCD, divisibility rules, factor counting |
| Tier 1 — Discrete Mathematics | 14 | Logic, sets, combinatorics, graphs, proofs; inclusion-exclusion, stars & bars, Pascal identities, recurrence/Catalan, grid paths, heuristics, polyhedra |
| Tier 2 — Linear Algebra | 22 | Vectors, matrices, transformations, determinants, eigenvalues, SVD, PCA |
| Tier 3 — Calculus | 10 | Limits, derivatives, gradient, chain rule, integrals, Taylor series |
| Tier 4 — Probability & Statistics | 15 | Probability, Bayes, distributions, CLT, MLE, entropy, covariance |
| Tier 5 — Optimisation | 7 | Loss functions, gradient descent, SGD, Adam, convexity, Lagrange |
| Tier 6 — Neural Networks | 6 | Neurons, activations, forward pass, backpropagation, network from scratch |
| Tier 7 — CNNs | 6 | 2D convolution, stride/padding, pooling, receptive fields |
| Tier 8 — Geometry & Trig (graphics) | 10 | Trig, rotations, quaternions, projections, Bezier, ray tracing, collision |
| Tier 8b — Classical Euclidean Geometry | 12 | Angle-chasing, congruence/similarity, special triangles, Heron, inscribed angle, cyclic quads, power of a point, incircle, circumcircle |
| Tier 9 — Fourier Analysis | 6 | Fourier series/transform, DFT/FFT, convolution theorem |
| Tier 10 — Advanced ML | 7 | GNNs, Transformers, RNNs, Markov/MDP, Monte Carlo, auto-diff |
| Tier 11 — Differential Equations | 25 | ODEs, PDEs, Laplace, chaos, neural ODEs |
| Tier 12 — Multivariable Calculus | 20 | Vector calculus, multiple integrals, Green/Stokes/divergence theorems |
| Tier 13 — Advanced Discrete Math | 20 | Number theory (CRT non-coprime, multiplicative order), boolean, automata, complexity |
| Tier 14 — Advanced Statistics | 15 | Estimation, hypothesis testing, regression, Bayesian, causal inference |
| Tier 15 — Methods of Proof | 12 | Logic, proof techniques, set theory proofs, ε-δ |
| Tier 16 — Abstract Algebra | 12 | Groups, rings, fields, finite fields, applications to crypto |
| JEE Problem Solving | 12 | Curated multi-topic problem-solving track |
| Vedic Maths | 15 | Mental-arithmetic shortcuts and ancient Indian techniques |
| Supplementary | 19 | Graph shapes, activation deep-dives, parametric curves, applied mechanics |
| **Total** | **312** | |
