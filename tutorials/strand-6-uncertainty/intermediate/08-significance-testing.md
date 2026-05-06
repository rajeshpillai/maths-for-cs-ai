---
strand: uncertainty
level: intermediate
order: 8
title: Significance Testing — p-values
prerequisites:
  - tier: strand-6-uncertainty-intermediate
    slug: 07-confidence-intervals
    description: Confidence intervals
connections:
  - strand-6-uncertainty-intermediate/09-applied-statistics
applications:
  - cs: "A/B test conclusions, model performance comparisons"
  - business: "Drug efficacy claims, treatment-effect comparisons"
  - games: "Balance-change effects on metrics"
  - life: "Medical trial outcomes, scientific claims"
---

# Significance Testing — p-values

## Explain Like I Am 7

Suppose you flip a coin $100$ times and get $60$ heads.  Is the
coin really biased, or did you just get lucky?  Significance
testing asks: "*if* the coin were perfectly fair, how surprised
would I be to see at least $60$ heads?"  That surprisal-number is
the **p-value**.  If it's tiny — like $1\%$ — you reject the "fair
coin" idea, because the result was too unlikely.  If it's big, you
shrug and say "could be chance."  This is how scientists decide
whether new medicines actually work.

## Mental

You have a hypothesis. You run an experiment. The experiment gives a
result that **could** have happened by chance, or could reflect a
real effect.

**Significance testing** asks: assuming there's no real effect, how
unlikely is the observed result?

The framework:

- **Null hypothesis** $H_0$: "there is no effect" (or "the
  difference is zero" or "$\mu = \mu_0$").
- **Alternative hypothesis** $H_1$: "there is an effect."
- **Test statistic**: a number computed from data (e.g. sample mean,
  z-score).
- **p-value**: the probability of observing data this extreme **if
  $H_0$ were true**.

If the p-value is below a chosen threshold $\alpha$ (typically
$0.05$), we **reject $H_0$** and call the result "statistically
significant."

## A worked example

A coin is suspected to be biased. You flip it $100$ times and get
$60$ heads. Is this evidence of bias?

**Null hypothesis**: $H_0$: $p = 0.5$ (fair coin).
**Test statistic**: $z = \frac{X - n p}{\sqrt{n p (1-p)}} = \frac{60 - 50}{5} = 2$.

By the CLT, under $H_0$, $z \sim N(0, 1)$ approximately. The two-sided
p-value is

$$
P(|Z| \ge 2) = 2 \cdot 0.0228 \approx 0.046.
$$

Below $0.05$ — **reject $H_0$**. The coin probably isn't fair.

## Key warnings

- **p-value is NOT $P(H_0 | \text{data})$**. It's
  $P(\text{data} | H_0)$ — backwards from what most people interpret.
- **Statistical significance ≠ practical importance**. A
  microscopic effect at $n = 10\,000\,000$ samples is statistically
  significant but might not matter.
- **Multiple testing**: testing many hypotheses with $\alpha = 0.05$
  produces some false positives. (Bonferroni correction:
  $\alpha / k$ for $k$ tests.)
- **Replication**: a single significant result is weak evidence;
  replication across studies is the real standard.

## Interactive

:::widget type=numeric-input prompt="A coin: $60$ heads in $100$ flips. Z-score: $(60 - 50)/5 = ?$" answer=2 explain="$10/5 = 2$. Two SDs above expected.":::

:::widget type=numeric-input prompt="Two-sided p-value for $|z| \\ge 2$: roughly $2 \\cdot 0.025 = ?$" answer=0.05 explain="$\\sim 0.046$. Right at the conventional threshold.":::

:::widget type=numeric-input prompt="$\\alpha = 0.05$: rejection region is $|z| > z_{0.025} \\approx 1.96$. Is $z = 2$ in the rejection region? (1 yes, 0 no.)" answer=1 explain="Yes, $2 > 1.96$. Reject $H_0$.":::

:::widget type=numeric-input prompt="A drug trial: $\\bar X = 5$ mmHg blood pressure reduction with $\\sigma_{\\bar X} = 2$. Z-score for null '$\\mu = 0$' is $5/2 = ?$" answer=2.5 explain="$2.5$. P-value ≈ 0.012, significant at $\\alpha = 0.05$.":::

## Symbolic

A **z-test** for the mean assumes $X \sim N(\mu, \sigma^2/n)$ under
$H_0: \mu = \mu_0$. Test statistic:

$$
z = \frac{\bar X - \mu_0}{\sigma / \sqrt n}.
$$

P-value (two-sided): $p = 2 \cdot P(Z \ge |z|)$.

For unknown $\sigma$, use the **t-test** with sample SD $s$ in place
of $\sigma$ — and the t-distribution for the p-value (Strand 6
Advanced).

For comparing **two means** (e.g. A/B test):

$$
z = \frac{\bar X_A - \bar X_B}{\sqrt{\sigma_A^2/n_A + \sigma_B^2/n_B}}.
$$

## Computational

```python
import scipy.stats as stats

# Z-test for mean
def z_test(sample_mean, mu0, sigma, n):
    z = (sample_mean - mu0) / (sigma / n ** 0.5)
    p = 2 * (1 - stats.norm.cdf(abs(z)))
    return z, p

print(z_test(60/100, 0.5, 0.5, 100))   # z ≈ 2, p ≈ 0.046

# Two-sample test
def two_sample_z(mean_A, mean_B, sd_A, sd_B, n_A, n_B):
    se = (sd_A**2 / n_A + sd_B**2 / n_B) ** 0.5
    z = (mean_A - mean_B) / se
    p = 2 * (1 - stats.norm.cdf(abs(z)))
    return z, p

# A: 5% conversion in 1000 visitors. B: 4% conversion.
print(two_sample_z(0.05, 0.04, 0.218, 0.196, 1000, 1000))
# z ≈ 1.07, p ≈ 0.28 — NOT significant at 5%
```

## Applied

- **Drug efficacy**: phase-3 trials must show statistical
  significance for FDA approval.
- **A/B testing**: SaaS companies run thousands of tests; a
  rigorous framework avoids false-positive deployment of
  no-effect changes.
- **Scientific publishing**: most journals require $p < 0.05$ for
  publication, leading to **publication bias** and the **replication
  crisis** in social science.

## Check Your Understanding

:::widget type=numeric-input prompt="If $z = 1.5$ in a two-sided test, p-value $\\approx 2 \\cdot P(Z \\ge 1.5)$. $P(Z \\ge 1.5) \\approx 0.067$. So p-value $\\approx ?$" answer=0.13 tolerance=0.01 explain="$0.13$. Not significant at 0.05.":::

:::widget type=numeric-input prompt="If you run $20$ independent tests at $\\alpha = 0.05$ with no real effects, expected number of false positives?" answer=1 explain="$20 \\cdot 0.05 = 1$. (This is why correction for multiple testing is needed.)":::

:::widget type=numeric-input prompt="Bonferroni correction for $20$ tests: use $\\alpha = ?$ per test." answer=0.0025 explain="$0.05 / 20 = 0.0025$. Conservative but valid.":::

:::widget type=numeric-input prompt="A test gives $p = 0.001$. Reject $H_0$ at $\\alpha = 0.01$? (1 yes, 0 no.)" answer=1 explain="$0.001 < 0.01$. Reject.":::
