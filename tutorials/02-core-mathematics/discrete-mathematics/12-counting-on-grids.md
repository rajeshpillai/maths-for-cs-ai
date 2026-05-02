# Counting on Grids — Lattice Paths and Reflections

## Intuition

How many shortest routes are there from one corner of a city block to another
if you can only walk east or north?  How many of those routes avoid a
particular café?  How many never cross a river?  Lattice path counting turns
geometric questions into combinatorial ones, and **the reflection principle**
is the elegant trick that handles "forbidden line" constraints in one stroke.

## Prerequisites

- Tier 1, Lesson 4: Combinations
- Tier 1, Lesson 7: Inclusion–exclusion
- Tier 1, Lesson 10: Recurrence-based counting
- Tier 1, Lesson 11: Catalan numbers (for the diagonal-reflection variant)

## From First Principles

### Unrestricted lattice paths

A **monotone lattice path** from $(0, 0)$ to $(m, n)$ takes only **right** (R)
and **up** (U) unit steps.  The path uses exactly $m$ R-steps and $n$ U-steps,
so it is determined by which $m$ of the $m + n$ positions are R's.

$$\text{paths}(m, n) = \binom{m + n}{m} = \binom{m + n}{n}$$

**Pen & paper:** Paths from $(0,0)$ to $(3, 2)$: $\binom{5}{2} = 10$.

This is the most-used counting fact in basic combinatorics.

### Forbidden cells (one obstacle)

Block a single cell, say $(a, b)$.  Use **complementary counting**: count
all paths and subtract those that go through $(a, b)$.

A path through $(a, b)$ is a path to $(a, b)$ followed by a path from $(a, b)$
to $(m, n)$:

$$\text{through}(a, b) = \binom{a + b}{a} \cdot \binom{(m - a) + (n - b)}{m - a}$$

So

$$\text{good paths} = \binom{m + n}{m} - \binom{a + b}{a}\binom{m - a + n - b}{m - a}$$

**Pen & paper:** $(0,0) \to (3,3)$ avoiding $(1,1)$.

Total: $\binom{6}{3} = 20$.

Through $(1,1)$: $\binom{2}{1} \cdot \binom{4}{2} = 2 \cdot 6 = 12$.

Good: $20 - 12 = 8$.

### Forbidden cells (multiple obstacles — inclusion–exclusion)

If you must avoid two cells $(a_1, b_1)$ and $(a_2, b_2)$ (both reachable in
this order, say $a_1 \le a_2$ and $b_1 \le b_2$), use inclusion–exclusion:

$$\text{good} = \text{total} - \text{through}(P_1) - \text{through}(P_2) + \text{through}(P_1 \text{ and } P_2)$$

$$\text{through both} = \binom{a_1 + b_1}{a_1}\binom{(a_2 - a_1) + (b_2 - b_1)}{a_2 - a_1}\binom{(m - a_2) + (n - b_2)}{m - a_2}$$

If the two forbidden cells are not in monotone order, you can pass through
each independently but never both — drop the third term.

### The reflection principle (forbidden line)

How many paths from $(0, 0)$ to $(m, n)$ **stay strictly below** the line
$y = x + 1$ — equivalently, never touch $y = x + 1$?

Suppose $m \ge n$ (otherwise the count is 0).

**Reflection trick.**  A "bad" path is one that touches $y = x + 1$.  Take any
bad path, find the first moment it touches $y = x + 1$, and **reflect** the
portion of the path *before* that touch across the line $y = x + 1$.  The
reflected start point is $(0, 0)$ reflected across $y = x + 1$, which is
$(-1, 1)$.

This gives a **bijection** between:
- bad paths from $(0,0)$ to $(m, n)$, and
- *all* paths from $(-1, 1)$ to $(m, n)$, which need $m + 1$ R-steps and
  $n - 1$ U-steps and number $\binom{(m+1) + (n-1)}{m+1} = \binom{m+n}{m+1}$.

So

$$\text{paths staying strictly below } y = x + 1 = \binom{m+n}{m} - \binom{m+n}{m+1}$$

**Diagonal Catalan case** ($m = n$): paths from $(0,0)$ to $(n,n)$ that never
touch $y = x + 1$ (= weakly below the diagonal):

$$\binom{2n}{n} - \binom{2n}{n+1} = \frac{1}{n+1}\binom{2n}{n} = C_n$$

That's the Catalan number from Lesson 11, derived purely by reflection.

### The ballot problem

In an election, candidate A gets $a$ votes and B gets $b$ votes (with $a > b$).
Votes are counted one at a time.  What is the probability A is **always
strictly ahead** during the count?

Think of vote orderings as lattice paths: each A-vote is a step "up" and each
B-vote a step "right" (or vice versa).  By the same reflection argument,

$$P(\text{A always ahead}) = \frac{a - b}{a + b}$$

This is the **Bertrand ballot theorem**, the granddaddy of all reflection
arguments.

### Walks with restricted moves — staircase counting

Sometimes the allowed step set differs.  E.g. allowed steps are $\rightarrow$,
$\uparrow$, and $\nearrow$ (diagonal).  The count satisfies

$$D(m, n) = D(m-1, n) + D(m, n-1) + D(m-1, n-1)$$

with $D(0, 0) = 1$.  These are the **Delannoy numbers**.  No simple closed
form, but the recurrence is direct.

**Pen & paper:** $D(2, 2)$.  Build the grid:

```
        n=0  n=1  n=2
 m=0:    1    1    1
 m=1:    1    3    5
 m=2:    1    5   13
```

So $D(2, 2) = 13$.

## Python Verification

```python
# ── Lattice path counting: formulas vs DP brute force ───────
from math import comb

def paths(m, n):
    return comb(m + n, m)

def paths_avoiding_cells(m, n, blocked):
    """DP grid count of paths from (0,0) to (m,n) avoiding any blocked cell."""
    grid = [[0]*(n+1) for _ in range(m+1)]
    grid[0][0] = 1
    for i in range(m+1):
        for j in range(n+1):
            if (i, j) in blocked:
                grid[i][j] = 0
                continue
            if i == j == 0: continue
            grid[i][j] = (grid[i-1][j] if i > 0 else 0) + (grid[i][j-1] if j > 0 else 0)
    return grid[m][n]

print("=== Unrestricted paths (3,2) and (3,3) ===")
print(f"(0,0) -> (3,2): {paths(3, 2)}  expected 10")
print(f"(0,0) -> (3,3): {paths(3, 3)}  expected 20")

print("\n=== Avoid (1,1) on a 3x3 grid ===")
formula = comb(6, 3) - comb(2, 1) * comb(4, 2)
brute = paths_avoiding_cells(3, 3, blocked={(1, 1)})
print(f"formula: 20 - 2*6 = {formula}, DP brute: {brute}",
      "✓" if formula == brute else "✗")

print("\n=== Avoid (1,1) and (2,2) on a 3x3 grid ===")
total = comb(6, 3)
through1 = comb(2, 1) * comb(4, 2)
through2 = comb(4, 2) * comb(2, 1)
through_both = comb(2, 1) * comb(2, 1) * comb(2, 1)  # via (1,1) then (2,2)
inex = total - through1 - through2 + through_both
brute = paths_avoiding_cells(3, 3, blocked={(1, 1), (2, 2)})
print(f"inclusion–exclusion: {total}-{through1}-{through2}+{through_both} = {inex}")
print(f"DP brute:           {brute}", "✓" if inex == brute else "✗")

print("\n=== Reflection: paths weakly below diagonal (Catalan) ===")
for n in range(1, 7):
    refl = comb(2*n, n) - comb(2*n, n+1)
    cat  = comb(2*n, n) // (n + 1)
    print(f"n={n}: reflection={refl}, C_{n}={cat}", "✓" if refl == cat else "✗")

print("\n=== Delannoy numbers D(m, n) ===")
def delannoy(m, n, memo={(0, 0): 1}):
    if (m, n) in memo: return memo[(m, n)]
    if m < 0 or n < 0: return 0
    memo[(m, n)] = delannoy(m-1, n) + delannoy(m, n-1) + delannoy(m-1, n-1)
    return memo[(m, n)]

for m in range(4):
    print("  ", [delannoy(m, n) for n in range(4)])
```

## Visualisation — paths through a forbidden cell, and the reflection bijection

```python
# ── Two pictures: forbidden cell + reflection trick ─────────
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(13, 5.5))

# Plot 1: the 8 good paths from (0,0) to (3,3) avoiding (1,1).
ax = axes[0]
ax.set_xlim(-0.5, 3.5); ax.set_ylim(-0.5, 3.5)
ax.set_xticks(range(4)); ax.set_yticks(range(4))
ax.grid(True); ax.set_aspect("equal")

# Generate good paths by DP traceback would be heavy; just draw a few.
import itertools
good_paths = []
for steps in itertools.combinations(range(6), 3):
    path = ["R" if i in steps else "U" for i in range(6)]
    x = y = 0; pts = [(0, 0)]; ok = True
    for s in path:
        if s == "R": x += 1
        else: y += 1
        if (x, y) == (1, 1): ok = False; break
        pts.append((x, y))
    if ok: good_paths.append(pts)

import numpy as np
colors = plt.cm.tab10(np.linspace(0, 1, len(good_paths)))
for pts, col in zip(good_paths, colors):
    xs, ys = zip(*pts)
    ax.plot(np.array(xs) + np.random.uniform(-0.05, 0.05),
            np.array(ys) + np.random.uniform(-0.05, 0.05),
            "-", lw=1.5, alpha=0.7, color=col)
ax.plot(1, 1, "X", color="red", ms=20, label="blocked (1,1)")
ax.plot(0, 0, "go", ms=10); ax.plot(3, 3, "ko", ms=10)
ax.set_title(f"{len(good_paths)} good paths (blocked cell (1,1) marked)")
ax.legend()

# Plot 2: reflection illustration.
ax = axes[1]
ax.set_xlim(-2, 5); ax.set_ylim(-1, 5)
ax.set_aspect("equal"); ax.grid(True, alpha=0.3)
ax.axhline(0, color="black", lw=0.5); ax.axvline(0, color="black", lw=0.5)

# Diagonal y = x and forbidden line y = x + 1.
xs = np.linspace(-1, 5, 100)
ax.plot(xs, xs, "k--", lw=1, alpha=0.5, label="y = x")
ax.plot(xs, xs + 1, "r--", lw=1.5, label="y = x + 1 (forbidden)")

# A bad path: (0,0) -> (1,1) -> (1,2) -> (3,2) -> (3,3) touches the line at (1,2).
bad = [(0,0), (1,0), (1,1), (1,2), (2,2), (3,2), (3,3)]
ax.plot(*zip(*bad), "o-", color="tab:blue", lw=2, label="bad path (touches red)")

# Reflect prefix until first touch (1,2) across y=x+1.
# Reflection of (a,b) across y = x + 1 sends (a,b) -> (b-1, a+1).
prefix = bad[:bad.index((1, 2)) + 1]
refl_prefix = [(b - 1, a + 1) for (a, b) in prefix]
suffix = bad[bad.index((1, 2)) + 1:]
reflected = refl_prefix + suffix
ax.plot(*zip(*reflected), "s-", color="tab:orange", lw=2,
        label="reflected: starts at (-1, 1)")
ax.plot(0, 0, "g^", ms=12); ax.plot(3, 3, "k^", ms=12)
ax.plot(-1, 1, "r^", ms=12)
ax.text(-1.3, 1.2, "(-1,1)", color="red")
ax.text(0.1, -0.3, "(0,0)", color="green")
ax.text(3.1, 3.1, "(3,3)", color="black")

ax.set_title("Reflection bijection: bad paths from (0,0)\n↔ all paths from (-1,1)")
ax.legend(loc="upper left", fontsize=9)

plt.tight_layout()
plt.show()
```

## Connection to CS / Games / AI / Business / Industry

- **CS / Algorithms** — DP grid counting (Lesson 10) is the backbone of
  edit-distance, longest-common-subsequence, and many string algorithms; the
  reflection principle is folklore in interview problems involving "valid
  parens" or "valid stack sequences".
- **CS / Networking** — counting valid acknowledgement orderings in TCP
  windows; counting reachable states in flow-control models.
- **AI / ML** — beam-search counts during sequence decoding; counting valid
  alignment paths in CTC and HMMs is a lattice-path problem; CTC's monotone
  alignment constraint is a forbidden-region restriction.
- **Probability / Random walks** — Bertrand ballot theorem, hitting-time
  distributions for symmetric random walks, the reflection principle for
  Brownian motion.
- **Games / Procedural generation** — counting valid maze layouts on a grid,
  routing puzzles (Flow Free, Sokoban level enumeration), counting move
  orderings in board-game state spaces.
- **Operations / Logistics** — Manhattan-distance route counts in grid-based
  city-block deliveries (DoorDash, Amazon last-mile); shortest-path counting
  in network reliability analysis.

## Check Your Understanding

1. **Pen & paper:** Paths from $(0, 0)$ to $(4, 3)$ unrestricted.
2. **Pen & paper:** Paths from $(0, 0)$ to $(4, 4)$ avoiding the cell $(2, 2)$.
3. **Pen & paper:** Paths from $(0, 0)$ to $(5, 3)$ that never touch the line
   $y = x + 1$.  Use reflection.
4. **Reflection trick:** In an election with 7 votes for A and 4 for B, what is
   the probability A is always strictly ahead during the count?
5. **Coding:** Modify the DP code to count paths from $(0,0)$ to $(n,n)$ that
   stay strictly below $y = x$.  Verify your count matches $C_{n-1}$.
