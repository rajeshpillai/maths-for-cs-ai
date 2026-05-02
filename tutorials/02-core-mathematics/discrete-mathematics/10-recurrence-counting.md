# Recurrence-Based Counting — Tilings, Paths, Fibonacci

## Intuition

Some counting problems resist a single closed-form formula but yield instantly
to a **recurrence**: express the count $a_n$ in terms of smaller counts
$a_{n-1}, a_{n-2}, \ldots$.  Tile a $1 \times n$ strip with squares and
dominoes?  The answer is the Fibonacci numbers.  Count binary strings without
two consecutive 1s?  Same Fibonacci.  Building the recurrence is half the
skill; recognising the **structure** behind it is the other half.

## Prerequisites

- Tier 1, Lesson 4: Combinatorics (multiplication and addition principles)
- Tier 1, Lesson 6: Proof techniques (induction)
- Foundation 3: Sequences and series (recursive definitions)

## From First Principles

### A first recurrence — tile a $1 \times n$ strip

You have unlimited $1 \times 1$ squares and $1 \times 2$ dominoes.  How many
ways $T_n$ to tile a $1 \times n$ strip?

**Set up by cases on the last tile.**

- If the last tile is a square ($1 \times 1$), the rest is a tiling of length
  $n - 1$: $T_{n-1}$ ways.
- If the last tile is a domino ($1 \times 2$), the rest is a tiling of length
  $n - 2$: $T_{n-2}$ ways.

These are mutually exclusive and exhaustive, so

$$T_n = T_{n-1} + T_{n-2}, \qquad T_1 = 1, \quad T_2 = 2$$

That's the **Fibonacci recurrence** (with shifted indexing): $T_n = F_{n+1}$.

**Pen & paper:** $T_3 = T_2 + T_1 = 2 + 1 = 3$.  List them: SSS, SD, DS. ✓
$T_4 = T_3 + T_2 = 3 + 2 = 5$.

### Recipe for setting up a counting recurrence

1. **Define $a_n$ precisely** — what does the index $n$ measure (length, size, step)?
2. **Pick a "last move"** — what was the last decision made?  The structure of
   that decision splits the problem into smaller subproblems.
3. **Each case shrinks $n$.**  Sum the sub-counts (addition principle).
4. **Find base cases** — small $n$ where the recurrence's "smaller problem"
   no longer makes sense.
5. **Sanity-check by listing.**  Compute $a_n$ for small $n$ both by recurrence
   and by exhaustive listing — they must match.

### Binary strings of length $n$ with no two consecutive 1s

Let $b_n$ = the count.  Case on the last bit.

- Last bit is 0: anything legal of length $n - 1$ before it. $b_{n-1}$ ways.
- Last bit is 1: previous bit must be 0; before that, anything legal of
  length $n - 2$.  $b_{n-2}$ ways.

$$b_n = b_{n-1} + b_{n-2}, \qquad b_1 = 2 \;(\{0, 1\}), \quad b_2 = 3 \;(\{00, 01, 10\})$$

Same Fibonacci recurrence with different base cases — many counting problems
are Fibonacci in disguise.

**Pen & paper:** $b_4 = b_3 + b_2 = 5 + 3 = 8$.  List: 0000, 0001, 0010, 0100,
0101, 1000, 1001, 1010 — eight ✓.

### Climbing stairs (the LeetCode classic)

You can climb 1 or 2 stairs at a time.  How many ways to reach the top of an
$n$-stair staircase?

Same recurrence: last step was 1 or 2.  $C_n = C_{n-1} + C_{n-2}$.

### A non-Fibonacci recurrence — climb 1, 2, or 3

Now you can climb 1, 2, or 3 at a time.  Three "last move" cases:

$$C_n = C_{n-1} + C_{n-2} + C_{n-3}, \qquad C_1 = 1, \;\; C_2 = 2, \;\; C_3 = 4$$

These are the **tribonacci numbers**.  Pen & paper: $C_4 = 1 + 2 + 4 = 7$,
$C_5 = 2 + 4 + 7 = 13$.

### A two-variable recurrence — paths on a grid

How many monotone paths in a grid go from $(0, 0)$ to $(m, n)$, moving only
right (R) or up (U)?

Let $P(m, n)$ = the count.  Last move is R (came from $(m-1, n)$) or U (came
from $(m, n-1)$):

$$P(m, n) = P(m-1, n) + P(m, n-1), \qquad P(0, n) = P(m, 0) = 1$$

This recurrence's closed form is $\binom{m + n}{m}$ (we'll see why in lesson 12).
But for restricted grids (forbidden cells, blocked diagonals), only the
recurrence works.

### Tiling a $2 \times n$ board with dominoes

Tiles are $1 \times 2$ dominoes (placed horizontally or vertically).  Let
$D_n$ = number of tilings of a $2 \times n$ board.

Case on what touches the right edge.

- A vertical domino: rest is $D_{n-1}$.
- Two horizontal dominoes stacked at the right: rest is $D_{n-2}$.

$$D_n = D_{n-1} + D_{n-2}, \qquad D_1 = 1, \;\; D_2 = 2$$

Same Fibonacci again.  $D_3 = 3$, $D_4 = 5$, $D_5 = 8$.

(For $3 \times n$ tilings the recurrence is more complex — try it.)

### Solving linear recurrences (a peek)

A recurrence $a_n = c_1 a_{n-1} + c_2 a_{n-2}$ has solutions of the form
$a_n = A r_1^n + B r_2^n$ where $r_1, r_2$ are roots of the **characteristic
equation** $r^2 = c_1 r + c_2$.

For Fibonacci ($c_1 = c_2 = 1$): $r^2 = r + 1$, roots $\varphi = (1 + \sqrt{5})/2$
and $\psi = (1 - \sqrt{5})/2$.  Closed form (Binet):

$$F_n = \frac{\varphi^n - \psi^n}{\sqrt{5}}$$

We won't derive Binet here — it's the topic of generating functions in Tier 13.

## Python Verification

```python
# ── Recurrence-based counting: build, brute-check, compare ──
from itertools import product

# Fibonacci tilings T_n
def tilings_recur(n, memo={1: 1, 2: 2}):
    if n in memo: return memo[n]
    memo[n] = tilings_recur(n-1) + tilings_recur(n-2)
    return memo[n]

def tilings_brute(n):
    """Enumerate all tile sequences summing to n (each tile is 1 or 2)."""
    if n == 0: return 1
    if n < 0:  return 0
    return tilings_brute(n-1) + tilings_brute(n-2)

print("=== 1xN strip tilings ===")
for n in range(1, 11):
    r = tilings_recur(n); b = tilings_brute(n)
    print(f"T_{n} = {r}", "✓" if r == b else "✗")

# Binary strings, no two consecutive 1s
def good(s): return "11" not in s
print("\n=== Binary strings without '11' ===")
for n in range(1, 8):
    formula = 0
    a, b = 2, 3   # b_1=2, b_2=3
    if n == 1: formula = a
    elif n == 2: formula = b
    else:
        for _ in range(n - 2):
            a, b = b, a + b
        formula = b
    brute = sum(1 for s in product("01", repeat=n) if good("".join(s)))
    print(f"n={n}: formula={formula}, brute={brute}", "✓" if formula == brute else "✗")

# Climb stairs 1 or 2
def stairs(n, memo={0: 1, 1: 1}):
    if n in memo: return memo[n]
    memo[n] = stairs(n-1) + stairs(n-2)
    return memo[n]

print("\n=== Climbing 1 or 2 stairs ===")
for n in range(1, 8):
    print(f"  {n} stairs: {stairs(n)} ways")

# Tribonacci (climb 1, 2, or 3)
def tri(n, memo={1: 1, 2: 2, 3: 4}):
    if n in memo: return memo[n]
    memo[n] = tri(n-1) + tri(n-2) + tri(n-3)
    return memo[n]

print("\n=== Climbing 1, 2, or 3 (tribonacci) ===")
for n in range(1, 9):
    print(f"  {n} stairs: {tri(n)} ways")

# Grid paths (m+n choose m), via recurrence
def paths(m, n):
    grid = [[1] * (n+1) for _ in range(m+1)]
    for i in range(1, m+1):
        for j in range(1, n+1):
            grid[i][j] = grid[i-1][j] + grid[i][j-1]
    return grid[m][n]

print("\n=== Grid paths from (0,0) to (m,n) ===")
from math import comb
for m, n in [(2, 3), (3, 3), (4, 5)]:
    p = paths(m, n); c = comb(m+n, m)
    print(f"  ({m},{n}): recur={p}, C({m+n},{m})={c}", "✓" if p == c else "✗")
```

## Visualisation — Fibonacci recursion tree and the closed form

```python
# ── How recurrences and closed forms compare ────────────────
import matplotlib.pyplot as plt
import numpy as np

# Compute Fibonacci numbers and Binet's formula side by side.
phi = (1 + np.sqrt(5)) / 2
psi = (1 - np.sqrt(5)) / 2
def binet(n):
    return (phi**n - psi**n) / np.sqrt(5)

ns = np.arange(1, 16)
fib = [1, 1]
for _ in range(2, 16):
    fib.append(fib[-1] + fib[-2])
fib = np.array(fib[:15])

binet_vals = binet(ns)

fig, axes = plt.subplots(1, 2, figsize=(13, 5))

ax = axes[0]
ax.plot(ns, fib, "o-", lw=2, color="tab:blue", label="recurrence F_n = F_{n-1} + F_{n-2}")
ax.plot(ns, binet_vals, "s--", color="tab:red", alpha=0.7, label="Binet:  (φⁿ - ψⁿ)/√5")
ax.set_xlabel("n"); ax.set_ylabel("F_n")
ax.set_title("Fibonacci: recurrence and closed form agree exactly")
ax.legend(); ax.grid(alpha=0.3)

# Ratio F_{n+1}/F_n converges to φ
ax = axes[1]
ratios = [fib[i+1] / fib[i] for i in range(len(fib) - 1)]
ax.plot(range(1, len(ratios)+1), ratios, "o-", color="tab:purple", lw=2,
        label="F_{n+1} / F_n")
ax.axhline(phi, color="red", linestyle="--", label=f"φ = {phi:.6f}")
ax.set_xlabel("n"); ax.set_ylabel("ratio")
ax.set_title("Ratio of consecutive Fibonacci → golden ratio")
ax.legend(); ax.grid(alpha=0.3)

plt.tight_layout()
plt.show()
```

## Connection to CS / Games / AI / Business / Industry

- **CS / Algorithms** — Recurrence + memoisation is **dynamic programming** in
  miniature; LeetCode "climbing stairs", "house robber", "decode ways" are all
  one-line recurrence problems.
- **CS / Compilers** — counting parse trees for an ambiguous grammar uses
  Catalan recurrences (next lesson).
- **AI / ML** — recursive counting underlies Viterbi-style sequence models in
  HMMs and CRFs; CTC training in speech recognition counts alignment paths
  via recurrences identical to grid-path counting.
- **Games** — pathfinding on a grid with obstacles; counting "valid plays" in
  card-game AI; level-generation algorithms enumerate tile patterns by
  recurrence.
- **Business / Operations** — production planning where each day's output
  depends on yesterday's; option-pricing trees (binomial model) use
  $V_t = pV_{t+1}^{u} + (1-p)V_{t+1}^{d}$; renewal theory in queueing.
- **Engineering / Biology** — population genetics (Fibonacci first appeared
  modelling rabbit reproduction); branching processes; computer-graphics
  L-systems for plants.

## Check Your Understanding

1. **Pen & paper:** How many tilings of a $1 \times 6$ strip with squares and
   dominoes?
2. **Pen & paper:** Set up a recurrence for the number of binary strings of
   length $n$ with **no three consecutive 1s**.  Compute the count for $n = 5$.
3. **Pen & paper:** You climb stairs 1 or 2 at a time.  How many ways to climb
   8 stairs?  Verify by listing for $n = 4$.
4. **Pen & paper:** A path goes from $(0, 0)$ to $(3, 3)$ with only R and U
   moves, but the cell $(1, 1)$ is blocked.  Use the grid recurrence to count
   valid paths.
5. **Insight:** Why does choosing "the last move" lead naturally to a
   recurrence?  What goes wrong if you try to case-split on the *first* move
   instead?  (Answer: nothing — by symmetry it gives the same recurrence.
   This is a useful sanity check.)
