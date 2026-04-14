# Exponent Rules Mastery — Zero, Negative, and Fractional Exponents

## Intuition

Exponents start as "repeated multiplication" — $2^3 = 2 \times 2 \times 2$.
But what does $2^0$, $2^{-1}$, or $2^{1/2}$ mean?  You cannot multiply 2 by
itself zero times, negative one times, or half a time.  The trick: we **extend**
the rules by demanding that the index laws stay consistent.  This one idea —
extending definitions to preserve patterns — is how mathematicians think, and
it underpins everything from floating-point numbers to learning rate schedules.

## Prerequisites

- Foundation 1, Lesson 1: Surds, Indices, Logarithms

## From First Principles

### The pattern that forces the definitions

Write out the powers of 2:

$$2^4 = 16, \quad 2^3 = 8, \quad 2^2 = 4, \quad 2^1 = 2$$

Each step **divides by 2**.  If we keep dividing:

$$2^0 = 1, \quad 2^{-1} = \frac{1}{2}, \quad 2^{-2} = \frac{1}{4}, \quad 2^{-3} = \frac{1}{8}$$

### Zero exponent

From the index law $a^m \div a^m = a^{m-m} = a^0$.

But $a^m \div a^m = 1$ (anything divided by itself).

Therefore: $a^0 = 1$ for any $a \neq 0$.

**Pen & paper:** $5^0 = 1$, $(-3)^0 = 1$, $(x^2 + 1)^0 = 1$.

Note: $0^0$ is conventionally taken as 1 in combinatorics and CS, but is
technically indeterminate in analysis.

### Negative exponents

From $a^m \times a^{-m} = a^{m + (-m)} = a^0 = 1$.

So $a^{-m} = \frac{1}{a^m}$.

**Pen & paper:**

$3^{-2} = \frac{1}{3^2} = \frac{1}{9}$

$\left(\frac{2}{5}\right)^{-3} = \left(\frac{5}{2}\right)^3 = \frac{125}{8}$

$x^{-1} = \frac{1}{x}$ — this is just the reciprocal.

### Fractional exponents

From $(a^{1/n})^n = a^{n/n} = a^1 = a$.

So $a^{1/n}$ is the $n$th root: $a^{1/n} = \sqrt[n]{a}$.

More generally: $a^{m/n} = (\sqrt[n]{a})^m = \sqrt[n]{a^m}$.

**Pen & paper:**

$8^{1/3} = \sqrt[3]{8} = 2$

$16^{3/4} = (\sqrt[4]{16})^3 = 2^3 = 8$

$27^{2/3} = (\sqrt[3]{27})^2 = 3^2 = 9$

$100^{-1/2} = \frac{1}{\sqrt{100}} = \frac{1}{10}$

### All index laws — the complete set

$$a^m \times a^n = a^{m+n}$$
$$\frac{a^m}{a^n} = a^{m-n}$$
$$(a^m)^n = a^{mn}$$
$$(ab)^n = a^n b^n$$
$$\left(\frac{a}{b}\right)^n = \frac{a^n}{b^n}$$

These hold for **all** rational exponents, not just positive integers.

**Pen & paper — simplify:** $\frac{2^5 \times 4^3}{8^2}$

$= \frac{2^5 \times (2^2)^3}{(2^3)^2} = \frac{2^5 \times 2^6}{2^6} = 2^5 = 32$

### Scientific notation

Any number as $a \times 10^n$ where $1 \leq |a| < 10$.

$6{,}370{,}000 = 6.37 \times 10^6$

$0.000042 = 4.2 \times 10^{-5}$

**Pen & paper — multiply:** $(3 \times 10^4)(2 \times 10^{-7}) = 6 \times 10^{-3} = 0.006$

### Exponential growth and decay

- **Growth:** $A(t) = A_0 \cdot b^t$ where $b > 1$ (population, compound interest)
- **Decay:** $A(t) = A_0 \cdot b^t$ where $0 < b < 1$ (radioactive decay, learning rate warmdown)

**Pen & paper:** A culture doubles every hour.  Start with 100 bacteria.

$A(t) = 100 \cdot 2^t$: $A(3) = 100 \cdot 8 = 800$.

### Visualisation

```python
# ── Exponential curves with different bases ────────────────
import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(-2, 4, 300)

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Left: Growth curves
ax1 = axes[0]
for base, color, label in [(2, 'b', '$2^t$'), (3, 'r', '$3^t$'), (10, 'g', '$10^t$')]:
    ax1.plot(t, base**t, color=color, linewidth=2, label=label)
ax1.axhline(1, color='k', linewidth=0.5, linestyle='--')
ax1.set_xlabel('t')
ax1.set_ylabel('$b^t$')
ax1.set_title('Exponential Growth ($b > 1$)')
ax1.legend()
ax1.grid(True, alpha=0.3)
ax1.set_ylim(0, 30)

# Right: Decay curves (0 < b < 1) and negative exponents
ax2 = axes[1]
for base, color, label in [(0.5, 'b', '$(0.5)^t = 2^{-t}$'),
                             (0.9, 'r', '$(0.9)^t$'),
                             (0.1, 'g', '$(0.1)^t$')]:
    ax2.plot(t, base**t, color=color, linewidth=2, label=label)
ax2.axhline(1, color='k', linewidth=0.5, linestyle='--')
ax2.axhline(0, color='k', linewidth=0.5)
ax2.set_xlabel('t')
ax2.set_ylabel('$b^t$')
ax2.set_title('Exponential Decay ($0 < b < 1$)')
ax2.legend()
ax2.grid(True, alpha=0.3)
ax2.set_ylim(0, 5)

plt.tight_layout()
plt.savefig('exponential_curves.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Exponent Rules Mastery ─────────────────────────────────
import math

# Zero exponent
print("=== Zero exponent ===")
for base in [5, -3, 0.7, 100]:
    print(f"  {base}^0 = {base**0}")

# Negative exponents
print("\n=== Negative exponents ===")
print(f"  3^(-2) = {3**-2} = 1/9 = {1/9}")
print(f"  (2/5)^(-3) = (5/2)^3 = {(5/2)**3}")

# Fractional exponents
print("\n=== Fractional exponents ===")
print(f"  8^(1/3) = {8**(1/3):.0f}")
print(f"  16^(3/4) = {16**(3/4):.0f}")
print(f"  27^(2/3) = {27**(2/3):.0f}")
print(f"  100^(-1/2) = {100**(-0.5)}")

# Index law verification
print("\n=== Index law check ===")
# 2^5 * 4^3 / 8^2 = 32
result = (2**5 * 4**3) / 8**2
print(f"  2^5 × 4^3 / 8^2 = {result:.0f}")

# Scientific notation
print("\n=== Scientific notation ===")
print(f"  6_370_000 = {6.37e6:.0f}")
print(f"  0.000042 = {4.2e-5}")
print(f"  (3e4)(2e-7) = {3e4 * 2e-7}")

# Exponential growth: bacteria doubling
print("\n=== Exponential growth ===")
A0 = 100
for t in range(7):
    A = A0 * 2**t
    print(f"  t={t}: A = {A0} × 2^{t} = {A}")

# Exponential decay: learning rate schedule
print("\n=== Decay: learning rate ===")
lr0 = 0.01
decay = 0.95
for epoch in [0, 10, 50, 100]:
    lr = lr0 * decay**epoch
    print(f"  epoch {epoch}: lr = {lr0} × {decay}^{epoch} = {lr:.6f}")
```

## Connection to CS / Games / AI

- **IEEE 754** — floating-point stores numbers as $m \times 2^e$, using negative exponents for fractions
- **Big-O notation** — $O(2^n)$ exponential time, $O(n^{1/2})$ sublinear algorithms
- **Learning rate decay** — $\text{lr}(t) = \text{lr}_0 \times \gamma^t$ is exponential decay
- **Binary representation** — each bit position is a power of 2: $1011_2 = 2^3 + 2^1 + 2^0 = 11$
- **Hash tables** — doubling strategy gives amortised $O(1)$ — powers of 2 in action
- **Game balance** — XP curves and damage scaling often use exponential formulas

## Check Your Understanding

1. **Pen & paper:** Simplify $\frac{3^4 \times 9^{-2}}{27^{1/3}}$ (express everything as powers of 3).
2. **Pen & paper:** Evaluate $\left(\frac{8}{27}\right)^{-2/3}$ without a calculator.
3. **Pen & paper:** Express 0.00056 in scientific notation, then compute $\frac{0.00056}{7 \times 10^{-2}}$.
4. **Think:** If a learning rate decays by factor 0.95 each epoch, after how many epochs is it halved? (Use $0.95^n = 0.5$.)
