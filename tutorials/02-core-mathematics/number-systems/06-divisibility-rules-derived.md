# Divisibility Rules — Derived, Not Memorised

## Intuition

Everyone learns "a number is divisible by 9 iff its digit sum is divisible by
9".  Few learn **why**.  Once you do, you can derive a divisibility rule for
**any** divisor on the spot — and you stop fearing the obscure ones (7, 11,
13, …).  The single magical fact behind every rule is what $10^k$ leaves as
its remainder modulo $d$.

## Prerequisites

- Tier 0, Lesson 4: Modular arithmetic (congruence, mod operation)
- Tier 0, Lesson 5: Primes, GCD/LCM (prime factorisation)

## From First Principles

### The framework

Write a number $N$ in base 10:

$$N = a_k \cdot 10^k + a_{k-1} \cdot 10^{k-1} + \cdots + a_1 \cdot 10 + a_0$$

To test divisibility by $d$, take this equation **modulo $d$**:

$$N \equiv a_k \cdot 10^k + a_{k-1} \cdot 10^{k-1} + \cdots + a_0 \pmod{d}$$

The whole game is: **find $10^j \bmod d$** for each $j$, then add up the
weighted digits.  The cleaner the pattern of $10^j \bmod d$, the cleaner the rule.

### Divisibility by 2 and 5

$$10 \equiv 0 \pmod{2} \qquad 10 \equiv 0 \pmod{5}$$

So every $10^j$ for $j \ge 1$ is $\equiv 0$.  Only the units digit $a_0$
matters:

$$N \equiv a_0 \pmod{2}, \qquad N \equiv a_0 \pmod{5}$$

**Rule.** Divisible by 2 iff $a_0 \in \{0, 2, 4, 6, 8\}$; by 5 iff $a_0 \in \{0, 5\}$.

### Divisibility by 4 and 8 (and powers of 2)

$10^2 = 100 \equiv 0 \pmod{4}$ and $10^3 = 1000 \equiv 0 \pmod{8}$.  So:

- For $4$: only the **last two** digits matter.  $N \bmod 4 = (10 a_1 + a_0) \bmod 4$.
- For $8$: only the **last three** digits matter.

**Pen & paper:** Is 12,316 divisible by 4?  Last two digits: 16, and $16/4 = 4$.
Yes. ✓

### Divisibility by 3 and 9

$10 \equiv 1 \pmod 3$ and $10 \equiv 1 \pmod 9$.  So $10^j \equiv 1$ for **every** $j$:

$$N \equiv a_k + a_{k-1} + \cdots + a_0 \pmod{3 \text{ or } 9}$$

**Rule.** Divisible by 3 (or 9) iff the digit sum is divisible by 3 (or 9).

**Pen & paper:** $N = 8721$. Digit sum: $8 + 7 + 2 + 1 = 18$.  $18 / 9 = 2$. ✓

### Divisibility by 11

$10 \equiv -1 \pmod{11}$, so $10^j \equiv (-1)^j$:

$$N \equiv a_0 - a_1 + a_2 - a_3 + \cdots \pmod{11}$$

**Rule.** Divisible by 11 iff the **alternating digit sum** (starting from
the units digit) is divisible by 11.

**Pen & paper:** $N = 121$.  Alternating sum: $1 - 2 + 1 = 0$.  $0 \bmod 11 = 0$. ✓
($121 = 11^2$.)

$N = 528$.  Alternating sum: $8 - 2 + 5 = 11$.  $11 \bmod 11 = 0$. ✓
($528 = 11 \cdot 48$.)

### Divisibility by 99 and 1001

$10^2 \equiv 1 \pmod{99}$, so group the digits into **pairs from the right**
and sum the 2-digit groups:

$$N \equiv \overline{a_1 a_0} + \overline{a_3 a_2} + \overline{a_5 a_4} + \cdots \pmod{99}$$

**Pen & paper:** $N = 12{,}345$.  Group: $45 + 23 + 1 = 69$.  $69 \bmod 99 = 69 \ne 0$, so not divisible by 99.

Similarly $10^3 \equiv -1 \pmod{1001}$ (since $1001 = 7 \cdot 11 \cdot 13$),
so group into **triples from the right** and **alternate**:

$$N \equiv \overline{a_2 a_1 a_0} - \overline{a_5 a_4 a_3} + \overline{a_8 a_7 a_6} - \cdots \pmod{1001}$$

This single rule simultaneously tests divisibility by **7, 11, and 13**!

**Pen & paper:** $N = 1{,}234{,}567$.  Triples: $567 - 234 + 1 = 334$.
$334 = 2 \cdot 167$ (167 is prime).  So 1,234,567 is not divisible by 7, 11,
or 13.

### Divisibility by 7 (the trickier one)

$10 \equiv 3 \pmod 7$, $10^2 \equiv 2$, $10^3 \equiv 6 \equiv -1$,
$10^4 \equiv -3$, $10^5 \equiv -2$, $10^6 \equiv 1$ (cycle of length 6).

Most school texts give the "double-and-subtract" rule: take last digit,
double it, subtract from the rest.  E.g. $N = 161$ → $16 - 2 \cdot 1 = 14$,
divisible by 7. ✓

**Why?** The trick is multiplying $N$ by 5: $N = 10 q + r$ where $r = a_0$,
$q$ = the number with last digit removed.  Then

$$5N = 50 q + 5 r \equiv q + 5 r \pmod 7$$

so $N \equiv 0 \pmod 7$ iff $q + 5 r \equiv 0$, equivalent to $q \equiv -5r \equiv 2r \pmod 7$.  The standard rule reverses the sign: $q - 2r$.

The cleaner approach in practice: use the **1001 rule** above — it tests 7, 11,
and 13 all at once.

### General principle (now you can derive any rule)

For any $d$:
1. Compute the cycle of $10^j \bmod d$ for $j = 0, 1, 2, \ldots$ until it repeats.
2. Multiply each digit $a_j$ by $10^j \bmod d$ and sum.
3. The number is divisible by $d$ iff that sum is $\equiv 0 \pmod d$.

For $d = 13$: $10^j \bmod 13$ runs $1, 10, 9, 12, 3, 4, 1, \ldots$ (cycle 6).
For $d = 17$: cycle of length 16 — just use long division.

## Python Verification

```python
# ── Divisibility rules: derive the cycle, then the rule ─────
def cycle_of_10(d):
    """Return [10^0 mod d, 10^1 mod d, ...] until it repeats."""
    seen = {}
    seq = []
    p = 1
    j = 0
    while p not in seen:
        seen[p] = j
        seq.append(p)
        p = (p * 10) % d
        j += 1
    return seq

print("=== 10^j mod d (the soul of every divisibility rule) ===")
for d in [2, 3, 4, 5, 7, 8, 9, 11, 13, 17, 99, 1001]:
    print(f"  d = {d:>4}: {cycle_of_10(d)}")

# General divisibility test using the cycle
def divides(d, N):
    """Test divisibility of N by d using the digit-cycle rule."""
    cyc = cycle_of_10(d)
    digits = [int(c) for c in str(N)][::-1]  # least significant first
    weighted = sum(digits[j] * cyc[j % len(cyc)] for j in range(len(digits)))
    return weighted % d == 0

print("\n=== Sanity check ===")
for d, N in [(7, 161), (7, 1234567), (11, 121), (11, 528), (9, 8721),
             (1001, 1234567), (13, 169), (17, 289)]:
    print(f"  {N} divisible by {d}? rule says {divides(d, N)}, "
          f"truth: {N % d == 0}",
          "✓" if divides(d, N) == (N % d == 0) else "✗")

# 1001 rule: triples from the right, alternating sum
def rule_1001(N):
    s = str(N).zfill(((len(str(N)) + 2) // 3) * 3)
    triples = [int(s[max(0, i-3):i] or '0') for i in range(len(s), 0, -3)]
    alt = sum((-1)**i * triples[i] for i in range(len(triples)))
    return alt

print("\n=== 1001 rule on N = 1,234,567 ===")
alt = rule_1001(1234567)
print(f"alternating triple sum: {alt}")
print(f"1234567 mod 7  = {1234567 % 7},  alt mod 7  = {alt % 7}")
print(f"1234567 mod 11 = {1234567 % 11}, alt mod 11 = {alt % 11}")
print(f"1234567 mod 13 = {1234567 % 13}, alt mod 13 = {alt % 13}")
```

## Visualisation — the cycle of $10^j \bmod d$

```python
# ── How the divisibility rule pattern depends on d ──────────
import matplotlib.pyplot as plt
import numpy as np

ds = [2, 3, 7, 9, 11, 13, 17]
fig, axes = plt.subplots(len(ds), 1, figsize=(11, 9), sharex=True)

for ax, d in zip(axes, ds):
    cyc = []
    p = 1
    for j in range(20):
        cyc.append(p)
        p = (p * 10) % d
    js = np.arange(len(cyc))
    ax.stem(js, cyc, basefmt=" ")
    ax.set_ylabel(f"d = {d}")
    ax.set_yticks(range(d))
    ax.grid(True, alpha=0.3)
    # Find cycle length
    cycle_len = next((j for j in range(1, len(cyc)) if cyc[j] == 1), None)
    ax.set_title(f"10^j mod {d}  (cycle length {cycle_len})", fontsize=10, loc="left")

axes[-1].set_xlabel("j (digit position from the right)")
plt.suptitle("Cycle of 10^j mod d — the structure behind every divisibility rule",
             y=1.01)
plt.tight_layout()
plt.show()
```

## Connection to CS / Games / AI / Business / Industry

- **CS / Hashing** — Rabin–Karp string hashing computes
  $\sum a_j \cdot b^j \bmod p$ exactly like our digit-cycle test (with $b$ a
  base of choice); the divisibility-rule machinery is the discrete-log
  view of polynomial hashing.
- **CS / Checksums** — ISBN-10 uses a "weighted modulo 11" check; ISBN-13
  uses "weighted modulo 10" with weights $1, 3, 1, 3, \ldots$; the IBAN
  bank-account check rolls through a weighted modulo 97 — all direct
  applications of "$10^j \bmod d$" cycles.
- **CS / Cryptography** — Fermat's Little Theorem (in modular arithmetic
  lessons) gives the cycle length $\text{ord}_d(10)$ which controls the
  period of these rules; in turn, this is the period of the decimal
  expansion of $1/d$.
- **AI / ML** — feature-hashing and locality-sensitive hashing rely on
  modular projection of integer vectors — same $10^j \bmod d$ idea
  generalised to arbitrary bases.
- **Finance / Accounting** — most national tax-ID, IBAN, and Luhn (credit-card)
  check digits use weighted-modulo schemes whose mathematical content is the
  same as our rules; proving correctness reduces to "compute $10^j \bmod d$".
- **Engineering / Telecom** — CRC (cyclic redundancy check) error detection
  in Ethernet/Wi-Fi/USB is the polynomial generalisation of these digit-rules,
  using $\text{GF}(2)$ instead of $\bmod d$.

## Check Your Understanding

1. **Pen & paper:** Compute $10^j \bmod 13$ for $j = 0, 1, \ldots, 6$.  Use it
   to test whether 1,000,001 is divisible by 13.
2. **Pen & paper:** Use the 1001 rule to test 50,505 simultaneously for 7,
   11, and 13.
3. **Pen & paper:** Derive a divisibility rule for **6**.  Hint: $6 = 2 \cdot 3$,
   so test both rules.
4. **Pen & paper:** Why is the cycle length of $10^j \bmod d$ at most $d - 1$
   (when $\gcd(d, 10) = 1$)?  Refer to Fermat / Euler theorems.
5. **Coding:** Implement and test a function `is_divisible_by_7(N)` using the
   "double-and-subtract" rule, and verify on $N$ from 1 to 100.
