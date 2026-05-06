---
strand: shape-space
level: foundation
order: 0
title: The Coordinate Plane
prerequisites:
  - tier: strand-1-number-quantity-foundation
    slug: 05-negative-numbers
    description: Negative numbers (the negative axis)
connections:
  - strand-3-shape-space-foundation/01-distance-and-pythagoras
  - strand-3-shape-space-foundation/02-lines-and-slope
applications:
  - cs: "Pixel coordinates in graphics; map tile coordinates"
  - business: "Charting sales over time; geographic plotting"
  - games: "Every game world has a coordinate system"
  - life: "Map navigation, chess board addressing, GPS"
---

# The Coordinate Plane

## Explain Like I Am 7

Imagine giving directions to a friend on a giant tiled floor.  You stand
together at one special tile and say, "walk three tiles to the right,
then four tiles forward."  Now your friend can find any tile in the
whole room from just two numbers.  That pair of numbers is what
mathematicians call a *coordinate*, and the tiled floor with its
two arrow-axes is the **coordinate plane** — a way to give every spot
on a flat surface its own little name tag.

## Mental

To do geometry, we need a way to **describe where things are**. The
**coordinate plane** is René Descartes's $1637$ invention: a flat
surface with two perpendicular lines (the **axes**) crossing at a
point called the **origin**. Every point on the plane is identified
by a pair of numbers $(x, y)$ — its **coordinates**.

- The **horizontal** axis is called the $x$-axis.
- The **vertical** axis is called the $y$-axis.
- The origin is $(0, 0)$.
- A point $(3, 2)$ sits $3$ units right of the origin and $2$ units
  up.
- A point $(-4, 1)$ sits $4$ units left and $1$ up.
- A point $(2, -3)$ sits $2$ right and $3$ down.

The plane splits into four **quadrants**:

```
       y
       │
   II  │  I        I:   x > 0, y > 0
       │            II:  x < 0, y > 0
   ────┼────  x     III: x < 0, y < 0
       │            IV:  x > 0, y < 0
   III │  IV
       │
```

Mathematicians call these I, II, III, IV (counterclockwise from
top-right, using Roman numerals). Knowing the quadrant tells you
the signs of the coordinates.

The coordinate plane is one of the most important inventions in
mathematics. Before Descartes, geometry and algebra were two
separate disciplines. After: a geometric problem becomes an
algebraic one (solve equations) and an algebraic problem becomes a
geometric one (draw a graph). The connection is so fundamental
that the plane is sometimes called the **Cartesian plane** in
Descartes's honour.

## Interactive

A coordinate plane with a few points marked. Read off the coordinates.

:::widget type=coordinate-plane points=[{"x":3,"y":2,"label":"A"},{"x":-4,"y":1,"label":"B"},{"x":2,"y":-3,"label":"C"},{"x":0,"y":0,"label":"O"}] xMin=-5 xMax=5 yMin=-5 yMax=5:::

:::widget type=numeric-input prompt="What is the $x$-coordinate of point $A$ in the diagram above?" answer=3 explain="$A$ is $3$ units right of the origin, so its $x$-coordinate is $3$.":::

:::widget type=numeric-input prompt="What is the $y$-coordinate of point $C$? (Negative if below the $x$-axis.)" answer=-3 explain="$C$ is $3$ units below the origin → $y = -3$.":::

:::widget type=numeric-input prompt="In which quadrant does $(-4, 1)$ live? Type the Roman-numeral position as an Arabic number (1, 2, 3, or 4)." answer=2 explain="$x < 0, y > 0$ — the upper-left quadrant. **II.** (Type 2.)":::

:::widget type=numeric-input prompt="A point at $(0, 5)$ is on which axis? Type 1 for $x$-axis, 2 for $y$-axis." answer=2 explain="$x = 0$ means the point sits on the $y$-axis (specifically, $5$ units up). Points with $y = 0$ are on the $x$-axis.":::

Plot a triangle by giving its three vertices.

:::widget type=coordinate-plane points=[{"x":1,"y":1,"label":"P"},{"x":4,"y":1,"label":"Q"},{"x":4,"y":3,"label":"R"}] segments=[{"from":0,"to":1},{"from":1,"to":2},{"from":2,"to":0}] xMin=-1 xMax=6 yMin=-1 yMax=4:::

This triangle's vertices are $P = (1, 1)$, $Q = (4, 1)$, $R = (4,
3)$. The segments **connect** the points to form a closed shape.

:::widget type=numeric-input prompt="In the triangle above, the side from $P = (1,1)$ to $Q = (4,1)$ has length...?" answer=3 explain="Both points have the same $y$ ($1$). The horizontal distance is $|4 - 1| = 3$.":::

:::widget type=numeric-input prompt="The side from $Q = (4,1)$ to $R = (4,3)$ has length...?" answer=2 explain="Both points have $x = 4$. The vertical distance is $|3 - 1| = 2$.":::

The hypotenuse — from $P$ to $R$ — is **not** horizontal or
vertical. Lesson 01 will introduce the formula for that distance.

## Symbolic

A point in the coordinate plane is an **ordered pair** $(x, y)$. The
order matters: $(3, 2)$ and $(2, 3)$ are different points.

The plane is denoted $\mathbb{R}^2$ — "$\mathbb{R}$ squared," meaning
*pairs of real numbers*. (Strand 1 will eventually generalise this to
$\mathbb{R}^n$, the space of $n$-tuples — used in linear algebra and
machine learning.)

Distance between points along the **same horizontal line** ($y_1 =
y_2$) is just $|x_2 - x_1|$. Same for vertical lines. **Diagonal**
distance — Lesson 01 — needs Pythagoras.

The **midpoint** of a segment from $(x_1, y_1)$ to $(x_2, y_2)$ is
the average of the coordinates:

$$
M = \left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right).
$$

For $P = (1, 1)$ and $R = (4, 3)$, the midpoint is $\left(\dfrac{5}{2},
2\right) = (2.5, 2)$.

## Computational

Python tuples are a natural representation:

```python
A = (3, 2)
B = (-4, 1)
print(A[0], A[1])      # 3, 2 — x and y by index

# Midpoint
def midpoint(p, q):
    return ((p[0] + q[0]) / 2, (p[1] + q[1]) / 2)

print(midpoint(A, B))   # (-0.5, 1.5)

# Quadrant
def quadrant(p):
    x, y = p
    if x > 0 and y > 0: return "I"
    if x < 0 and y > 0: return "II"
    if x < 0 and y < 0: return "III"
    if x > 0 and y < 0: return "IV"
    return "on an axis"

print(quadrant(A))   # I
print(quadrant(B))   # II
print(quadrant((0, 5)))   # on an axis
```

For data-heavy work, NumPy treats arrays of points more efficiently:

```python
import numpy as np

points = np.array([[3, 2], [-4, 1], [2, -3], [0, 0]])
print(points[:, 0])    # all x-coordinates: [3 -4 2 0]
print(points[:, 1])    # all y-coordinates: [2 1 -3 0]

# Midpoint of all pairs
A, B = points[0], points[1]
print((A + B) / 2)     # [-0.5  1.5]
```

Almost every plotting library — matplotlib, seaborn, plotly — works
with $(x, y)$ pairs. Strand 3 lessons will use the same convention.

## Derivational

*Why* did Descartes's invention become so transformative?

Before $1637$, geometry and algebra were largely separate. Euclid's
elements ($\sim 300$ BCE) reasoned about points, lines, and circles
without coordinates. Algebra emerged separately in medieval Persia
and India.

Descartes's insight: **assign coordinates to every point**, then
**any geometric statement becomes an equation**. Conversely, any
equation in two variables defines a curve.

Examples:

- The **straight line** $y = mx + b$ is the set of points whose
  coordinates satisfy that equation. Lesson 02 develops this.
- The **circle** of radius $r$ centred at the origin is $x^2 + y^2 =
  r^2$. Lesson 06.
- The **parabola** $y = x^2$ — every point whose $y$-coordinate is
  the square of its $x$-coordinate.

Once geometry has algebra to work with, you can:

- Compute distances, angles, areas via formulas (Lessons 01, 03,
  05).
- Solve geometric problems using algebra (Lesson 09 capstone).
- Translate physical questions into mathematical ones (Strand 4
  Calculus uses this constantly).

The reverse traffic — turning algebra into geometry — let
mathematicians see equations as curves. The graph of $y = \sin x$
became a **picture** of the sine function. The deepest theorems in
algebraic geometry, $200$ years later, are direct descendants of
Descartes's coordinates.

## Connective

The coordinate plane is the gateway to:

- **Lesson 01 (Distance / Pythagoras)**: distance between any two
  points using their coordinates.
- **Lesson 02 (Lines and slope)**: equations like $y = 2x + 3$
  describe straight lines.
- **Strand 1 (Number Sense)**: the axes use real numbers and
  negatives — concepts from Strand 1 Foundation Lessons 01 and 05.
- **Strand 4 (Change)**: every function $f(x)$ becomes a curve in
  $\mathbb{R}^2$ via $y = f(x)$.

Beyond:

- **3D** ($\mathbb{R}^3$): add a $z$-axis. Game worlds, physics,
  architecture.
- **Higher dimensions** ($\mathbb{R}^n$): vectors, matrices, machine
  learning, data analysis. Same coordinate idea, generalised.
- **Polar coordinates** (Strand 3 Intermediate): a different
  coordinate system, better for circular symmetry.
- **Manifolds** (Strand 3 Master): coordinate charts on curved
  surfaces. The reason maps of the Earth distort — you can't put
  global coordinates on a sphere without choosing a
  representation.

## Applied

- **Computer graphics**: every pixel on your screen has $(x, y)$
  coordinates. The top-left is usually $(0, 0)$ with $y$ increasing
  **downward** (a graphics convention; mathematicians use $y$
  increasing upward).
- **Maps**: latitude/longitude is a coordinate system on a sphere.
  GPS satellites compute your position by triangulation in $3$D
  coordinates.
- **Chess and Go**: each square has algebraic coordinates ("e4" is
  column $e$, row $4$).
- **Excel/Sheets**: cell A1, B7, etc. — a discrete coordinate
  system over a finite grid.
- **Data visualisation**: bar charts, scatter plots, line graphs
  all use $(x, y)$ pairs.

## Check Your Understanding

:::widget type=numeric-input prompt="What is the midpoint of the segment from $(2, 4)$ to $(8, 10)$? Type the $x$-coordinate of the midpoint." answer=5 explain="$\\dfrac{2 + 8}{2} = 5$. The $x$-midpoint is the average of the two $x$-coordinates.":::

:::widget type=numeric-input prompt="What is the $y$-coordinate of the midpoint above?" answer=7 explain="$\\dfrac{4 + 10}{2} = 7$.":::

:::widget type=numeric-input prompt="The point $(-2, -7)$ is in which quadrant? Type 1, 2, 3, or 4." answer=3 explain="$x < 0, y < 0$ → quadrant III.":::

:::widget type=numeric-input prompt="Two points $A = (1, 2)$ and $B = (1, 8)$ lie on the same vertical line. Distance between them?" answer=6 explain="Same $x = 1$. Vertical distance is $|8 - 2| = 6$.":::
