---
strand: change
level: research
order: 6
title: Diffusion Models — Mathematical Foundations
prerequisites:
  - tier: strand-4-change-research
    slug: 05-deep-learning-dynamics
    description: DL dynamics
connections:
  - strand-4-change-research/07-generative-flows
applications:
  - cs: "Stable Diffusion, DALL-E, Imagen, Sora"
  - life: "How modern image / video / audio generation works"
---

# Diffusion Models — Mathematical Foundations

## Explain Like I Am 7

Take a beautiful photo and slowly add static fuzz to it, frame by
frame, until you can't see anything but TV snow.  Now imagine you
trained a robot to *un-fuzz* the picture step by tiny step — peel
off a little noise, then a little more, then a little more.
**Diffusion models** are exactly that: machines taught to crawl
backwards from snowy nonsense into a fresh, never-seen-before
picture.  The math underneath is dust-jitter calculus and tiny
gradient nudges, dressed up to dream new images.

## Mental

Modern generative AI (Stable Diffusion, DALL-E 3, Imagen, Sora) uses
**diffusion models**:

1. **Forward**: gradually add noise to data $x_0 \to x_T$ (pure
   noise).
2. **Reverse**: learn to denoise $x_T \to x_0$.
3. **Sampling**: start from noise, apply learned reverse process.

## SDE / ODE formulations

**Forward SDE**:

$$
dx = f(x, t) dt + g(t) dB_t.
$$

For variance-preserving (VP-SDE): $f = -\frac{1}{2} \beta(t) x$,
$g = \sqrt{\beta(t)}$.

**Reverse SDE** (Anderson 1982):

$$
dx = (f(x, t) - g(t)^2 \nabla_x \log p_t(x)) dt + g(t) d\bar B_t.
$$

The **score function** $\nabla \log p_t$ is *the* quantity to learn.

## Score matching

Train NN $s_\theta(x, t) \approx \nabla \log p_t(x)$ by minimising

$$
\mathbb E_{t, x} [\|s_\theta(x, t) - \nabla \log p_t(x)\|^2].
$$

Since $\nabla \log p_t$ unknown, use **denoising score matching**
(Vincent 2011): equivalent objective avoiding direct knowledge of
$p_t$.

Trained $s_\theta$ enables sampling via reverse SDE.

## Probability flow ODE

Equivalent **deterministic** reverse process — an ODE rather than
SDE — gives same marginals. Faster sampling (DDIM, etc.).

## Worked example: VP-SDE on Gaussian data

For data $x_0 \sim \mathcal N(0, I)$:

$x_t = \alpha_t x_0 + \sigma_t \xi$ with $\xi \sim \mathcal N(0, I)$.

Score: $\nabla \log p_t(x) = -x / (\alpha_t^2 + \sigma_t^2)$ —
analytically known, no NN needed (toy case).

For real data: NN approximates score throughout the noise schedule.

## Interactive

:::widget type=numeric-input prompt="Diffusion: forward noise + reverse denoise. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Reverse SDE involves score $\\nabla \\log p_t$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Denoising score matching (Vincent 2011) avoids direct $p_t$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Probability flow ODE: deterministic alternative reverse process. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Score-based generative modeling** (Song-Ermon 2019; Song et al.
2020): unifying SDE / ODE perspective.

**Variational lower bound** (Ho-Jain-Abbeel 2020 DDPM): connects
diffusion training to variational inference.

**Classifier-free guidance**: train conditional + unconditional
score; sample with weighted combination for better text-to-image.

**Latent diffusion** (Stable Diffusion): apply diffusion in
compressed latent space of a VAE; massive efficiency gains.

**Consistency models** (Song et al. 2023): single-step generation
via consistency loss. Faster sampling.

**Flow-matching** (Lipman et al. 2023): alternative to diffusion;
match a target velocity field directly.

## Computational

```python
import numpy as np

# 1D toy diffusion: VP-SDE forward + reverse on standard Gaussian data
beta_min, beta_max = 0.1, 20
T = 1.0

def beta(t):
    return beta_min + t * (beta_max - beta_min)

def alpha_sigma(t):
    """Variance-preserving schedule."""
    log_alpha = -0.5 * (beta_min * t + 0.5 * (beta_max - beta_min) * t**2)
    alpha = np.exp(log_alpha)
    sigma = np.sqrt(1 - alpha**2)
    return alpha, sigma

# Forward: x_t = α_t x_0 + σ_t ξ
def forward(x0, t):
    alpha, sigma = alpha_sigma(t)
    return alpha * x0 + sigma * np.random.randn(*x0.shape)

# Score for Gaussian data N(0, 1):
# p_t(x) = N(x; 0, α²+σ²) = N(x; 0, 1) — VP preserves variance!
# Score: -x

def score_gaussian(x, t):
    return -x  # for VP-SDE on standard normal data

# Reverse SDE step (Euler-Maruyama)
def reverse_step(x, t, dt):
    b = beta(t)
    drift = -0.5 * b * x - b * score_gaussian(x, t)
    return x + drift * dt + np.sqrt(b * dt) * np.random.randn(*x.shape)

# Sample: start from N(0, 1), reverse
N_samples = 10000
x = np.random.randn(N_samples)
n_steps = 100
dt = T / n_steps
for i in range(n_steps):
    t = T - i * dt
    x = reverse_step(x, t, dt)

print(f"Sample mean: {np.mean(x):.3f} (target 0)")
print(f"Sample std: {np.std(x):.3f} (target 1)")
```

## Applied

- **Image generation** — Stable Diffusion, DALL-E 3, Imagen, Midjourney.
- **Video generation** — Sora (OpenAI), Runway Gen-3, Pika.
- **Audio synthesis** — diffusion-based TTS (Whisper-derived).
- **3D generation** — Gaussian-splatting + diffusion.
- **Scientific generative models** — molecular design (Geo-NF,
  GeoDiff), protein folding (RFDiffusion).

## Check Your Understanding

:::widget type=numeric-input prompt="Diffusion: forward noise + reverse-SDE denoise. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Score function $\\nabla \\log p_t$ central. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="DDPM (Ho-Jain-Abbeel 2020) variational lower bound. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Latent diffusion: in VAE-compressed latent space. Type 1." answer=1 explain="Yes.":::
