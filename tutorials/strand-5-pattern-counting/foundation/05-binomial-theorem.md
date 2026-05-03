---
strand: pattern-counting
level: foundation
order: 5
title: The Binomial Theorem
prerequisites:
  - tier: strand-5-pattern-counting-foundation
    slug: 04-pascals-triangle
    description: Pascal's triangle
connections:
  - strand-1-number-quantity-intermediate/05-powers-and-exponent-rules
  - strand-6-uncertainty-foundation/05-independent-events-and-rule
applications:
  - business: "Compound-growth approximations; risk decomposition"
  - cs: "Polynomial multiplication, hashing analysis, power series"
  - games: "Probability of $k$ critical hits in $n$ attempts"
  - life: "Binomial probability — k successes in n independent trials"
---

# The Binomial Theorem

## Mental

Multiply $(a + b)$ by itself a few times:

$$
\begin{aligned}
(a + b)^1 &= a + b \\
(a + b)^2 &= a^2 + 2ab + b^2 \\
(a + b)^3 &= a^3 + 3 a^2 b + 3 a b^2 + b^3 \\
(a + b)^4 &= a^4 + 4 a^3 b + 6 a^2 b^2 + 4 a b^3 + b^4 \\
\end{aligned}
$$

The **coefficients** $1, 2, 1; 1, 3, 3, 1; 1, 4, 6, 4, 1; \ldots$
should look familiar. **They are the rows of Pascal's triangle**
from Lesson 04.

This is no coincidence. The **binomial theorem** states:

$$
(a + b)^n = \sum_{k=0}^n \binom{n}{k} \, a^{n-k} \, b^k.
$$

The coefficient of $a^{n-k} b^k$ in the expansion of $(a + b)^n$ is
exactly $\binom{n}{k}$.

The "binomial" in the name refers to the **two-term sum** $a + b$;
"theorem" because it's a fundamental identity. Every algebraic
expansion you ever do — and an enormous chunk of probability and
combinatorics — is the binomial theorem doing its work.

The intuition for the coefficients: when you expand $(a + b)^n$,
each term comes from picking an $a$ or a $b$ from each of the $n$
factors. A term with $k$ b's and $n - k$ a's appears once for **each
way to choose which** $k$ of the $n$ factors contribute a $b$.
That's $\binom{n}{k}$ — combinations again.

## Interactive

:::widget type=numeric-input prompt="What is the coefficient of $a^2 b^2$ in $(a + b)^4$?" answer=6 explain="$\\binom{4}{2} = 6$. Pascal row 4: $1, 4, 6, 4, 1$. The middle entry pairs with $a^2 b^2$.":::

:::widget type=numeric-input prompt="What is the coefficient of $a^3 b^2$ in $(a + b)^5$?" answer=10 explain="$\\binom{5}{2} = 10$. Pascal row 5: $1, 5, 10, 10, 5, 1$. The $a^3 b^2$ term has $k = 2$, so $\\binom{5}{2}$.":::

:::widget type=numeric-input prompt="$(a + b)^6$ has how many terms in its expansion?" answer=7 explain="$n + 1 = 7$. The exponents on $b$ go from $0$ to $n$, giving $n + 1$ different terms.":::

:::widget type=numeric-input prompt="What is $(1 + 1)^4$ — by the binomial theorem, the row-4 sum?" answer=16 explain="$\\sum \\binom{4}{k} \\cdot 1^{4-k} \\cdot 1^k = \\sum \\binom{4}{k} = 1 + 4 + 6 + 4 + 1 = 16 = 2^4$. The row-sum identity from Lesson 04 is the binomial theorem at $a = b = 1$.":::

:::widget type=numeric-input prompt="What is $1.01^3$ approximately? (Use $(1 + 0.01)^3 \\approx 1 + 3 \\cdot 0.01 = ?$. Type the decimal — to 3 places.)" answer=1.030 tolerance=0.001 explain="By binomial: $1 + 3 \\cdot 0.01 + 3 \\cdot 0.0001 + 0.000001 \\approx 1.030301$. The first two terms give $1.030$ — accurate enough for most mental estimates.":::

:::widget type=step-revealer
{
  "title": "Why does $(a + b)^n$ have coefficients $\\binom{n}{k}$?",
  "steps": [
    {"prose": "Write out $(a + b)^n$ as $n$ factors of $(a + b)$:"},
    {"math": "(a + b)^n = (a + b)(a + b)(a + b) \\cdots (a + b) \\quad [n \\text{ factors}]", "prose": "Now imagine fully distributing this product. Each term in the expansion comes from picking either $a$ or $b$ from **each** of the $n$ factors."},
    {"prose": "There are $2^n$ such picking sequences (Lesson 00's multiplication principle), one for each binary string of length $n$."},
    {"prose": "Group them by the **number of $b$'s** picked. A pick with $k$ b's and $n - k$ a's contributes a term $a^{n-k} b^k$ — same monomial regardless of which $k$ factors gave the b's."},
    {"math": "\\text{count of picks with } k \\text{ b's} = \\binom{n}{k}", "prose": "Choosing which $k$ of the $n$ factors to grab a $b$ from is exactly the combinations problem from Lesson 03."},
    {"math": "(a + b)^n = \\sum_{k=0}^n \\binom{n}{k} \\, a^{n-k} \\, b^k", "prose": "**Binomial theorem**, derived from first principles using only the multiplication principle and the meaning of $\\binom{n}{k}$."}
  ]
}
:::

Watch the same Pascal triangle from Lesson 04 — but this time
notice that **row $n$ gives the coefficients of $(a + b)^n$**:

:::widget type=pascal-triangle rows=8:::

So $(a + b)^7$ expands with coefficients $1, 7, 21, 35, 35, 21, 7, 1$
— row $7$.

## Symbolic

The binomial theorem:

$$
(a + b)^n = \sum_{k=0}^n \binom{n}{k} \, a^{n-k} \, b^k = a^n + n a^{n-1} b + \binom{n}{2} a^{n-2} b^2 + \ldots + n a b^{n-1} + b^n.
$$

Three special cases worth remembering:

**At $a = b = 1$**: $(1 + 1)^n = 2^n = \sum_k \binom{n}{k}$ — the
row-sum identity.

**At $a = 1, b = -1$**: $(1 - 1)^n = 0 = \sum_k (-1)^k \binom{n}{k}$
for $n \ge 1$ — the **alternating-sum identity**. This says:

$$
\binom{n}{0} - \binom{n}{1} + \binom{n}{2} - \binom{n}{3} + \ldots = 0.
$$

**At $a = 1, b = x$** (where $x$ is a small number): $(1 + x)^n
\approx 1 + nx$ when $x$ is small — drops higher-order terms. This is
the basis of "linearisation" in calculus and finance. We saw this in
Lesson 06 of Strand 1 Intermediate (rule of 70 for doubling time).

There's also a generalisation for **more than two terms** — the
**multinomial theorem**:

$$
(a_1 + a_2 + \ldots + a_r)^n = \sum_{k_1 + k_2 + \ldots + k_r = n} \binom{n}{k_1, k_2, \ldots, k_r} a_1^{k_1} a_2^{k_2} \cdots a_r^{k_r},
$$

where the **multinomial coefficient** $\binom{n}{k_1, \ldots, k_r}
= \dfrac{n!}{k_1! k_2! \cdots k_r!}$. This handles trinomial,
quadrinomial, and beyond. We won't use it heavily at Foundation
level, but Strand 5 Intermediate will.

## Computational

Symbolic expansion in SymPy:

```python
from sympy import expand, symbols
a, b = symbols("a b")

print(expand((a + b) ** 4))
# a**4 + 4*a**3*b + 6*a**2*b**2 + 4*a*b**3 + b**4

print(expand((a + b) ** 6))
# a**6 + 6*a**5*b + 15*a**4*b**2 + 20*a**3*b**3 + 15*a**2*b**4 + 6*a*b**5 + b**6
```

Reading off coefficients:

```python
import math

def binomial_coefficient(n, k):
    return math.comb(n, k)

def binomial_expansion(n):
    """Coefficients of (a + b)^n, in order from a^n down to b^n."""
    return [binomial_coefficient(n, k) for k in range(n + 1)]

print(binomial_expansion(0))   # [1]
print(binomial_expansion(4))   # [1, 4, 6, 4, 1]
print(binomial_expansion(7))   # [1, 7, 21, 35, 35, 21, 7, 1]
```

Numerical use — small-$x$ approximation:

```python
def small_x_approximation(n, x):
    return 1 + n * x

print(small_x_approximation(3, 0.01))   # 1.03
print((1 + 0.01) ** 3)                   # 1.030301 — slightly more
```

The approximation drops $\binom{n}{2} x^2 + \ldots$ — fine when $x$ is
small. For $x = 0.01$, $n = 3$, the dropped $\binom{3}{2} \cdot
0.01^2 = 3 \cdot 10^{-4}$ is tiny.

## Derivational

The StepRevealer above gave the combinatorial proof. Here it is
restated cleanly:

When you fully distribute $(a + b)^n = (a + b)(a + b) \cdots (a + b)$,
each term in the expansion picks one summand ($a$ or $b$) from each
of the $n$ factors. There are $2^n$ such picking sequences.

Each picking sequence with $k$ $b$'s contributes the monomial $a^{n-k}
b^k$. The number of picking sequences with **exactly** $k$ $b$'s is
the number of ways to choose which $k$ of the $n$ factors gave a $b$:
$\binom{n}{k}$.

Summing all picking sequences, grouped by their $b$-count:

$$
(a + b)^n = \sum_{k=0}^n \binom{n}{k} a^{n-k} b^k.
$$

The same logic gives **inductive** proofs (multiply $(a + b)^n$ by
$(a + b)$ and use Pascal's identity to combine terms), but the
combinatorial proof is the cleanest — it shows *why* the coefficients
are binomial coefficients, not just that they happen to be.

## Connective

The binomial theorem connects deep:

- **Lesson 04 (Pascal's triangle)**: the $n$th row is exactly the
  coefficients of $(a + b)^n$. The triangle is the binomial theorem
  written out.
- **Probability** (Strand 6 Intermediate): the **binomial
  distribution** is $P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$ — the
  probability of $k$ successes in $n$ independent trials with
  success probability $p$. The $\binom{n}{k}$ factor is here for the
  same combinatorial reason — choosing **which** $k$ trials succeed.
- **Calculus** (Strand 4): Newton's binomial series generalises the
  theorem to **fractional and negative exponents**, e.g. $(1 + x)^{1/2}
  = 1 + \tfrac{1}{2} x - \tfrac{1}{8} x^2 + \ldots$. Coefficients become
  generalised binomial coefficients. This is one of the founding
  results of calculus.
- **Algebra**: every polynomial expansion of two-term powers is the
  binomial theorem. CAS tools rely on it constantly.

## Applied

- **Compound interest approximation**: investing at rate $r$ for $n$
  years grows $\$1$ to $(1 + r)^n$. For small $r$:
  $(1 + r)^n \approx 1 + n r + \binom{n}{2} r^2 + \ldots$. The first
  two terms — "principal plus simple interest" — capture most of
  the growth for small $n \cdot r$. Higher-order terms become
  important as $n$ grows or $r$ rises.
- **Binomial probability in games**: a player has $5$ attacks each
  with $20\%$ crit chance. $P(\text{exactly 2 crits}) = \binom{5}{2}
  (0.2)^2 (0.8)^3 = 10 \cdot 0.04 \cdot 0.512 = 0.2048$. About $20\%$.
- **Polynomial multiplication in code**: the FFT-based polynomial
  multiplication (Strand 9 Master) avoids the naive
  $O(n \log n)$-vs-$O(n^2)$ trade-off and is built on top of
  binomial-theorem-style coefficient combinatorics.
- **Hashing**: probability that $k$ specific hashes collide in a
  table of size $m$ — uses binomial probability for collision
  analysis. The "birthday paradox" hash analogue.
- **Galton board**: a physical demonstration of the binomial
  distribution. Balls drop through pegs, each peg deflecting them
  left or right with $50\%$ probability. The bins fill up in a
  bell-curve pattern that matches $\binom{n}{k} / 2^n$.

## Check Your Understanding

:::widget type=numeric-input prompt="Coefficient of $a^4 b^2$ in $(a + b)^6$?" answer=15 explain="$\\binom{6}{2} = 15$. Pascal row 6: $1, 6, 15, 20, 15, 6, 1$.":::

:::widget type=numeric-input prompt="Sum of coefficients in $(a + b)^5$ — i.e., evaluate $(1 + 1)^5$." answer=32 explain="$2^5 = 32$. Setting $a = b = 1$ in the expansion gives the row sum.":::

:::widget type=numeric-input prompt="$\\binom{4}{0} - \\binom{4}{1} + \\binom{4}{2} - \\binom{4}{3} + \\binom{4}{4} = ?$ (Use the alternating-sum identity.)" answer=0 explain="Setting $a = 1, b = -1$ in the binomial theorem: $(1 - 1)^4 = 0$. The alternating sum vanishes for $n \\ge 1$.":::

:::widget type=numeric-input prompt="A coin is flipped $4$ times. Number of outcomes with exactly $2$ heads: $\\binom{4}{2} = ?$" answer=6 explain="The binomial coefficient $\\binom{4}{2} = 6$. The 6 sequences: HHTT, HTHT, HTTH, THHT, THTH, TTHH.":::
