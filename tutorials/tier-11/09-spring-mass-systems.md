# Spring-Mass Systems & Harmonic Motion

## Intuition

Every time a game character lands on a bouncy platform, a car's suspension
absorbs a bump, or a microphone diaphragm vibrates, you are watching a
spring-mass system. The equation $mx'' + cx' + kx = F(t)$ unifies all of
these. Understanding it means understanding oscillation, damping, and
resonance — the physics behind audio, animation, and structural simulation.

## Prerequisites

- Tier 11, Lesson 8: Second-Order Nonhomogeneous ODEs (solving with forcing terms)
- Tier 11, Lesson 7: Second-Order Homogeneous ODEs (characteristic equation, three cases)

## From First Principles

### Setting Up the Equation

A mass $m$ on a spring with stiffness $k$ and damping coefficient $c$,
driven by external force $F(t)$:

- **Spring force** (Hooke's law): $-kx$ (restoring, proportional to displacement)
- **Damping force**: $-cx'$ (opposes velocity, like friction)
- **External force**: $F(t)$

Newton's second law:

$$mx'' = -kx - cx' + F(t)$$

$$\boxed{mx'' + cx' + kx = F(t)}$$

### Case 1: Free Undamped Motion ($c = 0$, $F = 0$)

$$mx'' + kx = 0 \implies x'' + \omega_0^2 x = 0$$

where $\omega_0 = \sqrt{k/m}$ is the **natural frequency**.

Characteristic equation: $r^2 + \omega_0^2 = 0 \Rightarrow r = \pm i\omega_0$.

Solution:

$$x(t) = A\cos(\omega_0 t) + B\sin(\omega_0 t)$$

Or equivalently: $x(t) = R\cos(\omega_0 t - \phi)$ where $R = \sqrt{A^2 + B^2}$
is the **amplitude** and $\phi = \arctan(B/A)$ is the **phase**.

**Pen & paper:** $m = 1$, $k = 9$, $x(0) = 2$, $x'(0) = 0$.

$\omega_0 = 3$. Solution: $x = A\cos 3t + B\sin 3t$.

$x(0) = A = 2$. $x'(0) = 3B = 0 \Rightarrow B = 0$.

$x(t) = 2\cos 3t$. Period $T = 2\pi/\omega_0 = 2\pi/3 \approx 2.09$.

### Case 2: Free Damped Motion ($c > 0$, $F = 0$)

$$mx'' + cx' + kx = 0$$

Characteristic equation: $mr^2 + cr + k = 0$.

Discriminant: $\Delta = c^2 - 4mk$.

Define the **damping ratio**: $\zeta = c / (2\sqrt{mk})$.

| Condition | $\zeta$ | Behaviour |
|---|---|---|
| $\Delta > 0$ | $\zeta > 1$ | **Overdamped**: slow exponential return |
| $\Delta = 0$ | $\zeta = 1$ | **Critically damped**: fastest non-oscillatory return |
| $\Delta < 0$ | $\zeta < 1$ | **Underdamped**: decaying oscillation |

**Underdamped solution** ($\zeta < 1$):

$$x(t) = e^{-\zeta \omega_0 t}\left(A\cos(\omega_d t) + B\sin(\omega_d t)\right)$$

where $\omega_d = \omega_0\sqrt{1 - \zeta^2}$ is the **damped frequency**.

### Case 3: Forced Motion & Resonance ($F(t) = F_0 \cos(\omega t)$)

$$mx'' + cx' + kx = F_0 \cos(\omega t)$$

The steady-state particular solution has the form:

$$x_p(t) = X\cos(\omega t - \delta)$$

where the amplitude is:

$$X = \frac{F_0/m}{\sqrt{(\omega_0^2 - \omega^2)^2 + (2\zeta\omega_0\omega)^2}}$$

**Resonance** occurs when $\omega \approx \omega_0$ (driving frequency near
natural frequency). If $\zeta$ is small, $X$ becomes very large.

When $c = 0$ and $\omega = \omega_0$ exactly, the amplitude grows without
bound (pure resonance) — this is why soldiers break step on bridges.

### Pen & Paper: Underdamped Example

$m = 1$, $c = 2$, $k = 5$, $x(0) = 1$, $x'(0) = 0$.

$\omega_0 = \sqrt{5}$, $\zeta = 2/(2\sqrt{5}) = 1/\sqrt{5} \approx 0.447$.

$\omega_d = \sqrt{5}\sqrt{1 - 1/5} = \sqrt{5} \cdot 2/\sqrt{5} = 2$.

Characteristic roots: $r = -1 \pm 2i$.

$x(t) = e^{-t}(A\cos 2t + B\sin 2t)$.

$x(0) = A = 1$. $x'(0) = -A + 2B = 0 \Rightarrow B = 1/2$.

$$x(t) = e^{-t}\left(\cos 2t + \frac{1}{2}\sin 2t\right)$$

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(0, 10, 1000)
fig, axes = plt.subplots(2, 2, figsize=(10, 8))

# (a) Undamped: x = 2*cos(3t)
ax = axes[0, 0]
ax.plot(t, 2 * np.cos(3 * t), "b-", linewidth=1.5)
ax.set_title("Undamped: x = 2cos(3t)")
ax.set_ylabel("x(t)")

# (b) Underdamped: zeta=0.447
ax = axes[0, 1]
x_ud = np.exp(-t) * (np.cos(2*t) + 0.5*np.sin(2*t))
env = np.exp(-t) * np.sqrt(1 + 0.25)
ax.plot(t, x_ud, "r-", linewidth=1.5)
ax.plot(t, env, "r--", alpha=0.5, linewidth=1)
ax.plot(t, -env, "r--", alpha=0.5, linewidth=1)
ax.set_title("Underdamped (zeta=0.45)")

# (c) Overdamped and critically damped comparison
ax = axes[1, 0]
# Critically damped: r=-3 (repeated), m=1,c=6,k=9
x_crit = (1 + 3*t) * np.exp(-3*t)
# Overdamped: r=-1,-9, m=1,c=10,k=9
x_over = (9*np.exp(-t) - np.exp(-9*t)) / 8
ax.plot(t, x_crit, "g-", linewidth=2, label="Critical (zeta=1)")
ax.plot(t, x_over, "m-", linewidth=2, label="Overdamped (zeta>1)")
ax.set_title("Critical vs Overdamped")
ax.set_ylabel("x(t)")
ax.set_xlabel("t")
ax.legend(fontsize=8)

# (d) Resonance: amplitude vs driving frequency
ax = axes[1, 1]
omega = np.linspace(0.1, 5, 500)
omega0 = 3.0
F0_m = 1.0
for zeta in [0.05, 0.1, 0.3, 0.7]:
    X = F0_m / np.sqrt((omega0**2 - omega**2)**2 + (2*zeta*omega0*omega)**2)
    ax.plot(omega, X, label=f"zeta={zeta}")
ax.axvline(omega0, color="gray", linestyle="--", alpha=0.5, label=f"omega_0={omega0}")
ax.set_title("Resonance curves")
ax.set_xlabel("Driving frequency omega")
ax.set_ylabel("Amplitude X")
ax.legend(fontsize=7)

plt.tight_layout()
plt.show()
```

## Python Verification

```python
import numpy as np
from scipy.integrate import solve_ivp

# --- Underdamped spring: m=1, c=2, k=5, x(0)=1, x'(0)=0 ---
print("=== Underdamped: m=1, c=2, k=5 ===")
m, c, k = 1, 2, 5
omega0 = np.sqrt(k / m)
zeta = c / (2 * np.sqrt(m * k))
omega_d = omega0 * np.sqrt(1 - zeta**2)
print(f"  omega_0 = {omega0:.4f}")
print(f"  zeta    = {zeta:.4f}")
print(f"  omega_d = {omega_d:.4f}")

# Exact solution
def x_exact(t):
    return np.exp(-t) * (np.cos(2*t) + 0.5*np.sin(2*t))

# Numerical solution via solve_ivp
def spring_ode(t, y):
    # y[0] = x, y[1] = x'
    return [y[1], (-c*y[1] - k*y[0]) / m]

sol = solve_ivp(spring_ode, [0, 10], [1, 0], t_eval=np.linspace(0, 10, 50))

print("\n  t      x_exact    x_numerical   error")
for i in range(0, len(sol.t), 5):
    t = sol.t[i]
    xe = x_exact(t)
    xn = sol.y[0][i]
    print(f"  {t:5.2f}  {xe:10.6f}  {xn:10.6f}  {abs(xe-xn):.2e}")

print()

# --- Resonance amplitude ---
print("=== Resonance: peak amplitude vs zeta ===")
omega0 = 3.0
for zeta in [0.05, 0.1, 0.3, 0.7, 1.0]:
    # Peak at omega = omega0*sqrt(1 - 2*zeta^2) for zeta < 1/sqrt(2)
    if zeta < 1/np.sqrt(2):
        omega_peak = omega0 * np.sqrt(1 - 2*zeta**2)
        X_peak = 1 / (2*zeta*omega0**2 * np.sqrt(1 - zeta**2))
        print(f"  zeta={zeta:.2f}: peak at omega={omega_peak:.3f}, amplitude={X_peak:.4f}")
    else:
        print(f"  zeta={zeta:.2f}: no resonance peak (zeta >= 1/sqrt(2))")
```

## Connection to CS / Games / AI

- **Game camera systems**: a critically damped spring ($\zeta = 1$) following
  the player gives smooth, responsive camera motion without oscillation.
- **Soft-body physics**: cloth, jelly, and hair simulations are meshes of
  spring-mass-damper elements.
- **Audio synthesis**: a plucked string is an underdamped oscillator; the
  frequency and decay rate come directly from $\omega_d$ and $\zeta$.
- **Suspension models** in racing games: each wheel has a spring-damper ODE
  connecting it to the chassis.
- **Resonance detection**: in structural engineering simulations, engineers
  must ensure buildings do not resonate at earthquake frequencies.

## Check Your Understanding

1. A mass of 2 kg on a spring with $k = 8$ N/m and no damping is released
   from $x = 0.5$ m at rest. Find $\omega_0$, the period, and write $x(t)$.
   Pen & paper first.

2. With $m = 1$, $k = 4$, $c = 4$ (critically damped), $x(0) = 3$,
   $x'(0) = 2$: solve for $x(t)$ and determine the maximum displacement.

3. A machine vibrates at 10 Hz and sits on a mount with natural frequency
   10 Hz and $\zeta = 0.1$. By what factor is the vibration amplitude
   amplified? What happens if $\zeta$ is increased to 0.5?
