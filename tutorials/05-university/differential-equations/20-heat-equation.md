# The Heat Equation

## Intuition

Place a hot spot in the middle of a metal rod with both ends held at zero
degrees. Over time the heat spreads out and the temperature everywhere decays
toward zero. The heat equation $u_t = k\,u_{xx}$ captures this: the rate of
change of temperature at a point is proportional to the curvature of the
temperature profile there. High curvature means heat flows fast; flat profiles
stay put.

## Prerequisites

- Tier 11, Lesson 19: Introduction to PDEs (classification, separation of variables)
- Tier 11, Lesson 18: Boundary Value Problems (eigenfunctions)
- Tier 9, Lesson 2: Fourier Series

## From First Principles

### The Equation

$$\frac{\partial u}{\partial t} = k\,\frac{\partial^2 u}{\partial x^2}, \quad 0 < x < L,\; t > 0$$

with boundary conditions $u(0, t) = 0$, $u(L, t) = 0$ and initial condition
$u(x, 0) = f(x)$.

### Separation of Variables

Assume $u(x,t) = X(x)\,T(t)$:

$$X\,T' = k\,X''\,T \quad\Rightarrow\quad \frac{T'}{kT} = \frac{X''}{X} = -\lambda$$

**Spatial ODE:** $X'' + \lambda X = 0$, $X(0) = 0$, $X(L) = 0$.

From Lesson 18: $\lambda_n = (n\pi/L)^2$, $X_n(x) = \sin(n\pi x/L)$.

**Temporal ODE:** $T' + k\lambda_n T = 0 \Rightarrow T_n(t) = e^{-k\lambda_n t}$.

### General Solution

$$u(x,t) = \sum_{n=1}^{\infty} b_n \sin\frac{n\pi x}{L}\,e^{-k(n\pi/L)^2 t}$$

### Finding the Coefficients $b_n$

At $t = 0$: $u(x,0) = f(x) = \sum b_n \sin(n\pi x/L)$.

This is a **Fourier sine series**. By orthogonality:

$$b_n = \frac{2}{L}\int_0^L f(x)\sin\frac{n\pi x}{L}\,dx$$

### Pen & Paper Example

Let $L = \pi$, $k = 1$, $f(x) = \sin x$ (a single mode).

Then $b_1 = 1$ and $b_n = 0$ for $n \geq 2$.

$$u(x,t) = \sin(x)\,e^{-t}$$

Verify: $u_t = -\sin(x)e^{-t}$, $u_{xx} = -\sin(x)e^{-t}$, so $u_t = u_{xx}$ ✓.

### Visualisation

Plot the heat distribution at several time points.

```python
import numpy as np
import matplotlib.pyplot as plt

L = 1.0
k = 0.005
x = np.linspace(0, L, 300)
N_modes = 50

def fourier_coeff(n, f_func):
    """Compute b_n = (2/L) * integral of f(x)*sin(n*pi*x/L) dx."""
    from scipy.integrate import quad
    integrand = lambda x: f_func(x) * np.sin(n * np.pi * x / L)
    val, _ = quad(integrand, 0, L)
    return (2 / L) * val

# Initial condition: triangle peak at x = 0.5
def f_initial(x):
    return np.where(x < 0.5, 2*x, 2*(1-x))

# Precompute coefficients
coeffs = [fourier_coeff(n, f_initial) for n in range(1, N_modes + 1)]

def heat_solution(x, t):
    u = np.zeros_like(x)
    for i, n in enumerate(range(1, N_modes + 1)):
        lam_n = (n * np.pi / L) ** 2
        u += coeffs[i] * np.sin(n * np.pi * x / L) * np.exp(-k * lam_n * t)
    return u

fig, ax = plt.subplots(figsize=(9, 5))
times = [0, 1, 5, 15, 50]
colors = plt.cm.hot(np.linspace(0.1, 0.8, len(times)))

for t_val, color in zip(times, colors):
    u = heat_solution(x, t_val)
    ax.plot(x, u, linewidth=2, color=color, label=f't = {t_val}')

ax.set_xlabel('x')
ax.set_ylabel('u(x, t)')
ax.set_title('Heat Equation: Triangle IC Diffusing Over Time')
ax.legend()
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig("heat_equation_solution.png", dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np
from scipy.integrate import quad

# ── Verify the simple case: f(x) = sin(x), L = pi, k = 1 ──
L = np.pi
k = 1.0

# Fourier coefficient b_1
b1, _ = quad(lambda x: np.sin(x) * np.sin(np.pi * x / L) * (2/L), 0, L)
print(f"b_1 = {b1:.6f}  (should be 1.0)")

# Check solution at specific points
for t in [0, 0.5, 1.0, 2.0]:
    x_test = np.pi / 4
    u_exact = np.sin(x_test) * np.exp(-t)
    print(f"u(pi/4, {t}) = {u_exact:.6f}")

# ── Numerical solution via finite differences ──────────
# Forward Euler: u^{n+1}_j = u^n_j + r*(u^n_{j+1} - 2*u^n_j + u^n_{j-1})
L = 1.0
k = 0.005
Nx = 50
dx = L / Nx
dt = 0.4 * dx**2 / k   # stability: r = k*dt/dx^2 < 0.5
r = k * dt / dx**2
Nt = 200

x = np.linspace(0, L, Nx + 1)
u = np.where(x < 0.5, 2*x, 2*(1-x))  # triangle IC
u[0] = u[-1] = 0  # boundary conditions

print(f"\nFinite difference: dx={dx:.4f}, dt={dt:.4f}, r={r:.4f}")

for step in range(Nt):
    u_new = u.copy()
    for j in range(1, Nx):
        u_new[j] = u[j] + r * (u[j+1] - 2*u[j] + u[j-1])
    u_new[0] = u_new[-1] = 0
    u = u_new

print(f"After {Nt} steps (t = {Nt*dt:.2f}):")
print(f"  max temperature = {u.max():.6f}")
print(f"  location of max = {x[np.argmax(u)]:.4f} (should be ~0.5)")
```

## Connection to CS / Games / AI / Business / Industry

- **Image processing** — Gaussian blur is the heat equation applied to pixel
  values. Running the heat equation for time $t$ is equivalent to convolving
  with a Gaussian of width $\sqrt{2kt}$.
- **Diffusion models** — The forward process in denoising diffusion models
  (DDPM, Stable Diffusion) adds noise following a discrete heat equation;
  the reverse process learns to denoise.
- **Game physics** — Heat conduction in materials, fog dissipation, and ink
  spreading in water are all governed by the diffusion equation.
- **Graph diffusion** — Replacing $u_{xx}$ with the graph Laplacian gives
  diffusion on graphs, used in GNNs and recommendation systems.
- **Building HVAC envelope sizing** — Carrier HAP and Trane TRACE 3D solve
  the heat equation through wall assemblies (with R-values from ASHRAE 90.1)
  to size chillers for commercial buildings; LEED energy credits depend on
  the simulation results.
- **Quenching and tempering at steel mills** — ArcelorMittal and Nucor model
  $T(x,t)$ during ingot cooling to choose alloy composition that hits ASTM
  hardness specs; mis-quenching is a multi-million-dollar yield loss.
- **CPU/GPU thermal design at Intel/AMD/NVIDIA** — package thermal
  resistance is computed by solving the 3D heat equation in tools like
  Ansys Icepak; cooling solution sizing on H100 GPUs and Ryzen CPUs starts
  here.
- **Cryogenic vaccine logistics** — Pfizer's BNT162b2 cold chain (-70 C)
  was designed using 1D heat-equation models of dry-ice shipper boxes to
  ensure FDA Vaccine Storage Guideline compliance during last-mile delivery.

## Check Your Understanding

1. For $f(x) = x(1-x)$ on $[0, 1]$, compute $b_1$ and $b_2$ by hand
   (integration by parts). Which mode decays faster and why?

2. The stability condition for forward Euler is $r = k\Delta t / \Delta x^2 < 1/2$.
   Derive this by substituting $u^n_j = \xi^n e^{ij\theta}$ (von Neumann analysis).

3. What happens if you use Neumann boundary conditions ($u_x(0,t) = u_x(L,t) = 0$,
   insulated ends) instead of Dirichlet? What changes in the eigenfunctions?
