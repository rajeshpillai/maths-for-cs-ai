---
strand: computation
level: master
order: 8
title: Formal Verification at Industrial Scale
prerequisites:
  - tier: strand-7-computation-master
    slug: 07-differential-privacy
    description: Differential privacy
connections:
  - strand-7-computation-master/09-computation-master-capstone
applications:
  - cs: "OS kernels, compilers, blockchain, hardware"
  - life: "Software with mathematical guarantees"
---

# Formal Verification at Industrial Scale

## Mental

**Formal verification**: prove that a system meets its specification
mathematically rather than by testing.

Three classical approaches:

- **Model checking**: enumerate (or symbolically explore) state
  space (Strand 8 Advanced Lesson 08).
- **Theorem proving**: hand-guided + machine-checked proofs in Coq,
  Lean, Isabelle.
- **Static analysis**: automatic abstraction-based property checks
  (Frama-C, Infer, Astrée).

## Industrial successes

| System | Tool | Achievement |
|---|---|---|
| seL4 | Isabelle/HOL | OS kernel verified (~10 KLOC) |
| CompCert | Coq | C compiler verified |
| CakeML | HOL4 | ML compiler verified |
| Astrée | Static analysis | Airbus avionics, no runtime errors |
| AWS s2n | Coq + SAW | TLS implementation |
| Toyota TLE | Model checking | Embedded controllers |

These are *real production systems* with formally verified
properties.

## Refinement and abstraction

**Refinement**: stepwise replace abstract spec by concrete
implementation, preserving correctness.

**Abstraction**: replace concrete details with abstract over-
approximation; verify property on abstraction; lift to concrete.

Both essential for managing complexity.

## SAT and SMT solvers

**SAT solvers**: decide propositional satisfiability. Modern CDCL
solvers handle millions of variables.

**SMT solvers** (Z3, CVC5, Yices): SAT modulo theories — equality
of uninterpreted functions, linear arithmetic, arrays, bit-vectors,
strings.

Used by:

- Microsoft's static-analysis tooling (Driver Verifier).
- Solidity smart-contract verifiers.
- Compiler bug-finding (CSmith + Z3).

## Interactive

:::widget type=numeric-input prompt="seL4 is a verified OS kernel. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="CompCert is a verified C compiler in Coq. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="SAT/SMT solvers handle millions of variables. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Astrée verified Airbus flight controls. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Hoare logic**: $\{P\} S \{Q\}$ means: if $P$ holds before $S$, then
$Q$ holds after. Foundation of Floyd-Hoare verification.

**Separation logic** (O'Hearn-Reynolds): extension for reasoning about
mutable heap and pointers. Crucial for verifying concurrent and
heap-manipulating programs.

**Refinement type systems** (Liquid Haskell, F*, Dafny): types
augmented with logical predicates; SMT-checked at compile time.

**Differentially-private mechanisms** can be verified formally —
APX (Cohen-Naor-Stemmer 2014).

**ML verification**: verify deep-net robustness against adversarial
attacks via SMT or specialised reachability tools (Marabou,
$\alpha$-$\beta$-CROWN).

## Computational

```python
# Use Z3 for a tiny formal verification example
try:
    from z3 import Solver, Int, Bool, And, Or, Not, sat, Implies

    # Verify: if x and y are non-negative integers, then x + y >= max(x, y)
    s = Solver()
    x = Int('x'); y = Int('y')
    s.add(x >= 0, y >= 0)
    # Negation of property
    s.add(Not(Or(x + y >= x, x + y >= y)))    # Try to find counter-example
    print(f"Trivial property: {s.check()}")    # unsat → proven

    # SAT example: solve a logic puzzle
    s = Solver()
    a, b, c = Bool('a'), Bool('b'), Bool('c')
    s.add(Or(a, b, c), Not(And(a, b)), Not(And(b, c)))
    print(f"Puzzle: {s.check()}")              # sat
    print(f"Model: {s.model()}")
except ImportError:
    print("z3-solver not installed. pip install z3-solver to run formal verification examples.")

# Toy Hoare-logic verifier
def verify_assignment(P, x_var, e, Q):
    """{P} x := e {Q} verifies if P implies Q[x ↦ e]."""
    # Substitute e for x in Q symbolically — sketch only
    return f"verify {P} ⇒ {Q.replace(x_var, e)}"

print(verify_assignment("x > 0", "x", "x + 1", "x > 1"))
# verify x > 0 ⇒ (x + 1 > 1) — tautology
```

## Applied

- **OS kernels** — seL4, CertiKOS.
- **Compilers** — CompCert (C), CakeML (ML).
- **Cryptographic implementations** — HACL\* (Mozilla), Project
  Everest.
- **Smart contracts** — Certora, K framework, Move Prover.
- **AI safety** — verify neural-network robustness in safety-
  critical domains.
- **Hardware** — Intel uses formal verification on x86 floating-
  point and crypto units.

## Check Your Understanding

:::widget type=numeric-input prompt="Hoare logic: $\\{P\\} S \\{Q\\}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Separation logic handles heap/pointer reasoning. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="seL4 / CompCert are verified production systems. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="SMT extends SAT with theories. Type 1." answer=1 explain="Yes.":::
