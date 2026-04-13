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

### Pen & paper: Why additive paths help

$\frac{\partial \mathbf{c}_T}{\partial \mathbf{c}_0} = \prod_{t=1}^{T} \mathbf{f}_t$

If forget gates $\approx 1$: gradient flows unchanged.  The LSTM can "remember" over long sequences.

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

## Check Your Understanding

1. **Pen & paper:** If $W_h = 0.9$ and the sequence length is 100, what is the gradient magnitude after 100 steps?
2. **Pen & paper:** Why does the LSTM forget gate being close to 1 preserve gradients?
3. **Think about it:** Transformers replaced RNNs for most tasks.  What advantage do Transformers have over RNNs for long sequences?
