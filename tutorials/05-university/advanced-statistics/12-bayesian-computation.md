# Bayesian Computation (MCMC)

## Intuition

Conjugate priors give clean formulas, but most real-world Bayesian models
have no closed-form posterior. How do you compute the posterior when you
cannot solve the integral? You *sample* from it. MCMC (Markov Chain Monte
Carlo) generates a sequence of samples that, after enough iterations,
behave as if drawn from the true posterior. It is the computational engine
that makes modern Bayesian inference possible.

## Prerequisites

- Tier 14, Lesson 11 (Bayesian Inference)
- Tier 10, Lesson 5 (Monte Carlo Methods)

## From First Principles

### Why MCMC?

The posterior is:
$$P(\theta | \text{data}) = \frac{P(\text{data}|\theta)P(\theta)}{P(\text{data})}$$

The denominator $P(\text{data}) = \int P(\text{data}|\theta)P(\theta)d\theta$
is often intractable in high dimensions. MCMC avoids computing it.

### The Metropolis-Hastings Algorithm

1. Start at some initial value $\theta_0$.
2. At step $t$, propose a new value: $\theta^* \sim q(\theta^* | \theta_t)$
   (e.g., $\theta^* = \theta_t + \epsilon$, $\epsilon \sim N(0, \sigma^2)$).
3. Compute the acceptance ratio:
$$\alpha = \min\left(1, \frac{P(\theta^*|\text{data}) \cdot q(\theta_t|\theta^*)}{P(\theta_t|\text{data}) \cdot q(\theta^*|\theta_t)}\right)$$
   For a symmetric proposal ($q$ is the same in both directions):
$$\alpha = \min\left(1, \frac{P(\text{data}|\theta^*)P(\theta^*)}{P(\text{data}|\theta_t)P(\theta_t)}\right)$$
   Note: $P(\text{data})$ cancels — we only need the *unnormalised* posterior.
4. Accept $\theta^* $ with probability $\alpha$: draw $u \sim \text{Uniform}(0,1)$.
   If $u < \alpha$, set $\theta_{t+1} = \theta^*$. Otherwise, $\theta_{t+1} = \theta_t$.
5. Repeat.

### Pen & Paper: One Step

Suppose the unnormalised posterior is $f(\theta) = e^{-(\theta-3)^2/2}$
(a Normal(3,1)).

Current: $\theta_t = 2.0$, Proposal: $\theta^* = 4.0$ (symmetric proposal).

$$\alpha = \min\left(1, \frac{e^{-(4-3)^2/2}}{e^{-(2-3)^2/2}}\right)
= \min\left(1, \frac{e^{-0.5}}{e^{-0.5}}\right) = \min(1, 1) = 1$$

Accept! Both are equally likely under the target.

Now try $\theta^* = 6.0$:
$$\alpha = \min\left(1, \frac{e^{-(6-3)^2/2}}{e^{-(2-3)^2/2}}\right)
= \min\left(1, \frac{e^{-4.5}}{e^{-0.5}}\right)
= \min(1, e^{-4}) = 0.018$$

Very likely rejected — 6.0 is far from the mode.

### Burn-In and Convergence

- **Burn-in:** The initial samples before the chain has "found" the high-
  probability region. Discard these (first 500-1000 samples typically).
- **Convergence:** The chain should look like "white noise" around the
  posterior mode (no trends, no stuck periods).
- **Thinning:** Keep every $k$-th sample to reduce autocorrelation.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)

# Target: posterior is proportional to a mixture of normals
def log_target(theta):
    # Mixture: 0.4 * N(2, 0.5) + 0.6 * N(5, 1)
    from scipy.stats import norm
    return np.log(0.4 * norm.pdf(theta, 2, 0.5) + 0.6 * norm.pdf(theta, 5, 1) + 1e-300)

# Metropolis-Hastings
n_iter = 10000
chain = np.zeros(n_iter)
chain[0] = 0.0
proposal_sd = 1.0
accepted = 0

for t in range(1, n_iter):
    proposal = chain[t-1] + np.random.normal(0, proposal_sd)
    log_alpha = log_target(proposal) - log_target(chain[t-1])
    if np.log(np.random.uniform()) < log_alpha:
        chain[t] = proposal
        accepted += 1
    else:
        chain[t] = chain[t-1]

burn_in = 1000
samples = chain[burn_in:]

fig, axes = plt.subplots(2, 2, figsize=(12, 8))

# Trace plot (full)
axes[0, 0].plot(chain, lw=0.5)
axes[0, 0].axvline(burn_in, color='red', linestyle='--', label='Burn-in cutoff')
axes[0, 0].set_title('Trace Plot (Full Chain)')
axes[0, 0].set_xlabel('Iteration')
axes[0, 0].legend()

# Trace plot (post burn-in)
axes[0, 1].plot(samples, lw=0.5, color='steelblue')
axes[0, 1].set_title('Trace Plot (After Burn-in)')
axes[0, 1].set_xlabel('Iteration')

# Posterior histogram
x_grid = np.linspace(-1, 8, 300)
from scipy.stats import norm
true_density = 0.4 * norm.pdf(x_grid, 2, 0.5) + 0.6 * norm.pdf(x_grid, 5, 1)

axes[1, 0].hist(samples, bins=60, density=True, alpha=0.6, label='MCMC samples')
axes[1, 0].plot(x_grid, true_density, 'r-', lw=2, label='True density')
axes[1, 0].set_title('Posterior Histogram vs True Density')
axes[1, 0].legend()

# Autocorrelation
from numpy import correlate
max_lag = 50
acf = np.array([np.corrcoef(samples[:-lag], samples[lag:])[0,1]
                if lag > 0 else 1.0 for lag in range(max_lag)])
axes[1, 1].bar(range(max_lag), acf, color='steelblue')
axes[1, 1].set_title('Autocorrelation')
axes[1, 1].set_xlabel('Lag')

plt.suptitle(f'Metropolis-Hastings MCMC (acceptance rate: {accepted/n_iter:.2%})')
plt.tight_layout()
plt.savefig('mcmc_trace_posterior.png', dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np
from scipy import stats

np.random.seed(42)

# ── Simple example: infer mean of Normal with known variance ──
# True: mu = 5.0, sigma = 2.0, prior: mu ~ N(0, 10)
true_mu = 5.0
sigma = 2.0
data = np.random.normal(true_mu, sigma, 30)
n = len(data)
xbar = np.mean(data)

# Step 1: Metropolis-Hastings
def log_posterior(mu, data, sigma, mu_prior=0, sigma_prior=10):
    log_lik = np.sum(stats.norm.logpdf(data, mu, sigma))
    log_prior = stats.norm.logpdf(mu, mu_prior, sigma_prior)
    return log_lik + log_prior

n_iter = 20000
chain = np.zeros(n_iter)
chain[0] = 0.0  # start far from truth
proposal_sd = 0.5
accepted = 0

for t in range(1, n_iter):
    proposal = chain[t-1] + np.random.normal(0, proposal_sd)
    log_alpha = log_posterior(proposal, data, sigma) - log_posterior(chain[t-1], data, sigma)
    if np.log(np.random.uniform()) < log_alpha:
        chain[t] = proposal
        accepted += 1
    else:
        chain[t] = chain[t-1]

burn_in = 2000
samples = chain[burn_in:]

print(f"Data: n={n}, xbar={xbar:.3f}")
print(f"Acceptance rate: {accepted/n_iter:.2%}")
print(f"\nMCMC posterior mean: {np.mean(samples):.4f}")
print(f"MCMC posterior std:  {np.std(samples):.4f}")

# Step 2: Compare with conjugate (exact) solution
sigma_prior = 10
precision_post = 1/sigma_prior**2 + n/sigma**2
mu_post = (0/sigma_prior**2 + n*xbar/sigma**2) / precision_post
sigma_post = np.sqrt(1 / precision_post)

print(f"\nExact posterior mean: {mu_post:.4f}")
print(f"Exact posterior std:  {sigma_post:.4f}")
print(f"MLE: {xbar:.4f}")

# Step 3: 95% credible intervals
mcmc_ci = np.percentile(samples, [2.5, 97.5])
exact_ci = stats.norm.ppf([0.025, 0.975], mu_post, sigma_post)
print(f"\nMCMC 95% CI: [{mcmc_ci[0]:.3f}, {mcmc_ci[1]:.3f}]")
print(f"Exact 95% CI: [{exact_ci[0]:.3f}, {exact_ci[1]:.3f}]")
```

## Connection to CS / Games / AI / Business / Industry

- **Probabilistic Programming:** Languages like Stan, PyMC, and Pyro use
  MCMC (and variants like NUTS/HMC) to fit complex Bayesian models.
- **Latent Variable Models:** Topic models (LDA), mixture models, and
  hidden Markov models are all fit with MCMC variants.
- **Reinforcement Learning:** Bayesian RL methods use MCMC to maintain
  uncertainty over value functions and transition models.
- **Procedural Generation:** MCMC can sample from complex distributions
  over game levels, textures, or music that satisfy constraints.

## Check Your Understanding

1. Implement Metropolis-Hastings to sample from $\text{Gamma}(3, 2)$ using
   only the unnormalised density. Verify the mean and variance match theory.

2. What happens if the proposal standard deviation is too small? Too large?
   Experiment and plot trace plots for both.

3. Why does the acceptance ratio not require the normalising constant
   $P(\text{data})$? Show the cancellation algebraically.
