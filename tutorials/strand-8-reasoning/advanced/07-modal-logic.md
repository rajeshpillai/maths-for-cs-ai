---
strand: reasoning
level: advanced
order: 7
title: Modal Logic
prerequisites:
  - tier: strand-8-reasoning-advanced
    slug: 06-realizability
    description: Realizability
connections:
  - strand-8-reasoning-advanced/08-temporal-logic
applications:
  - cs: "Knowledge representation, epistemic logic, distributed systems"
  - life: "Necessity, possibility, knowledge, time, obligation"
---

# Modal Logic

## Explain Like I Am 7

Plain logic talks about what is.  **Modal logic** adds two extra
words: "*must*" and "*might*."  Picture a chain of bedrooms in a
hotel; each bedroom is a possible world.  "*Must* be true" means it's
true in every bedroom you can wander into; "*might* be true" means
there's at least one bedroom where it's true.  Different hotels
(different ways the bedrooms link up) give you different flavours:
one for "necessary," one for "I know," one for "it's allowed,"
even one for "later."  Same trick, lots of uses.

## Mental

**Modal logic** extends propositional logic with operators expressing
**necessity** ($\Box$) and **possibility** ($\Diamond$):

- $\Box \phi$: "$\phi$ is necessarily true."
- $\Diamond \phi$: "$\phi$ is possibly true."

Duality: $\Diamond \phi \equiv \neg \Box \neg \phi$.

The "necessary/possible" reading admits many interpretations
depending on the application domain.

## Common modal operators

| Modality | Reading |
|---|---|
| $\Box \phi$ | $\phi$ is necessarily true (alethic) |
| $K_a \phi$ | agent $a$ knows $\phi$ (epistemic) |
| $B_a \phi$ | agent $a$ believes $\phi$ (doxastic) |
| $O \phi$ | $\phi$ is obligatory (deontic) |
| $G \phi$ | $\phi$ is true at all future times (temporal) |
| $F \phi$ | $\phi$ is true at some future time |

## Kripke semantics

A **Kripke frame** is a graph: states $W$ + accessibility relation
$R \subseteq W \times W$.

A **Kripke model** assigns each propositional letter $p$ a set
$V(p) \subseteq W$ — the states where $p$ holds.

Truth at state $w$:

- $w \models p$ iff $w \in V(p)$.
- $w \models \Box \phi$ iff $v \models \phi$ for all $v$ with $w R v$.
- $w \models \Diamond \phi$ iff some such $v$ exists.

Interpret $w R v$ as "$v$ is reachable / accessible from $w$."

## Worked example: epistemic logic

Two agents Alice ($a$) and Bob ($b$). $K_a \phi$: "Alice knows
$\phi$." 

States = possible worlds. $w R_a v$ means "Alice can't tell $w$ from
$v$." Then $K_a \phi$ at $w$ iff $\phi$ holds in every world Alice
considers possible.

**Common knowledge** $C \phi$: $\phi$ is known, known-to-be-known,
known-to-be-known-to-be-known, ... ad infinitum. Infinite-conjunction
modal operator.

## Interactive

:::widget type=numeric-input prompt="$\\Diamond \\phi \\equiv \\neg \\Box \\neg \\phi$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Kripke frame: states + accessibility relation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$K_a \\phi$ — agent $a$ knows $\\phi$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Common knowledge $C\\phi$ requires the infinite chain $\\phi$, $K\\phi$, $KK\\phi$, ... Type 1." answer=1 explain="Yes.":::

## Symbolic

**Modal axioms and their semantics**:

| Axiom | Frame condition |
|---|---|
| K: $\Box(\phi \to \psi) \to (\Box \phi \to \Box \psi)$ | always (axiom of normal modal logic) |
| T: $\Box \phi \to \phi$ | reflexive: $w R w$ |
| 4: $\Box \phi \to \Box \Box \phi$ | transitive |
| 5: $\Diamond \phi \to \Box \Diamond \phi$ | euclidean |
| B: $\phi \to \Box \Diamond \phi$ | symmetric |
| D: $\Box \phi \to \Diamond \phi$ | serial (each state has successor) |

Combinations of these give standard systems: KT (T), S4 (KT4),
S5 (KT45 or equivalently KT5, frame is equivalence relation).

**Kripke completeness**: each axiom system is sound and complete
with respect to its frame class. Decidable for many systems.

## Computational

```python
# Kripke model checker for K and Diamond

def model_check(states, accessibility, valuation, w, formula):
    """
    states: list of state names
    accessibility: dict from state to list of successor states
    valuation: dict from state to set of true atoms
    w: current state
    formula: tuple representation
    """
    if isinstance(formula, str):           # atom
        return formula in valuation.get(w, set())
    op, *args = formula
    if op == "not":
        return not model_check(states, accessibility, valuation, w, args[0])
    if op == "and":
        return all(model_check(states, accessibility, valuation, w, a) for a in args)
    if op == "or":
        return any(model_check(states, accessibility, valuation, w, a) for a in args)
    if op == "box":
        return all(model_check(states, accessibility, valuation, v, args[0])
                   for v in accessibility.get(w, []))
    if op == "diamond":
        return any(model_check(states, accessibility, valuation, v, args[0])
                   for v in accessibility.get(w, []))
    raise ValueError(f"unknown op {op}")

# Three states forming a chain
states = ["w0", "w1", "w2"]
acc = {"w0": ["w1"], "w1": ["w2"], "w2": []}
val = {"w0": set(), "w1": {"p"}, "w2": {"p"}}

# At w0, is "diamond p" true?
print(model_check(states, acc, val, "w0", ("diamond", "p")))     # True
# At w0, is "box p" true?
print(model_check(states, acc, val, "w0", ("box", "p")))         # True (only w1, has p)
# At w0, is "box (box p)"?
print(model_check(states, acc, val, "w0", ("box", ("box", "p"))))  # True (w1 has p; w2 reachable from w1)
```

## Applied

- **Knowledge representation** — multi-agent systems, AI planning
  use epistemic logic.
- **Distributed systems** — knowledge-based reasoning about message
  passing (Halpern-Moses framework).
- **Formal methods** — temporal logic (LTL, CTL) is modal logic for
  time; used in model checking (Lesson 08).
- **Provability logic** (GL): $\Box$ as "is provable in PA";
  Solovay's theorem characterises PA's reasoning about itself.
- **Description logic** for OWL/RDF semantic web is a multi-modal
  decidable fragment.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\Box$ and $\\Diamond$ are dual. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Kripke semantics: accessibility relation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="S5 frame: equivalence relation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Common knowledge needs infinite chain of Ks. Type 1." answer=1 explain="Yes.":::
