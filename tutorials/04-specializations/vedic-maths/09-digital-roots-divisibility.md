# Beejank — Digital Roots and Divisibility

## Intuition

Digital roots (beejank) give you an instant sanity check for any arithmetic
computation. By reducing a number to its single-digit essence (repeatedly
summing digits), you can verify multiplication results, detect errors, and
test divisibility — all without any actual division. The "casting out nines"
technique has been used for centuries as an error-detection mechanism, and
the osculator method lets you test divisibility by notoriously tricky numbers
like 7, 11, and 13 in your head.

## Prerequisites

- Tier 0, Lesson 4: Modular Arithmetic
- Foundation 1, Lesson 2: Algebraic Manipulation

## The Sutra

> **बीजाङ्क**
> *Beejank*
> "Seed digit" (digital root)

The beejank (seed number) is what remains when you reduce a number to its
essence by repeatedly summing its digits until a single digit remains. This
is equivalent to the number modulo 9.

## From First Principles

### The Technique (step by step)

**Digital Root (Beejank)**:

1. Sum all the digits of the number.
2. If the sum has more than one digit, sum again.
3. Repeat until you have a single digit (1-9, where 9 represents 0 mod 9).

**Shortcut**: Cross out (cast out) any digits summing to 9 as you scan.

---

**Example 1: Digital root of 7493**

$7 + 4 + 9 + 3 = 23$
$2 + 3 = 5$

Digital root = **5**.

Faster: Cast out 9, cast out 7+2(from the 23)... Actually: $7+4 = 11 → 2$,
or spot $9$ → cast it out, $7+3 = 10 → 1$, then $1 + 4 = 5$.

---

**Application: Verification of multiplication**

If $A \times B = C$, then $\text{DR}(A) \times \text{DR}(B) \equiv \text{DR}(C) \pmod{9}$.

**Example 2: Verify 234 x 456 = 106704**

$\text{DR}(234) = 2+3+4 = 9$
$\text{DR}(456) = 4+5+6 = 15 → 6$
$\text{DR}(9) \times \text{DR}(6) = 9 \times 6 = 54 → 9$

$\text{DR}(106704) = 1+0+6+7+0+4 = 18 → 9$

$9 = 9$. Consistent (likely correct).

---

**Example 3: Detect error in 123 x 45 = 5635 (wrong!)**

$\text{DR}(123) = 6$
$\text{DR}(45) = 9$
$6 \times 9 = 54 → 9$

$\text{DR}(5635) = 5+6+3+5 = 19 → 10 → 1$

$9 \neq 1$. **Error detected!**

(Correct answer: 123 × 45 = 5535, DR = 5+5+3+5 = 18 → 9. ✓)

---

**Divisibility by Osculation**:

**Divisibility by 7** (Osculator = 5, positive):
1. Take the last digit, multiply by 5 (the osculator for 7).
2. Add to the remaining number.
3. Repeat until small enough to check mentally.

**Example 4: Is 343 divisible by 7?**

Step 1: Last digit = 3. Remaining = 34.
$34 + 3 \times 5 = 34 + 15 = 49$. Is 49 divisible by 7? Yes (7×7).

So 343 is divisible by 7 (and indeed, 343 = 7³).

---

**Divisibility by 11** (alternating sum):
Sum of digits in odd positions minus sum in even positions ≡ 0 (mod 11).

**Example 5: Is 918082 divisible by 11?**

Odd positions (from right): 2 + 0 + 1 = 3
Even positions: 8 + 8 + 9 = 25
Difference: 3 - 25 = -22. Since -22 ÷ 11 = -2, yes!

---

**Divisibility by 13** (Osculator = 4, negative):
1. Take last digit, multiply by 4.
2. **Subtract** from remaining number.
3. Repeat.

**Example 6: Is 2197 divisible by 13?**

$219 - 7 \times 4 = 219 - 28 = 191$
$19 - 1 \times 4 = 19 - 4 = 15$. Not divisible by 13?

Wait: $2197 = 13^3 = 2197$. Let me recheck:
$219 - 7×4 = 219 - 28 = 191$
$19 - 1×4 = 15$. Hmm.

Actually the osculator for 13 (positive) is 4: multiply last digit by 4 and ADD.
$219 + 7×4 = 219 + 28 = 247$
$24 + 7×4 = 24 + 28 = 52$
$5 + 2×4 = 13$. Divisible by 13! ✓

(The positive osculator for 13 is found from: $13 \times 3 = 39$, osculator = $(39+1)/10 = 4$.)

### Why It Works (algebraic proof)

**Digital Roots = Mod 9 arithmetic**:

Any number $N = d_n \times 10^n + d_{n-1} \times 10^{n-1} + ... + d_0$

Since $10 \equiv 1 \pmod{9}$, we have $10^k \equiv 1 \pmod{9}$ for all $k$.

Therefore: $N \equiv d_n + d_{n-1} + ... + d_0 \pmod{9}$

The digit sum IS the number mod 9. Repeating until single digit gives the
digital root, which equals $N \bmod 9$ (with 9 representing 0).

**Verification works because**: If $A \times B = C$, then
$(A \bmod 9)(B \bmod 9) \equiv C \pmod{9}$.
If the digital roots don't satisfy this, there's definitely an error.
(Note: passing the test doesn't guarantee correctness — errors that are
multiples of 9 are undetected.)

**Osculator proof for divisibility by 7**:

Let $N = 10q + r$ where $r$ is the last digit, $q$ is the rest.

We want to check if $N \equiv 0 \pmod{7}$.

$N = 10q + r$
$5N = 50q + 5r = 49q + q + 5r = 7(7q) + (q + 5r)$

So $N \equiv 0 \pmod 7$ iff $q + 5r \equiv 0 \pmod 7$.

This is exactly the osculation step! The osculator 5 comes from the fact that
$5 \times 10 \equiv 50 \equiv 1 \pmod{7}$ (i.e., 5 is the multiplicative
inverse of 10 modulo 7).

General formula: for divisor $d$, the osculator is $10^{-1} \pmod{d}$
(if using the positive form where we add).

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(13, 5))

# Left: Casting out nines visualisation
ax = axes[0]
ax.axis('off')
ax.set_title('Casting Out Nines: Verification', fontsize=13, fontweight='bold')

text = (
    "Verify: 234 × 456 = 106704\n"
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    "\n"
    "234 → 2+3+4 = 9 → DR = 9\n"
    "456 → 4+5+6 = 15 → 1+5 = 6 → DR = 6\n"
    "\n"
    "DR(234) × DR(456) = 9 × 6 = 54 → 5+4 = 9\n"
    "\n"
    "106704 → 1+0+6+7+0+4 = 18 → 1+8 = 9\n"
    "\n"
    "Both give 9 → CONSISTENT ✓\n"
    "\n"
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    "Detect error: 123 × 45 = 5635 ?\n"
    "\n"
    "123 → DR = 6,  45 → DR = 9\n"
    "6 × 9 = 54 → DR = 9\n"
    "5635 → DR = 19 → 10 → 1\n"
    "\n"
    "9 ≠ 1 → ERROR DETECTED! ✗"
)
ax.text(0.05, 0.5, text, transform=ax.transAxes, fontsize=10.5,
        family='monospace', va='center',
        bbox=dict(boxstyle='round', facecolor='lightyellow', alpha=0.9))

# Right: Osculator chain for divisibility by 7
ax2 = axes[1]
ax2.axis('off')
ax2.set_title('Osculator Method: Is 1729 ÷ 7?', fontsize=13, fontweight='bold')

text2 = (
    "Osculator for 7: multiply last digit by 5, add\n"
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    "\n"
    "1729\n"
    "  ↓ Take last digit: 9, multiply by 5: 45\n"
    "  ↓ Add to rest: 172 + 45 = 217\n"
    "\n"
    "217\n"
    "  ↓ Take last digit: 7, multiply by 5: 35\n"
    "  ↓ Add to rest: 21 + 35 = 56\n"
    "\n"
    "56\n"
    "  ↓ Take last digit: 6, multiply by 5: 30\n"
    "  ↓ Add to rest: 5 + 30 = 35\n"
    "\n"
    "35 = 7 × 5 → DIVISIBLE BY 7! ✓\n"
    "\n"
    "(1729 = 7 × 247 = 7 × 13 × 19)\n"
    "\n"
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    "Why 5? Because 5 × 10 = 50 ≡ 1 (mod 7)\n"
    "So 5 is the multiplicative inverse of 10 mod 7"
)
ax2.text(0.05, 0.5, text2, transform=ax2.transAxes, fontsize=10.5,
         family='monospace', va='center',
         bbox=dict(boxstyle='round', facecolor='lightcyan', alpha=0.9))

plt.tight_layout()
plt.savefig('digital_roots_visualisation.png', dpi=100, bbox_inches='tight')
plt.show()
```

## Python Verification

```python
# ── Beejank: Digital Roots and Divisibility ───────────────

def digital_root(n):
    """Compute digital root (repeated digit sum until single digit)."""
    n = abs(n)
    while n >= 10:
        n = sum(int(d) for d in str(n))
    return n


def digital_root_fast(n):
    """Digital root via modular arithmetic (O(1))."""
    if n == 0:
        return 0
    return 1 + (n - 1) % 9


# Verify both methods agree
print("Digital Root Verification:")
print("=" * 50)
for n in [7493, 234, 456, 106704, 5535, 999, 12345, 0, 81]:
    dr1 = digital_root(n)
    dr2 = digital_root_fast(n)
    assert dr1 == dr2, f"Mismatch for {n}: {dr1} vs {dr2}"
    print(f"  DR({n}) = {dr1}")

# Casting out nines for verification
print("\n\nCasting Out Nines — Multiplication Check:")
print("=" * 50)

def verify_multiplication(a, b, claimed_result):
    """Check if a × b = claimed_result using digital roots."""
    dr_product = digital_root(digital_root(a) * digital_root(b))
    dr_result = digital_root(claimed_result)
    consistent = (dr_product == dr_result)
    actual = a * b
    print(f"  {a} × {b} = {claimed_result}? ", end="")
    print(f"DR check: {digital_root(a)}×{digital_root(b)}→{dr_product} vs DR({claimed_result})={dr_result}", end="")
    if consistent:
        print(" → Consistent", end="")
        if claimed_result == actual:
            print(" (and correct ✓)")
        else:
            print(f" (but WRONG! actual={actual}, undetected error)")
    else:
        print(f" → ERROR DETECTED! (actual={actual})")
    return consistent

verify_multiplication(234, 456, 106704)   # Correct
verify_multiplication(123, 45, 5635)      # Wrong (should be 5535)
verify_multiplication(123, 45, 5535)      # Correct
verify_multiplication(99, 99, 9801)       # Correct
verify_multiplication(111, 111, 12312)    # Wrong by multiple of 9?

# Osculator method for divisibility
print("\n\nOsculator Method:")
print("=" * 50)

def divisible_by_7(n):
    """Test divisibility by 7 using osculator = 5."""
    print(f"  Testing {n} ÷ 7:")
    original = n
    while n >= 70:
        last = n % 10
        rest = n // 10
        n = rest + last * 5
        print(f"    {rest} + {last}×5 = {n}")
    result = (n % 7 == 0)
    print(f"    {n} {'is' if result else 'is NOT'} divisible by 7")
    assert result == (original % 7 == 0)
    return result

divisible_by_7(343)   # 7³
divisible_by_7(1729)  # 7 × 247
divisible_by_7(256)   # not divisible

def divisible_by_13(n):
    """Test divisibility by 13 using positive osculator = 4."""
    print(f"\n  Testing {n} ÷ 13:")
    original = n
    while n >= 130:
        last = n % 10
        rest = n // 10
        n = rest + last * 4
        print(f"    {rest} + {last}×4 = {n}")
    result = (n % 13 == 0)
    print(f"    {n} {'is' if result else 'is NOT'} divisible by 13")
    assert result == (original % 13 == 0)
    return result

divisible_by_13(2197)  # 13³
divisible_by_13(1001)  # 7 × 11 × 13
divisible_by_13(500)   # not divisible

# Divisibility by 11 (alternating sum)
print("\n\nDivisibility by 11 (alternating sum):")
print("=" * 50)

def divisible_by_11(n):
    digits = [int(d) for d in str(n)]
    alt_sum = sum(d * ((-1) ** i) for i, d in enumerate(reversed(digits)))
    result = (alt_sum % 11 == 0)
    print(f"  {n}: alternating sum = {alt_sum}, "
          f"{'divisible' if result else 'not divisible'} by 11")
    assert result == (n % 11 == 0)
    return result

divisible_by_11(918082)
divisible_by_11(121)
divisible_by_11(123)

# Finding osculators
print("\n\nOsculator Derivation:")
print("=" * 50)
print("The osculator for divisor d is: 10^(-1) mod d")
for d in [7, 11, 13, 17, 19, 23]:
    # Find multiplicative inverse of 10 mod d
    osc = pow(10, -1, d)
    print(f"  Divisor {d:2d}: osculator = {osc:2d} "
          f"(verify: 10 × {osc} = {10*osc} ≡ {10*osc % d} mod {d})")
```

## Connection to CS / Games / AI / Business / Industry

- **Checksums**: Digital roots are the simplest form of checksum. ISBN,
  credit card numbers (Luhn algorithm), and network packet checksums all
  use similar modular arithmetic for error detection.
- **Hash functions**: The digital root is a trivial hash ($n \bmod 9$).
  Understanding why it works builds intuition for more sophisticated hashing.
- **Modular arithmetic in crypto**: The osculator derivation (finding $10^{-1} \bmod d$)
  is the same operation needed in RSA key generation and modular exponentiation.
- **Data validation**: In ML data pipelines, quick sanity checks on computed
  values (does this loss value make sense?) use the same reasoning.

## Practice Problems

1. Find the digital root of 123456789.
2. Use casting-out-nines to check: is 5678 × 1234 = 7006652?
3. Is 2401 divisible by 7? (use osculator method)
4. Is 3003 divisible by 13? (osculator = 4)
5. Is 918918 divisible by 7, 11, AND 13?
6. Find the osculator for testing divisibility by 19.
7. Test if 4913 is divisible by 17.

**Answers**:
1. 45 → 9
2. DR(5678)=8, DR(1234)=1, 8×1=8; DR(7006652)=7006652→26→8. Consistent (and correct: 5678×1234=7006652)
3. 240 + 1×5 = 245 → 24 + 5×5 = 49 = 7×7. Yes!
4. 300 + 3×4 = 312 → 31 + 2×4 = 39 = 13×3. Yes!
5. 918918 = 918 × 1001 = 918 × 7 × 11 × 13. Yes to all!
6. Osculator for 19: $10^{-1} \bmod 19 = 2$ (since 10×2=20≡1 mod 19)
7. 491 + 3×(-5) = 476 → 47 + 6×(-5) = 17. Yes! (4913 = 17³)
