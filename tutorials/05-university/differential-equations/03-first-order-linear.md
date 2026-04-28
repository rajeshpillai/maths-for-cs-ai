# First-Order Linear ODEs & the Integrating Factor

## Intuition

Not every first-order ODE is separable. When $y$ and its derivative appear in
a sum rather than a product, you need a different trick. The **integrating
factor** is like finding the right multiplier that turns a messy equation into
a perfect derivative you can integrate directly. Think of it as finding the
right lens that brings a blurry equation into focus.

## Prerequisites

- Tier 11, Lesson 2: Separable Equations (the simpler technique you try first)
- Tier 3, Lesson 2: Derivatives — especially the product rule
- Tier 3, Lesson 6: Integrals

## From First Principles

### Standard Form

A first-order linear ODE has the form:

$$\frac{dy}{dx} + P(x)\,y = Q(x)$$

The unknown $y$ and its derivative $y'$ both appear to the **first power** and
are **not multiplied together**. $P(x)$ and $Q(x)$ are known functions of $x$.

### Why Separation Fails

Consider $dy/dx + 2y = 6$. Rewrite as $dy/dx = 6 - 2y$. You could separate
this particular one, but in general $dy/dx + P(x)y = Q(x)$ does not factor
into $g(x) \cdot h(y)$ when $P$ depends on $x$.

### The Integrating Factor — Derivation

We want to find a function $\mu(x)$ such that multiplying both sides of

$$y' + P(x)y = Q(x)$$

by $\mu$ turns the left side into the derivative of a product:

$$\mu y' + \mu P y = \frac{d}{dx}[\mu y]$$

Expand the right side using the product rule:

$$\frac{d}{dx}[\mu y] = \mu y' + \mu' y$$

Comparing: we need $\mu P = \mu'$, i.e.:

$$\frac{d\mu}{dx} = P(x)\,\mu$$

This is a separable equation for $\mu$!

$$\frac{d\mu}{\mu} = P(x)\,dx \implies \ln|\mu| = \int P(x)\,dx$$

$$\boxed{\mu(x) = e^{\int P(x)\,dx}}$$

### The Solving Procedure

1. Put the ODE in standard form: $y' + P(x)y = Q(x)$
2. Compute $\mu(x) = e^{\int P(x)\,dx}$
3. Multiply both sides by $\mu$: $\frac{d}{dx}[\mu y] = \mu Q$
4. Integrate both sides: $\mu y = \int \mu(x) Q(x)\,dx + C$
5. Divide by $\mu$: $y = \frac{1}{\mu}\left[\int \mu Q\,dx + C\right]$

### Worked Example: $dy/dx + 2y = 6$

Step 1 — Already in standard form. $P(x) = 2$, $Q(x) = 6$.

Step 2 — Integrating factor:

$$\mu = e^{\int 2\,dx} = e^{2x}$$

Step 3 — Multiply both sides by $e^{2x}$:

$$e^{2x} y' + 2e^{2x} y = 6e^{2x}$$

The left side is $\frac{d}{dx}[e^{2x} y]$:

$$\frac{d}{dx}[e^{2x} y] = 6e^{2x}$$

Step 4 — Integrate both sides:

$$e^{2x} y = \int 6e^{2x}\,dx = 6 \cdot \frac{e^{2x}}{2} + C = 3e^{2x} + C$$

Step 5 — Divide by $e^{2x}$:

$$y = 3 + Ce^{-2x}$$

**Check:** $y' = -2Ce^{-2x}$, $y' + 2y = -2Ce^{-2x} + 2(3 + Ce^{-2x}) = 6$. Correct.

### Behaviour: Transient + Steady State

The solution $y = 3 + Ce^{-2x}$ has two parts:

- **Steady state**: $y = 3$ (the equilibrium, where $y' = 0$)
- **Transient**: $Ce^{-2x}$ (decays to zero as $x \to \infty$)

No matter what the initial condition, the solution approaches $y = 3$.

### Worked Example: $dy/dx + \frac{y}{x} = x$, $x > 0$

Step 1 — Standard form: $P(x) = 1/x$, $Q(x) = x$.

Step 2 — Integrating factor:

$$\mu = e^{\int (1/x)\,dx} = e^{\ln x} = x$$

Step 3 — Multiply by $x$:

$$x\,y' + y = x^2 \implies \frac{d}{dx}[xy] = x^2$$

Step 4 — Integrate:

$$xy = \frac{x^3}{3} + C$$

Step 5 — Divide by $x$:

$$y = \frac{x^2}{3} + \frac{C}{x}$$

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

# dy/dx + 2y = 6  =>  y = 3 + C*exp(-2x)
x = np.linspace(0, 3, 300)
fig, ax = plt.subplots(figsize=(6, 4))

for C in [-4, -2, -1, 0, 1, 2, 4]:
    y = 3 + C * np.exp(-2 * x)
    ax.plot(x, y, label=f"C = {C}")

ax.axhline(3, color="red", linewidth=2, linestyle="--", label="Equilibrium y = 3")
ax.set_xlabel("x")
ax.set_ylabel("y")
ax.set_title("dy/dx + 2y = 6: all solutions approach y = 3")
ax.legend(fontsize=7, ncol=2)
ax.set_ylim(-2, 8)
plt.tight_layout()
plt.show()
```

## Python Verification

```python
import numpy as np

# --- Example 1: dy/dx + 2y = 6, y = 3 + C*exp(-2x) ---
print("=== Example 1: dy/dx + 2y = 6 ===")
C = 4.0  # initial condition y(0) = 3 + 4 = 7
x_test = np.array([0.0, 0.5, 1.0, 2.0, 5.0])

y = 3 + C * np.exp(-2 * x_test)
dy_dx = -2 * C * np.exp(-2 * x_test)
lhs = dy_dx + 2 * y

for i in range(len(x_test)):
    print(f"  x={x_test[i]:.1f}: y={y[i]:.6f}, y'+2y={lhs[i]:.6f} (should be 6)")

print()

# --- Example 2: dy/dx + y/x = x, y = x^2/3 + C/x ---
print("=== Example 2: dy/dx + y/x = x ===")
C = 1.0
x_test = np.array([0.5, 1.0, 2.0, 3.0])

y = x_test**2 / 3 + C / x_test
# dy/dx = 2x/3 - C/x^2
dy_dx = 2 * x_test / 3 - C / x_test**2
lhs = dy_dx + y / x_test

for i in range(len(x_test)):
    print(f"  x={x_test[i]:.1f}: y={y[i]:.6f}, y'+y/x={lhs[i]:.6f} (should be x={x_test[i]:.1f})")

print()

# --- Show convergence to steady state ---
print("=== Convergence to steady state y=3 ===")
x_long = np.arange(0, 6)
for C in [10, -5, 100]:
    y_val = 3 + C * np.exp(-2 * x_long.astype(float))
    print(f"  C={C:4d}: y = {np.array2string(y_val, precision=4)}")
```

## Connection to CS / Games / AI / Business / Industry

- **Exponential moving averages** in optimisers (Adam, RMSProp) are discrete
  analogues of $dy/dt + \alpha y = \alpha \cdot \text{signal}$ — a first-order
  linear ODE.
- **RC circuits** in hardware: $RC\,dV/dt + V = V_{\text{in}}$ is exactly this
  form; the integrating factor gives the capacitor's charging curve.
- **Cooling simulations** (Newton's law of cooling) reduce to a first-order
  linear ODE when ambient temperature varies with time.
- **PID controllers** in robotics: the proportional term creates a first-order
  linear response toward the setpoint.
- **Leaky integrator neurons** in computational neuroscience follow
  $\tau\,dV/dt + V = R\,I(t)$.

## Check Your Understanding

1. Solve $dy/dx - 3y = e^{2x}$ using the integrating factor method. Show
   every step on paper. What is the integrating factor?

2. Solve $dy/dx + y = \cos(x)$. Hint: you will need integration by parts
   (or recall $\int e^x \cos x\,dx$).

3. A tank initially contains 100 L of pure water. Brine with 2 g/L salt flows
   in at 5 L/min, and the well-mixed solution flows out at 5 L/min. Set up
   the ODE for the amount of salt $S(t)$ and solve it. What does $S(t)$
   approach as $t \to \infty$?
