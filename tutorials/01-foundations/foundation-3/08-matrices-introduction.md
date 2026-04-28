# Matrices — Introduction, Addition, and Scalar Multiplication

## Intuition

A **matrix** is a rectangular grid of numbers.  That sounds simple, but
matrices are the fundamental data structure of modern computing: a grayscale
image is a matrix of pixel intensities, a game character's position and
orientation are stored in transformation matrices, and neural networks are
chains of matrix multiplications.  This lesson introduces the basics — what
matrices are, how to add them, and how to scale them.  Full matrix
multiplication and transformations come in Tier 2.

## Prerequisites

- Foundation 1, Lesson 5: Linear Equations and Graphing

## From First Principles

### What is a matrix?

A matrix is an $m \times n$ array ($m$ rows, $n$ columns) of numbers:

$$\mathbf{A} = \begin{pmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \end{pmatrix}$$

This is a $2 \times 3$ matrix.  The entry in row $i$, column $j$ is $a_{ij}$.

### Special matrices

- **Row vector:** $1 \times n$ matrix, e.g. $\begin{pmatrix} 3 & 1 & 4 \end{pmatrix}$
- **Column vector:** $m \times 1$ matrix
- **Square matrix:** $m = n$
- **Zero matrix:** all entries are 0
- **Identity matrix:** square, with 1s on the diagonal and 0s elsewhere:

$$\mathbf{I}_3 = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix}$$

### Matrix addition

Add matrices of the **same dimensions** element by element:

$$\mathbf{A} + \mathbf{B} = \begin{pmatrix} 1 & 3 \\ 5 & 7 \end{pmatrix} + \begin{pmatrix} 2 & 0 \\ -1 & 4 \end{pmatrix} = \begin{pmatrix} 3 & 3 \\ 4 & 11 \end{pmatrix}$$

### Scalar multiplication

Multiply every entry by a scalar:

$$3 \cdot \begin{pmatrix} 2 & -1 \\ 0 & 4 \end{pmatrix} = \begin{pmatrix} 6 & -3 \\ 0 & 12 \end{pmatrix}$$

### Properties

For matrices $\mathbf{A}, \mathbf{B}, \mathbf{C}$ of the same size and scalars $c, d$:

- Commutative: $\mathbf{A} + \mathbf{B} = \mathbf{B} + \mathbf{A}$
- Associative: $(\mathbf{A} + \mathbf{B}) + \mathbf{C} = \mathbf{A} + (\mathbf{B} + \mathbf{C})$
- Distributive: $c(\mathbf{A} + \mathbf{B}) = c\mathbf{A} + c\mathbf{B}$
- Scalar associativity: $(cd)\mathbf{A} = c(d\mathbf{A})$

### Pen & paper: Image brightness

A $3 \times 3$ grayscale image (values 0-255):

$$\mathbf{P} = \begin{pmatrix} 100 & 150 & 200 \\ 50 & 120 & 180 \\ 30 & 90 & 160 \end{pmatrix}$$

**Increase brightness by 40:** Add a matrix of all 40s:

$$\mathbf{P} + 40\mathbf{J} = \begin{pmatrix} 140 & 190 & 240 \\ 90 & 160 & 220 \\ 70 & 130 & 200 \end{pmatrix}$$

**Halve brightness:** Multiply by scalar $0.5$:

$$0.5 \cdot \mathbf{P} = \begin{pmatrix} 50 & 75 & 100 \\ 25 & 60 & 90 \\ 15 & 45 & 80 \end{pmatrix}$$

### Transpose

Swap rows and columns: $(\mathbf{A}^T)_{ij} = a_{ji}$.

$$\begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{pmatrix}^T = \begin{pmatrix} 1 & 4 \\ 2 & 5 \\ 3 & 6 \end{pmatrix}$$

A $2 \times 3$ matrix becomes $3 \times 2$.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

# A 3x3 "image" as a matrix
P = np.array([[100, 150, 200],
              [50,  120, 180],
              [30,  90,  160]])

fig, axes = plt.subplots(1, 3, figsize=(12, 4))

# Original
axes[0].imshow(P, cmap='gray', vmin=0, vmax=255)
axes[0].set_title('Original')
for i in range(3):
    for j in range(3):
        axes[0].text(j, i, str(P[i, j]), ha='center', va='center',
                     color='red', fontsize=14, fontweight='bold')

# Brightened (+40)
P_bright = np.clip(P + 40, 0, 255)
axes[1].imshow(P_bright, cmap='gray', vmin=0, vmax=255)
axes[1].set_title('Brightened (+40)')
for i in range(3):
    for j in range(3):
        axes[1].text(j, i, str(P_bright[i, j]), ha='center', va='center',
                     color='red', fontsize=14, fontweight='bold')

# Halved (x0.5)
P_half = (P * 0.5).astype(int)
axes[2].imshow(P_half, cmap='gray', vmin=0, vmax=255)
axes[2].set_title('Dimmed (x0.5)')
for i in range(3):
    for j in range(3):
        axes[2].text(j, i, str(P_half[i, j]), ha='center', va='center',
                     color='red', fontsize=14, fontweight='bold')

for ax in axes:
    ax.set_xticks([0, 1, 2])
    ax.set_yticks([0, 1, 2])

plt.suptitle('Matrix Operations as Image Manipulation', fontsize=14)
plt.tight_layout()
plt.savefig('matrices_image_pixels.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Matrices: Introduction ─────────────────────────────────────
import numpy as np

# Matrix addition
A = np.array([[1, 3], [5, 7]])
B = np.array([[2, 0], [-1, 4]])
print("=== Matrix addition ===")
print(f"A =\n{A}")
print(f"B =\n{B}")
print(f"A + B =\n{A + B}")

# Scalar multiplication
print(f"\n=== Scalar multiplication ===")
C = np.array([[2, -1], [0, 4]])
print(f"3 * {C.tolist()} =\n{3 * C}")

# Image brightness example
print(f"\n=== Image brightness ===")
P = np.array([[100, 150, 200], [50, 120, 180], [30, 90, 160]])
print(f"Original:\n{P}")
print(f"Brightened (+40):\n{np.clip(P + 40, 0, 255)}")
print(f"Dimmed (x0.5):\n{(P * 0.5).astype(int)}")

# Transpose
print(f"\n=== Transpose ===")
M = np.array([[1, 2, 3], [4, 5, 6]])
print(f"M =\n{M}")
print(f"M^T =\n{M.T}")
print(f"Shape: {M.shape} → {M.T.shape}")

# Properties verification
print(f"\n=== Properties ===")
print(f"A + B == B + A: {np.array_equal(A + B, B + A)}")
print(f"2*(A+B) == 2*A + 2*B: {np.array_equal(2*(A+B), 2*A + 2*B)}")

# Identity matrix
print(f"\n=== Identity matrix ===")
I3 = np.eye(3)
print(f"I₃ =\n{I3.astype(int)}")

# Zero matrix
Z = np.zeros((2, 3))
print(f"Zero 2x3 =\n{Z.astype(int)}")
```

## Connection to CS / Games / AI / Business / Industry

- **Images** — every digital image is a matrix (or stack of matrices for RGB);
  brightness, contrast, and filters are matrix operations
- **Game transforms** — position, rotation, and scale of every object are
  stored as $4 \times 4$ matrices (Tier 8)
- **Neural networks** — a layer computes $\mathbf{y} = \mathbf{W}\mathbf{x} + \mathbf{b}$
  where $\mathbf{W}$ is a weight matrix (Tier 2 and Tier 6)
- **Adjacency matrices** — a graph with $n$ nodes is represented as an
  $n \times n$ matrix where entry $(i,j) = 1$ if there is an edge
- **Spreadsheets and databases** — a table of data is literally a matrix;
  pandas DataFrames are matrices with labels
- **GPU computing** — GPUs are optimised for massive parallel matrix operations
- **Input-output economic models** — the BEA publishes Leontief matrices $I - A$ describing how every U.S. industry consumes others' outputs; multiplying by $\mathbf{x}$ propagates an oil-price shock through the economy.
- **Variance-covariance matrices in risk** — BlackRock Aladdin and Goldman SecDB store $\Sigma$ for tens of thousands of assets; portfolio VaR is $\sqrt{\mathbf{w}^T \Sigma \mathbf{w}}$, a single matrix calculation feeding regulatory FRTB capital reports.
- **Finite-element stiffness matrices** — civil engineers at SOM and Arup assemble huge sparse stiffness matrices $\mathbf{K}\mathbf{u} = \mathbf{F}$ to analyse skyscrapers; ANSYS, Abaqus, and SAP2000 solve million-row systems each design iteration.
- **Routing & origin-destination matrices** — Google Maps Distance Matrix API and FedEx routing engines store $n \times n$ travel-time matrices; truck dispatch decisions reduce to row/column scans of these matrices.

## Check Your Understanding

1. **Pen & paper:** Given $\mathbf{A} = \begin{pmatrix} 2 & -1 & 0 \\ 3 & 4 & -2 \end{pmatrix}$ and $\mathbf{B} = \begin{pmatrix} 1 & 5 & -3 \\ 0 & 2 & 7 \end{pmatrix}$, compute $\mathbf{A} + \mathbf{B}$ and $2\mathbf{A} - \mathbf{B}$.
2. **Pen & paper:** Write the $4 \times 4$ identity matrix.  What is $5\mathbf{I}_4$?
3. **Pen & paper:** Compute the transpose of $\begin{pmatrix} 1 & 0 \\ 3 & 2 \\ 5 & 4 \end{pmatrix}$.  What are its dimensions?
4. **Coding:** Create a $5 \times 5$ matrix of random integers (0-255) in NumPy and compute its "negative" (255 minus each entry).
