---
strand: pattern-counting
level: foundation
order: 8
title: Fibonacci and Recursive Counting
prerequisites:
  - tier: strand-5-pattern-counting-foundation
    slug: 01-tree-diagrams
    description: Tree diagrams (recursive counting structure)
connections:
  - strand-5-pattern-counting-foundation/04-pascals-triangle
applications:
  - cs: "Memoised recursion, dynamic programming, tree-walk algorithms"
  - business: "Population/colony growth models, viral spread tiers"
  - games: "Pathfinding step counts, branching event probabilities"
  - life: "Plant phyllotaxis (sunflower spirals), rabbit-population thought experiments"
---

# Fibonacci and Recursive Counting

## Mental

Some counting problems satisfy the property: **the count for size
$n$ depends on the counts for smaller sizes.** When that happens,
you can express the count via a **recurrence** — a formula that
defines values by referring back to earlier values.

The most famous recurrence in mathematics:

$$
F_0 = 0, \quad F_1 = 1, \quad F_n = F_{n-1} + F_{n-2} \quad (n \ge 2).
$$

Generated values:

$$
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, \ldots
$$

These are the **Fibonacci numbers**. Each is the sum of the previous
two.

The sequence appears in Leonardo of Pisa's *Liber Abaci* (1202) as
the answer to a rabbit-breeding puzzle. It has since shown up in
countless seemingly-unrelated places — pinecone spirals, sunflower
seed arrangements, beehive ancestry, computer algorithm running times.

But the deeper reason Fibonacci numbers matter for this strand is:
**they count things**.

## A counting interpretation

How many ways can you climb a staircase of $n$ steps, taking either
$1$ or $2$ steps at a time?

For $n = 1$: one way ($1$). For $n = 2$: two ways ($1+1, 2$). For $n
= 3$: three ways ($1+1+1, 1+2, 2+1$). For $n = 4$: five ways
($1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2$).

The pattern $1, 2, 3, 5, 8, 13, \ldots$ — Fibonacci.

**Why?** Because every climb of $n$ steps starts with either:

- A **single step** ($1$), leaving $n - 1$ steps still to climb.
- A **double step** ($2$), leaving $n - 2$ steps.

These cases are mutually exclusive and exhaustive. Each contributes
its own count. So:

$$
\text{ways}(n) = \text{ways}(n-1) + \text{ways}(n-2).
$$

Same recurrence as Fibonacci. The base cases match too: $\text{ways}(1)
= 1$, $\text{ways}(2) = 2$. (Indexing offset by one from the
standard sequence — sometimes the first few terms differ in
convention.)

This is **recursive counting**: the count splits into mutually
exclusive cases by the *first move*, and each case has a count
defined by the same problem on a smaller input.

## Interactive

:::widget type=numeric-input prompt="What is $F_5$? (With $F_0 = 0, F_1 = 1$.)" answer=5 explain="$0, 1, 1, 2, 3, 5$. The $5$th Fibonacci number is $5$.":::

:::widget type=numeric-input prompt="What is $F_8$?" answer=21 explain="$0, 1, 1, 2, 3, 5, 8, 13, 21$. $F_8 = 21$.":::

:::widget type=numeric-input prompt="How many ways to climb $5$ stairs with $1$ or $2$ steps at a time?" answer=8 explain="$\\text{ways}(5) = \\text{ways}(4) + \\text{ways}(3) = 5 + 3 = 8$. Equivalently $F_6 = 8$.":::

:::widget type=numeric-input prompt="How many ways to tile a $1 \\times 6$ row with $1 \\times 1$ squares and $1 \\times 2$ dominoes?" answer=13 explain="Same recurrence as stair-climbing: $\\text{tilings}(n) = \\text{tilings}(n-1) + \\text{tilings}(n-2)$. $\\text{tilings}(6) = 13$.":::

:::widget type=step-revealer
{
  "title": "Why does the staircase count satisfy the Fibonacci recurrence?",
  "steps": [
    {"prose": "We want to count ways to climb $n$ stairs using $1$- and $2$-step moves."},
    {"prose": "**Split by the first move**: either you take a $1$-step first, or a $2$-step first. These two cases are mutually exclusive (only one first move) and exhaustive (no other options)."},
    {"math": "\\text{ways}(n) = \\text{ways starting with } 1 + \\text{ways starting with } 2", "prose": "By the addition rule from Lesson 06 (Strand 6) — mutually exclusive cases sum."},
    {"math": "\\text{ways starting with 1-step} = \\text{ways}(n - 1)", "prose": "After a $1$-step move, $n - 1$ stairs remain — the same problem on a smaller input."},
    {"math": "\\text{ways starting with 2-step} = \\text{ways}(n - 2)", "prose": "After a $2$-step, $n - 2$ stairs remain."},
    {"math": "\\text{ways}(n) = \\text{ways}(n-1) + \\text{ways}(n-2)", "prose": "Same recurrence as Fibonacci. Combined with base cases $\\text{ways}(1) = 1, \\text{ways}(2) = 2$, we get the sequence $1, 2, 3, 5, 8, 13, 21, \\ldots$ — shifted Fibonacci."},
    {"prose": "**The recurrence is the *answer to the counting question*.** This is the heart of dynamic programming: many counting problems decompose by their first move into smaller copies of themselves."}
  ]
}
:::

## Symbolic

The Fibonacci recurrence:

$$
F_0 = 0, \quad F_1 = 1, \quad F_n = F_{n-1} + F_{n-2}.
$$

A surprising **closed-form** (Binet's formula):

$$
F_n = \frac{\varphi^n - \psi^n}{\sqrt 5},
$$

where $\varphi = \dfrac{1 + \sqrt 5}{2} \approx 1.618$ (the **golden
ratio**) and $\psi = \dfrac{1 - \sqrt 5}{2} \approx -0.618$ are the
two roots of $x^2 = x + 1$. Strand 4 (Change) derives this; for now,
take it as a fact.

A consequence: $F_n$ grows roughly like $\varphi^n / \sqrt 5$ —
**exponentially**, with base $\varphi \approx 1.618$. So $F_{30}
\approx \varphi^{30} / \sqrt{5} \approx 832\,040$. Big.

A few useful identities:

- **Sum**: $F_1 + F_2 + \ldots + F_n = F_{n+2} - 1$.
- **Sum of squares**: $F_1^2 + F_2^2 + \ldots + F_n^2 = F_n F_{n+1}$.
- **Catalan-like recurrence**: $F_{2n} = F_n (2 F_{n+1} - F_n)$.
- **Pascal connection**: $F_{n+1} = \sum_{k=0}^{\lfloor n/2 \rfloor}
  \binom{n - k}{k}$ — Fibonacci numbers are sums of "shallow
  diagonals" of Pascal's triangle. (One of mathematics' most
  surprising connections.)

## Computational

The naive recursive computation:

```python
def fib_naive(n):
    if n < 2:
        return n
    return fib_naive(n - 1) + fib_naive(n - 2)

print(fib_naive(10))   # 55
print(fib_naive(30))   # 832040
# print(fib_naive(50))   # painfully slow — exponential time
```

The naive version recomputes the same values over and over. $F_5$ on
its own is fast; but $F_{50}$ recurses millions of times because each
$F_k$ is recomputed from scratch on every path.

**Memoisation** caches results:

```python
def fib_memo(n, cache={}):
    if n < 2:
        return n
    if n in cache:
        return cache[n]
    cache[n] = fib_memo(n - 1) + fib_memo(n - 2)
    return cache[n]

print(fib_memo(50))    # 12586269025 — instant
print(fib_memo(100))   # 354224848179261915075 — still instant
```

This is **dynamic programming**: solve overlapping subproblems by
remembering the answers. The same trick handles a vast class of
counting problems where the recurrence has overlap.

A **bottom-up** version, even cleaner:

```python
def fib_bottom_up(n):
    if n < 2:
        return n
    a, b = 0, 1
    for _ in range(n - 1):
        a, b = b, a + b
    return b

print(fib_bottom_up(100))   # 354224848179261915075
```

$O(n)$ time, $O(1)$ space — the most efficient simple algorithm.
Beyond that, **matrix exponentiation** can compute $F_n$ in $O(\log
n)$ multiplications by exploiting the relation:

$$
\begin{pmatrix} F_{n+1} \\ F_n \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}^n \begin{pmatrix} 1 \\ 0 \end{pmatrix}.
$$

(Matrix exponentiation by squaring — Strand 1 Intermediate Lesson 05's
fast-pow technique applied to matrices.)

## Derivational

Why does the Fibonacci recurrence apply to so many problems?

The pattern is: **a problem of size $n$ decomposes into mutually
exclusive cases of size $n - 1$ and size $n - 2$**, and the cases
have no overlap. Wherever this happens, the count satisfies the
Fibonacci recurrence (or a close cousin).

More general **linear recurrences**:

$$
a_n = c_1 a_{n-1} + c_2 a_{n-2} + \ldots + c_k a_{n-k}.
$$

Counting problems with $k$ types of "first moves" produce
$k$-term linear recurrences. Strand 5 Intermediate develops the
theory; closed forms exist (using **characteristic polynomials**)
and grow as $\rho^n$ for some root $\rho$ — generally exponential.

A cleaner combinatorial argument: the staircase count is a sum over
the number of $2$-steps used. If a $5$-stair climb uses $j$ $2$-steps,
it must have $5 - 2j$ $1$-steps — so $5 - 2j \ge 0$ gives $j \in
\{0, 1, 2\}$. The total move count is $j + (5 - 2j) = 5 - j$ steps
of which $j$ are $2$-steps. The number of arrangements is
$\binom{5 - j}{j}$. Summing:

$$
\text{ways}(5) = \binom{5}{0} + \binom{4}{1} + \binom{3}{2} = 1 + 4 + 3 = 8 = F_6.
$$

This is the Pascal-diagonal identity:

$$
F_{n+1} = \sum_{j=0}^{\lfloor n/2 \rfloor} \binom{n-j}{j}.
$$

Two completely different counting arguments — one recursive (split
by first move), one combinatorial (pick the $j$ positions of
$2$-steps among $5 - j$ moves) — give the same answer. Both are
right. Bijection-style proofs from Lesson 06 in action.

## Connective

Recursive counting and Fibonacci connect to:

- **Tree diagrams** (Lesson 01): recursion is a tree-walk — the leaf
  count satisfies the recurrence.
- **Pascal's triangle** (Lesson 04): Fibonacci as shallow-diagonal
  sums.
- **Dynamic programming** (Strand 5 Intermediate): the algorithmic
  side. Memoisation, tabulation, and DP-on-trees all start here.
- **Matrix exponentiation** (Strand 2 Intermediate): the $O(\log n)$
  computation of $F_n$ uses powers of a $2 \times 2$ matrix.
- **Golden ratio** (Strand 3): $\varphi$ appears in spirals,
  pentagrams, and many natural shapes — Fibonacci's growth rate
  *is* the golden ratio.

## Applied

- **Plant phyllotaxis**: leaves on a stem and seeds in a sunflower
  often spiral with consecutive Fibonacci numbers $(8, 13)$,
  $(13, 21)$, $(21, 34)$, etc. The reason: $\varphi$ is the
  "most irrational" number, so spacing leaves by $\varphi$ turns
  per leaf gives the most uniform sunlight coverage.
- **Beehive ancestry**: a male bee has $1$ parent, his mother has
  $2$ parents, the maternal grandmother has $3$, ... the count
  follows Fibonacci.
- **Stock-market patterns** (often spurious): some traders use
  "Fibonacci retracements" (price levels at $\varphi^{-1} \approx
  0.618$, $\varphi^{-2} \approx 0.382$). Whether they're predictive
  is heavily debated.
- **Data structures**: Fibonacci heaps (a priority queue) achieve
  $O(\log n)$ amortised decrease-key. Crucial for Dijkstra's
  algorithm on dense graphs.
- **DP problem class**: any "ways to reach state $n$ given moves of
  fixed sizes" problem reduces to a Fibonacci-style recurrence.
  Coin-change, tiling, robot-path-on-grid problems all fit this
  template.

## Check Your Understanding

:::widget type=numeric-input prompt="What is $F_{10}$? ($F_0 = 0, F_1 = 1$.)" answer=55 explain="$0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55$. $F_{10} = 55$.":::

:::widget type=numeric-input prompt="How many ways to climb $7$ stairs (1- or 2-step moves)?" answer=21 explain="The recurrence: $1, 2, 3, 5, 8, 13, 21, \\ldots$ Position 7: $21$. (Or via Fibonacci offset: $F_8 = 21$.)":::

:::widget type=numeric-input prompt="How many ways to tile a $1 \\times 8$ row with $1$-squares and $2$-dominoes?" answer=34 explain="Same recurrence: ways(8) = ways(7) + ways(6) = 21 + 13 = 34.":::

:::widget type=numeric-input prompt="$F_n$ grows roughly as $\\varphi^n / \\sqrt 5$ where $\\varphi \\approx 1.618$. Roughly how big is $F_{20}$? (Use $\\varphi^{20} / \\sqrt 5$.)" answer=6765 explain="$F_{20} = 6765$ exactly. The formula $\\varphi^{20} / \\sqrt 5 \\approx 6764.9$ is essentially exact (the difference $\\psi^n / \\sqrt 5$ vanishes fast since $|\\psi| < 1$).":::
