---
strand: shape-space
level: advanced
order: 5
title: Geodesics
prerequisites:
  - tier: strand-3-shape-space-advanced
    slug: 04-gauss-curvature
    description: Gauss curvature
connections:
  - strand-3-shape-space-advanced/06-topology-basics
applications:
  - cs: "Mesh-based shortest paths, network routing on surfaces"
  - life: "Straightest possible curves on a curved space"
---

# Geodesics

## Mental

A **geodesic** on a surface (or Riemannian manifold) is a curve that
is "straightest possible" — locally length-minimising, or
equivalently a curve whose acceleration in 3D is *normal* to the
surface (no tangential component).

In Euclidean space, straight lines are geodesics. On a sphere, great
circles. On a cylinder, helices and straight lines.

## The geodesic equation

In local coordinates with first fundamental form's Christoffel
symbols $\Gamma^k_{ij}$:

$$
\frac{d^2 x^k}{ds^2} + \sum_{i, j} \Gamma^k_{ij} \frac{dx^i}{ds} \frac{dx^j}{ds} = 0.
$$

Second-order ODE on the surface; given a starting point and direction,
the solution is unique.

## Worked example: geodesics on a sphere

By symmetry, geodesics on a sphere are intersections with planes
through the centre — **great circles**.

The great-circle distance from $\mathbf{p}$ to $\mathbf{q}$ on a unit
sphere is

$$
d(\mathbf{p}, \mathbf{q}) = \arccos(\mathbf{p} \cdot \mathbf{q}).
$$

For Earth (radius ~6371 km), great-circle distance from London
(51.5°N, 0°W) to New York (40.7°N, 74°W) is ~5570 km.

## Geodesics minimise length locally

**Locally** — short enough geodesics are the shortest path. **Globally**,
a geodesic might not be the shortest: on a sphere, the great-circle
arc going the "long way around" is *also* a geodesic, but not
shortest.

## Interactive

:::widget type=numeric-input prompt="Geodesics on a sphere are great circles. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="On a flat plane, geodesics are straight lines. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="London $(51.5°, 0°)$ to NYC $(40.7°, -74°)$: great-circle distance $\\approx 5570$ km on Earth (radius 6371 km). Type 1 if reasonable." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\arccos(1) = ?$ — geodesic distance from a point to itself, in radians." answer=0 explain="$0$.":::

## Symbolic

**Exponential map**: at a point $p$ on the surface, $\exp_p(\mathbf{v})$
follows the unique geodesic starting at $p$ with initial velocity
$\mathbf{v}$ for unit time. Used to define normal coordinates and
compute geodesics numerically.

**Cut locus** of $p$: the set of points where geodesics starting at
$p$ stop being shortest. On a sphere, the cut locus of any point is
the antipode (every direction reaches it at distance $\pi R$).

**Parallel transport**: moving a tangent vector along a curve while
keeping it "covariantly constant." Going around a closed loop on a
sphere produces a holonomy rotation — proportional to the enclosed
area times curvature.

## Computational

```python
import numpy as np

# Great-circle distance between two lat/lon points on a unit sphere
def great_circle_distance(lat1, lon1, lat2, lon2, R=1):
    p1 = np.array([np.cos(lat1)*np.cos(lon1),
                   np.cos(lat1)*np.sin(lon1),
                   np.sin(lat1)])
    p2 = np.array([np.cos(lat2)*np.cos(lon2),
                   np.cos(lat2)*np.sin(lon2),
                   np.sin(lat2)])
    return R * np.arccos(np.clip(np.dot(p1, p2), -1, 1))

# London to NYC on Earth
import math
lon_l = math.radians(0)
lat_l = math.radians(51.5)
lon_n = math.radians(-74)
lat_n = math.radians(40.7)
print(great_circle_distance(lat_l, lon_l, lat_n, lon_n, R=6371))
# ~5570 km

# Geodesic equation numerical integration on a sphere
# Sphere parameterisation: (sin u cos v, sin u sin v, cos u)
# In u, v coordinates the metric is du² + sin²u dv²
def geodesic_step(state, ds):
    u, v, du, dv = state
    # Christoffel symbols for the sphere:
    # Γ^u_vv = -sin(u)cos(u), Γ^v_uv = cos(u)/sin(u), all others zero
    d2u = -du*0 + sin(u)*cos(u) * dv*dv
    d2v = -2 * cos(u)/sin(u) * du * dv
    return (du, dv, d2u, d2v)

# (full numerical integrator omitted for brevity; the structure is RK4)
```

## Applied

- **GPS navigation** uses great-circle distance for spherical Earth
  approximation; for higher accuracy, ellipsoidal Earth (WGS-84) and
  geodesic equations on the ellipsoid.
- **Mesh shortest paths** — exact polyhedral geodesics (Mitchell-
  Mount-Papadimitriou) or fast approximate (heat method) compute
  shortest paths on triangle meshes for medical imaging, robotics,
  graphics.
- **General relativity** — gravity *is* the geodesic equation in
  curved spacetime. Light follows null geodesics; planets follow
  timelike geodesics.
- **Information geometry** — statistical manifolds (e.g., families
  of probability distributions) have natural metrics; ML algorithms
  exploit geodesic structure (natural gradient).

## Check Your Understanding

:::widget type=numeric-input prompt="Great circles are sphere geodesics. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Geodesics minimise length locally; not always globally. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Parallel transport around a closed loop on a curved surface produces a non-trivial rotation (holonomy). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="In GR, freely-falling objects follow geodesics. Type 1." answer=1 explain="Yes.":::
