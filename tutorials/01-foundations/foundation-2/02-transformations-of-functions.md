# Transformations of Functions

## Intuition

Game developers resize, flip, and reposition sprites all the time.  Function
transformations are the mathematical version: take any curve $y = f(x)$ and
shift it, stretch it, or reflect it using simple arithmetic on $x$ or $y$.
Master these and you can manipulate any graph without re-deriving it.

## Prerequisites

- Foundation 1, Lesson 6: Functions

## From First Principles

### The parent function

Start with a simple function whose shape you know — for example $f(x) = x^2$.
Every transformation modifies this parent graph.

### Vertical shift: $y = f(x) + k$

Add $k$ to every output.

- $k > 0$: graph moves **up** by $k$ units
- $k < 0$: graph moves **down** by $|k|$ units

**Pen & paper:** $f(x) = x^2$.  Then $g(x) = x^2 + 3$.

| $x$ | $f(x)$ | $g(x)$ |
|-----|--------|---------|
| $-2$ | $4$   | $7$     |
| $0$  | $0$   | $3$     |
| $2$  | $4$   | $7$     |

Every $y$-value increased by 3.  The vertex moved from $(0,0)$ to $(0,3)$.

### Horizontal shift: $y = f(x - h)$

Replace $x$ with $(x - h)$.

- $h > 0$: graph moves **right** by $h$ (counterintuitive!)
- $h < 0$: graph moves **left** by $|h|$

**Pen & paper:** $g(x) = (x - 2)^2$.  The vertex moves from $(0,0)$ to $(2,0)$.

**Why the minus sign?**  The new graph reaches the value $f(0)$ when
$x - h = 0$, i.e. when $x = h$.  So the "zero point" has shifted right by $h$.

### Vertical stretch/compress: $y = a \cdot f(x)$

Multiply every output by $a$.

- $|a| > 1$: graph stretches vertically (taller)
- $0 < |a| < 1$: graph compresses vertically (flatter)

**Pen & paper:** $g(x) = 3x^2$ vs $h(x) = \tfrac{1}{2}x^2$.

| $x$ | $x^2$ | $3x^2$ | $\tfrac{1}{2}x^2$ |
|-----|--------|---------|---------------------|
| $1$ | $1$    | $3$     | $0.5$               |
| $2$ | $4$    | $12$    | $2$                 |

### Horizontal stretch/compress: $y = f(bx)$

Replace $x$ with $bx$.

- $|b| > 1$: graph compresses horizontally (narrower)
- $0 < |b| < 1$: graph stretches horizontally (wider)

**Pen & paper:** $g(x) = (2x)^2 = 4x^2$.  The parabola is narrower —
it reaches height 4 at $x = 1$ instead of $x = 2$.

### Reflections

- $y = -f(x)$: reflect across the $x$-axis (flip upside down)
- $y = f(-x)$: reflect across the $y$-axis (flip left-right)

**Pen & paper:** If $f(x) = x^2 + 1$, then $-f(x) = -(x^2 + 1) = -x^2 - 1$.
The parabola opens downward, vertex at $(0, -1)$.

### Combining transformations

Apply in this order: horizontal shift/stretch first (inside the function),
then vertical stretch/shift (outside the function).

$$y = a \cdot f(b(x - h)) + k$$

**Pen & paper:** $g(x) = 2(x - 1)^2 + 3$.

1. Start with $f(x) = x^2$
2. Shift right 1: $(x-1)^2$
3. Stretch vertically by 2: $2(x-1)^2$
4. Shift up 3: $2(x-1)^2 + 3$

Vertex is at $(1, 3)$, parabola is twice as steep.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-4, 6, 300)
f = x**2  # parent function

fig, axes = plt.subplots(2, 2, figsize=(10, 8))

# (a) Vertical & horizontal shifts
ax = axes[0, 0]
ax.plot(x, f, 'k-', linewidth=2, label='$f(x) = x^2$')
ax.plot(x, f + 3, 'r-', linewidth=2, label='$f(x) + 3$ (up 3)')
ax.plot(x, (x - 2)**2, 'b-', linewidth=2, label='$f(x-2)$ (right 2)')
ax.set_title('Shifts')
ax.legend(fontsize=8)
ax.set_ylim(-2, 15)
ax.grid(True, alpha=0.3)

# (b) Stretches
ax = axes[0, 1]
ax.plot(x, f, 'k-', linewidth=2, label='$x^2$')
ax.plot(x, 3 * f, 'r-', linewidth=2, label='$3x^2$ (tall)')
ax.plot(x, 0.5 * f, 'b-', linewidth=2, label='$0.5x^2$ (flat)')
ax.set_title('Vertical stretches')
ax.legend(fontsize=8)
ax.set_ylim(-2, 15)
ax.grid(True, alpha=0.3)

# (c) Reflections
ax = axes[1, 0]
ax.plot(x, f, 'k-', linewidth=2, label='$x^2$')
ax.plot(x, -f, 'r-', linewidth=2, label='$-x^2$ (x-axis)')
ax.set_title('Reflections')
ax.legend(fontsize=8)
ax.set_ylim(-15, 10)
ax.grid(True, alpha=0.3)

# (d) Combined
ax = axes[1, 1]
ax.plot(x, f, 'k-', linewidth=2, label='$x^2$')
ax.plot(x, 2*(x - 1)**2 + 3, 'r-', linewidth=2,
        label='$2(x-1)^2 + 3$')
ax.set_title('Combined transformation')
ax.legend(fontsize=8)
ax.set_ylim(-2, 20)
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('transformations.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Transformations of Functions ─────────────────────────────
import numpy as np

# Parent function
f = lambda x: x**2

# Verify vertical shift
print("=== Vertical shift: f(x) + 3 ===")
for x in [-2, 0, 2]:
    print(f"  f({x}) = {f(x)},  f({x})+3 = {f(x)+3}")

# Verify horizontal shift
print("\n=== Horizontal shift: f(x-2) ===")
g = lambda x: (x - 2)**2
for x in [0, 2, 4]:
    print(f"  g({x}) = ({x}-2)² = {g(x)}")
print("  Vertex moved from (0,0) to (2,0)")

# Verify stretch
print("\n=== Vertical stretch: 3f(x) ===")
for x in [1, 2, 3]:
    print(f"  f({x}) = {f(x)},  3f({x}) = {3*f(x)}")

# Verify reflection
print("\n=== Reflection: -f(x) ===")
for x in [-2, 0, 2]:
    print(f"  f({x}) = {f(x)},  -f({x}) = {-f(x)}")

# Combined transformation
print("\n=== Combined: 2(x-1)² + 3 ===")
h = lambda x: 2*(x - 1)**2 + 3
print(f"  Vertex at x=1: h(1) = {h(1)}")
print(f"  h(0) = {h(0)}, h(2) = {h(2)}, h(3) = {h(3)}")
```

## Connection to CS / Games / AI / Business / Industry

- **Sprite transforms** — scaling, flipping, and repositioning sprites are
  exactly vertical/horizontal stretches, reflections, and shifts
- **CSS transforms** — `translate()`, `scale()`, `rotate()` map directly
- **Activation functions** — shifted or scaled versions of standard functions
  (e.g. leaky ReLU is a stretched negative half)
- **Data normalisation** — shifting by the mean and scaling by the standard
  deviation is a function transformation
- **Seasonality adjustment in forecasting** — econometricians at the BLS and Federal Reserve apply $X_{\text{adjusted}}(t) = X(t) - s(t)$ (a vertical shift) to seasonally adjust unemployment and CPI series; SAS and X-13ARIMA-SEATS implement these transformations.
- **Currency-rebased indices** — fund factsheets at MSCI and FTSE rebase prices to 100 on a chosen date — a vertical shift plus scale; Bloomberg and Refinitiv Eikon expose this as a one-click "rebase" button.
- **Mechanical transfer functions** — control engineers at Bosch and ABB shift and scale step-response curves to match a plant's gain and time delay; MATLAB's Control System Toolbox uses `D(s) e^{-Ts}` shifts and gain scalings.
- **Image-sensor calibration** — Sony and Canon camera firmware applies per-pixel offset (dark current shift) and gain (white-balance scale) — exactly horizontal/vertical transformations — before delivering RAW data to Lightroom or DxO PhotoLab.

## Check Your Understanding

1. **Pen & paper:** Starting from $f(x) = |x|$, describe and sketch the graph
   of $g(x) = -|x - 3| + 2$.
2. **Pen & paper:** The vertex of $y = x^2$ is at $(0,0)$.  What is the
   vertex of $y = 5(x + 4)^2 - 7$?
3. **Pen & paper:** A function $f$ passes through $(2, 5)$.  What point must
   $y = f(x - 1) + 3$ pass through?
