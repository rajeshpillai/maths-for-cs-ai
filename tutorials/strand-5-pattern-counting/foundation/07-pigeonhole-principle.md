---
strand: pattern-counting
level: foundation
order: 7
title: The Pigeonhole Principle
prerequisites:
  - tier: strand-5-pattern-counting-foundation
    slug: 03-combinations
    description: Combinations
connections:
  - strand-6-uncertainty-foundation/04-complement-and-not
applications:
  - business: "Inventory shortages, scheduling conflicts, IP-address exhaustion"
  - cs: "Hash collision proofs, finite-state cycle detection, lossless-compression bounds"
  - games: "Why some seed values must repeat behaviour"
  - life: "Sock drawer logic, birthday matches, parking-lot guarantees"
---

# The Pigeonhole Principle

## Explain Like I Am 7

If thirteen pigeons fly home to twelve birdhouses, *some* birdhouse
must contain two pigeons — there just aren't enough houses to go
around.  The same reason tells you that in any class of $367$ kids,
at least two share a birthday, since there are only $366$ days
they could be born on.  And if you stick your hand into a sock
drawer with only black and white socks, three grabs will always give
you a matching pair.  Silly-obvious as it sounds, this little rule
proves big surprising things in math.

## Mental

The principle says something so obvious it borders on tautology:

> **If you put $n + 1$ pigeons into $n$ holes, at least one hole
> contains $2$ or more pigeons.**

You couldn't prove it false even if you tried. There simply aren't
enough holes to give each pigeon its own.

The triviality is misleading. **The principle's value is when it
applies to a setting where the conclusion isn't obvious.** Used
cleverly, it proves surprising results — including the birthday
paradox, the existence of irrational numbers' decimal periods (which
we hinted at in Strand 1 Foundation Lesson 09), and lower bounds in
algorithm analysis.

A few real applications, dressed up to hide the principle:

- **Birthday match**: in any group of $367$ people, at least two share
  a birthday. ($366$ possible birthdays, $367$ people — pigeonhole.)
- **Sock drawer**: a drawer has $10$ black socks and $10$ white socks
  in the dark. How many do you grab to guarantee a matching pair?
  Three. (Two colours = two holes; the third sock matches one.)
- **Hash collisions**: a hash function maps $n$ inputs to $m$ outputs.
  If $n > m$, **some collision is guaranteed** (Strand 1 Lesson 03's
  modular arithmetic showed this in another form).
- **Repeating decimals** (Foundation Lesson 09): when long-dividing
  $1$ by $7$, only $6$ possible nonzero remainders exist. Generate
  $7$ remainders → some remainder repeats → the decimal cycles.

## The strong form

A more powerful version:

> If you put $n$ pigeons into $k$ holes, **at least one hole contains
> $\lceil n/k \rceil$ or more pigeons.**

(The $\lceil x \rceil$ is the **ceiling function** — round up to the
next integer.) For example, putting $25$ pigeons into $4$ holes
forces some hole to contain $\lceil 25/4 \rceil = 7$ or more.

The basic form is the special case $n = k + 1$ (forcing $\lceil
(k+1)/k \rceil = 2$).

## Interactive

:::widget type=numeric-input prompt="A drawer has socks in $4$ different colours. To guarantee a matching pair, how many do you grab? (Worst case.)" answer=5 explain="With $4$ colours, picking $4$ might give one of each. The $5$th must match one. Pigeonhole: $5$ pigeons, $4$ holes → some hole gets $2$.":::

:::widget type=numeric-input prompt="Among any $13$ people, at least how many share a birth month?" answer=2 explain="$12$ months, $13$ people. By pigeonhole, two must share. $\\lceil 13/12 \\rceil = 2$.":::

:::widget type=numeric-input prompt="Among any $25$ people, at least how many share a birth month?" answer=3 explain="$\\lceil 25/12 \\rceil = 3$. Some month must contain $3$ or more people.":::

:::widget type=numeric-input prompt="A hash function maps $1000$ keys to a table of $32$ buckets. By pigeonhole, at least one bucket holds at least how many keys?" answer=32 explain="$\\lceil 1000 / 32 \\rceil = 32$ (since $31 \\cdot 32 = 992 < 1000$). At least one bucket has $32$ keys.":::

:::widget type=step-revealer
{
  "title": "The birthday paradox: why 23 people give a 50% chance of a match",
  "steps": [
    {"prose": "**Pigeonhole** says $367$ people guarantee a birthday match. The birthday paradox asks something different: with how many people does a match become *likely* (50/50)? Surprising answer: just **23**."},
    {"prose": "We use Strand 6 Lesson 04's complement trick — instead of P(match), compute P(no match) and subtract."},
    {"math": "P(\\text{no match}) = \\frac{365}{365} \\cdot \\frac{364}{365} \\cdot \\frac{363}{365} \\cdots \\frac{343}{365}", "prose": "For person 1, any birthday works ($365/365$). For person 2 to differ, $364$ remaining days work ($364/365$). For person 3, $363/365$. ... For person 23, $343/365$."},
    {"math": "P(\\text{no match for 23 people}) = \\prod_{i=0}^{22} \\frac{365 - i}{365} \\approx 0.493", "prose": "Just compute the product. About $49.3\\%$ chance of no match — meaning about $50.7\\%$ chance of at least one shared birthday."},
    {"math": "23 \\text{ people} \\Rightarrow P(\\text{some match}) \\approx 51\\%", "prose": "The number where probability crosses $50\\%$ is $23$. Counterintuitive — most people guess hundreds. The reason: $23$ people give $\\binom{23}{2} = 253$ **pairs**, each with $1/365$ chance of matching."},
    {"prose": "**Pigeonhole gives the *guaranteed* threshold ($367$). Probability gives the *likely* threshold ($23$). Both come from counting structure.**"}
  ]
}
:::

:::widget type=numeric-input prompt="$n$ items go into $7$ boxes. By pigeonhole, what's the smallest $n$ that forces some box to have at least $4$ items?" answer=22 explain="$3 \\cdot 7 = 21$ items can fit with $3$ per box. The $22$nd forces some box to $4$. (Generalised: smallest $n$ forcing $\\lceil n/k \\rceil \\ge m$ is $n = k(m-1) + 1$.)":::

## Symbolic

The basic principle:

> If $n + 1$ items are distributed among $n$ groups, some group
> contains at least $2$ items.

The strong form (also called the **generalised pigeonhole
principle**):

> If $n$ items are distributed among $k$ groups, some group
> contains at least $\lceil n/k \rceil$ items.

A useful contrapositive: **if every group contains at most $m$
items, then the total is at most $k m$**. So if $n > km$, *some*
group must hold more than $m$.

The principle is **non-constructive**: it tells you that some box has
$\ge 2$ pigeons but doesn't tell you *which* box. This is its
strength (you don't need detailed information) and its weakness (you
can't actually find the duplicate without more work).

## Computational

Pigeonhole gives **lower bounds** that are often nearly impossible to
prove constructively. A few applications in code:

```python
# Detect a duplicate in a list of numbers in 1..n where the list
# has length n + 1. Pigeonhole guarantees at least one duplicate.
def has_duplicate(arr, max_value):
    if len(arr) > max_value:
        return True   # pigeonhole — duplicate must exist
    return len(set(arr)) != len(arr)

print(has_duplicate([3, 1, 4, 1, 5, 9], 9))   # True (1 appears twice)
print(has_duplicate([3, 1, 4, 5, 9], 9))      # False
```

Cycle detection in pseudo-random sequences: any function $f: \{1,
\ldots, m\} \to \{1, \ldots, m\}$ iterated must cycle within $m+1$
steps (only $m$ possible values; the $(m+1)$st must repeat one
already seen).

```python
def must_cycle(f, start, m):
    """Iterate f from start; pigeonhole forces a cycle within m steps."""
    seen = {}
    x = start
    for step in range(m + 2):
        if x in seen:
            return step, seen[x]
        seen[x] = step
        x = f(x)
    return None  # unreachable

f = lambda x: (3 * x + 7) % 11
print(must_cycle(f, 0, 11))   # cycle detected within 12 steps
```

This is the basis of **Floyd's cycle-finding algorithm** and many
other "we know a cycle exists, find it" algorithms in CS.

## Derivational

The basic principle proves itself by contrapositive: suppose **no**
group had $2$ or more items. Then each group has $\le 1$, so the
total is $\le n$. But we have $n + 1$ items — contradiction.

The strong form: suppose every group has at most $\lceil n/k \rceil
- 1 = \lfloor (n - 1)/k \rfloor$ items. Then the total is at most
$k \cdot \lfloor (n-1)/k \rfloor \le n - 1 < n$. Contradiction.

Both arguments are pure counting. **The principle is just the
multiplication-principle bound stated as an inequality, with a
case-split.**

A subtle point: pigeonhole gives an **existential** statement —
there *exists* a group with $\ge 2$ items. It does **not** specify
which one, nor how many. To find the actual duplicate or compute
the maximum count, you need more than pigeonhole.

## Connective

Pigeonhole connects:

- **Lesson 03 (Combinations)**: birthday paradox uses both
  pigeonhole (for the guarantee) and $\binom{23}{2} = 253$ pairs
  (for the probability).
- **Lesson 09 (Foundation, repeating decimals)**: long division of
  $\dfrac{a}{b}$ has at most $b$ possible remainders. After $b+1$
  remainders, some must repeat — and the decimal cycles.
- **Strand 6 Lesson 04 (complement)**: birthday paradox's $50\%$
  threshold uses the complement rule.
- **Hashing**: any hash function $h: U \to \{0, \ldots, m-1\}$ with
  $|U| > m$ must have collisions.
- **Compression**: lossless compression of $n$-bit strings to
  shorter strings is impossible (some string would lack an output)
  — pigeonhole bounds compression-ratio claims.

In CS theory:

- **Lower bounds** for algorithms: pigeonhole proves that comparison
  sorting must take at least $\log_2(n!) \approx n \log n$ steps —
  there are $n!$ possible permutations, and each comparison
  partitions the possibilities at most in half. Strand 5 Advanced
  develops this.

## Applied

- **Hashing in practice**: with $1$ million users and a hash table
  of $100\,000$ buckets, **at least one bucket has $\ge 10$ users**
  by pigeonhole. The actual maximum is usually higher (random
  distributions cluster).
- **IP address exhaustion**: IPv4 has $2^{32} \approx 4.3$ billion
  addresses. Once issued, you can't have a $5$ billionth unique IPv4
  device on the internet — pigeonhole forces collisions. NAT and
  IPv6 are workarounds.
- **DNA sampling**: the human genome has $\approx 3 \times 10^9$
  bases. A short DNA fragment of $20$ bases has $4^{20} \approx
  10^{12}$ possible sequences — most don't appear, but pigeonhole
  bounds say **most fragments must occur multiple times** in a
  trillion-base sample.
- **Calendar matching**: in any school of $400$ students, at least
  $2$ share a birthday. (Pigeonhole: $366 < 400$.) The expected
  count is $\approx 60$ pairs by birthday-paradox math.
- **Sock-drawer guarantees**: a box has socks in $5$ colours. To
  guarantee $3$ of the same colour, you need $5 \cdot 2 + 1 = 11$
  socks. (Worst case: $2$ of each colour for $10$, then $11$th
  matches.)

## Check Your Understanding

:::widget type=numeric-input prompt="A hash table has $50$ buckets. To guarantee at least one bucket has $\\ge 5$ items, what's the minimum number of items?" answer=201 explain="By pigeonhole: $4 \\cdot 50 = 200$ items can fit with $4$ per bucket. The $201$st forces some bucket to $5$. (Smallest $n$ for $\\lceil n/k \\rceil \\ge m$ is $k(m-1) + 1$.)":::

:::widget type=numeric-input prompt="In a class of $30$ students with $7$ possible birth weekdays, at least how many were born on the same weekday?" answer=5 explain="$\\lceil 30/7 \\rceil = 5$. Some weekday has $\\ge 5$ births.":::

:::widget type=numeric-input prompt="A car park has $20$ spaces. $25$ cars try to park. How many cars are turned away?" answer=5 explain="Pigeonhole says you can't fit $25$ cars in $20$ spaces. Five must be turned away. (Counting via inequality, not really a 'pigeonhole proof' — just direct counting.)":::

:::widget type=numeric-input prompt="To guarantee 2 socks of the same colour in a drawer with $4$ colours, how many do you grab?" answer=5 explain="$4$ colours, $4$ pigeons might give one of each. The $5$th forces a match.":::
