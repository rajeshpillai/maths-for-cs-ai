# Direct Proof

## Intuition

A direct proof is the most natural form of argument: you start from what
you know (the hypothesis) and walk step by step to what you want to show
(the conclusion). It is the mathematical equivalent of building a bridge
one plank at a time from one bank to the other.

## Prerequisites

- Tier 15, Lesson 2 (Predicate Logic)

## From First Principles

### Structure of a Direct Proof

To prove "$P \Rightarrow Q$" directly:

1. **Assume** $P$ is true.
2. **Derive** $Q$ using definitions, axioms, and previously proven results.
3. **Conclude** $Q$.

### Example 1: Sum of Two Even Numbers is Even

**Claim**: If $a$ and $b$ are even integers, then $a + b$ is even.

**Proof**:
1. Assume $a$ and $b$ are even.
2. By definition, $a = 2k$ for some integer $k$, and $b = 2m$ for some integer $m$.
3. Then $a + b = 2k + 2m = 2(k + m)$.
4. Since $k + m$ is an integer, $a + b = 2 \cdot (\text{integer})$, so $a + b$ is even. $\square$

### Example 2: Product of Two Rationals is Rational

**Claim**: If $x$ and $y$ are rational, then $xy$ is rational.

**Proof**:
1. Assume $x, y \in \mathbb{Q}$.
2. By definition, $x = \frac{a}{b}$ and $y = \frac{c}{d}$ where $a,b,c,d \in \mathbb{Z}$ and $b,d \neq 0$.
3. Then $xy = \frac{a}{b} \cdot \frac{c}{d} = \frac{ac}{bd}$.
4. $ac \in \mathbb{Z}$ (integers closed under multiplication).
5. $bd \in \mathbb{Z}$ and $bd \neq 0$ (product of non-zero integers is non-zero).
6. So $xy = \frac{\text{integer}}{\text{non-zero integer}}$, hence $xy \in \mathbb{Q}$. $\square$

### Example 3: If $n$ is odd, then $n^2$ is odd

**Proof**:
1. Assume $n$ is odd, so $n = 2k + 1$ for some integer $k$.
2. $n^2 = (2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$.
3. Let $j = 2k^2 + 2k$. Then $j$ is an integer and $n^2 = 2j + 1$.
4. By definition, $n^2$ is odd. $\square$

### Pen & Paper: Prove the Sum Formula

**Claim**: For all $n \geq 1$, $1 + 2 + \cdots + n = \frac{n(n+1)}{2}$.

(We will prove this by induction in Lesson 6, but here let us verify the
formula algebraically using Gauss's trick.)

Write the sum forwards and backwards:
$$S = 1 + 2 + 3 + \cdots + n$$
$$S = n + (n-1) + (n-2) + \cdots + 1$$

Add term by term: each pair sums to $(n+1)$, and there are $n$ pairs:
$$2S = n(n+1)$$
$$S = \frac{n(n+1)}{2}$$

### Common Pitfalls in Direct Proofs

1. **Using what you want to prove** — circular reasoning.
2. **Confusing "for some" and "for all"** — $a = 2k$ and $b = 2m$, NOT $a = 2k$ and $b = 2k$ (different witnesses).
3. **Forgetting to state the domain** — integers? reals? naturals?
4. **Skipping the definition unpack** — always convert "even," "odd," "rational" etc. to their algebraic definitions.

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

# Visualise Gauss's sum: pair up terms
n = 10
fig, ax = plt.subplots(figsize=(8, 3))
for i in range(1, n + 1):
    ax.barh(0, 1, left=i - 1, height=0.4, color='steelblue',
            edgecolor='white')
    ax.text(i - 0.5, 0, str(i), ha='center', va='center',
            color='white', fontsize=9)
# Show pairing arrows
for i in range(n // 2):
    ax.annotate('', xy=(n - 1 - i + 0.5, 0.35), xytext=(i + 0.5, 0.35),
                arrowprops=dict(arrowstyle='<->', color='red', lw=1.5))
    ax.text((i + n - i) / 2, 0.55, f'{i+1}+{n-i}={n+1}',
            ha='center', fontsize=7, color='red')
ax.set_xlim(0, n)
ax.set_ylim(-0.5, 1.0)
ax.set_title(f"Gauss pairing: {n//2} pairs, each summing to {n+1}")
ax.axis('off')
plt.tight_layout()
plt.savefig('gauss_sum.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Direct Proof Verification ────────────────────────────

# Step 1: Verify "sum of two evens is even"
def is_even(n):
    return n % 2 == 0

# Test exhaustively over a range
all_pass = True
for a in range(-50, 51):
    for b in range(-50, 51):
        if is_even(a) and is_even(b):
            if not is_even(a + b):
                all_pass = False
                print(f"COUNTEREXAMPLE: {a} + {b} = {a+b}")
print("Sum of two evens is even:", all_pass)

# Step 2: Verify "product of two rationals is rational"
from fractions import Fraction

x = Fraction(3, 7)
y = Fraction(5, 11)
product = x * y
print(f"\n{x} * {y} = {product}")
print(f"Result is Fraction (rational): {isinstance(product, Fraction)}")

# Step 3: Verify "odd squared is odd"
for n in range(-50, 51):
    if n % 2 == 1:
        assert (n ** 2) % 2 == 1, f"Failed for n={n}"
print("\nOdd squared is odd: verified for n in [-50, 50]")

# Step 4: Verify Gauss sum formula
def gauss_sum(n):
    return n * (n + 1) // 2

for n in range(1, 1001):
    assert sum(range(1, n + 1)) == gauss_sum(n)
print(f"Gauss formula verified for n = 1 to 1000")

# Step 5: Show the proof structure programmatically
def prove_even_sum(a, b):
    """Trace the proof for specific values."""
    assert is_even(a) and is_even(b), "Precondition: a, b must be even"
    k = a // 2    # a = 2k
    m = b // 2    # b = 2m
    s = a + b     # = 2k + 2m = 2(k + m)
    j = k + m     # integer
    print(f"a={a}=2*{k}, b={b}=2*{m}")
    print(f"a+b = 2*{k} + 2*{m} = 2*{j} = {s}")
    print(f"Since {j} is an integer, {s} is even.")

prove_even_sum(14, 22)
```

## Connection to CS / Games / AI / Business / Industry

- **Algorithm correctness**: proving a sorting algorithm produces sorted output uses direct proof from loop invariants.
- **Type checking**: a type derivation in a compiler is a direct proof that an expression has a certain type.
- **Cryptography**: proving that encryption followed by decryption recovers the plaintext is a direct proof.
- **Game logic**: proving that a game state transition is valid (legal move) is a direct proof from the rules.

## Check Your Understanding

1. Prove directly: if $m$ is even and $n$ is odd, then $m + n$ is odd.
2. Prove directly: for any integer $n$, $n^2 + n$ is even. (Hint: factor.)
3. Prove directly: the product of two odd numbers is odd.
