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

## Connection to CS / Games / AI

- **Probability** — $P(a \le X \le b) = \int_a^b f(x)\,dx$ for continuous distributions
- **Expected value** — $E[X] = \int x \cdot f(x)\,dx$
- **Cross-entropy loss** — derived from integrating the log-likelihood
- **Rendering** — path tracing integrates light over all directions (Monte Carlo integration)
- **Signal processing** — the Fourier transform is an integral

## Check Your Understanding

1. **Pen & paper:** Compute $\int_1^4 (2x + 3)\,dx$.
2. **Pen & paper:** Use substitution to evaluate $\int_0^1 \frac{2x}{(x^2 + 1)^2}\,dx$.
3. **Pen & paper:** Use integration by parts to evaluate $\int x \cos x\,dx$.
4. **Pen & paper:** Approximate $\int_0^1 e^x\,dx$ using a Riemann sum with 4 right rectangles.  Compare to the exact answer $e - 1$.
