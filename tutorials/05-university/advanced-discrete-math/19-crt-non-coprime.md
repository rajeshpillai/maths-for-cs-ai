# Chinese Remainder Theorem — The Non-Coprime Case

## Intuition

The classical CRT says: if you know $x \bmod 5$ and $x \bmod 7$, you can
recover $x \bmod 35$ uniquely.  But what if your moduli **share a common
factor** — like $x \bmod 12$ and $x \bmod 15$?  Sometimes a unique answer
exists modulo $\text{lcm}(12, 15) = 60$; sometimes the system has **no
solution at all**.  This lesson nails down exactly when it works, why, and how
to combine the congruences.

## Prerequisites

- Tier 0, Lesson 4: Modular arithmetic basics
- Tier 0, Lesson 5: Primes, GCD/LCM (Euclidean algorithm)
- Tier 13, Lesson 2: Modular arithmetic advanced (CRT for coprime moduli)

## From First Principles

### Recap — coprime CRT

If $\gcd(m_1, m_2) = 1$, the system

$$x \equiv a_1 \pmod{m_1}, \qquad x \equiv a_2 \pmod{m_2}$$

has a **unique** solution modulo $m_1 m_2$.  The solution is constructed
using the modular inverses $m_1^{-1} \pmod{m_2}$ and $m_2^{-1} \pmod{m_1}$.

This is what's traditionally called **the** Chinese Remainder Theorem.

### What can go wrong when $\gcd(m_1, m_2) > 1$?

**Example 1 — no solution.**

$$x \equiv 2 \pmod{6}, \qquad x \equiv 5 \pmod{8}$$

These moduli share $\gcd(6, 8) = 2$.  Both equations imply something about
$x \bmod 2$: the first says $x \equiv 2 \equiv 0 \pmod 2$, the second says
$x \equiv 5 \equiv 1 \pmod 2$.  **Contradiction.**  No $x$ satisfies both.

**Example 2 — solvable but not unique mod the product.**

$$x \equiv 2 \pmod{6}, \qquad x \equiv 8 \pmod{15}$$

$\gcd(6, 15) = 3$.  First implies $x \equiv 2 \pmod 3$, second implies
$x \equiv 8 \equiv 2 \pmod 3$.  Consistent!  Solution exists, and it's
unique modulo $\text{lcm}(6, 15) = 30$ (not $90 = 6 \cdot 15$).

### The general theorem

A system

$$x \equiv a_1 \pmod{m_1}, \qquad x \equiv a_2 \pmod{m_2}$$

has a solution **iff** $\gcd(m_1, m_2)$ divides $a_1 - a_2$.

When it has a solution, the solution is **unique modulo $\text{lcm}(m_1, m_2)$**.

**Proof sketch.**

(⇒) If $x$ exists, $x = a_1 + k m_1 = a_2 + j m_2$ for some integers $k, j$,
so $a_1 - a_2 = j m_2 - k m_1$.  The right side is a $\mathbb{Z}$-linear
combination of $m_1$ and $m_2$, hence divisible by $\gcd(m_1, m_2)$.

(⇐) Conversely, if $\gcd(m_1, m_2) \mid a_1 - a_2$, write $g = \gcd(m_1, m_2)$,
$d = (a_1 - a_2) / g$, and use Bézout: there exist $u, v$ with $u m_1 + v m_2 = g$.
Then $x = a_1 - d \cdot u m_1$ works (verify both congruences).

### Worked example — solvable case

$$x \equiv 2 \pmod{6}, \qquad x \equiv 8 \pmod{15}$$

Step 1 — check consistency.  $g = \gcd(6, 15) = 3$.  $a_1 - a_2 = -6$, and
$3 \mid -6$. ✓

Step 2 — find Bézout: $\gcd(6, 15) = 3$ via $-2 \cdot 6 + 1 \cdot 15 = 3$.
So $u = -2, v = 1$.

Step 3 — $d = (a_1 - a_2)/g = -6/3 = -2$.

Step 4 — $x = a_1 - d \cdot u \cdot m_1 = 2 - (-2)(-2)(6) = 2 - 24 = -22 \equiv 8 \pmod{30}$.

Check: $8 \bmod 6 = 2$ ✓ and $8 \bmod 15 = 8$ ✓.

So the unique solution is $x \equiv 8 \pmod{30}$.

### Worked example — unsolvable case

$$x \equiv 2 \pmod{6}, \qquad x \equiv 5 \pmod{8}$$

Step 1 — check.  $g = \gcd(6, 8) = 2$.  $a_1 - a_2 = -3$, and $2 \nmid -3$. ✗

No solution.

### Algorithm — combining two congruences

```
Input:  (a1, m1), (a2, m2)
Compute g = gcd(m1, m2), and Bézout (u, v) with u*m1 + v*m2 = g.
If (a2 - a1) is not divisible by g: return "no solution".
Let lambda = (a2 - a1) / g.
New solution: a = a1 + lambda * u * m1.
New modulus: M = lcm(m1, m2) = m1 * m2 / g.
Return (a mod M, M).
```

This combines two congruences into one.  For more than two, **iterate**:
combine the first two, then combine the result with the third, and so on.

### Multiple congruences — fold pairwise

For $r$ congruences $\{x \equiv a_i \pmod{m_i}\}_{i=1}^r$, fold them pairwise.
The system is consistent iff every pair is consistent.

**Key consequence (the original CRT).** If the moduli are **pairwise coprime**,
every pair is automatically consistent (consistency condition is "0 divides
anything"), and the unique solution is modulo $\prod m_i$.

### Why does the lcm appear?

Geometric picture: think of $x \bmod m$ as picking which residue class among
$m$ classes.  Knowledge of $x \bmod m_1$ tells us which of $m_1$ rows of a
table $x$ is in; $x \bmod m_2$ tells us which column.  The whole table has
$\text{lcm}(m_1, m_2)$ distinct cells (because the period of "(row $\bmod m_1$,
column $\bmod m_2$)" is $\text{lcm}$, not the product, when there's overlap).

If the row constraint and column constraint don't agree on the
$\gcd$-coloured "macro-row", no cell satisfies both.

## Python Verification

```python
# ── CRT for non-coprime moduli ──────────────────────────────
from math import gcd

def extended_gcd(a, b):
    """Return (g, u, v) with u*a + v*b = g = gcd(a, b)."""
    if b == 0:
        return (a, 1, 0)
    g, u1, v1 = extended_gcd(b, a % b)
    return (g, v1, u1 - (a // b) * v1)

def crt_pair(a1, m1, a2, m2):
    """Combine x ≡ a1 (m1) and x ≡ a2 (m2). Return (a, M) or None."""
    g, u, v = extended_gcd(m1, m2)
    diff = a2 - a1
    if diff % g != 0:
        return None
    lcm = m1 // g * m2
    lam = diff // g
    a = (a1 + lam * u * m1) % lcm
    return (a, lcm)

def crt_many(pairs):
    """Combine a list of (a, m) congruences."""
    a, m = pairs[0]
    for a2, m2 in pairs[1:]:
        result = crt_pair(a, m, a2, m2)
        if result is None: return None
        a, m = result
    return (a, m)

print("=== Solvable example ===")
result = crt_pair(2, 6, 8, 15)
print(f"x ≡ 2 (mod 6) and x ≡ 8 (mod 15): {result}")
assert result == (8, 30)

print("\n=== Unsolvable example ===")
result = crt_pair(2, 6, 5, 8)
print(f"x ≡ 2 (mod 6) and x ≡ 5 (mod 8): {result}")
assert result is None

print("\n=== Pairwise-coprime classical CRT ===")
result = crt_many([(1, 3), (2, 5), (3, 7)])
print(f"x ≡ 1 (3), x ≡ 2 (5), x ≡ 3 (7): {result}")
assert result == (52, 105)

print("\n=== Three non-coprime congruences ===")
result = crt_many([(2, 6), (8, 15), (3, 10)])
print(f"x ≡ 2 (6), x ≡ 8 (15), x ≡ 3 (10): {result}")
# Manual check
if result:
    x, M = result
    for r, m in [(2, 6), (8, 15), (3, 10)]:
        print(f"  {x} mod {m} = {x % m}, expected {r}",
              "✓" if x % m == r else "✗")

print("\n=== Detect inconsistency in chain ===")
result = crt_many([(2, 6), (8, 15), (4, 10)])
print(f"x ≡ 2 (6), x ≡ 8 (15), x ≡ 4 (10): {result}")
# Last one needs x ≡ 4 mod 10, but combining 2 mod 6 and 8 mod 15 gives x = 8
# mod 30, so x mod 10 = 8 ≠ 4. Inconsistent.
```

## Visualisation — the lattice picture

```python
# ── Show why non-coprime CRT collapses to the lcm grid ──────
import matplotlib.pyplot as plt
import numpy as np

# Plot residues mod m1 vs mod m2 for the first M = m1*m2 integers.
fig, axes = plt.subplots(1, 2, figsize=(13, 5.5))

# (1) Coprime case: m1 = 3, m2 = 5 — every (r1, r2) pair is hit once.
m1, m2 = 3, 5
ax = axes[0]
M = m1 * m2
xs = np.arange(M)
r1 = xs % m1
r2 = xs % m2
ax.scatter(r1, r2, c=xs, cmap="viridis", s=80)
for x, a, b in zip(xs, r1, r2):
    ax.text(a, b, str(x), ha="center", va="center", fontsize=9, color="white")
ax.set_xlabel(f"x mod {m1}"); ax.set_ylabel(f"x mod {m2}")
ax.set_title(f"Coprime CRT: m₁={m1}, m₂={m2}\n"
             f"Every cell hit exactly once → unique solution mod {M}")
ax.set_xticks(range(m1)); ax.set_yticks(range(m2))
ax.grid(alpha=0.3)

# (2) Non-coprime case: m1 = 6, m2 = 8 — only some cells are reachable.
m1, m2 = 6, 8
ax = axes[1]
M = max(m1 * m2, 100)
xs = np.arange(M)
r1 = xs % m1
r2 = xs % m2
seen = set()
shown = []
for x, a, b in zip(xs, r1, r2):
    if (a, b) not in seen:
        seen.add((a, b))
        shown.append((a, b, x))
ax.scatter([s[0] for s in shown], [s[1] for s in shown],
           c=[s[2] for s in shown], cmap="viridis", s=80)
ax.set_xlabel(f"x mod {m1}"); ax.set_ylabel(f"x mod {m2}")
ax.set_title(f"Non-coprime: m₁={m1}, m₂={m2}\n"
             f"Only {len(shown)} of {m1*m2} cells reachable\n"
             f"= lcm({m1},{m2}) = {m1*m2//np.gcd(m1,m2)}")
ax.set_xticks(range(m1)); ax.set_yticks(range(m2))
ax.grid(alpha=0.3)

plt.tight_layout()
plt.show()
```

The right-hand picture is the diagnostic: when moduli share a common factor,
many cells are simply unreachable.  A system asking for an unreachable cell
has no solution.

## Connection to CS / Games / AI / Business / Industry

- **CS / Cryptography** — CRT speeds up RSA decryption: instead of working
  modulo $n = pq$, do two computations modulo $p$ and $q$ then combine
  (~4× faster). RSA's CRT-mode private keys store $d_p, d_q, q_p$ for this.
- **CS / Hashing** — distributed hash tables and consistent hashing use CRT-
  style decompositions to map data across multiple shards with different
  modular keys.
- **CS / Algorithms** — modular arithmetic over multiple small primes (then
  CRT-recovered) is how big-integer multiplication libraries (FFT-based)
  control overflow; same idea powers fast polynomial multiplication.
- **AI / ML** — privacy-preserving ML (homomorphic encryption schemes like
  BFV, BGV) use CRT to pack many plaintexts into a single ciphertext slot,
  amortising the cost of operations.
- **Engineering / Signal Processing** — number-theoretic transforms (NTT) used
  in lattice-based post-quantum cryptography rely on CRT to switch between
  number-theoretic and polynomial representations.
- **Operations / Scheduling** — periodic tasks with mismatched periods (a
  daily backup, a weekly report, a monthly invoice) align in cycles given by
  $\text{lcm}$; CRT solves "when do all three fall on the same day?".

## Check Your Understanding

1. **Pen & paper:** Solve $x \equiv 7 \pmod{12}$ and $x \equiv 11 \pmod{18}$,
   or show no solution exists.
2. **Pen & paper:** Solve $x \equiv 4 \pmod{8}$ and $x \equiv 1 \pmod{6}$ —
   or explain why none exists.
3. **Pen & paper:** A train arrives every 12 minutes; a bus every 18 minutes.
   They both arrived 5 minutes ago.  When is the next time they both arrive
   together?
4. **Algorithm:** Combine three non-coprime congruences pairwise: $x \equiv
   2 \pmod 4$, $x \equiv 4 \pmod 6$, $x \equiv 7 \pmod 9$.
5. **Insight:** Why does the existence condition $g \mid a_1 - a_2$ not
   appear in the coprime case?  (Because $g = 1$ and 1 divides everything.)
