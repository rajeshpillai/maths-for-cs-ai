# Recurrent Networks — Backpropagation Through Time (BPTT)

## Intuition

RNNs process **sequences** by maintaining a hidden state that updates at each
time step.  BPTT unrolls the network across time and applies the chain rule —
but multiplying the same weight matrix $T$ times leads to vanishing or
exploding gradients.  LSTMs and GRUs solve this with gating mechanisms.

## Prerequisites

- Tier 6, Lesson 4: Backpropagation
- Tier 3, Lesson 4: Chain Rule

## From First Principles

### RNN update

$$\mathbf{h}_t = \tanh(\mathbf{W}_h \mathbf{h}_{t-1} + \mathbf{W}_x \mathbf{x}_t + \mathbf{b})$$
$$\mathbf{y}_t = \mathbf{W}_y \mathbf{h}_t$$

### BPTT: the gradient problem

$$\frac{\partial L_T}{\partial \mathbf{W}_h} = \sum_{t=1}^{T} \frac{\partial L_T}{\partial \mathbf{h}_T} \prod_{k=t+1}^{T} \frac{\partial \mathbf{h}_k}{\partial \mathbf{h}_{k-1}} \frac{\partial \mathbf{h}_t}{\partial \mathbf{W}_h}$$

The product $\prod \frac{\partial \mathbf{h}_k}{\partial \mathbf{h}_{k-1}}$ involves multiplying $\mathbf{W}_h$ (scaled by $\tanh'$) $T$ times.

- If largest eigenvalue of $\mathbf{W}_h < 1$: gradients **vanish** exponentially
- If largest eigenvalue $> 1$: gradients **explode** exponentially

### LSTM: the solution

LSTM adds a **cell state** $\mathbf{c}_t$ with gates that control information flow:

$$\mathbf{f}_t = \sigma(\mathbf{W}_f[\mathbf{h}_{t-1}, \mathbf{x}_t] + \mathbf{b}_f) \quad \text{(forget gate)}$$
$$\mathbf{i}_t = \sigma(\mathbf{W}_i[\mathbf{h}_{t-1}, \mathbf{x}_t] + \mathbf{b}_i) \quad \text{(input gate)}$$
$$\tilde{\mathbf{c}}_t = \tanh(\mathbf{W}_c[\mathbf{h}_{t-1}, \mathbf{x}_t] + \mathbf{b}_c) \quad \text{(candidate)}$$
$$\mathbf{c}_t = \mathbf{f}_t \odot \mathbf{c}_{t-1} + \mathbf{i}_t \odot \tilde{\mathbf{c}}_t$$

The cell state has an **additive** update path → gradients flow without vanishing.

### LSTM output gate (completing the equations)

The output gate controls what part of the cell state becomes the hidden state:

$$\mathbf{o}_t = \sigma(\mathbf{W}_o[\mathbf{h}_{t-1}, \mathbf{x}_t] + \mathbf{b}_o) \quad \text{(output gate)}$$
$$\mathbf{h}_t = \mathbf{o}_t \odot \tanh(\mathbf{c}_t)$$

The cell state $\mathbf{c}_t$ is the "long-term memory" (can store values for many steps).
The hidden state $\mathbf{h}_t$ is the "working memory" — a filtered, squashed version
of $\mathbf{c}_t$ that is exposed to the rest of the network. The output gate learns
which parts of the cell state are relevant for the current prediction.

### Pen & paper: Why additive paths help

$\frac{\partial \mathbf{c}_T}{\partial \mathbf{c}_0} = \prod_{t=1}^{T} \mathbf{f}_t$

If forget gates $\approx 1$: gradient flows unchanged.  The LSTM can "remember" over long sequences.

### Pen & paper: BPTT walkthrough on a 3-step sequence

Use a scalar RNN for clarity: $h_t = \tanh(w_h h_{t-1} + w_x x_t)$, $y_t = w_y h_t$.

Let $w_h = 0.5$, $w_x = 1.0$, $w_y = 1.0$, $h_0 = 0$.

Input sequence: $x_1 = 1, x_2 = 0, x_3 = -1$. Target: $y_3^* = 0$.

**Forward pass:**

$h_1 = \tanh(0.5 \cdot 0 + 1.0 \cdot 1) = \tanh(1.0) = 0.762$

$h_2 = \tanh(0.5 \cdot 0.762 + 1.0 \cdot 0) = \tanh(0.381) = 0.364$

$h_3 = \tanh(0.5 \cdot 0.364 + 1.0 \cdot (-1)) = \tanh(-0.818) = -0.674$

$y_3 = w_y \cdot h_3 = -0.674$

**Loss:** $L = \frac{1}{2}(y_3 - y_3^*)^2 = \frac{1}{2}(-0.674)^2 = 0.227$

**Backward pass (BPTT):**

$\frac{\partial L}{\partial y_3} = y_3 - y_3^* = -0.674$

$\frac{\partial L}{\partial h_3} = w_y \cdot (-0.674) = -0.674$

$\frac{\partial h_3}{\partial z_3} = 1 - \tanh^2(-0.818) = 1 - 0.454 = 0.546$ (where $z_3$ is the pre-tanh value)

$\delta_3 = -0.674 \times 0.546 = -0.368$

Now propagate to $h_2$: $\frac{\partial h_3}{\partial h_2} = w_h \cdot (1 - \tanh^2(z_3)) = 0.5 \times 0.546 = 0.273$

$\delta_2 = \delta_3 \times 0.273 \times (1 - \tanh^2(z_2)) = -0.368 \times 0.273 \times 0.868 = -0.087$

Propagate to $h_1$: $\delta_1 = \delta_2 \times 0.5 \times (1 - \tanh^2(z_1)) = -0.087 \times 0.5 \times 0.420 = -0.018$

**Gradient of $w_h$:** $\frac{\partial L}{\partial w_h} = \delta_3 h_2 + \delta_2 h_1 + \delta_1 h_0$

$= (-0.368)(0.364) + (-0.087)(0.762) + (-0.018)(0) = -0.134 - 0.066 = -0.200$

Notice: the contribution from step 1 ($\delta_1$) is much smaller than from step 3 ($\delta_3$). After 100 steps, early contributions effectively vanish — this is the vanishing gradient problem.

## Python Verification

```python
# ── RNN and BPTT ────────────────────────────────────────────
import math
import random

random.seed(42)

# Simple RNN: vanishing gradient demo
print("=== Vanishing gradient in vanilla RNN ===")
W_h = 0.5  # scalar for simplicity
for T in [5, 10, 20, 50]:
    # Gradient through T steps ≈ (W_h * tanh')^T
    # Max tanh' = 1, so gradient ≈ W_h^T
    grad = W_h ** T
    print(f"  T={T:2d}: gradient factor = {W_h}^{T} = {grad:.2e}")

print(f"\n=== Exploding gradient ===")
W_h = 1.5
for T in [5, 10, 20]:
    grad = W_h ** T
    print(f"  T={T:2d}: gradient factor = {W_h}^{T} = {grad:.2e}")

# Simple RNN forward pass
print(f"\n=== RNN forward pass ===")
W_h_val = 0.8
W_x = 0.5
b = 0.0

h = 0.0  # initial hidden state
sequence = [1.0, 0.5, -0.3, 0.8, -1.0]

for t, x_t in enumerate(sequence):
    h = math.tanh(W_h_val * h + W_x * x_t + b)
    print(f"  t={t}: x={x_t:+.1f}, h={h:+.4f}")

# LSTM: forget gate preserves gradient
print(f"\n=== LSTM: forget gate gradient preservation ===")
for f_gate in [0.5, 0.9, 0.99, 1.0]:
    for T in [10, 50, 100]:
        grad = f_gate ** T
        print(f"  f={f_gate}, T={T:3d}: gradient = {grad:.4e}")
```

## Visualisation — Vanishing gradient through time

The single most important practical lesson of RNNs: **simple RNNs
forget very fast**. The plot shows how gradient magnitude decays
exponentially with time-step distance, and how an LSTM's forget gate
*can* preserve memory over hundreds of steps.

```python
# ── Visualising vanishing gradients in RNNs vs LSTMs ────────
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# (1) Plain RNN: gradient propagation contracts (or blows up) by a
# factor of |w| each time step. With |w| < 1 it vanishes; with |w| > 1
# it explodes. Sweet spot is razor-thin.
ax = axes[0]
T = 50
for w_recurrent, color in [(0.5, "tab:red"),
                           (0.9, "tab:orange"),
                           (1.0, "tab:green"),
                           (1.05, "tab:blue"),
                           (1.2, "tab:purple")]:
    grads = w_recurrent ** np.arange(T + 1)
    ax.plot(np.arange(T + 1), grads, "o-", markersize=3, lw=1.5, color=color,
            label=f"|w| = {w_recurrent}")
ax.set_yscale("log")
ax.axhline(1.0, color="black", lw=0.6)
ax.axhline(1e-7, color="grey", lw=0.6, linestyle="--")
ax.text(45, 1.5e-7, "≈ float32 noise floor", fontsize=8, color="grey", va="center")
ax.set_xlabel("time-steps unrolled (T)")
ax.set_ylabel("|gradient| through time (log)")
ax.set_title("Plain RNN: gradient = wᵀ\nVANISHES if |w| < 1, EXPLODES if |w| > 1")
ax.legend(); ax.grid(True, which="both", alpha=0.3)

# (2) LSTM forget gate: with f close to 1, gradient stays alive much
# longer; with f = 0.5, it's gone within ~10 steps. This is why LSTMs
# can model dependencies hundreds of tokens apart.
ax = axes[1]
for f_gate, color in [(0.5, "tab:red"),
                      (0.9, "tab:orange"),
                      (0.99, "tab:green"),
                      (0.999, "tab:blue")]:
    grads = f_gate ** np.arange(T + 1)
    ax.plot(np.arange(T + 1), grads, "o-", markersize=3, lw=1.5, color=color,
            label=f"forget gate f = {f_gate}")
ax.set_yscale("log")
ax.axhline(1e-7, color="grey", lw=0.6, linestyle="--")
ax.set_xlabel("time-steps unrolled (T)")
ax.set_ylabel("|gradient| through time (log)")
ax.set_title("LSTM forget gate ≈ 1 keeps gradients alive\n(memory of long-range context)")
ax.legend(); ax.grid(True, which="both", alpha=0.3)

plt.tight_layout()
plt.show()

# Print the gradient magnitudes after a few horizons.
print(f"{'horizon T':>10}  {'|w|=0.9':>15}  {'|w|=1.0':>15}  {'|w|=1.1':>15}")
print("-" * 60)
for T in [5, 10, 50, 100, 200]:
    print(f"  {T:>8}     {0.9**T:>13.2e}    {1.0**T:>13.2e}    {1.1**T:>13.2e}")
print()
print("LSTMs work because their forget-gate value typically lives near 1,")
print("so the multiplicative gradient chain stays close to 1 even over")
print("hundreds of time-steps.  Transformers (next lesson) sidestep the")
print("issue entirely with attention — a *direct* link between any two")
print("positions, regardless of distance.")
```

**Why RNNs gave way to Transformers:**

- **Plain RNNs are recurrence relations of the form $h_t = f(W h_{t-1}
  + U x_t)$.** Backprop through time multiplies the recurrence
  derivative $W^\top \cdot f'(\cdot)$ at every step. With $|w| < 1$
  the gradient vanishes; with $|w| > 1$ it explodes. There's almost
  no useful range.
- **LSTMs introduced gates** that *learn* to keep gradients alive.
  When the forget gate is near 1, $\partial h_T / \partial h_0 \approx
  1$ even for huge $T$. This is why LSTMs dominated NLP and speech
  from 2014–2018.
- **Transformers don't have the problem at all.** With self-attention,
  any two positions can connect *directly* — the gradient from token
  500 back to token 1 takes one matrix multiply, not 500 of them.
  That's the architectural reason BERT, GPT, T5, and Llama replaced
  LSTMs everywhere.

## Connection to CS / Games / AI / Business / Industry

- **Language modelling** — RNNs/LSTMs were the basis of early seq2seq models (Google Translate pre-2017)
- **Speech recognition** — bidirectional LSTMs process audio frame sequences (DeepSpeech)
- **Game AI** — LSTM agents maintain memory of past observations in partially observable environments (e.g., DQN with LSTM for Atari games with flickering frames)
- **Time series forecasting** — stock prices, weather, sensor data: sequential data is the natural domain for RNNs
- **Music generation** — LSTMs generate note sequences one step at a time
- **Handwriting recognition** — CTC (Connectionist Temporal Classification) loss + LSTM for variable-length sequences
- **Replaced by Transformers** — for most NLP tasks, attention (Tier 10-02) now dominates because it avoids the sequential bottleneck and vanishing gradients entirely
- **Algorithmic trading at Renaissance Technologies and Two Sigma** — LSTMs and GRUs ingest tick-by-tick price/volume sequences to forecast short-horizon mean-reversion; quant funds reportedly run thousands of LSTM ensembles per trading day.
- **Demand forecasting at Walmart and Amazon** — multi-step LSTM forecasters predict weekly SKU demand across millions of products and store-locations, driving replenishment orders worth billions of dollars.
- **Wearable ECG arrhythmia detection (Apple Watch ECG, AliveCor KardiaMobile)** — bidirectional LSTMs/GRUs run on-device to classify atrial fibrillation from time-series PPG/ECG signals, FDA-cleared for millions of consumers.
- **Industrial predictive maintenance (GE Predix, Siemens MindSphere)** — LSTM models trained on multivariate sensor streams from jet engines, gas turbines, and wind generators flag bearing failures days before they occur, saving millions per asset.

## Check Your Understanding

1. **Pen & paper:** If $W_h = 0.9$ and the sequence length is 100, what is the gradient magnitude after 100 steps?
2. **Pen & paper:** Why does the LSTM forget gate being close to 1 preserve gradients?
3. **Think about it:** Transformers replaced RNNs for most tasks.  What advantage do Transformers have over RNNs for long sequences?
