---
strand: computation
level: master
order: 3
title: Recursion Theory
prerequisites:
  - tier: strand-7-computation-master
    slug: 02-quantum-algorithms
    description: Quantum algorithms
connections:
  - strand-7-computation-master/04-kolmogorov-complexity
applications:
  - cs: "Foundations of computability, undecidability proofs"
  - life: "What can possibly be computed?"
---

# Recursion Theory

## Explain Like I Am 7

Imagine a tape with a tiny robot scribbling, erasing, and shuffling
left-and-right, following a list of rules.  Some questions the robot
*can* eventually answer no matter what — those are the **computable**
ones.  Others, like "will this robot ever stop?", are forever out of
reach: there's no robot that can solve that for *every* program.  This
chapter is the family tree of "can be done by a robot" versus "cannot
be done by *any* robot, ever," and how to tell which side a problem is
on.

## Mental

**Recursion theory** (= **computability theory**) studies the set of
*computable functions* and their structure.

A function $f : \mathbb N \to \mathbb N$ is **computable** if there's
a Turing machine that computes it on every input.

**Church-Turing thesis**: any "effectively calculable" function is
Turing-computable. Lambda calculus, μ-recursive functions, register
machines all give the same class.

## Halting problem and Turing reducibility

The **halting problem** is undecidable (Strand 8 Intermediate):
$\mathrm{HALT} \notin \mathrm{REC}$.

**Turing reducibility** $A \le_T B$: there's an *oracle machine*
that decides $A$ given an oracle for $B$.

**Turing degrees** ${\rm DEG}_T$: equivalence classes under $\equiv_T$.

- $\mathbf 0$: computable functions.
- $\mathbf 0'$: degree of $\mathrm{HALT}$ (jump operator).
- $\mathbf 0'', \mathbf 0''', \ldots$: iterated jumps.

The structure of degrees is enormously rich.

## Arithmetical hierarchy

A predicate $P(\bar n)$ is:

- $\Sigma^0_n$: $\exists \mathbf y_1 \forall \mathbf y_2 \exists \ldots R(\mathbf n, \mathbf y_1, \ldots, \mathbf y_n)$
  with $R$ recursive.
- $\Pi^0_n$: dual (start with $\forall$).
- $\Delta^0_n = \Sigma^0_n \cap \Pi^0_n$.

| Class | Examples |
|---|---|
| $\Sigma^0_1 = $ r.e. | halting set, theorems of PA |
| $\Pi^0_1 = $ co-r.e. | non-halting set |
| $\Sigma^0_2$ | "function totally defined" |
| $\Sigma^0_n$ | with $n$ alternating quantifiers |

**Post's theorem**: $A \in \Sigma^0_{n+1}$ iff $A$ is r.e. relative to
$\mathbf 0^{(n)}$.

## Friedberg-Muchnik theorem

There exist **incomparable** Turing degrees: $\mathbf a, \mathbf b$
with $\mathbf a \not\le_T \mathbf b$ and $\mathbf b \not\le_T \mathbf a$.

So Turing reducibility is *not* a linear order. Constructed by
**finite priority methods** — a hallmark technique of recursion
theory.

## Interactive

:::widget type=numeric-input prompt="HALT is undecidable. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Turing reducibility: oracle machine. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathbf 0'$ is the degree of HALT. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Friedberg-Muchnik: incomparable r.e. degrees exist. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Hyperarithmetic hierarchy**: levels indexed by computable ordinals.
$\Sigma^1_1$ = analytic, beyond all $\Sigma^0_n$. Studied via
descriptive set theory.

**Reducibilities**:

- **m-reducibility** $\le_m$: many-one. Stronger than Turing.
- **truth-table** $\le_{tt}$: yes-or-no oracle, total computation.
- **enumeration** $\le_e$: oracle gives $A$'s elements one at a time.

**$\omega$-r.e.**: r.e. with finite mind-changes during enumeration.

**Algorithmic randomness** (next lesson) connects to recursion theory
via Martin-Löf randomness.

## Computational

```python
# Halting-problem demonstration: try to detect halting
# on a few simple programs

def runs_finitely_many_steps(prog, max_steps=1000):
    """Try running prog (a no-arg function) for up to max_steps."""
    try:
        prog()  # in real scenario, would simulate step by step
        return True
    except RecursionError:
        return False

# Simple halting program
def loop_finite():
    for i in range(10):
        pass

# Infinite loop (unsafe to run directly!)
# def loop_infinite():
#     while True: pass

print(runs_finitely_many_steps(loop_finite))     # True
# Cannot reliably detect for arbitrary programs

# r.e. set: enumerate halting machines (in principle)
# In practice: for all finite simple programs, run and observe halting
def list_halting_programs(N):
    halting = []
    # Toy: enumerate (description, input) pairs
    for code in range(N):
        # Pretend each integer encodes a tiny program
        halts = True if code % 7 != 0 else False  # arbitrary toy rule
        if halts: halting.append(code)
    return halting

print(list_halting_programs(20))[:8]    # toy r.e. enumeration

# Arithmetical hierarchy intuition
# Σ_1: ∃n. R(n, x) — halting set
# Π_1: ∀n. R(n, x) — totality
# Σ_2: ∃m ∀n. R(m, n, x)
```

## Applied

- **Foundations of computer science** — recursion theory underpins
  everything from compilers to verifiable computing.
- **Verification limits** — Rice's theorem says non-trivial semantic
  properties are undecidable; static analysers must approximate.
- **Algorithmic-randomness theory** in cryptography (next lesson).
- **Set theory** — descriptive set theory uses hyperarithmetic
  techniques.
- **Reverse mathematics** (Strand 8 Advanced Lesson 5) calibrates
  classical theorems against r.e. /Π¹₁ classes.

## Check Your Understanding

:::widget type=numeric-input prompt="HALT is undecidable. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Σ_1 = r.e. (recursively enumerable). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Friedberg-Muchnik: incomparable r.e. degrees. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Rice's theorem: non-trivial semantic properties undecidable. Type 1." answer=1 explain="Yes.":::
