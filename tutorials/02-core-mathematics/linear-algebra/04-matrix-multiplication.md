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

## Visualisation — The three views of matrix multiplication

The same operation $\mathbf{C} = \mathbf{A}\mathbf{B}$ has *three*
useful pictures, each useful in a different context. Seeing all three
makes it impossible to forget the formula.

```python
# ── Three views of matrix multiplication ────────────────────
import numpy as np
import matplotlib.pyplot as plt

A = np.array([[1, 2, 3],
              [4, 5, 6]], dtype=float)        # 2×3
B = np.array([[7,  8],
              [9, 10],
              [11, 12]], dtype=float)         # 3×2
C = A @ B                                     # 2×2

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# (1) Inner-product view: each entry C[i, j] is row i of A · column j of B.
# Highlight one row and one column to make the dot product visible.
ax = axes[0]
ax.set_title("Inner-product view\nC[i,j] = (row i of A) · (col j of B)")
ax.imshow(np.zeros((4, 5)), cmap="Greys", vmin=0, vmax=1)
# Draw A on the left, B on top-right, C below B
def draw_matrix(origin, mat, label, color="lightblue", highlight_row=None, highlight_col=None):
    r, c = mat.shape
    for i in range(r):
        for j in range(c):
            facecolor = color
            if highlight_row is not None and i == highlight_row:
                facecolor = "tab:orange"
            if highlight_col is not None and j == highlight_col:
                facecolor = "tab:green"
            ax.add_patch(plt.Rectangle((origin[0] + j, origin[1] - i), 1, 1,
                                       color=facecolor, alpha=0.5,
                                       edgecolor="black", lw=0.8))
            ax.text(origin[0] + j + 0.5, origin[1] - i + 0.5, f"{int(mat[i, j])}",
                    ha="center", va="center", fontsize=11, fontweight="bold")
    ax.text(origin[0] - 0.4, origin[1] + 0.6, label, fontsize=13, fontweight="bold")
draw_matrix((0, 4), A, "A (2×3)", color="lightblue", highlight_row=0)
draw_matrix((4, 4), B, "B (3×2)", color="lightcoral", highlight_col=0)
draw_matrix((4, 1), C, "C = A·B", color="lightyellow")
ax.add_patch(plt.Rectangle((4, 1), 1, 1, fill=False, edgecolor="red", lw=3))
ax.text(8, 1, f"C[0,0] = (1,2,3)·(7,9,11) = {int(C[0,0])}",
        fontsize=10, va="center")
ax.set_xlim(-0.5, 13); ax.set_ylim(-1, 6); ax.set_aspect("equal"); ax.axis("off")

# (2) Column view: each column of C is A times the corresponding column of B.
# So matrix multiplication = "apply A to every column of B in turn".
ax = axes[1]
ax.set_title("Column view\ncol j of C = A · (col j of B)")
draw_matrix((0, 4), A,           "A",                 color="lightblue")
for j, color in [(0, "tab:green"), (1, "tab:purple")]:
    bj = B[:, j]
    cj = A @ bj
    draw_matrix((4 + 3*j, 4), bj.reshape(-1, 1), f"col {j} of B", color=color)
    draw_matrix((4 + 3*j, 1), cj.reshape(-1, 1), f"col {j} of C", color=color)
    ax.annotate("", xy=(4 + 3*j + 0.5, 2.0), xytext=(4 + 3*j + 0.5, 4.5),
                arrowprops=dict(arrowstyle="->", color=color, lw=1.5))
ax.set_xlim(-0.5, 13); ax.set_ylim(-1, 6); ax.set_aspect("equal"); ax.axis("off")

# (3) Linear-combination view: A · v is x · col1(A) + y · col2(A) + ...
# Visualised on a 2×2 example so we can show the actual arrows.
ax = axes[2]
ax.set_title("Linear-combination view (2-D)\nA·v = $x_1$·col1(A) + $x_2$·col2(A)")
A_small = np.array([[2.0, 1.0],
                    [1.0, 1.5]])
v = np.array([1.5, 1.0])
col1 = A_small[:, 0]
col2 = A_small[:, 1]
result = A_small @ v
# Draw col1 and col2.
ax.quiver(0, 0, *col1, angles="xy", scale_units="xy", scale=1,
          color="tab:blue", width=0.012, label="col 1 of A")
ax.quiver(0, 0, *col2, angles="xy", scale_units="xy", scale=1,
          color="tab:orange", width=0.012, label="col 2 of A")
# Now the scaled versions, then their sum.
ax.quiver(0, 0, *(v[0] * col1), angles="xy", scale_units="xy", scale=1,
          color="tab:blue", alpha=0.4, width=0.012,
          label=f"{v[0]}·col1")
ax.quiver(*(v[0] * col1), *(v[1] * col2),
          angles="xy", scale_units="xy", scale=1,
          color="tab:orange", alpha=0.4, width=0.012,
          label=f"{v[1]}·col2")
ax.quiver(0, 0, *result, angles="xy", scale_units="xy", scale=1,
          color="tab:green", width=0.012,
          label=f"A·v = {tuple(result)}")
ax.set_xlim(-0.5, 5); ax.set_ylim(-0.5, 4)
ax.axhline(0, color="black", lw=0.5); ax.axvline(0, color="black", lw=0.5)
ax.set_aspect("equal"); ax.grid(True, alpha=0.3); ax.legend(loc="upper left", fontsize=8)

plt.tight_layout()
plt.show()

# Numerical confirmation that all three views give the same C.
print(f"A shape: {A.shape},  B shape: {B.shape},  C shape: {C.shape}")
print(f"C =\n{C.astype(int)}")
print(f"\nColumn view check: A·B[:,0] = {(A @ B[:, 0]).astype(int)} (= col 0 of C)")
print(f"Column view check: A·B[:,1] = {(A @ B[:, 1]).astype(int)} (= col 1 of C)")
```

**Why three views?**

- **Inner-product view (left)** is the textbook formula —
  $C_{ij} = \sum_k A_{ik} B_{kj}$. Useful when you actually compute by
  hand or read the result entry-by-entry.
- **Column view (middle)** says *"matrix multiplication applies $\mathbf{A}$
  to every column of $\mathbf{B}$ in turn"*. This is what makes the
  identities $(A B)\mathbf{v} = A(B\mathbf{v})$ obvious: applying $AB$
  to $\mathbf{v}$ is the same as first applying $B$ to $\mathbf{v}$,
  then applying $A$ to the result.
- **Linear-combination view (right)** says *"$\mathbf{A}\mathbf{v}$
  is a weighted sum of the columns of $\mathbf{A}$"*. This is the view
  used when reasoning about the **column space** of $\mathbf{A}$ — the
  set of all reachable outputs.

Pick the view that matches the question. In neural networks the column
view is most useful (each layer applies the same weight matrix to every
column / token in a batch). In linear systems the linear-combination
view is most useful (we ask "is $\mathbf{b}$ a combination of the
columns of $\mathbf{A}$?"). The textbook entry-wise formula is for
debugging.

## Connection to CS / Games / AI / Business / Industry

- **Neural network layers** — each layer is $\mathbf{y} = \mathbf{W}\mathbf{x} + \mathbf{b}$, a matrix-vector multiply
- **3D graphics** — chaining transformations (rotate, then scale, then translate) is matrix multiplication
- **GPU acceleration** — GPUs are optimised for massively parallel matrix multiplication
- **Attention in Transformers** — $\text{softmax}(\mathbf{QK}^T / \sqrt{d_k})\mathbf{V}$ is all matrix multiplication
- **Graph algorithms** — $\mathbf{A}^k$ (adjacency matrix raised to power $k$) counts paths of length $k$
- **Business — Leontief input-output economics** — every nation's GDP forecast at the BEA and OECD solves $\mathbf{x} = (\mathbf{I} - \mathbf{A})^{-1}\mathbf{d}$, a matrix product describing how output in steel, energy and services flow between sectors (Wassily Leontief, Nobel 1973).
- **Operations — Google AdWords auction matrix** — bid-ranking computes a matrix product of advertiser bid vectors with quality-score matrices billions of times per day to choose ad slots.
- **Engineering — finite element analysis (ANSYS, Abaqus)** — stress analysis on Boeing 787 wings or Tesla chassis assembles a global stiffness matrix $\mathbf{K}$ and solves $\mathbf{K}\mathbf{u} = \mathbf{f}$ with billions of MAC operations.
- **Industry — TPU and NVIDIA H100 systolic arrays** — Google's TPU v5 and NVIDIA Tensor Cores are silicon designed to do nothing but $\mathbf{C} \mathrel{+}= \mathbf{A}\mathbf{B}$ at hundreds of teraFLOPS, the engine behind ChatGPT inference.

## Check Your Understanding

1. **Pen & paper:** Multiply $\begin{pmatrix} 1 & 0 & 2 \\ -1 & 3 & 1 \end{pmatrix} \begin{pmatrix} 3 \\ 1 \\ 2 \end{pmatrix}$.  What shape is the result?
2. **Pen & paper:** Can you multiply a $3 \times 2$ matrix by a $3 \times 2$ matrix?  Why or why not?
3. **Pen & paper:** Compute $\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}^2$.  What does this matrix do?
4. **Think about it:** In a neural network with layers of sizes 784→128→10, what are the shapes of the two weight matrices?
