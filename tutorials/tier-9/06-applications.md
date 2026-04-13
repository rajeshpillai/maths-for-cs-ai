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

## Connection to CS / Games / AI

- **JPEG/PNG/WebP** — image compression formats use DCT/wavelet transforms
- **MP3/AAC/Opus** — audio compression uses MDCT
- **Shazam** — music recognition via spectral fingerprinting
- **Noise cancellation** — AirPods analyse and cancel frequencies in real-time
- **MRI imaging** — raw data is in k-space (frequency domain); reconstructed via inverse FFT
- **Speech recognition** — mel spectrograms (frequency analysis) are input to neural networks

## Check Your Understanding

1. **Pen & paper:** If you zero out all DFT coefficients above index 5 (for a 64-point signal), what kind of filter is this?  What happens to the signal?
2. **Pen & paper:** JPEG quality 10 vs quality 90: which keeps more DCT coefficients?  Which has a smaller file size?
3. **Think about it:** Why does Shazam use spectral peaks rather than the raw audio waveform for matching?
