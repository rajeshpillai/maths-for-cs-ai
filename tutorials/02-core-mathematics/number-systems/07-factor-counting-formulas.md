# Counting and Summing the Factors of $n$

## Intuition

How many positive divisors does $360$ have?  What is the sum of all divisors
of $360$?  What is the **product** of all divisors of $360$?  All three
questions have closed-form answers that fall out of one ingredient: the
**prime factorisation** of $n$.  Once you know
$n = p_1^{a_1} p_2^{a_2} \cdots p_k^{a_k}$, the multiplicative structure of
divisors is a small combinatorial problem.

## Prerequisites

- Tier 0, Lesson 5: Primes, GCD, LCM (prime factorisation, FTA)
- Tier 1, Lesson 4: Combinatorics (multiplication principle)

## From First Principles

### Bijection between divisors and exponent tuples

If $n = p_1^{a_1} p_2^{a_2} \cdots p_k^{a_k}$ and $d \mid n$, then $d$ has the
form $d = p_1^{b_1} p_2^{b_2} \cdots p_k^{b_k}$ with $0 \le b_i \le a_i$ for
each $i$.  Conversely every such tuple gives a valid divisor.

This is a clean bijection:

$$\{ d : d \mid n \} \;\leftrightarrow\; \{(b_1, \ldots, b_k) : 0 \le b_i \le a_i\}$$

### Number of divisors $\tau(n)$ (also written $d(n)$)

By the multiplication principle, the number of valid exponent tuples is

$$\tau(n) = (a_1 + 1)(a_2 + 1) \cdots (a_k + 1)$$

Each $a_i + 1$ choices for the exponent of $p_i$, multiplied together.

**Pen & paper:** $360 = 2^3 \cdot 3^2 \cdot 5^1$.

$\tau(360) = 4 \cdot 3 \cdot 2 = 24$.  Sanity-check by partial listing:
$1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90,
120, 180, 360$ — twenty-four. ✓

### Sum of divisors $\sigma(n)$

Each divisor is a product $\prod_i p_i^{b_i}$ with $0 \le b_i \le a_i$, and
the sum over all divisors is the product of geometric-series sums (one per
prime):

$$\sigma(n) = \prod_{i=1}^{k} (1 + p_i + p_i^2 + \cdots + p_i^{a_i}) = \prod_{i=1}^{k} \frac{p_i^{a_i + 1} - 1}{p_i - 1}$$

**Pen & paper:** $\sigma(360)$.

$$\sigma(360) = (1 + 2 + 4 + 8)(1 + 3 + 9)(1 + 5) = 15 \cdot 13 \cdot 6 = 1170$$

**Why?** Expanding the product $(1 + 2 + 4 + 8)(1 + 3 + 9)(1 + 5)$ and
distributing gives **exactly one term per divisor of 360**.  The sum equals
the sum of all 24 divisors.

### Product of divisors

If $n$ has $\tau(n) = t$ divisors, pair each divisor $d$ with $n/d$.  Their
product is $n$.  All $t$ divisors group into $t/2$ pairs (or, when $t$ is
odd — possible only if $n$ is a perfect square — pair everything except
$\sqrt{n}$ which pairs with itself).

$$\prod_{d \mid n} d = n^{\tau(n) / 2}$$

(Valid even when $\tau(n)$ is odd, interpreting $n^{\tau/2}$ as
$\sqrt{n^{\tau(n)}}$.)

**Pen & paper:** $\prod_{d \mid 360} d = 360^{24/2} = 360^{12}$.

### These are multiplicative functions

A function $f$ is **multiplicative** if $f(mn) = f(m) f(n)$ whenever
$\gcd(m, n) = 1$.

$\tau$ and $\sigma$ are both multiplicative.  This is why the formulas split
across primes — each prime's contribution is independent.  Multiplicativity
is the bridge to advanced number theory (Möbius inversion, Dirichlet series).

### Special values

| $n$ | type | $\tau(n)$ | $\sigma(n)$ |
|---|---|---|---|
| 1 | unit | 1 | 1 |
| $p$ (prime) | prime | 2 | $p + 1$ |
| $p^2$ | prime square | 3 | $1 + p + p^2$ |
| $pq$ (distinct primes) | semiprime | 4 | $(p+1)(q+1)$ |
| $p^k$ (prime power) | — | $k + 1$ | $\frac{p^{k+1} - 1}{p - 1}$ |

### Perfect numbers (a beautiful aside)

A number $n$ is **perfect** if $\sigma(n) - n = n$, equivalently $\sigma(n) = 2n$.
The smallest are 6, 28, 496, 8128.

Euclid proved: if $2^p - 1$ is prime (a **Mersenne prime**), then $n = 2^{p-1}(2^p - 1)$ is perfect.

Euler proved the converse for **even** perfect numbers: every even perfect
number has this form.  Whether any **odd** perfect number exists is a famous
open problem (none has been found below $10^{1500}$).

**Pen & paper:** $p = 2$: $2^2 - 1 = 3$ prime, so $n = 2^1 \cdot 3 = 6$.
$\sigma(6) = 1 + 2 + 3 + 6 = 12 = 2 \cdot 6$. ✓

### How $\tau(n)$ behaves on average

Despite jumping wildly (highly composite numbers like 720 have many divisors;
primes have just 2), the **average** value of $\tau(n)$ for $n \le N$ is
$\sim \ln N$.  Dirichlet showed:

$$\sum_{n \le N} \tau(n) = N \ln N + (2\gamma - 1) N + O(\sqrt{N})$$

(where $\gamma$ is the Euler–Mascheroni constant ≈ 0.5772).

## Python Verification

```python
# ── tau(n), sigma(n), product of divisors ──────────────────
from math import prod
from functools import reduce

def factorise(n):
    factors = {}
    p = 2
    while p * p <= n:
        while n % p == 0:
            factors[p] = factors.get(p, 0) + 1
            n //= p
        p += 1
    if n > 1:
        factors[n] = factors.get(n, 0) + 1
    return factors

def tau(n):
    return prod(a + 1 for a in factorise(n).values())

def sigma(n):
    return prod((p**(a+1) - 1) // (p - 1) for p, a in factorise(n).items())

def divisors(n):
    return [d for d in range(1, n+1) if n % d == 0]

print("=== Verifying for n = 360 ===")
n = 360
divs = divisors(n)
print(f"factorisation: {factorise(n)}")
print(f"tau(n)   = {tau(n)}, divisors counted: {len(divs)}",
      "✓" if tau(n) == len(divs) else "✗")
print(f"sigma(n) = {sigma(n)}, divisors summed: {sum(divs)}",
      "✓" if sigma(n) == sum(divs) else "✗")

# Product of divisors = n^(tau(n)/2) but might be huge — verify via logarithms
import math
log_prod_direct = sum(math.log(d) for d in divs)
log_prod_formula = (tau(n) / 2) * math.log(n)
print(f"log(product): direct={log_prod_direct:.6f}, "
      f"formula (tau/2)*log(n)={log_prod_formula:.6f}",
      "✓" if abs(log_prod_direct - log_prod_formula) < 1e-9 else "✗")

print("\n=== Highly composite numbers (champions of tau) ===")
champion_tau = 0
for k in range(1, 5001):
    t = tau(k)
    if t > champion_tau:
        champion_tau = t
        print(f"  n = {k:>4}, tau = {t:>2}, factorisation: {factorise(k)}")

print("\n=== Perfect numbers up to 10000 ===")
for k in range(2, 10001):
    if sigma(k) == 2 * k:
        print(f"  {k} is perfect (sigma = {sigma(k)})")
```

## Visualisation — sigma, tau, perfect numbers, and the average behaviour

```python
# ── Plot tau(n), sigma(n)/n, and the running average of tau ─
import matplotlib.pyplot as plt
import numpy as np
from math import log

def factorise_fast(n):
    f = {}
    p = 2
    while p * p <= n:
        while n % p == 0:
            f[p] = f.get(p, 0) + 1
            n //= p
        p += 1
    if n > 1: f[n] = f.get(n, 0) + 1
    return f

def tau_fast(n):
    f = factorise_fast(n)
    out = 1
    for a in f.values(): out *= (a + 1)
    return out

def sigma_fast(n):
    f = factorise_fast(n)
    out = 1
    for p, a in f.items(): out *= (p**(a+1) - 1) // (p - 1)
    return out

N = 500
ns = np.arange(1, N + 1)
taus = np.array([tau_fast(n) for n in ns])
sigmas = np.array([sigma_fast(n) for n in ns])
abundancy = sigmas / ns           # sigma(n)/n: > 2 = abundant, = 2 = perfect

fig, axes = plt.subplots(2, 1, figsize=(13, 8))

ax = axes[0]
ax.plot(ns, taus, "o", ms=2, color="tab:blue", alpha=0.6, label="τ(n)")
running_avg = np.cumsum(taus) / ns
ax.plot(ns, running_avg, "-", color="tab:red", lw=2, label="running average")
ax.plot(ns, np.log(ns), "--", color="black", lw=1.5,
        label="ln n (Dirichlet asymptotic)")
ax.set_xlabel("n"); ax.set_ylabel("τ(n)")
ax.set_title("Number of divisors τ(n): jumpy, but averages to ~ ln n")
ax.legend(); ax.grid(alpha=0.3)

ax = axes[1]
ax.plot(ns, abundancy, "o", ms=2, color="tab:purple", alpha=0.6, label="σ(n)/n")
ax.axhline(2, color="red", linestyle="--", label="perfect (σ/n = 2)")
ax.axhline(1, color="green", linestyle="--", label="1 (deficient if below)")
# Highlight perfect numbers
perfects = [n for n in ns if sigmas[n-1] == 2*n]
ax.plot(perfects, [2]*len(perfects), "r*", ms=15, label=f"perfects: {perfects}")
ax.set_xlabel("n"); ax.set_ylabel("σ(n) / n")
ax.set_title("Abundancy σ(n)/n: deficient, perfect, abundant")
ax.legend(); ax.grid(alpha=0.3)

plt.tight_layout()
plt.show()
```

## Connection to CS / Games / AI / Business / Industry

- **CS / Algorithms** — counting divisors is a hot topic in Project-Euler-style
  problems; the prime-factorisation reduction is the standard "factor once,
  answer many queries" idiom.
- **CS / Cryptography** — RSA security relies on the difficulty of computing
  $\tau(n)$ for $n = pq$ (since $\tau(n) = 4$ trivially reveals the factor
  structure once you know $\sigma(n)$); $\sigma$ and $\tau$ appear in factoring
  attacks like Fermat's method.
- **AI / ML** — feature hashing for large vocabularies sometimes uses
  divisor structure to balance bucket sizes; integer-programming for
  scheduling depends on divisibility relationships.
- **Music theory** — the most "consonant" rhythmic and harmonic intervals
  arise from the divisors of small integers (octave = ratio 2:1, fifth = 3:2,
  and so on); $\tau$ and $\sigma$ predict tuning systems' regularity.
- **Engineering / Manufacturing** — gear-ratio design picks numerator and
  denominator with rich divisor structure to allow many configurations from
  one design; clock-divider chains in digital electronics likewise.
- **Finance** — calendar-date arithmetic for amortisation, day-count
  conventions, and "round to nearest fortnight" all rely on divisibility
  structure of 365, 366, 12, 52.

## Check Your Understanding

1. **Pen & paper:** Find the prime factorisation of 540 and compute $\tau(540)$
   and $\sigma(540)$.
2. **Pen & paper:** What is the smallest $n$ with $\tau(n) = 12$?  Hint: among
   $(a_1 + 1)(a_2 + 1) \cdots = 12$ partitions, $12 = 12, 6 \cdot 2, 4 \cdot 3,
   3 \cdot 2 \cdot 2$; pick the one giving smallest $n$.
3. **Pen & paper:** Verify Euclid–Euler: $p = 5$, $2^5 - 1 = 31$ (prime), so
   $n = 2^4 \cdot 31 = 496$ is perfect.  Compute $\sigma(496)$.
4. **Pen & paper:** Show that $\tau(n)$ is **odd** if and only if $n$ is a
   perfect square.  Hint: pair each divisor $d$ with $n/d$.
5. **Coding:** Find all $n \le 1000$ such that $\sigma(n) > 2n$ (called
   **abundant** numbers).  How dense are they?  (You should see they are
   surprisingly common.)
