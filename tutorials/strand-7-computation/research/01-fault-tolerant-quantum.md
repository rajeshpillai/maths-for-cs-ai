---
strand: computation
level: research
order: 1
title: Fault-Tolerant Quantum Computing
prerequisites:
  - tier: strand-7-computation-research
    slug: 00-p-vs-np-frontier
    description: P vs NP frontier
connections:
  - strand-7-computation-research/02-post-quantum-frontier
applications:
  - cs: "Useful quantum computers, quantum chemistry, quantum supremacy"
  - life: "Computing without irreversible decoherence destroying you"
---

# Fault-Tolerant Quantum Computing

## Explain Like I Am 7

Quantum coins are amazing but ridiculously fragile — sneeze near one
and it falls flat.  To do anything serious, scientists wrap one
*pretend* coin inside a circle of many *real* coins, all chiming
together so any one mistake gets out-voted.  As long as the chiming
circles can each be built reliably enough, you can stack them to make
a coin that almost never fails — even though every coin inside is a
bit unreliable.  This wrapping-and-voting trick is how a wobbly lab
contraption could one day grow into a trustworthy quantum computer.

## Mental

**NISQ** (Noisy Intermediate-Scale Quantum, ~2018-2025): physical
qubits noisy, no error correction. Limited useful tasks.

**Fault-tolerant quantum computing (FTQC)**: encode logical qubits
across many physical qubits via **quantum error-correcting codes
(QECCs)**, with fault-tolerant gate gadgets.

**Threshold theorem** (Aharonov-Ben-Or 1997, Knill-Laflamme-Zurek
1996): if physical-error rate below threshold ($\sim 10^{-3}$ for
surface code), arbitrary-length computation possible.

## Surface code

**Kitaev's toric / surface code**: best-studied QECC.

- **Logical qubit** = state encoded across 2D grid of physical
  qubits.
- **Stabiliser measurements** detect errors without disturbing
  encoded state.
- **Distance $d$**: tolerates $(d - 1)/2$ errors. Physical qubit
  count grows as $d^2$.

## Magic state distillation

Logical Clifford gates implementable via topological / lattice
operations on surface code. **Non-Clifford** (e.g., $T$ gate) needs
**magic state** input + state distillation.

Magic state distillation expensive: many low-fidelity inputs →
fewer high-fidelity outputs. Major resource cost in FTQC.

## Status (2025)

- **NISQ**: 50-1000 noisy qubits demonstrated (IBM, Google,
  IonQ).
- **Logical qubits**: ~10 demonstrated with low error.
- **Useful FTQC**: requires ~$10^6$ physical qubits + good error
  correction; not yet achieved.

Active engineering: superconducting (IBM, Google), trapped ion
(IonQ, Quantinuum), neutral atom (QuEra), photonic (PsiQuantum).

## Interactive

:::widget type=numeric-input prompt="Quantum threshold theorem (1996-1997). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Surface code: best-studied 2D QECC. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Magic state distillation needed for non-Clifford. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Useful FTQC needs ~$10^6$ physical qubits. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Stabiliser formalism**: efficient classical simulation of Clifford
circuits (Gottesman-Knill). Universal quantum computation requires
non-Clifford gates.

**LDPC quantum codes** (PRX Quantum 2022 onwards): asymptotically
good rate (logical:physical ratio bounded). Could dramatically
reduce qubit overhead.

**Floquet codes**: time-dependent stabilisers; fault-tolerant
implementations recently improved.

**$\mathrm{cQED}$ + bosonic codes**: encode qubit in continuous
quantum systems. GKP states, cat codes.

## Computational

```python
import numpy as np

# Surface code distance d on d×d patch needs ~d² physical qubits
# Logical error rate ~ (p / p_th)^{(d+1)/2}

def logical_error_rate(p, p_th, d):
    """Approximate logical error rate."""
    if p > p_th: return 1.0
    return (p / p_th) ** ((d + 1) / 2)

# Surface code threshold p_th ~ 10^-2 (some estimates)
p_th = 0.01
for p in [1e-3, 1e-4, 1e-5]:
    for d in [3, 5, 7]:
        err = logical_error_rate(p, p_th, d)
        n_physical = d * d
        print(f"p = {p:.0e}, d = {d}, |phys qubits| = {n_physical}, log err ≈ {err:.2e}")

# Useful FTQC needs ~10⁻¹⁰ logical error
# At p = 10⁻⁴, d ~ 25-30 sufficient → ~625-900 phys qubits per logical
# Thousands of logical qubits → millions of physical qubits
```

## Applied

- **Quantum chemistry** — VQE on FTQC could revolutionise materials
  science (battery design, catalysts).
- **Cryptanalysis** — Shor's algorithm at scale → break RSA / ECDSA.
  Drives post-quantum crypto migration.
- **Quantum simulation** — physical phenomena beyond classical
  reach.
- **Quantum ML** — speedups conditional on data-loading; theoretical
  open.
- **Optimisation** — QAOA, quantum-annealing-style; theoretical
  speedups debated.

## Check Your Understanding

:::widget type=numeric-input prompt="Threshold theorem: error rate < threshold → unbounded computation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Surface code: $d^2$ physical for distance $d$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="LDPC quantum codes promise asymptotically good rate. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Useful FTQC ~$10^6$ physical qubits. Type 1." answer=1 explain="Yes.":::
