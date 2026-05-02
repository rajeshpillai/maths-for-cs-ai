# Multiplicative Order — Power Cycles, Repeating Decimals, Trailing Zeros

## Intuition

Why does $1/7 = 0.\overline{142857}$ have a 6-digit repeating block, but
$1/3 = 0.\overline{3}$ has only one?  Why does $7^k \bmod 10$ cycle through
$7, 9, 3, 1, 7, 9, 3, 1, \ldots$?  And how many trailing zeros does $100!$
end with?  All three questions reduce to one core notion: the
**multiplicative order** of a number modulo another.

## Prerequisites

- Tier 0, Lesson 4: Modular arithmetic (mod, congruence)
- Tier 0, Lesson 5: Primes, GCD/LCM
- Tier 13, Lesson 3: Fermat's Little Theorem and Euler's Totient

## From First Principles

### Definition

For $a$ coprime to $n$, the **multiplicative order** of $a$ modulo $n$,
denoted $\text{ord}_n(a)$, is the smallest positive integer $k$ such that

$$a^k \equiv 1 \pmod{n}$$

By Fermat / Euler, $\text{ord}_n(a)$ always divides $\varphi(n)$.

**Pen & paper:** $\text{ord}_7(2)$.

$2^1 = 2$, $2^2 = 4$, $2^3 = 8 \equiv 1 \pmod 7$. So $\text{ord}_7(2) = 3$.
And indeed $3 \mid \varphi(7) = 6$. ✓

### Cycling of remainders

Once you know $\text{ord}_n(a) = k$, you know $a^j \bmod n$ depends only on
$j \bmod k$ — the powers of $a$ modulo $n$ cycle with period $k$.

**Pen & paper:** $7^{100} \bmod 10$.

$\text{ord}_{10}(7)$: $7^1 = 7$, $7^2 = 49 \equiv 9$, $7^3 = 343 \equiv 3$,
$7^4 \equiv 1 \pmod{10}$.  So order is 4.

$100 = 4 \cdot 25$, so $7^{100} \equiv 7^0 \equiv 1 \pmod{10}$.

This is how we compute the **last digit of an enormous number**.

### Power towers — work from the top down

Compute $3^{3^{3}} \bmod 100$.

The exponent is $3^3 = 27$.  We need $3^{27} \bmod 100$.

$\varphi(100) = 40$.  $\text{ord}_{100}(3)$ divides 40 — by direct computation,
$\text{ord}_{100}(3) = 20$ (you'd verify: $3^{20} \equiv 1 \pmod{100}$).

So $3^{27} \equiv 3^{27 \bmod 20} = 3^7 = 2187 \equiv 87 \pmod{100}$.

For taller towers, **iterate from the top down**, using $\varphi$ at each level
(this is the **Lifting the Exponent / tower mod** trick — beyond this lesson,
but worth knowing it exists).

### Repeating decimal periods

For an integer $n$ coprime to 10, the decimal expansion of $1/n$ has period
exactly $\text{ord}_n(10)$.

**Why?**  $1/n = 0.d_1 d_2 d_3 \ldots$ means $10/n = d_1 + r_1/n$, where $r_1 = 10 \bmod n$.
Then $10 r_1 / n = d_2 + r_2/n$ with $r_2 = 100 \bmod n$, etc.  The remainder
sequence is $1, 10, 10^2, 10^3, \ldots \bmod n$.  The decimal repeats once a
remainder repeats — first repetition is at the smallest $k$ with $10^k \equiv 1 \pmod n$.

**Pen & paper:** $1/7$.

$\text{ord}_7(10)$: $10 \equiv 3$, $10^2 \equiv 2$, $10^3 \equiv 6$,
$10^4 \equiv 4$, $10^5 \equiv 5$, $10^6 \equiv 1 \pmod 7$.  Period 6.

So $1/7$ has a 6-digit repeating block: $0.\overline{142857}$. ✓

**Pen & paper:** $1/13$.

$\text{ord}_{13}(10)$: by computation, $10^6 \equiv 1 \pmod{13}$ (and no smaller
$k$).  So $1/13 = 0.\overline{076923}$ has period 6.

**Special case — $n = 2^a 5^b$.**  These divide some power of 10, so $1/n$
**terminates** (period 0).  Mixed cases like $n = 6 = 2 \cdot 3$ give a
**pre-period** (from the $2^a 5^b$ part) followed by a repeating block (from
the coprime part).

**Pen & paper:** $1/6 = 0.1\overline{6}$.  Pre-period of length 1
(from the factor 2), repeating block of length $\text{ord}_3(10) = 1$.

### Full-reptend primes

A prime $p$ where $\text{ord}_p(10) = p - 1$ (the maximum) gives a $1/p$
expansion using **all $p - 1$ non-zero digits in some order**.

The smallest are $p = 7, 17, 19, 23, 29, 47, 59, \ldots$.  These are called
**full-reptend primes** (in base 10).  $1/7$ is the canonical example —
$142857$ contains digits 1, 2, 4, 5, 7, 8 in a cyclic pattern that has
many curious properties (e.g., $142857 \times 2 = 285714$, a cyclic shift).

### Legendre's formula — trailing zeros in $n!$

This isn't directly about order, but it's the same family — the **$p$-adic
valuation** $v_p(n!)$ counts how many times the prime $p$ divides $n!$.

$$v_p(n!) = \sum_{j=1}^{\infty} \left\lfloor \frac{n}{p^j} \right\rfloor$$

**Why?**  Each multiple of $p$ in $\{1, \ldots, n\}$ contributes one factor
of $p$; each multiple of $p^2$ contributes one **extra** $p$ on top of that;
etc.

**Pen & paper:** Trailing zeros in $100!$.

A trailing zero is a factor of 10 = 2 × 5.  $v_5(100!)$ is the bottleneck
(2's are far more abundant).

$$v_5(100!) = \lfloor 100/5 \rfloor + \lfloor 100/25 \rfloor + \lfloor 100/125 \rfloor = 20 + 4 + 0 = 24$$

So $100!$ ends with **24 zeros**.

**Pen & paper:** Trailing zeros in $1000!$ — $200 + 40 + 8 + 1 = 249$.

### The connection — why one lesson?

All four problems (cycling, decimals, towers, trailing zeros) hinge on
prime-power structure modulo $n$.  Master multiplicative order and you'll
solve them all by the same toolkit: factor $n$, compute orders or valuations
prime by prime, and reassemble.

## Python Verification

```python
# ── Multiplicative order, decimal periods, Legendre ─────────
from math import gcd, factorial

def mult_order(a, n):
    """Smallest k > 0 with a^k ≡ 1 (mod n). Requires gcd(a, n) = 1."""
    assert gcd(a, n) == 1
    k = 1
    p = a % n
    while p != 1:
        p = (p * a) % n
        k += 1
    return k

print("=== Orders modulo 10 ===")
for a in [3, 7, 9]:
    print(f"  ord_10({a}) = {mult_order(a, 10)}")

print("\n=== Last digit of 7^100 ===")
print(f"7^100 mod 10 = {pow(7, 100, 10)}  (expected 1, since 100 mod 4 = 0)")

print("\n=== Decimal periods 1/n for n coprime to 10 ===")
for n in [3, 7, 11, 13, 17, 19, 21, 23, 27, 41]:
    if gcd(n, 10) == 1:
        period = mult_order(10, n)
        # Compute the repeating block
        block = ""
        r = 10 % n
        for _ in range(period):
            digit = (r * 10) // n
            block += str(digit)
            r = (r * 10) % n
        # Adjust: actually the standard form starts differently
        # Instead, do long division
        num, block = 1, ""
        seen = {}
        digits = []
        while num != 0:
            num *= 10
            d = num // n
            r = num % n
            if (d, r) in seen: break
            seen[(d, r)] = len(digits)
            digits.append(str(d))
            num = r
            if len(digits) > period * 2: break
        # Find period in digits
        rep = "".join(digits[:period])
        print(f"  1/{n:>3}: period {period:>2}, block = {rep}")

print("\n=== Power towers ===")
# 3^(3^3) mod 100
exp = 3**3   # = 27
result = pow(3, exp, 100)
print(f"3^(3^3) mod 100 = 3^{exp} mod 100 = {result}")

# Big example: last two digits of 7^(7^7)
phi100 = 40   # phi(100)
# 7^7 mod 40 first
inner = pow(7, 7, phi100)
print(f"7^7 mod phi(100) = 7^7 mod 40 = {inner}")
print(f"7^(7^7) mod 100 = 7^{inner} mod 100 = {pow(7, inner, 100)}")

print("\n=== Trailing zeros via Legendre's formula ===")
def trailing_zeros(n):
    """Number of trailing zeros in n! via v_5(n!)."""
    count = 0
    p = 5
    while p <= n:
        count += n // p
        p *= 5
    return count

for n in [10, 25, 100, 1000, 10000]:
    formula = trailing_zeros(n)
    if n <= 1000:
        actual = str(factorial(n)).count("0") - str(factorial(n)).rstrip("0").count("0")
    else:
        actual = "(too big)"
    print(f"  {n}!: Legendre = {formula:>5}, actual trailing zeros = {actual}")
```

## Visualisation — period of $1/n$ as a function of $n$

```python
# ── Plot decimal-expansion period of 1/n for n coprime to 10 ─
import matplotlib.pyplot as plt
from math import gcd

def period(n):
    if gcd(n, 10) != 1: return None
    k, p = 1, 10 % n
    while p != 1:
        p = (p * 10) % n
        k += 1
    return k

ns = list(range(2, 200))
periods = [period(n) for n in ns]
xs = [n for n, p in zip(ns, periods) if p is not None]
ys = [p for p in periods if p is not None]

fig, ax = plt.subplots(figsize=(13, 6))
ax.scatter(xs, ys, s=20, color="tab:blue", alpha=0.7)

# Highlight full-reptend primes (where period = n - 1)
full = [n for n, p in zip(xs, ys) if p == n - 1]
for n in full:
    ax.scatter(n, n - 1, color="tab:red", s=80, zorder=5)
ax.plot([n for n in xs], [n - 1 for n in xs], "k--", lw=0.5, alpha=0.5,
        label="upper bound n-1 (full-reptend primes)")
ax.set_xlabel("n"); ax.set_ylabel("period of 1/n")
ax.set_title(f"Decimal period of 1/n = ord_n(10) for gcd(n,10)=1\n"
             f"Red dots = full-reptend primes: {full[:10]}...")
ax.legend(); ax.grid(alpha=0.3)
plt.tight_layout()
plt.show()
```

## Connection to CS / Games / AI / Business / Industry

- **CS / Cryptography** — Diffie–Hellman key exchange relies on the difficulty
  of computing **discrete logarithms** in groups of large multiplicative
  order; the security of ECDSA, ElGamal, and many lattice-free schemes
  depends on the order of a generator.
- **CS / Random number generation** — linear congruential generators
  $x_{n+1} = (a x_n + c) \bmod m$ have full period iff $a - 1$ has the right
  multiplicative-order properties relative to $m$ (Hull-Dobell theorem).
- **CS / Algorithms** — fast modular exponentiation `pow(a, b, n)` is the
  basis of every cycle/period detection algorithm; Pollard's $\rho$ for
  factoring uses cycle detection in iterated functions.
- **AI / ML** — pseudorandom feature hashing in Bloom filters and count-min
  sketches, RNG quality in Monte Carlo / MCMC algorithms — all depend on
  understanding multiplicative orders modulo prime moduli.
- **Telecom** — frequency-hopping spread-spectrum (Bluetooth, GPS, military
  radio) uses sequences whose period is governed by multiplicative orders;
  Gold codes in CDMA exploit pairs of maximal-length sequences.
- **Pure maths / hobby** — Cyclic-number aficionados love $142857$;
  cryptographic puzzles in CTFs frequently hide flags using last-digit-of-
  big-power tricks.

## Check Your Understanding

1. **Pen & paper:** Find $\text{ord}_{11}(2)$ by direct calculation.  Verify
   it divides $\varphi(11) = 10$.
2. **Pen & paper:** What is the last digit of $9^{2025}$?
3. **Pen & paper:** What is the period of the decimal expansion of $1/17$?
   Compute the repeating block by long division.
4. **Pen & paper:** How many trailing zeros does $50!$ have?  And $500!$?
5. **Pen & paper:** Compute $3^{(3^3)} \bmod 1000$, working top-down with
   $\varphi(1000) = 400$.
