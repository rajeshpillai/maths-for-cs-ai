# Convolution and the Laplace Convolution Theorem

## Intuition

When you apply a filter to an image or pass audio through a reverb effect, you
are computing a convolution. In the Laplace world, convolution in time becomes
plain multiplication in the $s$-domain: $\mathcal{L}\{f * g\} = F(s)\,G(s)$.
This is the exact same idea as the Fourier convolution theorem from Tier 9 —
the Laplace version just works with one-sided signals on $[0, \infty)$.

## Prerequisites

- Tier 11, Lesson 14: Solving ODEs with Laplace Transforms
- Tier 9, Lesson 2: Fourier Series (convolution theorem concept)
- Tier 3, Lesson 6: Integrals (improper integrals)

## From First Principles

### The Convolution Integral

Given two functions $f(t)$ and $g(t)$ defined for $t \geq 0$, their
**convolution** is:

$$(f * g)(t) = \int_0^{t} f(\tau)\,g(t - \tau)\,d\tau$$

Read this as: slide $g$ backwards across $f$, multiply, and integrate the
overlap. The upper limit is $t$, not $\infty$, because both functions are zero
for negative arguments (causal signals).

### Pen & Paper: Convolve $f(t)=1$ with $g(t)=t$

$$(f * g)(t) = \int_0^t 1 \cdot (t - \tau)\,d\tau = \left[t\tau - \frac{\tau^2}{2}\right]_0^t = t^2 - \frac{t^2}{2} = \frac{t^2}{2}$$

### The Convolution Theorem

$$\mathcal{L}\{f * g\} = F(s)\,G(s)$$

**Proof sketch.** Write out the double integral:

$$\mathcal{L}\{f*g\} = \int_0^\infty e^{-st}\left[\int_0^t f(\tau)g(t-\tau)\,d\tau\right]dt$$

Swap the order of integration (Fubini's theorem), substitute $u = t - \tau$:

$$= \int_0^\infty f(\tau)e^{-s\tau}d\tau \cdot \int_0^\infty g(u)e^{-su}du = F(s)\cdot G(s)$$

### Verify the Pen & Paper Example

$F(s) = \mathcal{L}\{1\} = 1/s$, $G(s) = \mathcal{L}\{t\} = 1/s^2$.

$F(s)G(s) = 1/s^3 = \mathcal{L}\{t^2/2\}$ ✓

### Application: Solving an ODE with Forcing

Consider $y'' + y = f(t)$, $y(0) = y'(0) = 0$.

Transform: $(s^2+1)Y(s) = F(s)$, so $Y(s) = F(s) \cdot \frac{1}{s^2+1}$.

Since $\mathcal{L}^{-1}\{1/(s^2+1)\} = \sin t$, the convolution theorem gives:

$$y(t) = \int_0^t f(\tau)\sin(t - \tau)\,d\tau$$

This is the **impulse response** approach: the response to any forcing is the
convolution of the forcing with the system's impulse response $\sin t$.

### Visualisation

Show two functions and their convolution.

```python
import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(0, 5, 500)
dt = t[1] - t[0]

# f(t) = exp(-t),  g(t) = heaviside step (1 for t >= 0)
f = np.exp(-t)
g = np.ones_like(t)

# Compute convolution numerically
conv = np.convolve(f, g, mode='full')[:len(t)] * dt

# Analytical result: integral of exp(-tau) from 0 to t = 1 - exp(-t)
exact = 1 - np.exp(-t)

fig, axes = plt.subplots(1, 3, figsize=(14, 4))

axes[0].plot(t, f, 'b-', linewidth=2)
axes[0].set_title('f(t) = e^{-t}')
axes[0].set_xlabel('t')
axes[0].grid(True, alpha=0.3)

axes[1].plot(t, g, 'r-', linewidth=2)
axes[1].set_title('g(t) = 1 (step)')
axes[1].set_xlabel('t')
axes[1].grid(True, alpha=0.3)

axes[2].plot(t, conv, 'g-', linewidth=2, label='numerical')
axes[2].plot(t, exact, 'k--', linewidth=1.5, label='exact: 1 - e^{-t}')
axes[2].set_title('(f * g)(t)')
axes[2].set_xlabel('t')
axes[2].legend()
axes[2].grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig("convolution_laplace.png", dpi=100)
plt.show()
```

## Python Verification

```python
import sympy as sp

t, tau, s = sp.symbols('t tau s', positive=True)

# ── Verify convolution of f=1 and g=t by hand vs theorem ──
f_t = sp.Integer(1)
g_t = t

# Direct convolution integral
conv_direct = sp.integrate(f_t.subs(t, tau) * g_t.subs(t, t - tau), (tau, 0, t))
print("Direct convolution of 1 * t =", conv_direct)

# Via Laplace convolution theorem
F_s = sp.laplace_transform(f_t, t, s, noconds=True)
G_s = sp.laplace_transform(g_t, t, s, noconds=True)
product = F_s * G_s
print("F(s) =", F_s, ", G(s) =", G_s, ", product =", product)

result = sp.inverse_laplace_transform(product, s, t)
print("Inverse of product =", result)

# ── Impulse response example ────────────────────────────
# y'' + y = exp(-t), y(0)=0, y'(0)=0
# Impulse response h(t) = sin(t)
# y(t) = h * f = integral of sin(t-tau)*exp(-tau) from 0 to t

forcing = sp.exp(-tau)
impulse = sp.sin(t - tau)
y_conv = sp.integrate(forcing * impulse, (tau, 0, t))
y_conv_simplified = sp.simplify(y_conv)
print("y(t) via convolution =", y_conv_simplified)

# Verify: y'' + y should equal exp(-t)
y_check = sp.diff(y_conv_simplified, t, 2) + y_conv_simplified
print("y'' + y =", sp.simplify(y_check))
```

## Connection to CS / Games / AI / Business / Industry

- **Signal processing** — The convolution theorem is the reason FFT-based
  filtering is fast: convolve in time by multiplying spectra (Tier 9).
- **CNNs** — Convolutional layers compute discrete 2D convolutions; the Laplace
  version is the continuous-time ancestor of the same operation.
- **Impulse responses** — Audio reverb effects store the impulse response of a
  room and convolve it with the dry signal to simulate acoustics.
- **Control theory** — Transfer functions $H(s)$ encode convolution with the
  impulse response, central to robot and drone control loops.
- **Concert hall acoustics at Arup / Nagata** — engineers convolve dry music
  with measured impulse responses of Carnegie Hall, Royal Albert Hall, and
  Suntory Hall to validate retrofit acoustic designs before construction.
- **Echolocation in oil and gas seismic surveys** — Schlumberger and CGG run
  Laplace/Fourier-based wavelet deconvolution on shot records to image
  reservoirs in the North Sea and Permian Basin; the convolution model is
  $\text{trace} = \text{wavelet} * \text{reflectivity}$.
- **Drug-drug interaction PK at FDA** — when two drugs are co-administered,
  total plasma concentration is the convolution of dosing-rate input with
  each drug's impulse response; Pfizer's Paxlovid label uses convolution
  models to recommend ritonavir co-dose.
- **Earthquake convolution at PG&E** — utilities convolve a design ground
  motion (impulse response) with structure transfer functions to certify
  substations under California PUC GO 174 seismic standards.

## Check Your Understanding

1. Compute $(f * g)(t)$ by hand where $f(t) = t$ and $g(t) = t$.
   Verify via the convolution theorem: $F(s)G(s) = 1/s^4 = \mathcal{L}\{t^3/6\}$.

2. Show that convolution is commutative: $f * g = g * f$.
   (Hint: substitute $u = t - \tau$ in the integral.)

3. If a system has impulse response $h(t) = e^{-2t}$, what is the output
   when the input is $f(t) = 1$ (a step)? Compute by hand and verify with SymPy.
