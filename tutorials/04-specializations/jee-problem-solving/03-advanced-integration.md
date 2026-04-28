# Advanced Integration Techniques

## Intuition

Many integrals that appear in physics, probability, and machine learning do not yield to
basic substitution or integration by parts. Competition-level integration requires a toolkit
of clever symmetry tricks: reduction formulas turn hard integrals into recursive sequences,
King's rule exploits hidden symmetry in definite integrals, and Leibniz's rule differentiates
under the integral sign — a technique Feynman famously called his "secret weapon."

## Prerequisites

- Tier 3, Lesson 6 (Integration — Riemann sums, fundamental theorem, basic techniques)
- Integration by parts
- Trigonometric identities

## From First Principles

### Reduction Formula for $I_n = \int_0^{\pi/2} \sin^n x \, dx$

**Step 1.** Write $\sin^n x = \sin^{n-1}x \cdot \sin x$ and integrate by parts:

Let $u = \sin^{n-1}x$, $dv = \sin x \, dx$

Then $du = (n-1)\sin^{n-2}x \cos x \, dx$, $v = -\cos x$

**Step 2.** Apply IBP:

$$I_n = \Big[-\sin^{n-1}x \cos x\Big]_0^{\pi/2} + (n-1)\int_0^{\pi/2} \sin^{n-2}x \cos^2 x \, dx$$

**Step 3.** The boundary term vanishes (both endpoints give 0). Use $\cos^2 x = 1 - \sin^2 x$:

$$I_n = (n-1)\int_0^{\pi/2} \sin^{n-2}x \, dx - (n-1)\int_0^{\pi/2} \sin^n x \, dx$$

$$I_n = (n-1)I_{n-2} - (n-1)I_n$$

**Step 4.** Solve for $I_n$:

$$I_n + (n-1)I_n = (n-1)I_{n-2}$$

$$\boxed{I_n = \frac{n-1}{n} I_{n-2}}$$

**Base cases:** $I_0 = \pi/2$, $I_1 = 1$.

### Wallis' Formula

Applying the reduction formula repeatedly:

For even $n = 2k$:
$$I_{2k} = \frac{(2k-1)!!}{(2k)!!} \cdot \frac{\pi}{2}$$

For odd $n = 2k+1$:
$$I_{2k+1} = \frac{(2k)!!}{(2k+1)!!}$$

where $n!! = n(n-2)(n-4)\cdots$

**Example:** $I_4 = \frac{3}{4} \cdot \frac{1}{2} \cdot \frac{\pi}{2} = \frac{3\pi}{16}$

### King's Rule (Property of Definite Integrals)

$$\boxed{\int_a^b f(x)\,dx = \int_a^b f(a + b - x)\,dx}$$

**Proof:** Substitute $u = a + b - x$, then $du = -dx$. When $x = a$, $u = b$; when $x = b$, $u = a$.

$$\int_a^b f(x)\,dx = \int_b^a f(a+b-u)(-du) = \int_a^b f(a+b-u)\,du$$

**Power of King's rule:** Add the original integral and the transformed version:

$$2I = \int_a^b \Big[f(x) + f(a+b-x)\Big] dx$$

If the sum simplifies (often to a constant), the integral becomes trivial.

**Classic example:** $I = \int_0^{\pi/2} \frac{\sin x}{\sin x + \cos x} dx$

Apply King's rule ($a + b - x = \pi/2 - x$):

$$I = \int_0^{\pi/2} \frac{\cos x}{\cos x + \sin x} dx$$

Add: $2I = \int_0^{\pi/2} 1 \, dx = \pi/2$, so $I = \pi/4$.

### Leibniz Rule (Differentiation Under the Integral Sign)

$$\boxed{\frac{d}{d\alpha}\int_{a(\alpha)}^{b(\alpha)} f(x, \alpha)\,dx = f(b, \alpha)\,b'(\alpha) - f(a, \alpha)\,a'(\alpha) + \int_{a(\alpha)}^{b(\alpha)} \frac{\partial f}{\partial \alpha}\,dx}$$

**Special case** (constant limits):
$$\frac{d}{d\alpha}\int_a^b f(x, \alpha)\,dx = \int_a^b \frac{\partial f}{\partial \alpha}\,dx$$

**Example:** Evaluate $I(\alpha) = \int_0^1 \frac{x^\alpha - 1}{\ln x} dx$.

Differentiate: $I'(\alpha) = \int_0^1 \frac{\partial}{\partial \alpha}\frac{x^\alpha - 1}{\ln x} dx = \int_0^1 x^\alpha dx = \frac{1}{\alpha + 1}$

Integrate back: $I(\alpha) = \ln(\alpha + 1) + C$. Since $I(0) = 0$, $C = 0$.

$$I(\alpha) = \ln(\alpha + 1)$$

### Even/Odd Symmetry Shortcuts

For $f$ integrated over a symmetric interval $[-a, a]$:

- If $f(-x) = f(x)$ (even): $\int_{-a}^a f(x)\,dx = 2\int_0^a f(x)\,dx$
- If $f(-x) = -f(x)$ (odd): $\int_{-a}^a f(x)\,dx = 0$

### Beta and Gamma Functions (Brief)

$$\Gamma(n) = \int_0^\infty x^{n-1}e^{-x}\,dx, \quad \Gamma(n) = (n-1)! \text{ for positive integers}$$

$$B(m, n) = \int_0^1 x^{m-1}(1-x)^{n-1}\,dx = \frac{\Gamma(m)\Gamma(n)}{\Gamma(m+n)}$$

Connection to Wallis: $\int_0^{\pi/2}\sin^{2m-1}x\cos^{2n-1}x\,dx = \frac{1}{2}B(m,n)$

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, np.pi / 2, 500)
fig, ax = plt.subplots(figsize=(9, 6))

colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd']
for n, color in zip([1, 2, 4, 6, 10], colors):
    y = np.sin(x) ** n
    area = np.trapz(y, x)
    ax.fill_between(x, y, alpha=0.15, color=color)
    ax.plot(x, y, color=color, linewidth=2, label=f'$\\sin^{{{n}}}(x)$, area={area:.4f}')

ax.set_xlabel('x', fontsize=13)
ax.set_ylabel('y', fontsize=13)
ax.set_title('$\\sin^n(x)$ on $[0, \\pi/2]$ — area shrinks as $n$ grows', fontsize=14)
ax.legend(fontsize=11)
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('sin_n_areas.png', dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np
from scipy import integrate
from math import factorial, pi, gamma, log

# --- Reduction formula verification ---
def wallis_integral(n):
    """Compute I_n = integral of sin^n(x) from 0 to pi/2 using reduction."""
    if n == 0:
        return pi / 2
    elif n == 1:
        return 1.0
    else:
        return ((n - 1) / n) * wallis_integral(n - 2)

print("Reduction formula for I_n = integral sin^n(x) dx from 0 to pi/2:")
for n in range(7):
    analytical = wallis_integral(n)
    numerical, _ = integrate.quad(lambda x: np.sin(x)**n, 0, np.pi/2)
    print(f"  I_{n} = {analytical:.6f}  (numerical: {numerical:.6f})")

# --- King's rule example ---
print("\nKing's rule: integral sin(x)/(sin(x)+cos(x)) from 0 to pi/2")
I_king, _ = integrate.quad(lambda x: np.sin(x)/(np.sin(x)+np.cos(x)), 0, np.pi/2)
print(f"  Numerical = {I_king:.6f}")
print(f"  Analytical = pi/4 = {np.pi/4:.6f}")

# --- Leibniz rule example ---
print("\nLeibniz rule: integral (x^alpha - 1)/ln(x) from 0 to 1")
for alpha in [0.5, 1.0, 2.0, 3.0]:
    numerical, _ = integrate.quad(lambda x: (x**alpha - 1)/np.log(x) if x > 1e-15 else 0,
                                   1e-15, 1)
    analytical = np.log(alpha + 1)
    print(f"  alpha={alpha:.1f}: numerical={numerical:.6f}, ln(alpha+1)={analytical:.6f}")

# --- Beta/Gamma connection ---
print("\nBeta function: B(3,4) = Gamma(3)*Gamma(4)/Gamma(7)")
B_num, _ = integrate.quad(lambda x: x**2 * (1-x)**3, 0, 1)
B_analytical = gamma(3) * gamma(4) / gamma(7)
print(f"  Numerical = {B_num:.6f}")
print(f"  Analytical = {B_analytical:.6f}")
print(f"  = 2!*3!/6! = {factorial(2)*factorial(3)/factorial(6):.6f}")

# --- Even/odd symmetry ---
print("\nSymmetry shortcuts:")
I_even, _ = integrate.quad(lambda x: x**4, -2, 2)
I_odd, _ = integrate.quad(lambda x: x**3, -2, 2)
print(f"  integral x^4 from -2 to 2 = {I_even:.4f} (even function, = 2 * integral 0 to 2)")
print(f"  integral x^3 from -2 to 2 = {I_odd:.10f} (odd function, = 0)")
```

## Connection to CS / Games / AI / Business / Industry

- **Machine learning:** The Beta function appears in Bayesian statistics (Beta distribution
  is the conjugate prior for Bernoulli). The Gamma function generalises factorials needed
  for continuous probability distributions.
- **Signal processing:** Wallis-type integrals arise in computing power spectra and filter
  coefficients. Fourier analysis relies heavily on symmetry shortcuts.
- **Physics engines:** Leibniz rule is used to differentiate energy functionals in
  variational methods for physics simulation.
- **Neural networks:** Reduction formulas and definite integral properties simplify
  the computation of normalisation constants in activation functions (e.g., GELU).

## Check Your Understanding

1. **By hand:** Compute $\int_0^{\pi/2} \sin^6 x \, dx$ using the reduction formula.
   Verify: the answer should be $5\pi/32$.

2. **King's rule:** Evaluate $\int_0^{\pi} \frac{x \sin x}{1 + \cos^2 x} dx$.
   *Hint:* Apply King's rule to replace $x$ with $\pi - x$.

3. **Leibniz:** Given $F(\alpha) = \int_0^{\pi/2} \ln(\alpha^2 \sin^2 x + \cos^2 x) dx$,
   find $F'(\alpha)$ using differentiation under the integral sign.

4. **Coding:** Implement the reduction formula recursively and iteratively. Compare both
   with `scipy.integrate.quad` for $n = 0$ through $20$.

## JEE Challenge

**Problem 1.** Evaluate:
$$\int_0^{\pi/2} \frac{\sin^4 x}{\sin^4 x + \cos^4 x} dx$$
*Hint:* Apply King's rule. After adding, simplify the numerator using $\sin^4 x + \cos^4 x$.

**Problem 2.** Prove that:
$$\int_0^1 \frac{\ln(1+x)}{1+x^2} dx = \frac{\pi}{8}\ln 2$$
*Hint:* Substitute $x = \tan\theta$, then use King's rule on the resulting integral over
$[0, \pi/4]$.

**Problem 3.** If $I_n = \int_0^{\pi/4} \tan^n x \, dx$, show that $I_n + I_{n-2} = \frac{1}{n-1}$,
and hence compute $I_6$.
