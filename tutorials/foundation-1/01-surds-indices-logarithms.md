# Surds, Indices, and Logarithm Laws

## Intuition

**Indices** (powers) are shorthand for repeated multiplication.  **Surds** are
irrational roots like $\sqrt{2}$ that we leave in exact form.  **Logarithms**
are the inverse of powers.  These three form the algebraic toolkit that
everything in calculus, probability, and CS builds on.

## Prerequisites

- Tier 0, Lesson 1: Number Systems

## From First Principles

### Index laws (memorise these)

$$a^m \times a^n = a^{m+n}$$
$$a^m \div a^n = a^{m-n}$$
$$(a^m)^n = a^{mn}$$
$$(ab)^n = a^n b^n$$
$$a^0 = 1$$
$$a^{-n} = \frac{1}{a^n}$$
$$a^{1/n} = \sqrt[n]{a}$$
$$a^{m/n} = (\sqrt[n]{a})^m$$

### Pen & paper: Simplify

$2^3 \times 2^5 = 2^8 = 256$

$\frac{3^7}{3^4} = 3^3 = 27$

$(5^2)^3 = 5^6 = 15625$

$8^{2/3} = (\sqrt[3]{8})^2 = 2^2 = 4$

$27^{-1/3} = \frac{1}{\sqrt[3]{27}} = \frac{1}{3}$

### Surds

A surd is an irrational root: $\sqrt{2}, \sqrt{3}, \sqrt{5}, \ldots$

**Simplifying:** $\sqrt{12} = \sqrt{4 \times 3} = 2\sqrt{3}$

$\sqrt{50} = \sqrt{25 \times 2} = 5\sqrt{2}$

**Adding:** $3\sqrt{2} + 5\sqrt{2} = 8\sqrt{2}$ (like terms only)

**Multiplying:** $\sqrt{3} \times \sqrt{5} = \sqrt{15}$

$(\sqrt{3})^2 = 3$

**Rationalising the denominator:**

$$\frac{1}{\sqrt{2}} = \frac{1}{\sqrt{2}} \times \frac{\sqrt{2}}{\sqrt{2}} = \frac{\sqrt{2}}{2}$$

$$\frac{1}{1 + \sqrt{3}} = \frac{1 - \sqrt{3}}{(1+\sqrt{3})(1-\sqrt{3})} = \frac{1 - \sqrt{3}}{1 - 3} = \frac{\sqrt{3} - 1}{2}$$

### Logarithm laws

$$\log_a(xy) = \log_a x + \log_a y$$
$$\log_a(x/y) = \log_a x - \log_a y$$
$$\log_a(x^n) = n \log_a x$$
$$\log_a a = 1, \quad \log_a 1 = 0$$
$$\log_a b = \frac{\ln b}{\ln a} \quad \text{(change of base)}$$

### Pen & paper: Solve equations

**Solve $2^x = 32$:** $2^x = 2^5$ → $x = 5$

**Solve $3^{2x} = 81$:** $3^{2x} = 3^4$ → $2x = 4$ → $x = 2$

**Solve $5^x = 20$:** $x = \log_5 20 = \frac{\ln 20}{\ln 5} = \frac{3.00}{1.61} \approx 1.86$

**Solve $\log_2(x+3) = 5$:** $x + 3 = 2^5 = 32$ → $x = 29$

## Python Verification

```python
# ── Surds, Indices, Logarithms ──────────────────────────────
import math

# Index laws
print("=== Index laws ===")
print(f"2³ × 2⁵ = 2⁸ = {2**8}")
print(f"3⁷ / 3⁴ = 3³ = {3**3}")
print(f"(5²)³ = 5⁶ = {5**6}")
print(f"8^(2/3) = {8**(2/3):.0f}")
print(f"27^(-1/3) = {27**(-1/3):.4f}")

# Surds
print(f"\n=== Surds ===")
print(f"√12 = 2√3 = {2*math.sqrt(3):.4f} = {math.sqrt(12):.4f}")
print(f"√50 = 5√2 = {5*math.sqrt(2):.4f} = {math.sqrt(50):.4f}")

# Rationalise 1/√2
print(f"\n=== Rationalise ===")
print(f"1/√2 = √2/2 = {math.sqrt(2)/2:.6f} = {1/math.sqrt(2):.6f}")

# Logarithm laws
print(f"\n=== Logarithm laws ===")
x, y = 12, 5
print(f"log(12×5) = {math.log(x*y):.4f}")
print(f"log(12) + log(5) = {math.log(x) + math.log(y):.4f}")
print(f"log(12/5) = {math.log(x/y):.4f}")
print(f"log(12) - log(5) = {math.log(x) - math.log(y):.4f}")

# Solve equations
print(f"\n=== Solve equations ===")
print(f"5^x = 20 → x = log₅(20) = {math.log(20)/math.log(5):.4f}")
print(f"log₂(x+3) = 5 → x = 2⁵ - 3 = {2**5 - 3}")
```

## Connection to CS / Games / AI

- **Algorithm complexity** — $O(\log n)$, $O(n^2)$, $O(2^n)$ all use index/log notation
- **Floating point** — exponent field stores a power of 2 (IEEE 754)
- **Information theory** — entropy uses $\log_2$ (bits)
- **Decibels** — $10\log_{10}$ scale in audio processing
- **Numerical stability** — use $\log$ to avoid overflow: $\log(ab) = \log a + \log b$

## Check Your Understanding

1. **Pen & paper:** Simplify $\frac{2^5 \times 4^3}{8^2}$ (express all as powers of 2).
2. **Pen & paper:** Simplify $\sqrt{72} + \sqrt{18}$.
3. **Pen & paper:** Rationalise $\frac{3}{2 - \sqrt{5}}$.
4. **Pen & paper:** Solve $\log_3(2x - 1) = 4$.
