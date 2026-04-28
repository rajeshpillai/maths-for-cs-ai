# Method of Moments

## Intuition

If you know a distribution is Gaussian but do not know its mean and variance,
you can estimate them by matching the sample's average and spread to the
theoretical formulas. The Method of Moments (MoM) says: set the first $k$
population moments equal to the first $k$ sample moments and solve for the
unknown parameters. It is often simpler than MLE, though sometimes less
efficient.

## Prerequisites

- Tier 14, Lesson 1 (Estimation Theory)
- Tier 4, Lesson 4 (Expectation and Variance)
- Tier 4, Lesson 14 (Maximum Likelihood Estimation)

## From First Principles

### Moments

The **$k$-th population moment** is:

$$\mu_k = E[X^k]$$

The **$k$-th sample moment** is:

$$m_k = \frac{1}{n}\sum_{i=1}^{n} X_i^k$$

The **$k$-th central moment** is $E[(X - \mu)^k]$, with the second central
moment being the variance $\sigma^2$.

### The Method

Suppose a distribution has $p$ unknown parameters $\theta_1, \ldots, \theta_p$.

1. Express the first $p$ population moments $\mu_1, \ldots, \mu_p$ as
   functions of $\theta_1, \ldots, \theta_p$.
2. Set $\mu_k = m_k$ for $k = 1, \ldots, p$.
3. Solve the system of equations for $\hat{\theta}_1, \ldots, \hat{\theta}_p$.

### Pen & Paper Example 1: Normal Distribution

Parameters: $\mu, \sigma^2$.

First moment: $\mu_1 = E[X] = \mu$

Second moment: $\mu_2 = E[X^2] = \sigma^2 + \mu^2$
(since $\text{Var}(X) = E[X^2] - (E[X])^2$)

Set equal to sample moments:
$$\hat{\mu} = m_1 = \frac{1}{n}\sum X_i = \bar{X}$$

$$\hat{\sigma}^2 = m_2 - m_1^2 = \frac{1}{n}\sum X_i^2 - \bar{X}^2
= \frac{1}{n}\sum (X_i - \bar{X})^2$$

Note: this gives the **biased** variance estimator (divides by $n$).

### Pen & Paper Example 2: Gamma Distribution

The Gamma($\alpha, \beta$) has $E[X] = \alpha\beta$ and
$E[X^2] = \alpha\beta^2 + \alpha^2\beta^2 = \alpha\beta^2(1 + \alpha)$.

Set $m_1 = \alpha\beta$ and $m_2 = \alpha\beta^2(1 + \alpha)$.

From the first equation: $\beta = m_1 / \alpha$.

Substitute into the second:
$$m_2 = \alpha \cdot (m_1/\alpha)^2 \cdot (1 + \alpha)
= \frac{m_1^2}{\alpha}(1 + \alpha)
= \frac{m_1^2(1 + \alpha)}{\alpha}$$

$$m_2 \alpha = m_1^2 + m_1^2 \alpha$$

$$\alpha(m_2 - m_1^2) = m_1^2$$

$$\hat{\alpha} = \frac{m_1^2}{m_2 - m_1^2}$$

$$\hat{\beta} = \frac{m_2 - m_1^2}{m_1}$$

**Numerical check:** Suppose sample gives $m_1 = 6$, $m_2 = 48$.
Then $\hat{\alpha} = 36 / (48 - 36) = 36/12 = 3$,
$\hat{\beta} = 12/6 = 2$. So Gamma(3, 2).

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

np.random.seed(42)
true_alpha, true_beta = 3.0, 2.0
n = 500
sample = np.random.gamma(true_alpha, true_beta, n)

# Method of Moments estimates
m1 = np.mean(sample)
m2 = np.mean(sample**2)
alpha_hat = m1**2 / (m2 - m1**2)
beta_hat = (m2 - m1**2) / m1

x = np.linspace(0, 25, 300)
pdf_true = stats.gamma.pdf(x, a=true_alpha, scale=true_beta)
pdf_mom = stats.gamma.pdf(x, a=alpha_hat, scale=beta_hat)

fig, ax = plt.subplots(figsize=(9, 5))
ax.hist(sample, bins=40, density=True, alpha=0.5, label='Sample histogram')
ax.plot(x, pdf_true, 'r-', lw=2, label=f'True Gamma({true_alpha}, {true_beta})')
ax.plot(x, pdf_mom, 'b--', lw=2,
        label=f'MoM Gamma({alpha_hat:.2f}, {beta_hat:.2f})')
ax.set_xlabel('x')
ax.set_ylabel('Density')
ax.set_title('Method of Moments: Fitting a Gamma Distribution')
ax.legend()
plt.tight_layout()
plt.savefig('mom_gamma_fit.png', dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np
from scipy import stats

np.random.seed(42)

# Step 1: Generate data from a known Gamma distribution
true_alpha, true_beta = 3.0, 2.0
n = 1000
sample = np.random.gamma(true_alpha, true_beta, n)

# Step 2: Compute sample moments
m1 = np.mean(sample)
m2 = np.mean(sample**2)
print(f"Sample moments: m1 = {m1:.4f}, m2 = {m2:.4f}")

# Step 3: MoM estimators for Gamma(alpha, beta)
alpha_hat = m1**2 / (m2 - m1**2)
beta_hat = (m2 - m1**2) / m1
print(f"\nTrue parameters:  alpha = {true_alpha}, beta = {true_beta}")
print(f"MoM estimates:    alpha = {alpha_hat:.4f}, beta = {beta_hat:.4f}")

# Step 4: Compare with MLE (via scipy)
# scipy uses shape=alpha, scale=beta
alpha_mle, _, beta_mle = stats.gamma.fit(sample, floc=0)
print(f"MLE estimates:    alpha = {alpha_mle:.4f}, beta = {beta_mle:.4f}")

# Step 5: Repeat for Normal distribution
print("\n--- Normal Distribution ---")
true_mu, true_sigma = 10.0, 3.0
sample_norm = np.random.normal(true_mu, true_sigma, n)

mu_hat = np.mean(sample_norm)
sigma2_hat = np.mean(sample_norm**2) - np.mean(sample_norm)**2
print(f"True: mu={true_mu}, sigma^2={true_sigma**2}")
print(f"MoM:  mu={mu_hat:.4f}, sigma^2={sigma2_hat:.4f}")
```

## Connection to CS / Games / AI / Business / Industry

- **Quick parameter estimation:** In streaming data systems, MoM provides
  fast parameter estimates without iterative optimisation (unlike MLE).
- **Feature engineering:** Fitting distributions to data features using MoM
  helps in anomaly detection and data preprocessing pipelines.
- **Game balance:** Estimating the distribution of player scores or loot
  drops to verify they match design intentions.
- **Bayesian priors:** MoM can provide initial hyperparameter estimates
  for prior distributions in Bayesian models.

## Check Your Understanding

1. Derive MoM estimators for the Uniform($a, b$) distribution. (Hint:
   $E[X] = (a+b)/2$, $E[X^2] = (a^2 + ab + b^2)/3$.)

2. Given sample data $\{2, 4, 6, 8, 10\}$, compute MoM estimates for a
   Gamma distribution by hand.

3. Why might MoM give a negative variance estimate in some cases? When
   would you prefer MLE over MoM?
