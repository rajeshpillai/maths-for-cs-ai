---
strand: number-quantity
level: master
order: 6
title: Class Field Theory
prerequisites:
  - tier: strand-1-number-quantity-master
    slug: 05-bsd-conjecture
    description: BSD conjecture
connections:
  - strand-1-number-quantity-master/07-langlands-program
applications:
  - cs: "Algorithms for class numbers, Pell-equation solvers"
  - life: "The abelian extensions of a number field, classified"
---

# Class Field Theory

## Explain Like I Am 7

When you build new number worlds by adding things like $\sqrt{-5}$ to
the regular numbers, sometimes "factoring into primes" stops being
unique — the number $6$ can break apart in two different ways.
Class field theory is a giant card-catalogue that lists *exactly* which
extra worlds you can build "without scrambling the order" and how the
mismatch in factoring fits each one.  It tied together two seemingly
separate things — the way primes split and the symmetries of new
number fields — into one tidy library.

## Mental

For a number field $K$ (finite extension of $\mathbb{Q}$):

- The **ring of integers** $\mathcal O_K$.
- **Class group** $\mathrm{Cl}(K)$: ideals modulo principal ideals.
  Measures failure of unique factorisation.

**Class field theory (CFT)** classifies the **abelian extensions** of
$K$ in terms of subgroups of the **idele class group** of $K$ —
roughly, the class group together with local data at each prime.

## Hilbert class field

The **Hilbert class field** $H_K$ is the maximal *unramified abelian
extension* of $K$. CFT says:

$$
\mathrm{Gal}(H_K / K) \cong \mathrm{Cl}(K).
$$

So the class group of $K$ is exactly the Galois group of its Hilbert
class field. Two flavors of "what's hard about $K$" — finite group
viewpoints — match exactly.

## Worked example: $\mathbb{Q}(\sqrt{-5})$

$\mathcal O_K = \mathbb{Z}[\sqrt{-5}]$ is **not a UFD** (Strand 2
Advanced Lesson 02). Class group is $\mathbb{Z}/2$.

So the Hilbert class field has degree 2 over $\mathbb{Q}(\sqrt{-5})$.
Explicitly: $H = \mathbb{Q}(\sqrt{-5}, \sqrt{-1}) = \mathbb{Q}(i, \sqrt 5)$.

In $\mathcal O_H$, the previously non-unique factorisations of 6
become unique (extending into a larger ring).

## Reciprocity and Artin's theorem

Quadratic reciprocity (Strand 1 Advanced Lesson 06) is a baby case of
CFT. The **Artin reciprocity** generalises it to all abelian
extensions.

**Artin map**: for an abelian extension $L/K$ with $\mathrm{Gal}(L/K) = G$,
there's a surjection from idele class group of $K$ onto $G$ that
sends a prime $\mathfrak p$ to its **Frobenius element**.

This map controls the splitting behaviour of every prime in $L$.

## Interactive

:::widget type=numeric-input prompt="Class number of $\\mathbb{Q}(\\sqrt{-5})$: $|Cl| = ?$" answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="$\\mathrm{Gal}(H_K / K) \\cong \\mathrm{Cl}(K)$. Type 1." answer=1 explain="Yes — main theorem of CFT.":::

:::widget type=numeric-input prompt="Quadratic reciprocity is a baby case of CFT. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Class number of $\\mathbb{Q}$: $h(\\mathbb{Q}) = 1$ — UFD. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Local class field theory**: for a local field $K_v$ (like
$\mathbb{Q}_p$), abelian extensions are classified by subgroups of
the multiplicative group $K_v^*$. Local Artin map.

**Global class field theory**: assemble local information using the
adele ring $\mathbb{A}_K = \prod' K_v$ and idele class group
$C_K = \mathbb{A}_K^* / K^*$.

**Hilbert symbols and norm-residue symbols** package reciprocity
algebraically.

**Computational class field theory**: explicitly construct $H_K$ and
the Artin map via lattice algorithms (PARI's `bnfinit`, `bnrclassfield`).

## Computational

```python
# Compute class numbers via brute force for tiny imaginary quadratic fields
from math import isqrt

def class_number_imag_quad(D):
    """Class number h(Q(sqrt(-D))) for D > 0 by Minkowski bound enumeration."""
    if D in (1, 2, 3, 7, 11, 19, 43, 67, 163):
        return 1   # Heegner numbers (Gauss conjecture, Stark proof)
    # General computation requires reduced binary quadratic forms
    # h(Q(sqrt(-D))) = number of equivalence classes of primitive reduced
    # binary quadratic forms of discriminant -D (or -4D)
    # Skipped here; for educational purposes use lookup table or PARI

heegner_class_one = [1, 2, 3, 7, 11, 19, 43, 67, 163]
print(heegner_class_one)

# Class numbers for first few D
known_h = {
    1: 1, 2: 1, 3: 1, 5: 2, 6: 2, 7: 1, 10: 2, 11: 1,
    13: 2, 14: 4, 15: 2, 17: 4, 19: 1, 21: 4, 22: 2, 23: 3,
}
print(known_h)
# In Sage:
# K = QuadraticField(-5)
# K.class_number()      # 2
# K.hilbert_class_field('a')  # explicit field

# Compute Hilbert class polynomial for K = Q(sqrt(-5))
# H_K = Q(sqrt(-5), sqrt(-1)) — but in general needs PARI/Sage
```

## Applied

- **Cryptographic curve construction** — CM curves (with given
  endomorphism ring) constructed via Hilbert class polynomial roots.
- **Pell equation algorithms** — class group computations bound the
  size of fundamental solutions.
- **Algorithmic number theory** — Buchmann's subexponential algorithm
  for class group / regulator (1990s).
- **Post-quantum crypto** — class group action on isogeny graphs
  (CSIDH, OSIDH).
- **Mathematical physics** — Hilbert class fields appear in arithmetic
  geometry of Calabi-Yau manifolds.

## Check Your Understanding

:::widget type=numeric-input prompt="Class group measures failure of UFD-ness. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hilbert class field $H_K$: maximal unramified abelian extension. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathrm{Gal}(H_K/K) \\cong \\mathrm{Cl}(K)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathbb{Q}(\\sqrt{-1}), \\mathbb{Q}(\\sqrt{-3})$ — UFDs (class number 1). Type 1." answer=1 explain="Yes.":::
