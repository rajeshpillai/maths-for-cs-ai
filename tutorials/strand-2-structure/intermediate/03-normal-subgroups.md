---
strand: structure
level: intermediate
order: 3
title: Normal Subgroups and Quotient Groups
prerequisites:
  - tier: strand-2-structure-intermediate
    slug: 02-cosets-revisited
    description: Cosets revisited
connections:
  - strand-2-structure-intermediate/04-cyclic-classification
applications:
  - cs: "Quotient constructions in algebra software, equivalence-class types"
  - life: "When the group of cosets is itself a group"
---

# Normal Subgroups and Quotient Groups

## Mental

A subgroup $N \le G$ is **normal** (written $N \trianglelefteq G$) if

$$
g N g^{-1} = N \quad \forall g \in G,
$$

equivalently $gN = Ng$ for all $g$ — left and right cosets agree.

When $N$ is normal, the cosets themselves form a group under
$(aN)(bN) = (ab)N$. This is the **quotient group** $G/N$.

For non-normal $N$, that multiplication isn't well-defined: choosing
different representatives $a' \in aN, b' \in bN$ gives different
products $a'b' \notin (ab)N$.

## Why normal matters

Three equivalent conditions:

1. $gNg^{-1} = N$ for every $g$.
2. $gNg^{-1} \subseteq N$ for every $g$.
3. $N$ is the kernel of some homomorphism $G \to H$.

The third is striking: **normal subgroups are exactly the kernels.**

## Worked example: $A_n \trianglelefteq S_n$

$A_n$ — the alternating group of even permutations — is the kernel
of the sign homomorphism $\mathrm{sign} : S_n \to \{\pm 1\}$.
Therefore $A_n$ is normal in $S_n$, and

$$
S_n / A_n \;\cong\; \{\pm 1\} \;\cong\; \mathbb{Z}/2\mathbb{Z}.
$$

The two cosets are "even permutations" and "odd permutations."

## Worked example 2: $\mathbb{Z}/n\mathbb{Z}$ is $\mathbb{Z}/n\mathbb{Z}$

The classic. $n\mathbb{Z}$ is a normal subgroup of $(\mathbb{Z}, +)$
(automatic — $\mathbb{Z}$ is abelian, every subgroup is normal).

$$
\mathbb{Z} / n\mathbb{Z} = \{0 + n\mathbb{Z}, 1 + n\mathbb{Z}, \ldots, (n-1) + n\mathbb{Z}\}.
$$

This *is* the quotient group, and it's exactly the integers modulo $n$
that you've been using since Strand 1 Foundation.

## Interactive

:::widget type=numeric-input prompt="$|S_4 / A_4|$?" answer=2 explain="$2$ — even/odd cosets.":::

:::widget type=numeric-input prompt="Every subgroup of an abelian group is normal. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$|\\mathbb{Z}/12\\mathbb{Z}| = ?$" answer=12 explain="$12$.":::

:::widget type=numeric-input prompt="A normal subgroup is the kernel of some homomorphism. Type 1 if true." answer=1 explain="Yes.":::

## Symbolic

**Quotient group operation**: $(aN)(bN) = (ab)N$.

**Identity**: $eN = N$.

**Inverse**: $(aN)^{-1} = a^{-1} N$.

**Order**: $|G/N| = [G : N] = |G|/|N|$.

**First isomorphism theorem (full statement)**: for any
homomorphism $\varphi : G \to H$,

$$
G / \ker \varphi \;\cong\; \mathrm{im}\,\varphi.
$$

**Second isomorphism theorem**: for $H \le G$ and $N \trianglelefteq G$,

$$
HN/N \;\cong\; H / (H \cap N).
$$

**Third isomorphism theorem**: for $K \trianglelefteq N \trianglelefteq G$,

$$
(G/K) / (N/K) \;\cong\; G/N.
$$

The "isomorphism theorems" are workhorses of finite group theory.

## Computational

```python
from sympy.combinatorics import SymmetricGroup, AlternatingGroup
from sympy.combinatorics.perm_groups import PermutationGroup

S4 = SymmetricGroup(4)
A4 = AlternatingGroup(4)
print(A4.is_normal(S4))         # True

print(S4.order(), A4.order())   # 24 12
print(S4.order() // A4.order()) # 2 — index/quotient size

# Build Z/12Z explicitly
quotient = list(range(12))      # representatives
def add_mod(a, b, n=12):
    return (a + b) % n

print(add_mod(7, 9))            # 4
```

## Applied

- **Modular arithmetic** in every cryptographic, hashing, and
  computer-graphics-color computation is a quotient group in
  disguise.
- **Symmetry quotients** in physics — distinct configurations of a
  physical system modulo gauge or rotation are quotients.
- **Group-theoretic dataflow** — distributed-systems consensus
  (Lamport-clocks, vector clocks) lives in quotient lattices of
  event posets.
- **Type theory** — quotient inductive types in proof assistants
  (Coq's setoids, Cubical Agda's HITs) construct quotient sets
  formally.

## Check Your Understanding

:::widget type=numeric-input prompt="A subgroup of an abelian group is always normal. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Quotient $\\mathbb{Z}/15\\mathbb{Z}$ has order 15. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="The third isomorphism theorem: $(G/K)/(N/K) \\cong G/N$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Normal $\\Leftrightarrow$ kernel of a homomorphism. Type 1 if true." answer=1 explain="Yes.":::
