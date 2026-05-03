---
strand: number-quantity
level: research
order: 7
title: Arithmetic Statistics
prerequisites:
  - tier: strand-1-number-quantity-research
    slug: 06-deep-l-functions
    description: Deep L-functions
connections:
  - strand-1-number-quantity-research/08-circle-method
applications:
  - cs: "Random-curve crypto, big-data number theory experiments"
  - life: "Statistics of arithmetic objects"
---

# Arithmetic Statistics

## Mental

**Arithmetic statistics** asks: "what's the distribution of X among
all objects of size $\le N$?" for various $X$.

Examples:

- Distribution of class numbers of imaginary quadratic fields.
- Average rank of elliptic curves ordered by conductor /
  discriminant.
- Density of primes in residue classes (Chebotarev).
- Distribution of Galois groups of random polynomials.

## Bhargava's program

**Manjul Bhargava** (Fields medal 2014) revolutionised the area:

- **Number-field counting** — explicit asymptotics for
  number-fields of bounded discriminant by degree.
- **Average rank of elliptic curves** — proved that average rank of
  $E / \mathbb Q$ ordered by height is $\le 7/6$ (and conjectured
  $1/2$).
- **Selmer ranks** — established density results for $p$-Selmer
  groups.

Bhargava's tools blend classical Gauss composition with modern
geometry of numbers and Igusa zeta functions.

## Cohen-Lenstra heuristics

For class groups of imaginary quadratic fields:

**Cohen-Lenstra** (1984): predicts the *probability* that the
$p$-part of the class group has a given structure.

Empirical fit excellent. Theoretical results: Davenport-Heilbronn
(asymptotics for cubic fields, recently sharpened).

## Density theorems

**Chebotarev density theorem**: for Galois extension $L/K$ with group
$G$, density of primes whose Frobenius lies in conjugacy class
$C \subset G$ equals $|C|/|G|$.

Generalises Dirichlet's theorem on primes in APs.

## Interactive

:::widget type=numeric-input prompt="Bhargava Fields medal 2014. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cohen-Lenstra heuristics on class-group $p$-parts. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Chebotarev: Frobenius distribution among conjugacy classes. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Bhargava-Skinner-Zhang: average rank of EC bounded $\\le 7/6$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Geometry of numbers**: Minkowski's foundational tools. Bhargava-
Shankar count integer points in fundamental domains for group
actions on prehomogeneous spaces.

**Igusa zeta functions**: $p$-adic generating series for
$p$-adic point counts on varieties; connect to motivic integration.

**Random-matrix predictions**: zeros of L-families distribute as
random matrices from specific symmetry types (unitary,
orthogonal, symplectic).

**Sato-Tate** distribution (proven 2008-2011): for non-CM elliptic
curves, normalized $a_p / 2\sqrt p$ equidistribute according to
$\sin^2 \theta \cdot 2/\pi$ measure.

## Computational

```python
import math
import random
from sympy import primerange, factorint, isprime

# Density of primes ≡ a mod 4 (Dirichlet)
N = 100000
primes = list(primerange(2, N))
mod_4 = {1: 0, 3: 0}
for p in primes:
    if p % 4 in mod_4:
        mod_4[p % 4] += 1

print(f"Primes ≡ 1 mod 4: {mod_4[1] / len(primes):.4f} (expected ~0.5)")
print(f"Primes ≡ 3 mod 4: {mod_4[3] / len(primes):.4f}")

# Bhargava counting: number-field discriminants
# Number of number fields of degree n with |disc| ≤ X grows ~c X
# Bhargava-Wood bounds asymptotics

# Random elliptic curves: average rank
# Generate random Weierstrass coefficients (a, b) with small height
# and approximately count their ranks (here, just demo)
def random_curves(N, height=10):
    return [(random.randint(-height, height), random.randint(-height, height))
            for _ in range(N)]

curves = random_curves(20)
print(f"Random EC sample (a, b): {curves[:5]}")
# Real rank computation needs SageMath / Magma

# Sato-Tate angle distribution
def sato_tate_density(theta):
    return 2 / math.pi * math.sin(theta)**2

# Verify: integral over [0, π] equals 1
import scipy.integrate as integrate
total, _ = integrate.quad(sato_tate_density, 0, math.pi)
print(f"Sato-Tate measure total: {total:.4f}")
```

## Applied

- **Cryptographic curve selection** — average-case statistics inform
  expected security of random elliptic curves.
- **Big-data number theory** — LMFDB catalogues millions of L-functions
  and varieties for empirical validation of conjectures.
- **AI-assisted conjecture-making** — pattern detection in empirical
  arithmetic data.
- **Cohen-Lenstra in lattice crypto** — class-group statistics
  inform cryptographic parameter analysis.
- **Mathematics-of-mathematics** — meta-statistical approach to
  theorem distribution and proof difficulty.

## Check Your Understanding

:::widget type=numeric-input prompt="Bhargava Fields medal 2014. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cohen-Lenstra: distribution of class-group $p$-parts. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Chebotarev density theorem extends Dirichlet. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Sato-Tate distribution: $(2/\\pi)\\sin^2\\theta$. Type 1." answer=1 explain="Yes.":::
