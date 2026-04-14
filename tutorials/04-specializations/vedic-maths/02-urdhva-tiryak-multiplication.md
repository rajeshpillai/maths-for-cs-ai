# Urdhva-Tiryagbhyam — "Vertically and Crosswise"

## Intuition

This is the most general Vedic multiplication technique. It works for ANY
two numbers of any size, not just those near a base. The method breaks
multiplication into a series of small single-digit multiplications and
additions, processed column by column from right to left (or left to right).
For 2-digit x 2-digit numbers, you need only 3 mental steps instead of the
4 partial products of long multiplication. For 3-digit x 3-digit, 5 steps
instead of 9.

## Prerequisites

- Foundation 1, Lesson 2: Algebraic Manipulation
- Tier 0, Lesson 1: Number Systems (place value understanding)

## The Sutra

> **ऊर्ध्वतिर्यग्भ्याम्**
> *Urdhva-Tiryagbhyam*
> "Vertically and Crosswise"

The name describes the pattern of digit pairings: some multiply vertically
(digit above digit), others multiply crosswise (diagonals), and you sum them.

## From First Principles

### The Technique (step by step)

**2-digit x 2-digit**: Let the numbers be $\overline{ab}$ and $\overline{cd}$.

Write them vertically:
```
  a  b
  c  d
```

**Step 1 (rightmost column)**: Vertical — multiply the right digits.
$$b \times d$$
Write the units digit, carry the tens.

**Step 2 (middle column)**: Crosswise — multiply diagonals and add.
$$a \times d + b \times c + \text{carry}$$
Write the units digit, carry the rest.

**Step 3 (leftmost column)**: Vertical — multiply the left digits.
$$a \times c + \text{carry}$$
Write the result.

---

**Example 1: 23 x 41**

```
  2  3
  4  1
```

1. **Step 1:** (vertical right): 3 x 1 = 3. Write 3, carry 0.
2. **Step 2:** (crosswise): 2 x 1 + 3 x 4 = 2 + 12 = 14. Write 4, carry 1.
3. **Step 3:** (vertical left): 2 x 4 + carry 1 = 8 + 1 = 9.

Result: **943**.

Check: 23 x 41 = 943. Correct.

---

**Example 2: 67 x 83**

```
  6  7
  8  3
```

1. **Step 1:** 7 x 3 = 21. Write 1, carry 2.
2. **Step 2:** 6 x 3 + 7 x 8 + 2 = 18 + 56 + 2 = 76. Write 6, carry 7.
3. **Step 3:** 6 x 8 + 7 = 48 + 7 = 55.

Result: **5561**.

Check: 67 x 83 = 5561. Correct.

---

**3-digit x 3-digit**: Let the numbers be $\overline{abc}$ and $\overline{def}$.

```
  a  b  c
  d  e  f
```

**Step 1**: $c \times f$
**Step 2**: $b \times f + c \times e$
**Step 3**: $a \times f + b \times e + c \times d$
**Step 4**: $a \times e + b \times d$
**Step 5**: $a \times d$
(Plus carries at each step.)

---

**Example 3: 123 x 456**

```
  1  2  3
  4  5  6
```

1. **Step 1:** 3 x 6 = 18. Write 8, carry 1.
2. **Step 2:** 2 x 6 + 3 x 5 + 1 = 12 + 15 + 1 = 28. Write 8, carry 2.
3. **Step 3:** 1 x 6 + 2 x 5 + 3 x 4 + 2 = 6 + 10 + 12 + 2 = 30. Write 0, carry 3.
4. **Step 4:** 1 x 5 + 2 x 4 + 3 = 5 + 8 + 3 = 16. Write 6, carry 1.
5. **Step 5:** 1 x 4 + 1 = 5.

Result: **56088**.

Check: 123 x 456 = 56088. Correct.

### Why It Works (algebraic proof)

**2-digit case**: Let the numbers be $(10a + b)$ and $(10c + d)$.

$$
(10a + b)(10c + d) = 100ac + 10(ad + bc) + bd
$$

This is exactly what the three steps compute:
- Step 1 contributes $bd$ (units and tens via carry)
- Step 2 contributes $ad + bc$ in the tens column
- Step 3 contributes $ac$ in the hundreds column

The column-wise collection is identical to expanding the polynomial product
and grouping by powers of 10.

**3-digit case**: $(100a + 10b + c)(100d + 10e + f)$

$$= 10000ad + 1000(ae + bd) + 100(af + be + cd) + 10(bf + ce) + cf$$

Each coefficient of $10^k$ corresponds to one step of the Urdhva method.
The pattern generalises: for $n$-digit numbers, you get $2n - 1$ steps, and
step $k$ sums all products $a_i \times b_j$ where $i + j = k$.

This is **polynomial multiplication** — each number is a polynomial in base 10,
and the crosswise pattern computes the convolution of their digit sequences.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# 2-digit cross diagram
ax = axes[0]
ax.set_xlim(-1, 3)
ax.set_ylim(-1, 3)
ax.set_aspect('equal')
ax.set_title('2-digit x 2-digit\n(3 steps)', fontsize=13, fontweight='bold')
ax.axis('off')

# Digit positions
top = [(0.5, 2), (2, 2)]  # a, b
bot = [(0.5, 0.5), (2, 0.5)]  # c, d

for pos, label in zip(top, ['a', 'b']):
    ax.plot(*pos, 'o', markersize=25, color='#2196F3')
    ax.text(*pos, label, ha='center', va='center', fontsize=14, color='white', fontweight='bold')
for pos, label in zip(bot, ['c', 'd']):
    ax.plot(*pos, 'o', markersize=25, color='#FF5722')
    ax.text(*pos, label, ha='center', va='center', fontsize=14, color='white', fontweight='bold')

# Step 1: vertical right (b*d)
ax.annotate('', xy=bot[1], xytext=top[1],
            arrowprops=dict(arrowstyle='->', color='green', lw=3))
ax.text(2.5, 1.25, 'Step 1\nb×d', fontsize=10, color='green')

# Step 2: crosswise (a*d + b*c)
ax.annotate('', xy=bot[1], xytext=top[0],
            arrowprops=dict(arrowstyle='->', color='purple', lw=2, linestyle='--'))
ax.annotate('', xy=bot[0], xytext=top[1],
            arrowprops=dict(arrowstyle='->', color='purple', lw=2, linestyle='--'))
ax.text(-0.7, 1.25, 'Step 2\na×d+b×c', fontsize=10, color='purple')

# Step 3: vertical left (a*c)
ax.annotate('', xy=bot[0], xytext=top[0],
            arrowprops=dict(arrowstyle='->', color='red', lw=3))
ax.text(-0.7, 2.5, 'Step 3\na×c', fontsize=10, color='red')

# Worked example: 23 x 41
ax2 = axes[1]
ax2.axis('off')
ax2.set_title('Example: 23 x 41', fontsize=13, fontweight='bold')
steps_text = (
    "    2  3\n"
    "  x 4  1\n"
    "  ------\n"
    "Step 1: 3×1 = 3        → ...3\n"
    "Step 2: 2×1 + 3×4 = 14 → ..43  (carry 1)\n"
    "Step 3: 2×4 + 1 = 9    → 943\n"
    "\n"
    "Answer: 943 ✓"
)
ax2.text(0.1, 0.5, steps_text, transform=ax2.transAxes, fontsize=12,
         family='monospace', va='center',
         bbox=dict(boxstyle='round', facecolor='lightyellow', alpha=0.8))

# 3-digit pattern
ax3 = axes[2]
ax3.axis('off')
ax3.set_title('3-digit: Convolution Pattern', fontsize=13, fontweight='bold')
pattern_text = (
    "  a   b   c\n"
    "  d   e   f\n"
    "  ---------\n"
    "Step 1: c×f\n"
    "Step 2: b×f + c×e\n"
    "Step 3: a×f + b×e + c×d\n"
    "Step 4: a×e + b×d\n"
    "Step 5: a×d\n"
    "\n"
    "Each step: sum of aᵢ×bⱼ\n"
    "where i+j = step index\n"
    "(This IS convolution!)"
)
ax3.text(0.1, 0.5, pattern_text, transform=ax3.transAxes, fontsize=11,
         family='monospace', va='center',
         bbox=dict(boxstyle='round', facecolor='lightcyan', alpha=0.8))

plt.tight_layout()
plt.savefig('urdhva_tiryak_visualisation.png', dpi=100, bbox_inches='tight')
plt.show()
```

## Python Verification

```python
# ── Urdhva-Tiryagbhyam: Verification ─────────────────────

def urdhva_multiply(num1, num2):
    """
    Multiply two numbers using the Urdhva-Tiryagbhyam (crosswise) method.
    Works for any number of digits.
    """
    # Convert to digit arrays (least significant first for easier indexing)
    digits1 = [int(d) for d in str(num1)][::-1]
    digits2 = [int(d) for d in str(num2)][::-1]

    n1, n2 = len(digits1), len(digits2)
    # Pad the shorter one with leading zeros
    max_len = max(n1, n2)
    while len(digits1) < max_len:
        digits1.append(0)
    while len(digits2) < max_len:
        digits2.append(0)

    n = max_len
    num_steps = 2 * n - 1
    result_digits = []
    carry = 0

    print(f"  {num1} x {num2}")
    print(f"  Digits (LSB first): {digits1} x {digits2}")

    for step in range(num_steps):
        # Sum all products a_i * b_j where i + j = step
        column_sum = carry
        pairs = []
        for i in range(n):
            j = step - i
            if 0 <= j < n:
                product = digits1[i] * digits2[j]
                column_sum += product
                pairs.append(f"{digits1[i]}x{digits2[j]}")

        digit = column_sum % 10
        carry = column_sum // 10
        result_digits.append(digit)
        print(f"  Step {step+1}: {' + '.join(pairs)} + carry = {column_sum}"
              f" → digit {digit}, carry {carry}")

    # Handle remaining carry
    while carry > 0:
        result_digits.append(carry % 10)
        carry //= 10

    # Convert back to number
    result = sum(d * (10 ** i) for i, d in enumerate(result_digits))
    print(f"  Result: {result}")
    return result


# Verify all examples
print("=" * 55)
print("Example 1: 23 x 41")
assert urdhva_multiply(23, 41) == 943

print("\nExample 2: 67 x 83")
assert urdhva_multiply(67, 83) == 5561

print("\nExample 3: 123 x 456")
assert urdhva_multiply(123, 456) == 56088

print("\nExample 4: 999 x 999")
assert urdhva_multiply(999, 999) == 998001

# Show the polynomial multiplication connection
print("\n" + "=" * 55)
print("Connection to polynomial convolution:")
print("  123 as polynomial: 1*x^2 + 2*x + 3  (x = 10)")
print("  456 as polynomial: 4*x^2 + 5*x + 6")

import numpy as np
coeffs1 = [3, 2, 1]  # LSB first
coeffs2 = [6, 5, 4]
conv = np.convolve(coeffs1, coeffs2)
print(f"  Convolution of coefficients: {conv}")
print(f"  Evaluate at x=10: {sum(c * 10**i for i, c in enumerate(conv))}")
print(f"  Direct multiplication: {123 * 456}")

# Benchmark: conventional vs Vedic approach step count
print("\n" + "=" * 55)
print("Step count comparison for n-digit x n-digit:")
for n in [2, 3, 4, 5, 10]:
    conventional_multiplications = n * n
    vedic_steps = 2 * n - 1
    # But each Vedic step has multiple multiplications too
    # Total multiplications is still n^2, but organised better
    vedic_max_mults_per_step = n  # middle step has n multiplications
    print(f"  {n}-digit: Conventional = {conventional_multiplications} partial products "
          f"+ addition; Vedic = {vedic_steps} column steps")
```

## Connection to CS / Games / AI

- **Polynomial multiplication** / **convolution**: The Urdhva pattern is
  literally the definition of discrete convolution. This is the same operation
  that CNNs use in every convolutional layer.
- **FFT-based multiplication** (Karatsuba, Schonhage-Strassen) improves on
  this $O(n^2)$ pattern, but the Urdhva method gives the clearest mental
  model of why polynomial multiplication works the way it does.
- **Digital signal processing**: multiplying polynomials = convolving
  coefficient sequences, which is how FIR filters work.
- **Hardware multipliers**: many ALU designs use exactly this crosswise
  pattern in their combinational logic.

## Practice Problems

Use the Urdhva method to multiply these mentally or on paper:

1. 34 x 52 = ?
2. 71 x 89 = ?
3. 45 x 45 = ?
4. 213 x 312 = ?
5. 111 x 111 = ?
6. 78 x 99 = ?
7. 1234 x 11 = ? (try seeing the pattern when one number is 11)

**Answers**: 1768, 6319, 2025, 66456, 12321, 7722, 13574
