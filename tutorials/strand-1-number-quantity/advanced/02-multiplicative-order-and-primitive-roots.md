---
strand: number-quantity
level: advanced
order: 2
title: Multiplicative Order and Primitive Roots
prerequisites:
  - tier: strand-1-number-quantity-advanced
    slug: 00-fermat-and-euler-totient
    description: Fermat and Euler's totient
connections:
  - strand-1-number-quantity-foundation/09-repeating-decimals
applications:
  - cs: "Discrete-log cryptography (Diffie-Hellman, ElGamal), period detection"
  - business: "Repeating-decimal patterns in financial calculations"
  - life: "Why $1/7$'s decimal has 6-digit period"
---

# Multiplicative Order and Primitive Roots

## Mental

For $\gcd(a, n) = 1$, the **multiplicative order** of $a$ modulo $n$
is the smallest positive integer $k$ with $a^k \equiv 1 \pmod n$.
Notation: $\text{ord}_n(a)$.

By Euler's theorem (Lesson 00), $a^{\phi(n)} \equiv 1$, so the order
is **at most** $\phi(n)$.

Crucially, $\text{ord}_n(a)$ **divides** $\phi(n)$. (If $a^k \equiv
1$, then $k \mid \text{ord}_n(a)$.)

When $\text{ord}_n(a) = \phi(n)$ — the maximum — $a$ is called a
**primitive root** modulo $n$. Primitive roots exist exactly when $n
\in \{1, 2, 4, p^k, 2p^k\}$ for an odd prime $p$.

For $n = 7$: $\phi(7) = 6$. Compute orders of small $a$:

- $a = 2$: $2, 4, 1, \ldots$ — order 3.
- $a = 3$: $3, 2, 6, 4, 5, 1$ — order 6 → **primitive root**.

So $3$ is a primitive root mod $7$. Powers of $3$ generate **all** the
nonzero residues mod $7$.

## Connection to repeating decimals

Foundation Lesson 09 hinted: $1/7 = 0.\overline{142857}$ has period
$6$. The reason: the multiplicative order of $10$ modulo $7$ is $6$.

In general, the period of $1/n$ in base $b$ (for $\gcd(b, n) = 1$) is
exactly $\text{ord}_n(b)$.

For $n = 7, b = 10$: $\text{ord}_7(10) = 6$, so period is $6$. The
maximum possible period for $1/n$ is $n - 1$, achieved when $b$ is a
primitive root mod $n$ — a "**full-period prime**."

## Interactive

:::widget type=numeric-input prompt="$\\text{ord}_7(2) = ?$ (Compute powers of 2 mod 7 until you hit 1: $2, 4, 1$.)" answer=3 explain="$2^3 = 8 \\equiv 1 \\pmod 7$. Order $3$.":::

:::widget type=numeric-input prompt="$\\text{ord}_7(3) = ?$" answer=6 explain="Powers: $3, 2, 6, 4, 5, 1$. Order $6$ — primitive root.":::

:::widget type=numeric-input prompt="The period of $1/13$ in base 10 — i.e. $\\text{ord}_{13}(10) = ?$" answer=6 explain="Compute $10, 9, 12, 3, 4, 1$. Order $6$. So $1/13 = 0.\\overline{076923}$.":::

:::widget type=numeric-input prompt="$\\phi(11) = ?$" answer=10 explain="$11$ is prime, so $\\phi(11) = 10$.":::

## Symbolic

For $\gcd(a, n) = 1$, the multiplicative order is

$$
\text{ord}_n(a) = \min\{k \ge 1 : a^k \equiv 1 \pmod n\}.
$$

**Lagrange property**: $\text{ord}_n(a) \mid \phi(n)$.

**Primitive roots** mod $n$ exist iff $n \in \{1, 2, 4, p^k, 2 p^k\}$
for odd prime $p$. The number of primitive roots, when they exist, is
$\phi(\phi(n))$.

The **discrete logarithm** problem: given $a$ a primitive root mod $p$
and a target $b$, find $k$ such that $a^k \equiv b \pmod p$. **Hard
for large $p$**: the basis of Diffie-Hellman key exchange and ElGamal
cryptography.

## Computational

```python
def multiplicative_order(a, n):
    """Smallest k > 0 with a^k ≡ 1 (mod n)."""
    if math.gcd(a, n) != 1: return None
    k = 1
    cur = a % n
    while cur != 1:
        cur = (cur * a) % n
        k += 1
    return k

import math
print(multiplicative_order(2, 7))     # 3
print(multiplicative_order(3, 7))     # 6 — primitive root
print(multiplicative_order(10, 7))    # 6 — period of 1/7

def is_primitive_root(g, p):
    return multiplicative_order(g, p) == p - 1

print(is_primitive_root(3, 7))   # True
print(is_primitive_root(2, 7))   # False
```

## Applied

- **Diffie-Hellman key exchange**: Alice and Bob each pick a private
  exponent; using a shared primitive root and prime, they compute a
  shared secret without ever transmitting it. Security relies on
  discrete-log hardness.
- **Periodic phenomena**: clock cycles, music intervals (in equal
  temperament, $12 \cdot \log_2 r$ semitones), generator periods in
  RNGs.
- **Carmichael function**: $\lambda(n) = \text{lcm}$ of orders;
  refines Euler's theorem to $a^{\lambda(n)} \equiv 1 \pmod n$.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\text{ord}_{11}(2)$? (Compute powers mod 11.)" answer=10 explain="$2, 4, 8, 5, 10, 9, 7, 3, 6, 1$. Order 10. Primitive root.":::

:::widget type=numeric-input prompt="Period of $1/17$ in base 10?" answer=16 explain="$\\text{ord}_{17}(10) = 16$. $17$ is a 'full-period' prime.":::

:::widget type=numeric-input prompt="$\\text{ord}_n(a)$ must divide what?" answer=0 explain="$\\phi(n)$. (Cannot type formula here; the answer is conceptual: the order divides Euler's totient.)":::

:::widget type=numeric-input prompt="Number of primitive roots mod $7$ = $\\phi(\\phi(7)) = \\phi(6) = ?$" answer=2 explain="$\\phi(6) = 2$. The primitive roots mod 7 are $3$ and $5$.":::
