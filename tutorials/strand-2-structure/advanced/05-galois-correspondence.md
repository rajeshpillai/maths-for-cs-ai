---
strand: structure
level: advanced
order: 5
title: The Galois Correspondence
prerequisites:
  - tier: strand-2-structure-advanced
    slug: 04-galois-groups
    description: Galois groups
connections:
  - strand-2-structure-advanced/06-solvability-by-radicals
applications:
  - cs: "Symbolic computation: when does an equation have a closed form?"
  - life: "Group-theory analysis of polynomial extensions"
---

# The Galois Correspondence

## Explain Like I Am 7

Picture a tall apartment building (the splitting field) with the
ground floor (your starting field) at the bottom.  Each floor in the
middle is a smaller playroom — and Galois noticed something stunning:
*every* floor is paired with a sub-kit of marble-swapping moves, and
*every* sub-kit is paired with a floor.  Move up the building, the
sub-kit shrinks; move down, it grows.  This perfect upside-down
pairing turns hard "which floor exists?" questions into easy
"which sub-kit exists?" questions, and is one of the most beautiful
bridges in mathematics.

## Mental

For a Galois extension $K/F$ with group $G = \mathrm{Gal}(K/F)$,
there is a **bijection**:

$$
\begin{aligned}
\{\text{intermediate fields } F \subseteq L \subseteq K\} &\longleftrightarrow \{\text{subgroups of } G\} \\
L &\longmapsto \mathrm{Gal}(K/L) \\
K^H &\longleftarrow H
\end{aligned}
$$

where $K^H = \{x \in K : \sigma(x) = x \;\forall \sigma \in H\}$ is
the **fixed field**.

This is **the** central theorem — Galois theory was invented for it.

## Properties of the correspondence

- **Inclusion-reversing**: $L_1 \subseteq L_2 \Leftrightarrow H_1 \supseteq H_2$.
- **Index = degree**: $[L : F] = [G : H]$ and $[K : L] = |H|$.
- **Normal subgroups ↔ Galois subextensions**:
  $L/F$ is Galois iff $H = \mathrm{Gal}(K/L)$ is *normal* in $G$,
  in which case $\mathrm{Gal}(L/F) \cong G/H$.

## Worked example: $\mathrm{Gal}(\mathbb{Q}(\sqrt 2, \sqrt 3)/\mathbb{Q})$

$G = $ Klein four = $\{e, \sigma_2, \sigma_3, \sigma_2 \sigma_3\}$
where $\sigma_2 : \sqrt 2 \mapsto -\sqrt 2$ (fixes $\sqrt 3$), and
$\sigma_3$ does the analogous to $\sqrt 3$.

Subgroups of $V_4$: trivial $\{e\}$, three of order 2
$\{\langle \sigma_2 \rangle, \langle \sigma_3 \rangle, \langle \sigma_2 \sigma_3 \rangle\}$,
and $V_4$ itself — **5 subgroups**.

Five corresponding subfields:

| Subgroup | Fixed field |
|---|---|
| $\{e\}$ | $\mathbb{Q}(\sqrt 2, \sqrt 3)$ |
| $\langle \sigma_2 \sigma_3 \rangle$ | $\mathbb{Q}(\sqrt 6)$ |
| $\langle \sigma_3 \rangle$ | $\mathbb{Q}(\sqrt 2)$ |
| $\langle \sigma_2 \rangle$ | $\mathbb{Q}(\sqrt 3)$ |
| $V_4$ | $\mathbb{Q}$ |

Each subfield has degree $[G : H]$ over $\mathbb{Q}$.

## Interactive

:::widget type=numeric-input prompt="The Galois correspondence is inclusion-reversing. Larger field $\\Leftrightarrow$ smaller subgroup. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathrm{Gal}(\\mathbb{Q}(\\sqrt 2, \\sqrt 3)/\\mathbb{Q}) \\cong V_4$. How many intermediate subfields (including $\\mathbb{Q}$ and $K$ itself)?" answer=5 explain="$5$ — corresponding to 5 subgroups of $V_4$.":::

:::widget type=numeric-input prompt="Subextension $L/F$ is Galois iff corresponding subgroup is normal in $G$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$|H| \\cdot [L : F] = |G|$. Type 1." answer=1 explain="Yes — orbit-stabilizer style.":::

## Symbolic

**Fundamental theorem of Galois theory**:

For a finite Galois extension $K/F$:

1. The map $L \mapsto \mathrm{Gal}(K/L)$ is a bijection between
   intermediate fields $F \subseteq L \subseteq K$ and subgroups
   $H \le G = \mathrm{Gal}(K/F)$.
2. This bijection is inclusion-reversing.
3. $[K : L] = |H|$ and $[L : F] = [G : H]$.
4. $L/F$ is Galois iff $H$ is normal in $G$, and then
   $\mathrm{Gal}(L/F) \cong G/H$.

**Profinite Galois groups**: for infinite extensions
(like $\bar{\mathbb{Q}}/\mathbb{Q}$), the correspondence works
with **profinite** topology on the Galois group and *closed* subgroups.

## Computational

```python
import sympy as sp

x = sp.symbols("x")

# x^4 - 10x^2 + 1: minimal polynomial of sqrt 2 + sqrt 3 over Q
print(sp.minimal_polynomial(sp.sqrt(2) + sp.sqrt(3), x))   # x^4 - 10x^2 + 1

# Verify (sqrt 2 + sqrt 3)^2 = 5 + 2 sqrt 6 — links V_4 corresp
expr = (sp.sqrt(2) + sp.sqrt(3))**2
print(sp.expand(expr))                                      # 5 + 2*sqrt(6)

# Galois conjugates: ±sqrt 2 ± sqrt 3 — four of them
roots = sp.solve(x**4 - 10*x**2 + 1, x)
print(roots)                                                # the 4 conjugates

# Subgroup ↔ subfield demo: Q(sqrt 2) is the fixed field of <sigma_3>
# (sigma_3 fixes sqrt 2 and flips sqrt 3)
```

## Applied

- **Galois descent** in algebraic geometry — understand structures
  over $F$ via their behaviour over $K$ with $\mathrm{Gal}(K/F)$
  action.
- **Inverse Galois realization** — number-theoretic projects design
  extensions of $\mathbb{Q}$ realizing specified groups.
- **Quantum groups and Hopf algebras** — generalised Galois
  correspondences over rings.
- **Algebraic computation of integrals** — symbolic integration uses
  Galois-theoretic methods to determine when an antiderivative is
  expressible in elementary terms (Liouville's theorem).

## Check Your Understanding

:::widget type=numeric-input prompt="Larger field $\\Leftrightarrow$ smaller fixing subgroup. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathrm{Gal}(\\mathbb{Q}(\\sqrt 2, \\sqrt 3)/\\mathbb{Q}) \\cong V_4$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Sub-extension $L/F$ Galois $\\Leftrightarrow$ subgroup normal. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Profinite Galois groups handle infinite extensions. Type 1." answer=1 explain="Yes.":::
