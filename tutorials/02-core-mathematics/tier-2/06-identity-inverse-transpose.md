# Identity, Inverse, and Transpose

## Intuition

The **identity matrix** is the "do nothing" transformation — multiply anything
by it and nothing changes.  The **inverse** undoes a transformation.  The
**transpose** swaps rows and columns.  These three operations are the basic
toolkit for manipulating matrices by hand and understanding what matrices do.

## Prerequisites

- Tier 2, Lesson 4: Matrix Multiplication
- Tier 2, Lesson 5: Linear Transformations

## From First Principles

### Identity matrix

The $n \times n$ identity matrix $\mathbf{I}_n$ has 1s on the diagonal and 0s everywhere else:

$$\mathbf{I}_2 = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}, \quad \mathbf{I}_3 = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix}$$

**Property:** $\mathbf{AI} = \mathbf{IA} = \mathbf{A}$ for any matrix $\mathbf{A}$.

**Pen & paper:**

$$\begin{pmatrix} 3 & 7 \\ 2 & 5 \end{pmatrix}\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 3 & 7 \\ 2 & 5 \end{pmatrix}$$ ✓

### Transpose

The **transpose** $\mathbf{A}^T$ swaps rows and columns: $(A^T)_{ij} = A_{ji}$.

**Pen & paper:**

$$\begin{pmatrix} 1 & 2 \\ 3 & 4 \\ 5 & 6 \end{pmatrix}^T = \begin{pmatrix} 1 & 3 & 5 \\ 2 & 4 & 6 \end{pmatrix}$$

**Properties:**

| Property | Formula |
|----------|---------|
| Double transpose | $(\mathbf{A}^T)^T = \mathbf{A}$ |
| Sum | $(\mathbf{A} + \mathbf{B})^T = \mathbf{A}^T + \mathbf{B}^T$ |
| Product | $(\mathbf{AB})^T = \mathbf{B}^T\mathbf{A}^T$ (reversed!) |
| Scalar | $(c\mathbf{A})^T = c\mathbf{A}^T$ |

**Symmetric matrix:** $\mathbf{A}^T = \mathbf{A}$.  Example: $\begin{pmatrix} 1 & 2 \\ 2 & 3 \end{pmatrix}$.

> Covariance matrices are always symmetric.

### Matrix inverse

The **inverse** $\mathbf{A}^{-1}$ satisfies:

$$\mathbf{A}\mathbf{A}^{-1} = \mathbf{A}^{-1}\mathbf{A} = \mathbf{I}$$

Not every matrix has an inverse.  A matrix is **invertible** (non-singular) if
and only if its determinant is non-zero (next lesson).

### Finding the inverse of a 2×2 matrix

For $\mathbf{A} = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$:

$$\mathbf{A}^{-1} = \frac{1}{ad - bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$$

The number $ad - bc$ is the **determinant** $\det(\mathbf{A})$.

**Pen & paper: Find the inverse of $\begin{pmatrix} 2 & 1 \\ 5 & 3 \end{pmatrix}$**

$\det = 2(3) - 1(5) = 6 - 5 = 1$

$$\mathbf{A}^{-1} = \frac{1}{1}\begin{pmatrix} 3 & -1 \\ -5 & 2 \end{pmatrix} = \begin{pmatrix} 3 & -1 \\ -5 & 2 \end{pmatrix}$$

**Verify:**

$$\begin{pmatrix} 2 & 1 \\ 5 & 3 \end{pmatrix}\begin{pmatrix} 3 & -1 \\ -5 & 2 \end{pmatrix} = \begin{pmatrix} 6-5 & -2+2 \\ 15-15 & -5+6 \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$$ ✓

### When does the inverse NOT exist?

When $\det(\mathbf{A}) = 0$.  This means the transformation **collapses a dimension** — it squishes 2D space into a line (or a point).  You can't undo that.

**Pen & paper:** $\begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix}$

$\det = 1(4) - 2(2) = 0$ → **Not invertible.**

Notice: row 2 = 2 × row 1.  The two rows are linearly dependent.

### Finding inverse by row reduction (for larger matrices)

Write $[\mathbf{A} | \mathbf{I}]$ and row-reduce to $[\mathbf{I} | \mathbf{A}^{-1}]$.

**Pen & paper: Inverse of $\begin{pmatrix} 1 & 2 \\ 3 & 7 \end{pmatrix}$**

$$\left(\begin{array}{cc|cc} 1 & 2 & 1 & 0 \\ 3 & 7 & 0 & 1 \end{array}\right)$$

$R_2 \leftarrow R_2 - 3R_1$:

$$\left(\begin{array}{cc|cc} 1 & 2 & 1 & 0 \\ 0 & 1 & -3 & 1 \end{array}\right)$$

$R_1 \leftarrow R_1 - 2R_2$:

$$\left(\begin{array}{cc|cc} 1 & 0 & 7 & -2 \\ 0 & 1 & -3 & 1 \end{array}\right)$$

$$\mathbf{A}^{-1} = \begin{pmatrix} 7 & -2 \\ -3 & 1 \end{pmatrix}$$

**Verify with formula:** $\det = 7 - 6 = 1$, $\frac{1}{1}\begin{pmatrix} 7 & -2 \\ -3 & 1 \end{pmatrix}$ ✓

### Properties of the inverse

| Property | Formula |
|----------|---------|
| Inverse of inverse | $(\mathbf{A}^{-1})^{-1} = \mathbf{A}$ |
| Inverse of product | $(\mathbf{AB})^{-1} = \mathbf{B}^{-1}\mathbf{A}^{-1}$ (reversed!) |
| Inverse of transpose | $(\mathbf{A}^T)^{-1} = (\mathbf{A}^{-1})^T$ |
| Inverse of scalar × matrix | $(c\mathbf{A})^{-1} = \frac{1}{c}\mathbf{A}^{-1}$ |

### Solving linear systems

$\mathbf{Ax} = \mathbf{b}$ → $\mathbf{x} = \mathbf{A}^{-1}\mathbf{b}$

**Pen & paper:** Solve $\begin{pmatrix} 2 & 1 \\ 5 & 3 \end{pmatrix}\mathbf{x} = \begin{pmatrix} 5 \\ 13 \end{pmatrix}$

$$\mathbf{x} = \begin{pmatrix} 3 & -1 \\ -5 & 2 \end{pmatrix}\begin{pmatrix} 5 \\ 13 \end{pmatrix} = \begin{pmatrix} 15 - 13 \\ -25 + 26 \end{pmatrix} = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$$

**Verify:** $2(2) + 1(1) = 5$ ✓, $5(2) + 3(1) = 13$ ✓

## Python Verification

```python
# ── Identity, Inverse, Transpose ────────────────────────────
import numpy as np

# Identity
I = np.eye(2)
A = np.array([[3, 7], [2, 5]])
print("=== Identity ===")
print(f"A @ I =\n{A @ I}")
print(f"Same as A? {np.array_equal(A @ I, A)}")

# Transpose
B = np.array([[1, 2], [3, 4], [5, 6]])
print(f"\n=== Transpose ===")
print(f"B =\n{B}")
print(f"B^T =\n{B.T}")

# 2x2 Inverse
A = np.array([[2, 1], [5, 3]])
A_inv = np.linalg.inv(A)
print(f"\n=== 2×2 Inverse ===")
print(f"A =\n{A}")
print(f"A^-1 =\n{A_inv}")
print(f"A @ A^-1 =\n{np.round(A @ A_inv, 10)}")

# Manual formula verification
det = 2*3 - 1*5
manual_inv = np.array([[3, -1], [-5, 2]]) / det
print(f"det = {det}")
print(f"Manual inverse =\n{manual_inv}")

# Singular matrix (no inverse)
print(f"\n=== Singular matrix ===")
S = np.array([[1, 2], [2, 4]])
print(f"det = {np.linalg.det(S):.1f} (zero → not invertible)")

# Solve Ax = b
print(f"\n=== Solve Ax = b ===")
A = np.array([[2, 1], [5, 3]])
b = np.array([5, 13])
x = np.linalg.solve(A, b)
print(f"x = {x}")
print(f"Verify: A @ x = {A @ x}")

# Row reduction inverse
A2 = np.array([[1, 2], [3, 7]])
print(f"\n=== Row reduction inverse ===")
print(f"A^-1 = \n{np.linalg.inv(A2)}")  # Should be [[7,-2],[-3,1]]
```

## Connection to CS / Games / AI

- **Solving systems** — $\mathbf{x} = \mathbf{A}^{-1}\mathbf{b}$ solves simultaneous equations
- **3D graphics** — inverse of the view matrix transforms from screen back to world space
- **Neural networks** — understanding when weight matrices are invertible relates to information preservation
- **Covariance matrices** — always symmetric, their inverse appears in the Mahalanobis distance
- **Pseudoinverse** — when $\mathbf{A}^{-1}$ doesn't exist, the Moore-Penrose pseudoinverse gives the "best" solution (used in linear regression)

## Check Your Understanding

1. **Pen & paper:** Find the inverse of $\begin{pmatrix} 4 & 7 \\ 2 & 6 \end{pmatrix}$.  Verify by multiplication.
2. **Pen & paper:** Why is $\begin{pmatrix} 1 & 3 \\ 2 & 6 \end{pmatrix}$ not invertible?  What does it do geometrically?
3. **Pen & paper:** Solve $\begin{pmatrix} 1 & 2 \\ 3 & 7 \end{pmatrix}\mathbf{x} = \begin{pmatrix} 8 \\ 23 \end{pmatrix}$ using the inverse.
4. **Pen & paper:** Prove that if $\mathbf{A}$ is symmetric, then $\mathbf{A}^{-1}$ is also symmetric.
   (Hint: start from $\mathbf{AA}^{-1} = \mathbf{I}$ and take the transpose.)
