---
strand: shape-space
level: research
order: 1
title: Fukaya Categories and Floer Theory
prerequisites:
  - tier: strand-3-shape-space-research
    slug: 00-mirror-symmetry
    description: Mirror symmetry
connections:
  - strand-3-shape-space-research/02-geometric-langlands-deeper
applications:
  - cs: "String theory; symplectic topology"
  - life: "Categories of Lagrangian submanifolds"
---

# Fukaya Categories and Floer Theory

## Mental

For a symplectic manifold $(X, \omega)$, the **Fukaya category**
$\mathcal F(X)$:

- **Objects**: Lagrangian submanifolds (with extra structure).
- **Morphisms**: Floer-cohomology complexes $CF^*(L_0, L_1)$.
- **Composition**: $A_\infty$-structure built from counts of
  pseudo-holomorphic disks.

A categorical encoding of *symplectic topology* — the symplectic
side of mirror symmetry.

## Floer cohomology

For two Lagrangians $L_0, L_1$ in $X$:

$$
HF^*(L_0, L_1) = H^*(CF^*(L_0, L_1), \partial).
$$

Generators: intersection points of $L_0 \cap L_1$.
Differential: counts of pseudo-holomorphic strips bounded by them.

Foundational invariant of symplectic topology — Floer received
Veblen Prize for inventing it.

## Arnold conjecture

**Arnold's conjecture** on fixed points of Hamiltonian
diffeomorphisms: $\#\mathrm{Fix}(\phi) \ge \sum b_i(M)$ (sum of Betti
numbers).

Proved using Floer homology — original motivation.

## Mirror symmetry application

Kontsevich's HMS: $\mathcal F(X) \simeq D^b(X^\vee)$ — derived
Fukaya = derived coherent sheaves on the mirror.

Verified for many cases: tori, K3 surfaces, weighted projective
spaces, some quintic-related families.

## Interactive

:::widget type=numeric-input prompt="Fukaya category: objects = Lagrangians, morphisms = Floer cohomology. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$A_\\infty$-structure on Fukaya category. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Floer received Veblen Prize. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Arnold conjecture proven via Floer homology. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Wrapped Fukaya category**: variant for non-compact symplectic
manifolds; includes "wrapping" Lagrangians around infinity.

**Lagrangian intersection theory**: heart of symplectic topology;
Floer theory's foundational tool.

**Seidel's quantum cohomology / Picard-Lefschetz**: symplectic
analogue of monodromy / vanishing cycles.

**Khovanov homology** of links: categorification of Jones
polynomial; related to Fukaya-style constructions in
cotangent bundles.

## Computational

```python
# Fukaya categories are research-level abstract;
# concrete computations rare and require very specialised tools

# Floer cohomology of a torus T^2 with two Lagrangian S^1 fibers
# at slopes (1, 0) and (0, 1):
# They meet transversally in 1 point → Floer cohomology = Z

# A_∞-structure on Fukaya category of T^2 = mirror of D^b(elliptic curve)
# is "Massey products" computed combinatorially

# In practice: SageMath has limited Fukaya / mirror symmetry support
# Specialised research papers and notebooks compute small cases
print("Fukaya / Floer: research; computation requires specialist tools.")

# Tiny demo: Lagrangian intersection in T^2
import math
# Two slopes (1, 0) and (1, 1): meet in 1 point on T^2 = R^2 / Z^2
# Floer chain complex: Z generator, no differential → HF = Z
print("Two transverse Lagrangians on T^2 meet in det of slope matrix points.")
```

## Applied

- **String theory** — A-model topological string on $X$ computes
  Fukaya $\mathcal F(X)$.
- **Symplectic topology** — Arnold conjecture, Lagrangian
  classification.
- **Mirror symmetry** — categorical equivalence with derived
  coherent sheaves.
- **Khovanov / link homology** — categorification, related to
  Fukaya in cotangent bundles.
- **Mathematical physics — quantum cohomology** — quantum
  deformation of cohomology ring of $X$.

## Check Your Understanding

:::widget type=numeric-input prompt="Fukaya category: Lagrangians + Floer cohomology + $A_\\infty$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Arnold conjecture proven via Floer. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="HMS: $\\mathcal F(X) \\simeq D^b(X^\\vee)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="A-model topological string ↔ Fukaya category. Type 1." answer=1 explain="Yes.":::
