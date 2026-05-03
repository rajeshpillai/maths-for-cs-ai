---
strand: change
level: foundation
order: 0
title: Rates of Change
prerequisites:
  - tier: strand-3-shape-space-foundation
    slug: 02-lines-and-slope
    description: Lines and slope
connections:
  - strand-4-change-foundation/01-limits-intuitively
applications:
  - cs: "Rate of model loss decrease per training step"
  - business: "Sales-per-month, conversion-rate trends"
  - games: "Velocity, acceleration in physics engines"
  - life: "Speedometer, weight loss per week, bank-balance growth"
---

# Rates of Change

## Mental

Calculus is the mathematics of **change**. Before formal definitions,
we need a clear sense of "rate of change" — how fast one quantity
varies as another changes.

The simplest case: **linear** rates. If a car travels $100$ km in
$2$ hours at constant speed, its rate of change of position with
respect to time is

$$
\frac{\Delta \text{position}}{\Delta \text{time}} = \frac{100}{2} = 50 \text{ km/h}.
$$

This is the **slope** from Strand 3 (Foundation Lesson 02). Slope of
a graph of position vs time = velocity.

For non-constant rates (acceleration, growth), the rate **changes
moment by moment**. Calculus's central question is:

> **What is the rate of change at an instant**, when both
> $\Delta\text{quantity}$ and $\Delta\text{time}$ approach zero?

That ratio of two infinitesimals is the **derivative** — the headline
concept of differential calculus. We'll build to it through Lessons
01–04.

## Average vs instantaneous

When a function $f$ changes from $x_1$ to $x_2$:

$$
\text{average rate of change} = \frac{f(x_2) - f(x_1)}{x_2 - x_1}.
$$

This is the slope of the **secant line** through the two points.

To get the **instantaneous** rate at a point $x_0$, we shrink the
interval: $x_2 \to x_1$. The secant line becomes the **tangent**,
and the slope of the tangent is the derivative at $x_0$.

## Interactive

:::widget type=numeric-input prompt="A car: position $s(t) = 5t$ km after $t$ hours. Average speed from $t = 1$ to $t = 4$? (Constant rate.)" answer=5 explain="$\\frac{20 - 5}{4 - 1} = 5$ km/h. Constant rate.":::

:::widget type=numeric-input prompt="Object falls: $s(t) = 5 t^2$ metres after $t$ seconds. Average velocity from $t = 1$ to $t = 3$?" answer=20 explain="$\\frac{45 - 5}{2} = \\frac{40}{2} = 20$ m/s.":::

:::widget type=numeric-input prompt="Same falling object: average velocity from $t = 1$ to $t = 1.1$ (small interval). $s(1.1) = 5 \\cdot 1.21 = 6.05$. Rate $= (6.05 - 5)/0.1 = 10.5$ m/s. Compare to $1$ to $1.01$: $s(1.01) = 5.1005$, rate $= 10.05$. Pattern: as $\\Delta t \\to 0$, rate approaches..." answer=10 explain="The instantaneous velocity at $t = 1$ is $10$ m/s. (We'll compute via derivative formula in Lesson 04.)":::

:::widget type=numeric-input prompt="A bank account: $A(t) = 1000 \\cdot (1.05)^t$. Average rate of change from $t = 0$ to $t = 1$? (Approximately the first year of interest.)" answer=50 explain="$1050 - 1000 = 50$. So $50$ per year. Average. (Instantaneous would compound continuously.)":::

## Symbolic

For a function $f$:

$$
\text{average rate over } [a, b] = \frac{f(b) - f(a)}{b - a}.
$$

The **instantaneous rate** at $x = a$:

$$
f'(a) = \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}.
$$

This is the **derivative** — the slope of the tangent line at the
point. Lessons 02–04 develop this rigorously; for now, it's a
**limiting slope**.

## Computational

```python
def average_rate(f, a, b):
    return (f(b) - f(a)) / (b - a)

f = lambda t: 5 * t ** 2

print(average_rate(f, 1, 3))     # 20
print(average_rate(f, 1, 1.1))   # 10.5
print(average_rate(f, 1, 1.01))  # 10.05
print(average_rate(f, 1, 1.001)) # 10.005

# Numerical derivative — approximates instantaneous rate
def derivative_at(f, x, h=1e-6):
    return (f(x + h) - f(x)) / h

print(derivative_at(f, 1))   # 10.0
```

## Applied

- **Speed and velocity**: rate of position change.
- **Acceleration**: rate of velocity change. (Newton's second law:
  $F = ma$.)
- **Growth rates**: bacteria, populations, viral spread.
- **ML training**: loss per step. The rate of loss decrease tells
  you whether learning is happening.

## Check Your Understanding

:::widget type=numeric-input prompt="$f(x) = x^2$. Average rate from $x = 2$ to $x = 5$." answer=7 explain="$(25 - 4)/3 = 7$.":::

:::widget type=numeric-input prompt="$f(x) = x^3$. Average rate from $x = 1$ to $x = 2$." answer=7 explain="$(8 - 1)/1 = 7$.":::

:::widget type=numeric-input prompt="The rate of change of a constant function is..." answer=0 explain="$0$. Constants don't change.":::

:::widget type=numeric-input prompt="Average rate of $f(x) = 3x + 2$ over any interval is..." answer=3 explain="The slope. Linear functions have constant rate of change.":::
