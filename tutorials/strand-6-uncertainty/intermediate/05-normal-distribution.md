---
strand: uncertainty
level: intermediate
order: 5
title: The Normal Distribution
prerequisites:
  - tier: strand-6-uncertainty-intermediate
    slug: 02-binomial-distribution
    description: Binomial distribution
connections:
  - strand-6-uncertainty-intermediate/06-central-limit-theorem
applications:
  - cs: "Floating-point error distributions, ML model assumptions"
  - business: "Quality control, financial returns"
  - games: "Stat distributions across players"
  - life: "Heights, IQ scores, measurement errors, exam scores"
---

# The Normal Distribution

## Explain Like I Am 7

Measure the heights of every kid in a giant school and plot how
many kids fall in each height bucket.  You'll see a fat hump in
the middle, with thinner tails on each side — the famous
**bell curve**.  This shape, called the **normal distribution**,
shows up everywhere: test scores, measurement errors, blood
pressure, daily stock-market wobbles.  About $68\%$ of values sit
within one wobble-step of the average and almost everyone is
within three wobble-steps.  It's nature's favourite shape for
randomness.

## Mental

The **normal distribution** (also called **Gaussian** or "bell
curve") is the most important continuous distribution in
mathematics. Its pdf:

$$
f(x) = \frac{1}{\sigma \sqrt{2\pi}} \exp\!\left(-\frac{(x - \mu)^2}{2 \sigma^2}\right).
$$

Two parameters: mean $\mu$, standard deviation $\sigma$. We write $X
\sim N(\mu, \sigma^2)$.

The classic shape: symmetric bell, centered at $\mu$, falling off
exponentially. The standard normal has $\mu = 0, \sigma = 1$ — denoted
$Z \sim N(0, 1)$.

The famous **68-95-99.7 rule** (empirical rule):

- $\sim 68\%$ of values within $1\sigma$ of $\mu$.
- $\sim 95\%$ within $2\sigma$.
- $\sim 99.7\%$ within $3\sigma$.

## Why so important

The normal distribution shows up in **astonishingly many places**:

- Heights of adults in a population
- Test scores
- Measurement errors
- Sums and averages of many small independent random effects
- Random walks at long times

The reason: the **central limit theorem** (next lesson) — the average
of any independent random variables, as you take more, converges to
a normal distribution.

This is why the bell curve is everywhere: most "real" quantities are
sums or averages of many small independent contributions.

## Standardisation (z-scores)

Any normal $X \sim N(\mu, \sigma^2)$ can be transformed to standard
normal:

$$
Z = \frac{X - \mu}{\sigma} \sim N(0, 1).
$$

The **z-score** of $X$ tells you how many standard deviations $X$ is
from the mean. A z-score of $+2$ means $X$ is two $\sigma$'s above
average — about the $97.5$-th percentile.

## Interactive

:::widget type=numeric-input prompt="$X \\sim N(50, 100)$ ($\\mu = 50, \\sigma = 10$). What is the z-score of $X = 70$?" answer=2 explain="$z = (70 - 50)/10 = 2$. Two standard deviations above the mean.":::

:::widget type=numeric-input prompt="Continuing: roughly what percentile is $X = 70$? (Use 68-95-99.7.)" answer=97.5 tolerance=1 explain="$z = 2 \\Rightarrow \\sim 97.5\\%$ percentile (2.5% in the upper tail).":::

:::widget type=numeric-input prompt="Adult male heights are roughly $N(178, 8^2)$ (mean 178cm, $\\sigma = 8$cm). What proportion is between 162cm and 194cm?" answer=0.95 tolerance=0.05 explain="$162 = 178 - 16 = \\mu - 2\\sigma$. $194 = \\mu + 2\\sigma$. $\\sim 95\\%$ within $2\\sigma$.":::

:::widget type=numeric-input prompt="$P(Z > 1.96)$ for standard normal — the famous tail. Round to 3 dp." answer=0.025 explain="$1.96$ is the 97.5-th percentile of $N(0, 1)$. Tail = 1 - 0.975 = 0.025.":::

## Symbolic

$X \sim N(\mu, \sigma^2)$:

$$
f_X(x) = \frac{1}{\sigma \sqrt{2\pi}} e^{-(x-\mu)^2/(2\sigma^2)}, \quad E[X] = \mu, \quad \text{Var}(X) = \sigma^2.
$$

CDF: no closed form. Tabulated as $\Phi(z) = P(Z \le z)$.

Key percentiles of $N(0, 1)$:

| Percentile | $z$ |
|---|---|
| $50\%$ | $0$ |
| $84.13\%$ | $1$ |
| $97.5\%$ | $1.96$ |
| $99\%$ | $2.326$ |
| $99.5\%$ | $2.576$ |
| $99.95\%$ | $3.291$ |

The $1.96$ value appears constantly in statistics — the **two-sided
$95\%$ confidence interval** uses it.

## Computational

```python
import scipy.stats as stats
import numpy as np

# Standard normal PDF and CDF
print(stats.norm.pdf(0))           # 0.3989 (peak density)
print(stats.norm.cdf(0))           # 0.5 (median)
print(stats.norm.cdf(1.96))        # 0.975
print(stats.norm.cdf(2) - stats.norm.cdf(-2))   # 0.954 — within 2σ

# Custom mean/std
X = stats.norm(loc=178, scale=8)   # height distribution
print(X.cdf(194) - X.cdf(162))     # 0.954 — same 95% rule

# Sampling
samples = stats.norm.rvs(loc=178, scale=8, size=10_000)
print(samples.mean(), samples.std())   # near 178, 8
```

## Applied

- **Quality control**: 6-sigma manufacturing requires defect rates
  below 3.4 per million — derived from normal-tail probabilities.
- **Financial returns**: short-term stock returns are roughly normal
  (with fat tails on extreme events). Risk metrics like Value at
  Risk use normal approximations.
- **Hypothesis testing**: most common $z$-tests assume normality.
- **ML loss landscapes**: many loss functions (e.g. MSE) implicitly
  assume normal noise.

## Check Your Understanding

:::widget type=numeric-input prompt="A test score is $N(70, 10^2)$. Z-score for a student scoring $90$?" answer=2 explain="$(90 - 70)/10 = 2$.":::

:::widget type=numeric-input prompt="Approximate proportion above $z = 2$?" answer=0.025 explain="$\\sim 2.5\\%$ in the upper tail. (1 - 97.5%.)":::

:::widget type=numeric-input prompt="What's $\\Phi^{-1}(0.5)$ — the median z-score?" answer=0 explain="The standard normal is symmetric around 0.":::

:::widget type=numeric-input prompt="68-95-99.7: percentage within $1\\sigma$?" answer=68 explain="68% within 1 standard deviation.":::
