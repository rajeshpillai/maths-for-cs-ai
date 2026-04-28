# Applications: Neural ODEs, PINNs, and Hamiltonian Networks

## Intuition

Traditional neural networks map inputs to outputs through discrete layers.
**Neural ODEs** replace those layers with a continuous differential equation:
the hidden state evolves smoothly through "continuous depth." This merges deep
learning with dynamical systems. **Physics-Informed Neural Networks (PINNs)**
go further — they embed known physics (PDEs) into the loss function so the
network learns solutions that obey physical laws. **Hamiltonian Neural Networks**
guarantee energy conservation, critical for long-horizon physics simulation.

## Prerequisites

- Tier 11, Lesson 24: Dynamical Systems and Chaos (continuous dynamics)
- Tier 6, Lesson 4: Backpropagation (chain rule through network layers)
- Tier 11, Lesson 22: Numerical Methods for ODEs (forward solvers)

## From First Principles

### Neural ODEs

A residual network computes:

$$h_{t+1} = h_t + f_\theta(h_t, t)$$

As the number of layers grows and the step shrinks, this becomes:

$$\frac{dh}{dt} = f_\theta(h(t), t)$$

where $f_\theta$ is a neural network parameterised by $\theta$. Given an input
$h(0) = x$, the output is $h(T) = \text{ODESolve}(f_\theta, x, 0, T)$.

**Training:** Instead of backpropagating through the ODE solver steps (memory
expensive), we use the **adjoint method**. Define the adjoint state
$a(t) = \partial L / \partial h(t)$. It satisfies:

$$\frac{da}{dt} = -a(t)^T \frac{\partial f_\theta}{\partial h}$$

This is solved **backwards in time** from $t = T$ to $t = 0$, giving gradients
with $O(1)$ memory (independent of number of solver steps).

### Physics-Informed Neural Networks (PINNs)

Suppose we want to solve $u_t = k\,u_{xx}$ on a domain. A PINN:

1. Represents $u(x, t)$ as a neural network $u_\theta(x, t)$.
2. Defines a **physics loss**:

$$\mathcal{L}_{\text{PDE}} = \frac{1}{N}\sum_{i=1}^{N}\left[\frac{\partial u_\theta}{\partial t}(x_i, t_i) - k\frac{\partial^2 u_\theta}{\partial x^2}(x_i, t_i)\right]^2$$

3. Adds **boundary/initial condition losses**:

$$\mathcal{L}_{\text{BC}} = \frac{1}{M}\sum_{j}\left[u_\theta(x_j^{\text{bc}}, t_j^{\text{bc}}) - g(x_j, t_j)\right]^2$$

4. Total loss: $\mathcal{L} = \mathcal{L}_{\text{PDE}} + \lambda\,\mathcal{L}_{\text{BC}}$.

The partial derivatives of $u_\theta$ are computed via **automatic differentiation**
— the same tool that powers backpropagation.

### Hamiltonian Neural Networks

In Hamiltonian mechanics, a system's energy $H(q, p)$ determines the dynamics:

$$\dot{q} = \frac{\partial H}{\partial p}, \qquad \dot{p} = -\frac{\partial H}{\partial q}$$

These equations **conserve energy** by construction ($dH/dt = 0$).

A Hamiltonian Neural Network learns $H_\theta(q, p)$ and derives the dynamics
from its gradients. Because the structure guarantees conservation, the learned
system stays physically plausible even over long time horizons.

### Pen & Paper: PINN Loss for a Simple ODE

For $y' = -y$, $y(0) = 1$:

Let $y_\theta(t)$ be the network output. The physics loss at a point $t_i$:

$$r_i = y_\theta'(t_i) + y_\theta(t_i)$$

The IC loss: $(y_\theta(0) - 1)^2$.

Total: $\mathcal{L} = \frac{1}{N}\sum r_i^2 + (y_\theta(0) - 1)^2$.

### Visualisation

Neural ODE fitting a spiral trajectory.

```python
import numpy as np
import matplotlib.pyplot as plt

# ── Generate spiral training data ───────────────────────
# True dynamics: rotation + slight contraction
# dx/dt = -0.1*x - y,  dy/dt = x - 0.1*y
def true_dynamics(state):
    x, y = state
    return np.array([-0.1*x - y, x - 0.1*y])

dt = 0.1
T = 6.0
t_data = np.arange(0, T, dt)
trajectory = np.zeros((len(t_data), 2))
trajectory[0] = [2, 0]

for i in range(len(t_data) - 1):
    # RK4 step
    s = trajectory[i]
    k1 = true_dynamics(s)
    k2 = true_dynamics(s + dt/2*k1)
    k3 = true_dynamics(s + dt/2*k2)
    k4 = true_dynamics(s + dt*k3)
    trajectory[i+1] = s + (dt/6)*(k1 + 2*k2 + 2*k3 + k4)

# ── Simulate a "learned" Neural ODE (for illustration) ──
# In practice you'd train with PyTorch + torchdiffeq
# Here we show what the result looks like
noise = 0.05 * np.random.randn(*trajectory.shape)
noisy_data = trajectory + noise

# "Predicted" trajectory (using true dynamics as stand-in for trained model)
predicted = np.zeros_like(trajectory)
predicted[0] = trajectory[0]  # start from same IC
for i in range(len(t_data) - 1):
    s = predicted[i]
    k1 = true_dynamics(s)
    k2 = true_dynamics(s + dt/2*k1)
    k3 = true_dynamics(s + dt/2*k2)
    k4 = true_dynamics(s + dt*k3)
    predicted[i+1] = s + (dt/6)*(k1 + 2*k2 + 2*k3 + k4)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

ax1.plot(trajectory[:, 0], trajectory[:, 1], 'b-', linewidth=2, label='true')
ax1.scatter(noisy_data[:, 0], noisy_data[:, 1], c='r', s=10, alpha=0.5,
            label='noisy data')
ax1.plot(predicted[:, 0], predicted[:, 1], 'g--', linewidth=1.5,
         label='Neural ODE fit')
ax1.set_xlabel('x')
ax1.set_ylabel('y')
ax1.set_title('Neural ODE: Trajectory Fitting')
ax1.legend()
ax1.set_aspect('equal')
ax1.grid(True, alpha=0.3)

# Phase portrait of the learned vector field
xx, yy = np.meshgrid(np.linspace(-2.5, 2.5, 15), np.linspace(-2.5, 2.5, 15))
dx = -0.1*xx - yy
dy = xx - 0.1*yy
ax2.quiver(xx, yy, dx, dy, alpha=0.5)
ax2.plot(trajectory[:, 0], trajectory[:, 1], 'b-', linewidth=2)
ax2.set_xlabel('x')
ax2.set_ylabel('y')
ax2.set_title('Learned Vector Field')
ax2.set_aspect('equal')
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig("neural_ode_trajectory.png", dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np

# ── PINN concept: solve y' = -y, y(0) = 1 ──────────────
# We manually build a tiny "network": y(t) = a*exp(b*t) + c
# and optimise a, b, c to minimise physics + IC loss.
# (A real PINN uses a multi-layer network and autograd.)

def pinn_loss(params, t_colloc):
    a, b, c = params
    # y_theta(t) = a * exp(b*t) + c
    y = a * np.exp(b * t_colloc) + c
    # y'(t) = a*b * exp(b*t)
    yp = a * b * np.exp(b * t_colloc)

    # Physics residual: y' + y = 0
    residual = yp + y
    L_pde = np.mean(residual**2)

    # Initial condition: y(0) = 1
    y0 = a * np.exp(0) + c
    L_ic = (y0 - 1)**2

    return L_pde + 10 * L_ic

# Simple gradient descent (finite differences for gradients)
t_colloc = np.linspace(0, 3, 50)
params = np.array([0.5, -0.5, 0.3])  # initial guess
lr = 0.01
eps = 1e-5

for epoch in range(2000):
    loss = pinn_loss(params, t_colloc)
    # Numerical gradient
    grad = np.zeros(3)
    for i in range(3):
        p_plus = params.copy()
        p_plus[i] += eps
        grad[i] = (pinn_loss(p_plus, t_colloc) - loss) / eps
    params -= lr * grad

    if epoch % 500 == 0:
        print(f"Epoch {epoch}: loss = {loss:.6e}, params = {params}")

a, b, c = params
print(f"\nLearned: y(t) = {a:.4f} * exp({b:.4f}*t) + {c:.4f}")
print(f"Ideal:   y(t) = 1.0 * exp(-1.0*t) + 0.0")

# ── Hamiltonian conservation check ──────────────────────
# Simple harmonic oscillator: H(q, p) = 0.5*p^2 + 0.5*q^2
# Equations: dq/dt = p, dp/dt = -q
def hamiltonian(q, p):
    return 0.5 * p**2 + 0.5 * q**2

# Symplectic Euler (preserves energy structure)
dt = 0.01
N = 10000
q, p = 1.0, 0.0
H_values = []

for _ in range(N):
    H_values.append(hamiltonian(q, p))
    p = p - dt * q        # update p first (symplectic)
    q = q + dt * p        # then q with new p

print(f"\nHamiltonian conservation (symplectic Euler):")
print(f"  H(0) = {H_values[0]:.8f}")
print(f"  H(T) = {H_values[-1]:.8f}")
print(f"  Max drift: {max(H_values) - min(H_values):.2e}")

# Standard Euler for comparison
q2, p2 = 1.0, 0.0
H2_values = []
for _ in range(N):
    H2_values.append(hamiltonian(q2, p2))
    dq = p2
    dp = -q2
    q2 += dt * dq
    p2 += dt * dp

print(f"\nHamiltonian drift (standard Euler):")
print(f"  H(0) = {H2_values[0]:.8f}")
print(f"  H(T) = {H2_values[-1]:.8f}")
print(f"  Max drift: {max(H2_values) - min(H2_values):.2e}")
print("  (Standard Euler gains energy; symplectic Euler oscillates but stays bounded)")
```

## Connection to CS / Games / AI / Business / Industry

- **Neural ODEs** — Used for continuous normalizing flows (generative models),
  irregular time series (medical data), and latent dynamics models. The
  `torchdiffeq` library implements them.
- **PINNs** — Solve forward and inverse PDE problems: fluid dynamics, heat
  transfer, material science. NVIDIA Modulus is a major PINN framework.
- **Hamiltonian NNs** — Guarantee energy conservation in learned physics
  simulators, critical for robotics and molecular dynamics.
- **Game physics** — Symplectic integrators (the numerical counterpart of
  Hamiltonian NNs) keep game orbits stable; non-symplectic methods cause
  planets to spiral inward or outward.
- **Scientific ML** — The intersection of differential equations and machine
  learning is one of the fastest-growing research areas, with applications
  in climate modeling, drug discovery, and autonomous systems.

## Check Your Understanding

1. Explain why the adjoint method for Neural ODEs uses $O(1)$ memory while
   backpropagating through the solver uses $O(N)$ memory (where $N$ is the
   number of solver steps).

2. For a PINN solving $u_{xx} + u_{yy} = 0$ (Laplace equation), write out
   the physics loss using automatic differentiation notation. What collocation
   points would you sample?

3. Show by direct calculation that $dH/dt = 0$ for a Hamiltonian system.
   (Hint: use the chain rule and Hamilton's equations.)
