---
strand: structure
level: advanced
order: 7
title: Modules over a Ring
prerequisites:
  - tier: strand-2-structure-advanced
    slug: 06-solvability-by-radicals
    description: Solvability by radicals
connections:
  - strand-2-structure-advanced/08-tensor-products
applications:
  - cs: "Lattice cryptography, persistent homology, sparse matrices"
  - life: "Vector spaces over a ring instead of a field"
---

# Modules over a Ring

## Mental

A **module** over a ring $R$ is to $R$ what a vector space is to a
field. A module $M$ is an abelian group $(M, +)$ with a scalar
multiplication $R \times M \to M$ satisfying the same axioms as for
vector spaces.

Why bother? When the scalar ring $R$ is **not a field**, things get
interesting:

- Modules don't always have **bases** — torsion may exist.
- Submodules and quotient modules can be more constrained.
- Hom-sets between modules are themselves $R$-modules.

## Examples

| Module | Ring |
|---|---|
| Vector space $V$ over $F$ | $F$ (field) |
| Abelian group $A$ | $\mathbb{Z}$ |
| $\mathbb{Z}/n\mathbb{Z}$ as $\mathbb{Z}$-module | $\mathbb{Z}$ |
| $V$ with linear operator $T$ | $F[x]$ (action: $x \cdot v = T(v)$) |
| $R$ itself | $R$ |
| Ideals of $R$ | $R$ |

The bridge: **abelian groups are exactly $\mathbb{Z}$-modules**. So
abelian-group theory is module theory for $\mathbb{Z}$.

## Free modules

A **free module** of rank $n$ is $R^n$ with the standard basis. Every
vector space (over a field) is free; not every module is.

Example: $\mathbb{Z}/2$ as $\mathbb{Z}$-module is **not** free —
$2 \cdot 1 = 0$, so $\{1\}$ isn't linearly independent over $\mathbb{Z}$.

## Structure theorem for finitely generated modules over a PID

For a PID $R$ and finitely generated $R$-module $M$:

$$
M \;\cong\; R^k \;\oplus\; R/(d_1) \;\oplus\; R/(d_2) \;\oplus\; \cdots \;\oplus\; R/(d_n)
$$

with $d_1 \mid d_2 \mid \ldots$ ("invariant factors"). The $R^k$
piece is the **free part**; the rest is **torsion**.

This **classifies** finitely generated abelian groups (case $R = \mathbb{Z}$)
and also classifies linear operators up to similarity (case
$R = F[x]$, gives rational/Jordan canonical form).

## Worked example: classify abelian group of order 12

$\mathbb{Z}$-modules of order 12 (up to isomorphism):

- $\mathbb{Z}/12$ ($\cong \mathbb{Z}/4 \times \mathbb{Z}/3$).
- $\mathbb{Z}/2 \times \mathbb{Z}/6$ ($\cong \mathbb{Z}/2 \times \mathbb{Z}/2 \times \mathbb{Z}/3$).

Two non-isomorphic abelian groups of order 12. (Six total groups of
order 12 if we drop "abelian": $D_{12}, A_4, \ldots$)

## Interactive

:::widget type=numeric-input prompt="Abelian groups = $\\mathbb{Z}$-modules. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathbb{Z}/2$ as $\\mathbb{Z}$-module — free? Type 1 yes, 0 no." answer=0 explain="No — has torsion.":::

:::widget type=numeric-input prompt="Number of abelian groups of order 4 (up to iso): $\\mathbb{Z}/4, \\mathbb{Z}/2 \\times \\mathbb{Z}/2$. So $?$" answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="Free $R$-module of rank 3 looks like $R^?$" answer=3 explain="$R^3$.":::

## Symbolic

**Submodule, quotient module, direct sum** — analogous to
subspaces, quotient spaces, direct sums. Most vector-space concepts
extend, but **dimension** doesn't always — it's replaced by
**rank** (size of a maximal linearly-independent set), which can
behave oddly over non-PID rings.

**Tor** and **Ext** functors measure failures of "ideal" module
behavior — the foundation of homological algebra. Used in algebraic
topology, algebraic geometry, representation theory.

**Persistent homology** in topological data analysis: filtered
complexes give modules over $k[t]$, which factor by the structure
theorem; the invariant factors are the *barcode* — the visual
output that quantifies feature lifespans in data.

## Computational

```python
import sympy as sp

# Smith normal form: classifies finitely generated abelian groups
# Compute SNF of a presentation matrix
A = sp.Matrix([[6, 0], [0, 10]])    # presentation: Z^2 / image of A
# SNF gives invariant factors d_1 | d_2
print(A.rref())                      # rational reduction

# Manual: gcd(6, 10) = 2; lcm = 30. So Z^2 / image(A) ≅ Z/2 ⊕ Z/30 (?), check det = 60.
print(sp.gcd(6, 10), sp.lcm(6, 10))  # 2, 30

# Smith normal form
from sympy.matrices.normalforms import smith_normal_form
A = sp.Matrix([[6, 4], [0, 10]])
print(smith_normal_form(A))          # diagonal with invariant factors

# Classify abelian groups of order n
def abelian_groups_of_order(n):
    # Decompose n into prime powers and partitions of each exponent
    factors = sp.factorint(n)
    from sympy.utilities.iterables import partitions
    out = []
    for p, e in factors.items():
        ps = [list(p_dict.keys()) for p_dict in partitions(e)]
        ps = [sorted([k for k, v in p_dict.items() for _ in range(v)]) for p_dict in partitions(e)]
        out.append([(p, parts) for parts in ps])
    return out

print(abelian_groups_of_order(12))
```

## Applied

- **Lattice-based cryptography** — lattices are free $\mathbb{Z}$-modules
  with a Euclidean structure. Hardness of Shortest Vector Problem
  (SVP) underlies post-quantum schemes.
- **Persistent homology** — modules over polynomial rings classify
  topological features in data; barcodes use the structure theorem.
- **Linear-system canonical forms** — Jordan / rational canonical
  form classify operators on finite-dimensional vector spaces by the
  module-over-$F[x]$ structure.
- **Sparse linear systems** — Smith normal form solves integer linear
  systems and underlies divisor structure in algebraic graph theory.

## Check Your Understanding

:::widget type=numeric-input prompt="Vector space = module over a field. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Number of abelian groups of order 8: $\\mathbb{Z}/8, \\mathbb{Z}/4 \\times \\mathbb{Z}/2, \\mathbb{Z}/2^3$. So $?$" answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="Smith normal form computes invariant factors. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Persistent homology uses the structure theorem of modules over $k[t]$. Type 1." answer=1 explain="Yes.":::
