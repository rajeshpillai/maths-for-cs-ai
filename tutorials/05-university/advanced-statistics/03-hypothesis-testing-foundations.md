# Hypothesis Testing Foundations

## Intuition

A game studio claims their new matchmaking algorithm gives 50% win rates.
You observe 100 matches and see 62 wins. Is 62 out of 100 enough evidence
to say the algorithm is *not* fair, or could it be random luck? Hypothesis
testing gives you a principled framework to answer "is this result real or
just noise?" using probability.

## Prerequisites

- Tier 4, Lesson 15 (Distributions and the Normal/Gaussian)
- Tier 4, Lessons 1-5 (Probability fundamentals, Expectation, Variance)

## From First Principles

### The Framework

1. **Null hypothesis $H_0$:** The default claim (e.g., $\mu = 50$, the coin
   is fair, the drug has no effect). We assume $H_0$ is true until evidence
   says otherwise.

2. **Alternative hypothesis $H_1$ (or $H_a$):** What we suspect instead.
   - Two-sided: $H_1: \mu \neq 50$
   - One-sided: $H_1: \mu > 50$ or $H_1: \mu < 50$

3. **Test statistic:** A number computed from the data that measures how far
   the sample result is from what $H_0$ predicts.

4. **p-value:** The probability of observing a test statistic *at least as
   extreme* as the one computed, assuming $H_0$ is true.

5. **Significance level $\alpha$:** A threshold (commonly 0.05). If
   $p \leq \alpha$, reject $H_0$.

### Type I and Type II Errors

|                  | $H_0$ true        | $H_0$ false       |
|------------------|--------------------|--------------------|
| **Reject $H_0$**| Type I error ($\alpha$) | Correct (Power) |
| **Fail to reject**| Correct          | Type II error ($\beta$) |

- **Type I error rate** = $\alpha$ = P(reject $H_0$ | $H_0$ true)
- **Type II error rate** = $\beta$ = P(fail to reject $H_0$ | $H_0$ false)
- **Power** = $1 - \beta$ = P(reject $H_0$ | $H_0$ false)

### Pen & Paper Example

**Claim:** A coin is fair ($H_0: p = 0.5$). You flip 20 times, get 15 heads.

Test statistic (z-test for proportions):
$$z = \frac{\hat{p} - p_0}{\sqrt{p_0(1-p_0)/n}}
= \frac{0.75 - 0.50}{\sqrt{0.5 \cdot 0.5 / 20}}
= \frac{0.25}{\sqrt{0.0125}}
= \frac{0.25}{0.1118} = 2.236$$

For a two-sided test at $\alpha = 0.05$, the critical value is
$z_{0.025} = 1.96$.

Since $2.236 > 1.96$, we reject $H_0$. The coin appears biased.

The p-value is $2 \times P(Z > 2.236) = 2 \times 0.0127 = 0.0254$.

### Power of a Test

Power depends on:
- The true parameter value (effect size)
- Sample size $n$ (more data = more power)
- Significance level $\alpha$ (larger $\alpha$ = more power but more Type I errors)
- Variance of the data

$$\text{Power} = P\left(Z > z_{\alpha/2} - \frac{\delta}{\sigma/\sqrt{n}}\right)$$

where $\delta = |\mu_1 - \mu_0|$ is the effect size.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

fig, ax = plt.subplots(figsize=(10, 5))
x = np.linspace(-4, 8, 500)

# Null distribution: N(0, 1)
null_pdf = stats.norm.pdf(x, 0, 1)
# Alternative distribution: N(3, 1) (true effect)
alt_pdf = stats.norm.pdf(x, 3, 1)

ax.plot(x, null_pdf, 'b-', lw=2, label='$H_0$: N(0, 1)')
ax.plot(x, alt_pdf, 'r-', lw=2, label='$H_1$: N(3, 1)')

# Critical value (one-sided, alpha=0.05)
z_crit = stats.norm.ppf(0.95)
ax.axvline(z_crit, color='green', linestyle='--', lw=2, label=f'Critical value = {z_crit:.2f}')

# Shade rejection region under H0 (Type I = alpha)
x_reject = x[x >= z_crit]
ax.fill_between(x_reject, stats.norm.pdf(x_reject, 0, 1),
                alpha=0.3, color='blue', label=f'Type I (alpha = 0.05)')

# Shade Type II region under H1
x_accept = x[(x < z_crit) & (x > -1)]
ax.fill_between(x_accept, stats.norm.pdf(x_accept, 3, 1),
                alpha=0.3, color='red', label='Type II (beta)')

ax.set_xlabel('Test Statistic')
ax.set_ylabel('Density')
ax.set_title('Hypothesis Testing: Type I Error, Type II Error, and Power')
ax.legend(fontsize=9)
plt.tight_layout()
plt.savefig('hypothesis_testing_regions.png', dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np
from scipy import stats

# Step 1: Coin flip example
n = 20
heads = 15
p0 = 0.5
p_hat = heads / n

# Step 2: Compute z-statistic by hand formula
z_stat = (p_hat - p0) / np.sqrt(p0 * (1 - p0) / n)
print(f"Observed proportion: {p_hat}")
print(f"Z-statistic: {z_stat:.4f}")

# Step 3: Compute p-value (two-sided)
p_value = 2 * (1 - stats.norm.cdf(abs(z_stat)))
print(f"p-value (two-sided): {p_value:.4f}")
print(f"Reject H0 at alpha=0.05? {p_value < 0.05}")

# Step 4: Power calculation example
# True proportion is 0.7, test H0: p=0.5, alpha=0.05, n=50
p_true = 0.7
n_power = 50
alpha = 0.05
z_crit = stats.norm.ppf(1 - alpha / 2)

# Non-centrality: how far the true distribution is shifted
ncp = (p_true - p0) / np.sqrt(p0 * (1 - p0) / n_power)
power = 1 - stats.norm.cdf(z_crit - ncp) + stats.norm.cdf(-z_crit - ncp)
print(f"\nPower calculation:")
print(f"  True p = {p_true}, n = {n_power}, alpha = {alpha}")
print(f"  Power = {power:.4f}")

# Step 5: Simulate to verify
n_sim = 100000
rejections = 0
for _ in range(n_sim):
    sample = np.random.binomial(n_power, p_true)
    p_hat_sim = sample / n_power
    z_sim = (p_hat_sim - p0) / np.sqrt(p0 * (1 - p0) / n_power)
    if abs(z_sim) > z_crit:
        rejections += 1
print(f"  Simulated power = {rejections / n_sim:.4f}")
```

## Connection to CS / Games / AI / Business / Industry

- **A/B Testing:** Every tech company uses hypothesis testing to decide if
  a new feature improves user engagement, conversion, or revenue.
- **Model Comparison:** Statistical tests determine if model A is truly
  better than model B, or if the difference is just noise.
- **Anomaly Detection:** Flagging network intrusions or fraudulent
  transactions by testing if observations deviate from the null model.
- **Game Balance:** Testing whether a new weapon, map, or character has
  a statistically significant effect on win rates.

## Check Your Understanding

1. A drug trial has 200 patients. The old drug has a 40% success rate.
   The new drug succeeds on 96 out of 200 patients (48%). Perform a
   one-sided z-test at $\alpha = 0.05$ by hand.

2. Explain why "failing to reject $H_0$" is NOT the same as "accepting
   $H_0$."

3. If you increase $\alpha$ from 0.01 to 0.10, what happens to Type I
   error rate, Type II error rate, and power?
