---
strand: change
level: intermediate
order: 6
title: Improper Integrals
prerequisites:
  - tier: strand-4-change-intermediate
    slug: 05-partial-fractions
    description: Partial fractions
connections:
  - strand-4-change-intermediate/07-taylor-series
applications:
  - cs: "Probability density normalization, expected values"
  - life: "Areas extending to infinity"
---

# Improper Integrals

## Explain Like I Am 7

Pretend you're painting an infinite wall that gets thinner the
farther it goes.  Even though the wall never ends, the *paint* you
need might still be a finite amount, because the far parts are so
skinny they barely use any paint.  Or maybe the paint adds up to
infinity — depends on how fast the wall thins out.  An **improper
integral** is the careful way to add up areas of shapes that go
on forever (or shoot up infinitely tall) and decide whether the
total settles down or runs away.

## Mental

A definite integral $\int_a^b f(x) dx$ is **improper** when:

1. The interval is **unbounded** ($a = -\infty$ or $b = +\infty$).
2. $f$ has a **vertical asymptote** in $[a, b]$ — $f$ blows up at some point.

The fix: replace the offending limit by a parameter and take a limit.

$$
\int_a^\infty f(x) dx = \lim_{T \to \infty} \int_a^T f(x) dx.
$$

If the limit exists and is finite, the integral **converges**;
otherwise it **diverges**.

## Worked example: $\int_1^\infty \frac{1}{x^2} dx$

$$
\int_1^T \frac{1}{x^2} dx = \left[-\frac{1}{x}\right]_1^T = -\frac{1}{T} + 1.
$$

As $T \to \infty$, $-1/T \to 0$, so the integral equals $1$. **Converges.**

## Worked example: $\int_1^\infty \frac{1}{x} dx$

$$
\int_1^T \frac{1}{x} dx = \ln T - 0 = \ln T \to \infty.
$$

**Diverges.** The function $1/x$ does *not* shrink fast enough.

## The $p$-test

For $p > 0$:

$$
\int_1^\infty \frac{1}{x^p} dx = \begin{cases}
\frac{1}{p - 1} & \text{if } p > 1 \\
\infty & \text{if } p \le 1.
\end{cases}
$$

Memorise: $p > 1$ converges, $p \le 1$ diverges. The transition is
*exactly* at $p = 1$.

## Singularity in the interval

$\int_0^1 \frac{1}{\sqrt{x}} dx$: $f$ blows up at $0$.

$$
\int_\epsilon^1 \frac{1}{\sqrt{x}} dx = [2\sqrt{x}]_\epsilon^1 = 2 - 2\sqrt{\epsilon} \to 2 \text{ as } \epsilon \to 0^+.
$$

**Converges to $2$.**

## Interactive

:::widget type=numeric-input prompt="$\\int_1^\\infty \\frac{1}{x^2} dx = ?$" answer=1 explain="$1$.":::

:::widget type=numeric-input prompt="$\\int_1^\\infty \\frac{1}{x^3} dx = \\frac{1}{p-1} = \\frac{1}{2} = ?$" answer=0.5 explain="$0.5$.":::

:::widget type=numeric-input prompt="$\\int_0^1 \\frac{1}{\\sqrt x} dx = 2$. Converges (1) or diverges (0)?" answer=1 explain="Converges.":::

:::widget type=numeric-input prompt="$\\int_0^\\infty e^{-x} dx = [-e^{-x}]_0^\\infty = 0 - (-1) = ?$" answer=1 explain="$1$.":::

## Symbolic

**Comparison test**: if $0 \le f \le g$ on $[a, \infty)$:

- $\int g$ converges $\Rightarrow \int f$ converges.
- $\int f$ diverges $\Rightarrow \int g$ diverges.

Use this to bound an unknown integrand by a $p$-integral.

**Limit comparison**: if $\lim_{x \to \infty} \frac{f(x)}{g(x)} = L$
finite and positive, $\int f$ and $\int g$ converge or diverge together.

## Computational

```python
import sympy as sp

x = sp.symbols("x")

print(sp.integrate(1/x**2, (x, 1, sp.oo)))      # 1 — converges
print(sp.integrate(1/x,  (x, 1, sp.oo)))         # oo — diverges
print(sp.integrate(1/sp.sqrt(x), (x, 0, 1)))     # 2 — converges
print(sp.integrate(sp.exp(-x), (x, 0, sp.oo)))   # 1
print(sp.integrate(sp.exp(-x**2), (x, -sp.oo, sp.oo)))  # sqrt(pi) — Gaussian
```

The last one is the **Gaussian integral** $\int_{-\infty}^\infty e^{-x^2} dx = \sqrt{\pi}$ — fundamental in probability.

## Applied

- **Probability**: a probability density must integrate to $1$ over
  its domain. Many densities live on $(-\infty, \infty)$ — Gaussian,
  Laplace — so the normalization is an improper integral.
- **Expectation of a continuous random variable** uses
  $\mathbb{E}[X] = \int_{-\infty}^\infty x f(x) dx$ — improper unless
  $X$ is bounded.
- **Laplace transforms** $\mathcal{L}[f](s) = \int_0^\infty e^{-st} f(t) dt$
  are improper integrals over $[0, \infty)$.
- **Black-Scholes option pricing** integrates against a normal
  density over $(-\infty, \infty)$.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\int_1^\\infty \\frac{1}{x^{1.5}} dx = \\frac{1}{0.5} = ?$" answer=2 explain="$1/(p-1) = 1/0.5 = 2$.":::

:::widget type=numeric-input prompt="$\\int_1^\\infty \\frac{1}{x^{0.5}} dx$ — converges (1) or diverges (0)? ($p = 0.5 < 1$)" answer=0 explain="Diverges.":::

:::widget type=numeric-input prompt="$\\int_0^1 \\frac{1}{x} dx$ — diverges (singularity at 0 like $1/x$ at $\\infty$). Converges (1) or diverges (0)?" answer=0 explain="Diverges — same logarithmic blow-up.":::

:::widget type=numeric-input prompt="$\\int_{-\\infty}^\\infty e^{-x^2} dx = \\sqrt{\\pi} \\approx 1.7725$. Type the value." answer=1.7725 tolerance=0.005 explain="$\\sqrt{\\pi} \\approx 1.7725$.":::
