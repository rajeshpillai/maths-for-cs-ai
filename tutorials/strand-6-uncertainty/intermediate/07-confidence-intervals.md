---
strand: uncertainty
level: intermediate
order: 7
title: Confidence Intervals
prerequisites:
  - tier: strand-6-uncertainty-intermediate
    slug: 06-central-limit-theorem
    description: Central limit theorem
connections:
  - strand-6-uncertainty-intermediate/08-significance-testing
applications:
  - cs: "ML model performance ranges, A/B test result reporting"
  - business: "Survey results, financial-return ranges"
  - games: "Reporting tested win-rates"
  - life: "Reading polls, doctor's diagnostic intervals"
---

# Confidence Intervals

## Mental

A **confidence interval** is a range of values, computed from
sample data, that should contain the true population parameter
with a stated **confidence level** (typically $95\%$).

The classic example: a poll reports "candidate has $52\%$ support,
with margin of error $\pm 3\%$ at the $95\%$ confidence level."
This means: in $95\%$ of polls of this size with this method, the
true population proportion would fall between $49\%$ and $55\%$.

Important: it does **not** say "there is a $95\%$ probability the
true value is in this interval." Frequentist statistics treats the
true value as fixed (unknown but fixed); the **interval** is what's
random. Across many samples, $95\%$ of computed intervals will
contain the true value.

## The formula

For a sample mean $\bar X$ from a sample of size $n$, with sample
standard deviation $s$, the **$95\%$ confidence interval** for the
population mean $\mu$ is

$$
\bar X \pm 1.96 \frac{s}{\sqrt n}.
$$

The $1.96$ comes from the standard normal — it's the z-score with
$2.5\%$ in each tail. For $99\%$ CI, use $2.576$. For $90\%$, $1.645$.

For a **proportion** $\hat p$ from $n$ trials, the $95\%$ CI is

$$
\hat p \pm 1.96 \sqrt{\frac{\hat p (1 - \hat p)}{n}}.
$$

## Interactive

:::widget type=numeric-input prompt="Sample mean $\\bar X = 50$, $s = 10$, $n = 100$. Margin of error at $95\\%$: $1.96 \\cdot 10 / \\sqrt{100} = ?$" answer=1.96 explain="$1.96 \\cdot 1 = 1.96$. So 95% CI is $[48.04, 51.96]$.":::

:::widget type=numeric-input prompt="A poll reports $\\hat p = 0.52$, $n = 1000$. Margin of error: $1.96 \\sqrt{0.52 \\cdot 0.48 / 1000} \\approx ?$ — round to 3 dp." answer=0.031 tolerance=0.005 explain="$1.96 \\cdot \\sqrt{0.000250} \\approx 1.96 \\cdot 0.0158 = 0.031$. So $\\pm 3.1\\%$.":::

:::widget type=numeric-input prompt="$95\\%$ confidence: how many standard errors?" answer=1.96 tolerance=0.01 explain="The famous $z = 1.96$. Often rounded to $2$ in headlines.":::

:::widget type=numeric-input prompt="To narrow the margin of error from $\\pm 5\\%$ to $\\pm 1\\%$, multiply $n$ by what factor?" answer=25 explain="$n \\propto 1/\\text{ME}^2$. To divide ME by $5$, multiply $n$ by $25$.":::

## Symbolic

For a $(1 - \alpha) \cdot 100\%$ CI on a mean:

$$
\bar X \pm z_{\alpha/2} \cdot \frac{s}{\sqrt n},
$$

where $z_{\alpha/2}$ is the standard-normal quantile.

| Level | $z$ |
|---|---|
| $90\%$ | $1.645$ |
| $95\%$ | $1.960$ |
| $99\%$ | $2.576$ |

For small samples ($n < 30$ or so), use the **t-distribution** in
place of the normal — same formula but with a $t$-quantile that's
slightly larger than $z$ to account for using $s$ instead of true
$\sigma$. (Strand 6 Advanced.)

## Computational

```python
import numpy as np
import scipy.stats as stats

def confidence_interval(data, level=0.95):
    n = len(data)
    mean = data.mean()
    se = data.std(ddof=1) / np.sqrt(n)
    z = stats.norm.ppf(1 - (1 - level) / 2)
    return mean - z * se, mean + z * se

heights = np.random.normal(170, 10, size=100)
print(confidence_interval(heights))   # something like (168.0, 172.0)
```

## Applied

- **Election polling**: every reported "$\pm$" margin uses these
  formulas.
- **A/B testing**: reporting a CI for the difference between
  variants $A - B$ tells you whether the difference is likely
  positive or negative.
- **Medical drug trials**: phase-3 efficacy reports always include
  CIs for the treatment effect.
- **ML benchmark reporting**: serious papers report mean accuracy
  with CIs, not just point estimates.

## Check Your Understanding

:::widget type=numeric-input prompt="A poll of $n = 400$ people: $\\hat p = 0.6$. Margin at 95%: $1.96 \\sqrt{0.6 \\cdot 0.4 / 400} \\approx ?$ — round to 3 dp." answer=0.048 tolerance=0.005 explain="$1.96 \\cdot \\sqrt{0.0006} = 1.96 \\cdot 0.0245 \\approx 0.048$.":::

:::widget type=numeric-input prompt="Same survey, $n = 1600$ instead. New margin?" answer=0.024 tolerance=0.005 explain="Quadrupling $n$ halves margin: $0.048/2 = 0.024$.":::

:::widget type=numeric-input prompt="A study of $200$ patients: $\\bar X = 25$, $s = 5$. 95% CI for $\\mu$ is $25 \\pm ?$. Round to 3 dp." answer=0.693 tolerance=0.005 explain="$1.96 \\cdot 5 / \\sqrt{200} = 1.96 \\cdot 0.354 = 0.693$.":::

:::widget type=numeric-input prompt="A poll says '$45\\% \\pm 4\\%$ at 95%.' Approx $n$? (Assume $\\hat p \\approx 0.5$.)" answer=600 tolerance=100 explain="$0.04 = 1.96 \\sqrt{0.25/n} \\Rightarrow n = (1.96)^2 \\cdot 0.25 / 0.0016 \\approx 600$. Polls of 'plus or minus 4%' typically use $n \\approx 600$.":::
