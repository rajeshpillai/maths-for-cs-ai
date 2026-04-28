# 2D Convolution from First Principles

## Intuition

A convolution slides a small grid of numbers (the **kernel**) over an image,
computing a weighted sum at each position.  Different kernels detect different
features: edges, corners, textures.  A CNN **learns** these kernels
automatically from data, discovering the features that matter for the task.

## Prerequisites

- Tier 2, Lesson 2: Vector Operations (dot product)
- Tier 2, Lesson 4: Matrix Multiplication

## From First Principles

### 1D convolution first

Given signal $f = [1, 3, 2, 5, 4]$ and kernel $k = [1, 0, -1]$:

Slide the kernel across the signal, computing the dot product at each position:

| Position | Window | Dot product |
|----------|--------|-------------|
| 0 | $[1, 3, 2]$ | $1(1) + 3(0) + 2(-1) = -1$ |
| 1 | $[3, 2, 5]$ | $3(1) + 2(0) + 5(-1) = -2$ |
| 2 | $[2, 5, 4]$ | $2(1) + 5(0) + 4(-1) = -2$ |

Output: $[-1, -2, -2]$

This kernel computes $f[i] - f[i+2]$ — a **difference filter** (detects changes).

### 2D convolution

For an image $\mathbf{I}$ (matrix) and kernel $\mathbf{K}$ (small matrix):

$$(I * K)[i, j] = \sum_{m} \sum_{n} I[i+m, j+n] \cdot K[m, n]$$

Slide the kernel over every position of the image, compute the element-wise product, sum it up.

### Pen & paper: 3×3 kernel on a 4×4 image

$$\mathbf{I} = \begin{pmatrix} 1 & 2 & 3 & 0 \\ 0 & 1 & 2 & 3 \\ 3 & 0 & 1 & 2 \\ 2 & 3 & 0 & 1 \end{pmatrix}, \quad \mathbf{K} = \begin{pmatrix} 1 & 0 & -1 \\ 1 & 0 & -1 \\ 1 & 0 & -1 \end{pmatrix}$$

This kernel detects **vertical edges** (differences between left and right).

**Position (0,0):** Window = top-left 3×3 of I:

$$\begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 2 \\ 3 & 0 & 1 \end{pmatrix} \odot \begin{pmatrix} 1 & 0 & -1 \\ 1 & 0 & -1 \\ 1 & 0 & -1 \end{pmatrix}$$

$= 1(1) + 2(0) + 3(-1) + 0(1) + 1(0) + 2(-1) + 3(1) + 0(0) + 1(-1)$

$= 1 + 0 - 3 + 0 + 0 - 2 + 3 + 0 - 1 = -2$

**Position (0,1):**

$$\begin{pmatrix} 2 & 3 & 0 \\ 1 & 2 & 3 \\ 0 & 1 & 2 \end{pmatrix} \odot \mathbf{K} = 2 - 0 + 1 - 3 + 0 - 2 = -2$$

**Position (1,0):**

$$\begin{pmatrix} 0 & 1 & 2 \\ 3 & 0 & 1 \\ 2 & 3 & 0 \end{pmatrix} \odot \mathbf{K} = 0 - 2 + 3 - 1 + 2 + 0 = 2$$

**Position (1,1):**

$$\begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 2 \\ 3 & 0 & 1 \end{pmatrix} \odot \mathbf{K} = 1 - 3 + 0 - 2 + 3 - 1 = -2$$

**Output (2×2):**

$$\begin{pmatrix} -2 & -2 \\ 2 & -2 \end{pmatrix}$$

### Output size formula

For input size $W$, kernel size $K$:

$$W_{\text{out}} = W - K + 1$$

Our example: $4 - 3 + 1 = 2$ ✓

### Common kernels (pen & paper)

**Identity (does nothing):**
$$\begin{pmatrix} 0 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 0 \end{pmatrix}$$

**Edge detection (Sobel-x, vertical edges):**
$$\begin{pmatrix} -1 & 0 & 1 \\ -2 & 0 & 2 \\ -1 & 0 & 1 \end{pmatrix}$$

**Blur (averaging):**
$$\frac{1}{9}\begin{pmatrix} 1 & 1 & 1 \\ 1 & 1 & 1 \\ 1 & 1 & 1 \end{pmatrix}$$

**Sharpen:**
$$\begin{pmatrix} 0 & -1 & 0 \\ -1 & 5 & -1 \\ 0 & -1 & 0 \end{pmatrix}$$

### Why convolution for images?

1. **Translation invariance** — the same kernel detects the same feature anywhere in the image
2. **Parameter sharing** — one 3×3 kernel has 9 parameters, regardless of image size (vs. millions for a fully connected layer)
3. **Local connectivity** — each output depends only on a small local patch, matching how visual features work

## Python Verification

```python
# ── 2D Convolution: verifying pen & paper work ──────────────

# 1D convolution
print("=== 1D Convolution ===")
signal = [1, 3, 2, 5, 4]
kernel = [1, 0, -1]
k_size = len(kernel)

output_1d = []
for i in range(len(signal) - k_size + 1):
    window = signal[i:i+k_size]
    val = sum(s * k for s, k in zip(window, kernel))
    output_1d.append(val)
    print(f"  pos {i}: {window} · {kernel} = {val}")
print(f"  Output: {output_1d}")

# 2D convolution
print(f"\n=== 2D Convolution ===")
I = [[1, 2, 3, 0],
     [0, 1, 2, 3],
     [3, 0, 1, 2],
     [2, 3, 0, 1]]

K = [[1, 0, -1],
     [1, 0, -1],
     [1, 0, -1]]

H, W = len(I), len(I[0])
kH, kW = len(K), len(K[0])
oH, oW = H - kH + 1, W - kW + 1

output_2d = [[0]*oW for _ in range(oH)]
for i in range(oH):
    for j in range(oW):
        val = 0
        for m in range(kH):
            for n in range(kW):
                val += I[i+m][j+n] * K[m][n]
        output_2d[i][j] = val

print("Input:")
for row in I:
    print(f"  {row}")
print(f"Kernel: {K[0]}")
print(f"         {K[1]}")
print(f"         {K[2]}")
print(f"Output ({oH}×{oW}):")
for row in output_2d:
    print(f"  {row}")

# Common kernels demo
print(f"\n=== Edge detection (Sobel-x) ===")
# Simple test image: bright on left, dark on right
img = [[255, 255, 0, 0],
       [255, 255, 0, 0],
       [255, 255, 0, 0],
       [255, 255, 0, 0]]

sobel_x = [[-1, 0, 1],
           [-2, 0, 2],
           [-1, 0, 1]]

for i in range(2):
    for j in range(2):
        val = sum(img[i+m][j+n] * sobel_x[m][n] for m in range(3) for n in range(3))
        print(f"  pos ({i},{j}): {val}")

# Output size
print(f"\n=== Output size formula ===")
for W, K_size in [(28, 3), (28, 5), (32, 3), (224, 7)]:
    out = W - K_size + 1
    print(f"  Input {W}×{W}, Kernel {K_size}×{K_size} → Output {out}×{out}")
```

## Visualisation — Image filters as convolutions

A 2-D convolution slides a small **kernel** across an image, producing
an output where each pixel is the weighted sum of its neighbourhood.
Different kernels do different things — blur, sharpen, edge-detect.
This is the *exact* operation a convolutional layer in a CNN performs;
the only difference is that CNNs *learn* the kernel from data instead
of hand-designing it.

```python
# ── Visualising 2-D convolution kernels ─────────────────────
import numpy as np
import matplotlib.pyplot as plt

def correlate2d(image, kernel):
    """Valid-mode 2-D cross-correlation (what CNN libraries actually
    compute — convolution differs only by a kernel flip, see lesson 2)."""
    H, W = image.shape
    kH, kW = kernel.shape
    out = np.zeros((H - kH + 1, W - kW + 1))
    for i in range(out.shape[0]):
        for j in range(out.shape[1]):
            out[i, j] = (image[i:i + kH, j:j + kW] * kernel).sum()
    return out

# Build a synthetic test image: a checker pattern with a circular blob
# in the middle. Keeps the picture small enough that Pyodide handles it
# fast and lets us *see* what each kernel does pixel by pixel.
def make_test_image(N=40):
    img = np.zeros((N, N))
    # Vertical stripes (high-frequency content for edge detectors).
    img[:, ::4] = 1.0
    # Horizontal stripes mid-strip.
    img[N // 3 : N // 3 + 2, :] = 0.5
    # Bright disk in the middle.
    yy, xx = np.ogrid[:N, :N]
    disk = (yy - N / 2) ** 2 + (xx - N / 2) ** 2 < (N / 5) ** 2
    img[disk] = 1.0
    return img

img = make_test_image(40)

# Four hand-designed kernels, each picking out a different feature.
kernels = {
    "Blur (box, normalised)":      np.ones((3, 3)) / 9.0,
    "Sharpen":                     np.array([[ 0, -1,  0],
                                              [-1,  5, -1],
                                              [ 0, -1,  0]], dtype=float),
    "Vertical edges (Sobel-x)":    np.array([[-1, 0, 1],
                                              [-2, 0, 2],
                                              [-1, 0, 1]], dtype=float),
    "Horizontal edges (Sobel-y)":  np.array([[-1, -2, -1],
                                              [ 0,  0,  0],
                                              [ 1,  2,  1]], dtype=float),
}

fig, axes = plt.subplots(2, len(kernels) + 1, figsize=(15, 6))

# Original image (top-left); leave the bottom-left empty so the
# columns line up with the four kernels.
axes[0, 0].imshow(img, cmap="gray", vmin=0, vmax=1)
axes[0, 0].set_title("Input image")
axes[0, 0].axis("off")
axes[1, 0].axis("off")
axes[1, 0].text(0.5, 0.5, "Kernel ↓\nFiltered ↑", ha="center", va="center",
                fontsize=11, transform=axes[1, 0].transAxes)

for col, (name, k) in enumerate(kernels.items(), start=1):
    out = correlate2d(img, k)
    # Top row: the filtered output.
    axes[0, col].imshow(out, cmap="gray")
    axes[0, col].set_title(f"{name}\noutput {out.shape}")
    axes[0, col].axis("off")
    # Bottom row: visualise the 3×3 kernel as a heatmap with values.
    axes[1, col].imshow(k, cmap="RdBu", vmin=-2, vmax=2)
    for i in range(k.shape[0]):
        for j in range(k.shape[1]):
            axes[1, col].text(j, i, f"{k[i, j]:+.0f}",
                              ha="center", va="center",
                              fontsize=11, fontweight="bold",
                              color="white" if abs(k[i, j]) > 1 else "black")
    axes[1, col].set_title("kernel (3×3)")
    axes[1, col].set_xticks([]); axes[1, col].set_yticks([])

plt.tight_layout()
plt.show()

# Print the output-size formula for each kernel size, mirroring the lesson.
print(f"{'input':>8}  {'kernel':>8}  {'output (no padding, stride 1)':>35}")
for W in [28, 32, 64, 224]:
    for K in [3, 5, 7]:
        print(f"  {W}×{W:<5}  {K}×{K:<5}  {W - K + 1}×{W - K + 1}")
```

**The pictures explain a CNN at a glance:**

- **Convolution = pixel-wise weighted sum of a neighbourhood.** Each
  output pixel is a tiny dot product of the kernel and a 3×3 patch of
  the input. Slide the kernel across, get a feature map.
- **The kernel decides what feature you respond to.**
  - Box filter → averages → **blur**.
  - Centre-positive, neighbours-negative → **sharpen** (a kind of high-pass).
  - $\pm$ along the columns → **vertical edge detector** (Sobel-x).
  - $\pm$ along the rows → **horizontal edge detector** (Sobel-y).
- **CNNs learn these kernels from data.** Early-layer kernels in a
  trained CNN look strikingly like the Sobel filters above — the
  network re-discovers edge detection on its own. Later layers combine
  edges into corners and textures, then into object parts, then into
  whole objects. *Hierarchical feature learning* is what makes CNNs
  the dominant tool for vision.

## Connection to CS / Games / AI / Business / Industry

- **CNNs** — convolutional layers learn kernels automatically via backpropagation
- **Image processing** — blur, sharpen, edge detection are all convolutions
- **Photoshop filters** — emboss, find edges, Gaussian blur = specific kernels
- **Audio processing** — 1D convolution on waveforms (echo, reverb)
- **Feature maps** — each learned kernel produces a "feature map" highlighting one pattern

## Check Your Understanding

1. **Pen & paper:** Apply the blur kernel $\frac{1}{9}\begin{pmatrix} 1 & 1 & 1 \\ 1 & 1 & 1 \\ 1 & 1 & 1 \end{pmatrix}$ to the top-left 3×3 of our image I.  What does blurring do to the value?
2. **Pen & paper:** What is the output size when convolving a 6×6 image with a 3×3 kernel?
3. **Pen & paper:** A 28×28 image is convolved with 32 different 5×5 kernels.  What is the output shape?  How many parameters (including biases)?
4. **Think about it:** Why does a 3×3 kernel applied to a 1000×1000 image have only 9 weights, while a fully connected layer would need $9{,}000{,}000$ weights?
