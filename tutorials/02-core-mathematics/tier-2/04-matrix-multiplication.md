# Matrix Multiplication — Why Rows × Columns

## Intuition

Matrix multiplication is not "multiply entry by entry."  It's a series of
dot products — each entry of the result is the dot product of a row from the
first matrix with a column from the second.  This is because matrix
multiplication represents **composition of transformations**: do one thing,
then do another.

## Prerequisites

- Tier 2, Lesson 2: Vector Operations (dot product)
- Tier 2, Lesson 1: Scalars, Vectors, Matrices

## From First Principles

### The rule

If $\mathbf{A}$ is $m \times n$ and $\mathbf{B}$ is $n \times p$, then:

$$\mathbf{C} = \mathbf{A}\mathbf{B}$$

is an $m \times p$ matrix where:

$$c_{ij} = \sum_{k=1}^{n} a_{ik} b_{kj} = \text{(row } i \text{ of A)} \cdot \text{(column } j \text{ of B)}$$

> **The inner dimensions must match:** $(m \times \boxed{n}) \cdot (\boxed{n} \times p) = (m \times p)$

### Pen & paper: 2×2 × 2×2

$$\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix} \begin{pmatrix} 5 & 6 \\ 7 & 8 \end{pmatrix}$$

Compute each entry:

$c_{11} = 1 \times 5 + 2 \times 7 = 5 + 14 = 19$
$c_{12} = 1 \times 6 + 2 \times 8 = 6 + 16 = 22$
$c_{21} = 3 \times 5 + 4 \times 7 = 15 + 28 = 43$
$c_{22} = 3 \times 6 + 4 \times 8 = 18 + 32 = 50$

$$\mathbf{C} = \begin{pmatrix} 19 & 22 \\ 43 & 50 \end{pmatrix}$$

### Pen & paper: 2×3 × 3×2

$$\begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{pmatrix} \begin{pmatrix} 7 & 8 \\ 9 & 10 \\ 11 & 12 \end{pmatrix}$$

Shape: $(2 \times 3) \cdot (3 \times 2) = (2 \times 2)$

$c_{11} = 1(7) + 2(9) + 3(11) = 7 + 18 + 33 = 58$
$c_{12} = 1(8) + 2(10) + 3(12) = 8 + 20 + 36 = 64$
$c_{21} = 4(7) + 5(9) + 6(11) = 28 + 45 + 66 = 139$
$c_{22} = 4(8) + 5(10) + 6(12) = 32 + 50 + 72 = 154$

$$\mathbf{C} = \begin{pmatrix} 58 & 64 \\ 139 & 154 \end{pmatrix}$$

### Matrix × vector

A matrix times a column vector is a special case:

$$\begin{pmatrix} 2 & 1 \\ 0 & 3 \end{pmatrix} \begin{pmatrix} 4 \\ 1 \end{pmatrix} = \begin{pmatrix} 2(4) + 1(1) \\ 0(4) + 3(1) \end{pmatrix} = \begin{pmatrix} 9 \\ 3 \end{pmatrix}$$

Shape: $(2 \times 2) \cdot (2 \times 1) = (2 \times 1)$ — a vector.

> **This is how neural networks work:** $\mathbf{y} = \mathbf{W}\mathbf{x} + \mathbf{b}$

### Properties

| Property | Holds? |
|----------|--------|
| Associative | $(\mathbf{A}\mathbf{B})\mathbf{C} = \mathbf{A}(\mathbf{B}\mathbf{C})$ ✓ |
| Distributive | $\mathbf{A}(\mathbf{B} + \mathbf{C}) = \mathbf{A}\mathbf{B} + \mathbf{A}\mathbf{C}$ ✓ |
| **NOT** commutative | $\mathbf{A}\mathbf{B} \ne \mathbf{B}\mathbf{A}$ in general ✗ |

**Pen & paper: Show non-commutativity**

$$\mathbf{A} = \begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix}, \quad \mathbf{B} = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$$

$\mathbf{AB} = \begin{pmatrix} 2 & 1 \\ 1 & 0 \end{pmatrix}$

$\mathbf{BA} = \begin{pmatrix} 0 & 1 \\ 1 & 2 \end{pmatrix}$

$\mathbf{AB} \ne \mathbf{BA}$ ✓

### Transpose of a product

$$(\mathbf{A}\mathbf{B})^T = \mathbf{B}^T \mathbf{A}^T$$

Note the **reversed order**.

### Column perspective

$\mathbf{A}\mathbf{x}$ is a **linear combination of the columns** of $\mathbf{A}$:

$$\begin{pmatrix} | & | \\ \mathbf{a}_1 & \mathbf{a}_2 \\ | & | \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = x_1 \mathbf{a}_1 + x_2 \mathbf{a}_2$$

**Pen & paper:**

$$\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}\begin{pmatrix} 3 \\ 5 \end{pmatrix} = 3\begin{pmatrix} 1 \\ 0 \end{pmatrix} + 5\begin{pmatrix} 0 \\ 1 \end{pmatrix} = \begin{pmatrix} 3 \\ 5 \end{pmatrix}$$

This is why the identity matrix does nothing — it just reconstructs the vector from the standard basis.

## Python Verification

```python
# ── Matrix Multiplication: verifying pen & paper work ───────
import numpy as np

# 2x2 × 2x2
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
C = A @ B  # @ is the matrix multiply operator
print("=== 2×2 × 2×2 ===")
print(f"A @ B =\n{C}")  # [[19, 22], [43, 50]]

# 2x3 × 3x2
A2 = np.array([[1, 2, 3], [4, 5, 6]])
B2 = np.array([[7, 8], [9, 10], [11, 12]])
print(f"\n=== 2×3 × 3×2 ===")
print(f"Shape: {A2.shape} @ {B2.shape} = {(A2 @ B2).shape}")
print(f"A @ B =\n{A2 @ B2}")  # [[58, 64], [139, 154]]

# Matrix × vector
W = np.array([[2, 1], [0, 3]])
x = np.array([4, 1])
print(f"\n=== Matrix × vector ===")
print(f"W @ x = {W @ x}")  # [9, 3]

# Non-commutativity
A3 = np.array([[1, 2], [0, 1]])
B3 = np.array([[0, 1], [1, 0]])
print(f"\n=== Non-commutativity ===")
print(f"AB =\n{A3 @ B3}")
print(f"BA =\n{B3 @ A3}")
print(f"AB == BA? {np.array_equal(A3 @ B3, B3 @ A3)}")

# Transpose of product
print(f"\n=== (AB)^T = B^T A^T ===")
AB_T = (A @ B).T
BT_AT = B.T @ A.T
print(f"(AB)^T =\n{AB_T}")
print(f"B^T A^T =\n{BT_AT}")
print(f"Equal? {np.array_equal(AB_T, BT_AT)}")

# Column perspective
print(f"\n=== Column perspective ===")
A4 = np.array([[2, -1], [1, 3]])
x4 = np.array([3, 2])
col_combo = x4[0] * A4[:, 0] + x4[1] * A4[:, 1]
print(f"A @ x = {A4 @ x4}")
print(f"3*col1 + 2*col2 = {col_combo}")
print(f"Equal? {np.array_equal(A4 @ x4, col_combo)}")
```

## Connection to CS / Games / AI

- **Neural network layers** — each layer is $\mathbf{y} = \mathbf{W}\mathbf{x} + \mathbf{b}$, a matrix-vector multiply
- **3D graphics** — chaining transformations (rotate, then scale, then translate) is matrix multiplication
- **GPU acceleration** — GPUs are optimised for massively parallel matrix multiplication
- **Attention in Transformers** — $\text{softmax}(\mathbf{QK}^T / \sqrt{d_k})\mathbf{V}$ is all matrix multiplication
- **Graph algorithms** — $\mathbf{A}^k$ (adjacency matrix raised to power $k$) counts paths of length $k$

## Check Your Understanding

1. **Pen & paper:** Multiply $\begin{pmatrix} 1 & 0 & 2 \\ -1 & 3 & 1 \end{pmatrix} \begin{pmatrix} 3 \\ 1 \\ 2 \end{pmatrix}$.  What shape is the result?
2. **Pen & paper:** Can you multiply a $3 \times 2$ matrix by a $3 \times 2$ matrix?  Why or why not?
3. **Pen & paper:** Compute $\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}^2$.  What does this matrix do?
4. **Think about it:** In a neural network with layers of sizes 784→128→10, what are the shapes of the two weight matrices?
