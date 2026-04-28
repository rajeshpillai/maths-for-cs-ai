# Diagonalization — Decomposing a Transform into Stretch Along Axes

## Intuition

Every diagonalizable matrix is secretly just **stretching along its eigenvector
directions**.  Diagonalization makes this explicit: rotate into eigenvector
coordinates, stretch each axis independently, rotate back.  This turns painful
matrix powers like $\mathbf{A}^{100}$ into trivial scalar powers.

## Prerequisites

- Tier 2, Lesson 12: Dimension, Rank, Rank-Nullity Theorem
- Tier 2, Lesson 13: Eigenvalues & Eigenvectors

## From First Principles

### The Core Idea

Recall from Lesson 13: if $\mathbf{A}$ has eigenvectors $\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_n$
with eigenvalues $\lambda_1, \lambda_2, \dots, \lambda_n$, then:

$$\mathbf{A}\mathbf{v}_i = \lambda_i \mathbf{v}_i \quad \text{for each } i$$

Stack all eigenvectors as columns into a matrix $\mathbf{P}$:

$$\mathbf{P} = \begin{pmatrix} \mathbf{v}_1 & \mathbf{v}_2 & \cdots & \mathbf{v}_n \end{pmatrix}$$

Now compute $\mathbf{A}\mathbf{P}$:

$$\mathbf{A}\mathbf{P} = \begin{pmatrix} \mathbf{A}\mathbf{v}_1 & \mathbf{A}\mathbf{v}_2 & \cdots & \mathbf{A}\mathbf{v}_n \end{pmatrix} = \begin{pmatrix} \lambda_1\mathbf{v}_1 & \lambda_2\mathbf{v}_2 & \cdots & \lambda_n\mathbf{v}_n \end{pmatrix}$$

The right-hand side is the same as scaling each column by its eigenvalue:

$$\mathbf{A}\mathbf{P} = \mathbf{P}\mathbf{D}, \quad \text{where } \mathbf{D} = \begin{pmatrix} \lambda_1 & 0 & \cdots & 0 \\ 0 & \lambda_2 & \cdots & 0 \\ \vdots & & \ddots & \vdots \\ 0 & 0 & \cdots & \lambda_n \end{pmatrix}$$

If the eigenvectors are linearly independent, $\mathbf{P}$ is invertible and we
can multiply both sides on the right by $\mathbf{P}^{-1}$:

$$\boxed{\mathbf{A} = \mathbf{P}\mathbf{D}\mathbf{P}^{-1}}$$

This is the **diagonalization** of $\mathbf{A}$.

### What Each Piece Does

Read $\mathbf{A} = \mathbf{P}\mathbf{D}\mathbf{P}^{-1}$ right to left (how it acts on a vector $\mathbf{x}$):

1. $\mathbf{P}^{-1}\mathbf{x}$ — express $\mathbf{x}$ in the eigenvector coordinate system
2. $\mathbf{D}(\mathbf{P}^{-1}\mathbf{x})$ — stretch each eigenvector axis by its eigenvalue
3. $\mathbf{P}(\cdots)$ — convert back to the original coordinate system

### When Is a Matrix Diagonalizable?

**Theorem:** An $n \times n$ matrix $\mathbf{A}$ is diagonalizable if and only if it
has $n$ linearly independent eigenvectors.

Sufficient conditions (not necessary):
- $n$ **distinct** eigenvalues → always diagonalizable (distinct eigenvalues guarantee independent eigenvectors)
- $\mathbf{A}$ is **symmetric** ($\mathbf{A} = \mathbf{A}^T$) → always diagonalizable with orthogonal eigenvectors

When it fails: a repeated eigenvalue with **algebraic multiplicity** (times it
appears as a root) greater than its **geometric multiplicity** (number of
independent eigenvectors for that eigenvalue).

### When Diagonalization Fails — Pen & Paper Example

$$\mathbf{B} = \begin{pmatrix} 2 & 1 \\ 0 & 2 \end{pmatrix}$$

**Step 1: Characteristic equation**

$$\det\begin{pmatrix} 2-\lambda & 1 \\ 0 & 2-\lambda \end{pmatrix} = (2-\lambda)^2 = 0$$

Eigenvalue $\lambda = 2$ with algebraic multiplicity 2.

**Step 2: Find eigenvectors for $\lambda = 2$**

$$(\mathbf{B} - 2\mathbf{I})\mathbf{v} = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}\mathbf{v} = \mathbf{0}$$

This gives $v_2 = 0$, $v_1$ free. Only **one** independent eigenvector: $\begin{pmatrix} 1 \\ 0 \end{pmatrix}$.

Geometric multiplicity = 1 < algebraic multiplicity = 2. **Not diagonalizable.**

### Full 2×2 Worked Example

$$\mathbf{A} = \begin{pmatrix} 4 & 1 \\ 2 & 3 \end{pmatrix}$$

(We found the eigenvalues and eigenvectors in Lesson 13. Now we complete the diagonalization.)

**Eigenvalues:** $\lambda_1 = 5$, $\lambda_2 = 2$

**Eigenvectors:** $\mathbf{v}_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$, $\mathbf{v}_2 = \begin{pmatrix} 1 \\ -2 \end{pmatrix}$

**Step 1: Build P and D**

$$\mathbf{P} = \begin{pmatrix} 1 & 1 \\ 1 & -2 \end{pmatrix}, \quad \mathbf{D} = \begin{pmatrix} 5 & 0 \\ 0 & 2 \end{pmatrix}$$

**Step 2: Compute $\mathbf{P}^{-1}$**

For a 2×2 matrix $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$, the inverse is
$\frac{1}{ad - bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$.

$$\det(\mathbf{P}) = (1)(-2) - (1)(1) = -3$$

$$\mathbf{P}^{-1} = \frac{1}{-3}\begin{pmatrix} -2 & -1 \\ -1 & 1 \end{pmatrix} = \begin{pmatrix} 2/3 & 1/3 \\ 1/3 & -1/3 \end{pmatrix}$$

**Step 3: Verify $\mathbf{P}\mathbf{D}\mathbf{P}^{-1} = \mathbf{A}$**

$$\mathbf{P}\mathbf{D} = \begin{pmatrix} 1 & 1 \\ 1 & -2 \end{pmatrix}\begin{pmatrix} 5 & 0 \\ 0 & 2 \end{pmatrix} = \begin{pmatrix} 5 & 2 \\ 5 & -4 \end{pmatrix}$$

$$\mathbf{P}\mathbf{D}\mathbf{P}^{-1} = \begin{pmatrix} 5 & 2 \\ 5 & -4 \end{pmatrix}\begin{pmatrix} 2/3 & 1/3 \\ 1/3 & -1/3 \end{pmatrix} = \begin{pmatrix} 10/3 + 2/3 & 5/3 - 2/3 \\ 10/3 - 4/3 & 5/3 + 4/3 \end{pmatrix} = \begin{pmatrix} 4 & 1 \\ 2 & 3 \end{pmatrix}$$  ✓

### Matrix Powers via Diagonalization

Why does this matter?  Consider $\mathbf{A}^k$:

$$\mathbf{A}^2 = (\mathbf{P}\mathbf{D}\mathbf{P}^{-1})(\mathbf{P}\mathbf{D}\mathbf{P}^{-1}) = \mathbf{P}\mathbf{D}\underbrace{(\mathbf{P}^{-1}\mathbf{P})}_{\mathbf{I}}\mathbf{D}\mathbf{P}^{-1} = \mathbf{P}\mathbf{D}^2\mathbf{P}^{-1}$$

By induction:

$$\boxed{\mathbf{A}^k = \mathbf{P}\mathbf{D}^k\mathbf{P}^{-1}}$$

And raising a diagonal matrix to a power is trivial — just raise each diagonal entry:

$$\mathbf{D}^k = \begin{pmatrix} \lambda_1^k & 0 \\ 0 & \lambda_2^k \end{pmatrix}$$

**Pen & paper:** Compute $\mathbf{A}^3$ for our example.

$$\mathbf{D}^3 = \begin{pmatrix} 125 & 0 \\ 0 & 8 \end{pmatrix}$$

$$\mathbf{P}\mathbf{D}^3 = \begin{pmatrix} 1 & 1 \\ 1 & -2 \end{pmatrix}\begin{pmatrix} 125 & 0 \\ 0 & 8 \end{pmatrix} = \begin{pmatrix} 125 & 8 \\ 125 & -16 \end{pmatrix}$$

$$\mathbf{A}^3 = \begin{pmatrix} 125 & 8 \\ 125 & -16 \end{pmatrix}\begin{pmatrix} 2/3 & 1/3 \\ 1/3 & -1/3 \end{pmatrix} = \begin{pmatrix} 250/3 + 8/3 & 125/3 - 8/3 \\ 250/3 - 16/3 & 125/3 + 16/3 \end{pmatrix} = \begin{pmatrix} 86 & 39 \\ 78 & 47 \end{pmatrix}$$

### Full 3×3 Worked Example

$$\mathbf{C} = \begin{pmatrix} 2 & 0 & 0 \\ 0 & 3 & 1 \\ 0 & 0 & 1 \end{pmatrix}$$

**Step 1: Characteristic equation.** Since $\mathbf{C}$ is upper triangular, the
eigenvalues are the diagonal entries: $\lambda_1 = 2$, $\lambda_2 = 3$, $\lambda_3 = 1$.

All three are distinct, so $\mathbf{C}$ is diagonalizable.

**Step 2: Eigenvectors**

For $\lambda_1 = 2$: solve $(\mathbf{C} - 2\mathbf{I})\mathbf{v} = \mathbf{0}$

$$\begin{pmatrix} 0 & 0 & 0 \\ 0 & 1 & 1 \\ 0 & 0 & -1 \end{pmatrix}\mathbf{v} = \mathbf{0} \implies v_3 = 0,\; v_2 = 0,\; v_1 \text{ free}$$

$\mathbf{v}_1 = \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$

For $\lambda_2 = 3$: solve $(\mathbf{C} - 3\mathbf{I})\mathbf{v} = \mathbf{0}$

$$\begin{pmatrix} -1 & 0 & 0 \\ 0 & 0 & 1 \\ 0 & 0 & -2 \end{pmatrix}\mathbf{v} = \mathbf{0} \implies v_1 = 0,\; v_3 = 0,\; v_2 \text{ free}$$

$\mathbf{v}_2 = \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}$

For $\lambda_3 = 1$: solve $(\mathbf{C} - \mathbf{I})\mathbf{v} = \mathbf{0}$

$$\begin{pmatrix} 1 & 0 & 0 \\ 0 & 2 & 1 \\ 0 & 0 & 0 \end{pmatrix}\mathbf{v} = \mathbf{0} \implies v_1 = 0,\; v_2 = -v_3/2,\; v_3 \text{ free}$$

$\mathbf{v}_3 = \begin{pmatrix} 0 \\ -1 \\ 2 \end{pmatrix}$ (choosing $v_3 = 2$ to avoid fractions)

**Step 3: Assemble and verify**

$$\mathbf{P} = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & -1 \\ 0 & 0 & 2 \end{pmatrix}, \quad \mathbf{D} = \begin{pmatrix} 2 & 0 & 0 \\ 0 & 3 & 0 \\ 0 & 0 & 1 \end{pmatrix}$$

Since $\mathbf{P}$ is upper triangular, $\det(\mathbf{P}) = 1 \cdot 1 \cdot 2 = 2 \neq 0$. Invertible. ✓

## Visualisation

```python
# ── Diagonalization: see the "stretch along axes" interpretation ──
import numpy as np
import matplotlib.pyplot as plt

A = np.array([[4, 1], [2, 3]])
eigenvalues, eigenvectors = np.linalg.eig(A)

# Unit circle: 100 points
theta = np.linspace(0, 2 * np.pi, 100)
circle = np.array([np.cos(theta), np.sin(theta)])

# Transform the circle by A
transformed = A @ circle

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Left: A acting in standard coordinates
ax = axes[0]
ax.plot(circle[0], circle[1], 'b-', linewidth=1, label='Unit circle')
ax.plot(transformed[0], transformed[1], 'r-', linewidth=2, label='A @ circle')
for i in range(2):
    v = eigenvectors[:, i]
    lam = eigenvalues[i]
    ax.arrow(0, 0, v[0], v[1], head_width=0.1, color='green', linewidth=2)
    ax.arrow(0, 0, lam*v[0], lam*v[1], head_width=0.1, color='orange',
             linewidth=2, linestyle='--')
    ax.text(v[0]*1.2, v[1]*1.2, f'v{i+1}', fontsize=12, color='green')
    ax.text(lam*v[0]*1.05, lam*v[1]*1.05, f'{lam:.0f}v{i+1}', fontsize=12,
            color='orange')
ax.set_xlim(-6, 6)
ax.set_ylim(-6, 6)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3)
ax.axhline(0, color='k', linewidth=0.5)
ax.axvline(0, color='k', linewidth=0.5)
ax.set_title('A in standard coordinates\n(shearing ellipse)')
ax.legend()

# Right: D acting in eigenvector coordinates — axis-aligned stretch
P = eigenvectors
P_inv = np.linalg.inv(P)
D = np.diag(eigenvalues)

# Transform circle in eigenvector coordinates
circle_eig = P_inv @ circle
stretched_eig = D @ circle_eig

ax = axes[1]
ax.plot(circle_eig[0], circle_eig[1], 'b-', linewidth=1,
        label='Circle in eigenvector coords')
ax.plot(stretched_eig[0], stretched_eig[1], 'r-', linewidth=2,
        label='D @ circle (axis-aligned stretch)')
ax.arrow(0, 0, 1, 0, head_width=0.1, color='green', linewidth=2)
ax.arrow(0, 0, eigenvalues[0], 0, head_width=0.1, color='orange',
         linewidth=2, linestyle='--')
ax.arrow(0, 0, 0, 1, head_width=0.1, color='green', linewidth=2)
ax.arrow(0, 0, 0, eigenvalues[1], head_width=0.1, color='orange',
         linewidth=2, linestyle='--')
ax.set_xlim(-6, 6)
ax.set_ylim(-6, 6)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3)
ax.axhline(0, color='k', linewidth=0.5)
ax.axvline(0, color='k', linewidth=0.5)
ax.set_title('D in eigenvector coordinates\n(pure axis-aligned stretch)')
ax.legend()

plt.suptitle('Diagonalization: same transform, revealed as axis stretches',
             fontsize=13, fontweight='bold')
plt.tight_layout()
plt.savefig('diagonalization_visualisation.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Diagonalization: full verification ───────────────────────
import numpy as np

# === 2x2 Example ===
print("=" * 50)
print("2x2 DIAGONALIZATION")
print("=" * 50)

A = np.array([[4, 1], [2, 3]])
eigenvalues, eigenvectors = np.linalg.eig(A)
print(f"A =\n{A}")
print(f"Eigenvalues: {eigenvalues}")
print(f"Eigenvectors (columns of P):\n{eigenvectors}")

# Build P and D
P = eigenvectors
D = np.diag(eigenvalues)
P_inv = np.linalg.inv(P)

# Verify A = P D P^{-1}
A_check = P @ D @ P_inv
print(f"\nP @ D @ P^-1 =\n{np.round(A_check, 10)}")
print(f"Matches A? {np.allclose(A, A_check)}")

# Matrix power: A^3
print(f"\n--- A^3 via diagonalization ---")
D3 = np.diag(eigenvalues ** 3)
A3_diag = P @ D3 @ P_inv
A3_direct = np.linalg.matrix_power(A, 3)
print(f"A^3 (diag)  =\n{np.round(A3_diag, 10)}")
print(f"A^3 (direct)=\n{A3_direct}")
print(f"Match? {np.allclose(A3_diag, A3_direct)}")

# A^10 — try doing this by hand without diagonalization!
print(f"\n--- A^10 via diagonalization ---")
D10 = np.diag(eigenvalues ** 10)
A10_diag = P @ D10 @ P_inv
A10_direct = np.linalg.matrix_power(A, 10)
print(f"A^10 (diag)  =\n{np.round(A10_diag, 10)}")
print(f"A^10 (direct)=\n{A10_direct}")
print(f"Match? {np.allclose(A10_diag, A10_direct)}")

# === Non-diagonalizable example ===
print(f"\n{'=' * 50}")
print("NON-DIAGONALIZABLE MATRIX")
print("=" * 50)

B = np.array([[2, 1], [0, 2]])
evals_B, evecs_B = np.linalg.eig(B)
print(f"B =\n{B}")
print(f"Eigenvalues: {evals_B}")
print(f"Eigenvectors:\n{evecs_B}")
print("Both eigenvector columns are parallel — only 1 independent eigenvector.")
print("Geometric multiplicity (1) < algebraic multiplicity (2). Not diagonalizable.")

# === 3x3 Example ===
print(f"\n{'=' * 50}")
print("3x3 DIAGONALIZATION")
print("=" * 50)

C = np.array([[2, 0, 0], [0, 3, 1], [0, 0, 1]])
evals_C, evecs_C = np.linalg.eig(C)
print(f"C =\n{C}")
print(f"Eigenvalues: {evals_C}")
print(f"Eigenvectors (columns of P):\n{np.round(evecs_C, 6)}")

P3 = evecs_C
D3_mat = np.diag(evals_C)
P3_inv = np.linalg.inv(P3)
C_check = P3 @ D3_mat @ P3_inv
print(f"\nP @ D @ P^-1 =\n{np.round(C_check, 10)}")
print(f"Matches C? {np.allclose(C, C_check)}")

# C^5 via diag
D3_5 = np.diag(evals_C ** 5)
C5_diag = P3 @ D3_5 @ P3_inv
C5_direct = np.linalg.matrix_power(C, 5)
print(f"\nC^5 (diag)  =\n{np.round(C5_diag, 10)}")
print(f"C^5 (direct)=\n{C5_direct}")
print(f"Match? {np.allclose(C5_diag, C5_direct)}")
```

## Connection to CS / Games / AI / Business / Industry

- **Matrix powers / Fibonacci** — the Fibonacci recurrence can be written as a
  2×2 matrix power; diagonalization gives the closed-form Binet formula
- **Markov chains** — long-run behaviour of a Markov chain is $\mathbf{M}^k\mathbf{x}_0$;
  diagonalization shows convergence to the steady-state eigenvector
- **Dynamical systems in games** — simulating $\mathbf{x}_{t+1} = \mathbf{A}\mathbf{x}_t$
  for many time steps; diagonalization makes this $O(n^3)$ once instead of per step
- **PCA** — the covariance matrix is symmetric and therefore always diagonalizable;
  PCA is literally reading off the eigenvalue decomposition
- **Spectral graph theory** — community detection and graph partitioning use
  the eigendecomposition of adjacency / Laplacian matrices
- **Stability analysis** — if all $|\lambda_i| < 1$, then $\mathbf{A}^k \to \mathbf{0}$;
  eigenvalues reveal whether a system explodes, decays, or oscillates

## Check Your Understanding

1. **Pen & paper:** Diagonalize $\mathbf{A} = \begin{pmatrix} 5 & 4 \\ 1 & 2 \end{pmatrix}$.
   Find $\mathbf{P}$, $\mathbf{D}$, $\mathbf{P}^{-1}$ and verify $\mathbf{A} = \mathbf{P}\mathbf{D}\mathbf{P}^{-1}$.

2. **Pen & paper:** Using your answer to (1), compute $\mathbf{A}^4$ via
   $\mathbf{P}\mathbf{D}^4\mathbf{P}^{-1}$.

3. **Think about it:** Why is $\begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}$ not
   diagonalizable?  (Hint: find its eigenvalues and count independent eigenvectors.)

4. **Coding challenge:** Write a function `matrix_power_diag(A, k)` that
   diagonalizes $\mathbf{A}$ and returns $\mathbf{A}^k$ using
   $\mathbf{P}\mathbf{D}^k\mathbf{P}^{-1}$.  Compare its output to
   `np.linalg.matrix_power` for $k = 50$.
