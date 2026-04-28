# Hypothesis Testing — z-test, t-test, Chi-Squared

## Intuition

You run an A/B test: version B has a 2% higher click rate.  Is that real or
just random noise?  **Hypothesis testing** gives a rigorous answer.  You
assume the "null hypothesis" (no real difference), compute how unlikely the
data would be under that assumption, and reject if it's too unlikely.

## Prerequisites

- Tier 4, Lesson 6: Continuous Distributions (Gaussian)
- Tier 4, Lesson 7: Central Limit Theorem

## From First Principles

### The framework

1. **Null hypothesis $H_0$:** "There is no effect" (e.g., mean = 50)
2. **Alternative $H_1$:** "There is an effect" (e.g., mean ≠ 50)
3. **Test statistic:** Quantify how far the data is from $H_0$
4. **p-value:** Probability of seeing data this extreme if $H_0$ is true
5. **Decision:** If p-value < significance level $\alpha$ (usually 0.05), reject $H_0$

### z-test (known population variance)

$$z = \frac{\bar{x} - \mu_0}{\sigma / \sqrt{n}}$$

**Pen & paper:** A factory claims mean weight = 500g ($\sigma = 10$g).  Sample of 25 gives $\bar{x} = 503$.

$z = \frac{503 - 500}{10/\sqrt{25}} = \frac{3}{2} = 1.5$

From z-table: $P(Z > 1.5) = 0.0668$.  Two-tailed: $p = 0.134$.

$0.134 > 0.05$ → do not reject $H_0$.  Insufficient evidence.

### t-test (unknown variance, small sample)

$$t = \frac{\bar{x} - \mu_0}{s / \sqrt{n}}$$

Uses the t-distribution ($n-1$ degrees of freedom) instead of normal.

For large $n$ ($> 30$), t ≈ z.

### Chi-squared test (categorical data)

$$\chi^2 = \sum \frac{(O_i - E_i)^2}{E_i}$$

$O_i$ = observed count, $E_i$ = expected count under $H_0$.

**Pen & paper:** A die is rolled 60 times.  Expected: 10 per face.

| Face | $O$ | $E$ | $(O-E)^2/E$ |
|------|-----|-----|-------------|
| 1 | 8 | 10 | 0.4 |
| 2 | 12 | 10 | 0.4 |
| 3 | 11 | 10 | 0.1 |
| 4 | 7 | 10 | 0.9 |
| 5 | 13 | 10 | 0.9 |
| 6 | 9 | 10 | 0.1 |

$\chi^2 = 2.8$, degrees of freedom = $6 - 1 = 5$.

Critical value at $\alpha = 0.05$: $\chi^2_{0.05, 5} = 11.07$.

$2.8 < 11.07$ → do not reject.  The die appears fair.

### Type I and Type II errors

| | $H_0$ true | $H_0$ false |
|-|-----------|------------|
| Reject $H_0$ | **Type I** (false positive, prob = $\alpha$) | Correct |
| Don't reject | Correct | **Type II** (false negative, prob = $\beta$) |

**Power** = $1 - \beta$ = probability of detecting a real effect.

### Confidence intervals

A 95% confidence interval for the mean:

$$\bar{x} \pm z_{0.025} \cdot \frac{\sigma}{\sqrt{n}} = \bar{x} \pm 1.96 \cdot \frac{\sigma}{\sqrt{n}}$$

**Pen & paper:** $\bar{x} = 503, \sigma = 10, n = 25$:

$503 \pm 1.96 \times 2 = 503 \pm 3.92 = [499.08, 506.92]$

500 is inside the interval → consistent with not rejecting $H_0$.

## Python Verification

```python
# ── Hypothesis Testing ──────────────────────────────────────
import math

# z-test
print("=== z-test: factory weight ===")
x_bar, mu0, sigma, n = 503, 500, 10, 25
z = (x_bar - mu0) / (sigma / math.sqrt(n))
print(f"z = {z:.2f}")

# Approximate p-value using normal CDF (Abramowitz & Stegun approx)
def norm_cdf(x):
    """Approximation of standard normal CDF."""
    t = 1 / (1 + 0.2316419 * abs(x))
    d = 0.3989422804 * math.exp(-x*x/2)
    p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
    return 1 - p if x > 0 else p

p_one_tail = 1 - norm_cdf(z)
p_two_tail = 2 * p_one_tail
print(f"p-value (two-tailed) ≈ {p_two_tail:.4f}")
print(f"Reject H₀ at α=0.05? {'Yes' if p_two_tail < 0.05 else 'No'}")

# Confidence interval
print(f"\n=== 95% Confidence interval ===")
margin = 1.96 * sigma / math.sqrt(n)
print(f"CI = ({x_bar - margin:.2f}, {x_bar + margin:.2f})")
print(f"μ₀={mu0} inside CI? {x_bar - margin <= mu0 <= x_bar + margin}")

# Chi-squared test
print(f"\n=== Chi-squared: fair die? ===")
observed = [8, 12, 11, 7, 13, 9]
expected = [10] * 6
chi2 = sum((o - e)**2 / e for o, e in zip(observed, expected))
df = len(observed) - 1
print(f"χ² = {chi2:.1f}, df = {df}")
print(f"Critical value (α=0.05, df=5) = 11.07")
print(f"Reject? {'Yes' if chi2 > 11.07 else 'No'}")

# A/B test simulation
print(f"\n=== A/B test: conversion rates ===")
import random
random.seed(42)
# Group A: 1000 users, 5% conversion
# Group B: 1000 users, 7% conversion
nA, nB = 1000, 1000
pA, pB = 0.05, 0.07
xA = sum(1 for _ in range(nA) if random.random() < pA)
xB = sum(1 for _ in range(nB) if random.random() < pB)
pA_hat = xA / nA
pB_hat = xB / nB
p_pool = (xA + xB) / (nA + nB)
se = math.sqrt(p_pool * (1 - p_pool) * (1/nA + 1/nB))
z_ab = (pB_hat - pA_hat) / se
p_val = 2 * (1 - norm_cdf(abs(z_ab)))
print(f"A: {xA}/{nA} = {pA_hat:.3f}, B: {xB}/{nB} = {pB_hat:.3f}")
print(f"z = {z_ab:.2f}, p = {p_val:.4f}")
print(f"Significant at α=0.05? {'Yes' if p_val < 0.05 else 'No'}")
```

## Visualisation — p-value as a tail-area probability

A **p-value** is the *probability of seeing data this extreme or more
extreme, assuming the null hypothesis is true*. The plot makes that
literal: shade the tail of the null distribution that's beyond the
observed test statistic.

```python
# ── Visualising hypothesis testing and the p-value ──────────
import numpy as np
import matplotlib.pyplot as plt

# Standard normal PDF helper.
def normal_pdf(z):
    return np.exp(-0.5 * z * z) / np.sqrt(2 * np.pi)

# Pretend we observed a z-statistic of 1.85 (one-sided test).
# Rejection region for α = 0.05 (two-sided) is |z| > 1.96.
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

z = np.linspace(-4, 4, 600)
pdf = normal_pdf(z)

# (1) Two-sided test: shade both tails beyond ±1.96.
ax = axes[0]
ax.plot(z, pdf, color="tab:blue", lw=2, label="null distribution N(0,1)")
ax.fill_between(z, pdf, where=z > 1.96,  alpha=0.4, color="tab:red",
                label="α = 0.05 rejection (each tail = 2.5%)")
ax.fill_between(z, pdf, where=z < -1.96, alpha=0.4, color="tab:red")
ax.axvline( 1.96, color="tab:red", lw=1.5, linestyle="--")
ax.axvline(-1.96, color="tab:red", lw=1.5, linestyle="--")
ax.text( 2.05, 0.05, "z = +1.96", color="tab:red", fontsize=9, rotation=90)
ax.text(-1.85, 0.05, "z = -1.96", color="tab:red", fontsize=9, rotation=90)
ax.set_xlabel("z statistic"); ax.set_ylabel("density")
ax.set_title("Two-sided test, α = 0.05\n(reject if |z| > 1.96)")
ax.legend(loc="upper right", fontsize=9); ax.grid(True, alpha=0.3)

# (2) Observed z = 1.85 → p-value = tail area beyond 1.85 (×2 for two-sided).
ax = axes[1]
z_obs = 1.85
ax.plot(z, pdf, color="tab:blue", lw=2, label="null distribution")
ax.fill_between(z, pdf, where=z > z_obs, alpha=0.4, color="tab:red",
                label=f"upper-tail area beyond z = {z_obs}")
ax.fill_between(z, pdf, where=z < -z_obs, alpha=0.4, color="tab:red",
                label="(plus mirror — two-sided p)")
ax.axvline(z_obs, color="black", lw=2, label=f"observed z = {z_obs}")

# Compute p-value: 2 * P(Z > 1.85) for two-sided test.
def Phi(z, n=200_000):
    """Approximate Φ(z) by trapezoidal integration of the standard-normal PDF."""
    if z >= 0:
        zs = np.linspace(0, z, n); return 0.5 + np.trapezoid(normal_pdf(zs), zs)
    else:
        zs = np.linspace(z, 0, n); return 0.5 - np.trapezoid(normal_pdf(zs), zs)

p_val = 2 * (1 - Phi(z_obs))
ax.set_xlabel("z statistic"); ax.set_ylabel("density")
ax.set_title(f"Observed z = {z_obs}, two-sided p ≈ {p_val:.3f}\n"
             f"({'reject' if p_val < 0.05 else 'fail to reject'} H₀ at α = 0.05)")
ax.legend(loc="upper right", fontsize=9); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Print the formal interpretation.
print(f"Observed z = {z_obs}")
print(f"Two-sided p-value = 2 · P(Z > {z_obs}) = {p_val:.4f}")
print()
print("Interpretation:")
print(f"  IF the null hypothesis were true (no effect), the chance of seeing")
print(f"  |z| ≥ {z_obs} purely by random sampling is about {p_val*100:.2f}%.")
print(f"  At α = 0.05, that's {'unlikely enough to reject' if p_val < 0.05 else 'not low enough to reject'} H₀.")
```

**The two warnings every analyst should remember:**

- **A p-value is *not* "the probability the null is true".** It's the
  probability of seeing data at least this extreme *under the null*.
  Confusing the two is the most common statistical error in journals
  and headlines.
- **Statistical significance ≠ practical significance.** With a huge
  sample size, *any* tiny effect can become "statistically
  significant". Always look at the **effect size** (the actual
  difference), not just the p-value. This is why the ASA's 2016
  statement urges replacing p-value-only reporting with **confidence
  intervals on effect sizes**.

## Connection to CS / Games / AI / Business / Industry

- **A/B testing** — every tech company uses hypothesis tests to evaluate feature changes
- **Model evaluation** — "is model B significantly better than model A?"
- **Fairness auditing** — chi-squared tests for demographic bias in predictions
- **Quality assurance** — manufacturing defect rates, server error rates
- **Scientific computing** — p-values in bioinformatics, drug trials
- **Bayesian alternative** — Bayesian A/B tests compute $P(B > A | \text{data})$ directly (Tier 4-02)

## Check Your Understanding

1. **Pen & paper:** Sample of 36 students has mean score 72 ($\sigma = 12$).  Test $H_0: \mu = 75$ at $\alpha = 0.05$.
2. **Pen & paper:** A coin is flipped 100 times, getting 60 heads.  Is it fair?  ($H_0: p = 0.5$, use z-test for proportions.)
3. **Think about it:** Why is a p-value of 0.04 not "proof" that $H_0$ is false?  What does it actually mean?
