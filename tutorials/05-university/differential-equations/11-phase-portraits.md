# Phase Portraits & Fixed Point Classification

## Intuition

A phase portrait is a map of all possible futures of a system. Instead of
plotting $x$ vs $t$, you plot $x_1$ vs $x_2$ — the state space. Arrows show
where the system flows from any starting point. Fixed points are like
attractors or repellers: a ball rolling toward a valley floor (stable node) or
balanced on a hilltop (unstable). In reinforcement learning, the optimal policy
creates a flow toward the goal state.

## Prerequisites

- Tier 11, Lesson 10: Systems of ODEs (eigenvalue method, matrix form)
- Tier 2, Lesson 13: Eigenvalues & Eigenvectors

## From First Principles

### The 2D Autonomous System

$$x_1' = f(x_1, x_2)$$
$$x_2' = g(x_1, x_2)$$

At each point $(x_1, x_2)$, the vector $(f, g)$ gives the velocity — the
direction and speed of motion.

### Fixed Points (Equilibria)

A **fixed point** is where $f(x_1, x_2) = 0$ and $g(x_1, x_2) = 0$
simultaneously. The system sits still there.

### Linear Classification

For the linear system $\mathbf{X}' = A\mathbf{X}$, the origin is the only
fixed point (assuming $\det A \neq 0$). The eigenvalues $\lambda_1, \lambda_2$
determine the type:

| Eigenvalues | Type | Stability |
|---|---|---|
| $\lambda_1, \lambda_2 < 0$ (real, distinct) | **Stable node** | Asymptotically stable |
| $\lambda_1, \lambda_2 > 0$ (real, distinct) | **Unstable node** | Unstable |
| $\lambda_1 < 0 < \lambda_2$ (real, opposite sign) | **Saddle point** | Unstable |
| $\lambda = \alpha \pm \beta i$, $\alpha < 0$ | **Stable spiral** | Asymptotically stable |
| $\lambda = \alpha \pm \beta i$, $\alpha > 0$ | **Unstable spiral** | Unstable |
| $\lambda = \pm \beta i$ (pure imaginary) | **Center** | Stable (not asymptotically) |
| $\lambda_1 = \lambda_2 < 0$ (repeated) | **Stable star/degenerate node** | Asymptotically stable |

### Pen & Paper: Classify the Fixed Point

**Example 1:** $A = \begin{pmatrix} -3 & 0 \\ 0 & -1 \end{pmatrix}$

Eigenvalues: $\lambda_1 = -3$, $\lambda_2 = -1$. Both negative.
Type: **stable node**. Trajectories approach origin along eigenvector directions.

**Example 2:** $A = \begin{pmatrix} 1 & -2 \\ 1 & -1 \end{pmatrix}$

$\det(A - \lambda I) = (1-\lambda)(-1-\lambda) + 2 = \lambda^2 - 1 + 2 = \lambda^2 + 1 = 0$

$\lambda = \pm i$. Pure imaginary. Type: **center**. Closed orbits (ellipses).

**Example 3:** $A = \begin{pmatrix} 1 & 0 \\ 0 & -2 \end{pmatrix}$

$\lambda_1 = 1 > 0$, $\lambda_2 = -2 < 0$. Type: **saddle point**.
Trajectories approach along the $x_2$-axis and escape along the $x_1$-axis.

### Drawing Phase Portraits by Hand

1. Find eigenvalues and eigenvectors.
2. Draw eigenvector directions as straight-line trajectories.
3. For stable directions ($\lambda < 0$): arrows point toward origin.
4. For unstable directions ($\lambda > 0$): arrows point away.
5. Fill in the rest by interpolating between eigenvector directions.
6. For spirals: trajectories curve around the origin.
7. For saddles: trajectories approach along one eigenvector, then curve away
   along the other.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

def plot_phase_portrait(A, ax, title, xlim=(-3, 3), ylim=(-3, 3)):
    """Plot phase portrait for X' = AX."""
    # Vector field
    x1 = np.linspace(xlim[0], xlim[1], 15)
    x2 = np.linspace(ylim[0], ylim[1], 15)
    X1, X2 = np.meshgrid(x1, x2)
    dX1 = A[0, 0] * X1 + A[0, 1] * X2
    dX2 = A[1, 0] * X1 + A[1, 1] * X2
    N = np.sqrt(dX1**2 + dX2**2)
    N[N == 0] = 1
    ax.quiver(X1, X2, dX1/N, dX2/N, N, cmap="coolwarm", alpha=0.6, scale=25)

    # Trajectories
    from scipy.integrate import solve_ivp
    for angle in np.linspace(0, 2*np.pi, 12, endpoint=False):
        x0 = [2.5 * np.cos(angle), 2.5 * np.sin(angle)]
        sol = solve_ivp(lambda t, X: A @ X, [0, 5], x0,
                        t_eval=np.linspace(0, 5, 300), max_step=0.02)
        ax.plot(sol.y[0], sol.y[1], "k-", linewidth=0.6)

    ax.plot(0, 0, "ro", markersize=8)
    evals = np.linalg.eigvals(A)
    ax.set_title(f"{title}\nlambda = {evals[0]:.2f}, {evals[1]:.2f}")
    ax.set_xlim(xlim)
    ax.set_ylim(ylim)
    ax.set_aspect("equal")
    ax.set_xlabel("x1")
    ax.set_ylabel("x2")

fig, axes = plt.subplots(2, 3, figsize=(14, 9))

# Stable node
plot_phase_portrait(np.array([[-3, 0], [0, -1]]), axes[0, 0], "Stable Node")
# Unstable node
plot_phase_portrait(np.array([[2, 0], [0, 1]]), axes[0, 1], "Unstable Node")
# Saddle
plot_phase_portrait(np.array([[1, 0], [0, -2]]), axes[0, 2], "Saddle Point")
# Stable spiral
plot_phase_portrait(np.array([[-0.5, 2], [-2, -0.5]]), axes[1, 0], "Stable Spiral")
# Unstable spiral
plot_phase_portrait(np.array([[0.3, 2], [-2, 0.3]]), axes[1, 1], "Unstable Spiral")
# Center
plot_phase_portrait(np.array([[0, 1], [-1, 0]]), axes[1, 2], "Center")

plt.tight_layout()
plt.show()
```

## Python Verification

```python
import numpy as np

# --- Classify several systems ---
print("=== Fixed point classification ===\n")

systems = {
    "Stable node": np.array([[-3, 0], [0, -1]]),
    "Unstable node": np.array([[2, 0], [0, 1]]),
    "Saddle": np.array([[1, 0], [0, -2]]),
    "Stable spiral": np.array([[-0.5, 2], [-2, -0.5]]),
    "Center": np.array([[0, 1], [-1, 0]]),
}

for name, A in systems.items():
    evals, evecs = np.linalg.eig(A)
    tr = np.trace(A)
    det = np.linalg.det(A)
    disc = tr**2 - 4*det

    print(f"  {name}:")
    print(f"    A = {A.tolist()}")
    print(f"    Eigenvalues: {evals}")
    print(f"    Trace = {tr:.2f}, Det = {det:.2f}, Disc = {disc:.2f}")

    # Classify
    if np.all(np.isreal(evals)):
        evals_real = evals.real
        if np.all(evals_real < 0):
            classification = "stable node"
        elif np.all(evals_real > 0):
            classification = "unstable node"
        else:
            classification = "saddle"
    else:
        alpha = evals[0].real
        if alpha < 0:
            classification = "stable spiral"
        elif alpha > 0:
            classification = "unstable spiral"
        else:
            classification = "center"

    print(f"    Classification: {classification}")
    print()

# --- Shortcut: trace-determinant plane ---
print("=== Trace-Determinant classification shortcut ===")
print("  If det < 0: saddle")
print("  If det > 0 and tr^2 - 4*det > 0: node (stable if tr<0)")
print("  If det > 0 and tr^2 - 4*det < 0: spiral (stable if tr<0)")
print("  If det > 0 and tr = 0: center")
```

## Connection to CS / Games / AI / Business / Industry

- **Reinforcement learning policies**: the trained policy creates a vector
  field in state space; stable fixed points are goal states the agent has
  learned to reach.
- **Game AI behaviour trees**: an NPC's state transitions can be modelled as
  a dynamical system; fixed points are idle states.
- **Gradient descent dynamics**: the loss landscape defines a flow
  $\theta' = -\nabla L$. Minima are stable fixed points, saddle points are
  saddles in the phase portrait.
- **Fluid particle tracing** in visual effects follows phase portrait logic.
- **Population dynamics** (Lotka-Volterra predator-prey) produce centers or
  spirals depending on parameters — understanding these prevents ecological
  simulations from blowing up.

## Check Your Understanding

1. Given $A = \begin{pmatrix} -1 & 4 \\ -1 & -1 \end{pmatrix}$, find the
   eigenvalues, classify the fixed point, and describe the trajectory shape.

2. Prove that a 2x2 system has a saddle point if and only if $\det(A) < 0$.
   (Hint: relate the determinant to the product of eigenvalues.)

3. For the matrix $A = \begin{pmatrix} 0 & 1 \\ -4 & 0 \end{pmatrix}$,
   classify the fixed point and sketch the phase portrait. What physical
   system does this represent?
