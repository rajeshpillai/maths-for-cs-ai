---
strand: change
level: foundation
order: 2
title: The Derivative — Tangent Slope as a Limit
prerequisites:
  - tier: strand-4-change-foundation
    slug: 01-limits-intuitively
    description: Limits
connections:
  - strand-4-change-foundation/03-derivative-rules
applications:
  - cs: "Gradient = derivative; foundation of every ML training step"
  - business: "Marginal cost / revenue / utility"
  - games: "Velocity from position, acceleration from velocity"
  - life: "Speedometer reading at an instant"
---

# The Derivative — Tangent Slope as a Limit

## Mental

The **derivative** of $f$ at $a$ is the **slope of the tangent** to
the graph at the point $(a, f(a))$.

Compute it by taking the limit of secant slopes:

$$
f'(a) = \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}.
$$

This is the formal version of "rate of change at an instant"
(Lesson 00).

Notations: $f'(x)$, $\dfrac{df}{dx}$, $\dfrac{dy}{dx}$, $Df$ — all
mean the same thing in this strand.

## Worked example: derivative of $f(x) = x^2$

$$
f'(x) = \lim_{h \to 0} \frac{(x + h)^2 - x^2}{h}.
$$

Expand: $(x + h)^2 = x^2 + 2xh + h^2$. Subtract $x^2$: $2xh + h^2$.
Divide by $h$: $2x + h$. Take limit as $h \to 0$:

$$
f'(x) = 2x.
$$

So at $x = 3$, the slope is $6$. At $x = -1$, the slope is $-2$.

## Geometric meaning

The derivative tells you, at any point on the graph of $f$:

- **Sign of slope**: increasing if $f' > 0$, decreasing if $f' < 0$.
- **Magnitude**: how steep the increase/decrease is.
- **Zero**: a flat point — could be a local max, min, or inflection.

This is why derivatives are the cornerstone of optimization: to
minimize a function, find where its derivative is zero.

## Interactive

:::widget type=numeric-input prompt="$f(x) = x^2$. $f'(x) = 2x$. $f'(5) = ?$" answer=10 explain="$2 \\cdot 5 = 10$.":::

:::widget type=numeric-input prompt="$f(x) = x^3$. Compute $f'(x)$ via limit definition. The result is $f'(x) = 3 x^2$. So $f'(2) = ?$" answer=12 explain="$3 \\cdot 4 = 12$.":::

:::widget type=numeric-input prompt="$f(x) = 5x$. Slope of a line is constant. $f'(x) = ?$" answer=5 explain="$5$. Linear functions have constant derivatives.":::

:::widget type=numeric-input prompt="A constant function $f(x) = 7$. $f'(x) = ?$" answer=0 explain="$0$. Constants don't change.":::

:::widget type=numeric-input prompt="Object falls under gravity: $s(t) = 5 t^2$. Velocity $v(t) = s'(t) = 10t$. At $t = 3$ s, the velocity is..." answer=30 explain="$10 \\cdot 3 = 30$ m/s.":::

## Symbolic

**Definition** of the derivative at a point:

$$
f'(a) = \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}.
$$

If this limit exists, $f$ is **differentiable at $a$**.

The **derivative function** $f'$ is defined wherever the limit
exists.

**Geometric**: $f'(a)$ is the slope of the tangent line at
$(a, f(a))$. The tangent line itself:

$$
y - f(a) = f'(a) (x - a).
$$

(Point-slope form from Strand 3 Foundation Lesson 02.)

A function differentiable at $a$ is automatically continuous there,
but **continuity does not imply differentiability** — sharp corners
(like $|x|$ at $0$) are continuous but not differentiable.

## Computational

```python
import sympy as sp

x = sp.symbols("x")
print(sp.diff(x**2, x))         # 2*x
print(sp.diff(x**3, x))         # 3*x^2
print(sp.diff(5*x, x))           # 5
print(sp.diff(7, x))             # 0

# Numerical derivative
def derivative_at(f, a, h=1e-6):
    return (f(a + h) - f(a - h)) / (2 * h)  # symmetric difference

f = lambda x: x ** 2
print(derivative_at(f, 5))   # ≈ 10.0
print(derivative_at(f, -1))  # ≈ -2.0
```

The symmetric difference (`(f(a+h) - f(a-h))/(2h)`) is more accurate
than the one-sided version for small $h$.

## Applied

- **Velocity**: derivative of position with respect to time.
- **Acceleration**: derivative of velocity (or second derivative of
  position).
- **Marginal cost** in economics: derivative of total cost with
  respect to quantity. Key concept in production decisions.
- **Gradient descent in ML**: an iterative optimization algorithm
  that adjusts parameters in the direction opposite to the
  derivative of a loss function. The single most important
  algorithm in machine learning.

## Check Your Understanding

:::widget type=numeric-input prompt="$f(x) = x^2$. Slope of tangent at $x = -3$?" answer=-6 explain="$2 \\cdot (-3) = -6$.":::

:::widget type=numeric-input prompt="$f(x) = 4x + 7$. $f'(x) = ?$" answer=4 explain="Slope of a linear function. $4$.":::

:::widget type=numeric-input prompt="If $f$ is increasing at $x = a$, then $f'(a)$ is..." answer=1 explain="Positive. Type 1 to indicate positive (or 0 for zero, -1 for negative — convention here: 1 = positive).":::

:::widget type=numeric-input prompt="$f(x) = x^3$ at $x = 0$: $f'(0) = ?$ (Use the formula $f'(x) = 3x^2$.)" answer=0 explain="$3 \\cdot 0 = 0$. Horizontal tangent at the origin (the famous $y = x^3$ inflection point).":::
