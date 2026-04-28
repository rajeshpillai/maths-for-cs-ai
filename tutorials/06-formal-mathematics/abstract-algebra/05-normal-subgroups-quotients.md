# Normal Subgroups and Quotient Groups

## Intuition

A quotient group is what you get when you "zoom out" — you stop
distinguishing individual elements and instead treat whole cosets as single
objects. This only works if the subgroup is "normal," meaning it behaves
the same on the left and right. Quotient groups are the mathematical
foundation of abstraction: collapsing detail while preserving structure.

## Prerequisites

- Tier 16, Lesson 4 (Cosets and Lagrange's Theorem)

## From First Principles

### Normal Subgroup

$N \leq G$ is **normal** in $G$, written $N \unlhd G$, if:

$$\forall g \in G,\; gN = Ng$$

Equivalently: $\forall g \in G,\; \forall n \in N,\; gng^{-1} \in N$.

(The element $gng^{-1}$ is called a **conjugate** of $n$ by $g$.)

### When is a Subgroup Normal?

- Every subgroup of an **abelian** group is normal (since $gN = Ng$ always).
- The **kernel** of any group homomorphism is normal (we will prove this in Lesson 6).
- Any subgroup of index 2 is normal (only two cosets: $H$ and $G \setminus H$).

### Non-Example

In $S_3$, let $H = \{e, (1\;2)\}$. Then:
- $(1\;3) H = \{(1\;3), (1\;2\;3)\}$
- $H(1\;3) = \{(1\;3), (1\;3\;2)\}$

Since $(1\;3)H \neq H(1\;3)$, $H$ is NOT normal in $S_3$.

### The Quotient Group $G/N$

If $N \unlhd G$, define the **quotient group** $G/N$ as:
- **Elements**: the distinct cosets $\{gN : g \in G\}$.
- **Operation**: $(g_1 N)(g_2 N) = (g_1 g_2)N$.

This operation is **well-defined** precisely because $N$ is normal.

**Why well-defined?** Suppose $g_1 N = g_1' N$ and $g_2 N = g_2' N$. We need $(g_1 g_2)N = (g_1' g_2')N$.
Since $g_1' = g_1 n_1$ and $g_2' = g_2 n_2$ for some $n_1, n_2 \in N$:
$$g_1' g_2' = g_1 n_1 g_2 n_2 = g_1 g_2 (g_2^{-1} n_1 g_2) n_2$$
Since $N$ is normal, $g_2^{-1} n_1 g_2 \in N$, so $(g_2^{-1} n_1 g_2) n_2 \in N$, giving $g_1' g_2' \in (g_1 g_2)N$.

### Example: $\mathbb{Z}/3\mathbb{Z}$

$G = \mathbb{Z}$, $N = 3\mathbb{Z} = \{\ldots, -3, 0, 3, 6, \ldots\}$.

Cosets:
- $0 + 3\mathbb{Z} = \{\ldots, -3, 0, 3, 6, \ldots\}$
- $1 + 3\mathbb{Z} = \{\ldots, -2, 1, 4, 7, \ldots\}$
- $2 + 3\mathbb{Z} = \{\ldots, -1, 2, 5, 8, \ldots\}$

$\mathbb{Z}/3\mathbb{Z} = \{\bar{0}, \bar{1}, \bar{2}\}$ with addition mod 3. This IS $\mathbb{Z}_3$.

### Pen & Paper: $\mathbb{Z}_6 / \langle 3 \rangle$

$G = \mathbb{Z}_6$, $N = \langle 3 \rangle = \{0, 3\}$.

Cosets:
- $\bar{0} = \{0, 3\}$
- $\bar{1} = \{1, 4\}$
- $\bar{2} = \{2, 5\}$

Cayley table of $G/N$:

| $+$ | $\bar{0}$ | $\bar{1}$ | $\bar{2}$ |
|-----|-----------|-----------|-----------|
| $\bar{0}$ | $\bar{0}$ | $\bar{1}$ | $\bar{2}$ |
| $\bar{1}$ | $\bar{1}$ | $\bar{2}$ | $\bar{0}$ |
| $\bar{2}$ | $\bar{2}$ | $\bar{0}$ | $\bar{1}$ |

This is $\mathbb{Z}_3$! So $\mathbb{Z}_6 / \langle 3 \rangle \cong \mathbb{Z}_3$.

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

# Visualise quotient group Z_6 / <3>
fig, axes = plt.subplots(1, 2, figsize=(10, 4))

# Left: Z_6 with coset coloring
n = 6
theta = np.linspace(0, 2*np.pi, n, endpoint=False)
xs, ys = np.sin(theta), np.cos(theta)
colors = ['#e74c3c', '#2ecc71', '#3498db']
coset_map = {0: 0, 3: 0, 1: 1, 4: 1, 2: 2, 5: 2}

for i in range(n):
    c = colors[coset_map[i]]
    axes[0].plot(xs[i], ys[i], 'o', color=c, markersize=20)
    axes[0].text(xs[i], ys[i], str(i), ha='center', va='center',
                 fontsize=12, fontweight='bold')
axes[0].set_title('Z₆ colored by cosets of <3>')
axes[0].set_aspect('equal')
axes[0].axis('off')

# Right: The quotient Z_6/<3> ≅ Z_3
theta3 = np.linspace(0, 2*np.pi, 3, endpoint=False)
xs3, ys3 = np.sin(theta3), np.cos(theta3)
labels = ['{0,3}', '{1,4}', '{2,5}']

for i in range(3):
    axes[1].plot(xs3[i], ys3[i], 'o', color=colors[i], markersize=30)
    axes[1].text(xs3[i], ys3[i], labels[i], ha='center', va='center',
                 fontsize=9, fontweight='bold')
axes[1].set_title('Z₆/<3> ≅ Z₃')
axes[1].set_aspect('equal')
axes[1].axis('off')

plt.suptitle('Quotient Group: Collapsing Cosets', fontsize=14)
plt.tight_layout()
plt.savefig('quotient_group.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Normal Subgroups and Quotient Groups ─────────────────

# Step 1: Check normality in Z_n (always normal, since abelian)
def is_normal_Zn(n, H):
    """In Z_n every subgroup is normal (abelian group)."""
    for g in range(n):
        left_coset = frozenset((g + h) % n for h in H)
        right_coset = frozenset((h + g) % n for h in H)
        if left_coset != right_coset:
            return False
    return True

print("=== Normality in Z_6 ===")
H = {0, 3}
print(f"H = {H} normal in Z_6: {is_normal_Zn(6, H)}")

# Step 2: Build quotient group Z_6 / <3>
def quotient_group_Zn(n, H):
    """Build quotient group as coset representatives."""
    cosets = {}
    coset_list = []
    for g in range(n):
        coset = frozenset((g + h) % n for h in H)
        if coset not in cosets:
            cosets[coset] = len(coset_list)
            coset_list.append(coset)
    return coset_list, cosets

coset_list, cosets = quotient_group_Zn(6, H)
print(f"\nCosets of <3> in Z_6:")
for i, coset in enumerate(coset_list):
    print(f"  [{i}]: {sorted(coset)}")

# Step 3: Cayley table of quotient group
print(f"\nCayley table of Z_6/<3>:")
k = len(coset_list)
header = "  + | " + " ".join(f"[{i}]" for i in range(k))
print(header)
print("  " + "-" * (len(header) - 2))
for i in range(k):
    row = []
    for j in range(k):
        # Pick representatives and compose
        rep_i = min(coset_list[i])
        rep_j = min(coset_list[j])
        result = (rep_i + rep_j) % 6
        result_coset = frozenset((result + h) % 6 for h in H)
        row.append(f"[{cosets[result_coset]}]")
    print(f"  [{i}] | {' '.join(row)}")

# Step 4: Non-example — check normality in S_3
print("\n=== Normality check in S_3 ===")
def compose_perm(p, q):
    return tuple(p[q[i]] for i in range(len(p)))

def inverse_perm(p):
    inv = [0] * len(p)
    for i, v in enumerate(p):
        inv[v] = i
    return tuple(inv)

# S_3 elements
e = (0, 1, 2)
S3 = [(0,1,2), (1,0,2), (0,2,1), (2,1,0), (1,2,0), (2,0,1)]

# H = {e, (0 1)} = {(0,1,2), (1,0,2)}
H_s3 = [(0,1,2), (1,0,2)]

# Check gHg^{-1} ⊆ H for all g
normal = True
for g in S3:
    g_inv = inverse_perm(g)
    for h in H_s3:
        conjugate = compose_perm(compose_perm(g, h), g_inv)
        if conjugate not in [tuple(x) for x in H_s3]:
            print(f"  g={g}, h={h}: ghg⁻¹={conjugate} ∉ H")
            normal = False
print(f"H = {{e, (1 2)}} normal in S_3: {normal}")

# Step 5: Index-2 subgroups are always normal
# A_3 = {e, (1 2 3), (1 3 2)} has index 2 in S_3
A3 = [(0,1,2), (1,2,0), (2,0,1)]
normal_a3 = True
for g in S3:
    g_inv = inverse_perm(g)
    for h in A3:
        conjugate = compose_perm(compose_perm(g, h), g_inv)
        if tuple(conjugate) not in [tuple(x) for x in A3]:
            normal_a3 = False
print(f"A_3 (index 2) normal in S_3: {normal_a3}")
```

## Connection to CS / Games / AI / Business / Industry

- **Modular arithmetic** IS a quotient group: $\mathbb{Z}/n\mathbb{Z} = \mathbb{Z}_n$, the foundation of cryptography and hashing.
- **Equivalence classes** in compilers (e.g., treating all expressions that reduce to the same value as identical) are quotient constructions.
- **Congruence relations** in abstract interpretation (static analysis) form quotient structures.
- **Symmetry reduction** in game AI: if a game board has symmetries (normal subgroup of moves), quotient the state space to avoid redundant search.
- **GF(2^8) S-box construction in AES (NIST FIPS 197)** — built as the quotient ring $\mathbb{Z}_2[x] / (x^8+x^4+x^3+x+1)$; protects classified U.S. government data and every TLS 1.3 session, including all Visa/Mastercard online transactions.
- **Quotient automata in chip verification at Intel and AMD** — Cadence JasperGold and Synopsys VC Formal collapse equivalent register states using bisimulation quotients, making post-silicon validation tractable for billion-transistor SoCs.
- **Modal-shape reduction in mechanical FEA** — ANSYS and Abaqus quotient out rigid-body motions (a 6-dimensional normal subgroup of $SE(3)$) before computing eigenmodes for vibration analysis of jet engines and bridges.
- **Customer cohort analytics at Stripe and Shopify** — daily revenue-per-cohort is the quotient of total payments by user-equivalence classes (signup-week cosets); this quotient structure powers retention dashboards used by every SaaS company.

## Check Your Understanding

1. Verify that $\{0, 2, 4\}$ is a normal subgroup of $\mathbb{Z}_6$ and build the quotient group.
2. Show that $A_n$ (even permutations) is a normal subgroup of $S_n$ for all $n$.
3. What is $\mathbb{Z}_{12} / \langle 4 \rangle$? List the cosets and build the Cayley table.
