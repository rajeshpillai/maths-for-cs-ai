# Z-Test and T-Test

## Intuition

You measure the response times of a web server after a code change. Did
the change actually speed things up, or is the difference just random
variation? The z-test and t-test answer this by comparing your sample
statistics against what you would expect under the null hypothesis. The
key difference: use the z-test when you know the population variance;
use the t-test when you must estimate it from the sample (which is almost
always the case in practice).

## Prerequisites

- Tier 14, Lesson 3 (Hypothesis Testing Foundations)
- Tier 4, Lesson 15 (Normal Distribution)

## From First Principles

### One-Sample Z-Test

**When:** Population variance $\sigma^2$ is known, sample size is large.

$$z = \frac{\bar{X} - \mu_0}{\sigma / \sqrt{n}}$$

Under $H_0$, $z \sim N(0, 1)$.

### One-Sample T-Test

**When:** Population variance is unknown; estimate it with sample
standard deviation $s$.

$$t = \frac{\bar{X} - \mu_0}{s / \sqrt{n}}, \quad s = \sqrt{\frac{1}{n-1}\sum(X_i - \bar{X})^2}$$

Under $H_0$, $t \sim t_{n-1}$ (Student's t-distribution with $n-1$
degrees of freedom).

The t-distribution has heavier tails than the normal, reflecting the
extra uncertainty from estimating $\sigma$.

### Pen & Paper Example: One-Sample T-Test

Data: $X = \{12, 14, 11, 13, 15\}$. Test $H_0: \mu = 10$ vs $H_1: \mu > 10$
at $\alpha = 0.05$.

Step 1: $\bar{X} = (12+14+11+13+15)/5 = 65/5 = 13$

Step 2: $s^2 = \frac{(12-13)^2 + (14-13)^2 + (11-13)^2 + (13-13)^2 + (15-13)^2}{4}$
$= \frac{1 + 1 + 4 + 0 + 4}{4} = \frac{10}{4} = 2.5$

$s = \sqrt{2.5} = 1.581$

Step 3: $t = \frac{13 - 10}{1.581 / \sqrt{5}} = \frac{3}{0.707} = 4.243$

Step 4: Degrees of freedom = $5 - 1 = 4$. Critical value $t_{0.05, 4} = 2.132$.

Since $4.243 > 2.132$, reject $H_0$. Strong evidence that $\mu > 10$.

### Two-Sample T-Test (Independent)

Compare means of two groups with unknown (possibly unequal) variances.

**Welch's t-test** (does not assume equal variances):

$$t = \frac{\bar{X}_1 - \bar{X}_2}{\sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}}$$

Degrees of freedom (Welch-Satterthwaite):
$$\nu = \frac{\left(\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}\right)^2}{\frac{(s_1^2/n_1)^2}{n_1-1} + \frac{(s_2^2/n_2)^2}{n_2-1}}$$

### Paired T-Test

When observations are naturally paired (e.g., before/after measurements
on the same subjects), compute differences $D_i = X_{i,\text{after}} - X_{i,\text{before}}$
and perform a one-sample t-test on $D$:

$$t = \frac{\bar{D}}{s_D / \sqrt{n}}$$

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

fig, ax = plt.subplots(figsize=(10, 5))
x = np.linspace(-5, 5, 500)

# Normal distribution
ax.plot(x, stats.norm.pdf(x), 'k-', lw=2, label='Normal (z)')

# t-distributions with various df
for df in [2, 5, 30]:
    ax.plot(x, stats.t.pdf(x, df), '--', lw=1.5, label=f't (df={df})')

# Shade critical region for df=5, two-sided alpha=0.05
t_crit = stats.t.ppf(0.975, df=5)
x_right = x[x >= t_crit]
x_left = x[x <= -t_crit]
ax.fill_between(x_right, stats.t.pdf(x_right, 5), alpha=0.3, color='red',
                label=f'Rejection region (df=5, alpha=0.05)')
ax.fill_between(x_left, stats.t.pdf(x_left, 5), alpha=0.3, color='red')

ax.set_xlabel('t')
ax.set_ylabel('Density')
ax.set_title('T-Distribution vs Normal: Heavier Tails Mean Wider Critical Regions')
ax.legend(fontsize=9)
plt.tight_layout()
plt.savefig('t_distribution_critical.png', dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np
from scipy import stats

# ── One-Sample T-Test (by hand, then scipy) ──────────────
data = np.array([12, 14, 11, 13, 15])
mu_0 = 10

xbar = np.mean(data)
s = np.std(data, ddof=1)
n = len(data)
t_stat = (xbar - mu_0) / (s / np.sqrt(n))
df = n - 1
p_value = 1 - stats.t.cdf(t_stat, df)  # one-sided

print("=== One-Sample T-Test ===")
print(f"x_bar = {xbar}, s = {s:.4f}, n = {n}")
print(f"t = {t_stat:.4f}, df = {df}")
print(f"p-value (one-sided) = {p_value:.4f}")

# Verify with scipy
t_scipy, p_scipy = stats.ttest_1samp(data, mu_0)
print(f"scipy: t = {t_scipy:.4f}, p (two-sided) = {p_scipy:.4f}")

# ── Two-Sample T-Test ────────────────────────────────────
print("\n=== Two-Sample T-Test (Welch) ===")
group_a = np.array([23, 25, 28, 22, 27])
group_b = np.array([30, 33, 29, 35, 31])

xbar1, xbar2 = np.mean(group_a), np.mean(group_b)
s1, s2 = np.std(group_a, ddof=1), np.std(group_b, ddof=1)
n1, n2 = len(group_a), len(group_b)

t_welch = (xbar1 - xbar2) / np.sqrt(s1**2/n1 + s2**2/n2)
# Welch-Satterthwaite df
num = (s1**2/n1 + s2**2/n2)**2
den = (s1**2/n1)**2/(n1-1) + (s2**2/n2)**2/(n2-1)
df_welch = num / den

print(f"Group A: mean={xbar1}, s={s1:.3f}")
print(f"Group B: mean={xbar2}, s={s2:.3f}")
print(f"t = {t_welch:.4f}, df = {df_welch:.2f}")

t_sc, p_sc = stats.ttest_ind(group_a, group_b, equal_var=False)
print(f"scipy: t = {t_sc:.4f}, p = {p_sc:.4f}")

# ── Paired T-Test ────────────────────────────────────────
print("\n=== Paired T-Test ===")
before = np.array([200, 210, 195, 220, 205])
after  = np.array([185, 195, 190, 200, 195])
diffs = after - before

t_paired = np.mean(diffs) / (np.std(diffs, ddof=1) / np.sqrt(len(diffs)))
print(f"Differences: {diffs}, mean = {np.mean(diffs):.1f}")
print(f"t = {t_paired:.4f}")

t_sp, p_sp = stats.ttest_rel(before, after)
print(f"scipy: t = {t_sp:.4f}, p = {p_sp:.4f}")
```

## Connection to CS / Games / AI / Business / Industry

- **A/B Testing:** Two-sample t-tests compare metrics between control and
  treatment groups in product experiments.
- **Performance Benchmarking:** Paired t-tests compare the same algorithm's
  runtime before and after an optimisation.
- **ML Model Evaluation:** Testing if the accuracy difference between two
  models is statistically significant (paired t-test on cross-validation folds).
- **Game Analytics:** Testing if player retention differs between matchmaking
  algorithms.

## Check Your Understanding

1. Perform a two-sample t-test by hand on Group A = {5, 7, 9} and
   Group B = {8, 10, 12}. Use $\alpha = 0.05$, two-sided.

2. When is a paired t-test more powerful than an independent two-sample
   t-test? Why?

3. As $n \to \infty$, what happens to the t-distribution? Verify in
   Python by comparing $t_{1000}$ to $N(0,1)$.
