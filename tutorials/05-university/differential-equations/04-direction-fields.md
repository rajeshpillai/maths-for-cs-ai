# Direction Fields & Qualitative Analysis

## Intuition

Imagine you are standing in a field where every point has a signpost showing
which direction to walk. If you follow the arrows from any starting point, you
trace out a path — that path is a solution curve. A **direction field** (slope
field) lets you visualise the behaviour of a DE *without solving it*. Game
developers use analogous vector fields for wind, water flow, and particle
effects.

## Prerequisites

- Tier 11, Lesson 1: Introduction & Classification (what $dy/dx = f(x, y)$ means)
- Tier 3, Lesson 2: Derivatives (slope as $dy/dx$)

## From First Principles

### The Core Idea

Given $dy/dx = f(x, y)$, at every point $(x, y)$ in the plane the equation
tells you the **slope** of any solution passing through that point. Draw a
short line segment with that slope at each grid point — the result is the
direction field.

### How to Draw One by Hand

Take $dy/dx = x - y$.

Pick grid points and compute $f(x, y) = x - y$:

| $(x, y)$ | $f = x - y$ | Slope description |
|-----------|-------------|-------------------|
| $(0, 0)$  | $0$         | horizontal        |
| $(1, 0)$  | $1$         | upward 45 deg     |
| $(0, 1)$  | $-1$        | downward 45 deg   |
| $(1, 1)$  | $0$         | horizontal        |
| $(2, 1)$  | $1$         | upward 45 deg     |
| $(1, 2)$  | $-1$        | downward 45 deg   |

At each point, draw a tiny dash with the computed slope.

### Isoclines

An **isocline** is a curve along which the slope is constant.

For $dy/dx = x - y$, the isocline where slope $= c$ is:

$$x - y = c \implies y = x - c$$

These are parallel lines with slope $1$. Along $y = x$ (where $c = 0$), all
dashes are horizontal. Along $y = x - 1$ (where $c = 1$), all dashes have
slope $1$.

Drawing isoclines first makes hand-drawing direction fields much faster.

### Nullclines

A special isocline: the **nullcline** is where $dy/dx = 0$ (slope is zero).
For $dy/dx = x - y$, the nullcline is $y = x$. Solution curves cross the
nullcline horizontally.

For systems of two equations, nullclines become even more important
(Tier 11, Lesson 11).

### Reading the Field

Even without solving, the direction field tells you:

1. **Where solutions increase** ($dy/dx > 0$): above or below the nullcline?
2. **Where solutions decrease** ($dy/dx < 0$)
3. **Equilibrium solutions**: horizontal lines or curves where $f = 0$ everywhere
4. **Long-term behaviour**: do solutions converge to something? Diverge?

For $dy/dx = x - y$: below the line $y = x$, slopes are positive (solutions
rise); above it, slopes are negative (solutions fall). Solutions are funnelled
toward $y = x + 1$ (the actual long-term behaviour).

### Worked Example: Autonomous Case $dy/dt = y(1 - y)$

This is the logistic equation. Equilibria: $y = 0$ and $y = 1$.

- For $0 < y < 1$: $dy/dt > 0$ (solutions rise toward $y = 1$)
- For $y > 1$: $dy/dt < 0$ (solutions fall toward $y = 1$)
- For $y < 0$: $dy/dt < 0$ (solutions fall away from $y = 0$)

The direction field shows $y = 1$ is **stable** and $y = 0$ is **unstable**.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

# Direction field for dy/dx = x - y
x = np.linspace(-3, 3, 20)
y = np.linspace(-3, 3, 20)
X, Y = np.meshgrid(x, y)

# Slope at each point
dY = X - Y
dX = np.ones_like(dY)

# Normalise arrows for uniform length
N = np.sqrt(dX**2 + dY**2)
dX_norm = dX / N
dY_norm = dY / N

fig, ax = plt.subplots(figsize=(6, 6))
ax.quiver(X, Y, dX_norm, dY_norm, N, cmap="coolwarm", alpha=0.7, scale=30)

# Overlay a few solution curves using Euler's method
from scipy.integrate import solve_ivp

for y0 in [-2, -1, 0, 1, 2, 3, 4]:
    sol = solve_ivp(lambda t, y: t - y, [-3, 3], [y0],
                    t_eval=np.linspace(-3, 3, 200), max_step=0.05)
    ax.plot(sol.t, sol.y[0], "k-", linewidth=0.8)

# Nullcline y = x
ax.plot([-3, 3], [-3, 3], "r--", linewidth=1.5, label="Nullcline y = x")

ax.set_xlabel("x")
ax.set_ylabel("y")
ax.set_title("Direction field: dy/dx = x − y")
ax.set_xlim(-3, 3)
ax.set_ylim(-3, 3)
ax.legend()
ax.set_aspect("equal")
plt.tight_layout()
plt.show()
```

## Python Verification

```python
import numpy as np

# --- Build a direction field table by hand, then verify ---
print("=== Direction field values for dy/dx = x - y ===")
print(f"{'(x,y)':<12} {'slope':>8}")
print("-" * 22)

grid_points = [(0,0), (1,0), (0,1), (1,1), (2,1), (1,2), (-1,0), (0,-1)]
for (x, y) in grid_points:
    slope = x - y
    print(f"({x:2d}, {y:2d})     {slope:8.2f}")

print()

# --- Isocline verification ---
print("=== Isoclines for dy/dx = x - y ===")
print("Isocline c=0 (nullcline): y = x")
for x in range(-2, 3):
    y = x  # on the nullcline
    slope = x - y
    print(f"  ({x}, {y}): slope = {slope} (should be 0)")

print()
print("Isocline c=1: y = x - 1")
for x in range(-2, 3):
    y = x - 1
    slope = x - y
    print(f"  ({x}, {y}): slope = {slope} (should be 1)")

print()

# --- Logistic equation: verify stability ---
print("=== Logistic dy/dt = y(1-y): sign of dy/dt ===")
y_vals = [-0.5, 0.0, 0.25, 0.5, 0.75, 1.0, 1.5]
for y in y_vals:
    dydt = y * (1 - y)
    direction = "increasing" if dydt > 0 else "decreasing" if dydt < 0 else "equilibrium"
    print(f"  y = {y:5.2f}: dy/dt = {dydt:6.3f}  ({direction})")
```

## Connection to CS / Games / AI / Business / Industry

- **Vector fields in games**: wind, water current, and magnetic fields are
  rendered as direction fields; particles follow the arrows just like solution
  curves.
- **Gradient fields in ML**: the loss landscape is a scalar field, and
  $-\nabla L$ is a direction field that gradient descent follows.
- **Fluid simulation**: velocity fields in Navier-Stokes are visualised
  exactly like direction fields.
- **Autonomous systems in RL**: the policy gradient defines a direction field
  in parameter space.
- **Qualitative analysis** saves computation: before running a costly
  simulation, sketch the direction field to predict whether solutions converge,
  diverge, or oscillate.
- **NOAA hurricane track forecasting** — the National Hurricane Center
  visualizes ensemble wind-vector fields ("spaghetti plots") that are
  literally direction fields of the atmospheric ODE/PDE system; landfall
  evacuation orders rely on them.
- **Algorithmic-trading regime maps** — quantitative funds (Two Sigma, AQR)
  draw phase-space direction fields of price/volatility ODE proxies to
  classify mean-reverting vs trending regimes for stat-arb books.
- **Tokamak plasma confinement at ITER** — magnetic field lines visualised
  via direction-field plots steer Bohm/neoclassical transport ODEs that
  forecast disruption events.
- **Drone wind-corridor planning at FAA UTM** — UAS traffic-management trials
  compute wind direction fields from HRRR weather data so corridor algorithms
  pick paths where solution curves stay inside geofence.

## Check Your Understanding

1. Draw the direction field for $dy/dx = -y$ on paper at the points
   $(x, y)$ for $x \in \{0, 1, 2\}$ and $y \in \{-2, -1, 0, 1, 2\}$.
   What do the solution curves look like?

2. Find the nullcline(s) of $dy/dx = x^2 - y$. Sketch the isocline for
   slope $= 1$ as well.

3. For the autonomous ODE $dy/dt = y^2 - 4$, find the equilibria and
   determine their stability by analysing the sign of $dy/dt$ on either side.
   No solving required — just qualitative analysis.
