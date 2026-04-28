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

## Visualisation — Population vs sampling distribution

A **sampling distribution** is *the distribution of a statistic* (like
the sample mean) when you imagine repeating the experiment many times.
The plot below shows why this distinction matters: the population can
be wide and skewed, but the *sample mean* is much narrower and
approximately normal.

```python
# ── Visualising the sampling distribution of the mean ───────
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(42)

# Population: a deliberately ugly mixture (two modes), so the contrast
# with a normal sampling distribution is dramatic.
def population_sample(size):
    component = rng.random(size) < 0.6
    return np.where(component,
                    rng.normal(loc=2.0, scale=1.0, size=size),
                    rng.normal(loc=7.0, scale=1.0, size=size))

pop_mean = 0.6 * 2.0 + 0.4 * 7.0           # μ = 4.0
pop_std  = np.sqrt(0.6 * (1**2 + (2 - pop_mean)**2)
                 + 0.4 * (1**2 + (7 - pop_mean)**2))   # ≈ 2.6

fig, axes = plt.subplots(1, 3, figsize=(15, 4.8))

# (1) The population itself — clearly bimodal.
ax = axes[0]
big_sample = population_sample(50_000)
ax.hist(big_sample, bins=80, density=True, color="tab:red", alpha=0.7,
        edgecolor="darkred")
ax.axvline(pop_mean, color="black", lw=2, linestyle="--",
           label=f"population mean μ = {pop_mean:.2f}")
ax.set_title("Population (bimodal mixture):\nNOT normal at all")
ax.set_xlabel("x"); ax.set_ylabel("density")
ax.legend(); ax.grid(True, alpha=0.3)

# (2) Sampling distribution of the MEAN with n = 30.
# Repeat the experiment NUM_REPS times, each time computing the mean
# of n samples; plot the histogram of those means.
ax = axes[1]
n = 30
NUM_REPS = 20_000
sample_means = np.array([population_sample(n).mean() for _ in range(NUM_REPS)])

# CLT-predicted normal: N(μ, σ²/n)
predicted_se = pop_std / np.sqrt(n)
xs = np.linspace(pop_mean - 4*predicted_se, pop_mean + 4*predicted_se, 400)
pdf = np.exp(-0.5 * ((xs - pop_mean) / predicted_se) ** 2) / (predicted_se * np.sqrt(2 * np.pi))

ax.hist(sample_means, bins=60, density=True, color="tab:blue", alpha=0.75,
        edgecolor="navy", label="observed sample means")
ax.plot(xs, pdf, color="red", lw=2,
        label=f"N(μ, σ²/n)\nSE = σ/√n = {predicted_se:.3f}")
ax.axvline(pop_mean, color="black", lw=1.5, linestyle="--", alpha=0.6)
ax.set_title(f"Sampling distribution of $\\bar X$ (n = {n})\napproximately normal — that's CLT")
ax.set_xlabel(r"$\bar X$"); ax.set_ylabel("density")
ax.legend(fontsize=9); ax.grid(True, alpha=0.3)

# (3) Standard error shrinks like 1/√n. Plot SE for n = 5..200 and
# overlay the empirical SE measured by simulation at four sample sizes.
ax = axes[2]
ns = np.arange(5, 201)
ax.plot(ns, pop_std / np.sqrt(ns), color="black", lw=2,
        label=r"theory: SE = $\sigma/\sqrt{n}$")
emp_ns = [10, 30, 100, 200]
emp_se = [np.array([population_sample(n).mean() for _ in range(5000)]).std()
          for n in emp_ns]
ax.scatter(emp_ns, emp_se, color="tab:red", zorder=5, s=80,
           label="simulated SE (5,000 reps each)")
ax.set_title("Standard error shrinks as $1/\\sqrt{n}$\n→ 4× the data only halves the error")
ax.set_xlabel("sample size n"); ax.set_ylabel("standard error of $\\bar X$")
ax.legend(); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Print the comparison table — picture and numbers in lockstep.
print(f"Population: μ = {pop_mean:.4f}, σ = {pop_std:.4f}")
print(f"\n{'n':>5}  {'predicted SE = σ/√n':>22}  {'empirical SE':>15}")
for n in [5, 10, 30, 100, 1000]:
    predicted = pop_std / np.sqrt(n)
    empirical = np.array([population_sample(n).mean() for _ in range(2000)]).std()
    print(f"  {n:<3}  {predicted:>20.4f}  {empirical:>15.4f}")
```

**Three things to internalise:**

- **Population ≠ sampling distribution.** The leftmost panel (the
  population) is *very* not-normal. The middle panel (the *distribution
  of sample means*) is essentially a bell curve. They live in different
  conceptual spaces — population is "what one observation looks like";
  sampling distribution is "what an estimator looks like across repeated
  experiments."
- **The standard error is $\sigma / \sqrt n$.** This is the single most
  important number in applied statistics. It governs A/B-test sample
  sizes, polling precision, mini-batch SGD noise, and ensemble model
  variance reduction.
- **More data has diminishing returns.** Going from $n = 100$ to $n =
  400$ only halves the SE. That's why doubling a survey doesn't double
  its precision — and why ensembles need *exponentially* more models to
  produce noticeably tighter predictions.

## Connection to CS / Games / AI / Business / Industry

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
