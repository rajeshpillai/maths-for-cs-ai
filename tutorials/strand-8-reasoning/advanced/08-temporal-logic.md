---
strand: reasoning
level: advanced
order: 8
title: Temporal Logic and Model Checking
prerequisites:
  - tier: strand-8-reasoning-advanced
    slug: 07-modal-logic
    description: Modal logic
connections:
  - strand-8-reasoning-advanced/09-reasoning-capstone-3
applications:
  - cs: "Hardware/software verification, protocol analysis"
  - life: "Reasoning about systems over time"
---

# Temporal Logic and Model Checking

## Explain Like I Am 7

Picture a model train chugging round and round a track that splits at
every station.  You want promises like "the red light *eventually*
turns green," "the doors are *never* open while moving," "*always*,
once a button is pressed, the bell rings *next*."  **Temporal logic**
gives you tidy little symbols for these "always," "eventually,"
"next" promises.  A robot called a *model checker* then walks the
whole track at lightning speed, checking every station and every fork,
and tells you exactly which promise — if any — gets broken.

## Mental

**Temporal logic** uses modal operators specialised for time:

- **Linear-time** (LTL) operators on a single timeline:
  - $X \phi$: "next state, $\phi$."
  - $G \phi$: "always (globally), $\phi$."
  - $F \phi$: "eventually (finally), $\phi$."
  - $\phi U \psi$: "$\phi$ holds until $\psi$."

- **Branching-time** (CTL) reasons about possible futures:
  - $AG \phi$: "$\phi$ true on every path forever."
  - $EF \phi$: "$\phi$ true on some path eventually."
  - Path quantifiers $A$ (all), $E$ (exists) before each temporal op.

## Why care?

Specifying *what programs should do over time* requires temporal
language:

- **Safety**: $G(\neg \text{bad})$ — "bad never happens."
- **Liveness**: $F(\text{progress})$ — "progress eventually happens."
- **Fairness**: $GF(\text{enabled} \to \text{taken})$ — "if always
  enabled, eventually taken."

These shape formal specifications for protocols, hardware, OS
kernels.

## Model checking

Given a finite-state system $M$ and temporal formula $\phi$, **model
checking** is the algorithmic decision: $M \models \phi$?

Algorithms:

- **CTL**: explicit-state recursion on formula structure, $O(|M| \cdot |\phi|)$.
- **LTL**: build a Büchi automaton from $\phi$, take product with
  $M$, check emptiness. PSPACE-complete in $|\phi|$.
- **Symbolic** (BDD-based): represent $M$ implicitly via Boolean
  formulas. Scales to $10^{20}+$ state spaces.

Tools: NuSMV, Spin, TLA+, UPPAAL, Z3.

## Worked example: producer-consumer

Two processes share a buffer. **Safety property**: buffer never
overflows.

$$
G(\text{buffer.size} \le \text{capacity}).
$$

**Liveness**: every produced item eventually consumed.

$$
G(\text{produced} \to F \text{consumed}).
$$

Model checker explores all interleavings of producer/consumer
transitions; if either property fails, returns a counter-example
trace.

## Interactive

:::widget type=numeric-input prompt="$G \\phi$: always $\\phi$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Liveness $F \\phi$ — eventually. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Model checking is decidable for finite-state systems. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="LTL model checking: PSPACE-complete in formula size. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Büchi automata** — automata accepting infinite strings via
"infinitely-often" acceptance condition. LTL → Büchi → product with
system → emptiness check.

**Counter-example guided abstraction refinement (CEGAR)**:
abstract the system, model check; if counter-example is spurious,
refine the abstraction. Used in industrial-scale verification.

**Bounded model checking (BMC)**: unroll system to depth $k$, check
satisfiability via SAT solver. Finds short counter-examples
quickly; doesn't prove correctness for unbounded executions.

**Probabilistic model checking** (PCTL, PRISM tool): handle
stochastic systems with quantitative properties.

## Computational

```python
# Simple LTL/CTL semantics on a Kripke model
from collections import defaultdict

class TemporalModel:
    def __init__(self):
        self.states = []
        self.trans = defaultdict(list)        # adjacency
        self.label = defaultdict(set)         # state -> set of atoms

    def add_state(self, name, atoms):
        self.states.append(name)
        self.label[name] = set(atoms)

    def add_edge(self, u, v):
        self.trans[u].append(v)

    def AG(self, phi, start):
        # phi true on all reachable states
        seen = set()
        stack = [start]
        while stack:
            s = stack.pop()
            if s in seen: continue
            seen.add(s)
            if not phi(s, self): return False
            stack.extend(self.trans[s])
        return True

    def EF(self, phi, start):
        seen = set()
        stack = [start]
        while stack:
            s = stack.pop()
            if s in seen: continue
            seen.add(s)
            if phi(s, self): return True
            stack.extend(self.trans[s])
        return False

# 3-state system; ensure traffic light eventually shows green
m = TemporalModel()
m.add_state("R", {"red"})
m.add_state("Y", {"yellow"})
m.add_state("G", {"green"})
m.add_edge("R", "G")
m.add_edge("G", "Y")
m.add_edge("Y", "R")

print(m.EF(lambda s, mm: "green" in mm.label[s], "R"))   # True
print(m.AG(lambda s, mm: "red" not in mm.label[s], "R")) # False (R has red)
```

## Applied

- **Hardware verification** — Intel, AMD use model checking on CPU
  designs to catch bugs before fabrication. Tools: Cadence JasperGold,
  Synopsys VC Formal.
- **Distributed-systems verification** — Amazon used TLA+ on S3, DynamoDB
  protocols. Microsoft uses TLA+ on Azure consistency.
- **Cryptographic protocol analysis** — ProVerif, Tamarin model-check
  protocols for secrecy / authentication.
- **Reactive controllers** — automotive (drive-by-wire), avionics
  (flight controls) use temporal-logic specifications.
- **AI safety** — formal specifications of agent behaviour using
  temporal + first-order logic.

## Check Your Understanding

:::widget type=numeric-input prompt="$F \\phi$: eventually $\\phi$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Model checker decides $M \\models \\phi$ algorithmically. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="LTL ⊆ properties expressible as Büchi automata. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Symbolic model checking with BDDs handles huge state spaces. Type 1." answer=1 explain="Yes.":::
