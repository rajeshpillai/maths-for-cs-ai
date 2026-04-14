# Quadratic Forms, Definiteness & the Pseudoinverse

## Intuition

When a neural network's loss surface curves like a bowl, gradient descent rolls
smoothly to the bottom — that is a **positive definite** Hessian.  When the
surface is saddle-shaped, some directions go up and others go down — that is
**indefinite**.  Quadratic forms give us a single number that captures how a
matrix "curves" space, and definiteness tells us the shape of that curvature.
Understanding this is the key to knowing whether an optimiser is converging,
whether a covariance matrix is valid, or whether a quadratic constraint in a
game engine describes an ellipse or a hyperbola.

## Prerequisites

- Tier 2, Lesson 15: Symmetric Matrices & Spectral Theorem (eigendecomposition of symmetric matrices)
- Tier 2, Lesson 19: Gram-Schmidt Process (orthonormal bases, QR)

## From First Principles

### Bilinear forms

A **bilinear form** takes two vectors and produces a scalar, linear in each
argument separately:

$$B(\mathbf{x}, \mathbf{y}) = \mathbf{x}^T \mathbf{A} \mathbf{y}$$

where $\mathbf{A}$ is an $n \times n$ matrix.  For $n = 2$:

$$B(\mathbf{x}, \mathbf{y}) = \begin{pmatrix} x_1 & x_2 \end{pmatrix} \begin{pmatrix} a & b \\ c & d \end{pmatrix} \begin{pmatrix} y_1 \\ y_2 \end{pmatrix} = a\,x_1 y_1 + b\,x_1 y_2 + c\,x_2 y_1 + d\,x_2 y_2$$

The dot product is a special case where $\mathbf{A} = \mathbf{I}$.

### Quadratic forms

Set $\mathbf{y} = \mathbf{x}$ in the bilinear form:

$$Q(\mathbf{x}) = \mathbf{x}^T \mathbf{A} \mathbf{x}$$

For a $2 \times 2$ symmetric matrix $\mathbf{A} = \begin{pmatrix} a & b \\ b & d \end{pmatrix}$, expand by hand:

$$Q(\mathbf{x}) = \begin{pmatrix} x_1 & x_2 \end{pmatrix} \begin{pmatrix} a & b \\ b & d \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix}$$

**Step 1.** Multiply $\mathbf{A}\mathbf{x}$:

$$\mathbf{A}\mathbf{x} = \begin{pmatrix} a\,x_1 + b\,x_2 \\ b\,x_1 + d\,x_2 \end{pmatrix}$$

**Step 2.** Dot with $\mathbf{x}^T$:

$$Q(\mathbf{x}) = x_1(a\,x_1 + b\,x_2) + x_2(b\,x_1 + d\,x_2) = a\,x_1^2 + 2b\,x_1 x_2 + d\,x_2^2$$

Note the $2b$ cross-term — both off-diagonal entries contribute once each.
We can always assume $\mathbf{A}$ is symmetric because for any matrix $\mathbf{M}$,
$\mathbf{x}^T \mathbf{M} \mathbf{x} = \mathbf{x}^T \bigl(\tfrac{1}{2}(\mathbf{M} + \mathbf{M}^T)\bigr) \mathbf{x}$.

### Definiteness — three types

Let $\mathbf{A}$ be a real symmetric $n \times n$ matrix with eigenvalues $\lambda_1, \dots, \lambda_n$.

| Type | Eigenvalue condition | Shape of $Q = c$ level set (2D) |
|------|---------------------|---------------------------------|
| **Positive definite** (PD) | All $\lambda_i > 0$ | Ellipse (bowl up) |
| **Negative definite** (ND) | All $\lambda_i < 0$ | Ellipse (bowl down) |
| **Indefinite** | Mixed signs | Hyperbola (saddle) |

There are also **positive semi-definite** ($\lambda_i \ge 0$) and **negative
semi-definite** ($\lambda_i \le 0$) — the "semi" means some eigenvalues can be zero.

### Pen-and-paper examples

**Example 1 — Positive definite:**

$$\mathbf{A} = \begin{pmatrix} 2 & 1 \\ 1 & 3 \end{pmatrix}$$

Eigenvalues: $\lambda^2 - 5\lambda + 5 = 0 \implies \lambda = \frac{5 \pm \sqrt{5}}{2} \approx 3.62,\; 1.38$.
Both positive, so $\mathbf{A}$ is PD.  The quadratic form $2x_1^2 + 2x_1 x_2 + 3x_2^2 > 0$ for all $\mathbf{x} \ne \mathbf{0}$.

**Example 2 — Indefinite:**

$$\mathbf{B} = \begin{pmatrix} 1 & 2 \\ 2 & 1 \end{pmatrix}$$

Eigenvalues: $\lambda^2 - 2\lambda - 3 = 0 \implies \lambda = 3,\; -1$.
Mixed signs, so $\mathbf{B}$ is indefinite.  The form $x_1^2 + 4x_1 x_2 + x_2^2$ takes both positive and negative values.

### The leading minors test (Sylvester's criterion)

For a symmetric $\mathbf{A}$, check the **leading principal minors** — the
determinants of the top-left $k \times k$ submatrices:

- **PD** if and only if all leading minors are positive: $a_{11} > 0$, $\det\begin{pmatrix} a_{11} & a_{12} \\ a_{21} & a_{22}\end{pmatrix} > 0$, etc.
- **ND** if and only if the minors alternate in sign: $a_{11} < 0$, second minor $> 0$, third $< 0$, ...

**Verify Example 1:** $a_{11} = 2 > 0$.  $\det(\mathbf{A}) = 2 \cdot 3 - 1 \cdot 1 = 5 > 0$.  Both positive — PD confirmed.

**Verify Example 2:** $b_{11} = 1 > 0$.  $\det(\mathbf{B}) = 1 \cdot 1 - 2 \cdot 2 = -3 < 0$.  Fails both PD and ND tests — indefinite confirmed.

### Change of variables: diagonalising the quadratic form

By the Spectral Theorem (Lesson 15), any real symmetric matrix decomposes as
$\mathbf{A} = \mathbf{Q}\boldsymbol{\Lambda}\mathbf{Q}^T$.
Substitute $\mathbf{x} = \mathbf{Q}\mathbf{z}$ (rotate coordinates to eigenvector axes):

$$Q(\mathbf{x}) = \mathbf{x}^T \mathbf{A} \mathbf{x} = (\mathbf{Q}\mathbf{z})^T \mathbf{Q}\boldsymbol{\Lambda}\mathbf{Q}^T (\mathbf{Q}\mathbf{z}) = \mathbf{z}^T \boldsymbol{\Lambda} \mathbf{z} = \lambda_1 z_1^2 + \lambda_2 z_2^2$$

The cross-terms vanish.  In the new coordinates, the level sets are axis-aligned
ellipses (if PD) or hyperbolas (if indefinite).

### Connection to conics

The equation $\mathbf{x}^T \mathbf{A} \mathbf{x} = 1$ defines:
- An **ellipse** when $\mathbf{A}$ is PD (semi-axes $1/\sqrt{\lambda_i}$)
- A **hyperbola** when $\mathbf{A}$ is indefinite

### The Moore-Penrose Pseudoinverse

When $\mathbf{A}$ is not invertible (e.g. it is rectangular or singular), the
**pseudoinverse** $\mathbf{A}^+$ generalises the inverse.  Given the SVD
$\mathbf{A} = \mathbf{U}\boldsymbol{\Sigma}\mathbf{V}^T$:

$$\mathbf{A}^+ = \mathbf{V}\boldsymbol{\Sigma}^+\mathbf{U}^T$$

where $\boldsymbol{\Sigma}^+$ is formed by taking the reciprocal of each
non-zero singular value and transposing the matrix.  For a $2 \times 3$ matrix
with $\boldsymbol{\Sigma} = \text{diag}(\sigma_1, \sigma_2, 0)$, we get
$\boldsymbol{\Sigma}^+ = \text{diag}(1/\sigma_1, 1/\sigma_2, 0)^T$ (now $3 \times 2$).

The pseudoinverse gives the **minimum-norm least-squares solution** to $\mathbf{A}\mathbf{x} = \mathbf{b}$: $\mathbf{x}^+ = \mathbf{A}^+\mathbf{b}$.

## Visualisation

The contour plot below shows the level sets of $Q(\mathbf{x}) = \mathbf{x}^T\mathbf{A}\mathbf{x}$ for a positive definite matrix (ellipses) versus an indefinite matrix (hyperbolas).

## Python Verification

```python
# ── Quadratic Forms, Definiteness & Pseudoinverse ───────
import numpy as np
import matplotlib.pyplot as plt

# === 1. Positive definite example ===
A_pd = np.array([[2, 1],
                  [1, 3]])
eigenvalues_pd = np.linalg.eigvalsh(A_pd)
print("A (PD) eigenvalues:", eigenvalues_pd)            # both positive
print("Leading minors: a11 =", A_pd[0,0], " det =", np.linalg.det(A_pd))

# === 2. Indefinite example ===
A_indef = np.array([[1, 2],
                     [2, 1]])
eigenvalues_indef = np.linalg.eigvalsh(A_indef)
print("\nA (indef) eigenvalues:", eigenvalues_indef)     # mixed signs
print("Leading minors: a11 =", A_indef[0,0], " det =", np.linalg.det(A_indef))

# === 3. Evaluate quadratic forms on a grid ===
x1 = np.linspace(-3, 3, 300)
x2 = np.linspace(-3, 3, 300)
X1, X2 = np.meshgrid(x1, x2)

def quad_form(A, X1, X2):
    """Compute x^T A x at every grid point."""
    return A[0,0]*X1**2 + 2*A[0,1]*X1*X2 + A[1,1]*X2**2

Q_pd    = quad_form(A_pd, X1, X2)
Q_indef = quad_form(A_indef, X1, X2)

# === 4. Contour plots ===
fig, axes = plt.subplots(1, 2, figsize=(11, 5))

# Positive definite — elliptic contours
ax = axes[0]
cs = ax.contour(X1, X2, Q_pd, levels=np.arange(1, 20, 2), cmap='viridis')
ax.clabel(cs, fontsize=8)
ax.set_title(f'Positive Definite\nλ = {eigenvalues_pd.round(2)}')
ax.set_xlabel('x₁'); ax.set_ylabel('x₂')
ax.set_aspect('equal'); ax.grid(True, alpha=0.3)

# Indefinite — hyperbolic contours
ax = axes[1]
cs = ax.contour(X1, X2, Q_indef, levels=np.linspace(-8, 8, 17), cmap='RdBu_r')
ax.clabel(cs, fontsize=8)
ax.set_title(f'Indefinite\nλ = {eigenvalues_indef.round(2)}')
ax.set_xlabel('x₁'); ax.set_ylabel('x₂')
ax.set_aspect('equal'); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('quadratic_forms_contours.png', dpi=120)
plt.show()
print("\nContour plot saved.")

# === 5. Change of variables — diagonalise ===
eigvals, Q_mat = np.linalg.eigh(A_pd)
print("\n--- Change of variables (PD matrix) ---")
print("Eigenvector matrix Q:\n", Q_mat.round(4))
print("Q^T A Q (should be diagonal):\n", (Q_mat.T @ A_pd @ Q_mat).round(10))

# === 6. Moore-Penrose Pseudoinverse via SVD ===
M = np.array([[1, 2, 3],
              [4, 5, 6]])     # 2x3, rank 2

U, sigma, Vt = np.linalg.svd(M, full_matrices=False)
# Build Sigma+ by inverting non-zero singular values
sigma_plus = np.where(sigma > 1e-10, 1.0 / sigma, 0.0)
M_pinv_manual = (Vt.T * sigma_plus) @ U.T     # V Sigma+ U^T

M_pinv_numpy = np.linalg.pinv(M)

print("\n--- Pseudoinverse ---")
print("Manual (via SVD):\n", M_pinv_manual.round(6))
print("NumPy pinv:\n",       M_pinv_numpy.round(6))
print("Match:", np.allclose(M_pinv_manual, M_pinv_numpy))

# Verify: M @ M+ @ M == M (defining property)
print("M @ M+ @ M == M?", np.allclose(M @ M_pinv_manual @ M, M))
```

## Connection to CS / Games / AI

- **Hessian definiteness in optimisation:** a PD Hessian at a critical point
  guarantees a local minimum — gradient descent converges.  An indefinite
  Hessian means a saddle point: the optimiser must escape it.
- **Covariance matrices** are always positive semi-definite.  If your computed
  covariance matrix has a negative eigenvalue, you have a numerical bug.
- **Collision detection:** testing whether a point lies inside an ellipsoid is
  exactly checking $\mathbf{x}^T \mathbf{A} \mathbf{x} \le 1$ for a PD matrix.
- **Pseudoinverse** powers least-squares fitting, underdetermined systems in
  robotics/IK, and the normal equation $\mathbf{A}^+ \mathbf{b}$ when
  $\mathbf{A}^T\mathbf{A}$ is singular.  `np.linalg.lstsq` uses it internally.
- **Kernel methods in ML:** the kernel matrix (Gram matrix) must be PSD for
  the kernel to correspond to a valid inner product in feature space.

## Check Your Understanding

1. **By hand:** Given $\mathbf{A} = \begin{pmatrix} 4 & 2 \\ 2 & 1 \end{pmatrix}$,
   compute the eigenvalues and classify the definiteness.  What does the
   level set $\mathbf{x}^T\mathbf{A}\mathbf{x} = 1$ look like?

2. **Sylvester's criterion:** For $\mathbf{C} = \begin{pmatrix} -3 & 1 \\ 1 & -5 \end{pmatrix}$,
   check the leading principal minors and determine the definiteness without
   computing eigenvalues.

3. **Coding exercise:** Compute the pseudoinverse of
   $\mathbf{D} = \begin{pmatrix} 1 & 0 \\ 0 & 0 \\ 0 & 1 \end{pmatrix}$
   by hand using the SVD, then verify with `np.linalg.pinv`.
