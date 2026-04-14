# Eigenvalues & Eigenvectors — Directions That Survive a Transform

## Intuition

Most vectors change direction when you multiply them by a matrix.  But some
special vectors only get **stretched or shrunk** — their direction stays the
same.  These are **eigenvectors**, and the stretch factor is the **eigenvalue**.
Finding them reveals the "natural axes" of a transformation.

## Prerequisites

- Tier 2, Lesson 7: Determinants
- Tier 2, Lesson 6: Identity, Inverse, Transpose

## From First Principles

### Definition

For a square matrix $\mathbf{A}$, a non-zero vector $\mathbf{v}$ is an
**eigenvector** with **eigenvalue** $\lambda$ if:

$$\mathbf{A}\mathbf{v} = \lambda\mathbf{v}$$

The matrix $\mathbf{A}$ acts on $\mathbf{v}$ the same as multiplying by a scalar.

### Finding eigenvalues (characteristic equation)

$$\mathbf{A}\mathbf{v} = \lambda\mathbf{v}$$
$$\mathbf{A}\mathbf{v} - \lambda\mathbf{v} = \mathbf{0}$$
$$(\mathbf{A} - \lambda\mathbf{I})\mathbf{v} = \mathbf{0}$$

For a non-zero solution $\mathbf{v}$ to exist, the matrix $(\mathbf{A} - \lambda\mathbf{I})$ must be **singular**:

$$\det(\mathbf{A} - \lambda\mathbf{I}) = 0$$

This is the **characteristic equation**.

### Pen & paper: 2×2 example

$$\mathbf{A} = \begin{pmatrix} 4 & 1 \\ 2 & 3 \end{pmatrix}$$

**Step 1: Characteristic equation**

$$\det\begin{pmatrix} 4-\lambda & 1 \\ 2 & 3-\lambda \end{pmatrix} = 0$$

$$(4-\lambda)(3-\lambda) - 2 = 0$$
$$12 - 7\lambda + \lambda^2 - 2 = 0$$
$$\lambda^2 - 7\lambda + 10 = 0$$
$$(\lambda - 5)(\lambda - 2) = 0$$

**Eigenvalues:** $\lambda_1 = 5$, $\lambda_2 = 2$

**Step 2: Find eigenvectors**

For $\lambda_1 = 5$:

$$(\mathbf{A} - 5\mathbf{I})\mathbf{v} = \begin{pmatrix} -1 & 1 \\ 2 & -2 \end{pmatrix}\mathbf{v} = \mathbf{0}$$

Row 1: $-v_1 + v_2 = 0$ → $v_2 = v_1$

Eigenvector: $\mathbf{v}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$ (or any scalar multiple)

For $\lambda_2 = 2$:

$$(\mathbf{A} - 2\mathbf{I})\mathbf{v} = \begin{pmatrix} 2 & 1 \\ 2 & 1 \end{pmatrix}\mathbf{v} = \mathbf{0}$$

Row 1: $2v_1 + v_2 = 0$ → $v_2 = -2v_1$

Eigenvector: $\mathbf{v}_2 = \begin{pmatrix} 1 \\ -2 \end{pmatrix}$

**Verify:** $\begin{pmatrix} 4 & 1 \\ 2 & 3 \end{pmatrix}\begin{pmatrix} 1 \\ 1 \end{pmatrix} = \begin{pmatrix} 5 \\ 5 \end{pmatrix} = 5\begin{pmatrix} 1 \\ 1 \end{pmatrix}$ ✓

### Properties

- An $n \times n$ matrix has at most $n$ eigenvalues
- $\det(\mathbf{A}) = \lambda_1 \lambda_2 \cdots \lambda_n$ (product of eigenvalues)
- $\text{trace}(\mathbf{A}) = \lambda_1 + \lambda_2 + \cdots + \lambda_n$ (sum of eigenvalues)

**Pen & paper check:** $\text{trace} = 4 + 3 = 7 = 5 + 2$ ✓, $\det = 12 - 2 = 10 = 5 \times 2$ ✓

### Diagonalisation

If $\mathbf{A}$ has $n$ linearly independent eigenvectors, we can write:

$$\mathbf{A} = \mathbf{P}\mathbf{D}\mathbf{P}^{-1}$$

where $\mathbf{P}$ has eigenvectors as columns and $\mathbf{D}$ is diagonal with eigenvalues.

**Pen & paper:**

$$\mathbf{P} = \begin{pmatrix} 1 & 1 \\ 1 & -2 \end{pmatrix}, \quad \mathbf{D} = \begin{pmatrix} 5 & 0 \\ 0 & 2 \end{pmatrix}$$

**Power of diagonalisation:** $\mathbf{A}^k = \mathbf{P}\mathbf{D}^k\mathbf{P}^{-1}$

And $\mathbf{D}^k = \begin{pmatrix} 5^k & 0 \\ 0 & 2^k \end{pmatrix}$ — trivial to compute!

### Symmetric matrices are special

If $\mathbf{A} = \mathbf{A}^T$ (symmetric):
- All eigenvalues are **real**
- Eigenvectors for different eigenvalues are **orthogonal**
- Always diagonalisable

> Covariance matrices are symmetric — this is why PCA works so cleanly.

## Python Verification

```python
# ── Eigenvalues & Eigenvectors ──────────────────────────────
import numpy as np

A = np.array([[4, 1], [2, 3]])

# Compute eigenvalues and eigenvectors
eigenvalues, eigenvectors = np.linalg.eig(A)
print("=== Eigenvalues & Eigenvectors ===")
print(f"Eigenvalues: {eigenvalues}")
print(f"Eigenvectors (columns):\n{eigenvectors}")

# Verify Av = λv
for i in range(len(eigenvalues)):
    lam = eigenvalues[i]
    v = eigenvectors[:, i]
    Av = A @ v
    lv = lam * v
    print(f"\nλ={lam:.0f}: A@v = {np.round(Av, 6)}, λv = {np.round(lv, 6)}, match: {np.allclose(Av, lv)}")

# Trace and determinant check
print(f"\n=== Trace & Det ===")
print(f"trace(A) = {np.trace(A)} = {sum(eigenvalues):.0f} (sum of eigenvalues)")
print(f"det(A) = {np.linalg.det(A):.0f} = {np.prod(eigenvalues):.0f} (product of eigenvalues)")

# Diagonalisation: A = P D P^{-1}
P = eigenvectors
D = np.diag(eigenvalues)
P_inv = np.linalg.inv(P)
A_reconstructed = P @ D @ P_inv
print(f"\n=== Diagonalisation ===")
print(f"P @ D @ P^-1 =\n{np.round(A_reconstructed, 10)}")
print(f"Matches A? {np.allclose(A, A_reconstructed)}")

# Power using diagonalisation: A^5
print(f"\n=== A^5 via diagonalisation ===")
D5 = np.diag(eigenvalues**5)
A5_diag = P @ D5 @ P_inv
A5_direct = np.linalg.matrix_power(A, 5)
print(f"A^5 (diag method):\n{np.round(A5_diag, 10)}")
print(f"A^5 (direct):\n{A5_direct}")

# Symmetric matrix: orthogonal eigenvectors
print(f"\n=== Symmetric matrix ===")
S = np.array([[2, 1], [1, 3]])
evals, evecs = np.linalg.eig(S)
print(f"Eigenvalues: {np.round(evals, 4)}")
print(f"Dot product of eigenvectors: {np.dot(evecs[:,0], evecs[:,1]):.10f} (≈0 = orthogonal)")
```

## Connection to CS / Games / AI

- **PCA** — eigenvectors of the covariance matrix are the principal components
- **PageRank** — Google's algorithm finds the dominant eigenvector of the web graph matrix
- **Vibration analysis** — eigenvalues = natural frequencies of a structure
- **Markov chains** — steady-state distribution is the eigenvector for $\lambda = 1$
- **Spectral clustering** — uses eigenvectors of the graph Laplacian to cluster data
- **Neural network convergence** — eigenvalues of the Hessian affect training speed

## Check Your Understanding

1. **Pen & paper:** Find the eigenvalues and eigenvectors of $\begin{pmatrix} 3 & 0 \\ 0 & 5 \end{pmatrix}$.  (Hint: diagonal matrices make this very easy.)
2. **Pen & paper:** Find the eigenvalues of $\begin{pmatrix} 2 & 1 \\ 0 & 3 \end{pmatrix}$.  (Hint: it's upper triangular.)
3. **Pen & paper:** Find eigenvalues and eigenvectors of $\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$.  What transformation does this represent?
4. **Think about it:** If a matrix has eigenvalue 0, what does that say about its invertibility?
