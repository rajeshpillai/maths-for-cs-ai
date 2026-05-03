---
strand: change
level: master
order: 8
title: Information Geometry
prerequisites:
  - tier: strand-4-change-master
    slug: 07-reverse-mode-ad
    description: Reverse-mode AD
connections:
  - strand-4-change-master/09-change-master-capstone
applications:
  - cs: "Natural-gradient ML, statistical inference, optimal transport"
  - life: "Geometry of probability distribution families"
---

# Information Geometry

## Mental

A **statistical manifold** is a parameterised family of probability
distributions $\{p_\theta\}_{\theta \in \Theta}$ — itself a smooth
manifold with $\theta$ as coordinates.

Two natural geometric structures:

- **Fisher information metric** — Riemannian metric.
- **$\alpha$-connections** — family of affine connections.

Examples:

- Gaussians $\mathcal N(\mu, \sigma^2)$: 2D manifold with hyperbolic
  geometry.
- Multinomials: simplex with Fisher metric.
- Exponential families generally.

## Fisher information

For $p_\theta(x)$:

$$
g_{ij}(\theta) = \mathbb E_{p_\theta}\left[\frac{\partial \log p_\theta}{\partial \theta_i} \cdot \frac{\partial \log p_\theta}{\partial \theta_j}\right].
$$

This is the **Fisher information matrix** — it gives a Riemannian
metric on the parameter manifold.

**Cramér-Rao**: any unbiased estimator $\hat \theta$ satisfies
$\mathrm{Cov}(\hat\theta) \succeq g(\theta)^{-1}$. Fisher info bounds
estimator variance.

## Natural gradient

Standard gradient descent on $\theta$: $\theta \leftarrow \theta - \eta \nabla L$.

**Natural gradient**: $\theta \leftarrow \theta - \eta g^{-1} \nabla L$.

Updates are **invariant** under reparameterisation. Often converges
faster, especially for highly anisotropic loss landscapes.

In neural-net training: K-FAC, Shampoo are practical natural-
gradient approximations.

## KL divergence and Bregman geometry

KL divergence
$\mathrm{KL}(p \| q) = \mathbb E_p[\log p - \log q]$ — *not* a metric
(asymmetric, no triangle inequality), but a **Bregman divergence**.

Bregman divergences arise from convex functions. They have rich
geometry: dual flat structure, projection theorems analogous to
Pythagoras.

For exponential families: KL = squared Euclidean distance in
**natural coordinates**.

## Interactive

:::widget type=numeric-input prompt="Fisher information matrix is a Riemannian metric. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cramér-Rao: variance bound via Fisher inverse. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Natural gradient invariant under reparameterisation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="KL divergence is a Bregman divergence. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Wasserstein distance** $W_p$: metric on probability distributions
defined via optimal transport. Geometry called *otptimal transport
geometry*.

**Riemannian Wasserstein**: $W_2$ defines a Riemannian metric on
probability measures (Otto calculus, JKO scheme).

**$f$-divergences** (KL, $\chi^2$, total variation, etc.): all
arise from convex $f$. Generalised information geometry classifies
which divergences correspond to nice metric / flat structures.

**Quantum information geometry**: Bures metric on density matrices
in quantum information theory.

## Computational

```python
import numpy as np

# Fisher information for Gaussian N(mu, sigma^2)
# Score: ∂_μ log p = (x - μ)/σ², ∂_σ log p = -1/σ + (x - μ)²/σ³
# I_μμ = 1/σ², I_σσ = 2/σ², I_μσ = 0

def fisher_gaussian(sigma):
    return np.array([[1/sigma**2, 0],
                     [0, 2/sigma**2]])

# Natural gradient on Gaussian
def natural_gradient_step(theta, gradient, sigma):
    F = fisher_gaussian(sigma)
    return theta - np.linalg.solve(F, gradient)

# Compare to standard gradient
theta = np.array([0.0, 1.0])  # mu, sigma
grad = np.array([0.1, 0.2])
sigma = theta[1]
print("Standard:", theta - 0.1 * grad)
print("Natural:", natural_gradient_step(theta, 0.1 * grad, sigma))

# KL divergence between two Gaussians
def kl_gaussian(mu1, sigma1, mu2, sigma2):
    return (np.log(sigma2 / sigma1) +
            (sigma1**2 + (mu1 - mu2)**2) / (2 * sigma2**2) - 0.5)

print("KL(N(0,1) || N(1,1)) =", kl_gaussian(0, 1, 1, 1))
# Should be 0.5 (since KL(N(0,1)||N(1,1)) = (mu1-mu2)²/(2σ²) = 0.5)
```

## Applied

- **Natural gradient in deep RL** (TRPO, PPO use Fisher-style
  approximations of policy-gradient updates).
- **Variational inference** — KL between approximate and true
  posterior.
- **Cramér-Rao bounds** in signal processing, sensor networks.
- **Optimal transport** in generative modeling (WGAN), domain
  adaptation, biology (single-cell data).
- **Quantum metrology** — Bures geometry to bound parameter
  estimation in quantum systems.

## Check Your Understanding

:::widget type=numeric-input prompt="Fisher information metric: Riemannian on parameter manifold. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Natural gradient invariant under reparameterisation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="KL is a Bregman divergence, not a metric. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Wasserstein gives a true metric on distributions. Type 1." answer=1 explain="Yes.":::
