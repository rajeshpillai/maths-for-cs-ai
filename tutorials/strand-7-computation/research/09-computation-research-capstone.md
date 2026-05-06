---
strand: computation
level: research
order: 9
title: Capstone — Computation at the Frontier
prerequisites:
  - tier: strand-7-computation-research
    slug: 08-quantum-supremacy-frontier
    description: Quantum supremacy
connections:
  - strand-7-computation-master/09-computation-master-capstone
applications:
  - cs: "Frontier TCS, post-quantum security, AI alignment"
  - life: "The state of computation in 2026"
---

# Capstone — Computation at the Frontier

## Explain Like I Am 7

This chapter is the world tour of computer-science adventures still
being figured out *right now*.  Locked-box arithmetic.  Coins that
won't stay still.  Padlocks built for a quantum future.  Maps of the
secret gears inside neural networks.  Some of these mysteries will
crack open in your lifetime; some may stay puzzles forever.  Either
way, today's chapter takes the toolkit and points it at the open
questions on the frontier — the kind of stuff working researchers
argue about over coffee.

## Mental

Nine lessons on:

- **P vs NP frontier** (Lesson 00).
- **Fault-tolerant quantum** (Lesson 01).
- **Post-quantum cryptography** (Lesson 02).
- **MPC and verifiable computation** (Lesson 03).
- **AI alignment formal** (Lesson 04).
- **Mechanistic interpretability** (Lesson 05).
- **Algorithmic game theory** (Lesson 06).
- **TCS frontier — codes and PCPs** (Lesson 07).
- **Quantum supremacy and verification** (Lesson 08).

You've reached the contemporary computation frontier.

## Three integrated walkthroughs

### Quantum threat → PQ migration

The quantum-cryptanalytic threat:

- **Shor's algorithm** breaks RSA / ECDSA at scale (Strand 7 Master
  Lesson 02).
- **FTQC progress** brings useful quantum closer (Lesson 01).
- **NIST PQC standards** (Lesson 02): Kyber, Dilithium, SPHINCS+
  ratified.
- **Hybrid TLS + harvest-now-decrypt-later concerns** drive migration.
- **Crypto-economic** transition: blockchains migrating to PQ
  signatures.

A coordinated cross-industry response.

### AI safety stack

Mathematical and engineering safety techniques:

- **Mechanistic interpretability** (Lesson 05): understand model
  internals.
- **Formal alignment** (Lesson 04): specification + verification.
- **DP / FHE / ZK** (Strand 7 Master): training-data privacy +
  verifiable inference.
- **Conformal prediction**: calibrated uncertainty.
- **Robustness verification**: adversarial bounds.

Collectively building toward provably-safe AI.

### TCS / cryptography fusion

Modern crypto-meets-TCS:

- **PCP theorem** (Lesson 07) → SNARKs (Strand 7 Master).
- **Locally testable codes** (Lesson 07) → succinct proofs.
- **MPC + ZK + FHE** (Lesson 03 + Master) → privacy-preserving
  computation.
- **AGT mechanism design** (Lesson 06) → crypto-economic incentives.

Decentralised systems, ZK rollups, distributed AI training all
exemplify this fusion.

## Roadmap beyond Research-adjacent

Active future directions:

- **Useful FTQC** — quantum chemistry / cryptanalysis at scale.
- **Provably-aligned AI** — formal alignment guarantees.
- **AI-verified TCS** — proof assistants discovering and verifying
  TCS theorems.
- **Distributed-AI cryptoeconomics** — token-incentivised AI training.
- **Cross-disciplinary methods** — borrowing from biology, physics,
  social science for new TCS approaches.

## Closing

Computation in 2026 spans:

- **Theory frontier** — P vs NP, complexity barriers, quantum-
  classical separations.
- **Practical impact** — PQC migration, FTQC progress, ZK rollups
  at internet scale.
- **AI safety** — formal alignment, interpretability, verification.
- **Industrial cryptography** — TLS 1.3 + PQC, MPC + ZK in
  production.

The strand began with "what's an algorithm?" It ends at the
frontier where TCS, AI safety, quantum computing, and crypto
converge to *make computing safe and powerful at planet scale*.

## Interactive

:::widget type=numeric-input prompt="P vs NP open since Cook 1971. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="NIST PQC standards 2024 (Kyber, Dilithium, SPHINCS+). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$c^3$-LTC existence resolved 2021. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="FTQC threshold ~10⁻³ for surface code. Type 1." answer=1 explain="Yes.":::

## Check Your Understanding

:::widget type=numeric-input prompt="Quantum supremacy demos contested + iteratively refined. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Mechanistic interpretability scaled to Claude 3 Sonnet (Anthropic 2024). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Pigou price of anarchy 4/3. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Castryck-Decru 2022 broke SIDH/SIKE. Type 1." answer=1 explain="Yes.":::
