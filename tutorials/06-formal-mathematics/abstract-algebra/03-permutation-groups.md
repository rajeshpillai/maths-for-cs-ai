# Permutation Groups

## Intuition

A permutation is a rearrangement. Shuffling a deck of cards, reordering
array elements, scrambling a Rubik's Cube — all are permutations. The set of
all permutations of $n$ objects forms the **symmetric group** $S_n$, arguably
the most important concrete group in mathematics. Cayley's theorem says every
finite group is hiding inside some $S_n$.

## Prerequisites

- Tier 16, Lesson 1 (Groups)

## From First Principles

### Symmetric Group $S_n$

$S_n$ is the set of all bijections from $\{1, 2, \ldots, n\}$ to itself, with
function composition as the operation.

$|S_n| = n!$

### Two-Line Notation

A permutation $\sigma \in S_3$:

$$\sigma = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 3 & 1 \end{pmatrix}$$

means $\sigma(1) = 2$, $\sigma(2) = 3$, $\sigma(3) = 1$.

### Cycle Notation

The same permutation: $\sigma = (1\; 2\; 3)$ — a **3-cycle**.

Read: 1 maps to 2, 2 maps to 3, 3 maps back to 1.

**Disjoint cycle decomposition**: every permutation can be written uniquely (up to order) as a product of disjoint cycles.

$$\begin{pmatrix} 1 & 2 & 3 & 4 & 5 \\ 2 & 1 & 4 & 5 & 3 \end{pmatrix} = (1\; 2)(3\; 4\; 5)$$

### Composition in Cycle Notation

Apply right-to-left: $(1\; 2)(1\; 3)$ means first apply $(1\; 3)$, then $(1\; 2)$.

$(1\; 3)$: $1 \to 3, 3 \to 1, 2 \to 2$

$(1\; 2)$: $1 \to 2, 2 \to 1, 3 \to 3$

Compose: $1 \xrightarrow{(1\;3)} 3 \xrightarrow{(1\;2)} 3$, $2 \xrightarrow{(1\;3)} 2 \xrightarrow{(1\;2)} 1$, $3 \xrightarrow{(1\;3)} 1 \xrightarrow{(1\;2)} 2$.

Result: $(1\; 3\; 2)$.

### Transpositions and Parity

A **transposition** is a 2-cycle: $(i\; j)$.

Every permutation can be written as a product of transpositions.

$(1\; 2\; 3) = (1\; 3)(1\; 2)$ (check: $1 \to 2 \to 2$, wait — apply right to left: $1 \xrightarrow{(1\;2)} 2 \xrightarrow{(1\;3)} 2$. Hmm, let me redo.)

Actually: $(1\; 2\; 3) = (1\; 2)(2\; 3)$? Check: $1 \xrightarrow{(2\;3)} 1 \xrightarrow{(1\;2)} 2$, $2 \xrightarrow{(2\;3)} 3 \xrightarrow{(1\;2)} 3$, $3 \xrightarrow{(2\;3)} 2 \xrightarrow{(1\;2)} 1$. No, that gives $(1\;2\;3)$... but we need to be careful about convention.

A $k$-cycle decomposes into $k - 1$ transpositions: $(a_1\; a_2\; \cdots\; a_k) = (a_1\; a_k)(a_1\; a_{k-1})\cdots(a_1\; a_2)$.

**Parity**: a permutation is **even** if it decomposes into an even number of transpositions, **odd** otherwise. The parity is well-defined (independent of decomposition).

**Sign**: $\text{sgn}(\sigma) = (-1)^{\text{number of transpositions}} = +1$ (even) or $-1$ (odd).

### Pen & Paper: Decompose and Find Parity

$\sigma = (1\;3\;5)(2\;4)$ in $S_5$.

$(1\;3\;5) = (1\;5)(1\;3)$ — 2 transpositions.
$(2\;4)$ — 1 transposition.

Total: 3 transpositions. Odd permutation. $\text{sgn}(\sigma) = -1$.

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

# Visualise a permutation as arrows
fig, ax = plt.subplots(figsize=(8, 4))

n = 5
sigma = [2, 1, 4, 5, 3]  # (1 2)(3 4 5) in 0-indexed: 0→1,1→0,2→3,3→4,4→2

# Top row (domain)
for i in range(n):
    ax.plot(i, 1, 'bo', markersize=15)
    ax.text(i, 1.15, str(i + 1), ha='center', fontsize=12, fontweight='bold')

# Bottom row (codomain)
for i in range(n):
    ax.plot(i, 0, 'ro', markersize=15)
    ax.text(i, -0.15, str(i + 1), ha='center', fontsize=12, fontweight='bold')

# Arrows
for i in range(n):
    j = sigma[i] - 1  # convert to 0-indexed
    ax.annotate('', xy=(j, 0.1), xytext=(i, 0.9),
                arrowprops=dict(arrowstyle='->', lw=2,
                                color='green' if i != j else 'gray'))

ax.set_xlim(-0.5, n - 0.5)
ax.set_ylim(-0.4, 1.4)
ax.set_title('σ = (1 2)(3 4 5)')
ax.axis('off')
plt.tight_layout()
plt.savefig('permutation_arrows.png', dpi=100)
plt.show()
```

## Python Verification

```python
from itertools import permutations
from math import factorial

# ── Permutation Groups ───────────────────────────────────

# Step 1: Represent permutations as tuples (0-indexed internally)
def compose(p, q):
    """p ∘ q: first apply q, then p."""
    return tuple(p[q[i]] for i in range(len(p)))

def inverse(p):
    inv = [0] * len(p)
    for i, v in enumerate(p):
        inv[v] = i
    return tuple(inv)

def identity(n):
    return tuple(range(n))

# Step 2: Verify |S_n| = n!
n = 4
S_n = list(permutations(range(n)))
print(f"|S_{n}| = {len(S_n)} = {n}! = {factorial(n)}")

# Step 3: Cycle notation
def to_cycles(perm):
    """Convert permutation to cycle notation."""
    n = len(perm)
    visited = [False] * n
    cycles = []
    for i in range(n):
        if visited[i]:
            continue
        cycle = []
        j = i
        while not visited[j]:
            visited[j] = True
            cycle.append(j + 1)  # 1-indexed for display
            j = perm[j]
        if len(cycle) > 1:
            cycles.append(tuple(cycle))
    return cycles if cycles else [(1,)]  # identity

# Step 4: Examples
sigma = (1, 0, 3, 4, 2)  # 0-indexed: 0→1, 1→0, 2→3, 3→4, 4→2
print(f"\nσ = {sigma} (0-indexed)")
print(f"Cycles: {to_cycles(sigma)}")

# Step 5: Compute parity
def parity(perm):
    """Return number of transpositions (mod 2)."""
    cycles = to_cycles(perm)
    # k-cycle = k-1 transpositions
    total = sum(len(c) - 1 for c in cycles)
    return total % 2  # 0 = even, 1 = odd

print(f"Parity of σ: {'odd' if parity(sigma) else 'even'}")
print(f"sgn(σ) = {(-1)**parity(sigma)}")

# Step 6: Verify composition
tau = (0, 2, 1, 3, 4)  # (2 3) in 0-indexed: swap positions 1,2
composed = compose(sigma, tau)
print(f"\nτ = {tau}, cycles: {to_cycles(tau)}")
print(f"σ∘τ = {composed}, cycles: {to_cycles(composed)}")

# Step 7: Verify inverse
sigma_inv = inverse(sigma)
print(f"\nσ⁻¹ = {sigma_inv}, cycles: {to_cycles(sigma_inv)}")
print(f"σ∘σ⁻¹ = {compose(sigma, sigma_inv)} (should be identity)")

# Step 8: Count even and odd permutations in S_4
even_count = sum(1 for p in S_n if parity(p) == 0)
odd_count = sum(1 for p in S_n if parity(p) == 1)
print(f"\nIn S_{n}: {even_count} even, {odd_count} odd (should be equal: {n}!/2 = {factorial(n)//2})")
```

## Connection to CS / Games / AI / Business / Industry

- **Sorting algorithms**: every sort transforms an arbitrary permutation into the identity; the minimum number of swaps equals the number of cycles minus $n$.
- **Rubik's Cube**: the group of legal moves is a subgroup of $S_{48}$ (48 coloured facets).
- **Determinants**: $\det(A) = \sum_{\sigma \in S_n} \text{sgn}(\sigma) \prod_{i} a_{i,\sigma(i)}$ — permutations define the determinant.
- **Shuffling**: Fisher-Yates shuffle generates a uniformly random element of $S_n$.
- **Cryptography**: permutation ciphers rearrange plaintext characters.
- **A/B test randomization at Netflix and Booking.com** — uniform random permutations from $S_n$ (via Fisher-Yates) split user populations into experiment buckets; bias here directly distorts revenue-impact estimates worth tens of millions per year.
- **AES ShiftRows step** — applies a fixed permutation in $S_{16}$ (a cyclic shift of bytes per row) on every 128-bit block; baked into Intel AES-NI and ARM Cryptography Extensions hardware.
- **ANSYS Mechanical assembly meshing** — Cuthill-McKee reordering finds a permutation in $S_n$ that minimises bandwidth of the stiffness matrix, accelerating sparse Cholesky solves in finite-element simulations of car crashes by 10-100x.
- **Genome rearrangement in computational biology** — sorting permutations by reversals (a problem in $S_n$) measures evolutionary distance between species; used in Broad Institute pipelines to compare cancer genomes.

## Check Your Understanding

1. Write $(1\;4\;2\;5)(3\;6)$ as a product of transpositions and determine its parity.
2. Compute $(1\;2\;3) \circ (1\;3\;2)$ in $S_3$. What do you get?
3. How many elements of $S_5$ have order exactly 6? (Hint: what cycle structures give order 6?)
