# Existence & Uniqueness of Solutions

## Intuition

Before you spend hours solving a differential equation, you should know: does
a solution even exist? And if it does, is it the *only* one? This is like
checking whether a search algorithm is guaranteed to terminate and whether it
returns a unique result. The **Picard-Lindelof theorem** gives precise
conditions that guarantee both.

## Prerequisites

- Tier 11, Lesson 3: First-Order Linear ODEs (solving techniques)
- Tier 3, Lesson 1: Limits (continuity of functions)
- Tier 3, Lesson 2: Derivatives (partial derivatives for the Lipschitz condition)

## From First Principles

### The Question

Given the initial value problem (IVP):

$$\frac{dy}{dt} = f(t, y), \quad y(t_0) = y_0$$

1. Does a solution exist? (Can we find *any* $y(t)$?)
2. Is the solution unique? (Is there *exactly one* $y(t)$?)

### The Picard-Lindelof Theorem (Intuitive Statement)

If $f(t, y)$ and $\partial f / \partial y$ are both **continuous** in some
rectangle around the point $(t_0, y_0)$, then there exists a **unique**
solution $y(t)$ in some interval around $t_0$.

More precisely: if $f$ is continuous and **Lipschitz continuous in $y$** — meaning
there exists a constant $L$ such that

$$|f(t, y_1) - f(t, y_2)| \leq L|y_1 - y_2|$$

for all $(t, y_1)$ and $(t, y_2)$ in the rectangle — then the IVP has exactly
one solution.

### What "Lipschitz in $y$" Means

The function $f$ does not change too rapidly as $y$ varies. A sufficient
(easier to check) condition: if $\partial f / \partial y$ exists and is
bounded in the rectangle, then $f$ is Lipschitz in $y$.

### When Existence Holds but Uniqueness Fails

**Classic example:** $dy/dt = 3y^{2/3}$, $y(0) = 0$.

Compute $\partial f / \partial y = 3 \cdot \frac{2}{3} y^{-1/3} = 2y^{-1/3}$.

At $y = 0$, this blows up — the Lipschitz condition fails.

Two solutions exist:

- $y(t) = 0$ (the trivial solution)
- $y(t) = t^3$ (check: $y' = 3t^2 = 3(t^3)^{2/3} = 3t^2$)

Both satisfy the IVP! The solution is **not unique**.

### When Solutions Blow Up (Finite-Time Escape)

Consider $dy/dt = y^2$, $y(0) = 1$.

This is separable:

$$\frac{dy}{y^2} = dt \implies -\frac{1}{y} = t + C$$

With $y(0) = 1$: $C = -1$, so $y = \frac{1}{1 - t}$.

The solution **blows up** at $t = 1$. It does not exist for $t \geq 1$.

The theorem guarantees existence only in some interval — not necessarily for
all time.

### Pen & Paper: Checking the Conditions

**Problem:** Does $dy/dt = t^2 + y^2$, $y(0) = 0$ have a unique solution
near $t = 0$?

Step 1 — Is $f(t, y) = t^2 + y^2$ continuous? Yes, it is a polynomial.

Step 2 — Compute $\partial f / \partial y = 2y$. Is this continuous? Yes.

Step 3 — In any bounded rectangle around $(0, 0)$, $|2y|$ is bounded, so $f$
is Lipschitz in $y$.

Conclusion: by Picard-Lindelof, a unique solution exists near $t = 0$.

(We cannot easily solve this ODE in closed form, but we *know* the solution
exists and is unique.)

### Geometric Meaning: Solution Curves Don't Cross

If $f$ satisfies the uniqueness condition, then **no two solution curves can
cross**. If they did cross at a point $(t_0, y_0)$, that point would be an
initial condition with two different solutions — contradicting uniqueness.

This is extremely useful: in a direction field, solution curves that satisfy
uniqueness are like non-intersecting lanes on a highway.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Left: unique solutions don't cross (dy/dt = -y)
ax = axes[0]
t = np.linspace(0, 4, 200)
for y0 in [-2, -1, 0, 1, 2, 3]:
    y = y0 * np.exp(-t)
    ax.plot(t, y, linewidth=1.5)
ax.set_title("Unique solutions: dy/dt = −y\n(curves never cross)")
ax.set_xlabel("t")
ax.set_ylabel("y")
ax.axhline(0, color="black", linewidth=0.5)

# Right: non-unique (dy/dt = 3*y^(2/3), y(0)=0)
ax = axes[1]
t = np.linspace(-1.5, 1.5, 200)
# Trivial solution
ax.plot(t, np.zeros_like(t), "b-", linewidth=2, label="y = 0")
# Non-trivial solution
y_pos = np.where(t >= 0, t**3, 0)
ax.plot(t, y_pos, "r--", linewidth=2, label="y = t³ (t ≥ 0)")
# Another non-trivial: y = 0 for t < a, then (t-a)^3
a = 0.5
y_delayed = np.where(t >= a, (t - a)**3, 0)
ax.plot(t, y_delayed, "g:", linewidth=2, label=f"y = (t−{a})³ (t ≥ {a})")
ax.set_title("Non-unique: dy/dt = 3y^{2/3}, y(0)=0\n(infinitely many solutions!)")
ax.set_xlabel("t")
ax.set_ylabel("y")
ax.legend(fontsize=8)

plt.tight_layout()
plt.show()
```

## Python Verification

```python
import numpy as np

# --- Example 1: non-uniqueness of dy/dt = 3*y^(2/3), y(0)=0 ---
print("=== Non-uniqueness: dy/dt = 3*y^(2/3), y(0) = 0 ===")
print("Solution 1: y(t) = 0")
t_test = [0, 0.5, 1.0, 2.0]
for t in t_test:
    y = 0
    dydt = 3 * abs(y)**(2/3)
    print(f"  t={t}: y={y}, dy/dt={dydt}, 3*y^(2/3)={dydt}")

print()
print("Solution 2: y(t) = t^3")
for t in t_test:
    y = t**3
    dydt_exact = 3 * t**2
    rhs = 3 * abs(y)**(2/3)
    print(f"  t={t}: y={y:.4f}, y'={dydt_exact:.4f}, 3*y^(2/3)={rhs:.4f}")

print()

# --- Example 2: blowup of dy/dt = y^2, y(0)=1 ---
print("=== Blowup: dy/dt = y^2, y(0) = 1 ===")
print("Solution: y = 1/(1-t)")
for t in [0, 0.5, 0.9, 0.99, 0.999]:
    y = 1 / (1 - t)
    print(f"  t={t:.3f}: y = {y:.4f}")
print("  t -> 1: y -> infinity (finite-time blowup)")

print()

# --- Example 3: Lipschitz check ---
print("=== Lipschitz check: f(t,y) = t^2 + y^2 ===")
print("df/dy = 2y")
# In rectangle |y| <= 1: |df/dy| <= 2, so L = 2
y_pairs = [(0.0, 0.5), (0.3, 0.8), (-0.5, 0.5)]
L = 2.0
t_val = 1.0  # arbitrary
for y1, y2 in y_pairs:
    f1 = t_val**2 + y1**2
    f2 = t_val**2 + y2**2
    diff_f = abs(f1 - f2)
    diff_y = abs(y1 - y2)
    ratio = diff_f / diff_y if diff_y > 0 else 0
    print(f"  y1={y1}, y2={y2}: |f(t,y1)-f(t,y2)|={diff_f:.4f}, "
          f"L*|y1-y2|={L*diff_y:.4f}, ratio={ratio:.4f} <= L={L}")
```

## Connection to CS / Games / AI

- **Numerical stability**: if uniqueness fails, a numerical solver can jump
  between branches unpredictably — understanding existence/uniqueness prevents
  debugging nightmares.
- **Finite-time blowup** in simulations (e.g., gravitational N-body when
  particles collide) requires special handling; the ODE ceases to have a
  solution.
- **Neural ODEs**: the network defines $f(t, y, \theta)$. Ensuring Lipschitz
  continuity in $y$ guarantees the forward pass has a unique solution —
  architectures like FFJORD enforce this by design.
- **Guaranteed convergence**: in control systems, proving that a robot's
  trajectory exists and is unique means the controller is well-posed.
- **Game physics**: if two rigid bodies reach the same state from different
  paths, uniqueness ensures deterministic replay.

## Check Your Understanding

1. Check whether $dy/dt = \sqrt{|y|}$, $y(0) = 0$ satisfies the conditions of
   the Picard-Lindelof theorem. Does a unique solution exist?

2. Find the blowup time for $dy/dt = y^2$, $y(0) = 5$. At what $t$ does the
   solution cease to exist?

3. Explain in your own words why solution curves cannot cross when the
   uniqueness condition is satisfied. What would crossing imply about the
   initial value problem at the crossing point?
