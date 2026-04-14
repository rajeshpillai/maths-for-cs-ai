# Dynamical Systems, Bifurcations, and Chaos

## Intuition

Most differential equations you have seen so far are linear — superposition
works and solutions are predictable. Nonlinear systems can do something
fundamentally different: they can exhibit **chaos**, where tiny changes in
initial conditions lead to vastly different outcomes. Weather prediction fails
beyond about 10 days for exactly this reason. The Lorenz system — three simple
coupled equations — produces the famous "butterfly attractor," a geometric
object that is neither a point nor a loop but a **strange attractor**.

## Prerequisites

- Tier 11, Lesson 12: Stability Analysis (equilibria, linearisation)
- Tier 11, Lesson 10: Systems of ODEs
- Tier 11, Lesson 22: Numerical Methods (RK4 for simulation)

## From First Principles

### Nonlinear Systems

A general autonomous system:

$$\dot{x} = f(x, y), \qquad \dot{y} = g(x, y)$$

If $f$ and $g$ are nonlinear, the principle of superposition fails. New
phenomena emerge: **limit cycles** (periodic orbits that attract nearby
trajectories), **bifurcations** (qualitative changes as a parameter varies),
and **chaos** (sensitive dependence on initial conditions).

### Bifurcations

A **bifurcation** occurs when a small change in a parameter causes a
qualitative change in the system's behaviour.

**Saddle-node bifurcation:** $\dot{x} = r + x^2$.

- $r < 0$: two equilibria at $x = \pm\sqrt{-r}$ (one stable, one unstable).
- $r = 0$: they merge into one.
- $r > 0$: no equilibria. The system "falls off a cliff."

### The Lorenz System

Edward Lorenz (1963) discovered chaos in this simplified model of atmospheric
convection:

$$\dot{x} = \sigma(y - x)$$
$$\dot{y} = x(\rho - z) - y$$
$$\dot{z} = xy - \beta z$$

Classical parameters: $\sigma = 10$, $\rho = 28$, $\beta = 8/3$.

**Equilibria:** Set all derivatives to zero. Three fixed points exist:

- The origin $(0, 0, 0)$ — unstable for $\rho > 1$.
- Two symmetric points $(\pm\sqrt{\beta(\rho-1)}, \pm\sqrt{\beta(\rho-1)}, \rho-1)$ — also unstable for $\rho > 24.74$.

When all equilibria are unstable, the trajectory wanders forever on the
strange attractor without repeating.

### Sensitivity to Initial Conditions

Two trajectories starting at $(1, 1, 1)$ and $(1.001, 1, 1)$ will diverge
exponentially. The **Lyapunov exponent** $\lambda$ measures this rate:

$$|\delta(t)| \sim |\delta(0)|\,e^{\lambda t}$$

Positive $\lambda$ means chaos. For the Lorenz system, $\lambda \approx 0.9$.

### Pen & Paper: Saddle-Node Bifurcation

For $\dot{x} = r + x^2$:

Equilibria: $x^* = \pm\sqrt{-r}$ (exist only when $r \leq 0$).

Stability: $f'(x^*) = 2x^*$.
- At $x^* = +\sqrt{-r}$: $f' = 2\sqrt{-r} > 0$ → unstable.
- At $x^* = -\sqrt{-r}$: $f' = -2\sqrt{-r} < 0$ → stable.

At $r = 0$: single equilibrium at $x = 0$, $f'(0) = 0$ (marginal).

### Visualisation

The Lorenz butterfly attractor.

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

def lorenz(state, sigma=10, rho=28, beta=8/3):
    x, y, z = state
    return np.array([sigma*(y - x), x*(rho - z) - y, x*y - beta*z])

# RK4 integration
dt = 0.005
N = 20000
traj = np.zeros((N, 3))
traj[0] = [1, 1, 1]

for i in range(N - 1):
    k1 = lorenz(traj[i])
    k2 = lorenz(traj[i] + dt/2 * k1)
    k3 = lorenz(traj[i] + dt/2 * k2)
    k4 = lorenz(traj[i] + dt * k3)
    traj[i+1] = traj[i] + (dt/6) * (k1 + 2*k2 + 2*k3 + k4)

# Second trajectory with slightly different IC
traj2 = np.zeros((N, 3))
traj2[0] = [1.001, 1, 1]
for i in range(N - 1):
    k1 = lorenz(traj2[i])
    k2 = lorenz(traj2[i] + dt/2 * k1)
    k3 = lorenz(traj2[i] + dt/2 * k2)
    k4 = lorenz(traj2[i] + dt * k3)
    traj2[i+1] = traj2[i] + (dt/6) * (k1 + 2*k2 + 2*k3 + k4)

fig = plt.figure(figsize=(12, 5))

# 3D attractor
ax1 = fig.add_subplot(121, projection='3d')
ax1.plot(traj[:, 0], traj[:, 1], traj[:, 2], linewidth=0.3, alpha=0.7)
ax1.set_xlabel('x')
ax1.set_ylabel('y')
ax1.set_zlabel('z')
ax1.set_title('Lorenz Attractor')

# Divergence of nearby trajectories
ax2 = fig.add_subplot(122)
t = np.arange(N) * dt
dist = np.linalg.norm(traj - traj2, axis=1)
ax2.semilogy(t, dist)
ax2.set_xlabel('t')
ax2.set_ylabel('Distance between trajectories')
ax2.set_title('Sensitive Dependence on Initial Conditions')
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig("lorenz_attractor.png", dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np
from scipy.integrate import solve_ivp

# ── Lorenz system via scipy ─────────────────────────────
sigma, rho, beta = 10, 28, 8/3

def lorenz_ode(t, state):
    x, y, z = state
    return [sigma*(y-x), x*(rho-z)-y, x*y - beta*z]

sol = solve_ivp(lorenz_ode, [0, 50], [1, 1, 1], max_step=0.01,
                t_eval=np.linspace(0, 50, 10000))

print("Lorenz system statistics (t=25 to t=50, transient removed):")
mask = sol.t > 25
print(f"  x: mean={sol.y[0,mask].mean():.2f}, std={sol.y[0,mask].std():.2f}")
print(f"  z: mean={sol.y[2,mask].mean():.2f}, std={sol.y[2,mask].std():.2f}")

# ── Equilibria ──────────────────────────────────────────
eq1 = np.array([0, 0, 0])
eq2 = np.array([np.sqrt(beta*(rho-1)), np.sqrt(beta*(rho-1)), rho-1])
eq3 = -eq2.copy()
eq3[2] = rho - 1  # z is same sign

print(f"\nEquilibria:")
print(f"  Origin: {eq1}")
print(f"  C+: [{eq2[0]:.4f}, {eq2[1]:.4f}, {eq2[2]:.4f}]")

# Jacobian at origin
J_origin = np.array([[-sigma, sigma, 0], [rho, -1, 0], [0, 0, -beta]])
eigs = np.linalg.eigvals(J_origin)
print(f"\nEigenvalues at origin: {eigs}")
print(f"  All have negative real part? {all(e.real < 0 for e in eigs)}")
print(f"  (Origin is unstable for rho > 1)")

# ── Estimate Lyapunov exponent ──────────────────────────
# Track divergence of two nearby trajectories
sol1 = solve_ivp(lorenz_ode, [0, 30], [1, 1, 1], max_step=0.005,
                 t_eval=np.linspace(0, 30, 6000))
sol2 = solve_ivp(lorenz_ode, [0, 30], [1.0001, 1, 1], max_step=0.005,
                 t_eval=np.linspace(0, 30, 6000))

dist = np.linalg.norm(sol1.y - sol2.y, axis=0)
# Fit log(dist) = lambda*t + const in the early exponential growth phase
mask = (sol1.t > 1) & (sol1.t < 15) & (dist > 1e-10) & (dist < 10)
if mask.sum() > 10:
    coeffs = np.polyfit(sol1.t[mask], np.log(dist[mask]), 1)
    print(f"\nEstimated Lyapunov exponent: {coeffs[0]:.2f}")
    print(f"(Positive => chaos; literature value ~0.9)")
```

## Connection to CS / Games / AI

- **Weather forecasting** — Lorenz's discovery explains why weather prediction
  degrades after ~10 days; ensemble methods (running many perturbed simulations)
  are the practical response.
- **Procedural generation** — Chaotic systems produce complex, non-repeating
  patterns useful for terrain, textures, and particle effects in games.
- **Reservoir computing** — Echo state networks exploit chaotic dynamics in
  recurrent networks to process temporal data.
- **Reinforcement learning** — Chaotic environments (turbulent fluid control,
  complex robotics) challenge RL agents because small actions lead to
  unpredictable outcomes.

## Check Your Understanding

1. For $\dot{x} = r - x^2$, find the equilibria and their stability as a
   function of $r$. Sketch the bifurcation diagram.

2. Modify the Lorenz parameters to $\rho = 15$. Does the system still exhibit
   chaos, or does it settle to a fixed point? Run the simulation to find out.

3. What is the dimension of the Lorenz attractor? (It is not an integer!
   The correlation dimension is approximately 2.05. Explain what a
   fractional dimension means intuitively.)
