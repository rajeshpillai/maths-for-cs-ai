---
strand: change
level: intermediate
order: 7
title: Taylor Series
prerequisites:
  - tier: strand-4-change-intermediate
    slug: 06-improper-integrals
    description: Improper integrals
connections:
  - strand-4-change-intermediate/08-power-series
applications:
  - cs: "Function approximation, transcendental computation in libm"
  - life: "Approximating any smooth function by polynomials"
---

# Taylor Series

## Mental

A **Taylor series** approximates a smooth function $f(x)$ near a
point $a$ by matching $f$, $f'$, $f''$, $f'''$, ... at $a$.

The recipe: write a polynomial whose value, slope, curvature, and
higher derivatives all agree with $f$'s at $x = a$.

$$
f(x) \approx f(a) + f'(a)(x - a) + \frac{f''(a)}{2!}(x - a)^2 + \frac{f'''(a)}{3!}(x - a)^3 + \ldots
$$

Centred at $a = 0$, this is the **Maclaurin series**:

$$
f(x) \approx f(0) + f'(0) x + \frac{f''(0)}{2!} x^2 + \ldots
$$

## Why factorials?

The $k$-th term must contribute *only* to the $k$-th derivative at $a$
(all lower derivatives are zero at $a$). The $k$-th derivative of
$x^k$ is $k!$, so we divide by $k!$ to get back to coefficient $1$.

## Famous Maclaurin series

| Function | Series |
|---|---|
| $e^x$ | $\sum_{n=0}^\infty \frac{x^n}{n!} = 1 + x + \frac{x^2}{2} + \frac{x^3}{6} + \ldots$ |
| $\sin x$ | $x - \frac{x^3}{6} + \frac{x^5}{120} - \ldots$ |
| $\cos x$ | $1 - \frac{x^2}{2} + \frac{x^4}{24} - \ldots$ |
| $\frac{1}{1-x}$ | $1 + x + x^2 + x^3 + \ldots$ ($|x| < 1$) |
| $\ln(1+x)$ | $x - \frac{x^2}{2} + \frac{x^3}{3} - \ldots$ ($|x| < 1$) |

## Worked example: $e^x$ at $x = 0$

$f(x) = e^x$, so $f^{(k)}(x) = e^x$, and $f^{(k)}(0) = 1$ for every $k$.

$$
e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \ldots
$$

At $x = 1$ this gives $e = 1 + 1 + 1/2 + 1/6 + 1/24 + \ldots \approx 2.7083$
after five terms. Add more for more precision.

## Interactive

:::widget type=numeric-input prompt="$e^x \\approx 1 + x + x^2/2 + x^3/6 + x^4/24$. At $x = 1$, sum first five terms: $1 + 1 + 0.5 + 0.1667 + 0.0417 = ?$. Round 4 dp." answer=2.7083 tolerance=0.005 explain="$2.7083$, close to $e \\approx 2.7183$.":::

:::widget type=numeric-input prompt="$\\sin(0.5) \\approx 0.5 - 0.5^3/6 = 0.5 - 0.02083 = ?$. Round 4 dp." answer=0.4792 tolerance=0.005 explain="$0.4792$, close to actual $\\sin 0.5 \\approx 0.4794$.":::

:::widget type=numeric-input prompt="$\\cos(0.1) \\approx 1 - 0.01/2 = 1 - 0.005 = ?$. Round 4 dp." answer=0.995 tolerance=0.005 explain="$0.995$, very close to actual $\\cos 0.1 \\approx 0.995$.":::

:::widget type=numeric-input prompt="Geometric series $\\frac{1}{1-x} = 1 + x + x^2 + \\ldots$ At $x = 0.5$: $1 + 0.5 + 0.25 + 0.125 + ... = \\frac{1}{1-0.5} = ?$" answer=2 explain="$2$.":::

## Symbolic

**Taylor's theorem with remainder**: for $f$ smooth on an interval
containing $a$ and $x$,

$$
f(x) = \sum_{k=0}^n \frac{f^{(k)}(a)}{k!}(x - a)^k + R_n(x),
$$

where the **Lagrange remainder** is
$R_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!}(x - a)^{n+1}$ for some $\xi$
between $a$ and $x$. Bounding $|R_n|$ tells you how good the
approximation is.

**Radius of convergence**: each Taylor series converges in some
interval $|x - a| < R$ around $a$. For $e^x$, $\sin x$, $\cos x$:
$R = \infty$ — converges everywhere. For $1/(1-x)$ centred at $0$:
$R = 1$ — diverges outside $|x| < 1$.

## Computational

```python
import sympy as sp

x = sp.symbols("x")

# Taylor series at x = 0, up to order 6
print(sp.series(sp.exp(x),  x, 0, 6))    # 1 + x + x²/2 + x³/6 + ...
print(sp.series(sp.sin(x),  x, 0, 8))    # x - x³/6 + x⁵/120 - ...
print(sp.series(sp.cos(x),  x, 0, 8))    # 1 - x²/2 + x⁴/24 - ...
print(sp.series(1/(1 - x), x, 0, 6))     # 1 + x + x² + x³ + ...

# Numeric approximation: e^1 from 5 terms
import math
approx = sum(1 / math.factorial(k) for k in range(5))
print(approx, math.exp(1))               # 2.7083, 2.7183
```

## Applied

- **`math.exp` / `math.sin` in libm** — internally uses range-reduced
  Taylor or minimax polynomial approximations.
- **Float square-root**: many implementations use the Maclaurin series
  for $\sqrt{1 + x}$ as a refinement step.
- **Physics — small-angle approximation**: $\sin\theta \approx \theta$
  and $\cos\theta \approx 1 - \theta^2/2$ are just the first Taylor terms.
- **Numerical solvers**: Newton's method, Runge-Kutta, finite differences
  all rest on Taylor expansion.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\sin x = x - x^3/6 + ...$ Coefficient of $x^3$ is $-1/6 \\approx -0.1667$. Round 4 dp." answer=-0.1667 tolerance=0.005 explain="$-1/6$.":::

:::widget type=numeric-input prompt="$e^{0.1} \\approx 1 + 0.1 + 0.005 = 1.105$. Round 4 dp." answer=1.105 tolerance=0.005 explain="Very close to $e^{0.1} \\approx 1.1052$.":::

:::widget type=numeric-input prompt="Radius of convergence for $1/(1-x)$ centred at 0?" answer=1 explain="$R = 1$ — diverges past $|x| = 1$.":::

:::widget type=numeric-input prompt="The 5th derivative of $\\sin x$ at $x = 0$? ($\\sin, \\cos, -\\sin, -\\cos, \\sin$ — at 0 these are 0, 1, 0, -1, 0)" answer=1 explain="$\\sin^{(5)}(0) = \\cos 0 = 1$.":::
