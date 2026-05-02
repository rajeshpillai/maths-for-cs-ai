# Inclusion–Exclusion Principle

## Intuition

If you count students who play football and students who play basketball
separately, then add the totals, you have **double-counted** the ones who play
both.  Inclusion–exclusion is the systematic fix: add the singles, subtract
the pairs, add the triples, subtract the quadruples, and so on.  It is the
counting law that turns Venn diagrams into formulas.

## Prerequisites

- Tier 1, Lesson 2: Set Theory (unions, intersections, $|A|$ notation)
- Tier 1, Lesson 4: Combinatorics (factorial, $\binom{n}{k}$)

## From First Principles

### Two sets

For any two finite sets $A$ and $B$:

$$|A \cup B| = |A| + |B| - |A \cap B|$$

**Pen & paper:** In a class of 30, 18 take maths, 12 take physics, 7 take both.
How many take at least one?

$$|M \cup P| = 18 + 12 - 7 = 23$$

How many take neither?  $30 - 23 = 7$.

**Why subtract $|A \cap B|$?**  When we add $|A| + |B|$, every element in
$A \cap B$ is counted *twice* — once in $|A|$ and once in $|B|$.  We over-counted
it by 1, so we subtract it back.

### Three sets

$$|A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |A \cap C| - |B \cap C| + |A \cap B \cap C|$$

The pattern: **+ singles − pairs + triples**.

**Pen & paper:** A survey of 100 commuters asked which transport they used
in the past week.  Bus: 50, Train: 40, Bike: 30.  Bus∩Train: 20, Bus∩Bike: 10,
Train∩Bike: 8.  All three: 5.  How many used at least one?

$$50 + 40 + 30 - 20 - 10 - 8 + 5 = 87$$

So 13 used none.

**Why add the triple back?**  Elements in $A \cap B \cap C$ are counted **3 times**
when we add singles, then **subtracted 3 times** (once for each pair), giving a
net count of 0.  We must add them back once.

### General formula

For $n$ sets $A_1, A_2, \ldots, A_n$:

$$\left| \bigcup_{i=1}^{n} A_i \right| = \sum_{k=1}^{n} (-1)^{k+1} \sum_{|S| = k} \left| \bigcap_{i \in S} A_i \right|$$

In words: alternate addition and subtraction of intersections of size $k$,
for $k = 1, 2, \ldots, n$.

**Why does it work?**  Pick any element $x$ in the union, suppose it belongs
to exactly $m$ of the sets.  We must count it exactly **once**.  Inclusion–
exclusion adds it $\binom{m}{1}$ times, subtracts $\binom{m}{2}$, adds $\binom{m}{3}$,
… and the binomial-theorem identity

$$\sum_{k=1}^{m} (-1)^{k+1} \binom{m}{k} = 1 - (1-1)^m = 1$$

guarantees the net count is exactly 1 for every element.

### Application — counting integers divisible by ...

How many integers from 1 to 100 are divisible by 2, 3, or 5?

Let $A$ = multiples of 2, $B$ = multiples of 3, $C$ = multiples of 5.

- $|A| = \lfloor 100/2 \rfloor = 50$
- $|B| = \lfloor 100/3 \rfloor = 33$
- $|C| = \lfloor 100/5 \rfloor = 20$
- $|A \cap B| = \lfloor 100/6 \rfloor = 16$ (divisible by lcm(2,3) = 6)
- $|A \cap C| = \lfloor 100/10 \rfloor = 10$
- $|B \cap C| = \lfloor 100/15 \rfloor = 6$
- $|A \cap B \cap C| = \lfloor 100/30 \rfloor = 3$

$$|A \cup B \cup C| = 50 + 33 + 20 - 16 - 10 - 6 + 3 = 74$$

So 26 integers from 1 to 100 are divisible by **none** of 2, 3, 5.

### Derangements (a famous application)

A **derangement** of $\{1, 2, \ldots, n\}$ is a permutation with **no fixed point**
— no element ends up in its original position.

**Hat-check problem:** $n$ people drop off hats, then everyone receives a random
hat back.  How many ways does *nobody* get their own hat?

Let $A_i$ = permutations where person $i$ gets their own hat.  We want
permutations in *none* of the $A_i$'s, i.e. $n! - |A_1 \cup A_2 \cup \cdots \cup A_n|$.

By inclusion–exclusion:

$$D_n = n! \sum_{k=0}^{n} \frac{(-1)^k}{k!}$$

**Pen & paper:** $D_3 = 3! \left( \frac{1}{1} - \frac{1}{1} + \frac{1}{2} - \frac{1}{6} \right) = 6 \cdot \frac{2}{6} = 2$.
Check by listing: of the 6 permutations of (1,2,3), only (2,3,1) and (3,1,2) have
no fixed point. ✓

**Striking limit:** $D_n / n! \to 1/e \approx 0.368$ as $n \to \infty$.  In a
large room, the probability that *nobody* gets their own hat is roughly $1/e$,
independent of $n$.

## Python Verification

```python
# ── Inclusion–exclusion: verifying pen & paper ──────────────
from itertools import combinations
from math import factorial, comb, e

# Multiples of 2, 3, 5 in 1..100
N = 100
A = {n for n in range(1, N+1) if n % 2 == 0}
B = {n for n in range(1, N+1) if n % 3 == 0}
C = {n for n in range(1, N+1) if n % 5 == 0}

print("=== |A|, |B|, |C| ===")
print(f"|A| = {len(A)}, |B| = {len(B)}, |C| = {len(C)}")

print("\n=== Pairwise intersections ===")
print(f"|A∩B| = {len(A & B)} (multiples of 6)")
print(f"|A∩C| = {len(A & C)} (multiples of 10)")
print(f"|B∩C| = {len(B & C)} (multiples of 15)")

print("\n=== Triple intersection ===")
print(f"|A∩B∩C| = {len(A & B & C)} (multiples of 30)")

union = len(A | B | C)
inex = len(A) + len(B) + len(C) - len(A&B) - len(A&C) - len(B&C) + len(A&B&C)
print(f"\nDirect union: {union}")
print(f"Inclusion–exclusion: {inex}")
assert union == inex == 74

# Derangements
print("\n=== Derangements D_n ===")
def derangement(n):
    return round(factorial(n) * sum((-1)**k / factorial(k) for k in range(n+1)))

for n in range(1, 10):
    Dn = derangement(n)
    ratio = Dn / factorial(n)
    print(f"D_{n} = {Dn:>7,}   D_{n}/{n}! = {ratio:.6f}   1/e = {1/e:.6f}")

# Verify D_3 by brute force
from itertools import permutations
n = 3
identity = tuple(range(n))
count = sum(1 for p in permutations(range(n)) if all(p[i] != i for i in range(n)))
print(f"\nBrute-force D_3 = {count} ✓")
```

## Visualisation — the alternating cancellation pattern

```python
# ── How inclusion–exclusion builds up the right answer ──────
import matplotlib.pyplot as plt
import numpy as np
from math import comb

# Three-set Venn region counts (multiples-of-2,3,5 case).
labels  = ["+|A|+|B|+|C|", "−pairs", "+triple"]
running = [50+33+20, 50+33+20-(16+10+6), 50+33+20-(16+10+6)+3]
true_value = 74

fig, axes = plt.subplots(1, 2, figsize=(13, 5))

ax = axes[0]
xs = range(len(labels))
ax.bar(xs, running, color=["tab:blue", "tab:orange", "tab:green"])
ax.axhline(true_value, color="red", linestyle="--", label=f"true |A∪B∪C| = {true_value}")
ax.set_xticks(list(xs)); ax.set_xticklabels(labels)
ax.set_ylabel("running count")
ax.set_title("Inclusion–exclusion converges to the truth\n(over → under → exact)")
ax.legend()
for i, v in enumerate(running):
    ax.text(i, v + 1, str(v), ha="center")

# Derangement ratio D_n/n! converging to 1/e.
ax = axes[1]
from math import factorial, e
ns = list(range(1, 16))
ratios = []
for n in ns:
    Dn = round(factorial(n) * sum((-1)**k / factorial(k) for k in range(n+1)))
    ratios.append(Dn / factorial(n))
ax.plot(ns, ratios, "o-", color="tab:purple", lw=2, label="D_n / n!")
ax.axhline(1/e, color="red", linestyle="--", label="1/e ≈ 0.3679")
ax.set_xlabel("n"); ax.set_ylabel("ratio")
ax.set_title("Derangements: P(nobody gets own hat) → 1/e")
ax.legend(); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

The first plot shows why the alternating signs are needed: adding singles
overshoots (103), subtracting pairs undershoots (71), adding the triple lands
exactly on 74.  The second plot shows the eerie limit $1/e$ — the chance that
a random permutation has *no* fixed point converges to a universal constant
that has nothing visibly to do with hats.

## Connection to CS / Games / AI / Business / Industry

- **CS / Software** — counting bug-free code paths, counting strings *not*
  matching any of $k$ regex patterns, computing the number of integers coprime
  to $n$ via $\varphi(n) = n \prod_p (1 - 1/p)$ (an inclusion–exclusion identity
  in disguise).
- **AI / ML** — multi-label classification metrics (precision/recall over
  overlapping label sets), data deduplication where records can match on
  multiple keys.
- **Databases** — query optimisers estimate `SELECT COUNT(*) WHERE A OR B OR C`
  using inclusion–exclusion on column histograms.
- **Business / Marketing** — customer-overlap analysis: "how many users opened
  at least one of three campaigns?" is a direct three-set inclusion–exclusion.
  Cohort analytics in tools like Mixpanel rely on this.
- **Operations / Logistics** — shift-coverage planning: "how many days are
  covered if at least one of three on-call engineers is working?"
- **Probability** — derangements give the answer to the matching problem,
  the lower-bound for the famous secretary/marriage problem, and the limit
  $1/e$ shows up in random-graph theory.

## Check Your Understanding

1. **Pen & paper:** In a group of 60, 35 like coffee, 30 like tea, 25 like
   juice; 15 like coffee+tea, 10 like coffee+juice, 8 like tea+juice; 5 like
   all three.  How many like none?
2. **Pen & paper:** How many integers from 1 to 1000 are *not* divisible by
   2, 3, 5, or 7?
3. **Pen & paper:** Compute $D_4$ and $D_5$ from the formula, then list every
   derangement of $\{1,2,3,4\}$ to confirm $D_4 = 9$.
4. **Coding:** Verify $D_n / n! \to 1/e$ to 6 decimal places by computing $D_{20}$.
5. **Insight:** Why does inclusion–exclusion reduce to "+ − + −" rather than
   some other alternation?  Express the answer in terms of $\binom{m}{k}$.
