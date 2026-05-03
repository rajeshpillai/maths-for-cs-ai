---
strand: shape-space
level: foundation
order: 5
title: Area of Polygons
prerequisites:
  - tier: strand-3-shape-space-foundation
    slug: 04-triangle-theorems
    description: Triangle theorems
connections:
  - strand-3-shape-space-foundation/06-circles-and-pi
applications:
  - cs: "Polygon hit testing in 2D, geographic information systems"
  - business: "Land plot valuation, materials estimation"
  - games: "Map regions, territory calculations"
  - life: "Painting a wall, carpet sizing, tax assessor formulas"
---

# Area of Polygons

## Mental

**Area** measures how much surface a 2D shape covers. It is measured in
**square units** — square metres, square pixels, square miles.

The four area formulas you'll use most:

| Shape | Formula |
|---|---|
| Rectangle (length $\ell$, width $w$) | $\ell \cdot w$ |
| Triangle (base $b$, height $h$) | $\tfrac{1}{2} b h$ |
| Parallelogram (base $b$, height $h$) | $b h$ |
| Trapezoid (parallel sides $a, b$, height $h$) | $\tfrac{1}{2} (a + b) h$ |

The triangle formula deserves special attention: **half base times
height**, where "height" means the **perpendicular** distance from
the base to the opposite vertex. This works for **every** triangle —
acute, obtuse, right.

For a rectangle, the formula is just length × width because a
rectangle covers exactly one tile in each row and column.

A parallelogram has the same area as a rectangle with the same base
and height — you can prove this by **slicing off** a triangle from
one side and gluing it to the other (a "shear" that preserves area).

A trapezoid (one pair of parallel sides) splits into a rectangle
plus two triangles, or — more cleanly — averages the two parallel
sides into an effective rectangle.

## Interactive

A right triangle with legs $4$ (base) and $3$ (height):

:::widget type=coordinate-plane points=[{"x":0,"y":0,"label":"A"},{"x":4,"y":0,"label":"B"},{"x":0,"y":3,"label":"C"}] polygons=[{"vertices":[0,1,2],"fill":"accent"}] xMin=-1 xMax=5 yMin=-1 yMax=4:::

:::widget type=numeric-input prompt="The triangle above has base $4$ and height $3$. Its area?" answer=6 explain="$\\frac{1}{2} \\cdot 4 \\cdot 3 = 6$.":::

:::widget type=numeric-input prompt="A rectangle is $7$ m × $4$ m. Its area in square metres?" answer=28 explain="$7 \\cdot 4 = 28$.":::

:::widget type=numeric-input prompt="A parallelogram has base $5$ and height $3$. Its area?" answer=15 explain="$5 \\cdot 3 = 15$. (Same as the rectangle of those dimensions.)":::

:::widget type=numeric-input prompt="A trapezoid has parallel sides of length $6$ and $10$, height $4$. Area?" answer=32 explain="$\\frac{1}{2}(6 + 10) \\cdot 4 = \\frac{1}{2} \\cdot 16 \\cdot 4 = 32$.":::

A more complex polygon can always be **split into triangles**. The
total area is the sum of triangle areas:

:::widget type=coordinate-plane points=[{"x":0,"y":0,"label":"A"},{"x":4,"y":0,"label":"B"},{"x":5,"y":3,"label":"C"},{"x":2,"y":5,"label":"D"},{"x":-1,"y":2,"label":"E"}] polygons=[{"vertices":[0,1,2,3,4],"fill":"accent"}] xMin=-2 xMax=6 yMin=-1 yMax=6:::

This pentagon's area can be computed by **triangulating** — drawing
diagonals from one vertex to all others — and summing the resulting
triangles. Or use the **shoelace formula** below.

:::widget type=step-revealer
{
  "title": "Why is a triangle's area $\\tfrac{1}{2}$ base × height?",
  "steps": [
    {"prose": "Take any triangle with base $b$ and height $h$ (the perpendicular distance from the base line to the opposite vertex)."},
    {"prose": "**Trick**: complete the triangle to a parallelogram by adding a copy rotated $180°$. The two triangles fit together to form a parallelogram with the same base $b$ and height $h$."},
    {"math": "\\text{parallelogram area} = b \\cdot h", "prose": "(The parallelogram-area formula, which we'll justify below.)"},
    {"math": "\\text{triangle area} = \\frac{1}{2} \\cdot \\text{parallelogram area} = \\frac{1}{2} b h", "prose": "Two identical triangles make the parallelogram, so each is half. **The $\\tfrac{1}{2} b h$ formula is half a parallelogram.**"},
    {"prose": "**Why does the parallelogram have area $b h$?** Slice off a triangle from one side and glue it to the other — this rearrangement turns the parallelogram into a **rectangle** with the same base $b$ and same height $h$. Rectangle area is $b h$. Same area, transformed."}
  ]
}
:::

## The shoelace formula

For a polygon with vertices $(x_1, y_1), (x_2, y_2), \ldots, (x_n,
y_n)$ in order (counterclockwise), the area is

$$
A = \frac{1}{2} \left| \sum_{i=1}^n (x_i y_{i+1} - x_{i+1} y_i) \right|,
$$

where indices are mod $n$ (so $(x_{n+1}, y_{n+1}) = (x_1, y_1)$).

This is called the **shoelace formula** because the cross-multiplications
look like the lacing pattern in a shoe. It works for any **simple
polygon** (no self-intersections).

For the triangle with corners $(0, 0), (4, 0), (0, 3)$:

$$
A = \tfrac{1}{2} |0 \cdot 0 - 4 \cdot 0 + 4 \cdot 3 - 0 \cdot 0 + 0 \cdot 0 - 0 \cdot 3| = \tfrac{1}{2} |12| = 6.
$$

The shoelace formula handles **any** polygon — convex, concave, with
or without right angles. It's the workhorse of computational geometry
in code.

## Symbolic

Standard formulas (with appropriate units²):

$$
\begin{aligned}
A_\text{rectangle} &= \ell \cdot w \\
A_\text{triangle} &= \tfrac{1}{2} b h \\
A_\text{parallelogram} &= b h \\
A_\text{trapezoid} &= \tfrac{1}{2} (a + b) h \\
A_\text{regular n-gon} &= \tfrac{1}{2} \cdot n \cdot s \cdot a
\end{aligned}
$$

where $s$ is the side length and $a$ is the **apothem** (distance
from centre to side midpoint).

**Heron's formula** gives a triangle's area from its three sides
$a, b, c$ alone, with $s = (a+b+c)/2$ being the **semi-perimeter**:

$$
A = \sqrt{s(s-a)(s-b)(s-c)}.
$$

For a $5\text{-}12\text{-}13$ triangle: $s = 15$, $A = \sqrt{15 \cdot
10 \cdot 3 \cdot 2} = \sqrt{900} = 30$. (Cross-check: it's a right
triangle, $A = \tfrac{1}{2} \cdot 5 \cdot 12 = 30$. ✓)

The **shoelace formula** for a general polygon:

$$
A = \frac{1}{2} \left| \sum_{i=1}^n (x_i y_{i+1} - x_{i+1} y_i) \right|.
$$

## Computational

```python
def triangle_area(b, h):
    return 0.5 * b * h

def rectangle_area(l, w):
    return l * w

def shoelace(vertices):
    """Area of a polygon given its vertices in order (counterclockwise)."""
    n = len(vertices)
    area = 0
    for i in range(n):
        x1, y1 = vertices[i]
        x2, y2 = vertices[(i + 1) % n]
        area += x1 * y2 - x2 * y1
    return abs(area) / 2

print(triangle_area(4, 3))             # 6.0
print(shoelace([(0, 0), (4, 0), (0, 3)]))    # 6.0 — agrees
print(shoelace([(0, 0), (4, 0), (5, 3), (2, 5), (-1, 2)]))  # 18.5
```

Heron's formula:

```python
import math

def heron(a, b, c):
    s = (a + b + c) / 2
    return math.sqrt(s * (s - a) * (s - b) * (s - c))

print(heron(3, 4, 5))    # 6.0 — same as 0.5 * 3 * 4
print(heron(5, 12, 13))  # 30.0
print(heron(7, 8, 9))    # 26.83 — non-right triangle
```

For irregular shapes (or polygons defined by lots of vertices), the
shoelace formula is the standard. GIS tools, surveying software, and
map applications all use it under the hood.

## Derivational

The triangle formula derivation appeared in the StepRevealer above.
The parallelogram-as-rectangle and trapezoid-as-averaged-rectangle
arguments are similar **shape-rearrangement** proofs.

*Why does the shoelace formula work?*

The intuition: the shoelace formula computes a **signed area** — going
counterclockwise gives positive area, clockwise gives negative. Each
term $x_i y_{i+1} - x_{i+1} y_i$ is the **signed area** of a
triangle from the origin to two consecutive polygon vertices.

Summing these signed triangle-areas, contributions from
"sticks" outside the polygon cancel against contributions from
"sticks" inside, leaving exactly the polygon's area. The absolute
value handles the orientation. (A rigorous proof uses calculus —
Green's theorem in Strand 12 — but the geometric picture works.)

The deep reason geometric measurements scale predictably:

| Dimension | Lengths scale by | Areas scale by | Volumes scale by |
|---|---|---|---|
| 1D | $k$ | — | — |
| 2D | $k$ | $k^2$ | — |
| 3D | $k$ | $k^2$ | $k^3$ |
| nD | $k$ | $k^2$ | ... up to $k^n$ |

So doubling all dimensions of a 2D shape always quadruples its area
— the $k^2$ rule from Lesson 04. Doubling a 3D shape $\times 8$'s its
volume.

## Connective

Area connects to:

- **Lesson 06 (Circles)**: $\pi r^2$ is a circle's area — derived
  via slicing into triangles in the limit.
- **Lesson 07 (Similarity)**: similar shapes' areas are in
  $k^2$-ratio.
- **Multivariable calculus** (Strand 12): the shoelace formula is
  Green's theorem in disguise — a $1$D line integral that computes
  $2$D area.
- **Linear algebra** (Strand 2): the **determinant** of a $2 \times
  2$ matrix is the **signed area** of the parallelogram its column
  vectors span. Strand 2 Intermediate develops this.

## Applied

- **Land surveying**: surveyors measure boundary coordinates and
  apply the shoelace formula. Property tax assessors use this on
  every parcel.
- **GIS / mapping**: every "area of country / city / lake"
  calculation is a polygon-area computation, often on a sphere
  (with corrections).
- **Game-engine pathing**: navigable map regions are triangulated
  for fast point-in-polygon and pathfinding. Each triangle's area
  contributes to total walkable space.
- **Architecture / construction**: estimating paint, flooring, and
  roof tiles needs accurate area calculations. Houses are usually
  decomposed into rectangles + triangles.
- **Image segmentation**: counting pixels in a region is a discrete
  area measurement; computer vision systems use it constantly.

## Check Your Understanding

:::widget type=numeric-input prompt="Triangle with base $10$ and height $7$. Area?" answer=35 explain="$\\frac{1}{2} \\cdot 10 \\cdot 7 = 35$.":::

:::widget type=numeric-input prompt="Rectangle $12$ × $9$. Area?" answer=108 explain="$12 \\cdot 9 = 108$.":::

:::widget type=numeric-input prompt="Trapezoid: parallel sides $5$ and $11$, height $4$. Area?" answer=32 explain="$\\frac{1}{2}(5 + 11) \\cdot 4 = \\frac{1}{2} \\cdot 16 \\cdot 4 = 32$.":::

:::widget type=numeric-input prompt="Triangle with sides $6, 8, 10$. Area? (Hint: it's a right triangle — recognize the Pythagorean triple.)" answer=24 explain="Right triangle with legs $6$ and $8$: $\\frac{1}{2} \\cdot 6 \\cdot 8 = 24$. (Or via Heron: $s = 12$, $A = \\sqrt{12 \\cdot 6 \\cdot 4 \\cdot 2} = \\sqrt{576} = 24$.) ":::
