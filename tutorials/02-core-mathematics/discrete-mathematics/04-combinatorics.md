# Combinatorics — Permutations, Combinations, Pigeonhole

## Intuition

Combinatorics answers the question "how many ways?"  How many passwords are
possible?  How many ways can you deal a poker hand?  How many routes through
a graph?  It's the mathematics of counting, and it underpins probability,
algorithm analysis, and cryptographic security.

## Prerequisites

- Tier 0, Lesson 5: Primes, GCD (factorials use multiplication)
- Tier 1, Lesson 2: Set Theory (subsets, Cartesian products)

## From First Principles

### The multiplication principle (rule of product)

If task 1 has $m$ outcomes and task 2 has $n$ outcomes, and the tasks are
**independent**, the total number of combined outcomes is $m \times n$.

**Pen & paper:** A restaurant offers 3 starters and 4 mains.
How many different meals (starter + main)?

$3 \times 4 = 12$

**Pen & paper:** How many 4-digit PINs (0000–9999)?

$10 \times 10 \times 10 \times 10 = 10^4 = 10{,}000$

### The addition principle (rule of sum)

If task 1 has $m$ outcomes **or** task 2 has $n$ outcomes (mutually exclusive),
the total is $m + n$.

**Pen & paper:** A menu has 3 meat dishes or 2 vegetarian dishes.
How many choices?  $3 + 2 = 5$

### Factorial

$$n! = n \times (n-1) \times (n-2) \times \cdots \times 2 \times 1$$

- $0! = 1$ (by convention — the empty product)
- $1! = 1$
- $5! = 5 \times 4 \times 3 \times 2 \times 1 = 120$

**Key values to memorise:**

| $n$ | $n!$ |
|-----|------|
| 0 | 1 |
| 1 | 1 |
| 2 | 2 |
| 3 | 6 |
| 4 | 24 |
| 5 | 120 |
| 6 | 720 |
| 7 | 5,040 |
| 10 | 3,628,800 |

### Permutations (order matters)

A **permutation** is an arrangement where **order matters**.

**All items:** How many ways to arrange $n$ distinct objects?

$$P(n) = n!$$

**Pen & paper:** How many ways to arrange the letters A, B, C?

$3! = 6$: ABC, ACB, BAC, BCA, CAB, CBA.

**Select $r$ from $n$:** How many ways to choose and arrange $r$ items from $n$?

$$P(n, r) = \frac{n!}{(n-r)!}$$

**Pen & paper:** Choose 2 letters from {A, B, C, D} in order.

$$P(4, 2) = \frac{4!}{2!} = \frac{24}{2} = 12$$

List them: AB, AC, AD, BA, BC, BD, CA, CB, CD, DA, DB, DC — exactly 12 ✓

### Combinations (order doesn't matter)

A **combination** is a selection where **order doesn't matter**.

$$C(n, r) = \binom{n}{r} = \frac{n!}{r!(n-r)!}$$

The notation $\binom{n}{r}$ is read "n choose r".

**Pen & paper:** Choose 2 letters from {A, B, C, D} (order irrelevant).

$$\binom{4}{2} = \frac{4!}{2! \times 2!} = \frac{24}{2 \times 2} = 6$$

List them: {A,B}, {A,C}, {A,D}, {B,C}, {B,D}, {C,D} — exactly 6 ✓

**Why divide by $r!$?**  Each combination corresponds to $r!$ permutations
(the different orderings of the same subset).

**Concrete example:** The permutations AB and BA are *different* permutations
but the *same* combination {A, B}.  For $r = 2$: each combination appears
$2! = 2$ times in the permutation list.  For $r = 3$: the combination
{A, B, C} appears as ABC, ACB, BAC, BCA, CAB, CBA — that's $3! = 6$ times.

So to go from permutations to combinations, divide out the repeated orderings:

$$\binom{n}{r} = \frac{P(n,r)}{r!}$$

### Key identities (pen & paper shortcuts)

$$\binom{n}{0} = \binom{n}{n} = 1$$

$$\binom{n}{1} = n$$

$$\binom{n}{r} = \binom{n}{n-r}$$

**Why?**  Choosing $r$ items to include = choosing $n - r$ items to exclude.

$$\binom{n}{r} = \binom{n-1}{r-1} + \binom{n-1}{r}$$

This is **Pascal's identity** — the basis of Pascal's triangle.

### Pascal's triangle (pen & paper)

```
Row 0:                1
Row 1:              1   1
Row 2:            1   2   1
Row 3:          1   3   3   1
Row 4:        1   4   6   4   1
Row 5:      1   5  10  10   5   1
```

Each entry = sum of the two entries above it.

Row $n$, position $r$ gives $\binom{n}{r}$.

### Binomial theorem

$$(a + b)^n = \sum_{r=0}^{n} \binom{n}{r} a^{n-r} b^r$$

**Pen & paper:** $(x + 1)^3$

$$= \binom{3}{0}x^3 + \binom{3}{1}x^2 + \binom{3}{2}x + \binom{3}{3}$$
$$= x^3 + 3x^2 + 3x + 1$$

### Permutations with repetition

How many ways to arrange the letters in "MISSISSIPPI"?

Total: 11 letters.  M: 1, I: 4, S: 4, P: 2.

$$\frac{11!}{1! \times 4! \times 4! \times 2!} = \frac{39916800}{1 \times 24 \times 24 \times 2} = 34650$$

### The pigeonhole principle

> If $n$ items are placed in $m$ containers and $n > m$, at least one container
> holds more than one item.

Simple but powerful.

**Pen & paper examples:**

1. In a room of 13 people, at least 2 share a birth month.  (13 people, 12 months)
2. In any set of 5 integers, at least 2 have the same remainder mod 4.  (5 numbers, 4 remainders)

**Stronger form:** If $n$ items go into $m$ containers, at least one container
has $\lceil n/m \rceil$ items.

## Python Verification

```python
# ── Combinatorics: verifying pen & paper work ───────────────
from math import factorial, comb, perm

# Factorial
print("=== Factorial ===")
for n in range(8):
    print(f"{n}! = {factorial(n)}")

# Permutations: P(4,2) = 12
print("\n=== Permutations P(4,2) ===")
print(f"P(4,2) = {perm(4,2)}")

# List them
from itertools import permutations, combinations
items = ['A', 'B', 'C', 'D']
perms = list(permutations(items, 2))
print(f"All permutations: {perms}")
print(f"Count: {len(perms)}")

# Combinations: C(4,2) = 6
print("\n=== Combinations C(4,2) ===")
print(f"C(4,2) = {comb(4,2)}")

combos = list(combinations(items, 2))
print(f"All combinations: {combos}")
print(f"Count: {len(combos)}")

# Pascal's triangle
print("\n=== Pascal's Triangle (rows 0-5) ===")
for n in range(6):
    row = [comb(n, r) for r in range(n + 1)]
    padding = "  " * (5 - n)
    print(f"{padding}{' '.join(str(x).rjust(3) for x in row)}")

# Binomial theorem: (x+1)^3
print("\n=== Binomial: (x+1)^3 coefficients ===")
n = 3
coeffs = [comb(n, r) for r in range(n + 1)]
terms = [f"{c}x^{n-r}" if n-r > 0 else str(c) for r, c in enumerate(coeffs)]
print(" + ".join(terms))

# MISSISSIPPI permutations
print("\n=== MISSISSIPPI arrangements ===")
result = factorial(11) // (factorial(1) * factorial(4) * factorial(4) * factorial(2))
print(f"11! / (1! * 4! * 4! * 2!) = {result}")

# Pigeonhole demo
print("\n=== Pigeonhole: 5 numbers mod 4 ===")
nums = [7, 13, 22, 9, 31]
remainders = [n % 4 for n in nums]
print(f"Numbers: {nums}")
print(f"Remainders mod 4: {remainders}")
# Find duplicates
from collections import Counter
counts = Counter(remainders)
for r, c in counts.items():
    if c > 1:
        print(f"Remainder {r} appears {c} times — pigeonhole confirmed!")
```

## Visualisation — Pascal's triangle and combinatorial growth

Two of the most important pictures in combinatorics: **Pascal's
triangle** (every binomial coefficient $\binom{n}{k}$ in one
geometric arrangement), and a comparison of how *fast* permutations
and combinations grow as $n$ increases — the foundation of the
$O(n!)$, $O(2^n)$ complexity classes you meet in algorithms.

```python
# ── Visualising Pascal's triangle and combinatorial growth ──
import numpy as np
import matplotlib.pyplot as plt
from math import comb, factorial

fig, axes = plt.subplots(1, 2, figsize=(14, 5.5))

# (1) Pascal's triangle as a colour-coded heatmap. Each entry is C(n, k);
# the diagonals are 1's; the centre row holds the largest values.
ax = axes[0]
N = 12
triangle = np.zeros((N, N))
for n in range(N):
    for k in range(n + 1):
        triangle[n, k] = comb(n, k)
# Plot on log scale to keep large values visible against small ones.
ax.imshow(np.log10(triangle + 1), cmap="viridis", aspect="auto")
for n in range(N):
    for k in range(n + 1):
        ax.text(k, n, f"{int(triangle[n, k])}", ha="center", va="center",
                fontsize=8 if triangle[n, k] < 100 else 7,
                color="white" if triangle[n, k] > 100 else "black")
ax.set_xlabel("k (chosen)"); ax.set_ylabel("n (total)")
ax.set_title("Pascal's triangle: C(n, k)\nrow sum = 2ⁿ (number of subsets of n elements)")
ax.set_xticks(range(N))

# (2) Growth comparison: n!, 2ⁿ, n², n.
# Permutations grow faster than 2ⁿ which grows faster than polynomial.
ax = axes[1]
ns = np.arange(1, 21)
ax.semilogy(ns, [factorial(n)         for n in ns], "o-", color="tab:red",
            lw=2, label="n!  (permutations)")
ax.semilogy(ns, 2.0 ** ns,                     "s-", color="tab:orange",
            lw=2, label="2ⁿ  (subsets / Boolean strings)")
ax.semilogy(ns, ns ** 2,                       "^-", color="tab:green",
            lw=2, label="n²  (pairs)")
ax.semilogy(ns, ns,                            "v-", color="tab:blue",
            lw=2, label="n  (linear)")
ax.set_xlabel("n"); ax.set_ylabel("count (log scale)")
ax.set_title("Combinatorial blow-up:\nfactorial >> exponential >> polynomial")
ax.legend(); ax.grid(True, which="both", alpha=0.3)

plt.tight_layout()
plt.show()

# Print a comparison table.
print("How quickly counts blow up:")
print(f"{'n':>4}  {'n':>10}  {'n²':>12}  {'2ⁿ':>16}  {'n!':>22}")
for n in [5, 10, 15, 20, 30]:
    print(f"  {n:>2}  {n:>10,}  {n*n:>12,}  {2**n:>16,}  {factorial(n):>22,}")
```

**Three combinatorial ideas everyone in CS uses:**

- **Pascal's triangle = $\binom{n}{k}$.** It encodes the binomial
  expansion $(a + b)^n$, the number of $k$-element subsets of an
  $n$-element set, and one row of the **binomial distribution**.
  Every diagonal is a recognisable sequence (1's, naturals, triangular
  numbers, tetrahedral numbers…). Adding adjacent entries gives the
  next row — that's the recurrence $\binom{n+1}{k} = \binom{n}{k} +
  \binom{n}{k-1}$.
- **The growth rates matter for algorithms.** $n^2 \ll 2^n \ll n!$.
  Brute-force searching all subsets is $2^n$ (intractable past
  $n \approx 30$). Permutation searches are $n!$ (intractable past
  $n \approx 12$). This is why TSP, SAT, and other NP-hard problems
  need cleverer-than-brute-force methods.
- **Counting = security.** Password strength is a combinatorial
  argument: $95^8 \approx 6.6 \cdot 10^{15}$ passwords are *not* enough
  in 2025 (a GPU can try them in days). $95^{16}$ is. Modern
  cryptographic key spaces ($2^{128}$) put a brute-force search past
  the heat death of the universe.

## Connection to CS / Games / AI

- **Password strength** — $26^8$ (lowercase only) vs $95^8$ (all printable ASCII): combinatorics measures security
- **Algorithm complexity** — "how many comparisons does sorting need?" is a counting argument ($\log_2(n!)$)
- **Poker/game AI** — probability of a hand = favourable combinations / total combinations
- **Machine learning** — $\binom{n}{k}$ appears in the binomial distribution (Tier 4)
- **Hash collisions** — birthday problem: with $n$ items and $m$ slots, collision probability grows fast
- **Compiler optimisation** — counting instruction orderings for pipeline scheduling

## Check Your Understanding

1. **Pen & paper:** How many 8-character passwords using lowercase letters (a–z) and digits (0–9)?
2. **Pen & paper:** A committee of 3 must be chosen from 10 people.  How many ways?
3. **Pen & paper:** Expand $(2x + 1)^4$ using the binomial theorem.
4. **Pen & paper:** How many distinct arrangements of the letters in "BANANA"?
5. **Pigeonhole:** Prove that in any group of 367 people, at least two share a birthday.
