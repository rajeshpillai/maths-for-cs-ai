# Discrete Fourier Transform (DFT) and the FFT Algorithm

## Intuition

Computers work with **sampled** (discrete) data, not continuous functions.
The **DFT** is the Fourier Transform for finite sequences.  The **FFT**
(Fast Fourier Transform) computes the DFT in $O(n \log n)$ instead of
$O(n^2)$ — one of the most important algorithms ever invented.

## Prerequisites

- Tier 9, Lesson 3: Fourier Transform
- Tier 0, Lesson 1: Complex Numbers

## From First Principles

### The DFT

For a sequence $x[0], x[1], \ldots, x[N-1]$:

$$X[k] = \sum_{n=0}^{N-1} x[n] \cdot e^{-i 2\pi kn/N}, \quad k = 0, 1, \ldots, N-1$$

$X[k]$ = the amount of frequency $k$ in the signal.

### Inverse DFT

$$x[n] = \frac{1}{N}\sum_{k=0}^{N-1} X[k] \cdot e^{i 2\pi kn/N}$$

### Pen & paper: DFT of [1, 0, -1, 0]

$N = 4$.  $W = e^{-i2\pi/4} = e^{-i\pi/2} = -i$.

$W^0 = 1$, $W^1 = -i$, $W^2 = -1$, $W^3 = i$

$X[0] = 1(1) + 0(1) + (-1)(1) + 0(1) = 0$

$X[1] = 1(1) + 0(-i) + (-1)(-1) + 0(i) = 1 + 1 = 2$

$X[2] = 1(1) + 0(-1) + (-1)(1) + 0(-1) = 0$

$X[3] = 1(1) + 0(i) + (-1)(-1) + 0(-i) = 2$

Result: $X = [0, 2, 0, 2]$.  The signal has energy at frequencies 1 and 3 (which are $\sin$ components).

### The FFT (Cooley-Tukey algorithm)

**Key insight:** Split the DFT into even-indexed and odd-indexed terms:

$$X[k] = \underbrace{\sum_{m} x[2m]\, W^{2mk}}_{\text{DFT of even samples}} + W^k \underbrace{\sum_{m} x[2m+1]\, W^{2mk}}_{\text{DFT of odd samples}}$$

Two half-size DFTs + $N$ multiplications.  Recurse.

**Complexity:** $T(N) = 2T(N/2) + O(N) \Rightarrow T(N) = O(N \log N)$

For $N = 10^6$: DFT takes $10^{12}$ operations, FFT takes $\sim 2 \times 10^7$.  That's 50,000× faster.

### Practical considerations

- FFT works best when $N$ is a power of 2 (zero-pad if needed)
- Frequency resolution = sample rate / N
- Nyquist theorem: can only detect frequencies up to half the sample rate

## Python Verification

```python
# ── DFT and FFT ─────────────────────────────────────────────
import math

# Manual DFT
def dft(x):
    N = len(x)
    X = []
    for k in range(N):
        real = sum(x[n] * math.cos(2*math.pi*k*n/N) for n in range(N))
        imag = sum(-x[n] * math.sin(2*math.pi*k*n/N) for n in range(N))
        X.append((real, imag))
    return X

# DFT of [1, 0, -1, 0]
print("=== DFT of [1, 0, -1, 0] ===")
x = [1, 0, -1, 0]
X = dft(x)
for k, (re, im) in enumerate(X):
    mag = math.sqrt(re**2 + im**2)
    print(f"  X[{k}] = {re:+.2f} {im:+.2f}i, |X[{k}]| = {mag:.2f}")

# DFT of a sine wave
print(f"\n=== DFT of sin(2π·2t) sampled at 8 points ===")
N = 8
x = [math.sin(2*math.pi*2*n/N) for n in range(N)]
print(f"  Samples: {[f'{v:.3f}' for v in x]}")
X = dft(x)
for k in range(N):
    mag = math.sqrt(X[k][0]**2 + X[k][1]**2)
    if mag > 0.01:
        print(f"  X[{k}]: magnitude = {mag:.2f} ← frequency {k}")

# FFT complexity comparison
print(f"\n=== Complexity: DFT vs FFT ===")
for N in [64, 256, 1024, 4096, 1000000]:
    dft_ops = N * N
    fft_ops = int(N * math.log2(N)) if N > 0 else 0
    speedup = dft_ops / fft_ops if fft_ops > 0 else 0
    print(f"  N={N:>8,}: DFT={dft_ops:>15,}, FFT={fft_ops:>12,}, speedup={speedup:.0f}×")

# Inverse DFT
print(f"\n=== Inverse DFT: recover original signal ===")
x_original = [1, 0, -1, 0]
X = dft(x_original)
N = len(X)
x_recovered = []
for n in range(N):
    val = sum(X[k][0]*math.cos(2*math.pi*k*n/N) - X[k][1]*math.sin(2*math.pi*k*n/N) for k in range(N)) / N
    x_recovered.append(round(val, 6))
print(f"  Original:  {x_original}")
print(f"  Recovered: {x_recovered}")
```

## Visualisation — From a noisy signal to its frequency spectrum

This is where the FFT really shines: take a real-looking time-domain
signal (one or two pure tones plus noise), compute its FFT, and watch
the *spikes* in the spectrum reveal the hidden frequencies.

```python
# ── Visualising DFT/FFT on a synthetic signal ───────────────
import numpy as np
import matplotlib.pyplot as plt

# Build a 1 second-long signal sampled at 1000 Hz containing two
# pure tones (50 Hz and 120 Hz), plus white noise.
fs = 1000                                 # sample rate (Hz)
T  = 1.0                                  # duration (s)
N  = int(fs * T)
t  = np.linspace(0, T, N, endpoint=False)
clean = np.sin(2 * np.pi * 50 * t) + 0.5 * np.sin(2 * np.pi * 120 * t)
rng = np.random.default_rng(42)
noisy = clean + 1.5 * rng.standard_normal(N)

# Compute FFT and frequencies. Only positive-frequency half is shown
# (the spectrum of a real signal is symmetric).
X = np.fft.fft(noisy)
freqs = np.fft.fftfreq(N, d=1/fs)
half = N // 2
freqs_pos = freqs[:half]
amplitude = (2 / N) * np.abs(X[:half])

fig, axes = plt.subplots(1, 3, figsize=(16, 4.8))

# (1) Time domain — looks like noise.
ax = axes[0]
ax.plot(t, noisy, color="tab:blue", lw=0.6, alpha=0.75, label="noisy signal")
ax.plot(t, clean, color="tab:orange", lw=1.2, alpha=0.7,
        label="hidden clean signal")
ax.set_xlim(0, 0.2)                       # show only first 200 ms
ax.set_xlabel("time (s)"); ax.set_ylabel("amplitude")
ax.set_title("Time domain — looks like noise.\nCan you spot the 50 Hz and 120 Hz tones?")
ax.legend(); ax.grid(True, alpha=0.3)

# (2) Frequency domain — same data, but the FFT pulls the tones out.
ax = axes[1]
ax.plot(freqs_pos, amplitude, color="tab:red", lw=1.5)
ax.axvline(50,  color="tab:green", linestyle="--", lw=1, label="50 Hz tone")
ax.axvline(120, color="tab:purple", linestyle="--", lw=1, label="120 Hz tone")
ax.set_xlim(0, 200); ax.set_xlabel("frequency (Hz)"); ax.set_ylabel("amplitude")
ax.set_title("FFT spectrum — sharp spikes\nat 50 Hz and 120 Hz")
ax.legend(); ax.grid(True, alpha=0.3)

# (3) FFT vs DFT speed scaling. Naive DFT is O(N²), FFT is O(N log N).
# At N = 10⁶, DFT would take *minutes* and FFT takes *milliseconds*.
ax = axes[2]
Ns = np.array([16, 64, 256, 1024, 4096, 16384, 65536, 262144, 1048576])
naive_ops = Ns * Ns
fft_ops   = Ns * np.log2(Ns)
ax.loglog(Ns, naive_ops, "o-", color="tab:red",  lw=2, label="naive DFT: $O(N^2)$")
ax.loglog(Ns, fft_ops,   "s-", color="tab:green", lw=2, label="FFT:        $O(N \\log N)$")
ax.set_xlabel("N (signal length)"); ax.set_ylabel("multiplications (log)")
ax.set_title("Why every signal-processing library uses the FFT")
ax.legend(); ax.grid(True, which="both", alpha=0.3)

plt.tight_layout()
plt.show()

# Print the speed-up at a few sizes.
print(f"{'N':>10}  {'naive DFT (N²)':>20}  {'FFT (N log N)':>16}  {'speed-up':>10}")
for n in [1024, 16384, 1_000_000]:
    naive = n * n
    fft   = n * np.log2(n)
    print(f"  {n:>8}  {naive:>20,.0f}  {fft:>16,.0f}  {naive/fft:>10,.0f}×")
```

**Three plots, one big idea:**

- **Time domain ↔ frequency domain are two views of the same signal.**
  In time you see how amplitude wiggles instant-by-instant. In
  frequency you see *which sines* it's made of. The FFT is the
  procedure that switches view.
- **Hidden periodicity becomes obvious in frequency.** Even when noise
  swamps the time-domain plot, sharp spikes in the spectrum reveal the
  underlying tones immediately. This is exactly what spectrum
  analysers, pitch detectors, MP3 encoders, and JPEG compressors all
  exploit.
- **Why we say "FFT" not "DFT".** The naive DFT is $O(N^2)$; the
  Cooley–Tukey FFT is $O(N \log N)$. At $N = 10^6$, that's a 50,000×
  speed-up. The FFT is arguably the most important algorithm of the
  20th century — it's what made radar, MRI, real-time audio, and
  modern wireless possible.

## Connection to CS / Games / AI / Business / Industry

- **Audio processing** — spectrum analysis, pitch detection, noise removal
- **Image processing** — FFT-based convolution is $O(N \log N)$ vs $O(N \cdot K)$
- **Multiplication** — FFT-based polynomial/integer multiplication
- **Signal compression** — keep large coefficients, discard small ones
- **NumPy/SciPy** — `np.fft.fft()` uses the Cooley-Tukey FFT
- **Software-defined radio (SDR) — RTL-SDR, Ettus USRP, Anduril Lattice** — military and commercial SDRs run real-time FFTs on GHz-bandwidth IQ streams to detect drone telemetry, GPS jamming, and rogue cell towers.
- **Vibration analysis on jet engines (GE9X, Pratt & Whitney GTF)** — accelerometer FFT spectra reveal blade-pass and bearing-cage frequencies; airline maintenance crews at Delta and Lufthansa use these signatures to predict component failures days before they ground aircraft.
- **High-frequency-trading FPGA market-data feeds** — firms like Jump and Citadel run custom-silicon FFTs on order-book microstructure to extract cyclical patterns at sub-microsecond latency.
- **Square Kilometre Array radio telescope (SKA-Low, SKA-Mid)** — petabyte-per-second sky data is correlated via parallel FFT pipelines on FPGAs, allowing astronomers to image distant galaxies and search for fast radio bursts.

## Check Your Understanding

1. **Pen & paper:** Compute the DFT of $[1, 1, 1, 1]$.  What frequency content does a constant signal have?
2. **Pen & paper:** If you sample a signal at 44,100 Hz (CD quality), what is the highest frequency you can detect?
3. **Think about it:** Why must $N$ be a power of 2 for the simplest FFT algorithm?
