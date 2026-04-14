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
