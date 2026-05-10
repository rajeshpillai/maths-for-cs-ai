# Matrices — Introduction, Addition, and Scalar Multiplication

## Explain Like I Am 7

A **matrix** is a tidy egg-box of numbers — rows on top of rows, neat
columns side by side.  If two egg-boxes are exactly the same shape,
you can stack them and add the eggs square by square: *top-left adds
to top-left, top-right to top-right*, and so on.  And if you grab one
egg-box and double every egg inside, all the patterns on the box still
look the same, just bigger.  That's all this lesson asks of you — to
treat a grid of numbers like a single, friendly object.

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

### Worked examples (NCERT-style)

**Example 1 — construct a matrix from a rule.** Construct the $2 \times 3$ matrix $\mathbf{A} = [a_{ij}]$ where $a_{ij} = i + 2j$.

Apply the rule for each $(i, j)$ pair:

$$\begin{aligned}
a_{11} = 1 + 2(1) = 3, \quad a_{12} = 1 + 2(2) = 5, \quad a_{13} = 1 + 2(3) = 7 \\
a_{21} = 2 + 2(1) = 4, \quad a_{22} = 2 + 2(2) = 6, \quad a_{23} = 2 + 2(3) = 8
\end{aligned}$$

So $\mathbf{A} = \begin{pmatrix} 3 & 5 & 7 \\ 4 & 6 & 8 \end{pmatrix}$.

**Example 2 — equating two matrices.** Find $x, y, z$ from

$$\begin{pmatrix} x + y & z \\ x - y & 3 \end{pmatrix} = \begin{pmatrix} 6 & 4 \\ 2 & 3 \end{pmatrix}.$$

Two matrices are equal iff *all corresponding entries match*. Equate component-wise:

$$x + y = 6, \quad z = 4, \quad x - y = 2, \quad 3 = 3 \;\checkmark$$

Add the first and third: $2x = 8 \Rightarrow x = 4$. Subtract: $2y = 4 \Rightarrow y = 2$. So $(x, y, z) = (4, 2, 4)$.

**Example 3 — symmetric + skew decomposition.** Decompose $\mathbf{A} = \begin{pmatrix} 1 & 2 \\ 4 & 5 \end{pmatrix}$ into symmetric and skew-symmetric parts.

Compute $\mathbf{A}^T = \begin{pmatrix} 1 & 4 \\ 2 & 5 \end{pmatrix}$.

Symmetric part:

$$\mathbf{S} = \tfrac{1}{2}(\mathbf{A} + \mathbf{A}^T) = \tfrac{1}{2}\begin{pmatrix} 2 & 6 \\ 6 & 10 \end{pmatrix} = \begin{pmatrix} 1 & 3 \\ 3 & 5 \end{pmatrix}.$$

Skew-symmetric part:

$$\mathbf{K} = \tfrac{1}{2}(\mathbf{A} - \mathbf{A}^T) = \tfrac{1}{2}\begin{pmatrix} 0 & -2 \\ 2 & 0 \end{pmatrix} = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}.$$

Verify: $\mathbf{S} + \mathbf{K} = \begin{pmatrix} 1 & 2 \\ 4 & 5 \end{pmatrix} = \mathbf{A}$. ✓

Note $\mathbf{S}^T = \mathbf{S}$ (symmetric) and $\mathbf{K}^T = -\mathbf{K}$ (skew-symmetric, with diagonal entries forced to 0).

**Example 4 — solve a matrix equation.** Find matrices $\mathbf{X}$ and $\mathbf{Y}$ from

$$2\mathbf{X} + 3\mathbf{Y} = \begin{pmatrix} 2 & 3 \\ 4 & 0 \end{pmatrix}, \quad 3\mathbf{X} + 2\mathbf{Y} = \begin{pmatrix} -2 & 2 \\ 1 & -5 \end{pmatrix}.$$

Treat the matrices like scalars in a $2 \times 2$ linear system. Multiply the first by 3 and the second by 2:

$$6\mathbf{X} + 9\mathbf{Y} = \begin{pmatrix} 6 & 9 \\ 12 & 0 \end{pmatrix}, \quad 6\mathbf{X} + 4\mathbf{Y} = \begin{pmatrix} -4 & 4 \\ 2 & -10 \end{pmatrix}.$$

Subtract: $5\mathbf{Y} = \begin{pmatrix} 10 & 5 \\ 10 & 10 \end{pmatrix}$, so $\mathbf{Y} = \begin{pmatrix} 2 & 1 \\ 2 & 2 \end{pmatrix}$.

Back-substitute into the first original equation:

$$2\mathbf{X} = \begin{pmatrix} 2 & 3 \\ 4 & 0 \end{pmatrix} - 3\begin{pmatrix} 2 & 1 \\ 2 & 2 \end{pmatrix} = \begin{pmatrix} -4 & 0 \\ -2 & -6 \end{pmatrix} \;\Longrightarrow\; \mathbf{X} = \begin{pmatrix} -2 & 0 \\ -1 & -3 \end{pmatrix}.$$

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
- **Board Exam / JEE (CBSE Class 12, Chapter 3 — Matrices)** — NCERT defines a matrix $A = [a_{ij}]$ of **order** $m \times n$, lists the standard types (row, column, square, zero, diagonal, scalar, identity, equal), and the four operations: addition (same order, entry-wise), scalar multiplication, multiplication ($m \times p$ times $p \times n$ → $m \times n$), and transpose. Exercises 3.1–3.4 drill: (i) constructing $A$ from a rule like $a_{ij} = i + 2j$; (ii) solving matrix equations like $2X + 3Y = M_1$, $3X + 2Y = M_2$ for matrices $X, Y$; (iii) verifying associativity $(AB)C = A(BC)$; (iv) **decomposing** a square matrix as $A = \tfrac{1}{2}(A + A^T) + \tfrac{1}{2}(A - A^T)$ — symmetric plus skew-symmetric; (v) finding inverse by elementary row operations: $[A \mid I] \to [I \mid A^{-1}]$.
- **Common pitfalls drilled in NCERT** — (a) $AB \neq BA$ in general — matrix multiplication is **not** commutative; (b) $AB = O$ does **not** imply $A = O$ or $B = O$ — matrices have zero divisors; (c) $(A+B)^2 = A^2 + AB + BA + B^2$, *not* $A^2 + 2AB + B^2$; (d) $(AB)^T = B^T A^T$ (order **reverses**), and similarly $(AB)^{-1} = B^{-1} A^{-1}$; (e) a skew-symmetric matrix has all-zero diagonal — forced by $a_{ii} = -a_{ii}$.

## Check Your Understanding

1. **Pen & paper:** Given $\mathbf{A} = \begin{pmatrix} 2 & -1 & 0 \\ 3 & 4 & -2 \end{pmatrix}$ and $\mathbf{B} = \begin{pmatrix} 1 & 5 & -3 \\ 0 & 2 & 7 \end{pmatrix}$, compute $\mathbf{A} + \mathbf{B}$ and $2\mathbf{A} - \mathbf{B}$.
2. **Pen & paper:** Write the $4 \times 4$ identity matrix.  What is $5\mathbf{I}_4$?
3. **Pen & paper:** Compute the transpose of $\begin{pmatrix} 1 & 0 \\ 3 & 2 \\ 5 & 4 \end{pmatrix}$.  What are its dimensions?
4. **Coding:** Create a $5 \times 5$ matrix of random integers (0-255) in NumPy and compute its "negative" (255 minus each entry).
