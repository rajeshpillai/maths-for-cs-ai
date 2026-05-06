---
strand: shape-space
level: foundation
order: 1
title: Distance and Pythagoras' Theorem
prerequisites:
  - tier: strand-3-shape-space-foundation
    slug: 00-coordinate-plane
    description: The coordinate plane
  - tier: strand-1-number-quantity-intermediate
    slug: 07-surds-and-exact-arithmetic
    description: Surds (for exact distance values)
connections:
  - strand-3-shape-space-foundation/02-lines-and-slope
  - strand-3-shape-space-foundation/04-triangle-theorems
applications:
  - cs: "Vector norms, k-nearest-neighbour, collision detection"
  - business: "Geographic distances, supply-chain optimisation"
  - games: "Player-to-target distance, projectile range, hit detection"
  - life: "GPS distance, walking-route lengths, room diagonals"
---

# Distance and Pythagoras' Theorem

## Explain Like I Am 7

Think about walking from your front door to a friend's house.  You can
zig-zag along the streets — three blocks east, then four blocks north —
or, if a bird flew straight there, it would take a much shorter path
diagonally across the rooftops.  Pythagoras noticed something
beautiful: if you square the two street-walks and add them up, you
get exactly the *square* of that bird's-eye flight.  So 3 and 4 give
9 + 16 = 25, and the bird flies a tidy 5 blocks.

## Mental

Lesson 00 showed how to find the distance between two points on the
**same horizontal or vertical line** — just subtract the differing
coordinate. The diagonal case was deferred. Here it is.

**Pythagoras' theorem** (around $500$ BCE) gives the answer:

> In a right triangle with legs $a$ and $b$ and hypotenuse $c$,
>
> $$a^2 + b^2 = c^2.$$

The **hypotenuse** is the side opposite the right angle — the longest
side. The two **legs** are the sides forming the right angle.

Given any right triangle's two legs, you can compute the hypotenuse:

$$
c = \sqrt{a^2 + b^2}.
$$

The square root makes appearances of surds (Strand 1 Intermediate
Lesson 07) inevitable here. A right triangle with legs $1$ and $1$ has
hypotenuse $\sqrt{2}$ — irrational. With legs $3$ and $4$, hypotenuse
$\sqrt{9 + 16} = \sqrt{25} = 5$ — a famous **Pythagorean triple**.

## Distance between any two points

Pythagoras gives us the **distance formula**. For points $P_1 = (x_1,
y_1)$ and $P_2 = (x_2, y_2)$, build the right triangle:

- One leg is **horizontal**: length $|x_2 - x_1|$.
- One leg is **vertical**: length $|y_2 - y_1|$.
- The hypotenuse is the segment from $P_1$ to $P_2$.

By Pythagoras:

$$
d(P_1, P_2) = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}.
$$

The squaring removes the absolute value (squares are always non-negative).

For $P = (1, 1)$ and $R = (4, 3)$ (the unfinished triangle from
Lesson 00):

$$
d(P, R) = \sqrt{(4 - 1)^2 + (3 - 1)^2} = \sqrt{9 + 4} = \sqrt{13} \approx 3.606.
$$

Almost everything in geometry, computer graphics, machine learning,
and physics that involves "how far apart" two things are uses this
formula (or its higher-dimensional cousin).

## Interactive

A visual: the right triangle with legs $3$ and $4$, hypotenuse $5$.

:::widget type=coordinate-plane points=[{"x":0,"y":0,"label":"A"},{"x":3,"y":0,"label":"B"},{"x":3,"y":4,"label":"C"}] segments=[{"from":0,"to":1,"label":"3"},{"from":1,"to":2,"label":"4"},{"from":2,"to":0,"label":"5"}] xMin=-1 xMax=5 yMin=-1 yMax=5:::

:::widget type=numeric-input prompt="The triangle above has legs $3$ and $4$. By Pythagoras, what is the hypotenuse?" answer=5 explain="$\\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$. The 3-4-5 triple has been used by builders since ancient Egypt to make right angles.":::

:::widget type=numeric-input prompt="A right triangle has legs $5$ and $12$. What is the hypotenuse?" answer=13 explain="$\\sqrt{25 + 144} = \\sqrt{169} = 13$. Another famous Pythagorean triple: $(5, 12, 13)$.":::

:::widget type=numeric-input prompt="A right triangle has legs $8$ and $15$. What is the hypotenuse?" answer=17 explain="$\\sqrt{64 + 225} = \\sqrt{289} = 17$. The triple $(8, 15, 17)$.":::

:::widget type=numeric-input prompt="A right triangle has legs $1$ and $1$. What is the hypotenuse, as an exact surd?" answer=1.4142 tolerance=0.01 explain="$\\sqrt{1 + 1} = \\sqrt{2} \\approx 1.414$. Strand 1 Intermediate Lesson 07 explains why $\\sqrt{2}$ cannot be a fraction.":::

:::widget type=numeric-input prompt="What is the distance between $(1, 2)$ and $(4, 6)$?" answer=5 explain="$\\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$. Same 3-4-5 triple, just translated.":::

:::widget type=numeric-input prompt="Distance between $(0, 0)$ and $(0, 7)$?" answer=7 explain="Same $x$, just vertical: $|7 - 0| = 7$. Pythagoras with one leg = 0 reduces to the absolute difference.":::

:::widget type=step-revealer
{
  "title": "Why does Pythagoras' theorem hold?",
  "steps": [
    {"prose": "Take a right triangle with legs $a, b$ and hypotenuse $c$. We'll prove $a^2 + b^2 = c^2$ by an area argument."},
    {"prose": "Make **four copies** of the triangle. Arrange them inside a big square of side $a + b$, with the hypotenuses forming a smaller tilted square inside."},
    {"prose": "The big square has area $(a + b)^2 = a^2 + 2ab + b^2$."},
    {"prose": "The big square also equals the four triangles plus the inner tilted square: $4 \\cdot \\tfrac{1}{2} ab + c^2 = 2ab + c^2$."},
    {"math": "a^2 + 2ab + b^2 = 2ab + c^2", "prose": "Same area, two ways."},
    {"math": "a^2 + b^2 = c^2", "prose": "Subtract $2ab$ from both sides. **Pythagoras' theorem.**"},
    {"prose": "This is one of dozens of proofs (some with hundreds of variants — the topic of an entire book). The area-rearrangement argument is among the cleanest. Euclid's *Elements* I.47 gives a more elaborate version."}
  ]
}
:::

## Symbolic

**Pythagoras' theorem**: in a right triangle with legs $a, b$ and
hypotenuse $c$,

$$
a^2 + b^2 = c^2.
$$

**Distance formula** (Pythagoras applied to a coordinate-plane right
triangle):

$$
d((x_1, y_1), (x_2, y_2)) = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}.
$$

For three points in $\mathbb{R}^3$, add a $z$-coordinate:

$$
d((x_1, y_1, z_1), (x_2, y_2, z_2)) = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}.
$$

The pattern continues to any dimension: distance in $\mathbb{R}^n$
is the square root of the sum of squared differences. This is the
**Euclidean distance** — the most common notion of "how far" in
mathematics.

A useful identity: **squared distance** ($d^2$) avoids the square
root, so it's faster to compute and often easier to compare. If you're
asking "is $A$ closer to $X$ than to $Y$?", comparing $d(A, X)^2$ to
$d(A, Y)^2$ gives the same answer as comparing $d(A, X)$ to $d(A,
Y)$ — without ever taking a square root. Game engines and ML
algorithms exploit this constantly.

**Pythagorean triples** are integer solutions to $a^2 + b^2 = c^2$.
The simplest:

$$
(3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25), (20, 21, 29), \ldots
$$

**Euclid's formula** generates them: for integers $m > n > 0$ with
$\gcd(m, n) = 1$ and $m - n$ odd,

$$
a = m^2 - n^2, \quad b = 2 m n, \quad c = m^2 + n^2
$$

is a primitive Pythagorean triple. (Strand 13 Advanced develops the
number theory.)

## Computational

The distance formula in Python:

```python
import math

def distance(p1, p2):
    return math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2)

print(distance((0, 0), (3, 4)))    # 5.0
print(distance((1, 1), (4, 5)))    # 5.0
print(distance((0, 0), (1, 1)))    # 1.4142...

# Squared distance — faster, avoids sqrt
def squared_distance(p1, p2):
    return (p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2

# Find the closest of several points without computing actual distances
def closest(target, candidates):
    return min(candidates, key=lambda p: squared_distance(target, p))

print(closest((0, 0), [(3, 4), (1, 5), (2, 2)]))   # (2, 2) — closest to origin
```

For higher dimensions, NumPy is convenient:

```python
import numpy as np

def distance_n(p1, p2):
    return np.sqrt(np.sum((np.array(p1) - np.array(p2)) ** 2))

print(distance_n([0, 0, 0], [3, 4, 0]))   # 5.0 — same as 2D
print(distance_n([1, 2, 3, 4], [5, 6, 7, 8]))   # 8.0 — 4D distance

# Or NumPy's built-in
print(np.linalg.norm(np.array([3, 4, 0])))   # 5.0
```

`np.linalg.norm` computes the Euclidean norm — distance from the
origin to a point — with the same Pythagoras structure under the hood.

## Derivational

The StepRevealer above gave one of the simplest proofs (the four-
triangle area rearrangement). Here it is, spelled out as text:

Build a big square of side $a + b$. Inside, place four right triangles
with legs $a$ and $b$ — one in each corner, each rotated to fit. The
hypotenuses form a tilted square in the middle.

**Big square area**: $(a + b)^2 = a^2 + 2ab + b^2$.

**Same area, decomposed**: $4 \cdot \tfrac{1}{2} a b$ (four triangles) +
$c^2$ (inner square) = $2 a b + c^2$.

Setting these equal and subtracting $2 a b$:

$$
a^2 + b^2 = c^2.
$$

The theorem is now established without trigonometry, without
similarity — just from the **area-conservation** principle.

The argument generalises to give the **distance formula** in any
dimension. The squared distance $\sum (x_i - y_i)^2$ in $\mathbb{R}^n$
is itself a sum of $n$ squares — the Pythagoras structure scaled
up. Strand 2 (Structure) makes this rigorous as the **inner
product** on a vector space.

## Connective

Pythagoras and the distance formula touch nearly every later lesson:

- **Lesson 02 (Lines and slope)**: a line's slope is "rise over run"
  — a ratio of vertical to horizontal differences. The Pythagorean
  hypotenuse appears when you parameterise the line by arc length.
- **Lesson 04 (Triangle theorems)**: the triangle inequality $|AB|
  + |BC| \ge |AC|$ uses the distance metric we just defined.
- **Lesson 06 (Circles)**: a circle is $\{P : d(P, O) = r\}$ —
  defined directly by the distance formula. The equation
  $x^2 + y^2 = r^2$ is Pythagoras applied to every point on the
  circle.

Beyond Strand 3:

- **Vector norms** (Strand 2 Advanced): $\|v\| = \sqrt{\sum v_i^2}$ —
  the Euclidean norm is Pythagoras in $n$ dimensions.
- **Linear regression** (Strand 6 Advanced): sum-of-squared-errors
  is what's minimised — Pythagoras driving statistics.
- **Machine learning**: the most common similarity metric is
  Euclidean distance between feature vectors. K-NN, k-means, and
  dozens of other algorithms rely on it.

## Applied

- **GPS / navigation**: distance between two latitude-longitude
  points uses the **haversine formula** (a sphere-corrected
  Pythagoras), but the flat-Earth approximation is the distance
  formula directly.
- **Hit detection in games**: "is the bullet within $r$ of the
  target?" → compute squared distance, compare to $r^2$. Saves a
  square root per check; over millions of checks per frame, this
  matters.
- **K-nearest-neighbour ML**: classify a new data point by finding
  the $k$ closest known examples (in feature-space distance).
  Euclidean distance is the default.
- **Graphics rendering**: ray-sphere intersection uses
  Pythagoras-style algebra to find collision points. Ray-tracing
  engines compute these by the millions per frame.
- **Carpentry / construction**: builders use the 3-4-5 trick to
  square corners. Tape measure $3$ ft along one wall, $4$ ft along
  the perpendicular; if the diagonal is $5$ ft, the corner is a
  perfect right angle.

## Check Your Understanding

:::widget type=numeric-input prompt="Distance from $(0, 0)$ to $(6, 8)$?" answer=10 explain="$\\sqrt{36 + 64} = \\sqrt{100} = 10$. (3-4-5 scaled up by 2.)":::

:::widget type=numeric-input prompt="A square has corners at $(0, 0), (4, 0), (4, 4), (0, 4)$. What is the diagonal length, rounded to 3 decimals?" answer=5.657 tolerance=0.01 explain="$\\sqrt{4^2 + 4^2} = \\sqrt{32} = 4\\sqrt{2} \\approx 5.657$. A square's diagonal is always $\\sqrt{2}$ times its side.":::

:::widget type=numeric-input prompt="Is $(7, 24, 25)$ a Pythagorean triple? Type 1 yes, 0 no. (Check $7^2 + 24^2 = 25^2$?)" answer=1 explain="$49 + 576 = 625 = 25^2$. Yes — a famous primitive triple.":::

:::widget type=numeric-input prompt="A ladder leans against a wall. The base is $3$ m from the wall; the ladder is $5$ m long. How high up the wall does the top reach?" answer=4 explain="By Pythagoras: $\\sqrt{5^2 - 3^2} = \\sqrt{25 - 9} = \\sqrt{16} = 4$ m. The 3-4-5 triple appears yet again.":::
