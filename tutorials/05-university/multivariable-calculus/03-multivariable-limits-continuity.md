# Multivariable Limits and Continuity

## Intuition
In single-variable calculus, a limit asks: "what happens as we slide along the
number line toward a point?" In multiple dimensions, we can approach from
infinitely many directions — along the x-axis, the y-axis, a diagonal, a spiral,
a parabolic path. If different paths give different answers, the limit does not
exist. This is like a game world where the terrain height depends on which road
you take to reach a hilltop — if two roads arrive at different heights, the
surface has a discontinuity there.

## Prerequisites
- Tier 3, Lesson 1 — Limits (single-variable, epsilon-delta)
- Foundation 4, Lesson 8 — Functions of multiple variables

## From First Principles

### Definition of a Multivariable Limit

We say $\lim_{(x,y) \to (a,b)} f(x,y) = L$ if for every $\epsilon > 0$ there
exists $\delta > 0$ such that:

$$0 < \sqrt{(x-a)^2 + (y-b)^2} < \delta \implies |f(x,y) - L| < \epsilon$$

The key difference from 1D: we require the function to approach $L$ from **every
possible direction and path**, not just from left and right.

### Strategy: Showing a Limit Exists

If you suspect the limit is $L$:
1. Try substitution if the function is continuous
2. Convert to polar coordinates centred at $(a, b)$: let $x - a = r\cos\theta$,
   $y - b = r\sin\theta$. If the result depends only on $r$ (not $\theta$) and
   approaches $L$ as $r \to 0$, the limit is $L$.
3. Use the squeeze theorem

### Strategy: Showing a Limit Does NOT Exist

Find **two different paths** to $(a, b)$ that give different limiting values.

### Pen & Paper Example 1: Limit Exists

Evaluate $\lim_{(x,y) \to (0,0)} \frac{x^2 y}{x^2 + y^2}$.

**Step 1.** Switch to polar: $x = r\cos\theta$, $y = r\sin\theta$.

$$\frac{x^2 y}{x^2 + y^2} = \frac{r^2\cos^2\theta \cdot r\sin\theta}{r^2} = r\cos^2\theta\sin\theta$$

**Step 2.** As $r \to 0$:

$$|r\cos^2\theta\sin\theta| \leq r \cdot 1 \cdot 1 = r \to 0$$

**Step 3.** By the squeeze theorem, the limit is $0$ regardless of $\theta$.

$$\lim_{(x,y) \to (0,0)} \frac{x^2 y}{x^2 + y^2} = 0$$

### Pen & Paper Example 2: Limit Does NOT Exist

Evaluate $\lim_{(x,y) \to (0,0)} \frac{xy}{x^2 + y^2}$.

**Path 1.** Along $y = 0$ (the x-axis):

$$\frac{x \cdot 0}{x^2 + 0} = 0 \to 0$$

**Path 2.** Along $y = x$:

$$\frac{x \cdot x}{x^2 + x^2} = \frac{x^2}{2x^2} = \frac{1}{2}$$

Since Path 1 gives $0$ and Path 2 gives $1/2$, the limit **does not exist**.

**Verification with polar.** $\frac{r\cos\theta \cdot r\sin\theta}{r^2} = \cos\theta\sin\theta = \frac{\sin(2\theta)}{2}$. This depends on $\theta$, confirming the limit does not exist.

### Pen & Paper Example 3: Tricky Case

Evaluate $\lim_{(x,y) \to (0,0)} \frac{x^2 y}{x^4 + y^2}$.

**Along $y = 0$:** $0 / x^4 = 0$.

**Along $x = 0$:** $0 / y^2 = 0$.

**Along $y = mx$:** $\frac{x^2(mx)}{x^4 + m^2x^2} = \frac{mx^3}{x^2(x^2 + m^2)} = \frac{mx}{x^2 + m^2} \to 0$.

All straight lines give $0$! But try the **parabolic path** $y = x^2$:

$$\frac{x^2 \cdot x^2}{x^4 + x^4} = \frac{x^4}{2x^4} = \frac{1}{2}$$

The limit **does not exist**. This shows why checking only straight-line paths
is insufficient.

### Continuity

$f(x,y)$ is **continuous** at $(a,b)$ if:
1. $f(a,b)$ is defined
2. $\lim_{(x,y)\to(a,b)} f(x,y)$ exists
3. $\lim_{(x,y)\to(a,b)} f(x,y) = f(a,b)$

All polynomials and rational functions (where the denominator is nonzero) are
continuous on their domains.

### Visualisation
```python
import numpy as np
import matplotlib.pyplot as plt

# f(x,y) = xy / (x^2 + y^2) — limit DNE at origin
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Left: surface plot showing the problematic origin
x = np.linspace(-1, 1, 200)
y = np.linspace(-1, 1, 200)
X, Y = np.meshgrid(x, y)
R2 = X**2 + Y**2
Z = np.where(R2 > 1e-10, X * Y / R2, np.nan)

ax1 = axes[0]
c1 = ax1.contourf(X, Y, Z, levels=30, cmap='RdBu_r')
plt.colorbar(c1, ax=ax1)
ax1.set_title('f(x,y) = xy/(x²+y²)\nLimit DNE at origin')
ax1.set_xlabel('x')
ax1.set_ylabel('y')

# Draw approach paths
t = np.linspace(0.01, 0.8, 50)
ax1.plot(t, np.zeros_like(t), 'k-', linewidth=2, label='y=0 → 0')
ax1.plot(t, t, 'r-', linewidth=2, label='y=x → 1/2')
ax1.plot(t, -t, 'g-', linewidth=2, label='y=-x → -1/2')
ax1.legend(fontsize=8)

# Right: values along different angles
ax2 = axes[1]
thetas = np.linspace(0, 2*np.pi, 100)
values = np.cos(thetas) * np.sin(thetas)
ax2.plot(np.degrees(thetas), values, 'b-', linewidth=2)
ax2.set_xlabel('Approach angle θ (degrees)')
ax2.set_ylabel('Limiting value')
ax2.set_title('Value depends on direction θ\n(proves limit DNE)')
ax2.axhline(y=0, color='gray', linestyle='--', alpha=0.5)
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

## Python Verification
```python
import numpy as np

# === Example 1: limit EXISTS (equals 0) ===
def f1(x, y):
    r2 = x**2 + y**2
    if r2 == 0:
        return float('nan')
    return x**2 * y / r2

print("=== f(x,y) = x²y / (x² + y²), limit should be 0 ===")
for path_name, path_fn in [
    ("y=0",    lambda t: (t, 0)),
    ("x=0",    lambda t: (0, t)),
    ("y=x",    lambda t: (t, t)),
    ("y=x^2",  lambda t: (t, t**2)),
]:
    vals = [f1(*path_fn(10**(-k))) for k in range(1, 8)]
    print(f"  Along {path_name:6s}: {vals[-1]:.2e}")
print()

# === Example 2: limit DOES NOT EXIST ===
def f2(x, y):
    r2 = x**2 + y**2
    if r2 == 0:
        return float('nan')
    return x * y / r2

print("=== f(x,y) = xy / (x² + y²), limit DNE ===")
for path_name, path_fn in [
    ("y=0",    lambda t: (t, 0)),
    ("y=x",    lambda t: (t, t)),
    ("y=-x",   lambda t: (t, -t)),
    ("y=2x",   lambda t: (t, 2*t)),
]:
    vals = [f2(*path_fn(10**(-k))) for k in range(1, 8)]
    print(f"  Along {path_name:6s}: {vals[-1]:.6f}")
print()

# === Example 3: tricky — all lines give 0, but parabola gives 1/2 ===
def f3(x, y):
    denom = x**4 + y**2
    if denom == 0:
        return float('nan')
    return x**2 * y / denom

print("=== f(x,y) = x²y / (x⁴ + y²), tricky limit DNE ===")
for path_name, path_fn in [
    ("y=0",    lambda t: (t, 0)),
    ("y=x",    lambda t: (t, t)),
    ("y=3x",   lambda t: (t, 3*t)),
    ("y=x^2",  lambda t: (t, t**2)),
]:
    vals = [f3(*path_fn(10**(-k))) for k in range(1, 8)]
    print(f"  Along {path_name:6s}: {vals[-1]:.6f}")
```

## Connection to CS / Games / AI / Business / Industry
- **Texture sampling**: when a texture lookup hits a seam or singularity, the
  renderer must handle discontinuities — this is a limit problem in 2D
- **Loss surfaces in ML**: the loss function $L(\theta_1, \theta_2, \ldots)$ must
  be continuous for gradient descent to work; discontinuities cause training
  instability
- **Mesh degeneration**: degenerate triangles (zero area) create singularities in
  surface normals — a limit that depends on approach direction
- **Numerical stability**: division-by-zero guards in shaders and ML code are
  essentially checking whether a limit exists

## Check Your Understanding
1. Determine whether $\lim_{(x,y) \to (0,0)} \frac{x^2 - y^2}{x^2 + y^2}$ exists.
   (Hint: try $y = 0$ and $x = 0$.)
2. Use polar coordinates to show $\lim_{(x,y)\to(0,0)} \frac{x^3}{x^2 + y^2} = 0$.
3. Find a function $f(x,y)$ that equals $0$ along every straight line through the
   origin but equals $1$ along the path $y = x^3$. (Hint: adapt Example 3.)
