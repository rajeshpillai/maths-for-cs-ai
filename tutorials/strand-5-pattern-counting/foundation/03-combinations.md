---
strand: pattern-counting
level: foundation
order: 3
title: Combinations — When Order Doesn't Matter
prerequisites:
  - tier: strand-5-pattern-counting-foundation
    slug: 02-permutations-and-factorial
    description: Permutations and factorial
connections:
  - strand-5-pattern-counting-foundation/04-pascals-triangle
  - strand-6-uncertainty-foundation/02-equally-likely-outcomes
applications:
  - business: "Selecting committee members; choosing test groups; product bundles"
  - cs: "Choosing $k$ features in ML, subset enumeration, set cover"
  - games: "Drawing $5$ cards from a deck, picking lottery numbers"
  - life: "Pizza topping combos (without ordering!), team selection"
---

# Combinations — When Order Doesn't Matter

## Explain Like I Am 7

Picture a bowl of five different candies.  You're allowed to grab
three of them and stuff them in your pocket.  The pocket doesn't care
which one you grabbed first — only *which three* end up inside.  If
you first count every grabbing-order ($5 \times 4 \times 3 = 60$),
each pocketful of three is counted six times (because three candies
can be picked in $3! = 6$ different orders).  Divide $60$ by $6$ and
you get $10$ different pocketfuls.  That's a **combination**: counting
groups when order is forgotten.

## Mental

Lesson 02 counted **ordered** arrangements. Now we count **unordered**
selections.

Suppose you want to pick $3$ pizza toppings out of a list of $5$:
mushroom, pepperoni, olives, peppers, onions. The pizza doesn't care
about the order — "mushroom-olives-peppers" is the same pizza as
"peppers-olives-mushroom." Both are the same **set** of toppings.

How many such pizzas?

We could start by counting **ordered** triples (permutations): $P(5,
3) = 5 \cdot 4 \cdot 3 = 60$. But this overcounts — each set of $3$
toppings has been counted once for each of its orderings. Three
toppings can be ordered $3! = 6$ ways. So we **divide**:

$$
\frac{P(5, 3)}{3!} = \frac{60}{6} = 10.
$$

Ten distinct $3$-topping pizzas.

The general formula is the **combination** — also known as the
**binomial coefficient**:

$$
\binom{n}{k} = \frac{P(n, k)}{k!} = \frac{n!}{k! (n - k)!}.
$$

The notation $\binom{n}{k}$ — read "$n$ choose $k$" — is the count of
unordered $k$-element subsets of an $n$-element set.

A few values:

| $\binom{n}{k}$ | $k = 0$ | $k = 1$ | $k = 2$ | $k = 3$ | $k = 4$ |
|---|---|---|---|---|---|
| $n = 0$ | $1$ | | | | |
| $n = 1$ | $1$ | $1$ | | | |
| $n = 2$ | $1$ | $2$ | $1$ | | |
| $n = 3$ | $1$ | $3$ | $3$ | $1$ | |
| $n = 4$ | $1$ | $4$ | $6$ | $4$ | $1$ |
| $n = 5$ | $1$ | $5$ | $10$ | $10$ | $5$ |

Notice the **symmetry**: $\binom{n}{k} = \binom{n}{n-k}$.
Choosing $k$ to **include** is the same as choosing $n - k$ to
**exclude**. Same count, different framing.

This table is **Pascal's triangle**, the subject of Lesson 04.

## Permutation vs. combination — the distinguishing question

Whenever a counting problem comes up, ask: **does order matter?**

- Order matters → permutation.
- Order doesn't matter → combination.

Examples:

- Race finishes (gold, silver, bronze): **permutation** — order
  matters. $P(8, 3) = 336$.
- Lottery: **combination** — drawing $\{4, 19, 32, \ldots\}$ in any
  order is the same ticket. $\binom{49}{6}$.
- Anagram counting (distinct letters): **permutation** — CARS and
  ARCS are different. $4! = 24$.
- Choosing $5$ cards from a deck (a hand): **combination** — the
  order you draw them in doesn't matter once you have them.
  $\binom{52}{5}$.

## Interactive

:::widget type=numeric-input prompt="$\\binom{5}{2} = ?$" answer=10 explain="$\\dfrac{5!}{2! \\cdot 3!} = \\dfrac{5 \\cdot 4}{2} = 10$.":::

:::widget type=numeric-input prompt="$\\binom{6}{3} = ?$" answer=20 explain="$\\dfrac{6!}{3! \\cdot 3!} = \\dfrac{6 \\cdot 5 \\cdot 4}{3 \\cdot 2} = \\dfrac{120}{6} = 20$.":::

:::widget type=numeric-input prompt="A team of $3$ is chosen from $7$ candidates. How many possible teams?" answer=35 explain="$\\binom{7}{3} = \\dfrac{7!}{3! 4!} = \\dfrac{7 \\cdot 6 \\cdot 5}{6} = 35$. Order of selection doesn't matter — the team is a set.":::

:::widget type=numeric-input prompt="A pizza place offers $8$ toppings. You pick exactly $3$ (no doubles). How many distinct pizzas?" answer=56 explain="$\\binom{8}{3} = \\dfrac{8!}{3! 5!} = \\dfrac{8 \\cdot 7 \\cdot 6}{6} = 56$.":::

:::widget type=numeric-input prompt="$\\binom{52}{5}$ is a famous number — how many distinct $5$-card poker hands are there? (Round to nearest thousand if needed; the exact value is $2\\,598\\,960$.)" answer=2598960 explain="$\\binom{52}{5} = \\dfrac{52 \\cdot 51 \\cdot 50 \\cdot 49 \\cdot 48}{5!} = \\dfrac{311\\,875\\,200}{120} = 2\\,598\\,960$. Every probability of every poker hand has this denominator.":::

:::widget type=step-revealer
{
  "title": "Why $\\binom{n}{k}$ = $\\binom{n}{n-k}$",
  "steps": [
    {"prose": "Take any $k$-element subset of $\\{1, 2, \\ldots, n\\}$. There's a natural partner: the $(n-k)$-element subset of items **not** chosen."},
    {"math": "\\{1, 2, \\ldots, 7\\}, \\quad k = 3, \\quad \\text{example: } \\{1, 4, 6\\} \\leftrightarrow \\{2, 3, 5, 7\\}", "prose": "Each $3$-subset pairs with one specific $4$-subset (its complement). The pairing is one-to-one."},
    {"prose": "**One-to-one matching** (Strand 1 Foundation Lesson 00) means the two collections have the same count."},
    {"math": "\\binom{n}{k} = \\binom{n}{n-k}", "prose": "Proved without computing either side. **Choosing what to include is the same as choosing what to exclude.**"},
    {"math": "\\binom{49}{6} = \\binom{49}{43}", "prose": "Both equal $13\\,983\\,816$. Compute whichever side has the smaller $k$ — that's faster."}
  ]
}
:::

## Symbolic

The combination formula:

$$
\binom{n}{k} = \frac{n!}{k! (n-k)!}, \quad 0 \le k \le n.
$$

Equivalent forms:

$$
\binom{n}{k} = \frac{P(n, k)}{k!} = \frac{n(n-1)(n-2) \cdots (n-k+1)}{k!}.
$$

Special values:

$$
\binom{n}{0} = 1, \quad \binom{n}{n} = 1, \quad \binom{n}{1} = n, \quad \binom{n}{n-1} = n.
$$

The most useful identities at this level:

- **Symmetry**: $\binom{n}{k} = \binom{n}{n-k}$.
- **Pascal's identity** (Lesson 04 makes this central):

  $$
  \binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}.
  $$

  Either include item $n$ in your subset (then choose $k-1$ more
  from the remaining $n-1$) or exclude it (then choose all $k$
  from $n-1$). Two cases, mutually exclusive — sum the counts.

- **Sum of a row**: $\sum_{k=0}^n \binom{n}{k} = 2^n$ — the total
  number of subsets of an $n$-element set is $2^n$ (each element is
  independently in or out — multiplication principle from Lesson
  00).

## Computational

Python's `math.comb` (3.8+) computes $\binom{n}{k}$ exactly:

```python
import math
print(math.comb(5, 2))      # 10
print(math.comb(52, 5))     # 2598960
print(math.comb(100, 50))   # 100891344545564193334812497256 — exact, big integer
```

A from-scratch implementation:

```python
def comb(n, k):
    if k < 0 or k > n:
        return 0
    k = min(k, n - k)   # exploit symmetry — smaller k computes faster
    result = 1
    for i in range(k):
        result = result * (n - i) // (i + 1)
    return result

print(comb(5, 2))     # 10
print(comb(52, 5))    # 2598960
```

The trick `(n - i) // (i + 1)` keeps intermediate values small — the
result stays an integer because each partial product is itself a
binomial coefficient.

To **enumerate** $k$-subsets, `itertools.combinations`:

```python
from itertools import combinations

for combo in combinations(["mushroom", "pepperoni", "olives"], 2):
    print(combo)
# ('mushroom', 'pepperoni')
# ('mushroom', 'olives')
# ('pepperoni', 'olives')

# Count enumerated == binomial coefficient:
print(len(list(combinations("ABCDE", 3))))   # 10 = C(5, 3)
```

For huge $n$, enumeration is infeasible (there are $2.6$ million
poker hands), but the formula gives the count instantly.

## Derivational

*Why* is $\binom{n}{k} = \dfrac{n!}{k!(n-k)!}$?

The argument has three steps:

**Step 1**: Count permutations of all $n$ items: $n!$.

**Step 2**: Each permutation determines a $k$-subset (the first $k$
items) plus an ordering of those $k$ items plus an ordering of the
remaining $n - k$ items.

**Step 3**: Each $k$-subset corresponds to $k! \cdot (n-k)!$
permutations: $k!$ orderings of the chosen items times $(n-k)!$
orderings of the rest.

So:

$$
n! = \binom{n}{k} \cdot k! \cdot (n-k)!,
$$

which rearranges to $\binom{n}{k} = \dfrac{n!}{k!(n-k)!}$.

This same kind of "count one structure two ways" argument — called
**combinatorial double-counting** — is one of the most powerful
proof techniques in the strand. Lesson 04 will use it to prove
Pascal's identity geometrically.

## Connective

Combinations are everywhere in counting and probability:

- **Lottery odds**: Strand 6 Lesson 02 used $\binom{49}{6}$. The
  combinatorial coefficient is the denominator of every lottery
  probability.
- **Poker probabilities**: $\binom{52}{5}$ for any 5-card hand;
  numerators count specific hand types (flushes, straights, etc.).
- **Subsets and the binomial theorem** (Lesson 05): $(a + b)^n =
  \sum_{k=0}^n \binom{n}{k} a^{n-k} b^k$.
- **Pascal's triangle** (Lesson 04): the table of all $\binom{n}{k}$
  values, with built-in recursive structure.
- **Combinations with repetition** (Lesson 06 — stars and bars):
  the variant where items can be chosen multiple times.

In CS:

- **Subset enumeration**: a set of $n$ elements has $2^n$ subsets;
  exactly $\binom{n}{k}$ of size $k$.
- **Bitmask DP**: dynamic programs over subsets often loop over
  $\binom{n}{k}$ states.
- **Hash/probability analyses**: the birthday paradox compares
  $n$ items in $m$ buckets; collision probability uses
  $\binom{n}{2}$ pairs.

## Applied

- **Lottery**: $6$ numbers from $1$–$49$ → $\binom{49}{6} =
  13\,983\,816$ tickets. The probability of winning the jackpot
  with one ticket is $1$ in $14$ million.
- **Poker**: any specific $5$-card hand has probability
  $\dfrac{1}{\binom{52}{5}} \approx 1$ in $2.6$ million. Royal
  flushes (one per suit) have probability $\dfrac{4}{\binom{52}{5}}$.
- **Test groups in clinical trials**: choose $200$ patients out of
  $1000$ for a treatment group: $\binom{1000}{200}$ possible
  groups — astronomically large; randomisation is uniform among
  these.
- **Committee selection**: a board of $12$ chooses $3$ to form a
  subcommittee: $\binom{12}{3} = 220$ possible subcommittees.
- **Software dependencies**: a library has $50$ dependencies. How
  many sets of "exactly $5$ to upgrade" can a maintainer choose?
  $\binom{50}{5} = 2\,118\,760$.
- **March Madness**: a $64$-team bracket — the number of distinct
  brackets (every game's winner specified) is $2^{63} \approx 9.2
  \times 10^{18}$. Picking a perfect bracket is harder than any
  lottery.
- **Board Exam / JEE (CBSE Class 11, Chapter 7 — Permutations and
  Combinations)** — NCERT Ex 7.4 drills ${}^nC_r = n!/(r!\,(n-r)!)$
  on selection problems where order doesn't matter. Standard JEE
  setups: choose a cricket team of 11 from 17 with exactly 4
  bowlers from the 5 available — ${}^5C_4 \cdot {}^{12}C_7$;
  number of diagonals of an $n$-gon is ${}^nC_2 - n$; number of
  handshakes among $n$ people is ${}^nC_2$. Memorise the symmetry
  ${}^nC_r = {}^nC_{n-r}$ and Pascal's identity
  ${}^nC_r + {}^nC_{r-1} = {}^{n+1}C_r$.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\binom{4}{2} = ?$" answer=6 explain="$\\dfrac{4!}{2! 2!} = \\dfrac{24}{4} = 6$.":::

:::widget type=numeric-input prompt="$\\binom{10}{1} = ?$" answer=10 explain="Choosing $1$ item from $10$ — there are $10$ ways. (Always: $\\binom{n}{1} = n$.)":::

:::widget type=numeric-input prompt="$\\binom{6}{2}$ vs $\\binom{6}{4}$ — they should be equal. What value?" answer=15 explain="By symmetry, $\\binom{6}{2} = \\binom{6}{4}$. Both equal $\\dfrac{6 \\cdot 5}{2} = 15$.":::

:::widget type=numeric-input prompt="A class has $20$ students. How many ways to pick a group of $3$ for a project? (Order doesn't matter.)" answer=1140 explain="$\\binom{20}{3} = \\dfrac{20 \\cdot 19 \\cdot 18}{6} = \\dfrac{6840}{6} = 1140$.":::
