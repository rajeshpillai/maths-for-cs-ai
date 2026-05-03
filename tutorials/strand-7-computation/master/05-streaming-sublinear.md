---
strand: computation
level: master
order: 5
title: Streaming and Sublinear Algorithms
prerequisites:
  - tier: strand-7-computation-master
    slug: 04-kolmogorov-complexity
    description: Kolmogorov complexity
connections:
  - strand-7-computation-master/06-fhe-and-zk
applications:
  - cs: "Big-data analytics, network monitoring, ML at scale"
  - life: "Algorithms reading data once, with little memory"
---

# Streaming and Sublinear Algorithms

## Mental

**Streaming model**: data arrives one item at a time; algorithm has
*sub-linear* memory and *one* (or constant) pass.

**Sublinear time**: even reading all data is too slow; access via
random samples or queries.

**Property testing**: distinguish "satisfies property" from "$\epsilon$-far
from it" with few queries.

These models capture the *real-world reality* of huge datasets where
$O(n)$ is already too slow.

## Streaming examples

| Problem | Streaming algorithm | Memory |
|---|---|---|
| Distinct count | HyperLogLog | $O(\log \log n)$ |
| Frequency moments | AMS sketch | $O(\log n)$ |
| Heavy hitters | Count-Min | $O(1/\epsilon \log n)$ |
| $L_2$ norm | Johnson-Lindenstrauss | $O(\epsilon^{-2} \log n)$ |
| Approx median | Greenwald-Khanna | $O(\log n / \epsilon)$ |

## AMS sketch (frequency moments)

For frequencies $f_1, f_2, \ldots, f_n$ of items, **$F_k = \sum f_i^k$**.

- $F_0$: distinct count.
- $F_2 = \sum f_i^2$: variance / similarity.
- $F_\infty = \max f_i$: heavy-hitter.

**AMS**: maintain $X = \sum f_i \cdot s_i$ where $s_i \in \{\pm 1\}$
random hash. Then $\mathbb E[X^2] = F_2$. Average several copies for
concentration.

**Indyk-Woodruff**: optimal $O(\log n)$-bit sketches for $F_2$.

## Property testing

**Linearity testing** (Strand 5 Master Lesson 7) is the prototype.

**Sortedness testing**: query positions $i, j$; if $f(i) < f(j)$ when
$i < j$, accept. $O(\log n / \epsilon)$ queries suffice.

**Graph property testing**: dense-graph model — sample edges; sparse
model — neighbour queries.

## Interactive

:::widget type=numeric-input prompt="HyperLogLog: count distinct in $O(\\log \\log n)$ bits. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="AMS sketch: $\\mathbb E[X^2] = F_2$ via random signs. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Property testing: distinguish satisfy from $\\epsilon$-far. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Streaming: one pass + sublinear memory. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Communication complexity lower bounds**: streaming lower bounds
follow from communication-complexity arguments. Disjointness is
hard, propagating to streaming.

**Lower bounds for sublinear time**: typically information-theoretic;
must distinguish two distributions with few samples.

**Differential privacy and streaming**: composition theorems,
private analytics in streams.

**Robust streaming**: algorithms surviving adversarial input order
(turnstile model).

## Computational

```python
import numpy as np
from collections import defaultdict

# AMS sketch for F_2
class AMSSketch:
    def __init__(self, num_estimators=20, num_signs=200):
        self.k = num_estimators
        self.t = num_signs
        # Random ±1 signs per estimator, per element
        self.signs = np.random.choice([-1, 1], size=(num_estimators, num_signs))
        self.X = np.zeros(num_estimators)

    def update(self, item, count=1):
        for i in range(self.k):
            self.X[i] += count * self.signs[i, item]

    def estimate_F2(self):
        return np.mean(self.X**2)

# Test on a synthetic stream
sketch = AMSSketch(num_estimators=50, num_signs=200)
freqs = [10, 20, 30, 5, 15, 25]
for item, count in enumerate(freqs):
    sketch.update(item, count)

true_F2 = sum(c**2 for c in freqs)
print(f"True F_2 = {true_F2}, estimated = {sketch.estimate_F2():.0f}")

# Greenwald-Khanna approximate quantiles
class GKQuantile:
    def __init__(self, eps=0.1):
        self.eps = eps
        self.tuples = []  # (value, gap, delta)

    def insert(self, v):
        self.tuples.append((v, 1, 0))
        # Real implementation maintains compressed tuples; sketch only

    def query(self, rank):
        # Stub
        sorted_tuples = sorted(self.tuples)
        # ... approximate quantile from cumulative gaps
        return None

# Heavy-hitters: keep top-K via Misra-Gries
def misra_gries(stream, k):
    counters = {}
    for item in stream:
        if item in counters: counters[item] += 1
        elif len(counters) < k - 1: counters[item] = 1
        else:
            for key in list(counters):
                counters[key] -= 1
                if counters[key] == 0: del counters[key]
    return counters

stream = "aabbccddeefgghhh"
print("Misra-Gries top-3:", misra_gries(stream, 3))
```

## Applied

- **Database query optimisation** — cardinality estimates via
  HyperLogLog and Count-Min.
- **Network monitoring** — streaming algorithms detect anomalies in
  flow logs.
- **Recommendation systems** — top-K trending items via Count-Min.
- **Streaming ML** — Johnson-Lindenstrauss for dim reduction;
  Count-Sketch features.
- **Differential privacy in streams** — Google's RAPPOR, Apple
  privacy mechanisms.

## Check Your Understanding

:::widget type=numeric-input prompt="HyperLogLog: $O(\\log \\log n)$ memory for distinct count. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="AMS estimates $F_2 = \\sum f_i^2$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="BLR linearity testing is property testing. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Streaming vs sublinear-time: streaming reads all data, sublinear-time samples. Type 1." answer=1 explain="Yes.":::
