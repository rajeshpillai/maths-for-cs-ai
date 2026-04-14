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

### NxN Determinants: Laplace Expansion (Cofactor Expansion)

The 3x3 formula above is actually a **special case** of a general method that
works for any $n \times n$ matrix.

**Definition:** For an $n \times n$ matrix $\mathbf{A}$, the **minor** $M_{ij}$
is the determinant of the $(n-1) \times (n-1)$ submatrix obtained by deleting
row $i$ and column $j$.

**Cofactor:** $C_{ij} = (-1)^{i+j} M_{ij}$

The sign factor $(-1)^{i+j}$ follows a **checkerboard pattern**:

$$\begin{pmatrix} + & - & + & - & \cdots \\ - & + & - & + & \cdots \\ + & - & + & - & \cdots \\ \vdots & & & & \ddots \end{pmatrix}$$

**Laplace expansion along row $i$:**

$$\det(\mathbf{A}) = \sum_{j=1}^{n} (-1)^{i+j} a_{ij} M_{ij} = \sum_{j=1}^{n} a_{ij} C_{ij}$$

You can expand along **any** row or column — the result is always the same.
Choose the row or column with the most zeros to minimise work.

**Pen & paper: 3x3 example by cofactor expansion along row 1**

$$\mathbf{A} = \begin{pmatrix} 2 & 0 & 1 \\ 3 & 1 & 0 \\ -1 & 2 & 3 \end{pmatrix}$$

Expand along row 1 ($i = 1$):

$\det(\mathbf{A}) = a_{11} C_{11} + a_{12} C_{12} + a_{13} C_{13}$

Signs from checkerboard: $+, -, +$

$= (+1)(2) \det\begin{pmatrix} 1 & 0 \\ 2 & 3 \end{pmatrix} + (-1)(0) \det\begin{pmatrix} 3 & 0 \\ -1 & 3 \end{pmatrix} + (+1)(1) \det\begin{pmatrix} 3 & 1 \\ -1 & 2 \end{pmatrix}$

$= 2(1 \cdot 3 - 0 \cdot 2) - 0(3 \cdot 3 - 0 \cdot (-1)) + 1(3 \cdot 2 - 1 \cdot (-1))$

$= 2(3) - 0(9) + 1(7)$

$= 6 + 0 + 7 = 13$

**Tip:** Notice that $a_{12} = 0$, so the second term vanishes entirely. This is
why expanding along a row or column with zeros saves computation.

**Pen & paper: Expand the same matrix along column 2 (has a zero)**

$\det(\mathbf{A}) = a_{12} C_{12} + a_{22} C_{22} + a_{32} C_{32}$

Signs for column 2: $-, +, -$

$= (-1)(0) \det\begin{pmatrix} 3 & 0 \\ -1 & 3 \end{pmatrix} + (+1)(1) \det\begin{pmatrix} 2 & 1 \\ -1 & 3 \end{pmatrix} + (-1)(2) \det\begin{pmatrix} 2 & 1 \\ 3 & 0 \end{pmatrix}$

$= 0 + 1(6 - (-1)) - 2(0 - 3)$

$= 0 + 7 + 6 = 13$ ✓

Same answer regardless of which row or column we expand along.

### Properties of Determinants Under Row Operations

These properties let you simplify a matrix **before** computing its determinant,
which is far more efficient than brute-force expansion for large matrices.

| Row operation | Effect on det |
|---------------|---------------|
| Swap two rows | Multiplies det by $-1$ |
| Multiply a row by scalar $k$ | Multiplies det by $k$ |
| Add a multiple of one row to another | Det **unchanged** |

Two additional key properties:

- **Product rule:** $\det(\mathbf{AB}) = \det(\mathbf{A})\det(\mathbf{B})$
- **Transpose rule:** $\det(\mathbf{A}^T) = \det(\mathbf{A})$

**Pen & paper: Verify all properties with a concrete 3x3 matrix**

Use $\mathbf{A} = \begin{pmatrix} 2 & 0 & 1 \\ 3 & 1 & 0 \\ -1 & 2 & 3 \end{pmatrix}$, which we already know has $\det(\mathbf{A}) = 13$.

**Property 1 — Row swap ($\det$ negates):**

Swap $R_1$ and $R_2$: $\mathbf{A'} = \begin{pmatrix} 3 & 1 & 0 \\ 2 & 0 & 1 \\ -1 & 2 & 3 \end{pmatrix}$

Expand along row 1:

$= 3(0 \cdot 3 - 1 \cdot 2) - 1(2 \cdot 3 - 1 \cdot (-1)) + 0(\ldots)$

$= 3(-2) - 1(7) + 0 = -6 - 7 = -13$ ✓ (sign flipped)

**Property 2 — Row scaling ($\det$ scales by $k$):**

Multiply $R_1$ by 4: $\begin{pmatrix} 8 & 0 & 4 \\ 3 & 1 & 0 \\ -1 & 2 & 3 \end{pmatrix}$

Expected: $4 \times 13 = 52$.

Expand along row 1: $= 8(3) - 0(\ldots) + 4(6 - (-1)) = 24 + 28 = 52$ ✓

**Property 3 — Adding a row multiple (det unchanged):**

$R_2 \leftarrow R_2 + 2R_1$: $\begin{pmatrix} 2 & 0 & 1 \\ 7 & 1 & 2 \\ -1 & 2 & 3 \end{pmatrix}$

Expand along column 2 (the zero helps):

$= -(0)(\ldots) + (1)(2 \cdot 3 - 2 \cdot (-1)) - (2)(2 \cdot 2 - 1 \cdot 7)$

$= 0 + 1(6 + 2) - 2(4 - 7)$

$= 8 - 2(-3) = 8 + 6 = 14$

Hmm — let's be careful and expand fully. Expand along row 1:

$= 2(1 \cdot 3 - 2 \cdot 2) - 0(\ldots) + 1(7 \cdot 2 - 1 \cdot (-1))$

$= 2(3 - 4) + 1(14 + 1)$

$= 2(-1) + 15 = -2 + 15 = 13$ ✓ (det unchanged)

**Property 4 — Product rule:**

Let $\mathbf{B} = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 3 \end{pmatrix}$ (diagonal, so $\det(\mathbf{B}) = 1 \cdot 2 \cdot 3 = 6$)

$\det(\mathbf{AB})$ should equal $13 \times 6 = 78$. (Verify in the Python code below.)

**Property 5 — Transpose rule:**

$\mathbf{A}^T = \begin{pmatrix} 2 & 3 & -1 \\ 0 & 1 & 2 \\ 1 & 0 & 3 \end{pmatrix}$

Expand along column 1 (two zeros in column 2 of $\mathbf{A}^T$, but let's use row 2 which has a zero):

$= -(0)(\ldots) + (1)(2 \cdot 3 - (-1)(1)) - (2)(2 \cdot 0 - 3 \cdot 1)$

$= 0 + 1(6 + 1) - 2(0 - 3)$

$= 7 + 6 = 13$ ✓ (same as $\det(\mathbf{A})$)

## Check Your Understanding

1. **Pen & paper:** Compute $\det\begin{pmatrix} 5 & 3 \\ -2 & 4 \end{pmatrix}$.  Is this matrix invertible?
2. **Pen & paper:** Compute $\det\begin{pmatrix} 2 & 0 & 1 \\ 3 & 1 & 0 \\ -1 & 2 & 3 \end{pmatrix}$ using cofactor expansion along the first row.
3. **Pen & paper:** If $\det(\mathbf{A}) = 5$, what is $\det(3\mathbf{A})$ for a $2 \times 2$ matrix?
4. **Think about it:** Why does a matrix with two identical rows have determinant 0?
