# Pascal Identities — Hockey Stick, Vandermonde, Row Sums

## Intuition

Pascal's triangle is a number tableau where every entry is a sum of two above
it.  Hidden inside it are surprisingly powerful identities: a diagonal sums to
a single entry below it (the **hockey stick**), two rows can be combined into
a third (**Vandermonde**), and a whole row sums to $2^n$.  Each identity is a
counting argument disguised as algebra — once you see them, you stop computing
$\binom{n}{k}$ from scratch and start seeing patterns.

## Prerequisites

- Tier 1, Lesson 4: Combinatorics — Pascal's triangle and Pascal's identity
  $\binom{n}{r} = \binom{n-1}{r-1} + \binom{n-1}{r}$
- Tier 1, Lesson 7: Inclusion–exclusion (used for the alternating-sum identity)

## From First Principles

### Pascal's identity (recap and proof)

$$\binom{n}{r} = \binom{n-1}{r-1} + \binom{n-1}{r}$$

**Combinatorial proof.**  Choose $r$ items from $n$ items.  Pick a particular
item, call it Alice.  Either Alice is in your selection (then choose the other
$r - 1$ from the remaining $n - 1$: $\binom{n-1}{r-1}$ ways) or she isn't
(then choose all $r$ from the remaining $n - 1$: $\binom{n-1}{r}$ ways).
Add these mutually exclusive cases.

This is the recurrence that builds Pascal's triangle row by row.

### Symmetry

$$\binom{n}{r} = \binom{n}{n - r}$$

**Combinatorial proof.** Choosing the $r$ items to include is the same act as
choosing the $n - r$ items to exclude.

### Row sum (subset count)

$$\sum_{r=0}^{n} \binom{n}{r} = 2^n$$

**Combinatorial proof.**  $\binom{n}{r}$ counts subsets of size $r$.  Sum over
all $r$ counts **all** subsets of an $n$-element set.  Each element is independently
in-or-out, giving $2^n$.

**Pen & paper:** $n = 4$.  Row 4 of Pascal: $1 + 4 + 6 + 4 + 1 = 16 = 2^4$. ✓

### Alternating row sum

$$\sum_{r=0}^{n} (-1)^r \binom{n}{r} = 0 \qquad (n \ge 1)$$

**Algebraic proof.**  Apply the binomial theorem to $(1 - 1)^n = 0$.

**Combinatorial proof.**  Subsets of even size = subsets of odd size, when $n \ge 1$.
(Pair each subset $S$ with $S \triangle \{a\}$ for any fixed element $a$;
this is a bijection between even and odd subsets.)

### Hockey stick identity

$$\binom{r}{r} + \binom{r+1}{r} + \binom{r+2}{r} + \cdots + \binom{n}{r} = \binom{n+1}{r+1}$$

**Why "hockey stick"?**  In Pascal's triangle, the terms on the left form the
**handle** (a diagonal), and the answer on the right is the **blade** (the
entry just below where the diagonal ends).

```
                 1
               1   1
             1   2   1
           1   3   3   1
         1   4   6   4   1     ← C(4,2)=6  on a diagonal
       1   5  10  10   5   1   ← C(5,2)=10 on a diagonal
     1   6  15  20  15   6   1 ← C(6,3)=20 ← the "blade"
```

C(2,2) + C(3,2) + C(4,2) + C(5,2) = 1 + 3 + 6 + 10 = 20 = C(6,3) ✓

**Combinatorial proof.**  $\binom{n+1}{r+1}$ counts $(r+1)$-subsets of
$\{1, 2, \ldots, n+1\}$.  Group these by their **largest element**.  If the
largest is $m + 1$, the remaining $r$ items are chosen from $\{1, \ldots, m\}$
in $\binom{m}{r}$ ways.  Sum over $m = r, r+1, \ldots, n$.

### Vandermonde's identity

$$\binom{m + n}{r} = \sum_{k=0}^{r} \binom{m}{k} \binom{n}{r - k}$$

**Combinatorial proof.**  Choose $r$ people from a group with $m$ men and
$n$ women.  Either all $r$ are women, or 1 man and $r-1$ women, …, or all $r$
are men.  Sum these cases.

**Pen & paper:** $\binom{6}{3}$ from 4 men + 2 women.

$\binom{4}{3}\binom{2}{0} + \binom{4}{2}\binom{2}{1} + \binom{4}{1}\binom{2}{2}$
$= 4 \cdot 1 + 6 \cdot 2 + 4 \cdot 1 = 4 + 12 + 4 = 20 = \binom{6}{3}$ ✓

### Two more useful identities

**Sum of squares:**

$$\sum_{r=0}^{n} \binom{n}{r}^2 = \binom{2n}{n}$$

(A direct corollary of Vandermonde with $m = n$ and $r = n$, using symmetry.)

**Absorption (used for index manipulation):**

$$r \binom{n}{r} = n \binom{n-1}{r-1}$$

**Proof.** Both sides count *committees of $r$ people from $n$, with one of
them designated chair*: pick the committee then the chair (LHS), or pick the
chair then their committee (RHS).

## Python Verification

```python
# ── Verifying Pascal identities ──────────────────────────
from math import comb

# Pascal's identity: C(n,r) = C(n-1,r-1) + C(n-1,r)
print("=== Pascal's identity ===")
for n in range(2, 8):
    for r in range(1, n):
        lhs = comb(n, r)
        rhs = comb(n-1, r-1) + comb(n-1, r)
        assert lhs == rhs
print("All Pascal's identities verified for n = 2..7 ✓")

# Row sum = 2^n
print("\n=== Row sums ===")
for n in range(8):
    s = sum(comb(n, r) for r in range(n+1))
    print(f"Row {n}: sum = {s} = 2^{n} = {2**n}", "✓" if s == 2**n else "✗")

# Alternating row sum
print("\n=== Alternating row sums (n ≥ 1) ===")
for n in range(1, 8):
    s = sum((-1)**r * comb(n, r) for r in range(n+1))
    print(f"Row {n}: alt sum = {s}", "✓" if s == 0 else "✗")

# Hockey stick: sum_{m=r..n} C(m,r) = C(n+1, r+1)
print("\n=== Hockey stick ===")
r, n = 2, 5
lhs = sum(comb(m, r) for m in range(r, n+1))
rhs = comb(n+1, r+1)
print(f"C(2,2)+C(3,2)+C(4,2)+C(5,2) = {lhs}, C(6,3) = {rhs}", "✓" if lhs == rhs else "✗")

# Vandermonde
print("\n=== Vandermonde ===")
m, n, r = 4, 2, 3
lhs = sum(comb(m, k) * comb(n, r-k) for k in range(r+1))
rhs = comb(m+n, r)
print(f"sum_k C(4,k)C(2,3-k) = {lhs}, C(6,3) = {rhs}", "✓" if lhs == rhs else "✗")

# Sum of squares: sum_r C(n,r)^2 = C(2n,n)
print("\n=== Sum of squares ===")
for n in range(1, 8):
    lhs = sum(comb(n, r)**2 for r in range(n+1))
    rhs = comb(2*n, n)
    print(f"n={n}: sum C({n},r)^2 = {lhs}, C({2*n},{n}) = {rhs}", "✓" if lhs == rhs else "✗")

# Absorption: r*C(n,r) = n*C(n-1,r-1)
print("\n=== Absorption ===")
for n in range(2, 6):
    for r in range(1, n+1):
        assert r * comb(n, r) == n * comb(n-1, r-1)
print("All absorption identities verified ✓")
```

## Visualisation — diagonals and hockey-stick paths

```python
# ── Highlight the hockey-stick diagonal in Pascal's triangle ─
import matplotlib.pyplot as plt
import numpy as np
from math import comb

N = 9
fig, ax = plt.subplots(figsize=(11, 7))
ax.set_xlim(-N, N); ax.set_ylim(-1, N + 1)
ax.invert_yaxis(); ax.axis("off")
ax.set_title("Hockey-stick identity in Pascal's triangle\n"
             "C(2,2) + C(3,2) + C(4,2) + C(5,2) = C(6,3)\n"
             "(stick = handle, blade = answer)")

# Highlight the hockey-stick diagonal r=2, n=2..5 and the blade C(6,3).
stick = {(m, 2) for m in range(2, 6)}
blade = (6, 3)

for n in range(N):
    for r in range(n + 1):
        v = comb(n, r)
        x = r - n / 2
        y = n
        in_stick = (n, r) in stick
        is_blade = (n, r) == blade
        if is_blade:
            color = "tab:red"; weight = "bold"; size = 14
        elif in_stick:
            color = "tab:orange"; weight = "bold"; size = 13
        else:
            color = "lightgray"; weight = "normal"; size = 11
        ax.text(x, y, str(v), ha="center", va="center",
                fontsize=size, color=color, weight=weight,
                bbox=dict(boxstyle="round,pad=0.2", facecolor="white",
                          edgecolor=color, linewidth=2 if (in_stick or is_blade) else 0.5))

# Annotation
total = sum(comb(m, 2) for m in range(2, 6))
ax.text(0, N + 0.5, f"orange sum = {total} = red value", ha="center",
        fontsize=12, color="black")

plt.tight_layout()
plt.show()
```

## Connection to CS / Games / AI / Business / Industry

- **CS / Algorithms** — Pascal's identity *is* the recurrence powering the
  classic dynamic-programming solution for $\binom{n}{r}$ (no factorials,
  no overflow); the hockey-stick gives closed forms for partial-sum tables
  in 2D DP.
- **AI / ML** — Vandermonde's identity is the combinatorial backbone of the
  multivariate hypergeometric distribution (used in stratified sampling),
  and the binomial row sum $2^n$ is the count of feature subsets in random
  forests / boosting.
- **Probability** — the alternating row sum is the discrete sibling of
  inclusion–exclusion's parity argument; the absorption identity is the
  one-line trick behind the formula $\mathbb{E}[X] = np$ for binomial
  random variables.
- **Compression / Information theory** — the central binomial coefficient
  $\binom{2n}{n}$ controls the rate of arithmetic coding for fair coins
  and is the count of monotone lattice paths used in Markov-chain mixing.
- **Business / Finance** — $\binom{n}{k}$ identities power American-option
  binomial-tree pricing models (Cox–Ross–Rubinstein); rebalancing volume
  in tree models depends on the hockey-stick partial sum.

## Check Your Understanding

1. **Pen & paper:** Use Pascal's identity to compute $\binom{6}{3}$ from
   $\binom{5}{2}$ and $\binom{5}{3}$, without computing factorials.
2. **Pen & paper:** Use the row-sum identity to count *all* subsets of
   $\{1, 2, \ldots, 7\}$, then verify by direct argument.
3. **Pen & paper:** Use Vandermonde to compute $\binom{8}{4}$ as a sum
   involving $\binom{4}{k}\binom{4}{4-k}$.
4. **Combinatorial proof:** Prove the hockey-stick identity using a story
   about choosing a committee with a designated tallest member.
5. **Pen & paper:** Compute $\sum_{r=0}^{6} r \binom{6}{r}$ using the
   absorption identity (you should get $6 \cdot 2^5 = 192$).
