---
strand: structure
level: master
order: 4
title: Sheaves and Cohomology
prerequisites:
  - tier: strand-2-structure-master
    slug: 03-schemes-intro
    description: Schemes
connections:
  - strand-2-structure-master/05-representation-theory
applications:
  - cs: "Type theory, distributed-systems formalisation, computer-vision local descriptors"
  - life: "Local data with consistent gluing"
---

# Sheaves and Cohomology

## Mental

A **presheaf** $\mathcal F$ on a topological space $X$:

- Assigns to each open $U \subseteq X$ an abelian group (or set) $\mathcal F(U)$.
- For $V \subseteq U$, restriction $\mathrm{res}^U_V : \mathcal F(U) \to \mathcal F(V)$.
- $\mathrm{res}^U_U = \mathrm{id}$, $\mathrm{res}^V_W \circ \mathrm{res}^U_V = \mathrm{res}^U_W$.

A **sheaf** also satisfies **gluing**: local sections that agree on
overlaps glue uniquely to a section on the union.

Examples:

- Sheaf of continuous / smooth / holomorphic functions on a manifold.
- Sheaf of solutions to a PDE.
- Structure sheaf $\mathcal O_X$ of a scheme.

## Cohomology

**Sheaf cohomology** $H^n(X, \mathcal F)$ measures **failure of
gluing**:

- $H^0(X, \mathcal F) = \mathcal F(X)$ — global sections.
- $H^1, H^2, \ldots$ — obstructions in higher dimensions.

Long exact sequence: a short exact sequence
$0 \to \mathcal F \to \mathcal G \to \mathcal H \to 0$ of sheaves
yields a long exact sequence

$$
0 \to H^0(\mathcal F) \to H^0(\mathcal G) \to H^0(\mathcal H) \to H^1(\mathcal F) \to \ldots
$$

— the workhorse of sheaf cohomology.

## de Rham, Čech, étale

Many cohomology theories with intrinsic relationships:

- **de Rham**: $H^*_{\rm dR}(X) = \ker \mathrm{d} / \mathrm{im}\, \mathrm{d}$ on differential forms (smooth manifold).
- **Čech**: $\check H^*(X, \mathcal F)$ — defined via open covers and
  cocycle conditions.
- **Singular**: topological cohomology of $X$ with $\mathbb{Z}$
  coefficients.
- **Étale**: $H^*_{\rm \acute et}(X, \mathbb{Z}_\ell)$ on schemes;
  $\ell$-adic version of singular cohomology, capturing arithmetic.

In nice cases (smooth manifold, complex variety) all agree —
**comparison theorems**.

## Worked example: $H^*(S^1, \mathbb{Z})$

For the circle $S^1$:

- $H^0 = \mathbb{Z}$ — connected.
- $H^1 = \mathbb{Z}$ — one independent 1-cocycle (winding number).
- $H^n = 0$ for $n \ge 2$.

This matches $\beta_0 = 1, \beta_1 = 1, \beta_n = 0$ from Strand 3
Advanced Lesson 08 (homology).

## Interactive

:::widget type=numeric-input prompt="$H^0(X, \\mathcal F)$: global sections. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Sheaf vs presheaf: sheaf has gluing condition. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$H^1(S^1, \\mathbb{Z}) = \\mathbb{Z}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Long exact sequence: short exact sequence of sheaves. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Derived functors**: $H^n$ are derived functors of the global-sections
functor $\Gamma(X, -)$. Generalises to derived categories.

**Spectral sequences**: compute cohomology by successive
approximation; tools like Leray, Serre, Adams.

**Riemann-Roch**: relates dimensions of cohomology groups of a line
bundle on a curve / surface to its degree, genus, etc. Fundamental
in algebraic geometry. **Hirzebruch-Riemann-Roch** generalises to
higher dimensions.

**Atiyah-Singer index theorem**: equates analytical index (kernel
- cokernel) of an elliptic operator to topological index (Chern
classes, etc.). One of the deepest theorems of 20th-century math.

## Computational

```python
# Cohomology computations are mostly algebraic; here's a sketch.

# de Rham cohomology of S^1: take 1-forms
# omega = dx where dx is the angular coordinate
# d(dx) = 0 (closed)
# But x doesn't extend globally to a function on S^1 (multi-valued)
# So omega is closed but not exact → H^1 ≠ 0

# Compute Cech cohomology of S^1 with two-open-set cover
# Two open arcs covering S^1, with double overlap = two intervals
# Cech complex:
# C^0(U_1) ⊕ C^0(U_2) → C^0(U_{12} component 1) ⊕ C^0(U_{12} component 2)
# Map: (f_1, f_2) ↦ (f_1|_{U_{12,1}} - f_2|_{U_{12,1}}, ...)
# Kernel computes H^0; image-quotient computes H^1

# In algebraic-geometry computer algebra (Macaulay2):
# X = Spec(QQ[x, y]/(y^2 - x^3))
# H = HH^0(X, OO_X)   -- structure sheaf cohomology

# For practical computation, use Macaulay2 or Magma.
print("Cohomology requires symbolic-algebra packages beyond Python's standard library.")
```

## Applied

- **Algebraic topology / data analysis** — singular cohomology
  classifies spaces; persistent cohomology used in TDA.
- **Mathematical physics — gauge theory** — cohomology classifies
  gauge field configurations; instantons.
- **String theory** — Calabi-Yau manifolds and their cohomology
  determine particle content of compactifications.
- **Distributed computing** — sheaf-theoretic models of sensor
  networks (Robert Ghrist) detect global anomalies.
- **Computer vision** — local feature descriptors with consistent
  gluing have sheaf-theoretic interpretation.

## Check Your Understanding

:::widget type=numeric-input prompt="Sheaf has gluing axiom. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$H^0$ = global sections. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$H^1(S^1, \\mathbb{Z}) \\cong \\mathbb{Z}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Riemann-Roch and Atiyah-Singer relate cohomology to topological / analytic indices. Type 1." answer=1 explain="Yes.":::
