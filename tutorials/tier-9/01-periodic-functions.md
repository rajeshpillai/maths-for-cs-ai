# Periodic Functions and Superposition

## Intuition

A **periodic function** repeats at regular intervals — like a heartbeat, a
musical note, or an alternating current.  **Superposition** says you can build
any periodic signal by adding simple sine waves together.  This is the
foundation of Fourier analysis: decompose complexity into simple parts.

## Prerequisites

- Tier 8, Lesson 2: Sine, Cosine, Tangent

## From First Principles

### Periodic functions

$f(x)$ is periodic with period $T$ if $f(x + T) = f(x)$ for all $x$.

**Examples:**
- $\sin(x)$: period $2\pi$
- $\sin(2x)$: period $\pi$ (twice the frequency)
- $\cos(x)$: period $2\pi$

### Frequency, period, amplitude

$$f(t) = A\sin(2\pi f t + \phi)$$

| Parameter | Symbol | Meaning |
|-----------|--------|---------|
| Amplitude | $A$ | Height of the wave |
| Frequency | $f$ | Cycles per second (Hz) |
| Period | $T = 1/f$ | Time for one cycle |
| Angular frequency | $\omega = 2\pi f$ | Radians per second |
| Phase | $\phi$ | Horizontal shift |

**Pen & paper:** A 440 Hz sine wave (concert A):

$T = 1/440 \approx 0.00227$ seconds.  $\omega = 2\pi(440) \approx 2764$ rad/s.

### Superposition principle

If $f$ and $g$ are solutions to a linear system, then $af + bg$ is also a solution.

For waves: any complex periodic signal = sum of sines and cosines.

**Pen & paper:** $h(t) = \sin(t) + 0.5\sin(3t) + 0.25\sin(5t)$

At $t = 0$: $h = 0 + 0 + 0 = 0$

At $t = \pi/2$: $h = 1 + 0.5\sin(3\pi/2) + 0.25\sin(5\pi/2) = 1 - 0.5 + 0.25 = 0.75$

Adding odd harmonics approximates a **square wave** — this is a preview of Fourier series.

### Beats (two close frequencies)

$\sin(2\pi f_1 t) + \sin(2\pi f_2 t) = 2\cos\left(2\pi\frac{f_1 - f_2}{2}t\right)\sin\left(2\pi\frac{f_1 + f_2}{2}t\right)$

A fast oscillation modulated by a slow envelope.  When musicians "hear beats," this is the math.

## Python Verification

```python
# ── Periodic Functions & Superposition ──────────────────────
import math

# Basic sine wave
print("=== Sine wave: A=1, f=2Hz, sampled at key points ===")
f = 2  # Hz
for t_ms in range(0, 501, 50):
    t = t_ms / 1000
    y = math.sin(2 * math.pi * f * t)
    bar = ' ' * int((y + 1) * 20) + '*'
    print(f"  t={t:.3f}s: y={y:+.3f} {bar}")

# Superposition: square wave approximation
print(f"\n=== Square wave from odd harmonics ===")
def square_approx(t, n_terms):
    total = 0
    for k in range(n_terms):
        n = 2*k + 1  # odd harmonics: 1, 3, 5, 7, ...
        total += math.sin(n * t) / n
    return total * 4 / math.pi

for n in [1, 3, 5, 15]:
    vals = [square_approx(t/10, n) for t in range(0, 32)]
    # Show at t=π/2
    val = square_approx(math.pi/2, n)
    print(f"  {n} terms at t=π/2: {val:.4f} (target: 1.0)")

# Beats
print(f"\n=== Beats: f1=440Hz, f2=444Hz ===")
f1, f2 = 440, 444
beat_freq = abs(f1 - f2)
print(f"  Beat frequency: {beat_freq} Hz")
print(f"  You hear {beat_freq} 'wobbles' per second")
```

## Connection to CS / Games / AI

- **Audio** — every sound is a sum of sine waves (harmonics)
- **Music synthesis** — additive synthesis builds sounds from individual harmonics
- **Signal processing** — radio, WiFi, Bluetooth all transmit sine waves
- **Animation** — `sin(time)` for bobbing, pulsing, breathing effects
- **AC circuits** — alternating current is a sine wave

## Check Your Understanding

1. **Pen & paper:** What is the period of $\sin(4\pi t)$?  The frequency?
2. **Pen & paper:** Compute $\sin(t) + \sin(3t)$ at $t = 0, \pi/6, \pi/4, \pi/2$.
3. **Think about it:** Why are odd harmonics special for approximating a square wave?
