---
strand: structure
level: intermediate
order: 1
title: Isomorphisms
prerequisites:
  - tier: strand-2-structure-intermediate
    slug: 00-group-homomorphisms
    description: Group homomorphisms
connections:
  - strand-2-structure-intermediate/02-cosets-revisited
applications:
  - cs: "Recognising the same structure in different costumes"
  - life: "When two groups are 'really' the same"
---

# Isomorphisms

## Explain Like I Am 7

Two jigsaw puzzles can show *completely different pictures* on the
front and yet have the **same** shaped pieces fitting together in the
same way on the back.  An **isomorphism** is the proof that two
algebra-puzzles are like that: same back-side shape, just painted
differently.  Once you find one, you can solve any question about
puzzle A by working in puzzle B and shipping the answer back through
the painter — even though to a casual eye the two puzzles looked
totally unrelated.

## Mental

An **isomorphism** is a homomorphism that's also a **bijection**.
When $\varphi : G \to H$ is an isomorphism we write $G \cong H$ and
say $G$ and $H$ are **isomorphic** — *the same group up to renaming*.

If $G \cong H$, anything provable about $G$ from group axioms holds
for $H$ — they share every structural property.

## Recognising isomorphism

Test by **invariants** that any isomorphism must preserve:

- **Order** of the group: $|G| = |H|$.
- **Number of elements of each order**.
- **Abelian or not**.
- **Cyclic or not**.
- **Centre $Z(G)$**.
- **Subgroup lattice**.

If two groups disagree on any invariant, they are *not*
isomorphic. They may agree on every easy invariant and still differ —
but in finite small examples, the easy invariants usually settle it.

## Worked example: $\mathbb{Z}/6\mathbb{Z}$ vs $S_3$

Both have order 6. Are they isomorphic?

- $\mathbb{Z}/6\mathbb{Z}$ is **abelian** ($a + b = b + a$).
- $S_3$ is **not abelian** — $(12)(13) \ne (13)(12)$.

Different. Therefore $\mathbb{Z}/6\mathbb{Z} \not\cong S_3$.

## Worked example 2: $\mathbb{Z}/4\mathbb{Z}$ vs $\mathbb{Z}/2 \times \mathbb{Z}/2$

Both order 4, both abelian. But:

- $\mathbb{Z}/4$ is *cyclic* — has an element of order 4 (namely 1).
- $\mathbb{Z}/2 \times \mathbb{Z}/2$ — every element has order $\le 2$.

So $\mathbb{Z}/4 \not\cong \mathbb{Z}/2 \times \mathbb{Z}/2$. The
**Klein four-group** $V_4 = \mathbb{Z}/2 \times \mathbb{Z}/2$ is
the smallest non-cyclic abelian group.

## Interactive

:::widget type=numeric-input prompt="Are $\\mathbb{Z}/6$ and $S_3$ isomorphic? Type 1 yes, 0 no." answer=0 explain="No — $S_3$ is non-abelian.":::

:::widget type=numeric-input prompt="$\\mathbb{Z}/4$ vs Klein four — same order. Cyclic? Type 1 if $\\mathbb{Z}/4$ is cyclic, 0 if Klein is cyclic." answer=1 explain="$\\mathbb{Z}/4$ is cyclic; Klein is not.":::

:::widget type=numeric-input prompt="Number of elements of order 4 in $\\mathbb{Z}/4$? (Generators $1$ and $3$.)" answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="Number of elements of order 4 in Klein four-group?" answer=0 explain="$0$ — every non-identity has order 2.":::

## Symbolic

**Cayley's theorem**: every finite group $G$ is isomorphic to a
subgroup of the symmetric group $S_{|G|}$. That is — *every group is
a permutation group in disguise*.

Sketch: each $g \in G$ acts on $G$ by left multiplication, $L_g(x) = gx$.
Each $L_g$ is a permutation, and $g \mapsto L_g$ is an injective
homomorphism into $\mathrm{Sym}(G) \cong S_{|G|}$.

**Classification of finite abelian groups**: every finite abelian
group is a direct product of cyclic groups of prime-power order:

$$
G \cong \mathbb{Z}/p_1^{a_1} \times \mathbb{Z}/p_2^{a_2} \times \cdots \times \mathbb{Z}/p_k^{a_k}.
$$

Up to permutation of factors, this decomposition is unique.

## Computational

```python
# Check abelian via SymPy
from sympy.combinatorics import SymmetricGroup, CyclicGroup, DihedralGroup
from sympy.combinatorics.named_groups import AlternatingGroup

S3 = SymmetricGroup(3)
Z6 = CyclicGroup(6)
print(S3.is_abelian, Z6.is_abelian)        # False True
print(S3.order(), Z6.order())              # 6 6 — same order, different groups

# Klein four: Z2 x Z2 — sympy doesn't ship it directly, but we can build it
# via direct product of two CyclicGroup(2).
K4 = DihedralGroup(2)        # D_2 ≅ V_4
Z4 = CyclicGroup(4)
print(K4.order(), Z4.order())              # 4 4
print(K4.is_abelian, Z4.is_abelian)        # both True

# Compare element orders
def element_orders(G):
    return sorted(g.order() for g in G.elements)

print(element_orders(K4))                  # [1, 2, 2, 2]
print(element_orders(Z4))                  # [1, 2, 4, 4]
```

The differing order multisets prove they aren't isomorphic.

## Applied

- **Recognising algorithms** — detecting that two seemingly different
  problems are *the same problem* (isomorphism) is a major source of
  algorithmic shortcuts.
- **Graph isomorphism** — testing whether two graphs are the "same"
  is a famous *quasi-polynomial* problem (Babai's algorithm 2015).
- **Database schema migration** — when an old schema and a new
  schema are isomorphic in structure, data can be moved with a
  bijection.
- **Quantum computing** — Shor's algorithm uses the abelian group
  structure of $(\mathbb{Z}/N)^*$ via the quantum Fourier transform.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\mathbb{Z}/4 \\cong V_4$? Type 1 yes, 0 no." answer=0 explain="No — $\\mathbb{Z}/4$ is cyclic, $V_4$ is not.":::

:::widget type=numeric-input prompt="Cayley's theorem: every finite group embeds into $S_n$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Two groups of order 4: $\\mathbb{Z}/4$ and $V_4$. Up to isomorphism, that's it. Number of distinct groups of order 4: $?$" answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="Every finite abelian group is a direct product of cyclic groups of prime-power order. Type 1." answer=1 explain="Yes — fundamental theorem of finite abelian groups.":::
