# Symmetric Matrices & the Spectral Theorem — Nature's Favourite Matrices

## Intuition

Many real-world matrices are symmetric: covariance matrices, distance matrices,
graph Laplacians, Hessians of loss functions.  Symmetric matrices are special
because they always have **real eigenvalues** and **orthogonal eigenvectors**.
This means you can decompose them into clean, perpendicular axes of action —
no shearing, no complex numbers, just stretching along perpendicular directions.
When a symmetric matrix transforms a unit circle, the result is always an
**axis-aligned ellipse** whose axes point along the eigenvectors.

## Prerequisites

- Tier 2, Lesson 13: Eigenvalues & Eigenvectors
- Tier 2, Lesson 6: Identity, Inverse, Transpose

## From First Principles

### What is a symmetric matrix?

A matrix $\mathbf{A}$ is **symmetric** if $\mathbf{A} = \mathbf{A}^T$, meaning
$a_{ij} = a_{ji}$ for all $i, j$.  It is mirrored across the main diagonal:

$$\mathbf{A} = \begin{pmatrix} 2 & 3 \\ 3 & 5 \end{pmatrix} \quad \Longrightarrow \quad \mathbf{A}^T = \begin{pmatrix} 2 & 3 \\ 3 & 5 \end{pmatrix} = \mathbf{A} \;\checkmark$$

Only **square** matrices can be symmetric.  The diagonal entries are unrestricted;
the off-diagonal entries must satisfy $a_{ij} = a_{ji}$.

### Where symmetric matrices arise

- **Covariance matrix:** $\mathbf{C} = \frac{1}{n}\mathbf{X}^T\mathbf{X}$ — always symmetric
- **Hessian:** second partial derivatives commute, so $\frac{\partial^2 f}{\partial x_i \partial x_j} = \frac{\partial^2 f}{\partial x_j \partial x_i}$
- **Graph Laplacian:** $\mathbf{L} = \mathbf{D} - \mathbf{A}$ for undirected graphs
- **Quadratic forms:** any expression $\mathbf{x}^T\mathbf{A}\mathbf{x}$ can use a symmetric $\mathbf{A}$

### The Spectral Theorem (real case)

**Theorem:** Every real symmetric matrix $\mathbf{A}$ satisfies:

1. All eigenvalues are **real numbers**
2. Eigenvectors corresponding to **distinct** eigenvalues are **orthogonal**
3. $\mathbf{A}$ can be **orthogonally diagonalised**:

$$\mathbf{A} = \mathbf{Q}\mathbf{D}\mathbf{Q}^T$$

where $\mathbf{Q}$ is an orthogonal matrix ($\mathbf{Q}^T\mathbf{Q} = \mathbf{I}$)
whose columns are unit eigenvectors, and $\mathbf{D}$ is diagonal with eigenvalues.

**Why eigenvalues are real (sketch):** Suppose $\mathbf{A}\mathbf{v} = \lambda\mathbf{v}$.
Take the conjugate transpose of both sides:
$\mathbf{v}^H\mathbf{A}^T = \bar{\lambda}\mathbf{v}^H$.
Since $\mathbf{A} = \mathbf{A}^T$, multiply the original equation on the left by $\mathbf{v}^H$:

$$\mathbf{v}^H\mathbf{A}\mathbf{v} = \lambda(\mathbf{v}^H\mathbf{v}) = \bar{\lambda}(\mathbf{v}^H\mathbf{v})$$

Since $\mathbf{v}^H\mathbf{v} > 0$, we get $\lambda = \bar{\lambda}$, so $\lambda$ is real.

**Why eigenvectors are orthogonal:** Let $\mathbf{A}\mathbf{v}_1 = \lambda_1\mathbf{v}_1$
and $\mathbf{A}\mathbf{v}_2 = \lambda_2\mathbf{v}_2$ with $\lambda_1 \neq \lambda_2$.

$$\lambda_1(\mathbf{v}_1 \cdot \mathbf{v}_2) = (\mathbf{A}\mathbf{v}_1)^T\mathbf{v}_2 = \mathbf{v}_1^T\mathbf{A}^T\mathbf{v}_2 = \mathbf{v}_1^T\mathbf{A}\mathbf{v}_2 = \lambda_2(\mathbf{v}_1 \cdot \mathbf{v}_2)$$

So $(\lambda_1 - \lambda_2)(\mathbf{v}_1 \cdot \mathbf{v}_2) = 0$.  Since $\lambda_1 \neq \lambda_2$,
we must have $\mathbf{v}_1 \cdot \mathbf{v}_2 = 0$ — orthogonal.

### Pen & paper: full 2x2 example

$$\mathbf{A} = \begin{pmatrix} 3 & 1 \\ 1 & 3 \end{pmatrix}$$

**Step 1 — Verify symmetric:** $a_{12} = 1 = a_{21}$ ✓

**Step 2 — Characteristic equation:**

$$\det(\mathbf{A} - \lambda\mathbf{I}) = \det\begin{pmatrix} 3-\lambda & 1 \\ 1 & 3-\lambda \end{pmatrix} = (3-\lambda)^2 - 1 = 0$$

$$9 - 6\lambda + \lambda^2 - 1 = 0 \;\;\Longrightarrow\;\; \lambda^2 - 6\lambda + 8 = 0$$

$$(\lambda - 4)(\lambda - 2) = 0$$

**Eigenvalues:** $\lambda_1 = 4$, $\lambda_2 = 2$ — both real ✓

**Sanity check:** trace $= 3 + 3 = 6 = 4 + 2$ ✓, det $= 9 - 1 = 8 = 4 \times 2$ ✓

**Step 3 — Eigenvectors:**

For $\lambda_1 = 4$: $(\mathbf{A} - 4\mathbf{I})\mathbf{v} = \begin{pmatrix} -1 & 1 \\ 1 & -1 \end{pmatrix}\mathbf{v} = \mathbf{0}$

Row 1: $-v_1 + v_2 = 0$ → $\mathbf{v}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$

For $\lambda_2 = 2$: $(\mathbf{A} - 2\mathbf{I})\mathbf{v} = \begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}\mathbf{v} = \mathbf{0}$

Row 1: $v_1 + v_2 = 0$ → $\mathbf{v}_2 = \begin{pmatrix} 1 \\ -1 \end{pmatrix}$

**Step 4 — Verify orthogonality:**

$$\mathbf{v}_1 \cdot \mathbf{v}_2 = (1)(1) + (1)(-1) = 0 \;\checkmark$$

**Step 5 — Normalise to unit vectors:**

$$\hat{\mathbf{q}}_1 = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix}, \quad \hat{\mathbf{q}}_2 = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ -1 \end{pmatrix}$$

**Step 6 — Orthogonal diagonalisation:**

$$\mathbf{Q} = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}, \quad \mathbf{D} = \begin{pmatrix} 4 & 0 \\ 0 & 2 \end{pmatrix}$$

$$\mathbf{A} = \mathbf{Q}\mathbf{D}\mathbf{Q}^T$$

Note: for an orthogonal matrix, $\mathbf{Q}^{-1} = \mathbf{Q}^T$ — no need to
compute an inverse!

**Verify by hand:** $\mathbf{Q}\mathbf{D}\mathbf{Q}^T = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}\begin{pmatrix} 4 & 0 \\ 0 & 2 \end{pmatrix}\frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$

$= \frac{1}{2}\begin{pmatrix} 4 & 2 \\ 4 & -2 \end{pmatrix}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix} = \frac{1}{2}\begin{pmatrix} 6 & 2 \\ 2 & 6 \end{pmatrix} = \begin{pmatrix} 3 & 1 \\ 1 & 3 \end{pmatrix}$ ✓

### Quadratic forms and ellipses

A **quadratic form** is $f(\mathbf{x}) = \mathbf{x}^T\mathbf{A}\mathbf{x}$.
For our example:

$$f(x_1, x_2) = 3x_1^2 + 2x_1 x_2 + 3x_2^2$$

The level set $f(\mathbf{x}) = c$ is an **ellipse**.  The Spectral Theorem tells
us the eigenvectors are the axes of the ellipse, and the eigenvalues determine
the radii: $r_i = \sqrt{c / \lambda_i}$.

In the eigenvector coordinate system (rotated by $\mathbf{Q}^T$), the cross
terms vanish and we get $4y_1^2 + 2y_2^2 = c$ — a clean axis-aligned ellipse.

## Visualisation

```python
# ── Symmetric matrix transforms unit circle into ellipse ──
import numpy as np
import matplotlib.pyplot as plt

A = np.array([[3, 1], [1, 3]])

# Eigendecomposition
eigenvalues, Q = np.linalg.eigh(A)  # eigh for symmetric matrices
print(f"Eigenvalues: {eigenvalues}")
print(f"Eigenvectors (columns of Q):\n{Q}")
print(f"Q^T @ Q (should be I):\n{np.round(Q.T @ Q, 10)}")

# Unit circle: 200 points on the circle
theta = np.linspace(0, 2 * np.pi, 200)
circle = np.array([np.cos(theta), np.sin(theta)])  # shape (2, 200)

# Transform circle by A
ellipse = A @ circle  # shape (2, 200)

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Left: unit circle with eigenvectors
ax = axes[0]
ax.plot(circle[0], circle[1], 'b-', linewidth=1.5, label='Unit circle')
for i in range(2):
    v = Q[:, i]
    ax.annotate('', xy=v, xytext=(0, 0),
                arrowprops=dict(arrowstyle='->', color='red', lw=2))
    ax.text(v[0]*1.15, v[1]*1.15, f'q{i+1}', color='red', fontsize=12, ha='center')
ax.set_xlim(-2, 2); ax.set_ylim(-2, 2)
ax.set_aspect('equal'); ax.grid(True, alpha=0.3)
ax.set_title('Before: unit circle + eigenvectors')
ax.legend()

# Right: ellipse with scaled eigenvectors
ax = axes[1]
ax.plot(ellipse[0], ellipse[1], 'b-', linewidth=1.5, label='A @ circle (ellipse)')
for i in range(2):
    v = eigenvalues[i] * Q[:, i]  # eigenvector scaled by eigenvalue
    ax.annotate('', xy=v, xytext=(0, 0),
                arrowprops=dict(arrowstyle='->', color='red', lw=2))
    ax.text(v[0]*1.15, v[1]*1.15, f'λ{i+1}·q{i+1} (λ={eigenvalues[i]:.0f})',
            color='red', fontsize=10, ha='center')
ax.set_xlim(-5, 5); ax.set_ylim(-5, 5)
ax.set_aspect('equal'); ax.grid(True, alpha=0.3)
ax.set_title('After: ellipse aligned with eigenvectors')
ax.legend()

plt.tight_layout()
plt.savefig('symmetric_ellipse.png', dpi=100, bbox_inches='tight')
plt.show()
```

## Python Verification

```python
# ── Spectral Theorem: orthogonal diagonalisation ────────────
import numpy as np

A = np.array([[3, 1], [1, 3]])

# Step 1: Verify symmetry
print("=== Symmetry Check ===")
print(f"A = A^T? {np.allclose(A, A.T)}")

# Step 2: Eigendecomposition (eigh guarantees real, sorted eigenvalues)
eigenvalues, Q = np.linalg.eigh(A)
print(f"\n=== Eigenvalues & Eigenvectors ===")
print(f"Eigenvalues: {eigenvalues}")
print(f"Q (unit eigenvectors as columns):\n{np.round(Q, 6)}")

# Step 3: Verify orthogonality of eigenvectors
dot = Q[:, 0] @ Q[:, 1]
print(f"\n=== Orthogonality ===")
print(f"q1 · q2 = {dot:.10f}  (should be 0)")
print(f"Q^T @ Q =\n{np.round(Q.T @ Q, 10)}  (should be I)")

# Step 4: Reconstruct A = Q D Q^T
D = np.diag(eigenvalues)
A_rebuilt = Q @ D @ Q.T
print(f"\n=== Spectral Decomposition A = Q D Q^T ===")
print(f"Q @ D @ Q^T =\n{np.round(A_rebuilt, 10)}")
print(f"Matches A? {np.allclose(A, A_rebuilt)}")

# Step 5: No inverse needed — Q^T = Q^{-1}
Q_inv = np.linalg.inv(Q)
print(f"\n=== Q^T == Q^{{-1}}? ===")
print(f"Max difference: {np.max(np.abs(Q.T - Q_inv)):.2e}")

# Step 6: Quadratic form in original vs rotated coordinates
x = np.array([1.0, 0.5])
quad_original = x @ A @ x
y = Q.T @ x  # rotate to eigenvector coordinates
quad_rotated = eigenvalues[0] * y[0]**2 + eigenvalues[1] * y[1]**2
print(f"\n=== Quadratic Form ===")
print(f"x^T A x = {quad_original:.4f}")
print(f"λ1·y1² + λ2·y2² = {quad_rotated:.4f}")
print(f"Match? {np.allclose(quad_original, quad_rotated)}")
```

## Connection to CS / Games / AI

- **PCA** — the covariance matrix is symmetric; its eigenvectors (principal components) are guaranteed orthogonal by the Spectral Theorem
- **Hessian analysis** — the Hessian of a loss function is symmetric; its eigenvalues tell you if a critical point is a minimum (all positive), maximum (all negative), or saddle point (mixed)
- **Spectral clustering** — uses eigenvectors of the symmetric graph Laplacian to embed nodes before clustering
- **Physics engines** — inertia tensors are symmetric; eigenvectors give the principal axes of rotation
- **Quadratic forms in optimisation** — $\mathbf{x}^T\mathbf{A}\mathbf{x}$ with positive eigenvalues means a convex bowl — gradient descent will converge

## Check Your Understanding

1. **Pen & paper:** Is $\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$ symmetric?  Why or why not?
2. **Pen & paper:** Find the eigenvalues and orthonormal eigenvectors of $\begin{pmatrix} 5 & 2 \\ 2 & 5 \end{pmatrix}$.  Verify $\mathbf{A} = \mathbf{Q}\mathbf{D}\mathbf{Q}^T$ by hand.
3. **Think about it:** If all eigenvalues of a symmetric matrix are positive, what shape is the quadratic form $\mathbf{x}^T\mathbf{A}\mathbf{x} = 1$?  What if one eigenvalue is negative?
4. **Coding:** Modify the visualisation code to use $\mathbf{A} = \begin{pmatrix} 5 & 2 \\ 2 & 1 \end{pmatrix}$.  How does the ellipse change?
