---
strand: change
level: intermediate
order: 1
title: Implicit Differentiation and Related Rates
prerequisites:
  - tier: strand-4-change-intermediate
    slug: 00-derivatives-of-trig-log-exp
    description: Trig/log/exp derivatives
connections:
  - strand-4-change-intermediate/02-lhopital
applications:
  - cs: "Constraint-based optimization, automatic differentiation"
  - business: "Sensitivity analysis (how does X change as Y changes?)"
  - games: "Real-time physics: how fast is a position changing?"
  - life: "Filling tank height-vs-volume rates, shadow lengths"
---

# Implicit Differentiation and Related Rates

## Explain Like I Am 7

A ladder leans against a wall.  As the foot of the ladder slides
out, the top *also* slides down — the two motions are tied
together.  When two things wiggle together because they share a
secret rule, **related rates** is the trick that lets you compute
one wiggle-speed if you know the other.  And **implicit
differentiation** is the slope-finder for shapes (like circles)
where $y$ is tangled up inside the rule with $x$ instead of being
written cleanly on its own.

## Mental

Some equations don't give $y = f(x)$ explicitly. Example:

$$
x^2 + y^2 = 25.
$$

This is a circle. We can't write $y$ as one function of $x$ — there
are two solutions $y = \pm \sqrt{25 - x^2}$. But we can still find
$\dfrac{dy}{dx}$ via **implicit differentiation**:

Differentiate both sides with respect to $x$, treating $y$ as a
function of $x$:

$$
2x + 2y \frac{dy}{dx} = 0 \implies \frac{dy}{dx} = -\frac{x}{y}.
$$

So at $(3, 4)$: slope $-3/4$. At $(-3, 4)$: slope $3/4$. The slope
of the tangent depends on **which point** on the circle we choose.

## Related rates

When two quantities change with time, their rates of change relate
via the chain rule.

**Example**: a $5$-metre ladder slides down a wall. The base moves
out at $1$ m/s. How fast is the top sliding down when the base is
$3$ m from the wall?

Set up: $x = $ base distance, $y = $ height. By Pythagoras: $x^2 +
y^2 = 25$.

Differentiate with respect to **time**:

$$
2 x \frac{dx}{dt} + 2 y \frac{dy}{dt} = 0.
$$

At the moment $x = 3, y = 4$, with $dx/dt = 1$:

$$
2 \cdot 3 \cdot 1 + 2 \cdot 4 \cdot \frac{dy}{dt} = 0 \implies \frac{dy}{dt} = -\frac{3}{4} \text{ m/s}.
$$

The top descends at $3/4$ m/s when the base is $3$ m out. Negative
sign because $y$ is decreasing.

## Interactive

:::widget type=numeric-input prompt="$x^2 + y^2 = 25$. Find $dy/dx$ at $(3, 4)$. (Implicit: $2x + 2y y' = 0$, so $y' = -x/y = -3/4$.) Type the decimal." answer=-0.75 explain="$-0.75$.":::

:::widget type=numeric-input prompt="A circular oil spill has area $A = \\pi r^2$. $dA/dt$ at $r = 5$ if $dr/dt = 0.5$? ($dA/dt = 2\\pi r \\cdot dr/dt = 2\\pi \\cdot 5 \\cdot 0.5 = 5\\pi$.) Round to 2 dp." answer=15.71 tolerance=0.05 explain="$5\\pi \\approx 15.71$.":::

:::widget type=numeric-input prompt="Cube of side $s$ growing: $V = s^3$. $dV/dt = 3s^2 \\cdot ds/dt$. At $s = 2, ds/dt = 0.1$: $dV/dt = ?$" answer=1.2 explain="$3 \\cdot 4 \\cdot 0.1 = 1.2$.":::

:::widget type=numeric-input prompt="A balloon's volume $V = \\frac{4}{3}\\pi r^3$ grows at $dV/dt = 100$ cm³/s. Find $dr/dt$ at $r = 5$. ($dV/dt = 4\\pi r^2 dr/dt$, so $dr/dt = 100/(4\\pi \\cdot 25) \\approx 0.318$.) Round to 3 dp." answer=0.318 tolerance=0.005 explain="$0.318$ cm/s.":::

## Symbolic

**Implicit differentiation**: when $y$ is implicitly defined by an
equation $F(x, y) = 0$, differentiate both sides with respect to $x$,
applying the chain rule wherever $y$ appears.

**Related rates** template:

1. Identify variables and the relation between them.
2. Differentiate **with respect to the chosen variable** (often $t$).
3. Substitute known values.
4. Solve for the unknown rate.

## Computational

```python
import sympy as sp

x, y = sp.symbols("x y")

# Implicit derivative of x² + y² = 25
F = x**2 + y**2 - 25
dy_dx = -sp.diff(F, x) / sp.diff(F, y)
print(dy_dx)   # -x/y

# Evaluate at (3, 4)
print(dy_dx.subs({x: 3, y: 4}))   # -3/4
```

## Applied

- **Automatic differentiation in ML**: PyTorch and TensorFlow do
  implicit differentiation behind the scenes for any computation
  graph.
- **Sensitivity analysis**: "if input shifts by $\Delta$, output
  shifts by approximately $\Delta \cdot dy/dx$."
- **Physics**: $F = ma$, with $a = d^2x/dt^2$ — derivatives chained
  through time.

## Check Your Understanding

:::widget type=numeric-input prompt="$x^2 + y^2 = 100$ at $(6, 8)$. $dy/dx = ?$" answer=-0.75 explain="$-x/y = -6/8 = -0.75$.":::

:::widget type=numeric-input prompt="A square has side $s$ growing at $2$ cm/s. $A = s^2$, $dA/dt = 2s \\cdot ds/dt$. At $s = 5$: $dA/dt = ?$" answer=20 explain="$2 \\cdot 5 \\cdot 2 = 20$ cm²/s.":::

:::widget type=numeric-input prompt="A spherical bubble with $V = \\frac{4}{3}\\pi r^3$ at radius 3 cm growing at $dr/dt = 1$. $dV/dt = 4\\pi r^2 dr/dt$? At $r = 3, dr/dt = 1$: $dV/dt = ?$ Round to 2 dp." answer=113.10 tolerance=0.5 explain="$4\\pi \\cdot 9 \\cdot 1 = 36\\pi \\approx 113.10$.":::

:::widget type=numeric-input prompt="$x^2 - y^2 = 16$ at $(5, 3)$. $2x - 2y y' = 0 \\Rightarrow y' = x/y$. At $(5, 3)$: $y' = ?$ Round to 3 dp." answer=1.667 tolerance=0.01 explain="$5/3 \\approx 1.667$.":::
