# Double Integrals

## Intuition
A single integral adds up infinitely thin slices to get an area. A double
integral adds up infinitely small patches to get a **volume** under a surface —
or more generally, to accumulate any quantity over a 2D region. In games, double
integrals compute the total mass of a non-uniform terrain slab, the average
brightness across a texture, or the moment of inertia of a 2D shape. In ML,
double integrals appear in joint probability distributions where you need to
integrate over two variables.

## Prerequisites
- Tier 3, Lesson 6 — Single-variable integration (Riemann sums, definite integrals)

## From First Principles

### From Riemann Sums to Double Integrals

Partition a rectangular region $R = [a,b] \times [c,d]$ into small rectangles
of area $\Delta A = \Delta x \cdot \Delta y$. Pick a sample point in each.

$$\iint_R f(x, y)\, dA = \lim_{\Delta x, \Delta y \to 0} \sum_{i} \sum_{j} f(x_i^*, y_j^*)\, \Delta x\, \Delta y$$

This is the **volume** between the surface $z = f(x,y)$ and the $xy$-plane
(when $f \geq 0$).

### Iterated Integrals (Fubini's Theorem)

**Fubini's Theorem.** If $f$ is continuous on $R = [a,b] \times [c,d]$, then:

$$\iint_R f(x,y)\, dA = \int_a^b \left(\int_c^d f(x,y)\, dy\right) dx = \int_c^d \left(\int_a^b f(x,y)\, dx\right) dy$$

The order of integration does not matter on rectangles (for continuous functions).

**How to compute.** Treat the inner integral as a single-variable integral (the
other variable is a constant), then integrate the result over the outer variable.

### Pen & Paper Example 1: Rectangle

Evaluate $\iint_R (x + 2y)\, dA$ where $R = [0, 2] \times [0, 1]$.

**Step 1.** Set up as an iterated integral (integrate $y$ first):

$$\int_0^2 \left(\int_0^1 (x + 2y)\, dy \right) dx$$

**Step 2.** Inner integral (treat $x$ as constant):

$$\int_0^1 (x + 2y)\, dy = \left[xy + y^2\right]_0^1 = x(1) + 1^2 - 0 = x + 1$$

**Step 3.** Outer integral:

$$\int_0^2 (x + 1)\, dx = \left[\frac{x^2}{2} + x\right]_0^2 = \frac{4}{2} + 2 = 4$$

**Verification (other order):**

$$\int_0^1 \left(\int_0^2 (x + 2y)\, dx\right) dy = \int_0^1 \left[\frac{x^2}{2} + 2xy\right]_0^2 dy$$

$$= \int_0^1 (2 + 4y)\, dy = \left[2y + 2y^2\right]_0^1 = 2 + 2 = 4 \checkmark$$

### Non-Rectangular Regions

For a region $D$ where $y$ ranges from $g_1(x)$ to $g_2(x)$ as $x$ goes from
$a$ to $b$:

$$\iint_D f(x,y)\, dA = \int_a^b \int_{g_1(x)}^{g_2(x)} f(x,y)\, dy\, dx$$

### Pen & Paper Example 2: Triangular Region

Evaluate $\iint_D xy\, dA$ where $D$ is the triangle with vertices $(0,0)$,
$(1,0)$, $(1,1)$.

**Step 1.** Describe the region. For $x$ from $0$ to $1$, $y$ ranges from $0$
to $x$ (the line $y = x$).

$$\int_0^1 \int_0^x xy\, dy\, dx$$

**Step 2.** Inner integral:

$$\int_0^x xy\, dy = x \left[\frac{y^2}{2}\right]_0^x = x \cdot \frac{x^2}{2} = \frac{x^3}{2}$$

**Step 3.** Outer integral:

$$\int_0^1 \frac{x^3}{2}\, dx = \frac{1}{2} \cdot \frac{x^4}{4}\bigg|_0^1 = \frac{1}{8}$$

### Reversing the Order of Integration

Sometimes one order is much easier than the other. To reverse:
1. Sketch the region
2. Describe the bounds with the other variable as the outer integral

**Example.** Reverse $\int_0^1 \int_x^1 e^{y^2}\, dy\, dx$.

The region is: $0 \leq x \leq 1$ and $x \leq y \leq 1$. Sketch it:
a triangle with vertices $(0,0)$, $(0,1)$, $(1,1)$.

Reversed: for $y$ from $0$ to $1$, $x$ ranges from $0$ to $y$:

$$\int_0^1 \int_0^y e^{y^2}\, dx\, dy = \int_0^1 y e^{y^2}\, dy = \frac{1}{2}\left[e^{y^2}\right]_0^1 = \frac{e - 1}{2}$$

The original order was impossible analytically ($e^{y^2}$ has no elementary
antiderivative in $y$), but reversing made it trivial.

### Visualisation
```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

fig, axes = plt.subplots(1, 2, figsize=(13, 5))

# Left: region of integration for the triangular example
ax1 = axes[0]
# Triangle vertices
triangle = plt.Polygon([(0,0), (1,0), (1,1)], fill=True,
                       facecolor='lightblue', edgecolor='black', linewidth=2)
ax1.add_patch(triangle)

# Show horizontal slices (dy integration)
for xi in np.arange(0.1, 1.0, 0.15):
    ax1.plot([xi, xi], [0, xi], 'r-', linewidth=1, alpha=0.6)
    ax1.annotate('', xy=(xi, xi), xytext=(xi, 0),
                arrowprops=dict(arrowstyle='->', color='red', lw=0.8))

ax1.set_xlim(-0.2, 1.4)
ax1.set_ylim(-0.2, 1.2)
ax1.set_xlabel('x')
ax1.set_ylabel('y')
ax1.set_title('Region D: triangle\ny goes from 0 to x')
ax1.set_aspect('equal')
ax1.grid(True, alpha=0.3)
ax1.text(0.4, 0.15, 'y = 0', fontsize=10)
ax1.text(0.7, 0.85, 'y = x', fontsize=10, rotation=45)

# Right: 3D volume visualization for f(x,y) = x + 2y over [0,2]x[0,1]
ax2 = fig.add_subplot(122, projection='3d')
x = np.linspace(0, 2, 30)
y = np.linspace(0, 1, 30)
X, Y = np.meshgrid(x, y)
Z = X + 2*Y

ax2.plot_surface(X, Y, Z, cmap='coolwarm', alpha=0.7, edgecolor='gray',
                linewidth=0.3)
ax2.plot_surface(X, Y, np.zeros_like(Z), color='lightgray', alpha=0.3)

# Show a few vertical slices (fix x, integrate over y)
for xi in [0.5, 1.0, 1.5]:
    yy = np.linspace(0, 1, 20)
    zz = xi + 2*yy
    ax2.plot(np.full_like(yy, xi), yy, zz, 'r-', linewidth=2)
    ax2.plot(np.full_like(yy, xi), yy, np.zeros_like(yy), 'r--', linewidth=1)

ax2.set_xlabel('x')
ax2.set_ylabel('y')
ax2.set_zlabel('z')
ax2.set_title('Volume under z = x + 2y\nover [0,2]×[0,1] = 4')

plt.tight_layout()
plt.show()
```

## Python Verification
```python
import numpy as np
from scipy import integrate

# === Example 1: integral of (x + 2y) over [0,2] x [0,1] ===
def f1(y, x):  # scipy expects inner variable first
    return x + 2*y

result1, error1 = integrate.dblquad(f1, 0, 2, 0, 1)
print("=== Double integral of (x + 2y) over [0,2]x[0,1] ===")
print(f"Numerical: {result1:.6f}")
print(f"Exact:     4")

# === Example 2: integral of xy over triangle ===
def f2(y, x):
    return x * y

result2, error2 = integrate.dblquad(f2, 0, 1, lambda x: 0, lambda x: x)
print(f"\n=== Double integral of xy over triangle ===")
print(f"Numerical: {result2:.6f}")
print(f"Exact:     {1/8} = 0.125")

# === Example 3: reversed order (e^(y^2)) ===
def f3(x, y):
    return np.exp(y**2)

result3, error3 = integrate.dblquad(f3, 0, 1, lambda y: 0, lambda y: y)
print(f"\n=== Reversed integral of e^(y^2) ===")
print(f"Numerical: {result3:.6f}")
print(f"Exact:     (e-1)/2 = {(np.e - 1)/2:.6f}")

# Step-by-step: Example 1 as iterated integrals
print("\n=== Step-by-step iterated integral (Example 1) ===")
# Inner: int_0^1 (x + 2y) dy = x + 1
# Outer: int_0^2 (x + 1) dx = 4
inner_at_x1 = integrate.quad(lambda y: 1.0 + 2*y, 0, 1)[0]
print(f"Inner integral at x=1: {inner_at_x1:.4f} (should be x+1 = 2)")

outer = integrate.quad(lambda x: x + 1, 0, 2)[0]
print(f"Outer integral: {outer:.4f} (should be 4)")
```

## Connection to CS / Games / AI
- **Joint probability**: for continuous random variables $(X, Y)$,
  $P(a \leq X \leq b, c \leq Y \leq d) = \int_a^b \int_c^d f_{XY}(x,y)\,dy\,dx$
- **Image processing**: operations like blur or convolution sum (integrate) a
  kernel over a 2D region of pixels
- **Mass and centre of mass**: computing the total mass of a 2D plate with
  variable density $\rho(x,y)$ requires $\iint \rho\, dA$
- **Expected value**: $E[g(X,Y)] = \iint g(x,y) f_{XY}(x,y)\, dA$ appears
  throughout Bayesian ML
- **Rendering**: computing the irradiance at a surface point integrates incoming
  light over a hemisphere — a double integral in spherical coordinates

## Check Your Understanding
1. Evaluate $\iint_R x^2 y\, dA$ where $R = [0, 3] \times [1, 2]$.
2. Set up and evaluate $\iint_D (x + y)\, dA$ where $D$ is bounded by $y = x^2$
   and $y = x$.
3. Reverse the order of integration in $\int_0^4 \int_{\sqrt{x}}^{2} f(x,y)\, dy\, dx$
   and sketch the region.
