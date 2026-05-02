# Triangle Congruence and Similarity — SSS, SAS, ASA, AAS, AAA

## Intuition

Two triangles are **congruent** if they're identical up to rigid motion
(translation, rotation, reflection).  Two are **similar** if they have the
same shape but possibly different size — corresponding angles equal,
corresponding sides in proportion.  Knowing the **minimum data** that pins
down a triangle (and which patterns of data are insufficient) is the
foundation of Euclidean proofs and the engine of trigonometric reasoning.

## Prerequisites

- Foundation 2, Lesson 6: Basic trigonometry (angles)
- Tier 1, Lesson 6: Proof techniques
- Classical Geometry, Lesson 1: Angle-chasing

## From First Principles

### Congruence — the four valid criteria

Two triangles $\triangle ABC$ and $\triangle DEF$ are **congruent** if any of:

- **SSS** (Side-Side-Side): all three pairs of corresponding sides equal.
- **SAS** (Side-Angle-Side): two sides and the included angle equal.
- **ASA** (Angle-Side-Angle): two angles and the included side equal.
- **AAS** (Angle-Angle-Side): two angles and a non-included side equal.

(AAS reduces to ASA via the triangle-sum: knowing two angles fixes the third.)

We write $\triangle ABC \cong \triangle DEF$ to mean congruent **with that
specific correspondence**: $A \leftrightarrow D$, $B \leftrightarrow E$,
$C \leftrightarrow F$.

### What is **not** a congruence criterion

- **AAA** alone (three angles).  Triangles with the same three angles are
  **similar** but not necessarily congruent — they can be different sizes.
- **SSA** (Side-Side-Angle, non-included) is the **ambiguous case**: zero, one,
  or two distinct triangles can fit the data, depending on numerical values.
  Beware in proofs and in problems involving the "law of sines".

### Worked example — proving congruence with SSS

> $\triangle ABC$ has $AB = 5$, $BC = 6$, $CA = 7$. $\triangle DEF$ has
> $DE = 5$, $EF = 6$, $FD = 7$.  Show $\triangle ABC \cong \triangle DEF$.

By SSS with the correspondence $A \to D$, $B \to E$, $C \to F$. ∎

By congruence, all corresponding angles are equal: $\angle A = \angle D$, etc.
So once you've established congruence, **every** matching angle and every
matching side is shared.  This is the workhorse of geometric proofs.

### Similarity — the AA criterion

Two triangles are **similar** if their corresponding angles are equal.
Equivalently (via triangle-sum), if **two pairs** of corresponding angles
are equal — the third is forced.

We write $\triangle ABC \sim \triangle DEF$.  Then sides scale uniformly:

$$\frac{AB}{DE} = \frac{BC}{EF} = \frac{CA}{FD} = k$$

where $k$ is the **ratio of similarity** (scale factor).

### Other similarity criteria

- **SAS for similarity:** if $\angle A = \angle D$ and $AB/DE = AC/DF$, then
  $\triangle ABC \sim \triangle DEF$.
- **SSS for similarity:** if all three pairs of corresponding sides are in the
  same ratio $k$, the triangles are similar.

### Why these criteria work — a geometric proof of SAS

Place $\triangle ABC$ on a plane with $A$ at the origin and $B$ along the
positive $x$-axis at $(c, 0)$ where $c = AB$.  Then $C$ is uniquely determined
once you know $AC = b$ and the angle $\angle BAC = \alpha$:

$$C = (b \cos \alpha, b \sin \alpha)$$

Two values of $b$ along that ray give the same point only if they're equal.
So SAS data $\{c, \alpha, b\}$ pins down the triangle's shape and size up to
the rigid motion that placed $A$ and $B$.  Same data → same triangle (up to
congruence).  ∎

### Worked example — using similarity to find a length

> In $\triangle ABC$, $D$ is on $AB$ and $E$ is on $AC$ with $DE \parallel BC$.
> Given $AD = 3$, $DB = 5$, $AE = 4$.  Find $EC$.

Since $DE \parallel BC$, $\angle ADE = \angle ABC$ (corresponding) and
$\angle A$ is shared.  By **AA**: $\triangle ADE \sim \triangle ABC$.

Ratio of similarity: $\frac{AD}{AB} = \frac{3}{8}$.

So $\frac{AE}{AC} = \frac{3}{8}$, hence $AC = \frac{4 \cdot 8}{3} = \frac{32}{3}$.

$EC = AC - AE = \frac{32}{3} - 4 = \frac{20}{3}$.

(This is the **basic proportionality theorem** / Thales theorem.)

### Areas of similar triangles

If $\triangle ABC \sim \triangle DEF$ with ratio $k$, then

$$\frac{[\triangle ABC]}{[\triangle DEF]} = k^2$$

(area scales as the square of length scale).

**Pen & paper:** A triangle has area 12.  A similar triangle with sides 3
times longer has area $12 \cdot 9 = 108$.

This is the source of many "area-doubling" puzzles.

## Python Verification

```python
# ── Congruence and similarity: numerical checks ─────────────
import numpy as np

def triangle_sides(A, B, C):
    a = np.linalg.norm(np.array(B) - C)   # side opposite A
    b = np.linalg.norm(np.array(C) - A)   # side opposite B
    c = np.linalg.norm(np.array(A) - B)   # side opposite C
    return (a, b, c)

def triangle_angles(A, B, C):
    a, b, c = triangle_sides(A, B, C)
    # Law of cosines
    angle_A = np.degrees(np.arccos((b*b + c*c - a*a) / (2*b*c)))
    angle_B = np.degrees(np.arccos((a*a + c*c - b*b) / (2*a*c)))
    angle_C = np.degrees(np.arccos((a*a + b*b - c*c) / (2*a*b)))
    return (angle_A, angle_B, angle_C)

def area(A, B, C):
    A, B, C = np.array(A), np.array(B), np.array(C)
    return 0.5 * abs((B[0]-A[0])*(C[1]-A[1]) - (B[1]-A[1])*(C[0]-A[0]))

# SSS congruence
print("=== SSS congruence ===")
T1 = ((0, 0), (4, 0), (0, 3))                 # 3-4-5 right triangle
T2 = ((10, 10), (10, 14), (13, 10))           # rotated/translated
print(f"T1 sides: {triangle_sides(*T1)}")
print(f"T2 sides: {triangle_sides(*T2)}")
# T2 was constructed differently; verify
print(f"T1 angles: {[f'{x:.2f}' for x in triangle_angles(*T1)]}")
print(f"T2 angles: {[f'{x:.2f}' for x in triangle_angles(*T2)]}")

# AA similarity
print("\n=== AA similarity (same angles, different size) ===")
T_small = ((0, 0), (3, 0), (0, 4))
T_big   = ((0, 0), (6, 0), (0, 8))
print(f"small angles: {[f'{x:.2f}' for x in triangle_angles(*T_small)]}")
print(f"big   angles: {[f'{x:.2f}' for x in triangle_angles(*T_big)]}")
print(f"area ratio: {area(*T_big) / area(*T_small)}  (should be (2)^2 = 4)")

# Basic proportionality (Thales)
print("\n=== Basic proportionality / Thales ===")
A = (0, 0); B = (8, 0); C = (0, 6)
# D on AB with AD = 3 (so DB = 5)
D = (3, 0)
# E on AC with AE = 4
E = (0, 4)
# DE parallel to BC?
DE = np.array(E) - np.array(D)
BC = np.array(C) - np.array(B)
cross = DE[0] * BC[1] - DE[1] * BC[0]
print(f"DE x BC cross product: {cross}  (zero means parallel)")
# Check ratios
print(f"AD/AB = {3/8:.4f}, AE/AC should equal this; AE/AC = {4/6:.4f}")
print(f"Are they equal? {abs(3/8 - 4/6) < 1e-9}  → DE not parallel to BC here")
print("(Try AE = 3 to see Thales activate)")
```

## Visualisation — congruent and similar triangles

```python
# ── Show three pairs: congruent (SSS), similar (AA), and SSA ambiguous ──
import matplotlib.pyplot as plt
import matplotlib.patches as mp

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# (1) SSS congruence — same triangle, different position/orientation
ax = axes[0]
ax.set_title("SSS: congruent triangles\n(rotated, translated)")
T1 = [(0, 0), (4, 0), (0, 3), (0, 0)]
ax.plot(*zip(*T1), "b-", lw=2)
T2 = [(6, 1), (8.5, 4.12), (5, 4), (6, 1)]   # not actually congruent — placeholder
import math
def rotate(pt, theta, origin=(0,0)):
    s, c = math.sin(theta), math.cos(theta)
    x, y = pt[0]-origin[0], pt[1]-origin[1]
    return (origin[0]+x*c-y*s, origin[1]+x*s+y*c)
# Build a true congruent copy: rotate T1 by 60° about (6,1)
theta = math.radians(60)
T2 = [(rotate((p[0]+6, p[1]+1), theta, (6,1))) for p in [(0,0),(4,0),(0,3),(0,0)]]
ax.plot(*zip(*T2), "g-", lw=2)
ax.set_aspect("equal"); ax.grid(alpha=0.3)
ax.set_xlim(-1, 11); ax.set_ylim(-1, 7)

# (2) AA similarity — same angles, scaled
ax = axes[1]
ax.set_title("AA: similar (k = 2)\nangles equal, sides ×2")
T_small = [(0, 0), (3, 0), (0, 4), (0, 0)]
T_big   = [(5, 0), (11, 0), (5, 8), (5, 0)]
ax.plot(*zip(*T_small), "b-", lw=2)
ax.plot(*zip(*T_big),   "r-", lw=2)
ax.set_aspect("equal"); ax.grid(alpha=0.3)
ax.set_xlim(-1, 12); ax.set_ylim(-1, 9)

# (3) SSA — ambiguous case
ax = axes[2]
ax.set_title("SSA ambiguous: same a, b, ∠A\ntwo distinct triangles")
A = (0, 0); B = (5, 0)
# Angle 30° at A, opposite side BC = 3
# Two possible C positions
import numpy as np
# B is at (5,0). From A, ray at 30° above x-axis. C lies on this ray with BC = 3.
# Parameterise C = (t cos30, t sin30); set |C-B| = 3.
from numpy import sqrt, cos, sin, radians
candidates = []
for t_init in [3, 6]:
    # Solve (t cos30 - 5)^2 + (t sin30)^2 = 9
    # t^2 - 10 t cos30 + 25 - 9 = 0 -> t^2 - 8.66 t + 16 = 0
    pass
# Hard-code the two solutions
t1 = 5 * cos(radians(30)) - sqrt(9 - 25 * sin(radians(30))**2)
t2 = 5 * cos(radians(30)) + sqrt(9 - 25 * sin(radians(30))**2)
C1 = (t1 * cos(radians(30)), t1 * sin(radians(30)))
C2 = (t2 * cos(radians(30)), t2 * sin(radians(30)))
ax.plot(*zip(A, B, C1, A), "b-", lw=2, label="solution 1")
ax.plot(*zip(A, B, C2, A), "r--", lw=2, label="solution 2")
ax.plot(*A, "ko"); ax.text(A[0]-0.2, A[1]-0.3, "A")
ax.plot(*B, "ko"); ax.text(B[0]+0.1, B[1]-0.3, "B")
ax.plot(*C1, "ko"); ax.plot(*C2, "ko")
ax.legend(); ax.set_aspect("equal"); ax.grid(alpha=0.3)
ax.set_xlim(-1, 7); ax.set_ylim(-1, 3.5)

plt.tight_layout()
plt.show()
```

## Connection to CS / Games / AI / Business / Industry

- **CS / Computer graphics** — model–world transformations preserve
  congruence (rigid) or similarity (uniform scale + rigid); object-space vs
  world-space conversions test congruence-style invariants.
- **CS / Computer vision** — feature matching across views uses similarity
  transforms (RANSAC + 4-point algorithm); image rectification finds the
  similarity that turns a perspective view into a flat map.
- **AI / ML** — convolutional neural networks build in **translation
  congruence** (a kernel sees the same triangle at every location); group-
  equivariant networks extend to rotation/reflection congruence.
- **Robotics** — pose estimation pipelines (PnP problem) use congruence/
  similarity arguments to fit observed 2D points to 3D models.
- **Architecture / Engineering** — scale models (1:50 architectural plans,
  1:144 model railways) preserve similarity; structural calculations rely on
  area-square-of-length scaling.
- **Cartography / Surveying** — map projection metrics depend on similarity
  preservation locally (conformal maps); triangulation networks rely on
  congruence-detection for survey accuracy.

## Check Your Understanding

1. **Pen & paper:** A triangle has sides 7, 24, 25.  Another has sides 14, 48,
   50.  Are they congruent?  Similar?  What is the ratio if they are similar?
2. **Pen & paper:** $\triangle ABC$ has $\angle A = 40°$, $\angle B = 70°$, and
   $AB = 6$.  Use ASA to argue that this fully determines the triangle.
3. **Pen & paper:** Why does AAA *not* imply congruence?  Sketch two non-
   congruent triangles with the same angles.
4. **Pen & paper:** Triangle $T_1$ has area 24 cm² and is similar to $T_2$
   with ratio $k = 3/2$.  What is the area of $T_2$?
5. **Insight:** Construct an example of the SSA ambiguous case with $\angle A = 30°$, $b = 5$, $a = 3$.  Show that two distinct triangles satisfy these data.
