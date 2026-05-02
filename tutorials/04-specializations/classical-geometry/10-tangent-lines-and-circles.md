# Tangent Lines and Two-Circle Configurations

## Intuition

A **tangent** to a circle touches it at exactly one point.  Tangents have
two "magic" properties: they are **perpendicular** to the radius at the point
of contact, and from any external point you can draw **two equal-length
tangents**.  Push these into the two-circle case (external tangents, internal
tangents, common chords) and you get the full toolkit for problems involving
gear meshing, pulley systems, conic-section geometry, and algorithm-style
"reachable circle" puzzles.

## Prerequisites

- Foundation 2, Lesson 5: Coordinate geometry (circle equation, tangent line)
- Classical Geometry, Lesson 9: Chords, secants, tangents (power of a point)

## From First Principles

### Single circle — tangent properties

**Property 1: tangent ⊥ radius.**  At the point of contact $T$ on a circle
with centre $O$, the tangent line is perpendicular to $OT$.

**Why?**  Among all lines through $T$, the perpendicular-to-$OT$ is the only
one whose distance to $O$ equals $|OT|$ (the radius).  Any other line dips
inside the circle (and hence crosses it twice).

**Property 2: equal tangents from an external point.**  From an external point
$P$ to a circle, the two tangent segments $PT_1$ and $PT_2$ have **equal
length**.

**Why?**  $\triangle OPT_1 \cong \triangle OPT_2$ by RHS (right angle at $T_i$,
hypotenuse $OP$ shared, leg $OT_1 = OT_2 = r$).  So $PT_1 = PT_2$.  The same
congruence shows $\angle OPT_1 = \angle OPT_2$ — the line $OP$ **bisects**
the angle between the two tangents.

### Tangent-chord angle theorem (recap)

The angle between a tangent at $T$ and a chord $TA$ equals the inscribed
angle subtending $TA$ from the other side of $TA$.

This generates many angle-chase opportunities when one of the lines in a
configuration is tangent.

### Two circles — types of tangents

Given two circles, **common tangent lines** can be:

- **Internal common tangents:** cross between the circles.  Exist iff the
  circles are **separate** (not intersecting and not nested).  When they
  exist, there are **two** of them.
- **External common tangents:** lie on the outside of both circles.  Exist
  iff one circle does not contain the other.  When the circles are separate
  or externally tangent, there are **two**.

Total tangent count vs. circle separation:

| Configuration | External | Internal | Total |
|---|---|---|---|
| Separate (apart) | 2 | 2 | 4 |
| Externally tangent (touch at one point) | 2 | 1 | 3 |
| Intersecting (two points) | 2 | 0 | 2 |
| Internally tangent | 1 | 0 | 1 |
| One inside the other (no touch) | 0 | 0 | 0 |

### Constructing common tangents

Let the two circles have centres $O_1, O_2$ and radii $r_1, r_2$ (assume
$r_1 \ge r_2$), with $d = |O_1 O_2|$.

**External tangent length:** the segment of the external common tangent
between the two points of contact has length

$$L_{\text{ext}} = \sqrt{d^2 - (r_1 - r_2)^2}$$

(when $d > |r_1 - r_2|$).

**Internal tangent length:** between the two contact points,

$$L_{\text{int}} = \sqrt{d^2 - (r_1 + r_2)^2}$$

(when $d > r_1 + r_2$).

**Pen & paper:** Two circles with $r_1 = 5, r_2 = 3$, $d = 10$.

External tangent length: $\sqrt{100 - 4} = \sqrt{96} \approx 9.80$.

Internal tangent length: $\sqrt{100 - 64} = \sqrt{36} = 6$.

(Check: each is a leg of a right triangle whose hypotenuse is the line of
centres of length $d$.)

### Common chord (when circles intersect)

If two circles meet at $A$ and $B$, the chord $AB$ is the **common chord** —
perpendicular to the line of centres $O_1 O_2$.

The line $O_1 O_2$ bisects $AB$ at the foot of the perpendicular.

The **radical axis** of two circles is precisely this common chord (extended)
when they intersect; for non-intersecting circles, it's still a perpendicular
line to $O_1 O_2$ at a specific point.

### Tangent circles

Two circles are **tangent** if they touch at exactly one point.  There are
two cases:

- **Externally tangent:** $d = r_1 + r_2$ (the circles touch from outside).
- **Internally tangent:** $d = |r_1 - r_2|$ (one circle touches the other
  from inside).

For externally tangent circles, the tangent line at the contact point is
perpendicular to the line of centres and passes through the contact point.

### Pulley system as two circles

Two pulleys of radii $r_1, r_2$ separated by distance $d$ are connected by
a belt.  The belt's straight portions are common external tangents
(uncrossed belt) or common internal tangents (crossed belt).  Total belt
length depends on the tangent length plus the lengths of the arc each
pulley wraps the belt around.

**Pen & paper:** Pulleys with $r_1 = 4, r_2 = 4, d = 10$, uncrossed belt.

External tangent length: $\sqrt{100 - 0} = 10$.

Each pulley wraps the belt around a half-circle: $\pi \cdot 4 = 4\pi$ each.

Total belt: $2 \cdot 10 + 2 \cdot 4\pi = 20 + 8\pi \approx 45.13$.

## Python Verification

```python
# ── Tangent geometry: lengths, angles, common tangents ──────
import numpy as np

def tangent_length_external(P, O, r):
    """|PT| where T is point of tangency from external P."""
    OP = np.linalg.norm(P - O)
    return np.sqrt(OP**2 - r**2)

P = np.array([5, 0]); O = np.array([0, 0]); r = 3
print(f"=== Tangent from external point ===")
print(f"P = {P}, O = {O}, r = {r}")
print(f"|PT| = sqrt(|PO|² − r²) = sqrt(25 − 9) = {tangent_length_external(P, O, r):.4f}")

# Two-circle common tangents
def common_tangents(O1, r1, O2, r2):
    d = np.linalg.norm(O2 - O1)
    L_ext = np.sqrt(d*d - (r1 - r2)**2) if d >= abs(r1 - r2) else None
    L_int = np.sqrt(d*d - (r1 + r2)**2) if d >= r1 + r2 else None
    return L_ext, L_int

print("\n=== Two circles, common tangent lengths ===")
for (O1, r1, O2, r2) in [(np.array([0,0]), 5, np.array([10,0]), 3),
                          (np.array([0,0]), 4, np.array([10,0]), 4),
                          (np.array([0,0]), 5, np.array([6,0]), 3),
                          (np.array([0,0]), 5, np.array([4,0]), 1)]:
    d = np.linalg.norm(O2 - O1)
    L_ext, L_int = common_tangents(O1, r1, O2, r2)
    print(f"  r1={r1}, r2={r2}, d={d}: "
          f"ext={L_ext if L_ext is not None else 'none'}, "
          f"int={L_int if L_int is not None else 'none'}")

# Tangent count
def tangent_count(O1, r1, O2, r2):
    d = np.linalg.norm(O2 - O1)
    if d > r1 + r2:           return 4   # separate
    if d == r1 + r2:          return 3   # externally tangent
    if abs(r1 - r2) < d < r1 + r2: return 2   # intersecting
    if d == abs(r1 - r2):     return 1   # internally tangent
    return 0                              # one inside the other

print("\n=== Number of common tangents ===")
configs = [
    ("separate",     np.array([0,0]), 3, np.array([10,0]), 2),
    ("ext. tangent", np.array([0,0]), 3, np.array([5, 0]), 2),
    ("intersecting", np.array([0,0]), 3, np.array([4, 0]), 2),
    ("int. tangent", np.array([0,0]), 5, np.array([3, 0]), 2),
    ("nested",       np.array([0,0]), 5, np.array([1, 0]), 2),
]
for name, O1, r1, O2, r2 in configs:
    n = tangent_count(O1, r1, O2, r2)
    print(f"  {name:>15}: {n} common tangents")

# Belt length on a two-pulley system
print("\n=== Belt length on two equal pulleys (uncrossed) ===")
r = 4; d = 10
import math
straight = 2 * math.sqrt(d*d - 0)        # equal radii so r1-r2 = 0
arc = 2 * math.pi * r                    # each pulley wraps half the circle
belt = 2 * straight / 2 + arc            # 2 straight runs of length sqrt(d^2)... actually one wrap each
# More simply: belt = 2*(straight) + (sum of arc lengths)
straight_one = math.sqrt(d*d - 0)
total = 2 * straight_one + 2 * (math.pi * r)
print(f"  total belt = {2 * straight_one} + 2 × π·{r} = {total:.4f}")
```

## Visualisation — common tangents in 4 configurations

```python
# ── Show tangent count for separate / tangent / intersecting / nested ──
import matplotlib.pyplot as plt
import numpy as np

configs = [
    ("Separate (4 tangents)",     (0,0,3), (10,0,2)),
    ("Ext. tangent (3 tangents)", (0,0,3), (5, 0,2)),
    ("Intersecting (2 tangents)", (0,0,3), (4, 0,2)),
    ("Internally tangent (1)",    (0,0,5), (3, 0,2)),
    ("Nested (0)",                (0,0,5), (1, 0,2)),
]

fig, axes = plt.subplots(1, 5, figsize=(18, 4))
theta = np.linspace(0, 2*np.pi, 200)

for ax, (title, (x1,y1,r1), (x2,y2,r2)) in zip(axes, configs):
    ax.plot(x1 + r1*np.cos(theta), y1 + r1*np.sin(theta), "b-", lw=2)
    ax.plot(x2 + r2*np.cos(theta), y2 + r2*np.sin(theta), "g-", lw=2)
    ax.plot([x1, x2], [y1, y2], "k--", lw=1, alpha=0.5)
    ax.plot(x1, y1, "bo"); ax.plot(x2, y2, "go")
    ax.set_aspect("equal"); ax.grid(alpha=0.3)
    ax.set_title(title, fontsize=10)
    ax.set_xlim(-6, 14); ax.set_ylim(-6, 6)

plt.tight_layout()
plt.show()
```

## Connection to CS / Games / AI / Business / Industry

- **CS / Robotics** — robot motion planning around circular obstacles
  computes tangent-line bypass routes; visibility graphs in 2D maps include
  common-tangent edges between obstacle circles.
- **CS / Computational geometry** — tangent-line algorithms underlie convex-
  hull computations and shortest-path queries through obstacle fields.
- **CS / Computer graphics** — drawing rounded shapes (rounded rectangles,
  smooth corners) requires computing the tangent of two arcs to a connecting
  line — same construction as common tangents.
- **AI / Vision** — circle-detection in Hough transforms uses tangent
  configurations to vote for circle centres and radii from edge-pixel
  orientations.
- **Engineering** — belt and chain drive design (cars, conveyors,
  manufacturing): belt length, contact angle, tension calculations all
  reduce to common-tangent geometry.
- **Game design** — billiards/pool physics (ball-to-cushion impacts
  approximated by tangent reflections) and "rolling" enemy AI (movement
  along tangent lines around obstacles).

## Check Your Understanding

1. **Pen & paper:** From an external point 13 from the centre of a circle of
   radius 5, find the length of the tangent to the circle.
2. **Pen & paper:** Two circles of radii 5 and 12 are 13 apart (centre-to-
   centre).  How many common tangents do they have?  Compute the lengths.
3. **Pen & paper:** A pulley of radius 3 and another of radius 5 are 10
   apart.  Find the length of the belt around them (uncrossed).
4. **Pen & paper:** Two circles of equal radius 4 intersect such that their
   common chord has length 6.  Find the distance between centres.
5. **Insight:** Why does an internal common tangent only exist when the
   circles are non-overlapping?  Sketch what happens to the tangent length
   formula $\sqrt{d^2 - (r_1 + r_2)^2}$ as $d$ shrinks past $r_1 + r_2$.
