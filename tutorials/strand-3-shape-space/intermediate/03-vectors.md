---
strand: shape-space
level: intermediate
order: 3
title: Vectors in 2D
prerequisites:
  - tier: strand-3-shape-space-foundation
    slug: 00-coordinate-plane
    description: Coordinate plane
connections:
  - strand-3-shape-space-intermediate/04-dot-product
applications:
  - cs: "Game-engine math, physics simulations, ML feature vectors"
  - games: "Velocity, position, force, displacement"
  - life: "Wind direction with speed, GPS displacement"
---

# Vectors in 2D

## Explain Like I Am 7

A point is just a *spot* on the floor — like an X marking buried
treasure.  A **vector** is more interesting: it's an *arrow*, with
a length and a direction, like the move "go three steps east and
two steps north."  You can stick two arrows tail-to-head to combine
moves, or stretch an arrow to make a longer move.  Vectors are
nature's instruction-cards for *getting from here to there*, and
they show up every time something has both speed and direction.

## Mental

A **vector** is a directed magnitude — an arrow with a length and
direction. In 2D, we represent it as an ordered pair $(x, y)$ — but
unlike a **point** (which is a position), a vector represents a
**displacement** or **direction**.

Two vectors are **equal** when they have the same components,
regardless of where they're "drawn." A vector $(3, 4)$ from the
origin is the same as a vector $(3, 4)$ from $(7, 7)$ — same
displacement, just different starting point.

**Notation**: $\vec{v}$, $\mathbf{v}$, or $v$ (boldface). Components:
$\mathbf{v} = (v_x, v_y)$ or $\begin{pmatrix} v_x \\ v_y \end{pmatrix}$.

**Magnitude** (length): $|\mathbf{v}| = \sqrt{v_x^2 + v_y^2}$ —
Pythagoras (Foundation Lesson 01).

**Direction**: angle $\theta = \arctan(v_y / v_x)$ from positive $x$-axis.

## Vector arithmetic

**Addition** (component-wise):

$$
(a, b) + (c, d) = (a + c, b + d).
$$

Geometrically: place arrows tip-to-tail.

**Scalar multiplication**:

$$
k (a, b) = (ka, kb).
$$

This **scales** the vector by $k$, possibly reversing direction if
$k < 0$.

**Subtraction**: $\mathbf{u} - \mathbf{v} = \mathbf{u} +
(-\mathbf{v})$.

A **unit vector** has magnitude $1$. To **normalise** $\mathbf{v}$,
divide by its magnitude:

$$
\hat{\mathbf{v}} = \frac{\mathbf{v}}{|\mathbf{v}|}.
$$

## Interactive

:::widget type=coordinate-plane points=[{"x":0,"y":0,"label":"O"},{"x":3,"y":4,"label":"A"},{"x":3,"y":0,"label":"B"}] segments=[{"from":0,"to":1,"label":"v"}] xMin=-1 xMax=5 yMin=-1 yMax=5:::

The vector $\mathbf{v} = (3, 4)$ from origin to $A$. Magnitude $5$
(by Pythagoras), direction $\arctan(4/3) \approx 53°$.

:::widget type=numeric-input prompt="$\\mathbf{u} = (1, 2), \\mathbf{v} = (3, -1)$. $\\mathbf{u} + \\mathbf{v} = (a, b)$. Type $a$." answer=4 explain="$1 + 3 = 4$.":::

:::widget type=numeric-input prompt="Same: $\\mathbf{u} + \\mathbf{v}$, type $b$." answer=1 explain="$2 + (-1) = 1$.":::

:::widget type=numeric-input prompt="$3 \\cdot (2, -5) = (a, b)$. Type $a$." answer=6 explain="$6, -15$.":::

:::widget type=numeric-input prompt="Magnitude of $(3, 4)$?" answer=5 explain="$\\sqrt{9 + 16} = 5$.":::

:::widget type=numeric-input prompt="Magnitude of $(5, 12)$?" answer=13 explain="$\\sqrt{25 + 144} = 13$. (Pythagorean triple.)":::

## Symbolic

A **vector space** $V$ is a set with addition and scalar
multiplication satisfying associativity, commutativity, identity,
inverse, and distributive laws (Strand 2 Intermediate develops the
formal definition).

For $\mathbb{R}^2$: vectors are 2-tuples; addition and scalar mult
component-wise.

**Magnitude**:

$$
|\mathbf{v}| = \sqrt{v_x^2 + v_y^2}, \quad \text{or in } n\text{D: } \sqrt{\sum_i v_i^2}.
$$

**Properties**:

$$
|\mathbf{u} + \mathbf{v}| \le |\mathbf{u}| + |\mathbf{v}| \quad \text{(triangle inequality)},
$$

$$
|k \mathbf{v}| = |k| \cdot |\mathbf{v}|.
$$

### Worked examples (NCERT-style)

**Example 1 — direction cosines.** Find the direction cosines of
the line joining $A(2, 3, 4)$ and $B(-1, 1, 2)$.

Direction ratios: $(-3, -2, -2)$. Magnitude:
$\sqrt{9 + 4 + 4} = \sqrt{17}$. Direction cosines:

$$\left(-\tfrac{3}{\sqrt{17}}, -\tfrac{2}{\sqrt{17}}, -\tfrac{2}{\sqrt{17}}\right).$$

Check: $\tfrac{9 + 4 + 4}{17} = 1$. ✓

**Example 2 — angle between two vectors.** Find the angle between
$\vec{a} = (1, 1, 1)$ and $\vec{b} = (-1, 2, -2)$.

$\vec{a} \cdot \vec{b} = -1 + 2 - 2 = -1$. $|\vec{a}| = \sqrt{3}$,
$|\vec{b}| = 3$.

$\cos\theta = -1/(3\sqrt{3}) \approx -0.192$, so
$\theta \approx 101.1°$.

**Example 3 — area of a parallelogram.** Find the area of the
parallelogram whose adjacent sides are
$\vec{a} = (1, 2, 4)$ and $\vec{b} = (3, -1, -2)$.

$\vec{a} \times \vec{b} = (2 \cdot (-2) - 4 \cdot (-1),\ 4 \cdot 3
- 1 \cdot (-2),\ 1 \cdot (-1) - 2 \cdot 3) = (0, 14, -7)$.

Magnitude: $\sqrt{0 + 196 + 49} = \sqrt{245} = 7\sqrt{5}$.

Area $= 7\sqrt{5}$.

## Computational

```python
import numpy as np

u = np.array([1, 2])
v = np.array([3, -1])

print(u + v)              # [4, 1]
print(3 * v)              # [9, -3]
print(np.linalg.norm(u))  # 2.236... = sqrt(5)

# Unit vector
v_hat = v / np.linalg.norm(v)
print(v_hat)              # [0.949, -0.316]
print(np.linalg.norm(v_hat))   # 1.0
```

## Applied

- **Game physics**: position, velocity, acceleration are all vectors.
  Update each frame: $\text{pos} \leftarrow \text{pos} +
  \text{velocity} \cdot dt$.
- **ML features**: a data point is a vector in feature space.
  Distance and dot products (Lesson 04) compute similarity.
- **Wind/current**: described by speed (magnitude) and direction.
- **Board Exam / JEE (CBSE Class 12, Chapter 10 — Vector
  Algebra)** — NCERT defines $\vec{a} = a_1\hat{i} + a_2\hat{j} +
  a_3\hat{k}$ with $|\vec{a}| = \sqrt{a_1^2 + a_2^2 + a_3^2}$.
  Ex 10.1–10.4 drill: dot product $\vec{a} \cdot \vec{b}$ and the
  angle formula $\cos\theta = (\vec{a} \cdot \vec{b}) /
  (|\vec{a}||\vec{b}|)$; cross product $\vec{a} \times \vec{b} =
  (|\vec{a}||\vec{b}|\sin\theta)\hat{n}$ and area of a parallelogram
  $|\vec{a} \times \vec{b}|$; **direction cosines**
  $\cos\alpha, \cos\beta, \cos\gamma$ satisfying
  $\cos^2\alpha + \cos^2\beta + \cos^2\gamma = 1$. JEE Mains adds
  the **scalar triple product** $[\vec{a}, \vec{b}, \vec{c}] =
  \vec{a} \cdot (\vec{b} \times \vec{c})$ (zero ⟺ coplanar).

## Check Your Understanding

:::widget type=numeric-input prompt="$\\mathbf{u} = (4, -3)$. $|\\mathbf{u}| = ?$" answer=5 explain="$\\sqrt{16 + 9} = 5$.":::

:::widget type=numeric-input prompt="$2 \\mathbf{u} - \\mathbf{v}$ where $\\mathbf{u} = (1, 1), \\mathbf{v} = (3, -2)$. First component?" answer=-1 explain="$2 - 3 = -1$.":::

:::widget type=numeric-input prompt="Unit vector along $(6, 8)$. Magnitude is $10$. Components are $(0.6, ?)$." answer=0.8 explain="$8/10 = 0.8$.":::

:::widget type=numeric-input prompt="If $\\mathbf{u} + \\mathbf{v} = (5, 5)$ and $\\mathbf{u} = (2, 3)$, then $\\mathbf{v} = (a, b)$. Type $a$." answer=3 explain="$5 - 2 = 3$.":::
