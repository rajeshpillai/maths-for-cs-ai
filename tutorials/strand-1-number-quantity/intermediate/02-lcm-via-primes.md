---
strand: number-quantity
level: intermediate
order: 2
title: LCM and the Identity gcd · lcm = a · b
prerequisites:
  - tier: strand-1-number-quantity-intermediate
    slug: 01-gcd-and-euclid
    description: GCD and Euclid's algorithm
connections:
  - strand-1-number-quantity-intermediate/03-modular-arithmetic
applications:
  - business: "When two delivery cycles re-align; project deadline coordination"
  - cs: "Loop synchronisation; finding common buffer sizes; clock-skew correction"
  - games: "Animation cycles re-aligning; spawn-timer coordination"
  - life: "Bus arrivals at a stop; menstrual + lunar cycles; calendar leap-week alignment"
---

# LCM and the Identity gcd · lcm = a · b

## Explain Like I Am 7

Two friends visit a park: Alex turns up every 12 days, Sam every 18.
On which day will they both show up *together* again?  The answer is
the **smallest** day-number that fits Alex's pattern *and* Sam's — the
"least common meeting day."  And there's a neat handshake between this
meeting day and the largest spacing they share: multiply Alex's spacing
by Sam's, and you get the meeting day times the shared spacing.  The
two pieces of the puzzle always slot together perfectly.

## Mental

The **least common multiple** of two whole numbers is the smallest
positive number that **both** of them divide. If buses on Route A
arrive every $12$ minutes and on Route B every $18$, both buses
appear together every $\text{lcm}(12, 18) = 36$ minutes.

By the **fundamental theorem of arithmetic** (Lesson 00), every
positive integer has a unique prime factorisation. The LCM, like the
GCD, is determined by these factorisations — but using the
**maximum** rather than the minimum exponent on each prime:

$$
12 = 2^2 \cdot 3, \quad 18 = 2 \cdot 3^2 \quad \Rightarrow \quad \text{lcm}(12, 18) = 2^2 \cdot 3^2 = 36.
$$

Take **each prime that appears in either factorisation**, raised to the
**larger** of the two exponents. Multiply.

The matching pair from Lesson 01 — the GCD — uses the **minimum**
exponent on each prime. So GCD picks the *shared* part, LCM picks the
*combined* part. Together they cover the entire prime structure of
both numbers, leading to a beautiful identity:

$$
\gcd(a, b) \cdot \text{lcm}(a, b) = a \cdot b.
$$

For $a = 12, b = 18$: $\gcd \cdot \text{lcm} = 6 \cdot 36 = 216 = 12
\cdot 18$. ✓

This identity gives a **fast LCM algorithm**: compute the GCD by
Euclid (which is fast even for huge numbers), then divide:

$$
\text{lcm}(a, b) = \dfrac{a \cdot b}{\gcd(a, b)}.
$$

For $a = 1071, b = 462$ from Lesson 01: $\gcd = 21$, so
$\text{lcm} = \dfrac{1071 \cdot 462}{21} = \dfrac{494\,802}{21} =
23\,562$. No factorisation needed.

## Interactive

:::widget type=numeric-input prompt="What is $\\text{lcm}(4, 6)$?" answer=12 explain="$4 = 2^2$, $6 = 2 \\cdot 3$. Max exponents: $2^2 \\cdot 3 = 12$. Or: $\\dfrac{4 \\cdot 6}{\\gcd(4, 6)} = \\dfrac{24}{2} = 12$.":::

:::widget type=numeric-input prompt="What is $\\text{lcm}(12, 18)$?" answer=36 explain="From factorisations $12 = 2^2 \\cdot 3$, $18 = 2 \\cdot 3^2$: $\\text{lcm} = 2^2 \\cdot 3^2 = 4 \\cdot 9 = 36$.":::

:::widget type=numeric-input prompt="What is $\\text{lcm}(15, 28)$? (Hint: they're coprime.)" answer=420 explain="$\\gcd(15, 28) = 1$ (no common primes), so $\\text{lcm} = \\dfrac{15 \\cdot 28}{1} = 420$. **For coprime pairs, LCM = product.** Worth memorising.":::

:::widget type=numeric-input prompt="A bus on Route A arrives every $15$ minutes, Route B every $20$ minutes. After both arrive at 9:00 AM, when next do both arrive together? Type the number of minutes later." answer=60 explain="$\\text{lcm}(15, 20) = 60$. Both buses re-align after $60$ minutes. (At 10:00 AM.)":::

:::widget type=step-revealer
{
  "title": "LCM by GCD: lcm(72, 60)",
  "steps": [
    {"prose": "Step 1: compute $\\gcd(72, 60)$ using Euclid."},
    {"math": "72 = 1 \\cdot 60 + 12 \\\\ 60 = 5 \\cdot 12 + 0", "prose": "$\\gcd(72, 60) = 12$."},
    {"math": "\\text{lcm}(72, 60) = \\dfrac{72 \\cdot 60}{\\gcd(72, 60)} = \\dfrac{4320}{12}", "prose": "Apply the identity."},
    {"math": "\\text{lcm}(72, 60) = 360", "prose": "Done. (Cross-check by factorisation: $72 = 2^3 \\cdot 3^2$, $60 = 2^2 \\cdot 3 \\cdot 5$, max exponents: $2^3 \\cdot 3^2 \\cdot 5 = 360$. ✓)"}
  ]
}
:::

## Symbolic

If two numbers have factorisations

$$
a = p_1^{a_1} \ldots p_r^{a_r}, \quad b = p_1^{b_1} \ldots p_r^{b_r},
$$

(using the same prime list with zero exponents as needed), then

$$
\gcd(a, b) = \prod_i p_i^{\min(a_i, b_i)}, \qquad \text{lcm}(a, b) = \prod_i p_i^{\max(a_i, b_i)}.
$$

The identity $\gcd \cdot \text{lcm} = a b$ comes from a simple
exponent identity: for any pair of nonneg numbers $x, y$,

$$
\min(x, y) + \max(x, y) = x + y.
$$

Multiply this exponent identity prime by prime:

$$
\prod p_i^{\min(a_i, b_i)} \cdot \prod p_i^{\max(a_i, b_i)} = \prod p_i^{a_i + b_i} = a \cdot b.
$$

Same identity, three ways: as numbers ($\gcd \cdot \text{lcm} = a b$),
as exponents ($\min + \max = x + y$), and as prime products. They are
literally the same statement.

For three numbers, the identity gets messier:

$$
\gcd(a, b, c) \cdot \text{lcm}(a, b, c) \ne a \cdot b \cdot c \text{ in general.}
$$

(Because $\min(x, y, z) + \max(x, y, z)$ is not in general $x + y +
z$.) So the clean two-number identity is special.

## Computational

The identity gives a one-liner for LCM:

```python
import math

def lcm(a, b):
    return a * b // math.gcd(a, b)

print(lcm(12, 18))     # 36
print(lcm(15, 28))     # 420  — coprime, so just the product
print(lcm(72, 60))     # 360
print(lcm(1071, 462))  # 23562
```

Python 3.9+ has `math.lcm` built-in, doing exactly this.

For three or more numbers, use **associativity** — LCM is
associative the same way `min` is:

```python
from functools import reduce

def lcm(a, b):
    return a * b // math.gcd(a, b)

def lcm_many(nums):
    return reduce(lcm, nums)

print(lcm_many([4, 5, 6]))      # 60
print(lcm_many([3, 4, 5, 6]))   # 60
print(lcm_many([2, 3, 5, 7, 11]))  # 2310 — primes only, so LCM = product
```

The factorisation-based version is slower for large numbers but
shows the structure clearly:

```python
from collections import Counter

def factorise(n):
    factors = Counter()
    p = 2
    while p * p <= n:
        while n % p == 0:
            factors[p] += 1
            n //= p
        p += 1
    if n > 1:
        factors[n] += 1
    return factors

def lcm_via_primes(a, b):
    fa, fb = factorise(a), factorise(b)
    primes = set(fa) | set(fb)
    result = 1
    for p in primes:
        result *= p ** max(fa.get(p, 0), fb.get(p, 0))
    return result

print(lcm_via_primes(12, 18))   # 36
```

For huge numbers, Euclid wins. For pedagogy, the factorisation form
makes the "max of exponents" rule visible.

## Derivational

*Why* does $\gcd(a, b) \cdot \text{lcm}(a, b) = a \cdot b$?

The proof above used prime factorisations. Here's a proof that **does
not** rely on factorisation, useful when you want to generalise the
identity.

Let $d = \gcd(a, b)$. Write $a = d \alpha$ and $b = d \beta$, where
$\gcd(\alpha, \beta) = 1$ (we've factored out everything they share).

We claim $\text{lcm}(a, b) = d \alpha \beta$.

- **It's a common multiple**: $a \mid d \alpha \beta$ because $a = d
  \alpha$ divides $d \alpha \beta$ (multiply by $\beta$). Similarly,
  $b \mid d \alpha \beta$.
- **It's the least common multiple**: suppose $m$ is a common
  multiple. Then $a \mid m$, so $m = a k = d \alpha k$ for some $k$.
  Also $b \mid m$, so $d \beta \mid d \alpha k$, which means $\beta
  \mid \alpha k$. Since $\gcd(\alpha, \beta) = 1$, we must have
  $\beta \mid k$ (Euclid's lemma applied to coprime numbers — Lesson
  00). So $k = \beta k'$ and $m = d \alpha \beta k'$, which is at
  least $d \alpha \beta$. Hence $d \alpha \beta$ is the smallest.

Now check the identity: $\gcd \cdot \text{lcm} = d \cdot d \alpha
\beta = d^2 \alpha \beta = (d \alpha)(d \beta) = a \cdot b$. ✓

The pivotal step is $\gcd(\alpha, \beta) = 1 \Rightarrow \alpha \mid
\alpha k \beta \Rightarrow \beta \mid k$, which is Euclid's lemma in
its general form. Lesson 00 introduced it for primes; the same idea
extends to coprime pairs.

## Connective

LCM and GCD show up together constantly:

- **Adding fractions** (Foundation Lesson 07): the lowest common
  denominator is exactly $\text{lcm}$ of the denominators. With
  $\dfrac{1}{4} + \dfrac{1}{6}$, lowest common denom is $\text{lcm}(4,
  6) = 12$.
- **Modular arithmetic** (next lesson): the **Chinese Remainder
  Theorem** combines remainders modulo coprime numbers, and the
  combined modulus is the LCM (= product when coprime).
- **Loop synchronisation**: two cyclic events repeat together every
  LCM ticks. Animation engines, cron schedules, music polyrhythms.
- **Network protocols**: TDMA (time-division multiple access)
  schedules transmissions at intervals whose LCM determines the
  full cycle length.

The cleanness of GCD/LCM from prime factorisations is part of why
unique factorisation is **so important** — it lets us define
operations on integers via operations on their prime exponents.

## Applied

- **Cycle alignment**: planet $A$ orbits every $365$ days, planet $B$
  every $687$. They re-align every $\text{lcm}(365, 687)$ days. With
  $\gcd(365, 687) = 1$ (coprime), $\text{lcm} = 365 \cdot 687 =
  250\,755$ days $\approx 687$ years. (This is roughly the synodic
  period of Earth and Mars.)
- **Music polyrhythms**: a $4$-against-$3$ polyrhythm completes one
  full pattern in $\text{lcm}(4, 3) = 12$ subdivisions of a beat.
- **Buffer sizing**: when two systems with periods $a$ and $b$ ticks
  share a buffer, sizing it for $\text{lcm}(a, b)$ ticks ensures
  both can complete an integer number of cycles.
- **Calendar coordination**: the Chinese sexagenary cycle uses both
  a $10$-stem and $12$-branch cycle, repeating every $\text{lcm}(10,
  12) = 60$ years.
- **Adding fractions in code**: every Python `Fraction.__add__` call
  computes LCM of denominators internally — though it actually uses
  the cross-multiplication trick to avoid the explicit LCM
  computation.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\text{lcm}(8, 12) = ?$" answer=24 explain="$8 = 2^3$, $12 = 2^2 \\cdot 3$. Max exponents: $2^3 \\cdot 3 = 24$.":::

:::widget type=numeric-input prompt="If $\\gcd(a, b) = 6$ and $a \\cdot b = 360$, what is $\\text{lcm}(a, b)$?" answer=60 explain="$\\text{lcm}(a, b) = \\dfrac{a \\cdot b}{\\gcd(a, b)} = \\dfrac{360}{6} = 60$. The identity in action.":::

:::widget type=numeric-input prompt="Two events repeat every $9$ and $15$ ticks. They've just coincided. How many ticks until they next coincide?" answer=45 explain="$\\text{lcm}(9, 15) = ?$ $\\gcd(9, 15) = 3$, so $\\text{lcm} = \\dfrac{9 \\cdot 15}{3} = 45$.":::

:::widget type=numeric-input prompt="Two coprime numbers $p$ and $q$ have $\\text{lcm}(p, q) = ?$ — express as a function of $p$ and $q$. (Type 0 if you'd write $p + q$, 1 if you'd write $p \\cdot q$, 2 if you'd write $\\max(p, q)$.)" answer=1 explain="Coprime $\\Rightarrow$ $\\gcd = 1$ $\\Rightarrow$ $\\text{lcm} = \\dfrac{p \\cdot q}{1} = p \\cdot q$. Their LCM is just the product.":::
