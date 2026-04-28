# Proof by Contrapositive

## Intuition

The statement "if it is raining, the ground is wet" is logically the same as
"if the ground is not wet, it is not raining." Sometimes the second version
is easier to prove. Proof by contrapositive exploits this equivalence:
instead of proving $P \Rightarrow Q$, you prove $\neg Q \Rightarrow \neg P$.

## Prerequisites

- Tier 15, Lesson 3 (Direct Proof)

## From First Principles

### Why Contrapositive Works

Recall from Lesson 1: $P \Rightarrow Q \equiv \neg P \lor Q$.

The contrapositive $\neg Q \Rightarrow \neg P \equiv \neg(\neg Q) \lor \neg P \equiv Q \lor \neg P \equiv \neg P \lor Q$.

So $P \Rightarrow Q$ and $\neg Q \Rightarrow \neg P$ have identical truth tables.

| $P$ | $Q$ | $P \Rightarrow Q$ | $\neg Q \Rightarrow \neg P$ |
|-----|-----|-------------------|---------------------------|
| T | T | T | T |
| T | F | F | F |
| F | T | T | T |
| F | F | T | T |

### Contrapositive vs Converse vs Inverse

| Statement | Form | Equivalent to original? |
|-----------|------|------------------------|
| Original | $P \Rightarrow Q$ | — |
| Converse | $Q \Rightarrow P$ | **No** |
| Inverse | $\neg P \Rightarrow \neg Q$ | **No** |
| Contrapositive | $\neg Q \Rightarrow \neg P$ | **Yes** |

The converse and inverse are equivalent to each other but NOT to the original.

### Example 1: If $n^2$ is Even, Then $n$ is Even

Direct proof is awkward (try it — you get stuck with $n^2 = 2k$).

**Contrapositive**: If $n$ is odd, then $n^2$ is odd.

**Proof**:
1. Assume $n$ is odd: $n = 2k + 1$.
2. $n^2 = (2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$.
3. This has the form $2m + 1$, so $n^2$ is odd. $\square$

### Example 2: If $xy$ is Odd, Then Both $x$ and $y$ are Odd

**Contrapositive**: If $x$ is even OR $y$ is even, then $xy$ is even.

**Proof**:
1. Without loss of generality, assume $x$ is even: $x = 2k$.
2. $xy = 2k \cdot y = 2(ky)$.
3. Since $ky$ is an integer, $xy$ is even. $\square$

### Example 3: If $3n + 2$ is Odd, Then $n$ is Odd

**Contrapositive**: If $n$ is even, then $3n + 2$ is even.

**Proof**:
1. Assume $n = 2k$.
2. $3n + 2 = 3(2k) + 2 = 6k + 2 = 2(3k + 1)$.
3. This is even. $\square$

### When to Choose Contrapositive Over Direct

Use contrapositive when:
- The conclusion involves "not" or "non-" conditions.
- The hypothesis gives you little structure to work with.
- The negated conclusion gives a concrete algebraic form (e.g., "n is odd" gives $n = 2k+1$).

### Visualisation

```python
import matplotlib.pyplot as plt

# Flowchart: direct proof vs contrapositive
fig, axes = plt.subplots(1, 2, figsize=(10, 4))

# Direct proof flow
steps_d = ['Assume P', '... steps ...', 'Conclude Q']
for i, s in enumerate(steps_d):
    axes[0].text(0.5, 1 - i * 0.4, s, ha='center', va='center',
                 fontsize=12, bbox=dict(boxstyle='round', facecolor='lightblue'))
    if i < len(steps_d) - 1:
        axes[0].annotate('', xy=(0.5, 0.68 - i * 0.4),
                         xytext=(0.5, 0.72 - i * 0.4),
                         arrowprops=dict(arrowstyle='->', lw=2))
axes[0].set_title('Direct: P → Q')
axes[0].axis('off')

# Contrapositive flow
steps_c = ['Assume ¬Q', '... steps ...', 'Conclude ¬P']
for i, s in enumerate(steps_c):
    axes[1].text(0.5, 1 - i * 0.4, s, ha='center', va='center',
                 fontsize=12, bbox=dict(boxstyle='round', facecolor='lightyellow'))
    if i < len(steps_c) - 1:
        axes[1].annotate('', xy=(0.5, 0.68 - i * 0.4),
                         xytext=(0.5, 0.72 - i * 0.4),
                         arrowprops=dict(arrowstyle='->', lw=2))
axes[1].set_title('Contrapositive: ¬Q → ¬P')
axes[1].axis('off')

plt.suptitle('Two equivalent proof strategies', fontsize=14)
plt.tight_layout()
plt.savefig('contrapositive_flow.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Proof by Contrapositive: Verification ────────────────

# Step 1: Verify "n² even ⟹ n even" by checking contrapositive
print("=== Contrapositive: n odd ⟹ n² odd ===")
all_pass = True
for n in range(-500, 501):
    if n % 2 == 1:  # n is odd
        if n**2 % 2 != 1:  # n² should be odd
            print(f"FAIL: n={n}, n²={n**2}")
            all_pass = False
print(f"Verified: {all_pass}")

# Step 2: Verify "xy odd ⟹ x odd AND y odd"
print("\n=== Contrapositive: x even OR y even ⟹ xy even ===")
all_pass = True
for x in range(-50, 51):
    for y in range(-50, 51):
        if x % 2 == 0 or y % 2 == 0:  # at least one even
            if (x * y) % 2 != 0:
                print(f"FAIL: x={x}, y={y}")
                all_pass = False
print(f"Verified: {all_pass}")

# Step 3: Verify truth table equivalence of P→Q and ¬Q→¬P
print("\n=== Truth table equivalence ===")
from itertools import product as cartesian

for P, Q in cartesian([True, False], repeat=2):
    direct = (not P) or Q          # P → Q
    contra = (not (not Q)) or (not P)  # ¬Q → ¬P = Q or ¬P
    match = (direct == contra)
    print(f"P={P}, Q={Q}: P→Q={direct}, ¬Q→¬P={contra}, equal={match}")

# Step 4: Show converse is NOT equivalent
print("\n=== Converse is NOT equivalent ===")
for P, Q in cartesian([True, False], repeat=2):
    original = (not P) or Q     # P → Q
    converse = (not Q) or P     # Q → P
    print(f"P={P}, Q={Q}: P→Q={original}, Q→P={converse}, "
          f"equal={original == converse}")

# Step 5: Demonstrate with a specific example
print("\n=== Example: 3n+2 odd ⟹ n odd ===")
for n in range(20):
    val = 3 * n + 2
    if val % 2 == 1:  # 3n+2 is odd
        print(f"  n={n}: 3n+2={val} (odd), n is {'odd' if n%2==1 else 'EVEN!'}")
```

## Connection to CS / Games / AI / Business / Industry

- **Debugging**: "if the output is wrong, then the input was invalid" — contrapositive reasoning identifies root causes.
- **Type safety**: "if a program type-checks, it does not crash" is equivalent to "if a program crashes, it did not type-check."
- **Security proofs**: "if the scheme is broken, then the underlying hard problem is easy" — contrapositive of hardness assumption.
- **Testing**: "if we observe a failure, the code has a bug" — the contrapositive of "if the code is correct, no test fails."
- **Reductions in cryptography (RSA, lattice schemes)** — security proofs are contrapositives: "if our scheme is broken, then factoring (resp. SVP) is easy"; the contrapositive justifies why $43T in crypto and PKI assumes RSA-2048 / Kyber are unbroken.
- **Root-cause analysis at Toyota and ASML** — Andon-cord and FMEA quality processes use contrapositive logic ("if no defect propagated, the upstream gate did its job"); essential to producing defect-free chips in EUV lithography.
- **Risk-based capital under Basel III at central banks** — "if a bank passes the stress test, it survives a 1-in-1000 shock" is the contrapositive that the Federal Reserve and ECB exploit to set capital ratios for HSBC, JPMorgan, and Deutsche Bank.
- **MISRA C automotive coding standard** — diagnostic rules are contrapositives ("if undefined behaviour was triggered, the rule was violated"); compliance is mandated by ISO 26262 for every Tier-1 supplier shipping ECUs into Toyota, Ford, and BMW vehicles.

## Check Your Understanding

1. Prove by contrapositive: if $n^2$ is divisible by 3, then $n$ is divisible by 3.
2. Prove by contrapositive: for integers $a$ and $b$, if $a + b \geq 15$, then $a \geq 8$ or $b \geq 8$.
3. Explain why proof by contrapositive is NOT the same as proof by contradiction, even though they feel similar. (Hint: contradiction assumes $P \land \neg Q$; contrapositive assumes $\neg Q$.)
