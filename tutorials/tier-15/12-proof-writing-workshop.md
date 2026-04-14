# Proof Writing Workshop

## Intuition

Knowing proof techniques is like knowing how to swing a hammer. Writing a
good proof is like building a house: you need structure, clarity, and polish.
This lesson is about the craft of proof writing — the gap between "I see why
this is true" and "I have written a correct, readable proof that convinces
others."

## Prerequisites

- Tier 15, Lesson 6 (Mathematical Induction)

## From First Principles

### Scratch Work vs Clean Proof

**Scratch work** is exploration: try things, make mistakes, follow dead ends.
**Clean proof** is communication: logical, sequential, no unnecessary steps.

Scratch work for "$n^2 + n$ is even":
> Factor: $n(n+1)$. Consecutive integers — one is even! So the product is even. Done.

Clean proof:
> Let $n \in \mathbb{Z}$. Then $n^2 + n = n(n+1)$. Since $n$ and $n+1$ are consecutive integers, one of them is even. Therefore $n(n+1) = 2k$ for some integer $k$, and $n^2 + n$ is even. $\square$

### Common Errors

**Error 1: Circular reasoning (begging the question)**

BAD: "Assume $a + b$ is even. Then $a + b = 2k$. Since $a + b$ is even..." (you used what you wanted to prove as a step).

FIX: Start from the hypothesis, not the conclusion.

**Error 2: Proof by example**

BAD: "$3^2 + 3 = 12$, which is even. Therefore $n^2 + n$ is always even."

FIX: One example is not a proof for all $n$. Use variables.

**Error 3: Assuming the converse**

BAD: "If $n$ is even, then $n^2$ is even. Therefore if $n^2$ is even, $n$ is even."

FIX: The converse is not logically equivalent. Use contrapositive or contradiction.

**Error 4: Variable reuse**

BAD: "Let $a = 2k$ and $b = 2k$." (This forces $a = b$.)

FIX: Use distinct variables: $a = 2k$, $b = 2m$.

**Error 5: Dividing by a variable without checking it is non-zero**

BAD: "Since $n \cdot x = n \cdot y$, divide both sides by $n$ to get $x = y$."

FIX: Must verify $n \neq 0$ first.

### Proof Writing Checklist

1. **State what you are proving** at the top.
2. **Declare all variables**: "Let $n \in \mathbb{Z}$" or "Let $\varepsilon > 0$."
3. **Unpack definitions**: convert "even" to $2k$, "rational" to $a/b$, etc.
4. **Justify every step**: cite the definition, theorem, or algebraic law.
5. **End with the conclusion**: "Therefore $P$. $\square$"
6. **Read it aloud**: does each sentence follow from the previous?

### Reading Published Proofs

When you encounter a proof in a textbook:

1. **Identify the technique**: direct? contradiction? induction?
2. **Find the hypothesis and conclusion**.
3. **Mark the key insight**: the non-obvious step that makes everything work.
4. **Reproduce it on paper** without looking at the book.
5. **Ask "where would this break?"**: what if a condition were removed?

### Pen & Paper: Revise a Bad Proof

**Bad proof**: "The sum of two odd numbers is even."

> "Proof": Let $a$ and $b$ be odd. Then $a + b$ is even because odd plus odd is even. QED.

This is just restating the claim, not proving it.

**Revised proof**:

> Let $a$ and $b$ be odd integers. By definition, $a = 2j + 1$ and $b = 2k + 1$ for some integers $j$ and $k$. Then:
> $$a + b = (2j + 1) + (2k + 1) = 2j + 2k + 2 = 2(j + k + 1)$$
> Since $j + k + 1$ is an integer, $a + b$ is even. $\square$

### Proof Difficulty Tiers

| Level | Strategy |
|-------|----------|
| Direct application of definition | Unpack, compute, re-pack |
| Requires algebraic manipulation | Factor, expand, rewrite |
| Requires choosing a technique | Direct, contrapositive, contradiction, cases |
| Requires a clever construction | Auxiliary element, counting argument |
| Requires combining multiple ideas | Induction + cases + algebraic trick |

### Visualisation

```python
import matplotlib.pyplot as plt

# Visualise proof structure as a dependency graph
fig, ax = plt.subplots(figsize=(8, 5))

# Proof steps as nodes
steps = {
    'Hypothesis': (0.5, 0.9),
    'Unpack\ndefinitions': (0.5, 0.7),
    'Algebraic\nmanipulation': (0.3, 0.5),
    'Apply\ntheorem': (0.7, 0.5),
    'Combine\nresults': (0.5, 0.3),
    'Conclusion': (0.5, 0.1),
}

for label, (x, y) in steps.items():
    ax.text(x, y, label, ha='center', va='center', fontsize=10,
            bbox=dict(boxstyle='round,pad=0.3', facecolor='lightblue',
                      edgecolor='steelblue'))

# Draw arrows
arrows = [
    ('Hypothesis', 'Unpack\ndefinitions'),
    ('Unpack\ndefinitions', 'Algebraic\nmanipulation'),
    ('Unpack\ndefinitions', 'Apply\ntheorem'),
    ('Algebraic\nmanipulation', 'Combine\nresults'),
    ('Apply\ntheorem', 'Combine\nresults'),
    ('Combine\nresults', 'Conclusion'),
]

for start, end in arrows:
    sx, sy = steps[start]
    ex, ey = steps[end]
    ax.annotate('', xy=(ex, ey + 0.05), xytext=(sx, sy - 0.05),
                arrowprops=dict(arrowstyle='->', lw=1.5, color='steelblue'))

ax.set_xlim(0, 1)
ax.set_ylim(0, 1)
ax.set_title('Anatomy of a Well-Written Proof')
ax.axis('off')
plt.tight_layout()
plt.savefig('proof_structure.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Proof Writing Workshop: Automated Proof Checking ─────

# Step 1: A simple proof verifier framework
class ProofStep:
    def __init__(self, statement, justification, check_fn):
        self.statement = statement
        self.justification = justification
        self.check_fn = check_fn  # returns True if step is valid

def verify_proof(steps):
    """Check each step of a proof."""
    print("Verifying proof:")
    all_ok = True
    for i, step in enumerate(steps):
        ok = step.check_fn()
        status = "OK" if ok else "FAIL"
        print(f"  Step {i+1} [{status}]: {step.statement}")
        print(f"         Justification: {step.justification}")
        if not ok:
            all_ok = False
    print(f"Proof {'VALID' if all_ok else 'INVALID'}\n")
    return all_ok

# Step 2: Verify "sum of two odd numbers is even"
print("=== Proof: sum of two odd numbers is even ===")
j, k = 5, 3  # concrete witnesses for testing
a = 2 * j + 1
b = 2 * k + 1

steps = [
    ProofStep(f"a = 2j+1 = {a}, b = 2k+1 = {b}",
              "Definition of odd (j=5, k=3)",
              lambda: a == 2*j+1 and b == 2*k+1),
    ProofStep(f"a + b = {a} + {b} = {a+b}",
              "Arithmetic",
              lambda: a + b == 2*j+1 + 2*k+1),
    ProofStep(f"a + b = 2(j+k+1) = 2*{j+k+1} = {2*(j+k+1)}",
              "Factor out 2",
              lambda: a + b == 2*(j+k+1)),
    ProofStep(f"{j+k+1} is an integer",
              "Integers closed under addition",
              lambda: isinstance(j+k+1, int)),
    ProofStep(f"a + b = {a+b} is even",
              "Definition of even (2 * integer)",
              lambda: (a + b) % 2 == 0),
]
verify_proof(steps)

# Step 3: Detect common errors
print("=== Detecting Common Errors ===")

# Error: variable reuse
print("Error 1: Variable reuse")
print("  BAD: a = 2k, b = 2k (forces a = b)")
k_val = 4
a_bad = 2 * k_val
b_bad = 2 * k_val
print(f"  a = {a_bad}, b = {b_bad}, a == b: {a_bad == b_bad}")
print(f"  This only proves the case a = b, not general case!\n")

# Error: proof by example
print("Error 2: Proof by example")
print("  Checking 3^2 + 3 = 12 is even: True")
print("  But this doesn't prove it for ALL n.")
print("  Counterexample search (there are none, but one example isn't proof):")
found_counter = False
for n in range(-1000, 1001):
    if (n**2 + n) % 2 != 0:
        found_counter = True
        break
print(f"  Exhaustive check [-1000,1000]: all even = {not found_counter}\n")

# Step 4: Show the scratch work → clean proof transformation
print("=== Scratch Work → Clean Proof ===")
print("SCRATCH: factor n²+n = n(n+1), consecutive → one even → product even")
print("CLEAN:")
print("  Let n ∈ Z.")
print("  n² + n = n(n+1).            [factor]")
print("  n and n+1 are consecutive.   [definition]")
print("  One of them is even.         [property of consecutive integers]")
print("  So n(n+1) = 2k for some k.   [even factor in product]")
print("  Therefore n² + n is even.  □")
```

## Connection to CS / Games / AI

- **Code review**: a well-structured proof mirrors well-structured code — clear inputs, logical flow, explicit outputs.
- **Documentation**: explaining *why* an algorithm works (not just *that* it works) is proof writing for engineers.
- **Formal verification** (Coq, Lean, Agda): computer-checked proofs are the ultimate "proof writing discipline."
- **Technical interviews**: communicating a correct solution clearly is as important as finding it.
- **Research papers**: ML papers increasingly require correctness proofs for theoretical contributions.

## Check Your Understanding

1. Find and fix the error in this "proof": "If $a | b$ and $a | c$, then $a | (b + c)$. Proof: $b + c = ak$ for some integer $k$." (What step was skipped?)
2. Rewrite the following scratch work as a clean proof: "Want to show: if $x^2 = x$, then $x = 0$ or $x = 1$. Well, $x^2 - x = 0$, so $x(x-1) = 0$, zero product, done."
3. Write a complete, clean proof that $\sqrt{3}$ is irrational. Include every step and justify each one.
