# Homogeneous Coordinates and 4×4 Transform Matrices

## Intuition

Translation is not a linear transformation — you can't represent it as a
matrix multiply in regular coordinates.  The trick: add an extra coordinate
(w=1), and suddenly translation, rotation, and scaling all become 4×4 matrix
multiplications.  This is the foundation of every 3D graphics pipeline.

## Prerequisites

- Tier 8, Lesson 4: Rotation Matrices
- Tier 2, Lesson 5: Linear Transformations

## From First Principles

### The problem with translation

Rotation and scaling are linear: $\mathbf{y} = \mathbf{Mx}$.

Translation is **affine**: $\mathbf{y} = \mathbf{Mx} + \mathbf{t}$.  No matrix for that.

### Homogeneous coordinates

Represent 3D point $(x, y, z)$ as $(x, y, z, 1)$.

Now a 4×4 matrix can encode translation:

$$\begin{pmatrix} 1 & 0 & 0 & t_x \\ 0 & 1 & 0 & t_y \\ 0 & 0 & 1 & t_z \\ 0 & 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} x \\ y \\ z \\ 1 \end{pmatrix} = \begin{pmatrix} x + t_x \\ y + t_y \\ z + t_z \\ 1 \end{pmatrix}$$

### Pen & paper: Translate (2, 3, 1) by (5, -1, 2)

$$\begin{pmatrix} 1 & 0 & 0 & 5 \\ 0 & 1 & 0 & -1 \\ 0 & 0 & 1 & 2 \\ 0 & 0 & 0 & 1 \end{pmatrix} \begin{pmatrix} 2 \\ 3 \\ 1 \\ 1 \end{pmatrix} = \begin{pmatrix} 7 \\ 2 \\ 3 \\ 1 \end{pmatrix}$$

### Combined transforms

Scale → Rotate → Translate: $\mathbf{M} = \mathbf{T} \cdot \mathbf{R} \cdot \mathbf{S}$

Apply right-to-left: scale first, then rotate, then translate.

### The 4×4 structure

$$\begin{pmatrix} \mathbf{R}_{3\times3} & \mathbf{t}_{3\times1} \\ \mathbf{0}_{1\times3} & 1 \end{pmatrix}$$

Upper-left 3×3: rotation + scale.  Right column: translation.  Bottom row: $(0, 0, 0, 1)$.

## Python Verification

```python
# ── Homogeneous Coordinates ─────────────────────────────────
import math

def mat4_mul(A, B):
    """4×4 matrix multiply."""
    return [[sum(A[i][k]*B[k][j] for k in range(4)) for j in range(4)] for i in range(4)]

def mat4_vec(M, v):
    """4×4 matrix × 4-vector."""
    return [sum(M[i][j]*v[j] for j in range(4)) for i in range(4)]

def translation(tx, ty, tz):
    return [[1,0,0,tx],[0,1,0,ty],[0,0,1,tz],[0,0,0,1]]

def scale(sx, sy, sz):
    return [[sx,0,0,0],[0,sy,0,0],[0,0,sz,0],[0,0,0,1]]

def rotation_z(theta):
    c, s = math.cos(theta), math.sin(theta)
    return [[c,-s,0,0],[s,c,0,0],[0,0,1,0],[0,0,0,1]]

# Translate
print("=== Translation ===")
T = translation(5, -1, 2)
p = [2, 3, 1, 1]
result = mat4_vec(T, p)
print(f"Translate (2,3,1) by (5,-1,2): ({result[0]},{result[1]},{result[2]})")

# Scale then Rotate then Translate
print(f"\n=== Combined: Scale(2) → Rotate(90°z) → Translate(10,0,0) ===")
S = scale(2, 2, 2)
R = rotation_z(math.radians(90))
Tr = translation(10, 0, 0)
M = mat4_mul(Tr, mat4_mul(R, S))

point = [1, 0, 0, 1]
result = mat4_vec(M, point)
print(f"(1,0,0) → ({result[0]:.2f}, {result[1]:.2f}, {result[2]:.2f})")
print("  Scale by 2 → (2,0,0)")
print("  Rotate 90° → (0,2,0)")
print("  Translate +10x → (10,2,0)")

# Inverse of translation
print(f"\n=== Inverse: undo translation ===")
T_inv = translation(-5, 1, -2)
original = mat4_vec(T_inv, result)
print(f"Undo: ({original[0]:.0f}, {original[1]:.0f}, {original[2]:.0f})")
```

## Connection to CS / Games / AI

- **Model matrix** — positions objects in the world (scale → rotate → translate)
- **View matrix** — transforms world into camera space (inverse of camera's model matrix)
- **Projection matrix** — 3D to 2D (perspective or orthographic, next lessons)
- **GPU pipeline** — vertex shader multiplies each vertex by MVP = Model × View × Projection

## Check Your Understanding

1. **Pen & paper:** Write the 4×4 matrix that scales by 3 in all dimensions then translates by $(1, 2, 3)$.
2. **Pen & paper:** Apply the matrix from Q1 to the point $(1, 0, 0)$.
3. **Think about it:** Why is the order Scale→Rotate→Translate the standard, and not Translate→Rotate→Scale?
