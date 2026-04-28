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

## Visualisation — The attention matrix

A Transformer's attention layer is, at heart, a **soft-max over
dot-products**. The plot shows what the resulting attention matrix
looks like for a small toy sequence, and how the **causal mask** in
GPT-style models prevents tokens from attending to future positions.

```python
# ── Visualising scaled dot-product attention ────────────────
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(0)

# A short toy "sentence" — 6 tokens, each with d_model = 16 random
# features. In a real Transformer these would be embedding vectors.
seq_len, d_model = 6, 16
tokens = ["The", "cat", "sat", "on", "the", "mat"]
X = rng.standard_normal((seq_len, d_model))

# Random projection matrices for Q, K, V (untrained).
WQ = rng.standard_normal((d_model, d_model)) * 0.3
WK = rng.standard_normal((d_model, d_model)) * 0.3
WV = rng.standard_normal((d_model, d_model)) * 0.3

Q = X @ WQ
K = X @ WK
V = X @ WV

def softmax(z, axis=-1):
    z = z - z.max(axis=axis, keepdims=True)
    e = np.exp(z)
    return e / e.sum(axis=axis, keepdims=True)

# Unmasked attention.
scores = Q @ K.T / np.sqrt(d_model)
A_unmasked = softmax(scores)

# Causal mask: zero out future positions before softmax.
mask = np.triu(np.ones((seq_len, seq_len)), k=1) * (-1e9)
A_causal = softmax(scores + mask)

fig, axes = plt.subplots(1, 2, figsize=(13, 5.5))

for ax, (A_mat, title) in zip(axes,
                              [(A_unmasked, "Encoder attention\n(every token sees every other)"),
                               (A_causal,   "Decoder (causal) attention\n(token i can only see j ≤ i — needed for generation)")]):
    im = ax.imshow(A_mat, cmap="viridis", vmin=0, vmax=A_mat.max())
    ax.set_xticks(range(seq_len)); ax.set_yticks(range(seq_len))
    ax.set_xticklabels(tokens); ax.set_yticklabels(tokens)
    ax.set_xlabel("attended-to (key)"); ax.set_ylabel("query")
    for i in range(seq_len):
        for j in range(seq_len):
            ax.text(j, i, f"{A_mat[i, j]:.2f}", ha="center", va="center",
                    fontsize=8, color="white" if A_mat[i, j] > 0.3 else "black")
    ax.set_title(title)
    plt.colorbar(im, ax=ax, fraction=0.046)

plt.tight_layout()
plt.show()

# Print the parameter count for a real attention layer.
def attention_params(d_model, n_heads):
    """Q, K, V projections + output projection."""
    return 4 * d_model * d_model

for d, h, name in [(512, 8, "BERT-base"),
                   (768, 12, "GPT-2"),
                   (4096, 32, "Llama-7B"),
                   (8192, 64, "GPT-4 (rumoured)")]:
    p = attention_params(d, h)
    print(f"  {name:<22}  d_model={d:>5}  heads={h:>3}  params per layer = {p:>14,}")
print()
print("Self-attention scales like O(seq_len²) in time and memory —")
print("which is exactly why context-length improvements are big news,")
print("and why people invent FlashAttention, sparse attention, RoPE, etc.")
```

**The single most-revolutionary equation in modern ML:**

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right) V
$$

- **It computes a weighted sum of values.** The weights come from the
  similarity (dot product) of each query against every key, normalised
  by softmax. Tokens that are *most relevant* to the current query
  contribute most.
- **The matrix you see is the soul of a Transformer.** Each row is one
  query token; each column is one position being attended to. Bright
  cells = "this query depends heavily on that key". Visualising
  attention matrices is how researchers debug what a model is "looking
  at".
- **Causal masking enables generation.** GPT-style decoders use the
  upper-triangular mask in the right plot — token $i$ can only attend
  to tokens $\le i$, so a partial sequence's predictions don't depend
  on the future. The self-attention block is the *only* layer where
  this masking matters.

## Connection to CS / Games / AI / Business / Industry

- **GPT/ChatGPT** — stacks of Transformer decoder blocks with causal (masked) attention
- **BERT** — bidirectional Transformer encoder for NLP understanding
- **Vision Transformers (ViT)** — split image into patches, treat as tokens
- **AlphaFold** — protein structure prediction using attention on amino acid sequences
- **Stable Diffusion** — cross-attention between text embeddings and image features
- **Bloomberg GPT and JPMorgan IndexGPT** — finance-specific transformers digest earnings calls, SEC filings, and Reuters news to flag market-moving events for trading desks; LLM-based research assistants are now standard at every major investment bank.
- **AlphaFold 2 at DeepMind** — Evoformer attention blocks decoded the 3D structure of every known protein (200M+ entries in the AlphaFold DB), accelerating drug discovery at companies like Isomorphic Labs and Moderna.
- **Tesla FSD v12 end-to-end driving** — multi-head attention over BEV (bird's-eye-view) tokens fuses 8 cameras into trajectory predictions, removing hundreds of thousands of lines of hand-coded C++ planning logic.
- **Genomic sequence modeling (NVIDIA BioNeMo, Nucleotide Transformer)** — transformer attention over DNA/RNA tokens predicts variant pathogenicity for clinical genomics labs at Illumina and Genentech.

## Check Your Understanding

1. **Pen & paper:** For Q=[[1,0]], K=[[1,0],[0,1]], V=[[5],[10]], compute the attention output.
2. **Pen & paper:** Why does softmax ensure the attention weights sum to 1?
3. **Think about it:** In causal (autoregressive) attention, why must future tokens be masked?
