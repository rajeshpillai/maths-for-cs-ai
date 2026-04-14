# Number Systems — The Bedrock

## Intuition

Every number you have ever used belongs to a family. Understanding these
families — and how each one *extends* the previous — is the first rung of the
ladder.  Think of it like unlocking new types of blocks in a game: each new
number system lets you solve problems you couldn't solve before.

## Prerequisites

- Foundation 2 (completion) or equivalent algebra/functions background

## From First Principles

### Natural Numbers (ℕ)

The simplest family: the counting numbers.

$$\mathbb{N} = \{0, 1, 2, 3, 4, \dots\}$$

> Some authors start at 1.  We include 0 because it is the **additive identity**
> — the number that changes nothing when you add it.

**Closure property (pen & paper check):**

Pick any two natural numbers, say 3 and 5.

- Addition: 3 + 5 = 8 ✓ (still a natural number)
- Multiplication: 3 × 5 = 15 ✓ (still a natural number)
- Subtraction: 3 − 5 = −2 ✗ (NOT a natural number!)

So ℕ is *closed* under addition and multiplication, but **not** under
subtraction.  That gap is exactly why we need the next family.

### Integers (ℤ)

Extend ℕ with negative numbers so subtraction always works.

$$\mathbb{Z} = \{\dots, -3, -2, -1, 0, 1, 2, 3, \dots\}$$

**Pen & paper check:**

- 3 − 5 = −2 ✓ (now it works)
- (−2) × (−3) = 6 ✓
- 7 ÷ 2 = 3.5 ✗ (NOT an integer!)

ℤ is closed under addition, subtraction, and multiplication, but **not**
under division.  Next gap, next family.

### Rational Numbers (ℚ)

Any number that can be written as a fraction p/q where p, q ∈ ℤ and q ≠ 0.

$$\mathbb{Q} = \left\{ \frac{p}{q} \;\middle|\; p, q \in \mathbb{Z},\; q \neq 0 \right\}$$

**Pen & paper examples:**

- 7 ÷ 2 = 7/2 ✓
- 1/3 = 0.333… (repeating decimal — all rationals either terminate or repeat)

**Key test (try it on paper):** Is √2 rational?

Assume (for contradiction) that √2 = p/q where p and q are integers
with no common factor (i.e., the fraction is in lowest terms).

**Step 1:** Square both sides: $2 = p^2/q^2$, so $p^2 = 2q^2$.

**Step 2:** Since $p^2 = 2q^2$, $p^2$ is even.  But if $p^2$ is even, $p$
itself must be even.  (Why?  If $p$ were odd, say $p = 2m+1$, then
$p^2 = 4m^2 + 4m + 1$ is odd — contradiction.)

**Step 3:** Since $p$ is even, write $p = 2k$.  Substitute:
$(2k)^2 = 2q^2$ → $4k^2 = 2q^2$ → $q^2 = 2k^2$.

**Step 4:** By the same reasoning as Step 2, $q$ must be even.

**Step 5:** But both $p$ and $q$ are even, meaning they share a factor of 2.
This contradicts our assumption that p/q was in *lowest terms*!

Therefore √2 is **irrational**.  We need a bigger family.

### Real Numbers (ℝ)

Fill in all the gaps on the number line: rationals + irrationals.

$$\mathbb{R} = \mathbb{Q} \cup \{\text{irrationals like } \sqrt{2}, \pi, e\}$$

Every point on the number line is a real number.

**Decimal representation:**
- Rationals have decimals that either **terminate** (1/4 = 0.25) or
  **repeat** (1/3 = 0.333..., 1/7 = 0.142857142857...)
- Irrationals have decimals that **neither terminate nor repeat**
  (√2 = 1.41421356..., π = 3.14159265...)

**Density:** Between any two real numbers, no matter how close, there are
infinitely many other reals.  Between 0.1 and 0.2 lie 0.15, 0.123, 0.1001,
etc.  This means there are no "gaps" on the number line — every point
corresponds to exactly one real number (this is the **completeness** property).

**The number line:** Picture ℝ as an infinite ruler stretching in both
directions.  Every rational number sits on this line, but so do the
irrationals — they fill in the "holes" that rationals leave.  In fact,
there are *more* irrationals than rationals (Cantor proved the reals are
uncountable while the rationals are countable).

### Complex Numbers (ℂ)

What is √(−1)?  No real number works.  Define **i** such that i² = −1.

$$\mathbb{C} = \{a + bi \mid a, b \in \mathbb{R}\}$$

**Pen & paper example:**

- (2 + 3i) + (1 − i) = 3 + 2i
- (2 + 3i) × (1 − i) = 2 − 2i + 3i − 3i² = 2 + i − 3(−1) = 5 + i

### The Hierarchy

$$\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R} \subset \mathbb{C}$$

Each set contains all the previous ones, plus new elements that fill a gap.

## Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

fig, ax = plt.subplots(1, 1, figsize=(8, 8))

# Draw nested circles/ellipses showing N ⊂ Z ⊂ Q ⊂ R ⊂ C
sets_info = [
    ('$\\mathbb{C}$ (Complex)', 4.0, '#e8d5f5', 'purple'),
    ('$\\mathbb{R}$ (Real)', 3.2, '#d5e8f5', 'blue'),
    ('$\\mathbb{Q}$ (Rational)', 2.4, '#d5f5d5', 'green'),
    ('$\\mathbb{Z}$ (Integer)', 1.6, '#f5f5d5', 'olive'),
    ('$\\mathbb{N}$ (Natural)', 0.9, '#f5e0d5', 'orange'),
]

for label, radius, facecolor, edgecolor in sets_info:
    circle = plt.Circle((0, 0), radius, facecolor=facecolor,
                         edgecolor=edgecolor, linewidth=2, alpha=0.6)
    ax.add_patch(circle)
    # Place label at top of each ring
    ax.text(0, radius - 0.25, label, fontsize=11, ha='center',
            va='center', fontweight='bold', color=edgecolor)

# Add example numbers in each region
ax.text(0, 0, '0, 1, 2, 3...', fontsize=9, ha='center', va='center',
        color='darkorange')
ax.text(0, -1.2, '-3, -1', fontsize=9, ha='center', va='center',
        color='olive')
ax.text(0, -2.0, '1/3, -2/7', fontsize=9, ha='center', va='center',
        color='green')
ax.text(0, -2.8, '$\\sqrt{2}, \\pi, e$', fontsize=9, ha='center',
        va='center', color='blue')
ax.text(0, -3.6, '$2+3i, i$', fontsize=9, ha='center', va='center',
        color='purple')

ax.set_xlim(-5, 5)
ax.set_ylim(-5, 5)
ax.set_aspect('equal')
ax.set_title('Number System Hierarchy: $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\subset \\mathbb{C}$',
             fontsize=13)
ax.axis('off')

plt.tight_layout()
plt.savefig('number_systems_hierarchy.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Number Systems: verifying our pen & paper work ──────────
import math
import cmath

# Natural number closure check
print("=== Natural Numbers ===")
print(f"3 + 5 = {3 + 5}")       # 8 — still natural
print(f"3 * 5 = {3 * 5}")       # 15 — still natural
print(f"3 - 5 = {3 - 5}")       # -2 — NOT natural!

# Rational approximation of √2
print("\n=== Is √2 rational? ===")
print(f"√2 = {math.sqrt(2)}")
print(f"(√2)² = {math.sqrt(2) ** 2}")  # Should be exactly 2

# Complex number arithmetic (verify our hand computation)
print("\n=== Complex Numbers ===")
z1 = 2 + 3j
z2 = 1 - 1j
print(f"(2+3i) + (1-i) = {z1 + z2}")   # Should be 3+2i
print(f"(2+3i) × (1-i) = {z1 * z2}")   # Should be 5+1i
```

## Connection to CS / Games / AI

- **ℕ** — array indices, loop counters, unsigned integers in C
- **ℤ** — signed integers, two's complement representation
- **ℚ** — rational arithmetic avoids floating-point errors (Python's `fractions` module)
- **ℝ** — weights in neural networks, pixel intensities, physics simulations
- **ℂ** — Fourier transforms (audio/image processing), quantum computing, signal analysis

## Check Your Understanding

1. **Pen & paper:** Is 0.75 rational? Express it as p/q in lowest terms.
2. **Pen & paper:** Multiply (1 + 2i)(3 − i). Show every step.
3. **Think about it:** Why can't we just use integers for everything in a computer?
   What problem does floating-point solve, and what new problem does it create?
4. **Pen & paper:** Between 1/3 and 1/2, find a rational number and an
   irrational number.  (Hint: for the rational, try averaging.  For the
   irrational, think about $\sqrt{2}/k$ for some $k$.)
