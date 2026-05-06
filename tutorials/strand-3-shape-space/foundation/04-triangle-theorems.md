---
strand: shape-space
level: foundation
order: 4
title: Triangle Theorems — Inequality, Congruence, Similarity
prerequisites:
  - tier: strand-3-shape-space-foundation
    slug: 03-angles-and-triangles
    description: Angles and triangle sum
connections:
  - strand-3-shape-space-foundation/07-similarity-and-scaling
applications:
  - cs: "Mesh triangulation in graphics; triangle inequality in metric spaces"
  - business: "Surveying, structural triangle braces in trusses"
  - games: "Hit-box overlap detection, terrain mesh generation"
  - life: "Why bridges use triangles; furniture stability; map distance bounds"
---

# Triangle Theorems — Inequality, Congruence, Similarity

## Explain Like I Am 7

Try to build a triangle out of three sticks: a tiny one-inch stick, a
one-inch stick, and a giant ten-inch stick.  You can't!  The two short
sticks can't reach across the long one.  That's the **triangle
inequality** — any two sides must add up to more than the third.
Triangles are also unbendable: once you nail three sticks together,
the shape can't wobble.  That's why builders put triangles in roof
trusses and bridges and you put them inside cardboard forts.

## Mental

Triangles are the **simplest** rigid 2D shape — three sides that
determine a unique form. (A four-sided shape can flex; a three-sided
one cannot.) This rigidity is why bridges, roof trusses, and
structural braces are built from triangles.

Three foundational theorems govern when triangles "match" or
"behave."

**1. The triangle inequality**: any two sides of a triangle are
together longer than the third.

$$
|AB| + |BC| \ge |AC|, \qquad |AB| + |AC| \ge |BC|, \qquad |AC| + |BC| \ge |AB|.
$$

(With equality only when the three points are colinear — i.e., the
"triangle" has degenerated to a line segment.)

This makes sense intuitively: a straight path between two points is
the shortest. Going via a third point can only be **longer or equal**,
never shorter.

**2. Triangle congruence**: two triangles are **congruent** (identical
in shape and size) when corresponding sides and angles are equal.
Three rules suffice to prove congruence:

- **SSS**: all three sides equal.
- **SAS**: two sides plus the angle **between** them equal.
- **ASA**: two angles plus the side **between** them equal.

(There's also AAS — two angles and any side — and HL for right
triangles. **SSA is *not* a valid congruence rule** — two triangles
can have two equal sides and an equal non-included angle yet be
different.)

**3. Triangle similarity**: two triangles are **similar** when they
have the same shape but possibly different sizes. Equivalently:

- All three angles equal (**AAA**, or just **AA** since the third
  follows from the first two by the angle-sum theorem).
- All three sides in the **same ratio** (**SSS similarity**).

Similar triangles let you compute distances using **proportional
reasoning** — a tool used by surveyors for millennia.

## Interactive

:::widget type=numeric-input prompt="Can a triangle have sides $3, 4, 8$? Type 1 yes, 0 no." answer=0 explain="$3 + 4 = 7 < 8$. Triangle inequality violated. The two short sides can't reach across the long one — they fall flat.":::

:::widget type=numeric-input prompt="Can a triangle have sides $5, 6, 9$? Type 1 yes, 0 no." answer=1 explain="$5 + 6 = 11 > 9$, $5 + 9 > 6$, $6 + 9 > 5$. All three inequalities hold.":::

:::widget type=numeric-input prompt="Two sides of a triangle are $4$ and $7$. What is the smallest integer the third side can be?" answer=4 explain="By the inequality: $|4 - 7| < x < 4 + 7$, so $3 < x < 11$. Smallest integer: $4$.":::

:::widget type=numeric-input prompt="Two triangles have sides $(3, 5, 7)$ and $(6, 10, 14)$. Are they similar? (1 yes, 0 no.)" answer=1 explain="$\\frac{6}{3} = \\frac{10}{5} = \\frac{14}{7} = 2$. All sides scaled by $2$ → similar.":::

:::widget type=numeric-input prompt="Two right triangles have legs $3, 4$ and $9, 12$. Are they similar?" answer=1 explain="Both right triangles. Sides scale by $3$ ($9/3 = 12/4 = 3$). The hypotenuses are $5$ and $15$, also scaled by $3$. ✓":::

:::widget type=step-revealer
{
  "title": "Why is SSA not a valid congruence rule?",
  "steps": [
    {"prose": "Suppose we know triangle 1 has side $a$, angle $\\alpha$ adjacent to $a$, and side $c$ opposite $\\alpha$. Are these enough to determine the triangle uniquely?"},
    {"prose": "**Not always.** Sometimes there are two valid triangles."},
    {"prose": "Picture: place side $a$ horizontally. At its left end, draw a ray at angle $\\alpha$. Now we want a side of length $c$ from the right end of $a$, ending on that ray."},
    {"prose": "If $c$ is **longer than the perpendicular distance** from the right end of $a$ to the ray, the circle of radius $c$ from $a$'s right end can hit the ray at **two** points — giving two valid triangles."},
    {"prose": "If $c$ is exactly the perpendicular distance, exactly one valid triangle. If $c$ is shorter, none."},
    {"math": "\\text{SSA: ambiguous} \\quad \\Rightarrow \\quad \\text{not a valid congruence rule}", "prose": "This is sometimes called the **ambiguous case** in trigonometry. SSS, SAS, ASA, AAS all uniquely determine a triangle; SSA does not."}
  ]
}
:::

:::widget type=coordinate-plane points=[{"x":0,"y":0,"label":"A"},{"x":4,"y":0,"label":"B"},{"x":3,"y":3,"label":"C"},{"x":6,"y":0,"label":"A'"},{"x":14,"y":0,"label":"B'"},{"x":12,"y":6,"label":"C'"}] segments=[{"from":0,"to":1},{"from":1,"to":2},{"from":2,"to":0},{"from":3,"to":4},{"from":4,"to":5},{"from":5,"to":3}] xMin=-1 xMax=15 yMin=-1 yMax=7:::

The two triangles above have side ratios $4:8 = 5:10 = 3:6$, so they
are **similar** with scale factor $2$. Same shape, double the size.

## Symbolic

**Triangle inequality**:

$$
|AB| + |BC| \ge |AC|.
$$

This holds for **any three points** in any metric space — it's not
just a fact about Euclidean triangles, but a defining axiom of
distance.

**Congruence rules**: SSS, SAS, ASA, AAS, HL (for right triangles).
SSA is ambiguous.

**Similarity**: triangles $\triangle ABC \sim \triangle A'B'C'$ when

$$
\frac{|A'B'|}{|AB|} = \frac{|B'C'|}{|BC|} = \frac{|A'C'|}{|AC|} \quad \text{and} \quad \angle A = \angle A', \angle B = \angle B', \angle C = \angle C'.
$$

The common ratio is the **scale factor**. Equivalent statement: if
two angles match (AA), the triangles are similar (the third angle is
forced by the angle-sum theorem).

A useful similarity-related fact: if two triangles are similar with
scale factor $k$, then:

- Corresponding sides scale by $k$.
- Perimeters scale by $k$.
- Areas scale by $k^2$ — squared.

(Doubling all sides quadruples the area. Tripling them increases
area by $9$. Why? Because area is a 2D measurement; scaling each
dimension by $k$ multiplies area by $k \cdot k = k^2$.)

## Computational

```python
def is_valid_triangle(a, b, c):
    return a + b > c and a + c > b and b + c > a

print(is_valid_triangle(3, 4, 5))     # True
print(is_valid_triangle(3, 4, 8))     # False
print(is_valid_triangle(5, 5, 5))     # True (equilateral)

def are_similar(t1, t2, tol=1e-9):
    """Two triangles given as sorted side-tuples. Are they similar?"""
    s1 = sorted(t1)
    s2 = sorted(t2)
    ratios = [s2[i] / s1[i] for i in range(3)]
    return all(abs(r - ratios[0]) < tol for r in ratios)

print(are_similar((3, 4, 5), (6, 8, 10)))    # True (scale 2)
print(are_similar((3, 4, 5), (4, 5, 6)))     # False
```

For mesh-based graphics, triangle similarity drives Level-of-Detail
rendering — distant objects use smaller similar triangles for fewer
pixels.

## Derivational

*Why* is the triangle inequality true?

Geometrically: from $A$ to $C$, the **straight line** $AC$ is the
shortest path. Any indirect path — say via $B$ — must be at least
as long. Going $A \to B \to C$ traces a polygonal path of length
$|AB| + |BC|$. So $|AB| + |BC| \ge |AC|$, with equality only when
$B$ lies *on the segment* $AC$.

The fact that "straight is shortest" can be proved analytically using
the distance formula and properties of square roots, but the
geometric argument captures the essence.

*Why* do similar triangles have areas scaled by $k^2$?

Take any triangle with base $b$ and height $h$ (Lesson 05 shows that
area $= \tfrac{1}{2} b h$). Under a similarity scaling by $k$, the
new base is $k b$, new height $k h$, new area $\tfrac{1}{2} (kb)(kh)
= k^2 \cdot \tfrac{1}{2} b h = k^2 \cdot$ (original area).

The same principle generalises:

- **Lengths** scale by $k$.
- **Areas** scale by $k^2$.
- **Volumes** scale by $k^3$.
- In $n$-dimensional space, $n$-dimensional measure scales by $k^n$.

This is why a $2 \times$ scaled balloon takes $8 \times$ the air to
fill (volume scaling by $2^3$). Why baby elephants exist but baby
flies don't (surface-area-to-volume ratio scales as $1/k$). Why a
larger network of computers communicates with $k^2$ times more
connections (each pair adds an edge).

## Connective

Triangle theorems connect to:

- **Lesson 01 (Distance)**: triangle inequality is the metric-space
  axiom that defines what "distance" must satisfy.
- **Lesson 05 (Area)**: similarity gives the $k^2$ scaling law for
  area.
- **Lesson 07 (Similarity)**: develops the topic in more depth,
  with proportional-reasoning examples.
- **Trigonometry** (Strand 3 Intermediate): the law of sines and
  law of cosines generalise the special-case rules of right
  triangles to any triangle.

## Applied

- **Surveying / shadow lengths**: classical method to measure tall
  things — a tree's height equals (your height × tree's shadow
  length / your shadow length). That's similar triangles in
  action. Used by Eratosthenes (3rd c. BCE) to estimate Earth's
  circumference.
- **Bridge trusses**: triangular structures don't deform under
  load. A four-sided structure can rack into a parallelogram.
  Engineers use triangle-based bracing for this reason.
- **Map distance bounds**: triangle inequality lets you set lower
  bounds on distances. If $A$ to $B$ is $300$ km and $B$ to $C$ is
  $200$ km, $A$ to $C$ is between $100$ km (if colinear) and
  $500$ km.
- **Computer graphics**: meshes are sets of triangles — triangulation
  algorithms (Delaunay, ear clipping) decompose 2D and 3D shapes
  into triangles for rendering.
- **GPS / triangulation**: position is fixed by knowing distances
  to three reference points. The intersection of three circles
  uniquely determines a point.

## Check Your Understanding

:::widget type=numeric-input prompt="Can a triangle have sides $7, 7, 14$? (Type 1 yes, 0 no.)" answer=0 explain="$7 + 7 = 14$ — equality, not strict inequality. The 'triangle' is a degenerate line segment. Properly, no.":::

:::widget type=numeric-input prompt="Two triangles are similar with scale factor $3$. If one has area $5$ sq cm, the other has area...?" answer=45 explain="Area scales by $k^2 = 9$. $5 \\cdot 9 = 45$ sq cm.":::

:::widget type=numeric-input prompt="A right triangle has legs $6$ and $8$. A similar right triangle has hypotenuse $20$. What is its longer leg?" answer=16 explain="Original hypotenuse: $\\sqrt{36 + 64} = 10$. Scale factor: $20/10 = 2$. Longer leg: $8 \\cdot 2 = 16$.":::

:::widget type=numeric-input prompt="In a triangle with side $5$ and side $9$, the third side $c$ must satisfy $|5 - 9| < c < 5 + 9$. What's the smallest integer $c$ can be?" answer=5 explain="$|5 - 9| = 4 < c < 14$. Smallest integer is $5$.":::
