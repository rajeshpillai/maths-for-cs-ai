---
strand: shape-space
level: advanced
order: 1
title: Projective Transformations and Homographies
prerequisites:
  - tier: strand-3-shape-space-advanced
    slug: 00-projective-coordinates
    description: Projective coordinates
connections:
  - strand-3-shape-space-advanced/02-curves-and-curvature
applications:
  - cs: "Image stitching, AR markers, camera calibration"
  - life: "Mapping one projective plane to another"
---

# Projective Transformations and Homographies

## Explain Like I Am 7

Take a photograph of a checkerboard from straight above — every
square is a perfect square.  Now take a photo of the same board
from off to the side: the squares look like wonky kites, the lines
that were parallel now meet at a faraway point.  A **projective
transformation** is the math recipe that bends the first picture
into the second.  Phones and self-driving cars use it to "un-tilt"
photos and read straightened-out signs from sideways angles.

## Mental

A **projective transformation** of $\mathbb{RP}^n$ is a map of
homogeneous coordinates by an invertible $(n+1) \times (n+1)$ matrix:

$$
[\mathbf{x}] \mapsto [A \mathbf{x}].
$$

In $\mathbb{RP}^2$ this is a $3 \times 3$ matrix called a **homography**.
The matrix is unique up to scalar multiplication.

8 free parameters in a $\mathbb{RP}^2$ homography: 9 entries minus 1
overall scale.

## What homographies preserve and don't

| Property | Preserved? |
|---|---|
| Lines mapping to lines | ✓ |
| Cross-ratio of four collinear points | ✓ |
| Parallelism | ✗ (only affine maps) |
| Lengths and angles | ✗ |
| Conics mapping to conics | ✓ |
| Tangency | ✓ |

**Cross-ratio** $(A, B; C, D) = \frac{AC \cdot BD}{AD \cdot BC}$ is the
fundamental projective invariant — four collinear points have a
well-defined cross-ratio that homographies preserve.

## Worked example: rectifying a photographed rectangle

A camera photographs a rectangle on a wall; the resulting image shows
a quadrilateral. To "rectify" — remove perspective distortion — find
the homography mapping the four image corners to the four
known-rectangular corners. 4 point correspondences give 8 equations
(2 per point) for the 8-DOF matrix.

This is **exactly** what AR markers and document scanners do.

## Interactive

:::widget type=numeric-input prompt="A homography in $\\mathbb{RP}^2$ has $? $ free parameters." answer=8 explain="$8$ — 9 entries minus scale.":::

:::widget type=numeric-input prompt="Homographies preserve lines, conics, cross-ratio — but not parallelism. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="To recover an 8-DOF homography from point correspondences, you need at least how many points (each gives 2 equations)?" answer=4 explain="$4$.":::

:::widget type=numeric-input prompt="Cross-ratio is invariant under projective transformations. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Affine vs projective**: a projective transformation is affine iff
the bottom row of its matrix is $(0, 0, 1)$. Affine transformations
preserve parallelism; general projective ones don't.

**Composition is matrix multiplication**: $H_2 \circ H_1$ corresponds
to $H_2 \cdot H_1$ as matrices.

**Direct Linear Transformation (DLT)**: stack the 8 equations from 4
point correspondences into a linear system $Ax = 0$; the homography
matrix entries are the null-vector. SVD finds it numerically.

**RANSAC** is used in practice to find homographies robustly when many
point matches are outliers (used in OpenCV's `cv2.findHomography`).

## Computational

```python
import numpy as np

def homography_from_4(src_pts, dst_pts):
    A = []
    for (x, y), (u, v) in zip(src_pts, dst_pts):
        A.append([x, y, 1, 0, 0, 0, -u*x, -u*y, -u])
        A.append([0, 0, 0, x, y, 1, -v*x, -v*y, -v])
    A = np.array(A)
    _, _, V = np.linalg.svd(A)
    H = V[-1].reshape(3, 3)
    return H / H[2, 2]

# Map unit square to a quadrilateral
src = [(0, 0), (1, 0), (1, 1), (0, 1)]
dst = [(0, 0), (2, 0), (3, 2), (1, 1)]
H = homography_from_4(src, dst)
print(H)

def apply_homography(H, p):
    x, y = p
    z = H @ np.array([x, y, 1])
    return (z[0]/z[2], z[1]/z[2])

for p in src:
    print(p, "->", apply_homography(H, p))    # should hit dst points

# Cross-ratio of four collinear points (1D projective)
def cross_ratio(a, b, c, d):
    return ((c - a) * (d - b)) / ((d - a) * (c - b))

print(cross_ratio(0, 1, 2, 3))   # specific cross-ratio
```

## Applied

- **Image stitching** — panoramas align overlapping images by finding
  the homography from one to the next via SIFT/ORB feature matches.
- **AR markers (ArUco, AprilTag)** — detect a marker's four corners,
  recover its 3D pose by inverting the homography.
- **Document scanners** — apps like CamScanner detect a sheet's
  corners, apply the rectifying homography.
- **3D reconstruction** — multiple views of a planar scene related by
  homographies; structure-from-motion uses homographies for special
  cases.
- **Game engines — 2D parallax** — projective texture mapping for
  pseudo-3D effects.

## Check Your Understanding

:::widget type=numeric-input prompt="A 3×3 homography has 8 DOF (9 entries − 1 scale). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="At least 4 non-collinear point pairs determine a $\\mathbb{RP}^2$ homography. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cross-ratio $(0, 1; 2, 3) = (2 \\cdot 2)/(3 \\cdot 1) = 4/3 \\approx 1.3333$. Type 4 dp." answer=1.3333 tolerance=0.005 explain="$4/3$.":::

:::widget type=numeric-input prompt="Affine transformations preserve parallelism; projective transformations may not. Type 1." answer=1 explain="Yes.":::
