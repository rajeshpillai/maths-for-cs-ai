# Graph Reading Skills — Rate of Change, Intervals, and Concavity

## Intuition

Before you learn calculus, you need to read graphs fluently — the way a
driver reads a speedometer.  A distance-time graph tells you speed; a
speed-time graph tells you acceleration.  The skills in this lesson are
exactly what derivatives will formalise later: how fast is something changing,
is it speeding up or slowing down, and where does it change direction?

## Prerequisites

- Foundation 2, Lesson 2: Transformations of Functions

## From First Principles

### Average rate of change (the secant line)

Given a function $f$ on the interval $[a, b]$, the **average rate of change**
is:

$$\text{Average rate} = \frac{f(b) - f(a)}{b - a} = \frac{\Delta y}{\Delta x}$$

This is the **slope of the secant line** — the straight line through
$(a, f(a))$ and $(b, f(b))$.

**Pen & paper:** A car's position is $s(t) = t^2$ metres at time $t$ seconds.

Average speed from $t = 1$ to $t = 3$:

$$\frac{s(3) - s(1)}{3 - 1} = \frac{9 - 1}{2} = 4 \text{ m/s}$$

### Instantaneous rate of change (intuition)

What if we shrink the interval?

| Interval | $\Delta t$ | Average speed |
|----------|-----------|---------------|
| $[1, 3]$ | $2$ | $4.0$ m/s |
| $[1, 2]$ | $1$ | $3.0$ m/s |
| $[1, 1.5]$ | $0.5$ | $2.5$ m/s |
| $[1, 1.1]$ | $0.1$ | $2.1$ m/s |
| $[1, 1.01]$ | $0.01$ | $2.01$ m/s |

As $\Delta t \to 0$, the average speed approaches $2.0$ m/s — this is the
**instantaneous speed** at $t = 1$.  The secant line becomes a **tangent line**.

(We will formalise this as the **derivative** in Tier 3.)

### Increasing and decreasing intervals

Reading from a graph:

- $f$ is **increasing** on an interval if the graph goes uphill (left to right)
- $f$ is **decreasing** on an interval if the graph goes downhill
- $f$ is **constant** if the graph is flat

**Pen & paper:** For $f(x) = x^2 - 4x + 3 = (x-2)^2 - 1$:

- Vertex at $(2, -1)$
- Decreasing on $(-\infty, 2)$ (graph falls toward the vertex)
- Increasing on $(2, \infty)$ (graph rises after the vertex)

### Local maxima and minima

A **local maximum** is a point where the function changes from increasing to
decreasing (hilltop).  A **local minimum** is where it changes from decreasing
to increasing (valley).

For $f(x) = (x-2)^2 - 1$: local minimum at $(2, -1)$.

### Concavity — curving up or down

- **Concave up** (cup-shaped, $\cup$): the curve lies **above** its tangent
  lines; the rate of change is **increasing** (speeding up)
- **Concave down** (cap-shaped, $\cap$): the curve lies **below** its tangent
  lines; the rate of change is **decreasing** (slowing down)

**Pen & paper intuition:** For $s(t) = t^2$ (position):

- The slope (speed) increases as $t$ increases
- This means the object is **accelerating** — concave up

For $s(t) = \sqrt{t}$ (another position function):

- The slope (speed) decreases as $t$ increases
- This means the object is **decelerating** — concave down

### Inflection points

An **inflection point** is where concavity changes — the curve switches from
$\cup$ to $\cap$ or vice versa.

**Example:** $f(x) = x^3$ has an inflection point at $(0, 0)$.

- Concave down for $x < 0$
- Concave up for $x > 0$

### Reading a distance-time graph

| Graph feature | Physical meaning |
|---------------|-----------------|
| Straight line, positive slope | Constant speed |
| Curve bending upward (concave up) | Speeding up |
| Curve bending downward (concave down) | Slowing down |
| Horizontal line | Stationary |
| Steeper slope | Faster |

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# (a) Secant line approaching tangent
ax = axes[0, 0]
x = np.linspace(0, 4, 200)
f = x**2
ax.plot(x, f, 'k-', linewidth=2, label='$s(t) = t^2$')

# Secant from t=1 to t=3
ax.plot([1, 3], [1, 9], 'r-', linewidth=2, alpha=0.5,
        label='Secant [1,3]: slope=4')
# Secant from t=1 to t=2
ax.plot([1, 2], [1, 4], 'b-', linewidth=2, alpha=0.5,
        label='Secant [1,2]: slope=3')
# Tangent at t=1 (slope = 2)
t_line = np.linspace(0, 2.5, 100)
ax.plot(t_line, 2*t_line - 1, 'g--', linewidth=2,
        label='Tangent at t=1: slope=2')
ax.plot(1, 1, 'ko', markersize=8)
ax.set_title('Secant lines approaching the tangent')
ax.legend(fontsize=8)
ax.set_ylim(-1, 12)
ax.grid(True, alpha=0.3)

# (b) Increasing / decreasing
ax = axes[0, 1]
x = np.linspace(-1, 5, 200)
f = (x - 2)**2 - 1
ax.plot(x, f, 'k-', linewidth=2)
ax.fill_between(x[x < 2], f[x < 2], alpha=0.2, color='red',
                label='Decreasing')
ax.fill_between(x[x > 2], f[x > 2], alpha=0.2, color='green',
                label='Increasing')
ax.plot(2, -1, 'ro', markersize=10, zorder=5, label='Local min (2, -1)')
ax.set_title('Increasing and decreasing intervals')
ax.legend(fontsize=8)
ax.grid(True, alpha=0.3)

# (c) Concavity
ax = axes[1, 0]
x = np.linspace(-2, 2, 200)
f = x**3
ax.plot(x, f, 'k-', linewidth=2, label='$f(x) = x^3$')
ax.fill_between(x[x < 0], f[x < 0], alpha=0.2, color='orange',
                label='Concave down')
ax.fill_between(x[x > 0], f[x > 0], alpha=0.2, color='blue',
                label='Concave up')
ax.plot(0, 0, 'ro', markersize=8, label='Inflection point')
ax.set_title('Concavity and inflection point')
ax.legend(fontsize=8)
ax.grid(True, alpha=0.3)

# (d) Distance-time graph (real-world)
ax = axes[1, 1]
t = np.linspace(0, 10, 200)
# Piecewise: accelerate, constant speed, decelerate, stop
s = np.piecewise(t,
    [t <= 3, (t > 3) & (t <= 6), (t > 6) & (t <= 9), t > 9],
    [lambda t: 0.5*t**2,
     lambda t: 4.5 + 3*(t-3),
     lambda t: 13.5 + 3*(t-6) - 0.5*(t-6)**2,
     lambda t: 18.0])
ax.plot(t, s, 'k-', linewidth=2)
ax.axvspan(0, 3, alpha=0.1, color='green', label='Speeding up')
ax.axvspan(3, 6, alpha=0.1, color='blue', label='Constant speed')
ax.axvspan(6, 9, alpha=0.1, color='orange', label='Slowing down')
ax.axvspan(9, 10, alpha=0.1, color='red', label='Stopped')
ax.set_xlabel('Time (s)')
ax.set_ylabel('Distance (m)')
ax.set_title('Distance-time graph of a car journey')
ax.legend(fontsize=8)
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('graph_reading.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Graph Reading Skills ─────────────────────────────────────

# Average rate of change
print("=== Average rate of change: s(t) = t^2 ===")
s = lambda t: t**2

for a, b in [(1, 3), (1, 2), (1, 1.5), (1, 1.1), (1, 1.01), (1, 1.001)]:
    rate = (s(b) - s(a)) / (b - a)
    print(f"  [{a}, {b:>5.3f}]: avg rate = {rate:.4f}")
print("  As interval shrinks, rate -> 2.0 (instantaneous rate at t=1)")

# Increasing / decreasing detection
print(f"\n=== Increasing/decreasing: f(x) = (x-2)^2 - 1 ===")
f = lambda x: (x - 2)**2 - 1
# Sample points
for x in [0, 1, 1.5, 2, 2.5, 3, 4]:
    # Compare with a point slightly to the right
    dx = 0.001
    slope = (f(x + dx) - f(x)) / dx
    direction = "increasing" if slope > 0.01 else ("decreasing" if slope < -0.01 else "minimum")
    print(f"  x = {x}: f(x) = {f(x):>5.2f}, local slope ~ {slope:>6.3f} ({direction})")

# Concavity: check if rate of change is increasing or decreasing
print(f"\n=== Concavity: f(x) = x^3 ===")
f = lambda x: x**3
dx = 0.01
for x in [-2, -1, -0.5, 0, 0.5, 1, 2]:
    slope = (f(x + dx) - f(x)) / dx
    slope_prev = (f(x) - f(x - dx)) / dx
    accel = (slope - slope_prev) / dx
    concavity = "up" if accel > 0.1 else ("down" if accel < -0.1 else "inflection")
    print(f"  x = {x:+.1f}: slope ~ {slope:>7.3f}, "
          f"concavity: {concavity}")
```

## Connection to CS / Games / AI / Business / Industry

- **Loss curves** — during ML training you watch a loss-vs-epoch graph;
  reading its slope and concavity tells you if learning is progressing
- **Frame rate graphs** — game profilers plot frame time; a concave-up trend
  means performance is degrading faster and faster
- **Gradient** — the instantaneous rate of change IS the gradient, the core
  concept behind gradient descent
- **Animation easing** — concave-up curves give "ease in" (slow start, fast
  finish); concave-down gives "ease out"
- **Big-O intuition** — comparing growth rates of algorithms is exactly
  comparing how steeply their graphs rise

## Check Your Understanding

1. **Pen & paper:** For $f(x) = x^3 - 3x$, build a table at $x = -2, -1, 0, 1, 2$.
   Identify the intervals where $f$ is increasing and decreasing.
2. **Pen & paper:** A ball's height is $h(t) = 20t - 5t^2$ metres.  Find the
   average speed from $t = 1$ to $t = 3$.  Is the ball speeding up or slowing
   down at $t = 1$?  (Hint: check the concavity.)
3. **Pen & paper:** Sketch a distance-time graph for this journey: a runner
   accelerates for 5 seconds, runs at constant speed for 10 seconds, then
   decelerates to a stop over 5 seconds.  Label the concavity of each section.
