---
strand: change
level: intermediate
order: 4
title: Integration by Parts
prerequisites:
  - tier: strand-4-change-intermediate
    slug: 03-integration-by-substitution
    description: Integration by substitution
connections:
  - strand-4-change-intermediate/05-partial-fractions
applications:
  - cs: "Integrals in probability theory, expected values"
  - life: "Inverting the product rule"
---

# Integration by Parts

## Mental

Integration by parts is the **product rule run backwards**.

Product rule: $(uv)' = u'v + uv'$. Integrate both sides:

$$
uv = \int u' v \, dx + \int u v' \, dx.
$$

Rearrange:

$$
\int u \, dv = uv - \int v \, du.
$$

The technique: split the integrand into a part to **differentiate** ($u$)
and a part to **integrate** ($dv$). Choose so that $\int v \, du$
is *simpler* than the original.

## LIATE heuristic

Pick $u$ in the order **L**og, **I**nverse trig, **A**lgebraic,
**T**rig, **E**xponential — earlier in the list = better choice
for $u$.

## Worked example

$$
\int x e^x \, dx.
$$

$x$ is algebraic (A), $e^x$ is exponential (E). LIATE says $u = x$.

Let $u = x$, $dv = e^x dx$. Then $du = dx$, $v = e^x$.

$$
\int x e^x \, dx = x e^x - \int e^x \, dx = x e^x - e^x + C = e^x (x - 1) + C.
$$

Verify: $\frac{d}{dx} [e^x(x-1)] = e^x(x-1) + e^x = e^x \cdot x$. ✓

## Worked example 2: $\int \ln x \, dx$

$\ln x$ alone — log (L), so $u = \ln x$, $dv = dx$.

Then $du = \frac{1}{x} dx$, $v = x$.

$$
\int \ln x \, dx = x \ln x - \int x \cdot \frac{1}{x} dx = x \ln x - x + C.
$$

## Interactive

:::widget type=numeric-input prompt="$\\int x e^x dx = e^x(x-1) + C$. At $x = 0$: $e^0(0-1) = ?$" answer=-1 explain="$1 \\cdot (-1) = -1$.":::

:::widget type=numeric-input prompt="$\\int \\ln x \\, dx = x \\ln x - x + C$. At $x = e$: $e \\cdot 1 - e = ?$" answer=0 explain="$e - e = 0$.":::

:::widget type=numeric-input prompt="$\\int x \\cos x \\, dx$. $u = x$, $dv = \\cos x \\, dx$. $v = \\sin x$. $= x \\sin x - \\int \\sin x \\, dx = x \\sin x + \\cos x + C$. At $x = 0$: $0 + 1 = ?$" answer=1 explain="$1$.":::

:::widget type=numeric-input prompt="LIATE — for $\\int x \\ln x \\, dx$, choose $u = \\ln x$ (L beats A). $du = dx/x$, $dv = x dx$, $v = x^2/2$. Result $\\frac{x^2}{2} \\ln x - \\frac{x^2}{4} + C$. At $x = 1$: $0 - 1/4 = ?$" answer=-0.25 explain="$-1/4$.":::

## Symbolic

The general formula:

$$
\int u \, dv = uv - \int v \, du.
$$

For definite integrals:

$$
\int_a^b u \, dv = [uv]_a^b - \int_a^b v \, du.
$$

**Repeated parts**: sometimes one application leaves another
parts-able integral. Apply again. For $\int x^2 e^x dx$:

$$
\int x^2 e^x dx = x^2 e^x - 2 \int x e^x dx = x^2 e^x - 2(x e^x - e^x) + C.
$$

**Tabular method** (DI / "stand and deliver"): write derivatives of
$u$ down one column, antiderivatives of $dv$ down another, multiply
diagonally with alternating signs. Fast for $\int x^n e^{ax} dx$.

## Computational

```python
import sympy as sp

x = sp.symbols("x")

print(sp.integrate(x * sp.exp(x), x))            # x*exp(x) - exp(x)
print(sp.integrate(sp.log(x), x))                # x*log(x) - x
print(sp.integrate(x * sp.cos(x), x))            # x*sin(x) + cos(x)
print(sp.integrate(x**2 * sp.exp(x), x))         # x²*e^x - 2x*e^x + 2*e^x
```

## Check Your Understanding

:::widget type=numeric-input prompt="$\\int_0^1 x e^x dx = [e^x(x-1)]_0^1 = 0 - (-1) = ?$" answer=1 explain="$1$.":::

:::widget type=numeric-input prompt="$\\int x \\sin x \\, dx$. $u = x$, $dv = \\sin x dx$, $v = -\\cos x$. $= -x \\cos x + \\int \\cos x \\, dx = -x \\cos x + \\sin x + C$. At $x = \\pi$: $-\\pi(-1) + 0 = ?$. Round 4 dp." answer=3.1416 tolerance=0.005 explain="$\\pi \\approx 3.1416$.":::

:::widget type=numeric-input prompt="LIATE — for $\\int x e^x dx$, $u =$ algebraic ($x$), $dv =$ exponential. A vs E — A wins. Type 1 if LIATE picked correctly." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\int_1^e \\ln x \\, dx = [x \\ln x - x]_1^e = (e - e) - (0 - 1) = ?$" answer=1 explain="$1$.":::
