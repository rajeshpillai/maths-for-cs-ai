# Prime Numbers, GCD, and LCM — The Euclidean Algorithm

## Intuition

Prime numbers are the "atoms" of arithmetic — every integer is built from
them, just like every molecule is built from atoms.  The GCD (greatest common
divisor) tells you the biggest "building block" two numbers share.  The
Euclidean algorithm finds it in a handful of pen-and-paper steps, and it's
over 2,300 years old — one of the oldest algorithms still in daily use.

## Prerequisites

- Tier 0, Lesson 1: Number Systems (integers)
- Tier 0, Lesson 4: Modular Arithmetic (the mod operation)

## From First Principles

### Prime numbers

A natural number $p > 1$ is **prime** if its only divisors are 1 and itself.

First few primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, ...

> **2 is the only even prime.** Every other even number is divisible by 2.

### The Fundamental Theorem of Arithmetic

Every integer $n > 1$ can be written as a product of primes in exactly one
way (up to ordering):

$$60 = 2^2 \times 3 \times 5$$
$$84 = 2^2 \times 3 \times 7$$

**Pen & paper: Prime factorisation of 360**

Divide by the smallest prime that works, repeatedly:

| Step | Value | Divisor |
|------|-------|---------|
| 360 ÷ 2 | 180 | 2 |
| 180 ÷ 2 | 90 | 2 |
| 90 ÷ 2 | 45 | 2 |
| 45 ÷ 3 | 15 | 3 |
| 15 ÷ 3 | 5 | 3 |
| 5 ÷ 5 | 1 | 5 |

$$360 = 2^3 \times 3^2 \times 5$$

### Testing if a number is prime (pen & paper)

To check if $n$ is prime, you only need to test divisors up to $\sqrt{n}$.

**Why?** If $n = a \times b$ and both $a, b > \sqrt{n}$, then $a \times b > n$.
So at least one factor must be $\le \sqrt{n}$.

**Pen & paper: Is 97 prime?**

$\sqrt{97} \approx 9.8$, so test 2, 3, 5, 7:
- 97 ÷ 2 = 48.5 ✗
- 97 ÷ 3 = 32.33... ✗
- 97 ÷ 5 = 19.4 ✗
- 97 ÷ 7 = 13.86... ✗

None divide evenly → **97 is prime**.

### Sieve of Eratosthenes (pen & paper)

Find all primes up to $N$:

1. Write numbers 2 to $N$
2. Circle 2 (prime). Cross out all multiples of 2
3. Circle the next uncrossed number (3). Cross out its multiples
4. Repeat until you pass $\sqrt{N}$
5. All uncircled remaining numbers are prime

**Pen & paper: Primes up to 30**

```
 2  3 [4] 5 [6] 7 [8] [9] [10]
11 [12] 13 [14] [15] [16] 17 [18] 19 [20]
[21] [22] 23 [24] [25] [26] [27] [28] 29 [30]
```

Primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29

### Greatest Common Divisor (GCD)

The GCD of two integers is the largest number that divides both.

**Method 1: Prime factorisation**

$$\gcd(60, 84)$$

$60 = 2^2 \times 3 \times 5$
$84 = 2^2 \times 3 \times 7$

Take the **minimum power** of each shared prime:
$$\gcd(60, 84) = 2^2 \times 3 = 12$$

This works but is slow for large numbers (factorisation is hard).

### The Euclidean Algorithm

**Key insight:** $\gcd(a, b) = \gcd(b, a \mod b)$

**Why?** If $d$ divides both $a$ and $b$, then $d$ also divides $a - qb$
(which is $a \mod b$).  So the GCD doesn't change when you replace $a$ with
$a \mod b$.

**Pen & paper: $\gcd(252, 105)$**

| Step | $a$ | $b$ | $a \mod b$ |
|------|-----|-----|------------|
| 1 | 252 | 105 | 252 - 2×105 = 42 |
| 2 | 105 | 42 | 105 - 2×42 = 21 |
| 3 | 42 | 21 | 42 - 2×21 = 0 |

When remainder = 0, the GCD is the last non-zero remainder: **$\gcd(252, 105) = 21$**

**Verify:** $252 = 2^2 \times 3^2 \times 7$, $105 = 3 \times 5 \times 7$
→ shared: $3 \times 7 = 21$ ✓

**Pen & paper: $\gcd(1071, 462)$**

| $a$ | $b$ | $a \mod b$ |
|-----|-----|------------|
| 1071 | 462 | 1071 - 2×462 = 147 |
| 462 | 147 | 462 - 3×147 = 21 |
| 147 | 21 | 147 - 7×21 = 0 |

$\gcd(1071, 462) = 21$

### Least Common Multiple (LCM)

The LCM is the smallest number divisible by both $a$ and $b$.

**The formula (derived from GCD):**

$$\text{lcm}(a, b) = \frac{|a \times b|}{\gcd(a, b)}$$

**Why?** From prime factorisations, LCM takes the **maximum power** of each
prime.  The product $a \times b$ counts shared primes twice; dividing by
the GCD corrects for this.

**Pen & paper: $\text{lcm}(12, 18)$**

$\gcd(12, 18)$: $18 = 1 \times 12 + 6$, $12 = 2 \times 6 + 0$ → GCD = 6

$$\text{lcm}(12, 18) = \frac{12 \times 18}{6} = \frac{216}{6} = 36$$

**Verify:** $36 = 12 \times 3 = 18 \times 2$ ✓

### Extended Euclidean Algorithm (for modular inverse)

Not only finds $\gcd(a, b)$, but also integers $x, y$ such that:

$$ax + by = \gcd(a, b)$$

This is called **Bézout's identity**.

**Pen & paper: Find $x, y$ such that $252x + 105y = 21$**

Work backwards from our Euclidean algorithm steps:

$21 = 105 - 2 \times 42$
$42 = 252 - 2 \times 105$

Substitute:
$21 = 105 - 2 \times (252 - 2 \times 105)$
$21 = 105 - 2 \times 252 + 4 \times 105$
$21 = 5 \times 105 + (-2) \times 252$

So $x = -2, y = 5$: $252 \times (-2) + 105 \times 5 = -504 + 525 = 21$ ✓

> This is exactly how modular inverses are computed in cryptography.

## Python Verification

```python
# ── Primes, GCD, LCM: verifying pen & paper work ───────────
import math

# Prime factorisation (by hand algorithm in code)
print("=== Prime factorisation of 360 ===")
n = 360
factors = {}
d = 2
temp = n
while d * d <= temp:
    while temp % d == 0:
        factors[d] = factors.get(d, 0) + 1
        temp //= d
    d += 1
if temp > 1:
    factors[temp] = factors.get(temp, 0) + 1
print(f"{n} = {' x '.join(f'{p}^{e}' for p, e in sorted(factors.items()))}")

# Primality test
print("\n=== Is 97 prime? ===")
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True
print(f"97 is prime: {is_prime(97)}")

# Sieve of Eratosthenes
print("\n=== Primes up to 30 (Sieve) ===")
def sieve(limit):
    is_p = [True] * (limit + 1)
    is_p[0] = is_p[1] = False
    for i in range(2, int(limit**0.5) + 1):
        if is_p[i]:
            for j in range(i*i, limit + 1, i):
                is_p[j] = False
    return [i for i in range(2, limit + 1) if is_p[i]]
print(sieve(30))

# Euclidean algorithm (step by step)
print("\n=== GCD(252, 105) step by step ===")
a, b = 252, 105
while b != 0:
    print(f"gcd({a}, {b}) → {a} mod {b} = {a % b}")
    a, b = b, a % b
print(f"GCD = {a}")

# Verify with math.gcd
print(f"math.gcd(252, 105) = {math.gcd(252, 105)}")

# LCM
print("\n=== LCM(12, 18) ===")
g = math.gcd(12, 18)
lcm = 12 * 18 // g
print(f"gcd(12, 18) = {g}")
print(f"lcm(12, 18) = {lcm}")

# Extended Euclidean (Bézout's identity)
print("\n=== Extended Euclidean: 252x + 105y = gcd ===")
def extended_gcd(a, b):
    if b == 0:
        return a, 1, 0
    g, x, y = extended_gcd(b, a % b)
    return g, y, x - (a // b) * y

g, x, y = extended_gcd(252, 105)
print(f"gcd = {g}, x = {x}, y = {y}")
print(f"Verify: 252*{x} + 105*{y} = {252*x + 105*y}")
```

## Visualisation — Primes, sieve, and the prime-counting function

Three views of the prime numbers: the **Sieve of Eratosthenes** in
action (composite numbers crossed out), the **distribution of primes**
(Ulam spiral hint and prime gaps), and the famous π(n) curve compared
with the **Prime Number Theorem**'s estimate $n / \ln n$.

```python
# ── Visualising primes and the sieve ────────────────────────
import numpy as np
import matplotlib.pyplot as plt

def sieve(n):
    is_prime = np.ones(n + 1, dtype=bool)
    is_prime[:2] = False
    for p in range(2, int(np.sqrt(n)) + 1):
        if is_prime[p]:
            is_prime[p*p::p] = False
    return is_prime

N = 100
prime_mask = sieve(N)

fig, axes = plt.subplots(1, 3, figsize=(16, 5.5))

# (1) Sieve of Eratosthenes drawn as a 10×10 grid; primes are coloured.
ax = axes[0]
grid = np.zeros((10, 10), dtype=int)
for n in range(1, N + 1):
    row, col = (n - 1) // 10, (n - 1) % 10
    grid[row, col] = 1 if prime_mask[n] else 0
ax.imshow(grid, cmap="Greens", aspect="equal", vmin=0, vmax=1)
for n in range(1, N + 1):
    row, col = (n - 1) // 10, (n - 1) % 10
    color = "white" if prime_mask[n] else "grey"
    weight = "bold" if prime_mask[n] else "normal"
    ax.text(col, row, str(n), ha="center", va="center",
            color=color, fontsize=10, fontweight=weight)
ax.set_title(f"Primes up to {N}\n({prime_mask.sum()} primes, marked green)")
ax.set_xticks([]); ax.set_yticks([])

# (2) Gaps between consecutive primes.
primes = np.where(prime_mask)[0]
gaps = np.diff(primes)
ax = axes[1]
ax.plot(primes[1:], gaps, "o-", markersize=3, color="tab:purple", lw=0.8)
ax.set_xlabel("prime p")
ax.set_ylabel("gap to next prime")
ax.set_title(f"Prime gaps grow on average ~ ln(p)\n"
             f"(largest gap ≤ {N}: {gaps.max()})")
ax.grid(True, alpha=0.3)

# (3) Prime-counting function π(n) vs the PNT estimate n / ln n.
ax = axes[2]
big_N = 5000
big_mask = sieve(big_N)
pi_n = np.cumsum(big_mask)
ns_pnt = np.arange(2, big_N + 1)
estimate = ns_pnt / np.log(ns_pnt)
ax.plot(ns_pnt, pi_n[2:],     color="tab:blue",   lw=2, label="π(n) — exact")
ax.plot(ns_pnt, estimate, color="tab:red",    lw=2, linestyle="--",
        label="$n / \\ln n$ — PNT estimate")
ax.set_xlabel("n"); ax.set_ylabel("count of primes ≤ n")
ax.set_title("Prime Number Theorem:  π(n) ~ n / ln n")
ax.legend(); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Print Euclidean GCD trace and the prime count.
print(f"Number of primes up to {N}: {prime_mask.sum()}")
print(f"Number of primes up to 5000: {sieve(5000).sum()}    "
      f"(PNT estimate: {int(5000/np.log(5000))})")
print()
print("Euclidean algorithm gcd(252, 105):")
a, b = 252, 105
while b:
    print(f"  {a} mod {b} = {a % b}")
    a, b = b, a % b
print(f"  gcd = {a}")
```

**Three foundational facts about primes:**

- **The sieve is the simplest fast prime test.** Mark multiples of
  each found prime as composite; what's left is the primes. $O(n
  \log \log n)$ operations — fast enough for $n$ up to billions on a
  laptop. Modern variants (segmented sieve, wheel sieves) extend to
  trillions.
- **Primes are *predictably unpredictable*.** Individual gaps are
  irregular, but the *average* gap near $n$ is approximately $\ln n$
  — slow logarithmic growth. The Prime Number Theorem
  $\pi(n) \sim n / \ln n$ is the precise statement: roughly
  $1 / \ln n$ of integers near $n$ are prime.
- **Primes underpin cryptography.** RSA security rests on "it's easy
  to multiply two large primes, hard to factor their product".
  Diffie-Hellman uses *generators* in the multiplicative group of a
  prime field. **Without primes, modern internet security collapses**.

## Connection to CS / Games / AI

- **RSA cryptography** — relies on the fact that factoring large numbers is hard, but GCD is fast
- **Hash tables** — table sizes are often prime to reduce collision clustering
- **Sieve algorithms** — used in competitive programming and number theory libraries
- **Reducing fractions** — GCD simplifies rationals (Python's `fractions` module uses this)
- **LCM in scheduling** — "when do two periodic events next coincide?" = LCM of their periods
- **Random number quality** — LCG parameters need $\gcd(a, m) = 1$ for full-period generators

## Check Your Understanding

1. **Pen & paper:** Find $\gcd(462, 1071)$ using the Euclidean algorithm. Show all steps.
2. **Pen & paper:** Find $\text{lcm}(15, 20)$ using the GCD formula.
3. **Pen & paper:** Is 143 prime? (Hint: $\sqrt{143} \approx 11.9$)
4. **Pen & paper:** Use the Extended Euclidean Algorithm to find $x, y$ such that $35x + 15y = \gcd(35, 15)$.
5. **Think about it:** Why is the Euclidean algorithm so much faster than trial division for finding GCD of large numbers?
