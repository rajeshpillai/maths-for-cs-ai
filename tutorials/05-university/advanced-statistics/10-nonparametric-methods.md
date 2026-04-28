# Nonparametric Methods

## Intuition

The t-test and ANOVA assume your data is normally distributed. But what if
it is not — heavily skewed, has outliers, or is ordinal (rankings)? 
Nonparametric methods make fewer assumptions about the data distribution.
They work with ranks instead of raw values, making them robust to outliers
and non-normality. The tradeoff: they are slightly less powerful when the
parametric assumptions actually hold.

## Prerequisites

- Tier 14, Lesson 4 (Z-Test and T-Test)
- Tier 14, Lesson 3 (Hypothesis Testing)

## From First Principles

### Mann-Whitney U Test

The nonparametric alternative to the two-sample t-test. Instead of
comparing means, it tests whether one group tends to have larger values.

**Procedure:**

1. Combine both groups and rank all $N = n_1 + n_2$ observations.
2. Sum the ranks for each group: $R_1, R_2$.
3. Compute:
$$U_1 = n_1 n_2 + \frac{n_1(n_1 + 1)}{2} - R_1$$
$$U_2 = n_1 n_2 + \frac{n_2(n_2 + 1)}{2} - R_2$$
4. Use $U = \min(U_1, U_2)$.

**Pen & Paper Example:**

Group A: {3, 5, 8}  ($n_1 = 3$)
Group B: {1, 4, 7, 10}  ($n_2 = 4$)

Combined and ranked: 1(B), 3(A), 4(B), 5(A), 7(B), 8(A), 10(B)
Ranks:              1,    2,    3,    4,    5,    6,    7

$R_A = 2 + 4 + 6 = 12$
$R_B = 1 + 3 + 5 + 7 = 16$

$U_1 = 3 \times 4 + \frac{3 \times 4}{2} - 12 = 12 + 6 - 12 = 6$

$U_2 = 3 \times 4 + \frac{4 \times 5}{2} - 16 = 12 + 10 - 16 = 6$

$U = 6$. Compare against critical values for $n_1=3, n_2=4$.

### Kruskal-Wallis Test

The nonparametric alternative to one-way ANOVA. Compares $k$ groups using
ranks.

$$H = \frac{12}{N(N+1)} \sum_{j=1}^{k} \frac{R_j^2}{n_j} - 3(N+1)$$

Under $H_0$, $H$ approximately follows $\chi^2_{k-1}$.

### Permutation Test

The most flexible nonparametric approach. The idea:

1. Compute the test statistic on the observed data (e.g., difference in means).
2. Under $H_0$, the group labels are interchangeable.
3. Randomly permute the labels many times and recompute the statistic.
4. The p-value is the fraction of permutations that produce a statistic
   as extreme as (or more extreme than) the observed one.

No distributional assumptions at all — purely data-driven.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

np.random.seed(42)

# Two groups: non-normal data (exponential)
group_a = np.random.exponential(3, 20)
group_b = np.random.exponential(5, 20)

# Permutation test
observed_diff = np.mean(group_a) - np.mean(group_b)
combined = np.concatenate([group_a, group_b])
n_perms = 10000
perm_diffs = []

for _ in range(n_perms):
    perm = np.random.permutation(combined)
    perm_diff = np.mean(perm[:20]) - np.mean(perm[20:])
    perm_diffs.append(perm_diff)

perm_diffs = np.array(perm_diffs)

fig, axes = plt.subplots(1, 2, figsize=(13, 5))

# Data distributions
axes[0].hist(group_a, bins=15, alpha=0.6, label='Group A (Exp(3))', density=True)
axes[0].hist(group_b, bins=15, alpha=0.6, label='Group B (Exp(5))', density=True)
axes[0].set_xlabel('Value')
axes[0].set_ylabel('Density')
axes[0].set_title('Non-Normal Data (Exponential)')
axes[0].legend()

# Permutation distribution
axes[1].hist(perm_diffs, bins=50, density=True, alpha=0.7, color='steelblue',
             label='Permutation distribution')
axes[1].axvline(observed_diff, color='red', linestyle='--', lw=2,
                label=f'Observed diff = {observed_diff:.2f}')
p_val = np.mean(np.abs(perm_diffs) >= np.abs(observed_diff))
axes[1].set_title(f'Permutation Test (p = {p_val:.4f})')
axes[1].set_xlabel('Difference in Means')
axes[1].legend()

plt.tight_layout()
plt.savefig('permutation_test.png', dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np
from scipy import stats

np.random.seed(42)

# Step 1: Mann-Whitney U Test (by hand then scipy)
print("=== Mann-Whitney U Test ===")
group_a = np.array([3, 5, 8])
group_b = np.array([1, 4, 7, 10])

# Ranks by hand
combined = np.concatenate([group_a, group_b])
labels = ['A']*3 + ['B']*4
ranks = stats.rankdata(combined)
R_a = sum(r for r, l in zip(ranks, labels) if l == 'A')
R_b = sum(r for r, l in zip(ranks, labels) if l == 'B')

n1, n2 = len(group_a), len(group_b)
U1 = n1 * n2 + n1*(n1+1)/2 - R_a
U2 = n1 * n2 + n2*(n2+1)/2 - R_b
print(f"R_A = {R_a}, R_B = {R_b}")
print(f"U1 = {U1}, U2 = {U2}, U = {min(U1, U2)}")

stat, pval = stats.mannwhitneyu(group_a, group_b, alternative='two-sided')
print(f"scipy: U = {stat}, p = {pval:.4f}")

# Step 2: Kruskal-Wallis
print("\n=== Kruskal-Wallis Test ===")
g1 = np.array([5, 7, 6, 6])
g2 = np.array([8, 9, 7, 8])
g3 = np.array([6, 7, 5, 6])

H_stat, H_pval = stats.kruskal(g1, g2, g3)
print(f"H = {H_stat:.4f}, p = {H_pval:.4f}")

# Step 3: Permutation test from scratch
print("\n=== Permutation Test ===")
a = np.random.exponential(3, 20)
b = np.random.exponential(5, 20)
obs_diff = np.mean(a) - np.mean(b)

combined = np.concatenate([a, b])
n_perms = 10000
count_extreme = 0
for _ in range(n_perms):
    perm = np.random.permutation(combined)
    perm_diff = np.mean(perm[:20]) - np.mean(perm[20:])
    if abs(perm_diff) >= abs(obs_diff):
        count_extreme += 1

p_perm = count_extreme / n_perms
print(f"Observed difference: {obs_diff:.4f}")
print(f"Permutation p-value: {p_perm:.4f}")

# Compare with t-test (may be unreliable for non-normal data)
t_stat, t_pval = stats.ttest_ind(a, b)
print(f"T-test p-value: {t_pval:.4f}")
```

## Connection to CS / Games / AI / Business / Industry

- **Robust Model Evaluation:** When accuracy distributions across folds
  are not normal, use Mann-Whitney or permutation tests to compare models.
- **A/B Testing:** Permutation tests are increasingly used in industry
  because they make no distributional assumptions.
- **Fairness Auditing:** Testing if model performance differs across
  demographic groups when the metric distribution is unknown.
- **Game Analytics:** Comparing player behaviour metrics that are typically
  heavily skewed (session length, spending).
- **Permutation tests at Netflix / Spotify experimentation:** session-length
  and watch-time distributions are heavy-tailed, so Netflix's XP platform
  publishes results from rank-based and permutation tests (documented in
  their "Quasi-Experimentation at Netflix" tech blog) rather than
  t-tests.
- **Environmental compliance at the EPA:** the Mann-Whitney U test is
  the prescribed method in EPA QA/G-9 guidance for comparing pollutant
  concentrations between Superfund sites and reference sites — chosen
  precisely because contaminant data is non-normal and censored.
- **Sensory testing at Coca-Cola / Nestlé / Unilever:** Wilcoxon
  signed-rank tests evaluate paired taste-test scores from consumer
  panels; rank tests are the food-industry standard because hedonic
  9-point scores are ordinal, not interval.
- **Manufacturing reliability at Cummins / Caterpillar:** Kruskal-Wallis
  tests compare engine wear across multiple lubricant formulations on
  small fleet samples where Weibull lifetimes violate ANOVA's normality
  assumption.

## Check Your Understanding

1. Perform the Mann-Whitney U test by hand on A = {10, 20, 30} and
   B = {15, 25, 35}. What is U?

2. Why is a permutation test "exact" for any sample size, while the
   chi-squared and t-tests are only approximate?

3. If the data really is normally distributed, which test has more power:
   the t-test or Mann-Whitney? Why?
