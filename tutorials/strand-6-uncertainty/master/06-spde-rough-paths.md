---
strand: uncertainty
level: master
order: 6
title: Stochastic PDEs and Rough Paths
prerequisites:
  - tier: strand-6-uncertainty-master
    slug: 05-empirical-processes
    description: Empirical processes
connections:
  - strand-6-uncertainty-master/07-optimal-transport
applications:
  - cs: "Diffusion-model ML, KPZ-style models, mathematical physics"
  - life: "PDEs with random forcing"
---

# Stochastic PDEs and Rough Paths

## Mental

A **stochastic PDE (SPDE)**:

$$
\partial_t u = \Delta u + g(u) + \sigma(u) \xi,
$$

where $\xi$ is a random forcing (e.g., space-time white noise).

Examples:

- **Stochastic heat equation** (SHE): $\partial_t u = \Delta u + \xi$.
- **Kardar-Parisi-Zhang (KPZ)**: $\partial_t h = \nu \partial_x^2 h + \frac{\lambda}{2} (\partial_x h)^2 + \sigma \xi$.
  Universal model of growing interfaces.
- **Stochastic Navier-Stokes**: turbulence modeling.

## Why these are hard

White noise $\xi$ is a **distribution**, not a function. Products
like $\sigma(u) \xi$ or $(\partial_x h)^2$ for rough $h$ aren't
classically defined — need rigorous renormalisation.

## Rough paths and regularity structures

**Lyons's rough paths** (1998): a framework for solving ODE-like
equations driven by paths *too rough* to integrate classically.
Key idea: track higher-order iterated integrals (Lévy areas, etc.)
alongside the path itself.

**Hairer's regularity structures** (2014, Fields medal): vast
generalisation handling SPDEs like KPZ. Roughly:

- Local description of solution near each point as a polynomial in
  abstract symbols.
- Renormalisation: subtract specific divergent quantities to make
  products meaningful.
- Convergence theorems show that approximation schemes give
  consistent limits.

Hairer's framework gave the *first rigorous solution* to KPZ.

## Universality

The **KPZ equation** governs a universal class of growth models —
many seemingly different physical systems (random matrix eigenvalues,
ASEP particle systems, longest-increasing-subsequence statistics)
exhibit KPZ-distributed fluctuations.

**Tracy-Widom distribution**: limit law of largest eigenvalue of
GUE random matrices, also of LIS in random permutations, ASEP, etc.

## Interactive

:::widget type=numeric-input prompt="SHE: $\\partial_t u = \\Delta u + \\xi$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="KPZ universal for many growth models. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hairer's regularity structures (2014, Fields medal). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Tracy-Widom = limit of largest GUE eigenvalue. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Stratonovich SPDEs**: alternative formulation of stochastic
integration; classical chain rule but martingale property changes.
Used in physics.

**White-noise calculus** (Hida): formal Wick products $\xi^{\diamond k}$
of white noise treated combinatorially.

**Paracontrolled distributions** (Gubinelli-Imkeller-Perkowski):
alternative to regularity structures for specific singular SPDEs.

**Stochastic quantisation**: rephrase QFT path integrals as SPDE
fixed points; modern approach using Hairer's tools.

## Computational

```python
import numpy as np

# Simulate stochastic heat equation: u_t = u_xx + sigma * xi
def simulate_SHE(N=100, T=1.0, dt=0.0001, sigma=0.1):
    dx = 1 / N
    u = np.zeros(N + 1)
    n_steps = int(T / dt)
    for _ in range(n_steps):
        # Discrete Laplacian + space-time white-noise increment
        laplacian = np.zeros_like(u)
        laplacian[1:-1] = (u[2:] - 2*u[1:-1] + u[:-2]) / dx**2
        noise = sigma * np.sqrt(dt / dx) * np.random.randn(N + 1)
        u = u + dt * laplacian + noise
        u[0] = u[-1] = 0  # Dirichlet
    return u

u_final = simulate_SHE(N=100, T=0.1)
print(f"Max |u| at T = 0.1: {np.max(np.abs(u_final)):.4f}")

# KPZ via Cole-Hopf transformation: KPZ ↔ multiplicative SHE
# Z = exp(λ h / 2 ν), then ∂_t Z = ν Δ Z + (λ σ / 2 ν) Z ξ — multiplicative SHE
# In practice, requires careful regularisation; this is just a sketch.

# Tracy-Widom distribution: limit of (λ_max - 2 sqrt n) / (n^{1/6}) for GUE
def gue_top_eigenvalue(n, samples=200):
    largest = []
    for _ in range(samples):
        A = (np.random.randn(n, n) + 1j * np.random.randn(n, n)) / np.sqrt(2)
        H = (A + A.conj().T) / np.sqrt(2 * n)
        eigvals = np.linalg.eigvalsh(H)
        # Rescale: Tracy-Widom argument
        largest.append(n**(2/3) * (eigvals[-1] - 2))
    return largest

vals = gue_top_eigenvalue(50, samples=300)
print(f"Mean Tracy-Widom F_2 ~= -1.77, empirical: {np.mean(vals):.4f}")
```

## Applied

- **KPZ universality** — random matrix eigenvalues, ASEP, polymer
  models, growing interfaces all share KPZ-class fluctuations.
- **Diffusion-model ML** — score-matching / DDPM rests on
  reverse-time SDEs and SPDE-style analysis.
- **Climate / turbulence** — stochastic Navier-Stokes models, weather
  ensembles.
- **Finance** — interest-rate models like Heath-Jarrow-Morton are
  infinite-dim SPDEs.
- **Physics — stochastic quantisation** of $\Phi^4$ models in 2 and 3
  dimensions (resolved by Hairer 2014).

## Check Your Understanding

:::widget type=numeric-input prompt="SPDE = PDE with random forcing. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="KPZ is universal model of growing interfaces. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hairer's regularity structures (2014 Fields medal). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Tracy-Widom: limit of largest GUE eigenvalue. Type 1." answer=1 explain="Yes.":::
