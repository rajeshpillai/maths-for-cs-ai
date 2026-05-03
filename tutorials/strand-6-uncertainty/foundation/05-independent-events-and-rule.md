---
strand: uncertainty
level: foundation
order: 5
title: Independent Events — The Multiplication Rule
prerequisites:
  - tier: strand-6-uncertainty-foundation
    slug: 04-complement-and-not
    description: Complement and "at least one"
connections:
  - strand-6-uncertainty-foundation/06-mutually-exclusive-or-rule
  - strand-6-uncertainty-foundation/07-conditional-probability-intuition
applications:
  - business: "Probability that two unrelated systems both succeed (or both fail)"
  - cs: "Independent test cases passing; redundant network paths working"
  - games: "Two independent chance events both triggering (e.g., crit AND rare drop)"
  - life: "Will it rain AND will my flight be delayed? — combined chances"
---

# Independent Events — The Multiplication Rule

## Mental

Two events are **independent** when one happening doesn't change the
chance of the other. Coin flips are the classic example — what
happened on flip $1$ doesn't affect flip $2$. The coin has no
memory.

When events are independent, the probability of **both** happening is
the **product** of their individual probabilities:

$$
P(A \text{ AND } B) = P(A) \cdot P(B), \quad \text{when } A \text{ and } B \text{ are independent}.
$$

That's the **multiplication rule** for independent events. You've
actually been using it since Lesson 04 — when we computed
$P(\text{no } 6 \text{ in 4 rolls}) = (\tfrac{5}{6})^4$, we were
multiplying four independent probabilities together.

The intuition: each independent event "filters" the sample space.
$P(A) = 0.5$ keeps half. Then $P(B) = 0.5$ keeps half of *that*.
What's left is a quarter. **Multiplication is the right operation
for "AND" of independent events.**

The single most important word in the rule is **independent**. If
the events are *not* independent — if one affects the other — you
need a different formula (Lesson 07). Most beginners' mistakes
come from using the multiplication rule when independence doesn't
hold.

What does independence look like in practice?

- **Independent**: flipping the same coin twice. Drawing two cards
  from two *different* decks. Two unrelated machines failing on
  the same day. Whether it rains tomorrow and whether your phone
  battery dies.
- **NOT independent**: drawing two cards from the *same* deck
  without replacement (the first draw changes what's left). Two
  weather observations from the same city ten minutes apart (they
  are highly correlated). Two test results from the same patient.

Whenever the events share an underlying *cause*, they are typically
not independent.

## Interactive

Compute "AND" probabilities using $P(A) \cdot P(B)$.

:::widget type=numeric-input prompt="Two fair coins are flipped (the same coin twice, or two coins). $P(\\text{both heads}) = ?$ Type as a fraction with denominator $4$ — just the numerator." answer=1 explain="$P(\\text{H on first}) \\cdot P(\\text{H on second}) = \\dfrac{1}{2} \\cdot \\dfrac{1}{2} = \\dfrac{1}{4}$. Numerator $1$.":::

:::widget type=numeric-input prompt="Two fair dice. $P(\\text{both show 6}) = ?$ Type as a fraction with denominator $36$ — just the numerator." answer=1 explain="$\\dfrac{1}{6} \\cdot \\dfrac{1}{6} = \\dfrac{1}{36}$. Numerator $1$.":::

:::widget type=numeric-input prompt="A spinner has $P(\\text{green}) = 0.3$. Spin it twice. $P(\\text{green both times}) = ?$ Type the decimal." answer=0.09 explain="$0.3 \\times 0.3 = 0.09$. Independent spins multiply.":::

:::widget type=numeric-input prompt="$P(\\text{rain tomorrow}) = 0.4$. $P(\\text{flight delayed}) = 0.2$. Assume independent. $P(\\text{rain AND delay}) = ?$ Type the decimal." answer=0.08 explain="$0.4 \\times 0.2 = 0.08$. Both happening at once is much rarer than either one alone.":::

Now watch the multiplication rule live. Run paired coin flips and
look at the proportion of $HH$ — it should converge to $0.25$.

:::widget type=probability-sim experiment=two-coins step=200 target=HH:::

Notice the four outcome bars settle to roughly equal heights ($0.25$
each), and the highlighted "$HH$" matches the theoretical line. With
enough trials, the multiplication rule's prediction is exactly what
the simulation produces.

:::widget type=numeric-input prompt="A 5-card poker deal: $P(\\text{first card is a spade AND second card is a spade})$? (Be careful — are these *independent*?) Type 1 if they are independent, 0 if not." answer=0 explain="**Not** independent. After drawing one spade, the deck has only $12$ spades left out of $51$ cards — the second-draw probability changed. The naive multiplication $\\dfrac{13}{52} \\cdot \\dfrac{13}{52}$ would be wrong. The correct calculation uses *conditional* probability (Lesson 07).":::

## Symbolic

Independence is defined formally by the multiplication rule itself:

> Events $A$ and $B$ are **independent** if and only if
>
> $$P(A \cap B) = P(A) \cdot P(B).$$

The $\cap$ symbol is "intersection" — it means "$A$ AND $B$."
$A \cap B$ is the event consisting of outcomes that are in both
$A$ *and* $B$.

This is unusual: most rules describe what happens *given* some
property. This rule **defines** the property. Two events are
independent precisely when their joint probability equals the
product. Anything else, and they aren't.

For more than two independent events:

$$
P(A_1 \cap A_2 \cap \ldots \cap A_n) = P(A_1) \cdot P(A_2) \cdot \ldots \cdot P(A_n),
$$

which is the formula behind every "$n$ independent trials" calculation.
Setting all $P(A_i) = p$ gives $P(\text{all } n \text{ succeed}) = p^n$
— the formula from Lesson 04.

A common variant: when events are independent, **the complement of
their AND** is

$$
P(\text{not all of them happen}) = 1 - p_1 \cdot p_2 \cdot \ldots \cdot p_n.
$$

Combining this with the complement rule gives the "$1 - (1-p)^n$"
formula for "at least one" that Lesson 04 used.

## Computational

The multiplication rule, in code:

```python
def p_all(probabilities):
    """P(all events happen) for independent events."""
    result = 1
    for p in probabilities:
        result = result * p
    return result

# Two coin flips both heads
print(p_all([0.5, 0.5]))         # 0.25

# Three independent rare events, each P = 0.1
print(p_all([0.1, 0.1, 0.1]))    # 0.001

# Reliability: 5 redundant systems each up with P = 0.99
# What's the chance ALL are up?
print(p_all([0.99] * 5))          # 0.951
```

Verify with simulation:

```python
import random

def simulate_both(p_a, p_b, trials=100_000):
    both = 0
    for _ in range(trials):
        a = random.random() < p_a
        b = random.random() < p_b
        if a and b:
            both = both + 1
    return both / trials

random.seed(0)
print(simulate_both(0.4, 0.2))   # close to 0.08
print(simulate_both(0.5, 0.5))   # close to 0.25
```

Because the trials are independent in the simulation, the empirical
fraction tracks the theoretical product.

## Derivational

*Why* does $P(A \cap B) = P(A) \cdot P(B)$ for independent events?

Picture the sample space $S$ as a unit square of area $1$. The event
$A$ is a region of that square taking up area $P(A)$. The event $B$
is *another* region taking up area $P(B)$.

**Independence** means $B$ is "spread uniformly" with respect to $A$
— knowing you're in $A$ doesn't shift you toward or away from $B$.
That's the key: the same fraction of $A$ is in $B$ as the fraction of
$S$ that's in $B$, namely $P(B)$.

So the slice $A \cap B$ has area $P(A) \cdot P(B)$:

```
+----------------------------+
|                            |
|       region A             |  <- area P(A)
|       (rest of S)          |
|                            |
|     +--------+             |
|     | A ∩ B  |             |  <- this area is P(A) × P(B)
|     +--------+             |
|                            |
+----------------------------+
```

Independence is precisely the geometric statement: the rectangle
$A \cap B$ has the dimensions you'd expect from two unrelated
events.

When events are *dependent*, the slice $A \cap B$ has a different
area — knowing you're in $A$ shifts you toward (or away from) $B$.
That's where Lesson 07's conditional probability formula comes in.

## Connective

Independence is one of the most consequential structural ideas in
probability:

- **Conditional probability** (Lesson 07): the relationship $P(A
  \cap B) = P(A) \cdot P(B|A)$ holds always; independence is the
  special case where $P(B|A) = P(B)$.
- **Statistics** (Strand 6 Intermediate): random samples from a
  population are designed to be independent. Most of statistics'
  formulas assume independence; relaxing it requires substantially
  harder math.
- **Naive Bayes classifiers** (Strand 6 Advanced) in machine
  learning: they assume features are conditionally independent,
  which is rarely true but works well anyway.
- **Random number generators**: a "good" RNG produces independent
  successive numbers. Pattern in successive values means
  dependence — and a poor RNG.

The complement-and-multiplication combination — Lesson 04 + Lesson
05 — handles a huge fraction of all probability problems you'll
ever meet.

## Applied

- **Reliability engineering**: a system is up only if all $n$
  redundant components are up. With each component up
  independently with $p = 0.99$, the system is up with $p^n$.
  For $n = 5$, that's $0.951$. Adding redundancy *helps* when
  failures are independent, but only multiplies risk when they
  share a cause (e.g., same power supply).
- **Game crit + rare drop**: a sword has $5\%$ crit chance and an
  enemy drops a rare item with $2\%$ chance. Assuming independent,
  $P(\text{crit AND rare drop in one hit}) = 0.05 \times 0.02 =
  0.001 = 0.1\%$. Rare events compound fast.
- **Cryptography**: a strong password is hard to guess because
  each character is *roughly* an independent choice. An $8$-character
  password from $94$ printable ASCII characters has $94^8 \approx
  6 \times 10^{15}$ possibilities. Independence is what makes
  brute-force search hard.
- **Drug safety trials**: two independent tests each with $1\%$
  false-positive rate give $0.01 \times 0.01 = 0.0001$ chance of
  a false positive on both. Hence the obsession with replication.
- **Software systems**: two independent verification tools (one
  catches a bug with $80\%$, the other with $80\%$) miss the bug
  with $0.2 \times 0.2 = 4\%$ — both find it $96\%$ of the time.

## Check Your Understanding

:::widget type=numeric-input prompt="A coin is flipped and a die is rolled. $P(\\text{heads AND a 6})$? Type as fraction with denominator $12$ — just the numerator." answer=1 explain="Independent events. $\\dfrac{1}{2} \\cdot \\dfrac{1}{6} = \\dfrac{1}{12}$. Numerator is $1$.":::

:::widget type=numeric-input prompt="$P(A) = 0.6$, $P(B) = 0.5$, independent. $P(A \\text{ AND } B) = ?$ Type the decimal." answer=0.3 explain="$0.6 \\times 0.5 = 0.30$. Multiplication rule applies because they're independent.":::

:::widget type=numeric-input prompt="A drug works on $80\\%$ of patients. Two patients are independently treated. $P(\\text{both helped})$? Type the decimal." answer=0.64 explain="$0.8 \\times 0.8 = 0.64$. Independence assumed: one patient's response doesn't affect the other's.":::

:::widget type=numeric-input prompt="Three coins are flipped. $P(\\text{all heads})$? Type as a fraction with denominator $8$ — just the numerator." answer=1 explain="$\\dfrac{1}{2} \\cdot \\dfrac{1}{2} \\cdot \\dfrac{1}{2} = \\dfrac{1}{8}$. Three independent flips multiply.":::
