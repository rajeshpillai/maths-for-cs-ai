---
strand: reasoning
level: intermediate
order: 6
title: Russell's Paradox and Its Cousins
prerequisites:
  - tier: strand-8-reasoning-intermediate
    slug: 05-constructive-vs-classical
    description: Constructive vs classical logic
connections:
  - strand-8-reasoning-intermediate/07-function-proofs
applications:
  - cs: "Halting problem, Gödel incompleteness — same diagonal"
  - life: "When self-reference breaks the system"
---

# Russell's Paradox and Its Cousins

## Explain Like I Am 7

Imagine a librarian who keeps one special list: a list of *every list
in the library that doesn't list itself.*  Sounds harmless — until
you ask, "is this special list on itself?"  If yes, then it lists
itself, so it shouldn't be there.  If no, then it doesn't list
itself, so it *should* be there.  No answer works.  This silly
puzzle quietly tore a hole in early maths and forced everyone to
agree on stricter rules for what counts as a list (set) at all.

## Mental

Russell's paradox in one line:

$$
R = \{x : x \notin x\} \implies (R \in R \iff R \notin R).
$$

A set's membership in itself contradicts its definition. The paradox
**broke naive set theory** at the start of the 20th century and
forced the rebuilding via ZFC (Lesson 01).

But Russell's paradox is just one example of a much wider pattern:
**diagonal arguments**.

## Cantor's diagonal

There is no surjection $S \to \mathcal{P}(S)$ for any set $S$.

**Proof**. Suppose $f : S \to \mathcal{P}(S)$. Define
$D = \{x \in S : x \notin f(x)\} \in \mathcal{P}(S)$. Is there an
$s \in S$ with $f(s) = D$? Then $s \in D \iff s \notin f(s) = D$ —
contradiction. So $f$ is not surjective. □

The trick: form a set that **disagrees with $f(x)$ at $x$ for every $x$**,
guaranteeing it's missed.

## Halting-problem flavour

There is no Turing machine $H$ that decides "given a program $P$ and
input $x$, does $P(x)$ halt?"

**Proof sketch**. Suppose $H$ exists. Build $K(P)$ that halts if and
only if $H(P, P)$ says "loop" — and loops if $H$ says "halt." Then
$K(K)$ halts $\iff$ $H(K, K)$ says loop $\iff$ $K(K)$ doesn't halt.
Contradiction. □

Same shape: the *diagonal* program $K(P) = $ "do the opposite of what
$H$ predicts $P(P)$ does."

## Gödel's first incompleteness theorem

In any consistent first-order axiomatization rich enough to encode
arithmetic, there exists a sentence $G$ that says (informally) "$G$
is not provable." If the system proves $G$, it's inconsistent. So $G$
is true but unprovable.

The construction is, again, diagonal: encode "$x$ proves the
sentence with code $x$" and form $G = \lnot \mathrm{Pr}(\ulcorner G \urcorner)$.

## Interactive

:::widget type=numeric-input prompt="Russell's set $R = \\{x : x \\notin x\\}$ is a contradiction in naive set theory. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$|\\mathcal{P}(\\mathbb{N})| > |\\mathbb{N}|$ — Cantor's diagonal proves no surjection. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="The halting problem is undecidable. Type 1 for true." answer=1 explain="Yes — Turing 1936.":::

:::widget type=numeric-input prompt="Russell, Cantor, Halting, Gödel — same diagonal trick. Type 1 if you see the pattern." answer=1 explain="Yes — all instances of Lawvere's fixed-point theorem.":::

## Symbolic

**Lawvere's fixed-point theorem** unifies all four diagonals:

In a category $\mathbf{C}$ with finite products, if there is a
**weakly point-surjective** map $f : A \to Y^A$ (every "row of the
exponential" is hit by some point of $A$), then every endomap $g:
Y \to Y$ has a **fixed point**.

Contrapositive: if some $g$ has *no* fixed point, no such surjection
exists.

- **Cantor**: $Y = \{0, 1\}$, $g = $ NOT has no fixed point ⇒ no
  surjection $A \to 2^A$.
- **Halting**: $Y = $ {halts, loops}, $g = $ swap has no fixed
  point ⇒ no $H$ that decides halting.
- **Russell**: take $Y = \Omega$ (truth values), $g = \lnot$ has no
  fixed point ⇒ no surjection naive-set $\to \mathcal{P}(\text{naive-set})$.
- **Gödel**: $g = $ negation in the proof-theoretic structure has no
  fixed point ⇒ a sentence escapes the prover's reach.

The ten-thousand-foot view: **systems that can talk about themselves
(at the right strength) cannot decide every proposition about themselves.**

## Computational

```python
# Cantor's diagonal — produce a binary string differing from each row
def diagonalize(rows):
    return [1 - rows[i][i] for i in range(len(rows))]

rows = [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 1, 0, 1],
    [1, 0, 1, 0],
]
d = diagonalize(rows)
print(d)                         # differs from row i at position i
for i in range(4):
    assert d[i] != rows[i][i]
```

```python
# Russell as a Python paradox attempt — runtime error
class Russell:
    def __contains__(self, item):
        return item not in item
# print(Russell() in Russell())   # Recursion error — the paradox shows up
```

## Applied

- **Diagonalisation** is a *constructive* technique — the proofs
  *produce* the bad object that breaks the assumption. Used
  constantly in complexity (separating P from EXP via time
  hierarchy), recursion theory, and proof theory.
- **Reflection in programming languages** — when a language can
  inspect its own programs (Lisp eval, Python's `exec`), Lawvere-style
  fixed-points appear. The Y combinator is one.
- **Self-replicating programs (quines)** are constructive uses of
  the diagonal — programs that print their own source code.
- **Foundations of math** — incompleteness limits what proof
  assistants can establish about themselves.

## Check Your Understanding

:::widget type=numeric-input prompt="Russell's paradox: $R = \\{x : x \\notin x\\}$. $R \\in R$ iff $R \\notin R$ — paradox. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cantor: no surjection $S \\to \\mathcal{P}(S)$. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Halting problem: undecidable in general. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Gödel: in any consistent system rich enough to encode arithmetic, there's a true but unprovable sentence. Type 1." answer=1 explain="Yes.":::
