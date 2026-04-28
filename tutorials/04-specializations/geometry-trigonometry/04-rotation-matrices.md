# 2D and 3D Rotation Matrices — Derived from Trigonometry

## Intuition

Rotating a point around the origin is a linear transformation — so it can be
represented as a matrix.  In 2D, one angle gives one matrix.  In 3D, you
rotate around an axis (x, y, or z), and composing these gives any rotation.

## Prerequisites

- Tier 8, Lesson 2: Sine, Cosine, Tangent
- Tier 2, Lesson 5: Linear Transformations

## From First Principles

### 2D rotation (derivation)

A point $(x, y)$ at angle $\alpha$ from the x-axis, distance $r$ from origin:

$x = r\cos\alpha$, $y = r\sin\alpha$

Rotate by $\theta$. New angle = $\alpha + \theta$:

$x' = r\cos(\alpha + \theta) = r(\cos\alpha\cos\theta - \sin\alpha\sin\theta) = x\cos\theta - y\sin\theta$

$y' = r\sin(\alpha + \theta) = r(\sin\alpha\cos\theta + \cos\alpha\sin\theta) = x\sin\theta + y\cos\theta$

In matrix form:

$$\mathbf{R}(\theta) = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$$

### Pen & paper: Rotate (1, 0) by 90°

$$\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}\begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$$ ✓

### Properties

- $\det(\mathbf{R}) = \cos^2\theta + \sin^2\theta = 1$ (preserves area)
- $\mathbf{R}^{-1} = \mathbf{R}^T = \mathbf{R}(-\theta)$ (orthogonal matrix)
- $\mathbf{R}(\alpha)\mathbf{R}(\beta) = \mathbf{R}(\alpha + \beta)$ (rotations compose by adding angles)

### 3D rotation matrices (derived from trig)

The idea: rotating around one axis leaves that axis unchanged and performs a
2D rotation in the plane of the other two axes.

**Around z-axis (x and y rotate, z stays):**

The z-component is unchanged: $z' = z$. In the $xy$-plane, apply the 2D
rotation formula to $x, y$:

$x' = x\cos\theta - y\sin\theta$
$y' = x\sin\theta + y\cos\theta$

$$\mathbf{R}_z(\theta) = \begin{pmatrix} \cos\theta & -\sin\theta & 0 \\ \sin\theta & \cos\theta & 0 \\ 0 & 0 & 1 \end{pmatrix}$$

**Around x-axis (y and z rotate, x stays):**

$x' = x$ (unchanged). In the $yz$-plane, apply the 2D rotation to $y, z$:

$y' = y\cos\theta - z\sin\theta$
$z' = y\sin\theta + z\cos\theta$

$$\mathbf{R}_x(\theta) = \begin{pmatrix} 1 & 0 & 0 \\ 0 & \cos\theta & -\sin\theta \\ 0 & \sin\theta & \cos\theta \end{pmatrix}$$

**Around y-axis (x and z rotate, y stays):**

$y' = y$ (unchanged). In the $xz$-plane, apply the 2D rotation to $z, x$
(note the cyclic order $x \to y \to z \to x$, which gives the sign pattern):

$x' = x\cos\theta + z\sin\theta$
$z' = -x\sin\theta + z\cos\theta$

$$\mathbf{R}_y(\theta) = \begin{pmatrix} \cos\theta & 0 & \sin\theta \\ 0 & 1 & 0 \\ -\sin\theta & 0 & \cos\theta \end{pmatrix}$$

The $\sin\theta$ sign flip in $\mathbf{R}_y$ compared to the others comes from
maintaining a right-handed coordinate system (the cyclic order is $z \to x$,
not $x \to z$).

### Pen & paper: Rotate (1, 0, 0) by 90° around z-axis

$$\mathbf{R}_z(90°)\begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}$$

The x-axis maps to the y-axis. ✓

### Euler angles and gimbal lock

Any 3D rotation can be decomposed into three rotations: $\mathbf{R} = \mathbf{R}_z(\gamma)\mathbf{R}_y(\beta)\mathbf{R}_x(\alpha)$

**Gimbal lock:** When $\beta = \pm 90°$, two axes align and you lose a degree of freedom.  This is why quaternions are preferred (Lesson 5).

## Python Verification

```python
# ── Rotation Matrices ───────────────────────────────────────
import math

def rot2d(theta):
    c, s = math.cos(theta), math.sin(theta)
    return [[c, -s], [s, c]]

def mat_vec(M, v):
    return [sum(M[i][j]*v[j] for j in range(len(v))) for i in range(len(M))]

# 2D rotation
print("=== 2D Rotation ===")
for deg in [0, 45, 90, 180]:
    R = rot2d(math.radians(deg))
    p = mat_vec(R, [1, 0])
    print(f"  Rotate (1,0) by {deg}°: ({p[0]:.3f}, {p[1]:.3f})")

# Verify: R^T = R^{-1}
print(f"\n=== R·R^T = I ===")
R = rot2d(math.radians(30))
RT = [[R[0][0], R[1][0]], [R[0][1], R[1][1]]]
prod = [[sum(R[i][k]*RT[k][j] for k in range(2)) for j in range(2)] for i in range(2)]
print(f"  R(30°)·R(30°)^T = {[[round(v,6) for v in row] for row in prod]}")

# Rotation composition: R(a)·R(b) = R(a+b)
print(f"\n=== Composition: R(30°)·R(60°) = R(90°) ===")
R30 = rot2d(math.radians(30))
R60 = rot2d(math.radians(60))
R90 = [[sum(R30[i][k]*R60[k][j] for k in range(2)) for j in range(2)] for i in range(2)]
R90_direct = rot2d(math.radians(90))
print(f"  Composed: {[[round(v,4) for v in row] for row in R90]}")
print(f"  Direct:   {[[round(v,4) for v in row] for row in R90_direct]}")

# 3D: rotate around z-axis
print(f"\n=== 3D: Rotate (1,0,0) around z by 90° ===")
theta = math.radians(90)
c, s = math.cos(theta), math.sin(theta)
Rz = [[c, -s, 0], [s, c, 0], [0, 0, 1]]
result = mat_vec(Rz, [1, 0, 0])
print(f"  Result: ({result[0]:.3f}, {result[1]:.3f}, {result[2]:.3f})")
```

### Gimbal lock: concrete demonstration

When pitch ($\beta$) = 90°, $\cos\beta = 0$ and $\sin\beta = 1$. The combined
matrix $\mathbf{R} = \mathbf{R}_z(\gamma)\mathbf{R}_y(90°)\mathbf{R}_x(\alpha)$ becomes:

$$\mathbf{R}_y(90°) = \begin{pmatrix} 0 & 0 & 1 \\ 0 & 1 & 0 \\ -1 & 0 & 0 \end{pmatrix}$$

Multiplying out $\mathbf{R}_z(\gamma)\mathbf{R}_y(90°)\mathbf{R}_x(\alpha)$:

$$= \begin{pmatrix} 0 & \sin(\alpha - \gamma) & \cos(\alpha - \gamma) \\ 0 & \cos(\alpha - \gamma) & -\sin(\alpha - \gamma) \\ -1 & 0 & 0 \end{pmatrix}$$

Only $(\alpha - \gamma)$ appears — not $\alpha$ and $\gamma$ independently.
Changing yaw ($\gamma$) by +10° has the same effect as changing roll ($\alpha$)
by -10°. One degree of freedom is lost: you cannot yaw and roll independently.

**Pen & paper:** Set $\alpha = 30°, \gamma = 0°$ and $\alpha = 0°, \gamma = -30°$ —
both produce the same rotation matrix (verify the formula above). This is
gimbal lock in action.

### Visualisation: 2D rotation of a square

```python
# ── Visualise 2D rotation of a unit square ─────────────────
import matplotlib.pyplot as plt
import math

def rot2d(theta):
    c, s = math.cos(theta), math.sin(theta)
    return [[c, -s], [s, c]]

def apply_rot(R, points):
    return [[R[0][0]*x + R[0][1]*y, R[1][0]*x + R[1][1]*y] for x, y in points]

# Unit square vertices (closed path)
square = [(0,0), (1,0), (1,1), (0,1), (0,0)]

fig, axes = plt.subplots(1, 3, figsize=(12, 4))
angles = [0, 45, 90]

for ax, deg in zip(axes, angles):
    R = rot2d(math.radians(deg))
    rotated = apply_rot(R, square)

    # Original
    xs, ys = zip(*square)
    ax.plot(xs, ys, 'b--', alpha=0.4, label='Original')
    ax.fill(xs, ys, alpha=0.1, color='blue')

    # Rotated
    rxs, rys = zip(*rotated)
    ax.plot(rxs, rys, 'r-', linewidth=2, label=f'Rotated {deg}°')
    ax.fill(rxs, rys, alpha=0.2, color='red')

    ax.set_xlim(-1.5, 1.5)
    ax.set_ylim(-1.0, 1.5)
    ax.set_aspect('equal')
    ax.axhline(0, color='k', linewidth=0.5)
    ax.axvline(0, color='k', linewidth=0.5)
    ax.legend(fontsize=8)
    ax.set_title(f'θ = {deg}°')
    ax.grid(True, alpha=0.3)

plt.suptitle('2D Rotation of a Unit Square', fontsize=13)
plt.tight_layout()
plt.show()
```

## Connection to CS / Games / AI / Business / Industry

- **Sprite rotation** — 2D rotation matrix applied to each vertex
- **3D cameras** — view matrix is a rotation + translation
- **Character controllers** — rotate facing direction by player input angle
- **Data augmentation** — random rotation of training images
- **Robotics** — joint angles produce rotation matrices for each link

## Check Your Understanding

1. **Pen & paper:** Rotate the point $(3, 1)$ by 45° around the origin.
2. **Pen & paper:** Show that $\mathbf{R}(60°)\mathbf{R}(30°) = \mathbf{R}(90°)$ by multiplying the matrices.
3. **Pen & paper:** In 3D, rotate $(0, 1, 0)$ by 90° around the x-axis. What is the result?
