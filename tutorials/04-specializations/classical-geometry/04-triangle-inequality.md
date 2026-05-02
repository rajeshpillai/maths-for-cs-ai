# Triangle Inequality — When Three Sides Form a Triangle

## Intuition

Can you build a triangle with sides $2, 3, 100$?  Obviously not — the short
sides cannot reach across the long one.  The **triangle inequality** is the
formal statement of this: for any triangle, the sum of any two sides exceeds
the third.  It is the most-quoted inequality in geometry, the defining property
of a **metric space**, and the engine of bounds in optimisation.

## Prerequisites

- Tier 8, Lesson 3: Pythagorean theorem and distance
- Classical Geometry, Lesson 2: Triangle congruence and similarity

## From First Principles

### The statement

For any triangle with sides $a, b, c$:

$$a + b > c, \qquad b + c > a, \qquad c + a > b$$

Equivalently (since $|x - y| \le z \iff -z \le x - y \le z$):

$$|a - b| < c < a + b$$

The strict inequality is for a **non-degenerate** triangle.  Equality
($a + b = c$) corresponds to the three points being **collinear**, i.e. a
"flat" or degenerate triangle.

### Direct geometric proof

In any triangle $ABC$, the side $AB$ is a straight line — the **shortest
path** from $A$ to $B$.  Any other path from $A$ to $B$ has length $\ge AB$,
with equality iff the path is the straight line itself.

The path $A \to C \to B$ has length $AC + CB$.  Since this isn't a straight
line (unless $C$ is on segment $AB$), it's **strictly longer** than $AB$:

$$AC + CB > AB$$

That is $b + a > c$.  By symmetry, the other two inequalities follow.  ∎

### Worked example — can these sides form a triangle?

| Sides | Test | Triangle? |
|---|---|---|
| 3, 4, 5    | $3 + 4 > 5$, $4 + 5 > 3$, $3 + 5 > 4$ | ✓ |
| 1, 2, 3    | $1 + 2 = 3$ (not strict) | degenerate |
| 5, 5, 12   | $5 + 5 = 10 < 12$ | ✗ |
| 7, 11, 13  | all three sums of two exceed third | ✓ |

**Quick test.** Compute $a + b + c$, then check whether each side is less than
half the perimeter.  (Equivalent to all three triangle inequalities.)

### Worked example — find allowed range for the third side

> Two sides of a triangle are 7 and 10.  What is the range of the third side?

Let the third side be $c$.  We need

$$|10 - 7| < c < 10 + 7 \;\Rightarrow\; 3 < c < 17$$

So $c$ can be any real number strictly between 3 and 17.

**Integer version.**  If $c$ must be an integer: $c \in \{4, 5, 6, \ldots, 16\}$,
which is 13 values.

### Generalisation — the polygon inequality

In any polygon, the longest side is **less than** the sum of the others.

**Why?**  Any polygon side is bounded above by the path along the rest of the
boundary.

This is used to prove "no closed polygon has one side longer than the sum of
the rest" — same logic as the triangle inequality, applied repeatedly.

### Triangle inequality for distances (the metric-space view)

For any three points $P, Q, R$ in any **metric space**:

$$d(P, R) \le d(P, Q) + d(Q, R)$$

This is one of the three defining axioms of a metric.  It applies to:
- Euclidean distance in $\mathbb{R}^n$ (the standard case).
- Manhattan distance ($L^1$): $|x_1 - x_2| + |y_1 - y_2|$.
- Chebyshev distance ($L^\infty$): $\max(|x_1 - x_2|, |y_1 - y_2|)$.
- Edit distance between strings.
- Word-mover's distance for documents.

If a "distance" function fails the triangle inequality, **it is not a metric**.

### A tighter bound — the reverse triangle inequality

$$|d(P, R) - d(P, Q)| \le d(Q, R)$$

Proof: apply the regular triangle inequality both ways and rearrange.

Useful for showing that distances are stable under small perturbations
(numerical analysis, signal processing).

### Strict version and the law of cosines

For an actual (non-degenerate) triangle, the triangle inequality is strict.
The **law of cosines** gives a quantitative version:

$$c^2 = a^2 + b^2 - 2ab \cos C$$

If $C = 180°$ (flat triangle), $\cos C = -1$, so $c^2 = (a + b)^2$ and $c = a + b$
— the equality case.  As $C$ shrinks below $180°$, $\cos C > -1$, and $c < a + b$.

So the triangle inequality says: $C < 180°$, the triangle isn't degenerate.

## Python Verification

```python
# ── Triangle inequality: classify side triples ──────────────
def triangle_status(a, b, c):
    sides = sorted([a, b, c])
    s = sides[0] + sides[1]
    if s > sides[2]:
        return "valid triangle"
    elif s == sides[2]:
        return "degenerate (collinear)"
    else:
        return "impossible"

print("=== Triangle classification ===")
for a, b, c in [(3,4,5), (1,2,3), (5,5,12), (7,11,13), (10,10,10), (1,1,2)]:
    print(f"  ({a:>2},{b:>2},{c:>2}): {triangle_status(a, b, c)}")

# Range of the third side
print("\n=== Range of third side ===")
def third_side_range(a, b):
    lower = abs(a - b)
    upper = a + b
    return (lower, upper)

for a, b in [(7, 10), (3, 8), (5, 5)]:
    lo, hi = third_side_range(a, b)
    int_count = max(0, hi - lo - 1)   # strict inequality
    print(f"  sides {a}, {b}: third side in ({lo}, {hi}), "
          f"{int_count} integer values")

# Verify triangle inequality holds for random triangles
print("\n=== Random triangles satisfy strict inequality ===")
import random, math
random.seed(0)
fails = 0
for _ in range(1000):
    # Pick three random points in [0, 10]^2
    pts = [(random.uniform(0,10), random.uniform(0,10)) for _ in range(3)]
    def dist(p, q): return math.hypot(p[0]-q[0], p[1]-q[1])
    a = dist(pts[1], pts[2])
    b = dist(pts[0], pts[2])
    c = dist(pts[0], pts[1])
    sides = sorted([a, b, c])
    if sides[0] + sides[1] <= sides[2]:
        fails += 1
print(f"  failures over 1000 trials: {fails} (expect 0)")

# Different metrics — show that L^1 (Manhattan) is also a metric
print("\n=== Manhattan distance also satisfies triangle inequality ===")
def manhattan(p, q): return abs(p[0]-q[0]) + abs(p[1]-q[1])
fails = 0
for _ in range(1000):
    pts = [(random.uniform(0,10), random.uniform(0,10)) for _ in range(3)]
    a = manhattan(pts[1], pts[2])
    b = manhattan(pts[0], pts[2])
    c = manhattan(pts[0], pts[1])
    sides = sorted([a, b, c])
    if sides[0] + sides[1] < sides[2] - 1e-9:
        fails += 1
print(f"  failures: {fails}")
```

## Visualisation — flexion of a triangle as the third side varies

```python
# ── Show how triangle shape changes as third side varies ────
import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(1, 4, figsize=(15, 4))

a, b = 5, 7  # two fixed sides
A = (0, 0); B = (b, 0)

c_values = [3, 5, 8, 11.5]
for ax, c in zip(axes, c_values):
    # Find C such that AC = c and CB = a
    # Place A at origin, B at (b, 0)
    # C is intersection of circle(A, c) and circle(B, a)
    # x^2 + y^2 = c^2, (x-b)^2 + y^2 = a^2
    # Subtract: x = (b^2 + c^2 - a^2) / (2 b)
    x = (b*b + c*c - a*a) / (2 * b)
    y2 = c*c - x*x
    if y2 < 0:
        ax.set_title(f"c = {c}\nimpossible (no triangle)")
        ax.axis("off")
        continue
    y = np.sqrt(y2)
    C = (x, y)
    triangle = [A, B, C, A]
    ax.plot(*zip(*triangle), "b-", lw=2)
    ax.fill(*zip(*[A, B, C]), alpha=0.2)
    ax.plot(*A, "ko"); ax.text(-0.4, -0.5, "A")
    ax.plot(*B, "ko"); ax.text(b - 0.2, -0.5, "B")
    ax.plot(*C, "ko"); ax.text(C[0] + 0.1, C[1] + 0.1, "C")
    ax.set_xlim(-2, 9); ax.set_ylim(-2, 7)
    ax.set_aspect("equal"); ax.grid(alpha=0.3)
    ax.set_title(f"a={a}, b={b}, c={c}\n(c valid in ({abs(a-b)}, {a+b}))")

plt.tight_layout()
plt.show()
```

The first plot shows a "tall thin" triangle; the third side near the upper
limit produces a "flat wide" one; values outside the range $(|a-b|, a+b)$
yield no triangle at all.

## Connection to CS / Games / AI / Business / Industry

- **CS / Algorithms** — heuristics in A* search must satisfy the triangle
  inequality to be **admissible**: $h(x) \le d(x, y) + h(y)$.  Without
  this, A* may miss optimal paths.
- **CS / Distributed systems** — peer-to-peer routing (Kademlia, Chord) and
  caching policies use distance metrics that **must** satisfy the triangle
  inequality for correctness proofs.
- **AI / ML** — k-NN clustering with a distance that violates the triangle
  inequality breaks data-structure speedups (KD-trees, ball trees).
- **AI / NLP** — embeddings (word2vec, BERT) need a true metric (typically
  cosine distance or its derived metric) for vector databases (FAISS, Pinecone)
  to guarantee correct nearest-neighbour search.
- **Networking** — round-trip-time triangulation in Internet measurement
  assumes the triangle inequality holds approximately; violations indicate
  routing anomalies (BGP issues, asymmetric paths).
- **Logistics** — vehicle-routing problems (Travelling Salesman, VRP) on
  triangle-inequality-respecting distances admit constant-factor approximation
  algorithms (Christofides 1.5×).
- **Surveying / GPS** — multilateration (GPS positioning) uses the inequality
  to bound errors — if observed distances violate it, you know there is a
  measurement error.

## Check Your Understanding

1. **Pen & paper:** Two sides of a triangle are 8 and 11.  Find the range of
   the third side and the number of valid integer lengths.
2. **Pen & paper:** Can a triangle have sides 6, 8, 14?  If not, explain why.
3. **Pen & paper:** Show using the triangle inequality that a quadrilateral
   with sides 2, 3, 5, 11 cannot exist (any single side must be less than
   the sum of the other three).
4. **Pen & paper:** Prove the **reverse** triangle inequality
   $|a - b| \le c$ from the standard one.
5. **Insight:** Why is the triangle inequality the third axiom of a metric
   space?  Give an example of a "distance"-like function that violates it
   and explain why nearest-neighbour search would break.
