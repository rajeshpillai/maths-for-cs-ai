---
strand: uncertainty
level: intermediate
order: 9
title: Capstone — Three Applied Statistical Problems
prerequisites:
  - tier: strand-6-uncertainty-intermediate
    slug: 08-significance-testing
    description: Significance testing
connections:
  - strand-6-uncertainty-foundation/09-applied-uncertainty
applications:
  - cs: "Real A/B test design, ML model comparison, ML metric reporting"
  - business: "Drug trials, marketing campaigns, manufacturing QC"
  - games: "Tested balance changes, retention experiments"
  - life: "Reading scientific claims critically"
---

# Capstone — Three Applied Statistical Problems

## Explain Like I Am 7

Now we point everything you've learned at real questions.  Did the
new website button colour really get more clicks, or was it just
luck?  Should an insurance company charge $\$200$ or $\$300$ for
this policy?  How big a survey do you need to know who'll win the
mayor election within $\pm 1\%$?  Each answer mixes random
variables, expected value, the central limit theorem, confidence
intervals, and p-values together — all the pieces you've collected
this whole strand, finally working as a team.

## Mental

Ten lessons in (Foundation + Intermediate combined): you can
recognise distributions, compute expected values and variances,
apply Bayes, use the CLT to bound sample-mean uncertainty, build
confidence intervals, and run significance tests.

Three integrated walkthroughs.

## Walkthrough 1: A/B testing done right

A SaaS company wants to know if button colour A or B leads to more
sign-ups. They run an experiment: $1000$ visitors see each variant.

- A: $52$ sign-ups out of $1000$ → $\hat p_A = 0.052$.
- B: $44$ sign-ups out of $1000$ → $\hat p_B = 0.044$.

Is the difference real or noise?

**Build a CI for the difference.** Standard error of $\hat p_A -
\hat p_B$:

$$
\text{SE} = \sqrt{\frac{\hat p_A (1 - \hat p_A)}{n_A} + \frac{\hat p_B (1 - \hat p_B)}{n_B}} \approx \sqrt{\frac{0.0493}{1000} + \frac{0.0421}{1000}} \approx 0.00956.
$$

$95\%$ CI for the true difference $p_A - p_B$:

$$
0.008 \pm 1.96 \cdot 0.00956 = 0.008 \pm 0.0187.
$$

Interval: $[-0.011, 0.027]$. **Includes zero** — so the data is
**consistent with no difference** at the $5\%$ level. The observed
$0.8\%$ improvement isn't statistically significant.

**Conclusion**: do not ship A. Either run longer (need ~$4 \times$
sample size to halve the noise) or accept that the difference
might be noise.

## Walkthrough 2: A diagnostic test

A blood test for a rare disease has:

- **Sensitivity** $P(+|\text{sick}) = 0.99$.
- **Specificity** $P(-|\text{healthy}) = 0.95$.

Disease prevalence: $0.5\%$. You test positive. What's $P(\text{sick})$?

By Bayes (Lesson 04):

$$
P(\text{sick}|+) = \frac{P(+|\text{sick}) P(\text{sick})}{P(+)}.
$$

$P(+) = 0.99 \cdot 0.005 + 0.05 \cdot 0.995 = 0.00495 + 0.04975 =
0.0547$.

$$
P(\text{sick}|+) = \frac{0.00495}{0.0547} \approx 0.0905.
$$

**About $9\%$.** Despite the test being "$99\%$ accurate," the **rare
disease + low specificity combination** means most positives are
false. The doctor will follow up with a confirmatory test.

A second positive (independent confirmation, sensitivity 0.99,
specificity 0.95) updates from $0.0905$ to:

$$
P(\text{sick}|+,+) = \frac{0.99 \cdot 0.0905}{0.99 \cdot 0.0905 + 0.05 \cdot 0.9095} \approx 0.663.
$$

After two positives, $66\%$. After three, $98\%+$. Compounding
evidence is how Bayesian diagnosis converges.

## Walkthrough 3: Sample size for a poll

A pollster wants to estimate election support to within $\pm 2\%$ at
$95\%$ confidence. How many people to survey?

The margin of error for a proportion is

$$
\text{ME} = 1.96 \sqrt{\frac{\hat p (1 - \hat p)}{n}} \le 1.96 \sqrt{\frac{0.25}{n}} = \frac{0.98}{\sqrt n}.
$$

(Worst-case ME at $\hat p = 0.5$.)

Solve for $n$ given $\text{ME} = 0.02$:

$$
n = \left(\frac{0.98}{0.02}\right)^2 = 49^2 = 2401.
$$

About $2400$ people. To halve the margin to $\pm 1\%$: $4 \times$
the sample, i.e. $9600$.

## Roadmap

**Strand 6 Advanced** introduces:

- **Bayesian inference proper**: priors and posteriors over
  continuous parameters, conjugate priors, MCMC.
- **t-distribution and t-tests**: small-sample corrections.
- **ANOVA** (analysis of variance): testing differences across
  multiple groups.
- **Regression**: linear, logistic, generalised linear models.
- **Causal inference**: confounding, randomisation, do-calculus.

**Strand 6 Master** continues with stochastic processes, Markov
chain Monte Carlo, advanced Bayesian computational methods, and
the math underpinning modern machine learning.

For now, you have **enough probability and statistics to read most
scientific papers critically**, design simple A/B tests properly,
interpret medical-test results without embarrassment, and avoid
the most common statistical errors.

## Check Your Understanding

:::widget type=numeric-input prompt="A/B test: 200 visitors per arm; $\\hat p_A = 0.10, \\hat p_B = 0.08$. SE for the difference $\\sqrt{0.09/200 + 0.0736/200} \\approx 0.029$. CI $0.02 \\pm 1.96 \\cdot 0.029 = ?$ — is $0$ in the interval? (1 yes, 0 no.)" answer=1 explain="$0.02 \\pm 0.057$ contains $0$. Not significant.":::

:::widget type=numeric-input prompt="$95\\%$ CI margin for proportion at $n = 1000$: $1.96 \\sqrt{0.25/1000} \\approx ?$ — round to 3 dp." answer=0.031 tolerance=0.005 explain="$\\sim 0.031$. Standard 'plus or minus 3%' polling.":::

:::widget type=numeric-input prompt="Sample size for $\\pm 1\\%$ at 95%? $n = (98/1)^2 = ?$ (Approximate.)" answer=9604 tolerance=10 explain="$\\approx 9600$.":::

:::widget type=numeric-input prompt="A diagnostic test has sensitivity 0.95 and specificity 0.95. Disease prevalence 1%. $P(\\text{sick}|+) = ?$ Round to 3 dp." answer=0.161 tolerance=0.005 explain="$P(+) = 0.95 \\cdot 0.01 + 0.05 \\cdot 0.99 = 0.059$. $P(\\text{sick}|+) = 0.0095/0.059 \\approx 0.161$.":::
