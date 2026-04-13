# Projection — Orthographic vs Perspective

## Intuition

Projection maps 3D space onto a 2D screen.  **Orthographic** preserves
parallel lines (used in CAD, top-down games).  **Perspective** makes distant
objects smaller (realistic, used in FPS games).  Both are 4×4 matrix
multiplications in homogeneous coordinates.

## Prerequisites

- Tier 8, Lesson 6: Homogeneous Coordinates

## From First Principles

### Orthographic projection

Maps a box $[l,r] \times [b,t] \times [n,f]$ to the cube $[-1,1]^3$:

$$\mathbf{P}_{\text{ortho}} = \begin{pmatrix} \frac{2}{r-l} & 0 & 0 & -\frac{r+l}{r-l} \\ 0 & \frac{2}{t-b} & 0 & -\frac{t+b}{t-b} \\ 0 & 0 & \frac{-2}{f-n} & -\frac{f+n}{f-n} \\ 0 & 0 & 0 & 1 \end{pmatrix}$$

Simply scales and translates — no foreshortening.

### Perspective projection

The key idea: divide $x$ and $y$ by $z$ (farther objects → smaller).

For field-of-view $\theta$, aspect ratio $a$, near $n$, far $f$:

$$\mathbf{P}_{\text{persp}} = \begin{pmatrix} \frac{1}{a\tan(\theta/2)} & 0 & 0 & 0 \\ 0 & \frac{1}{\tan(\theta/2)} & 0 & 0 \\ 0 & 0 & \frac{-(f+n)}{f-n} & \frac{-2fn}{f-n} \\ 0 & 0 & -1 & 0 \end{pmatrix}$$

After multiplying, the result has $w \ne 1$.  **Perspective divide**: divide by $w$ to get final screen coordinates.

### Pen & paper: Simple perspective

Camera at origin, screen at $z = d$.  A point $(x, y, z)$ projects to:

$$x_{\text{screen}} = \frac{d \cdot x}{z}, \quad y_{\text{screen}} = \frac{d \cdot y}{z}$$

**Example:** Point $(3, 4, 10)$ with screen distance $d = 5$:

$x_s = 5 \times 3/10 = 1.5$, $y_s = 5 \times 4/10 = 2.0$

Point $(3, 4, 20)$ (twice as far):

$x_s = 5 \times 3/20 = 0.75$, $y_s = 5 \times 4/20 = 1.0$

Farther → smaller. ✓

### The full MVP pipeline

$$\mathbf{p}_{\text{clip}} = \mathbf{P} \cdot \mathbf{V} \cdot \mathbf{M} \cdot \mathbf{p}_{\text{local}}$$

1. **Model** matrix: local → world space
2. **View** matrix: world → camera space
3. **Projection** matrix: camera → clip space
4. **Perspective divide**: clip → NDC (normalised device coordinates)
5. **Viewport transform**: NDC → pixel coordinates

## Python Verification

```python
# ── Projection ──────────────────────────────────────────────
import math

# Simple perspective: project (x,y,z) to screen at z=d
def project(x, y, z, d=5):
    return (d * x / z, d * y / z)

print("=== Simple perspective projection ===")
for point in [(3, 4, 10), (3, 4, 20), (3, 4, 5)]:
    xs, ys = project(*point)
    print(f"  {point} → screen ({xs:.2f}, {ys:.2f})")

# Foreshortening: parallel lines converge
print(f"\n=== Railroad tracks (parallel lines converging) ===")
for z in [5, 10, 20, 50, 100]:
    left = project(-2, 0, z)
    right = project(2, 0, z)
    width = right[0] - left[0]
    print(f"  z={z:3d}: screen width = {width:.2f}")

# Perspective matrix
print(f"\n=== Perspective matrix ===")
fov = math.radians(60)
aspect = 16/9
near, far = 0.1, 100

f_val = 1 / math.tan(fov / 2)
P = [
    [f_val/aspect, 0, 0, 0],
    [0, f_val, 0, 0],
    [0, 0, -(far+near)/(far-near), -2*far*near/(far-near)],
    [0, 0, -1, 0],
]
print(f"FOV={math.degrees(fov)}°, aspect={aspect:.2f}")
for row in P:
    print(f"  [{', '.join(f'{v:8.4f}' for v in row)}]")

# Apply to a point
point = [2, 3, -10, 1]  # 10 units in front of camera (negative z = in front)
clip = [sum(P[i][j]*point[j] for j in range(4)) for i in range(4)]
ndc = [clip[i]/clip[3] for i in range(3)]  # perspective divide
print(f"\n  Point {point[:3]} → clip {[f'{c:.3f}' for c in clip]} → NDC ({ndc[0]:.3f}, {ndc[1]:.3f})")
```

## Connection to CS / Games / AI

- **Every 3D game** — uses perspective projection for the main camera
- **Minimap/HUD** — uses orthographic projection
- **Shadow mapping** — directional lights use orthographic, point lights use perspective
- **Depth buffer** — z-values from projection matrix enable depth testing

## Check Your Understanding

1. **Pen & paper:** Project $(6, 8, 12)$ onto a screen at $d = 3$.
2. **Pen & paper:** Two objects at the same $(x, y)$ but different $z$. Which appears larger on screen?
3. **Think about it:** Why does the perspective matrix have $-1$ in the bottom row instead of $1$?
