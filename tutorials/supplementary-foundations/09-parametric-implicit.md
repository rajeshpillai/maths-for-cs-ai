# Parametric Equations and Implicit Differentiation

## Intuition

Sometimes a curve is easier to describe using a **parameter** $t$ that traces
the path over time: $x = f(t), y = g(t)$.  A particle's position, a Bézier
curve, an orbiting planet — all naturally parametric.  **Implicit
differentiation** handles equations like $x^2 + y^2 = 25$ where $y$ isn't
isolated — you differentiate both sides and solve for $dy/dx$.

## Prerequisites

- Tier 3, Lesson 2: Derivatives
- Tier 3, Lesson 4: Chain Rule

## From First Principles

### Parametric equations

Instead of $y = f(x)$, define both coordinates in terms of parameter $t$:

$$x = f(t), \quad y = g(t)$$

**Pen & paper: Circle**

$x = r\cos t, \quad y = r\sin t, \quad 0 \le t < 2\pi$

At $t = 0$: $(r, 0)$.  At $t = \pi/2$: $(0, r)$.  Traces a circle.

### Gradient of a parametric curve

$$\frac{dy}{dx} = \frac{dy/dt}{dx/dt}$$

**Pen & paper:** $x = t^2, y = t^3$.

$\frac{dx}{dt} = 2t, \quad \frac{dy}{dt} = 3t^2$

$\frac{dy}{dx} = \frac{3t^2}{2t} = \frac{3t}{2}$

At $t = 2$: slope = $3$.

### Second derivative (parametric)

$$\frac{d^2y}{dx^2} = \frac{\frac{d}{dt}\left(\frac{dy}{dx}\right)}{\frac{dx}{dt}}$$

Continuing: $\frac{d}{dt}\left(\frac{3t}{2}\right) = \frac{3}{2}$

$\frac{d^2y}{dx^2} = \frac{3/2}{2t} = \frac{3}{4t}$

### Common parametric curves

| Curve | $x$ | $y$ |
|-------|-----|-----|
| Circle | $r\cos t$ | $r\sin t$ |
| Ellipse | $a\cos t$ | $b\sin t$ |
| Cycloid | $t - \sin t$ | $1 - \cos t$ |
| Bézier | $\sum B_i(t) P_{xi}$ | $\sum B_i(t) P_{yi}$ |

### Implicit differentiation

For equations where $y$ is not isolated (e.g., $x^2 + y^2 = 25$):

Differentiate both sides with respect to $x$, treating $y$ as a function of $x$:

$$2x + 2y\frac{dy}{dx} = 0 \implies \frac{dy}{dx} = -\frac{x}{y}$$

**Pen & paper:** At point $(3, 4)$ on the circle $x^2 + y^2 = 25$:

$\frac{dy}{dx} = -\frac{3}{4}$

The tangent line at $(3, 4)$: $y - 4 = -\frac{3}{4}(x - 3)$

### More implicit examples

**$xy + y^2 = 10$:**

$y + x\frac{dy}{dx} + 2y\frac{dy}{dx} = 0$

$\frac{dy}{dx}(x + 2y) = -y$

$\frac{dy}{dx} = \frac{-y}{x + 2y}$

**$e^{xy} = x + y$:**

$e^{xy}(y + x\frac{dy}{dx}) = 1 + \frac{dy}{dx}$

$\frac{dy}{dx}(xe^{xy} - 1) = 1 - ye^{xy}$

$\frac{dy}{dx} = \frac{1 - ye^{xy}}{xe^{xy} - 1}$

## Python Verification

```python
# ── Parametric & Implicit Differentiation ───────────────────
import math

# Parametric: x = t², y = t³
print("=== Parametric: x=t², y=t³ ===")
for t in [0.5, 1, 2, 3]:
    x = t**2
    y = t**3
    dydx = 3*t / 2
    print(f"  t={t}: ({x:.1f}, {y:.1f}), dy/dx = {dydx:.2f}")

# Verify numerically
t = 2.0
h = 1e-8
x1, y1 = (t+h)**2, (t+h)**3
x0, y0 = t**2, t**3
numerical_slope = (y1 - y0) / (x1 - x0)
print(f"  Numerical dy/dx at t=2: {numerical_slope:.4f} (analytical: {3*2/2:.4f})")

# Parametric circle
print(f"\n=== Parametric circle: r=5 ===")
r = 5
for deg in [0, 45, 90, 135, 180]:
    t = math.radians(deg)
    x = r * math.cos(t)
    y = r * math.sin(t)
    # dy/dx = -cos(t)/sin(t) (for non-zero sin)
    if abs(math.sin(t)) > 0.01:
        slope = -(math.cos(t) / math.sin(t))  # wait, dy/dx = (dy/dt)/(dx/dt) = (r*cos(t))/(-r*sin(t))
        slope = -math.cos(t) / math.sin(t)
        print(f"  θ={deg}°: ({x:.2f}, {y:.2f}), dy/dx = {slope:.3f}")
    else:
        print(f"  θ={deg}°: ({x:.2f}, {y:.2f}), dy/dx = undefined (vertical tangent)")

# Implicit: x² + y² = 25
print(f"\n=== Implicit: x²+y²=25 at (3,4) ===")
x, y = 3, 4
dydx = -x / y
print(f"  dy/dx = -{x}/{y} = {dydx:.4f}")

# Verify: tangent line
print(f"  Tangent: y - 4 = {dydx:.2f}(x - 3)")
# Check tangent is perpendicular to radius
radius_slope = y / x  # 4/3
print(f"  Radius slope: {radius_slope:.4f}")
print(f"  Product: {dydx * radius_slope:.4f} (should be -1)")

# Implicit: xy + y² = 10
print(f"\n=== Implicit: xy + y² = 10 ===")
# At (1, 2): 1*2 + 4 = 6 ≠ 10. Try (2, 2): 4+4=8. Try (1, ?): y+y²=10, y²+y-10=0
# y = (-1+√41)/2 ≈ 2.70
y_val = (-1 + math.sqrt(41)) / 2
x_val = 1
print(f"  Point: ({x_val}, {y_val:.3f})")
dydx_impl = -y_val / (x_val + 2*y_val)
print(f"  dy/dx = {dydx_impl:.4f}")

# Numerical check
h = 1e-7
# x = 1+h, solve for y: (1+h)y + y² = 10
# Approximate: y ≈ y_val + dy/dx * h
y_new = y_val + dydx_impl * h
check = (x_val+h)*y_new + y_new**2
print(f"  Check: xy+y² at shifted point = {check:.6f} (should be ≈10)")
```

## Connection to CS / Games / AI

- **Bézier curves** — defined parametrically; used in fonts, paths, animation (Tier 8-08)
- **Circular/elliptical motion** — orbiting cameras, planets, particle effects
- **Implicit surfaces** — $f(x,y,z) = 0$ defines 3D surfaces; ray marching evaluates them
- **Level sets** — contour lines of loss functions are implicit curves
- **Robotics** — joint trajectories are parametric paths

## Check Your Understanding

1. **Pen & paper:** For $x = 2\cos t, y = 3\sin t$, find $dy/dx$ and the tangent at $t = \pi/4$.
2. **Pen & paper:** Use implicit differentiation on $x^3 + y^3 = 6xy$ to find $dy/dx$.
3. **Pen & paper:** Find the equation of the tangent to the ellipse $\frac{x^2}{9} + \frac{y^2}{4} = 1$ at $(3/\sqrt{2}, \sqrt{2})$.
