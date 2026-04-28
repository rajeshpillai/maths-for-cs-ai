# Mathematical Induction — Weak, Strong, and Well-Ordering

## Intuition

Imagine an infinite line of dominoes. If you can prove (1) the first domino
falls, and (2) whenever any domino falls the next one falls too, then ALL
dominoes fall. That is induction. Strong induction is like saying "if all
dominoes up to position $k$ have fallen, then domino $k+1$ falls."

## Prerequisites

- Tier 15, Lesson 3 (Direct Proof)

## From First Principles

### Weak Induction (Standard)

To prove $\forall n \geq n_0,\; P(n)$:

1. **Base case**: Prove $P(n_0)$.
2. **Inductive step**: Assume $P(k)$ (the **inductive hypothesis**). Prove $P(k+1)$.
3. **Conclusion**: By induction, $P(n)$ holds for all $n \geq n_0$.

### Example 1: Sum Formula $\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$

**Base case** ($n = 1$): $\text{LHS} = 1$, $\text{RHS} = \frac{1 \cdot 2}{2} = 1$. Check.

**Inductive step**: Assume $\sum_{i=1}^{k} i = \frac{k(k+1)}{2}$.

Show $\sum_{i=1}^{k+1} i = \frac{(k+1)(k+2)}{2}$.

$$\sum_{i=1}^{k+1} i = \underbrace{\sum_{i=1}^{k} i}_{\text{IH}} + (k+1) = \frac{k(k+1)}{2} + (k+1) = (k+1)\left(\frac{k}{2} + 1\right) = \frac{(k+1)(k+2)}{2}$$

$\square$

### Strong Induction

Sometimes $P(k+1)$ depends not just on $P(k)$ but on earlier values.

To prove $\forall n \geq n_0,\; P(n)$:

1. **Base case(s)**: Prove $P(n_0)$ (and possibly $P(n_0 + 1)$, etc.).
2. **Inductive step**: Assume $P(j)$ for **all** $j$ with $n_0 \leq j \leq k$. Prove $P(k+1)$.

### Example 2: Every Integer $\geq 2$ Has a Prime Factor

**Claim**: $\forall n \geq 2$, $n$ has a prime factor.

**Base case** ($n = 2$): $2$ is prime, so it is its own prime factor. Check.

**Inductive step**: Assume every integer $j$ with $2 \leq j \leq k$ has a prime factor.

Consider $k + 1$:
- If $k + 1$ is prime, done (it is its own prime factor).
- If $k + 1$ is composite, then $k + 1 = a \cdot b$ with $2 \leq a, b \leq k$.
- By the inductive hypothesis, $a$ has a prime factor $p$.
- Then $p$ divides $a$ and $a$ divides $k+1$, so $p$ divides $k+1$. $\square$

### Example 3: Fibonacci Bound

**Claim**: $F_n < 2^n$ for all $n \geq 1$, where $F_1 = 1, F_2 = 1, F_n = F_{n-1} + F_{n-2}$.

**Base cases**: $F_1 = 1 < 2^1 = 2$. $F_2 = 1 < 2^2 = 4$. Check.

**Inductive step**: Assume $F_j < 2^j$ for all $1 \leq j \leq k$ (where $k \geq 2$).

$$F_{k+1} = F_k + F_{k-1} < 2^k + 2^{k-1} = 2^{k-1}(2 + 1) = 3 \cdot 2^{k-1} < 4 \cdot 2^{k-1} = 2^{k+1}$$

$\square$

### Well-Ordering Principle

Every non-empty subset of $\mathbb{N}$ has a least element.

This is logically equivalent to induction. Proof sketch:
- Suppose $P(n)$ fails for some $n$. Then $S = \{n \in \mathbb{N} : \neg P(n)\}$ is non-empty.
- By well-ordering, $S$ has a least element $m$.
- Since $P$ holds for all $j < m$, the inductive step gives $P(m)$, contradiction.

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

# Visualise the domino effect of induction
fig, ax = plt.subplots(figsize=(10, 3))
n_dominoes = 12
for i in range(n_dominoes):
    angle = -60 if i < 7 else 0  # first 7 have fallen
    color = 'steelblue' if i < 7 else 'lightgray'
    rect = plt.Rectangle((i * 0.8, 0), 0.15, 1.0,
                          angle=angle if i < 7 else 0,
                          color=color, ec='black')
    ax.add_patch(rect)
    ax.text(i * 0.8 + 0.07, -0.2, str(i), ha='center', fontsize=8)

ax.set_xlim(-0.5, n_dominoes * 0.8)
ax.set_ylim(-0.5, 1.5)
ax.set_aspect('equal')
ax.set_title('Induction: base case falls → each knocks the next')
ax.axis('off')
plt.tight_layout()
plt.savefig('induction_dominoes.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Mathematical Induction: Verification ─────────────────

# Step 1: Verify the sum formula
print("=== Weak Induction: Sum Formula ===")
for n in range(1, 101):
    lhs = sum(range(1, n + 1))
    rhs = n * (n + 1) // 2
    assert lhs == rhs, f"Failed at n={n}"
print("Sum formula verified for n = 1 to 100")

# Step 2: Verify every integer >= 2 has a prime factor (strong induction)
print("\n=== Strong Induction: Prime Factor ===")
def smallest_prime_factor(n):
    for d in range(2, int(n**0.5) + 1):
        if n % d == 0:
            return d
    return n  # n itself is prime

for n in range(2, 1001):
    p = smallest_prime_factor(n)
    assert p >= 2 and n % p == 0, f"Failed at n={n}"
print("Every integer in [2, 1000] has a prime factor. Verified.")

# Step 3: Verify Fibonacci bound F_n < 2^n
print("\n=== Strong Induction: Fibonacci Bound ===")
fib = [0, 1, 1]  # F_0, F_1, F_2
for n in range(3, 51):
    fib.append(fib[-1] + fib[-2])

for n in range(1, 51):
    assert fib[n] < 2**n, f"Failed at n={n}: F_{n}={fib[n]}, 2^n={2**n}"
    if n <= 10:
        print(f"  F_{n} = {fib[n]:>5}  <  2^{n} = {2**n:>5}")
print("Fibonacci bound verified for n = 1 to 50")

# Step 4: Trace the inductive step for the sum formula
print("\n=== Tracing the Inductive Step ===")
k = 5
lhs_k = k * (k + 1) // 2  # by IH
lhs_k1 = lhs_k + (k + 1)   # add next term
rhs_k1 = (k + 1) * (k + 2) // 2
print(f"IH: sum(1..{k}) = {lhs_k}")
print(f"sum(1..{k+1}) = {lhs_k} + {k+1} = {lhs_k1}")
print(f"Formula: {k+1}*{k+2}/2 = {rhs_k1}")
print(f"Match: {lhs_k1 == rhs_k1}")

# Step 5: Well-ordering — find least element of a set
S = {n for n in range(1, 100) if n * n > 50}
print(f"\nS = {{n : n² > 50}} ∩ [1,99]: least element = {min(S)}")
print(f"Check: {min(S)}² = {min(S)**2} > 50")
```

## Connection to CS / Games / AI / Business / Industry

- **Recursion correctness**: every recursive algorithm's correctness proof is an induction on the recursion depth or input size.
- **Loop invariants**: proving a loop invariant holds at every iteration is induction on the iteration count.
- **Structural induction**: proving properties of trees, linked lists, and ASTs uses induction on structure.
- **Dynamic programming**: the correctness of DP relies on strong induction — each subproblem depends on smaller solved subproblems.
- **Mathematical induction in CompCert (Airbus avionics)** — loop-invariant correctness in safety-critical C is verified by induction in Coq, certified for DO-178C Level A; this is what makes formally verified compilers acceptable for fly-by-wire software.
- **Compound-interest pricing at every retail bank** — the formula $A = P(1+r)^n$ is proved by induction on $n$; mortgage amortization tables at Wells Fargo, Bank of America, and HSBC are direct applications evaluated billions of times per month.
- **Ladder-Logic safety interlocks in industrial PLCs (Siemens S7, Allen-Bradley)** — operator-procedure correctness is proved by induction on the cycle count; certified by IEC 61508 SIL-3 for nuclear plants and chemical refineries where a single bug can cause fatalities.
- **Stress-test induction in supply-chain planning at Walmart and Amazon** — proving that buffer stock survives $n$ consecutive demand shocks relies on inductive arguments; these models drove the COVID-era inventory sizing that maintained shelf availability above 95%.

## Check Your Understanding

1. Prove by induction: $\sum_{i=1}^{n} i^2 = \frac{n(n+1)(2n+1)}{6}$.
2. Prove by strong induction: every integer $n \geq 2$ can be written as a product of primes.
3. Use the well-ordering principle to prove: there is no integer between 0 and 1.
