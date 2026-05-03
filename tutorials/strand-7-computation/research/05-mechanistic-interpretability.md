---
strand: computation
level: research
order: 5
title: Mechanistic Interpretability
prerequisites:
  - tier: strand-7-computation-research
    slug: 04-ai-alignment-formal
    description: AI alignment formal
connections:
  - strand-7-computation-research/06-algorithmic-game-theory-frontier
applications:
  - cs: "Reverse-engineering trained NNs; AI safety"
  - life: "Understanding what NNs actually compute"
---

# Mechanistic Interpretability

## Mental

**Mechanistic interpretability**: reverse-engineer trained NNs to
understand the *algorithms* they implement.

Anthropic, OpenAI, DeepMind have substantial interpretability
research programs. Goal: predict / control behaviour of large models.

## Circuit-level analysis

For each *neuron* / **head** in a transformer, identify:

- What patterns activate it.
- What downstream effects it has.
- What "circuit" of weights it participates in.

Examples:

- **Induction heads** (Olsson et al. 2022): heads that copy from
  earlier in context.
- **Indirect object identification (IOI)** (Wang et al. 2022):
  identified circuit for grammatical IOI tasks in GPT-2.
- **Polysemanticity**: neurons activate for multiple unrelated
  concepts; **superposition** hypothesis (Anthropic).

## Sparse autoencoders

**SAEs** (Bricken et al. 2023, Anthropic): train sparse autoencoders
on NN activations to find **monosemantic features** — directions in
activation space corresponding to interpretable concepts.

Scaled to **Claude 3 Sonnet** in 2024 with 30M+ features.

## Causal scrubbing

**Causal scrubbing** (Chan-Garriga-Alonso et al. 2022): formal
methodology for testing interpretability hypotheses by intervening
on activations.

If hypothesis says "circuit $X$ implements function $f$," verify by
ablating non-$X$ activations and checking $f$ is preserved.

## Interactive

:::widget type=numeric-input prompt="Mechanistic interpretability: reverse-engineer NN algorithms. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Induction heads (Olsson et al. 2022). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Sparse autoencoders for monosemantic features. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Causal scrubbing tests interpretability hypotheses. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Toy models of superposition** (Elhage et al. 2022): theoretical
analysis of when polysemanticity arises.

**Activation patching**: swap activations between forward passes;
trace causal contribution of components.

**Logit lens**: project intermediate activations to vocabulary;
trace how predictions form layer by layer.

**Steering vectors**: add directions to activations to control
generation behaviour. Real-world demonstration of mechanistic
intervention.

## Computational

```python
import numpy as np

# Toy model of superposition
def linear_features_superposition(d_features=10, d_hidden=5, sparsity=0.05):
    """Sparse features superposed in lower-dim hidden space."""
    # True features: d_features
    # Hidden representation: d_hidden < d_features
    # Random projection
    np.random.seed(0)
    W = np.random.randn(d_hidden, d_features)
    # Sample sparse feature vector
    f = (np.random.rand(d_features) < sparsity).astype(float) * np.random.randn(d_features)
    h = W @ f      # hidden activation
    return f, h, W

f, h, W = linear_features_superposition()
print(f"Original features: {f}")
print(f"Hidden activation: {h}")
print(f"|true features| > |hidden|: {len(f)} > {len(h)}")

# Recover features via SAE-style sparse coding
def sparse_recover(h, W, sparsity_penalty=0.1, n_iter=100):
    """Solve f_hat = argmin |W f - h|² + λ|f|_1."""
    f_hat = np.zeros(W.shape[1])
    for _ in range(n_iter):
        grad = W.T @ (W @ f_hat - h) + sparsity_penalty * np.sign(f_hat)
        f_hat -= 0.01 * grad
    return f_hat

f_recovered = sparse_recover(h, W)
print(f"Recovered: {f_recovered}")
# Compare with true f
```

## Applied

- **AI safety auditing** — detect deceptive / misaligned behaviour.
- **Model debugging** — trace why model makes specific errors.
- **Editing knowledge** — surgically modify model knowledge
  (ROME, MEMIT).
- **Capability forecasting** — predict emergent abilities from
  circuits.
- **Compression / pruning** — remove redundant features identified by
  SAEs.

## Check Your Understanding

:::widget type=numeric-input prompt="Mechanistic interpretability reverse-engineers NN circuits. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Sparse autoencoders find monosemantic features. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Causal scrubbing for hypothesis testing. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Steering vectors control generation. Type 1." answer=1 explain="Yes.":::
