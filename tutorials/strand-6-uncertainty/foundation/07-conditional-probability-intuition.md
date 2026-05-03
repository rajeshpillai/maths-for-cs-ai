---
strand: uncertainty
level: foundation
order: 7
title: Conditional Probability — "Given That…"
prerequisites:
  - tier: strand-6-uncertainty-foundation
    slug: 05-independent-events-and-rule
    description: Independent events
connections:
  - strand-6-uncertainty-foundation/08-expected-value
applications:
  - business: "Customer-segment specific conversion rates; risk given a known signal"
  - cs: "Probability of bug given the test failed; spam filter probabilities"
  - games: "Drop rate given a higher-tier kill; success rate given combo achieved"
  - life: "P(rain) given the sky looks dark; P(disease) given a positive test"
---

# Conditional Probability — "Given That…"

## Mental

Probabilities **change** when you learn new information.

Before any cards are drawn, the probability that the next card from a
deck is the ace of spades is $\dfrac{1}{52}$. But suppose someone
tells you "the next card is a black card." That changes things —
black cards are spades and clubs, $26$ cards total, and only one of
them is the ace of spades. The probability **given** what you know is
now $\dfrac{1}{26}$.

We write this as $P(A | B)$ — read "**probability of $A$ given $B$**":

$$
P(\text{ace of spades} \mid \text{black card}) = \frac{1}{26}.
$$

The vertical bar is the "given" — it conditions on $B$ already
being known.

The general rule, when $P(B) > 0$, is

$$
P(A \mid B) = \frac{P(A \cap B)}{P(B)}.
$$

In words: *"the chance of $A$ given $B$ is the chance of both $A$ and
$B$, divided by the chance of $B$ alone."*

A different way to picture it: when you condition on $B$, you
**shrink your sample space** to just the outcomes in $B$. The new
sample space has size $|B|$, and you ask "how many of those are
also in $A$?"

$$
P(A \mid B) = \frac{|A \cap B|}{|B|}.
$$

(For equally-likely outcomes; the general formula above works
always.)

The deepest fact: **independence is the special case** when knowing
$B$ doesn't change $A$'s probability:

$$
A, B \text{ independent} \iff P(A \mid B) = P(A).
$$

You met independence in Lesson 05 as $P(A \cap B) = P(A) \cdot P(B)$.
Plug that into the conditional formula:

$$
P(A \mid B) = \frac{P(A) \cdot P(B)}{P(B)} = P(A).
$$

Independence is precisely when conditioning on $B$ leaves $P(A)$
alone. The two definitions agree.

## Interactive

:::widget type=numeric-input prompt="A card is drawn from a 52-card deck. Given it's a black card, what is $P(\\text{ace of spades})$? Type the denominator if numerator is 1." answer=26 explain="Sample space shrinks to the $26$ black cards. Only one (the ace of spades) is the target. $P = \\dfrac{1}{26}$.":::

:::widget type=numeric-input prompt="Two dice are rolled. Given the sum is $7$, what is $P(\\text{first die shows 1})$? Type the denominator if numerator is 1." answer=6 explain="Sum-7 outcomes: $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$ — six. Of those, only one $(1, 6)$ has first die = 1. $P = \\dfrac{1}{6}$.":::

:::widget type=numeric-input prompt="In a class, $40\\%$ play football, $30\\%$ play tennis, and $10\\%$ play both. What is $P(\\text{plays tennis} \\mid \\text{plays football})$? Type the decimal." answer=0.25 explain="$P(\\text{tennis} | \\text{football}) = \\dfrac{P(\\text{both})}{P(\\text{football})} = \\dfrac{0.10}{0.40} = 0.25$. Among football players, $25\\%$ also play tennis.":::

Now a step-by-step walk through the famous **medical test paradox**.
This is *the* classic example of how unintuitive conditional
probability can be.

:::widget type=step-revealer
{
  "title": "A surprisingly bad medical test",
  "steps": [
    {"prose": "Suppose a disease affects $1\\%$ of the population. A test for it is $99\\%$ accurate — meaning it correctly identifies $99\\%$ of sick people, and correctly identifies $99\\%$ of healthy people. You test positive. What's $P(\\text{actually sick} \\mid \\text{positive test})$?"},
    {"prose": "Most people guess $99\\%$. The right answer is **$50\\%$**."},
    {"prose": "Imagine $10\\,000$ people. $1\\%$ are sick — that's $100$ sick people."},
    {"math": "100 \\text{ sick} \\to 99 \\text{ test positive (correct)} + 1 \\text{ tests negative (false negative)}", "prose": "Of the $100$ sick, the test correctly catches $99$ — and misses $1$."},
    {"math": "9{,}900 \\text{ healthy} \\to 9{,}801 \\text{ test negative (correct)} + 99 \\text{ test positive (false positive)}", "prose": "Of the $9\\,900$ healthy people, the test correctly clears $99\\%$ — but $1\\%$ falsely test positive. That's $99$ false positives."},
    {"math": "P(\\text{sick} | \\text{positive}) = \\dfrac{99}{99 + 99} = \\dfrac{1}{2} = 50\\%", "prose": "Among everyone who tests positive, only half are actually sick. The other half are healthy people with false positives. The rare disease swamped the test's accuracy."},
    {"prose": "Lesson: when an event is **rare** (low base rate), even a very accurate test produces a lot of false positives. Doctors interpret tests this way — a positive must usually be confirmed by a second, independent test. This isn't paranoia; it's conditional probability."}
  ]
}
:::

:::widget type=numeric-input prompt="Using the test scenario above, what is $P(\\text{sick given positive test})$ as a percentage? Just type the number." answer=50 explain="As derived: $\\dfrac{99}{198} = 0.5 = 50\\%$. The result depends critically on the base rate — if the disease were $50\\%$ common instead of $1\\%$, the test would be far more meaningful.":::

## Symbolic

Conditional probability:

$$
P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad \text{provided } P(B) > 0.
$$

You can rearrange this into the **multiplication rule for any two
events**:

$$
P(A \cap B) = P(B) \cdot P(A \mid B).
$$

This is the version that always works. The Lesson 05 version
$P(A \cap B) = P(A) \cdot P(B)$ is just the special case where $A$
and $B$ are independent (so $P(A \mid B) = P(A)$).

A useful symmetric form that's worth memorising: by the same
reasoning,

$$
P(A \cap B) = P(A) \cdot P(B \mid A) = P(B) \cdot P(A \mid B).
$$

Both expressions equal $P(A \cap B)$, so they equal each other:

$$
P(A) \cdot P(B \mid A) = P(B) \cdot P(A \mid B).
$$

This is **Bayes' theorem in disguise**. We won't unpack it formally
at Foundation level — Strand 6 Intermediate handles Bayesian
reasoning properly. But notice the shape: it lets you flip a
conditional probability around. If you know $P(\text{positive} |
\text{sick})$ (the test's accuracy) you can compute $P(\text{sick}
| \text{positive})$ (what you actually want to know). The medical
test paradox above is exactly this calculation.

## Computational

Conditional probability via filtered sample spaces:

```python
from itertools import product

# All two-die outcomes
two_dice = list(product(range(1, 7), repeat=2))

# Condition on "sum is 7" — restrict the sample space
sum7 = [d for d in two_dice if d[0] + d[1] == 7]

# Of those, how many have first die = 1?
target = [d for d in sum7 if d[0] == 1]

print(len(target) / len(sum7))   # 1/6 ≈ 0.167
```

The medical test paradox numerically:

```python
total = 10_000
prevalence = 0.01
sensitivity = 0.99      # P(positive | sick)
specificity = 0.99      # P(negative | healthy)

sick = total * prevalence
healthy = total - sick

true_positive = sick * sensitivity            # 99
false_negative = sick * (1 - sensitivity)     # 1
false_positive = healthy * (1 - specificity)  # 99
true_negative = healthy * specificity         # 9801

print("True positives:", true_positive)
print("False positives:", false_positive)
positive_total = true_positive + false_positive
print("P(sick | positive):", true_positive / positive_total)
# 0.5
```

The numerator $99$ (people correctly identified as sick) and the
$99$ false positives end up dominating equally — even though the
test is "$99\%$ accurate."

## Derivational

*Why* is $P(A \mid B) = \dfrac{P(A \cap B)}{P(B)}$?

When you condition on $B$, you're declaring "I'm only going to
consider outcomes in $B$." Effectively, $B$ becomes the new sample
space. The probabilities of all outcomes still need to sum to $1$
inside this new world, so the original probabilities have to be
**renormalised** by dividing by $P(B)$.

Inside this restricted world:

- Outcomes outside $B$ have new probability $0$ (they "didn't
  happen").
- An outcome $o \in B$ that originally had probability $P(o)$ now
  has probability $\tfrac{P(o)}{P(B)}$ — its share of the
  restricted sample space.

Summing over the outcomes that are also in $A$:

$$
P(A \mid B) = \sum_{o \in A \cap B} \frac{P(o)}{P(B)} = \frac{1}{P(B)} \sum_{o \in A \cap B} P(o) = \frac{P(A \cap B)}{P(B)}.
$$

The whole formula is "shrink the sample space to $B$, then ask what
fraction of it is also in $A$."

Two extreme sanity checks:

- $P(A \mid A) = \dfrac{P(A \cap A)}{P(A)} = \dfrac{P(A)}{P(A)} = 1$.
  Given that $A$ happened, $A$ definitely happened. ✓
- $P(A \mid \emptyset)$ is undefined — you cannot condition on the
  impossible event. Good: it would require dividing by zero. ✓

## Connective

Conditional probability is the door to almost everything:

- **Bayes' theorem** (Strand 6 Intermediate): formal flipping of
  conditional probabilities. Spam filters, medical diagnosis, and
  most modern AI inference use Bayesian updating.
- **Independence revisited**: $A, B$ independent $\iff$ $P(A | B) =
  P(A)$. The conditional probability framework subsumes Lesson 05.
- **Markov chains** (Strand 10): a process where the next state's
  probability depends only on the current state. Conditional
  probability defines the transitions.
- **Machine learning**: a classifier's job is to compute $P(\text{label}
  | \text{input features})$ — a conditional probability.

A philosophical note: conditional probability captures **how
information updates beliefs**. Before you observe $B$, your belief
about $A$ is $P(A)$. After, it's $P(A | B)$. This is the principled
way to update beliefs given new evidence — and it's why probability
is, in modern AI, sometimes called "the calculus of belief."

## Applied

- **Spam filtering**: a filter learns $P(\text{word "Viagra"} |
  \text{spam})$ and $P(\text{word "Viagra"} | \text{not spam})$
  from a training corpus. New email arrives — Bayes flips these
  to compute $P(\text{spam} | \text{words})$.
- **Medical screening**: as the paradox shows, a positive screening
  test does not mean you have the disease — it means you should
  follow up with confirmatory tests. Doctors learn this language.
- **Game design**: "rare drop rate of $5\%$ from boss-tier enemies,
  $0.1\%$ from regulars." The drop rate *given* the kill type is
  a conditional probability. Players exploit conditioning when
  they grind the right enemies.
- **A/B testing segments**: $P(\text{convert} | \text{country = Japan})$
  may be very different from $P(\text{convert} | \text{country =
  Brazil})$. Marketers segment exactly this way.
- **Weather**: $P(\text{rain tomorrow} | \text{today is overcast})$
  is much higher than $P(\text{rain tomorrow})$ unconditional. The
  forecast you see has already conditioned on every observation
  the meteorologist has.

## Check Your Understanding

:::widget type=numeric-input prompt="A bag has $3$ red and $7$ blue marbles. Two are drawn without replacement. $P(\\text{second is red} \\mid \\text{first is red})$? Type the numerator if denominator is $9$." answer=2 explain="After drawing one red, $2$ red and $7$ blue remain — $9$ total. $P = \\dfrac{2}{9}$. Without replacement = events are *not* independent.":::

:::widget type=numeric-input prompt="$P(A) = 0.6$, $P(A \\cap B) = 0.3$. $P(B \\mid A) = ?$ Type the decimal." answer=0.5 explain="$P(B | A) = \\dfrac{P(A \\cap B)}{P(A)} = \\dfrac{0.3}{0.6} = 0.5$.":::

:::widget type=numeric-input prompt="In the medical test scenario (1% prevalence, 99% sensitivity, 99% specificity), what is $P(\\text{healthy} \\mid \\text{negative test})$ as a percentage? Round to $2$ decimals." answer=99.99 tolerance=0.01 explain="Of $10\\,000$ people: $1$ false negative + $9{,}801$ true negative = $9{,}802$ negatives. Of those, $9{,}801$ are healthy. $\\dfrac{9{,}801}{9{,}802} \\approx 99.99\\%$. Negative test = very strong evidence of being healthy.":::

:::widget type=numeric-input prompt="A standard deck. $P(\\text{ace} \\mid \\text{red card})$? Type the numerator if denominator is $26$." answer=2 explain="Red cards = 26 (hearts + diamonds). Of those, two are aces (ace of hearts, ace of diamonds). $P = \\dfrac{2}{26} = \\dfrac{1}{13}$ — same as unconditional $P(\\text{ace}) = \\dfrac{4}{52} = \\dfrac{1}{13}$. Card-suit and card-rank are independent.":::
