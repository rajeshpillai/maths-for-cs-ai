---
strand: shape-space
level: intermediate
order: 0
title: Right-Triangle Trigonometry
prerequisites:
  - tier: strand-3-shape-space-foundation
    slug: 04-triangle-theorems
    description: Triangle similarity
  - tier: strand-1-number-quantity-intermediate
    slug: 07-surds-and-exact-arithmetic
    description: Surds (for exact trig values)
connections:
  - strand-3-shape-space-intermediate/01-unit-circle-and-radians
applications:
  - cs: "2D rotations, screen-coordinate orientation"
  - business: "Surveying, triangulation"
  - games: "Aim direction, projectile angles"
  - life: "Roof pitch, ladder-against-wall, compass bearings"
---

# Right-Triangle Trigonometry

## Explain Like I Am 7

Lean a ladder against a wall.  No matter how long the ladder is, if
the angle between the ladder and the ground is the same, the *ratio*
of "how high it touches" to "how long the ladder is" never changes.
That hidden ratio has a name: **sine**.  There are two more siblings,
**cosine** and **tangent**, that compare the other pairs of sides.
With these three little ratios you can figure out the height of a
tree without ever climbing it — just measure one angle and one side.

## Mental

For a right triangle with one acute angle $\theta$, the three side
ratios are constant for all triangles **similar** to it (Strand 3
Foundation Lesson 04). These ratios get names:

```
                 /|
                / |
       hyp     /  |
              /   |   opp (opposite to θ)
             /    |
            /  θ  |
           +------+
              adj (adjacent to θ)
```

$$
\sin\theta = \frac{\text{opposite}}{\text{hypotenuse}}, \quad
\cos\theta = \frac{\text{adjacent}}{\text{hypotenuse}}, \quad
\tan\theta = \frac{\text{opposite}}{\text{adjacent}}.
$$

The mnemonic **SOH-CAH-TOA** captures all three. Three more,
infrequently used:

$$
\csc\theta = \frac{1}{\sin\theta}, \quad \sec\theta = \frac{1}{\cos\theta}, \quad \cot\theta = \frac{1}{\tan\theta}.
$$

These ratios depend **only on the angle**, not the triangle's size —
because all right triangles with a given acute angle are similar.

## Special angles

Three angles have memorable exact ratios — derived from the
$30°$-$60°$-$90°$ and $45°$-$45°$-$90°$ "special triangles":

| $\theta$ | $\sin$ | $\cos$ | $\tan$ |
|---|---|---|---|
| $0°$ | $0$ | $1$ | $0$ |
| $30°$ | $1/2$ | $\sqrt{3}/2$ | $1/\sqrt{3}$ |
| $45°$ | $\sqrt{2}/2$ | $\sqrt{2}/2$ | $1$ |
| $60°$ | $\sqrt{3}/2$ | $1/2$ | $\sqrt{3}$ |
| $90°$ | $1$ | $0$ | undefined |

Worth memorising. They appear constantly.

## Interactive

:::widget type=numeric-input prompt="$\\sin 30° = ?$ — type the decimal." answer=0.5 explain="$1/2$.":::

:::widget type=numeric-input prompt="$\\cos 60° = ?$ — type the decimal." answer=0.5 explain="$1/2$.":::

:::widget type=numeric-input prompt="$\\tan 45° = ?$" answer=1 explain="$\\sin 45 / \\cos 45 = 1$.":::

:::widget type=numeric-input prompt="A right triangle has hypotenuse $10$ and one acute angle $30°$. The side opposite this angle is $\\sin 30° \\cdot 10 = ?$" answer=5 explain="$0.5 \\cdot 10 = 5$.":::

:::widget type=numeric-input prompt="A ramp rises $2$ m over a horizontal run of $5$ m. The angle of the ramp is $\\arctan(2/5) \\approx ?$ degrees, rounded to nearest integer." answer=22 explain="$\\arctan(0.4) \\approx 21.8° \\approx 22°$.":::

## Symbolic

For any right triangle:

$$
\sin\theta = \frac{a}{c}, \quad \cos\theta = \frac{b}{c}, \quad \tan\theta = \frac{a}{b},
$$

where $a$ is opposite, $b$ adjacent, $c$ hypotenuse.

The **Pythagorean identity** (from $a^2 + b^2 = c^2$ divided by $c^2$):

$$
\sin^2\theta + \cos^2\theta = 1.
$$

This holds for **all** $\theta$ — not just acute angles (will be true
for the unit-circle generalisation in Lesson 01).

Other useful identities:

$$
\tan\theta = \frac{\sin\theta}{\cos\theta}.
$$

Inverse functions: $\arcsin, \arccos, \arctan$ (also written
$\sin^{-1}, \cos^{-1}, \tan^{-1}$). They return the angle given the
ratio.

## Computational

```python
import math

# Note: math uses radians, not degrees!
print(math.sin(math.radians(30)))   # 0.5
print(math.cos(math.radians(60)))   # 0.5
print(math.tan(math.radians(45)))   # 0.9999... (floating-point near 1)

# Inverse
print(math.degrees(math.asin(0.5)))   # 30.0
print(math.degrees(math.atan(0.4)))   # 21.8

# Verify Pythagorean identity
theta = 35
s = math.sin(math.radians(theta))
c = math.cos(math.radians(theta))
print(s ** 2 + c ** 2)   # 0.9999... (≈ 1)
```

## Applied

- **Triangulation**: surveyors and GPS systems compute distances by
  measuring angles between sightlines and using trig.
- **Game pathfinding**: NPC aim direction is $\arctan(\Delta y /
  \Delta x)$.
- **Architecture**: roof pitch in degrees translates to a "rise
  over run" via tangent.
- **Ladder-against-wall**: a $5$ m ladder at $75°$ reaches $5 \sin
  75° \approx 4.83$ m up the wall.

## Check Your Understanding

:::widget type=numeric-input prompt="A right triangle: opposite $3$, adjacent $4$, hypotenuse $5$. $\\sin\\theta = ?$ Type the decimal." answer=0.6 explain="$3/5$.":::

:::widget type=numeric-input prompt="$\\cos\\theta$ in the same triangle?" answer=0.8 explain="$4/5$.":::

:::widget type=numeric-input prompt="$\\sin^2\\theta + \\cos^2\\theta$ in the same triangle (verify)?" answer=1 explain="$0.36 + 0.64 = 1$.":::

:::widget type=numeric-input prompt="$\\tan(60°) = ?$ — type the decimal rounded to 4 dp." answer=1.7321 tolerance=0.001 explain="$\\sqrt 3 \\approx 1.7321$.":::
