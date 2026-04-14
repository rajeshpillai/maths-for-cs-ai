# Projection — Orthographic vs Perspective

## Intuition

Projection maps 3D space onto a 2D screen.  **Orthographic** preserves
parallel lines (used in CAD, top-down games).  **Perspective** makes distant
objects smaller (realistic, used in FPS games).  Both are 4×4 matrix
multiplications in homogeneous coordinates.

## Prerequisites

- Tier 8, Lesson 6: Homogeneous Coordinates

## From First Principles

### Orthographic projection (derivation)

We want to map the view box $[l,r] \times [b,t] \times [n,f]$ to the normalised cube $[-1,1]^3$.

**Step 1: Translate the centre of the box to the origin.**

The centre is $\left(\frac{r+l}{2}, \frac{t+b}{2}, \frac{f+n}{2}\right)$. Subtract it:

$$\mathbf{T} = \begin{pmatrix} 1 & 0 & 0 & -\frac{r+l}{2} \\ 0 & 1 & 0 & -\frac{t+b}{2} \\ 0 & 0 & 1 & -\frac{f+n}{2} \\ 0 & 0 & 0 & 1 \end{pmatrix}$$

**Step 2: Scale each axis so the box fits in $[-1,1]^3$.**

The box has width $r-l$, height $t-b$, depth $f-n$. Scale each by $2/\text{extent}$:

$$\mathbf{S} = \begin{pmatrix} \frac{2}{r-l} & 0 & 0 & 0 \\ 0 & \frac{2}{t-b} & 0 & 0 \\ 0 & 0 & \frac{-2}{f-n} & 0 \\ 0 & 0 & 0 & 1 \end{pmatrix}$$

(The z-axis is negated because we look down $-z$ in OpenGL convention.)

**Combine:** $\mathbf{P}_{\text{ortho}} = \mathbf{S} \cdot \mathbf{T}$:

$$\mathbf{P}_{\text{ortho}} = \begin{pmatrix} \frac{2}{r-l} & 0 & 0 & -\frac{r+l}{r-l} \\ 0 & \frac{2}{t-b} & 0 & -\frac{t+b}{t-b} \\ 0 & 0 & \frac{-2}{f-n} & -\frac{f+n}{f-n} \\ 0 & 0 & 0 & 1 \end{pmatrix}$$

Simply scales and translates — no foreshortening.

### Perspective projection (derivation)

**Step 1: The fundamental idea.** A point at $(x, y, z)$ should project to the
screen as if viewed from the origin. By similar triangles with the near plane
at distance $n$:

$$x_{\text{proj}} = \frac{n \cdot x}{-z}, \quad y_{\text{proj}} = \frac{n \cdot y}{-z}$$

(We divide by $-z$ because the camera looks down $-z$.)

**Step 2: Express this as a matrix multiply + perspective divide.**

We need a matrix that produces $(x', y', z', w')$ where $x'/w' = nx/(-z)$.
Set $w' = -z$, then $x' = nx$ gives $x'/w' = nx/(-z)$. Similarly $y' = ny$.

$$\begin{pmatrix} n & 0 & 0 & 0 \\ 0 & n & 0 & 0 \\ ? & ? & ? & ? \\ 0 & 0 & -1 & 0 \end{pmatrix}$$

The bottom row $[0, 0, -1, 0]$ gives $w' = -z$.

**Step 3: Determine the z-row.** We need $z$ to map to $[-1, 1]$ after the
perspective divide. The constraints are: $z = -n \to -1$ and $z = -f \to +1$.
Solving for $A, B$ in $z_{\text{ndc}} = (Az + B) / (-z)$:

$-n \to -1$: $(A(-n) + B) / n = -1$ → $-An + B = -n$ → $B = An - n$

$-f \to +1$: $(A(-f) + B) / f = 1$ → $-Af + B = f$ → $B = Af + f$

Setting equal: $An - n = Af + f$ → $A(n-f) = f+n$ → $A = -(f+n)/(f-n)$

$B = An - n = -n(f+n)/(f-n) - n = -2fn/(f-n)$

**Step 4: Incorporate field-of-view.** The FOV angle $\theta$ determines how
much of the scene the near plane captures. At the near plane, the visible
height is $2n\tan(\theta/2)$. To map this to $[-1,1]$, replace $n$ in the
top rows with $1/\tan(\theta/2)$ and adjust for aspect ratio $a$:

$$\mathbf{P}_{\text{persp}} = \begin{pmatrix} \frac{1}{a\tan(\theta/2)} & 0 & 0 & 0 \\ 0 & \frac{1}{\tan(\theta/2)} & 0 & 0 \\ 0 & 0 & \frac{-(f+n)}{f-n} & \frac{-2fn}{f-n} \\ 0 & 0 & -1 & 0 \end{pmatrix}$$

After multiplying, the result has $w \ne 1$.  **Perspective divide**: divide $(x', y', z')$ by $w'$ to get final NDC coordinates.

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

### Visualisation: parallel lines converging under perspective

```python
# ── Perspective: parallel lines converge ───────────────────
import matplotlib.pyplot as plt

def project(x, y, z, d=5):
    """Simple perspective: project onto screen at z=d."""
    return (d * x / z, d * y / z)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

# Left: top-down view (orthographic — shows true parallel lines)
z_vals = range(5, 55, 5)
ax1.set_title("Top-down (orthographic): parallel lines stay parallel")
for z in z_vals:
    ax1.plot([-2, 2], [z, z], 'b-', alpha=0.3)  # cross ties
ax1.plot([-2, -2], [5, 50], 'r-', linewidth=2, label='Left rail')
ax1.plot([2, 2], [5, 50], 'r-', linewidth=2, label='Right rail')
ax1.set_xlabel('x')
ax1.set_ylabel('z (depth)')
ax1.legend()
ax1.set_aspect('equal')
ax1.grid(True, alpha=0.3)

# Right: perspective projection (lines converge to vanishing point)
ax2.set_title("Perspective: parallel lines converge")
d = 5
for z in z_vals:
    lx, ly = project(-2, 0, z, d)
    rx, ry = project(2, 0, z, d)
    ax2.plot([lx, rx], [z, z], 'b-', alpha=0.3)  # cross ties (at screen y=0)
    # Actually project the y-coord too for proper perspective
    ax2.plot([lx, rx], [project(0, -0.5, z, d)[1]]*2, 'b-', alpha=0.3)

left_xs = [project(-2, 0, z, d)[0] for z in range(5, 51)]
right_xs = [project(2, 0, z, d)[0] for z in range(5, 51)]
ax2.plot(left_xs, range(5, 51), 'r-', linewidth=2, label='Left rail (projected)')
ax2.plot(right_xs, range(5, 51), 'r-', linewidth=2, label='Right rail (projected)')
ax2.axvline(0, color='gray', linestyle=':', alpha=0.5, label='Vanishing point')
ax2.set_xlabel('Screen x')
ax2.set_ylabel('z (depth)')
ax2.legend(fontsize=8)
ax2.grid(True, alpha=0.3)

plt.suptitle('Orthographic vs Perspective Projection', fontsize=13)
plt.tight_layout()
plt.show()
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
