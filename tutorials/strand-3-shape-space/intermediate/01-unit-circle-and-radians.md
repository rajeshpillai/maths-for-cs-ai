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

## Explain Like I Am 7

Imagine a teeny ant walking around a hula hoop of width one.  As the
ant walks, you can write down two things: how far right it is from
the centre, and how far up.  Those two numbers wiggle between -1
and +1 in a smooth, repeating dance — that's **cosine** and **sine**
all the way around the circle, even past the top and bottom.  And
instead of measuring the ant's progress in degrees, we measure how
much *string* it has walked along the hoop; that's a **radian**.

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

### Worked examples (NCERT-style)

**Example 1 — degree to radian.** Convert $40°20'$ to radians.

$1' = 1/60°$, so $20' = 1/3°$. Total: $40 + 1/3 = 121/3°$.

$$\theta_{\text{rad}} = \tfrac{121}{3} \cdot \tfrac{\pi}{180} = \tfrac{121\pi}{540} \text{ rad}.$$

**Example 2 — arc length.** A wheel of radius 25 cm rolls so that
a point traces an arc of 30 cm. Find the angle swept (radians and
degrees).

$\theta = \ell/r = 30/25 = 1.2$ rad.

In degrees: $1.2 \cdot 180/\pi \approx 68.75°$.

**Example 3 — minute hand of a clock.** Through what angle (in
radians) does a minute hand sweep in 40 min?

A full revolution = 60 min = $2\pi$ rad. So 40 min sweeps
$\tfrac{40}{60} \cdot 2\pi = \tfrac{4\pi}{3}$ rad $= 240°$.

**Example 4 — coterminal-angle reduction.** Find $\sin\tfrac{19\pi}{3}$.

Reduce modulo $2\pi$: $\tfrac{19\pi}{3} = 6\pi + \tfrac{\pi}{3}$,
so $\tfrac{19\pi}{3}$ is coterminal with $\tfrac{\pi}{3}$.
Therefore $\sin\tfrac{19\pi}{3} = \sin\tfrac{\pi}{3} = \tfrac{\sqrt{3}}{2}$.

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
- **Board Exam / JEE (CBSE Class 11, Chapter 3 — Trigonometric
  Functions)** — NCERT Ex 3.1 drills degree ↔ radian conversion
  ($\theta_{\text{rad}} = \theta_{\text{deg}} \cdot \pi/180$) and
  the arc-length formula $\ell = r\theta$ (with $\theta$ in
  radians). High-weightage JEE setups: minute-hand sweep angle in a
  given time, finding $\theta$ from $\ell$ and $r$, computing trig
  values for angles like $\tfrac{19\pi}{3}$ via reduction modulo
  $2\pi$. Pitfall: writing "$2$" without a degree symbol means
  **2 radians** — NCERT explicitly flags this.

## Check Your Understanding

:::widget type=numeric-input prompt="Convert $60°$ to radians. Type the decimal rounded to 4 dp." answer=1.0472 tolerance=0.001 explain="$\\pi/3 \\approx 1.0472$.":::

:::widget type=numeric-input prompt="$\\sin(\\pi) = ?$" answer=0 explain="Half-turn position is $(-1, 0)$.":::

:::widget type=numeric-input prompt="$\\cos(-\\pi/2) = ?$" answer=0 explain="Cosine is even: $\\cos(-\\pi/2) = \\cos(\\pi/2) = 0$.":::

:::widget type=numeric-input prompt="The arc length on a unit circle subtended by an angle of $\\pi/4$ is..." answer=0.7854 tolerance=0.001 explain="Same as the angle in radians on a unit circle: $\\pi/4 \\approx 0.7854$.":::
