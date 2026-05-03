---
strand: change
level: intermediate
order: 3
title: Integration by Substitution
prerequisites:
  - tier: strand-4-change-foundation
    slug: 07-antiderivatives
    description: Antiderivatives
connections:
  - strand-4-change-intermediate/04-integration-by-parts
applications:
  - cs: "Numerical integration, change of variables in ML"
  - life: "Inverting the chain rule"
---

# Integration by Substitution

## Mental

Integration by substitution is the **chain rule run backwards**.
The chain rule says

$$
\frac{d}{dx} f(g(x)) = f'(g(x)) \cdot g'(x).
$$

So integrating $f'(g(x)) g'(x)$ gives $f(g(x)) + C$.

The technique: spot a derivative inside the integrand. Substitute
$u = g(x)$, $du = g'(x) \, dx$. Replace and integrate in $u$, then
back-substitute.

## Worked example

$$
\int 2 x \cos(x^2) \, dx.
$$

Let $u = x^2$, so $du = 2 x \, dx$. The integrand becomes $\cos u
\, du$.

$$
\int \cos u \, du = \sin u + C = \sin(x^2) + C.
$$

Verify by differentiating: $\frac{d}{dx} \sin(x^2) = 2x \cos(x^2)$. ✓

## Definite integrals

For $\int_a^b f'(g(x)) g'(x) dx$, change limits to $u$:

$$
\int_a^b f'(g(x)) g'(x) \, dx = \int_{g(a)}^{g(b)} f'(u) \, du.
$$

Or compute the antiderivative in $x$ and use the original limits.

## Interactive

:::widget type=numeric-input prompt="$\\int 2x \\, e^{x^2} \\, dx$. Substitute $u = x^2$, $du = 2x \\, dx$. Becomes $\\int e^u du = e^u = e^{x^2}$. Verify $\\frac{d}{dx} e^{x^2} = ?$ at $x = 1$." answer=5.4366 tolerance=0.005 explain="$2 \\cdot 1 \\cdot e = 2e \\approx 5.437$.":::

:::widget type=numeric-input prompt="$\\int (3x^2)(x^3 + 1)^4 dx$. Let $u = x^3 + 1$, $du = 3x^2 dx$. $\\int u^4 du = u^5/5$. So result is $(x^3 + 1)^5/5 + C$. Coefficient of $u^5$? Type the denominator." answer=5 explain="$5$.":::

:::widget type=numeric-input prompt="$\\int_0^1 2x e^{x^2} dx$. Antiderivative $e^{x^2}$. $e^1 - e^0 = ?$ Round 4 dp." answer=1.7183 tolerance=0.005 explain="$e - 1 \\approx 1.7183$.":::

:::widget type=numeric-input prompt="$\\int \\sin(2x) dx$. $u = 2x$, $du = 2 dx$. $\\frac{1}{2}\\int \\sin u du = -\\frac{1}{2}\\cos u = -\\frac{1}{2}\\cos(2x) + C$. At $x = \\pi/2$, antiderivative value: $-\\frac{1}{2}\\cos\\pi = ?$" answer=0.5 explain="$-\\frac{1}{2}(-1) = 0.5$.":::

## Symbolic

The general substitution rule:

$$
\int f(g(x)) g'(x) \, dx = \int f(u) \, du, \quad u = g(x).
$$

For definite integrals:

$$
\int_a^b f(g(x)) g'(x) \, dx = \int_{g(a)}^{g(b)} f(u) \, du.
$$

A good candidate for $u$ is usually:

- An inner function whose derivative also appears as a factor.
- An expression under a power, root, log, or trig function.

## Computational

```python
import sympy as sp

x = sp.symbols("x")

print(sp.integrate(2 * x * sp.exp(x**2), x))           # exp(x²)
print(sp.integrate(3 * x**2 * (x**3 + 1)**4, x))       # (x³+1)⁵/5
print(sp.integrate(sp.sin(2*x), x))                     # -cos(2x)/2
print(sp.integrate(2*x*sp.exp(x**2), (x, 0, 1)))        # exp(1) - 1 = e - 1
```

## Check Your Understanding

:::widget type=numeric-input prompt="$\\int (2x)(x^2 + 5)^3 dx$. $u = x^2 + 5$, $du = 2x dx$. $\\int u^3 du = u^4/4$. Result coefficient (denominator)?" answer=4 explain="$\\frac{(x^2+5)^4}{4} + C$.":::

:::widget type=numeric-input prompt="$\\int \\cos(3x) dx$. $u = 3x$, $du = 3dx$. $\\frac{1}{3}\\sin(3x) + C$. Coefficient (denominator)?" answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="$\\int_0^{\\pi} \\sin(2x) dx$ — definite. Antiderivative $-\\cos(2x)/2$. $[-\\cos(2\\pi)/2 - (-\\cos 0/2)] = -1/2 + 1/2 = ?$" answer=0 explain="$0$.":::

:::widget type=numeric-input prompt="$\\int x e^{x^2} dx$. $u = x^2$, $du = 2xdx$. $\\frac{1}{2} e^{x^2} + C$. Coefficient (denominator)?" answer=2 explain="$2$.":::
