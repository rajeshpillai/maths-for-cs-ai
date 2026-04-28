# Integrals — Riemann Sums to the Definite Integral

## Intuition

Integration is the reverse of differentiation.  If the derivative gives you
the slope, the integral gives you the **area under the curve**.  It answers
questions like: "What is the total distance travelled?" or "What is the
probability that a value falls between 0 and 1?"

## Prerequisites

- Tier 3, Lesson 2: Derivatives

## From First Principles

### Area by rectangles (Riemann sums)

To find the area under $f(x) = x^2$ from $x = 0$ to $x = 3$:

Divide $[0, 3]$ into $n$ rectangles of width $\Delta x = 3/n$.

Right-endpoint sum:

$$S_n = \sum_{i=1}^{n} f(x_i) \Delta x = \sum_{i=1}^{n} \left(\frac{3i}{n}\right)^2 \cdot \frac{3}{n}$$

**Pen & paper with $n = 3$:**

$\Delta x = 1$, points: $x = 1, 2, 3$

$S_3 = 1^2(1) + 2^2(1) + 3^2(1) = 1 + 4 + 9 = 14$

(Over-estimate since $x^2$ is increasing.)

As $n \to \infty$, the sum approaches the exact integral: **9**.

### The definite integral

$$\int_a^b f(x)\,dx = \lim_{n \to \infty} \sum_{i=1}^{n} f(x_i^*) \Delta x$$

### Antiderivatives (indefinite integral)

If $F'(x) = f(x)$, then $F$ is an **antiderivative** of $f$:

$$\int f(x)\,dx = F(x) + C$$

### Key antiderivatives

| $f(x)$ | $\int f(x)\,dx$ |
|---------|-----------------|
| $x^n$ ($n \ne -1$) | $\frac{x^{n+1}}{n+1} + C$ |
| $1/x$ | $\ln|x| + C$ |
| $e^x$ | $e^x + C$ |
| $\sin x$ | $-\cos x + C$ |
| $\cos x$ | $\sin x + C$ |

### Pen & paper: Evaluate $\int_0^3 x^2\,dx$

$$\int_0^3 x^2\,dx = \left[\frac{x^3}{3}\right]_0^3 = \frac{27}{3} - \frac{0}{3} = 9$$

This confirms our Riemann sum approximation.

### Integration techniques (pen & paper)

**Substitution (reverse chain rule):**

$$\int 2x \cdot e^{x^2}\,dx$$

Let $u = x^2$, $du = 2x\,dx$:

$$= \int e^u\,du = e^u + C = e^{x^2} + C$$

**Integration by parts:**

$$\int u\,dv = uv - \int v\,du$$

**Pen & paper:** $\int x \cdot e^x\,dx$

$u = x, dv = e^x\,dx$ → $du = dx, v = e^x$

$= xe^x - \int e^x\,dx = xe^x - e^x + C = e^x(x - 1) + C$

## Python Verification

```python
# ── Integrals: verifying pen & paper work ───────────────────

# Riemann sum for x² from 0 to 3
print("=== Riemann sums for ∫₀³ x² dx ===")
for n in [3, 10, 100, 1000]:
    dx = 3 / n
    total = sum((i * dx)**2 * dx for i in range(1, n + 1))
    print(f"  n={n:4d}: S = {total:.6f}")
print(f"  Exact: 9.0")

# Definite integral using antiderivative
print(f"\n=== Antiderivative: [x³/3]₀³ ===")
print(f"  (3³)/3 - (0³)/3 = {27/3} - {0/3} = {27/3 - 0/3}")

# Substitution verification: ∫ 2x·e^(x²) dx
import math
print(f"\n=== Substitution: d/dx(e^(x²)) = 2x·e^(x²) ===")
h = 1e-8
x = 2.0
numerical = (math.exp((x+h)**2) - math.exp(x**2)) / h
analytical = 2*x * math.exp(x**2)
print(f"  Numerical derivative: {numerical:.4f}")
print(f"  Analytical (2x·e^(x²)): {analytical:.4f}")

# Integration by parts: ∫₀¹ x·eˣ dx = [eˣ(x-1)]₀¹ = 1·0 - e⁰·(-1) = 1
print(f"\n=== Integration by parts: ∫₀¹ x·eˣ dx ===")
exact = math.e * (1 - 1) - math.exp(0) * (0 - 1)
print(f"  Exact: e⁰·1 = {exact:.6f}")

# Numerical integration
n = 10000
dx = 1 / n
numerical = sum((i*dx) * math.exp(i*dx) * dx for i in range(n))
print(f"  Numerical (n={n}): {numerical:.6f}")
```

## Visualisation — The integral as area under a curve

A definite integral is, in one phrase, **the signed area** between the
curve and the x-axis. The classical Riemann picture — slicing the area
into thin rectangles whose heights are the function values — is the
simplest way to *see* what the integral is and why it converges.

```python
# ── Visualising integration as area ─────────────────────────
import numpy as np
import matplotlib.pyplot as plt

def f(x): return x ** 2

fig, axes = plt.subplots(1, 3, figsize=(16, 4.8))

# (1) Riemann sum with a small number of rectangles — coarse, visibly
# under-/overshoots the true area.
ax = axes[0]
xs = np.linspace(0, 2, 400)
ax.plot(xs, f(xs), color="tab:blue", lw=2)
ax.fill_between(xs, f(xs), color="tab:blue", alpha=0.10)

n = 6
edges  = np.linspace(0, 2, n + 1)
widths = np.diff(edges)
heights = f(edges[:-1])                              # left endpoints
ax.bar(edges[:-1], heights, width=widths, align="edge",
       color="tab:orange", alpha=0.55, edgecolor="darkorange")
riemann = (heights * widths).sum()
exact   = 2 ** 3 / 3
ax.set_title(f"Riemann sum, n = {n} rectangles\n"
             f"area ≈ {riemann:.4f},  true value 8/3 ≈ {exact:.4f}")
ax.set_xlim(0, 2.2); ax.set_ylim(0, 4.5)
ax.set_xlabel("x"); ax.set_ylabel("f(x) = x²")
ax.grid(True, alpha=0.3)

# (2) Same picture but with many more rectangles — visually
# indistinguishable from the curve. This is the geometric content of
# "Riemann sum → integral as n → ∞".
ax = axes[1]
ax.plot(xs, f(xs), color="tab:blue", lw=2)
ax.fill_between(xs, f(xs), color="tab:blue", alpha=0.10)

n = 50
edges  = np.linspace(0, 2, n + 1)
widths = np.diff(edges)
heights = f(edges[:-1])
ax.bar(edges[:-1], heights, width=widths, align="edge",
       color="tab:orange", alpha=0.65, edgecolor="darkorange", linewidth=0.5)
riemann = (heights * widths).sum()
ax.set_title(f"Riemann sum, n = {n} rectangles\n"
             f"area ≈ {riemann:.4f}  (closing in on 8/3)")
ax.set_xlim(0, 2.2); ax.set_ylim(0, 4.5)
ax.set_xlabel("x"); ax.set_ylabel("f(x) = x²")
ax.grid(True, alpha=0.3)

# (3) Convergence: plot Riemann error vs n on log–log axes; the slope
# is exactly −1 (i.e. error ∝ 1/n) for left-endpoint rules on smooth
# functions. Geometrically: cut n in half, error doubles.
ax = axes[2]
ns_test = np.array([2, 4, 8, 16, 32, 64, 128, 256, 1024, 4096])
errs = []
for nn in ns_test:
    edges = np.linspace(0, 2, nn + 1)
    widths = np.diff(edges)
    heights = f(edges[:-1])
    errs.append(abs((heights * widths).sum() - exact))
errs = np.array(errs)
ax.loglog(ns_test, errs, "o-", color="tab:red", lw=2, label="left-endpoint Riemann")
# Reference line proportional to 1/n.
ax.loglog(ns_test, errs[0] * (ns_test[0] / ns_test), color="black",
          linestyle="--", lw=1, label="$1/n$ reference")
ax.set_xlabel("n (number of rectangles)"); ax.set_ylabel("|error| (log scale)")
ax.set_title("Riemann error shrinks like 1/n\n(double n → halve the error)")
ax.legend(); ax.grid(True, which="both", alpha=0.3)

plt.tight_layout()
plt.show()

# Print the convergence table that mirrors the third panel.
print(f"True value: ∫₀² x² dx = 8/3 ≈ {exact:.6f}")
print(f"\n{'n':>6}  {'Riemann sum':>15}  {'error':>12}")
for nn in [2, 8, 32, 128, 512, 4096]:
    edges = np.linspace(0, 2, nn + 1)
    R = (f(edges[:-1]) * np.diff(edges)).sum()
    print(f"  {nn:>5}  {R:>15.6f}  {abs(R - exact):>12.6f}")
```

**Three things to take away:**

- **Definite integral = signed area.** The leftmost picture is the
  geometric *definition*. Every $\int_a^b f(x)\,dx$ is the limit of
  rectangle sums as the rectangles get thinner.
- **Approximation by rectangles converges.** As $n \to \infty$ the
  staircase approaches the true area. The middle picture shows it
  visually; the right one shows the error decay $\propto 1/n$. (More
  sophisticated rules — trapezoidal, Simpson's, Gaussian quadrature —
  converge faster.)
- **Integration ≠ random number-crunching.** Many practical
  questions — total energy used, total revenue over a quarter, total
  charge through a circuit — are integrals in disguise. The next
  lesson (the Fundamental Theorem) shows that whenever you can
  *antidifferentiate* the integrand symbolically, you skip the
  rectangle limit entirely.

## Connection to CS / Games / AI / Business / Industry

- **Probability** — $P(a \le X \le b) = \int_a^b f(x)\,dx$ for continuous distributions
- **Expected value** — $E[X] = \int x \cdot f(x)\,dx$
- **Cross-entropy loss** — derived from integrating the log-likelihood
- **Rendering** — path tracing integrates light over all directions (Monte Carlo integration)
- **Signal processing** — the Fourier transform is an integral
- **Discounted cash flow & bond pricing (Finance)** — present value of a continuous coupon stream is $\int_0^T C(t)e^{-rt}\,dt$; pricing desks at BlackRock and PIMCO integrate yield curves daily to mark trillion-dollar bond portfolios.
- **Total-energy billing & smart meters (Operations)** — utilities (Pacific Gas & Electric, National Grid) integrate instantaneous power $P(t)$ over a billing period to compute kWh consumption; same math runs in Tesla Powerwall analytics.
- **Drug AUC (Area Under Curve) in pharmacokinetics** — the FDA bioequivalence standard requires $\int_0^\infty C(t)\,dt$ from blood-concentration curves; trapezoidal-rule integration is built into WinNonlin and Phoenix used by every major pharma trial.
- **Aerodynamic lift & drag (Engineering)** — Airbus and Boeing compute lift by integrating pressure over wing surfaces; Formula 1 teams (Mercedes, Red Bull) integrate CFD pressure fields to score downforce per design iteration.

## Check Your Understanding

1. **Pen & paper:** Compute $\int_1^4 (2x + 3)\,dx$.
2. **Pen & paper:** Use substitution to evaluate $\int_0^1 \frac{2x}{(x^2 + 1)^2}\,dx$.
3. **Pen & paper:** Use integration by parts to evaluate $\int x \cos x\,dx$.
4. **Pen & paper:** Approximate $\int_0^1 e^x\,dx$ using a Riemann sum with 4 right rectangles.  Compare to the exact answer $e - 1$.
