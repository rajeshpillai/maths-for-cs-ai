# Differential Equations — Separable, First-Order, Second-Order

## Intuition

A differential equation relates a function to its derivatives.  "The rate of
change of a population is proportional to its size" → $dP/dt = kP$ → solution
is exponential growth.  DEs model everything: heat flow, population dynamics,
electrical circuits, neural network dynamics, and SHM.

## Prerequisites

- Tier 3, Lesson 2: Derivatives
- Tier 3, Lesson 6: Integrals

## From First Principles

### Separable equations

Can be written as $\frac{dy}{dx} = f(x) \cdot g(y)$.

**Method:** Separate and integrate: $\int \frac{1}{g(y)}\,dy = \int f(x)\,dx$

### Pen & paper: $\frac{dy}{dx} = 2xy$

$\frac{1}{y}\,dy = 2x\,dx$

$\int \frac{1}{y}\,dy = \int 2x\,dx$

$\ln|y| = x^2 + C$

$y = Ae^{x^2}$ where $A = e^C$

### Pen & paper: Exponential growth $\frac{dP}{dt} = kP$

$\frac{1}{P}\,dP = k\,dt$ → $\ln P = kt + C$ → $P = P_0 e^{kt}$

With $P_0 = 100, k = 0.05$: $P(10) = 100e^{0.5} \approx 165$

### First-order linear: $\frac{dy}{dx} + P(x)y = Q(x)$

**Integrating factor:** $\mu(x) = e^{\int P(x)\,dx}$

Multiply both sides by $\mu$: $\frac{d}{dx}[\mu y] = \mu Q$

### Pen & paper: $\frac{dy}{dx} + 2y = e^{-x}$

$\mu = e^{\int 2\,dx} = e^{2x}$

$\frac{d}{dx}[e^{2x} y] = e^{2x} \cdot e^{-x} = e^x$

$e^{2x}y = e^x + C$

$y = e^{-x} + Ce^{-2x}$

### Second-order: $a\ddot{y} + b\dot{y} + cy = 0$

**Auxiliary equation:** $am^2 + bm + c = 0$

| Roots | Solution |
|-------|----------|
| $m_1 \ne m_2$ (real) | $y = Ae^{m_1 x} + Be^{m_2 x}$ |
| $m_1 = m_2$ (repeated) | $y = (A + Bx)e^{mx}$ |
| $\alpha \pm \beta i$ (complex) | $y = e^{\alpha x}(A\cos\beta x + B\sin\beta x)$ |

### Pen & paper: $\ddot{y} + 5\dot{y} + 6y = 0$

Auxiliary: $m^2 + 5m + 6 = 0$ → $(m+2)(m+3) = 0$ → $m = -2, -3$

$y = Ae^{-2x} + Be^{-3x}$

### Pen & paper: SHM as a DE

$\ddot{x} + \omega^2 x = 0$

Auxiliary: $m^2 + \omega^2 = 0$ → $m = \pm i\omega$ (complex)

$x = A\cos\omega t + B\sin\omega t$ — exactly the SHM solution!

## Python Verification

```python
# ── Differential Equations ──────────────────────────────────
import math

# Exponential growth: dP/dt = kP
print("=== Exponential growth: P₀=100, k=0.05 ===")
P0, k = 100, 0.05
for t in [0, 5, 10, 20, 50]:
    P = P0 * math.exp(k * t)
    print(f"  t={t:2d}: P = {P:.1f}")

# Numerical solution using Euler's method
print(f"\n=== Euler method: dy/dx = 2xy, y(0)=1 ===")
x, y = 0.0, 1.0
dx = 0.01
for step in range(101):
    if step % 20 == 0:
        exact = math.exp(x**2)
        print(f"  x={x:.2f}: y_euler={y:.4f}, exact={exact:.4f}")
    y += 2 * x * y * dx
    x += dx

# Second order: y'' + 5y' + 6y = 0, y(0)=1, y'(0)=0
print(f"\n=== 2nd order: y'' + 5y' + 6y = 0 ===")
# Analytical: y = Ae^{-2x} + Be^{-3x}
# y(0) = A + B = 1, y'(0) = -2A - 3B = 0
# → A = 3, B = -2
A_val, B_val = 3, -2
for x_val in [0, 0.5, 1, 2, 5]:
    y_val = A_val * math.exp(-2*x_val) + B_val * math.exp(-3*x_val)
    print(f"  x={x_val}: y = {y_val:.4f}")

# Numerical: Euler for 2nd order (convert to system)
print(f"\n=== Euler: y'' + 5y' + 6y = 0 ===")
x, y_n, v = 0.0, 1.0, 0.0  # y(0)=1, y'(0)=0
dx = 0.01
for step in range(501):
    if step % 100 == 0:
        exact = 3*math.exp(-2*x) - 2*math.exp(-3*x)
        print(f"  x={x:.2f}: euler={y_n:.4f}, exact={exact:.4f}")
    a = -5*v - 6*y_n  # y'' = -5y' - 6y
    v += a * dx
    y_n += v * dx
    x += dx

# SHM: x'' + ω²x = 0
print(f"\n=== SHM: x'' + 100x = 0 (ω=10) ===")
omega = 10
x, v_shm = 0.1, 0  # A=0.1, start from max
dt = 0.001
for step in range(630):
    if step % 63 == 0:
        t = step * dt
        exact = 0.1 * math.cos(omega * t)
        print(f"  t={t:.3f}: euler={x:.5f}, exact={exact:.5f}")
    a = -omega**2 * x
    v_shm += a * dt
    x += v_shm * dt
```

## Visualisation — Solving an ODE numerically vs analytically

The plot compares the exact analytical solution of a first-order
linear ODE with two numerical integrators (forward Euler — the
simplest, and 4th-order Runge–Kutta — what scientific code actually
uses). Step-size matters: too big and Euler diverges; RK4 stays
accurate even at coarse resolution.

```python
# ── Visualising ODE integration accuracy ────────────────────
import numpy as np
import matplotlib.pyplot as plt

# ODE: dy/dt = -k·y    (exponential decay)
# Exact solution:  y(t) = y0 · exp(-k·t)
k, y0 = 1.5, 1.0
t_end = 5.0
exact = lambda t: y0 * np.exp(-k * t)

def euler(f, y0, t_end, h):
    ts = np.arange(0, t_end + h, h); ys = [y0]
    for t in ts[:-1]:
        ys.append(ys[-1] + h * f(ys[-1], t))
    return ts, np.array(ys)

def rk4(f, y0, t_end, h):
    ts = np.arange(0, t_end + h, h); ys = [y0]
    for t in ts[:-1]:
        y = ys[-1]
        k1 = f(y, t); k2 = f(y + h*k1/2, t + h/2)
        k3 = f(y + h*k2/2, t + h/2); k4 = f(y + h*k3, t + h)
        ys.append(y + h * (k1 + 2*k2 + 2*k3 + k4) / 6)
    return ts, np.array(ys)

f_decay = lambda y, t: -k * y

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# (1) Solutions at a coarse step h = 0.5: Euler is wildly off; RK4 nails it.
ax = axes[0]
t_dense = np.linspace(0, t_end, 400)
ax.plot(t_dense, exact(t_dense), color="black", lw=2, label="exact")
ts_e, ys_e = euler(f_decay, y0, t_end, 0.5)
ax.plot(ts_e, ys_e, "o-", color="tab:red", lw=1.5,
        label="Euler, h = 0.5 (diverges-ish)")
ts_r, ys_r = rk4(f_decay, y0, t_end, 0.5)
ax.plot(ts_r, ys_r, "s-", color="tab:green", lw=1.5,
        label="RK4, h = 0.5")
ax.set_xlabel("t"); ax.set_ylabel("y(t)")
ax.set_title("ODE solver accuracy at a coarse step\n(same h, vastly different errors)")
ax.legend(); ax.grid(True, alpha=0.3)

# (2) Error vs step size on log-log axes.  Slopes reveal the order
# of accuracy: Euler is O(h), RK4 is O(h⁴).
ax = axes[1]
hs = np.array([2, 1, 0.5, 0.25, 0.1, 0.05, 0.02, 0.01])
err_e, err_r = [], []
for h in hs:
    ts_e, ys_e = euler(f_decay, y0, t_end, h)
    ts_r, ys_r = rk4(f_decay, y0, t_end, h)
    err_e.append(abs(ys_e[-1] - exact(ts_e[-1])))
    err_r.append(abs(ys_r[-1] - exact(ts_r[-1])))
ax.loglog(hs, err_e, "o-", color="tab:red", lw=2, label="Euler error  (∝ h)")
ax.loglog(hs, err_r, "s-", color="tab:green", lw=2, label="RK4 error    (∝ h⁴)")
# Reference slopes.
ax.loglog(hs, hs * 0.5,        color="tab:red",   lw=0.8, linestyle="--", alpha=0.5)
ax.loglog(hs, (hs ** 4) * 0.05, color="tab:green", lw=0.8, linestyle="--", alpha=0.5)
ax.set_xlabel("step size h (log)"); ax.set_ylabel("|error at t = 5| (log)")
ax.set_title("Order of accuracy:\nEuler is O(h), RK4 is O(h⁴)")
ax.legend(); ax.grid(True, which="both", alpha=0.3)

plt.tight_layout()
plt.show()

# Print the error table.
print(f"{'h':>8}  {'Euler error':>14}  {'RK4 error':>14}")
print("-" * 42)
for h, e1, e2 in zip(hs, err_e, err_r):
    print(f"  {h:>6.3f}  {e1:>14.6e}  {e2:>14.6e}")
```

**Why every physics engine uses RK4 (or better), not Euler:**

- **Euler is $O(h)$.** Halve $h$, halve the error. To get 4 digits of
  precision, you need $h \approx 10^{-4}$ — sometimes thousands of
  tiny steps for a single second of simulation.
- **RK4 is $O(h^4)$.** Halve $h$, error drops 16×. Same 4 digits of
  precision come at $h \approx 0.1$ — orders of magnitude fewer
  evaluations.
- **The trade-off.** RK4 evaluates the derivative *four times per
  step* — so the cost-per-step is 4× Euler's. But the convergence
  speed-up wins overall, dramatically, for any non-trivial ODE.
- **Symplectic integrators** (Verlet, leapfrog) are what game
  physics engines actually use for Newtonian dynamics — they
  preserve energy over long timescales, which neither Euler nor RK4
  does cleanly. The same lesson applies though: the *order* of the
  integrator matters more than the size of any single step.

## Connection to CS / Games / AI / Business / Industry

- **Neural ODEs** — model continuous-depth networks as DEs (Chen et al., 2018)
- **Physics simulation** — every physics engine solves DEs (Euler, RK4, Verlet)
- **Population models** — logistic growth: $dP/dt = kP(1 - P/K)$ → sigmoid!
- **RC circuits** — $\tau dV/dt + V = V_0$ → exponential charging
- **Heat equation** — PDE for heat diffusion in games/simulations
- **Control systems** — PID controllers are described by DEs

## Check Your Understanding

1. **Pen & paper:** Solve $\frac{dy}{dx} = \frac{x}{y}$ with $y(0) = 2$.
2. **Pen & paper:** Solve $\frac{dy}{dx} + 3y = 6$ using an integrating factor.
3. **Pen & paper:** Solve $\ddot{y} - 4y = 0$.  What type of motion does this describe?
4. **Pen & paper:** Solve $\ddot{y} + 4\dot{y} + 4y = 0$ (repeated roots case).
