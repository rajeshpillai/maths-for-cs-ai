---
strand: uncertainty
level: foundation
order: 4
title: Complement — When "Not A" is Easier
prerequisites:
  - tier: strand-6-uncertainty-foundation
    slug: 02-equally-likely-outcomes
    description: Equally likely outcomes
connections:
  - strand-6-uncertainty-foundation/05-independent-events-and-rule
applications:
  - business: "Probability of a campaign reaching at least one customer"
  - cs: "P(any failure) in a redundant system; P(at least one collision) in hashing"
  - games: "Drop rate of 'rare item appears at least once in N runs'"
  - life: "P(at least one rainy day during a 7-day holiday)"
---

# Complement — When "Not A" is Easier

## Mental

Sometimes a probability question is worded in a way that makes
counting hard: "**at least one** $6$ in five rolls," "**at least one**
heads in ten flips," "the password has **at least one** digit." The
phrase "at least one" is the warning bell.

Counting "at least one" directly means listing every way it could
happen — exactly one $6$, OR exactly two $6$s, OR three, OR four, OR
five. Five separate cases, each non-trivial.

There's a much better way. Compute the probability of the **opposite**
— "no $6$ at all" — then **subtract from $1$**:

$$
P(\text{at least one } 6) = 1 - P(\text{no } 6 \text{ at all}).
$$

The opposite of "$A$" is called the **complement** of $A$, written
$A^c$ or $\bar{A}$ ("not $A$"). The rule is:

$$
P(A^c) = 1 - P(A).
$$

Why does this work? Because *something* must happen. Either $A$ does,
or $A$ doesn't. Those two probabilities sum to $1$ (Lesson 00, Rule 3).
So one is automatically $1$ minus the other.

This single trick — **count the complement instead** — is the most
powerful shortcut in introductory probability. Whenever you see "at
least one," reach for it.

A simple example before the heavy machinery: roll a single die. What's
$P(\text{not a } 6)$? You could count five favourable outcomes
($1, 2, 3, 4, 5$) directly. Or compute $P(6) = \tfrac{1}{6}$ and
subtract: $1 - \tfrac{1}{6} = \tfrac{5}{6}$. Same answer, less work.
For multi-step problems, the second approach is exponentially better.

## Interactive

:::widget type=numeric-input prompt="A die is rolled. $P(\\text{not a 5}) = ?$ Type as a fraction with denominator 6 — just the numerator." answer=5 explain="$P(5) = \\dfrac{1}{6}$, so $P(\\text{not 5}) = 1 - \\dfrac{1}{6} = \\dfrac{5}{6}$. Numerator is $5$.":::

:::widget type=numeric-input prompt="A coin is flipped. $P(\\text{tails}) = 0.5$. What is $P(\\text{not tails})$? Type the decimal." answer=0.5 explain="$1 - 0.5 = 0.5$. Coin flips have a 50/50 split, so 'not tails' is the same as 'heads.'":::

:::widget type=numeric-input prompt="A weather forecast says $P(\\text{rain tomorrow}) = 0.30$. What is $P(\\text{no rain tomorrow})$? Type the decimal." answer=0.7 explain="$1 - 0.30 = 0.70$. The complement of 'rain' is 'no rain' — together they exhaust all possibilities.":::

Now the harder kind, where the complement saves real work. Walk
through it step-by-step.

:::widget type=step-revealer
{
  "title": "P(at least one 6 in 4 rolls of a die)",
  "steps": [
    {"prose": "Direct counting would need: P(exactly one 6) + P(exactly two 6s) + P(exactly three) + P(exactly four). Four cases, each with combinations to count. Painful."},
    {"prose": "Switch to the complement: $1 - P(\\text{no } 6 \\text{ at all in 4 rolls})$."},
    {"math": "P(\\text{no } 6 \\text{ on a single roll}) = \\tfrac{5}{6}", "prose": "Each roll independently. $5$ out of $6$ outcomes are not a $6$."},
    {"math": "P(\\text{no } 6 \\text{ on all 4 rolls}) = \\left(\\tfrac{5}{6}\\right)^4", "prose": "Independent rolls multiply. (Lesson 05 will name this the multiplication rule.)"},
    {"math": "\\left(\\tfrac{5}{6}\\right)^4 = \\tfrac{625}{1296} \\approx 0.482", "prose": "Compute the fourth power. About $48.2\\%$ chance of seeing no 6 at all."},
    {"math": "P(\\text{at least one 6}) = 1 - 0.482 = 0.518", "prose": "Subtract from $1$. So a bit more than half — about $51.8\\%$."}
  ]
}
:::

:::widget type=numeric-input prompt="In 4 rolls of a fair die, what is the probability of getting at least one 6? (Round to 3 decimals — type the decimal.)" answer=0.518 tolerance=0.005 explain="$1 - (5/6)^4 = 1 - 625/1296 \\approx 0.518$. Slightly more than half. Common gambling-history fact: this is roughly the bet that gave the early study of probability its first famous correct answer (around 1654).":::

:::widget type=numeric-input prompt="In 5 flips of a fair coin, $P(\\text{at least one heads}) = ?$ Round to 3 decimals." answer=0.969 tolerance=0.005 explain="$P(\\text{no heads in 5 flips}) = (1/2)^5 = 1/32 \\approx 0.031$. So $P(\\text{at least one heads}) = 1 - 1/32 = 31/32 \\approx 0.969$. Almost certain — five flips offer many chances for a heads.":::

## Symbolic

The complement rule, in formal notation:

$$
P(A^c) = 1 - P(A), \qquad P(A) + P(A^c) = 1.
$$

In sample-space terms, $A^c$ is "everything in $S$ that's not in $A$."
If $|S|$ is finite,

$$
|A^c| = |S| - |A|, \quad \text{so} \quad P(A^c) = \frac{|S| - |A|}{|S|} = 1 - \frac{|A|}{|S|}.
$$

The "**at least one**" pattern. If an experiment is repeated $n$
times independently and each trial has probability $p$ of "success,"
then

$$
P(\text{at least one success in } n \text{ trials}) = 1 - (1 - p)^n.
$$

The $(1 - p)^n$ piece is "no success in any trial" — failure on every
single one. Lesson 05 will derive this multiplication; for now,
treat it as a recipe.

A useful sanity check: as $n$ grows, $(1 - p)^n$ shrinks toward
$0$ (assuming $0 < p < 1$). So $P(\text{at least one})$ grows
toward $1$. This matches intuition: with enough chances, even rare
events become near-certain.

## Computational

The complement rule directly:

```python
def p_at_least_one(p_success_per_trial, num_trials):
    """Probability of at least one success in n independent trials."""
    p_no_success = (1 - p_success_per_trial) ** num_trials
    return 1 - p_no_success

# Roll 4 dice; P(at least one 6)?
print(p_at_least_one(1/6, 4))     # ~0.518

# Flip 10 coins; P(at least one heads)?
print(p_at_least_one(0.5, 10))    # ~0.999

# Lottery: 1-in-a-million chance per ticket. Buy 100 tickets.
print(p_at_least_one(1/1_000_000, 100))   # ~0.0001 — still tiny
```

A simulation cross-check (in case you don't trust the formula):

```python
import random

def simulate_at_least_one(p, n, trials=100_000):
    hits = 0
    for _ in range(trials):
        any_success = False
        for _ in range(n):
            if random.random() < p:
                any_success = True
        if any_success:
            hits = hits + 1
    return hits / trials

random.seed(0)
print(simulate_at_least_one(1/6, 4))     # close to 0.518
```

The simulation should agree with the formula to within the
$\tfrac{1}{\sqrt{trials}}$ wobble (Lesson 03).

## Derivational

*Why* is $P(A) + P(A^c) = 1$?

Because $A$ and $A^c$ together cover **every outcome** in the sample
space — by definition, an outcome is either in $A$ or not in $A$, and
those two cases are mutually exclusive (no outcome can be in both).
The sum of probabilities of all outcomes is $1$ (Lesson 00, Rule 3),
so

$$
P(A) + P(A^c) = P(\text{any outcome}) = 1.
$$

Subtracting gives $P(A^c) = 1 - P(A)$.

*Why* does $P(\text{no success in } n \text{ trials}) = (1 - p)^n$?

Because the trials are **independent** — each trial's outcome doesn't
affect the others — and the probability of failure on a single trial
is $1 - p$. For all $n$ trials to fail, we need failure on the first
AND failure on the second AND ... and failure on the $n$th:

$$
P(\text{all fail}) = \underbrace{(1 - p) \cdot (1 - p) \cdot \ldots \cdot (1 - p)}_{n \text{ times}} = (1 - p)^n.
$$

The "AND" of independent events translates to multiplication. Lesson
05 will give this its proper name and treatment.

## Connective

The complement rule is one face of a deeper structure:

- **Set theory** (Strand 2): $A$ and $A^c$ partition $S$ into two
  pieces. The complement of a set is one of the basic set
  operations.
- **De Morgan's laws** (Strand 8 Reasoning): "$\text{not (A or B)}
  = \text{not A and not B}$" and vice versa. The "at least one"
  trick is De Morgan's law applied to events.
- **Survival analysis** (Strand 6 Intermediate): in reliability
  engineering, the complement is the *survival function* —
  $S(t) = 1 - F(t)$, the probability that something hasn't failed
  yet at time $t$.

The "at least one" pattern shows up in CS constantly:

- **Hash collisions** in a hash table.
- **Bug-bash testing**: $n$ testers each independently find a
  particular bug with probability $p$. The chance someone finds it
  is $1 - (1-p)^n$.
- **Backup redundancy**: with $n$ independent backup systems each
  failing with probability $p$, the chance everything fails is
  $p^n$. The chance you survive is $1 - p^n$. Hence the obsession
  with multiple backup layers — even cheap ones.

## Applied

- **Birthday paradox** (preview): in a room of $23$ people, what's
  the probability that *some* pair shares a birthday? The
  complement is "everyone has a different birthday" — and the
  probability of *that* drops below $50\%$ around 23 people.
  Surprisingly few. Strand 5 will work it out.
- **Drop rates**: a game item drops with $P = 0.02$ per kill. After
  $100$ kills, $P(\text{got at least one}) = 1 - 0.98^{100}
  \approx 0.867$. Even rare items become near-certain over enough
  attempts.
- **Hashing**: a hash table with $1\,000$ buckets and $40$ items.
  $P(\text{any collision}) = 1 - \tfrac{1000!}{1000^{40} \cdot
  960!}$ — most likely there *is* a collision, even though each
  individual pair only collides with $P = \tfrac{1}{1000}$.
- **Software testing**: a tester finds a particular bug with $P =
  0.1$ per test session. After $20$ sessions, $P(\text{found it})
  = 1 - 0.9^{20} \approx 0.878$. Hire enough testers and bugs
  become very hard to hide.
- **Holiday rain**: each day has $P(\text{rain}) = 0.3$,
  independent. Over a $7$-day trip,
  $P(\text{at least one rainy day}) = 1 - 0.7^7 \approx 0.918$.
  Even a "$30\%$ chance of rain" forecast almost guarantees you'll
  see rain at some point in a week.

## Check Your Understanding

:::widget type=numeric-input prompt="$P(\\text{event } A) = 0.4$. What is $P(A^c)$? Type the decimal." answer=0.6 explain="$1 - 0.4 = 0.6$. Complement is $1 - P(A)$.":::

:::widget type=numeric-input prompt="A fair coin is flipped 3 times. $P(\\text{at least one heads}) = ?$ Type as a fraction with denominator $8$ — just the numerator." answer=7 explain="$P(\\text{no heads in 3 flips}) = (\\tfrac{1}{2})^3 = \\tfrac{1}{8}$. So $P(\\text{at least one heads}) = 1 - \\tfrac{1}{8} = \\tfrac{7}{8}$.":::

:::widget type=numeric-input prompt="A test detects a bug with $P = 0.2$ per run. After $10$ runs, $P(\\text{found at least once}) \\approx ?$ Round to $2$ decimals." answer=0.89 tolerance=0.01 explain="$1 - 0.8^{10} = 1 - 0.107 = 0.893 \\approx 0.89$.":::

:::widget type=numeric-input prompt="A game has a $1\\%$ critical-hit rate per attack. Over $50$ attacks, what is $P(\\text{at least one crit})$? Round to $2$ decimals." answer=0.39 tolerance=0.01 explain="$1 - 0.99^{50} = 1 - 0.605 = 0.395 \\approx 0.39$. Even a $1\\%$ chance becomes likely over $50$ attempts.":::
