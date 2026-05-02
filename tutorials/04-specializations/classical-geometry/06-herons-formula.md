# Heron's Formula — Triangle Area from Side Lengths

## Intuition

If you know all three sides of a triangle but **not** the height, can you
still compute its area?  Yes — Heron of Alexandria's two-thousand-year-old
formula computes the area directly from the three side lengths and the
**semi-perimeter**.  No height, no angles, no trigonometry.  It is the
go-to formula whenever you have side lengths and need an area.

## Prerequisites

- Tier 8, Lesson 3: Pythagorean theorem and distance
- Classical Geometry, Lesson 3: Special triangles
- Classical Geometry, Lesson 5: Area formulas (the $\frac{1}{2}bh$ baseline)

## From First Principles

### Statement

For a triangle with sides $a, b, c$, define the **semi-perimeter**

$$s = \frac{a + b + c}{2}$$

Then the area is

$$\text{area} = \sqrt{s(s - a)(s - b)(s - c)}$$

The formula is **symmetric** in $a, b, c$ — as it must be, since the area
shouldn't depend on which side we call "$a$".

### Pen & paper sanity check — the 3-4-5 triangle

Sides $3, 4, 5$.  $s = 12/2 = 6$.

$$\text{area} = \sqrt{6 \cdot 3 \cdot 2 \cdot 1} = \sqrt{36} = 6$$

Direct check: it's a right triangle with legs 3 and 4, so area = $\frac{1}{2} \cdot 3 \cdot 4 = 6$. ✓

### Pen & paper — the 13-14-15 triangle

This is a famous "Heronian" triangle (integer sides, integer area).

$s = (13 + 14 + 15)/2 = 21$.

$$\text{area} = \sqrt{21 \cdot 8 \cdot 7 \cdot 6} = \sqrt{7056} = 84$$

(You'd never see that area without Heron — there's no obvious "base × height".)

### Derivation from the law of cosines + the trig area formula

Start from the trig area: $K = \frac{1}{2} a b \sin C$, so
$K^2 = \frac{1}{4} a^2 b^2 \sin^2 C = \frac{1}{4} a^2 b^2 (1 - \cos^2 C)$.

By the law of cosines, $\cos C = \frac{a^2 + b^2 - c^2}{2ab}$, hence

$$1 - \cos^2 C = 1 - \frac{(a^2 + b^2 - c^2)^2}{4 a^2 b^2}$$

Multiply through and simplify (this is the long algebra step):

$$16 K^2 = 4 a^2 b^2 - (a^2 + b^2 - c^2)^2$$

The right side factors using $A^2 - B^2 = (A - B)(A + B)$:

$$= [2ab - (a^2 + b^2 - c^2)] \cdot [2ab + (a^2 + b^2 - c^2)]$$

$$= [c^2 - (a - b)^2] \cdot [(a + b)^2 - c^2]$$

$$= (c - a + b)(c + a - b)(a + b - c)(a + b + c)$$

In terms of the semi-perimeter $s = (a + b + c)/2$:

- $a + b + c = 2s$
- $-a + b + c = 2(s - a)$
- $a - b + c = 2(s - b)$
- $a + b - c = 2(s - c)$

So $16 K^2 = 16 s(s - a)(s - b)(s - c)$, giving

$$K = \sqrt{s(s - a)(s - b)(s - c)} \;\square$$

### Numerical stability — the modern reformulation

For triangles with one very long side (highly degenerate), Heron's formula
loses precision in floating-point arithmetic because $s - c$ becomes a
**catastrophic cancellation**.  The numerically stable form (Kahan):

Sort sides so $a \ge b \ge c$, then

$$K = \frac{1}{4} \sqrt{(a + (b + c))(c - (a - b))(c + (a - b))(a + (b - c))}$$

Mathematically equivalent, but each parenthesised quantity is computed
without subtractive cancellation.

(Don't worry about this for paper-and-pen work; do worry if you embed
Heron in production graphics or simulation code.)

### The same formula in disguise — the determinant form

For a triangle with vertices $\mathbf{p}_1, \mathbf{p}_2, \mathbf{p}_3$ in
$\mathbb{R}^2$:

$$K = \frac{1}{2} \left| \det \begin{pmatrix} x_2 - x_1 & x_3 - x_1 \\ y_2 - y_1 & y_3 - y_1 \end{pmatrix} \right|$$

This is the shoelace formula in 2 lines.  Heron's formula is the same area
expressed using only side lengths — useful when you don't know the
coordinates.

### Heronian triangles

A **Heronian triangle** has integer sides **and** integer area.

The smallest:
- $(3, 4, 5)$ area $= 6$
- $(5, 12, 13)$ area $= 30$
- $(13, 14, 15)$ area $= 84$
- $(9, 10, 17)$ area $= 36$
- $(7, 15, 20)$ area $= 42$

Pythagorean triangles are always Heronian (legs and area are integers).
But Heronian triangles need not be right-angled — $(13, 14, 15)$ isn't.

## Python Verification

```python
# ── Heron's formula: classic and stable variants ────────────
import numpy as np

def heron(a, b, c):
    s = (a + b + c) / 2
    radicand = s * (s - a) * (s - b) * (s - c)
    if radicand < 0:
        return None  # degenerate or impossible
    return np.sqrt(radicand)

def heron_stable(a, b, c):
    """Kahan's numerically stable version."""
    sides = sorted([a, b, c])
    a, b, c = sides[2], sides[1], sides[0]   # a ≥ b ≥ c
    radicand = (a + (b + c)) * (c - (a - b)) * (c + (a - b)) * (a + (b - c))
    if radicand < 0:
        return None
    return 0.25 * np.sqrt(radicand)

print("=== Classic verifications ===")
for triple in [(3, 4, 5), (5, 12, 13), (6, 8, 10), (13, 14, 15),
               (9, 10, 17), (7, 15, 20)]:
    print(f"  sides {triple}: area = {heron(*triple)}")

# Compare stable vs classic on a near-degenerate triangle
print("\n=== Numerical stability test ===")
a, b, c = 100000, 100000, 1.000001
print(f"sides ({a}, {b}, {c}) — needle-thin triangle")
print(f"  classic:  {heron(a, b, c)}")
print(f"  stable:   {heron_stable(a, b, c)}")
# Reference via 1/2 b h with b = c and h ≈ ?
# Actually for an isosceles triangle base c, equal sides a:
# height = sqrt(a^2 - (c/2)^2)
import math
ref = 0.5 * c * math.sqrt(a*a - (c/2)*(c/2))
print(f"  reference 1/2 c sqrt(a^2 - c^2/4): {ref}")

# Detect impossible triangles
print("\n=== Triangle-inequality edge cases ===")
for triple in [(1, 2, 3), (5, 5, 12), (7, 8, 15)]:
    print(f"  sides {triple}: heron = {heron(*triple)}")

# Find Heronian triangles up to perimeter 50
print("\n=== Heronian triangles (integer sides + integer area) up to perimeter 50 ===")
found = []
for a in range(1, 26):
    for b in range(a, 26):
        for c in range(b, 26):
            if a + b + c > 50: break
            if a + b <= c: continue
            area = heron(a, b, c)
            if area is not None and abs(area - round(area)) < 1e-9 and area > 0:
                found.append((a, b, c, int(round(area))))
for tri in found[:15]:
    print(f"  sides {tri[:3]}, area = {tri[3]}")
```

## Visualisation — area landscape as the third side varies

```python
# ── Heron-area as a function of the third side ──────────────
import matplotlib.pyplot as plt
import numpy as np

a, b = 5, 7
cs = np.linspace(0.1, a + b - 0.01, 500)
areas = []
for c in cs:
    s = (a + b + c) / 2
    rad = s * (s - a) * (s - b) * (s - c)
    areas.append(np.sqrt(rad) if rad >= 0 else 0)

fig, ax = plt.subplots(figsize=(11, 6))
ax.plot(cs, areas, "b-", lw=2)
# Mark the maximum (right triangle)
max_idx = np.argmax(areas)
ax.plot(cs[max_idx], areas[max_idx], "ro", ms=10,
        label=f"max at c = {cs[max_idx]:.3f}, area = {areas[max_idx]:.3f}")
# When the triangle is right-angled, c = sqrt(a^2 + b^2) and area = ab/2
right_c = np.sqrt(a*a + b*b)
right_area = a * b / 2
ax.axvline(right_c, color="green", linestyle="--",
           label=f"right triangle: c = √(a²+b²) ≈ {right_c:.3f}, area = ab/2 = {right_area}")
ax.axvline(abs(a - b), color="red", linestyle="--", alpha=0.5,
           label=f"|a-b| = {abs(a-b)} (degenerate boundary)")
ax.axvline(a + b, color="red", linestyle="--", alpha=0.5,
           label=f"a+b = {a+b} (degenerate boundary)")
ax.set_xlabel("c (length of third side)"); ax.set_ylabel("area")
ax.set_title(f"Heron area of triangle (a={a}, b={b}, c) as c varies\n"
             f"Max area attained when triangle is right-angled (a ⊥ b)")
ax.legend(); ax.grid(alpha=0.3)
plt.tight_layout()
plt.show()
```

The plot shows that for fixed $a$ and $b$, the maximum-area triangle occurs
when the angle between them is $90°$ — which is also when Heron's formula
gives $K = \frac{1}{2}ab$ (the right-triangle area).

## Connection to CS / Games / AI / Business / Industry

- **CS / Computational geometry** — Heron is the standard way to compute
  triangle areas in mesh-validation pipelines (CGAL, libigl) when you have
  edge lengths but not vertex coordinates.
- **CS / Graphics** — finite-element method (FEM) simulations validate mesh
  triangle quality using Heron-derived shape ratios; degenerate triangles
  (very small Heron area for given perimeter) cause numerical instability.
- **AI / GIS** — Voronoi-Delaunay triangulations of geographic points use
  Heron to flag "sliver" triangles that should be flipped or deleted.
- **Robotics** — manipulator workspace analysis: triangle inequality + Heron
  computes the area of reachable regions when only joint distances are
  known.
- **Surveying / Land planning** — surveyors measure side lengths with tape;
  Heron yields area without needing to lay out a perpendicular.  This was
  literally Heron's original application in 1st-century Alexandria.
- **Engineering** — structural truss analysis computes triangular-panel
  areas from member lengths; aerospace shape design uses Heronian
  approximations for surface integrals.

## Check Your Understanding

1. **Pen & paper:** Compute the area of a triangle with sides 13, 14, 15
   using Heron's formula.  (You should get 84.)
2. **Pen & paper:** Sides 6, 8, 10.  Compute the area by Heron and verify
   against the right-triangle formula.
3. **Pen & paper:** A triangle has perimeter 30 and is equilateral.  Find its
   area both by Heron and by the special $30°{-}60°{-}90°$ triangles.
4. **Pen & paper:** Find the area of a triangle with sides 11, 60, 61.
   Verify it's a right triangle (since $11^2 + 60^2 = 61^2$).
5. **Insight:** Why is Heron's formula symmetric in $a, b, c$, and how does
   that relate to the fact that triangle area doesn't depend on which side
   you call the "base"?
