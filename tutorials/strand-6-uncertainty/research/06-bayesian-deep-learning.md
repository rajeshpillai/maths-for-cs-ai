---
strand: uncertainty
level: research
order: 6
title: Bayesian Deep Learning
prerequisites:
  - tier: strand-6-uncertainty-research
    slug: 05-rl-theory
    description: RL theory
connections:
  - strand-6-uncertainty-research/07-causal-frontier
applications:
  - cs: "Uncertainty quantification in DL, active learning"
  - life: "Combining Bayes with neural networks"
---

# Bayesian Deep Learning

## Mental

**Bayesian Deep Learning (BDL)**: learn a *distribution* over neural
network weights (rather than a point estimate).

Predictions are then *expectations* over the posterior:

$$
p(y | x, \mathcal D) = \int p(y | x, \theta) \, p(\theta | \mathcal D) \, d\theta.
$$

Goal: well-calibrated **uncertainty** estimates, robustness to
distribution shift, principled inductive biases.

## Approximate inference methods

**Exact posterior intractable** for NNs. Approximations:

- **Variational inference**: approximate $p(\theta | \mathcal D)$ by
  $q(\theta)$ minimising KL.
- **MC Dropout** (Gal-Ghahramani 2016): dropout at test time as
  approximate Bayesian inference.
- **HMC / NUTS**: gold-standard MCMC, expensive.
- **SGLD / SGMCMC**: stochastic-gradient MCMC.
- **Laplace approximation**: Gaussian posterior centred at MAP.
- **Deep ensembles** (Lakshminarayanan et al. 2017): train multiple
  NNs from random inits — frequentist alternative often beating
  formal Bayesian methods.

## Gaussian processes meet NNs

**Neural Tangent Kernel** (Strand 4 Research Lesson 04): infinite-
width NN at init = Gaussian process. Trained via gradient flow:
also GP under linearised dynamics.

**Deep Gaussian Processes** (Damianou-Lawrence 2013): hierarchical
GPs; partial Bayesian DL.

**Functional priors** vs weight-space priors: alternative
formulations.

## Worked example: variational NN

For weights $\theta$, prior $p(\theta) = \mathcal N(0, I)$:

Variational posterior $q_\phi(\theta) = \mathcal N(\mu_\phi, \mathrm{diag}(\sigma_\phi))$.

Maximise **ELBO**:

$$
\mathcal L = \mathbb E_{q_\phi}[\log p(\mathcal D | \theta)] - \mathrm{KL}(q_\phi \| p).
$$

Reparameterisation trick: $\theta = \mu + \sigma \cdot \epsilon$
with $\epsilon \sim \mathcal N(0, I)$ allows backprop.

## Interactive

:::widget type=numeric-input prompt="BDL: distribution over NN weights. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="MC Dropout (Gal-Ghahramani 2016) approximate Bayesian. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Deep ensembles often beat formal BDL. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="ELBO = data likelihood - KL(posterior || prior). Type 1." answer=1 explain="Yes.":::

## Symbolic

**Calibration**: predicted probabilities match empirical frequencies.
DL models often *miscalibrated* without explicit handling.

**Conformal prediction** (Vovk et al.): distribution-free uncertainty
intervals with coverage guarantees. Increasingly popular.

**Out-of-distribution detection**: BDL methods predict high
uncertainty for OOD. Many failures in practice — open problem.

**Active learning**: BDL guides which examples to label;
uncertainty-driven exploration.

## Computational

```python
import numpy as np

# Toy Bayesian NN via Laplace approximation
# Train MAP, then compute Hessian — Gaussian posterior centred at MAP

def map_estimate(X, y, n_features=10, prior_var=1.0):
    """Solve linear regression: w_MAP = (X^T X + (1/prior_var) I)^-1 X^T y."""
    n = X.shape[0]
    H = X.T @ X + np.eye(n_features) / prior_var
    return np.linalg.solve(H, X.T @ y), H

X = np.random.randn(50, 10)
w_true = np.random.randn(10)
y = X @ w_true + 0.1 * np.random.randn(50)

w_map, H = map_estimate(X, y)
print(f"MAP w (first 3): {w_map[:3]}")
print(f"True w (first 3): {w_true[:3]}")

# Posterior covariance ≈ H^-1
post_cov = np.linalg.inv(H)
print(f"Posterior std (first 3): {np.sqrt(np.diag(post_cov))[:3]}")

# Predict with uncertainty
x_new = np.random.randn(10)
y_mean = x_new @ w_map
y_var = x_new @ post_cov @ x_new
print(f"Prediction: {y_mean:.4f} ± {np.sqrt(y_var):.4f}")
```

## Applied

- **Active learning** — query informative examples via uncertainty.
- **Bayesian optimisation** — for hyperparameter tuning.
- **Drug discovery** — Bayesian models of molecular activity.
- **Autonomous driving** — uncertainty-aware perception.
- **Medical imaging** — calibrated diagnoses with confidence.

## Check Your Understanding

:::widget type=numeric-input prompt="BDL: distribution over weights. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Reparameterisation trick: $\\theta = \\mu + \\sigma \\epsilon$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Conformal prediction: distribution-free coverage. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Deep ensembles often beat formal Bayesian methods. Type 1." answer=1 explain="Yes.":::
