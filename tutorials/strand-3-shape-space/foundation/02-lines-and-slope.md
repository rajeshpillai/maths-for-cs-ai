---
strand: shape-space
level: foundation
order: 2
title: Lines and Slope
prerequisites:
  - tier: strand-3-shape-space-foundation
    slug: 01-distance-and-pythagoras
    description: Distance and Pythagoras
connections:
  - strand-3-shape-space-foundation/03-angles-and-triangles
  - strand-1-number-quantity-foundation/06-fractions-as-ratios
applications:
  - cs: "Linear regression in ML; pixel-perfect line drawing (Bresenham)"
  - business: "Cost-vs-quantity charts, break-even analysis"
  - games: "Trajectory paths, character movement vectors"
  - life: "Reading graphs, estimating rates from charts, weather slopes"
---

# Lines and Slope

## Explain Like I Am 7

A ramp can be gentle, like a wheelchair ramp into a shop, or steep,
like a slide at the playground.  The number that says "how steep" is
called the **slope** — it's just *how far up you go each time you
take one step sideways*.  A flat floor has slope zero (no climbing).
A wall would have an infinite slope (all climbing, no sideways).
Every straight line on a graph has its own steepness number, and
that one number tells you almost everything about the line.

## Mental

A **straight line** in the coordinate plane has one defining feature:
its **slope** — the rate at which $y$ changes as $x$ moves.

For two points $(x_1, y_1)$ and $(x_2, y_2)$ on a line, the slope is

$$
m = \frac{y_2 - y_1}{x_2 - x_1} = \frac{\text{rise}}{\text{run}}.
$$

Read this as: "for every $1$ unit you move **right**, the line rises
$m$ units." A slope of $2$ means every step right corresponds to a
step up of $2$. A slope of $-\tfrac{1}{2}$ means every step right
corresponds to a step **down** of $0.5$.

| Slope | Direction |
|---|---|
| Positive | Line goes up to the right |
| Negative | Line goes down to the right |
| Zero | Horizontal line |
| Undefined | Vertical line (denominator $0$) |

Three forms of a line equation appear constantly:

**Slope-intercept form**: $y = mx + b$.
Here $m$ is the slope and $b$ is the **$y$-intercept** (where the
line crosses the $y$-axis).

**Point-slope form**: $y - y_1 = m(x - x_1)$.
Useful when you know one point on the line and the slope.

**Two-point form**: derived from picking any two points and applying
the slope formula:
$$y - y_1 = \frac{y_2 - y_1}{x_2 - x_1}(x - x_1).$$

All three forms describe the same line — pick whichever is
algebraically convenient for your problem.

## Interactive

A line with slope $2$ and $y$-intercept $1$ — that is, $y = 2x + 1$:

:::widget type=coordinate-plane lines=[{"slope":2,"intercept":1}] points=[{"x":0,"y":1,"label":"y-int"},{"x":1,"y":3},{"x":2,"y":5}] xMin=-3 xMax=4 yMin=-2 yMax=7:::

Notice the marked points: $(0, 1), (1, 3), (2, 5)$. Each one satisfies
$y = 2x + 1$. The slope $2$ shows up as "$y$ increases by $2$ for
each unit increase in $x$."

Three lines on the same plane — different slopes, same $y$-intercept:

:::widget type=coordinate-plane lines=[{"slope":1,"intercept":0},{"slope":2,"intercept":0},{"slope":-0.5,"intercept":0}] xMin=-4 xMax=4 yMin=-4 yMax=4:::

Three different slopes ($1, 2, -0.5$) all through the origin.
Steeper slopes look more vertical.

:::widget type=numeric-input prompt="A line passes through $(0, 3)$ and $(2, 7)$. What is its slope?" answer=2 explain="$m = \\dfrac{7 - 3}{2 - 0} = \\dfrac{4}{2} = 2$.":::

:::widget type=numeric-input prompt="A line passes through $(1, 5)$ and $(4, -1)$. What is its slope?" answer=-2 explain="$m = \\dfrac{-1 - 5}{4 - 1} = \\dfrac{-6}{3} = -2$. Negative slope = downward to the right.":::

:::widget type=numeric-input prompt="The line $y = 3x - 7$ has $y$-intercept...?" answer=-7 explain="The constant term is the $y$-intercept. At $x = 0$, $y = -7$.":::

:::widget type=numeric-input prompt="A horizontal line has slope...?" answer=0 explain="Rise is $0$ for any run, so $m = 0/(\\text{anything}) = 0$. Horizontal lines have slope $0$.":::

:::widget type=step-revealer
{
  "title": "Finding the equation of a line through (1, 5) and (4, 11)",
  "steps": [
    {"prose": "We have two points. The line is uniquely determined."},
    {"math": "m = \\frac{11 - 5}{4 - 1} = \\frac{6}{3} = 2", "prose": "Compute the slope first."},
    {"math": "y - 5 = 2(x - 1)", "prose": "Use point-slope form with $(1, 5)$ as the anchor and $m = 2$."},
    {"math": "y - 5 = 2x - 2", "prose": "Distribute the $2$."},
    {"math": "y = 2x + 3", "prose": "Add $5$ to both sides → slope-intercept form. The $y$-intercept is $3$."},
    {"prose": "**Verify**: at $x = 1$, $y = 2(1) + 3 = 5$ ✓. At $x = 4$, $y = 2(4) + 3 = 11$ ✓."}
  ]
}
:::

## Symbolic

A line in the plane (with non-vertical slope) is the set of points
$(x, y)$ satisfying $y = mx + b$ for some constants $m$ and $b$.

**Slope** is the ratio:

$$
m = \frac{y_2 - y_1}{x_2 - x_1}, \quad x_1 \ne x_2.
$$

A vertical line has equation $x = a$ for some constant $a$ — no
slope-intercept form, slope is "undefined."

**Two lines are parallel** iff they have the same slope:
$m_1 = m_2$.

**Two lines are perpendicular** iff their slopes multiply to $-1$:
$m_1 \cdot m_2 = -1$. (Vertical and horizontal lines are
perpendicular by special-case convention.) For example, $y = 2x + 1$
and $y = -\tfrac{1}{2} x + 4$ are perpendicular.

The **distance from a point to a line** $ax + by + c = 0$ is

$$
d = \frac{|a x_0 + b y_0 + c|}{\sqrt{a^2 + b^2}}.
$$

(We won't derive this at Foundation, but it's worth seeing.)

## Computational

```python
def slope(p1, p2):
    if p1[0] == p2[0]:
        return None   # vertical
    return (p2[1] - p1[1]) / (p2[0] - p1[0])

def line_through(p1, p2):
    """Return (slope, intercept) for the line through p1 and p2."""
    m = slope(p1, p2)
    if m is None:
        return None
    b = p1[1] - m * p1[0]
    return (m, b)

print(slope((0, 0), (3, 6)))           # 2.0
print(line_through((1, 5), (4, 11)))   # (2.0, 3.0)
print(line_through((0, 1), (5, 1)))    # (0.0, 1.0) — horizontal

def parallel(line1, line2):
    return abs(line1[0] - line2[0]) < 1e-9

def perpendicular(line1, line2):
    return abs(line1[0] * line2[0] + 1) < 1e-9

print(parallel((2, 5), (2, -3)))     # True
print(perpendicular((2, 5), (-0.5, 1)))  # True
```

For visual plotting:

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-3, 4, 100)
plt.plot(x, 2 * x + 1, label="y = 2x + 1")
plt.plot(x, -0.5 * x + 1, label="y = -0.5x + 1")
plt.axhline(0, color="gray", linewidth=0.5)
plt.axvline(0, color="gray", linewidth=0.5)
plt.legend()
plt.show()
```

## Derivational

*Why* is slope a useful concept?

A line's slope captures **how the variable $y$ changes per unit
change in $x$**. This is conceptually a **rate**:

- Distance vs time → speed.
- Cost vs quantity → unit cost.
- Temperature vs altitude → lapse rate.
- Output of a model vs input → linear sensitivity.

Slope generalises in calculus (Strand 4) to the **derivative** —
the slope of a curve at a single point, found by zooming in until
the curve looks straight. Lines are the *easy* case where the slope
is the same everywhere.

*Why* are perpendicular slopes negative reciprocals ($m_1 m_2 = -1$)?

Geometrically: rotating a vector by $90°$ sends $(a, b)$ to $(-b,
a)$ (anticlockwise) or $(b, -a)$ (clockwise). A line with slope $m$
has direction vector $(1, m)$. Rotating gives $(-m, 1)$ or $(m, -1)$
— direction vectors of perpendicular lines. Their slopes are
$\tfrac{1}{-m} = -\tfrac{1}{m}$.

So $m_2 = -\tfrac{1}{m_1}$, equivalent to $m_1 m_2 = -1$. (Strand 3
Intermediate develops vector rotations formally.)

## Connective

Lines are the simplest curves and the building blocks for everything
else:

- **Distance formula** (Lesson 01): the segment between two points
  has length given by Pythagoras. The line itself is **the entire
  set** of points colinear with those two.
- **Triangles** (Lesson 03): three lines form a triangle (if not
  parallel). Triangle angle sums use slope properties.
- **Calculus** (Strand 4): the derivative of a function at a point
  is the slope of the **tangent line** there. Linear approximation
  is the foundation of differential calculus.
- **Linear algebra** (Strand 2): a line through the origin is a
  $1$-dimensional subspace of $\mathbb{R}^2$. Generalisation:
  hyperplanes in $\mathbb{R}^n$.
- **Linear regression** (Strand 6 Advanced): fitting the "best line"
  through scattered data — minimise the sum of squared distances
  from data points to the line.

## Applied

- **Linear regression**: $y = mx + b$ fitted to data points. The
  best $m$ and $b$ are computed by minimising squared error
  (Pythagoras squared distance — back to Lesson 01).
- **Bresenham's line algorithm**: how computers draw straight
  lines on a pixel grid. Uses integer arithmetic to avoid floating
  point — same slope formula, just in integers.
- **Trajectories in games**: a projectile launched at velocity $(v_x,
  v_y)$ moves along the line $y = (v_y/v_x) x$ in the absence of
  gravity. With gravity, the path becomes parabolic (Strand 4).
- **Break-even analysis**: revenue line $R = px$ vs cost line $C =
  fx + c$ (where $f$ is per-unit cost and $c$ is fixed cost). The
  intersection — where $R = C$ — is the break-even quantity.
  $px = fx + c$, so $x = c/(p - f)$.
- **Climate / weather**: temperature drops about $6.5°\text{C}$ per
  $1000$ m of elevation in the troposphere — a slope-$-6.5$ line.
  Knowing this, you can estimate mountain-top temperatures from the
  base-station reading.

## Check Your Understanding

:::widget type=numeric-input prompt="A line passes through $(2, 1)$ and $(5, 7)$. What is its slope?" answer=2 explain="$m = \\dfrac{7 - 1}{5 - 2} = \\dfrac{6}{3} = 2$.":::

:::widget type=numeric-input prompt="A line has slope $-3$ and passes through $(0, 5)$. What is the $y$-value when $x = 4$?" answer=-7 explain="$y = -3x + 5$, so $y(4) = -12 + 5 = -7$.":::

:::widget type=numeric-input prompt="Lines $y = 3x + 1$ and $y = mx + 4$ are perpendicular. What is $m$? (Type the decimal — note: it's negative.)" answer=-0.333 tolerance=0.01 explain="$m_1 \\cdot m_2 = -1$, so $m = -\\dfrac{1}{3} \\approx -0.333$.":::

:::widget type=numeric-input prompt="A taxi charges $\\$3$ initial fare plus $\\$2$ per km. Write the cost as $y = mx + b$ — what is $m$?" answer=2 explain="Cost increases by $\\$2$ per km, so the slope is $2$. $b = 3$ (the initial fare). $y = 2x + 3$.":::
