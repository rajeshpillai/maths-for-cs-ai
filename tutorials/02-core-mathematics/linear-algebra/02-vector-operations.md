# Vector Operations — Dot Product, Cross Product

## Explain Like I Am 7

Two friends are pushing the same heavy box.  If they push in the same
direction, all their effort piles up.  If they push at right angles,
their effort fights itself and the box barely moves.  The **dot
product** is a single number that tells you how much two arrows
*team up* — big when they line up, zero when they're perpendicular.
The **cross product** does something different in 3D: it points
straight up out of the floor where the two arrows lie, like the spike
of a tent pole shooting up between them.

## Intuition

The **dot product** tells you how much two vectors point in the same direction.
The **cross product** (3D only) gives you a vector perpendicular to both.
These two operations are the workhorse of computer graphics, physics, and
machine learning.

## Prerequisites

- Tier 2, Lesson 1: Scalars, Vectors, Matrices

## From First Principles

### Dot product (inner product)

Given $\mathbf{a} = \begin{pmatrix} a_1 \\ a_2 \\ \vdots \\ a_n \end{pmatrix}$ and $\mathbf{b} = \begin{pmatrix} b_1 \\ b_2 \\ \vdots \\ b_n \end{pmatrix}$:

$$\mathbf{a} \cdot \mathbf{b} = \sum_{i=1}^{n} a_i b_i = a_1 b_1 + a_2 b_2 + \cdots + a_n b_n$$

The result is a **scalar** (not a vector).

**Pen & paper:**

$$\begin{pmatrix} 2 \\ 3 \end{pmatrix} \cdot \begin{pmatrix} 4 \\ -1 \end{pmatrix} = 2 \times 4 + 3 \times (-1) = 8 - 3 = 5$$

$$\begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix} \cdot \begin{pmatrix} 4 \\ -5 \\ 6 \end{pmatrix} = 4 + (-10) + 18 = 12$$

### Properties of dot product

| Property | Formula |
|----------|---------|
| Commutative | $\mathbf{a} \cdot \mathbf{b} = \mathbf{b} \cdot \mathbf{a}$ |
| Distributive | $\mathbf{a} \cdot (\mathbf{b} + \mathbf{c}) = \mathbf{a} \cdot \mathbf{b} + \mathbf{a} \cdot \mathbf{c}$ |
| Scalar factor | $(c\mathbf{a}) \cdot \mathbf{b} = c(\mathbf{a} \cdot \mathbf{b})$ |
| Self-dot | $\mathbf{a} \cdot \mathbf{a} = \|\mathbf{a}\|^2$ |

### Vector magnitude (length / norm)

$$\|\mathbf{a}\| = \sqrt{\mathbf{a} \cdot \mathbf{a}} = \sqrt{a_1^2 + a_2^2 + \cdots + a_n^2}$$

**Pen & paper:**

$$\left\|\begin{pmatrix} 3 \\ 4 \end{pmatrix}\right\| = \sqrt{9 + 16} = \sqrt{25} = 5$$

This is just the Pythagorean theorem!

### Unit vectors

A **unit vector** has magnitude 1.  To normalise:

$$\hat{\mathbf{a}} = \frac{\mathbf{a}}{\|\mathbf{a}\|}$$

**Pen & paper:** Normalise $\begin{pmatrix} 3 \\ 4 \end{pmatrix}$:

$$\hat{\mathbf{a}} = \frac{1}{5}\begin{pmatrix} 3 \\ 4 \end{pmatrix} = \begin{pmatrix} 0.6 \\ 0.8 \end{pmatrix}$$

Verify: $\sqrt{0.36 + 0.64} = \sqrt{1} = 1$ ✓

### Geometric meaning of dot product

$$\mathbf{a} \cdot \mathbf{b} = \|\mathbf{a}\| \|\mathbf{b}\| \cos\theta$$

where $\theta$ is the angle between the vectors.

**Rearranged to find the angle:**

$$\cos\theta = \frac{\mathbf{a} \cdot \mathbf{b}}{\|\mathbf{a}\| \|\mathbf{b}\|}$$

**Pen & paper:** Angle between $\begin{pmatrix} 1 \\ 0 \end{pmatrix}$ and $\begin{pmatrix} 1 \\ 1 \end{pmatrix}$:

- $\mathbf{a} \cdot \mathbf{b} = 1$
- $\|\mathbf{a}\| = 1$, $\|\mathbf{b}\| = \sqrt{2}$
- $\cos\theta = \frac{1}{\sqrt{2}} \approx 0.707$
- $\theta = 45°$

**Key insight for interpretation:**
- $\mathbf{a} \cdot \mathbf{b} > 0$ → angle < 90° → vectors point "roughly same direction"
- $\mathbf{a} \cdot \mathbf{b} = 0$ → angle = 90° → **perpendicular** (orthogonal)
- $\mathbf{a} \cdot \mathbf{b} < 0$ → angle > 90° → vectors point "roughly opposite"

### Projection

The **scalar projection** of $\mathbf{b}$ onto $\mathbf{a}$:

$$\text{comp}_{\mathbf{a}} \mathbf{b} = \frac{\mathbf{a} \cdot \mathbf{b}}{\|\mathbf{a}\|}$$

The **vector projection**:

$$\text{proj}_{\mathbf{a}} \mathbf{b} = \frac{\mathbf{a} \cdot \mathbf{b}}{\mathbf{a} \cdot \mathbf{a}} \mathbf{a}$$

**Pen & paper:** Project $\mathbf{b} = \begin{pmatrix} 3 \\ 4 \end{pmatrix}$ onto $\mathbf{a} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$:

$$\text{proj}_{\mathbf{a}} \mathbf{b} = \frac{3}{1} \begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 3 \\ 0 \end{pmatrix}$$

This makes sense: the "shadow" of $(3,4)$ onto the x-axis is $(3,0)$.

### Cross product (3D only)

$$\mathbf{a} \times \mathbf{b} = \begin{pmatrix} a_2 b_3 - a_3 b_2 \\ a_3 b_1 - a_1 b_3 \\ a_1 b_2 - a_2 b_1 \end{pmatrix}$$

The result is a **vector** perpendicular to both $\mathbf{a}$ and $\mathbf{b}$.

**Pen & paper:**

$$\begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} \times \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 0 \cdot 0 - 0 \cdot 1 \\ 0 \cdot 0 - 1 \cdot 0 \\ 1 \cdot 1 - 0 \cdot 0 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix}$$

$\hat{\mathbf{x}} \times \hat{\mathbf{y}} = \hat{\mathbf{z}}$ — the right-hand rule!

**Pen & paper:**

$$\begin{pmatrix} 2 \\ 3 \\ 4 \end{pmatrix} \times \begin{pmatrix} 5 \\ 6 \\ 7 \end{pmatrix} = \begin{pmatrix} 3 \cdot 7 - 4 \cdot 6 \\ 4 \cdot 5 - 2 \cdot 7 \\ 2 \cdot 6 - 3 \cdot 5 \end{pmatrix} = \begin{pmatrix} 21 - 24 \\ 20 - 14 \\ 12 - 15 \end{pmatrix} = \begin{pmatrix} -3 \\ 6 \\ -3 \end{pmatrix}$$

**Properties:**
- $\|\mathbf{a} \times \mathbf{b}\| = \|\mathbf{a}\|\|\mathbf{b}\|\sin\theta$ (area of the parallelogram)
- $\mathbf{a} \times \mathbf{b} = -(\mathbf{b} \times \mathbf{a})$ (anti-commutative!)
- $\mathbf{a} \times \mathbf{a} = \mathbf{0}$

### Memory aid: determinant formula

$$\mathbf{a} \times \mathbf{b} = \det \begin{pmatrix} \hat{\mathbf{i}} & \hat{\mathbf{j}} & \hat{\mathbf{k}} \\ a_1 & a_2 & a_3 \\ b_1 & b_2 & b_3 \end{pmatrix}$$

### Worked examples (NCERT-style)

**Example 1 — angle between two vectors.** Find the angle between $\vec{a} = 2\hat{i} + 3\hat{j} - \hat{k}$ and $\vec{b} = -\hat{i} + \hat{j} + 2\hat{k}$.

Dot product: $\vec{a} \cdot \vec{b} = (2)(-1) + (3)(1) + (-1)(2) = -2 + 3 - 2 = -1$.

Magnitudes: $|\vec{a}| = \sqrt{4 + 9 + 1} = \sqrt{14}$, $|\vec{b}| = \sqrt{1 + 1 + 4} = \sqrt{6}$.

$$\cos\theta = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}||\vec{b}|} = \frac{-1}{\sqrt{14}\sqrt{6}} = \frac{-1}{\sqrt{84}} \approx -0.109.$$

So $\theta = \cos^{-1}(-1/\sqrt{84}) \approx 96.3°$. (The negative sign tells us the angle is obtuse.)

**Example 2 — area of a triangle by cross product.** Find the area of the triangle with vertices $A(1, 1, 1)$, $B(2, 3, 5)$, $C(4, 0, -1)$.

Form two edge vectors:

$$\vec{AB} = (1, 2, 4), \quad \vec{AC} = (3, -1, -2).$$

Cross product:

$$\vec{AB} \times \vec{AC} = \det\begin{pmatrix} \hat{i} & \hat{j} & \hat{k} \\ 1 & 2 & 4 \\ 3 & -1 & -2 \end{pmatrix} = \hat{i}(2 \cdot (-2) - 4 \cdot (-1)) - \hat{j}(1 \cdot (-2) - 4 \cdot 3) + \hat{k}(1 \cdot (-1) - 2 \cdot 3).$$

$$= \hat{i}(-4 + 4) - \hat{j}(-2 - 12) + \hat{k}(-1 - 6) = 0\hat{i} + 14\hat{j} - 7\hat{k}.$$

Magnitude: $|\vec{AB} \times \vec{AC}| = \sqrt{0 + 196 + 49} = \sqrt{245} = 7\sqrt{5}$.

Area $= \tfrac{1}{2} \cdot 7\sqrt{5} = \tfrac{7\sqrt{5}}{2}$ square units.

**Example 3 — coplanarity test.** Are $\vec{a} = \hat{i} + 2\hat{j} - \hat{k}$, $\vec{b} = 3\hat{i} - 2\hat{k}$, $\vec{c} = 2\hat{i} + 4\hat{j} + \hat{k}$ coplanar?

Three vectors are coplanar iff the **scalar triple product** is zero:

$$[\vec{a}, \vec{b}, \vec{c}] = \vec{a} \cdot (\vec{b} \times \vec{c}) = \det\begin{pmatrix} 1 & 2 & -1 \\ 3 & 0 & -2 \\ 2 & 4 & 1 \end{pmatrix}.$$

Expand along row 1:

$$= 1 \cdot (0 \cdot 1 - (-2) \cdot 4) - 2 \cdot (3 \cdot 1 - (-2) \cdot 2) + (-1) \cdot (3 \cdot 4 - 0 \cdot 2) = 8 - 14 - 12 = -18.$$

$-18 \ne 0$, so the three vectors are **not coplanar**.

**Example 4 — projection of $\vec{a}$ on $\vec{b}$.** $\vec{a} = (3, 1, 2)$, $\vec{b} = (1, 2, 2)$. Find the (scalar) projection of $\vec{a}$ on $\vec{b}$.

$$\text{proj}_{\vec{b}}\vec{a} = \frac{\vec{a} \cdot \vec{b}}{|\vec{b}|} = \frac{3 \cdot 1 + 1 \cdot 2 + 2 \cdot 2}{\sqrt{1 + 4 + 4}} = \frac{9}{3} = 3.$$

(The full vector projection is $\text{proj}_{\vec{b}}\vec{a} \cdot \hat{b} = 3 \cdot \tfrac{1}{3}(1, 2, 2) = (1, 2, 2)$, but the scalar projection alone is enough for many problems.)

## Python Verification

```python
# ── Vector Operations: verifying pen & paper work ───────────
import numpy as np

# Dot product
a = np.array([2, 3])
b = np.array([4, -1])
print("=== Dot product ===")
print(f"{a} · {b} = {np.dot(a, b)}")  # 5

a3 = np.array([1, 2, 3])
b3 = np.array([4, -5, 6])
print(f"{a3} · {b3} = {np.dot(a3, b3)}")  # 12

# Magnitude
v = np.array([3, 4])
print(f"\n=== Magnitude ===")
print(f"||{v}|| = {np.linalg.norm(v)}")  # 5

# Unit vector
print(f"\n=== Unit vector ===")
unit = v / np.linalg.norm(v)
print(f"Normalised: {unit}")
print(f"Magnitude check: {np.linalg.norm(unit):.10f}")  # 1.0

# Angle between vectors
print(f"\n=== Angle between vectors ===")
a = np.array([1, 0])
b = np.array([1, 1])
cos_theta = np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
theta = np.arccos(cos_theta)
print(f"cos(θ) = {cos_theta:.4f}")
print(f"θ = {np.degrees(theta):.1f}°")  # 45°

# Orthogonal check
print(f"\n=== Orthogonality ===")
u = np.array([1, 0])
v = np.array([0, 1])
print(f"{u} · {v} = {np.dot(u, v)} → orthogonal: {np.dot(u, v) == 0}")

# Projection
print(f"\n=== Projection ===")
a = np.array([1, 0])
b = np.array([3, 4])
proj = (np.dot(a, b) / np.dot(a, a)) * a
print(f"proj_a(b) = {proj}")  # [3, 0]

# Cross product
print(f"\n=== Cross product ===")
x = np.array([1, 0, 0])
y = np.array([0, 1, 0])
print(f"x̂ × ŷ = {np.cross(x, y)}")  # [0, 0, 1]

a = np.array([2, 3, 4])
b = np.array([5, 6, 7])
cross = np.cross(a, b)
print(f"{a} × {b} = {cross}")  # [-3, 6, -3]

# Verify perpendicularity
print(f"(a×b) · a = {np.dot(cross, a)}")  # 0
print(f"(a×b) · b = {np.dot(cross, b)}")  # 0
```

## Visualisation — Vector arithmetic in 2-D

Every operation in this lesson — addition, scaling, projection, the
dot product — has a one-picture interpretation. Seeing the arrows once
is worth a thousand component-wise calculations.

```python
# ── Visualising vector operations ───────────────────────────
import numpy as np
import matplotlib.pyplot as plt

# Two reference vectors used in three of the four panels.
a = np.array([3.0, 1.0])
b = np.array([1.0, 2.0])

fig, axes = plt.subplots(2, 2, figsize=(11, 10))

# (1) Vector addition by the parallelogram (or tip-to-tail) rule.
# Place b's tail at a's tip; the sum a + b is the diagonal arrow.
ax = axes[0, 0]
s = a + b
ax.quiver(0, 0,    *a, angles="xy", scale_units="xy", scale=1, color="tab:blue",  width=0.012)
ax.quiver(0, 0,    *b, angles="xy", scale_units="xy", scale=1, color="tab:orange", width=0.012)
ax.quiver(*a,      *b, angles="xy", scale_units="xy", scale=1, color="tab:orange", alpha=0.4, width=0.012)
ax.quiver(*b,      *a, angles="xy", scale_units="xy", scale=1, color="tab:blue",   alpha=0.4, width=0.012)
ax.quiver(0, 0,    *s, angles="xy", scale_units="xy", scale=1, color="tab:green",  width=0.012)
ax.text(*(a/2 + np.array([0.05, -0.25])), "a", fontsize=14, color="tab:blue")
ax.text(*(b/2 + np.array([-0.3, 0.0])),   "b", fontsize=14, color="tab:orange")
ax.text(*(s/2 + np.array([0.1, 0.15])),   "a + b", fontsize=14, color="tab:green")
ax.set_title("Addition: tip-to-tail / parallelogram rule")

# (2) Scalar multiplication: stretches or flips an arrow without
# changing its line of action.
ax = axes[0, 1]
v = np.array([2.0, 1.0])
ax.quiver(0, 0,  *v,        angles="xy", scale_units="xy", scale=1, color="tab:blue",   width=0.012, label="v")
ax.quiver(0, 0,  *(2 * v),  angles="xy", scale_units="xy", scale=1, color="tab:orange", width=0.012, label="2v (twice as long)")
ax.quiver(0, 0,  *(0.5*v),  angles="xy", scale_units="xy", scale=1, color="tab:green",  width=0.012, label="0.5v")
ax.quiver(0, 0,  *(-1*v),   angles="xy", scale_units="xy", scale=1, color="tab:red",    width=0.012, label="-v (flipped)")
ax.set_title("Scalar multiplication: stretch / shrink / flip")
ax.legend(loc="lower right", fontsize=9)

# (3) Dot product as a projection. The component of a along b̂ is
# (a · b̂); we mark the foot of the perpendicular dropped from a.
ax = axes[1, 0]
b_hat = b / np.linalg.norm(b)
proj_len = a @ b_hat
proj_vec = proj_len * b_hat
ax.quiver(0, 0, *a, angles="xy", scale_units="xy", scale=1,
          color="tab:blue", width=0.012, label="a")
ax.quiver(0, 0, *b, angles="xy", scale_units="xy", scale=1,
          color="tab:orange", width=0.012, label="b (direction of projection)")
ax.quiver(0, 0, *proj_vec, angles="xy", scale_units="xy", scale=1,
          color="tab:green", width=0.012,
          label=f"projection of a onto b\n|proj| = a·b̂ = {proj_len:.3f}")
# Dashed perpendicular from a's tip to the projection.
ax.plot([a[0], proj_vec[0]], [a[1], proj_vec[1]],
        color="grey", linestyle="--", lw=1)
ax.set_title("Dot product → projection length")
ax.legend(loc="upper right", fontsize=9)

# (4) Right-hand rule for the cross product (3-D, drawn from above).
# a × b is a NEW vector perpendicular to both, pointing out of the
# plane (here represented by a circle marker for "into the page").
ax = axes[1, 1]
a3 = np.array([2.0, 1.0])
b3 = np.array([1.0, 2.0])
ax.quiver(0, 0, *a3, angles="xy", scale_units="xy", scale=1,
          color="tab:blue", width=0.012, label="a (in plane)")
ax.quiver(0, 0, *b3, angles="xy", scale_units="xy", scale=1,
          color="tab:orange", width=0.012, label="b (in plane)")
ax.scatter([0], [0], color="tab:purple", s=200, marker="o",
           zorder=5, label="a × b: out of page\n(right-hand rule)")
ax.text(0.0, -0.4, "a × b ⊥ to both", color="tab:purple", fontsize=10)
ax.set_title("Cross product = vector ⊥ to both")
ax.legend(loc="upper right", fontsize=9)

# Common cosmetics for all four axes.
for ax in axes.flatten():
    ax.set_xlim(-3, 5); ax.set_ylim(-2, 4)
    ax.axhline(0, color="black", lw=0.5); ax.axvline(0, color="black", lw=0.5)
    ax.set_aspect("equal"); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Print the numerical answers so the picture is grounded.
print(f"a + b      = {tuple(a + b)}                   (the green arrow)")
print(f"2a         = {tuple(2 * a)}                   ('stretch by 2')")
print(f"a · b      = {a @ b:.4f}                      ('how aligned' a and b are)")
print(f"a · b / |b|  = {(a @ b) / np.linalg.norm(b):.4f}  (length of green proj arrow)")
print(f"a × b (3-D) = {np.cross(np.array([3,1,0]), np.array([1,2,0]))}  "
      f"(only z-component is non-zero)")
```

**Four take-aways for free:**

- **Addition** is geometric — just slide one arrow's tail to the other's
  tip; the resultant arrow is the sum. There is nothing "componentwise"
  about it; the components only fall out from this picture.
- **Scalar multiplication** doesn't change a vector's *direction* —
  positive scalars stretch or shrink along the same line, negative
  scalars flip and stretch.
- **Dot product = projection length × magnitude.** The green arrow's
  length is what most people *intuitively* think of as "how much of
  $\mathbf{a}$ is in the direction of $\mathbf{b}$" — that's literally
  $\mathbf{a} \cdot \hat{\mathbf{b}}$, and it falls right out of the
  formula.
- **Cross product** outputs a *new vector*, perpendicular to both
  inputs (in 3-D only). This is why physics uses it for torque, angular
  momentum, magnetic force — anything where rotation around an axis
  matters.

## Connection to CS / Games / AI / Business / Industry

- **Dot product** — cosine similarity in recommendation engines and NLP embeddings
- **Orthogonality** — independent features in ML, orthonormal bases in signal processing
- **Projection** — shadow rendering, camera projection in 3D graphics
- **Cross product** — surface normals for lighting in 3D rendering, torque in physics engines
- **The neuron** — a neuron computes $\sigma(\mathbf{w} \cdot \mathbf{x} + b)$: the dot product is its core operation
- **Finance — factor models at AQR and Two Sigma** — expected return on a stock is the dot product $\mathbf{f} \cdot \mathbf{\beta}$ of factor exposures (value, momentum, quality) with their premia, the basis of Fama-French and BARRA risk models.
- **Operations — Amazon "customers who bought" recommender** — item-item cosine similarity (a normalized dot product) over purchase vectors powers Amazon's "Frequently bought together" widget, generating an estimated 35% of Amazon's revenue.
- **Engineering / Robotics — torque on robotic arms** — the cross product $\mathbf{\tau} = \mathbf{r} \times \mathbf{F}$ is computed every control cycle on Boston Dynamics' Atlas and KUKA industrial arms to balance loads.
- **Physics — Lorentz force in particle accelerators** — CERN's LHC steers protons using $\mathbf{F} = q\mathbf{v} \times \mathbf{B}$, a cross product evaluated by superconducting magnet control systems thousands of times per second.
- **Board Exam / JEE (CBSE Class 12, Chapter 10 — Vector Algebra)** — NCERT Ex 10.3–10.4 drill the **dot product** $\vec{a} \cdot \vec{b} = |\vec{a}||\vec{b}|\cos\theta = a_1 b_1 + a_2 b_2 + a_3 b_3$ and the **cross product** $\vec{a} \times \vec{b} = (|\vec{a}||\vec{b}|\sin\theta)\,\hat{n}$, with components from the determinant expansion $\begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ a_1 & a_2 & a_3 \\ b_1 & b_2 & b_3 \end{vmatrix}$. JEE Mains Q-types: (i) angle between two vectors via $\cos\theta = (\vec{a} \cdot \vec{b})/(|\vec{a}||\vec{b}|)$; (ii) **projection** of $\vec{a}$ on $\vec{b}$: $(\vec{a} \cdot \vec{b})/|\vec{b}|$; (iii) **scalar triple product** $[\vec{a}, \vec{b}, \vec{c}] = \vec{a} \cdot (\vec{b} \times \vec{c})$ — equals 0 iff coplanar; (iv) area of triangle $\tfrac{1}{2}|\vec{AB} \times \vec{AC}|$, area of parallelogram $|\vec{a} \times \vec{b}|$.
- **Common pitfalls drilled in NCERT** — (a) the cross product is **anti-commutative**: $\vec{a} \times \vec{b} = -\vec{b} \times \vec{a}$, while the dot product is commutative; (b) $\vec{a} \times \vec{a} = \vec{0}$ for every $\vec{a}$; (c) $\hat{i} \times \hat{j} = \hat{k}$, $\hat{j} \times \hat{k} = \hat{i}$, $\hat{k} \times \hat{i} = \hat{j}$ (cyclic — going the other way flips the sign); (d) two vectors are perpendicular iff $\vec{a} \cdot \vec{b} = 0$, parallel iff $\vec{a} \times \vec{b} = \vec{0}$.

## Check Your Understanding

1. **Pen & paper:** Compute $\begin{pmatrix} 1 \\ -2 \\ 3 \end{pmatrix} \cdot \begin{pmatrix} 4 \\ 0 \\ -1 \end{pmatrix}$.
2. **Pen & paper:** Find the angle between $\begin{pmatrix} 1 \\ 1 \end{pmatrix}$ and $\begin{pmatrix} -1 \\ 1 \end{pmatrix}$. (What is their dot product? What does that tell you?)
3. **Pen & paper:** Compute $\begin{pmatrix} 1 \\ 2 \\ 0 \end{pmatrix} \times \begin{pmatrix} 0 \\ 1 \\ 3 \end{pmatrix}$ and verify the result is perpendicular to both input vectors.
4. **Think about it:** If two word embedding vectors have cosine similarity close to 1, what does that mean about the words?
