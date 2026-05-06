---
strand: shape-space
level: intermediate
order: 9
title: 3D Geometry Capstone
prerequisites:
  - tier: strand-3-shape-space-intermediate
    slug: 08-polar-coordinates
    description: Polar coordinates
connections:
  - strand-3-shape-space-foundation/09-real-geometry-problems
applications:
  - cs: "3D graphics pipelines, robotics kinematics"
  - games: "Camera systems, character rigging"
  - life: "Architecture, navigation, CT/MRI imaging"
---

# 3D Geometry Capstone

## Explain Like I Am 7

You've gathered three new gadgets: a trig-ratio calculator, an arrow
toolkit, and a swirl-coordinate map.  Now imagine someone hands you
a real puzzle in three dimensions — like aiming a basketball, or
finding where a laser pointer hits the ceiling, or fitting a shelf
into a tilted attic.  In this lesson you mash all your gadgets
together and watch how flat geometry, vectors, and angles team up
to solve genuinely *spatial* problems that live in the real world.

## Mental

Strand 3 Foundation covered 2D geometry. Strand 3 Intermediate
extended into:

- **Trigonometry**: ratios in right triangles; unit circle for any
  angle.
- **Vectors**: 2D and 3D directed quantities with addition, scalar
  multiplication, dot/cross product.
- **Conics**: ellipse, parabola, hyperbola — unified by eccentricity.
- **Polar coordinates**: an alternative for circular phenomena.

3D geometry adds a third coordinate. Strand 3 Master / Advanced
goes deeper, but here are the **essentials** for most CS / engineering
applications.

## 3D points, lines, planes

A **point** in 3D: $(x, y, z)$.

A **line** through point $\mathbf{P}_0$ in direction $\mathbf{d}$:

$$
\mathbf{r}(t) = \mathbf{P}_0 + t \mathbf{d}, \quad t \in \mathbb{R}.
$$

(Parametric form. Each $t$ gives a point on the line.)

A **plane** with normal vector $\mathbf{n}$ passing through point
$\mathbf{P}_0$:

$$
\mathbf{n} \cdot (\mathbf{r} - \mathbf{P}_0) = 0.
$$

In coordinates: $a x + b y + c z = d$ where $\mathbf{n} = (a, b, c)$
and $d = \mathbf{n} \cdot \mathbf{P}_0$.

## Distance from a point to a plane

The signed distance from $(x_0, y_0, z_0)$ to plane $ax + by + cz = d$:

$$
\text{dist} = \frac{a x_0 + b y_0 + c z_0 - d}{\sqrt{a^2 + b^2 + c^2}}.
$$

The numerator's sign tells which side. The absolute value is the
unsigned distance.

## Walkthrough: ray-sphere intersection

A common graphics problem: does a ray (from a camera, in some
direction) hit a sphere?

Ray: $\mathbf{r}(t) = \mathbf{P}_0 + t \mathbf{d}$.
Sphere: $|\mathbf{r} - \mathbf{C}| = R$, centre $\mathbf{C}$, radius $R$.

Substitute and expand:

$$
|\mathbf{P}_0 + t \mathbf{d} - \mathbf{C}|^2 = R^2.
$$

This becomes a **quadratic in $t$**:

$$
t^2 (\mathbf{d} \cdot \mathbf{d}) + 2 t (\mathbf{d} \cdot (\mathbf{P}_0 - \mathbf{C})) + (\mathbf{P}_0 - \mathbf{C}) \cdot (\mathbf{P}_0 - \mathbf{C}) - R^2 = 0.
$$

If discriminant $\ge 0$: ray hits sphere. The two roots give the
entry and exit $t$ values. Standard ray-tracing code does this on
every pixel of every frame.

## Interactive

:::widget type=numeric-input prompt="Distance from origin to plane $x + 2y + 2z = 9$. $\\frac{|0 + 0 + 0 - 9|}{\\sqrt{1 + 4 + 4}} = \\frac{9}{?}$" answer=3 explain="$\\sqrt 9 = 3$. So distance is $9/3 = 3$.":::

:::widget type=numeric-input prompt="Magnitude of the 3D vector $(1, 2, 2)$." answer=3 explain="$\\sqrt{1 + 4 + 4} = 3$.":::

:::widget type=numeric-input prompt="3D parametric line: $\\mathbf{r}(t) = (1, 2, 3) + t(0, 0, 1)$. At $t = 5$, the point is $(1, 2, ?)$." answer=8 explain="$z = 3 + 5 \\cdot 1 = 8$.":::

:::widget type=numeric-input prompt="A unit sphere at origin: $|\\mathbf{r}|^2 = 1$. Number of unique points on this sphere is..." answer=0 explain="Infinite. Type 0 to indicate 'infinite'.":::

## Roadmap

**Strand 3 Advanced** would cover:

- Projective geometry (homogeneous coordinates for 3D graphics).
- Quaternions (4D rotation numbers — used in flight simulators).
- Curves and surfaces (parametric, implicit, Bezier, NURBS).
- Differential geometry (curvature, geodesics).
- Non-Euclidean geometry: spherical, hyperbolic, elliptic.

**Strand 3 Master** continues with smooth manifolds, Riemannian
geometry, and the geometric foundation of general relativity.

## Closing

You have now covered most of the geometry needed for:

- 2D and basic 3D computer graphics.
- Game-engine math.
- Surveying, navigation, computer vision foundations.
- Physics modelling (statics, kinematics).

Each of these fields has its own depth, but the **vocabulary** —
points, lines, vectors, distances, angles, projections — is now in
your hands.

## Check Your Understanding

:::widget type=numeric-input prompt="3D distance from origin to $(1, 2, 2)$." answer=3 explain="$\\sqrt{1 + 4 + 4} = 3$.":::

:::widget type=numeric-input prompt="A plane $z = 5$ (i.e., normal is $\\mathbf{k}$). Distance from origin?" answer=5 explain="$|d|/|\\mathbf{n}| = 5/1 = 5$.":::

:::widget type=numeric-input prompt="Two unit vectors $\\hat{\\mathbf{u}}$ and $\\hat{\\mathbf{v}}$. Their dot product equals the cosine of the angle. Maximum possible dot product?" answer=1 explain="When parallel: $\\cos 0 = 1$.":::

:::widget type=numeric-input prompt="Cross product $\\mathbf{u} \\times \\mathbf{v}$ has magnitude $|\\mathbf{u}||\\mathbf{v}| \\sin\\theta$. For $|\\mathbf{u}| = |\\mathbf{v}| = 5$ and $\\theta = 90°$, magnitude?" answer=25 explain="$5 \\cdot 5 \\cdot 1 = 25$.":::
