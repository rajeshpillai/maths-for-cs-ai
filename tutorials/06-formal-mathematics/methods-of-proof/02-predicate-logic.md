# Predicate Logic — Quantifiers and Bound Variables

## Intuition

Propositional logic says "it is raining" is true or false. But we often need
to say "for every student in the class, their grade is above 50" or "there
exists a prime number greater than 1000." Predicate logic adds **quantifiers**
that let us make statements about collections of objects — exactly what you
do every time you write a `for` loop or a database `WHERE` clause.

## Prerequisites

- Tier 15, Lesson 1 (Propositional Logic — Formal Treatment)

## From First Principles

### Predicates

A **predicate** is a statement with one or more free variables:
- $P(x)$: "$x$ is prime"
- $Q(x, y)$: "$x < y$"

A predicate becomes a proposition when we substitute concrete values:
- $P(7)$: "7 is prime" → True
- $P(4)$: "4 is prime" → False

### Universal Quantifier ($\forall$)

$$\forall x \in S,\; P(x)$$

Reads: "For all $x$ in $S$, $P(x)$ is true."

To prove: show $P(x)$ holds for an **arbitrary** element of $S$.
To disprove: find **one** counterexample.

### Existential Quantifier ($\exists$)

$$\exists x \in S,\; P(x)$$

Reads: "There exists at least one $x$ in $S$ such that $P(x)$ is true."

To prove: exhibit **one** witness.
To disprove: show $P(x)$ is false for **every** element of $S$.

### Negation of Quantified Statements

These are De Morgan's laws lifted to quantifiers:

$$\neg(\forall x,\; P(x)) \equiv \exists x,\; \neg P(x)$$
$$\neg(\exists x,\; P(x)) \equiv \forall x,\; \neg P(x)$$

**Pen & Paper Example**: Negate "Every integer is positive."

Original: $\forall n \in \mathbb{Z},\; n > 0$

Negation: $\exists n \in \mathbb{Z},\; n \leq 0$

"There exists an integer that is not positive." (Witness: $n = 0$.)

### Nested Quantifiers

Order matters!

$$\forall x,\; \exists y,\; (x + y = 0)$$

"For every $x$, there exists a $y$ such that $x + y = 0$."
(True in $\mathbb{Z}$: pick $y = -x$.)

$$\exists y,\; \forall x,\; (x + y = 0)$$

"There exists a $y$ that works for every $x$."
(False in $\mathbb{Z}$: no single $y$ zeroes out every $x$.)

### Pen & Paper: Negate a Nested Statement

Negate: $\forall \varepsilon > 0,\; \exists \delta > 0,\; \forall x,\; (|x - a| < \delta \Rightarrow |f(x) - L| < \varepsilon)$

Step by step:
1. $\exists \varepsilon > 0$ (flip $\forall$ to $\exists$)
2. $\forall \delta > 0$ (flip $\exists$ to $\forall$)
3. $\exists x$ (flip $\forall$ to $\exists$)
4. Negate the implication: $|x - a| < \delta \land |f(x) - L| \geq \varepsilon$

Result: $\exists \varepsilon > 0,\; \forall \delta > 0,\; \exists x,\; (|x - a| < \delta \land |f(x) - L| \geq \varepsilon)$

This is exactly the statement "the limit of $f$ at $a$ is NOT $L$."

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

# Visualise the difference between ∀x ∃y and ∃y ∀x
fig, axes = plt.subplots(1, 2, figsize=(10, 4))

# Left: ∀x ∃y (x + y = 0) — each x gets its own y
xs = np.arange(-3, 4)
ys = -xs
axes[0].scatter(xs, ys, c='blue', s=80, zorder=5)
for x, y in zip(xs, ys):
    axes[0].annotate(f'({x},{y})', (x, y), textcoords="offset points",
                     xytext=(5, 5), fontsize=8)
axes[0].axhline(0, color='gray', linewidth=0.5)
axes[0].axvline(0, color='gray', linewidth=0.5)
axes[0].set_title(r'$\forall x\;\exists y\;(x+y=0)$: TRUE')
axes[0].set_xlabel('x')
axes[0].set_ylabel('y')

# Right: ∃y ∀x (x + y = 0) — one y must work for all x
axes[1].axhline(0, color='red', linewidth=2, label='y=0 (best candidate)')
axes[1].scatter(xs, xs, c='red', marker='x', s=80, label='x+0 = x ≠ 0')
axes[1].set_title(r'$\exists y\;\forall x\;(x+y=0)$: FALSE')
axes[1].set_xlabel('x')
axes[1].set_ylabel('x + y')
axes[1].legend(fontsize=8)

plt.tight_layout()
plt.savefig('quantifier_order.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Predicate Logic: Quantifiers ─────────────────────────

# Step 1: Universal and existential quantifiers over finite domains
def for_all(domain, predicate):
    """∀x ∈ domain, predicate(x)"""
    return all(predicate(x) for x in domain)

def there_exists(domain, predicate):
    """∃x ∈ domain, predicate(x)"""
    return any(predicate(x) for x in domain)

# Step 2: "Every square of an integer is non-negative"
integers = range(-100, 101)
print("∀n∈Z, n² ≥ 0:", for_all(integers, lambda n: n**2 >= 0))

# Step 3: "There exists an integer whose square equals 144"
print("∃n∈Z, n²=144:", there_exists(integers, lambda n: n**2 == 144))

# Step 4: Negation — "NOT every integer is positive"
print("¬(∀n∈Z, n>0):", not for_all(integers, lambda n: n > 0))
print("∃n∈Z, n≤0:   ", there_exists(integers, lambda n: n <= 0))

# Step 5: Nested quantifiers
# ∀x ∃y (x + y = 0) over integers
print("\n∀x ∃y (x+y=0):",
      for_all(integers, lambda x: there_exists(integers, lambda y: x + y == 0)))

# ∃y ∀x (x + y = 0) over integers
print("∃y ∀x (x+y=0):",
      there_exists(integers, lambda y: for_all(integers, lambda x: x + y == 0)))

# Step 6: Find a witness
def find_witness(domain, predicate):
    """Return first witness or None."""
    for x in domain:
        if predicate(x):
            return x
    return None

witness = find_witness(integers, lambda n: n**2 == 169)
print(f"\nWitness for n²=169: n = {witness}")

# Step 7: Find a counterexample
def find_counterexample(domain, predicate):
    """Return first counterexample to ∀x P(x)."""
    for x in domain:
        if not predicate(x):
            return x
    return None

ce = find_counterexample(integers, lambda n: n > 0)
print(f"Counterexample to '∀n, n>0': n = {ce}")
```

## Connection to CS / Games / AI

- **SQL queries**: `WHERE` is an existential filter; `HAVING COUNT(*) = n` is universal over groups.
- **Type systems**: Generic types like `∀T. List<T> → Int` use universal quantification.
- **Game AI**: "For all enemy positions, there exists a safe path" is a nested quantifier statement solved by pathfinding.
- **Formal verification**: Proving program correctness requires negating quantified specifications to find bugs.
- **First-order logic** in AI knowledge bases (Prolog, theorem provers) extends predicate logic.

## Check Your Understanding

1. Negate: "For every $\varepsilon > 0$, there exists $N$ such that for all $n > N$, $|a_n - L| < \varepsilon$."
2. Is the following true or false over $\mathbb{Z}$? $\forall x,\; \forall y,\; (x^2 = y^2 \Rightarrow x = y)$. If false, find a counterexample.
3. Write Python to check: $\exists x \in \{1,...,100\},\; \forall y \in \{1,...,100\},\; (x \cdot y \mod 7 = y \mod 7)$.
