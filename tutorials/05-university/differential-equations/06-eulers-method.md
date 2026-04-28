# Euler's Method — Numerical Solution of ODEs

## Intuition

When you cannot solve a DE analytically (which is most of the time in
practice), you *approximate* the solution by taking tiny steps. Euler's method
is the simplest numerical integrator: at each point, follow the tangent line
for a small step $h$. It is exactly what a game engine does 60 times per
second to update positions from velocities.

## Prerequisites

- Tier 11, Lesson 4: Direction Fields (the tangent line at each point)
- Tier 3, Lesson 2: Derivatives (tangent line approximation)

## From First Principles

### The Idea

Given $dy/dt = f(t, y)$ with $y(t_0) = y_0$, we want $y$ at $t_0 + h$,
$t_0 + 2h$, $t_0 + 3h$, and so on.

The tangent line at $(t_0, y_0)$ has slope $f(t_0, y_0)$. Walk along it for a
step of size $h$:

$$y_1 = y_0 + h \cdot f(t_0, y_0)$$

$$t_1 = t_0 + h$$

Repeat:

$$\boxed{y_{n+1} = y_n + h \cdot f(t_n, y_n), \quad t_{n+1} = t_n + h}$$

This is **Euler's (forward) method**.

### Worked Example: $dy/dt = y$, $y(0) = 1$, $h = 0.5$

Exact solution: $y = e^t$.

Step 0: $t_0 = 0$, $y_0 = 1$

Step 1:
$$y_1 = 1 + 0.5 \cdot f(0, 1) = 1 + 0.5 \cdot 1 = 1.5$$
$t_1 = 0.5$. Exact: $e^{0.5} = 1.6487$.

Step 2:
$$y_2 = 1.5 + 0.5 \cdot f(0.5, 1.5) = 1.5 + 0.5 \cdot 1.5 = 2.25$$
$t_2 = 1.0$. Exact: $e^{1.0} = 2.7183$.

Step 3:
$$y_3 = 2.25 + 0.5 \cdot 2.25 = 3.375$$
$t_3 = 1.5$. Exact: $e^{1.5} = 4.4817$.

Step 4:
$$y_4 = 3.375 + 0.5 \cdot 3.375 = 5.0625$$
$t_4 = 2.0$. Exact: $e^{2.0} = 7.3891$.

The approximation falls behind because the tangent line underestimates a
convex (upward-curving) function.

### Error Analysis

**Local truncation error** (error in one step): $O(h^2)$.

From Taylor's theorem: $y(t + h) = y(t) + h y'(t) + \frac{h^2}{2}y''(t) + \cdots$

Euler keeps only the first two terms, so the error per step is $O(h^2)$.

**Global error** (accumulated over $N = (T - t_0)/h$ steps): $O(h)$.

$N$ steps each with $O(h^2)$ error: $N \cdot O(h^2) = \frac{T - t_0}{h} \cdot O(h^2) = O(h)$.

This means: **halving $h$ roughly halves the error** (at the cost of doubling
the work).

### Step Size Trade-off

| Small $h$ | Large $h$ |
|---|---|
| More accurate | Less accurate |
| More computation | Less computation |
| Potential floating-point accumulation | Fewer rounding errors |

In practice, adaptive methods (Runge-Kutta) are preferred, but Euler's method
teaches the core principle.

### Pen & Paper: $dy/dt = t - y$, $y(0) = 1$, $h = 0.25$, 4 steps

$f(t, y) = t - y$.

| $n$ | $t_n$ | $y_n$ | $f(t_n, y_n)$ | $y_{n+1} = y_n + 0.25 \cdot f$ |
|-----|--------|--------|----------------|-------------------------------|
| 0   | 0.00   | 1.000  | $0 - 1 = -1$  | $1 + 0.25(-1) = 0.750$       |
| 1   | 0.25   | 0.750  | $0.25 - 0.75 = -0.50$ | $0.75 + 0.25(-0.5) = 0.625$ |
| 2   | 0.50   | 0.625  | $0.50 - 0.625 = -0.125$ | $0.625 + 0.25(-0.125) = 0.594$ |
| 3   | 0.75   | 0.594  | $0.75 - 0.594 = 0.156$ | $0.594 + 0.25(0.156) = 0.633$ |

So $y(1.0) \approx 0.633$.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

def euler_method(f, t0, y0, h, n_steps):
    t = np.zeros(n_steps + 1)
    y = np.zeros(n_steps + 1)
    t[0], y[0] = t0, y0
    for i in range(n_steps):
        y[i+1] = y[i] + h * f(t[i], y[i])
        t[i+1] = t[i] + h
    return t, y

f = lambda t, y: y  # dy/dt = y
t_exact = np.linspace(0, 2, 200)
y_exact = np.exp(t_exact)

fig, ax = plt.subplots(figsize=(6, 4))
ax.plot(t_exact, y_exact, "k-", linewidth=2, label="Exact: y = e^t")

for h, color in [(0.5, "red"), (0.25, "blue"), (0.1, "green")]:
    n = int(2.0 / h)
    t_e, y_e = euler_method(f, 0, 1, h, n)
    ax.plot(t_e, y_e, f"{color[0]}o--", markersize=4, label=f"Euler h={h}")

ax.set_xlabel("t")
ax.set_ylabel("y")
ax.set_title("Euler's Method vs Exact Solution for dy/dt = y")
ax.legend()
plt.tight_layout()
plt.show()
```

## Python Verification

```python
import numpy as np

def euler(f, t0, y0, h, n_steps):
    """Forward Euler method."""
    t = t0
    y = y0
    results = [(t, y)]
    for _ in range(n_steps):
        y = y + h * f(t, y)
        t = t + h
        results.append((t, y))
    return results

# --- Example 1: dy/dt = y, y(0) = 1 ---
print("=== dy/dt = y, y(0)=1, exact: y = e^t ===")
f = lambda t, y: y

for h in [0.5, 0.25, 0.1, 0.01]:
    n = int(2.0 / h)
    results = euler(f, 0, 1, h, n)
    t_final, y_final = results[-1]
    exact = np.exp(2.0)
    error = abs(y_final - exact)
    print(f"  h={h:<6.3f}  y(2)={y_final:10.6f}  exact={exact:10.6f}  error={error:.6f}")

print()

# --- Example 2: dy/dt = t - y, y(0) = 1, h = 0.25 ---
print("=== dy/dt = t - y, y(0)=1, h=0.25 ===")
f2 = lambda t, y: t - y
results = euler(f2, 0, 1, 0.25, 4)
print(f"  {'n':<4} {'t':>6} {'y_euler':>10}")
for i, (t, y) in enumerate(results):
    print(f"  {i:<4} {t:6.2f} {y:10.4f}")

print()

# --- Error halving demonstration ---
print("=== Error roughly halves when h halves ===")
errors = []
h_values = [0.5, 0.25, 0.125, 0.0625]
for h in h_values:
    n = int(2.0 / h)
    results = euler(lambda t, y: y, 0, 1, h, n)
    error = abs(results[-1][1] - np.exp(2.0))
    errors.append(error)

for i, h in enumerate(h_values):
    ratio = errors[i-1] / errors[i] if i > 0 else float('nan')
    print(f"  h={h:.4f}: error={errors[i]:.6f}"
          + (f", ratio={ratio:.3f}" if i > 0 else ""))
```

## Connection to CS / Games / AI / Business / Industry

- **Game physics loops**: `position += velocity * dt` is literally Euler's
  method applied to $dx/dt = v$. Most games use the symplectic Euler or
  Verlet variants for better energy conservation.
- **Training neural ODEs**: the forward pass through a neural ODE uses a
  numerical solver; understanding Euler's method is step one.
- **Simulation time steps**: choosing $h$ (the frame rate, the simulation
  tick) is a direct application of the accuracy-vs-speed trade-off.
- **Particle systems**: each particle's position is updated with an Euler step
  from its velocity field.
- **Robotics**: motor controllers use discrete time steps; the update equation
  is Euler's method on the dynamics ODE.

## Check Your Understanding

1. Apply Euler's method by hand to $dy/dt = -2y$, $y(0) = 4$, with $h = 0.5$
   for 4 steps. Compare each step to the exact solution $y = 4e^{-2t}$.

2. For $dy/dt = y$, $y(0) = 1$, compute $y(1)$ using Euler with $h = 1$
   (1 step), $h = 0.5$ (2 steps), and $h = 0.25$ (4 steps). Verify that the
   global error is approximately proportional to $h$.

3. Why does Euler's method overshoot for $dy/dt = -10y$ with large $h$?
   Try $h = 0.25$ on paper and see what happens. What constraint on $h$
   prevents this instability?
