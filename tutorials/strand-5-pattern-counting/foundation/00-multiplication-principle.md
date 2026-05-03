---
strand: pattern-counting
level: foundation
order: 0
title: The Multiplication Principle for Counting
prerequisites: []
connections:
  - strand-5-pattern-counting-foundation/01-tree-diagrams
  - strand-6-uncertainty-foundation/01-sample-spaces-and-outcomes
  - strand-1-number-quantity-foundation/03-mental-multiplication
applications:
  - business: "Pricing combinations, inventory variants, menu item counts"
  - cs: "Counting password possibilities, function input combinations, test cases"
  - games: "Character builds (race × class × specialisation), loot table sizes"
  - life: "Outfits, license plates, phone-number availability"
---

# The Multiplication Principle for Counting

## Mental

Suppose you have $3$ shirts and $2$ pairs of trousers. How many
**different outfits** can you wear?

For each shirt, you can pair it with each trouser. List them:

```
shirt-A + trouser-1     shirt-A + trouser-2
shirt-B + trouser-1     shirt-B + trouser-2
shirt-C + trouser-1     shirt-C + trouser-2
```

Six combinations. Three shirts times two trousers — the count
**multiplies**.

This is the **multiplication principle** of counting:

> If a task has $k$ stages, and stage $i$ has $n_i$ choices
> independent of the others, the total number of ways to complete
> the task is $n_1 \cdot n_2 \cdot \ldots \cdot n_k$.

You met this informally in Strand 6 Lesson 01 (sample-space sizing).
Here we make it the foundation of counting itself.

A few quick examples:

- **License plates** with $3$ letters followed by $4$ digits:
  $26 \cdot 26 \cdot 26 \cdot 10 \cdot 10 \cdot 10 \cdot 10 = 26^3
  \cdot 10^4 = 175\,760\,000$.
- **Passwords** with $8$ characters from $94$ printable ASCII
  characters: $94^8 \approx 6 \times 10^{15}$.
- **Coin flips**, $10$ in a row: $2^{10} = 1024$.
- **Pizza toppings**: with $5$ toppings each independently on/off,
  $2^5 = 32$ different pizzas.

The catch — the **independence** part. The principle works when each
stage's choices don't depend on previous stages. If choosing a shirt
*restricts* which trousers you can pair (say, the green shirt
clashes with one trouser), you have to subtract those forbidden
combinations. We'll see this care in later lessons.

## Interactive

:::widget type=numeric-input prompt="A restaurant offers $4$ starters, $5$ mains, and $3$ desserts. How many different $3$-course meals are possible?" answer=60 explain="$4 \\times 5 \\times 3 = 60$. Each course is an independent choice.":::

:::widget type=numeric-input prompt="How many different $4$-letter strings can be made from the alphabet ($26$ letters), with repetition allowed?" answer=456976 explain="$26^4 = 456\\,976$. Each position is an independent choice of $26$.":::

:::widget type=numeric-input prompt="A binary string of length $8$ — how many different strings exist? (Each position is $0$ or $1$.)" answer=256 explain="$2^8 = 256$. This is exactly one byte's worth of values — every possible byte you could store.":::

:::widget type=numeric-input prompt="A standard PIN has $4$ digits ($0$–$9$). How many possible PINs?" answer=10000 explain="$10^4 = 10\\,000$. Why bank PINs aren't very secure on their own — easy to brute force without lockout.":::

:::widget type=numeric-input prompt="How many ways can you flip $3$ coins in sequence?" answer=8 explain="$2 \\times 2 \\times 2 = 2^3 = 8$. Outcomes: HHH, HHT, HTH, HTT, THH, THT, TTH, TTT.":::

:::widget type=step-revealer
{
  "title": "How many 7-digit phone numbers don't start with 0 or 1?",
  "steps": [
    {"prose": "A North American phone number's first digit must be $2$–$9$ (technical reason: $0$ is operator and $1$ is long-distance prefix). The remaining six digits can be anything $0$–$9$."},
    {"math": "\\text{count} = (\\text{choices for first}) \\times (\\text{choices for second}) \\times \\ldots", "prose": "Apply the multiplication principle, with different counts per position."},
    {"math": "\\text{count} = 8 \\cdot 10 \\cdot 10 \\cdot 10 \\cdot 10 \\cdot 10 \\cdot 10 = 8 \\cdot 10^6", "prose": "First digit has $8$ choices ($2, 3, \\ldots, 9$). Each of the next six has $10$."},
    {"math": "\\text{count} = 8\\,000\\,000", "prose": "Eight million numbers per area code. The area code structure plus this digit-restriction is why every region has a fixed pool of available numbers — and why area-code splits became necessary as populations grew."}
  ]
}
:::

## Symbolic

The multiplication principle, formally:

> If task $T$ consists of $k$ independent stages, and stage $i$ can
> be completed in $n_i$ ways, then $T$ can be completed in
> $n_1 \cdot n_2 \cdot \ldots \cdot n_k$ ways.

Two related ideas combine cleanly:

**Same-pool with repetition**: $n^k$ — choose from a pool of $n$
options, $k$ times in a row, with repeats allowed. Examples: $26^4$
strings of $4$ letters, $2^k$ binary strings of length $k$, $10^4$
PINs.

**Same-pool without repetition** (next lesson): $n \cdot (n-1) \cdot
(n-2) \cdot \ldots$ — once a choice is used, it's gone. We'll
study this as **permutations** in Lesson 02.

A useful observation: when $k$ is fixed but $n$ grows, the count
explodes **polynomially** ($n^k$). When $n$ is fixed but $k$ grows,
the count explodes **exponentially** ($n^k$ in the same formula
but with $k$ varying — same expression, different shape). Both are
fast, but exponential is dramatically faster for large inputs. This
is the seed of **complexity theory** (Strand 5 Advanced).

Also: when stages have **different** numbers of choices, the
formula generalises to a product:

$$
\text{count} = n_1 \cdot n_2 \cdot \ldots \cdot n_k.
$$

The phone-number example $8 \cdot 10^6$ used this — the first stage
had $8$ choices, the rest had $10$ each.

## Computational

Counting via the multiplication principle in Python:

```python
def count_outfits(*stage_choices):
    """Multiplication principle: pass the number of choices for each stage."""
    result = 1
    for n in stage_choices:
        result *= n
    return result

print(count_outfits(3, 2))            # 6   — 3 shirts, 2 trousers
print(count_outfits(4, 5, 3))         # 60  — 3-course meal
print(count_outfits(26, 26, 26, 10, 10, 10, 10))  # 175760000 — license plate

# Powers when all stages have the same count
print(2 ** 8)            # 256
print(26 ** 4)           # 456976
```

To **enumerate** all combinations (when the count is small enough),
`itertools.product` from Strand 6 Lesson 01 is the go-to tool:

```python
from itertools import product

shirts = ["red", "blue", "green"]
trousers = ["jeans", "khakis"]

outfits = list(product(shirts, trousers))
print(outfits)
# [('red', 'jeans'), ('red', 'khakis'),
#  ('blue', 'jeans'), ('blue', 'khakis'),
#  ('green', 'jeans'), ('green', 'khakis')]
print(len(outfits))   # 6 — matches our count
```

For passwords or other huge counts, enumerating is infeasible —
$94^8 \approx 6 \times 10^{15}$ is too many to list. The
multiplication principle gives the count **without** enumerating.
That's its real superpower: count without counting.

## Derivational

*Why* does the multiplication principle work?

For a $2$-stage task, picture an $n_1 \times n_2$ grid:

```
              stage 2 choice
              1   2   3   ...   n_2
   stage 1   ┌───┬───┬───┬─────┬───┐
   choice 1 │   │   │   │     │   │   ← n_2 cells
            ├───┼───┼───┼─────┼───┤
          2 │   │   │   │     │   │   ← n_2 cells
            ├───┼───┼───┼─────┼───┤
        ...
            ├───┼───┼───┼─────┼───┤
        n_1 │   │   │   │     │   │   ← n_2 cells
            └───┴───┴───┴─────┴───┘
```

Each row is one stage-1 choice, paired with each of the $n_2$
stage-2 choices. There are $n_1$ rows of $n_2$ cells, so $n_1 \cdot
n_2$ cells total — one per outcome. (We met this argument in Strand
6 Lesson 01.)

For three stages, picture a $n_1 \times n_2 \times n_3$ box. For
$k$ stages, picture $k$-dimensional space. The total is
$\prod n_i$.

The proof generalises seamlessly because **each new stage doesn't
depend on previous stages** — that's where the "independent"
condition does work. If stage 3 depended on stages 1 and 2, the
"box" wouldn't be rectangular and you'd have to count more carefully.

## Connective

The multiplication principle is the seed of every counting result
in this strand:

- **Lesson 02 (Permutations)**: same idea, but choices reduce by
  one each stage.
- **Lesson 03 (Combinations)**: permutations divided by the number
  of orderings — division because of overcounting.
- **Sample spaces** (Strand 6 Lesson 01): every product sample
  space is a multiplication-principle count.
- **Big-O analysis**: nested loops in CS multiply: a doubly nested
  loop over $n$ items is $O(n^2)$ operations.

Beyond this strand:

- **Cryptography**: password and key-space sizes are pure
  multiplication-principle counts. Security is "how big is the
  search space?" — and exponential growth is what makes brute-force
  hard.
- **Probability**: the denominators of equally-likely-outcome
  probabilities are multiplication-principle counts.
- **Database optimisation**: counting how many rows result from a
  $k$-table join uses the same idea.

## Applied

- **Password strength**: an $8$-character password from $94$ ASCII
  printables has $94^8 \approx 6 \times 10^{15}$ possibilities — a
  PB on a fast cracking rig in ~$1$ hour. Add two characters and
  it's $10\,000\times$ harder. **Each character roughly doubles
  cracking time**, illustrating exponential growth.
- **License plates**: a region with $3$ letters + $4$ digits has
  $\approx 175$ million combinations. When a city outgrows that,
  it switches to $4 + 3$ or adds a letter — multiplication-principle
  scaling.
- **Genetic possibilities**: if a gene has $4$ alleles ($A, B, C, D$)
  and a person has $2$ slots (one from each parent), there are
  $4 \cdot 4 = 16$ possible genotypes (with order distinguished).
  $16$ choose $2$ ($10$ unordered) is the combinatorial count
  Lesson 03 will give.
- **Shoe sizes × widths × colours**: if a shop offers $20$ sizes,
  $4$ widths, $5$ colours of one shoe model, that's $400$ SKUs to
  stock. Reducing variants is a key cost lever for retailers.
- **Computer science**: counting all possible inputs to a function.
  A function taking three booleans has $2^3 = 8$ input
  combinations, exhaustively testable. A function taking three
  $32$-bit integers has $2^{96}$ — exhaustive testing is impossible.
  This forces *property-based testing*.

## Check Your Understanding

:::widget type=numeric-input prompt="A pizza has $3$ size choices, $2$ crust types, and $7$ topping options each independently on/off. How many distinct pizzas?" answer=768 explain="$3 \\cdot 2 \\cdot 2^7 = 6 \\cdot 128 = 768$. Each topping is its own independent on/off stage.":::

:::widget type=numeric-input prompt="How many different $3$-letter sequences (with repetition) can you form from the letters of 'ABCDE'?" answer=125 explain="$5^3 = 125$. Five choices, three positions, repeats allowed.":::

:::widget type=numeric-input prompt="A character creator allows $4$ races, $6$ classes, and $3$ specialisations per class. How many distinct characters?" answer=72 explain="$4 \\cdot 6 \\cdot 3 = 72$. (Assuming every race can take every class, every class every specialisation. If those are restricted, the count is smaller.)":::

:::widget type=numeric-input prompt="A coin is flipped $5$ times. How many distinct outcome sequences are possible?" answer=32 explain="$2^5 = 32$. (One specific sequence has probability $\\dfrac{1}{32}$ — the connection back to Strand 6.)":::
