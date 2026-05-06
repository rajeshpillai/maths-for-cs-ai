---
strand: computation
level: advanced
order: 3
title: RSA in Depth
prerequisites:
  - tier: strand-7-computation-advanced
    slug: 02-svd-and-pca
    description: SVD and PCA
connections:
  - strand-7-computation-advanced/04-elliptic-curves
applications:
  - cs: "Public-key crypto, TLS, SSH, code signing"
  - life: "Encryption that anyone can apply but only the holder can undo"
---

# RSA in Depth

## Explain Like I Am 7

Pick two huge prime numbers and multiply them together.  Easy peasy.
Now hand someone the giant product and dare them to find your two
primes — almost impossible, even with a school full of computers.
**RSA** locks secrets behind exactly that one-way door: anyone can use
the giant product to scramble a message *to* you, but only the person
who knows the original two primes can unscramble it.  It's a padlock
that the whole world can click shut, and only one person owns the
key.

## Mental

**RSA** (Rivest-Shamir-Adleman, 1977) was the first practical public-
key cryptosystem. Security rests on the difficulty of factoring large
integers $n = pq$.

## Setup

1. Choose two large random primes $p, q$ (typically 1024 bits each
   for $n = pq$ at 2048 bits).
2. Compute $\phi(n) = (p - 1)(q - 1)$.
3. Choose public exponent $e$ coprime to $\phi(n)$ (commonly
   $e = 65537$).
4. Compute private exponent $d \equiv e^{-1} \pmod{\phi(n)}$ via
   extended Euclidean.

**Public key**: $(n, e)$.
**Private key**: $d$ (or equivalently $p, q$).

## Encrypt and decrypt

Encrypt plaintext $m \in [0, n)$:

$$
c = m^e \mod n.
$$

Decrypt:

$$
m = c^d \mod n.
$$

Why this works: by Fermat-Euler, $m^{\phi(n)} \equiv 1 \pmod n$ for
$\gcd(m, n) = 1$. Then $m^{ed} \equiv m^{1 + k\phi(n)} \equiv m \pmod n$.

## Why factoring matters

If you can factor $n$, you recover $\phi(n)$, hence $d$, hence the
private key. Best classical factoring algorithm (general number-field
sieve) runs in $\exp(O((\ln n)^{1/3} (\ln \ln n)^{2/3}))$ — sub-
exponential but not polynomial.

For 2048-bit RSA: factoring is currently infeasible. Quantum
computers running Shor's algorithm would factor in polynomial time
— hence the rush to post-quantum crypto.

## Worked example: tiny RSA

$p = 11, q = 17, n = 187, \phi(n) = 160$.

Choose $e = 7$. $d \equiv 7^{-1} \pmod{160} \equiv 23$ (since
$7 \cdot 23 = 161 = 160 + 1$).

Encrypt $m = 5$: $c = 5^7 \mod 187 = 78125 \mod 187 = 50$.

Decrypt $c = 50$: $m = 50^{23} \mod 187 = 5$. ✓

## Interactive

:::widget type=numeric-input prompt="Tiny RSA: $p = 5, q = 7, n = ?$" answer=35 explain="$35$.":::

:::widget type=numeric-input prompt="$\\phi(35) = (5-1)(7-1) = ?$" answer=24 explain="$24$.":::

:::widget type=numeric-input prompt="Common public exponent $e = ?$" answer=65537 explain="$65537 = 2^{16} + 1$.":::

:::widget type=numeric-input prompt="RSA security rests on difficulty of factoring large $n$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**CRT speedup**: decryption $m = c^d \mod n$ can be computed as

$m_p = c^{d_p} \mod p$, $m_q = c^{d_q} \mod q$ then CRT-combine.

With $d_p = d \mod (p - 1), d_q = d \mod (q - 1)$. Roughly 4× faster
than direct decryption.

**Padding schemes**: raw RSA is **insecure** (deterministic, malleable).
Production uses:

- **OAEP**: probabilistic encryption padding.
- **PSS**: signature padding.

Without proper padding, RSA is vulnerable to chosen-ciphertext attacks
and signature forgery.

**Common attacks** when used incorrectly:

- **Bleichenbacher** (1998): PKCS#1 v1.5 oracle attacks.
- **Common-modulus**: same $n$ with different $e$ → recover plaintext.
- **Hastad's broadcast**: same low-$e$ ciphertext sent to several
  recipients with same $m$ → CRT recovers $m$.
- **Wiener's attack**: $d < n^{1/4} / 3$ recoverable via continued
  fractions.

## Computational

```python
from sympy import gcd, mod_inverse

def rsa_keygen(p, q, e=65537):
    n = p * q
    phi = (p - 1) * (q - 1)
    if gcd(e, phi) != 1:
        raise ValueError("Choose different e")
    d = mod_inverse(e, phi)
    return (n, e), (n, d)

# Tiny example
p, q = 11, 17
pub, priv = rsa_keygen(p, q, e=7)
print(pub, priv)                              # ((187, 7), (187, 23))

def rsa_encrypt(m, pub):
    n, e = pub
    return pow(m, e, n)

def rsa_decrypt(c, priv):
    n, d = priv
    return pow(c, d, n)

c = rsa_encrypt(5, pub)
print(c)                                       # 50
print(rsa_decrypt(c, priv))                    # 5

# CRT speedup decryption
def rsa_decrypt_crt(c, p, q, d):
    dp = d % (p - 1)
    dq = d % (q - 1)
    m_p = pow(c, dp, p)
    m_q = pow(c, dq, q)
    q_inv_p = pow(q, -1, p)
    h = (q_inv_p * (m_p - m_q)) % p
    return m_q + h * q

print(rsa_decrypt_crt(c, p, q, 23))            # 5
```

## Applied

- **TLS/HTTPS** — RSA used for key exchange and certificate
  signatures (now mostly ECDSA + ECDHE; RSA being phased out).
- **Code signing** — Microsoft, Apple, Google sign software updates
  with RSA / ECDSA.
- **PGP/GPG** — email encryption.
- **Blockchain** — Bitcoin uses ECDSA, but earlier signatures and
  many wallets use RSA.
- **SSH** — RSA host keys, though Ed25519 increasingly preferred.

## Check Your Understanding

:::widget type=numeric-input prompt="RSA: encrypt $c = m^e \\mod n$, decrypt $m = c^d \\mod n$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$d \\equiv e^{-1} \\pmod{\\phi(n)}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="RSA security rests on integer factorisation hardness. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Quantum computer running Shor's algorithm could break RSA. Type 1." answer=1 explain="Yes — polynomial-time factoring on quantum.":::
