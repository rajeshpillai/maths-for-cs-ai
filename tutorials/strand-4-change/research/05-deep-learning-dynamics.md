---
strand: change
level: research
order: 5
title: Deep-Learning Dynamics
prerequisites:
  - tier: strand-4-change-research
    slug: 04-ntk-feature-learning
    description: NTK and feature learning
connections:
  - strand-4-change-research/06-diffusion-models-deeper
applications:
  - cs: "Understanding NN training; foundation-model scaling laws"
  - life: "Why deep learning generalises despite over-parameterisation"
---

# Deep-Learning Dynamics

## Mental

Modern DL theory tries to explain *what training does* and *why it
generalises* despite billions of parameters.

Open puzzles:

- Networks have far more parameters than data → why don't they
  overfit?
- Why does **early stopping** generalise, **double descent** appears,
  **lottery-ticket** subnetworks exist?

## Implicit regularisation of SGD

**SGD bias toward "flat" minima** (Keskar et al. 2017): SGD finds
flatter minima than full-batch GD; flatter generalises better.

**Implicit ridge regularisation**: SGD on least-squares is
*equivalent* to ridge regression with effective $\lambda$ depending on
step size and noise.

## Double descent

Belkin et al. 2019: as model size grows past interpolation
threshold, test error decreases again — opposite of classical
overfitting curve. Foundation: *over-parameterised* fits
generalise.

Now well-understood theoretically: the *interpolation threshold* is
where bias and variance peak; beyond it, "harmless overfitting"
gives low-norm solutions.

## Lottery ticket hypothesis

**Frankle-Carbin 2019**: large NNs contain small *winning
subnetworks* that, when re-initialised and trained, match full-NN
performance.

**Strong lottery ticket** (Ramanujan 2020): in a *random* NN,
sub-networks alone (no training) approximate any function — pure
existence result.

## Interactive

:::widget type=numeric-input prompt="SGD biases toward flat minima (Keskar et al. 2017). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Double descent: error decreases past interpolation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lottery ticket: subnetworks at right init match full-NN. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Belkin et al. 2019 popularised double descent. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Neural collapse** (Papyan-Han-Donoho 2020): in late training,
class means and classifier weights converge to a *simplex equiangular
tight frame*. Striking geometric phenomenon.

**Grokking** (Power et al. 2022): NNs sometimes generalise *long
after* training loss saturates — phase transition in
representations.

**Scaling laws** (Kaplan, Chinchilla, Hoffmann et al.): test loss
scales as power law in compute / dataset / parameters. Practical
for budgeting LLM training.

**Mechanistic interpretability**: reverse-engineering individual
neurons / circuits in trained NNs (Anthropic, OpenAI work).

## Computational

```python
import numpy as np
import matplotlib.pyplot as plt

# Double descent demo: test error vs model size
np.random.seed(0)

def synthetic_regression(N=100, d=20):
    X = np.random.randn(N, d)
    w = np.random.randn(d)
    y = X @ w + 0.1 * np.random.randn(N)
    return X, y, w

X_train, y_train, w_true = synthetic_regression(N=50, d=100)
X_test, y_test, _ = synthetic_regression(N=200, d=100)

# Vary "model dim" — first p features
errors = []
for p in [5, 20, 49, 50, 51, 80, 100]:
    if p < X_train.shape[0]:
        # Under-parameterised: ordinary least squares
        w_hat = np.linalg.lstsq(X_train[:, :p], y_train, rcond=None)[0]
    else:
        # Over-parameterised: minimum-norm solution
        w_hat = np.linalg.pinv(X_train[:, :p]) @ y_train
    err = np.mean((X_test[:, :p] @ w_hat - y_test) ** 2)
    errors.append((p, err))

print("p, test_err:")
for p, e in errors:
    print(f"  {p}, {e:.4f}")

# Should see error spike near p = N (= 50) and decrease again past
print("Double descent visible around model size = data size.")
```

## Applied

- **Foundation-model scaling** — Kaplan / Chinchilla laws guide
  budgets for trillion-parameter models.
- **Mechanistic interpretability** — circuits in transformers
  decoded (Anthropic).
- **Phase-transition forecasting** — predict when models will
  acquire new capabilities (grokking-style).
- **Pruning and compression** — lottery-ticket techniques.
- **Theoretical AI safety** — analyse training to predict /
  control emergent behaviour.

## Check Your Understanding

:::widget type=numeric-input prompt="SGD finds flat minima → better generalisation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Double descent: error decreases past interpolation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lottery ticket: small subnetworks at right init suffice. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Scaling laws: test loss ∝ power-law in compute. Type 1." answer=1 explain="Yes.":::
