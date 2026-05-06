---
strand: number-quantity
level: research
order: 4
title: Geometric Langlands — A Glimpse
prerequisites:
  - tier: strand-1-number-quantity-research
    slug: 03-perfectoid-spaces
    description: Perfectoid spaces
connections:
  - strand-1-number-quantity-research/05-motives
applications:
  - cs: "Cryptographic primitives based on function fields, Drinfeld modules"
  - life: "Langlands over function fields, geometrically"
---

# Geometric Langlands — A Glimpse

## Explain Like I Am 7

Earlier we glimpsed the Langlands program — the giant matching game
between *number sculptures* and *musical scores*.  Now imagine
re-staging the whole game, but instead of regular numbers in your
sculptures you use *curved geometric shapes* like loops and surfaces.
The matchings on this geometric stage are easier to draw and even
animate, and many pairs that would take a lifetime to verify with
plain numbers can be confirmed almost picture-by-picture here.  This
"geometry-flavoured" version is where many of the program's biggest
recent victories have come from.

## Mental

Replace number field $\mathbb Q$ with **function field** $\mathbb F_q(C)$
of an algebraic curve $C$ over $\mathbb F_q$. Many number-theoretic
constructions become *geometric*:

- **Galois reps** ↔ representations of $\pi_1^{\rm \acute et}(C)$.
- **Automorphic reps** ↔ functions on $\mathrm{Bun}_G(C)$ (moduli
  of $G$-bundles on $C$).
- **L-functions** ↔ trace functions in $\ell$-adic cohomology.

## Drinfeld and Lafforgue

**Drinfeld** (Fields medal 1990): proved Langlands for $\mathrm{GL}_2$
over function fields using **Drinfeld shtukas**.

**Lafforgue** (Fields medal 2002): extended to $\mathrm{GL}_n$ for
all $n$ over function fields.

Function-field Langlands is **proven** in much greater generality than
the number-field case.

## Geometric Langlands

Beilinson-Drinfeld and others reformulate as a categorical duality:

$$
D^b(\mathrm{Bun}_G) \cong \text{categorical "dual" with } \check G \text{-data}.
$$

A statement about *categories of D-modules / sheaves* on moduli
spaces, related to physics (Kapustin-Witten gauge theory).

## Worked example: GL_1 case

$\mathrm{GL}_1$ Langlands over function field is **class field theory
for function fields** (Artin-Tate). Both sides:

- Galois: characters of abelianised $\pi_1$.
- Automorphic: characters of idele class group.

**Bijection** is the function-field Artin map, fully analogous to
number-field CFT.

## Interactive

:::widget type=numeric-input prompt="Function-field Langlands for $\\mathrm{GL}_n$ proven by Drinfeld + Lafforgue. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathrm{Bun}_G(C)$ = moduli of $G$-bundles on curve $C$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Drinfeld Fields medal 1990. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Function-field CFT = $\\mathrm{GL}_1$ Langlands. Type 1." answer=1 explain="Yes.":::

## Symbolic

**$\ell$-adic sheaves**: cohomology with $\mathbb Q_\ell$ coefficients
($\ell \ne p$); the right cohomology theory for arithmetic-geometric
cycles in characteristic $p$.

**Hecke eigensheaves**: geometric analogue of Hecke eigenforms;
realising Galois reps as eigensheaves on $\mathrm{Bun}_G$.

**Beilinson-Drinfeld grassmannian**: an algebraic version of affine
Grassmannian; central to geometric Langlands.

**Quantum geometric Langlands**: $q$-deformation; conjectural relation
to Kapustin-Witten gauge theory.

## Computational

```python
# Geometric Langlands is research-level abstract; concrete computation
# focuses on small examples like elliptic curves over F_q

# E : y^2 = x^3 + ax + b over F_q
P = 7
A, B = 2, 1

def is_on_E(x, y, p=P, a=A, b=B):
    return (y*y - x**3 - a*x - b) % p == 0

# Compute |E(F_q)|
N = sum(1 for x in range(P) for y in range(P) if is_on_E(x, y)) + 1
print(f"|E(F_{P})| = {N}")
print(f"a_p = p + 1 - N = {P + 1 - N}")

# In Langlands terms:
# - Galois side: Frobenius acts on Tate module T_l(E)
# - Automorphic side: corresponding Hecke eigenform
# - L-function: ∏ (1 - a_p t + p t^2)^-1 over primes p

# For function fields: replace primes with closed points of curve
# Lafforgue's Theorem: this matching extends to GL_n over function fields
```

## Applied

- **Number theory** — Langlands philosophy organises modern
  arithmetic.
- **Mathematical physics** — gauge-theoretic interpretations
  (Kapustin-Witten, geometric Langlands as 4d topological field
  theory).
- **Function-field cryptography** — Drinfeld modules and Anderson
  $t$-modules give crypto over function fields.
- **Mirror symmetry** — geometric Langlands is closely related.

## Check Your Understanding

:::widget type=numeric-input prompt="Drinfeld + Lafforgue: function-field Langlands for $\\mathrm{GL}_n$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Geometric Langlands: categorical statement on $\\mathrm{Bun}_G$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hecke eigensheaves are geometric analogues of Hecke eigenforms. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Kapustin-Witten relates GL to gauge theory. Type 1." answer=1 explain="Yes.":::
