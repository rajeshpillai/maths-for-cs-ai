---
strand: pattern-counting
level: intermediate
order: 3
title: Solving Linear Recurrences
prerequisites:
  - tier: strand-5-pattern-counting-intermediate
    slug: 02-generating-functions
    description: Generating functions
connections:
  - strand-5-pattern-counting-foundation/08-fibonacci-and-recursion
applications:
  - cs: "Algorithm complexity (master theorem), DP analysis"
  - business: "Growth model projections, financial recurrences"
  - games: "Procedural-generation patterns, AI behaviour-tree counts"
  - life: "Population models, compound interest with deposits"
---

# Solving Linear Recurrences

## Explain Like I Am 7

A recurrence is a recipe like "today's cookies = yesterday's cookies
plus the day-before's cookies."  To find the cookie count on day
$100$ without baking through every single day in between, you guess
that the answer grows like some number $r$ raised to the day,
$r^n$.  Plug that guess in and the recipe collapses into a tiny
algebra puzzle whose answers are special numbers (for Fibonacci, the
golden ratio).  Then you mix those special numbers in just the right
amounts so day-zero and day-one match — and you can leap straight to
day $100$.

## Mental

Foundation Lesson 08 introduced recurrences via Fibonacci. Solving a
recurrence means finding a **closed form** — a formula that gives
$a_n$ directly without computing the previous terms.

A **linear recurrence with constant coefficients** has the form

$$
a_n = c_1 a_{n-1} + c_2 a_{n-2} + \ldots + c_k a_{n-k}.
$$

To solve, build the **characteristic polynomial**

$$
x^k = c_1 x^{k-1} + c_2 x^{k-2} + \ldots + c_k,
$$

equivalently $x^k - c_1 x^{k-1} - \ldots - c_k = 0$.

The roots $r_1, r_2, \ldots, r_k$ (assumed distinct for now) give the
general solution

$$
a_n = \alpha_1 r_1^n + \alpha_2 r_2^n + \ldots + \alpha_k r_k^n,
$$

where $\alpha_i$ are constants determined by initial conditions.

## Fibonacci closed form

For Fibonacci ($a_n = a_{n-1} + a_{n-2}$), the characteristic equation
is $x^2 - x - 1 = 0$. Roots:

$$
\varphi = \frac{1 + \sqrt 5}{2}, \quad \psi = \frac{1 - \sqrt 5}{2}.
$$

$\varphi$ is the **golden ratio** $\approx 1.618$.

General solution: $F_n = \alpha \varphi^n + \beta \psi^n$. Plug in
$F_0 = 0, F_1 = 1$ to solve $\alpha + \beta = 0$, $\alpha \varphi +
\beta \psi = 1$, giving $\alpha = \frac{1}{\sqrt 5}, \beta = -\frac{1}{\sqrt
5}$.

$$
F_n = \frac{\varphi^n - \psi^n}{\sqrt 5}.
$$

This is **Binet's formula** — the closed form Foundation Lesson 08
quoted but didn't derive.

## Interactive

:::widget type=numeric-input prompt="A sequence satisfies $a_n = 2 a_{n-1}$ with $a_0 = 5$. Closed form: $a_n = ?$ Type the value of $a_5$." answer=160 explain="$a_n = 5 \\cdot 2^n$. $a_5 = 5 \\cdot 32 = 160$.":::

:::widget type=numeric-input prompt="Solve $a_n = 3 a_{n-1} - 2 a_{n-2}$ with $a_0 = 1, a_1 = 4$. The characteristic equation $x^2 - 3x + 2 = 0$ has roots...?" answer=2 explain="Factor: $(x-1)(x-2) = 0$, roots $1$ and $2$. Type either; **2** is the larger.":::

:::widget type=numeric-input prompt="Continuing: with roots $1, 2$, the closed form is $a_n = A + B \\cdot 2^n$. Initial conditions give $A + B = 1$, $A + 2B = 4$, so $B = 3, A = -2$. What is $a_4$? (Compute $-2 + 3 \\cdot 16$.)" answer=46 explain="$a_4 = -2 + 48 = 46$. Verify: $a_2 = 3 \\cdot 4 - 2 \\cdot 1 = 10$, $a_3 = 3 \\cdot 10 - 2 \\cdot 4 = 22$, $a_4 = 3 \\cdot 22 - 2 \\cdot 10 = 46$. ✓":::

## Symbolic

For a $k$-th-order linear homogeneous recurrence $a_n = c_1 a_{n-1}
+ \ldots + c_k a_{n-k}$:

1. **Characteristic equation**: $x^k = c_1 x^{k-1} + \ldots + c_k$.
2. **Find roots** $r_1, \ldots, r_k$.
3. If roots are **distinct**: $a_n = \sum \alpha_i r_i^n$.
4. If a root $r$ has **multiplicity $m$**: contribute $\alpha_0 r^n
   + \alpha_1 n r^n + \alpha_2 n^2 r^n + \ldots + \alpha_{m-1}
   n^{m-1} r^n$.
5. Solve for $\alpha_i$ using initial conditions.

For **non-homogeneous** recurrences (with a forcing term), find a
particular solution and add to the general homogeneous solution.

## Computational

```python
import numpy as np

def solve_linear_recurrence(coeffs, initial, n_terms):
    """coeffs: [c_1, c_2, ..., c_k] for a_n = c_1 a_{n-1} + ...
       initial: [a_0, a_1, ..., a_{k-1}]
       Returns first n_terms of the sequence."""
    k = len(coeffs)
    seq = list(initial)
    for n in range(k, n_terms):
        seq.append(sum(coeffs[i] * seq[n - 1 - i] for i in range(k)))
    return seq

# Fibonacci
print(solve_linear_recurrence([1, 1], [0, 1], 10))
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# Binet's formula
def binet(n):
    phi = (1 + 5 ** 0.5) / 2
    psi = (1 - 5 ** 0.5) / 2
    return round((phi ** n - psi ** n) / 5 ** 0.5)

print([binet(n) for n in range(10)])
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

## Applied

- **Algorithm complexity**: many divide-and-conquer recurrences (e.g.
  $T(n) = 2 T(n/2) + n$) get solved by the master theorem — special-
  case characteristic-equation reasoning.
- **Compound interest with deposits**: $A_n = (1+r) A_{n-1} + d$ has
  closed form $A_n = (1+r)^n A_0 + d \cdot \tfrac{(1+r)^n - 1}{r}$
  (geometric series).
- **Population dynamics**: linear models of birth/death rates produce
  exponential closed-form solutions.

## Check Your Understanding

:::widget type=numeric-input prompt="Roots of $x^2 - 5x + 6 = 0$? Type the larger." answer=3 explain="$(x - 2)(x - 3) = 0$. Roots $2, 3$.":::

:::widget type=numeric-input prompt="$a_n = 4 a_{n-1} - 4 a_{n-2}$ with $a_0 = 1, a_1 = 2$. Characteristic eqn has root $2$ with multiplicity $2$. Closed form is $a_n = (\\alpha + \\beta n) 2^n$. With $\\alpha = 1, \\beta = 0$, what is $a_3$?" answer=8 explain="$a_3 = (1 + 0) \\cdot 8 = 8$. (Verify: $a_2 = 4 \\cdot 2 - 4 \\cdot 1 = 4$, $a_3 = 4 \\cdot 4 - 4 \\cdot 2 = 8$.) ✓":::

:::widget type=numeric-input prompt="What is the value of the golden ratio $\\varphi = (1 + \\sqrt 5)/2$? Round to 4 decimals." answer=1.6180 tolerance=0.0005 explain="$\\sqrt 5 \\approx 2.236$. $\\varphi \\approx 3.236/2 \\approx 1.618$.":::

:::widget type=numeric-input prompt="Use Binet's formula: $F_{10}$ via $\\varphi^{10}/\\sqrt 5$ rounded?" answer=55 explain="$F_{10} = 55$ exactly (Foundation Lesson 08 verified).":::
