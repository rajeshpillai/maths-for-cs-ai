# Angle Bisector and the Incircle

## Intuition

Drop the three angle bisectors of a triangle and they meet at one point —
the **incentre**.  This point is equidistant from all three sides, and the
common distance is the **inradius** $r$.  The incircle (tangent to all three
sides from inside) gives a clean geometric handle on triangle proportions
and produces the elegant area identity $\text{area} = r \cdot s$, where $s$
is the semi-perimeter.

## Prerequisites

- Classical Geometry, Lesson 1: Angle-chasing
- Classical Geometry, Lesson 5: Area formulas
- Classical Geometry, Lesson 6: Heron's formula

## From First Principles

### Angle bisector — definition and locus property

The **bisector** of an angle is the ray from the vertex that splits the angle
into two equal halves.

**Locus property.** Every point on the angle bisector is **equidistant** from
the two sides of the angle.  Conversely, every point equidistant from the
two sides lies on the bisector.

**Why?**  Drop perpendiculars from a point $P$ on the bisector to the two
sides.  The two right triangles formed share the hypotenuse $OP$ and have
equal angles at $O$ (since $OP$ is the bisector), so they're congruent (AAS),
and the perpendiculars are equal.

### The angle-bisector theorem

In $\triangle ABC$, the bisector of $\angle A$ meets $BC$ at point $D$.
Then:

$$\frac{BD}{DC} = \frac{AB}{AC}$$

The bisector divides the opposite side in the **ratio of the two adjacent
sides**.

**Proof.** Drop perpendiculars from $D$ to $AB$ and $AC$ — they're equal
(call the common length $h$).  Then $\triangle ABD$ has area $\frac{1}{2} \cdot AB \cdot h$
and $\triangle ACD$ has area $\frac{1}{2} \cdot AC \cdot h$.  Their ratio:

$$\frac{[\triangle ABD]}{[\triangle ACD]} = \frac{AB}{AC}$$

But these two triangles share the same height from $A$ to line $BC$, so
their area ratio equals $BD/DC$.  ∎

### The incentre — concurrence of three bisectors

The three angle bisectors of $\triangle ABC$ are concurrent (meet at one
point), called the **incentre** $I$.

**Why concurrent?**  By the locus property, the bisector of $\angle A$ is the
locus of points equidistant from $AB$ and $AC$; the bisector of $\angle B$
is the locus equidistant from $BA$ and $BC$.  Their intersection $I$ is
equidistant from $AB$ and $AC$ **and** from $BA$ and $BC$ — hence equidistant
from all three sides.  By the locus, $I$ is also on the bisector of $\angle C$.

### The incircle and inradius

Since $I$ is equidistant from all three sides, the circle centred at $I$ with
radius $r$ = (the common distance) is **tangent to all three sides** from
inside.  This is the **incircle**.

The radius $r$ is the **inradius**.

### The area-inradius formula

For any triangle with inradius $r$ and semi-perimeter $s = (a + b + c)/2$:

$$\text{area} = r \cdot s$$

**Proof.** Connect $I$ to the three vertices.  This splits $\triangle ABC$
into three triangles $\triangle IAB, \triangle IBC, \triangle ICA$, each
with height $r$ (perpendicular from $I$ to that side):

$$[\triangle IAB] = \frac{1}{2} c \cdot r, \quad [\triangle IBC] = \frac{1}{2} a \cdot r, \quad [\triangle ICA] = \frac{1}{2} b \cdot r$$

Sum: $\text{area} = \frac{1}{2}(a + b + c) r = s r$. ∎

### Computing the inradius

Combining $\text{area} = sr$ with Heron's formula:

$$r = \frac{\text{area}}{s} = \frac{\sqrt{s(s-a)(s-b)(s-c)}}{s} = \sqrt{\frac{(s-a)(s-b)(s-c)}{s}}$$

**Pen & paper:** $\triangle$ with sides 13, 14, 15.

$s = 21$, area = 84 (Heron, from Lesson 6).  $r = 84 / 21 = 4$.

### Worked example — angle-bisector theorem

> $\triangle ABC$ has $AB = 8$, $AC = 6$, $BC = 7$.  Bisector of $\angle A$
> meets $BC$ at $D$.  Find $BD$ and $DC$.

By the angle-bisector theorem: $\frac{BD}{DC} = \frac{8}{6} = \frac{4}{3}$.

Total $BD + DC = 7$, so $BD = 4, DC = 3$.

### Worked example — using $\text{area} = rs$

> A triangle has sides 5, 12, 13 (right-angled).  Find its inradius.

Area = $\frac{1}{2}(5)(12) = 30$.  $s = (5 + 12 + 13)/2 = 15$.  $r = 30/15 = 2$.

(For right triangles there's also the shortcut $r = (a + b - c)/2$ where $c$
is the hypotenuse: $(5 + 12 - 13)/2 = 2$. ✓)

### Tangent-length formula at the incircle

If the incircle touches $BC, CA, AB$ at $X, Y, Z$ respectively, then by the
"equal tangents from a point" property:

$$AY = AZ, \qquad BZ = BX, \qquad CX = CY$$

Setting $x = BX = BZ$, $y = CY = CX$, $z = AZ = AY$, the side equations are
$x + y = a$, $y + z = b$, $z + x = c$.  Solving:

$$x = s - b, \quad y = s - c, \quad z = s - a$$

So the segments cut off by the incircle from the vertices are exactly
$s - a, s - b, s - c$ — the same quantities appearing in Heron's formula.

## Python Verification

```python
# ── Incentre, incircle, angle-bisector theorem ──────────────
import numpy as np

def triangle_centres(A, B, C):
    a = np.linalg.norm(B - C); b = np.linalg.norm(C - A); c = np.linalg.norm(A - B)
    # Incentre = weighted average of vertices, weights = opposite side lengths
    I = (a * A + b * B + c * C) / (a + b + c)
    # Inradius via area = r s
    s = (a + b + c) / 2
    area = abs((B[0]-A[0])*(C[1]-A[1]) - (B[1]-A[1])*(C[0]-A[0])) / 2
    r = area / s
    return I, r, area, s

# 13-14-15 triangle (Heronian, area 84)
A = np.array([0., 0.]); B = np.array([14., 0.]); C = np.array([5., 12.])
I, r, area, s = triangle_centres(A, B, C)
print(f"=== 13-14-15 triangle ===")
print(f"  area = {area}, s = {s}")
print(f"  inradius r = {r}  (expected 4)")
print(f"  incentre I = {I}")

# Verify I is equidistant from all three sides
def dist_from_line(P, L1, L2):
    """Perpendicular distance from P to line through L1, L2."""
    d = L2 - L1
    n = np.array([-d[1], d[0]]) / np.linalg.norm(d)
    return abs(np.dot(P - L1, n))

print(f"  d(I, BC) = {dist_from_line(I, B, C):.6f}")
print(f"  d(I, CA) = {dist_from_line(I, C, A):.6f}")
print(f"  d(I, AB) = {dist_from_line(I, A, B):.6f}")
print(f"  all equal r? ✓")

# Angle bisector theorem
print("\n=== Angle bisector theorem ===")
# Bisector of angle A meets BC at D such that BD/DC = AB/AC
ab = np.linalg.norm(B - A); ac = np.linalg.norm(C - A); bc = np.linalg.norm(C - B)
ratio = ab / ac
D = B + (ratio / (1 + ratio)) * (C - B)
BD = np.linalg.norm(D - B); DC = np.linalg.norm(D - C)
print(f"  AB = {ab:.4f}, AC = {ac:.4f}, BC = {bc:.4f}")
print(f"  BD/DC = {BD/DC:.6f}, AB/AC = {ab/ac:.6f}",
      "✓" if abs(BD/DC - ab/ac) < 1e-9 else "✗")

# Tangent-length formula
print("\n=== Tangent lengths from vertices ===")
print(f"  s - a = {s - bc:.4f},  s - b = {s - ac:.4f},  s - c = {s - ab:.4f}")
```

## Visualisation — incircle and angle-bisector configuration

```python
# ── Draw triangle, three angle bisectors meeting at I, and incircle ──
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(9, 9))

A = np.array([0., 0.]); B = np.array([14., 0.]); C = np.array([5., 12.])

# Triangle
tri = [A, B, C, A]
ax.plot(*zip(*tri), "b-", lw=2)
ax.fill(*zip(*[A, B, C]), alpha=0.1, color="tab:blue")
for label, pt in zip("ABC", [A, B, C]):
    ax.plot(*pt, "ko", ms=8)
    ax.text(pt[0]-0.4, pt[1]-0.6, label, fontsize=14)

# Incentre & inradius
def triangle_centres(A, B, C):
    a = np.linalg.norm(B - C); b = np.linalg.norm(C - A); c = np.linalg.norm(A - B)
    I = (a * A + b * B + c * C) / (a + b + c)
    s = (a + b + c) / 2
    area = abs((B[0]-A[0])*(C[1]-A[1]) - (B[1]-A[1])*(C[0]-A[0])) / 2
    r = area / s
    return I, r

I, r = triangle_centres(A, B, C)
ax.plot(*I, "ro", ms=10); ax.text(I[0]+0.3, I[1]+0.2, "I", fontsize=14, color="red")

# Incircle
theta = np.linspace(0, 2*np.pi, 200)
ax.plot(I[0] + r*np.cos(theta), I[1] + r*np.sin(theta), "r-", lw=2)
ax.fill(I[0] + r*np.cos(theta), I[1] + r*np.sin(theta), alpha=0.2, color="tab:red")

# Three angle bisectors (from each vertex through I)
for V in [A, B, C]:
    direction = I - V
    far = V + 1.5 * direction
    ax.plot([V[0], far[0]], [V[1], far[1]], "g--", lw=1.5)

ax.set_aspect("equal"); ax.grid(alpha=0.3)
ax.set_xlim(-2, 16); ax.set_ylim(-2, 14)
ax.set_title(f"Incircle of 13-14-15 triangle\n"
             f"inradius r = {r:.2f}, area = r · s = {r:.2f} · 21 = 84")

plt.tight_layout()
plt.show()
```

## Connection to CS / Games / AI / Business / Industry

- **CS / Computational geometry** — incircles of triangulated meshes give a
  measure of triangle quality (a sliver triangle has tiny inradius); FEM
  preprocessors flag low-quality elements via $r/R$ ratio.
- **CS / Computer graphics** — fillet operations on polygonal corners
  approximate the incircle of the local angle; CAD chamfering uses the
  inradius to size the smoothed transition.
- **AI / Robotics** — clearance maps in robot motion planning use the
  largest inscribed circle of a polygonal free space — directly the incentre
  problem applied to convex polygons.
- **Games / Level design** — fitting circular characters or spawn zones
  inside polygonal rooms uses the incentre/inradius computation.
- **Engineering** — pipe-routing through polygonal cross-sections (HVAC duct
  design); the largest inscribed circle determines the maximum pipe diameter
  that fits.
- **Optimisation** — Chebyshev centre of a polytope is a generalisation of
  the incentre to higher dimensions; it's the centre of the largest
  inscribed ball, and it's the solution of an LP relaxation common in
  robust optimisation.

## Check Your Understanding

1. **Pen & paper:** Triangle with sides 7, 24, 25 (right-angled).  Compute
   the inradius using both $r = \text{area}/s$ and the right-triangle shortcut
   $r = (a + b - c)/2$.
2. **Pen & paper:** Triangle with sides 9, 10, 17.  Find the inradius.
3. **Pen & paper:** In $\triangle ABC$ with $AB = 12, AC = 9$, the angle
   bisector from $A$ meets $BC$ at $D$.  Given $BC = 14$, find $BD$ and $DC$.
4. **Pen & paper:** Show that the inradius of an equilateral triangle with
   side $s$ is $r = \frac{s}{2\sqrt{3}}$.  Use the area formula $\text{area} = \frac{\sqrt{3}}{4} s^2$ and $\text{area} = rs$.
5. **Insight:** Why are the three "vertex tangent lengths" $s - a, s - b, s - c$?
   Sketch the incircle and the three pairs of equal tangent segments from
   each vertex.
