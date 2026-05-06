---
strand: shape-space
level: intermediate
order: 6
title: Conic Sections — Ellipse and Parabola
prerequisites:
  - tier: strand-3-shape-space-foundation
    slug: 06-circles-and-pi
    description: Circles
connections:
  - strand-3-shape-space-intermediate/07-conics-hyperbola
applications:
  - cs: "Curve fitting, parabolic trajectories in games"
  - business: "Antenna and reflector design"
  - games: "Projectile arcs, satellite orbits"
  - life: "Planetary orbits (ellipses), satellite dishes (parabolas)"
---

# Conic Sections — Ellipse and Parabola

## Explain Like I Am 7

Take a pointy ice-cream cone and slice it cleanly with a knife.
Slice it flat across — you get a perfect circle.  Tilt the knife a
little — you get a stretched circle, an **ellipse**, the shape
planets trace around the Sun.  Tilt the knife so it's parallel to
the cone's slope — out pops a **parabola**, the same arc a
fountain of water makes.  Three different cake-cuts, three different
curves, all hidden inside the same simple cone.

## Mental

A **conic section** is what you get by slicing a cone with a plane.
The four resulting curves are:

- **Circle**: cut perpendicular to axis.
- **Ellipse**: cut at an angle, but not too steep.
- **Parabola**: cut parallel to a slant edge.
- **Hyperbola**: cut at a steep angle (intersects both nappes).

(Lesson 06 covers ellipse + parabola; Lesson 07 covers hyperbola.)

## Ellipse

An **ellipse** is the set of points whose **sum of distances** from
two fixed points (the **foci**) is constant.

Equation (centred at origin):

$$
\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1.
$$

$a$ is the semi-major axis, $b$ the semi-minor axis. Foci are at
$(\pm c, 0)$ where $c = \sqrt{a^2 - b^2}$.

A circle is the special case $a = b$.

## Parabola

A **parabola** is the set of points equidistant from a fixed point
(the **focus**) and a fixed line (the **directrix**).

Standard form (axis along $y$-axis, opening upward):

$$
y = \frac{x^2}{4p},
$$

where $p$ is the distance from vertex to focus.

For $y = x^2$: $4p = 1$, so $p = 1/4$. Focus at $(0, 1/4)$.

Parabolas have a famous **reflection property**: rays parallel to the
axis bounce off the parabola and converge at the focus. (This is why
satellite dishes and headlight reflectors are parabolic.)

## Interactive

:::widget type=numeric-input prompt="An ellipse $x^2/25 + y^2/9 = 1$. Semi-major axis?" answer=5 explain="$a^2 = 25 \\Rightarrow a = 5$.":::

:::widget type=numeric-input prompt="Same ellipse: distance from centre to focus, $c = \\sqrt{a^2 - b^2}$. $c = ?$" answer=4 explain="$\\sqrt{25 - 9} = 4$.":::

:::widget type=numeric-input prompt="The parabola $y = x^2/8$. The value $4p = 8$, so $p = ?$" answer=2 explain="Focus distance is $2$.":::

:::widget type=numeric-input prompt="Ellipse with $a = 10, b = 6$. Eccentricity $e = c/a$ where $c = \\sqrt{100 - 36} = 8$. $e = ?$" answer=0.8 explain="$8/10 = 0.8$.":::

## Symbolic

**Ellipse** centred at origin:

$$
\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1.
$$

Foci at $(\pm c, 0)$ with $c = \sqrt{a^2 - b^2}$ (assuming $a \ge b$).

**Eccentricity** $e = c/a$, $0 \le e < 1$ for ellipses ($e = 0$ is
circle, $e \to 1$ is degenerate).

**Parabola** with vertex at origin, axis along $y$:

$$
y = \frac{x^2}{4p}.
$$

Focus at $(0, p)$, directrix $y = -p$.

For axis along $x$: $x = \frac{y^2}{4p}$, focus at $(p, 0)$.

## Computational

```python
import numpy as np
import matplotlib.pyplot as plt

# Plot an ellipse and a parabola
t = np.linspace(0, 2 * np.pi, 100)
a, b = 5, 3
x_e = a * np.cos(t)
y_e = b * np.sin(t)

x_p = np.linspace(-3, 3, 100)
y_p = x_p ** 2 / 4

# plt.plot(x_e, y_e, label="ellipse")
# plt.plot(x_p, y_p, label="parabola")
# plt.axis("equal")
# plt.legend(); plt.grid(); plt.show()
```

## Applied

- **Planetary orbits**: Kepler's laws (1609). Planets follow ellipses
  with the Sun at one focus. Mercury's eccentricity is $0.21$, Earth's
  $0.017$ (nearly circular), Mars's $0.09$.
- **Satellite dishes**: parabolic shape focuses incoming parallel
  signals at the LNB.
- **Headlights / spotlights**: parabolic reflector with bulb at the
  focus produces parallel beam.
- **Projectile motion** under gravity: a parabola (in the
  no-air-resistance ideal).

## Check Your Understanding

:::widget type=numeric-input prompt="Ellipse $x^2/16 + y^2/9 = 1$. Semi-major $a = ?$" answer=4 explain="$a = \\sqrt{16} = 4$.":::

:::widget type=numeric-input prompt="Same ellipse: $c = \\sqrt{16 - 9} = ?$ Round to 3 dp." answer=2.646 tolerance=0.005 explain="$\\sqrt 7 \\approx 2.646$.":::

:::widget type=numeric-input prompt="Parabola $y = x^2/12$. $p$ value (focus distance from vertex)?" answer=3 explain="$4p = 12 \\Rightarrow p = 3$.":::

:::widget type=numeric-input prompt="Earth's orbital eccentricity $\\approx 0.017$. Closer to $0$ (circle) or $1$ (parabola)?" answer=0 explain="Closer to $0$ → nearly circular orbit.":::
