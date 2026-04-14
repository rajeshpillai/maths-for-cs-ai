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

## Connection to CS / Games / AI

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
