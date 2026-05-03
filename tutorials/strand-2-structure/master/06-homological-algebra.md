---
strand: structure
level: master
order: 6
title: Homological Algebra
prerequisites:
  - tier: strand-2-structure-master
    slug: 05-representation-theory
    description: Representation theory
connections:
  - strand-2-structure-master/07-category-theory-deeper
applications:
  - cs: "Persistent homology, deep-learning architectures, type theory"
  - life: "The arithmetic of chain complexes"
---

# Homological Algebra

## Mental

A **chain complex** is a sequence of abelian groups (or modules):

$$
\ldots \to C_{n+1} \xrightarrow{d_{n+1}} C_n \xrightarrow{d_n} C_{n-1} \to \ldots
$$

with $d_n \circ d_{n+1} = 0$ for all $n$. The **homology** is

$$
H_n(C) = \ker d_n / \mathrm{im}\, d_{n+1}.
$$

Measures how far the complex is from being **exact** (next $\mathrm{im} = \ker$).

## Derived functors

Many functors have *derived* versions measuring failure of exactness:

- **Tor**: derived functor of $\otimes$. Measures torsion-related
  failures.
- **Ext**: derived functor of $\mathrm{Hom}$. Classifies extensions
  of one module by another.
- **Local cohomology**: derived from "sections supported on a closed
  subset."

Each $\mathrm{Tor}^i, \mathrm{Ext}^i$ is built by resolving one
argument with **projectives** (for $\otimes$) or **injectives**
(for $\mathrm{Hom}$).

## Worked example: $\mathrm{Ext}^1(\mathbb{Z}/n, \mathbb{Z})$

Compute via the projective resolution $0 \to \mathbb{Z} \xrightarrow{\cdot n} \mathbb{Z} \to \mathbb{Z}/n \to 0$:

Apply $\mathrm{Hom}(-, \mathbb{Z})$:

$0 \to \mathrm{Hom}(\mathbb{Z}/n, \mathbb{Z}) \to \mathrm{Hom}(\mathbb{Z}, \mathbb{Z}) \xrightarrow{\cdot n} \mathrm{Hom}(\mathbb{Z}, \mathbb{Z}) \to \mathrm{Ext}^1(\mathbb{Z}/n, \mathbb{Z}) \to 0$

i.e., $0 \to 0 \to \mathbb{Z} \xrightarrow{\cdot n} \mathbb{Z} \to \mathrm{Ext}^1 \to 0$.

So $\mathrm{Ext}^1(\mathbb{Z}/n, \mathbb{Z}) = \mathbb{Z}/n$ —
classifies extensions of $\mathbb{Z}/n$ by $\mathbb{Z}$ up to
equivalence.

## Spectral sequences

A **spectral sequence** is a tower of pages $\{E_r^{p, q}\}$ with
differentials, converging to a target $E_\infty$. Used to compute
cohomology of complicated objects via simpler "approximations."

Famous spectral sequences:

- **Leray**: cohomology of total space from base × fibre.
- **Serre**: fibration sequence.
- **Adams**: $E_2^{p, q} = \mathrm{Ext}^{p, q}_{\mathcal A^*}(\mathbb{F}_2, \mathbb{F}_2)$
  → stable homotopy groups of spheres.

Despite their reputation, they're often computational *triumphs* of
the homological-algebra toolbox.

## Interactive

:::widget type=numeric-input prompt="Chain complex: $d \\circ d = 0$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$H_n = \\ker d_n / \\mathrm{im}\\, d_{n+1}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathrm{Ext}^1(\\mathbb{Z}/2, \\mathbb{Z}) \\cong \\mathbb{Z}/?$" answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="Spectral sequences compute cohomology by successive pages. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Derived categories** $D(R)$: chain complexes up to *quasi-isomorphism*
(maps inducing isomorphism on cohomology). The natural home for
many homological constructions.

**Triangulated categories** abstract derived categories: $D(R)$ is the
prototype.

**$\infty$-categories** generalise further; underpin modern
homotopy theory and derived algebraic geometry.

**Universal coefficient theorem**: relates cohomology with different
coefficients via $\mathrm{Tor}$ and $\mathrm{Ext}$:

$$
0 \to \mathrm{Ext}(H_{n-1}(C), \mathbb{Z}) \to H^n(C; \mathbb{Z}) \to \mathrm{Hom}(H_n(C), \mathbb{Z}) \to 0.
$$

## Computational

```python
import numpy as np

# Compute chain-complex homology numerically
# Example: complex 0 -> Z -> Z -> Z/2 -> 0 viewed over Z
# d_2: Z -> Z (multiplication by 2)
# d_1: Z -> Z/2 (mod 2)

d2 = np.array([[2]])               # multiplication by 2
d1 = np.array([[1]])               # surjection onto Z/2

# Verify d_1 d_2 = 0 (mod 2)
print((d1 @ d2) % 2)               # [[0]]

# Compute H_1 = ker d_1 / im d_2
# Over Q, ker d_1 = 0 (d_1 is surjective injective in Q-context)
# This needs more care — for Z, use Smith normal form

from sympy import Matrix
from sympy.matrices.normalforms import smith_normal_form

A = Matrix([[2]])                   # d_2 as Z-matrix
print(smith_normal_form(A))         # [[2]] — invariant factor 2
# So Z / image = Z/2 — matches Ext^1(Z/2, Z) calculation
```

## Applied

- **Persistent homology** uses chain complexes filtered by a
  parameter; the structure theorem (Strand 2 Advanced Lesson 07)
  classifies persistence modules.
- **Algebraic topology** — singular and cellular homology of CW
  complexes are chain complexes.
- **Algebraic geometry** — coherent-sheaf cohomology computed via
  resolutions and spectral sequences.
- **Homotopy type theory** — extends $\infty$-categorical thinking
  to type theory; Voevodsky's univalence axiom relies on it.
- **Topological data analysis at scale** — distributed persistence
  computation uses derived-category language.

## Check Your Understanding

:::widget type=numeric-input prompt="$d \\circ d = 0$ in chain complex. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathrm{Ext}^1(\\mathbb{Z}/n, \\mathbb{Z}) \\cong \\mathbb{Z}/n$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Derived category: chain complexes mod quasi-isomorphism. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Universal coefficient theorem connects homology and cohomology. Type 1." answer=1 explain="Yes.":::
