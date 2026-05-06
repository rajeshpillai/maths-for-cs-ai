---
strand: reasoning
level: research
order: 3
title: Proof Complexity Frontier
prerequisites:
  - tier: strand-8-reasoning-research
    slug: 02-modal-type-theory
    description: Modal type theory
connections:
  - strand-8-reasoning-research/04-ai-safety-formal
applications:
  - cs: "SAT solving, $\\mathrm{NP}$ vs $\\mathrm{coNP}$, automated theorem proving"
  - life: "How short can a proof of a tautology be?"
---

# Proof Complexity Frontier

## Explain Like I Am 7

Some always-true sentences are obvious — easy to prove in two lines.
Others *might* be always-true but the *shortest* proof anyone has
found takes thousands of pages.  **Proof complexity** asks: in a
given proof system, how short can the shortest proof get?  If every
true sentence had a tiny proof, lots of hard puzzles would suddenly
get easier.  Showing that some true sentences *demand* huge proofs is
how mathematicians sneak up on the famous "are check-able puzzles
also solve-able quickly?" mystery.

## Mental

**Proof complexity**: how *short* can proofs of tautologies be in
various proof systems?

If every tautology has polynomial-size proof in some system, then
$\mathrm{NP} = \mathrm{coNP}$. So proof complexity lower bounds are
attacks on $\mathrm{NP}$ vs $\mathrm{coNP}$.

**Cook-Reckhow program**: separate proof systems by lower bounds.

## Hierarchy of proof systems

| System | Strength | Lower bound state |
|---|---|---|
| Resolution | weak | exponential (Haken 1985 for pigeonhole) |
| Cutting Planes | weak/medium | exponential (Pudlak 1997) |
| Polynomial Calculus | medium | exponential (Razborov 1998) |
| Bounded-depth Frege | medium | exponential (Ajtai 1988) |
| Frege | strong | no superpolynomial lower bound known |
| Extended Frege | very strong | no superpoly lower bound known |

## Pigeonhole principle as benchmark

**$\mathrm{PHP}_n^m$**: $m$ pigeons into $n$ holes ($m > n$) cannot
all be injectively placed. False under any assignment.

**Haken 1985**: any resolution refutation requires
$2^{\Omega(n)}$ steps. Foundational lower-bound technique.

## Recent results

**SAT-solver behaviour**: practical CDCL solvers correspond to
resolution. PHP-style instances remain hard for them.

**Algebraic proof systems**: Polynomial Calculus, Sum-of-Squares.

**SOS hierarchy** (Lasserre): degree-$d$ SOS proof — semidefinite
program. Lower bounds via pseudoexpectations
(Schoenebeck, Tulsiani, et al.).

**Lifting theorems**: lower bounds in stronger systems via
communication complexity (Garg-Goos-Kamath-Sokolov 2018).

## Interactive

:::widget type=numeric-input prompt="$\\mathrm{NP} = \\mathrm{coNP}$ iff some proof system has poly-size proofs of all tautologies. Type 1." answer=1 explain="Yes — Cook-Reckhow.":::

:::widget type=numeric-input prompt="Haken 1985: PHP requires $2^{\\Omega(n)}$ resolution. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Frege system: no superpolynomial lower bound known. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="SOS hierarchy: semidefinite-programming proof system. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Cook-Reckhow definition**: a propositional proof system is a
poly-time function $f$ such that $f(\pi)$ is a tautology iff $\pi$ is
a valid proof. **Polynomially bounded** if every tautology has a
poly-size proof.

**Theorem (Cook-Reckhow)**: a polynomially bounded proof system
exists $\iff \mathrm{NP} = \mathrm{coNP}$.

**Feasible interpolation**: a way to extract poly-time circuits from
short proofs. Works for resolution and cutting planes; fails for
strong systems unless cryptography breaks.

**Bounded arithmetic**: theories of arithmetic correspond to proof
systems; proof complexity ↔ provability in $S^i_2, T^i_2$.

## Computational

```python
import itertools

# Resolution refutation of PHP_2 manually (3 pigeons, 2 holes)
# Variables: x_{ij} = "pigeon i in hole j", i in {1,2,3}, j in {1,2}

# Clauses for PHP encoding:
# 1) Each pigeon in some hole: x_{i1} OR x_{i2} for each i
# 2) No two pigeons in same hole: ~x_{ij} OR ~x_{kj} for i != k

def php_clauses(m, n):
    """Generate CNF clauses encoding PHP_n^m."""
    clauses = []
    # (1) Each pigeon i in some hole
    for i in range(1, m+1):
        clauses.append([(f"x_{i}{j}", True) for j in range(1, n+1)])
    # (2) No two pigeons in same hole
    for j in range(1, n+1):
        for i, k in itertools.combinations(range(1, m+1), 2):
            clauses.append([(f"x_{i}{j}", False), (f"x_{k}{j}", False)])
    return clauses

clauses = php_clauses(3, 2)
print(f"PHP_2^3 clauses: {len(clauses)}")
for c in clauses:
    pretty = " ∨ ".join(("¬" if not s else "") + v for v, s in c)
    print(f"  {pretty}")

# Resolution: derive empty clause via repeated resolution
# Hand check: for PHP_n^{n+1} resolution requires 2^{Ω(n)} steps
print()
print("Haken's lower bound: any resolution proof of PHP_n^{n+1} has")
print("exp(n) steps. SAT solvers using CDCL inherit this bound.")
```

## Applied

- **SAT-solver design** — CDCL ≈ resolution; theoretical bounds
  predict practical hardness.
- **NP vs coNP attacks** — proof complexity is the main concrete
  approach.
- **Cryptographic implications** — feasible interpolation links
  proof complexity to one-way functions.
- **Optimisation** — SOS hierarchy bounds for combinatorial
  optimisation.
- **Theorem proving** — choice of proof system affects automated
  tools.

## Check Your Understanding

:::widget type=numeric-input prompt="Haken 1985: PHP exponential resolution lower bound. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cook-Reckhow: poly-bounded system iff NP = coNP. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="SOS hierarchy: SDP-based proof system. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="CDCL SAT solvers correspond to resolution. Type 1." answer=1 explain="Yes.":::
