---
strand: uncertainty
level: research
order: 4
title: Statistical Learning Theory Frontier
prerequisites:
  - tier: strand-6-uncertainty-research
    slug: 03-free-probability
    description: Free probability
connections:
  - strand-6-uncertainty-research/05-rl-theory
applications:
  - cs: "Generalisation theory of deep learning"
  - life: "Why machine learning works"
---

# Statistical Learning Theory Frontier

## Explain Like I Am 7

Classical theory says a learning machine with billions of dials
should *over-memorise* its training data and forget how to handle
fresh examples.  But neural networks shrug and *generalise*
beautifully anyway.  Why?  Statistical learning theory researchers
keep inventing finer measuring sticks: PAC-Bayes bounds reward
"flat" solutions; norm-based bounds care about the size of the
weights; neural-tangent-kernel theory matches infinitely-wide
networks to nicely-behaved kernel methods.  The frontier is
explaining why deep learning works, theoretically, not just
empirically.

## Mental

Classical SLT (Vapnik-Chervonenkis): generalisation bounded by
$\sqrt{d_{\rm VC}/n}$ where $d_{\rm VC}$ is class complexity, $n$
sample size.

For deep neural networks: $d_{\rm VC}$ huge ($O(W^2 L^2)$), but
generalisation works well in practice. **Why?**

## PAC-Bayes bounds

For a stochastic predictor with prior $P$ + posterior $Q$:

$$
R(Q) \le \hat R(Q) + \sqrt{\frac{\mathrm{KL}(Q \| P) + \log(1/\delta)}{2 n}}.
$$

Bounds true risk in terms of empirical risk + KL complexity.
For "good" posteriors (concentrating on flat / simple solutions),
KL is small → tight bounds.

**Dziugaite-Roy 2017**: PAC-Bayes bounds *non-vacuous* for trained
NNs — first time classical SLT made meaningful predictions for DL.

## Norm-based bounds

**Bartlett-Mendelson, Neyshabur-Tomioka-Srebro**: bounds via
norm of weights, depth, etc. Often tighter than VC.

**Spectral norm bounds**: control by largest singular value of
weight matrices.

## Compression-based bounds

**Arora-Ge-Neyshabur-Zhang 2018**: a network "compressible" to fewer
bits generalises well. Connects compression theory to generalisation.

## Implicit bias

Why does SGD pick good (rather than memorising) solutions?

**Neyshabur-Tomioka-Srebro**: SGD bias toward minimum-norm solutions
in linear case. Generalisation follows.

For non-linear: NTK regime + lazy training give some understanding.

## Interactive

:::widget type=numeric-input prompt="VC bound: $O(\\sqrt{d_{\\rm VC}/n})$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="PAC-Bayes uses KL(posterior || prior). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Dziugaite-Roy 2017: non-vacuous PAC-Bayes for DL. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Compression bounds: compressible NN generalises. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Information-bottleneck theory** (Tishby): NNs minimise mutual
info between inputs and intermediate layers; generalisation
trade-off.

**Sharpness-aware minimisation (SAM)** (Foret et al. 2020):
explicitly seek flat minima for better generalisation.

**Generalisation via ergodicity**: SGD as stochastic process; long-
time behaviour captures effective generalisation.

**Distillation theory**: large→small NN distillation justified via
ensemble views.

## Computational

```python
import numpy as np

# Demonstrate that random labels can be fit (Zhang et al. 2017)
def random_label_fitting():
    """NN can memorise random labels — challenges classical learnability."""
    n = 100
    X = np.random.randn(n, 10)
    y_random = np.random.randint(0, 2, n)

    # In principle: enough-capacity NN fits random labels exactly
    # Implication: classical PAC bounds fail
    print(f"Random labels: {y_random[:10]}")
    print("NN can fit perfectly given enough capacity (Zhang et al. 2017).")
    print("Implication: PAC / VC bounds vacuous — need refined SLT (PAC-Bayes etc.).")

random_label_fitting()

# PAC-Bayes intuition: smaller KL → tighter bound
def pac_bayes_bound(emp_risk, kl, n, delta=0.05):
    return emp_risk + np.sqrt((kl + np.log(1/delta)) / (2 * n))

print(f"PAC-Bayes bound (emp = 0.05, KL = 50, n = 1000): {pac_bayes_bound(0.05, 50, 1000):.4f}")
print(f"PAC-Bayes bound (emp = 0.05, KL = 10, n = 1000): {pac_bayes_bound(0.05, 10, 1000):.4f}")
# Smaller KL gives tighter bound
```

## Applied

- **Foundation models** — predict scaling-law generalisation via
  SLT-style arguments.
- **Pruning / quantisation** — compression-based generalisation
  guarantees.
- **Adversarial training** — robustness theory.
- **Calibration** — generalisation of calibration / uncertainty.
- **Domain adaptation theory** — bounds on transfer error via
  source / target divergence.

## Check Your Understanding

:::widget type=numeric-input prompt="Classical VC bound $O(\\sqrt{d_{\\rm VC}/n})$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="PAC-Bayes uses KL(posterior || prior). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Sharpness-aware minimisation seeks flat minima. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="NNs can fit random labels (Zhang et al. 2017). Type 1." answer=1 explain="Yes.":::
