---
strand: reasoning
level: research
order: 9
title: Reasoning Research Capstone
prerequisites:
  - tier: strand-8-reasoning-research
    slug: 08-emerging-foundations
    description: Emerging foundations
connections:
  - strand-8-reasoning-research/09-reasoning-research-capstone
applications:
  - cs: "Foundations + AI alignment + categorical / type-theoretic frontiers"
  - life: "Where mathematical reasoning is going"
---

# Reasoning Research Capstone

## Mental

Strand 8 (Reasoning) terminates here. The capstone connects everything
across all five levels:

- **Foundation**: classical logic, set theory, naive induction.
- **Intermediate**: predicate logic, methods of proof, basic
  formalisation.
- **Advanced**: model theory, descriptive set theory, computability
  / Gödel.
- **Master**: Martin-Löf type theory, HoTT, ordinal analysis, cut
  elimination, model theory, cubical / univalent, game semantics,
  realizability.
- **Research-adjacent**: $\infty$-topos theory, cohesive types,
  modal type theory, proof complexity, AI-safety formal foundations,
  categorical QM, $\infty$-cosmoi, univalent foundations, emerging
  foundations.

## Threads tying it all

### 1. Constructive content
From Brouwer's intuitionism → Martin-Löf's identity types →
cubical computational univalence. *Equality is computation* now
realisable.

### 2. Categorical / higher-categorical perspective
Topos → $\infty$-topos → $\infty$-cosmos → cohesive HoTT →
categorical QM. Diagrams replace traditional symbol manipulation.

### 3. Mechanisation
Lean mathlib, Coq mathcomp, Agda libraries scale formal proof to
millions of lines. AI-augmented mathematics emerging (AlphaProof
2024, Lean copilots).

### 4. Modal / staged / informational logic
Box / Diamond modalities, cohesion, security, time, location all as
type-theoretic structures. Connects logic, geometry, security.

### 5. AI safety as formal-foundations problem
Embedded agency, logical induction, decision theory turn alignment
into a question about formal reasoning systems.

## Where to go next

**Strand 7 (Computation)**: TCS frontier — codes, PCPs, quantum.
**Strand 5 (Algebra)**: derived algebraic geometry, motivic
homotopy.
**Strand 6 (Uncertainty)**: information geometry, large-deviation
theory.
**Strand 1 (Number)**: arithmetic geometry, perfectoid spaces.

These all use the foundational tools introduced here.

## Interactive

:::widget type=numeric-input prompt="Strand 8 Research-adjacent capstone: 50 cumulative lessons across all 5 levels. Compute $5 \\times 10$." answer=50 explain="Yes — Foundation, Intermediate, Advanced, Master, Research-adjacent.":::

:::widget type=numeric-input prompt="Categorical / $\\infty$-categorical thread present at every level. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="HoTT bridges constructive logic and homotopy theory. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="AI safety formal foundations now part of mathematics-foundations research. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Reasoning Strand summary table**:

| Level | Topics | Key insight |
|---|---|---|
| Foundation | Logic, sets, induction | classical reasoning rules |
| Intermediate | Quantifiers, methods | how to prove rigorously |
| Advanced | Model + computability | what's expressible, what's decidable |
| Master | Type theory, HoTT, cubical | constructive + computational foundations |
| Research | $\infty$-topos, modal, AI | foundations meet geometry, AI safety |

**Live frontiers (mid-2020s)**:

- AI-augmented theorem proving at scale.
- Univalent / cubical mathematics in active development.
- Cohesive HoTT for synthetic differential geometry.
- AI-safety formal frameworks with practical RLHF impact.
- Proof complexity ↔ $\mathrm{P}$ vs $\mathrm{NP}$ attempts.

## Computational

```python
# Strand 8 capstone: 50 lessons summary
import json

strand_8_summary = {
    "strand": 8,
    "name": "Reasoning",
    "levels": {
        "Foundation": ["logic basics", "sets", "naive proof", "induction"],
        "Intermediate": ["predicate logic", "set theory deeper",
                         "methods of proof", "formal systems intro"],
        "Advanced":   ["formal logic + Gödel", "computability", "model theory",
                       "descriptive set theory"],
        "Master":     ["Martin-Löf TT", "HoTT", "ordinal analysis",
                       "cut elimination", "descriptive complexity",
                       "model theory deeper", "cubical/univalent",
                       "game semantics", "realizability"],
        "Research":   ["∞-topos", "cohesive types", "modal TT",
                       "proof complexity", "AI safety formal",
                       "categorical QM", "∞-cosmoi", "univalent status",
                       "emerging foundations"],
    },
    "total_lessons": 50,
    "connections": [
        "Strand 1 — number / arithmetic",
        "Strand 2 — algebra",
        "Strand 3 — geometry",
        "Strand 4 — calculus",
        "Strand 5 — algebra deeper",
        "Strand 6 — uncertainty / probability",
        "Strand 7 — computation",
    ],
    "frontiers_2025": [
        "Lean mathlib over 1M lines",
        "AlphaProof IMO silver 2024",
        "Cubical Agda computational univalence",
        "AI safety formal foundations",
        "Cohesive HoTT for physics",
    ],
}

print(json.dumps(strand_8_summary, indent=2))
```

## Applied

- **Continuing study**: Lurie HTT, HoTT Book, MIRI agent-foundations.
- **Mechanised mathematics**: Lean / Coq / Agda contributions.
- **AI safety research**: agent foundations, reward modelling,
  scalable oversight.
- **Mathematical physics**: cohesive HoTT, categorical QM.
- **Foundational pluralism**: pick the right foundation for the
  problem.

## Closing

Reasoning is the **language** every other strand speaks. A learner
who has internalised even a chunk of Strand 8 has the tools to read
modern foundational mathematics and AI-safety theory. The frontier
is open and growing — formalisation, AI-augmentation, and
foundational pluralism are reshaping mathematics in real time.

## Check Your Understanding

:::widget type=numeric-input prompt="Strand 8 covers logic to $\\infty$-topos to AI safety. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="HoTT a central thread across Master + Research levels. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Mechanised mathematics scales to $> 10^6$ lines. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="AI safety formal foundations now an active research area. Type 1." answer=1 explain="Yes.":::
