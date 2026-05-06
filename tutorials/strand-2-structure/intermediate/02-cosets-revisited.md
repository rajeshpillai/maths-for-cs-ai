---
strand: structure
level: intermediate
order: 2
title: Cosets Revisited
prerequisites:
  - tier: strand-2-structure-intermediate
    slug: 01-isomorphisms
    description: Isomorphisms
connections:
  - strand-2-structure-intermediate/03-normal-subgroups
applications:
  - cs: "Equivalence classes in modular arithmetic, error-correcting code design"
  - life: "Slicing a group along a subgroup"
---

# Cosets Revisited

## Explain Like I Am 7

Pick a small tray of cookies inside a giant baking sheet.  Now slide a
copy of that tray sideways: that shifted tray is a **coset**.  Slide
again, and again — every cookie ends up in *exactly one* shifted tray,
the trays never overlap, and they're all the same size.  Cosets are
the trick we use to chop a group into equal-sized parallel slabs along
a chosen sub-kit.  In the next lesson, when those slabs themselves
form a kit-of-moves, they unlock the powerful idea of a "quotient."

## Mental

Foundation Lesson 07 introduced cosets. Time to use them.

A subgroup $H \le G$ partitions $G$ into **left cosets** $gH = \{gh : h \in H\}$.
Each coset has size $|H|$, distinct cosets are disjoint, and they
together cover $G$.

The number of cosets is the **index** $[G : H] = |G| / |H|$ — that's
Lagrange's theorem.

## Left vs right cosets

$gH$ vs $Hg$ — generally **different sets** in non-abelian groups.

| | Left coset | Right coset |
|---|---|---|
| Definition | $gH = \{gh : h \in H\}$ | $Hg = \{hg : h \in H\}$ |
| Same in $S_3$ for $H = \langle (12) \rangle$? | Sometimes | Sometimes |

A subgroup is **normal** iff $gH = Hg$ for every $g$ — coming up
in Lesson 03.

## Coset representatives

To list cosets, pick **one element per coset** — a *transversal*.

For $G = \mathbb{Z}, H = 6\mathbb{Z}$:

- Cosets: $0 + H, 1 + H, 2 + H, 3 + H, 4 + H, 5 + H$.
- Transversal: $\{0, 1, 2, 3, 4, 5\}$.

That transversal is *exactly* the standard representatives of
$\mathbb{Z}/6\mathbb{Z}$ — cosets and modular arithmetic are
two views of the same idea.

## Worked example: $S_3$ and $H = \langle (12) \rangle$

$S_3 = \{e, (12), (13), (23), (123), (132)\}$, $H = \{e, (12)\}$.

Left cosets:

- $eH = \{e, (12)\} = H$.
- $(13)H = \{(13), (13)(12)\} = \{(13), (132)\}$.
- $(23)H = \{(23), (23)(12)\} = \{(23), (123)\}$.

Three cosets, each of size 2. Index $[S_3 : H] = 6/2 = 3$. ✓

Right cosets:

- $H = \{e, (12)\}$.
- $H(13) = \{(13), (12)(13)\} = \{(13), (123)\}$.
- $H(23) = \{(23), (12)(23)\} = \{(23), (132)\}$.

**Different from the left cosets** — so $H$ is *not* normal in $S_3$.

## Interactive

:::widget type=numeric-input prompt="Index of $\\langle (12) \\rangle$ in $S_3$: $|S_3|/|H| = 6/2 = ?$" answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="Index of $A_4$ in $S_4$: $24/12 = ?$" answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="In an abelian group, $gH = Hg$ always. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cosets of $3\\mathbb{Z}$ in $\\mathbb{Z}$ — how many?" answer=3 explain="$3$ — those are the residue classes mod 3.":::

## Symbolic

**Lagrange's theorem**: for finite $G$ and subgroup $H$,

$$
|G| = [G:H] \cdot |H|.
$$

Consequences:

- The **order** of any element divides $|G|$.
- Groups of prime order are cyclic and have no nontrivial proper
  subgroups.
- A subgroup of $G$ has order dividing $|G|$ — so a group of order
  $12$ has subgroups only of orders $1, 2, 3, 4, 6, 12$.

**Index multiplicativity**: if $K \le H \le G$,

$$
[G : K] = [G : H] \cdot [H : K].
$$

The "tower formula" — useful in field theory too (Strand 1 Advanced
Lesson 04 hinted at it).

## Computational

```python
from sympy.combinatorics import SymmetricGroup, Permutation
from sympy.combinatorics.perm_groups import PermutationGroup

S3 = SymmetricGroup(3)
swap_12 = Permutation([1, 0, 2])
H = PermutationGroup([swap_12])
print(H.order())                    # 2

# Coset enumeration via SymPy
def left_cosets(G, H):
    seen = set()
    cosets = []
    for g in G.elements:
        c = tuple(sorted(((g * h).array_form) for h in H.elements))
        c_key = tuple(map(tuple, c))
        if c_key in seen: continue
        seen.add(c_key)
        cosets.append(c)
    return cosets

cs = left_cosets(S3, H)
print(len(cs))                       # 3 — index 3
```

## Applied

- **Linear codes** — message and parity-check pieces of a codeword
  live in different cosets of the code subgroup; coset leaders
  drive maximum-likelihood decoding.
- **Modular arithmetic** — $\mathbb{Z}/n$ is *literally* cosets of
  $n\mathbb{Z}$ in $\mathbb{Z}$.
- **Cryptographic key generation** — coset representatives in finite
  groups underlie schemes like Diffie-Hellman in restricted subgroups.
- **Combinatorial design** — Latin squares and balanced designs
  often correspond to coset structures.

## Check Your Understanding

:::widget type=numeric-input prompt="$|G| = [G:H] \\cdot |H|$. Type 1 if Lagrange's theorem." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="In a group of order 30, possible subgroup orders are divisors of 30: $1, 2, 3, 5, 6, 10, 15, 30$. Number of divisors?" answer=8 explain="$8$.":::

:::widget type=numeric-input prompt="Tower: $[G : K] = [G : H] \\cdot [H : K]$ for $K \\le H \\le G$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="A subgroup is normal iff every left coset equals the right coset. Type 1." answer=1 explain="Yes — definition of normal.":::
