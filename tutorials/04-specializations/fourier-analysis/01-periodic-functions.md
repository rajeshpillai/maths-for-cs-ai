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

## Visualisation — Sines, harmonics, and beats

Three plots: a single sine wave with its frequency / amplitude /
phase highlighted; a square wave built up from progressively more odd
harmonics (the foundation of Fourier series); and the **beat
phenomenon** that makes two close-frequency tones produce a slow
"wobble" — exactly what you hear when piano strings are mistuned.

```python
# ── Visualising periodic signals and superposition ──────────
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 3, figsize=(16, 4.8))

# (1) A single sine wave: y = A·sin(2πft + φ).
# Three classic parameters: amplitude, frequency, phase.
ax = axes[0]
t = np.linspace(0, 2, 1000)
A, f, phi = 2.0, 2.0, np.pi / 4
y = A * np.sin(2 * np.pi * f * t + phi)
ax.plot(t, y, color="tab:blue", lw=2,
        label=f"A·sin(2πft + φ),  A={A}, f={f} Hz, φ=π/4")
# Annotate amplitude (peak height) and one period (1/f).
ax.axhline( A, color="grey", lw=0.8, linestyle=":")
ax.axhline(-A, color="grey", lw=0.8, linestyle=":")
ax.annotate("", xy=(1.0, A), xytext=(1.0, -A),
            arrowprops=dict(arrowstyle="<->", color="tab:red"))
ax.text(1.05, 0, f"amplitude = {A}", color="tab:red", fontsize=10)
period = 1.0 / f
ax.annotate("", xy=(0.5 + period, -2.5), xytext=(0.5, -2.5),
            arrowprops=dict(arrowstyle="<->", color="tab:green"))
ax.text(0.5 + period/2, -2.7, f"T = 1/f = {period:.2f}s",
        ha="center", color="tab:green", fontsize=10)
ax.set_xlabel("time t (s)"); ax.set_ylabel("y(t)")
ax.set_title("A single sine wave\nA, f, φ are the three parameters")
ax.set_ylim(-3, 3); ax.legend(fontsize=8); ax.grid(True, alpha=0.3)

# (2) Square-wave approximation by adding odd harmonics:
#   square(t) ≈ (4/π) Σ sin((2k+1) ω t) / (2k+1)
# More terms → squarer corners.
ax = axes[1]
omega = 2 * np.pi
for n_terms, color in zip([1, 3, 11], ["tab:red", "tab:orange", "tab:green"]):
    s = np.zeros_like(t)
    for k in range(n_terms):
        m = 2 * k + 1
        s += (4 / (np.pi * m)) * np.sin(m * omega * t)
    ax.plot(t, s, lw=1.6, color=color, label=f"{n_terms} odd harmonics")
ax.set_xlabel("t"); ax.set_ylabel("y")
ax.set_title("Square wave from odd-harmonic sines\n(more terms → sharper corners)")
ax.legend(); ax.grid(True, alpha=0.3)
ax.set_ylim(-1.5, 1.5)

# (3) Beats: two close-frequency sines added together produce an
# AM-style envelope at the *difference* frequency. The audible
# wobble is exactly |f1 − f2|.
ax = axes[2]
t_long = np.linspace(0, 1, 4000)
f1, f2 = 30.0, 32.0                    # 30 Hz and 32 Hz → 2 Hz beat
y1 = np.sin(2 * np.pi * f1 * t_long)
y2 = np.sin(2 * np.pi * f2 * t_long)
combined = y1 + y2
ax.plot(t_long, combined, color="tab:blue", lw=0.9, label="$\\sin(2\\pi · 30t) + \\sin(2\\pi · 32t)$")
# Envelope: |2 cos(π(f1−f2)t)|.
envelope = 2 * np.abs(np.cos(np.pi * (f2 - f1) * t_long))
ax.plot(t_long,  envelope, color="tab:red", lw=2, label=f"envelope: beat freq = {abs(f1-f2):.0f} Hz")
ax.plot(t_long, -envelope, color="tab:red", lw=2)
ax.set_xlabel("time"); ax.set_ylabel("amplitude")
ax.set_title("Beats: |f₁ − f₂| 'wobbles' per second\n(piano-tuner phenomenon)")
ax.legend(loc="upper right", fontsize=9); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Print a few worked numbers.
print("Beats: when two pure tones of close frequency play together,")
print(f"you hear the *sum* warbled by an envelope at |f1 − f2|.")
print(f"  f1 = 440 Hz (A4 musical note), f2 = 444 Hz → beat = 4 Hz (audible wobble)")
print(f"  This is *the* trick used to tune string instruments by ear.")
```

**Three foundational ideas pinned down:**

- **A sine wave is described by exactly three numbers.** Amplitude
  (peak height), frequency (cycles per second), phase (horizontal
  shift). Anything periodic that can be heard, seen, or measured is
  built from sines like these.
- **Sums of sines build any periodic shape.** The square-wave
  approximation is one example: enough odd harmonics, with weights
  $4/(\pi m)$, and you get a perfect square. Fourier series (next
  lesson) makes this *exact and general*.
- **Two close tones = a slow beat.** When $f_1$ and $f_2$ are similar,
  their sum has an envelope at the *difference frequency*. This is how
  you tune instruments by ear, why FM radio static appears as
  whistles, and the basic idea behind how SSB modulation packs more
  signal into less bandwidth.

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
