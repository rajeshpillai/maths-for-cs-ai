# Collision Detection Math

## Intuition

Does the player's sword hit the enemy?  Is the ball touching the wall?
Collision detection answers these questions every frame.  The math ranges
from simple distance checks (circles/spheres) to more complex separating
axis tests (rectangles/polygons).

## Prerequisites

- Tier 8, Lesson 3: Distance Formula
- Tier 2, Lesson 2: Vector Operations (dot product)

## From First Principles

### Circle-circle collision

Two circles with centres $C_1, C_2$ and radii $r_1, r_2$ collide if:

$$\|C_1 - C_2\| < r_1 + r_2$$

Use squared distance to avoid sqrt:

$$\|C_1 - C_2\|^2 < (r_1 + r_2)^2$$

**Pen & paper:** $C_1 = (2, 3), r_1 = 1.5$ and $C_2 = (5, 7), r_2 = 2$.

$d^2 = (5-2)^2 + (7-3)^2 = 9 + 16 = 25$

$(r_1 + r_2)^2 = 3.5^2 = 12.25$

$25 > 12.25$ → **no collision**.

### AABB collision (Axis-Aligned Bounding Box)

Two rectangles with min/max corners:

Box A: $(x_{\min}^A, y_{\min}^A)$ to $(x_{\max}^A, y_{\max}^A)$

They overlap if and only if all axes overlap:

$$x_{\max}^A > x_{\min}^B \;\land\; x_{\max}^B > x_{\min}^A \;\land\; y_{\max}^A > y_{\min}^B \;\land\; y_{\max}^B > y_{\min}^A$$

**Pen & paper:** Box A: $(1, 1)$ to $(4, 3)$.  Box B: $(3, 2)$ to $(6, 5)$.

$4 > 3$ ✓, $6 > 1$ ✓, $3 > 2$ ✓, $5 > 1$ ✓ → **collision!**

Box C: $(5, 1)$ to $(7, 3)$.

$4 > 5$? ✗ → **no collision** (separated on x-axis).

### Point inside circle

$$\|P - C\|^2 < r^2$$

### Point inside AABB

$$x_{\min} \le P_x \le x_{\max} \;\land\; y_{\min} \le P_y \le y_{\max}$$

### Separating Axis Theorem (SAT)

Two convex shapes do **not** collide if and only if there exists a line (axis)
onto which their projections **don't overlap**.

For two rectangles (possibly rotated):
1. Test 4 axes: 2 edge normals from each rectangle
2. Project both shapes onto each axis
3. If projections overlap on ALL axes → collision
4. If ANY axis has a gap → no collision

### Sphere-sphere in 3D

Same as circle-circle:

$$\|C_1 - C_2\|^2 < (r_1 + r_2)^2$$

### Broad phase vs narrow phase

Real games don't check every pair of objects:

1. **Broad phase**: cheap tests (spatial hashing, quadtree, AABB) to find potential collisions
2. **Narrow phase**: precise tests (SAT, GJK) only on candidates from broad phase

## Python Verification

```python
# ── Collision Detection ─────────────────────────────────────

def dist_sq(a, b):
    return sum((ai-bi)**2 for ai, bi in zip(a, b))

# Circle-circle
print("=== Circle-Circle ===")
tests = [
    ((2,3), 1.5, (5,7), 2.0),
    ((0,0), 3.0, (4,0), 2.0),
    ((0,0), 3.0, (10,0), 2.0),
]
for c1, r1, c2, r2 in tests:
    d2 = dist_sq(c1, c2)
    threshold = (r1 + r2) ** 2
    hit = d2 < threshold
    print(f"  C1={c1} r={r1}, C2={c2} r={r2}: d²={d2}, (r1+r2)²={threshold:.1f} → {'HIT' if hit else 'miss'}")

# AABB-AABB
print(f"\n=== AABB-AABB ===")
def aabb_overlap(a_min, a_max, b_min, b_max):
    for i in range(len(a_min)):
        if a_max[i] <= b_min[i] or b_max[i] <= a_min[i]:
            return False
    return True

tests_aabb = [
    ((1,1), (4,3), (3,2), (6,5)),
    ((1,1), (4,3), (5,1), (7,3)),
    ((0,0), (2,2), (1,1), (3,3)),
]
for a_min, a_max, b_min, b_max in tests_aabb:
    hit = aabb_overlap(a_min, a_max, b_min, b_max)
    print(f"  A={a_min}-{a_max}, B={b_min}-{b_max}: {'HIT' if hit else 'miss'}")

# Point inside circle
print(f"\n=== Point inside circle ===")
circle = ((5, 5), 3)
for point in [(5, 5), (7, 5), (8, 5), (5, 8.1)]:
    inside = dist_sq(point, circle[0]) < circle[1]**2
    print(f"  {point} in circle({circle[0]}, r={circle[1]}): {inside}")

# Game simulation: moving circle vs static circle
print(f"\n=== Moving collision check ===")
# Player at (0,0) moving right at 1 unit/frame, radius 0.5
# Enemy at (5,0), radius 1.0
player_pos = [0.0, 0.0]
player_r = 0.5
enemy_pos = (5.0, 0.0)
enemy_r = 1.0
velocity = (1.0, 0.0)

for frame in range(8):
    d2 = dist_sq(player_pos, enemy_pos)
    threshold = (player_r + enemy_r) ** 2
    hit = d2 < threshold
    status = "COLLISION!" if hit else ""
    print(f"  Frame {frame}: player=({player_pos[0]:.1f},{player_pos[1]:.1f}), d={d2**0.5:.2f} {status}")
    player_pos[0] += velocity[0]
    player_pos[1] += velocity[1]
```

## Visualisation — Three collision tests at a glance

Three of the most-used collision tests in 2-D games and physics
engines: circle–circle (cheapest), AABB (axis-aligned bounding box,
fast and pixel-perfect for many cases), and point-in-polygon (used
for clicking on irregular shapes). The plot draws each test with hit
and miss cases side by side.

```python
# ── Visualising 2-D collision detection ─────────────────────
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Circle, Rectangle, Polygon

fig, axes = plt.subplots(1, 3, figsize=(16, 5.5))

# (1) Circle-vs-circle: collide iff distance between centres ≤ sum of radii.
ax = axes[0]
pairs = [
    ((1, 1), 0.7, (3.0, 1), 0.7, "MISS"),       # gap of 0.6
    ((6, 1), 0.7, (7.2, 1), 0.7, "HIT"),         # overlap 0.2
    ((1, 3), 0.7, (2.4, 3), 0.7, "TOUCH"),       # exact contact
]
for (c1, r1, c2, r2, label) in pairs:
    d = np.linalg.norm(np.array(c1) - np.array(c2))
    color = "tab:red" if d < r1 + r2 else "tab:green" if d > r1 + r2 + 0.05 else "tab:orange"
    ax.add_patch(Circle(c1, r1, fill=False, edgecolor=color, lw=2))
    ax.add_patch(Circle(c2, r2, fill=False, edgecolor=color, lw=2))
    midpt = ((c1[0] + c2[0]) / 2, (c1[1] + c2[1]) / 2)
    ax.text(midpt[0], midpt[1] + 1.2, f"{label}\nd = {d:.2f},  r1+r2 = {r1+r2:.2f}",
            ha="center", fontsize=9, color=color, fontweight="bold")
ax.set_xlim(-1, 9); ax.set_ylim(-1, 5); ax.set_aspect("equal")
ax.set_title("Circle vs Circle: collide if d ≤ r₁ + r₂")
ax.grid(True, alpha=0.3)

# (2) AABB vs AABB: collide iff they overlap on BOTH x and y axes.
ax = axes[1]
boxes = [
    ((0, 0), 2, 1.5, "A"),
    ((1.5, 0.5), 2, 1.5, "B (overlaps A)"),
    ((4, 0), 1.5, 1, "C (no overlap with A or B)"),
]
colors = ["tab:blue", "tab:red", "tab:green"]
for (xy, w, h, label), color in zip(boxes, colors):
    ax.add_patch(Rectangle(xy, w, h, fill=False, edgecolor=color, lw=2))
    ax.text(xy[0] + w/2, xy[1] + h/2, label, color=color, fontsize=10,
            ha="center", va="center", fontweight="bold")
# AABB overlap test for A vs B and A vs C.
def aabb_overlap(a, b):
    (ax_, ay_), aw, ah, _ = a
    (bx_, by_), bw, bh, _ = b
    return ax_ < bx_ + bw and bx_ < ax_ + aw and ay_ < by_ + bh and by_ < ay_ + ah
ax.text(0.5, 3.2, f"A ↔ B: {'HIT' if aabb_overlap(boxes[0], boxes[1]) else 'MISS'}",
        fontsize=10, fontweight="bold", color="tab:red" if aabb_overlap(boxes[0], boxes[1]) else "tab:green")
ax.text(0.5, 2.8, f"A ↔ C: {'HIT' if aabb_overlap(boxes[0], boxes[2]) else 'MISS'}",
        fontsize=10, fontweight="bold", color="tab:red" if aabb_overlap(boxes[0], boxes[2]) else "tab:green")
ax.set_xlim(-1, 7); ax.set_ylim(-1, 4); ax.set_aspect("equal")
ax.set_title("AABB: overlap on BOTH axes\n(else miss)")
ax.grid(True, alpha=0.3)

# (3) Point-in-polygon by ray-casting.
ax = axes[2]
poly = np.array([[1, 1], [4, 1], [5, 3], [3, 4.5], [0.5, 3]])
ax.add_patch(Polygon(poly, closed=True, fill=False, edgecolor="black", lw=2))
def point_in_polygon(p, poly):
    """Cast a ray to the right; count edges crossed (odd = inside)."""
    x, y = p
    inside = False
    j = len(poly) - 1
    for i in range(len(poly)):
        xi, yi = poly[i]; xj, yj = poly[j]
        if ((yi > y) != (yj > y)) and \
           (x < (xj - xi) * (y - yi) / (yj - yi + 1e-12) + xi):
            inside = not inside
        j = i
    return inside

test_points = [(2.5, 2), (5, 4), (3, 0.5), (0, 3), (3.5, 3)]
for p in test_points:
    inside = point_in_polygon(p, poly)
    color = "tab:red" if inside else "tab:green"
    ax.scatter(*p, color=color, s=100, zorder=5)
    ax.annotate(f"{p}: {'IN' if inside else 'OUT'}", xy=p,
                xytext=(p[0] + 0.2, p[1] + 0.2), fontsize=9, color=color)
ax.set_xlim(-1, 7); ax.set_ylim(-1, 6); ax.set_aspect("equal")
ax.set_title("Point in polygon (ray-cast test)\nodd # crossings = inside")
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Print the test results to corroborate.
print("Circle-vs-circle results:")
for (c1, r1, c2, r2, label) in pairs:
    d = np.linalg.norm(np.array(c1) - np.array(c2))
    print(f"  centres {c1}, {c2}: d = {d:.3f}, r1+r2 = {r1+r2:.3f}  →  {label}")
print()
print("Point-in-polygon results:")
for p in test_points:
    print(f"  {p}: {'inside' if point_in_polygon(p, poly) else 'outside'}")
```

**Three workhorses of every physics / game engine:**

- **Circle vs circle**: one square root (or just compare squared
  distances, no `sqrt` needed — that's the trick every engine
  uses for performance). $d^2 \le (r_1 + r_2)^2$ is a single
  multiplication-and-compare.
- **AABB vs AABB** ("axis-aligned bounding box"): overlap on **both**
  axes ⇒ hit. Used as the *broad phase* of collision detection — a
  fast first pass that throws away most pairs before doing the
  expensive precise tests.
- **Point in polygon by ray-casting**: cast a ray from the test point
  and count how many polygon edges it crosses. Odd ⇒ inside, even ⇒
  outside. This is exactly what *clicking on a country in an
  interactive map* does, and how irregular collision shapes work in
  Box2D and Bullet.

Combining these three handles ~95% of the geometry queries in any 2-D
game; the same shapes generalise to **3-D** (sphere, AABB, mesh) for
3-D engines.

## Connection to CS / Games / AI

- **Physics engines** — Box2D (2D), Bullet/PhysX (3D) use these algorithms
- **Spatial partitioning** — quadtrees, octrees, BVH (bounding volume hierarchies) for broad phase
- **GJK algorithm** — general convex shape collision (used in most 3D engines)
- **Continuous collision** — sweep tests to prevent fast objects from tunnelling through thin walls
- **Trigger volumes** — "enter this area to start cutscene" = point-inside-AABB test

## Check Your Understanding

1. **Pen & paper:** Two circles: $(0,0)$ r=5 and $(6,8)$ r=3.  Do they collide?
2. **Pen & paper:** AABB A: $(0,0)$ to $(3,3)$.  AABB B: $(2,-1)$ to $(5,2)$.  Overlap?
3. **Pen & paper:** A sphere at $(0,0,0)$ r=2 and sphere at $(1,1,1)$ r=1.  Do they intersect?  (Compute $d^2$ and compare to $(r_1+r_2)^2$.)
4. **Think about it:** Why do games use AABB for broad-phase even for rotated objects?
