---
strand: number-quantity
level: advanced
order: 5
title: Constructibility — Compass and Straightedge
prerequisites:
  - tier: strand-1-number-quantity-advanced
    slug: 04-algebraic-and-transcendental
    description: Algebraic numbers
connections:
  - strand-3-shape-space-foundation/06-circles-and-pi
applications:
  - cs: "Geometric algorithms; CAD primitives"
  - life: "Why some classical Greek constructions are impossible"
---

# Constructibility — Compass and Straightedge

## Mental

The ancient Greeks asked: which points in the plane can be
**constructed** using only an unmarked straightedge and a compass,
starting from two points?

The answer turns out to involve algebraic structure deeply.

**Constructible operations**: starting from given points,

1. Draw a straight line through any two existing points.
2. Draw a circle centred on an existing point through another.
3. Mark new points at intersections.

Repeat these rules. A real number $r$ is **constructible** if you
can construct two points exactly $r$ apart.

The constructible numbers form a **field** — closed under $+, -, \times,
\div$. They also include $\sqrt{r}$ for any positive constructible
$r$ (via the geometric mean construction). So the constructible
numbers form a tower of square-root extensions of $\mathbb{Q}$.

**Theorem** (Wantzel, 1837): $r$ is constructible iff $r$ is
algebraic with **degree a power of 2** over $\mathbb{Q}$.

This single theorem settles three classical problems that stumped the
Greeks for $2000$ years.

## The three impossibilities

**1. Squaring the circle** (constructing a square with the same area
as a given circle): would need $\sqrt{\pi}$, but $\pi$ is
**transcendental** (Lindemann, 1882). Not algebraic at all → not
constructible. **Impossible.**

**2. Doubling the cube** (Delian problem; constructing a cube with
twice a given cube's volume): would need $\sqrt[3]{2}$. This is
algebraic of degree $3$ — **not** a power of 2. **Impossible.**

**3. Trisecting an arbitrary angle**: equivalent to constructing
$\cos(\theta / 3)$ given $\cos\theta$. The minimal polynomial relating
the two has degree $3$ generically. **Impossible** for general angles
(though specific angles like $90°$ trisect easily).

These three impossibilities took **2000+ years** to resolve, and
required the development of group theory and field theory.

## Interactive

:::widget type=numeric-input prompt="$\\sqrt 2$ is constructible (degree 2 over Q). Is $\\sqrt 3$ also constructible?" answer=1 explain="Yes — also degree 2.":::

:::widget type=numeric-input prompt="$\\sqrt[3]{2}$ has degree 3 over Q. Constructible? (1 yes, 0 no.)" answer=0 explain="No — not a power of 2.":::

:::widget type=numeric-input prompt="$\\sqrt[4]{2}$ has degree 4 = $2^2$ over Q. Constructible?" answer=1 explain="Yes — $\\sqrt{\\sqrt 2}$ is two square-root extensions stacked.":::

:::widget type=numeric-input prompt="A regular polygon with $n$ sides is constructible iff $n = 2^k \\cdot p_1 p_2 \\cdots$ where $p_i$ are distinct **Fermat primes** ($3, 5, 17, 257, 65537$). Is the regular 7-gon constructible?" answer=0 explain="No — $7$ is not a Fermat prime. Gauss proved this in 1796 (and famously asked for it on his tombstone).":::

## Symbolic

The **constructible numbers** $\mathcal{C}$ form a subfield of
$\mathbb{R}$ closed under $+, -, \times, \div$, and **square roots**.

**Wantzel's theorem**: $r \in \mathcal{C}$ iff $r$ is algebraic over
$\mathbb{Q}$ with $[\mathbb{Q}(r) : \mathbb{Q}]$ a power of 2.

The **regular $n$-gon** is constructible iff
$\phi(n)$ is a power of 2, equivalently $n = 2^k p_1 p_2 \cdots p_m$
with distinct **Fermat primes** $p_i = 2^{2^j} + 1$.

The known Fermat primes are $3, 5, 17, 257, 65537$. (No more are
known.)

So constructible regular polygons include $3, 4, 5, 6, 8, 10, 12,
15, 16, 17$-gons. The famous Gauss construction of the $17$-gon
(1796) shocked his contemporaries.

## Computational

We can check constructibility by computing the **minimal polynomial**
and checking its degree:

```python
import sympy as sp

x = sp.symbols("x")

def constructibility_check(num):
    poly = sp.minimal_polynomial(num, x)
    deg = sp.degree(poly, x)
    print(f"  minimal polynomial: {poly}, degree {deg}")
    is_pow2 = (deg & (deg - 1)) == 0
    print(f"  power of 2? {is_pow2} → {'CONSTRUCTIBLE' if is_pow2 else 'NOT CONSTRUCTIBLE'}")

print("sqrt(2):")
constructibility_check(sp.sqrt(2))     # degree 2 ✓

print("\ncbrt(2):")
constructibility_check(sp.cbrt(2))     # degree 3 ✗

print("\nsqrt(2) + sqrt(3):")
constructibility_check(sp.sqrt(2) + sp.sqrt(3))   # degree 4 ✓
```

## Applied

- **GeoGebra and CAD**: every classical compass-straightedge
  construction can be encoded as constructible-number computation.
  Modern CAD also includes parabolas/conics, allowing quintic
  constructions.
- **Origami constructions** are *more* powerful: they can solve
  arbitrary cubic equations, so $\sqrt[3]{2}$ **is** origami-
  constructible.

## Check Your Understanding

:::widget type=numeric-input prompt="Regular $n$-gon constructible: $n = ?$ for the smallest $n > 17$ where the answer is yes." answer=20 explain="$20 = 4 \\cdot 5 = 2^2 \\cdot 5$. Both $5$ and $2$ qualify. So the regular 20-gon is constructible.":::

:::widget type=numeric-input prompt="Is the regular 9-gon constructible? Type 1 yes, 0 no." answer=0 explain="$9 = 3^2$ — repeated Fermat prime. Not allowed.":::

:::widget type=numeric-input prompt="Trisecting any angle is impossible by compass-straightedge. Trisecting some specific angles (like $90°$) is possible. Type the trisection of $90°$ in degrees." answer=30 explain="$30°$ is itself constructible (as $60°$'s half).":::

:::widget type=numeric-input prompt="The transcendental $\\pi$ has degree... what over Q? (Type 0 if 'undefined / not algebraic'.)" answer=0 explain="Not algebraic — degree is undefined.":::
