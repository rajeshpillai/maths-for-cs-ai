# Systems of ODEs

## Intuition

Real-world systems rarely involve a single quantity. A predator-prey model has
two populations. A circuit has voltage and current. A robot arm has position
and velocity for each joint. When multiple quantities change simultaneously
and influence each other, you get a **system** of ODEs. Writing it as
$\mathbf{X}' = A\mathbf{X}$ turns the problem into linear algebra — the
eigenvalues of $A$ tell you everything about the system's behaviour.

## Prerequisites

- Tier 11, Lesson 7: Second-Order Homogeneous ODEs (characteristic equation, exponential solutions)
- Tier 2, Lesson 13: Eigenvalues & Eigenvectors (we solve $A\mathbf{v} = \lambda\mathbf{v}$)
- Tier 2, Lesson 4: Matrix multiplication

## From First Principles

### From a Single Second-Order ODE to a System

Any second-order ODE $y'' + by' + cy = 0$ can be rewritten as a system of two
first-order ODEs. Let $x_1 = y$ and $x_2 = y'$:

$$x_1' = x_2$$
$$x_2' = -cx_1 - bx_2$$

In matrix form:

$$\begin{pmatrix} x_1' \\ x_2' \end{pmatrix} = \begin{pmatrix} 0 & 1 \\ -c & -b \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix}$$

$$\mathbf{X}' = A\mathbf{X}$$

### The General 2x2 Linear System

$$\frac{d}{dt}\begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{pmatrix}\begin{pmatrix} x_1 \\ x_2 \end{pmatrix}$$

### The Eigenvalue Method

**Guess:** $\mathbf{X}(t) = \mathbf{v}e^{\lambda t}$ where $\mathbf{v}$ is a
constant vector.

Substitute into $\mathbf{X}' = A\mathbf{X}$:

$$\lambda \mathbf{v} e^{\lambda t} = A \mathbf{v} e^{\lambda t}$$

Cancel $e^{\lambda t} \neq 0$:

$$A\mathbf{v} = \lambda \mathbf{v}$$

This is the **eigenvalue problem**! Find eigenvalues $\lambda_1, \lambda_2$
and eigenvectors $\mathbf{v}_1, \mathbf{v}_2$.

General solution:

$$\mathbf{X}(t) = C_1 \mathbf{v}_1 e^{\lambda_1 t} + C_2 \mathbf{v}_2 e^{\lambda_2 t}$$

### Worked Example

Solve:

$$x_1' = -x_1 + 2x_2$$
$$x_2' = x_1 - 2x_2$$

$$A = \begin{pmatrix} -1 & 2 \\ 1 & -2 \end{pmatrix}$$

**Step 1 — Eigenvalues.** $\det(A - \lambda I) = 0$:

$$(-1 - \lambda)(-2 - \lambda) - 2 \cdot 1 = 0$$

$$\lambda^2 + 3\lambda + 2 - 2 = 0$$

$$\lambda^2 + 3\lambda = 0$$

$$\lambda(\lambda + 3) = 0$$

$\lambda_1 = 0$, $\lambda_2 = -3$.

**Step 2 — Eigenvectors.**

For $\lambda_1 = 0$: $(A - 0I)\mathbf{v} = 0$:

$$\begin{pmatrix} -1 & 2 \\ 1 & -2 \end{pmatrix}\begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$

$-v_1 + 2v_2 = 0 \Rightarrow v_1 = 2v_2$. Choose $\mathbf{v}_1 = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$.

For $\lambda_2 = -3$: $(A + 3I)\mathbf{v} = 0$:

$$\begin{pmatrix} 2 & 2 \\ 1 & 1 \end{pmatrix}\begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$

$v_1 + v_2 = 0 \Rightarrow v_1 = -v_2$. Choose $\mathbf{v}_2 = \begin{pmatrix} 1 \\ -1 \end{pmatrix}$.

**Step 3 — General solution:**

$$\mathbf{X}(t) = C_1 \begin{pmatrix} 2 \\ 1 \end{pmatrix} e^{0 \cdot t} + C_2 \begin{pmatrix} 1 \\ -1 \end{pmatrix} e^{-3t}$$

$$x_1(t) = 2C_1 + C_2 e^{-3t}$$
$$x_2(t) = C_1 - C_2 e^{-3t}$$

As $t \to \infty$: $x_1 \to 2C_1$, $x_2 \to C_1$. The system settles on the
eigenspace of $\lambda_1 = 0$.

### Complex Eigenvalues

If $\lambda = \alpha \pm \beta i$ with eigenvector
$\mathbf{v} = \mathbf{a} + i\mathbf{b}$, the real solution is:

$$\mathbf{X}(t) = C_1 e^{\alpha t}(\mathbf{a}\cos\beta t - \mathbf{b}\sin\beta t) + C_2 e^{\alpha t}(\mathbf{a}\sin\beta t + \mathbf{b}\cos\beta t)$$

This gives spiralling trajectories in the $(x_1, x_2)$ plane.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

# System: x1' = -x1 + 2*x2, x2' = x1 - 2*x2
# Solution: x1 = 2*C1 + C2*exp(-3t), x2 = C1 - C2*exp(-3t)
t = np.linspace(0, 3, 300)

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Left: time series for several ICs
ax = axes[0]
for C1, C2 in [(1, 1), (1, -1), (0, 2), (2, 0)]:
    x1 = 2*C1 + C2*np.exp(-3*t)
    x2 = C1 - C2*np.exp(-3*t)
    ax.plot(t, x1, "-", label=f"x1 (C1={C1},C2={C2})")
    ax.plot(t, x2, "--", label=f"x2 (C1={C1},C2={C2})")

ax.set_xlabel("t")
ax.set_ylabel("x")
ax.set_title("Time series: x1 and x2")
ax.legend(fontsize=6, ncol=2)

# Right: phase portrait (x1 vs x2)
ax = axes[1]
for C1, C2 in [(1, 1), (1, -1), (0, 2), (2, 0), (-1, 1), (1, 2)]:
    x1 = 2*C1 + C2*np.exp(-3*t)
    x2 = C1 - C2*np.exp(-3*t)
    ax.plot(x1, x2, "-", linewidth=1.2)
    ax.plot(x1[0], x2[0], "ko", markersize=4)

# Eigenvector directions
ax.arrow(0, 0, 2, 1, head_width=0.1, fc="red", ec="red")
ax.arrow(0, 0, 0.8, -0.8, head_width=0.1, fc="blue", ec="blue")
ax.text(2.1, 1.1, "v1 (lambda=0)", fontsize=8, color="red")
ax.text(0.9, -1.0, "v2 (lambda=-3)", fontsize=8, color="blue")
ax.set_xlabel("x1")
ax.set_ylabel("x2")
ax.set_title("Phase portrait")
ax.set_aspect("equal")

plt.tight_layout()
plt.show()
```

## Python Verification

```python
import numpy as np
from scipy.integrate import solve_ivp

# --- Verify eigenvalues and eigenvectors ---
A = np.array([[-1, 2],
              [1, -2]])

eigenvalues, eigenvectors = np.linalg.eig(A)
print("=== Eigenvalue decomposition ===")
print(f"  Eigenvalues: {eigenvalues}")
print(f"  Eigenvectors (columns):\n{eigenvectors}")
print()

# --- Verify solution with ICs ---
print("=== Solution: C1=1, C2=1 => x1(0)=3, x2(0)=0 ===")

def system(t, X):
    return A @ X

sol = solve_ivp(system, [0, 3], [3, 0], t_eval=np.linspace(0, 3, 10))

# Analytical: C1=1, C2=1
C1, C2 = 1, 1
t_check = sol.t
x1_exact = 2*C1 + C2*np.exp(-3*t_check)
x2_exact = C1 - C2*np.exp(-3*t_check)

print(f"  {'t':>5}  {'x1_num':>10}  {'x1_exact':>10}  {'x2_num':>10}  {'x2_exact':>10}")
for i in range(len(t_check)):
    print(f"  {t_check[i]:5.2f}  {sol.y[0][i]:10.6f}  {x1_exact[i]:10.6f}"
          f"  {sol.y[1][i]:10.6f}  {x2_exact[i]:10.6f}")

print()

# --- Long-term behaviour ---
print("=== Long-term: x1 -> 2*C1, x2 -> C1 ===")
print(f"  As t->inf: x1 -> {2*C1}, x2 -> {C1}")
print(f"  Numerical at t=3: x1 = {sol.y[0][-1]:.6f}, x2 = {sol.y[1][-1]:.6f}")
```

## Connection to CS / Games / AI

- **Coupled physics**: two masses connected by a spring, or two pendulums on a
  shared rail, are systems of ODEs. Game engines solve these every frame.
- **Predator-prey (Lotka-Volterra)**: $dx/dt = ax - bxy$, $dy/dt = -cy + dxy$
  is a nonlinear system of ODEs used in ecology simulations and agent-based models.
- **State-space control**: robotics represents dynamics as $\mathbf{X}' = A\mathbf{X} + B\mathbf{u}$
  where $\mathbf{u}$ is the control input. Eigenvalues determine stability.
- **Recurrent neural networks**: the continuous-time analogue is
  $d\mathbf{h}/dt = -\mathbf{h} + W\sigma(\mathbf{h}) + \mathbf{x}$, a
  system of ODEs in the hidden state.
- **Graph dynamics**: signal propagation on a graph is governed by
  $\mathbf{x}' = -L\mathbf{x}$ where $L$ is the graph Laplacian. Eigenvalues
  of $L$ determine how fast information diffuses.

## Check Your Understanding

1. Convert $y'' + 5y' + 6y = 0$ into a 2x2 system $\mathbf{X}' = A\mathbf{X}$.
   Find the eigenvalues of $A$ and verify they match the characteristic roots
   from Lesson 7.

2. Solve the system $x_1' = 3x_1 + x_2$, $x_2' = x_1 + 3x_2$ using the
   eigenvalue method. What happens as $t \to \infty$?

3. For the system $x_1' = -x_2$, $x_2' = x_1$, find the eigenvalues. They
   are complex — what does the solution look like geometrically?
