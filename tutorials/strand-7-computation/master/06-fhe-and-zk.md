---
strand: computation
level: master
order: 6
title: Fully Homomorphic Encryption and Zero Knowledge
prerequisites:
  - tier: strand-7-computation-master
    slug: 05-streaming-sublinear
    description: Streaming and sublinear
connections:
  - strand-7-computation-master/07-differential-privacy
applications:
  - cs: "Privacy-preserving computation, blockchain, ML on encrypted data"
  - life: "Computing on data you can't see"
---

# Fully Homomorphic Encryption and Zero Knowledge

## Mental

**Fully Homomorphic Encryption (FHE)**: encrypt $x \to E(x)$, then
compute $E(f(x))$ from $E(x)$ without decrypting. *Compute on
ciphertext.*

**Zero-Knowledge Proof (ZKP)**: prove "I know $x$ such that $P(x)$"
*without revealing $x$*.

Both are foundational for privacy-preserving computation, blockchain,
and verifiable cryptocurrency.

## FHE timeline

- **1978**: RSA partially homomorphic ($\times$ only).
- **1999**: Paillier additively homomorphic ($+$ only).
- **2009**: Gentry's first FHE construction (lattice-based).
- **2013-2017**: BGV, BFV, CKKS, TFHE — practical FHE schemes.

Modern FHE (TFHE, Sealed-Bag, OpenFHE) computes hundreds of
operations per second per ciphertext on standard CPUs.

## Zero-knowledge proofs

A ZKP for predicate $P(x)$:

- **Completeness**: if $P(x)$ true, prover convinces verifier.
- **Soundness**: if $P(x)$ false, prover can't convince
  except with negligible probability.
- **Zero-knowledge**: verifier learns nothing beyond truth of $P(x)$.

**SNARKs / STARKs**: succinct, non-interactive ZKP. Verifying
takes $\mathrm{poly}(\log)$ in computation size.

## Worked example: ZK proof of graph 3-coloring

Prover wants to convince verifier "this graph is 3-colorable" without
revealing the colouring:

1. Pick a random permutation $\pi$ of $\{1, 2, 3\}$.
2. Apply $\pi$ to colouring $c$.
3. Commit to colours of all vertices.
4. Verifier picks random edge $(u, v)$.
5. Prover opens commitments at $u$ and $v$.
6. Verifier accepts iff colours differ.

Repeat $|E|^2$ times to drive cheating probability to $1/2^{|E|}$.

## Interactive

:::widget type=numeric-input prompt="FHE allows computing on ciphertext. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Gentry's first FHE: 2009. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="ZKP: prove without revealing. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="SNARK = Succinct Non-interactive ARgument of Knowledge. Type 1." answer=1 explain="Yes.":::

## Symbolic

**LWE / Ring-LWE / NTRU**: hardness assumptions underlying lattice-
based FHE.

**Bootstrapping**: refresh ciphertexts to reduce noise; key
operation in FHE schemes. Fast bootstrapping (TFHE) was a
breakthrough.

**zkSTARK**: post-quantum ZKP using only hash-function assumptions
(Reed-Solomon-style).

**Polynomial commitments (KZG)**: cryptographic commitments to
polynomials, openable at any point with succinct proof. Used in
PLONK SNARKs and Ethereum's data-availability layer.

**MPC**: secure multi-party computation; FHE is one technique;
secret sharing (Shamir, Yao) is another.

## Computational

```python
# FHE / ZKP require sophisticated cryptographic libraries
# Here we sketch Paillier (additively homomorphic)

from sympy import randprime, gcd
import math

def paillier_keygen(bits=64):
    p = randprime(2**(bits//2 - 1), 2**(bits//2))
    q = randprime(2**(bits//2 - 1), 2**(bits//2))
    while p == q:
        q = randprime(2**(bits//2 - 1), 2**(bits//2))
    n = p * q
    n2 = n * n
    g = n + 1
    lam = (p - 1) * (q - 1) // gcd(p - 1, q - 1)  # lcm
    mu = pow(lam, -1, n)
    return (n, g, n2), (lam, mu)

def paillier_encrypt(m, pub):
    n, g, n2 = pub
    import random
    r = random.randrange(1, n)
    while gcd(r, n) != 1:
        r = random.randrange(1, n)
    return (pow(g, m, n2) * pow(r, n, n2)) % n2

def paillier_decrypt(c, priv, n, n2):
    lam, mu = priv
    L = (pow(c, lam, n2) - 1) // n
    return (L * mu) % n

# Demonstrate additive homomorphism: E(a) * E(b) = E(a + b)
pub, priv = paillier_keygen(bits=32)
n = pub[0]; n2 = pub[2]
c1 = paillier_encrypt(15, pub)
c2 = paillier_encrypt(7, pub)
c_sum = (c1 * c2) % n2
m_sum = paillier_decrypt(c_sum, priv, n, n2)
print(f"Decrypted sum: {m_sum}, expected: 22")

# Real FHE (BFV / CKKS) and ZKP (zkSNARKs) require dedicated libraries:
# Microsoft SEAL, OpenFHE for FHE; circom + snarkjs / Halo2 for ZK
```

## Applied

- **Encrypted ML** — train / inference on encrypted data (FHE-based
  neural-net inference).
- **Privacy-preserving data analytics** — Google's PIR, Microsoft
  SEAL.
- **Blockchain rollups** — zkSync, StarkNet use SNARKs for compressed,
  verifiable execution.
- **Verifiable computation** — STARKs prove correctness of long
  computations to skeptical verifiers.
- **Decentralised identity** — anonymous credentials with ZKP.

## Check Your Understanding

:::widget type=numeric-input prompt="FHE: compute on ciphertext. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Paillier is additively homomorphic. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="ZKP completeness, soundness, zero-knowledge. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="zkSTARKs use only hash assumptions, post-quantum. Type 1." answer=1 explain="Yes.":::
