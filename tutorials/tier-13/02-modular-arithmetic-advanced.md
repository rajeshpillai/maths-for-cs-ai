# Advanced Modular Arithmetic

## Intuition

Modular arithmetic is "clock arithmetic" on steroids. When you wrap numbers
around a modulus, surprising structure emerges. The **Chinese Remainder Theorem**
says you can reconstruct a number from its remainders — like identifying
someone by their fingerprints across multiple clocks. This is the mathematical
engine behind RSA, secret sharing, and efficient big-integer computation.

## Prerequisites

- **Tier 0, Lesson 4** — Modular arithmetic basics
- **Tier 13, Lesson 1** — Divisibility, prime factorisation, GCD

## From First Principles

### Congruence

We write $a \equiv b \pmod{m}$ if $m \mid (a - b)$, i.e., $a$ and $b$ have
the same remainder when divided by $m$.

**Properties (all provable from the definition):**

1. $a \equiv a \pmod{m}$ (reflexive)
2. If $a \equiv b$ then $b \equiv a$ (symmetric)
3. If $a \equiv b$ and $b \equiv c$ then $a \equiv c$ (transitive)
4. If $a \equiv b$ and $c \equiv d$ (mod $m$), then:
   - $a + c \equiv b + d \pmod{m}$
   - $a \cdot c \equiv b \cdot d \pmod{m}$

**Example (pen & paper):** $17 \equiv 2 \pmod{5}$ because $5 \mid (17 - 2) = 15$.

### Modular Inverse

$a$ has a multiplicative inverse mod $m$ (written $a^{-1}$) if:

$$a \cdot a^{-1} \equiv 1 \pmod{m}$$

This exists if and only if $\gcd(a, m) = 1$.

**Finding it:** Use the Extended Euclidean Algorithm. Given $\gcd(a, m) = 1$,
find $x, y$ such that $ax + my = 1$. Then $x \equiv a^{-1} \pmod{m}$.

**Example:** Find $3^{-1} \pmod{7}$.

Euclidean: $7 = 2 \cdot 3 + 1$, so $1 = 7 - 2 \cdot 3$.
Thus $3 \cdot (-2) \equiv 1 \pmod{7}$, so $3^{-1} \equiv 5 \pmod{7}$.
Check: $3 \times 5 = 15 \equiv 1 \pmod{7}$. Correct.

### Chinese Remainder Theorem (CRT)

**Statement:** If $m_1, m_2, \ldots, m_k$ are pairwise coprime
($\gcd(m_i, m_j) = 1$ for $i \ne j$), then the system

$$x \equiv a_1 \pmod{m_1}$$
$$x \equiv a_2 \pmod{m_2}$$
$$\vdots$$
$$x \equiv a_k \pmod{m_k}$$

has a unique solution modulo $M = m_1 m_2 \cdots m_k$.

**Construction (pen & paper):**

1. Let $M_i = M / m_i$.
2. Find $y_i$ such that $M_i y_i \equiv 1 \pmod{m_i}$ (the modular inverse).
3. Solution: $x = \sum_{i=1}^{k} a_i M_i y_i \pmod{M}$.

**Example:** Solve $x \equiv 2 \pmod{3}$, $x \equiv 3 \pmod{5}$.

- $M = 15$, $M_1 = 5$, $M_2 = 3$.
- $5 y_1 \equiv 1 \pmod{3} \Rightarrow y_1 = 2$ (since $5 \times 2 = 10 \equiv 1$).
- $3 y_2 \equiv 1 \pmod{5} \Rightarrow y_2 = 2$ (since $3 \times 2 = 6 \equiv 1$).
- $x = 2 \cdot 5 \cdot 2 + 3 \cdot 3 \cdot 2 = 20 + 18 = 38 \equiv 8 \pmod{15}$.

Check: $8 = 2 \cdot 3 + 2$ and $8 = 1 \cdot 5 + 3$. Both remainders match.

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

# Visualise the CRT: numbers satisfying x ≡ 2 (mod 3) and x ≡ 3 (mod 5)
fig, axes = plt.subplots(1, 3, figsize=(14, 4))

# Clock mod 3
theta = np.linspace(0, 2*np.pi, 4)[:-1]
ax = axes[0]
ax.set_title("mod 3 (x ≡ 2)")
for i in range(3):
    color = 'red' if i == 2 else 'lightgray'
    ax.plot(np.cos(theta[i]), np.sin(theta[i]), 'o', markersize=20, color=color)
    ax.text(np.cos(theta[i])*1.2, np.sin(theta[i])*1.2, str(i), ha='center', fontsize=14)
ax.set_xlim(-1.6, 1.6); ax.set_ylim(-1.6, 1.6); ax.set_aspect('equal'); ax.axis('off')

# Clock mod 5
theta5 = np.linspace(0, 2*np.pi, 6)[:-1]
ax = axes[1]
ax.set_title("mod 5 (x ≡ 3)")
for i in range(5):
    color = 'blue' if i == 3 else 'lightgray'
    ax.plot(np.cos(theta5[i]), np.sin(theta5[i]), 'o', markersize=20, color=color)
    ax.text(np.cos(theta5[i])*1.2, np.sin(theta5[i])*1.2, str(i), ha='center', fontsize=14)
ax.set_xlim(-1.6, 1.6); ax.set_ylim(-1.6, 1.6); ax.set_aspect('equal'); ax.axis('off')

# Number line showing solution
ax = axes[2]
ax.set_title("Solutions mod 15")
nums = range(0, 31)
colors = ['green' if n % 3 == 2 and n % 5 == 3 else 'lightgray' for n in nums]
ax.bar(nums, [1]*len(nums), color=colors, edgecolor='black', linewidth=0.5)
ax.set_xlabel("n"); ax.set_ylabel("")
ax.set_xticks([n for n in nums if n % 3 == 2 and n % 5 == 3])
plt.tight_layout()
plt.savefig("crt_visualisation.png", dpi=100)
plt.show()
```

## Python Verification

```python
# ── Extended Euclidean Algorithm ─────────────────────────
def extended_gcd(a, b):
    """Return (g, x, y) such that a*x + b*y = g = gcd(a, b)."""
    if b == 0:
        return a, 1, 0
    g, x1, y1 = extended_gcd(b, a % b)
    return g, y1, x1 - (a // b) * y1

# Step 1: Modular inverse
def mod_inverse(a, m):
    g, x, _ = extended_gcd(a % m, m)
    if g != 1:
        raise ValueError(f"No inverse: gcd({a},{m}) = {g}")
    return x % m

print(f"3^(-1) mod 7 = {mod_inverse(3, 7)}")  # 5
print(f"Check: 3 * 5 mod 7 = {(3 * 5) % 7}")  # 1

# Step 2: Chinese Remainder Theorem
def crt(remainders, moduli):
    """Solve system x ≡ a_i (mod m_i) using CRT construction."""
    M = 1
    for m in moduli:
        M *= m
    x = 0
    for a_i, m_i in zip(remainders, moduli):
        M_i = M // m_i
        y_i = mod_inverse(M_i, m_i)
        x += a_i * M_i * y_i
        print(f"  a={a_i}, m={m_i}, M_i={M_i}, y_i={y_i}, term={a_i * M_i * y_i}")
    return x % M

# Example: x ≡ 2 (mod 3), x ≡ 3 (mod 5)
result = crt([2, 3], [3, 5])
print(f"Solution: x ≡ {result} (mod 15)")  # 8
print(f"Check: {result} mod 3 = {result % 3}, {result} mod 5 = {result % 5}")

# Larger example: x ≡ 1 (mod 3), x ≡ 2 (mod 5), x ≡ 3 (mod 7)
result2 = crt([1, 2, 3], [3, 5, 7])
print(f"\nSolution: x ≡ {result2} (mod 105)")
print(f"Check: {result2}%3={result2%3}, {result2}%5={result2%5}, {result2}%7={result2%7}")
```

## Connection to CS / Games / AI

- **RSA cryptography:** CRT speeds up decryption by a factor of ~4x by
  working modulo $p$ and $q$ separately, then combining.
- **Hash functions:** Double hashing uses two coprime moduli — CRT explains
  why collisions are rare.
- **Distributed systems:** Secret sharing (Shamir's scheme) uses polynomial
  interpolation over modular fields, which relies on CRT-like reconstruction.
- **Big integer arithmetic:** Libraries multiply large numbers by splitting
  work across coprime moduli (residue number systems).

## Check Your Understanding

1. Find $7^{-1} \pmod{11}$ by hand using the extended Euclidean algorithm.
2. Solve: $x \equiv 3 \pmod{4}$, $x \equiv 1 \pmod{5}$, $x \equiv 2 \pmod{7}$.
   Verify with the Python CRT function.
3. Why does CRT require the moduli to be pairwise coprime? Construct a
   counterexample where two non-coprime moduli give no solution.
