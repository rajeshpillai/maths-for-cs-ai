# Systems of Linear Equations — Gaussian Elimination

## Intuition

A system of linear equations is just asking: "Where do these lines (or planes)
intersect?"  Gaussian elimination is the systematic pen-and-paper method for
finding the answer.  It's what your computer actually does (with some
numerical tweaks) when you call `numpy.linalg.solve`.

## Prerequisites

- Tier 2, Lesson 6: Identity, Inverse, Transpose
- Tier 2, Lesson 7: Determinants

## From First Principles

### The problem

Solve:
$$2x + y = 5$$
$$3x - 2y = 4$$

In matrix form: $\mathbf{Ax} = \mathbf{b}$

$$\begin{pmatrix} 2 & 1 \\ 3 & -2 \end{pmatrix}\begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 5 \\ 4 \end{pmatrix}$$

### Gaussian elimination (pen & paper)

Write the **augmented matrix** $[\mathbf{A}|\mathbf{b}]$:

$$\left(\begin{array}{cc|c} 2 & 1 & 5 \\ 3 & -2 & 4 \end{array}\right)$$

**Step 1:** Eliminate $x$ from row 2.

$R_2 \leftarrow R_2 - \frac{3}{2}R_1$:

$$\left(\begin{array}{cc|c} 2 & 1 & 5 \\ 0 & -\frac{7}{2} & -\frac{7}{2} \end{array}\right)$$

**Step 2:** Back-substitute.

From row 2: $-\frac{7}{2}y = -\frac{7}{2}$ → $y = 1$

From row 1: $2x + 1 = 5$ → $x = 2$

**Solution:** $x = 2, y = 1$

### Row echelon form

The goal of forward elimination is to get the matrix into **row echelon form**
(upper triangular with zeros below the diagonal):

$$\begin{pmatrix} * & * & * \\ 0 & * & * \\ 0 & 0 & * \end{pmatrix}$$

Then solve from the bottom up (**back substitution**).

### 3×3 example (pen & paper)

Solve:
$$x + 2y + z = 9$$
$$2x + 4y + 3z = 21$$
$$3x + 7y + 4z = 32$$

Augmented matrix:

$$\left(\begin{array}{ccc|c} 1 & 2 & 1 & 9 \\ 2 & 4 & 3 & 21 \\ 3 & 7 & 4 & 32 \end{array}\right)$$

$R_2 \leftarrow R_2 - 2R_1$:

$$\left(\begin{array}{ccc|c} 1 & 2 & 1 & 9 \\ 0 & 0 & 1 & 3 \\ 3 & 7 & 4 & 32 \end{array}\right)$$

$R_3 \leftarrow R_3 - 3R_1$:

$$\left(\begin{array}{ccc|c} 1 & 2 & 1 & 9 \\ 0 & 0 & 1 & 3 \\ 0 & 1 & 1 & 5 \end{array}\right)$$

Swap $R_2$ and $R_3$ (partial pivoting):

$$\left(\begin{array}{ccc|c} 1 & 2 & 1 & 9 \\ 0 & 1 & 1 & 5 \\ 0 & 0 & 1 & 3 \end{array}\right)$$

**Back substitution:**

Row 3: $z = 3$
Row 2: $y + 3 = 5$ → $y = 2$
Row 1: $x + 4 + 3 = 9$ → $x = 2$

**Solution:** $x = 2, y = 2, z = 3$

### Three possible outcomes

| Outcome | What it looks like | Geometric meaning |
|---------|-------------------|-------------------|
| Unique solution | Full echelon form, $\det \ne 0$ | Lines/planes intersect at one point |
| No solution | Row like $[0\;0\;|\;c]$ with $c \ne 0$ | Parallel lines/planes |
| Infinite solutions | Free variables (zero row) | Lines/planes overlap |

### Reduced row echelon form (RREF)

Continue from echelon form by also eliminating **above** each pivot:

$$\left(\begin{array}{ccc|c} 1 & 0 & 0 & 2 \\ 0 & 1 & 0 & 2 \\ 0 & 0 & 1 & 3 \end{array}\right)$$

The solution is read directly: $x = 2, y = 2, z = 3$.

## Python Verification

```python
# ── Gaussian Elimination: verifying pen & paper work ────────
import numpy as np

# 2x2 system
print("=== 2×2 system ===")
A = np.array([[2, 1], [3, -2]], dtype=float)
b = np.array([5, 4], dtype=float)
x = np.linalg.solve(A, b)
print(f"Solution: x={x[0]:.0f}, y={x[1]:.0f}")
print(f"Verify: A @ x = {A @ x}")

# 3x3 system
print("\n=== 3×3 system ===")
A3 = np.array([[1, 2, 1], [2, 4, 3], [3, 7, 4]], dtype=float)
b3 = np.array([9, 21, 32], dtype=float)
x3 = np.linalg.solve(A3, b3)
print(f"Solution: x={x3[0]:.0f}, y={x3[1]:.0f}, z={x3[2]:.0f}")
print(f"Verify: A @ x = {A3 @ x3}")

# Step-by-step Gaussian elimination
print("\n=== Step-by-step elimination ===")
# Augmented matrix
aug = np.column_stack([A3.copy(), b3.copy()])
print(f"Start:\n{aug}\n")

# R2 = R2 - 2*R1
aug[1] -= 2 * aug[0]
print(f"R2 -= 2*R1:\n{aug}\n")

# R3 = R3 - 3*R1
aug[2] -= 3 * aug[0]
print(f"R3 -= 3*R1:\n{aug}\n")

# Swap R2, R3
aug[[1, 2]] = aug[[2, 1]]
print(f"Swap R2, R3:\n{aug}\n")

# Back substitution
z = aug[2, 3] / aug[2, 2]
y = (aug[1, 3] - aug[1, 2] * z) / aug[1, 1]
x_val = (aug[0, 3] - aug[0, 1] * y - aug[0, 2] * z) / aug[0, 0]
print(f"Back sub: x={x_val:.0f}, y={y:.0f}, z={z:.0f}")

# No solution example
print("\n=== No solution (parallel lines) ===")
A_par = np.array([[1, 2], [2, 4]], dtype=float)
b_par = np.array([3, 7], dtype=float)
print(f"det = {np.linalg.det(A_par):.1f} (singular)")
print("These lines are parallel: x + 2y = 3 and 2x + 4y = 7")
```

## Connection to CS / Games / AI

- **Linear regression** — the normal equations $\mathbf{X}^T\mathbf{Xw} = \mathbf{X}^T\mathbf{y}$ are solved by elimination
- **Circuit analysis** — Kirchhoff's laws produce linear systems
- **Physics engines** — constraint solving in rigid body simulations
- **Computer graphics** — finding ray-surface intersections
- **Numerical stability** — real implementations use partial pivoting (LU decomposition) to avoid division by near-zero

## Check Your Understanding

1. **Pen & paper:** Solve by Gaussian elimination:
   $x + y + z = 6$, $2x + 3y + z = 14$, $x + y + 2z = 9$.
2. **Pen & paper:** Show that $x + 2y = 3$, $2x + 4y = 7$ has no solution. What does the augmented matrix look like after elimination?
3. **Pen & paper:** Solve $x + y = 3$, $2x + 2y = 6$. How many solutions? What is the geometric interpretation?
