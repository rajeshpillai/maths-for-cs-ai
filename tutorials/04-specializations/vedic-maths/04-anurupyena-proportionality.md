# Anurupyena — "Proportionality"

## Intuition

The Anurupyena sutra exploits proportional relationships to simplify
multiplication, division, and ratio problems. Instead of computing a hard
multiplication directly, you scale one factor to something easy (like a
power of 10), perform the easy calculation, then adjust by the scaling
factor. This is the mathematical equivalent of "if I can't lift 80kg, I'll
lift 8kg ten times" — divide and conquer through proportionality.

## Prerequisites

- Foundation 1, Lesson 2: Algebraic Manipulation
- Foundation 1, Lesson 3: Fractions and Ratios

## The Sutra

> **आनुरूप्येण**
> *Anurupyena*
> "Proportionately"

The sutra says: use proportional adjustment. If a direct computation is hard,
find a proportional relationship that makes it easy.

## From First Principles

### The Technique (step by step)

**Application 1: Multiplication by ratio adjustment**

To multiply $a \times b$, find a convenient nearby number $c$ such that
$b = c \times k$ (or approximately), then $a \times b = (a \times c) \times k$.

---

**Example 1: 47 x 48**

Instead of direct multiplication:
- Note: 48 = 50 x (48/50) = 50 x 0.96. This is awkward.
- Better: 48 = 12 x 4. So 47 x 48 = 47 x 12 x 4.
- Or use: 47 x 48 = 47 x 50 - 47 x 2 = 2350 - 94 = 2256.

The proportionality approach: adjust to the nearest easy multiple.
47 x 48 = (50 - 3)(50 - 2) — use Nikhilam here, or:
47 x 48 = 48 x 47 = 48 x 50 - 48 x 3 = 2400 - 144 = 2256.

---

**Application 2: Division by proportional adjustment**

To divide by a number near a power of 10, adjust proportionally.

**Example 2: 7344 / 48**

$48 = 50 - 2$. So:
$$\frac{7344}{48} = \frac{7344}{50} \times \frac{50}{48} = 146.88 \times \frac{25}{24}$$

Actually, simpler: $48 \times 2 = 96 \approx 100$.
$$\frac{7344}{48} = \frac{7344 \times 2}{48 \times 2} = \frac{14688}{96} \approx \frac{14688}{100} \times \frac{100}{96}$$

Simplest mental approach:
$$7344 / 48 = 7344 / (50 - 2)$$

Scale: $7344 / 50 = 146.88$. Then correct for dividing by 48 instead of 50:
Since $48 < 50$, the actual quotient is larger. Correction factor: $50/48 = 25/24$.
$146.88 \times 25/24 = 153$.

Check: 48 x 153 = 7344. Correct.

---

**Application 3: Proportional multiplication (scaling method)**

**Example 3: 35 x 24**

Scale to get one factor to a power of 10:
- Double 35 and halve 24: $70 \times 12 = 840$.
- Or: $35 \times 24 = 35 \times 4 \times 6 = 140 \times 6 = 840$.

---

**Application 4: Ratios and proportional reasoning**

**Example 4: If 12 items cost 156, what do 8 items cost?**

Ratio: 8/12 = 2/3.
Cost = 156 x 2/3 = 312/3 = 104.

Mental shortcut: 156/3 = 52, then 52 x 2 = 104.

### Why It Works (algebraic proof)

The mathematical foundation is trivial but powerful:

**Scaling property of multiplication**:
$$a \times b = (a \times k) \times (b / k) \quad \text{for any } k \neq 0$$

This lets you transform any product into an equivalent product where one
factor is "easier" (a round number, a power of 10, etc.).

**For division**:
$$\frac{a}{b} = \frac{a \times k}{b \times k}$$

Choose $k$ so that $b \times k$ is a convenient divisor (power of 10).

**Distributive adjustment**:
$$a \times (b + c) = ab + ac$$

When $b$ is easy and $c$ is small, you compute the hard product as an
easy product plus a small correction.

The key insight: **any arithmetic operation can be decomposed into easier
operations through proportional relationships**. This is not an approximation
— it is exact algebra.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Left: show scaling transformation
ax = axes[0]
ax.set_title('Proportional Scaling: 35 × 24 = 70 × 12', fontsize=12, fontweight='bold')

# Original rectangle 35 x 24
from matplotlib.patches import Rectangle, FancyArrowPatch

rect1 = Rectangle((0.5, 0.5), 3.5, 2.4, facecolor='#BBDEFB', edgecolor='black', lw=2)
ax.add_patch(rect1)
ax.text(2.25, 1.7, '35 × 24\n= 840', ha='center', va='center', fontsize=12)

# Arrow showing transformation
ax.annotate('', xy=(5.5, 1.7), xytext=(4.3, 1.7),
            arrowprops=dict(arrowstyle='->', lw=2, color='red'))
ax.text(4.9, 2.1, '×2 / ÷2', ha='center', fontsize=10, color='red')

# Transformed rectangle 70 x 12
rect2 = Rectangle((5.5, 1.1), 7.0, 1.2, facecolor='#C8E6C9', edgecolor='black', lw=2)
ax.add_patch(rect2)
ax.text(9.0, 1.7, '70 × 12\n= 840', ha='center', va='center', fontsize=12)

ax.set_xlim(0, 13)
ax.set_ylim(0, 3.5)
ax.set_aspect('equal')
ax.set_xticks([])
ax.set_yticks([])
ax.text(6.5, 0.3, 'Same area! Different shape — easier to compute.',
        ha='center', fontsize=10, style='italic')

# Right: mental division strategy
ax2 = axes[1]
ax2.axis('off')
ax2.set_title('Division Strategy: 7344 ÷ 48', fontsize=12, fontweight='bold')

text = (
    "Target: 7344 ÷ 48\n"
    "\n"
    "Strategy: Scale divisor to 100\n"
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    "  48 × 2 = 96 ≈ 100\n"
    "\n"
    "  7344 ÷ 48\n"
    "= (7344 × 2) ÷ (48 × 2)\n"
    "= 14688 ÷ 96\n"
    "\n"
    "  14688 ÷ 100 = 146.88\n"
    "  Correction: ÷ 96 instead of ÷ 100\n"
    "  = 146.88 × (100/96)\n"
    "  = 146.88 × 1.0417\n"
    "  = 153 ✓\n"
    "\n"
    "Or simply: 7344/48 = 7344/(50-2)\n"
    "  7344/50 ≈ 147, adjust up → 153"
)
ax2.text(0.05, 0.5, text, transform=ax2.transAxes, fontsize=11,
         family='monospace', va='center',
         bbox=dict(boxstyle='round', facecolor='lightyellow', alpha=0.9))

plt.tight_layout()
plt.savefig('anurupyena_visualisation.png', dpi=100, bbox_inches='tight')
plt.show()
```

## Python Verification

```python
# ── Anurupyena: Proportionality Methods ──────────────────

def multiply_by_scaling(a, b):
    """
    Multiply a × b by finding a convenient scaling.
    Strategy: scale b to nearest multiple of 10.
    """
    print(f"\n  Computing {a} × {b} by proportional scaling:")

    # Find a power-of-2 scale that makes one factor end in 0
    # Try doubling/halving
    if b % 2 == 0:
        # Halve b, double a
        new_a, new_b = a * 2, b // 2
        print(f"  Scale: {a}×2 = {new_a}, {b}÷2 = {new_b}")
        if new_b % 10 == 0:
            result = new_a * new_b
            print(f"  Easy: {new_a} × {new_b} = {result}")
            return result
    if a % 2 == 0:
        new_a, new_b = a // 2, b * 2
        print(f"  Scale: {a}÷2 = {new_a}, {b}×2 = {new_b}")
        if new_b % 10 == 0:
            result = new_a * new_b
            print(f"  Easy: {new_a} × {new_b} = {result}")
            return result

    # Distributive approach: b = round_b + correction
    round_b = round(b, -1)  # round to nearest 10
    correction = b - round_b
    result = a * round_b + a * correction
    print(f"  Distribute: {a} × {round_b} + {a} × ({correction})")
    print(f"  = {a * round_b} + {a * correction} = {result}")
    return result


def divide_by_scaling(a, b):
    """Divide a ÷ b by scaling b toward a power of 10."""
    print(f"\n  Computing {a} ÷ {b} by proportional scaling:")

    # Find k such that b*k is close to a power of 10
    power = 10 ** len(str(b))
    k = power / b
    print(f"  Base {power}: scale factor k = {power}/{b} = {k:.4f}")

    # Scale both
    scaled_a = a * k
    print(f"  {a} × {k:.4f} = {scaled_a:.4f}")
    print(f"  {b} × {k:.4f} = {power}")
    result = scaled_a / power
    print(f"  Result: {scaled_a:.4f} / {power} = {result:.4f}")
    return result


# Test multiplication by scaling
print("Multiplication by proportional scaling:")
print("=" * 50)

cases = [(35, 24, 840), (47, 48, 2256), (125, 32, 4000), (56, 25, 1400)]
for a, b, expected in cases:
    result = multiply_by_scaling(a, b)
    assert result == expected, f"Expected {expected}, got {result}"
    print(f"  ✓ Correct!")

# Test division
print("\n\nDivision by proportional scaling:")
print("=" * 50)
result = divide_by_scaling(7344, 48)
print(f"  Expected: 153, Got: {result:.1f}")
assert abs(result - 153) < 0.01

# Demonstrate proportional reasoning for ratios
print("\n\nProportional reasoning:")
print("=" * 50)

# If 12 items cost 156, what do 8 cost?
items_known, cost_known, items_query = 12, 156, 8
ratio = items_query / items_known
cost_query = cost_known * ratio
print(f"  {items_known} items cost {cost_known}")
print(f"  {items_query} items cost: {cost_known} × {items_query}/{items_known}")
print(f"  = {cost_known} × {ratio:.4f} = {cost_query:.0f}")

# The "halving and doubling" trick
print("\n\nHalving and Doubling shortcut:")
print("=" * 50)
pairs = [(35, 24), (125, 16), (45, 36), (250, 48)]
for a, b in pairs:
    expected = a * b
    # Keep doubling a and halving b until one is easy
    aa, bb = a, b
    steps = []
    while bb % 10 != 0 and bb > 1:
        if bb % 2 == 0:
            aa, bb = aa * 2, bb // 2
            steps.append(f"{aa}×{bb}")
        else:
            break
    print(f"  {a} × {b} → {' → '.join(steps) if steps else 'no simplification'} = {expected}")
```

## Connection to CS / Games / AI / Business / Industry

- **Bit shifting**: In binary, multiplying/dividing by 2 is just a shift.
  The halving-and-doubling trick is what hardware does with shift-and-add
  multiplication.
- **Fixed-point arithmetic**: Game engines often scale by powers of 2 for
  fast arithmetic — this is Anurupyena applied to binary.
- **Learning rate scaling**: In ML, when you change batch size by factor k,
  you scale learning rate by sqrt(k) — proportional reasoning.
- **Dimensional analysis**: Checking units in physics simulations relies on
  the same proportional thinking.

## Practice Problems

Solve these using proportional scaling (not brute force):

1. 45 x 36 = ? (hint: halve one, double other)
2. 125 x 64 = ? (keep halving 64, doubling 125)
3. 3528 / 56 = ? (scale 56 toward 100)
4. If 15 widgets cost $225, what do 9 cost?
5. 72 x 125 = ? (125 = 1000/8)
6. 3.5 x 2.4 = ? (same as 35 x 24 / 100)
7. 48 x 75 = ? (48 x 75 = 24 x 150 = 12 x 300)

**Answers**: 1620, 8000, 63, $135, 9000, 8.4, 3600
