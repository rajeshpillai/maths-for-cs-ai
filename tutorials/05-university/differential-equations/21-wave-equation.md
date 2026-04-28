# The Wave Equation

## Intuition

Pluck a guitar string and watch the wave travel back and forth, bouncing off the
fixed ends. The wave equation $u_{tt} = c^2 u_{xx}$ describes exactly this:
the acceleration of each point on the string is proportional to the curvature at
that point. Unlike the heat equation which smooths everything out, the wave
equation preserves sharp features — they just travel.

## Prerequisites

- Tier 11, Lesson 19: Introduction to PDEs (classification, separation of variables)
- Tier 11, Lesson 18: Boundary Value Problems (eigenfunctions)

## From First Principles

### The Equation

$$\frac{\partial^2 u}{\partial t^2} = c^2\,\frac{\partial^2 u}{\partial x^2}, \quad 0 < x < L,\; t > 0$$

Boundary conditions: $u(0,t) = 0$, $u(L,t) = 0$ (fixed ends).

Initial conditions: $u(x,0) = f(x)$ (initial shape), $u_t(x,0) = g(x)$ (initial velocity).

### Separation of Variables

Assume $u(x,t) = X(x)\,T(t)$:

$$X\,T'' = c^2\,X''\,T \quad\Rightarrow\quad \frac{T''}{c^2 T} = \frac{X''}{X} = -\lambda$$

**Spatial:** $X'' + \lambda X = 0$, $X(0) = X(L) = 0$ gives $\lambda_n = (n\pi/L)^2$,
$X_n = \sin(n\pi x / L)$.

**Temporal:** $T'' + c^2\lambda_n T = 0$ gives:

$$T_n(t) = A_n\cos(\omega_n t) + B_n\sin(\omega_n t), \quad \omega_n = \frac{cn\pi}{L}$$

### General Solution

$$u(x,t) = \sum_{n=1}^{\infty}\left[A_n\cos(\omega_n t) + B_n\sin(\omega_n t)\right]\sin\frac{n\pi x}{L}$$

From initial conditions:

$$A_n = \frac{2}{L}\int_0^L f(x)\sin\frac{n\pi x}{L}\,dx$$

$$B_n = \frac{2}{L\omega_n}\int_0^L g(x)\sin\frac{n\pi x}{L}\,dx$$

### d'Alembert's Solution

For an infinite string (no boundaries):

$$u(x,t) = \frac{1}{2}[f(x-ct) + f(x+ct)] + \frac{1}{2c}\int_{x-ct}^{x+ct} g(s)\,ds$$

This shows two copies of the initial shape travelling in opposite directions
at speed $c$. This is the **superposition of left- and right-travelling waves**.

### Standing Waves

Each mode $\sin(n\pi x/L)\cos(\omega_n t)$ is a **standing wave**: the spatial
pattern stays fixed while the amplitude oscillates. The points where
$\sin(n\pi x/L) = 0$ are **nodes** — they never move.

### Visualisation

Show wave propagation at different times.

```python
import numpy as np
import matplotlib.pyplot as plt

L = 1.0
c = 1.0
x = np.linspace(0, L, 400)
N_modes = 80

# Initial condition: plucked string (triangle at x = 0.3)
def f_initial(x_val):
    peak = 0.3
    if x_val < peak:
        return x_val / peak
    else:
        return (1 - x_val) / (1 - peak)

# Compute Fourier coefficients A_n (g(x) = 0, so B_n = 0)
from scipy.integrate import quad

A_coeffs = []
for n in range(1, N_modes + 1):
    val, _ = quad(lambda xi: f_initial(xi) * np.sin(n * np.pi * xi / L), 0, L)
    A_coeffs.append((2 / L) * val)

def wave_solution(x, t):
    u = np.zeros_like(x)
    for i, n in enumerate(range(1, N_modes + 1)):
        omega_n = c * n * np.pi / L
        u += A_coeffs[i] * np.cos(omega_n * t) * np.sin(n * np.pi * x / L)
    return u

fig, axes = plt.subplots(2, 3, figsize=(14, 7))
times = [0, 0.1, 0.2, 0.3, 0.5, 1.0]

for ax, t_val in zip(axes.ravel(), times):
    u = wave_solution(x, t_val)
    ax.plot(x, u, 'b-', linewidth=2)
    ax.axhline(0, color='k', linewidth=0.5)
    ax.set_ylim(-1.2, 1.2)
    ax.set_title(f't = {t_val:.1f}')
    ax.set_xlabel('x')
    ax.grid(True, alpha=0.3)

plt.suptitle("Wave Equation: Plucked String at Different Times", fontsize=13)
plt.tight_layout()
plt.savefig("wave_equation_solution.png", dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np

# ── Verify: single mode is an exact solution ────────────
L = np.pi
c = 2.0
n = 3
omega_n = c * n * np.pi / L

def u_mode(x, t):
    return np.sin(n * x) * np.cos(omega_n * t)

# Check u_tt = c^2 * u_xx numerically
x0, t0 = 1.0, 0.5
h = 1e-6

u_tt = (u_mode(x0, t0+h) - 2*u_mode(x0, t0) + u_mode(x0, t0-h)) / h**2
u_xx = (u_mode(x0+h, t0) - 2*u_mode(x0, t0) + u_mode(x0-h, t0)) / h**2

print(f"u_tt    = {u_tt:.8f}")
print(f"c^2*u_xx = {c**2 * u_xx:.8f}")
print(f"Difference: {abs(u_tt - c**2 * u_xx):.2e}")

# ── d'Alembert solution for infinite string ─────────────
# f(x) = exp(-x^2), g(x) = 0
def f_gauss(x):
    return np.exp(-x**2)

def dalembert(x, t, c=1.0):
    return 0.5 * (f_gauss(x - c*t) + f_gauss(x + c*t))

x = np.linspace(-5, 5, 500)
print("\nd'Alembert at x=0:")
for t in [0, 0.5, 1.0, 2.0]:
    print(f"  t={t}: u(0,t) = {dalembert(0, t):.6f}")

# ── Finite difference wave equation solver ──────────────
L = 1.0
c = 1.0
Nx = 200
dx = L / Nx
dt = 0.8 * dx / c  # CFL condition: c*dt/dx < 1
r = (c * dt / dx)**2

x_fd = np.linspace(0, L, Nx + 1)
# Initial conditions
u_prev = np.array([x/0.3 if x < 0.3 else (1-x)/0.7 for x in x_fd])
u_prev[0] = u_prev[-1] = 0

# First time step (g=0, so u^1 = u^0 + 0.5*r*(u^0 shifted))
u_curr = np.zeros(Nx + 1)
for j in range(1, Nx):
    u_curr[j] = u_prev[j] + 0.5*r*(u_prev[j+1] - 2*u_prev[j] + u_prev[j-1])

# Advance
Nt = 500
for step in range(Nt):
    u_next = np.zeros(Nx + 1)
    for j in range(1, Nx):
        u_next[j] = 2*u_curr[j] - u_prev[j] + r*(u_curr[j+1] - 2*u_curr[j] + u_curr[j-1])
    u_prev, u_curr = u_curr, u_next

print(f"\nAfter {Nt} steps: max|u| = {np.max(np.abs(u_curr)):.6f}")
print("Energy should be conserved (no damping).")
```

## Connection to CS / Games / AI / Business / Industry

- **Audio simulation** — The 1D wave equation models vibrating strings;
  physical modeling synthesis (e.g., Karplus-Strong) is a discrete version.
- **Seismic imaging** — Oil exploration solves the 2D/3D wave equation to
  locate underground structures from reflected waves.
- **Game physics** — Water surface waves, explosions, and sound propagation
  all derive from wave equations.
- **Electromagnetic waves** — Maxwell's equations reduce to wave equations;
  radio propagation in wireless networking follows these PDEs.

## Check Your Understanding

1. Show that $u(x,t) = \sin(2\pi x)\cos(2\pi ct)$ satisfies the wave equation
   and the boundary conditions $u(0,t) = u(1,t) = 0$. What is $\omega_2$?

2. For d'Alembert's solution with $f(x) = e^{-x^2}$ and $g(x) = 0$, sketch
   $u(x, t)$ at $t = 0, 1, 2$. Describe what you see.

3. The CFL condition for numerical stability is $c\Delta t / \Delta x \leq 1$.
   What happens physically if you violate it? (Hint: the numerical wave
   travels faster than the scheme can resolve.)
