---
strand: computation
level: foundation
order: 8
title: Numerical Integration
prerequisites:
  - tier: strand-7-computation-foundation
    slug: 07-newton-method
    description: Newton's method
connections:
  - strand-7-computation-foundation/09-computation-capstone
applications:
  - cs: "Physics simulation, statistics expectations, ODE solvers"
  - life: "When you can't integrate symbolically, integrate numerically"
---

# Numerical Integration

## Explain Like I Am 7

You want to know the area of a wobbly puddle on the pavement.  You
can't measure it directly with a ruler, so you cover the puddle with a
stack of skinny rectangle stickers and add up their areas.  Make the
stickers thinner and the answer gets closer to the true area.
Sometimes you tilt the top of each sticker to follow the puddle's edge
(those are called *trapezoid* stickers) and you get a great estimate
even faster.  That's **numerical integration** — counting up tiny
rectangles when no neat formula will do.

## Mental

Sometimes the antiderivative of $f$ has no closed form (e.g.,
$\int e^{-x^2} dx$). Or the integrand is given as data, not a
formula. **Numerical integration** approximates $\int_a^b f(x) dx$
using only function values $f(x_i)$ at sample points.

The simplest idea: **divide $[a, b]$ into $n$ equal pieces, sum the
areas of simple shapes**.

## The trapezoidal rule

Approximate the area under $f$ over $[x_i, x_{i+1}]$ as a trapezoid:

$$
\int_{x_i}^{x_{i+1}} f \, dx \approx \frac{f(x_i) + f(x_{i+1})}{2} \cdot h, \qquad h = x_{i+1} - x_i.
$$

Total over the interval:

$$
T_n = \frac{h}{2}\left[f(x_0) + 2 f(x_1) + 2 f(x_2) + \ldots + 2 f(x_{n-1}) + f(x_n)\right].
$$

**Error**: $O(h^2)$ — halving $h$ cuts error by 4.

## Worked example: $\int_0^1 x^2 dx = 1/3$

Take $n = 4$, $h = 0.25$. Sample points $x = 0, 0.25, 0.5, 0.75, 1$.
$f$ values $= 0, 0.0625, 0.25, 0.5625, 1$.

$$
T_4 = \frac{0.25}{2}\left[0 + 2(0.0625) + 2(0.25) + 2(0.5625) + 1\right] = 0.125 \cdot 2.75 = 0.34375.
$$

Exact answer is $1/3 \approx 0.3333$. Error $\approx 0.01$ — close but
not exact.

## Simpson's rule

Use parabolic arcs through three consecutive points. For even $n$:

$$
S_n = \frac{h}{3}\left[f(x_0) + 4 f(x_1) + 2 f(x_2) + 4 f(x_3) + \ldots + 4 f(x_{n-1}) + f(x_n)\right].
$$

**Error**: $O(h^4)$ — halving $h$ cuts error by 16. Much faster
convergence than trapezoid.

For $\int_0^1 x^2 dx$ with $n = 4$:

$S_4 = \frac{0.25}{3}\left[0 + 4(0.0625) + 2(0.25) + 4(0.5625) + 1\right] = \frac{0.25}{3} \cdot 4 = \frac{1}{3}$.

**Exact** — because Simpson is exact for polynomials of degree $\le 3$.

## Interactive

:::widget type=numeric-input prompt="Trapezoidal rule for $\\int_0^2 x^2 dx$ with $n = 2$ ($h = 1$): $\\frac{1}{2}[0 + 2(1) + 4] = ?$" answer=3 explain="$3$. Exact answer is $8/3 \\approx 2.667$, error $\\sim 0.33$.":::

:::widget type=numeric-input prompt="Same with $n = 4$ ($h = 0.5$): $\\frac{0.5}{2}[0 + 2(0.25) + 2(1) + 2(2.25) + 4] = 0.25 \\cdot 11 = ?$" answer=2.75 explain="$2.75$. Closer to $8/3 \\approx 2.667$.":::

:::widget type=numeric-input prompt="Trapezoidal rule has error $O(h^?)$" answer=2 explain="$O(h^2)$.":::

:::widget type=numeric-input prompt="Simpson's rule has error $O(h^?)$" answer=4 explain="$O(h^4)$.":::

## Symbolic

**Why Simpson is so much better**: trapezoid fits a *linear*
interpolant on each subinterval; Simpson fits a *quadratic*. Higher
degree → higher accuracy on smooth functions.

**Composite vs adaptive rules**: composite rules use uniform
spacing; adaptive rules subdivide more finely where $f$ changes
rapidly, less where $f$ is flat.

**Gauss-Legendre quadrature**: places sample points $x_i$ and
weights $w_i$ optimally — for $n$ points achieves accuracy
*exact for polynomials of degree $2n - 1$*. Used in finite-element
solvers, physics simulations.

**Monte Carlo integration**: for high-dimensional integrals,
random sampling beats grids. Error scales as $O(N^{-1/2})$
*regardless of dimension* — beats $O(h^k) = O(N^{-k/d})$ in $d$
dimensions for large $d$. Used in physics, ML, finance.

## Computational

```python
def trapezoid(f, a, b, n):
    h = (b - a) / n
    return h * (f(a) / 2 + sum(f(a + i*h) for i in range(1, n)) + f(b) / 2)

def simpson(f, a, b, n):
    if n % 2: n += 1                         # require even n
    h = (b - a) / n
    s = f(a) + f(b)
    for i in range(1, n):
        s += (4 if i % 2 else 2) * f(a + i*h)
    return s * h / 3

import math

# Compare on a smooth function
print(trapezoid(lambda x: x*x, 0, 1, 100))    # ~0.33335
print(simpson(lambda x: x*x, 0, 1, 100))      # 0.3333... — exact for x²

# Gaussian integral
print(simpson(lambda x: math.exp(-x*x), -5, 5, 100))   # ~1.7725 ~ √π

# Monte Carlo for π via integral of unit half-disk
import random
def mc_pi(N):
    inside = sum(1 for _ in range(N)
                 if random.random()**2 + random.random()**2 <= 1)
    return 4 * inside / N

print(mc_pi(100_000))                         # ~3.14
```

## Applied

- **Physics simulations** — every step of an ODE solver computes a
  numerical integral.
- **Statistics** — expectations $\mathbb{E}[g(X)]$ for continuous
  distributions are integrals; quadrature handles them when no
  closed form exists.
- **Computer graphics** — rendering equations integrate light over
  surfaces; Monte Carlo path-tracing samples millions of light paths.
- **Finance** — option-pricing PDEs and Monte Carlo simulations of
  asset prices.
- **Machine learning** — Bayesian inference computes posterior
  integrals; variational inference and MCMC are the standard
  numerical-integration tools.

## Check Your Understanding

:::widget type=numeric-input prompt="Trapezoid error scales as $O(h^2)$. Simpson as $O(h^4)$. Halving $h$, Simpson improves by what factor?" answer=16 explain="$2^4 = 16$.":::

:::widget type=numeric-input prompt="Simpson is exact for cubic (degree 3) polynomials. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Monte Carlo error scales as $O(N^{-1/2})$. To halve the error, multiply $N$ by what factor?" answer=4 explain="$N \\to 4N$ to halve error.":::

:::widget type=numeric-input prompt="Gauss-Legendre with $n$ points is exact for polynomials of degree $\\le 2n - 1$. For $n = 4$: degree?" answer=7 explain="$2 \\cdot 4 - 1 = 7$.":::
