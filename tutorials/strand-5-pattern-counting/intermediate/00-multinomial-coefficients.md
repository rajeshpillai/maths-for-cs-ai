---
strand: pattern-counting
level: intermediate
order: 0
title: Multinomial Coefficients
prerequisites:
  - tier: strand-5-pattern-counting-foundation
    slug: 09-counting-in-real-problems
    description: Foundation capstone (multinomial introduced)
connections:
  - strand-5-pattern-counting-intermediate/02-generating-functions
applications:
  - cs: "Counting strings with letter frequencies (anagrams), partitioning"
  - business: "Allocating positions across project teams"
  - games: "Distributing points across $k$ stat categories with totals"
  - life: "Anagram problems, distributing candy with constraints"
---

# Multinomial Coefficients

## Mental

The Foundation capstone introduced anagrams of MISSISSIPPI: the count
$\dfrac{11!}{1! \cdot 4! \cdot 4! \cdot 2!} = 34\,650$. That formula
generalises to the **multinomial coefficient**.

> The number of ways to arrange $n$ items split into $r$ distinguishable
> categories of sizes $k_1, k_2, \ldots, k_r$ (with $k_1 + k_2 +
> \ldots + k_r = n$) is
>
> $$\binom{n}{k_1, k_2, \ldots, k_r} = \frac{n!}{k_1! k_2! \cdots k_r!}.$$

The binomial coefficient $\binom{n}{k}$ is the special case with two
categories: $\binom{n}{k} = \binom{n}{k, n-k} = \dfrac{n!}{k! (n-k)!}$.

**Reading**: there are $n!$ ways to order all items if all distinct;
the per-category $!$ in the denominator divides out the arrangements
of identical items within each category.

## Multinomial theorem

The natural generalisation of the binomial theorem (Foundation Lesson
05) — for sums of $r$ terms raised to a power:

$$
(a_1 + a_2 + \ldots + a_r)^n = \sum_{\substack{k_1 + \ldots + k_r = n \\ k_i \ge 0}} \binom{n}{k_1, k_2, \ldots, k_r} a_1^{k_1} a_2^{k_2} \cdots a_r^{k_r}.
$$

The summation is over all non-negative-integer compositions of $n$
into $r$ parts (Foundation Lesson 06's stars and bars counts these:
$\binom{n + r - 1}{r - 1}$).

Number of distinct monomial *types* in the expansion of $(a_1 + a_2
+ a_3)^5$? $\binom{5 + 2}{2} = 21$.

## Interactive

:::widget type=numeric-input prompt="Distinct anagrams of 'BOOKKEEPER' ($10$ letters: B=1, O=2, K=2, E=3, P=1, R=1)?" answer=151200 explain="$\\dfrac{10!}{1! \\cdot 2! \\cdot 2! \\cdot 3! \\cdot 1! \\cdot 1!} = \\dfrac{3628800}{24} = 151200$.":::

:::widget type=numeric-input prompt="$\\binom{6}{2, 2, 2}$ — split $6$ items into three groups of $2$. How many ways?" answer=90 explain="$\\dfrac{6!}{2! \\cdot 2! \\cdot 2!} = \\dfrac{720}{8} = 90$.":::

:::widget type=numeric-input prompt="A team of $12$ is split into $3$ projects: $5$, $4$, $3$ people respectively. How many ways?" answer=27720 explain="$\\binom{12}{5, 4, 3} = \\dfrac{12!}{5! 4! 3!} = \\dfrac{479\\,001\\,600}{120 \\cdot 24 \\cdot 6} = 27\\,720$.":::

:::widget type=numeric-input prompt="In the expansion $(x + y + z)^5$, what is the coefficient of $x^2 y^2 z$?" answer=30 explain="$\\binom{5}{2, 2, 1} = \\dfrac{5!}{2! 2! 1!} = \\dfrac{120}{4} = 30$.":::

## Symbolic

The multinomial coefficient (alternative notations: $\binom{n}{k_1,
\ldots, k_r}$ or $\binom{n}{k_1, k_2, \ldots, k_r}$):

$$
\binom{n}{k_1, k_2, \ldots, k_r} = \frac{n!}{k_1! \, k_2! \cdots k_r!}, \quad k_1 + k_2 + \ldots + k_r = n.
$$

Useful identity:

$$
\binom{n}{k_1, \ldots, k_r} = \binom{n}{k_1} \binom{n - k_1}{k_2} \binom{n - k_1 - k_2}{k_3} \cdots
$$

— "choose the first group, then the second from what's left, then the
third from what's left, ..." This shows the multinomial decomposes
into a product of binomials.

## Computational

```python
from math import factorial
from functools import reduce
from operator import mul

def multinomial(*ks):
    n = sum(ks)
    denom = reduce(mul, (factorial(k) for k in ks))
    return factorial(n) // denom

print(multinomial(1, 4, 4, 2))      # 34650 (MISSISSIPPI)
print(multinomial(5, 4, 3))          # 27720
print(multinomial(2, 2, 1))          # 30 (coefficient of x²y²z)
```

## Connective

- **Foundation Lesson 03**: $\binom{n}{k}$ is the two-category case.
- **Lesson 02 (Generating functions)**: multinomial theorem feeds
  in directly.
- **Probability**: the multinomial *distribution* gives
  $P(k_1, k_2, \ldots) = \binom{n}{k_1, \ldots, k_r} p_1^{k_1} \cdots
  p_r^{k_r}$ — Strand 6 Intermediate uses this.

## Applied

- **Anagram counters** for word puzzles, NYT crossword tools.
- **Bridge hands**: cards split into 4 hands of 13. $\binom{52}{13,
  13, 13, 13} \approx 5.36 \times 10^{28}$ ways.
- **Manufacturing**: $20$ identical-looking parts to be assigned to
  $4$ stations of capacity $5$ each: $\binom{20}{5,5,5,5}$.

## Check Your Understanding

:::widget type=numeric-input prompt="Anagrams of 'STATISTICS' (10 letters)? S=3, T=3, I=2, A=1, C=1." answer=50400 explain="$\\dfrac{10!}{3! 3! 2! 1! 1!} = \\dfrac{3628800}{72} = 50400$.":::

:::widget type=numeric-input prompt="Coefficient of $x^3 y^2 z$ in $(x + y + z)^6$?" answer=60 explain="$\\binom{6}{3, 2, 1} = \\dfrac{720}{12} = 60$.":::

:::widget type=numeric-input prompt="$15$ people split into a Zoom call of $7$, a meeting of $5$, and a coffee group of $3$. How many ways?" answer=360360 explain="$\\binom{15}{7, 5, 3} = \\dfrac{15!}{7! 5! 3!} = 360\\,360$.":::

:::widget type=numeric-input prompt="A multinomial expansion $(a_1 + a_2 + a_3 + a_4)^5$ has how many distinct monomial *types*? (Use stars and bars.)" answer=56 explain="$\\binom{5 + 3}{3} = \\binom{8}{3} = 56$.":::
