---
strand: computation
level: master
order: 4
title: Kolmogorov Complexity
prerequisites:
  - tier: strand-7-computation-master
    slug: 03-recursion-theory
    description: Recursion theory
connections:
  - strand-7-computation-master/05-streaming-sublinear
applications:
  - cs: "Compression, randomness, lower bounds"
  - life: "How much information is in a finite string?"
---

# Kolmogorov Complexity

## Explain Like I Am 7

Pick a long string of letters.  Now ask: what's the *shortest little
note* that tells a friend exactly that string?  For "ABABABABAB," the
note is tiny: "A and B, ten times."  For a random jumble like
"QXKZJWMP," the shortest note is the jumble itself — there's no
shorter description.  **Kolmogorov complexity** is the length of that
shortest possible note.  It's how mathematicians measure
*randomness*: the more random a thing looks, the longer the shortest
note describing it.

## Mental

The **Kolmogorov complexity** $K(x)$ of a string $x$ is the length of
the *shortest* program (in a fixed universal Turing machine) that
outputs $x$ and halts.

$K(x)$ measures the **algorithmic information content** of $x$ —
how many bits suffice to describe $x$.

For random strings: $K(x) \ge |x| - O(1)$ — roughly the string's
own length. For structured strings (e.g., $1^n$ for large $n$):
$K(1^n) = O(\log n)$.

## Key properties

- **Independence of universal machine** (up to additive constant):
  $K_U(x) \le K_V(x) + c_{U, V}$.
- **Uncomputability**: $K(x)$ is *not* computable. (Otherwise, output
  the shortest string with $K \ge n$ — paradox.)
- **Co-r.e.**: $K(x) \le k$ is r.e. (eventually find a short program).

## Compression and randomness

A string is **incompressible** if $K(x) \approx |x|$.
Almost all strings are incompressible — counting argument.

A string is **(Martin-Löf) random** if it doesn't fall into any
"effectively measure-zero" set. Equivalent: prefix-complexity bound.

For infinite sequences: random ⇔ $K(x_{1..n}) \ge n - O(1)$ for
infinitely many $n$.

## Worked example

| String | $K$ approx |
|---|---|
| $0^n$ | $O(\log n)$ |
| $\pi$'s digits to position $n$ | $O(\log n)$ |
| Random coin flips length $n$ | $\approx n$ |
| First $n$ Fibonacci bits | $O(\log n)$ |

The point: structured strings have small $K$; "random" data has $K$ near $|x|$.

## Levin's coding theorem

$P(x) = \sum_{p : U(p) = x} 2^{-|p|}$ — "universal probability."

$$
-\log P(x) = K(x) + O(1).
$$

So Kolmogorov complexity = "$- \log$ universal probability." Foundation
of MDL (Minimum Description Length) inductive inference.

## Interactive

:::widget type=numeric-input prompt="$K(x) \\approx |x|$ for random strings. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$K$ is uncomputable. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Martin-Löf random: no effectively measure-zero set. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Levin coding: $-\\log P(x) = K(x) + O(1)$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Resource-bounded Kolmogorov**: $K^t(x) = $ shortest program
producing $x$ in time $\le t$. **Polynomial-time Kolmogorov** central
in average-case complexity (Levin).

**Solomonoff induction**: predict next bit by weighting hypotheses
$p$ by $2^{-K(p)}$. Optimal but uncomputable.

**Algorithmic information theory**: $K(x : y)$, $K(x | y)$ —
Kolmogorov analogues of entropy and conditional entropy.

**Chaitin's $\Omega$**: probability that a random program halts —
real number whose digits encode HALT. Maximally compressed but
uncomputable.

## Computational

```python
# Approximate Kolmogorov complexity by best practical compressor

import zlib

def k_approx(s):
    """Estimate K(s) via zlib compressed length (in bits)."""
    return 8 * len(zlib.compress(s.encode()))

# Structured vs random strings
structured = "0" * 10000
random_str = "".join(__import__("random").choice("01") for _ in range(10000))

print(f"K(0^10000) ≈ {k_approx(structured)} bits")     # very small
print(f"K(random 10000) ≈ {k_approx(random_str)} bits")  # close to 10000

# Note: real K is uncomputable; this is a practical approximation

# MDL principle: choose hypothesis minimising L(hypothesis) + L(data | hypothesis)
def mdl_score(hypothesis_complexity, data_likelihood_bits):
    return hypothesis_complexity + data_likelihood_bits

# Tiny example: model {iid Bernoulli(p)} for p ∈ {0.5, 0.7}
import math
data = "0010101100110100110010"  # 22 bits
ones = data.count("1")
zeros = data.count("0")

for p in [0.5, 0.7]:
    log_lik = - (ones * math.log2(p) + zeros * math.log2(1 - p))
    # Hypothesis cost: ~32 bits to encode p with 32-bit precision
    print(f"p = {p}: L(model) ~ 32 + L(data) ~ {log_lik:.1f}")
```

## Applied

- **Compression** (gzip, bzip2, zstd, neural-net codecs) approximates
  Kolmogorov from above.
- **MDL / Bayesian model selection** uses information-content
  arguments.
- **Randomness extraction** in cryptography — extractors based on
  Kolmogorov-style measures.
- **Average-case complexity** (Levin) — uses resource-bounded
  Kolmogorov.
- **AI safety and IIT** — Kolmogorov complexity as proxy for
  "simplicity" / "consciousness" measures.

## Check Your Understanding

:::widget type=numeric-input prompt="$K(x)$ is uncomputable. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$K$ depends on universal machine up to additive constant. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Martin-Löf random ↔ effectively no patterns. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Solomonoff induction is optimal but uncomputable. Type 1." answer=1 explain="Yes.":::
