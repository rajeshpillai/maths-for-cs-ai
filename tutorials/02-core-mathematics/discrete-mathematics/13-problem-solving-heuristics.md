# Problem-Solving Heuristics — Casework, Complementary Counting, Symmetry

## Intuition

Most counting problems don't yield to a single formula.  The art is in
**reducing** them to problems you already know.  Three big reduction
techniques: **casework** (split into mutually exclusive scenarios and add),
**complementary counting** (count everything, subtract the bad), and
**symmetry** (count one slice and multiply).  Each is a named tool.  Knowing
which one to reach for is the difference between a 3-minute solution and a
3-page one.

## Prerequisites

- Tier 1, Lesson 4: Combinatorics (basics)
- Tier 1, Lesson 7: Inclusion–exclusion
- Tier 1, Lesson 12: Counting on grids

## From First Principles

### Heuristic 1 — Casework

**The idea:** if the problem has different "shapes" of solution, split into
disjoint cases by shape, count each, and add (rule of sum).

**When to reach for it:** the problem mentions different "types" or
"configurations"; the answer depends on a discrete choice (location of a
maximum, parity, who wins a round, etc.); a slick formula doesn't seem to fit.

#### Worked example — 3-digit numbers using digits $\{1, 2, 3, 4, 5\}$ with no repeats and divisible by 5

A 3-digit number is divisible by 5 iff its last digit is 0 or 5.  Since 0
isn't in our set, the last digit must be 5.  Case on this immediately:

- Last digit = 5.  First two digits are an ordered pair from $\{1,2,3,4\}$ with
  no repeats: $4 \cdot 3 = 12$.

Total: 12.

**The crucial step** was recognising that "divisible by 5" forces a single case
on the last digit.  The right case-split kills the problem.

#### Worked example — colouring a 3x3 grid with 2 colours, no row entirely one colour

Total colourings: $2^9 = 512$.  Subtract colourings where some row is monochromatic.

But wait — that's complementary counting (next).  The casework version: case
on **how many** rows are monochromatic ($k = 0, 1, 2, 3$), count each, and add.
Often these two views coexist.  Whichever splits cleaner wins.

#### Recipe

1. Find the "axis" along which the problem branches (last digit, position of max, parity, …).
2. Make sure cases are **mutually exclusive** and **exhaustive**.
3. Count each case independently.
4. Add up.  Sanity-check: small instances by hand.

### Heuristic 2 — Complementary counting

**The idea:** "at least one" and "no" problems are usually easier in reverse.

$$|\text{has at least one X}| = |\text{everything}| - |\text{has no X}|$$

**When to reach for it:** the problem says "at least one", "at most one", or
forces you to track multiple disjoint sub-conditions; the **complement** is
much cleaner ("no two adjacent…", "no element is fixed", "no row is empty").

#### Worked example — 5-digit codes with at least one even digit

Codes from $\{0, 1, \ldots, 9\}^5$ with no constraint: $10^5 = 100{,}000$.

Codes with **no** even digit (all digits in $\{1, 3, 5, 7, 9\}$): $5^5 = 3{,}125$.

Codes with at least one even digit: $100{,}000 - 3{,}125 = 96{,}875$.

(Try the direct version — "at least one" — and you will end up with
inclusion–exclusion over "digit $i$ is even".  Same answer, much messier.)

#### Worked example — number of permutations of $\{1, ..., 5\}$ with at least one fixed point

Total permutations: $5! = 120$.

Permutations with **no** fixed point (derangements): $D_5 = 44$ (from
Lesson 7).

At least one fixed point: $120 - 44 = 76$.

#### Recipe

1. Read the question.  If it says "at least one X", ask: is "no X" easier?
2. Count the universe (typically a clean closed form like $n^k$ or $n!$).
3. Count the bad outcomes ("no X") — usually an easier subproblem.
4. Subtract.

### Heuristic 3 — Symmetry

**The idea:** if the problem has symmetric structure (rotational, reflective,
permutational), count one **representative** and multiply.

**When to reach for it:** circular arrangements; symmetric polyhedra; problems
where "rotations are considered the same"; problems where the answer must be
divisible by some symmetry-group order.

#### Worked example — circular arrangements

How many ways to seat $n$ people around a round table, where rotations are
considered the same arrangement?

Linear arrangements: $n!$.  Each circular arrangement appears $n$ times in the
list (one for each rotation).  By symmetry:

$$\text{circular arrangements} = \frac{n!}{n} = (n - 1)!$$

If reflections are also considered the same (so a clockwise and counter-clockwise
seating are equivalent), divide by 2 again: $(n-1)!/2$.

#### Worked example — distinct necklaces with $n$ coloured beads

Naively $k^n$ for $n$ beads with $k$ colours.  Quotient by rotation
($n$ rotations) — but **not all** colourings have full $n$-fold symmetry,
so naive division is wrong.  The correct count uses **Burnside's lemma**
(beyond this lesson).  The point is: when symmetry isn't uniform,
naive symmetry-counting fails — but spotting the symmetry is still the
first move.

#### Worked example — count the number of different cube colourings under rotation

Symmetry-aware counting tells you that 24 rotations of a cube reduce $6!$
labellings of faces to a much smaller count.  Don't just divide; apply
Burnside.  But the point is: **see** the symmetry first.

#### Recipe

1. Identify the symmetry group of the configuration (rotations, reflections, label permutations).
2. If the symmetry acts **freely** (no configuration is fixed by a non-trivial
   symmetry), divide by the group's size.
3. Otherwise: think Burnside (out of scope here) or split into orbits.
4. Sanity-check: for small $n$, list and group by orbit.

### Heuristic 4 — Bijection ("change of perspective")

A meta-heuristic: if you can put your set into one-to-one correspondence with
a set whose count you know, you're done.  Stars-and-bars (Lesson 8) and the
reflection principle (Lesson 12) are bijection arguments.  When you find
yourself stuck, ask: "does this set look like another counted set?"

**Quick example.** Number of subsets of $\{1, 2, \ldots, n\}$.  Bijection with
binary strings of length $n$ (element $i$ is in the subset iff bit $i$ is 1).
Count: $2^n$.

### Putting it together — a worked combined problem

> How many 5-letter strings from $\{A, B, C\}$ have **at least two A's** and
> end in B?

**Step 1 — symmetry:** the last position is fixed (B), so we're counting
4-letter strings from $\{A, B, C\}$ with at least two A's.

**Step 2 — complementary counting:** universe is $3^4 = 81$.  Subtract those
with **fewer than 2 A's**.

- 0 A's: all from $\{B, C\}$: $2^4 = 16$.
- Exactly 1 A: 4 positions for the A, $2^3 = 8$ choices for the rest: $4 \cdot 8 = 32$.

Bad: $16 + 32 = 48$.

**Step 3 — answer:** $81 - 48 = 33$.

(The casework alternative would split on **exactly 2, 3, 4** A's:
$\binom{4}{2}\cdot 2^2 + \binom{4}{3}\cdot 2 + \binom{4}{4} = 24 + 8 + 1 = 33$. ✓)

Both work.  Pick whichever has fewer cases.

## Python Verification

```python
# ── Heuristic counting: brute-force checks ──────────────────
from itertools import permutations, product
from math import factorial

# 3-digit numbers using {1..5} no repeats, divisible by 5
print("=== 3-digit numbers from {1..5}, no repeats, divisible by 5 ===")
count = sum(1 for p in permutations([1,2,3,4,5], 3) if int("".join(map(str, p))) % 5 == 0)
print(f"brute: {count}, formula: 12", "✓" if count == 12 else "✗")

# 5-digit codes with at least one even digit
print("\n=== 5-digit codes with ≥1 even digit ===")
total = 10**5
bad = 5**5
print(f"complementary: {total} - {bad} = {total - bad}")
# Brute (small example: 4-digit codes for tractability)
n_digits = 4
bad_brute = sum(1 for c in product(range(10), repeat=n_digits) if all(d % 2 == 1 for d in c))
total_brute = 10**n_digits
print(f"sanity 4-digit: total={total_brute}, all-odd={bad_brute}, ≥1 even={total_brute - bad_brute}")

# Permutations of 1..5 with at least one fixed point
print("\n=== Permutations of {1..5} with ≥1 fixed point ===")
total = factorial(5)
def has_fixed(p):
    return any(p[i] == i for i in range(len(p)))
brute = sum(1 for p in permutations(range(5)) if has_fixed(p))
print(f"complementary: {total} - 44 = 76, brute: {brute}", "✓" if brute == 76 else "✗")

# Circular arrangements
print("\n=== Circular arrangements of 5 distinct people ===")
import collections
def seat_class(p):
    """Equivalence class under rotation: take the rotation starting at min."""
    min_idx = p.index(min(p))
    return tuple(p[min_idx:] + p[:min_idx])
seen = {seat_class(p) for p in permutations(range(5))}
print(f"distinct circular: {len(seen)}, formula (5-1)! = {factorial(4)}",
      "✓" if len(seen) == factorial(4) else "✗")

# Combined problem
print("\n=== 5-letter strings from {A,B,C}, ≥2 A's, ends in B ===")
target = sum(1 for s in product("ABC", repeat=5)
             if s[-1] == "B" and s.count("A") >= 2)
print(f"brute: {target}, expected: 33", "✓" if target == 33 else "✗")
```

## Visualisation — three heuristics, three diagrams

```python
# ── Bar chart of 'casework' vs 'complementary' for one problem ──
import matplotlib.pyplot as plt

# Problem: 5-letter strings from {A,B,C} ending in B, ≥2 A's = 33
fig, axes = plt.subplots(1, 2, figsize=(13, 5))

# Casework view: split by exact A count
labels_case = ["2 A's", "3 A's", "4 A's"]
counts_case = [24, 8, 1]
ax = axes[0]
ax.bar(labels_case, counts_case, color=["tab:blue", "tab:orange", "tab:green"])
for i, c in enumerate(counts_case):
    ax.text(i, c + 0.5, str(c), ha="center")
ax.axhline(sum(counts_case), color="red", linestyle="--",
           label=f"sum = {sum(counts_case)}")
ax.set_title("Casework view: split into disjoint cases")
ax.set_ylabel("count"); ax.legend()

# Complementary view: total minus bad
ax = axes[1]
labels_comp = ["total", "0 A's", "1 A", "answer"]
values_comp = [81, -16, -32, 33]
colors = ["tab:gray", "tab:red", "tab:red", "tab:green"]
ax.bar(labels_comp, values_comp, color=colors)
for i, v in enumerate(values_comp):
    ax.text(i, v + (1 if v >= 0 else -3), str(v), ha="center")
ax.axhline(0, color="black", lw=0.5)
ax.set_title("Complementary view: universe − bad")
ax.set_ylabel("count")

fig.suptitle("Same problem (33 strings), two heuristic paths", y=1.02)
plt.tight_layout()
plt.show()
```

## Connection to CS / Games / AI / Business / Industry

- **CS / Algorithms** — *casework* is the meta-pattern in DP transitions
  ("case on the last action"); *complementary counting* is everywhere in
  probabilistic algorithm analysis ("with high probability X happens" =
  "1 − Pr[X fails]"); *symmetry* underlies group-theoretic algorithms in
  Burnside-based hashing.
- **AI / ML** — *complementary counting* is the soul of the "log-sum-exp"
  trick and importance-weighted estimation; *symmetry* is the rationale
  behind equivariant networks (e.g. CNNs use translation symmetry; GNNs
  use permutation symmetry).
- **Probability** — "P(at least one)" problems almost always solve via
  complementary counting; the birthday paradox, the coupon-collector bound,
  and the union bound all live here.
- **Cryptography** — *casework* drives security-proof reductions; *symmetry*
  arguments under uniform distributions justify "the adversary has no
  advantage" claims.
- **Games** — *symmetry* prunes game-tree search (chess opening books exploit
  reflective board symmetry); *casework* drives endgame-table generation.
- **Business / Operations** — A/B test analysis of "did at least one variant
  beat control?" is a complementary-counting question; logistics scheduling
  uses casework on driver shifts and shipment classes.
- **Engineering** — failure-tree analysis decomposes "system fails" into
  mutually exclusive cases (casework over component-failure subsets).

## Check Your Understanding

1. **Casework:** How many 4-digit numbers (1000–9999) have **exactly two**
   digits equal to 7?  Hint: case on the positions of the two 7's.
2. **Complementary counting:** A class of 30 sits at random in a row of 30
   chairs.  Probability that **at least one** student sits in their assigned
   chair?  Hint: subtract the derangement probability.
3. **Symmetry:** How many distinct ways can 7 people sit at a round table
   (rotations equivalent)?  And if reflections are also equivalent?
4. **Bijection:** Show that the number of binary strings of length $n$ with
   $k$ ones equals the number of $k$-element subsets of $\{1, \ldots, n\}$.
5. **Choose your weapon:** A bag has 5 red, 4 blue, 3 green marbles.  How
   many ways to draw 6 marbles such that **at least 2 are red**?  Try both
   casework and complementary counting; report which has fewer cases.
