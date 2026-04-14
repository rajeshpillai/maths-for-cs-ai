# Bases & Change of Coordinates

## Intuition

Every coordinate you have ever seen is relative to some **basis** — a chosen
set of ruler directions.  A game engine stores positions in world coordinates,
but a camera sees them in its own local coordinates; a shader needs them in
screen coordinates.  Switching between these viewpoints is a **change of basis**,
and the tool that does it is a single matrix multiplication.

## Prerequisites

- Tier 2, Lesson 9: Linear Combinations, Span, Independence
- Tier 2, Lesson 10: Subspaces
- Tier 2, Lesson 6: Identity, Inverse, Transpose

## From First Principles

### What is a basis?

A set of vectors $\{\mathbf{b}_1, \mathbf{b}_2, \ldots, \mathbf{b}_n\}$ in
$\mathbb{R}^n$ is a **basis** if it satisfies two conditions:

1. **Spanning:** every vector in $\mathbb{R}^n$ can be written as a linear
   combination of the basis vectors.
2. **Linear independence:** no basis vector can be written as a linear
   combination of the others, i.e.
   $c_1\mathbf{b}_1 + c_2\mathbf{b}_2 + \cdots + c_n\mathbf{b}_n = \mathbf{0}$
   only when $c_1 = c_2 = \cdots = c_n = 0$.

A basis for $\mathbb{R}^n$ always has exactly $n$ vectors.

### The standard basis

The most familiar basis for $\mathbb{R}^2$ is:

$$\mathbf{e}_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \quad \mathbf{e}_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$$

When you write $\mathbf{v} = \begin{pmatrix} 3 \\ 2 \end{pmatrix}$, you are
really saying $\mathbf{v} = 3\mathbf{e}_1 + 2\mathbf{e}_2$.  The numbers
$(3, 2)$ are the **coordinates of $\mathbf{v}$ relative to the standard basis**.

### A non-standard basis — pen & paper example

Define a new basis $\mathcal{B} = \{\mathbf{b}_1, \mathbf{b}_2\}$ for $\mathbb{R}^2$:

$$\mathbf{b}_1 = \begin{pmatrix} 2 \\ 1 \end{pmatrix}, \quad \mathbf{b}_2 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$$

**Step 1 — Verify independence.**

Set $c_1\mathbf{b}_1 + c_2\mathbf{b}_2 = \mathbf{0}$:

$$c_1 \begin{pmatrix} 2 \\ 1 \end{pmatrix} + c_2 \begin{pmatrix} 1 \\ 1 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$

$$\begin{cases} 2c_1 + c_2 = 0 \\ c_1 + c_2 = 0 \end{cases}$$

Subtract the second equation from the first: $c_1 = 0$.  Substituting back:
$c_2 = 0$.  Only the trivial solution — the vectors are linearly independent. ✓

**Step 2 — Verify spanning.**

Two linearly independent vectors in $\mathbb{R}^2$ automatically span
$\mathbb{R}^2$ (dimension = number of vectors = 2). ✓

So $\mathcal{B}$ is a valid basis.

### Coordinates relative to a basis (the coordinate vector)

Given the basis $\mathcal{B} = \{\mathbf{b}_1, \mathbf{b}_2\}$ and a vector
$\mathbf{v} = \begin{pmatrix} 5 \\ 3 \end{pmatrix}$ (in standard coordinates),
the **coordinate vector** $[\mathbf{v}]_\mathcal{B}$ is the pair $(c_1, c_2)$
such that:

$$\mathbf{v} = c_1 \mathbf{b}_1 + c_2 \mathbf{b}_2$$

**Pen & paper — find $[\mathbf{v}]_\mathcal{B}$:**

$$c_1 \begin{pmatrix} 2 \\ 1 \end{pmatrix} + c_2 \begin{pmatrix} 1 \\ 1 \end{pmatrix} = \begin{pmatrix} 5 \\ 3 \end{pmatrix}$$

$$\begin{cases} 2c_1 + c_2 = 5 \\ c_1 + c_2 = 3 \end{cases}$$

Subtract equation 2 from equation 1:

$$c_1 = 2$$

Substitute back into equation 2:

$$2 + c_2 = 3 \implies c_2 = 1$$

**Result:**

$$[\mathbf{v}]_\mathcal{B} = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$$

**Verify:** $2\begin{pmatrix} 2 \\ 1 \end{pmatrix} + 1\begin{pmatrix} 1 \\ 1 \end{pmatrix} = \begin{pmatrix} 4 \\ 2 \end{pmatrix} + \begin{pmatrix} 1 \\ 1 \end{pmatrix} = \begin{pmatrix} 5 \\ 3 \end{pmatrix}$ ✓

### The change-of-basis matrix

Let $\mathcal{B} = \{\mathbf{b}_1, \mathbf{b}_2\}$ and
$\mathcal{E} = \{\mathbf{e}_1, \mathbf{e}_2\}$ (standard basis).

**From $\mathcal{B}$-coordinates to standard coordinates:**

The matrix whose columns are the basis vectors converts $\mathcal{B}$-coordinates
to standard coordinates:

$$P_{\mathcal{B} \to \mathcal{E}} = \begin{pmatrix} | & | \\ \mathbf{b}_1 & \mathbf{b}_2 \\ | & | \end{pmatrix} = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}$$

$$\mathbf{v}_\text{standard} = P_{\mathcal{B} \to \mathcal{E}} \, [\mathbf{v}]_\mathcal{B}$$

**Verify:** $\begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}\begin{pmatrix} 2 \\ 1 \end{pmatrix} = \begin{pmatrix} 5 \\ 3 \end{pmatrix}$ ✓

**From standard coordinates to $\mathcal{B}$-coordinates:**

Invert the matrix:

$$P_{\mathcal{E} \to \mathcal{B}} = P_{\mathcal{B} \to \mathcal{E}}^{-1}$$

**Pen & paper — invert the 2×2 matrix:**

For $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$, the inverse is
$\frac{1}{ad - bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$.

$$\det(P) = 2 \cdot 1 - 1 \cdot 1 = 1$$

$$P^{-1} = \frac{1}{1}\begin{pmatrix} 1 & -1 \\ -1 & 2 \end{pmatrix} = \begin{pmatrix} 1 & -1 \\ -1 & 2 \end{pmatrix}$$

**Verify:** $\begin{pmatrix} 1 & -1 \\ -1 & 2 \end{pmatrix}\begin{pmatrix} 5 \\ 3 \end{pmatrix} = \begin{pmatrix} 2 \\ 1 \end{pmatrix} = [\mathbf{v}]_\mathcal{B}$ ✓

### Change of basis between two non-standard bases

Suppose you have a second basis $\mathcal{C} = \{\mathbf{c}_1, \mathbf{c}_2\}$
and you want to go from $\mathcal{B}$-coordinates to $\mathcal{C}$-coordinates
without passing through the standard basis explicitly.

The trick: go $\mathcal{B} \to \mathcal{E} \to \mathcal{C}$:

$$P_{\mathcal{B} \to \mathcal{C}} = P_{\mathcal{E} \to \mathcal{C}} \, P_{\mathcal{B} \to \mathcal{E}} = P_{\mathcal{C} \to \mathcal{E}}^{-1} \, P_{\mathcal{B} \to \mathcal{E}}$$

### Finding a basis for a subspace

Given a set of vectors, to find a basis for the subspace they span:

1. Form a matrix with the vectors as **rows**.
2. Row-reduce to echelon form.
3. The non-zero rows form a basis for the row space.

**Pen & paper example:**

Find a basis for the span of
$\begin{pmatrix}1\\2\\1\end{pmatrix}$,
$\begin{pmatrix}2\\4\\2\end{pmatrix}$,
$\begin{pmatrix}0\\1\\1\end{pmatrix}$.

Row matrix:

$$\begin{pmatrix} 1 & 2 & 1 \\ 2 & 4 & 2 \\ 0 & 1 & 1 \end{pmatrix}$$

$R_2 \leftarrow R_2 - 2R_1$:

$$\begin{pmatrix} 1 & 2 & 1 \\ 0 & 0 & 0 \\ 0 & 1 & 1 \end{pmatrix}$$

Swap $R_2$ and $R_3$:

$$\begin{pmatrix} 1 & 2 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 0 \end{pmatrix}$$

Two non-zero rows, so the subspace has dimension 2.  A basis is:

$$\left\{\begin{pmatrix}1\\2\\1\end{pmatrix},\;\begin{pmatrix}0\\1\\1\end{pmatrix}\right\}$$

(The second original vector was just $2 \times$ the first — it was redundant.)

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

# ── Visualise the same vector in two different bases ────────────────
b1 = np.array([2, 1])     # basis B vector 1
b2 = np.array([1, 1])     # basis B vector 2
v  = np.array([5, 3])     # the vector in standard coordinates
v_B = np.array([2, 1])    # the vector's coordinates in basis B

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# ── Left panel: standard basis ──────────────────────────────────────
ax = axes[0]
ax.set_xlim(-1, 7)
ax.set_ylim(-1, 5)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3)
ax.set_title('Standard Basis $\\mathcal{E}$', fontsize=13)

# Standard basis vectors
ax.annotate('', xy=(1, 0), xytext=(0, 0),
            arrowprops=dict(arrowstyle='->', color='gray', lw=2))
ax.annotate('', xy=(0, 1), xytext=(0, 0),
            arrowprops=dict(arrowstyle='->', color='gray', lw=2))
ax.text(1.1, -0.3, '$\\mathbf{e}_1$', fontsize=11, color='gray')
ax.text(-0.5, 1.0, '$\\mathbf{e}_2$', fontsize=11, color='gray')

# The vector v
ax.annotate('', xy=v, xytext=(0, 0),
            arrowprops=dict(arrowstyle='->', color='blue', lw=2.5))
ax.text(v[0]+0.1, v[1]+0.2,
        f'$\\mathbf{{v}} = ({v[0]}, {v[1]})$', fontsize=11, color='blue')

# Show decomposition along standard axes
ax.plot([v[0], v[0]], [0, v[1]], 'b--', alpha=0.3)
ax.plot([0, v[0]], [v[1], v[1]], 'b--', alpha=0.3)

# ── Right panel: basis B ────────────────────────────────────────────
ax = axes[1]
ax.set_xlim(-1, 7)
ax.set_ylim(-1, 5)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3)
ax.set_title('Basis $\\mathcal{B}$', fontsize=13)

# Basis B vectors
ax.annotate('', xy=b1, xytext=(0, 0),
            arrowprops=dict(arrowstyle='->', color='red', lw=2))
ax.annotate('', xy=b2, xytext=(0, 0),
            arrowprops=dict(arrowstyle='->', color='green', lw=2))
ax.text(b1[0]+0.1, b1[1]-0.4, '$\\mathbf{b}_1$', fontsize=11, color='red')
ax.text(b2[0]-0.6, b2[1]+0.2, '$\\mathbf{b}_2$', fontsize=11, color='green')

# The same vector v
ax.annotate('', xy=v, xytext=(0, 0),
            arrowprops=dict(arrowstyle='->', color='blue', lw=2.5))
ax.text(v[0]+0.1, v[1]+0.2,
        f'$[\\mathbf{{v}}]_\\mathcal{{B}} = ({v_B[0]}, {v_B[1]})$',
        fontsize=11, color='blue')

# Show decomposition: 2*b1 then 1*b2
scaled_b1 = v_B[0] * b1     # = (4, 2)
ax.annotate('', xy=scaled_b1, xytext=(0, 0),
            arrowprops=dict(arrowstyle='->', color='red', lw=1.5,
                            linestyle='dashed'))
ax.annotate('', xy=v, xytext=scaled_b1,
            arrowprops=dict(arrowstyle='->', color='green', lw=1.5,
                            linestyle='dashed'))
ax.text(2.0, 0.6, f'$2\\mathbf{{b}}_1$', fontsize=10, color='red')
ax.text(4.3, 2.7, f'$1\\mathbf{{b}}_2$', fontsize=10, color='green')

plt.tight_layout()
plt.savefig('change_of_basis.png', dpi=100, bbox_inches='tight')
plt.show()
print("Both panels show the SAME vector v = (5, 3).")
print("Left:  coordinates (5, 3) in standard basis.")
print("Right: coordinates (2, 1) in basis B = {(2,1), (1,1)}.")
```

## Python Verification

```python
import numpy as np

# ── 1. Define the basis and the vector ──────────────────────────────
b1 = np.array([2, 1])
b2 = np.array([1, 1])
v  = np.array([5, 3])

# ── 2. Build the change-of-basis matrix (B-coords → standard) ──────
P_B_to_E = np.column_stack([b1, b2])
print("P (B → standard):")
print(P_B_to_E)
# [[2 1]
#  [1 1]]

# ── 3. Invert to get standard → B-coords ───────────────────────────
P_E_to_B = np.linalg.inv(P_B_to_E)
print("\nP⁻¹ (standard → B):")
print(P_E_to_B)
# [[ 1 -1]
#  [-1  2]]

# ── 4. Convert v from standard to B-coordinates ────────────────────
v_B = P_E_to_B @ v
print(f"\nv in standard coords: {v}")
print(f"[v]_B  (B-coords):    {v_B}")
# [v]_B = [2, 1]

# ── 5. Convert back from B-coordinates to standard ─────────────────
v_back = P_B_to_E @ v_B
print(f"Converted back:       {v_back}")
assert np.allclose(v_back, v), "Round-trip failed!"
print("Round-trip check passed. ✓")

# ── 6. Change of basis between two non-standard bases ───────────────
# Define a second basis C
c1 = np.array([1, 0])
c2 = np.array([1, 2])
P_C_to_E = np.column_stack([c1, c2])

# B-coords → C-coords: P_{B→C} = P_{E→C} @ P_{B→E}
P_B_to_C = np.linalg.inv(P_C_to_E) @ P_B_to_E
print(f"\nP (B → C):\n{P_B_to_C}")

v_C = P_B_to_C @ v_B
print(f"[v]_C  (C-coords):    {v_C}")

# Verify: reconstruct v from C-coordinates
v_from_C = P_C_to_E @ v_C
print(f"Reconstructed from C: {v_from_C}")
assert np.allclose(v_from_C, v), "C-basis round-trip failed!"
print("C-basis round-trip check passed. ✓")

# ── 7. Finding a basis for a subspace (row reduction) ───────────────
print("\n── Finding a basis for a subspace ──")
# Three vectors in R^3, one is redundant
vectors = np.array([
    [1, 2, 1],
    [2, 4, 2],   # = 2 * first vector
    [0, 1, 1],
], dtype=float)

# Manual row reduction
A = vectors.copy()
A[1] = A[1] - 2 * A[0]          # R2 <- R2 - 2*R1
# Swap R2 and R3 to get echelon form
A[[1, 2]] = A[[2, 1]]
print("Row echelon form:")
print(A)
print("Non-zero rows (= basis):")
print(A[:2])   # first two rows
print(f"Subspace dimension: {2}")
```

## Connection to CS / Games / AI

- **Game engines** constantly convert between world, camera, and screen
  coordinates — each conversion is a change-of-basis matrix multiplication.
- **PCA** (Principal Component Analysis) is a change of basis: the new
  basis vectors are the eigenvectors of the covariance matrix, chosen so that
  the first coordinate captures the most variance in the data.
- **Neural network weight matrices** implicitly perform changes of basis,
  learning representations where the data is easier to classify.
- **Robot kinematics** use chains of change-of-basis matrices to convert
  between joint-local frames and the world frame.

## Check Your Understanding

1. Given $\mathcal{B} = \left\{\begin{pmatrix}1\\1\end{pmatrix},\;\begin{pmatrix}1\\-1\end{pmatrix}\right\}$ and $\mathbf{v} = \begin{pmatrix}4\\2\end{pmatrix}$, find $[\mathbf{v}]_\mathcal{B}$ by hand. Verify with Python.

2. If two bases $\mathcal{B}$ and $\mathcal{C}$ both have change-of-basis matrices $P_{\mathcal{B}\to\mathcal{E}}$ and $P_{\mathcal{C}\to\mathcal{E}}$ with determinant 1, what can you say about the determinant of $P_{\mathcal{B}\to\mathcal{C}}$?

3. *Coding exercise:* Write a function `change_basis(v, old_basis, new_basis)` that takes a coordinate vector and two bases (each as a list of column vectors) and returns the coordinates in the new basis.
