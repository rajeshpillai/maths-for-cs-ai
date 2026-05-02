# Polyhedra and Euler's Formula — V − E + F = 2

## Intuition

Take any **convex polyhedron** — a cube, a tetrahedron, a soccer ball.
Count its **vertices** $V$, **edges** $E$, and **faces** $F$.  Then no matter
which polyhedron you chose, the answer to $V - E + F$ is always $2$.  Euler
discovered this in 1750 and it is the single most-quoted invariant in
combinatorial geometry: it constrains *what shapes can exist*, proves
the existence of exactly five Platonic solids, and underpins the entire field
of topology.

## Prerequisites

- Tier 1, Lesson 5: Graph theory (vertices, edges, planar drawings)
- Tier 1, Lesson 6: Proof techniques (induction)

## From First Principles

### Statement

For any **connected, convex polyhedron** with $V$ vertices, $E$ edges, and
$F$ faces:

$$V - E + F = 2$$

The same formula holds for any **connected planar graph** drawn without edge
crossings (with $F$ counting the unbounded outer face).

### Pen & paper checks

| Polyhedron | $V$ | $E$ | $F$ | $V - E + F$ |
|---|---|---|---|---|
| Tetrahedron       | 4  | 6  | 4  | $4 - 6 + 4 = 2$ ✓ |
| Cube              | 8  | 12 | 6  | $8 - 12 + 6 = 2$ ✓ |
| Octahedron        | 6  | 12 | 8  | $6 - 12 + 8 = 2$ ✓ |
| Dodecahedron      | 20 | 30 | 12 | $20 - 30 + 12 = 2$ ✓ |
| Icosahedron       | 12 | 30 | 20 | $12 - 30 + 20 = 2$ ✓ |
| Square pyramid    | 5  | 8  | 5  | $5 - 8 + 5 = 2$ ✓ |
| Triangular prism  | 6  | 9  | 5  | $6 - 9 + 5 = 2$ ✓ |

The pattern survives any cut, any deformation that doesn't tear the surface.

### Why is it true? (sketch by induction)

Project the polyhedron onto the plane (one face becomes the unbounded "outer"
region) — you get a connected planar graph.

**Base case:** a single vertex.  $V = 1, E = 0, F = 1$ (just the outer face),
so $V - E + F = 2$.

**Inductive step:** add either an edge or a vertex+edge to a graph satisfying
the formula.

- Adding an edge between existing vertices either (a) creates a new face by
  splitting an existing face, increasing $E$ and $F$ each by 1, or (b) is
  forbidden if it crosses (we're keeping it planar).  Either way the
  alternating sum is preserved.
- Adding a new vertex by attaching it to one existing vertex via one new edge
  increases $V$ and $E$ each by 1.  Net change: $+1 - 1 + 0 = 0$.

So the alternating sum stays at 2 throughout. ∎

### Consequence 1 — exactly five Platonic solids

A **Platonic solid** is a convex polyhedron whose faces are all congruent
regular $p$-gons, with $q$ faces meeting at each vertex.

**Sum of edges from face count:** each face has $p$ edges, each edge belongs
to 2 faces, so $E = pF/2$.

**Sum of edges from vertex count:** each vertex meets $q$ edges, each edge has
2 endpoints, so $E = qV/2$.

Substitute $V = 2E/q$ and $F = 2E/p$ into Euler:

$$\frac{2E}{q} - E + \frac{2E}{p} = 2 \;\Rightarrow\; \frac{1}{p} + \frac{1}{q} - \frac{1}{2} = \frac{1}{E}$$

For a positive $E$ we need $\frac{1}{p} + \frac{1}{q} > \frac{1}{2}$ with
$p, q \ge 3$ (since faces have at least 3 sides and at least 3 faces meet at
each vertex).

The **only** integer pairs $(p, q)$ satisfying $\frac{1}{p} + \frac{1}{q} > \frac{1}{2}$ with $p, q \ge 3$:

| $(p, q)$  | Solid          | $V$ | $E$ | $F$ |
|-----------|----------------|-----|-----|-----|
| $(3, 3)$  | Tetrahedron    | 4   | 6   | 4   |
| $(4, 3)$  | Cube           | 8   | 12  | 6   |
| $(3, 4)$  | Octahedron     | 6   | 12  | 8   |
| $(5, 3)$  | Dodecahedron   | 20  | 30  | 12  |
| $(3, 5)$  | Icosahedron    | 12  | 30  | 20  |

That's it.  Five.  Forever.  Euler's formula plus a one-line inequality proves
that no sixth Platonic solid can exist in three dimensions.

### Consequence 2 — every planar graph has a vertex of degree at most 5

**Lemma:** in any simple connected planar graph with $V \ge 3$:

$$E \le 3V - 6$$

**Proof.** Each face is bounded by at least 3 edges; each edge belongs to 2
faces, so $2E \ge 3F$, i.e. $F \le 2E/3$.  Substitute into Euler:

$$V - E + F = 2 \;\Rightarrow\; V - E + \frac{2E}{3} \ge 2 \;\Rightarrow\; E \le 3V - 6$$

**Corollary.** In any planar graph, the average vertex degree is at most
$2E/V \le (6V - 12)/V < 6$.  So some vertex has degree at most 5.  This is
the key step of the **5-colour theorem** for planar maps (and a precursor
to the 4-colour theorem).

### Consequence 3 — $K_5$ and $K_{3,3}$ are not planar

The complete graph $K_5$ has $V = 5$, $E = 10$.  But $3V - 6 = 9 < 10 = E$.
So $K_5$ violates the planarity bound. ∎

For $K_{3,3}$ a stronger argument is needed (using the bipartite property:
every face has at least 4 edges, giving $E \le 2V - 4 = 8 < 9 = E$). ∎

These two graphs are the obstructions to planarity (Kuratowski's theorem).

## Python Verification

```python
# ── Euler's formula across many polyhedra ───────────────────
from itertools import combinations
from math import comb

polyhedra = {
    "Tetrahedron":     (4, 6, 4),
    "Cube":            (8, 12, 6),
    "Octahedron":      (6, 12, 8),
    "Dodecahedron":    (20, 30, 12),
    "Icosahedron":     (12, 30, 20),
    "Square pyramid":  (5, 8, 5),
    "Triangular prism":(6, 9, 5),
    "Pentagonal bipyramid": (7, 15, 10),
    "Truncated tetrahedron": (12, 18, 8),
    "Truncated cube":  (24, 36, 14),
}

print("=== Euler's formula V - E + F = 2 ===")
for name, (V, E, F) in polyhedra.items():
    chi = V - E + F
    print(f"  {name:<22}  V={V:>3}, E={E:>3}, F={F:>3}, χ = {chi}",
          "✓" if chi == 2 else "✗")

# Find all Platonic solids by enumeration
print("\n=== All (p, q) with p, q ≥ 3 and 1/p + 1/q > 1/2 ===")
for p in range(3, 7):
    for q in range(3, 7):
        if 1/p + 1/q > 1/2:
            E = int(round(1 / (1/p + 1/q - 1/2)))
            V = 2 * E // q
            F = 2 * E // p
            print(f"  (p={p}, q={q}): V={V}, E={E}, F={F}, χ={V-E+F}")

# Check K_5 and K_{3,3} planarity bounds
print("\n=== Planarity bounds ===")
def planar_bound(V):
    return 3*V - 6

V, E = 5, 10
print(f"K_5:    V={V}, E={E}, 3V-6={planar_bound(V)} → planar?",
      "yes" if E <= planar_bound(V) else "NO (violates bound)")

V, E = 6, 9
print(f"K_3,3:  V={V}, E={E}, 2V-4={2*V-4} (bipartite bound) → planar?",
      "yes" if E <= 2*V - 4 else "NO (violates bipartite bound)")
```

## Visualisation — the 5 Platonic solids on one canvas

```python
# ── Render all 5 Platonic solids with their (V, E, F) ───────
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
import numpy as np

# Vertex coordinates for each Platonic solid (centred at origin).
phi = (1 + np.sqrt(5)) / 2

solids = {}
solids["Tetrahedron"] = {
    "V": np.array([[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]], dtype=float),
    "F": [[0,1,2],[0,1,3],[0,2,3],[1,2,3]],
    "stats": (4, 6, 4),
}
solids["Cube"] = {
    "V": np.array([[x,y,z] for x in (-1,1) for y in (-1,1) for z in (-1,1)], dtype=float),
    "F": [[0,1,3,2],[4,5,7,6],[0,1,5,4],[2,3,7,6],[0,2,6,4],[1,3,7,5]],
    "stats": (8, 12, 6),
}
solids["Octahedron"] = {
    "V": np.array([[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]], dtype=float),
    "F": [[0,2,4],[2,1,4],[1,3,4],[3,0,4],[2,0,5],[1,2,5],[3,1,5],[0,3,5]],
    "stats": (6, 12, 8),
}
solids["Dodecahedron"] = {
    "V": np.array(
        [[x,y,z] for x in (-1,1) for y in (-1,1) for z in (-1,1)] +
        [[0, p, q] for p in (-1/phi, 1/phi) for q in (-phi, phi)] +
        [[p, q, 0] for p in (-1/phi, 1/phi) for q in (-phi, phi)] +
        [[q, 0, p] for p in (-1/phi, 1/phi) for q in (-phi, phi)], dtype=float),
    "F": [],   # complex; we'll just plot the points and a hull stub
    "stats": (20, 30, 12),
}
solids["Icosahedron"] = {
    "V": np.array(
        [[0, s1*1, s2*phi] for s1 in (-1,1) for s2 in (-1,1)] +
        [[s1*1, s2*phi, 0] for s1 in (-1,1) for s2 in (-1,1)] +
        [[s1*phi, 0, s2*1] for s1 in (-1,1) for s2 in (-1,1)], dtype=float),
    "F": [],
    "stats": (12, 30, 20),
}

fig = plt.figure(figsize=(15, 6))
for i, (name, info) in enumerate(solids.items(), start=1):
    ax = fig.add_subplot(1, 5, i, projection="3d")
    V_arr = info["V"]
    ax.scatter(V_arr[:,0], V_arr[:,1], V_arr[:,2], s=30, c="tab:blue")
    if info["F"]:
        polys = [V_arr[face] for face in info["F"]]
        coll = Poly3DCollection(polys, alpha=0.25, facecolor="tab:orange",
                                edgecolor="black", linewidth=1)
        ax.add_collection3d(coll)
    V, E, F = info["stats"]
    ax.set_title(f"{name}\nV={V}, E={E}, F={F}\nV−E+F = {V-E+F}", fontsize=9)
    ax.set_axis_off()

plt.suptitle("All five Platonic solids: V − E + F = 2 in every case", y=1.02)
plt.tight_layout()
plt.show()
```

(For the dodecahedron and icosahedron we only show vertices to keep the
demo short; the formula is what matters.)

## Connection to CS / Games / AI / Business / Industry

- **CS / Computational geometry** — half-edge data structures and mesh
  validation tests check $V - E + F = 2$ as a "well-formed mesh" predicate;
  any value other than 2 means a hole or a non-manifold edge.
- **CS / Graph algorithms** — Kuratowski's theorem ($K_5$ and $K_{3,3}$
  obstructions) drives planarity-testing algorithms (Hopcroft-Tarjan); the
  $E \le 3V - 6$ bound proves planar graphs admit linear-time algorithms.
- **AI / ML** — graph neural networks for molecules respect chemical-bond
  planarity; topological data analysis (TDA) uses generalised Euler
  characteristics to summarise persistent-homology features.
- **Games / Graphics** — every 3D engine ships a "watertight mesh" check that
  is essentially $V - E + F = 2$ on a closed surface; Catmull–Clark subdivision
  refines a control mesh while preserving Euler characteristic.
- **Architecture / CAD** — geodesic-dome design (Buckminster Fuller) uses
  Euler's formula to enumerate possible triangular tilings of a sphere.
- **Chemistry / Materials science** — fullerene molecules ($C_{60}$ buckyball
  is a truncated icosahedron with 60 vertices, 90 edges, 32 faces; $\chi = 2$ ✓)
  rely on Euler-formula constraints to enumerate stable cage structures.

## Check Your Understanding

1. **Pen & paper:** A polyhedron has 12 pentagonal faces.  Each edge belongs
   to 2 faces and each vertex meets 3 faces.  Find $V$ and $E$ and verify
   $V - E + F = 2$.  Which solid is it?
2. **Pen & paper:** Use the planarity bound $E \le 3V - 6$ to prove that
   $K_5$ is non-planar.  How does the bound change for **bipartite** planar
   graphs and why does it forbid $K_{3,3}$?
3. **Counting:** A football (soccer ball) has 12 pentagons and 20 hexagons.
   Find $V, E$ and verify the formula.
4. **Insight:** Why does $V - E + F$ change for surfaces with handles
   (e.g., a torus has $V - E + F = 0$)?  Look up "genus" and the
   generalised Euler characteristic.
5. **Coding:** Verify Euler's formula for the truncated icosahedron
   $(V=60, E=90, F=32)$ and explain why this is the buckyball $C_{60}$.
