# Orthogonal Projections

## Intuition

Imagine the sun is directly overhead and you cast a shadow onto the floor.
That shadow is the **projection** of your 3-D body onto a 2-D plane.  In linear
algebra, projecting a vector onto a line or subspace finds the closest point in
that subspace — the "shadow."  This idea is the engine behind least-squares
fitting, PCA, and every regression model you will ever train.

## Prerequisites

- Tier 2, Lesson 3: Dot Product — Geometry (angle, inner product)
- Tier 2, Lesson 6: Identity, Inverse, Transpose
- Tier 2, Lesson 16: Norms
- Tier 2, Lesson 17: Orthogonality & Cauchy-Schwarz (orthogonal complement)

## From First Principles

### 1. Projection of a vector onto a line

We have vectors $\mathbf{v}$ and $\mathbf{u}$ ($\mathbf{u} \ne \mathbf{0}$).
We want the point on the line through $\mathbf{u}$ that is **closest** to
$\mathbf{v}$.  That point must be some scalar multiple $\hat{c}\,\mathbf{u}$.

The residual $\mathbf{v} - \hat{c}\,\mathbf{u}$ must be **orthogonal** to
$\mathbf{u}$ (shortest distance is always perpendicular):

$$(\mathbf{v} - \hat{c}\,\mathbf{u}) \cdot \mathbf{u} = 0$$

Expand:

$$\mathbf{v} \cdot \mathbf{u} - \hat{c}\,(\mathbf{u} \cdot \mathbf{u}) = 0$$

Solve for $\hat{c}$:

$$\hat{c} = \frac{\mathbf{v} \cdot \mathbf{u}}{\mathbf{u} \cdot \mathbf{u}}$$

Therefore the projection vector is:

$$\text{proj}_{\mathbf{u}}\,\mathbf{v}
  = \hat{c}\,\mathbf{u}
  = \frac{\mathbf{v} \cdot \mathbf{u}}{\mathbf{u} \cdot \mathbf{u}}\,\mathbf{u}$$

**Pen-and-paper example.** Let $\mathbf{v} = \begin{pmatrix}3\\4\end{pmatrix}$,
$\mathbf{u} = \begin{pmatrix}2\\1\end{pmatrix}$.

Step 1 — numerator: $\mathbf{v} \cdot \mathbf{u} = 3(2) + 4(1) = 10$

Step 2 — denominator: $\mathbf{u} \cdot \mathbf{u} = 4 + 1 = 5$

Step 3 — scalar: $\hat{c} = 10/5 = 2$

Step 4 — projection: $\text{proj}_{\mathbf{u}}\,\mathbf{v} = 2\begin{pmatrix}2\\1\end{pmatrix} = \begin{pmatrix}4\\2\end{pmatrix}$

Step 5 — residual: $\mathbf{v} - \text{proj} = \begin{pmatrix}3-4\\4-2\end{pmatrix} = \begin{pmatrix}-1\\2\end{pmatrix}$

Step 6 — verify orthogonality: $\begin{pmatrix}-1\\2\end{pmatrix} \cdot \begin{pmatrix}2\\1\end{pmatrix} = -2 + 2 = 0\;\checkmark$

### 2. Projection onto a subspace

Let $W$ be a subspace with basis vectors as **columns** of matrix
$\mathbf{A}$ (shape $m \times n$, $n$ columns = $n$ basis vectors).

We seek $\hat{\mathbf{x}}$ such that $\mathbf{A}\hat{\mathbf{x}}$ is the
closest point in $W$ to $\mathbf{v}$.  The residual
$\mathbf{v} - \mathbf{A}\hat{\mathbf{x}}$ must be orthogonal to every
column of $\mathbf{A}$, i.e.:

$$\mathbf{A}^T(\mathbf{v} - \mathbf{A}\hat{\mathbf{x}}) = \mathbf{0}$$

Expand:

$$\mathbf{A}^T\mathbf{v} - \mathbf{A}^T\mathbf{A}\,\hat{\mathbf{x}} = \mathbf{0}$$

Solve (these are the **normal equations**):

$$\mathbf{A}^T\mathbf{A}\,\hat{\mathbf{x}} = \mathbf{A}^T\mathbf{v}
\quad\Longrightarrow\quad
\hat{\mathbf{x}} = (\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T\mathbf{v}$$

The projected vector is:

$$\text{proj}_W\,\mathbf{v}
  = \mathbf{A}\hat{\mathbf{x}}
  = \mathbf{A}(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T\,\mathbf{v}$$

### 3. The projection matrix

Define:

$$\mathbf{P} = \mathbf{A}(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T$$

**Property 1 — Idempotent:** $\mathbf{P}^2 = \mathbf{P}$.

Proof: $\mathbf{P}^2 = \mathbf{A}(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T \cdot \mathbf{A}(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T$.
The middle $\mathbf{A}^T\mathbf{A}$ cancels its inverse:
$= \mathbf{A}(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T = \mathbf{P}$.

Projecting twice does nothing extra — you are already on the subspace.

**Property 2 — Symmetric:** $\mathbf{P}^T = \mathbf{P}$.

Proof: $\mathbf{P}^T = (\mathbf{A}(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T)^T = \mathbf{A}((\mathbf{A}^T\mathbf{A})^{-1})^T\mathbf{A}^T$.
Since $\mathbf{A}^T\mathbf{A}$ is symmetric, so is its inverse, giving $\mathbf{P}^T = \mathbf{P}$.

### 4. Pen-and-paper example — projection onto a plane in R^3

Let $\mathbf{A} = \begin{pmatrix}1 & 0\\0 & 1\\0 & 0\end{pmatrix}$ (the xy-plane) and $\mathbf{v} = \begin{pmatrix}3\\4\\5\end{pmatrix}$.

Step 1: $\mathbf{A}^T\mathbf{A} = \begin{pmatrix}1&0\\0&1\end{pmatrix} = \mathbf{I}_2$

Step 2: $(\mathbf{A}^T\mathbf{A})^{-1} = \mathbf{I}_2$

Step 3: $\mathbf{A}^T\mathbf{v} = \begin{pmatrix}3\\4\end{pmatrix}$

Step 4: $\hat{\mathbf{x}} = \begin{pmatrix}3\\4\end{pmatrix}$

Step 5: $\text{proj} = \mathbf{A}\hat{\mathbf{x}} = \begin{pmatrix}3\\4\\0\end{pmatrix}$

Step 6: residual $= \begin{pmatrix}0\\0\\5\end{pmatrix}$ — purely in the z-direction, orthogonal to the xy-plane. $\checkmark$

## Visualisation

```python
# ── Projection onto a line (2-D) and onto a plane (3-D) ──
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure(figsize=(12, 5))

# --- Left panel: projection onto a line in 2-D ---
ax1 = fig.add_subplot(121)
v = np.array([3, 4])
u = np.array([2, 1])
c_hat = np.dot(v, u) / np.dot(u, u)
proj = c_hat * u
resid = v - proj

origin = [0, 0]
ax1.annotate('', xy=v, xytext=origin,
    arrowprops=dict(arrowstyle='->', color='blue', lw=2))
ax1.annotate('', xy=proj, xytext=origin,
    arrowprops=dict(arrowstyle='->', color='green', lw=2))
ax1.annotate('', xy=v, xytext=proj,
    arrowprops=dict(arrowstyle='->', color='red', lw=2, linestyle='--'))
# draw the line through u
t = np.linspace(-0.5, 3, 100)
ax1.plot(t * u[0], t * u[1], 'k--', alpha=0.3, label='line along u')
ax1.text(v[0]+0.1, v[1]+0.1, 'v', fontsize=13, color='blue')
ax1.text(proj[0]+0.1, proj[1]-0.5, 'proj', fontsize=13, color='green')
ax1.text((v[0]+proj[0])/2+0.15, (v[1]+proj[1])/2, 'residual', fontsize=10, color='red')
ax1.set_xlim(-1, 6); ax1.set_ylim(-1, 6)
ax1.set_aspect('equal'); ax1.grid(True, alpha=0.3)
ax1.set_title('Projection onto a line')

# --- Right panel: projection onto xy-plane in 3-D ---
ax2 = fig.add_subplot(122, projection='3d')
v3 = np.array([3, 4, 5])
proj3 = np.array([3, 4, 0])
resid3 = v3 - proj3

ax2.quiver(0,0,0, *v3, color='blue', arrow_length_ratio=0.08, lw=2, label='v')
ax2.quiver(0,0,0, *proj3, color='green', arrow_length_ratio=0.1, lw=2, label='proj')
ax2.quiver(*proj3, *resid3, color='red', arrow_length_ratio=0.1, lw=2,
           linestyle='--', label='residual')
# draw the subspace (xy-plane patch)
xx, yy = np.meshgrid(range(-1,6), range(-1,6))
ax2.plot_surface(xx, yy, np.zeros_like(xx), alpha=0.1, color='gray')
ax2.set_xlabel('x'); ax2.set_ylabel('y'); ax2.set_zlabel('z')
ax2.set_title('Projection onto xy-plane')
ax2.legend(fontsize=8)

plt.tight_layout()
plt.savefig('orthogonal_projections.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Verify projection formulas with NumPy ──────────────────
import numpy as np

# --- 1. Projection onto a line ---
v = np.array([3, 4], dtype=float)
u = np.array([2, 1], dtype=float)

c_hat = np.dot(v, u) / np.dot(u, u)
proj = c_hat * u
resid = v - proj

print("=== Projection onto a line ===")
print(f"c_hat  = {c_hat}")          # 2.0
print(f"proj   = {proj}")           # [4. 2.]
print(f"resid  = {resid}")          # [-1.  2.]
print(f"resid . u = {np.dot(resid, u)}")  # 0.0  (orthogonal)

# --- 2. Projection onto a subspace (xy-plane in R^3) ---
A = np.array([[1, 0],
              [0, 1],
              [0, 0]], dtype=float)
v3 = np.array([3, 4, 5], dtype=float)

# Projection matrix P = A (A^T A)^{-1} A^T
AtA = A.T @ A
P = A @ np.linalg.inv(AtA) @ A.T

proj3 = P @ v3
resid3 = v3 - proj3

print("\n=== Projection onto xy-plane ===")
print(f"P =\n{P}")
print(f"proj   = {proj3}")           # [3. 4. 0.]
print(f"resid  = {resid3}")          # [0. 0. 5.]

# --- 3. Verify projection matrix properties ---
print("\n=== Projection matrix properties ===")
print(f"P^2 == P? {np.allclose(P @ P, P)}")   # True (idempotent)
print(f"P^T == P? {np.allclose(P.T, P)}")      # True (symmetric)

# Residual orthogonal to every column of A?
for i in range(A.shape[1]):
    dot = np.dot(resid3, A[:, i])
    print(f"resid . col_{i} = {dot:.1f}")       # 0.0
```

## Connection to CS / Games / AI

- **Least-squares regression** solves $\mathbf{A}^T\mathbf{A}\hat{\mathbf{x}} = \mathbf{A}^T\mathbf{b}$ — exactly the normal equations we just derived. Fitting a line through data is a projection problem.
- **PCA** projects high-dimensional data onto the subspace of the top eigenvectors of the covariance matrix.
- **Shadow rendering** in games is literally projecting 3-D geometry onto a 2-D surface.
- **Gram-Schmidt** (next lesson) repeatedly subtracts projections to build orthogonal bases, which power QR decomposition and stable numerical solvers.

## Check Your Understanding

1. Compute $\text{proj}_{\mathbf{u}}\mathbf{v}$ by hand for $\mathbf{v} = \begin{pmatrix}1\\5\end{pmatrix}$, $\mathbf{u} = \begin{pmatrix}3\\1\end{pmatrix}$. Verify the residual is orthogonal to $\mathbf{u}$.

2. Show that if $\mathbf{v}$ already lies in subspace $W$, then $\mathbf{P}\mathbf{v} = \mathbf{v}$ and the residual is $\mathbf{0}$.

3. If $\mathbf{P}$ is the projection matrix onto $W$, what does $\mathbf{I} - \mathbf{P}$ project onto? Verify that $(\mathbf{I}-\mathbf{P})^2 = \mathbf{I}-\mathbf{P}$.
