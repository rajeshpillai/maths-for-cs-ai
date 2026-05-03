---
strand: shape-space
level: research
order: 8
title: Optimal Transport on Manifolds
prerequisites:
  - tier: strand-3-shape-space-research
    slug: 07-tda-frontier
    description: TDA frontier
connections:
  - strand-3-shape-space-research/09-shape-research-capstone
applications:
  - cs: "Wasserstein gradient flows, normalising flows on manifolds"
  - life: "OT geometry on curved spaces"
---

# Optimal Transport on Manifolds

## Mental

Strand 6 Master Lesson 07 introduced Wasserstein optimal transport.
**On Riemannian manifolds**, the theory becomes geometrically richer:

- **Riemannian Wasserstein** $W_2$ on probability measures over $M$.
- **McCann displacement convexity**: convexity along $W_2$ geodesics
  characterises curvature of the underlying space.

## Lott-Villani-Sturm

**Lott-Villani-Sturm** (independently 2006-2009): defined Ricci-
curvature lower bounds via OT — **synthetically** in metric-measure
spaces:

$$
M \text{ has Ricci} \ge K \quad \iff \quad \mathrm{Ent} \text{ is } K\text{-convex along } W_2 \text{ geodesics}.
$$

Generalises Ricci curvature beyond smooth manifolds — to graphs,
metric trees, fractals.

## Brenier on manifolds

McCann's theorem: for Riemannian manifolds and quadratic cost, the
optimal map exists and is the gradient of a $c$-convex function
(generalising Brenier).

## Wasserstein geometry as Riemannian

Otto's calculus: $\mathcal P(M)$ as an infinite-dim Riemannian
manifold under $W_2$. Heat equation = entropy-gradient flow
(JKO scheme — Strand 6 Master Lesson 07).

**Otto-Westdickenberg-Villani**: gradient-flow PDEs on
$\mathcal P(M)$ classify many evolution equations.

## Interactive

:::widget type=numeric-input prompt="McCann displacement convexity characterises Ricci. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lott-Villani-Sturm: synthetic Ricci on metric-measure spaces. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Heat equation = entropy gradient flow under $W_2$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Brenier-McCann: optimal map = gradient of $c$-convex function. Type 1." answer=1 explain="Yes.":::

## Symbolic

**$\mathrm{CD}(K, N)$ spaces**: metric-measure spaces with
synthetic Ricci $\ge K$ and dimension $\le N$. Theory developed by
Lott-Villani-Sturm.

**Rcd spaces**: Riemannian-like CD spaces; Ambrosio-Gigli-Savaré.
Stable under measured Gromov-Hausdorff limits.

**Ricci-limit spaces**: limits of manifolds with Ricci $\ge K$;
non-smooth in general but synthetically Ricci-controlled.

**Schrödinger problem**: entropic OT as classical limit of
Schrödinger problem; modern bridge between OT and statistical
mechanics.

## Computational

```python
import numpy as np

# OT on the sphere S²
# Distance: geodesic (great-circle)
def geodesic_distance(p, q):
    return np.arccos(np.clip(np.dot(p, q), -1, 1))

# Two Dirac measures at p and q
p = np.array([1, 0, 0])
q = np.array([0, 1, 0])
print(f"W₁ between δ_p and δ_q on S²: {geodesic_distance(p, q):.4f}")
# = π/2

# Heat equation on sphere = gradient flow of entropy in Wasserstein
# Concrete simulation requires discretising sphere + solving heat PDE

# Synthetic Ricci on a graph: discrete Bakry-Émery
def discrete_bakry_emery(graph_laplacian):
    """Ricci lower bound via curvature-dimension inequality."""
    # Simplified — full impl uses graph Laplacian eigenvalues
    eigs = np.linalg.eigvalsh(graph_laplacian)
    spectral_gap = eigs[1] if len(eigs) > 1 else 0
    return spectral_gap / 2   # rough approximation

# Path graph Laplacian
n = 5
L = np.eye(n) - 0.5 * (np.eye(n, k=1) + np.eye(n, k=-1))
L[0, 0] = L[n-1, n-1] = 0.5
print(f"Synthetic Ricci approx for path graph: {discrete_bakry_emery(L):.4f}")
```

## Applied

- **Shape analysis** — Wasserstein metric on shape spaces; medical
  imaging.
- **Single-cell biology** — Schiebinger et al. waddington-OT for
  cell-fate trajectories.
- **Manifold-aware ML** — natural-gradient methods generalise via
  $W_2$ geometry.
- **Mathematical physics** — synthetic Ricci formulations of
  Ricci flow on metric-measure spaces.
- **Statistical inference** — Wasserstein-based hypothesis tests,
  generative-model evaluation.

## Check Your Understanding

:::widget type=numeric-input prompt="LVS: synthetic Ricci ⇔ entropy convex along $W_2$ geodesics. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Brenier-McCann: optimal map = gradient of convex potential. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathrm{CD}(K, N)$ spaces: synthetic Ricci ≥ K, dim ≤ N. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Heat eq on Riemannian = $W_2$ gradient flow of entropy. Type 1." answer=1 explain="Yes.":::
