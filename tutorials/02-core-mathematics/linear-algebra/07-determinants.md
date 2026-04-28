# Determinants — Geometric Meaning

## Intuition

The determinant tells you **how much a transformation scales area (or volume)**.
A 2×2 matrix with determinant 3 triples all areas.  A determinant of 0 means
the transformation collapses space into a lower dimension — a 2D region
squished into a line.  A negative determinant means the transformation flips
orientation (like a mirror).

## Matrix vs Determinant — at a glance

These two are easy to confuse because the symbols look similar.  They are
**not the same kind of object**.

| | Matrix | Determinant |
|---|---|---|
| **What is it?** | A rectangular table of numbers | A single number computed *from* a square matrix |
| **Notation** | Square brackets: $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$ | Vertical bars: $\begin{vmatrix} a & b \\ c & d \end{vmatrix}$, or $\det(\mathbf{A})$ |
| **Defined for** | Any $m \times n$ shape | Only **square** ($n \times n$) matrices |
| **Output type** | Another table (with rows and columns) | One scalar (a real or complex number) |
| **Geometric role** | The transformation itself (it *moves* space) | A *summary* of that transformation: how much it scales area/volume, and whether it flipped orientation |

**Concrete example.** Take

$$\mathbf{A} = \begin{pmatrix} 2 & 3 \\ 1 & 4 \end{pmatrix}$$

- The **matrix** $\mathbf{A}$ is the whole table — four numbers arranged in 2 rows × 2 columns.
- The **determinant** is the single number
  $\det(\mathbf{A}) = \begin{vmatrix} 2 & 3 \\ 1 & 4 \end{vmatrix} = (2)(4) - (3)(1) = 8 - 3 = 5.$

So `A` is a 2×2 table; `det(A)` is the number `5`.  One is the machine, the
other is one number you read off the machine.

> **One-line summary:** A matrix is *what acts on space*.  Its determinant is
> *one number that tells you how much area/volume the action multiplies by,
> and whether orientation got flipped.*

### Determinant "health check" table (2×2 case)

For a 2×2 matrix $\mathbf{A}$, applied to the unit square (area = 1), the
**new area equals $|\det(\mathbf{A})|$**, and the **sign of $\det(\mathbf{A})$
tells you whether orientation was flipped**:

| $\det(\mathbf{A})$ | What it means geometrically | Invertible? |
|---|---|---|
| $> 1$ | Stretches: new area is **larger** than the original | ✓ |
| $= 1$ | Area unchanged (e.g. pure rotation, pure shear) | ✓ |
| $0 < \det < 1$ | Shrinks: new area is **smaller** than the original | ✓ |
| $= 0$ | Collapses: the parallelogram squashes onto a line — area is exactly 0 | ✗ (no inverse) |
| $< 0$ | Same magnitudes as above, but **orientation is flipped** (mirror image) | ✓ |

We will derive *why* $|\det|$ equals the new area in the next section.  The
table is the result you can quote from memory once that derivation is done.

## Prerequisites

- Tier 2, Lesson 5: Linear Transformations
- Tier 2, Lesson 6: Identity, Inverse, Transpose

## From First Principles

### 2×2 determinant

$$\det\begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad - bc$$

**Geometric meaning:** The signed area of the parallelogram formed by the
column vectors $\begin{pmatrix} a \\ c \end{pmatrix}$ and $\begin{pmatrix} b \\ d \end{pmatrix}$.

**Pen & paper:**

$$\det\begin{pmatrix} 3 & 1 \\ 0 & 2 \end{pmatrix} = 3(2) - 1(0) = 6$$

The unit square (area 1) maps to a parallelogram with area 6.

### Sign matters

- $\det > 0$: orientation preserved (right-hand rule stays right-hand)
- $\det < 0$: orientation flipped (like a mirror reflection)
- $\det = 0$: collapsed dimension — **not invertible**

**Pen & paper:**

Reflection across y-axis: $\det\begin{pmatrix} -1 & 0 \\ 0 & 1 \end{pmatrix} = -1$ (flips orientation ✓)

### 3×3 determinant (cofactor expansion)

$$\det\begin{pmatrix} a & b & c \\ d & e & f \\ g & h & i \end{pmatrix} = a(ei - fh) - b(di - fg) + c(dh - eg)$$

**Pen & paper:**

$$\det\begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix}$$

$= 1(5 \cdot 9 - 6 \cdot 8) - 2(4 \cdot 9 - 6 \cdot 7) + 3(4 \cdot 8 - 5 \cdot 7)$
$= 1(45 - 48) - 2(36 - 42) + 3(32 - 35)$
$= 1(-3) - 2(-6) + 3(-3)$
$= -3 + 12 - 9 = 0$

Determinant is 0 — this matrix is **singular** (the rows are linearly dependent: $R_3 = 2R_2 - R_1$, which you can verify: $2(4,5,6) - (1,2,3) = (7,8,9)$).

### Properties of determinants

| Property | Formula |
|----------|---------|
| Product | $\det(\mathbf{AB}) = \det(\mathbf{A})\det(\mathbf{B})$ |
| Transpose | $\det(\mathbf{A}^T) = \det(\mathbf{A})$ |
| Inverse | $\det(\mathbf{A}^{-1}) = 1/\det(\mathbf{A})$ |
| Scalar | $\det(c\mathbf{A}) = c^n \det(\mathbf{A})$ for $n \times n$ matrix |
| Row swap | Swapping two rows negates the determinant |
| Row scaling | Scaling a row by $c$ multiplies det by $c$ |
| Row addition | Adding a multiple of one row to another doesn't change det |

**Pen & paper:** $\det(\mathbf{A}) = 3$, $\det(\mathbf{B}) = 4$.

$\det(\mathbf{AB}) = 12$, $\det(\mathbf{A}^{-1}) = 1/3$, $\det(2\mathbf{A}) = 2^n \times 3$ (for $n \times n$).

### Using row operations to compute determinants

**Pen & paper:** Compute $\det\begin{pmatrix} 2 & 4 \\ 1 & 5 \end{pmatrix}$

Method 1: Formula: $2(5) - 4(1) = 6$

Method 2: Row reduce:
$R_2 \leftarrow R_2 - \frac{1}{2}R_1$: $\begin{pmatrix} 2 & 4 \\ 0 & 3 \end{pmatrix}$

For upper triangular matrices, $\det$ = product of diagonal: $2 \times 3 = 6$ ✓

## Visualisation — The Four Canonical Cases

The fastest way to *see* what $\det(\mathbf{A})$ means is to take the unit
square (the square with corners $(0,0)$, $(1,0)$, $(1,1)$, $(0,1)$, area $= 1$),
apply the matrix $\mathbf{A}$ to each of its four corners, and look at the
resulting shape.  By the **column rule** (proved in Lesson 4), the corners
$(1,0)$ and $(0,1)$ — the two basis vectors — get sent to the **columns of
$\mathbf{A}$**:

$$\mathbf{A} \begin{pmatrix} 1 \\ 0 \end{pmatrix} = \text{column 1 of } \mathbf{A}, \qquad \mathbf{A} \begin{pmatrix} 0 \\ 1 \end{pmatrix} = \text{column 2 of } \mathbf{A}.$$

So the unit square always becomes a **parallelogram whose two edge-vectors
are the columns of $\mathbf{A}$**.  The four cases below show every
qualitatively different thing that can happen to the area of this
parallelogram.

| Case | Matrix $\mathbf{A}$ | $\det(\mathbf{A})$ | What happens to the unit square |
|---|---|---|---|
| **A — Tilt / shear** | $\begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}$ | $+1$ | Becomes a tilted parallelogram, **same area** |
| **B — Stretch** | $\begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix}$ | $+4$ | Becomes a 2×2 square, **area $= 4$** |
| **C — Collapse** | $\begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix}$ | $0$ | The two columns are parallel; the parallelogram **collapses to a line segment**, area $= 0$ |
| **D — Flip** | $\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$ | $-1$ | Same area ($1$), but the square is **reflected** (orientation flipped) |

Read this as: the **magnitude** $|\det(\mathbf{A})|$ is the new area, and the
**sign** of $\det(\mathbf{A})$ tells you whether the transformation flipped
the plane (turned it over like a piece of paper).

### Python: draw all four cases

```python
# ── Determinant visualisation: unit square → parallelogram ──
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon

# The unit square as a list of 4 corner points (counter-clockwise order).
# Counter-clockwise order matters: it lets us detect orientation flips
# (a flip reverses the winding direction).
unit_square = np.array([[0, 0],
                        [1, 0],
                        [1, 1],
                        [0, 1]], dtype=float)

# Each case is (short label, full title, matrix A, axis-limits for the subplot).
cases = [
    ("A — Tilt/shear", "A — Tilt/shear  det = +1", np.array([[2.0, 1.0], [1.0, 1.0]]), (-0.5, 3.5)),
    ("B — Stretch",    "B — Stretch     det = +4", np.array([[2.0, 0.0], [0.0, 2.0]]), (-0.5, 3.5)),
    ("C — Collapse",   "C — Collapse    det =  0", np.array([[1.0, 2.0], [2.0, 4.0]]), (-0.5, 5.5)),
    ("D — Flip",       "D — Flip        det = -1", np.array([[1.0, 0.0], [0.0, -1.0]]), (-1.5, 1.5)),
]

fig, axes = plt.subplots(1, 4, figsize=(16, 4))

for ax, (_, title, A, lim) in zip(axes, cases):
    # Step 1: Apply A to every corner of the unit square.
    # Corners are stored as rows (shape: 4×2). To matrix-multiply we want them
    # as columns (shape: 2×4), then transpose the result back to rows.
    transformed = (A @ unit_square.T).T   # shape (4, 2)

    # Step 2: Draw the original unit square (light grey, dashed).
    ax.add_patch(Polygon(unit_square, closed=True,
                         facecolor="lightgrey", edgecolor="grey",
                         linestyle="--", alpha=0.5, label="unit square"))

    # Step 3: Draw the transformed parallelogram (filled, coloured).
    ax.add_patch(Polygon(transformed, closed=True,
                         facecolor="tab:blue", edgecolor="navy",
                         alpha=0.4, label="A · square"))

    # Step 4: Draw the two basis vectors before and after.
    # Original e1 = (1,0) — red dashed; A·e1 = column 1 of A — red solid.
    # Original e2 = (0,1) — green dashed; A·e2 = column 2 of A — green solid.
    Ae1 = A[:, 0]   # first column = image of (1,0)
    Ae2 = A[:, 1]   # second column = image of (0,1)
    ax.quiver(0, 0, 1, 0, angles="xy", scale_units="xy", scale=1,
              color="red",   alpha=0.3, width=0.012)              # original e1
    ax.quiver(0, 0, 0, 1, angles="xy", scale_units="xy", scale=1,
              color="green", alpha=0.3, width=0.012)              # original e2
    ax.quiver(0, 0, Ae1[0], Ae1[1], angles="xy", scale_units="xy", scale=1,
              color="red",   width=0.012)                          # A·e1
    ax.quiver(0, 0, Ae2[0], Ae2[1], angles="xy", scale_units="xy", scale=1,
              color="green", width=0.012)                          # A·e2

    # Step 5: Compute the determinant numerically and annotate the area.
    det_A = np.linalg.det(A)
    ax.set_title(f"{title}\n|det| = new area = {abs(det_A):.2f}")
    ax.set_xlim(*lim); ax.set_ylim(*lim)
    ax.set_aspect("equal")
    ax.grid(True, alpha=0.3)
    ax.axhline(0, color="black", lw=0.5)
    ax.axvline(0, color="black", lw=0.5)

plt.tight_layout()
plt.show()

# Print the numerical results so the picture and the numbers agree.
print(f"{'Case':<16} | det(A) | |det(A)| (= new area) | sign meaning")
print("-" * 70)
for label, _, A, _ in cases:
    d = np.linalg.det(A)
    if d > 0:
        sign_meaning = "orientation preserved"
    elif d < 0:
        sign_meaning = "orientation FLIPPED"
    else:
        sign_meaning = "collapsed (no inverse)"
    print(f"{label:<16} | {d:+5.2f}  |       {abs(d):.2f}            | {sign_meaning}")
```

**What to notice in each subplot:**

- **Case A (Tilt/shear).**  The columns of $\mathbf{A}$ are $(2,1)$ and $(1,1)$.
  These are the two new edge-vectors, and they are **not parallel**, so they
  span a real (non-degenerate) parallelogram.  Its area is $|2(1) - 1(1)| = 1$,
  exactly the original area — the square just leaned over, it didn't grow.
- **Case B (Stretch).**  Both basis vectors got doubled, so every length
  along $x$ and $y$ doubles.  Area scales by $2 \times 2 = 4$.  This is
  also the easy way to remember: a *diagonal* matrix scales each axis by its
  diagonal entry, and the determinant is the **product** of those scaling
  factors.
- **Case C (Collapse).**  The columns are $(1,2)$ and $(2,4) = 2 \cdot (1,2)$,
  i.e. **the second column is just twice the first**.  Both edge-vectors lie
  on the same line through the origin, so the "parallelogram" is really a
  line segment — its 2D area is $0$.  This is exactly what the formula
  $ad - bc$ detects: $1(4) - 2(2) = 0$.
- **Case D (Flip).**  $\mathbf{A}\begin{pmatrix}1\\0\end{pmatrix} = (1,0)$
  is unchanged, but $\mathbf{A}\begin{pmatrix}0\\1\end{pmatrix} = (0,-1)$ is
  flipped to point *down*.  The shape's area is still $1$, but its
  counter-clockwise winding is now clockwise — the plane has been turned
  over, and the determinant records that with a negative sign.

> **Mental shortcut.**  Whenever you see a 2×2 matrix, look at its two
> columns as a pair of arrows.  Imagine the parallelogram those arrows
> draw.  Its area (with a sign for whether you had to flip the page to
> stack it) **is** the determinant.

## Python Verification

```python
# ── Determinants: verifying pen & paper work ────────────────
import numpy as np

# 2x2 determinant
A = np.array([[3, 1], [0, 2]])
print("=== 2×2 determinant ===")
print(f"det = {np.linalg.det(A):.0f}")  # 6

# Negative determinant (reflection)
R = np.array([[-1, 0], [0, 1]])
print(f"\n=== Reflection det ===")
print(f"det = {np.linalg.det(R):.0f}")  # -1

# 3x3 determinant
B = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(f"\n=== 3×3 determinant ===")
print(f"det = {np.linalg.det(B):.6f}")  # ~0 (singular)

# Non-singular 3x3
C = np.array([[1, 2, 3], [0, 1, 4], [5, 6, 0]])
print(f"\n=== Non-singular 3×3 ===")
print(f"det = {np.linalg.det(C):.0f}")

# Product property: det(AB) = det(A) * det(B)
print(f"\n=== Product property ===")
X = np.array([[2, 1], [3, 4]])
Y = np.array([[1, 5], [2, 3]])
print(f"det(X) = {np.linalg.det(X):.0f}")
print(f"det(Y) = {np.linalg.det(Y):.0f}")
print(f"det(XY) = {np.linalg.det(X @ Y):.0f}")
print(f"det(X)*det(Y) = {np.linalg.det(X) * np.linalg.det(Y):.0f}")

# Geometric: area scaling
print(f"\n=== Area scaling ===")
# Unit square corners: (0,0), (1,0), (0,1), (1,1)
M = np.array([[3, 1], [0, 2]])
corners = np.array([[0,0], [1,0], [0,1], [1,1]])
transformed = (M @ corners.T).T
print(f"Original unit square area: 1")
print(f"det(M) = {np.linalg.det(M):.0f} → transformed area = {abs(np.linalg.det(M)):.0f}")
```

## Connection to CS / Games / AI

- **Invertibility test** — $\det = 0$ means the system has no unique solution
- **Volume scaling** — change of variables in integration (Jacobian determinant)
- **Orientation** — game physics: detecting if a triangle is front-facing or back-facing
- **Cramer's rule** — solving small linear systems using determinants
- **Eigenvalue computation** — eigenvalues satisfy $\det(\mathbf{A} - \lambda\mathbf{I}) = 0$

### NxN Determinants: Laplace Expansion (Cofactor Expansion)

The 3x3 formula above is actually a **special case** of a general method that
works for any $n \times n$ matrix.

**Definition:** For an $n \times n$ matrix $\mathbf{A}$, the **minor** $M_{ij}$
is the determinant of the $(n-1) \times (n-1)$ submatrix obtained by deleting
row $i$ and column $j$.

**Cofactor:** $C_{ij} = (-1)^{i+j} M_{ij}$

The sign factor $(-1)^{i+j}$ follows a **checkerboard pattern**:

$$\begin{pmatrix} + & - & + & - & \cdots \\ - & + & - & + & \cdots \\ + & - & + & - & \cdots \\ \vdots & & & & \ddots \end{pmatrix}$$

**Laplace expansion along row $i$:**

$$\det(\mathbf{A}) = \sum_{j=1}^{n} (-1)^{i+j} a_{ij} M_{ij} = \sum_{j=1}^{n} a_{ij} C_{ij}$$

You can expand along **any** row or column — the result is always the same.
Choose the row or column with the most zeros to minimise work.

**Pen & paper: 3x3 example by cofactor expansion along row 1**

$$\mathbf{A} = \begin{pmatrix} 2 & 0 & 1 \\ 3 & 1 & 0 \\ -1 & 2 & 3 \end{pmatrix}$$

Expand along row 1 ($i = 1$):

$\det(\mathbf{A}) = a_{11} C_{11} + a_{12} C_{12} + a_{13} C_{13}$

Signs from checkerboard: $+, -, +$

$= (+1)(2) \det\begin{pmatrix} 1 & 0 \\ 2 & 3 \end{pmatrix} + (-1)(0) \det\begin{pmatrix} 3 & 0 \\ -1 & 3 \end{pmatrix} + (+1)(1) \det\begin{pmatrix} 3 & 1 \\ -1 & 2 \end{pmatrix}$

$= 2(1 \cdot 3 - 0 \cdot 2) - 0(3 \cdot 3 - 0 \cdot (-1)) + 1(3 \cdot 2 - 1 \cdot (-1))$

$= 2(3) - 0(9) + 1(7)$

$= 6 + 0 + 7 = 13$

**Tip:** Notice that $a_{12} = 0$, so the second term vanishes entirely. This is
why expanding along a row or column with zeros saves computation.

**Pen & paper: Expand the same matrix along column 2 (has a zero)**

$\det(\mathbf{A}) = a_{12} C_{12} + a_{22} C_{22} + a_{32} C_{32}$

Signs for column 2: $-, +, -$

$= (-1)(0) \det\begin{pmatrix} 3 & 0 \\ -1 & 3 \end{pmatrix} + (+1)(1) \det\begin{pmatrix} 2 & 1 \\ -1 & 3 \end{pmatrix} + (-1)(2) \det\begin{pmatrix} 2 & 1 \\ 3 & 0 \end{pmatrix}$

$= 0 + 1(6 - (-1)) - 2(0 - 3)$

$= 0 + 7 + 6 = 13$ ✓

Same answer regardless of which row or column we expand along.

### Properties of Determinants Under Row Operations

These properties let you simplify a matrix **before** computing its determinant,
which is far more efficient than brute-force expansion for large matrices.

| Row operation | Effect on det |
|---------------|---------------|
| Swap two rows | Multiplies det by $-1$ |
| Multiply a row by scalar $k$ | Multiplies det by $k$ |
| Add a multiple of one row to another | Det **unchanged** |

Two additional key properties:

- **Product rule:** $\det(\mathbf{AB}) = \det(\mathbf{A})\det(\mathbf{B})$
- **Transpose rule:** $\det(\mathbf{A}^T) = \det(\mathbf{A})$

**Pen & paper: Verify all properties with a concrete 3x3 matrix**

Use $\mathbf{A} = \begin{pmatrix} 2 & 0 & 1 \\ 3 & 1 & 0 \\ -1 & 2 & 3 \end{pmatrix}$, which we already know has $\det(\mathbf{A}) = 13$.

**Property 1 — Row swap ($\det$ negates):**

Swap $R_1$ and $R_2$: $\mathbf{A'} = \begin{pmatrix} 3 & 1 & 0 \\ 2 & 0 & 1 \\ -1 & 2 & 3 \end{pmatrix}$

Expand along row 1:

$= 3(0 \cdot 3 - 1 \cdot 2) - 1(2 \cdot 3 - 1 \cdot (-1)) + 0(\ldots)$

$= 3(-2) - 1(7) + 0 = -6 - 7 = -13$ ✓ (sign flipped)

**Property 2 — Row scaling ($\det$ scales by $k$):**

Multiply $R_1$ by 4: $\begin{pmatrix} 8 & 0 & 4 \\ 3 & 1 & 0 \\ -1 & 2 & 3 \end{pmatrix}$

Expected: $4 \times 13 = 52$.

Expand along row 1: $= 8(3) - 0(\ldots) + 4(6 - (-1)) = 24 + 28 = 52$ ✓

**Property 3 — Adding a row multiple (det unchanged):**

$R_2 \leftarrow R_2 + 2R_1$: $\begin{pmatrix} 2 & 0 & 1 \\ 7 & 1 & 2 \\ -1 & 2 & 3 \end{pmatrix}$

Expand along row 1 (the zero in position (1,2) eliminates one term):

$= 2(1 \cdot 3 - 2 \cdot 2) - 0(\ldots) + 1(7 \cdot 2 - 1 \cdot (-1))$

$= 2(3 - 4) + 1(14 + 1)$

$= 2(-1) + 15 = -2 + 15 = 13$ ✓ (det unchanged)

**Property 4 — Product rule:**

Let $\mathbf{B} = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 3 \end{pmatrix}$ (diagonal, so $\det(\mathbf{B}) = 1 \cdot 2 \cdot 3 = 6$)

$\det(\mathbf{AB})$ should equal $13 \times 6 = 78$. (Verify in the Python code below.)

**Property 5 — Transpose rule:**

$\mathbf{A}^T = \begin{pmatrix} 2 & 3 & -1 \\ 0 & 1 & 2 \\ 1 & 0 & 3 \end{pmatrix}$

Expand along column 1 (two zeros in column 2 of $\mathbf{A}^T$, but let's use row 2 which has a zero):

$= -(0)(\ldots) + (1)(2 \cdot 3 - (-1)(1)) - (2)(2 \cdot 0 - 3 \cdot 1)$

$= 0 + 1(6 + 1) - 2(0 - 3)$

$= 7 + 6 = 13$ ✓ (same as $\det(\mathbf{A})$)

## Check Your Understanding

1. **Pen & paper:** Compute $\det\begin{pmatrix} 5 & 3 \\ -2 & 4 \end{pmatrix}$.  Is this matrix invertible?
2. **Pen & paper:** Compute $\det\begin{pmatrix} 2 & 0 & 1 \\ 3 & 1 & 0 \\ -1 & 2 & 3 \end{pmatrix}$ using cofactor expansion along the first row.
3. **Pen & paper:** If $\det(\mathbf{A}) = 5$, what is $\det(3\mathbf{A})$ for a $2 \times 2$ matrix?
4. **Think about it:** Why does a matrix with two identical rows have determinant 0?
