---
strand: number-quantity
level: advanced
order: 4
title: Algebraic and Transcendental Numbers
prerequisites:
  - tier: strand-1-number-quantity-intermediate
    slug: 07-surds-and-exact-arithmetic
    description: Surds (an example of algebraic)
connections:
  - strand-1-number-quantity-advanced/05-constructibility
applications:
  - cs: "Computer-algebra systems' representation of numbers"
  - life: "Why $\\pi$ and $e$ are 'special' irrationals"
---

# Algebraic and Transcendental Numbers

## Mental

The real numbers split into two big classes (and several smaller
sub-classes):

- **Rational** $\mathbb{Q}$: $\frac{p}{q}$ with $p, q$ integers, $q
  \ne 0$.
- **Irrational**: not rational. Examples: $\sqrt{2}, \pi, e$.

But the irrationals split further:

- **Algebraic numbers**: roots of polynomials with integer
  coefficients. $\sqrt{2}$ is algebraic (root of $x^2 - 2 = 0$);
  $\sqrt[3]{5}$ (root of $x^3 - 5$); even $\sqrt{2 + \sqrt{3}}$
  (some quartic).
- **Transcendental numbers**: not algebraic. $\pi$ and $e$ are the
  famous examples — proven transcendental in 1882 (Lindemann) and
  1873 (Hermite) respectively.

A **stunning fact** (Cantor, 1874): the algebraic numbers are
**countable** (you can list them in a sequence indexed by $\mathbb{N}$),
but the reals are **uncountable**. Therefore "**almost all** real
numbers are transcendental" — even though the named ones are rare
and hard to identify.

This is the deepest result in elementary number theory: most numbers
you can describe by name (with a finite formula) are algebraic; the
**rest** of the real line — which dwarfs the algebraic numbers —
consists of objects we mostly cannot identify.

## A nesting of number systems

$$
\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{A} \subset \mathbb{R} \subset \mathbb{C}
$$

where $\mathbb{A}$ is the **algebraic numbers**. Each containment is
strict — there are reals not algebraic, complex not real, etc.

The complexes split similarly: complex algebraic vs complex
transcendental.

## Interactive

:::widget type=numeric-input prompt="$\\sqrt 5$ is the root of $x^2 - 5$. Algebraic? Type 1 yes, 0 no." answer=1 explain="Yes — root of an integer polynomial.":::

:::widget type=numeric-input prompt="$\\pi$ is transcendental — Lindemann 1882. Means it's NOT a root of any integer polynomial. Type 1 if it's algebraic, 0 if transcendental." answer=0 explain="Transcendental.":::

:::widget type=numeric-input prompt="The golden ratio $\\varphi = (1 + \\sqrt 5)/2$. Root of $x^2 - x - 1$. Algebraic? Type 1 or 0." answer=1 explain="Algebraic.":::

:::widget type=numeric-input prompt="Cantor: the algebraic numbers are countable. The reals are uncountable. So 'almost all' reals are transcendental, even though we know few specific examples by name. The cardinality of the algebraics is..." answer=0 explain="Aleph-zero ($\\aleph_0$). Type 0 to indicate 'countable' / 'aleph-zero'.":::

## Symbolic

A real (or complex) number $x$ is **algebraic of degree $n$** if it's
a root of a polynomial of degree $n$ with integer coefficients,
and not a root of any lower-degree such polynomial.

- $\sqrt 2$: algebraic of degree 2.
- $\sqrt[3]{5}$: algebraic of degree 3.
- $\varphi$: algebraic of degree 2.
- Cube roots of unity (other than 1): algebraic of degree 2.

Famous transcendental constants:

- $\pi$ (Lindemann, 1882). Consequence: **squaring the circle** is
  impossible — see Lesson 05.
- $e$ (Hermite, 1873).
- $e^\pi$ (Gelfond, 1929 — via the **Gelfond-Schneider theorem**).
- $\log 2$ in any natural log base.
- Champernowne's constant $0.123456789101112\ldots$ (Mahler).

We **don't** know whether $\pi + e$ is irrational. Open problem.

## Computational

```python
import sympy as sp

x = sp.symbols("x")

# sqrt(2) — algebraic, root of x^2 - 2
print(sp.minimal_polynomial(sp.sqrt(2), x))   # x^2 - 2

# Golden ratio
print(sp.minimal_polynomial((1 + sp.sqrt(5)) / 2, x))   # x^2 - x - 1

# pi — sympy returns None or raises; not algebraic
try:
    print(sp.minimal_polynomial(sp.pi, x))
except Exception as e:
    print(f"pi is transcendental — no minimal polynomial: {e}")
```

## Derivational

*Why* are algebraic numbers countable?

Polynomials with integer coefficients are themselves countable: each
is a finite tuple of integers. Each polynomial has finitely many
roots. Union of countably many finite sets is still countable.

Algebraic numbers ⊆ this union, so countable.

But $\mathbb{R}$ is uncountable (Cantor's diagonal argument — Strand
8 Foundation Lesson 07 develops this). So real numbers minus the
algebraic numbers must be uncountable — there are **vastly more**
transcendentals than algebraics.

## Applied

- **Computer-algebra systems**: SymPy, Mathematica represent
  algebraic numbers symbolically (as roots of their minimal
  polynomials). Transcendentals are represented as named constants
  ($\pi, e$) or as approximations.
- **Constructibility** (Lesson 05): every constructible number is
  algebraic of degree $2^n$. Transcendentals like $\pi$ are
  unconstructible — proving the impossibility of squaring the
  circle.
- **Liouville's theorem**: irrational algebraic numbers are
  **poorly approximable** by rationals — quantitatively, with
  error bounds. This led to Liouville's 1844 construction of the
  first explicit transcendental number.

## Check Your Understanding

:::widget type=numeric-input prompt="Is $1.41421356\\ldots$ algebraic if it equals $\\sqrt 2$? Type 1 yes, 0 no." answer=1 explain="Yes — $\\sqrt 2$ is algebraic of degree 2.":::

:::widget type=numeric-input prompt="Cantor: algebraic numbers are countable, reals uncountable. 'Most' reals are therefore transcendental. Type 1 if true, 0 if false." answer=1 explain="True — almost all reals are transcendental.":::

:::widget type=numeric-input prompt="$e^{i\\pi} + 1 = 0$ (Euler's identity). The number $e^{i\\pi} = -1$, which is rational. Does that contradict $e$ and $\\pi$ being transcendental? Type 1 yes, 0 no." answer=0 explain="No. Transcendence of $e$ and $\\pi$ doesn't preclude algebraic combinations evaluating to algebraic numbers.":::

:::widget type=numeric-input prompt="Liouville (1844) constructed the first explicit transcendental: $\\sum 10^{-k!}$. The first few digits: $0.110001000\\ldots000\\ldots$. The 1's appear at positions $1, 2, 6, 24, 120, \\ldots$ — the factorials. How many decimal places between the 1 at position $4! = 24$ and the next 1 at position $5! = 120$?" answer=95 explain="$120 - 24 - 1 = 95$ zeros between them.":::
