---
strand: reasoning
level: foundation
order: 6
title: Proof by Induction
prerequisites:
  - tier: strand-8-reasoning-foundation
    slug: 04-direct-proof
    description: Direct proof
connections:
  - strand-8-reasoning-foundation/07-cardinality
applications:
  - cs: "Recursive algorithm correctness, structural induction"
  - life: "Proving statements that hold 'for all $n$'"
---

# Proof by Induction

## Mental

To prove "$P(n)$ is true for all $n \ge n_0$":

1. **Base case**: prove $P(n_0)$.
2. **Inductive step**: prove "$P(k) \to P(k+1)$" for all $k \ge n_0$.

Then $P(n)$ holds for all $n \ge n_0$ by induction.

The argument: $P(n_0)$ is true. By the inductive step, $P(n_0 + 1)$
is true. Then $P(n_0 + 2)$. And so on, indefinitely.

Visualisation: a **chain of dominoes**. The base case is "the first
domino falls." The inductive step is "if any domino falls, the next
one falls too." Conclusion: all dominoes fall.

## Worked example

**Theorem**: $1 + 2 + \ldots + n = \dfrac{n(n+1)}{2}$ for all $n \ge 1$.

**Proof**:

**Base case** ($n = 1$): LHS = 1. RHS = $1 \cdot 2 / 2 = 1$. ✓

**Inductive step**: assume $1 + 2 + \ldots + k = \dfrac{k(k+1)}{2}$.
Show $1 + 2 + \ldots + k + (k+1) = \dfrac{(k+1)(k+2)}{2}$.

$$
\text{LHS} = \frac{k(k+1)}{2} + (k + 1) = \frac{k(k+1) + 2(k+1)}{2} = \frac{(k+1)(k+2)}{2}.
$$

That's the RHS. ✓ □

The structure: assume $P(k)$, manipulate algebra to get $P(k+1)$.

## Interactive

:::widget type=numeric-input prompt="Verify $1 + 2 + 3 + 4 + 5 = ?$ using the formula $5 \\cdot 6 / 2 = ?$" answer=15 explain="$15$.":::

:::widget type=numeric-input prompt="$1 + 3 + 5 + ... + (2n - 1) = n^2$. Verify for $n = 4$: $1 + 3 + 5 + 7 = ?$" answer=16 explain="$16 = 4^2$.":::

:::widget type=numeric-input prompt="Sum of first $n$ squares: $1^2 + 2^2 + ... + n^2 = n(n+1)(2n+1)/6$. For $n = 3$: $1 + 4 + 9 = 14$. Formula gives $3 \\cdot 4 \\cdot 7 / 6 = ?$" answer=14 explain="$14$.":::

:::widget type=numeric-input prompt="Inductive step: $P(k) \\to P(k+1)$. The 'step' is *forward* by one. Type 1 if true." answer=1 explain="Yes — induction proves a chain.":::

## Symbolic

**Principle of mathematical induction**: if

1. $P(n_0)$, and
2. $\forall k \ge n_0: P(k) \to P(k+1)$,

then $P(n)$ for all $n \ge n_0$.

**Strong induction**: same conclusion, but the inductive step
assumes $P(n_0), P(n_0 + 1), \ldots, P(k)$ to prove $P(k+1)$.
Equivalent in power, sometimes more convenient.

**Structural induction** (CS-flavoured): induction over recursive
data structures (trees, lists). Used in language semantics and
type-theory proofs.

## Computational

```python
# Verify a claimed identity for small n
def sum_to(n):
    return sum(range(1, n + 1))

for n in range(1, 100):
    assert sum_to(n) == n * (n + 1) // 2
print("Verified n = 1 to 99")
```

This isn't a proof — but it's a sanity check.

## Applied

- **Recursive algorithm correctness**: prove the recursive function
  works for the base case; then prove "if works at level $k$, works
  at level $k+1$."
- **Loop invariants**: maintain a property through iterations —
  a form of induction.
- **Structural induction in PL**: every term in a programming
  language has a finite structure; properties are proved by
  induction on that structure.

## Check Your Understanding

:::widget type=numeric-input prompt="Sum of first $n$ even numbers: $2 + 4 + ... + 2n = n(n+1)$. For $n = 5$: $30$. Verify: $2 + 4 + 6 + 8 + 10 = ?$" answer=30 explain="$30$.":::

:::widget type=numeric-input prompt="Prove by induction: $2^n > n$ for $n \\ge 1$. Base: $2 > 1$. ✓ Step: assume $2^k > k$. Then $2^{k+1} = 2 \\cdot 2^k > 2k \\ge k + 1$ for $k \\ge 1$. ✓ Type 1 if valid." answer=1 explain="Valid.":::

:::widget type=numeric-input prompt="$\\sum_{i=1}^n i = n(n+1)/2$. For $n = 100$, sum?" answer=5050 explain="$100 \\cdot 101 / 2 = 5050$. (Famous Gauss childhood story.)":::

:::widget type=numeric-input prompt="Without induction, you'd verify each $n$ separately. With induction, one proof suffices for all $n \\ge $ base. Type 1 if induction is more powerful." answer=1 explain="Yes — induction proves infinitely many cases at once.":::
