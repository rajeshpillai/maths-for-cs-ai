# Fourier Transform — Extend to Non-Periodic Signals

## Intuition

The Fourier series decomposes **periodic** signals.  The Fourier Transform
generalises this to **any** signal — even one-off pulses or aperiodic noise.
It reveals the frequency content: "how much of each frequency is present?"

## Prerequisites

- Tier 9, Lesson 2: Fourier Series

## From First Principles

### From series to transform (the limiting argument)

Start with the Fourier series of a periodic function with period $T$:

$$f(t) = \sum_{n=-\infty}^{\infty} c_n \, e^{i n \omega_0 t}, \quad \omega_0 = \frac{2\pi}{T}$$

where the coefficients are:

$$c_n = \frac{1}{T}\int_{-T/2}^{T/2} f(t)\, e^{-i n \omega_0 t}\, dt$$

**Step 1:** Define $\omega_n = n\omega_0$ and $\Delta\omega = \omega_0 = 2\pi/T$. Substitute $c_n$
back into the series:

$$f(t) = \sum_{n=-\infty}^{\infty} \left[\frac{1}{T}\int_{-T/2}^{T/2} f(\tau)\, e^{-i \omega_n \tau}\, d\tau\right] e^{i \omega_n t}$$

**Step 2:** Since $1/T = \Delta\omega / (2\pi)$, rewrite:

$$f(t) = \frac{1}{2\pi}\sum_{n=-\infty}^{\infty} \left[\int_{-T/2}^{T/2} f(\tau)\, e^{-i \omega_n \tau}\, d\tau\right] e^{i \omega_n t}\, \Delta\omega$$

**Step 3:** As $T \to \infty$:
- The discrete frequencies $\omega_n = n \cdot 2\pi/T$ become **continuous**: $\Delta\omega \to d\omega$
- The sum becomes an **integral** over all $\omega$
- The integration limits $-T/2$ to $T/2$ become $-\infty$ to $\infty$

$$f(t) = \frac{1}{2\pi}\int_{-\infty}^{\infty} \left[\int_{-\infty}^{\infty} f(\tau)\, e^{-i\omega\tau}\, d\tau\right] e^{i\omega t}\, d\omega$$

**Step 4:** The inner integral is the **Fourier Transform**:

$$\hat{f}(\omega) = \int_{-\infty}^{\infty} f(t)\, e^{-i\omega t}\, dt$$

This is the **Fourier Transform** of $f(t)$. The key insight: as the period
becomes infinite, the harmonic "comb" of discrete frequencies merges into a
continuous spectrum.

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

### Visualisation: time domain signal and its frequency spectrum

```python
# ── Fourier Transform visualisation ────────────────────────
import numpy as np
import matplotlib.pyplot as plt

# Create a signal: sum of two sine waves at 5 Hz and 12 Hz
fs = 200  # sampling rate
t = np.linspace(0, 1, fs, endpoint=False)
signal = 1.0 * np.sin(2 * np.pi * 5 * t) + 0.5 * np.sin(2 * np.pi * 12 * t)

# Compute FFT (discrete Fourier transform)
fft_vals = np.fft.fft(signal)
freqs = np.fft.fftfreq(len(t), d=1/fs)

# Only positive frequencies
pos_mask = freqs >= 0
freqs_pos = freqs[pos_mask]
magnitude = np.abs(fft_vals[pos_mask]) * 2 / len(t)  # normalise

fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 6))

# Time domain
ax1.plot(t, signal, 'b-', linewidth=1)
ax1.set_xlabel('Time (s)')
ax1.set_ylabel('Amplitude')
ax1.set_title('Time Domain: sin(2π·5t) + 0.5·sin(2π·12t)')
ax1.grid(True, alpha=0.3)

# Frequency domain
ax2.stem(freqs_pos[:30], magnitude[:30], linefmt='r-', markerfmt='ro', basefmt='k-')
ax2.set_xlabel('Frequency (Hz)')
ax2.set_ylabel('Magnitude')
ax2.set_title('Frequency Domain (Fourier Transform): peaks at 5 Hz and 12 Hz')
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

## Connection to CS / Games / AI / Business / Industry

- **Audio processing** — spectrum analysers, equalizers, pitch detection
- **Image processing** — frequency domain filtering (blur = low-pass, sharpen = high-pass)
- **MRI** — raw data is in frequency domain; inverse FT reconstructs the image
- **Convolution theorem** — convolution in time = multiplication in frequency (fast!)
- **Wavelets** — extension of Fourier for time-frequency localisation
- **MRI scanners (Siemens Magnetom, GE SIGNA, Philips Ingenia)** — every clinical MRI machine reconstructs images by computing 2D/3D inverse Fourier transforms over raw k-space data captured by gradient coils; without the FT, the entire $7B/year MRI industry doesn't exist.
- **Air-traffic control radar (Raytheon ASR-9, Lockheed Martin TPS-77)** — every major airport uses pulse-Doppler radar that computes FFTs on echo phase to extract aircraft velocity and filter ground clutter.
- **Equity volatility surfaces (Goldman Sachs SecDB, JPM Athena)** — characteristic-function methods (Carr-Madan, Lewis) price options by computing the Fourier transform of the log-return density, replacing slow Monte Carlo with millisecond pricing.
- **Seismic exploration (Schlumberger Omega, CGG GeoDepth)** — oil-and-gas geophysicists migrate seismic shot records via 2D/3D FT to image salt domes and faults thousands of meters underground.

## Check Your Understanding

1. **Pen & paper:** If a signal is a pure sine wave $\sin(\omega_0 t)$, what does its Fourier Transform look like?  (Hint: two impulses.)
2. **Pen & paper:** Why does multiplying in the frequency domain equal convolution in the time domain?
3. **Think about it:** Why can't a signal be both narrow in time AND narrow in frequency?  (The uncertainty principle.)
