---
strand: structure
level: master
order: 5
title: Representation Theory of Finite Groups
prerequisites:
  - tier: strand-2-structure-master
    slug: 04-sheaves-cohomology
    description: Sheaves and cohomology
connections:
  - strand-2-structure-master/06-homological-algebra
applications:
  - cs: "Equivariant ML, signal processing on graphs, quantum algorithms"
  - life: "Groups acting on vector spaces — and how to classify the actions"
---

# Representation Theory of Finite Groups

## Explain Like I Am 7

A group is an abstract kit-of-moves; a **representation** is a way to
*physically embody* those moves as actual matrices that push arrows
around in some space.  Like an actor playing a role, the matrix
*plays* the abstract move, and you can study the abstract group by
watching how its actors perform.  Marvelously, every performance can
be broken down into a few "atomic" performances called **irreducible
representations** — and the whole catalogue of them for a group is
shockingly small and tidy.

## Mental

A **representation** of a group $G$ is a homomorphism $\rho : G \to \mathrm{GL}(V)$
for some vector space $V$. Equivalently, an action of $G$ on $V$ by
linear maps.

For finite $G$ over $\mathbb{C}$:

- Every representation **decomposes** as a direct sum of
  **irreducibles**.
- Number of irreducibles = number of conjugacy classes.
- Squared dimensions of irreducibles sum to $|G|$:
  $\sum_i d_i^2 = |G|$.

## Characters

The **character** $\chi_\rho(g) = \mathrm{tr}(\rho(g))$ is a class
function (constant on conjugacy classes). For finite $G$:

- Characters of distinct irreducibles are *orthogonal* under
  $\langle \chi, \chi' \rangle = \frac{1}{|G|} \sum_g \chi(g) \overline{\chi'(g)}$.
- Decomposition $\chi_V = \sum_i \langle \chi_V, \chi_i \rangle \chi_i$
  recovers multiplicities.

## Worked example: $S_3$

$|S_3| = 6$, three conjugacy classes (e, transpositions, 3-cycles).
So three irreducibles. Sum-of-squares: $1 + 1 + 4 = 6$.

Three irreducibles:

- **Trivial**: $\chi_{\rm triv}(g) = 1$ — dim 1.
- **Sign**: $\chi_{\rm sgn}(g) = \pm 1$ for even/odd — dim 1.
- **Standard** (2D): permutation rep on
  $\{(1, 1, 1)^\perp\} \subset \mathbb{C}^3$, dim 2.

| Class | $|\text{class}|$ | $\chi_{\rm triv}$ | $\chi_{\rm sgn}$ | $\chi_{\rm std}$ |
|---|---|---|---|---|
| $e$ | 1 | 1 | 1 | 2 |
| (12) | 3 | 1 | -1 | 0 |
| (123) | 2 | 1 | 1 | -1 |

Orthogonality verified row-wise.

## Interactive

:::widget type=numeric-input prompt="Number of irreducible reps of $S_3$ over $\\mathbb{C}$: $?$" answer=3 explain="$3$ — equals number of conjugacy classes.":::

:::widget type=numeric-input prompt="$\\sum d_i^2 = |G|$. For $S_3$: $1 + 1 + 4 = ?$" answer=6 explain="$6$.":::

:::widget type=numeric-input prompt="Trivial representation has dimension $1$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Characters are class functions (constant on conjugacy classes). Type 1." answer=1 explain="Yes.":::

## Symbolic

**Schur's lemma**: a homomorphism between irreducibles is either 0
or an isomorphism; for irreducible $V$, $\mathrm{End}_G(V) = \mathbb{C}$
— scalars.

**Group algebra**: $\mathbb{C}[G] = $ formal $\mathbb{C}$-linear
combinations of $G$-elements with convolution. Decomposes as
$\bigoplus_i M_{d_i}(\mathbb{C})$ — direct sum of matrix algebras
indexed by irreducibles.

**Induced representations** $\mathrm{Ind}_H^G$: build $G$-rep from
$H$-rep. **Frobenius reciprocity**: $\mathrm{Hom}_G(\mathrm{Ind}_H^G V, W) \cong \mathrm{Hom}_H(V, \mathrm{Res}_H^G W)$.

**Symmetric group $S_n$**: irreducibles indexed by **partitions** of
$n$ (Young diagrams). Foundation of algebraic combinatorics.

## Computational

```python
import numpy as np

# Character table of S_3
char_table_S3 = np.array([
    [1, 1, 1],     # trivial
    [1, -1, 1],    # sign
    [2, 0, -1],    # standard
])
class_sizes = np.array([1, 3, 2])
group_order = 6

# Verify orthogonality
for i in range(3):
    for j in range(3):
        inner = sum(class_sizes[k] * char_table_S3[i, k] * char_table_S3[j, k]
                    for k in range(3)) / group_order
        print(f"<chi_{i}, chi_{j}> = {inner}")
# Should be 1 if i = j else 0

# Decompose a representation: e.g., regular rep of S_3
# Regular rep has character: |G| at e, 0 elsewhere
chi_reg = np.array([6, 0, 0])

# Decomposition: each irreducible appears with multiplicity = its dimension
for i in range(3):
    mult = sum(class_sizes[k] * chi_reg[k] * char_table_S3[i, k]
               for k in range(3)) / group_order
    print(f"Multiplicity of irrep {i}: {mult}")
# Should give [1, 1, 2] — matches dimensions
```

## Applied

- **Equivariant ML** — group convolutional networks (Lessons 5-7
  Foundation, Strand 2 Intermediate Lesson 5) use irreducible
  decompositions.
- **Quantum mechanics** — particles classified by representations of
  symmetry groups (rotation, gauge, Poincaré).
- **Crystallography** — 230 space groups, their representations
  classify electronic states in solids.
- **Signal processing on groups** — generalised Fourier analysis
  decomposes signals into irreducibles.
- **Quantum algorithms** — hidden subgroup problem (HSP) instances
  for non-abelian groups exploit representation theory.

## Check Your Understanding

:::widget type=numeric-input prompt="Number of irreps over $\\mathbb{C}$ = number of conjugacy classes. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\sum d_i^2 = |G|$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Schur's lemma: $\\mathrm{End}_G$ of irrep = scalars. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$S_n$ irreps indexed by partitions of $n$. Type 1." answer=1 explain="Yes.":::
