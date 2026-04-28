# Lattices and Partial Orders

## Intuition

Not everything can be ranked in a single line. Some things are incomparable —
you cannot say "red > square" because they measure different things. A
**partial order** formalises this: some pairs are comparable, others are not.
A **lattice** is a partial order where any two elements have a least upper
bound (join) and greatest lower bound (meet). Lattices appear everywhere:
in type systems (subtyping), in databases (query optimisation), in logic
(truth values), and in static analysis (abstract interpretation).

## Prerequisites

- **Tier 1, Lesson 3** — Relations and functions

## From First Principles

### Partial Order (Poset)

A **partial order** on a set $S$ is a relation $\le$ that is:

1. **Reflexive:** $a \le a$ for all $a$.
2. **Antisymmetric:** if $a \le b$ and $b \le a$, then $a = b$.
3. **Transitive:** if $a \le b$ and $b \le c$, then $a \le c$.

A set with a partial order is called a **poset** $(S, \le)$.

**Examples:**

- $(\mathbb{Z}, \le)$: the usual ordering. This is a **total order** (every
  pair is comparable).
- $(\mathcal{P}(\{1,2,3\}), \subseteq)$: subsets ordered by inclusion. Not
  total: $\{1\}$ and $\{2\}$ are incomparable.
- $(\\mathbb{Z}^+, \mid)$: positive integers ordered by divisibility.
  $2 \mid 6$ but $2 \nmid 5$.

### Hasse Diagrams

A **Hasse diagram** draws a poset with:
- Elements as nodes.
- An edge from $a$ up to $b$ if $a < b$ and there is no $c$ with $a < c < b$
  (i.e., $b$ **covers** $a$).
- Transitivity is implied (no edge from $a$ to $c$ if $a < b < c$).

**Example:** Divisors of 12 under divisibility:

```
      12
     / \
    4   6
    |   |
    2   3
     \ /
      1
```

### Lattice

A poset $(L, \le)$ is a **lattice** if every pair of elements $a, b$ has:

- A **join** (least upper bound): $a \lor b = \sup\{a, b\}$
- A **meet** (greatest lower bound): $a \land b = \inf\{a, b\}$

**Example:** In the divisor lattice of 12:
- $\text{meet}(4, 6) = \gcd(4, 6) = 2$
- $\text{join}(4, 6) = \text{lcm}(4, 6) = 12$
- $\text{meet}(2, 3) = \gcd(2, 3) = 1$
- $\text{join}(2, 3) = \text{lcm}(2, 3) = 6$

**Power set lattice** $(\mathcal{P}(S), \subseteq)$:
- $A \land B = A \cap B$
- $A \lor B = A \cup B$

This is always a lattice (in fact, a **Boolean algebra**).

### Special Elements

- **Top** ($\top$): $a \le \top$ for all $a$. (12 in the divisor lattice.)
- **Bottom** ($\bot$): $\bot \le a$ for all $a$. (1 in the divisor lattice.)
- A **bounded lattice** has both $\top$ and $\bot$.

### Lattice Properties

For all $a, b, c$ in a lattice:

1. **Idempotent:** $a \lor a = a$, $a \land a = a$.
2. **Commutative:** $a \lor b = b \lor a$, $a \land b = b \land a$.
3. **Associative:** $(a \lor b) \lor c = a \lor (b \lor c)$.
4. **Absorption:** $a \lor (a \land b) = a$, $a \land (a \lor b) = a$.

A lattice is **distributive** if additionally:
$a \land (b \lor c) = (a \land b) \lor (a \land c)$

### Fixed-Point Theorems

**Knaster-Tarski Theorem:** Every monotone function $f: L \to L$ on a
complete lattice has a least fixed point.

$$\text{lfp}(f) = \bigwedge \{x \in L \mid f(x) \le x\}$$

This is the theoretical foundation of **static analysis** and **type inference**.

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(13, 6))

# Left: Hasse diagram for divisors of 12
ax1.set_title("Hasse Diagram: Divisors of 12", fontsize=12)
positions = {1: (2, 0), 2: (1, 1), 3: (3, 1), 4: (1, 2), 6: (3, 2), 12: (2, 3)}
covers = [(1,2), (1,3), (2,4), (3,6), (2,6), (4,12), (6,12)]

for a, b in covers:
    ax1.plot([positions[a][0], positions[b][0]], [positions[a][1], positions[b][1]],
             'k-', lw=1.5)
for n, (x, y) in positions.items():
    ax1.plot(x, y, 'o', color='steelblue', markersize=25, markeredgecolor='black', zorder=5)
    ax1.text(x, y, str(n), ha='center', va='center', fontsize=12,
             fontweight='bold', color='white', zorder=6)

ax1.text(2, -0.5, "bot = 1", ha='center', fontsize=10, fontstyle='italic')
ax1.text(2, 3.5, "top = 12", ha='center', fontsize=10, fontstyle='italic')
ax1.set_xlim(0, 4); ax1.set_ylim(-0.8, 4); ax1.set_aspect('equal'); ax1.axis('off')

# Right: Power set lattice P({a,b,c})
ax2.set_title("Hasse Diagram: P({a,b,c})", fontsize=12)
ps_pos = {
    '{}':     (3, 0),
    '{a}':    (1, 1),
    '{b}':    (3, 1),
    '{c}':    (5, 1),
    '{a,b}':  (1, 2),
    '{a,c}':  (3, 2),
    '{b,c}':  (5, 2),
    '{a,b,c}':(3, 3),
}
ps_covers = [
    ('{}','{a}'), ('{}','{b}'), ('{}','{c}'),
    ('{a}','{a,b}'), ('{a}','{a,c}'),
    ('{b}','{a,b}'), ('{b}','{b,c}'),
    ('{c}','{a,c}'), ('{c}','{b,c}'),
    ('{a,b}','{a,b,c}'), ('{a,c}','{a,b,c}'), ('{b,c}','{a,b,c}'),
]

for a, b in ps_covers:
    ax2.plot([ps_pos[a][0], ps_pos[b][0]], [ps_pos[a][1], ps_pos[b][1]],
             'k-', lw=1, alpha=0.6)
for name, (x, y) in ps_pos.items():
    ax2.plot(x, y, 'o', color='orange', markersize=22, markeredgecolor='black', zorder=5)
    display = name if len(name) <= 4 else name[:3] + '..'
    ax2.text(x, y, display, ha='center', va='center', fontsize=7,
             fontweight='bold', zorder=6)

ax2.set_xlim(-0.5, 6); ax2.set_ylim(-0.5, 3.8); ax2.set_aspect('equal'); ax2.axis('off')

plt.tight_layout()
plt.savefig("hasse_diagrams.png", dpi=100)
plt.show()
```

## Python Verification

```python
import math
from itertools import combinations

# ── Poset and Lattice operations from scratch ────────────

# Step 1: Divisor lattice
def divisors(n):
    """Return sorted list of divisors of n."""
    divs = []
    for i in range(1, int(n**0.5) + 1):
        if n % i == 0:
            divs.append(i)
            if i != n // i:
                divs.append(n // i)
    return sorted(divs)

def divides(a, b):
    return b % a == 0

n = 12
divs = divisors(n)
print(f"Divisors of {n}: {divs}")

# Meet = gcd, Join = lcm in divisor lattice
print(f"\nMeet and Join in divisor lattice of {n}:")
for a, b in [(4, 6), (2, 3), (4, 3), (6, 12)]:
    print(f"  meet({a},{b}) = gcd = {math.gcd(a,b)}, join({a},{b}) = lcm = {math.lcm(a,b)}")

# Step 2: Power set lattice
def power_set(s):
    result = []
    for r in range(len(s) + 1):
        for combo in combinations(s, r):
            result.append(frozenset(combo))
    return result

S = {'a', 'b', 'c'}
ps = power_set(S)
print(f"\nPower set of {S}:")
for s in sorted(ps, key=len):
    print(f"  {set(s) if s else '{}'}")

# Meet = intersection, Join = union
print("\nMeet and Join in P({a,b,c}):")
pairs = [(frozenset({'a','b'}), frozenset({'b','c'})),
         (frozenset({'a'}), frozenset({'c'})),
         (frozenset({'a','b'}), frozenset({'a','c'}))]
for a, b in pairs:
    meet = a & b  # intersection
    join = a | b  # union
    print(f"  meet({set(a)}, {set(b)}) = {set(meet)}")
    print(f"  join({set(a)}, {set(b)}) = {set(join)}")

# Step 3: Verify lattice properties
print("\nVerifying lattice properties (divisor lattice of 12):")
elements = divisors(12)

# Idempotent
idemp = all(math.gcd(a, a) == a and math.lcm(a, a) == a for a in elements)
print(f"  Idempotent: {idemp}")

# Absorption: a join (a meet b) = a
absorb = all(
    math.lcm(a, math.gcd(a, b)) == a and math.gcd(a, math.lcm(a, b)) == a
    for a in elements for b in elements
)
print(f"  Absorption: {absorb}")

# Distributive: a meet (b join c) = (a meet b) join (a meet c)
distrib = all(
    math.gcd(a, math.lcm(b, c)) == math.lcm(math.gcd(a, b), math.gcd(a, c))
    for a in elements for b in elements for c in elements
)
print(f"  Distributive: {distrib}")

# Step 4: Fixed point iteration (Knaster-Tarski)
# On the lattice of subsets of {1,2,3,4,5} with f(S) = S union {successors of elements in S}
def monotone_f(s, universe={1,2,3,4,5}):
    """Add successor of each element (mod 5+1) that's in universe."""
    result = set(s)
    for x in s:
        if x + 1 in universe:
            result.add(x + 1)
    return frozenset(result)

print("\nFixed-point iteration (Knaster-Tarski):")
current = frozenset({1})
for i in range(10):
    next_val = monotone_f(current)
    print(f"  Step {i}: {set(current)} -> {set(next_val)}")
    if next_val == current:
        print(f"  Fixed point reached: {set(current)}")
        break
    current = next_val
```

## Connection to CS / Games / AI / Business / Industry

- **Type systems:** Subtyping in languages like Java/TypeScript forms a lattice.
  The compiler computes least upper bounds (join) for type inference.
  `Object` is top, `Nothing`/`never` is bottom.
- **Static analysis:** Abstract interpretation computes program properties by
  iterating monotone functions on lattices to a fixed point (Knaster-Tarski).
- **Database query optimisation:** Query plans form a lattice; optimisers search
  for the minimum-cost element.
- **Logic programming:** The semantics of Datalog/Prolog is defined as the
  least fixed point of a monotone operator on the lattice of interpretations.
- **Formal verification:** Model checking uses BDD lattices to represent state
  spaces.

## Check Your Understanding

1. Draw the Hasse diagram for the divisor lattice of 30. Is it distributive?
2. Show that the set of all substrings of "abc" ordered by the "is a substring
   of" relation is a partial order but NOT a lattice (find two elements with
   no join).
3. Implement a function that checks whether a given finite poset (represented
   as a set of pairs) is a lattice, by verifying that every pair has a unique
   meet and join.
