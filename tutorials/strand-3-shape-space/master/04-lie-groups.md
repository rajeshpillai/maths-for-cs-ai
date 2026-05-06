---
strand: shape-space
level: master
order: 4
title: Lie Groups and Lie Algebras
prerequisites:
  - tier: strand-3-shape-space-master
    slug: 03-riemannian-geometry
    description: Riemannian geometry
connections:
  - strand-3-shape-space-master/05-fiber-bundles
applications:
  - cs: "Equivariant ML, robotics, particle physics"
  - life: "Smooth groups — symmetries with calculus"
---

# Lie Groups and Lie Algebras

## Explain Like I Am 7

Picture all the ways you can spin a soccer ball without moving its
centre.  Each spin is a "move," and you can stack two spins into
one bigger spin.  But the *set of all possible spins* itself forms
a smooth, curvy shape.  That's a **Lie group**: a shape whose
points are also moves.  Tiny spins — wiggles barely budging the
ball — live on a flat sheet just touching the no-spin point, and
that flat sheet, the **Lie algebra**, holds the recipe for every
big spin once you know how to add up many tiny ones.

## Mental

A **Lie group** $G$ is a smooth manifold that is also a group, with
multiplication and inversion smooth maps.

The **Lie algebra** $\mathfrak g = T_e G$ — tangent space at the
identity — captures the *infinitesimal* structure of $G$.

## Examples

| Lie group | Lie algebra | Dim |
|---|---|---|
| $\mathbb R^n$ (additive) | $\mathbb R^n$ | $n$ |
| $S^1 = \mathrm{U}(1)$ | $\mathbb R$ | 1 |
| $\mathrm{SO}(n)$ | $\mathfrak{so}(n)$ (skew-symmetric) | $n(n-1)/2$ |
| $\mathrm{SU}(n)$ | $\mathfrak{su}(n)$ (skew-Hermitian, traceless) | $n^2 - 1$ |
| $\mathrm{GL}(n, \mathbb R)$ | $\mathfrak{gl}(n)$ (all matrices) | $n^2$ |
| $\mathrm{SL}(n, \mathbb R)$ | $\mathfrak{sl}(n)$ (traceless) | $n^2 - 1$ |
| $\mathrm{SE}(3)$ (rigid motions) | $\mathfrak{se}(3)$ | 6 |

## Exponential map

The **exponential map** $\exp : \mathfrak g \to G$ converts Lie-algebra
elements to Lie-group elements:

For matrix Lie groups: $\exp(X) = I + X + X^2/2! + \ldots$.

Properties:

- $\exp(0) = e$.
- $\exp(X)$ generates a one-parameter subgroup
  $\gamma(t) = \exp(tX)$.
- Local diffeomorphism near 0; gives canonical local coordinates.

## Lie bracket

The Lie algebra has a **bracket** $[\cdot, \cdot] : \mathfrak g \times \mathfrak g \to \mathfrak g$:

For matrix Lie algebras: $[X, Y] = XY - YX$.

Properties:

- Bilinear, anti-symmetric.
- **Jacobi identity**: $[X, [Y, Z]] + [Y, [Z, X]] + [Z, [X, Y]] = 0$.

The bracket is the *first-order* trace of group non-commutativity:

$$
\exp(tX) \exp(tY) = \exp(t(X + Y) + t^2 [X, Y]/2 + O(t^3)).
$$

(Baker-Campbell-Hausdorff formula.)

## Worked example: $\mathrm{SO}(3)$

$\mathrm{SO}(3) = \{R : R^T R = I, \det R = 1\}$ — rotations of $\mathbb R^3$.
Dim 3.

$\mathfrak{so}(3) = $ skew-symmetric $3 \times 3$ matrices. Basis:

$$
J_1 = \begin{pmatrix} 0 & 0 & 0 \\ 0 & 0 & -1 \\ 0 & 1 & 0 \end{pmatrix}, \quad J_2 = \ldots, \quad J_3 = \ldots
$$

Brackets: $[J_i, J_j] = \epsilon_{ijk} J_k$ — the $\mathrm{SU}(2)$
relations also.

$\exp$ of a skew-symmetric matrix gives a rotation by Rodrigues'
formula.

## Interactive

:::widget type=numeric-input prompt="$\\dim \\mathrm{SO}(3) = ?$" answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="$\\dim \\mathrm{SU}(2) = 4 - 1 = ?$" answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="$\\mathrm{SO}(3)$ and $\\mathrm{SU}(2)$ have isomorphic Lie algebras. Type 1." answer=1 explain="Yes — locally same; SU(2) is double-cover of SO(3).":::

:::widget type=numeric-input prompt="Exponential map: matrix exp Σ X^n/n!. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Adjoint action**: $G$ acts on $\mathfrak g$ by $\mathrm{Ad}_g X = g X g^{-1}$.
Differentiating gives $\mathrm{ad}_X Y = [X, Y]$.

**Killing form** $B(X, Y) = \mathrm{tr}(\mathrm{ad}_X \mathrm{ad}_Y)$:
non-degenerate iff $\mathfrak g$ is **semisimple**.

**Cartan classification** of complex simple Lie algebras: 4 infinite
families ($A_n, B_n, C_n, D_n$) and 5 exceptional ($G_2, F_4, E_6, E_7, E_8$).
$E_8$ has dimension 248 — appears in string theory and exceptional
holonomy.

**Compact vs non-compact**: $\mathrm{SO}(3)$ compact, $\mathrm{SL}(n, \mathbb R)$
non-compact. Compact Lie groups have especially nice
representation theory.

## Computational

```python
import numpy as np
from scipy.linalg import expm

# SO(3): exponential of skew-symmetric matrix
def hat(omega):
    """Skew-symmetric matrix from a 3-vector."""
    return np.array([[0, -omega[2], omega[1]],
                     [omega[2], 0, -omega[0]],
                     [-omega[1], omega[0], 0]])

omega = np.array([0, 0, 1])     # rotation about z-axis
theta = np.pi / 4
R = expm(hat(omega * theta))
print(R)
# Cosine and sine pattern for z-rotation by π/4
print(np.allclose(R.T @ R, np.eye(3)))   # True

# Lie bracket [J_x, J_y] = J_z
Jx = hat([1, 0, 0])
Jy = hat([0, 1, 0])
Jz = hat([0, 0, 1])
print(np.allclose(Jx @ Jy - Jy @ Jx, Jz))   # True

# SU(2) Pauli matrices: [σ_i, σ_j] = 2i ε_{ijk} σ_k
sx = np.array([[0, 1], [1, 0]])
sy = np.array([[0, -1j], [1j, 0]])
sz = np.array([[1, 0], [0, -1]])
print(np.allclose(sx @ sy - sy @ sx, 2j * sz))   # True
```

## Applied

- **Particle physics** — Standard Model uses Lie groups
  $\mathrm{SU}(3) \times \mathrm{SU}(2) \times \mathrm{U}(1)$.
- **Equivariant ML** — group convolutions over $\mathrm{SO}(3)$
  (3D molecular networks), $\mathrm{SE}(3)$ (point clouds).
- **Robotics** — $\mathrm{SE}(3)$ describes rigid-body motion;
  $\mathfrak{se}(3)$ velocities (twists).
- **Crystallography** — 32 point groups (subgroups of $\mathrm{O}(3)$);
  Lie group methods for vibrational spectra.
- **Numerical optimisation** — Lie-group methods preserve constraints
  (e.g., Riemannian-Lie SGD on $\mathrm{SO}(n)$).

## Check Your Understanding

:::widget type=numeric-input prompt="Lie group = smooth manifold + smooth group operations. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lie algebra $\\mathfrak g = T_e G$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\exp$ takes Lie algebra to Lie group. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathrm{SU}(2)$ double-covers $\\mathrm{SO}(3)$. Type 1." answer=1 explain="Yes.":::
