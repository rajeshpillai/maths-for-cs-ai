---
strand: pattern-counting
level: advanced
order: 2
title: Catalan Numbers and the Ballot Problem
prerequisites:
  - tier: strand-5-pattern-counting-advanced
    slug: 01-closed-form-recurrences
    description: Linear recurrences
connections:
  - strand-5-pattern-counting-advanced/03-inclusion-exclusion-advanced
applications:
  - cs: "Parser counting, BST enumeration, valid parenthesisations"
  - life: "When a balance constraint counts beautifully"
---

# Catalan Numbers and the Ballot Problem

## Mental

The **Catalan numbers** $C_n$ count an enormous family of structures:

- Number of valid parenthesisations of $n + 1$ factors.
- Number of binary trees with $n$ internal nodes.
- Number of monotonic lattice paths from $(0, 0)$ to $(n, n)$ that
  don't cross the diagonal.
- Number of triangulations of an $(n + 2)$-gon.
- Number of Dyck paths of length $2n$.

Closed form:

$$
C_n = \frac{1}{n + 1} \binom{2n}{n}.
$$

First few: $C_0 = 1, C_1 = 1, C_2 = 2, C_3 = 5, C_4 = 14, C_5 = 42, C_6 = 132, \ldots$

## Recurrence

$$
C_{n+1} = \sum_{i=0}^n C_i C_{n-i}.
$$

(Pick where the "outer" structure splits; both pieces are Catalan.)

The generating function: $C(x) = 1 + x C(x)^2$, solving
$C(x) = \frac{1 - \sqrt{1 - 4x}}{2x}$.

## The reflection principle / ballot problem

**Ballot problem**: in an election where A gets $a$ votes and B gets
$b$ votes ($a > b$), what's the probability A is *always* ahead during
the count? Answer: $\frac{a - b}{a + b}$.

**Proof sketch (reflection)**: bad paths (those touching $0$) bijection
to paths from $(0, -2)$ via reflection at the first touch.

Lattice-path interpretation: $C_n$ = number of paths from $(0, 0)$ to
$(n, n)$ using $\to$ and $\uparrow$ steps that *never go above* the
diagonal $y = x$. Total paths $\binom{2n}{n}$; "bad" paths reflect to
$(0, 0) \to (n - 1, n + 1)$, count $\binom{2n}{n - 1}$. Difference:

$$
C_n = \binom{2n}{n} - \binom{2n}{n - 1} = \frac{1}{n + 1} \binom{2n}{n}.
$$

## Worked example: triangulations of a pentagon

A convex pentagon (5 sides) has $C_3 = 5$ triangulations.

Each is a way to slice the pentagon into 3 triangles by 2 non-crossing
diagonals. Counting them by hand: 5. ✓

## Interactive

:::widget type=numeric-input prompt="$C_4 = ?$" answer=14 explain="$14$.":::

:::widget type=numeric-input prompt="$C_5 = \\binom{10}{5}/6 = 252/6 = ?$" answer=42 explain="$42$.":::

:::widget type=numeric-input prompt="Number of triangulations of a hexagon (6-gon, $n + 2 = 6$, so $n = 4$): $C_4 = ?$" answer=14 explain="$14$.":::

:::widget type=numeric-input prompt="Number of binary trees with 3 internal nodes: $C_3 = ?$" answer=5 explain="$5$.":::

## Symbolic

**Reflection principle (André)**: in random walk problems with a
boundary, count "good paths" by subtracting reflected "bad paths."
Generalises far beyond Catalan.

**Bijective combinatorics**: Catalan is interesting because *the
same number* counts so many structures. Stanley's *Catalan
Numbers* book lists 200+ Catalan-counted structures.

**Asymptotics**: $C_n \sim \frac{4^n}{n^{3/2} \sqrt \pi}$. Grows
roughly like $4^n$ — exponential, but with polynomial correction.

## Computational

```python
import math

def catalan(n):
    return math.comb(2*n, n) // (n + 1)

print([catalan(n) for n in range(10)])      # 1, 1, 2, 5, 14, 42, ...

# Recurrence verification
def catalan_rec(N):
    C = [1]
    for n in range(1, N + 1):
        C.append(sum(C[i] * C[n - 1 - i] for i in range(n)))
    return C

print(catalan_rec(10))                       # same sequence

# Generate Dyck paths of length 2n (matches catalan)
def dyck_paths(n):
    if n == 0:
        return [""]
    result = []
    for k in range(n):
        for left in dyck_paths(k):
            for right in dyck_paths(n - 1 - k):
                result.append("(" + left + ")" + right)
    return result

print(len(dyck_paths(4)))                    # 14
print(dyck_paths(3))                         # 5 strings: ((())), (()()), (())(), ...

# Ballot problem
def ballot_probability(a, b):
    # P(A always ahead | A gets a, B gets b votes, a > b)
    return (a - b) / (a + b)

print(ballot_probability(7, 3))              # 0.4
```

## Applied

- **Compiler / parser counting** — number of distinct ways to parse
  an expression with $n$ infix operators is Catalan.
- **Binary search trees** — number of distinct BST shapes with $n$
  keys.
- **RNA secondary structure** — pairings without crossings count
  by Catalan-like formulas.
- **Stack-sortable permutations** — Catalan-many.
- **Probabilistic algorithms** — random walks, queue analyses use
  reflection-principle counting throughout.

## Check Your Understanding

:::widget type=numeric-input prompt="$C_3 = 5$. Number of triangulations of a pentagon: $5$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$C_n = \\frac{1}{n+1} \\binom{2n}{n}$. For $n = 5$: $\\frac{1}{6} \\cdot 252 = ?$" answer=42 explain="$42$.":::

:::widget type=numeric-input prompt="Reflection principle: bad paths bijection to reflected paths. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Catalan asymptotic: $C_n \\sim 4^n / (n^{3/2} \\sqrt \\pi)$. Type 1." answer=1 explain="Yes.":::
