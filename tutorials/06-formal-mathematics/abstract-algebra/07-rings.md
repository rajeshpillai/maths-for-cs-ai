# Rings — Where Addition Meets Multiplication

## Intuition

A **ring** is what you get when a single set has both addition and
multiplication that play nicely together. The integers, polynomials, and
matrices are all rings. Rings are the algebraic backbone of number theory,
coding theory, and every computation that involves both $+$ and $\times$.

## Prerequisites

- Tier 16, Lesson 1 (Groups)

## From First Principles

### Definition

A **ring** $(R, +, \cdot)$ is a set $R$ with two operations satisfying:

1. $(R, +)$ is an **abelian group** (closure, associativity, identity $0$, inverses, commutativity).
2. $(R, \cdot)$ is a **monoid** (closure, associativity, identity $1$). [Some authors do not require $1$.]
3. **Distributive laws**:
   - $a \cdot (b + c) = a \cdot b + a \cdot c$ (left distributive)
   - $(a + b) \cdot c = a \cdot c + b \cdot c$ (right distributive)

### Commutative Ring

A ring where $a \cdot b = b \cdot a$ for all $a, b$.

### Example 1: $(\mathbb{Z}, +, \times)$

The integers form a commutative ring. The additive identity is $0$, the multiplicative identity is $1$.

### Example 2: $(\mathbb{Z}_n, +, \times)$

Integers modulo $n$ form a commutative ring.

$\mathbb{Z}_6$: elements $\{0, 1, 2, 3, 4, 5\}$ with mod-6 arithmetic.

Note: $2 \cdot 3 = 6 \equiv 0 \pmod{6}$. Both $2$ and $3$ are non-zero but their product is zero! These are called **zero divisors**.

### Example 3: $M_2(\mathbb{R})$ — $2 \times 2$ Matrices

This is a **non-commutative** ring (matrix multiplication is not commutative). It has zero divisors too.

### Integral Domains

A commutative ring with $1 \neq 0$ and **no zero divisors** is an **integral domain**.

$\mathbb{Z}$ is an integral domain. $\mathbb{Z}_6$ is NOT (since $2 \cdot 3 = 0$).

$\mathbb{Z}_p$ for prime $p$ IS an integral domain (and in fact a field).

### Fields

A **field** is a commutative ring where every non-zero element has a multiplicative inverse.

Examples: $\mathbb{Q}$, $\mathbb{R}$, $\mathbb{C}$, $\mathbb{Z}_p$ (for prime $p$).

Non-examples: $\mathbb{Z}$ (no inverse for 2), $\mathbb{Z}_6$ (zero divisors).

### Hierarchy

$$\text{Field} \subset \text{Integral Domain} \subset \text{Commutative Ring} \subset \text{Ring}$$

### Pen & Paper: Multiplication Table of $\mathbb{Z}_5$

| $\times$ | 0 | 1 | 2 | 3 | 4 |
|-----------|---|---|---|---|---|
| **0** | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 1 | 2 | 3 | 4 |
| **2** | 0 | 2 | 4 | 1 | 3 |
| **3** | 0 | 3 | 1 | 4 | 2 |
| **4** | 0 | 4 | 3 | 2 | 1 |

Every non-zero row is a permutation of $\{1, 2, 3, 4\}$ — this means every non-zero element has an inverse. $\mathbb{Z}_5$ is a field!

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

# Multiplication table heatmap for Z_6 (showing zero divisors)
fig, axes = plt.subplots(1, 2, figsize=(10, 4))

for ax, n, title in [(axes[0], 6, 'Z₆ (has zero divisors)'),
                      (axes[1], 7, 'Z₇ (field, no zero divisors)')]:
    table = np.array([[(i * j) % n for j in range(n)] for i in range(n)])
    im = ax.imshow(table, cmap='YlOrRd', interpolation='nearest')
    for i in range(n):
        for j in range(n):
            color = 'white' if table[i, j] == 0 and i > 0 and j > 0 else 'black'
            ax.text(j, i, str(table[i, j]), ha='center', va='center',
                    fontsize=10, fontweight='bold', color=color)
    ax.set_xticks(range(n))
    ax.set_yticks(range(n))
    ax.set_title(title)
    ax.set_xlabel('j')
    ax.set_ylabel('i')

plt.suptitle('Multiplication Tables: Zero Divisors Highlighted', fontsize=13)
plt.tight_layout()
plt.savefig('ring_tables.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Rings ─────────────────────────────────────────────────

# Step 1: Verify ring axioms for Z_n
def verify_ring_Zn(n):
    """Verify Z_n is a ring."""
    G = list(range(n))

    # Additive group
    for a in G:
        assert (a + 0) % n == a  # identity
        assert (a + (n - a)) % n == 0  # inverse
        for b in G:
            assert (a + b) % n == (b + a) % n  # commutative
            for c in G:
                assert ((a + b) % n + c) % n == (a + (b + c) % n) % n  # associative

    # Multiplicative monoid
    for a in G:
        assert (a * 1) % n == a  # identity
        for b in G:
            for c in G:
                assert ((a * b) % n * c) % n == (a * (b * c) % n) % n

    # Distributive
    for a in G:
        for b in G:
            for c in G:
                lhs = (a * ((b + c) % n)) % n
                rhs = ((a * b) % n + (a * c) % n) % n
                assert lhs == rhs

    print(f"Z_{n} is a ring. ✓")

for n in [2, 3, 5, 6, 7]:
    verify_ring_Zn(n)

# Step 2: Find zero divisors
print("\n=== Zero Divisors ===")
for n in [4, 5, 6, 7, 8, 9, 10]:
    zd = []
    for a in range(1, n):
        for b in range(1, n):
            if (a * b) % n == 0:
                zd.append((a, b))
    if zd:
        print(f"Z_{n}: zero divisors = {zd[:5]}{'...' if len(zd) > 5 else ''}")
    else:
        print(f"Z_{n}: NO zero divisors (integral domain)")

# Step 3: Check which Z_n are fields
print("\n=== Fields ===")
from math import gcd

for n in range(2, 16):
    is_field = True
    for a in range(1, n):
        if gcd(a, n) != 1:
            is_field = False
            break
    prime = all(n % d != 0 for d in range(2, n))
    print(f"Z_{n}: field={is_field}, prime={prime}, match={is_field == prime}")

# Step 4: Find multiplicative inverses in Z_7
print("\n=== Multiplicative inverses in Z_7 ===")
n = 7
for a in range(1, n):
    for b in range(1, n):
        if (a * b) % n == 1:
            print(f"  {a}⁻¹ = {b} (since {a}×{b} = {a*b} ≡ 1 mod {n})")
            break

# Step 5: Non-commutative ring: 2x2 matrices
import numpy as np
print("\n=== Non-commutativity of M_2(R) ===")
A = np.array([[1, 2], [3, 4]])
B = np.array([[0, 1], [1, 0]])
print(f"AB =\n{A @ B}")
print(f"BA =\n{B @ A}")
print(f"AB == BA? {np.allclose(A @ B, B @ A)}")
```

## Connection to CS / Games / AI / Business / Industry

- **Modular arithmetic** ($\mathbb{Z}_n$) is the ring that powers hashing, checksums, and cryptography.
- **Polynomial rings** describe error-correcting codes (CRC, Reed-Solomon).
- **Matrix rings** are the algebraic structure behind every neural network layer.
- **Finite fields** ($\mathbb{Z}_p$, $GF(2^8)$) are essential for AES encryption and erasure coding.
- **Integer arithmetic** in CPUs operates in the ring $\mathbb{Z}_{2^{32}}$ or $\mathbb{Z}_{2^{64}}$.

## Check Your Understanding

1. Verify that $\mathbb{Z}_4$ has a zero divisor ($2 \times 2 = 0$). Why does this prevent $\mathbb{Z}_4$ from being a field?
2. Prove from the ring axioms: $a \cdot 0 = 0$ for all $a$ in any ring. (Hint: $0 = 0 + 0$, then distribute.)
3. Show that in $\mathbb{Z}_p$ for prime $p$, every non-zero element has a multiplicative inverse. (Hint: Bezout's identity.)
