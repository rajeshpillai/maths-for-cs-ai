---
strand: reasoning
level: research
order: 2
title: Modal Type Theory
prerequisites:
  - tier: strand-8-reasoning-research
    slug: 01-cohesive-types
    description: Cohesive type theory
connections:
  - strand-8-reasoning-research/03-proof-complexity-frontier
applications:
  - cs: "Staged computation, information-flow security, distributed types"
  - life: "Modes (necessity, possibility) brought into types"
---

# Modal Type Theory

## Explain Like I Am 7

Remember how some lessons taught logic with the words "must" and
"might"?  **Modal type theory** sticks those words *onto the
stickers* on each puzzle piece.  Now a piece can wear "$\Box$ secret"
meaning "this thing is locked safely in a box," or "$\Diamond$
later" meaning "this thing arrives in the future."  When you snap
pieces together, the must-and-might rules ride along, so the puzzle
itself enforces "you can't peek inside the box yet" or "you can't use
tomorrow's data today."  Useful for security, staged programs, and
distributed systems.

## Mental

**Modal logic**: classical / intuitionistic logic enriched with
operators $\Box$ (necessity) and $\Diamond$ (possibility).

**Modal type theory**: modalities lift to type formers — a type $\Box A$
might mean "$A$ is statically known" or "$A$ is closed".

Connection to **categorical semantics**: modalities = (co)monads on the
category of contexts.

## Examples of modalities in CS

| Modality | Reads as | Type-system meaning |
|---|---|---|
| $\Box A$ | necessarily $A$ | always-available / closed term |
| $\Diamond A$ | possibly $A$ | future-time / suspended computation |
| $\langle s \rangle A$ | label $s$ on $A$ | information at security level $s$ |
| $\bigcirc A$ | next-time $A$ | reactive / temporal types |

**Pfenning-Davies (2001)**: foundational analysis of $\Box$ as
"closed term" — terms with no free variables, can be staged.

## Adjoint type theory

**Reed (2009), Licata-Shulman-Riley (2017)**: a calculus of
modalities and their adjunctions, built into the syntax.

Modalities $\mu \dashv \nu$ as adjoint functors give a uniform
account of staged programs, monadic effects, comonadic environments.

## Cubical / modal HoTT

Modal HoTT extends cubical type theory with modalities for
spatial / temporal / cohesive structure (Strand 8 Research Lesson 01).

**Real-cohesion HoTT**: $\flat$ (discrete), $\sharp$ (codiscrete),
$\int$ (shape) inside Agda.

## Interactive

:::widget type=numeric-input prompt="$\\Box A$ in modal type theory: necessarily $A$ / closed term. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Staged computation modeled by $\\Box$ modality (Pfenning-Davies). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Adjoint type theory: modalities as adjoint functors. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Information-flow security uses modal types. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Comonadic environments**: $\Box A$ as comonad — has counit
$\varepsilon : \Box A \to A$ ("use") and comultiplication
$\delta : \Box A \to \Box \Box A$ ("duplicate").

**Modal $\lambda$-calculus** (Davies-Pfenning):

$$
\frac{\Gamma; \cdot \vdash M : A}{\Gamma; \Delta \vdash \mathsf{box}\ M : \Box A}
\qquad
\frac{\Gamma; \Delta \vdash M : \Box A \quad \Gamma, x : A; \Delta \vdash N : C}
{\Gamma; \Delta \vdash \mathsf{let}\ \mathsf{box}\ x = M\ \mathsf{in}\ N : C}
$$

Two-zone context: closed-zone $\Gamma$ for box-friendly variables,
open-zone $\Delta$ for ordinary.

**Linear-temporal modal types**: $\bigcirc A$ for FRP (functional
reactive programming) — Krishnaswami et al.

## Computational

```python
# Modal-style staged computation in Python (sketch)
# Box A = code for A; "box" creates code, "letbox" splices

class Box:
    """Wraps code (closed expression)."""
    def __init__(self, code_str):
        self.code = code_str
    def __repr__(self):
        return f"<box: {self.code}>"

def box(code_str):
    """Box constructor: closed-context check would happen here."""
    return Box(code_str)

def letbox(b, body_lambda):
    """Run body with variable bound to the boxed code."""
    return body_lambda(b.code)

# Example: stage a doubled function
double_box = box("lambda x: 2 * x")
# Splice: build a new function that uses double inside
result = letbox(double_box, lambda code: f"def f(y): return ({code})(y) + 1")
print("Generated code:", result)
# Generated code: def f(y): return (lambda x: 2 * x)(y) + 1

print()
print("Real modal-typed languages: MetaOCaml (Box-based staging),")
print("Sliver (security types), Agda's modalities (cohesive HoTT).")
```

## Applied

- **Multi-stage programming** — MetaOCaml uses $\Box$-typed staging.
- **Information-flow types** — Jif, FlowCaml use modalities for
  security levels.
- **FRP** — temporal modalities for reactive programs.
- **Distributed types** — modalities tag location of computation
  (Murphy et al.).
- **Differential / cohesive HoTT** — modalities for geometric
  structure (Strand 8 Research Lesson 01).

## Check Your Understanding

:::widget type=numeric-input prompt="Modal type theory: lift $\\Box$/$\\Diamond$ to types. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="MetaOCaml uses Box-typed staging. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Modalities as (co)monads. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="FRP uses temporal modal types. Type 1." answer=1 explain="Yes.":::
