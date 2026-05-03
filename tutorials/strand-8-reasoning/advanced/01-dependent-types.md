---
strand: reasoning
level: advanced
order: 1
title: Dependent Types
prerequisites:
  - tier: strand-8-reasoning-advanced
    slug: 00-higher-order-logic
    description: Higher-order logic
connections:
  - strand-8-reasoning-advanced/02-categorical-logic
applications:
  - cs: "Coq, Lean, Idris, Agda — proof assistants and dependently typed languages"
  - life: "Types that depend on values"
---

# Dependent Types

## Mental

**Simple types**: a function $f : A \to B$ takes any $A$ and returns
some $B$.

**Dependent types**: the *return type* depends on the *input value*.
For example, `Vec n A` (vectors of length $n$) is a type indexed by
the natural number $n$:

$$
\mathrm{replicate} : (n : \mathbb{N}) \to (a : A) \to \mathrm{Vec}\ n\ A.
$$

The function's output type literally contains the value $n$. Type
checking now must do arithmetic-like computation.

## Π and Σ types

Two key dependent constructors:

- **$\Pi$ type** (dependent function): $\Pi (x : A). B(x)$ —
  generalises $A \to B$ when $B$ depends on $x$.
- **$\Sigma$ type** (dependent pair): $\Sigma (x : A). B(x)$ —
  generalises $A \times B$.

Curry-Howard correspondence:

| Logic | Dependent type |
|---|---|
| $\forall x : A, P(x)$ | $\Pi (x : A). P(x)$ |
| $\exists x : A, P(x)$ | $\Sigma (x : A). P(x)$ |

A proof of "for all $n$, there exists $m$ with $m > n$" is a
function returning a pair $(m, \text{proof of } m > n)$.

## Worked example: head of a non-empty list

```
head : (n : Nat) -> Vec (n + 1) A -> A
```

The function only accepts vectors of length $n + 1$ for some $n$
— **rejecting empty vectors at type-check time**, before runtime.

Compare to:
```
head : List A -> A   -- partial; needs to fail or use Maybe
```

Dependent types push correctness from runtime to compile time.

## Worked example: append

```
append : (m, n : Nat) -> Vec m A -> Vec n A -> Vec (m + n) A
```

The output length is *known statically*. The type checker verifies
that any implementation of `append` actually returns a vector of
the claimed length.

## Interactive

:::widget type=numeric-input prompt="Dependent type: type depends on a value. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\Pi$ type generalises $\\to$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\Sigma$ type corresponds to $\\exists$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="`Vec n A` for $n = 0$ is the empty vector type. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Universes**: types themselves have types: $\mathrm{Type}_0$,
$\mathrm{Type}_1$, etc. Without a hierarchy, $\mathrm{Type} : \mathrm{Type}$
leads to Girard's paradox (Russell-flavoured for types).

**Inductive families**: dependent generalisation of inductive types.
$\mathrm{Vec}$ is an inductive family indexed by $n : \mathbb{N}$,
with constructors $\mathrm{nil} : \mathrm{Vec}\ 0\ A$ and
$\mathrm{cons} : (n : \mathbb{N}) \to A \to \mathrm{Vec}\ n\ A \to \mathrm{Vec}\ (n+1)\ A$.

**Equality types** $a =_A b$: the type of proofs that $a$ and $b$
are equal. In intensional type theory, two equal terms may have
distinct equality proofs — the foundation of Homotopy Type Theory.

**Termination checking**: dependently typed languages require all
functions to terminate (otherwise inconsistent — false would have a
proof). Structural recursion or well-founded recursion is enforced.

## Computational

```python
# Python doesn't have dependent types, but we can simulate with checks

# Length-indexed lists at runtime
class Vec:
    def __init__(self, n, items):
        assert len(items) == n
        self.n = n
        self.items = items

# Dependent-typed append: ensures output length is m + n
def append(v1: Vec, v2: Vec) -> Vec:
    return Vec(v1.n + v2.n, v1.items + v2.items)

v1 = Vec(3, [1, 2, 3])
v2 = Vec(2, [4, 5])
result = append(v1, v2)
print(result.n, result.items)         # 5, [1, 2, 3, 4, 5]

# In real dependent types (Idris-like syntax):
# append : (m, n : Nat) -> Vec m a -> Vec n a -> Vec (m + n) a
# The length proof is checked at compile time.

# In Idris:
# replicate : (n : Nat) -> a -> Vec n a
# replicate Z _ = Nil
# replicate (S k) x = x :: replicate k x
```

## Applied

- **Coq, Lean, Agda, Idris** — dependently typed proof assistants
  / programming languages used for verifying real software.
- **CompCert** — formally verified C compiler in Coq.
- **Math formalisation** — Lean's `mathlib` has formalised hundreds
  of mathematical theorems; Lean Theorem Prover used by Fields
  medalists.
- **Cryptographic proof** — Mizar, EasyCrypt formalise security
  proofs of crypto protocols.
- **Smart-contract verification** — Tezos uses Michelson + formal
  methods; Cardano uses Plutus (Haskell with refinement-type-style
  checks).

## Check Your Understanding

:::widget type=numeric-input prompt="Dependent types let return type depend on input value. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\Pi (x : A). B(x)$ generalises $A \\to B$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathrm{Type} : \\mathrm{Type}$ would lead to paradox; universes solve this. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Dependent-type languages require termination of all functions. Type 1." answer=1 explain="Yes.":::
