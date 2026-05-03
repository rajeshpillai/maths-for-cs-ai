---
strand: structure
level: foundation
order: 4
title: Groups — The First Algebraic Structure
prerequisites:
  - tier: strand-2-structure-foundation
    slug: 03-modular-arithmetic-as-structure
    description: Modular arithmetic structure
connections:
  - strand-2-structure-foundation/05-permutation-groups
applications:
  - cs: "Cryptography (group-based protocols), error correction"
  - business: "Symmetries in business processes (cyclic patterns)"
  - games: "Rotation groups, symmetry-aware level design"
  - life: "The mathematical structure behind every symmetry you've ever seen"
---

# Groups — The First Algebraic Structure

## Mental

A **group** is a set $G$ with a binary operation $\star$ satisfying
**four axioms**:

1. **Closure**: $\forall a, b \in G: a \star b \in G$.
2. **Associativity**: $\forall a, b, c \in G: (a \star b) \star c =
   a \star (b \star c)$.
3. **Identity**: $\exists e \in G$ such that $\forall a: a \star e =
   e \star a = a$.
4. **Inverse**: $\forall a \in G, \exists a^{-1} \in G: a \star
   a^{-1} = a^{-1} \star a = e$.

A group is **abelian** (or **commutative**) if additionally $a \star
b = b \star a$.

## Examples

| Group | Operation | Identity | Comments |
|---|---|---|---|
| $(\mathbb{Z}, +)$ | addition | $0$ | infinite, abelian |
| $(\mathbb{Z}/n\mathbb{Z}, +)$ | addition mod $n$ | $[0]$ | cyclic of order $n$ |
| $(\mathbb{Z}/p\mathbb{Z})^*$ | multiplication mod $p$ (prime) | $[1]$ | order $p-1$ |
| $(\mathbb{Q}, +)$ | addition | $0$ | abelian |
| $(\mathbb{Q}^*, \cdot)$ | multiplication | $1$ | excludes $0$ |
| $S_n$ | permutation composition (Lesson 05) | identity perm | non-abelian for $n \ge 3$ |
| $D_n$ | dihedral (rotations + reflections of regular $n$-gon) | identity | non-abelian for $n \ge 3$ |
| $GL_n$ | invertible $n \times n$ matrices, multiplication | $I$ | non-abelian |

A few **non-examples**:

- $(\mathbb{N}, +)$: no inverses (no $-1$ in $\mathbb{N}$).
- $(\mathbb{Z}, \cdot)$: only $\pm 1$ have inverses.
- $(\mathbb{Q}, \cdot)$ — including 0: $0$ has no inverse.

The "non-examples" lack one axiom each.

## Why groups matter

Groups are the **mathematical structure of symmetry**. A group's
elements act as **transformations** that preserve some structure
(distance, shape, value, ordering).

Cyclic groups capture **rotational** symmetry. Permutation groups
capture **rearrangement** symmetry. Lie groups capture **continuous
symmetries** (rotations, translations).

If you can identify a symmetry in a problem, you can usually
**factor it out** by working modulo the symmetry — making the problem
smaller.

## Interactive

:::widget type=numeric-input prompt="$(\\mathbb{Z}, +)$ — is this a group? (1 yes.)" answer=1 explain="Yes — abelian group.":::

:::widget type=numeric-input prompt="$(\\mathbb{N}, +)$ — has identity 0 but no inverses. Not a group. (1 yes a group, 0 no.)" answer=0 explain="Not a group.":::

:::widget type=numeric-input prompt="$(\\mathbb{Z}/5\\mathbb{Z}, +)$ — abelian group of order 5. Order means..." answer=5 explain="The number of elements: $5$.":::

:::widget type=numeric-input prompt="The dihedral group $D_3$ has $6$ elements: $3$ rotations + $3$ reflections of an equilateral triangle. Abelian? (1 yes, 0 no.)" answer=0 explain="$D_n$ is non-abelian for $n \\ge 3$.":::

## Symbolic

A **group** $(G, \star)$ satisfies the four axioms (closure,
associativity, identity, inverse).

**Cancellation laws** (proved from the axioms):

- $a \star b = a \star c \Rightarrow b = c$ (left cancellation).
- $b \star a = c \star a \Rightarrow b = c$ (right cancellation).

**Order** of group: $|G|$ = number of elements (could be infinite).

**Order** of an element $a$: smallest positive $k$ with $a^k = e$
(if exists). For $(\mathbb{Z}/n\mathbb{Z}, +)$, the order of $[1]$
is $n$ — adding it $n$ times gives $[0]$.

## Computational

```python
class Z_n:
    """The cyclic group Z/nZ under addition."""
    def __init__(self, n):
        self.n = n
        self.elements = list(range(n))

    def op(self, a, b):
        return (a + b) % self.n

    def identity(self):
        return 0

    def inverse(self, a):
        return (-a) % self.n

G = Z_n(5)
print(G.elements)         # [0, 1, 2, 3, 4]
print(G.op(2, 4))          # 1 (2+4=6 ≡ 1 mod 5)
print(G.inverse(3))        # 2 (3+2=5 ≡ 0 mod 5)

# Cayley table
for a in G.elements:
    print([G.op(a, b) for b in G.elements])
```

## Applied

- **Public-key cryptography**: groups like $(\mathbb{Z}/p\mathbb{Z})^*$
  and elliptic curve groups underpin every modern security protocol.
- **Quantum mechanics**: symmetries of physical systems are groups.
- **Crystallography**: $230$ space groups classify all crystal
  structures.

## Check Your Understanding

:::widget type=numeric-input prompt="The four group axioms: closure, ..., identity, inverse. The missing one is..." answer=0 explain="Associativity. Type 0 to indicate.":::

:::widget type=numeric-input prompt="Order of $(\\mathbb{Z}/12\\mathbb{Z}, +)$?" answer=12 explain="12 elements.":::

:::widget type=numeric-input prompt="Order of $[3]$ in $(\\mathbb{Z}/12\\mathbb{Z}, +)$? (Smallest $k$ with $3k \\equiv 0 \\pmod{12}$.) $3, 6, 9, 12 \\equiv 0$. So..." answer=4 explain="$4$.":::

:::widget type=numeric-input prompt="Is $S_3$ (permutations of $\\{1,2,3\\}$) abelian?" answer=0 explain="No — $(12)(23) \\ne (23)(12)$.":::
