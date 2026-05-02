# Chords, Secants, Tangents — Power of a Point

## Intuition

Pick any point $P$ in the plane and any line through $P$ that intersects a
circle.  The product of the two signed distances from $P$ to the two
intersection points **does not depend** on which line you chose.  This single
invariant — the **power of a point** — encapsulates three classical theorems
(intersecting chords, secant–secant, secant–tangent) into one clean idea.
It also distinguishes points "inside", "on", and "outside" a circle by a
single number.

## Prerequisites

- Foundation 2, Lesson 5: Coordinate geometry (circles, tangents)
- Classical Geometry, Lesson 7: Inscribed angle theorem
- Classical Geometry, Lesson 8: Cyclic quadrilaterals

## From First Principles

### The intersecting chord theorem

Two chords $AB$ and $CD$ of a circle intersect at point $P$ inside the circle.
Then:

$$|PA| \cdot |PB| = |PC| \cdot |PD|$$

**Proof.** Triangles $\triangle PAC$ and $\triangle PDB$ have:
- $\angle APC = \angle DPB$ (vertically opposite),
- $\angle PCA = \angle PBD$ (inscribed angles subtending the same arc $AD$).

So $\triangle PAC \sim \triangle PDB$ (AA), hence

$$\frac{PA}{PD} = \frac{PC}{PB} \;\Rightarrow\; PA \cdot PB = PC \cdot PD$$  ∎

### The secant–secant theorem

Two secants from external point $P$ cut the circle at $A, B$ and $C, D$
respectively (with $A, C$ closer to $P$).  Then:

$$|PA| \cdot |PB| = |PC| \cdot |PD|$$

**Proof.** $\triangle PAC \sim \triangle PDB$ (the inscribed angles
$\angle CAB$ and $\angle CDB$ are equal — both subtend arc $CB$; the angle at
$P$ is shared).  Same algebra. ∎

### The secant–tangent theorem

Same setup but one of the lines is **tangent** to the circle at $T$ instead of
secant.  Then $|PT|^2 = |PA| \cdot |PB|$.

**Proof.** Take the secant–secant theorem and let one secant rotate so its
two intersection points coalesce at $T$ (the tangent limit).  $|PA| \cdot |PB| = |PT| \cdot |PT| = |PT|^2$. ∎

(Or: $\triangle PTA \sim \triangle PBT$ by the **tangent-chord angle theorem**
— the angle between a tangent and a chord equals the inscribed angle in the
alternate segment.)

### The unifying principle — power of a point

Define the **power** of point $P$ with respect to a circle of centre $O$
and radius $r$ as:

$$\text{pow}(P) = |OP|^2 - r^2$$

Three regimes:
- $P$ **inside** the circle: $\text{pow}(P) < 0$.
- $P$ **on** the circle: $\text{pow}(P) = 0$.
- $P$ **outside** the circle: $\text{pow}(P) > 0$.

**Theorem (power of a point).** For any line through $P$ that intersects the
circle at points $X, Y$, the product of signed distances $\overline{PX} \cdot \overline{PY}$ equals $\text{pow}(P)$.

(Take signed distances directed along the line.  When $P$ is inside, the two
points are on opposite sides, so the signs differ and the product is
negative — matching $\text{pow}(P) < 0$.)

For tangent lines (where $X = Y = T$), the "product" becomes $|PT|^2$.

This unifies:
- Intersecting chords (point inside): $|PA| \cdot |PB| = |PC| \cdot |PD| = -\text{pow}(P)$.
- Secant–secant (point outside): $|PA| \cdot |PB| = |PC| \cdot |PD| = \text{pow}(P)$.
- Secant–tangent (point outside): $|PT|^2 = |PA| \cdot |PB| = \text{pow}(P)$.

### Worked example — secant-tangent

> From external point $P$, a tangent of length 12 touches a circle.  A secant
> from $P$ cuts the circle at $A$ and $B$ with $PA = 9$ (closer) and $PB = ?$.

By secant–tangent: $|PT|^2 = |PA| \cdot |PB|$.

$$144 = 9 \cdot |PB| \;\Rightarrow\; |PB| = 16$$

So the chord $AB = PB - PA = 7$.

### Worked example — intersecting chords

> Two chords cross inside a circle.  One chord is split into pieces 4 and 9.
> The other chord has one piece of length 6.  Find the other piece.

$|PA| \cdot |PB| = |PC| \cdot |PD|$:

$$4 \cdot 9 = 6 \cdot |PD| \;\Rightarrow\; |PD| = 6$$

Other piece is 6.

### The radical axis (preview)

For two circles, the locus of points with **equal power** with respect to
both is a straight line — the **radical axis**.  If the circles intersect,
it's their common chord (extended).  If they don't, it's still a well-defined
line perpendicular to the line of centres.

Three pairwise radical axes of three circles concur at the **radical centre**
— a foundational result for many constructions.

(Detailed treatment is beyond this lesson; we mention it because the
concept of power-of-a-point is what makes it natural.)

### Tangent-chord angle theorem

A tangent line at point $T$ on a circle and a chord $TA$ of the circle make
an angle equal to the inscribed angle $\angle TBA$ from any point $B$ on the
major arc.

This is what makes the secant-tangent proof work, and it's one of the most
useful angle-chase tools when a tangent appears.

## Python Verification

```python
# ── Power of a point: numerical verification ────────────────
import numpy as np

def power_of_point(P, O, r):
    return np.sum((P - O)**2) - r**2

# Setup: unit circle at origin
O = np.array([0.0, 0.0])
r = 1.0

# Pick an external point P
P = np.array([2.0, 0.0])
print(f"=== External point P = {P} ===")
print(f"power(P) = {power_of_point(P, O, r)}  (= |OP|² − r² = 4 − 1 = 3)")

# Tangent length
import math
tan_len = math.sqrt(power_of_point(P, O, r))
print(f"|PT| = sqrt(power) = {tan_len}")

# Pick any secant from P. Direction (cos θ, sin θ).
print("\n=== Secant lines from P, all give same product PA·PB ===")
for theta_deg in [10, 30, 60, 80, 100]:
    theta = np.radians(theta_deg)
    d = np.array([np.cos(theta), np.sin(theta)])
    # Solve |P + t d|² = r² for t
    # |P|² + 2 t P·d + t² = r²
    a = 1.0
    b = 2 * np.dot(P, d)
    c = np.dot(P, P) - r * r
    disc = b * b - 4 * a * c
    if disc < 0:
        continue   # secant misses
    t1 = (-b - math.sqrt(disc)) / (2 * a)
    t2 = (-b + math.sqrt(disc)) / (2 * a)
    PA, PB = abs(t1), abs(t2)
    print(f"  θ = {theta_deg:>3}°: PA = {PA:.4f}, PB = {PB:.4f}, PA·PB = {PA*PB:.4f}")

# Pick an internal point P
P = np.array([0.3, 0.2])
print(f"\n=== Internal point P = {P} ===")
print(f"power(P) = {power_of_point(P, O, r)}")
print("Now PA and PB are on opposite sides; the *signed* product is negative.")

print("\n=== Internal-point chord products (all equal by intersecting-chord theorem) ===")
for theta_deg in [0, 45, 90, 135]:
    theta = np.radians(theta_deg)
    d = np.array([np.cos(theta), np.sin(theta)])
    a = 1.0
    b = 2 * np.dot(P, d)
    c = np.dot(P, P) - r * r
    disc = b * b - 4 * a * c
    t1 = (-b - math.sqrt(disc)) / (2 * a)
    t2 = (-b + math.sqrt(disc)) / (2 * a)
    PA, PB = abs(t1), abs(t2)
    print(f"  θ = {theta_deg:>3}°: PA = {PA:.4f}, PB = {PB:.4f}, "
          f"PA·PB = {PA*PB:.6f}  (= |power| = {-power_of_point(P, O, r):.6f})")
```

## Visualisation — chords through an interior point and secants from outside

```python
# ── Two diagrams: intersecting chords + secant-tangent ──────
import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(1, 2, figsize=(14, 7))

theta = np.linspace(0, 2*np.pi, 200)

# (1) Chords through an interior point
ax = axes[0]
ax.plot(np.cos(theta), np.sin(theta), "k-", lw=1)
P = (0.3, 0.2)
ax.plot(*P, "ko", ms=8); ax.text(P[0]+0.05, P[1]-0.08, "P", fontsize=14)
# Chord 1: through P with some slope
def chord_through(P, slope):
    # parameterise as P + t (1, slope), normalised
    d = np.array([1, slope]) / np.sqrt(1 + slope**2)
    a = 1; b = 2 * np.dot(P, d); c = np.dot(P, P) - 1
    disc = b*b - 4*a*c
    if disc < 0: return None
    t1 = (-b - np.sqrt(disc))/2; t2 = (-b + np.sqrt(disc))/2
    return P + t1*d, P + t2*d
A, B = chord_through(np.array(P), 0.4)
C, D = chord_through(np.array(P), -1.5)
ax.plot([A[0], B[0]], [A[1], B[1]], "b-", lw=2, label="chord AB")
ax.plot([C[0], D[0]], [C[1], D[1]], "g-", lw=2, label="chord CD")
for label, pt in zip("ABCD", [A, B, C, D]):
    ax.plot(*pt, "ko", ms=6)
    ax.text(pt[0]*1.1, pt[1]*1.1, label, fontsize=12)
PA = np.linalg.norm(A - np.array(P))
PB = np.linalg.norm(B - np.array(P))
PC = np.linalg.norm(C - np.array(P))
PD = np.linalg.norm(D - np.array(P))
ax.set_title(f"Intersecting chords at interior P\n"
             f"PA · PB = {PA*PB:.4f},  PC · PD = {PC*PD:.4f}")
ax.legend(); ax.set_aspect("equal"); ax.grid(alpha=0.3)
ax.set_xlim(-1.4, 1.4); ax.set_ylim(-1.4, 1.4)

# (2) Secant + tangent from external point
ax = axes[1]
ax.plot(np.cos(theta), np.sin(theta), "k-", lw=1)
P = np.array([2.0, 0.0])
ax.plot(*P, "ko", ms=8); ax.text(P[0]+0.05, P[1]-0.08, "P", fontsize=14)
# Secant: through P, direction with positive slope
def from_external(P, slope):
    d = np.array([1, slope]) / np.sqrt(1 + slope**2)
    # We want the line going from P "into" the circle, so direction toward origin
    if np.dot(d, -P) < 0: d = -d
    a = 1; b = 2 * np.dot(P, d); c = np.dot(P, P) - 1
    disc = b*b - 4*a*c
    if disc < 0: return None
    t1 = (-b - np.sqrt(disc))/2; t2 = (-b + np.sqrt(disc))/2
    return P + t1*d, P + t2*d
A, B = from_external(P, 0.3)
ax.plot([P[0], B[0]], [P[1], B[1]], "b-", lw=2, label="secant")
ax.plot(*A, "ko", ms=6); ax.text(A[0]-0.1, A[1]+0.1, "A", fontsize=12)
ax.plot(*B, "ko", ms=6); ax.text(B[0]-0.15, B[1]+0.1, "B", fontsize=12)
# Tangent from P: |PT| = sqrt(|OP|^2 - r^2) = sqrt(3)
import math
T_dist = math.sqrt(np.dot(P, P) - 1)
# T lies at angle: tangent point is where OT ⊥ PT, so cos(angle) = r/|OP|
ang = math.acos(1 / np.linalg.norm(P))
T = np.array([math.cos(ang), math.sin(ang)])
ax.plot([P[0], T[0]], [P[1], T[1]], "r-", lw=2, label="tangent")
ax.plot(*T, "ko", ms=6); ax.text(T[0]-0.1, T[1]+0.1, "T", fontsize=12)
PA = np.linalg.norm(A - P); PB = np.linalg.norm(B - P); PT = np.linalg.norm(T - P)
ax.set_title(f"Secant + tangent from external P\n"
             f"PA·PB = {PA*PB:.4f},  PT² = {PT**2:.4f}")
ax.legend(); ax.set_aspect("equal"); ax.grid(alpha=0.3)
ax.set_xlim(-1.4, 2.5); ax.set_ylim(-1.4, 1.4)

plt.tight_layout()
plt.show()
```

## Connection to CS / Games / AI / Business / Industry

- **CS / Computational geometry** — power-of-a-point underlies fast circle-
  containment tests and is the basis of additive-weighted Voronoi (power
  diagrams).
- **CS / Robotics** — sensor-based localisation: a robot at a known distance
  from a circular feature lies on a tangent or secant pencil; power-of-point
  filters out inconsistent readings.
- **AI / Computer vision** — RANSAC-style circle fitting uses power-of-point
  inequalities to score candidate circles against observed feature points.
- **Games / Graphics** — projectile/billiard physics: the secant-tangent
  theorem governs the trajectory of a ball glancing off a circular obstacle.
- **Engineering / Optics** — lens design (paraxial approximations) uses the
  intersecting-chord identity to compute apparent depth and refraction
  angles in spherical surfaces.
- **GIS / Surveying** — power-of-a-point in spherical geometry is the basis
  of "great-circle distance" calibration when GPS readings disagree.

## Check Your Understanding

1. **Pen & paper:** Two chords of a circle cross.  One chord is split into
   pieces 5 and 8; the other into pieces 4 and ?.  Find the missing piece.
2. **Pen & paper:** From an external point $P$, a tangent of length 6 touches
   a circle.  A secant from $P$ cuts the circle at $A$ (closer) and $B$ with
   $PA = 4$.  Find $PB$.
3. **Pen & paper:** A point $P$ has power $-7$ with respect to a circle of
   radius 5.  Find $|OP|$.  Is $P$ inside or outside?
4. **Pen & paper:** Two secants from $P$ pass through circle, hitting at
   $A, B$ and $C, D$.  Given $PA = 4$, $PB = 9$, $PC = 3$, find $PD$.
5. **Insight:** Why does the same product $PA \cdot PB$ work for *every* line
   through $P$?  Trace through the proof of the intersecting-chord theorem
   and identify the inscribed-angle equality that makes the similar
   triangles work.
