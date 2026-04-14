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

## Connection to CS / Games / AI

- **Spring physics** — camera follow, UI animations, cloth simulation
- **Audio synthesis** — SHM produces pure tones (sine waves)
- **Vibration analysis** — resonance detection in structures, engines
- **Suspension systems** — damped SHM in racing game physics
- **Signal processing** — oscillations decompose into SHM components (Fourier)

## Check Your Understanding

1. **Pen & paper:** A spring ($k = 50$ N/m) holds a 2 kg mass.  Find $\omega$, $T$, and max velocity if $A = 0.2$ m.
2. **Pen & paper:** Show that $x = A\cos(\omega t)$ satisfies $\ddot{x} = -\omega^2 x$ by differentiating twice.
3. **Pen & paper:** At what displacement is the speed half the maximum speed?  (Hint: use energy conservation.)
