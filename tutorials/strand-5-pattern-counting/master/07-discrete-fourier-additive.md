---
strand: pattern-counting
level: master
order: 7
title: Discrete Fourier Analysis on Groups
prerequisites:
  - tier: strand-5-pattern-counting-master
    slug: 06-additive-combinatorics-deeper
    description: Additive combinatorics deeper
connections:
  - strand-5-pattern-counting-master/08-extremal-and-ramsey-deeper
applications:
  - cs: "Coding theory, signal processing, fast algorithms, additive combinatorics"
  - life: "Fourier analysis on finite groups"
---

# Discrete Fourier Analysis on Groups

## Mental

For a finite abelian group $G$:

The **Pontryagin dual** $\hat G$ = group of characters $\chi : G \to S^1$.
For $G$ finite abelian, $\hat G \cong G$ (non-canonically).

For $f : G \to \mathbb C$:

$$
\hat f(\chi) = \sum_{x \in G} f(x) \overline{\chi(x)}.
$$

**Plancherel**: $\sum_x |f(x)|^2 = \frac{1}{|G|} \sum_\chi |\hat f(\chi)|^2$.

**Parseval / convolution-multiplication**: $\widehat{f \star g} = \hat f \cdot \hat g$.

## Examples

| $G$ | $\hat G$ | Characters |
|---|---|---|
| $\mathbb Z/n$ | $\mathbb Z/n$ | $\chi_k(x) = e^{2\pi i k x / n}$ |
| $\mathbb F_2^n$ | $\mathbb F_2^n$ | $\chi_y(x) = (-1)^{\langle x, y \rangle}$ |
| $\mathbb Z$ | $S^1$ | $\chi_t(n) = e^{2\pi i n t}$ |
| $S^1$ | $\mathbb Z$ | $\chi_n(\theta) = e^{i n \theta}$ |
| Finite abelian | itself | products of these |

## Worked example: $\mathbb F_2^n$ Walsh-Hadamard

For $G = \mathbb F_2^n$, characters are $\chi_y(x) = (-1)^{x \cdot y}$.

The Fourier transform is the **Walsh-Hadamard transform**:

$$
\hat f(y) = \sum_x f(x) (-1)^{x \cdot y}.
$$

In matrix form: $\hat f = H_n f$ where $H_n$ is the $n$-fold tensor
product of $H = \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$.

Computable in $O(N \log N)$ ($N = 2^n$) — the **fast Walsh-Hadamard
transform**.

## Linearity testing (BLR 1993)

Goal: test if $f : \mathbb F_2^n \to \mathbb F_2$ is **linear**
$f(x) = \langle a, x \rangle$ for some $a$ — query-efficiently.

**Algorithm**: pick $x, y$ uniformly random; check $f(x) + f(y) = f(x + y)$.
Reject if not.

**Theorem**: if $f$ is $\epsilon$-far from linear (must change at
least $\epsilon$ fraction of values to make linear), one round
detects with probability $\ge \epsilon$.

Foundation of property testing and PCP theorem in TCS.

## Interactive

:::widget type=numeric-input prompt="Walsh-Hadamard is Fourier on $\\mathbb F_2^n$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Plancherel: $\\sum |f|^2 = (1/|G|) \\sum |\\hat f|^2$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="BLR linearity test: 3 queries per round. Type 3." answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="Convolution Fourier-dual to multiplication on groups. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Discrete Fourier Transform (DFT)**: special case for $G = \mathbb Z/n$.
FFT computes in $O(n \log n)$.

**Number-Theoretic Transform (NTT)**: DFT over $\mathbb F_p$ where
$p$ has $n$ as a divisor of $p - 1$. Used in lattice-based crypto
(Kyber, Dilithium) and integer multiplication algorithms.

**Spectral graph theory** (next): Fourier on Cayley graphs of
abelian groups. Generalises to non-abelian groups via representation
theory (Strand 2 Master Lesson 05).

**Fourier-analytic combinatorics**: bounds on additive structure
via $\hat f$ — Roth's theorem proof, Behrend bounds, etc.

## Computational

```python
import numpy as np

# Walsh-Hadamard transform
def walsh_hadamard(f):
    f = np.array(f, dtype=float)
    n = len(f)
    h = 1
    while h < n:
        for i in range(0, n, h * 2):
            for j in range(i, i + h):
                x = f[j]
                y = f[j + h]
                f[j] = x + y
                f[j + h] = x - y
        h *= 2
    return f

# Test on a simple function
f = [1, -1, 1, -1, 1, -1, 1, -1]   # Linear: f(x) = (-1)^{x_0}
print(walsh_hadamard(f))            # Should peak at one frequency

# BLR linearity test
def is_linear_blr(f_table, num_tests=100):
    n = int(np.log2(len(f_table)))
    rejects = 0
    for _ in range(num_tests):
        x = np.random.randint(0, 2, n)
        y = np.random.randint(0, 2, n)
        f_x = f_table[int(''.join(map(str, x)), 2)]
        f_y = f_table[int(''.join(map(str, y)), 2)]
        f_xy = f_table[int(''.join(map(str, (x + y) % 2)), 2)]
        if (f_x + f_y) % 2 != f_xy:
            rejects += 1
    return rejects / num_tests

# Linear function: f(x) = x_0
n = 4
table_linear = [(int(format(i, f'0{n}b')[0])) for i in range(2**n)]
print("Linear reject rate:", is_linear_blr(table_linear))   # 0

# Non-linear: f = AND
table_and = [int(format(i, f'0{n}b')[0]) & int(format(i, f'0{n}b')[1]) for i in range(2**n)]
print("AND reject rate:", is_linear_blr(table_and))         # ~0.25
```

## Applied

- **Coding theory** — Reed-Muller codes via Fourier on $\mathbb F_2^n$.
- **PCP theorem (TCS)** — BLR linearity testing was a key ingredient.
- **Fast multiplication** — NTT used in lattice-based crypto and
  big-integer arithmetic.
- **Differential privacy** — randomised response and discrete
  mechanisms analysed via Fourier.
- **Quantum algorithms** — Hidden Subgroup Problem (HSP) for abelian
  $G$ solved efficiently via QFT (quantum DFT).

## Check Your Understanding

:::widget type=numeric-input prompt="Walsh-Hadamard = Fourier on $\\mathbb F_2^n$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Fast Walsh-Hadamard: $O(N \\log N)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="BLR linearity test: 3 queries per round. Type 3." answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="NTT used in Kyber/Dilithium PQ crypto. Type 1." answer=1 explain="Yes.":::
