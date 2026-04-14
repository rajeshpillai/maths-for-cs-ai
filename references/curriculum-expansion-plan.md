# Plan: Grade 8 → Advanced CS/AI Mathematics — Full Curriculum Expansion

## Context

Goal: anyone with grade 8 math (basic arithmetic, simple algebra, basic geometry) can
self-study the entire curriculum through to university-level ML/CS/Game Dev mathematics.

Current state: 127 lessons across Tiers 0-10 + 4 supplementary sections.
The curriculum currently assumes Algebra II / Pre-Calculus level entry — a grade 8 student
cannot start at Tier 0 without foundation content.

---

## Architectural Decision: Hybrid Approach

**Keep Tiers 0-10 unchanged** (zero renumbering of 127 lessons). Instead:

1. Add `foundation-*` tier directories for bridge content (grade 8 → Tier 0 entry)
2. Relocate 8 supplementary-foundations lessons into foundation tiers
3. Add `tier-11` through `tier-16` for university-level gaps
4. Add a `learning-paths.json` system for guided study sequences
5. Add collapsible sidebar with expand/collapse-all (user request)

**Why this approach:**
- Zero disruption to existing 127 lessons and their cross-references
- No regex/link breakage in frontend (markdown.ts), backend (main.py), or build (build-static.py)
- Foundation tiers slot naturally before Tier 0 in the sidebar

---

## Phase 1: Foundation Tiers (CRITICAL — enables grade 8 entry)

**32 new lessons + 8 relocated from supplementary-foundations = 40 total**

### foundation-1: Algebra Foundations (12 lessons)

| # | Lesson | Source |
|---|--------|--------|
| 01 | Surds, Indices, Logarithms | RELOCATED from supplementary-foundations/01 |
| 02 | Algebraic Manipulation (expanding, factoring, completing the square) | RELOCATED from supplementary-foundations/02 |
| 03 | Multi-Step Equations (fractions, brackets, unknowns on both sides) | NEW |
| 04 | Inequalities (linear, compound, interval notation) | NEW |
| 05 | Simultaneous Equations (substitution, elimination, 2x2/3x3) | NEW |
| 06 | Function Notation (f(x), domain, range, composition, inverse) | NEW |
| 07 | Linear Functions (slope, forms, parallel/perpendicular, graphing) | NEW |
| 08 | Quadratic Functions (vertex form, factored form, discriminant, formula) | NEW |
| 09 | Polynomial Functions (degree, end behavior, roots, arithmetic) | NEW |
| 10 | Rational Expressions (simplifying, operations, undefined values) | NEW |
| 11 | Absolute Value (equations, inequalities, piecewise definition) | NEW |
| 12 | Exponent Rules Mastery (negative/fractional exponents, growth/decay) | NEW |

### foundation-2: Functions & Graphs (10 lessons)

| # | Lesson | Source |
|---|--------|--------|
| 01 | The Cartesian Plane (plotting, distance formula, midpoint) | NEW |
| 02 | Transformations of Functions (shifts, stretches, reflections) | NEW |
| 03 | Exponential Functions (a^x, growth/decay, natural base e) | NEW |
| 04 | Logarithmic Functions (as inverse of exp, log scales, change of base) | NEW |
| 05 | Coordinate Geometry (lines, circles, distance, midpoint) | RELOCATED from supplementary-foundations/03 |
| 06 | Basic Trigonometry (SOH-CAH-TOA, unit circle, radians, graphs) | NEW |
| 07 | Function Composition & Inverses (deeper treatment, one-to-one) | NEW |
| 08 | Basic Statistics (mean, median, mode, box plots, weighted mean) | RELOCATED from supplementary-foundations/07 |
| 09 | Piecewise Functions (definition, graphing, continuity intuition) | NEW |
| 10 | Graph Reading Skills (rate of change from graphs, concavity intuition) | NEW |

### foundation-3: Advanced Algebra (10 lessons)

| # | Lesson | Source |
|---|--------|--------|
| 01 | Polynomial Long Division & Synthetic Division | NEW |
| 02 | Polynomial Roots (rational root theorem, Descartes' rule) | NEW |
| 03 | Factor Theorem & Remainder Theorem | RELOCATED from supplementary-foundations/08 |
| 04 | Radical Functions (nth roots, rational exponents, radical equations) | NEW |
| 05 | Exponential & Logarithmic Equations (solving, models, half-life) | NEW |
| 06 | Sequences & Series (arithmetic, geometric, sigma, binomial) | RELOCATED from supplementary-foundations/04 |
| 07 | Systems of Nonlinear Equations (quadratics, circles) | NEW |
| 08 | Introduction to Matrices (data tables, basic operations) | NEW |
| 09 | Summation Notation (sigma, properties, telescoping) | NEW |
| 10 | Mathematical Thinking (problem-solving strategies, pattern recognition) | NEW |

### foundation-4: Pre-Calculus (8 lessons)

| # | Lesson | Source |
|---|--------|--------|
| 01 | Limits — Intuitive (average vs instantaneous rate, tables) | NEW |
| 02 | Trigonometric Functions — Advanced (all six, reciprocal, Pythagorean) | NEW |
| 03 | Inverse Trigonometric Functions (arcsin, arccos, arctan) | NEW |
| 04 | Trigonometric Identities (double angle, addition, R-formula) | RELOCATED from supplementary-foundations/05 |
| 05 | Conic Sections Introduction (circles, ellipses, parabolas, hyperbolas) | NEW |
| 06 | Vectors — Intuitive (arrows, components, adding, magnitude) | NEW |
| 07 | Complex Numbers (Argand, polar form, De Moivre, roots of unity) | RELOCATED from supplementary-foundations/06 |
| 08 | Continuity Review (types of discontinuity, IVT intuitive) | NEW |

### What stays in supplementary (not on critical path)

| Current lesson | Action |
|----------------|--------|
| supplementary-foundations/09 — Parametric & Implicit | Keep as supplementary |
| supplementary-foundations/10 — Polar Coordinates | Keep as supplementary |
| supplementary-foundations/11 — Hyperbolic Functions | Keep as supplementary |
| supplementary-foundations/12 — Cayley-Hamilton | Keep as supplementary |
| supplementary-foundations/13 — 3D Lines & Planes | Keep as supplementary |
| supplementary-graphs/ (all 5) | Keep unchanged |
| supplementary-activations/ (1) | Keep unchanged |
| supplementary-applied/ (all 8) | Keep unchanged |

---

## Phase 2: Learning Path System + Collapsible Sidebar (HIGH)

**0 new lessons — frontend/backend work**

### Learning Paths (learning-paths.json)

Three named study sequences:

**Path A: "Grade 8 → AI/ML"** (complete, ~6 months)
```
foundation-1 → foundation-2 → tier-0 → tier-1 →
foundation-3 → foundation-4 → tier-2 → tier-3 →
tier-4 → tier-5 → tier-6 → tier-7 → tier-10
```

**Path B: "Grade 8 → Game Development"**
```
foundation-1 → foundation-2 → tier-0 → tier-1 →
foundation-3 → foundation-4 → tier-2 → tier-3 →
tier-8 → tier-9 → supplementary-applied (physics)
```

**Path C: "Already Know Algebra (start at Tier 0)"**
```
tier-0 → tier-1 → tier-2 → tier-3 → tier-4 →
tier-5 → tier-6 → tier-7 → tier-8 → tier-9 → tier-10
```

### Collapsible Sidebar (user request)

- Each tier/foundation shows as a collapsible header
- Click to expand/collapse lesson list within
- Expand-all / collapse-all icon button at top of sidebar
- Active learning path highlights relevant tiers
- Foundation tiers visually grouped under "Foundations" section header

### Files to modify

- `build-static.py`: extend `tier_sort_key` for `foundation-*` prefix (sort before tier-*)
- `main.py`: same tier discovery update
- `frontend/src/lib/markdown.ts`: extend prerequisite regex for `Foundation N, Lesson M`
- `frontend/src/components/Sidebar.tsx`: add TIER_LABELS, collapsible sections, expand/collapse-all
- `frontend/src/pages/Home.tsx`: add TIER_DESCRIPTIONS, path selector, "Start Here" callout
- NEW: `tutorials/learning-paths.json`

---

## Phase 3: University-Level Tiers (MEDIUM)

**45 new lessons**

### tier-11: Differential Equations (25 lessons)

Prerequisites: Tier 3, Tier 2.

| # | Topic |
|---|-------|
| 01 | Introduction & Classification |
| 02 | Separable Equations |
| 03 | First-Order Linear ODEs (integrating factor) |
| 04 | Direction Fields & Qualitative Analysis |
| 05 | Existence & Uniqueness |
| 06 | Euler's Method |
| 07 | Second-Order Homogeneous (characteristic equation) |
| 08 | Second-Order Nonhomogeneous |
| 09 | Spring-Mass Systems (SHM, damping, resonance) |
| 10 | Systems of ODEs (matrix equation, eigenvalue method) |
| 11 | Phase Portraits (2D classification) |
| 12 | Stability Analysis |
| 13 | Laplace Transform Basics |
| 14 | Solving ODEs with Laplace Transforms |
| 15 | Convolution & Laplace |
| 16 | Series Solutions |
| 17 | Fourier Series for DEs |
| 18 | Boundary Value Problems |
| 19 | Partial DEs Introduction (heat, wave, classification) |
| 20 | Heat Equation (separation of variables) |
| 21 | Wave Equation |
| 22 | Numerical Methods for ODEs (Runge-Kutta) |
| 23 | Stiff Systems & Implicit Methods |
| 24 | Dynamical Systems & Chaos (Lorenz attractor) |
| 25 | Applications: Neural ODEs, Physics-Informed NNs |

### tier-12: Multivariable Calculus (20 lessons)

Prerequisites: Tier 3, Tier 2.

| # | Topic |
|---|-------|
| 01 | Vector-Valued Functions (3D parametric curves) |
| 02 | Arc Length & Curvature |
| 03 | Multivariable Limits & Continuity |
| 04 | Partial Derivatives (deeper treatment) |
| 05 | Tangent Planes & Linearization |
| 06 | Multivariable Chain Rule |
| 07 | Gradient & Directional Derivatives (deeper) |
| 08 | Optimization & Lagrange (deeper, second derivative test) |
| 09 | Double Integrals (iterated, Fubini's theorem) |
| 10 | Double Integrals in Polar Coordinates |
| 11 | Triple Integrals (Cartesian, cylindrical, spherical) |
| 12 | Change of Variables (Jacobian for integration) |
| 13 | Vector Fields (gradient, conservative fields) |
| 14 | Line Integrals (scalar and vector) |
| 15 | Green's Theorem |
| 16 | Divergence & Curl |
| 17 | Surface Integrals & Flux |
| 18 | Stokes' Theorem |
| 19 | Divergence Theorem |
| 20 | Applications (fluid flow, electromagnetism, ML) |

---

## Phase 4: Advanced Discrete & Statistics (MEDIUM-LOW)

**33 new lessons**

### tier-13: Advanced Discrete Mathematics (18 lessons)

Prerequisites: Tier 1, foundation-3.

01 Number Theory Foundations — 02 Modular Arithmetic Advanced —
03 Fermat & Euler's Theorems — 04 RSA Cryptography —
05 Boolean Algebra Advanced — 06 Recurrence Relations —
07 Generating Functions — 08 Advanced Graph Theory —
09 Graph Algorithms (BFS, DFS, shortest paths) — 10 Network Flow —
11 Matching Theory — 12 Automata (DFA, NFA) —
13 Context-Free Grammars — 14 Turing Machines —
15 Computational Complexity (P, NP) — 16 Information Theory Advanced —
17 Algorithmic Game Theory — 18 Lattices & Partial Orders

### tier-14: Advanced Statistics & Inference (15 lessons)

Prerequisites: Tier 4, Tier 3, Tier 2.

01 Estimation Theory — 02 Method of Moments —
03 Hypothesis Testing Foundations — 04 Z-Test & T-Test —
05 Chi-Squared Tests — 06 ANOVA —
07 Linear Regression (matrix form) — 08 Multiple Regression —
09 Logistic Regression — 10 Nonparametric Methods —
11 Bayesian Inference — 12 Bayesian Computation (MCMC) —
13 Causal Inference Introduction — 14 Experimental Design —
15 Bootstrap & Resampling

---

## Phase 5: Formal Mathematics (LOW priority)

**24 new lessons**

### tier-15: Methods of Proof (12 lessons)
01 Propositional Logic Formal — 02 Predicate Logic —
03 Direct Proof — 04 Proof by Contradiction —
05 Proof by Contrapositive — 06 Strong Induction —
07 Proof by Cases — 08 Set Theory Proofs —
09 Function Proofs — 10 Cardinality —
11 Epsilon-Delta Proofs — 12 Proof Writing Workshop

### tier-16: Abstract Algebra (12 lessons)
01 Groups — 02 Subgroups & Cyclic Groups —
03 Permutation Groups — 04 Cosets & Lagrange —
05 Normal Subgroups & Quotients — 06 Homomorphisms —
07 Rings — 08 Polynomial Rings —
09 Ideals & Quotient Rings — 10 Fields & Extensions —
11 Applications: Cryptography (elliptic curves, AES) —
12 Symmetry in Neural Networks (equivariant NNs)

---

## Complete Self-Study Path (Grade 8 → AI/ML)

```
STAGE 1: Build Algebra (weeks 1-6)
  ├── foundation-1: Algebra Foundations (12 lessons)
  └── foundation-2: Functions & Graphs (10 lessons)

STAGE 2: Number Systems & Logic (weeks 7-10)
  ├── tier-0: Number Systems (5 lessons)
  └── tier-1: Discrete Mathematics (6 lessons)

STAGE 3: Advanced Algebra & Pre-Calc (weeks 11-15)
  ├── foundation-3: Advanced Algebra (10 lessons)
  ├── foundation-4: Pre-Calculus (8 lessons)
  └── supplementary-graphs: Graph Shapes (5 lessons, optional)

STAGE 4: Core Mathematics (weeks 16-30)
  ├── tier-2: Linear Algebra (22 lessons)
  ├── tier-3: Calculus (10 lessons)
  └── tier-4: Probability & Statistics (15 lessons)

STAGE 5: Applied ML (weeks 31-38)
  ├── tier-5: Optimisation (7 lessons)
  ├── tier-6: Neural Networks (6 lessons)
  └── tier-7: CNNs (6 lessons)

STAGE 6: Specializations (weeks 39+)
  ├── AI/ML:    tier-10 → tier-14 → tier-12
  ├── Game Dev: tier-8 → tier-9 → tier-11
  └── Deeper:   tier-11 → tier-12 → tier-13 → tier-14 → tier-15 → tier-16
```

---

## Summary

| Phase | New | Relocated | Total | Priority |
|-------|-----|-----------|-------|----------|
| Phase 1: Foundation tiers | 32 | 8 | 40 | CRITICAL |
| Phase 2: Learning paths + sidebar | 0 | 0 | Frontend/backend | HIGH |
| Phase 3: Diff Eq + Multivariable | 45 | 0 | 45 | MEDIUM |
| Phase 4: Adv Discrete + Stats | 33 | 0 | 33 | MEDIUM-LOW |
| Phase 5: Proofs + Abstract Algebra | 24 | 0 | 24 | LOW |
| **TOTAL** | **134** | **8** | **142** | |

**Final count: 127 existing + 134 new = ~261 lessons**

---

## Design Principles

- **Exercises point to reference links** — practice problems in our lessons reference
  the agenda files, not duplicated content
- **Paper & pen first** — every lesson derives concepts by hand before Python
- **Visualisations in every lesson** — matplotlib for geometric/structural concepts
- **Each lesson is one concept** — micro-scaffolded, no multi-concept jumps

---

## Verification

- Build script (`build-static.py`) discovers foundation-* directories
- Frontend sidebar shows foundation tiers before tier-0
- Prerequisite links work for `Foundation N, Lesson M` format
- Learning path JSON loads and renders in the UI
- All new lessons follow the existing format
- Relocated lessons have updated prerequisite references
- Old supplementary-foundations URLs redirect or show guidance
