# Receptive Field Analysis

## Intuition

The **receptive field** of a neuron is the region of the original input that
can influence its value.  A neuron in layer 1 sees a 3×3 patch.  A neuron in
layer 2 (after another 3×3 conv) sees a 5×5 patch of the input.  Deep layers
have large receptive fields, letting them detect complex, large-scale patterns.
Understanding receptive fields helps you design architectures that "see" the
right amount of context.

## Prerequisites

- Tier 7, Lesson 3: Stride and Padding

## From First Principles

### One layer

A single 3×3 conv (stride 1): each output neuron sees a **3×3** region of the input.

Receptive field = kernel size = 3.

### Stacking layers

After two 3×3 conv layers (stride 1):

- Layer 1 output: each neuron sees 3×3 of input
- Layer 2 output: each neuron sees 3×3 of layer 1 output, which covers 5×5 of the input

**Pen & paper:** Why 5×5?

Layer 2 looks at positions $[i-1, i, i+1]$ of layer 1.
Each of those looks at positions $[j-1, j, j+1]$ of the input.
So layer 2 sees input positions $[i-2, i-1, i, i+1, i+2]$ → **5 positions**.

### The formula (stride 1, no dilation)

For $L$ layers of kernel size $K$, all with stride 1:

$$r = L(K - 1) + 1$$

**Pen & paper:**

| Layers | Kernel | Receptive field |
|--------|--------|----------------|
| 1 × 3×3 | 3 | $1(2)+1 = 3$ |
| 2 × 3×3 | 3 | $2(2)+1 = 5$ |
| 3 × 3×3 | 3 | $3(2)+1 = 7$ |
| 5 × 3×3 | 3 | $5(2)+1 = 11$ |
| 1 × 5×5 | 5 | $1(4)+1 = 5$ |
| 1 × 7×7 | 7 | $1(6)+1 = 7$ |

**Key insight:** Two 3×3 layers have the same receptive field (5×5) as one
5×5 layer, but with fewer parameters: $2 \times 9 = 18$ vs $25$.

This is why **VGGNet** uses all 3×3 convolutions — deeper stacks of small
kernels are more parameter-efficient than fewer large kernels.

### General formula (with stride)

For layer $l$ with kernel $k_l$ and stride $s_l$:

$$r_l = r_{l-1} + (k_l - 1) \prod_{i=1}^{l-1} s_i$$

Starting with $r_0 = 1$ (a single pixel).

**Pen & paper: Conv 7×7 stride 2 → Conv 3×3 stride 1**

$r_0 = 1$

Layer 1: $k_1 = 7, s_1 = 2$
$r_1 = 1 + (7-1) \times 1 = 7$

Layer 2: $k_2 = 3, s_2 = 1$
$r_2 = 7 + (3-1) \times 2 = 11$

(The stride of layer 1 magnifies the receptive field growth of subsequent layers.)

### Effect of pooling

A 2×2 max pool with stride 2 acts like a layer with $k = 2, s = 2$:

$r_{\text{after pool}} = r_{\text{before}} + (2-1) \times \text{cumulative stride}$

### Pen & paper: ResNet-style block

```
Conv 7×7, s2 → MaxPool 3×3, s2 → Conv 3×3, s1 → Conv 3×3, s1
```

$r_0 = 1$

Layer 1 (Conv 7×7, s=2): $r_1 = 1 + 6 \times 1 = 7$, cumulative stride = 2

Layer 2 (Pool 3×3, s=2): $r_2 = 7 + 2 \times 2 = 11$, cumulative stride = 4

Layer 3 (Conv 3×3, s=1): $r_3 = 11 + 2 \times 4 = 19$, cumulative stride = 4

Layer 4 (Conv 3×3, s=1): $r_4 = 19 + 2 \times 4 = 27$, cumulative stride = 4

After just 4 layers, each neuron sees a **27×27** patch of the original image.

### Effective receptive field

The theoretical receptive field is often larger than the **effective** one.
Pixels at the centre contribute more than pixels at the edges (because more
paths pass through the centre).  The effective receptive field is roughly
Gaussian-shaped and smaller than the theoretical one.

### Dilated (atrous) convolution

Insert spaces between kernel elements.  Dilation rate $d$: the effective kernel
size becomes $K + (K-1)(d-1)$.

**Pen & paper:** 3×3 kernel, dilation 2:

Effective size: $3 + 2 \times 1 = 5$ (but only 9 parameters, not 25).

This rapidly increases receptive field without adding parameters.

## Python Verification

```python
# ── Receptive Field Analysis ────────────────────────────────

# Simple formula: L layers of KxK, stride 1
print("=== Receptive field: stacked 3×3 convs ===")
for L in range(1, 8):
    rf = L * 2 + 1
    params = L * 9  # 9 params per 3×3 kernel (ignoring channels)
    print(f"  {L} × 3×3: RF = {rf}×{rf}, params = {params}")

# Compare: single large kernel
print(f"\n=== Single kernel equivalents ===")
for K in [3, 5, 7, 9, 11, 13]:
    params = K * K
    # How many 3×3 layers needed for same RF?
    layers_33 = (K - 1) // 2
    params_33 = layers_33 * 9
    print(f"  {K}×{K}: {params} params | {layers_33}×(3×3): {params_33} params | savings: {params - params_33}")

# General formula with strides
print(f"\n=== General RF formula ===")
def compute_rf(layers):
    """layers: list of (name, kernel_size, stride)"""
    rf = 1
    cum_stride = 1
    for name, k, s in layers:
        rf = rf + (k - 1) * cum_stride
        cum_stride *= s
        print(f"  {name:20s}: RF = {rf:3d}, cum_stride = {cum_stride}")
    return rf

print("ResNet-style stem:")
resnet_stem = [
    ("Conv 7×7, s2", 7, 2),
    ("MaxPool 3×3, s2", 3, 2),
    ("Conv 3×3, s1", 3, 1),
    ("Conv 3×3, s1", 3, 1),
    ("Conv 3×3, s1", 3, 1),
    ("Conv 3×3, s1", 3, 1),
]
rf = compute_rf(resnet_stem)
print(f"  Final RF: {rf}×{rf}\n")

print("VGG-style (all 3×3, pool every 2 layers):")
vgg_layers = [
    ("Conv 3×3", 3, 1), ("Conv 3×3", 3, 1), ("Pool 2×2", 2, 2),
    ("Conv 3×3", 3, 1), ("Conv 3×3", 3, 1), ("Pool 2×2", 2, 2),
    ("Conv 3×3", 3, 1), ("Conv 3×3", 3, 1), ("Conv 3×3", 3, 1), ("Pool 2×2", 2, 2),
]
rf = compute_rf(vgg_layers)
print(f"  Final RF: {rf}×{rf}\n")

# Dilated convolution
print("=== Dilated convolution ===")
for d in [1, 2, 4, 8]:
    eff_k = 3 + 2 * (d - 1)  # 3×3 kernel
    print(f"  3×3, dilation={d}: effective kernel = {eff_k}×{eff_k}, params = 9")
```

## Visualisation — Receptive field grows with depth

The **receptive field** is "how many input pixels can ultimately
influence a single output pixel". Two pictures: how a stack of small
3×3 convs builds an effective large field cheaply, and how *dilation*
enlarges the field for free without adding parameters.

```python
# ── Visualising receptive-field growth ──────────────────────
import numpy as np
import matplotlib.pyplot as plt

# Recursive formula:
#   r_{l+1} = r_l + (k_{l+1} − 1) · stride_product
# where stride_product is the cumulative stride up to layer l.
def receptive_field(layers):
    """layers: list of (kernel_size, stride). Returns RF and per-layer history."""
    r = 1; s_prod = 1; history = [(0, "input", r)]
    for idx, (k, s) in enumerate(layers, start=1):
        r = r + (k - 1) * s_prod
        s_prod *= s
        history.append((idx, f"conv{idx}: k={k}, s={s}", r))
    return r, history

# Stack of 3×3 convs (stride 1) → RF grows by 2 per layer.
stack_3 = [(3, 1)] * 8
# Add stride-2 layers in between.
mixed = [(3, 1), (3, 1), (2, 2),                 # block1
         (3, 1), (3, 1), (2, 2),                 # block2
         (3, 1), (3, 1), (3, 1), (2, 2),         # block3 (VGG-like)
         (3, 1), (3, 1), (3, 1)]                 # block4

_, hist_stack = receptive_field(stack_3)
_, hist_mixed = receptive_field(mixed)

fig, axes = plt.subplots(1, 2, figsize=(15, 5))

# (1) Receptive field vs depth: 3×3 stack vs mixed (with downsampling).
ax = axes[0]
xs1 = [h[0] for h in hist_stack]
ys1 = [h[2] for h in hist_stack]
xs2 = [h[0] for h in hist_mixed]
ys2 = [h[2] for h in hist_mixed]
ax.plot(xs1, ys1, "o-", color="tab:blue", lw=2, label="Eight 3×3 convs (stride 1)")
ax.plot(xs2, ys2, "s-", color="tab:red",  lw=2, label="VGG-like with pool/stride-2")
for x, _, r in hist_mixed[::3]:
    ax.text(x, r + 4, f"RF = {r}", fontsize=9, color="tab:red", ha="center")
ax.set_xlabel("layer index")
ax.set_ylabel("receptive field (input pixels)")
ax.set_title("Receptive field grows with depth\n— stride-2 layers boost it dramatically")
ax.legend(); ax.grid(True, alpha=0.3)

# (2) Dilated convolution: same 9 weights see a much wider area.
# A 3×3 kernel with dilation d "samples" pixels at spacing d, so its
# effective receptive field is k_eff = k + (k − 1)(d − 1) = 1 + 2d.
ax = axes[1]
fig_size = 17
for d_idx, dilation in enumerate([1, 2, 4]):
    centre = fig_size // 2
    img = np.ones((fig_size, fig_size)) * 0.95
    # Mark which pixels the kernel SAMPLES at this dilation.
    for di in (-1, 0, 1):
        for dj in (-1, 0, 1):
            i = centre + di * dilation
            j = centre + dj * dilation
            if 0 <= i < fig_size and 0 <= j < fig_size:
                img[i, j] = 0.0 if (di, dj) == (0, 0) else 0.4
    extent = [d_idx * (fig_size + 2), (d_idx + 1) * (fig_size + 2) - 2,
              0, fig_size]
    ax.imshow(img, cmap="gray", vmin=0, vmax=1, extent=extent)
    ax.text((d_idx + 0.5) * (fig_size + 2),
            -1.5, f"dilation = {dilation}\nRF = {1 + 2*dilation}×{1 + 2*dilation}",
            fontsize=11, ha="center")
ax.set_xlim(-1, 3 * (fig_size + 2))
ax.set_ylim(-3.5, fig_size + 1)
ax.set_aspect("equal"); ax.axis("off")
ax.set_title("Dilated convolution: same 9 parameters, larger RF")

plt.tight_layout()
plt.show()

# Summary table.
print("Receptive-field history for the simple 3×3 stack (no pooling):")
for idx, label, r in hist_stack:
    print(f"  layer {idx:>2}: {label:<15}  RF = {r:>3} px")
print()
print("And for a VGG-like mix with pool/stride-2 layers:")
for idx, label, r in hist_mixed[::2]:
    print(f"  layer {idx:>2}: {label:<22}  RF = {r:>4} px")
```

**Two forces grow the receptive field:**

- **Depth alone is *additive*.** Each 3×3 conv with stride 1 adds 2 to
  the receptive field. After 10 such convs the field is 21 — modest.
- **Stride and pooling are *multiplicative*.** Once you stride by 2,
  every subsequent kernel pixel "covers" twice as many input pixels as
  before. This is why VGG (and ResNet, EfficientNet, ConvNeXt…) reach
  receptive fields of *hundreds* of pixels by their final layers,
  even with tiny 3×3 kernels.
- **Dilation = receptive field for free.** A 3×3 kernel with dilation
  $d$ samples pixels at spacing $d$ — so its effective receptive size
  is $1 + 2d$, while still using only 9 weights. Dilated convs power
  semantic-segmentation networks (DeepLab, U-Net++) and audio models
  like WaveNet, where you need a huge context without paying for a
  huge kernel.

The receptive field is the answer to "*can my network even see the
relevant context?*" — for object detection it must cover entire
objects; for time-series forecasting it must reach back far enough to
see relevant history. Underestimate it and your network is staring at
a tiny window of the world.

## Connection to CS / Games / AI

- **Architecture design** — receptive field must be large enough to capture the relevant pattern (e.g., a face is ~100px, so RF must be ≥100)
- **VGGNet** — stacks of 3×3 convs: efficient parameters, growing receptive field
- **ResNet** — stride-2 convs increase cumulative stride, growing RF faster
- **Dilated convolutions** — WaveNet (audio), DeepLab (segmentation) use dilation for large RF without more params
- **Object detection** — feature pyramid networks provide multiple receptive field scales
- **Transformers** — global receptive field from the start (every token attends to every other)

## Check Your Understanding

1. **Pen & paper:** What is the receptive field of 4 stacked 3×3 convolutions (stride 1)?  How does it compare to a single 9×9 kernel?
2. **Pen & paper:** Compute the receptive field for: Conv(3×3, s=2) → Conv(3×3, s=1) → Conv(3×3, s=1).
3. **Pen & paper:** A 3×3 kernel with dilation 4 has what effective kernel size?
4. **Think about it:** For classifying 224×224 images, the receptive field needs to cover the full image.  How many 3×3 stride-1 layers would that require?  Why do we use strides and pooling instead?
