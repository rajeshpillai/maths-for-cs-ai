---
strand: uncertainty
level: foundation
order: 2
title: Equally Likely Outcomes
prerequisites:
  - tier: strand-6-uncertainty-foundation
    slug: 01-sample-spaces-and-outcomes
    description: Sample spaces and outcomes
connections:
  - strand-1-number-quantity-foundation/06-fractions-as-ratios
  - strand-1-number-quantity-foundation/07-fraction-arithmetic
applications:
  - business: "Lottery odds, raffle drawings, fair contract clauses"
  - cs: "Hashing collisions, randomly-chosen test cases, load balancing"
  - games: "Card draws, dice rolls, fair shuffle algorithms"
  - life: "Should I take this risk? Coin tosses to decide who pays"
---

# Equally Likely Outcomes

## Explain Like I Am 7

When every outcome on your menu has the same chance — like every
face of a fair die or every card in a well-shuffled deck — the
probability of an event is wonderfully simple.  Just count the
menu entries that match your event, count the whole menu, and put
one over the other.  $2$ even faces out of $6$ total faces makes
$P(\text{even}) = \tfrac{2}{6} = \tfrac{1}{3}$.  Most "probability
is hard!" stories are really "I miscounted."  Slow, careful
counting is the secret superpower.

## Mental

Lesson 00 introduced the formula and Lesson 01 introduced the sample
space. Now we put them together. **When every outcome in the sample
space is equally likely**, the probability of any event is

$$
P(A) = \frac{|A|}{|S|}.
$$

**Two counts**, one fraction. The whole skill of equally-likely
probability is **counting accurately**:

- $|S|$ — count the sample space.
- $|A|$ — count how many outcomes are in your event.

That's it. Most "probability is hard" complaints reduce to "I miscounted."

The crucial assumption is **equally likely**. A fair coin gives
$P(\text{heads}) = \tfrac{1}{2}$. A weighted coin that lands heads
$70\%$ of the time does *not* — you can't just count outcomes there.
For now, every example uses fair coins, fair dice, well-shuffled
decks, drawing-balls-from-an-urn — situations where symmetry forces
each outcome to be as likely as any other.

A quick reminder of the **fraction connection**: a probability is
just a fraction. Lesson 06 in Strand 1 told you how to read
fractions; Lesson 07 told you how to add and multiply them. Every
trick from there transfers directly to probability — including the
ability to **simplify**. $P(\text{event}) = \tfrac{6}{36} = \tfrac{1}{6}$
— same probability, simpler form.

## Interactive

Compute these in your head, using $P(A) = |A|/|S|$.

:::widget type=numeric-input prompt="A die is rolled. What is $P(\\text{rolling a 5})$? Type the numerator if denominator is $6$." answer=1 explain="One favourable outcome ($5$) out of six total. $P = \\dfrac{1}{6}$.":::

:::widget type=numeric-input prompt="A die is rolled. What is $P(\\text{rolling a number} > 4)$? Type the numerator if denominator is $6$." answer=2 explain="Two favourable outcomes ($5, 6$) out of six. $P = \\dfrac{2}{6} = \\dfrac{1}{3}$.":::

:::widget type=numeric-input prompt="Two coins are flipped. What is $P(\\text{exactly one heads})$? Type the numerator if denominator is $4$." answer=2 explain="Sample space $\\{HH, HT, TH, TT\\}$. Exactly one heads means $HT$ or $TH$ — two outcomes. $P = \\dfrac{2}{4} = \\dfrac{1}{2}$.":::

:::widget type=numeric-input prompt="Two coins are flipped. What is $P(\\text{both heads})$? Type the numerator if denominator is $4$." answer=1 explain="Only $HH$ qualifies. $P = \\dfrac{1}{4}$.":::

:::widget type=numeric-input prompt="A standard 52-card deck. What is $P(\\text{draw a face card: J, Q, or K})$? Type the numerator if denominator is $52$." answer=12 explain="Three face values × four suits = $12$ face cards. $P = \\dfrac{12}{52} = \\dfrac{3}{13}$.":::

:::widget type=numeric-input prompt="Two dice are rolled. What is the size of the sample space?" answer=36 explain="$6 \\times 6 = 36$. The multiplication principle from Lesson 01.":::

:::widget type=numeric-input prompt="Two dice are rolled. How many outcomes have sum equal to $9$?" answer=4 explain="$\\{(3,6), (4,5), (5,4), (6,3)\\}$ — four pairs. So $P(\\text{sum} = 9) = \\dfrac{4}{36} = \\dfrac{1}{9}$.":::

## Symbolic

The formula again — but with a refinement that tells you when **not**
to use it:

$$
P(A) = \frac{|A|}{|S|}, \quad \text{provided every outcome in } S \text{ is equally likely.}
$$

When outcomes are *not* equally likely, this formula gives the wrong
answer. Two warning examples:

**Warning example 1.** "Pick a random word from the English language."
The outcomes (words) exist, but they're not equally likely to occur
in actual usage — "the" is much more common than "antidisestablishmentarianism."
"Pick a random word" usually means weighted by frequency, not
uniformly.

**Warning example 2.** "Will it rain tomorrow?" The sample space is
$\{\text{rain}, \text{no rain}\}$, but it's certainly not the case
that $P(\text{rain}) = \tfrac{1}{2}$. Weather doesn't have symmetry
the way coins do.

The clue is always: do I have a *symmetric mechanism* — a fair coin,
a fair die, a well-shuffled deck, a uniform random pick? If yes,
the formula applies. If not, you need a different tool — usually
**simulation** (Lesson 03) or **observed frequency**.

For sample spaces with a **product structure** — like rolling two
dice — events often factor too. The probability of "first die rolls
a $2$ AND second die rolls a $3$" can be computed two ways:

$$
P = \frac{|A|}{|S|} = \frac{1}{36}, \quad \text{or} \quad P = P(\text{first}=2) \cdot P(\text{second}=3) = \frac{1}{6} \cdot \frac{1}{6} = \frac{1}{36}.
$$

Same answer. The second form generalises better — Lesson 05 will
treat it as a *rule*, not a coincidence.

## Computational

The "generate sample space, filter to event, divide" pattern:

```python
from itertools import product

def probability(sample_space, event_condition):
    """Probability of event_condition over a uniform sample_space."""
    favourable = [o for o in sample_space if event_condition(o)]
    return len(favourable) / len(sample_space)

# Two dice
two_dice = list(product(range(1, 7), repeat=2))

print(probability(two_dice, lambda d: d[0] + d[1] == 7))   # 1/6
print(probability(two_dice, lambda d: d[0] + d[1] >= 10))  # 1/6
print(probability(two_dice, lambda d: d[0] == d[1]))       # 1/6  — "doubles"
```

A more readable version using sample-space size formulas directly:

```python
# Drawing one card from a 52-card deck
deck_size = 52

# P(face card)
face_cards = 4 * 3   # four suits, three face values per suit
print(face_cards / deck_size)        # ~0.231

# P(red king)
red_kings = 2        # king of hearts, king of diamonds
print(red_kings / deck_size)         # ~0.038
```

Most real probability problems are won at the counting step. **If you
can count both numerator and denominator correctly, you have the
answer.** Strand 5 (Pattern & Counting) develops the counting tools
deeply.

## Derivational

*Why* does the formula $P(A) = \tfrac{|A|}{|S|}$ require equally likely
outcomes?

Because of the rule from Lesson 00: probabilities of all outcomes
must sum to $1$. If every outcome has the same probability $p$, and
there are $|S|$ outcomes, then $|S| \cdot p = 1$, giving $p =
\tfrac{1}{|S|}$. Each individual outcome contributes $\tfrac{1}{|S|}$,
and an event $A$ that contains $|A|$ outcomes therefore has total
probability $|A| \cdot \tfrac{1}{|S|} = \tfrac{|A|}{|S|}$.

This argument **fails** the moment outcomes have unequal probabilities.
Imagine a weighted coin where heads has probability $0.7$ and tails
$0.3$. The sample space is still $\{H, T\}$ with $|S| = 2$. But
$P(H) = 0.7 \ne \tfrac{1}{2}$. The equally-likely formula is just
the wrong tool here.

A general formula — one that handles unequal weights — is

$$
P(A) = \sum_{\text{outcomes } o \in A} P(o).
$$

When all $P(o)$ are equal to $\tfrac{1}{|S|}$, this collapses back to
$\tfrac{|A|}{|S|}$. Lesson 08 (Expected Value) will use this general
form. For now, Foundation-level work stays inside the equally-likely
case, which covers an enormous swath of textbook problems.

## Connective

Equally-likely probability is the bridge between counting and chance:

- **Strand 1 fractions**: every probability is a fraction; Lesson 07
  explains how to simplify them.
- **Strand 5 combinatorics**: when sample spaces get large (poker
  hands, lottery numbers, password permutations), counting them
  needs more powerful tools — permutations and combinations.
- **Strand 6 lesson 03**: when the equally-likely assumption fails
  (or you can't count), you can *measure* the probability instead
  by running many trials.

A subtle but important point: equally-likely probability is the
**simplest** form of probability, but it covers most textbook
problems. Real-world probabilities (weather, disease, market
behaviour) are almost never equally likely — they need either
observed frequency data (simulation) or domain models. Don't make the
mistake of forcing every problem into this formula.

## Applied

- **Lottery odds**: a $6$-of-$49$ lottery has $\binom{49}{6} =
  13\,983\,816$ possible draws. One ticket means $P(\text{win}) =
  \tfrac{1}{13\,983\,816}$ — about one in fourteen million. The
  formula assumes the draw is genuinely random, which lotteries
  are designed to ensure.
- **Hashing**: when you store $N$ items into a hash table of $M$
  buckets, the chance that a specific item lands in a specific
  bucket is $\tfrac{1}{M}$ if the hash function is good. Hash
  table analysis depends on this assumption.
- **Card games**: a perfectly shuffled deck means each $5$-card
  hand is equally likely. The probability of being dealt a flush,
  a straight, or four-of-a-kind is just (count of those hands) /
  (total $5$-card hands). Poker probability tables are produced
  exactly this way.
- **Random sampling in surveys**: if a poll picks $1000$ people
  uniformly at random from a population of $1\,000\,000$, every
  person has $P = 0.001$ of being chosen. Equal probability is
  what makes the poll *representative*.

## Check Your Understanding

:::widget type=numeric-input prompt="A bag contains 4 red, 3 green, and 2 blue marbles. What is $P(\\text{red})$? Type the numerator if denominator is $9$." answer=4 explain="Sample space size $|S| = 4 + 3 + 2 = 9$. Red outcomes: $4$. $P = \\dfrac{4}{9}$.":::

:::widget type=numeric-input prompt="A spinner has $10$ equal sectors numbered $1$–$10$. What is $P(\\text{prime number})$? Type the numerator if denominator is $10$." answer=4 explain="Primes from $1$ to $10$: $2, 3, 5, 7$ — four primes. $P = \\dfrac{4}{10} = \\dfrac{2}{5}$.":::

:::widget type=numeric-input prompt="Two dice are rolled. What is the probability of rolling a double (both dice show the same number)? Type the numerator if denominator is $36$." answer=6 explain="Doubles: $(1,1), (2,2), (3,3), (4,4), (5,5), (6,6)$ — six. $P = \\dfrac{6}{36} = \\dfrac{1}{6}$.":::

:::widget type=numeric-input prompt="From a standard 52-card deck, what is $P(\\text{drawing the ace of spades})$? Type the denominator if numerator is $1$." answer=52 explain="Exactly one ace of spades in $52$ cards. $P = \\dfrac{1}{52}$.":::
