---
strand: uncertainty
level: intermediate
order: 4
title: Bayes' Theorem
prerequisites:
  - tier: strand-6-uncertainty-foundation
    slug: 07-conditional-probability-intuition
    description: Conditional probability intuition
connections:
  - strand-6-uncertainty-intermediate/05-normal-distribution
applications:
  - cs: "Spam filters, naive Bayes classifiers, recommender systems"
  - business: "Diagnostic tests, A/B test interpretation, customer churn prediction"
  - games: "Inferring opponent strategy from observed moves"
  - life: "Medical-test interpretation, courtroom evidence reasoning"
---

# Bayes' Theorem

## Explain Like I Am 7

Suppose a rare disease affects $1$ in $1000$ people, and the test
for it gets $99\%$ of cases right.  If your test comes back
positive, are you almost certainly sick?  Surprisingly, no — you're
probably *fine*.  The reason is that the test is also wrong $1\%$ of
the time on the many *healthy* people, and there are far more
healthy people to be wrong about.  **Bayes' theorem** is the
careful arithmetic that updates your belief properly: it weighs
the test result against how rare the disease was *before* the test.

## Mental

Strand 6 Foundation Lesson 07 introduced conditional probability and
gave a worked example of the medical-test paradox. **Bayes' theorem**
formalises the **flipping** of conditional probabilities — going
from "$P(\text{evidence} | \text{cause})$" to
"$P(\text{cause} | \text{evidence})$":

$$
P(A | B) = \frac{P(B | A) \cdot P(A)}{P(B)}.
$$

In words:

$$
P(\text{cause given evidence}) = \frac{P(\text{evidence given cause}) \times P(\text{cause})}{P(\text{evidence})}.
$$

**This is the calculus of belief**: how to update what you think
about a hypothesis $A$ given new evidence $B$.

The components have names:

- $P(A)$ — **prior**: how likely $A$ was before seeing evidence.
- $P(B | A)$ — **likelihood**: how likely the evidence is, given $A$.
- $P(B)$ — **marginal**: total probability of the evidence.
- $P(A | B)$ — **posterior**: updated belief after seeing evidence.

The **denominator** $P(B)$ can be computed by total probability:

$$
P(B) = P(B | A) P(A) + P(B | \text{not } A) P(\text{not } A).
$$

## The medical test, redone

Recall: disease prevalence $1\%$, test $99\%$ sensitive, $99\%$
specific. You test positive — what's $P(\text{sick})$?

$$
P(\text{sick} | +) = \frac{P(+ | \text{sick}) P(\text{sick})}{P(+)} = \frac{0.99 \cdot 0.01}{P(+)}.
$$

The marginal $P(+) = 0.99 \cdot 0.01 + 0.01 \cdot 0.99 = 0.0198$
(true positives + false positives).

$$
P(\text{sick} | +) = \frac{0.0099}{0.0198} = 0.5.
$$

Same $50\%$ answer. Bayes' theorem made it formula-mechanical.

## Interactive

:::widget type=numeric-input prompt="Apply Bayes: $P(A) = 0.4$, $P(B | A) = 0.7$, $P(B | \\text{not } A) = 0.2$. Compute $P(B) = 0.7 \\cdot 0.4 + 0.2 \\cdot 0.6 = ?$" answer=0.4 explain="$0.28 + 0.12 = 0.40$.":::

:::widget type=numeric-input prompt="Continuing: $P(A | B) = (0.7 \\cdot 0.4) / 0.4 = ?$" answer=0.7 explain="$0.28 / 0.4 = 0.7$. The posterior moved from $0.4$ to $0.7$ — evidence shifted belief toward $A$.":::

:::widget type=numeric-input prompt="Spam filter: $P(\\text{spam}) = 0.3$. Word 'free': $P(\\text{free} | \\text{spam}) = 0.5$, $P(\\text{free} | \\text{not spam}) = 0.05$. Email contains 'free' — compute $P(\\text{spam} | \\text{free})$. Round to 3 dp." answer=0.811 tolerance=0.005 explain="Bayes: $\\frac{0.5 \\cdot 0.3}{0.5 \\cdot 0.3 + 0.05 \\cdot 0.7} = \\frac{0.15}{0.185} \\approx 0.811$.":::

:::widget type=step-revealer
{
  "title": "A repeated Bayesian update",
  "steps": [
    {"prose": "Suppose 1 in 1000 emails is spam. A filter learns: $P(\\text{free} | \\text{spam}) = 0.5$, $P(\\text{free} | \\text{not spam}) = 0.01$."},
    {"prose": "Email arrives containing 'free.' Compute $P(\\text{spam} | \\text{free})$."},
    {"math": "P(\\text{spam}) = 0.001, \\quad P(\\text{not spam}) = 0.999", "prose": "Prior."},
    {"math": "P(\\text{free}) = 0.5 \\cdot 0.001 + 0.01 \\cdot 0.999 \\approx 0.01049", "prose": "Marginal probability of the evidence."},
    {"math": "P(\\text{spam} | \\text{free}) = \\frac{0.0005}{0.01049} \\approx 0.0476", "prose": "Posterior. Despite 'free' being 50× more common in spam, the prior was so low that the posterior is still under 5%."},
    {"prose": "**Now combine multiple words**: 'free' AND 'click here.' If both are independent given spam status, the likelihood multiplies, sharpening the posterior dramatically. This is **naive Bayes** — the simplest spam classifier."}
  ]
}
:::

## Symbolic

Bayes' theorem:

$$
P(A | B) = \frac{P(B | A) P(A)}{P(B)}.
$$

For a partition of hypotheses $\{A_1, A_2, \ldots, A_n\}$ (mutually
exclusive, exhaustive), the **law of total probability** gives the
denominator:

$$
P(B) = \sum_{i=1}^n P(B | A_i) P(A_i).
$$

So the **multi-hypothesis Bayes' theorem**:

$$
P(A_i | B) = \frac{P(B | A_i) P(A_i)}{\sum_j P(B | A_j) P(A_j)}.
$$

## Computational

```python
def bayes(prior_A, likelihood_B_given_A, likelihood_B_given_not_A):
    """Single-hypothesis Bayes for two-state world."""
    p_B = likelihood_B_given_A * prior_A + likelihood_B_given_not_A * (1 - prior_A)
    return likelihood_B_given_A * prior_A / p_B

# Spam example
print(bayes(prior_A=0.001,
            likelihood_B_given_A=0.5,
            likelihood_B_given_not_A=0.01))   # 0.0476
```

For multiple hypotheses (e.g. 3 candidate diseases), generalise:

```python
def bayes_multi(priors, likelihoods):
    p_B = sum(p * l for p, l in zip(priors, likelihoods))
    return [(p * l) / p_B for p, l in zip(priors, likelihoods)]

# 3 diseases, equal prior, different test sensitivities
print(bayes_multi([1/3, 1/3, 1/3], [0.9, 0.5, 0.1]))   # [0.6, 0.333, 0.067]
```

## Applied

- **Spam filtering**: every modern spam filter uses Bayesian
  reasoning. Naive Bayes assumes word-independence given spam status
  — wrong but useful.
- **Medical diagnosis**: clinical decision support tools chain Bayesian
  updates over multiple test results.
- **Search and rescue**: Bayesian search theory was used to find
  Air France 447 (2009) and the USS Scorpion (1968).
- **Self-driving cars**: combining sensor inputs (cameras, lidar)
  uses Bayesian sensor fusion.
- **Forensics**: courts increasingly need Bayesian reasoning to
  weigh DNA evidence — the **prosecutor's fallacy** is a famous
  example of mishandling base rates.

## Check Your Understanding

:::widget type=numeric-input prompt="$P(A) = 0.5$, $P(B|A) = 1$, $P(B|\\text{not } A) = 0.5$. $P(A | B)$? — round to 3 dp." answer=0.667 tolerance=0.005 explain="$P(B) = 0.5 + 0.25 = 0.75$. $P(A|B) = 0.5/0.75 = 2/3 \\approx 0.667$.":::

:::widget type=numeric-input prompt="A test has $P(+|\\text{sick}) = 0.9$, $P(+|\\text{healthy}) = 0.05$. Disease prevalence $= 0.1$. $P(\\text{sick} | +)$? Round to 3 dp." answer=0.667 tolerance=0.005 explain="$P(+) = 0.9 \\cdot 0.1 + 0.05 \\cdot 0.9 = 0.135$. $P(\\text{sick}|+) = 0.09/0.135 \\approx 0.667$.":::

:::widget type=numeric-input prompt="Higher prevalence (50%, equal priors). Same test. $P(\\text{sick} | +)$? Round to 3 dp." answer=0.947 tolerance=0.005 explain="$P(+) = 0.9 \\cdot 0.5 + 0.05 \\cdot 0.5 = 0.475$. $P(\\text{sick}|+) = 0.45/0.475 \\approx 0.947$.":::

:::widget type=numeric-input prompt="A coin is fair ($p = 0.5$, prior $50\\%$) or biased ($p = 0.9$, prior $50\\%$). You flip $1$ heads. Posterior $P(\\text{biased} | \\text{heads}) = ?$ Round to 3 dp." answer=0.643 tolerance=0.005 explain="$P(\\text{heads}) = 0.5 \\cdot 0.5 + 0.5 \\cdot 0.9 = 0.7$. $P(\\text{biased}|H) = 0.45/0.7 \\approx 0.643$. One observation moved the prior from 0.5 to 0.643.":::
