---
strand: reasoning
level: intermediate
order: 5
title: Constructive vs Classical Logic
prerequisites:
  - tier: strand-8-reasoning-intermediate
    slug: 04-strong-induction
    description: Strong induction
connections:
  - strand-8-reasoning-intermediate/06-russell-paradox
applications:
  - cs: "Curry-Howard, type theory, proof-as-program in Coq/Lean/Idris"
  - life: "What does it mean to *prove* an existence claim?"
---

# Constructive vs Classical Logic

## Explain Like I Am 7

You promise the class "there's a hidden sweet under one of these
cups."  Two ways to prove it.  The **classical** way: you argue
"every cup being empty would be impossible, so a sweet must be there
somewhere."  The **constructive** way: you walk over, lift cup three,
and show everyone the sweet.  Both ways say a sweet exists, but only
the constructive proof actually hands you the sweet.  Computer
people love the constructive style because each "proof" comes with a
working recipe to *find* the thing.

## Mental

**Classical logic** accepts the **law of excluded middle** (LEM):
$P \lor \lnot P$ for *every* proposition $P$.

**Constructive logic** (a.k.a. **intuitionistic logic**) does **not**
accept LEM unconditionally. To prove $P \lor \lnot P$ you must
either construct a proof of $P$ or construct a proof of $\lnot P$.

Why care? In classical logic, "there exists a real with property $X$"
might be proved by deriving a contradiction from "no real has $X$" —
without ever exhibiting one. Constructively, **proving** $\exists x : P(x)$
means you can **produce** an $x$.

## A famous classical-only proof

**Theorem**: there exist irrational $a, b$ with $a^b$ rational.

**Classical proof**: consider $\sqrt{2}^{\sqrt{2}}$.

- *Case A*: $\sqrt{2}^{\sqrt{2}}$ is rational. Then $a = b = \sqrt{2}$ works.
- *Case B*: $\sqrt{2}^{\sqrt{2}}$ is irrational. Then
  $a = \sqrt{2}^{\sqrt{2}}, b = \sqrt{2}$ gives
  $a^b = (\sqrt{2}^{\sqrt{2}})^{\sqrt{2}} = \sqrt{2}^2 = 2$ — rational. ✓

Conclusion: in *some* case we have a witness. But the proof never
**tells us which case** — it splits on $P \lor \lnot P$. That's
unacceptable in constructive mathematics until someone (Gelfond,
1934) actually proved $\sqrt{2}^{\sqrt{2}}$ is irrational, at
which point Case B's witness $a = \sqrt{2}^{\sqrt{2}}, b = \sqrt{2}$
becomes a constructive proof.

## The Curry-Howard correspondence

The deep link: **propositions are types** and **proofs are programs**.

| Logic | Programming |
|---|---|
| Proposition $P$ | Type $P$ |
| Proof of $P$ | Program of type $P$ |
| Proof of $P \to Q$ | Function $P \to Q$ |
| Proof of $P \land Q$ | Pair $(p, q)$ |
| Proof of $P \lor Q$ | Tagged union (left $p$ or right $q$) |
| Proof of $\exists x P$ | Pair $(x, p)$ — a witness with proof |
| Proof of $\forall x P$ | Function $x \mapsto p(x)$ |

A constructive proof of $\exists x P(x)$ is *literally* a program
returning a value. This is why **proof assistants** (Coq, Lean,
Agda) follow constructive logic — proofs are executable.

## Interactive

:::widget type=numeric-input prompt="LEM ($P \\lor \\lnot P$) holds in classical logic. Type 1 for accepted, 0 for rejected." answer=1 explain="Accepted classically.":::

:::widget type=numeric-input prompt="In constructive logic, to prove $\\exists x : P(x)$ you must produce a specific $x$. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="A classical proof can split on $P \\lor \\lnot P$ without choosing a side. Constructive proofs cannot. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Curry-Howard: proof of $P \\to Q$ corresponds to a *function* of type $P \\to Q$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Heyting algebra** is the algebraic semantics of constructive
logic — replaces classical's Boolean algebra. The axioms differ:

- $\lnot \lnot P \to P$ holds **classically** but not constructively.
- $(P \to Q) \to (\lnot Q \to \lnot P)$ holds in both.
- $\lnot (P \land Q) \to (\lnot P \lor \lnot Q)$ — De Morgan — holds
  classically only.

**Brouwer-Heyting-Kolmogorov (BHK) interpretation**: a constructive
proof of:

- $P \land Q$ is a pair (proof of $P$, proof of $Q$).
- $P \lor Q$ is a tag plus a proof of the chosen disjunct.
- $P \to Q$ is a transformer from proofs of $P$ to proofs of $Q$.
- $\lnot P$ is a transformer from proofs of $P$ to a proof of $\bot$.
- $\exists x : P(x)$ is a witness $a$ plus a proof of $P(a)$.
- $\forall x : P(x)$ is a function from $x$ to a proof of $P(x)$.

## Computational

```python
# Constructive existence: produce the witness
def find_pair_summing_to(target, pool):
    for i, x in enumerate(pool):
        for y in pool[i:]:
            if x + y == target:
                return (x, y)        # a witness
    return None                       # no witness — like a refutation

print(find_pair_summing_to(7, [1, 2, 3, 4]))   # (3, 4) — exists
print(find_pair_summing_to(99, [1, 2, 3, 4]))  # None — disprove
```

```python
# Tagged-union (Either) for OR
def or_proof(left=None, right=None):
    if left is not None: return ("left", left)
    if right is not None: return ("right", right)
    raise Exception("no proof")

print(or_proof(left="proof of P"))    # ('left', 'proof of P')
```

## Applied

- **Coq, Lean, Agda, Idris** are **constructive** by default. Their
  type checkers verify that proofs are total, computable functions.
- **Extracting programs from proofs** — a constructive proof of
  "$\forall n \in \mathbb{N}: \exists m: P(n, m)$" extracts to an
  algorithm computing $m$ from $n$.
- **Cryptographic protocols** are often described constructively
  because the *witness* (key, signature, etc.) is what matters.
- **Sequent calculus** and **natural deduction** in compilers and
  proof tools — directly mirror the BHK interpretation.

## Check Your Understanding

:::widget type=numeric-input prompt="Classical proofs accept LEM. Constructive proofs do not. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Curry-Howard: types ↔ propositions. Programs ↔ proofs. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\lnot \\lnot P \\to P$ — classical (1) or constructive (0)?" answer=1 explain="Classical only. Constructively, double-negation does not give back $P$.":::

:::widget type=numeric-input prompt="Coq is constructive by default. Type 1 if true." answer=1 explain="Yes.":::
