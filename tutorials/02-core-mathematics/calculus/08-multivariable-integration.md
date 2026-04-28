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

## Visualisation — Volumes by stacking thin slabs

A double integral is just *adding up the volume under a 2-D surface*,
slab by slab. Switching coordinates (here: rectangular → polar) is the
single most-useful trick in multivariable integration; the picture
shows why polar coordinates *fit a disk like a glove*.

```python
# ── Visualising multivariable integration ───────────────────
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D  # noqa: F401

fig = plt.figure(figsize=(15, 5.2))

# (1) The surface z = f(x, y) and the volume below it (over a square
# region [0, 1]²). The integral is the volume of that solid.
ax = fig.add_subplot(1, 3, 1, projection="3d")
xs = np.linspace(0, 1, 40); ys = np.linspace(0, 1, 40)
X, Y = np.meshgrid(xs, ys)
Z = X * Y * (1 - X) * (1 - Y) * 4               # smooth bump that vanishes at edges
ax.plot_surface(X, Y, Z, cmap="viridis", alpha=0.85, edgecolor="none")
ax.contourf(X, Y, Z, zdir="z", offset=0, cmap="viridis", alpha=0.4)
ax.set_xlabel("x"); ax.set_ylabel("y"); ax.set_zlabel("f(x, y)")
ax.set_title("∬ f(x,y) dA = volume under the surface\nover the (x, y) region")

# (2) Riemann slabs: split [0, 1]² into a small grid of cells, each
# a thin column of height f(x_c, y_c). Total volume = sum of column
# volumes. Shown for a coarse 6×6 grid so you can see what's happening.
ax = fig.add_subplot(1, 3, 2, projection="3d")
n = 6
xs_c = np.linspace(0, 1, n + 1)[:-1] + 0.5 / n
ys_c = np.linspace(0, 1, n + 1)[:-1] + 0.5 / n
Xc, Yc = np.meshgrid(xs_c, ys_c)
Zc = Xc * Yc * (1 - Xc) * (1 - Yc) * 4
dx = dy = 1.0 / n
ax.bar3d(Xc.flatten() - dx / 2, Yc.flatten() - dy / 2,
         np.zeros_like(Zc).flatten(),
         dx, dy, Zc.flatten(),
         color="tab:orange", alpha=0.7, edgecolor="darkorange")
ax.set_xlabel("x"); ax.set_ylabel("y"); ax.set_zlabel("f")
riemann_2d = (Zc * dx * dy).sum()
ax.set_title(f"Riemann columns (n = {n}×{n})\nVolume ≈ Σ f · dxdy = {riemann_2d:.4f}")

# (3) Polar grid over a disk of radius R. Each cell has area
# r·Δr·Δθ — the famous "extra r" you must remember in polar.
# Cell areas are visibly LARGER far from the origin and smaller near
# it: that's exactly the Jacobian.
ax = fig.add_subplot(1, 3, 3)
R = 1.0
n_r, n_t = 6, 18
rs = np.linspace(0, R, n_r + 1)
ts = np.linspace(0, 2 * np.pi, n_t + 1)
for r in rs:
    angles = np.linspace(0, 2 * np.pi, 200)
    ax.plot(r * np.cos(angles), r * np.sin(angles), color="grey", lw=0.7)
for t in ts:
    ax.plot([0, R * np.cos(t)], [0, R * np.sin(t)], color="grey", lw=0.7)
# Highlight a sample cell to show the area formula r·Δr·Δθ.
i, j = 4, 3
r0, r1 = rs[i], rs[i + 1]
t0, t1 = ts[j], ts[j + 1]
phi = np.linspace(t0, t1, 30)
ax.fill_between(np.concatenate([r1 * np.cos(phi), r0 * np.cos(phi[::-1])]),
                np.concatenate([r1 * np.sin(phi), r0 * np.sin(phi[::-1])]),
                color="tab:red", alpha=0.5)
ax.text(0.05, -0.95, "polar element\n   dA = r · dr · dθ", color="tab:red", fontsize=10)
ax.set_aspect("equal"); ax.set_xlim(-1.2, 1.2); ax.set_ylim(-1.2, 1.2)
ax.set_title("Polar grid over a disk:\ncell area is r · Δr · Δθ (Jacobian!)")
ax.axhline(0, color="black", lw=0.5); ax.axvline(0, color="black", lw=0.5)

plt.tight_layout()
plt.show()

# Numerical confirmation with a finer grid.
n_fine = 200
xs_f = np.linspace(0, 1, n_fine)
ys_f = np.linspace(0, 1, n_fine)
Xf, Yf = np.meshgrid(xs_f, ys_f)
Zf = Xf * Yf * (1 - Xf) * (1 - Yf) * 4
volume_fine = Zf.mean()                         # mean × area = total volume (area = 1)
print(f"Coarse Riemann volume (6×6):  {riemann_2d:.6f}")
print(f"Fine Riemann volume (200×200): {volume_fine:.6f}")
print(f"\nArea of disk of radius {R} via polar:")
n = 100
dr, dtheta = R / n, 2 * np.pi / n
total = 0.0
for i in range(n):
    r = (i + 0.5) * dr
    for j in range(n):
        total += r * dr * dtheta
print(f"  Numerical: {total:.4f}")
print(f"  Exact π·R²: {np.pi * R**2:.4f}")
```

**Two intuitions that make multivariable calculus easy:**

- **A double integral is volume.** Stack thin columns of cross-section
  $\Delta x \,\Delta y$ and height $f(x, y)$, and add them up. The
  middle picture is what your CPU actually does when you call
  `scipy.integrate.dblquad`.
- **Coordinate change = paying the Jacobian.** The right picture shows
  that polar cells aren't square — they're little wedges whose area is
  $r \,\Delta r \,\Delta\theta$. The factor $r$ is the *Jacobian
  determinant* of the rectangular-to-polar map. Forget it and your
  disk integral will be wrong by an order of magnitude. Every change
  of variables in higher dimensions carries a Jacobian factor; in
  graphics this is what makes UV-mapped textures stretch correctly,
  and in ML it is the heart of normalising-flow generative models.

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
