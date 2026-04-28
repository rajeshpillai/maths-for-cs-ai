# Linear Transformations — What a Matrix Does to Space

## Intuition

A matrix isn't just a grid of numbers.  It's an **action** — it stretches,
rotates, reflects, or shears space.  When you multiply a vector by a matrix,
you're transforming that vector.  Every 2D or 3D animation, every neural
network layer, and every data projection is a linear transformation in
disguise.

## Mental model — the rubber grid and two sticks

Before any formulas, picture this physical setup.  We will make every part
of the picture precise below; treat this section as a *mental model you can
run in your head*.

### Step 1 — what you start with

- You stand at the origin $(0, 0)$ of the 2D plane.
- You hold **two rigid sticks**, both with their tail at the origin:
  - **Stick 1** is the unit vector $\mathbf{e}_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$ — pointing one step **right**.
  - **Stick 2** is the unit vector $\mathbf{e}_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$ — pointing one step **up**.
- The whole plane around you is a **rubber sheet** with a faint square grid drawn on it.  The grid lines pass through every integer coordinate.
- The two sticks are **glued to the rubber sheet** at the points $(1,0)$ and $(0,1)$.

That is the "before" picture.

### Step 2 — what a 2×2 matrix tells you to do

A 2×2 matrix

$$\mathbf{A} = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$$

is read column by column as **two instructions**:

- **Column 1** $= \begin{pmatrix} a \\ c \end{pmatrix}$ → "move the tip of stick 1 *to this point*."
- **Column 2** $= \begin{pmatrix} b \\ d \end{pmatrix}$ → "move the tip of stick 2 *to this point*."

That's it.  The matrix is a list of **destinations for the two sticks**.  It
contains no other information — and it doesn't need to, because of step 3.

### Step 3 — the rubber sheet follows

When you move the sticks, the rubber sheet — every grid line, every point on
the plane — **stretches with them**.  This is *exactly* what "linear
transformation" means: the plane deforms in such a way that

- The origin stays fixed (you didn't move stick tails).
- Straight lines stay straight (the rubber is uniform — no buckling).
- Parallel lines stay parallel (the deformation is the *same everywhere*).
- Equal spacings stay equal (a grid line two units to the right of another stays "two new-units" to the right after the warp).

These four properties are the **only** thing the formal definition (next
section) is encoding.  If you can picture the rubber sheet warping while
keeping these properties, you understand linear transformations.

### Step 4 — every other point comes along for the ride

Where does an arbitrary point $(x, y)$ end up?  Because the rubber preserves
the grid, the point $(x, y)$ — which is "$x$ steps along stick 1 plus $y$
steps along stick 2" before the warp — must be "$x$ steps along the **new**
stick 1 plus $y$ steps along the **new** stick 2" after the warp:

$$\mathbf{A} \begin{pmatrix} x \\ y \end{pmatrix} = x \cdot (\text{column 1 of } \mathbf{A}) + y \cdot (\text{column 2 of } \mathbf{A}).$$

This is exactly the rule from Lesson 4 (the column perspective of matrix
multiplication).  Now you know *why* it's true: it's the only way to move
each point that is consistent with "the rubber follows the sticks".

### Concrete walk-through

Take

$$\mathbf{A} = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}.$$

The matrix says:

- Move the tip of stick 1 from $(1,0)$ to $(2,1)$.  *(That's column 1.)*
- Move the tip of stick 2 from $(0,1)$ to $(1,1)$.  *(That's column 2.)*

Where does the point $(3, 2)$ go?  Apply the rule from Step 4:

$$\mathbf{A} \begin{pmatrix} 3 \\ 2 \end{pmatrix} = 3 \cdot \begin{pmatrix} 2 \\ 1 \end{pmatrix} + 2 \cdot \begin{pmatrix} 1 \\ 1 \end{pmatrix} = \begin{pmatrix} 6 \\ 3 \end{pmatrix} + \begin{pmatrix} 2 \\ 2 \end{pmatrix} = \begin{pmatrix} 8 \\ 5 \end{pmatrix}.$$

Verify by ordinary matrix-vector multiplication:

$$\begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix} \begin{pmatrix} 3 \\ 2 \end{pmatrix} = \begin{pmatrix} 2(3) + 1(2) \\ 1(3) + 1(2) \end{pmatrix} = \begin{pmatrix} 8 \\ 5 \end{pmatrix}.\ \checkmark$$

The two answers must match — and they do, because the rule is just
"row × column" written from the column-perspective viewpoint.

> **One-line summary.**  A 2×2 matrix is a **new pair of basis sticks**, and
> the whole rubber-sheet plane warps so that those sticks become the new $x$
> and $y$ axes.  Every other point rides along with the grid.  3D works the
> same way with three sticks instead of two; $n$-D needs $n$ sticks.

## Prerequisites

- Tier 2, Lesson 4: Matrix Multiplication

## From First Principles

### What is a linear transformation?

A function $T: \mathbb{R}^n \to \mathbb{R}^m$ is **linear** if:

1. $T(\mathbf{u} + \mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v})$ (preserves addition)
2. $T(c\mathbf{u}) = cT(\mathbf{u})$ (preserves scalar multiplication)

Equivalently: $T(c_1\mathbf{u} + c_2\mathbf{v}) = c_1 T(\mathbf{u}) + c_2 T(\mathbf{v})$

> **Key insight:** Every linear transformation can be represented by a matrix,
> and every matrix represents a linear transformation.

### How to find the matrix

The matrix of a transformation is found by seeing **where the standard basis
vectors go**.

For $T: \mathbb{R}^2 \to \mathbb{R}^2$, the matrix is:

$$\mathbf{A} = \begin{pmatrix} | & | \\ T(\mathbf{e}_1) & T(\mathbf{e}_2) \\ | & | \end{pmatrix}$$

where $\mathbf{e}_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$ and $\mathbf{e}_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$.

### Example transformations (pen & paper)

**Scaling:**

Scale x by 2, y by 3:

$T(\mathbf{e}_1) = \begin{pmatrix} 2 \\ 0 \end{pmatrix}$, $T(\mathbf{e}_2) = \begin{pmatrix} 0 \\ 3 \end{pmatrix}$

$$\mathbf{A} = \begin{pmatrix} 2 & 0 \\ 0 & 3 \end{pmatrix}$$

**Verify:** $\begin{pmatrix} 2 & 0 \\ 0 & 3 \end{pmatrix}\begin{pmatrix} 1 \\ 1 \end{pmatrix} = \begin{pmatrix} 2 \\ 3 \end{pmatrix}$ ✓

**Reflection across x-axis:**

$T(\mathbf{e}_1) = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$, $T(\mathbf{e}_2) = \begin{pmatrix} 0 \\ -1 \end{pmatrix}$

$$\mathbf{A} = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$$

**Rotation by angle $\theta$:**

$T(\mathbf{e}_1) = \begin{pmatrix} \cos\theta \\ \sin\theta \end{pmatrix}$, $T(\mathbf{e}_2) = \begin{pmatrix} -\sin\theta \\ \cos\theta \end{pmatrix}$

$$\mathbf{R}_\theta = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$$

**Pen & paper: Rotate by 90°**

$\cos 90° = 0$, $\sin 90° = 1$:

$$\mathbf{R}_{90°} = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$$

Check: $\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}\begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$ — the x-axis maps to the y-axis ✓

**Shear:**

$$\begin{pmatrix} 1 & k \\ 0 & 1 \end{pmatrix}$$

Shifts the x-coordinate by $k$ times the y-coordinate.  Rectangles become parallelograms.

**Pen & paper: Shear with $k = 2$**

$$\begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix}\begin{pmatrix} 1 \\ 1 \end{pmatrix} = \begin{pmatrix} 3 \\ 1 \end{pmatrix}$$

### Composition = matrix multiplication

Applying $T_1$ then $T_2$ = multiplying their matrices: $\mathbf{A}_2 \mathbf{A}_1$

**Pen & paper: Scale by 2, then rotate 90°**

$$\mathbf{R}_{90°} \mathbf{S}_2 = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix} = \begin{pmatrix} 0 & -2 \\ 2 & 0 \end{pmatrix}$$

Apply to $\begin{pmatrix} 1 \\ 0 \end{pmatrix}$: $\begin{pmatrix} 0 \\ 2 \end{pmatrix}$ — scaled to length 2, rotated to y-axis ✓

> **Order matters!** Rotate-then-scale ≠ scale-then-rotate (in general).

### Summary of 2D transformations

| Transformation | Matrix |
|---------------|--------|
| Scale $(s_x, s_y)$ | $\begin{pmatrix} s_x & 0 \\ 0 & s_y \end{pmatrix}$ |
| Rotation by $\theta$ | $\begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$ |
| Reflect x-axis | $\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$ |
| Reflect y-axis | $\begin{pmatrix} -1 & 0 \\ 0 & 1 \end{pmatrix}$ |
| Shear x | $\begin{pmatrix} 1 & k \\ 0 & 1 \end{pmatrix}$ |
| Projection onto x | $\begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}$ |

### What is NOT a linear transformation?

**Translation** $T(\mathbf{x}) = \mathbf{x} + \mathbf{b}$ is **not linear** because $T(\mathbf{0}) = \mathbf{b} \ne \mathbf{0}$.

> That's why we need **homogeneous coordinates** in 3D graphics (Tier 8) — they let us represent translation as matrix multiplication.

## Visualisation — Warping the rubber grid

We can now draw, for any 2×2 matrix $\mathbf{A}$, exactly what happens to
the rubber-sheet plane when you "move the two sticks".  The recipe is:

1. Pick a regular grid of points before the transformation (the *original
   rubber sheet*).
2. Apply $\mathbf{A}$ to **every** grid point.  Because of linearity, it is
   enough to apply $\mathbf{A}$ to the endpoints of each grid line — the
   line in between transforms uniformly.
3. Draw the original grid in light grey and the transformed grid in colour,
   in the same axes.  Highlight the unit square (before) and its image
   (after) so you can see what the matrix did to a "1 × 1 patch" of plane.

### Python: side-by-side warps for 4 transformation types

```python
# ── Linear transformations: rubber-grid visualisation ────────
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon

# A helper that draws "what A does to the plane".
#   - Light grey: the original square grid (the undeformed rubber sheet).
#   - Coloured:   the same grid after every point is multiplied by A.
#   - Filled square: the unit square [0,1] × [0,1] before transformation.
#   - Filled parallelogram: the image of the unit square (the new "tile").
#   - Faint arrows: original e1, e2 (red, green).
#   - Solid arrows: A·e1, A·e2 (red, green) — these ARE the columns of A.
def draw_warp(ax, A, title):
    # Grid lines run from -3 to 3 in both x and y, spaced every 1 unit.
    GRID_MIN, GRID_MAX, STEP = -3.0, 3.0, 1.0
    SAMPLES = 60                                # points per line
    grid_lines = np.arange(GRID_MIN, GRID_MAX + STEP, STEP)

    # Vertical lines: x = constant, y sweeps the range.
    for x in grid_lines:
        ys = np.linspace(GRID_MIN, GRID_MAX, SAMPLES)
        line = np.vstack([np.full_like(ys, x), ys])      # shape (2, SAMPLES)
        warped = A @ line                                # apply matrix
        ax.plot(line[0], line[1], color="lightgrey", lw=0.7, alpha=0.7)
        ax.plot(warped[0], warped[1], color="tab:blue", lw=1.0, alpha=0.8)

    # Horizontal lines: y = constant, x sweeps the range.
    for y in grid_lines:
        xs = np.linspace(GRID_MIN, GRID_MAX, SAMPLES)
        line = np.vstack([xs, np.full_like(xs, y)])
        warped = A @ line
        ax.plot(line[0], line[1], color="lightgrey", lw=0.7, alpha=0.7)
        ax.plot(warped[0], warped[1], color="tab:orange", lw=1.0, alpha=0.8)

    # Unit square (before) and its image (after).
    square = np.array([[0, 1, 1, 0], [0, 0, 1, 1]], dtype=float)   # 2×4
    warped_square = A @ square
    ax.add_patch(Polygon(square.T, closed=True,
                         facecolor="black", alpha=0.08, edgecolor="dimgrey"))
    ax.add_patch(Polygon(warped_square.T, closed=True,
                         facecolor="tab:red", alpha=0.30, edgecolor="darkred", lw=1.5))

    # Basis vectors before (faint) and after (solid). Columns of A = images.
    ax.quiver(0, 0, 1, 0, angles="xy", scale_units="xy", scale=1,
              color="red",   alpha=0.25, width=0.012)
    ax.quiver(0, 0, 0, 1, angles="xy", scale_units="xy", scale=1,
              color="green", alpha=0.25, width=0.012)
    ax.quiver(0, 0, A[0, 0], A[1, 0], angles="xy", scale_units="xy", scale=1,
              color="red",   width=0.012)         # A · e1
    ax.quiver(0, 0, A[0, 1], A[1, 1], angles="xy", scale_units="xy", scale=1,
              color="green", width=0.012)         # A · e2

    ax.set_title(title)
    ax.set_xlim(-3.5, 3.5); ax.set_ylim(-3.5, 3.5)
    ax.set_aspect("equal")
    ax.axhline(0, color="black", lw=0.4)
    ax.axvline(0, color="black", lw=0.4)

# Four representative 2×2 matrices.
theta = np.radians(60)            # 60° rotation
cases = [
    ("Rotation by 60°",
     np.array([[np.cos(theta), -np.sin(theta)],
               [np.sin(theta),  np.cos(theta)]])),
    ("Non-uniform scale (1.5×, 0.7×)",
     np.array([[1.5, 0.0],
               [0.0, 0.7]])),
    ("Shear in x  (k = 1)",
     np.array([[1.0, 1.0],
               [0.0, 1.0]])),
    ("Combined: tilt + stretch",
     np.array([[1.5, -0.5],
               [0.5,  1.2]])),
]

fig, axes = plt.subplots(1, 4, figsize=(20, 5))
for ax, (title, A) in zip(axes, cases):
    draw_warp(ax, A, title)
plt.tight_layout()
plt.show()

# Print numerical fingerprints so the picture is grounded in numbers.
print("Matrix              | A · e1     | A · e2     | det(A)")
print("-" * 60)
for name, A in cases:
    Ae1 = A @ np.array([1.0, 0.0])     # = first  column of A
    Ae2 = A @ np.array([0.0, 1.0])     # = second column of A
    print(f"{name:<19} | ({Ae1[0]:+.2f},{Ae1[1]:+.2f}) | ({Ae2[0]:+.2f},{Ae2[1]:+.2f}) | {np.linalg.det(A):+.3f}")
```

**How to read each subplot:**

- The **light grey** lines are the *original* square grid — the rubber sheet
  before anyone touched it.
- The **blue and orange** lines are the *same grid after $\mathbf{A}$ has
  been applied to every point*.  Notice the four properties from Step 3 of
  the mental model:
  1. The grids meet at the origin (origin doesn't move).
  2. Each transformed grid line is still **straight**.
  3. Lines that were parallel before are still parallel after.
  4. Equally-spaced lines stay equally spaced (just by a new spacing).
- The **red and green arrows** are the basis vectors.  The faded arrows are
  $\mathbf{e}_1, \mathbf{e}_2$ before; the solid arrows are
  $\mathbf{A}\mathbf{e}_1, \mathbf{A}\mathbf{e}_2$ — and these are
  numerically equal to the **columns of $\mathbf{A}$**.  This is the
  "two sticks" of the mental model.
- The **dark-grey filled square** is the original unit square $[0,1]\times[0,1]$.
  The **red filled parallelogram** is its image — the "new unit cell" of the
  warped grid.

> **Bridge to the next lesson.**  The signed area of the red parallelogram
> is the **determinant** of $\mathbf{A}$ (Lesson 7).  Pure rotations
> preserve area ($|\det| = 1$); non-uniform scales change it; pure shears
> also preserve it; combined transforms can do anything except, by being
> linear, bend lines or move the origin.

## Python Verification

```python
# ── Linear Transformations: verifying pen & paper work ──────
import numpy as np

# Scaling
S = np.array([[2, 0], [0, 3]])
v = np.array([1, 1])
print("=== Scaling ===")
print(f"Scale(1,1) = {S @ v}")

# Reflection
R_ref = np.array([[1, 0], [0, -1]])
print(f"\n=== Reflection across x-axis ===")
print(f"Reflect(1,1) = {R_ref @ np.array([1, 1])}")

# Rotation by 90°
theta = np.radians(90)
R90 = np.array([[np.cos(theta), -np.sin(theta)],
                [np.sin(theta),  np.cos(theta)]])
print(f"\n=== Rotation by 90° ===")
# Round to avoid floating point noise
print(f"Rotate(1,0) = {np.round(R90 @ np.array([1, 0]), 10)}")
print(f"Rotate(0,1) = {np.round(R90 @ np.array([0, 1]), 10)}")

# Shear
K = np.array([[1, 2], [0, 1]])
print(f"\n=== Shear (k=2) ===")
print(f"Shear(1,1) = {K @ np.array([1, 1])}")

# Composition: scale by 2, then rotate 90°
S2 = np.array([[2, 0], [0, 2]])
composed = R90 @ S2
print(f"\n=== Composition: rotate ∘ scale ===")
print(f"Matrix =\n{np.round(composed, 10)}")
print(f"Apply to (1,0) = {np.round(composed @ np.array([1, 0]), 10)}")

# Order matters
scale_then_shear = K @ S2
shear_then_scale = S2 @ K
print(f"\n=== Order matters ===")
print(f"Shear ∘ Scale =\n{scale_then_shear}")
print(f"Scale ∘ Shear =\n{shear_then_scale}")
print(f"Same? {np.array_equal(scale_then_shear, shear_then_scale)}")

# Where do basis vectors go?
print(f"\n=== Basis vectors under rotation 45° ===")
theta45 = np.radians(45)
R45 = np.array([[np.cos(theta45), -np.sin(theta45)],
                [np.sin(theta45),  np.cos(theta45)]])
e1 = np.array([1, 0])
e2 = np.array([0, 1])
print(f"e1 → {np.round(R45 @ e1, 4)}")
print(f"e2 → {np.round(R45 @ e2, 4)}")
```

## Connection to CS / Games / AI

- **3D graphics pipeline** — model → world → view → projection: each is a matrix transformation
- **Neural network layers** — $\mathbf{Wx}$: the weight matrix transforms the input vector
- **Image processing** — rotation, scaling, warping are all matrix transformations on pixel coordinates
- **Data whitening** — decorrelating features before ML is a linear transformation
- **Dimensionality reduction** — PCA projects data onto principal axes (a linear transformation)

## Check Your Understanding

1. **Pen & paper:** Find the matrix that reflects vectors across the line $y = x$.
   (Hint: where does $\mathbf{e}_1$ go? Where does $\mathbf{e}_2$ go?)
2. **Pen & paper:** Compose "reflect across x-axis" then "rotate 90°". Apply the result to $\begin{pmatrix} 1 \\ 0 \end{pmatrix}$.
3. **Pen & paper:** Apply $\begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}$ to several vectors.  What does this transformation do geometrically?
4. **Think about it:** Why does a neural network need non-linear activation functions if each layer is just a linear transformation?
