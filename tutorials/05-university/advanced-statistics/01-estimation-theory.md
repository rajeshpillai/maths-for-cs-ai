# Estimation Theory

## Intuition

Imagine you want to know the average height of every person on Earth. You
cannot measure everyone, so you measure a sample and use that to *estimate*
the true average. Estimation theory asks: how good is your estimate? Is it
systematically off (biased)? Does it get better with more data (consistent)?
How spread out are your estimates if you repeated the experiment (efficiency)?

## Prerequisites

- Tier 4, Lesson 14 (Maximum Likelihood Estimation)
- Tier 4, Lessons 4-5 (Expectation, Variance)

## From First Principles

### Point Estimation

A **point estimator** $\hat{\theta}$ is a function of sample data
$X_1, X_2, \ldots, X_n$ that produces a single value to estimate an
unknown population parameter $\theta$.

**Example:** The sample mean $\bar{X} = \frac{1}{n}\sum_{i=1}^{n} X_i$
is a point estimator for the population mean $\mu$.

### Bias

The **bias** of an estimator is how far off it is on average:

$$\text{Bias}(\hat{\theta}) = E[\hat{\theta}] - \theta$$

An estimator is **unbiased** if $\text{Bias}(\hat{\theta}) = 0$, meaning
$E[\hat{\theta}] = \theta$.

**Pen & paper example:** Let $X_1, X_2, X_3$ be drawn from a population
with mean $\mu$. Is $\bar{X} = \frac{X_1 + X_2 + X_3}{3}$ unbiased?

$$E[\bar{X}] = E\left[\frac{X_1 + X_2 + X_3}{3}\right]
= \frac{E[X_1] + E[X_2] + E[X_3]}{3}
= \frac{\mu + \mu + \mu}{3} = \mu \quad \checkmark$$

Now consider the sample variance. The **naive** formula
$\tilde{S}^2 = \frac{1}{n}\sum(X_i - \bar{X})^2$ is biased:

$$E[\tilde{S}^2] = \frac{n-1}{n}\sigma^2 \neq \sigma^2$$

The correction gives the **unbiased** sample variance:

$$S^2 = \frac{1}{n-1}\sum_{i=1}^{n}(X_i - \bar{X})^2, \quad E[S^2] = \sigma^2$$

### Consistency

An estimator is **consistent** if it converges to the true value as
$n \to \infty$:

$$\hat{\theta}_n \xrightarrow{P} \theta \quad \text{as } n \to \infty$$

By the Law of Large Numbers, $\bar{X}$ is consistent for $\mu$.

### Efficiency

Among all unbiased estimators, the most **efficient** one has the smallest
variance. The **Cramer-Rao Lower Bound** sets a floor:

$$\text{Var}(\hat{\theta}) \geq \frac{1}{n \cdot I(\theta)}$$

where $I(\theta) = -E\left[\frac{\partial^2}{\partial \theta^2} \ln f(X;\theta)\right]$
is the **Fisher information**.

An estimator achieving this bound is called **efficient** or a
**minimum variance unbiased estimator (MVUE)**.

### Mean Squared Error (MSE)

MSE combines bias and variance into one measure:

$$\text{MSE}(\hat{\theta}) = E[(\hat{\theta} - \theta)^2]
= \text{Var}(\hat{\theta}) + [\text{Bias}(\hat{\theta})]^2$$

**Pen & paper:** If $\hat{\theta}$ has bias $b = 0.5$ and variance $v = 2$,
then $\text{MSE} = 2 + 0.25 = 2.25$.

A biased estimator can have lower MSE than an unbiased one if its variance
is sufficiently smaller. This is the **bias-variance tradeoff**.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)
true_mu = 5.0
true_sigma = 2.0
n_experiments = 2000

# Unbiased estimator: sample mean
# Biased estimator: sample mean + 0.5 (artificial bias)
sample_sizes = [5, 30, 100]
fig, axes = plt.subplots(1, 3, figsize=(14, 4))

for ax, n in zip(axes, sample_sizes):
    means_unbiased = [np.mean(np.random.normal(true_mu, true_sigma, n))
                      for _ in range(n_experiments)]
    means_biased = [m + 0.5 for m in means_unbiased]

    ax.hist(means_unbiased, bins=40, alpha=0.6, label='Unbiased', density=True)
    ax.hist(means_biased, bins=40, alpha=0.6, label='Biased (+0.5)', density=True)
    ax.axvline(true_mu, color='black', linestyle='--', label=f'True $\\mu$={true_mu}')
    ax.set_title(f'n = {n}')
    ax.legend(fontsize=8)

fig.suptitle('Biased vs Unbiased Estimators Across Sample Sizes')
plt.tight_layout()
plt.savefig('estimator_comparison.png', dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np

np.random.seed(42)
true_mu = 5.0
true_sigma = 2.0
n = 10
n_experiments = 50000

# Step 1: Generate many samples and compute estimators
sample_means = []
biased_vars = []
unbiased_vars = []

for _ in range(n_experiments):
    sample = np.random.normal(true_mu, true_sigma, n)
    sample_means.append(np.mean(sample))
    biased_vars.append(np.var(sample, ddof=0))      # divide by n
    unbiased_vars.append(np.var(sample, ddof=1))     # divide by n-1

# Step 2: Check bias of sample mean
print(f"True mu: {true_mu}")
print(f"E[sample mean]: {np.mean(sample_means):.4f}")
print(f"Bias of sample mean: {np.mean(sample_means) - true_mu:.4f}")

# Step 3: Check bias of variance estimators
print(f"\nTrue sigma^2: {true_sigma**2}")
print(f"E[biased var (ddof=0)]: {np.mean(biased_vars):.4f}")
print(f"E[unbiased var (ddof=1)]: {np.mean(unbiased_vars):.4f}")
print(f"Bias of biased var: {np.mean(biased_vars) - true_sigma**2:.4f}")
print(f"Bias of unbiased var: {np.mean(unbiased_vars) - true_sigma**2:.4f}")

# Step 4: MSE decomposition
bias_sq = (np.mean(sample_means) - true_mu)**2
variance = np.var(sample_means)
mse = np.mean([(m - true_mu)**2 for m in sample_means])
print(f"\nMSE of sample mean: {mse:.4f}")
print(f"Var + Bias^2 = {variance:.4f} + {bias_sq:.6f} = {variance + bias_sq:.4f}")
```

## Connection to CS / Games / AI / Business / Industry

- **Machine Learning:** The bias-variance tradeoff governs model selection.
  A complex model has low bias but high variance (overfitting); a simple
  model has high bias but low variance (underfitting). MSE captures both.
- **A/B Testing:** When estimating conversion rates, we need unbiased
  estimators and confidence in our estimates (efficiency).
- **Reinforcement Learning:** Value function estimators must be consistent
  to ensure convergence of TD-learning algorithms.
- **Game AI:** Estimating opponent behaviour from limited observations is
  a point estimation problem.

## Check Your Understanding

1. Prove by hand that $S^2 = \frac{1}{n-1}\sum(X_i - \bar{X})^2$ is
   unbiased for $\sigma^2$. (Hint: expand $(X_i - \bar{X})^2$ and use
   $E[X_i^2] = \sigma^2 + \mu^2$.)

2. An estimator has bias 1.0 and variance 3.0. Another has bias 0 and
   variance 5.0. Which has lower MSE?

3. Write Python code to empirically verify the Cramer-Rao bound for the
   sample mean of an exponential distribution with rate $\lambda$.
