---
strand: computation
level: intermediate
order: 6
title: Complexity Classes — P, NP, and Beyond
prerequisites:
  - tier: strand-7-computation-intermediate
    slug: 05-tries-and-string-algos
    description: Tries and strings
connections:
  - strand-7-computation-intermediate/07-np-completeness
applications:
  - cs: "Tractability classification, crypto hardness"
  - life: "Which problems are *fundamentally* easy or hard?"
---

# Complexity Classes — P, NP, and Beyond

## Mental

A **decision problem** asks a yes/no question (e.g., "is this number
prime?"). Group decision problems by how much *time* (or other
resources) it takes to solve them as a function of input size.

**P** — problems solvable in **polynomial time** by a deterministic
machine. Roughly, "tractable."

**NP** — problems whose **yes** answer can be **verified** in
polynomial time given a certificate. Roughly, "checkable."

Famous open question: **does P = NP?** Most computer scientists
believe **no**, but no one has proved it.

## Examples

| Problem | Class |
|---|---|
| Sorting a list | P |
| Shortest path in a graph | P |
| Is $n$ prime? | P (AKS, 2002) |
| Does this graph have a Hamiltonian cycle? | NP |
| 3-SAT | NP-complete |
| Travelling Salesman (decision) | NP-complete |
| Factor $n$? | NP ∩ co-NP, suspected not in P |

## Why "verify" matters

Given a Sudoku puzzle and a candidate solution, verifying it's
correct is fast — just check every row/column/box. Finding the
solution from scratch is much harder. **NP captures problems where
verification is easy but discovery may not be.**

## Other classes

- **co-NP**: problems whose **no** answers have polynomial certificates.
- **PSPACE**: problems solvable in polynomial *space* (any time).
  Includes P, NP, and more (game-tree problems).
- **EXPTIME**: solvable in $O(2^{p(n)})$ time for some polynomial $p$.
- **L** / **NL**: problems solvable in logarithmic space.
- **BPP**: bounded-error randomized polynomial time. Probably $= P$.
- **BQP**: bounded-error quantum polynomial time. Includes
  factoring (Shor); relation to NP open.

The known inclusions:

$$
L \subseteq NL \subseteq P \subseteq NP \subseteq PSPACE \subseteq EXPTIME.
$$

The first $\subsetneq$ proven: $P \subsetneq EXPTIME$ (time
hierarchy theorem). All others open.

## Worked example: 3-SAT verification

3-SAT instance: a Boolean formula like
$(x_1 \lor \lnot x_2 \lor x_3) \land (\lnot x_1 \lor x_2 \lor x_4) \land \ldots$

Given a candidate assignment $x_1 = T, x_2 = F, x_3 = T, x_4 = F$,
verifying it satisfies the formula takes time linear in the formula
length. So 3-SAT is in NP.

Whether you can *find* a satisfying assignment in polynomial time is
the P vs NP question.

## Interactive

:::widget type=numeric-input prompt="Sorting is in P. Type 1 if true." answer=1 explain="Yes — $O(n \\log n)$.":::

:::widget type=numeric-input prompt="P $\\subseteq$ NP. Type 1." answer=1 explain="Yes — anything you can solve quickly you can verify quickly.":::

:::widget type=numeric-input prompt="P = NP — proven? Type 1 yes, 0 open." answer=0 explain="Open — Clay Millennium Problem.":::

:::widget type=numeric-input prompt="Factoring is in NP. Type 1." answer=1 explain="Yes — verify by multiplying.":::

## Symbolic

**Reductions**: $A \le_p B$ ("$A$ polynomial-time reduces to $B$")
means an algorithm for $B$ gives one for $A$ via a polynomial-time
transformation. If $A \le_p B$ and $B \in P$, then $A \in P$.

**NP-hardness**: a problem is NP-hard if every NP problem reduces
to it (in poly time). NP-complete = NP-hard ∩ NP — the "hardest"
problems in NP.

If any NP-complete problem is in P, then **all** of NP is in P
(P = NP). So NP-completeness is a strong negative result.

**Cook-Levin theorem**: 3-SAT is NP-complete. Established in 1971
by Cook (and independently Levin); this is the foundation for
proving thousands of other NP-completeness results.

## Computational

```python
# A polynomial-time algorithm: linear-time element majority
def majority(L):
    candidate, count = None, 0
    for x in L:
        if count == 0: candidate = x
        count += 1 if x == candidate else -1
    if L.count(candidate) > len(L) // 2: return candidate
    return None

print(majority([3, 3, 4, 2, 4, 4, 2, 4, 4]))   # 4 — O(n)

# An NP problem: 3-SAT instance check (polynomial-time verification)
def satisfies(formula, assignment):
    for clause in formula:
        if not any(assignment[abs(lit)-1] == (lit > 0) for lit in clause):
            return False
    return True

# Example: (x1 v ~x2 v x3) and (~x1 v x2 v ~x3)
formula = [[1, -2, 3], [-1, 2, -3]]
print(satisfies(formula, [True, False, True]))    # check
print(satisfies(formula, [True, True, True]))     # check

# Brute-force solver — exponential time
import itertools
def solve_3sat(formula, n_vars):
    for assignment in itertools.product([False, True], repeat=n_vars):
        if satisfies(formula, assignment):
            return list(assignment)
    return None

print(solve_3sat(formula, 3))
```

## Applied

- **Cryptography** — hardness assumptions: factoring, discrete log,
  shortest vector in lattice. If these turned out to be in P, all
  modern crypto would break.
- **Scheduling and routing** — TSP, vehicle routing, job-shop
  scheduling are NP-hard; industry uses heuristics
  (simulated annealing, branch-and-bound, OR solvers).
- **Verification** — model checking is PSPACE-complete in general;
  practical tools (Z3, CBMC) are heuristics on subclasses.
- **Machine learning** — many learning problems (training optimal
  decision trees, learning DNFs) are NP-hard in their exact form;
  we settle for approximations.

## Check Your Understanding

:::widget type=numeric-input prompt="P $\\subseteq$ NP. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="If P = NP, all NP-complete problems are in P. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="NP-complete: NP-hard ∩ NP. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="3-SAT is NP-complete. Type 1." answer=1 explain="Yes — Cook-Levin.":::
