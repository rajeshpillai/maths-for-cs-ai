---
strand: change
level: master
order: 2
title: PDEs — An Introduction
prerequisites:
  - tier: strand-4-change-master
    slug: 01-ode-theory
    description: ODE theory
connections:
  - strand-4-change-master/03-fourier-and-distributions
applications:
  - cs: "Physics simulation, image processing, finite-element solvers"
  - life: "Equations involving partial derivatives"
---

# PDEs — An Introduction

## Mental

A **partial differential equation** (PDE) involves derivatives in
multiple variables. Three classical examples:

| PDE | Equation | Type |
|---|---|---|
| Heat equation | $u_t = \Delta u$ | parabolic |
| Wave equation | $u_{tt} = c^2 \Delta u$ | hyperbolic |
| Laplace equation | $\Delta u = 0$ | elliptic |

These three "classes" exhibit fundamentally different behaviour.

## Heat equation

$u_t = \Delta u$ in $\Omega$, with initial data $u(x, 0) = f(x)$.

**Properties**:

- **Smoothing**: solutions immediately become smooth, even if $f$ is
  not.
- **Maximum principle**: maximum of $u$ is on boundary or at $t = 0$.
- **Long-time decay**: $u \to $ steady state.

**Fundamental solution**: $\Phi(x, t) = (4\pi t)^{-n/2} e^{-|x|^2/(4t)}$
— Gaussian.

## Wave equation

$u_{tt} = c^2 \Delta u$ in $\Omega$, with $u(x, 0) = f$ and $u_t(x, 0) = g$.

**Properties**:

- **Finite propagation speed**: signals travel at speed $c$.
- **Energy conservation**: $\frac{1}{2}\int(u_t^2 + c^2 |\nabla u|^2)$
  conserved.
- **Reversibility**: time-reversal symmetric.

In 1D: d'Alembert's solution $u(x, t) = \frac{1}{2}[f(x - ct) + f(x + ct)] + \frac{1}{2c}\int_{x - ct}^{x + ct} g(s) ds$.

## Laplace equation

$\Delta u = 0$ — **harmonic functions**.

**Properties**:

- **Mean-value property**: $u(x_0)$ = average over any ball around $x_0$.
- **Maximum principle**: max on boundary.
- **Uniqueness**: harmonic + boundary data → unique solution
  (Dirichlet problem).
- **Real and imaginary parts of holomorphic functions** are
  harmonic.

## Interactive

:::widget type=numeric-input prompt="Heat equation $u_t = \\Delta u$: parabolic. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Wave equation: finite propagation speed. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Laplace equation: $\\Delta u = 0$, harmonic. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Heat equation smooths instantly. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Linear vs nonlinear**: linear PDEs admit superposition; nonlinear
do not. Navier-Stokes $\partial_t u + (u \cdot \nabla) u = -\nabla p + \nu \Delta u$
— quadratic in $u$, notoriously hard.

**Boundary conditions**:

- **Dirichlet**: $u = g$ on $\partial \Omega$.
- **Neumann**: $\partial u / \partial n = h$ on $\partial \Omega$.
- **Robin / mixed**.

**Well-posedness** (Hadamard): a problem is well-posed if (i)
solutions exist, (ii) are unique, (iii) depend continuously on data.

**Weak / distributional solutions**: define solutions via integration-
by-parts identities; allows non-smooth data.

## Computational

```python
import numpy as np

# 1D heat equation: u_t = u_{xx} on [0, 1] with u(0, t) = u(1, t) = 0
N = 100
dx = 1 / N
dt = 0.5 * dx**2          # CFL condition
T = 0.1
n_steps = int(T / dt)

x = np.linspace(0, 1, N + 1)
u = np.sin(np.pi * x)      # initial: sin(πx)

for _ in range(n_steps):
    u_new = u.copy()
    u_new[1:-1] = u[1:-1] + dt / dx**2 * (u[2:] - 2*u[1:-1] + u[:-2])
    u = u_new

# Compare with exact solution: u(x, t) = e^{-π² t} sin(πx)
exact = np.exp(-np.pi**2 * T) * np.sin(np.pi * x)
print("max |numerical - exact| =", np.max(np.abs(u - exact)))

# 1D wave equation via leapfrog
N = 200
dx = 1 / N
c = 1
dt = dx / (2 * c)        # CFL
T = 1
n_steps = int(T / dt)

u = np.exp(-100 * (x - 0.3)**2)   # Gaussian pulse
u_old = u.copy()
for _ in range(n_steps):
    u_new = 2 * u - u_old + (c * dt / dx)**2 * (np.roll(u, -1) - 2 * u + np.roll(u, 1))
    u_new[0] = u_new[-1] = 0  # Dirichlet
    u_old = u
    u = u_new
print("Wave: still localised at t=1 — pulse propagated and reflected")
```

## Applied

- **Climate modelling** — atmosphere, ocean: nonlinear PDEs.
- **Image processing** — anisotropic diffusion (Perona-Malik) for
  edge-preserving smoothing.
- **Quantum mechanics** — Schrödinger PDE $i \hbar \psi_t = -\frac{\hbar^2}{2m} \Delta \psi + V \psi$.
- **Finance** — Black-Scholes is a parabolic PDE (variant of heat
  equation).
- **Engineering simulation** — finite-element / finite-volume /
  spectral methods.
- **Neural networks for PDEs** — physics-informed networks (PINNs),
  neural operators (DeepONet, FNO).

## Check Your Understanding

:::widget type=numeric-input prompt="Three classical PDE types: parabolic, hyperbolic, elliptic. Type 3." answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="Heat equation: instant smoothing. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Wave equation: time-reversal symmetric. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Laplace: harmonic functions, max principle. Type 1." answer=1 explain="Yes.":::
