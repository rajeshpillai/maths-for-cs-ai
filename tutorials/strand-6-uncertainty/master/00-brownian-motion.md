---
strand: uncertainty
level: master
order: 0
title: Brownian Motion
prerequisites:
  - tier: strand-6-uncertainty-advanced
    slug: 09-uncertainty-capstone-3
    description: Uncertainty advanced capstone
connections:
  - strand-6-uncertainty-master/01-stochastic-processes
applications:
  - cs: "Diffusion-model ML, finance, physics"
  - life: "The canonical continuous random process"
---

# Brownian Motion

## Mental

**Brownian motion** $(B_t)_{t \ge 0}$ — also called *Wiener process* —
is a stochastic process with:

1. $B_0 = 0$.
2. **Independent increments**: $B_t - B_s$ independent of $\mathcal F_s$.
3. **Stationary Gaussian increments**: $B_t - B_s \sim \mathcal N(0, t - s)$.
4. **Continuous paths** (a.s.).

Built rigorously by Wiener (1923). Nowhere-differentiable paths but
continuous.

## Properties

- **Quadratic variation**: $\langle B \rangle_t = t$. Brownian
  motion has *non-zero* quadratic variation — the source of all the
  "extra terms" in stochastic calculus.
- **Self-similarity**: $B_{at}$ has same distribution as $\sqrt a B_t$.
- **Markov property**: future depends only on present, not past.
- **Strong Markov property**: same with stopping times.
- **Time-reversal**: $B_{T - s} - B_T$ is also Brownian.

## Constructions

- **Lévy's** construction: piecewise-linear interpolation between
  dyadic times, refined on a binary subdivision.
- **Karhunen-Loève**: $B_t = \sum_{n=0}^\infty Z_n \cdot \frac{\sqrt 2 \sin((n + 1/2)\pi t)}{(n + 1/2) \pi}$
  with $Z_n$ iid Gaussian.
- **Donsker's invariance principle**: random walks scaled by $\sqrt n$
  converge to Brownian motion.

## Reflection principle

For Brownian motion: $P(\sup_{s \le t} B_s \ge a) = 2 P(B_t \ge a)$.

Reflection: a path that exceeds $a$ before time $t$ is in
1-to-1 correspondence with a "reflected" path ending above $2a -$ original.
Used to derive distribution of running max.

## Interactive

:::widget type=numeric-input prompt="Brownian motion: $B_t - B_s \\sim \\mathcal N(0, t - s)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Quadratic variation $\\langle B \\rangle_t = ?$" answer=0 explain="$t$. Type 0 to indicate non-zero (since the answer is $t$, not 0).":::

:::widget type=numeric-input prompt="Brownian paths nowhere differentiable. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Self-similar: $B_{at} \\overset{d}{=} \\sqrt a B_t$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Heat equation connection**: density $p(x, t)$ of $B_t$ satisfies
$\partial_t p = \frac{1}{2} \Delta p$ — heat equation. Conversely,
solutions to heat equations are expectations over Brownian paths
(Feynman-Kac).

**Lévy's modulus of continuity**: $\sup_{|s - t| \le h} |B_t - B_s| \le \sqrt{2 h \log(1/h)}$
asymptotically — Brownian paths are Hölder-$1/2 - \epsilon$
continuous.

**Lévy area**: for 2D Brownian motion $(B_t^1, B_t^2)$, the signed
area $\frac{1}{2}\int_0^t (B^1_s dB^2_s - B^2_s dB^1_s)$ is itself a
non-trivial random variable. Foundation of *rough paths* (Lyons,
Hairer).

## Computational

```python
import numpy as np
import matplotlib.pyplot as plt

# Sample Brownian motion paths
def brownian(N=1000, T=1):
    dt = T / N
    increments = np.sqrt(dt) * np.random.standard_normal(N)
    return np.concatenate(([0], np.cumsum(increments)))

paths = [brownian() for _ in range(3)]
# Visualise (commented for headless)
# t = np.linspace(0, 1, 1001)
# for p in paths: plt.plot(t, p)

# Quadratic variation
N = 10000
B = brownian(N, T=1)
qv_estimate = sum((B[i+1] - B[i])**2 for i in range(N))
print(f"Numerical QV: {qv_estimate:.4f}, theoretical: 1")

# Self-similarity check: var(B_t) = t
ts = [0.1, 0.5, 1.0, 2.0]
samples = 10000
for t in ts:
    samples_at_t = [brownian(int(t * 1000), t)[-1] for _ in range(samples)]
    print(f"t = {t}, var = {np.var(samples_at_t):.3f}")

# Reflection principle: estimate max distribution
N = 1000
samples = 10000
maxes = [np.max(brownian(N, T=1)) for _ in range(samples)]
# E[max] = sqrt(2/pi) for unit Brownian
print(f"E[max] estimate: {np.mean(maxes):.4f}, theoretical: {np.sqrt(2/np.pi):.4f}")
```

## Applied

- **Diffusion-model generative AI** (DDPM, score-based) — forward
  process is Brownian, reverse process learned.
- **Finance** — Brownian motion underlies Black-Scholes; geometric
  BM models stocks.
- **Physics** — particle diffusion, heat conduction.
- **Biology** — random walks of cells, neural firing in noisy
  environments.
- **Optimisation** — SGD analysed via Brownian-motion approximations
  near minima.

## Check Your Understanding

:::widget type=numeric-input prompt="Brownian motion has independent stationary Gaussian increments. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Quadratic variation = $t$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Donsker: random walk → Brownian under scaling. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Brownian density solves heat equation. Type 1." answer=1 explain="Yes.":::
