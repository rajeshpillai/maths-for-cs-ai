# Cosets and Lagrange's Theorem

## Intuition

If you take a subgroup $H$ and "shift" it by some element $g$, you get a
**coset** $gH$. The remarkable fact is that every coset has exactly the same
size as $H$, and together the cosets partition the entire group with no
overlaps. This leads to **Lagrange's theorem**: the size of any subgroup must
divide the size of the group. This simple result has enormous consequences.

## Prerequisites

- Tier 16, Lesson 2 (Subgroups and Cyclic Groups)

## From First Principles

### Left Cosets

Let $H \leq G$ and $g \in G$. The **left coset** of $H$ by $g$ is:

$$gH = \{g \star h : h \in H\}$$

**Right coset**: $Hg = \{h \star g : h \in H\}$.

In abelian groups, $gH = Hg$ always. In non-abelian groups, they may differ.

### Key Properties

1. $|gH| = |H|$ for every $g$ (left multiplication by $g$ is a bijection).
2. Two cosets are either identical or disjoint: $g_1 H = g_2 H$ or $g_1 H \cap g_2 H = \emptyset$.
3. The cosets partition $G$: $G = g_1 H \cup g_2 H \cup \cdots \cup g_k H$ (disjoint).

### Pen & Paper: Cosets of $\{0, 3\}$ in $\mathbb{Z}_6$

$H = \{0, 3\} \leq (\mathbb{Z}_6, +)$.

Cosets $g + H$ (additive notation):

- $0 + H = \{0, 3\}$
- $1 + H = \{1, 4\}$
- $2 + H = \{2, 5\}$
- $3 + H = \{3, 0\} = \{0, 3\}$ (same as $0 + H$)
- $4 + H = \{4, 1\} = \{1, 4\}$ (same as $1 + H$)
- $5 + H = \{5, 2\} = \{2, 5\}$ (same as $2 + H$)

Three distinct cosets: $\{0,3\}$, $\{1,4\}$, $\{2,5\}$. Each has size 2.

### Lagrange's Theorem

**Theorem**: If $G$ is a finite group and $H \leq G$, then $|H|$ divides $|G|$.

**Proof**:
1. The distinct left cosets of $H$ partition $G$.
2. Each coset has $|H|$ elements.
3. If there are $k$ distinct cosets: $|G| = k \cdot |H|$.
4. Therefore $|H|$ divides $|G|$. $\square$

The number $k = |G|/|H|$ is called the **index** of $H$ in $G$, written $[G : H]$.

### Consequences of Lagrange's Theorem

1. **Order of element divides group order**: $|g|$ divides $|G|$ (since $\langle g \rangle \leq G$).

2. **Fermat's Little Theorem**: If $p$ is prime and $\gcd(a, p) = 1$, then $a^{p-1} \equiv 1 \pmod{p}$.

   Proof: $a \in \mathbb{Z}_p^*$, which has order $p - 1$. By Lagrange, $|a|$ divides $p-1$, so $a^{p-1} = (a^{|a|})^{(p-1)/|a|} = e^{(p-1)/|a|} = e = 1$.

3. **Groups of prime order are cyclic**: If $|G| = p$ (prime), the only subgroups are $\{e\}$ and $G$, so any $g \neq e$ generates $G$.

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

# Visualise cosets of H = {0, 4, 8} in Z_12
fig, ax = plt.subplots(figsize=(8, 6))

n = 12
H = {0, 4, 8}
colors = ['#e74c3c', '#2ecc71', '#3498db', '#f39c12']

theta = np.linspace(0, 2 * np.pi, n, endpoint=False)
xs = np.sin(theta)
ys = np.cos(theta)

# Find distinct cosets
cosets = []
assigned = set()
for g in range(n):
    coset = frozenset((g + h) % n for h in H)
    if coset not in assigned:
        cosets.append((g, coset))
        assigned.add(coset)

for idx, (rep, coset) in enumerate(cosets):
    for elem in coset:
        ax.plot(xs[elem], ys[elem], 'o', color=colors[idx],
                markersize=20, zorder=5)
        ax.text(xs[elem], ys[elem], str(elem), ha='center', va='center',
                fontsize=10, fontweight='bold', zorder=6)

# Draw circle
theta_smooth = np.linspace(0, 2*np.pi, 100)
ax.plot(np.sin(theta_smooth), np.cos(theta_smooth), 'k-', alpha=0.2)

# Legend
for idx, (rep, coset) in enumerate(cosets):
    ax.plot([], [], 'o', color=colors[idx], markersize=10,
            label=f'{rep}+H = {sorted(coset)}')
ax.legend(loc='lower right', fontsize=9)
ax.set_title('Cosets of H = {0,4,8} in Z₁₂ partition the group')
ax.set_aspect('equal')
ax.axis('off')
plt.tight_layout()
plt.savefig('cosets_z12.png', dpi=100)
plt.show()
```

## Python Verification

```python
from math import gcd

# ── Cosets and Lagrange's Theorem ────────────────────────

# Step 1: Compute cosets in Z_n
def left_cosets(n, H):
    """Compute distinct left cosets of H in Z_n."""
    cosets = []
    seen = set()
    for g in range(n):
        coset = frozenset((g + h) % n for h in H)
        if coset not in seen:
            seen.add(coset)
            cosets.append((g, sorted(coset)))
    return cosets

# Step 2: Example — cosets of {0, 3} in Z_6
print("=== Cosets of {0,3} in Z_6 ===")
H = {0, 3}
cosets = left_cosets(6, H)
for rep, coset in cosets:
    print(f"  {rep} + H = {coset}")
print(f"Number of cosets [G:H] = {len(cosets)}")
print(f"|G| = 6, |H| = 2, [G:H] = 6/2 = {6//2}")

# Step 3: Verify Lagrange's theorem for all subgroups of Z_12
print("\n=== Lagrange's Theorem for Z_12 ===")
n = 12
# Find all subgroups (they are cyclic: <d> for each d dividing n)
for d in range(n):
    H = set()
    current = 0
    while True:
        H.add(current)
        current = (current + d) % n
        if current in H:
            break
    H_size = len(H)
    divides = (n % H_size == 0)
    print(f"  <{d}> = {sorted(H)}, |H|={H_size}, "
          f"{H_size} divides {n}: {divides}")

# Step 4: Verify Fermat's Little Theorem
print("\n=== Fermat's Little Theorem ===")
for p in [3, 5, 7, 11, 13]:
    print(f"  p = {p}:")
    for a in range(1, p):
        result = pow(a, p - 1, p)
        print(f"    {a}^{p-1} mod {p} = {result}", end="")
        assert result == 1
        print(" ✓")

# Step 5: Groups of prime order are cyclic
print("\n=== Groups of prime order ===")
for p in [2, 3, 5, 7]:
    print(f"  Z_{p}: every non-identity element is a generator:")
    for g in range(1, p):
        generated = set()
        current = 0
        for _ in range(p):
            current = (current + g) % p
            generated.add(current)
        print(f"    <{g}> = {sorted(generated)}, "
              f"generates all: {generated == set(range(p))}")

# Step 6: Verify cosets partition the group
print("\n=== Cosets partition Z_12 ===")
H = {0, 4, 8}
cosets = left_cosets(12, H)
all_elements = set()
for _, coset in cosets:
    coset_set = set(coset)
    overlap = all_elements & coset_set
    assert len(overlap) == 0, f"Overlap: {overlap}"
    all_elements |= coset_set
print(f"Cosets: {[c for _, c in cosets]}")
print(f"Union = {sorted(all_elements)} = Z_12: {all_elements == set(range(12))}")
print(f"Pairwise disjoint: True")
```

## Connection to CS / Games / AI / Business / Industry

- **Fermat's Little Theorem** powers modular exponentiation in RSA encryption.
- **Hash table sizing**: choosing prime table sizes exploits the fact that $\mathbb{Z}_p^*$ is cyclic.
- **Error-correcting codes**: coset leaders in linear codes determine syndrome decoding.
- **Load balancing**: partitioning data into equal-sized cosets ensures even distribution.
- **RSA signing in Apple Pay/Visa SecureID** — relies on Fermat-Euler ($a^{\phi(n)} \equiv 1 \pmod{n}$, a Lagrange consequence) to make $e \cdot d \equiv 1$ inverses work; tens of billions of payment authorizations per year depend on this.
- **Coset-leader syndrome decoding in 5G NR LDPC codes** (3GPP TS 38.212) — partitions $\mathbb{F}_2^n$ into cosets of the code's null space; Qualcomm baseband chips use this to recover bits below thermal noise.
- **CDC inventory partitioning at Amazon Fulfillment Centers** — SKUs are partitioned into equal-cardinality cosets across pick-faces so robot pickers (Kiva/Amazon Robotics) achieve balanced traversal cost; uneven cosets cost roughly 5% in throughput.
- **Cosets in MRI parallel imaging (SENSE/GRAPPA)** — k-space is undersampled into cosets of a periodic sublattice; Siemens and GE scanners reconstruct full images using coset arithmetic, cutting scan time 4-8x for cardiac MRI.

## Check Your Understanding

1. Find all left cosets of $H = \{0, 5, 10\}$ in $\mathbb{Z}_{15}$.
2. Can a group of order 15 have a subgroup of order 4? Why or why not?
3. Use Lagrange's theorem to prove: every group of order 5 is isomorphic to $\mathbb{Z}_5$.
