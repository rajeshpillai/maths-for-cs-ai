# Convolution Theorem

## Intuition

Convolution in the time/spatial domain is **multiplication** in the frequency
domain.  This means you can convolve a million-pixel image with a large kernel
by: (1) FFT both, (2) multiply element-wise, (3) inverse FFT.  This is
$O(N \log N)$ instead of $O(NK)$ — a massive speedup for large kernels.

## Prerequisites

- Tier 9, Lesson 4: DFT and FFT
- Tier 7, Lesson 1: 2D Convolution

## From First Principles

### The theorem

$$\mathcal{F}\{f * g\} = \mathcal{F}\{f\} \cdot \mathcal{F}\{g\}$$

Convolution in time = multiplication in frequency.

And the dual:

$$\mathcal{F}\{f \cdot g\} = \mathcal{F}\{f\} * \mathcal{F}\{g\}$$

Multiplication in time = convolution in frequency.

### Why it works (intuitive)

Sine waves pass through a convolution unchanged (just scaled and shifted).
So if you decompose the input into sines (Fourier Transform), convolve each
sine separately (just multiply by the kernel's frequency response), then
reconstruct — you get the same result as direct convolution.

### Fast convolution algorithm

To compute $h = f * g$ where $f$ has $N$ elements and $g$ has $K$ elements:

1. Zero-pad both to length $N + K - 1$
2. $F = \text{FFT}(f)$, $G = \text{FFT}(g)$
3. $H = F \odot G$ (element-wise multiply)
4. $h = \text{IFFT}(H)$

**Complexity:** $O((N+K) \log(N+K))$ vs. $O(NK)$ for direct convolution.

### Pen & paper: When is FFT convolution faster?

For image of size $N = 1000^2 = 10^6$ and kernel of size $K = 100^2 = 10^4$:

- Direct: $10^6 \times 10^4 = 10^{10}$ operations
- FFT: $\sim 3 \times 10^6 \times 20 = 6 \times 10^7$ operations

FFT is ~150× faster!

For small kernel ($K = 9$, a 3×3 kernel): direct is faster because the FFT overhead dominates.

**Rule of thumb:** FFT convolution wins when $K > \sim 50$.

### Frequency domain filtering

- **Low-pass filter:** keep low frequencies, zero out high → blur
- **High-pass filter:** keep high frequencies, zero out low → edges
- **Band-pass:** keep a range → isolate specific features

## Python Verification

```python
# ── Convolution Theorem ─────────────────────────────────────
import math

# Direct 1D convolution
def convolve_direct(f, g):
    N, K = len(f), len(g)
    out_len = N + K - 1
    result = [0] * out_len
    for i in range(N):
        for j in range(K):
            result[i+j] += f[i] * g[j]
    return result

# Manual DFT/IDFT for verification
def dft(x):
    N = len(x)
    return [sum(x[n]*math.cos(2*math.pi*k*n/N) - 1j*x[n]*math.sin(2*math.pi*k*n/N)
                for n in range(N)) for k in range(N)]

def idft(X):
    N = len(X)
    return [sum(X[k].real*math.cos(2*math.pi*k*n/N) - X[k].imag*math.sin(2*math.pi*k*n/N)
                for k in range(N)) / N for n in range(N)]

# Test: direct vs FFT convolution
f = [1, 2, 3, 4]
g = [1, 0, -1]

print("=== Direct convolution ===")
direct = convolve_direct(f, g)
print(f"  f = {f}")
print(f"  g = {g}")
print(f"  f*g = {direct}")

print(f"\n=== FFT convolution ===")
# Zero-pad to length N+K-1
L = len(f) + len(g) - 1
f_pad = f + [0]*(L - len(f))
g_pad = g + [0]*(L - len(g))

F = dft(f_pad)
G = dft(g_pad)
H = [fi * gi for fi, gi in zip(F, G)]  # element-wise multiply
h = idft(H)
h_rounded = [round(v, 6) for v in h]
print(f"  FFT result = {h_rounded}")
print(f"  Match? {all(abs(a-b) < 1e-6 for a, b in zip(direct, h))}")

# Complexity comparison
print(f"\n=== Complexity comparison ===")
for N, K in [(100, 10), (1000, 100), (10000, 1000), (1000000, 10000)]:
    direct_ops = N * K
    fft_ops = int(3 * (N+K) * math.log2(N+K))  # 3 FFTs
    winner = "FFT" if fft_ops < direct_ops else "Direct"
    print(f"  N={N:>8,}, K={K:>6,}: direct={direct_ops:>12,}, FFT≈{fft_ops:>12,} → {winner}")
```

## Visualisation — Multiplying spectra equals convolving signals

The convolution theorem says: convolution in the time domain equals
*pointwise multiplication* in the frequency domain. Two pictures show
this happening: a signal, its frequency content, the same signal
filtered, and a speed comparison that shows why FFT-based convolution
beats direct convolution for large kernels.

```python
# ── Visualising the convolution theorem ─────────────────────
import numpy as np
import matplotlib.pyplot as plt

# Build a signal with two tones — one to keep, one to remove.
fs = 1000; T = 1.0
t = np.linspace(0, T, int(fs * T), endpoint=False)
signal = (np.sin(2 * np.pi * 50 * t)         # keep this 50 Hz tone
        + np.sin(2 * np.pi * 200 * t)         # remove this high-frequency tone
        + 0.3 * np.random.default_rng(0).standard_normal(len(t)))

# Low-pass filter: a Gaussian-shaped filter centred at frequency 0,
# falling off so high frequencies are suppressed.
N = len(signal)
freqs = np.fft.fftfreq(N, d=1/fs)
filter_freq = np.exp(-(freqs / 80) ** 2)      # Gaussian low-pass

# Apply it the FAST way: FFT, multiply, inverse FFT.
S = np.fft.fft(signal)
filtered_freq = S * filter_freq
filtered = np.real(np.fft.ifft(filtered_freq))

fig, axes = plt.subplots(2, 2, figsize=(15, 9))

# (1) Original signal — noisy, two tones mixed.
ax = axes[0, 0]
ax.plot(t, signal, color="tab:blue", lw=0.6)
ax.set_xlim(0, 0.05); ax.set_title("Original signal\n(50 Hz + 200 Hz + noise)")
ax.set_xlabel("time"); ax.set_ylabel("amplitude")
ax.grid(True, alpha=0.3)

# (2) Spectra side by side: original and the filter that we'll multiply by.
ax = axes[0, 1]
half = N // 2
amp_orig = (2 / N) * np.abs(S[:half])
ax.plot(freqs[:half], amp_orig, color="tab:red",
        label="|S(f)| (signal spectrum)")
ax.plot(freqs[:half], filter_freq[:half], color="tab:green", lw=2,
        label="H(f) (Gaussian low-pass)")
ax.axvline(50,  color="tab:green",  linestyle="--", lw=0.8)
ax.axvline(200, color="tab:purple", linestyle="--", lw=0.8)
ax.text(50,  amp_orig.max()*0.9, "50 Hz (keep)", color="tab:green",  fontsize=8)
ax.text(200, amp_orig.max()*0.7, "200 Hz (kill)", color="tab:purple", fontsize=8)
ax.set_xlim(0, 300); ax.set_xlabel("frequency (Hz)")
ax.set_title("Spectra — multiply pointwise to filter")
ax.legend(); ax.grid(True, alpha=0.3)

# (3) Filtered signal back in the time domain — one clean tone.
ax = axes[1, 0]
ax.plot(t, filtered, color="tab:blue", lw=0.8)
ax.set_xlim(0, 0.05)
ax.set_title("Filtered output (back in time)\nThe 200 Hz tone is gone — clean 50 Hz remains")
ax.set_xlabel("time"); ax.set_ylabel("amplitude")
ax.grid(True, alpha=0.3)

# (4) Speed comparison: direct convolution vs FFT-based convolution.
# For a length-N signal and length-K kernel, direct = O(NK), FFT = O((N+K) log(N+K)).
ax = axes[1, 1]
N_arr = np.array([2 ** k for k in range(8, 21)])
K_at_N = N_arr // 8                                # mid-sized kernels
direct_ops = N_arr * K_at_N
fft_ops    = 3 * (N_arr + K_at_N) * np.log2(N_arr + K_at_N)
ax.loglog(N_arr, direct_ops, "o-", color="tab:red",   lw=2, label="direct conv: $O(N \\cdot K)$")
ax.loglog(N_arr, fft_ops,    "s-", color="tab:green", lw=2, label="FFT conv:    $O((N+K) \\log(N+K))$")
ax.set_xlabel("signal length N"); ax.set_ylabel("multiplications (log)")
ax.set_title("FFT-based convolution wins for long signals\n(K ≈ N/8 here)")
ax.legend(); ax.grid(True, which="both", alpha=0.3)

plt.tight_layout()
plt.show()

# Print exact crossover for several sizes.
print("Speed crossover: FFT convolution vs direct convolution")
print(f"{'N':>10}  {'K':>10}  {'direct ops':>14}  {'FFT ops':>14}  {'winner':>8}")
for N_v, K_v in [(100, 10), (1000, 100), (10_000, 1_000), (1_000_000, 10_000)]:
    d = N_v * K_v
    f = 3 * (N_v + K_v) * np.log2(N_v + K_v)
    print(f"  {N_v:>8,}  {K_v:>8,}  {d:>14,}  {int(f):>14,}  "
          f"{'FFT' if f < d else 'direct'}")
```

**Why this is one of the most useful theorems in computing:**

- **Convolution in time = multiplication in frequency.** Filter-design
  becomes algebra: pick the spectrum you want, take the inverse FFT,
  and you have a kernel that does the job. *That* is how every
  graphic-EQ knob in your music app actually works.
- **Massive speed-up for large kernels.** Direct convolution is
  $O(NK)$. With the FFT, the same job becomes $O((N + K) \log(N + K))$.
  For audio (millions of samples) or images (millions of pixels) with
  large kernels, the saving is decisive.
- **Real-time large-radius blur in graphics**, **convolutional reverb
  in audio**, **fast cross-correlation** for object detection in video
  — all built directly on this theorem. Even modern CNN hardware
  (Winograd convolution, FFT-Conv) uses spectral-domain tricks for
  certain layer shapes.

## Connection to CS / Games / AI / Business / Industry

- **Image processing** — large-kernel blur/sharpen via FFT
- **Audio effects** — reverb = convolution with impulse response (done via FFT)
- **CNNs** — some implementations use FFT for large kernels (though Winograd is more common)
- **Polynomial multiplication** — FFT multiplies two polynomials in $O(N \log N)$
- **Cross-correlation** — template matching in images
- **Convolution reverb plugins (Altiverb, Waves IR-1)** — every major recording studio (Abbey Road, Capitol) uses FFT-based convolution to apply impulse responses captured in real concert halls (Sydney Opera House, Vienna Musikverein) onto dry studio tracks.
- **GPS signal acquisition (Garmin, Trimble, u-blox receivers)** — receivers cross-correlate incoming satellite C/A codes against stored replicas via FFT-based matched filtering; this is why your phone can lock GPS even with a -130 dBm signal.
- **Synthetic-aperture radar imaging (Sentinel-1, Capella Space)** — Earth-observation satellites convert raw radar pulses into high-resolution images by performing FFT-based range-Doppler convolution, providing cloud-penetrating imagery for defense and agriculture.
- **MRI gradient-echo reconstruction (Siemens, GE)** — non-Cartesian k-space sampling (spiral, radial) is reconstructed via gridding + FFT convolution, accelerating cardiac scans by capturing only the most informative frequencies.

## Check Your Understanding

1. **Pen & paper:** Verify the convolution theorem for $f = [1, 1]$ and $g = [1, -1]$: compute $f * g$ directly, then via DFT multiplication.
2. **Pen & paper:** If you zero out all DFT coefficients except $X[0]$, what signal do you get back?  (Hint: it's the mean.)
3. **Think about it:** Why is the convolution theorem central to signal processing but less used in modern CNNs?
