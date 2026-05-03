---
strand: uncertainty
level: master
order: 7
title: Optimal Transport
prerequisites:
  - tier: strand-6-uncertainty-master
    slug: 06-spde-rough-paths
    description: SPDEs and rough paths
connections:
  - strand-6-uncertainty-master/08-causal-inference
applications:
  - cs: "WGAN, single-cell biology, image colorization"
  - life: "Cheapest way to morph one distribution into another"
---

# Optimal Transport

## Mental

Given two probability measures $\mu, \nu$ on $\mathbb R^d$ and a
**cost** $c(x, y)$, find:

$$
\inf_{\pi} \int c(x, y) \, d\pi(x, y),
$$

over couplings $\pi$ (joint distributions with marginals $\mu, \nu$).

For $c(x, y) = |x - y|^p$, the **$p$-Wasserstein distance**:

$$
W_p(\mu, \nu) = \left(\inf_\pi \int |x - y|^p d\pi\right)^{1/p}.
$$

A **true metric** on probability measures (unlike KL).

## Monge formulation

Find a *deterministic* map $T : \mathbb R^d \to \mathbb R^d$ pushing
$\mu$ to $\nu$ and minimising $\int c(x, T(x)) d\mu(x)$.

For nice cases (absolutely continuous $\mu$, quadratic cost):
$T = \nabla \phi$ for some convex $\phi$ (Brenier's theorem).

## Duality

Kantorovich's dual:

$$
W_1(\mu, \nu) = \sup_{f : \|f\|_{\rm Lip} \le 1} \int f \, d\mu - \int f \, d\nu.
$$

For $W_2$: dual involves $c$-conjugate functions
$\phi^c(y) = \inf_x (c(x, y) - \phi(x))$.

## Otto calculus / Wasserstein gradient flow

The space of probability measures with $W_2$ has *Riemannian-like*
structure.

**Heat equation as gradient flow** of entropy:
$\partial_t \rho = \Delta \rho$ minimises entropy in the Wasserstein
sense.

**JKO scheme**: discretise time via successive minimisations
$\rho_{k+1} = \arg\min(\frac{1}{2\tau} W_2^2(\rho, \rho_k) + \mathrm{Energy}(\rho))$.

Foundation of "Wasserstein gradient flow" — gives variational
formulation to many PDEs.

## Interactive

:::widget type=numeric-input prompt="$W_p$ is a metric on probability distributions. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Brenier: optimal map is $\\nabla \\phi$ with $\\phi$ convex. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Heat equation = gradient flow of entropy in Wasserstein space. Type 1." answer=1 explain="Yes — Jordan-Kinderlehrer-Otto.":::

:::widget type=numeric-input prompt="Kantorovich dual for $W_1$: 1-Lipschitz functions. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Sinkhorn algorithm** — entropic-regularised OT solved by alternating
matrix scaling. $O(n^2 / \epsilon^2)$ time vs $O(n^3 \log n)$ exact.
Cuturi 2013, sparked OT in ML.

**Optimal transport on manifolds** — Brenier extended to Riemannian
manifolds with quadratic cost.

**Schrödinger problem** — entropic OT can be viewed as the
Schrödinger problem of finding least-action stochastic bridge
between two distributions; converges to OT as regularisation $\to 0$.

**Multi-marginal OT** — generalisation to $k$ marginals; used in
density-functional theory.

## Computational

```python
import numpy as np

# Sinkhorn algorithm for entropic OT
def sinkhorn(C, a, b, eps=0.05, n_iter=200):
    """Solves regularised OT: min <C, P> + eps H(P) s.t. marginals a, b."""
    K = np.exp(-C / eps)
    u = np.ones(len(a))
    for _ in range(n_iter):
        v = b / (K.T @ u)
        u = a / (K @ v)
    return np.diag(u) @ K @ np.diag(v)

# Two distributions on a 1D grid
n = 50
x = np.linspace(0, 1, n)
a = np.exp(-((x - 0.3) * 10)**2); a /= a.sum()
b = np.exp(-((x - 0.7) * 10)**2); b /= b.sum()
C = np.abs(x[:, None] - x[None, :])     # |x - y|

P = sinkhorn(C, a, b)
print(f"Mass conservation (row sums ≈ a): {np.max(np.abs(P.sum(axis=1) - a)):.4e}")
print(f"Optimal transport cost: {np.sum(P * C):.4f}")
print(f"L1 between means as a sanity check: {abs(np.sum(x * a) - np.sum(x * b)):.4f}")

# 1D OT closed form: pair sorted samples
samples_a = np.random.choice(x, size=1000, p=a)
samples_b = np.random.choice(x, size=1000, p=b)
W1 = np.mean(np.abs(np.sort(samples_a) - np.sort(samples_b)))
print(f"W_1 from sorted samples: {W1:.4f}")
```

## Applied

- **WGAN** (Arjovsky, Chintala, Bottou 2017) — Wasserstein-1 loss
  for generative adversarial nets; better gradients than KL/JS.
- **Single-cell biology** — Schiebinger et al.: OT to estimate
  cell-fate trajectories from snapshot data.
- **Image processing / colour transfer** — match colour distributions
  via OT.
- **Domain adaptation** — align source / target feature distributions
  via OT.
- **Diffusion models** — score-based / flow-matching frameworks
  closely related to OT.

## Check Your Understanding

:::widget type=numeric-input prompt="Wasserstein distance is a true metric. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Brenier: OT map = $\\nabla \\phi$ for convex $\\phi$ (quadratic cost). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Heat equation = Wasserstein gradient flow of entropy (JKO). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Sinkhorn algorithm: entropic-regularised OT. Type 1." answer=1 explain="Yes.":::
