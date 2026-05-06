---
strand: computation
level: research
order: 0
title: P vs NP and Complexity Frontier
prerequisites:
  - tier: strand-7-computation-master
    slug: 09-computation-master-capstone
    description: Computation master capstone
connections:
  - strand-7-computation-research/01-fault-tolerant-quantum
applications:
  - cs: "Foundational impossibility results in TCS"
  - life: "The biggest open problem in computer science"
---

# P vs NP and Complexity Frontier

## Explain Like I Am 7

There are two toy bins.  In one go puzzles where finding the answer is
quick.  In the other go puzzles where *checking* a friend's answer is
quick but finding the answer yourself feels brutal.  The world's
biggest unsolved riddle is whether those two bins are secretly the
same — that is, whether every puzzle whose answer is easy to *check*
also has a quick way to *find*.  Most mathematicians bet *no*, but
nobody has nailed down a proof.  Crack this open and you'd rewrite
codes, cures, and crime puzzles overnight.

## Mental

**P vs NP**: does $P = NP$? Open since formalised by Cook 1971,
Levin 1973. Most CS theorists believe $P \ne NP$.

If $P = NP$: efficient algorithms for all NP problems (SAT, TSP, ...);
crypto largely broken.

If $P \ne NP$: many problems require exponential time.

## Why is it hard?

Standard barriers to settling P vs NP:

- **Relativisation barrier** (Baker-Gill-Solovay 1975): no
  relativising proof can resolve P vs NP — rules out simulation /
  diagonalisation.
- **Natural proofs barrier** (Razborov-Rudich 1997): "nice"
  combinatorial proofs of circuit lower bounds would break
  pseudorandom generators (assumed strong PRGs exist) — so any
  natural proof of P ≠ NP would be a *real-world* break.
- **Algebrization barrier** (Aaronson-Wigderson 2008): a generalisation
  of relativisation; further restricts proof techniques.

These barriers narrow the space of viable techniques.

## Other major open problems

- **NEXP vs P/poly**.
- **Permanent vs determinant** (Valiant): $\#P$-hardness vs P.
- **Unique Games Conjecture** (Khot 2002): if true, sharp
  inapproximability for many problems.
- **Polynomial Identity Testing**: in $\mathrm{coRP}$; derandomising
  to P would imply circuit lower bounds.
- **Complexity of factoring** in P? Open; Shor's algorithm in BQP.

## $\mathbf{NEXP} \subsetneq \mathbf{P/poly}$ — would be major

**Williams 2010**: proved $\mathbf{NEXP} \not\subseteq \mathbf{ACC}^0$,
the first major circuit-lower-bound progress in decades. Won Gödel
Prize.

## Interactive

:::widget type=numeric-input prompt="P vs NP open since Cook 1971 / Levin 1973. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Relativisation barrier (BGS 1975). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Natural proofs barrier (Razborov-Rudich 1997). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Williams 2010: NEXP ⊄ ACC^0. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Geometric complexity theory** (Mulmuley-Sohoni): approach to
permanent vs determinant via algebraic geometry / representation
theory. Long-term program.

**Proof complexity**: complexity of proving theorems in propositional
logic; lower bounds on resolution / Frege systems.

**Fine-grained complexity**: SETH (Strong Exponential Time
Hypothesis) — 3-SAT cannot be solved in $2^{(1 - \epsilon) n}$ time.
Implies tight lower bounds on edit-distance, longest-common-
subsequence, etc.

**Quantum complexity**: BQP, QMA, QCMA structure; relations to
classical complexity unresolved.

## Computational

```python
import math

# Demonstrate fine-grained complexity intuition
# SETH: 3-SAT in O(2^((1-ε)n)) breaks SETH

# Edit distance: no truly subquadratic algorithm (under SETH)
# Backurs-Indyk 2015: edit distance lower bound from SETH

def naive_edit(s, t):
    """Standard O(n²) DP."""
    m, n = len(s), len(t)
    D = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1): D[i][0] = i
    for j in range(n + 1): D[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s[i-1] == t[j-1]:
                D[i][j] = D[i-1][j-1]
            else:
                D[i][j] = 1 + min(D[i-1][j], D[i][j-1], D[i-1][j-1])
    return D[m][n]

print(f"edit('kitten', 'sitting') = {naive_edit('kitten', 'sitting')}")
# Under SETH: no O(n^(2 - ε)) algorithm exists

# P vs NP: brute-force SAT
def brute_sat(formula, n_vars):
    """Try all 2^n assignments."""
    for assignment in range(2 ** n_vars):
        bits = [(assignment >> i) & 1 for i in range(n_vars)]
        if all(any(bits[abs(lit) - 1] if lit > 0 else not bits[abs(lit) - 1]
                   for lit in clause) for clause in formula):
            return bits
    return None

formula = [[1, -2, 3], [-1, 2, -3]]
print(f"SAT solution: {brute_sat(formula, 3)}")
# Polynomial-time SAT would imply P = NP
```

## Applied

- **Crypto** — security of RSA / ECDSA / lattice schemes assumes
  hard problems aren't in P.
- **Algorithms** — knowing limits prevents wasted effort on
  impossible-in-polynomial-time problems.
- **AI / ML lower bounds** — many learning problems NP-hard exactly.
- **Quantum vs classical** — BQP vs P; quantum supremacy questions.
- **AGI safety** — capability bounds on what computers can decide.

## Check Your Understanding

:::widget type=numeric-input prompt="P vs NP open since Cook 1971. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Relativisation barrier rules out simulation proofs. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="SETH: 3-SAT cannot be in $O(2^{(1-\\epsilon) n})$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="GCT (Mulmuley-Sohoni) program for permanent vs determinant. Type 1." answer=1 explain="Yes.":::
