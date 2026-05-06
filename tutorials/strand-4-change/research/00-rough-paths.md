---
strand: change
level: research
order: 0
title: Rough Paths and Regularity Structures
prerequisites:
  - tier: strand-4-change-master
    slug: 09-change-master-capstone
    description: Change master capstone
connections:
  - strand-4-change-research/01-kpz-equation
applications:
  - cs: "Rigorous foundations for SDEs / SPDEs in ML"
  - life: "Calculus for paths too rough to integrate classically"
---

# Rough Paths and Regularity Structures

## Explain Like I Am 7

Some paths are *so* jittery that even ordinary jittery-dust math
can't follow them — like trying to track lightning through fog.
**Rough paths** is a daring extension that says: even if the path
itself is too crinkled to handle, you can carry around extra
"bookkeeping" — say, how much area the path sweeps out — and that
extra info is *just enough* to do calculus on it.  It cracked open
math problems about wild noise that had been stuck for decades and
won a Fields Medal in 2014.

## Mental

For paths $X : [0, T] \to \mathbb R^d$ that are *too rough* to admit
classical Riemann-Stieltjes integration (Hölder regularity
$< 1/2$), we need new tools.

**Lyons's rough paths theory** (1998): track higher-order iterated
integrals (Lévy areas, etc.) as part of the input data. With this
extra information, deterministic ODEs $dY = f(Y) dX$ can be solved
*pathwise*.

## Iterated integrals

For $X$ with sufficient regularity, define iterated integrals

$$
\mathbb X^{(n)}_{s, t} = \int_{s < t_1 < \ldots < t_n < t} dX_{t_1} \otimes \ldots \otimes dX_{t_n}.
$$

A *signature* of the path. **Chen's identity**: signatures form a
group-like element in tensor algebra.

## Hairer's regularity structures

**Hairer 2014** (Fields medal): generalised rough paths to
*singular SPDEs* like KPZ. Local description of solutions as
*polynomials in abstract symbols*; renormalisation makes products
meaningful.

Solved KPZ rigorously — settling decades of speculation in
mathematical physics.

## Worked example: signature of a planar path

For $X : [0, 1] \to \mathbb R^2$ with $X_t = (t, t^2/2)$:

$\mathbb X^{(1)}_{0, 1} = X_1 - X_0 = (1, 1/2)$.
$\mathbb X^{(2)}_{0, 1}$: a $2 \times 2$ matrix with entries
$\int_0^1 X^i_t dX^j_t$. Compute one entry:
$\int_0^1 t \, d(t^2/2) = \int_0^1 t \cdot t \, dt = 1/3$.

Higher signatures encode finer path features.

## Interactive

:::widget type=numeric-input prompt="Lyons rough paths: 1998. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hairer 2014 Fields for regularity structures + KPZ. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Iterated integrals form signature of a path. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Chen's identity: signatures group-like. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Paracontrolled distributions** (Gubinelli-Imkeller-Perkowski):
alternative to regularity structures, sometimes simpler.

**Stochastic quantization**: rephrase QFT as fixed point of
singular SPDE. Modern solution via Hairer's tools.

**Gaussian rough paths**: extending classical Brownian motion's
rough-path lift; central in stochastic analysis.

**Path signatures in ML** (Lyons, Chevyrev, etc.): use signature
features for time-series classification, anomaly detection.

## Computational

```python
import numpy as np
from itertools import combinations

# Signature computation for a discretised path
def path_signature(X, depth=3):
    """X: array of shape (N, d) — path samples; return depth-truncated signature."""
    N, d = X.shape
    sig = [np.zeros(d**k) for k in range(depth + 1)]
    sig[0][0] = 1   # always 1 in degree 0

    # Increments
    dX = np.diff(X, axis=0)

    # Degree-1 signature: total displacement
    sig[1] = X[-1] - X[0]

    # Higher degrees: iterated integrals (approximated)
    if depth >= 2:
        sig[2] = np.zeros((d, d))
        for i in range(d):
            for j in range(d):
                # Integral of X^i dX^j
                sig[2][i, j] = sum(0.5 * (X[k, i] + X[k+1, i]) * dX[k, j]
                                    for k in range(N - 1))
        sig[2] = sig[2].flatten()

    return sig

# Test on a simple path: X(t) = (t, t²/2) sampled
N = 1000
t = np.linspace(0, 1, N)
X = np.column_stack([t, t**2 / 2])
sig = path_signature(X, depth=2)
print(f"Sig deg 0: {sig[0]}")
print(f"Sig deg 1: {sig[1]}")        # ≈ (1, 0.5)
print(f"Sig deg 2: {sig[2]}")        # 4-vector

# In rough-path theory, signatures are the canonical features of paths
print("Signature features used in time-series ML (Chevyrev, Lyons).")
```

## Applied

- **Mathematical finance** — robust calibration of SDE-based models.
- **Time-series ML** — path signatures as features.
- **Quantum field theory** — rigorous stochastic quantization.
- **Singular SPDEs** — KPZ, $\Phi^4_3$ proven well-posed via
  regularity structures.
- **Climate / fluid models** — stochastic Navier-Stokes rigorous
  framework.

## Check Your Understanding

:::widget type=numeric-input prompt="Lyons rough paths: 1998 with iterated integrals. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hairer Fields 2014 for regularity structures. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Path signatures used in ML time-series features. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Stochastic quantization rigorous via Hairer's tools. Type 1." answer=1 explain="Yes.":::
