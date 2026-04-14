# Advanced Information Theory

## Intuition

How much data can you push through a noisy phone line? Shannon's channel
capacity theorem gives a precise answer — and proves it is achievable. Error-
correcting codes (like Hamming codes) show *how* to approach that limit: by
adding clever redundancy, we can detect and fix transmission errors. This
mathematics powers everything from Wi-Fi to QR codes to deep-space
communication with Mars rovers.

## Prerequisites

- **Tier 4, Lesson 9** — Entropy, cross-entropy, KL divergence

## From First Principles

### Channel Model

A **discrete memoryless channel** is defined by:

- Input alphabet $\mathcal{X}$, output alphabet $\mathcal{Y}$
- Transition probabilities $P(Y = y \mid X = x)$

The **Binary Symmetric Channel (BSC)** with error probability $p$:
- Input/output: $\{0, 1\}$
- $P(Y=0|X=0) = P(Y=1|X=1) = 1-p$
- $P(Y=1|X=0) = P(Y=0|X=1) = p$ (bit flip)

### Mutual Information

The **mutual information** between input $X$ and output $Y$:

$$I(X; Y) = H(Y) - H(Y|X)$$

where $H(Y|X) = \sum_x P(x) H(Y|X=x)$ is the conditional entropy.

For BSC: $H(Y|X) = H(p) = -p\log_2 p - (1-p)\log_2(1-p)$ (the binary entropy).

### Shannon's Channel Capacity

**Definition:** The **channel capacity** is:

$$C = \max_{P(X)} I(X; Y)$$

**For BSC:** $C = 1 - H(p)$ bits per channel use.

When $p = 0$: $C = 1$ (perfect channel, 1 bit per use).
When $p = 0.5$: $C = 0$ (completely random, no information gets through).
When $p = 0.1$: $C = 1 - H(0.1) = 1 - 0.469 = 0.531$ bits.

### Shannon's Noisy Channel Coding Theorem

**Statement:** For any rate $R < C$, there exist codes that achieve
arbitrarily low error probability. For $R > C$, reliable communication is
impossible.

This is an **existence theorem** — it guarantees good codes exist but does
not construct them. The search for codes approaching capacity drove decades
of coding theory (Hamming, Reed-Solomon, Turbo, LDPC codes).

### Hamming Code (7,4)

The Hamming(7,4) code encodes 4 data bits into 7 bits, correcting any single-bit error.

**Encoding:** Data bits $d_1 d_2 d_3 d_4$. Parity bits $p_1 p_2 p_3$.

Codeword positions: $p_1\; p_2\; d_1\; p_3\; d_2\; d_3\; d_4$ (positions 1-7).

Parity equations:
- $p_1 = d_1 \oplus d_2 \oplus d_4$ (covers positions 1,3,5,7)
- $p_2 = d_1 \oplus d_3 \oplus d_4$ (covers positions 2,3,6,7)
- $p_3 = d_2 \oplus d_3 \oplus d_4$ (covers positions 4,5,6,7)

**Example:** Encode $d = 1011$.

$p_1 = 1 \oplus 0 \oplus 1 = 0$
$p_2 = 1 \oplus 1 \oplus 1 = 1$
$p_3 = 0 \oplus 1 \oplus 1 = 0$

Codeword: $0\; 1\; 1\; 0\; 0\; 1\; 1$

**Decoding with error:** Received $0110011$ (bit 4 flipped, was 0 now 1).

Syndrome:
$s_1 = p_1 \oplus d_1 \oplus d_2 \oplus d_4 = 0 \oplus 1 \oplus 0 \oplus 1 = 0$
$s_2 = p_2 \oplus d_1 \oplus d_3 \oplus d_4 = 1 \oplus 1 \oplus 1 \oplus 1 = 0$
$s_3 = p_3 \oplus d_2 \oplus d_3 \oplus d_4 = 1 \oplus 0 \oplus 1 \oplus 1 = 1$

Syndrome $= 100_2 = 4$. Error is at position 4. Flip it back: corrected!

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(13, 5))

# Left: BSC channel capacity vs error probability
p_vals = np.linspace(0.001, 0.499, 200)
H_p = -p_vals * np.log2(p_vals) - (1 - p_vals) * np.log2(1 - p_vals)
C_vals = 1 - H_p

ax1.plot(p_vals, C_vals, 'b-', lw=2)
ax1.fill_between(p_vals, 0, C_vals, alpha=0.2, color='blue')
ax1.axhline(y=0, color='black', lw=0.5)
ax1.set_xlabel('Error probability p', fontsize=11)
ax1.set_ylabel('Channel capacity C (bits)', fontsize=11)
ax1.set_title('BSC Channel Capacity: C = 1 - H(p)', fontsize=12)
ax1.annotate('p=0.1, C=0.531', xy=(0.1, 0.531), xytext=(0.2, 0.7),
             arrowprops=dict(arrowstyle='->', color='red'), fontsize=10, color='red')
ax1.grid(True, alpha=0.3)

# Right: Noisy channel model diagram
ax2.set_title("Binary Symmetric Channel", fontsize=12)
# Draw the channel
for i, (x, y, label) in enumerate([(1, 2, '0'), (1, 0, '1'), (4, 2, '0'), (4, 0, '1')]):
    ax2.plot(x, y, 'o', markersize=25, color='steelblue' if x==1 else 'orange',
             markeredgecolor='black')
    ax2.text(x, y, label, ha='center', va='center', fontsize=14, fontweight='bold')

# Correct transmissions
ax2.annotate('', xy=(3.7, 2), xytext=(1.3, 2),
             arrowprops=dict(arrowstyle='->', lw=2, color='green'))
ax2.text(2.5, 2.2, f'1-p', fontsize=11, ha='center', color='green')

ax2.annotate('', xy=(3.7, 0), xytext=(1.3, 0),
             arrowprops=dict(arrowstyle='->', lw=2, color='green'))
ax2.text(2.5, -0.3, f'1-p', fontsize=11, ha='center', color='green')

# Error transmissions (crossed)
ax2.annotate('', xy=(3.7, 0), xytext=(1.3, 2),
             arrowprops=dict(arrowstyle='->', lw=1.5, color='red', linestyle='dashed'))
ax2.text(2.5, 1.3, 'p', fontsize=11, ha='center', color='red')

ax2.annotate('', xy=(3.7, 2), xytext=(1.3, 0),
             arrowprops=dict(arrowstyle='->', lw=1.5, color='red', linestyle='dashed'))
ax2.text(2.5, 0.7, 'p', fontsize=11, ha='center', color='red')

ax2.text(1, -1, 'Input X', ha='center', fontsize=11)
ax2.text(4, -1, 'Output Y', ha='center', fontsize=11)
ax2.set_xlim(0, 5); ax2.set_ylim(-1.5, 3); ax2.set_aspect('equal'); ax2.axis('off')

plt.tight_layout()
plt.savefig("information_theory_channel.png", dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np

# ── Hamming(7,4) code from scratch ───────────────────────

def hamming_encode(data_bits):
    """Encode 4 data bits into 7-bit Hamming codeword."""
    d1, d2, d3, d4 = data_bits
    p1 = d1 ^ d2 ^ d4
    p2 = d1 ^ d3 ^ d4
    p3 = d2 ^ d3 ^ d4
    return [p1, p2, d1, p3, d2, d3, d4]

def hamming_decode(received):
    """Decode 7-bit Hamming codeword, correcting single-bit errors."""
    p1, p2, d1, p3, d2, d3, d4 = received
    s1 = p1 ^ d1 ^ d2 ^ d4
    s2 = p2 ^ d1 ^ d3 ^ d4
    s3 = p3 ^ d2 ^ d3 ^ d4
    error_pos = s1 * 1 + s2 * 2 + s3 * 4  # syndrome as binary
    corrected = list(received)
    if error_pos > 0:
        corrected[error_pos - 1] ^= 1  # flip the error bit
    return [corrected[2], corrected[4], corrected[5], corrected[6]], error_pos

# Step 1: Encode and decode without errors
data = [1, 0, 1, 1]
codeword = hamming_encode(data)
print(f"Data: {data}")
print(f"Codeword: {codeword}")

decoded, err = hamming_decode(codeword)
print(f"Decoded (no error): {decoded}, error_pos={err}")

# Step 2: Introduce single-bit errors and correct them
print("\nSingle-bit error correction:")
for flip_pos in range(7):
    corrupted = list(codeword)
    corrupted[flip_pos] ^= 1
    decoded, err = hamming_decode(corrupted)
    status = "CORRECTED" if decoded == data else "FAILED"
    print(f"  Flip pos {flip_pos+1}: received={corrupted}, decoded={decoded}, "
          f"detected_pos={err} [{status}]")

# Step 3: Channel capacity computation
def binary_entropy(p):
    if p == 0 or p == 1:
        return 0.0
    return -p * np.log2(p) - (1-p) * np.log2(1-p)

print("\nBSC Channel Capacity:")
for p in [0.0, 0.01, 0.1, 0.2, 0.5]:
    C = 1 - binary_entropy(p)
    print(f"  p={p:.2f}: H(p)={binary_entropy(p):.4f}, C={C:.4f} bits/use")

# Step 4: Simulate BSC transmission
def simulate_bsc(data, p, n_trials=10000):
    """Simulate BSC with error probability p."""
    errors = 0
    for _ in range(n_trials):
        codeword = hamming_encode(data)
        # Transmit through BSC
        received = [b ^ (1 if np.random.random() < p else 0) for b in codeword]
        decoded, _ = hamming_decode(received)
        if decoded != data:
            errors += 1
    return errors / n_trials

np.random.seed(42)
print("\nBSC Simulation (Hamming code, 10000 trials):")
for p in [0.01, 0.05, 0.1, 0.2]:
    error_rate = simulate_bsc([1, 0, 1, 1], p)
    print(f"  p={p:.2f}: decoded error rate = {error_rate:.4f}")
    # Hamming corrects 1 error; with 7 bits, P(2+ errors) ≈ C(7,2)*p^2
```

## Connection to CS / Games / AI

- **Wi-Fi / 5G:** Modern wireless protocols use LDPC codes that approach
  Shannon capacity within fractions of a dB.
- **QR codes:** Reed-Solomon error correction lets QR codes work even when
  partially obscured — the same math as Hamming codes, generalised.
- **Deep learning:** The information bottleneck theory suggests deep networks
  learn by compressing (reducing mutual information with input) while
  preserving information about the output.
- **Data compression:** Shannon entropy sets the theoretical limit on lossless
  compression (ZIP, PNG, FLAC).

## Check Your Understanding

1. Compute the channel capacity of a BSC with $p = 0.25$ by hand.
2. The Hamming(7,4) code has rate $R = 4/7 \approx 0.571$. For what range of
   $p$ is this rate below the BSC capacity?
3. Extend the Hamming(7,4) code to Hamming(8,4) by adding an overall parity
   bit. What new capability does this give? Implement it.
