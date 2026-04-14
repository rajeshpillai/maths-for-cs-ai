# Yavadunam — "Whatever the Extent of Deficiency"

## Intuition

This sutra uses algebraic identities — $(a+b)^2$, $(a-b)^2$, $(a+b)^3$ — as
mental calculation tools. Instead of memorising them as abstract formulas, you
learn to decompose any squaring or cubing problem into a number near a
convenient base plus a small adjustment. The identity does the heavy lifting.
For example, $52^2 = (50+2)^2 = 2500 + 200 + 4 = 2704$. Three easy mental
additions instead of long multiplication.

## Prerequisites

- Foundation 1, Lesson 2: Algebraic Manipulation (expanding brackets)
- Lesson 3 of this module (Ekadhikena — squaring near special numbers)

## The Sutra

> **यावदूनम्**
> *Yavadunam*
> "Whatever the extent of the deficiency (or surplus)"

The sutra instructs: take the deficiency (or surplus) from a convenient base,
and use algebraic identities to compute powers.

## From First Principles

### The Technique (step by step)

**Identity 1: $(a + b)^2 = a^2 + 2ab + b^2$**

Choose $a$ = convenient round number, $b$ = small adjustment.

**Example 1: 53²**

Let $a = 50, b = 3$:
$53^2 = 50^2 + 2(50)(3) + 3^2 = 2500 + 300 + 9 = 2809$

Mental process: "twenty-five hundred, plus three hundred, plus nine."

---

**Example 2: 98²**

Let $a = 100, b = -2$:
$98^2 = 100^2 + 2(100)(-2) + (-2)^2 = 10000 - 400 + 4 = 9604$

Or equivalently: $98^2 = (100-2)^2 = 10000 - 400 + 4 = 9604$.

---

**Identity 2: $(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$**

**Example 3: 12³**

Let $a = 10, b = 2$:
$12^3 = 10^3 + 3(100)(2) + 3(10)(4) + 8$
$= 1000 + 600 + 120 + 8 = 1728$

---

**Example 4: 99³**

Let $a = 100, b = -1$:
$99^3 = 100^3 + 3(10000)(-1) + 3(100)(1) + (-1)$
$= 1000000 - 30000 + 300 - 1 = 970299$

---

**Identity 3: Difference of squares**: $a^2 - b^2 = (a+b)(a-b)$

This is incredibly useful for mental arithmetic.

**Example 5: 67² - 33²**

$= (67+33)(67-33) = 100 \times 34 = 3400$

No squaring needed at all!

---

**Example 6: 51 x 49** (not obviously a difference of squares, but...)

$51 \times 49 = (50+1)(50-1) = 50^2 - 1^2 = 2500 - 1 = 2499$

---

**The Ratio Method for cubing** (Yavadunam specific):

For a number near a base $B$: if $n = B + d$ (where $d$ is the deviation):

The cube follows a geometric progression pattern:
$n^3 = B^2 \times (B + 3d) + B \times 3d^2 + d^3$

But the neatest mental approach uses the ratio form. For cubing, write
4 terms in a specific ratio:

Starting term: $n^2$ (the square), then multiply successively by $d/n$:

$n^3 = n^2 \times n$

Three-column method:
- Column 1: $n^2$
- Use the identity directly: $n^3 = (B+d)^3$

This is most practical with the direct expansion.

### Why It Works (algebraic proof)

**Binomial theorem (integer case)**:

$$(a + b)^n = \sum_{k=0}^{n} \binom{n}{k} a^{n-k} b^k$$

For $n = 2$:
$$(a+b)^2 = a^2 + 2ab + b^2$$

Proof by expansion:
$(a+b)(a+b) = a \cdot a + a \cdot b + b \cdot a + b \cdot b = a^2 + 2ab + b^2$

For $n = 3$:
$$(a+b)^3 = (a+b)(a+b)^2 = (a+b)(a^2 + 2ab + b^2)$$
$$= a^3 + 2a^2b + ab^2 + a^2b + 2ab^2 + b^3 = a^3 + 3a^2b + 3ab^2 + b^3$$

The mental calculation technique works because:
1. When $a$ is a round number ($10, 50, 100, ...$), $a^2$ and $a^3$ are trivial.
2. The cross-terms ($2ab, 3a^2b$, etc.) involve multiplying a round number
   by a small number, which is easy.
3. $b^2$ and $b^3$ are small when $b$ is small.

**Difference of squares**:
$a^2 - b^2 = (a+b)(a-b)$ follows from expanding the right side:
$(a+b)(a-b) = a^2 - ab + ab - b^2 = a^2 - b^2$.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(13, 6))

# Left: Area model for (50+3)²
ax = axes[0]
ax.set_title('Area Model: (50 + 3)² = 53²', fontsize=13, fontweight='bold')

import matplotlib.patches as patches

# Draw the square split into 4 regions
# Scale: total = 53, split as 50 and 3
s1, s2 = 50, 3
total = s1 + s2

# Scale to fit nicely in plot
scale = 8 / total
w1 = s1 * scale
w2 = s2 * scale

rect1 = patches.Rectangle((0, w2), w1, w1, facecolor='#BBDEFB', edgecolor='black', lw=2)
ax.add_patch(rect1)
ax.text(w1/2, w2 + w1/2, f'{s1}×{s1}\n= {s1**2}', ha='center', va='center', fontsize=11)

rect2 = patches.Rectangle((w1, w2), w2, w1, facecolor='#C8E6C9', edgecolor='black', lw=2)
ax.add_patch(rect2)
ax.text(w1 + w2/2, w2 + w1/2, f'{s1}×{s2}\n= {s1*s2}', ha='center', va='center', fontsize=9)

rect3 = patches.Rectangle((0, 0), w1, w2, facecolor='#C8E6C9', edgecolor='black', lw=2)
ax.add_patch(rect3)
ax.text(w1/2, w2/2, f'{s2}×{s1} = {s2*s1}', ha='center', va='center', fontsize=9)

rect4 = patches.Rectangle((w1, 0), w2, w2, facecolor='#FFF9C4', edgecolor='black', lw=2)
ax.add_patch(rect4)
ax.text(w1 + w2/2, w2/2, f'{s2}²\n={s2**2}', ha='center', va='center', fontsize=9)

# Labels
ax.set_xlim(-0.5, w1 + w2 + 0.5)
ax.set_ylim(-1, w1 + w2 + 0.5)
ax.set_xticks([])
ax.set_yticks([])

total_val = s1**2 + 2*s1*s2 + s2**2
ax.text((w1+w2)/2, -0.7,
        f'{s1}² + 2({s1})({s2}) + {s2}² = {s1**2} + {2*s1*s2} + {s2**2} = {total_val}',
        ha='center', fontsize=11, style='italic')

# Right: Difference of squares
ax2 = axes[1]
ax2.axis('off')
ax2.set_title('Algebraic Identities for Mental Math', fontsize=13, fontweight='bold')

text = (
    "SQUARING (choose a near round number):\n"
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    "  53² = (50+3)² = 2500 + 300 + 9 = 2809\n"
    "  98² = (100-2)² = 10000 - 400 + 4 = 9604\n"
    "  203² = (200+3)² = 40000+1200+9 = 41209\n"
    "\n"
    "CUBING:\n"
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    "  12³ = (10+2)³ = 1000+600+120+8 = 1728\n"
    "  99³ = (100-1)³ = 10⁶-30000+300-1\n"
    "       = 970299\n"
    "\n"
    "DIFFERENCE OF SQUARES:\n"
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    "  67²-33² = (67+33)(67-33) = 100×34 = 3400\n"
    "  51×49 = (50+1)(50-1) = 2500-1 = 2499\n"
    "  104×96 = (100+4)(100-4) = 10000-16 = 9984\n"
    "\n"
    "SUM/DIFF OF CUBES:\n"
    "  a³+b³ = (a+b)(a²-ab+b²)\n"
    "  a³-b³ = (a-b)(a²+ab+b²)"
)
ax2.text(0.02, 0.5, text, transform=ax2.transAxes, fontsize=10.5,
         family='monospace', va='center',
         bbox=dict(boxstyle='round', facecolor='lightyellow', alpha=0.9))

plt.tight_layout()
plt.savefig('yavadunam_visualisation.png', dpi=100, bbox_inches='tight')
plt.show()
```

## Python Verification

```python
# ── Yavadunam: Algebraic Identity Methods ─────────────────

def square_by_identity(n):
    """
    Square n by choosing a nearby round number and using (a+b)² = a² + 2ab + b².
    """
    # Find nearest multiple of 10 (or 100 for larger numbers)
    if n >= 100:
        base = round(n, -2)  # nearest hundred
    else:
        base = round(n, -1)  # nearest ten

    a = base
    b = n - base

    a_sq = a * a
    cross = 2 * a * b
    b_sq = b * b
    result = a_sq + cross + b_sq

    print(f"  {n}² = ({a} + ({b}))²")
    print(f"       = {a}² + 2({a})({b}) + ({b})²")
    print(f"       = {a_sq} + {cross} + {b_sq}")
    print(f"       = {result}")
    return result


def cube_by_identity(n):
    """
    Cube n using (a+b)³ = a³ + 3a²b + 3ab² + b³.
    """
    if n >= 100:
        base = round(n, -2)
    else:
        base = round(n, -1)

    a = base
    b = n - base

    a3 = a ** 3
    term1 = 3 * a * a * b
    term2 = 3 * a * b * b
    b3 = b ** 3
    result = a3 + term1 + term2 + b3

    print(f"  {n}³ = ({a} + ({b}))³")
    print(f"       = {a}³ + 3({a})²({b}) + 3({a})({b})² + ({b})³")
    print(f"       = {a3} + {term1} + {term2} + {b3}")
    print(f"       = {result}")
    return result


# Test squaring
print("Squaring by Algebraic Identity:")
print("=" * 55)
for n in [53, 98, 47, 203, 999, 67, 84]:
    result = square_by_identity(n)
    assert result == n * n, f"Failed: {n}² = {n*n}, got {result}"
    print(f"  ✓ Correct!\n")

# Test cubing
print("\nCubing by Algebraic Identity:")
print("=" * 55)
for n in [12, 99, 51, 203]:
    result = cube_by_identity(n)
    assert result == n ** 3, f"Failed: {n}³ = {n**3}, got {result}"
    print(f"  ✓ Correct!\n")

# Difference of squares
print("\nDifference of Squares: a²-b² = (a+b)(a-b)")
print("=" * 55)

def diff_of_squares(a, b):
    """Compute a² - b² using the identity."""
    result = (a + b) * (a - b)
    print(f"  {a}² - {b}² = ({a}+{b})({a}-{b}) = {a+b} × {a-b} = {result}")
    assert result == a**2 - b**2
    return result

diff_of_squares(67, 33)
diff_of_squares(100, 3)
diff_of_squares(51, 49)

# Products as difference of squares
print("\nProducts via Difference of Squares:")
print("=" * 55)
print("If you want p × q, let a = (p+q)/2, b = (p-q)/2")
print("Then p × q = a² - b²\n")

def product_via_diff_squares(p, q):
    a = (p + q) / 2
    b = (p - q) / 2
    result = a*a - b*b
    print(f"  {p} × {q}: a={a}, b={b}")
    print(f"  = {a}² - {b}² = {a*a} - {b*b} = {int(result)}")
    assert int(result) == p * q
    return int(result)

product_via_diff_squares(51, 49)  # a=50, b=1
product_via_diff_squares(104, 96) # a=100, b=4
product_via_diff_squares(73, 67)  # a=70, b=3

# Mental math benchmark: steps comparison
print("\n\nStep Count Comparison:")
print("=" * 55)
print("Squaring 53 conventionally:")
print("  53 × 53 = 53×50 + 53×3 = 2650 + 159 = 2809")
print("  Steps: 2 multiplications + 1 addition = 3 operations")
print("  But each multiplication involves multi-digit work")
print()
print("Squaring 53 by identity:")
print("  (50+3)² = 2500 + 300 + 9 = 2809")
print("  Steps: 50²=2500 (instant), 2×50×3=300 (instant), 3²=9 (instant)")
print("  Then sum: 2500+300+9 (trivial)")
print("  All sub-operations are single-digit × round number!")
```

## Connection to CS / Games / AI

- **Fast exponentiation**: The identity-based decomposition is the conceptual
  foundation of exponentiation by squaring ($a^{2k} = (a^k)^2$), which
  reduces $O(n)$ multiplications to $O(\log n)$.
- **SIMD optimisation**: GPU shader math often uses $(a+b)^2 - (a-b)^2 = 4ab$
  to convert multiplications into additions and squarings (cheaper on some
  architectures).
- **Loss functions**: MSE loss involves squaring differences, and understanding
  algebraic identities helps simplify gradient derivations.
- **Physics engines**: Collision detection uses distance-squared comparisons:
  $(x_2-x_1)^2 + (y_2-y_1)^2 < r^2$, avoiding costly square roots.

## Practice Problems

**Squaring by identity**:
1. 48² = ? (use 50-2)
2. 997² = ? (use 1000-3)
3. 65² = ? (use 60+5 or the ending-in-5 rule)
4. 302² = ?

**Cubing by identity**:
5. 11³ = ?
6. 98³ = ?

**Difference of squares**:
7. 76² - 24² = ?
8. 103 × 97 = ?
9. 55 × 45 = ?

**Challenge**: 
10. Compute 101³ mentally.

**Answers**: 2304, 994009, 4225, 91204, 1331, 941192, 4000, 9991, 2475, 1030301
