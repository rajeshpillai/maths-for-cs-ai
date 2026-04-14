# Summation Notation — Sigma, Properties, and Telescoping

## Intuition

The sigma symbol $\Sigma$ is just compact notation for "add up a bunch of
terms."  It is the mathematical equivalent of a for-loop.  Mastering sigma
notation is essential because it appears everywhere: defining matrix
multiplication, computing expected values in probability, expressing loss
functions in ML, and building Riemann sums in calculus.  If you can read a
for-loop, you can read sigma notation.

## Prerequisites

- Foundation 3, Lesson 6: Sequences and Series

## From First Principles

### The notation

$$\sum_{k=1}^{n} a_k = a_1 + a_2 + a_3 + \cdots + a_n$$

- $k$ is the **index variable** (dummy variable — the name does not matter)
- $k = 1$ is the **lower bound** (starting value)
- $n$ is the **upper bound** (ending value)
- $a_k$ is the **summand** (the expression being summed)

**Pen & paper:**

$$\sum_{k=1}^{4} k^2 = 1^2 + 2^2 + 3^2 + 4^2 = 1 + 4 + 9 + 16 = 30$$

$$\sum_{i=0}^{3} 2^i = 1 + 2 + 4 + 8 = 15$$

### Properties of summation

**Linearity** — the two most important rules:

$$\sum_{k=1}^{n} (a_k + b_k) = \sum_{k=1}^{n} a_k + \sum_{k=1}^{n} b_k$$

$$\sum_{k=1}^{n} c \cdot a_k = c \sum_{k=1}^{n} a_k$$

**Constant sum:**

$$\sum_{k=1}^{n} c = nc$$

**Pen & paper:** $\sum_{k=1}^{5} (3k + 2) = 3\sum_{k=1}^{5} k + \sum_{k=1}^{5} 2 = 3(15) + 10 = 55$.

### Key closed-form formulas

$$\sum_{k=1}^{n} k = \frac{n(n+1)}{2}$$

$$\sum_{k=1}^{n} k^2 = \frac{n(n+1)(2n+1)}{6}$$

$$\sum_{k=1}^{n} k^3 = \left(\frac{n(n+1)}{2}\right)^2$$

$$\sum_{k=0}^{n-1} r^k = \frac{1 - r^n}{1 - r} \quad (r \neq 1)$$

### Telescoping sums

A **telescoping sum** is one where consecutive terms cancel:

$$\sum_{k=1}^{n} (a_k - a_{k+1}) = a_1 - a_{n+1}$$

**Pen & paper:** Evaluate $\sum_{k=1}^{n} \frac{1}{k(k+1)}$.

Use partial fractions: $\frac{1}{k(k+1)} = \frac{1}{k} - \frac{1}{k+1}$.

$$\sum_{k=1}^{n} \left(\frac{1}{k} - \frac{1}{k+1}\right) = \left(1 - \frac{1}{2}\right) + \left(\frac{1}{2} - \frac{1}{3}\right) + \cdots + \left(\frac{1}{n} - \frac{1}{n+1}\right) = 1 - \frac{1}{n+1} = \frac{n}{n+1}$$

Most terms cancel — only the first and last survive.

### Changing index bounds

$$\sum_{k=1}^{n} a_k = \sum_{k=0}^{n-1} a_{k+1}$$

Substituting $j = k - 1$: when $k = 1$, $j = 0$; when $k = n$, $j = n - 1$.

### Double sums

$$\sum_{i=1}^{m} \sum_{j=1}^{n} a_{ij}$$

This is a nested for-loop: for each $i$, sum over all $j$.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

# Show partial sums of k² as a bar chart
n = 8
k_vals = np.arange(1, n + 1)
terms = k_vals**2
partial_sums = np.cumsum(terms)

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Left: individual terms
colors = plt.cm.viridis(np.linspace(0.2, 0.8, n))
axes[0].bar(k_vals, terms, color=colors, edgecolor='black')
axes[0].set_xlabel('k')
axes[0].set_ylabel(r'$k^2$')
axes[0].set_title(r'Individual terms: $k^2$')
for k, t in zip(k_vals, terms):
    axes[0].text(k, t + 0.5, str(t), ha='center', fontsize=10)
axes[0].set_xticks(k_vals)

# Right: cumulative sum
axes[1].bar(k_vals, partial_sums, color=colors, edgecolor='black')
axes[1].set_xlabel('n')
axes[1].set_ylabel(r'$\sum_{k=1}^{n} k^2$')
axes[1].set_title(r'Partial sums: $\sum_{k=1}^{n} k^2$')
for k, s in zip(k_vals, partial_sums):
    axes[1].text(k, s + 1, str(s), ha='center', fontsize=10)
axes[1].set_xticks(k_vals)

# Verify with formula
formula_val = n * (n+1) * (2*n+1) // 6
axes[1].axhline(formula_val, color='red', linestyle='--', alpha=0.7,
                label=f'Formula: n(n+1)(2n+1)/6 = {formula_val}')
axes[1].legend()

plt.tight_layout()
plt.savefig('summation_barchart.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Summation Notation ─────────────────────────────────────────

# Basic summation = a for-loop
print("=== Sigma is a for-loop ===")
total = 0
for k in range(1, 5):
    total += k**2
    print(f"  k={k}: k²={k**2}, running sum={total}")
print(f"  Σk² (k=1..4) = {total}")

# Closed-form formulas
print(f"\n=== Closed-form formulas ===")
for n in [10, 100, 1000]:
    sum_k = n * (n + 1) // 2
    sum_k2 = n * (n + 1) * (2*n + 1) // 6
    sum_k3 = (n * (n + 1) // 2) ** 2
    # Verify by brute force
    bf_k = sum(range(1, n + 1))
    bf_k2 = sum(k**2 for k in range(1, n + 1))
    bf_k3 = sum(k**3 for k in range(1, n + 1))
    print(f"  n={n:4d}: Σk={sum_k:>10d} (check={bf_k==sum_k})"
          f"  Σk²={sum_k2:>12d} (check={bf_k2==sum_k2})"
          f"  Σk³={sum_k3:>15d} (check={bf_k3==sum_k3})")

# Linearity: Σ(3k+2) = 3Σk + 2n
print(f"\n=== Linearity: Σ(3k+2) for k=1..5 ===")
brute = sum(3*k + 2 for k in range(1, 6))
formula = 3 * (5*6//2) + 2*5
print(f"  Brute force: {brute}")
print(f"  Formula:     {formula}")

# Telescoping: Σ 1/(k(k+1))
print(f"\n=== Telescoping sum ===")
for n in [5, 10, 100, 1000]:
    brute = sum(1/(k*(k+1)) for k in range(1, n+1))
    formula = n / (n + 1)
    print(f"  n={n:4d}: brute={brute:.8f}, n/(n+1)={formula:.8f}, match={abs(brute-formula)<1e-10}")

# Double sum
print(f"\n=== Double sum: Σᵢ Σⱼ (i+j) for i=1..3, j=1..4 ===")
total = 0
for i in range(1, 4):
    for j in range(1, 5):
        total += i + j
        print(f"  i={i}, j={j}: i+j={i+j}", end="")
    print()
print(f"  Total = {total}")

# Geometric sum
print(f"\n=== Geometric: Σ r^k (k=0..n-1) ===")
r = 0.5
for n in [5, 10, 20]:
    brute = sum(r**k for k in range(n))
    formula = (1 - r**n) / (1 - r)
    print(f"  r={r}, n={n}: brute={brute:.6f}, formula={formula:.6f}")
```

## Connection to CS / Games / AI

- **Expected value** — $\mathbb{E}[X] = \sum_{i} x_i \cdot P(x_i)$, the
  foundation of probabilistic reasoning in ML (Tier 4)
- **Loss functions** — MSE loss is $\frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2$
- **Riemann sums** — integrals are limits of summations: $\int f(x)\,dx = \lim_{n\to\infty}\sum f(x_i)\Delta x$ (Tier 3)
- **Matrix multiplication** — $C_{ij} = \sum_{k} A_{ik} B_{kj}$ (Tier 2)
- **Algorithm analysis** — counting operations in nested loops uses double sums;
  $\sum_{i=1}^{n}\sum_{j=1}^{i} 1 = \frac{n(n+1)}{2} = O(n^2)$
- **Telescoping in amortised analysis** — potential method sums telescope to
  give tight bounds on data structure operations

## Check Your Understanding

1. **Pen & paper:** Evaluate $\sum_{k=1}^{6}(2k - 1)$.  What famous sequence do these terms form?
2. **Pen & paper:** Use telescoping to evaluate $\sum_{k=1}^{n} \frac{1}{k(k+2)}$.  (Hint: partial fractions.)
3. **Pen & paper:** Show that $\sum_{k=1}^{n} k = \frac{n(n+1)}{2}$ by writing the sum forwards and backwards and adding.
4. **Coding:** Write a Python function `sigma(f, a, b)` that computes $\sum_{k=a}^{b} f(k)$ for any function `f`.
