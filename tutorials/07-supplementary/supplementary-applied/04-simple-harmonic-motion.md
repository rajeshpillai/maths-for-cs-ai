# Simple Harmonic Motion (SHM)

## Intuition

A mass on a spring, a pendulum, a vibrating guitar string — they all oscillate
back and forth around an equilibrium.  SHM is the mathematical model for any
system where the restoring force is proportional to displacement.  It produces
sine waves, connecting mechanics to signal processing.

## Prerequisites

- Tier 8, Lesson 2: Sine, Cosine
- Tier 3, Lesson 2: Derivatives

## From First Principles

### Defining equation

$$\ddot{x} = -\omega^2 x$$

Acceleration is proportional to displacement and directed **opposite** to it.

$\omega$ = angular frequency (rad/s).

### Solution

$$x(t) = A\cos(\omega t + \phi)$$

- $A$ = amplitude (maximum displacement)
- $\omega$ = angular frequency
- $\phi$ = phase
- Period: $T = 2\pi / \omega$
- Frequency: $f = \omega / (2\pi)$

**Velocity:** $v(t) = -A\omega\sin(\omega t + \phi)$

**Acceleration:** $a(t) = -A\omega^2\cos(\omega t + \phi) = -\omega^2 x$

### Pen & paper: Spring-mass system

Hooke's law: $F = -kx$ → $ma = -kx$ → $\ddot{x} = -(k/m)x$

So $\omega = \sqrt{k/m}$, $T = 2\pi\sqrt{m/k}$.

**Example:** $k = 100$ N/m, $m = 1$ kg.

$\omega = 10$ rad/s, $T = 2\pi/10 = 0.628$ s, $f = 1.59$ Hz.

### Energy in SHM

$$KE = \frac{1}{2}mv^2 = \frac{1}{2}mA^2\omega^2\sin^2(\omega t)$$

$$PE = \frac{1}{2}kx^2 = \frac{1}{2}mA^2\omega^2\cos^2(\omega t)$$

$$\text{Total} = \frac{1}{2}mA^2\omega^2 = \text{constant}$$

Energy oscillates between kinetic and potential, but the total is conserved.

### Pen & paper: Maximum values

Max displacement = $A$ (at turning points, $v = 0$)

Max velocity = $A\omega$ (at equilibrium, $x = 0$)

Max acceleration = $A\omega^2$ (at extremes)

### Simple pendulum

For small angles: $\ddot{\theta} = -(g/L)\theta$

$\omega = \sqrt{g/L}$, $T = 2\pi\sqrt{L/g}$

A 1m pendulum: $T = 2\pi\sqrt{1/9.8} \approx 2.01$ s.

### Damped SHM (brief)

Add friction: $\ddot{x} = -\omega^2 x - 2\gamma\dot{x}$

Solution: $x(t) = Ae^{-\gamma t}\cos(\omega' t + \phi)$ — oscillation with decaying amplitude.

## Python Verification

```python
# ── Simple Harmonic Motion ──────────────────────────────────
import math

# Spring-mass: k=100, m=1
k, m = 100, 1
omega = math.sqrt(k / m)
T = 2 * math.pi / omega
f = 1 / T
A = 0.1  # 10 cm amplitude

print(f"=== Spring-mass: k={k}, m={m} ===")
print(f"ω = {omega:.1f} rad/s, T = {T:.3f} s, f = {f:.2f} Hz")
print(f"Amplitude = {A} m")

# Position, velocity, acceleration over one period
print(f"\n=== One period ===")
for i in range(9):
    t = i * T / 8
    x = A * math.cos(omega * t)
    v = -A * omega * math.sin(omega * t)
    a = -omega**2 * x
    print(f"  t={t:.3f}s: x={x:+.4f}m, v={v:+.3f}m/s, a={a:+.2f}m/s²")

# Energy conservation
print(f"\n=== Energy conservation ===")
total_energy = 0.5 * m * (A * omega)**2
for i in range(5):
    t = i * T / 4
    x = A * math.cos(omega * t)
    v = -A * omega * math.sin(omega * t)
    KE = 0.5 * m * v**2
    PE = 0.5 * k * x**2
    print(f"  t={t:.3f}s: KE={KE:.4f}J, PE={PE:.4f}J, total={KE+PE:.4f}J")

# Simple pendulum
print(f"\n=== Pendulum: L=1m ===")
L, g = 1.0, 9.8
T_pend = 2 * math.pi * math.sqrt(L / g)
print(f"T = {T_pend:.3f} s")

# Damped SHM simulation
print(f"\n=== Damped SHM: γ=0.5 ===")
gamma = 0.5
dt = 0.01
x, v_sim = A, 0
for step in range(500):
    a_sim = -omega**2 * x - 2 * gamma * v_sim
    v_sim += a_sim * dt
    x += v_sim * dt
    t = step * dt
    if step % 50 == 0:
        print(f"  t={t:.2f}s: x={x:+.5f}m (envelope: {A*math.exp(-gamma*t):+.5f})")
```

## Visualisation — Undamped, damped, and resonant SHM

Three classic regimes of a spring-mass system: **pure SHM** (no
damping), **damped SHM** (oscillation that decays), and **resonance**
(driving at the natural frequency causes the amplitude to grow without
bound — until something breaks).

```python
# ── Visualising SHM, damped SHM, and resonance ──────────────
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 3, figsize=(16, 4.8))

# (1) Pure SHM: x(t) = A cos(ωt + φ).
ax = axes[0]
A, omega, phi = 1.0, 2.0, 0.0
t = np.linspace(0, 8, 400)
x = A * np.cos(omega * t + phi)
v = -A * omega * np.sin(omega * t + phi)
ax.plot(t, x, color="tab:blue", lw=2, label="x(t)")
ax.plot(t, v / omega, color="tab:orange", lw=1.5, alpha=0.8,
        label="v(t)/ω (rescaled)")
ax.axhline(0, color="black", lw=0.5)
ax.set_title("Pure SHM\n$\\ddot x + \\omega^2 x = 0$")
ax.set_xlabel("time t"); ax.set_ylabel("x")
ax.legend(); ax.grid(True, alpha=0.3)

# (2) Damped SHM: oscillation under-damped, decays exponentially.
ax = axes[1]
gamma = 0.3
omega_d = np.sqrt(omega ** 2 - gamma ** 2)
x_damp = A * np.exp(-gamma * t) * np.cos(omega_d * t)
ax.plot(t, x_damp, color="tab:blue", lw=2, label="x(t)")
ax.plot(t,  A * np.exp(-gamma * t), color="tab:red", lw=1.5, linestyle="--",
        label=f"envelope $\\pm Ae^{{-\\gamma t}}$, γ = {gamma}")
ax.plot(t, -A * np.exp(-gamma * t), color="tab:red", lw=1.5, linestyle="--")
ax.axhline(0, color="black", lw=0.5)
ax.set_title("Damped SHM\n$\\ddot x + 2\\gamma \\dot x + \\omega^2 x = 0$")
ax.set_xlabel("time t"); ax.set_ylabel("x")
ax.legend(); ax.grid(True, alpha=0.3)

# (3) Resonance: driving at exactly omega, amplitude grows linearly with t.
ax = axes[2]
omega_drive = omega
F0 = 0.3
# Particular solution: x_p = (F0 / (2 ω)) · t · sin(ω t)
x_res = (F0 / (2 * omega)) * t * np.sin(omega * t)
ax.plot(t, x_res, color="tab:blue", lw=2)
ax.plot(t,  (F0 / (2 * omega)) * t, color="tab:red", lw=1.5, linestyle="--",
        label="envelope grows linearly with t")
ax.plot(t, -(F0 / (2 * omega)) * t, color="tab:red", lw=1.5, linestyle="--")
ax.axhline(0, color="black", lw=0.5)
ax.set_title("Resonance: driving at the natural frequency\n→ amplitude grows without bound")
ax.set_xlabel("time t"); ax.set_ylabel("x")
ax.legend(); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Period and frequency relations.
print(f"For a spring-mass system with ω = √(k/m) = {omega} rad/s:")
print(f"  Period T = 2π/ω      = {2 * np.pi / omega:.4f} s")
print(f"  Frequency f = 1/T    = {omega / (2 * np.pi):.4f} Hz")
print(f"\nDamped: each oscillation's amplitude is multiplied by e^(-γT) ≈ "
      f"{np.exp(-gamma * 2 * np.pi / omega_d):.4f}")
print("Resonance is destructive: Tacoma Narrows Bridge (1940) failed in")
print("just over an hour because wind frequency matched a structural mode.")
```

**Three behaviours, three uses:**

- **Pure SHM** — pendulums, mass-on-spring, LC circuits — gives the
  pristine sinusoidal oscillation. This is also where atoms vibrate
  at the bottom of any smooth potential well, which is why SHM is
  *the* universal small-amplitude approximation in physics.
- **Damped SHM** is what you get with friction or resistance: the
  amplitude decays exponentially while the oscillation continues at
  a slightly lower frequency. RLC circuits and shock absorbers behave
  this way.
- **Resonance** is what destroyed the Tacoma Narrows Bridge and what
  makes a singer shatter a wine glass. The same maths underlies every
  audio EQ, MRI scan (where you tune the RF pulse to the proton's
  Larmor frequency), and the "Q factor" of every laser cavity.

## Connection to CS / Games / AI / Business / Industry

- **Spring physics** — camera follow, UI animations, cloth simulation
- **Audio synthesis** — SHM produces pure tones (sine waves)
- **Vibration analysis** — resonance detection in structures, engines
- **Suspension systems** — damped SHM in racing game physics
- **Signal processing** — oscillations decompose into SHM components (Fourier)
- **Tacoma Narrows / Millennium Bridge retrofits** — civil-engineering tuned mass dampers (TMDs) on Taipei 101 and the Citicorp Center are sized using SHM resonance analysis to bleed wind-induced sway energy.
- **MEMS gyroscopes (STMicro, Bosch, InvenSense)** — every iPhone and quadcopter flight controller measures rotation via resonating SHM proof masses; the Coriolis force shifts the SHM phase to read angular rate.
- **Quartz oscillators in finance trading clocks** — NYSE and CME use OCXO crystal SHM at 10 MHz as the timing reference for timestamping orders to NIST-traceable accuracy required by SEC 613 / MiFID II RTS 25.
- **Pendulum clocks & atomic-fountain clocks (NIST-F2)** — caesium-fountain clocks use a Ramsey-fringe SHM-based interrogation to define the SI second to 1 part in $10^{16}$.

## Check Your Understanding

1. **Pen & paper:** A spring ($k = 50$ N/m) holds a 2 kg mass.  Find $\omega$, $T$, and max velocity if $A = 0.2$ m.
2. **Pen & paper:** Show that $x = A\cos(\omega t)$ satisfies $\ddot{x} = -\omega^2 x$ by differentiating twice.
3. **Pen & paper:** At what displacement is the speed half the maximum speed?  (Hint: use energy conservation.)
