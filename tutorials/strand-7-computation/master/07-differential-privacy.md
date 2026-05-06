---
strand: computation
level: master
order: 7
title: Differential Privacy
prerequisites:
  - tier: strand-7-computation-master
    slug: 06-fhe-and-zk
    description: FHE and zero knowledge
connections:
  - strand-7-computation-master/08-formal-verification-deep
applications:
  - cs: "Apple, Google, US Census Bureau privacy systems"
  - life: "Algorithmic privacy guarantees"
---

# Differential Privacy

## Explain Like I Am 7

Suppose the class wants to know how many kids brush their teeth at
night, but nobody wants to admit the truth.  So before each kid
answers, they secretly flip a coin: heads, tell the truth; tails,
just say "yes."  The teacher counts up the answers, then quietly
subtracts what the coin would have added — and out comes a pretty
good estimate.  No single kid can be blamed because no answer is
*provably* theirs.  That clean trick — adding tiny calibrated noise
so totals work but individuals are hidden — is **differential
privacy**.

## Mental

A randomised algorithm $\mathcal A$ is **$\epsilon$-differentially
private** if, for any neighbouring datasets $D, D'$ (differ in one
record) and any output $S$:

$$
P(\mathcal A(D) \in S) \le e^\epsilon P(\mathcal A(D') \in S).
$$

Adding/removing one person changes outputs by at most factor $e^\epsilon$.

For small $\epsilon$ (typically $\le 1$), an attacker can't tell from
the output which dataset produced it — *individual privacy*.

## $(\epsilon, \delta)$-DP

Allow small failure probability $\delta$:

$$
P(\mathcal A(D) \in S) \le e^\epsilon P(\mathcal A(D') \in S) + \delta.
$$

Typical $\delta = 10^{-9}$ for a database of $10^6$ records.

## Mechanisms

- **Laplace mechanism**: add $\mathrm{Lap}(\Delta f / \epsilon)$ noise to
  $f(D)$. **$\Delta f$**: $L^1$-sensitivity = max change of $f$ over
  neighbouring datasets.
- **Gaussian mechanism**: add $\mathcal N(0, \sigma^2)$ for
  $(\epsilon, \delta)$-DP, with $\sigma \propto \Delta f / \epsilon$
  (sensitivity in $L^2$).
- **Exponential mechanism**: select discrete output $r$ with
  probability $\propto \exp(\epsilon u(D, r) / 2)$ for utility $u$.

## Composition theorems

**Sequential composition**: $k$ mechanisms each $\epsilon_i$-DP →
total $\sum \epsilon_i$-DP.

**Advanced composition**: tighter $O(\sqrt{k} \epsilon)$ bound for
$\epsilon$-DP composition.

**Privacy accounting**: track total privacy budget $\epsilon$ across
many queries (Apple, Google use this).

## Worked example: counting

Query: "How many users have $X$?" Sensitivity = 1.

Laplace mechanism: report $\mathrm{count} + \mathrm{Lap}(1/\epsilon)$.

For $\epsilon = 0.1$: noise scale $1/0.1 = 10$. So count of $1000$
returns $1000 \pm 10$ — small noise relative to count, big
relative to single-user contribution.

## Interactive

:::widget type=numeric-input prompt="$\\epsilon$-DP: $P(\\mathcal A(D) \\in S) \\le e^\\epsilon P(\\mathcal A(D') \\in S)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Laplace mechanism noise scale: $\\Delta f / \\epsilon$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Composition: $k$ mechanisms each $\\epsilon$-DP → at most $k \\epsilon$-DP (sequential). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Apple uses DP for user telemetry. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Local DP**: each user adds noise to their own data before sharing.
RAPPOR (Google), Apple's keyboard.

**Central DP**: trusted curator sees raw data, releases noisy
aggregates.

**DP-SGD** (Abadi et al. 2016): differentially private gradient
descent. Add noise to gradients per step. Used by Google's
on-device language models.

**Rényi DP**: tighter privacy accounting via Rényi divergences.
Standard in modern DP.

**$f$-DP and Gaussian DP**: generalises DP via trade-off functions.

## Computational

```python
import numpy as np

# Laplace mechanism for counting query
def laplace_count(true_count, epsilon, sensitivity=1):
    return true_count + np.random.laplace(0, sensitivity / epsilon)

true = 5000
epsilon = 0.1
runs = [laplace_count(true, epsilon) for _ in range(1000)]
print(f"Laplace mechanism: mean = {np.mean(runs):.1f}, std = {np.std(runs):.2f}")
print(f"Theoretical std: {np.sqrt(2) / epsilon:.2f}")

# Privacy budget composition: 5 sequential queries each ε = 0.1 → 0.5 total
queries = 5
total_eps = queries * 0.1
print(f"Sequential composition: {queries} × 0.1 = {total_eps:.2f}-DP overall")

# DP-SGD: clip per-sample gradient + add Gaussian noise
def dp_sgd_step(gradients, clip_norm=1.0, noise_multiplier=1.0):
    """Per-sample gradients (B, d); return noised mean gradient."""
    norms = np.linalg.norm(gradients, axis=1, keepdims=True)
    factors = np.minimum(1, clip_norm / np.maximum(norms, 1e-9))
    clipped = gradients * factors
    mean = np.mean(clipped, axis=0)
    noise = np.random.normal(0, noise_multiplier * clip_norm / len(gradients), size=mean.shape)
    return mean + noise

# Demo
B, d = 32, 10
grads = np.random.randn(B, d) * 0.5
private_grad = dp_sgd_step(grads, clip_norm=1.0, noise_multiplier=1.1)
print(f"Mean ||noised gradient|| = {np.linalg.norm(private_grad):.4f}")
```

## Applied

- **US Census 2020** — first census with formal DP guarantees.
- **Apple, Google, Microsoft** — DP for user-telemetry collection.
- **Mobile keyboards** — Google's federated learning + DP-SGD.
- **Medical / health data** — DP releases of clinical statistics.
- **AI training data privacy** — DP-SGD for training language models
  on private corpora.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\epsilon$-DP bounds output ratio between neighbouring datasets. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Laplace mechanism: noise $\\Delta f / \\epsilon$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="DP-SGD adds noise to clipped gradients. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="US Census 2020 uses DP. Type 1." answer=1 explain="Yes.":::
