# Advanced Boolean Algebra

## Intuition

Boolean algebra is the mathematics of true/false, 1/0, on/off. In basic logic
you learned AND, OR, NOT. Now we go deeper: every Boolean function can be
written in standard forms (DNF, CNF), simplified using Karnaugh maps, and
ultimately built from a single gate type (NAND). This is how real circuits
and SAT solvers work.

## Prerequisites

- **Tier 1, Lesson 1** — Propositional logic, truth tables, Boolean algebra basics

## From First Principles

### Normal Forms

Any Boolean function can be expressed in two canonical ways:

**Disjunctive Normal Form (DNF):** OR of ANDs (sum of products).

$$f = (A \land B) \lor (\lnot A \land C) \lor (B \land C)$$

**Conjunctive Normal Form (CNF):** AND of ORs (product of sums).

$$f = (A \lor B) \land (\lnot A \lor C) \land (B \lor C)$$

**How to derive DNF from a truth table:** For each row where $f = 1$, write
a minterm (AND of all variables, negated if 0 in that row). OR all minterms.

**Example (pen & paper):** $f(A, B) = A \oplus B$ (XOR).

| A | B | f |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

DNF: $(\lnot A \land B) \lor (A \land \lnot B)$

CNF: from rows where $f = 0$, take maxterms (OR of variables, negated if 1).
Row 00: $(A \lor B)$. Row 11: $(\lnot A \lor \lnot B)$.
CNF: $(A \lor B) \land (\lnot A \lor \lnot B)$

### Karnaugh Maps (K-maps)

A visual method to simplify Boolean expressions by grouping adjacent 1-cells.

**Rules for K-map simplification:**

1. Draw a grid with Gray-code ordering (only one bit changes between neighbours).
2. Circle groups of 1s in powers of 2 (1, 2, 4, 8...).
3. Groups can wrap around edges.
4. Each group eliminates the variable that changes within it.

**Example:** Simplify $f(A,B,C) = \sum m(1,3,5,7)$.

K-map (AB vs C):

```
        C=0  C=1
AB=00:   0    1
AB=01:   0    1
AB=11:   0    1
AB=10:   0    1
```

All four 1s are in the $C=1$ column. One group of 4 covers them all.
Result: $f = C$. The variables $A$ and $B$ are eliminated.

### Functional Completeness and NAND Universality

A set of connectives is **functionally complete** if every Boolean function
can be expressed using only those connectives.

$\{AND, OR, NOT\}$ is complete. But we can do better:

**NAND alone is universal:**

- $\text{NOT}(A) = A \uparrow A$ (NAND with itself)
- $\text{AND}(A,B) = (A \uparrow B) \uparrow (A \uparrow B)$
- $\text{OR}(A,B) = (A \uparrow A) \uparrow (B \uparrow B)$

Since AND, OR, NOT can all be built from NAND, NAND is functionally complete.

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

# Visualise a 4-variable K-map for f(A,B,C,D) = sum m(0,1,2,5,8,9,10)
fig, ax = plt.subplots(figsize=(7, 5))
ax.set_title("Karnaugh Map: f(A,B,C,D) = Sigma m(0,1,2,5,8,9,10)", fontsize=12)

# Gray code order: 00, 01, 11, 10
gray = ['00', '01', '11', '10']
minterms = {0,1,2,5,8,9,10}

# Build the grid (rows=AB, cols=CD)
for i, ab in enumerate(gray):
    for j, cd in enumerate(gray):
        minterm = int(ab + cd, 2)
        val = 1 if minterm in minterms else 0
        color = 'lightgreen' if val == 1 else 'white'
        rect = plt.Rectangle((j, 3-i), 1, 1, facecolor=color, edgecolor='black', lw=1.5)
        ax.add_patch(rect)
        ax.text(j+0.5, 3-i+0.5, str(val), ha='center', va='center', fontsize=14, fontweight='bold')
        ax.text(j+0.5, 3-i+0.15, f"m{minterm}", ha='center', va='center', fontsize=8, color='gray')

# Labels
for j, cd in enumerate(gray):
    ax.text(j+0.5, 4.2, f"CD={cd}", ha='center', fontsize=10)
for i, ab in enumerate(gray):
    ax.text(-0.3, 3-i+0.5, f"AB={ab}", ha='center', va='center', fontsize=10)

ax.set_xlim(-0.5, 4.5); ax.set_ylim(-0.5, 4.7)
ax.set_aspect('equal'); ax.axis('off')
plt.tight_layout()
plt.savefig("kmap_visualisation.png", dpi=100)
plt.show()
```

## Python Verification

```python
from itertools import product

# ── Truth table and normal forms ─────────────────────────
def xor_func(a, b):
    return a ^ b

# Step 1: Generate truth table
print("A B | XOR | DNF check | CNF check")
print("-" * 38)
for a, b in product([0, 1], repeat=2):
    f = xor_func(a, b)
    dnf = ((not a) and b) or (a and (not b))  # (¬A∧B) ∨ (A∧¬B)
    cnf = (a or b) and ((not a) or (not b))    # (A∨B) ∧ (¬A∨¬B)
    print(f"{a} {b} |  {f}  |     {int(dnf)}     |     {int(cnf)}")

# Step 2: NAND universality
def nand(a, b):
    return int(not (a and b))

def not_from_nand(a):
    return nand(a, a)

def and_from_nand(a, b):
    return nand(nand(a, b), nand(a, b))

def or_from_nand(a, b):
    return nand(nand(a, a), nand(b, b))

print("\nNAND universality verification:")
print("A B | NOT_A | AND | OR | NAND_NOT | NAND_AND | NAND_OR")
for a, b in product([0, 1], repeat=2):
    print(f"{a} {b} |   {int(not a)}   |  {a&b}  |  {a|b} |"
          f"    {not_from_nand(a)}     |    {and_from_nand(a,b)}     |    {or_from_nand(a,b)}")

# Step 3: K-map simplification check
# f(A,B,C) = sum m(1,3,5,7) should simplify to C
print("\nK-map verification: f(A,B,C) = sum m(1,3,5,7)")
for a, b, c in product([0, 1], repeat=3):
    minterm = a * 4 + b * 2 + c
    f_full = int(minterm in {1, 3, 5, 7})
    f_simplified = c  # K-map result
    match = "OK" if f_full == f_simplified else "FAIL"
    print(f"  A={a} B={b} C={c}: f={f_full}, simplified={f_simplified} [{match}]")
```

## Connection to CS / Games / AI / Business / Industry

- **SAT solvers:** CNF is the input format for SAT solvers, which are used in
  verification, AI planning, and constraint satisfaction.
- **Circuit design:** K-maps minimize gate count — fewer gates means faster,
  cheaper, cooler-running hardware.
- **FPGA programming:** All logic is implemented with look-up tables that
  encode Boolean functions. NAND universality means any circuit can be built.
- **Neural network pruning:** Boolean simplification techniques inspire methods
  for reducing redundant neurons in binary neural networks.
- **Industry — Intel & TSMC chip synthesis:** Synopsys Design Compiler and
  Cadence Genus minimize standard-cell netlists by running Espresso /
  Quine-McCluskey (the algorithmic K-map) on every gate cluster; this
  shaves transistor count for chips like Apple M-series and AMD Ryzen.
- **Engineering — Boeing 787 fly-by-wire fault-tree analysis:** Safety
  engineers translate failure conditions into Boolean expressions then
  use BDDs (binary decision diagrams) to compute mean-time-between-failure
  for FAA certification (DO-178C / ARP 4761).
- **Operations — Microsoft Z3 SMT solver in production:** Visual Studio
  IntelliCode, Azure compliance audits, and Amazon's "Zelkova" S3 bucket
  policy checker all encode rules as CNF and call Z3 to detect public-data
  exposure before deployment.
- **Finance — Algorithmic trading rule compilation:** Citadel and Two
  Sigma compile complex eligibility predicates ("is this options chain
  liquid AND not on the SEC short-restricted list") into minimised
  Boolean circuits to evaluate them in single-digit nanoseconds per tick.

## Check Your Understanding

1. Write the CNF for $f(A,B,C) = A \oplus B \oplus C$ (3-input XOR).
2. Use a K-map to simplify $f(A,B,C,D) = \sum m(0,2,5,7,8,10,13,15)$.
3. Build a XOR gate using only NAND gates. Draw the circuit and verify with
   a truth table in Python.
