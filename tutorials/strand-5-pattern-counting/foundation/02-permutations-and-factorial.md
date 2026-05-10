---
strand: pattern-counting
level: foundation
order: 2
title: Permutations and Factorial
prerequisites:
  - tier: strand-5-pattern-counting-foundation
    slug: 00-multiplication-principle
    description: The multiplication principle
connections:
  - strand-5-pattern-counting-foundation/03-combinations
  - strand-6-uncertainty-foundation/02-equally-likely-outcomes
applications:
  - business: "Tour scheduling, ordered task lists, meeting agendas"
  - cs: "Sorting algorithm output spaces, password derivation order, queueing"
  - games: "Move-order in turn-based games, race finishing orders"
  - life: "Seating arrangements, race finishes, anagrams of a word"
---

# Permutations and Factorial

## Explain Like I Am 7

Suppose four friends line up for a photo.  Whoever stands on the left
has four choices; once they pick a spot, the next friend has only
three friends left to stand beside, then two, then one.  That gives
$4 \times 3 \times 2 \times 1 = 24$ different photo line-ups.  Math
people call that shrinking-multiplication a **factorial** and write
it $4!$.  It explodes fast: ten friends already make over three
million line-ups, which is why a tiny class can generate a stadium-
sized number of seating charts.

## Mental

A **permutation** is an **ordered arrangement** of distinct items.
"Order matters" is the defining feature. Examples:

- The ways $4$ runners can finish a race: $(A, B, C, D)$ is
  different from $(B, A, C, D)$.
- The orders in which you can stack $5$ books on a shelf.
- The rearrangements (anagrams) of a word's letters: SCAR, CARS,
  ARCS are all different orderings of the same letters.

How many permutations of $n$ distinct items?

Pick the first item: $n$ choices. Once chosen, that item is gone —
$n - 1$ choices for the second slot. Then $n - 2$, then $n - 3$, all
the way down to $1$ for the last:

$$
n \cdot (n-1) \cdot (n-2) \cdot \ldots \cdot 2 \cdot 1.
$$

This product has its own name and notation: **$n!$ ("$n$ factorial").**

$$
n! = n \cdot (n-1) \cdot (n-2) \cdot \ldots \cdot 2 \cdot 1.
$$

By convention, **$0! = 1$**. (Like $a^0 = 1$ — see the Derivational
section for why.)

A few values:

| $n$ | $n!$ |
|---|---|
| $0$ | $1$ |
| $1$ | $1$ |
| $2$ | $2$ |
| $3$ | $6$ |
| $4$ | $24$ |
| $5$ | $120$ |
| $6$ | $720$ |
| $7$ | $5\,040$ |
| $8$ | $40\,320$ |
| $9$ | $362\,880$ |
| $10$ | $3\,628\,800$ |

Factorials grow **explosively** — far faster than $2^n$ or even
$10^n$ for large $n$. That growth is the main reason brute-force
"try every permutation" algorithms are infeasible: $20! \approx 2.4
\times 10^{18}$, more than the number of seconds since the universe
began. Heuristics and clever algorithms exist precisely to tame
this explosion.

## $k$-permutations

What if we only want to **choose and order $k$ out of $n$**? E.g.,
how many ways can $3$ medals (gold, silver, bronze) go to $3$ of
$8$ runners?

The reasoning: $8$ choices for gold, $7$ remaining for silver, $6$
for bronze. Total: $8 \cdot 7 \cdot 6 = 336$.

In general, the number of $k$-permutations of $n$ distinct items is

$$
P(n, k) = n \cdot (n-1) \cdot \ldots \cdot (n - k + 1) = \frac{n!}{(n-k)!}.
$$

Notation varies: $P(n, k)$, $_n P_k$, $\,^nP_k$, $\text{nPk}$. They
all mean the same thing.

When $k = n$, $P(n, n) = \dfrac{n!}{0!} = n!$ — full permutations.
When $k = 1$, $P(n, 1) = n$ — just one position to fill.

## Interactive

:::widget type=numeric-input prompt="How many ways can $5$ books be arranged in a row?" answer=120 explain="$5! = 5 \\cdot 4 \\cdot 3 \\cdot 2 \\cdot 1 = 120$.":::

:::widget type=numeric-input prompt="How many anagrams does the word 'CAT' have?" answer=6 explain="$3! = 6$. The anagrams are CAT, CTA, ACT, ATC, TCA, TAC.":::

:::widget type=numeric-input prompt="What is $7!$?" answer=5040 explain="$7! = 7 \\cdot 6 \\cdot 5 \\cdot 4 \\cdot 3 \\cdot 2 \\cdot 1 = 5040$. Worth remembering — comes up often.":::

:::widget type=numeric-input prompt="Eight horses race. How many possible orders for $1$st, $2$nd, and $3$rd place?" answer=336 explain="$P(8, 3) = 8 \\cdot 7 \\cdot 6 = 336$. After gold goes to one of 8 horses, silver has 7 choices, bronze has 6.":::

:::widget type=numeric-input prompt="In how many ways can $4$ people sit in $4$ chairs?" answer=24 explain="$4! = 24$. Same as 'permutations of 4 things.'":::

:::widget type=step-revealer
{
  "title": "Why does 0! = 1?",
  "steps": [
    {"prose": "$n!$ counts permutations of $n$ items. What does '$0$ items' mean?"},
    {"prose": "There is exactly **one** way to arrange zero items: the empty arrangement. (Saying 'zero ways' would mean it's impossible — but it isn't.)"},
    {"prose": "The same answer comes from making the recursion $n! = n \\cdot (n-1)!$ work at $n = 1$:"},
    {"math": "1! = 1 \\cdot 0!", "prose": "We know $1! = 1$. So $0!$ must equal $1$ for this to balance."},
    {"prose": "And from the formula $P(n, k) = \\dfrac{n!}{(n-k)!}$ at $k = n$:"},
    {"math": "P(n, n) = \\frac{n!}{0!} = n!", "prose": "We want $P(n, n) = n!$ (full permutations). This forces $0! = 1$ in the denominator."},
    {"prose": "Three independent reasons all give the same answer. **$0! = 1$ is forced**, not arbitrary."}
  ]
}
:::

## Symbolic

The factorial:

$$
n! = \prod_{i=1}^n i, \quad 0! := 1.
$$

The recursion form, often used in proofs:

$$
n! = n \cdot (n-1)!.
$$

The number of $k$-permutations of $n$:

$$
P(n, k) = \frac{n!}{(n-k)!} = n(n-1)(n-2) \cdots (n-k+1).
$$

A few useful identities:

$$
P(n, n) = n!, \quad P(n, 1) = n, \quad P(n, 0) = 1.
$$

The number of permutations grows extraordinarily fast. **Stirling's
approximation** (Strand 4) gives the leading-order behaviour:

$$
n! \sim \sqrt{2 \pi n} \left(\frac{n}{e}\right)^n.
$$

So $n!$ grows like $n^n / e^n$ times a square-root correction —
faster than any polynomial, faster than any exponential of fixed
base.

For $n = 100$: $100! \approx 9.33 \times 10^{157}$. A number with
$158$ digits.

## Computational

Python's `math.factorial`:

```python
import math
print(math.factorial(5))    # 120
print(math.factorial(10))   # 3628800
print(math.factorial(20))   # 2432902008176640000
```

Computing $P(n, k)$:

```python
import math

def permutations(n, k):
    return math.factorial(n) // math.factorial(n - k)

print(permutations(8, 3))   # 336
print(permutations(5, 5))   # 120 — full permutations
print(permutations(10, 0))  # 1
```

Or compute directly without huge intermediate factorials:

```python
def perm_direct(n, k):
    result = 1
    for i in range(k):
        result *= (n - i)
    return result

print(perm_direct(8, 3))   # 336
print(perm_direct(50, 5))  # 254251200 — much faster than 50!
```

For very large factorials, use logs:

```python
import math
print(math.lgamma(101))   # log(100!) ≈ 363.74
# n! has roughly lgamma(n+1) / log(10) decimal digits
print(math.lgamma(101) / math.log(10))   # 158.0  — 100! has 158 digits
```

To **enumerate** permutations (when feasible), `itertools.permutations`:

```python
from itertools import permutations

# All anagrams of 'cat'
print(list(permutations("cat")))
# [('c', 'a', 't'), ('c', 't', 'a'), ('a', 'c', 't'),
#  ('a', 't', 'c'), ('t', 'c', 'a'), ('t', 'a', 'c')]

# All k-permutations
print(list(permutations("abcd", 2)))
# [('a','b'), ('a','c'), ('a','d'), ('b','a'), ('b','c'), ('b','d'),
#  ('c','a'), ('c','b'), ('c','d'), ('d','a'), ('d','b'), ('d','c')]
print(len(list(permutations("abcd", 2))))   # 12 = P(4, 2)
```

Enumeration becomes infeasible past $n \approx 10$ ($10! = 3.6$
million). Don't try to list permutations of $20$ items.

## Derivational

*Why* is $P(n, k) = \dfrac{n!}{(n-k)!}$?

Permutations of all $n$ items number $n!$. But each $k$-permutation
fixes only the first $k$ positions; the remaining $n - k$ items can
be in any order without affecting the $k$-permutation we're
counting. So $n!$ overcounts $k$-permutations by a factor of $(n -
k)!$:

$$
n! = P(n, k) \cdot (n - k)!.
$$

Solving for $P(n, k)$ gives the formula.

Alternatively (and more directly), the multiplication principle:
$n$ choices for slot $1$, $n-1$ for slot $2$, ..., $n - k + 1$ for
slot $k$. Total: $n \cdot (n-1) \cdot \ldots \cdot (n - k + 1)$.
This is exactly $\dfrac{n!}{(n-k)!}$ once you write it out.

The $\dfrac{n!}{(n-k)!}$ form is convenient algebraically; the
direct product is easier to compute.

## Connective

Permutations are the bridge to combinations (next lesson):

- **Combinations** = permutations divided by orderings:
  $\binom{n}{k} = \dfrac{P(n, k)}{k!}$. Lesson 03 develops this.
- **Pascal's triangle** (Lesson 04) lays out $\binom{n}{k}$
  values; you'll see that they're permutations divided by $k!$
  twice over.

In CS:

- **Sorting**: a sorting algorithm's worst case must be at least
  $\log_2(n!)$ comparisons (a lower bound) — every permutation of
  the input must lead to a distinct sequence of comparisons.
  Lesson 06 of Strand 1 Intermediate (logs) showed that $\log_2(n!)
  \approx n \log_2 n$, which is why $O(n \log n)$ is the
  comparison-sort lower bound.
- **Cryptographic permutations**: AES rounds permute $128$-bit
  blocks; total permutations of a block are $(2^{128})!$ — a
  number too large to write down. Cryptographic security depends
  on the right permutations being hard to identify.
- **Backtracking algorithms**: many puzzles (sudoku, n-queens) are
  permutation-search problems, with cleverness used to avoid
  enumerating all $n!$ candidates.

## Applied

- **Tournament seedings**: a $32$-team tournament has $32!$ possible
  initial seeding orders — a number with $36$ digits. Tournament
  seeding is one of the hard problems in sports administration.
- **Sorting**: when you sort an $n$-element list, the algorithm
  picks one of $n!$ possible permutations as output.
- **Anagrams**: counting the rearrangements of a word's letters,
  with adjustments when letters repeat (the next-lesson trick).
  "MISSISSIPPI" has $11$ letters but only $\dfrac{11!}{4! 4! 2! 1!}
  = 34\,650$ distinct anagrams (because of repeated letters) —
  far less than $11! = 39\,916\,800$.
- **Race finishes**: a horse race with $n$ horses has $n!$ possible
  finishing orders. With $8$ horses, $40\,320$ — manageable. With
  $20$, $2.4 \times 10^{18}$ — beyond enumeration.
- **Password derivation order**: when you list the most likely
  password attempts in order (e.g., for a password manager
  derivation), you're permuting the candidate set.
- **Speedrun route choice**: a video game with $5$ collectibles to
  gather has $5! = 120$ possible orderings to do them in.
  Speedrunners optimise by computing route times for the best of
  these.
- **Board Exam / JEE (CBSE Class 11, Chapter 7 — Permutations and
  Combinations)** — NCERT Ex 7.2–7.3 drill ${}^nP_r = n!/(n-r)!$
  on word-arrangement problems. Standard JEE setups: distinct
  arrangements of `PERMUTATIONS` (one repeated letter `T`) is
  $12!/2!$; with all vowels together, clump them into a block,
  permute 8 objects ($8!/2!$) and 5 vowels inside ($5!$). Circular
  permutations: $(n-1)!$, with $/2$ for necklaces (clockwise =
  anticlockwise).

## Check Your Understanding

:::widget type=numeric-input prompt="What is $4!$?" answer=24 explain="$4 \\cdot 3 \\cdot 2 \\cdot 1 = 24$.":::

:::widget type=numeric-input prompt="What is $0!$?" answer=1 explain="$0! = 1$ by convention — there is exactly one arrangement of zero items (the empty one).":::

:::widget type=numeric-input prompt="In how many orders can $6$ runners finish a race?" answer=720 explain="$6! = 720$. (Permutations of the 6 runners.)":::

:::widget type=numeric-input prompt="$P(10, 3) = ?$ (Choose and order 3 from 10.)" answer=720 explain="$10 \\cdot 9 \\cdot 8 = 720$. Equivalently $\\dfrac{10!}{7!}$.":::
