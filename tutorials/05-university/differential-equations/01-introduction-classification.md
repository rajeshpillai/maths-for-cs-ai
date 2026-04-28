# Introduction to Differential Equations & Classification

## Intuition

A differential equation is a recipe that tells you how something *changes*
rather than what it *is*. When a game engine says "acceleration equals force
divided by mass," that is a differential equation — it relates position to its
own rate of change. Every physics simulation, population model, and neural ODE
starts here.

## Prerequisites

- Tier 3, Lesson 2: Derivatives (you must know what $dy/dx$ means)
- Tier 3, Lesson 6: Integrals (solving a DE often means integrating)

## From First Principles

### What Is a Differential Equation?

An equation that contains an unknown function **and one or more of its
derivatives**.

Ordinary example (one independent variable $t$):

$$\frac{dy}{dt} = 3y$$

Partial example (two independent variables $x, t$):

$$\frac{\partial u}{\partial t} = k \frac{\partial^2 u}{\partial x^2}$$

The first is an **Ordinary Differential Equation (ODE)** — only ordinary
derivatives appear. The second is a **Partial Differential Equation (PDE)** —
partial derivatives appear. This tier focuses on ODEs.

### Order

The **order** of a DE is the highest derivative that appears.

| Equation | Highest derivative | Order |
|---|---|---|
| $dy/dx = 2x$ | first | 1 |
| $y'' + 3y' + 2y = 0$ | second | 2 |
| $y''' = y$ | third | 3 |

### Linearity

A DE is **linear** if the unknown function $y$ and all its derivatives appear
to the first power and are not multiplied together.

Linear: $y'' + 3y' + 2y = \sin(t)$

Nonlinear: $y'' + y^2 = 0$ (because $y^2$), or $y \cdot y' = 1$ (product of
$y$ and $y'$).

### Autonomous vs Non-Autonomous

An ODE is **autonomous** if the independent variable does not appear explicitly
on the right side.

Autonomous: $dy/dt = y(1 - y)$ (only $y$, no $t$)

Non-autonomous: $dy/dt = ty$ ($t$ appears explicitly)

Autonomous equations are important in stability analysis (Tier 11, Lesson 12)
because their behaviour does not depend on when you start the clock.

### A Solution — What Does It Mean?

A **solution** to a DE is a function $y(t)$ that, when substituted into the
equation, makes it true for all $t$ in some interval.

**Pen & paper example.** Verify that $y = e^{3t}$ solves $dy/dt = 3y$.

Step 1 — Compute the derivative:

$$\frac{dy}{dt} = \frac{d}{dt} e^{3t} = 3e^{3t}$$

Step 2 — Compute the right side:

$$3y = 3e^{3t}$$

Step 3 — Compare: both sides equal $3e^{3t}$. Verified.

### General vs Particular Solution

The **general solution** contains an arbitrary constant (or constants):

$$y = Ce^{3t} \quad (C \text{ any real number})$$

An **initial condition** like $y(0) = 5$ pins down $C$:

$$5 = Ce^{0} = C \implies C = 5$$

The **particular solution** is $y = 5e^{3t}$.

### Newton's Second Law as a DE

Force equals mass times acceleration:

$$F = ma = m\frac{d^2 x}{dt^2}$$

If a falling object has weight $mg$ and drag $-bv = -b\,dx/dt$:

$$m\frac{d^2 x}{dt^2} = mg - b\frac{dx}{dt}$$

This is a second-order, linear, non-autonomous ODE with constant coefficients.

### Population Growth (Malthus Model)

If a population $P$ grows at a rate proportional to its size:

$$\frac{dP}{dt} = kP$$

This is first-order, linear, autonomous. Solution: $P(t) = P_0 e^{kt}$.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

# Family of solution curves for dy/dt = 3y  =>  y = C * e^(3t)
t = np.linspace(0, 1.5, 200)
fig, ax = plt.subplots(figsize=(6, 4))

for C in [-2, -1, -0.5, 0.5, 1, 2]:
    y = C * np.exp(3 * t)
    ax.plot(t, y, label=f"C = {C}")

ax.set_xlabel("t")
ax.set_ylabel("y")
ax.set_title("Family of solutions: dy/dt = 3y  →  y = C·e^{3t}")
ax.set_ylim(-10, 10)
ax.axhline(0, color="black", linewidth=0.5)
ax.legend(fontsize=8)
plt.tight_layout()
plt.show()
```

## Python Verification

```python
import numpy as np

# Verify that y = C * e^(3t) solves dy/dt = 3y for several values of C
C_values = [0.5, 1, 2, -1]
t_test = np.array([0.0, 0.5, 1.0, 1.5])

for C in C_values:
    y = C * np.exp(3 * t_test)

    # Numerical derivative (central difference)
    dt = 1e-8
    y_plus = C * np.exp(3 * (t_test + dt))
    y_minus = C * np.exp(3 * (t_test - dt))
    dy_dt_numerical = (y_plus - y_minus) / (2 * dt)

    # Right-hand side: 3y
    rhs = 3 * y

    print(f"C = {C}")
    print(f"  dy/dt (numerical): {dy_dt_numerical}")
    print(f"  3y              : {rhs}")
    print(f"  Max error       : {np.max(np.abs(dy_dt_numerical - rhs)):.2e}")
    print()

# Particular solution with y(0) = 5
C = 5
t = 0.0
print(f"Particular solution check: y(0) = {C * np.exp(3 * t)} (should be 5)")
```

## Connection to CS / Games / AI / Business / Industry

- **Physics engines** (Unity, Unreal) solve Newton's second law — a
  second-order ODE — every frame to update object positions.
- **Population / epidemiological models** (SIR) are systems of first-order
  ODEs; these same ideas power agent-based simulations.
- **Neural ODEs** replace discrete layers with a continuous ODE
  $dh/dt = f(h, t, \theta)$, blurring the line between a ResNet and a
  differential equation.
- **Control systems** in robotics model motor response as second-order ODEs
  with damping and forcing.
- **Reinforcement learning** value functions satisfy the Bellman equation,
  which in continuous time becomes a differential equation (Hamilton-Jacobi).

## Check Your Understanding

1. Classify each DE by order, linearity, and whether it is autonomous:
   (a) $y' + y^2 = 0$
   (b) $y'' + 5y' + 6y = e^t$
   (c) $ty' = y + 1$

2. Verify by hand that $y = 2e^{-t}$ solves $dy/dt = -y$ with $y(0) = 2$.
   Show every step.

3. The equation $dP/dt = kP$ with $P(0) = 100$ and $k = 0.05$ models
   bacterial growth. Compute $P(10)$ on paper, then verify in Python.
