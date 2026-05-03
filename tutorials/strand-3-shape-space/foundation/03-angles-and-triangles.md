---
strand: shape-space
level: foundation
order: 3
title: Angles and the Triangle Sum
prerequisites:
  - tier: strand-3-shape-space-foundation
    slug: 02-lines-and-slope
    description: Lines and slope
connections:
  - strand-3-shape-space-foundation/04-triangle-theorems
applications:
  - cs: "Game-engine collision angles, GUI rotation specifications"
  - business: "Architectural blueprints, surveying"
  - games: "Camera FOV, character orientation, 'aim assist' angle thresholds"
  - life: "Reading clocks, naming compass directions, designing furniture"
---

# Angles and the Triangle Sum

## Mental

An **angle** measures rotation between two rays (half-lines)
sharing a common endpoint, the **vertex**. Angles are usually
measured in **degrees**: a full turn is $360°$, a half-turn $180°$,
a quarter-turn $90°$ (a **right angle**).

```
     ↑            
     │            
   ──● 90° (right angle)
     │
     →
```

Standard angle vocabulary:

| Range | Name |
|---|---|
| $0°$ | zero angle |
| $0°$ to $90°$ | acute |
| $90°$ | right |
| $90°$ to $180°$ | obtuse |
| $180°$ | straight (a half-turn, a flat line) |
| $180°$ to $360°$ | reflex |
| $360°$ | full rotation |

Two angles are **complementary** if they sum to $90°$, **supplementary**
if they sum to $180°$, and **vertical** (or vertically opposite) if
they're across an intersection of two lines — in which case they are
**equal**.

## The triangle sum

The most important angle fact in elementary geometry:

> **The three interior angles of any triangle sum to $180°$.**

This is sometimes called the **angle-sum theorem**. It is true for
**every** triangle in flat (Euclidean) geometry — equilateral, right,
scalene, big, small. The sum is always $180°$.

Quick consequences:

- **A right triangle** has one $90°$ angle, so the other two sum to
  $90°$ — they are complementary.
- **An equilateral triangle** has three equal angles, so each is
  $\dfrac{180°}{3} = 60°$.
- **An isosceles triangle** (two equal sides) has two equal angles
  opposite those sides.

## Interactive

:::widget type=numeric-input prompt="Two angles of a triangle are $50°$ and $60°$. What is the third?" answer=70 explain="$180° - 50° - 60° = 70°$.":::

:::widget type=numeric-input prompt="A right triangle has one acute angle of $30°$. What is the other acute angle?" answer=60 explain="The two acute angles sum to $90°$. $90° - 30° = 60°$.":::

:::widget type=numeric-input prompt="In an equilateral triangle, what is each interior angle (in degrees)?" answer=60 explain="$\\dfrac{180°}{3} = 60°$. All three angles equal.":::

:::widget type=numeric-input prompt="If two angles are supplementary and one is $135°$, the other is...?" answer=45 explain="$180° - 135° = 45°$.":::

:::widget type=numeric-input prompt="An isosceles triangle has its apex angle (the one opposite the unequal side) at $40°$. What is each base angle?" answer=70 explain="The two base angles are equal and sum to $180° - 40° = 140°$. Each is $70°$.":::

:::widget type=step-revealer
{
  "title": "Why do triangle angles sum to 180°?",
  "steps": [
    {"prose": "Pick any triangle $ABC$. We'll prove $\\angle A + \\angle B + \\angle C = 180°$."},
    {"prose": "Through vertex $C$, draw a line **parallel to** side $AB$."},
    {"prose": "This parallel line creates angles at $C$ equal to $\\angle A$ and $\\angle B$ — by the **alternate interior angles theorem** (equal angles formed by a transversal cutting two parallel lines)."},
    {"prose": "These three angles — $\\angle A$, $\\angle C$, $\\angle B$ — together form a **straight line** through $C$."},
    {"math": "\\angle A + \\angle C + \\angle B = 180°", "prose": "Three angles on a straight line sum to $180°$. Done."},
    {"prose": "**This proof relies on Euclid's parallel postulate** (that exactly one line through $C$ is parallel to $AB$). On a curved surface — like a sphere — parallel lines don't exist, and triangle angles sum to *more* than $180°$. Strand 3 Master returns to this with non-Euclidean geometry."}
  ]
}
:::

## Symbolic

The **angle sum** of a triangle:

$$
\angle A + \angle B + \angle C = 180°.
$$

For a **convex polygon** with $n$ sides, the interior angles sum to

$$
(n - 2) \cdot 180°.
$$

(A triangle has $n = 3$, giving $1 \cdot 180° = 180°$. Quadrilateral:
$2 \cdot 180° = 360°$. Pentagon: $540°$. Hexagon: $720°$.)

The reason: any convex $n$-gon can be split into $n - 2$ triangles by
drawing diagonals from one vertex. Each triangle contributes $180°$;
the total is $(n - 2) \cdot 180°$.

The **exterior angle** at a vertex is the supplement of the interior
angle: $180° - \angle$. The exterior angles of any convex polygon
sum to **exactly $360°$**, regardless of $n$ — a beautiful invariant.

## Computational

```python
def triangle_third_angle(a, b):
    return 180 - a - b

print(triangle_third_angle(50, 60))   # 70

def polygon_interior_sum(n):
    return (n - 2) * 180

for n in range(3, 9):
    print(f"{n}-gon: {polygon_interior_sum(n)}°  (each angle if regular: {polygon_interior_sum(n) / n}°)")

# 3-gon: 180°  (each angle if regular: 60.0°)
# 4-gon: 360°  (each angle if regular: 90.0°)  ← square
# 5-gon: 540°  (each angle if regular: 108.0°)
# 6-gon: 720°  (each angle if regular: 120.0°)
# 7-gon: 900°  (each angle if regular: 128.57°)
# 8-gon: 1080° (each angle if regular: 135.0°)
```

For computing angles between vectors (Strand 3 Intermediate develops
this rigorously), use the dot product:

```python
import math

def angle_between(v1, v2):
    """Angle between two vectors in degrees."""
    dot = v1[0] * v2[0] + v1[1] * v2[1]
    n1 = math.sqrt(v1[0] ** 2 + v1[1] ** 2)
    n2 = math.sqrt(v2[0] ** 2 + v2[1] ** 2)
    cos_theta = dot / (n1 * n2)
    return math.degrees(math.acos(cos_theta))

print(angle_between((1, 0), (0, 1)))    # 90.0 — perpendicular
print(angle_between((1, 0), (1, 1)))    # 45.0
```

## Derivational

The triangle-sum proof in the StepRevealer above uses Euclid's
parallel postulate (the existence of unique parallels). The
$180°$-sum theorem is logically equivalent to the parallel postulate
— they imply each other.

Drop the parallel postulate, and you get **non-Euclidean geometries**:

- On a **sphere** (positive curvature): triangle angles sum to
  **more** than $180°$. A triangle with all $90°$ angles is possible
  on a sphere (e.g. corners at the north pole and two points on the
  equator $90°$ apart).
- In **hyperbolic** geometry (negative curvature): triangle angles
  sum to **less** than $180°$.

This is more than a curiosity — Einstein's general relativity is
built on Riemannian geometry, where space-time itself is curved. The
$180°$-sum theorem you've internalised holds only in flat
("Euclidean") space.

For now, **assume flat geometry** (the universe is Euclidean to a
remarkable approximation locally). All triangle and polygon angle-sum
formulas in this lesson use that assumption.

## Connective

Angles are foundational for:

- **Lesson 04 (Triangle theorems)**: angle-sum + side relationships
  determine triangles uniquely (or up to congruence/similarity).
- **Lesson 06 (Circles)**: an arc's measure is its central angle in
  degrees. Inscribed-angle theorem (a Strand 3 Intermediate gem)
  links angles to arcs.
- **Lesson 08 (Transformations)**: rotation by an angle preserves
  angles and lengths. A "rigid motion."
- **Trigonometry** (Strand 3 Intermediate): sine, cosine, tangent
  are functions of an angle. Pythagoras becomes $\sin^2 \theta +
  \cos^2 \theta = 1$.
- **Calculus** (Strand 4): radian measure replaces degrees because
  derivatives of trig functions are simpler in radians.

## Applied

- **Architecture**: load-bearing wall angles must be precise.
  Triangulation (using the $180°$-sum + Pythagoras) is the
  surveyor's primary tool.
- **GPS triangulation**: your phone's GPS computes its position by
  measuring angles (or equivalently, distances) to multiple
  satellites. The math is geometry on a sphere.
- **Camera field-of-view**: a $90°$ FOV game camera shows half the
  visible world to either side; a $60°$ FOV gives a more telephoto
  feel. Tuning this is a creative decision constrained by geometry.
- **Aviation**: the **glideslope** of a landing aircraft is typically
  $3°$ — a slope of about $\tfrac{1}{20}$. Pilots use this everyday.
- **Polygon-tile design**: regular hexagons tile the plane because
  $3 \cdot 120° = 360°$ — three hexagons meeting at a vertex fill the
  $360°$ around it exactly. Squares ($4 \cdot 90°$) and triangles
  ($6 \cdot 60°$) similarly. No regular pentagon-tiling exists
  ($108°$ doesn't divide $360°$ evenly).

## Check Your Understanding

:::widget type=numeric-input prompt="A triangle has angles $40°$ and $75°$. The third is...?" answer=65 explain="$180° - 40° - 75° = 65°$.":::

:::widget type=numeric-input prompt="The interior angles of a regular pentagon (5-gon) — how many degrees each?" answer=108 explain="$(5-2) \\cdot 180° / 5 = 540° / 5 = 108°$.":::

:::widget type=numeric-input prompt="Two angles are complementary. One is $37°$. The other is...?" answer=53 explain="$90° - 37° = 53°$.":::

:::widget type=numeric-input prompt="The exterior angles of a triangle sum to...?" answer=360 explain="Exterior angles of *any* convex polygon sum to $360°$, regardless of side count.":::
