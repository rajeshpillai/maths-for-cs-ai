---
strand: reasoning
level: intermediate
order: 4
title: Strong Induction and Well-Ordering
prerequisites:
  - tier: strand-8-reasoning-intermediate
    slug: 03-peano-axioms
    description: Peano axioms
connections:
  - strand-8-reasoning-intermediate/05-constructive-vs-classical
applications:
  - cs: "Recursive algorithm correctness, structural induction on syntax"
  - life: "Induction with a more powerful hypothesis"
---

# Strong Induction and Well-Ordering

## Explain Like I Am 7

Regular induction lets you push the next domino if you know the one
right behind it has fallen.  **Strong** induction lets you peek at
*every* domino that has fallen so far before you push.  Sometimes the
trick that knocks down domino number 12 needs ideas from dominoes 5,
7, and 9, not just 11 — like splitting a number $12 = 4 \times 3$
relies on what we already know about $4$ and $3$.  Either way, the
whole row tumbles, and the proof is airtight.

## Mental

Foundation induction: assume $P(k)$, prove $P(k+1)$.

**Strong induction**: assume $P(0), P(1), \ldots, P(k)$, prove $P(k+1)$.

Sometimes you need to reach back further than the immediate
predecessor. Example: every $n \ge 2$ has a prime factorisation.
The proof recurses by writing $n = ab$ with $a, b < n$ and
factoring each — you need them all, not just $n - 1$.

## Equivalence

Ordinary induction, strong induction, and the **well-ordering
principle** ("every non-empty subset of $\mathbb{N}$ has a least
element") are **logically equivalent**. Each implies the others.

The proof: if $P$ fails somewhere, well-ordering gives a least $n$
with $\lnot P(n)$. By choice of $n$, $P(0), \ldots, P(n-1)$ all
hold — contradicting strong induction.

## Worked example: every integer $\ge 2$ has a prime factorisation

Claim: every $n \ge 2$ is a product of primes.

**Strong induction on $n$**.

- Base: $n = 2$ is prime — trivially a product of one prime. ✓
- Step: assume the claim for all $2 \le k < n$. Two cases:
  - $n$ is prime. Done.
  - $n$ is composite, $n = ab$ with $2 \le a, b < n$. By the
    inductive hypothesis (which applies to $a$ and $b$), each is a
    product of primes; concatenate to get one for $n$. ✓

That step uses **all** previous cases via $a, b$ — ordinary
induction (only assuming $P(n-1)$) wouldn't work.

## Interactive

:::widget type=numeric-input prompt="Strong induction lets you assume $P(0), P(1), \\ldots, P(k)$ to prove $P(k+1)$. Number of base cases needed depends on the proof. For 'every $n \\ge 2$ has prime factorisation', base case is $n = 2$. Type 2." answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="Well-ordering principle: every non-empty $S \\subseteq \\mathbb{N}$ has a least element. Type 1 if true." answer=1 explain="Yes — defining property of $\\mathbb{N}$.":::

:::widget type=numeric-input prompt="Number of primes in factorisation of $12 = 2 \\cdot 2 \\cdot 3$?" answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="Strong induction $\\Leftrightarrow$ ordinary induction $\\Leftrightarrow$ well-ordering. Three equivalent principles. Type 3." answer=3 explain="$3$.":::

## Symbolic

**Strong induction principle**: if for every $n$,
$(\forall k < n: P(k)) \Rightarrow P(n)$, then $\forall n: P(n)$.

Note: there's no separate base case — the empty conjunction at
$n = 0$ is *true*, so $P(0)$ must follow from the inductive step
unconditionally.

**Structural induction**: induction over a recursive datatype.
For binary trees: prove $P(\text{leaf})$ and "$P(L) \land P(R) \Rightarrow P(\text{node}(L, R))$."
For lists: prove $P(\mathrm{nil})$ and "$P(\ell) \Rightarrow P(\mathrm{cons}(x, \ell))$."

**Transfinite induction**: extends induction past $\omega$ to all
ordinals. Used in set-theoretic constructions like the cumulative
hierarchy.

## Computational

```python
# Strong induction in action: prime factorisation
def primes_of(n):
    if n < 2: return []
    for p in range(2, n + 1):
        if n % p == 0:
            return [p] + primes_of(n // p)   # recurse on n / p < n

print(primes_of(60))   # [2, 2, 3, 5]
print(primes_of(97))   # [97]
```

The recursion descends to *strictly smaller* arguments — the
correctness proof is strong induction.

```python
# Verify well-ordering on a small set
def least(S):
    return min(S) if S else None

print(least({7, 3, 9, 1, 4}))   # 1
```

## Applied

- **Recursive algorithm correctness** — induction on the size of
  the input. Proofs that quicksort, mergesort, Euclidean algorithm
  work all rest on strong induction.
- **Structural induction in PL** — formal semantics of programming
  languages: properties of expressions are proved by induction on
  the parse tree.
- **Termination proofs** in dependently typed languages — every
  recursive call must descend a *well-founded order*; the
  termination checker is doing strong induction in disguise.
- **Mathematical olympiad combinatorics** — many counting and
  recurrence problems are cleanly proved by strong induction.

## Check Your Understanding

:::widget type=numeric-input prompt="Fibonacci $F_n = F_{n-1} + F_{n-2}$ — strong induction is natural here because the inductive hypothesis needs *two* previous cases. Type 1." answer=1 explain="Yes — a typical use of strong induction.":::

:::widget type=numeric-input prompt="Every $n \\ge 2$ has a *unique* prime factorisation (up to ordering). Type 1." answer=1 explain="Yes — fundamental theorem of arithmetic.":::

:::widget type=numeric-input prompt="Well-ordering of $\\mathbb{N}$ — $\\mathbb{R}^+$ is also well-ordered? Type 1 if yes, 0 if no. (Hint: subset $\\{1/n\\}$ has no least element.)" answer=0 explain="No — only discrete sets like $\\mathbb{N}$ are well-ordered with the standard order.":::

:::widget type=numeric-input prompt="Structural induction on a binary tree: prove the property for leaf, then for internal node assuming children. Number of cases: $2$. Type 2." answer=2 explain="$2$.":::
