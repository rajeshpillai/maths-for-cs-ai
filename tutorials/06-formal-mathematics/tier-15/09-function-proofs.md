# Function Proofs — Injectivity, Surjectivity, Bijectivity

## Intuition

A function is like a machine that takes inputs and produces outputs. An
**injective** function never maps two different inputs to the same output (no
collisions). A **surjective** function hits every possible output. A
**bijective** function does both: it is a perfect one-to-one pairing. These
properties determine whether you can invert a function, whether hash
functions have collisions, and whether two sets have the same size.

## Prerequisites

- Tier 15, Lesson 8 (Set Theory Proofs)
- Tier 1, Lesson 3 (Relations and Functions)

## From First Principles

### Definitions

Let $f: A \to B$.

**Injective** (one-to-one): $\forall x_1, x_2 \in A,\; f(x_1) = f(x_2) \Rightarrow x_1 = x_2$.

Equivalently (contrapositive): $x_1 \neq x_2 \Rightarrow f(x_1) \neq f(x_2)$.

**Surjective** (onto): $\forall y \in B,\; \exists x \in A,\; f(x) = y$.

**Bijective**: Both injective and surjective.

### Proving Injectivity

Assume $f(x_1) = f(x_2)$ and derive $x_1 = x_2$.

**Example**: $f: \mathbb{R} \to \mathbb{R}$, $f(x) = 3x + 7$.

Suppose $f(x_1) = f(x_2)$:
$$3x_1 + 7 = 3x_2 + 7$$
$$3x_1 = 3x_2$$
$$x_1 = x_2$$

So $f$ is injective. $\square$

### Proving Surjectivity

Given arbitrary $y \in B$, exhibit $x \in A$ with $f(x) = y$.

**Example**: Same $f(x) = 3x + 7$, $f: \mathbb{R} \to \mathbb{R}$.

Given $y \in \mathbb{R}$, let $x = \frac{y - 7}{3}$.

Then $f(x) = 3 \cdot \frac{y-7}{3} + 7 = y - 7 + 7 = y$. $\square$

### Disproving Injectivity

Find two distinct inputs with the same output.

**Example**: $g(x) = x^2$, $g: \mathbb{R} \to \mathbb{R}$.

$g(2) = 4 = g(-2)$ but $2 \neq -2$. Not injective.

### Disproving Surjectivity

Find a $y \in B$ with no preimage.

**Example**: Same $g(x) = x^2$, $g: \mathbb{R} \to \mathbb{R}$.

Let $y = -1$. There is no real $x$ with $x^2 = -1$. Not surjective.

### Composition Preserves Properties

**Theorem**: If $f: A \to B$ and $g: B \to C$ are both injective, then $g \circ f: A \to C$ is injective.

**Proof**: Suppose $(g \circ f)(x_1) = (g \circ f)(x_2)$, i.e., $g(f(x_1)) = g(f(x_2))$.
Since $g$ is injective: $f(x_1) = f(x_2)$.
Since $f$ is injective: $x_1 = x_2$. $\square$

**Theorem**: If $f$ and $g$ are both surjective, then $g \circ f$ is surjective.

**Proof**: Let $z \in C$. Since $g$ is surjective, $\exists y \in B$ with $g(y) = z$.
Since $f$ is surjective, $\exists x \in A$ with $f(x) = y$.
Then $(g \circ f)(x) = g(f(x)) = g(y) = z$. $\square$

### Inverse Functions

$f: A \to B$ has an inverse $f^{-1}: B \to A$ if and only if $f$ is bijective.

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(1, 3, figsize=(12, 4))

# Injective but not surjective (on displayed codomain)
x = np.linspace(-2, 2, 100)
axes[0].plot(x, np.exp(x), 'b-', linewidth=2)
axes[0].axhline(y=0, color='red', linestyle='--', alpha=0.5)
axes[0].set_title('f(x) = eˣ\nInjective, not surjective onto R')
axes[0].set_xlabel('x')
axes[0].set_ylabel('f(x)')
axes[0].set_ylim(-1, 8)

# Surjective but not injective
x = np.linspace(-3, 3, 100)
axes[1].plot(x, x**3 - 3*x, 'g-', linewidth=2)
axes[1].axhline(y=0, color='red', linestyle='--', alpha=0.5)
axes[1].set_title('f(x) = x³ - 3x\nSurjective, not injective')
axes[1].set_xlabel('x')

# Bijective
axes[2].plot(x, 3*x + 7, 'r-', linewidth=2)
axes[2].set_title('f(x) = 3x + 7\nBijective')
axes[2].set_xlabel('x')

plt.tight_layout()
plt.savefig('function_types.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Function Proofs: Verification ────────────────────────

# Step 1: Check injectivity of f(x) = 3x + 7 over a finite domain
print("=== Injectivity of f(x) = 3x + 7 ===")
f = lambda x: 3 * x + 7
domain = range(-100, 101)
outputs = [f(x) for x in domain]
print(f"Domain size: {len(list(domain))}")
print(f"Unique outputs: {len(set(outputs))}")
print(f"Injective: {len(list(domain)) == len(set(outputs))}")

# Step 2: Check surjectivity by finding preimages
print("\n=== Surjectivity of f(x) = 3x + 7 ===")
f_inv = lambda y: (y - 7) / 3
for y in [-10, 0, 5.5, 100]:
    x = f_inv(y)
    print(f"  y={y}: x={x}, f(x)={f(x)}, match={abs(f(x) - y) < 1e-10}")

# Step 3: Disprove injectivity of g(x) = x²
print("\n=== g(x) = x² is NOT injective ===")
g = lambda x: x ** 2
print(f"g(3) = {g(3)}, g(-3) = {g(-3)}, same output, different input")

# Step 4: Disprove surjectivity of g(x) = x²
print("\n=== g(x) = x² is NOT surjective onto R ===")
print("y = -1 has no real preimage (x² ≥ 0 for all real x)")

# Step 5: Composition preserves injectivity
print("\n=== Composition of injective functions ===")
f1 = lambda x: 2 * x + 1  # injective
f2 = lambda x: 3 * x - 4  # injective
composed = lambda x: f2(f1(x))

outputs_composed = [composed(x) for x in domain]
print(f"f1 injective: {len(set(f1(x) for x in domain)) == len(list(domain))}")
print(f"f2 injective: {len(set(f2(x) for x in domain)) == len(list(domain))}")
print(f"f2∘f1 injective: {len(set(outputs_composed)) == len(list(domain))}")

# Step 6: Verify inverse
print("\n=== Inverse of f(x) = 3x + 7 ===")
for x in [-5, 0, 3.7, 10]:
    y = f(x)
    x_back = f_inv(y)
    print(f"  x={x} → f(x)={y} → f⁻¹(y)={x_back}, roundtrip={'OK' if abs(x - x_back) < 1e-10 else 'FAIL'}")
```

## Connection to CS / Games / AI

- **Hash functions**: ideally injective (no collisions); cryptographic hashes approximate injectivity.
- **Encoding/decoding**: bijective mappings (e.g., UTF-8) allow lossless conversion.
- **Database keys**: primary keys enforce injectivity — no two rows map to the same key.
- **Activation functions**: ReLU is not injective (all negative inputs map to 0), which causes information loss.
- **Bijections in combinatorics**: counting problems often reduce to finding bijections between sets.

## Check Your Understanding

1. Prove that $f(x) = x^3$ is a bijection from $\mathbb{R}$ to $\mathbb{R}$.
2. Let $f: \mathbb{Z} \to \mathbb{Z}$ with $f(n) = n + 3$. Prove $f$ is bijective and find $f^{-1}$.
3. Show that if $g \circ f$ is injective, then $f$ must be injective (but $g$ need not be).
