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

## Connection to CS / Games / AI

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
