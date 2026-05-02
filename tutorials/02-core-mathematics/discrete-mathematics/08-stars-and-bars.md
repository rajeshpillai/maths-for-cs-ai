# Stars and Bars — Counting Distributions

## Intuition

You have 10 identical cookies and 4 children.  How many ways can you give them
out?  The trick is to draw the cookies as **stars** $\star$, and put **bars**
$|$ between them to mark which cookies go to which child.  Every arrangement
of stars and bars is one valid distribution; counting arrangements gives the
answer.  The same trick counts integer solutions of $x_1 + x_2 + \cdots + x_k = n$.

## Prerequisites

- Tier 1, Lesson 4: Combinations (the $\binom{n}{k}$ formula)
- Tier 1, Lesson 7: Inclusion–exclusion (used for the upper-bound variant)

## From First Principles

### The basic problem

Distribute $n$ **identical** items into $k$ **distinct** boxes.  Each box can
hold zero or more.  How many distributions?

**Picture:** Lay out $n$ stars in a row.  To split them among $k$ boxes,
insert $k - 1$ bars.  Stars left of the first bar go to box 1, stars between
the first and second bar go to box 2, and so on.

Example with $n = 7$ stars and $k = 4$ boxes (so $k - 1 = 3$ bars):

```
★ ★ | ★ ★ ★ | | ★ ★
 box1   box2  box3  box4
  2     3     0     2
```

The total number of symbols in the row is $n + (k-1)$.  Of those, we choose
which $k - 1$ are bars (or equivalently which $n$ are stars).  Hence:

$$\text{distributions} = \binom{n + k - 1}{k - 1} = \binom{n + k - 1}{n}$$

**Pen & paper:** 10 cookies, 4 children → $\binom{10 + 3}{3} = \binom{13}{3} = 286$.

### Equivalent statement (integer equations)

The same count answers: how many solutions in **non-negative integers** does

$$x_1 + x_2 + \cdots + x_k = n$$

have?

Each $x_i$ is just "the number of stars in box $i$".  Same formula:
$\binom{n + k - 1}{k - 1}$.

**Pen & paper:** Number of $(x_1, x_2, x_3)$ with $x_i \ge 0$ and
$x_1 + x_2 + x_3 = 5$.  Answer: $\binom{5 + 2}{2} = \binom{7}{2} = 21$.

### Variant — every box gets at least one

If every box must hold at least one star, give each box one star up front.
That uses $k$ stars; the remaining $n - k$ stars are distributed freely.

$$\text{distributions} = \binom{n - 1}{k - 1}$$

**Pen & paper:** 10 cookies, 4 children, every child gets at least one →
$\binom{10 - 1}{4 - 1} = \binom{9}{3} = 84$.

Equivalent in equations: number of solutions of $x_1 + \cdots + x_k = n$ with
each $x_i \ge 1$.

### Variant — capped above (upper bounds)

If $x_i \le c_i$ for each box, use **inclusion–exclusion**: let $B_i$ = the set
of solutions that *violate* the cap on box $i$.  By stars-and-bars (with the
substitution $y_i = x_i - (c_i + 1) \ge 0$) we can count $|B_i|$, $|B_i \cap B_j|$,
etc., and subtract.

**Pen & paper:** Solutions of $x_1 + x_2 + x_3 = 10$ with $0 \le x_i \le 4$
for each.

Total without caps: $\binom{12}{2} = 66$.

Subtract solutions where $x_1 \ge 5$: substitute $y_1 = x_1 - 5$, get
$y_1 + x_2 + x_3 = 5$, count $\binom{7}{2} = 21$.  Same for $x_2, x_3$.
Three single-cap violations to subtract: $3 \cdot 21 = 63$.

Add back where two caps are violated (e.g. $x_1 \ge 5$ and $x_2 \ge 5$):
$y_1 + y_2 + x_3 = 0$, count $\binom{2}{2} = 1$.  Three pairs: $3 \cdot 1 = 3$.

Triple violation ($x_1, x_2, x_3 \ge 5$) needs $\ge 15 > 10$, so 0.

Final: $66 - 63 + 3 - 0 = 6$.  (You can list them: permutations of $(2,4,4)$ and $(4,4,2)$ etc.) ✓

### Variant — distinguishable items (a non-stars-and-bars problem)

Stars-and-bars is for **identical** items.  If items are distinguishable, the
count is $k^n$ (each item independently chooses one of $k$ boxes).  Beware:
beginners frequently mix the two.

Quick test: "how many ways to put 5 distinct books on 3 shelves?" → $3^5 = 243$.
"How many ways to put 5 identical pencils in 3 cups?" → $\binom{7}{2} = 21$.

## Python Verification

```python
# ── Stars and bars: verifying by brute-force enumeration ────
from math import comb
from itertools import product

def stars_and_bars(n, k):
    """Number of non-negative integer solutions of x1+...+xk = n."""
    return comb(n + k - 1, k - 1)

# Brute-force: all (x1, ..., xk) with 0..n each, summing to n.
def brute(n, k):
    return sum(1 for tup in product(range(n+1), repeat=k) if sum(tup) == n)

print("=== Basic stars and bars: x1+...+xk = n, xi ≥ 0 ===")
for n, k in [(5, 3), (7, 4), (10, 3), (4, 5)]:
    formula = stars_and_bars(n, k)
    enum = brute(n, k)
    print(f"n={n}, k={k}: formula={formula}, brute={enum}", "✓" if formula == enum else "✗")

# At least one per box: x1+...+xk = n, xi ≥ 1.
print("\n=== With xi ≥ 1 ===")
for n, k in [(10, 4), (7, 3)]:
    formula = comb(n - 1, k - 1)
    enum = sum(1 for tup in product(range(1, n+1), repeat=k) if sum(tup) == n)
    print(f"n={n}, k={k}: formula={formula}, brute={enum}", "✓" if formula == enum else "✗")

# Capped: x1+x2+x3 = 10, each xi ≤ 4.
print("\n=== Capped: x1+x2+x3 = 10, each ≤ 4 ===")
total = comb(12, 2)
single = 3 * comb(7, 2)
double = 3 * comb(2, 2)
result = total - single + double
brute_capped = sum(1 for tup in product(range(5), repeat=3) if sum(tup) == 10)
print(f"Inclusion–exclusion: {total} - {single} + {double} = {result}")
print(f"Brute force: {brute_capped}", "✓" if result == brute_capped else "✗")

# Identical vs distinguishable contrast.
print("\n=== Identical vs distinguishable items ===")
print(f"5 identical pencils in 3 cups:    {stars_and_bars(5, 3):>5}  (stars and bars)")
print(f"5 distinct books on 3 shelves:    {3**5:>5}  (k^n)")
```

## Visualisation — the star–bar correspondence

```python
# ── Picture every distribution as a star/bar string ─────────
import matplotlib.pyplot as plt
from itertools import product

# n = 4 stars into k = 3 boxes: 15 distributions.
n, k = 4, 3
distributions = [tup for tup in product(range(n+1), repeat=k) if sum(tup) == n]

fig, ax = plt.subplots(figsize=(11, 6))
ax.set_xlim(-0.5, n + k - 1 + 0.5)
ax.set_ylim(-0.5, len(distributions) - 0.5)
ax.invert_yaxis()
ax.axis("off")
ax.set_title(f"All {len(distributions)} ways to put {n} ★ into {k} boxes\n"
             f"= C({n}+{k}−1, {k}−1) = C({n+k-1},{k-1})")

for row, dist in enumerate(distributions):
    # Build the star/bar string.
    symbols = []
    for i, count in enumerate(dist):
        symbols.extend(["★"] * count)
        if i < len(dist) - 1:
            symbols.append("|")
    for col, sym in enumerate(symbols):
        color = "tab:orange" if sym == "★" else "tab:blue"
        ax.text(col, row, sym, ha="center", va="center", fontsize=18, color=color)
    ax.text(n + k - 0.2, row, f"  → {dist}", va="center", fontsize=10)

plt.tight_layout()
plt.show()
```

You should see 15 rows (= $\binom{6}{2}$), each a unique star/bar pattern,
each corresponding to a unique distribution tuple.

## Connection to CS / Games / AI / Business / Industry

- **CS / Software** — counting compositions in dynamic-programming partition
  problems, sizing buckets in hash-table load analyses, counting weak
  compositions in compiler register-allocation heuristics.
- **AI / ML** — sampling from a Dirichlet distribution requires the same
  $k$-simplex parameterisation; LDA topic counts use stars-and-bars in their
  combinatorial bookkeeping.
- **Games** — RPG inventory systems where $n$ identical resources are spread
  across $k$ slots; gacha-game pity systems count distributions of pulls.
- **Business / Operations** — capacity planning ("distribute 200 customer
  service tickets across 6 agents this hour"), budget allocation across line
  items, ad-spend distribution in marketing-mix models.
- **Statistics** — multinomial counts, the number of contingency tables with
  given margins, and the formula for the multivariate hypergeometric all
  reduce to stars-and-bars or its capped variants.
- **Operations research** — counting feasible production schedules under
  resource constraints; classical "balls into boxes" framing in queueing.

## Check Your Understanding

1. **Pen & paper:** How many ways to write 12 as an ordered sum of 5
   non-negative integers?
2. **Pen & paper:** How many ways to choose 8 doughnuts from 5 flavours
   (any number of each, including zero)?  Hint: this is stars-and-bars in
   disguise.
3. **Pen & paper:** Solutions of $x_1 + x_2 + x_3 + x_4 = 20$ with each
   $x_i \ge 2$.
4. **Pen & paper:** Solutions of $x_1 + x_2 + x_3 = 12$ with $0 \le x_i \le 5$.
   Use inclusion–exclusion.
5. **Identify the trap:** Distinguish "place 6 distinct guests at 3 round
   tables" from "place 6 identical pebbles in 3 jars".  Which uses stars-and-
   bars and which doesn't?  Why?
