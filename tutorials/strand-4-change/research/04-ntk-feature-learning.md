---
strand: change
level: research
order: 4
title: NTK and Feature-Learning Theory
prerequisites:
  - tier: strand-4-change-research
    slug: 03-nn-approximation-theory
    description: NN approximation
connections:
  - strand-4-change-research/05-deep-learning-dynamics
applications:
  - cs: "Theoretical understanding of trained neural nets"
  - life: "What does training actually do?"
---

# NTK and Feature-Learning Theory

## Explain Like I Am 7

If you make a neural network *infinitely* wide, something funny
happens: while it trains, the wiggly connections barely move at
all — they only nudge tiny bits.  That makes the giant network
behave like a much *simpler* mathematical machine, easy to study.
This frozen-at-birth picture is the **NTK**.  Real networks aren't
infinitely wide, though, so they actually do *learn* by growing
new internal patterns.  Researchers are still figuring out exactly
when and how that learning happens.

## Mental

**Neural Tangent Kernel** (Jacot-Gabriel-Hongler 2018): in the
infinite-width limit, gradient descent on a deep NN behaves *linearly*
— like kernel regression with a specific kernel
$\Theta_\infty$ (the NTK).

Implication: infinite-width networks are *Gaussian processes*; their
training dynamics are *linear in parameters*.

## Lazy vs feature learning

**Lazy training** (Chizat-Bach 2018): when initialised at large
scale, NNs stay near initialisation; training is approximately
linear (NTK regime). Features *don't* change.

**Feature learning regime**: when initialised differently
($\mu$P parameterisation, Yang 2020), NNs learn features —
intermediate representations adapt to data.

This **feature-learning vs lazy** distinction is one of the key
modern questions in deep-learning theory.

## Mean-field NN theory

For 2-layer NNs with infinite width, training dynamics governed by
a *Wasserstein gradient flow* on parameter distribution
$\mu_t$ (Mei-Montanari-Nguyen, Chizat-Bach, Rotskoff-Vanden-
Eijnden 2018).

Allows *true* feature learning: the parameter distribution shifts.

## Worked example: NTK for 2-layer ReLU

For $f(x) = \frac{1}{\sqrt N} \sum_{i=1}^N a_i \mathrm{ReLU}(w_i \cdot x + b_i)$
with $w_i, a_i$ Gaussian:

NTK in infinite-width limit:

$$
\Theta(x, x') = \mathbb E[\mathrm{ReLU}(w \cdot x) \mathrm{ReLU}(w \cdot x')] + \ldots
$$

A specific positive-definite kernel; closed-form involving
$\arccos(x \cdot x'/|x||x'|)$.

## Interactive

:::widget type=numeric-input prompt="NTK: Jacot-Gabriel-Hongler 2018. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Infinite-width NN ↔ kernel regression. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lazy vs feature learning regimes. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="μP parameterisation enables feature learning. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Mean-field equation**: parameter distribution $\mu_t$ evolves by

$$
\partial_t \mu_t = \mathrm{div}(\mu_t \nabla F(\mu_t)),
$$

a Wasserstein gradient flow on parameter space.

**Tensor programs** (Yang): unifying framework for analyzing
infinite-width limits across architectures (CNN, RNN, attention).

**Maximal-update parameterisation** (μP): rescaling that allows
hyperparameters tuned on small models to transfer to large.
Practical industrial-scale impact.

**NTK + spectral bias**: NTK eigenfunctions ordered by frequency;
NN learns low frequencies first ("spectral bias of NN").

## Computational

```python
import numpy as np

# NTK for 2-layer ReLU NN at initialisation
def ntk_2layer_relu(x, x_prime):
    """NTK of infinite-width 2-layer ReLU at unit-sphere inputs."""
    # |x| = |x'| = 1
    cos_theta = np.dot(x, x_prime) / (np.linalg.norm(x) * np.linalg.norm(x_prime))
    cos_theta = np.clip(cos_theta, -1, 1)
    theta = np.arccos(cos_theta)

    # NTK = K(x, x') (sin θ + (π - θ) cos θ) / (2π)
    return (np.sin(theta) + (np.pi - theta) * cos_theta) / (2 * np.pi)

# Test: NTK at x = x' should give 1/2
x = np.array([1, 0])
print(f"NTK(x, x) = {ntk_2layer_relu(x, x):.4f}")    # ≈ 0.5

# Off-diagonal
x_prime = np.array([0, 1])
print(f"NTK(e_1, e_2) = {ntk_2layer_relu(x, x_prime):.4f}")    # ≈ 1/(2π)

# In infinite-width limit, NN training ↔ kernel regression with this kernel
# Predictions of trained NN: f(x) = Θ(x, X_train) Θ(X_train, X_train)^{-1} y
# (Lazy / NTK regime)
```

## Applied

- **Theoretical DL** — NTK provides linear surrogate for studying
  deep training.
- **Hyperparameter transfer** — μP allows scaling laws to operate
  across model sizes.
- **Continual / few-shot learning** — feature-learning regime is
  preferred for data efficiency.
- **Implicit regularisation** — spectral bias and NTK explain
  generalisation behaviour.
- **Foundation models** — scaling laws (Kaplan, Chinchilla) sit
  between lazy and feature regimes.

## Check Your Understanding

:::widget type=numeric-input prompt="NTK Jacot-Gabriel-Hongler 2018. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Infinite-width NN behaves linearly (NTK regime). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Mean-field NN dynamics = Wasserstein gradient flow. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="μP enables hyperparameter transfer across scales. Type 1." answer=1 explain="Yes.":::
