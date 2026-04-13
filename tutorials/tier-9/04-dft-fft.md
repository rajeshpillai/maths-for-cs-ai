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

## Connection to CS / Games / AI

- **Audio processing** — spectrum analysis, pitch detection, noise removal
- **Image processing** — FFT-based convolution is $O(N \log N)$ vs $O(N \cdot K)$
- **Multiplication** — FFT-based polynomial/integer multiplication
- **Signal compression** — keep large coefficients, discard small ones
- **NumPy/SciPy** — `np.fft.fft()` uses the Cooley-Tukey FFT

## Check Your Understanding

1. **Pen & paper:** Compute the DFT of $[1, 1, 1, 1]$.  What frequency content does a constant signal have?
2. **Pen & paper:** If you sample a signal at 44,100 Hz (CD quality), what is the highest frequency you can detect?
3. **Think about it:** Why must $N$ be a power of 2 for the simplest FFT algorithm?
