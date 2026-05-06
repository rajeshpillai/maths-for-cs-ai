---
strand: shape-space
level: master
order: 3
title: Riemannian Geometry
prerequisites:
  - tier: strand-3-shape-space-master
    slug: 02-differential-forms
    description: Differential forms
connections:
  - strand-3-shape-space-master/04-lie-groups
applications:
  - cs: "Information geometry, optimal transport, GR"
  - life: "Manifolds with notions of length, angle, and curvature"
---

# Riemannian Geometry

## Explain Like I Am 7

You know how a ruler measures lengths on a flat table?  Now imagine
a curvy hilly world where the ruler has to bend with the ground.
**Riemannian geometry** gives the curvy world its very own ruler at
every spot — sometimes the ruler stretches, sometimes it shrinks,
depending on how the ground bunches up there.  With this clever
ruler, an ant can measure its hike's length, the angle between two
ant-trails, or the area of a hilly meadow, all without ever
peeking off the surface.

## Mental

A **Riemannian manifold** $(M, g)$ is a smooth manifold $M$ with a
**metric** $g$: a smoothly-varying inner product $g_p : T_p M \times T_p M \to \mathbb{R}$
on each tangent space.

The metric provides:

- Lengths of curves $L(\gamma) = \int |\gamma'(t)|_g \, dt$.
- Angles between tangent vectors.
- Volumes (via $\sqrt{\det g}$).

Strand 3 Advanced introduced this for surfaces (first fundamental
form). Riemannian geometry generalises to arbitrary dimensions.

## The Levi-Civita connection

For each Riemannian metric, there's a unique torsion-free
metric-compatible **connection** $\nabla$. It generalises directional
derivatives to manifolds.

For vector fields $X, Y, Z$:

- **Metric compatibility**: $X \cdot g(Y, Z) = g(\nabla_X Y, Z) + g(Y, \nabla_X Z)$.
- **Torsion-free**: $\nabla_X Y - \nabla_Y X = [X, Y]$.

Christoffel symbols $\Gamma^k_{ij}$ encode $\nabla$ in coordinates:

$$
\Gamma^k_{ij} = \frac{1}{2} g^{kl}\left(\partial_i g_{jl} + \partial_j g_{il} - \partial_l g_{ij}\right).
$$

## Riemann curvature tensor

The **curvature** $R(X, Y)Z = \nabla_X \nabla_Y Z - \nabla_Y \nabla_X Z - \nabla_{[X, Y]} Z$.

A 4-tensor (1 contravariant + 3 covariant) measuring how parallel
transport around small loops fails to return vectors to themselves.

Contractions give:

- **Ricci tensor** $R_{ij} = R^k_{ikj}$.
- **Scalar curvature** $R = g^{ij} R_{ij}$.

In 2D: scalar curvature = $2K$ where $K$ is Gauss curvature.

## Geodesics and Jacobi fields

**Geodesic**: $\nabla_{\dot \gamma} \dot \gamma = 0$. Generalises
"straight line" to manifolds.

**Jacobi field**: variation field along a geodesic, satisfying
$\ddot J + R(J, \dot \gamma) \dot \gamma = 0$. Captures
behaviour of nearby geodesics — geodesics converge in positive
curvature, diverge in negative.

## Interactive

:::widget type=numeric-input prompt="Riemannian metric on $T_p M$: inner product. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Levi-Civita connection: torsion-free + metric-compatible. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Riemann curvature: 4-tensor. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="In 2D, scalar curvature = $2K$ where $K$ = Gauss curvature. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Sectional curvature**: at each plane $\sigma \subseteq T_p M$,
$K(\sigma) = R(X, Y, X, Y)/(g(X, X) g(Y, Y) - g(X, Y)^2)$ for $X, Y$
spanning $\sigma$. Generalises Gauss curvature.

**Constant-curvature spaces**:

- $\mathbb S^n$: positive constant curvature.
- $\mathbb H^n$ (hyperbolic): negative constant curvature.
- $\mathbb R^n$: zero (flat).

Three classical geometries: spherical, Euclidean, hyperbolic.

**Comparison theorems**: Bonnet-Myers (positive Ricci → bounded
diameter), Cheng-Yau (negative curvature → unique geodesic).

**Ricci flow**: evolve metric by $\partial_t g = -2 \mathrm{Ric}(g)$.
Hamilton's equation; Perelman used it to prove the **Poincaré
conjecture** (2003) — Clay millennium problem.

## Computational

```python
import sympy as sp

# Metric on a sphere of radius R parametrised by (theta, phi)
theta, phi, R = sp.symbols("theta phi R", positive=True)

# g_{ij} = diag(R², R² sin²θ)
g = sp.Matrix([[R**2, 0], [0, R**2 * sp.sin(theta)**2]])
print(g)

# Inverse metric
g_inv = g.inv()
print(g_inv)

# Christoffel symbols (a few)
def christoffel(g, g_inv, coords, k, i, j):
    return sp.Rational(1, 2) * sum(g_inv[k, l] * (
        sp.diff(g[j, l], coords[i]) +
        sp.diff(g[i, l], coords[j]) -
        sp.diff(g[i, j], coords[l])
    ) for l in range(2))

coords = [theta, phi]
print("Γ^φ_φθ =", sp.simplify(christoffel(g, g_inv, coords, 1, 1, 0)))   # cos θ / sin θ

# Geodesic equation: explicit on sphere → great circles (Strand 3 Adv L05)
```

## Applied

- **General relativity** — spacetime is a Lorentzian manifold;
  Einstein's equations $G_{\mu\nu} = 8\pi T_{\mu\nu}$ relate curvature
  to energy.
- **Information geometry** — statistical manifolds with Fisher metric;
  natural gradient descent in ML.
- **Optimal transport** — Wasserstein metric on probability
  distributions defines a Riemannian-style structure.
- **Computer graphics** — geodesic computations on triangle meshes.
- **Robotics** — geodesic motion planning on configuration manifolds
  (e.g., $\mathrm{SE}(3)$ with bi-invariant metric).
- **Hyperbolic embeddings in NLP** — Poincaré ball model used for
  hierarchical word embeddings.

## Check Your Understanding

:::widget type=numeric-input prompt="Levi-Civita: unique torsion-free metric-compatible connection. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Ricci tensor: contraction of Riemann curvature. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Three classical geometries: spherical, Euclidean, hyperbolic. Type 3." answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="Perelman used Ricci flow to prove Poincaré conjecture. Type 1." answer=1 explain="Yes.":::
