---
strand: structure
level: foundation
order: 5
title: Permutation Groups
prerequisites:
  - tier: strand-2-structure-foundation
    slug: 04-groups
    description: Groups
connections:
  - strand-2-structure-foundation/06-symmetry-groups
applications:
  - cs: "Sorting algorithm analyses, hash randomisation"
  - games: "Card shuffling, level randomisation"
  - life: "Rearranging things in any order"
---

# Permutation Groups

## Mental

A **permutation** of $\{1, 2, \ldots, n\}$ is a bijection from this
set to itself — equivalently, a rearrangement.

For $n = 3$, the $3! = 6$ permutations of $\{1, 2, 3\}$:

- $(1)(2)(3)$ — identity (everything fixed).
- $(12)$ — swap 1 and 2; fix 3.
- $(13)$ — swap 1 and 3; fix 2.
- $(23)$ — swap 2 and 3; fix 1.
- $(123)$ — cycle $1 \to 2 \to 3 \to 1$.
- $(132)$ — cycle $1 \to 3 \to 2 \to 1$.

Compose permutations to get a permutation. The composition is
**associative**, has an **identity**, and every permutation has an
**inverse** (just reverse the rearrangement).

So the set of all permutations of $\{1, 2, \ldots, n\}$ is a **group**
under composition — the **symmetric group** $S_n$ of order $n!$.

## Cycle notation

Write a permutation as a product of disjoint cycles. $(1 3 5)$ means
$1 \to 3 \to 5 \to 1$ (and unmentioned elements fixed).

For example, the permutation sending $1 \to 2, 2 \to 4, 3 \to 1, 4
\to 3$ is $(1 2 4 3)$ — start at 1, follow the chain back.

Compose cycles **right to left** (function composition): $(1 2)(2 3)$
applied to $1$ gives $(1 2)$ applied to $(2 3)(1) = 1$, then $(1 2)
(1) = 2$. So composition gives $(1 2)(2 3) = (1 2 3)$.

## $S_3$ table

The 6 elements of $S_3$ and their compositions form a $6 \times 6$
table. Notably, $S_3$ is **non-abelian** — $(1 2)(2 3) \ne (2 3)(1
2)$.

## Interactive

:::widget type=numeric-input prompt="$|S_4| = ?$ ($4!$.)" answer=24 explain="$24$ permutations.":::

:::widget type=numeric-input prompt="$|S_5| = ?$" answer=120 explain="$5! = 120$.":::

:::widget type=numeric-input prompt="The order of $(1 2 3)$ in $S_3$ — apply it 3 times to get back to identity. Order?" answer=3 explain="$(123)^3 = e$.":::

:::widget type=numeric-input prompt="The order of $(1 2)$ in $S_3$ — applying it twice gives identity. Order?" answer=2 explain="A transposition has order 2.":::

:::widget type=numeric-input prompt="$S_3$ is abelian (1) or non-abelian (0)?" answer=0 explain="Non-abelian. $(1 2)(2 3) = (1 2 3) \\ne (1 3 2) = (2 3)(1 2)$.":::

## Symbolic

The **symmetric group** $S_n$:

$$
S_n = \{f: \{1, \ldots, n\} \to \{1, \ldots, n\} : f \text{ bijection}\}.
$$

Operation: function composition. $|S_n| = n!$.

Every permutation can be written as a product of **disjoint cycles**
(uniquely, up to ordering of cycles).

A **transposition** is a 2-cycle: $(a \, b)$. Every permutation
factors as a product of transpositions (not uniquely, but the
**parity** — even or odd number of transpositions — is well-defined).

The **even** permutations form the **alternating group** $A_n$, of
order $n!/2$ (for $n \ge 2$).

## Computational

```python
from itertools import permutations

# All elements of S_3
S3 = list(permutations([1, 2, 3]))
print(len(S3))   # 6
for p in S3: print(p)

# Apply a permutation as a function
def apply(perm, x):
    return perm[x - 1]   # perm[0] is image of 1, etc.

p = (2, 3, 1)
print(apply(p, 1))   # 2
print(apply(p, 2))   # 3
print(apply(p, 3))   # 1
# So this is the 3-cycle (1 2 3)
```

## Applied

- **Sorting algorithms**: a sort produces a specific permutation
  from $S_n$. There are $n!$ possible inputs, hence the $\Omega(n
  \log n)$ comparison-sort lower bound (Strand 5 Foundation Lesson
  02).
- **Cryptographic shuffles**: secure deck-shuffling needs a
  permutation drawn uniformly from $S_{52}$ — that's $52! \approx
  8 \times 10^{67}$ possibilities.
- **Group theory in physics**: particle exchange symmetries are
  permutations.

## Check Your Understanding

:::widget type=numeric-input prompt="$|S_6| = ?$" answer=720 explain="$6! = 720$.":::

:::widget type=numeric-input prompt="Order of the cycle $(1 2 3 4 5)$ in $S_5$?" answer=5 explain="A $k$-cycle has order $k$.":::

:::widget type=numeric-input prompt="A transposition $(a \\ b)$ has order..." answer=2 explain="$2$. Apply twice to get identity.":::

:::widget type=numeric-input prompt="$|A_4|$, the alternating group?" answer=12 explain="$4!/2 = 12$.":::
