---
strand: pattern-counting
level: foundation
order: 6
title: Stars and Bars — Distributions and Repetition
prerequisites:
  - tier: strand-5-pattern-counting-foundation
    slug: 03-combinations
    description: Combinations
connections:
  - strand-5-pattern-counting-foundation/05-binomial-theorem
applications:
  - business: "Allocating budget across departments; distributing limited inventory"
  - cs: "Counting integer solutions; partitioning bytes; histogram bin counts"
  - games: "Distributing skill points across attributes"
  - life: "Splitting candy among kids; distributing tokens; ice-cream flavour combos"
---

# Stars and Bars — Distributions and Repetition

## Explain Like I Am 7

You have five identical lollipops to share among three friends.  The
lollipops all look the same, so the only question is *how many*
each friend gets.  Picture the lollipops as five little stars in a
row, and slide two pencils between them as fences: the stars to the
left of the first pencil go to friend one, the stars between pencils
go to friend two, and the rest go to friend three.  Counting the
sharings is the same as counting where to place the two pencils
among the seven spots — and that's a tidy combination problem.

## Mental

Lesson 03 counted **selections without repetition**: $\binom{n}{k}$
ways to pick $k$ distinct items from $n$. Now we relax that — what
about selections **with repetition**?

Two equivalent problems handle this:

**Problem A**: Distribute $n$ identical items into $k$ distinct bins.
How many ways?

**Problem B**: Choose $n$ items from $k$ types, where types can repeat.
How many ways?

These look different but are the same problem in disguise. Both have
the answer

$$
\binom{n + k - 1}{k - 1} = \binom{n + k - 1}{n}.
$$

**Stars and bars** is a beautiful technique that explains *why* —
and gives the formula directly without case analysis.

## The technique

Imagine $n$ identical "stars" and $k - 1$ "bars" (separators). Line
them up. The bars partition the stars into $k$ groups (one per bin).
Each arrangement of stars and bars represents one distribution.

Example: distribute $5$ identical apples into $3$ bins. Stars: $5$.
Bars: $2$. One arrangement:

```
**|*|**         → bin1 = 2 apples, bin2 = 1, bin3 = 2
```

Another:

```
*****||         → bin1 = 5 apples, bin2 = 0, bin3 = 0
||*****         → bin1 = 0, bin2 = 0, bin3 = 5
*||****         → bin1 = 1, bin2 = 0, bin3 = 4
```

Each arrangement is a distribution. The total number of arrangements
of $5$ stars and $2$ bars is

$$
\binom{5 + 2}{2} = \binom{7}{2} = 21.
$$

Choose which $2$ of the $7$ positions hold bars (the rest are stars).
That's a combination — Lesson 03's machinery, applied to a clever
encoding.

So:

> The number of ways to distribute $n$ identical items into $k$
> distinct bins is $\binom{n + k - 1}{k - 1}$.

## Interactive

:::widget type=numeric-input prompt="Distribute $5$ identical apples among $3$ kids (some kids may get none). How many ways?" answer=21 explain="$\\binom{5 + 3 - 1}{3 - 1} = \\binom{7}{2} = 21$.":::

:::widget type=numeric-input prompt="A pizza shop has $4$ topping types. You buy $6$ topping units total (repetition allowed: e.g., 3 mushroom + 2 pepperoni + 1 cheese + 0 olives). How many distinct topping bundles?" answer=84 explain="$\\binom{6 + 4 - 1}{4 - 1} = \\binom{9}{3} = 84$. The $4$ topping types are bins; the $6$ units are stars.":::

:::widget type=numeric-input prompt="How many ways to distribute $10$ identical coins into $4$ distinct piggy banks?" answer=286 explain="$\\binom{10 + 3}{3} = \\binom{13}{3} = 286$.":::

:::widget type=numeric-input prompt="Solutions to $x_1 + x_2 + x_3 = 7$ with each $x_i \\ge 0$ integer. How many?" answer=36 explain="Stars and bars: $7$ stars (the total), $2$ bars (between $3$ variables). $\\binom{7 + 2}{2} = \\binom{9}{2} = 36$.":::

:::widget type=step-revealer
{
  "title": "Stars and bars: 5 apples, 3 bins",
  "steps": [
    {"prose": "We have $5$ identical apples and want to distribute them across $3$ bins. Each bin can hold $0$ to $5$ apples; what matters is **how many** apples are in each bin."},
    {"math": "(\\text{bin 1, bin 2, bin 3}) \\quad \\text{with all } \\ge 0 \\text{ and sum} = 5", "prose": "We're counting non-negative integer triples that sum to 5."},
    {"prose": "**Encoding**: write $5$ stars and $2$ bars (one less than the bin count). The bars split the stars into 3 groups."},
    {"math": "\\underbrace{\\star \\star \\mid \\star \\mid \\star \\star}_{\\text{(2, 1, 2)}}", "prose": "Each arrangement of the $7$ symbols ($5$ stars + $2$ bars) gives one distribution."},
    {"math": "\\binom{7}{2} = 21", "prose": "The number of arrangements is $\\binom{7}{2}$ — choose which $2$ of the $7$ positions are bars; the rest are stars."},
    {"prose": "Same count, derived without listing all triples (which we could do for this small case, but the technique scales to any size)."}
  ]
}
:::

## Symbolic

The general identity:

> The number of non-negative integer solutions to $x_1 + x_2 +
> \ldots + x_k = n$ is $\binom{n + k - 1}{k - 1}$.

Equivalently: distribute $n$ identical items into $k$ distinct bins.
Equivalently: choose $n$ items (with repetition) from $k$ types.

Two important variants:

**Each bin gets at least $1$**: solutions to $x_1 + \ldots + x_k = n$
with $x_i \ge 1$. Substitute $y_i = x_i - 1$: solutions become
$y_1 + \ldots + y_k = n - k$ with $y_i \ge 0$. Apply the formula:
$\binom{(n-k) + k - 1}{k - 1} = \binom{n - 1}{k - 1}$.

**Each bin has a maximum**: solutions to $x_1 + \ldots + x_k = n$
with $x_i \le m_i$. Use **inclusion-exclusion** (Strand 6 Lesson
06): subtract distributions where any one bin exceeds its max,
add back overlaps, etc. Strand 5 Intermediate develops this.

A useful trick: any "$x_i \ge c_i$" lower bound becomes "$y_i \ge 0$"
by substituting $y_i = x_i - c_i$ — same as the "each bin gets at
least 1" case, generalised. Subtract the lower bounds first; then
apply stars and bars.

## Computational

Direct computation:

```python
import math

def stars_and_bars(n, k):
    """Number of ways to distribute n identical items into k distinct bins."""
    return math.comb(n + k - 1, k - 1)

print(stars_and_bars(5, 3))    # 21
print(stars_and_bars(6, 4))    # 84
print(stars_and_bars(10, 4))   # 286

# At-least-1 version
def stars_and_bars_at_least_1(n, k):
    if n < k: return 0
    return math.comb(n - 1, k - 1)

print(stars_and_bars_at_least_1(5, 3))   # 6
# Distributions: (1,1,3), (1,3,1), (3,1,1), (1,2,2), (2,1,2), (2,2,1) = 6
```

To **enumerate** all solutions:

```python
from itertools import product

def all_solutions(n, k):
    """All k-tuples of non-negative ints that sum to n."""
    for tup in product(range(n + 1), repeat=k):
        if sum(tup) == n:
            yield tup

print(list(all_solutions(5, 3))[:5])
# [(0, 0, 5), (0, 1, 4), (0, 2, 3), (0, 3, 2), (0, 4, 1)]
print(len(list(all_solutions(5, 3))))   # 21 — matches the formula
```

This brute-force enumeration is fine for tiny problems. For large
$n$ and $k$, the formula is essential — $\binom{50 + 9}{9}$ is
$1.7 \times 10^{10}$, much too large to enumerate.

## Derivational

The argument is the bijection itself.

**Claim**: there is a one-to-one correspondence between

- non-negative integer solutions to $x_1 + x_2 + \ldots + x_k = n$, and
- arrangements of $n$ stars and $k - 1$ bars in a row of length $n + k - 1$.

**Proof of bijection**: given a solution $(x_1, x_2, \ldots, x_k)$,
write $x_1$ stars, then a bar, then $x_2$ stars, then a bar, ...,
ending with $x_k$ stars. The total is $n$ stars and $k - 1$ bars.

Conversely, given an arrangement of $n$ stars and $k - 1$ bars,
read off the number of stars in each of the $k$ "regions" defined
by the bars. That's a valid non-negative solution summing to $n$.

The two operations invert each other → the correspondence is a
bijection → both sets have the same count.

**The number of arrangements** is $\binom{n + k - 1}{k - 1}$:
choose which $k - 1$ of the $n + k - 1$ positions are bars (the
rest are stars). This is the combinations result from Lesson 03.

So:

$$
|\{(x_1, \ldots, x_k) : \sum x_i = n, x_i \ge 0\}| = \binom{n + k - 1}{k - 1}.
$$

Notice the elegance: a counting problem with **infinite-looking
structure** (the $x_i$ can be any non-negative integers) reduces to
a finite combinatorial choice via a clean encoding. **Bijection
proofs** like this — count one set by matching it with another set
you already know how to count — are among combinatorics' most
beautiful tools.

## Connective

Stars and bars connect to:

- **Combinations** (Lesson 03): the formula reduces to a binomial
  coefficient. Stars and bars is "combinations with repetition."
- **Binomial theorem** (Lesson 05): same coefficients, different
  interpretation.
- **Inclusion-exclusion** (Strand 6 Lesson 06): handles bounded-bin
  variants by subtracting overcounted distributions.
- **Generating functions** (Strand 5 Intermediate): a powerful
  algebraic tool for counting compositions; stars and bars is a
  Foundation-level glimpse of it.

In CS:

- **Resource allocation**: distribute $n$ jobs across $k$ servers
  — equivalent to stars and bars.
- **Histogram bins**: counting how many ways $n$ data points can fall
  into $k$ bins (with no order) — same problem.
- **Compositions**: an integer's compositions (sums in
  fixed-length tuples) are stars-and-bars problems.

## Applied

- **Distributing skill points**: an RPG gives you $20$ skill points
  to distribute among $5$ attributes. Total ways: $\binom{20 +
  4}{4} = \binom{24}{4} = 10\,626$. (Some games impose maximums per
  attribute — that needs inclusion-exclusion.)
- **Pizza topping counts**: a place lets you "double up" toppings.
  $4$ topping types, choose $6$ total units. $\binom{6 + 3}{3} =
  84$ pizzas. (Different from the $\binom{4}{3} = 4$ pizzas if you
  could only pick distinct toppings.)
- **Allocating votes**: $30$ voters, $4$ candidates. Each voter
  picks one. The vote tally is a stars-and-bars distribution; the
  number of possible tallies (treating voters as identical, only
  counts mattering) is $\binom{33}{3} = 5\,456$.
- **Counting compositions**: how many ways to write $10$ as a sum
  of $4$ ordered non-negative integers? $\binom{13}{3} = 286$.
- **Multinomial coefficients**: a related count. The expansion of
  $(a + b + c)^5$ has $\binom{5 + 2}{2} = 21$ terms — exactly the
  number of monomial types $a^i b^j c^k$ with $i + j + k = 5$.

## Check Your Understanding

:::widget type=numeric-input prompt="Distribute $4$ identical books among $3$ shelves (any shelf can be empty). How many ways?" answer=15 explain="$\\binom{4 + 2}{2} = \\binom{6}{2} = 15$.":::

:::widget type=numeric-input prompt="Solutions to $a + b + c + d = 8$, all non-negative integers. How many?" answer=165 explain="$\\binom{8 + 3}{3} = \\binom{11}{3} = 165$.":::

:::widget type=numeric-input prompt="Same as above, but each variable must be at least $1$. How many solutions to $a + b + c + d = 8$?" answer=35 explain="Substitute $y_i = x_i - 1$: $y_1 + y_2 + y_3 + y_4 = 4$, all $y_i \\ge 0$. $\\binom{4 + 3}{3} = \\binom{7}{3} = 35$.":::

:::widget type=numeric-input prompt="Choose $3$ ice-cream scoops from $5$ flavours, with repetition allowed (e.g., 3 of the same flavour is OK; order doesn't matter). How many distinct cones?" answer=35 explain="$\\binom{3 + 4}{4} = \\binom{7}{4} = 35$. (Or equivalently $\\binom{7}{3} = 35$.) Stars-and-bars with $n = 3$, $k = 5$.":::
