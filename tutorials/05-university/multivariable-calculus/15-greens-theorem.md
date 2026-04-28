# Green's Theorem

## Intuition
Green's theorem connects a line integral around a closed curve to a double
integral over the region it encloses. It says: "the total circulation of a
vector field around the boundary equals the total curl accumulated inside."
This is like saying the total swirl of water around the edge of a pond equals
the sum of all the tiny whirlpools inside it. In ML, Green's theorem underlies
the idea that local properties (curl) determine global behaviour (circulation),
mirroring how local gradients determine global optimisation landscapes.

## Prerequisites
- Tier 12, Lesson 14 — Line integrals (work integrals, path dependence)
- Tier 12, Lesson 9 — Double integrals (iterated integrals over general regions)

## From First Principles

### Statement of Green's Theorem

Let $C$ be a positively oriented (counterclockwise), piecewise-smooth, simple
closed curve bounding a region $D$. If $P$ and $Q$ have continuous partial
derivatives on an open region containing $D$, then:

$$\oint_C P\, dx + Q\, dy = \iint_D \left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right) dA$$

**Left side:** circulation of $\mathbf{F} = (P, Q)$ around the boundary.
**Right side:** total "2D curl" inside the region.

### Proof Sketch (for a Rectangle)

Let $D = [a,b] \times [c,d]$. We prove each component separately.

**Claim:** $\oint_C P\, dx = -\iint_D \frac{\partial P}{\partial y}\, dA$.

Compute the right side:

$$-\iint_D \frac{\partial P}{\partial y}\, dA = -\int_a^b \int_c^d \frac{\partial P}{\partial y}\, dy\, dx = -\int_a^b \left[P(x,d) - P(x,c)\right] dx$$

$$= \int_a^b P(x,c)\, dx - \int_a^b P(x,d)\, dx$$

Now compute $\oint_C P\, dx$ around the rectangle (counterclockwise):
- Bottom ($y = c$, left to right): $\int_a^b P(x,c)\, dx$
- Right ($x = b$, $dx = 0$): $0$
- Top ($y = d$, right to left): $-\int_a^b P(x,d)\, dx$
- Left ($x = a$, $dx = 0$): $0$

Total: $\int_a^b P(x,c)\, dx - \int_a^b P(x,d)\, dx$. Same as the double integral. $\checkmark$

The $Q$ part is proved similarly. Together they give Green's theorem.

### Pen & Paper Example 1: Verify Green's Theorem

Verify Green's theorem for $\mathbf{F} = (xy, x^2)$ around the unit square
$[0,1] \times [0,1]$.

**Line integral (counterclockwise around square):**

Bottom ($y=0$, $x$: $0 \to 1$): $\int_0^1 (x \cdot 0)\, dx + \int_0^1 0 = 0$. Wait —
we need to parametrise each edge.

- Bottom: $\mathbf{r}(t) = (t, 0)$, $t \in [0,1]$. $P\,dx + Q\,dy = 0 \cdot 1 + t^2 \cdot 0 = 0$.
  Integral: $0$.
- Right: $\mathbf{r}(t) = (1, t)$. $P\,dx + Q\,dy = t \cdot 0 + 1 \cdot 1 = 1$.
  Integral: $\int_0^1 1\, dt = 1$.
- Top: $\mathbf{r}(t) = (1-t, 1)$. $P\,dx + Q\,dy = (1-t)(-1) + (1-t)^2(0) = -(1-t)$.
  Integral: $\int_0^1 -(1-t)\, dt = -\frac{1}{2}$.
- Left: $\mathbf{r}(t) = (0, 1-t)$. $P\,dx + Q\,dy = 0 + 0 = 0$.
  Integral: $0$.

**Total line integral:** $0 + 1 - \frac{1}{2} + 0 = \frac{1}{2}$.

**Double integral:**

$$\iint_D \left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right) dA = \iint_D (2x - x)\, dA = \int_0^1 \int_0^1 x\, dy\, dx = \int_0^1 x\, dx = \frac{1}{2}$$

Both sides equal $\frac{1}{2}$. $\checkmark$

### Application: Computing Area

Setting $P = 0, Q = x$ gives $\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} = 1$, so:

$$\text{Area}(D) = \oint_C x\, dy$$

Similarly, $P = -y, Q = 0$ gives Area $= -\oint_C y\, dx$.

The symmetric version:

$$\text{Area}(D) = \frac{1}{2}\oint_C (x\, dy - y\, dx)$$

### Pen & Paper Example 2: Area of an Ellipse

Compute the area of the ellipse $x = a\cos t$, $y = b\sin t$, $t \in [0, 2\pi]$.

$$\text{Area} = \frac{1}{2}\oint_C (x\, dy - y\, dx)$$

$dx = -a\sin t\, dt$, $dy = b\cos t\, dt$.

$$= \frac{1}{2}\int_0^{2\pi} \left[a\cos t \cdot b\cos t - b\sin t \cdot (-a\sin t)\right] dt$$

$$= \frac{ab}{2}\int_0^{2\pi} (\cos^2 t + \sin^2 t)\, dt = \frac{ab}{2} \cdot 2\pi = \pi ab$$

### Visualisation
```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(14, 6))

# Left: Green's theorem on unit square
ax1 = axes[0]
# Region D
square = plt.Polygon([(0,0),(1,0),(1,1),(0,1)], fill=True,
                      facecolor='lightyellow', edgecolor='black', linewidth=2)
ax1.add_patch(square)

# Arrows showing counterclockwise orientation
arrows = [((0.5,0),(0.15,0)), ((1,0.5),(0,0.15)),
          ((0.5,1),(-0.15,0)), ((0,0.5),(0,-0.15))]
for pos, d in arrows:
    ax1.annotate('', xy=(pos[0]+d[0], pos[1]+d[1]), xytext=pos,
                arrowprops=dict(arrowstyle='->', color='red', lw=2))

# Show curl field inside (∂Q/∂x - ∂P/∂y = x)
xg = np.linspace(0.1, 0.9, 5)
yg = np.linspace(0.1, 0.9, 5)
for xi in xg:
    for yi in yg:
        circle = plt.Circle((xi, yi), xi*0.04, fill=False, color='blue', linewidth=1)
        ax1.add_patch(circle)

ax1.set_xlim(-0.3, 1.5)
ax1.set_ylim(-0.3, 1.3)
ax1.set_xlabel('x'); ax1.set_ylabel('y')
ax1.set_title("Green's Theorem on unit square\n∮ F·dr = ∬ (∂Q/∂x - ∂P/∂y) dA = 1/2")
ax1.set_aspect('equal')
ax1.grid(True, alpha=0.3)
ax1.text(0.3, 0.5, 'curl = x', fontsize=12, color='blue')

# Right: Area of ellipse via Green's theorem
ax2 = axes[1]
a_ell, b_ell = 3, 2
t = np.linspace(0, 2*np.pi, 200)
x_ell = a_ell * np.cos(t)
y_ell = b_ell * np.sin(t)
ax2.fill(x_ell, y_ell, alpha=0.3, color='lightgreen')
ax2.plot(x_ell, y_ell, 'g-', linewidth=2)

# Show direction arrows
for ti in [0, np.pi/2, np.pi, 3*np.pi/2]:
    xi = a_ell * np.cos(ti)
    yi = b_ell * np.sin(ti)
    dxi = -a_ell * np.sin(ti) * 0.15
    dyi = b_ell * np.cos(ti) * 0.15
    ax2.annotate('', xy=(xi+dxi, yi+dyi), xytext=(xi, yi),
                arrowprops=dict(arrowstyle='->', color='red', lw=2))

ax2.set_xlabel('x'); ax2.set_ylabel('y')
ax2.set_title(f'Area of ellipse via Green\'s theorem\nArea = πab = π·{a_ell}·{b_ell} = {np.pi*a_ell*b_ell:.4f}')
ax2.set_aspect('equal')
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

## Python Verification
```python
import numpy as np
from scipy import integrate

# === Example 1: Verify Green's theorem on unit square ===
# Line integral of F = (xy, x^2) around unit square
# Bottom
I_bot = integrate.quad(lambda t: 0*1 + t**2*0, 0, 1)[0]  # P*dx + Q*dy
# Right
I_right = integrate.quad(lambda t: t*0 + 1**2*1, 0, 1)[0]
# Top (parametrised right-to-left)
I_top = integrate.quad(lambda t: (1-t)*(-1) + (1-t)**2*0, 0, 1)[0]
# Left
I_left = integrate.quad(lambda t: 0 + 0, 0, 1)[0]

line_total = I_bot + I_right + I_top + I_left
print("=== Green's Theorem: F = (xy, x^2) on unit square ===")
print(f"Line integral: {line_total:.6f}")

# Double integral of (dQ/dx - dP/dy) = (2x - x) = x
double_int = integrate.dblquad(lambda y, x: x, 0, 1, 0, 1)[0]
print(f"Double integral of curl: {double_int:.6f}")
print(f"Equal: {abs(line_total - double_int) < 1e-10}")

# === Example 2: Area of ellipse ===
a, b = 3, 2
def area_integrand(t):
    x = a * np.cos(t)
    y = b * np.sin(t)
    dx = -a * np.sin(t)
    dy = b * np.cos(t)
    return 0.5 * (x*dy - y*dx)

area, _ = integrate.quad(area_integrand, 0, 2*np.pi)
print(f"\n=== Area of ellipse (a={a}, b={b}) via Green's ===")
print(f"Numerical: {area:.6f}")
print(f"Exact: πab = {np.pi*a*b:.6f}")

# === Application: simplify a hard line integral ===
# ∮_C (e^x + y^2) dx + (sin(y) + 2xy) dy around unit circle
# dQ/dx - dP/dy = 2y - 2y = 0, so the integral is 0!
print(f"\n=== Simplification via Green's ===")
print(f"∮ (e^x+y²)dx + (sin(y)+2xy)dy around unit circle")
print(f"curl = ∂(sin(y)+2xy)/∂x - ∂(e^x+y²)/∂y = 2y - 2y = 0")
print(f"By Green's theorem, the line integral = 0")
```

## Connection to CS / Games / AI / Business / Industry
- **Area computation**: the shoelace formula for polygon area is a discrete
  version of Green's theorem ($\text{Area} = \frac{1}{2}|\sum(x_i y_{i+1} - x_{i+1} y_i)|$)
- **Fluid simulation**: circulation around a boundary (computed via Green's) tells
  you the total vorticity inside — used in vortex methods for 2D fluid sim
- **Mesh processing**: computing areas and integrals over mesh faces in
  geometry processing uses discrete Green's theorem
- **Stokes' theorem preview**: Green's theorem is the 2D special case of Stokes'
  theorem, which generalises to surfaces in 3D (lesson 18)
- **Finite element methods**: Green's theorem converts volume integrals to
  boundary integrals, reducing computational cost in PDE solvers
- **Planimeter and digitiser tablets**: Wacom/Tamaya planimeters compute the
  area of irregular regions (used in surveying, cartography, medical imaging
  to measure tumour cross-sections in DICOM viewers like OsiriX) by mechanically
  applying $\frac{1}{2}\oint(x\,dy - y\,dx)$
- **GIS parcel area at ESRI ArcGIS and QGIS**: county tax assessors and FEMA
  flood-zone mapping compute polygon acreage from boundary coordinates via
  the shoelace formula — the discrete Green's theorem
- **Aerodynamic lift via Kutta-Joukowski**: Boeing and Airbus aerodynamicists
  compute total lift per unit span as $L = \rho V_\infty \Gamma$ where the
  circulation $\Gamma = \oint \mathbf{v} \cdot d\mathbf{r}$ around an airfoil
  is converted via Green's theorem to vorticity area-integrals
- **Watershed and basin hydrology**: USGS StreamStats and the UK Environment
  Agency compute basin discharge as boundary line integrals of stream-flux
  and equate to area integrals of net runoff over the catchment

## Check Your Understanding
1. Use Green's theorem to evaluate $\oint_C (3y)\,dx + (2x)\,dy$ where $C$
   is the circle $x^2 + y^2 = 4$ (counterclockwise).
2. Compute the area enclosed by the astroid $x = \cos^3 t$, $y = \sin^3 t$
   using the line integral formula.
3. Explain why $\oint_C \nabla\phi \cdot d\mathbf{r} = 0$ for any closed curve
   $C$, using Green's theorem.
