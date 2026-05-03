---
strand: shape-space
level: master
order: 0
title: Smooth Manifolds
prerequisites:
  - tier: strand-3-shape-space-advanced
    slug: 09-shape-space-capstone-3
    description: Shape & Space advanced capstone
connections:
  - strand-3-shape-space-master/01-tangent-bundles
applications:
  - cs: "Manifold learning, robotics configuration spaces, GR simulation"
  - life: "Spaces that locally look like Euclidean space"
---

# Smooth Manifolds

## Mental

A **smooth manifold** $M$ of dimension $n$ is a topological space
that:

- Is **Hausdorff** and **second-countable**.
- Has a **smooth atlas**: a collection of charts (homeomorphisms
  $\phi_\alpha : U_\alpha \to V_\alpha \subseteq \mathbb{R}^n$) covering
  $M$, with smooth transition maps $\phi_\beta \circ \phi_\alpha^{-1}$.

Locally, $M$ is just $\mathbb{R}^n$. Globally, the chart-overlap
structure gives the manifold its non-trivial topology.

## Examples

| Manifold | Description |
|---|---|
| $\mathbb{R}^n$ | Trivially a manifold |
| $S^n$ | $n$-sphere, dim $n$ |
| $T^n$ | $n$-torus, dim $n$ |
| $\mathrm{SO}(n)$ | rotation group, dim $n(n-1)/2$ |
| $\mathrm{GL}_n(\mathbb{R})$ | invertible matrices, dim $n^2$ |
| Configuration spaces in robotics | typically $\mathrm{SE}(3)^k$ |

## Smooth functions and maps

$f : M \to \mathbb{R}$ is **smooth** if $f \circ \phi_\alpha^{-1}$ is
smooth as a function $\mathbb{R}^n \to \mathbb{R}$ for each chart.

Similarly **smooth maps** $f : M \to N$ between manifolds.

## Submanifolds and immersions

- **Embedded submanifold**: subset $S \subseteq M$ that's itself a
  manifold via inclusion charts.
- **Immersion**: a smooth $f : N \to M$ with injective differential
  at every point.
- **Embedding**: an injective immersion that's a homeomorphism onto
  its image.

**Whitney embedding theorem**: every smooth $n$-manifold embeds in
$\mathbb{R}^{2n}$.

## Interactive

:::widget type=numeric-input prompt="$\\dim S^2 = ?$" answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="$\\dim \\mathrm{SO}(3) = 3 \\cdot 2 / 2 = ?$" answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="Whitney: $n$-manifold embeds in $\\mathbb{R}^{2n}$. For $n = 2$: $\\mathbb{R}^?$" answer=4 explain="$\\mathbb{R}^4$.":::

:::widget type=numeric-input prompt="Manifold's transition maps must be smooth. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Tangent vector** at $p \in M$: equivalence class of curves through
$p$ with the same first-order behaviour. Tangent space $T_p M$ is a
real vector space of dimension $n$.

**Tangent bundle** $TM = \bigsqcup_p T_p M$: itself a smooth
manifold of dimension $2n$.

**Diffeomorphism**: a smooth bijection with smooth inverse. The
right notion of "isomorphism" of manifolds.

**Exotic structures**: in dimension 4, there are *uncountably many*
smooth structures on $\mathbb{R}^4$ (Donaldson, Freedman). Mind-
bending — true only in dimension 4.

## Computational

```python
import numpy as np

# Charts on the 2-sphere
def chart_north_stereographic(p):
    x, y, z = p
    if z == 1: return None
    return (x / (1 - z), y / (1 - z))

def chart_south_stereographic(p):
    x, y, z = p
    if z == -1: return None
    return (x / (1 + z), y / (1 + z))

# Test on a few sphere points
import math
for theta, phi in [(0, 0), (np.pi/2, 0), (np.pi/3, np.pi/4)]:
    p = (math.sin(theta) * math.cos(phi),
         math.sin(theta) * math.sin(phi),
         math.cos(theta))
    print(p, chart_north_stereographic(p), chart_south_stereographic(p))

# Configuration space of two-link arm in 2D: T² (torus, S¹ × S¹)
# Each link has angle θ_i ∈ S¹.
# This is dim 2 — match with intuition.

# SO(3) parameterisation via axis-angle
def rotation_matrix_axis_angle(axis, angle):
    axis = axis / np.linalg.norm(axis)
    K = np.array([[0, -axis[2], axis[1]],
                  [axis[2], 0, -axis[0]],
                  [-axis[1], axis[0], 0]])
    return np.eye(3) + np.sin(angle) * K + (1 - np.cos(angle)) * (K @ K)

R = rotation_matrix_axis_angle(np.array([0, 0, 1]), np.pi / 4)
print(R)
print(R.T @ R)        # ~identity — confirms SO(3) element
```

## Applied

- **Manifold learning** — high-dimensional data assumed to lie on a
  low-dimensional manifold; methods (Isomap, LLE, t-SNE, UMAP) recover
  manifold structure for visualisation/clustering.
- **Robotics** — configuration spaces are manifolds (e.g., $\mathrm{SE}(3)$
  for rigid bodies).
- **General relativity** — spacetime is a 4D Lorentzian manifold.
- **Computer graphics** — surface processing on triangle meshes
  approximates a 2-manifold.
- **Lie group machine learning** — group-equivariant networks
  exploit smooth manifold structure of the group.

## Check Your Understanding

:::widget type=numeric-input prompt="$n$-manifold locally looks like $\\mathbb{R}^n$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Diffeomorphism: smooth bijection with smooth inverse. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$T_p M$ has dim $n$ for $n$-manifold $M$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Whitney: $n$-manifold embeds in $\\mathbb{R}^{2n}$. Type 1." answer=1 explain="Yes.":::
