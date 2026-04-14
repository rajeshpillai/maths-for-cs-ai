# Index Laws & Surds

## Intuition

**Indices** (powers) are shorthand for repeated multiplication, just like
multiplication is shorthand for repeated addition.  **Surds** are irrational
roots like $\sqrt{2}$ that we leave in exact form rather than rounding to a
decimal.  These two ideas underpin everything from algorithm complexity
($O(n^2)$, $O(2^n)$) to floating-point exponents in IEEE 754.

> Logarithms — the inverse of powers — are covered separately in
> **Foundation 2, Lesson 4**.

## Prerequisites

- Tier 0, Lesson 1: Number Systems

## From First Principles

### Why index notation exists

Multiplication is repeated addition: $3 + 3 + 3 + 3 = 4 \times 3 = 12$.

Powers are repeated multiplication: $2 \times 2 \times 2 = 2^3 = 8$.

We write $a^n$ to mean "$a$ multiplied by itself $n$ times" (for positive
integer $n$).

### Deriving the index laws

Every law below follows from the meaning "repeated multiplication".
No memorisation without understanding.

---

**Law 1: $a^m \times a^n = a^{m+n}$**

$a^m$ means $m$ copies of $a$ multiplied together.
$a^n$ means $n$ copies.  Multiply them:

$$\underbrace{a \times a \times \cdots \times a}_{m} \times \underbrace{a \times a \times \cdots \times a}_{n} = \underbrace{a \times a \times \cdots \times a}_{m + n} = a^{m+n}$$

**Pen & paper:** $2^3 \times 2^5 = (2 \times 2 \times 2)(2 \times 2 \times 2 \times 2 \times 2) = 2^8 = 256$.

---

**Law 2: $a^m \div a^n = a^{m-n}$ (where $m > n$)**

Cancel $n$ copies of $a$ from the numerator:

$$\frac{a^m}{a^n} = \frac{\overbrace{a \times a \times \cdots \times a}^{m}}{\underbrace{a \times a \times \cdots \times a}_{n}} = \underbrace{a \times a \times \cdots \times a}_{m - n} = a^{m-n}$$

**Pen & paper:** $\frac{3^7}{3^4} = 3^{7-4} = 3^3 = 27$.

---

**Law 3: $(a^m)^n = a^{mn}$**

$(a^m)^n$ means $n$ copies of $a^m$ multiplied together.  Each $a^m$ contains
$m$ copies of $a$, so the total is $m \times n$ copies:

$$(a^m)^n = \underbrace{a^m \times a^m \times \cdots \times a^m}_{n} = a^{m + m + \cdots + m} = a^{mn}$$

**Pen & paper:** $(5^2)^3 = 5^{2 \times 3} = 5^6 = 15625$.

---

**Law 4: $(ab)^n = a^n b^n$**

$n$ copies of $(ab)$:

$$(ab)^n = \underbrace{(ab)(ab)\cdots(ab)}_{n} = \underbrace{a \cdot a \cdots a}_{n} \times \underbrace{b \cdot b \cdots b}_{n} = a^n b^n$$

**Pen & paper:** $(2 \times 3)^4 = 2^4 \times 3^4 = 16 \times 81 = 1296 = 6^4$ ✓.

---

**Law 5: $a^0 = 1$**

From Law 2: $\frac{a^n}{a^n} = a^{n-n} = a^0$.  But $\frac{a^n}{a^n} = 1$.
Therefore $a^0 = 1$ (for $a \neq 0$).

---

**Law 6: $a^{-n} = \frac{1}{a^n}$**

From Law 2: $\frac{a^0}{a^n} = a^{0-n} = a^{-n}$.  But $\frac{a^0}{a^n} = \frac{1}{a^n}$.

**Pen & paper:** $2^{-3} = \frac{1}{2^3} = \frac{1}{8}$.

---

**Law 7: $a^{1/n} = \sqrt[n]{a}$**

What number, raised to the $n$-th power, gives $a$?  That is $\sqrt[n]{a}$.
Using Law 3: $(a^{1/n})^n = a^{n/n} = a^1 = a$.  So $a^{1/n}$ behaves
exactly like the $n$-th root.

**Pen & paper:** $8^{1/3} = \sqrt[3]{8} = 2$ because $2^3 = 8$.

---

**Law 8: $a^{m/n} = (\sqrt[n]{a})^m$**

Combining Laws 3 and 7:

$$a^{m/n} = (a^{1/n})^m = (\sqrt[n]{a})^m$$

**Pen & paper:** $8^{2/3} = (\sqrt[3]{8})^2 = 2^2 = 4$.

$27^{-1/3} = \frac{1}{27^{1/3}} = \frac{1}{\sqrt[3]{27}} = \frac{1}{3}$.

---

### Summary of index laws

| Law | Formula | Why |
|-----|---------|-----|
| Product | $a^m \times a^n = a^{m+n}$ | Count all copies |
| Quotient | $a^m \div a^n = a^{m-n}$ | Cancel copies |
| Power of power | $(a^m)^n = a^{mn}$ | $n$ groups of $m$ copies |
| Power of product | $(ab)^n = a^n b^n$ | Distribute over product |
| Zero exponent | $a^0 = 1$ | Quotient with equal exponents |
| Negative exponent | $a^{-n} = 1/a^n$ | Extend quotient law |
| Fractional exponent | $a^{1/n} = \sqrt[n]{a}$ | Inverse of $n$-th power |
| General fraction | $a^{m/n} = (\sqrt[n]{a})^m$ | Combine root and power |

### Surds

A **surd** is an irrational root that we leave in exact form: $\sqrt{2}$,
$\sqrt{3}$, $\sqrt{5}$, etc.  We keep surds exact because decimal
approximations lose precision.

**Simplifying surds:** Factor the radicand to extract perfect squares.

$$\sqrt{12} = \sqrt{4 \times 3} = \sqrt{4} \times \sqrt{3} = 2\sqrt{3}$$

$$\sqrt{50} = \sqrt{25 \times 2} = 5\sqrt{2}$$

$$\sqrt{72} = \sqrt{36 \times 2} = 6\sqrt{2}$$

**Adding and subtracting** (like terms only):

$3\sqrt{2} + 5\sqrt{2} = 8\sqrt{2}$

$\sqrt{12} + \sqrt{27} = 2\sqrt{3} + 3\sqrt{3} = 5\sqrt{3}$

**Multiplying:**

$\sqrt{3} \times \sqrt{5} = \sqrt{15}$

$(\sqrt{3})^2 = 3$

$(2\sqrt{3})(5\sqrt{3}) = 10 \times 3 = 30$

**Rationalising the denominator** — remove surds from denominators.

*Single surd:* Multiply top and bottom by the surd.

$$\frac{1}{\sqrt{2}} = \frac{1}{\sqrt{2}} \times \frac{\sqrt{2}}{\sqrt{2}} = \frac{\sqrt{2}}{2}$$

*Surd in a sum/difference:* Multiply by the **conjugate**.

$$\frac{1}{1 + \sqrt{3}} = \frac{1}{1 + \sqrt{3}} \times \frac{1 - \sqrt{3}}{1 - \sqrt{3}} = \frac{1 - \sqrt{3}}{1 - 3} = \frac{1 - \sqrt{3}}{-2} = \frac{\sqrt{3} - 1}{2}$$

**Why does the conjugate work?** Because $(a + b)(a - b) = a^2 - b^2$, which
eliminates the surd: $(1 + \sqrt{3})(1 - \sqrt{3}) = 1 - 3 = -2$.

**Pen & paper:** Rationalise $\frac{3}{2 - \sqrt{5}}$:

$$\frac{3}{2 - \sqrt{5}} \times \frac{2 + \sqrt{5}}{2 + \sqrt{5}} = \frac{3(2 + \sqrt{5})}{4 - 5} = \frac{6 + 3\sqrt{5}}{-1} = -6 - 3\sqrt{5}$$

## Python Verification

```python
# ── Index Laws & Surds ─────────────────────────────────────
import math

# === INDEX LAWS (derived from repeated multiplication) ===
print("=== Law 1: a^m × a^n = a^(m+n) ===")
print(f"2³ × 2⁵ = {2**3} × {2**5} = {2**3 * 2**5}")
print(f"2⁸ = {2**8}")
print(f"Match: {2**3 * 2**5 == 2**8}")

print(f"\n=== Law 2: a^m ÷ a^n = a^(m-n) ===")
print(f"3⁷ / 3⁴ = {3**7} / {3**4} = {3**7 // 3**4}")
print(f"3³ = {3**3}")

print(f"\n=== Law 3: (a^m)^n = a^(mn) ===")
print(f"(5²)³ = {(5**2)**3}")
print(f"5⁶ = {5**6}")

print(f"\n=== Law 4: (ab)^n = a^n × b^n ===")
print(f"(2×3)⁴ = {(2*3)**4}")
print(f"2⁴ × 3⁴ = {2**4 * 3**4}")

print(f"\n=== Law 5: a^0 = 1 ===")
for a in [2, 7, 100, -3]:
    print(f"  {a}⁰ = {a**0}")

print(f"\n=== Law 6: a^(-n) = 1/a^n ===")
print(f"2⁻³ = {2**-3} = 1/{2**3} = {1/2**3}")

print(f"\n=== Laws 7 & 8: Fractional exponents ===")
print(f"8^(1/3) = {8**(1/3):.4f} (cube root of 8 = 2)")
print(f"8^(2/3) = {8**(2/3):.4f} (should be 4)")
print(f"27^(-1/3) = {27**(-1/3):.4f} (should be 1/3)")

# === SURDS ===
print(f"\n=== Simplifying surds ===")
print(f"√12 = 2√3: {math.sqrt(12):.6f} = {2*math.sqrt(3):.6f}")
print(f"√50 = 5√2: {math.sqrt(50):.6f} = {5*math.sqrt(2):.6f}")
print(f"√72 = 6√2: {math.sqrt(72):.6f} = {6*math.sqrt(2):.6f}")

print(f"\n=== Adding surds ===")
print(f"√12 + √27 = 2√3 + 3√3 = 5√3")
print(f"  LHS = {math.sqrt(12) + math.sqrt(27):.6f}")
print(f"  RHS = {5*math.sqrt(3):.6f}")

print(f"\n=== Rationalising ===")
print(f"1/√2 = √2/2 = {math.sqrt(2)/2:.6f} = {1/math.sqrt(2):.6f}")
print(f"1/(1+√3) = (√3-1)/2 = {(math.sqrt(3)-1)/2:.6f} = {1/(1+math.sqrt(3)):.6f}")
print(f"3/(2-√5) = -6-3√5 = {-6-3*math.sqrt(5):.6f} = {3/(2-math.sqrt(5)):.6f}")
```

## Connection to CS / Games / AI

- **Algorithm complexity** — $O(n^2)$, $O(2^n)$, $O(n \log n)$ all use index notation
- **Floating point** — the exponent field in IEEE 754 stores a power of 2
- **Computer graphics** — inverse square root ($1/\sqrt{r^2}$) appears in lighting calculations; the famous Quake fast inverse square root hack exploits index representation
- **Cryptography** — RSA encryption relies on modular exponentiation ($a^e \mod n$)
- **Numerical stability** — keeping surds exact avoids accumulated rounding errors in symbolic computation

## Check Your Understanding

1. **Pen & paper:** Simplify $\frac{2^5 \times 4^3}{8^2}$ by expressing everything as powers of 2.
2. **Pen & paper:** Simplify $\sqrt{72} + \sqrt{18}$ into a single surd.
3. **Pen & paper:** Rationalise $\frac{3}{2 - \sqrt{5}}$ and simplify.
4. **Pen & paper:** Simplify $\frac{(3^4)^2 \times 3^{-3}}{3^2}$ using index laws only.
