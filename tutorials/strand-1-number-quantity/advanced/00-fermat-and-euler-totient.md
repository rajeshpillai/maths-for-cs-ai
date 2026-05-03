---
strand: number-quantity
level: advanced
order: 0
title: Fermat's Little Theorem and Euler's Totient
prerequisites:
  - tier: strand-1-number-quantity-intermediate
    slug: 03-modular-arithmetic
    description: Modular arithmetic
connections:
  - strand-1-number-quantity-advanced/01-rsa-deep-dive
applications:
  - cs: "RSA encryption, primality testing, hashing"
  - business: "Cryptography in payments, secure messaging"
  - life: "HTTPS in your browser bar"
---

# Fermat's Little Theorem and Euler's Totient

## Mental

Two cornerstone theorems of number theory, both about modular
arithmetic, both essential for modern cryptography.

**Fermat's little theorem** ($1640$): for any integer $a$ and prime
$p$ with $p \nmid a$,

$$
a^{p-1} \equiv 1 \pmod p.
$$

So $a^{p-1}$ is always $1$ mod $p$, regardless of $a$ — a remarkable
universality.

Examples: $2^{6} = 64 \equiv 1 \pmod 7$. $3^{10} = 59049 \equiv 1
\pmod{11}$. The pattern holds for every prime.

**Euler's totient function** $\phi(n)$ counts integers in $\{1, 2,
\ldots, n\}$ that are **coprime** to $n$ (share no common factor
other than $1$).

For $p$ prime, $\phi(p) = p - 1$. For $n = p \cdot q$ (product of two
distinct primes), $\phi(n) = (p-1)(q-1)$. For general $n =
p_1^{a_1} \cdots p_r^{a_r}$:

$$
\phi(n) = n \prod_{p | n} \left(1 - \frac{1}{p}\right).
$$

**Euler's theorem** generalises Fermat: for any integer $a$ coprime
to $n$,

$$
a^{\phi(n)} \equiv 1 \pmod n.
$$

For $n = pq$, this is $a^{(p-1)(q-1)} \equiv 1 \pmod{pq}$ — the
mathematical foundation of RSA (next lesson).

## Interactive

:::widget type=numeric-input prompt="Verify Fermat: $2^{10} \\bmod 11 = ?$" answer=1 explain="$2^{10} = 1024 = 93 \\cdot 11 + 1$. By Fermat's little theorem.":::

:::widget type=numeric-input prompt="$\\phi(12) = ?$ (Coprimes to $12$ in $\\{1, ..., 12\\}$.)" answer=4 explain="Coprimes: $\\{1, 5, 7, 11\\}$ — four. Or $\\phi(12) = 12(1 - 1/2)(1 - 1/3) = 12 \\cdot 1/2 \\cdot 2/3 = 4$.":::

:::widget type=numeric-input prompt="$\\phi(35) = \\phi(5 \\cdot 7) = ?$" answer=24 explain="$(5-1)(7-1) = 24$.":::

:::widget type=numeric-input prompt="$\\phi(p^2)$ for prime $p$? (Coprimes are everything except multiples of $p$.)" answer=0 explain="Wait, this depends on $p$. Form: $\\phi(p^2) = p^2 - p = p(p-1)$. Type 0 to mark this 'depends on p'. The actual formula: $\\phi(p^k) = p^k - p^{k-1} = p^{k-1}(p - 1)$.":::

:::widget type=numeric-input prompt="By Euler's theorem with $\\phi(15) = 8$: $2^8 \\bmod 15 = ?$" answer=1 explain="$2^8 = 256 = 17 \\cdot 15 + 1$. ✓":::

## Symbolic

**Fermat's little theorem**: for prime $p$ and any integer $a$,

$$
a^p \equiv a \pmod p,
$$

and if $p \nmid a$, then $a^{p-1} \equiv 1 \pmod p$.

**Euler's totient** ($\phi(n)$ or $\varphi(n)$):

$$
\phi(n) = |\{k \in \{1, 2, \ldots, n\} : \gcd(k, n) = 1\}|.
$$

For $n = p_1^{a_1} \cdots p_r^{a_r}$:

$$
\phi(n) = n \prod_{i=1}^r \left(1 - \frac{1}{p_i}\right) = \prod_{i=1}^r p_i^{a_i - 1} (p_i - 1).
$$

**Euler's theorem**: for $\gcd(a, n) = 1$,

$$
a^{\phi(n)} \equiv 1 \pmod n.
$$

(Fermat's is the special case $n = p$, since $\phi(p) = p - 1$.)

A useful consequence: for $\gcd(a, n) = 1$, the **multiplicative
order** of $a$ modulo $n$ — the smallest positive $k$ with $a^k
\equiv 1 \pmod n$ — must divide $\phi(n)$.

## Computational

```python
import math

def euler_totient(n):
    result = n
    p = 2
    while p * p <= n:
        if n % p == 0:
            while n % p == 0:
                n //= p
            result -= result // p
        p += 1
    if n > 1:
        result -= result // n
    return result

print(euler_totient(12))     # 4
print(euler_totient(35))     # 24
print(euler_totient(100))    # 40

# Verify Fermat's little theorem
for p in [7, 11, 13, 17]:
    for a in range(1, p):
        assert pow(a, p-1, p) == 1
print("Fermat verified for primes 7, 11, 13, 17")
```

## Derivational

*Why* does Fermat's little theorem hold?

For any prime $p$, the integers $\{1, 2, \ldots, p-1\}$ form a group
under multiplication modulo $p$ (every element has an inverse —
Strand 1 Intermediate Lesson 03). For any $a$ coprime to $p$, the
function $f(x) = ax \bmod p$ is a **permutation** of this group.

So multiplying $1 \cdot 2 \cdots (p-1)$ in two ways:

$$
(p-1)! \equiv \prod_{x} (ax) = a^{p-1} \cdot (p-1)! \pmod p.
$$

Cancel $(p-1)!$ (it's coprime to $p$): $a^{p-1} \equiv 1 \pmod p$. ✓

Euler's theorem follows by replacing the group $(\mathbb{Z}/p\mathbb{Z})^*$
with $(\mathbb{Z}/n\mathbb{Z})^*$, of size $\phi(n)$.

## Applied

- **RSA encryption** (next lesson) is built on Euler's theorem
  applied to $n = pq$.
- **Primality testing**: Fermat's gives a fast probabilistic test:
  if $a^{p-1} \not\equiv 1 \pmod p$, then $p$ is composite. (Fails
  for Carmichael numbers — see Strand 13.)
- **Multiplicative inverses**: $a^{-1} \equiv a^{\phi(n) - 1} \pmod
  n$ for $\gcd(a, n) = 1$.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\phi(7) = ?$" answer=6 explain="For prime $p$, $\\phi(p) = p - 1 = 6$.":::

:::widget type=numeric-input prompt="$3^{6} \\bmod 7 = ?$" answer=1 explain="By Fermat.":::

:::widget type=numeric-input prompt="$\\phi(36) = \\phi(2^2 \\cdot 3^2) = 36(1 - 1/2)(1 - 1/3) = ?$" answer=12 explain="$36 \\cdot 1/2 \\cdot 2/3 = 12$.":::

:::widget type=numeric-input prompt="By Euler with $\\phi(9) = 6$: $4^6 \\bmod 9 = ?$" answer=1 explain="$\\gcd(4, 9) = 1$, so Euler applies. $4^6 = 4096 = 455 \\cdot 9 + 1$. ✓":::
