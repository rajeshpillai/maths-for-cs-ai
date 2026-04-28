# Applications to Cryptography

## Intuition

Modern cryptography is built on abstract algebra. Diffie-Hellman key exchange
uses cyclic groups. AES encrypts bytes using $GF(2^8)$. Elliptic curve
cryptography uses the group law on curves over finite fields. Understanding
the algebra is understanding **why** these systems are secure.

## Prerequisites

- Tier 16, Lesson 10 (Fields and Extensions)
- Tier 13, Lesson 4: RSA Cryptography

## From First Principles

### Diffie-Hellman Key Exchange

**Setup**: public prime $p$, public generator $g$ of $\mathbb{Z}_p^*$.

1. Alice picks secret $a$, sends $A = g^a \bmod p$.
2. Bob picks secret $b$, sends $B = g^b \bmod p$.
3. Shared secret: $s = B^a = A^b = g^{ab} \bmod p$.

**Security**: computing $a$ from $g^a \bmod p$ is the **discrete logarithm problem** — believed to be hard for large primes.

**Why this works** (algebra):
- $(\mathbb{Z}_p^*, \times)$ is a cyclic group of order $p - 1$.
- $g$ is a generator, so $g^a$ hits every element.
- Exponentiation is a group homomorphism from $(\mathbb{Z}_{p-1}, +)$ to $(\mathbb{Z}_p^*, \times)$.

### AES and $GF(2^8)$

AES operates on bytes (elements of $GF(2^8)$) using:

$$GF(2^8) = \mathbb{Z}_2[x] / (x^8 + x^4 + x^3 + x + 1)$$

The **SubBytes** step: for each byte $b$, compute $b^{-1}$ in $GF(2^8)$ (with $0 \mapsto 0$), then apply an affine transformation.

Why $GF(2^8)$? It has exactly 256 elements (one per byte), and the multiplicative group $GF(2^8)^*$ is cyclic of order 255, giving excellent non-linearity.

### Elliptic Curves over Finite Fields

An **elliptic curve** over $GF(p)$ (for prime $p > 3$):

$$E: y^2 = x^3 + ax + b \pmod{p}, \quad 4a^3 + 27b^2 \neq 0$$

The points on $E$ (plus a point at infinity $\mathcal{O}$) form an **abelian group** under a geometric addition law.

**Point addition**: given $P = (x_1, y_1)$ and $Q = (x_2, y_2)$:

If $P \neq Q$: slope $m = \frac{y_2 - y_1}{x_2 - x_1} \bmod p$

If $P = Q$: slope $m = \frac{3x_1^2 + a}{2y_1} \bmod p$

Then $R = P + Q$: $x_3 = m^2 - x_1 - x_2 \bmod p$, $y_3 = m(x_1 - x_3) - y_1 \bmod p$.

### Pen & Paper: Small Elliptic Curve

$E: y^2 = x^3 + x + 1$ over $GF(5)$ (so $a=1, b=1, p=5$).

Find all points: for each $x \in \{0,1,2,3,4\}$, compute $x^3 + x + 1 \bmod 5$, check if it is a quadratic residue.

| $x$ | $x^3 + x + 1 \bmod 5$ | $y^2$ | $y$ values |
|-----|----------------------|-------|------------|
| 0 | 1 | 1 | 1, 4 |
| 1 | 3 | 3 | none ($3$ is not a QR mod 5) |
| 2 | 11 mod 5 = 1 | 1 | 1, 4 |
| 3 | 31 mod 5 = 1 | 1 | 1, 4 |
| 4 | 69 mod 5 = 4 | 4 | 2, 3 |

Points: $(0,1), (0,4), (2,1), (2,4), (3,1), (3,4), (4,2), (4,3)$ plus $\mathcal{O}$.

$|E(GF(5))| = 9$.

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

# Visualise elliptic curve points over GF(p)
fig, axes = plt.subplots(1, 2, figsize=(10, 5))

# Left: Real curve for intuition
ax = axes[0]
x = np.linspace(-2, 3, 500)
a, b = 1, 1
rhs = x**3 + a*x + b
mask = rhs >= 0
ax.plot(x[mask], np.sqrt(rhs[mask]), 'b-', linewidth=2)
ax.plot(x[mask], -np.sqrt(rhs[mask]), 'b-', linewidth=2)
ax.set_title('y² = x³ + x + 1 over R')
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.grid(True, alpha=0.3)
ax.set_aspect('equal')
ax.set_xlim(-2, 3)
ax.set_ylim(-4, 4)

# Right: Points over GF(5)
ax = axes[1]
p = 5
points = []
for x_val in range(p):
    rhs_val = (x_val**3 + a*x_val + b) % p
    for y_val in range(p):
        if (y_val**2) % p == rhs_val:
            points.append((x_val, y_val))

xs = [pt[0] for pt in points]
ys = [pt[1] for pt in points]
ax.scatter(xs, ys, s=100, c='red', zorder=5)
for x_val, y_val in points:
    ax.text(x_val + 0.1, y_val + 0.1, f'({x_val},{y_val})', fontsize=8)
ax.set_title(f'E(GF({p})): {len(points)} points + O')
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_xticks(range(p))
ax.set_yticks(range(p))
ax.grid(True, alpha=0.3)

plt.suptitle('Elliptic Curve: y² = x³ + x + 1', fontsize=13)
plt.tight_layout()
plt.savefig('elliptic_curve.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Cryptographic Applications of Abstract Algebra ───────

# Step 1: Diffie-Hellman key exchange
print("=== Diffie-Hellman Key Exchange ===")
p = 23  # small prime for demonstration
g = 5   # generator of Z_23*

# Alice's secret
a = 6
A = pow(g, a, p)
print(f"Alice: secret a={a}, sends A = g^a mod p = {A}")

# Bob's secret
b = 15
B = pow(g, b, p)
print(f"Bob:   secret b={b}, sends B = g^b mod p = {B}")

# Shared secret
s_alice = pow(B, a, p)
s_bob = pow(A, b, p)
print(f"Shared secret (Alice): B^a mod p = {s_alice}")
print(f"Shared secret (Bob):   A^b mod p = {s_bob}")
print(f"Match: {s_alice == s_bob}")

# Step 2: Verify g is a generator of Z_p*
print(f"\nPowers of g={g} in Z_{p}*:")
powers = set()
current = 1
for i in range(p - 1):
    current = (current * g) % p
    powers.add(current)
print(f"  Generated {len(powers)} elements (need {p-1})")
print(f"  g={g} is a generator: {len(powers) == p - 1}")

# Step 3: AES S-box (GF(2^8) inversion)
print("\n=== AES GF(2^8) Inversion ===")
MODULUS = 0x11B  # x^8 + x^4 + x^3 + x + 1

def gf256_mul(a, b):
    result = 0
    while b:
        if b & 1:
            result ^= a
        a <<= 1
        if a & 0x100:
            a ^= MODULUS
        b >>= 1
    return result

def gf256_inv(a):
    if a == 0:
        return 0
    # Use Fermat's little theorem: a^{-1} = a^{254} in GF(256)
    result = a
    for _ in range(6):  # compute a^{254} = a^{2^7 - 2}
        result = gf256_mul(result, result)
        result = gf256_mul(result, a)
    result = gf256_mul(result, result)  # final square without multiply
    return result

# Verify a few inverses
for a in [0x01, 0x02, 0x03, 0x53, 0xFF]:
    inv = gf256_inv(a)
    product = gf256_mul(a, inv) if a != 0 else 0
    print(f"  0x{a:02X}^(-1) = 0x{inv:02X}, check: {product}")

# Step 4: Elliptic curve arithmetic
print("\n=== Elliptic Curve over GF(23) ===")
p = 23
a_coeff, b_coeff = 1, 1  # y^2 = x^3 + x + 1

def mod_inv(a, p):
    return pow(a, p - 2, p)

def ec_add(P, Q, a, p):
    """Add two points on y^2 = x^3 + ax + b over GF(p)."""
    if P is None:
        return Q
    if Q is None:
        return P
    x1, y1 = P
    x2, y2 = Q
    if x1 == x2 and y1 == (p - y2) % p:
        return None  # point at infinity
    if P == Q:
        m = (3 * x1 * x1 + a) * mod_inv(2 * y1, p) % p
    else:
        m = (y2 - y1) * mod_inv(x2 - x1, p) % p
    x3 = (m * m - x1 - x2) % p
    y3 = (m * (x1 - x3) - y1) % p
    return (x3, y3)

# Find points on the curve
points = [None]  # point at infinity
for x in range(p):
    rhs = (x**3 + a_coeff * x + b_coeff) % p
    for y in range(p):
        if (y * y) % p == rhs:
            points.append((x, y))

print(f"Number of points (including O): {len(points)}")

# Demonstrate point addition
P = points[1]
Q = points[2]
R = ec_add(P, Q, a_coeff, p)
print(f"P = {P}")
print(f"Q = {Q}")
print(f"P + Q = {R}")

# Verify R is on the curve
if R is not None:
    lhs = (R[1] ** 2) % p
    rhs = (R[0] ** 3 + a_coeff * R[0] + b_coeff) % p
    print(f"R on curve: {lhs} == {rhs}: {lhs == rhs}")
```

## Connection to CS / Games / AI / Business / Industry

- **HTTPS/TLS**: uses elliptic curve Diffie-Hellman (ECDH) for key exchange in every secure web connection.
- **Bitcoin**: uses the elliptic curve secp256k1 for digital signatures.
- **Secure messaging** (Signal protocol): uses Curve25519 (an elliptic curve over a large prime field).
- **Post-quantum cryptography**: lattice-based schemes use algebraic structures (module lattices over polynomial rings).
- **Zero-knowledge proofs** (ZK-SNARKs): use pairings on elliptic curves over finite fields.
- **Visa/Mastercard EMV chip-and-PIN** — every contactless tap-to-pay terminal worldwide runs ECDSA over secp256r1 (NIST P-256) in the chip; about $10 trillion/year in card volume rides on this curve's group law.
- **NIST PQC standardization (FIPS 203/204/205, August 2024)** — Kyber, Dilithium, SPHINCS+ replace ECC for sectors where data must remain secret beyond a quantum computer's eventual arrival; the U.S. NSA's CNSA 2.0 mandate forces migration by 2035 for classified systems.
- **Apple iMessage and WhatsApp E2E encryption** — uses Curve25519 (Bernstein, 2005) for key agreement; about 5 billion devices send hundreds of billions of messages per day protected by this single elliptic curve group.
- **HSM and TPM hardware modules** — Thales Luna, Yubico YubiKey, and Microsoft Pluton chips implement these field/group operations in tamper-resistant silicon; financial regulators (PCI-HSM, FIPS 140-3) certify them for key custody at JPMorgan, Coinbase, and SWIFT.

## Check Your Understanding

1. Perform a Diffie-Hellman exchange with $p = 29$, $g = 2$, $a = 5$, $b = 12$. What is the shared secret?
2. Find all points on the elliptic curve $y^2 = x^3 + 2x + 3$ over $GF(7)$.
3. Why is the discrete logarithm problem hard in $\mathbb{Z}_p^*$ but easy in $(\mathbb{Z}_p, +)$? What algebraic property makes the difference?
