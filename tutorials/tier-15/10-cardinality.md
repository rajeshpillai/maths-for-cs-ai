# Cardinality — Countable and Uncountable Sets

## Intuition

How do you compare the sizes of infinite sets? You cannot count to infinity,
but you can ask: "Can I pair up elements one-to-one?" If yes, the sets have
the same **cardinality**. This idea leads to a stunning result: the real
numbers are a "bigger infinity" than the integers. Cantor's diagonal argument
is one of the most beautiful proofs in all of mathematics.

## Prerequisites

- Tier 15, Lesson 9 (Function Proofs — Bijectivity)

## From First Principles

### Same Cardinality

Two sets $A$ and $B$ have the same cardinality ($|A| = |B|$) if there exists
a **bijection** $f: A \to B$.

### Countably Infinite

A set $S$ is **countably infinite** if $|S| = |\mathbb{N}|$, i.e., there is a bijection $f: \mathbb{N} \to S$.

Equivalently: you can list the elements as $s_1, s_2, s_3, \ldots$

### The Integers are Countable

Bijection $f: \mathbb{N} \to \mathbb{Z}$:

$$f(n) = \begin{cases} n/2 & \text{if } n \text{ is even} \\ -(n+1)/2 & \text{if } n \text{ is odd} \end{cases}$$

Listing: $0, -1, 1, -2, 2, -3, 3, \ldots$

### The Rationals are Countable

Use a diagonal zigzag through the grid of fractions $a/b$:

$$\frac{1}{1}, \frac{1}{2}, \frac{2}{1}, \frac{3}{1}, \frac{2}{2}, \frac{1}{3}, \frac{1}{4}, \frac{2}{3}, \frac{3}{2}, \frac{4}{1}, \ldots$$

Skip duplicates (like $2/2 = 1/1$). This enumerates all positive rationals. Interleave negatives as with integers.

### Cantor's Diagonal Argument: $\mathbb{R}$ is Uncountable

**Theorem**: There is no bijection from $\mathbb{N}$ to $\mathbb{R}$.

**Proof** (by contradiction):

1. Assume $\mathbb{R}$ is countable. Then we can list all reals in $(0, 1)$:
$$r_1 = 0.d_{11} d_{12} d_{13} \ldots$$
$$r_2 = 0.d_{21} d_{22} d_{23} \ldots$$
$$r_3 = 0.d_{31} d_{32} d_{33} \ldots$$
$$\vdots$$

2. Construct a new number $x = 0.x_1 x_2 x_3 \ldots$ where:
$$x_i = \begin{cases} 3 & \text{if } d_{ii} \neq 3 \\ 7 & \text{if } d_{ii} = 3 \end{cases}$$

3. $x$ differs from $r_i$ in the $i$-th decimal digit, so $x \neq r_i$ for every $i$.
4. But $x \in (0, 1)$ and is not in the list. Contradiction.
5. Therefore $\mathbb{R}$ is uncountable. $\square$

(We avoid digits 0 and 9 to prevent $0.999\ldots = 1.000\ldots$ issues.)

### Cardinality of the Power Set

**Theorem** (Cantor): For any set $A$, $|A| < |\mathcal{P}(A)|$.

There is no surjection from $A$ onto $\mathcal{P}(A)$.

**Proof**: Suppose $f: A \to \mathcal{P}(A)$ is surjective. Define $D = \{a \in A : a \notin f(a)\}$.
Since $f$ is surjective, $D = f(d)$ for some $d \in A$.
- If $d \in D$: by definition of $D$, $d \notin f(d) = D$. Contradiction.
- If $d \notin D$: by definition of $D$, $d \in f(d) = D$. Contradiction.

No surjection exists, so $|\mathcal{P}(A)| > |A|$. $\square$

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

# Visualise Cantor's diagonal argument
fig, ax = plt.subplots(figsize=(7, 7))

# Create a fake list of reals
np.random.seed(42)
n = 8
digits = np.random.randint(0, 10, (n, n))

for i in range(n):
    for j in range(n):
        color = 'red' if i == j else 'black'
        weight = 'bold' if i == j else 'normal'
        ax.text(j + 0.5, n - i - 0.5, str(digits[i, j]),
                ha='center', va='center', fontsize=14,
                color=color, fontweight=weight)

# Draw grid
for i in range(n + 1):
    ax.axhline(i, color='gray', linewidth=0.5)
    ax.axvline(i, color='gray', linewidth=0.5)

# Show the constructed diagonal number
diag_digits = []
for i in range(n):
    d = digits[i, i]
    diag_digits.append(3 if d != 3 else 7)

ax.set_title(f"Diagonal: {digits.diagonal()} → New number: {''.join(map(str, diag_digits))}")
ax.set_xlim(0, n)
ax.set_ylim(0, n)
ax.set_xlabel('Decimal position')
ax.set_ylabel('Row (r_i)')
ax.invert_yaxis()
plt.tight_layout()
plt.savefig('cantor_diagonal.png', dpi=100)
plt.show()
```

## Python Verification

```python
import random

# ── Cardinality: Verification ────────────────────────────

# Step 1: Bijection N → Z
print("=== Bijection N → Z ===")
def nat_to_int(n):
    if n % 2 == 0:
        return n // 2
    else:
        return -(n + 1) // 2

mapping = [(n, nat_to_int(n)) for n in range(15)]
print("N → Z:", mapping)
# Verify it hits every integer in range
outputs = set(nat_to_int(n) for n in range(201))
expected = set(range(-100, 101))
print(f"Hits all integers in [-100, 100]: {expected <= outputs}")

# Step 2: Enumerate rationals (positive) via diagonal zigzag
print("\n=== Enumerating Rationals ===")
from math import gcd

def enumerate_rationals(limit):
    """Enumerate positive rationals by diagonal traversal."""
    seen = set()
    result = []
    for s in range(2, limit):  # s = a + b
        for a in range(1, s):
            b = s - a
            g = gcd(a, b)
            reduced = (a // g, b // g)
            if reduced not in seen:
                seen.add(reduced)
                result.append(f"{reduced[0]}/{reduced[1]}")
    return result

rats = enumerate_rationals(12)
print(f"First 20 rationals: {rats[:20]}")

# Step 3: Cantor's diagonal argument simulation
print("\n=== Cantor's Diagonal Argument ===")
random.seed(42)
n = 10
# Simulate a "list" of reals in (0,1)
listed_reals = []
for i in range(n):
    digits = [random.randint(0, 9) for _ in range(n)]
    listed_reals.append(digits)

print("Listed reals (decimal digits):")
for i, digits in enumerate(listed_reals):
    diag_marker = [f"[{d}]" if j == i else f" {d} " for j, d in enumerate(digits)]
    print(f"  r_{i}: 0.{''.join(diag_marker)}")

# Construct diagonal number
diagonal_number = []
for i in range(n):
    d = listed_reals[i][i]
    new_d = 3 if d != 3 else 7
    diagonal_number.append(new_d)

print(f"\nDiagonal digits: {[listed_reals[i][i] for i in range(n)]}")
print(f"New number:      0.{''.join(map(str, diagonal_number))}")
print("This number differs from r_i at position i, so it's NOT in the list.")

# Step 4: Cantor's theorem |P(A)| > |A|
print("\n=== Cantor's Theorem: |P(A)| > |A| ===")
for k in range(8):
    ps_size = 2 ** k
    print(f"|A|={k}: |P(A)|={ps_size}, strictly greater: {ps_size > k}")
```

## Connection to CS / Games / AI

- **Halting problem**: the proof that no program can decide halting uses a diagonal argument (Turing's version of Cantor).
- **Kolmogorov complexity**: most strings are incompressible — proven by a counting/cardinality argument.
- **Floating point**: reals are uncountable but floats are finite; this mismatch causes rounding errors.
- **Data compression**: pigeonhole + cardinality shows no lossless compression works on all inputs.
- **Machine learning**: the set of all possible functions $\mathbb{R}^n \to \mathbb{R}$ is uncountable; a neural network parameterises a countable subset.

## Check Your Understanding

1. Prove that $|\mathbb{N}| = |\{n \in \mathbb{N} : n \text{ is even}\}|$ by giving an explicit bijection.
2. Use the diagonal argument to show that the set of all infinite binary sequences is uncountable.
3. Why does Cantor's theorem imply there is no "set of all sets"? (Hint: if $S$ is the set of all sets, then $\mathcal{P}(S) \subseteq S$, contradicting $|\mathcal{P}(S)| > |S|$.)
