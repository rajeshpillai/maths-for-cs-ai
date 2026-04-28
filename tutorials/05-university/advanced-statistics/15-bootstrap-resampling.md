# Bootstrap and Resampling Methods

## Intuition

You have one sample of 50 data points and want a confidence interval for
the median. There is no neat formula like there is for the mean. The
bootstrap says: treat your sample as if it *were* the population, draw
thousands of resamples (with replacement), compute the statistic on each,
and use the distribution of those statistics to build confidence intervals.
It is a universal tool that works for almost any statistic.

## Prerequisites

- Tier 14, Lesson 10 (Nonparametric Methods)
- Tier 14, Lesson 1 (Estimation Theory)

## From First Principles

### The Bootstrap Principle

The empirical distribution $\hat{F}$ (placing weight $1/n$ on each observed
data point) is the best nonparametric estimate of the true distribution $F$.

**Plug-in principle:** If $\theta = T(F)$ is a functional of the true
distribution, estimate it by $\hat{\theta} = T(\hat{F})$.

**Bootstrap algorithm:**

1. From data $x_1, \ldots, x_n$, draw a bootstrap sample $x_1^*, \ldots, x_n^*$
   by sampling with replacement.
2. Compute the statistic: $\hat{\theta}^* = T(x_1^*, \ldots, x_n^*)$.
3. Repeat $B$ times (e.g., $B = 10000$).
4. The distribution of $\hat{\theta}^*_1, \ldots, \hat{\theta}^*_B$ approximates
   the sampling distribution of $\hat{\theta}$.

### Pen & Paper Example

Data: $\{2, 4, 6, 8\}$. Statistic: sample mean.

Three bootstrap samples (of many):
- Resample 1: $\{4, 4, 8, 2\} \to \bar{x}^* = 4.5$
- Resample 2: $\{6, 6, 2, 8\} \to \bar{x}^* = 5.5$
- Resample 3: $\{2, 8, 8, 6\} \to \bar{x}^* = 6.0$

Original mean: $\bar{x} = 5.0$. The spread of bootstrap means tells us
about the uncertainty of $\bar{x}$.

### Bootstrap Confidence Intervals

**Percentile method:** Use quantiles of bootstrap distribution directly.

$$CI_{1-\alpha} = [\hat{\theta}^*_{\alpha/2}, \hat{\theta}^*_{1-\alpha/2}]$$

For 95% CI: take the 2.5th and 97.5th percentiles of $B$ bootstrap statistics.

**BCa (Bias-Corrected and Accelerated):** Adjusts for bias and skewness.
More accurate but more complex.

### Bootstrap Standard Error

$$\text{SE}_{\text{boot}} = \sqrt{\frac{1}{B-1}\sum_{b=1}^{B}(\hat{\theta}^*_b - \bar{\hat{\theta}}^*)^2}$$

This estimates the standard error of *any* statistic without needing a
formula.

### Permutation Testing (Review)

While bootstrap resamples *with* replacement from one sample, permutation
tests shuffle labels *without* replacement between groups. They test a
specific null hypothesis (e.g., two groups have the same distribution),
whereas bootstrap estimates a parameter's distribution.

### When Bootstrap Fails

- Very small samples ($n < 10$): the empirical distribution is a poor
  approximation of $F$.
- Heavy-tailed distributions: the bootstrap can underestimate tail
  probabilities.
- Non-i.i.d. data (time series): requires block bootstrap variants.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)

# Original sample
data = np.random.exponential(5, 30)
original_median = np.median(data)

# Bootstrap
B = 10000
boot_medians = np.zeros(B)
for b in range(B):
    resample = np.random.choice(data, size=len(data), replace=True)
    boot_medians[b] = np.median(resample)

# Confidence interval (percentile method)
ci_low, ci_high = np.percentile(boot_medians, [2.5, 97.5])

fig, axes = plt.subplots(1, 2, figsize=(13, 5))

# Original data
axes[0].hist(data, bins=15, alpha=0.7, color='steelblue', edgecolor='black')
axes[0].axvline(original_median, color='red', linestyle='--', lw=2,
                label=f'Sample median = {original_median:.2f}')
axes[0].set_xlabel('Value')
axes[0].set_ylabel('Count')
axes[0].set_title('Original Sample (Exponential)')
axes[0].legend()

# Bootstrap distribution
axes[1].hist(boot_medians, bins=60, density=True, alpha=0.7,
             color='#99cc99', edgecolor='black')
axes[1].axvline(original_median, color='red', linestyle='--', lw=2,
                label=f'Sample median = {original_median:.2f}')
axes[1].axvline(ci_low, color='orange', linestyle=':', lw=2,
                label=f'95% CI: [{ci_low:.2f}, {ci_high:.2f}]')
axes[1].axvline(ci_high, color='orange', linestyle=':', lw=2)
axes[1].set_xlabel('Bootstrap Median')
axes[1].set_ylabel('Density')
axes[1].set_title(f'Bootstrap Distribution of Median (B={B})')
axes[1].legend(fontsize=9)

plt.tight_layout()
plt.savefig('bootstrap_distribution.png', dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np
from scipy import stats

np.random.seed(42)

# Step 1: Generate sample
data = np.random.exponential(5, 30)
print(f"Sample size: {len(data)}")
print(f"Sample mean: {np.mean(data):.3f}")
print(f"Sample median: {np.median(data):.3f}")

# Step 2: Bootstrap for median
B = 10000
boot_medians = np.zeros(B)
boot_means = np.zeros(B)

for b in range(B):
    resample = np.random.choice(data, size=len(data), replace=True)
    boot_medians[b] = np.median(resample)
    boot_means[b] = np.mean(resample)

# Step 3: Bootstrap standard errors
se_median = np.std(boot_medians, ddof=1)
se_mean = np.std(boot_means, ddof=1)
print(f"\nBootstrap SE of median: {se_median:.3f}")
print(f"Bootstrap SE of mean:   {se_mean:.3f}")
print(f"Analytical SE of mean:  {np.std(data, ddof=1)/np.sqrt(len(data)):.3f}")

# Step 4: Confidence intervals
ci_percentile = np.percentile(boot_medians, [2.5, 97.5])
print(f"\n95% CI for median (percentile): [{ci_percentile[0]:.3f}, {ci_percentile[1]:.3f}]")

ci_mean = np.percentile(boot_means, [2.5, 97.5])
print(f"95% CI for mean (percentile):   [{ci_mean[0]:.3f}, {ci_mean[1]:.3f}]")

# Step 5: Bootstrap for correlation
print("\n--- Bootstrap for Correlation ---")
x = np.random.normal(0, 1, 40)
y = 0.5 * x + np.random.normal(0, 1, 40)
r_obs = np.corrcoef(x, y)[0, 1]

boot_corrs = np.zeros(B)
for b in range(B):
    idx = np.random.choice(len(x), size=len(x), replace=True)
    boot_corrs[b] = np.corrcoef(x[idx], y[idx])[0, 1]

ci_corr = np.percentile(boot_corrs, [2.5, 97.5])
print(f"Observed r: {r_obs:.3f}")
print(f"Bootstrap SE: {np.std(boot_corrs, ddof=1):.3f}")
print(f"95% CI: [{ci_corr[0]:.3f}, {ci_corr[1]:.3f}]")

# Step 6: Permutation test
print("\n--- Permutation Test ---")
a = np.array([5.1, 6.3, 7.2, 4.8, 5.9])
b_grp = np.array([3.2, 4.1, 3.8, 2.9, 4.5])
obs_diff = np.mean(a) - np.mean(b_grp)

combined = np.concatenate([a, b_grp])
n_perms = 10000
perm_diffs = np.zeros(n_perms)
for i in range(n_perms):
    perm = np.random.permutation(combined)
    perm_diffs[i] = np.mean(perm[:5]) - np.mean(perm[5:])

p_perm = np.mean(np.abs(perm_diffs) >= np.abs(obs_diff))
print(f"Observed diff: {obs_diff:.3f}")
print(f"Permutation p-value: {p_perm:.4f}")
```

## Connection to CS / Games / AI / Business / Industry

- **ML Model Uncertainty:** Bootstrap aggregating (bagging) — including
  Random Forests — trains models on bootstrap samples to reduce variance.
- **Confidence Intervals for Any Metric:** Bootstrap works for AUC, F1,
  precision@k, or any custom metric where no analytical formula exists.
- **A/B Testing:** Bootstrap and permutation tests provide distribution-free
  inference for complex metrics (e.g., revenue per user, which is zero-
  inflated and skewed).
- **Game Analytics:** Estimating confidence intervals for median session
  length, percentile-based engagement scores, or any non-standard metric.
- **Bridge / aviation fatigue testing at Boeing / Airbus:** bootstrap
  estimates of failure CDFs and S-N (stress-cycles) curves are required
  for ASTM E739 and ISO 12107 fatigue-life certification, since coupon
  test counts are small and failure-time distributions unknown.
- **Pension and actuarial reserves at Mercer / Willis Towers Watson:**
  bootstrap CIs on mortality-improvement scales (the SOA's MP-2021
  scale) feed pension liability estimates that satisfy ASOP 35
  reasonableness tests.
- **Hedge-fund risk management:** bootstrap and block-bootstrap CIs on
  Sharpe ratio, max drawdown, and tail-VaR are the SEC- and CFTC-
  acceptable approach when return distributions violate normality —
  used at AQR, Citadel, and Two Sigma.
- **Hydrology / FEMA flood maps:** bootstrap estimates the uncertainty
  on the 100-year flood quantile from limited stream-gauge records,
  driving zoning rules at the Army Corps of Engineers.
- **Genomics at the Broad Institute:** bootstrap is the standard
  branch-support measure on phylogenetic trees in RAxML and IQ-TREE,
  reported in essentially every published evolutionary-tree figure.

## Check Your Understanding

1. Bootstrap the 75th percentile of $\{1, 3, 5, 7, 9, 11\}$ with
   $B = 5000$. Report the 95% confidence interval.

2. Why must bootstrap sampling be *with replacement*? What happens if
   you sample without replacement?

3. Implement bootstrap for the standard deviation and compare the
   bootstrap SE to the analytical formula
   $\text{SE}(s) \approx \sigma / \sqrt{2(n-1)}$.
