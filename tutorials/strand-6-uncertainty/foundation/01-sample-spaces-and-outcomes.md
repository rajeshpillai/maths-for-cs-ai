---
strand: uncertainty
level: foundation
order: 1
title: Sample Spaces and Outcomes
prerequisites:
  - tier: strand-6-uncertainty-foundation
    slug: 00-what-is-probability
    description: What is probability?
connections:
  - strand-1-number-quantity-foundation/00-counting-and-correspondence
  - strand-6-uncertainty-foundation/02-equally-likely-outcomes
applications:
  - business: "Listing all possible outcomes of a deal — winning, losing, deadlock"
  - cs: "Enumerating states of a finite-state machine; testing all branches"
  - games: "Rolling tables, loot tables, deck configurations"
  - life: "Listing what could go wrong before any decision matters"
---

# Sample Spaces and Outcomes

## Mental

Before you can compute the probability of *anything*, you need to be
clear about **what could happen**. That collection — the full list of
possibilities — is called the **sample space**, and it is to
probability what a recipe is to cooking: nothing else works without
it.

A few examples to anchor the words:

- Flip a single coin. The sample space is $\{\text{heads}, \text{tails}\}$
  — exactly two possibilities.
- Roll a single die. The sample space is $\{1, 2, 3, 4, 5, 6\}$ — six.
- Draw a card from a standard deck. The sample space has $52$ entries.
- Flip *two* coins. The sample space is $\{HH, HT, TH, TT\}$ — four
  entries, because each coin can independently be H or T.

Two terms get used a lot from now on, so we'll pin them down:

- An **outcome** is a single entry in the sample space. "$5$" is one
  outcome of rolling a die. "$HT$" is one outcome of flipping two
  coins.
- An **event** is *any collection* of outcomes you care about. "Rolling
  an even number" is an event — it bundles three outcomes ($2, 4, 6$)
  together. "Getting at least one heads" on two coins is an event
  bundling three outcomes ($HH, HT, TH$).

The trick to almost any probability question is **listing the sample
space carefully** and then **counting which outcomes are in your
event**. If you can do those two things, the probability formula does
the rest:

$$
P(\text{event } A) = \frac{|A|}{|S|},
$$

where $S$ is the sample space and $A$ is the event (Lesson 02 will
make heavy use of this).

The pitfall: it is easy to **double-count** or **miss outcomes**.
Listing $HT$ and $TH$ as different outcomes is correct (the first
coin can be heads while the second is tails, *or vice versa*). Listing
them as the same outcome is wrong — and would give you the wrong
probability. We'll see this concretely.

## Interactive

Some sample-space sizing.

:::widget type=numeric-input prompt="How many outcomes are in the sample space when you roll a single fair die?" answer=6 explain="$\\{1, 2, 3, 4, 5, 6\\}$ — six possibilities.":::

:::widget type=numeric-input prompt="How many outcomes are in the sample space when you flip two distinguishable coins (call them A and B)?" answer=4 explain="$\\{HH, HT, TH, TT\\}$ — four. Each coin independently can be H or T, so $2 \\times 2 = 4$ pairs.":::

:::widget type=numeric-input prompt="A bag has 3 red, 4 blue, and 5 green marbles. How many outcomes are in the sample space when you draw one marble?" answer=12 explain="$3 + 4 + 5 = 12$ marbles, so $12$ possible outcomes.":::

:::widget type=numeric-input prompt="In the two-coin sample space $\\{HH, HT, TH, TT\\}$, how many outcomes are in the event 'at least one heads'?" answer=3 explain="Three outcomes — $HH$, $HT$, $TH$ — each contain at least one heads. Only $TT$ doesn't.":::

:::widget type=numeric-input prompt="Roll one die. How many outcomes are in the event 'rolled a multiple of 3'?" answer=2 explain="Multiples of 3 in $\\{1, 2, 3, 4, 5, 6\\}$: just $3$ and $6$. Two outcomes. So $P(\\text{multiple of 3}) = \\dfrac{2}{6} = \\dfrac{1}{3}$.":::

## Symbolic

The sample space is usually written $S$ (sometimes $\Omega$ — capital
Greek omega). An event is a **subset** of the sample space:

$$
A \subseteq S
$$

(read "$A$ is a subset of $S$" — every element of $A$ is also an
element of $S$). Two extreme cases:

- $A = S$ — the event "any outcome happens." This is **certain**, so
  $P(S) = 1$.
- $A = \emptyset$ — the **empty set**, the event with no outcomes in
  it. This is the impossible event, so $P(\emptyset) = 0$.

When sample spaces have a **product** structure — like flipping two
coins or rolling two dice — you can enumerate them by combining the
two pieces. The two-coin sample space is

$$
\{H, T\} \times \{H, T\} = \{HH, HT, TH, TT\}.
$$

That $\times$ is the **Cartesian product** (Strand 2 will name it
formally). It says: take every pair where the first piece is from
the first set and the second is from the second. The size multiplies:
$|\{H, T\}| \times |\{H, T\}| = 2 \times 2 = 4$. Two dice gives
$|S| = 6 \times 6 = 36$. Three coins gives $2^3 = 8$.

This **multiplication-of-sample-spaces** principle is the most
useful counting tool you have. We'll lean on it constantly.

## Computational

Python's `itertools` module enumerates Cartesian products directly:

```python
from itertools import product

# Sample space for two coins
two_coins = list(product(["H", "T"], repeat=2))
print(two_coins)
# [('H', 'H'), ('H', 'T'), ('T', 'H'), ('T', 'T')]
print(len(two_coins))   # 4

# Sample space for two dice (each side 1..6)
two_dice = list(product(range(1, 7), repeat=2))
print(len(two_dice))    # 36

# Sample space for three coins
three_coins = list(product(["H", "T"], repeat=3))
print(len(three_coins))  # 8
```

Once you have the sample space as a list, **events are filters**:

```python
# All outcomes where the sum of two dice is 7
sum_seven = [pair for pair in two_dice if pair[0] + pair[1] == 7]
print(sum_seven)
# [(1, 6), (2, 5), (3, 4), (4, 3), (5, 2), (6, 1)]
print(len(sum_seven))   # 6

# Probability:
print(len(sum_seven) / len(two_dice))   # 0.166... = 6/36 = 1/6
```

That right there — generate sample space, filter to event, divide —
is the most common probability pattern you'll see in code. It works
for any equally-likely-outcomes problem, no matter how baroque.

## Derivational

*Why* does $|A \times B| = |A| \cdot |B|$?

Because every element of $A \times B$ is a pair: a choice from $A$
followed by a choice from $B$. There are $|A|$ choices for the first
slot and, for each of those, $|B|$ choices for the second. The total
number of pairs is $|A|$ rows of $|B|$ columns:

```
   |   B₁   B₂   ...   B_m
---|--------------------------
A₁ | A₁B₁ A₁B₂  ...  A₁B_m   ← m pairs in this row
A₂ | A₂B₁ A₂B₂  ...  A₂B_m   ← m pairs in this row
   |       ⋮
A_n | A_nB₁ ... A_nB_m       ← m pairs in this row
```

$n$ rows, each with $m$ pairs, gives $n \cdot m$ pairs in total.

This generalises immediately. Three independent choices: $|A| \cdot
|B| \cdot |C|$. Roll three dice: $6 \cdot 6 \cdot 6 = 216$ outcomes.
Flip $k$ coins: $2 \cdot 2 \cdot \ldots \cdot 2 = 2^k$ outcomes. The
counts grow fast — flipping $20$ coins has over a million outcomes.

This counting principle is so important that it has a name: the
**multiplication principle for independent choices**, and it is the
single most useful tool in combinatorics. Strand 5 (Pattern &
Counting) uses it relentlessly.

## Connective

Sample-space thinking ties to ideas you've already met:

- **Counting** (Strand 1, Lesson 00): determining $|S|$ is just
  counting outcomes carefully — making sure you don't miss any and
  don't double-count.
- **Sets** (forward reference, Strand 2): events are subsets of the
  sample space. Strand 2 will give you the formal vocabulary
  (intersection, union, complement) that we're already using
  informally here.
- **Cartesian product**: in Strand 7 you'll see the same idea used
  to enumerate states of a system in computer science (e.g., all
  combinations of player position × score × time-remaining).

You'll see the words "sample space" used in any probability lesson
that follows. Strand 6 Intermediate will deal with **continuous**
sample spaces (e.g., where the sample space is "any real number
between 0 and 1") — but the idea is the same; the counting just gets
replaced by integration.

## Applied

- **Game design**: a slot machine with three reels, each showing one
  of $20$ symbols, has a sample space of $20^3 = 8000$ outcomes.
  The designer can tune which combinations pay out and at what rate.
- **A poker deck**: $52$ cards, so a single-card draw has $|S| = 52$.
  A five-card hand has $\binom{52}{5} = 2\,598\,960$ outcomes — too
  many to list, but the multiplication principle still computes
  the count.
- **Software testing**: enumerating possible inputs is a sample-space
  problem. A function with two booleans and one $0$–$255$ byte has
  $2 \times 2 \times 256 = 1024$ input combinations. Exhaustive
  testing is feasible. With three integers up to $1000$, you have
  a billion combinations and exhaustive testing is impossible —
  hence "property-based testing" (Strand 6 Advanced).
- **Genetics**: each parent contributes one of two alleles. With
  one gene per parent, the sample space of offspring is
  $2 \times 2 = 4$. Punnett squares are sample-space tables.
- **State of an arithmetic test**: a test with $10$ questions, each
  marked right or wrong, has $2^{10} = 1024$ possible result
  patterns. This is what teachers and standardised-test designers
  reason about when they design grading curves.

## Check Your Understanding

:::widget type=numeric-input prompt="A red die and a blue die are both rolled. How many outcomes in the sample space?" answer=36 explain="$|\\{1,...,6\\}| \\times |\\{1,...,6\\}| = 6 \\times 6 = 36$. The dice are distinguishable (different colours) so $(red=2, blue=5)$ is a different outcome from $(red=5, blue=2)$.":::

:::widget type=numeric-input prompt="Three coins are flipped. How many outcomes in the sample space?" answer=8 explain="$2 \\times 2 \\times 2 = 8$. The outcomes: $HHH, HHT, HTH, HTT, THH, THT, TTH, TTT$.":::

:::widget type=numeric-input prompt="In the two-dice sample space (36 outcomes), how many outcomes have sum equal to 7?" answer=6 explain="$\\{(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)\\}$ — six pairs. So $P(\\text{sum} = 7) = \\dfrac{6}{36} = \\dfrac{1}{6}$.":::

:::widget type=numeric-input prompt="A multiple-choice quiz has 5 questions, each with 4 possible answers. How many ways could a student fill in the answer sheet?" answer=1024 explain="$4 \\times 4 \\times 4 \\times 4 \\times 4 = 4^5 = 1024$. Each question is an independent choice of 4.":::
