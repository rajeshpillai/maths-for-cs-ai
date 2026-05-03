---
strand: uncertainty
level: research
order: 1
title: Liouville Quantum Gravity
prerequisites:
  - tier: strand-6-uncertainty-research
    slug: 00-sle-and-2d-models
    description: SLE
connections:
  - strand-6-uncertainty-research/02-rmt-universality
applications:
  - cs: "2D quantum gravity simulation; random surfaces"
  - life: "Random conformal Riemannian metrics in 2D"
---

# Liouville Quantum Gravity

## Mental

**Liouville Quantum Gravity (LQG)**: a random Riemannian metric in
2D, parameterised by $\gamma \in (0, 2)$:

$$
g_\gamma(z) = e^{\gamma h(z)} (dx^2 + dy^2),
$$

where $h$ is a **Gaussian Free Field** (GFF) — a random
distribution-valued function.

Since $h$ is rough (a *distribution*), $e^{\gamma h}$ requires
*regularisation* — Wick exponential.

## David-Knizhnik-Polyakov-Zamolodchikov (DKPZ)

**DKPZ formula**: relates Liouville theory dimensions to
combinatorial dimensions of underlying random surface. Foundational
in 2D quantum gravity (1980s physics).

Made rigorous via SLE + GFF coupling (Duplantier-Sheffield 2011).

## Mating of trees

Sheffield's **mating-of-trees** correspondence (2016): an LQG
surface decorated with $\mathrm{SLE}_\kappa$ is encoded by a pair
of correlated random-tree Brownian motions.

A *complete* combinatorial description.

## Worked example: pure LQG

For $\gamma = \sqrt{8/3}$: corresponds to **Brownian map** scaling
limit of large random planar maps (uniformly random
quadrangulations).

Pure $\sqrt{8/3}$-LQG = Brownian-map metric (Le Gall 2013, Miermont
2013).

## Interactive

:::widget type=numeric-input prompt="LQG: $g_\\gamma = e^{\\gamma h} \\delta_{ij}$ with $h$ Gaussian Free Field. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="DKPZ formula relates LQG dimensions to combinatorial. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\sqrt{8/3}$-LQG = Brownian map. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Mating of trees: SLE on LQG ↔ correlated tree Brownian motions. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Gaussian Free Field**: random Gaussian distribution with covariance
$\mathbb E[h(x) h(y)] = -\log|x - y|$. Distribution-valued, not
function-valued.

**Liouville measure** $e^{\gamma h(z)} dz$: Wick-renormalised.
Random measure on the 2D surface.

**KPZ relation** (Knizhnik-Polyakov-Zamolodchikov, distinct from KPZ
equation!): conformal dimensions on Euclidean side ↔ "quantum
gravity" dimensions on LQG side.

**Conformal welding**: glue two LQG surfaces along their boundaries
to get $\mathrm{SLE}_\kappa$ as the welding interface.

## Computational

```python
import numpy as np

# Gaussian Free Field discretisation
def discrete_gff(N=64):
    """Discrete Gaussian Free Field on N x N torus."""
    # Discrete Laplacian in Fourier
    k = np.fft.fftfreq(N) * 2 * np.pi
    K2 = k[:, None]**2 + k[None, :]**2
    K2[0, 0] = 1   # avoid divide by zero (zero mode)

    # GFF: covariance ∝ Δ^{-1}, so in Fourier:
    # h_hat(k) = N(0, 1/k²) for k ≠ 0
    h_hat = (np.random.randn(N, N) + 1j * np.random.randn(N, N)) / np.sqrt(2 * K2)
    h_hat[0, 0] = 0  # remove zero mode

    return np.fft.ifft2(h_hat).real

h = discrete_gff(64)
print(f"GFF discrete: shape {h.shape}, max |h| ≈ {np.max(np.abs(h)):.2f}")

# Liouville measure ~ e^{γ h} (regularised)
gamma = np.sqrt(8/3)
mu = np.exp(gamma * h)    # un-normalised
print(f"Liouville measure (un-normalised): max value = {mu.max():.2f}")

# Real LQG / SLE simulations: research-level; specialised software
print("Full LQG / SLE simulation requires specialised packages.")
```

## Applied

- **2D quantum gravity** — physically-motivated random surface theory.
- **Random planar maps** — combinatorial precursors of LQG (Brownian
  map etc.).
- **String theory** — bosonic string amplitudes computed via Liouville
  conformal-field theory.
- **Random surfaces in physics** — universal limits of triangulations.
- **Mathematical research frontier** — Duplantier-Miller-Sheffield
  rigorous formulation; multiple Fields-medal-adjacent topics.

## Check Your Understanding

:::widget type=numeric-input prompt="LQG metric: $e^{\\gamma h} \\delta_{ij}$ with $h$ GFF. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\sqrt{8/3}$-LQG = Brownian map. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Mating of trees: SLE on LQG ↔ tree Brownians. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="GFF: distribution-valued with $-\\log$ covariance. Type 1." answer=1 explain="Yes.":::
