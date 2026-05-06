---
strand: pattern-counting
level: research
order: 0
title: Geometric Group Theory
prerequisites:
  - tier: strand-5-pattern-counting-master
    slug: 09-pattern-master-capstone
    description: Pattern & counting master capstone
connections:
  - strand-5-pattern-counting-research/01-coarse-geometry
applications:
  - cs: "Cryptography from geometric groups; expander graphs"
  - life: "Groups as geometric objects via Cayley graphs"
---

# Geometric Group Theory

## Explain Like I Am 7

Imagine writing every secret-code instruction your group of friends
can perform — "step left," "step right," "spin." If each
instruction is an arrow you can draw on the floor, the *floor map
of all reachable spots* becomes a giant connected dot-and-string
picture called a **Cayley graph**.  Geometric group theorists
study these pictures from very far away — like squinting at a
city from space — and discover that the shape, growth, and
"thickness" of the map already tells you almost everything about
the secret-code group itself.

## Mental

Treat **groups as geometric objects**: study a group $G$ via the
geometry of its **Cayley graph**.

**Cayley graph** $\Gamma(G, S)$: vertices $G$, edges $g \to gs$ for
$s$ in generating set $S$. Quasi-isometry class is independent of
finite generating set.

Properties of $G$ become *coarse-geometric* properties of
$\Gamma(G, S)$.

## Gromov's program

**Gromov hyperbolic groups**: groups whose Cayley graphs satisfy a
"thin triangle" condition. Captures non-positive curvature
combinatorially.

Every hyperbolic group has:

- Solvable word problem.
- Finite presentation.
- Linear isoperimetric inequality.
- Boundary at infinity.

**Polynomial growth theorem** (Gromov 1981): a finitely-generated
group with polynomial growth is virtually nilpotent.

## Mostow rigidity

**Mostow rigidity** (1968): for $n \ge 3$, two compact hyperbolic
$n$-manifolds with isomorphic fundamental groups are isometric.

Profound: in dim $\ge 3$, hyperbolic geometry rigid (no
deformations).

## Worked example: free group $F_2$

$F_2 = \langle a, b \rangle$: free on 2 generators.

Cayley graph: 4-regular tree. Hyperbolic ($\delta = 0$).

Word problem: trivially solvable (reduce by cancelling $aa^{-1}$).

Growth: exponential, $|B_n| \sim 4 \cdot 3^{n-1}$.

## Interactive

:::widget type=numeric-input prompt="Cayley graph: vertices = group elements, edges = generators. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Gromov hyperbolic groups: thin triangle condition. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Mostow rigidity: dim ≥ 3 hyperbolic mfds rigid. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Gromov polynomial growth → virtually nilpotent. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Quasi-isometry**: maps preserving distances up to multiplicative
+ additive constants. Coarse-geometric equivalence.

**Asymptotic dimension** (Gromov): coarse-geometric dimension; key
invariant.

**CAT(0) groups**: groups acting properly on CAT(0) (non-positively-
curved) spaces. Examples: lattices in symmetric spaces.

**Out(F_n) and mapping class groups**: outer automorphism groups of
free groups + surface mapping class groups exhibit rich geometric
structure.

**Geometric group theory + computer science**: word-problem
algorithms, Dehn functions classify computational complexity of
group operations.

## Computational

```python
import networkx as nx

# Cayley graph of Z^2 with standard generators
def cayley_Z2(radius=2):
    G = nx.Graph()
    nodes = [(i, j) for i in range(-radius, radius + 1)
                     for j in range(-radius, radius + 1)]
    G.add_nodes_from(nodes)
    for i, j in nodes:
        for di, dj in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
            ni, nj = i + di, j + dj
            if (ni, nj) in G.nodes:
                G.add_edge((i, j), (ni, nj))
    return G

G = cayley_Z2()
print(f"|V| = {G.number_of_nodes()}, |E| = {G.number_of_edges()}")

# Growth: |B_n| in Z² = 1 + 4 + 8 + 12 + ... = 1 + 4 n + 2 n²
# (polynomial growth — virtually nilpotent ✓)
def ball_size_Z2(n):
    return 1 + 4 * n + 2 * n * n if n > 0 else 1

for n in range(5):
    print(f"|B_{n}| in Z² = {ball_size_Z2(n)}")
# Polynomial growth (Gromov): Z² nilpotent (abelian)

# Free group F_2 ball size: exponential
def ball_size_F2(n):
    if n == 0: return 1
    return 1 + 4 * (3**n - 1) // 2
for n in range(5):
    print(f"|B_{n}| in F_2 = {ball_size_F2(n)}")
```

## Applied

- **Group-theoretic cryptography** — Anshel-Anshel-Goldfeld (1999)
  proposed crypto over braid groups; mostly broken but illustrative.
- **Expander graphs** — Cayley graphs of $\mathrm{SL}_n(\mathbb F_p)$
  give expanders; used in derandomisation, error correction.
- **Topology** — group-theoretic methods central to 3-manifold
  classification (Thurston / Perelman / Agol).
- **Dynamical systems** — group actions on geometric spaces.
- **Theoretical CS** — word-problem complexity classifies P / NP
  / etc.

## Check Your Understanding

:::widget type=numeric-input prompt="Cayley graph encodes group geometrically. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Gromov hyperbolic = thin-triangle condition. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Mostow rigidity for hyperbolic manifolds in dim ≥ 3. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Polynomial growth ⇒ virtually nilpotent (Gromov). Type 1." answer=1 explain="Yes.":::
