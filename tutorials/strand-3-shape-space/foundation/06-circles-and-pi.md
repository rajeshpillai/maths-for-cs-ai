---
strand: shape-space
level: foundation
order: 6
title: Circles and π
prerequisites:
  - tier: strand-3-shape-space-foundation
    slug: 05-area-of-polygons
    description: Area of polygons
connections:
  - strand-3-shape-space-foundation/01-distance-and-pythagoras
applications:
  - cs: "Bounding-circle collision tests, circular buffers, polar coordinates"
  - business: "Pizza area pricing, circular plot land area"
  - games: "Range circles, AOE damage zones, radar displays"
  - life: "Wheel circumference, pie portions, disc capacity"
---

# Circles and π

## Explain Like I Am 7

Take any round lid — a jar, a can, a cookie tin — and wrap a string
around its rim.  Now stretch that string along a ruler and compare it
to how wide the lid is across the middle.  Surprise: the string is
*always* a little more than three lid-widths long.  That special
number, just past three, is **π** — pi.  Every round circle in the
universe, no matter how big or tiny, hides this same number, like
a secret password belonging to roundness itself.

## Mental

A **circle** is the set of all points in the plane at a fixed
distance from a centre point. That fixed distance is the **radius**,
$r$. The **diameter** $d$ is twice the radius — a chord through the
centre.

Two measurements matter:

- **Circumference** $C$: the perimeter (distance around).
- **Area** $A$: the region enclosed.

Both formulas involve a magic constant called $\pi$:

$$
C = 2 \pi r = \pi d, \qquad A = \pi r^2.
$$

The constant $\pi$ ("pi") is the ratio of any circle's circumference
to its diameter:

$$
\pi = \frac{C}{d} \approx 3.14159265358979\ldots
$$

This ratio is **the same for every circle** — small, large, anywhere.
That's a non-trivial fact: it is one of geometry's deepest invariants.

$\pi$ is **irrational** (cannot be a fraction — like $\sqrt{2}$,
Strand 1 Intermediate Lesson 07) and **transcendental** (it's not even
the root of any polynomial with integer coefficients). Decimal expansions
are infinite and apparently random — billions of digits computed,
no pattern found.

For most purposes, $\pi \approx 3.14$ or $\pi \approx \dfrac{22}{7}$
($\approx 3.143$, slightly off) is plenty. For more precision:
$\dfrac{355}{113}$ matches $\pi$ to seven decimal places — a
spectacular Chinese approximation due to Zu Chongzhi (~$480$ AD).

## Coordinate-plane equation

A circle of radius $r$ centred at the origin is the set of points
$(x, y)$ satisfying

$$
x^2 + y^2 = r^2.
$$

(That's the distance formula from Lesson 01, applied to "distance from
origin = $r$.")

A circle centred at $(h, k)$ with radius $r$:

$$
(x - h)^2 + (y - k)^2 = r^2.
$$

## Interactive

A unit circle (radius $1$) centred at the origin — the canonical
example, used everywhere in trigonometry:

:::widget type=coordinate-plane points=[{"x":0,"y":0,"label":"O"},{"x":1,"y":0},{"x":0,"y":1},{"x":-1,"y":0},{"x":0,"y":-1}] xMin=-2 xMax=2 yMin=-2 yMax=2:::

(The widget plots points on the circle but doesn't draw the circle
arc — for now, **imagine** a smooth curve through the four marked
boundary points. Strand 3 Intermediate's coordinate-plane variant
will add native circle support.)

:::widget type=numeric-input prompt="A circle has radius $5$. What is its diameter?" answer=10 explain="$d = 2r = 10$.":::

:::widget type=numeric-input prompt="A circle has radius $7$. What is its circumference, using $\\pi \\approx 3.14$?" answer=43.96 tolerance=0.1 explain="$C = 2 \\pi r \\approx 2 \\cdot 3.14 \\cdot 7 = 43.96$.":::

:::widget type=numeric-input prompt="A circle has radius $3$. What is its area, using $\\pi \\approx 3.14$? Round to two decimals." answer=28.27 tolerance=0.1 explain="$A = \\pi r^2 \\approx 3.14 \\cdot 9 = 28.26$. (Slight discrepancy from rounding $\\pi$.)":::

:::widget type=numeric-input prompt="The unit circle is the set of points $(x, y)$ with $x^2 + y^2 = ?$" answer=1 explain="Radius $1$, so $r^2 = 1$. The unit circle equation is $x^2 + y^2 = 1$.":::

:::widget type=step-revealer
{
  "title": "Why is the area of a circle $\\pi r^2$?",
  "steps": [
    {"prose": "Slice a circle into many thin pie wedges (think pizza slices). Each wedge is approximately a triangle with two long sides equal to $r$ and a short curvy side along the circumference."},
    {"prose": "Now **rearrange** the wedges, alternating point-up / point-down, into a near-rectangle."},
    {"prose": "The rectangle's height is $r$ (the slice's straight side). The rectangle's width is **half the circumference** ($\\pi r$) — the wedge bottoms accounted for half of the total perimeter, alternating up and down."},
    {"math": "\\text{rectangle area} = \\text{height} \\times \\text{width} = r \\cdot \\pi r = \\pi r^2", "prose": "As you take more, thinner wedges, the approximation becomes exact: the circle's area equals this rectangle's area."},
    {"math": "A_{\\text{circle}} = \\pi r^2", "prose": "**Done.** This argument is from Archimedes (~250 BCE), who actually computed $\\pi$ by squeezing inscribed and circumscribed regular polygons."}
  ]
}
:::

## Symbolic

Circle definitions and formulas:

| Quantity | Formula |
|---|---|
| Diameter | $d = 2r$ |
| Circumference | $C = 2 \pi r = \pi d$ |
| Area | $A = \pi r^2$ |
| Equation (centred at origin) | $x^2 + y^2 = r^2$ |
| Equation (centred at $(h, k)$) | $(x - h)^2 + (y - k)^2 = r^2$ |

A circle's **arc length** subtended by a central angle $\theta$ (in
radians) is $r \theta$. The **sector area** (the pie wedge) is
$\tfrac{1}{2} r^2 \theta$. (Radians: a full turn = $2 \pi$ radians,
so one radian $\approx 57.3°$. Strand 3 Intermediate makes this
formal.)

A **chord** of a circle is a straight segment between two points on
the boundary. The longest chord is the diameter.

## Computational

```python
import math

def circle_circumference(r):
    return 2 * math.pi * r

def circle_area(r):
    return math.pi * r ** 2

print(circle_circumference(5))   # 31.415...
print(circle_area(5))            # 78.539...
print(math.pi)                    # 3.141592653589793
```

Drawing a circle on a grid (used in pixel-art rendering — a
discretisation of the equation):

```python
def is_inside_circle(x, y, cx, cy, r):
    return (x - cx) ** 2 + (y - cy) ** 2 < r ** 2

# 7×7 ASCII circle centred at (3, 3) with radius 3
for y in range(7):
    for x in range(7):
        print("●" if is_inside_circle(x, y, 3, 3, 3) else " ", end="")
    print()
```

For graphics, the **midpoint circle algorithm** (Bresenham-style)
draws circles using only integer arithmetic. Modern hardware uses
GPU shaders that don't bother — they just draw triangles approximating
the circle.

For **computing $\pi$** to many digits:

```python
# Leibniz series — slow but historically important
def leibniz_pi(terms):
    s = 0
    for k in range(terms):
        s += (-1) ** k / (2 * k + 1)
    return 4 * s

print(leibniz_pi(1000))      # ~3.140592 — converges very slowly
print(leibniz_pi(1_000_000)) # ~3.141591 — still slow
```

This is one of many series for $\pi$. Modern record-setters use the
**Chudnovsky algorithm**, computing trillions of digits in days.

## Derivational

The StepRevealer above gave Archimedes's pizza-slice rearrangement
proof. Here's the **circumference** proof, which underpins
$C = 2\pi r$:

The ratio $C / d$ is the same for every circle (a fact provable from
similarity — all circles are similar to each other, scaled by their
radii). Define $\pi$ as **this ratio** for any one circle. Then for
**every** circle of diameter $d$, $C = \pi d = 2 \pi r$.

The non-trivial fact is that this ratio is the **same** for all
circles. The reason: take any two circles. Scale one to match the
other's radius. By similarity, the perimeters scale by the same
factor, so the ratio of perimeter to diameter is preserved.

$\pi$'s value — about $3.14159$ — is empirically what you get for any
circle. The first systematic computation was by Archimedes (~$250$
BCE), who proved $\dfrac{223}{71} < \pi < \dfrac{22}{7}$ by inscribing
and circumscribing regular $96$-gons in a circle. He pinned down $\pi$
to about three decimal places — a remarkable feat without modern
notation.

## Connective

Circles connect to:

- **Lesson 01 (Pythagoras)**: the circle equation $x^2 + y^2 = r^2$
  IS Pythagoras applied to every point on the boundary. Distance from
  origin = $r$.
- **Trigonometry** (Strand 3 Intermediate): sine and cosine are
  defined as coordinates on the unit circle. Pythagoras becomes
  $\sin^2 \theta + \cos^2 \theta = 1$.
- **Lesson 08 (Transformations)**: rotation about the origin moves
  points around the unit circle. The angle of rotation is the arc
  length traversed (in radians).
- **Calculus** (Strand 4): $\pi$ appears in integrals over circular
  domains. The Gaussian integral $\int e^{-x^2} dx = \sqrt{\pi}$
  links $\pi$ to probability.
- **Complex numbers** (Strand 1 Intermediate Lesson 09): rotations
  in 2D are complex multiplication; Euler's formula $e^{i\pi} +
  1 = 0$ is the deepest relationship between $\pi$, $e$, $i$, and $1$.

## Applied

- **Pizza pricing**: a $14$-inch pizza has area $\pi (7)^2 \approx
  154$ sq in. A $12$-inch is $\approx 113$ sq in. The $14$-inch is
  **$36\%$ larger** in area despite being only $17\%$ larger in
  diameter — the $r^2$ scaling.
- **Wheel circumference**: a bicycle wheel of $26$-inch diameter has
  circumference $\pi \cdot 26 \approx 81.7$ inches — about $6.8$ feet
  per revolution.
- **Bounding circle in collision detection**: faster than computing
  arbitrary polygon collisions — just check if centre-to-centre
  distance is less than $r_1 + r_2$. Used in 2D physics engines.
- **Pi day**: March 14 ($3/14$) celebrates $\pi \approx 3.14$.
- **Round-pipe water flow**: a pipe's cross-section area is $\pi r^2$.
  Flow rate is roughly proportional, so doubling pipe radius
  quadruples flow capacity.
- **Earth's circumference**: $\sim 40\,000$ km. Eratosthenes computed
  this in $240$ BCE using shadows and an assumption that Earth is a
  sphere. His error was about $1\%$ — the first known measurement of
  the planet.

## Check Your Understanding

:::widget type=numeric-input prompt="Circle of radius $4$. Circumference using $\\pi \\approx 3.14$?" answer=25.12 tolerance=0.1 explain="$C = 2 \\pi r \\approx 2 \\cdot 3.14 \\cdot 4 = 25.12$.":::

:::widget type=numeric-input prompt="Circle of radius $10$. Area using $\\pi \\approx 3.14$?" answer=314 tolerance=1 explain="$A = \\pi r^2 \\approx 3.14 \\cdot 100 = 314$.":::

:::widget type=numeric-input prompt="A pizza of diameter $16$ has area how many times that of a pizza of diameter $8$? (Both are circular.)" answer=4 explain="Diameter doubles → radius doubles → area scales by $2^2 = 4$.":::

:::widget type=numeric-input prompt="The equation $x^2 + y^2 = 25$ describes a circle. What is its radius?" answer=5 explain="$r^2 = 25$, so $r = 5$.":::
