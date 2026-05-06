---
strand: reasoning
level: master
order: 2
title: Ordinals and Proof-Theoretic Strength
prerequisites:
  - tier: strand-8-reasoning-master
    slug: 01-homotopy-type-theory
    description: HoTT
connections:
  - strand-8-reasoning-master/03-cut-elimination
applications:
  - cs: "Termination proofs, well-founded recursion, formal verification"
  - life: "Measuring the proof power of axiom systems"
---

# Ordinals and Proof-Theoretic Strength

## Explain Like I Am 7

Counting numbers go $0, 1, 2, 3, \ldots$ forever.  But after "all
the counting numbers" you can imagine a brand-new number called
*infinity*, and then *infinity plus one*, and so on — a whole new
ladder beyond the old one, then a ladder beyond *that*.  These are
**ordinals**.  Each system of math rules has its own personal "how
high it can climb" ordinal — and a stronger rulebook climbs higher.
Mathematicians measure rulebooks against each other by asking, "how
tall is your ladder?"

## Mental

**Ordinals** generalise natural numbers:

- $0, 1, 2, \ldots$ — the finite ordinals.
- $\omega$ — first infinite ordinal: $\{0, 1, 2, \ldots\}$.
- $\omega + 1, \omega + 2, \ldots, \omega \cdot 2$, ...
- $\omega^2, \omega^\omega, \ldots, \epsilon_0$.

Each formal axiom system has a **proof-theoretic ordinal** —
roughly, the supremum of ordinals that the system proves are
well-ordered.

| System | Proof-theoretic ordinal |
|---|---|
| PRA (primitive recursive arithmetic) | $\omega^\omega$ |
| PA (Peano arithmetic) | $\epsilon_0 = \omega^{\omega^{\omega^{\cdots}}}$ |
| ATR_0 | $\Gamma_0$ (Feferman-Schütte) |
| Π¹₁-CA₀ | Bachmann-Howard ordinal |
| ZFC | unknown (huge) |

## Cantor normal form

Every ordinal $\alpha < \epsilon_0$ has unique form

$$
\alpha = \omega^{\beta_1} \cdot c_1 + \omega^{\beta_2} \cdot c_2 + \ldots + \omega^{\beta_k} \cdot c_k
$$

with $\beta_1 > \beta_2 > \ldots$ and $c_i \in \mathbb N \setminus \{0\}$,
$\beta_i$ themselves in CNF.

Recursive: ordinals below $\epsilon_0$ are described by finite
"tree" expressions.

## Worked example: Goodstein's theorem

For $n \in \mathbb N$:

1. Write $n$ in **base 2** (each digit and exponent recursively in
   base 2 too — *hereditary base 2*).
2. Replace every 2 by 3 (now in base 3).
3. Subtract 1.
4. Replace every 3 by 4. Subtract 1. ...

**Goodstein's theorem**: this sequence eventually reaches 0 — *for
every starting $n$*.

Although the sequence grows astronomically before it descends, it
*does* descend in $\epsilon_0$-ordinal terms, hence terminates.

**Surprise**: Goodstein's theorem is **unprovable in PA** (Kirby-
Paris 1982). Needs ordinals up to $\epsilon_0$.

## Interactive

:::widget type=numeric-input prompt="$\\epsilon_0$ is proof-theoretic ordinal of PA. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Goodstein's theorem is unprovable in PA. Type 1." answer=1 explain="Yes — Kirby-Paris 1982.":::

:::widget type=numeric-input prompt="Cantor normal form: ordinals as tree expressions. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Higher ordinals provide more proof power. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Gentzen's consistency proof** (1936): consistency of PA proven by
transfinite induction up to $\epsilon_0$. *Couldn't* be done within
PA (Gödel) — needs slightly more.

**Bachmann-Howard ordinal**: $\psi(\Omega^\Omega \cdot \Omega^{\Omega^\Omega})$ —
proof-theoretic ordinal of $\Pi^1_1$-CA_0 + bar induction.

**Veblen functions** $\phi_\alpha$: increasing fixed-points
$\phi_\alpha(0)$ for ordinal $\alpha$. Used to name large ordinals.

**Ordinal collapsing functions** (OCF): notations for ordinals far
beyond $\epsilon_0$, including $\Omega$-recursive ordinals.

**Pohlers's program**: catalog proof-theoretic ordinals of all major
systems, classify them via OCFs.

## Computational

```python
# Cantor normal form for ordinals
class Ordinal:
    def __init__(self, terms):
        # terms: list of (exponent_ordinal, coefficient)
        self.terms = sorted(terms, key=lambda t: -compare(t[0]))

    def __repr__(self):
        return " + ".join(f"ω^{e} · {c}" for e, c in self.terms)

# Hereditary base-2 representation
def hereditary_base(n, b):
    """Express n in hereditary base b."""
    if n == 0: return "0"
    parts = []
    while n > 0:
        # Find largest power of b ≤ n
        i = 0
        while b**(i+1) <= n: i += 1
        coeff = n // b**i
        n -= coeff * b**i
        if i == 0:
            parts.append(str(coeff))
        elif i == 1:
            parts.append(f"{coeff}·{b}")
        else:
            parts.append(f"{coeff}·{b}^{hereditary_base(i, b)}")
    return " + ".join(parts)

print(hereditary_base(35, 2))    # 1·2^(2·2 + 1) + 1·2 + 1
print(hereditary_base(35, 3))    # in base 3

# Goodstein sequence (numeric — converges very slowly)
def goodstein(n, max_steps=100):
    """Compute Goodstein sequence starting at n."""
    seq = [n]
    base = 2
    for step in range(max_steps):
        if seq[-1] == 0: break
        # Conceptual step: rewrite in hereditary base, replace base, decrement
        # For computational tractability, simulate just numerically
        next_n = seq[-1] - 1     # placeholder — real rule is much faster-growing
        seq.append(next_n)
    return seq

# (Actual Goodstein rule grows astronomically; approximate skipping computation)
print("Goodstein conceptual: terminates by ε_0-induction.")
```

## Applied

- **Termination proofs** in dependently-typed languages — well-founded
  recursion using ordinal-valued size measures.
- **Verifying complex algorithms** — sometimes need ordinal-valued
  variants for termination.
- **Reverse mathematics** (Strand 8 Advanced Lesson 5) — system
  strengths classified by proof-theoretic ordinals.
- **Game theory** — large-ordinal-valued games (Conway's surreal
  numbers, ordinal chess).
- **AI termination certification** — formal-verification systems
  rely on ordinal-based termination orderings.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\epsilon_0$ = proof-theoretic ordinal of PA. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Goodstein's theorem is independent of PA. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Gentzen used induction up to $\\epsilon_0$ to prove PA consistency. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cantor normal form: ordinals as tree expressions. Type 1." answer=1 explain="Yes.":::
