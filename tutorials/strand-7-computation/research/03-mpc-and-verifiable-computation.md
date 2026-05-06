---
strand: computation
level: research
order: 3
title: MPC and Verifiable Computation
prerequisites:
  - tier: strand-7-computation-research
    slug: 02-post-quantum-frontier
    description: PQC frontier
connections:
  - strand-7-computation-research/04-ai-alignment-formal
applications:
  - cs: "Privacy-preserving AI, decentralised computation"
  - life: "Computing securely with mutually-distrustful parties"
---

# MPC and Verifiable Computation

## Explain Like I Am 7

Five friends each have a number on a private card and want the total
*without* showing anyone their card.  They split each card into silly
fragments, swap fragments around like trading cards, and at the end
add up what they're holding — *somehow* the right total appears, with
nobody ever seeing anybody else's number.  A second magic trick lets
you ship a hard sum to a stranger and get back not just an answer but
a tiny *receipt* you can check in seconds.  These two tricks let
strangers cooperate without trust.

## Mental

**Multi-party computation (MPC)**: $N$ parties jointly compute
$f(x_1, \ldots, x_N)$ without revealing private inputs $x_i$.

**Verifiable computation (VC)**: a *verifier* outsources computation
to a *prover* and verifies correctness with much less work.

Both are foundational for *trustless* computation in modern
distributed systems.

## MPC techniques

- **Yao's garbled circuits** (1986): boolean-circuit MPC for two
  parties.
- **Goldreich-Micali-Wigderson (GMW)**: secret-sharing-based
  protocol.
- **BGW** (Ben-Or-Goldwasser-Wigderson): information-theoretic
  protocol for $\le n/3$ corrupted parties.
- **SPDZ family**: practical MPC with malicious-secure protocols.

## Verifiable computation

- **Probabilistically checkable proofs (PCPs)**: foundation; PCP
  theorem (1992).
- **SNARKs / STARKs**: succinct, non-interactive ZK arguments.
- **Verkle trees**: succinct merkle-tree alternative for state
  commitments.

## ZK rollups

Modern blockchain L2 systems use SNARK / STARK technology:

- **Compute** transactions off-chain.
- **Prove** correctness with a SNARK.
- **Post** the proof on-chain; verifiers check in $O(\mathrm{poly}(\log))$
  time.

Examples: zkSync (PLONK), Starknet (STARK), Aztec (UltraPLONK),
Scroll (zkEVM).

## Worked example: secret sharing

**Shamir's secret sharing** ($t$-out-of-$n$): split secret $s$ into
$n$ shares $f(1), \ldots, f(n)$ via a degree-$(t-1)$ polynomial $f$
with $f(0) = s$.

Any $t$ shares reconstruct $s$ via Lagrange interpolation; fewer
than $t$ reveal nothing.

Foundation of many MPC protocols.

## Interactive

:::widget type=numeric-input prompt="Yao's garbled circuits (1986) for 2-party MPC. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="BGW: information-theoretic MPC for ≤ n/3 corrupted. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Shamir t-out-of-n secret sharing via polynomial. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="zkSync / Starknet are ZK rollups. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Universal composability** (Canetti 2001): security framework
allowing protocols to compose securely.

**Threshold cryptography**: distribute key material across parties
so no single point of failure.

**Differential privacy + MPC**: combine techniques for private +
secure analytics.

**Homomorphic encryption + MPC**: hybrid schemes for ultra-private
computation.

## Computational

```python
import random
from sympy import nextprime

# Shamir's secret sharing
def shamir_split(secret, n_shares, threshold, prime=None):
    if prime is None: prime = int(nextprime(secret + 1))
    coefs = [secret] + [random.randint(1, prime - 1) for _ in range(threshold - 1)]
    def poly(x):
        return sum(c * pow(x, i, prime) for i, c in enumerate(coefs)) % prime
    return [(i, poly(i)) for i in range(1, n_shares + 1)], prime

def shamir_reconstruct(shares, prime):
    """Reconstruct secret = poly(0) via Lagrange interpolation mod prime."""
    secret = 0
    for j, (xj, yj) in enumerate(shares):
        num, den = 1, 1
        for k, (xk, _) in enumerate(shares):
            if j != k:
                num = (num * (-xk)) % prime
                den = (den * (xj - xk)) % prime
        secret += yj * num * pow(den, -1, prime)
    return secret % prime

shares, p = shamir_split(secret=42, n_shares=5, threshold=3)
print(f"5 shares for secret 42: {shares}")
# Reconstruct from any 3
recovered = shamir_reconstruct(shares[:3], p)
print(f"Recovered from 3 shares: {recovered}")    # 42
recovered2 = shamir_reconstruct(shares[2:5], p)
print(f"Recovered from different 3 shares: {recovered2}")    # 42

# Production MPC: tinygarble, MP-SPDZ, ABY3
print("Production MPC: MP-SPDZ, ABY3, EMP-toolkit.")
```

## Applied

- **Privacy-preserving ML training** — joint training without sharing
  data (federated + MPC).
- **Auctions** — sealed-bid auctions via MPC (Cybernetica did real-
  world Estonia auctions).
- **Genomics privacy** — joint analysis of genome data without sharing.
- **Blockchain L2 / rollups** — STARK / SNARK verifiable computation.
- **Decentralised oracles** — Chainlink-style consensus on off-chain
  data.

## Check Your Understanding

:::widget type=numeric-input prompt="Yao garbled circuits (1986). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Shamir secret-sharing via polynomial. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="STARK rollups for blockchain L2. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="UC framework (Canetti 2001) for protocol composition. Type 1." answer=1 explain="Yes.":::
