---
strand: reasoning
level: master
order: 3
title: Cut Elimination and Sequent Calculus
prerequisites:
  - tier: strand-8-reasoning-master
    slug: 02-ordinal-analysis
    description: Ordinal analysis
connections:
  - strand-8-reasoning-master/04-descriptive-complexity
applications:
  - cs: "Proof search, automated theorem proving, programming-language type theory"
  - life: "Why every proof can be done without lemmas"
---

# Cut Elimination and Sequent Calculus

## Mental

**Sequent calculus** (Gentzen, 1934) writes proofs as derivations of
*sequents* $\Gamma \vdash \Delta$ — "from antecedents $\Gamma$ derive
consequents $\Delta$."

Rules: introduce / left-right / weakening / contraction / *cut*.

The **cut rule**:

$$
\frac{\Gamma \vdash A, \Delta \quad \Gamma', A \vdash \Delta'}{\Gamma, \Gamma' \vdash \Delta, \Delta'}.
$$

(Use $A$ from one branch as a hypothesis in another; intuitively
"using a lemma.")

## Cut elimination theorem

**Gentzen's Hauptsatz**: every proof in sequent calculus can be
transformed into a *cut-free* proof.

Implications:

- Every theorem provable using lemmas is provable directly — though
  potentially hyper-exponentially longer.
- Cut-free proofs have the **subformula property**: every formula in
  the proof appears in the conclusion.
- Decidability for many logics.

## Proof complexity

Cut elimination is sometimes *enormously* expensive: cut-free PA
proofs can be hyper-exponentially longer than cut-using proofs.
This is **Gentzen's bound**.

**Pudlák, Pitassi**: lower-bound techniques in propositional proof
complexity.

## Worked example: linear logic

**Linear logic** (Girard, 1987): split the connectives into
multiplicative and additive flavors. Cut elimination is more
delicate; provides resource-tracking semantics.

Used in:

- Proof search algorithms.
- Programming-language design (linear types).
- Concurrency theory.

## Interactive

:::widget type=numeric-input prompt="Cut rule: combine sub-derivations using a shared formula. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Gentzen Hauptsatz: cut-elimination theorem. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Subformula property: cut-free proofs use only subformulas of conclusion. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cut elimination can hyper-exponentially blow up proof size. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Natural deduction**: alternative formulation; introduction +
elimination per connective. Curry-Howard pairs natural deduction
with $\lambda$-calculus.

**Focused proof systems**: restrict shape of proofs to reduce
non-determinism in proof search.

**Resolution**: refutation calculus for first-order logic. Used in
SAT/SMT solvers (DPLL, CDCL).

**Curry-Howard for sequent**: cut elimination ↔ $\beta$-reduction in
$\lambda$-calculus. The Curry-Howard correspondence reaches deeper
than just natural deduction.

## Computational

```python
# Toy sequent-calculus prover for propositional logic
# Encoding: sequent = (left, right) lists of formulas

# Formula representation: tuples ('and', a, b), ('or', a, b), ('imp', a, b), ('not', a), or atom strings.

def is_axiom(left, right):
    """A sequent Γ, A ⊢ A, Δ is an axiom."""
    return any(f in right for f in left)

def prove(left, right, depth=10):
    if depth == 0: return False
    left = list(left); right = list(right)
    if is_axiom(left, right): return True

    # Left rules
    for f in left:
        if isinstance(f, tuple):
            op = f[0]
            if op == 'and':
                _, a, b = f
                new_left = [g for g in left if g != f] + [a, b]
                return prove(new_left, right, depth - 1)
            if op == 'imp':
                _, a, b = f
                new_left = [g for g in left if g != f]
                return prove(new_left, right + [a], depth - 1) and \
                       prove(new_left + [b], right, depth - 1)
    # Right rules
    for f in right:
        if isinstance(f, tuple):
            op = f[0]
            if op == 'and':
                _, a, b = f
                new_right = [g for g in right if g != f]
                return prove(left, new_right + [a], depth - 1) and \
                       prove(left, new_right + [b], depth - 1)
            if op == 'imp':
                _, a, b = f
                new_right = [g for g in right if g != f]
                return prove(left + [a], new_right + [b], depth - 1)
    return False

# Verify A ⊢ A — a tautology
print(prove(['A'], ['A']))            # True

# Verify (A → B), A ⊢ B (modus ponens)
print(prove([('imp', 'A', 'B'), 'A'], ['B']))   # True

# Non-theorem
print(prove(['A'], ['B']))            # False (limited search)
```

## Applied

- **Automated theorem proving** — Vampire, E, SPASS use resolution
  variants. SAT solvers use CDCL (a kind of resolution).
- **Type inference** in programming languages — mutually-recursive
  let-polymorphism uses constraint-based proof search.
- **Linear types** in Rust, Idris — encode resource discipline.
- **Concurrency theory** — process calculi (CCS, CSP, π-calculus)
  use sequent / proof-theoretic semantics.
- **Proof certificates** — modern verifiers (Lean, Coq) check by
  reducing proofs to cut-free forms.

## Check Your Understanding

:::widget type=numeric-input prompt="Sequent calculus: $\\Gamma \\vdash \\Delta$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cut elimination: theorem of Gentzen. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Linear logic distinguishes multiplicative/additive connectives. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Curry-Howard: cut elimination ↔ β-reduction. Type 1." answer=1 explain="Yes.":::
