---
strand: shape-space
level: foundation
order: 8
title: Transformations — Translate, Rotate, Reflect, Scale
prerequisites:
  - tier: strand-3-shape-space-foundation
    slug: 07-similarity-and-scaling
    description: Similarity and scaling
connections:
  - strand-1-number-quantity-intermediate/09-complex-numbers
applications:
  - cs: "2D/3D graphics transforms, image rotation, animation"
  - business: "Logo design rotations; layout symmetries"
  - games: "Sprite movement, camera rotation, character animation"
  - life: "Origami folds, mirror reflections, recipe scaling for groups"
---

# Transformations — Translate, Rotate, Reflect, Scale

## Mental

A **transformation** is a rule that maps every point in the plane to
a new point. The most important four:

| Transformation | What it does | Preserves |
|---|---|---|
| **Translation** | shift by a vector $(a, b)$ | size, shape, orientation |
| **Rotation** | turn around a fixed point by angle $\theta$ | size, shape, orientation |
| **Reflection** | flip across a line | size, shape, *orientation reversed* |
| **Scaling** | shrink/stretch from a fixed point by factor $k$ | shape, *not size* |

The first three (translation, rotation, reflection) are called
**rigid motions** or **isometries**: they preserve distances. Two
shapes related by a rigid motion are **congruent**.

Scaling is **not** rigid (changes size). Combined with rotations and
translations, scaling produces **similarity transformations** —
shapes related this way are **similar** (Lesson 07).

A general transformation can be **composed** from these: e.g. "rotate
by $45°$, then translate by $(3, 1)$" is a single transformation
that is the composition of two simpler ones.

## How they act on coordinates

The transformations have clean coordinate descriptions.

**Translation** by $(a, b)$:

$$
(x, y) \to (x + a, y + b).
$$

**Rotation** by angle $\theta$ around the origin:

$$
(x, y) \to (x \cos\theta - y \sin\theta, \, x \sin\theta + y \cos\theta).
$$

(This is one of the most useful formulas in computer graphics. Strand
3 Intermediate develops trigonometry; for now just note it exists.)

For special angles:

- $\theta = 90°$: $(x, y) \to (-y, x)$.
- $\theta = 180°$: $(x, y) \to (-x, -y)$.
- $\theta = 270°$: $(x, y) \to (y, -x)$.

**Reflection** across the $x$-axis: $(x, y) \to (x, -y)$.
Across the $y$-axis: $(x, y) \to (-x, y)$.
Across the line $y = x$: $(x, y) \to (y, x)$.

**Scaling** from origin by factor $k$:

$$
(x, y) \to (k x, k y).
$$

## Interactive

Here's a triangle and its image after a $90°$ counter-clockwise
rotation about the origin.

:::widget type=coordinate-plane points=[{"x":2,"y":1,"label":"A"},{"x":4,"y":1,"label":"B"},{"x":4,"y":3,"label":"C"},{"x":-1,"y":2,"label":"A'"},{"x":-1,"y":4,"label":"B'"},{"x":-3,"y":4,"label":"C'"}] segments=[{"from":0,"to":1},{"from":1,"to":2},{"from":2,"to":0},{"from":3,"to":4},{"from":4,"to":5},{"from":5,"to":3}] xMin=-5 xMax=5 yMin=-1 yMax=5:::

Original $A = (2, 1)$. After rotating by $90°$: $A' = (-1, 2)$ — by
the rule $(x, y) \to (-y, x)$.

:::widget type=numeric-input prompt="Apply translation $(3, 2)$ to point $(1, 4)$. Type the new $x$." answer=4 explain="$(1 + 3, 4 + 2) = (4, 6)$. New $x$ is $4$.":::

:::widget type=numeric-input prompt="Apply translation $(3, 2)$ to point $(1, 4)$. Type the new $y$." answer=6 explain="New $y$ is $6$.":::

:::widget type=numeric-input prompt="Reflect $(3, 5)$ across the $x$-axis. Type the new $y$." answer=-5 explain="$(x, y) \\to (x, -y)$: $(3, 5) \\to (3, -5)$. New $y$ is $-5$.":::

:::widget type=numeric-input prompt="Rotate $(2, 0)$ by $90°$ counter-clockwise about the origin. Type the new $x$." answer=0 explain="Rule: $(x, y) \\to (-y, x)$. $(2, 0) \\to (0, 2)$.":::

:::widget type=numeric-input prompt="Rotate $(2, 0)$ by $180°$ about the origin. Type the new $x$." answer=-2 explain="$(x, y) \\to (-x, -y)$. $(2, 0) \\to (-2, 0)$.":::

:::widget type=step-revealer
{
  "title": "Composing transformations: rotate, then translate",
  "steps": [
    {"prose": "Take point $P = (3, 1)$. We'll rotate by $90°$ counter-clockwise, then translate by $(2, 5)$."},
    {"math": "P = (3, 1) \\xrightarrow{R_{90}} (-1, 3)", "prose": "Apply rotation: $(x, y) \\to (-y, x)$. So $(3, 1) \\to (-1, 3)$."},
    {"math": "(-1, 3) \\xrightarrow{T_{(2, 5)}} (1, 8)", "prose": "Apply translation: $(x, y) \\to (x + 2, y + 5)$. So $(-1, 3) \\to (1, 8)$."},
    {"math": "P_{\\text{final}} = (1, 8)", "prose": "**Order matters**: rotating-then-translating gives a different result from translating-then-rotating in general."},
    {"prose": "Let's check: translate first, then rotate. $(3, 1) \\to (5, 6)$, then rotate $\\to (-6, 5)$. Different! The non-commutativity of composed transformations is fundamental."}
  ]
}
:::

## Symbolic

In matrix form (Strand 2), all rotations, reflections, and scalings
become $2 \times 2$ matrix multiplications:

$$
R_\theta = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}, \quad S_k = \begin{pmatrix} k & 0 \\ 0 & k \end{pmatrix}.
$$

Translations need an extra trick — **homogeneous coordinates**, where
points $(x, y)$ become $3$-vectors $(x, y, 1)$. Then translations
become $3 \times 3$ matrix multiplications too. Strand 2 Intermediate
develops this; it's the foundation of every 2D and 3D graphics
engine.

The set of all rigid motions of the plane forms a **group** (Strand
2 Master) called $\text{ISO}(2)$. Composing two rigid motions gives
another rigid motion; every rigid motion has an inverse. **Group
theory** is the abstract study of these symmetry structures.

## Computational

```python
import math

def translate(p, dx, dy):
    return (p[0] + dx, p[1] + dy)

def rotate(p, theta_degrees):
    theta = math.radians(theta_degrees)
    c, s = math.cos(theta), math.sin(theta)
    x, y = p
    return (x * c - y * s, x * s + y * c)

def reflect_x(p):
    return (p[0], -p[1])

def reflect_y(p):
    return (-p[0], p[1])

def scale(p, k):
    return (p[0] * k, p[1] * k)

# Compose: rotate then translate
P = (3, 1)
P1 = rotate(P, 90)
P2 = translate(P1, 2, 5)
print(P2)   # (1.0, 8.0)

# Compose other order
P1 = translate(P, 2, 5)
P2 = rotate(P1, 90)
print(P2)   # (-6.0, 5.0)
```

NumPy / matrix-based form for many points at once:

```python
import numpy as np

def rotate_matrix(theta_deg):
    theta = np.radians(theta_deg)
    return np.array([[np.cos(theta), -np.sin(theta)],
                     [np.sin(theta),  np.cos(theta)]])

points = np.array([[2, 1], [4, 1], [4, 3]])    # triangle vertices
R = rotate_matrix(90)
rotated = points @ R.T   # apply rotation
print(rotated)
```

This same matrix algebra runs on GPUs, doing millions of vertex
transformations per frame in modern games.

## Derivational

*Why* are rigid motions distance-preserving?

**Translation** clearly preserves distance — every point moves the
same vector, so the differences (which are the distances) are
unchanged.

**Rotation** preserves distance because rotating two points by the
same angle preserves the Pythagorean distance — rotating $(x, y)$
to $(x', y')$ keeps $x^2 + y^2 = x'^2 + y'^2$ (the distance from the
origin), and similarly for any pair.

**Reflection** is a $180°$ rotation about a line — same argument.

The deeper fact (proved with linear algebra, Strand 2): the only
distance-preserving linear transformations of $\mathbb{R}^2$ are
rotations and reflections. **Anything that preserves distance is a
combination of these and translations.**

## Connective

Transformations connect to:

- **Lesson 09 (Capstone)**: real geometric problems often need
  combining transformations.
- **Complex numbers** (Strand 1 Intermediate Lesson 09):
  multiplication by a complex number of modulus $1$ is rotation by
  its argument. Multiplication by $i$ is rotation by $90°$ — exactly
  the rule $(x, y) \to (-y, x)$.
- **Linear algebra** (Strand 2): rotations are matrices. The full
  story is "any linear transformation of $\mathbb{R}^2$" → there are
  more than just rotations and scalings (think shears).
- **Computer graphics** (Strand 7 Master): every pixel transformation
  in your game or photo editor is a coordinate-transformation
  problem.
- **Group theory** (Strand 2 Master): the rigid motions form a group;
  symmetries of a shape form a *subgroup*. The crystallographic
  groups in chemistry are a major application.

## Applied

- **Game sprite movement**: rotating a character sprite uses the
  rotation formula above (or matrix form). Modern engines do this on
  the GPU.
- **Image processing**: rotating a photo applies the rotation matrix
  to every pixel position. Photoshop's "rotate canvas" is exactly
  this.
- **CAD / mechanical engineering**: parts are designed in their
  natural orientation, then transformed (translated and rotated)
  into assembled positions.
- **Robotics**: a robot arm's end-effector position is computed by
  composing rotations at each joint. The "forward kinematics" is a
  product of rotation matrices, one per joint.
- **Origami**: each fold is a reflection across the crease line. The
  art of origami is a deep application of compositions of reflections.
- **Tessellations / wallpaper patterns**: the $17$ wallpaper groups
  classify all repeating planar patterns by their symmetries.

## Check Your Understanding

:::widget type=numeric-input prompt="Translate $(2, -3)$ by $(5, 4)$. Type the new $y$." answer=1 explain="$(2+5, -3+4) = (7, 1)$. New $y$ is $1$.":::

:::widget type=numeric-input prompt="Reflect $(4, 7)$ across the $y$-axis. Type the new $x$." answer=-4 explain="$(x, y) \\to (-x, y)$. So $(4, 7) \\to (-4, 7)$.":::

:::widget type=numeric-input prompt="Rotate $(0, 5)$ by $180°$ about the origin. Type the new $y$." answer=-5 explain="$(x, y) \\to (-x, -y)$. So $(0, 5) \\to (0, -5)$.":::

:::widget type=numeric-input prompt="Scale $(3, -2)$ by factor $4$ from origin. Type the new $x$." answer=12 explain="$(x, y) \\to (4x, 4y)$. So $(3, -2) \\to (12, -8)$.":::
