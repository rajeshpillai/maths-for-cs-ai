# Experimental Design

## Intuition

You want to test if a new game tutorial improves player retention. How many
players do you need? Should you test just "old vs new," or also vary the
tutorial length? How do you prevent day-of-week effects from biasing results?
Experimental design is the art of planning experiments so they are efficient,
unbiased, and powerful enough to detect real effects.

## Prerequisites

- Tier 14, Lesson 3 (Hypothesis Testing Foundations)
- Tier 14, Lesson 6 (ANOVA)

## From First Principles

### Randomisation

**Why randomise?** Randomisation ensures that confounders (known and unknown)
are balanced across groups on average. Without it, systematic differences
between groups can masquerade as treatment effects.

**How:** Assign each unit to treatment or control with equal probability,
independently. In code: a random number generator, not the experimenter's
judgement.

### Blocking

**Problem:** Even with randomisation, small experiments may have imbalanced
groups by chance (e.g., all experienced players in one group).

**Solution:** First divide subjects into **blocks** (strata) of similar
units, then randomise *within* each block.

Example: Block by player level (beginner/intermediate/expert), then
randomly assign half of each block to treatment.

This reduces variability, increasing power.

### Factorial Designs

Instead of testing one factor at a time, vary multiple factors simultaneously.

A **$2^k$ factorial design** has $k$ factors, each at 2 levels.

**Example:** $2^2$ design with factors A (tutorial style: text/video) and
B (length: short/long):

|           | B: Short | B: Long |
|-----------|----------|---------|
| A: Text   | (1)      | b       |
| A: Video  | a        | ab      |

Each cell is a combination. With $n$ observations per cell, total
observations = $4n$.

Main effects and interaction:
$$\text{Main effect of A} = \frac{1}{2}[(a - (1)) + (ab - b)]$$
$$\text{Main effect of B} = \frac{1}{2}[(b - (1)) + (ab - a)]$$
$$\text{Interaction AB} = \frac{1}{2}[(ab - b) - (a - (1))]$$

### A/B Testing

A/B testing is a randomised controlled experiment in a tech context:

1. Define metric (conversion, retention, revenue)
2. Determine sample size (power analysis)
3. Randomly split traffic
4. Run for sufficient duration
5. Analyse with appropriate statistical test

### Power Analysis for Sample Size

Given desired power $(1-\beta)$, significance $\alpha$, and effect size $d$:

$$n = \frac{(z_{\alpha/2} + z_{\beta})^2 \cdot 2\sigma^2}{\delta^2}$$

where $\delta$ is the minimum detectable effect.

**Pen & paper:** Want to detect $\delta = 2$ with $\sigma = 5$,
$\alpha = 0.05$, power = 0.80.

$z_{0.025} = 1.96$, $z_{0.20} = 0.842$

$$n = \frac{(1.96 + 0.842)^2 \cdot 2 \cdot 25}{4}
= \frac{(2.802)^2 \cdot 50}{4}
= \frac{7.851 \cdot 50}{4}
= \frac{392.6}{4} \approx 99 \text{ per group}$$

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(13, 5))

# Factorial design layout
factors_a = ['Text', 'Video']
factors_b = ['Short', 'Long']
np.random.seed(42)

# Simulated means for each cell
means = {
    ('Text', 'Short'): 60,
    ('Text', 'Long'): 65,
    ('Video', 'Short'): 70,
    ('Video', 'Long'): 68,
}

x = np.arange(len(factors_b))
width = 0.35
bars1 = [means[('Text', b)] for b in factors_b]
bars2 = [means[('Video', b)] for b in factors_b]

axes[0].bar(x - width/2, bars1, width, label='Text', color='#66b3ff')
axes[0].bar(x + width/2, bars2, width, label='Video', color='#ff9999')
axes[0].set_xticks(x)
axes[0].set_xticklabels(factors_b)
axes[0].set_ylabel('Retention Score')
axes[0].set_title('2x2 Factorial Design: Tutorial Type x Length')
axes[0].legend()
axes[0].set_ylim(50, 80)

# Power analysis: sample size vs effect size
from scipy import stats as st
alpha = 0.05
power_target = 0.80
sigma = 5
z_alpha = st.norm.ppf(1 - alpha/2)
z_beta = st.norm.ppf(power_target)

effect_sizes = np.linspace(0.5, 5, 100)
sample_sizes = (z_alpha + z_beta)**2 * 2 * sigma**2 / effect_sizes**2

axes[1].plot(effect_sizes, sample_sizes, 'b-', lw=2)
axes[1].set_xlabel('Effect Size (delta)')
axes[1].set_ylabel('Sample Size per Group')
axes[1].set_title('Power Analysis: Sample Size vs Effect Size')
axes[1].set_ylim(0, 1500)
axes[1].axhline(100, color='red', linestyle='--', alpha=0.5, label='n=100')
axes[1].legend()
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('experimental_design.png', dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np
from scipy import stats

# ── Power Analysis ───────────────────────────────────────
print("=== Power Analysis ===")
alpha = 0.05
power = 0.80
sigma = 5.0
delta = 2.0

z_alpha = stats.norm.ppf(1 - alpha/2)
z_beta = stats.norm.ppf(power)

n_per_group = (z_alpha + z_beta)**2 * 2 * sigma**2 / delta**2
print(f"Parameters: alpha={alpha}, power={power}, sigma={sigma}, delta={delta}")
print(f"z_alpha/2 = {z_alpha:.3f}, z_beta = {z_beta:.3f}")
print(f"Required n per group: {n_per_group:.1f} (round up to {int(np.ceil(n_per_group))})")

# ── Simulate A/B test ────────────────────────────────────
print("\n=== Simulated A/B Test ===")
np.random.seed(42)
n = 100
true_effect = 2.0

control = np.random.normal(50, sigma, n)
treatment = np.random.normal(50 + true_effect, sigma, n)

t_stat, p_val = stats.ttest_ind(control, treatment)
print(f"Control mean: {control.mean():.2f}, Treatment mean: {treatment.mean():.2f}")
print(f"Observed effect: {treatment.mean() - control.mean():.2f}")
print(f"t = {t_stat:.4f}, p = {p_val:.4f}")
print(f"Reject H0 at alpha=0.05? {p_val < 0.05}")

# ── Factorial Design Analysis ────────────────────────────
print("\n=== 2x2 Factorial Design ===")
np.random.seed(42)
n_per_cell = 20

# Factor A: tutorial type (0=text, 1=video), effect = +8
# Factor B: length (0=short, 1=long), effect = +3
# Interaction: -5 (video+long is not as good as expected)
data = []
for a in [0, 1]:
    for b in [0, 1]:
        y = 60 + 8*a + 3*b - 5*a*b + np.random.normal(0, 4, n_per_cell)
        for val in y:
            data.append((a, b, val))

data = np.array(data)
A, B, Y = data[:, 0], data[:, 1], data[:, 2]

# Main effects and interaction
mean_a0 = Y[A == 0].mean()
mean_a1 = Y[A == 1].mean()
mean_b0 = Y[B == 0].mean()
mean_b1 = Y[B == 1].mean()

print(f"Main effect A (video): {mean_a1 - mean_a0:.2f} (true: ~5.5)")
print(f"Main effect B (long):  {mean_b1 - mean_b0:.2f} (true: ~0.5)")

# Cell means
for a in [0, 1]:
    for b in [0, 1]:
        mask = (A == a) & (B == b)
        label_a = 'Video' if a else 'Text'
        label_b = 'Long' if b else 'Short'
        print(f"  {label_a}/{label_b}: mean = {Y[mask].mean():.2f}")
```

## Connection to CS / Games / AI / Business / Industry

- **A/B Testing in Tech:** Every major tech company (Google, Netflix,
  Amazon) runs thousands of A/B tests. Proper design prevents false
  discoveries and wasted resources.
- **Hyperparameter Search:** Factorial designs for ML hyperparameters
  (learning rate x batch size x depth) are more efficient than grid search.
- **Game Balance:** Testing multiple changes simultaneously (weapon damage,
  health, map layout) with factorial designs.
- **Simulation Experiments:** When evaluating RL agents, proper experimental
  design (blocking by seed, sufficient runs) ensures reliable conclusions.
- **Booking.com / Microsoft ExP / LinkedIn Xnet:** Booking has documented
  running 25,000+ A/B tests/year with pre-registered power analyses;
  Microsoft's ExP platform applies CUPED variance-reduction to cut
  required sample size by ~50%, a method now standard at LinkedIn and
  Netflix.
- **Pfizer COVID-19 vaccine Phase III:** the BNT162b2 trial pre-registered
  ~150 events (not patients) as the stopping rule with O'Brien-Fleming
  group-sequential boundaries — a textbook example of FDA-mandated
  fixed-alpha sequential design.
- **Six Sigma DOE at GE / 3M / DuPont:** Plackett-Burman and
  fractional-factorial $2^{k-p}$ designs screen 8-15 process factors in
  fewer than 32 runs, slashing prototyping cost in chemical and
  semiconductor process development.
- **Agricultural field trials at the USDA / Rothamsted:** randomized
  complete block designs (RCBD) and Latin squares — invented by Fisher
  in the 1920s — still gate every USDA-approved seed and pesticide
  variety release.
- **Crossover trials at the FDA:** bioequivalence studies use 2x2
  crossover designs with Williams squares to control for period and
  carryover effects in generic-drug approval.

## Check Your Understanding

1. You want 90% power to detect a 5% increase in click-through rate
   (baseline 10%, so $\delta = 0.005$). Compute the required sample size.

2. Design a $2^3$ factorial experiment for testing three factors in a game
   (weapon type, map size, team size). List all 8 conditions.

3. Why is it important to decide your sample size *before* running the
   experiment, rather than "peeking" at results and stopping early?
