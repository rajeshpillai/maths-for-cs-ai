---
strand: pattern-counting
level: intermediate
order: 7
title: Integer Partitions
prerequisites:
  - tier: strand-5-pattern-counting-intermediate
    slug: 02-generating-functions
    description: Generating functions
connections:
  - strand-5-pattern-counting-intermediate/06-bijective-combinatorics
applications:
  - cs: "Coin change with constraints, scheduling problems"
  - business: "Distributing resources in unordered groups"
  - games: "Damage distribution among multi-target attacks"
  - life: "Counting ways to make change without coin order"
---

# Integer Partitions

## Explain Like I Am 7

You have four identical cookies and you want to share them into
piles.  You could keep them in one big pile of four, or split them
as $3 + 1$, or $2 + 2$, or $2 + 1 + 1$, or four lonely cookies on
their own.  That's five different "partitions" of the number four.
The piles don't care about order — $3 + 1$ and $1 + 3$ count as the
same way of sharing.  Counting these pile-arrangements as the total
grows is a deep puzzle: even the great Ramanujan was charmed by it,
because there's no easy formula, only a beautiful pattern.

## Mental

A **partition** of a positive integer $n$ is a way to write $n$ as a
sum of positive integers, where **order doesn't matter**.

For $n = 4$:

$$
4 = 4 = 3+1 = 2+2 = 2+1+1 = 1+1+1+1.
$$

That's $5$ partitions. Standard notation: $p(4) = 5$.

By convention, partitions are written in **non-increasing** order
(largest first), so $3 + 1$ rather than $1 + 3$.

The function $p(n)$ — the number of partitions of $n$ — grows
**rapidly but not exponentially**:

$$
p(1) = 1, p(2) = 2, p(3) = 3, p(4) = 5, p(5) = 7, p(6) = 11, p(7) = 15, p(8) = 22, p(9) = 30, p(10) = 42.
$$

There is **no simple closed form** for $p(n)$ — but Hardy and
Ramanujan ($1918$) proved the beautiful asymptotic

$$
p(n) \sim \frac{1}{4n \sqrt 3} \exp\!\left(\pi \sqrt{\frac{2n}{3}}\right).
$$

The presence of $\pi$ in a counting result is striking. Strand 4
Master develops the analytic combinatorics that explains why.

## Compositions vs partitions

Quick reminder:

- **Compositions** (Foundation Lesson 06): ordered sums.
  $4 = 3 + 1$ is different from $1 + 3$. Counted by stars and
  bars: $\binom{n + k - 1}{k - 1}$ for $k$-part compositions.
- **Partitions**: unordered sums. $3 + 1$ and $1 + 3$ are the
  same. No closed form.

## Generating function

The generating function for $p(n)$:

$$
P(x) = \prod_{k=1}^\infty \frac{1}{1 - x^k}.
$$

Each factor $1/(1 - x^k) = 1 + x^k + x^{2k} + \ldots$ contributes
the count of how many copies of $k$ to use. Multiply over all $k$
to get the GF.

This is exactly the coin-change generating function from Lesson 02
when "coins" are all positive integers.

## Interactive

:::widget type=numeric-input prompt="$p(5) = ?$ List them: $5, 4+1, 3+2, 3+1+1, 2+2+1, 2+1+1+1, 1+1+1+1+1$. Count?" answer=7 explain="Seven partitions.":::

:::widget type=numeric-input prompt="$p(6) = ?$ ($6, 5+1, 4+2, 4+1+1, 3+3, 3+2+1, 3+1+1+1, 2+2+2, 2+2+1+1, 2+1+1+1+1, 1+1+1+1+1+1$.)" answer=11 explain="Eleven partitions.":::

:::widget type=numeric-input prompt="The number of partitions of $7$ into **distinct** parts equals the number of partitions of $7$ into **odd** parts (Euler's identity). Both equal $5$. List odd-only: $7, 5+1+1, 3+3+1, 3+1+1+1+1, 1+1+1+1+1+1+1$. ✓" answer=5 explain="Five partitions in each case. (Euler's beautiful $1748$ identity.)":::

:::widget type=numeric-input prompt="$p(10) = ?$ (Don't list — recall from sequence.)" answer=42 explain="$p(10) = 42$. Coincidentally also the answer to life, the universe and everything.":::

## Symbolic

Generating function:

$$
P(x) = \prod_{k=1}^\infty \frac{1}{1 - x^k}.
$$

**Distinct-parts** generating function (each part appears at most
once):

$$
D(x) = \prod_{k=1}^\infty (1 + x^k).
$$

**Odd-parts** generating function:

$$
O(x) = \prod_{k \text{ odd}} \frac{1}{1 - x^k}.
$$

**Euler's identity**: $D(x) = O(x)$. The number of partitions into
distinct parts equals the number into odd parts. The proof is a
beautiful bijection (Lesson 06) that we'll spare here.

**Pentagonal number theorem** (Euler again):

$$
\prod_{k=1}^\infty (1 - x^k) = 1 + \sum_{k=1}^\infty (-1)^k (x^{k(3k-1)/2} + x^{k(3k+1)/2}).
$$

## Computational

```python
def partitions(n):
    """Number of integer partitions of n."""
    if n == 0: return 1
    p = [1] + [0] * n
    for k in range(1, n + 1):
        for j in range(k, n + 1):
            p[j] += p[j - k]
    return p[n]

print([partitions(n) for n in range(11)])
# [1, 1, 2, 3, 5, 7, 11, 15, 22, 30, 42]

# All actual partitions
def all_partitions(n, max_part=None):
    if max_part is None: max_part = n
    if n == 0: yield ()
    elif n < 0: return
    else:
        for k in range(min(n, max_part), 0, -1):
            for rest in all_partitions(n - k, k):
                yield (k,) + rest

print(list(all_partitions(5)))
# [(5,), (4, 1), (3, 2), (3, 1, 1), (2, 2, 1), (2, 1, 1, 1), (1, 1, 1, 1, 1)]
```

## Applied

- **Coin change without order**: how many ways to make $n$ cents
  using any positive denominations? A partition of $n$.
- **Resource distribution**: $n$ identical items into unordered
  bins. (Different from stars and bars, where bins are ordered.)
- **Quantum statistics**: Bose-Einstein partitioning of identical
  bosons among energy levels.

## Check Your Understanding

:::widget type=numeric-input prompt="$p(8) = ?$" answer=22 explain="$22$. From the sequence.":::

:::widget type=numeric-input prompt="Number of partitions of $5$ into distinct parts? List: $5, 4+1, 3+2$. Count?" answer=3 explain="Three. Compare to all-partitions $p(5) = 7$.":::

:::widget type=numeric-input prompt="By Euler's identity, partitions of $5$ into odd parts must also = $3$. They are $5, 3+1+1, 1+1+1+1+1$. ✓ How many?" answer=3 explain="Three — matching the distinct count.":::

:::widget type=numeric-input prompt="Asymptotic of $p(n)$ at $n = 100$: $\\dfrac{1}{4 \\cdot 100 \\sqrt 3} e^{\\pi \\sqrt{200/3}} \\approx ?$ (Round to nearest power of 10's exponent.)" answer=8 explain="The actual $p(100) = 190\\,569\\,292 \\approx 2 \\cdot 10^8$. So the order of magnitude is $10^8$.":::
