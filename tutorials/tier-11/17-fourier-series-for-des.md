# Fourier Series Methods for Differential Equations

## Intuition

Many real-world forces are periodic but not sinusoidal — think of a square wave
driving a speaker cone or a PWM signal controlling a motor. Fourier series lets
you decompose that messy periodic forcing into a sum of clean sine/cosine terms,
then solve the ODE for each term separately and add the results. This is the
principle of **superposition** meeting Fourier analysis.

## Prerequisites

- Tier 9, Lesson 2: Fourier Series (decomposing periodic functions)
- Tier 11, Lesson 8: Second-Order Non-Homogeneous ODEs (particular solutions)
- Tier 11, Lesson 7: Second-Order Homogeneous ODEs

## From First Principles

### Setup

Consider a linear ODE with periodic forcing:

$$y'' + \omega_0^2 y = f(t)$$

where $f(t)$ is periodic with period $T$. Expand $f(t)$ in a Fourier series:

$$f(t) = \frac{a_0}{2} + \sum_{n=1}^{\infty}\left[a_n \cos\frac{2\pi n t}{T} + b_n \sin\frac{2\pi n t}{T}\right]$$

### Solve Term by Term

By linearity, solve $y'' + \omega_0^2 y = \cos(\omega_n t)$ for each
$\omega_n = 2\pi n / T$.

The particular solution for a single cosine forcing (when $\omega_n \neq \omega_0$):

$$y_n^{(p)}(t) = \frac{\cos(\omega_n t)}{\omega_0^2 - \omega_n^2}$$

Similarly for sine forcing:

$$\tilde{y}_n^{(p)}(t) = \frac{\sin(\omega_n t)}{\omega_0^2 - \omega_n^2}$$

### Total Particular Solution

$$y_p(t) = \frac{a_0}{2\omega_0^2} + \sum_{n=1}^{\infty}\frac{a_n\cos(\omega_n t) + b_n\sin(\omega_n t)}{\omega_0^2 - \omega_n^2}$$

**Resonance** occurs when $\omega_n = \omega_0$ for some $n$: the denominator
vanishes and the amplitude grows without bound (in the undamped model).

### Pen & Paper: Square Wave Forcing

The Fourier series of a square wave with amplitude 1 and period $2\pi$:

$$f(t) = \frac{4}{\pi}\sum_{k=0}^{\infty}\frac{\sin((2k+1)t)}{2k+1} = \frac{4}{\pi}\left[\sin t + \frac{\sin 3t}{3} + \frac{\sin 5t}{5} + \ldots\right]$$

For $y'' + 4y = f(t)$ (so $\omega_0^2 = 4$):

The particular solution for the $n$-th odd harmonic ($\omega_n = 2k+1$):

$$y_k(t) = \frac{4}{\pi(2k+1)} \cdot \frac{\sin((2k+1)t)}{4 - (2k+1)^2}$$

First few terms:

- $k=0$: $\frac{4}{\pi} \cdot \frac{\sin t}{4 - 1} = \frac{4}{3\pi}\sin t$
- $k=1$: $\frac{4}{3\pi} \cdot \frac{\sin 3t}{4 - 9} = -\frac{4}{15\pi}\sin 3t$
- $k=2$: $\frac{4}{5\pi} \cdot \frac{\sin 5t}{4 - 25} = -\frac{4}{105\pi}\sin 5t$

### Visualisation

Plot the square wave forcing and the resulting steady-state response.

```python
import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(0, 4 * np.pi, 1000)

# Square wave via Fourier series (20 terms)
N_terms = 20
f_square = np.zeros_like(t)
for k in range(N_terms):
    n = 2 * k + 1
    f_square += (4 / (np.pi * n)) * np.sin(n * t)

# Particular solution y'' + 4y = f(t)
omega0_sq = 4
y_response = np.zeros_like(t)
for k in range(N_terms):
    n = 2 * k + 1
    denom = omega0_sq - n**2
    if abs(denom) < 1e-10:  # skip resonance
        continue
    y_response += (4 / (np.pi * n)) * np.sin(n * t) / denom

fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 6), sharex=True)

ax1.plot(t, f_square, 'b-', linewidth=1.5)
ax1.set_ylabel('f(t)')
ax1.set_title('Square Wave Forcing (Fourier Series, 20 terms)')
ax1.grid(True, alpha=0.3)

ax2.plot(t, y_response, 'r-', linewidth=1.5)
ax2.set_xlabel('t')
ax2.set_ylabel('y(t)')
ax2.set_title('Steady-State Response of y\'\' + 4y = f(t)')
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig("fourier_forcing_response.png", dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np
from scipy.integrate import solve_ivp
import matplotlib.pyplot as plt

# ── Solve y'' + 4y = square_wave(t) numerically ────────
def square_wave(t, N=50):
    """Fourier approximation of square wave, period 2*pi."""
    return sum((4 / (np.pi * (2*k+1))) * np.sin((2*k+1) * t) for k in range(N))

def ode_system(t, Y):
    y, yp = Y  # y and y'
    return [yp, -4 * y + square_wave(t)]

# Solve IVP with zero initial conditions (steady state after transient)
sol = solve_ivp(ode_system, [0, 20 * np.pi], [0, 0],
                max_step=0.01, t_eval=np.linspace(0, 20*np.pi, 5000))

# ── Compare last few periods with Fourier particular solution ──
t_late = sol.t[sol.t > 18 * np.pi]
y_late = sol.y[0, sol.t > 18 * np.pi]

# Fourier particular solution
y_fourier = np.zeros_like(t_late)
for k in range(50):
    n = 2 * k + 1
    denom = 4 - n**2
    if abs(denom) < 1e-10:
        continue
    y_fourier += (4 / (np.pi * n)) * np.sin(n * t_late) / denom

print("Max difference (last period, numerical vs Fourier):",
      np.max(np.abs(y_late - y_fourier)))
print("(Should be small — the transient has decayed in the damped case,")
print(" or matches well in the undamped steady-state window.)")

# ── Print the first 5 Fourier response amplitudes ──────
print("\nFourier response coefficients:")
for k in range(5):
    n = 2 * k + 1
    denom = 4 - n**2
    amp = 4 / (np.pi * n * denom) if abs(denom) > 1e-10 else float('inf')
    print(f"  k={k}, n={n}: amplitude = {amp:.6f}")
```

## Connection to CS / Games / AI

- **Audio synthesis** — Additive synthesizers build complex tones from sine
  harmonics; the response of a filter to each harmonic is exactly this calculation.
- **PWM control** — Pulse-width modulation signals are square-ish waves; their
  effect on motor dynamics is analysed via Fourier decomposition of the forcing.
- **Resonance in game physics** — If a periodic force matches a system's natural
  frequency, amplitude explodes. Games model this for destructible structures.
- **Spectral methods for PDEs** — Expand both the solution and the forcing in
  Fourier series to solve heat/wave equations (Lessons 20–21 build on this).

## Check Your Understanding

1. Find the Fourier series of $f(t) = t$ on $[-\pi, \pi]$ (sawtooth wave).
   Use it to write the particular solution of $y'' + 9y = f(t)$.

2. For $y'' + y = \sin(t)$, explain why the Fourier approach predicts
   resonance. What happens to the amplitude of the particular solution?

3. Add damping: solve $y'' + 0.2y' + 4y = f(t)$ for the square wave forcing.
   How does the damping term affect the response at high harmonics?
