# Dimension, Rank & Nullity — The Rank-Nullity Theorem

## Intuition

When a matrix maps vectors from $\mathbb{R}^n$ to $\mathbb{R}^m$, not all of the
output dimensions may actually get used.  **Rank** tells you how many dimensions
the output genuinely occupies — the "effective dimensionality" of the
transformation.  **Nullity** tells you how many input dimensions get crushed to
zero.  The beautiful fact: rank + nullity always equals the number of input
dimensions.

## Prerequisites

- Tier 2, Lesson 8: Systems of Linear Equations — Gaussian Elimination
- Tier 2, Lesson 10: Subspaces: Column Space & Null Space
- Tier 2, Lesson 11: Bases & Change of Coordinates

## From First Principles

### Dimension of a subspace

The **dimension** of a subspace is the number of vectors in any basis for that
subspace.

Recall that a basis is a set of vectors that is (1) linearly independent and
(2) spans the subspace.  A key theorem says: every basis for a given subspace
has the **same number** of vectors.  That count is the dimension.

| Subspace | Dimension |
|----------|-----------|
| $\{\mathbf{0}\}$ (the zero subspace) | 0 |
| A line through the origin in $\mathbb{R}^3$ | 1 |
| A plane through the origin in $\mathbb{R}^3$ | 2 |
| All of $\mathbb{R}^3$ | 3 |

### Rank of a matrix

The **rank** of a matrix $\mathbf{A}$ is the dimension of its column space:

$$\text{rank}(\mathbf{A}) = \dim(\text{Col}(\mathbf{A}))$$

Practically, rank equals the **number of pivot columns** (leading 1s) after you
row-reduce $\mathbf{A}$ to row echelon form.

### Nullity of a matrix

The **nullity** of $\mathbf{A}$ is the dimension of its null space:

$$\text{nullity}(\mathbf{A}) = \dim(\text{Null}(\mathbf{A}))$$

Practically, nullity equals the **number of free variables** (non-pivot columns)
after row reduction.

### Pen & paper: full worked example

Let $\mathbf{A}$ be this $3 \times 4$ matrix:

$$\mathbf{A} = \begin{pmatrix} 1 & 2 & 0 & 1 \\ 2 & 4 & 1 & 3 \\ 3 & 6 & 1 & 4 \end{pmatrix}$$

We have $m = 3$ rows and $n = 4$ columns.

**Step 1:** Row reduce to echelon form.

Start with the augmented setup (no right-hand side needed — we are studying
the matrix itself):

$$\begin{pmatrix} 1 & 2 & 0 & 1 \\ 2 & 4 & 1 & 3 \\ 3 & 6 & 1 & 4 \end{pmatrix}$$

$R_2 \leftarrow R_2 - 2R_1$:

$$\begin{pmatrix} 1 & 2 & 0 & 1 \\ 0 & 0 & 1 & 1 \\ 3 & 6 & 1 & 4 \end{pmatrix}$$

$R_3 \leftarrow R_3 - 3R_1$:

$$\begin{pmatrix} 1 & 2 & 0 & 1 \\ 0 & 0 & 1 & 1 \\ 0 & 0 & 1 & 1 \end{pmatrix}$$

$R_3 \leftarrow R_3 - R_2$:

$$\begin{pmatrix} 1 & 2 & 0 & 1 \\ 0 & 0 & 1 & 1 \\ 0 & 0 & 0 & 0 \end{pmatrix}$$

**Step 2:** Identify pivots and free variables.

- Pivot columns: **column 1** and **column 3** (the leftmost nonzero entry in
  each nonzero row).
- Free-variable columns: **column 2** and **column 4** (no pivot).

**Step 3:** Read off rank and nullity.

$$\text{rank}(\mathbf{A}) = \text{number of pivots} = 2$$

$$\text{nullity}(\mathbf{A}) = \text{number of free variables} = 4 - 2 = 2$$

**Step 4:** Verify the Rank-Nullity Theorem.

$$\text{rank}(\mathbf{A}) + \text{nullity}(\mathbf{A}) = 2 + 2 = 4 = n \quad \checkmark$$

### Finding the null space basis (pen & paper)

From the echelon form, write the system $\mathbf{A}\mathbf{x} = \mathbf{0}$:

$$x_1 + 2x_2 + x_4 = 0$$
$$x_3 + x_4 = 0$$

Let the free variables be parameters: $x_2 = s$, $x_4 = t$.

From equation 2: $x_3 = -t$

From equation 1: $x_1 = -2s - t$

$$\mathbf{x} = s\begin{pmatrix} -2 \\ 1 \\ 0 \\ 0 \end{pmatrix} + t\begin{pmatrix} -1 \\ 0 \\ -1 \\ 1 \end{pmatrix}$$

The null space has **two** basis vectors, confirming nullity = 2.

### The Rank-Nullity Theorem

For any $m \times n$ matrix $\mathbf{A}$:

$$\boxed{\text{rank}(\mathbf{A}) + \text{nullity}(\mathbf{A}) = n}$$

where $n$ is the number of columns.

**Why it is true (intuition):** Every column is either a pivot column or a free
column.  Pivot columns contribute to rank (they form independent directions in
the output).  Free columns contribute to nullity (each free variable generates
one basis vector of the null space).  Since every column is one or the other:

$$\text{pivots} + \text{free variables} = \text{total columns}$$

This is exactly rank + nullity = $n$.

### The Invertible Matrix Theorem (updated)

For a **square** $n \times n$ matrix $\mathbf{A}$, the following are all
equivalent — if any one is true, they are all true:

| # | Condition |
|---|-----------|
| 1 | $\mathbf{A}$ is invertible |
| 2 | $\text{rank}(\mathbf{A}) = n$ |
| 3 | $\text{nullity}(\mathbf{A}) = 0$ |
| 4 | The columns of $\mathbf{A}$ are linearly independent |
| 5 | The rows of $\mathbf{A}$ are linearly independent |
| 6 | $\det(\mathbf{A}) \neq 0$ |
| 7 | $\mathbf{A}\mathbf{x} = \mathbf{b}$ has a unique solution for every $\mathbf{b}$ |
| 8 | $\text{Null}(\mathbf{A}) = \{\mathbf{0}\}$ |
| 9 | The row echelon form has $n$ pivots |

**Pen & paper check:** Our $3 \times 4$ matrix is not square, so invertibility
does not apply.  But consider the $3 \times 3$ submatrix formed by dropping
column 4:

$$\mathbf{B} = \begin{pmatrix} 1 & 2 & 0 \\ 2 & 4 & 1 \\ 3 & 6 & 1 \end{pmatrix}$$

Row reduce: same steps give the echelon form with a zero row, so
$\text{rank}(\mathbf{B}) = 2 < 3$.  Therefore $\mathbf{B}$ is **not invertible**,
$\text{nullity}(\mathbf{B}) = 1$, and $\det(\mathbf{B}) = 0$.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

# ── Rank-Nullity Theorem: schematic diagram ─────────────────
fig, ax = plt.subplots(figsize=(9, 4))
ax.set_xlim(-0.5, 10.5)
ax.set_ylim(-1.5, 4.5)
ax.set_aspect("equal")
ax.axis("off")
ax.set_title("Rank-Nullity Theorem:  rank(A) + nullity(A) = n",
             fontsize=13, fontweight="bold", pad=12)

# ── Input space R^n (left) ──────────────────────────────────
input_box = mpatches.FancyBboxPatch(
    (0.2, 0.2), 3.0, 3.5, boxstyle="round,pad=0.2",
    facecolor="#d0e8ff", edgecolor="#2060a0", linewidth=2)
ax.add_patch(input_box)
ax.text(1.7, 3.9, r"$\mathbb{R}^n$  (input)", ha="center",
        fontsize=11, fontweight="bold", color="#2060a0")

# Null space inside input box
null_box = mpatches.FancyBboxPatch(
    (0.5, 0.5), 1.1, 2.8, boxstyle="round,pad=0.15",
    facecolor="#ffd0d0", edgecolor="#a02020", linewidth=1.5)
ax.add_patch(null_box)
ax.text(1.05, 2.1, "Null(A)", ha="center", fontsize=9,
        fontweight="bold", color="#a02020")
ax.text(1.05, 1.5, f"dim = nullity", ha="center", fontsize=8,
        color="#a02020")

# Complement inside input box (maps to column space)
comp_box = mpatches.FancyBboxPatch(
    (1.9, 0.5), 1.1, 2.8, boxstyle="round,pad=0.15",
    facecolor="#d0ffd0", edgecolor="#20a020", linewidth=1.5)
ax.add_patch(comp_box)
ax.text(2.45, 2.1, "Row(A)", ha="center", fontsize=9,
        fontweight="bold", color="#20a020")
ax.text(2.45, 1.5, f"dim = rank", ha="center", fontsize=8,
        color="#20a020")

# ── Arrow for the mapping A ────────────────────────────────
ax.annotate("", xy=(6.3, 2.0), xytext=(3.8, 2.0),
            arrowprops=dict(arrowstyle="-|>", lw=2, color="#333333"))
ax.text(5.05, 2.45, r"$\mathbf{A}$", fontsize=14,
        fontweight="bold", ha="center", color="#333333")

# ── Output space R^m (right) ───────────────────────────────
output_box = mpatches.FancyBboxPatch(
    (6.5, 0.2), 3.5, 3.5, boxstyle="round,pad=0.2",
    facecolor="#fff3d0", edgecolor="#a07020", linewidth=2)
ax.add_patch(output_box)
ax.text(8.25, 3.9, r"$\mathbb{R}^m$  (output)", ha="center",
        fontsize=11, fontweight="bold", color="#a07020")

# Column space inside output box
col_box = mpatches.FancyBboxPatch(
    (7.0, 0.5), 2.5, 2.8, boxstyle="round,pad=0.15",
    facecolor="#d0ffd0", edgecolor="#20a020", linewidth=1.5)
ax.add_patch(col_box)
ax.text(8.25, 2.1, "Col(A)", ha="center", fontsize=9,
        fontweight="bold", color="#20a020")
ax.text(8.25, 1.5, f"dim = rank", ha="center", fontsize=8,
        color="#20a020")

# ── Null space arrow to zero ────────────────────────────────
ax.annotate("", xy=(6.95, 0.7), xytext=(1.6, 0.7),
            arrowprops=dict(arrowstyle="-|>", lw=1.5,
                            color="#a02020", linestyle="dashed"))
ax.text(4.2, 0.25, r"maps to $\mathbf{0}$", fontsize=8,
        ha="center", color="#a02020", style="italic")
ax.plot(7.05, 0.7, "o", color="#a02020", markersize=6)
ax.text(7.25, 0.55, r"$\mathbf{0}$", fontsize=9, color="#a02020")

# ── Bottom label ────────────────────────────────────────────
ax.text(5.25, -1.0,
        r"rank($\mathbf{A}$) + nullity($\mathbf{A}$) = $n$"
        r"    [pivots + free variables = columns]",
        ha="center", fontsize=11, fontweight="bold",
        bbox=dict(boxstyle="round,pad=0.3", facecolor="#f0f0f0",
                  edgecolor="#666666"))

plt.tight_layout()
plt.savefig("rank_nullity_diagram.png", dpi=150, bbox_inches="tight")
plt.show()
print("Diagram saved.")
```

## Python Verification

```python
import numpy as np

# ── The same 3x4 matrix from the pen & paper section ───────
A = np.array([
    [1, 2, 0, 1],
    [2, 4, 1, 3],
    [3, 6, 1, 4]
], dtype=float)

m, n = A.shape
print(f"Matrix A ({m}x{n}):")
print(A)
print()

# ── Step 1: Row reduce by hand (reproduce in code) ─────────
R = A.copy()

# R2 <- R2 - 2*R1
R[1] = R[1] - 2 * R[0]
print("After R2 <- R2 - 2*R1:")
print(R)

# R3 <- R3 - 3*R1
R[2] = R[2] - 3 * R[0]
print("\nAfter R3 <- R3 - 3*R1:")
print(R)

# R3 <- R3 - R2
R[2] = R[2] - R[1]
print("\nRow echelon form:")
print(R)

# ── Step 2: Count pivots ───────────────────────────────────
# Pivot in row 0 col 0, pivot in row 1 col 2
# Row 2 is all zeros -> no pivot
pivot_count = np.sum(np.any(R != 0, axis=1))  # nonzero rows
print(f"\nNumber of pivots (nonzero rows): {pivot_count}")

# ── Step 3: Rank via numpy ─────────────────────────────────
rank = np.linalg.matrix_rank(A)
print(f"np.linalg.matrix_rank(A) = {rank}")

# ── Step 4: Nullity ────────────────────────────────────────
nullity = n - rank
print(f"nullity(A) = n - rank = {n} - {rank} = {nullity}")

# ── Step 5: Verify rank-nullity theorem ────────────────────
print(f"\nRank-Nullity check: rank + nullity = {rank} + {nullity} = {rank + nullity}")
print(f"Number of columns n = {n}")
assert rank + nullity == n, "Theorem violated!"
print("Rank-Nullity Theorem verified. ✓")

# ── Step 6: Compute null space basis ───────────────────────
# Null space = vectors x such that Ax = 0
# From pen & paper: x2 = s, x4 = t are free
# x3 = -t, x1 = -2s - t
v1 = np.array([-2, 1, 0, 0])   # s = 1, t = 0
v2 = np.array([-1, 0, -1, 1])  # s = 0, t = 1

print(f"\nNull space basis vector 1: {v1}")
print(f"  A @ v1 = {A @ v1}")    # should be [0, 0, 0]

print(f"\nNull space basis vector 2: {v2}")
print(f"  A @ v2 = {A @ v2}")    # should be [0, 0, 0]

print(f"\nNull space dimension = {len([v1, v2])} = nullity ✓")

# ── Step 7: Square matrix example ──────────────────────────
print("\n" + "=" * 50)
print("Square matrix example (Invertible Matrix Theorem)")
print("=" * 50)

C = np.array([
    [1, 2, 0],
    [2, 4, 1],
    [3, 6, 1]
], dtype=float)

rank_C = np.linalg.matrix_rank(C)
det_C = np.linalg.det(C)
nullity_C = C.shape[1] - rank_C

print(f"\nMatrix C (3x3):\n{C}")
print(f"rank(C) = {rank_C}")
print(f"nullity(C) = {nullity_C}")
print(f"det(C) = {det_C:.4f}")
print(f"Invertible? {rank_C == C.shape[1]}")
print(f"Consistent: rank < n and det ≈ 0 and nullity > 0? "
      f"{rank_C < C.shape[1] and abs(det_C) < 1e-10 and nullity_C > 0}")

# ── Step 8: An invertible square matrix for contrast ───────
D = np.array([
    [1, 0, 2],
    [0, 1, 3],
    [1, 1, 4]
], dtype=float)

rank_D = np.linalg.matrix_rank(D)
det_D = np.linalg.det(D)
nullity_D = D.shape[1] - rank_D

print(f"\nMatrix D (3x3):\n{D}")
print(f"rank(D) = {rank_D}")
print(f"nullity(D) = {nullity_D}")
print(f"det(D) = {det_D:.4f}")
print(f"Invertible? {rank_D == D.shape[1]}")
```

## Connection to CS / Games / AI / Business / Industry

- **Data compression / PCA:** The rank of a data matrix tells you how many
  independent features the data truly has.  If a 100-column dataset has rank 5,
  you can compress it to 5 dimensions without information loss.

- **Underdetermined systems in games:** A physics engine solving constraints
  with more unknowns than equations has nullity > 0 — the null space represents
  the degrees of freedom left over, which the engine fills with heuristics.

- **Neural network weight matrices:** If a weight matrix has low rank, it means
  the layer is not using all its capacity — this insight powers **low-rank
  adaptation (LoRA)** for fine-tuning large language models.

- **Solving linear systems:** rank tells you whether a system $\mathbf{Ax} = \mathbf{b}$
  has zero, one, or infinitely many solutions:
  - rank $= n$ and consistent $\Rightarrow$ unique solution
  - rank $< n$ and consistent $\Rightarrow$ infinitely many (null space gives the family)
  - rank of augmented matrix $>$ rank of $\mathbf{A}$ $\Rightarrow$ no solution

- **Google PageRank:** The eigenvector that PageRank computes lives in the
  column space of the link matrix.  Understanding rank ensures the solution
  exists and is unique.

## Check Your Understanding

1. **Pen & paper:** Row reduce the matrix below and find its rank and nullity.
   Verify that rank + nullity equals the number of columns.

   $$\mathbf{M} = \begin{pmatrix} 1 & 3 & 5 & 7 \\ 2 & 6 & 10 & 14 \\ 0 & 1 & 2 & 3 \end{pmatrix}$$

   *(Hint: look at the relationship between rows 1 and 2.)*

2. **True or false:** A $5 \times 3$ matrix can have rank 4.  Explain why.

3. **Coding exercise:** Write a function `rank_nullity(A)` that takes a NumPy
   array, computes rank via `np.linalg.matrix_rank`, derives nullity from the
   theorem, and returns both.  Test it on at least three matrices of different
   shapes.

4. **Conceptual:** If a $4 \times 4$ matrix has nullity 2, what does that tell
   you about its determinant?  Is the matrix invertible?  How many linearly
   independent columns does it have?
