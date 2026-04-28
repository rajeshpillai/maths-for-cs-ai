# Introduction to Partial Differential Equations

## Intuition

Ordinary differential equations describe how a quantity changes with one
variable (usually time). Partial differential equations describe how a quantity
changes with **multiple** variables simultaneously — temperature varying across
space *and* time, pressure in a fluid, or pixel intensities across an image.
Almost every physics simulation in games and every field theory in ML involves
a PDE.

## Prerequisites

- Tier 11, Lesson 18: Boundary Value Problems (eigenvalue problems, eigenfunctions)
- Tier 3, Lesson 3: Partial Derivatives and the Gradient
- Tier 3, Lesson 6: Integrals (multivariable integration basics)

## From First Principles

### What Is a PDE?

An equation involving an unknown function of several variables and its **partial
derivatives**. If $u = u(x, t)$:

$$\frac{\partial u}{\partial t} = k\frac{\partial^2 u}{\partial x^2}$$

This is the **heat equation**. Compare with an ODE: $dy/dt = -ky$ has one
independent variable; the PDE has two ($x$ and $t$).

### The Three Classical PDEs

| Name | Equation | Type | Physical Meaning |
|------|----------|------|------------------|
| Heat | $u_t = k\,u_{xx}$ | Parabolic | Diffusion, smoothing |
| Wave | $u_{tt} = c^2\,u_{xx}$ | Hyperbolic | Propagation, oscillation |
| Laplace | $u_{xx} + u_{yy} = 0$ | Elliptic | Steady-state, equilibrium |

### Classification

A second-order linear PDE in two variables:

$$Au_{xx} + 2Bu_{xy} + Cu_{yy} + \ldots = 0$$

The **discriminant** $\Delta = B^2 - AC$ determines the type:

- $\Delta > 0$: **Hyperbolic** (wave-like)
- $\Delta = 0$: **Parabolic** (diffusion-like)
- $\Delta < 0$: **Elliptic** (equilibrium-like)

This mirrors the conic sections: $Ax^2 + 2Bxy + Cy^2 = 1$ gives a hyperbola,
parabola, or ellipse depending on the same discriminant.

### Separation of Variables — The Key Technique

Assume the solution factors:

$$u(x, t) = X(x)\,T(t)$$

Substitute into the PDE. Because $X$ depends only on $x$ and $T$ only on $t$,
each side of the resulting equation must equal a constant $-\lambda$ (the
**separation constant**). This splits the PDE into two ODEs.

**Example with the heat equation** $u_t = k\,u_{xx}$:

$$X(x)\,T'(t) = k\,X''(x)\,T(t)$$

$$\frac{T'(t)}{k\,T(t)} = \frac{X''(x)}{X(x)} = -\lambda$$

This gives:

- $X'' + \lambda X = 0$ (a BVP — Lesson 18!)
- $T' + k\lambda T = 0$ (a simple ODE)

### Boundary and Initial Conditions

PDEs need both:

- **Boundary conditions** (spatial): e.g., $u(0,t) = 0$, $u(L,t) = 0$
- **Initial conditions** (temporal): e.g., $u(x,0) = f(x)$

### Visualisation

Show a temperature distribution evolving over time (heat equation).

```python
import numpy as np
import matplotlib.pyplot as plt

L = 1.0       # rod length
k = 0.01      # thermal diffusivity
N_modes = 20  # Fourier modes

x = np.linspace(0, L, 200)

def heat_solution(x, t, N=N_modes):
    """Fourier series solution for initial condition u(x,0) = sin(pi*x/L)."""
    # For this simple IC, only the n=1 mode contributes
    u = np.zeros_like(x)
    for n in range(1, N + 1):
        # Fourier coefficient b_n for sin(pi*x) IC: b_1=1, rest=0
        b_n = 1.0 if n == 1 else 0.0
        lam_n = (n * np.pi / L) ** 2
        u += b_n * np.sin(n * np.pi * x / L) * np.exp(-k * lam_n * t)
    return u

# For a more interesting demo, use a step function IC
def heat_step_IC(x, t, N=50):
    """Solution for IC: u(x,0) = 1 on (0.25, 0.75), 0 elsewhere."""
    u = np.zeros_like(x)
    for n in range(1, N + 1):
        # Fourier sine coefficient for step on (a, b)
        a, b = 0.25, 0.75
        b_n = (2/L) * (np.cos(n*np.pi*a/L) - np.cos(n*np.pi*b/L)) / (n*np.pi/L)
        lam_n = (n * np.pi / L) ** 2
        u += b_n * np.sin(n * np.pi * x / L) * np.exp(-k * lam_n * t)
    return u

fig, ax = plt.subplots(figsize=(9, 5))
times = [0, 0.5, 2, 5, 15]
for t_val in times:
    u = heat_step_IC(x, t_val)
    ax.plot(x, u, linewidth=2, label=f't = {t_val}')

ax.set_xlabel('x')
ax.set_ylabel('u(x, t)')
ax.set_title('Heat Equation: Temperature Evolving Over Time')
ax.legend()
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig("pde_heat_evolution.png", dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np

# ── Classify three PDEs ─────────────────────────────────
examples = [
    ("Heat: u_t = u_xx",       0, 0, 1),   # A=1, B=0, C=0 (only u_xx)
    ("Wave: u_tt = u_xx",      1, 0, -1),  # A=1, B=0, C=-1
    ("Laplace: u_xx + u_yy=0", 1, 0, 1),   # A=1, B=0, C=1
]

for name, A, B, C in examples:
    disc = B**2 - A * C
    if disc > 0:
        pde_type = "Hyperbolic"
    elif disc == 0:
        pde_type = "Parabolic"
    else:
        pde_type = "Elliptic"
    print(f"{name:30s}  Δ = {disc:+d}  → {pde_type}")

# ── Verify separation of variables for heat equation ────
# X'' + lambda*X = 0, X(0)=0, X(1)=0 → X_n = sin(n*pi*x), lambda_n = (n*pi)^2
# T' + k*lambda_n*T = 0 → T_n = exp(-k*lambda_n*t)
# u_n(x,t) = sin(n*pi*x)*exp(-k*(n*pi)^2*t)

# Check that u_n satisfies u_t = k*u_xx numerically
k_val = 0.01
n = 3
x_test = 0.4
t_test = 1.0
h = 1e-7

def u_n(x, t, n=n):
    return np.sin(n * np.pi * x) * np.exp(-k_val * (n * np.pi)**2 * t)

# u_t via finite difference
u_t = (u_n(x_test, t_test + h) - u_n(x_test, t_test)) / h

# u_xx via finite difference
u_xx = (u_n(x_test + h, t_test) - 2*u_n(x_test, t_test) + u_n(x_test - h, t_test)) / h**2

print(f"\nFor n={n} mode at x={x_test}, t={t_test}:")
print(f"  u_t   = {u_t:.10f}")
print(f"  k*u_xx = {k_val * u_xx:.10f}")
print(f"  Difference: {abs(u_t - k_val * u_xx):.2e} (should be ~0)")
```

## Connection to CS / Games / AI / Business / Industry

- **Physics engines** — Fluid dynamics (Navier-Stokes), cloth simulation, and
  heat transfer all require solving PDEs in real time.
- **Image processing** — Gaussian blur is literally the heat equation applied
  to pixel intensities; anisotropic diffusion is a nonlinear variant.
- **Neural PDEs** — Physics-informed neural networks (PINNs) learn to solve
  PDEs by embedding the equation into the loss function (Lesson 25).
- **Game terrain** — Laplace's equation is solved to generate smooth height
  maps and potential fields for AI pathfinding.

## Check Your Understanding

1. Classify $u_{tt} + u_{xx} = 0$. What type is it? (Careful with signs.)

2. Apply separation of variables to the wave equation $u_{tt} = c^2 u_{xx}$
   with $u(0,t) = u(L,t) = 0$. What ODEs do you get for $X(x)$ and $T(t)$?

3. Why does the heat equation smooth things out over time while the wave
   equation preserves sharp features? (Hint: look at how the Fourier modes
   decay vs oscillate.)
