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

## Visualisation — The likelihood landscape

Maximum Likelihood Estimation isn't magic — it literally finds the
parameter value that makes the **likelihood curve** highest. Plotting
that curve makes the whole procedure visible.

```python
# ── Visualising MLE: where does the likelihood peak? ────────
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 3, figsize=(15, 4.8))

# (1) Bernoulli MLE: 7 heads in 10 coin flips. Try every plausible
# coin bias p and plot the likelihood L(p) = p^7 (1-p)^3.
# The peak is at p̂ = 7/10 = 0.7 — the obvious sample proportion.
ax = axes[0]
heads, n = 7, 10
ps = np.linspace(0.001, 0.999, 400)
L  = ps ** heads * (1 - ps) ** (n - heads)
mle = heads / n
ax.plot(ps, L, color="tab:blue", lw=2, label="likelihood $L(p)$")
ax.axvline(mle, color="red", lw=2, linestyle="--",
           label=f"MLE $\\hat p = {mle}$")
ax.fill_between(ps, L, alpha=0.20, color="tab:blue")
ax.set_title(f"Bernoulli MLE\n{heads} heads in {n} flips → $\\hat p$ = {mle}")
ax.set_xlabel("candidate p (coin bias)"); ax.set_ylabel("likelihood L(p)")
ax.legend(); ax.grid(True, alpha=0.3)

# (2) The same likelihood as a *log-likelihood*. Same peak, but on a
# scale where multiplying many small probabilities won't underflow.
# This is why training code always uses log-likelihood, never the raw
# likelihood — the latter underflows to 0 for any moderate dataset.
ax = axes[1]
log_L = heads * np.log(ps) + (n - heads) * np.log(1 - ps)
ax.plot(ps, log_L, color="tab:orange", lw=2, label="log-likelihood")
ax.axvline(mle, color="red", lw=2, linestyle="--",
           label=f"MLE $\\hat p = {mle}$")
ax.set_title("Same MLE, viewed as log-likelihood\n(numerically safer)")
ax.set_xlabel("candidate p"); ax.set_ylabel("log L(p)")
ax.set_ylim(-30, 0)
ax.legend(); ax.grid(True, alpha=0.3)

# (3) Gaussian MLE for the mean. Five observations, fixed σ = 1.
# We sweep candidate μ values and plot log-likelihood.
# The peak is exactly the sample mean.
ax = axes[2]
data = np.array([1.5, 2.2, 1.9, 2.6, 2.0])
sigma = 1.0
mus = np.linspace(0, 4, 400)
log_L_gauss = np.array([
    -0.5 * np.sum((data - mu)**2) / sigma**2 - len(data) * np.log(sigma * np.sqrt(2 * np.pi))
    for mu in mus
])
ax.plot(mus, log_L_gauss, color="tab:green", lw=2, label="log-likelihood")
sample_mean = data.mean()
ax.axvline(sample_mean, color="red", lw=2, linestyle="--",
           label=f"MLE $\\hat \\mu$ = {sample_mean:.2f}\n(= sample mean)")
ax.set_title("Gaussian-mean MLE\n→ MLE always equals the sample mean")
ax.set_xlabel("candidate μ"); ax.set_ylabel("log L(μ)")
ax.legend(); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Numerical check: confirm the calculus answer matches the plot's peak.
print(f"Bernoulli: 7 heads in 10  →  closed-form MLE = {heads / n}")
print(f"          ↳ peak in plot is at p = {ps[np.argmax(L)]:.4f}")
print()
print(f"Gaussian (σ = 1): data = {data.tolist()}")
print(f"          ↳ closed-form MLE = sample mean = {sample_mean:.4f}")
print(f"          ↳ peak in plot is at μ = {mus[np.argmax(log_L_gauss)]:.4f}")
```

**What the three curves together prove:**

- **MLE = "find the peak".** The likelihood is a function of the
  *parameter*, not of the data; the data is fixed. We slide the
  parameter and ask "which value would have made the data we actually
  saw most probable?".
- **Log-likelihood has the same peak.** Because $\log$ is monotonic,
  taking $\log$ doesn't move the maximum — but it turns the
  product-of-many-tiny-numbers into a sum, which is what every modern
  optimiser actually computes. Cross-entropy loss in deep learning is
  *exactly* the negative log-likelihood of a Bernoulli or categorical
  model.
- **Closed-form answers exist for the easy cases.** Bernoulli MLE is the
  sample proportion $7/10$. Gaussian-mean MLE is the sample mean. These
  closed forms are special cases of the general "set the gradient of
  the log-likelihood to zero" recipe — gradient descent does the same
  thing iteratively when no closed form exists.

## Connection to CS / Games / AI / Business / Industry

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
