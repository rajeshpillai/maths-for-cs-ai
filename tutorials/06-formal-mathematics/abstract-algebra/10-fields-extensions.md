# Field Extensions and Finite Fields

## Intuition

The rationals have no $\sqrt{2}$, so we "extend" to $\mathbb{Q}(\sqrt{2})$.
The reals have no $\sqrt{-1}$, so we extend to $\mathbb{C}$. In CS, the most
important extensions are **finite fields** $GF(p^n)$: they have a fixed number
of elements, perfect for computation, and power everything from AES to
Reed-Solomon codes to elliptic curve cryptography.

## Prerequisites

- Tier 16, Lesson 9 (Ideals and Quotient Rings)

## From First Principles

### Field Extension

If $F \subseteq E$ are both fields, then $E$ is a **field extension** of $F$, written $E/F$.

$E$ is a vector space over $F$. The **degree** of the extension is $[E:F] = \dim_F(E)$.

### Example: $\mathbb{C}/\mathbb{R}$

$\mathbb{C} = \{a + bi : a, b \in \mathbb{R}\}$.

Basis over $\mathbb{R}$: $\{1, i\}$. So $[\mathbb{C}:\mathbb{R}] = 2$.

### Simple Extensions

$F(\alpha) = $ smallest field containing $F$ and $\alpha$.

If $\alpha$ satisfies a polynomial over $F$ (algebraic), then $F(\alpha) \cong F[x]/(p(x))$ where $p(x)$ is the minimal polynomial of $\alpha$.

$\mathbb{Q}(\sqrt{2}) = \{a + b\sqrt{2} : a, b \in \mathbb{Q}\}$.

Minimal polynomial: $x^2 - 2$. So $\mathbb{Q}(\sqrt{2}) \cong \mathbb{Q}[x]/(x^2 - 2)$.

### Finite Fields $GF(p^n)$

**Theorem**: For every prime $p$ and positive integer $n$, there exists a unique (up to isomorphism) field with $p^n$ elements, denoted $GF(p^n)$ or $\mathbb{F}_{p^n}$.

**Construction**: $GF(p^n) \cong \mathbb{Z}_p[x]/(f(x))$ where $f(x)$ is any irreducible polynomial of degree $n$ in $\mathbb{Z}_p[x]$.

### Example: $GF(2^3) = GF(8)$

Use irreducible polynomial $f(x) = x^3 + x + 1$ over $\mathbb{Z}_2$.

Elements: $\{0, 1, x, x+1, x^2, x^2+1, x^2+x, x^2+x+1\}$ — all polynomials of degree $< 3$ over $\mathbb{Z}_2$.

That gives $2^3 = 8$ elements.

Arithmetic: reduce modulo $x^3 + x + 1$, meaning $x^3 = x + 1$.

**Example multiplication**: $x^2 \cdot x = x^3 = x + 1$.

$(x^2 + x)(x + 1) = x^3 + x^2 + x^2 + x = x^3 + x = (x + 1) + x = 1$.

So $(x^2 + x)^{-1} = x + 1$ in $GF(8)$.

### Pen & Paper: Build $GF(4)$

Irreducible: $x^2 + x + 1$ over $\mathbb{Z}_2$.

Elements: $\{0, 1, \alpha, \alpha + 1\}$ where $\alpha^2 = \alpha + 1$.

$\alpha \cdot \alpha = \alpha^2 = \alpha + 1$

$\alpha \cdot (\alpha + 1) = \alpha^2 + \alpha = (\alpha + 1) + \alpha = 1$

So $\alpha^{-1} = \alpha + 1$. Every non-zero element has an inverse: field confirmed.

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

# Visualise GF(8) multiplication as a graph
fig, ax = plt.subplots(figsize=(7, 7))

# GF(8) elements as binary triples (a0, a1, a2) -> a0 + a1*x + a2*x^2
elements = [(0,0,0), (1,0,0), (0,1,0), (1,1,0),
            (0,0,1), (1,0,1), (0,1,1), (1,1,1)]
names = ['0', '1', 'x', 'x+1', 'x²', 'x²+1', 'x²+x', 'x²+x+1']

# Position elements in a circle
n = 8
theta = np.linspace(0, 2*np.pi, n, endpoint=False)
xs = np.sin(theta) * 2
ys = np.cos(theta) * 2

for i in range(n):
    ax.plot(xs[i], ys[i], 'o', markersize=20,
            color='steelblue' if i > 0 else 'lightgray')
    ax.text(xs[i], ys[i], names[i], ha='center', va='center',
            fontsize=8, fontweight='bold')

# Show multiplication by x (generator): connects consecutive powers
# x^0=1, x^1=x, x^2=x^2, x^3=x+1, x^4=x^2+x, x^5=x^2+x+1, x^6=x^2+1
power_order = [1, 2, 4, 3, 6, 7, 5]  # indices of x^0 through x^6
for i in range(len(power_order) - 1):
    a, b = power_order[i], power_order[i+1]
    ax.annotate('', xy=(xs[b]*0.88, ys[b]*0.88),
                xytext=(xs[a]*0.88, ys[a]*0.88),
                arrowprops=dict(arrowstyle='->', color='red', lw=1.5))

ax.set_title('GF(8): multiplication by x (red arrows show powers)')
ax.set_aspect('equal')
ax.axis('off')
plt.tight_layout()
plt.savefig('gf8.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Finite Fields ─────────────────────────────────────────

# Step 1: Build GF(2^n) using polynomial representation
class GF2n:
    """Finite field GF(2^n) via polynomial modulus."""
    def __init__(self, n, modulus):
        self.n = n
        self.modulus = modulus  # irreducible polynomial as integer (bit representation)
        self.size = 2 ** n

    def add(self, a, b):
        return a ^ b  # XOR

    def mul(self, a, b):
        result = 0
        while b:
            if b & 1:
                result ^= a
            a <<= 1
            if a & (1 << self.n):
                a ^= self.modulus
            b >>= 1
        return result

    def inv(self, a):
        """Find inverse using extended Euclidean or brute force."""
        if a == 0:
            raise ValueError("0 has no inverse")
        for b in range(1, self.size):
            if self.mul(a, b) == 1:
                return b
        raise ValueError(f"No inverse found for {a}")

    def to_poly(self, a):
        """Convert integer to polynomial string."""
        if a == 0:
            return "0"
        terms = []
        for i in range(self.n):
            if a & (1 << i):
                if i == 0:
                    terms.append("1")
                elif i == 1:
                    terms.append("x")
                else:
                    terms.append(f"x^{i}")
        return "+".join(terms)

# Step 2: GF(8) with modulus x^3 + x + 1 = 0b1011 = 11
gf8 = GF2n(3, 0b1011)
print("=== GF(8) = GF(2^3) mod x³+x+1 ===")
print("Elements:")
for i in range(8):
    print(f"  {i:03b} = {gf8.to_poly(i)}")

# Step 3: Multiplication table
print("\nMultiplication (selected):")
# x * x = x^2
print(f"  x * x = {gf8.to_poly(gf8.mul(0b010, 0b010))}")
# x^2 * x = x^3 = x + 1
print(f"  x² * x = {gf8.to_poly(gf8.mul(0b100, 0b010))}")
# (x^2+x) * (x+1) = ?
a, b = 0b110, 0b011
print(f"  (x²+x) * (x+1) = {gf8.to_poly(gf8.mul(a, b))}")

# Step 4: Verify every non-zero element has an inverse
print("\nInverses:")
for a in range(1, 8):
    a_inv = gf8.inv(a)
    product = gf8.mul(a, a_inv)
    print(f"  {gf8.to_poly(a):>8} * {gf8.to_poly(a_inv):>8} = {product}")
    assert product == 1

# Step 5: GF(2^8) for AES
print("\n=== GF(2^8) for AES ===")
# Modulus: x^8 + x^4 + x^3 + x + 1 = 0x11B
gf256 = GF2n(8, 0x11B)
print(f"Field size: {gf256.size}")

# Verify a few multiplications
a, b = 0x57, 0x83  # Standard AES test vectors
print(f"0x57 * 0x83 = 0x{gf256.mul(a, b):02X}")
print(f"0x57 inverse = 0x{gf256.inv(0x57):02X}")

# Verify all non-zero elements have inverses
all_invertible = True
for a in range(1, 256):
    try:
        inv = gf256.inv(a)
        assert gf256.mul(a, inv) == 1
    except:
        all_invertible = False
print(f"All 255 non-zero elements invertible: {all_invertible}")

# Step 6: Extension degree
print(f"\n[GF(8) : GF(2)] = {3} (degree of extension)")
print(f"[GF(256) : GF(2)] = {8}")
print(f"[C : R] = 2")
```

## Connection to CS / Games / AI / Business / Industry

- **AES (Advanced Encryption Standard)**: all byte-level operations happen in $GF(2^8)$.
- **Reed-Solomon codes**: work over $GF(2^8)$ or similar; used in QR codes, Blu-ray, deep space communication.
- **Elliptic curve cryptography**: curves over finite fields $GF(p)$ or $GF(2^n)$.
- **Secret sharing** (Shamir's): polynomial interpolation over a finite field.
- **Random number generation**: LFSRs (linear feedback shift registers) use $GF(2^n)$ arithmetic.

## Check Your Understanding

1. Build $GF(9) = \mathbb{Z}_3[x]/(x^2 + 1)$. List all 9 elements and find the inverse of $x + 1$.
2. Why must the modulus polynomial be irreducible? What goes wrong if it is reducible?
3. Show that $GF(4)$ is not isomorphic to $\mathbb{Z}_4$. (Hint: what is $1 + 1$ in each?)
