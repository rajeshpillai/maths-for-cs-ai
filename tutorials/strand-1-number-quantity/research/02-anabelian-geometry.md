---
strand: number-quantity
level: research
order: 2
title: Anabelian Geometry
prerequisites:
  - tier: strand-1-number-quantity-research
    slug: 01-iwasawa-theory
    description: Iwasawa theory
connections:
  - strand-1-number-quantity-research/03-perfectoid-spaces
applications:
  - cs: "Foundational research on number theory of curves"
  - life: "When the étale fundamental group determines the variety"
---

# Anabelian Geometry

## Mental

Grothendieck's anabelian conjectures: certain "anabelian" varieties
(roughly, hyperbolic curves over number fields) are determined up
to isomorphism by their **étale fundamental group**.

For a hyperbolic curve $X$ over a number field $K$:

$$
X \quad \longleftrightarrow \quad \pi_1^{\rm \acute et}(X)
$$

is a *bijection* (more precisely: scheme-theoretic isomorphism iff
group isomorphism preserving Galois structure).

This is a **drastic** statement: the algebraic-geometric object is
encoded entirely in a topological-group invariant.

## Belyi's theorem

A smooth projective curve over $\mathbb C$ is defined over $\bar{\mathbb Q}$
**iff** it admits a *Belyi map* — a non-constant morphism to
$\mathbb P^1$ unramified outside $\{0, 1, \infty\}$.

Foundational link: number theory ↔ topology of dessins d'enfants
(children's drawings). Grothendieck's *Esquisse d'un Programme*
launched anabelian and dessins research.

## Mochizuki's IUT and the abc conjecture

**Inter-Universal Teichmüller Theory** (Mochizuki, 2012): a 500+
page proof of the **abc conjecture** (Masser-Oesterlé) using
anabelian-geometric foundations.

**abc conjecture**: for $a + b = c$ coprime, "almost always"
$c \le \mathrm{rad}(abc)^{1 + \epsilon}$ where $\mathrm{rad}$ is the
product of distinct primes dividing $n$.

Status as of 2025: Mochizuki + Japanese collaborators stand by the
proof (published 2021); much of the international community remains
skeptical (Scholze-Stix 2018 critique). One of math's most
high-profile ongoing controversies.

## Interactive

:::widget type=numeric-input prompt="Anabelian: variety determined by étale $\\pi_1$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Belyi: curve over $\\bar{\\mathbb Q}$ ⇔ admits Belyi map to $\\mathbb P^1$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="abc conjecture: $c \\le \\mathrm{rad}(abc)^{1 + \\epsilon}$ except finitely often. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Mochizuki's IUT: claimed proof of abc, controversial. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Étale fundamental group**: profinite version of $\pi_1$, classifying
finite étale covers.

**Section conjecture**: for hyperbolic curve $X / K$, sections of
$1 \to \pi_1(\bar X) \to \pi_1(X) \to G_K \to 1$ correspond to
rational points $X(K)$. Open in general; major case of anabelian
philosophy.

**Hodge-Arakelov theory**: Mochizuki's framework predating IUT,
combining $p$-adic Hodge ideas with arithmetic intersection.

## Computational

```python
# Anabelian geometry is research; concrete computations limited
# Sketch: dessin d'enfant (graph-theoretic Belyi data)

# A dessin: bipartite graph on a Riemann surface with tritype data
# Equivalent to a Belyi pair (X, f : X → P^1)

# Tiny example: tetrahedron dessin → genus 0 with 4 ramification
# Encoded as permutations on edges
class Dessin:
    def __init__(self, sigma_0, sigma_1, sigma_inf, n_edges):
        # σ_0 σ_1 σ_∞ = e (composition of permutations)
        self.s0 = sigma_0; self.s1 = sigma_1; self.sinf = sigma_inf
        self.n = n_edges

# Tetrahedron dessin (degree 4 over P^1):
# σ_0 = (1,2)(3,4), σ_1 = (1,3)(2,4), σ_∞ = (1,4)(2,3)
# Composition is identity (verify)

# In SageMath, dessins d'enfants module computes Belyi maps explicitly
print("Dessins d'enfants research: SageMath / Magma have explicit modules.")
```

## Applied

- **Number-theoretic foundations** — anabelian geometry recovers
  arithmetic from group theory.
- **Cryptographic curves** — selection of anabelian-secure curves a
  speculative direction.
- **Topological data analysis** — anabelian flavour: structure
  recovered from graph data.
- **Mathematical-research methodology** — IUT controversy spurred
  community-norm discussions.

## Check Your Understanding

:::widget type=numeric-input prompt="Anabelian conjecture: hyperbolic curves recoverable from $\\pi_1^{\\rm \\acute et}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Belyi: curves over $\\bar{\\mathbb Q}$ have map to $\\mathbb P^1$ ramified over 3 points. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="abc conjecture relates $c$ to radical of $abc$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Mochizuki's IUT: claimed proof of abc, contested. Type 1." answer=1 explain="Yes.":::
