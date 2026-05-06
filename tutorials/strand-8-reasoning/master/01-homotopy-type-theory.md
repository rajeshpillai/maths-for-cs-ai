---
strand: reasoning
level: master
order: 1
title: Homotopy Type Theory
prerequisites:
  - tier: strand-8-reasoning-master
    slug: 00-martin-lof-type-theory
    description: Martin-Löf type theory
connections:
  - strand-8-reasoning-master/02-ordinal-analysis
applications:
  - cs: "Univalent foundations; future of formal mathematics"
  - life: "Types as homotopy types"
---

# Homotopy Type Theory

## Explain Like I Am 7

In normal maths, "$3 = 3$" is one boring fact.  In **homotopy** type
theory, equality becomes a *path*: imagine a wiggly piece of string
between two stickers labelled $3$.  Sometimes there are *many* paths
between the same two stickers, and even paths between *paths* — like
two different ways to wrap the string.  Suddenly equality has shape
and history.  This stretchy view of "the same" is letting people
write proofs about geometry and topology in a brand-new way that
computers can check.

## Mental

**Homotopy Type Theory (HoTT)** = MLTT + a few extra axioms providing
a *homotopy-theoretic* interpretation:

- Types ≈ homotopy types (topological spaces up to homotopy).
- Terms ≈ points.
- Identity types $a =_A b$ ≈ paths from $a$ to $b$.
- Higher equalities = paths between paths (homotopies).

The seed: Voevodsky's **univalence axiom** (UA, ~2009): for types
$A, B$, the natural map

$$
(A = B) \longrightarrow (A \simeq B)
$$

is itself an *equivalence*. So **equivalent types are equal** —
formally.

## Univalence's consequences

- **Function extensionality**: pointwise-equal functions are equal.
- **Quotient types** become first-class.
- **Replacing isomorphism by equality** in proofs throughout
  mathematics — closer to actual mathematical practice.

## Higher inductive types (HITs)

Types with both **point** and **path** constructors:

- **Circle** $S^1$: point $\mathrm{base}$, path $\mathrm{loop} : \mathrm{base} = \mathrm{base}$.
- **Sphere** $S^2$: point $\mathrm{base}$, 2-cell.
- **Suspension, smash product, ...**

HITs let us work with topological spaces *as types*. $\pi_1(S^1) = \mathbb Z$
becomes a HoTT theorem.

## Worked example: $S^1$ and $\mathbb Z$

In HoTT:

```
data S^1 : Type where
    base : S^1
    loop : base = base

-- Theorem: π_1(S^1) = Z
encode : Π (x : S^1). (base = x) → ℤ
decode : Π (x : S^1). ℤ → (base = x)

theorem : isEquiv (encode base) -- (base = base) ≃ ℤ
```

Proof relies on a clever *fibration* trick (Licata, Brunerie, ...).
Computer-checked in Coq's HoTT library.

## Interactive

:::widget type=numeric-input prompt="HoTT identifies types with homotopy types. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Voevodsky's univalence axiom: $(A = B) \\simeq (A \\simeq B)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Identity type = path type. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="In HoTT, $\\pi_1(S^1) = \\mathbb Z$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Truncation levels**:

- $-2$: contractible (single inhabitant, identifies all paths).
- $-1$: propositions (subsingletons).
- $0$: sets (no higher equality).
- $1$: groupoids.
- $n$: $n$-truncated.

In HoTT, "set" and "type" are different! Sets are 0-truncated types.

**Cubical type theory** — gives computational rules for univalence
and HITs. Cohen-Coquand-Huber-Mörtberg (2015). Implemented in
Cubical Agda.

**Synthetic mathematics**: do mathematics directly in type theory
without translating through ZFC. HoTT enables synthetic homotopy
theory.

## Computational

```python
# HoTT requires dedicated languages; sketch in Python

# Type as homotopy type
class HomotopyType:
    def __init__(self, points, paths):
        self.points = points         # point constructors
        self.paths = paths           # 1-cells
        # Higher cells: 2-paths between paths, ...

# S^1: 1 point + 1 loop
S1 = HomotopyType(
    points=["base"],
    paths=[("base", "base", "loop")]
)

# Univalence (axiom): equality ↔ equivalence
def univalence(A, B, f):
    """If f : A → B is an equivalence, then A = B."""
    # In MLTT alone: cannot conclude equality
    # In HoTT (with UA): yes — equality witnessed by f
    return f"path from {A} to {B} via {f}"

# Truncation: prop, set, groupoid, ...
def is_set(T):
    """A type is a set if all paths are equal."""
    # In HoTT: hSet predicate
    return "n = 0 truncated"

print(univalence("Bool", "Bool", "swap"))    # path Bool = Bool given by NOT
print(is_set("ℕ"))                            # 0-truncated
```

## Applied

- **Univalent foundations** (Voevodsky's program) — alternative
  to ZFC built on HoTT.
- **Cubical Agda** — computational HoTT.
- **Lean 4** — explores HoTT-flavoured constructs (universes,
  coercions).
- **Mathematical formalisation** — re-cast classical theorems in
  HoTT's "structures up to equivalence" framework.
- **Computer-checked group theory** — HoTT-style proofs of $\pi_n(S^k)$
  groups.
- **Type-theoretic interpretation of physics** — speculative
  applications in topology of spacetime.

## Check Your Understanding

:::widget type=numeric-input prompt="HoTT's main axiom: univalence. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Higher inductive types add path constructors. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cubical type theory makes HoTT computational. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="In HoTT, $\\pi_1(S^1) = \\mathbb Z$ is a theorem. Type 1." answer=1 explain="Yes.":::
