---
strand: shape-space
level: advanced
order: 6
title: Topology — Continuous Deformation
prerequisites:
  - tier: strand-3-shape-space-advanced
    slug: 05-geodesics
    description: Geodesics
connections:
  - strand-3-shape-space-advanced/07-fundamental-group
applications:
  - cs: "Topological data analysis, mesh genus computation, network connectivity"
  - life: "Geometry without distances or angles"
---

# Topology — Continuous Deformation

## Mental

**Topology** studies properties of spaces preserved under continuous
deformations — stretching and bending, but not tearing or gluing.

Two spaces are **homeomorphic** if there's a continuous bijection
between them with continuous inverse. Famous example: a coffee mug
and a donut are homeomorphic (both have one hole).

Distance and angles disappear. What remains: connectedness, holes,
boundaries, dimension, orientability.

## Topological invariants

| Invariant | Distinguishes |
|---|---|
| Number of connected components | Disconnected spaces |
| Euler characteristic $\chi$ | Genus / number of holes |
| Fundamental group $\pi_1$ | Loop classes |
| Higher homotopy / homology | Higher-dim holes |
| Compactness | Bounded vs unbounded |
| Orientability | Möbius strip vs cylinder |

For surfaces: $\chi = 2 - 2g$ (orientable) or $\chi = 2 - g$
(non-orientable), where $g$ = genus.

| Surface | $\chi$ | $g$ |
|---|---|---|
| Sphere | 2 | 0 |
| Torus | 0 | 1 |
| Genus-2 surface | -2 | 2 |
| Klein bottle | 0 | (non-orient) |
| Möbius strip | 0 | (with boundary) |

## Worked example: Euler's formula

For a polyhedron homeomorphic to a sphere: $V - E + F = 2$.

Cube: $V = 8, E = 12, F = 6$. $8 - 12 + 6 = 2$. ✓
Tetrahedron: $V = 4, E = 6, F = 4$. $4 - 6 + 4 = 2$. ✓

For a torus-shaped polyhedron: $V - E + F = 0$.

This is **why** all sphere-like polyhedra share that formula —
topology, not geometry.

## Interactive

:::widget type=numeric-input prompt="Euler characteristic of sphere?" answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="Euler characteristic of torus?" answer=0 explain="$0$.":::

:::widget type=numeric-input prompt="Cube: $V - E + F = 8 - 12 + 6 = ?$" answer=2 explain="$2$ — same as sphere.":::

:::widget type=numeric-input prompt="A coffee mug and a donut are homeomorphic. Type 1." answer=1 explain="Yes — both have genus 1.":::

## Symbolic

**Topological space**: set $X$ with a collection $\tau$ of "open
sets" satisfying: $\emptyset, X \in \tau$; arbitrary unions and
finite intersections of open sets are open.

A **continuous map** $f : X \to Y$ pulls open sets back to open sets:
$f^{-1}(U) \in \tau_X$ for every $U \in \tau_Y$.

**Compactness**: every open cover has a finite subcover. In $\mathbb{R}^n$:
compact = closed and bounded (Heine-Borel).

**Connectedness**: $X$ can't be partitioned into two non-empty open
sets. Path-connected: any two points joined by a continuous path.

**Hausdorff**: any two points have disjoint open neighbourhoods —
the standard "niceness" condition; metric spaces are always Hausdorff.

## Computational

```python
# Compute Euler characteristic of a triangle mesh
def euler_characteristic(vertices, edges, faces):
    V = len(vertices)
    E = len(edges)
    F = len(faces)
    return V - E + F

# Tetrahedron
verts = [(0,0,0), (1,0,0), (0,1,0), (0,0,1)]
edges = [(0,1), (0,2), (0,3), (1,2), (1,3), (2,3)]
faces = [(0,1,2), (0,1,3), (0,2,3), (1,2,3)]
print(euler_characteristic(verts, edges, faces))   # 2

# Cube (need to triangulate or count quad faces)
# V=8, E=12, F=6 (square faces): chi = 2

# Torus mesh: chi = 0; if you build one, V - E + F = 0

import numpy as np
# Simple test of homeomorphism detection on graphs:
# A circle and a line segment are NOT homeomorphic (different topology)
# A figure-eight has different fundamental group than a circle
```

## Applied

- **Topological data analysis (TDA)** — detect "holes" in
  high-dim data (persistent homology, Strand 2 Advanced).
  Applications in materials science, biology, finance.
- **Mesh repair / hole filling** — track Euler characteristic during
  edits to detect topology changes.
- **Network connectivity** — graph topology underlies routing,
  resilience analysis, social-network bridges.
- **Cosmology / GR** — global topology of spacetime is constrained
  by general-relativistic + observational data.
- **Configuration spaces in robotics** — the space of valid robot
  poses has non-trivial topology; motion planning navigates it.

## Check Your Understanding

:::widget type=numeric-input prompt="Cube and tetrahedron have the same Euler characteristic — both like a sphere. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Mug and donut homeomorphic. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\chi$ of double-torus (genus 2): $\\chi = 2 - 2g = 2 - 4 = ?$" answer=-2 explain="$-2$.":::

:::widget type=numeric-input prompt="$\\mathbb{R}^n$ — compact (1) or not (0)?" answer=0 explain="Not compact — unbounded.":::
