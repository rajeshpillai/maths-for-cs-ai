# Set Theory Proofs

## Intuition

In Tier 1 we learned what sets are and how to combine them. Now we learn how
to **prove** things about sets rigorously: that one set is a subset of another,
that two sets are equal, that De Morgan's laws hold. These proof techniques
underpin database query optimisation, type theory, and formal verification.

## Prerequisites

- Tier 15, Lesson 2 (Predicate Logic)
- Tier 1, Lesson 2 (Set Theory)

## From First Principles

### Proving $A \subseteq B$

To show $A \subseteq B$: take an **arbitrary** $x \in A$ and show $x \in B$.

**Example**: If $A \subseteq B$, then $A \cap C \subseteq B \cap C$.

**Proof**: Let $x \in A \cap C$. Then $x \in A$ and $x \in C$.
Since $A \subseteq B$, $x \in A$ implies $x \in B$.
So $x \in B$ and $x \in C$, meaning $x \in B \cap C$. $\square$

### Proving Set Equality $A = B$

Show both $A \subseteq B$ and $B \subseteq A$ (**mutual inclusion**).

**Example**: $A \cup (B \cap C) = (A \cup B) \cap (A \cup C)$ (Distributive Law).

**Proof** ($\subseteq$): Let $x \in A \cup (B \cap C)$.
- Case 1: $x \in A$. Then $x \in A \cup B$ and $x \in A \cup C$. So $x \in (A \cup B) \cap (A \cup C)$.
- Case 2: $x \in B \cap C$. Then $x \in B$ and $x \in C$. So $x \in A \cup B$ and $x \in A \cup C$. Done.

**Proof** ($\supseteq$): Let $x \in (A \cup B) \cap (A \cup C)$.
- $x \in A \cup B$ and $x \in A \cup C$.
- Case 1: $x \in A$. Then $x \in A \cup (B \cap C)$.
- Case 2: $x \notin A$. Then from $x \in A \cup B$, we get $x \in B$. From $x \in A \cup C$, we get $x \in C$. So $x \in B \cap C$, hence $x \in A \cup (B \cap C)$. $\square$

### De Morgan's Laws for Sets

$$\overline{A \cup B} = \overline{A} \cap \overline{B}$$
$$\overline{A \cap B} = \overline{A} \cup \overline{B}$$

**Proof** of the first law (within universal set $U$):

($\subseteq$): Let $x \in \overline{A \cup B}$. Then $x \notin A \cup B$.
So $x \notin A$ AND $x \notin B$. Thus $x \in \overline{A}$ and $x \in \overline{B}$.
Hence $x \in \overline{A} \cap \overline{B}$.

($\supseteq$): Let $x \in \overline{A} \cap \overline{B}$. Then $x \notin A$ and $x \notin B$.
So $x \notin A \cup B$. Thus $x \in \overline{A \cup B}$. $\square$

### Power Set Properties

$|\mathcal{P}(A)| = 2^{|A|}$.

**Proof by induction on $|A|$:**

Base: $|A| = 0$, $A = \emptyset$. $\mathcal{P}(\emptyset) = \{\emptyset\}$, so $|\mathcal{P}(\emptyset)| = 1 = 2^0$.

Step: Suppose the result holds for sets of size $k$. Let $|A| = k + 1$.
Pick any $a \in A$. Every subset of $A$ either contains $a$ or does not.
- Subsets not containing $a$: these are subsets of $A \setminus \{a\}$, a set of size $k$. By IH, there are $2^k$.
- Subsets containing $a$: each is formed by taking a subset of $A \setminus \{a\}$ and adding $a$. Also $2^k$.
- Total: $2^k + 2^k = 2^{k+1}$. $\square$

### Visualisation

```python
import matplotlib.pyplot as plt
from matplotlib_venn import venn3

# Visualise the distributive law
fig, axes = plt.subplots(1, 2, figsize=(10, 4))

# LHS: A ∪ (B ∩ C)
v1 = venn3(subsets=(1, 1, 1, 1, 1, 1, 1), set_labels=('A', 'B', 'C'),
           ax=axes[0])
axes[0].set_title(r'$A \cup (B \cap C)$')

# RHS: (A ∪ B) ∩ (A ∪ C)
v2 = venn3(subsets=(1, 1, 1, 1, 1, 1, 1), set_labels=('A', 'B', 'C'),
           ax=axes[1])
axes[1].set_title(r'$(A \cup B) \cap (A \cup C)$')

plt.suptitle('Distributive Law — same shaded region', fontsize=13)
plt.tight_layout()
plt.savefig('set_distributive.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Set Theory Proofs: Verification ──────────────────────

# Step 1: Define universe and example sets
U = set(range(20))
A = {1, 2, 3, 4, 5}
B = {3, 4, 5, 6, 7}
C = {5, 6, 7, 8, 9}

def complement(S):
    return U - S

# Step 2: Verify distributive law
lhs = A | (B & C)
rhs = (A | B) & (A | C)
print("=== Distributive Law ===")
print(f"A ∪ (B ∩ C) = {sorted(lhs)}")
print(f"(A ∪ B) ∩ (A ∪ C) = {sorted(rhs)}")
print(f"Equal: {lhs == rhs}")

# Step 3: Verify De Morgan's laws
print("\n=== De Morgan's Laws ===")
dm1_lhs = complement(A | B)
dm1_rhs = complement(A) & complement(B)
print(f"complement(A ∪ B) = {sorted(dm1_lhs)}")
print(f"complement(A) ∩ complement(B) = {sorted(dm1_rhs)}")
print(f"Equal: {dm1_lhs == dm1_rhs}")

dm2_lhs = complement(A & B)
dm2_rhs = complement(A) | complement(B)
print(f"complement(A ∩ B) = {sorted(dm2_lhs)}")
print(f"complement(A) ∪ complement(B) = {sorted(dm2_rhs)}")
print(f"Equal: {dm2_lhs == dm2_rhs}")

# Step 4: Verify power set size
from itertools import combinations

def power_set(S):
    S = list(S)
    ps = []
    for r in range(len(S) + 1):
        for subset in combinations(S, r):
            ps.append(set(subset))
    return ps

for size in range(7):
    S = set(range(size))
    ps = power_set(S)
    expected = 2 ** size
    print(f"\n|S|={size}: |P(S)|={len(ps)}, 2^{size}={expected}, "
          f"match={len(ps) == expected}")

# Step 5: Mutual inclusion proof trace
print("\n=== Mutual Inclusion Trace ===")
print(f"A = {sorted(A)}")
print(f"B = {sorted(B)}")
print(f"A ⊆ B? Every element of A in B: "
      f"{all(x in B for x in A)} (counterexample: {next((x for x in A if x not in B), 'none')})")
print(f"A ∩ C ⊆ B ∩ C?")
AC = A & C
BC = B & C
print(f"  A ∩ C = {sorted(AC)}")
print(f"  B ∩ C = {sorted(BC)}")
print(f"  A∩C ⊆ B∩C: {AC <= BC}")
```

## Connection to CS / Games / AI / Business / Industry

- **Database query optimisation**: rewriting SQL queries uses set algebra laws (De Morgan, distribution) to find efficient plans.
- **Type systems**: union types and intersection types obey set-theoretic laws; type checking proves subset relationships.
- **Access control**: permissions are sets; proving a user has access is a subset proof.
- **Formal verification**: model checking explores state sets; set operations verify properties hold across all reachable states.

## Check Your Understanding

1. Prove: $A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$ using mutual inclusion.
2. Prove: $A \setminus (B \cap C) = (A \setminus B) \cup (A \setminus C)$.
3. Prove: if $A \subseteq B$ and $B \subseteq C$, then $A \subseteq C$ (transitivity of subset).
