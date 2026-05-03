---
strand: shape-space
level: intermediate
order: 1
title: The Unit Circle and Radians
prerequisites:
  - tier: strand-3-shape-space-intermediate
    slug: 00-right-triangle-trig
    description: Right-triangle trig
connections:
  - strand-3-shape-space-intermediate/02-trig-identities
  - strand-3-shape-space-foundation/06-circles-and-pi
applications:
  - cs: "Rotations in graphics, game-engine math"
  - games: "Circular movement, orbital simulations"
  - life: "Clock faces, navigation compass bearings"
---

# The Unit Circle and Radians

## Mental

The right-triangle trig from Lesson 00 only handles acute angles ($0°
< \theta < 90°$). To extend to **any** angle (including negative,
beyond $360°$), we use the **unit circle**.

Place a unit-radius circle at the origin. For an angle $\theta$
measured counter-clockwise from the positive $x$-axis, the point on
the circle has coordinates

$$
(\cos\theta, \sin\theta).
$$

This **defines** sine and cosine for any $\theta$. For acute $\theta$,
this matches the right-triangle definitions (the triangle is the one
between the angle and the $x$-axis).

For non-acute angles:

- $\theta = 90°$: $(0, 1)$ → $\cos 90° = 0, \sin 90° = 1$.
- $\theta = 180°$: $(-1, 0)$ → $\cos 180° = -1, \sin 180° = 0$.
- $\theta = 270°$: $(0, -1)$.
- $\theta = 360°$: back to $(1, 0)$.

Sine and cosine are **periodic** with period $360°$ (or $2\pi$ in
radians).

## Radians

**Radians** measure angle as the **arc length** subtended on a unit
circle. A full circle has circumference $2\pi$, so a full turn is
$2\pi$ radians.

| Degrees | Radians |
|---|---|
| $0$ | $0$ |
| $30$ | $\pi/6$ |
| $45$ | $\pi/4$ |
| $60$ | $\pi/3$ |
| $90$ | $\pi/2$ |
| $180$ | $\pi$ |
| $270$ | $3\pi/2$ |
| $360$ | $2\pi$ |

Conversion: $1° = \pi/180$ radians; $1$ rad $= 180/\pi \approx 57.3°$.

**Why radians?** They make calculus formulas clean:

$$
\frac{d}{d\theta} \sin\theta = \cos\theta, \quad \frac{d}{d\theta} \cos\theta = -\sin\theta,
$$

— but **only** if $\theta$ is in radians. In degrees, you'd need
ugly $\pi/180$ factors. Strand 4 develops calculus, where this matters.

## Interactive

:::widget type=coordinate-plane points=[{"x":1,"y":0,"label":"0°"},{"x":0.866,"y":0.5,"label":"30°"},{"x":0.707,"y":0.707,"label":"45°"},{"x":0.5,"y":0.866,"label":"60°"},{"x":0,"y":1,"label":"90°"},{"x":-1,"y":0,"label":"180°"},{"x":0,"y":-1,"label":"270°"}] xMin=-1.5 xMax=1.5 yMin=-1.5 yMax=1.5:::

The unit circle with key angle positions. Each labelled point has
coordinates $(\cos\theta, \sin\theta)$.

:::widget type=numeric-input prompt="$\\cos(180°) = ?$" answer=-1 explain="The point at angle $180°$ is $(-1, 0)$.":::

:::widget type=numeric-input prompt="$\\sin(270°) = ?$" answer=-1 explain="Point $(0, -1)$.":::

:::widget type=numeric-input prompt="$90°$ in radians? Type the decimal rounded to 4 dp." answer=1.5708 tolerance=0.001 explain="$\\pi / 2 \\approx 1.5708$.":::

:::widget type=numeric-input prompt="$2\\pi$ radians = ? degrees." answer=360 explain="A full turn.":::

:::widget type=numeric-input prompt="$\\cos(2\\pi) = \\cos(0) = ?$" answer=1 explain="Periodicity: $\\cos$ repeats every $2\\pi$.":::

## Symbolic

The unit-circle definitions:

$$
\cos\theta = x, \quad \sin\theta = y, \quad \text{for the point } (x, y) \text{ at angle } \theta.
$$

**Pythagorean identity** (from $x^2 + y^2 = 1$):

$$
\sin^2\theta + \cos^2\theta = 1, \quad \text{for all } \theta.
$$

**Periodicity**:

$$
\sin(\theta + 2\pi) = \sin\theta, \quad \cos(\theta + 2\pi) = \cos\theta.
$$

**Symmetry** (even/odd):

$$
\cos(-\theta) = \cos\theta \quad (\text{even}), \quad \sin(-\theta) = -\sin\theta \quad (\text{odd}).
$$

**Conversion**: $\theta_\text{rad} = \theta_\text{deg} \cdot \pi / 180$.

## Computational

```python
import math

# Python defaults to radians
print(math.sin(0))           # 0.0
print(math.cos(math.pi))     # -1.0 (with tiny float error)
print(math.sin(math.pi / 2))  # 1.0

# Convert
print(math.degrees(math.pi))  # 180.0
print(math.radians(180))      # 3.14159...

# Periodicity
print(math.sin(math.pi))                    # ≈ 0
print(math.sin(math.pi + 2 * math.pi))      # ≈ 0
print(math.sin(math.pi + 100 * math.pi))    # ≈ 0 (with floating-point error)
```

## Applied

- **Computer graphics**: rotation matrices use $\sin$ and $\cos$.
  Engine code is always in radians.
- **AC electrical signals**: voltage $V(t) = V_0 \sin(\omega t)$ with
  $\omega$ in rad/s.
- **Signal processing**: Fourier analysis (Strand 9) decomposes
  signals into sines and cosines.
- **Astronomy**: orbital positions are described via angle in
  radians swept per unit time.

## Check Your Understanding

:::widget type=numeric-input prompt="Convert $60°$ to radians. Type the decimal rounded to 4 dp." answer=1.0472 tolerance=0.001 explain="$\\pi/3 \\approx 1.0472$.":::

:::widget type=numeric-input prompt="$\\sin(\\pi) = ?$" answer=0 explain="Half-turn position is $(-1, 0)$.":::

:::widget type=numeric-input prompt="$\\cos(-\\pi/2) = ?$" answer=0 explain="Cosine is even: $\\cos(-\\pi/2) = \\cos(\\pi/2) = 0$.":::

:::widget type=numeric-input prompt="The arc length on a unit circle subtended by an angle of $\\pi/4$ is..." answer=0.7854 tolerance=0.001 explain="Same as the angle in radians on a unit circle: $\\pi/4 \\approx 0.7854$.":::
