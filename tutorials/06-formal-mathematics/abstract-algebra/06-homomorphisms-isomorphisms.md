# Group Homomorphisms and Isomorphisms

## Intuition

A **homomorphism** is a function between groups that respects the group
operation — it preserves structure. An **isomorphism** is a bijective
homomorphism, meaning the two groups are structurally identical, just wearing
different labels. The **First Isomorphism Theorem** says that quotienting by
the kernel always gives something isomorphic to the image — one of the most
powerful results in algebra.

## Prerequisites

- Tier 16, Lesson 5 (Normal Subgroups and Quotient Groups)

## From First Principles

### Definition

A function $\phi: G \to H$ between groups is a **homomorphism** if:

$$\phi(g_1 \star_G g_2) = \phi(g_1) \star_H \phi(g_2) \quad \forall g_1, g_2 \in G$$

It "translates" the operation of $G$ into the operation of $H$.

### Key Properties

If $\phi: G \to H$ is a homomorphism:

1. $\phi(e_G) = e_H$ (identity maps to identity).
2. $\phi(g^{-1}) = \phi(g)^{-1}$ (inverses map to inverses).
3. $\phi(g^n) = \phi(g)^n$ for all $n \in \mathbb{Z}$.

### Kernel and Image

**Kernel**: $\ker(\phi) = \{g \in G : \phi(g) = e_H\}$

**Image**: $\text{im}(\phi) = \{\phi(g) : g \in G\}$

**Theorem**: $\ker(\phi) \unlhd G$ (the kernel is always a normal subgroup).

**Proof**: Let $n \in \ker(\phi)$ and $g \in G$.
$\phi(gng^{-1}) = \phi(g)\phi(n)\phi(g^{-1}) = \phi(g) \cdot e_H \cdot \phi(g)^{-1} = e_H$.
So $gng^{-1} \in \ker(\phi)$. $\square$

### Example 1: $\phi: \mathbb{Z} \to \mathbb{Z}_n$, $\phi(k) = k \bmod n$

- Homomorphism: $\phi(a + b) = (a + b) \bmod n = (a \bmod n) + (b \bmod n) = \phi(a) + \phi(b)$.
- Kernel: $\ker(\phi) = n\mathbb{Z} = \{0, \pm n, \pm 2n, \ldots\}$.
- Image: $\text{im}(\phi) = \mathbb{Z}_n$.

### Example 2: Determinant as Homomorphism

$\det: GL_n(\mathbb{R}) \to \mathbb{R}^*$ where $GL_n$ is the group of invertible $n \times n$ matrices.

$\det(AB) = \det(A) \det(B)$ — this IS the homomorphism property.

$\ker(\det) = SL_n(\mathbb{R})$ (matrices with determinant 1).

### Isomorphisms

An **isomorphism** is a bijective homomorphism. If $\phi: G \to H$ is an isomorphism, we write $G \cong H$.

Isomorphic groups are "the same group" with different labels.

### The First Isomorphism Theorem

If $\phi: G \to H$ is a homomorphism, then:

$$G / \ker(\phi) \cong \text{im}(\phi)$$

The isomorphism is $\bar{\phi}: g \ker(\phi) \mapsto \phi(g)$.

**Example**: $\phi: \mathbb{Z} \to \mathbb{Z}_n$, $\phi(k) = k \bmod n$.
$\ker(\phi) = n\mathbb{Z}$, $\text{im}(\phi) = \mathbb{Z}_n$.
First Isomorphism Theorem: $\mathbb{Z} / n\mathbb{Z} \cong \mathbb{Z}_n$. Which we already knew!

### Visualisation

```python
import matplotlib.pyplot as plt

# Visualise a homomorphism phi: Z_6 -> Z_3
fig, ax = plt.subplots(figsize=(8, 5))

# Z_6 elements on the left
for i in range(6):
    ax.plot(0, 5 - i, 'bo', markersize=15)
    ax.text(-0.3, 5 - i, str(i), ha='center', va='center', fontsize=12)

# Z_3 elements on the right
for i in range(3):
    ax.plot(3, 4 - i * 2, 'ro', markersize=20)
    ax.text(3.3, 4 - i * 2, str(i), ha='center', va='center', fontsize=12)

# Draw arrows (phi(k) = k mod 3)
colors = ['#e74c3c', '#2ecc71', '#3498db']
for i in range(6):
    target = i % 3
    ax.annotate('', xy=(2.8, 4 - target * 2),
                xytext=(0.2, 5 - i),
                arrowprops=dict(arrowstyle='->', lw=1.5,
                                color=colors[target], alpha=0.7))

ax.text(0, 5.7, 'Z₆', ha='center', fontsize=14, fontweight='bold')
ax.text(3, 5.7, 'Z₃', ha='center', fontsize=14, fontweight='bold')
ax.text(1.5, 6.2, 'φ(k) = k mod 3', ha='center', fontsize=12)
ax.text(-0.5, 3, 'ker = {0, 3}', ha='center', fontsize=10, rotation=90,
        color='red')

ax.set_xlim(-1, 4)
ax.set_ylim(-1, 7)
ax.axis('off')
plt.title('Group Homomorphism Z₆ → Z₃')
plt.tight_layout()
plt.savefig('homomorphism.png', dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np

# ── Homomorphisms and Isomorphisms ───────────────────────

# Step 1: Verify phi: Z -> Z_n is a homomorphism
print("=== phi: Z -> Z_5, phi(k) = k mod 5 ===")
n = 5
phi = lambda k: k % n

for a in range(-10, 11):
    for b in range(-10, 11):
        assert phi(a + b) == (phi(a) + phi(b)) % n
print("Homomorphism property verified for a,b in [-10,10]")

# Step 2: Kernel and image
ker = {k for k in range(-20, 21) if phi(k) == 0}
print(f"ker(phi) ∩ [-20,20] = {sorted(ker)}")
print(f"These are multiples of {n}")
im = {phi(k) for k in range(-20, 21)}
print(f"im(phi) = {sorted(im)}")

# Step 3: Verify determinant homomorphism
print("\n=== det: GL_2(R) -> R* ===")
np.random.seed(42)
for _ in range(5):
    A = np.random.randn(2, 2)
    B = np.random.randn(2, 2)
    det_AB = np.linalg.det(A @ B)
    det_A_det_B = np.linalg.det(A) * np.linalg.det(B)
    print(f"  det(AB) = {det_AB:.6f}, det(A)*det(B) = {det_A_det_B:.6f}, "
          f"match: {abs(det_AB - det_A_det_B) < 1e-10}")

# Step 4: First Isomorphism Theorem example
# phi: Z_6 -> Z_3, phi(k) = k mod 3
print("\n=== First Isomorphism Theorem: Z_6/ker ≅ Z_3 ===")
phi63 = lambda k: k % 3
ker_phi = {k for k in range(6) if phi63(k) == 0}
print(f"ker(phi) = {ker_phi}")

# Build quotient Z_6 / ker
cosets = {}
coset_list = []
for g in range(6):
    coset = frozenset((g + h) % 6 for h in ker_phi)
    if coset not in cosets:
        cosets[coset] = len(coset_list)
        coset_list.append(coset)

print(f"Cosets:")
for i, c in enumerate(coset_list):
    rep = min(c)
    print(f"  [{i}] = {sorted(c)} → phi(rep) = {phi63(rep)}")

# Verify quotient is isomorphic to Z_3
print(f"\nQuotient has {len(coset_list)} elements = |Z_3| = 3")

# Step 5: Check isomorphism between Z_2 x Z_3 and Z_6
print("\n=== Z_2 × Z_3 ≅ Z_6? ===")
# Map (a, b) -> (3a + 4b) mod 6
phi_prod = lambda a, b: (3 * a + 4 * b) % 6
images = set()
for a in range(2):
    for b in range(3):
        img = phi_prod(a, b)
        print(f"  ({a},{b}) → {img}")
        images.add(img)
print(f"Image = {sorted(images)}, bijection: {images == set(range(6))}")
```

## Connection to CS / Games / AI / Business / Industry

- **Type coercions** in programming (int to float) are like homomorphisms: they preserve structure (addition, multiplication).
- **Hashing**: a hash function $h: \text{strings} \to \{0, \ldots, n-1\}$ is a homomorphism if the string operation is compatible with modular arithmetic.
- **Dimensionality reduction**: PCA, autoencoders, and embeddings are "approximate homomorphisms" — they try to preserve structure while reducing size.
- **Neural network layers**: a linear layer $x \mapsto Wx$ is a group homomorphism from $(\mathbb{R}^n, +)$ to $(\mathbb{R}^m, +)$.

## Check Your Understanding

1. Define $\phi: \mathbb{Z}_{12} \to \mathbb{Z}_4$ by $\phi(k) = k \bmod 4$. Verify it is a homomorphism, find its kernel, and state the First Isomorphism Theorem in this case.
2. Is $\phi: \mathbb{Z} \to \mathbb{Z}$ defined by $\phi(n) = 2n$ a homomorphism? Is it an isomorphism?
3. Prove that if $\phi: G \to H$ is an isomorphism and $G$ is abelian, then $H$ is abelian.
