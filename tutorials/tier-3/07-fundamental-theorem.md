# Fundamental Theorem of Calculus

## Intuition

The Fundamental Theorem of Calculus is the bridge between derivatives and
integrals — it says **differentiation and integration are inverse operations**.
It's one of the most beautiful results in mathematics and the reason we can
evaluate integrals using antiderivatives instead of computing limits of sums.

## Prerequisites

- Tier 3, Lesson 2: Derivatives
- Tier 3, Lesson 6: Integrals

## From First Principles

### Part 1 — Differentiation undoes integration

If $F(x) = \int_a^x f(t)\,dt$, then:

$$F'(x) = f(x)$$

**In words:** The derivative of "the area under $f$ from $a$ to $x$" equals $f(x)$ itself.

**Pen & paper:** Let $F(x) = \int_0^x t^2\,dt = \frac{x^3}{3}$.

Then $F'(x) = x^2 = f(x)$ ✓

### Part 2 — Evaluating definite integrals

If $F$ is any antiderivative of $f$ (i.e., $F' = f$), then:

$$\int_a^b f(x)\,dx = F(b) - F(a)$$

**Pen & paper:** $\int_1^3 2x\,dx$

Antiderivative: $F(x) = x^2$

$= F(3) - F(1) = 9 - 1 = 8$

**Verify with Riemann sum:** Area under the line $2x$ from 1 to 3 = trapezoid with parallel sides $2$ and $6$, width $2$: $\frac{(2+6)}{2} \times 2 = 8$ ✓

### Why it works (intuitive argument)

Think of $f(x)$ as a rate (e.g., speed).

- The integral $\int_a^b f(x)\,dx$ gives the **total accumulated quantity** (distance).
- The derivative of accumulated distance = instantaneous speed = $f(x)$.

So differentiation and integration are inverse processes.

### Common patterns

$$\frac{d}{dx}\int_0^x f(t)\,dt = f(x)$$

$$\frac{d}{dx}\int_0^{g(x)} f(t)\,dt = f(g(x)) \cdot g'(x) \quad \text{(chain rule!)}$$

**Pen & paper:** $\frac{d}{dx}\int_0^{x^2} \sin t\,dt = \sin(x^2) \cdot 2x$

### Net change theorem

$$\int_a^b f'(x)\,dx = f(b) - f(a)$$

The integral of a rate of change gives the net change.

**Pen & paper:** If velocity is $v(t) = 3t^2$, what is the displacement from $t = 0$ to $t = 2$?

$$\int_0^2 3t^2\,dt = [t^3]_0^2 = 8 - 0 = 8 \text{ units}$$

## Python Verification

```python
# ── Fundamental Theorem of Calculus ─────────────────────────
import math

# FTC Part 1: d/dx ∫₀ˣ t² dt = x²
print("=== FTC Part 1 ===")
h = 1e-8
x = 3.0
F = lambda x: x**3 / 3  # antiderivative of t²
F_prime = (F(x + h) - F(x)) / h
print(f"F(x) = x³/3, F'({x}) = {F_prime:.6f}")
print(f"f(x) = x² = {x**2}")

# FTC Part 2: ∫₁³ 2x dx = x²|₁³ = 9-1 = 8
print(f"\n=== FTC Part 2 ===")
F_of_3 = 3**2
F_of_1 = 1**2
print(f"∫₁³ 2x dx = F(3) - F(1) = {F_of_3} - {F_of_1} = {F_of_3 - F_of_1}")

# Verify numerically
n = 100000
dx = 2.0 / n
numerical = sum(2 * (1 + i * dx) * dx for i in range(n))
print(f"Numerical (n={n}): {numerical:.6f}")

# Chain rule version: d/dx ∫₀^(x²) sin(t) dt = sin(x²)·2x
print(f"\n=== FTC with chain rule ===")
x = 1.0

# Numerical: d/dx [∫₀^(x²) sin(t) dt]
def F_chain(x):
    # ∫₀^(x²) sin(t) dt = 1 - cos(x²)
    return 1 - math.cos(x**2)

numerical = (F_chain(x + h) - F_chain(x)) / h
analytical = math.sin(x**2) * 2 * x
print(f"Numerical: {numerical:.6f}")
print(f"Analytical (sin(x²)·2x): {analytical:.6f}")

# Net change: displacement from velocity v(t) = 3t²
print(f"\n=== Net change theorem ===")
# ∫₀² 3t² dt = t³|₀² = 8
print(f"Displacement = [t³]₀² = {2**3 - 0**3}")
```

## Connection to CS / Games / AI

- **Probability** — The CDF is the integral of the PDF; the FTC connects them: $\frac{d}{dx}F(x) = f(x)$
- **Physics engines** — position = integral of velocity, velocity = integral of acceleration
- **Expected value** — computed via integration; the FTC lets us evaluate it analytically for known distributions
- **Backpropagation** — conceptually related: the chain rule version of FTC mirrors how gradients flow backward

## Check Your Understanding

1. **Pen & paper:** Evaluate $\int_0^{\pi} \sin x\,dx$ using the FTC.
2. **Pen & paper:** Find $\frac{d}{dx}\int_1^{x^3} e^t\,dt$.
3. **Pen & paper:** If $f'(x) = 6x^2 - 4x + 1$ and $f(0) = 2$, find $f(x)$.
4. **Think about it:** Why is the FTC so important for computing probabilities from probability density functions?
