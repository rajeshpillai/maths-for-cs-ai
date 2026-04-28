# Implement a 2D Convolution Kernel — Pure Python, Then NumPy

## Intuition

Implementing convolution yourself removes all mystery.  You'll see it's just
nested loops over spatial positions and kernel elements.  Then you'll see
how NumPy vectorises the same computation to run orders of magnitude faster
— which is why we use GPUs for real CNNs.

## Prerequisites

- Tier 7, Lesson 1: 2D Convolution
- Tier 7, Lesson 3: Stride and Padding

## From First Principles

### The algorithm

```
For each output position (i, j):
    Extract the window from the input at (i, j)
    Element-wise multiply window × kernel
    Sum all products → output[i][j]
```

### Multi-channel extension

For input with $C$ channels and $F$ filters:

```
For each filter f (0 to F-1):
    For each output position (i, j):
        total = 0
        For each input channel c (0 to C-1):
            Extract window from channel c
            total += sum(window × kernel[f][c])
        output[f][i][j] = total + bias[f]
```

### Computational cost

For one conv layer:

- Output positions: $H_{\text{out}} \times W_{\text{out}}$
- Per position: $K \times K \times C_{\text{in}}$ multiply-adds
- Per filter: $H_{\text{out}} \times W_{\text{out}} \times K \times K \times C_{\text{in}}$
- Total: $F \times H_{\text{out}} \times W_{\text{out}} \times K \times K \times C_{\text{in}}$

**Pen & paper:** Conv2d(64, 128, 3×3) on 16×16 input:

$128 \times 16 \times 16 \times 3 \times 3 \times 64 = 128 \times 16 \times 16 \times 576 = 18{,}874{,}368$ multiply-adds

That's ~19 million operations for one layer, one sample.

## Python Implementation

```python
# ── Implement 2D Convolution ────────────────────────────────

# === Pure Python: single-channel 2D convolution ===
def conv2d_pure(image, kernel, stride=1, padding=0):
    """2D cross-correlation (what CNNs call 'convolution')."""
    H, W = len(image), len(image[0])
    kH, kW = len(kernel), len(kernel[0])
    
    # Pad the image
    if padding > 0:
        pH = H + 2 * padding
        pW = W + 2 * padding
        padded = [[0] * pW for _ in range(pH)]
        for i in range(H):
            for j in range(W):
                padded[i + padding][j + padding] = image[i][j]
    else:
        padded = image
        pH, pW = H, W
    
    # Output dimensions
    oH = (pH - kH) // stride + 1
    oW = (pW - kW) // stride + 1
    
    # Convolve
    output = [[0.0] * oW for _ in range(oH)]
    for i in range(oH):
        for j in range(oW):
            total = 0.0
            for m in range(kH):
                for n in range(kW):
                    total += padded[i * stride + m][j * stride + n] * kernel[m][n]
            output[i][j] = total
    
    return output

# Test: Edge detection
image = [
    [0,   0,   0,   0,   0],
    [0, 255, 255, 255,   0],
    [0, 255, 255, 255,   0],
    [0, 255, 255, 255,   0],
    [0,   0,   0,   0,   0],
]

# Vertical edge detector
kernel_v = [[-1, 0, 1],
            [-1, 0, 1],
            [-1, 0, 1]]

# Horizontal edge detector
kernel_h = [[-1, -1, -1],
            [ 0,  0,  0],
            [ 1,  1,  1]]

print("=== Input (bright square on dark background) ===")
for row in image:
    print(f"  {[f'{v:3d}' for v in row]}")

print(f"\n=== Vertical edge detection ===")
out_v = conv2d_pure(image, kernel_v)
for row in out_v:
    print(f"  {[f'{v:4.0f}' for v in row]}")

print(f"\n=== Horizontal edge detection ===")
out_h = conv2d_pure(image, kernel_h)
for row in out_h:
    print(f"  {[f'{v:4.0f}' for v in row]}")

# With padding (same output size)
print(f"\n=== Same convolution (padding=1) ===")
out_same = conv2d_pure(image, kernel_v, padding=1)
print(f"Input size:  {len(image)}×{len(image[0])}")
print(f"Output size: {len(out_same)}×{len(out_same[0])}")

# With stride
print(f"\n=== Strided convolution (stride=2) ===")
out_stride = conv2d_pure(image, kernel_v, stride=2, padding=1)
print(f"Output size: {len(out_stride)}×{len(out_stride[0])}")

# === Multi-channel convolution ===
print(f"\n=== Multi-channel: RGB image, 2 filters ===")
# Simulate 3×3 RGB image (3 channels)
R = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
G = [[9, 8, 7], [6, 5, 4], [3, 2, 1]]
B = [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
rgb_image = [R, G, B]  # shape: 3 × 3 × 3

# 2 filters, each 2×2×3
filters = [
    # Filter 0: detects something in R and G
    [[[1, 0], [0, 1]],   # R channel kernel
     [[0, 1], [1, 0]],   # G channel kernel
     [[0, 0], [0, 0]]],  # B channel kernel
    # Filter 1: detects something else
    [[[1, 1], [1, 1]],
     [[-1,-1], [-1,-1]],
     [[0, 0], [0, 0]]],
]
biases = [0.0, 0.5]

for f_idx, (filt, bias) in enumerate(zip(filters, biases)):
    # Output is 2×2 (3-2+1 = 2)
    output = [[0.0]*2 for _ in range(2)]
    for i in range(2):
        for j in range(2):
            total = bias
            for c in range(3):  # channels
                for m in range(2):
                    for n in range(2):
                        total += rgb_image[c][i+m][j+n] * filt[c][m][n]
            output[i][j] = total
    print(f"Filter {f_idx}: {output}")

# Computational cost
print(f"\n=== Computational cost ===")
configs = [
    ("Conv(3→32, 3×3) on 32×32", 32, 32, 32, 3, 3),
    ("Conv(32→64, 3×3) on 16×16", 64, 16, 16, 32, 3),
    ("Conv(64→128, 3×3) on 8×8", 128, 8, 8, 64, 3),
]
total_ops = 0
for desc, F, oH, oW, C, K in configs:
    ops = F * oH * oW * K * K * C
    total_ops += ops
    print(f"  {desc}: {ops:,} multiply-adds")
print(f"  Total: {total_ops:,} operations per sample")
```

## Visualisation — A multi-channel conv layer in action

A real CNN layer takes a **multi-channel input** (e.g. an RGB image
has 3 channels) and produces a **multi-channel output** (one feature
map per filter). The plot shows: 3 input channels (R, G, B), 4
learnable filters, 4 output feature maps — the structure of every
`Conv2d(3, 4, 3)` layer in PyTorch.

```python
# ── Visualising a multi-channel conv layer ──────────────────
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(0)

def conv2d_multichan(image_HWC, filters_FKKC):
    """Conv: image (H, W, C_in) and filters (F, K, K, C_in)
       → output (H − K + 1, W − K + 1, F).  Pure NumPy."""
    H, W, C = image_HWC.shape
    F, K, _, _ = filters_FKKC.shape
    out = np.zeros((H - K + 1, W - K + 1, F))
    for f in range(F):
        for i in range(out.shape[0]):
            for j in range(out.shape[1]):
                # Sum over kernel pixels AND input channels.
                out[i, j, f] = (image_HWC[i:i + K, j:j + K, :] *
                                filters_FKKC[f]).sum()
    return out

# Build a synthetic 24×24 RGB image: a colourful pattern.
H, W = 24, 24
img = np.zeros((H, W, 3))
yy, xx = np.ogrid[:H, :W]
img[..., 0] = 0.5 + 0.5 * np.sin(xx / 3)             # red: vertical sinusoid
img[..., 1] = 0.5 + 0.5 * np.sin(yy / 3)             # green: horizontal sinusoid
img[..., 2] = (((xx - W/2)**2 + (yy - H/2)**2) < 25).astype(float)  # blue: central disc

# Hand-designed 4 filters: edge-X, edge-Y, blur, identity-on-blue.
F, K = 4, 3
filters = np.zeros((F, K, K, 3))
sobel_x = np.array([[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]])
sobel_y = np.array([[-1, -2, -1], [0, 0, 0], [1, 2, 1]])
blur    = np.ones((3, 3)) / 9.0
# Each filter combines its kernel across all 3 channels (averaged).
for c in range(3): filters[0, ..., c] = sobel_x / 3
for c in range(3): filters[1, ..., c] = sobel_y / 3
for c in range(3): filters[2, ..., c] = blur     / 3
filters[3, ..., 2] = np.eye(3) / 3                  # only sees blue channel

out = conv2d_multichan(img, filters)
filter_names = ["edge-X (Sobel)", "edge-Y (Sobel)", "blur", "blue-only diagonal"]

fig = plt.figure(figsize=(15, 9))

# Top row: 3 input channels.
for c, name in enumerate(["R", "G", "B"]):
    ax = fig.add_subplot(3, 4, c + 1)
    ax.imshow(img[..., c], cmap="gray", vmin=0, vmax=1)
    ax.set_title(f"input channel {name}")
    ax.axis("off")

# Original RGB combined for reference.
ax = fig.add_subplot(3, 4, 4)
ax.imshow(img)
ax.set_title("RGB image\n(combined view)")
ax.axis("off")

# Middle row: the four 3×3×3 filters, summarised by averaging over channels.
for f in range(F):
    ax = fig.add_subplot(3, 4, 5 + f)
    avg_filter = filters[f].mean(axis=-1)
    im = ax.imshow(avg_filter, cmap="RdBu", vmin=-1, vmax=1)
    for i in range(K):
        for j in range(K):
            ax.text(j, i, f"{avg_filter[i, j]:+.2f}",
                    ha="center", va="center", fontsize=8)
    ax.set_title(f"filter {f}: {filter_names[f]}\n(channel-avg view)")
    ax.set_xticks([]); ax.set_yticks([])

# Bottom row: 4 output feature maps.
for f in range(F):
    ax = fig.add_subplot(3, 4, 9 + f)
    ax.imshow(out[..., f], cmap="viridis")
    ax.set_title(f"output channel {f}")
    ax.axis("off")

plt.tight_layout()
plt.show()

# Print parameter and FLOP counts for some realistic CNN layers.
print(f"For a Conv2d layer with K={K}, C_in=3, C_out={F}:")
print(f"  Parameters    : F × K × K × C_in + F = "
      f"{F} × {K} × {K} × 3 + {F} = {F * K * K * 3 + F:,}")
print(f"  Output shape  : {out.shape}")
print(f"  Multiply-adds : F × out_H × out_W × K × K × C_in = "
      f"{F * out.shape[0] * out.shape[1] * K * K * 3:,}")
print()
print("Realistic FLOPs grow fast with channel count:")
for desc, F_, oH, oW, C_in, K_ in [
    ("ResNet50 conv block (256→512, 3×3, 28×28 out)", 512, 28, 28, 256, 3),
    ("Stable Diffusion U-Net cross-attn step (1024×1024 → ...)", 320, 64, 64, 320, 3),
]:
    flops = F_ * oH * oW * K_ * K_ * C_in
    print(f"  {desc}: {flops:,} multiply-adds per layer")
```

**The structure of every `Conv2d(C_in, C_out, K)`:**

- **One filter is a 3-D tensor of shape $(K, K, C_{in})$.** It looks at
  *all input channels* in the same $K \times K$ spatial window
  simultaneously.
- **The layer has $C_{out}$ such filters** (plus $C_{out}$ biases). Each
  filter produces one output feature map. Stacking those gives the
  output tensor of shape $(H', W', C_{out})$.
- **Parameters = $C_{out} \times K \times K \times C_{in} + C_{out}$.**
  For a typical mid-network ResNet block (256 → 512, 3×3) that's
  $512 \times 3 \times 3 \times 256 + 512 = 1{,}180{,}160$ parameters
  in a *single layer*. CNN parameter counts add up fast — but they're
  still vastly fewer than what a fully-connected layer of the same
  shape would have.

## Connection to CS / Games / AI / Business / Industry

- **Understanding frameworks** — `torch.nn.Conv2d(in_channels, out_channels, kernel_size)` does exactly what we coded
- **Performance** — our nested loops are ~1000× slower than optimised C++/CUDA implementations
- **im2col** — the trick that converts convolution into a single large matrix multiply (how cuDNN actually does it)
- **Depthwise separable convolution** — MobileNet splits the channel and spatial dimensions for efficiency
- **Custom kernels** — image processing apps use hand-crafted kernels; CNNs learn them
- **Industry / Hardware**: **NVIDIA cuDNN** ships im2col + GEMM and Winograd-transform implementations of `Conv2d`; **Google TPU v4/v5p** has a dedicated 128×128 systolic-array MatMul unit that turns the convolution into matrix multiplications using exactly the im2col trick.
- **Engineering / Embedded**: **ARM Ethos-U55** NPUs and **STMicroelectronics STM32 X-CUBE-AI** ship hand-optimised conv kernels in C — the same nested-loop algorithm shown above, but unrolled and quantised to int8 to run on a microcontroller in milliwatts.
- **Business / Smartphones**: **Apple Neural Engine** in the A17/A18 chips executes the equivalent of 35 trillion conv multiply-adds per second — purpose-built silicon to make Face ID unlock in <100 ms and run on-device Siri.
- **Engineering / Self-driving**: **Mobileye EyeQ6** and **Tesla FSD chip** dedicate >70% of die area to convolution acceleration; a single forward pass through the perception network uses tens of GFLOPs per camera frame — exactly the cost formula derived in this lesson.

## Check Your Understanding

1. **Pen & paper:** Apply the sharpen kernel $\begin{pmatrix} 0 & -1 & 0 \\ -1 & 5 & -1 \\ 0 & -1 & 0 \end{pmatrix}$ to the centre pixel of a 3×3 image $\begin{pmatrix} 1 & 1 & 1 \\ 1 & 5 & 1 \\ 1 & 1 & 1 \end{pmatrix}$.  What is the output?
2. **Pen & paper:** How many multiply-add operations for Conv2d(3, 64, 7×7) on a 224×224 input (stride 2, pad 3)?
3. **Code exercise:** Modify the pure Python implementation to support dilation (spaces between kernel elements).
