# Limits — Intuitive Introduction

## Intuition

Imagine driving a car and glancing at the speedometer.  The speedometer shows
your **instantaneous speed** — not your average speed over the whole trip, but
how fast you are going *right now*.  Calculus was invented to make "right now"
precise.  The tool that does it is the **limit**: we compute average rates of
change over smaller and smaller intervals until a single value emerges.

## Prerequisites

- Foundation 2, Lesson 10: Functions and Graphs (function notation, slopes)

## From First Principles

### Average rate of change (the secant line)

Given a function $f(x)$, the **average rate of change** between $x = a$ and
$x = b$ is the slope of the line through $(a, f(a))$ and $(b, f(b))$:

$$\text{Average rate} = \frac{f(b) - f(a)}{b - a}$$

This line is called a **secant line**.

**Pen & paper example:** Let $f(x) = x^2$.  Average rate between $x = 1$ and $x = 3$:

$$\frac{f(3) - f(1)}{3 - 1} = \frac{9 - 1}{2} = 4$$

### From average to instantaneous — shrinking the interval

What if we want the rate of change *at exactly* $x = 1$?  Let the second
point approach $x = 1$ by choosing $x = 1 + h$ for smaller and smaller $h$:

$$\frac{f(1 + h) - f(1)}{h} = \frac{(1+h)^2 - 1}{h} = \frac{1 + 2h + h^2 - 1}{h} = \frac{2h + h^2}{h} = 2 + h$$

| $h$    | $2 + h$ |
|--------|---------|
| 1      | 3       |
| 0.1    | 2.1     |
| 0.01   | 2.01    |
| 0.001  | 2.001   |
| 0.0001 | 2.0001  |

As $h \to 0$, the expression approaches **2**.  We write:

$$\lim_{h \to 0} \frac{f(1+h) - f(1)}{h} = 2$$

This is the **instantaneous rate of change** of $f(x) = x^2$ at $x = 1$.

### What "limit" means (no epsilon-delta)

$\lim_{x \to a} g(x) = L$ means: as $x$ gets arbitrarily close to $a$
(but never equals $a$), $g(x)$ gets arbitrarily close to $L$.

Key point: we never *plug in* $x = a$.  The function need not even be defined
at $a$.  The limit describes the **trend**, not the value.

### One-sided limits

Sometimes a function approaches different values from the left and right.

$$\lim_{x \to a^-} f(x) \quad \text{(left-hand limit: } x < a\text{)}$$
$$\lim_{x \to a^+} f(x) \quad \text{(right-hand limit: } x > a\text{)}$$

The two-sided limit $\lim_{x \to a} f(x)$ exists **only if** both one-sided
limits exist and are equal.

**Pen & paper example:**

$$f(x) = \begin{cases} x + 1 & x < 2 \\ 5     & x = 2 \\ 3x - 3 & x > 2 \end{cases}$$

$\lim_{x \to 2^-} f(x) = 2 + 1 = 3$

$\lim_{x \to 2^+} f(x) = 3(2) - 3 = 3$

Both sides agree, so $\lim_{x \to 2} f(x) = 3$ (even though $f(2) = 5$).

### A limit that does not exist

$$g(x) = \begin{cases} 1 & x < 0 \\ -1 & x \ge 0 \end{cases}$$

$\lim_{x \to 0^-} g(x) = 1$, $\lim_{x \to 0^+} g(x) = -1$.  Left $\ne$ right,
so $\lim_{x \to 0} g(x)$ **does not exist**.

### Visualisation — secant lines approaching a tangent

```python
import numpy as np
import matplotlib.pyplot as plt

f = lambda x: x**2
a = 1.0

fig, ax = plt.subplots(1, 1, figsize=(7, 5))
x = np.linspace(-0.5, 3.5, 300)
ax.plot(x, f(x), 'k-', linewidth=2, label='$f(x) = x^2$')

# Draw secant lines for decreasing h
h_values = [2.0, 1.0, 0.5, 0.1]
colors = ['#d62728', '#ff7f0e', '#2ca02c', '#1f77b4']
for h, c in zip(h_values, colors):
    slope = (f(a + h) - f(a)) / h
    y_line = f(a) + slope * (x - a)
    ax.plot(x, y_line, '--', color=c, alpha=0.7,
            label=f'h={h}: slope={slope:.2f}')

# Tangent line (the limit)
ax.plot(x, 2*(x - 1) + 1, '-', color='blue', linewidth=2,
        label='Tangent: slope = 2')
ax.plot(a, f(a), 'ko', markersize=8, zorder=5)
ax.set_xlim(-0.5, 3.5)
ax.set_ylim(-1, 10)
ax.set_xlabel('x')
ax.set_ylabel('f(x)')
ax.set_title('Secant lines approaching the tangent at x = 1')
ax.legend(fontsize=8)
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

## Python Verification

```python
# ── Limits: table approach ──────────────────────────────────
import math

# Instantaneous rate of change of f(x) = x² at x = 1
print("=== Approaching the limit: (f(1+h) - f(1)) / h ===")
f = lambda x: x**2
a = 1.0
for h in [1, 0.1, 0.01, 0.001, 0.0001, 1e-8]:
    rate = (f(a + h) - f(a)) / h
    print(f"  h = {h:<10}  rate = {rate:.10f}")
print("  Limit = 2  (exact)")

# One-sided limits
print("\n=== One-sided limits: piecewise function ===")
# f(x) = x+1 for x<2, 5 at x=2, 3x-3 for x>2
def piecewise(x):
    if x < 2:
        return x + 1
    elif x == 2:
        return 5
    else:
        return 3*x - 3

print("  From the left (x → 2⁻):")
for x in [1.9, 1.99, 1.999, 1.9999]:
    print(f"    f({x}) = {piecewise(x):.4f}")

print("  From the right (x → 2⁺):")
for x in [2.1, 2.01, 2.001, 2.0001]:
    print(f"    f({x}) = {piecewise(x):.4f}")

print("  Both sides → 3, but f(2) = 5")

# A non-existent limit: sin(1/x) as x → 0
print("\n=== Limit that does not exist: sin(1/x) as x → 0 ===")
for x in [0.1, 0.01, 0.001, 0.0001, 0.00001]:
    print(f"  x = {x:<10}  sin(1/x) = {math.sin(1/x):+.6f}")
print("  Values keep oscillating — no single limit")
```

## Connection to CS / Games / AI / Business / Industry

- **Derivatives** — the limit of the difference quotient is the derivative, the
  engine of gradient descent and backpropagation
- **Frame rates** — instantaneous velocity in physics engines uses the same
  limit idea: $\Delta x / \Delta t$ as $\Delta t \to 0$
- **Numerical differentiation** — finite difference approximations pick a small
  $h$ and compute $(f(x+h) - f(x))/h$; understanding limits tells you how small
  $h$ should be (too small causes floating-point errors)
- **Animation curves** — the slope of a Bezier curve at a point is a limit
- **Marginal cost & marginal revenue** — economists at every Fortune 500 CFO's office define $MC = \lim_{\Delta q \to 0} \Delta C / \Delta q$ — the limit *is* the price-of-one-more-unit; SAP and Oracle ERP systems compute discrete approximations to this limit on every BOM costing run.
- **Continuous compounding** — the constant $e$ falls out of $\lim_{n\to\infty} (1 + r/n)^n$; banks like JP Morgan use continuous compounding to price zero-coupon bonds and forwards on Bloomberg.
- **Aerospace stagnation analysis** — fluid dynamicists at NASA use limits as Mach $\to 0$ (incompressible flow) and Mach $\to 1$ (transonic) to validate CFD codes like STAR-CCM+ and Fluent across regimes.
- **Crash-test instantaneous deceleration** — automotive safety engineers at IIHS measure peak g-loads as limits of $\Delta v/\Delta t$ on millisecond windows; the FMVSS 208 standard is written in this limit-of-rate language.

## Check Your Understanding

1. **Pen & paper:** Compute $\lim_{h \to 0} \frac{(3+h)^2 - 9}{h}$ by expanding and simplifying.
2. **Pen & paper:** For $f(x) = 1/x$, build a table of $(f(2+h) - f(2))/h$ for $h = 0.1, 0.01, 0.001$.  What value does the limit approach?
3. **Pen & paper:** Give an example of a function where $\lim_{x \to 1^-} f(x) = 4$ but $\lim_{x \to 1^+} f(x) = 7$.
4. **Think:** Why can't we just set $h = 0$ in the difference quotient?
