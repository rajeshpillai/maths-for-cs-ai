# Scalars, Vectors, Matrices, Tensors — Building the Hierarchy

## Intuition

A scalar is a single number.  A vector is a list of numbers.  A matrix is a
grid of numbers.  A tensor is the generalisation to any number of dimensions.
This hierarchy is the language of machine learning: inputs are vectors, weights
are matrices, batches of images are tensors, and all computation is just
multiplying and adding these objects.

## Prerequisites

- Tier 0: Number Systems (real numbers)

## From First Principles

### Scalars (0-dimensional)

A **scalar** is a single number: $5$, $-3.14$, $\frac{1}{2}$.

In code: `x = 5`.  In physics: temperature, mass, speed.

### Vectors (1-dimensional)

A **vector** is an ordered list of scalars.

$$\mathbf{v} = \begin{pmatrix} 3 \\ 7 \\ -1 \end{pmatrix}$$

This is a vector in $\mathbb{R}^3$ (3-dimensional real space).

**Two interpretations:**
1. **A point** in space: coordinates $(3, 7, -1)$.
2. **An arrow** from the origin to that point: it has direction and magnitude.

**Notation:** Bold lowercase $\mathbf{v}$, or with an arrow $\vec{v}$.  
Individual entries: $v_1 = 3, v_2 = 7, v_3 = -1$.

**Dimension:** The number of entries.  $\mathbf{v} \in \mathbb{R}^n$ means $\mathbf{v}$ has $n$ entries.

**Row vs column vector:**

Column (default): $\begin{pmatrix} 3 \\ 7 \end{pmatrix}$
Row: $\begin{pmatrix} 3 & 7 \end{pmatrix}$

### Matrices (2-dimensional)

A **matrix** is a rectangular grid of scalars arranged in rows and columns.

$$\mathbf{A} = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{pmatrix}$$

This is a $2 \times 3$ matrix (2 rows, 3 columns).  We say $\mathbf{A} \in \mathbb{R}^{2 \times 3}$.

**Notation:** Bold uppercase $\mathbf{A}$.  Entry at row $i$, column $j$: $a_{ij}$.

**Pen & paper:** In our matrix: $a_{11} = 1$, $a_{12} = 2$, $a_{23} = 6$.

**Special shapes:**
- **Square matrix:** $m = n$ (same number of rows and columns)
- **Column vector:** $n \times 1$ matrix
- **Row vector:** $1 \times n$ matrix
- **Scalar:** $1 \times 1$ matrix

### Tensors (n-dimensional)

A **tensor** is the generalisation to any number of dimensions (called **rank** or **order**).

| Rank | Name | Shape example | Real-world example |
|------|------|--------------|-------------------|
| 0 | Scalar | — | temperature |
| 1 | Vector | $(n,)$ | a data point with $n$ features |
| 2 | Matrix | $(m, n)$ | a grayscale image |
| 3 | 3D tensor | $(c, h, w)$ | a colour image (3 channels × height × width) |
| 4 | 4D tensor | $(b, c, h, w)$ | a batch of colour images |

> In ML frameworks (PyTorch, TensorFlow), everything is a tensor.

### Vector operations by hand

**Addition:** Add corresponding entries.

$$\begin{pmatrix} 1 \\ 3 \end{pmatrix} + \begin{pmatrix} 4 \\ -1 \end{pmatrix} = \begin{pmatrix} 1+4 \\ 3+(-1) \end{pmatrix} = \begin{pmatrix} 5 \\ 2 \end{pmatrix}$$

**Scalar multiplication:** Multiply every entry.

$$3 \times \begin{pmatrix} 2 \\ -1 \end{pmatrix} = \begin{pmatrix} 6 \\ -3 \end{pmatrix}$$

**Pen & paper: Linear combination**

$$2\begin{pmatrix} 1 \\ 0 \end{pmatrix} + 3\begin{pmatrix} 0 \\ 1 \end{pmatrix} = \begin{pmatrix} 2 \\ 0 \end{pmatrix} + \begin{pmatrix} 0 \\ 3 \end{pmatrix} = \begin{pmatrix} 2 \\ 3 \end{pmatrix}$$

Any vector in $\mathbb{R}^2$ can be written as a linear combination of
$\begin{pmatrix} 1 \\ 0 \end{pmatrix}$ and $\begin{pmatrix} 0 \\ 1 \end{pmatrix}$.
These are the **standard basis vectors** $\mathbf{e}_1$ and $\mathbf{e}_2$.

### Matrix operations by hand

**Addition:** Same shape required.  Add entry by entry.

$$\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix} + \begin{pmatrix} 5 & 6 \\ 7 & 8 \end{pmatrix} = \begin{pmatrix} 6 & 8 \\ 10 & 12 \end{pmatrix}$$

**Scalar multiplication:**

$$2 \times \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix} = \begin{pmatrix} 2 & 4 \\ 6 & 8 \end{pmatrix}$$

**Transpose:** Swap rows and columns.

$$\begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{pmatrix}^T = \begin{pmatrix} 1 & 4 \\ 2 & 5 \\ 3 & 6 \end{pmatrix}$$

A $2 \times 3$ matrix becomes $3 \times 2$.

## Python Verification

```python
# ── Scalars, Vectors, Matrices, Tensors ─────────────────────
import numpy as np

# Scalar
s = 5
print(f"Scalar: {s}, shape: {np.array(s).shape}")

# Vector
v = np.array([3, 7, -1])
print(f"\nVector: {v}")
print(f"Shape: {v.shape}, Dimension: {v.ndim}")
print(f"v[0]={v[0]}, v[1]={v[1]}, v[2]={v[2]}")

# Vector addition
a = np.array([1, 3])
b = np.array([4, -1])
print(f"\n=== Vector addition ===")
print(f"{a} + {b} = {a + b}")

# Scalar multiplication
print(f"\n=== Scalar multiplication ===")
print(f"3 × {np.array([2, -1])} = {3 * np.array([2, -1])}")

# Linear combination
e1 = np.array([1, 0])
e2 = np.array([0, 1])
print(f"\n=== Linear combination ===")
print(f"2*e1 + 3*e2 = {2*e1 + 3*e2}")

# Matrix
A = np.array([[1, 2, 3], [4, 5, 6]])
print(f"\n=== Matrix ===")
print(f"A =\n{A}")
print(f"Shape: {A.shape} (rows={A.shape[0]}, cols={A.shape[1]})")
print(f"A[0,1] = {A[0,1]}, A[1,2] = {A[1,2]}")

# Matrix addition
B = np.array([[5, 6], [7, 8]])
C = np.array([[1, 2], [3, 4]])
print(f"\n=== Matrix addition ===")
print(f"B + C =\n{B + C}")

# Transpose
print(f"\n=== Transpose ===")
print(f"A =\n{A}")
print(f"A^T =\n{A.T}")

# Tensor (3D): like a colour image
T = np.zeros((3, 4, 4))  # 3 channels, 4x4 pixels
print(f"\n=== Tensor ===")
print(f"3D tensor shape: {T.shape} (channels, height, width)")
print(f"Rank (ndim): {T.ndim}")

# 4D: batch of images
batch = np.zeros((32, 3, 28, 28))
print(f"4D tensor shape: {batch.shape} (batch, channels, height, width)")
print(f"Rank (ndim): {batch.ndim}")
```

## Visualisation — Climbing the rank ladder

Each new mathematical object adds one more *index* you can use to
address its entries. Pictures make this very visible.

```python
# ── Visualising scalars, vectors, matrices, tensors ─────────
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 4, figsize=(16, 4.5))

# (1) SCALAR (rank 0): one number. Render as a single labelled box.
# Use 0 indices to address it: there is nothing to choose.
ax = axes[0]
ax.add_patch(plt.Rectangle((0, 0), 1, 1, color="tab:blue", alpha=0.5,
                           edgecolor="navy", lw=2))
ax.text(0.5, 0.5, "7.0", ha="center", va="center", fontsize=22,
        fontweight="bold")
ax.set_title("Rank 0 — scalar\n(one number, zero indices)")
ax.set_xlim(-0.5, 1.5); ax.set_ylim(-0.5, 1.5); ax.set_aspect("equal")
ax.axis("off")

# (2) VECTOR (rank 1): a row or column of numbers; one index v[i]
# selects an entry. Drawn as 5 stacked cells with their values inside.
ax = axes[1]
v = np.array([3, 1, 4, 1, 5])
for i, val in enumerate(v):
    ax.add_patch(plt.Rectangle((0, len(v) - 1 - i), 1, 1,
                               color="tab:orange", alpha=0.5,
                               edgecolor="darkorange", lw=2))
    ax.text(0.5, len(v) - 0.5 - i, str(val), ha="center", va="center",
            fontsize=15, fontweight="bold")
    ax.text(-0.4, len(v) - 0.5 - i, f"v[{i}]", ha="center",
            va="center", fontsize=10, color="grey")
ax.set_title("Rank 1 — vector\n(one index v[i] picks an entry)")
ax.set_xlim(-1, 1.5); ax.set_ylim(-0.5, len(v) + 0.5); ax.set_aspect("equal")
ax.axis("off")

# (3) MATRIX (rank 2): rows and columns; two indices A[i, j].
# Show a 4×4 matrix as a coloured heatmap with values overlaid.
ax = axes[2]
A = np.array([[2, 7, 1, 8],
              [3, 1, 4, 1],
              [5, 9, 2, 6],
              [5, 3, 5, 8]])
im = ax.imshow(A, cmap="Greens", aspect="equal")
for i in range(A.shape[0]):
    for j in range(A.shape[1]):
        ax.text(j, i, str(A[i, j]), ha="center", va="center",
                fontsize=12, fontweight="bold",
                color="white" if A[i, j] > 5 else "black")
ax.set_title("Rank 2 — matrix\n(two indices A[i, j])")
ax.set_xticks(range(A.shape[1])); ax.set_yticks(range(A.shape[0]))

# (4) TENSOR (rank 3): a stack of matrices. Drawn as three offset slabs
# with light shading to suggest depth — three indices T[c, i, j].
ax = axes[3]
n = 4
for slab in range(3):                    # 3 channels (e.g. R, G, B)
    color = ["tab:red", "tab:green", "tab:blue"][slab]
    offset = slab * 0.35
    for i in range(n):
        for j in range(n):
            rect = plt.Rectangle((j + offset, n - 1 - i + offset), 1, 1,
                                 color=color, alpha=0.20,
                                 edgecolor=color, lw=1.2)
            ax.add_patch(rect)
ax.text(2.0, -0.7, "channels (depth)", ha="center", fontsize=10, color="grey")
ax.set_title("Rank 3 — tensor\n(three indices T[c, i, j])")
ax.set_xlim(-0.5, n + 1.5); ax.set_ylim(-1, n + 1.5); ax.set_aspect("equal")
ax.axis("off")

plt.tight_layout()
plt.show()

# Print the shape of each NumPy object so the picture matches the code.
scalar = np.array(7.0)
vector = np.array([3, 1, 4, 1, 5])
matrix = A
tensor = np.zeros((3, 4, 4))             # 3 colour channels, 4×4 image
batch  = np.zeros((32, 3, 28, 28))       # 32 mini-batch of 3-channel 28×28

print("Object  ndim  shape           example use")
print("-" * 60)
print(f"scalar    {scalar.ndim}     {str(scalar.shape):<14}  loss value, learning rate")
print(f"vector    {vector.ndim}     {str(vector.shape):<14}  feature vector, RGB triple")
print(f"matrix    {matrix.ndim}     {str(matrix.shape):<14}  weight matrix, image (greyscale)")
print(f"tensor    {tensor.ndim}     {str(tensor.shape):<14}  RGB image, sequence of vectors")
print(f"batch     {batch.ndim}     {str(batch.shape):<14}  mini-batch of RGB images")
```

**The ladder makes the pattern obvious:** each step up adds one more
*axis* (one more index). A scalar has rank 0, a vector has rank 1, a
matrix has rank 2, and so on. NumPy calls this `.ndim`; PyTorch and
TensorFlow call it the same. A *4-D tensor* `(batch, channels, height,
width)` is the canonical shape for a mini-batch of images going through
a CNN — and from this picture you can already see why: it's a stack of
3-D tensors (one per image in the batch).

## Connection to CS / Games / AI / Business / Industry

- **Vectors** — feature vectors in ML, pixel coordinates in games, RGB colour values
- **Matrices** — weight matrices in neural networks, transformation matrices in 3D graphics, adjacency matrices in graphs
- **Tensors** — image batches in CNNs, word embeddings in NLP, physics simulations
- **NumPy/PyTorch shapes** — understanding shapes prevents 90% of ML debugging headaches

## Check Your Understanding

1. **Pen & paper:** What is the shape of a matrix with 3 rows and 5 columns?  What is $a_{2,4}$ if the matrix counts up row by row (1, 2, 3, ...)?
2. **Pen & paper:** Compute $\begin{pmatrix} 2 \\ -1 \\ 4 \end{pmatrix} + \begin{pmatrix} -3 \\ 5 \\ 1 \end{pmatrix}$ and $4 \times \begin{pmatrix} 1 \\ -2 \\ 3 \end{pmatrix}$.
3. **Pen & paper:** Transpose $\begin{pmatrix} 1 & 0 \\ 2 & 3 \\ 4 & 5 \end{pmatrix}$.  What shape is the result?
4. **Think about it:** A batch of 64 RGB images, each 224×224 pixels, is stored as a tensor.  What is its shape and rank?
