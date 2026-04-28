# Numerical Linear Algebra — Iterative Solvers, Sparse Matrices

## Intuition

Real-world matrices are often **huge** (millions × millions) and **sparse**
(mostly zeros).  Direct methods like Gaussian elimination don't scale.
Iterative methods approximate the solution step by step, exploiting sparsity
to run fast.  This is how Google solves PageRank, how physics simulations
solve systems, and how sparse neural networks operate.

## Prerequisites

- Tier 2, Lesson 8: Gaussian Elimination
- Tier 2, Lesson 13: Eigenvalues

## From First Principles

### Sparse matrices

A matrix where most entries are zero.  Store only non-zero entries.

A 1M × 1M matrix has $10^{12}$ entries.  If only 10M are non-zero (0.001% density), we store 10M instead of $10^{12}$.

### Formats

- **COO** (Coordinate): list of (row, col, value) triples
- **CSR** (Compressed Sparse Row): efficient for row operations and matrix-vector multiply
- **CSC** (Compressed Sparse Column): efficient for column operations

### Iterative methods for $\mathbf{Ax} = \mathbf{b}$

**Jacobi method:**

$$x_i^{(k+1)} = \frac{1}{a_{ii}}\left(b_i - \sum_{j \ne i} a_{ij} x_j^{(k)}\right)$$

**Pen & paper:** Solve $\begin{pmatrix} 4 & 1 \\ 1 & 3 \end{pmatrix}\mathbf{x} = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$

Start $\mathbf{x}^{(0)} = (0, 0)$:

$x_1^{(1)} = (1 - 1 \times 0)/4 = 0.25$
$x_2^{(1)} = (2 - 1 \times 0)/3 = 0.667$

$x_1^{(2)} = (1 - 1 \times 0.667)/4 = 0.083$
$x_2^{(2)} = (2 - 1 \times 0.25)/3 = 0.583$

Converging toward the exact solution.

### Conjugate gradient (CG)

For symmetric positive definite $\mathbf{A}$: the gold standard iterative solver.  Converges in at most $n$ steps (but usually much fewer).

### Power iteration (for eigenvalues)

To find the **dominant eigenvalue**: repeatedly multiply by $\mathbf{A}$ and normalise:

$$\mathbf{v}^{(k+1)} = \frac{\mathbf{A}\mathbf{v}^{(k)}}{\|\mathbf{A}\mathbf{v}^{(k)}\|}$$

This is how PageRank works: power iteration on the web graph matrix.

### Condition number

$$\kappa(\mathbf{A}) = \frac{\sigma_{\max}}{\sigma_{\min}}$$

High condition number = small input changes cause large output changes = **ill-conditioned**.

## Python Verification

```python
# ── Numerical Linear Algebra ────────────────────────────────

# Jacobi iteration
print("=== Jacobi method ===")
A = [[4, 1], [1, 3]]
b = [1, 2]
x = [0.0, 0.0]

for k in range(10):
    x_new = [
        (b[0] - A[0][1]*x[1]) / A[0][0],
        (b[1] - A[1][0]*x[0]) / A[1][1],
    ]
    if k < 5 or k == 9:
        print(f"  k={k}: x = ({x_new[0]:.6f}, {x_new[1]:.6f})")
    x = x_new

# Verify: exact solution
print(f"  Exact: det = {4*3 - 1*1} = 11")
x_exact = [(1*3 - 1*2)/11, (4*2 - 1*1)/11]
print(f"  Exact: ({x_exact[0]:.6f}, {x_exact[1]:.6f})")

# Power iteration for dominant eigenvalue
print(f"\n=== Power iteration ===")
import math
A = [[2, 1], [1, 3]]
v = [1.0, 1.0]  # initial guess

for k in range(10):
    # Multiply: Av
    Av = [A[0][0]*v[0]+A[0][1]*v[1], A[1][0]*v[0]+A[1][1]*v[1]]
    # Normalise
    norm = math.sqrt(Av[0]**2 + Av[1]**2)
    v = [Av[0]/norm, Av[1]/norm]
    # Eigenvalue estimate: Rayleigh quotient
    Av2 = [A[0][0]*v[0]+A[0][1]*v[1], A[1][0]*v[0]+A[1][1]*v[1]]
    lam = v[0]*Av2[0] + v[1]*Av2[1]
    if k < 4 or k == 9:
        print(f"  k={k}: λ ≈ {lam:.6f}, v = ({v[0]:.4f}, {v[1]:.4f})")

# Sparse matrix: storage comparison
print(f"\n=== Sparse matrix storage ===")
for N, nnz in [(1000, 5000), (100000, 500000), (1000000, 10000000)]:
    dense = N * N
    sparse = nnz * 3  # COO: row, col, val
    ratio = dense / sparse
    print(f"  {N}×{N}, nnz={nnz:>10,}: dense={dense:>15,}, sparse={sparse:>11,}, savings={ratio:.0f}×")
```

## Visualisation — Sparse matrices and iterative-solver convergence

Two pictures: the **sparsity pattern** of a real-world-style sparse
matrix (most entries zero), and the convergence of three iterative
solvers (Jacobi, Gauss–Seidel, conjugate gradient) on the same system.

```python
# ── Visualising sparse matrices and iterative solvers ───────
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(0)

# Build a 60×60 banded sparse matrix that is symmetric positive-definite.
# Such matrices arise in finite-element analysis and PDE discretisation.
N = 60
A = np.zeros((N, N))
for i in range(N):
    A[i, i] = 4.0
    if i > 0:
        A[i, i - 1] = -1.0; A[i - 1, i] = -1.0
    if i > 1 and rng.random() < 0.1:
        A[i, i - 2] = -0.5; A[i - 2, i] = -0.5
b = rng.standard_normal(N)
x_true = np.linalg.solve(A, b)

fig, axes = plt.subplots(1, 2, figsize=(14, 5.5))

# (1) Sparsity pattern: black where A[i, j] ≠ 0.
ax = axes[0]
ax.spy(A, markersize=4, color="navy")
nnz = int(np.sum(A != 0))
density = nnz / (N * N) * 100
ax.set_title(f"Sparsity pattern of a 60×60 banded matrix\n"
             f"non-zeros: {nnz}/{N*N} ({density:.1f}%)\n"
             f"For real-world matrices density is often 0.001%")
ax.set_xlabel("column"); ax.set_ylabel("row")

# (2) Iterative-solver convergence: residual ||Ax_k − b|| over iterations.
ax = axes[1]

def jacobi(A, b, n_iter):
    D = np.diag(A); R = A - np.diag(D)
    x = np.zeros_like(b); residuals = []
    for _ in range(n_iter):
        x = (b - R @ x) / D
        residuals.append(np.linalg.norm(A @ x - b))
    return residuals

def gauss_seidel(A, b, n_iter):
    n = len(b); x = np.zeros(n); residuals = []
    for _ in range(n_iter):
        for i in range(n):
            s = sum(A[i, j] * x[j] for j in range(n) if j != i)
            x[i] = (b[i] - s) / A[i, i]
        residuals.append(np.linalg.norm(A @ x - b))
    return residuals

def conjugate_gradient(A, b, n_iter):
    x = np.zeros_like(b); r = b - A @ x; p = r.copy()
    rs_old = r @ r; residuals = []
    for _ in range(n_iter):
        Ap = A @ p
        alpha = rs_old / (p @ Ap)
        x = x + alpha * p
        r = r - alpha * Ap
        residuals.append(np.linalg.norm(A @ x - b))
        rs_new = r @ r
        if rs_new < 1e-30: break
        p = r + (rs_new / rs_old) * p
        rs_old = rs_new
    return residuals

n_iter = 60
ax.semilogy(jacobi(A, b, n_iter),              "o-", color="tab:red",
            lw=1.5, markersize=3, label="Jacobi")
ax.semilogy(gauss_seidel(A, b, n_iter),        "s-", color="tab:orange",
            lw=1.5, markersize=3, label="Gauss-Seidel")
ax.semilogy(conjugate_gradient(A, b, n_iter),  "^-", color="tab:green",
            lw=1.5, markersize=3, label="Conjugate Gradient")
ax.set_xlabel("iteration")
ax.set_ylabel("||Ax − b|| (log)")
ax.set_title("Convergence of three iterative solvers\n(CG dominates for SPD matrices)")
ax.legend(); ax.grid(True, which="both", alpha=0.3)

plt.tight_layout()
plt.show()

# Storage comparison printed.
print(f"Storage (60×60 example): dense = {N*N} numbers, sparse-COO = "
      f"~3·nnz = {3*nnz}\n")
print(f"At REAL-world scales the saving is huge:")
for N_v, nnz_v in [(1_000, 5_000), (100_000, 500_000), (1_000_000, 10_000_000)]:
    dense = N_v * N_v; sparse = 3 * nnz_v
    print(f"  {N_v:>9,}×{N_v:<9,}  dense={dense:>15,}  sparse={sparse:>14,}  "
          f"saving = {dense // sparse}×")
```

**Two truths every numerical-linear-algebra engineer learns:**

- **Storage decides the algorithm.** A million-by-million dense matrix
  needs $10^{12}$ floats — petabytes of memory. The same matrix in
  CSR sparse format with 1% density needs ~$10^{10}$ × 12 bytes ≈
  120 GB. *That's why iterative methods exist*: they only need to
  multiply $A v$, never to materialise $A^{-1}$.
- **Conjugate Gradient (CG) is the workhorse for symmetric positive-
  definite systems.** It converges in at most $n$ iterations exactly,
  but in *practice* converges to high precision in $O(\sqrt{\kappa})$
  iterations, where $\kappa$ is the condition number. **Preconditioned
  CG** is what powers finite-element solvers, PDE discretisations,
  and the second-order optimisation steps inside ML libraries like
  PyTorch's L-BFGS.

## Connection to CS / Games / AI / Business / Industry

- **AI / ML.** Training large language models ($10^{11}+$ parameters)
  uses **iterative solvers and Krylov methods** because exact methods
  blow up at that scale. Recommendation systems (Netflix, Spotify,
  YouTube) factorise enormous *sparse* user-item matrices — the
  rating matrix is 99.99% empty.
- **CS / Software.** **PageRank** computes the dominant eigenvector of
  a sparse web-graph matrix with billions of nodes; only iterative
  methods (power iteration, GMRES) make this tractable. Compilers solve
  sparse data-flow systems for register allocation. SAT/ILP solvers in
  query optimisers rely on sparse-matrix routines.
- **Engineering / Science.** **Finite-element analysis** — every car
  crash test, every airliner wing-flex sim, every bridge-load calc —
  produces enormous sparse stiffness matrices solved by conjugate
  gradient or multigrid. **Computational fluid dynamics** for weather
  forecasts and Formula-1 aero is the same picture at a still larger
  scale.
- **Business / Industry.** **Power-grid load flow**: every utility
  control room solves a sparse non-linear system every few seconds to
  decide how to dispatch generation. Telecom routing tables, supply-chain
  network optimisation, and MRI reconstruction (compressed sensing) all
  hinge on sparse iterative solvers.
- **Games / Graphics.** Real-time **soft-body / cloth simulation**
  (Houdini, Unreal Chaos) and physically-based fluid solvers run sparse
  linear systems every frame; without iterative methods you'd never hit
  60 fps.

## Check Your Understanding

1. **Pen & paper:** Do 3 Jacobi iterations on $\begin{pmatrix} 5 & 1 \\ 1 & 4 \end{pmatrix}\mathbf{x} = \begin{pmatrix} 6 \\ 5 \end{pmatrix}$ starting from $(0, 0)$.
2. **Pen & paper:** Apply 2 steps of power iteration to $\begin{pmatrix} 3 & 1 \\ 0 & 2 \end{pmatrix}$ starting from $v = (1, 1)$.
3. **Think about it:** Why can't we use Gaussian elimination on a 1 million × 1 million sparse matrix?
