# Fourier Transform — Extend to Non-Periodic Signals

## Intuition

The Fourier series decomposes **periodic** signals.  The Fourier Transform
generalises this to **any** signal — even one-off pulses or aperiodic noise.
It reveals the frequency content: "how much of each frequency is present?"

## Prerequisites

- Tier 9, Lesson 2: Fourier Series

## From First Principles

### From series to transform

As the period $T \to \infty$, the discrete harmonics become a continuous spectrum:

$$\hat{f}(\omega) = \int_{-\infty}^{\infty} f(t)\, e^{-i\omega t}\, dt$$

This is the **Fourier Transform** of $f(t)$.

### Inverse Fourier Transform

$$f(t) = \frac{1}{2\pi}\int_{-\infty}^{\infty} \hat{f}(\omega)\, e^{i\omega t}\, d\omega$$

You can go back and forth between time and frequency domains.

### What $\hat{f}(\omega)$ tells you

$|\hat{f}(\omega)|$ = **amplitude** of frequency $\omega$ in the signal.

$\arg(\hat{f}(\omega))$ = **phase** of that frequency.

### Pen & paper: Gaussian stays Gaussian

If $f(t) = e^{-at^2}$, then $\hat{f}(\omega) = \sqrt{\frac{\pi}{a}}\, e^{-\omega^2/(4a)}$.

A Gaussian in time → a Gaussian in frequency.  Narrow in time → wide in frequency (and vice versa).  This is the **uncertainty principle**.

### Key Fourier pairs

| Time domain | Frequency domain |
|-------------|-----------------|
| $\delta(t)$ (impulse) | $1$ (all frequencies equally) |
| $1$ (constant) | $\delta(\omega)$ (only DC) |
| $e^{-a|t|}$ | $\frac{2a}{a^2 + \omega^2}$ (Lorentzian) |
| $\text{rect}(t)$ (box) | $\text{sinc}(\omega/2)$ |
| Gaussian | Gaussian |

### Properties

| Property | Time domain | Frequency domain |
|----------|-------------|-----------------|
| Linearity | $af + bg$ | $a\hat{f} + b\hat{g}$ |
| Time shift | $f(t - t_0)$ | $e^{-i\omega t_0}\hat{f}(\omega)$ |
| Frequency shift | $e^{i\omega_0 t}f(t)$ | $\hat{f}(\omega - \omega_0)$ |
| Convolution | $f * g$ | $\hat{f} \cdot \hat{g}$ |
| Multiplication | $f \cdot g$ | $\hat{f} * \hat{g}$ |

## Python Verification

```python
# ── Fourier Transform ───────────────────────────────────────
import math

# Numerical FT of a simple signal (rectangular pulse)
print("=== Numerical FT of rectangular pulse ===")
# Pulse: f(t) = 1 for |t| < 1, else 0
dt = 0.01
t_vals = [i * dt for i in range(-500, 501)]

for omega in [0, 1, 2, 5, 10]:
    # FT: integral of f(t) * e^{-iwt} dt
    real_part = sum(1.0 * math.cos(omega * t) * dt for t in t_vals if abs(t) < 1)
    imag_part = sum(-1.0 * math.sin(omega * t) * dt for t in t_vals if abs(t) < 1)
    magnitude = math.sqrt(real_part**2 + imag_part**2)
    # Analytical: 2*sin(ω)/ω (sinc)
    analytical = 2 * math.sin(omega) / omega if omega != 0 else 2.0
    print(f"  ω={omega:2d}: |F̂|={magnitude:.4f}, analytical={abs(analytical):.4f}")

# Uncertainty principle demo
print(f"\n=== Uncertainty: narrow pulse → wide spectrum ===")
for width in [0.1, 0.5, 1.0, 2.0]:
    # Width in time = width
    # Width in frequency ≈ 1/width (from sinc zero crossing)
    freq_width = 1 / width if width > 0 else float('inf')
    print(f"  Time width={width}: Frequency width ≈ {freq_width:.1f}")

# Gaussian FT
print(f"\n=== Gaussian: narrow in time → wide in frequency ===")
for a in [0.5, 1.0, 4.0]:
    time_width = 1/math.sqrt(a)
    freq_width = math.sqrt(a)
    print(f"  a={a}: σ_time={time_width:.2f}, σ_freq={freq_width:.2f}, product={time_width*freq_width:.2f}")
```

## Connection to CS / Games / AI

- **Audio processing** — spectrum analysers, equalizers, pitch detection
- **Image processing** — frequency domain filtering (blur = low-pass, sharpen = high-pass)
- **MRI** — raw data is in frequency domain; inverse FT reconstructs the image
- **Convolution theorem** — convolution in time = multiplication in frequency (fast!)
- **Wavelets** — extension of Fourier for time-frequency localisation

## Check Your Understanding

1. **Pen & paper:** If a signal is a pure sine wave $\sin(\omega_0 t)$, what does its Fourier Transform look like?  (Hint: two impulses.)
2. **Pen & paper:** Why does multiplying in the frequency domain equal convolution in the time domain?
3. **Think about it:** Why can't a signal be both narrow in time AND narrow in frequency?  (The uncertainty principle.)
