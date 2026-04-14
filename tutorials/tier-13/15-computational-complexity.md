# Computational Complexity

## Intuition

Not all problems are created equal. Some can be solved quickly (sorting),
some seem to require trying all possibilities (Sudoku), and some we cannot
solve at all (halting problem). Complexity theory classifies problems by
how much time they require as input grows. The P vs NP question — "is
checking a solution always easier than finding one?" — is the most important
open problem in computer science, with a million-dollar prize.

## Prerequisites

- **Tier 13, Lesson 14** — Turing machines, halting problem

## From First Principles

### Time Complexity

The **time complexity** of a TM on input of length $n$ is the maximum number
of steps before halting, as a function of $n$.

We use **big-O notation:** $T(n) = O(f(n))$ means there exist constants $c, n_0$
such that $T(n) \le c \cdot f(n)$ for all $n \ge n_0$.

### Class P

$\mathbf{P}$ = the set of decision problems solvable by a deterministic TM
in polynomial time: $O(n^k)$ for some constant $k$.

**Examples in P:**
- Sorting: $O(n \log n)$
- Shortest path (Dijkstra): $O(E \log V)$
- Primality testing (AKS): $O(n^6)$ where $n$ = number of digits
- 2-SAT: $O(n)$
- Matrix multiplication: $O(n^3)$

### Class NP

$\mathbf{NP}$ = the set of decision problems where a "yes" answer has a
**certificate** (proof) that can be **verified** in polynomial time.

Equivalently: solvable by a **nondeterministic** TM in polynomial time
(it "guesses" the right certificate).

**Examples in NP:**
- SAT (satisfiability): given a Boolean formula, is there a satisfying assignment?
  Certificate: the assignment itself. Verification: plug in and check.
- Hamiltonian path: certificate is the path. Verification: check it visits all vertices.
- Integer factorisation: certificate is the factors. Verification: multiply.

**Key insight:** $P \subseteq NP$ (any poly-time solver is also a poly-time verifier).

### NP-Complete Problems

A problem $L$ is **NP-complete** if:
1. $L \in NP$
2. Every problem in NP can be **reduced** to $L$ in polynomial time.

NP-complete problems are the "hardest" in NP. If any one is in P, then $P = NP$.

**Cook-Levin Theorem (1971):** SAT is NP-complete (the first such result).

**Key NP-complete problems:**
- **SAT** — Boolean satisfiability
- **3-SAT** — SAT restricted to 3 literals per clause
- **Clique** — Does the graph have a complete subgraph of size $k$?
- **Vertex Cover** — Can you cover all edges with $\le k$ vertices?
- **Hamiltonian Path** — Visit every vertex exactly once
- **Subset Sum** — Does a subset sum to a target value?
- **Travelling Salesman (decision)** — Is there a tour of length $\le k$?

### Polynomial Reduction

To show problem $B$ is NP-hard, find a known NP-complete problem $A$ and
a polynomial-time function $f$ such that $x \in A \iff f(x) \in B$.

**Example:** Reduce 3-SAT to Clique.

Given a 3-SAT formula with $k$ clauses, build a graph where:
- Each literal in each clause is a vertex.
- Connect two vertices if they are in different clauses and are not contradictory.
- The formula is satisfiable iff the graph has a $k$-clique.

### P vs NP

**The question:** Does $P = NP$?

Most researchers believe $P \ne NP$, but no proof exists. If $P = NP$:
- Cryptography (RSA, etc.) would be breakable.
- Optimisation problems would become easy.
- Mathematical proofs could be found automatically.

### Visualisation

```python
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

fig, ax = plt.subplots(figsize=(8, 8))
ax.set_title("Complexity Class Hierarchy (assuming P != NP)", fontsize=14)

# Draw nested ellipses
ellipses = [
    ('ALL', 5, 5, 9, 7, 'whitesmoke', 'All Problems'),
    ('Undecidable', 5, 6, 8, 3.5, 'mistyrose', 'Undecidable\n(Halting Problem)'),
    ('NP', 5, 2.5, 7, 4, 'lightyellow', ''),
    ('NP-Complete', 5, 3.5, 3.5, 1.5, 'lightsalmon', 'NP-Complete\n(SAT, TSP, Clique)'),
    ('P', 2.5, 1.5, 3, 2, 'lightgreen', 'P\n(Sorting, Shortest Path,\nPrimality)'),
]

for name, cx, cy, w, h, color, label in ellipses:
    e = mpatches.Ellipse((cx, cy), w, h, facecolor=color, edgecolor='black', lw=2, alpha=0.6)
    ax.add_patch(e)
    if label:
        ax.text(cx, cy, label, ha='center', va='center', fontsize=10, fontweight='bold')

ax.text(5, 4.8, 'NP', fontsize=12, ha='center', fontweight='bold', color='darkgoldenrod')
ax.text(5, -0.5, 'NP-Hard extends right (includes undecidable problems)',
        ha='center', fontsize=9, fontstyle='italic')

ax.set_xlim(-0.5, 10); ax.set_ylim(-1, 9.5)
ax.set_aspect('equal')
ax.axis('off')

plt.tight_layout()
plt.savefig("complexity_classes.png", dpi=100)
plt.show()
```

## Python Verification

```python
import time
from itertools import combinations, product

# ── Demonstrate P vs NP: solving vs verifying ────────────

# Step 1: Subset Sum (NP-complete)
def subset_sum_brute(nums, target):
    """Brute force: try all 2^n subsets. O(2^n) = exponential."""
    n = len(nums)
    for r in range(n + 1):
        for combo in combinations(range(n), r):
            if sum(nums[i] for i in combo) == target:
                return list(combo)
    return None

def subset_sum_verify(nums, indices, target):
    """Verify a certificate in O(n). This is why it's in NP."""
    return sum(nums[i] for i in indices) == target

nums = [3, 7, 1, 8, 5, 12, 4, 6]
target = 20

print("Subset Sum (NP-complete):")
print(f"  Numbers: {nums}, Target: {target}")

# Find solution (exponential time)
start = time.perf_counter()
solution = subset_sum_brute(nums, target)
solve_time = time.perf_counter() - start
print(f"  Solution found: indices {solution} -> {[nums[i] for i in solution]}")
print(f"  Solve time: {solve_time:.6f}s")

# Verify solution (polynomial time)
start = time.perf_counter()
valid = subset_sum_verify(nums, solution, target)
verify_time = time.perf_counter() - start
print(f"  Verification: {valid}")
print(f"  Verify time: {verify_time:.6f}s")

# Step 2: SAT (NP-complete) — brute force vs verification
def sat_brute(num_vars, clauses):
    """Try all 2^n assignments."""
    for assignment in product([False, True], repeat=num_vars):
        if all(any(assignment[abs(lit)-1] == (lit > 0) for lit in clause)
               for clause in clauses):
            return assignment
    return None

def sat_verify(assignment, clauses):
    """Verify in O(clauses * literals)."""
    return all(any(assignment[abs(lit)-1] == (lit > 0) for lit in clause)
               for clause in clauses)

# 3-SAT instance: (x1 OR x2 OR x3) AND (NOT x1 OR x2 OR NOT x3) AND (x1 OR NOT x2 OR x3)
clauses = [[1, 2, 3], [-1, 2, -3], [1, -2, 3]]
print(f"\n3-SAT: {clauses}")
solution = sat_brute(3, clauses)
print(f"  Solution: {solution}")
print(f"  Verified: {sat_verify(solution, clauses)}")

# Step 3: Scaling comparison — P vs exponential
print("\nScaling: Sorting (P) vs Subset Sum (exponential)")
import random
for n in [10, 15, 20]:
    data = random.sample(range(1, 100), n)
    target = sum(data) // 2

    start = time.perf_counter()
    sorted(data)
    sort_time = time.perf_counter() - start

    start = time.perf_counter()
    subset_sum_brute(data, target)
    ss_time = time.perf_counter() - start

    print(f"  n={n}: sort={sort_time:.6f}s, subset_sum={ss_time:.6f}s")
```

## Connection to CS / Games / AI

- **Cryptography:** RSA security relies on the assumption that factoring is
  not in P. If $P = NP$, all public-key crypto breaks.
- **AI planning:** Many AI planning problems are NP-hard or PSPACE-hard,
  explaining why optimal planning is intractable for large state spaces.
- **Game AI:** Solving general game positions (chess, Go) is EXPTIME-complete;
  approximations (minimax + pruning) are used instead.
- **SAT solvers:** Despite NP-completeness, modern SAT solvers handle millions
  of variables in practice — used in hardware verification and AI.

## Check Your Understanding

1. Prove that Vertex Cover is in NP by describing a polynomial-time verifier.
2. If someone finds a polynomial-time algorithm for 3-SAT, what are the
   consequences for all NP-complete problems?
3. Is the following problem in P, NP, or neither: "Given a program and input,
   does the program halt within $k$ steps?" Explain.
