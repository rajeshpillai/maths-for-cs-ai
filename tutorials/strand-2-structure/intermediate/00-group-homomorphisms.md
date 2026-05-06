---
strand: structure
level: intermediate
order: 0
title: Group Homomorphisms
prerequisites:
  - tier: strand-2-structure-foundation
    slug: 09-structure-capstone
    description: Foundation structure capstone
connections:
  - strand-2-structure-intermediate/01-isomorphisms
applications:
  - cs: "Hash functions as homomorphisms; modular arithmetic in crypto"
  - life: "Structure-preserving maps between systems"
---

# Group Homomorphisms

## Explain Like I Am 7

Imagine two dance studios where the dancers move in different ways.
A **homomorphism** is a translator who watches a dancer in studio A
and re-creates a faithful version in studio B — and crucially, *if you
combine two moves before translating, you get the same answer as
translating both moves and then combining them in B*.  The translator
might lose detail (several A-dancers can map to the same B-dancer),
but the choreography rules are obeyed.  This "structure-respecting
translator" is the bridge that lets one group teach you about another.

## Mental

A **group homomorphism** $\varphi: G \to H$ is a function that
**preserves the operation**:

$$
\varphi(a \cdot_G b) = \varphi(a) \cdot_H \varphi(b) \quad \forall a, b \in G.
$$

That single line forces a lot:

- $\varphi(e_G) = e_H$ — identity goes to identity.
- $\varphi(a^{-1}) = \varphi(a)^{-1}$ — inverses go to inverses.
- $\varphi(a^n) = \varphi(a)^n$ — powers behave consistently.

## Examples

| Source $G$ | Target $H$ | Map $\varphi$ |
|---|---|---|
| $(\mathbb{Z}, +)$ | $(\mathbb{Z}/n\mathbb{Z}, +)$ | $\varphi(k) = k \bmod n$ |
| $(\mathbb{R}, +)$ | $(\mathbb{R}^+, \cdot)$ | $\varphi(x) = e^x$ |
| $(\mathbb{R}^+, \cdot)$ | $(\mathbb{R}, +)$ | $\varphi(x) = \log x$ |
| $\mathrm{GL}_n(\mathbb{R})$ | $(\mathbb{R}^*, \cdot)$ | $\varphi(M) = \det M$ |
| $S_n$ | $\{\pm 1\}$ | sign of permutation |

The exponential and logarithm are *the same homomorphism* in
opposite directions — that's why $\log(xy) = \log x + \log y$.

## Kernel and image

Two key subsets:

- **Kernel**: $\ker \varphi = \{g \in G : \varphi(g) = e_H\}$ — what
  $\varphi$ collapses to identity.
- **Image**: $\mathrm{im}\,\varphi = \{\varphi(g) : g \in G\} \subseteq H$.

**Theorem**: $\ker \varphi$ is a subgroup of $G$;
$\mathrm{im}\,\varphi$ is a subgroup of $H$.

A homomorphism is **injective** iff $\ker \varphi = \{e_G\}$ — a
trivial kernel. Compare with linear-algebra: a linear map is
injective iff its null space is trivial.

## Worked example

$\varphi : \mathbb{Z} \to \mathbb{Z}/6\mathbb{Z}, \; \varphi(k) = k \bmod 6$.

- $\ker \varphi = 6\mathbb{Z}$ — the multiples of 6.
- $\mathrm{im}\,\varphi = \mathbb{Z}/6\mathbb{Z}$ — surjective.

The kernel measures *how many-to-one* $\varphi$ is: every fibre has
the same size as $\ker\varphi$.

## Interactive

:::widget type=numeric-input prompt="$\\varphi : \\mathbb{Z} \\to \\mathbb{Z}/8\\mathbb{Z}, \\varphi(k) = k \\bmod 8$. $|\\ker \\varphi|$? Type 0 if infinite." answer=0 explain="Kernel is $8\\mathbb{Z}$ — infinite.":::

:::widget type=numeric-input prompt="$\\det : \\mathrm{GL}_n(\\mathbb{R}) \\to \\mathbb{R}^*$. Image of $\\det$?" answer=0 explain="$\\mathbb{R}^* = \\mathbb{R} \\setminus \\{0\\}$. Type 0.":::

:::widget type=numeric-input prompt="$\\varphi(g) = e^g$ from $(\\mathbb{R}, +)$ to $(\\mathbb{R}^+, \\cdot)$ is injective: $\\ker = ?$ (smallest element)" answer=0 explain="$\\ker = \\{0\\}$.":::

:::widget type=numeric-input prompt="$\\mathrm{sign} : S_n \\to \\{\\pm 1\\}$. For $n = 4$, $|\\ker \\mathrm{sign}| = |A_4| = ?$" answer=12 explain="$4!/2 = 12$.":::

## Symbolic

**First isomorphism theorem**: for any homomorphism $\varphi : G \to H$,

$$
G / \ker \varphi \;\cong\; \mathrm{im}\,\varphi.
$$

The quotient by the kernel is *isomorphic* to the image. This is the
group-theory analogue of rank-nullity in linear algebra.

**Cosets and homomorphisms**: $\varphi(a) = \varphi(b)$ iff $a$ and
$b$ lie in the same left coset of $\ker \varphi$. So the fibres of
a homomorphism are exactly the cosets.

## Computational

```python
# Verify kernel is a subgroup of (Z, +) under phi(k) = k mod 6
def phi(k): return k % 6

# kernel within {-12, ..., 12}
ker = [k for k in range(-12, 13) if phi(k) == 0]
print(ker)                       # [-12, -6, 0, 6, 12]

# det homomorphism
import numpy as np
A = np.array([[2., 0.], [0., 3.]])
B = np.array([[1., 2.], [3., 4.]])
print(np.linalg.det(A @ B))                     # det(AB)
print(np.linalg.det(A) * np.linalg.det(B))      # det(A) * det(B)
# equal up to numerical noise — det IS a homomorphism

# sign of permutation
from sympy.combinatorics import Permutation
p = Permutation([1, 0, 2])    # one swap, odd
q = Permutation([2, 0, 1])    # one cycle of length 3, even
print(p.signature(), q.signature())             # -1 1
print((p * q).signature(), p.signature() * q.signature())  # -1 -1
```

## Applied

- **Modular arithmetic in crypto** — RSA's encryption is a
  homomorphism $\mathbb{Z} \to \mathbb{Z}/n$. Homomorphic encryption
  schemes (like Paillier) preserve operations *under* encryption.
- **Hash functions** that *aren't* homomorphisms — cryptographic
  hashes deliberately destroy structure to be hard to invert.
- **Signal processing** — the Fourier transform is a homomorphism
  from convolution to multiplication: $\mathcal{F}(f \star g) = \mathcal{F}f \cdot \mathcal{F}g$.
- **Computer graphics** — the determinant homomorphism distinguishes
  proper rotations ($\det = +1$) from reflections ($\det = -1$).

## Check Your Understanding

:::widget type=numeric-input prompt="A homomorphism preserves the operation: $\\varphi(ab) = \\varphi(a)\\varphi(b)$. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\varphi$ injective $\\iff \\ker \\varphi = \\{e\\}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\log : (\\mathbb{R}^+, \\cdot) \\to (\\mathbb{R}, +)$ is a homomorphism. Type 1." answer=1 explain="Yes — $\\log(xy) = \\log x + \\log y$.":::

:::widget type=numeric-input prompt="First isomorphism theorem: $G/\\ker \\varphi \\cong \\mathrm{im}\\,\\varphi$. Type 1." answer=1 explain="Yes.":::
