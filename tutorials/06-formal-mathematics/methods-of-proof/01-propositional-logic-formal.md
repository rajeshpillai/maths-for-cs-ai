# Propositional Logic — Formal Treatment

## Intuition

In Tier 1 we met truth tables and basic connectives. Now we go deeper:
we treat propositional logic as a formal system with syntax rules, semantic
evaluation, and canonical forms (DNF/CNF) that directly correspond to
circuit design and SAT solvers used in compiler optimisation.

## Prerequisites

- Tier 1, Lesson 1 (Logic — Propositions, Truth Tables, Boolean Algebra)

## From First Principles

### Well-Formed Formulas (WFFs)

A **propositional variable** is an atomic WFF: $p$, $q$, $r$, ...

If $\phi$ and $\psi$ are WFFs, so are:
- $\neg \phi$ (negation)
- $(\phi \land \psi)$ (conjunction)
- $(\phi \lor \psi)$ (disjunction)
- $(\phi \rightarrow \psi)$ (implication)
- $(\phi \leftrightarrow \psi)$ (biconditional)

Nothing else is a WFF.

### Tautology, Contradiction, Contingency

| Type | Definition | Example |
|------|-----------|---------|
| Tautology | True under **every** assignment | $p \lor \neg p$ |
| Contradiction | False under **every** assignment | $p \land \neg p$ |
| Contingency | True under some, false under others | $p \rightarrow q$ |

### Logical Equivalence

$\phi \equiv \psi$ means $\phi$ and $\psi$ have identical truth tables.

Key equivalences (verify by hand on 2 variables):

$$\neg(\neg p) \equiv p \quad \text{(Double negation)}$$
$$p \rightarrow q \equiv \neg p \lor q \quad \text{(Material implication)}$$
$$\neg(p \land q) \equiv \neg p \lor \neg q \quad \text{(De Morgan)}$$
$$\neg(p \lor q) \equiv \neg p \land \neg q \quad \text{(De Morgan)}$$
$$p \lor (q \land r) \equiv (p \lor q) \land (p \lor r) \quad \text{(Distribution)}$$

### Pen & Paper: Verify De Morgan's Law

| $p$ | $q$ | $p \land q$ | $\neg(p \land q)$ | $\neg p$ | $\neg q$ | $\neg p \lor \neg q$ |
|-----|-----|-------------|-------------------|----------|----------|---------------------|
| T | T | T | F | F | F | F |
| T | F | F | T | F | T | T |
| F | T | F | T | T | F | T |
| F | F | F | T | T | T | T |

Columns 4 and 7 match. QED.

### Disjunctive Normal Form (DNF)

A formula is in **DNF** if it is a disjunction of conjunctions of literals:
$$(p \land q) \lor (\neg p \land r) \lor (p \land \neg q \land r)$$

**Algorithm** (from truth table):
1. List all rows where the formula evaluates to True.
2. For each such row, write a conjunction (minterm): variable if T, negation if F.
3. OR all minterms together.

### Conjunctive Normal Form (CNF)

A formula is in **CNF** if it is a conjunction of disjunctions of literals:
$$(p \lor \neg q) \land (\neg p \lor r) \land (q \lor r)$$

**Algorithm** (from truth table):
1. List all rows where the formula evaluates to False.
2. For each such row, write a disjunction (maxterm): negation of variable if T, variable if F.
3. AND all maxterms together.

### Pen & Paper: Convert to DNF

Given $f(p,q) = p \rightarrow q$:

| $p$ | $q$ | $p \rightarrow q$ |
|-----|-----|-------------------|
| T | T | T |
| T | F | F |
| F | T | T |
| F | F | T |

True rows: (T,T), (F,T), (F,F).

Minterms: $(p \land q)$, $(\neg p \land q)$, $(\neg p \land \neg q)$

DNF: $(p \land q) \lor (\neg p \land q) \lor (\neg p \land \neg q)$

Simplify: $q \lor \neg p \equiv \neg p \lor q$ (matches material implication!).

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

# Venn diagram showing DNF regions for p → q
fig, ax = plt.subplots(1, 1, figsize=(5, 5))
# Two overlapping circles for p and q
circle_p = plt.Circle((0.35, 0.5), 0.3, fill=False, label='p')
circle_q = plt.Circle((0.65, 0.5), 0.3, fill=False, label='q')
ax.add_patch(circle_p)
ax.add_patch(circle_q)
ax.set_xlim(0, 1)
ax.set_ylim(0, 1)
ax.set_aspect('equal')
ax.text(0.2, 0.5, '~p^~q', ha='center', fontsize=9)
ax.text(0.5, 0.5, 'p^q', ha='center', fontsize=9)
ax.text(0.8, 0.5, '~p^q', ha='center', fontsize=9)
ax.set_title('Regions where p → q is True (shaded)')
plt.tight_layout()
plt.savefig('dnf_regions.png', dpi=100)
plt.show()
```

## Python Verification

```python
from itertools import product

# ── Propositional Logic: Formal Treatment ────────────────
# Step 1: Define connectives
def implies(p, q):
    return (not p) or q

def iff(p, q):
    return p == q

# Step 2: Check if a formula is a tautology
def is_tautology(formula, n_vars):
    """Check all 2^n assignments."""
    for assignment in product([True, False], repeat=n_vars):
        if not formula(*assignment):
            return False
    return True

# Step 3: Verify De Morgan's Law: ~(p & q) == (~p | ~q)
def de_morgan_lhs(p, q):
    return not (p and q)

def de_morgan_rhs(p, q):
    return (not p) or (not q)

def equivalence_check(p, q):
    return iff(de_morgan_lhs(p, q), de_morgan_rhs(p, q))

print("De Morgan tautology:", is_tautology(equivalence_check, 2))

# Step 4: Convert truth table to DNF
def truth_table_to_dnf(formula, var_names):
    """Return DNF as list of minterms."""
    n = len(var_names)
    minterms = []
    for assignment in product([True, False], repeat=n):
        if formula(*assignment):
            term = []
            for name, val in zip(var_names, assignment):
                term.append(name if val else f"~{name}")
            minterms.append(" & ".join(term))
    dnf = " | ".join(f"({m})" for m in minterms)
    return dnf

# DNF of p → q
dnf = truth_table_to_dnf(implies, ['p', 'q'])
print(f"DNF of p → q: {dnf}")

# Step 5: Convert truth table to CNF
def truth_table_to_cnf(formula, var_names):
    """Return CNF as list of maxterms."""
    n = len(var_names)
    maxterms = []
    for assignment in product([True, False], repeat=n):
        if not formula(*assignment):
            clause = []
            for name, val in zip(var_names, assignment):
                clause.append(f"~{name}" if val else name)
            maxterms.append(" | ".join(clause))
    cnf = " & ".join(f"({m})" for m in maxterms)
    return cnf

cnf = truth_table_to_cnf(implies, ['p', 'q'])
print(f"CNF of p → q: {cnf}")

# Step 6: Verify the excluded middle is a tautology
excluded_middle = lambda p: p or (not p)
print("Excluded middle tautology:", is_tautology(excluded_middle, 1))
```

## Connection to CS / Games / AI / Business / Industry

- **SAT solvers** require CNF input; they power formal verification of hardware and software.
- **Logic synthesis** in chip design converts Boolean functions to minimal CNF/DNF (Karnaugh maps, Quine-McCluskey).
- **Knowledge representation** in AI uses propositional logic as the simplest formal reasoning system.
- **Constraint propagation** in game AI (Sudoku solvers, pathfinding constraints) reduces to Boolean satisfiability.
- **Coq/Lean for chip verification at Intel and Arm** — propositional and first-order logic proofs ensure floating-point units behave correctly after the 1994 Pentium FDIV bug cost Intel $475M in recalls.
- **Z3 SMT solver at Microsoft and AWS** — reduces software verification to CNF-SAT; AWS uses it to prove S3 access policies are leak-free, protecting trillions of stored objects from misconfiguration.
- **Karnaugh maps and Quine-McCluskey in ASIC synthesis** — Cadence Genus and Synopsys Design Compiler minimize Boolean DNF/CNF representations to reduce gate count, directly cutting power and silicon area for every modern CPU and GPU.
- **CNF-based fraud-rule engines at Visa and PayPal** — risk policies are compiled to CNF and evaluated in microseconds per transaction, blocking billions of dollars of fraud annually while keeping false-positive rates below 0.1%.

## Check Your Understanding

1. Build the full truth table for $(p \lor q) \rightarrow (p \land q)$. Is it a tautology, contradiction, or contingency?
2. Convert the XOR function $p \oplus q$ to both DNF and CNF by hand.
3. Prove algebraically (using equivalences, not truth tables) that $p \rightarrow (q \rightarrow p)$ is a tautology.
