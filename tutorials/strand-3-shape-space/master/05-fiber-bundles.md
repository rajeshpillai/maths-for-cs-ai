---
strand: shape-space
level: master
order: 5
title: Fiber Bundles and Connections
prerequisites:
  - tier: strand-3-shape-space-master
    slug: 04-lie-groups
    description: Lie groups
connections:
  - strand-3-shape-space-master/06-symplectic-geometry
applications:
  - cs: "Gauge theory, principal-bundle ML, robotics"
  - life: "Manifolds with structured fibers"
---

# Fiber Bundles and Connections

## Explain Like I Am 7

Picture a long row of houses.  Above each house, dangle a tiny
balloon — and each balloon has its own little world inside it.  The
row of houses is the *base*; the dangling worlds are the *fibres*;
the whole apartment-of-balloons is a **fibre bundle**.  Now imagine
walking along the houses while *also* moving inside the balloon
above you.  A **connection** is a rule that says: "if you take this
step on the ground, here's the matching step you should take inside
the balloon to stay lined up."  That rule is how curvature is
secretly stored.

## Mental

A **fiber bundle** $E \xrightarrow{\pi} B$ with **fiber** $F$:

- Locally $E \cong U \times F$ for $U \subseteq B$ (local triviality).
- Continuous projection $\pi : E \to B$.

Examples:

- **Trivial**: $B \times F$.
- **Möbius strip**: $S^1 \times [0, 1]$ with twist; non-trivial.
- **Tangent bundle** $TM \to M$ with fiber $\mathbb R^n$.
- **Principal bundle** $P \to B$: fiber is a Lie group $G$ acting
  freely.
- **Vector bundle**: fiber is a vector space.

## Connections

A **connection** on a bundle assigns to each path in $B$ a way to
*lift* it to a path in $E$ — generalising parallel transport.

For a **principal $G$-bundle**, a connection is a $\mathfrak g$-valued
1-form $\omega$ on $P$ with specific $G$-equivariance properties.

For a **vector bundle**, a covariant derivative
$\nabla : \Gamma(E) \to \Omega^1 \otimes \Gamma(E)$ — a way to
differentiate sections.

The **Levi-Civita connection** (Lesson 03) is a special case for
$TM$.

## Curvature

The **curvature** $F = d\omega + \omega \wedge \omega$ measures
non-triviality of the connection. For a flat connection, $F = 0$
(parallel transport is path-independent locally).

In gauge theory, $F$ is the **field strength** of a force.

## Worked example: $\mathrm U(1)$ principal bundle (electromagnetism)

Spacetime $M$. Principal $\mathrm U(1)$-bundle $P \to M$. A
connection 1-form $A$ (the **electromagnetic potential**).

Curvature $F = dA$ — the **electromagnetic field tensor**.

Maxwell's equations: $dF = 0$ (Bianchi) and $d * F = J$ (sources).

The 4-potential $A$ in physics is *exactly* this Lie-algebra-valued
connection 1-form.

## Interactive

:::widget type=numeric-input prompt="Möbius strip is a non-trivial bundle. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Connection on principal $G$-bundle: $\\mathfrak g$-valued 1-form. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Curvature $F = dA$ in electromagnetism. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Maxwell: $dF = 0$ and $d * F = J$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Holonomy**: parallel transport around a loop gives an element of $G$.
For $\mathrm U(1)$ bundles: phase factor — the **Aharonov-Bohm
phase** in quantum mechanics.

**Gauge transformations**: change of trivialisation. Physical
observables are gauge-invariant.

**Yang-Mills theory**: gauge theory with non-abelian $G$. The action
$\int \mathrm{tr}(F \wedge * F)$ defines the dynamics. Standard Model
uses $\mathrm{SU}(3) \times \mathrm{SU}(2) \times \mathrm{U}(1)$
(Lessons 03-04 Strand 2 Master).

**Chern-Weil theory**: characteristic classes (Chern, Pontryagin,
Euler) computed from curvature, classifying bundles topologically.

**Donaldson theory**: $\mathrm{SU}(2)$ Yang-Mills in 4D yields
invariants distinguishing exotic 4-manifolds.

## Computational

```python
import numpy as np

# A connection on a Möbius strip: the bundle has fiber [0, 1]
# After going around once, the fiber flips: τ → 1 - τ.

def parallel_transport_mobius(start_value, n_loops=1):
    # τ ∈ [0, 1] flips after each loop
    return start_value if n_loops % 2 == 0 else 1 - start_value

print(parallel_transport_mobius(0.3, n_loops=1))   # 0.7
print(parallel_transport_mobius(0.3, n_loops=2))   # 0.3 — back

# Gauge connection in U(1) — toy example
# A = -y dx + x dy (vector potential of constant magnetic field)
# B = dA = 2 dx ∧ dy — uniform magnetic field

# Holonomy around unit circle: ∮ A
# = ∫_0^{2π} (-sin t)(-sin t) + (cos t)(cos t) dt = ∫ 1 dt = 2π
# Berry phase = exp(i 2π) = 1, but Aharonov-Bohm uses different setups.
print("Holonomy of a constant B field around unit circle: 2π (= flux Φ).")

# Real ML application: Lie-group convolution
# A G-equivariant neural network's weights live in a homogeneous bundle;
# parameter-sharing across G corresponds to "covariant derivative" on the bundle.
```

## Applied

- **Gauge theory in physics** — every fundamental force is a Yang-
  Mills theory on a principal bundle.
- **Equivariant ML** — bundles over symmetry groups; weight-sharing
  schemes are connection-like structures (Cohen-Welling et al.).
- **Robotics motion control** — torsion-free connections on
  configuration manifolds; geometric control theory.
- **Computer graphics — Christoffel-style smoothing** — discrete
  connections on triangle meshes.
- **Quantum-information topological codes** — anyonic systems use
  fiber-bundle/connection structure for fault-tolerant gates.

## Check Your Understanding

:::widget type=numeric-input prompt="Möbius strip is a non-trivial line bundle on $S^1$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="EM 4-potential $A$ is a connection on $\\mathrm U(1)$ bundle. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$F = dA$ — field strength = curvature. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Yang-Mills uses non-abelian Lie groups. Type 1." answer=1 explain="Yes.":::
