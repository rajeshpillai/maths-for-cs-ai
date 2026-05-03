---
strand: computation
level: research
order: 2
title: Post-Quantum Cryptography Frontier
prerequisites:
  - tier: strand-7-computation-research
    slug: 01-fault-tolerant-quantum
    description: Fault-tolerant quantum
connections:
  - strand-7-computation-research/03-mpc-and-verifiable-computation
applications:
  - cs: "NIST PQC standards, secure communication after Shor"
  - life: "Cryptography that survives quantum computers"
---

# Post-Quantum Cryptography Frontier

## Mental

Shor's algorithm breaks RSA / DH / ECDSA on a sufficiently large
quantum computer. **Post-quantum cryptography (PQC)**: classical
schemes resistant to both classical *and* quantum attacks.

NIST PQC standardisation (2016-present): standards published 2024
for key-encapsulation (Kyber / ML-KEM) and signatures (Dilithium /
ML-DSA, FALCON, SPHINCS+).

## Hardness assumptions

Modern PQC families:

| Family | Assumption |
|---|---|
| Lattice | Learning With Errors (LWE), Ring-LWE, Module-LWE |
| Code-based | Decoding random linear codes |
| Hash-based | One-way / collision-resistance |
| Multivariate | Solving multivariate quadratic systems (MQ) |
| Isogeny | Supersingular isogeny path-finding |

## NIST 2024 standards

- **ML-KEM (Kyber)**: lattice-based KEM, FIPS 203.
- **ML-DSA (Dilithium)**: lattice-based signature, FIPS 204.
- **SLH-DSA (SPHINCS+)**: hash-based signature, FIPS 205.
- **HQC, FN-DSA (FALCON), Classic McEliece**: alternates / future
  standards.

## Isogeny crypto: the SIKE break

**Castryck-Decru 2022**: broke SIDH / SIKE in *minutes* on a laptop.

Lessons:

- Mathematically deep schemes can fall to classical mathematical
  breakthroughs.
- Newer isogeny schemes (CSIDH, SQIsign) survive but are conservative.

Reminds the field that *new mathematics ≠ new security*.

## Lattice cryptography

**LWE problem**: given $(\mathbf A, \mathbf b = \mathbf A \mathbf s + \mathbf e)$
with secret $\mathbf s$ and small noise $\mathbf e$, recover $\mathbf s$.
Hard on average even with quantum computer.

**Ring-LWE**: variant in cyclotomic rings; faster algorithms but
still believed hard.

**FrodoKEM**: pure-LWE conservative alternative; less efficient.

## Interactive

:::widget type=numeric-input prompt="ML-KEM (Kyber) standardised 2024 by NIST. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="ML-DSA (Dilithium) signature standardised. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="SIKE broken (Castryck-Decru 2022). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="LWE: $(\\mathbf A, \\mathbf{As} + \\mathbf e)$ recovery. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Reduction security**: PQ schemes have *worst-case-to-average-case*
reductions (lattice problems). Strong theoretical guarantee.

**Hash-based limitations**: SPHINCS+ very conservative but signatures
are large (KB-MB).

**Multivariate Rainbow** broke 2022 (Beullens). Multi-decade-old
multivariate schemes mostly broken; cautionary tale.

**Quantum-secure obfuscation, FHE, ZK**: research frontier
extending PQC to richer functionality.

## Computational

```python
# Real PQC requires libraries: liboqs, pqclean, NIST submission code
# Sketch: tiny LWE
import numpy as np

def lwe_keygen(n=10, q=257, sigma=1):
    A = np.random.randint(0, q, (n, n))
    s = np.random.randint(0, q, n)
    e = np.round(np.random.normal(0, sigma, n)).astype(int) % q
    b = (A @ s + e) % q
    return (A, b), s

def lwe_encrypt(message_bit, pub, q=257):
    A, b = pub
    n = len(b)
    # Sample random subset
    r = np.random.randint(0, 2, n)
    u = (r @ A) % q
    v = (r @ b + (q // 2) * message_bit) % q
    return u, v

def lwe_decrypt(ciphertext, s, q=257):
    u, v = ciphertext
    diff = (v - u @ s) % q
    return 1 if abs(diff - q // 2) < q // 4 else 0

pub, s = lwe_keygen()
m = 1
c = lwe_encrypt(m, pub)
print(f"Encrypted bit {m}, decrypted {lwe_decrypt(c, s)}")

# In production: use NIST-standard parameters in PQClean / liboqs
print("Production PQC: pqclean, liboqs, OpenQuantumSafe.")
```

## Applied

- **Web traffic** — TLS 1.3 + ML-KEM hybrids being deployed (2024-2026).
- **Long-term sensitive data** — "harvest now, decrypt later" mitigated
  by PQC migration.
- **Government / military** — accelerated migration via NSA CNSA 2.0
  guidance (2022).
- **Blockchain** — Ethereum considering PQC for long-term safety.
- **Quantum-resistant signatures for code signing** — high-value
  early targets.

## Check Your Understanding

:::widget type=numeric-input prompt="ML-KEM, ML-DSA, SLH-DSA NIST 2024 standards. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="SIKE broken Castryck-Decru 2022. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="LWE worst-case-to-average-case reduction. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hash-based PQC very conservative but signatures large. Type 1." answer=1 explain="Yes.":::
