---
strand: pattern-counting
level: master
order: 8
title: Extremal Set Theory and Ramsey
prerequisites:
  - tier: strand-5-pattern-counting-master
    slug: 07-discrete-fourier-additive
    description: Discrete Fourier
connections:
  - strand-5-pattern-counting-master/09-pattern-master-capstone
applications:
  - cs: "Coding lower bounds, complexity theory, design theory"
  - life: "How big can a structure be without containing a forbidden pattern?"
---

# Extremal Set Theory and Ramsey

## Explain Like I Am 7

If you scribble friendship lines on a *huge* group of kids using
only two coloured pens, the rule that says big groups always
contain a smaller perfectly-organised group, no matter how messily
you draw it, kicks in: somewhere a small clique of kids will all
be linked by the *same* coloured line.  This is **Ramsey's**
discovery — total disorder is impossible once your structure is
big enough.  Mathematicians push this idea further, asking how
big "big enough" needs to be, with answers that grow eye-wateringly
fast.

## Mental

Strand 5 Advanced Lesson 08 covered classical extremal results
(Mantel, Turán, Sperner, EKR). Master themes:

- **Hypergraph Turán**: extremal questions for uniform hypergraphs.
- **Ramsey theory** in colourful generality.
- **Stability theorems**: structure of *near-extremal* configurations.
- **Containers method**: powerful general technique (Saxton-Thomason,
  Balogh-Morris-Samotij 2015).

## Hypergraph Turán

For $r$-uniform hypergraphs and forbidden subhypergraph $H$:

- $r = 2$: classical Turán, sharp $\frac{r-1}{r} \binom{n}{2}$.
- $r \ge 3$: most cases **open** (Turán's conjecture for tetrahedra
  $K_4^{(3)}$ open since 1941).

The lack of progress here illustrates the difficulty.

## Ramsey theory

**Ramsey's theorem**: for any colouring of edges of large enough
$K_n$, some monochromatic clique of size $s$ exists.

**Hyper-Ramsey** (Hales-Jewett's theorem): combinatorial lines in
$\{1, \ldots, k\}^n$ for high enough $n$.

**Polynomial van der Waerden**: any positive-density subset of
$\mathbb Z$ contains arbitrary patterns $\{a, a + p_1(d), \ldots\}$
for polynomials $p_i$.

**Density Ramsey**: density (rather than colouring) versions —
Szemerédi-flavour.

## Containers method

Given a family $\mathcal F$ of "bad" objects (e.g., independent sets
in a hypergraph), there's a small family $\mathcal C$ of "containers"
$C \subseteq E$ such that every bad set is in some $C$, and each
container is "small."

Implications:

- Counting $K_r$-free graphs (Saxton-Thomason).
- Random structures: random $K_r$-free graph theory.
- Number theory: counting solutions to additive equations.

## Interactive

:::widget type=numeric-input prompt="Hypergraph Turán for tetrahedra $K_4^{(3)}$ — open since 1941. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Ramsey's theorem: monochromatic $K_s$ for large enough $n$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Containers method (Saxton-Thomason / Balogh-Morris-Samotij) ~ 2015. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hales-Jewett: combinatorial lines in $\\{1,...,k\\}^n$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Schur's theorem**: for any $r$-coloring of $\{1, \ldots, n\}$ with
$n$ large, there's a monochromatic solution to $a + b = c$.

**Rado's theorem**: characterises which linear systems are
**partition-regular** — guaranteed monochromatic solutions in any
finite colouring.

**Gallai-Witt theorem**: multidimensional van der Waerden — any
finite colouring of $\mathbb Z^n$ contains a monochromatic
homothetic copy of any finite pattern.

**Hales-Jewett-Furstenberg-Katznelson**: density Hales-Jewett.

## Computational

```python
# Classical Ramsey number R(3, 3) = 6 — verify: every 2-colouring of K_6 has monochromatic triangle
import itertools

def has_mono_triangle(edges, color, n):
    """Check if 2-coloring 'color' of K_n has a monochromatic triangle."""
    for i, j, k in itertools.combinations(range(n), 3):
        if color[(i, j)] == color[(i, k)] == color[(j, k)]:
            return True
    return False

# Check: there exist colourings of K_5 without monochromatic triangle
# (R(3,3) = 6, so 5 is below threshold)
import random
n = 5
def random_color_K_n(n):
    return {(i, j): random.choice(['R', 'B']) for i in range(n) for j in range(i+1, n)}

# Search for triangle-free 2-coloring of K_5
trials = 1000
found = False
for _ in range(trials):
    c = random_color_K_n(n)
    if not has_mono_triangle(c, c, n):
        found = True; break
print(f"Triangle-free 2-coloring of K_{n} exists: {found}")

# K_6: every 2-coloring has monochromatic triangle
n = 6
all_have = True
trials_6 = 100  # quick sanity check
for _ in range(trials_6):
    c = random_color_K_n(n)
    if not has_mono_triangle(c, c, n):
        all_have = False; break
print(f"K_{n} always has monochromatic triangle (sampled): {all_have}")

# Schur numbers: largest N with [1, N] sum-free in r colors
def schur_check(N, r):
    """Try a random r-coloring of [1, N] and check for monochromatic a + b = c."""
    color = [random.randint(0, r - 1) for _ in range(N + 1)]
    for a in range(1, N + 1):
        for b in range(a, N + 1):
            if a + b <= N and color[a] == color[b] == color[a + b]:
                return False
    return True

# Schur(2) = 4; Schur(3) = 13; Schur(4) = 44; Schur(5) = 160
# Just demonstrate concept; finding optimal is hard
print("Schur(2) = 4 means [1, 5] has monochromatic sum in any 2-coloring.")
```

## Applied

- **Coding-theory bounds** — Plotkin, MRRW bounds use extremal-set
  techniques.
- **Communication complexity** — disjointness lower bounds via
  hypergraph Turán.
- **Combinatorial design** — Steiner systems, balanced designs use
  extremal-set theory.
- **Property testing** — graph property testing relies on
  Ramsey-style colour-recovery.
- **Theoretical CS** — Hales-Jewett's theorem powers PCP-style
  arguments and constraint-satisfaction lower bounds.

## Check Your Understanding

:::widget type=numeric-input prompt="$R(3, 3) = 6$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Containers method (~2015) is a recent powerful tool. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hypergraph Turán for $K_4^{(3)}$: open. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Rado's theorem: characterises partition-regular linear systems. Type 1." answer=1 explain="Yes.":::
