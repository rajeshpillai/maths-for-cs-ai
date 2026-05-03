---
strand: reasoning
level: research
order: 7
title: Univalent Foundations Program — Status
prerequisites:
  - tier: strand-8-reasoning-research
    slug: 06-infinity-cosmoi
    description: $\infty$-cosmoi
connections:
  - strand-8-reasoning-research/08-emerging-foundations
applications:
  - cs: "Univalent foundations as alternative to ZFC; mechanised mathlib"
  - life: "Foundational program — where is it now?"
---

# Univalent Foundations Program — Status

## Mental

**Univalent Foundations** (Voevodsky, 2010s): replace ZFC with
homotopy type theory + the **univalence axiom**, giving mathematics
a constructive, computer-checkable foundation.

The **HoTT Book** (Univalent Foundations Program, 2013): a
collaborative textbook, born at IAS, fixing the language and basic
results.

## Univalence axiom

For types $A, B$ in universe $\mathcal U$:

$$(A = B) \;\simeq\; (A \simeq B).$$

Equivalent types are *equal* — equality is *equivalence*. Beyond
just an axiom: it has computational content in cubical type theory.

## Key advances since the HoTT Book

| Year | Advance | Impact |
|---|---|---|
| 2014 | Cubical model | Univalence has computational meaning |
| 2017 | Cubical Agda | Univalent type theory in production |
| 2018 | HITs and synthetic homotopy | $\pi_n(S^k)$ proofs internal to HoTT |
| 2019+ | Real-cohesion HoTT | Synthetic differential geometry |
| 2020+ | Symmetric / displayed bicat | Categorical foundations refined |
| 2023+ | Lean 4 mathlib | Univalent-style proof at scale (UniMath, agda-unimath) |

## Status of foundational claims

### Achieved
- ZFC-style mathematics formalisable in HoTT — set-level model.
- Univalence consistent with classical reasoning.
- $\pi_4(S^3) = \mathbb Z / 2$ proved synthetically (Brunerie 2016).
- Computational univalence in cubical Agda (Cohen-Coquand-
  Huber-Mörtberg 2017).

### Open
- Compatibility with classical excluded-middle in full generality
  remains delicate.
- Higher universe structure: how to handle the axiom of choice
  in HoTT cleanly.
- Computational content of HITs (higher inductive types) still
  evolving.

## Interactive

:::widget type=numeric-input prompt="Voevodsky originator of univalent foundations. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="HoTT Book 2013 collaborative. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Univalence axiom: $(A=B) \\simeq (A \\simeq B)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cubical Agda gives computational univalence. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Synthetic homotopy theory in HoTT**:

- Spheres $S^n$ as **higher inductive types**.
- Homotopy groups $\pi_n(X) := \|\Omega^n X\|_0$ definable as
  set-truncated loop spaces.
- $\pi_4(S^3) = \mathbb Z / 2$ — Brunerie's proof, eventually
  computer-verified.

**Symmetric / equivalent / structured types**: when does
univalence respect extra structure (group, ring, …)? Categorical
toolkit — *displayed categories*, *univalent bicategories*
(Ahrens-North-Tsementzis 2019).

**Univalent set-quotients**: HITs realise set-level quotients
universally, replacing ZFC-style coset constructions.

## Computational

```python
# Univalence is fundamentally computational in cubical type theory
# Sketch: bool ≃ bool transport across an equivalence

# In Cubical Agda (Mörtberg-Vezzosi-Cohen-Huber):
#   not : Bool → Bool        -- inversion
#   notEquiv : Bool ≃ Bool   -- pack into equivalence
#   notPath : Bool ≡ Bool    -- via univalence (ua notEquiv)
#   transport : (P : I → Type) → P i0 → P i1
#   transport (notPath ↦ id) true ≡ false   -- computes!

print("In cubical Agda:")
print("  notPath := ua notEquiv  -- Bool ≡ Bool")
print("  transport notPath true  ≡ false")
print()

# Python sketch of the structural identification
class TypeEquivalence:
    """A ≃ B with forward/back/proof of inverse."""
    def __init__(self, fwd, bwd, name):
        self.fwd = fwd; self.bwd = bwd; self.name = name
    def transport(self, x):
        return self.fwd(x)

not_equiv = TypeEquivalence(lambda b: not b, lambda b: not b, "Bool ≃ Bool via not")
print(f"Equivalence: {not_equiv.name}")
print(f"transport True := {not_equiv.transport(True)}")    # False
print(f"transport False := {not_equiv.transport(False)}")  # True
print()
print("Real cubical Agda computes these via the cubical model.")
print("Production formalisation: agda-unimath (Rijke et al.).")
```

## Applied

- **agda-unimath** — large univalent library.
- **UniMath** — Coq-based univalent foundations library.
- **Lean 4 mathlib** — set-level approach but borrows univalent
  ideas (group structures, equivalence-respecting).
- **Cubical Agda** — production cubical type theory.
- **Synthetic algebraic geometry** — recent direction (Cherubini,
  Coquand, Wege, Zeuner 2023).

## Check Your Understanding

:::widget type=numeric-input prompt="Univalence axiom: equality = equivalence. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="HoTT Book 2013 originated at IAS. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\pi_4(S^3) = \\mathbb Z / 2$ proved synthetically (Brunerie). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="agda-unimath: production univalent library. Type 1." answer=1 explain="Yes.":::
