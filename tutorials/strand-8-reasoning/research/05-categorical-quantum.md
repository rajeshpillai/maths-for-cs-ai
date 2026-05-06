---
strand: reasoning
level: research
order: 5
title: Categorical Quantum Mechanics
prerequisites:
  - tier: strand-8-reasoning-research
    slug: 04-ai-safety-formal
    description: AI safety formal foundations
connections:
  - strand-8-reasoning-research/06-infinity-cosmoi
applications:
  - cs: "Quantum-protocol verification, ZX-calculus compilers, quantum-circuit equivalence"
  - life: "Quantum mechanics axiomatised by string-diagram categories"
---

# Categorical Quantum Mechanics

## Explain Like I Am 7

Quantum physics is famously full of scary equations.  Researchers
discovered that almost all the maths can be drawn instead as
*spaghetti diagrams*: each quantum particle is a string, each
interaction is a knot or crossing, and you reason by tugging the
strings into tidier shapes.  If two diagrams can be wiggled into the
same picture without snipping or gluing, they describe the *same*
physics.  Suddenly hard quantum proofs become little doodling games,
and tricks like teleportation are a few twists of spaghetti.

## Mental

**Categorical quantum mechanics (CQM)** (Abramsky-Coecke 2004):
recast quantum mechanics in terms of *symmetric monoidal dagger
categories* — string-diagrammatic axioms.

The category $\mathbf{FdHilb}$ (finite-dim Hilbert spaces, linear
maps, tensor product, adjoint) becomes the prototypical model.

**Goal**: derive quantum protocols (teleportation, dense coding)
from purely categorical axioms.

## String-diagram syntax

Wires represent objects; boxes represent morphisms. Composition
vertical, tensor horizontal. **Diagrammatic reasoning** =
formal proof.

| Concept | Diagram |
|---|---|
| Identity | straight wire |
| Map $f : A \to B$ | box with $A$-input, $B$-output |
| Composition $g \circ f$ | stack vertically |
| Tensor $f \otimes g$ | place side by side |
| Dagger $f^\dagger$ | flip upside-down |
| Cup / cap | "yanking equation" $|\Phi^+\rangle$ Bell state |

## ZX-calculus

**Coecke-Duncan 2008**: complete diagrammatic calculus for
qubit quantum computing. Two generators (green and red spiders) +
rewrite rules.

**Theorem (Vilmart 2018)**: ZX-calculus is *complete* for
$\mathbf{Qubit}$ — every true equation between qubit linear maps
follows from the rewrite rules.

**PyZX, Quantomatic, ZXLive**: software for ZX-rewriting; used in
quantum-circuit optimisation.

## Frobenius algebras and complementarity

**Frobenius algebras** (commutative): correspond to **classical
data** — copying and deleting.

**Complementary pairs of Frobenius algebras**: encode
**non-degenerate** quantum bases. Recovers Hadamard gate
diagrammatically.

## Interactive

:::widget type=numeric-input prompt="Categorical QM (Abramsky-Coecke 2004): symmetric monoidal dagger category. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="ZX-calculus complete for qubit QC (Vilmart 2018). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Bell state via cup/cap morphism. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Frobenius algebras for classical data (copying/deleting). Type 1." answer=1 explain="Yes.":::

## Symbolic

**Quantum teleportation, diagrammatically**: input state $\psi$,
Bell pair $|\Phi^+\rangle$, measurement, classical outcome
correction. Snake/yank equation reduces to identity = state arrives
at Bob.

**Compact closed structure**: every object $A$ has a dual $A^*$
with cup $\eta : I \to A^* \otimes A$ and cap
$\varepsilon : A \otimes A^* \to I$. Yanking: 
$(\varepsilon \otimes 1_A) \circ (1_A \otimes \eta) = 1_A$.

**No-cloning theorem, categorically**: a copying map
$\Delta : A \to A \otimes A$ natural in $A$ would force the
category to be cartesian, which $\mathbf{FdHilb}$ is not. Hence
no universal cloner.

**Quantum natural language processing (DisCoCat)**: same
diagrammatic framework applied to compositional semantics
(Coecke et al.).

## Computational

```python
# ZX-calculus: spider rule and identity sketch via PyZX-style API
# (PyZX itself is the production library; this is just a feel)

class Spider:
    """Green or red spider with N inputs and M outputs and phase α."""
    def __init__(self, color, in_arity, out_arity, phase=0.0):
        self.color = color
        self.in_arity = in_arity
        self.out_arity = out_arity
        self.phase = phase
    def __repr__(self):
        return f"{self.color}[{self.in_arity},{self.out_arity},{self.phase:.2f}π]"

# Spider fusion rule: two same-color spiders connected by an edge fuse
# (in,out, phase) merge phases additively
def fuse(s1, s2):
    """Fuse two same-colour spiders sharing one wire."""
    if s1.color != s2.color:
        return None     # cannot fuse
    return Spider(s1.color,
                  s1.in_arity + s2.in_arity - 1,
                  s1.out_arity + s2.out_arity - 1,
                  s1.phase + s2.phase)

a = Spider("Z", 2, 2, 0.25)
b = Spider("Z", 1, 3, 0.5)
print(f"Fused: {fuse(a, b)}")    # Z[2,4,0.75π]

# Real ZX optimisers: PyZX reduces circuits via spider/Hadamard rewrites
print()
print("Production: PyZX (Kissinger-van de Wetering)")
print("Used in quantum-circuit compilation: T-count reduction etc.")
```

## Applied

- **Quantum-circuit optimisation** — PyZX reduces T-count by 30-40%.
- **Quantum-protocol verification** — Quantomatic for protocol
  equivalence.
- **Quantum-language semantics** — DisCoCat for NLP.
- **Quantum-error correction** — diagrammatic surface-code analysis.
- **Foundations** — categorical reformulation feeds into HoTT-style
  quantum extensions.

## Check Your Understanding

:::widget type=numeric-input prompt="String-diagram reasoning for quantum protocols. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="ZX-calculus complete (Vilmart 2018). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="No-cloning: category-theoretically because not cartesian. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="DisCoCat: same diagrams for NLP. Type 1." answer=1 explain="Yes.":::
