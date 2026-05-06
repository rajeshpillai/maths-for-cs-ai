---
strand: pattern-counting
level: intermediate
order: 4
title: Derangements — Permutations with No Fixed Points
prerequisites:
  - tier: strand-5-pattern-counting-intermediate
    slug: 01-inclusion-exclusion
    description: Inclusion-exclusion
connections:
  - strand-5-pattern-counting-foundation/02-permutations-and-factorial
applications:
  - cs: "Secret-Santa shuffles, hash-table 'no item in original slot' tests"
  - business: "Random pairing tasks (mentor-mentee shuffling)"
  - games: "Round-robin pairings without rematches"
  - life: "Hat-check problem — what's the probability nobody gets their own hat?"
---

# Derangements — Permutations with No Fixed Points

## Explain Like I Am 7

Imagine everyone at a party drops their hat in a basket, then a
mischievous cat jumbles them and hands one back to each guest.  A
**derangement** is the unlucky case where *nobody* gets their own
hat.  Surprisingly, no matter how big the party — five guests or
five hundred — the chance of this perfect mismatch hovers right
around $37\%$, the number $1/e$ in disguise.  That same
"nobody-picks-themselves" puzzle is exactly the worry behind the
Secret Santa shuffle every December.

## Mental

A **derangement** of $n$ items is a permutation in which **no item
sits in its original position**. The count is denoted $!n$ ("subfactorial $n$" — note the unusual notation).

The classic puzzle: $n$ people drop off their hats; the cloakroom
shuffles them and returns them at random. What's the probability
nobody gets their own hat back?

For $n = 3$ items $\{1, 2, 3\}$, derangements:

- $(2, 3, 1)$ — nobody in their original slot.
- $(3, 1, 2)$ — same.

That's it. $!3 = 2$. Out of $3! = 6$ total permutations, the
probability of derangement is $\dfrac{2}{6} = \dfrac{1}{3}$.

For $n = 4$: $!4 = 9$, probability $\dfrac{9}{24} = 0.375$.

For large $n$, **the probability of derangement converges to
$\dfrac{1}{e} \approx 0.368$**. This is one of the most beautiful
asymptotic results in combinatorics — the appearance of $e$ in a
purely counting question.

## Counting derangements

By inclusion-exclusion (Lesson 01): let $A_i$ = permutations where
item $i$ is in its original slot.

$$
|A_1 \cup \ldots \cup A_n| = \sum_i |A_i| - \sum_{i<j} |A_i \cap A_j| + \ldots
$$

Each $|A_i| = (n-1)!$ (item $i$ fixed; others permute freely).
$|A_i \cap A_j| = (n-2)!$. In general, $|A_{i_1} \cap \ldots \cap
A_{i_k}| = (n-k)!$.

There are $\binom{n}{k}$ ways to choose $k$ specific items to fix:

$$
|A_1 \cup \ldots \cup A_n| = \sum_{k=1}^n (-1)^{k+1} \binom{n}{k} (n-k)!.
$$

Number of derangements (no fixed points):

$$
!n = n! - |A_1 \cup \ldots \cup A_n| = n! \sum_{k=0}^n \frac{(-1)^k}{k!}.
$$

The **probability of derangement**:

$$
\frac{!n}{n!} = \sum_{k=0}^n \frac{(-1)^k}{k!}.
$$

This sum is exactly the partial sum of the Taylor series for $e^{-1}$
(Strand 4 develops Taylor series). As $n \to \infty$:

$$
\frac{!n}{n!} \to e^{-1} \approx 0.3679.
$$

A constant fraction of permutations are derangements, regardless of
$n$ — for $n \ge 5$ or so, almost exactly $36.8\%$.

## Interactive

:::widget type=numeric-input prompt="$!4 = ?$ (Use $!n = n! - \\binom{n}{1}(n-1)! + \\binom{n}{2}(n-2)! - \\ldots$ or the recurrence $!n = (n-1)(!(n-1) + !(n-2))$.)" answer=9 explain="$!4 = 24 - 4 \\cdot 6 + 6 \\cdot 2 - 4 \\cdot 1 + 1 = 24 - 24 + 12 - 4 + 1 = 9$.":::

:::widget type=numeric-input prompt="$!5 = ?$" answer=44 explain="$!5 = 120 - 120 + 60 - 20 + 5 - 1 = 44$.":::

:::widget type=numeric-input prompt="Probability of derangement for $n = 5$? Type the decimal rounded to 3 places." answer=0.367 tolerance=0.005 explain="$!5 / 5! = 44/120 \\approx 0.367$. Already very close to $1/e \\approx 0.368$.":::

:::widget type=numeric-input prompt="In Secret Santa, $10$ people draw names. What's the approximate probability nobody draws themselves?" answer=0.368 tolerance=0.005 explain="$1/e \\approx 0.368$. The convergence is so fast that for any $n \\ge 5$ the probability is essentially $1/e$.":::

## Symbolic

The **derangement number**:

$$
!n = n! \sum_{k=0}^n \frac{(-1)^k}{k!}.
$$

A useful **recurrence**: $!n = (n - 1)(!(n-1) + !(n-2))$ for $n \ge 2$,
with $!0 = 1, !1 = 0$.

A simpler recurrence: $!n = n \cdot !(n-1) + (-1)^n$.

The first few derangement numbers:

$$
!0 = 1, \, !1 = 0, \, !2 = 1, \, !3 = 2, \, !4 = 9, \, !5 = 44, \, !6 = 265, \, !7 = 1854.
$$

## Computational

```python
def derangements(n):
    if n == 0: return 1
    if n == 1: return 0
    a, b = 1, 0   # !0, !1
    for i in range(2, n + 1):
        a, b = b, (i - 1) * (a + b)
    return b

print([derangements(n) for n in range(8)])
# [1, 0, 1, 2, 9, 44, 265, 1854]

import math
def derangement_prob(n):
    return derangements(n) / math.factorial(n)

print([round(derangement_prob(n), 4) for n in range(2, 11)])
# [0.5, 0.3333, 0.375, 0.3667, 0.3681, 0.3679, 0.3679, 0.3679, 0.3679]
print(round(1 / math.e, 4))   # 0.3679
```

## Applied

- **Secret Santa / Kris Kringle**: drawing names randomly fails ~$37\%$
  of the time (someone draws themselves). Real Secret Santa
  algorithms are *constrained* random — you redraw if any person draws
  themselves. The probability of needing a redraw is constant at $1
  - 1/e \approx 0.63$.
- **Database join testing**: "no row maps to itself" is exactly a
  derangement condition.
- **Card-shuffle randomness**: a derangement-checking test is a
  weak but quick measure of shuffle quality.
- **Rendering / animation**: in some procedural-shuffle effects,
  derangements ensure no element stays in place during a transition.

## Check Your Understanding

:::widget type=numeric-input prompt="$!3$?" answer=2 explain="From the formula or list: $!3 = 2$.":::

:::widget type=numeric-input prompt="Out of $5! = 120$ permutations of $\\{1, 2, 3, 4, 5\\}$, how many are derangements?" answer=44 explain="$!5 = 44$.":::

:::widget type=numeric-input prompt="Approximately $36.8\\%$ of permutations are derangements. What is $1/e$ rounded to 3 decimals?" answer=0.368 tolerance=0.001 explain="$e \\approx 2.718$, so $1/e \\approx 0.368$.":::

:::widget type=numeric-input prompt="$10$ guests check in coats randomly. Expected number of guests who get their own coat back?" answer=1 explain="By linearity of expectation (Strand 6 Lesson 08), each guest has $1/10$ chance, $10$ guests, expected $1$. Independent of $n$ — always exactly $1$.":::
