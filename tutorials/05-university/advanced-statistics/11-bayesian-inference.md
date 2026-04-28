# Bayesian Inference

## Intuition

Classical (frequentist) statistics treats parameters as fixed unknowns.
Bayesian statistics treats parameters as random variables with their own
distributions. You start with a **prior** belief, observe data, and update
to a **posterior** belief using Bayes' theorem. This is how humans naturally
reason: "I thought the coin was fair, but after seeing 9 heads in 10 flips,
I now believe it is biased."

## Prerequisites

- Tier 4, Lesson 2 (Conditional Probability and Bayes' Theorem)
- Tier 14, Lesson 1 (Estimation Theory)

## From First Principles

### Bayes' Theorem for Parameters

$$P(\theta | \text{data}) = \frac{P(\text{data} | \theta) \cdot P(\theta)}{P(\text{data})}$$

- $P(\theta)$ — **prior**: what you believe before seeing data
- $P(\text{data} | \theta)$ — **likelihood**: how probable the data is given $\theta$
- $P(\text{data})$ — **evidence** (normalising constant): $\int P(\text{data}|\theta)P(\theta)d\theta$
- $P(\theta | \text{data})$ — **posterior**: updated belief after seeing data

Often written as: **posterior $\propto$ likelihood $\times$ prior**.

### Conjugate Priors

A prior is **conjugate** to a likelihood if the posterior has the same
distributional family as the prior. This makes the math tractable.

#### Beta-Binomial Conjugacy

Prior: $\theta \sim \text{Beta}(\alpha, \beta)$

Likelihood: $x | \theta \sim \text{Binomial}(n, \theta)$, observe $k$ successes.

Posterior:
$$\theta | x \sim \text{Beta}(\alpha + k, \beta + n - k)$$

**Pen & paper example:** Prior: $\text{Beta}(2, 2)$ (mild belief in fairness).
Observe: 7 heads in 10 flips.

Posterior: $\text{Beta}(2+7, 2+3) = \text{Beta}(9, 5)$

Posterior mean: $\frac{9}{9+5} = \frac{9}{14} \approx 0.643$

Note: MLE would give $7/10 = 0.7$. The prior pulls the estimate toward
0.5 (shrinkage).

#### Normal-Normal Conjugacy

Prior: $\mu \sim N(\mu_0, \sigma_0^2)$

Likelihood: $\bar{x} | \mu \sim N(\mu, \sigma^2/n)$ (known $\sigma^2$).

Posterior: $\mu | \bar{x} \sim N(\mu_n, \sigma_n^2)$, where:

$$\mu_n = \frac{\frac{\mu_0}{\sigma_0^2} + \frac{n\bar{x}}{\sigma^2}}{\frac{1}{\sigma_0^2} + \frac{n}{\sigma^2}}, \quad
\sigma_n^2 = \frac{1}{\frac{1}{\sigma_0^2} + \frac{n}{\sigma^2}}$$

The posterior precision (inverse variance) is the sum of prior precision
and data precision.

### MAP vs Posterior Mean

- **MAP (Maximum A Posteriori):** the mode of the posterior — the single
  most probable value.
- **Posterior mean:** the expected value of the posterior — minimises
  squared error loss.

For symmetric posteriors (like Normal), MAP = posterior mean.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

theta = np.linspace(0, 1, 300)

# Beta-Binomial updating
alpha_prior, beta_prior = 2, 2
n_flips, k_heads = 10, 7
alpha_post = alpha_prior + k_heads
beta_post = beta_prior + n_flips - k_heads

prior = stats.beta.pdf(theta, alpha_prior, beta_prior)
likelihood = stats.binom.pmf(k_heads, n_flips, theta)
likelihood_scaled = likelihood / likelihood.max() * prior.max()
posterior = stats.beta.pdf(theta, alpha_post, beta_post)

fig, axes = plt.subplots(1, 2, figsize=(13, 5))

# Beta-Binomial
axes[0].plot(theta, prior, 'b-', lw=2, label=f'Prior: Beta({alpha_prior},{beta_prior})')
axes[0].plot(theta, likelihood_scaled, 'g--', lw=2, label='Likelihood (scaled)')
axes[0].plot(theta, posterior, 'r-', lw=2, label=f'Posterior: Beta({alpha_post},{beta_post})')
axes[0].axvline(k_heads/n_flips, color='gray', linestyle=':', label=f'MLE = {k_heads/n_flips}')
axes[0].axvline(alpha_post/(alpha_post+beta_post), color='red', linestyle=':',
                label=f'Post. mean = {alpha_post/(alpha_post+beta_post):.3f}')
axes[0].set_xlabel(r'$\theta$')
axes[0].set_ylabel('Density')
axes[0].set_title('Beta-Binomial: Prior to Posterior')
axes[0].legend(fontsize=9)

# Sequential updating
axes[1].plot(theta, stats.beta.pdf(theta, 2, 2), 'b-', lw=1, alpha=0.5, label='Prior')
data_sequence = [1, 1, 0, 1, 1, 1, 0, 1, 1, 1]  # 1=head, 0=tail
a, b = 2, 2
for i, outcome in enumerate(data_sequence):
    a += outcome
    b += (1 - outcome)
    if (i+1) % 3 == 0 or i == len(data_sequence)-1:
        axes[1].plot(theta, stats.beta.pdf(theta, a, b), lw=1.5,
                     label=f'After {i+1} flips: Beta({a},{b})')
axes[1].set_xlabel(r'$\theta$')
axes[1].set_title('Sequential Bayesian Updating')
axes[1].legend(fontsize=9)

plt.tight_layout()
plt.savefig('bayesian_updating.png', dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np
from scipy import stats

# ── Beta-Binomial ────────────────────────────────────────
print("=== Beta-Binomial Conjugate Update ===")
alpha_prior, beta_prior = 2, 2
n, k = 10, 7

alpha_post = alpha_prior + k
beta_post = beta_prior + n - k

prior_mean = alpha_prior / (alpha_prior + beta_prior)
post_mean = alpha_post / (alpha_post + beta_post)
mle = k / n

print(f"Prior: Beta({alpha_prior}, {beta_prior}), mean = {prior_mean:.3f}")
print(f"Data: {k} heads in {n} flips")
print(f"Posterior: Beta({alpha_post}, {beta_post}), mean = {post_mean:.3f}")
print(f"MLE: {mle:.3f}")

# 95% credible interval
ci_low, ci_high = stats.beta.ppf([0.025, 0.975], alpha_post, beta_post)
print(f"95% credible interval: [{ci_low:.3f}, {ci_high:.3f}]")

# ── Normal-Normal ────────────────────────────────────────
print("\n=== Normal-Normal Conjugate Update ===")
mu_0, sigma_0 = 170, 10    # prior: mean height 170cm, sd 10
sigma = 5                    # known population sd
xbar = 175                   # observed sample mean
n_obs = 25

precision_prior = 1 / sigma_0**2
precision_data = n_obs / sigma**2
precision_post = precision_prior + precision_data

mu_post = (mu_0 * precision_prior + xbar * precision_data) / precision_post
sigma_post = np.sqrt(1 / precision_post)

print(f"Prior: N({mu_0}, {sigma_0}^2)")
print(f"Data: xbar = {xbar}, n = {n_obs}, sigma = {sigma}")
print(f"Posterior: N({mu_post:.3f}, {sigma_post:.3f}^2)")
print(f"Post. 95% CI: [{mu_post - 1.96*sigma_post:.3f}, {mu_post + 1.96*sigma_post:.3f}]")
```

## Connection to CS / Games / AI / Business / Industry

- **Spam Filters:** Naive Bayes classifiers are Bayesian models that update
  word probabilities given labelled emails.
- **Recommendation Systems:** Bayesian priors regularise user preference
  estimates when data is sparse (new users with few ratings).
- **Reinforcement Learning:** Thompson sampling uses Bayesian posterior
  distributions to balance exploration and exploitation.
- **Game AI:** Bayesian updating models how an NPC should update beliefs
  about player location given noisy sensor data.

## Check Your Understanding

1. Starting from $\text{Beta}(1, 1)$ (uniform prior), observe 3 heads
   and 7 tails. Compute the posterior, its mean, mode, and a 90% credible
   interval by hand.

2. In the Normal-Normal case, what happens to the posterior as $n \to \infty$?
   What does this say about the prior's influence?

3. Why is $\text{Beta}(1, 1)$ considered a "non-informative" prior for a
   coin flip? Is it truly non-informative?
