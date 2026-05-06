---
strand: uncertainty
level: master
order: 4
title: Information Theory Deeper
prerequisites:
  - tier: strand-6-uncertainty-master
    slug: 03-ergodic-theory
    description: Ergodic theory
connections:
  - strand-6-uncertainty-master/05-empirical-processes
applications:
  - cs: "Compression, channel coding, ML loss design"
  - life: "How much information is in a probability distribution?"
---

# Information Theory Deeper

## Explain Like I Am 7

Imagine a friend describing the weather every day with a secret
code.  If the weather is *very* predictable (always sunny), the
code can be tiny — almost no message needed.  If it's wildly
unpredictable, the code has to be longer to carry all the
surprise.  **Entropy** measures how surprised you'd be on average,
and it tells you the shortest possible code length for that source.
Shannon's deep theorems then say *exactly* how much you can
compress messages and how fast you can squeeze them through a noisy
channel before mistakes overwhelm.

## Mental

**Shannon entropy**: $H(X) = -\sum_x p(x) \log p(x)$. Average bits
needed to describe $X$.

**Mutual information**: $I(X; Y) = H(X) + H(Y) - H(X, Y) = \mathbb E[\log p(x, y) / (p(x) p(y))]$.
"Bits of info $X$ tells us about $Y$."

**KL divergence**: $\mathrm{KL}(p \| q) = \sum p(x) \log p(x)/q(x) \ge 0$.
Cost in extra bits if you encode according to $q$ when truth is
$p$.

## Source coding theorem (Shannon)

For iid $X_1, X_2, \ldots$ with entropy $H(X)$, the minimum
expected number of bits per symbol to losslessly encode tends to
$H(X)$ as block length $\to \infty$.

So **entropy = optimal compression rate**. Practical methods
(Huffman, arithmetic, LZW) approach this limit on real data.

## Channel coding theorem (Shannon)

For a noisy channel with **capacity** $C = \max_{p(x)} I(X; Y)$:

- For any rate $R < C$, there exist codes with arbitrarily low error.
- For $R > C$, error probability bounded away from 0.

Capacity = mutual-information bottleneck. Achieved by random codes
in Shannon's proof; LDPC, polar codes are practical approaches.

## Worked example: binary symmetric channel

Symbol flips with probability $p$:

$$
C = 1 - H(p), \quad H(p) = -p \log p - (1-p) \log(1-p).
$$

For $p = 0.1$: $C = 1 - H(0.1) \approx 1 - 0.469 = 0.531$ bits/use.

So at most ~0.531 bits of information per channel use are
recoverable.

## Interactive

:::widget type=numeric-input prompt="$H(X) = -\\sum p \\log p$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Mutual information $I(X; Y) = H(X) + H(Y) - H(X, Y)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Shannon source coding: entropy = compression limit. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Channel capacity $C = \\max_{p(x)} I(X; Y)$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Asymptotic equipartition property (AEP)**: for iid
$X_1, \ldots, X_n$, $-\frac{1}{n} \log p(X_1, \ldots, X_n) \to H(X)$
in probability. Foundation of source-coding via typical sets.

**Differential entropy**: $h(X) = -\int p \log p$ for continuous $X$.
Not invariant under transformations; relative entropies are.

**Rate-distortion theory**: lossy compression. $R(D) = $ minimum bits
to describe $X$ within distortion $D$.

**Network information theory** — multi-user channels (broadcast,
MAC, interference). Many open problems.

## Computational

```python
import numpy as np

def H(p):
    """Binary entropy."""
    p = np.clip(p, 1e-12, 1 - 1e-12)
    return -p * np.log2(p) - (1 - p) * np.log2(1 - p)

# Capacity of binary symmetric channel
def capacity_bsc(p):
    return 1 - H(p)

print(f"Capacity at p = 0.1: {capacity_bsc(0.1):.4f}")
print(f"Capacity at p = 0.5: {capacity_bsc(0.5):.4f}")    # 0 — no info
print(f"Capacity at p = 0: {capacity_bsc(0):.4f}")        # 1 — perfect channel

# Source coding: Huffman
import heapq
from collections import Counter

def huffman_code(prob):
    heap = [[w, [sym, ""]] for sym, w in prob.items()]
    heapq.heapify(heap)
    while len(heap) > 1:
        lo = heapq.heappop(heap)
        hi = heapq.heappop(heap)
        for pair in lo[1:]:
            pair[1] = '0' + pair[1]
        for pair in hi[1:]:
            pair[1] = '1' + pair[1]
        heapq.heappush(heap, [lo[0] + hi[0]] + lo[1:] + hi[1:])
    return dict([sym, code] for sym, code in heap[0][1:])

prob = {'a': 0.5, 'b': 0.25, 'c': 0.125, 'd': 0.125}
code = huffman_code(prob)
print(f"Huffman codes: {code}")
# Expected length
expected_len = sum(prob[s] * len(c) for s, c in code.items())
H_X = -sum(p * np.log2(p) for p in prob.values())
print(f"Entropy: {H_X:.4f}, Huffman length: {expected_len:.4f}")
```

## Applied

- **JPEG / MP3 / video codecs** — rate-distortion theory in lossy
  compression.
- **5G / 6G** — LDPC and polar codes approach Shannon capacity at
  practical block lengths.
- **Cryptography** — entropy as a measure of randomness; key-derivation
  functions condense weak entropy.
- **ML loss design** — cross-entropy for classification, KL for
  variational inference.
- **Information bottleneck** in deep learning — Tishby et al. propose
  IB principle for understanding what NN layers compute.

## Check Your Understanding

:::widget type=numeric-input prompt="Entropy is the optimal lossless compression rate. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Channel capacity = max mutual information over input distribution. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="KL divergence is non-negative. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="AEP: $-\\frac{1}{n}\\log p(X_1, \\ldots, X_n) \\to H(X)$ in prob. Type 1." answer=1 explain="Yes.":::
