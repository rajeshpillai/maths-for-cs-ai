# Attention Mechanism & Transformers — Derive Scaled Dot-Product Attention

## Intuition

Attention answers: "When processing this word, which other words should I
focus on?"  It computes a weighted average where the weights are learned
based on content similarity.  Transformers stack attention layers and power
GPT, BERT, and most modern AI systems.

## Prerequisites

- Tier 2, Lesson 2: Dot Product
- Tier 6, Lesson 3: Forward Pass
- Tier 4, Lesson 9: Information Theory (softmax)

## From First Principles

### Scaled dot-product attention

Given queries $\mathbf{Q}$, keys $\mathbf{K}$, values $\mathbf{V}$:

$$\text{Attention}(\mathbf{Q}, \mathbf{K}, \mathbf{V}) = \text{softmax}\left(\frac{\mathbf{QK}^T}{\sqrt{d_k}}\right)\mathbf{V}$$

### Step by step

1. **Similarity scores:** $\mathbf{S} = \mathbf{QK}^T$ (dot product measures how similar each query is to each key)
2. **Scale:** $\mathbf{S} / \sqrt{d_k}$ (prevent dot products from being too large for softmax)
3. **Attention weights:** $\mathbf{A} = \text{softmax}(\mathbf{S} / \sqrt{d_k})$ — apply softmax to each row: $\text{softmax}(z_i) = \frac{e^{z_i}}{\sum_j e^{z_j}}$, producing a probability distribution that sums to 1
4. **Weighted sum:** $\mathbf{O} = \mathbf{A}\mathbf{V}$ (each output is a weighted combination of values)

### Pen & paper: 3 tokens, $d_k = 2$

$$\mathbf{Q} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 1 & 1 \end{pmatrix}, \quad \mathbf{K} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 0.5 & 0.5 \end{pmatrix}, \quad \mathbf{V} = \begin{pmatrix} 10 \\ 20 \\ 30 \end{pmatrix}$$

$\mathbf{QK}^T = \begin{pmatrix} 1 & 0 & 0.5 \\ 0 & 1 & 0.5 \\ 1 & 1 & 1 \end{pmatrix}$

Scale by $1/\sqrt{2} \approx 0.707$:

$\begin{pmatrix} 0.707 & 0 & 0.354 \\ 0 & 0.707 & 0.354 \\ 0.707 & 0.707 & 0.707 \end{pmatrix}$

**Softmax row 0:** $e^{0.707} = 2.028$, $e^{0} = 1$, $e^{0.354} = 1.425$.  Sum = $4.453$.

Weights: $(2.028/4.453,\; 1/4.453,\; 1.425/4.453) = (0.455,\; 0.225,\; 0.320)$.  Sum = 1 ✓

**Output for token 0:** $0.455 \times 10 + 0.225 \times 20 + 0.320 \times 30 = 4.55 + 4.50 + 9.60 = 18.65$

Token 0 attends most to key 0 (highest similarity).
Token 2 attends equally to all (its query matches all keys).

### Multi-head attention

Run $h$ attention heads in parallel with different learned projections:

$$\text{MultiHead} = \text{Concat}(\text{head}_1, \ldots, \text{head}_h)\mathbf{W}^O$$

where $\text{head}_i = \text{Attention}(\mathbf{Q}\mathbf{W}_i^Q, \mathbf{K}\mathbf{W}_i^K, \mathbf{V}\mathbf{W}_i^V)$

Each head can learn to attend to different aspects (syntax, semantics, position, etc.).

### Why $\sqrt{d_k}$?

If $q$ and $k$ have entries ~$N(0,1)$, then $q \cdot k$ has variance $d_k$.
Dividing by $\sqrt{d_k}$ normalises variance to 1, preventing softmax saturation.

### The Transformer block

```
Input → LayerNorm → Multi-Head Attention → + (residual)
     → LayerNorm → Feed-Forward (MLP)    → + (residual)
→ Output
```

Stack $N$ of these blocks.  GPT-3 has 96 blocks.

## Python Verification

```python
# ── Attention & Transformers ────────────────────────────────
import math

def softmax(x):
    max_x = max(x)
    exps = [math.exp(xi - max_x) for xi in x]
    total = sum(exps)
    return [e / total for e in exps]

# Scaled dot-product attention
print("=== Scaled Dot-Product Attention ===")
Q = [[1, 0], [0, 1], [1, 1]]
K = [[1, 0], [0, 1], [0.5, 0.5]]
V = [[10], [20], [30]]
d_k = 2

# QK^T
scores = [[sum(Q[i][d]*K[j][d] for d in range(d_k)) for j in range(3)] for i in range(3)]
print("QK^T:")
for row in scores:
    print(f"  {[f'{v:.2f}' for v in row]}")

# Scale
scale = math.sqrt(d_k)
scaled = [[s/scale for s in row] for row in scores]
print(f"\nScaled (÷√{d_k}):")
for row in scaled:
    print(f"  {[f'{v:.3f}' for v in row]}")

# Softmax each row
weights = [softmax(row) for row in scaled]
print(f"\nAttention weights (softmax):")
for i, row in enumerate(weights):
    print(f"  Token {i}: {[f'{v:.3f}' for v in row]}")

# Weighted sum of values
outputs = []
for i in range(3):
    out = sum(weights[i][j] * V[j][0] for j in range(3))
    outputs.append(out)
    print(f"  Output {i}: {out:.2f}")

# Why sqrt(d_k)?
print(f"\n=== Why scale by √d_k? ===")
import random
random.seed(42)
for d in [2, 64, 512]:
    dots = [sum(random.gauss(0,1)*random.gauss(0,1) for _ in range(d)) for _ in range(1000)]
    var = sum(d**2 for d in dots)/len(dots) - (sum(dots)/len(dots))**2
    print(f"  d_k={d:3d}: variance of q·k ≈ {var:.1f} (expected: {d})")

# Parameter count for attention
print(f"\n=== Parameter count: attention layer ===")
d_model = 512
n_heads = 8
d_k = d_model // n_heads  # 64
params = 4 * d_model * d_model  # Q, K, V projections + output
print(f"  d_model={d_model}, heads={n_heads}, d_k={d_k}")
print(f"  Parameters: 4 × {d_model}² = {params:,}")
```

## Connection to CS / Games / AI

- **GPT/ChatGPT** — stacks of Transformer decoder blocks with causal (masked) attention
- **BERT** — bidirectional Transformer encoder for NLP understanding
- **Vision Transformers (ViT)** — split image into patches, treat as tokens
- **AlphaFold** — protein structure prediction using attention on amino acid sequences
- **Stable Diffusion** — cross-attention between text embeddings and image features

## Check Your Understanding

1. **Pen & paper:** For Q=[[1,0]], K=[[1,0],[0,1]], V=[[5],[10]], compute the attention output.
2. **Pen & paper:** Why does softmax ensure the attention weights sum to 1?
3. **Think about it:** In causal (autoregressive) attention, why must future tokens be masked?
