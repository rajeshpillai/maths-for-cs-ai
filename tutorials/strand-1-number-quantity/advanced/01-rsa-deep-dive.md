---
strand: number-quantity
level: advanced
order: 1
title: RSA — Cryptography from First Principles
prerequisites:
  - tier: strand-1-number-quantity-advanced
    slug: 00-fermat-and-euler-totient
    description: Fermat's little theorem, Euler's totient
connections:
  - strand-1-number-quantity-advanced/02-multiplicative-order
applications:
  - cs: "Every HTTPS connection, SSH, GPG, secure messaging"
  - business: "Online payments, digital signatures, secure email"
  - life: "Padlock icon in your browser bar"
---

# RSA — Cryptography from First Principles

## Mental

**RSA** (Rivest-Shamir-Adleman, 1977) is the public-key cryptosystem
that secured the early commercial internet. The mathematical
ingredients:

1. Pick two large primes $p, q$. Compute $n = pq$.
2. Compute $\phi(n) = (p-1)(q-1)$.
3. Pick public exponent $e$ coprime to $\phi(n)$ (often $e = 65537$).
4. Compute private exponent $d \equiv e^{-1} \pmod{\phi(n)}$ via
   extended Euclid.
5. Public key: $(n, e)$. Private key: $d$.

To **encrypt** message $m < n$: $c = m^e \bmod n$.
To **decrypt** $c$: $m = c^d \bmod n$.

The security claim: knowing $(n, e)$ does not let you compute $d$
unless you know $\phi(n)$ — and $\phi(n) = (p-1)(q-1)$ requires
factoring $n$. **Factoring $n$ is hard for large $n$**; that
intractability is RSA's security foundation.

## Why decryption recovers the message

By Euler's theorem (Lesson 00): $m^{\phi(n)} \equiv 1 \pmod n$ for
$\gcd(m, n) = 1$.

Since $ed \equiv 1 \pmod{\phi(n)}$, write $ed = 1 + k\phi(n)$ for
some integer $k$. Then

$$
c^d = (m^e)^d = m^{ed} = m^{1 + k\phi(n)} = m \cdot (m^{\phi(n)})^k \equiv m \cdot 1^k = m \pmod n.
$$

The encryption/decryption pair just **flips** $m \to m^e$ and back via
$m^{ed} \equiv m$.

(The case $\gcd(m, n) \ne 1$ requires a slightly more careful
argument via the Chinese Remainder Theorem; Strand 13 develops it.)

## Worked example with small primes

Pick $p = 11, q = 13$. So $n = 143$, $\phi(n) = 10 \cdot 12 = 120$.

Pick $e = 7$. $\gcd(7, 120) = 1$. ✓

Compute $d \equiv 7^{-1} \pmod{120}$. Extended Euclid: $7 \cdot 103 =
721 = 6 \cdot 120 + 1$. So $d = 103$.

Encrypt $m = 9$: $c = 9^7 \bmod 143$. $9^2 = 81$, $9^4 = 81^2 \bmod
143 = 6561 \bmod 143 = 126$, $9^7 = 9^4 \cdot 9^2 \cdot 9 = 126 \cdot
81 \cdot 9 \bmod 143 = 91854 \bmod 143 = 48$. So $c = 48$.

Decrypt: $48^{103} \bmod 143 = ?$ — large but computable via fast
modular exponentiation. Result: $9$. ✓

## Interactive

:::widget type=numeric-input prompt="With $p = 5, q = 7$: $n = ?$" answer=35 explain="$5 \\cdot 7 = 35$.":::

:::widget type=numeric-input prompt="$\\phi(35) = (5-1)(7-1) = ?$" answer=24 explain="$24$.":::

:::widget type=numeric-input prompt="Pick $e = 5$ (coprime to $24$). Find $d$ such that $5d \\equiv 1 \\pmod{24}$. (Try small values.)" answer=5 explain="$5 \\cdot 5 = 25 \\equiv 1 \\pmod{24}$. So $d = 5$. (For this small example, $e = d$ — only because of small numbers.)":::

:::widget type=numeric-input prompt="With $(n=35, e=5)$, encrypt $m = 2$: $2^5 \\bmod 35 = ?$" answer=32 explain="$2^5 = 32 < 35$.":::

:::widget type=numeric-input prompt="Decrypt $c = 32$ with $d = 5$: $32^5 \\bmod 35 = ?$ — should recover $2$." answer=2 explain="$32^5$ is large; compute mod 35 throughout. Or note $32 \\equiv -3 \\pmod{35}$. $(-3)^5 = -243 \\equiv -243 + 7 \\cdot 35 = 2 \\pmod{35}$. ✓":::

## Symbolic

The RSA recipe:

1. Choose primes $p, q$. Compute $n = pq$ and $\lambda = (p-1)(q-1)$.
   (We use $\lambda$ instead of $\phi(n)$; conventions vary — for
   pedagogy they're interchangeable.)
2. Pick $e$ coprime to $\lambda$.
3. Compute $d \equiv e^{-1} \pmod \lambda$.
4. Publish $(n, e)$. Keep $d$ secret. Discard $p, q$.

Encryption: $c = m^e \bmod n$.
Decryption: $m = c^d \bmod n$.

**Security**: depends on the difficulty of factoring $n$. For real
RSA, $n$ is at least $2048$ bits ($\sim 600$ digits) — factorisation
beyond practical reach with current algorithms. Quantum computers
(Shor's algorithm) would break it; "post-quantum" cryptography is
an active research area.

## Computational

```python
def gcd_ext(a, b):
    if b == 0: return a, 1, 0
    g, x, y = gcd_ext(b, a % b)
    return g, y, x - (a // b) * y

def mod_inverse(a, n):
    g, x, _ = gcd_ext(a, n)
    if g != 1: raise ValueError("not coprime")
    return x % n

def rsa_keygen(p, q, e=65537):
    n = p * q
    phi = (p - 1) * (q - 1)
    if (1 < e < phi) and gcd_ext(e, phi)[0] == 1:
        d = mod_inverse(e, phi)
    else:
        raise ValueError("e not coprime to phi")
    return (n, e), d

def encrypt(m, n, e):
    return pow(m, e, n)

def decrypt(c, n, d):
    return pow(c, d, n)

# Tiny example
(n, e), d = rsa_keygen(11, 13, e=7)
print(n, e, d)         # 143, 7, 103
m = 9
c = encrypt(m, n, e)
print(c)               # 48
print(decrypt(c, n, d))  # 9 ✓
```

For real cryptography use a vetted library (`cryptography`, `pycryptodome`),
not a hand-rolled implementation.

## Applied

- **HTTPS / TLS**: every secure web connection negotiates a session
  using RSA (or related public-key methods). The padlock icon
  represents successful key exchange.
- **GPG / digital signatures**: signing email or git commits uses
  RSA's reverse — sign with private $d$, verify with public $e$.
- **SSH**: server authentication via RSA key pairs.
- **Post-quantum**: lattice-based and code-based cryptography is
  being standardised to replace RSA before quantum computers arrive.

## Check Your Understanding

:::widget type=numeric-input prompt="With $p = 3, q = 11$: $n = ?$" answer=33 explain="$3 \\cdot 11 = 33$.":::

:::widget type=numeric-input prompt="$\\phi(33) = ?$" answer=20 explain="$(3-1)(11-1) = 20$.":::

:::widget type=numeric-input prompt="Pick $e = 3$ (coprime to $20$). Find $d$ with $3d \\equiv 1 \\pmod{20}$. (Try $d = 7$.)" answer=7 explain="$3 \\cdot 7 = 21 \\equiv 1 \\pmod{20}$. ✓":::

:::widget type=numeric-input prompt="Encrypt $m = 4$ with $(n = 33, e = 3)$: $4^3 \\bmod 33 = ?$" answer=31 explain="$64 \\bmod 33 = 31$.":::
