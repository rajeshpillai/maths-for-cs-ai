# Sampling Distributions

## Intuition

Every time you compute a sample mean from data, you get a slightly different
number.  That sample mean is itself a random variable with its own distribution
— the **sampling distribution**.  Understanding sampling distributions is the
bridge between "I have data" and "I can make inferences about the population."
It answers the question: how much should I trust a single sample's statistics?

## Prerequisites

- Tier 4, Lesson 4: Expectation and Variance
- Tier 4, Lesson 6: Continuous Distributions (Gaussian, Chi-square, Student's t)
- Tier 4, Lesson 7: Central Limit Theorem

## From First Principles

### Statistics are random variables

A **statistic** is any function of the data: the sample mean $\bar{X}$,
sample variance $S^2$, sample median, etc.  Because the data is random, so is
the statistic.  Its probability distribution is called its **sampling
distribution**.

### Sampling distribution of the mean

If $X_1, \ldots, X_n$ are i.i.d. with mean $\mu$ and variance $\sigma^2$:

$$\bar{X} = \frac{1}{n}\sum_{i=1}^n X_i$$

$$E[\bar{X}] = \mu \qquad \text{Var}(\bar{X}) = \frac{\sigma^2}{n}$$

**Pen & paper derivation:**

$E[\bar{X}] = E\left[\frac{1}{n}\sum X_i\right] = \frac{1}{n}\sum E[X_i] = \frac{n\mu}{n} = \mu$

$\text{Var}(\bar{X}) = \text{Var}\left(\frac{1}{n}\sum X_i\right) = \frac{1}{n^2}\sum \text{Var}(X_i) = \frac{n\sigma^2}{n^2} = \frac{\sigma^2}{n}$

(Uses independence for the variance step.)

### Standard error

The **standard error** (SE) is the standard deviation of $\bar{X}$:

$$\text{SE} = \frac{\sigma}{\sqrt{n}}$$

**Pen & paper:** Population with $\sigma = 10$.
- $n = 25$: SE $= 10/5 = 2$
- $n = 100$: SE $= 10/10 = 1$
- $n = 400$: SE $= 10/20 = 0.5$

To halve the SE, you need $4\times$ the sample size.

### When the population is normal

If $X_i \sim \mathcal{N}(\mu, \sigma^2)$, then **exactly** (not just approximately):

$$\bar{X} \sim \mathcal{N}\left(\mu, \frac{\sigma^2}{n}\right)$$

This holds for any $n$, not just large $n$.

### Connection to the CLT

If the population is **not** normal, the CLT tells us that for large $n$:

$$\bar{X} \approx \mathcal{N}\left(\mu, \frac{\sigma^2}{n}\right)$$

The sampling distribution of the mean is approximately normal regardless of
the population shape, provided $n$ is large enough (typically $n \ge 30$).

### Sampling distribution of the variance

If $X_i \sim \mathcal{N}(\mu, \sigma^2)$, the sample variance is:

$$S^2 = \frac{1}{n-1}\sum_{i=1}^n (X_i - \bar{X})^2$$

Then:

$$\frac{(n-1)S^2}{\sigma^2} \sim \chi^2(n-1)$$

**Pen & paper derivation of moments:**

$E[S^2] = \sigma^2$ (unbiased estimator — this is why we divide by $n-1$!)

$\text{Var}(S^2) = \frac{2\sigma^4}{n-1}$

**Pen & paper:** $\sigma^2 = 100$, $n = 26$:
$E[S^2] = 100$, $\text{Var}(S^2) = 2(10000)/25 = 800$, $\text{SD}(S^2) = 28.3$

### The t-distribution connection

When $\sigma$ is unknown (the typical case), we replace it with $S$:

$$T = \frac{\bar{X} - \mu}{S/\sqrt{n}} \sim t(n-1)$$

**Pen & paper:** $n = 10$ observations.

- If we knew $\sigma$: $Z = \frac{\bar{X}-\mu}{\sigma/\sqrt{10}} \sim \mathcal{N}(0,1)$
- Since we estimate $\sigma$ with $S$: $T = \frac{\bar{X}-\mu}{S/\sqrt{10}} \sim t(9)$

The $t(9)$ distribution has heavier tails, reflecting the extra uncertainty
from estimating $\sigma$.

### Pen & paper: Complete worked example

IQ scores: $\mu = 100$, $\sigma = 15$.  Sample of $n = 36$.

$\bar{X} \sim \mathcal{N}(100, 15^2/36) = \mathcal{N}(100, 6.25)$

$\text{SE} = 15/6 = 2.5$

$P(\bar{X} > 105) = P\left(Z > \frac{105-100}{2.5}\right) = P(Z > 2) = 0.023$

There's only a 2.3% chance of getting a sample mean above 105 from a
population with true mean 100.

## Visualisation

Plotting the sampling distribution for increasing $n$ shows it narrowing
around $\mu$.  The spread shrinks as $1/\sqrt{n}$: from $n=1$ (the original
wide distribution) to $n=100$ (a tight spike around $\mu$).

## Python Verification

```python
# ── Sampling Distributions: verifying pen & paper work ────────
import random
import math

random.seed(42)

# Sampling distribution of the mean
print("=== Sampling Distribution of the Mean ===")
mu, sigma = 100, 15
N_experiments = 50000

for n in [4, 9, 25, 36, 100]:
    sample_means = []
    for _ in range(N_experiments):
        sample = [random.gauss(mu, sigma) for _ in range(n)]
        sample_means.append(sum(sample) / n)

    mean_of_means = sum(sample_means) / N_experiments
    var_of_means = sum((m - mean_of_means)**2 for m in sample_means) / N_experiments
    se_theoretical = sigma / math.sqrt(n)

    print(f"  n={n:3d}: E[X_bar]={mean_of_means:.2f} (exp {mu}), "
          f"SE={math.sqrt(var_of_means):.3f} (exp {se_theoretical:.3f})")

# P(X_bar > 105) for n=36
print(f"\n=== P(X_bar > 105) for n=36 ===")
n = 36
count = sum(1 for _ in range(N_experiments)
            if sum(random.gauss(mu, sigma) for _ in range(n))/n > 105)
p_sim = count / N_experiments
print(f"Simulated: {p_sim:.4f}")
print(f"Theoretical: P(Z > 2) = 0.0228")

# Sampling distribution of variance
print(f"\n=== Sampling Distribution of Variance ===")
n = 26
sample_vars = []
for _ in range(N_experiments):
    sample = [random.gauss(mu, sigma) for _ in range(n)]
    x_bar = sum(sample) / n
    s2 = sum((x - x_bar)**2 for x in sample) / (n - 1)
    sample_vars.append(s2)

mean_s2 = sum(sample_vars) / N_experiments
var_s2 = sum((s - mean_s2)**2 for s in sample_vars) / N_experiments
print(f"E[S^2] = {mean_s2:.2f} (expected {sigma**2})")
print(f"Var(S^2) = {var_s2:.1f} (expected {2*sigma**4/(n-1):.1f})")

# t-distribution: compare Z and T
print(f"\n=== Z vs T: tail probabilities ===")
n = 10
z_count = 0
t_count = 0
for _ in range(N_experiments):
    sample = [random.gauss(mu, sigma) for _ in range(n)]
    x_bar = sum(sample) / n
    s = math.sqrt(sum((x - x_bar)**2 for x in sample) / (n - 1))

    z = (x_bar - mu) / (sigma / math.sqrt(n))
    t = (x_bar - mu) / (s / math.sqrt(n))

    if abs(z) > 2:
        z_count += 1
    if abs(t) > 2:
        t_count += 1

print(f"P(|Z| > 2) = {z_count/N_experiments:.4f} (expected ~0.046)")
print(f"P(|T| > 2) with df=9 = {t_count/N_experiments:.4f} (expected ~0.077)")
print(f"T has heavier tails: {t_count/z_count:.2f}x more extreme values")
```

## Connection to CS / Games / AI

- **A/B testing** — "is the difference in means real?" requires knowing the sampling distribution of $\bar{X}_A - \bar{X}_B$
- **Mini-batch SGD** — the gradient from a mini-batch is a sample mean; its SE determines training stability
- **Ensemble methods** — averaging $n$ models reduces variance by $1/n$ (same $1/\sqrt{n}$ principle)
- **Monte Carlo estimation** — error bars on Monte Carlo estimates use the standard error
- **Bootstrap** — resampling to empirically estimate the sampling distribution of any statistic

## Check Your Understanding

1. **Pen & paper:** A population has $\mu = 50$, $\sigma = 12$.  For $n = 16$, find the standard error.  Find $P(\bar{X} > 53)$.
2. **Pen & paper:** You want the standard error to be at most 1.0 with $\sigma = 20$.  What minimum sample size do you need?
3. **Pen & paper:** With $n = 5$ observations from a normal population with $\sigma^2 = 25$, what is $\text{Var}(S^2)$?
4. **Think about it:** Why do we divide by $n-1$ instead of $n$ in the sample variance formula?  What goes wrong if we divide by $n$?
