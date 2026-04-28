# Ekadhikena Purvena — "By One More Than the Previous One"

## Intuition

Want to square 75 in your head? Answer: 5625. How? Take the tens digit (7),
multiply it by "one more than itself" (7 x 8 = 56), then append 25. Done.
This technique lets you instantly square any number ending in 5. Extended
versions handle numbers near 50 and near 100. While a conventional squaring
of 75 requires computing 75 x 75 (multiple partial products), this gives the
answer in one mental step.

## Prerequisites

- Foundation 1, Lesson 2: Algebraic Manipulation
- Tier 0, Lesson 1: Number Systems (place value)

## The Sutra

> **एकाधिकेन पूर्वेण**
> *Ekadhikena Purvena*
> "By one more than the previous one"

"Previous" refers to the digit(s) before the final 5. "One more" means
you increment that portion by 1 before multiplying.

## From First Principles

### The Technique (step by step)

**Case 1: Squaring numbers ending in 5**

For any number of the form $n5$ (where $n$ is the "previous" part):

1. Take the "previous" part: $n$.
2. Multiply $n$ by $(n + 1)$.
3. Append 25 to the result.

---

**Example 1: 35^2**

Previous part: 3
Compute: 3 x 4 = 12
Append 25: **1225**

Check: 35 x 35 = 1225. Correct.

---

**Example 2: 75^2**

Previous part: 7
Compute: 7 x 8 = 56
Append 25: **5625**

Check: 75 x 75 = 5625. Correct.

---

**Example 3: 115^2**

Previous part: 11
Compute: 11 x 12 = 132
Append 25: **13225**

Check: 115 x 115 = 13225. Correct.

---

**Case 2: Squaring numbers near 50**

Any number $50 + d$ (where $d$ is a small deviation):

1. Compute $25 + d$ (this gives the left part).
2. Compute $d^2$ (this gives the right part, zero-padded to 2 digits).

---

**Example 4: 53^2**

$d = 3$
Left: 25 + 3 = 28
Right: 3^2 = 09
Result: **2809**

Check: 53 x 53 = 2809. Correct.

---

**Example 5: 47^2**

$d = -3$
Left: 25 + (-3) = 22
Right: (-3)^2 = 09
Result: **2209**

Check: 47 x 47 = 2209. Correct.

---

**Case 3: Squaring numbers near 100**

Any number $100 - d$ (where $d$ is the deficiency):

1. Compute $\text{number} - d$ = number minus its own deficiency (equivalently, $100 - 2d$).
2. Compute $d^2$ (right part, zero-padded to 2 digits).

---

**Example 6: 96^2**

$d = 4$
Left: 96 - 4 = 92
Right: 4^2 = 16
Result: **9216**

Check: 96 x 96 = 9216. Correct.

### Why It Works (algebraic proof)

**Case 1 proof (ending in 5)**:

Let the number be $(10a + 5)$ where $a$ is the "previous" part.

$$
(10a + 5)^2 = 100a^2 + 100a + 25 = 100a(a + 1) + 25
$$

Factor: $100 \times [a(a+1)] + 25$

Since multiplying by 100 shifts two decimal places left, and we append 25
in the last two places, the technique gives exactly $a(a+1)$ followed by 25.

$\blacksquare$

**Case 2 proof (near 50)**:

Let the number be $(50 + d)$.

$$
(50 + d)^2 = 2500 + 100d + d^2 = 100(25 + d) + d^2
$$

So the left part (hundreds) is $(25 + d)$ and the right part (units and tens)
is $d^2$.

$\blacksquare$

**Case 3 proof (near 100)**:

Let the number be $(100 - d)$.

$$
(100 - d)^2 = 10000 - 200d + d^2 = 100(100 - 2d) + d^2
$$

Note that $100 - 2d = (100 - d) - d = \text{number} - d$.

$\blacksquare$

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Area model for (10a + 5)^2
ax = axes[0]
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.set_title('Area Model: (10a + 5)² where a = 7\n= 75²', fontsize=13, fontweight='bold')

# The square is divided into 4 rectangles
# Total side = 10a + 5 = 75
# We split it as 10a and 5: so 70 and 5

# Scale: let's use proportional widths
total = 75
w1 = 70 / total * 10  # scaled width for 70
w2 = 5 / total * 10   # scaled width for 5

# Draw rectangles
import matplotlib.patches as patches

# 70 x 70 region
rect1 = patches.Rectangle((0, 10 - w1), w1, w1, facecolor='#BBDEFB', edgecolor='black', lw=2)
ax.add_patch(rect1)
ax.text(w1/2, 10 - w1/2, f'70×70\n= 4900', ha='center', va='center', fontsize=10)

# 70 x 5 region (right)
rect2 = patches.Rectangle((w1, 10 - w1), w2, w1, facecolor='#C8E6C9', edgecolor='black', lw=2)
ax.add_patch(rect2)
ax.text(w1 + w2/2, 10 - w1/2, f'70×5\n= 350', ha='center', va='center', fontsize=9)

# 5 x 70 region (bottom)
rect3 = patches.Rectangle((0, 10 - w1 - w2), w1, w2, facecolor='#C8E6C9', edgecolor='black', lw=2)
ax.add_patch(rect3)
ax.text(w1/2, 10 - w1 - w2/2, f'5×70 = 350', ha='center', va='center', fontsize=9)

# 5 x 5 region (bottom right)
rect4 = patches.Rectangle((w1, 10 - w1 - w2), w2, w2, facecolor='#FFF9C4', edgecolor='black', lw=2)
ax.add_patch(rect4)
ax.text(w1 + w2/2, 10 - w1 - w2/2, '5×5\n=25', ha='center', va='center', fontsize=9)

ax.set_xlim(-0.5, 10.5)
ax.set_ylim(-0.5, 10.5)
ax.set_xticks([])
ax.set_yticks([])

# Annotate: 4900 + 350 + 350 + 25 = 100*56 + 25
ax.text(5, -0.3, '4900 + 700 + 25 = 100×56 + 25 = 5625',
        ha='center', fontsize=11, style='italic')

# Right plot: comparison of methods
ax2 = axes[1]
ax2.axis('off')
ax2.set_title('Speed Comparison', fontsize=13, fontweight='bold')

comparison = (
    "Standard squaring of 75:\n"
    "  75 x 75:\n"
    "    75 x 5 = 375\n"
    "    75 x 70 = 5250\n"
    "    375 + 5250 = 5625\n"
    "  (multiple steps, carries)\n"
    "\n"
    "Vedic (Ekadhikena):\n"
    "  Previous = 7\n"
    "  7 x 8 = 56\n"
    "  Append 25 → 5625\n"
    "  (ONE mental step!)\n"
    "\n"
    "━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    "Works for ANY ending-in-5:\n"
    "  25² → 2×3|25 = 625\n"
    "  45² → 4×5|25 = 2025\n"
    "  85² → 8×9|25 = 7225\n"
    "  125² → 12×13|25 = 15625"
)
ax2.text(0.05, 0.5, comparison, transform=ax2.transAxes, fontsize=11,
         family='monospace', va='center',
         bbox=dict(boxstyle='round', facecolor='lightyellow', alpha=0.9))

plt.tight_layout()
plt.savefig('ekadhikena_squaring.png', dpi=100, bbox_inches='tight')
plt.show()
```

## Python Verification

```python
# ── Ekadhikena Purvena: Squaring Techniques ──────────────

def square_ending_5(n):
    """Square a number ending in 5 using Ekadhikena."""
    s = str(n)
    assert s[-1] == '5', "Number must end in 5"
    previous = int(s[:-1])  # all digits except the last 5
    left_part = previous * (previous + 1)
    result = left_part * 100 + 25
    print(f"  {n}²: previous = {previous}, {previous} x {previous+1} = {left_part}, "
          f"append 25 → {result}")
    return result


def square_near_50(n):
    """Square a number near 50 using the deviation method."""
    d = n - 50
    left = 25 + d
    right = d * d
    result = left * 100 + right
    print(f"  {n}²: d = {d}, left = 25 + ({d}) = {left}, "
          f"right = {d}² = {right}, result = {result}")
    return result


def square_near_100(n):
    """Square a number near 100."""
    d = 100 - n  # deficiency
    left = n - d  # = 100 - 2d
    right = d * d
    # Handle carry if right >= 100
    result = left * 100 + right
    print(f"  {n}²: d = {d}, left = {n} - {d} = {left}, "
          f"right = {d}² = {right}, result = {result}")
    return result


# Case 1: Numbers ending in 5
print("Case 1: Squaring numbers ending in 5")
print("=" * 50)
for n in [15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125]:
    result = square_ending_5(n)
    assert result == n * n, f"Failed for {n}: got {result}, expected {n*n}"
print("All correct!\n")

# Case 2: Numbers near 50
print("Case 2: Squaring numbers near 50")
print("=" * 50)
for n in [47, 48, 49, 51, 52, 53, 54, 56]:
    result = square_near_50(n)
    assert result == n * n, f"Failed for {n}: got {result}, expected {n*n}"
print("All correct!\n")

# Case 3: Numbers near 100
print("Case 3: Squaring numbers near 100")
print("=" * 50)
for n in [91, 92, 93, 94, 95, 96, 97, 98, 99]:
    result = square_near_100(n)
    assert result == n * n, f"Failed for {n}: got {result}, expected {n*n}"
print("All correct!\n")

# Algebraic proof verification
print("Algebraic proof verification:")
print("=" * 50)
print("(10a + 5)² = 100·a(a+1) + 25")
for a in range(1, 15):
    lhs = (10*a + 5) ** 2
    rhs = 100 * a * (a + 1) + 25
    assert lhs == rhs
print(f"  Verified for a = 1 to 14: (10a+5)² = 100·a(a+1) + 25 ✓")

print("\n(50 + d)² = 100·(25 + d) + d²")
for d in range(-20, 21):
    lhs = (50 + d) ** 2
    rhs = 100 * (25 + d) + d * d
    assert lhs == rhs
print(f"  Verified for d = -20 to 20: (50+d)² = 100(25+d) + d² ✓")
```

## Connection to CS / Games / AI / Business / Industry

- **Hash functions**: Some hash functions use squaring operations; knowing
  squares of common numbers speeds up mental debugging.
- **Distance calculations**: In game dev, distance-squared comparisons avoid
  sqrt. Quickly squaring numbers helps estimate distances mentally.
- **Feature engineering**: In ML, polynomial features include x^2 terms.
  Understanding squaring patterns helps spot computational shortcuts.
- **Compiler optimisation**: Strength reduction replaces x^2 with x*x, but
  the algebraic identity $(a+b)^2 = a^2 + 2ab + b^2$ underlies many
  numerical optimisations.
- **Live commentary in cricket / sports analytics (ESPNcricinfo, Star
  Sports).** Strike rates and run-rates need squaring/dividing on the
  fly — production teams hire stats analysts who square Net Run Rate
  components mentally between overs; the "ending-in-5" trick is in
  every commentator's toolkit.
- **Banking & wealth management (HDFC, ICICI, Axis private banking).**
  Compound interest at 5%/yr means a relationship manager mentally squares
  factors like $(1.05)^n$; doubling time and rule-of-72 desk maths
  routinely reduce to "square 25", "square 35" calculations done in
  seconds during client meetings.
- **Civil-engineering site work (DLF, Godrej Properties).** Slab
  estimators square plot dimensions (e.g. 35x35 ft, 45x45 ft) for
  square-footage and tile-count quotes — Vedic ending-in-5 squaring
  beats reaching for a calculator at the construction site.
- **Real-estate appraisal (JLL, Knight Frank).** Cap-rate inversions and
  square-foot multipliers in Mumbai/Bengaluru property reports: an
  appraiser who can square 75 → 5625 instantly cross-checks a vendor's
  per-sqft quote against carpet area in real time.

## Practice Problems

**Ending in 5** — square these mentally:
1. 55² = ?
2. 85² = ?
3. 135² = ?
4. 205² = ?

**Near 50** — use deviation method:
5. 46² = ?
6. 57² = ?
7. 43² = ?

**Near 100** — use deficiency method:
8. 93² = ?
9. 88² = ?
10. 102² = ? (hint: surplus version)

**Answers**: 3025, 7225, 18225, 42025, 2116, 3249, 1849, 8649, 7744, 10404
