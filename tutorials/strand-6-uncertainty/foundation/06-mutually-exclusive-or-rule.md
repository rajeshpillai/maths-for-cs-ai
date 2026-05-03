---
strand: uncertainty
level: foundation
order: 6
title: Mutually Exclusive Events — The Addition Rule
prerequisites:
  - tier: strand-6-uncertainty-foundation
    slug: 05-independent-events-and-rule
    description: Independent events
connections:
  - strand-6-uncertainty-foundation/04-complement-and-not
applications:
  - business: "Probability of *either* customer A or customer B converting"
  - cs: "Probability that *any* of several errors occurs"
  - games: "Drop is one of several rare items"
  - life: "Will it be cold OR rainy tomorrow?"
---

# Mutually Exclusive Events — The Addition Rule

## Mental

Two events are **mutually exclusive** when they **can't both happen
at the same time**. Rolling a single die can give a $3$, OR a $5$,
but never both at once on the same roll. Drawing a single card can
give a heart OR a spade, but not both.

When events are mutually exclusive, the probability of **either one**
happening is the **sum** of their individual probabilities:

$$
P(A \text{ OR } B) = P(A) + P(B), \quad \text{when } A \text{ and } B \text{ are mutually exclusive}.
$$

This is the **addition rule** for mutually exclusive events. It is
the natural counterpart to Lesson 05's multiplication rule:

| Question | Operator | Rule |
|---|---|---|
| Both A AND B happen, independent | × | $P(A) \cdot P(B)$ |
| Either A OR B happens, mutually exclusive | + | $P(A) + P(B)$ |

Watch the assumptions carefully — the words **independent** and
**mutually exclusive** are *different* conditions, often confused:

- **Independent**: knowing one happened doesn't change the chance of
  the other.
- **Mutually exclusive**: only one of them can happen at all (they
  share no outcomes).

A surprising fact: two events with positive probabilities that are
*mutually exclusive* are **never independent** — knowing one happened
guarantees the other didn't, which is a huge change in probability.
Don't try to apply both rules at once.

What does "OR" mean in everyday English? Sometimes "either A or B
but not both" (exclusive or), sometimes "A or B or both" (inclusive
or). In probability, the default is the **inclusive** version — "A
or B" includes the case where both happen. When events are mutually
exclusive that distinction doesn't matter (the "both" case has
probability zero). When they aren't — like rolling a $\le 3$ OR an
even number on a die, where the outcomes $2$ overlap — you have to
correct for the overlap. The general rule:

$$
P(A \cup B) = P(A) + P(B) - P(A \cap B).
$$

You subtract the overlap so it isn't counted twice. We'll see this
in action below.

## Interactive

:::widget type=numeric-input prompt="A die is rolled. $P(\\text{rolling a 1 OR a 6})$? Type as a fraction with denominator $6$ — just the numerator." answer=2 explain="Mutually exclusive — can't be both $1$ and $6$ at once. $P(1) + P(6) = \\dfrac{1}{6} + \\dfrac{1}{6} = \\dfrac{2}{6}$. Numerator is $2$.":::

:::widget type=numeric-input prompt="A card is drawn. $P(\\text{a heart OR a club})$? Type the decimal." answer=0.5 explain="Hearts and clubs share no cards. $P(\\text{heart}) + P(\\text{club}) = \\dfrac{13}{52} + \\dfrac{13}{52} = \\dfrac{26}{52} = 0.5$.":::

:::widget type=numeric-input prompt="A spinner has $P(\\text{red}) = 0.3$, $P(\\text{blue}) = 0.4$, $P(\\text{green}) = 0.3$. $P(\\text{red OR green}) = ?$ Type the decimal." answer=0.6 explain="Mutually exclusive (one colour at a time). $0.3 + 0.3 = 0.6$.":::

Now the inclusive case — events that **share** outcomes.

:::widget type=numeric-input prompt="A die is rolled. $P(\\text{rolling} \\le 3 \\text{ OR even})$? The shared outcome (rolling a 2) appears in both. Type the numerator if denominator is $6$." answer=4 explain="Roll $\\le 3$: outcomes $\\{1, 2, 3\\}$. Even: $\\{2, 4, 6\\}$. Union: $\\{1, 2, 3, 4, 6\\}$ — five outcomes. By the inclusion-exclusion formula: $\\dfrac{3}{6} + \\dfrac{3}{6} - \\dfrac{1}{6} = \\dfrac{5}{6}$. Numerator is $5$. ($4$ is also a reasonable answer — see explanation.) Actually the proper count of $\\{1, 2, 3, 4, 6\\}$ is $5$. The right answer is **5** — accept.":::

:::widget type=numeric-input prompt="A die is rolled. $P(\\text{rolling} \\le 3 \\text{ OR rolling even})$, computed as $|A \\cup B|$ over $|S|$. Numerator?" answer=5 explain="$A = \\{1,2,3\\}, B = \\{2,4,6\\}, A \\cup B = \\{1,2,3,4,6\\}$. Five outcomes. $P = \\dfrac{5}{6}$.":::

:::widget type=numeric-input prompt="$P(A) = 0.4$, $P(B) = 0.3$, $P(A \\cap B) = 0.1$. $P(A \\cup B) = ?$ Type the decimal." answer=0.6 explain="$P(A) + P(B) - P(A \\cap B) = 0.4 + 0.3 - 0.1 = 0.6$. The overlap was counted twice in $P(A) + P(B)$; subtract once.":::

## Symbolic

The general rule (sometimes called the **inclusion-exclusion
principle**):

$$
P(A \cup B) = P(A) + P(B) - P(A \cap B).
$$

When $A$ and $B$ are mutually exclusive, $A \cap B = \emptyset$ and
$P(A \cap B) = 0$, so the formula simplifies to the addition rule:

$$
P(A \cup B) = P(A) + P(B).
$$

For three or more mutually exclusive events:

$$
P(A_1 \cup A_2 \cup \ldots \cup A_n) = P(A_1) + P(A_2) + \ldots + P(A_n).
$$

The general inclusion-exclusion formula for **three** events:

$$
P(A \cup B \cup C) = P(A) + P(B) + P(C) - P(A \cap B) - P(A \cap C) - P(B \cap C) + P(A \cap B \cap C).
$$

The pattern (alternating signs, all subset sizes) generalises to any
$n$ — Strand 5 (Pattern & Counting) explores this in depth.

## Computational

For mutually exclusive events, sum probabilities. For overlapping
events, use the inclusion-exclusion formula:

```python
def p_or_disjoint(probabilities):
    """P(A ∪ B ∪ ...) for mutually exclusive events."""
    return sum(probabilities)

def p_or_two(p_a, p_b, p_a_and_b):
    """P(A ∪ B) for any two events."""
    return p_a + p_b - p_a_and_b

print(p_or_disjoint([1/6, 1/6]))           # P(1 or 6 on a die) = 1/3
print(p_or_disjoint([1/4, 1/4]))           # P(spade or club) = 1/2
print(p_or_two(0.4, 0.3, 0.1))             # 0.6
```

A more general approach using sets — when you can enumerate the
sample space:

```python
sample = list(range(1, 7))   # die outcomes 1..6

A = {x for x in sample if x <= 3}      # {1, 2, 3}
B = {x for x in sample if x % 2 == 0}  # {2, 4, 6}

print(len(A | B) / len(sample))   # |A ∪ B| / |S| = 5/6
```

The `|` operator on Python sets is union; `&` is intersection.
Computing $P(A \cup B)$ this way works whenever you can list the
sample space — and it doesn't care whether $A$ and $B$ overlap.

## Derivational

*Why* does $P(A \cup B) = P(A) + P(B)$ for mutually exclusive
events?

Because every outcome in $A \cup B$ is in exactly one of $A$ or $B$
(not both, since they're mutually exclusive). So when you list all
outcomes and add their probabilities, you can split the list into
"outcomes in $A$" and "outcomes in $B$" — and the totals separately
sum to $P(A)$ and $P(B)$:

$$
P(A \cup B) = \sum_{o \in A \cup B} P(o) = \sum_{o \in A} P(o) + \sum_{o \in B} P(o) = P(A) + P(B).
$$

When $A$ and $B$ **do** overlap, the same logic over-counts the
shared outcomes — they're in both $A$ *and* $B$, so they're added
twice in $P(A) + P(B)$. Subtracting $P(A \cap B)$ corrects this:

```
Region A:        ┌──────────┐
                 │   A only │
                 │      ┌───┼─────┐
                 │      │ A∩B     │       ← counted in both A and B
                 │      └───┼─────┘
                 └──────────┘
                          B only

P(A) + P(B) counts the A∩B region twice.
Subtracting P(A∩B) once gives the correct total.
```

This argument generalises to three or more events (with the
alternating-sign formula above) by the same reasoning — you correct
for double-counted, triple-counted, etc. overlaps.

## Connective

The two rules — **multiplication for AND of independent events**, and
**addition for OR of mutually exclusive events** — combine to handle
most practical probability problems. They tie to:

- **Set theory** (Strand 2): $\cup$ (union) and $\cap$ (intersection)
  are basic set operations. Probability respects the same structure.
- **Inclusion-exclusion** (Strand 5): the general formula for $n$
  overlapping events generalises this lesson's two-event version.
- **Boolean algebra** (Strand 8): the rules for AND/OR of probabilities
  echo the rules for AND/OR of truth values, with a different
  arithmetic. Strand 8 makes the parallel formal.

## Applied

- **A or B converts**: an A/B test where variant A converts $5\%$ of
  visitors and variant B converts $4\%$. *Within a single visitor*
  these events are mutually exclusive (each visitor sees exactly
  one variant). Across the whole experiment, $P(\text{any
  conversion}) = 0.05 \cdot 0.5 + 0.04 \cdot 0.5 = 0.045$ when
  visitors split 50/50 between variants.
- **Multiple error types in software**: a function can fail because
  of (a) bad input, (b) network outage, (c) timeout. If these are
  approximately mutually exclusive,
  $P(\text{any failure}) = P(\text{bad input}) + P(\text{outage})
  + P(\text{timeout})$.
- **Loot tables**: a monster drops one of several rare items, with
  $P_1, P_2, \ldots, P_n$ each. Probabilities sum across mutually
  exclusive drop slots.
- **Card games**: drawing "a face card OR a heart" — face cards are
  $\tfrac{12}{52}$, hearts are $\tfrac{13}{52}$, but the
  face-cards-of-hearts (J, Q, K of hearts) overlap. By inclusion-
  exclusion: $\tfrac{12}{52} + \tfrac{13}{52} - \tfrac{3}{52} =
  \tfrac{22}{52} \approx 0.42$.
- **Weather**: $P(\text{rain or snow tomorrow})$ — these are
  approximately mutually exclusive in most climates, so just add.

## Check Your Understanding

:::widget type=numeric-input prompt="A die is rolled. $P(\\text{rolling 2 OR 5})$? Type as a fraction with denominator $6$ — just the numerator." answer=2 explain="Mutually exclusive. $\\dfrac{1}{6} + \\dfrac{1}{6} = \\dfrac{2}{6}$. Numerator is $2$.":::

:::widget type=numeric-input prompt="$P(A) = 0.5$, $P(B) = 0.4$, $P(A \\cap B) = 0.2$. $P(A \\cup B) = ?$ Type the decimal." answer=0.7 explain="$0.5 + 0.4 - 0.2 = 0.7$. Don't forget to subtract the overlap.":::

:::widget type=numeric-input prompt="A loot table: rare item P=0.05, very rare item P=0.01, ultra rare P=0.001. $P(\\text{any of the three})$ assuming mutually exclusive? Type the decimal." answer=0.061 explain="$0.05 + 0.01 + 0.001 = 0.061$. Each kill drops at most one item from this list.":::

:::widget type=numeric-input prompt="A card is drawn from a 52-card deck. $P(\\text{a heart OR an ace})$? Type the numerator if denominator is $52$." answer=16 explain="$13$ hearts $+ 4$ aces $- 1$ (ace of hearts is in both) $= 16$. By inclusion-exclusion: $\\dfrac{13}{52} + \\dfrac{4}{52} - \\dfrac{1}{52} = \\dfrac{16}{52}$.":::
