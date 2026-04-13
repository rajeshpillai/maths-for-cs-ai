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

## Connection to CS / Games / AI

- **All CNN frameworks** — compute cross-correlation, call it "convolution"
- **Signal processing** — true convolution is needed for Fourier analysis (Tier 9)
- **Convolution theorem** — multiply in frequency domain = convolve in spatial domain (only for true convolution)
- **Reversibility** — true convolution's commutativity matters for deconvolution (image restoration)

## Check Your Understanding

1. **Pen & paper:** Compute both cross-correlation and true convolution of $f = [2, 1, 3]$ with $k = [1, -1]$.
2. **Pen & paper:** Show that for a symmetric 2D kernel $\begin{pmatrix} 1 & 2 & 1 \\ 2 & 4 & 2 \\ 1 & 2 & 1 \end{pmatrix}$, convolution and cross-correlation give the same result.
3. **Think about it:** If CNNs use cross-correlation, why do we still call them "convolutional" neural networks?
