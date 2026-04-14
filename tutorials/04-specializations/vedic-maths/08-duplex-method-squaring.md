# Dwandwa Yoga — The Duplex Method for General Squaring

## Intuition

The Duplex method gives you a systematic way to square ANY number mentally,
regardless of its size. Instead of multiplying a number by itself (which
requires keeping track of all cross-products), you compute a series of
"duplex" values column by column. For a 4-digit number, you need 7 small
computations instead of 16 partial products. The duplex of a group of digits
follows a simple pattern that's easy to memorise.

## Prerequisites

- Foundation 1, Lesson 2: Algebraic Manipulation
- Lesson 2 of this module (Urdhva-Tiryagbhyam — crosswise multiplication)
- Lesson 3 of this module (Ekadhikena — special case squaring)

## The Sutra

> **द्वन्द्व योग**
> *Dwandwa Yoga*
> "Duplex combination"

The duplex (dwandwa) of a number or digit group is defined recursively
and captures all the cross-products needed for squaring.

## From First Principles

### The Technique (step by step)

**Duplex definitions**:

| Digits | Duplex D( ) | Formula |
|--------|-------------|---------|
| Single digit $a$ | $a^2$ | D(a) = a² |
| Two digits $ab$ | $2ab$ | D(ab) = 2×a×b |
| Three digits $abc$ | $2ac + b^2$ | D(abc) = 2×a×c + b² |
| Four digits $abcd$ | $2ad + 2bc$ | D(abcd) = 2×a×d + 2×b×c |
| Five digits $abcde$ | $2ae + 2bd + c^2$ | D(abcde) = 2×a×e + 2×b×d + c² |

**General rule**: Pair outer digits (multiply and double), work inward.
If a middle digit is left unpaired, square it.

**To square a number**: Compute duplexes of progressively wider digit groups,
right to left, collecting carries.

For number $abcd$:
- Column 1 (units): D(d) = d²
- Column 2: D(cd) = 2cd
- Column 3: D(bcd) = 2bd + c²
- Column 4: D(abcd) = 2ad + 2bc
- Column 5: D(abc) = 2ac + b²
- Column 6: D(ab) = 2ab
- Column 7: D(a) = a²

Each column gives a single result digit (with carry forwarded).

---

**Example 1: 23²**

Digits: 2, 3

1. **Column 1:** D(3) = 9. Write 9, carry 0.
2. **Column 2:** D(23) = 2×2×3 = 12. Write 2, carry 1.
3. **Column 3:** D(2) = 4 + carry 1 = 5. Write 5.

Result: **529**.

Check: 23² = 529. Correct.

---

**Example 2: 64²**

1. **Column 1:** D(4) = 16. Write 6, carry 1.
2. **Column 2:** D(64) = 2×6×4 = 48 + 1 = 49. Write 9, carry 4.
3. **Column 3:** D(6) = 36 + 4 = 40. Write 40.

Result: **4096**.

Check: 64² = 4096. Correct.

---

**Example 3: 123²**

Digits: 1, 2, 3

1. **Column 1:** D(3) = 9. Write 9, carry 0.
2. **Column 2:** D(23) = 2×2×3 = 12. Write 2, carry 1.
3. **Column 3:** D(123) = 2×1×3 + 2² = 6 + 4 = 10, + carry 1 = 11. Write 1, carry 1.
4. **Column 4:** D(12) = 2×1×2 = 4, + carry 1 = 5. Write 5.
5. **Column 5:** D(1) = 1. Write 1.

Result: **15129**.

Check: 123² = 15129. Correct.

---

**Example 4: 305²**

Digits: 3, 0, 5

1. **Column 1:** D(5) = 25. Write 5, carry 2.
2. **Column 2:** D(05) = 2×0×5 = 0, + carry 2 = 2. Write 2, carry 0.
3. **Column 3:** D(305) = 2×3×5 + 0² = 30. Write 0, carry 3.
4. **Column 4:** D(30) = 2×3×0 = 0, + carry 3 = 3. Write 3.
5. **Column 5:** D(3) = 9. Write 9.

Result: **93025**.

Check: 305² = 93025. Correct.

### Why It Works (algebraic proof)

Consider a number $N = a \times 10^{n-1} + b \times 10^{n-2} + ... + z \times 10^0$.

When we square it:
$$N^2 = \left(\sum_{i=0}^{n-1} d_i \times 10^i\right)^2 = \sum_{i=0}^{n-1}\sum_{j=0}^{n-1} d_i d_j \times 10^{i+j}$$

Group by power of 10. The coefficient of $10^k$ is:
$$\sum_{i+j=k} d_i d_j$$

This is exactly what the duplex computes for each column!

For column $k$, the pairs $(i, j)$ with $i + j = k$ are:
- $(0, k), (1, k-1), (2, k-2), ...$

Each pair appears twice (once as $d_i d_j$ and once as $d_j d_i$) EXCEPT when
$i = j$ (the middle term). So:
$$\text{Column } k = \sum_{\substack{i+j=k \\ i < j}} 2 d_i d_j + [k \text{ even}] \times d_{k/2}^2$$

This is precisely the duplex formula:
- D(a) = a² (single digit: it pairs with itself)
- D(ab) = 2ab (two digits: they pair with each other)
- D(abc) = 2ac + b² (outer pair + middle squares itself)

The duplex method is the **convolution of a sequence with itself** (auto-correlation
at each lag), which is equivalent to squaring the polynomial.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 1, figsize=(12, 8))

# Top: Show duplex pattern for 4-digit number
ax = axes[0]
ax.axis('off')
ax.set_title('Duplex Pattern for Squaring: 1234²', fontsize=14, fontweight='bold')

pattern = (
    "Number: 1  2  3  4\n"
    "\n"
    "Column 1: D(4)    = 4²           = 16\n"
    "Column 2: D(34)   = 2×3×4        = 24\n"
    "Column 3: D(234)  = 2×2×4 + 3²   = 16 + 9 = 25\n"
    "Column 4: D(1234) = 2×1×4 + 2×2×3 = 8 + 12 = 20\n"
    "Column 5: D(123)  = 2×1×3 + 2²   = 6 + 4 = 10\n"
    "Column 6: D(12)   = 2×1×2        = 4\n"
    "Column 7: D(1)    = 1²           = 1\n"
    "\n"
    "Computing (with carries):\n"
    "  Col 1: 16 → digit 6, carry 1\n"
    "  Col 2: 24+1=25 → digit 5, carry 2\n"
    "  Col 3: 25+2=27 → digit 7, carry 2\n"
    "  Col 4: 20+2=22 → digit 2, carry 2\n"
    "  Col 5: 10+2=12 → digit 2, carry 1\n"
    "  Col 6: 4+1=5 → digit 5, carry 0\n"
    "  Col 7: 1 → digit 1\n"
    "\n"
    "Result: 1 5 2 2 7 5 6 = 1522756   Check: 1234² = 1522756 ✓"
)
ax.text(0.02, 0.5, pattern, transform=ax.transAxes, fontsize=10.5,
        family='monospace', va='center',
        bbox=dict(boxstyle='round', facecolor='lightyellow', alpha=0.9))

# Bottom: Visual of pairing pattern
ax2 = axes[1]
ax2.set_title('Duplex Pairing Pattern (which digits multiply)', fontsize=13, fontweight='bold')
ax2.set_xlim(-0.5, 7)
ax2.set_ylim(-0.5, 4)
ax2.axis('off')

# Show digits
digits = [1, 2, 3, 4]
x_pos = [1, 2.5, 4, 5.5]
for i, (x, d) in enumerate(zip(x_pos, digits)):
    ax2.text(x, 3.5, str(d), fontsize=18, ha='center', va='center',
             bbox=dict(boxstyle='round', facecolor='lightblue', edgecolor='black'))

# Show pairing arcs for each column
import matplotlib.patches as mpatches

# Column 4 (widest): 1×4 and 2×3
from matplotlib.patches import FancyArrowPatch
ax2.annotate('', xy=(5.5, 3.0), xytext=(1, 3.0),
             arrowprops=dict(arrowstyle='<->', connectionstyle='arc3,rad=-0.3',
                           color='red', lw=2))
ax2.annotate('', xy=(4, 2.8), xytext=(2.5, 2.8),
             arrowprops=dict(arrowstyle='<->', connectionstyle='arc3,rad=-0.2',
                           color='blue', lw=2))
ax2.text(3.25, 1.8, 'D(1234) = 2×1×4 + 2×2×3', fontsize=11, ha='center',
         color='purple', style='italic')

# Labels
ax2.text(3.25, 0.8, 'Rule: Pair outermost digits → multiply & double\n'
         '      Work inward. Unpaired middle digit → square.',
         fontsize=11, ha='center',
         bbox=dict(boxstyle='round', facecolor='lightcyan', alpha=0.8))

plt.tight_layout()
plt.savefig('duplex_visualisation.png', dpi=100, bbox_inches='tight')
plt.show()
```

## Python Verification

```python
# ── Dwandwa Yoga (Duplex Method): Squaring ───────────────

def duplex(digits):
    """
    Compute the duplex of a list of digits.
    D(a) = a²
    D(a,b) = 2ab
    D(a,b,c) = 2ac + b²
    General: pair outer digits (×2), work inward; square unpaired middle.
    """
    n = len(digits)
    result = 0
    for i in range(n // 2):
        result += 2 * digits[i] * digits[n - 1 - i]
    if n % 2 == 1:  # middle digit
        mid = digits[n // 2]
        result += mid * mid
    return result


def square_by_duplex(number):
    """Square a number using the duplex method."""
    digits = [int(d) for d in str(number)]
    n = len(digits)

    print(f"\n  Squaring {number} by Duplex method:")
    print(f"  Digits: {digits}")

    # We need 2n-1 columns
    # Column k (0-indexed from right) uses digits from position max(0, k-n+1) to min(k, n-1)
    result_digits = []
    carry = 0

    for col in range(2*n - 1):
        # Which digits participate in this column?
        # We need the "window" of digits for this column
        # For column col (0 = rightmost):
        #   start = max(0, col - n + 1)  (leftmost participating digit index from right)
        #   end = min(col, n-1)          (rightmost participating digit index from right)
        # But in the duplex formulation, we take progressively wider groups:

        # Column 0 (rightmost): D(last digit)
        # Column 1: D(last 2 digits)
        # Column 2: D(last 3 digits) ... until we hit all n digits
        # Column n-1: D(all n digits)
        # Column n: D(first n-1 digits)
        # Column 2n-2: D(first digit)

        if col < n:
            group = digits[n - 1 - col:]  # rightmost col+1 digits
        else:
            group = digits[:2*n - 1 - col]  # leftmost (2n-1-col) digits

        d = duplex(group)
        total = d + carry
        digit = total % 10
        carry = total // 10

        result_digits.append(digit)
        print(f"  Col {col}: D({group}) = {d}, +carry = {total}, "
              f"digit = {digit}, carry = {carry}")

    while carry > 0:
        result_digits.append(carry % 10)
        carry //= 10

    # Result is in reverse order
    result_digits.reverse()
    result = int(''.join(map(str, result_digits)))
    print(f"  Result: {result}")
    return result


# Test cases
print("Duplex Method Squaring:")
print("=" * 55)

test_cases = [23, 64, 123, 305, 1234, 999, 456, 78, 9999]
for n in test_cases:
    result = square_by_duplex(n)
    expected = n * n
    assert result == expected, f"Failed for {n}: got {result}, expected {expected}"
    print(f"  ✓ {n}² = {expected}")
    print()

# Verify duplex formula
print("\nDuplex Formula Verification:")
print("=" * 55)
print(f"  D([5]) = {duplex([5])} (should be 25)")
print(f"  D([3,4]) = {duplex([3,4])} (should be 24)")
print(f"  D([2,3,4]) = {duplex([2,3,4])} (should be 2×2×4 + 3² = 25)")
print(f"  D([1,2,3,4]) = {duplex([1,2,3,4])} (should be 2×1×4 + 2×2×3 = 20)")
print(f"  D([1,2,3,4,5]) = {duplex([1,2,3,4,5])} (should be 2×1×5 + 2×2×4 + 3² = 35)")

# Show it's equivalent to polynomial self-convolution
print("\n\nEquivalence to Self-Convolution:")
print("=" * 55)
import numpy as np
digits = [1, 2, 3, 4]
conv = np.convolve(digits[::-1], digits[::-1])
print(f"  Digits of 1234 (reversed): {digits[::-1]}")
print(f"  Self-convolution: {conv}")
print(f"  Evaluate at base 10: {sum(c * 10**i for i, c in enumerate(conv))}")
print(f"  Direct: 1234² = {1234**2}")
```

## Connection to CS / Games / AI

- **Autocorrelation**: The duplex is a discrete autocorrelation — the same
  operation used in signal processing to detect patterns (radar, sonar).
- **Squaring in cryptography**: RSA and ECC require squaring large numbers.
  The duplex pattern shows the inherent structure exploited by specialised
  squaring algorithms (which are ~1.5x faster than general multiplication).
- **Karatsuba's insight**: The duplex reveals that squaring an n-digit number
  needs fewer unique products than multiplying two different n-digit numbers
  (since $d_i d_j = d_j d_i$). Karatsuba exploited similar redundancy.
- **Variance computation**: $\text{Var}(X) = E[X^2] - (E[X])^2$ — squaring
  appears in every statistical calculation in ML.

## Practice Problems

Compute using the duplex method:

1. D(7) = ?
2. D(3, 5) = ?
3. D(2, 4, 6) = ?
4. 34² = ? (3 duplex steps)
5. 56² = ?
6. 234² = ?
7. 4567² = ?
8. Show that for any 2-digit number $\overline{ab}$: $(\overline{ab})^2 = a^2 \times 100 + 2ab \times 10 + b^2$

**Answers**:
1. 49
2. 30
3. 2×2×6 + 4² = 24 + 16 = 40
4. 1156
5. 3136
6. 54756
7. 20857489
8. $(10a+b)^2 = 100a^2 + 20ab + b^2$ — columns are $D(a)$, $D(ab)$, $D(b)$ exactly.
