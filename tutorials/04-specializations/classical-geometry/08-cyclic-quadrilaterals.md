# Cyclic Quadrilaterals — Four Points on a Circle

## Intuition

Four points either lie on a common circle or they don't.  The four-point
configurations that **do** are called **cyclic quadrilaterals**, and they
satisfy a beautiful diagnostic: their opposite interior angles sum to $180°$.
That single property — combined with **Ptolemy's theorem** on the diagonals
— makes cyclic quadrilaterals one of the most powerful tools in classical
geometry.

## Prerequisites

- Foundation 2, Lesson 5: Coordinate geometry (circles)
- Classical Geometry, Lesson 1: Angle-chasing
- Classical Geometry, Lesson 7: Inscribed angle theorem

## From First Principles

### Definition

A **cyclic quadrilateral** $ABCD$ is a quadrilateral whose four vertices all
lie on a single circle (the **circumscribed circle**).

The four sides are then chords of that circle, and the diagonals $AC$ and
$BD$ are also chords.

### The opposite-angle theorem

In any cyclic quadrilateral $ABCD$:

$$\angle A + \angle C = 180°, \qquad \angle B + \angle D = 180°$$

Opposite interior angles are **supplementary**.

**Proof.**  $\angle A = \angle DAB$ is the inscribed angle subtending arc
$BCD$ (the major arc containing $C$).  $\angle C = \angle BCD$ is the
inscribed angle subtending the **other** arc, $BAD$.  These two arcs together
make up the **entire circle** (full $360°$).

By the inscribed angle theorem, $\angle A + \angle C = \frac{1}{2}(360°) = 180°$.
∎

### The converse — recognising cyclic quadrilaterals

If $ABCD$ has $\angle A + \angle C = 180°$ (or equivalently $\angle B + \angle D = 180°$),
then $ABCD$ is cyclic.

**Use case.**  When you suspect four points lie on a circle, sum the opposite
angles.  If the sum is $180°$, you can invoke every cyclic-quadrilateral
property (and the inscribed-angle theorem).

### Other characterisations of "$ABCD$ is cyclic"

These are all equivalent:

1. $\angle DAB + \angle BCD = 180°$ (opposite angles supplementary).
2. $\angle DBC = \angle DAC$ (two inscribed angles from same arc $DC$).
3. $|AC| \cdot |BD| = |AB| \cdot |CD| + |BC| \cdot |AD|$ (Ptolemy's identity, for
   convex case — see below).
4. The **power of any point** equals on both pairs of intersecting chords.

Each one is useful in different contexts.  Property 2 is the **most-used**
in olympiad chasing: it lets you "transport" angles from one inscribed
position to another.

### Ptolemy's theorem

For a convex cyclic quadrilateral with sides $a, b, c, d$ (in order) and
diagonals $p, q$:

$$p \cdot q = a c + b d$$

**The product of diagonals equals the sum of the products of opposite sides.**

For non-cyclic convex quadrilaterals, the inequality $pq \le ac + bd$ holds,
with equality iff cyclic (Ptolemy's inequality).

**Proof sketch.**  Pick a point $E$ on diagonal $AC$ such that
$\angle ABE = \angle DBC$ (angle-chase).  Then $\triangle ABE \sim \triangle DBC$
and $\triangle EBC \sim \triangle ABD$ (both by AA, using cyclic-quadrilateral
angle equalities).  Reading off side ratios from each pair and summing
gives Ptolemy.

### Worked example — finding a missing angle

> $ABCD$ is a cyclic quadrilateral with $\angle A = 70°$ and $\angle B = 95°$.
> Find $\angle C$ and $\angle D$.

By opposite angles: $\angle C = 180° - 70° = 110°$, $\angle D = 180° - 95° = 85°$.

Sanity check: $\angle A + \angle B + \angle C + \angle D = 70 + 95 + 110 + 85 = 360°$ ✓
(any quadrilateral has interior angles summing to $360°$).

### Worked example — applying Ptolemy

> A cyclic quadrilateral has consecutive sides $5, 7, 6, 8$ and one diagonal
> equal to 9.  Find the other diagonal.

By Ptolemy: $9 \cdot q = 5 \cdot 6 + 7 \cdot 8 = 30 + 56 = 86$.  So $q = 86/9 \approx 9.56$.

(Note: not every quadruple of sides gives a cyclic quadrilateral.  Existence
is a separate question — it depends on whether you can place the four
sides around a circle.)

### Special cases

- **Rectangle** is cyclic: opposite angles $90° + 90° = 180°$. ✓ Its
  circumcircle has the diagonal as diameter.
- **Isosceles trapezoid** is cyclic: opposite angles are supplementary by
  the parallel-side reasoning.
- **Parallelogram** (non-rectangle) is **not** cyclic: opposite angles are
  equal but not generally $180°$ (would need each to be $90°$).
- **Kite** is cyclic only if two opposite angles are right angles.

### Connection to the inscribed-angle theorem

Cyclic quadrilateral identities are direct consequences of the inscribed-angle
theorem.  In particular, for any chord $XY$ of the circle and any two
inscribed points $P, Q$ on the same arc:

$$\angle XPY = \angle XQY$$

This is the property you'll most often invoke when angle-chasing in
configurations with four concyclic points.

## Python Verification

```python
# ── Cyclic quadrilateral checks ─────────────────────────────
import numpy as np

def angle_at(P, A, B):
    PA = A - P; PB = B - P
    cos = np.dot(PA, PB) / (np.linalg.norm(PA) * np.linalg.norm(PB))
    cos = np.clip(cos, -1, 1)
    return np.degrees(np.arccos(cos))

# Place 4 points on a unit circle at chosen angles
def on_circle(deg, r=1.0):
    return r * np.array([np.cos(np.radians(deg)), np.sin(np.radians(deg))])

A = on_circle(20); B = on_circle(110); C = on_circle(200); D = on_circle(290)

# Compute interior angles of quadrilateral ABCD
def interior(P, prev, nxt):
    return angle_at(P, prev, nxt)

print("=== Cyclic quadrilateral interior angles ===")
ang_A = interior(A, D, B)
ang_B = interior(B, A, C)
ang_C = interior(C, B, D)
ang_D = interior(D, C, A)
print(f"  ∠A = {ang_A:.3f}°,  ∠C = {ang_C:.3f}°,  sum = {ang_A + ang_C:.3f}°")
print(f"  ∠B = {ang_B:.3f}°,  ∠D = {ang_D:.3f}°,  sum = {ang_B + ang_D:.3f}°")
print(f"  total = {ang_A + ang_B + ang_C + ang_D:.3f}° (should be 360°)")

# Ptolemy check
def dist(P, Q): return np.linalg.norm(P - Q)
a = dist(A, B); b = dist(B, C); c = dist(C, D); d = dist(D, A)
p = dist(A, C); q = dist(B, D)
ptol_lhs = p * q
ptol_rhs = a * c + b * d
print(f"\n=== Ptolemy ===")
print(f"  diagonals: {p:.4f} × {q:.4f} = {ptol_lhs:.4f}")
print(f"  ac + bd:  {a:.3f}*{c:.3f} + {b:.3f}*{d:.3f} = {ptol_rhs:.4f}",
      "✓" if abs(ptol_lhs - ptol_rhs) < 1e-6 else "✗")

# Recognise cyclic-or-not by angle test
print("\n=== Non-cyclic example ===")
# Move D off the circle
D_off = D + np.array([0.3, 0.0])
ang_A2 = interior(A, D_off, B)
ang_C2 = interior(C, B, D_off)
ang_B2 = interior(B, A, C)
ang_D2 = interior(D_off, C, A)
print(f"  ∠A + ∠C = {ang_A2 + ang_C2:.3f}° (was 180° when cyclic)")
print(f"  Now off the circle → not cyclic.")
```

## Visualisation — cyclic quadrilateral and the angle relations

```python
# ── Draw a cyclic quadrilateral with opposite angle annotations ──
import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(1, 2, figsize=(14, 7))

# Cyclic quadrilateral
ax = axes[0]
theta = np.linspace(0, 2 * np.pi, 200)
ax.plot(np.cos(theta), np.sin(theta), "k-", lw=1, alpha=0.7)
ax.plot(0, 0, "k+", ms=8)

A = (np.cos(np.radians(20)), np.sin(np.radians(20)))
B = (np.cos(np.radians(110)), np.sin(np.radians(110)))
C = (np.cos(np.radians(200)), np.sin(np.radians(200)))
D = (np.cos(np.radians(290)), np.sin(np.radians(290)))

quad = [A, B, C, D, A]
ax.plot(*zip(*quad), "b-", lw=2)
ax.fill(*zip(*[A, B, C, D]), alpha=0.15, color="tab:blue")
# Diagonals
ax.plot(*zip(A, C), "r--", lw=1)
ax.plot(*zip(B, D), "r--", lw=1)
for label, pt in zip("ABCD", [A, B, C, D]):
    ax.plot(*pt, "ko", ms=8)
    ax.text(pt[0]*1.15, pt[1]*1.15, label, fontsize=14)
ax.set_title("Cyclic quadrilateral ABCD\n∠A + ∠C = ∠B + ∠D = 180°")
ax.set_aspect("equal"); ax.grid(alpha=0.3)
ax.set_xlim(-1.4, 1.4); ax.set_ylim(-1.4, 1.4)

# Non-cyclic example
ax = axes[1]
ax.plot(np.cos(theta), np.sin(theta), "k-", lw=1, alpha=0.7)
A2 = A
B2 = B
C2 = C
D2 = (D[0] + 0.4, D[1])  # off the circle
quad = [A2, B2, C2, D2, A2]
ax.plot(*zip(*quad), "g-", lw=2)
ax.fill(*zip(*[A2, B2, C2, D2]), alpha=0.15, color="tab:green")
for label, pt in zip("ABCD", [A2, B2, C2, D2]):
    ax.plot(*pt, "ko", ms=8)
    ax.text(pt[0]*1.15, pt[1]*1.15, label, fontsize=14)
ax.set_title("D moved off the circle\n→ not cyclic; opposite angles ≠ 180°")
ax.set_aspect("equal"); ax.grid(alpha=0.3)
ax.set_xlim(-1.6, 2); ax.set_ylim(-1.4, 1.4)

plt.tight_layout()
plt.show()
```

## Connection to CS / Games / AI / Business / Industry

- **CS / Computational geometry** — the **Delaunay triangulation** is defined
  by the property that no four input points are cocyclic in a "bad" way; the
  legality test for an edge flip is equivalent to checking whether four
  points form a cyclic quadrilateral.
- **CS / Robust geometry** — the in-circle predicate ("is point $D$ inside the
  circumcircle of $\triangle ABC$?") is the workhorse of polygon-mesh
  algorithms; cyclic quadrilateral arguments justify every flip operation.
- **AI / vision** — fitting a circle to four observed points and rejecting
  outliers uses Ptolemy's inequality as a noise-robust diagnostic.
- **Games / Graphics** — Voronoi diagrams (used in procedural generation,
  AI navigation, fluid simulation) are dual to Delaunay, hence to cyclic-
  quadrilateral testing.
- **Engineering / Architecture** — Gothic tracery and rose-window design
  rely on cyclic quadrilateral constraints to keep stone elements
  geometrically consistent.
- **Astronomy** — historical use of Ptolemy's theorem for astronomical chord
  tables (the closest-to-modern-trigonometry tool of antiquity); the modern
  half-angle formulas can be derived from it.

## Check Your Understanding

1. **Pen & paper:** $ABCD$ cyclic with $\angle A = 110°$, $\angle B = 85°$.
   Find $\angle C$ and $\angle D$.
2. **Pen & paper:** A rectangle is cyclic — what is its circumradius in
   terms of its sides?  (Hint: the diagonal is the diameter.)
3. **Pen & paper:** A cyclic quadrilateral has sides 4, 5, 6, 7 (in order)
   and one diagonal of length 8.  Use Ptolemy to find the other diagonal.
4. **Pen & paper:** Show that an isosceles trapezoid is always cyclic by
   computing the sum of opposite angles.
5. **Insight:** Why is "four points on a common circle" such a frequent
   olympiad-geometry condition?  Identify three properties (angle equality,
   Ptolemy, power-of-a-point) that **all** become available once you've
   established cyclicity.
