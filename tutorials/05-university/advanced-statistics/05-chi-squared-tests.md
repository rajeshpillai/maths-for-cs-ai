# Chi-Squared Tests

## Intuition

A game designer sets loot drop rates to 30% common, 50% uncommon, 15% rare,
5% legendary. After 1000 drops, you observe different counts. Is the random
number generator actually following the intended distribution? The chi-squared
test measures how far observed counts deviate from expected counts. It works
with *categorical* data where t-tests (which need continuous means) do not apply.

## Prerequisites

- Tier 14, Lesson 3 (Hypothesis Testing Foundations)
- Tier 4, Lessons 1-3 (Probability fundamentals)

## From First Principles

### The Chi-Squared Statistic

Given $k$ categories with observed counts $O_i$ and expected counts $E_i$:

$$\chi^2 = \sum_{i=1}^{k} \frac{(O_i - E_i)^2}{E_i}$$

**Why this formula?** Each term $(O_i - E_i)^2 / E_i$ measures the
*relative* squared deviation. Dividing by $E_i$ normalises: a deviation
of 5 matters more when you expected 10 than when you expected 1000.

Under $H_0$ (the expected model is correct), $\chi^2$ approximately follows
a chi-squared distribution with degrees of freedom depending on the test.

### Test 1: Goodness of Fit

**Question:** Does observed data match a hypothesised distribution?

$H_0$: Data follows the specified distribution.

Degrees of freedom: $df = k - 1 - p$, where $p$ = number of parameters
estimated from the data (0 if all specified in advance).

**Pen & paper example:** A die is rolled 60 times. Observed:

| Face    | 1  | 2  | 3  | 4  | 5  | 6  |
|---------|----|----|----|----|----|----|
| $O_i$   | 8  | 12 | 7  | 14 | 9  | 10 |
| $E_i$   | 10 | 10 | 10 | 10 | 10 | 10 |

$$\chi^2 = \frac{(8-10)^2}{10} + \frac{(12-10)^2}{10} + \frac{(7-10)^2}{10}
+ \frac{(14-10)^2}{10} + \frac{(9-10)^2}{10} + \frac{(10-10)^2}{10}$$

$$= \frac{4+4+9+16+1+0}{10} = \frac{34}{10} = 3.4$$

$df = 6 - 1 = 5$. Critical value $\chi^2_{0.05, 5} = 11.07$.

Since $3.4 < 11.07$, fail to reject $H_0$. The die appears fair.

### Test 2: Test of Independence

**Question:** Are two categorical variables independent?

Given a contingency table with $r$ rows and $c$ columns:

$$E_{ij} = \frac{(\text{row } i \text{ total}) \times (\text{col } j \text{ total})}{n}$$

$df = (r-1)(c-1)$

### Test 3: Test of Homogeneity

**Question:** Do different populations have the same distribution?

Same formula and computation as independence, but the sampling is different
(each population is sampled separately).

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

# Goodness of fit: die example
categories = ['1', '2', '3', '4', '5', '6']
observed = np.array([8, 12, 7, 14, 9, 10])
expected = np.array([10, 10, 10, 10, 10, 10])

fig, axes = plt.subplots(1, 2, figsize=(13, 5))

# Bar chart: observed vs expected
x = np.arange(len(categories))
width = 0.35
axes[0].bar(x - width/2, observed, width, label='Observed', color='steelblue')
axes[0].bar(x + width/2, expected, width, label='Expected', color='salmon')
axes[0].set_xticks(x)
axes[0].set_xticklabels(categories)
axes[0].set_xlabel('Die Face')
axes[0].set_ylabel('Count')
axes[0].set_title('Observed vs Expected Counts')
axes[0].legend()

# Chi-squared distribution with rejection region
df = 5
x_chi = np.linspace(0, 20, 300)
axes[1].plot(x_chi, stats.chi2.pdf(x_chi, df), 'b-', lw=2)
chi_crit = stats.chi2.ppf(0.95, df)
x_reject = x_chi[x_chi >= chi_crit]
axes[1].fill_between(x_reject, stats.chi2.pdf(x_reject, df),
                     alpha=0.3, color='red', label=f'Reject (alpha=0.05)')
axes[1].axvline(3.4, color='green', linestyle='--', lw=2,
                label=f'Our statistic = 3.4')
axes[1].set_xlabel('Chi-squared')
axes[1].set_ylabel('Density')
axes[1].set_title(f'Chi-squared Distribution (df={df})')
axes[1].legend()

plt.tight_layout()
plt.savefig('chi_squared_test.png', dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np
from scipy import stats

# ── Goodness of Fit ──────────────────────────────────────
print("=== Goodness of Fit: Fair Die ===")
observed = np.array([8, 12, 7, 14, 9, 10])
expected = np.array([10, 10, 10, 10, 10, 10])

# By hand
chi2_hand = np.sum((observed - expected)**2 / expected)
print(f"Chi-squared (hand): {chi2_hand:.2f}")

# scipy
chi2_stat, p_value = stats.chisquare(observed, expected)
print(f"Chi-squared (scipy): {chi2_stat:.2f}, p-value: {p_value:.4f}")

# ── Test of Independence ─────────────────────────────────
print("\n=== Test of Independence ===")
# Contingency table: Browser x Conversion
# Rows: Chrome, Firefox, Safari
# Cols: Converted, Not Converted
table = np.array([
    [200, 800],   # Chrome
    [150, 850],   # Firefox
    [80,  420],   # Safari
])
print("Contingency table:")
print(table)

# Compute expected values by hand
row_totals = table.sum(axis=1)
col_totals = table.sum(axis=0)
n = table.sum()
expected_table = np.outer(row_totals, col_totals) / n
print(f"\nExpected:")
print(expected_table.round(1))

chi2_hand = np.sum((table - expected_table)**2 / expected_table)
df = (table.shape[0] - 1) * (table.shape[1] - 1)
print(f"\nChi-squared (hand): {chi2_hand:.4f}, df = {df}")

chi2_sc, p_sc, dof, exp_sc = stats.chi2_contingency(table)
print(f"Chi-squared (scipy): {chi2_sc:.4f}, p = {p_sc:.4f}, df = {dof}")

# ── Loot drop example ────────────────────────────────────
print("\n=== Loot Drop Goodness of Fit ===")
n_drops = 1000
probs = [0.30, 0.50, 0.15, 0.05]
observed_loot = np.array([320, 475, 155, 50])
expected_loot = np.array(probs) * n_drops

chi2_loot, p_loot = stats.chisquare(observed_loot, expected_loot)
print(f"Observed: {observed_loot}")
print(f"Expected: {expected_loot}")
print(f"Chi-squared = {chi2_loot:.4f}, p = {p_loot:.4f}")
```

## Connection to CS / Games / AI / Business / Industry

- **A/B Testing with Categories:** Testing if user preferences for UI
  layouts differ from a baseline distribution.
- **NLP:** Testing if word frequency distributions differ between corpora.
- **Game QA:** Verifying that random number generators produce outcomes
  matching intended probability distributions.
- **Feature Selection:** Chi-squared test of independence identifies
  categorical features that are correlated with the target variable.
- **U.S. Census / Pew Research polling:** chi-squared independence tests
  on cross-tabulated demographic data (race x voting intention,
  income x healthcare access) drive published reports that influence
  redistricting and policy.
- **Casino regulation (Nevada Gaming Control Board):** chi-squared
  goodness-of-fit tests audit slot-machine RNGs and roulette wheels for
  bias; vendors like IGT and Scientific Games must pass GLI-19 RNG
  certification using these tests.
- **Genetics at 23andMe / Broad Institute:** chi-squared tests check
  Hardy-Weinberg equilibrium at SNP loci as a QC step before any GWAS,
  flagging genotyping errors before downstream analysis.
- **Marketing-mix attribution at Procter & Gamble / Unilever:** chi-squared
  of independence tests whether channel exposure (TV, Instagram, retail
  display) is associated with brand-purchase categories in Nielsen
  consumer panels.

## Check Your Understanding

1. A survey asks 500 people their favourite programming language. Results:
   Python 180, JavaScript 150, Rust 100, Go 70. Test if preferences are
   uniform at $\alpha = 0.05$.

2. Build a $3 \times 3$ contingency table by hand. Compute expected
   values and the chi-squared statistic.

3. Why does the chi-squared test require expected counts of at least 5
   in each cell? What can you do if some cells are too small?
