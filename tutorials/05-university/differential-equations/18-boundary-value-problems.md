# Boundary Value Problems and Eigenvalue Problems

## Intuition

An initial value problem specifies what happens at the **start** ($y(0)$,
$y'(0)$). A boundary value problem specifies conditions at **two different
points** — say the temperature at both ends of a rod. This changes the
mathematics drastically: solutions may not exist, or there may be infinitely
many. When the BVP has a parameter $\lambda$, only special values of $\lambda$
(eigenvalues) give nonzero solutions (eigenfunctions). These eigenfunctions are
the "natural modes" of vibrating strings, drumheads, and quantum particles.

## Prerequisites

- Tier 11, Lesson 7: Second-Order Homogeneous ODEs
- Tier 2, Lesson 9: Eigenvalues & Eigenvectors (matrix analogy)

## From First Principles

### IVP vs BVP

**IVP:** $y'' + y = 0$, $y(0) = 1$, $y'(0) = 0$. Unique solution: $y = \cos t$.

**BVP:** $y'' + y = 0$, $y(0) = 0$, $y(\pi) = 0$. General solution:
$y = A\cos t + B\sin t$. Apply $y(0) = 0$: $A = 0$. Apply $y(\pi) = 0$:
$B\sin\pi = 0$, which is satisfied for **any** $B$. Infinitely many solutions!

### The Eigenvalue Problem

Consider:

$$y'' + \lambda y = 0, \quad y(0) = 0, \quad y(L) = 0$$

We seek values of $\lambda$ for which nontrivial ($y \neq 0$) solutions exist.

**Case 1: $\lambda < 0$.** Let $\lambda = -\mu^2$ ($\mu > 0$). General solution:

$$y = A\cosh(\mu x) + B\sinh(\mu x)$$

$y(0) = 0 \Rightarrow A = 0$. $y(L) = 0 \Rightarrow B\sinh(\mu L) = 0$.
Since $\sinh(\mu L) \neq 0$ for $\mu > 0$, we need $B = 0$. Only trivial solution.

**Case 2: $\lambda = 0$.** $y'' = 0 \Rightarrow y = Ax + B$. Boundary
conditions force $A = B = 0$. Trivial.

**Case 3: $\lambda > 0$.** Let $\lambda = \mu^2$. General solution:

$$y = A\cos(\mu x) + B\sin(\mu x)$$

$y(0) = 0 \Rightarrow A = 0$. $y(L) = 0 \Rightarrow B\sin(\mu L) = 0$.

For nontrivial $B \neq 0$: $\sin(\mu L) = 0 \Rightarrow \mu L = n\pi$, $n = 1, 2, 3, \ldots$

### Eigenvalues and Eigenfunctions

$$\lambda_n = \left(\frac{n\pi}{L}\right)^2, \qquad y_n(x) = \sin\frac{n\pi x}{L}, \quad n = 1, 2, 3, \ldots$$

These are the natural frequencies and mode shapes of a vibrating string
fixed at both ends.

### Sturm-Liouville Theory (Preview)

The general form:

$$\frac{d}{dx}\left[p(x)\,y'\right] + q(x)\,y + \lambda\,w(x)\,y = 0$$

with boundary conditions at $x = a$ and $x = b$. Key results:

1. Eigenvalues are real.
2. Eigenfunctions for different eigenvalues are **orthogonal** with weight $w(x)$.
3. The eigenfunctions form a **complete** set (any reasonable function can be expanded).

Our example is the simplest case: $p = 1$, $q = 0$, $w = 1$.

### Visualisation

Plot the first several eigenfunctions.

```python
import numpy as np
import matplotlib.pyplot as plt

L = np.pi
x = np.linspace(0, L, 300)

fig, axes = plt.subplots(2, 2, figsize=(10, 7))
axes = axes.ravel()

for n in range(1, 5):
    ax = axes[n - 1]
    y_n = np.sin(n * np.pi * x / L)
    lam_n = (n * np.pi / L) ** 2

    ax.plot(x, y_n, linewidth=2)
    ax.axhline(0, color='k', linewidth=0.5)
    ax.set_title(f'n={n}, λ = {lam_n:.2f}')
    ax.set_xlabel('x')
    ax.set_ylabel(f'y_{n}(x)')
    ax.grid(True, alpha=0.3)

plt.suptitle("Eigenfunctions: y'' + λy = 0, y(0) = y(π) = 0", fontsize=13)
plt.tight_layout()
plt.savefig("bvp_eigenfunctions.png", dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np
import sympy as sp

x, lam = sp.symbols('x lambda', positive=True)
L_val = sp.pi

# ── Symbolic: verify eigenfunctions satisfy the BVP ─────
for n in range(1, 5):
    y_n = sp.sin(n * sp.pi * x / L_val)
    lam_n = (n * sp.pi / L_val)**2

    # Check y'' + lambda*y = 0
    residual = sp.diff(y_n, x, 2) + lam_n * y_n
    residual_simplified = sp.simplify(residual)
    bc_left = y_n.subs(x, 0)
    bc_right = y_n.subs(x, L_val)

    print(f"n={n}: λ = {lam_n}, residual = {residual_simplified}, "
          f"y(0) = {bc_left}, y(L) = {bc_right}")

# ── Orthogonality check ────────────────────────────────
print("\nOrthogonality (integral of y_m * y_n over [0, pi]):")
for m in range(1, 4):
    for n in range(m, 4):
        y_m = sp.sin(m * sp.pi * x / L_val)
        y_n = sp.sin(n * sp.pi * x / L_val)
        inner = sp.integrate(y_m * y_n, (x, 0, L_val))
        print(f"  <y_{m}, y_{n}> = {sp.simplify(inner)}")

# ── Numerical BVP solver (finite differences) ──────────
# Solve y'' + lambda*y = 0 on [0, pi] with y(0) = y(pi) = 0
# Discretise: y''_i ≈ (y_{i-1} - 2y_i + y_{i+1}) / h^2
N = 100
h = np.pi / (N + 1)
# Build matrix A such that A*y = -lambda*y (eigenvalue problem)
diag = -2 * np.ones(N)
off = np.ones(N - 1)
A = (np.diag(diag) + np.diag(off, 1) + np.diag(off, -1)) / h**2

eigenvalues, eigenvectors = np.linalg.eigh(-A)
print("\nNumerical eigenvalues (first 5):", eigenvalues[:5])
print("Exact eigenvalues:             ", [(n**2) for n in range(1, 6)])
```

## Connection to CS / Games / AI / Business / Industry

- **Vibrating strings** — The eigenfunctions are the harmonic modes of guitar
  strings and drum membranes (audio synthesis, game physics).
- **Quantum mechanics** — The Schrodinger equation is a Sturm-Liouville problem;
  eigenvalues are energy levels (quantum ML, molecular simulation).
- **PDE solutions** — Separation of variables for heat/wave equations (Lessons
  20–21) produces exactly these BVP eigenvalue problems.
- **Spectral methods in ML** — Graph Laplacian eigenvalues are the discrete
  analogue; they power spectral clustering and graph neural networks.

## Check Your Understanding

1. Solve $y'' + \lambda y = 0$, $y(0) = 0$, $y(1) = 0$ (with $L = 1$).
   Write out the eigenvalues and eigenfunctions.

2. Verify orthogonality by hand: compute $\int_0^1 \sin(\pi x)\sin(2\pi x)\,dx$.

3. What happens if you change the boundary conditions to $y'(0) = 0$,
   $y'(L) = 0$? What are the eigenfunctions now? (Hint: cosines.)
