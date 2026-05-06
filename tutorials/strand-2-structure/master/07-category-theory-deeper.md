---
strand: structure
level: master
order: 7
title: Category Theory in Depth
prerequisites:
  - tier: strand-2-structure-master
    slug: 06-homological-algebra
    description: Homological algebra
connections:
  - strand-2-structure-master/08-monoidal-categories
applications:
  - cs: "Functional programming, programming-language semantics, type theory"
  - life: "Mathematics' organisational language"
---

# Category Theory in Depth

## Explain Like I Am 7

Imagine the world's biggest train-station map: all the stations are
"things," and the train lines between them are "ways one thing turns
into another."  Category theory studies those maps — and asks
universal questions like "what's the smallest station that connects to
both A and B?" or "what's the cheapest way to glue two routes?"  The
answers don't care what the stations *are* (numbers, shapes,
programs); they only care about the arrows between them.  That's why
the same category-theoretic idea pops up in algebra, geometry, and
computer programming languages.

## Mental

Strand 8 Advanced Lesson 02 introduced categories. Going deeper:

**Limits and colimits** — universal constructions:

| Limit | Colimit |
|---|---|
| Product $A \times B$ | Coproduct $A \sqcup B$ |
| Equaliser | Coequaliser |
| Pullback | Pushout |
| Inverse limit | Direct limit |
| Terminal object | Initial object |

Limits/colimits exist iff the category is "complete enough." Set,
Top, Group, Ring all have arbitrary limits and colimits.

## Adjunctions revisited

$F \dashv G$ ($F$ left adjoint, $G$ right adjoint) means

$$
\mathrm{Hom}_{\mathcal D}(F(A), B) \cong \mathrm{Hom}_{\mathcal C}(A, G(B))
$$

natural in $A, B$.

**Important property**: left adjoints preserve colimits, right
adjoints preserve limits. This single observation organises an
enormous amount of mathematics.

## Yoneda lemma in detail

For a locally-small category $\mathcal C$ and any functor $F : \mathcal C^{\mathrm{op}} \to \mathrm{Set}$:

$$
\mathrm{Nat}(\mathrm{Hom}(-, A), F) \cong F(A).
$$

Specialising to $F = \mathrm{Hom}(-, B)$:

$$
\mathrm{Nat}(\mathrm{Hom}(-, A), \mathrm{Hom}(-, B)) \cong \mathrm{Hom}(A, B).
$$

So the **Yoneda embedding** $A \mapsto \mathrm{Hom}(-, A)$ is fully
faithful. *Every category embeds into its presheaf category*; this
**recovers the category from its representable functors**.

## Worked example: free-forgetful

For sets, groups: free-group functor $F : \mathrm{Set} \to \mathrm{Group}$
left adjoint to forgetful $U : \mathrm{Group} \to \mathrm{Set}$.

$\mathrm{Hom}_{\mathrm{Group}}(F(S), G) = $ functions $S \to U(G)$.

The free group is *the* universal way to make a group from a set.

Adjunctions like this organise:

- Free vector space $\dashv$ underlying set.
- Discrete topology $\dashv$ underlying set.
- Tensor $\dashv$ Hom.
- Stone-Čech compactification $\dashv$ inclusion.

## Interactive

:::widget type=numeric-input prompt="Adjunction: $\\mathrm{Hom}(F(A), B) \\cong \\mathrm{Hom}(A, G(B))$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Left adjoints preserve colimits. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Yoneda embedding fully faithful. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Free-forgetful: free is left adjoint, forgetful is right. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Monads from adjunctions**: $F \dashv G$ gives a monad $T = G F$ on
$\mathcal C$. Conversely, every monad arises from some adjunction
(Eilenberg-Moore, Kleisli).

**Limits via colimits in $\mathcal C^{\mathrm{op}}$**: limits in
$\mathcal C$ = colimits in $\mathcal C^{\mathrm{op}}$. The same
machinery handles both.

**Kan extensions**: generalisation of limits/colimits to
"approximate-by-functor" constructions. *Every concept is a Kan
extension* (Mac Lane).

**$\infty$-categories**: the next level — categories where morphisms
have higher morphisms ad infinitum. Foundation of derived algebraic
geometry, motivic cohomology, condensed mathematics.

## Computational

```python
# Monoidal-style categorical examples in Python

# Product (limit) of two sets
def product(A, B):
    return [(a, b) for a in A for b in B]

# Coproduct (disjoint union)
def coproduct(A, B):
    return [("L", a) for a in A] + [("R", b) for b in B]

print(product([1, 2], ["a", "b"]))     # [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')]
print(coproduct([1, 2], ["a", "b"]))   # [('L', 1), ('L', 2), ('R', 'a'), ('R', 'b')]

# Yoneda demo: a "set" is determined by its functions in
# For S = {0, 1}, Hom(*, S) — for any singleton *, set of maps to S = S
# Generalises: Hom(-, S) determines S up to natural isomorphism

# Adjunction example: free-forgetful for Z-modules
# F : Set -> AbGroup sends S to free abelian group on S
# U : AbGroup -> Set forgets group structure
# Hom_Ab(F(S), A) = Hom_Set(S, U(A))

def free_abelian(S):
    # Element is finite formal Z-linear combination of S
    return f"Z^{len(S)}"

print(free_abelian([1, 2, 3]))           # Z^3
```

## Applied

- **Functional programming** — Haskell, Scala use monads, functors,
  applicatives directly. Adjunctions appear in foldr/foldl theorems.
- **Programming-language semantics** — natural transformations as
  semantic-equivalence proofs.
- **Database theory** — categorical foundations of databases (Spivak)
  using sketches.
- **Quantum computing** — categorical quantum mechanics (Coecke-
  Abramsky) uses symmetric monoidal categories with daggers.
- **Type theory and HoTT** — every type-theoretic concept has a
  categorical interpretation.

## Check Your Understanding

:::widget type=numeric-input prompt="Yoneda embedding fully faithful. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Right adjoint preserves limits. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Tensor-Hom adjunction in module categories. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Every monad comes from an adjunction. Type 1." answer=1 explain="Yes.":::
