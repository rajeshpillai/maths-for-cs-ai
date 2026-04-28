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

## Visualisation — Differentiation and integration as inverses

The Fundamental Theorem says: **integration and differentiation undo
each other**. Two pictures make that visible — an "area-so-far"
function $F(x) = \int_a^x f$ whose derivative is $f$, and an
antiderivative $F$ whose increase $F(b) - F(a)$ is exactly the area
under $f$ from $a$ to $b$.

```python
# ── Visualising the Fundamental Theorem of Calculus ─────────
import numpy as np
import matplotlib.pyplot as plt

# Original function (the rate) and its antiderivative (the cumulative).
f = lambda x: x ** 2                       # rate
F = lambda x: x ** 3 / 3                   # antiderivative ⇒ F'(x) = f(x)

a, b = 0.0, 2.0
xs = np.linspace(a, b, 200)

fig, axes = plt.subplots(1, 2, figsize=(14, 5.2))

# (1) f and the running area F(x) = ∫₀ˣ f(t) dt on the SAME plot.
# At every x, the slope of the orange curve equals the height of the
# blue curve — that's FTC part 1.
ax = axes[0]
ax.plot(xs, f(xs), color="tab:blue",   lw=2, label="f(x) = x²")
ax.plot(xs, F(xs), color="tab:orange", lw=2,
        label="F(x) = ∫₀ˣ t² dt = x³/3")
# Mark a few points and draw the tangent of F there to show its slope = f.
for xc in [0.5, 1.0, 1.5]:
    slope = f(xc)
    ax.scatter([xc], [F(xc)], color="tab:red", s=60, zorder=5)
    h = 0.25
    ax.plot([xc - h, xc + h],
            [F(xc) - slope * h, F(xc) + slope * h],
            color="tab:red", lw=1.4)
    ax.annotate(f"slope = f({xc}) = {slope:.2f}",
                xy=(xc + h, F(xc) + slope * h),
                xytext=(xc + 0.05, F(xc) + slope * h + 0.4),
                fontsize=8, color="tab:red")
ax.set_title("FTC part 1: derivative of the area function = f\n"
             "tangent to F(x) at any x has slope f(x)")
ax.set_xlabel("x"); ax.set_ylabel("value")
ax.legend(loc="upper left"); ax.grid(True, alpha=0.3)

# (2) FTC part 2: ∫_a^b f = F(b) − F(a).  The shaded area on the LEFT is
# numerically equal to the vertical drop on the RIGHT (a single subtraction).
ax = axes[1]
ax.plot(xs, f(xs), color="tab:blue", lw=2, label="f(x) = x²")
ax.fill_between(xs, f(xs), color="tab:blue", alpha=0.30,
                label=f"area = ∫₀² x² dx = {F(b) - F(a):.4f}")
# Shade the SAME total along F's vertical axis (right side overlay).
ax.axhline(F(b),                   color="tab:orange", lw=1.5, linestyle="--")
ax.axhline(F(a),                   color="tab:orange", lw=1.5, linestyle="--")
ax.annotate("", xy=(2.05, F(b)), xytext=(2.05, F(a)),
            arrowprops=dict(arrowstyle="<->", color="tab:orange", lw=2))
ax.text(2.10, (F(b) + F(a)) / 2,
        f"F(b) − F(a)\n= {F(b):.4f} − {F(a):.4f}\n= {F(b) - F(a):.4f}",
        color="tab:orange", fontsize=10, va="center")
ax.set_title("FTC part 2: ∫_a^b f(x) dx  =  F(b) − F(a)\n"
             "(area on the left = vertical jump in F on the right)")
ax.set_xlabel("x"); ax.set_ylabel("value")
ax.set_xlim(0, 3.4); ax.set_ylim(0, 4.5)
ax.legend(loc="upper left"); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Numerical check by sampling F via a Riemann sum.
n = 10_000
sample = np.linspace(a, b, n + 1)
riemann = (f(sample[:-1]) * np.diff(sample)).sum()
print(f"FTC: ∫_{a}^{b} x² dx = F({b}) - F({a}) = {F(b)} - {F(a)} = {F(b) - F(a):.6f}")
print(f"Numerical (Riemann, n = {n}): {riemann:.6f}")
print(f"Gap (numerical vs FTC): {abs(riemann - (F(b) - F(a))):.2e}")
```

**Why this theorem is the single most useful in calculus:**

- **It links two operations that look completely different.**
  Differentiation is local (slope at a single point); integration is
  global (area over an interval). FTC says they're inverses — and
  that's why you can compute most integrals *symbolically* by
  guessing an antiderivative.
- **It eliminates the need for Riemann limits in practice.** Once you
  know $F$ with $F'(x) = f(x)$, the definite integral is a
  *subtraction*, not a limit. Compare the right panel: a single
  vertical jump on the orange curve replaces an entire blue area.
- **It is the bridge between any "rate" quantity and its accumulated
  total.** Velocity ↔ position, current ↔ charge, marginal cost ↔
  total cost, PDF ↔ CDF — every one of those pairs is an FTC pair.

## Connection to CS / Games / AI / Business / Industry

- **Probability** — The CDF is the integral of the PDF; the FTC connects them: $\frac{d}{dx}F(x) = f(x)$
- **Physics engines** — position = integral of velocity, velocity = integral of acceleration
- **Expected value** — computed via integration; the FTC lets us evaluate it analytically for known distributions
- **Backpropagation** — conceptually related: the chain rule version of FTC mirrors how gradients flow backward
- **Inventory accumulation (Operations)** — Walmart and Amazon FBA forecast stock levels as $I(t) = I_0 + \int_0^t (\text{inflow} - \text{outflow})\,d\tau$; the FTC lets ERP systems (SAP, Oracle NetSuite) recover instantaneous demand rates from cumulative shipment logs.
- **Black-Scholes & Greeks (Quant Finance)** — option price is an integral over future payoffs; trading desks at Citadel and Jane Street differentiate this using the FTC to compute Delta and Gamma in real time.
- **Odometer & flow-meter calibration (Industry)** — Bosch ABS and Schlumberger oilfield flow meters integrate velocity/flow rate over time to report distance/volume; the FTC guarantees the differentiated rate matches the sensor reading.
- **Epidemiology dose-response (Public Health)** — cumulative infection counts in CDC and WHO models are integrals of incidence rates; the FTC lets epidemiologists recover R0 and effective contact rates from cumulative case curves.

## Check Your Understanding

1. **Pen & paper:** Evaluate $\int_0^{\pi} \sin x\,dx$ using the FTC.
2. **Pen & paper:** Find $\frac{d}{dx}\int_1^{x^3} e^t\,dt$.
3. **Pen & paper:** If $f'(x) = 6x^2 - 4x + 1$ and $f(0) = 2$, find $f(x)$.
4. **Think about it:** Why is the FTC so important for computing probabilities from probability density functions?
