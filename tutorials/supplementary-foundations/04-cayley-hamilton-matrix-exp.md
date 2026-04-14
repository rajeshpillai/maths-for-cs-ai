# Cayley-Hamilton Theorem and Matrix Exponential

## Intuition

The **Cayley-Hamilton theorem** says every matrix satisfies its own
characteristic equation — you can use this to compute matrix powers and
inverses without brute force.  The **matrix exponential** $e^{\mathbf{A}}$
extends the scalar $e^x$ to matrices, and it solves systems of linear
differential equations.  It appears in control theory, quantum mechanics,
and continuous-time neural networks.

## Prerequisites

- Tier 2, Lesson 7: Determinants
- Tier 2, Lesson 13: Eigenvalues & Eigenvectors
- Tier 3, Lesson 9: Taylor Series

## From First Principles

### Characteristic polynomial

For $\mathbf{A}$ (2×2): $p(\lambda) = \det(\mathbf{A} - \lambda\mathbf{I}) = \lambda^2 - \text{tr}(\mathbf{A})\lambda + \det(\mathbf{A})$

### Cayley-Hamilton theorem

**Statement:** Every square matrix satisfies its own characteristic equation:

$$p(\mathbf{A}) = \mathbf{0}$$

### Pen & paper: 2×2 example

$\mathbf{A} = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$

$\text{tr}(\mathbf{A}) = 5$, $\det(\mathbf{A}) = -2$

Characteristic equation: $\lambda^2 - 5\lambda - 2 = 0$

Cayley-Hamilton says: $\mathbf{A}^2 - 5\mathbf{A} - 2\mathbf{I} = \mathbf{0}$

**Verify:**

$\mathbf{A}^2 = \begin{pmatrix} 7 & 10 \\ 15 & 22 \end{pmatrix}$

$5\mathbf{A} = \begin{pmatrix} 5 & 10 \\ 15 & 20 \end{pmatrix}$

$\mathbf{A}^2 - 5\mathbf{A} - 2\mathbf{I} = \begin{pmatrix} 7-5-2 & 10-10-0 \\ 15-15-0 & 22-20-2 \end{pmatrix} = \begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix}$ ✓

### Applications of Cayley-Hamilton

**Inverse:** From $\mathbf{A}^2 - 5\mathbf{A} - 2\mathbf{I} = 0$:

$\mathbf{A}^2 - 5\mathbf{A} = 2\mathbf{I}$ → $\mathbf{A}(\mathbf{A} - 5\mathbf{I}) = 2\mathbf{I}$

$\mathbf{A}^{-1} = \frac{1}{2}(\mathbf{A} - 5\mathbf{I}) = \frac{1}{2}\begin{pmatrix} -4 & 2 \\ 3 & -1 \end{pmatrix} = \begin{pmatrix} -2 & 1 \\ 1.5 & -0.5 \end{pmatrix}$

**Higher powers:** Express $\mathbf{A}^n$ as $\alpha\mathbf{A} + \beta\mathbf{I}$ (for 2×2).

Since $\mathbf{A}^2 = 5\mathbf{A} + 2\mathbf{I}$:

$\mathbf{A}^3 = \mathbf{A} \cdot \mathbf{A}^2$

Substitute $\mathbf{A}^2 = 5\mathbf{A} + 2\mathbf{I}$:

$= \mathbf{A}(5\mathbf{A} + 2\mathbf{I}) = 5\mathbf{A}^2 + 2\mathbf{A}$

Substitute $\mathbf{A}^2$ again:

$= 5(5\mathbf{A} + 2\mathbf{I}) + 2\mathbf{A} = 25\mathbf{A} + 10\mathbf{I} + 2\mathbf{A} = 27\mathbf{A} + 10\mathbf{I}$

### Matrix exponential

$$e^{\mathbf{A}} = \sum_{k=0}^{\infty} \frac{\mathbf{A}^k}{k!} = \mathbf{I} + \mathbf{A} + \frac{\mathbf{A}^2}{2!} + \frac{\mathbf{A}^3}{3!} + \cdots$$

### Pen & paper: Diagonal matrix

If $\mathbf{A} = \begin{pmatrix} a & 0 \\ 0 & b \end{pmatrix}$, then $e^{\mathbf{A}} = \begin{pmatrix} e^a & 0 \\ 0 & e^b \end{pmatrix}$

### Diagonalisable case

If $\mathbf{A} = \mathbf{PDP}^{-1}$:

$$e^{\mathbf{A}} = \mathbf{P} e^{\mathbf{D}} \mathbf{P}^{-1} = \mathbf{P}\begin{pmatrix} e^{\lambda_1} & 0 \\ 0 & e^{\lambda_2}\end{pmatrix}\mathbf{P}^{-1}$$

### Solving $\dot{\mathbf{x}} = \mathbf{Ax}$

The system of linear ODEs $\frac{d\mathbf{x}}{dt} = \mathbf{Ax}$ has solution:

$$\mathbf{x}(t) = e^{\mathbf{A}t}\mathbf{x}(0)$$

This generalises $\dot{x} = ax$ → $x = e^{at}x_0$ to multiple dimensions.

## Python Verification

```python
# ── Cayley-Hamilton & Matrix Exponential ────────────────────
import math

# 2x2 matrix operations
def mat_mul(A, B):
    return [[A[0][0]*B[0][0]+A[0][1]*B[1][0], A[0][0]*B[0][1]+A[0][1]*B[1][1]],
            [A[1][0]*B[0][0]+A[1][1]*B[1][0], A[1][0]*B[0][1]+A[1][1]*B[1][1]]]

def mat_add(A, B):
    return [[A[i][j]+B[i][j] for j in range(2)] for i in range(2)]

def mat_scale(s, A):
    return [[s*A[i][j] for j in range(2)] for i in range(2)]

def mat_print(name, A):
    print(f"  {name} = [[{A[0][0]:.3f}, {A[0][1]:.3f}], [{A[1][0]:.3f}, {A[1][1]:.3f}]]")

I = [[1,0],[0,1]]

# Cayley-Hamilton
A = [[1,2],[3,4]]
trace = A[0][0] + A[1][1]
det = A[0][0]*A[1][1] - A[0][1]*A[1][0]
print(f"=== Cayley-Hamilton ===")
print(f"A = {A}, trace={trace}, det={det}")
print(f"Characteristic: λ² - {trace}λ + ({det}) = 0")

A2 = mat_mul(A, A)
# A² - 5A - 2I should be zero
result = mat_add(mat_add(A2, mat_scale(-trace, A)), mat_scale(-det, I))
mat_print("A² - 5A - 2I", result)

# Inverse via Cayley-Hamilton
A_inv = mat_scale(1/det, mat_add(A, mat_scale(-trace, I)))
print(f"\n=== Inverse via Cayley-Hamilton ===")
mat_print("A⁻¹", A_inv)
# Verify
product = mat_mul(A, A_inv)
mat_print("A·A⁻¹", product)

# Matrix exponential via Taylor series
print(f"\n=== Matrix exponential: e^A (20 terms) ===")
A_small = [[0.1, 0.2], [0.3, 0.4]]
exp_A = [[0,0],[0,0]]
A_power = [[1,0],[0,1]]  # A^0 = I
factorial = 1
for k in range(20):
    if k > 0:
        factorial *= k
    exp_A = mat_add(exp_A, mat_scale(1/factorial, A_power))
    A_power = mat_mul(A_power, A_small)

mat_print("e^A", exp_A)

# Diagonal case: e^diag(1,2)
print(f"\n=== Diagonal: e^diag(1,2) ===")
print(f"  = diag(e¹, e²) = diag({math.e:.4f}, {math.e**2:.4f})")

# Solve dx/dt = Ax
print(f"\n=== Solve dx/dt = Ax, x(0) = [1, 0] ===")
# A = [[0, 1], [-1, 0]] → rotation!
# e^(At) rotates by angle t
print("  A = [[0,1],[-1,0]] → rotation matrix")
for t in [0, 0.5, 1.0, 1.57]:
    x = math.cos(t)
    y = -math.sin(t)
    print(f"  t={t:.2f}: x=({x:.3f}, {y:.3f})")
```

## Connection to CS / Games / AI

- **Neural ODEs** — continuous-depth networks solve $\dot{\mathbf{h}} = f(\mathbf{h}, t)$; matrix exponential for the linear case
- **Control theory** — state-space models: $\dot{\mathbf{x}} = \mathbf{Ax} + \mathbf{Bu}$, solved via $e^{\mathbf{A}t}$
- **Quantum computing** — unitary gates are matrix exponentials: $U = e^{-iHt}$
- **Graph theory** — $e^{\mathbf{A}}$ (where $\mathbf{A}$ is adjacency) counts walks in graphs
- **Efficient computation** — Cayley-Hamilton reduces matrix powers to linear combinations

## Check Your Understanding

1. **Pen & paper:** Verify Cayley-Hamilton for $\begin{pmatrix} 2 & 1 \\ 0 & 3 \end{pmatrix}$.
2. **Pen & paper:** Use Cayley-Hamilton to find $\mathbf{A}^{-1}$ for $\begin{pmatrix} 3 & 1 \\ 2 & 2 \end{pmatrix}$.
3. **Pen & paper:** Compute $e^{\mathbf{A}}$ for $\mathbf{A} = \begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix}$ and $\mathbf{A} = \begin{pmatrix} 1 & 0 \\ 0 & 2 \end{pmatrix}$.
