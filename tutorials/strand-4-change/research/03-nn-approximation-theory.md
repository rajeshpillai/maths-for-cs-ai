---
strand: change
level: research
order: 3
title: Neural-Network Approximation Theory
prerequisites:
  - tier: strand-4-change-research
    slug: 02-mean-field-games
    description: Mean-field games
connections:
  - strand-4-change-research/04-ntk-feature-learning
applications:
  - cs: "Deep-learning theory; foundational ML guarantees"
  - life: "What can neural networks express?"
---

# Neural-Network Approximation Theory

## Mental

Classical theorems on what continuous functions can be approximated
by neural networks:

- **Cybenko 1989**: a single-hidden-layer NN with sigmoid is dense in
  $C(K)$ for $K$ compact.
- **Hornik 1991**: any non-polynomial activation works (universal
  approximation).
- **Rate of approximation**: how *fast* can NN of given width
  approximate?

## Approximation rates

For $f \in W^{s, p}(\Omega)$ (Sobolev), $L$-layer NN with width
$W$ achieves error roughly $W^{-s/d}$ — scaling like classical
spline / wavelet methods.

But: **deep** networks ($L$ large) can exhibit *exponential*
expressivity gains for compositional functions:

- Telgarsky 2016: deep networks can express functions requiring
  exponentially-wide shallow networks.
- **Curse of dimensionality**: classical approximation is
  exponential in $d$; some neural-net classes break it for
  structured inputs.

## Barron space

**Barron's theorem** (1993): if $f$ has bounded "Barron norm" (a
specific Fourier-based seminorm), a width-$W$ shallow NN approximates
$f$ to error $O(1/\sqrt W)$ — *dimension-independent*.

Identifies a function class where shallow NNs avoid curse of
dimensionality.

## Universal approximation with depth

**Hanin-Sellke 2017**: ReLU networks with width $\le n + 1$ ($n =$
input dim) universal — narrow + deep suffices.

## Interactive

:::widget type=numeric-input prompt="Cybenko 1989 universal approximation single layer. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hornik 1991 generalised activation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Barron's theorem: dim-independent rate $O(1/\\sqrt W)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hanin-Sellke: ReLU width $n + 1$ universal. Type 1." answer=1 explain="Yes.":::

## Symbolic

**VC-dimension of NNs**: roughly $O(W^2 L^2)$ for $W$-wide $L$-deep
network. Large but not infinite.

**Rademacher complexity bounds**: generalisation bounds for NNs
typically scale with depth and "norm" of weights.

**Implicit bias of SGD**: SGD-trained networks generalise better
than VC-bound predicts. Phenomenon explained partly by NTK and
mean-field-NN theories (next lesson).

**Approximation in higher norms**: $H^k$ Sobolev approximation
controls derivatives — important for PDE-solving NNs.

## Computational

```python
import numpy as np

# Universal approximation: 1-layer NN with random features
def random_features_approx(target_fn, n_features=200, x_range=(-1, 1)):
    """Approximate target_fn via random Fourier features."""
    np.random.seed(0)
    x_train = np.linspace(*x_range, 1000)
    y_train = target_fn(x_train)

    # Random features: cos(omega_i x + phi_i)
    omegas = np.random.randn(n_features) * 5
    phis = np.random.uniform(0, 2*np.pi, n_features)

    Phi = np.column_stack([np.cos(omegas[i] * x_train + phis[i])
                           for i in range(n_features)])
    # Linear regression
    weights = np.linalg.lstsq(Phi, y_train, rcond=None)[0]

    # Evaluate
    def predict(x):
        Phi_x = np.column_stack([np.cos(omegas[i] * x + phis[i])
                                  for i in range(n_features)])
        return Phi_x @ weights

    return predict

# Approximate sin(2πx)
target = lambda x: np.sin(2 * np.pi * x)
nn_predict = random_features_approx(target, n_features=200)

x_test = np.linspace(-1, 1, 100)
err = np.max(np.abs(target(x_test) - nn_predict(x_test)))
print(f"Random-feature NN approximation error: {err:.4f}")

# Theoretical: error scales O(1/sqrt(n_features)) for Barron-class targets
print(f"Predicted error scale: {1/np.sqrt(200):.4f}")
```

## Applied

- **Theoretical justification of deep learning** — universal
  approximation + scaling rates explain why NNs work.
- **PDE-solving NNs** (PINNs) — approximation theory for
  PDE-residual losses.
- **Operator learning** — DeepONet, FNO learn maps between
  function spaces; new approximation theory.
- **Neural-network compression** — guarantees on accuracy after
  pruning / quantisation.
- **Transfer learning theory** — bounds via approximation of
  related tasks.

## Check Your Understanding

:::widget type=numeric-input prompt="Cybenko-Hornik universal approximation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Barron norm: dim-independent NN approximation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hanin-Sellke ReLU width-$n+1$ universal. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="VC-dim of NN: $O(W^2 L^2)$. Type 1." answer=1 explain="Yes.":::
