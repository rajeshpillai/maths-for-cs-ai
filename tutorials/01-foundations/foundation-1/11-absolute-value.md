# Absolute Value — Distance, Piecewise Thinking, and Norms

## Intuition

The absolute value $|x|$ answers one question: **how far is $x$ from zero?**
Direction does not matter — only magnitude.  This idea generalises into norms
(measuring vector length in ML), loss functions (we care about error size, not
sign), and activation functions like ReLU that clip negative values to zero.

## Prerequisites

- Foundation 1, Lesson 4: Equations and Inequalities

## From First Principles

### Definition

$$|x| = \begin{cases} x & \text{if } x \geq 0 \\ -x & \text{if } x < 0 \end{cases}$$

This is a **piecewise function** — it uses different rules on different intervals.

**Pen & paper examples:**

$|7| = 7$, $|-3| = 3$, $|0| = 0$

Key properties:

- $|x| \geq 0$ always
- $|x| = 0$ if and only if $x = 0$
- $|ab| = |a| \cdot |b|$
- $|a + b| \leq |a| + |b|$ (triangle inequality)

### Absolute value as distance

$|a - b|$ is the distance between $a$ and $b$ on the number line.

$|5 - 2| = 3$, $|2 - 5| = 3$ — same distance regardless of order.

### Solving absolute value equations

**Solve $|2x - 3| = 7$:**

Two cases:

**Case 1:** $2x - 3 = 7$ → $2x = 10$ → $x = 5$

**Case 2:** $2x - 3 = -7$ → $2x = -4$ → $x = -2$

**Verify:** $|2(5) - 3| = |7| = 7$ ✓, $|2(-2) - 3| = |-7| = 7$ ✓

**Solve $|x + 1| = |3x - 5|$:**

**Case 1:** $x + 1 = 3x - 5$ → $6 = 2x$ → $x = 3$

**Case 2:** $x + 1 = -(3x - 5)$ → $x + 1 = -3x + 5$ → $4x = 4$ → $x = 1$

### Solving absolute value inequalities

**Type 1: $|x| < a$ (less than)**

$$|x| < 3 \quad \Longleftrightarrow \quad -3 < x < 3$$

"Distance from zero is less than 3" — you stay inside the interval.

**Type 2: $|x| > a$ (greater than)**

$$|x| > 3 \quad \Longleftrightarrow \quad x < -3 \text{ or } x > 3$$

"Distance from zero exceeds 3" — you go outside the interval.

**Pen & paper:** Solve $|2x - 1| \leq 5$:

$-5 \leq 2x - 1 \leq 5$

$-4 \leq 2x \leq 6$

$-2 \leq x \leq 3$

### Transformations of the absolute value graph

The base graph $y = |x|$ is a V-shape with vertex at the origin.

- $y = |x - h| + k$: vertex shifts to $(h, k)$
- $y = a|x|$: vertical stretch by factor $|a|$; if $a < 0$, the V flips upside down

**Pen & paper:** $y = 2|x - 3| - 1$ has vertex at $(3, -1)$, opening upward, steeper than $y = |x|$.

### Visualisation

```python
# ── Absolute value: V-shaped graphs with transformations ───
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-5, 8, 500)

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Left: basic |x| and transformations
ax1 = axes[0]
ax1.plot(x, np.abs(x), 'b-', linewidth=2, label='$y = |x|$')
ax1.plot(x, np.abs(x - 2) + 1, 'r-', linewidth=2, label='$y = |x - 2| + 1$')
ax1.plot(x, 2*np.abs(x + 1) - 3, 'g-', linewidth=2, label='$y = 2|x + 1| - 3$')
ax1.plot([0, 2, -1], [0, 1, -3], 'ko', markersize=6)  # vertices
ax1.axhline(0, color='k', linewidth=0.5)
ax1.axvline(0, color='k', linewidth=0.5)
ax1.set_title('Absolute Value Transformations')
ax1.legend(fontsize=9)
ax1.grid(True, alpha=0.3)
ax1.set_ylim(-5, 10)

# Right: |2x-1| ≤ 5 solution on number line
ax2 = axes[1]
ax2.plot(x, np.abs(2*x - 1), 'b-', linewidth=2, label='$y = |2x - 1|$')
ax2.axhline(5, color='r', linestyle='--', linewidth=1.5, label='$y = 5$')
ax2.fill_between(x, 0, np.abs(2*x - 1),
                  where=(np.abs(2*x - 1) <= 5), alpha=0.2, color='green',
                  label='$|2x-1| \\leq 5$: $x \\in [-2, 3]$')
ax2.plot([-2, 3], [5, 5], 'ro', markersize=8)
ax2.set_title('Solving $|2x - 1| \\leq 5$')
ax2.legend(fontsize=9)
ax2.grid(True, alpha=0.3)
ax2.set_ylim(-1, 12)

plt.tight_layout()
plt.savefig('absolute_value.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Absolute Value ─────────────────────────────────────────

# Piecewise definition
print("=== Piecewise definition ===")
for val in [7, -3, 0, -5.5]:
    result = val if val >= 0 else -val
    print(f"  |{val}| = {result} (built-in: {abs(val)})")

# Solving |2x - 3| = 7
print("\n=== Solve |2x - 3| = 7 ===")
solutions = [5, -2]
for x in solutions:
    print(f"  x = {x}: |2({x}) - 3| = |{2*x - 3}| = {abs(2*x - 3)}")

# Triangle inequality: |a + b| ≤ |a| + |b|
print("\n=== Triangle inequality ===")
pairs = [(3, -5), (-2, -7), (4, 6)]
for a, b in pairs:
    lhs = abs(a + b)
    rhs = abs(a) + abs(b)
    print(f"  |{a} + {b}| = {lhs} ≤ |{a}| + |{b}| = {rhs}  ({lhs <= rhs})")

# Inequality: |2x - 1| ≤ 5 → -2 ≤ x ≤ 3
print("\n=== Solve |2x - 1| ≤ 5 ===")
print("  Solution: -2 ≤ x ≤ 3")
# Verify boundary values
for x in [-2, 3]:
    print(f"  x = {x}: |2({x}) - 1| = {abs(2*x - 1)} ≤ 5 ✓")
# Verify an interior and exterior point
print(f"  x = 0 (inside): |2(0) - 1| = {abs(-1)} ≤ 5 ✓")
print(f"  x = 4 (outside): |2(4) - 1| = {abs(7)} > 5 ✓")

# Connection to ReLU
print("\n=== ReLU as absolute value ===")
print("  ReLU(x) = max(0, x) = (x + |x|) / 2")
for x in [-3, -1, 0, 2, 5]:
    relu = max(0, x)
    via_abs = (x + abs(x)) / 2
    print(f"  ReLU({x}) = {relu}, (x+|x|)/2 = {via_abs:.0f}")
```

## Connection to CS / Games / AI

- **L1 norm** — $\|v\|_1 = |v_1| + |v_2| + \cdots + |v_n|$ measures vector magnitude (Manhattan distance)
- **ReLU activation** — $\text{ReLU}(x) = \max(0, x) = \frac{x + |x|}{2}$, the most common neural network activation
- **Mean Absolute Error** — a loss function: $\text{MAE} = \frac{1}{n}\sum|y_i - \hat{y}_i|$
- **Collision detection** — distance between objects uses absolute differences in coordinates
- **Error tolerance** — checking $|a - b| < \epsilon$ is the standard floating-point equality test

## Check Your Understanding

1. **Pen & paper:** Solve $|3x + 2| = 11$.
2. **Pen & paper:** Solve $|x - 4| > 6$ and express the solution as a union of intervals.
3. **Pen & paper:** Sketch $y = -|x + 2| + 5$ and state the vertex.
4. **Think:** Why is $|a - b|$ a better measure of "error" than $a - b$?
