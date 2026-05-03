---
strand: shape-space
level: research
order: 3
title: Non-Abelian Hodge Theory
prerequisites:
  - tier: strand-3-shape-space-research
    slug: 02-geometric-langlands-deeper
    description: Geometric Langlands deeper
connections:
  - strand-3-shape-space-research/04-geometric-measure-theory
applications:
  - cs: "Higgs bundles, integrable systems, geometric Langlands"
  - life: "Hodge theory for non-abelian local systems"
---

# Non-Abelian Hodge Theory

## Mental

Classical Hodge theory: cohomology of compact Kähler manifold has
**Hodge decomposition**.

**Non-abelian Hodge theory** (Simpson, Hitchin, Corlette, Donaldson):
extends to *higher-dimensional* analogs:

- **Local systems** on $X$ (representations of $\pi_1$, possibly
  non-abelian).
- **Higgs bundles** $(E, \phi)$ on $X$ — vector bundle + Higgs field.
- **Flat connections** on bundles.

The three are related by *non-abelian Hodge correspondence*.

## Hitchin system

Moduli of stable Higgs bundles $\mathcal M_H(C)$ on a Riemann
surface $C$:

- An algebraic variety.
- An **integrable system** via Hitchin map $h : \mathcal M_H \to \mathbb A^N$
  whose fibres are abelian varieties (Jacobians of spectral curves).

Hitchin system + non-abelian Hodge ↔ moduli of flat connections.

## Simpson's correspondence

For a smooth projective variety $X$:

$$
\{\text{semisimple representations of } \pi_1(X)\} \;\simeq\; \{\text{stable Higgs bundles with } c_i = 0\}.
$$

(Schematically; technical conditions apply.)

Generalises Narasimhan-Seshadri (1965) for unitary representations
on Riemann surfaces.

## Interactive

:::widget type=numeric-input prompt="Non-abelian Hodge: local systems ↔ Higgs bundles ↔ flat connections. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hitchin system: integrable on Higgs-bundle moduli. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Simpson's correspondence: semisimple π_1 reps ↔ Higgs bundles. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Narasimhan-Seshadri (1965) precursor. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Twistor structure**: Simpson's $\lambda$-connections interpolate
between flat connections ($\lambda = 1$) and Higgs bundles
($\lambda = 0$). Twistor family parameterises both.

**$P = W$ conjecture** (de Cataldo-Hausel-Migliorini): perverse
filtration on Hitchin moduli matches weight filtration on character
variety. Major recent progress (Maulik-Shen 2022).

**Ngô's fundamental lemma** (2010 Fields medal): proves a deep
geometric statement about Hitchin fibres, settling a key
ingredient of Langlands.

**Mirror symmetry of Hitchin moduli** (Hausel-Thaddeus 2003):
Langlands-dual Hitchin systems are mirror; foundation of
Kapustin-Witten geometric Langlands.

## Computational

```python
# Non-abelian Hodge is research; sketch with toy examples

# Representation of free group of rank 2 in GL_2(C)
import numpy as np

def random_GL2_rep():
    """Random representation of F_2 in GL_2(C)."""
    A = np.random.randn(2, 2) + 1j * np.random.randn(2, 2)
    B = np.random.randn(2, 2) + 1j * np.random.randn(2, 2)
    return A, B

A, B = random_GL2_rep()
print(f"det(A) = {np.linalg.det(A):.4f}")
print(f"det(B) = {np.linalg.det(B):.4f}")
print(f"AB ≠ BA generally")

# This represents non-abelian local system on a punctured torus
# Corresponds to Higgs bundle data via NAH correspondence
# Concrete computation requires PARI / SageMath

# Hitchin spectral curve: Higgs field φ has trace + det giving polynomial
# spec(φ) = points where det(λ - φ) = 0 — defines spectral curve
# Hitchin map: φ ↦ (tr φ, det φ) ∈ symmetric polynomials
print("Hitchin map: Higgs field → its characteristic polynomial.")
```

## Applied

- **Geometric Langlands** — Hitchin moduli are central; mirror
  symmetry connects $G$ and $\check G$ Hitchins.
- **Mathematical physics** — $\mathcal N = 4$ super Yang-Mills
  studied via Hitchin systems.
- **Topology of moduli spaces** — non-abelian Hodge tells deep
  structural results.
- **Cluster algebras** — coordinates on character varieties exhibit
  cluster structure.
- **Mirror symmetry** — Hausel-Thaddeus mirror duality for Hitchin
  systems.

## Check Your Understanding

:::widget type=numeric-input prompt="Non-abelian Hodge: 3 equivalent moduli (reps, Higgs, flat). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Simpson's correspondence generalises Narasimhan-Seshadri. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Ngô (2010 Fields) proved fundamental lemma on Hitchin fibres. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hitchin system is an integrable system. Type 1." answer=1 explain="Yes.":::
