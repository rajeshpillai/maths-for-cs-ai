---
strand: change
level: research
order: 8
title: PDEs on Manifolds and Geometric Flows
prerequisites:
  - tier: strand-4-change-research
    slug: 07-generative-flows
    description: Generative flows
connections:
  - strand-4-change-research/09-change-research-capstone
applications:
  - cs: "Mesh-based simulation, geometric DL, GR numerics"
  - life: "Heat, wave, Ricci flow on curved spaces"
---

# PDEs on Manifolds and Geometric Flows

## Mental

PDEs traditionally on $\mathbb R^n$ extend to **PDEs on manifolds**:

- Replace $\Delta$ by **Laplace-Beltrami** $\Delta_g$.
- Replace $\nabla$ by covariant derivative.
- Boundary $\partial M$, curvature, holonomy enter.

## Geometric flows

A **geometric flow** evolves a geometric object (metric, embedding,
section) by a PDE. Examples:

- **Mean curvature flow** (MCF): hypersurface evolves by mean
  curvature vector.
- **Ricci flow** (Strand 3 Research Lesson 05): metric evolves
  by $-2 \mathrm{Ric}$.
- **Yamabe flow**: metric evolves to constant scalar curvature.
- **Harmonic map flow**: maps $f : M \to N$ evolve toward harmonic.
- **Calabi flow**: metric evolves toward extremal Kähler.

## Hodge Laplacian

For differential forms on Riemannian $M$:

$$
\Delta = d d^* + d^* d.
$$

Diagonal in Hodge decomposition; harmonic forms (kernel of $\Delta$)
represent cohomology (Hodge theorem).

## Mean curvature flow

For hypersurface $\Sigma \subset \mathbb R^{n+1}$:

$$
\partial_t F = -H \nu,
$$

where $F$ is embedding, $H$ mean curvature, $\nu$ outward normal.

**Singularities**: spheres collapse in finite time; cylinders
asymptote to round cylinders; *level-set MCF* extends past
singularities (Evans-Spruck, Chen-Giga-Goto 1991).

## Interactive

:::widget type=numeric-input prompt="Laplace-Beltrami $\\Delta_g$ on Riemannian. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Mean-curvature flow: $\\partial_t F = -H \\nu$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Sphere shrinks to point in finite time under MCF. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hodge Laplacian: harmonic forms = cohomology. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Brakke flow**: weak-solution form of MCF on varifolds (low-
regularity surfaces).

**Mean-curvature flow with surgery**: topology-controlled extension
of MCF past singularities.

**Yang-Mills flow**: gauge-theoretic flow on connections; used in
4-manifold topology.

**Gradient Ricci solitons**: self-similar Ricci flow; classify
singularity models.

**Spectral geometry**: eigenvalues of $\Delta_g$ — heat kernel asymptotics
($\mathrm{tr}(e^{-t\Delta}) \sim t^{-n/2}$ + Weyl law).

## Computational

```python
import numpy as np

# Heat equation on a sphere via spherical harmonics
# u_t = Δ_g u

# On S², spherical harmonics Y_l^m have eigenvalue -l(l+1)
# Solution: u(t) = Σ a_lm e^{-l(l+1) t} Y_l^m

# Demo: initial bump near north pole, evolve
def gauss_sphere(theta, phi, sigma=0.5):
    """Gaussian-like initial condition on sphere."""
    return np.exp(-theta**2 / (2 * sigma**2))

# Project onto first few spherical harmonics (numeric estimation)
# For demo: just report eigenvalue decay
print("Spherical heat decay:")
for l in range(5):
    decay_rate = l * (l + 1)
    print(f"  Y_{l}^*: e^{-decay_rate} t mode decays at rate {decay_rate}")

# Mean curvature flow: sphere of radius r shrinks with dr/dt = -1/r
# Solution: r(t) = sqrt(r_0² - 2t)
r0 = 1
print(f"\nMCF sphere shrinkage: extinct at t = r₀²/2 = {r0**2 / 2}")

# Numerical MCF on triangle meshes: discrete mean curvature normal flow
# (Desbrun et al., Pinkall-Polthier)
print("Discrete MCF on meshes: standard in geometry-processing libraries.")
```

## Applied

- **Image processing** — anisotropic diffusion, edge-preserving
  smoothing.
- **Mesh smoothing / fairing** — discrete mean-curvature flow.
- **Crystal growth modelling** — Stefan problem, phase-field
  models.
- **Computer vision** — active contours / snakes evolve via curvature
  flows.
- **General relativity numerics** — spacetime PDEs on Lorentzian
  manifolds.

## Check Your Understanding

:::widget type=numeric-input prompt="Laplace-Beltrami generalises Laplacian to Riemannian. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Sphere extinction under MCF: $r_0^2 / 2$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hodge theorem: harmonic = cohomology rep. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Brakke flow: weak MCF on varifolds. Type 1." answer=1 explain="Yes.":::
