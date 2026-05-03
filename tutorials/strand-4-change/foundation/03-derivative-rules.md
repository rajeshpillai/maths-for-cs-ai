---
strand: change
level: foundation
order: 3
title: Derivative Rules — Power, Sum, Constant
prerequisites:
  - tier: strand-4-change-foundation
    slug: 02-derivative-as-tangent-slope
    description: Derivative as tangent slope
connections:
  - strand-4-change-foundation/04-product-quotient-chain
applications:
  - cs: "Computing gradients efficiently for any polynomial loss"
  - business: "Marginal calculations in optimisation"
  - games: "Velocity profiles, acceleration curves"
---

# Derivative Rules — Power, Sum, Constant

## Mental

Computing derivatives by the limit definition is correct but tedious.
A few **rules** make differentiation a mechanical algebra exercise.

**Power rule**:

$$
\frac{d}{dx} x^n = n x^{n-1} \quad \text{for any real } n.
$$

So $x^2 \to 2x$, $x^3 \to 3 x^2$, $x^{1/2} \to \tfrac{1}{2} x^{-1/2}$,
$x^{-1} \to -x^{-2}$.

**Constant rule**: $\dfrac{d}{dx} c = 0$ for any constant $c$.

**Constant multiple rule**: $\dfrac{d}{dx} (c \cdot f) = c \cdot
f'(x)$.

**Sum rule**:

$$
\frac{d}{dx} (f + g) = f'(x) + g'(x).
$$

These four rules together let you differentiate any polynomial.

## Worked example

$f(x) = 3 x^4 - 2 x^2 + 5x - 7$.

By the rules:

$$
f'(x) = 12 x^3 - 4 x + 5.
$$

(Power rule on each term, summed.)

The constant $-7$ disappears (its derivative is $0$).

## Interactive

:::widget type=numeric-input prompt="$f(x) = x^5$. $f'(x) = ?$ — type the coefficient of $x^4$." answer=5 explain="Power rule: $5 x^4$.":::

:::widget type=numeric-input prompt="$f(x) = 7 x^3 + 2 x$. $f'(x) = 21 x^2 + 2$. Value at $x = 1$?" answer=23 explain="$21 + 2 = 23$.":::

:::widget type=numeric-input prompt="$f(x) = 4 x^2 - 3 x + 1$. $f'(2) = ?$ ($f'(x) = 8x - 3$.)" answer=13 explain="$16 - 3 = 13$.":::

:::widget type=numeric-input prompt="$f(x) = \\sqrt x = x^{1/2}$. $f'(x) = \\tfrac{1}{2} x^{-1/2}$. $f'(4) = ?$" answer=0.25 explain="$0.5 \\cdot 4^{-0.5} = 0.5 \\cdot 0.5 = 0.25$.":::

:::widget type=numeric-input prompt="$f(x) = 1/x = x^{-1}$. $f'(x) = -x^{-2}$. $f'(2) = ?$" answer=-0.25 explain="$-1/4 = -0.25$.":::

## Symbolic

The rules in compact form, with constants $a, b, c$ and functions $f, g$:

$$
\begin{aligned}
\frac{d}{dx} c &= 0 \\
\frac{d}{dx} x^n &= n x^{n-1} \\
\frac{d}{dx} (c \cdot f) &= c \cdot f'(x) \\
\frac{d}{dx} (f + g) &= f'(x) + g'(x) \\
\frac{d}{dx} (af + bg) &= a f' + b g' \quad \text{(linearity, combining the above)}
\end{aligned}
$$

The power rule extends beyond integers to any **real** exponent —
critical for $\sqrt x = x^{1/2}$, $1/x = x^{-1}$, $x^{2/3}$, etc.

For non-polynomial functions, additional rules are needed (Lesson 04
covers product/quotient/chain).

## Computational

```python
import sympy as sp

x = sp.symbols("x")

print(sp.diff(x**5, x))                    # 5*x**4
print(sp.diff(7*x**3 + 2*x, x))             # 21*x**2 + 2
print(sp.diff(4*x**2 - 3*x + 1, x))         # 8*x - 3
print(sp.diff(sp.sqrt(x), x))               # 1/(2*sqrt(x))
print(sp.diff(1/x, x))                       # -1/x**2

# Numerical
def numerical_derivative(f, x, h=1e-6):
    return (f(x + h) - f(x - h)) / (2 * h)

f = lambda x: 4 * x**2 - 3 * x + 1
print(numerical_derivative(f, 2))    # ≈ 13.0
```

## Applied

- **Polynomial-time differentiation**: any polynomial of degree $n$
  takes $O(n)$ to differentiate. Auto-differentiation systems for
  ML extend this to compositions and arbitrary code.
- **Optimal points**: setting $f'(x) = 0$ finds candidate maxima/
  minima. The standard high-school calculus problem.
- **Marginal analysis** in economics: $f'(x)$ at $x$ tells you the
  approximate change in $f$ for a unit change in $x$.

## Check Your Understanding

:::widget type=numeric-input prompt="$f(x) = x^7$. $f'(x) = 7 x^6$. $f'(1) = ?$" answer=7 explain="$7 \\cdot 1 = 7$.":::

:::widget type=numeric-input prompt="$f(x) = 5 x^4 - 3 x^2 + 2$. $f'(x) = 20 x^3 - 6 x$. $f'(1) = ?$" answer=14 explain="$20 - 6 = 14$.":::

:::widget type=numeric-input prompt="The derivative of $x^{100}$? Type the coefficient." answer=100 explain="$100 x^{99}$.":::

:::widget type=numeric-input prompt="A function $f$ has $f'(x) = 3 x^2$. So $f$ is most likely... what?" answer=0 explain="$x^3$ + constant. The constant is undetermined from the derivative alone (Lesson 06's antiderivatives).":::
