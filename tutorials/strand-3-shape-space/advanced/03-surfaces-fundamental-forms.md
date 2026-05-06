---
strand: shape-space
level: advanced
order: 3
title: Surfaces and the First Fundamental Form
prerequisites:
  - tier: strand-3-shape-space-advanced
    slug: 02-curves-and-curvature
    description: Curves and curvature
connections:
  - strand-3-shape-space-advanced/04-gauss-curvature
applications:
  - cs: "Mesh-based surface analysis, parameterization, texture mapping"
  - life: "How a surface measures distance and angle on itself"
---

# Surfaces and the First Fundamental Form

## Explain Like I Am 7

Pretend you're an ant living on a giant trampoline.  You can only
walk along the rubber sheet — you don't know it's curving up and
down beneath the sky.  The **first fundamental form** is the ant's
personal ruler: it tells the ant exactly how long any walk on the
sheet will be, and how fat the area of any patch is, *without ever
needing to look up at 3D space*.  Two trampolines that feel
identical to the ant might still look totally different from above.

## Mental

A **smooth surface** in $\mathbb{R}^3$ can be parameterised locally
as $\mathbf{X}(u, v)$ — a $C^\infty$ map from a 2D parameter domain to
$\mathbb{R}^3$ with non-degenerate partial derivatives.

Tangent vectors at a point come from $\mathbf{X}_u, \mathbf{X}_v$ —
the partial derivatives. Any curve on the surface has tangent in
$\mathrm{span}(\mathbf{X}_u, \mathbf{X}_v)$ at each point.

## The first fundamental form

The **first fundamental form** $I$ is the metric inherited from
$\mathbb{R}^3$, expressed on the tangent plane:

$$
I = E \, du^2 + 2 F \, du \, dv + G \, dv^2,
$$

where $E = \mathbf{X}_u \cdot \mathbf{X}_u, F = \mathbf{X}_u \cdot \mathbf{X}_v, G = \mathbf{X}_v \cdot \mathbf{X}_v$.

Equivalently, $I$ is the matrix $\begin{pmatrix} E & F \\ F & G \end{pmatrix}$.

It tells you:

- **Length of a curve** on the surface: $L = \int \sqrt{E u'^2 + 2F u'v' + G v'^2} \, dt$.
- **Angle between two tangent vectors**.
- **Surface area**: $A = \iint \sqrt{EG - F^2} \, du \, dv$.

The first fundamental form is **intrinsic**: it only depends on
*measurements made on the surface*, not the embedding.

## Worked example: sphere

Sphere of radius $R$, parameterise by $(\phi, \theta)$:

$\mathbf{X}(\phi, \theta) = (R \sin \phi \cos \theta, R \sin \phi \sin \theta, R \cos \phi)$.

$\mathbf{X}_\phi = (R \cos \phi \cos \theta, R \cos \phi \sin \theta, -R \sin \phi)$, $|\mathbf{X}_\phi|^2 = R^2$.

$\mathbf{X}_\theta = (-R \sin \phi \sin \theta, R \sin \phi \cos \theta, 0)$, $|\mathbf{X}_\theta|^2 = R^2 \sin^2 \phi$.

$\mathbf{X}_\phi \cdot \mathbf{X}_\theta = 0$ (orthogonal grid).

So $I = R^2 \, d\phi^2 + R^2 \sin^2\phi \, d\theta^2$. Surface area:
$\iint R^2 \sin \phi \, d\phi \, d\theta = 4\pi R^2$.

## Interactive

:::widget type=numeric-input prompt="Surface area element on sphere of radius $R$: $R^2 \\sin \\phi$. For $R = 1$, total area: $4\\pi \\approx ?$. Round 4 dp." answer=12.5664 tolerance=0.005 explain="$4\\pi \\approx 12.5664$.":::

:::widget type=numeric-input prompt="$E = \\mathbf{X}_u \\cdot \\mathbf{X}_u$, $F = \\mathbf{X}_u \\cdot \\mathbf{X}_v$, $G = \\mathbf{X}_v \\cdot \\mathbf{X}_v$. Number of coefficients in first fundamental form?" answer=3 explain="$3$ — symmetric 2×2 has 3 distinct entries.":::

:::widget type=numeric-input prompt="On a unit sphere, $\\mathbf{X}_\\phi \\cdot \\mathbf{X}_\\theta = ?$" answer=0 explain="$0$ — orthogonal grid.":::

:::widget type=numeric-input prompt="The first fundamental form is intrinsic — measurable on the surface alone. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Isometry**: a map between surfaces is an *isometry* iff it
preserves the first fundamental form. Distances, angles, areas all
match.

A flat plane and a cylinder have the same first fundamental form (both
locally Euclidean). A flat plane and a sphere don't — that's why
maps of the world distort.

**Geodesic**: a "straightest possible" curve on the surface — locally
length-minimising. On a sphere, geodesics are great circles. On a
flat plane, straight lines.

**Christoffel symbols** $\Gamma^k_{ij}$ — derived from $E, F, G$ —
encode how the tangent frame changes from point to point. Used in
the **geodesic equation** and in Riemannian geometry generally.

## Computational

```python
import sympy as sp

phi, theta, R = sp.symbols("phi theta R", positive=True)

# Sphere parameterisation
X = sp.Matrix([R*sp.sin(phi)*sp.cos(theta),
               R*sp.sin(phi)*sp.sin(theta),
               R*sp.cos(phi)])

X_phi = X.diff(phi)
X_theta = X.diff(theta)

E = X_phi.dot(X_phi)
F = X_phi.dot(X_theta)
G = X_theta.dot(X_theta)

print(sp.simplify(E))     # R^2
print(sp.simplify(F))     # 0
print(sp.simplify(G))     # R^2 sin^2(phi)

# Surface area
print(sp.simplify(sp.sqrt(E*G - F*F)))    # R^2 sin(phi)
print(sp.integrate(R**2 * sp.sin(phi),
                   (phi, 0, sp.pi),
                   (theta, 0, 2*sp.pi)))   # 4πR²

# Cylinder: x = cos(u), y = sin(u), z = v
u, v = sp.symbols("u v")
Xc = sp.Matrix([sp.cos(u), sp.sin(u), v])
Eu = Xc.diff(u).dot(Xc.diff(u))
Gv = Xc.diff(v).dot(Xc.diff(v))
print(sp.simplify(Eu), sp.simplify(Gv))   # 1 1 — flat metric
```

## Applied

- **Mesh processing in graphics** — discrete approximations of $E, F, G$
  on triangle meshes for length, angle, and area computations.
- **UV unwrapping / texture mapping** — find a parameterisation
  $(u, v)$ that distorts the first fundamental form as little as
  possible (LSCM, ARAP).
- **Geodesic distance computation** — heat method (Crane et al.)
  computes geodesics on meshes via PDE on the surface.
- **Cartography** — projecting Earth ($\sim$sphere) to a plane is
  exactly the failure to find an isometry.
- **General relativity** — spacetime is a 4-dimensional manifold with
  a metric (the first fundamental form generalised). Einstein's
  equations couple metric to matter/energy.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\sqrt{EG - F^2}$ is the surface-area element. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Geodesic on a sphere is a great circle. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cylinder is locally isometric to a flat plane. Type 1." answer=1 explain="Yes — roll out the cylinder, no distortion.":::

:::widget type=numeric-input prompt="First fundamental form is intrinsic — can be measured without seeing the embedding. Type 1." answer=1 explain="Yes.":::
