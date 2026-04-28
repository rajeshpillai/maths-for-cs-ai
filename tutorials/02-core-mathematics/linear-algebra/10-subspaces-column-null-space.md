# Subspaces — Column Space & Null Space

## Intuition

In machine learning, a trained weight matrix $\mathbf{A}$ can only produce
outputs that live in a specific "slice" of the full output space — that slice
is the **column space**.  Meanwhile, different inputs that the network treats
as identical (mapping to the same output) form the **null space**.  Understanding
these two subspaces tells you exactly what a linear map can and cannot do.

## Prerequisites

- Tier 2, Lesson 8: Systems & Gaussian Elimination
- Tier 2, Lesson 9: Linear Combinations, Span, Independence

## From First Principles

### What is a subspace?

A **subspace** $S$ of $\mathbb{R}^n$ is a subset that is itself a valid vector
space.  Rather than checking all ten vector-space axioms, we use three conditions
(the **subspace test**):

1. **Contains the zero vector:** $\mathbf{0} \in S$
2. **Closed under addition:** if $\mathbf{u}, \mathbf{v} \in S$ then $\mathbf{u} + \mathbf{v} \in S$
3. **Closed under scalar multiplication:** if $\mathbf{v} \in S$ and $c \in \mathbb{R}$ then $c\mathbf{v} \in S$

**Quick non-example:** The set $\{(x, y) : x \geq 0\}$ fails condition 3 —
take $\mathbf{v} = (1, 0)$ and $c = -1$; then $c\mathbf{v} = (-1, 0)$ which
is not in the set.

### Column space $C(\mathbf{A})$

Given an $m \times n$ matrix $\mathbf{A}$, its **column space** (or range) is
the set of all vectors $\mathbf{b}$ for which $\mathbf{Ax} = \mathbf{b}$ has
a solution:

$$C(\mathbf{A}) = \{\mathbf{Ax} : \mathbf{x} \in \mathbb{R}^n\}$$

This is the span of the columns of $\mathbf{A}$.  It lives in $\mathbb{R}^m$.

### Null space $N(\mathbf{A})$

The **null space** (or kernel) is the set of all inputs that $\mathbf{A}$ sends
to zero:

$$N(\mathbf{A}) = \{\mathbf{x} \in \mathbb{R}^n : \mathbf{Ax} = \mathbf{0}\}$$

It lives in $\mathbb{R}^n$.  Let's verify it is a subspace:

1. $\mathbf{A}\mathbf{0} = \mathbf{0}$ — contains zero vector. ✓
2. If $\mathbf{Au} = \mathbf{0}$ and $\mathbf{Av} = \mathbf{0}$, then $\mathbf{A}(\mathbf{u}+\mathbf{v}) = \mathbf{0}$. ✓
3. If $\mathbf{Au} = \mathbf{0}$, then $\mathbf{A}(c\mathbf{u}) = c\mathbf{0} = \mathbf{0}$. ✓

### Pen-and-paper example: find both spaces

Let:

$$\mathbf{A} = \begin{pmatrix} 1 & 2 & 1 \\ 2 & 4 & 0 \\ 0 & 0 & 2 \end{pmatrix}$$

#### Step 1 — Row reduce $\mathbf{A}$

Start with the augmented matrix $[\mathbf{A}|\mathbf{0}]$:

$$\left(\begin{array}{ccc|c} 1 & 2 & 1 & 0 \\ 2 & 4 & 0 & 0 \\ 0 & 0 & 2 & 0 \end{array}\right)$$

$R_2 \leftarrow R_2 - 2R_1$:

$$\left(\begin{array}{ccc|c} 1 & 2 & 1 & 0 \\ 0 & 0 & -2 & 0 \\ 0 & 0 & 2 & 0 \end{array}\right)$$

$R_3 \leftarrow R_3 + R_2$:

$$\left(\begin{array}{ccc|c} 1 & 2 & 1 & 0 \\ 0 & 0 & -2 & 0 \\ 0 & 0 & 0 & 0 \end{array}\right)$$

$R_2 \leftarrow -\frac{1}{2}R_2$:

$$\left(\begin{array}{ccc|c} 1 & 2 & 1 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 0 \end{array}\right)$$

$R_1 \leftarrow R_1 - R_2$:

$$\left(\begin{array}{ccc|c} 1 & 2 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 0 \end{array}\right)$$

This is **reduced row echelon form (RREF)**.

#### Step 2 — Read off the null space

Pivot columns: 1 and 3.  Free variable: $x_2 = t$.

From RREF:  $x_1 = -2t$, $x_3 = 0$.

$$N(\mathbf{A}) = \text{span}\left\{\begin{pmatrix}-2\\1\\0\end{pmatrix}\right\}$$

This is a **line** through the origin in $\mathbb{R}^3$.

#### Step 3 — Read off the column space

The pivot columns are columns 1 and 3 **of the original matrix** $\mathbf{A}$:

$$C(\mathbf{A}) = \text{span}\left\{\begin{pmatrix}1\\2\\0\end{pmatrix},\;\begin{pmatrix}1\\0\\2\end{pmatrix}\right\}$$

This is a **plane** through the origin in $\mathbf{R}^3$.

#### The Rank–Nullity Theorem (dimension check)

$$\text{rank}(\mathbf{A}) + \text{nullity}(\mathbf{A}) = n$$

Here: $2 + 1 = 3$ ✓ (where $n = 3$ is the number of columns).

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Basis vectors for column space and null space of our example
col_basis = np.array([[1, 2, 0], [1, 0, 2]])   # two basis vectors
null_basis = np.array([[-2, 1, 0]])              # one basis vector

fig = plt.figure(figsize=(12, 5))

# --- Column space (a plane through the origin) ---
ax1 = fig.add_subplot(121, projection='3d')
s = np.linspace(-1.5, 1.5, 10)
S, T = np.meshgrid(s, s)
X = col_basis[0, 0]*S + col_basis[1, 0]*T
Y = col_basis[0, 1]*S + col_basis[1, 1]*T
Z = col_basis[0, 2]*S + col_basis[1, 2]*T
ax1.plot_surface(X, Y, Z, alpha=0.25, color='steelblue')
origin = [0, 0, 0]
for i, label in enumerate(['col 1', 'col 3']):
    ax1.quiver(*origin, *col_basis[i], color='blue', arrow_length_ratio=0.12, linewidth=2)
    ax1.text(*(col_basis[i]*1.15), label, fontsize=9)
ax1.set_title('Column space C(A) — a plane')
ax1.set_xlabel('x'); ax1.set_ylabel('y'); ax1.set_zlabel('z')

# --- Null space (a line through the origin) ---
ax2 = fig.add_subplot(122, projection='3d')
t_vals = np.linspace(-2, 2, 50)
line = np.outer(t_vals, null_basis[0])
ax2.plot(line[:, 0], line[:, 1], line[:, 2], color='red', linewidth=2)
ax2.quiver(*origin, *null_basis[0], color='red', arrow_length_ratio=0.12, linewidth=2)
ax2.text(*(null_basis[0]*1.15), 'null basis', fontsize=9)
ax2.set_title('Null space N(A) — a line')
ax2.set_xlabel('x'); ax2.set_ylabel('y'); ax2.set_zlabel('z')

plt.tight_layout()
plt.savefig('subspaces_column_null.png', dpi=100)
plt.show()
print("dim C(A) =", len(col_basis), " dim N(A) =", len(null_basis),
      " sum =", len(col_basis) + len(null_basis), "(= n = 3)")
```

## Python Verification

```python
import numpy as np
from fractions import Fraction

# ── Our example matrix ──────────────────────────────────
A = np.array([
    [1, 2, 1],
    [2, 4, 0],
    [0, 0, 2]
], dtype=float)

print("A =")
print(A)

# ── Step-by-step row reduction (matching pen & paper) ───
R = A.copy()

# R2 <- R2 - 2*R1
R[1] = R[1] - 2*R[0]
print("\nAfter R2 <- R2 - 2*R1:")
print(R)

# R3 <- R3 + R2
R[2] = R[2] + R[1]
print("\nAfter R3 <- R3 + R2:")
print(R)

# R2 <- -1/2 * R2
R[1] = R[1] / (-2)
print("\nAfter R2 <- -1/2 * R2:")
print(R)

# R1 <- R1 - R2
R[0] = R[0] - R[1]
print("\nRREF:")
print(R)

# ── Null space basis ────────────────────────────────────
# Free variable x2 = 1 → x1 = -2, x3 = 0
null_vec = np.array([-2, 1, 0], dtype=float)
print("\nNull space basis vector:", null_vec)
print("Verification A @ null_vec =", A @ null_vec)  # should be [0, 0, 0]

# ── Column space basis (pivot columns of original A) ───
pivot_cols = [0, 2]
col_basis = A[:, pivot_cols]
print("\nColumn space basis (columns", pivot_cols, "of A):")
print(col_basis)

# ── Verify with numpy ──────────────────────────────────
rank = np.linalg.matrix_rank(A)
print("\nnp.linalg.matrix_rank(A) =", rank)

# Null space via SVD
U, sigma, Vt = np.linalg.svd(A)
null_mask = np.isclose(sigma, 0)
# If no zero singular values, null space has vectors in Vt beyond rank
null_space = Vt[rank:]
print("Null space from SVD:", null_space)

# Rank-nullity check
n = A.shape[1]
nullity = n - rank
print(f"\nRank-Nullity: rank={rank} + nullity={nullity} = {rank+nullity} = n={n} ✓")
```

## Connection to CS / Games / AI / Business / Industry

- **Solvability of linear systems:** $\mathbf{Ax} = \mathbf{b}$ has a solution
  if and only if $\mathbf{b} \in C(\mathbf{A})$.  This tells you whether a
  system of constraints (e.g. physics equations in a game engine) is consistent.
- **Redundant features in ML:** If your feature matrix has a large null space,
  different weight vectors produce the same predictions — the model is
  under-determined and needs regularisation.
- **PCA / dimensionality reduction:** PCA finds the column space that captures
  the most variance, discarding the "null-like" directions of noise.
- **Graphics / game engines:** The null space of a projection matrix tells you
  which 3-D movements are invisible to the camera (motion along the view axis
  in orthographic projection).
- **Rank = information capacity:** The rank of a weight matrix is the effective
  number of independent features it can learn — low-rank approximations
  (LoRA) exploit this for efficient fine-tuning.
- **Finance — arbitrage-free pricing:** A market admits an arbitrage iff a payoff vector lies outside the column space of the asset return matrix; the Arbitrage Pricing Theory of Stephen Ross is built directly on this subspace test.
- **Operations — feasibility in linear programming:** Gurobi and CPLEX, used by FedEx for route planning and by Walmart for shelf allocation, declare an LP infeasible when the right-hand-side vector falls outside the column space of the constraint matrix.
- **Engineering — controllability of aircraft:** Lockheed Martin verifies the F-35's control augmentation system is controllable iff the columns of $[\mathbf{B}, \mathbf{AB}, \mathbf{A}^2\mathbf{B}, \ldots]$ span $\mathbb{R}^n$ (Kalman's controllability subspace).
- **Science — null-space imaging in MRI:** GE compressed-sensing MRI fills in the null space of an under-sampled k-space matrix using L1 priors, cutting scan times at hospitals from 20 minutes to under 5.

## Check Your Understanding

1. **Subspace test:** Is the set $\{(x, y, z) : x + 2y - z = 0\}$ a subspace
   of $\mathbb{R}^3$?  Verify all three conditions.

2. **Find the null space:** For $\mathbf{B} = \begin{pmatrix}1 & 3 & 2\\2 & 6 & 4\end{pmatrix}$,
   row-reduce and find a basis for $N(\mathbf{B})$.  What is the nullity?

3. **Column space and rank:** For the same matrix $\mathbf{B}$ above, identify
   the pivot columns and write down a basis for $C(\mathbf{B})$.  Verify that
   rank + nullity = number of columns.
