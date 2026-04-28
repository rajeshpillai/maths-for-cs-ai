# Separable Equations

## Intuition

A separable equation is one where you can push all the $y$ stuff to one side
and all the $x$ (or $t$) stuff to the other, then integrate each side
independently. It is the simplest solving technique — like sorting laundry
into two piles before washing. Exponential growth, radioactive decay, and
logistic population models are all separable.

## Prerequisites

- Tier 11, Lesson 1: Introduction & Classification (what a DE is, order, solutions)
- Tier 3, Lesson 6: Integrals (you will integrate both sides)

## From First Principles

### The Idea

A first-order ODE is **separable** if it can be written as:

$$\frac{dy}{dx} = g(x) \cdot h(y)$$

The right side factors into a function of $x$ alone times a function of $y$
alone.

### The Technique

Step 1 — Rewrite with $dy$ and $dx$ on opposite sides (treat $dy/dx$ as a
ratio of differentials):

$$\frac{1}{h(y)}\,dy = g(x)\,dx$$

Step 2 — Integrate both sides:

$$\int \frac{1}{h(y)}\,dy = \int g(x)\,dx + C$$

Step 3 — Solve for $y$ if possible.

### Worked Example 1: $dy/dx = xy$

This is separable because $g(x) = x$ and $h(y) = y$.

Step 1 — Separate:

$$\frac{1}{y}\,dy = x\,dx$$

Step 2 — Integrate both sides:

$$\int \frac{1}{y}\,dy = \int x\,dx$$

$$\ln|y| = \frac{x^2}{2} + C$$

Step 3 — Solve for $y$:

$$|y| = e^{x^2/2 + C} = e^C \cdot e^{x^2/2}$$

Let $A = \pm e^C$ (absorbing the sign):

$$y = A\,e^{x^2/2}$$

**Check:** $dy/dx = A \cdot x \cdot e^{x^2/2} = x \cdot (A\,e^{x^2/2}) = xy$. Correct.

### Worked Example 2: Exponential Growth $dy/dt = ky$

Step 1 — Separate:

$$\frac{1}{y}\,dy = k\,dt$$

Step 2 — Integrate:

$$\ln|y| = kt + C$$

Step 3 — Exponentiate:

$$y = Ae^{kt}$$

With initial condition $y(0) = y_0$: $A = y_0$, so $y = y_0 e^{kt}$.

- $k > 0$: exponential growth (population, compound interest)
- $k < 0$: exponential decay (radioactive decay, cooling)

### Worked Example 3: $dy/dx = \frac{x^2}{1 + y^2}$

Step 1 — Separate:

$$(1 + y^2)\,dy = x^2\,dx$$

Step 2 — Integrate:

$$y + \frac{y^3}{3} = \frac{x^3}{3} + C$$

Step 3 — This is an implicit solution. We cannot solve for $y$ explicitly in
closed form, but the relation still defines solution curves.

### Common Pitfall: Dividing by Zero

When we write $\frac{1}{h(y)}\,dy$, we need $h(y) \neq 0$. If $h(y_0) = 0$
for some constant $y_0$, then $y(x) = y_0$ is a **constant (equilibrium)
solution** that must be checked separately.

For $dy/dx = xy$: $h(y) = y$, so $y = 0$ is an equilibrium solution.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

# Solution curves for dy/dx = xy  =>  y = A * exp(x^2 / 2)
x = np.linspace(-2, 2, 300)
fig, ax = plt.subplots(figsize=(6, 4))

for A in [-3, -2, -1, -0.5, 0.5, 1, 2, 3]:
    y = A * np.exp(x**2 / 2)
    ax.plot(x, y, label=f"A = {A}")

# Equilibrium solution
ax.axhline(0, color="black", linewidth=1.5, linestyle="--", label="y = 0 (equilibrium)")

ax.set_xlabel("x")
ax.set_ylabel("y")
ax.set_title("Separable ODE: dy/dx = xy  →  y = A·exp(x²/2)")
ax.set_ylim(-8, 8)
ax.legend(fontsize=7, ncol=2)
plt.tight_layout()
plt.show()
```

## Python Verification

```python
import numpy as np

# --- Example 1: dy/dx = xy, solution y = A * exp(x^2 / 2) ---
print("=== Example 1: dy/dx = xy ===")
A = 2.0
x_test = np.array([0.0, 0.5, 1.0, 1.5])
y = A * np.exp(x_test**2 / 2)

# Numerical derivative
dx = 1e-8
y_plus = A * np.exp((x_test + dx)**2 / 2)
dy_dx_num = (y_plus - y) / dx

# RHS: x * y
rhs = x_test * y

for i in range(len(x_test)):
    print(f"  x={x_test[i]:.1f}: dy/dx={dy_dx_num[i]:.6f}, xy={rhs[i]:.6f}")

print()

# --- Example 2: dy/dt = 0.5*y, y(0)=100 ---
print("=== Example 2: exponential growth k=0.5, y0=100 ===")
k = 0.5
y0 = 100.0
t_values = [0, 1, 2, 5, 10]

for t in t_values:
    y_exact = y0 * np.exp(k * t)
    print(f"  t={t:2d}: y = {y_exact:.4f}")

print()

# --- Example 3: implicit solution y + y^3/3 = x^3/3 + C ---
print("=== Example 3: dy/dx = x^2/(1+y^2), implicit check ===")
# Pick a point on the curve: let C=0, x=1
# Then y + y^3/3 = 1/3
# Try y ≈ 0.3129 (Newton's method in your head: small y => y ≈ 1/3)
from scipy.optimize import fsolve

def implicit_eq(y, x, C):
    return y + y**3 / 3 - x**3 / 3 - C

C = 0
x_val = 1.0
y_val = fsolve(implicit_eq, 0.3, args=(x_val, C))[0]
print(f"  At x={x_val}, C={C}: y = {y_val:.6f}")
print(f"  Check: y + y^3/3 = {y_val + y_val**3/3:.6f}")
print(f"  Check: x^3/3 + C = {x_val**3/3 + C:.6f}")
```

## Connection to CS / Games / AI / Business / Industry

- **Exponential decay** ($k < 0$) models the half-life of cached data, memory
  decay in recurrent networks, and learning rate schedules that decay
  exponentially.
- **Logistic growth** $dP/dt = rP(1 - P/K)$ is separable and models adoption
  curves, sigmoid activations, and population caps in simulations.
- **Radioactive decay chains** in game physics use separable equations to
  compute particle lifetimes.
- **Cooling models** (Newton's law of cooling, $dT/dt = -k(T - T_{\text{env}})$)
  are separable and appear in thermal simulation for hardware design.
- **Compound interest** in game economies: $dM/dt = rM$ gives $M = M_0 e^{rt}$.
- **Carbon-14 dating at archaeological labs** — Oxford Radiocarbon Accelerator
  Unit and Beta Analytic use the separable ODE $dN/dt = -\lambda N$ (with
  $\lambda = \ln 2 / 5730$ yr) to date organic samples for museum acquisitions.
- **Insurance reserve growth** — Solvency II regulation requires EU insurers
  (AXA, Allianz) to project technical-provision reserves with $dR/dt = rR$
  under a EIOPA-published risk-free curve.
- **Newton's law of cooling in food safety** — FDA Food Code uses $dT/dt =
  -k(T - T_{env})$ to set the "two-hour rule" for restaurant cold-chain
  compliance and to size walk-in coolers at chains like Chipotle.
- **Tracer-dilution cardiac output** — clinicians at Mayo Clinic apply the
  separable washout equation $dC/dt = -kC$ to indocyanine-green concentration
  curves to measure heart output during surgery.

## Check Your Understanding

1. Solve $dy/dx = y/x$ by separation of variables. Find the general solution.
   Then find the particular solution with $y(1) = 4$. Pen & paper first.

2. Solve $dy/dt = -2ty$ with $y(0) = 3$. What kind of curve is $y(t)$?
   (Hint: the exponent involves $t^2$.)

3. The equation $dy/dx = (1 + y^2)$ is separable. Solve it. What is the
   solution called? Does it exist for all $x$? (Hint: $\int 1/(1+y^2)\,dy$.)
