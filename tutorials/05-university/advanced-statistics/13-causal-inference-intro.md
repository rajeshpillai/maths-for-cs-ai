# Causal Inference Introduction

## Intuition

"Countries that eat more chocolate win more Nobel Prizes." Does eating
chocolate cause Nobel Prizes? Obviously not — this is a classic case of
confounding (both correlate with national wealth). Causal inference provides
mathematical tools to distinguish genuine causal effects from mere
associations. This matters whenever you ask "did X *cause* Y?" rather than
just "are X and Y correlated?"

## Prerequisites

- Tier 14, Lesson 8 (Multiple Regression)
- Tier 4, Lesson 2 (Conditional Probability)

## From First Principles

### Correlation vs Causation

Observing $\text{Corr}(X, Y) \neq 0$ can mean:
1. $X$ causes $Y$
2. $Y$ causes $X$
3. A confounder $Z$ causes both $X$ and $Y$
4. Coincidence (spurious correlation)

Regression only tells you about association, not causation.

### Simpson's Paradox

A trend that appears in aggregated data *reverses* when the data is split
by a confounding variable.

**Classic example:** A treatment appears harmful overall, but is beneficial
within every subgroup.

| Group   | Treatment | Control | Treatment better? |
|---------|-----------|---------|-------------------|
| Mild    | 81/87 (93%) | 234/270 (87%) | Yes |
| Severe  | 192/263 (73%) | 55/80 (69%)   | Yes |
| **Overall** | **273/350 (78%)** | **289/350 (83%)** | **No!** |

The paradox: treatment works in *both* subgroups but appears worse overall
because severe patients preferentially received treatment.

### Potential Outcomes Framework (Rubin Causal Model)

For each individual $i$:
- $Y_i(1)$ = outcome if treated
- $Y_i(0)$ = outcome if not treated
- **Individual causal effect:** $\tau_i = Y_i(1) - Y_i(0)$

The **fundamental problem of causal inference:** we only observe one of
$Y_i(1)$ or $Y_i(0)$, never both.

**Average Treatment Effect (ATE):**
$$\text{ATE} = E[Y(1) - Y(0)] = E[Y(1)] - E[Y(0)]$$

In an RCT (randomised controlled trial), randomisation ensures
$E[Y(1)|\text{treated}] = E[Y(1)]$, so a simple difference in means
estimates the ATE.

### Confounding and Adjustment

If treatment is *not* randomised, a confounder $Z$ can bias the estimate.

**Backdoor criterion:** To estimate the causal effect of $X$ on $Y$,
condition on a set of variables $Z$ that blocks all "backdoor paths"
(non-causal paths) from $X$ to $Y$.

$$P(Y | \text{do}(X=x)) = \sum_z P(Y|X=x, Z=z) \cdot P(Z=z)$$

This is the **adjustment formula** — it "deconfounds" the estimate.

### Do-Calculus Basics

Judea Pearl's do-calculus distinguishes:
- $P(Y|X)$ — observational: what is $Y$ when we *see* $X$?
- $P(Y|\text{do}(X))$ — interventional: what is $Y$ when we *set* $X$?

The "do" operator represents an intervention: forcibly setting $X$ to a
value, breaking any incoming causal arrows to $X$.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

np.random.seed(42)

# Simpson's Paradox simulation
n = 1000

# Confounder: disease severity (0 = mild, 1 = severe)
severity = np.random.binomial(1, 0.5, n)

# Treatment assignment depends on severity (confounded!)
# Severe patients more likely to get treatment
p_treat = 0.3 + 0.5 * severity
treatment = np.random.binomial(1, p_treat)

# Outcome: treatment helps, but severity hurts
outcome = 50 + 10 * treatment - 30 * severity + np.random.normal(0, 5, n)

fig, axes = plt.subplots(1, 2, figsize=(13, 5))

# Aggregated view (misleading)
treated = outcome[treatment == 1]
control = outcome[treatment == 0]
axes[0].hist(treated, bins=30, alpha=0.6, label=f'Treated (mean={treated.mean():.1f})', density=True)
axes[0].hist(control, bins=30, alpha=0.6, label=f'Control (mean={control.mean():.1f})', density=True)
axes[0].set_title("Simpson's Paradox: Aggregated (Misleading)")
axes[0].set_xlabel('Outcome')
axes[0].legend()

# Stratified view (correct)
colors_t = ['#2196F3', '#1565C0']
colors_c = ['#FF9800', '#E65100']
for sev in [0, 1]:
    mask_t = (treatment == 1) & (severity == sev)
    mask_c = (treatment == 0) & (severity == sev)
    label_sev = 'Mild' if sev == 0 else 'Severe'
    axes[1].hist(outcome[mask_t], bins=20, alpha=0.5, density=True,
                 color=colors_t[sev], label=f'{label_sev} Treated (mean={outcome[mask_t].mean():.1f})')
    axes[1].hist(outcome[mask_c], bins=20, alpha=0.5, density=True,
                 color=colors_c[sev], label=f'{label_sev} Control (mean={outcome[mask_c].mean():.1f})')

axes[1].set_title('Stratified by Severity (Correct)')
axes[1].set_xlabel('Outcome')
axes[1].legend(fontsize=8)

plt.tight_layout()
plt.savefig('simpsons_paradox.png', dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np
from scipy import stats

np.random.seed(42)
n = 10000

# Step 1: Simulate confounded data
severity = np.random.binomial(1, 0.5, n)
p_treat = 0.3 + 0.5 * severity
treatment = np.random.binomial(1, p_treat)
# True causal effect of treatment = +10
outcome = 50 + 10 * treatment - 30 * severity + np.random.normal(0, 5, n)

# Step 2: Naive estimate (confounded)
naive_ate = np.mean(outcome[treatment == 1]) - np.mean(outcome[treatment == 0])
print(f"True causal effect: +10")
print(f"Naive estimate (confounded): {naive_ate:.2f}")

# Step 3: Adjusted estimate (stratify by confounder)
ate_adjusted = 0
for sev in [0, 1]:
    mask = severity == sev
    treated = outcome[mask & (treatment == 1)]
    control = outcome[mask & (treatment == 0)]
    ate_sev = np.mean(treated) - np.mean(control)
    weight = mask.sum() / n
    ate_adjusted += ate_sev * weight
    print(f"  Severity={sev}: ATE = {ate_sev:.2f}, weight = {weight:.2f}")

print(f"Adjusted estimate: {ate_adjusted:.2f}")

# Step 4: Regression adjustment
X = np.column_stack([np.ones(n), treatment, severity])
beta = np.linalg.lstsq(X, outcome, rcond=None)[0]
print(f"\nRegression coefficients:")
print(f"  Intercept: {beta[0]:.2f}")
print(f"  Treatment effect: {beta[1]:.2f} (should be ~10)")
print(f"  Severity effect: {beta[2]:.2f} (should be ~-30)")
```

## Connection to CS / Games / AI

- **A/B Testing:** Proper randomisation in A/B tests ensures causal
  interpretation. Without it, selection bias confounds results.
- **Algorithmic Fairness:** Is a model *causing* disparate outcomes, or
  reflecting pre-existing disparities? Causal models help answer this.
- **Recommendation Systems:** Did the recommendation *cause* the user to
  click, or would they have clicked anyway?
- **Game Design:** Did a balance patch *cause* the win rate change, or
  did player behaviour shift simultaneously?

## Check Your Understanding

1. Construct a $2 \times 2$ Simpson's paradox example with numbers. Show
   that the trend reverses when you aggregate.

2. In an A/B test, why does randomisation solve the confounding problem?
   What happens if users self-select into treatment?

3. Draw a causal graph with three variables $X$, $Y$, $Z$ where $Z$
   confounds the $X \to Y$ relationship. Write the adjustment formula.
