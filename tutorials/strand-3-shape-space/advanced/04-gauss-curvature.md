---
strand: shape-space
level: advanced
order: 4
title: Second Fundamental Form and Gauss Curvature
prerequisites:
  - tier: strand-3-shape-space-advanced
    slug: 03-surfaces-fundamental-forms
    description: First fundamental form
connections:
  - strand-3-shape-space-advanced/05-geodesics
applications:
  - cs: "3D mesh analysis, shape descriptors, GR"
  - life: "How a surface bends in 3D"
---

# Second Fundamental Form and Gauss Curvature

## Mental

The first fundamental form measures **intrinsic** geometry (distance,
angle, area on the surface). The **second fundamental form** measures
how the surface **curves into 3D**.

For a smooth surface $\mathbf{X}(u, v)$ with unit normal $\mathbf{n}$:

$$
II = e \, du^2 + 2 f \, du \, dv + g \, dv^2,
$$

with $e = \mathbf{X}_{uu} \cdot \mathbf{n}$, $f = \mathbf{X}_{uv} \cdot \mathbf{n}$, $g = \mathbf{X}_{vv} \cdot \mathbf{n}$.

These measure how the surface bends away from its tangent plane in
each direction.

## Principal curvatures

At each point, the **principal curvatures** $\kappa_1, \kappa_2$ are
the eigenvalues of the **shape operator** $S = I^{-1} II$ — the rates
at which the surface bends in two orthogonal "principal directions."

- **Mean curvature**: $H = \frac{\kappa_1 + \kappa_2}{2}$.
- **Gauss curvature**: $K = \kappa_1 \kappa_2 = \frac{eg - f^2}{EG - F^2}$.

## The remarkable theorem (Theorema Egregium)

**Gauss's theorem** (1827): the **Gauss curvature $K$ is intrinsic** —
computable from the first fundamental form alone, even though the
definition involves the second.

This is *remarkable*: $\kappa_1$ and $\kappa_2$ separately are
extrinsic, but their *product* is intrinsic.

Consequences:

- **Sphere of radius $R$**: $K = 1/R^2$. Constant positive.
- **Plane**: $K = 0$.
- **Saddle / hyperbolic surface**: $K < 0$.
- **Cylinder**: $K = 0$ — same Gauss curvature as a plane! Hence
  locally isometric to a plane (roll out the cylinder).

## Implications: cartography

You **cannot** flatten a sphere onto a plane without distortion. Any
map of Earth must distort either area, angle, or distance — never
all three preserved. (Mercator preserves angles, distorts area.)

## Interactive

:::widget type=numeric-input prompt="Gauss curvature of unit sphere: $K = 1/R^2 = 1/1 = ?$" answer=1 explain="$1$.":::

:::widget type=numeric-input prompt="Gauss curvature of a flat plane?" answer=0 explain="$0$.":::

:::widget type=numeric-input prompt="Gauss curvature of cylinder — same as plane? Type 1 if true." answer=1 explain="Yes — both $K = 0$.":::

:::widget type=numeric-input prompt="Gauss curvature is *intrinsic*, even though definition uses extrinsic data. Type 1." answer=1 explain="Yes — Theorema Egregium.":::

## Symbolic

**Gauss-Bonnet theorem**: for a compact closed surface $S$:

$$
\iint_S K \, dA = 2\pi \chi(S),
$$

where $\chi(S)$ is the **Euler characteristic** — a *topological*
invariant.

Implications:

- Sphere ($\chi = 2$): $\iint K \, dA = 4\pi$. (Verify on unit
  sphere: $\iint 1 \, dA = 4\pi$.)
- Torus ($\chi = 0$): $\iint K \, dA = 0$ — total curvature is zero.
- Genus-2 surface ($\chi = -2$): $\iint K \, dA = -4\pi$.

This connects geometry (curvature) to topology (Euler char).

## Computational

```python
import sympy as sp

u, v, R = sp.symbols("u v R", positive=True)

# Sphere
X = sp.Matrix([R*sp.sin(u)*sp.cos(v), R*sp.sin(u)*sp.sin(v), R*sp.cos(u)])

# First fundamental form
Xu, Xv = X.diff(u), X.diff(v)
E, F, G = Xu.dot(Xu), Xu.dot(Xv), Xv.dot(Xv)

# Unit normal
n_unscaled = Xu.cross(Xv)
n = n_unscaled / n_unscaled.norm()

# Second fundamental form
Xuu, Xuv, Xvv = Xu.diff(u), Xu.diff(v), Xv.diff(v)
e2 = Xuu.dot(n)
f2 = Xuv.dot(n)
g2 = Xvv.dot(n)

# Gauss curvature K = (eg - f²)/(EG - F²)
K = sp.simplify((e2*g2 - f2**2) / (E*G - F**2))
print(K)                                    # 1/R²

# Verify Gauss-Bonnet for sphere
total = sp.integrate(K * sp.sqrt(E*G - F*F), (u, 0, sp.pi), (v, 0, 2*sp.pi))
print(sp.simplify(total))                   # 4π = 2π·χ for χ=2
```

## Applied

- **3D shape analysis** — Gauss curvature distinguishes elliptical
  (positive K), hyperbolic (negative), and parabolic (zero) regions
  on meshes; used in shape recognition.
- **General relativity** — spacetime curvature (Riemann tensor) is the
  $\ge 4$D generalisation. Einstein's equations relate matter/energy
  to curvature.
- **Soft-body physics** — discrete shell deformations track changes
  in mean curvature.
- **Architecture / structural engineering** — minimal surfaces (
  $H = 0$) for tents and shells use minimal material.
- **Cartography** — Gauss-Bonnet implies no flat-Earth-without-
  distortion.

## Check Your Understanding

:::widget type=numeric-input prompt="$K > 0$: sphere-like. $K < 0$: saddle-like. $K = 0$: developable. Number of cases: $3$. Type 3." answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="A torus has Euler characteristic $\\chi = 0$ and $\\iint K \\, dA = 0$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Gauss curvature of unit sphere: $1$. Of a torus's outer-equator point: positive. Of inner-equator: negative. Type 1 if curvature varies on a torus." answer=1 explain="Yes — varies between positive and negative.":::

:::widget type=numeric-input prompt="$\\iint K \\, dA = 2\\pi \\chi(S)$. Type 1 if Gauss-Bonnet." answer=1 explain="Yes.":::
