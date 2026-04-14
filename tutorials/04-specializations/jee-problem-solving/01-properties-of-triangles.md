# Properties of Triangles

## Intuition

Every triangle hides a rich web of relationships between its sides, angles, and special circles.
The circumradius R (radius of the circle passing through all three vertices) and the inradius r
(radius of the circle tangent to all three sides) encode the triangle's shape in a single number.
In game development, these properties power collision detection, mesh generation, and camera
placement. In AI, triangle geometry appears in computational geometry algorithms used for
spatial indexing and 3D reconstruction.

## Prerequisites

- Foundation 4, Lesson 4 (Trigonometric identities, sine, cosine, tangent)
- Basic area formulas for triangles
- Familiarity with the unit circle

## From First Principles

### Standard Notation

For triangle $ABC$ with sides $a = BC$, $b = CA$, $c = AB$ opposite to angles $A$, $B$, $C$
respectively. Semi-perimeter $s = (a + b + c) / 2$.

### The Sine Rule — Derivation

Consider triangle $ABC$ inscribed in a circle of radius $R$ (circumcircle).

**Step 1.** Draw diameter $BD$ through $B$. Since $BD$ is a diameter, angle $BCD = 90°$
(angle in a semicircle).

**Step 2.** In right triangle $BCD$:
$$\sin(\angle BDC) = \frac{BC}{BD} = \frac{a}{2R}$$

**Step 3.** Angles $\angle BDC$ and $\angle BAC$ subtend the same arc $BC$, so $\angle BDC = A$.

**Step 4.** Therefore:
$$\sin A = \frac{a}{2R} \implies \frac{a}{\sin A} = 2R$$

By the same argument for the other vertices:

$$\boxed{\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R}$$

### The Cosine Rule — Review

From the distance formula, placing $C$ at the origin:

$$c^2 = a^2 + b^2 - 2ab\cos C$$

### Circumradius $R = \frac{abc}{4 \cdot \text{Area}}$

**Step 1.** From the sine rule: $\sin A = \frac{a}{2R}$

**Step 2.** Area of triangle: $\text{Area} = \frac{1}{2}bc\sin A = \frac{1}{2}bc \cdot \frac{a}{2R} = \frac{abc}{4R}$

**Step 3.** Rearranging:

$$\boxed{R = \frac{abc}{4 \cdot \text{Area}}}$$

### Heron's Formula for Area

$$\text{Area} = \sqrt{s(s-a)(s-b)(s-c)}$$

where $s = (a+b+c)/2$.

**Derivation sketch:** Start from $\text{Area} = \frac{1}{2}ab\sin C$ and use
$\cos C = (a^2 + b^2 - c^2)/(2ab)$, then $\sin^2 C = 1 - \cos^2 C$, factor the
difference of squares, and simplify. Each factor becomes one of $s$, $s-a$, $s-b$, $s-c$.

### Inradius $r = \text{Area}/s$

**Step 1.** The incircle touches sides $a$, $b$, $c$ at points forming three smaller
triangles with the incenter $I$.

**Step 2.** Each smaller triangle has height $r$ (the inradius) and base equal to
the respective side.

**Step 3.** Total area:
$$\text{Area} = \frac{1}{2}ar + \frac{1}{2}br + \frac{1}{2}cr = \frac{r(a+b+c)}{2} = rs$$

$$\boxed{r = \frac{\text{Area}}{s}}$$

### Stewart's Theorem

If a cevian $AD$ of length $d$ divides side $BC$ into segments $m = BD$ and $n = DC$:

$$b^2 m + c^2 n = a(d^2 + mn)$$

**Derivation:** Apply the cosine rule in triangles $ABD$ and $ACD$, eliminate the
cosine of the angle at $D$ (noting $\cos(\angle ADB) = -\cos(\angle ADC)$), and combine.

### Angle Bisector Theorem

The internal bisector of angle $A$ divides side $BC$ in the ratio $b:c$.

$$\frac{BD}{DC} = \frac{AB}{AC} = \frac{c}{b}$$

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

# Triangle with sides a=5, b=6, c=7
# Place C at origin, B along x-axis
a, b, c = 5, 6, 7
C = np.array([0, 0])
B = np.array([a, 0])
cos_C = (a**2 + b**2 - c**2) / (2 * a * b)
sin_C = np.sqrt(1 - cos_C**2)
A = np.array([b * cos_C, b * sin_C])

# Compute area, circumradius, inradius
s = (a + b + c) / 2
area = np.sqrt(s * (s - a) * (s - b) * (s - c))
R = (a * b * c) / (4 * area)
r = area / s

# Circumcenter (intersection of perpendicular bisectors)
D = 2 * (A[0]*(B[1]-C[1]) + B[0]*(C[1]-A[1]) + C[0]*(A[1]-B[1]))
ux = ((A[0]**2+A[1]**2)*(B[1]-C[1]) + (B[0]**2+B[1]**2)*(C[1]-A[1]) + (C[0]**2+C[1]**2)*(A[1]-B[1])) / D
uy = ((A[0]**2+A[1]**2)*(C[0]-B[0]) + (B[0]**2+B[1]**2)*(A[0]-C[0]) + (C[0]**2+C[1]**2)*(B[0]-A[0])) / D
circumcenter = np.array([ux, uy])

# Incenter (weighted average by side lengths)
incenter = (a * A + b * B + c * C) / (a + b + c)

fig, ax = plt.subplots(1, 1, figsize=(8, 7))
triangle = plt.Polygon([A, B, C], fill=False, edgecolor='black', linewidth=2)
ax.add_patch(triangle)

# Circumcircle
circ = plt.Circle(circumcenter, R, fill=False, color='blue', linestyle='--', linewidth=1.5, label=f'Circumcircle R={R:.2f}')
ax.add_patch(circ)

# Incircle
inc = plt.Circle(incenter, r, fill=False, color='red', linestyle='--', linewidth=1.5, label=f'Incircle r={r:.2f}')
ax.add_patch(inc)

ax.plot(*circumcenter, 'bo', markersize=5)
ax.plot(*incenter, 'ro', markersize=5)

for pt, name in [(A, 'A'), (B, 'B'), (C, 'C')]:
    ax.annotate(name, pt, textcoords="offset points", xytext=(5, 5), fontsize=14, fontweight='bold')

ax.set_xlim(-3, 8)
ax.set_ylim(-3, 8)
ax.set_aspect('equal')
ax.legend(fontsize=11)
ax.set_title('Triangle with Circumcircle and Incircle', fontsize=14)
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('triangle_circles.png', dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np

# Triangle with sides a=5, b=6, c=7
a, b, c = 5, 6, 7
s = (a + b + c) / 2
print(f"Semi-perimeter s = {s}")

# Heron's formula
area = np.sqrt(s * (s - a) * (s - b) * (s - c))
print(f"Area (Heron) = {area:.6f}")

# Trigonometric area: (1/2)*a*b*sin(C)
cos_C = (a**2 + b**2 - c**2) / (2 * a * b)
sin_C = np.sqrt(1 - cos_C**2)
area_trig = 0.5 * a * b * sin_C
print(f"Area (trig)  = {area_trig:.6f}")

# Sine rule verification
A_angle = np.arccos((b**2 + c**2 - a**2) / (2 * b * c))
B_angle = np.arccos((a**2 + c**2 - b**2) / (2 * a * c))
C_angle = np.arccos((a**2 + b**2 - c**2) / (2 * a * b))
print(f"\nSine rule check:")
print(f"  a/sin(A) = {a / np.sin(A_angle):.6f}")
print(f"  b/sin(B) = {b / np.sin(B_angle):.6f}")
print(f"  c/sin(C) = {c / np.sin(C_angle):.6f}")

# Circumradius
R = (a * b * c) / (4 * area)
print(f"\nCircumradius R = abc/(4*Area) = {R:.6f}")
print(f"  Check: 2R = {2*R:.6f}, a/sin(A) = {a/np.sin(A_angle):.6f}")

# Inradius
r = area / s
print(f"Inradius r = Area/s = {r:.6f}")

# Stewart's theorem verification: median from A to midpoint M of BC
# For a median: m = n = a/2, d = median length
m_a = 0.5 * np.sqrt(2*b**2 + 2*c**2 - a**2)  # median formula
m, n = a/2, a/2
lhs = b**2 * m + c**2 * n
rhs = a * (m_a**2 + m * n)
print(f"\nStewart's theorem (median from A):")
print(f"  LHS = b²m + c²n = {lhs:.6f}")
print(f"  RHS = a(d² + mn) = {rhs:.6f}")
print(f"  Equal: {np.isclose(lhs, rhs)}")

# Angle bisector theorem
# Bisector from A divides BC in ratio c:b
print(f"\nAngle bisector theorem:")
print(f"  BD/DC should equal c/b = {c}/{b} = {c/b:.4f}")
BD = a * c / (b + c)
DC = a * b / (b + c)
print(f"  BD = {BD:.4f}, DC = {DC:.4f}, BD/DC = {BD/DC:.4f}")
```

## Connection to CS / Games / AI

- **Game dev:** Circumcircles are fundamental to Delaunay triangulation, used for terrain
  mesh generation and pathfinding. The incircle radius helps measure mesh quality.
- **Computer graphics:** Triangle properties determine barycentric coordinates for texture
  mapping and interpolation across mesh faces.
- **AI / Computational geometry:** Spatial search structures (k-d trees, R-trees) rely on
  triangle bounding properties. Heights and distances problems map to sensor placement
  optimisation in robotics.

## Check Your Understanding

1. **By hand:** For a triangle with sides 8, 15, 17, verify it is right-angled, then compute
   $R$, $r$, and the area using all three area formulas.

2. **Derive:** Show that for an equilateral triangle with side $a$: $R = a/\sqrt{3}$ and
   $r = a/(2\sqrt{3})$, so $R = 2r$.

3. **Coding:** Write a function that takes three side lengths and returns `True` if the
   incircle and circumcircle are concentric (which happens only for equilateral triangles).

4. **Heights & distances:** From the top of a cliff 100 m high, the angles of depression to
   two boats in a line are 30° and 60°. Find the distance between the boats.

## JEE Challenge

**Problem 1.** In triangle $ABC$, prove that:
$$r = 4R \sin\frac{A}{2}\sin\frac{B}{2}\sin\frac{C}{2}$$
*Hint:* Use $r = \text{Area}/s$, $R = abc/(4 \cdot \text{Area})$, the sine rule, and the
half-angle formula $\sin(A/2) = \sqrt{(s-b)(s-c)/(bc)}$.

**Problem 2.** In a triangle with $a = 13$, $b = 14$, $c = 15$, find the length of the
altitude from $A$, the circumradius $R$, the inradius $r$, and verify that the distance
from the circumcenter to side $BC$ equals $R\cos A$.

**Problem 3.** Two pillars of height $h_1$ and $h_2$ stand on a horizontal plane. The angle
of elevation of the top of the first pillar from the base of the second is $\alpha$, and the
angle of elevation of the top of the second from the base of the first is $\beta$. Find the
distance between the pillars and express $h_1/h_2$ in terms of $\alpha$ and $\beta$.
