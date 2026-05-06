---
strand: shape-space
level: research
order: 5
title: Ricci Flow and Geometric Analysis
prerequisites:
  - tier: strand-3-shape-space-research
    slug: 04-geometric-measure-theory
    description: Geometric measure theory
connections:
  - strand-3-shape-space-research/06-symplectic-frontier
applications:
  - cs: "Manifold-based ML smoothing, geometric DL"
  - life: "Heat equation on the metric itself"
---

# Ricci Flow and Geometric Analysis

## Explain Like I Am 7

Pour hot water on a lumpy ice sculpture and watch it slowly smooth
out into a round shape.  **Ricci flow** is exactly that idea, but
for the bumps in the *shape of space itself*: a rule that gradually
melts away the wrinkly bits of a curved world while leaving its
big features alone.  Mathematicians used this melting trick to
solve the Poincaré conjecture — a famous riddle from 1904 about
which 3D shapes are secretly just round balls in disguise.

## Mental

**Hamilton's Ricci flow** (1982): evolve a Riemannian metric $g$ by

$$
\partial_t g = -2 \mathrm{Ric}(g).
$$

A nonlinear PDE on tensors. Smoothes geometry over time, much as
heat equation smoothes functions.

## Perelman's program

**Grigori Perelman** (2003): proved Poincaré conjecture (and full
Thurston geometrisation) using Ricci flow with surgery:

1. Run Ricci flow on a 3-manifold.
2. Singularities form: take *surgery* (remove neck, glue caps).
3. Continue flow.
4. Decompose final pieces according to Thurston's eight geometries.

Perelman declined Fields medal (2006) and \$1M Clay prize. His
preprints (3 short papers, 2002-2003) remain among the most
influential.

## $\mathcal F$ and $\mathcal W$ functionals

Perelman introduced two functionals **monotonically increasing**
along Ricci flow:

- **$\mathcal F$-energy**: $\mathcal F(g, f) = \int (R + |\nabla f|^2) e^{-f} dV$.
- **$\mathcal W$-entropy**: $\mathcal W(g, f, \tau) = \int [\tau(R + |\nabla f|^2) + f - n](4\pi\tau)^{-n/2} e^{-f} dV$.

Their monotonicity controls singularity formation.

## Applications

- **Poincaré conjecture** (Perelman 2003).
- **Thurston geometrisation** (Perelman 2003).
- **Sphere theorem** (Brendle-Schoen 2007): pinched-curvature
  manifolds are diffeomorphic to spheres.
- **Differentiable sphere theorem**: refined sphere classification.

## Interactive

:::widget type=numeric-input prompt="Hamilton 1982 Ricci flow $\\partial_t g = -2 \\mathrm{Ric}(g)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Perelman 2003 proved Poincaré conjecture. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Perelman declined Fields medal 2006. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Brendle-Schoen 2007: pinched-curvature sphere theorem. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Mean curvature flow** (MCF): evolve hypersurface by mean
curvature. Applications: image processing, surface evolution.

**Kähler-Ricci flow**: complex / Kähler version. Used in proving
Yau-Tian-Donaldson conjecture (existence of Kähler-Einstein
metrics).

**G_2 flow** (Bryant-Hitchin): deforms $G_2$ structures. Used in
constructing exceptional holonomy manifolds.

**Ricci solitons**: self-similar solutions; classify singularity
models.

## Computational

```python
import numpy as np

# Ricci flow on a 2-manifold = uniformization
# For surfaces: g_t = e^{2u} g_0 with ∂_t u = e^{-2u} (K_avg - K)

# Discrete Ricci flow on triangle meshes (Chow-Luo, Glickenstein)
# - Each vertex has a "circle radius" r_v
# - Edge length = function of incident radii
# - Flow toward target curvature

# For a tetrahedron: target curvature = 4π / 4 = π per vertex (Gauss-Bonnet)
# Discrete Ricci flow converges to ideal tetrahedral structure

# Tiny demo: cooling-of-curvature on a 2-sphere (already constant curvature)
# - Initial metric perturbed
# - Ricci flow returns to round metric

import scipy.linalg as la

# Symbolic illustration: 2D Ricci flow ∂_t g_{ij} = -2 R g_{ij} (constant scalar)
# For round sphere of radius r: g = r² g_round, R = 2/r²
# So ∂_t (r²) = -2 (2/r²) r² = -4 → r² shrinks linearly
print("Round sphere: r² → r² - 4t under Ricci flow.")
print("Sphere shrinks to point at t = r₀² / 4.")
print("Numerical demo: r₀ = 1, extinguishes at t = 0.25")
```

## Applied

- **Topology** — Poincaré + geometrisation conjectures resolved.
- **Mathematical physics** — Ricci flow and renormalisation-group flow
  are formally analogous.
- **Computer graphics** — discrete Ricci flow on meshes for surface
  parameterisation.
- **Manifold ML** — geometric flows on data-derived manifolds for
  denoising.
- **Climate / fluid models** — geometric-flow ideas in continuum
  mechanics.

## Check Your Understanding

:::widget type=numeric-input prompt="Hamilton 1982 introduced Ricci flow. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Perelman proved Poincaré via Ricci flow with surgery. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Perelman declined Fields and Clay prize. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Round sphere shrinks to point under Ricci flow. Type 1." answer=1 explain="Yes.":::
