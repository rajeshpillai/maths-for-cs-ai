---
strand: computation
level: advanced
order: 9
title: Capstone — Algorithms at the Edge
prerequisites:
  - tier: strand-7-computation-advanced
    slug: 08-approximation-algorithms
    description: Approximation algorithms
connections:
  - strand-7-computation-intermediate/09-computation-capstone-2
  - strand-2-structure-advanced/09-structure-capstone-3
applications:
  - cs: "Modern systems engineering, big-data, security"
  - life: "What it takes to scale algorithms to internet sizes"
---

# Capstone — Algorithms at the Edge

## Mental

Nine lessons on:

- **Numerical linear algebra** (Lesson 00).
- **Iterative solvers** (Lesson 01).
- **SVD and PCA** (Lesson 02).
- **RSA in depth** (Lesson 03).
- **Elliptic-curve cryptography** (Lesson 04).
- **AES and symmetric ciphers** (Lesson 05).
- **Probabilistic data structures** (Lesson 06).
- **Network flow advanced** (Lesson 07).
- **Approximation algorithms** (Lesson 08).

You can now read graduate algorithms research and recognise its
practical incarnations. Three integrated walkthroughs.

## Walkthrough 1: a TLS handshake

When your browser opens HTTPS, a single connection invokes most of
this strand-level:

1. **ECDHE key exchange** — generate ephemeral EC key pair (Lesson 04),
   exchange public points, compute shared secret.
2. **Server certificate verification** — validate ECDSA / RSA
   signature chain (Lessons 03, 04).
3. **Symmetric session key** — derive AES key (Lesson 05) from the
   ECDH shared secret via HKDF (HMAC-based key derivation).
4. **AES-GCM data channel** — bulk traffic encrypted under the
   session key (Lesson 05); GCM provides authenticity.
5. **Certificate revocation** — OCSP responses use Bloom-like
   filters (Lesson 06) at scale.

A single web request runs through every primitive in the modern
cryptographic stack.

## Walkthrough 2: training a foundation model

GPT-style training:

1. **Linear-algebra kernels** — every matmul calls highly tuned
   BLAS GEMM (Lesson 00). FlashAttention is a numerical-LA
   reformulation for IO-efficient attention.
2. **Iterative solvers** — second-order optimisers (Shampoo, K-FAC)
   solve linear systems in the inner loop using CG-style methods
   (Lesson 01).
3. **PCA / SVD** for embedding analysis, model compression, and
   "tracking the truncation" in low-rank fine-tuning (LoRA — Lesson
   02).
4. **Probabilistic data structures** for telemetry: count-min
   sketches for token frequencies, HyperLogLog for unique-prompts
   monitoring (Lesson 06).
5. **Approximation algorithms** for combinatorial sub-tasks —
   evaluation-set selection, hyperparameter tuning (Lesson 08).

Cutting-edge ML systems are *applied* numerical linear algebra at
trillions-of-parameters scale.

## Walkthrough 3: a search engine at internet scale

1. **Crawling** — distributed BFS across the web's link graph
   (Lesson 07).
2. **Inverted index construction** — sorting trillions of postings,
   distributed across thousands of machines.
3. **Bloom filters** for "have we already crawled this URL?" cache
   (Lesson 06).
4. **Min-cost flow** for ad-auction allocation (Lesson 07).
5. **Set-cover-style approximation** for document deduplication
   (Lesson 08).
6. **PageRank** computed via power iteration (Lesson 01) on a sparse
   web matrix.

Every layer of Google or Bing exercises this strand's content.

## Roadmap

**Strand 7 Master** picks up:

- Parallel and distributed computing — MapReduce, BSP, parallel
  algorithms.
- GPU programming and kernel design.
- Theoretical CS in depth: Turing reducibility, recursion theory,
  Kolmogorov complexity, descriptive complexity.
- Quantum algorithms — Grover, Shor, HHL, quantum walks.
- Streaming and sublinear algorithms in depth.

**Strand 7 Research-adjacent**: differential privacy, fully
homomorphic encryption, post-quantum cryptography frontiers,
quantum computational supremacy, machine-checkable proofs of
algorithm correctness.

## Closing

Algorithms are how mathematics confronts reality at scale. The
abstract universe of $O$-notation meets the concrete world of cache
hierarchies, network latency, and parallel hardware.

A great computer scientist holds **both** in mind: the mathematical
elegance of an idea and its concrete cost on real hardware. This
strand-level was about navigating both.

## Interactive

:::widget type=numeric-input prompt="LU decomposition: $A = PLU$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="ECDSA private-key recovery if $k$ reused. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="HyperLogLog estimates count-distinct in ~1.5 KB. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Vertex cover 2-approximation. Type 2." answer=2 explain="$2$.":::

## Check Your Understanding

:::widget type=numeric-input prompt="Modern TLS uses ECDHE for key exchange and AES-GCM for data. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Truncated SVD = best rank-$k$ approximation (Eckart-Young). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Christofides metric TSP: 1.5-approximation. Type 1.5." answer=1.5 explain="$1.5$.":::

:::widget type=numeric-input prompt="GMRES handles non-symmetric Krylov-subspace solving. Type 1." answer=1 explain="Yes.":::
