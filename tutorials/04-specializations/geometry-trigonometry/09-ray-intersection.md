# Ray-Sphere and Ray-Plane Intersection

## Intuition

Ray casting asks: "If I shoot a ray from point A in direction D, what does it
hit?"  This is the foundation of ray tracing (photorealistic rendering),
mouse picking in 3D games, and collision detection.  The math reduces to
solving simple equations.

## Prerequisites

- Tier 8, Lesson 3: Pythagorean Theorem / Distance
- Tier 2, Lesson 2: Vector Operations (dot product)

## From First Principles

### The ray

$$\mathbf{r}(t) = \mathbf{o} + t\mathbf{d}, \quad t \ge 0$$

$\mathbf{o}$ = origin, $\mathbf{d}$ = direction (usually normalised), $t$ = distance along the ray.

### Ray-plane intersection

A plane: $\mathbf{n} \cdot \mathbf{p} = d$ (normal $\mathbf{n}$, offset $d$).

Substitute the ray: $\mathbf{n} \cdot (\mathbf{o} + t\mathbf{d}) = d$

$$t = \frac{d - \mathbf{n} \cdot \mathbf{o}}{\mathbf{n} \cdot \mathbf{d}}$$

If $\mathbf{n} \cdot \mathbf{d} = 0$: ray is parallel to plane (no intersection).
If $t < 0$: intersection is behind the ray.

**Pen & paper:** Ray from $(0,0,0)$ in direction $(0,0,1)$.  Plane $z = 5$ (normal $(0,0,1)$, $d = 5$).

$t = \frac{5 - 0}{1} = 5$.  Hit point: $(0, 0, 5)$. ✓

### Ray-sphere intersection

Sphere: centre $\mathbf{c}$, radius $r$.  Point on sphere: $\|\mathbf{p} - \mathbf{c}\|^2 = r^2$.

Substitute the ray:

$$\|\mathbf{o} + t\mathbf{d} - \mathbf{c}\|^2 = r^2$$

Let $\mathbf{m} = \mathbf{o} - \mathbf{c}$:

$$(\mathbf{d} \cdot \mathbf{d})t^2 + 2(\mathbf{m} \cdot \mathbf{d})t + (\mathbf{m} \cdot \mathbf{m} - r^2) = 0$$

This is a quadratic $at^2 + bt + c = 0$ where:
- $a = \mathbf{d} \cdot \mathbf{d}$ (= 1 if $\mathbf{d}$ is normalised)
- $b = 2(\mathbf{m} \cdot \mathbf{d})$
- $c = \mathbf{m} \cdot \mathbf{m} - r^2$

**Discriminant:** $\Delta = b^2 - 4ac$

- $\Delta < 0$: miss
- $\Delta = 0$: tangent (one hit)
- $\Delta > 0$: two hits (entering and exiting)

$t = \frac{-b \pm \sqrt{\Delta}}{2a}$

Take the smaller positive $t$ (nearest hit).

### Pen & paper: Ray-sphere

Ray: $\mathbf{o} = (0,0,0)$, $\mathbf{d} = (0,0,1)$.  Sphere: $\mathbf{c} = (0,0,5)$, $r = 2$.

$\mathbf{m} = (0,0,-5)$

$a = 1$, $b = 2(0 \cdot 0 + 0 \cdot 0 + (-5)(1)) = -10$, $c = 25 - 4 = 21$

$\Delta = 100 - 84 = 16 > 0$ → two hits

$t = \frac{10 \pm 4}{2} = 7$ or $3$

Near hit at $t = 3$: point $(0, 0, 3)$.  Far hit at $t = 7$: point $(0, 0, 7)$. ✓

The sphere extends from $z = 3$ to $z = 7$ (centre at 5, radius 2).

## Python Verification

```python
# ── Ray Intersection ────────────────────────────────────────
import math

def dot(a, b):
    return sum(ai*bi for ai, bi in zip(a, b))

def sub(a, b):
    return tuple(ai-bi for ai, bi in zip(a, b))

def add(a, b):
    return tuple(ai+bi for ai, bi in zip(a, b))

def scale(s, v):
    return tuple(s*vi for vi in v)

# Ray-plane
print("=== Ray-Plane intersection ===")
o = (0, 0, 0)
d = (0, 0, 1)
n = (0, 0, 1)  # plane z = 5
plane_d = 5

denom = dot(n, d)
if abs(denom) < 1e-10:
    print("  Parallel — no intersection")
else:
    t = (plane_d - dot(n, o)) / denom
    hit = add(o, scale(t, d))
    print(f"  t = {t}, hit point = {hit}")

# Ray-sphere
print(f"\n=== Ray-Sphere intersection ===")
o = (0, 0, 0)
d = (0, 0, 1)
c = (0, 0, 5)
r = 2

m = sub(o, c)
a = dot(d, d)
b = 2 * dot(m, d)
c_coeff = dot(m, m) - r**2
disc = b**2 - 4*a*c_coeff

print(f"  a={a}, b={b}, c={c_coeff}, Δ={disc}")

if disc < 0:
    print("  Miss!")
elif disc == 0:
    t = -b / (2*a)
    print(f"  Tangent at t={t}, point={add(o, scale(t, d))}")
else:
    t1 = (-b - math.sqrt(disc)) / (2*a)
    t2 = (-b + math.sqrt(disc)) / (2*a)
    print(f"  t1={t1} (near), t2={t2} (far)")
    print(f"  Near hit: {add(o, scale(t1, d))}")
    print(f"  Far hit:  {add(o, scale(t2, d))}")

# Miss example
print(f"\n=== Miss example ===")
d_miss = (1, 0, 0)  # shoot sideways
m = sub(o, (0, 0, 5))
a = dot(d_miss, d_miss)
b = 2 * dot(m, d_miss)
c_coeff = dot(m, m) - 4
disc = b**2 - 4*a*c_coeff
print(f"  Δ = {disc} {'→ Miss!' if disc < 0 else '→ Hit'}")

# Practical: which object does the ray hit first?
print(f"\n=== Multiple objects: nearest hit ===")
ray_o = (0, 1, 0)
ray_d = (0, 0, 1)
spheres = [
    {"c": (0, 1, 10), "r": 3, "name": "big sphere"},
    {"c": (0, 1, 5), "r": 1, "name": "small sphere"},
]

nearest_t = float('inf')
nearest_name = None
for s in spheres:
    m = sub(ray_o, s["c"])
    a = dot(ray_d, ray_d)
    b = 2 * dot(m, ray_d)
    c_coeff = dot(m, m) - s["r"]**2
    disc = b**2 - 4*a*c_coeff
    if disc >= 0:
        t = (-b - math.sqrt(disc)) / (2*a)
        if 0 < t < nearest_t:
            nearest_t = t
            nearest_name = s["name"]
        print(f"  {s['name']}: t={t:.2f}")
print(f"  Nearest: {nearest_name} at t={nearest_t:.2f}")
```

## Visualisation — A simple ray tracer in 30 lines

Ray–sphere and ray–plane intersections together are enough to render
a 3-D scene in 2-D. The plot fires one ray per pixel from a camera
through a small scene of two spheres + a ground plane, and shows the
resulting image. This is the *kernel* of every ray tracer ever
written.

```python
# ── A minimalist ray tracer ─────────────────────────────────
import numpy as np
import matplotlib.pyplot as plt

def normalise(v): return v / np.linalg.norm(v)

# Scene: two spheres above a checker-pattern ground plane (y = 0).
spheres = [
    {"centre": np.array([ 0.0, 1.0, 4.0]), "radius": 1.0, "colour": np.array([0.7, 0.2, 0.2])},
    {"centre": np.array([-2.0, 0.7, 5.0]), "radius": 0.7, "colour": np.array([0.2, 0.5, 0.7])},
]
plane_y = 0.0
camera  = np.array([0.0, 1.0, 0.0])
light   = normalise(np.array([1.0, 2.0, -1.0]))

def ray_sphere(o, d, c, r):
    """Returns smallest positive t where ray o + t·d hits sphere, or None."""
    m = o - c
    b = 2 * np.dot(m, d)
    cc = np.dot(m, m) - r * r
    disc = b * b - 4 * cc                  # a = 1 since |d| = 1
    if disc < 0: return None
    sq = np.sqrt(disc)
    t1, t2 = (-b - sq) / 2, (-b + sq) / 2
    return t1 if t1 > 1e-3 else (t2 if t2 > 1e-3 else None)

def ray_plane(o, d, y):
    if abs(d[1]) < 1e-6: return None
    t = (y - o[1]) / d[1]
    return t if t > 1e-3 else None

def trace(origin, direction):
    nearest_t = float("inf")
    nearest_normal = None; nearest_colour = None
    # Test all spheres.
    for s in spheres:
        t = ray_sphere(origin, direction, s["centre"], s["radius"])
        if t is not None and t < nearest_t:
            nearest_t = t
            hit = origin + t * direction
            nearest_normal = normalise(hit - s["centre"])
            nearest_colour = s["colour"]
    # Test ground plane.
    t = ray_plane(origin, direction, plane_y)
    if t is not None and t < nearest_t:
        nearest_t = t
        hit = origin + t * direction
        # Checker pattern.
        cx, cz = int(np.floor(hit[0])), int(np.floor(hit[2]))
        nearest_colour = np.array([0.8, 0.8, 0.8]) if (cx + cz) % 2 == 0 \
                          else np.array([0.2, 0.2, 0.2])
        nearest_normal = np.array([0.0, 1.0, 0.0])

    if nearest_normal is None:
        return np.array([0.5, 0.7, 0.95])     # sky background
    # Lambertian shading: brightness = max(0, n · L)
    brightness = max(0.1, float(np.dot(nearest_normal, light)))
    return brightness * nearest_colour

# Render a tiny image (small so Pyodide doesn't take ages).
W, H = 80, 60
aspect = W / H
img = np.zeros((H, W, 3))
for j in range(H):
    for i in range(W):
        # Map pixel (i, j) to a direction in the world. y is flipped so
        # row 0 is the top of the image.
        x = (2 * (i + 0.5) / W - 1) * aspect * 0.7
        y = (1 - 2 * (j + 0.5) / H) * 0.7
        direction = normalise(np.array([x, y, 1.0]))
        img[j, i] = np.clip(trace(camera, direction), 0, 1)

fig, ax = plt.subplots(1, 1, figsize=(8, 6))
ax.imshow(img)
ax.set_title(f"Rendered {W}×{H} image\nray-traced through 2 spheres + checkered ground")
ax.axis("off")
plt.tight_layout()
plt.show()

# Sanity-check single-pixel intersections so the lesson math is verified numerically.
print("Sanity: cast central ray and see what it hits.")
direction = normalise(np.array([0.0, 0.0, 1.0]))
for s in spheres:
    t = ray_sphere(camera, direction, s["centre"], s["radius"])
    print(f"  Sphere at {s['centre']}, r={s['radius']}: ray hit at t = {t}")
t = ray_plane(camera, direction, plane_y)
print(f"  Ground plane y = 0: hit at t = {t}")
```

**The 30-line ray tracer encapsulates all of computer graphics:**

- **Each pixel = one ray.** From the camera, shoot a ray through the
  pixel's direction. Find the *closest* intersection with any object
  in the scene.
- **Surface normal + light direction = shading.** Lambertian
  ("diffuse") shading is just $\max(0, \mathbf{n} \cdot \mathbf{L})$
  — exactly the dot product from lesson 3 of linear algebra.
- **Recursion gives reflections / refractions.** Spawn a new ray from
  the hit point and repeat the trace. A few bounces produce
  glossy mirrors (Pixar's RenderMan, Unreal Engine's Lumen). Many
  bounces with random directions = path tracing (full Monte Carlo
  global illumination).
- **Every modern renderer is built on these primitives.** Real
  systems use BVH acceleration structures, GPU SIMD, and learned
  denoisers — but the per-pixel logic is the picture above.

## Connection to CS / Games / AI / Business / Industry

- **Ray tracing** — cast rays from camera through each pixel; find intersections for photorealistic rendering
- **Mouse picking** — cast a ray from camera through mouse position to select 3D objects
- **Collision detection** — bullet/projectile paths are rays
- **Shadow rays** — from hit point to light: if blocked, the point is in shadow
- **Path tracing** — bounce rays randomly for global illumination (used in movies)

## Check Your Understanding

1. **Pen & paper:** Ray from $(1, 2, 0)$ in direction $(0, 0, 1)$.  Plane $z = 10$.  Find the intersection.
2. **Pen & paper:** Ray from $(0, 0, 0)$ in direction $(1, 0, 0)$.  Sphere at $(5, 0, 0)$ radius 1.  Find both intersection points.
3. **Pen & paper:** Same sphere, but ray direction $(0, 1, 0)$.  Does it hit?  Compute the discriminant.
