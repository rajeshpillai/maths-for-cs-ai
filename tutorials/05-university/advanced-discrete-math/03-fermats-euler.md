# Fermat's Little Theorem and Euler's Totient Function

## Intuition

Raise any number to the power of a prime $p$, and modular arithmetic brings it
back to itself. This "boomerang" property (Fermat's little theorem) is not a
coincidence — it emerges from the structure of multiplication mod $p$. Euler
generalised this to any modulus using the **totient function** $\phi(n)$, which
counts how many numbers below $n$ are coprime to it. Together, these results
are the mathematical backbone of RSA encryption.

## Prerequisites

- **Tier 13, Lesson 2** — Congruences, modular inverse, CRT

## From First Principles

### Fermat's Little Theorem

**Statement:** If $p$ is prime and $\gcd(a, p) = 1$, then:

$$a^{p-1} \equiv 1 \pmod{p}$$

Equivalently, for any integer $a$: $a^p \equiv a \pmod{p}$.

**Proof (pen & paper):**

Consider the set $S = \{1, 2, 3, \ldots, p-1\}$.

Multiply every element by $a$: $S' = \{a \cdot 1, a \cdot 2, \ldots, a(p-1)\} \pmod{p}$.

Claim: $S'$ is a permutation of $S$. Why?
- Each $a \cdot i \not\equiv 0$ (since $\gcd(a,p)=1$).
- All are distinct: if $a \cdot i \equiv a \cdot j$, then $i \equiv j$ (cancel $a$).

So the products of elements in $S$ and $S'$ are equal mod $p$:

$$\prod_{i=1}^{p-1} (a \cdot i) \equiv \prod_{i=1}^{p-1} i \pmod{p}$$

$$a^{p-1} \cdot (p-1)! \equiv (p-1)! \pmod{p}$$

Cancel $(p-1)!$ (it is coprime to $p$):

$$a^{p-1} \equiv 1 \pmod{p} \quad \blacksquare$$

**Example:** $a = 3$, $p = 7$. Then $3^6 = 729$. $729 / 7 = 104$ remainder $1$. Confirmed.

### Euler's Totient Function $\phi(n)$

$\phi(n)$ = count of integers $k$ with $1 \le k \le n$ and $\gcd(k, n) = 1$.

**Formulas:**

- $\phi(p) = p - 1$ for prime $p$.
- $\phi(p^k) = p^k - p^{k-1} = p^{k-1}(p-1)$.
- $\phi(mn) = \phi(m)\phi(n)$ when $\gcd(m,n) = 1$ (multiplicative).
- General: $\phi(n) = n \prod_{p \mid n} \left(1 - \frac{1}{p}\right)$.

**Example:** $\phi(12)$. $12 = 2^2 \cdot 3$.

$$\phi(12) = 12 \cdot \left(1 - \frac{1}{2}\right)\left(1 - \frac{1}{3}\right) = 12 \cdot \frac{1}{2} \cdot \frac{2}{3} = 4$$

By enumeration: $\{1, 5, 7, 11\}$ are coprime to 12. Count = 4. Correct.

### Euler's Theorem (Generalisation)

**Statement:** If $\gcd(a, n) = 1$, then:

$$a^{\phi(n)} \equiv 1 \pmod{n}$$

Note: when $n = p$ (prime), $\phi(p) = p-1$, recovering Fermat's little theorem.

**Example:** $a = 5$, $n = 12$, $\phi(12) = 4$.

$5^4 = 625$. $625 / 12 = 52$ remainder $1$. Confirmed: $5^4 \equiv 1 \pmod{12}$.

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

# Plot phi(n) for n = 1..60
def euler_totient(n):
    result = n
    p = 2
    temp = n
    while p * p <= temp:
        if temp % p == 0:
            while temp % p == 0:
                temp //= p
            result -= result // p
        p += 1
    if temp > 1:
        result -= result // temp
    return result

ns = range(1, 61)
phis = [euler_totient(n) for n in ns]

fig, ax = plt.subplots(figsize=(12, 4))
colors = ['red' if all(n % i != 0 for i in range(2, n)) and n > 1 else 'steelblue' for n in ns]
ax.bar(ns, phis, color=colors, edgecolor='black', linewidth=0.3)
ax.set_xlabel("n")
ax.set_ylabel("phi(n)")
ax.set_title("Euler's Totient Function (red = primes, where phi(p) = p-1)")
plt.tight_layout()
plt.savefig("euler_totient.png", dpi=100)
plt.show()
```

## Python Verification

```python
import math

# ── Euler's Totient from scratch ─────────────────────────
def euler_totient(n):
    """Compute phi(n) using the product formula."""
    result = n
    p = 2
    temp = n
    while p * p <= temp:
        if temp % p == 0:
            while temp % p == 0:
                temp //= p
            result -= result // p
        p += 1
    if temp > 1:
        result -= result // temp
    return result

# Step 1: Verify phi values
for n in [1, 6, 7, 12, 15, 30]:
    brute = sum(1 for k in range(1, n+1) if math.gcd(k, n) == 1)
    formula = euler_totient(n)
    print(f"phi({n}) = {formula}  (brute force: {brute})")

# Step 2: Fermat's Little Theorem
p = 7
for a in range(1, p):
    result = pow(a, p - 1, p)  # a^(p-1) mod p
    print(f"{a}^{p-1} mod {p} = {result}")  # all should be 1

# Step 3: Euler's Theorem
n = 12
phi_n = euler_totient(n)
print(f"\nphi({n}) = {phi_n}")
for a in [1, 5, 7, 11]:  # coprime to 12
    result = pow(a, phi_n, n)
    print(f"{a}^{phi_n} mod {n} = {result}")  # all should be 1

# Step 4: Fast modular exponentiation (used in RSA)
def mod_pow(base, exp, mod):
    """Square-and-multiply algorithm."""
    result = 1
    base = base % mod
    while exp > 0:
        if exp % 2 == 1:
            result = (result * base) % mod
        exp //= 2
        base = (base * base) % mod
    return result

print(f"\n3^1000000 mod 7 = {mod_pow(3, 1000000, 7)}")
# 1000000 mod 6 = 4, so 3^1000000 ≡ 3^4 = 81 ≡ 4 (mod 7)
print(f"3^4 mod 7 = {pow(3, 4, 7)}")
```

## Connection to CS / Games / AI / Business / Industry

- **RSA encryption:** Decryption correctness is proved directly from Euler's
  theorem: $m^{ed} \equiv m \pmod{n}$ because $ed \equiv 1 \pmod{\phi(n)}$.
- **Primality testing:** Fermat's test checks if $a^{n-1} \equiv 1 \pmod{n}$ —
  a quick probabilistic primality filter.
- **Fast exponentiation:** The square-and-multiply algorithm computes
  $a^k \bmod n$ in $O(\log k)$ multiplications — essential for crypto.
- **Diffie-Hellman key exchange:** Security relies on the discrete logarithm
  problem in $\mathbb{Z}_p^*$, whose structure is governed by $\phi(p)$.

## Check Your Understanding

1. Compute $\phi(100)$ by hand using the product formula.
2. Use Fermat's little theorem to compute $2^{100} \bmod 13$ without a
   calculator (hint: reduce the exponent mod 12).
3. Why does the Fermat primality test sometimes fail? Research "Carmichael
   numbers" and find the smallest one.
