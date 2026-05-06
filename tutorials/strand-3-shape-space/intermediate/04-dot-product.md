---
strand: shape-space
level: intermediate
order: 4
title: Dot Product and Angle Between Vectors
prerequisites:
  - tier: strand-3-shape-space-intermediate
    slug: 03-vectors
    description: Vectors
connections:
  - strand-3-shape-space-intermediate/05-cross-product-3d
applications:
  - cs: "Cosine similarity in ML, lighting calculations in graphics"
  - games: "Dot product = how aligned two directions are"
  - life: "Projection of forces in physics, work = F · d"
---

# Dot Product and Angle Between Vectors

## Explain Like I Am 7

Two friends each push a toy car.  If they push the *same way*, the
car zooms together.  If they push at right angles to each other,
they fight a bit and the car stalls.  If they push *opposite*, they
cancel out.  The **dot product** is just a single number that tells
you how much two arrows are agreeing: a big positive number means
"same direction!", zero means "totally sideways", and negative
means "you're undoing each other."

## Mental

The **dot product** of two vectors combines them into a scalar:

$$
\mathbf{u} \cdot \mathbf{v} = u_x v_x + u_y v_y.
$$

Component-wise multiply, then sum. For 3D, add the $u_z v_z$ term;
generalises to any dimension $n$.

The dot product has a beautiful geometric meaning:

$$
\mathbf{u} \cdot \mathbf{v} = |\mathbf{u}| \cdot |\mathbf{v}| \cdot \cos\theta,
$$

where $\theta$ is the angle between the vectors.

So:

- $\mathbf{u} \cdot \mathbf{v} > 0$: angle is **acute** ($\cos > 0$).
- $\mathbf{u} \cdot \mathbf{v} = 0$: vectors are **perpendicular**.
- $\mathbf{u} \cdot \mathbf{v} < 0$: angle is **obtuse**.

The dot product **measures alignment**.

## Cosine similarity

For unit vectors $\hat{\mathbf{u}}, \hat{\mathbf{v}}$ ($|\mathbf{u}| =
|\mathbf{v}| = 1$):

$$
\hat{\mathbf{u}} \cdot \hat{\mathbf{v}} = \cos\theta.
$$

The dot product **is** the cosine of the angle. This is **cosine
similarity** — the standard "how similar are two vectors" metric in
ML, recommendation systems, and information retrieval.

## Interactive

:::widget type=numeric-input prompt="$\\mathbf{u} = (1, 2), \\mathbf{v} = (3, -1)$. $\\mathbf{u} \\cdot \\mathbf{v} = ?$" answer=1 explain="$1 \\cdot 3 + 2 \\cdot (-1) = 3 - 2 = 1$.":::

:::widget type=numeric-input prompt="$\\mathbf{u} = (3, 4), \\mathbf{v} = (-4, 3)$. Dot product?" answer=0 explain="$-12 + 12 = 0$. Perpendicular!":::

:::widget type=numeric-input prompt="$\\mathbf{u} = (1, 0), \\mathbf{v} = (1, 0)$ — same vector. Dot product?" answer=1 explain="$1 \\cdot 1 + 0 \\cdot 0 = 1$. (And $\\cos 0 = 1$.) ":::

:::widget type=numeric-input prompt="$\\mathbf{u} = (1, 0), \\mathbf{v} = (-1, 0)$ — opposite vectors. Dot product?" answer=-1 explain="$-1$. And $\\cos 180° = -1$.":::

:::widget type=numeric-input prompt="Find angle between $(3, 4)$ and $(0, 5)$. $\\mathbf{u} \\cdot \\mathbf{v} = 20$, $|\\mathbf{u}||\\mathbf{v}| = 25$. $\\cos\\theta = 0.8$. $\\theta = ?$ degrees, rounded to nearest." answer=37 explain="$\\arccos(0.8) \\approx 36.87° \\approx 37°$.":::

## Symbolic

**Dot product** (also called **scalar product**, **inner product**):

$$
\mathbf{u} \cdot \mathbf{v} = \sum_{i=1}^n u_i v_i = |\mathbf{u}| |\mathbf{v}| \cos\theta.
$$

**Angle formula**:

$$
\cos\theta = \frac{\mathbf{u} \cdot \mathbf{v}}{|\mathbf{u}| |\mathbf{v}|}.
$$

**Properties**:

- Commutative: $\mathbf{u} \cdot \mathbf{v} = \mathbf{v} \cdot
  \mathbf{u}$.
- Distributive: $\mathbf{u} \cdot (\mathbf{v} + \mathbf{w}) =
  \mathbf{u} \cdot \mathbf{v} + \mathbf{u} \cdot \mathbf{w}$.
- $\mathbf{v} \cdot \mathbf{v} = |\mathbf{v}|^2$ — magnitude squared.
- $\mathbf{u} \perp \mathbf{v} \iff \mathbf{u} \cdot \mathbf{v} = 0$.

**Projection** of $\mathbf{u}$ onto $\mathbf{v}$:

$$
\text{proj}_{\mathbf{v}} \mathbf{u} = \frac{\mathbf{u} \cdot \mathbf{v}}{|\mathbf{v}|^2} \mathbf{v}.
$$

The component of $\mathbf{u}$ "in the direction of" $\mathbf{v}$.

## Computational

```python
import numpy as np

u = np.array([1, 2])
v = np.array([3, -1])

print(u @ v)             # 1 (dot product)
print(np.dot(u, v))      # also 1

# Cosine similarity
def cosine_sim(u, v):
    return (u @ v) / (np.linalg.norm(u) * np.linalg.norm(v))

print(cosine_sim(np.array([1, 0]), np.array([1, 1])))   # 0.707 = cos 45°

# Angle between
def angle_deg(u, v):
    cos_t = cosine_sim(u, v)
    return np.degrees(np.arccos(cos_t))

print(angle_deg(np.array([3, 4]), np.array([0, 5])))   # 37 degrees
```

## Applied

- **Cosine similarity in NLP/IR**: documents become vectors of
  word frequencies; cosine measures topic similarity. Powers
  search, recommendations, and embedding-based retrieval.
- **Lighting in graphics**: $\hat{\mathbf{n}} \cdot \hat{\mathbf{l}}$
  (surface normal dot light direction) gives diffuse reflection
  intensity (Lambert's law).
- **Work in physics**: $W = \mathbf{F} \cdot \mathbf{d}$ — force
  dotted with displacement.
- **ML embeddings**: word2vec, BERT, and similar produce vector
  representations where dot products measure semantic similarity.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\mathbf{u} = (2, 3), \\mathbf{v} = (4, -1)$. $\\mathbf{u} \\cdot \\mathbf{v} = ?$" answer=5 explain="$8 - 3 = 5$.":::

:::widget type=numeric-input prompt="If $\\mathbf{u} \\cdot \\mathbf{v} = 0$, the vectors are..." answer=0 explain="Perpendicular. Type 0 to indicate.":::

:::widget type=numeric-input prompt="$\\mathbf{v} \\cdot \\mathbf{v} = ?$ if $|\\mathbf{v}| = 7$." answer=49 explain="$|\\mathbf{v}|^2 = 49$.":::

:::widget type=numeric-input prompt="Cosine similarity of $(3, 4)$ and $(6, 8)$ — same direction, scaled. Should be?" answer=1 explain="$\\cos 0 = 1$. Same direction = max similarity.":::
