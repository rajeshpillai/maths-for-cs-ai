# Numerical Methods — Trapezium Rule and Simpson's Rule

## Intuition

Some integrals have no neat closed-form answer: $\int e^{-x^2}\,dx$ (the
Gaussian integral) is famous for this.  **Numerical integration** approximates
the area under a curve by dividing it into simple shapes — trapezoids or
parabolic arcs — and summing their areas.  This is how computers evaluate
integrals in practice.

## Prerequisites

- Tier 3, Lesson 6: Integrals (Riemann sums)

## From First Principles

### Trapezium rule

Approximate the area under $f(x)$ from $a$ to $b$ using $n$ trapezoids:

$$\int_a^b f(x)\,dx \approx \frac{h}{2}\left[f(x_0) + 2f(x_1) + 2f(x_2) + \cdots + 2f(x_{n-1}) + f(x_n)\right]$$

where $h = \frac{b - a}{n}$ and $x_i = a + ih$.

**Why it works:** Each strip is a trapezoid with parallel sides $f(x_i)$ and $f(x_{i+1})$, width $h$.

Area of one trapezoid: $\frac{h}{2}[f(x_i) + f(x_{i+1})]$

### Pen & paper: $\int_0^1 x^2\,dx$ with $n = 4$

$h = 0.25$.  Points: $x = 0, 0.25, 0.5, 0.75, 1$.

$f(x) = 0, 0.0625, 0.25, 0.5625, 1$

$$T = \frac{0.25}{2}[0 + 2(0.0625) + 2(0.25) + 2(0.5625) + 1]$$

$$= 0.125[0 + 0.125 + 0.5 + 1.125 + 1] = 0.125 \times 2.75 = 0.34375$$

Exact: $1/3 \approx 0.3333$.  Error: $0.01$.

### Error analysis

Trapezium rule error $\propto h^2$ — halving $h$ reduces error by 4×.

For $n = 8$ (halved $h$): error $\approx 0.0025$.

### Simpson's rule (more accurate)

Use parabolic arcs instead of straight lines.  Requires $n$ **even**.

$$\int_a^b f(x)\,dx \approx \frac{h}{3}\left[f(x_0) + 4f(x_1) + 2f(x_2) + 4f(x_3) + \cdots + 4f(x_{n-1}) + f(x_n)\right]$$

Pattern: $1, 4, 2, 4, 2, \ldots, 4, 1$.

Error $\propto h^4$ — much faster convergence.

### Pen & paper: Simpson's for $\int_0^1 x^2\,dx$ with $n = 4$

$$S = \frac{0.25}{3}[0 + 4(0.0625) + 2(0.25) + 4(0.5625) + 1]$$

$$= \frac{0.25}{3}[0 + 0.25 + 0.5 + 2.25 + 1] = \frac{0.25 \times 4}{3} = \frac{1}{3} = 0.3333...$$

Simpson's gives the **exact** answer for polynomials up to degree 3.

### When to use numerical integration

- No closed form exists: $\int e^{-x^2}\,dx$, $\int \frac{\sin x}{x}\,dx$
- Function only known at discrete points (sensor data, simulation output)
- High-dimensional integrals (Monte Carlo is better — Tier 10-05)

### Newton-Cotes family

| Method | Shapes | Error order | Formula weight pattern |
|--------|--------|-------------|----------------------|
| Trapezium | Straight lines | $O(h^2)$ | $1, 1$ |
| Simpson's | Parabolas | $O(h^4)$ | $1, 4, 1$ |
| Simpson's 3/8 | Cubics | $O(h^4)$ | $1, 3, 3, 1$ |

## Python Verification

```python
# ── Numerical Integration ───────────────────────────────────
import math

def trapezium(f, a, b, n):
    h = (b - a) / n
    total = f(a) + f(b)
    for i in range(1, n):
        total += 2 * f(a + i * h)
    return h / 2 * total

def simpsons(f, a, b, n):
    """n must be even."""
    h = (b - a) / n
    total = f(a) + f(b)
    for i in range(1, n):
        total += (4 if i % 2 == 1 else 2) * f(a + i * h)
    return h / 3 * total

# ∫₀¹ x² dx = 1/3
print("=== ∫₀¹ x² dx (exact = 0.33333...) ===")
f = lambda x: x**2
for n in [2, 4, 8, 16, 32]:
    T = trapezium(f, 0, 1, n)
    S = simpsons(f, 0, 1, n) if n % 2 == 0 else None
    T_err = abs(T - 1/3)
    S_err = abs(S - 1/3) if S else None
    s_str = f"Simpson={S:.8f} err={S_err:.2e}" if S else ""
    print(f"  n={n:2d}: Trap={T:.8f} err={T_err:.2e}  {s_str}")

# ∫₀¹ e^(-x²) dx (no closed form — this is erf related)
print(f"\n=== ∫₀¹ e^(-x²) dx ===")
f2 = lambda x: math.exp(-x**2)
for n in [4, 16, 64, 256]:
    T = trapezium(f2, 0, 1, n)
    S = simpsons(f2, 0, 1, n)
    print(f"  n={n:3d}: Trap={T:.8f}, Simpson={S:.8f}")
# Reference value: 0.74682413...
print(f"  Reference: 0.74682413")

# Convergence rate
print(f"\n=== Convergence: halving h ===")
exact = 1/3
prev_T_err, prev_S_err = None, None
for n in [4, 8, 16, 32, 64]:
    T_err = abs(trapezium(f, 0, 1, n) - exact)
    S_err = abs(simpsons(f, 0, 1, n) - exact)
    T_ratio = prev_T_err / T_err if prev_T_err else 0
    S_ratio = prev_S_err / S_err if prev_S_err and S_err > 0 else 0
    print(f"  n={n:2d}: T_err={T_err:.2e} (×{T_ratio:.1f}), S_err={S_err:.2e}")
    prev_T_err, prev_S_err = T_err, S_err

# From discrete data (no formula, just points)
print(f"\n=== From discrete data ===")
# Speed readings every second: estimate distance
times = [0, 1, 2, 3, 4, 5]
speeds = [0, 3, 7, 12, 10, 8]  # m/s
h = 1
dist = h/2 * (speeds[0] + 2*sum(speeds[1:-1]) + speeds[-1])
print(f"  Time: {times}")
print(f"  Speed: {speeds}")
print(f"  Distance ≈ {dist} m (trapezium rule)")
```

## Visualisation — Trapeziums approximating an integral

The trapezium (trapezoidal) rule replaces the curve with a sequence of
straight line-segments; each segment defines a trapezium whose area we
*can* compute exactly. Adding them up gives an estimate of the
integral, which converges as the number of trapeziums grows.

```python
# ── Visualising the trapezium rule ──────────────────────────
import numpy as np
import matplotlib.pyplot as plt

# Integrand: f(x) = x · sin(x) on [0, π].
# Exact ∫₀^π x sin(x) dx = π (= 3.1416…).
def f(x): return x * np.sin(x)
exact = np.pi

fig, axes = plt.subplots(1, 3, figsize=(16, 5))

# (1) A coarse 4-trapezium estimate, drawn as filled trapezia.
ax = axes[0]
xs = np.linspace(0, np.pi, 400)
ax.plot(xs, f(xs), color="tab:blue", lw=2)
n = 4
edges = np.linspace(0, np.pi, n + 1)
heights = f(edges)
trap_area = 0.0
for i in range(n):
    x0, x1 = edges[i], edges[i + 1]
    h0, h1 = heights[i], heights[i + 1]
    ax.fill_between([x0, x1], [h0, h1], color="tab:orange", alpha=0.5,
                    edgecolor="darkorange", lw=1.5)
    trap_area += 0.5 * (x1 - x0) * (h0 + h1)
ax.scatter(edges, heights, color="tab:red", zorder=5)
ax.set_xlabel("x"); ax.set_ylabel("f(x) = x sin(x)")
ax.set_title(f"Trapezium rule with n = {n}\narea ≈ {trap_area:.4f},  exact = π ≈ {exact:.4f}")
ax.grid(True, alpha=0.3)

# (2) Fine 16-trapezium estimate — error is much smaller.
ax = axes[1]
ax.plot(xs, f(xs), color="tab:blue", lw=2)
n = 16
edges = np.linspace(0, np.pi, n + 1)
heights = f(edges)
trap_area_fine = 0.0
for i in range(n):
    x0, x1 = edges[i], edges[i + 1]
    h0, h1 = heights[i], heights[i + 1]
    ax.fill_between([x0, x1], [h0, h1], color="tab:orange", alpha=0.5,
                    edgecolor="darkorange", lw=0.8)
    trap_area_fine += 0.5 * (x1 - x0) * (h0 + h1)
ax.set_xlabel("x"); ax.set_ylabel("f(x)")
ax.set_title(f"Trapezium rule with n = {n}\narea ≈ {trap_area_fine:.6f}")
ax.grid(True, alpha=0.3)

# (3) Convergence: trapezium error vs n on log-log axes. Slope is −2.
ax = axes[2]
ns = np.array([2, 4, 8, 16, 32, 64, 128, 256, 1024])
errs = []
for nn in ns:
    e = np.linspace(0, np.pi, nn + 1)
    h_arr = f(e)
    val = 0.5 * (np.pi / nn) * (h_arr[0] + 2 * h_arr[1:-1].sum() + h_arr[-1])
    errs.append(abs(val - exact))
errs = np.array(errs)
ax.loglog(ns, errs, "o-", color="tab:red", lw=2, label="trapezium error")
ax.loglog(ns, errs[0] * (ns[0] / ns) ** 2, color="black", linestyle="--", lw=1,
          label="$1/n^2$ reference")
ax.set_xlabel("n (number of trapezia)"); ax.set_ylabel("|error| (log)")
ax.set_title("Trapezium error decays as 1/n²\n(double n → quarter the error)")
ax.legend(); ax.grid(True, which="both", alpha=0.3)

plt.tight_layout()
plt.show()

# Print the convergence table.
print(f"True ∫₀^π x sin(x) dx = π = {exact:.10f}")
print(f"\n{'n':>6}  {'trapezium estimate':>22}  {'error':>14}")
for nn in [4, 16, 64, 256, 1024]:
    e = np.linspace(0, np.pi, nn + 1)
    h_arr = f(e)
    val = 0.5 * (np.pi / nn) * (h_arr[0] + 2 * h_arr[1:-1].sum() + h_arr[-1])
    print(f"  {nn:>4}  {val:>22.10f}  {abs(val - exact):>14.2e}")
```

**Two practical lessons:**

- **Trapezium ≫ left-endpoint Riemann.** Approximating with line
  segments instead of rectangles cuts the error from $O(1/n)$ to
  $O(1/n^2)$. *Doubling* $n$ now *quarters* the error, instead of
  halving it.
- **Simpson's rule does even better.** Replacing line segments with
  parabolas through three points gives $O(1/n^4)$ convergence. SciPy's
  `quad` adaptive integrator uses Gaussian quadrature internally,
  which is exact for polynomials up to a high degree — but the
  trapezium rule is what you reach for when you only have *data*, not
  a formula.

## Connection to CS / Games / AI / Business / Industry

- **Numerical integration** — SciPy `quad()`, NumPy `trapz()` use these methods
- **Probability** — compute CDFs when PDF has no closed-form integral
- **Physics** — integrate forces to get impulse, power to get energy
- **Finance** — numerical pricing of options (Black-Scholes variations)
- **Sensor data** — estimate total from discrete measurements (GPS distance, energy usage)
- **Adaptive methods** — real implementations adjust $n$ based on local error estimates

## Check Your Understanding

1. **Pen & paper:** Use the trapezium rule with $n = 4$ to estimate $\int_1^3 \frac{1}{x}\,dx$.  Compare to $\ln 3 \approx 1.0986$.
2. **Pen & paper:** Use Simpson's rule with $n = 2$ to estimate $\int_0^{\pi} \sin x\,dx$.  Compare to exact = 2.
3. **Pen & paper:** If trapezium with $n = 10$ gives error 0.01, roughly what error do you expect with $n = 20$?
