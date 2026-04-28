# Stability Analysis & Linearization

## Intuition

Most real systems are nonlinear — a pendulum's $\sin\theta$, a population's
logistic growth, a neural network's activation functions. But near a fixed
point, every smooth nonlinear system *looks* linear. **Linearization** zooms
in on a fixed point and asks: does the system return to equilibrium after a
small push, or does it fly away? This is the mathematical foundation of
stability in control systems, RL convergence, and game physics.

## Prerequisites

- Tier 11, Lesson 11: Phase Portraits & Fixed Point Classification
- Tier 3, Lesson 3: Partial Derivatives (Jacobian matrix)
- Tier 2, Lesson 13: Eigenvalues

## From First Principles

### Nonlinear Systems

Consider the general 2D autonomous system:

$$x_1' = f(x_1, x_2)$$
$$x_2' = g(x_1, x_2)$$

A fixed point $(\bar{x}_1, \bar{x}_2)$ satisfies
$f(\bar{x}_1, \bar{x}_2) = 0$ and $g(\bar{x}_1, \bar{x}_2) = 0$.

### The Jacobian Matrix

The **Jacobian** at the fixed point is the matrix of partial derivatives:

$$J = \begin{pmatrix} \frac{\partial f}{\partial x_1} & \frac{\partial f}{\partial x_2} \\ \frac{\partial g}{\partial x_1} & \frac{\partial g}{\partial x_2} \end{pmatrix} \Bigg|_{(\bar{x}_1, \bar{x}_2)}$$

### Linearization Theorem (Hartman-Grobman)

If the eigenvalues of $J$ have **nonzero real parts** (no purely imaginary
eigenvalues), then near the fixed point the nonlinear system behaves
qualitatively like the linear system:

$$\mathbf{u}' = J\mathbf{u}$$

where $\mathbf{u} = \mathbf{X} - \bar{\mathbf{X}}$ is the deviation from the
fixed point.

**Important caveat:** If the eigenvalues are purely imaginary (center), the
linear approximation is inconclusive — the nonlinear terms decide stability.

### Stability Definitions

- **Stable**: nearby trajectories stay nearby (but may not converge)
- **Asymptotically stable**: nearby trajectories converge to the fixed point
- **Unstable**: some nearby trajectories move away

For the linearized system:

- All eigenvalues have $\text{Re}(\lambda) < 0$ $\Rightarrow$ asymptotically stable
- Any eigenvalue has $\text{Re}(\lambda) > 0$ $\Rightarrow$ unstable

### Worked Example: Nonlinear Pendulum

The damped pendulum: $\theta'' + 0.5\theta' + \sin\theta = 0$.

As a system: $x_1 = \theta$, $x_2 = \theta'$:

$$x_1' = x_2$$
$$x_2' = -\sin(x_1) - 0.5 x_2$$

**Fixed points:** $x_2 = 0$ and $\sin(x_1) = 0$, so $x_1 = n\pi$.

**Jacobian:**

$$J = \begin{pmatrix} 0 & 1 \\ -\cos(x_1) & -0.5 \end{pmatrix}$$

**At $(0, 0)$ (hanging down):**

$$J = \begin{pmatrix} 0 & 1 \\ -1 & -0.5 \end{pmatrix}$$

Eigenvalues: $\lambda^2 + 0.5\lambda + 1 = 0$

$\lambda = \frac{-0.5 \pm \sqrt{0.25 - 4}}{2} = -0.25 \pm 0.968i$

$\text{Re}(\lambda) = -0.25 < 0$ $\Rightarrow$ **stable spiral**. The pendulum
oscillates back to rest.

**At $(\pi, 0)$ (balanced upright):**

$$J = \begin{pmatrix} 0 & 1 \\ 1 & -0.5 \end{pmatrix}$$

Eigenvalues: $\lambda^2 + 0.5\lambda - 1 = 0$

$\lambda = \frac{-0.5 \pm \sqrt{0.25 + 4}}{2} = \frac{-0.5 \pm 2.06}{2}$

$\lambda_1 \approx 0.78 > 0$, $\lambda_2 \approx -1.28 < 0$ $\Rightarrow$ **saddle point**. Unstable.

### Lyapunov Stability (Intuitive)

A **Lyapunov function** $V(\mathbf{x})$ is like an "energy" that decreases
along trajectories:

- $V(\bar{\mathbf{x}}) = 0$ and $V(\mathbf{x}) > 0$ for $\mathbf{x} \neq \bar{\mathbf{x}}$
- $\dot{V} = \frac{dV}{dt} \leq 0$ along solutions

If such a $V$ exists with $\dot{V} < 0$, the fixed point is asymptotically
stable. If $\dot{V} \leq 0$, it is stable.

For the damped pendulum: $V = \frac{1}{2}x_2^2 + (1 - \cos x_1)$ (kinetic +
potential energy). $\dot{V} = -0.5 x_2^2 \leq 0$. Energy is dissipated by
damping. Stability confirmed.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import solve_ivp

def damped_pendulum(t, X):
    x1, x2 = X
    return [x2, -np.sin(x1) - 0.5*x2]

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Left: phase portrait near (0,0) - stable spiral
ax = axes[0]
for angle in np.linspace(0, 2*np.pi, 16, endpoint=False):
    x0 = [1.5*np.cos(angle), 1.5*np.sin(angle)]
    sol = solve_ivp(damped_pendulum, [0, 20], x0,
                    t_eval=np.linspace(0, 20, 500), max_step=0.05)
    ax.plot(sol.y[0], sol.y[1], "b-", linewidth=0.6, alpha=0.7)

ax.plot(0, 0, "go", markersize=10, label="Stable spiral (0,0)")
ax.set_xlabel("theta")
ax.set_ylabel("theta'")
ax.set_title("Near (0,0): stable spiral")
ax.set_xlim(-2, 2)
ax.set_ylim(-2, 2)
ax.legend()
ax.set_aspect("equal")

# Right: phase portrait near (pi, 0) - saddle
ax = axes[1]
for x1_start in np.linspace(np.pi - 1.5, np.pi + 1.5, 8):
    for x2_start in np.linspace(-1.5, 1.5, 8):
        sol = solve_ivp(damped_pendulum, [0, 10], [x1_start, x2_start],
                        t_eval=np.linspace(0, 10, 300), max_step=0.05)
        ax.plot(sol.y[0], sol.y[1], "r-", linewidth=0.3, alpha=0.5)

ax.plot(np.pi, 0, "rs", markersize=10, label="Saddle (pi,0)")
ax.set_xlabel("theta")
ax.set_ylabel("theta'")
ax.set_title("Near (pi,0): saddle point")
ax.set_xlim(np.pi - 2, np.pi + 2)
ax.set_ylim(-3, 3)
ax.legend()

plt.tight_layout()
plt.show()
```

## Python Verification

```python
import numpy as np

# --- Jacobian at (0,0) ---
print("=== Damped pendulum: fixed point (0, 0) ===")
J_origin = np.array([[0, 1], [-1, -0.5]])
evals_origin = np.linalg.eigvals(J_origin)
print(f"  Jacobian:\n{J_origin}")
print(f"  Eigenvalues: {evals_origin}")
print(f"  Real parts: {evals_origin.real}")
print(f"  Classification: stable spiral (both Re < 0)")
print()

# --- Jacobian at (pi, 0) ---
print("=== Damped pendulum: fixed point (pi, 0) ===")
J_pi = np.array([[0, 1], [1, -0.5]])
evals_pi = np.linalg.eigvals(J_pi)
print(f"  Jacobian:\n{J_pi}")
print(f"  Eigenvalues: {evals_pi}")
print(f"  Real parts: {evals_pi.real}")
print(f"  Classification: saddle (one positive, one negative)")
print()

# --- Lyapunov function check ---
print("=== Lyapunov function: V = 0.5*x2^2 + (1 - cos(x1)) ===")
# Check dV/dt along a trajectory
from scipy.integrate import solve_ivp

def pendulum(t, X):
    return [X[1], -np.sin(X[0]) - 0.5*X[1]]

sol = solve_ivp(pendulum, [0, 20], [1.0, 0.5], t_eval=np.linspace(0, 20, 100))
x1, x2 = sol.y

V = 0.5 * x2**2 + (1 - np.cos(x1))
dVdt = np.gradient(V, sol.t)

print(f"  V at t=0:  {V[0]:.6f}")
print(f"  V at t=10: {V[50]:.6f}")
print(f"  V at t=20: {V[-1]:.6f}")
print(f"  V is decreasing: {np.all(np.diff(V) <= 1e-8)}")
print(f"  dV/dt (analytical) = -0.5*x2^2 <= 0: confirmed")

print()

# --- Lotka-Volterra example ---
print("=== Lotka-Volterra: x'=x(3-y), y'=y(x-2) ===")
print("  Fixed points: (0,0) and (2,3)")
# Jacobian: [[3-y, -x], [y, x-2]]
J_22 = np.array([[3-3, -2], [3, 2-2]])  # at (2,3)
print(f"  Jacobian at (2,3):\n{J_22}")
evals_lv = np.linalg.eigvals(J_22)
print(f"  Eigenvalues: {evals_lv}")
print(f"  Pure imaginary => center (linearization inconclusive)")
```

## Connection to CS / Games / AI / Business / Industry

- **Reinforcement learning convergence**: the Bellman operator's fixed point
  is the optimal value function. Stability of the fixed point determines
  whether iterative methods (value iteration, Q-learning) converge.
- **GAN training**: the Nash equilibrium is a fixed point of the two-player
  dynamics. Mode collapse happens when this fixed point is unstable or a
  saddle.
- **Gradient descent on non-convex loss**: saddle points in the loss landscape
  are saddle fixed points of $\theta' = -\nabla L$. Momentum helps escape them.
- **Robotics balancing**: stabilizing an inverted pendulum is exactly
  stabilizing the saddle point $(\pi, 0)$ using feedback control.
- **Ecology / epidemiology models**: endemic equilibria in SIR models are
  analysed for stability to predict disease outcomes.

## Check Your Understanding

1. For the system $x' = x(2 - x - y)$, $y' = y(1 - y + x)$, find all fixed
   points. Compute the Jacobian at each and classify them.

2. Explain why linearization is inconclusive at a center. Give an example of a
   nonlinear system whose fixed point looks like a center under linearization
   but is actually a stable spiral.

3. Propose a Lyapunov function for the system $x' = -x^3$, $y' = -y$. Show
   that $\dot{V} < 0$ except at the origin.
