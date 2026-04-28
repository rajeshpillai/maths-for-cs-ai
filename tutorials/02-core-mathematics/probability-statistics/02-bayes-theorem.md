# Conditional Probability and Bayes' Theorem

## Intuition

**Conditional probability** asks: "Given that I know something happened, how
does that change the probability of something else?"  **Bayes' Theorem**
flips the direction: if you know $P(\text{symptom}|\text{disease})$, it tells
you $P(\text{disease}|\text{symptom})$.  It's the mathematical foundation of
spam filters, medical diagnosis, and Bayesian machine learning.

## Prerequisites

- Tier 4, Lesson 1: Probability Axioms (events, independence)

## From First Principles

### Conditional probability

$$P(A|B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$

Read: "probability of A, given B."

**Pen & paper:** Roll a die.  $A$ = "roll a 6", $B$ = "roll even" = $\{2, 4, 6\}$.

$$P(A|B) = \frac{P(\{6\})}{P(\{2,4,6\})} = \frac{1/6}{3/6} = \frac{1}{3}$$

Knowing the roll is even reduces the sample space to 3 outcomes.

### Multiplication rule

Rearranging: $P(A \cap B) = P(A|B) \cdot P(B) = P(B|A) \cdot P(A)$

**Pen & paper:** Bag with 5 red, 3 blue.  Draw 2 without replacement.

$P(\text{1st red}) = 5/8$

$P(\text{2nd red} | \text{1st red}) = 4/7$

$P(\text{both red}) = (5/8)(4/7) = 20/56 = 5/14 \approx 0.357$

### Law of total probability

If $B_1, B_2, \ldots, B_n$ partition $\Omega$:

$$P(A) = \sum_{i=1}^{n} P(A|B_i) P(B_i)$$

**Pen & paper:** A factory has 2 machines.  Machine 1 makes 60% of products (3% defect rate).  Machine 2 makes 40% (5% defect rate).

$P(\text{defect}) = P(D|M_1)P(M_1) + P(D|M_2)P(M_2)$
$= 0.03 \times 0.60 + 0.05 \times 0.40$
$= 0.018 + 0.020 = 0.038$

3.8% overall defect rate.

### Bayes' Theorem

$$P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}$$

Or with the law of total probability in the denominator:

$$P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B|A) \cdot P(A) + P(B|\overline{A}) \cdot P(\overline{A})}$$

### Deriving Bayes' Theorem (pen & paper)

Start from: $P(A \cap B) = P(A|B) \cdot P(B) = P(B|A) \cdot P(A)$

Solve for $P(A|B)$:

$$P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}$$

That's it. $\square$

### Pen & paper: Medical test

- Disease prevalence: $P(D) = 0.01$ (1 in 100)
- Test sensitivity: $P(+|D) = 0.99$ (catches 99% of sick people)
- Test specificity: $P(-|\overline{D}) = 0.95$ → $P(+|\overline{D}) = 0.05$ (5% false positive)

**Question:** You test positive.  What is $P(D|+)$?

$P(+) = P(+|D)P(D) + P(+|\overline{D})P(\overline{D})$
$= 0.99 \times 0.01 + 0.05 \times 0.99$
$= 0.0099 + 0.0495 = 0.0594$

$$P(D|+) = \frac{0.99 \times 0.01}{0.0594} = \frac{0.0099}{0.0594} \approx 0.167$$

**Only 16.7%!**  Despite a 99% sensitive test, most positives are false
positives because the disease is rare.  This is called the **base rate fallacy**.

### Pen & paper: Which machine made the defective product?

From the factory example, a product is defective.  Which machine made it?

$$P(M_1|D) = \frac{P(D|M_1)P(M_1)}{P(D)} = \frac{0.03 \times 0.60}{0.038} = \frac{0.018}{0.038} \approx 0.474$$

$$P(M_2|D) = \frac{0.05 \times 0.40}{0.038} = \frac{0.020}{0.038} \approx 0.526$$

Machine 2 is slightly more likely — it has a higher defect rate despite lower volume.

### Bayesian terminology

| Term | Symbol | Meaning |
|------|--------|---------|
| Prior | $P(A)$ | Belief before seeing evidence |
| Likelihood | $P(B|A)$ | How probable the evidence is, given the hypothesis |
| Evidence | $P(B)$ | Total probability of the evidence |
| Posterior | $P(A|B)$ | Updated belief after seeing evidence |

$$\text{Posterior} = \frac{\text{Likelihood} \times \text{Prior}}{\text{Evidence}}$$

## Python Verification

```python
# ── Bayes' Theorem: verifying pen & paper work ──────────────

# Die roll: P(6 | even)
print("=== Conditional: P(6 | even) ===")
p_six_and_even = 1/6
p_even = 3/6
print(f"P(6 | even) = {p_six_and_even / p_even:.4f}")

# Two draws without replacement
print(f"\n=== Both red from 5R+3B ===")
p_both_red = (5/8) * (4/7)
print(f"P(both red) = {p_both_red:.4f} = {5*4}/{8*7} = 5/14")

# Factory defect
print(f"\n=== Factory defect ===")
p_d_m1, p_m1 = 0.03, 0.60
p_d_m2, p_m2 = 0.05, 0.40
p_d = p_d_m1 * p_m1 + p_d_m2 * p_m2
print(f"P(defect) = {p_d:.4f}")
print(f"P(M1|defect) = {p_d_m1 * p_m1 / p_d:.4f}")
print(f"P(M2|defect) = {p_d_m2 * p_m2 / p_d:.4f}")

# Medical test (base rate fallacy)
print(f"\n=== Medical test ===")
p_disease = 0.01
p_pos_disease = 0.99
p_pos_healthy = 0.05

p_pos = p_pos_disease * p_disease + p_pos_healthy * (1 - p_disease)
p_disease_pos = (p_pos_disease * p_disease) / p_pos

print(f"P(+) = {p_pos:.4f}")
print(f"P(disease | +) = {p_disease_pos:.4f}")
print(f"Surprise: only {p_disease_pos:.1%} chance of disease despite positive test!")

# Simulation: verify Bayes with 1M people
print(f"\n=== Simulation: 1M people ===")
population = 1_000_000
sick = int(population * p_disease)
healthy = population - sick
true_pos = int(sick * p_pos_disease)
false_pos = int(healthy * p_pos_healthy)
total_pos = true_pos + false_pos
print(f"Sick: {sick}, Healthy: {healthy}")
print(f"True positives: {true_pos}, False positives: {false_pos}")
print(f"P(disease | +) = {true_pos}/{total_pos} = {true_pos/total_pos:.4f}")
```

## Visualisation — Why a positive test is *not* a diagnosis

The single most counterintuitive result in basic probability: a 99%-accurate
test for a 1-in-1000 disease gives a **positive result that is wrong about
91% of the time**. The picture shows why.

```python
# ── Visualising Bayes' theorem with a population square ─────
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle

# Scenario from the lesson:
N        = 10000      # 10,000 people in the population
p_dis    = 0.001      # prior: 1 in 1,000 actually has the disease
p_pos_d  = 0.99       # sensitivity: P(test+ | sick)  = 0.99
p_pos_h  = 0.05       # 1 − specificity: P(test+ | healthy) = 0.05

# Counts in each of four boxes (the contingency table).
sick           = int(N * p_dis)
healthy        = N - sick
true_positive  = int(round(sick    * p_pos_d))
false_negative = sick - true_positive
false_positive = int(round(healthy * p_pos_h))
true_negative  = healthy - false_positive

posterior = true_positive / (true_positive + false_positive)

fig, axes = plt.subplots(1, 2, figsize=(14, 5.5))

# (1) Population square — area-proportional. Four rectangles
# (sick/healthy × test+/test-) tile the unit square. The blue
# region is "tested positive". Inside the blue, the dark portion
# is the *correct* diagnoses; the lighter portion is false alarms.
ax = axes[0]
sick_frac    = sick    / N
healthy_frac = healthy / N
# Layout: leftmost column = sick (very thin), rightmost = healthy (almost the whole width)
ax.add_patch(Rectangle((0, 0), sick_frac, p_pos_d,
                       color="darkred",   alpha=0.85, label="True positive (sick & test +)"))
ax.add_patch(Rectangle((0, p_pos_d), sick_frac, 1 - p_pos_d,
                       color="lightgrey", alpha=0.85, label="False negative (sick & test −)"))
ax.add_patch(Rectangle((sick_frac, 0), healthy_frac, p_pos_h,
                       color="salmon",    alpha=0.85, label="False positive (healthy & test +)"))
ax.add_patch(Rectangle((sick_frac, p_pos_h), healthy_frac, 1 - p_pos_h,
                       color="lightgreen", alpha=0.85, label="True negative (healthy & test −)"))
ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.set_aspect("equal")
ax.set_xlabel("Population (left strip = sick, right block = healthy)")
ax.set_ylabel("Conditional outcome of the test")
ax.set_title(f"Population of {N:,}: each box is area-proportional\n"
             f"(left strip is only {sick_frac*100:.2f}% wide!)")
ax.legend(loc="lower right", fontsize=8)

# (2) The bar of "everyone who tested positive". The split between
# dark and light bars IS the posterior P(disease | test +).
ax = axes[1]
labels = ["Truly sick\nand tested +", "Healthy\nbut tested + (false alarm)"]
counts = [true_positive, false_positive]
colors = ["darkred", "salmon"]
bars   = ax.bar(labels, counts, color=colors, alpha=0.85)
for bar, n in zip(bars, counts):
    ax.text(bar.get_x() + bar.get_width()/2, n + max(counts)*0.02,
            f"{n} people", ha="center", fontsize=11, fontweight="bold")
total_pos = true_positive + false_positive
ax.set_title(f"Of the {total_pos} people who tested positive,\n"
             f"only {true_positive} ({posterior*100:.1f}%) are actually sick")
ax.set_ylabel(f"count (out of {total_pos} positives)")

plt.tight_layout()
plt.show()

# Print the four-cell contingency table that mirrors the picture.
print(f"{'':>20}  test +   test −     row total")
print(f"{'sick':>20}  {true_positive:>5}    {false_negative:>5}     {sick:>5}")
print(f"{'healthy':>20}  {false_positive:>5}    {true_negative:>5}     {healthy:>5}")
print(f"{'col total':>20}  {true_positive + false_positive:>5}    "
      f"{false_negative + true_negative:>5}     {N:>5}")
print()
print(f"P(disease | test+) = {true_positive} / ({true_positive} + {false_positive})"
      f" = {posterior:.4f}  ≈  {posterior*100:.1f}%")
print("Even with a 99% accurate test, most positives are false alarms")
print("because the disease is rare (low prior) and the population is huge.")
```

**Why this picture matters:**

- The left plot makes the *prior* visible as a width — sick people are
  only 0.1% of the population, so their column is *invisibly thin*. The
  test sensitivity of 99% is the height of the dark-red strip inside
  that thin column, which is *also tiny*.
- Meanwhile the 5% false-positive rate, multiplied by the huge healthy
  block, produces a much larger pink area — there are simply more
  *opportunities* to misclassify a healthy person.
- The right plot is the **posterior** $P(\text{disease} \mid +)$ as a
  bar split: out of every 100 positive results, only ~9 are true. The
  Bayes formula

  $$P(D \mid +) = \frac{P(+ \mid D)\,P(D)}{P(+)}$$

  isn't algebra trickery — it's just *(red area) / (red + pink area)*.
- This is **why doctors order confirmatory tests** for low-prevalence
  diseases. Each new positive test multiplies the posterior odds by the
  same likelihood ratio, dragging the belief from "probably wrong" to
  "almost certainly right" only after several confirmations.

## Connection to CS / Games / AI / Business / Industry

- **Spam filters** — Naive Bayes: $P(\text{spam}|\text{words}) \propto P(\text{words}|\text{spam})P(\text{spam})$
- **Medical AI** — diagnostic systems use Bayes' theorem with test results as evidence
- **Bayesian inference** — update beliefs as new data arrives (online learning)
- **Bayesian neural networks** — place probability distributions over weights
- **A/B testing** — Bayesian A/B tests compute $P(\text{B better}|\text{data})$
- **Game AI** — update probability of enemy position given observed clues

## Check Your Understanding

1. **Pen & paper:** A deck has 52 cards.  You draw 2 cards.  Given the first is a king, what is $P(\text{second is a king})$?
2. **Pen & paper:** 70% of emails are spam.  $P(\text{"free"}|\text{spam}) = 0.8$, $P(\text{"free"}|\text{not spam}) = 0.1$.  An email contains "free".  What is $P(\text{spam}|\text{"free"})$?
3. **Pen & paper:** Re-do the medical test problem with $P(D) = 0.10$ instead of 0.01.  How does a higher prevalence change $P(D|+)$?
4. **Think about it:** Why is the base rate fallacy dangerous in AI systems used for rare-event detection (fraud, terrorism screening)?
