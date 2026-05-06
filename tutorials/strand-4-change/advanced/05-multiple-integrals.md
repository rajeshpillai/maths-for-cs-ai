---
strand: change
level: advanced
order: 5
title: Multiple Integrals
prerequisites:
  - tier: strand-4-change-advanced
    slug: 04-lagrange-multipliers
    description: Lagrange multipliers
connections:
  - strand-4-change-advanced/06-change-of-variables
applications:
  - cs: "Probability over multivariable distributions, rendering integrals"
  - life: "Volumes, masses, probabilities over regions"
---

# Multiple Integrals

## Explain Like I Am 7

A single integral stacks skinny vertical *strips* under a curve
to get an area.  A **double integral** stacks tiny vertical
*toothpicks* under a wavy surface to get a volume — like measuring
how much sand you'd pour over a lumpy patch of garden to bury it.
A triple integral does it inside a 3D blob: chop the blob into
sugar-cube-tiny chunks, weigh each chunk, add them all up.  It's
just the rectangle-stacking idea, repeated for higher-dimensional
piles.

## Mental

A **double integral** $\iint_R f(x, y) \, dA$ generalises the area-
under-a-curve interpretation. For $f \ge 0$, it gives the **volume**
under the surface $z = f(x, y)$ over the region $R$.

When the region is a rectangle $R = [a, b] \times [c, d]$:

$$
\iint_R f \, dA = \int_c^d \int_a^b f(x, y) \, dx \, dy.
$$

**Fubini's theorem**: when $f$ is continuous (or integrable in a
nice sense), the iterated integrals in either order give the same
answer.

## Worked example

$\iint_R (x + y) dA$ over $R = [0, 2] \times [0, 3]$.

$\int_0^2 (x + y) dx = \left[\frac{x^2}{2} + xy\right]_0^2 = 2 + 2y$.

Then $\int_0^3 (2 + 2y) dy = [2y + y^2]_0^3 = 6 + 9 = 15$.

## Non-rectangular regions

$\iint_R f \, dA$ for $R$ bounded by curves: rewrite as iterated
integral with one variable's bounds depending on the other.

Example: triangle $T = \{(x, y) : 0 \le x \le 1, 0 \le y \le x\}$.

$$
\iint_T xy \, dA = \int_0^1 \int_0^x xy \, dy \, dx = \int_0^1 x \cdot \frac{x^2}{2} dx = \frac{1}{8}.
$$

## Triple integrals

$\iiint_E f \, dV$ over a region $E \subseteq \mathbb{R}^3$. Same
recipe, three nested integrals. Used for mass, centre of mass, moment
of inertia, probabilities of 3D random vectors.

For a unit cube $[0, 1]^3$:

$$
\iiint x y z \, dV = \frac{1}{2} \cdot \frac{1}{2} \cdot \frac{1}{2} = \frac{1}{8}.
$$

## Interactive

:::widget type=numeric-input prompt="$\\iint_R x \\, dA$ over $R = [0, 2] \\times [0, 3]$: $\\int_0^3 \\int_0^2 x \\, dx \\, dy = \\int_0^3 2 \\, dy = ?$" answer=6 explain="$6$.":::

:::widget type=numeric-input prompt="$\\iint_R xy \\, dA$ over $[0, 2] \\times [0, 3]$: $\\int_0^2 x \\, dx \\cdot \\int_0^3 y \\, dy = 2 \\cdot 4.5 = ?$" answer=9 explain="$9$.":::

:::widget type=numeric-input prompt="$\\iiint x \\, dV$ over $[0,1]^3$: $\\frac{1}{2} \\cdot 1 \\cdot 1 = ?$. Type 0.5." answer=0.5 explain="$0.5$.":::

:::widget type=numeric-input prompt="By Fubini, order of integration may be swapped (for nice $f$). Type 1 if true." answer=1 explain="Yes.":::

## Symbolic

**Volume of a region**: $V = \iiint_E 1 \, dV$.

**Mass with density $\rho$**: $M = \iiint_E \rho(\mathbf{x}) \, dV$.

**Centre of mass** (1D component): $\bar x = \frac{1}{M} \iiint_E x \rho \, dV$.

**Probability of $A$** for a continuous random vector $\mathbf{X}$
with density $f$: $P(\mathbf{X} \in A) = \int_A f(\mathbf{x}) \, d\mathbf{x}$.

The marginal of one coordinate is the integral over the others —
that's an integral *along* one axis with the others fixed.

## Computational

```python
import sympy as sp

x, y, z = sp.symbols("x y z")

# Rectangular double integral
print(sp.integrate(x + y, (x, 0, 2), (y, 0, 3)))    # 15

# Non-rectangular: triangle
print(sp.integrate(x * y, (y, 0, x), (x, 0, 1)))    # 1/8

# Triple integral over unit cube
print(sp.integrate(x * y * z, (x, 0, 1), (y, 0, 1), (z, 0, 1)))   # 1/8

# Volume of a sphere of radius R via triple integral (in spherical, deferred)
# Here, brute via cube enclosing sphere, then numerical
import numpy as np
R = 1
N = 200
xs = np.linspace(-R, R, N)
ys = np.linspace(-R, R, N)
zs = np.linspace(-R, R, N)
X, Y, Z = np.meshgrid(xs, ys, zs, indexing="ij")
inside = (X**2 + Y**2 + Z**2) <= R**2
volume = inside.sum() * (2*R/N)**3
print(volume, 4/3 * np.pi * R**3)    # ~4.19, exact 4.189...
```

## Applied

- **Centre of mass / inertia tensors** — physics and structural
  engineering.
- **Probability mass for multivariate distributions** — joint
  Gaussian probabilities, multivariate calibration.
- **3D rendering** — radiance equations integrate light over
  surface and angle (rendering integral).
- **Geophysics** — gravitational fields and anomalies are integrals
  over rock-density volumes.
- **Image processing** — convolution and correlation are integrals
  over the image plane.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\iint_R 1 \\, dA$ over $R$ = area of $R$. For $R = [0, 4] \\times [0, 5]$: $?$" answer=20 explain="$20$.":::

:::widget type=numeric-input prompt="Volume of unit sphere: $\\frac{4}{3}\\pi$. Round 4 dp: $?$." answer=4.1888 tolerance=0.005 explain="$\\approx 4.189$.":::

:::widget type=numeric-input prompt="Fubini permits swapping integration order for integrable functions. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\iint_T x \\, dA$ over triangle $\\{0 \\le x \\le 1, 0 \\le y \\le x\\}$: $\\int_0^1 x \\cdot x \\, dx = \\int_0^1 x^2 dx = ?$. Round 4 dp." answer=0.3333 tolerance=0.005 explain="$1/3$.":::
