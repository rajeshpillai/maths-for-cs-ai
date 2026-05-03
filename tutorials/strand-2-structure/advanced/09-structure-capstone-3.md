---
strand: structure
level: advanced
order: 9
title: Capstone — Algebra at the Edge
prerequisites:
  - tier: strand-2-structure-advanced
    slug: 08-tensor-products
    description: Tensor products
connections:
  - strand-2-structure-intermediate/09-structure-capstone-2
  - strand-7-computation-advanced/00-numerical-linear-algebra
applications:
  - cs: "Post-quantum crypto, persistent homology, transformer architectures"
  - life: "Where modern algebra meets cutting-edge computing"
---

# Capstone — Algebra at the Edge

## Mental

Nine lessons on:

- **Ideals** (Lesson 00).
- **Quotient rings** (Lesson 01).
- **PIDs and UFDs** (Lesson 02).
- **Splitting fields** (Lesson 03).
- **Galois groups** (Lesson 04).
- **The Galois correspondence** (Lesson 05).
- **Solvability by radicals** (Lesson 06).
- **Modules over a ring** (Lesson 07).
- **Tensor products** (Lesson 08).

You can now read graduate algebra and follow the algebraic ideas in
modern crypto, ML, and topology. Three integrated walkthroughs.

## Walkthrough 1: Ring-LWE and post-quantum crypto

NIST's standardised post-quantum key-encapsulation (Kyber, ML-KEM) is
based on **Module-LWE**:

- Work in $R_q = \mathbb{Z}_q[x] / (\Phi_n(x))$ where $\Phi_n$ is a
  cyclotomic polynomial — a *quotient ring* (Lesson 01) whose
  ideal-structure (Lesson 00) and field-extension (Lesson 03)
  properties matter for security and efficiency.
- Public keys and ciphertexts live in **modules** $R_q^k$ (Lesson 07).
- Multiplication of polynomials is sped up via the **Number Theoretic
  Transform** — a Fourier-like transform exploiting the *splitting*
  of $\Phi_n$ over a primitive root.

The hardness assumption: distinguishing
$(A, b) = (A, As + e)$ from random — modules of "noisy linear
equations" — is hard even for quantum computers.

## Walkthrough 2: persistent homology and topological data analysis

A point cloud in $\mathbb{R}^d$ has *features* at multiple scales.
**Persistent homology** captures them:

1. Build a **filtration** of simplicial complexes
   $\emptyset = K_0 \subseteq K_1 \subseteq \ldots$ as the radius
   parameter increases.
2. Take homology with $k[t]$-module structure (Lesson 07): each
   feature has a *birth* time and a *death* time.
3. The **structure theorem** (Lesson 07) decomposes the persistence
   module into pieces — invariant factors $k[t]/(t^{b - a})$ — the
   **barcode**.
4. Long bars = robust topological features; short bars = noise.

Used in materials science (porous structures), biology (protein
folding), neuroscience (functional connectivity), economics
(volatility regimes).

## Walkthrough 3: tensors in the transformer

Self-attention computes:

$$
\mathrm{Attention}(Q, K, V) = \mathrm{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V.
$$

- $QK^T$ is an outer product — a **tensor product** (Lesson 08) of
  query and key embeddings.
- Multi-head attention runs many of these in parallel and
  concatenates — formally a tensor of tensors.
- Forward pass through multiple layers is composition of multilinear
  maps — module-theoretic composition.

Modern transformer optimisations (FlashAttention, multi-query
attention, grouped-query attention) re-shape this tensor product to
fit GPU memory hierarchy.

## Roadmap

**Strand 2 Master** picks up:

- Commutative algebra: Hilbert basis theorem, Nullstellensatz, primary
  decomposition.
- Algebraic geometry: schemes, sheaves, cohomology.
- Representation theory: characters, induced representations, modular
  representations.
- Homological algebra: chain complexes, derived functors, Tor and Ext
  in depth.
- Category theory: functors, natural transformations, Yoneda lemma.

**Strand 2 Research-adjacent**: derived algebraic geometry,
infinity-categories, motives, condensed mathematics.

## Closing

Modern algebra hides in the most concrete things — a Bitcoin
transaction's signature, a model checking a Kubernetes cluster, a
search index, a neural network's attention head. The theorems you
learned here give you the language to read what's really happening.

**The quintic taught us symmetry.** Galois theory turned that into a
correspondence between equations and groups. From there, the modern
program is to view *every* mathematical object through its
automorphism group, its symmetries — and the technology built on this
view runs the digital world.

## Interactive

:::widget type=numeric-input prompt="A Galois extension has $|\\mathrm{Gal}(K/F)| = [K:F]$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="The Galois group of $x^5 - x - 1$ is $S_5$. Solvable by radicals? Type 1 yes, 0 no." answer=0 explain="No.":::

:::widget type=numeric-input prompt="Tensor product dimension multiplies. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathbb{Z}/(p)$ for prime $p$ is a field. Type 1." answer=1 explain="Yes.":::

## Check Your Understanding

:::widget type=numeric-input prompt="The structure theorem for finitely generated abelian groups uses the PID = $\\mathbb{Z}$ case of module structure. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Persistent homology produces a barcode via the structure theorem of $k[t]$-modules. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cyclotomic field Galois groups are abelian. Type 1." answer=1 explain="Yes — $(\\mathbb{Z}/n)^*$.":::

:::widget type=numeric-input prompt="A quintic $f(x)$ may be solvable by radicals if its specific Galois group is solvable. Type 1." answer=1 explain="Yes — only generic quintics fail.":::
