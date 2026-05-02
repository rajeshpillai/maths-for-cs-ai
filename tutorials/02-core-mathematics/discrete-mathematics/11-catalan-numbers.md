# Catalan Numbers — One Sequence, Many Problems

## Intuition

How many ways to put parentheses around 4 numbers like $a \cdot b \cdot c \cdot d$
so the multiplication order is well-defined?  How many monotone lattice paths
from $(0,0)$ to $(n,n)$ that *never cross above* the diagonal?  How many ways
to triangulate a convex polygon?  All have the **same answer** — the Catalan
numbers $C_n = 1, 1, 2, 5, 14, 42, 132, \ldots$.  When the same sequence
appears across problems that look unrelated, it is signalling deep
combinatorial structure.

## Prerequisites

- Tier 1, Lesson 4: Combinatorics ($\binom{n}{k}$, Pascal's triangle)
- Tier 1, Lesson 10: Recurrence-based counting

## From First Principles

### The Catalan numbers

$$C_0 = 1, \quad C_1 = 1, \quad C_2 = 2, \quad C_3 = 5, \quad C_4 = 14, \quad C_5 = 42$$

**Closed form:**

$$C_n = \frac{1}{n + 1} \binom{2n}{n}$$

**Recurrence:**

$$C_{n+1} = \sum_{i=0}^{n} C_i \, C_{n - i}, \qquad C_0 = 1$$

(The recurrence is what you get from "case on the first matching pair of
parentheses" — see derivation below.)

### Problem 1 — balanced parentheses

How many strings of $n$ pairs of parentheses are properly balanced?

$n = 1$: `()` — 1 way. $C_1 = 1$.

$n = 2$: `()()`, `(())` — 2 ways. $C_2 = 2$.

$n = 3$: `()()()`, `()(())`, `(())()`, `(()())`, `((()))` — 5 ways. $C_3 = 5$.

**Recurrence proof.** Take a balanced string of $n+1$ pairs.  The first `(` is
matched by some `)`.  Inside that pair sit $i$ pairs (for some $0 \le i \le n$),
and outside (after the matching `)`) sit $n - i$ pairs.  Both inside and
outside are themselves balanced.  Number of ways: $C_i \cdot C_{n-i}$.
Sum over $i$.

### Problem 2 — Dyck paths (lattice paths above the diagonal)

Walk from $(0, 0)$ to $(n, n)$ using only Right and Up steps, **never crossing
above the diagonal** $y = x$ (i.e. always have #U ≤ #R).

$n = 3$: 5 such paths.  Same as $C_3$.

The bijection with parentheses: Right step ↔ `(`, Up step ↔ `)`.  "Never
crossing above the diagonal" ↔ "never more close-parens than open-parens
in any prefix" ↔ balanced.

### Problem 3 — full binary trees

A **full binary tree** has every node with either 0 or 2 children.  How many
full binary trees with $n + 1$ leaves (equivalently $n$ internal nodes)?

Pick the left subtree's size $i$ and the right subtree's size $n - 1 - i$:

$$T_n = \sum_{i=0}^{n-1} T_i \, T_{n-1-i}$$

Same recurrence (with shifted index), so $T_n = C_n$.

### Problem 4 — triangulations of a convex polygon

How many ways to triangulate a convex polygon with $n + 2$ vertices using
non-crossing diagonals?

$n = 1$: triangle (3 vertices) — 1 way.
$n = 2$: square (4 vertices) — 2 ways (two diagonals).
$n = 3$: pentagon (5 vertices) — 5 ways.
$n = 4$: hexagon (6 vertices) — 14 ways.

**Recurrence.** Fix one edge.  Choose which vertex forms a triangle with that
edge: this splits the polygon into two smaller polygons of sizes $i + 2$ and
$(n - i) + 2$.  Sum gives the Catalan recurrence.

### Why does $\frac{1}{n+1}\binom{2n}{n}$ count Dyck paths?

**The reflection (cycle lemma) trick.**  Total paths from $(0,0)$ to $(n,n)$
with R and U steps: $\binom{2n}{n}$.  We want to exclude **bad** paths that
cross above the diagonal.

Take any bad path.  At some moment it first touches $y = x + 1$.  Reflect the
portion *before* that touch across $y = x + 1$.  This bijection sends bad
paths from $(0, 0) \to (n, n)$ to *all* paths from $(-1, 1) \to (n, n)$,
i.e. paths needing $n + 1$ Ups and $n - 1$ Rights, of which there are
$\binom{2n}{n - 1}$.

Good paths $= \binom{2n}{n} - \binom{2n}{n-1} = \frac{1}{n+1}\binom{2n}{n}$.

**Algebra check:**

$$\binom{2n}{n} - \binom{2n}{n-1} = \binom{2n}{n}\left(1 - \frac{n}{n+1}\right) = \frac{1}{n+1}\binom{2n}{n}$$

### Asymptotic growth

$$C_n \sim \frac{4^n}{n^{3/2} \sqrt{\pi}}$$

Catalans grow like $4^n / n^{3/2}$ — slightly slower than $4^n$, much faster
than any polynomial.

## Python Verification

```python
# ── Catalan numbers: closed form, recurrence, brute force ───
from math import comb

def catalan_closed(n):
    return comb(2*n, n) // (n + 1)

def catalan_recur(n, memo={0: 1}):
    if n in memo: return memo[n]
    memo[n] = sum(catalan_recur(i) * catalan_recur(n-1-i) for i in range(n))
    return memo[n]

print("=== Catalan numbers ===")
for n in range(11):
    a, b = catalan_closed(n), catalan_recur(n)
    print(f"C_{n:>2} = {a:>10,}", "✓" if a == b else "✗")

# Brute force: count balanced parenthesis strings of length 2n.
def balanced(s):
    depth = 0
    for c in s:
        depth += 1 if c == "(" else -1
        if depth < 0: return False
    return depth == 0

from itertools import product
print("\n=== Balanced parentheses (brute) ===")
for n in range(1, 6):
    count = sum(1 for s in product("()", repeat=2*n) if balanced("".join(s)))
    print(f"n={n}: {count} balanced strings = C_{n} = {catalan_closed(n)}",
          "✓" if count == catalan_closed(n) else "✗")

# Brute: Dyck paths from (0,0) to (n,n) staying below or on the diagonal.
def dyck(n):
    # Walk along all 2n-step R/U sequences with n R and n U;
    # check the running difference (#R − #U) stays ≥ 0.
    count = 0
    from itertools import combinations as combs
    for ups in combs(range(2*n), n):
        path = ["U" if i in ups else "R" for i in range(2*n)]
        rs = us = 0
        ok = True
        for step in path:
            if step == "R": rs += 1
            else: us += 1
            if us > rs: ok = False; break
        if ok: count += 1
    return count

print("\n=== Dyck paths (brute) ===")
for n in range(1, 6):
    print(f"n={n}: {dyck(n)} Dyck paths = C_{n}", "✓" if dyck(n) == catalan_closed(n) else "✗")

# List the 5 balanced strings for n = 3
print("\n=== All balanced strings for n = 3 ===")
for s in product("()", repeat=6):
    if balanced("".join(s)): print(" ", "".join(s))
```

## Visualisation — five Dyck paths for n = 3

```python
# ── Drawing the 5 Dyck paths from (0,0) to (3,3) ────────────
import matplotlib.pyplot as plt

n = 3
# The 5 Dyck paths as R/U strings.
paths = ["RRRUUU", "RRURUU", "RRUURU", "RURRUU", "RURURU"]

fig, axes = plt.subplots(1, 5, figsize=(15, 3.2))
for ax, p in zip(axes, paths):
    x = y = 0
    xs, ys = [0], [0]
    for c in p:
        if c == "R": x += 1
        else:        y += 1
        xs.append(x); ys.append(y)
    # Draw the diagonal y = x.
    ax.plot([0, n], [0, n], "k--", lw=1, alpha=0.5)
    ax.plot(xs, ys, "o-", color="tab:blue", lw=2, ms=6)
    # Forbidden region above the diagonal — shade.
    ax.fill_between([0, n], [0, n], [n, n], alpha=0.15, color="red")
    ax.set_xlim(-0.3, n + 0.3); ax.set_ylim(-0.3, n + 0.3)
    ax.set_xticks(range(n+1)); ax.set_yticks(range(n+1))
    ax.set_aspect("equal"); ax.grid(alpha=0.3)
    ax.set_title(p, fontsize=9)

fig.suptitle(f"All {len(paths)} Dyck paths from (0,0) to ({n},{n})\n"
             f"= C_{n} = {n} · 5 / ({n}+1) = 5  (red region forbidden)")
plt.tight_layout()
plt.show()
```

## Connection to CS / Games / AI / Business / Industry

- **CS / Compilers & PL** — counting valid expression trees, parse-tree counts
  for an ambiguous grammar, valid bracket/HTML-tag nestings; the matrix-chain
  multiplication problem (DP) has $C_n$ different parenthesisations.
- **CS / Data structures** — number of distinct **binary search trees** with
  $n$ keys is $C_n$; number of valid push/pop sequences for a stack of $n$
  items is $C_n$.
- **AI / ML** — RNA secondary-structure prediction (in computational biology)
  enumerates non-crossing pairings, a Catalan structure; sequence-alignment
  trace-back counts in HMMs.
- **Probability** — first-passage problems for a fair random walk return to
  the origin in steps governed by Catalan-like distributions; ballot problem.
- **Games / Graphics** — counting non-crossing chord diagrams (used in
  procedural map generation); polygon triangulation count is the bound on
  feasible meshes for a convex face.
- **Finance** — number of distinct binary tree models (Cox–Ross–Rubinstein
  trees) of a fixed height; counting feasible order-book matching paths
  in fair markets.

## Check Your Understanding

1. **Pen & paper:** Compute $C_4$ and $C_5$ from the closed form
   $\frac{1}{n+1}\binom{2n}{n}$.
2. **Pen & paper:** List all 5 binary search trees on the keys $\{1, 2, 3\}$.
3. **Pen & paper:** Show that for $n = 4$ vertices (square), there are exactly
   2 triangulations.  Sketch them.
4. **Recurrence:** Use $C_{n+1} = \sum_i C_i C_{n-i}$ to compute $C_4$ from
   $C_0, C_1, C_2, C_3$.
5. **Insight:** A stack of capacity $\infty$ receives $n$ pushes (numbers $1,
   \ldots, n$) and $n$ pops in some order.  Show the number of valid
   push/pop sequences is $C_n$.  Hint: relate to balanced parentheses.
