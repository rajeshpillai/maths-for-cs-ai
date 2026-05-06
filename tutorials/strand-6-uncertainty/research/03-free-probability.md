---
strand: uncertainty
level: research
order: 3
title: Free Probability
prerequisites:
  - tier: strand-6-uncertainty-research
    slug: 02-rmt-universality
    description: RMT universality
connections:
  - strand-6-uncertainty-research/04-statistical-learning-theory
applications:
  - cs: "Random matrix spectra in ML, quantum information"
  - life: "Probability for non-commuting random variables"
---

# Free Probability

## Explain Like I Am 7

In ordinary probability, $X \cdot Y$ and $Y \cdot X$ mean the same
thing because numbers commute.  But matrices don't!  When you ask
"what's the spectrum of two huge random matrices added together?"
classical independence doesn't help.  Voiculescu invented **free
probability** for this non-commuting world: a new kind of
"independence" called *freeness*, with its own central limit
theorem (where bell curves are replaced by semicircles).  This
strange new probability shows up wherever big random matrices
appear — quantum information, ML eigenvalue analysis, wireless
communications.

## Mental

**Free probability** (Voiculescu 1985): a non-commutative analogue of
classical probability, designed to capture asymptotic behaviour of
*large random matrices*.

Replaces:

- **Commutative algebra of functions** by **von Neumann algebra**.
- **Probability measure** by **trace state** $\tau$.
- **Independence** by **freeness**.

## Freeness

Two non-commutative random variables $a, b$ are **free** if mixed
moments
$\tau(p_1(a) q_1(b) p_2(a) q_2(b) \ldots) = 0$
when each $p_i(a)$ and $q_j(b)$ has trace 0.

Replaces classical independence in non-commutative setting.

## Free convolution

Sum of free RVs $X + Y$ has spectrum determined by **R-transform**:

$$
R_{X + Y} = R_X + R_Y.
$$

Multiplication uses **S-transform**: $S_{XY} = S_X \cdot S_Y$.

Analogues of classical CLT, infinitely-divisible distributions:

- Gaussian → semicircle (free CLT).
- Poisson → free Poisson (Marchenko-Pastur).

## Worked example: free CLT

For free $X_i$ with $\tau(X_i) = 0$, $\tau(X_i^2) = 1$:

$$
\frac{X_1 + \ldots + X_N}{\sqrt N} \to \text{semicircular distribution}.
$$

Direct analogue of classical Gaussian CLT, but limit is *semicircle*,
not Gaussian — reflects non-commutative nature.

## Interactive

:::widget type=numeric-input prompt="Free probability: Voiculescu 1985. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Free CLT: limit is semicircle. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="R-transform additive under free convolution. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Marchenko-Pastur = free Poisson. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Asymptotic freeness**: independent random matrices become *free* in
$N \to \infty$ limit. Foundational for applying free probability to
RMT.

**Free entropy / Fisher information** (Voiculescu): non-commutative
analogues; less mature than classical theory.

**Free probability in operator algebras**: connections to subfactor
theory (Jones), planar algebras.

**Brown measure**: spectral measure of non-self-adjoint operators in
trace context.

## Computational

```python
import numpy as np

# Free CLT empirical check via random matrices
def gue_normalised(N):
    A = (np.random.randn(N, N) + 1j * np.random.randn(N, N)) / np.sqrt(2)
    M = (A + A.conj().T) / np.sqrt(2 * N)
    return M

# Sum of independent GUE matrices: free CLT predicts semicircle limit
N = 100
M_sum = sum(gue_normalised(N) for _ in range(20)) / np.sqrt(20)
eigs = np.linalg.eigvalsh(M_sum)
print(f"Sum-of-GUE eig range: [{eigs.min():.3f}, {eigs.max():.3f}]")
# Expected: ~ [-2, 2] (semicircle support)

# Marchenko-Pastur (free Poisson): sample covariance spectrum
def sample_cov(N, p, ratio=2):
    """N x p data; covariance = (1/N) X^T X."""
    X = np.random.randn(N, p)
    return X.T @ X / N

p = 100
S = sample_cov(N=200, p=p)
eigs_mp = np.linalg.eigvalsh(S)
print(f"Marchenko-Pastur range (q = p/N = 0.5): [{eigs_mp.min():.3f}, {eigs_mp.max():.3f}]")
# Theoretical: [(1 - √q)², (1 + √q)²] ≈ [0.086, 2.914] for q = 0.5
print(f"Theoretical MP range: [{(1 - np.sqrt(0.5))**2:.3f}, {(1 + np.sqrt(0.5))**2:.3f}]")
```

## Applied

- **Random matrix spectra in ML** — Marchenko-Pastur describes
  high-dim sample-covariance spectra. Used in PCA, ML theory.
- **Wireless communications** — MIMO capacity asymptotics via free
  probability.
- **Statistical signal processing** — free deconvolution for spike
  detection.
- **Operator-algebra theory** — Voiculescu's free entropy
  classifies factors.
- **Quantum information** — quantum CLT, free CLT for measurement
  outcomes.

## Check Your Understanding

:::widget type=numeric-input prompt="Free probability for non-commuting RVs (Voiculescu 1985). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Free CLT → semicircle. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="R-transform additive under free convolution. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Asymptotic freeness of independent random matrices. Type 1." answer=1 explain="Yes.":::
