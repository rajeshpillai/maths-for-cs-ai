# Mental Cube Root Extraction

## Intuition

Given a large perfect cube like 185193, can you find its cube root mentally?
Yes — in about 5 seconds. The technique uses two observations: (1) the last
digit of a perfect cube uniquely determines the last digit of its root, and
(2) the magnitude of the remaining digits narrows down the first digit. For
2-digit cube roots, these two observations together give the exact answer
instantly. This extends to 3-digit roots and non-perfect cubes with
additional techniques.

## Prerequisites

- Foundation 1, Lesson 2: Algebraic Manipulation
- Foundation 1, Lesson 12: Powers and Roots
- Lesson 10 of this module (Algebraic identities for cubing)

## The Sutra

This technique draws from multiple Vedic principles:
> **विलोकनम्** (*Vilokanam*) — "By mere observation"

Combined with systematic digit analysis and algebraic bounding.

## From First Principles

### The Technique (step by step)

**Step 0: Memorise the cube-last-digit table**

| Last digit of cube | Last digit of root |
|:---:|:---:|
| 0 | 0 |
| 1 | 1 |
| 2 | 8 |
| 3 | 7 |
| 4 | 4 |
| 5 | 5 |
| 6 | 6 |
| 7 | 3 |
| 8 | 2 |
| 9 | 9 |

**Pattern**: 0,1,4,5,6,9 → same digit. 2↔8, 3↔7 (complements of 10).

**Step 1: Find the last digit of the cube root**

Look at the last digit of the cube and use the table above.

**Step 2: Find the first digit(s) of the cube root**

Remove the last three digits of the cube. The remaining number tells you
the first digit: find which cube it falls between.

---

**Example 1: Cube root of 185193**

Step 1: Last digit of 185193 is **3** → last digit of root is **7**.

Step 2: Remove last 3 digits: **185** remains.
$5^3 = 125, \quad 6^3 = 216$
Since $125 < 185 < 216$, the first digit is **5**.

Cube root = **57**.

Check: $57^3 = 57 \times 57 \times 57 = 3249 \times 57 = 185193$. Correct.

---

**Example 2: Cube root of 474552**

Step 1: Last digit is **2** → root's last digit is **8**.

Step 2: Remove 552: **474** remains.
$7^3 = 343, \quad 8^3 = 512$
Since $343 < 474 < 512$, first digit is **7**.

Cube root = **78**.

Check: $78^3 = 474552$. Correct.

---

**Example 3: Cube root of 2197**

Step 1: Last digit **7** → root's last digit is **3**.

Step 2: Remove 197: **2** remains.
$1^3 = 1, \quad 2^3 = 8$
Since $1 < 2 < 8$, first digit is **1**.

Cube root = **13**.

Check: $13^3 = 2197$. Correct.

---

**Example 4: Cube root of 970299 (3-digit root)**

Step 1: Last digit **9** → root's last digit is **9**.

Step 2: Remove last 3 digits: **970** remains.
$9^3 = 729, \quad 10^3 = 1000$

Since $729 < 970 < 1000$, the tens-and-above part starts with **9**.

But wait — 99^3 = 970299? Let's check: this is a 2-digit root problem.
First digit = 9, last digit = 9. Root = **99**.

Check: $99^3 = 970299$. Correct.

---

**For 3-digit cube roots**, the cube has 7-9 digits:
- Group into sets of 3 from the right: the leftmost group gives the
  hundreds digit, the middle group + bounding gives the tens digit.
- This requires more estimation but the same principle applies.

**Estimating non-perfect cube roots**:

For approximate cube roots, use Newton's method mentally:
Given $N$, start with estimate $x_0$, then iterate:
$$x_{n+1} = \frac{1}{3}\left(2x_n + \frac{N}{x_n^2}\right)$$

### Why It Works (algebraic proof)

**Last digit determination**:

For any integer $n$, $n^3 \bmod 10$ depends only on $n \bmod 10$. This is
because $(10a + b)^3 = 1000a^3 + 300a^2b + 30ab^2 + b^3$, and modulo 10,
all terms except $b^3$ vanish. So the last digit of $n^3$ is determined
solely by $b^3 \bmod 10$:

| $b$ | $b^3$ | $b^3 \bmod 10$ |
|:---:|:---:|:---:|
| 0 | 0 | 0 |
| 1 | 1 | 1 |
| 2 | 8 | 8 |
| 3 | 27 | 7 |
| 4 | 64 | 4 |
| 5 | 125 | 5 |
| 6 | 216 | 6 |
| 7 | 343 | 3 |
| 8 | 512 | 2 |
| 9 | 729 | 9 |

Crucially, this mapping is **bijective** (one-to-one) — each last digit of
the cube corresponds to exactly one last digit of the root. This is because
$\gcd(3, \phi(10)) = \gcd(3, 4) = 1$, so the cubing map is a permutation
modulo 10.

**First digit determination**:

If the cube root is $\overline{ab}$ (a 2-digit number $10a + b$), then:
$(10a + b)^3 = 1000a^3 + 300a^2b + 30ab^2 + b^3$

The leading digits are dominated by $1000a^3$. Removing the last 3 digits
of the cube gives approximately $a^3 + $ small corrections. Since $a$ ranges
from 1 to 9, and the cubes $1, 8, 27, 64, 125, 216, 343, 512, 729$ are
well-separated, there's no ambiguity in determining $a$.

More precisely: if $K$ is the cube and $L = \lfloor K / 1000 \rfloor$, then
$a$ is the largest integer with $a^3 \leq L$.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(13, 5))

# Left: Last digit mapping
ax = axes[0]
ax.set_title('Cube Last Digit → Root Last Digit', fontsize=13, fontweight='bold')

# Create a visual mapping
cube_digits = list(range(10))
root_digits = [0, 1, 8, 7, 4, 5, 6, 3, 2, 9]

# Draw as a mapping diagram
for i, (c, r) in enumerate(zip(cube_digits, root_digits)):
    # Left column (cube last digit)
    ax.plot(0.3, 9 - i, 'o', markersize=20, color='#2196F3')
    ax.text(0.3, 9 - i, str(c), ha='center', va='center',
            fontsize=12, color='white', fontweight='bold')

    # Right column (root last digit)
    ax.plot(0.7, 9 - r, 'o', markersize=20, color='#FF5722')

    # Arrow
    ax.annotate('', xy=(0.65, 9 - r), xytext=(0.35, 9 - i),
                arrowprops=dict(arrowstyle='->', color='gray', lw=1.5))

# Label right column
for d in range(10):
    ax.text(0.7, 9 - d, str(d), ha='center', va='center',
            fontsize=12, color='white', fontweight='bold')

ax.text(0.3, 10, 'Cube\nlast digit', ha='center', fontsize=10, fontweight='bold')
ax.text(0.7, 10, 'Root\nlast digit', ha='center', fontsize=10, fontweight='bold')
ax.set_xlim(0, 1)
ax.set_ylim(-1, 11)
ax.axis('off')

# Highlight self-mappings vs swaps
ax.text(0.5, -0.5, 'Self: 0,1,4,5,6,9  |  Swap: 2↔8, 3↔7',
        ha='center', fontsize=10, style='italic')

# Right: Bounding for first digit
ax2 = axes[1]
ax2.set_title('First Digit: Bounding by Perfect Cubes', fontsize=13, fontweight='bold')

# Show the cubes and ranges
cubes = [(i, i**3) for i in range(1, 11)]
labels = [f'{i}³={i**3}' for i, c in cubes]

y_pos = range(len(cubes))
colors = plt.cm.viridis(np.linspace(0.2, 0.8, len(cubes)))

ax2.barh(list(y_pos), [c for _, c in cubes], color=colors, edgecolor='black')
for i, (n, c) in enumerate(cubes):
    ax2.text(c + 10, i, f'{n}³ = {c}', va='center', fontsize=10)

ax2.set_xlabel('Value', fontsize=11)
ax2.set_ylabel('Root', fontsize=11)
ax2.set_yticks(list(y_pos))
ax2.set_yticklabels([str(i) for i, _ in cubes])

# Mark example: 185 falls between 125 and 216
ax2.axvline(x=185, color='red', linestyle='--', linewidth=2)
ax2.text(185, 9.5, '185\n(from 185193)', ha='center', color='red',
         fontsize=10, fontweight='bold')
ax2.annotate('Between 5³ and 6³\n→ first digit = 5',
             xy=(185, 4.5), fontsize=10, color='red',
             bbox=dict(boxstyle='round', facecolor='lightyellow'))

plt.tight_layout()
plt.savefig('cube_roots_visualisation.png', dpi=100, bbox_inches='tight')
plt.show()
```

## Python Verification

```python
# ── Mental Cube Root Extraction ───────────────────────────

# Last digit table (cube_last_digit → root_last_digit)
CUBE_TO_ROOT_LAST = {0:0, 1:1, 2:8, 3:7, 4:4, 5:5, 6:6, 7:3, 8:2, 9:9}

def mental_cube_root(cube):
    """
    Extract cube root of a perfect cube using the Vedic mental method.
    Works for 2-digit cube roots (cubes up to 970299).
    """
    print(f"\n  Cube root of {cube}:")

    # Step 1: Last digit
    last_digit_cube = cube % 10
    last_digit_root = CUBE_TO_ROOT_LAST[last_digit_cube]
    print(f"  Step 1: Last digit of cube = {last_digit_cube} → root's last digit = {last_digit_root}")

    # Step 2: First digit — remove last 3 digits
    upper = cube // 1000
    print(f"  Step 2: Remove last 3 digits → {upper}")

    first_digit = 0
    for d in range(1, 10):
        if d ** 3 <= upper:
            first_digit = d
        else:
            break

    print(f"  {first_digit}³ = {first_digit**3} ≤ {upper} < {(first_digit+1)**3} = {(first_digit+1)**3}")
    print(f"  First digit = {first_digit}")

    root = first_digit * 10 + last_digit_root
    print(f"  Cube root = {root}")
    print(f"  Verify: {root}³ = {root**3}")
    assert root ** 3 == cube
    return root


# Test with all 2-digit perfect cubes
print("Mental Cube Root Extraction:")
print("=" * 55)

test_cubes = [n**3 for n in range(10, 100)]
for cube in test_cubes[:15]:  # Show first 15
    mental_cube_root(cube)

print(f"\n  ... verified all {len(test_cubes)} 2-digit cube roots ✓")
for cube in test_cubes:
    root = mental_cube_root.__wrapped__(cube) if hasattr(mental_cube_root, '__wrapped__') else None
    # Just verify silently
    n = cube
    last = CUBE_TO_ROOT_LAST[n % 10]
    upper = n // 1000
    first = 0
    for d in range(1, 10):
        if d**3 <= upper:
            first = d
    assert (first * 10 + last) ** 3 == cube

# Build the complete verification
print("\n\nVerifying last-digit table:")
print("=" * 55)
for d in range(10):
    cube_last = (d ** 3) % 10
    print(f"  {d}³ = {d**3}, last digit = {cube_last}, "
          f"table says root = {CUBE_TO_ROOT_LAST[cube_last]}, "
          f"{'✓' if CUBE_TO_ROOT_LAST[cube_last] == d else '✗'}")

# Proof that the mapping is bijective
print("\n\nBijectivity proof:")
print("=" * 55)
print("  The map d → d³ mod 10 for d ∈ {0,...,9}:")
mapping = {d: (d**3) % 10 for d in range(10)}
print(f"  {mapping}")
print(f"  Image: {sorted(mapping.values())}")
print(f"  All 10 values appear exactly once → bijection ✓")

# Newton's method for non-perfect cubes
print("\n\nNewton's Method for Non-Perfect Cubes:")
print("=" * 55)

def cube_root_newton(N, iterations=5):
    """Approximate cube root using Newton's method."""
    # Initial estimate: use the mental method's first digit
    x = 1
    while (x + 1) ** 3 <= N:
        x += 1

    print(f"  ∛{N}: initial estimate x₀ = {x}")
    for i in range(iterations):
        x_new = (2 * x + N / (x * x)) / 3
        print(f"  x_{i+1} = (2×{x:.6f} + {N}/{x:.6f}²) / 3 = {x_new:.10f}")
        x = x_new

    print(f"  Final: ∛{N} ≈ {x:.10f}")
    print(f"  Actual: {N ** (1/3):.10f}")
    return x

cube_root_newton(100)
print()
cube_root_newton(200)
print()
cube_root_newton(1000000)  # Should converge to 100 exactly
```

## Connection to CS / Games / AI / Business / Industry

- **Root finding algorithms**: Newton's method for cube roots is a special
  case of the general Newton-Raphson method used throughout numerical
  computing — from physics simulations to ML optimisation.
- **Fast inverse square root** (Quake III): The famous 0x5F3759DF hack uses
  bit manipulation for initial estimation, similar to how we use digit
  patterns for cube root estimation.
- **Integer factoring**: Recognising perfect powers (cubes, squares) is a
  step in many factoring algorithms used in cryptanalysis.
- **Level-of-detail in games**: Cube root of volume gives a linear dimension
  — useful for spatial partitioning and LOD calculations.

## Practice Problems

Find the cube root mentally:

1. ∛2744 = ?
2. ∛9261 = ?
3. ∛571787 = ?
4. ∛804357 = ?
5. ∛1000000 = ?
6. ∛132651 = ?
7. Is 300763 a perfect cube? If so, find its root.
8. Estimate ∛500 to one decimal place using Newton's method (start with x₀ = 8).

**Answers**:
1. 14 (last digit 4→4, 2 is between 1³=1 and 2³=8, first=1)
2. 21 (last digit 1→1, 9 is between 2³=8 and 3³=27, first=2)
3. 83 (last digit 7→3, 571 between 8³=512 and 9³=729, first=8... wait: 83³=571787? Let me check: first=8, last=3→83. 83³=571787 ✓)
4. 93 (last digit 7→3, 804 between 9³=729 and 10³=1000, first=9)
5. 100
6. 51 (last digit 1→1, 132 between 5³=125 and 6³=216, first=5)
7. 67 (last digit 3→7, 300 between 6³=216 and 7³=343, first=6. 67³=300763 ✓)
8. x₁ = (16 + 500/64)/3 = (16+7.8125)/3 ≈ 7.9. Actual: ∛500 ≈ 7.937.
