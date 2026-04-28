# Confidence Intervals

## Intuition

A sample mean is almost never exactly equal to the population mean.  A
**confidence interval** gives a range that, if you repeated the experiment many
times, would contain the true mean a specified fraction of the time (say 95%).
It answers the practical question every data scientist asks: "I computed a
number from data — how much should I trust it?"

## Prerequisites

- Tier 4, Lesson 6: Continuous Distributions (Gaussian, Student's t)
- Tier 4, Lesson 7: Central Limit Theorem
- Tier 4, Lesson 14: Sampling Distributions (standard error, t-distribution)

## From First Principles

### The idea

We know $\bar{X} \sim \mathcal{N}(\mu, \sigma^2/n)$ (exactly for normal data,
approximately by CLT).  So:

$$P\left(-z_{\alpha/2} \le \frac{\bar{X} - \mu}{\sigma/\sqrt{n}} \le z_{\alpha/2}\right) = 1 - \alpha$$

Rearranging for $\mu$:

$$P\left(\bar{X} - z_{\alpha/2}\frac{\sigma}{\sqrt{n}} \le \mu \le \bar{X} + z_{\alpha/2}\frac{\sigma}{\sqrt{n}}\right) = 1 - \alpha$$

### Case 1: CI for the mean, $\sigma$ known (z-interval)

$$\bar{X} \pm z_{\alpha/2} \cdot \frac{\sigma}{\sqrt{n}}$$

For 95% confidence: $z_{0.025} = 1.96$. For 99%: $z_{0.005} = 2.576$.

**Pen & paper:** IQ scores, $\sigma = 15$.  Sample: $n = 36$, $\bar{x} = 104$.

$\text{SE} = 15/\sqrt{36} = 15/6 = 2.5$

$\text{95% CI} = 104 \pm 1.96 \times 2.5 = 104 \pm 4.9 = (99.1, 108.9)$

**Interpretation:** If we repeated this experiment many times, 95% of the
resulting intervals would contain the true $\mu$.  This particular interval
either contains $\mu$ or it does not — probability applies to the *procedure*,
not to this single interval.

### Case 2: CI for the mean, $\sigma$ unknown (t-interval)

Replace $\sigma$ with $S$ and use the $t$-distribution with $\nu = n-1$ degrees
of freedom:

$$\bar{X} \pm t_{\alpha/2, n-1} \cdot \frac{S}{\sqrt{n}}$$

**Pen & paper:** A sample of $n = 10$ exam scores: $\bar{x} = 72$, $s = 8$.

$\text{SE} = 8/\sqrt{10} = 8/3.162 = 2.530$

For 95% CI with $\nu = 9$: $t_{0.025, 9} = 2.262$

$\text{95% CI} = 72 \pm 2.262 \times 2.530 = 72 \pm 5.72 = (66.28, 77.72)$

Compare: if we had used $z = 1.96$, we'd get $72 \pm 4.96 = (67.04, 76.96)$ — narrower, but **wrong** because it underestimates the uncertainty from
estimating $\sigma$.

### Case 3: CI for a proportion

If $\hat{p} = k/n$ is a sample proportion (e.g., fraction of users who clicked):

$$\hat{p} \pm z_{\alpha/2}\sqrt{\frac{\hat{p}(1-\hat{p})}{n}}$$

**Pen & paper:** Survey of $n = 400$ users, 120 clicked.  $\hat{p} = 0.30$.

$\text{SE} = \sqrt{\frac{0.30 \times 0.70}{400}} = \sqrt{\frac{0.21}{400}} = \sqrt{0.000525} = 0.0229$

$\text{95% CI} = 0.30 \pm 1.96 \times 0.0229 = 0.30 \pm 0.045 = (0.255, 0.345)$

### Width of the confidence interval

The CI width is $2 \times z_{\alpha/2} \times \text{SE}$.  It depends on:

1. **Confidence level** — higher confidence → wider interval ($z$ gets larger)
2. **Sample size** — larger $n$ → narrower interval (SE shrinks as $1/\sqrt{n}$)
3. **Population variability** — larger $\sigma$ → wider interval

**Pen & paper: Choosing sample size**

Want a 95% CI for a mean with width $\le 2$ (i.e., margin of error $\le 1$),
$\sigma = 10$:

$$1.96 \times \frac{10}{\sqrt{n}} \le 1 \implies \sqrt{n} \ge 19.6 \implies n \ge 385$$

### Common misinterpretations (avoid these!)

- **Wrong:** "There's a 95% probability that $\mu$ is in this interval."
  $\mu$ is fixed; it either is or is not in the interval.
- **Right:** "If we repeated the experiment many times, 95% of intervals would
  contain $\mu$."
- **Wrong:** "95% of the data falls in this interval." (That's a prediction
  interval, not a confidence interval.)

### Pen & paper: Comparing two methods

Method A: $n=100$, $\bar{x}=50$, $\sigma=10$ → SE $= 1$, 95% CI $= (48.04, 51.96)$

Method B: $n=25$, $\bar{x}=50$, $\sigma=10$ → SE $= 2$, 95% CI $= (46.08, 53.92)$

Same point estimate, but method B's interval is twice as wide.  Quadrupling
the sample size halved the width.

## Visualisation

A classic "confidence interval coverage" plot: generate 100 samples, compute
95% CIs, and show them as horizontal bars.  About 95 of them cross the true
$\mu$ line; the remaining ~5 miss it.  This is what "95% confidence" means.

## Python Verification

```python
# ── Confidence Intervals: verifying pen & paper work ──────────
import math
import random

random.seed(42)

# Case 1: z-interval (sigma known)
print("=== Z-interval: IQ scores ===")
sigma = 15
n = 36
x_bar = 104
z_alpha2 = 1.96
se = sigma / math.sqrt(n)
ci_low = x_bar - z_alpha2 * se
ci_high = x_bar + z_alpha2 * se
print(f"SE = {se:.4f}")
print(f"95% CI = ({ci_low:.1f}, {ci_high:.1f})")

# Case 2: t-interval (sigma unknown)
print(f"\n=== T-interval: exam scores ===")
n = 10
x_bar = 72
s = 8
se = s / math.sqrt(n)
# t critical value for df=9, 95% CI
# From t-table: t_0.025,9 = 2.262
t_crit = 2.262
ci_low = x_bar - t_crit * se
ci_high = x_bar + t_crit * se
print(f"SE = {se:.3f}")
print(f"95% CI = ({ci_low:.2f}, {ci_high:.2f})")

# Case 3: proportion CI
print(f"\n=== Proportion CI ===")
n = 400
p_hat = 120 / 400
se = math.sqrt(p_hat * (1 - p_hat) / n)
ci_low = p_hat - 1.96 * se
ci_high = p_hat + 1.96 * se
print(f"p_hat = {p_hat}")
print(f"SE = {se:.4f}")
print(f"95% CI = ({ci_low:.3f}, {ci_high:.3f})")

# Sample size calculation
print(f"\n=== Required sample size ===")
sigma, margin = 10, 1
n_required = math.ceil((1.96 * sigma / margin) ** 2)
print(f"Need n >= {n_required} for margin of error <= {margin}")

# Coverage simulation: verify 95% of CIs contain true mu
print(f"\n=== Coverage simulation ===")
mu_true = 100
sigma = 15
n = 36
n_experiments = 10000
n_cover = 0

for _ in range(n_experiments):
    sample = [random.gauss(mu_true, sigma) for _ in range(n)]
    x_bar = sum(sample) / n
    se = sigma / math.sqrt(n)
    lo = x_bar - 1.96 * se
    hi = x_bar + 1.96 * se
    if lo <= mu_true <= hi:
        n_cover += 1

print(f"Coverage: {n_cover/n_experiments:.1%} (expected 95%)")

# Visualisation: show 20 CIs
print(f"\n=== 20 Confidence Intervals (|---o---| format) ===")
print(f"True mu = {mu_true}")
for i in range(20):
    sample = [random.gauss(mu_true, sigma) for _ in range(n)]
    x_bar = sum(sample) / n
    se = sigma / math.sqrt(n)
    lo = x_bar - 1.96 * se
    hi = x_bar + 1.96 * se
    covers = lo <= mu_true <= hi
    mark = " " if covers else " MISS"
    # Scale to text
    scale = lambda v: int((v - 90) * 2)
    lo_pos = max(0, scale(lo))
    hi_pos = min(40, scale(hi))
    mid_pos = scale(x_bar)
    bar = [' '] * 41
    for j in range(lo_pos, hi_pos + 1):
        bar[j] = '-'
    if 0 <= mid_pos <= 40:
        bar[mid_pos] = 'o'
    mu_pos = scale(mu_true)
    print(f"  {''.join(bar)}{mark}")

# Width vs sample size
print(f"\n=== CI width vs sample size ===")
for n in [10, 25, 50, 100, 400, 1000]:
    width = 2 * 1.96 * sigma / math.sqrt(n)
    print(f"  n={n:4d}: width = {width:.2f}")
```

## Visualisation — What "95% confidence" actually means

A 95% confidence interval is *not* "there's a 95% chance the true mean
is inside this particular interval". The truth is subtler — and the
plot below makes it concrete: if you repeat the procedure many times,
**about 95% of the resulting intervals contain the true mean**. The
*procedure* has 95% coverage, not any single interval.

```python
# ── Visualising confidence-interval coverage ────────────────
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(7)

mu_true = 5.0      # the population mean (we secretly know it)
sigma   = 2.0      # known population std
n       = 30       # each experiment uses a sample of size 30
NUM_EXPERIMENTS = 50

# z* = 1.96 for 95% confidence (Standard Normal critical value)
z_crit = 1.96
half_width = z_crit * sigma / np.sqrt(n)

fig, axes = plt.subplots(1, 2, figsize=(15, 6))

# (1) Simulate 50 independent experiments, each producing a
# 95% CI. Colour the bar green if the interval covers μ_true,
# red if it does not. About 5% should miss in expectation.
ax = axes[0]
covers = 0
for i in range(NUM_EXPERIMENTS):
    sample = rng.normal(loc=mu_true, scale=sigma, size=n)
    xbar   = sample.mean()
    lo, hi = xbar - half_width, xbar + half_width
    inside = lo <= mu_true <= hi
    if inside:
        covers += 1
    color = "tab:green" if inside else "tab:red"
    ax.plot([lo, hi], [i, i], color=color, lw=2)
    ax.plot([xbar], [i], "o", color=color, markersize=4)
ax.axvline(mu_true, color="black", lw=2, linestyle="--",
           label=f"true μ = {mu_true}")
ax.set_xlabel("interval"); ax.set_ylabel("experiment number")
ax.set_title(f"50 independent 95% CIs from samples of n = {n}\n"
             f"Coverage in this run: {covers}/{NUM_EXPERIMENTS} ≈ {covers/NUM_EXPERIMENTS*100:.0f}%")
ax.legend(loc="lower right")
ax.grid(True, alpha=0.3)

# (2) CI width is governed by the standard error σ/√n. Plot CI
# width vs n on a single chart, with the famous *1/√n* shape.
ax = axes[1]
ns = np.arange(5, 401)
widths = 2 * z_crit * sigma / np.sqrt(ns)
ax.plot(ns, widths, color="tab:blue", lw=2,
        label=r"width = $2 z^* \sigma / \sqrt n$")
for n_mark in [10, 30, 100, 400]:
    w = 2 * z_crit * sigma / np.sqrt(n_mark)
    ax.scatter([n_mark], [w], color="tab:red", zorder=5, s=70)
    ax.text(n_mark, w + 0.15, f"n = {n_mark}\nwidth = {w:.2f}",
            ha="center", fontsize=9)
ax.set_title("CI width shrinks as $1/\\sqrt{n}$\n→ 4× the sample, half the width")
ax.set_xlabel("sample size n"); ax.set_ylabel("95% CI width")
ax.set_ylim(0, max(widths) * 1.1)
ax.legend(); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Verify that long-run coverage really is ~95% by running 5,000 experiments.
NUM_LONG = 5_000
long_run_cover = sum(
    abs(rng.normal(loc=mu_true, scale=sigma, size=n).mean() - mu_true) <= half_width
    for _ in range(NUM_LONG)
)
print(f"Long-run coverage ({NUM_LONG} experiments): "
      f"{long_run_cover}/{NUM_LONG} = {long_run_cover/NUM_LONG*100:.2f}%")
print("(Expected: 95.00% — and yes, it really is the *procedure* that has")
print(" 95% coverage; any single interval either contains μ or does not.)")
```

**The two key ideas the picture pins down:**

- **"95% confidence" is a property of the procedure**, not of any
  individual interval. The left plot shows 50 different intervals from
  the same recipe — most cover the true mean, a few don't. If you
  *kept repeating* the experiment, the long-run fraction of intervals
  that cover the truth would be 95%.
- **CI width is bounded by $1/\sqrt n$.** The right plot is the same
  diminishing-returns curve we've now seen three times (CLT, sampling
  distributions, here): cutting the CI width in half costs *four*
  times as much data. This is why surveys hit a "wall" at a few
  thousand respondents — beyond that the marginal precision is tiny
  but the budget is huge.

When journalists report "the poll has a margin of error of ±3% with 95%
confidence," they're describing exactly this — half-width $z^* \sigma /
\sqrt n$ and a procedure that is right 95% of the time.

## Connection to CS / Games / AI / Business / Industry

- **A/B testing** — "is the conversion rate significantly different?" is answered by checking if CIs overlap (or better, by CI for the difference)
- **Model evaluation** — report accuracy as $\hat{p} \pm$ margin, not just a single number
- **Hyperparameter tuning** — CIs on validation metrics tell you whether differences are real or noise
- **Reinforcement learning** — confidence bounds drive exploration (UCB algorithm: pick action with highest upper confidence bound)
- **Monte Carlo estimates** — error bars on simulated quantities are confidence intervals
- **Bayesian vs frequentist** — CIs are frequentist; the Bayesian analogue is the credible interval

## Check Your Understanding

1. **Pen & paper:** A sample of $n = 49$ has $\bar{x} = 82$ and $\sigma = 14$ (known).  Compute a 95% and a 99% CI for $\mu$.
2. **Pen & paper:** A sample of $n = 15$ has $\bar{x} = 35$ and $s = 6$.  Compute a 95% CI using the $t$-distribution.  ($t_{0.025, 14} = 2.145$)
3. **Pen & paper:** In a poll of 1000 people, 540 support a proposal.  Compute a 95% CI for the true proportion.  Is it significantly different from 50%?
4. **Pen & paper:** You want a 95% CI for a mean with margin of error $\le 0.5$, $\sigma = 5$.  Find the minimum $n$.
5. **Think about it:** A colleague says "there's a 95% chance the true mean is between 48 and 52."  What is wrong with this statement?  How would you correct it?
