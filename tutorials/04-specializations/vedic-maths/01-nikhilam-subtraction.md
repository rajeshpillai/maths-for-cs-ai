# Nikhilam Sutra — "All from 9, Last from 10"

## Intuition

The Nikhilam sutra is the cornerstone of Vedic speed arithmetic. It lets you
multiply numbers close to a "base" (10, 100, 1000, ...) in your head, turning
what looks like hard multiplication into simple subtraction and a tiny
multiplication. Instead of computing 97 x 96 the long way (four partial
products), you subtract each number from 100, do one small multiply, and
you're done — often in under 3 seconds mentally.

## Prerequisites

- Foundation 1, Lesson 2: Algebraic Manipulation
- Tier 0, Lesson 1: Number Systems (place value)

## The Sutra

> **निखिलं नवतश्चरमं दशतः**
> *Nikhilam Navatascaramam Dasatah*
> "All from 9, the last from 10"

This tells you how to find the **complement** of a number with respect to a
base: subtract each digit from 9, except the last digit which you subtract
from 10.

Example: complement of 97 with respect to 100 → first digit: 9 - 9 = 0,
last digit: 10 - 7 = 3, so the complement is 03.

## From First Principles

### The Technique (step by step)

**Problem**: Multiply two numbers close to a base (power of 10).

**Method**:
1. Choose the nearest base (10, 100, 1000, ...).
2. Find each number's **deficiency** (how far below the base).
3. Cross-subtract: either number minus the other's deficiency.
4. Multiply the deficiencies together.
5. Concatenate: the cross-subtraction result forms the left part,
   the deficiency product forms the right part (padded to match the number
   of zeros in the base).

---

**Example 1: 97 x 96**

| Number | Base | Deficiency |
|--------|------|------------|
| 97     | 100  | 3          |
| 96     | 100  | 4          |

1. **Step 1:** Cross-subtract: 97 - 4 = 93 (or equivalently, 96 - 3 = 93).
2. **Step 2:** Multiply deficiencies: 3 x 4 = 12.
3. **Step 3:** Concatenate: 93 | 12 → **9312**.

Check: 97 x 96 = 9312. Correct.

---

**Example 2: 88 x 91**

| Number | Base | Deficiency |
|--------|------|------------|
| 88     | 100  | 12         |
| 91     | 100  | 9          |

1. **Step 1:** Cross-subtract: 88 - 9 = 79 (or 91 - 12 = 79).
2. **Step 2:** Multiply deficiencies: 12 x 9 = 108.
3. **Step 3:** Since the base is 100 (2 zeros), the right part should be 2 digits.
   But 108 is 3 digits — carry the 1 over: 79 + 1 = 80, right part = 08.
Result: **8008**.

Check: 88 x 91 = 8008. Correct.

---

**Example 3: 993 x 997**

| Number | Base | Deficiency |
|--------|------|------------|
| 993    | 1000 | 7          |
| 997    | 1000 | 3          |

1. **Step 1:** Cross-subtract: 993 - 3 = 990.
2. **Step 2:** Multiply deficiencies: 7 x 3 = 21.
3. **Step 3:** Base is 1000 (3 zeros), so pad right part to 3 digits: 021.
Result: 990 | 021 → **990021**.

Check: 993 x 997 = 990021. Correct.

### Why It Works (algebraic proof)

Let the base be $B$. Let the two numbers be $(B - a)$ and $(B - b)$, where
$a$ and $b$ are the deficiencies.

$$
(B - a)(B - b) = B^2 - Bb - Ba + ab = B(B - a - b) + ab
$$

Now look at this result:
- The left part is $B \times (B - a - b)$. Since $B$ is a power of 10,
  multiplying by $B$ just shifts digits left.
- The right part is $ab$, the product of deficiencies.

The "cross-subtraction" step computes $B - a - b$, which equals
$(B - a) - b$ (first number minus second's deficiency) or $(B - b) - a$.

So the technique is simply factoring the product into:
$$
\text{Result} = (B - a - b) \times B + a \times b
$$

This is not magic — it's the distributive law.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

# Visualise complements on a number line near base 100
base = 100
numbers = [97, 96]
deficiencies = [base - n for n in numbers]

fig, axes = plt.subplots(2, 1, figsize=(10, 5))

# Number line showing complements
ax = axes[0]
ax.set_xlim(85, 105)
ax.set_ylim(-0.5, 1.5)
ax.hlines(0.5, 85, 105, colors='black', linewidth=2)

# Mark the base
ax.plot(base, 0.5, 'ko', markersize=10)
ax.annotate('Base = 100', (base, 0.7), ha='center', fontsize=12, fontweight='bold')

# Mark each number and its deficiency
colors = ['#2196F3', '#FF5722']
for i, (num, d) in enumerate(zip(numbers, deficiencies)):
    y = 0.5
    ax.plot(num, y, 'o', color=colors[i], markersize=10)
    ax.annotate(f'{num}', (num, y + 0.2), ha='center', fontsize=12, color=colors[i])
    # Arrow showing deficiency
    ax.annotate('', xy=(base, y - 0.15 - i*0.1), xytext=(num, y - 0.15 - i*0.1),
                arrowprops=dict(arrowstyle='<->', color=colors[i], lw=2))
    mid = (num + base) / 2
    ax.annotate(f'def = {d}', (mid, y - 0.3 - i*0.15), ha='center',
                fontsize=11, color=colors[i])

ax.set_title('Nikhilam: Deficiencies from Base', fontsize=14)
ax.set_yticks([])

# Show the algebra
ax = axes[1]
ax.axis('off')
a, b = deficiencies
cross = numbers[0] - deficiencies[1]  # or numbers[1] - deficiencies[0]
prod = a * b
result = numbers[0] * numbers[1]
text = (f'{numbers[0]} x {numbers[1]}\n'
        f'= (100 - {a})(100 - {b})\n'
        f'= 100 x ({numbers[0]} - {b}) + {a} x {b}\n'
        f'= 100 x {cross} + {prod}\n'
        f'= {cross * 100} + {prod} = {result}')
ax.text(0.5, 0.5, text, transform=ax.transAxes, fontsize=14,
        ha='center', va='center', family='monospace',
        bbox=dict(boxstyle='round', facecolor='lightyellow'))

plt.tight_layout()
plt.savefig('nikhilam_visualisation.png', dpi=100, bbox_inches='tight')
plt.show()
```

## Python Verification

```python
# ── Nikhilam Sutra: Verification ─────────────────────────

def nikhilam_multiply(num1, num2):
    """Multiply two numbers using the Nikhilam method."""
    # Step 1: Find the nearest base (power of 10)
    base = 10 ** len(str(max(num1, num2)))

    # Step 2: Compute deficiencies
    def1 = base - num1
    def2 = base - num2

    # Step 3: Cross-subtract (either way gives same result)
    left_part = num1 - def2  # equivalently: num2 - def1

    # Step 4: Multiply deficiencies
    right_part = def1 * def2

    # Step 5: Combine (left_part * base + right_part)
    result = left_part * base + right_part

    print(f"  {num1} x {num2}  (base = {base})")
    print(f"  Deficiencies: {def1}, {def2}")
    print(f"  Cross-subtract: {num1} - {def2} = {left_part}")
    print(f"  Deficiency product: {def1} x {def2} = {right_part}")
    print(f"  Result: {left_part} x {base} + {right_part} = {result}")
    return result


# Verify all examples
print("=" * 50)
print("Example 1: 97 x 96")
assert nikhilam_multiply(97, 96) == 97 * 96 == 9312

print("\nExample 2: 88 x 91")
assert nikhilam_multiply(88, 91) == 88 * 91 == 8008

print("\nExample 3: 993 x 997")
assert nikhilam_multiply(993, 997) == 993 * 997 == 990021

print("\nExample 4: 9997 x 9998")
assert nikhilam_multiply(9997, 9998) == 9997 * 9998

# Algebraic proof verification
print("\n" + "=" * 50)
print("Algebraic proof: (B - a)(B - b) = B(B - a - b) + ab")
B, a, b = 100, 3, 4
lhs = (B - a) * (B - b)
rhs = B * (B - a - b) + a * b
print(f"  B={B}, a={a}, b={b}")
print(f"  LHS: ({B}-{a})({B}-{b}) = {B-a} x {B-b} = {lhs}")
print(f"  RHS: {B}({B}-{a}-{b}) + {a}x{b} = {B}x{B-a-b} + {a*b} = {rhs}")
assert lhs == rhs
print("  Proof verified!")

# Also works for numbers ABOVE the base
print("\n" + "=" * 50)
print("Numbers above base: 103 x 105")
# Surplus method: (B+a)(B+b) = B(B+a+b) + ab
num1, num2 = 103, 105
base = 100
surplus1 = num1 - base  # 3
surplus2 = num2 - base  # 5
left = num1 + surplus2  # 108
right = surplus1 * surplus2  # 15
result = left * base + right
print(f"  103 + 5 = {left}, 3 x 5 = {right}")
print(f"  Result: {left} x 100 + {right} = {result}")
assert result == 103 * 105
print("  Correct!")
```

## Connection to CS / Games / AI / Business / Industry

- **Two's complement** in binary is the same idea: to negate a number, flip
  all bits and add 1 — "all from 1, last from 2" in base 2.
- **Complement arithmetic** in hardware ALUs uses this principle to turn
  subtraction into addition.
- **Mental estimation** in coding interviews: when you need to quickly
  approximate products of numbers near powers of 10.
- **Modular arithmetic**: the deficiency is simply $-n \pmod{B}$, connecting
  directly to clock arithmetic and cryptographic computations.

## Practice Problems

Solve using the Nikhilam method, then verify conventionally:

1. 98 x 97 = ?
2. 92 x 93 = ?
3. 87 x 88 = ?
4. 995 x 992 = ?
5. 9999 x 9991 = ?
6. 104 x 107 = ? (numbers above the base — use surplus method)
7. 1003 x 998 = ? (one above, one below — mixed case)

**Answers**: 9506, 8556, 7656, 987040, 99900009, 11128, 1000994
