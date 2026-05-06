---
strand: number-quantity
level: advanced
order: 3
title: Continued Fractions
prerequisites:
  - tier: strand-1-number-quantity-intermediate
    slug: 07-surds-and-exact-arithmetic
    description: Surds and irrationals
connections:
  - strand-1-number-quantity-advanced/04-algebraic-and-transcendental
applications:
  - cs: "Best rational approximations to floats; calendar adjustment"
  - business: "Gear ratios in mechanical engineering"
  - life: "Why the Gregorian calendar inserts leap years the way it does"
---

# Continued Fractions

## Explain Like I Am 7

Imagine you're trying to copy a strange-length stick using only whole
units.  First you mark off as many *whole* units as fit; what's left
is a smaller stick.  Now flip the leftover into "one over the
leftover" and repeat the trick on *that*.  Keep going, and you build a
nested ladder of fractions that zooms in on the original stick like
matryoshka dolls.  This ladder gives the **best possible** simple
fractions to approximate the stick — which is exactly how clockmakers
pick gear ratios and how the calendar decides when to insert a leap
day.

## Mental

A **continued fraction** represents a real number as nested fractions:

$$
x = a_0 + \cfrac{1}{a_1 + \cfrac{1}{a_2 + \cfrac{1}{a_3 + \cdots}}}.
$$

Compact notation: $x = [a_0; a_1, a_2, a_3, \ldots]$.

The $a_i$ are called **partial quotients**. They're positive integers
(except $a_0$, which can be zero or negative).

For rational $x$, the expansion **terminates** ($x = [a_0; a_1,
\ldots, a_k]$ for some finite $k$). For irrational $x$, it goes on
forever.

Famous examples:

$$
\sqrt{2} = [1; 2, 2, 2, 2, \ldots] \quad \text{(periodic — characteristic of quadratic irrationals)}
$$

$$
\varphi = [1; 1, 1, 1, 1, \ldots] \quad \text{(the golden ratio — slowest possible convergence)}
$$

$$
e = [2; 1, 2, 1, 1, 4, 1, 1, 6, 1, 1, 8, \ldots] \quad \text{(neat pattern)}
$$

$$
\pi = [3; 7, 15, 1, 292, 1, 1, 1, 2, 1, 3, 1, \ldots] \quad \text{(no obvious pattern)}
$$

## Convergents

Truncating a continued fraction at depth $k$ gives a **convergent**
$p_k / q_k$ — a rational number that approximates $x$.

For $\pi = [3; 7, 15, 1, 292, \ldots]$:

- $[3] = 3$
- $[3; 7] = 22/7 \approx 3.142857$ (Archimedes!)
- $[3; 7, 15] = 333/106 \approx 3.141509$
- $[3; 7, 15, 1] = 355/113 \approx 3.141593$ (Zu Chongzhi!)

Each convergent is the **best rational approximation** with
denominator that small. $355/113$ is correct to **6 decimal places**
— the closest fraction to $\pi$ with denominator under $114$.

This is why specific historical approximations ($22/7$, $355/113$)
keep showing up: they're convergents of the continued fraction
expansion.

## Interactive

:::widget type=numeric-input prompt="The continued fraction for $\\sqrt{2}$ is $[1; 2, 2, 2, \\ldots]$. The first convergent $[1] = ?$" answer=1 explain="The integer part. $1$.":::

:::widget type=numeric-input prompt="$[1; 2] = 1 + 1/2 = ?$ — type the decimal." answer=1.5 explain="$3/2 = 1.5$. (Approximating $\\sqrt 2 \\approx 1.414$.)":::

:::widget type=numeric-input prompt="$[1; 2, 2] = 1 + 1/(2 + 1/2) = 1 + 1/(5/2) = ?$ — type the decimal rounded to 3 dp." answer=1.4 tolerance=0.005 explain="$1 + 2/5 = 7/5 = 1.4$. Closer to $\\sqrt 2$.":::

:::widget type=numeric-input prompt="The convergent $355/113$ approximates $\\pi$ to roughly how many decimal places?" answer=6 explain="$355/113 \\approx 3.1415929$ vs $\\pi = 3.1415927$. Agreement to 6 decimals.":::

## Symbolic

Compute partial quotients via the **continued-fraction algorithm**:

1. $a_0 = \lfloor x \rfloor$.
2. If $x = a_0$, stop. Else $x_1 = 1/(x - a_0)$.
3. $a_1 = \lfloor x_1 \rfloor$.
4. Repeat.

Convergents satisfy a beautiful recurrence:

$$
p_k = a_k p_{k-1} + p_{k-2}, \quad q_k = a_k q_{k-1} + q_{k-2},
$$

with $p_{-1} = 1, p_{-2} = 0, q_{-1} = 0, q_{-2} = 1$.

**Best-approximation property**: any rational $p/q$ closer to $x$ than
some convergent must have $q$ **larger** than the convergent's
denominator. Continued-fraction convergents are unbeatable in their
denominator class.

## Computational

```python
def continued_fraction(x, max_terms=10):
    a = []
    for _ in range(max_terms):
        floor = int(x)
        a.append(floor)
        if x == floor: break
        x = 1 / (x - floor)
    return a

import math
print(continued_fraction(math.sqrt(2), 8))   # [1, 2, 2, 2, 2, 2, 2, 2]
print(continued_fraction(math.pi, 8))         # [3, 7, 15, 1, 292, 1, 1, 1]
print(continued_fraction(math.e, 8))          # [2, 1, 2, 1, 1, 4, 1, 1]

def convergent(a):
    """Compute p/q from partial quotients."""
    p, q = 1, 0
    for ai in reversed(a):
        p, q = ai * p + q, p
    return p, q

print(convergent([3, 7]))            # (22, 7)
print(convergent([3, 7, 15, 1]))     # (355, 113)
```

## Applied

- **Calendar design**: a tropical year is $\sim 365.24219$ days. Its
  continued fraction is $[365; 4, 7, 1, 3, \ldots]$. Convergents:
  $365$ (Roman), $365 + 1/4$ (Julian — leap year every 4),
  $\frac{1461}{4} = 365.25$. The Gregorian correction (skip leap
  years on century non-multiples-of-400) is a finer-grained convergent.
- **Gear ratios**: mechanical clockwork uses continued-fraction
  approximations to make compound gears ratio close to a target.
- **Number-theoretic algorithms**: factoring, primality, and lattice
  reduction all use continued-fraction techniques.
- **LLL algorithm**: 1982-vintage algorithm for lattice basis
  reduction; a generalisation of continued fractions to higher
  dimensions; foundational for cryptanalysis.

## Check Your Understanding

:::widget type=numeric-input prompt="Compute the continued fraction of $7/3$. First partial quotient $a_0$?" answer=2 explain="$\\lfloor 7/3 \\rfloor = 2$. Then $7/3 - 2 = 1/3$, so $1/(1/3) = 3$ → $a_1 = 3$. CF: $[2; 3]$.":::

:::widget type=numeric-input prompt="The convergent $[3; 7] = ?$ — type the integer numerator." answer=22 explain="$22/7$.":::

:::widget type=numeric-input prompt="Number of partial quotients for any rational $p/q$? (Hint: terminates.) Type 1 if rationals always terminate, 0 otherwise." answer=1 explain="Rationals always terminate. The CF algorithm is essentially the Euclidean algorithm in disguise.":::

:::widget type=numeric-input prompt="$\\sqrt 5$'s continued fraction is $[2; 4, 4, 4, \\ldots]$. The first convergent $[2] = ?$" answer=2 explain="Integer part of $\\sqrt 5 \\approx 2.236$.":::
