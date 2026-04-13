# Number Systems — The Bedrock

## Intuition

Every number you have ever used belongs to a family. Understanding these
families — and how each one *extends* the previous — is the first rung of the
ladder.  Think of it like unlocking new types of blocks in a game: each new
number system lets you solve problems you couldn't solve before.

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

Assume √2 = p/q in lowest terms.  Then 2 = p²/q², so p² = 2q².
This means p² is even, so p is even.  Write p = 2k.
Then 4k² = 2q², so q² = 2k², meaning q is also even.
But we said p/q was in *lowest terms* — contradiction!

Therefore √2 is **irrational**.  We need a bigger family.

### Real Numbers (ℝ)

Fill in all the gaps on the number line: rationals + irrationals.

$$\mathbb{R} = \mathbb{Q} \cup \{\text{irrationals like } \sqrt{2}, \pi, e\}$$

Every point on the number line is a real number.

### Complex Numbers (ℂ)

What is √(−1)?  No real number works.  Define **i** such that i² = −1.

$$\mathbb{C} = \{a + bi \mid a, b \in \mathbb{R}\}$$

**Pen & paper example:**

- (2 + 3i) + (1 − i) = 3 + 2i
- (2 + 3i) × (1 − i) = 2 − 2i + 3i − 3i² = 2 + i − 3(−1) = 5 + i

### The Hierarchy

$$\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R} \subset \mathbb{C}$$

Each set contains all the previous ones, plus new elements that fill a gap.

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
