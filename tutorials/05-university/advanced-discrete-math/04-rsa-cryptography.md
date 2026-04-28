# RSA Cryptography from First Principles

## Intuition

Imagine a padlock that anyone can snap shut (public key) but only you can open
(private key). RSA achieves this with pure number theory: multiplying two large
primes is easy, but factoring their product is computationally infeasible. The
magic that makes encryption and decryption inverses of each other is Euler's
theorem — a result about modular exponentiation we derived in the last lesson.

## Prerequisites

- **Tier 13, Lesson 3** — Fermat's little theorem, Euler's totient function

## From First Principles

### Key Generation (pen & paper)

1. Choose two distinct primes $p$ and $q$.
2. Compute $n = p \cdot q$ (the modulus).
3. Compute $\phi(n) = (p-1)(q-1)$.
4. Choose $e$ such that $1 < e < \phi(n)$ and $\gcd(e, \phi(n)) = 1$.
5. Compute $d = e^{-1} \pmod{\phi(n)}$ (the private exponent).

**Public key:** $(n, e)$. **Private key:** $(n, d)$.

### Encryption and Decryption

- **Encrypt:** $c = m^e \bmod n$
- **Decrypt:** $m = c^d \bmod n$

### Why It Works

We need to show $m^{ed} \equiv m \pmod{n}$.

Since $ed \equiv 1 \pmod{\phi(n)}$, write $ed = 1 + k \cdot \phi(n)$ for some integer $k$.

$$m^{ed} = m^{1 + k\phi(n)} = m \cdot (m^{\phi(n)})^k$$

By Euler's theorem (when $\gcd(m, n) = 1$): $m^{\phi(n)} \equiv 1 \pmod{n}$.

$$m^{ed} \equiv m \cdot 1^k = m \pmod{n} \quad \blacksquare$$

### Worked Example (small numbers)

1. $p = 11$, $q = 13$, so $n = 143$.
2. $\phi(143) = 10 \times 12 = 120$.
3. Choose $e = 7$ (coprime to 120, since $\gcd(7, 120) = 1$).
4. Find $d$: $7d \equiv 1 \pmod{120}$.
   Extended Euclidean: $120 = 17 \cdot 7 + 1$, so $1 = 120 - 17 \cdot 7$.
   Thus $d \equiv -17 \equiv 103 \pmod{120}$.
5. Check: $7 \times 103 = 721 = 6 \times 120 + 1$. Correct.

**Encrypt** $m = 9$: $c = 9^7 \bmod 143$.

$9^2 = 81$, $9^4 = 81^2 = 6561 \bmod 143 = 6561 - 45 \times 143 = 6561 - 6435 = 126$.
$9^7 = 9^4 \cdot 9^2 \cdot 9 = 126 \cdot 81 \cdot 9 \bmod 143$.
$126 \cdot 81 = 10206 \bmod 143 = 10206 - 71 \times 143 = 10206 - 10153 = 53$.
$53 \cdot 9 = 477 \bmod 143 = 477 - 3 \times 143 = 477 - 429 = 48$.
So $c = 48$.

**Decrypt** $c = 48$: $m = 48^{103} \bmod 143 = 9$. (Verified by Python below.)

### Visualisation

```python
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

fig, ax = plt.subplots(figsize=(12, 5))
ax.set_xlim(0, 12); ax.set_ylim(0, 6); ax.axis('off')
ax.set_title("RSA Key Generation and Message Flow", fontsize=14, fontweight='bold')

# Key generation box
kg = mpatches.FancyBboxPatch((0.5, 3.5), 3, 2, boxstyle="round,pad=0.2",
                              facecolor='lightyellow', edgecolor='black')
ax.add_patch(kg)
ax.text(2, 5.1, "Key Generation", ha='center', fontsize=11, fontweight='bold')
ax.text(2, 4.7, "p=11, q=13", ha='center', fontsize=9)
ax.text(2, 4.3, "n=143, phi=120", ha='center', fontsize=9)
ax.text(2, 3.9, "e=7, d=103", ha='center', fontsize=9)

# Public key
pub = mpatches.FancyBboxPatch((4.5, 4.2), 2.5, 1.2, boxstyle="round,pad=0.2",
                               facecolor='lightgreen', edgecolor='black')
ax.add_patch(pub)
ax.text(5.75, 5, "Public Key", ha='center', fontsize=10, fontweight='bold')
ax.text(5.75, 4.5, "(n=143, e=7)", ha='center', fontsize=10)

# Private key
priv = mpatches.FancyBboxPatch((4.5, 2.5), 2.5, 1.2, boxstyle="round,pad=0.2",
                                facecolor='lightsalmon', edgecolor='black')
ax.add_patch(priv)
ax.text(5.75, 3.3, "Private Key", ha='center', fontsize=10, fontweight='bold')
ax.text(5.75, 2.8, "(n=143, d=103)", ha='center', fontsize=10)

# Encrypt
enc = mpatches.FancyBboxPatch((8, 4.2), 3, 1.2, boxstyle="round,pad=0.2",
                               facecolor='lightblue', edgecolor='black')
ax.add_patch(enc)
ax.text(9.5, 5, "Encrypt", ha='center', fontsize=10, fontweight='bold')
ax.text(9.5, 4.5, "c = 9^7 mod 143 = 48", ha='center', fontsize=9)

# Decrypt
dec = mpatches.FancyBboxPatch((8, 2.5), 3, 1.2, boxstyle="round,pad=0.2",
                               facecolor='plum', edgecolor='black')
ax.add_patch(dec)
ax.text(9.5, 3.3, "Decrypt", ha='center', fontsize=10, fontweight='bold')
ax.text(9.5, 2.8, "m = 48^103 mod 143 = 9", ha='center', fontsize=9)

# Arrows
ax.annotate('', xy=(4.5, 4.8), xytext=(3.5, 4.5), arrowprops=dict(arrowstyle='->', lw=1.5))
ax.annotate('', xy=(4.5, 3.1), xytext=(3.5, 4.0), arrowprops=dict(arrowstyle='->', lw=1.5))
ax.annotate('', xy=(8, 4.8), xytext=(7, 4.8), arrowprops=dict(arrowstyle='->', lw=1.5))
ax.annotate('', xy=(8, 3.1), xytext=(7, 3.1), arrowprops=dict(arrowstyle='->', lw=1.5))

plt.tight_layout()
plt.savefig("rsa_flow.png", dpi=100)
plt.show()
```

## Python Verification

```python
import math

# ── RSA from scratch ─────────────────────────────────────
def extended_gcd(a, b):
    if b == 0:
        return a, 1, 0
    g, x1, y1 = extended_gcd(b, a % b)
    return g, y1, x1 - (a // b) * y1

def mod_inverse(a, m):
    g, x, _ = extended_gcd(a % m, m)
    assert g == 1, f"No inverse: gcd({a},{m})={g}"
    return x % m

# Step 1: Key generation
p, q = 11, 13
n = p * q                        # 143
phi_n = (p - 1) * (q - 1)        # 120
e = 7
d = mod_inverse(e, phi_n)        # 103
print(f"p={p}, q={q}, n={n}, phi={phi_n}, e={e}, d={d}")
print(f"Check: e*d mod phi = {(e * d) % phi_n}")  # must be 1

# Step 2: Encrypt
m = 9
c = pow(m, e, n)
print(f"\nEncrypt: {m}^{e} mod {n} = {c}")  # 48

# Step 3: Decrypt
m_recovered = pow(c, d, n)
print(f"Decrypt: {c}^{d} mod {n} = {m_recovered}")  # 9

# Step 4: Encrypt all valid messages
print("\nFull encrypt-decrypt cycle for m = 0..15:")
for msg in range(16):
    ct = pow(msg, e, n)
    pt = pow(ct, d, n)
    status = "OK" if pt == msg else "FAIL"
    print(f"  m={msg:3d} -> c={ct:3d} -> m'={pt:3d}  [{status}]")

# Step 5: Larger (but still toy) example
p2, q2 = 61, 53
n2 = p2 * q2                     # 3233
phi2 = (p2-1) * (q2-1)           # 3120
e2 = 17
d2 = mod_inverse(e2, phi2)       # 2753
print(f"\nLarger: n={n2}, e={e2}, d={d2}")
message = 65  # 'A' in ASCII
cipher = pow(message, e2, n2)
plain = pow(cipher, d2, n2)
print(f"  Encrypt 'A' (65): c={cipher}, Decrypt: m={plain}")
```

## Connection to CS / Games / AI / Business / Industry

- **HTTPS/TLS:** Every secure web connection uses RSA (or similar) for key
  exchange. Your browser verifies server certificates using RSA signatures.
- **Digital signatures:** Sign with private key, verify with public key —
  the same math in reverse proves authenticity.
- **Blockchain:** Cryptocurrency wallets use public-key cryptography
  (typically elliptic curve, but RSA illustrates the same principle).
- **AI model distribution:** Signed model weights ensure integrity — RSA
  signatures prevent tampering with deployed neural networks.

## Check Your Understanding

1. Generate RSA keys with $p = 17$, $q = 19$ by hand. Encrypt $m = 5$ and
   decrypt it to verify the round-trip.
2. What happens if you try to encrypt $m = 0$ or $m = 1$? Why is this a
   problem in practice?
3. Why must $p$ and $q$ be kept secret, even though $n = pq$ is public?
   (Hint: what could an attacker compute if they knew $p$ and $q$?)
