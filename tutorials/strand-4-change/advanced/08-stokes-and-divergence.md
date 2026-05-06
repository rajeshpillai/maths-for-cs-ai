---
strand: change
level: advanced
order: 8
title: Green, Stokes, and Divergence Theorems
prerequisites:
  - tier: strand-4-change-advanced
    slug: 07-vector-fields-and-line-integrals
    description: Vector fields and line integrals
connections:
  - strand-4-change-advanced/09-change-capstone-2
applications:
  - cs: "Maxwell's equations, fluid dynamics, finite-element solvers"
  - life: "Boundary integrals encode interior information"
---

# Green, Stokes, and Divergence Theorems

## Explain Like I Am 7

Picture water swirling in a bathtub.  If you walk around the *edge*
of a region in the water and add up how much the current is
pushing you along, you get the *same* answer as walking around
the *inside* of the region and adding up how much the water is
spinning at every point.  Three big theorems — Green, Stokes, and
Divergence — all say the same big idea: *what happens on a
boundary is the sum of what happens inside*.  It's the
multivariable version of "slope-finder undoes area-finder."

## Mental

The "fundamental theorem of calculus" in higher dimensions has three
faces, each saying **a boundary integral equals an interior integral**.

| Theorem | Setting | Statement |
|---|---|---|
| Green | 2D | $\oint_{\partial R} (P \, dx + Q \, dy) = \iint_R \left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right) dA$ |
| Stokes | 3D surface $S$ with boundary $\partial S$ | $\oint_{\partial S} \mathbf{F} \cdot d\mathbf{r} = \iint_S (\nabla \times \mathbf{F}) \cdot d\mathbf{S}$ |
| Divergence (Gauss) | 3D solid $E$ with boundary $\partial E$ | $\iint_{\partial E} \mathbf{F} \cdot d\mathbf{S} = \iiint_E \nabla \cdot \mathbf{F} \, dV$ |

All three are special cases of the **generalised Stokes theorem**
$\int_{\partial M} \omega = \int_M d\omega$ for differential forms.

## Green in action

Compute $\oint_C y \, dx - x \, dy$ where $C$ is the unit circle
counterclockwise.

By Green: $\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} = -1 - 1 = -2$.

$\oint_C = \iint_{\text{disk}} (-2) dA = -2\pi$.

Direct integration would parameterize: $C: x = \cos t, y = \sin t$.
$dx = -\sin t \, dt, \, dy = \cos t \, dt$. Integrand $= \sin t (-\sin t) - \cos t (\cos t) = -1$.
Integral $= -2\pi$. ✓

## Divergence theorem in action

Compute $\iint_S \mathbf{F} \cdot d\mathbf{S}$ where
$\mathbf{F} = (x, y, z)$ and $S$ is the unit sphere outward-oriented.

By divergence theorem: $\nabla \cdot \mathbf{F} = 1 + 1 + 1 = 3$.

$\iiint_{\text{ball}} 3 \, dV = 3 \cdot \frac{4\pi}{3} = 4\pi$.

(The direct surface integral is much harder.)

## Why these are useful

All three convert hard integrals into easier ones (or vice versa).
Practical utility: **interior information about $\mathbf{F}$ is
sometimes much easier to capture than boundary behaviour, or the
other way around** — and these theorems let you switch.

In physics:

- **Maxwell's equations** are *exactly* the divergence theorem and
  Stokes' theorem applied to electric and magnetic fields.
- **Heat / wave equations** in PDEs are derived from divergence
  theorem + conservation laws.

## Interactive

:::widget type=numeric-input prompt="Green's theorem connects boundary line integral to surface integral over enclosed area. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Divergence of $(x, y, z)$: $1 + 1 + 1 = ?$" answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="Flux of $(x, y, z)$ through unit sphere = $\\iiint 3 \\, dV = 3 \\cdot \\frac{4\\pi}{3} = 4\\pi \\approx ?$. Round 4 dp." answer=12.5664 tolerance=0.005 explain="$4\\pi \\approx 12.5664$.":::

:::widget type=numeric-input prompt="Stokes generalises Green to 3D surfaces. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Generalised Stokes' theorem** (with differential forms):

$$
\int_{\partial M} \omega = \int_M d\omega.
$$

Special cases:

- $0 \to 1$: fundamental theorem of calculus (FTC).
- $1 \to 2$ in $\mathbb{R}^2$: Green.
- $1 \to 2$ in $\mathbb{R}^3$ on a surface: Stokes (curl).
- $2 \to 3$ in $\mathbb{R}^3$: divergence theorem.

**Conservation laws**: divergence theorem + a continuity equation
$\partial_t \rho + \nabla \cdot \mathbf{j} = 0$ gives integral
conservation: total mass / charge / probability inside a region
changes only through flux across the boundary.

## Computational

```python
import sympy as sp

x, y, z = sp.symbols("x y z")

# Verify divergence example for F = (x, y, z) over unit ball
F = sp.Matrix([x, y, z])
div_F = sp.diff(F[0], x) + sp.diff(F[1], y) + sp.diff(F[2], z)
print(div_F)                                          # 3

rho, phi, theta = sp.symbols("rho phi theta", positive=True)
print(sp.integrate(3 * rho**2 * sp.sin(phi),
                   (rho, 0, 1), (phi, 0, sp.pi), (theta, 0, 2*sp.pi)))   # 4π

# Green's theorem example
P = y
Q = -x
dQ_dx = sp.diff(Q, x)
dP_dy = sp.diff(P, y)
print(dQ_dx - dP_dy)                                   # -2
# Disk area = π
print(-2 * sp.pi)                                      # -2π — matches direct line integral
```

## Applied

- **Maxwell's equations** — Gauss's law (divergence theorem applied
  to E-field), Ampère-Maxwell (Stokes for B-field with current).
- **Computer graphics — solid angle and form factors** —
  radiosity computations integrate over visible surfaces using
  divergence-theorem identities.
- **Finite-element method** — weak forms of PDEs use integration
  by parts (Green's identities), the multivariable analogue of 1D
  IBP.
- **Fluid simulation** — incompressibility ($\nabla \cdot \mathbf{v} = 0$)
  ensures volume conservation; pressure-projection algorithms enforce
  it.
- **Probability** — divergence theorem proves the Fokker-Planck
  equation governs probability density flow under SDEs.

## Check Your Understanding

:::widget type=numeric-input prompt="Divergence theorem: surface flux = volume integral of divergence. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Stokes: line integral around boundary = surface integral of curl. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\nabla \\cdot (\\nabla \\times \\mathbf{F}) = 0$ — divergence of curl is zero. Type 1." answer=1 explain="Yes — generalised Stokes consequence.":::

:::widget type=numeric-input prompt="Maxwell's equations are formulations of Stokes/divergence theorems. Type 1." answer=1 explain="Yes.":::
