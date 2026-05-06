---
strand: computation
level: intermediate
order: 0
title: Dynamic Programming
prerequisites:
  - tier: strand-7-computation-foundation
    slug: 09-computation-capstone
    description: Foundation computation capstone
connections:
  - strand-7-computation-intermediate/01-graph-bfs-dfs
applications:
  - cs: "Edit distance, knapsack, sequence alignment, RL value iteration"
  - life: "Avoiding recomputation by saving subproblem answers"
---

# Dynamic Programming

## Explain Like I Am 7

You're climbing a staircase, taking one or two steps at a time, and
you want to count how many different ways you can reach the top.
Without help, you'd recount the same stairs over and over.  Smart kids
write each step's answer on a sticky note as they go: "from step 5
there are 8 ways."  Next time the question comes up, they peek at the
sticky note instead of counting again.  **Dynamic programming** is
this clever sticky-note habit — never solve the same little puzzle
twice.

## Mental

**Dynamic programming (DP)** turns recursive problems with
overlapping subproblems into iterative algorithms by **caching
intermediate results**.

Two requirements:

1. **Optimal substructure** — the optimal solution decomposes into
   optimal solutions of subproblems.
2. **Overlapping subproblems** — the same subproblem appears many
   times in the recursion.

When both hold, DP collapses an exponential recursion into a
polynomial-time algorithm.

## Two flavors

- **Top-down (memoization)** — recurse, cache answers in a hash
  table, return cached result on repeat calls.
- **Bottom-up (tabulation)** — compute subproblems in dependency
  order, fill a table.

Same complexity; bottom-up is often faster (no function-call
overhead) and more cache-friendly.

## Worked example: Fibonacci

Foundation Lesson 05 showed naive Fibonacci is $O(\phi^n)$.

**Top-down**:

```python
from functools import lru_cache
@lru_cache(None)
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)
```

**Bottom-up**:

```python
def fib(n):
    if n < 2: return n
    a, b = 0, 1
    for _ in range(n - 1):
        a, b = b, a + b
    return b
```

Both $O(n)$. Bottom-up uses $O(1)$ space.

## Worked example: edit distance

Given strings $s, t$, find the minimum number of single-character
edits (insert / delete / substitute) to turn $s$ into $t$.

Let $D[i][j]$ = edit distance between $s[:i]$ and $t[:j]$.

**Recurrence**:

$$
D[i][j] = \begin{cases}
j & i = 0 \\
i & j = 0 \\
D[i-1][j-1] & s_{i-1} = t_{j-1} \\
1 + \min(D[i-1][j], D[i][j-1], D[i-1][j-1]) & \text{otherwise}.
\end{cases}
$$

Time $O(mn)$, space $O(mn)$ (or $O(\min(m, n))$ with rolling row).

## Interactive

:::widget type=numeric-input prompt="$F_{10}$ via DP: $0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55$. So $F_{10} = ?$" answer=55 explain="$55$.":::

:::widget type=numeric-input prompt="Edit distance from 'kitten' to 'sitting': substitute k→s, e→i, insert g. Total $?$" answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="DP turns naive $O(2^n)$ into $O(?)$ for sum-of-subset problems with capacity $W$? Type the form: 1 for $nW$, 2 for $n^2$, 3 for $n!$." answer=1 explain="Pseudo-polynomial $O(nW)$.":::

:::widget type=numeric-input prompt="Memoization stores: 1=computed answers, 2=raw recursion trace. Type 1." answer=1 explain="$1$.":::

## Symbolic

**Bellman's principle of optimality**: an optimal policy has the
property that whatever the initial state and decision, the
remaining decisions must constitute an optimal policy for the
state resulting from the first decision.

This is the formal underpinning of DP.

**State space**: the variables that index a DP table. Choosing
the right state is the hard part.

**Transition**: how subproblems combine — the recurrence.

**Base case**: smallest subproblem(s) — directly computable.

## Computational

```python
def edit_distance(s, t):
    m, n = len(s), len(t)
    D = [[0]*(n+1) for _ in range(m+1)]
    for i in range(m+1): D[i][0] = i
    for j in range(n+1): D[0][j] = j
    for i in range(1, m+1):
        for j in range(1, n+1):
            if s[i-1] == t[j-1]:
                D[i][j] = D[i-1][j-1]
            else:
                D[i][j] = 1 + min(D[i-1][j], D[i][j-1], D[i-1][j-1])
    return D[m][n]

print(edit_distance("kitten", "sitting"))    # 3
print(edit_distance("flaw", "lawn"))         # 2

# Knapsack: maximum value subject to weight cap W
def knapsack(weights, values, W):
    n = len(weights)
    dp = [[0] * (W + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(W + 1):
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i-1][w],
                               dp[i-1][w-weights[i-1]] + values[i-1])
            else:
                dp[i][w] = dp[i-1][w]
    return dp[n][W]

print(knapsack([2, 3, 4, 5], [3, 4, 5, 6], 5))   # 7 (items 0 and 1)
```

## Applied

- **Sequence alignment** in bioinformatics — Needleman-Wunsch
  algorithm for DNA/protein alignment is edit-distance with custom
  substitution costs.
- **Spell-checking** — edit distance ranks correction candidates.
- **Reinforcement learning** — Bellman equations and value-iteration
  are DP over state-value functions.
- **Inventory and revenue management** — optimal stocking decisions
  over time follow Bellman's principle.
- **Compiler optimisation** — register allocation and instruction
  scheduling use DP heuristics.

## Check Your Understanding

:::widget type=numeric-input prompt="DP requires optimal substructure and overlapping subproblems. Number of conditions?" answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="Edit-distance complexity: $O(mn)$. Memory $O(\\min(m, n))$ achievable. Type 1." answer=1 explain="Yes — rolling row.":::

:::widget type=numeric-input prompt="Bellman equation: $V(s) = \\max_a [r(s, a) + \\gamma V(\\text{next}(s, a))]$. Type 1 if it's the basis of value iteration." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Naive Fibonacci is $O(\\phi^n)$; DP makes it $O(n)$. Speed-up factor for $n = 40$: $\\phi^{40}/40 \\approx 10^6$. Type 1000000." answer=1000000 tolerance=500000 explain="$\\sim 10^6$.":::
