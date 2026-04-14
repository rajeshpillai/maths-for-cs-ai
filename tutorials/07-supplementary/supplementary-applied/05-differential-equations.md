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

## Connection to CS / Games / AI

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
