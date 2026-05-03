---
strand: change
level: master
order: 5
title: Stochastic Calculus and Itô Integration
prerequisites:
  - tier: strand-4-change-master
    slug: 04-functional-analysis
    description: Functional analysis
connections:
  - strand-4-change-master/06-numerical-pdes
applications:
  - cs: "Quantitative finance, generative ML, neural SDEs"
  - life: "Calculus of randomness"
---

# Stochastic Calculus and Itô Integration

## Mental

Standard calculus integrates against $dx$ or $dt$. **Stochastic
calculus** integrates against **Brownian motion** $B_t$:

$$
\int_0^t H_s \, dB_s.
$$

Brownian motion's paths are continuous but nowhere differentiable;
$B_t$ has variance $t$ and **quadratic variation** $t$ (not 0!).

## Itô isometry

For predictable $H$ with $\mathbb E \int_0^T H_s^2 ds < \infty$:

$$
\mathbb E\left[\left(\int_0^T H_s dB_s\right)^2\right] = \mathbb E\left[\int_0^T H_s^2 ds\right].
$$

Foundation for $L^2$ theory of stochastic integration.

## Itô's formula

For smooth $f$ and $X_t = \int_0^t \mu_s ds + \int_0^t \sigma_s dB_s$:

$$
df(X_t) = f'(X_t) \, dX_t + \frac{1}{2} f''(X_t) \sigma_t^2 \, dt.
$$

The **extra second-derivative term** is the *signature* of stochastic
calculus — non-zero quadratic variation forces it.

## Stochastic differential equations

An **SDE**:

$$
dX_t = \mu(X_t, t) dt + \sigma(X_t, t) dB_t.
$$

Existence and uniqueness (Picard-style, Lipschitz). Examples:

- **Geometric Brownian motion**: $dS_t = \mu S_t dt + \sigma S_t dB_t$
  — Black-Scholes asset price.
- **Ornstein-Uhlenbeck**: $dX_t = -\theta X_t dt + \sigma dB_t$ —
  mean-reverting.
- **CIR**: square-root diffusion, used in interest-rate modeling.

## Worked example: geometric Brownian motion

$dS_t = \mu S_t dt + \sigma S_t dB_t$.

Let $X_t = \log S_t$. Itô's formula:

$dX_t = \frac{1}{S_t} dS_t - \frac{1}{2 S_t^2} (\sigma S_t)^2 dt$
$= \mu dt + \sigma dB_t - \frac{1}{2}\sigma^2 dt = (\mu - \sigma^2/2) dt + \sigma dB_t$.

So $S_t = S_0 \exp((\mu - \sigma^2/2) t + \sigma B_t)$ — a closed-
form. Note the $-\sigma^2/2$ correction — pure Itô.

## Interactive

:::widget type=numeric-input prompt="Brownian motion has variance $t$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Brownian paths nowhere differentiable. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Itô's formula has an extra $\\frac{1}{2} f''$ term. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Geometric BM has solution $S_0 e^{(\\mu - \\sigma^2/2)t + \\sigma B_t}$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Stratonovich integral** $\int H_s \circ dB_s$: alternative to Itô,
satisfies *ordinary* chain rule but lacks martingale property.
Conversion: $\int H \circ dB = \int H \, dB + \frac{1}{2} \langle H, B \rangle_t$.

**Girsanov theorem**: change of measure under which a drifted
Brownian motion becomes pure Brownian. Foundation of risk-neutral
pricing in finance.

**Feynman-Kac formula**: solutions to PDEs as expectations of
functionals of stochastic processes.

**Malliavin calculus**: differential calculus on Wiener space; basis
of advanced finance methods (Greeks via Malliavin).

## Computational

```python
import numpy as np

# Simulate Brownian motion
def brownian_path(T, N):
    dt = T / N
    increments = np.sqrt(dt) * np.random.standard_normal(N)
    return np.concatenate(([0], np.cumsum(increments)))

# Geometric Brownian motion via Euler-Maruyama
def gbm_path(S0, mu, sigma, T, N):
    dt = T / N
    S = np.zeros(N + 1)
    S[0] = S0
    for i in range(N):
        Z = np.random.standard_normal()
        S[i + 1] = S[i] * (1 + mu * dt + sigma * np.sqrt(dt) * Z)
    return S

# Closed-form GBM (compare)
def gbm_closed(S0, mu, sigma, T, N):
    B = brownian_path(T, N)
    t = np.linspace(0, T, N + 1)
    return S0 * np.exp((mu - 0.5 * sigma**2) * t + sigma * B)

S = gbm_closed(100, 0.05, 0.2, 1, 252)
print(f"Final S = {S[-1]:.2f}")    # one realisation

# Verify Itô isometry numerically
T, N = 1, 1000
dt = T / N
H = np.random.randn(N)              # predictable integrand
B_inc = np.sqrt(dt) * np.random.randn(N)
ito_int = np.sum(H * B_inc)
expected_var = np.sum(H**2) * dt
# Single sample's squared value vs theoretical variance
print(f"Sample (∫H dB)² = {ito_int**2:.4f}, expected = {expected_var:.4f}")
```

## Applied

- **Black-Scholes option pricing** — derived via Itô + replication
  argument; $C(S, t)$ satisfies a parabolic PDE.
- **Stochastic optimisation** — SGD analysed via stochastic ODEs;
  diffusion theory of training dynamics.
- **Diffusion models in ML** (DDPM, DDIM, score-based) — defined as
  reverse-time SDEs.
- **Mathematical biology** — population dynamics with noise, neural
  spiking models.
- **Reinforcement learning** — continuous-time RL via SDE/PDE
  formulations.

## Check Your Understanding

:::widget type=numeric-input prompt="Itô's formula has correction $\\frac{1}{2} f'' \\sigma^2 dt$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="GBM solves Black-Scholes asset model. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Girsanov: change of measure removes drift. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Diffusion-model ML uses reverse-time SDEs. Type 1." answer=1 explain="Yes.":::
