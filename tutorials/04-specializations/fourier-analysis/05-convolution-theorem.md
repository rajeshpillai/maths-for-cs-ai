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

## Connection to CS / Games / AI

- **Image processing** — large-kernel blur/sharpen via FFT
- **Audio effects** — reverb = convolution with impulse response (done via FFT)
- **CNNs** — some implementations use FFT for large kernels (though Winograd is more common)
- **Polynomial multiplication** — FFT multiplies two polynomials in $O(N \log N)$
- **Cross-correlation** — template matching in images

## Check Your Understanding

1. **Pen & paper:** Verify the convolution theorem for $f = [1, 1]$ and $g = [1, -1]$: compute $f * g$ directly, then via DFT multiplication.
2. **Pen & paper:** If you zero out all DFT coefficients except $X[0]$, what signal do you get back?  (Hint: it's the mean.)
3. **Think about it:** Why is the convolution theorem central to signal processing but less used in modern CNNs?
