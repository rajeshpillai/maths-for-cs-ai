# Modular Arithmetic — Clock Math

## Intuition

If it's 10 o'clock and you add 5 hours, it's 3 o'clock — not 15.  The clock
"wraps around" at 12.  That's modular arithmetic: you only care about the
**remainder** after dividing.

This isn't just a cute analogy.  Modular arithmetic is the foundation of
cryptography (RSA, Diffie-Hellman), hash functions, checksums, and even how
array indices wrap in circular buffers.

## Prerequisites

- Tier 0, Lesson 1: Number Systems (integers)

## From First Principles

### The modulo operation

We say $a$ and $b$ are **congruent modulo $n$** if they have the same
remainder when divided by $n$.

**Notation:** $n \mid k$ means "$n$ divides $k$ evenly" (i.e., $k/n$ is an integer).

$$a \equiv b \pmod{n} \iff n \mid (a - b)$$

In plain English: $n$ divides the difference $(a - b)$ with no remainder.

**Pen & paper examples:**

- $17 \equiv 5 \pmod{12}$ because $17 - 5 = 12$, and $12 \mid 12$ ✓
- $23 \equiv 3 \pmod{10}$ because $23 - 3 = 20$, and $10 \mid 20$ ✓
- $-1 \equiv 4 \pmod{5}$ because $-1 - 4 = -5$, and $5 \mid (-5)$ ✓

### The division algorithm

For any integers $a$ and $n > 0$, there exist unique $q$ (quotient) and
$r$ (remainder) such that:

$$a = nq + r, \quad 0 \le r < n$$

The remainder $r$ is what `a % n` gives you.

**Pen & paper:** $23 = 10 \times 2 + 3$, so $23 \mod 10 = 3$.

### Properties (these make pen & paper work fast)

All of these hold modulo $n$:

**1. Addition:**
$$(a + b) \mod n = ((a \mod n) + (b \mod n)) \mod n$$

**Pen & paper:** $(17 + 25) \mod 7$
- $17 \mod 7 = 3$
- $25 \mod 7 = 4$
- $(3 + 4) \mod 7 = 0$
- Verify: $42 \mod 7 = 0$ ✓

**2. Multiplication:**
$$(a \times b) \mod n = ((a \mod n) \times (b \mod n)) \mod n$$

**Pen & paper:** $(13 \times 17) \mod 5$
- $13 \mod 5 = 3$
- $17 \mod 5 = 2$
- $(3 \times 2) \mod 5 = 1$
- Verify: $221 \mod 5 = 1$ ✓

**3. Exponentiation (repeated squaring):**

To compute $3^{13} \mod 7$ without calculating $3^{13} = 1{,}594{,}323$:

**Step 1: Build a table of powers by repeated squaring.**

$3^1 = 3$.  $3 \mod 7 = 3$ → $3^1 \equiv 3$

$3^2 = 3 \times 3 = 9$.  $9 \mod 7 = 2$ → $3^2 \equiv 2$

$3^4 = (3^2)^2 \equiv 2^2 = 4$.  $4 \mod 7 = 4$ → $3^4 \equiv 4$

$3^8 = (3^4)^2 \equiv 4^2 = 16$.  $16 \mod 7 = 2$ (since $16 = 2 \times 7 + 2$) → $3^8 \equiv 2$

**Step 2: Write the exponent in binary.**

$13 = 8 + 4 + 1$ (in binary: $1101_2$)

**Step 3: Multiply the corresponding powers.**

$$3^{13} = 3^8 \times 3^4 \times 3^1 \equiv 2 \times 4 \times 3 = 24$$

$24 \mod 7 = 3$ (since $24 = 3 \times 7 + 3$)

$$3^{13} \equiv 3 \pmod{7}$$

This is **modular exponentiation** — the backbone of RSA encryption.

**4. Subtraction:**
$$(a - b) \mod n = ((a \mod n) - (b \mod n) + n) \mod n$$

We add $n$ to avoid negative remainders.

### Modular inverse

The **modular inverse** of $a$ modulo $n$ is a number $a^{-1}$ such that:

$$a \times a^{-1} \equiv 1 \pmod{n}$$

It exists **only when** $\gcd(a, n) = 1$ (they share no common factor).

**Pen & paper:** Find $3^{-1} \pmod{7}$

Try $3 \times 1 = 3$, $3 \times 2 = 6$, $3 \times 3 = 9 \equiv 2$,
$3 \times 4 = 12 \equiv 5$, $3 \times 5 = 15 \equiv 1$ ✓

So $3^{-1} \equiv 5 \pmod{7}$.

> **Note:** Division in modular arithmetic means multiplying by the inverse.
> There is no "dividing" directly.

### Fermat's Little Theorem

If $p$ is prime and $\gcd(a, p) = 1$:

$$a^{p-1} \equiv 1 \pmod{p}$$

**Consequence:** $a^{-1} \equiv a^{p-2} \pmod{p}$

**Pen & paper:** $3^{-1} \pmod{7}$
$$3^{7-2} = 3^5 = 243$$
$$243 \mod 7 = 243 - 34 \times 7 = 243 - 238 = 5$$

Same answer as brute force ✓

## Python Verification

```python
# ── Modular Arithmetic: verifying pen & paper work ──────────

# Basic modulo
print("=== Basic modulo ===")
print(f"17 mod 12 = {17 % 12}")       # 5 (clock arithmetic)
print(f"23 mod 10 = {23 % 10}")       # 3
print(f"-1 mod 5 = {-1 % 5}")         # 4 (Python handles negative mod correctly)

# Addition property
print("\n=== Addition property ===")
print(f"(17 + 25) mod 7 = {(17 + 25) % 7}")
print(f"((17%7) + (25%7)) mod 7 = {((17 % 7) + (25 % 7)) % 7}")

# Multiplication property
print("\n=== Multiplication property ===")
print(f"(13 * 17) mod 5 = {(13 * 17) % 5}")
print(f"((13%5) * (17%5)) mod 5 = {((13 % 5) * (17 % 5)) % 5}")

# Modular exponentiation: 3^13 mod 7
print("\n=== Modular exponentiation ===")
# Brute force
print(f"3^13 mod 7 (brute) = {3**13 % 7}")
# Python's built-in (uses repeated squaring internally)
print(f"pow(3, 13, 7) = {pow(3, 13, 7)}")

# Modular inverse: 3^(-1) mod 7
print("\n=== Modular inverse ===")
# Brute force search
for i in range(1, 7):
    if (3 * i) % 7 == 1:
        print(f"3^(-1) mod 7 = {i} (brute force)")
        break

# Using Fermat's Little Theorem: a^(p-2) mod p
inv = pow(3, 7 - 2, 7)
print(f"3^(-1) mod 7 = {inv} (Fermat)")

# Verify
print(f"3 * 5 mod 7 = {(3 * 5) % 7}")  # Should be 1

# Clock arithmetic demo
print("\n=== Clock arithmetic ===")
hour = 10
add = 5
print(f"{hour} o'clock + {add} hours = {(hour + add) % 12} o'clock")
```

## Visualisation — The clock face of modular arithmetic

Modular arithmetic IS clock arithmetic. The plot draws the integers
mod 12 around a 12-hour clock and visualises addition as "rotate
forward". Then a parallel diagram does the same for $\mathbb{Z}/7$
(prime modulus, where multiplicative inverses always exist).

```python
# ── Visualising modular arithmetic on a clock ───────────────
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(13, 6))

def draw_modular_clock(ax, m, title, additions=None, mults=None):
    """Draw a clock face for Z/m, showing add or mult demos."""
    # Place numbers 0..m-1 evenly around a circle.
    angles = np.linspace(0, 2 * np.pi, m, endpoint=False) + np.pi / 2
    for k in range(m):
        x, y = np.cos(angles[k]), np.sin(angles[k])
        ax.scatter(x, y, color="tab:blue", s=400, zorder=5)
        ax.text(x, y, str(k), ha="center", va="center",
                fontsize=12, fontweight="bold", color="white")
    # Outer circle for context.
    theta = np.linspace(0, 2 * np.pi, 200)
    ax.plot(np.cos(theta), np.sin(theta), color="grey", lw=0.6, alpha=0.5)
    # Addition arrows.
    if additions:
        for a, k, color in additions:
            x0, y0 = np.cos(angles[a]), np.sin(angles[a])
            x1, y1 = np.cos(angles[(a + k) % m]), np.sin(angles[(a + k) % m])
            ax.annotate("", xy=(x1 * 0.85, y1 * 0.85),
                        xytext=(x0 * 0.85, y0 * 0.85),
                        arrowprops=dict(arrowstyle="->", color=color, lw=2))
            ax.text((x0 + x1)/2 * 0.6, (y0 + y1)/2 * 0.6,
                    f"{a} + {k} ≡ {(a + k) % m}", color=color, fontsize=9,
                    ha="center")
    ax.set_xlim(-1.6, 1.6); ax.set_ylim(-1.6, 1.6); ax.set_aspect("equal")
    ax.axis("off")
    ax.set_title(title)

# Z/12 with two example additions.
draw_modular_clock(axes[0], 12,
                   "Z/12 — add 5 to several positions\n('clock arithmetic')",
                   additions=[(10, 5, "tab:red"),
                              ( 7, 8, "tab:green"),
                              ( 0, 3, "tab:purple")])

# Z/7 (a prime) — show how repeated +3 cycles through all elements.
# This is what makes Z/p a *cyclic group of prime order*.
hops = []
cur = 0
for _ in range(7):
    nxt = (cur + 3) % 7
    hops.append((cur, 3, plt.cm.viridis(cur / 6)))
    cur = nxt
draw_modular_clock(axes[1], 7,
                   "Z/7 (prime) — repeated +3 hits every element\n"
                   "(generator: 3 generates all of Z/7)",
                   additions=hops)

plt.tight_layout()
plt.show()

# Print a few useful facts numerically.
print("Modular arithmetic essentials:")
print(f"  17 mod 5  = {17 % 5}    (remainder when 17 divided by 5)")
print(f"  (8 + 7) mod 5 = {(8 + 7) % 5}    (add then reduce)")
print(f"  (8 * 7) mod 5 = {(8 * 7) % 5}    (multiply then reduce)")
print()
# Multiplicative inverse of 3 mod 7: by Fermat, 3^(p-2) mod p.
print(f"  Multiplicative inverse of 3 mod 7  →  3 · ? ≡ 1 (mod 7)")
print(f"     by Fermat's Little Theorem:     3^(7-2) mod 7 = {pow(3, 5, 7)}")
print(f"     verify: 3 · 5 mod 7 = {(3 * 5) % 7}  ✓")
print()
# Powers of 2 mod 7 cycle with period 3 — exactly the order of 2 in Z/7*.
powers_2 = [pow(2, k, 7) for k in range(8)]
print(f"  Powers of 2 mod 7: {powers_2}  (cycles with period 3)")
print(f"  Powers of 3 mod 7: {[pow(3, k, 7) for k in range(8)]}  "
      f"(cycles with period 6 — 3 is a primitive root!)")
```

**The clock-face picture answers a lot of questions:**

- **Modular arithmetic = arithmetic that wraps around.** $13 \bmod 12 =
  1$ — same reason 13 o'clock is 1 PM. The clock face is the literal
  picture: addition is rotation.
- **Inverses exist iff $\gcd(a, m) = 1$.** When $m$ is prime, every
  non-zero element has a multiplicative inverse — that's why
  $\mathbb{Z}/p$ is a *field* and **RSA cryptography** can do its
  exponentiation tricks. Fermat's Little Theorem gives the inverse
  directly: $a^{-1} \equiv a^{p-2} \pmod p$.
- **Periodic structure powers cryptography and hashing.** Hash tables
  use `key % table_size` to find a bucket. Diffie-Hellman key
  exchange relies on the difficulty of computing discrete logarithms
  in $\mathbb{Z}/p^\times$. Pseudorandom generators (LCGs) iterate
  modular-multiplications.

## Connection to CS / Games / AI / Business / Industry

- **Cryptography** — RSA encryption is entirely modular exponentiation with huge primes
- **Hash functions** — `hash(key) % table_size` maps keys to array indices
- **Circular buffers** — `index = (head + offset) % capacity`
- **Checksums** — ISBN, credit card (Luhn algorithm), CRC all use modular arithmetic
- **Random number generators** — linear congruential generators: $x_{n+1} = (ax_n + c) \mod m$
- **Game dev** — wrapping coordinates (Pac-Man exits right, enters left)
- **Credit-card & IBAN validation (Finance)** — every Visa, Mastercard, and Amex card number is checked in real time with the Luhn algorithm (mod-10); IBANs (used by SWIFT and SEPA across European banks) validate via mod-97 — built into Stripe, Adyen, and core-banking systems.
- **Time-zone arithmetic & shift scheduling (Operations)** — UPS hub schedules, hospital nursing rosters (Kronos, UKG), and airline crew rostering at Delta/Lufthansa all rely on mod-24 (hours), mod-7 (days), and mod-12 (months) calendar arithmetic.
- **CRC error checking in industry (Engineering)** — every Ethernet frame, Wi-Fi packet, USB transaction, and CAN bus message in your Tesla/BMW/John Deere tractor uses CRC-32 (a polynomial mod operation); ZIP, PNG, and HDD/SSD sectors all carry CRC checksums.
- **Astronomical & GPS time (Science/Industry)** — GPS week numbers wrap mod $2^{10}$ (causing the 1999 and 2019 GPS rollover events); JPL ephemerides and stock-market trading clocks use modular arithmetic on TAI-UTC offsets to align satellite, exchange, and atomic-clock timestamps.

## Check Your Understanding

1. **Pen & paper:** Compute $7^{10} \mod 11$ using repeated squaring.
2. **Pen & paper:** Find $5^{-1} \pmod{11}$. Verify by multiplying.
3. **Pen & paper:** A hash table has 8 slots. Keys 3, 11, 19, 27 are inserted
   using `h(k) = k mod 8`. Which slots do they go to? Do any collide?
4. **Think about it:** Why does modular inverse only exist when $\gcd(a, n) = 1$?
   What goes wrong when they share a factor?
