# Radical Functions — nth Roots, Rational Exponents, and Extraneous Solutions

## Intuition

A **radical** undoes a power: $\sqrt[n]{x}$ asks "what number, raised to the
$n$th power, gives $x$?"  Rational exponents like $x^{2/3}$ are just another
notation for the same idea.  These appear whenever you invert a polynomial
relationship — distance formulas use square roots, cube roots appear in volume
calculations, and fractional powers model diminishing returns in economics
and learning curves in AI.

## Prerequisites

- Foundation 1, Lesson 12: Surds, Indices and Logarithms

## From First Principles

### nth roots defined

$$\sqrt[n]{a} = a^{1/n} \quad \text{means} \quad (a^{1/n})^n = a$$

- $\sqrt[2]{a} = \sqrt{a}$ — square root
- $\sqrt[3]{a}$ — cube root (defined for all real $a$, including negatives)
- Even roots require $a \ge 0$ for real results

### Rational exponents

$$x^{m/n} = \left(\sqrt[n]{x}\right)^m = \sqrt[n]{x^m}$$

**Pen & paper examples:**

$8^{2/3} = (\sqrt[3]{8})^2 = 2^2 = 4$

$27^{-1/3} = \frac{1}{27^{1/3}} = \frac{1}{3}$

$16^{3/4} = (\sqrt[4]{16})^3 = 2^3 = 8$

$(x^6)^{1/3} = x^{6/3} = x^2$

### Laws of exponents with rational powers

All the usual laws still hold:

$$x^a \cdot x^b = x^{a+b}, \quad \frac{x^a}{x^b} = x^{a-b}, \quad (x^a)^b = x^{ab}$$

**Pen & paper:** Simplify $x^{1/2} \cdot x^{2/3}$:

$$x^{1/2 + 2/3} = x^{3/6 + 4/6} = x^{7/6}$$

### Solving radical equations

**Strategy:** Isolate the radical, then raise both sides to the appropriate power.

**Example:** Solve $\sqrt{2x + 3} = x$.

Step 1: Square both sides: $2x + 3 = x^2$.

Step 2: Rearrange: $x^2 - 2x - 3 = 0$.

Step 3: Factor: $(x - 3)(x + 1) = 0$, so $x = 3$ or $x = -1$.

Step 4: **Check for extraneous solutions** (squaring can introduce false roots):

$x = 3$: $\sqrt{2(3)+3} = \sqrt{9} = 3$ ✓

$x = -1$: $\sqrt{2(-1)+3} = \sqrt{1} = 1 \neq -1$ ✗ — **extraneous!**

**Only $x = 3$ is valid.**

### Why extraneous solutions appear

Squaring is not a one-to-one operation: both $3^2 = 9$ and $(-3)^2 = 9$.
When we square both sides, we enlarge the solution set.  The check step is
not optional — it is mathematically necessary.

### A harder example

Solve $\sqrt{x + 7} - \sqrt{x} = 1$.

Step 1: Isolate one radical: $\sqrt{x + 7} = 1 + \sqrt{x}$.

Step 2: Square: $x + 7 = 1 + 2\sqrt{x} + x$.

Step 3: Simplify: $6 = 2\sqrt{x}$, so $\sqrt{x} = 3$, hence $x = 9$.

Check: $\sqrt{16} - \sqrt{9} = 4 - 3 = 1$ ✓

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 10, 300)
y_sqrt = np.sqrt(x)
y_cbrt_full = np.cbrt(np.linspace(-8, 10, 300))
x_cbrt = np.linspace(-8, 10, 300)
y_23 = np.where(x > 0, x**(2/3), 0)

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Left: sqrt and cbrt
axes[0].plot(x, y_sqrt, 'b-', linewidth=2, label=r'$y = \sqrt{x}$')
axes[0].plot(x_cbrt, y_cbrt_full, 'r--', linewidth=2, label=r'$y = \sqrt[3]{x}$')
axes[0].axhline(0, color='grey', linewidth=0.5)
axes[0].axvline(0, color='grey', linewidth=0.5)
axes[0].set_xlabel('x')
axes[0].set_ylabel('y')
axes[0].set_title('Square Root vs Cube Root')
axes[0].legend()
axes[0].grid(True, alpha=0.3)
axes[0].set_ylim(-2.5, 4)

# Right: rational exponent x^(2/3)
axes[1].plot(x, y_23, 'g-', linewidth=2, label=r'$y = x^{2/3}$')
axes[1].plot(x, x, ':', color='grey', alpha=0.5, label=r'$y = x$')
axes[1].set_xlabel('x')
axes[1].set_ylabel('y')
axes[1].set_title(r'Rational Exponent $x^{2/3}$')
axes[1].legend()
axes[1].grid(True, alpha=0.3)
axes[1].set_ylim(0, 6)

plt.tight_layout()
plt.savefig('radical_functions_plot.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Radical Functions ──────────────────────────────────────────
import math

# Rational exponents by hand, verified in Python
print("=== Rational exponents ===")
print(f"8^(2/3) = {8**(2/3):.1f}")          # expect 4
print(f"27^(-1/3) = {27**(-1/3):.6f}")      # expect 1/3
print(f"16^(3/4) = {16**(3/4):.1f}")        # expect 8

# Exponent law: x^(1/2) * x^(2/3) = x^(7/6)
x = 5
lhs = x**(1/2) * x**(2/3)
rhs = x**(7/6)
print(f"\nx=5: x^(1/2)*x^(2/3) = {lhs:.6f}")
print(f"     x^(7/6)          = {rhs:.6f}")
print(f"     Match: {abs(lhs - rhs) < 1e-10}")

# Solving sqrt(2x+3) = x
print("\n=== Solve sqrt(2x+3) = x ===")
# Candidates from x² - 2x - 3 = 0
for x in [3, -1]:
    lhs = math.sqrt(2*x + 3)
    rhs = x
    valid = "VALID" if abs(lhs - rhs) < 1e-10 else "EXTRANEOUS"
    print(f"  x={x:+d}: sqrt({2*x+3}) = {lhs:.1f}, x = {rhs} → {valid}")

# Solving sqrt(x+7) - sqrt(x) = 1
print("\n=== Solve sqrt(x+7) - sqrt(x) = 1 ===")
x = 9
result = math.sqrt(x + 7) - math.sqrt(x)
print(f"  x=9: sqrt(16) - sqrt(9) = {result:.1f} ✓")

# nth roots
print("\n=== nth roots ===")
for n in [2, 3, 4, 5]:
    val = 32**(1/n)
    print(f"  32^(1/{n}) = {val:.4f}")
```

## Connection to CS / Games / AI

- **Distance calculations** — Euclidean distance uses square roots:
  $d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$; game engines compute this constantly
- **Normalisation** — unit vectors require dividing by $\|\mathbf{v}\| = \sqrt{v_1^2 + v_2^2 + v_3^2}$
- **Learning rate schedules** — power decay $\alpha_t = \alpha_0 / t^{1/2}$ uses
  rational exponents
- **Fractional dimensions** — fractal dimension involves logarithms of nth roots
- **Numerical stability** — computing $x^{2/3}$ vs $(\sqrt[3]{x})^2$ can differ
  in floating-point precision

## Check Your Understanding

1. **Pen & paper:** Simplify $x^{3/4} \cdot x^{5/4}$ and $\frac{x^{5/6}}{x^{1/3}}$.
2. **Pen & paper:** Solve $\sqrt{3x + 1} = x - 1$.  Check for extraneous solutions.
3. **Pen & paper:** Evaluate $32^{-2/5}$ without a calculator.
4. **Pen & paper:** Solve $\sqrt{x + 5} + \sqrt{x} = 5$.
