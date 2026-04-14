# Linear Functions — Slope, Intercept, and Line Equations

## Intuition

A linear function draws a straight line.  In games, if your character gains
a fixed amount of XP per quest, your total XP vs. quests-completed is a
straight line.  The **slope** is how steep the line is (XP per quest), and
the **y-intercept** is where you started (your XP before any quests).

## Prerequisites

- Foundation 1, Lesson 6: Function Notation (understanding $f(x)$, domain,
  range)

## From First Principles

### What makes a function "linear"?

A function $f(x) = mx + b$ is linear because its graph is a **straight line**.

- $m$ is the **slope** (also called gradient) — how much $y$ changes when
  $x$ increases by 1.
- $b$ is the **y-intercept** — where the line crosses the $y$-axis (the
  value of $f(0)$).

### Slope from two points

Given two points $(x_1, y_1)$ and $(x_2, y_2)$:

$$m = \frac{y_2 - y_1}{x_2 - x_1} = \frac{\Delta y}{\Delta x} = \frac{\text{rise}}{\text{run}}$$

**Worked example:** Find the slope through $(1, 3)$ and $(4, 9)$.

$$m = \frac{9 - 3}{4 - 1} = \frac{6}{3} = 2$$

The line rises 2 units for every 1 unit to the right.

---

### Slope-intercept form: $y = mx + b$

This is the most common form.  You can read off the slope and intercept
directly.

**Worked example:** Write the equation of the line with slope 3 passing
through $(0, -2)$.

Since it passes through $(0, -2)$, the $y$-intercept is $b = -2$.

$$y = 3x - 2$$

**Check:** at $x = 0$: $y = -2$ ✓.  At $x = 1$: $y = 1$ ✓ (rose by 3).

---

### Point-slope form: $y - y_1 = m(x - x_1)$

Use this when you know the slope $m$ and **one point** $(x_1, y_1)$ but the
point is not the $y$-intercept.

**Worked example:** Line with slope 2 through $(3, 7)$.

$$y - 7 = 2(x - 3)$$

Expand to get slope-intercept form:

$$y - 7 = 2x - 6$$

$$y = 2x + 1$$

**Check:** at $x = 3$: $y = 6 + 1 = 7$ ✓

---

### Finding the equation from two points

**Worked example:** Find the equation of the line through $(2, 5)$ and
$(6, 13)$.

**Step 1 — Slope:**

$$m = \frac{13 - 5}{6 - 2} = \frac{8}{4} = 2$$

**Step 2 — Use point-slope with $(2, 5)$:**

$$y - 5 = 2(x - 2)$$

$$y = 2x + 1$$

**Check at $(6, 13)$:** $2(6) + 1 = 13$ ✓

---

### Special slopes

| Slope    | Line looks like          | Example          |
|----------|--------------------------|------------------|
| $m > 0$  | rises left → right       | $y = 2x + 1$    |
| $m < 0$  | falls left → right       | $y = -x + 4$    |
| $m = 0$  | horizontal               | $y = 3$          |
| undefined | vertical                | $x = 5$          |

---

### Parallel and perpendicular lines

**Parallel lines** have the **same slope:**

$$y = 2x + 1 \quad \text{and} \quad y = 2x - 5 \quad \text{are parallel}$$

**Perpendicular lines** have slopes that are **negative reciprocals** — their
product is $-1$:

$$m_1 \times m_2 = -1$$

If one line has slope $\frac{3}{4}$, a perpendicular line has slope
$-\frac{4}{3}$.

**Why?**  A $90°$ rotation swaps rise and run and flips the sign.  If you go
"3 up, 4 right" on one line, the perpendicular goes "4 down, 3 right"
(or equivalently "4 up, 3 left").

**Worked example:** Find the equation of the line perpendicular to
$y = 3x + 2$ passing through $(6, 1)$.

**Step 1:** Original slope is 3.  Perpendicular slope: $m = -\frac{1}{3}$.

**Step 2:** Point-slope form:

$$y - 1 = -\frac{1}{3}(x - 6)$$

$$y = -\frac{1}{3}x + 2 + 1 = -\frac{1}{3}x + 3$$

**Check:** at $x = 6$: $y = -2 + 3 = 1$ ✓.  Slopes: $3 \times (-\frac{1}{3}) = -1$ ✓

---

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(7, 6))

x = np.linspace(-2, 8, 300)

# Line 1: y = 2x + 1  (positive slope)
ax.plot(x, 2*x + 1, "b-", lw=2, label=r"$y = 2x + 1$ (slope 2)")

# Line 2: y = -x + 8  (negative slope)
ax.plot(x, -x + 8, "r-", lw=2, label=r"$y = -x + 8$ (slope $-1$)")

# Line 3: y = 2x - 3  (parallel to line 1)
ax.plot(x, 2*x - 3, "b--", lw=2, label=r"$y = 2x - 3$ (parallel, slope 2)")

# Line 4: y = -0.5x + 4  (perpendicular to line 1)
ax.plot(x, -0.5*x + 4, "g-", lw=2,
        label=r"$y = -\frac{1}{2}x + 4$ (perpendicular, slope $-\frac{1}{2}$)")

# Horizontal line
ax.plot(x, np.full_like(x, 6), "m:", lw=2, label=r"$y = 6$ (slope 0)")

# Mark y-intercepts
for b, color in [(1, "blue"), (8, "red"), (-3, "blue"), (4, "green")]:
    if -2 <= b <= 10:
        ax.plot(0, b, "o", color=color, ms=7, zorder=5)

# Mark slope triangle for y = 2x + 1
ax.plot([1, 2], [3, 3], "k-", lw=1)        # run
ax.plot([2, 2], [3, 5], "k-", lw=1)        # rise
ax.text(1.5, 2.6, "run = 1", ha="center", fontsize=9)
ax.text(2.3, 4.0, "rise = 2", ha="left", fontsize=9)

ax.axhline(0, color="gray", lw=0.5)
ax.axvline(0, color="gray", lw=0.5)
ax.set_xlabel("$x$", fontsize=12)
ax.set_ylabel("$y$", fontsize=12)
ax.set_title("Linear functions: slope, parallel, and perpendicular", fontsize=13)
ax.legend(fontsize=9, loc="upper left")
ax.set_xlim(-2, 8)
ax.set_ylim(-4, 12)
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

## Python Verification

```python
# ── Linear functions: verify all worked examples ─────────────────

# Slope from two points: (1, 3) and (4, 9)
x1, y1 = 1, 3
x2, y2 = 4, 9
m = (y2 - y1) / (x2 - x1)
print(f"Slope through ({x1},{y1}) and ({x2},{y2}): m = {m}")

# Slope-intercept: y = 3x - 2
m1, b1 = 3, -2
print(f"\ny = {m1}x + ({b1})")
for x in [0, 1, 2]:
    print(f"  x = {x} → y = {m1*x + b1}")

# Point-slope: slope 2 through (3, 7) → y = 2x + 1
m2 = 2
# b = y1 - m*x1
b2 = 7 - 2*3  # = 1
print(f"\nPoint-slope: m=2, point (3,7) → y = {m2}x + {b2}")
print(f"  Check: at x=3, y = {m2*3 + b2}")

# Two-point: (2, 5) and (6, 13)
m3 = (13 - 5) / (6 - 2)
b3 = 5 - m3 * 2
print(f"\nTwo points (2,5) and (6,13): y = {m3:.0f}x + {b3:.0f}")
print(f"  Check at x=6: y = {m3*6 + b3:.0f}")

# Parallel: same slope
print(f"\nParallel check: y=2x+1 and y=2x-5 have slopes {2} and {2}")
print(f"  Same slope? {2 == 2}")

# Perpendicular: slopes multiply to -1
m_perp = -1/3
print(f"\nPerpendicular to slope 3: m = {m_perp:.4f}")
print(f"  Product: 3 * ({m_perp:.4f}) = {3 * m_perp:.1f}")

# Perpendicular line: y = -1/3 x + 3, check at x=6
print(f"\nPerpendicular line through (6,1): y = -1/3 x + 3")
print(f"  At x=6: y = {-1/3 * 6 + 3:.1f}")
```

## Connection to CS / Games / AI

- **Linear regression:** the most fundamental ML model fits a straight line
  $y = mx + b$ to data.  Training means finding the best $m$ and $b$ — the
  exact same quantities you learned here.
- **Frame-rate independence:** game physics uses `position = velocity * time +
  start_position`, which is $y = mx + b$ where slope is velocity.
- **Gradient descent:** the slope of a loss function tells the optimiser which
  direction to move.  "Gradient" literally means slope generalised to many
  dimensions.

## Check Your Understanding

1. Find the equation of the line through $(-1, 4)$ and $(3, -8)$ in
   slope-intercept form.
2. A line is parallel to $y = -2x + 7$ and passes through $(1, 3)$.  What
   is its equation?
3. Are the lines $y = \frac{4}{3}x + 1$ and $y = -\frac{3}{4}x + 5$
   perpendicular?  Prove it using the product-of-slopes test.
