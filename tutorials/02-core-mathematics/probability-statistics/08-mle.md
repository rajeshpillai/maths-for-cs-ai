# Maximum Likelihood Estimation (MLE)

## Intuition

You observe data.  You have a model with unknown parameters.  MLE asks:
"What parameter values make the observed data **most probable**?"  It's the
most fundamental method for fitting models to data, and it's what happens
under the hood when you train a neural network with cross-entropy loss.

## Prerequisites

- Tier 4, Lessons 5-6: Discrete and Continuous Distributions (Bernoulli, Gaussian)
- Tier 3, Lesson 2: Derivatives (finding maxima)

## From First Principles

### The likelihood function

Given data $x_1, x_2, \ldots, x_n$ and a model with parameter $\theta$:

$$L(\theta) = P(\text{data} | \theta) = \prod_{i=1}^{n} P(x_i | \theta)$$

(Assuming independent observations.)

### The log-likelihood

Products are hard; sums are easy.  Take the log:

$$\ell(\theta) = \ln L(\theta) = \sum_{i=1}^{n} \ln P(x_i | \theta)$$

Since $\ln$ is monotonically increasing, maximising $\ell$ is the same as maximising $L$.

### The MLE recipe

1. Write the log-likelihood $\ell(\theta)$
2. Take the derivative: $\frac{d\ell}{d\theta}$
3. Set it to zero: $\frac{d\ell}{d\theta} = 0$
4. Solve for $\hat{\theta}$ (the MLE estimate)

### Pen & paper: MLE for Bernoulli (coin flip)

Data: $n$ flips, $k$ heads.  Model: $P(\text{head}) = p$.

$$L(p) = p^k (1-p)^{n-k}$$

$$\ell(p) = k \ln p + (n-k) \ln(1-p)$$

$$\frac{d\ell}{dp} = \frac{k}{p} - \frac{n-k}{1-p} = 0$$

$$\frac{k}{p} = \frac{n-k}{1-p}$$

$$k(1-p) = p(n-k)$$

$$k - kp = np - kp$$

$$k = np$$

$$\boxed{\hat{p} = \frac{k}{n}}$$

The MLE is just the sample proportion!

**Pen & paper:** 7 heads in 10 flips → $\hat{p} = 0.7$.

### Pen & paper: MLE for Gaussian mean

Data: $x_1, \ldots, x_n$ from $\mathcal{N}(\mu, \sigma^2)$ (assume $\sigma$ known).

$$\ell(\mu) = -\frac{n}{2}\ln(2\pi\sigma^2) - \frac{1}{2\sigma^2}\sum_{i=1}^{n}(x_i - \mu)^2$$

$$\frac{d\ell}{d\mu} = \frac{1}{\sigma^2}\sum_{i=1}^{n}(x_i - \mu) = 0$$

$$\sum x_i - n\mu = 0$$

$$\boxed{\hat{\mu} = \frac{1}{n}\sum_{i=1}^{n} x_i = \bar{x}}$$

The MLE for the Gaussian mean is the **sample mean**.

### Pen & paper: MLE for Gaussian variance

Now let both $\mu$ and $\sigma^2$ be unknown.

$$\frac{\partial\ell}{\partial\sigma^2} = -\frac{n}{2\sigma^2} + \frac{1}{2\sigma^4}\sum(x_i - \mu)^2 = 0$$

$$\boxed{\hat{\sigma}^2 = \frac{1}{n}\sum_{i=1}^{n}(x_i - \bar{x})^2}$$

Note: this is the biased estimator (divides by $n$, not $n-1$).

### MLE and cross-entropy loss

For classification with labels $y_i \in \{0, 1\}$ and predicted probabilities $\hat{p}_i$:

$$\ell = \sum_{i=1}^{n} \left[y_i \ln \hat{p}_i + (1 - y_i) \ln(1 - \hat{p}_i)\right]$$

Maximising this = minimising the **binary cross-entropy loss**:

$$\text{BCE} = -\ell$$

**MLE is what you're doing when training a neural network with cross-entropy loss.**

## Python Verification

```python
# ── MLE: verifying pen & paper work ─────────────────────────
import math
import random

# Bernoulli MLE
print("=== Bernoulli MLE ===")
# Simulate coin flips
random.seed(42)
true_p = 0.7
n = 100
flips = [1 if random.random() < true_p else 0 for _ in range(n)]
k = sum(flips)
p_hat = k / n
print(f"True p = {true_p}")
print(f"Observed: {k} heads in {n} flips")
print(f"MLE p̂ = k/n = {p_hat}")

# Gaussian MLE
print(f"\n=== Gaussian MLE ===")
true_mu, true_sigma = 5.0, 2.0
data = [random.gauss(true_mu, true_sigma) for _ in range(200)]
mu_hat = sum(data) / len(data)
sigma2_hat = sum((x - mu_hat)**2 for x in data) / len(data)
print(f"True: μ={true_mu}, σ²={true_sigma**2}")
print(f"MLE: μ̂={mu_hat:.4f}, σ̂²={sigma2_hat:.4f}")

# Log-likelihood as a function of p (Bernoulli)
print(f"\n=== Log-likelihood landscape ===")
k, n = 7, 10
best_p, best_ll = 0, float('-inf')
for p_int in range(1, 100):
    p = p_int / 100
    ll = k * math.log(p) + (n - k) * math.log(1 - p)
    if ll > best_ll:
        best_ll = ll
        best_p = p
    if p_int % 10 == 0:
        print(f"  p={p:.2f}: log-likelihood = {ll:.4f}")
print(f"  Maximum at p={best_p:.2f} (analytical MLE: {k/n})")

# Cross-entropy = negative log-likelihood
print(f"\n=== Cross-entropy loss = -log-likelihood ===")
y_true = [1, 0, 1, 1, 0]
y_pred = [0.9, 0.2, 0.8, 0.7, 0.1]
bce = -sum(y * math.log(p) + (1-y) * math.log(1-p) for y, p in zip(y_true, y_pred))
print(f"BCE loss = {bce:.4f}")
print(f"Log-likelihood = {-bce:.4f}")
```

## Connection to CS / Games / AI

- **Neural network training** — cross-entropy loss IS negative log-likelihood (MLE)
- **Logistic regression** — MLE of Bernoulli model with log-odds = linear function
- **Language models** — trained by maximising likelihood of the training text
- **Gaussian mixture models** — MLE via the EM algorithm
- **Bayesian ML** — MLE is the "MAP estimate with a flat prior"

## Check Your Understanding

1. **Pen & paper:** You flip a coin 20 times and get 12 heads.  What is the MLE for $p$?  What is the log-likelihood at this value?
2. **Pen & paper:** Data: $\{2, 4, 6, 8, 10\}$.  Assuming Gaussian, find the MLE for $\mu$ and $\sigma^2$.
3. **Pen & paper:** Derive the MLE for the Poisson parameter $\lambda$ from data $x_1, \ldots, x_n$.
4. **Think about it:** Why do we maximise log-likelihood instead of likelihood?  (Two reasons: numerical and mathematical.)
