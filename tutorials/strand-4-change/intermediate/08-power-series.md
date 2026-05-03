---
strand: change
level: intermediate
order: 8
title: Power Series and Convergence
prerequisites:
  - tier: strand-4-change-intermediate
    slug: 07-taylor-series
    description: Taylor series
connections:
  - strand-4-change-intermediate/09-change-capstone
applications:
  - cs: "Generating functions in algorithms, automatic differentiation"
  - life: "When does an infinite polynomial make sense?"
---

# Power Series and Convergence

## Mental

A **power series** is an infinite polynomial:

$$
\sum_{n=0}^\infty c_n (x - a)^n = c_0 + c_1 (x - a) + c_2 (x - a)^2 + \ldots
$$

Centred at $a$, with coefficients $c_n$. Taylor series are a
special case where $c_n = f^{(n)}(a) / n!$.

The first question for any power series: **for which $x$ does the
sum converge to a finite value?**

## Radius of convergence

For each power series there is an $R \in [0, \infty]$ — the
**radius of convergence** — such that the series:

- **Converges** for $|x - a| < R$.
- **Diverges** for $|x - a| > R$.
- **Behaviour at $|x - a| = R$ varies.**

Compute $R$ by the **ratio test**:

$$
\lim_{n \to \infty} \left| \frac{c_{n+1}}{c_n} \right| \cdot |x - a| < 1.
$$

Solving for $|x - a|$ gives $R$. Equivalently
$R = \lim |c_n / c_{n+1}|$ when the limit exists.

## Worked example: $\sum \frac{x^n}{n!}$

$\frac{c_{n+1}}{c_n} = \frac{n!}{(n+1)!} = \frac{1}{n+1} \to 0$.

So $\frac{|x|}{n+1} \to 0 < 1$ for **every $x$**. $R = \infty$.
The series for $e^x$ converges everywhere.

## Worked example 2: $\sum x^n$

$c_n = 1$, so $\frac{c_{n+1}}{c_n} = 1$. Ratio test: $|x| < 1$.
$R = 1$. Diverges past $|x| = 1$. Inside, sums to $\frac{1}{1 - x}$.

## Interactive

:::widget type=numeric-input prompt="Geometric series $\\sum x^n$. Radius $R = ?$" answer=1 explain="$1$.":::

:::widget type=numeric-input prompt="$\\sum x^n / n!$ — series for $e^x$. Radius $R = ?$ Type 0 if infinite, otherwise the value." answer=0 explain="$R = \\infty$. Type 0 to indicate.":::

:::widget type=numeric-input prompt="$\\sum n! \\cdot x^n$. Ratio $|c_{n+1}/c_n| \\cdot |x| = (n+1)|x| \\to \\infty$ unless $x = 0$. So $R = ?$" answer=0 explain="$R = 0$ — converges only at $x = 0$.":::

:::widget type=numeric-input prompt="$\\sum \\frac{x^n}{n^2}$. Ratio $\\frac{n^2}{(n+1)^2} |x| \\to |x|$. So $R = ?$" answer=1 explain="$1$.":::

## Symbolic

**Term-by-term differentiation and integration**: inside the radius
of convergence, you can differentiate or integrate a power series
term by term:

$$
f(x) = \sum c_n (x - a)^n \implies f'(x) = \sum n c_n (x - a)^{n-1}.
$$

$$
\int f(x) dx = C + \sum \frac{c_n}{n+1} (x - a)^{n+1}.
$$

The radius of convergence is unchanged; the boundary may shift.

**Operations on power series**: addition, multiplication (Cauchy
product), substitution of one series into another. All formal
operations on polynomials extend to convergent power series.

## Computational

```python
import sympy as sp

x = sp.symbols("x")

# Series and their radii
series_exp = sp.exp(x).series(x, 0, 10).removeO()
print(series_exp)                                # poly approximation

# Verify R for sum 1/n^2 * x^n at boundary x = 1: zeta(2) = pi^2/6
total = sum(sp.Rational(1, n**2) for n in range(1, 1000))
print(float(total), float(sp.pi**2 / 6))         # ~1.6449

# Term-by-term differentiation
print(sp.diff(series_exp, x))                    # also converges to e^x
```

## Applied

- **Generating functions** in combinatorics: encode counting
  sequences as $\sum a_n x^n$. Algebraic operations on the series
  reflect combinatorial operations on the sequences.
- **Automatic differentiation (forward mode)**: works by carrying
  along truncated power series — "dual numbers" are the degree-1
  case.
- **Solving ODEs**: many ODEs are solved by *power-series solutions*
  (e.g., Bessel functions, Legendre polynomials).
- **Singular perturbation**: physics expansions in a small parameter
  $\epsilon$ are power series in $\epsilon$.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\sum \\frac{(x-2)^n}{3^n}$ — geometric ratio $1/3 \\cdot |x - 2| < 1$ gives $|x-2| < 3$. So $R = ?$" answer=3 explain="$R = 3$.":::

:::widget type=numeric-input prompt="A series with $c_n = 1/n!$ has $R = \\infty$. Converges for all $x$? Type 1." answer=1 explain="Yes — converges everywhere.":::

:::widget type=numeric-input prompt="Differentiate $\\sum_{n=0}^\\infty x^n = \\frac{1}{1-x}$ term-by-term to get $\\sum n x^{n-1} = \\frac{1}{(1-x)^2}$. At $x = 0$ both sides equal $1$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\zeta(2) = \\sum 1/n^2 = \\pi^2/6 \\approx 1.6449$. Type to 4 dp." answer=1.6449 tolerance=0.005 explain="$\\pi^2/6 \\approx 1.6449$ — Basel problem.":::
