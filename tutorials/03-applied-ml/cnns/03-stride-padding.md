# Stride and Padding — Derive the Output Size Formula

## Intuition

**Stride** controls how far the kernel jumps between positions (stride 2 = skip
every other position, halving the output size).  **Padding** adds zeros around
the border so the output can be the same size as the input (or larger).
Together they give you precise control over the spatial dimensions at each
layer of a CNN.

## Prerequisites

- Tier 7, Lesson 1: 2D Convolution (basic output size formula)

## From First Principles

### Stride

Instead of moving the kernel 1 pixel at a time, move it $s$ pixels.

**Pen & paper:** Input 6×6, kernel 3×3, stride 2.

Without stride: the kernel fits at positions $0, 1, 2, 3$ → $6 - 3 + 1 = 4$ positions.

With stride 2: the kernel starts at positions $0, 2$ (position 4 would place the kernel at indices $4, 5, 6$ — but index 6 is out of bounds for a size-6 input).  So **2 positions**.

Using the formula: $\lfloor(6 - 3)/2\rfloor + 1 = \lfloor 1.5 \rfloor + 1 = 1 + 1 = 2$ ✓

**General formula (no padding):**

$$W_{\text{out}} = \left\lfloor\frac{W - K}{s}\right\rfloor + 1$$

**Verify:** $\lfloor(6-3)/2\rfloor + 1 = 1 + 1 = 2$ ✓

### Padding

Add $p$ zeros on each side of the input.  Input effectively becomes $(W + 2p)$.

**Types:**
- **Valid (no padding):** $p = 0$. Output shrinks.
- **Same padding:** Choose $p$ so output = input size (with stride 1).
  $p = \lfloor K/2 \rfloor$ (for odd kernel sizes).

**Pen & paper:** Input 5×5, kernel 3×3, padding 1.

Effective input: $5 + 2(1) = 7$.
Output: $7 - 3 + 1 = 5$ — same as input ✓

### The master formula

$$W_{\text{out}} = \left\lfloor\frac{W + 2p - K}{s}\right\rfloor + 1$$

### Pen & paper: Common CNN configurations

| Input | Kernel | Stride | Padding | Output |
|-------|--------|--------|---------|--------|
| 32 | 3 | 1 | 1 | $\lfloor(32+2-3)/1\rfloor+1 = 32$ |
| 32 | 3 | 2 | 1 | $\lfloor(32+2-3)/2\rfloor+1 = 16$ |
| 224 | 7 | 2 | 3 | $\lfloor(224+6-7)/2\rfloor+1 = 112$ |
| 28 | 5 | 1 | 0 | $\lfloor(28-5)/1\rfloor+1 = 24$ |
| 28 | 5 | 1 | 2 | $\lfloor(28+4-5)/1\rfloor+1 = 28$ |

### Pen & paper: Padding with zeros

Input: $[1, 2, 3, 4]$, Padding $p = 1$:

Padded: $[0, 1, 2, 3, 4, 0]$

Convolve with kernel $[1, 0, -1]$, stride 1:

| Pos | Window | Output |
|-----|--------|--------|
| 0 | $[0, 1, 2]$ | $0 - 2 = -2$ |
| 1 | $[1, 2, 3]$ | $1 - 3 = -2$ |
| 2 | $[2, 3, 4]$ | $2 - 4 = -2$ |
| 3 | $[3, 4, 0]$ | $3 - 0 = 3$ |

Output: 4 elements (same as input!) ✓

### Multi-channel convolution

Real images have 3 channels (RGB).  A kernel is now 3D: $K \times K \times C_{\text{in}}$.

For input $H \times W \times C_{\text{in}}$ and $C_{\text{out}}$ filters:

- Each filter: $K \times K \times C_{\text{in}}$ (sums across all input channels)
- Output: $H_{\text{out}} \times W_{\text{out}} \times C_{\text{out}}$
- Parameters per filter: $K \times K \times C_{\text{in}} + 1$ (+ bias)
- Total parameters: $C_{\text{out}} \times (K \times K \times C_{\text{in}} + 1)$

**Pen & paper:** Conv layer: input 32×32×3, 16 filters of 5×5, stride 1, padding 2.

- Output spatial: $\lfloor(32+4-5)/1\rfloor+1 = 32$
- Output shape: $32 \times 32 \times 16$
- Parameters per filter: $5 \times 5 \times 3 + 1 = 76$
- Total: $16 \times 76 = 1{,}216$

### Transposed convolution (brief)

Goes the other direction: **upsamples** from smaller to larger spatial dimensions.
Used in autoencoders and image generation (GANs).

Output size: $W_{\text{out}} = (W_{\text{in}} - 1) \times s - 2p + K$

## Python Verification

```python
# ── Stride and Padding: verifying pen & paper work ──────────

def conv1d(signal, kernel, stride=1, padding=0):
    """1D cross-correlation with stride and padding."""
    # Pad
    padded = [0]*padding + signal + [0]*padding
    k_size = len(kernel)
    out_size = (len(padded) - k_size) // stride + 1
    output = []
    for i in range(out_size):
        pos = i * stride
        val = sum(padded[pos+j] * kernel[j] for j in range(k_size))
        output.append(val)
    return output

# Basic stride
print("=== Stride examples ===")
sig = [1, 2, 3, 4, 5, 6]
ker = [1, 1, 1]
print(f"Signal: {sig}, Kernel: {ker}")
print(f"Stride 1: {conv1d(sig, ker, stride=1)}")
print(f"Stride 2: {conv1d(sig, ker, stride=2)}")
print(f"Stride 3: {conv1d(sig, ker, stride=3)}")

# Same padding
print(f"\n=== Padding ===")
sig = [1, 2, 3, 4]
ker = [1, 0, -1]
print(f"Signal: {sig}, Kernel: {ker}")
print(f"No padding:  {conv1d(sig, ker, padding=0)} (size {len(conv1d(sig, ker, padding=0))})")
print(f"Padding=1:   {conv1d(sig, ker, padding=1)} (size {len(conv1d(sig, ker, padding=1))})")

# Output size formula
print(f"\n=== Output size formula ===")
configs = [
    (32, 3, 1, 1, "Conv 32, k3, s1, p1"),
    (32, 3, 2, 1, "Conv 32, k3, s2, p1"),
    (224, 7, 2, 3, "Conv 224, k7, s2, p3"),
    (28, 5, 1, 0, "Conv 28, k5, s1, p0"),
    (28, 5, 1, 2, "Conv 28, k5, s1, p2"),
]
for W, K, s, p, desc in configs:
    out = (W + 2*p - K) // s + 1
    print(f"  {desc}: output = {out}")

# Parameter count
print(f"\n=== Parameter count ===")
configs = [
    (3, 16, 5, "32×32×3 → 16 filters, 5×5"),
    (3, 64, 3, "224×224×3 → 64 filters, 3×3"),
    (64, 128, 3, "→ 128 filters, 3×3"),
    (128, 256, 3, "→ 256 filters, 3×3"),
]
total = 0
for c_in, c_out, k, desc in configs:
    params = c_out * (k * k * c_in + 1)
    total += params
    print(f"  {desc}: {params:,} params")
print(f"  Total: {total:,}")

# Compare to fully connected
print(f"\n=== FC vs Conv parameter comparison ===")
fc_params = 32 * 32 * 3 * 16  # FC layer same input/output
conv_params = 16 * (5 * 5 * 3 + 1)
print(f"  FC (32×32×3 → 16 features): {fc_params:,} params")
print(f"  Conv (16 filters, 5×5):     {conv_params:,} params")
print(f"  Ratio: {fc_params/conv_params:.0f}×")
```

## Visualisation — Stride and padding control the output shape

Stride and padding are the two knobs that decide how a convolution
*shrinks* (or doesn't) its input. The plot makes the formula
$\text{out} = \lfloor (W - K + 2P) / S \rfloor + 1$ visible by drawing
where the kernel actually lands.

```python
# ── Visualising stride and padding ──────────────────────────
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle

K = 3                          # 3×3 kernel
specs = [
    (5, 1, 0, "stride 1, no padding"),
    (5, 2, 0, "stride 2, no padding\n(downsamples)"),
    (5, 1, 1, "stride 1, 'same' padding\n(preserves size)"),
    (5, 2, 1, "stride 2, padding 1"),
]

fig, axes = plt.subplots(1, len(specs), figsize=(18, 5))

for ax, (W, S, P, title) in zip(axes, specs):
    out = (W - K + 2 * P) // S + 1
    # Draw the (padded) input grid: a (W + 2P) × (W + 2P) light grid.
    total = W + 2 * P
    for i in range(total):
        for j in range(total):
            is_pad = (i < P or i >= P + W) or (j < P or j >= P + W)
            color = "lightyellow" if is_pad else "lightgrey"
            ax.add_patch(Rectangle((j, total - 1 - i), 1, 1,
                                   facecolor=color, edgecolor="black", lw=0.6))
    # Draw kernel positions: every valid top-left corner where the
    # kernel fits, stepping by S.
    for k_i, i in enumerate(range(0, total - K + 1, S)):
        for k_j, j in enumerate(range(0, total - K + 1, S)):
            color = plt.cm.tab20(((k_i * out + k_j) % 20) / 20)
            ax.add_patch(Rectangle((j, total - 1 - i - K + 1), K, K,
                                   facecolor=color, alpha=0.35,
                                   edgecolor="darkblue", lw=1.5))
    # Axis cosmetics.
    ax.set_xlim(-0.5, total + 0.5)
    ax.set_ylim(-0.5, total + 0.5)
    ax.set_aspect("equal")
    ax.set_xticks([]); ax.set_yticks([])
    ax.set_title(f"{title}\n{W}×{W} input + pad {P}, stride {S}, kernel {K}\n"
                 f"→ output {out}×{out}")

plt.tight_layout()
plt.show()

# Print the closed-form output-size table.
print(f"  Output shape formula:  out = ⌊(W − K + 2P) / S⌋ + 1\n")
print(f"{'W':>4}  {'K':>3}  {'P':>3}  {'S':>3}  {'output':>7}")
print("-" * 28)
for W, S, P, _ in specs:
    out = (W - K + 2 * P) // S + 1
    print(f"  {W:>2}   {K:>2}   {P:>2}   {S:>2}   {out}×{out}")
print()
# Practical rule: 'same' padding keeps shape unchanged (when stride=1).
print("Practical rules of thumb:")
print("  - Stride 1 + padding (K-1)/2  →  output size = input size  ('SAME' padding)")
print("  - Stride 2                    →  output size halved        (downsampling)")
print("  - 1×1 convolution             →  pure channel-mixing, spatial size unchanged")
```

**The two knobs and what they do:**

- **Stride** = the step size as the kernel slides. Stride 2 *halves*
  the spatial resolution per layer — a popular alternative to
  pooling for downsampling. Modern architectures often replace
  pool layers with stride-2 convs because the latter has *learnable*
  filters at the downsampling step.
- **Padding** = pixels added around the input border (usually zeros,
  sometimes reflected or replicated). Padding lets you preserve the
  spatial size — *"same" padding* with stride 1 means
  $\text{output size} = \text{input size}$. Without padding, every
  convolution shrinks the feature map; deep nets without padding would
  run out of pixels.
- **Output formula in one line:** $\lfloor (W - K + 2P) / S \rfloor +
  1$. Memorise it. It is the single most-used calculation when
  designing a CNN.

## Connection to CS / Games / AI

- **Stride 2** — common way to downsample feature maps (instead of pooling)
- **Same padding** — preserves spatial dimensions; used in most modern architectures (ResNet, U-Net)
- **1×1 convolutions** — change channel count without affecting spatial dimensions (used in Inception, bottleneck layers)
- **Dilated convolutions** — "holes" in the kernel increase receptive field without more parameters
- **Transposed convolutions** — upsampling in autoencoders, GANs, semantic segmentation

## Check Your Understanding

1. **Pen & paper:** Input 64×64, kernel 3×3, stride 2, padding 1.  What is the output size?
2. **Pen & paper:** You want output size = input size for a 5×5 kernel with stride 1.  What padding is needed?
3. **Pen & paper:** A Conv layer has input 16×16×64 and uses 128 filters of size 3×3.  How many parameters?
4. **Pen & paper:** What is the output shape of: Input 224×224×3, Conv(64 filters, 7×7, stride 2, padding 3)?
