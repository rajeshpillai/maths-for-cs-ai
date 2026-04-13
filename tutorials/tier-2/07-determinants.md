# Determinants — Geometric Meaning

## Intuition

The determinant tells you **how much a transformation scales area (or volume)**.
A 2×2 matrix with determinant 3 triples all areas.  A determinant of 0 means
the transformation collapses space into a lower dimension — a 2D region
squished into a line.  A negative determinant means the transformation flips
orientation (like a mirror).

## Prerequisites

- Tier 2, Lesson 5: Linear Transformations
- Tier 2, Lesson 6: Identity, Inverse, Transpose

## From First Principles

### 2×2 determinant

$$\det\begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad - bc$$

**Geometric meaning:** The signed area of the parallelogram formed by the
column vectors $\begin{pmatrix} a \\ c \end{pmatrix}$ and $\begin{pmatrix} b \\ d \end{pmatrix}$.

**Pen & paper:**

$$\det\begin{pmatrix} 3 & 1 \\ 0 & 2 \end{pmatrix} = 3(2) - 1(0) = 6$$

The unit square (area 1) maps to a parallelogram with area 6.

### Sign matters

- $\det > 0$: orientation preserved (right-hand rule stays right-hand)
- $\det < 0$: orientation flipped (like a mirror reflection)
- $\det = 0$: collapsed dimension — **not invertible**

**Pen & paper:**

Reflection across y-axis: $\det\begin{pmatrix} -1 & 0 \\ 0 & 1 \end{pmatrix} = -1$ (flips orientation ✓)

### 3×3 determinant (cofactor expansion)

$$\det\begin{pmatrix} a & b & c \\ d & e & f \\ g & h & i \end{pmatrix} = a(ei - fh) - b(di - fg) + c(dh - eg)$$

**Pen & paper:**

$$\det\begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix}$$

$= 1(5 \cdot 9 - 6 \cdot 8) - 2(4 \cdot 9 - 6 \cdot 7) + 3(4 \cdot 8 - 5 \cdot 7)$
$= 1(45 - 48) - 2(36 - 42) + 3(32 - 35)$
$= 1(-3) - 2(-6) + 3(-3)$
$= -3 + 12 - 9 = 0$

Determinant is 0 — this matrix is **singular** (the rows are linearly dependent: $R_3 = 2R_2 - R_1$, which you can verify: $2(4,5,6) - (1,2,3) = (7,8,9)$).

### Properties of determinants

| Property | Formula |
|----------|---------|
| Product | $\det(\mathbf{AB}) = \det(\mathbf{A})\det(\mathbf{B})$ |
| Transpose | $\det(\mathbf{A}^T) = \det(\mathbf{A})$ |
| Inverse | $\det(\mathbf{A}^{-1}) = 1/\det(\mathbf{A})$ |
| Scalar | $\det(c\mathbf{A}) = c^n \det(\mathbf{A})$ for $n \times n$ matrix |
| Row swap | Swapping two rows negates the determinant |
| Row scaling | Scaling a row by $c$ multiplies det by $c$ |
| Row addition | Adding a multiple of one row to another doesn't change det |

**Pen & paper:** $\det(\mathbf{A}) = 3$, $\det(\mathbf{B}) = 4$.

$\det(\mathbf{AB}) = 12$, $\det(\mathbf{A}^{-1}) = 1/3$, $\det(2\mathbf{A}) = 2^n \times 3$ (for $n \times n$).

### Using row operations to compute determinants

**Pen & paper:** Compute $\det\begin{pmatrix} 2 & 4 \\ 1 & 5 \end{pmatrix}$

Method 1: Formula: $2(5) - 4(1) = 6$

Method 2: Row reduce:
$R_2 \leftarrow R_2 - \frac{1}{2}R_1$: $\begin{pmatrix} 2 & 4 \\ 0 & 3 \end{pmatrix}$

For upper triangular matrices, $\det$ = product of diagonal: $2 \times 3 = 6$ ✓

## Python Verification

```python
# ── Determinants: verifying pen & paper work ────────────────
import numpy as np

# 2x2 determinant
A = np.array([[3, 1], [0, 2]])
print("=== 2×2 determinant ===")
print(f"det = {np.linalg.det(A):.0f}")  # 6

# Negative determinant (reflection)
R = np.array([[-1, 0], [0, 1]])
print(f"\n=== Reflection det ===")
print(f"det = {np.linalg.det(R):.0f}")  # -1

# 3x3 determinant
B = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(f"\n=== 3×3 determinant ===")
print(f"det = {np.linalg.det(B):.6f}")  # ~0 (singular)

# Non-singular 3x3
C = np.array([[1, 2, 3], [0, 1, 4], [5, 6, 0]])
print(f"\n=== Non-singular 3×3 ===")
print(f"det = {np.linalg.det(C):.0f}")

# Product property: det(AB) = det(A) * det(B)
print(f"\n=== Product property ===")
X = np.array([[2, 1], [3, 4]])
Y = np.array([[1, 5], [2, 3]])
print(f"det(X) = {np.linalg.det(X):.0f}")
print(f"det(Y) = {np.linalg.det(Y):.0f}")
print(f"det(XY) = {np.linalg.det(X @ Y):.0f}")
print(f"det(X)*det(Y) = {np.linalg.det(X) * np.linalg.det(Y):.0f}")

# Geometric: area scaling
print(f"\n=== Area scaling ===")
# Unit square corners: (0,0), (1,0), (0,1), (1,1)
M = np.array([[3, 1], [0, 2]])
corners = np.array([[0,0], [1,0], [0,1], [1,1]])
transformed = (M @ corners.T).T
print(f"Original unit square area: 1")
print(f"det(M) = {np.linalg.det(M):.0f} → transformed area = {abs(np.linalg.det(M)):.0f}")
```

## Connection to CS / Games / AI

- **Invertibility test** — $\det = 0$ means the system has no unique solution
- **Volume scaling** — change of variables in integration (Jacobian determinant)
- **Orientation** — game physics: detecting if a triangle is front-facing or back-facing
- **Cramer's rule** — solving small linear systems using determinants
- **Eigenvalue computation** — eigenvalues satisfy $\det(\mathbf{A} - \lambda\mathbf{I}) = 0$

## Check Your Understanding

1. **Pen & paper:** Compute $\det\begin{pmatrix} 5 & 3 \\ -2 & 4 \end{pmatrix}$.  Is this matrix invertible?
2. **Pen & paper:** Compute $\det\begin{pmatrix} 2 & 0 & 1 \\ 3 & 1 & 0 \\ -1 & 2 & 3 \end{pmatrix}$ using cofactor expansion along the first row.
3. **Pen & paper:** If $\det(\mathbf{A}) = 5$, what is $\det(3\mathbf{A})$ for a $2 \times 2$ matrix?
4. **Think about it:** Why does a matrix with two identical rows have determinant 0?
