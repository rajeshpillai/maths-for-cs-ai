---
strand: computation
level: master
order: 2
title: Quantum Algorithms
prerequisites:
  - tier: strand-7-computation-master
    slug: 01-gpu-programming
    description: GPU programming
connections:
  - strand-7-computation-master/03-recursion-theory
applications:
  - cs: "Cryptanalysis (Shor), database search (Grover), quantum simulation"
  - life: "Computation that exploits superposition and entanglement"
---

# Quantum Algorithms

## Mental

A **qubit** is a unit vector in $\mathbb C^2$:
$|\psi\rangle = \alpha |0\rangle + \beta |1\rangle$ with $|\alpha|^2 + |\beta|^2 = 1$.

$n$ qubits live in $\mathbb C^{2^n}$ — exponentially large state
space.

**Operations** are unitary matrices on $\mathbb C^{2^n}$.
**Measurement** in standard basis returns $|i\rangle$ with
probability $|\langle i | \psi \rangle|^2$, collapsing the state.

## Famous quantum algorithms

| Algorithm | Solves | Speedup |
|---|---|---|
| Shor (1994) | Integer factorisation, discrete log | Exponential |
| Grover (1996) | Unstructured search | Quadratic |
| Quantum Fourier (QFT) | Period finding (used in Shor) | Exponential |
| HHL | Linear systems with sparse matrix | Exponential |
| Quantum simulation | Local Hamiltonians | Exponential |
| Quantum walks | Graph problems, search | Polynomial |

## Shor's algorithm

To factor $N = pq$:

1. Pick random $a$ coprime to $N$.
2. Find period $r$ of $f(x) = a^x \mod N$ — the **hard step**, done
   via QFT in $\mathrm{poly}(\log N)$.
3. If $r$ even and $a^{r/2} \ne -1 \pmod N$: $\gcd(a^{r/2} \pm 1, N)$
   gives factors.

Period-finding via QFT takes polynomial quantum time; classical
period-finding is exponential.

**Implication**: a sufficiently large quantum computer breaks RSA,
ECDSA, ECDH. Hence the rush to **post-quantum cryptography**.

## Grover's search

Find $x$ with $f(x) = 1$ given oracle $O_f$ in $N$-element database:

- Classical: $O(N)$.
- Grover: $O(\sqrt N)$.

Quadratic speedup. Used as subroutine in many quantum algorithms.

## Interactive

:::widget type=numeric-input prompt="Qubit: unit vector in $\\mathbb C^2$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$n$-qubit state space: $\\mathbb C^{2^n}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Shor: factors integers in $\\mathrm{poly}(\\log N)$ time. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Grover: $O(\\sqrt N)$ unstructured search. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Quantum complexity classes**:

- **BQP**: bounded-error quantum polynomial. Believed strictly larger
  than P.
- **QMA**: quantum NP — verified by quantum proofs.
- $P \subseteq BQP \subseteq AWPP \subseteq PP$. Many separations
  open.

**Quantum supremacy / advantage**: Google (2019) and USTC (2020)
demonstrated quantum tasks beyond classical reach. Boson sampling,
random-circuit sampling.

**Error correction**: physical qubits noisy; encode logical qubits
across many physical via stabiliser codes (surface code, Shor, Steane).
**Fault-tolerant threshold theorem**: error correctible if physical
error rate below threshold ($\sim 10^{-3}$).

**Quantum algorithms for ML**: HHL, quantum SVM, quantum k-means,
variational quantum eigensolver (VQE). Speedups conditional on
specific input/output structure.

## Computational

```python
import numpy as np

# Single-qubit gates
H = np.array([[1, 1], [1, -1]]) / np.sqrt(2)         # Hadamard
X = np.array([[0, 1], [1, 0]])                        # NOT
Z = np.array([[1, 0], [0, -1]])                       # phase flip

# Two-qubit CNOT
CNOT = np.array([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0]
])

# Bell state preparation: |00> -> (|00> + |11>) / sqrt 2
state = np.array([1, 0, 0, 0])           # |00>
state = np.kron(H, np.eye(2)) @ state    # H on first qubit
state = CNOT @ state
print("Bell state:", state)              # [0.707, 0, 0, 0.707]

# Grover for N = 4: search for index 2 (i.e., |10>)
N = 4
psi = np.ones(N) / np.sqrt(N)            # uniform superposition

# Oracle: flip phase of target
def oracle(psi, target):
    psi = psi.copy()
    psi[target] *= -1
    return psi

# Diffusion: 2|s><s| - I where |s> = uniform
def diffusion(psi):
    s = np.ones(N) / np.sqrt(N)
    return 2 * np.dot(s, psi) * s - psi

# Single Grover iteration
target = 2
psi = oracle(psi, target)
psi = diffusion(psi)
print("After 1 Grover step:", np.abs(psi)**2)
# Probability concentrated near target

# Optimal: ~sqrt(N) iterations; for N = 4 just one is enough
print("Probability of measuring target:", np.abs(psi[target])**2)
```

## Applied

- **Post-quantum cryptography** — NIST standardised lattice-based
  (Kyber, Dilithium), hash-based (SPHINCS+). Designed to resist Shor.
- **Quantum simulation** — chemistry (catalyst design), materials,
  high-energy physics.
- **Quantum machine learning** — variational quantum circuits,
  quantum neural networks. Currently mostly theoretical.
- **Quantum supremacy benchmarks** — Sycamore (Google), Jiuzhang
  (USTC) demonstrate per-task advantage.
- **Quantum networking** — quantum key distribution (QKD), quantum
  internet research.

## Check Your Understanding

:::widget type=numeric-input prompt="Qubit lives in $\\mathbb C^2$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Shor breaks RSA in poly time. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Grover: $O(\\sqrt N)$ search. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Quantum threshold theorem: fault-tolerant if error rate < ~10⁻³. Type 1." answer=1 explain="Yes.":::
