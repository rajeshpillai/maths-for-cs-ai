# Groups — The Foundation of Symmetry

## Intuition

A **group** captures the idea of symmetry in its purest form. Rotating a
square, adding integers, composing permutations — all follow the same four
rules. Once you recognise a group, every theorem about groups applies for
free. Groups are the reason a Rubik's Cube can always be solved.

## Prerequisites

- Tier 15, Lesson 8 (Set Theory Proofs)
- Tier 2, Lesson 6 (Determinants — for matrix group examples)

## From First Principles

### Definition

A **group** $(G, \star)$ is a set $G$ with a binary operation $\star$ satisfying:

1. **Closure**: $\forall a, b \in G,\; a \star b \in G$.
2. **Associativity**: $\forall a, b, c \in G,\; (a \star b) \star c = a \star (b \star c)$.
3. **Identity**: $\exists e \in G,\; \forall a \in G,\; e \star a = a \star e = a$.
4. **Inverse**: $\forall a \in G,\; \exists a^{-1} \in G,\; a \star a^{-1} = a^{-1} \star a = e$.

If additionally $a \star b = b \star a$ for all $a, b$, the group is **abelian** (commutative).

### Example 1: $(\mathbb{Z}, +)$

| Axiom | Check |
|-------|-------|
| Closure | sum of integers is an integer |
| Associativity | $(a+b)+c = a+(b+c)$ |
| Identity | $e = 0$: $a + 0 = a$ |
| Inverse | $a^{-1} = -a$: $a + (-a) = 0$ |

Abelian: $a + b = b + a$. Yes.

### Example 2: Symmetries of a Square ($D_4$)

Label corners 1, 2, 3, 4 (clockwise). Symmetries:

| Symbol | Transformation |
|--------|---------------|
| $e$ | identity (do nothing) |
| $r$ | rotate 90 degrees clockwise |
| $r^2$ | rotate 180 degrees |
| $r^3$ | rotate 270 degrees |
| $s$ | reflect across vertical axis |
| $sr$ | reflect, then rotate 90 |
| $sr^2$ | reflect, then rotate 180 |
| $sr^3$ | reflect, then rotate 270 |

This is the **dihedral group** $D_4$ with 8 elements. It is NOT abelian: $rs \neq sr$.

### Cayley Table (Pen & Paper)

A Cayley table is the "multiplication table" for a group. For $(\mathbb{Z}_4, +)$:

| $+$ | 0 | 1 | 2 | 3 |
|-----|---|---|---|---|
| **0** | 0 | 1 | 2 | 3 |
| **1** | 1 | 2 | 3 | 0 |
| **2** | 2 | 3 | 0 | 1 |
| **3** | 3 | 0 | 1 | 2 |

Each row and column is a permutation of $\{0, 1, 2, 3\}$ — this is always true in a group (Latin square property).

### Non-Examples

- $(\mathbb{N}, +)$: no inverses (no negatives). NOT a group.
- $(\mathbb{Z}, \times)$: no inverse for $2$ (since $1/2 \notin \mathbb{Z}$). NOT a group.
- $(\mathbb{R}, \times)$: $0$ has no inverse. NOT a group. But $(\mathbb{R}^*, \times)$ IS a group.

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

# Visualise symmetries of a square
fig, axes = plt.subplots(2, 4, figsize=(12, 6))

def draw_square(ax, corners, title):
    corners_closed = list(corners) + [corners[0]]
    xs = [c[0] for c in corners_closed]
    ys = [c[1] for c in corners_closed]
    ax.plot(xs, ys, 'b-', linewidth=2)
    labels = ['1', '2', '3', '4']
    for i, (x, y) in enumerate(corners):
        ax.plot(x, y, 'ro', markersize=8)
        ax.text(x * 1.3, y * 1.3, labels[i], ha='center', fontsize=10)
    ax.set_xlim(-1.5, 1.5)
    ax.set_ylim(-1.5, 1.5)
    ax.set_aspect('equal')
    ax.set_title(title, fontsize=9)
    ax.axis('off')

# Base corners: 1=top-left, 2=top-right, 3=bot-right, 4=bot-left
base = [(-1, 1), (1, 1), (1, -1), (-1, -1)]

def rotate(corners, angle):
    c, s = np.cos(angle), np.sin(angle)
    return [(c*x - s*y, s*x + c*y) for x, y in corners]

def reflect_v(corners):
    return [(-x, y) for x, y in corners]

transformations = [
    (base, 'e (identity)'),
    (rotate(base, -np.pi/2), 'r (90°)'),
    (rotate(base, -np.pi), 'r² (180°)'),
    (rotate(base, -3*np.pi/2), 'r³ (270°)'),
    (reflect_v(base), 's (reflect)'),
    (rotate(reflect_v(base), -np.pi/2), 'sr'),
    (rotate(reflect_v(base), -np.pi), 'sr²'),
    (rotate(reflect_v(base), -3*np.pi/2), 'sr³'),
]

for ax, (corners, title) in zip(axes.flat, transformations):
    draw_square(ax, corners, title)

plt.suptitle('D₄: Symmetries of a Square', fontsize=14)
plt.tight_layout()
plt.savefig('d4_symmetries.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Groups: Verification ─────────────────────────────────

# Step 1: Z_n under addition mod n
def verify_group_Zn(n):
    """Verify (Z_n, +) is a group."""
    G = list(range(n))
    op = lambda a, b: (a + b) % n

    # Closure
    for a in G:
        for b in G:
            assert op(a, b) in G, f"Closure failed: {a}+{b}"

    # Associativity
    for a in G:
        for b in G:
            for c in G:
                assert op(op(a, b), c) == op(a, op(b, c))

    # Identity
    e = 0
    for a in G:
        assert op(e, a) == a and op(a, e) == a

    # Inverse
    for a in G:
        inv = (n - a) % n
        assert op(a, inv) == e and op(inv, a) == e

    print(f"(Z_{n}, +) is a group. |G| = {n}")

for n in [2, 3, 4, 5, 6]:
    verify_group_Zn(n)

# Step 2: Build and print Cayley table for Z_4
print("\nCayley table for (Z_4, +):")
n = 4
header = "  + | " + " ".join(str(i) for i in range(n))
print(header)
print("  " + "-" * (len(header) - 2))
for a in range(n):
    row = " ".join(str((a + b) % n) for b in range(n))
    print(f"  {a} | {row}")

# Step 3: Verify D_4 (dihedral group of square)
print("\n=== D_4: Dihedral Group of Square ===")
# Represent as permutations of {0,1,2,3}
# r = (0 1 2 3) -> (1 2 3 0), s = (0 1 2 3) -> (0 3 2 1)

def compose(p, q):
    """Compose permutations: (p∘q)(i) = p(q(i))"""
    return tuple(p[q[i]] for i in range(len(p)))

e = (0, 1, 2, 3)
r = (1, 2, 3, 0)  # rotate 90
r2 = compose(r, r)
r3 = compose(r2, r)
s = (3, 2, 1, 0)  # reflect

D4 = set()
element = e
for _ in range(4):
    D4.add(element)
    D4.add(compose(s, element))
    element = compose(r, element)

print(f"|D_4| = {len(D4)} (expected 8)")

# Check non-commutativity
rs = compose(r, s)
sr = compose(s, r)
print(f"r∘s = {rs}")
print(f"s∘r = {sr}")
print(f"r∘s == s∘r? {rs == sr} (D_4 is non-abelian)")

# Step 4: Verify Latin square property
print("\nLatin square property of Z_5 Cayley table:")
n = 5
for a in range(n):
    row = [(a + b) % n for b in range(n)]
    print(f"  Row {a}: {row}, is permutation: {sorted(row) == list(range(n))}")
```

## Connection to CS / Games / AI / Business / Industry

- **Rubik's Cube**: the group of cube moves has $4.3 \times 10^{19}$ elements; group theory proves every position is solvable in $\leq 20$ moves.
- **Cryptography**: Diffie-Hellman key exchange relies on the group $(\mathbb{Z}_p^*, \times)$.
- **Error-correcting codes**: cyclic codes use properties of cyclic groups.
- **Graphics**: rotation and reflection groups describe symmetries of 3D models.
- **Physics simulations**: conservation laws correspond to symmetry groups (Noether's theorem).

## Check Your Understanding

1. Verify that $(\{1, -1, i, -i\}, \times)$ is a group by building its Cayley table.
2. Is $(\mathbb{Z}_6^*, \times)$ (units modulo 6) a group? List its elements and check.
3. Prove that in any group, the identity element is unique. (Hint: assume two identities $e$ and $e'$, then compute $e \star e'$ two ways.)
