# Angle-Chasing — The Universal Geometry Technique

## Intuition

A geometry diagram is a network of constraints: triangle angles sum to 180°,
parallel lines force equal alternate angles, isosceles triangles equate base
angles, and so on.  **Angle-chasing** is the discipline of marking known
angles, then propagating them around the diagram via these rules until the
target angle falls out.  It is the **single most-used proof method** in
classical Euclidean geometry: 80% of olympiad geometry problems yield
to systematic chasing.

## Prerequisites

- Foundation 2, Lesson 6: Basic trigonometry (degrees, radians)
- Tier 1, Lesson 6: Proof techniques

## From First Principles

### The basic rules (memorise these)

1. **Triangle sum.**  In any triangle, the three interior angles sum to $180°$.
2. **Straight line.**  Angles on a straight line sum to $180°$.
3. **Vertically opposite angles** (formed by two crossing lines) are equal.
4. **Parallel lines + transversal.**
   - Corresponding angles equal.
   - Alternate interior angles equal.
   - Co-interior (same-side) angles sum to $180°$.
5. **Isosceles triangle.**  Equal sides face equal angles.
6. **Exterior angle of a triangle** equals the sum of the two non-adjacent
   interior angles.
7. **Polygon interior sum.**  An $n$-gon has interior angles summing to
   $(n - 2) \cdot 180°$.
8. **Inscribed angle theorem** (covered in detail in Lesson 7).
9. **Cyclic quadrilateral** opposite angles sum to $180°$ (Lesson 8).

### The technique

1. **Mark every known angle on the diagram** (literally write numbers).
2. **Pick a triangle** that contains an unknown angle and has two knowns —
   apply the triangle sum.
3. **Look for parallels** — they propagate angles for free.
4. **Look for isosceles** — equal sides give equal angles for free.
5. Repeat until the target angle is exposed.

### Worked example 1 — finding an angle in an isosceles configuration

> Triangle $ABC$ has $AB = AC$.  $\angle BAC = 40°$.  $D$ is on $BC$ such that
> $AD = DC$.  Find $\angle ABD$.

**Mark what's known.**  $\triangle ABC$ isosceles with apex $A$, so
$\angle ABC = \angle ACB = (180° - 40°)/2 = 70°$.

**Use the new isosceles.**  $AD = DC$ means $\triangle ADC$ is isosceles with
$\angle DAC = \angle DCA = 70°$ (the latter is part of $\triangle ABC$'s angle
at $C$).  So $\angle ADC = 180° - 70° - 70° = 40°$.

**Straight line.**  $\angle ADB = 180° - 40° = 140°$.

**Triangle $ABD$.**  $\angle ABD + \angle BAD + \angle ADB = 180°$.
$\angle BAD = \angle BAC - \angle DAC = 40° - 70° = -30°$ — negative,
something is off.

**Re-examine.**  $D$ is on segment $BC$ (between $B$ and $C$), and $AD = DC$
means $D$ is closer to $C$ than to $B$, but the cevian still has $\angle BAD < \angle BAC$.
Let me reconsider whether $\angle DAC = 70°$ is consistent.  In $\triangle ADC$,
$\angle DCA = 70°$ (forced).  If $AD = DC$, the **other base angle**
$\angle DAC$ also $= 70°$.  But that would force $\triangle ADC$ to be
**degenerate** ($\angle ADC = 40°$, OK, not degenerate).  So $\angle DAC = 70° > 40° = \angle BAC$.  Geometrically that's impossible (angle subtended at $A$ by part of the segment cannot exceed angle subtended by the whole segment).

**Conclusion:** the configuration as stated is **inconsistent** — $D$ on $BC$
with $AD = DC$ cannot exist when $\angle BAC = 40°$ in this isosceles triangle.
This is itself an important lesson of angle-chasing: it can detect impossibility.

(For a configuration that *does* work, raise $\angle BAC$ above $80°$.  Try
$\angle BAC = 100°$ and reproduce the chase.)

### Worked example 2 — parallel lines

> $AB \parallel CD$.  Transversal cuts $AB$ at $P$ and $CD$ at $Q$.  At $P$,
> the angle on the upper-left side is $50°$.  Find every other angle in the
> figure.

**Mark.**  $\angle$ upper-left at $P$ = 50°.

**Vertically opposite at $P$**: lower-right = 50°.

**Straight line at $P$**: upper-right = 130°, lower-left = 130°.

**Parallel lines (alternate interior).**  Upper-right at $P$ ↔ lower-left at $Q$,
so lower-left at $Q$ = 130°.

**Parallel lines (corresponding).**  Upper-left at $P$ ↔ upper-left at $Q$,
so upper-left at $Q$ = 50°.

**Vertically opposite at $Q$.**  Lower-right at $Q$ = 50°, upper-right = 130°.

In one minute we labelled all 8 angles.  Practice will make this automatic.

### Worked example 3 — exterior angle theorem

> In $\triangle ABC$, the exterior angle at $C$ (extending $BC$ beyond $C$)
> equals $110°$.  $\angle B = 50°$.  Find $\angle A$ and the interior $\angle C$.

**Exterior angle = sum of non-adjacent interior angles.**

$110° = \angle A + \angle B \Rightarrow \angle A = 110° - 50° = 60°$.

**Triangle sum.**  $\angle C = 180° - 60° - 50° = 70°$.  Confirm: ext$(C)$ + int$(C)$ = $110° + 70° = 180°$ (straight line) ✓.

### Workflow checklist

When stuck in an angle-chase:

- [ ] Did I use **every isosceles triangle** in the figure?
- [ ] Did I use **every parallel pair** I can detect?
- [ ] Is there a **cyclic quadrilateral** hiding (four points on a circle)?
- [ ] Did I draw a **construction line** — extend a side, drop a perpendicular,
      add the diagonal?
- [ ] Are the unknown angles related by symmetry I haven't exploited?

Practitioners say: "if the chase doesn't work, the construction line is missing."

## Python Verification

```python
# ── Angle chasing: verify with coordinate geometry ──────────
import numpy as np

def angle_at(B, A, C):
    """Angle at vertex A formed by rays A→B and A→C, in degrees."""
    BA = np.array(B) - np.array(A)
    CA = np.array(C) - np.array(A)
    cos = np.dot(BA, CA) / (np.linalg.norm(BA) * np.linalg.norm(CA))
    cos = np.clip(cos, -1, 1)
    return np.degrees(np.arccos(cos))

# Example: triangle with sides 3, 4, 5 (the right-angled 3-4-5)
A = (0, 0); B = (4, 0); C = (0, 3)
print("=== 3-4-5 triangle (right-angled at A) ===")
print(f"angle at A = {angle_at(B, A, C):.4f}°")
print(f"angle at B = {angle_at(A, B, C):.4f}°")
print(f"angle at C = {angle_at(A, C, B):.4f}°")
print(f"sum = {angle_at(B, A, C) + angle_at(A, B, C) + angle_at(A, C, B):.4f}°")

# Example: isosceles with AB = AC
A = (0, 4); B = (-3, 0); C = (3, 0)
print("\n=== Isosceles triangle, AB = AC ===")
print(f"|AB| = {np.linalg.norm(np.array(A) - B):.4f}")
print(f"|AC| = {np.linalg.norm(np.array(A) - C):.4f}")
print(f"angle B = {angle_at(A, B, C):.4f}°")
print(f"angle C = {angle_at(A, C, B):.4f}°  (should equal angle B)")

# Parallel lines transversal
print("\n=== Parallel lines: alternate interior angles equal ===")
P = np.array([0, 0])
Q = np.array([2, 3])
direction_top = np.array([1, 0])     # along AB at P
direction_bot = np.array([1, 0])     # along CD at Q (parallel)
trans = Q - P
# Angle between top line and transversal at P (upper-left side)
def line_angle(d1, d2):
    cos = np.dot(d1, d2) / (np.linalg.norm(d1) * np.linalg.norm(d2))
    cos = np.clip(cos, -1, 1)
    return np.degrees(np.arccos(cos))
ang_P = line_angle(direction_top, trans)
ang_Q = line_angle(direction_bot, -trans)
print(f"upper angle at P: {ang_P:.4f}°")
print(f"alternate interior at Q: {ang_Q:.4f}°")
print(f"equal? {'yes' if abs(ang_P - ang_Q) < 1e-9 else 'no'}")
```

## Visualisation — angle-chasing in action

```python
# ── Draw the parallel-lines example with all 8 angles labelled ──
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(11, 7))

# Two horizontal lines and a transversal
ax.plot([-2, 6], [3, 3], "b-", lw=2, label="AB (parallel)")
ax.plot([-2, 6], [0, 0], "g-", lw=2, label="CD (parallel)")
# Transversal: passes through (1, 3) and (3, 0)
ax.plot([0, 4], [4.5, -1.5], "r-", lw=2, label="transversal")

# Mark intersections
P = (1, 3); Q = (3, 0)
ax.plot(*P, "ko", ms=8); ax.text(P[0]-0.1, P[1]+0.2, "P", fontsize=12)
ax.plot(*Q, "ko", ms=8); ax.text(Q[0]+0.1, Q[1]-0.3, "Q", fontsize=12)

# Label all 8 angles (4 at P, 4 at Q)
ax.text(P[0] - 0.4, P[1] + 0.15, "50°", color="red", fontsize=11)   # upper-left at P
ax.text(P[0] + 0.15, P[1] + 0.15, "130°", color="purple", fontsize=11)
ax.text(P[0] - 0.4, P[1] - 0.25, "130°", color="purple", fontsize=11)
ax.text(P[0] + 0.15, P[1] - 0.25, "50°", color="red", fontsize=11)

ax.text(Q[0] - 0.4, Q[1] + 0.15, "50°", color="red", fontsize=11)   # upper-left at Q
ax.text(Q[0] + 0.15, Q[1] + 0.15, "130°", color="purple", fontsize=11)
ax.text(Q[0] - 0.4, Q[1] - 0.25, "130°", color="purple", fontsize=11)
ax.text(Q[0] + 0.15, Q[1] - 0.25, "50°", color="red", fontsize=11)

ax.set_xlim(-2.5, 6.5); ax.set_ylim(-2, 5)
ax.set_aspect("equal"); ax.grid(True, alpha=0.3)
ax.set_title("Two parallel lines + transversal → all 8 angles fixed by 1\n"
             "Same-coloured angles are equal (alternate interior, corresponding, vertical)")
ax.legend(loc="upper right")
plt.tight_layout()
plt.show()
```

## Connection to CS / Games / AI / Business / Industry

- **CS / Computer vision** — angle-chasing in image rectification:
  perspective correction algorithms (the kind that "straighten" a photo of a
  document) propagate angle constraints across detected line segments.
- **CS / Computational geometry** — most "predicate"-based geometry algorithms
  (orientation, in-triangle tests) are angle-chasing in disguise.
- **Games / Graphics** — billiard physics, light reflection in ray tracers,
  visibility-polygon construction in stealth-game enemy AI all rely on
  parallel/alternate angle reasoning.
- **Robotics / SLAM** — feature matching across camera frames uses
  triangulation; "two angles fix a triangle" up to scale is the working
  principle of stereo vision.
- **Engineering / Surveying** — total-station surveys propagate angle measurements
  across legs of a traverse exactly as angle-chasing does on paper; exterior
  angle theorem is the "back-azimuth" calculation in geodesy.
- **Architecture / CAD** — parametric design tools (Revit, Rhino) compose
  constraints (angles, parallels) and solve them by the same propagation
  pattern.

## Check Your Understanding

1. **Pen & paper:** In $\triangle ABC$, $AB = BC$, and $\angle ABC = 80°$.
   Find $\angle BAC$ and $\angle BCA$.
2. **Pen & paper:** A regular pentagon has each interior angle equal to
   $108°$.  Verify using the polygon-sum rule.
3. **Pen & paper:** Two parallel lines are crossed by a transversal.  One
   acute angle measures $35°$.  Find the other 7 angles in the figure.
4. **Pen & paper:** $\triangle ABC$ has $\angle A = 40°$ and the exterior
   angle at $C$ equals $130°$.  Find $\angle B$ and $\angle C$.
5. **Insight:** Why is angle-chasing nearly always the **first** technique to
   try in a Euclidean geometry problem?  When does it **fail** and you must
   use a different tool (similar triangles, circle theorems, trigonometry)?
