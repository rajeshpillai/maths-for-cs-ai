# Special Triangles — 30-60-90, 45-45-90, and Pythagorean Triples

## Intuition

Most geometric problems eventually reduce to one of a handful of "special"
right triangles whose side ratios are exact and memorable.  The
$30°{-}60°{-}90°$ has sides in ratio $1 : \sqrt{3} : 2$.  The $45°{-}45°{-}90°$
has sides $1 : 1 : \sqrt{2}$.  Together with the **Pythagorean triples**
($3{-}4{-}5$, $5{-}12{-}13$, $8{-}15{-}17$, …), these triangles let you solve
geometry problems in your head, derive trig identities by hand, and recognise
shapes hiding inside complex configurations.

## Prerequisites

- Foundation 2, Lesson 6: Basic trigonometry (sin, cos, tan)
- Tier 8, Lesson 3: Pythagorean theorem and distance
- Classical Geometry, Lesson 2: Triangle congruence and similarity

## From First Principles

### The $45°{-}45°{-}90°$ triangle

Take a unit square and cut along its diagonal.  You get two right isosceles
triangles with legs of length 1 and hypotenuse of length $\sqrt{2}$
(by Pythagoras: $1^2 + 1^2 = 2$).

$$\text{sides: } 1 : 1 : \sqrt{2}$$

| Angle | sin | cos | tan |
|---|---|---|---|
| $45°$ | $\frac{\sqrt{2}}{2}$ | $\frac{\sqrt{2}}{2}$ | $1$ |

These exact values are derivable in 5 seconds and worth **memorising** — they
are the most-used angle in geometry after $90°$.

### The $30°{-}60°{-}90°$ triangle

Take an equilateral triangle with side 2, and drop a perpendicular from one
vertex to the opposite side.  This bisects both the angle ($60° \to 30°$) and
the side ($2 \to 1$), creating two congruent right triangles.

The shorter leg is $1$ (half the original side).  The hypotenuse is $2$
(side of the original triangle).  The longer leg is $\sqrt{2^2 - 1^2} = \sqrt{3}$.

$$\text{sides: } 1 : \sqrt{3} : 2$$

The $30°$ angle is opposite the side of length 1; the $60°$ is opposite $\sqrt{3}$.

| Angle | sin | cos | tan |
|---|---|---|---|
| $30°$ | $\frac{1}{2}$ | $\frac{\sqrt{3}}{2}$ | $\frac{1}{\sqrt{3}} = \frac{\sqrt{3}}{3}$ |
| $60°$ | $\frac{\sqrt{3}}{2}$ | $\frac{1}{2}$ | $\sqrt{3}$ |

### The trigonometric values are derivable, not memorised

The six values $\sin 30°, \cos 30°, \sin 45°, \cos 45°, \sin 60°, \cos 60°$
all come from the two triangles above.  When you forget one, **redraw the
triangle** and read off the ratio.  This is faster and more reliable than
rote.

### Pythagorean triples

A **Pythagorean triple** is a triple $(a, b, c)$ of positive integers with

$$a^2 + b^2 = c^2$$

The classic examples:

| $(a, b, c)$ | Verify |
|---|---|
| $(3, 4, 5)$    | $9 + 16 = 25$ |
| $(5, 12, 13)$  | $25 + 144 = 169$ |
| $(8, 15, 17)$  | $64 + 225 = 289$ |
| $(7, 24, 25)$  | $49 + 576 = 625$ |
| $(9, 40, 41)$  | $81 + 1600 = 1681$ |
| $(20, 21, 29)$ | $400 + 441 = 841$ |

A **primitive** triple has $\gcd(a, b, c) = 1$; non-primitive triples are
just integer multiples of primitives ($(6, 8, 10) = 2 \cdot (3, 4, 5)$).

### Generating all primitive triples — Euclid's formula

For coprime integers $m > n > 0$ with $m - n$ odd:

$$a = m^2 - n^2, \quad b = 2mn, \quad c = m^2 + n^2$$

is a primitive Pythagorean triple.  Every primitive triple has this form
(up to swapping $a$ and $b$).

**Pen & paper:** $(m, n) = (2, 1)$: $a = 3, b = 4, c = 5$.
$(m, n) = (3, 2)$: $a = 5, b = 12, c = 13$.
$(m, n) = (4, 1)$: $a = 15, b = 8, c = 17$ (so the primitive is $(8, 15, 17)$).
$(m, n) = (4, 3)$: $a = 7, b = 24, c = 25$.

### Why these triples appear so often

Many integer-sided right-triangle problems naturally place themselves on a
Pythagorean triple — recognising one immediately gives the third side
without computation.

A typical problem might say "a triangle has legs 6 and 8". Don't reach for
$\sqrt{36 + 64}$.  See $6 = 2 \cdot 3$ and $8 = 2 \cdot 4$, recognise
the $3{-}4{-}5$ triple scaled by 2, and write the hypotenuse as 10.

### Recognising special triangles in disguise

Not every problem hands you the angles or sides on a plate.  Watch for:

- A right triangle with one side **half the hypotenuse** → $30°{-}60°{-}90°$.
- A right triangle with two **equal** legs → $45°{-}45°{-}90°$.
- A right triangle with sides in ratio $\boxed{3:4:5, \, 5:12:13, \, 7:24:25}$
  (and their multiples) → save yourself work.
- An equilateral triangle with an altitude drawn — automatically two
  $30°{-}60°{-}90°$ triangles.
- A square with a diagonal — two $45°{-}45°{-}90°$ triangles.

## Python Verification

```python
# ── Special triangles: exact ratios and Pythagorean triples ─
import numpy as np
from math import gcd

# 30-60-90 triangle
print("=== 30-60-90 triangle (legs 1, sqrt(3); hypotenuse 2) ===")
side1, side2, hyp = 1, np.sqrt(3), 2
print(f"sides: 1, sqrt(3) ≈ {side2:.6f}, 2")
print(f"check 1^2 + sqrt(3)^2 = {1 + 3} = 2^2 ✓")
print(f"sin(30°) = 1/2 = {np.sin(np.radians(30)):.6f}")
print(f"sin(60°) = sqrt(3)/2 = {np.sin(np.radians(60)):.6f}")
print(f"tan(30°) = 1/sqrt(3) ≈ {np.tan(np.radians(30)):.6f}")

print("\n=== 45-45-90 triangle ===")
print(f"sides: 1, 1, sqrt(2) ≈ {np.sqrt(2):.6f}")
print(f"sin(45°) = sqrt(2)/2 = {np.sin(np.radians(45)):.6f}")

# Generate primitive Pythagorean triples via Euclid
print("\n=== Primitive Pythagorean triples (Euclid's formula) ===")
print(f"{'m':>3}{'n':>3}{'a':>5}{'b':>5}{'c':>5}{'primitive?':>13}")
for m in range(2, 8):
    for n in range(1, m):
        if (m - n) % 2 == 1 and gcd(m, n) == 1:
            a = m*m - n*n
            b = 2*m*n
            c = m*m + n*n
            assert a*a + b*b == c*c
            print(f"{m:>3}{n:>3}{a:>5}{b:>5}{c:>5}{'  primitive ✓':>13}")

# Test that several sides are Pythagorean triples
print("\n=== Testing classic triples ===")
for a, b, c in [(3,4,5), (5,12,13), (8,15,17), (7,24,25), (9,40,41), (20,21,29)]:
    print(f"  {a}^2 + {b}^2 = {a*a + b*b} = {c}^2", "✓" if a*a + b*b == c*c else "✗")

# Primitive vs non-primitive
print("\n=== Recognising scaled triples ===")
def is_pythagorean(a, b, c):
    return a*a + b*b == c*c
def primitive_form(a, b, c):
    g = gcd(gcd(a, b), c)
    return (a//g, b//g, c//g)

for trio in [(6, 8, 10), (15, 20, 25), (12, 16, 20), (10, 24, 26)]:
    if is_pythagorean(*trio):
        prim = primitive_form(*trio)
        print(f"  {trio} = {trio[0]//prim[0]} × {prim}")
```

## Visualisation — the two special right triangles

```python
# ── Side-by-side picture of 30-60-90 and 45-45-90 ──────────
import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(1, 2, figsize=(13, 6))

# 30-60-90: legs 1 and sqrt(3), hypotenuse 2
ax = axes[0]
A = (0, 0); B = (np.sqrt(3), 0); C = (0, 1)
tri = [A, B, C, A]
ax.plot(*zip(*tri), "b-", lw=2)
ax.fill(*zip(*tri[:3]), alpha=0.2, color="tab:blue")
# Right-angle marker at A
ax.plot([0.05, 0.05, 0], [0, 0.05, 0.05], "k-", lw=1)
# Labels
ax.text(np.sqrt(3)/2, -0.1, r"$\sqrt{3}$ (long leg)", ha="center", fontsize=12)
ax.text(-0.15, 0.5, "1 (short leg)", ha="right", fontsize=12)
ax.text(np.sqrt(3)/2 + 0.15, 0.55, "2 (hyp)", fontsize=12, rotation=-30)
ax.text(0.1, 0.05, "90°", fontsize=10)
ax.text(np.sqrt(3) - 0.25, 0.06, "30°", fontsize=10)
ax.text(0.05, 0.85, "60°", fontsize=10)
ax.set_xlim(-0.3, 2); ax.set_ylim(-0.3, 1.4)
ax.set_aspect("equal"); ax.grid(alpha=0.3)
ax.set_title("30-60-90 triangle\nsides 1 : √3 : 2")

# 45-45-90: legs 1, 1, hypotenuse sqrt(2)
ax = axes[1]
A = (0, 0); B = (1, 0); C = (0, 1)
tri = [A, B, C, A]
ax.plot(*zip(*tri), "g-", lw=2)
ax.fill(*zip(*tri[:3]), alpha=0.2, color="tab:green")
ax.plot([0.05, 0.05, 0], [0, 0.05, 0.05], "k-", lw=1)
ax.text(0.5, -0.1, "1", ha="center", fontsize=12)
ax.text(-0.1, 0.5, "1", ha="right", fontsize=12)
ax.text(0.55, 0.55, r"$\sqrt{2}$", fontsize=12, rotation=-45)
ax.text(0.1, 0.05, "90°", fontsize=10)
ax.text(0.7, 0.06, "45°", fontsize=10)
ax.text(0.05, 0.85, "45°", fontsize=10)
ax.set_xlim(-0.3, 1.3); ax.set_ylim(-0.3, 1.3)
ax.set_aspect("equal"); ax.grid(alpha=0.3)
ax.set_title("45-45-90 triangle\nsides 1 : 1 : √2")

plt.tight_layout()
plt.show()

# Plot of all primitive Pythagorean triples with c <= 50
fig, ax = plt.subplots(figsize=(8, 8))
from math import gcd
for m in range(2, 11):
    for n in range(1, m):
        if (m - n) % 2 == 1 and gcd(m, n) == 1:
            a, b, c = m*m-n*n, 2*m*n, m*m+n*n
            if c <= 50:
                ax.scatter([a], [b], s=80, color="tab:red")
                ax.text(a + 0.5, b + 0.5, f"({a},{b},{c})", fontsize=8)
ax.set_xlim(0, 50); ax.set_ylim(0, 50)
ax.set_xlabel("a"); ax.set_ylabel("b")
ax.set_title("Primitive Pythagorean triples (a, b, c) with c ≤ 50")
ax.set_aspect("equal"); ax.grid(alpha=0.3)
plt.tight_layout()
plt.show()
```

## Connection to CS / Games / AI / Business / Industry

- **CS / Graphics** — texture-mapping, lighting calculations, and isometric
  game rendering use $30°{-}60°{-}90°$ projections constantly; SDL/OpenGL
  shader literature is full of $\sqrt{2}$ and $\sqrt{3}$ constants.
- **Games / 2D graphics** — the "isometric" projection in classic games
  (SimCity, Diablo, StarCraft) uses $30°$ tilt, which yields exact pixel
  ratios via the $30°{-}60°{-}90°$ triangle.
- **AI / vision** — Sobel and other edge-detection kernels exploit
  $\sqrt{2}$ scaling on diagonals; HOG features bin gradients into angles
  whose tangent values are these special ratios.
- **Music / audio** — the equal-tempered scale's frequency ratios are 12th
  roots of 2 — not Pythagorean — but historic "just intonation" used the
  $3{-}4{-}5$ ratios for harmonious intervals.
- **Engineering / Construction** — the $3{-}4{-}5$ rule is the carpenter's
  trick to lay out a perfect right angle on site (mark 3 ft and 4 ft along
  two intersecting strings, square iff the diagonal is exactly 5 ft).
- **Surveying** — Pythagorean triples appear in plat layouts and lot
  divisions because legal property descriptions favour integer dimensions.

## Check Your Understanding

1. **Pen & paper:** An equilateral triangle has side 6.  Find its altitude
   without using a calculator (use the $30°{-}60°{-}90°$ structure).
2. **Pen & paper:** A square has diagonal 10.  Find its side length and area.
3. **Pen & paper:** A right triangle has legs 9 and 12.  Recognise it as a
   scaled $3{-}4{-}5$ and write the hypotenuse without the Pythagorean theorem.
4. **Pen & paper:** Use Euclid's formula with $(m, n) = (5, 2)$ to generate a
   primitive Pythagorean triple.  Verify $a^2 + b^2 = c^2$.
5. **Pen & paper:** A right triangle has hypotenuse 13 and one leg 5.  Find
   the other leg.  (You should recognise the $5{-}12{-}13$ triple.)
