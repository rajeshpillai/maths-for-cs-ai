---
strand: change
level: advanced
order: 6
title: Change of Variables — The Jacobian
prerequisites:
  - tier: strand-4-change-advanced
    slug: 05-multiple-integrals
    description: Multiple integrals
connections:
  - strand-4-change-advanced/07-vector-fields-and-line-integrals
applications:
  - cs: "Normalizing flows, polar/spherical integrals, MCMC reparam"
  - life: "Switching coordinate systems for a hard integral"
---

# Change of Variables — The Jacobian

## Mental

In 1D substitution: $\int f(x) dx \to \int f(g(u)) g'(u) du$ — the
$g'$ accounts for stretching.

In higher dimensions, the **Jacobian determinant** plays the role of
$g'$:

$$
\iint_R f(x, y) \, dx \, dy = \iint_{R'} f(\Phi(u, v)) \, |\det J_\Phi| \, du \, dv,
$$

where $\Phi : (u, v) \mapsto (x, y)$ is the change of variables.

The factor $|\det J_\Phi|$ is the **local area-stretching factor**.

## Polar coordinates

$\Phi(r, \theta) = (r \cos \theta, r \sin \theta)$. Jacobian:

$$
J = \begin{pmatrix} \cos \theta & -r \sin \theta \\ \sin \theta & r \cos \theta \end{pmatrix}, \quad |\det J| = r.
$$

So

$$
\iint_R f \, dx \, dy = \iint_{R'} f(r \cos \theta, r \sin \theta) \cdot r \, dr \, d\theta.
$$

The familiar **$dA = r \, dr \, d\theta$**.

## Worked example: Gaussian integral

Compute $I = \int_{-\infty}^\infty e^{-x^2} dx$.

Trick: square it.

$I^2 = \iint_{\mathbb{R}^2} e^{-(x^2 + y^2)} dx \, dy$.

Switch to polar: $x^2 + y^2 = r^2$, $dA = r \, dr \, d\theta$.

$I^2 = \int_0^{2\pi} \int_0^\infty e^{-r^2} r \, dr \, d\theta = 2\pi \cdot \frac{1}{2} = \pi$.

So $I = \sqrt{\pi}$.

This is *the* clever calculation in elementary multivariable
calculus, and it underlies the Gaussian density in statistics.

## Spherical coordinates

$\Phi(\rho, \phi, \theta) = (\rho \sin \phi \cos \theta, \rho \sin \phi \sin \theta, \rho \cos \phi)$.

$|\det J| = \rho^2 \sin \phi$.

So $dV = \rho^2 \sin \phi \, d\rho \, d\phi \, d\theta$.

Volume of sphere of radius $R$:

$\int_0^{2\pi} \int_0^\pi \int_0^R \rho^2 \sin \phi \, d\rho \, d\phi \, d\theta$
$= 2\pi \cdot 2 \cdot \frac{R^3}{3} = \frac{4\pi R^3}{3}$. ✓

## Interactive

:::widget type=numeric-input prompt="Polar Jacobian factor: $|\\det J| = ?$. Type the symbol value at general $(r, \\theta)$ — the answer is $r$. So at $r = 3$: $?$." answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="$\\int_{-\\infty}^\\infty e^{-x^2} dx = \\sqrt{\\pi} \\approx ?$. Round 4 dp." answer=1.7725 tolerance=0.005 explain="$\\sqrt{\\pi}$.":::

:::widget type=numeric-input prompt="Volume of unit sphere: $\\frac{4\\pi}{3} \\approx ?$. Round 4 dp." answer=4.1888 tolerance=0.005 explain="$\\approx 4.189$.":::

:::widget type=numeric-input prompt="Spherical Jacobian: $\\rho^2 \\sin \\phi$. At $\\rho = 1, \\phi = \\pi/2$: $\\sin(\\pi/2) = ?$" answer=1 explain="$1$.":::

## Symbolic

**Probability change of variables**: if $Y = \Phi(X)$ and $X$ has
density $p_X$, the density of $Y$ is

$$
p_Y(\mathbf{y}) = p_X(\Phi^{-1}(\mathbf{y})) \cdot |\det J_{\Phi^{-1}}(\mathbf{y})|.
$$

This is the basis of **normalizing flows** — generative ML models
that transform a simple base distribution through invertible neural
networks; the log-likelihood requires log-det-Jacobians.

**Reparameterization trick** in VAEs: sample $\epsilon \sim \mathcal{N}(0, I)$,
then $z = \mu + \sigma \cdot \epsilon$ — invertible with Jacobian
$\sigma$. Lets gradients flow through samples.

## Computational

```python
import sympy as sp
import numpy as np

r, theta, rho, phi = sp.symbols("r theta rho phi")

# Verify polar Jacobian
x, y = r * sp.cos(theta), r * sp.sin(theta)
J = sp.Matrix([[sp.diff(x, r), sp.diff(x, theta)],
               [sp.diff(y, r), sp.diff(y, theta)]])
print(sp.simplify(J.det()))            # r

# Verify spherical Jacobian
x = rho * sp.sin(phi) * sp.cos(theta)
y = rho * sp.sin(phi) * sp.sin(theta)
z = rho * sp.cos(phi)
J = sp.Matrix([[sp.diff(c, v) for v in (rho, phi, theta)] for c in (x, y, z)])
print(sp.simplify(J.det()))            # rho^2 * sin(phi)

# Gaussian integral via polar
print(sp.integrate(sp.exp(-r**2) * r, (r, 0, sp.oo), (theta, 0, 2*sp.pi)))   # pi
print(sp.sqrt(sp.pi))

# Volume of sphere
R = sp.symbols("R", positive=True)
print(sp.integrate(rho**2 * sp.sin(phi),
                   (rho, 0, R), (phi, 0, sp.pi), (theta, 0, 2*sp.pi)))   # 4*pi*R**3/3
```

## Applied

- **Normalizing flows** — RealNVP, Glow, neural ODEs use change-of-
  variables for tractable likelihood.
- **MCMC reparameterization** — Hamiltonian Monte Carlo and
  variational autoencoders rely on invertible transformations.
- **Computer graphics** — environment-map sampling, importance
  sampling in path tracing.
- **General relativity** — coordinate transformations between
  Cartesian, Schwarzschild, Kerr coordinates require Jacobian
  determinants.
- **Robotics** — converting between joint coordinates and Cartesian
  end-effector coordinates uses the manipulator Jacobian (and its
  determinant signals singularities).

## Check Your Understanding

:::widget type=numeric-input prompt="$dA = r \\, dr \\, d\\theta$ in polar. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\int_{-\\infty}^\\infty e^{-x^2/2} dx = \\sqrt{2\\pi} \\approx 2.5066$. Round 4 dp." answer=2.5066 tolerance=0.005 explain="$\\sqrt{2\\pi}$.":::

:::widget type=numeric-input prompt="Spherical $dV = \\rho^2 \\sin \\phi \\, d\\rho \\, d\\phi \\, d\\theta$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Probability change of variables introduces a $|\\det J|$ factor. Type 1." answer=1 explain="Yes.":::
