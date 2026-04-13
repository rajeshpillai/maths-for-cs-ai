# Fourier Series — Decompose a Periodic Signal

## Intuition

Any periodic function — no matter how jagged — can be written as a sum of
sines and cosines.  The Fourier series tells you **which** sines and cosines,
and **how much** of each.  It's like a recipe: "this signal is 60% of the
fundamental frequency, 20% of the third harmonic, 10% of the fifth..."

## Prerequisites

- Tier 9, Lesson 1: Periodic Functions
- Tier 3, Lesson 6: Integrals

## From First Principles

### The Fourier series

For a periodic function $f(x)$ with period $2\pi$:

$$f(x) = \frac{a_0}{2} + \sum_{n=1}^{\infty}\left[a_n \cos(nx) + b_n \sin(nx)\right]$$

### Computing the coefficients

$$a_0 = \frac{1}{\pi}\int_{-\pi}^{\pi} f(x)\,dx$$

$$a_n = \frac{1}{\pi}\int_{-\pi}^{\pi} f(x)\cos(nx)\,dx$$

$$b_n = \frac{1}{\pi}\int_{-\pi}^{\pi} f(x)\sin(nx)\,dx$$

### Why this works: orthogonality

Sines and cosines are **orthogonal** over one period:

$$\int_{-\pi}^{\pi}\sin(mx)\cos(nx)\,dx = 0 \quad \text{always}$$

$$\int_{-\pi}^{\pi}\sin(mx)\sin(nx)\,dx = \begin{cases} \pi & m = n \\ 0 & m \ne n \end{cases}$$

This is like how orthogonal vectors have zero dot product.  Multiplying by $\sin(nx)$ and integrating "picks out" only the $b_n$ coefficient.

### Pen & paper: Square wave

$f(x) = \begin{cases} 1 & 0 < x < \pi \\ -1 & -\pi < x < 0 \end{cases}$

**$a_0$:** $\frac{1}{\pi}\int_{-\pi}^{\pi} f(x)\,dx = \frac{1}{\pi}(-\pi + \pi) = 0$ (symmetric around zero)

**$a_n$:** $= 0$ (because $f$ is odd and $\cos$ is even → odd × even = odd → integrates to 0)

**$b_n$:**

$b_n = \frac{1}{\pi}\left[\int_{-\pi}^{0}(-1)\sin(nx)\,dx + \int_{0}^{\pi}(1)\sin(nx)\,dx\right]$

$= \frac{1}{\pi}\left[\frac{\cos(nx)}{n}\Big|_{-\pi}^{0} + \frac{-\cos(nx)}{n}\Big|_{0}^{\pi}\right]$

$= \frac{1}{n\pi}\left[(1 - \cos(-n\pi)) + (-\cos(n\pi) + 1)\right]$

$= \frac{2}{n\pi}(1 - \cos(n\pi))$

$\cos(n\pi) = (-1)^n$, so:

$b_n = \frac{2}{n\pi}(1 - (-1)^n) = \begin{cases} \frac{4}{n\pi} & n \text{ odd} \\ 0 & n \text{ even} \end{cases}$

**Result:**

$$f(x) = \frac{4}{\pi}\left[\sin(x) + \frac{\sin(3x)}{3} + \frac{\sin(5x)}{5} + \cdots\right]$$

### Complex form (preview)

$$f(x) = \sum_{n=-\infty}^{\infty} c_n e^{inx}$$

where $c_n = \frac{1}{2\pi}\int_{-\pi}^{\pi}f(x)e^{-inx}\,dx$

Using Euler's formula $e^{ix} = \cos x + i\sin x$, this combines sine and cosine into one compact formula.

## Python Verification

```python
# ── Fourier Series ──────────────────────────────────────────
import math

# Square wave Fourier coefficients
print("=== Square wave Fourier coefficients ===")
for n in range(1, 12):
    if n % 2 == 1:
        b_n = 4 / (n * math.pi)
        print(f"  b_{n} = {b_n:.4f}")
    else:
        print(f"  b_{n} = 0")

# Reconstruct square wave with N terms
print(f"\n=== Square wave reconstruction ===")
def square_fourier(x, N):
    total = 0
    for k in range(N):
        n = 2*k + 1
        total += math.sin(n * x) / n
    return total * 4 / math.pi

# Compare at x = π/2 (should be 1)
for N in [1, 3, 5, 10, 50]:
    val = square_fourier(math.pi/2, N)
    print(f"  {N:2d} terms: f(π/2) = {val:.6f} (target: 1.0)")

# Reconstruct at several points
print(f"\n=== Reconstruction with 20 terms ===")
for x_frac in [0.1, 0.25, 0.5, 0.75, 0.9]:
    x = x_frac * math.pi
    actual = 1.0  # square wave is 1 for 0 < x < π
    approx = square_fourier(x, 20)
    print(f"  x={x_frac}π: approx={approx:.4f}, actual={actual:.1f}")

# Gibbs phenomenon: overshoot near discontinuity
print(f"\n=== Gibbs phenomenon (overshoot at discontinuity) ===")
for N in [5, 20, 100, 500]:
    # Check near x = 0+ (just after the jump)
    val = square_fourier(0.01, N)
    print(f"  {N:3d} terms at x≈0+: {val:.4f} (overshoot ≈ {val - 0:.1%})")
```

## Connection to CS / Games / AI

- **Audio compression** — MP3 uses a variant (MDCT) to keep important frequencies, discard others
- **Image compression** — JPEG uses 2D DCT (discrete cosine transform, closely related)
- **Equalizers** — boost/cut specific frequency bands
- **Signal filtering** — remove noise by zeroing high-frequency Fourier coefficients
- **Spectrograms** — time-frequency plots used in speech recognition and music analysis

## Check Your Understanding

1. **Pen & paper:** Compute $a_0, a_1, b_1$ for $f(x) = x$ on $[-\pi, \pi]$.
2. **Pen & paper:** Why are all $a_n = 0$ for the square wave?  (Hint: think about even/odd symmetry.)
3. **Think about it:** The Gibbs phenomenon says the overshoot near a discontinuity never fully goes away, even with infinite terms.  Why might this matter in audio processing?
