---
strand: reasoning
level: foundation
order: 4
title: Direct Proof
prerequisites:
  - tier: strand-8-reasoning-foundation
    slug: 01-logical-connectives
    description: Logical connectives
connections:
  - strand-8-reasoning-foundation/05-proof-by-contradiction
applications:
  - cs: "Algorithm correctness proofs, type-system soundness"
  - life: "Convincing arguments, scientific reasoning"
---

# Direct Proof

## Mental

A **direct proof** of "$P \to Q$" assumes $P$ and derives $Q$ via a
sequence of valid logical steps.

The skeleton:

> **Theorem**: If $P$, then $Q$.
>
> **Proof**: Assume $P$. [Some chain of reasoning.] Therefore $Q$. □

The "□" or "∎" marks the end of the proof.

## Worked example

**Theorem**: If $n$ is even, then $n^2$ is even.

**Proof**: Assume $n$ is even. Then $n = 2k$ for some integer $k$
(definition of even). So $n^2 = (2k)^2 = 4 k^2 = 2 (2 k^2)$. Let $m
= 2 k^2$. Then $n^2 = 2m$, which is the definition of even. Therefore
$n^2$ is even. □

The structure is rigid:

1. Assume the hypothesis.
2. Apply definitions.
3. Derive the conclusion via algebra and logic.
4. Cite definitions / lemmas at each step.

## Interactive

:::widget type=numeric-input prompt="Theorem: 'sum of two evens is even.' Even = $2k$. Sum: $2k + 2m = 2(k + m)$. The structure shows the sum is $2 \\cdot (\\text{integer})$ = even. Type 1 if proof is valid." answer=1 explain="Valid direct proof.":::

:::widget type=numeric-input prompt="Theorem: 'sum of two odds is even.' Odd = $2k + 1$. Sum: $(2k + 1) + (2m + 1) = 2k + 2m + 2 = 2(k + m + 1)$. Even? (1 yes.)" answer=1 explain="Yes — $2 \\cdot$ integer.":::

:::widget type=numeric-input prompt="Theorem: 'product of two odds is odd.' $(2k+1)(2m+1) = 4km + 2k + 2m + 1 = 2(2km + k + m) + 1$. Form $2 \\cdot \\text{int} + 1$ = odd. (1 valid.)" answer=1 explain="Valid.":::

## Symbolic

**Forward chains** ($P \to Q$): assume $P$; from $P$, derive
intermediate facts; reach $Q$.

**Definitions** are crucial. Most direct proofs unfold at the
definitions:

- $n$ even iff $\exists k: n = 2k$.
- $n$ odd iff $\exists k: n = 2k + 1$.
- $a \mid b$ iff $\exists k: b = a k$.
- $\gcd(a, b) = d$ iff $d \mid a, d \mid b$, and any common divisor
  divides $d$.

A direct proof's elegance comes from chaining these definitions
along with algebraic identities.

## Computational

Mathematical proofs aren't usually "computed" — they're written and
verified by hand. But we can **check** specific cases:

```python
# Check: sum of two evens is even
for a in [-10, 0, 4, 100]:
    for b in [-2, 6, 8]:
        s = a + b
        if a % 2 == 0 and b % 2 == 0:
            assert s % 2 == 0, f"failed: {a} + {b} = {s}"
print("all checked: sum of two evens is always even")
```

Verification doesn't replace proof, but it builds confidence.

## Applied

- **Algorithm correctness**: a direct proof shows that the algorithm
  produces the right output for every input.
- **Type-system soundness**: typed programs don't get stuck — proved
  via direct chains of typing rules.

## Check Your Understanding

:::widget type=numeric-input prompt="Prove: 'if $n$ is divisible by 6, then $n$ is divisible by 2.' Skeleton: $n = 6k$, so $n = 2(3k)$. Valid? (1 yes.)" answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Prove: 'if $a, b$ are both divisible by $c$, then $a + b$ is divisible by $c$.' $a = ck, b = cm$. $a + b = c(k + m)$. Valid?" answer=1 explain="Yes — divisibility is closed under addition.":::

:::widget type=numeric-input prompt="A direct proof of '$P \\to Q$' assumes $P$ and derives $Q$. The structure is forward — yes (1) or backward (0)?" answer=1 explain="Forward — assume P, derive Q.":::

:::widget type=numeric-input prompt="Number of ways to prove 'if $n$ is odd, $n^2$ is odd' by direct proof?" answer=1 explain="One natural direct proof: $n = 2k+1, n^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$. Type 1.":::
