# Sequences and Series — Arithmetic, Geometric, Convergence

## Intuition

A **sequence** is an ordered list of numbers following a rule.  A **series**
is the sum of a sequence.  Arithmetic sequences grow by adding a constant.
Geometric sequences grow by multiplying.  Understanding convergence tells you
whether an infinite sum is finite — critical for Taylor series, geometric
series in probability, and algorithm analysis.

## Prerequisites

- Foundation 1, Lesson 1: Surds, Indices, Logarithms

## From First Principles

### Arithmetic sequence

Each term increases by constant $d$ (common difference):

$$a_n = a_1 + (n-1)d$$

**Pen & paper:** $a_1 = 3, d = 5$: sequence is $3, 8, 13, 18, 23, \ldots$

$a_{10} = 3 + 9(5) = 48$

**Sum of first $n$ terms:**

$$S_n = \frac{n}{2}(2a_1 + (n-1)d) = \frac{n}{2}(a_1 + a_n)$$

$S_{10} = \frac{10}{2}(3 + 48) = 255$

### Geometric sequence

Each term multiplied by constant $r$ (common ratio):

$$a_n = a_1 \cdot r^{n-1}$$

**Pen & paper:** $a_1 = 2, r = 3$: sequence is $2, 6, 18, 54, 162, \ldots$

$a_6 = 2 \times 3^5 = 486$

**Sum of first $n$ terms:**

$$S_n = a_1 \frac{r^n - 1}{r - 1} \quad (r \ne 1)$$

$S_5 = 2 \times \frac{3^5 - 1}{3 - 1} = 2 \times \frac{242}{2} = 242$

### Sum to infinity (convergence)

For a geometric series with $|r| < 1$:

$$S_\infty = \frac{a_1}{1 - r}$$

**Pen & paper:** $1 + \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \cdots = \frac{1}{1 - 1/2} = 2$

If $|r| \ge 1$: the series **diverges** (sum is infinite).

### Sigma notation

$$\sum_{k=1}^{n} k = 1 + 2 + \cdots + n = \frac{n(n+1)}{2}$$

$$\sum_{k=1}^{n} k^2 = \frac{n(n+1)(2n+1)}{6}$$

$$\sum_{k=0}^{n-1} r^k = \frac{1 - r^n}{1 - r}$$

### Binomial expansion

$$(1 + x)^n = \sum_{k=0}^{n} \binom{n}{k} x^k = 1 + nx + \frac{n(n-1)}{2!}x^2 + \cdots$$

**For rational $n$ (|x| < 1):**

$(1 + x)^{1/2} = 1 + \frac{1}{2}x - \frac{1}{8}x^2 + \frac{1}{16}x^3 - \cdots$

**Pen & paper:** Approximate $\sqrt{1.02}$:

$(1 + 0.02)^{1/2} \approx 1 + \frac{1}{2}(0.02) - \frac{1}{8}(0.02)^2 = 1 + 0.01 - 0.00005 = 1.00995$

Exact: $1.00995...\;$ ✓

## Python Verification

```python
# ── Sequences and Series ────────────────────────────────────
import math

# Arithmetic
print("=== Arithmetic: a₁=3, d=5 ===")
a1, d = 3, 5
for n in range(1, 11):
    an = a1 + (n-1)*d
    print(f"  a_{n} = {an}", end="")
print()
S10 = 10 * (2*a1 + 9*d) // 2
print(f"  S₁₀ = {S10}")

# Geometric
print(f"\n=== Geometric: a₁=2, r=3 ===")
a1, r = 2, 3
for n in range(1, 7):
    an = a1 * r**(n-1)
    print(f"  a_{n} = {an}", end="")
print()
S5 = a1 * (r**5 - 1) // (r - 1)
print(f"  S₅ = {S5}")

# Sum to infinity
print(f"\n=== Geometric sum to infinity ===")
for r in [0.5, 0.9, 0.99, 0.1]:
    S_inf = 1 / (1 - r)
    # Verify with partial sums
    S_100 = sum(r**k for k in range(100))
    print(f"  r={r}: S∞={S_inf:.4f}, S₁₀₀={S_100:.4f}")

# Sigma notation
print(f"\n=== Sigma sums ===")
for n in [10, 100, 1000]:
    sum_k = n*(n+1)//2
    sum_k2 = n*(n+1)*(2*n+1)//6
    print(f"  n={n}: Σk={sum_k}, Σk²={sum_k2}")

# Binomial expansion: √1.02
print(f"\n=== Binomial: √1.02 ===")
x = 0.02
approx = 1 + 0.5*x - 0.125*x**2 + (1/16)*x**3
exact = math.sqrt(1.02)
print(f"  3-term approx: {approx:.8f}")
print(f"  Exact:         {exact:.8f}")
print(f"  Error:         {abs(approx-exact):.2e}")
```

## Visualisation — Arithmetic vs geometric, and what "convergence" looks like

The two big sequence shapes — arithmetic (constant *step*) and geometric
(constant *ratio*) — look completely different on a graph, and that
shape is what makes "infinite sums" possible only for one of them.

```python
# ── Visualising sequences and their partial sums ────────────
import numpy as np
import matplotlib.pyplot as plt

n = np.arange(1, 21)                                # term index 1..20

# Two arithmetic sequences and two geometric sequences side by side.
arith_a = 5 + 3 * (n - 1)                           # 5, 8, 11, 14, ...      (d = 3)
arith_b = 20 - 2 * (n - 1)                          # 20, 18, 16, ...       (d = -2)
geo_a   = 2 * (1.5 ** (n - 1))                      # 2, 3, 4.5, 6.75, ...  (r = 1.5)
geo_b   = 100 * (0.8 ** (n - 1))                    # 100, 80, 64, ...      (r = 0.8)

fig, axes = plt.subplots(1, 3, figsize=(15, 4.5))

# (1) Arithmetic — terms lie on a STRAIGHT LINE because each new term
# adds the same constant. Slope of the line = the common difference d.
ax = axes[0]
ax.plot(n, arith_a, "o-", label="$a_n = 5 + 3(n-1)$,  d = 3")
ax.plot(n, arith_b, "s-", label="$a_n = 20 - 2(n-1)$, d = -2")
ax.set_title("Arithmetic sequence: constant step\n→ terms fall on a straight line")
ax.set_xlabel("n (term number)"); ax.set_ylabel("$a_n$")
ax.grid(True, alpha=0.3); ax.legend()

# (2) Geometric — for r > 1 the terms EXPLODE; for 0 < r < 1 they
# DECAY toward zero. The shape is exactly $b^x$ from the indices
# lesson, just sampled at integer x.
ax = axes[1]
ax.plot(n, geo_a, "o-", label="$a_n = 2 \\cdot 1.5^{n-1}$,  r = 1.5 (grow)")
ax.plot(n, geo_b, "s-", label="$a_n = 100 \\cdot 0.8^{n-1}$, r = 0.8 (decay)")
ax.set_yscale("log")  # log scale makes geometric sequences appear straight
ax.set_title("Geometric sequence: constant ratio\n→ on a log scale, becomes a straight line")
ax.set_xlabel("n (term number)"); ax.set_ylabel("$a_n$ (log scale)")
ax.grid(True, which="both", alpha=0.3); ax.legend()

# (3) Partial sums of the decaying geometric. The cumulative total
# *flattens out* and approaches S∞ = a / (1 - r). That horizontal
# limit is what "the infinite sum exists" means.
ax = axes[2]
S_partial = np.cumsum(geo_b)
S_infinity = 100 / (1 - 0.8)                       # exact limit = 500
ax.plot(n, S_partial, "o-", label="partial sum  $S_n$")
ax.axhline(S_infinity, color="red", linestyle="--",
           label=f"limit  $S_\\infty = a/(1-r) = {S_infinity:.0f}$")
ax.set_title("Convergence: when |r| < 1, partial sums\nflatten out toward a finite limit")
ax.set_xlabel("n (number of terms summed)"); ax.set_ylabel("partial sum $S_n$")
ax.grid(True, alpha=0.3); ax.legend()

plt.tight_layout()
plt.show()

# Print a small table that mirrors the right-hand plot.
print("Partial sums of 100 * 0.8^(n-1) approach 500 from below:")
for n_val in [1, 2, 5, 10, 20, 50, 100]:
    S = 100 * (1 - 0.8 ** n_val) / (1 - 0.8)
    print(f"  n = {n_val:>3}  →  S_n = {S:8.4f}   (gap from 500 = {500 - S:8.4f})")
```

**Three things to take away:**

- **Arithmetic = linear.** Each step adds the same number, so terms fall
  on a straight line. The common difference $d$ is the slope.
- **Geometric = exponential.** Each step multiplies by the same ratio.
  On a *log* y-axis, the terms become a straight line — the same trick
  log scales play in the indices/logarithms lesson.
- **Convergence requires $|r| < 1$.** The decaying series $100 + 80 + 64
  + \ldots$ piles up to the *finite* total $\frac{a}{1-r} = 500$.
  Geometric series with $|r| \ge 1$ run away to infinity. This is the
  whole reason discount factors $\gamma < 1$ work in reinforcement
  learning, and why a polite exponential decay schedule keeps a
  training loop's learning-rate sum bounded.

## Connection to CS / Games / AI

- **Algorithm analysis** — $\sum_{k=1}^{n} k = O(n^2)$ (nested loops)
- **Geometric series** — discount factor in RL: $V = \sum \gamma^t r_t = r/(1-\gamma)$
- **Learning rate decay** — geometric: $\alpha_t = \alpha_0 \cdot r^t$
- **Taylor/Maclaurin series** — infinite polynomial approximations (Tier 3-09)
- **Binary search** — halving each step = geometric sequence with $r = 1/2$, converges in $\log_2 n$ steps
- **Binomial distribution** — uses binomial coefficients from binomial expansion

## Check Your Understanding

1. **Pen & paper:** Find the 20th term and sum of first 20 terms of the arithmetic sequence $5, 8, 11, \ldots$
2. **Pen & paper:** A geometric series has $a_1 = 100, r = 0.8$.  Find $S_\infty$.  After how many terms is $S_n > 450$?
3. **Pen & paper:** Use the binomial expansion to approximate $(1.01)^{10}$ using 3 terms.
4. **Pen & paper:** Evaluate $\sum_{k=1}^{50}(3k + 1)$.
