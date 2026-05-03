---
strand: structure
level: intermediate
order: 7
title: Vector Spaces over a Field
prerequisites:
  - tier: strand-2-structure-intermediate
    slug: 06-polynomial-rings
    description: Polynomial rings
connections:
  - strand-2-structure-intermediate/08-field-extensions
applications:
  - cs: "Embeddings, feature spaces, error-correcting codes"
  - life: "Where linear algebra actually starts"
---

# Vector Spaces over a Field

## Mental

A **vector space** $V$ over a field $F$ is an abelian group $(V, +)$
together with a **scalar multiplication** $F \times V \to V$,
$(\lambda, v) \mapsto \lambda v$, satisfying:

1. $\lambda(v + w) = \lambda v + \lambda w$.
2. $(\lambda + \mu) v = \lambda v + \mu v$.
3. $(\lambda \mu) v = \lambda(\mu v)$.
4. $1 \cdot v = v$.

That's it. Not "arrows in 3D" specifically — *any* set obeying
those axioms is a vector space.

## Examples

| Vector space | Field | Element |
|---|---|---|
| $\mathbb{R}^n$ | $\mathbb{R}$ | tuple of reals |
| $\mathbb{C}$ over $\mathbb{R}$ | $\mathbb{R}$ | $a + bi$ |
| $F[x]$ | $F$ | polynomial |
| $C([0, 1])$ | $\mathbb{R}$ | continuous function |
| $\mathbb{F}_2^n$ | $\mathbb{F}_2$ | binary string of length $n$ |

The last is striking: **strings of bits are a vector space over
$\mathbb{F}_2$**. This is the basis of linear codes.

## Bases and dimension

A **basis** of $V$ is a linearly independent spanning set. Every
vector space has a basis (using AC for infinite cases).

**All bases of $V$ have the same size** — that's the **dimension**
$\dim V$.

For $\mathbb{F}_2^n$: standard basis $\{e_1, \ldots, e_n\}$ — dimension $n$,
$2^n$ total vectors.

## Linear maps

A function $T : V \to W$ is **linear** if $T(\lambda v + \mu w) = \lambda T(v) + \mu T(w)$.

**Rank-nullity**: for $T : V \to W$ with $V$ finite-dimensional,

$$
\dim V = \dim \ker T + \dim \mathrm{im}\,T.
$$

(The vector-space analogue of the first isomorphism theorem from
Lesson 03.)

## Worked example: a $\mathbb{F}_2$ code

A $[7, 4]$ Hamming code lives in $\mathbb{F}_2^7$. Codewords form a
4-dimensional subspace — there are $2^4 = 16$ codewords.

The code is the kernel of a linear map $H : \mathbb{F}_2^7 \to \mathbb{F}_2^3$
where $H$ is the parity-check matrix. Rank-nullity: $7 = 3 + 4$.

Decoding (correct one error): compute $Hr$ where $r$ is received;
the result is a vector in $\mathbb{F}_2^3$ that *names which bit was
flipped*. Linear algebra over $\mathbb{F}_2$ does the work.

## Interactive

:::widget type=numeric-input prompt="$\\dim \\mathbb{R}^4 = ?$" answer=4 explain="$4$.":::

:::widget type=numeric-input prompt="$\\dim_{\\mathbb{R}} \\mathbb{C} = ?$" answer=2 explain="$\\{1, i\\}$ basis — 2.":::

:::widget type=numeric-input prompt="Vectors in $\\mathbb{F}_2^5$ — how many?" answer=32 explain="$2^5 = 32$.":::

:::widget type=numeric-input prompt="Rank-nullity: $\\dim V = \\dim \\ker + \\dim \\mathrm{im}$. For $V = \\mathbb{R}^5, \\dim \\ker = 2$: $\\dim \\mathrm{im} = ?$" answer=3 explain="$5 - 2 = 3$.":::

## Symbolic

**Subspaces**: a subset $W \subseteq V$ closed under addition and
scalar multiplication — the natural sub-objects.

**Quotient space**: $V / W$ (for $W$ a subspace) is itself a vector
space; $\dim(V/W) = \dim V - \dim W$.

**Direct sum**: $V = U \oplus W$ if $V = U + W$ and $U \cap W = \{0\}$.
$\dim V = \dim U + \dim W$.

**Dual space** $V^* = \{T : V \to F \mid T \text{ linear}\}$ — same
dimension as $V$ in finite-dimensional case.

**Tensor product** $V \otimes W$: dimension $\dim V \cdot \dim W$ —
generalizes outer product. Used heavily in physics, ML (multi-head
attention is a structured tensor).

## Computational

```python
import numpy as np

# Standard basis of R^4
e = np.eye(4)
print(e)                                  # 4x4 identity

# Rank and null-space dimension
A = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]], dtype=float)
print(np.linalg.matrix_rank(A))           # 2
print(A.shape[1] - np.linalg.matrix_rank(A))  # 1 = nullity

# F_2 linear algebra (mod-2 arithmetic)
def f2_rref(M):
    M = M.copy() % 2
    rows, cols = M.shape
    r = 0
    for c in range(cols):
        pivot = None
        for i in range(r, rows):
            if M[i, c]:
                pivot = i; break
        if pivot is None: continue
        M[[r, pivot]] = M[[pivot, r]]
        for i in range(rows):
            if i != r and M[i, c]:
                M[i] = (M[i] + M[r]) % 2
        r += 1
    return M, r

# Hamming(7,4) parity check matrix
H = np.array([
    [1, 0, 1, 0, 1, 0, 1],
    [0, 1, 1, 0, 0, 1, 1],
    [0, 0, 0, 1, 1, 1, 1],
])
print(f2_rref(H)[1])                       # rank 3 — code dim 4
```

## Applied

- **Embeddings in ML** — words/images live in $\mathbb{R}^d$; cosine
  similarity exploits the vector-space inner-product structure.
- **Linear codes** — Hamming, Reed-Muller, polar codes are subspaces
  of $\mathbb{F}_q^n$.
- **Quantum states** — pure states live in a complex Hilbert space
  (a vector space with inner product). Superposition is *literally*
  vector addition.
- **PCA / SVD** — vector-space geometry (orthogonal projections, basis
  changes) underlies all of dimensionality reduction.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\dim \\mathbb{R}^7 = ?$" answer=7 explain="$7$.":::

:::widget type=numeric-input prompt="$\\dim(\\mathbb{R}^3 \\oplus \\mathbb{R}^4) = ?$" answer=7 explain="$3 + 4 = 7$.":::

:::widget type=numeric-input prompt="$\\dim_{\\mathbb{F}_2} \\mathbb{F}_2^{10} = ?$" answer=10 explain="$10$.":::

:::widget type=numeric-input prompt="If $T: \\mathbb{R}^5 \\to \\mathbb{R}^3$ is surjective, $\\dim \\ker T = 5 - 3 = ?$" answer=2 explain="$2$.":::
