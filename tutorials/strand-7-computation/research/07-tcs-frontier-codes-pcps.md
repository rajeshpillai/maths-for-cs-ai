---
strand: computation
level: research
order: 7
title: TCS Frontier — Codes and PCPs
prerequisites:
  - tier: strand-7-computation-research
    slug: 06-algorithmic-game-theory-frontier
    description: AGT frontier
connections:
  - strand-7-computation-research/08-quantum-supremacy-frontier
applications:
  - cs: "Cryptographic hardness, derandomisation, blockchain rollups"
  - life: "How proof-checking became practical"
---

# TCS Frontier — Codes and PCPs

## Mental

Modern theoretical computer science: codes (error correction) +
proofs (PCPs / IPs) + algebra + complexity intertwined.

## Locally testable codes (LTCs)

A code is **locally testable** if a verifier reading $O(1)$ symbols
can detect with high probability whether a string is far from any
codeword.

**Long-standing question**: do "good" LTCs exist (constant rate,
distance, locality)?

**Resolved 2021** (Dinur-Evra-Livne-Lubotzky-Mozes): explicit
construction via square-cover complexes from group-theoretic
combinatorics.

## $c^3$-LTCs

A $c^3$-LTC: constant rate, distance, locality. Existence open
for decades; resolved by Dinur et al. + Panteleev-Kalachev (2021)
via *quantum LDPC* codes.

This was a major TCS breakthrough.

## PCP theorem and modern proofs

**PCP theorem** (Arora-Lund-Motwani-Sudan-Szegedy 1992; Arora-Safra
1992): every NP language has $O(1)$-query probabilistically-
checkable proof.

Implies inapproximability of MAX-3SAT to ratio better than 7/8.

## SNARKs from PCP

Modern **SNARKs** (Strand 7 Master Lesson 06):

- **PCP-style** proof of correct computation.
- **Polynomial commitments** (KZG, FRI) compress to short proof.
- **Fiat-Shamir** makes non-interactive.

Practical: Groth16, PLONK, STARK family. Used in zkSync, Starknet,
Mina (entire blockchain SNARK-verified).

## Interactive

:::widget type=numeric-input prompt="LTC: locally testable code with O(1) queries. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$c^3$-LTC existence resolved 2021 (Dinur et al. + Panteleev-Kalachev). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="PCP theorem (ALMSS + AS 1992). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="MAX-3SAT inapprox bound 7/8. Type 1." answer=1 explain="Yes.":::

## Symbolic

**LDPC codes** (Gallager 1962, Tanner 1981) — sparse parity-check
matrices; foundation of 5G channel coding (NR LDPC).

**Quantum LDPC codes**: dramatic recent progress (Hastings-Haah-
O'Donnell 2021; Panteleev-Kalachev 2022). Rate × distance can be
$\Omega(N)$.

**FRI** (Fast Reed-Solomon IOP of Proximity, Ben-Sasson et al.):
core of STARK proof systems.

**Lasserre / sum-of-squares hierarchies**: relax integer programs;
analytic / proof-complexity tools.

## Computational

```python
import numpy as np

# LDPC parity-check matrix
def random_ldpc(n_data, n_parity, weight=3):
    """Random sparse parity-check matrix."""
    H = np.zeros((n_parity, n_data), dtype=int)
    for i in range(n_parity):
        positions = np.random.choice(n_data, weight, replace=False)
        H[i, positions] = 1
    return H

H = random_ldpc(20, 10)
print(f"LDPC parity check (10 x 20): rank ≈ {np.linalg.matrix_rank(H)}")

# Belief propagation decoding (sketch)
def bp_decode_sketch(received, H, n_iter=10):
    """Iterative bit-flipping decoder."""
    decoded = received.copy()
    for _ in range(n_iter):
        # Compute syndrome
        synd = (H @ decoded) % 2
        if np.all(synd == 0): return decoded
        # Flip bits in positions with most parity violations
        violations = (H.T @ synd) % 2
        if np.any(violations):
            most_violating = np.argmax(violations)
            decoded[most_violating] = 1 - decoded[most_violating]
    return decoded

# Real LDPC: industrial decoders use sum-product algorithm
print("Production LDPC: 5G NR uses LDPC (3GPP TS 38.212).")

# PCP / SNARK demo: too complex for short Python
print("SNARK production: snarkjs (Groth16), arkworks (Plonky3, Halo2).")
```

## Applied

- **5G / 6G** — LDPC codes in standard.
- **Hard disks / SSDs** — LDPC for error correction.
- **Quantum error correction** — qLDPC codes promising for FTQC.
- **Blockchain L2** — STARK proofs (Starknet) and PLONK (zkSync) for
  rollups.
- **Proof of work alternatives** — VDFs (verifiable delay
  functions) for Ethereum 2.

## Check Your Understanding

:::widget type=numeric-input prompt="$c^3$-LTC existence resolved 2021. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="PCP theorem 1992. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="LDPC in 5G NR. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Quantum LDPC: Hastings-Haah-O'Donnell 2021 / Panteleev-Kalachev 2022. Type 1." answer=1 explain="Yes.":::
