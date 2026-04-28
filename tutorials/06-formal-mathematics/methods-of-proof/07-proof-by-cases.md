# Proof by Cases (Exhaustive Case Analysis)

## Intuition

Sometimes you cannot handle all possibilities at once, but you can split
them into a handful of non-overlapping cases and prove each separately.
This is the mathematical version of a `switch` statement: cover every branch,
and the result follows.

## Prerequisites

- Tier 15, Lesson 3 (Direct Proof)

## From First Principles

### The Method

To prove $P$:

1. Identify cases $C_1, C_2, \ldots, C_k$ that are **exhaustive** (cover all possibilities) and ideally **mutually exclusive**.
2. Prove $P$ assuming $C_1$. Prove $P$ assuming $C_2$. ... Prove $P$ assuming $C_k$.
3. Since one of $C_1, \ldots, C_k$ must hold, $P$ follows.

Formally: $(C_1 \lor C_2 \lor \cdots \lor C_k)$ is a tautology over the domain, and $(C_i \Rightarrow P)$ for each $i$, so $P$.

### Example 1: $n^2 + n$ is Even for All Integers

Split into two cases: $n$ is even or $n$ is odd.

**Case 1** ($n = 2k$): $n^2 + n = 4k^2 + 2k = 2(2k^2 + k)$. Even. Check.

**Case 2** ($n = 2k+1$): $n^2 + n = (2k+1)^2 + (2k+1) = 4k^2 + 4k + 1 + 2k + 1 = 4k^2 + 6k + 2 = 2(2k^2 + 3k + 1)$. Even. Check.

Both cases covered. $\square$

### Example 2: Triangle Inequality $|a + b| \leq |a| + |b|$

We have four cases based on the signs of $a$ and $b$.

**Case 1** ($a \geq 0, b \geq 0$): $|a+b| = a + b = |a| + |b|$. Equality holds.

**Case 2** ($a < 0, b < 0$): $|a+b| = -(a+b) = (-a) + (-b) = |a| + |b|$. Equality holds.

**Case 3** ($a \geq 0, b < 0$): $|a+b|$. We know $a + b \leq a = |a| \leq |a| + |b|$ and $a + b \geq b > -(|b|) \geq -(|a| + |b|)$. So $|a+b| \leq |a| + |b|$.

**Case 4** ($a < 0, b \geq 0$): Symmetric to Case 3. $\square$

### Example 3: $\max(a, b) = \frac{a + b + |a - b|}{2}$

**Case 1** ($a \geq b$): $|a - b| = a - b$. RHS $= \frac{a + b + a - b}{2} = \frac{2a}{2} = a = \max(a, b)$. Check.

**Case 2** ($a < b$): $|a - b| = b - a$. RHS $= \frac{a + b + b - a}{2} = \frac{2b}{2} = b = \max(a, b)$. Check. $\square$

### Pen & Paper: Absolute Value of a Product

**Claim**: $|ab| = |a| \cdot |b|$.

Four cases (signs of $a$ and $b$):

| Case | $a$ | $b$ | $ab$ | $|ab|$ | $|a| \cdot |b|$ |
|------|-----|-----|------|--------|-----------------|
| 1 | $+$ | $+$ | $+$ | $ab$ | $ab$ |
| 2 | $+$ | $-$ | $-$ | $-ab = a(-b)$ | $a(-b)$ |
| 3 | $-$ | $+$ | $-$ | $-ab = (-a)b$ | $(-a)b$ |
| 4 | $-$ | $-$ | $+$ | $ab = (-a)(-b)$ | $(-a)(-b)$ |

All match. $\square$

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

# Visualise the triangle inequality |a+b| <= |a| + |b|
fig, ax = plt.subplots(figsize=(8, 4))

a_vals = np.linspace(-5, 5, 200)
b_val = 2.0

lhs = np.abs(a_vals + b_val)
rhs = np.abs(a_vals) + np.abs(b_val)

ax.plot(a_vals, lhs, label='|a + b|', linewidth=2)
ax.plot(a_vals, rhs, label='|a| + |b|', linewidth=2, linestyle='--')
ax.fill_between(a_vals, lhs, rhs, alpha=0.2, color='green',
                label='gap (always ≥ 0)')
ax.axvline(0, color='gray', linewidth=0.5)
ax.set_xlabel('a')
ax.set_ylabel('value')
ax.set_title(f'Triangle inequality with b = {b_val}')
ax.legend()
plt.tight_layout()
plt.savefig('triangle_inequality.png', dpi=100)
plt.show()
```

## Python Verification

```python
import random

# ── Proof by Cases: Verification ─────────────────────────

# Step 1: Verify n² + n is always even
print("=== n² + n is even ===")
for n in range(-1000, 1001):
    assert (n**2 + n) % 2 == 0, f"Failed at n={n}"
print("Verified for n in [-1000, 1000]")

# Step 2: Verify triangle inequality
print("\n=== Triangle Inequality ===")
random.seed(42)
for _ in range(100000):
    a = random.uniform(-100, 100)
    b = random.uniform(-100, 100)
    assert abs(a + b) <= abs(a) + abs(b) + 1e-10  # floating point tolerance
print("Triangle inequality verified for 100,000 random pairs")

# Step 3: Verify max formula
print("\n=== Max formula: max(a,b) = (a+b+|a-b|)/2 ===")
for _ in range(100000):
    a = random.uniform(-100, 100)
    b = random.uniform(-100, 100)
    formula = (a + b + abs(a - b)) / 2
    expected = max(a, b)
    assert abs(formula - expected) < 1e-10
print("Max formula verified for 100,000 random pairs")

# Step 4: Verify |ab| = |a||b|
print("\n=== |ab| = |a|·|b| ===")
for _ in range(100000):
    a = random.uniform(-100, 100)
    b = random.uniform(-100, 100)
    assert abs(abs(a * b) - abs(a) * abs(b)) < 1e-10
print("|ab| = |a|·|b| verified for 100,000 random pairs")

# Step 5: Show the case split explicitly
print("\n=== Case analysis for n² + n ===")
for n in range(-3, 4):
    case = "even" if n % 2 == 0 else "odd"
    val = n**2 + n
    factor = val // 2
    print(f"n={n:+d} ({case}): n²+n = {n**2}+{n} = {val} = 2·{factor}")
```

## Connection to CS / Games / AI / Business / Industry

- **Pattern matching** in functional languages (Haskell, Rust `match`) is proof by cases in code form.
- **Edge cases in algorithms**: handling empty arrays, single elements, and general case separately.
- **Game state machines**: proving correctness of state transitions often requires case-splitting on the current state.
- **Piecewise functions** (ReLU, absolute value) require case analysis for derivatives and continuity proofs.

## Check Your Understanding

1. Prove by cases: for all integers $n$, $n^3 - n$ is divisible by 3. (Hint: consider $n \mod 3$.)
2. Prove: $\min(a, b) = \frac{a + b - |a - b|}{2}$.
3. Prove by cases: for all real $x$, $x^2 \geq 0$. (Two cases: $x \geq 0$ and $x < 0$.)
