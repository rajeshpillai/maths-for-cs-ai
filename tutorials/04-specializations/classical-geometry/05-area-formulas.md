# Area Formulas — Polygons, Trapezoids, Kites, Regular n-gons

## Intuition

A handful of area formulas cover almost every polygon you'll meet:
$\frac{1}{2}bh$ for triangles, $bh$ for parallelograms,
$\frac{1}{2}(a + b)h$ for trapezoids, $\frac{1}{2}d_1 d_2$ for kites and
rhombi.  Each formula has a one-picture proof — and once you internalise
those proofs, you can derive area formulas for shapes nobody has named.

## Prerequisites

- Foundation 2, Lesson 5: Coordinate geometry
- Classical Geometry, Lesson 3: Special triangles
- Classical Geometry, Lesson 4: Triangle inequality (for valid configurations)

## From First Principles

### Triangle — base × height ÷ 2

For any triangle, drop a perpendicular from one vertex (the **apex**) to the
opposite side (the **base**).  The perpendicular's length is the **height**.

$$\text{area} = \frac{1}{2} b h$$

**Proof by completing to a parallelogram.** Take any triangle $ABC$.  Reflect
it across the midpoint of one side (say $BC$).  Two congruent triangles fit
together into a parallelogram with base $b$ and height $h$.  The triangle is
half the parallelogram.

Three different (base, height) pairs give the **same** area for the same
triangle — a useful sanity check.

**Coordinate version (shoelace for a triangle).**

$$\text{area} = \frac{1}{2}\left|\,x_A(y_B - y_C) + x_B(y_C - y_A) + x_C(y_A - y_B)\,\right|$$

### Parallelogram — base × height

Cut a parallelogram by a perpendicular from one corner to the opposite side.
The triangle that gets cut off, when slid to the other side, fills the
parallelogram into a rectangle of base $b$ and height $h$.

$$\text{area} = b h$$

### Rectangle and square — special cases

A rectangle is a parallelogram with right angles: $\text{area} = \ell w$.
A square is a rectangle with $\ell = w$: $\text{area} = s^2$.

### Trapezoid — average of parallel sides times height

A **trapezoid** has two parallel sides (the **bases**) of lengths $a$ and $b$,
separated by **height** $h$.

$$\text{area} = \frac{1}{2}(a + b) h$$

**Proof by averaging.** Cut the trapezoid along its **midline** (the segment
joining the midpoints of the two non-parallel sides).  The midline has
length $\frac{a + b}{2}$ (the average) and is parallel to the bases.  The
trapezoid is equivalent to a rectangle with that base and height $h$.

(Alternative proof: split into two triangles — one with base $a$ and the
other with base $b$ — both with height $h$.  Sum gives the same formula.)

### Kite and rhombus — half the product of diagonals

A **kite** has two pairs of adjacent equal sides; its diagonals are
perpendicular.

A **rhombus** is a special kite where **all four** sides are equal.

For both shapes:

$$\text{area} = \frac{1}{2} d_1 d_2$$

where $d_1, d_2$ are the lengths of the two diagonals.

**Proof.** The two perpendicular diagonals split the kite/rhombus into 4
right triangles.  Pair them up to form 2 rectangles whose total area is
$d_1 d_2$.  The kite is half of that.

### Regular polygon — apothem × perimeter ÷ 2

A **regular $n$-gon** has all sides and all interior angles equal.  Let $s$
be the side length and $a$ the **apothem** (perpendicular distance from
centre to a side).

$$\text{area} = \frac{1}{2} \, n \, s \, a = \frac{1}{2} \, P \, a$$

where $P = ns$ is the perimeter.

**Proof.** Connect the centre to all vertices; this divides the polygon into
$n$ congruent isosceles triangles, each with base $s$ and height $a$.

For a regular $n$-gon inscribed in a circle of radius $R$:

$$s = 2 R \sin\left(\frac{\pi}{n}\right), \qquad a = R \cos\left(\frac{\pi}{n}\right)$$

So $\text{area} = \frac{1}{2} n R^2 \sin\left(\frac{2\pi}{n}\right)$, which approaches
$\pi R^2$ as $n \to \infty$ — the area of the circle.

### Irregular polygon — the shoelace formula

For a polygon with vertices $(x_1, y_1), (x_2, y_2), \ldots, (x_n, y_n)$
listed in order:

$$\text{area} = \frac{1}{2} \left|\, \sum_{i=1}^{n} (x_i \, y_{i+1} - x_{i+1} \, y_i) \,\right|$$

(indices mod $n$, so $x_{n+1} = x_1$ etc.)

**Why "shoelace"?**  The cross-multiplications $(x_i)(y_{i+1})$ and
$(x_{i+1})(y_i)$ form a criss-cross pattern reminiscent of lacing a shoe.

This formula handles **any simple polygon**, convex or not, regular or not.

### Worked example — area of a trapezoid

> Trapezoid with parallel sides 6 and 14, height 5.
> 
> $$\text{area} = \frac{1}{2}(6 + 14)(5) = \frac{1}{2}(20)(5) = 50$$

### Worked example — area of a regular hexagon

> Regular hexagon with side 4.
> 
> Apothem: $a = \frac{4 \sqrt{3}}{2} = 2\sqrt{3}$ (using the $30°{-}60°{-}90°$
> structure of the central triangles).
> 
> $$\text{area} = \frac{1}{2} \cdot (6 \cdot 4) \cdot 2\sqrt{3} = 24 \sqrt{3} \approx 41.57$$

## Python Verification

```python
# ── Area formulas: verify with shoelace on the same shapes ──
import numpy as np

def shoelace(pts):
    """Area of polygon by shoelace formula."""
    pts = np.array(pts)
    x, y = pts[:, 0], pts[:, 1]
    return 0.5 * abs(np.sum(x * np.roll(y, -1) - np.roll(x, -1) * y))

# Triangle 1/2 b h
print("=== Triangle ===")
b, h = 6, 4
A = (0, 0); B = (b, 0); C = (2, h)   # any apex with that height
formula = 0.5 * b * h
shoe = shoelace([A, B, C])
print(f"  formula 1/2 * 6 * 4 = {formula}, shoelace = {shoe}",
      "✓" if abs(formula - shoe) < 1e-9 else "✗")

# Parallelogram
print("\n=== Parallelogram ===")
b, h = 8, 5
para = [(0, 0), (b, 0), (b + 2, h), (2, h)]
formula = b * h
shoe = shoelace(para)
print(f"  formula 8 * 5 = {formula}, shoelace = {shoe}",
      "✓" if abs(formula - shoe) < 1e-9 else "✗")

# Trapezoid
print("\n=== Trapezoid ===")
a, b, h = 6, 14, 5
trap = [(0, 0), (b, 0), (b - 4, h), (4, h)]   # parallel bases 6 (top) and 14 (bottom)
formula = 0.5 * (a + b) * h
shoe = shoelace(trap)
print(f"  formula 0.5*(6+14)*5 = {formula}, shoelace = {shoe}",
      "✓" if abs(formula - shoe) < 1e-9 else "✗")

# Kite (perpendicular diagonals)
print("\n=== Kite ===")
d1, d2 = 8, 6
# Place diagonals along axes: vertices at (±d1/2, 0) and (0, ±d2/2)
kite = [(-d1/2, 0), (0, -d2/2), (d1/2, 0), (0, d2/2)]
formula = 0.5 * d1 * d2
shoe = shoelace(kite)
print(f"  formula 0.5*8*6 = {formula}, shoelace = {shoe}",
      "✓" if abs(formula - shoe) < 1e-9 else "✗")

# Regular hexagon
print("\n=== Regular hexagon (side 4) ===")
s = 4
n = 6
R = s / (2 * np.sin(np.pi / n))   # circumradius
verts = [(R * np.cos(2 * np.pi * k / n), R * np.sin(2 * np.pi * k / n)) for k in range(n)]
apothem = R * np.cos(np.pi / n)
formula = 0.5 * n * s * apothem
shoe = shoelace(verts)
print(f"  formula 0.5 * 6 * 4 * 2√3 ≈ {formula:.4f}")
print(f"  shoelace = {shoe:.4f}", "✓" if abs(formula - shoe) < 1e-6 else "✗")
print(f"  exact 24√3 ≈ {24 * np.sqrt(3):.4f}")

# Polygon area approximating a circle
print("\n=== Regular n-gon area → π R^2 as n → ∞ ===")
R = 1.0
for n in [3, 6, 12, 24, 100, 1000]:
    area_n = 0.5 * n * R*R * np.sin(2 * np.pi / n)
    print(f"  n = {n:>4}: area = {area_n:.6f}, π = {np.pi:.6f}, "
          f"diff = {np.pi - area_n:.2e}")
```

## Visualisation — five shapes with their area formulas

```python
# ── Side-by-side display of triangle, parallelogram, trapezoid, kite, hexagon ──
import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(1, 5, figsize=(18, 4))

# Triangle
ax = axes[0]
T = [(0,0), (6,0), (4,5), (0,0)]
ax.fill(*zip(*T[:-1]), alpha=0.3, color="tab:blue")
ax.plot(*zip(*T), "b-", lw=2)
ax.plot([4, 4], [0, 5], "k--", lw=1)
ax.text(4.1, 2.5, "h = 5", fontsize=10)
ax.text(3, -0.5, "b = 6", ha="center", fontsize=10)
ax.set_title("Triangle\nA = ½ b h = 15")
ax.set_aspect("equal"); ax.set_xlim(-1, 7); ax.set_ylim(-1, 6)
ax.grid(alpha=0.3)

# Parallelogram
ax = axes[1]
P = [(0,0), (8,0), (10,4), (2,4), (0,0)]
ax.fill(*zip(*P[:-1]), alpha=0.3, color="tab:green")
ax.plot(*zip(*P), "g-", lw=2)
ax.plot([2, 2], [0, 4], "k--", lw=1)
ax.text(2.1, 2, "h = 4", fontsize=10)
ax.text(4, -0.5, "b = 8", ha="center", fontsize=10)
ax.set_title("Parallelogram\nA = b h = 32")
ax.set_aspect("equal"); ax.set_xlim(-1, 11); ax.set_ylim(-1, 5)
ax.grid(alpha=0.3)

# Trapezoid
ax = axes[2]
T = [(0,0), (10,0), (8,4), (2,4), (0,0)]
ax.fill(*zip(*T[:-1]), alpha=0.3, color="tab:orange")
ax.plot(*zip(*T), color="tab:orange", lw=2)
ax.plot([2, 2], [0, 4], "k--", lw=1)
ax.text(2.1, 2, "h = 4", fontsize=10)
ax.text(5, -0.5, "b = 10", ha="center", fontsize=10)
ax.text(5, 4.2, "a = 6", ha="center", fontsize=10)
ax.set_title("Trapezoid\nA = ½ (a+b) h = 32")
ax.set_aspect("equal"); ax.set_xlim(-1, 11); ax.set_ylim(-1, 5)
ax.grid(alpha=0.3)

# Kite (perpendicular diagonals)
ax = axes[3]
d1, d2 = 8, 6
K = [(-d1/2, 0), (0, -d2/2), (d1/2, 0), (0, d2/2), (-d1/2, 0)]
ax.fill(*zip(*K[:-1]), alpha=0.3, color="tab:red")
ax.plot(*zip(*K), color="tab:red", lw=2)
ax.plot([-d1/2, d1/2], [0, 0], "k--", lw=1)
ax.plot([0, 0], [-d2/2, d2/2], "k--", lw=1)
ax.text(0, -3.4, "d₁ = 8", ha="center", fontsize=10)
ax.text(-3, 0.2, "d₂ = 6", fontsize=10)
ax.set_title("Kite\nA = ½ d₁ d₂ = 24")
ax.set_aspect("equal"); ax.set_xlim(-5, 5); ax.set_ylim(-4, 4)
ax.grid(alpha=0.3)

# Regular hexagon
ax = axes[4]
n = 6; R = 3
hex_pts = [(R * np.cos(2*np.pi*k/n + np.pi/2), R * np.sin(2*np.pi*k/n + np.pi/2))
           for k in range(n)]
hex_pts.append(hex_pts[0])
ax.fill(*zip(*hex_pts[:-1]), alpha=0.3, color="tab:purple")
ax.plot(*zip(*hex_pts), color="tab:purple", lw=2)
# Triangle subdivisions
for k in range(n):
    ax.plot([0, hex_pts[k][0]], [0, hex_pts[k][1]], "k--", lw=0.5)
ax.set_title(f"Regular hexagon (s = {2*R*np.sin(np.pi/n):.2f})\nA = ½ n s a")
ax.set_aspect("equal"); ax.set_xlim(-4, 4); ax.set_ylim(-4, 4)
ax.grid(alpha=0.3)

plt.tight_layout()
plt.show()
```

## Connection to CS / Games / AI / Business / Industry

- **CS / Computational geometry** — the shoelace formula is the standard
  polygon-area routine in libraries (Shapely, GEOS, CGAL); it's $O(n)$ and
  works for any simple polygon.
- **CS / Computer graphics** — fill algorithms compute shape area to
  estimate antialiasing weights; texture-coordinate area-mapping uses these
  formulas to keep texel density uniform.
- **AI / vision** — instance segmentation reports masks as polygons, and IoU
  (Intersection-over-Union) requires fast area computation via shoelace.
- **GIS / Mapping** — shapefile area calculations (parcel sizes, lake areas,
  watershed boundaries) all use shoelace on polygon vertices stored in WGS84.
- **Games / Physics** — 2D collision response uses polygon area + centroid
  to compute moments of inertia; navigation meshes evaluate cell areas to
  weight pathfinding.
- **Engineering / Architecture** — structural analysis evaluates cross-
  sectional areas of beams (often I-beams or T-beams) by decomposing into
  rectangles and triangles.
- **Real estate / Surveying** — lot-area calculations from coordinate-defined
  property corners use shoelace; trapezoidal-rule approximations are common
  in hand-surveyed plots.

## Check Your Understanding

1. **Pen & paper:** Find the area of a trapezoid with parallel sides 9 and 15
   and height 6.
2. **Pen & paper:** A rhombus has diagonals 10 and 24.  Find its area and
   side length (use Pythagoras on the half-diagonals).
3. **Pen & paper:** A regular octagon has side 5.  Compute its apothem and
   area.  Hint: the central triangle is isosceles with apex angle $360°/8$.
4. **Pen & paper:** Use the shoelace formula to compute the area of the
   polygon with vertices $(0, 0), (4, 0), (5, 3), (2, 5), (-1, 2)$.
5. **Insight:** Why does the shoelace formula give a *signed* area (positive
   for counter-clockwise vertex ordering, negative for clockwise)?  How can
   you use this to detect winding direction in computational geometry?
