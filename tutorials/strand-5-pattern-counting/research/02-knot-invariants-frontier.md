---
strand: pattern-counting
level: research
order: 2
title: Knot Invariants Frontier
prerequisites:
  - tier: strand-5-pattern-counting-research
    slug: 01-coarse-geometry
    description: Coarse geometry
connections:
  - strand-5-pattern-counting-research/03-combinatorial-physics
applications:
  - cs: "Quantum-computer-aided knot detection, topological QC"
  - life: "Distinguishing knots — and going deeper than Jones"
---

# Knot Invariants Frontier

## Mental

A **knot**: embedding $S^1 \hookrightarrow S^3$ up to isotopy.
Distinguishing knots is a classical hard problem.

Modern invariants beyond Jones polynomial:

- **Khovanov homology** (Khovanov 1999): categorification of Jones;
  bigraded chain complex whose Euler characteristic = Jones.
- **Heegaard-Floer / link Floer** (Ozsváth-Szabó): Floer-style
  invariants of knots, surgeries, 3-manifolds.
- **HOMFLY-PT, Kauffman polynomial**: classical extensions.
- **Vassiliev / finite-type invariants**: polynomial-style invariants
  classified by chord diagrams.

## Khovanov homology

For each knot $K$, get bigraded $\mathbb Z$-modules $\mathit{Kh}^{i, j}(K)$.

- Polynomial Euler characteristic $\sum (-1)^i q^j \mathrm{rank}(\mathit{Kh}^{i, j})$
  = Jones polynomial of $K$.
- Khovanov detects more than Jones: distinguishes some knot pairs
  with same Jones.

**Rasmussen's $s$-invariant**: extracted from Khovanov, gave new
proof of *Milnor's conjecture* on slice genus of torus knots.

## Computational complexity of unknot recognition

**Recognising the unknot**: in $\mathbf{NP}$ (Hass-Lagarias-Pippenger
1999); in $\mathbf{coNP}$ (Lackenby 2016, conditional); not known to
be in $\mathbf P$.

So knot-isotopy decision sits in interesting complexity-class
neighbourhood — possibly amenable to *quantum algorithms*.

## Worked example: trefoil

Trefoil $3_1$: simplest non-trivial knot. Crossing number 3.

- Jones polynomial: $-t^4 + t^3 + t$.
- Khovanov homology: bigraded — encodes more than $V(t)$.

## Interactive

:::widget type=numeric-input prompt="Khovanov homology categorifies Jones polynomial. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Rasmussen $s$-invariant from Khovanov. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Unknot recognition in NP (Hass-Lagarias-Pippenger 1999). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Trefoil $3_1$ Jones polynomial: $-t^4 + t^3 + t$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Quantum invariants from quantum groups**: Reshetikhin-Turaev gave
WRT 3-manifold invariants from each modular tensor category. Many
quantum invariants of knots derived this way.

**Knot Floer homology** (Ozsváth-Szabó 2003): categorifies Alexander
polynomial.

**Kauffman bracket**: combinatorial Jones via skein relation —
elementary computation.

**Knot quantum computer** (Aharonov-Jones-Landau): efficient quantum
algorithm to approximate Jones polynomial at roots of unity.

## Computational

```python
import numpy as np

# Kauffman bracket / Jones for trefoil

# Trefoil has 3 crossings. Each crossing → smoothing into 0 or ∞ states
# 2³ = 8 states; sum over states with weights A^a (-A^2 - A^-2)^|loops|
# Jones obtained from V(t) = (-A)^{-3 writhe} <K>(A)
# At t = A^-4

# For trefoil: writhe = +3 (right-handed), <K> = ...
# V(t) = -t^-4 + t^-3 + t^-1  (right-handed)
# or -t^4 + t^3 + t  (left-handed convention varies)

A = np.exp(1j * np.pi / 8)  # at root of unity
def jones_trefoil_at(t):
    return -t**4 + t**3 + t

# Verify at t = 1: trivial
print(f"V_trefoil(1) = {jones_trefoil_at(1)}")    # 1, normalised at t = 1

# Computing Jones polynomial in general: SnapPy + sage knots package
print("Computational knot theory: SnapPy + sage knots / KnotJob.")

# Khovanov homology: small examples computed by hand;
# general computation via JavaKh, KnotJob, kbar
```

## Applied

- **Topological-quantum computing** — Jones evaluation at roots of
  unity = quantum computation; AJL theorem.
- **DNA topology** — knotted / linked DNA molecules studied via knot
  invariants.
- **Polymer physics** — knot type affects polymer dynamics.
- **Mathematical physics** — knot invariants from CS, WZW, etc.
- **Chern-Simons computer-aided detection** — Witten / Witten-
  Reshetikhin-Turaev invariants.

## Check Your Understanding

:::widget type=numeric-input prompt="Khovanov categorifies Jones. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Rasmussen $s$ from Khovanov, slice-genus result. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Unknot in NP (HLP 1999). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="AJL: quantum approximation of Jones at roots of unity. Type 1." answer=1 explain="Yes.":::
