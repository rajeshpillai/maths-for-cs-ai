# Second-Order Linear Homogeneous ODEs

## Intuition

A second-order ODE involves the second derivative — acceleration. When a
spring pulls a mass back toward rest, or a damper resists motion, the equation
$ay'' + by' + cy = 0$ describes the result. The three types of roots of its
characteristic equation correspond to three physical behaviours: overdamped
(slow return), underdamped (oscillation), and critically damped (fastest
non-oscillatory return). Every physics engine models this.

## Prerequisites

- Tier 11, Lesson 3: First-Order Linear ODEs (integrating factor gives the flavour)
- Tier 1, Lesson 6: Proof techniques (we assert linear combinations of solutions)
- Tier 2, Lesson 13: Eigenvalues (the characteristic equation is an eigenvalue problem in disguise)

## From First Principles

### The Equation

$$ay'' + by' + cy = 0 \quad (a \neq 0)$$

where $a, b, c$ are real constants and $y = y(t)$.

This is **homogeneous** because the right side is zero.

### The Guess: $y = e^{rt}$

Experience with first-order equations ($y' = ky \Rightarrow y = e^{kt}$)
suggests trying $y = e^{rt}$.

Substitute into $ay'' + by' + cy = 0$:

$$a r^2 e^{rt} + b r e^{rt} + c e^{rt} = 0$$

Factor out $e^{rt} \neq 0$:

$$\boxed{ar^2 + br + c = 0}$$

This is the **characteristic equation**. Its roots $r_1, r_2$ determine the
solution.

### Case 1: Two Distinct Real Roots ($b^2 - 4ac > 0$)

$$r_{1,2} = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

General solution:

$$y = C_1 e^{r_1 t} + C_2 e^{r_2 t}$$

**Worked example:** $y'' - 3y' + 2y = 0$.

Characteristic equation: $r^2 - 3r + 2 = 0$.

Factor: $(r - 1)(r - 2) = 0 \Rightarrow r_1 = 1, r_2 = 2$.

General solution: $y = C_1 e^{t} + C_2 e^{2t}$.

**Verify:** $y' = C_1 e^t + 2C_2 e^{2t}$, $y'' = C_1 e^t + 4C_2 e^{2t}$.

$y'' - 3y' + 2y = (C_1 e^t + 4C_2 e^{2t}) - 3(C_1 e^t + 2C_2 e^{2t}) + 2(C_1 e^t + C_2 e^{2t})$

$= C_1 e^t(1 - 3 + 2) + C_2 e^{2t}(4 - 6 + 2) = 0 + 0 = 0$. Correct.

### Case 2: Repeated Real Root ($b^2 - 4ac = 0$)

$$r = \frac{-b}{2a}$$

One root gives only one independent solution $e^{rt}$. We need a second. Try
$y = te^{rt}$:

$y' = e^{rt} + rte^{rt}$, $y'' = 2re^{rt} + r^2 te^{rt}$.

Substituting and using $b = -2ar$ and $c = ar^2$:

$a(2re^{rt} + r^2 te^{rt}) + b(e^{rt} + rte^{rt}) + c \cdot te^{rt}$

$= e^{rt}[2ar + b] + te^{rt}[ar^2 + br + c] = e^{rt}[2ar - 2ar] + 0 = 0$. Verified.

General solution:

$$y = (C_1 + C_2 t)e^{rt}$$

**Example:** $y'' + 4y' + 4 = 0$. Characteristic: $r^2 + 4r + 4 = (r+2)^2 = 0$. $r = -2$.

$y = (C_1 + C_2 t)e^{-2t}$.

### Case 3: Complex Conjugate Roots ($b^2 - 4ac < 0$)

$$r = \alpha \pm \beta i, \quad \alpha = \frac{-b}{2a}, \quad \beta = \frac{\sqrt{4ac - b^2}}{2a}$$

Using Euler's formula $e^{i\theta} = \cos\theta + i\sin\theta$:

$$y = e^{\alpha t}(C_1 \cos \beta t + C_2 \sin \beta t)$$

This gives **oscillation** (the $\cos$ and $\sin$) with exponential envelope
$e^{\alpha t}$:

- $\alpha < 0$: decaying oscillation (underdamped)
- $\alpha = 0$: pure oscillation (undamped, like a perfect spring)
- $\alpha > 0$: growing oscillation (unstable)

**Example:** $y'' + 2y' + 5y = 0$. Characteristic: $r^2 + 2r + 5 = 0$.

$r = \frac{-2 \pm \sqrt{4 - 20}}{2} = \frac{-2 \pm \sqrt{-16}}{2} = -1 \pm 2i$

$\alpha = -1$, $\beta = 2$.

$y = e^{-t}(C_1 \cos 2t + C_2 \sin 2t)$.

### Physical Interpretation (Damping)

For a spring-mass system $my'' + cy' + ky = 0$:

| Discriminant | Root type | Physical behaviour |
|---|---|---|
| $c^2 - 4mk > 0$ | Distinct real, both negative | Overdamped: slow return |
| $c^2 - 4mk = 0$ | Repeated real, negative | Critically damped: fastest non-oscillatory return |
| $c^2 - 4mk < 0$ | Complex conjugate | Underdamped: oscillation with decay |

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(0, 6, 500)
fig, axes = plt.subplots(1, 3, figsize=(14, 4))

# Case 1: Overdamped (distinct real roots r=-1, r=-4)
y_over = 2 * np.exp(-t) - np.exp(-4 * t)
axes[0].plot(t, y_over, "b-", linewidth=2)
axes[0].set_title("Overdamped\nr = -1, -4")
axes[0].axhline(0, color="gray", linewidth=0.5)

# Case 2: Critically damped (repeated root r=-2)
y_crit = (1 + 2 * t) * np.exp(-2 * t)
axes[1].plot(t, y_crit, "g-", linewidth=2)
axes[1].set_title("Critically damped\nr = -2 (repeated)")
axes[1].axhline(0, color="gray", linewidth=0.5)

# Case 3: Underdamped (complex roots -1 +/- 2i)
y_under = np.exp(-t) * (np.cos(2 * t) + 0.5 * np.sin(2 * t))
envelope = np.exp(-t) * np.sqrt(1 + 0.25)
axes[2].plot(t, y_under, "r-", linewidth=2)
axes[2].plot(t, envelope, "r--", linewidth=1, alpha=0.5, label="envelope")
axes[2].plot(t, -envelope, "r--", linewidth=1, alpha=0.5)
axes[2].set_title("Underdamped\nr = -1 ± 2i")
axes[2].axhline(0, color="gray", linewidth=0.5)
axes[2].legend(fontsize=8)

for ax in axes:
    ax.set_xlabel("t")
    ax.set_ylabel("y")

plt.tight_layout()
plt.show()
```

## Python Verification

```python
import numpy as np

# --- Case 1: y'' - 3y' + 2y = 0, r=1,2 ---
print("=== Case 1: distinct real roots (r=1, r=2) ===")
C1, C2 = 1.0, 1.0
t_test = np.array([0.0, 0.5, 1.0, 2.0])

y = C1 * np.exp(t_test) + C2 * np.exp(2 * t_test)
yp = C1 * np.exp(t_test) + 2 * C2 * np.exp(2 * t_test)
ypp = C1 * np.exp(t_test) + 4 * C2 * np.exp(2 * t_test)
residual = ypp - 3 * yp + 2 * y

for i in range(len(t_test)):
    print(f"  t={t_test[i]}: y''- 3y'+2y = {residual[i]:.10f}")

print()

# --- Case 2: y'' + 4y' + 4 = 0, r=-2 repeated ---
print("=== Case 2: repeated root (r=-2) ===")
C1, C2 = 1.0, 3.0
y = (C1 + C2 * t_test) * np.exp(-2 * t_test)
yp = (C2 - 2 * (C1 + C2 * t_test)) * np.exp(-2 * t_test)
ypp = (-2 * C2 - 2 * (C2 - 2 * (C1 + C2 * t_test))) * np.exp(-2 * t_test)
residual = ypp + 4 * yp + 4 * y

for i in range(len(t_test)):
    print(f"  t={t_test[i]}: y''+4y'+4y = {residual[i]:.10f}")

print()

# --- Case 3: y'' + 2y' + 5y = 0, r=-1+/-2i ---
print("=== Case 3: complex roots (r = -1 +/- 2i) ===")
C1, C2 = 1.0, 0.5
y = np.exp(-t_test) * (C1 * np.cos(2 * t_test) + C2 * np.sin(2 * t_test))

# Numerical second derivative
dt = 1e-6
def y_func(t):
    return np.exp(-t) * (C1 * np.cos(2*t) + C2 * np.sin(2*t))

yp_num = (y_func(t_test + dt) - y_func(t_test - dt)) / (2 * dt)
ypp_num = (y_func(t_test + dt) - 2 * y_func(t_test) + y_func(t_test - dt)) / dt**2
residual = ypp_num + 2 * yp_num + 5 * y

for i in range(len(t_test)):
    print(f"  t={t_test[i]}: y''+2y'+5y = {residual[i]:.8f}")
```

## Connection to CS / Games / AI / Business / Industry

- **Spring physics** in games (cloth simulation, soft bodies, camera follow)
  are all second-order ODEs with damping.
- **PID controllers** in robotics: the derivative (D) term adds damping to
  prevent oscillation — it changes the characteristic equation's roots.
- **RLC circuits** in hardware: $L\,d^2q/dt^2 + R\,dq/dt + q/C = 0$ is
  identical in form, so overdamped/underdamped analysis applies.
- **Animation easing functions**: critically damped motion gives the "smooth
  snap" feel used in UI transitions.
- **Audio synthesis**: underdamped oscillations produce decaying tones.

## Check Your Understanding

1. Solve $y'' + 5y' + 6y = 0$ by finding the characteristic roots. Identify
   the case (overdamped/underdamped/critically damped).

2. Solve $y'' + 6y' + 9y = 0$. What is special about the root? Write the
   general solution.

3. Solve $y'' + 4y = 0$ (no damping). What kind of motion does this describe?
   Find the particular solution with $y(0) = 3$, $y'(0) = 0$.
