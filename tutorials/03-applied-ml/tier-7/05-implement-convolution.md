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

## Connection to CS / Games / AI

- **Understanding frameworks** — `torch.nn.Conv2d(in_channels, out_channels, kernel_size)` does exactly what we coded
- **Performance** — our nested loops are ~1000× slower than optimised C++/CUDA implementations
- **im2col** — the trick that converts convolution into a single large matrix multiply (how cuDNN actually does it)
- **Depthwise separable convolution** — MobileNet splits the channel and spatial dimensions for efficiency
- **Custom kernels** — image processing apps use hand-crafted kernels; CNNs learn them

## Check Your Understanding

1. **Pen & paper:** Apply the sharpen kernel $\begin{pmatrix} 0 & -1 & 0 \\ -1 & 5 & -1 \\ 0 & -1 & 0 \end{pmatrix}$ to the centre pixel of a 3×3 image $\begin{pmatrix} 1 & 1 & 1 \\ 1 & 5 & 1 \\ 1 & 1 & 1 \end{pmatrix}$.  What is the output?
2. **Pen & paper:** How many multiply-add operations for Conv2d(3, 64, 7×7) on a 224×224 input (stride 2, pad 3)?
3. **Code exercise:** Modify the pure Python implementation to support dilation (spaces between kernel elements).
