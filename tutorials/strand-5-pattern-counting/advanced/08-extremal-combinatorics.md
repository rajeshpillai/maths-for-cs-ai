---
strand: pattern-counting
level: advanced
order: 8
title: Extremal Combinatorics
prerequisites:
  - tier: strand-5-pattern-counting-advanced
    slug: 07-graph-theory-advanced
    description: Graph theory advanced
connections:
  - strand-5-pattern-counting-advanced/09-pattern-counting-capstone-3
applications:
  - cs: "Codes, designs, hardness reductions"
  - life: "Pushing structures to their max-or-min"
---

# Extremal Combinatorics

## Explain Like I Am 7

Suppose you draw friendship lines between a hundred kids, but you
must avoid making any little group of three who *all* know each
other.  How many friendship lines can you sneak in before a
three-person clique appears?  Surprisingly the answer is a clean
$2500$, achieved by splitting the kids into two halves and only
drawing lines across the gap.  **Extremal** problems ask exactly
this kind of question — *how stuffed can a structure get before a
forbidden pattern is forced to appear?*  The answers are usually
beautifully tidy.

## Mental

**Extremal combinatorics** asks: among all combinatorial structures of
a given type, what's the largest (or smallest) value of some
parameter?

| Question | Answer |
|---|---|
| Max edges in a triangle-free $n$-vertex graph? | $\lfloor n^2/4 \rfloor$ (Mantel's theorem) |
| Max edges in $K_r$-free $n$-vertex graph? | Turán's theorem: $T(n, r-1)$ |
| Max set of subsets of $[n]$ with no two disjoint? | $2^{n-1}$ (Helly-type) |
| Max antichain in subset poset of $[n]$? | $\binom{n}{\lfloor n/2 \rfloor}$ (Sperner) |

These results have surprisingly clean answers — extremal questions
often admit beautiful closed-form solutions.

## Worked example: Mantel's theorem

A triangle-free graph on $n$ vertices has at most $\lfloor n^2/4 \rfloor$
edges. Equality at the complete bipartite $K_{\lfloor n/2 \rfloor, \lceil n/2 \rceil}$.

**Proof sketch**: any vertex $v$ has $\deg v$ neighbours, all
non-adjacent (no triangle). The other vertices can have arbitrary
edges. Counting carefully gives the bound.

For $n = 100$: at most $2500$ edges, achieved by $K_{50, 50}$.

## Worked example 2: Sperner's theorem

In the poset of subsets of $[n]$ ordered by $\subseteq$, the largest
**antichain** (set of pairwise-incomparable elements) has size
$\binom{n}{\lfloor n/2 \rfloor}$. The middle layer wins.

For $n = 4$: $\binom{4}{2} = 6$. The 2-element subsets form a 6-element
antichain.

## Probabilistic existence vs structural extremal

Extremal combinatorics often has *both*:

- **Lower bound**: explicit construction.
- **Upper bound**: structural argument or probabilistic non-existence.

When the two match, the problem is "solved." Many extremal questions
remain open precisely because the upper bound from probabilistic /
algebraic methods doesn't quite match the lower bound from
constructions.

## Interactive

:::widget type=numeric-input prompt="Mantel: max edges in triangle-free $G$ on $n = 10$: $\\lfloor 100/4 \\rfloor = ?$" answer=25 explain="$25$.":::

:::widget type=numeric-input prompt="Sperner: max antichain of subsets of $\\{1, ..., 5\\}$: $\\binom{5}{2} = ?$" answer=10 explain="$10$.":::

:::widget type=numeric-input prompt="Triangle-free extremal graph $K_{n/2, n/2}$ is bipartite. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\binom{100}{50}$ is huge — about $10^{29}$. Type 1 if true." answer=1 explain="Yes.":::

## Symbolic

**Turán's theorem**: max edges in $K_{r+1}$-free $n$-vertex graph is
achieved by the Turán graph $T(n, r)$ — complete $r$-partite with
parts as equal as possible. Edge count
$\left(1 - \frac{1}{r}\right) \frac{n^2}{2}$.

**Erdős-Ko-Rado**: largest family of $k$-subsets of $[n]$ with all
pairwise intersecting is $\binom{n - 1}{k - 1}$ — fix an element and
take all $k$-subsets containing it.

**Ramsey numbers**: $R(s, t)$ is the smallest $n$ such that every
2-colouring of $K_n$ contains a red $K_s$ or blue $K_t$. Mostly
unknown beyond small cases:

- $R(3, 3) = 6$.
- $R(4, 4) = 18$.
- $R(5, 5)$: between 43 and 48.

## Computational

```python
from math import comb
from itertools import combinations

# Max triangle-free graph: K_{n/2, n/2}
def mantel_extremal_edges(n):
    return (n // 2) * ((n + 1) // 2)

print([mantel_extremal_edges(n) for n in range(1, 11)])
# 0 1 2 4 6 9 12 16 20 25

# Sperner's theorem: largest antichain
def sperner_max(n):
    return comb(n, n // 2)

print([sperner_max(n) for n in range(1, 11)])
# 1 2 3 6 10 20 35 70 126 252

# Turán graph T(n, r) edges
def turan_edges(n, r):
    parts = [n // r + (1 if i < n % r else 0) for i in range(r)]
    edges = 0
    for i, a in enumerate(parts):
        for b in parts[i+1:]:
            edges += a * b
    return edges

print(turan_edges(10, 2))             # 25 — same as Mantel
print(turan_edges(10, 3))             # 33 — K_4-free max
```

## Applied

- **Coding theory** — Singleton bound, Plotkin bound, Hamming bound,
  Gilbert-Varshamov bound on the largest possible error-correcting
  code.
- **Cryptography** — extremal-set arguments give trade-offs between
  storage and security in cuckoo filters and XOR puzzles.
- **Algorithm design** — extremal graph theory bounds running time of
  greedy / approximation algorithms (e.g., independent-set
  approximation).
- **Combinatorial design** — block-design existence questions are
  extremal: largest/smallest valid configurations.

## Check Your Understanding

:::widget type=numeric-input prompt="Mantel: max edges in triangle-free graph on $n = 8$: $\\lfloor 64/4 \\rfloor = ?$" answer=16 explain="$16$.":::

:::widget type=numeric-input prompt="$R(3, 3) = ?$" answer=6 explain="$6$.":::

:::widget type=numeric-input prompt="Sperner: max antichain in $2^{[6]}$: $\\binom{6}{3} = ?$" answer=20 explain="$20$.":::

:::widget type=numeric-input prompt="Erdős-Ko-Rado: max intersecting family of $k$-subsets of $[n]$ is $\\binom{n-1}{k-1}$. Type 1." answer=1 explain="Yes.":::
