# Applications — Image Filtering, Audio Processing, CNNs

## Intuition

Fourier analysis isn't just theory — it powers real technology you use daily.
Your phone's noise cancellation, JPEG compression, Shazam's music recognition,
and even how CNNs detect edges all connect back to frequency decomposition.

## Prerequisites

- Tier 9, Lessons 1–5

## From First Principles

### Image filtering in the frequency domain

An image's low frequencies = smooth gradients, large shapes.
High frequencies = edges, texture, noise.

**Low-pass filter (blur):** Zero out high-frequency DFT coefficients.
**High-pass filter (edges):** Zero out low-frequency coefficients.
**Band-pass:** Keep a specific frequency range.

### Pen & paper: Why blurring removes noise

Noise is typically high-frequency (rapid pixel-to-pixel changes).
A low-pass filter removes high frequencies → removes noise → but also blurs edges.

This trade-off (noise vs detail) is fundamental to all denoising.

### JPEG compression

1. Split image into 8×8 blocks
2. Apply 2D DCT (Discrete Cosine Transform) to each block
3. Quantise: divide coefficients by a table, round to integers (lossy step)
4. High-frequency coefficients become zero → compact encoding
5. Entropy-code the remaining values

**Pen & paper:** An 8×8 block of smooth gradient has energy concentrated in low-frequency DCT coefficients.  An 8×8 block of texture has energy spread to high frequencies.

Higher JPEG quality = keep more coefficients.  Lower quality = more zeros = smaller file.

### Audio: Spectrograms and pitch detection

A **spectrogram** shows frequency content over time: apply FFT to short overlapping windows.

**Pitch detection:** Find the fundamental frequency = the peak in the FFT magnitude.

A440 tuning: the FFT of a tuning fork shows a spike at 440 Hz.

### Shazam (simplified)

1. Compute spectrogram of audio clip
2. Find peaks (loud frequencies at specific times)
3. Hash the peak patterns → fingerprint
4. Match against database of known song fingerprints

### CNNs and Fourier

**Connection:** A CNN kernel in the spatial domain corresponds to a filter in the frequency domain.

- Small kernels (3×3) detect high-frequency features (edges)
- Large receptive fields detect low-frequency features (global structure)
- Pooling = low-pass filtering + downsampling

**Spectral CNNs:** Some architectures operate directly in the frequency domain (graph neural networks use spectral convolution).

### Why different image formats exist

| Format | Transform | Lossy? | Best for |
|--------|-----------|--------|----------|
| JPEG | DCT (8×8 blocks) | Yes | Photos |
| PNG | Deflate (lossless) | No | Screenshots, diagrams |
| WebP | DCT + prediction | Both | Web (smaller than JPEG) |
| HEIC | DCT + advanced | Yes | Photos (better than JPEG) |
| FLAC | Prediction | No | Audio (lossless) |
| MP3 | MDCT | Yes | Audio (lossy) |

## Python Verification

```python
# ── Applications of Fourier Analysis ────────────────────────
import math

# 1D low-pass filter
print("=== Low-pass filter: remove noise ===")
# Clean signal + noise
clean = [math.sin(2*math.pi*2*t/100) for t in range(100)]

# Add high-frequency noise
import random
random.seed(42)
noisy = [c + 0.3*random.gauss(0, 1) for c in clean]

# DFT → zero out high frequencies → IDFT
def simple_dft(x):
    N = len(x)
    return [sum(x[n]*(math.cos(2*math.pi*k*n/N) - 1j*math.sin(2*math.pi*k*n/N))
                for n in range(N)) for k in range(N)]

def simple_idft(X):
    N = len(X)
    return [sum(X[k].real*math.cos(2*math.pi*k*n/N) - X[k].imag*math.sin(2*math.pi*k*n/N)
                for k in range(N)) / N for n in range(N)]

X = simple_dft(noisy)

# Low-pass: keep only first 10 and last 10 frequencies
cutoff = 10
for k in range(cutoff, len(X) - cutoff):
    X[k] = 0

filtered = simple_idft(X)

# Compare errors
noise_error = math.sqrt(sum((n-c)**2 for n, c in zip(noisy, clean)) / 100)
filter_error = math.sqrt(sum((f-c)**2 for f, c in zip(filtered, clean)) / 100)
print(f"  Noise RMSE:    {noise_error:.4f}")
print(f"  Filtered RMSE: {filter_error:.4f}")
print(f"  Improvement:   {noise_error/filter_error:.1f}×")

# JPEG-like: DCT energy compaction
print(f"\n=== DCT energy compaction ===")
# Simulate: smooth signal has energy in low frequencies
smooth = [math.cos(2*math.pi*t/100) for t in range(64)]
X_smooth = simple_dft(smooth)
mags = [abs(x) for x in X_smooth]
top_5_energy = sum(sorted(mags, reverse=True)[:5])**2
total_energy = sum(m**2 for m in mags)
print(f"  Smooth signal: top 5 freqs capture {top_5_energy/total_energy:.1%} of energy")

# Random signal: energy spread
noisy_sig = [random.gauss(0, 1) for _ in range(64)]
X_noisy = simple_dft(noisy_sig)
mags = [abs(x) for x in X_noisy]
top_5_energy = sum(sorted(mags, reverse=True)[:5])**2
total_energy = sum(m**2 for m in mags)
print(f"  Random signal: top 5 freqs capture {top_5_energy/total_energy:.1%} of energy")

# Pitch detection
print(f"\n=== Pitch detection ===")
# Generate a 440 Hz tone sampled at 8000 Hz
sample_rate = 8000
duration = 0.1  # 100ms
N = int(sample_rate * duration)
tone = [math.sin(2*math.pi*440*n/sample_rate) for n in range(N)]

X = simple_dft(tone)
mags = [abs(x) for x in X[:N//2]]
peak_bin = mags.index(max(mags))
peak_freq = peak_bin * sample_rate / N
print(f"  Detected frequency: {peak_freq:.0f} Hz (expected: 440 Hz)")
```

## Visualisation — Frequency-domain image compression

The single most-used application of Fourier-style transforms in
day-to-day computing: **image compression**. The principle is dead
simple: a smooth image has very few large frequency coefficients, so
keeping the top few and zeroing the rest gives back something visually
close to the original at a fraction of the storage. The plot uses the
**2-D FFT** (the DCT used in real JPEG is its real-valued cousin —
same idea, slightly different basis).

```python
# ── Visualising JPEG-style compression via DCT ──────────────
import numpy as np
import matplotlib.pyplot as plt

# Build a synthetic 64×64 "image" with a smooth pattern + noise.
# Real photos are smooth at the patch level — the same logic applies.
N = 64
xx, yy = np.meshgrid(np.linspace(0, 1, N), np.linspace(0, 1, N))
img = 0.5 + 0.3 * np.sin(2 * np.pi * 3 * xx) * np.cos(2 * np.pi * 2 * yy) \
      + 0.2 * np.sin(2 * np.pi * 5 * yy)
img += 0.05 * np.random.default_rng(0).standard_normal(img.shape)
img = np.clip(img, 0, 1)

# For a faithful demo we use the 2-D FFT instead of the DCT.
# The compression argument is identical (sparsity in the spectrum); the
# DCT's only advantage is that it produces real coefficients, which is
# what JPEG actually exploits for its block-coded entropy stage.
C = np.fft.fft2(img)

# Keep only the top-K largest coefficients (by magnitude). This is
# essentially what JPEG quantisation accomplishes (coarsely).
def keep_top_k(coeffs, k):
    """Zero out all but the top-k largest-magnitude coefficients."""
    flat = coeffs.flatten()
    idx = np.argsort(np.abs(flat))[::-1]
    mask = np.zeros_like(flat, dtype=bool)
    mask[idx[:k]] = True
    return (flat * mask).reshape(coeffs.shape)

ks = [10, 50, 200, N * N]                        # last = no compression
fig, axes = plt.subplots(2, len(ks), figsize=(4 * len(ks), 8))

for col, k in enumerate(ks):
    C_kept = keep_top_k(C, k)
    recon = np.real(np.fft.ifft2(C_kept))
    err = np.linalg.norm(recon - img) / np.linalg.norm(img)

    ax = axes[0, col]
    ax.imshow(np.log10(np.abs(C_kept) + 1e-6), cmap="hot")
    ax.set_title(f"FFT coefs kept: {k}\n(bright = kept)" if k < N*N
                 else f"All {k} coefs (perfect)")
    ax.axis("off")

    ax = axes[1, col]
    ax.imshow(recon, cmap="gray", vmin=0, vmax=1)
    ax.set_title(f"Reconstruction\nrelative error = {err:.4f}")
    ax.axis("off")

plt.tight_layout()
plt.show()

# Print the compression ratio for each setting.
print(f"Image size: {N}×{N} = {N*N} numbers.\n")
print(f"{'coefs kept':>12}  {'ratio (orig:kept)':>20}  {'rel. error':>14}")
for k in ks:
    recon = np.real(np.fft.ifft2(keep_top_k(C, k)))
    err = np.linalg.norm(recon - img) / np.linalg.norm(img)
    print(f"  {k:>10}  {N*N // k:>14}×  {err:>14.4f}")
```

**Why this is THE killer application of Fourier-style transforms:**

- **Natural images and audio are *sparse in frequency*.** Most DCT
  coefficients of a typical image patch are nearly zero; a handful
  carry almost all the visual information. Keep those, throw away the
  rest, and you get JPEG-grade compression — 10× to 50× saving with
  imperceptible quality loss.
- **JPEG, MP3, AAC, H.264 / H.265, AV1 — all built on this idea.**
  JPEG and MPEG use the DCT directly; modern audio codecs use the
  *modified* DCT (MDCT) for overlap-add windowing. The mathematical
  core is the same: transform → quantise → entropy-code.
- **The same idea generalises.** Wavelet compression (JPEG2000)
  replaces the DCT with wavelets to handle sharp edges better.
  Modern *neural* compression (Ballé et al., the JPEG-XL family) is
  conceptually identical — a learned transform that produces a sparse
  representation, plus a learned quantiser. The architectural recipe
  comes straight from Fourier theory.

## Connection to CS / Games / AI / Business / Industry

- **JPEG/PNG/WebP** — image compression formats use DCT/wavelet transforms
- **MP3/AAC/Opus** — audio compression uses MDCT
- **Shazam** — music recognition via spectral fingerprinting
- **Noise cancellation** — AirPods analyse and cancel frequencies in real-time
- **MRI imaging** — raw data is in k-space (frequency domain); reconstructed via inverse FFT
- **Speech recognition** — mel spectrograms (frequency analysis) are input to neural networks
- **Bose, Sony WH-1000XM5, AirPods Pro 2 active noise cancellation** — DSP chips run real-time STFT/iSTFT pipelines to detect ambient noise spectra and inject 180°-phase cancellation, achieving >30 dB attenuation on commuter trains and aircraft.
- **Shazam (Apple) and Google Sound Search** — spectrogram peak fingerprinting indexes 30M+ tracks; a 4-second clip is hashed and matched in under a second, monetizing through Apple Music and Spotify referral revenue.
- **Earthquake early-warning (USGS ShakeAlert, Japan JMA)** — seismometers run FFTs on real-time ground motion to discriminate P-waves from noise, sending alerts to smartphones in California, Oregon, and Mexico City seconds before destructive S-waves arrive.
- **Industrial CT scanning for parts inspection (GE Phoenix v|tome|x, Nikon XT H)** — aerospace manufacturers like Boeing and Rolls-Royce reconstruct 3D X-ray volumes via filtered back-projection (Fourier slice theorem) to detect porosity in turbine blades before installation.

## Check Your Understanding

1. **Pen & paper:** If you zero out all DFT coefficients above index 5 (for a 64-point signal), what kind of filter is this?  What happens to the signal?
2. **Pen & paper:** JPEG quality 10 vs quality 90: which keeps more DCT coefficients?  Which has a smaller file size?
3. **Think about it:** Why does Shazam use spectral peaks rather than the raw audio waveform for matching?
