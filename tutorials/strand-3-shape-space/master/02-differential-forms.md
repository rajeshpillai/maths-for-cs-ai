---
strand: shape-space
level: master
order: 2
title: Differential Forms and Stokes' Theorem
prerequisites:
  - tier: strand-3-shape-space-master
    slug: 01-tangent-bundles
    description: Tangent bundles
connections:
  - strand-3-shape-space-master/03-riemannian-geometry
applications:
  - cs: "Maxwell's equations, fluid simulation, modern physics"
  - life: "Things you integrate over manifolds"
---

# Differential Forms and Stokes' Theorem

## Mental

A **$k$-form** $\omega$ on a manifold $M$ is a smooth section of the
$k$-th exterior power of the cotangent bundle:
$\omega(p) \in \Lambda^k T_p^* M$.

In coordinates: $\omega = \sum f_{i_1, \ldots, i_k}(x) \, dx^{i_1} \wedge \ldots \wedge dx^{i_k}$.

Examples:

- **0-form**: function $f : M \to \mathbb{R}$.
- **1-form**: $df = \sum (\partial f / \partial x^i) dx^i$.
- **$n$-form** on $n$-manifold: volume form.

The **wedge product** $\wedge$ is anti-commutative on 1-forms:
$dx^i \wedge dx^j = -dx^j \wedge dx^i$.

## Exterior derivative

The **exterior derivative** $d : \Omega^k \to \Omega^{k+1}$:

- $d f$: usual differential of a function.
- $d(\omega \wedge \eta) = d\omega \wedge \eta + (-1)^k \omega \wedge d\eta$.
- $d^2 = 0$ — fundamental.

The condition $d^2 = 0$ gives **de Rham cohomology** $H^k_{\rm dR}(M) = \ker d / \mathrm{im}\, d$.

## Stokes' theorem (general)

For a smooth manifold $M$ with boundary $\partial M$ and a
$(k-1)$-form $\omega$:

$$
\int_M d\omega = \int_{\partial M} \omega.
$$

Generalises FTC, Green, Stokes (3D), divergence theorem all at once.

## de Rham theorem

**Theorem**: $H^k_{\rm dR}(M) \cong H^k(M; \mathbb{R})$ — de Rham
cohomology equals singular cohomology with real coefficients.

The "differential" and "topological" notions of cohomology agree for
smooth manifolds.

## Interactive

:::widget type=numeric-input prompt="$k$-form on $n$-manifold: section of $\\Lambda^k T^* M$. Wedge product anti-commutative. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$d^2 = 0$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Stokes': $\\int_M d\\omega = \\int_{\\partial M} \\omega$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="de Rham theorem: smooth and topological cohomology agree (over $\\mathbb{R}$). Type 1." answer=1 explain="Yes.":::

## Symbolic

**Closed and exact**:

- $\omega$ **closed**: $d\omega = 0$.
- $\omega$ **exact**: $\omega = d\eta$ for some $\eta$.

Exact ⇒ closed ($d^2 = 0$). Converse fails — measured by
$H^*_{\rm dR}(M)$.

**Hodge star** $*$: bijection between $\Omega^k$ and $\Omega^{n-k}$
via Riemannian metric. Used to define **Hodge Laplacian**
$\Delta = d d^* + d^* d$.

**Hodge theorem**: every cohomology class has unique harmonic
representative ($\Delta = 0$). Foundation of geometric analysis.

**Symplectic geometry**: a 2-form $\omega$ that is closed and
non-degenerate. Phase space of physics.

## Computational

```python
import sympy as sp

# Differential forms in R^3 — symbolic
x, y, z = sp.symbols("x y z")

# 1-form omega = x dy
# d(omega) = d(x) wedge dy = dx wedge dy
# So d^2(omega) = d(dx wedge dy) = 0

# Verify d^2 = 0 abstractly using wedge of basis 1-forms
# dx ∧ dy ∧ dz is the standard volume form on R^3

# In R^3 with cartesian coords, identify:
# 1-forms ↔ vector fields via P dx + Q dy + R dz ↔ (P, Q, R)
# 2-forms ↔ vector fields via P dy∧dz + Q dz∧dx + R dx∧dy ↔ (P, Q, R)
# d(0-form f) = grad f
# d(1-form ↔ F) = curl F (as 2-form)
# d(2-form ↔ F) = div F (as 3-form)

# So d^2 = 0 says: curl(grad f) = 0, div(curl F) = 0 — classical identities.
print("d² = 0 packages curl(grad) = 0 and div(curl) = 0")

# Stokes' on a disk: ∫_∂D (P dx + Q dy) = ∫_D (∂Q/∂x - ∂P/∂y) dA
# This is Green's theorem (Strand 4 Advanced Lesson 08)

# Verify Green for ω = x dy on unit disk
P_form = 0
Q_form = x
print(sp.diff(Q_form, x) - sp.diff(P_form, y))     # 1 — area enclosed
# Disk has area π, so ∮ x dy over unit circle = π — verifiable
```

## Applied

- **Maxwell's equations** in differential-form notation: $dF = 0$ and
  $d * F = J$. Compact unification of all four classical equations.
- **General relativity** — Einstein equations expressed via
  curvature 2-forms.
- **Symplectic geometry / Hamiltonian mechanics** — phase space is a
  symplectic manifold; Hamilton's equations preserve the symplectic
  form.
- **Discrete differential geometry** — meshes carry discrete
  $k$-forms; finite-element methods integrate them.
- **Topological data analysis** — persistent de Rham cohomology of
  filtered spaces.

## Check Your Understanding

:::widget type=numeric-input prompt="$d^2 = 0$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Stokes' generalises FTC, Green, divergence. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="de Rham = singular cohomology over $\\mathbb{R}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Maxwell: $dF = 0$ and $d * F = J$. Type 1." answer=1 explain="Yes.":::
