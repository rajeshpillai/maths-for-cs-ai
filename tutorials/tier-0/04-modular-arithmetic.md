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
remainder when divided by $n$:

$$a \equiv b \pmod{n} \iff n \mid (a - b)$$

In plain English: $n$ divides the difference $(a - b)$ evenly.

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

$$3^1 \equiv 3 \pmod{7}$$
$$3^2 \equiv 9 \equiv 2 \pmod{7}$$
$$3^4 \equiv 2^2 = 4 \pmod{7}$$
$$3^8 \equiv 4^2 = 16 \equiv 2 \pmod{7}$$

Now $13 = 8 + 4 + 1$, so:

$$3^{13} \equiv 3^8 \times 3^4 \times 3^1 \equiv 2 \times 4 \times 3 = 24 \equiv 3 \pmod{7}$$

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

## Connection to CS / Games / AI

- **Cryptography** — RSA encryption is entirely modular exponentiation with huge primes
- **Hash functions** — `hash(key) % table_size` maps keys to array indices
- **Circular buffers** — `index = (head + offset) % capacity`
- **Checksums** — ISBN, credit card (Luhn algorithm), CRC all use modular arithmetic
- **Random number generators** — linear congruential generators: $x_{n+1} = (ax_n + c) \mod m$
- **Game dev** — wrapping coordinates (Pac-Man exits right, enters left)

## Check Your Understanding

1. **Pen & paper:** Compute $7^{10} \mod 11$ using repeated squaring.
2. **Pen & paper:** Find $5^{-1} \pmod{11}$. Verify by multiplying.
3. **Pen & paper:** A hash table has 8 slots. Keys 3, 11, 19, 27 are inserted
   using `h(k) = k mod 8`. Which slots do they go to? Do any collide?
4. **Think about it:** Why does modular inverse only exist when $\gcd(a, n) = 1$?
   What goes wrong when they share a factor?
