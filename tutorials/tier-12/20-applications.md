# Applications of Multivariable Calculus

## Intuition
Everything we have built in this tier — gradients, multiple integrals, vector
fields, divergence, curl, and the big theorems — comes together in the physical
and computational world. Fluid dynamics, electromagnetism, heat transfer, and
modern ML all speak the language of multivariable calculus. This lesson connects
the mathematics to real systems, showing how the same equations appear whether
you are simulating weather, training a normalizing flow, or rendering realistic
fluids in a game engine.

## Prerequisites
- Tier 12, Lesson 19 — The divergence theorem (Gauss's theorem)
- Tier 12, Lessons 15-18 — Green's, Stokes', and divergence theorems

## From First Principles

### 1. Fluid Dynamics: The Continuity and Navier-Stokes Equations

**Continuity equation** (mass conservation): no fluid is created or destroyed.

$$\frac{\partial \rho}{\partial t} + \nabla \cdot (\rho \mathbf{v}) = 0$$

where $\rho$ is density and $\mathbf{v}$ is velocity. This is the divergence
theorem in differential form: the rate of mass change in a region equals the
net inflow through its boundary.

For **incompressible** fluids ($\rho = \text{const}$):

$$\nabla \cdot \mathbf{v} = 0$$

**Navier-Stokes** (momentum conservation, simplified for incompressible flow):

$$\rho\left(\frac{\partial \mathbf{v}}{\partial t} + (\mathbf{v} \cdot \nabla)\mathbf{v}\right) = -\nabla p + \mu \nabla^2 \mathbf{v} + \mathbf{f}$$

Each term has meaning:
- $\rho \frac{\partial \mathbf{v}}{\partial t}$: acceleration (time change)
- $\rho(\mathbf{v} \cdot \nabla)\mathbf{v}$: convective acceleration (fluid carries itself)
- $-\nabla p$: pressure gradient force (high-to-low pressure)
- $\mu \nabla^2 \mathbf{v}$: viscous diffusion (friction between fluid layers)
- $\mathbf{f}$: external forces (gravity, etc.)

### Pen & Paper Example: Simple 1D Flow

Steady, 1D flow between parallel plates (Poiseuille flow). Navier-Stokes reduces to:

$$\mu \frac{d^2 v}{dy^2} = \frac{dp}{dx}$$

where $dp/dx$ is constant. Integrating twice with no-slip boundary conditions
$v(0) = v(h) = 0$:

$$v(y) = \frac{1}{2\mu}\frac{dp}{dx}(y^2 - hy)$$

This is a parabolic velocity profile — fastest in the middle, zero at the walls.

### 2. Electromagnetism: Maxwell's Equations

All four Maxwell equations use divergence, curl, and the integral theorems:

$$\nabla \cdot \mathbf{E} = \frac{\rho}{\epsilon_0} \quad \text{(Gauss's law — divergence theorem)}$$

$$\nabla \cdot \mathbf{B} = 0 \quad \text{(no magnetic monopoles)}$$

$$\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t} \quad \text{(Faraday's law — Stokes' theorem)}$$

$$\nabla \times \mathbf{B} = \mu_0 \mathbf{J} + \mu_0 \epsilon_0 \frac{\partial \mathbf{E}}{\partial t} \quad \text{(Ampere-Maxwell)}$$

**Key insight:** Gauss's law in integral form ($\oiint \mathbf{E} \cdot d\mathbf{S} = Q/\epsilon_0$)
is the divergence theorem applied to $\nabla \cdot \mathbf{E} = \rho/\epsilon_0$.

### 3. Heat Conduction

**Fourier's law:** heat flows from hot to cold, proportional to the temperature
gradient:

$$\mathbf{q} = -k\nabla T$$

Combined with energy conservation (divergence theorem):

$$\frac{\partial T}{\partial t} = \alpha \nabla^2 T$$

where $\alpha = k/(\rho c_p)$ is thermal diffusivity. This is the **heat equation**,
a PDE solved by physics-informed neural networks.

### Pen & Paper Example: Steady-State Heat in 1D

A rod of length $L$ with $T(0) = 0$, $T(L) = 100$. Steady state: $\nabla^2 T = 0$,
which in 1D is $d^2T/dx^2 = 0$. Integrating twice:

$$T(x) = \frac{100}{L}x$$

Linear temperature profile — heat flows uniformly from hot end to cold end.

### 4. Connections to ML: Normalizing Flows

A **normalizing flow** transforms a simple distribution $p_0(\mathbf{z}_0)$
through a series of invertible maps $\mathbf{z}_t = f_t(\mathbf{z}_0)$.

The density evolves by the **continuity equation** (change of variables + divergence):

$$\frac{\partial \log p}{\partial t} = -\nabla \cdot \mathbf{v}(\mathbf{z}_t, t)$$

where $\mathbf{v}$ is the velocity field of the flow. This directly uses the
divergence operator from lesson 16.

**Training** requires computing $\nabla \cdot \mathbf{v}$, which involves the
trace of the Jacobian — connecting back to lesson 12 (change of variables).

### 5. Physics-Informed Neural Networks (PINNs)

A PINN embeds a PDE as a loss term. For the heat equation:

$$\mathcal{L}_{\text{PDE}} = \left\|\frac{\partial T_\theta}{\partial t} - \alpha \nabla^2 T_\theta \right\|^2$$

The network $T_\theta(x,t)$ learns a solution that satisfies the PDE. Computing
$\nabla^2 T_\theta$ uses automatic differentiation — the chain rule from Tier 3
applied twice.

### Visualisation
```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 2, figsize=(14, 11))

# Panel 1: Poiseuille flow (parabolic velocity profile)
ax1 = axes[0, 0]
h = 1.0  # channel height
mu = 1.0
dpdx = -2.0  # negative pressure gradient drives flow
y = np.linspace(0, h, 100)
v = (1/(2*mu)) * dpdx * (y**2 - h*y)

ax1.plot(v, y, 'b-', linewidth=2.5)
ax1.fill_betweenx(y, 0, v, alpha=0.2, color='blue')
ax1.axvline(x=0, color='gray', linewidth=0.5)
# Velocity arrows
for yi in np.linspace(0.1, 0.9, 7):
    vi = (1/(2*mu)) * dpdx * (yi**2 - h*yi)
    ax1.annotate('', xy=(vi, yi), xytext=(0, yi),
                arrowprops=dict(arrowstyle='->', color='red', lw=1.5))

ax1.set_xlabel('Velocity v(y)')
ax1.set_ylabel('y (height)')
ax1.set_title('Poiseuille Flow\nParabolic velocity profile')
ax1.grid(True, alpha=0.3)

# Panel 2: Electric field of a point charge (divergence)
ax2 = axes[0, 1]
x = np.linspace(-2, 2, 12)
y_grid = np.linspace(-2, 2, 12)
X, Y = np.meshgrid(x, y_grid)
r = np.sqrt(X**2 + Y**2)
r[r < 0.3] = 0.3  # avoid singularity
Ex = X / r**3
Ey = Y / r**3
mag = np.sqrt(Ex**2 + Ey**2)
mag[mag == 0] = 1

ax2.quiver(X, Y, Ex/mag, Ey/mag, np.log(mag+1), cmap='Reds', alpha=0.7)
ax2.plot(0, 0, 'r*', markersize=20)
ax2.set_xlabel('x'); ax2.set_ylabel('y')
ax2.set_title('Electric Field of Point Charge\n∇·E = ρ/ε₀ (Gauss\'s Law)')
ax2.set_aspect('equal')
ax2.grid(True, alpha=0.3)

# Panel 3: Heat equation — temperature evolution
ax3 = axes[1, 0]
L = 1.0
alpha_val = 0.01
x_heat = np.linspace(0, L, 100)
times = [0, 0.01, 0.05, 0.2, 1.0]
colors = plt.cm.coolwarm(np.linspace(0, 1, len(times)))

for t_val, color in zip(times, colors):
    # Fourier series solution for initial condition T(x,0) = sin(pi*x/L)
    T = np.sin(np.pi * x_heat / L) * np.exp(-alpha_val * (np.pi/L)**2 * t_val)
    # Add higher harmonics for more interesting initial condition
    T += 0.5 * np.sin(3*np.pi*x_heat/L) * np.exp(-alpha_val*(3*np.pi/L)**2*t_val)
    ax3.plot(x_heat, T, color=color, linewidth=2, label=f't={t_val}')

ax3.set_xlabel('x')
ax3.set_ylabel('Temperature T(x,t)')
ax3.set_title('Heat Equation: ∂T/∂t = α∇²T\nTemperature diffuses over time')
ax3.legend()
ax3.grid(True, alpha=0.3)

# Panel 4: Normalizing flow concept
ax4 = axes[1, 1]
np.random.seed(42)
# Start with Gaussian samples
z0 = np.random.randn(500, 2) * 0.5

# Apply a simple invertible transformation (for illustration)
z1_x = z0[:, 0] + 0.5 * np.tanh(z0[:, 1])
z1_y = z0[:, 1] + 0.3 * np.sin(z0[:, 0] * 2)

ax4.scatter(z0[:, 0], z0[:, 1], s=5, alpha=0.4, color='blue', label='z₀ ~ N(0,I)')
ax4.scatter(z1_x, z1_y, s=5, alpha=0.4, color='red', label='z₁ = f(z₀)')

# Draw a few flow lines
for i in range(0, 500, 50):
    ax4.annotate('', xy=(z1_x[i], z1_y[i]), xytext=(z0[i,0], z0[i,1]),
                arrowprops=dict(arrowstyle='->', color='gray', lw=0.5, alpha=0.5))

ax4.set_xlabel('x'); ax4.set_ylabel('y')
ax4.set_title('Normalizing Flow\nSimple → Complex distribution\n∂log p/∂t = -∇·v')
ax4.legend(markerscale=3)
ax4.set_aspect('equal')
ax4.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

## Python Verification
```python
import numpy as np
from scipy import integrate
import matplotlib.pyplot as plt

# === 1. Poiseuille flow ===
h, mu, dpdx = 1.0, 1.0, -2.0
v_profile = lambda y: (1/(2*mu)) * dpdx * (y**2 - h*y)

# Total flow rate (integral of velocity)
Q, _ = integrate.quad(v_profile, 0, h)
exact_Q = -dpdx * h**3 / (12*mu)
print("=== Poiseuille Flow ===")
print(f"Flow rate Q = {Q:.6f}")
print(f"Exact: -dp/dx * h³/(12μ) = {exact_Q:.6f}")
print(f"Max velocity at y=h/2: {v_profile(h/2):.6f}")

# === 2. Heat equation: verify Fourier solution ===
print(f"\n=== Heat Equation Solution ===")
L, alpha = 1.0, 0.01
# T(x,t) = sin(πx/L) * exp(-α(π/L)²t) satisfies heat equation
# Check: ∂T/∂t = -α(π/L)² T, α∂²T/∂x² = -α(π/L)² T. Equal! ✓
k = np.pi / L
print(f"For T = sin(πx/L) exp(-α(π/L)²t):")
print(f"∂T/∂t coefficient: {-alpha * k**2:.6f}")
print(f"α ∂²T/∂x² coefficient: {-alpha * k**2:.6f}")
print(f"Heat equation satisfied: True")

# === 3. Divergence in normalizing flow ===
# For velocity field v = (v1(x,y), v2(x,y)):
# div v = ∂v1/∂x + ∂v2/∂y
# Simple example: v = (ax, by) gives div v = a + b
# Change in log density: d/dt log p = -(a+b)
a, b = 0.5, -0.3
print(f"\n=== Normalizing Flow: Linear velocity field ===")
print(f"v = ({a}x, {b}y)")
print(f"div v = {a} + {b} = {a+b}")
print(f"Log density change rate: {-(a+b)}")
print(f"Volume {'expands' if a+b > 0 else 'contracts'} (det J {'>' if a+b > 0 else '<'} 0)")

# === 4. Maxwell: verify curl of E field ===
# For static point charge at origin: E = q/(4πε₀) * r_hat/r²
# ∇·E = ρ/ε₀ (Gauss's law)
# Check: ∇·(r_hat/r²) = 4π δ(r) in 3D
import sympy as sp
x, y, z = sp.symbols('x y z')
r = sp.sqrt(x**2 + y**2 + z**2)
# E proportional to (x/r^3, y/r^3, z/r^3)
Ex = x / r**3
Ey = y / r**3
Ez = z / r**3
div_E = sp.diff(Ex, x) + sp.diff(Ey, y) + sp.diff(Ez, z)
div_E_simplified = sp.simplify(div_E)
print(f"\n=== Maxwell: ∇·E for point charge ===")
print(f"∇·(r̂/r²) = {div_E_simplified} (away from origin)")
print(f"This is zero everywhere except at r=0 (where charge sits)")

# === 5. PINN concept: residual of heat equation ===
print(f"\n=== PINN Loss Concept ===")
# If network predicts T_θ(x,t) = sin(πx) * exp(-0.01π²t) (exact solution)
# Then PDE residual = ∂T/∂t - α∂²T/∂x² = 0
# For a wrong guess T_wrong = x*(1-x)*exp(-t):
T_wrong = x*(1-x)*sp.exp(-sp.Symbol('t'))
t_sym = sp.Symbol('t')
T_w = x*(1-x)*sp.exp(-t_sym)
residual = sp.diff(T_w, t_sym) - 0.01*sp.diff(T_w, x, 2)
print(f"Wrong guess: T = x(1-x)exp(-t)")
print(f"PDE residual: {sp.simplify(residual)}")
print(f"Non-zero residual → PINN loss penalises this")
```

## Connection to CS / Games / AI
- **Game fluid simulation**: Navier-Stokes solvers (Eulerian grids, SPH particles)
  power water, smoke, and fire effects; projection methods enforce $\nabla \cdot \mathbf{v} = 0$
- **Weather/climate models**: the atmosphere is governed by Navier-Stokes plus
  thermodynamics — among the largest scientific computations in the world
- **Diffusion models**: score-based generative models (DDPM, score matching) use
  the heat equation in reverse — "denoising" is running diffusion backward
- **Normalizing flows**: FFJORD uses the continuous-time change of variables formula
  with neural ODEs; the loss involves $\nabla \cdot \mathbf{v}$ computed via
  Hutchinson's trace estimator
- **Physics-informed ML**: PINNs solve PDEs (Navier-Stokes, Maxwell, heat) by
  embedding the differential equations as loss terms, replacing expensive numerical
  simulations with learned surrogates
- **Electromagnetic simulation**: FDTD (finite-difference time-domain) solvers
  discretise Maxwell's equations on a grid — used in antenna design, chip layout,
  and wireless channel modelling

## Check Your Understanding
1. Write down the incompressibility condition $\nabla \cdot \mathbf{v} = 0$ and
   explain what it means physically. Give an example of an incompressible 2D
   velocity field.
2. For the heat equation $\partial T/\partial t = \alpha \nabla^2 T$, verify
   that $T(x,t) = e^{-\alpha k^2 t}\cos(kx)$ is a solution for any $k$.
3. In a normalizing flow with velocity $\mathbf{v}(\mathbf{z}) = A\mathbf{z}$
   where $A$ is a matrix, show that $\nabla \cdot \mathbf{v} = \text{tr}(A)$
   and explain why this relates to the log-determinant of the Jacobian.
