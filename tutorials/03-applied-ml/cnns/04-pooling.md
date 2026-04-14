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
