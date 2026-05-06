---
strand: shape-space
level: research
order: 4
title: Geometric Measure Theory
prerequisites:
  - tier: strand-3-shape-space-research
    slug: 03-non-abelian-hodge
    description: Non-abelian Hodge
connections:
  - strand-3-shape-space-research/05-ricci-flow-deeper
applications:
  - cs: "Image-segmentation methods, surface reconstruction"
  - life: "Calculus of low-regularity surfaces"
---

# Geometric Measure Theory

## Explain Like I Am 7

Soap bubbles love to be smooth — but when three soap films meet,
they form a sharp edge instead of a gentle curve.  Old-style
geometry only handles smooth shapes, so it can't talk about that
edge.  **Geometric measure theory** invents a new vocabulary for
shapes with creases, splatters, and cracks — surfaces that can be
crinkly almost everywhere yet still have a sensible total area.
With it we can ask "what's the smallest soapy film stretched across
this loopy wire?" and actually find the answer.

## Mental

**Geometric measure theory (GMT)** extends differential geometry to
*low-regularity* objects: rectifiable sets, currents, varifolds.

Motivation: minimisers of geometric variational problems
(soap films, area-minimising surfaces) need not be smooth.
Classical methods fail; GMT provides the framework.

## Currents

A **$k$-current** $T$: continuous linear functional on smooth
compactly-supported $k$-forms. Generalises:

- Smooth oriented $k$-submanifold (integrate forms over it).
- Distributions ($0$-currents).
- Rectifiable sets (integral currents).

Currents have a **boundary** $\partial T$ (codimension 1 current),
and **mass** $\mathbf M(T)$ (a generalised volume).

**Plateau problem**: find an oriented surface of least area with given
boundary curve. **Existence in current setting** (Federer-Fleming
1960) generalises classical existence.

## Allard regularity

Even for area-minimising currents, regularity isn't automatic.
**Allard's theorem** (1972): away from a set of small Hausdorff
dimension, area-minimising rectifiable currents are smooth.

In low codimension (e.g., area-min hypersurfaces in $\mathbb R^n$,
$n \le 7$): smooth except possibly at a small set. In $n = 8$:
**Simons cone** — first example of singular minimiser.

## Worked example: minimal surfaces

A **minimal surface** has zero mean curvature: solution to
$\nabla \cdot \frac{\nabla u}{\sqrt{1 + |\nabla u|^2}} = 0$.

For a fixed boundary, the *area-minimising* surface (if it exists)
is minimal. Existence may fail classically; GMT proves a *current*
exists.

Catenoid, helicoid, Costa surface — classical smooth minimal
surfaces in $\mathbb R^3$.

## Interactive

:::widget type=numeric-input prompt="GMT studies low-regularity surfaces and minimisers. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Plateau's problem: existence proven in current setting (Federer-Fleming 1960). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Simons cone: first singular minimiser, dim 8. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Allard regularity in low codimension. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Hausdorff dimension and measure**: fractal-friendly notion of
dimension. Cantor set $C$: $\dim_H(C) = \log 2 / \log 3 \approx 0.63$.

**Rectifiable sets**: countable union of Lipschitz images of subsets
of $\mathbb R^k$, modulo Hausdorff $k$-measure zero.

**Varifolds**: non-oriented analogue of currents. Used in mean-curvature
flow.

**Brakke flow**: weak version of mean-curvature flow on varifolds.

**Relative Plateau problem**: prescribed boundary topology constraints.

## Computational

```python
# Minimal surfaces: numerical computation via mean-curvature flow

import numpy as np

# Catenoid: surface of revolution of cosh
# x = a cosh(z/a), parameterize (z, theta)

a = 1
z_vals = np.linspace(-1, 1, 50)
theta_vals = np.linspace(0, 2*np.pi, 50)
Z, T = np.meshgrid(z_vals, theta_vals)
X = a * np.cosh(Z / a) * np.cos(T)
Y = a * np.cosh(Z / a) * np.sin(T)

# Mean curvature should be 0 — verify numerically
# H = (κ_1 + κ_2) / 2 where κ_i are principal curvatures
# For surface of revolution catenoid, H = 0 exactly
print("Catenoid: minimal surface (H = 0 everywhere).")

# Costa surface: more complex; minimal surface with three ends
# discovered 1982 — first example beyond classical catalogue

# Numerical minimal-surface computation: Brakke's Surface Evolver
# Mean-curvature flow simulators: many discrete-differential-geometry packages
print("Numerical minimal surfaces: Surface Evolver (Brakke), libraries like libigl.")
```

## Applied

- **Image segmentation** — Mumford-Shah functional minimised via
  geometric-measure-theoretic methods.
- **Soap film modelling** — physical interpretation of minimal
  surfaces.
- **Computer graphics — surface reconstruction** — variational
  approaches to recovering surfaces from point clouds.
- **General relativity — Penrose inequality** — proven via
  GMT-style mass / area inequalities.
- **Materials science** — minimal-surface microstructures (e.g.,
  triply-periodic minimal surfaces in nature).

## Check Your Understanding

:::widget type=numeric-input prompt="GMT extends DG to low-regularity. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Plateau's problem: existence via currents. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hausdorff dimension of standard Cantor: $\\log 2 / \\log 3$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Catenoid is a minimal surface. Type 1." answer=1 explain="Yes.":::
