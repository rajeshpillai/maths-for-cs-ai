---
strand: computation
level: research
order: 8
title: Quantum Supremacy and Verification
prerequisites:
  - tier: strand-7-computation-research
    slug: 07-tcs-frontier-codes-pcps
    description: TCS frontier codes
connections:
  - strand-7-computation-research/09-computation-research-capstone
applications:
  - cs: "Demonstrating quantum advantage; benchmarking quantum hardware"
  - life: "When quantum computers outperform classical for specific tasks"
---

# Quantum Supremacy and Verification

## Explain Like I Am 7

Picture a hundred ordinary calculators racing one quantum gizmo on a
job specially designed to be horrible for ordinary calculators.  When
the gizmo finishes in minutes and the calculator army is *still*
chugging away weeks later, scientists call that *quantum supremacy*.
The trickier question is: how do you check the gizmo's answer is
right when no calculator can keep up?  Researchers invent statistical
tests — gentle nudges that a real quantum machine should pass and a
fake one would flunk.

## Mental

**Quantum supremacy / advantage**: a quantum computer performing a
task no classical computer can in reasonable time.

**Demonstrations**:

- **Sycamore** (Google 2019): random circuit sampling on 53 qubits.
- **Jiuzhang** (USTC 2020): boson sampling photonics.
- **Zuchongzhi** (USTC 2021): random circuit sampling on 56 qubits.
- **Borealis** (Xanadu 2022): Gaussian boson sampling, 216 modes.

Each followed by classical refutation attempts; quantum advantage
contested in real time.

## Random circuit sampling

A random quantum circuit produces samples from a complicated
distribution. Classically simulating the distribution takes
exponential time.

**Cross-entropy benchmarking** (XEB): empirical fidelity measure;
heuristic verification.

## Boson sampling

Photonic computation of permanent of unitary matrix — a $\#P$-hard
classical problem.

**Jiuzhang** + **Borealis**: real photonic devices doing it.

## Verification challenges

Even *demonstrating* quantum supremacy faces challenges:

- Classical refinements occasionally beat earlier supremacy demos.
- Verification of quantum output is *itself* hard (in general).
- **Bouland-Fefferman-Vazirani-Yu**: theoretical hardness of
  classical verification of XEB.

## Theoretical quantum advantage

- **Shor's algorithm**: exponential speedup for factoring (BQP vs
  expected non-P).
- **HHL algorithm**: exponential speedup for sparse linear
  systems — *if* input/output access is favourable.
- **Grover**: quadratic, well-understood.
- **Quantum walks** for various graph problems.

## Interactive

:::widget type=numeric-input prompt="Sycamore (Google 2019) random circuit sampling. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Jiuzhang (USTC 2020) photonic boson sampling. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="XEB: cross-entropy benchmarking. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Borealis (Xanadu 2022) Gaussian boson sampling. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Quantum advantage benchmarks** (NIST, ARPA-H projects): build
agreed-upon benchmarks for "useful quantum advantage."

**Quantum software stack**: Qiskit, Cirq, Pennylane, Q#. Compilation
of quantum circuits to error-corrected logical circuits.

**Hybrid quantum-classical algorithms**: VQE, QAOA — much smaller
quantum circuits combined with classical optimisation. Currently
practical-NISQ frontier.

**Quantum machine learning**: speedup conditional on input access;
genuine speedups elusive.

## Computational

```python
import numpy as np

# Random quantum circuit simulation (small)
def random_circuit_sim(n_qubits, depth):
    """Simulate small random circuit; returns final state."""
    state = np.zeros(2**n_qubits, dtype=complex)
    state[0] = 1
    for _ in range(depth):
        for q in range(n_qubits):
            # Random single-qubit unitary — Haar
            U = np.linalg.qr(np.random.randn(2, 2) + 1j * np.random.randn(2, 2))[0]
            # Apply to qubit q
            # (Simplified — full impl applies tensor properly)
        # Random entangling gates
    return state

# Cross-entropy benchmarking heuristic
def xeb_fidelity(samples, ideal_distribution):
    """XEB: <p_ideal>_samples - 1 / 2^n."""
    n = int(np.log2(len(ideal_distribution)))
    avg_p = np.mean([ideal_distribution[s] for s in samples])
    return 2**n * avg_p - 1

# Sycamore: claimed 200s quantum vs 10000 years classical
# IBM responded with classical algorithm in 2.5 days
# Classical-quantum back-and-forth ongoing
print("Quantum supremacy: contested + iteratively refined.")

# Useful FTQC (Strand 7 Research Lesson 01) is the next milestone
print("Next milestone: useful FTQC with logical-qubit error < 10^-10.")
```

## Applied

- **Quantum-hardware benchmarking** — XEB and related.
- **Quantum-classical comparisons** — driving classical algorithm
  improvements.
- **Investment / industry signaling** — supremacy demos affect
  research funding.
- **Cryptographic threat assessment** — Shor + supremacy → migration
  timing.
- **Quantum simulation of physics** — short-term useful direction.

## Check Your Understanding

:::widget type=numeric-input prompt="Sycamore Google 2019 random-circuit sampling. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="XEB benchmarks quantum hardware fidelity. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="VQE / QAOA hybrid algorithms for NISQ. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="HHL: exponential speedup conditional on input/output access. Type 1." answer=1 explain="Yes.":::
