---
strand: pattern-counting
level: intermediate
order: 2
title: Generating Functions — Counting with Polynomials
prerequisites:
  - tier: strand-5-pattern-counting-foundation
    slug: 05-binomial-theorem
    description: Binomial theorem
  - tier: strand-5-pattern-counting-foundation
    slug: 06-stars-and-bars
    description: Stars and bars
connections:
  - strand-5-pattern-counting-intermediate/03-recurrences-solved
applications:
  - cs: "Coin-change DP closed-form, asymptotic algorithm analysis"
  - business: "Inventory-distribution counts, lead-time analysis"
  - games: "Loot-table compositional probability"
  - life: "Anything that decomposes into a sum of independent contributions"
---

# Generating Functions — Counting with Polynomials

## Explain Like I Am 7

Think of a tidy little machine that hides a whole list of counts
inside one polynomial.  Each power of $x$ is a *bucket*, and the
number sitting in front of $x^k$ is "how many ways to make $k$."
The magic happens when you *multiply* two of these machines:
the buckets blend together exactly the way two-dice rolls combine
into a two-dice sum.  By treating counts as polynomial coefficients,
hard counting puzzles turn into ordinary algebra problems you can
solve by multiplying, adding, and looking up the right bucket.

## Mental

A **generating function** is a polynomial (or formal power series)
whose **coefficients** are a counting sequence. Rather than working
with the sequence $a_0, a_1, a_2, \ldots$ directly, you work with

$$
A(x) = a_0 + a_1 x + a_2 x^2 + a_3 x^3 + \ldots
$$

and apply algebra (multiplication, division, derivatives) to compute
new generating functions whose coefficients are *derived* sequences.

The slogan: **convert counting problems to algebra problems.**

A simple example. Roll a single fair die. The number of ways to get
each face $1$–$6$ is $1$ each. The generating function of "ways to
get sum $k$ from one die" is

$$
D(x) = x + x^2 + x^3 + x^4 + x^5 + x^6.
$$

Coefficient of $x^k$ = ways to get sum $k$.

Roll **two** dice. By the multiplication principle, the number of ways
to get sum $k$ is the **convolution** of the two single-die distributions:

$$
\text{ways for sum} = k = \sum_{i + j = k} (\text{ways for first} = i)(\text{ways for second} = j).
$$

Convolution of sequences corresponds to **multiplication of generating
functions**. So:

$$
D(x)^2 = (x + x^2 + \ldots + x^6)^2.
$$

Expand: coefficient of $x^7$ in $D(x)^2$ is $6$ — exactly the count of
two-dice rolls summing to $7$ (Strand 6 Foundation Lesson 03).

## The product principle

The general fact:

> If $A(x)$ generates a sequence and $B(x)$ generates another, then
> $A(x) \cdot B(x)$ generates the **convolution** — counts of "way to
> get $i$ via $A$ AND way to get $k - i$ via $B$, summed over $i$."

This is the multiplication principle from Foundation Lesson 00,
re-cast in algebra. For counting problems where contributions are
**independent and additive**, generating functions just *work*.

## A neat application: stars and bars revisited

Foundation Lesson 06 counted compositions of $n$ into $k$ parts as
$\binom{n+k-1}{k-1}$. Here's the GF approach.

Each part contributes some non-negative integer. The generating
function for a single part is $1 + x + x^2 + \ldots = \dfrac{1}{1-x}$
(geometric series).

The GF for $k$ parts (independent contributions, sums via product):

$$
\left(\frac{1}{1-x}\right)^k = (1-x)^{-k}.
$$

By the **generalised binomial theorem** (Strand 1 Intermediate Lesson
05), this expands to

$$
(1-x)^{-k} = \sum_{n \ge 0} \binom{n+k-1}{k-1} x^n.
$$

The coefficient of $x^n$ is exactly $\binom{n+k-1}{k-1}$ — stars and
bars, recovered from algebra.

## Interactive

:::widget type=numeric-input prompt="The generating function for the number of ways to make $n$ from $\\{1, 2, 5\\}$-cent coins (with repetition) is $\\dfrac{1}{(1-x)(1-x^2)(1-x^5)}$. The coefficient of $x^5$ is...?" answer=4 explain="Manually: ways to make 5 cents from $\\{1, 2, 5\\}$: 5; 2+2+1; 2+1+1+1; 1+1+1+1+1. That's 4 ways. ✓":::

:::widget type=numeric-input prompt="Two dice rolled. Coefficient of $x^9$ in $(x + x^2 + ... + x^6)^2$ — i.e., number of ways to roll sum $9$?" answer=4 explain="$(3,6),(4,5),(5,4),(6,3)$: 4 ways.":::

:::widget type=numeric-input prompt="In the GF $(1 + x)^4$, the coefficient of $x^2$ is...?" answer=6 explain="$\\binom{4}{2} = 6$. The binomial theorem.":::

:::widget type=step-revealer
{
  "title": "Coin-change: ways to make N cents from coins {1, 5, 10}",
  "steps": [
    {"prose": "We want a closed expression for: ways to make $N$ from any number of pennies, nickels, dimes."},
    {"math": "P(x) = 1 + x + x^2 + x^3 + \\ldots = \\frac{1}{1-x}", "prose": "Generating function for any non-negative number of pennies (each penny adds 1 cent)."},
    {"math": "N(x) = 1 + x^5 + x^{10} + \\ldots = \\frac{1}{1-x^5}", "prose": "Nickels each add 5 cents."},
    {"math": "D(x) = 1 + x^{10} + x^{20} + \\ldots = \\frac{1}{1-x^{10}}", "prose": "Dimes each add 10 cents."},
    {"math": "C(x) = P(x) \\cdot N(x) \\cdot D(x) = \\frac{1}{(1-x)(1-x^5)(1-x^{10})}", "prose": "Independent contributions multiply. The coefficient of $x^N$ in $C(x)$ is the count we want."},
    {"prose": "Expanding this gives a polynomial with the answer for each N. For $N = 25$ (a quarter), the coefficient is **12** — twelve ways to make a quarter from pennies, nickels, dimes."}
  ]
}
:::

## Computational

```python
import numpy as np

def coin_change_gf(coins, max_n):
    """Coefficients of 1/prod((1 - x^c) for c in coins) up to x^max_n."""
    # Start with 1 (the constant polynomial)
    poly = np.zeros(max_n + 1, dtype=int)
    poly[0] = 1

    for c in coins:
        new = poly.copy()
        for n in range(c, max_n + 1):
            new[n] += new[n - c]
        poly = new
    return poly

print(coin_change_gf([1, 5, 10], 25)[25])    # 12
print(coin_change_gf([1, 5, 10, 25], 50)[50])  # 49 ways for 50 cents

# Manually compute the 2-dice sum distribution
single_die = [0, 1, 1, 1, 1, 1, 1]   # x¹ … x⁶ coefficients
two_dice = np.convolve(single_die, single_die)
print(two_dice[7])   # 6 — ways to roll sum 7
print(list(two_dice))   # full distribution
```

`np.convolve` does polynomial multiplication; `[0, 1, 1, 1, 1, 1, 1]`
represents $x + x^2 + \ldots + x^6$.

## Symbolic

A generating function for a sequence $\{a_n\}$ is

$$
A(x) = \sum_{n \ge 0} a_n x^n.
$$

Three useful operations:

| Operation | Effect on coefficients |
|---|---|
| $A(x) \cdot B(x)$ | convolution: $c_n = \sum_k a_k b_{n-k}$ |
| $A(x) / (1 - x)$ | partial sums: $c_n = a_0 + a_1 + \ldots + a_n$ |
| $x A'(x)$ | $c_n = n a_n$ |

Common closed forms:

| Generating function | Sequence |
|---|---|
| $\dfrac{1}{1-x}$ | $1, 1, 1, \ldots$ |
| $\dfrac{1}{(1-x)^2}$ | $1, 2, 3, 4, \ldots$ |
| $\dfrac{1}{(1-x)^k}$ | $\binom{n+k-1}{k-1}$ |
| $(1+x)^n$ | binomial coefficients $\binom{n}{k}$ |
| $\dfrac{x}{1-x-x^2}$ | Fibonacci |

The Fibonacci closed-form via GF gives Binet's formula directly —
solve the rational function via partial fractions.

## Applied

- **Coin change problems** in algorithm interviews are pure
  generating-function questions — DP solutions compute these
  coefficients iteratively.
- **Asymptotic analysis**: the **growth rate** of a sequence
  corresponds to the nearest singularity of its GF. Strand 4 Master
  develops this (analytic combinatorics).
- **Probability generating functions**: Strand 6 Intermediate uses
  $E[x^X] = \sum p_n x^n$ for random variables.
- **Symbolic algebra**: tools like SymPy, Mathematica use generating
  functions internally for many counting computations.

## Check Your Understanding

:::widget type=numeric-input prompt="In $\\dfrac{1}{(1-x)^3}$, the coefficient of $x^4$ is $\\binom{n+k-1}{k-1}$ with $n=4, k=3$. What is it?" answer=15 explain="$\\binom{6}{2} = 15$.":::

:::widget type=numeric-input prompt="Coefficient of $x^4$ in $(1 + x + x^2)^3$? (Brute-force expansion or convolution.)" answer=6 explain="$(1+x+x^2)^3$: think of it as 3 dice with sides {0, 1, 2}. Coefficient of $x^4$ = ways to get sum 4 from 3 such dice. Triples summing to 4: $(0,2,2), (2,0,2), (2,2,0), (1,1,2), (1,2,1), (2,1,1)$. Six.":::

:::widget type=numeric-input prompt="Number of ways to make $\\$0.50$ from pennies, nickels, dimes, quarters?" answer=49 explain="Coefficient of $x^{50}$ in $\\dfrac{1}{(1-x)(1-x^5)(1-x^{10})(1-x^{25})}$ is $49$.":::

:::widget type=numeric-input prompt="Coefficient of $x^5$ in $(1 + x)^7$?" answer=21 explain="$\\binom{7}{5} = 21$.":::
