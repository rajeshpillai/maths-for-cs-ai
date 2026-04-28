# Pooling Operations — Max-Pool and Average-Pool

## Intuition

Pooling shrinks the spatial dimensions of feature maps by summarising local
regions.  **Max pooling** keeps the strongest activation (the most important
feature).  **Average pooling** keeps the mean.  Pooling makes the network
more robust to small translations and reduces computation in later layers.

## Prerequisites

- Tier 7, Lesson 1: 2D Convolution

## From First Principles

### Max pooling

Slide a window over the feature map.  At each position, output the **maximum** value.

**Pen & paper: 2×2 max pool, stride 2 on a 4×4 input**

$$\mathbf{A} = \begin{pmatrix} 1 & 3 & 2 & 4 \\ 5 & 6 & 7 & 8 \\ 3 & 2 & 1 & 0 \\ 1 & 2 & 3 & 4 \end{pmatrix}$$

Windows (non-overlapping):

$\begin{pmatrix} 1 & 3 \\ 5 & 6 \end{pmatrix} \to 6$, $\begin{pmatrix} 2 & 4 \\ 7 & 8 \end{pmatrix} \to 8$

$\begin{pmatrix} 3 & 2 \\ 1 & 2 \end{pmatrix} \to 3$, $\begin{pmatrix} 1 & 0 \\ 3 & 4 \end{pmatrix} \to 4$

$$\text{Output} = \begin{pmatrix} 6 & 8 \\ 3 & 4 \end{pmatrix}$$

4×4 → 2×2 (halved in both dimensions).

### Average pooling

Same windows, but take the **mean** instead.

$\frac{1+3+5+6}{4} = 3.75$, $\frac{2+4+7+8}{4} = 5.25$

$\frac{3+2+1+2}{4} = 2.0$, $\frac{1+0+3+4}{4} = 2.0$

$$\text{Output} = \begin{pmatrix} 3.75 & 5.25 \\ 2.0 & 2.0 \end{pmatrix}$$

### Output size formula

Same as convolution:

$$W_{\text{out}} = \left\lfloor\frac{W - K}{s}\right\rfloor + 1$$

Typical: $K = 2, s = 2$ → output = $W/2$.

### Global average pooling

Average the **entire** feature map down to a single number per channel.

Input: $H \times W \times C$ → Output: $1 \times 1 \times C$

**Pen & paper:** Feature map $3 \times 3$:

$$\begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix} \to \frac{1+2+\cdots+9}{9} = 5$$

Used in modern architectures (ResNet, EfficientNet) instead of flattening — much fewer parameters.

### Backpropagation through pooling

**Max pool:** Gradient flows only to the position that had the maximum value.
All other positions get gradient 0.

**Pen & paper:** If the gradient flowing back is $\delta = 0.5$ and the max was at position (0,1):

$$\frac{\partial L}{\partial A} = \begin{pmatrix} 0 & 0.5 \\ 0 & 0 \end{pmatrix}$$

**Average pool:** Gradient is distributed equally among all positions:

$$\frac{\partial L}{\partial A} = \begin{pmatrix} 0.125 & 0.125 \\ 0.125 & 0.125 \end{pmatrix}$$

($0.5 / 4 = 0.125$ for a 2×2 window)

### Why pooling?

1. **Reduces dimensions** — 2×2 pool with stride 2 halves H and W → 4× fewer values
2. **Translation invariance** — small shifts in input don't change the max in each region
3. **Reduces overfitting** — fewer parameters in subsequent layers

### Pooling vs strided convolution

Modern trend: use **strided convolutions** (stride 2) instead of pooling.

- Strided conv has learnable parameters → the network decides how to downsample
- Pooling has no parameters → fixed downsampling strategy

Both achieve the same spatial reduction. Research shows strided conv often works slightly better.

## Python Verification

```python
# ── Pooling Operations: verifying pen & paper work ──────────

def max_pool_2d(A, pool_size=2, stride=2):
    H, W = len(A), len(A[0])
    oH = (H - pool_size) // stride + 1
    oW = (W - pool_size) // stride + 1
    output = [[0]*oW for _ in range(oH)]
    for i in range(oH):
        for j in range(oW):
            vals = []
            for m in range(pool_size):
                for n in range(pool_size):
                    vals.append(A[i*stride+m][j*stride+n])
            output[i][j] = max(vals)
    return output

def avg_pool_2d(A, pool_size=2, stride=2):
    H, W = len(A), len(A[0])
    oH = (H - pool_size) // stride + 1
    oW = (W - pool_size) // stride + 1
    output = [[0]*oW for _ in range(oH)]
    for i in range(oH):
        for j in range(oW):
            total = 0
            for m in range(pool_size):
                for n in range(pool_size):
                    total += A[i*stride+m][j*stride+n]
            output[i][j] = total / (pool_size * pool_size)
    return output

A = [[1, 3, 2, 4],
     [5, 6, 7, 8],
     [3, 2, 1, 0],
     [1, 2, 3, 4]]

print("=== Input ===")
for row in A:
    print(f"  {row}")

print(f"\n=== Max Pool 2×2, stride 2 ===")
mp = max_pool_2d(A)
for row in mp:
    print(f"  {row}")

print(f"\n=== Avg Pool 2×2, stride 2 ===")
ap = avg_pool_2d(A)
for row in ap:
    print(f"  {row}")

# Global average pooling
print(f"\n=== Global Average Pooling ===")
B = [[1, 2, 3],
     [4, 5, 6],
     [7, 8, 9]]
gap = sum(B[i][j] for i in range(3) for j in range(3)) / 9
print(f"  Input 3×3 → GAP = {gap}")

# Dimension reduction in a CNN
print(f"\n=== Dimension tracking through a CNN ===")
H, W, C = 32, 32, 3
print(f"  Input: {H}×{W}×{C}")

# Conv1: 32 filters, 3×3, stride 1, pad 1
C = 32
print(f"  Conv(32, 3×3, s1, p1): {H}×{W}×{C}")

# Pool: 2×2, stride 2
H, W = H//2, W//2
print(f"  MaxPool(2×2, s2): {H}×{W}×{C}")

# Conv2: 64 filters
C = 64
print(f"  Conv(64, 3×3, s1, p1): {H}×{W}×{C}")

# Pool
H, W = H//2, W//2
print(f"  MaxPool(2×2, s2): {H}×{W}×{C}")

# Global average pool
print(f"  GlobalAvgPool: 1×1×{C}")
print(f"  Flatten: {C}")
print(f"  FC({C}→10): 10 (class scores)")

# Backprop through max pool
print(f"\n=== Backprop through max pool ===")
print(f"  Window: [1, 3, 5, 6], max at index 3 (value 6)")
print(f"  Upstream gradient: 0.5")
print(f"  Gradients: [0, 0, 0, 0.5] (only max position gets gradient)")
```

## Visualisation — Max-pool vs average-pool, side by side

Pooling shrinks a feature map by summarising each window into a single
value. **Max-pool** keeps the strongest signal in each window (good
for "is this feature *present anywhere* in this region?"); **average-
pool** keeps the smoothed mean. Same input, two outputs, very
different feel.

```python
# ── Visualising max-pool vs average-pool ────────────────────
import numpy as np
import matplotlib.pyplot as plt

# A small feature map with a few sharp activations and lots of noise.
# Mimics what an early CNN layer's edge response might look like.
rng = np.random.default_rng(0)
fmap = 0.3 * rng.standard_normal((8, 8))
fmap[1, 1] = 3.0; fmap[1, 5] = 2.5
fmap[5, 2] = 2.0; fmap[5, 6] = 2.8
fmap[2, 7] = 1.5

def pool2x2(f, op):
    """Apply a 2x2 pool with stride 2 over feature map f."""
    H, W = f.shape
    out = np.zeros((H // 2, W // 2))
    for i in range(out.shape[0]):
        for j in range(out.shape[1]):
            window = f[2*i:2*i + 2, 2*j:2*j + 2]
            out[i, j] = op(window)
    return out

max_pool = pool2x2(fmap, np.max)
avg_pool = pool2x2(fmap, np.mean)

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# (1) Original feature map. Annotate each cell so the pool windows
# below have something concrete to summarise.
ax = axes[0]
im = ax.imshow(fmap, cmap="viridis")
for i in range(fmap.shape[0]):
    for j in range(fmap.shape[1]):
        ax.text(j, i, f"{fmap[i, j]:+.1f}", ha="center", va="center",
                fontsize=8, color="white" if fmap[i, j] < 1 else "black")
# Show the 2×2 pool windows as overlaid grid lines.
for i in range(0, fmap.shape[0], 2):
    ax.axhline(i - 0.5, color="white", lw=1.5)
    ax.axvline(i - 0.5, color="white", lw=1.5)
ax.axhline(fmap.shape[0] - 0.5, color="white", lw=1.5)
ax.axvline(fmap.shape[1] - 0.5, color="white", lw=1.5)
ax.set_title("Input feature map (8×8)\n2×2 pool windows shown by white grid")
ax.axis("off")
plt.colorbar(im, ax=ax, fraction=0.046)

# (2) Max-pool output. Each cell = max of the corresponding 2×2 window.
ax = axes[1]
im = ax.imshow(max_pool, cmap="viridis", vmin=fmap.min(), vmax=fmap.max())
for i in range(max_pool.shape[0]):
    for j in range(max_pool.shape[1]):
        ax.text(j, i, f"{max_pool[i, j]:+.1f}", ha="center", va="center",
                fontsize=10, color="white" if max_pool[i, j] < 1 else "black",
                fontweight="bold")
ax.set_title("Max-pool 2×2, stride 2 → 4×4\n(keeps the strongest activation)")
ax.axis("off")
plt.colorbar(im, ax=ax, fraction=0.046)

# (3) Average-pool output. Each cell = mean of the 2×2 window.
ax = axes[2]
im = ax.imshow(avg_pool, cmap="viridis", vmin=fmap.min(), vmax=fmap.max())
for i in range(avg_pool.shape[0]):
    for j in range(avg_pool.shape[1]):
        ax.text(j, i, f"{avg_pool[i, j]:+.2f}", ha="center", va="center",
                fontsize=10, color="white" if avg_pool[i, j] < 1 else "black",
                fontweight="bold")
ax.set_title("Average-pool 2×2, stride 2 → 4×4\n(smoothed; noise + signal mixed)")
ax.axis("off")
plt.colorbar(im, ax=ax, fraction=0.046)

plt.tight_layout()
plt.show()

# Print the parameter / spatial-shape comparison.
print(f"Input feature map: {fmap.shape}")
print(f"After 2×2 pool, stride 2: {max_pool.shape}  "
      f"(spatial size halved, channel count unchanged)")
print(f"\nMax-pool keeps:  {[f'{v:+.1f}' for v in max_pool.flatten()]}")
print(f"Avg-pool keeps:  {[f'{v:+.2f}' for v in avg_pool.flatten()]}")
print()
print("Why max-pool is more common in vision CNNs:")
print("  - Stronger activations are usually 'features detected', noise is small.")
print("  - Max-pool is a noise filter: weak responses get crushed; strong ones survive.")
print("  - Avg-pool blends them all together, diluting the signal.")
print("  - Modern architectures (ResNet, ConvNeXt) often skip pooling entirely")
print("    and downsample with stride-2 convolutions instead.")
```

**Why pooling matters (and why some networks skip it):**

- **Pooling is the cheap downsampler.** Cuts spatial size by 4× per
  2×2 pool, removing parameters from later FC layers. Pre-2015 it
  appeared after every 2-3 conv layers (LeNet, AlexNet, VGG).
- **Max-pool is *spatial robustness*.** A small shift in the input
  (a feature appearing one pixel left or right within a window) gives
  the same output. This is *translation invariance at the pixel scale*
  — a useful inductive bias for image classification.
- **Modern architectures often drop pooling.** ResNet uses stride-2
  convs that *learn* the downsampling filter; ConvNeXt and ViT use
  patch-based downsampling. **Global average pooling** at the end of
  the network — turning a $H \times W \times C$ tensor into a $C$-vector
  by averaging across spatial dimensions — is now standard in place
  of large FC layers, slashing parameters and reducing overfitting.

## Connection to CS / Games / AI

- **LeNet, AlexNet, VGG** — all use max pooling after conv layers
- **ResNet** — uses stride-2 convolutions instead of pooling in later stages
- **Global average pooling** — replaces the large FC layer at the end, reducing overfitting (Network in Network, 2014)
- **Feature pyramid networks** — use pooling at multiple scales for object detection
- **Image classification** — pooling makes the network robust to small translations of objects

## Check Your Understanding

1. **Pen & paper:** Apply 2×2 max pool (stride 2) to $\begin{pmatrix} 9 & 1 & 3 & 5 \\ 2 & 8 & 4 & 7 \\ 6 & 3 & 1 & 0 \\ 4 & 5 & 2 & 8 \end{pmatrix}$.
2. **Pen & paper:** An input is 14×14×128.  After 2×2 max pool (stride 2), what is the output shape?  How does this affect total number of values?
3. **Pen & paper:** Compute the backward pass gradient for a 2×2 average pool window where the upstream gradient is $\delta = 1.0$.
4. **Think about it:** Why might global average pooling generalise better than a fully connected layer for classification?
