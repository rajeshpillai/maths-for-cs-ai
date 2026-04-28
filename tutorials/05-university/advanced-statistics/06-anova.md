# ANOVA (Analysis of Variance)

## Intuition

You test three different rendering engines on frame rate. Engine A averages
58 fps, Engine B averages 62 fps, Engine C averages 60 fps. Are these
differences real or just noise? You could run three separate t-tests (A vs B,
A vs C, B vs C), but that inflates your false positive rate. ANOVA tests all
groups simultaneously by comparing the variance *between* groups to the
variance *within* groups.

## Prerequisites

- Tier 14, Lesson 4 (Z-Test and T-Test)
- Tier 14, Lesson 3 (Hypothesis Testing Foundations)

## From First Principles

### The Key Idea

If all groups have the same mean, then the variation between group means
should be similar to the variation within groups. If the between-group
variation is much larger, at least one group differs.

### Notation

- $k$ = number of groups
- $n_j$ = number of observations in group $j$
- $N = \sum n_j$ = total observations
- $\bar{X}_j$ = mean of group $j$
- $\bar{X}$ = grand mean (mean of all observations)

### Decomposition of Variance

$$\underbrace{\sum_{j=1}^{k}\sum_{i=1}^{n_j}(X_{ij} - \bar{X})^2}_{\text{SST (Total)}}
= \underbrace{\sum_{j=1}^{k} n_j(\bar{X}_j - \bar{X})^2}_{\text{SSB (Between)}}
+ \underbrace{\sum_{j=1}^{k}\sum_{i=1}^{n_j}(X_{ij} - \bar{X}_j)^2}_{\text{SSW (Within)}}$$

### Mean Squares and F-Statistic

$$\text{MSB} = \frac{\text{SSB}}{k - 1}, \quad
\text{MSW} = \frac{\text{SSW}}{N - k}$$

$$F = \frac{\text{MSB}}{\text{MSW}}$$

Under $H_0$ (all means equal), $F \sim F_{k-1, N-k}$.

### Pen & Paper Example

Three groups, each with 4 observations:

| Group A | Group B | Group C |
|---------|---------|---------|
| 5       | 8       | 6       |
| 7       | 9       | 7       |
| 6       | 7       | 5       |
| 6       | 8       | 6       |

Step 1: Group means
$\bar{X}_A = 24/4 = 6$, $\bar{X}_B = 32/4 = 8$, $\bar{X}_C = 24/4 = 6$

Step 2: Grand mean
$\bar{X} = (24 + 32 + 24)/12 = 80/12 = 6.667$

Step 3: SSB
$= 4(6 - 6.667)^2 + 4(8 - 6.667)^2 + 4(6 - 6.667)^2$
$= 4(0.444) + 4(1.778) + 4(0.444) = 1.778 + 7.111 + 1.778 = 10.667$

Step 4: SSW
Group A: $(5-6)^2 + (7-6)^2 + (6-6)^2 + (6-6)^2 = 1+1+0+0 = 2$
Group B: $(8-8)^2 + (9-8)^2 + (7-8)^2 + (8-8)^2 = 0+1+1+0 = 2$
Group C: $(6-6)^2 + (7-6)^2 + (5-6)^2 + (6-6)^2 = 0+1+1+0 = 2$
$\text{SSW} = 2 + 2 + 2 = 6$

Step 5: $F = \frac{10.667 / 2}{6 / 9} = \frac{5.333}{0.667} = 8.0$

$df_1 = 2$, $df_2 = 9$. Critical value $F_{0.05, 2, 9} = 4.26$.

Since $8.0 > 4.26$, reject $H_0$. At least one group mean differs.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

group_a = [5, 7, 6, 6]
group_b = [8, 9, 7, 8]
group_c = [6, 7, 5, 6]

fig, axes = plt.subplots(1, 2, figsize=(13, 5))

# Box plots
data = [group_a, group_b, group_c]
bp = axes[0].boxplot(data, labels=['A', 'B', 'C'], patch_artist=True)
colors = ['#66b3ff', '#ff9999', '#99ff99']
for patch, color in zip(bp['boxes'], colors):
    patch.set_facecolor(color)
for i, d in enumerate(data):
    x = np.random.normal(i + 1, 0.04, len(d))
    axes[0].scatter(x, d, color='black', zorder=5, s=30)
axes[0].axhline(np.mean(group_a + group_b + group_c), color='gray',
                linestyle='--', label=f'Grand mean = {np.mean(group_a+group_b+group_c):.2f}')
axes[0].set_ylabel('Value')
axes[0].set_title('Box Plots by Group')
axes[0].legend()

# F-distribution with test statistic
df1, df2 = 2, 9
x_f = np.linspace(0, 12, 300)
axes[1].plot(x_f, stats.f.pdf(x_f, df1, df2), 'b-', lw=2)
f_crit = stats.f.ppf(0.95, df1, df2)
x_reject = x_f[x_f >= f_crit]
axes[1].fill_between(x_reject, stats.f.pdf(x_reject, df1, df2),
                     alpha=0.3, color='red', label=f'Reject (F > {f_crit:.2f})')
axes[1].axvline(8.0, color='green', linestyle='--', lw=2, label='F = 8.0')
axes[1].set_xlabel('F')
axes[1].set_ylabel('Density')
axes[1].set_title(f'F-Distribution (df1={df1}, df2={df2})')
axes[1].legend()

plt.tight_layout()
plt.savefig('anova_boxplot_ftest.png', dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np
from scipy import stats

# Step 1: Data
group_a = np.array([5, 7, 6, 6])
group_b = np.array([8, 9, 7, 8])
group_c = np.array([6, 7, 5, 6])

# Step 2: Compute by hand
all_data = np.concatenate([group_a, group_b, group_c])
grand_mean = np.mean(all_data)
means = [np.mean(g) for g in [group_a, group_b, group_c]]
ns = [len(g) for g in [group_a, group_b, group_c]]

SSB = sum(n * (m - grand_mean)**2 for n, m in zip(ns, means))
SSW = sum(np.sum((g - np.mean(g))**2) for g in [group_a, group_b, group_c])
SST = np.sum((all_data - grand_mean)**2)

k = 3
N = len(all_data)
MSB = SSB / (k - 1)
MSW = SSW / (N - k)
F_stat = MSB / MSW

print(f"Grand mean: {grand_mean:.4f}")
print(f"Group means: {means}")
print(f"SSB = {SSB:.4f}, SSW = {SSW:.4f}, SST = {SST:.4f}")
print(f"SSB + SSW = {SSB + SSW:.4f} (should equal SST = {SST:.4f})")
print(f"MSB = {MSB:.4f}, MSW = {MSW:.4f}")
print(f"F = {F_stat:.4f}")

p_value = 1 - stats.f.cdf(F_stat, k-1, N-k)
print(f"p-value = {p_value:.4f}")

# Step 3: Verify with scipy
F_scipy, p_scipy = stats.f_oneway(group_a, group_b, group_c)
print(f"\nscipy: F = {F_scipy:.4f}, p = {p_scipy:.4f}")
```

## Connection to CS / Games / AI / Business / Industry

- **Hyperparameter Tuning:** Testing if different learning rates produce
  significantly different model performances.
- **A/B/n Testing:** Comparing more than two variants simultaneously
  (three UI designs, four pricing tiers).
- **Game Balance:** Testing if different character classes have statistically
  different win rates across multiple maps.
- **Compiler Optimisation:** Comparing execution times across multiple
  compiler flags or backends.

## Check Your Understanding

1. Add a fourth group D = {10, 11, 9, 10} to the example. Recompute the
   ANOVA by hand.

2. If ANOVA rejects $H_0$, it tells you "at least one group differs" but
   not *which* one. Research: what post-hoc tests can you use? (Tukey HSD,
   Bonferroni.)

3. What are the assumptions of one-way ANOVA? (Normality, equal variances,
   independence.) What happens when they are violated?
