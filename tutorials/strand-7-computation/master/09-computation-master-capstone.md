---
strand: computation
level: master
order: 9
title: Capstone — Computation at the Frontier
prerequisites:
  - tier: strand-7-computation-master
    slug: 08-formal-verification-deep
    description: Formal verification deep
connections:
  - strand-7-computation-advanced/09-computation-capstone-3
applications:
  - cs: "AI infrastructure, post-quantum security, verified cloud, Web3"
  - life: "The state of computation in 2026"
---

# Capstone — Computation at the Frontier

## Mental

Nine lessons on:

- **Parallel and distributed computing** (Lesson 00).
- **GPU programming** (Lesson 01).
- **Quantum algorithms** (Lesson 02).
- **Recursion theory** (Lesson 03).
- **Kolmogorov complexity** (Lesson 04).
- **Streaming and sublinear** (Lesson 05).
- **FHE and zero knowledge** (Lesson 06).
- **Differential privacy** (Lesson 07).
- **Formal verification** (Lesson 08).

You can now read graduate CS-theory and engineer with awareness of
research-grade techniques. Three integrated walkthroughs.

## Walkthrough 1: training a 1T-parameter foundation model

Modern foundation-model training:

1. **Hardware**: ~$10^4$ GPUs (Lesson 01) coordinated via NCCL.
2. **3D parallelism** — data + tensor + pipeline (Lesson 00).
3. **Mixed precision** — bf16 / fp32 ratio for memory.
4. **Optimizer state sharding** — ZeRO, FSDP techniques.
5. **Monitoring and checkpointing** — distributed file systems with
   consensus (Raft, Lesson 00).
6. **DP-SGD** for privacy-preserving fine-tuning on private data
   (Lesson 07).

A single training run might cost \$10M+ in compute and require
weeks of GPU time. Every layer here uses content from this strand.

## Walkthrough 2: a privacy-preserving smart contract

A modern Web3 application using ZK + DP + FHE:

1. **zkSNARKs** for off-chain computation; on-chain verification
   in $\mathrm{poly}(\log)$ time (Lesson 06).
2. **FHE** for encrypted-state computations during voting / private
   auctions (Lesson 06).
3. **DP aggregation** for private telemetry from users (Lesson 07).
4. **Formally verified smart contract** in K-framework or Coq
   (Lesson 08).
5. **Distributed consensus** for ledger ordering (Lesson 00).

This stack didn't exist 10 years ago.

## Walkthrough 3: AI safety via verified properties

Formal guarantees for AI:

1. **Robustness verification** — prove a NN is invariant to
   $\ell_\infty$-bounded perturbations (Marabou, Lesson 08).
2. **Differential-privacy guarantees** for training data (Lesson 07).
3. **Specification mining** — learn formal specs from examples,
   then verify implementations (Lesson 08).
4. **Constructive mathematical proofs** (e.g., AlphaProof)
   formalised in Lean / Coq (Lessons 03, 06 — recursion theory and
   ZK).
5. **Boundedness via algorithmic randomness** — Kolmogorov-style
   simplicity priors guide model selection (Lesson 04).

A growing field where math, theory, and engineering meet.

## Roadmap

**Strand 7 Research-adjacent** picks up:

- Quantum computing frontiers (NISQ, fault-tolerant).
- Theoretical CS open problems (P vs NP, BPP vs P, Hensman-Yao).
- Causal AI / counterfactual fairness.
- Algorithmic game theory and mechanism design.
- AI alignment formal foundations.
- AGI / verified-AI research programs.

## Closing

Computation in 2026 spans:

- Hardware (GPUs, TPUs, quantum, neuromorphic).
- Privacy (DP, FHE, ZK).
- Theory (P vs NP, complexity classes, recursion theory).
- Verification (formal proofs, model checking).
- AI infrastructure (training, deployment, safety).

The strand began with "what's an algorithm?" It ends at the
research frontier where mathematics, theory, hardware, and
engineering meet to *make modern computation possible* — and
provably safe.

## Interactive

:::widget type=numeric-input prompt="Amdahl's law: max speedup = $1/(1 - p)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Shor breaks RSA in poly time. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="HyperLogLog: $O(\\log \\log n)$ memory. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="DP-SGD: clip + noise gradients. Type 1." answer=1 explain="Yes.":::

## Check Your Understanding

:::widget type=numeric-input prompt="seL4 / CompCert verified in Isabelle / Coq. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Quantum threshold theorem: error rate $< \\sim 10^{-3}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Kolmogorov complexity is uncomputable. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="ZKP: completeness, soundness, zero-knowledge. Type 1." answer=1 explain="Yes.":::
