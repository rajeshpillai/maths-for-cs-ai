---
strand: change
level: foundation
order: 6
title: Riemann Sums and the Definite Integral
prerequisites:
  - tier: strand-4-change-foundation
    slug: 01-limits-intuitively
    description: Limits
connections:
  - strand-4-change-foundation/07-antiderivatives
applications:
  - cs: "Numerical integration in ML, physics simulations"
  - business: "Total revenue from a price-time function"
  - games: "Total damage over time, area under curves"
  - life: "Distance from velocity, total rainfall from rate"
---

# Riemann Sums and the Definite Integral

## Explain Like I Am 7

Imagine a wiggly hilltop drawn on graph paper.  How much *area* is
trapped under that wiggle?  Try this: cover the area with skinny
upright rectangles, all the same width.  Add their tiny areas up
— that's a rough guess.  Now make the rectangles thinner and use
more of them; your guess gets better.  Keep shrinking forever, and
the guess settles onto the *exact* area.  That settling-down number
is the **definite integral** — area, summed up one slice at a time.

## Mental

The **definite integral** of a function $f$ over an interval $[a, b]$
is, intuitively, the **area under the curve** of $f$ between $a$ and
$b$. (If $f$ is negative, the area is signed — counted negatively.)

Notation:

$$
\int_a^b f(x) \, dx.
$$

To compute it, divide $[a, b]$ into $n$ thin strips and approximate
each strip's area by a rectangle. Then take the limit as $n \to
\infty$.

This is a **Riemann sum**:

$$
\int_a^b f(x) \, dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i^*) \, \Delta x,
$$

where $\Delta x = (b - a)/n$ and $x_i^*$ is some sample point in the
$i$-th strip.

## Worked example

Compute $\int_0^1 x^2 \, dx$ via Riemann sum.

Divide $[0, 1]$ into $n$ equal pieces: $\Delta x = 1/n$. Use right
endpoints: $x_i^* = i/n$.

$$
\sum_{i=1}^n \left(\frac{i}{n}\right)^2 \cdot \frac{1}{n} = \frac{1}{n^3} \sum_{i=1}^n i^2 = \frac{1}{n^3} \cdot \frac{n(n+1)(2n+1)}{6}.
$$

(Strand 5 Foundation Lesson 04 had this sum.)

As $n \to \infty$, this $\to \dfrac{1}{3}$. So:

$$
\int_0^1 x^2 \, dx = \frac{1}{3}.
$$

## Interactive

:::widget type=numeric-input prompt="Approximate $\\int_0^4 x \\, dx$ using $n = 4$ rectangles with right endpoints. Heights: $1, 2, 3, 4$. Width $= 1$. Sum?" answer=10 explain="$1 + 2 + 3 + 4 = 10$. (Exact answer: $\\int_0^4 x dx = 8$ — overestimate due to right endpoint.)":::

:::widget type=numeric-input prompt="Same $\\int_0^4 x \\, dx$ exact: $\\frac{1}{2} \\cdot 4 \\cdot 4 = 8$ (triangle area). Type 8." answer=8 explain="Triangle: base 4, height 4, area 8.":::

:::widget type=numeric-input prompt="$\\int_0^1 x^2 \\, dx$ — Riemann sums for large $n$ approach what?" answer=0.333 tolerance=0.01 explain="$1/3 \\approx 0.333$.":::

:::widget type=numeric-input prompt="A car travels at velocity $v(t) = 60$ km/h from $t = 0$ to $t = 2$ hours. Distance = $\\int_0^2 60 \\, dt = ?$" answer=120 explain="Constant velocity × time: $60 \\cdot 2 = 120$ km.":::

## Symbolic

The **definite integral**:

$$
\int_a^b f(x) \, dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i^*) \, \Delta x.
$$

For continuous $f$, this limit exists and is independent of the
choice of sample points (left, right, midpoint, etc.).

**Properties**:

- $\int_a^a f \, dx = 0$.
- $\int_a^b f \, dx = -\int_b^a f \, dx$.
- $\int_a^b (f + g) \, dx = \int_a^b f \, dx + \int_a^b g \, dx$.
- $\int_a^b c \cdot f \, dx = c \int_a^b f \, dx$.
- $\int_a^c f \, dx = \int_a^b f \, dx + \int_b^c f \, dx$.

The integral is **linear** like the derivative.

## Computational

```python
import scipy.integrate as si

# Numerical integration
def f(x):
    return x ** 2

print(si.quad(f, 0, 1))   # (0.333..., 3.7e-15) — value, error estimate

# Riemann sum manually
import numpy as np
def riemann(f, a, b, n=1000):
    x = np.linspace(a, b, n + 1)
    dx = (b - a) / n
    return sum(f(xi) * dx for xi in x[1:])  # right endpoints

print(riemann(lambda x: x**2, 0, 1, 100))    # 0.3383...
print(riemann(lambda x: x**2, 0, 1, 10000))  # 0.3334...
```

## Applied

- **Distance from velocity**: $\int_0^T v(t) \, dt$ = total distance.
- **Area under a probability density**: gives probability.
- **Total cost from marginal cost**: $\int_a^b C'(x) \, dx = C(b) -
  C(a)$.
- **Numerical integration in physics simulations**: ODE solvers
  (Strand 11) compute integrals one timestep at a time.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\int_1^3 4 \\, dx$ (constant function, area = base × height)?" answer=8 explain="$2 \\cdot 4 = 8$.":::

:::widget type=numeric-input prompt="$\\int_0^2 x \\, dx$ — triangle area?" answer=2 explain="$\\frac{1}{2} \\cdot 2 \\cdot 2 = 2$.":::

:::widget type=numeric-input prompt="$\\int_0^1 x^2 \\, dx$ exact?" answer=0.333 tolerance=0.01 explain="$1/3$.":::

:::widget type=numeric-input prompt="$\\int_0^2 x^2 \\, dx$ exact? (Use $\\frac{x^3}{3}$ — Lesson 07.)" answer=2.667 tolerance=0.01 explain="$8/3 \\approx 2.667$.":::
