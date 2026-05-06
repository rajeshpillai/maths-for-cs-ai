---
strand: shape-space
level: research
order: 0
title: Mirror Symmetry
prerequisites:
  - tier: strand-3-shape-space-master
    slug: 09-shape-master-capstone
    description: Shape & space master capstone
connections:
  - strand-3-shape-space-research/01-fukaya-categories
applications:
  - cs: "Algorithmic enumeration of curves on Calabi-Yau manifolds"
  - life: "A duality between symplectic and complex geometries"
---

# Mirror Symmetry

## Explain Like I Am 7

Imagine two strange puzzle boxes that look totally different on the
outside, but every secret button on one matches a secret lever on
the other.  **Mirror symmetry** is the spooky discovery that pairs
of curvy multi-dimensional shapes come like that: doing
"area-counting" on the left box is exactly the same as doing
"complex-number-counting" on the right box.  Physicists noticed it
while studying tiny string-loops; mathematicians are still
unwrapping why these two very different worlds end up giving the
same answers.

## Mental

**Mirror symmetry**: a remarkable conjectural duality between two
*Calabi-Yau* manifolds $X$ and $X^\vee$:

- **Symplectic** invariants of $X$ ↔ **complex** / algebraic
  invariants of $X^\vee$.
- **Hodge numbers** related: $h^{p, q}(X) = h^{n - p, q}(X^\vee)$
  ($n = \dim X$).
- **Counts of holomorphic curves** on $X$ ↔ **periods** on $X^\vee$.

Originated in **string theory** (1990s, Candelas-de la Ossa-Green-
Parkes). Confirmed many predictions of curve-counting formulas;
Givental and Lian-Liu-Yau gave mathematical proofs in special
cases.

## Two flavours

- **Homological mirror symmetry** (Kontsevich 1994): equivalence of
  derived Fukaya category $D^\pi \mathcal F(X)$ and derived
  category of coherent sheaves $D^b(X^\vee)$.

- **SYZ conjecture** (Strominger-Yau-Zaslow 1996): mirror = T-duality
  on Lagrangian torus fibrations. Geometric construction of $X^\vee$
  from $X$.

## Worked example: quintic threefold

The **quintic threefold** $\{F = 0\} \subset \mathbb {CP}^4$ where
$F$ is a generic degree-5 polynomial.

Number of rational curves of degree $d$:

| $d$ | Count |
|---|---|
| 1 | 2875 |
| 2 | 609,250 |
| 3 | 317,206,375 |
| 4 | 242,467,530,000 |
| ... | ... |

Predicted by mirror symmetry (CdGOP 1991) — verified by Givental's
mirror theorem.

The quintic was the original test case; mirror symmetry's
first stunning success.

## Interactive

:::widget type=numeric-input prompt="Mirror symmetry: symplectic ↔ complex Calabi-Yau duality. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Kontsevich's homological mirror symmetry (1994). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="SYZ: mirror via T-duality on Lagrangian torus fibrations. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Quintic 3-fold: 2875 lines (degree 1 rational curves). Type 1." answer=1 explain="Yes.":::

## Symbolic

**Gromov-Witten invariants**: counts of holomorphic curves with
prescribed boundary conditions / classes. Symplectic invariants.

**Periods of mirror manifold**: integrals of holomorphic forms over
cycles. Complex / algebraic invariants.

Mirror symmetry: GW invariants of $X$ = periods of mirror $X^\vee$.

**Gross-Siebert program**: rigorous *constructive* approach to
mirror symmetry via tropical / log geometry; bridges symplectic
and algebraic sides via degeneration.

**Stability conditions** (Bridgeland 2007): tool for studying
$D^b(X)$; central to mirror symmetry conjectures.

## Computational

```python
# Quintic 3-fold rational curve count via mirror symmetry
# Predicted by genus-0 Gromov-Witten invariants n_d

# Predicted by mirror theorem (Givental):
n_d_quintic = {
    1: 2875,
    2: 609250,
    3: 317206375,
    4: 242467530000,
    5: 229305888887625,
    # Higher degrees grow even faster
}

for d, n in n_d_quintic.items():
    print(f"Rational curves of degree {d}: {n:,}")

# These are extracted from a generating function — the "instanton
# correction" series — predicted by mirror symmetry
# Derivation in Candelas-de la Ossa-Green-Parkes (1991)

# Real computation in mirror symmetry: requires Mathematica /
# Macaulay2 / SageMath plus PALP (lattice polytope analysis).
print("Mirror symmetry computation: PALP + Mathematica + Macaulay2.")
```

## Applied

- **String theory** — mirror manifolds give equivalent string
  compactifications; powerful for computing physical observables.
- **Enumerative geometry** — mirror symmetry predicts hard counts of
  curves.
- **Algebraic geometry** — derived-category dualities.
- **Mathematical physics** — A-model / B-model topological string
  theories.
- **Toric / log geometry** — SYZ + Gross-Siebert connect to
  combinatorial structures.

## Check Your Understanding

:::widget type=numeric-input prompt="Mirror symmetry: A-model ↔ B-model duality. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Kontsevich HMS: equivalence of derived categories. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Quintic 3-fold predicted curve counts (CdGOP 1991). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Bridgeland stability conditions central to mirror symmetry. Type 1." answer=1 explain="Yes.":::
