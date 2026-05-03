---
strand: number-quantity
level: master
order: 9
title: Capstone — Number Theory at the Frontier
prerequisites:
  - tier: strand-1-number-quantity-master
    slug: 08-additive-combinatorics
    description: Additive combinatorics
connections:
  - strand-1-number-quantity-advanced/09-number-theory-capstone
  - strand-2-structure-master/09-structure-master-capstone
applications:
  - cs: "Modern crypto, quantum-resistant primitives, AI-assisted math"
  - life: "Where number theory has gone since 2000"
---

# Capstone — Number Theory at the Frontier

## Mental

Nine lessons on:

- **Riemann zeta function** (Lesson 00).
- **Prime number theorem** (Lesson 01).
- **Dirichlet L-functions** (Lesson 02).
- **Modular forms** (Lesson 03).
- **Arithmetic of elliptic curves** (Lesson 04).
- **BSD conjecture** (Lesson 05).
- **Class field theory** (Lesson 06).
- **Langlands program** (Lesson 07).
- **Additive combinatorics** (Lesson 08).

You can now read graduate-level analytic and algebraic number theory.
Three integrated walkthroughs.

## Walkthrough 1: Wiles's proof of Fermat's Last Theorem

**Theorem** (1995, Wiles + Taylor-Wiles): $x^n + y^n = z^n$ has no
positive integer solutions for $n \ge 3$.

Proof structure:

1. **Frey curve**: a hypothetical solution $(a, b, c)$ to FLT yields
   an elliptic curve $E_{a, b, c}$ with strange properties.
2. **Ribet's theorem** (1986): if $E_{a, b, c}$ is *modular*, it would
   correspond to a modular form of weight 2 and level 2 — but no such
   forms exist.
3. **Wiles's modularity** (Lesson 03): every semi-stable elliptic
   curve over $\mathbb{Q}$ is modular.
4. **Combine**: solution to FLT yields a semi-stable curve, which is
   modular by Wiles, contradicting Ribet.

So no solutions exist.

The chain $\text{number theory} \to \text{elliptic curves} \to \text{modular forms} \to \text{Galois reps} \to \text{contradiction}$
is a textbook example of **Langlands philosophy in action**.

## Walkthrough 2: post-quantum cryptography from class field theory

Several leading post-quantum schemes leverage advanced number theory:

- **Lattice-based** (Kyber, Dilithium): ideal lattices in cyclotomic
  rings $\mathbb{Z}[\zeta_n]$. Security tied to hardness of
  Ring-LWE on lattices over algebraic number fields.
- **Isogeny-based** (CSIDH): commutative class group action on
  supersingular elliptic curves. Security relies on the
  difficulty of computing isogeny paths.
- **Code-based** (Classic McEliece): error-correcting codes constructed
  via Goppa codes — algebraic-geometry codes from divisors on
  curves over finite fields.

The number-theoretic depth here is *much* greater than RSA / ECDSA;
post-quantum security is fundamentally an algebraic-number-theory
problem.

## Walkthrough 3: AI-assisted mathematics today

In 2024-2025, automated theorem provers (Lean's `mathlib`, Coq,
Isabelle) have:

- Formalised Wiles's proof of FLT in part.
- Verified numerically every $\zeta$-zero up to $10^{13}$.
- Catalogued over 100,000 elliptic curves with their L-functions
  and BSD-related invariants (LMFDB).
- DeepMind's **AlphaProof** (2024) solved 4 of 6 IMO problems —
  including a number-theory problem on Diophantine equations.

The frontier of number theory is increasingly *computational*:
explicit verification, formalised proofs, AI-assisted exploration of
deep conjectures.

## Roadmap

**Strand 1 Research-adjacent** picks up:

- $p$-adic Hodge theory and Fontaine-Mazur conjecture.
- Iwasawa theory and main conjectures.
- Anabelian geometry (Mochizuki).
- $\infty$-categorical perfectoid spaces (Scholze).
- Geometric Langlands beyond curves.

## Closing

Modern number theory is the deepest branch of mathematics — and
increasingly the most computationally relevant. From RSA to lattice
crypto, from AlphaProof to FLT, the same set of techniques powers
both abstract conjectures and the security of digital communication.

The strand began with counting and ends at the frontier of human
knowledge. The boundary is moving — and increasingly being moved by
hybrid human-AI collaboration.

## Interactive

:::widget type=numeric-input prompt="Wiles's modularity proves FLT via Frey curve + Ribet. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Post-quantum lattice schemes use ideal lattices in cyclotomic rings. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="LMFDB catalogues elliptic curves and L-functions. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="AlphaProof (2024) solved IMO number-theory problems. Type 1." answer=1 explain="Yes.":::

## Check Your Understanding

:::widget type=numeric-input prompt="$\\zeta(2) = \\pi^2/6$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Mazur torsion: 15 possible torsion groups. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Green-Tao: primes have arbitrarily long APs. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="BSD: rank = order of vanishing of $L(s, E)$. Type 1." answer=1 explain="Yes.":::
