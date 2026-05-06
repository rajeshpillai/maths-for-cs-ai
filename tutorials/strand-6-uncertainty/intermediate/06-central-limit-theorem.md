---
strand: uncertainty
level: intermediate
order: 6
title: The Central Limit Theorem
prerequisites:
  - tier: strand-6-uncertainty-intermediate
    slug: 05-normal-distribution
    description: Normal distribution
connections:
  - strand-6-uncertainty-intermediate/07-sampling-and-confidence-intervals
applications:
  - cs: "Polling margins of error, A/B test design, simulation outputs"
  - business: "Expected vs realised returns, audit sampling"
  - games: "Distribution of damage over many attacks; aggregate stats"
  - life: "Why averages are predictable, why polls work"
---

# The Central Limit Theorem

## Explain Like I Am 7

Roll *one* die — the result is wild, anywhere from $1$ to $6$.
Roll thirty dice and average the results — that average is almost
always sneakily close to $3.5$.  The **central limit theorem** says
that no matter how weird your original randomness looks, when you
average lots of samples the average's distribution settles into a
neat bell curve centred at the true mean.  This is the secret
behind why polls work, why insurance companies can predict yearly
losses, and why the world feels predictable on average even when
each piece is messy.

## Mental

Take any distribution — uniform, exponential, even one that looks
nothing like a bell curve. Now sample $n$ values independently from
it and **average** them. The sample mean is itself a random variable.

The **central limit theorem** (CLT) says:

> As $n$ grows, the distribution of the sample mean approaches a
> **normal distribution**, regardless of the original shape.

Specifically, if $X_1, X_2, \ldots, X_n$ are independent samples
from any distribution with mean $\mu$ and variance $\sigma^2$, the
sample mean $\bar X = \frac{1}{n} \sum X_i$ satisfies:

$$
\bar X \approx N\!\left(\mu, \frac{\sigma^2}{n}\right) \quad \text{for large } n.
$$

Equivalently, the sum $\sum X_i \approx N(n\mu, n \sigma^2)$ —
mean grows linearly, variance grows linearly, $\sigma$ as $\sqrt n$.

The **$\sqrt n$** behaviour is the famous "wobble" we met in
Foundation Lesson 03: the typical deviation of a sample mean from
the true mean is

$$
\sigma_{\bar X} = \frac{\sigma}{\sqrt n}.
$$

This is the **standard error**. Polls of $n = 1000$ have margin of
error roughly $\frac{1}{\sqrt{1000}} \approx 3\%$. To halve it, take
$4\times$ more samples.

## Why this is profound

The CLT explains why the **normal distribution is everywhere**:

- Heights are sums of many small genetic and environmental effects
  → normal.
- Measurement errors are sums of many tiny independent contributions
  → normal.
- Stock returns over moderate timeframes — assuming independence —
  → normal.
- The sample mean of any reasonable distribution → normal.

The original distribution can be **anything reasonable** (with a
finite variance). Yet averaging many samples always pulls toward a
bell curve.

## Interactive

:::widget type=numeric-input prompt="$1000$ fair-coin flips. $X = $ number of heads. Mean: $500$. By CLT, $\\sigma = \\sqrt{np(1-p)} = \\sqrt{250} \\approx 15.8$. About $95\\%$ of the time, $X$ falls within $\\pm 2\\sigma$ of $500$. So roughly between $500 - 32 = 468$ and $500 + 32 = ?$" answer=532 explain="$500 + 32 = 532$. Anywhere from $\\sim 468$ to $\\sim 532$ is unsurprising.":::

:::widget type=numeric-input prompt="A $0.05$ rare event: $1000$ trials. Expected count $50$, $\\sigma = \\sqrt{50 \\cdot 0.95} \\approx 6.9$. Approximately $95\\%$ of trial-counts fall in $50 \\pm ?$" answer=14 tolerance=1 explain="$2 \\sigma \\approx 14$. So $36$ to $64$ is unsurprising; $20$ would be surprising.":::

:::widget type=probability-sim experiment=fair-coin step=1000 target=heads:::

Reset and run. Watch the proportion $\hat p$ approach $0.5$. The CLT
predicts $\hat p \sim N(0.5, 0.5(0.5)/n)$, with $\sigma = 0.5/\sqrt n$.
For $n = 1000$, $\sigma \approx 0.0158$. About $95\%$ of runs would
have $\hat p \in [0.468, 0.532]$.

:::widget type=numeric-input prompt="A poll surveys $400$ people. Margin of error (one $\\sigma$) is roughly $1/\\sqrt{400}$. Type the decimal." answer=0.05 explain="$1/20 = 0.05 = 5\\%$ — typical 'plus or minus' on cable-news polls.":::

## Symbolic

**Classical CLT**: let $X_1, \ldots, X_n$ be independent and
identically distributed with $E[X_i] = \mu, \text{Var}(X_i) =
\sigma^2 < \infty$. Define $\bar X = \tfrac{1}{n} \sum X_i$. Then

$$
\frac{\bar X - \mu}{\sigma / \sqrt n} \xrightarrow{d} N(0, 1) \quad \text{as } n \to \infty.
$$

The convergence is **in distribution** — the CDF converges pointwise.

**Practical use**: for "moderate" $n$ (often $n \ge 30$), treat $\bar
X$ as approximately normal even when the original $X_i$ aren't.

## Computational

```python
import numpy as np
import scipy.stats as stats

# Take averages of samples from a non-normal (uniform) distribution
n = 30
trials = 10_000
sample_means = []
for _ in range(trials):
    samples = np.random.uniform(0, 1, size=n)
    sample_means.append(samples.mean())

sample_means = np.array(sample_means)
print(sample_means.mean())   # ~0.5 (μ for Uniform(0,1))
print(sample_means.std())    # ~1/(sqrt(12) * sqrt(30)) ≈ 0.053

# Compare to normal
import matplotlib.pyplot as plt
import scipy.stats as stats
# stats.probplot(sample_means, dist='norm', plot=plt)  # nearly straight line

# CLT in one line
def standard_error(values):
    return values.std(ddof=1) / np.sqrt(len(values))

heights = np.random.normal(170, 10, size=100)
print(heights.mean(), standard_error(heights))   # ~170, ~1.0
```

## Applied

- **Polling**: a $1000$-person poll gives margin of error
  $\sim 3\%$ via CLT regardless of the population (provided it's
  much larger and the sampling is random).
- **A/B testing**: needed sample size scales as $1/\text{effect}^2$.
  To detect a $1\%$ effect needs $\sim 10\,000$ samples per arm.
- **Six-sigma manufacturing**: total defects per batch are
  $\text{Binomial} \approx \text{Normal}$ for large batches, with
  precise quantitative bounds.
- **Random number generators**: GPU shader code averages many
  cheap random calls to get high-quality normal-like distributions.

## Check Your Understanding

:::widget type=numeric-input prompt="A poll has $n = 2500$. Standard error $1/\\sqrt{2500} = ?$" answer=0.02 explain="$1/50 = 0.02 = 2\\%$.":::

:::widget type=numeric-input prompt="Same as above. To halve the margin of error, $n$ must change by what factor?" answer=4 explain="$n \\propto 1/\\text{ME}^2$. Halving $\\text{ME}$ requires $4 \\times$ more samples.":::

:::widget type=numeric-input prompt="$X \\sim$ unknown distribution with $\\mu = 5, \\sigma = 2$. Take $n = 100$ samples and average. Distribution of $\\bar X$ is approximately normal with mean $5$ and standard deviation...?" answer=0.2 explain="$\\sigma / \\sqrt n = 2/10 = 0.2$.":::

:::widget type=numeric-input prompt="$95\\%$ of sample means fall within how many standard errors of $\\mu$?" answer=2 explain="$1.96 \\approx 2$ — the 95% interval.":::
