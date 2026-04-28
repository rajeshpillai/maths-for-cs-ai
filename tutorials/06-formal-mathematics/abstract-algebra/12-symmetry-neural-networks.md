# Symmetry and Neural Networks — Geometric Deep Learning

## Intuition

A CNN recognises a cat regardless of where it appears in the image. This is
**translation equivariance** — a symmetry property built into the architecture.
Geometric deep learning asks: what other symmetries can we bake into neural
networks? The answer comes from group theory. By designing layers that respect
a group of symmetries, we get networks that generalise better with less data.

## Prerequisites

- Tier 16, Lesson 6 (Homomorphisms and Isomorphisms)
- Tier 6, Lesson 3 (Forward Pass as Matrix Multiplication)

## From First Principles

### Group Actions

A **group action** of $G$ on a set $X$ is a function $\cdot : G \times X \to X$ satisfying:

1. $e \cdot x = x$ (identity acts trivially).
2. $(g_1 g_2) \cdot x = g_1 \cdot (g_2 \cdot x)$ (composition).

**Example**: rotations $G = \{0°, 90°, 180°, 270°\}$ acting on images by rotating pixels.

### Invariance vs Equivariance

Let $f: X \to Y$ and $G$ act on both $X$ and $Y$.

**Invariant**: $f(g \cdot x) = f(x)$ for all $g \in G$.
(Output does not change when input is transformed.)

**Equivariant**: $f(g \cdot x) = g \cdot f(x)$ for all $g \in G$.
(Output transforms in the same way as input.)

### Why Equivariance Matters

A classification network should be **invariant** at the final output: "it is a cat" regardless of rotation.

But intermediate layers should be **equivariant**: the feature map of a rotated image should be the rotated feature map. This preserves spatial information through the network.

### CNNs are Translation Equivariant

Let $T_t$ be translation by $t$. Let $\star$ denote convolution.

$$(f \star k)(T_t(x)) = T_t((f \star k)(x))$$

Convolution commutes with translation. This is why CNNs share weights across spatial positions — the same filter works everywhere.

### The General Recipe (Equivariant Layers)

For a group $G$ acting on input space $X$:

$$[\rho(g) \circ f](x) = f(g^{-1} \cdot x)$$

An equivariant linear layer $\Phi$ must satisfy:

$$\Phi \circ \rho(g) = \rho'(g) \circ \Phi \quad \forall g \in G$$

where $\rho$ and $\rho'$ are **representations** (group homomorphisms to $GL(V)$).

### Group Convolution

Generalise convolution to any group:

$$(f \star_G k)(g) = \sum_{h \in G} f(h) \cdot k(h^{-1}g)$$

This is equivariant under the group action by construction.

### Example: Rotation-Equivariant CNN

Standard CNN: equivariant to translations only.

$C_4$-equivariant CNN: equivariant to $\{0°, 90°, 180°, 270°\}$ rotations.

For each filter, instead of applying it at each spatial position, apply it at each spatial position AND each rotation. The feature maps now have an extra "rotation" dimension.

### Pen & Paper: Verifying Equivariance

Let $f: \mathbb{R}^2 \to \mathbb{R}^2$ be $f(x, y) = (2x, 2y)$ (scaling).

Let $g$ be 90-degree rotation: $g(x, y) = (-y, x)$.

$f(g(x, y)) = f(-y, x) = (-2y, 2x)$

$g(f(x, y)) = g(2x, 2y) = (-2y, 2x)$

Equal! So scaling is equivariant under rotation. Makes sense: scaling and rotation commute.

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

# Demonstrate translation equivariance of convolution
fig, axes = plt.subplots(2, 3, figsize=(12, 7))

# Create a simple 1D signal and kernel
n = 50
signal = np.zeros(n)
signal[10:15] = 1.0  # a bump

kernel = np.array([0.25, 0.5, 0.25])  # smoothing kernel

# Convolve
convolved = np.convolve(signal, kernel, mode='same')

# Translate signal
shift = 15
signal_shifted = np.roll(signal, shift)
convolved_shifted_input = np.convolve(signal_shifted, kernel, mode='same')
convolved_then_shifted = np.roll(convolved, shift)

# Top row: original
axes[0, 0].plot(signal, 'b-', linewidth=2)
axes[0, 0].set_title('Signal f(x)')
axes[0, 1].plot(convolved, 'r-', linewidth=2)
axes[0, 1].set_title('(f * k)(x)')
axes[0, 2].plot(convolved_then_shifted, 'g--', linewidth=2)
axes[0, 2].set_title('Shift(f * k)')

# Bottom row: shifted
axes[1, 0].plot(signal_shifted, 'b-', linewidth=2)
axes[1, 0].set_title('Shift(f)(x)')
axes[1, 1].plot(convolved_shifted_input, 'r-', linewidth=2)
axes[1, 1].set_title('(Shift(f) * k)(x)')
axes[1, 2].plot(convolved_shifted_input - convolved_then_shifted, 'k-')
axes[1, 2].set_title('Difference (≈ 0)')
axes[1, 2].set_ylim(-0.01, 0.01)

for ax in axes.flat:
    ax.grid(True, alpha=0.3)

plt.suptitle('Convolution is Translation Equivariant', fontsize=14)
plt.tight_layout()
plt.savefig('equivariance.png', dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np

# ── Symmetry and Neural Networks ─────────────────────────

# Step 1: Define group actions
def rotate90(img):
    """Rotate 2D array 90 degrees counterclockwise."""
    return np.rot90(img, 1)

def translate(img, dx, dy):
    """Translate 2D array by (dx, dy) with wrapping."""
    return np.roll(np.roll(img, dx, axis=1), dy, axis=0)

# Step 2: Verify convolution is translation equivariant
print("=== Translation Equivariance of Convolution ===")
from scipy.signal import convolve2d

np.random.seed(42)
img = np.random.randn(16, 16)
kernel = np.array([[1, 2, 1], [2, 4, 2], [1, 2, 1]]) / 16.0

# conv(translate(img)) vs translate(conv(img))
dx, dy = 3, 5
conv_then_translate = translate(convolve2d(img, kernel, mode='same', boundary='wrap'), dx, dy)
translate_then_conv = convolve2d(translate(img, dx, dy), kernel, mode='same', boundary='wrap')

error = np.max(np.abs(conv_then_translate - translate_then_conv))
print(f"Max error: {error:.2e}")
print(f"Equivariant: {error < 1e-10}")

# Step 3: Standard convolution is NOT rotation equivariant
print("\n=== Convolution is NOT Rotation Equivariant ===")
kernel_asym = np.array([[1, 0, 0], [0, 1, 0], [0, 0, 0]], dtype=float)

conv_then_rotate = rotate90(convolve2d(img, kernel_asym, mode='same', boundary='wrap'))
rotate_then_conv = convolve2d(rotate90(img), kernel_asym, mode='same', boundary='wrap')

error = np.max(np.abs(conv_then_rotate - rotate_then_conv))
print(f"Max error with asymmetric kernel: {error:.4f}")
print(f"Equivariant: {error < 1e-10}")

# Step 4: Group convolution on C4 (cyclic group of 4 rotations)
print("\n=== C4 Group Convolution ===")

def c4_group_conv(image, kernel):
    """
    Group convolution over C4 = {0°, 90°, 180°, 270°}.
    Output has 4 channels (one per rotation).
    """
    outputs = []
    for r in range(4):
        rotated_kernel = np.rot90(kernel, r)
        output = convolve2d(image, rotated_kernel, mode='same', boundary='wrap')
        outputs.append(output)
    return np.stack(outputs, axis=0)  # shape: (4, H, W)

# Apply group convolution
img_small = np.random.randn(8, 8)
k = np.array([[1, 0], [0, 0]], dtype=float)

out = c4_group_conv(img_small, k)
print(f"Input shape: {img_small.shape}")
print(f"Output shape: {out.shape} (4 rotation channels)")

# Verify equivariance: rotating input should cycle the channels
out_rotated_input = c4_group_conv(rotate90(img_small), k)
out_cycled = np.roll(out, -1, axis=0)  # cycle channels

# After rotating input 90°, channels should shift by 1
# (This is approximate due to boundary effects)
error = np.max(np.abs(out_rotated_input - out_cycled))
print(f"Equivariance error: {error:.6f}")

# Step 5: Demonstrate invariance from equivariance
print("\n=== From Equivariance to Invariance ===")
# Global average pooling over the group dimension gives invariance
def invariant_pool(group_features):
    """Average over group dimension."""
    return np.mean(group_features, axis=0)

pooled_original = invariant_pool(c4_group_conv(img_small, k))
pooled_rotated = invariant_pool(c4_group_conv(rotate90(img_small), k))

# These should be very similar (exact if circular boundary)
error = np.max(np.abs(pooled_original - pooled_rotated))
print(f"Invariance error after group pooling: {error:.6f}")

# Step 6: Count parameters saved
print("\n=== Parameter Efficiency ===")
H, W, C_in, C_out, K = 32, 32, 3, 16, 3
standard_params = C_in * C_out * K * K
group_params = C_in * C_out * K * K  # same kernel, applied 4 ways
print(f"Standard CNN: {standard_params} params, 1 orientation")
print(f"C4-equivariant: {group_params} params, 4 orientations")
print(f"Effective multiplier: 4x feature maps from same parameters")
```

## Connection to CS / Games / AI / Business / Industry

- **Medical imaging**: tumors have no preferred orientation; rotation-equivariant CNNs improve detection with limited training data.
- **Molecular property prediction**: molecules have 3D rotational symmetry; SE(3)-equivariant networks (like SchNet, EGNN) respect this.
- **Physics simulations**: particle systems are permutation-equivariant; graph neural networks enforce this via shared message-passing.
- **Game AI**: board games with symmetry (chess: reflection; Go: rotation) benefit from equivariant architectures.
- **Point cloud processing** (LiDAR, 3D scanning): PointNet uses permutation invariance; tensor field networks add rotation equivariance.
- **AlphaFold**: protein structure prediction uses SE(3)-equivariant attention.

## Check Your Understanding

1. Prove that a function $f$ is equivariant under a group $G$ if and only if $f$ commutes with every group element's action: $f \circ \rho(g) = \rho'(g) \circ f$.
2. Show that the composition of two equivariant functions is equivariant.
3. Design a $D_4$-equivariant layer (rotations AND reflections of a square). How many copies of each filter do you need?
