# The Inscribed Angle Theorem

## Intuition

Pick a circle.  Pick an arc on it.  Now stand anywhere else on the circle and
look at the two endpoints of the arc.  The angle you see is exactly **half**
the central angle subtended by the same arc — and it doesn't matter where on
the circle you stand.  This single fact (Thales' theorem is its most famous
special case) unlocks dozens of circle-geometry results: cyclic quadrilaterals,
secant–tangent products, intersecting chord configurations.

## Prerequisites

- Foundation 2, Lesson 5: Coordinate geometry (circle equation)
- Foundation 2, Lesson 6: Basic trigonometry
- Classical Geometry, Lesson 1: Angle-chasing
- Classical Geometry, Lesson 2: Triangle congruence and similarity

## From First Principles

### Statement

Let $A$ and $B$ be two points on a circle with centre $O$.  Let $P$ be any
point on the **major arc** of $AB$.

- The **central angle** $\angle AOB$ subtends the minor arc $AB$.
- The **inscribed angle** $\angle APB$ subtends the same arc but from $P$.

Then:

$$\angle APB = \frac{1}{2} \angle AOB$$

The inscribed angle is **half** the central angle subtending the same arc.

**Crucially**, the inscribed angle is the **same** for every $P$ on the
major arc.  All such inscribed angles are equal.

### Proof — case 1: centre $O$ is on a chord through $P$

Suppose the diameter through $P$ passes through one of $A, B$ — say $B$.

Then $\triangle OPA$ is isosceles ($OP = OA$ = radius).  The base angles are
equal:

$$\angle OAP = \angle OPA$$

The exterior angle at $O$ (the angle $\angle AOB$) equals the sum of the two
remote interior angles of $\triangle OPA$:

$$\angle AOB = \angle OAP + \angle OPA = 2 \angle OPA$$

Hence $\angle OPA = \frac{1}{2} \angle AOB$, which is the inscribed angle
$\angle APB$ (since $B$, $O$, $P$ are collinear).  ∎

### Proof — case 2: $O$ inside $\triangle APB$

Draw the diameter $PD$ through $P$ (with $D$ on the circle, opposite side).
Now $D$ splits $\angle APB$ into two angles: $\angle APD + \angle DPB$.

By case 1 applied twice:
$\angle APD = \frac{1}{2} \angle AOD$ and $\angle DPB = \frac{1}{2} \angle DOB$.

Adding: $\angle APB = \frac{1}{2}(\angle AOD + \angle DOB) = \frac{1}{2}\angle AOB$.  ∎

(Case 3, $O$ outside $\triangle APB$, is analogous: the same diameter trick
but with subtraction instead of addition.)

### Major and minor arc

If $P$ is on the **minor arc** of $AB$ instead, then $\angle APB$ subtends
the **reflex** $\angle AOB$ (the larger one), so:

$$\angle APB = \frac{1}{2}(360° - \angle AOB) = 180° - \frac{1}{2} \angle AOB$$

Hence: an inscribed angle from the minor arc + the corresponding inscribed
angle from the major arc = $180°$.  This is the **cyclic quadrilateral**
identity (Lesson 8).

### Thales' theorem (special case)

If $AB$ is a **diameter**, then $\angle AOB = 180°$, so

$$\angle APB = \frac{1}{2}(180°) = 90°$$

**Any angle inscribed in a semicircle is a right angle.**  This is Thales'
theorem — the converse also holds: if $\angle APB = 90°$, then $P$ lies on a
circle with $AB$ as diameter.

### Equal inscribed angles ⇔ same arc

Two inscribed angles subtend equal arcs **iff** the angles are equal.

This is the **converse direction** that lets you *recognise* circles:
if you see equal angles subtending the same chord from the same side, the
points lie on a circle.

### The chord–chord (interior) angle theorem (preview)

If two chords cross inside a circle, the angle of intersection equals **half
the sum** of the two intercepted arcs.

Proof: draw the auxiliary chord and apply the inscribed angle theorem to two
triangles.  (Detailed treatment in Lesson 9.)

### Worked example — Thales'

> $AB$ is the diameter of a circle.  $C$ is any other point on the circle.
> $AC = 6$, $BC = 8$.  Find $AB$.

By Thales, $\angle ACB = 90°$.  By Pythagoras: $AB = \sqrt{6^2 + 8^2} = 10$.

(So $AB$, the diameter, is 10, and the radius is 5.)

### Worked example — equal-arc finding

> Two chords $PQ$ and $RS$ of a circle have the same length.  Show the arcs
> they subtend are equal.

Equal chords subtend equal central angles (since the triangles $\triangle OPQ$
and $\triangle ORS$ are congruent by SSS).  Equal central angles correspond to
equal arcs by definition.  Hence equal inscribed angles too.  ∎

## Python Verification

```python
# ── Inscribed angle theorem: numerical demo ─────────────────
import numpy as np

# Set up a circle of radius 1 at origin.
def point_on_circle(theta):
    return np.array([np.cos(theta), np.sin(theta)])

def angle_at(P, A, B):
    """Angle ∠APB in degrees, formed at vertex P by rays PA and PB."""
    PA = A - P; PB = B - P
    cos = np.dot(PA, PB) / (np.linalg.norm(PA) * np.linalg.norm(PB))
    cos = np.clip(cos, -1, 1)
    return np.degrees(np.arccos(cos))

# Pick A and B on the circle.
A = point_on_circle(np.radians(20))
B = point_on_circle(np.radians(140))
O = np.array([0, 0])
central = angle_at(O, A, B)
print(f"=== Central angle ∠AOB = {central:.4f}° ===")

# Pick several points P on the major arc.
print("\n=== Inscribed angle ∠APB from various P on the major arc ===")
for theta_deg in [200, 230, 260, 290, 320, 350]:
    P = point_on_circle(np.radians(theta_deg))
    inscr = angle_at(P, A, B)
    print(f"  P at θ={theta_deg}°: ∠APB = {inscr:.4f}°  "
          f"(half of central = {central/2:.4f}°)",
          "✓" if abs(inscr - central/2) < 1e-6 else "✗")

# Pick points on the minor arc — the angle should be supplementary.
print("\n=== Inscribed angle from minor arc (supplementary) ===")
for theta_deg in [60, 80, 100, 120]:
    P = point_on_circle(np.radians(theta_deg))
    inscr = angle_at(P, A, B)
    expected = 180 - central / 2
    print(f"  P at θ={theta_deg}°: ∠APB = {inscr:.4f}°  "
          f"(180° − half central = {expected:.4f}°)",
          "✓" if abs(inscr - expected) < 1e-6 else "✗")

# Thales' theorem
print("\n=== Thales' theorem (diameter → 90°) ===")
A = point_on_circle(np.radians(0))      # (1, 0)
B = point_on_circle(np.radians(180))    # (-1, 0)
print(f"A = {A}, B = {B} (diameter)")
for theta_deg in [30, 60, 90, 120, 150]:
    P = point_on_circle(np.radians(theta_deg))
    angle = angle_at(P, A, B)
    print(f"  P at θ={theta_deg}°: ∠APB = {angle:.4f}°  (Thales: should be 90°)",
          "✓" if abs(angle - 90) < 1e-6 else "✗")
```

## Visualisation — inscribed angles from many P

```python
# ── Show several inscribed angles all equal to half the central ──
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(9, 9))
ax.set_aspect("equal"); ax.grid(alpha=0.3)
ax.set_xlim(-1.5, 1.5); ax.set_ylim(-1.5, 1.5)

# Circle
theta = np.linspace(0, 2 * np.pi, 200)
ax.plot(np.cos(theta), np.sin(theta), "k-", lw=1)
ax.plot(0, 0, "k+", ms=10)

# Two points A and B
def pt(deg): return np.array([np.cos(np.radians(deg)), np.sin(np.radians(deg))])
A = pt(20); B = pt(140)
ax.plot(*A, "ko", ms=10); ax.text(A[0]+0.05, A[1]+0.05, "A", fontsize=14)
ax.plot(*B, "ko", ms=10); ax.text(B[0]-0.15, B[1]+0.05, "B", fontsize=14)

# Chord AB
ax.plot([A[0], B[0]], [A[1], B[1]], "k--", lw=1)

# Central angle
ax.plot([0, A[0]], [0, A[1]], "g-", lw=2)
ax.plot([0, B[0]], [0, B[1]], "g-", lw=2)
ax.text(0.1, 0.5, "central\n∠AOB = 120°", color="green", fontsize=11)

# Several points P on the major arc
for theta_deg, color in zip([200, 240, 280, 320], ["tab:blue", "tab:orange",
                                                    "tab:purple", "tab:red"]):
    P = pt(theta_deg)
    ax.plot(*P, "o", color=color, ms=8)
    ax.plot([P[0], A[0]], [P[1], A[1]], "-", color=color, lw=1.5)
    ax.plot([P[0], B[0]], [P[1], B[1]], "-", color=color, lw=1.5)
    ax.text(P[0]*1.1, P[1]*1.1, f"P @ {theta_deg}°", color=color, fontsize=9)

ax.set_title("Inscribed angle theorem: every ∠APB = 60° = ½ · 120°\n"
             "(no matter where on the major arc P sits)")

plt.tight_layout()
plt.show()
```

## Connection to CS / Games / AI / Business / Industry

- **CS / Computer vision** — when calibrating a camera by tracking a circular
  marker, the inscribed angle theorem identifies points on a common circle
  in the image plane (used in fiducial-marker detection).
- **CS / Computational geometry** — the **Delaunay triangulation** condition
  ("no circumcircle contains a fourth point") is checked using inscribed-
  angle reasoning; voronoi diagrams and triangulation algorithms depend on it.
- **Games / Graphics** — circular collision detection in 2D engines uses
  inscribed-angle properties to perform bounded-region tests cheaply.
- **AI / Robotics** — sensor triangulation: if a robot sees a known landmark
  at a known angular separation, it lies on a circular locus determined by
  the inscribed angle theorem.
- **Engineering / GPS** — pseudo-ranging in GNSS systems uses the inscribed-
  angle locus to disambiguate satellite signal arrival angles.
- **Architecture** — Gothic-arch construction and dome design exploit the
  fact that semicircular masonry produces $90°$ corners — Thales in stone.

## Check Your Understanding

1. **Pen & paper:** A central angle of a circle is $80°$.  Find the inscribed
   angle subtending the same arc.
2. **Pen & paper:** A chord of a circle has $\angle APB = 35°$ from one side
   of the chord.  What is $\angle AQB$ from the other side?  (Answer:
   $180° - 35° = 145°$.)
3. **Pen & paper:** Apply Thales' theorem: an arch with a semicircular shape
   spans 12 m.  A vertical tie hangs from a point on the arch; the
   horizontal distances from this point to the two anchor points are 4 m
   and 8 m.  Find the height of the tie.
4. **Pen & paper:** Two equal chords of a circle subtend angles $\angle APB =
   30°$ at one inscribed point.  Show that any two equal chords subtend
   equal inscribed angles.
5. **Insight:** Why is the inscribed angle theorem the "engine" of so many
   circle-geometry results?  Identify two later results (cyclic quadrilateral,
   intersecting chord theorem, secant-tangent angle) whose proofs are direct
   inscribed-angle applications.
