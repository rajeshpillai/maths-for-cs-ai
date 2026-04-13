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
