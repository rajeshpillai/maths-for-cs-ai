---
strand: uncertainty
level: foundation
order: 0
title: What is Probability?
prerequisites: []
connections:
  - strand-1-number-quantity-foundation/06-fractions-as-ratios
  - strand-6-uncertainty-foundation/01-sample-spaces-and-outcomes
applications:
  - business: "Insurance pricing, weather forecasting, A/B testing"
  - cs: "Randomized algorithms, machine learning predictions, network reliability"
  - games: "Drop rates, critical-hit chances, matchmaking"
  - life: "Will it rain tomorrow? Should I take this medication? Is this lottery ticket worth $2?"
---

# What is Probability?

## Explain Like I Am 7

The sun *will* rise tomorrow.  You *won't* roll a $7$ on a normal
six-sided die.  Most things in life sit between those two
extremes — like "will it rain on the picnic?"  **Probability** is a
number we glue onto each maybe-thing to say how likely it is.  We
agree on a tidy scale: $0$ means impossible, $1$ means absolutely
certain, and a fair coin landing heads is right in the middle at
$\tfrac{1}{2}$.  Probability is just that little measuring stick
for chance.

## Mental

Some things are **certain** to happen — the sun will rise tomorrow.
Some things are **impossible** — you will not roll a $7$ on a normal
six-sided die. Most things are *somewhere in between*: it might rain
tomorrow, your team might win the match, the coin you're about to
flip might come up heads.

**Probability is a number that says how likely something is.** We pin
down a scale:

- **$0$** means **impossible.**
- **$1$** means **certain.**
- Anything between $0$ and $1$ means "somewhere in between." A bigger
  number means more likely.

For a fair coin, the probability of heads is $\dfrac{1}{2} = 0.5$ — a
"$50/50$ chance," halfway between impossible and certain. For a fair
six-sided die, the probability of rolling a $4$ is $\dfrac{1}{6}
\approx 0.167$ — small but nonzero.

Notice these are **fractions**. That's not a coincidence. A
probability is a **ratio**: how many of the outcomes favour you,
divided by how many outcomes there are in total. You already know how
fractions work (Strand 1, Lessons 06 and 07) — probability is just
*using* fractions for a new purpose: to measure chance.

Three rules that follow from "$0$ = impossible, $1$ = certain":

1. **No probability is negative.** "$-0.3$ chance of rain" is meaningless.
2. **No probability exceeds $1$.** You can't be "$120\%$ certain."
3. **The probability of *something* happening is $1$.** If you flip a
   coin, it lands either heads or tails — those are the only options,
   and one of them is certain to occur.

Those three rules — **non-negative, at most $1$, sums to $1$ across
all possibilities** — are the entire foundation of probability.

## Interactive

Quick checks. Recall: probability $= \dfrac{\text{favourable outcomes}}{\text{total outcomes}}$.

:::widget type=numeric-input prompt="What is the probability of getting heads on a fair coin? Type the decimal." answer=0.5 explain="One favourable outcome (heads) out of two total outcomes (heads or tails). $\\dfrac{1}{2} = 0.5$.":::

:::widget type=numeric-input prompt="What is the probability of rolling a 4 on a fair six-sided die? (Type as a fraction with denominator 6 — just the numerator.)" answer=1 explain="One favourable outcome (the 4) out of six total outcomes ($1, 2, 3, 4, 5, 6$). Probability $= \\dfrac{1}{6}$.":::

:::widget type=numeric-input prompt="What is the probability of rolling an even number on a fair six-sided die? Type the numerator if the denominator is 6." answer=3 explain="Three favourable outcomes ($2, 4, 6$) out of six total. $\\dfrac{3}{6} = \\dfrac{1}{2}$ — a 50/50 chance.":::

:::widget type=numeric-input prompt="A bag has 5 red marbles and 5 blue marbles. What is the probability of drawing a red one? Type the decimal." answer=0.5 explain="$\\dfrac{5}{10} = \\dfrac{1}{2} = 0.5$. Half the marbles are red, so the chance is one half.":::

:::widget type=numeric-input prompt="A bag has only blue marbles. What is the probability of drawing a *red* one? Type the decimal (this is the impossible event)." answer=0 explain="There are zero favourable outcomes. $\\dfrac{0}{N} = 0$ — impossible.":::

## Symbolic

For an event $A$ — "heads," "rolling a $4$," "drawing red" — we write
its probability as $P(A)$. The three rules from above:

$$
\begin{aligned}
0 &\le P(A) \le 1 \quad \text{(probabilities live between 0 and 1)} \\
P(\text{impossible}) &= 0 \\
P(\text{certain}) &= 1
\end{aligned}
$$

The most basic way to **compute** a probability — and the only one we
need at this lesson — works when **all outcomes are equally likely**:

$$
P(A) = \frac{\text{number of outcomes in } A}{\text{total number of outcomes}}.
$$

This is the formula behind every example in the Interactive section.
"Equally likely" is the catch — it works for fair coins, fair dice,
shuffled cards, drawing-balls-from-an-urn, and any other situation
where the outcomes have no reason to prefer one over another. It does
**not** work for "will it rain tomorrow" or "will my team win" — those
need a different approach (Lesson 03 will get to it).

The notation $|A|$ — vertical bars around $A$ — means "the count of
things in $A$" (you saw this back in Strand 1, Lesson 00). So the
formula above can be written compactly as

$$
P(A) = \frac{|A|}{|S|},
$$

where $S$ is the **sample space** (the full set of possible outcomes).
We'll meet sample spaces formally in Lesson 01.

## Computational

Python's `random` module simulates the experiments we've been
discussing. Run any of these:

```python
import random

# Simulate a single coin flip. Heads = 1, tails = 0.
flip = random.choice(["heads", "tails"])
print(flip)

# Simulate a single die roll.
roll = random.randint(1, 6)
print(roll)
```

Run that code five or six times and you'll see different outcomes.
That's the *random* part. But what about the probability? It shows up
when you run **many** trials and look at the long-run pattern:

```python
import random

trials = 1000
heads = 0
for _ in range(trials):
    if random.choice(["heads", "tails"]) == "heads":
        heads = heads + 1

print("trials:", trials)
print("heads :", heads)
print("fraction:", heads / trials)
```

You'll see something close to $0.5$ — but not exactly. With $1000$
flips, getting exactly $500$ heads is unusual. You might see $483$,
or $521$, or $497$. As you increase trials to $10\,000$ or $100\,000$,
the fraction creeps closer and closer to $0.5$.

This is the **law of large numbers**: the long-run fraction of "wins"
converges to the theoretical probability. Lesson 03 will give you a
widget that lets you watch this happen visually, in real time.

## Derivational

*Why* does $P(A) = \dfrac{|A|}{|S|}$ work for equally-likely outcomes?

Because if every outcome has the same probability $p$, and there are
$|S|$ of them, and they together make up *all* possibilities, then by
Rule 3 (probabilities of all possibilities sum to $1$):

$$
p + p + \cdots + p = 1, \quad \text{(} |S| \text{ copies of } p \text{)}
$$

so $|S| \cdot p = 1$, which gives $p = \dfrac{1}{|S|}$. Each
individual outcome has probability $\dfrac{1}{|S|}$.

For an event $A$ that contains $|A|$ outcomes, each contributing
$\dfrac{1}{|S|}$, the total probability is

$$
P(A) = |A| \cdot \frac{1}{|S|} = \frac{|A|}{|S|}.
$$

The whole formula is just **counting how many of the equal-sized
slices lie inside $A$**.

This argument breaks down the moment outcomes are *not* equally likely
— for example, an unfair coin that comes up heads $70\%$ of the time.
Then we can't simply divide by $|S|$; we need to weight each outcome
by its individual probability. Lesson 08 will return to this when we
meet **expected value**.

## Connective

Probability ties to several earlier ideas:

- **Fractions** (Strand 1, Lesson 06): every probability *is* a
  fraction. The "denominator" is the number of total outcomes.
- **Counting** (Strand 1, Lesson 00): $|A|$ and $|S|$ are counts.
  Listing all the favourable outcomes is just careful counting —
  Lesson 01 will build the technique.
- **Decimals and percentages** (Strand 1, Lesson 08): probabilities
  are usually written as decimals ($0.5$) or percentages ($50\%$),
  but they're the same number. "$30\%$ chance of rain" means
  $P(\text{rain}) = 0.30 = \dfrac{30}{100} = \dfrac{3}{10}$.

You'll meet probability again in *every* later strand:

- **Strand 4 (Change)**: rates of change, growth, decay — many real
  systems are random.
- **Strand 5 (Pattern)**: counting outcomes is exactly combinatorics.
- **Strand 7 (Computation)**: pseudo-random number generators rely
  on probability theory.

## Applied

- **Weather forecasting**: "$30\%$ chance of rain" means $P(\text{rain})
  = 0.30$. The forecast is a probability, not a guarantee.
- **Insurance**: an insurer estimates the probability of you having
  an accident this year, multiplies by the typical claim size, and
  charges you slightly more than that as a premium. The whole
  industry runs on probability.
- **Drop rates in games**: a rare item with "$2\%$ drop rate" appears
  in $P = 0.02$ of monster kills. Over $50$ kills, you'd expect
  about $1$ — but you might get $0$ or $5$ in any given run.
- **Medical tests**: a positive test result tells you the *probability*
  you have the disease, given the test result. (Real world is
  trickier than you'd guess — Lesson 07 will unpack why.)
- **A/B testing**: a website shows two versions of a button, measures
  the click-through rate, and uses probability to decide whether
  the difference is real or just luck.

## Check Your Understanding

:::widget type=numeric-input prompt="A spinner has 8 equal sectors, of which 3 are red. What is the probability of landing on red? Type the decimal (rounded to 3 places)." answer=0.375 explain="$\\dfrac{3}{8} = 0.375$. Three favourable outcomes out of eight equally likely.":::

:::widget type=numeric-input prompt="A standard 52-card deck has 13 hearts. What is the probability of drawing a heart on the top card? Type the numerator if the denominator is 4." answer=1 explain="$\\dfrac{13}{52} = \\dfrac{1}{4}$. One quarter of the deck is hearts.":::

:::widget type=numeric-input prompt="If $P(A) = 0.7$, what is the maximum possible value for $P(A)$ given the rules of probability? Type the number." answer=1 explain="Probabilities are at most $1$. $0.7$ is fine; anything above $1$ is impossible.":::

:::widget type=numeric-input prompt="A fair die is rolled. What is the probability of getting any number from 1 to 6? Type the decimal." answer=1 explain="It's certain to land on one of $1, 2, 3, 4, 5, 6$ — those are the only outcomes. $P(\\text{certain}) = 1$.":::
