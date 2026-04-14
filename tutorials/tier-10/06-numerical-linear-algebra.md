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

## Check Your Understanding

1. **Pen & paper:** Do 3 Jacobi iterations on $\begin{pmatrix} 5 & 1 \\ 1 & 4 \end{pmatrix}\mathbf{x} = \begin{pmatrix} 6 \\ 5 \end{pmatrix}$ starting from $(0, 0)$.
2. **Pen & paper:** Apply 2 steps of power iteration to $\begin{pmatrix} 3 & 1 \\ 0 & 2 \end{pmatrix}$ starting from $v = (1, 1)$.
3. **Think about it:** Why can't we use Gaussian elimination on a 1 million × 1 million sparse matrix?
