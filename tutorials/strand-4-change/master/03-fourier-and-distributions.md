---
strand: change
level: master
order: 3
title: Fourier Analysis and Distributions
prerequisites:
  - tier: strand-4-change-master
    slug: 02-pde-introduction
    description: PDEs introduction
connections:
  - strand-4-change-master/04-functional-analysis
applications:
  - cs: "Signal processing, FFT, JPEG, deep-learning Fourier features"
  - life: "Decompose any function into oscillating modes"
---

# Fourier Analysis and Distributions

## Explain Like I Am 7

Strike a piano chord and you hear one big sound — but if you slow
down and listen carefully, that one chord is really many simple
tones playing together.  **Fourier analysis** is the magic prism
that splits *any* wiggly signal back into its pure tone-pieces,
the way sunlight splits into rainbow colours.  **Distributions**
extend the idea to crazy spikes and bumps that aren't normal
functions at all, like the *infinitely sharp tap* of a hammer —
mathematicians' way of taming things too sudden to be smooth.

## Mental

The **Fourier transform** decomposes a function $f : \mathbb R \to \mathbb C$
into oscillating modes:

$$
\hat f(\xi) = \int_{-\infty}^\infty f(x) e^{-2\pi i \xi x} dx.
$$

Inverse:

$$
f(x) = \int_{-\infty}^\infty \hat f(\xi) e^{2\pi i \xi x} d\xi.
$$

**Properties**:

- Linear, isometric on $L^2$ (Plancherel).
- Convolution → multiplication: $\widehat{f * g} = \hat f \cdot \hat g$.
- Differentiation → multiplication by $2\pi i \xi$.
- Smooth $f$ → rapid decay of $\hat f$ (Riemann-Lebesgue, Schwartz
  class).

## Distributions

Some "functions" we want to use aren't really functions:

- **Dirac delta** $\delta(x)$: zero everywhere, "infinity" at zero,
  integral 1.
- **Heaviside step**: 0 then 1. Derivative = $\delta$.

Schwartz's **distribution theory**: a distribution is a continuous
linear functional on test functions. $\delta$ is the functional
$\phi \mapsto \phi(0)$.

This formalism makes Fourier transforms of $\delta$, derivatives of
non-differentiable functions, and Green's-function methods rigorous.

## Tempered distributions

Distributions on the **Schwartz space** $\mathcal S(\mathbb R^n)$ —
smooth, rapidly decreasing test functions. Fourier transform extends
to tempered distributions:

$$
\hat \delta = 1, \quad \hat 1 = \delta, \quad \widehat{e^{2\pi i a x}} = \delta_a.
$$

So plane waves and delta functions are Fourier-dual.

## Worked example: solving heat equation via Fourier

Take the Fourier transform in $x$: $u_t = u_{xx} \Rightarrow \hat u_t = -4\pi^2 \xi^2 \hat u$.

Solve: $\hat u(\xi, t) = e^{-4\pi^2 \xi^2 t} \hat u(\xi, 0)$.

Inverse Fourier: $u(x, t) = (\Phi_t * f)(x)$ where $\Phi_t$ is the
heat kernel.

Pattern: PDE in $x$-space ↔ ODE in $\xi$-space; Fourier diagonalises
translation-invariant operators.

## Interactive

:::widget type=numeric-input prompt="Fourier diagonalises differentiation: $\\widehat{f'}(\\xi) = 2\\pi i \\xi \\hat f(\\xi)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\hat \\delta = 1$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Plancherel: Fourier is an $L^2$-isometry. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Convolution Fourier-dual to multiplication. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Sobolev spaces** $H^s(\mathbb R^n) = \{f : (1 + |\xi|^2)^{s/2} \hat f \in L^2\}$
— measure smoothness via Fourier decay.

**Pseudodifferential operators**: operators of the form
$P u = (2\pi)^{-n} \int p(x, \xi) e^{i x \cdot \xi} \hat u(\xi) d\xi$.
Generalise differential operators; tools for elliptic-PDE regularity.

**Plancherel for groups**: harmonic analysis on locally compact
abelian groups (Pontryagin duality). $\mathbb R$ ↔ $\mathbb R$,
$\mathbb T$ ↔ $\mathbb Z$, finite groups ↔ themselves (DFT).

**Wavelets** — replace single Fourier modes with localised
multi-resolution basis. JPEG-2000, MP3 use wavelet transforms.

## Computational

```python
import numpy as np

# Discrete Fourier transform via FFT
N = 1024
x = np.linspace(0, 1, N, endpoint=False)
f = np.sin(2 * np.pi * 5 * x) + 0.5 * np.sin(2 * np.pi * 12 * x)

F = np.fft.fft(f)
freqs = np.fft.fftfreq(N, d=1/N)

# Print top few frequencies
idx = np.argsort(np.abs(F))[::-1][:6]
print(list(zip(freqs[idx], np.abs(F[idx]) / N)))   # peaks at ±5 and ±12

# Convolution via FFT
import scipy.signal as sig
g = np.exp(-((x - 0.5) * 100)**2)        # Gaussian pulse
conv_direct = sig.convolve(f, g, mode='same')
conv_fft = np.fft.ifft(np.fft.fft(f) * np.fft.fft(g)).real
# Should agree (up to shift conventions)

# Solve heat equation u_t = u_{xx} via FFT
def heat_solve_fft(u0, t, dx):
    N = len(u0)
    k = np.fft.fftfreq(N, d=dx) * 2 * np.pi
    u_hat = np.fft.fft(u0)
    u_hat *= np.exp(-k**2 * t)
    return np.fft.ifft(u_hat).real

x = np.linspace(0, 1, 256)
u0 = np.sin(np.pi * x)
u = heat_solve_fft(u0, t=0.01, dx=x[1] - x[0])
exact = np.exp(-np.pi**2 * 0.01) * np.sin(np.pi * x)
print("Heat solution error:", np.max(np.abs(u - exact)))
```

## Applied

- **FFT and signal processing** — Cooley-Tukey FFT (1965) made
  Fourier methods practical, $O(n \log n)$.
- **JPEG / MP3 compression** — DCT (a Fourier cousin) for image and
  audio.
- **Convolutional neural networks** — convolution-multiplication
  duality used in fast forward / backward passes.
- **Quantum mechanics** — position ↔ momentum via Fourier transform.
- **Numerical PDEs** — spectral methods leverage Fourier
  diagonalisation.
- **Random matrix theory** — characteristic functions are Fourier
  transforms of distributions.

## Check Your Understanding

:::widget type=numeric-input prompt="Differentiation ↔ multiplication by $i\\xi$ under Fourier. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\hat \\delta = 1$, $\\hat 1 = \\delta$. Type 1." answer=1 explain="Yes — Fourier-dual.":::

:::widget type=numeric-input prompt="Plancherel: Fourier $L^2$-isometry. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Sobolev space $H^s$ measures smoothness via Fourier decay. Type 1." answer=1 explain="Yes.":::
