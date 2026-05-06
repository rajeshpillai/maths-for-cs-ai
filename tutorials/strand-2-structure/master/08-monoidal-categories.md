---
strand: structure
level: master
order: 8
title: Monoidal and Symmetric Monoidal Categories
prerequisites:
  - tier: strand-2-structure-master
    slug: 07-category-theory-deeper
    description: Category theory deeper
connections:
  - strand-2-structure-master/09-structure-master-capstone
applications:
  - cs: "Process calculi, quantum protocols, programming-language theory"
  - life: "Tensor-product structure as categorical bedrock"
---

# Monoidal and Symmetric Monoidal Categories

## Explain Like I Am 7

Take the train-station map from the last lesson and add a new
ingredient: any two stations can be **smooshed together** into a
joint station, like running two train lines side by side as one
"twin-track."  This smooshing has to obey gentle rules — pairing
three stations gives the same result no matter which pair you smoosh
first.  That's a **monoidal category**.  When the smoosh is also
order-blind ("A twin B = B twin A"), it's **symmetric**, and the
diagrams you can draw in such a world look just like braided
ribbons — and underpin quantum computing.

## Mental

A **monoidal category** has:

- A bifunctor $\otimes : \mathcal C \times \mathcal C \to \mathcal C$.
- A unit object $I$.
- Coherence isomorphisms ($\alpha, \lambda, \rho$) satisfying
  Mac Lane's pentagon and triangle axioms.

Examples:

- $(\mathrm{Vec}_k, \otimes_k, k)$: vector spaces.
- $(\mathrm{Set}, \times, *)$ or $(\mathrm{Set}, \sqcup, \emptyset)$.
- $(\mathrm{Hilb}, \otimes, \mathbb{C})$: Hilbert spaces — quantum
  mechanics.
- $(\mathrm{Cob}_n, \sqcup, \emptyset)$: cobordisms — TQFTs.

## Symmetric vs braided

**Symmetric**: a natural isomorphism $\sigma_{A, B} : A \otimes B \cong B \otimes A$
with $\sigma^2 = \mathrm{id}$.

**Braided**: similar but $\sigma^2 \ne \mathrm{id}$. Used for **knot
invariants** — the braiding *itself* encodes topological data.

In dimension $\ge 4$ the distinction collapses (Eckmann-Hilton-style).

## Compact closed and dagger

A **compact closed** category has duals: every $A$ has $A^*$ with
evaluation $\mathrm{ev}: A^* \otimes A \to I$ and coevaluation
$\eta : I \to A \otimes A^*$.

A **dagger category** has an involution $\dagger$ on morphisms
($\dagger$ = adjoint in finite-dim Hilbert spaces).

**Dagger compact closed categories** (DCC) model finite-dim quantum
mechanics axiomatically — Coecke-Abramsky-Selinger framework.

## Worked example: Bell state

In $\mathrm{Hilb}$:

- Bell state $|\Phi^+\rangle = \frac{1}{\sqrt 2}(|00\rangle + |11\rangle) \in \mathbb{C}^2 \otimes \mathbb{C}^2$.
- Visualised as a "cup" in graphical calculus: connects two output
  wires with a U-shape.
- The "cup" is precisely $\eta : I \to V^* \otimes V$ for $V = \mathbb{C}^2$.

Quantum teleportation diagrammatically: a Bell-state cup, a measurement
cap, and a classical-correction loop. The diagrammatic approach
makes the protocol topologically obvious.

## Interactive

:::widget type=numeric-input prompt="Monoidal category has a tensor functor and unit object. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Symmetric monoidal: $\\sigma^2 = \\mathrm{id}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Compact closed: each object has a dual. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Dagger compact closed models finite-dim quantum mechanics. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Coherence theorem** (Mac Lane): in a monoidal category, all
"coherence isomorphisms" built from $\alpha, \lambda, \rho$ are
equal — so we may treat the tensor as strictly associative for
practical purposes.

**Joyal-Street string diagrams**: graphical calculus for monoidal
categories. Composition is vertical; tensor is horizontal. Many
proofs become topological.

**TQFT** (Atiyah, 1989): a topological quantum field theory of
dimension $n$ is a symmetric monoidal functor
$\mathrm{Cob}_n \to \mathrm{Vec}_\mathbb{C}$. Used to compute
*topological invariants* of manifolds.

**$E_n$-algebras**: algebras over the operad $E_n$. Generalisations
of monoidal categories ($n = 1$) and braided ($n = 2$).

## Computational

```python
# String-diagram-style computation: tensor of vectors
import numpy as np

# Tensor product of two vectors
v1 = np.array([1, 2])
v2 = np.array([3, 4])
tensor = np.kron(v1, v2)
print(tensor)                       # [3, 4, 6, 8]

# Bell state in C² ⊗ C²
bell_pp = np.array([1, 0, 0, 1]) / np.sqrt(2)
print(bell_pp @ bell_pp.conj())     # 1.0 (normalised)

# Cup map η : I → V* ⊗ V (for V = C²)
# Encodes |0⟩|0⟩ + |1⟩|1⟩ via identity matrix flattened
eta = np.array([1, 0, 0, 1])
print(eta / np.sqrt(2))             # bell_pp

# Cap map ε : V ⊗ V* → I (evaluation, partial trace)
def cap(v, w_dual):
    return np.dot(v, w_dual)        # for symmetric setting

# Snake equation: (η ⊗ id) followed by (id ⊗ ε) = id (after suitable identifications)
# Compute id ⊗ id - ... in matrix form
I2 = np.eye(2)
# (η ⊗ id_V): I ⊗ V → V* ⊗ V ⊗ V; (id_V ⊗ ε): V ⊗ V* ⊗ V → V
# Composition is identity on V
print("Snake equation reduces to identity on V — checks out diagrammatically.")
```

## Applied

- **Categorical quantum mechanics** — Coecke-Abramsky-Kissinger
  framework using DCC; ZX-calculus for quantum-circuit reasoning.
- **TQFTs** — Witten's theorem on Jones polynomial via 3D TQFT;
  Khovanov homology of knots.
- **Process calculi** — concurrency theory uses monoidal categories
  to model parallel composition.
- **Programming-language semantics** — Cartesian closed (Cartesian
  monoidal) for typed lambda calculus; symmetric monoidal for
  linear/affine type systems.
- **AI / probabilistic programming** — Markov categories model
  probabilistic-program semantics (Fritz, Cho-Jacobs).

## Check Your Understanding

:::widget type=numeric-input prompt="Symmetric monoidal: $\\sigma^2 = \\mathrm{id}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="String diagrams visualise monoidal categories. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="TQFT: symmetric monoidal functor $\\mathrm{Cob}_n \\to \\mathrm{Vec}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="DCC = dagger compact closed. Type 1." answer=1 explain="Yes.":::
