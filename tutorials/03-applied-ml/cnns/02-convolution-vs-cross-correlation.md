# Convolution vs Cross-Correlation

## Intuition

There's a dirty secret in deep learning: what everyone calls "convolution" in
CNNs is actually **cross-correlation**.  True mathematical convolution flips
the kernel first.  For learned kernels it doesn't matter (the network just
learns the flipped version), but understanding the distinction matters for
signal processing and connecting CNN operations to Fourier theory.

## Prerequisites

- Tier 7, Lesson 1: 2D Convolution

## From First Principles

### True convolution (mathematics)

$$(f * g)[i] = \sum_{k} f[k] \cdot g[i - k]$$

Note the **$i - k$**: this means the kernel $g$ is **flipped** (reversed) before sliding.

In 2D:

$$(I * K)[i, j] = \sum_m \sum_n I[i - m, j - n] \cdot K[m, n]$$

### Cross-correlation (what CNNs actually compute)

$$(I \star K)[i, j] = \sum_m \sum_n I[i + m, j + n] \cdot K[m, n]$$

Note **$i + m$**: no flipping.  This is what we computed in Lesson 1.

### Pen & paper: See the difference

Signal: $f = [1, 2, 3, 4, 5]$, Kernel: $k = [1, 2, 3]$

**Cross-correlation (CNN-style):**

| Position | Window | Dot product |
|----------|--------|-------------|
| 0 | $[1, 2, 3]$ | $1(1) + 2(2) + 3(3) = 14$ |
| 1 | $[2, 3, 4]$ | $2(1) + 3(2) + 4(3) = 20$ |
| 2 | $[3, 4, 5]$ | $3(1) + 4(2) + 5(3) = 26$ |

**True convolution (flip kernel first):**

Flipped kernel: $k' = [3, 2, 1]$

| Position | Window | Dot product |
|----------|--------|-------------|
| 0 | $[1, 2, 3]$ | $1(3) + 2(2) + 3(1) = 10$ |
| 1 | $[2, 3, 4]$ | $2(3) + 3(2) + 4(1) = 16$ |
| 2 | $[3, 4, 5]$ | $3(3) + 4(2) + 5(1) = 22$ |

Different outputs!  (Unless the kernel is symmetric.)

### When does it matter?

**In CNNs: it doesn't matter.** The kernel is learned, so if the network needs the "flipped" version, it just learns those weights directly.

**In signal processing: it matters.**
- **Convolution theorem**: $\mathcal{F}(f * g) = \mathcal{F}(f) \cdot \mathcal{F}(g)$ — only works with true convolution
- **Commutativity**: $f * g = g * f$ — true convolution is commutative, cross-correlation is not

### Properties of true convolution

| Property | Convolution | Cross-correlation |
|----------|------------|------------------|
| Commutative | $f * g = g * f$ ✓ | Not in general ✗ |
| Associative | $(f * g) * h = f * (g * h)$ ✓ | ✗ |
| Distributive | $f * (g + h) = f*g + f*h$ ✓ | ✓ |
| Fourier property | $\mathcal{F}(f*g) = \mathcal{F}(f)\mathcal{F}(g)$ | Different formula |

### When is conv = cross-corr?

When the kernel is **symmetric** (invariant to flipping):

$$K[m, n] = K[-m, -n]$$

Example: Gaussian blur kernel is symmetric → conv = cross-corr.

### What deep learning frameworks do

- **PyTorch `nn.Conv2d`**: computes **cross-correlation** (despite the name)
- **TensorFlow `tf.nn.conv2d`**: also cross-correlation
- **SciPy `signal.convolve2d`**: true mathematical convolution

The documentation sometimes says "convolution" but means cross-correlation.  Always check.

## Python Verification

```python
# ── Convolution vs Cross-Correlation ────────────────────────

signal = [1, 2, 3, 4, 5]
kernel = [1, 2, 3]
k_len = len(kernel)

# Cross-correlation (CNN-style: no flip)
print("=== Cross-correlation ===")
cc = []
for i in range(len(signal) - k_len + 1):
    val = sum(signal[i+j] * kernel[j] for j in range(k_len))
    cc.append(val)
    print(f"  pos {i}: {signal[i:i+k_len]} · {kernel} = {val}")
print(f"  Result: {cc}")

# True convolution (flip kernel first)
print(f"\n=== True convolution (flip kernel) ===")
kernel_flipped = kernel[::-1]
print(f"  Flipped kernel: {kernel_flipped}")
conv = []
for i in range(len(signal) - k_len + 1):
    val = sum(signal[i+j] * kernel_flipped[j] for j in range(k_len))
    conv.append(val)
    print(f"  pos {i}: {signal[i:i+k_len]} · {kernel_flipped} = {val}")
print(f"  Result: {conv}")

# They're different!
print(f"\n  Same? {cc == conv}")

# Symmetric kernel: conv = cross-corr
print(f"\n=== Symmetric kernel ===")
sym_kernel = [1, 2, 1]
cc_sym = []
conv_sym = []
for i in range(len(signal) - 3 + 1):
    cc_sym.append(sum(signal[i+j] * sym_kernel[j] for j in range(3)))
    conv_sym.append(sum(signal[i+j] * sym_kernel[::-1][j] for j in range(3)))
print(f"  Cross-corr: {cc_sym}")
print(f"  Convolution: {conv_sym}")
print(f"  Same? {cc_sym == conv_sym}")

# 2D example
print(f"\n=== 2D: Cross-correlation vs Convolution ===")
img = [[1, 2, 3],
       [4, 5, 6],
       [7, 8, 9]]

kernel_2d = [[1, 0],
             [0, -1]]

# Cross-correlation
print("Cross-correlation with [[1,0],[0,-1]]:")
for i in range(2):
    row = []
    for j in range(2):
        val = sum(img[i+m][j+n] * kernel_2d[m][n] for m in range(2) for n in range(2))
        row.append(val)
    print(f"  {row}")

# True convolution (flip kernel 180°)
kernel_flipped_2d = [[kernel_2d[1-m][1-n] for n in range(2)] for m in range(2)]
print(f"\nFlipped kernel: {kernel_flipped_2d}")
print("True convolution:")
for i in range(2):
    row = []
    for j in range(2):
        val = sum(img[i+m][j+n] * kernel_flipped_2d[m][n] for m in range(2) for n in range(2))
        row.append(val)
    print(f"  {row}")
```

## Visualisation — The kernel-flip difference

True convolution and cross-correlation differ by a single step: **flip
the kernel both horizontally and vertically before sliding**. For
asymmetric kernels the two operations give different results; for
symmetric kernels (Gaussian blur, etc.) they're identical.

```python
# ── Visualising convolution vs cross-correlation ────────────
import numpy as np
import matplotlib.pyplot as plt

# A deliberately asymmetric kernel so the two operations differ visibly.
# Left edge is +1, right edge is -2 → it picks up a horizontal gradient
# in one direction. Flipping it (true convolution) reverses the sign.
kernel_xcorr = np.array([[ 1, 0, -2],
                         [ 1, 0, -2],
                         [ 1, 0, -2]], dtype=float)
kernel_conv  = np.flip(kernel_xcorr)        # flip both axes

# A test image with a sharp light → dark transition in one direction.
img = np.zeros((20, 20))
img[:, :10] = 1.0                           # left half white, right half black

def correlate2d(image, kernel):
    """Slide the kernel as-is (cross-correlation, what CNNs use)."""
    H, W = image.shape; kH, kW = kernel.shape
    out = np.zeros((H - kH + 1, W - kW + 1))
    for i in range(out.shape[0]):
        for j in range(out.shape[1]):
            out[i, j] = (image[i:i + kH, j:j + kW] * kernel).sum()
    return out

xcorr_out = correlate2d(img, kernel_xcorr)
conv_out  = correlate2d(img, kernel_conv)        # cross-correlate with FLIPPED kernel
                                                  # = true convolution

fig, axes = plt.subplots(1, 4, figsize=(16, 4.5))

# (1) Input image.
axes[0].imshow(img, cmap="gray", vmin=0, vmax=1)
axes[0].set_title("Input image\n(left half bright, right half dark)")
axes[0].axis("off")

# (2) The kernel as displayed in the cross-correlation framing.
axes[1].imshow(kernel_xcorr, cmap="RdBu", vmin=-2, vmax=2)
for i in range(3):
    for j in range(3):
        axes[1].text(j, i, f"{kernel_xcorr[i, j]:+.0f}",
                     ha="center", va="center", fontsize=11, fontweight="bold")
axes[1].set_title("Kernel K (as written)\n→ used by 'cross-correlation'")
axes[1].set_xticks([]); axes[1].set_yticks([])

# (3) Cross-correlation output.
im = axes[2].imshow(xcorr_out, cmap="RdBu", vmin=-3, vmax=3)
axes[2].set_title("Cross-correlation: K * img\n(slide K as-is)")
axes[2].axis("off")
plt.colorbar(im, ax=axes[2], fraction=0.046)

# (4) True convolution output: same input, but FLIPPED kernel.
im = axes[3].imshow(conv_out, cmap="RdBu", vmin=-3, vmax=3)
axes[3].set_title("True convolution: flip(K) * img\n(opposite sign)")
axes[3].axis("off")
plt.colorbar(im, ax=axes[3], fraction=0.046)

plt.tight_layout()
plt.show()

# Print to make it crystal-clear that the only difference is the flip.
print("Original kernel (cross-correlation):")
print(kernel_xcorr.astype(int))
print("\nFlipped kernel (true convolution):")
print(kernel_conv.astype(int))
print()
print(f"Cross-corr output sample:  {xcorr_out[5, 7]:+.1f}    "
      f"True conv output sample:   {conv_out[5, 7]:+.1f}")
print(f"They are *exactly negatives* of each other for this asymmetric kernel.")
print("\nFor a symmetric kernel (e.g. Gaussian blur), flip(K) == K, so the two\n"
      "operations give identical results — which is why ML literature says\n"
      "'convolution' but means 'cross-correlation', without any practical loss.")
```

**Why ML libraries say *convolution* but compute *cross-correlation*:**

- The mathematical definition of convolution involves a kernel flip:
  $(f * g)(x) = \int f(\tau)\, g(x - \tau)\, d\tau$. The minus sign is
  what flips the kernel.
- Cross-correlation drops the flip: $(f \star g)(x) = \int f(\tau)\,
  g(x + \tau)\, d\tau$. This is what every CNN library (PyTorch's
  `Conv2d`, TensorFlow's `tf.nn.conv2d`, JAX's `lax.conv`) actually
  computes when you call its "convolution" function.
- **Why doesn't it matter?** During training the kernel weights are
  *learned*. If a true-convolution implementation would learn weight
  $W$, the cross-correlation implementation simply learns $\text{flip}(W)$
  instead. The output is identical, just with internal weights stored
  in flipped order. So the choice is a trivial naming-convention
  question for ML.
- **When the flip matters:** signal processing, the convolution
  theorem (lesson 9-Fourier), and any algebraic manipulation that
  uses the *associativity* and *commutativity* of true convolution.
  Cross-correlation is *not* commutative.

## Connection to CS / Games / AI / Business / Industry

- **All CNN frameworks** — compute cross-correlation, call it "convolution"
- **Signal processing** — true convolution is needed for Fourier analysis (Tier 9)
- **Convolution theorem** — multiply in frequency domain = convolve in spatial domain (only for true convolution)
- **Reversibility** — true convolution's commutativity matters for deconvolution (image restoration)
- **Engineering / Audio**: **Dolby Atmos** room-correction and **Sonos Trueplay** apply true convolution (with the convolution theorem via FFT) to multiply room impulse responses with audio in real time — cross-correlation would not preserve the necessary algebraic identities.
- **Industry / Astronomy**: the **Hubble Space Telescope deconvolution** that fixed the original 1990 mirror flaw used true convolution's commutativity to invert the point-spread function; same trick now used in **JWST** image processing.
- **Business / Photography**: **Adobe Photoshop's "Shake Reduction" filter** and **Topaz Sharpen AI** perform deconvolution-based deblurring — only mathematically valid because true convolution (not cross-correlation) is commutative.
- **Engineering / Telecoms**: **5G base-station signal processing** uses cross-correlation for matched-filter detection of pilot symbols — the kernel is intentionally not flipped because alignment, not algebraic identity, is what matters.

## Check Your Understanding

1. **Pen & paper:** Compute both cross-correlation and true convolution of $f = [2, 1, 3]$ with $k = [1, -1]$.
2. **Pen & paper:** Show that for a symmetric 2D kernel $\begin{pmatrix} 1 & 2 & 1 \\ 2 & 4 & 2 \\ 1 & 2 & 1 \end{pmatrix}$, convolution and cross-correlation give the same result.
3. **Think about it:** If CNNs use cross-correlation, why do we still call them "convolutional" neural networks?
