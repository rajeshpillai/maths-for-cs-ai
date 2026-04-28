# Linear Combinations, Span, and Linear Independence

## Intuition

In a game engine, every position in the world can be built by mixing a few
direction vectors — move 3 steps east and 2 steps north.  That "mixing" is a
**linear combination**.  The set of all positions you can reach is the **span**.
If one of your direction vectors is redundant (north-east when you already have
north and east), your set is **linearly dependent** — you have wasted a
dimension.  ML models face exactly the same issue: redundant features add
parameters without adding information.

## Prerequisites

- Tier 2, Lesson 2: Vector Operations
- Tier 2, Lesson 8: Systems & Gaussian Elimination

## From First Principles

### Linear combination — definition

Given vectors $\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_k$ in $\mathbb{R}^n$
and scalars $c_1, c_2, \ldots, c_k \in \mathbb{R}$, the expression

$$c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2 + \cdots + c_k \mathbf{v}_k$$

is a **linear combination** of those vectors.  The scalars $c_i$ are called
**weights** or **coefficients**.

**Pen & paper example.**  Let
$\mathbf{v}_1 = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$ and
$\mathbf{v}_2 = \begin{pmatrix} 3 \\ 1 \end{pmatrix}$.

Compute $2\mathbf{v}_1 + 3\mathbf{v}_2$:

$$2\begin{pmatrix} 1 \\ 2 \end{pmatrix} + 3\begin{pmatrix} 3 \\ 1 \end{pmatrix} = \begin{pmatrix} 2 \\ 4 \end{pmatrix} + \begin{pmatrix} 9 \\ 3 \end{pmatrix} = \begin{pmatrix} 11 \\ 7 \end{pmatrix}$$

Every point in the plane can be written this way (we'll prove it shortly).

### Can we hit a target vector?

**Question:** Is $\mathbf{b} = \begin{pmatrix} 5 \\ 5 \end{pmatrix}$ a linear
combination of $\mathbf{v}_1$ and $\mathbf{v}_2$ above?

Set up the equation $c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2 = \mathbf{b}$:

$$c_1 \begin{pmatrix} 1 \\ 2 \end{pmatrix} + c_2 \begin{pmatrix} 3 \\ 1 \end{pmatrix} = \begin{pmatrix} 5 \\ 5 \end{pmatrix}$$

This gives the system:

$$c_1 + 3c_2 = 5$$
$$2c_1 + c_2 = 5$$

Write the augmented matrix and row-reduce (Lesson 08 technique):

$$\left(\begin{array}{cc|c} 1 & 3 & 5 \\ 2 & 1 & 5 \end{array}\right)$$

$R_2 \leftarrow R_2 - 2R_1$:

$$\left(\begin{array}{cc|c} 1 & 3 & 5 \\ 0 & -5 & -5 \end{array}\right)$$

Row 2: $-5c_2 = -5$ so $c_2 = 1$.

Row 1: $c_1 + 3(1) = 5$ so $c_1 = 2$.

**Answer:** $\mathbf{b} = 2\mathbf{v}_1 + 1\mathbf{v}_2$.  Yes, it is a linear
combination.

### Span — the set of all linear combinations

The **span** of a set of vectors $\{\mathbf{v}_1, \ldots, \mathbf{v}_k\}$ is
the set of every vector you can build using any real-valued weights:

$$\text{Span}(\mathbf{v}_1, \ldots, \mathbf{v}_k) = \{c_1\mathbf{v}_1 + \cdots + c_k\mathbf{v}_k \mid c_i \in \mathbb{R}\}$$

| Vectors | Span |
|---------|------|
| One nonzero vector in $\mathbb{R}^2$ | A line through the origin |
| Two non-parallel vectors in $\mathbb{R}^2$ | The entire plane $\mathbb{R}^2$ |
| Two parallel vectors in $\mathbb{R}^2$ | Just a line (one is redundant) |
| Three vectors in $\mathbb{R}^3$, none coplanar | All of $\mathbb{R}^3$ |

### Linear independence — no redundancy

Vectors $\mathbf{v}_1, \ldots, \mathbf{v}_k$ are **linearly independent** if
the only way to get the zero vector is the trivial combination:

$$c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \cdots + c_k\mathbf{v}_k = \mathbf{0} \quad \Longrightarrow \quad c_1 = c_2 = \cdots = c_k = 0$$

If there exist weights, **not all zero**, that produce $\mathbf{0}$, the set is
**linearly dependent** — at least one vector can be written as a combination of
the others.

### The test: row reduce and check for free variables

**Pen & paper example 1 — independent set.**

Test whether $\mathbf{v}_1 = \begin{pmatrix} 1 \\ 0 \\ 2 \end{pmatrix}$,
$\mathbf{v}_2 = \begin{pmatrix} 0 \\ 1 \\ 3 \end{pmatrix}$,
$\mathbf{v}_3 = \begin{pmatrix} 1 \\ 1 \\ 4 \end{pmatrix}$ are independent.

Set up $c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + c_3\mathbf{v}_3 = \mathbf{0}$.
Place vectors as columns of a matrix and row-reduce:

$$\mathbf{A} = \begin{pmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 2 & 3 & 4 \end{pmatrix}$$

$R_3 \leftarrow R_3 - 2R_1$:

$$\begin{pmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 0 & 3 & 2 \end{pmatrix}$$

$R_3 \leftarrow R_3 - 3R_2$:

$$\begin{pmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & -1 \end{pmatrix}$$

Three pivots, no free variables.  Every column has a pivot.
$\Rightarrow$ **Linearly independent.**

**Pen & paper example 2 — dependent set.**

Test $\mathbf{v}_1 = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$,
$\mathbf{v}_2 = \begin{pmatrix} 3 \\ 6 \end{pmatrix}$.

$$\mathbf{A} = \begin{pmatrix} 1 & 3 \\ 2 & 6 \end{pmatrix}$$

$R_2 \leftarrow R_2 - 2R_1$:

$$\begin{pmatrix} 1 & 3 \\ 0 & 0 \end{pmatrix}$$

Only one pivot.  Column 2 has no pivot — $c_2$ is a **free variable**.
$\Rightarrow$ **Linearly dependent.**

Indeed $\mathbf{v}_2 = 3\mathbf{v}_1$, so $3\mathbf{v}_1 - 1\mathbf{v}_2 = \mathbf{0}$
is a nontrivial combination giving zero.

### Quick rules of thumb

- In $\mathbb{R}^n$, at most $n$ vectors can be linearly independent.
- If you have more vectors than dimensions ($k > n$), the set is always dependent.
- Two vectors are dependent if and only if one is a scalar multiple of the other.

### Hadamard (element-wise) product

The **Hadamard product** $\mathbf{a} \odot \mathbf{b}$ multiplies matching
entries.  For vectors of the same size:

$$\mathbf{a} \odot \mathbf{b} = \begin{pmatrix} a_1 b_1 \\ a_2 b_2 \\ \vdots \\ a_n b_n \end{pmatrix}$$

This is **not** the dot product (which sums after multiplying) and **not**
matrix multiplication.  It keeps the same shape.

**Pen & paper:**

$$\begin{pmatrix} 2 \\ 3 \\ 4 \end{pmatrix} \odot \begin{pmatrix} 5 \\ -1 \\ 2 \end{pmatrix} = \begin{pmatrix} 2 \times 5 \\ 3 \times (-1) \\ 4 \times 2 \end{pmatrix} = \begin{pmatrix} 10 \\ -3 \\ 8 \end{pmatrix}$$

For matrices of the same shape ($m \times n$):

$$(\mathbf{A} \odot \mathbf{B})_{ij} = A_{ij} \cdot B_{ij}$$

**Pen & paper:**

$$\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix} \odot \begin{pmatrix} 5 & 6 \\ 7 & 8 \end{pmatrix} = \begin{pmatrix} 5 & 12 \\ 21 & 32 \end{pmatrix}$$

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

# ── Visualise span of two 2D vectors ─────────────────────
v1 = np.array([1, 2])
v2 = np.array([3, 1])

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# --- Left panel: independent vectors span all of R^2 ---
ax = axes[0]
ax.set_xlim(-2, 8)
ax.set_ylim(-2, 8)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3)
ax.axhline(0, color='k', linewidth=0.5)
ax.axvline(0, color='k', linewidth=0.5)

# Draw original vectors as arrows
ax.annotate('', xy=v1, xytext=(0, 0),
            arrowprops=dict(arrowstyle='->', color='blue', lw=2))
ax.annotate('', xy=v2, xytext=(0, 0),
            arrowprops=dict(arrowstyle='->', color='red', lw=2))
ax.text(v1[0]+0.1, v1[1]+0.2, '$\\mathbf{v}_1$', fontsize=12, color='blue')
ax.text(v2[0]+0.1, v2[1]+0.2, '$\\mathbf{v}_2$', fontsize=12, color='red')

# Plot grid of linear combinations c1*v1 + c2*v2
coeffs = np.linspace(-1, 3, 15)
for c1 in coeffs:
    for c2 in coeffs:
        p = c1 * v1 + c2 * v2
        if -2 < p[0] < 8 and -2 < p[1] < 8:
            ax.plot(p[0], p[1], 'o', color='green', alpha=0.15, markersize=4)

# Highlight specific combinations
combos = [(2, 1, '$2v_1+v_2$'), (1, 1, '$v_1+v_2$'), (0.5, 2, '$0.5v_1+2v_2$')]
for c1, c2, label in combos:
    p = c1 * v1 + c2 * v2
    ax.plot(p[0], p[1], 'ko', markersize=6)
    ax.annotate(label, xy=p, xytext=(p[0]+0.2, p[1]+0.3), fontsize=9)

ax.set_title('Independent: span = entire $\\mathbb{R}^2$')

# --- Right panel: dependent vectors span only a line ---
w1 = np.array([1, 2])
w2 = np.array([2, 4])  # w2 = 2 * w1

ax2 = axes[1]
ax2.set_xlim(-4, 6)
ax2.set_ylim(-4, 10)
ax2.set_aspect('equal')
ax2.grid(True, alpha=0.3)
ax2.axhline(0, color='k', linewidth=0.5)
ax2.axvline(0, color='k', linewidth=0.5)

ax2.annotate('', xy=w1, xytext=(0, 0),
             arrowprops=dict(arrowstyle='->', color='blue', lw=2))
ax2.annotate('', xy=w2, xytext=(0, 0),
             arrowprops=dict(arrowstyle='->', color='red', lw=2))
ax2.text(w1[0]+0.2, w1[1]+0.2, '$\\mathbf{w}_1$', fontsize=12, color='blue')
ax2.text(w2[0]+0.2, w2[1]+0.2, '$\\mathbf{w}_2$', fontsize=12, color='red')

# All linear combinations lie on the line through w1
for t in np.linspace(-2, 4, 80):
    p = t * w1
    if -4 < p[0] < 6 and -4 < p[1] < 10:
        ax2.plot(p[0], p[1], 'o', color='green', alpha=0.2, markersize=4)

ax2.set_title('Dependent: span = a line only')

plt.tight_layout()
plt.savefig('span_visualisation.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Linear Combinations, Span, Independence — from scratch ──
import numpy as np

# === 1. Linear combination ===
print("=== Linear Combination ===")
v1 = np.array([1, 2])
v2 = np.array([3, 1])
combo = 2 * v1 + 3 * v2
print(f"2*v1 + 3*v2 = 2*{v1} + 3*{v2} = {combo}")
# Expected: [11, 7]

# === 2. Express b as a linear combination ===
print("\n=== Is b in Span(v1, v2)? ===")
b = np.array([5, 5])

# Set up [v1 | v2] as column matrix and solve for weights
A = np.column_stack([v1, v2])
print(f"Coefficient matrix:\n{A}")

weights = np.linalg.solve(A, b)
print(f"Weights c1={weights[0]:.1f}, c2={weights[1]:.1f}")
print(f"Verify: {weights[0]:.1f}*{v1} + {weights[1]:.1f}*{v2} = {weights[0]*v1 + weights[1]*v2}")

# === 3. Linear independence test (from scratch row reduction) ===
print("\n=== Independence Test (3 vectors in R^3) ===")
u1 = np.array([1, 0, 2], dtype=float)
u2 = np.array([0, 1, 3], dtype=float)
u3 = np.array([1, 1, 4], dtype=float)

# Place vectors as columns
M = np.column_stack([u1, u2, u3]).copy()
print(f"Matrix (vectors as columns):\n{M}\n")

# Row reduce step by step
# R3 = R3 - 2*R1
M[2] = M[2] - 2 * M[0]
print(f"R3 -= 2*R1:\n{M}\n")

# R3 = R3 - 3*R2
M[2] = M[2] - 3 * M[1]
print(f"R3 -= 3*R2:\n{M}\n")

# Count pivots
pivots = sum(1 for row in M if np.any(np.abs(row) > 1e-10))
print(f"Pivots: {pivots}, Columns: {M.shape[1]}")
print(f"Independent: {pivots == M.shape[1]}")

# === 4. Dependent set ===
print("\n=== Dependent Set ===")
w1 = np.array([1, 2], dtype=float)
w2 = np.array([3, 6], dtype=float)  # w2 = 3*w1
D = np.column_stack([w1, w2]).copy()
print(f"Matrix:\n{D}")
D[1] = D[1] - 2 * D[0]
print(f"After R2 -= 2*R1:\n{D}")
print("Zero row means a free variable => DEPENDENT")
print(f"Verification: w2 = 3*w1 → {3*w1} == {w2}")

# === 5. NumPy shortcut: rank tells you independence ===
print("\n=== NumPy rank shortcut ===")
print(f"Rank of independent set: {np.linalg.matrix_rank(np.column_stack([u1, u2, u3]))}")
print(f"Rank of dependent set:   {np.linalg.matrix_rank(np.column_stack([w1, w2]))}")

# === 6. Hadamard (element-wise) product ===
print("\n=== Hadamard Product ===")
a = np.array([2, 3, 4])
b_vec = np.array([5, -1, 2])
had = a * b_vec  # NumPy * is element-wise by default
print(f"{a} ⊙ {b_vec} = {had}")
# Expected: [10, -3, 8]

# Matrix Hadamard
A_mat = np.array([[1, 2], [3, 4]])
B_mat = np.array([[5, 6], [7, 8]])
print(f"\nMatrix Hadamard:\n{A_mat}\n  ⊙\n{B_mat}\n  =\n{A_mat * B_mat}")
# Expected: [[5, 12], [21, 32]]

# Contrast with dot product and matrix product
print(f"\nDot product a·b      = {np.dot(a, b_vec)}")       # scalar: 15
print(f"Hadamard   a⊙b      = {a * b_vec}")                 # vector: [10, -3, 8]
print(f"Matrix product A@B   =\n{A_mat @ B_mat}")            # [[19,22],[43,50]]
print(f"Hadamard   A⊙B      =\n{A_mat * B_mat}")             # [[5,12],[21,32]]
```

## Connection to CS / Games / AI / Business / Industry

- **Neural network layers** — a neuron computes a linear combination of inputs:
  $z = w_1 x_1 + w_2 x_2 + \cdots + w_n x_n + b$.  Learning is finding the
  right weights.
- **Feature independence** — in ML, linearly dependent features are redundant.
  PCA removes them by finding a maximally independent basis (eigenvectors).
- **Span = reachable space** — in game dev, if your movement vectors don't span
  $\mathbb{R}^3$, the player is stuck on a plane or a line.
- **Rank** — the number of linearly independent columns of a matrix.  If a
  weight matrix has low rank, the network can't represent enough functions.
- **Hadamard product in gating** — LSTMs and Transformers use element-wise
  multiplication to gate information flow: $\mathbf{f}_t \odot \mathbf{c}_{t-1}$
  decides which memory cells to keep.

## Check Your Understanding

1. **Pen & paper:** Is $\begin{pmatrix} 7 \\ 4 \end{pmatrix}$ a linear
   combination of $\begin{pmatrix} 1 \\ 2 \end{pmatrix}$ and
   $\begin{pmatrix} 3 \\ 1 \end{pmatrix}$?  Find the weights by setting up
   and solving the $2 \times 2$ system.

2. **Pen & paper:** Determine whether the vectors
   $\begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix}$,
   $\begin{pmatrix} 0 \\ 1 \\ 1 \end{pmatrix}$,
   $\begin{pmatrix} 1 \\ 1 \\ 2 \end{pmatrix}$
   are linearly independent.  Place them as columns, row-reduce, and count
   pivots.

3. **Pen & paper + Python:** Compute both the Hadamard product and the dot
   product of $\begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}$ and
   $\begin{pmatrix} 4 \\ 5 \\ 6 \end{pmatrix}$ by hand, then verify in NumPy.
   Explain why the two operations give results with different shapes.
