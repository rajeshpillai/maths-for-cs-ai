---
strand: shape-space
level: intermediate
order: 8
title: Polar Coordinates
prerequisites:
  - tier: strand-3-shape-space-intermediate
    slug: 01-unit-circle-and-radians
    description: Unit circle
connections:
  - strand-3-shape-space-intermediate/09-3d-geometry-capstone
applications:
  - cs: "Game AI angular search, radial distributions"
  - business: "Radial heat maps"
  - games: "Radar displays, character orientation"
  - life: "Compass bearings, weather radar"
---

# Polar Coordinates

## Mental

The **polar** coordinate system identifies a 2D point by its
**distance** from the origin and its **angle** from the positive
$x$-axis:

$$
(r, \theta) \quad \text{instead of} \quad (x, y).
$$

$r \ge 0$ is the radius, $\theta$ is the polar angle (in radians by
convention).

**Conversion**:

$$
x = r \cos\theta, \quad y = r \sin\theta.
$$

$$
r = \sqrt{x^2 + y^2}, \quad \theta = \text{atan2}(y, x).
$$

(`atan2` is `arctan` with quadrant awareness — gives the right angle
across all four quadrants.)

Polar coordinates are perfect for problems with **rotational
symmetry**: circles, spirals, orbits, radial heat maps.

## Polar curves

Some shapes are simple in polar but messy in Cartesian:

- **Circle** centred at origin, radius $a$: $r = a$. (Single
  equation, no $x$ or $y$.)
- **Spiral of Archimedes**: $r = a\theta$ — radius grows linearly
  with angle.
- **Cardioid**: $r = a(1 + \cos\theta)$ — heart shape.
- **Rose curves**: $r = a \cos(k\theta)$ — $k$ petals (or $2k$ for
  $k$ even).

These curves are awkward in $(x, y)$ form but a single line in
polar.

## Interactive

:::widget type=numeric-input prompt="Convert $(x, y) = (3, 4)$ to polar. $r = ?$" answer=5 explain="$\\sqrt{9 + 16} = 5$.":::

:::widget type=numeric-input prompt="Same: $\\theta = \\arctan(4/3) \\approx ?$ degrees, rounded to nearest." answer=53 explain="$\\arctan(4/3) \\approx 53.13°$.":::

:::widget type=numeric-input prompt="Convert $(r, \\theta) = (5, \\pi)$ to Cartesian. $x = 5 \\cos\\pi = ?$" answer=-5 explain="$\\cos\\pi = -1$, so $x = -5$.":::

:::widget type=numeric-input prompt="Same: $y = 5 \\sin\\pi = ?$" answer=0 explain="$\\sin\\pi = 0$.":::

:::widget type=numeric-input prompt="Spiral $r = \\theta$ at $\\theta = 2\\pi$ (one full turn). $r = ?$ Round 4 dp." answer=6.2832 tolerance=0.001 explain="$2\\pi \\approx 6.2832$.":::

## Symbolic

Conversion equations:

$$
x = r \cos\theta, \quad y = r \sin\theta,
$$

$$
r = \sqrt{x^2 + y^2}, \quad \theta = \text{atan2}(y, x).
$$

**Area in polar**: the area enclosed by a polar curve $r(\theta)$
between angles $\alpha$ and $\beta$ is

$$
A = \frac{1}{2} \int_\alpha^\beta r^2 \, d\theta.
$$

(Calculus, Strand 4 Intermediate.)

**3D extensions**:

- **Cylindrical**: $(r, \theta, z)$ — polar plus height.
- **Spherical**: $(r, \theta, \phi)$ — radius + two angles. Used
  for sphere-symmetric problems (atomic orbitals, planetary motion).

## Computational

```python
import math
import numpy as np

def to_polar(x, y):
    r = math.hypot(x, y)
    theta = math.atan2(y, x)
    return r, theta

def to_cartesian(r, theta):
    return r * math.cos(theta), r * math.sin(theta)

print(to_polar(3, 4))                # (5.0, 0.927)
print(to_cartesian(5, math.pi))      # (-5.0, ...)

# Plot a rose curve r = cos(3θ)
t = np.linspace(0, 2 * np.pi, 200)
r = np.cos(3 * t)
x = r * np.cos(t)
y = r * np.sin(t)
# plt.plot(x, y); plt.axis("equal"); plt.show()
```

## Applied

- **Radar / sonar**: returns are naturally polar — distance and
  bearing.
- **Computer graphics**: rotational effects (camera spin, particle
  systems with angular velocity) are easier in polar.
- **Astronomy**: orbits described in polar form (Kepler's law: $r =
  \frac{a(1 - e^2)}{1 + e \cos\theta}$).
- **Music waveforms**: circle of fifths is a polar visualisation.

## Check Your Understanding

:::widget type=numeric-input prompt="$(r, \\theta) = (4, \\pi/2)$. $x = ?$" answer=0 explain="$4 \\cos(\\pi/2) = 0$.":::

:::widget type=numeric-input prompt="Same: $y = ?$" answer=4 explain="$4 \\sin(\\pi/2) = 4$.":::

:::widget type=numeric-input prompt="Convert $(0, -3)$ to polar. $r = ?$" answer=3 explain="$\\sqrt 9 = 3$.":::

:::widget type=numeric-input prompt="Same: $\\theta = -\\pi/2$ or $3\\pi/2$ (depending on convention). Type the decimal of $-\\pi/2$ rounded to 4 dp." answer=-1.5708 tolerance=0.001 explain="$-\\pi/2 \\approx -1.5708$.":::
