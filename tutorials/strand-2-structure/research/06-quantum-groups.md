---
strand: structure
level: research
order: 6
title: Quantum Groups
prerequisites:
  - tier: strand-2-structure-research
    slug: 05-tannakian-formalism
    description: Tannakian formalism
connections:
  - strand-2-structure-research/07-perverse-sheaves
applications:
  - cs: "Quantum invariants of knots, integrable systems"
  - life: "$q$-deformations of Lie groups"
---

# Quantum Groups

## Mental

A **quantum group** $U_q(\mathfrak g)$ is a $q$-deformation of the
universal enveloping algebra $U(\mathfrak g)$ of a semisimple Lie
algebra. Introduced by Drinfeld and Jimbo (~1985).

At $q = 1$: classical $U(\mathfrak g)$.
At $q$ generic: a non-commutative non-cocommutative Hopf algebra.

The deformation parameter $q$ may be a formal symbol or a complex
number.

## Hopf algebra structure

$U_q(\mathfrak g)$ has:

- **Multiplication** $\cdot$.
- **Comultiplication** $\Delta : U_q \to U_q \otimes U_q$.
- **Antipode** $S$.
- **Unit, counit**.

Plus a "**universal R-matrix**" $R \in U_q \otimes U_q$ encoding
braiding.

## Reps and braiding

Representations of $U_q(\mathfrak g)$ form a **braided monoidal
category** — tensor product non-commutative but with braiding
$c_{V, W} : V \otimes W \to W \otimes V$ satisfying Yang-Baxter
equation:

$$
c_{23} c_{13} c_{12} = c_{12} c_{13} c_{23}.
$$

The braiding gives **Reshetikhin-Turaev invariants** of knots /
3-manifolds — including the Jones polynomial.

## Worked example: $U_q(\mathfrak{sl}_2)$

Generators $E, F, K, K^{-1}$ with relations:

- $K E K^{-1} = q^2 E$.
- $K F K^{-1} = q^{-2} F$.
- $[E, F] = (K - K^{-1})/(q - q^{-1})$.

At $q \to 1$ (with appropriate scaling): becomes classical
$\mathfrak{sl}_2$ commutation relations.

## Interactive

:::widget type=numeric-input prompt="Quantum group $U_q(\\mathfrak g)$ deforms $U(\\mathfrak g)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Drinfeld + Jimbo introduced ~1985. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Yang-Baxter equation: braiding consistency. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Reshetikhin-Turaev invariants from quantum-group reps. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Roots of unity**: when $q = e^{2\pi i / N}$, things specialise:
fewer irreps, modular tensor categories of finite type. Foundation
of **Witten-Reshetikhin-Turaev (WRT) invariants** for 3-manifolds.

**Crystals** (Kashiwara): $q \to 0$ limit; combinatorial structure
encoding rep theory via crystal graphs.

**Lusztig's canonical basis**: positivity / integrality structure
of quantum group reps. Connects to total positivity and cluster
algebras.

**$q$-deformations of classical objects**: $q$-binomials, $q$-series,
$q$-zeta values — pervade $q$-analytic combinatorics.

## Computational

```python
import sympy as sp

# Quantum integer [n]_q = (q^n - q^-n) / (q - q^-1)
def quantum_int(n, q=sp.Symbol("q")):
    return (q**n - q**(-n)) / (q - q**(-1))

q = sp.Symbol("q")
for n in range(5):
    print(f"[{n}]_q = {sp.simplify(quantum_int(n, q))}")
# At q = 1: equals n
print("At q → 1:", sp.limit(quantum_int(3), q, 1))   # 3

# Quantum factorials and binomials
def quantum_factorial(n, q=q):
    result = 1
    for k in range(1, n + 1):
        result *= quantum_int(k, q)
    return sp.simplify(result)

def quantum_binomial(n, k, q=q):
    return sp.simplify(
        quantum_factorial(n, q) / (quantum_factorial(k, q) * quantum_factorial(n - k, q))
    )

print(f"[5 choose 2]_q = {quantum_binomial(5, 2)}")   # = q-deformed C(5,2)

# At q = 1: classical binomial
print("At q = 1:", sp.limit(quantum_binomial(5, 2), q, 1))   # 10
```

## Applied

- **Knot polynomials** — Jones, HOMFLY, Kauffman polynomials from
  quantum groups.
- **3-manifold invariants** — WRT invariants via roots of unity.
- **Statistical mechanics** — solvable lattice models (6-vertex,
  XXZ) governed by quantum-group structure.
- **String theory and M-theory** — Verlinde algebras = WZW model
  fusion rings = quantum-group quotients.
- **Topological-quantum computing** — anyon systems modelled by
  modular tensor categories from quantum groups.

## Check Your Understanding

:::widget type=numeric-input prompt="$U_q(\\mathfrak g)$ deforms $U(\\mathfrak g)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Yang-Baxter equation governs braiding. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Jones polynomial from quantum $\\mathrm{SL}_2$ at root of unity. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$[n]_q \\to n$ as $q \\to 1$. Type 1." answer=1 explain="Yes.":::
