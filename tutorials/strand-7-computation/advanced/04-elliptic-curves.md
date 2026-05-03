---
strand: computation
level: advanced
order: 4
title: Elliptic-Curve Cryptography
prerequisites:
  - tier: strand-7-computation-advanced
    slug: 03-rsa-deep
    description: RSA in depth
connections:
  - strand-7-computation-advanced/05-aes-and-symmetric
applications:
  - cs: "Bitcoin/Ethereum signatures, mobile TLS, modern HTTPS"
  - life: "Same security, much smaller keys"
---

# Elliptic-Curve Cryptography

## Mental

An **elliptic curve** over a field $F$ is the set of $(x, y)$
satisfying

$$
y^2 = x^3 + a x + b
$$

(plus a "point at infinity" $\mathcal O$). Over $\mathbb{R}$ this
draws a smooth curve; over $\mathbb{F}_p$ it's a finite set of
points.

The points form an **abelian group** under a geometric "chord and
tangent" addition law:

- $P + Q$: draw line through $P, Q$; intersects curve at third point
  $R$; reflect across $x$-axis.
- $\mathcal O$ is identity.
- Inverse of $(x, y)$ is $(x, -y)$.

## ECC security

**Discrete log on elliptic curves (ECDLP)**: given $P$ and $Q = nP$
(scalar multiplication: $P + P + \ldots + P$, $n$ times), find $n$.

Best classical algorithm: **Pollard's rho** in $O(\sqrt n)$ time.
For 256-bit curves: $\sim 2^{128}$ operations — infeasible.

So an elliptic curve over a 256-bit field gives the equivalent of
3072-bit RSA security. **Smaller keys, faster ops**.

## Worked example: tiny curve

$y^2 = x^3 + x + 1$ over $\mathbb{F}_5$.

Points satisfying this:

| $x$ | $x^3 + x + 1$ | Square root mod 5? | Points |
|---|---|---|---|
| 0 | 1 | $\pm 1$ | $(0, 1), (0, 4)$ |
| 1 | 3 | not a square mod 5 | none |
| 2 | 1 | $\pm 1$ | $(2, 1), (2, 4)$ |
| 3 | 1 | $\pm 1$ | $(3, 1), (3, 4)$ |
| 4 | 4 | $\pm 2$ | $(4, 2), (4, 3)$ |

Plus $\mathcal O$. Total 9 points — a finite group.

## Key exchange (ECDH)

Standard Diffie-Hellman in EC:

1. Alice picks random $a$, sends $aG$ where $G$ is a fixed generator.
2. Bob picks random $b$, sends $bG$.
3. Shared secret: $abG$ (Alice computes $a(bG)$, Bob computes $b(aG)$).

Eve, seeing $aG$ and $bG$, must compute $abG$ — equivalent to ECDLP
hardness.

## Interactive

:::widget type=numeric-input prompt="ECDLP best classical algorithm: Pollard's rho, $O(\\sqrt n)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="256-bit ECC security level: $\\sim 2^{?}$ operations to break." answer=128 explain="$128$.":::

:::widget type=numeric-input prompt="Equivalent RSA key size for 256-bit ECC security: ~$3072$. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="ECDH and ECDSA both rely on ECDLP. Type 1." answer=1 explain="Yes.":::

## Symbolic

**ECDSA** (Elliptic Curve Digital Signature Algorithm): EC analogue
of DSA.

To sign message $m$ with private key $d$ (and public $Q = dG$):

1. Random $k \in [1, n-1]$.
2. $(x_1, y_1) = kG$, set $r = x_1 \mod n$.
3. $s = k^{-1}(h(m) + r d) \mod n$.
4. Signature: $(r, s)$.

Reusing $k$ — like the **PS3 hack** (Sony, 2010) — leaks the private
key. Modern signatures use deterministic $k$ via RFC 6979.

**Standard curves**:

- **NIST P-256, P-384, P-521** — older ECDSA standard.
- **secp256k1** — Bitcoin's curve.
- **Curve25519, Ed25519** (Bernstein) — preferred for new
  applications: faster, simpler, side-channel resistant.

## Computational

```python
# Use cryptography library's EC primitives
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives import hashes

# Key generation
private_key = ec.generate_private_key(ec.SECP256K1())
public_key = private_key.public_key()

# Sign and verify
message = b"Sign me"
signature = private_key.sign(message, ec.ECDSA(hashes.SHA256()))
public_key.verify(signature, message, ec.ECDSA(hashes.SHA256()))
print("verified")

# Manual EC arithmetic on a tiny curve
P = 23                  # prime field
A = 1; B = 1            # y^2 = x^3 + x + 1
def is_on_curve(x, y):
    return (y * y) % P == (x*x*x + A*x + B) % P

print(is_on_curve(0, 1))    # True (0^3 + 0 + 1 = 1 = 1^2)
print(is_on_curve(3, 10))   # True (27+3+1=31 mod 23 = 8 = ... 10^2=100 mod 23 = 8 ✓)

# Point doubling: (x, y) + (x, y) = ?
def point_double(x, y):
    if y == 0: return None
    s = (3 * x * x + A) * pow(2 * y, -1, P) % P
    x_r = (s * s - 2 * x) % P
    y_r = (s * (x - x_r) - y) % P
    return (x_r, y_r)

print(point_double(0, 1))   # 2 * (0, 1) on the curve
```

## Applied

- **Bitcoin / Ethereum** — signatures use secp256k1 ECDSA.
- **Apple iMessage** — ECDH for key agreement.
- **WhatsApp Signal protocol** — Curve25519 for key exchange.
- **TLS 1.3** — ECDHE (ephemeral) for forward-secure key agreement.
- **SSH** — Ed25519 for new host keys.
- **Smart cards / NFC** — small key sizes make ECC the standard
  on memory-constrained devices.

## Check Your Understanding

:::widget type=numeric-input prompt="ECC has same security as much larger RSA at smaller key sizes. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="ECDLP hardness underpins ECC security. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Bitcoin uses secp256k1 for ECDSA. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Reusing the random $k$ in ECDSA leaks private key. Type 1." answer=1 explain="Yes — Sony's PS3 mistake.":::
