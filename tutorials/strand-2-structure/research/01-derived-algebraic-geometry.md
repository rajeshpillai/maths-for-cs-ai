---
strand: structure
level: research
order: 1
title: Derived Algebraic Geometry
prerequisites:
  - tier: strand-2-structure-research
    slug: 00-infinity-categories
    description: ∞-categories
connections:
  - strand-2-structure-research/02-condensed-mathematics
applications:
  - cs: "Foundations for modern mathematical physics, formal mathematics"
  - life: "Geometry where infinitesimals are derived"
---

# Derived Algebraic Geometry

## Mental

**Derived algebraic geometry (DAG)** extends algebraic geometry by
allowing **derived rings** — chain complexes of commutative rings —
as basic objects.

Why derived? Many phenomena in modern mathematics naturally produce
"non-flat" or singular intersections; tracking the full derived
structure preserves more information.

A **derived scheme** has:

- Underlying classical scheme.
- Sheaf of *derived* rings, encoding higher-dimensional infinitesimal
  data.

## Why care?

- **Intersection multiplicities**: classical formulas (Serre's tor)
  become natural in DAG.
- **Cotangent complex** $L_X$: the "right" notion of differentials,
  capturing virtual smoothness.
- **Derived deformation theory**: every deformation problem governed
  by a *derived Lie algebra* (Lurie's theorem).

## Lurie's contributions

Lurie's *Higher Topos Theory* (2009) and *Higher Algebra* (2017)
provide ~3000+ pages of foundational $\infty$-categorical algebra
and DAG.

**Spectral algebraic geometry**: Lurie's program replacing
commutative rings by $\mathbb E_\infty$-rings (highly structured
ring spectra). Foundation for chromatic homotopy theory and modern
algebraic K-theory.

## Toën-Vezzosi

**Toën** and **Vezzosi** (2008): rigorous foundations of DAG via
model categories. Proved many fundamental properties.

## Interactive

:::widget type=numeric-input prompt="DAG: derived rings (chain complexes) replace commutative rings. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cotangent complex $L_X$ generalises differentials. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lurie's HTT + HA: ~3000 pages foundations. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Toën-Vezzosi: alternative model-category foundations. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Loop spaces of schemes** $\mathcal L X = \mathrm{Map}(S^1, X)$
make sense in DAG, with rich structure.

**Derived intersection** $X \cap^L Y$ — replaces fiber product with
*derived* fiber product. Captures full multiplicity data.

**Spectral schemes**: $\mathrm{Spec}(\mathcal A)$ for $\mathbb E_\infty$-ring
$\mathcal A$. Natural setting for *topological* algebraic geometry.

**Derived stacks**: stacks (e.g., $\mathrm{Bun}_G$) gain derived
structure capturing more refined moduli information.

**Tannakian DAG**: Lurie reconstructs schemes from their categories
of quasi-coherent sheaves; works in DAG context.

## Computational

```python
# DAG is highly abstract; concrete computations limited
# Sketch: derived intersection of two affine subschemes

# Classical: Spec(R) ∩ Spec(S) inside Spec(T) = Spec(R ⊗_T S)
# Derived: Spec(R ⊗_T^L S) using derived tensor product

# In ordinary commutative algebra (no derived structure):
import sympy as sp

x, y = sp.symbols("x y")
T = "Q[x, y]"
R = "Q[x, y] / (x)"          # x = 0 axis
S = "Q[x, y] / (x - y^2)"    # parabola y² = x

# Classical intersection R ⊗_T S = Q[y]/(y²): x = 0 and x = y² together
# (Multiplicity 2 at origin)

# Derived intersection records the multiplicity structurally via Tor
# Tor^Q[x,y]_i (Q[x,y]/(x), Q[x,y]/(x - y²)) ≠ 0 in degree 1
print("Derived intersection captures Tor as well as classical R ⊗ S.")
print("Practical computation: Macaulay2, SageMath.")
```

## Applied

- **String theory** — derived structures appear naturally in
  Calabi-Yau / mirror-symmetry computations.
- **Mathematical physics** — derived symplectic geometry for
  topological field theories.
- **Number theory** — modern arithmetic geometry uses DAG.
- **Algebraic K-theory** — natural in DAG / spectral AG settings.
- **Condensed mathematics** (Clausen-Scholze) — DAG-flavoured
  topological foundations.

## Check Your Understanding

:::widget type=numeric-input prompt="DAG uses derived (chain complex) commutative rings. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cotangent complex $L_X$ is derived analogue of Ω_X. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Spectral AG uses $\\mathbb E_\\infty$-rings. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Derived intersection captures Tor data. Type 1." answer=1 explain="Yes.":::
