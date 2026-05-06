---
strand: pattern-counting
level: research
order: 5
title: Randomness Extraction
prerequisites:
  - tier: strand-5-pattern-counting-research
    slug: 04-tilings-aperiodic
    description: Aperiodic tilings
connections:
  - strand-5-pattern-counting-research/06-symmetric-functions-frontier
applications:
  - cs: "Cryptography RNG, theoretical CS, coding theory"
  - life: "Distill near-uniform randomness from biased sources"
---

# Randomness Extraction

## Explain Like I Am 7

Imagine a coin that is *almost* fair but secretly biased — heads
shows up $51\%$ of the time.  You really need clean fifty-fifty
randomness for a magic trick.  A **randomness extractor** is a
clever recipe that takes the lumpy biased coin flips, plus a tiny
spoonful of perfect randomness, and squeezes out a long stream of
truly fair coin flips.  This idea is what turns the noisy
randomness from a phone's microphone or from atmospheric static
into the strong cryptographic keys that protect online banking.

## Mental

A **randomness extractor**: a function $\mathrm{Ext} : \{0, 1\}^n \times \{0, 1\}^d \to \{0, 1\}^m$
that converts a *weak random source* (high min-entropy but
non-uniform) into near-uniform randomness, using a short truly
random "**seed**."

Used to:

- **Derandomise** algorithms (use few random bits effectively).
- **Build cryptographic RNGs** from physical-noise sources.
- **Mitigate** subliminal channels in protocols.

## Min-entropy

For random variable $X$:

$$
H_\infty(X) = -\log \max_x P(X = x).
$$

A worst-case version of Shannon entropy. **Min-entropy $k$** means
$X$'s most-likely value has probability $\le 2^{-k}$.

## Strong extractors

$\mathrm{Ext}$ is a $(k, \epsilon)$-extractor if for every $X$ with
$H_\infty(X) \ge k$, the joint $(\mathrm{Ext}(X, S), S)$ is
$\epsilon$-close to $\mathrm{Uniform}_m \times S$ in statistical
distance.

**Optimal**: $m = k - O(\log 1/\epsilon)$ (extract almost all
min-entropy) with small seed $d = O(\log n)$.

## Worked example: Trevisan extractor

**Trevisan 1999**: explicit extractor based on **Reed-Muller codes**
+ Nisan-Wigderson combinatorial designs.

Construction: use seed to pick PRG-style $\ell$-wise independent
bits from $X$.

Many follow-ups: Raz-Reingold-Vadhan; Guruswami-Umans-Vadhan; etc.

## Interactive

:::widget type=numeric-input prompt="Min-entropy $H_\\infty$: $-\\log \\max p$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Strong extractor: $(\\mathrm{Ext}(X, S), S)$ near uniform. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Trevisan 1999 extractor uses Reed-Muller + NW designs. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Optimal seed length $\\sim O(\\log n)$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Two-source extractors**: extract from two independent weak
sources, no seed. Bourgain breakthrough (2005); explicit constructions
since.

**Non-malleable extractors** (Dodis-Wichs 2009): security against
tampering with seed.

**Unpredictability extractors**: needed when only "unpredictable"
guarantees on source, not min-entropy.

**Quantum-source extractors**: handle adversaries with quantum
side information; relevant for QKD.

## Computational

```python
import numpy as np
import hashlib

# Universal hashing as a (Leftover Hash Lemma) extractor
def universal_hash_extract(x_bits, key, m):
    """Hash to m bits using SHA256 with key."""
    h = hashlib.sha256(key + bytes(x_bits)).digest()
    return [(h[i // 8] >> (i % 8)) & 1 for i in range(m)]

# Demo: extract 8 bits from 100 weak random bits using 32-byte seed
weak_source = np.random.randint(0, 2, 100, dtype=int).tolist()
seed = np.random.randbytes(32)

extracted = universal_hash_extract(weak_source, seed, 8)
print(f"Extracted bits: {extracted}")

# Leftover Hash Lemma: with 2-universal hash + seed, output is statistically
# close to uniform if H_∞(X) >= m + 2 log(1/ε)
print("Leftover Hash Lemma: 2-universal hashing gives near-uniform output.")
print("Real Trevisan / NW extractors more efficient in seed length.")
```

## Applied

- **Cryptographic RNG** — $/dev/urandom$, Intel RDRAND etc. condense
  hardware noise via extractors.
- **Differential privacy** — randomised mechanisms use extractors
  for parameter generation.
- **Quantum key distribution** — QKD post-processing uses extractors
  to distill secret key.
- **Pseudorandom generators (PRGs)** — extractor + PRG combos achieve
  short-seed random-looking long outputs.
- **Algorithmic lower bounds** — extractor combinatorics underlies
  many lower bounds.

## Check Your Understanding

:::widget type=numeric-input prompt="Min-entropy $-\\log \\max p$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Trevisan 1999 extractor explicit construction. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Two-source extractors: Bourgain breakthrough 2005. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="LHL: 2-universal hashing + seed → near-uniform. Type 1." answer=1 explain="Yes.":::
