---
strand: number-quantity
level: advanced
order: 7
title: p-adic Numbers — A Different Notion of Distance
prerequisites:
  - tier: strand-1-number-quantity-intermediate
    slug: 03-modular-arithmetic
    description: Modular arithmetic
connections:
  - strand-1-number-quantity-advanced/06-quadratic-reciprocity
applications:
  - cs: "Hensel lifting in symbolic algebra; cryptography (post-quantum)"
  - life: "An alternative number system that completes Q differently than R"
---

# p-adic Numbers — A Different Notion of Distance

## Explain Like I Am 7

In our usual world, two numbers are close if their difference is tiny
on the number line.  Now imagine a strange new world where two numbers
are "close" if their difference shares lots of copies of the same
prime — say, the prime 5.  In this world, $25$ is closer to $0$ than
$1$ is, because $25$ has more 5s hiding inside.  This upside-down
ruler builds a whole new kind of number-line, and on it some equations
that look unsolvable suddenly have neat answers.  Number theorists use
it like a magnifying glass that zooms in on one prime at a time.

## Mental

The real numbers $\mathbb{R}$ are built from the rationals
$\mathbb{Q}$ by **completing** under the usual notion of distance
(absolute value). Sequences that are "Cauchy" (terms get arbitrarily
close) converge to a real.

The **p-adic numbers** $\mathbb{Q}_p$ result from a **different**
choice of distance. Pick a prime $p$. The **p-adic absolute value**
of a nonzero rational $r$ is

$$
|r|_p = p^{-v_p(r)},
$$

where $v_p(r)$ is the **p-adic valuation** — the exponent of $p$ in
the prime factorisation of $r$ (negative for fractions whose
denominator has $p$).

So:

- $|3|_7 = 7^0 = 1$ (no factors of 7).
- $|7|_7 = 7^{-1}$ (one factor of 7).
- $|49|_7 = 7^{-2}$ (two factors).
- $|1/7|_7 = 7$ (one factor of 7 in denom — counts negatively).

**Counter-intuitive fact**: in this metric, **larger powers of $p$ are
closer to zero**. The sequence $7, 49, 343, \ldots$ converges to $0$.

This produces a strange-looking but rigorous number system $\mathbb{Q}_p$,
the completion of $\mathbb{Q}$ under $|\cdot|_p$.

## p-adic numbers as power series

Every element of $\mathbb{Q}_p$ has a unique expansion

$$
x = \sum_{i = -k}^{\infty} a_i p^i, \quad 0 \le a_i < p,
$$

where the sum can extend infinitely **forward** (large positive
indices). Compare to base-10 numbers, which can have infinite
**negative** index parts (decimals after the point).

In $\mathbb{Q}_7$, the number $-1$ has expansion
$\ldots 6666 = 6 + 6 \cdot 7 + 6 \cdot 7^2 + \cdots$ — sums to $-1$
because the geometric series $\sum 6 \cdot 7^i = 6/(1-7) = -1$ in the
$7$-adic metric.

## Interactive

:::widget type=numeric-input prompt="$|14|_7 = 7^{-?}$. The 7-adic valuation of 14 is $v_7(14) = 1$. Type the exponent." answer=1 explain="$14 = 2 \\cdot 7$, so $v_7 = 1$, $|14|_7 = 7^{-1}$.":::

:::widget type=numeric-input prompt="$v_3(54) = ?$" answer=3 explain="$54 = 2 \\cdot 27 = 2 \\cdot 3^3$. So $v_3 = 3$.":::

:::widget type=numeric-input prompt="In the 5-adic absolute value, which number is 'closer' to 0: $5^{10}$ or $5^{100}$? (Type 1 for $5^{10}$, 0 for $5^{100}$.)" answer=0 explain="$|5^{100}|_5 = 5^{-100}$ which is much smaller than $|5^{10}|_5 = 5^{-10}$. So $5^{100}$ is **closer** to 0.":::

:::widget type=numeric-input prompt="$|1/49|_7 = ?$ — type the value as a power of 7. (Hint: $1/49 = 7^{-2}$, so $v_7(1/49) = -2$.)" answer=49 explain="$|1/49|_7 = 7^{-(-2)} = 7^2 = 49$. Negative valuation makes large absolute value.":::

## Symbolic

The **p-adic valuation** of a nonzero rational $r$ is the unique
integer $v_p(r)$ such that $r = p^{v_p(r)} \cdot u$ where $u$ has no
$p$ in numerator or denominator.

The **p-adic absolute value**: $|r|_p = p^{-v_p(r)}$, with $|0|_p = 0$.

This satisfies:

- $|x|_p = 0 \iff x = 0$,
- $|xy|_p = |x|_p |y|_p$,
- $|x + y|_p \le \max(|x|_p, |y|_p)$ — the **strong** (or
  **non-Archimedean**) triangle inequality.

The non-Archimedean property is the key difference from $\mathbb{R}$.
It gives rise to "every triangle is isoceles" and other unintuitive
geometric properties.

The **p-adic integers** $\mathbb{Z}_p \subset \mathbb{Q}_p$ are the
elements with $|x|_p \le 1$, equivalently the formal power series in
$p$ starting at index $0$.

## Why care

**Number theory**: many Diophantine problems are easier "p-adically"
than over $\mathbb{R}$. The **local-global principle** (Hasse) says:
solutions exist over $\mathbb{Q}$ iff they exist over every $\mathbb{Q}_p$
and over $\mathbb{R}$. The "local" perspectives often reveal structure
the "global" does not.

**Algebra**: $\mathbb{Q}_p$ is the natural setting for **Hensel
lifting** — refining a solution mod $p$ to a solution mod $p^k$ for
any $k$. Used in computer-algebra systems for polynomial factorisation.

**Cryptography**: post-quantum cryptography includes proposals based
on $p$-adic structures.

## Computational

```python
def p_adic_valuation(n, p):
    if n == 0: return float("inf")
    v = 0
    while n % p == 0:
        n //= p
        v += 1
    return v

print(p_adic_valuation(14, 7))     # 1
print(p_adic_valuation(54, 3))     # 3
print(p_adic_valuation(1000, 5))   # 3 (1000 = 8 * 125)

def p_adic_absvalue(n, p):
    return p ** (-p_adic_valuation(n, p))

print(p_adic_absvalue(7, 7))       # 1/7
print(p_adic_absvalue(49, 7))      # 1/49
```

## Applied

- **Hensel's lemma in CAS**: factor a polynomial mod $p$, then lift
  to mod $p^2, p^3, \ldots$ until you can reconstruct the factor
  over $\mathbb{Z}$. Used by Mathematica, SymPy.
- **Number-theoretic algorithms**: many efficient implementations
  use $p$-adic intermediate representations.
- **Pure mathematics**: $p$-adic L-functions are central to modern
  number theory — Iwasawa theory, the BSD conjecture, etc.

## Check Your Understanding

:::widget type=numeric-input prompt="$v_2(64) = ?$" answer=6 explain="$64 = 2^6$.":::

:::widget type=numeric-input prompt="$|100|_5 = ?$ — type the value (e.g. 0.04 for 1/25)." answer=0.04 tolerance=0.001 explain="$100 = 4 \\cdot 25 = 4 \\cdot 5^2$, $v_5 = 2$, $|100|_5 = 1/25 = 0.04$.":::

:::widget type=numeric-input prompt="In a non-Archimedean metric, $|x + y| \\le \\max(|x|, |y|)$. If $|x| = 3$ and $|y| = 5$, what is the maximum value of $|x + y|$?" answer=5 explain="The strong triangle inequality bounds it by max, not sum.":::

:::widget type=numeric-input prompt="The 7-adic distance from $7^{1000}$ to $0$ is $7^{-1000}$. To make it 'closer' to 0, the exponent of 7 must..." answer=0 explain="The valuation must increase. Type 0 for 'increase' or other framing — answer is conceptual: more powers of 7 = closer to 0 in this metric.":::
