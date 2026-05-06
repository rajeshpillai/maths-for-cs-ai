---
strand: change
level: foundation
order: 7
title: Antiderivatives — Inverting Differentiation
prerequisites:
  - tier: strand-4-change-foundation
    slug: 03-derivative-rules
    description: Derivative rules
connections:
  - strand-4-change-foundation/08-fundamental-theorem
applications:
  - cs: "Symbolic integration in CAS, ODE solvers"
  - business: "Total from marginal: revenue, cost, profit"
  - games: "Recovering position from velocity"
  - life: "Recovering total income from rate of pay"
---

# Antiderivatives — Inverting Differentiation

## Explain Like I Am 7

If you know how *fast* a marble was rolling at every moment, can
you figure out *where it ended up*?  Yes: it's the same as undoing
the speed-finder.  An **antiderivative** is the answer to "what
function had this slope?"  It's just running the slope-finder
backwards.  There's a tiny catch — moving everything up by a fixed
amount doesn't change the slope — so any antiderivative comes
with a "plus some constant" tail, since you can't tell where you
*started* from speed alone.

## Mental

An **antiderivative** of $f$ is a function $F$ whose derivative is
$f$:

$$
F'(x) = f(x).
$$

Antiderivatives are not unique — adding any constant gives another
valid antiderivative. So we write the **indefinite integral**:

$$
\int f(x) \, dx = F(x) + C,
$$

where $C$ is the **constant of integration** — to be pinned down by
initial conditions.

The **power rule reversed**:

$$
\int x^n \, dx = \frac{x^{n+1}}{n + 1} + C, \quad n \ne -1.
$$

(For $n = -1$: $\int x^{-1} \, dx = \ln|x| + C$.)

A few common antiderivatives:

- $\int 1 \, dx = x + C$
- $\int x \, dx = \tfrac{x^2}{2} + C$
- $\int x^2 \, dx = \tfrac{x^3}{3} + C$
- $\int e^x \, dx = e^x + C$
- $\int \sin x \, dx = -\cos x + C$
- $\int \cos x \, dx = \sin x + C$

## Interactive

:::widget type=numeric-input prompt="$\\int x^3 \\, dx = ?$ — type the coefficient of $x^4$." answer=0.25 explain="$\\frac{x^4}{4}$ — coefficient $\\frac{1}{4} = 0.25$.":::

:::widget type=numeric-input prompt="$\\int (3x^2 + 2x + 1) \\, dx = x^3 + x^2 + x + C$. Verify by differentiating: $3x^2 + 2x + 1$. ✓ Type 1 to confirm." answer=1 explain="Yes — derivative gives back the original.":::

:::widget type=numeric-input prompt="$\\int 5 \\, dx = 5x + C$. Value at $x = 4$ minus at $x = 1$ (definite integral $\\int_1^4 5 dx = 15$). Type 15." answer=15 explain="$5 \\cdot (4 - 1) = 15$.":::

:::widget type=numeric-input prompt="$\\int x \\, dx$ from $0$ to $2$: $\\frac{x^2}{2}$ evaluated gives $\\frac{4}{2} - 0 = ?$" answer=2 explain="$2$.":::

## Symbolic

Antiderivative rules mirror differentiation rules:

$$
\int (f + g) \, dx = \int f \, dx + \int g \, dx, \quad \int c f \, dx = c \int f \, dx.
$$

But there's no general "product/quotient rule" for integration —
those have analogues (integration by parts, partial fractions —
Strand 4 Intermediate).

**Power rule**:

$$
\int x^n \, dx = \frac{x^{n+1}}{n+1} + C, \quad n \ne -1.
$$

**Common antiderivatives**:

| $f(x)$ | $F(x) = \int f \, dx$ |
|---|---|
| $0$ | $C$ |
| $1$ | $x + C$ |
| $x^n$ ($n \ne -1$) | $\frac{x^{n+1}}{n+1} + C$ |
| $1/x$ | $\ln \|x\| + C$ |
| $e^x$ | $e^x + C$ |
| $\sin x$ | $-\cos x + C$ |
| $\cos x$ | $\sin x + C$ |
| $\sec^2 x$ | $\tan x + C$ |

## Computational

```python
import sympy as sp

x = sp.symbols("x")

print(sp.integrate(x**3, x))                    # x**4 / 4
print(sp.integrate(3*x**2 + 2*x + 1, x))        # x**3 + x**2 + x
print(sp.integrate(sp.sin(x), x))               # -cos(x)
print(sp.integrate(sp.exp(x), x))                # exp(x)
print(sp.integrate(1/x, x))                       # log(x)

# Definite integral
print(sp.integrate(x**2, (x, 0, 1)))   # 1/3
print(sp.integrate(x, (x, 0, 2)))      # 2
```

## Applied

- **Total from marginal**: integrate marginal cost from $0$ to $q$
  to get total cost (modulo a fixed cost).
- **Position from velocity**: $\int v(t) \, dt = $ position
  function (plus initial position).
- **ODE solving**: differential equations (Strand 11) ask "find $f$
  given $f'$."

## Check Your Understanding

:::widget type=numeric-input prompt="$\\int 6x \\, dx = ?$ — type the coefficient of $x^2$." answer=3 explain="$\\frac{6 x^2}{2} = 3 x^2$.":::

:::widget type=numeric-input prompt="$\\int_0^1 x^3 \\, dx = ?$" answer=0.25 explain="$\\frac{x^4}{4}$ at 1 minus 0 = $\\frac{1}{4}$.":::

:::widget type=numeric-input prompt="$\\int_0^{\\pi} \\sin x \\, dx$? (Use $-\\cos x$ as antiderivative.)" answer=2 explain="$-\\cos\\pi - (-\\cos 0) = 1 + 1 = 2$.":::

:::widget type=numeric-input prompt="$\\int 4 \\, dx = 4x + C$. Definite from $a = 1$ to $b = 5$ gives $4 \\cdot 4 = ?$" answer=16 explain="$4 \\cdot 5 - 4 \\cdot 1 = 16$.":::
