---
strand: computation
level: foundation
order: 3
title: Big-O — Counting Steps as Input Grows
prerequisites:
  - tier: strand-7-computation-foundation
    slug: 02-floating-point
    description: IEEE 754 floating point
connections:
  - strand-7-computation-foundation/04-sorting-and-searching
applications:
  - cs: "Algorithm choice — when does each algorithm scale?"
  - life: "Coarse but powerful: 'roughly how does cost grow?'"
---

# Big-O — Counting Steps as Input Grows

## Mental

Big-O notation **bounds growth rate** of an algorithm's running time
(or memory) as a function of input size $n$.

Write $f(n) = O(g(n))$ if there exist constants $c, n_0 > 0$ such
that $f(n) \le c \cdot g(n)$ for all $n \ge n_0$.

Read **"$f$ is at most order $g$ for large $n$."**

The whole point: as $n$ grows, **the dominant term dominates**.
Constants and lower-order terms get absorbed.

## A growth-rate ladder

| Big-O | Name | Example |
|---|---|---|
| $O(1)$ | constant | Array access by index |
| $O(\log n)$ | logarithmic | Binary search |
| $O(n)$ | linear | Linear search |
| $O(n \log n)$ | linearithmic | Merge sort |
| $O(n^2)$ | quadratic | Nested loops on $n$ |
| $O(n^3)$ | cubic | Naive matrix multiply |
| $O(2^n)$ | exponential | Brute-force subset enumeration |
| $O(n!)$ | factorial | Brute-force permutations |

For $n = 1000$:

- $O(\log n) \approx 10$ — instant.
- $O(n) = 1000$ — fast.
- $O(n^2) = 10^6$ — still ms range.
- $O(n^3) = 10^9$ — seconds.
- $O(2^n)$ — universe-age impossible.

This is why **algorithm choice matters more than hardware**.

## Worked example: nested loops

```python
def sum_pairs(L):
    total = 0
    for x in L:
        for y in L:
            total += x * y
    return total
```

For each $x$ (n iterations), we loop over $y$ (n iterations). Total:
$n \cdot n = n^2$ operations. **Big-O: $O(n^2)$.**

Same task, smarter: $\sum_{i,j} x_i x_j = (\sum_i x_i)^2$. **One pass, $O(n)$.**

## Interactive

:::widget type=numeric-input prompt="Single loop over $n$ items: time complexity $O(?)$. Type 1 for constant, 2 for linear ($n$), 3 for quadratic ($n^2$)." answer=2 explain="Linear.":::

:::widget type=numeric-input prompt="Nested loop $i \\in [0, n), j \\in [0, n)$: $O(?)$. Type 2 for linear, 3 for quadratic." answer=3 explain="Quadratic.":::

:::widget type=numeric-input prompt="Binary search of sorted array: $O(?)$. Type 1 for $\\log n$, 2 for $n$, 3 for $n^2$." answer=1 explain="Logarithmic.":::

:::widget type=numeric-input prompt="$2^{10} = ?$ — typical 'small exponential' value." answer=1024 explain="$1024$ — about $10^3$.":::

## Symbolic

Three companion notations:

- $f = O(g)$ — upper bound (at most this fast).
- $f = \Omega(g)$ — lower bound (at least this fast).
- $f = \Theta(g)$ — both: $f$ grows *exactly* like $g$.

Examples:

- Linear search worst case: $\Theta(n)$.
- Sort by comparison (lower bound): $\Omega(n \log n)$.
- Mergesort: $\Theta(n \log n)$.

**Constants drop**: $5n + 7 = O(n)$. **Lower-order terms drop**:
$n^2 + 100n = O(n^2)$.

## Computational

```python
import time
import random

def time_it(fn, *args):
    t0 = time.time()
    fn(*args)
    return time.time() - t0

# Linear sum
def linear_sum(L):
    return sum(L)

# Quadratic — nested loop counting pairs (i, j) with i < j
def quadratic_pairs(L):
    n = len(L)
    count = 0
    for i in range(n):
        for j in range(i + 1, n):
            count += 1
    return count

for n in (100, 1000, 10_000):
    L = [random.random() for _ in range(n)]
    t1 = time_it(linear_sum, L)
    t2 = time_it(quadratic_pairs, L)
    print(f"n={n:>6}  linear={t1:.5f}s   quadratic={t2:.5f}s")
```

You'll see linear stay near zero and quadratic blow up.

## Applied

- **Database indexes** — turn $O(n)$ table scan into $O(\log n)$
  B-tree lookup.
- **Hash tables** — average $O(1)$ insert/lookup is why dictionaries
  feel "free."
- **Web search** — $n = $ number of indexed pages is $\sim 10^{12}$.
  Anything worse than $O(n \log n)$ doesn't run.
- **Cryptography** — security relies on a problem being **hard**:
  $O(2^n)$ to break, $O(n)$ to verify. The asymmetry *is* the
  protocol.
- **Machine learning** — training a transformer is $O(L^2)$ in
  context length $L$ for self-attention; this is why long-context
  models cost so much more.

## Check Your Understanding

:::widget type=numeric-input prompt="$O(n)$ vs $O(n^2)$: for $n = 1000$, ratio of step counts? $1000^2 / 1000 = 1000$. Type 1000." answer=1000 explain="$1000$.":::

:::widget type=numeric-input prompt="$5n^2 + 100n + 7 = O(n^?)$ — pick the dominant exponent." answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="Hash-table average lookup: $O(?)$. Type 1 for $1$, 2 for $\\log n$, 3 for $n$." answer=1 explain="$O(1)$ on average.":::

:::widget type=numeric-input prompt="Brute-force searching all subsets of $n$ items: $O(?)$. Type 1 for $n$, 2 for $n^2$, 3 for $2^n$." answer=3 explain="$2^n$ — exponential.":::
