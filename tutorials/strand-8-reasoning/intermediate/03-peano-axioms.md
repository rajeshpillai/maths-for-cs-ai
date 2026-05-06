---
strand: reasoning
level: intermediate
order: 3
title: Peano Axioms — Building $\mathbb{N}$
prerequisites:
  - tier: strand-8-reasoning-intermediate
    slug: 02-equivalence-revisit
    description: Equivalence relations
connections:
  - strand-8-reasoning-intermediate/04-strong-induction
applications:
  - cs: "Inductive types in Coq/Idris/Lean — Nat is *literally* this construction"
  - life: "Where do the natural numbers actually come from?"
---

# Peano Axioms — Building $\mathbb{N}$

## Explain Like I Am 7

Imagine you have one starter block called *zero*, and one rubber
stamp that turns any block into "the next one."  Stamp zero and you
get *one*; stamp *one* and you get *two*; never two different blocks
share a stamp, and you never circle back to zero.  Out of this little
two-piece kit — a block and a stamp — you can build every counting
number that ever existed.  These few rules are how mathematicians
quietly say what whole numbers *are* without using fingers.

## Mental

Where do the natural numbers come from? Peano gives a small set of
axioms that *characterise* $\mathbb{N}$ up to isomorphism.

A **Peano structure** is a set $N$ with:

- a distinguished element $0 \in N$,
- a **successor function** $S : N \to N$,

satisfying:

1. $0$ is not the successor of any element. ($\nexists n: S(n) = 0$.)
2. $S$ is **injective**. ($S(m) = S(n) \Rightarrow m = n$.)
3. **Induction**: if $X \subseteq N$ contains $0$ and is closed
   under $S$, then $X = N$.

That's it. Three axioms determine $(\mathbb{N}, 0, S)$ up to
isomorphism.

## Defining addition

Addition is defined recursively *via the successor*:

$$
m + 0 = m, \qquad m + S(n) = S(m + n).
$$

Read: "to add $S(n)$, add $n$ then take a successor." This is
**not** circular — addition is built up purely from $S$.

Multiplication, exponentiation, and ordering follow the same recipe:

$$
m \cdot 0 = 0, \qquad m \cdot S(n) = m \cdot n + m.
$$

$$
m^0 = S(0), \qquad m^{S(n)} = m^n \cdot m.
$$

## Proving $0 + n = n$

Note: $m + 0 = m$ is by definition, but $0 + n = n$ requires
**induction on $n$**.

- Base ($n = 0$): $0 + 0 = 0$. ✓
- Step: assume $0 + n = n$. Then
  $0 + S(n) = S(0 + n) = S(n)$. ✓

So $0 + n = n$ for all $n$ — by axiom 3.

## Set-theoretic implementation

In ZFC, the standard model:

$$
0 = \emptyset, \quad 1 = \{\emptyset\}, \quad 2 = \{\emptyset, \{\emptyset\}\}, \ldots
$$

with $S(n) = n \cup \{n\}$. Then $|n|$ as a set equals the
natural number $n$ in our intuitive sense. The infinity axiom
guarantees that this collection forms a set $\omega = \mathbb{N}$.

## Interactive

:::widget type=numeric-input prompt="Number of Peano axioms (in the modern presentation)?" answer=3 explain="$3$ — successor injective, $0$ not in image, induction.":::

:::widget type=numeric-input prompt="Define $1 = S(0)$, $2 = S(1)$. Then $2 + 2$ via $m + S(n) = S(m + n)$: $2 + S(1) = S(2 + 1) = S(S(2 + 0)) = S(S(2)) = ?$" answer=4 explain="$4 = S(S(2))$.":::

:::widget type=numeric-input prompt="In set-theoretic $\\mathbb{N}$, what is $|3|$ as a set? ($3 = \\{0, 1, 2\\}$.)" answer=3 explain="$3$ elements.":::

:::widget type=numeric-input prompt="The induction axiom says: $X \\subseteq \\mathbb{N}, 0 \\in X, n \\in X \\Rightarrow S(n) \\in X$ implies $X = \\mathbb{N}$. Type 1 if this is induction." answer=1 explain="Yes.":::

## Symbolic

**Categoricity**: any two structures satisfying Peano's axioms are
isomorphic. The natural numbers are unique up to renaming.

**First-order vs second-order Peano arithmetic**: the induction
axiom 3 quantifies over *subsets* — second-order. The
first-order PA replaces it with an induction *schema* (one axiom
per definable property). The two systems differ — Gödel's first
incompleteness theorem applies to first-order PA.

**Recursion theorem**: a function on $\mathbb{N}$ is fully
determined by its value at $0$ and a rule giving $f(S(n))$ in
terms of $f(n)$. Peano's axioms make recursion well-defined.

## Computational

```python
# Successor model in pure Python
class Nat:
    def __init__(self, n):
        self.n = n
    def succ(self):
        return Nat(self.n + 1)

zero = Nat(0)
one = zero.succ()
two = one.succ()

# Recursive add: m + S(n) = S(m + n)
def add(m, n):
    if n.n == 0: return m
    return add(m, Nat(n.n - 1)).succ()

print(add(two, two).n)                           # 4

# Inductive proof checker (toy): verify P(n) for n in range(N)
def prove_induction(P, N=20):
    if not P(0): return False
    for k in range(N):
        if P(k) and not P(k + 1): return False
    return True

print(prove_induction(lambda n: sum(range(n + 1)) == n * (n + 1) // 2))  # True
```

## Applied

- **Inductive types** in Coq, Lean, Agda: `Nat` is *literally*
  defined with constructors `Z` and `S(prev: Nat)`. Pattern-matching
  on Nat is structural recursion.
- **Termination checking** in dependently typed languages relies on
  recursion descending the natural-number well-ordering.
- **Formal verification of compilers** uses Peano-style induction on
  syntax trees as the basic technique.
- **Set theory in proof assistants** — Isabelle/HOL implements
  natural numbers from a Peano-style axiomatization.

## Check Your Understanding

:::widget type=numeric-input prompt="$3 + 2$ via Peano: $3 + S(1) = S(3 + 1) = S(S(3 + 0)) = S(S(3)) = ?$" answer=5 explain="$5$.":::

:::widget type=numeric-input prompt="In ZFC's encoding $0 = \\emptyset, n+1 = n \\cup \\{n\\}$, what is $|2|$?" answer=2 explain="$2 = \\{0, 1\\}$ — size $2$.":::

:::widget type=numeric-input prompt="Peano's axioms determine $\\mathbb{N}$ up to isomorphism. Type 1 if true." answer=1 explain="Yes — categoricity.":::

:::widget type=numeric-input prompt="Recursion theorem: a function $f: \\mathbb{N} \\to X$ is determined by $f(0)$ and a rule $f(S(n)) = g(f(n))$. Type 1." answer=1 explain="Yes.":::
