# Multivariable Integration

## Intuition

Single-variable integrals give area under a curve.  **Double integrals** give
the volume under a surface.  **Triple integrals** give… well, hyper-volume.
These appear whenever you need to sum a quantity over a 2D or 3D region:
probability over a 2D distribution, mass of a solid, or total light hitting
a surface.

## Prerequisites

- Tier 3, Lesson 6: Integrals (single variable)
- Tier 3, Lesson 7: Fundamental Theorem of Calculus

## From First Principles

### Double integrals

$$\iint_R f(x, y)\,dA = \int_a^b \int_{c}^{d} f(x, y)\,dy\,dx$$

Compute the **inner integral** first (treat the other variable as constant),
then the **outer integral**.

### Pen & paper: $\int_0^2 \int_0^3 (x + y)\,dy\,dx$

**Inner integral** (integrate with respect to $y$, treat $x$ as constant):

$$\int_0^3 (x + y)\,dy = \left[xy + \frac{y^2}{2}\right]_0^3 = 3x + \frac{9}{2}$$

**Outer integral:**

$$\int_0^2 \left(3x + \frac{9}{2}\right)\,dx = \left[\frac{3x^2}{2} + \frac{9x}{2}\right]_0^2 = 6 + 9 = 15$$

### Pen & paper: $\int_0^1 \int_0^x xy\,dy\,dx$

Here the inner limit depends on $x$ (triangular region).

**Inner:** $\int_0^x xy\,dy = x\left[\frac{y^2}{2}\right]_0^x = \frac{x^3}{2}$

**Outer:** $\int_0^1 \frac{x^3}{2}\,dx = \frac{1}{2}\left[\frac{x^4}{4}\right]_0^1 = \frac{1}{8}$

### Change of variables (Jacobian)

When switching coordinate systems:

$$\iint f(x, y)\,dx\,dy = \iint f(x(u,v), y(u,v)) \cdot |J|\,du\,dv$$

where $|J| = \left|\det\frac{\partial(x,y)}{\partial(u,v)}\right|$ is the **absolute Jacobian determinant**.

### Polar coordinates

$x = r\cos\theta$, $y = r\sin\theta$, $|J| = r$

$$\iint f(x, y)\,dx\,dy = \int \int f(r\cos\theta, r\sin\theta) \cdot r\,dr\,d\theta$$

**Pen & paper:** Area of a circle of radius $R$:

$$A = \int_0^{2\pi}\int_0^R r\,dr\,d\theta = \int_0^{2\pi}\frac{R^2}{2}\,d\theta = \pi R^2$$

## Python Verification

```python
# ── Multivariable Integration ───────────────────────────────

# Double integral: ∫₀² ∫₀³ (x+y) dy dx = 15
print("=== Double integral ===")
n = 1000
dx = 2 / n
dy_val = 3 / n
total = 0
for i in range(n):
    x = i * dx
    for j in range(n):
        y = j * dy_val
        total += (x + y) * dx * dy_val
print(f"Numerical: {total:.4f}")
print(f"Exact: 15")

# Triangular region: ∫₀¹ ∫₀ˣ xy dy dx = 1/8
print(f"\n=== Triangular region ===")
n = 1000
dx = 1 / n
total = 0
for i in range(n):
    x = (i + 0.5) * dx
    dy_val = x / n
    for j in range(n):
        y = (j + 0.5) * dy_val
        total += x * y * dx * dy_val
print(f"Numerical: {total:.6f}")
print(f"Exact: {1/8}")

# Area of circle via polar coordinates
print(f"\n=== Circle area (polar) ===")
import math
R = 3
n = 1000
dr = R / n
dtheta = 2 * math.pi / n
total = 0
for i in range(n):
    r = (i + 0.5) * dr
    for j in range(n):
        total += r * dr * dtheta
print(f"Numerical: {total:.4f}")
print(f"Exact (πR²): {math.pi * R**2:.4f}")
```

## Connection to CS / Games / AI

- **Probability** — marginal distributions: $p(x) = \int p(x, y)\,dy$
- **Expected value** — $E[g(X,Y)] = \iint g(x,y) p(x,y)\,dx\,dy$
- **Rendering** — path tracing integrates light over hemisphere of directions
- **Physics** — centre of mass, moments of inertia require double/triple integrals
- **Normalising flows** — use the Jacobian determinant for change-of-variables in probability distributions

## Check Your Understanding

1. **Pen & paper:** Evaluate $\int_0^1 \int_0^2 3x^2y\,dx\,dy$.
2. **Pen & paper:** Compute $\int_0^1 \int_y^1 1\,dx\,dy$.  Sketch the region first.
3. **Pen & paper:** Convert $\int_{-1}^{1}\int_{-\sqrt{1-x^2}}^{\sqrt{1-x^2}} 1\,dy\,dx$ to polar coordinates and evaluate.
