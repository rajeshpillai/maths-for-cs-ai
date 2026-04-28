# The Gram-Schmidt Process & QR Decomposition

## Intuition

You have a set of basis vectors that are "skewed" — not perpendicular to each
other.  Gram-Schmidt straightens them out one at a time, like building a set of
perfectly perpendicular rulers.  Each new ruler is made by taking the next
vector and **subtracting off its projections** onto all the rulers you have
already built.  The result is an orthogonal (or orthonormal) basis — the
foundation of QR decomposition, which is how modern software solves
least-squares problems and computes eigenvalues stably.

## Prerequisites

- Tier 2, Lesson 18: Orthogonal Projections (projection formula)
- Tier 2, Lesson 16: Norms (vector length / normalisation)
- Tier 2, Lesson 9: Linear Combinations, Span, Independence

## From First Principles

### The problem

Given linearly independent vectors $\{\mathbf{a}_1, \mathbf{a}_2, \dots, \mathbf{a}_n\}$,
produce orthogonal vectors $\{\mathbf{u}_1, \mathbf{u}_2, \dots, \mathbf{u}_n\}$
that span the same subspace.

### The algorithm

**Step 1.** Keep the first vector as-is:

$$\mathbf{u}_1 = \mathbf{a}_1$$

**Step 2.** Subtract from $\mathbf{a}_2$ its projection onto $\mathbf{u}_1$:

$$\mathbf{u}_2 = \mathbf{a}_2 - \frac{\mathbf{a}_2 \cdot \mathbf{u}_1}{\mathbf{u}_1 \cdot \mathbf{u}_1}\,\mathbf{u}_1$$

Now $\mathbf{u}_2 \perp \mathbf{u}_1$.

**Step 3.** Subtract from $\mathbf{a}_3$ its projections onto both $\mathbf{u}_1$ and $\mathbf{u}_2$:

$$\mathbf{u}_3 = \mathbf{a}_3
  - \frac{\mathbf{a}_3 \cdot \mathbf{u}_1}{\mathbf{u}_1 \cdot \mathbf{u}_1}\,\mathbf{u}_1
  - \frac{\mathbf{a}_3 \cdot \mathbf{u}_2}{\mathbf{u}_2 \cdot \mathbf{u}_2}\,\mathbf{u}_2$$

**General step $k$:**

$$\mathbf{u}_k = \mathbf{a}_k - \sum_{j=1}^{k-1} \frac{\mathbf{a}_k \cdot \mathbf{u}_j}{\mathbf{u}_j \cdot \mathbf{u}_j}\,\mathbf{u}_j$$

**To get an orthonormal basis**, normalise each vector:

$$\mathbf{e}_k = \frac{\mathbf{u}_k}{\|\mathbf{u}_k\|}$$

### Pen-and-paper example (3 vectors in R^3)

Let $\mathbf{a}_1 = \begin{pmatrix}1\\1\\0\end{pmatrix}$,
$\mathbf{a}_2 = \begin{pmatrix}1\\0\\1\end{pmatrix}$,
$\mathbf{a}_3 = \begin{pmatrix}0\\1\\1\end{pmatrix}$.

**u_1:**

$$\mathbf{u}_1 = \mathbf{a}_1 = \begin{pmatrix}1\\1\\0\end{pmatrix}$$

**u_2:**

$\mathbf{a}_2 \cdot \mathbf{u}_1 = 1(1) + 0(1) + 1(0) = 1$

$\mathbf{u}_1 \cdot \mathbf{u}_1 = 1 + 1 + 0 = 2$

$$\mathbf{u}_2 = \begin{pmatrix}1\\0\\1\end{pmatrix} - \frac{1}{2}\begin{pmatrix}1\\1\\0\end{pmatrix} = \begin{pmatrix}1/2\\-1/2\\1\end{pmatrix}$$

Check: $\mathbf{u}_2 \cdot \mathbf{u}_1 = 1/2 - 1/2 + 0 = 0\;\checkmark$

**u_3:**

$\mathbf{a}_3 \cdot \mathbf{u}_1 = 0 + 1 + 0 = 1$

$\mathbf{a}_3 \cdot \mathbf{u}_2 = 0 - 1/2 + 1 = 1/2$

$\mathbf{u}_2 \cdot \mathbf{u}_2 = 1/4 + 1/4 + 1 = 3/2$

Projection onto $\mathbf{u}_1$: $\frac{1}{2}\begin{pmatrix}1\\1\\0\end{pmatrix} = \begin{pmatrix}1/2\\1/2\\0\end{pmatrix}$

Projection onto $\mathbf{u}_2$: $\frac{1/2}{3/2}\begin{pmatrix}1/2\\-1/2\\1\end{pmatrix} = \frac{1}{3}\begin{pmatrix}1/2\\-1/2\\1\end{pmatrix} = \begin{pmatrix}1/6\\-1/6\\1/3\end{pmatrix}$

$$\mathbf{u}_3 = \begin{pmatrix}0\\1\\1\end{pmatrix} - \begin{pmatrix}1/2\\1/2\\0\end{pmatrix} - \begin{pmatrix}1/6\\-1/6\\1/3\end{pmatrix} = \begin{pmatrix}-2/3\\2/3\\2/3\end{pmatrix}$$

Check: $\mathbf{u}_3 \cdot \mathbf{u}_1 = -2/3 + 2/3 + 0 = 0\;\checkmark$

Check: $\mathbf{u}_3 \cdot \mathbf{u}_2 = -1/3 - 1/3 + 2/3 = 0\;\checkmark$

### Connection to QR Decomposition

Arrange the orthonormal vectors $\mathbf{e}_k$ as columns of $\mathbf{Q}$
(an $m \times n$ matrix with orthonormal columns, $\mathbf{Q}^T\mathbf{Q} = \mathbf{I}$).

Since we built each $\mathbf{a}_k$ from the $\mathbf{e}_j$, we can write:

$$\mathbf{a}_k = (\mathbf{a}_k \cdot \mathbf{e}_1)\,\mathbf{e}_1 + (\mathbf{a}_k \cdot \mathbf{e}_2)\,\mathbf{e}_2 + \cdots + (\mathbf{a}_k \cdot \mathbf{e}_k)\,\mathbf{e}_k$$

The coefficients $r_{jk} = \mathbf{a}_k \cdot \mathbf{e}_j$ form an **upper triangular** matrix $\mathbf{R}$. In matrix form:

$$\mathbf{A} = \mathbf{Q}\mathbf{R}$$

This is the **QR decomposition**.  Gram-Schmidt is one way to compute it.

## Visualisation

```python
# ── Gram-Schmidt in 2-D: step-by-step orthogonalisation ──
import numpy as np
import matplotlib.pyplot as plt

a1 = np.array([2, 1])
a2 = np.array([1, 2])

# Gram-Schmidt
u1 = a1.copy().astype(float)
proj = (np.dot(a2, u1) / np.dot(u1, u1)) * u1
u2 = a2 - proj

fig, axes = plt.subplots(1, 3, figsize=(14, 4.5))

# Panel 1: original vectors
ax = axes[0]
ax.annotate('', xy=a1, xytext=(0,0), arrowprops=dict(arrowstyle='->', color='blue', lw=2))
ax.annotate('', xy=a2, xytext=(0,0), arrowprops=dict(arrowstyle='->', color='orange', lw=2))
ax.text(a1[0]+0.1, a1[1]+0.1, '$a_1$', fontsize=13, color='blue')
ax.text(a2[0]+0.1, a2[1]+0.1, '$a_2$', fontsize=13, color='orange')
ax.set_title('Step 0: Original basis')
ax.set_xlim(-0.5, 3); ax.set_ylim(-0.5, 3)
ax.set_aspect('equal'); ax.grid(True, alpha=0.3)

# Panel 2: show projection being subtracted
ax = axes[1]
ax.annotate('', xy=a2, xytext=(0,0), arrowprops=dict(arrowstyle='->', color='orange', lw=2))
ax.annotate('', xy=u1, xytext=(0,0), arrowprops=dict(arrowstyle='->', color='blue', lw=2))
ax.annotate('', xy=proj, xytext=(0,0), arrowprops=dict(arrowstyle='->', color='green', lw=2))
ax.annotate('', xy=a2, xytext=proj, arrowprops=dict(arrowstyle='->', color='red', lw=2, linestyle='--'))
t = np.linspace(-0.5, 2, 50)
ax.plot(t*u1[0]/np.linalg.norm(u1), t*u1[1]/np.linalg.norm(u1), 'k--', alpha=0.3)
ax.text(proj[0]-0.5, proj[1]-0.3, 'proj', fontsize=10, color='green')
ax.text((a2[0]+proj[0])/2+0.1, (a2[1]+proj[1])/2, '$u_2$', fontsize=12, color='red')
ax.set_title('Step 1: Subtract projection')
ax.set_xlim(-0.5, 3); ax.set_ylim(-0.5, 3)
ax.set_aspect('equal'); ax.grid(True, alpha=0.3)

# Panel 3: orthogonal result
ax = axes[2]
ax.annotate('', xy=u1, xytext=(0,0), arrowprops=dict(arrowstyle='->', color='blue', lw=2.5))
ax.annotate('', xy=u2, xytext=(0,0), arrowprops=dict(arrowstyle='->', color='red', lw=2.5))
ax.text(u1[0]+0.1, u1[1]+0.1, '$u_1$', fontsize=13, color='blue')
ax.text(u2[0]+0.1, u2[1]+0.1, '$u_2$', fontsize=13, color='red')
ax.set_title(f'Step 2: Orthogonal basis (dot = {np.dot(u1, u2):.1f})')
ax.set_xlim(-1.5, 3); ax.set_ylim(-1.5, 3)
ax.set_aspect('equal'); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('gram_schmidt_2d.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Gram-Schmidt from scratch, then verify with QR ─────────
import numpy as np

# --- Input vectors (columns of A) ---
A = np.array([[1, 1, 0],
              [1, 0, 1],
              [0, 1, 1]], dtype=float).T   # columns are a1, a2, a3
# A is 3x3: each column is one of our vectors
print("A =\n", A)

# --- Gram-Schmidt (from scratch) ---
n = A.shape[1]
U = np.zeros_like(A)

for k in range(n):
    U[:, k] = A[:, k]
    for j in range(k):
        # Subtract projection of a_k onto u_j
        coeff = np.dot(A[:, k], U[:, j]) / np.dot(U[:, j], U[:, j])
        U[:, k] -= coeff * U[:, j]
        print(f"  a_{k+1} projected onto u_{j+1}: coeff = {coeff:.4f}")

print("\nOrthogonal vectors U =\n", U)

# Verify all pairs are orthogonal
print("\n=== Orthogonality check ===")
for i in range(n):
    for j in range(i+1, n):
        dot = np.dot(U[:, i], U[:, j])
        print(f"u_{i+1} . u_{j+1} = {dot:.10f}")  # should be 0

# --- Normalise to get Q ---
Q = U / np.linalg.norm(U, axis=0)
print(f"\nQ (orthonormal columns) =\n{Q}")
print(f"Q^T Q =\n{np.round(Q.T @ Q, 10)}")  # should be identity

# --- Recover R ---
R = Q.T @ A
print(f"\nR (upper triangular) =\n{np.round(R, 6)}")

# --- Verify A = QR ---
print(f"\nQ @ R =\n{np.round(Q @ R, 10)}")
print(f"Matches A? {np.allclose(Q @ R, A)}")

# --- Compare with NumPy's built-in QR ---
Q_np, R_np = np.linalg.qr(A)
print(f"\nNumPy Q =\n{np.round(Q_np, 6)}")
print(f"NumPy R =\n{np.round(R_np, 6)}")
# Note: signs of columns may differ (both are valid)
```

## Connection to CS / Games / AI / Business / Industry

- **QR decomposition** is the standard numerical method for solving least-squares problems — more stable than forming $\mathbf{A}^T\mathbf{A}$ directly (which squares the condition number).
- **QR iteration** (repeatedly doing QR decomposition) is how eigenvalue algorithms work inside NumPy and LAPACK.
- **Orthonormal bases** simplify everything: projection becomes a single dot product, coordinates decouple, and numerical errors do not cascade.
- In **3-D game engines**, orthonormalising a camera's local axes (forward, right, up) prevents the axes from drifting out of alignment due to accumulated floating-point errors.
- **Signal processing**: orthogonal basis functions (sines, cosines, wavelets) let you decompose a signal into independent components — Gram-Schmidt generalises this idea.

## Check Your Understanding

1. Apply Gram-Schmidt by hand to $\mathbf{a}_1 = \begin{pmatrix}1\\0\\1\end{pmatrix}$, $\mathbf{a}_2 = \begin{pmatrix}0\\1\\1\end{pmatrix}$. Verify the result is orthogonal.

2. Why is the matrix $\mathbf{R}$ upper triangular? (Hint: think about which $\mathbf{u}_j$ exist at the time you process $\mathbf{a}_k$.)

3. What happens if you feed Gram-Schmidt a set of linearly **dependent** vectors? At which step does it break, and how could you detect this in code?
