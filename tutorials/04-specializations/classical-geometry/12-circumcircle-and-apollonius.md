# Circumcircle and the Apollonius Circle

## Intuition

Just as every triangle has a circle tangent to all three sides from inside
(the incircle, Lesson 11), every triangle has a circle passing through all
three vertices: the **circumcircle**.  Its centre — the **circumcentre** — is
the point equidistant from all three vertices, found by intersecting any two
**perpendicular bisectors** of the sides.  A close cousin, the **Apollonius
circle**, is the locus of all points whose distances to two fixed points
have a constant ratio.  Together they give the language for many
"distance-ratio" problems and for circumradius-based identities.

## Prerequisites

- Foundation 2, Lesson 5: Coordinate geometry
- Classical Geometry, Lesson 2: Triangle congruence and similarity
- Classical Geometry, Lesson 5: Area formulas
- Classical Geometry, Lesson 11: Angle bisector and incircle (parallel
  construction)

## From First Principles

### Perpendicular bisector — locus property

The **perpendicular bisector** of segment $AB$ is the line that:
1. Passes through the midpoint of $AB$, and
2. Is perpendicular to $AB$.

**Locus property.**  A point $P$ lies on the perpendicular bisector of $AB$
**iff** $PA = PB$.

**Proof.**  $\triangle PMA \cong \triangle PMB$ by SAS (with $M$ the midpoint;
$PM$ shared, $\angle PMA = \angle PMB = 90°$, $MA = MB$).  Hence $PA = PB$.
Conversely, if $PA = PB$, drop a perpendicular from $P$ to $AB$ — it hits the
midpoint by symmetry.

### Circumcentre — concurrence of three perpendicular bisectors

In any triangle, the three perpendicular bisectors of the sides are
concurrent.  Their common point is the **circumcentre** $O$.

**Why concurrent?**  By the locus property:
- The perpendicular bisector of $BC$ is the locus of points equidistant from
  $B$ and $C$.
- The perpendicular bisector of $CA$ is the locus equidistant from $C$ and $A$.

Their intersection is equidistant from $A$, $B$, and $C$, hence on the
perpendicular bisector of $AB$ as well.

### The circumcircle and circumradius

Since $O$ is equidistant from all three vertices, the circle centred at $O$
through $A, B, C$ is the **circumcircle**.  Its radius $R$ is the
**circumradius**.

### Where the circumcentre sits

- **Acute triangle:** $O$ is **inside** the triangle.
- **Right triangle:** $O$ is on the hypotenuse, at its midpoint.  (The
  hypotenuse is the diameter — Thales' theorem in reverse.)
- **Obtuse triangle:** $O$ is **outside** the triangle.

### The extended law of sines

For any triangle with sides $a, b, c$ opposite angles $A, B, C$ and
circumradius $R$:

$$\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R$$

This relates **everything**: side, angle, and circumradius.

**Quick computational use:** $R = \frac{a}{2 \sin A} = \frac{abc}{4 K}$ where
$K$ is the triangle's area.

**Pen & paper:** $\triangle$ with sides 13, 14, 15 (area 84).

$$R = \frac{13 \cdot 14 \cdot 15}{4 \cdot 84} = \frac{2730}{336} = \frac{65}{8} = 8.125$$

### Worked example — circumradius of a right triangle

> Right triangle with legs 6 and 8.

Hypotenuse: 10 (it's a $6{-}8{-}10$ scaled $3{-}4{-}5$).

$R$ = half the hypotenuse = 5.  (Direct from the "hypotenuse is the diameter"
fact.)  Sanity check: $K = \frac{1}{2} \cdot 6 \cdot 8 = 24$, so
$R = \frac{6 \cdot 8 \cdot 10}{4 \cdot 24} = \frac{480}{96} = 5$. ✓

### The Apollonius circle

For two fixed points $A$ and $B$ and a positive constant $k \ne 1$, the locus
of points $P$ such that $|PA|/|PB| = k$ is a **circle** — the **Apollonius
circle** of $A$ and $B$ with ratio $k$.

(When $k = 1$, the locus is the perpendicular bisector — a line, the
"degenerate" circle of infinite radius.)

**Coordinate proof.** Place $A = (0, 0)$ and $B = (d, 0)$.  $|PA|^2 = x^2 + y^2$,
$|PB|^2 = (x - d)^2 + y^2$.  Setting $|PA|^2 = k^2 |PB|^2$:

$$x^2 + y^2 = k^2 \left[(x - d)^2 + y^2\right]$$

Rearranging:

$$(1 - k^2)(x^2 + y^2) + 2 k^2 d x - k^2 d^2 = 0$$

Divide by $1 - k^2$ (since $k \ne 1$) and complete the square in $x$:

$$\left(x - \frac{k^2 d}{k^2 - 1}\right)^2 + y^2 = \frac{k^2 d^2}{(k^2 - 1)^2}$$

This is a circle with centre $\left(\frac{k^2 d}{k^2 - 1}, 0\right)$ and radius
$\frac{k d}{|k^2 - 1|}$.

### Apollonius circle and the angle bisectors

The Apollonius circle of $A, B$ with ratio $k = AB:AC$ (the ratio of the
two adjacent sides at vertex $A$) is the locus of all points $P$ such that
the line $AP$ extended is the **internal or external angle bisector** of
$\angle BPC$ for some configuration.

Two points on the segment $AB$ (or its extension) lie on this circle: the
internal and external division of $AB$ in the ratio $k : 1$.  These two
points are diametrically opposite, so they determine the circle.

(The Apollonius circle is the workhorse behind many "angular constraint"
problems: where to stand so that you see two landmarks under a fixed
angular ratio.)

### Worked example — Apollonius circle

> $A = (0, 0)$, $B = (10, 0)$.  Find the locus of $P$ such that $|PA| = 2 |PB|$
> (i.e. $k = 2$).

Apply the formula with $d = 10$, $k = 2$:

- Centre: $\frac{4 \cdot 10}{4 - 1} = \frac{40}{3}$ on the $x$-axis.
- Radius: $\frac{2 \cdot 10}{3} = \frac{20}{3}$.

Sanity-check at endpoints.  Internal divider: $P = (10/3, 0)$ — verify
$|PA| = 10/3, |PB| = 20/3$, ratio $1/2$.  Wait, we wanted $|PA|/|PB| = 2$,
so the **internal divider** for ratio $2$ is at the point dividing $AB$ in
ratio $2:1$ from $A$, i.e. $P = (20/3, 0)$.  Check: $|PA| = 20/3$,
$|PB| = 10/3$, ratio $= 2$. ✓

External divider: $P = (-10, 0)$.  Check: $|PA| = 10$, $|PB| = 20$, ratio
$= 1/2$ — wait that's $k = 1/2$.  For $k = 2$ external, $P$ is at $x$-coord
where $|x| = 2|x - 10|$ with opposite signs, giving $x = 20$.  $|PA| = 20$,
$|PB| = 10$, ratio $= 2$. ✓

So the circle passes through $(20/3, 0)$ and $(20, 0)$; centre at midpoint
$(20/3 + 20)/2 = 80/6 = 40/3$ ✓, radius $|20 - 40/3| = 20/3$ ✓.

## Python Verification

```python
# ── Circumcircle and Apollonius circle ──────────────────────
import numpy as np

def circumcentre(A, B, C):
    """Circumcentre of triangle ABC by intersecting two perpendicular bisectors."""
    A, B, C = map(np.array, (A, B, C))
    # The circumcentre satisfies |O - A|² = |O - B|² and |O - A|² = |O - C|²
    # → 2(B - A) · O = |B|² - |A|², 2(C - A) · O = |C|² - |A|²
    M = np.array([[2*(B[0]-A[0]), 2*(B[1]-A[1])],
                  [2*(C[0]-A[0]), 2*(C[1]-A[1])]])
    b = np.array([B[0]**2 + B[1]**2 - A[0]**2 - A[1]**2,
                  C[0]**2 + C[1]**2 - A[0]**2 - A[1]**2])
    O = np.linalg.solve(M, b)
    R = np.linalg.norm(O - A)
    return O, R

A = (0, 0); B = (14, 0); C = (5, 12)   # 13-14-15 triangle
O, R = circumcentre(A, B, C)
print(f"=== Circumcircle of 13-14-15 triangle ===")
print(f"  circumcentre O = {O}")
print(f"  circumradius R = {R}  (expected 65/8 = {65/8})")
print(f"  via formula R = abc / (4K): {(13*14*15)/(4*84)}")

# Right triangle: O at midpoint of hypotenuse
print("\n=== Right triangle 6-8-10 ===")
A2 = (0, 0); B2 = (6, 0); C2 = (0, 8)
O2, R2 = circumcentre(A2, B2, C2)
print(f"  O = {O2} (should be midpoint of hypotenuse BC = (3, 4))")
print(f"  R = {R2} (should be 5)")

# Extended law of sines
print("\n=== Extended law of sines (13-14-15) ===")
import math
a, b, c = 14, 15, 13
# Find angles via law of cosines
A_ang = math.degrees(math.acos((b*b + c*c - a*a) / (2*b*c)))
B_ang = math.degrees(math.acos((a*a + c*c - b*b) / (2*a*c)))
C_ang = math.degrees(math.acos((a*a + b*b - c*c) / (2*a*b)))
print(f"  a/sin A = {a/math.sin(math.radians(A_ang)):.4f}")
print(f"  b/sin B = {b/math.sin(math.radians(B_ang)):.4f}")
print(f"  c/sin C = {c/math.sin(math.radians(C_ang)):.4f}")
print(f"  2R = {2*R}  (all should equal)")

# Apollonius circle
print("\n=== Apollonius circle: |PA| = k |PB| ===")
A_pt = np.array([0, 0]); B_pt = np.array([10, 0]); k = 2.0
d = np.linalg.norm(B_pt - A_pt)
centre_x = k**2 * d / (k**2 - 1)
radius = k * d / abs(k**2 - 1)
print(f"  centre at x = {centre_x}, radius = {radius}")
# Verify: pick several points on the circle and check ratio
for theta in np.linspace(0, 2*np.pi, 8, endpoint=False):
    P = np.array([centre_x + radius*np.cos(theta), radius*np.sin(theta)])
    PA = np.linalg.norm(P - A_pt); PB = np.linalg.norm(P - B_pt)
    print(f"    P = ({P[0]:6.3f}, {P[1]:6.3f}): "
          f"|PA|/|PB| = {PA/PB:.6f}",
          "✓" if abs(PA/PB - k) < 1e-6 else "✗")
```

## Visualisation — circumcircle & Apollonius circles

```python
# ── Two pictures: triangle + circumcircle, and Apollonius circle ──
import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(1, 2, figsize=(14, 7))

# (1) Circumcircle of 13-14-15
ax = axes[0]
A = np.array([0., 0.]); B = np.array([14., 0.]); C = np.array([5., 12.])
ax.plot(*zip(A, B, C, A), "b-", lw=2)
ax.fill(*zip(A, B, C), alpha=0.15, color="tab:blue")

def circumcentre(A, B, C):
    M = np.array([[2*(B[0]-A[0]), 2*(B[1]-A[1])],
                  [2*(C[0]-A[0]), 2*(C[1]-A[1])]])
    b = np.array([B[0]**2+B[1]**2-A[0]**2-A[1]**2,
                  C[0]**2+C[1]**2-A[0]**2-A[1]**2])
    O = np.linalg.solve(M, b)
    return O, np.linalg.norm(O - A)

O, R = circumcentre(A, B, C)
theta = np.linspace(0, 2*np.pi, 200)
ax.plot(O[0] + R*np.cos(theta), O[1] + R*np.sin(theta), "r-", lw=2)
ax.plot(*O, "ro", ms=10); ax.text(O[0]+0.3, O[1]+0.3, "O", fontsize=14, color="red")

# Perpendicular bisectors of two sides
def perp_bisector(P, Q, length=20):
    M = (P + Q) / 2
    d = Q - P
    n = np.array([-d[1], d[0]]) / np.linalg.norm(d)
    return M - length*n, M + length*n

for P, Q in [(A, B), (B, C), (C, A)]:
    p1, p2 = perp_bisector(P, Q)
    ax.plot([p1[0], p2[0]], [p1[1], p2[1]], "g--", lw=1)

for label, pt in zip("ABC", [A, B, C]):
    ax.plot(*pt, "ko", ms=8); ax.text(pt[0]-0.4, pt[1]-0.6, label, fontsize=14)

ax.set_aspect("equal"); ax.grid(alpha=0.3)
ax.set_xlim(-5, 20); ax.set_ylim(-5, 16)
ax.set_title(f"Circumcircle (R ≈ {R:.3f})\nfrom intersection of three perpendicular bisectors")

# (2) Apollonius circle
ax = axes[1]
A_pt = np.array([0., 0.]); B_pt = np.array([10., 0.])
ax.plot(*A_pt, "ko", ms=10); ax.text(A_pt[0]-0.5, A_pt[1]-0.5, "A", fontsize=14)
ax.plot(*B_pt, "ko", ms=10); ax.text(B_pt[0]+0.2, B_pt[1]-0.5, "B", fontsize=14)

# Apollonius circles for several k values
for k, color in zip([0.5, 1, 2], ["tab:blue", "tab:gray", "tab:red"]):
    if k == 1:
        # Perpendicular bisector
        ax.axvline(5, color=color, linestyle="--", label=f"k = 1 (perp bisector)")
    else:
        d = 10
        cx = k**2 * d / (k**2 - 1)
        r = k * d / abs(k**2 - 1)
        ax.plot(cx + r*np.cos(theta), r*np.sin(theta), color=color, lw=2,
                label=f"|PA|/|PB| = {k}")
        ax.plot(cx, 0, "o", color=color, ms=8)

ax.set_aspect("equal"); ax.grid(alpha=0.3)
ax.set_xlim(-15, 25); ax.set_ylim(-15, 15)
ax.set_title("Apollonius circles for |PA|/|PB| = 0.5, 1, 2")
ax.legend()

plt.tight_layout()
plt.show()
```

## Connection to CS / Games / AI / Business / Industry

- **CS / Computational geometry** — circumcircle predicates are the heart of
  Delaunay triangulation algorithms; the in-circle test ("is point $P$
  inside circumcircle of $\triangle ABC$?") is the workhorse predicate.
- **CS / Computer graphics** — texture-mapping triangle-rasterisation often
  pre-computes circumradius for stable barycentric interpolation.
- **AI / Robotics** — multilateration localisation uses Apollonius circles:
  if a beacon's signal strength suggests a distance ratio between two
  receivers, the source must lie on an Apollonius circle.
- **Surveying / Navigation** — triangulation networks are built on
  circumcircle constraints; LORAN navigation uses the locus of points with
  a constant time-difference between two transmitters (an Apollonius
  hyperbola in 2D).
- **Robotics** — coverage planning: largest circle inscribed in a polygonal
  region (Chebyshev centre, related to incircle) and smallest enclosing
  circle (related to circumradius) are two ends of the planning spectrum.
- **Games / Procedural generation** — Voronoi diagrams (dual to Delaunay,
  hence circumcircle-based) generate organic-looking maps for terrain,
  cell layouts, and AI region partitioning.

## Check Your Understanding

1. **Pen & paper:** A right triangle has hypotenuse 26.  Find its
   circumradius without computing the legs.
2. **Pen & paper:** Triangle with sides 7, 24, 25.  Compute its area, then
   use $R = \frac{abc}{4K}$ to find the circumradius.
3. **Pen & paper:** In an equilateral triangle of side $s$, find $R$ in
   terms of $s$.  (Hint: use the law of sines with $A = 60°$ and $a = s$.)
4. **Pen & paper:** Find the equation of the Apollonius circle of points
   $A = (-3, 0)$ and $B = (3, 0)$ with ratio $k = 3$.
5. **Insight:** Why does the perpendicular-bisector concurrence work for
   *every* triangle (acute, right, obtuse), even though the circumcentre's
   position varies?  Trace through the locus argument and confirm the proof
   makes no assumption about acute/right/obtuse.
