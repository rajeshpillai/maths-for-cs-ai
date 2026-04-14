# Number Theory Foundations

## Intuition

Every integer has a unique "DNA" — its prime factorisation. Just as every molecule
breaks down into atoms, every integer greater than 1 decomposes into a product
of primes in exactly one way. This is the **Fundamental Theorem of Arithmetic (FTA)**,
and it underpins cryptography, hashing, and error-detection codes throughout CS.

## Prerequisites

- **Tier 0, Lesson 5** — Prime numbers, GCD, LCM, Euclidean algorithm

## From First Principles

### Divisibility

We say $a$ divides $b$ (written $a \mid b$) if there exists an integer $k$
such that $b = a \cdot k$.

**Properties (pen & paper):**

1. **Reflexive:** $a \mid a$ because $a = a \cdot 1$
2. **Transitive:** if $a \mid b$ and $b \mid c$, then $a \mid c$.
   Proof: $b = ak_1$, $c = bk_2 = a(k_1 k_2)$.
3. **Linear combination:** if $a \mid b$ and $a \mid c$, then $a \mid (mb + nc)$
   for any integers $m, n$.

**Example:** Does $6 \mid 42$? Yes, because $42 = 6 \times 7$.

### Prime Factorisation

A prime $p > 1$ has no divisors other than $1$ and $p$.

To factorise $n$ by hand, try dividing by primes $2, 3, 5, 7, \ldots$ up to $\sqrt{n}$.

**Example:** Factorise $180$.

$$180 = 2 \times 90 = 2 \times 2 \times 45 = 2^2 \times 3 \times 15 = 2^2 \times 3^2 \times 5$$

### The Fundamental Theorem of Arithmetic

**Statement:** Every integer $n > 1$ can be written as a product of primes

$$n = p_1^{a_1} \cdot p_2^{a_2} \cdots p_k^{a_k}$$

and this representation is **unique** up to ordering.

**Proof sketch (by strong induction):**

- *Base:* $n = 2$ is prime, so the factorisation is just $2$.
- *Inductive step:* Assume every integer $2 \le m < n$ has a unique prime factorisation.
  - If $n$ is prime, done.
  - If $n$ is composite, $n = ab$ with $1 < a, b < n$. By induction, $a$ and $b$
    each have unique factorisations, so their product gives one for $n$.
- *Uniqueness:* Uses **Euclid's Lemma** — if $p \mid ab$ and $p$ is prime,
  then $p \mid a$ or $p \mid b$.

### GCD and LCM via Prime Factorisation

Given $a = \prod p_i^{a_i}$ and $b = \prod p_i^{b_i}$:

$$\gcd(a, b) = \prod p_i^{\min(a_i, b_i)}$$
$$\text{lcm}(a, b) = \prod p_i^{\max(a_i, b_i)}$$

**Example:** $a = 2^2 \cdot 3 \cdot 5 = 60$, $b = 2 \cdot 3^2 = 18$.

$$\gcd(60, 18) = 2^1 \cdot 3^1 = 6$$
$$\text{lcm}(60, 18) = 2^2 \cdot 3^2 \cdot 5 = 180$$

**Verify:** $\gcd(a,b) \cdot \text{lcm}(a,b) = 6 \times 180 = 1080 = 60 \times 18 = a \cdot b$. Correct.

### Visualisation

```python
import matplotlib.pyplot as plt

def prime_factors(n):
    factors = {}
    d = 2
    while d * d <= n:
        while n % d == 0:
            factors[d] = factors.get(d, 0) + 1
            n //= d
        d += 1
    if n > 1:
        factors[n] = factors.get(n, 0) + 1
    return factors

# Show factor trees for several numbers
numbers = [12, 30, 60, 84, 180, 360]
fig, ax = plt.subplots(figsize=(10, 4))
for i, n in enumerate(numbers):
    pf = prime_factors(n)
    label = " x ".join(f"{p}^{e}" if e > 1 else str(p) for p, e in sorted(pf.items()))
    ax.barh(i, len(pf), color='steelblue', edgecolor='black')
    ax.text(len(pf) + 0.1, i, f"{n} = {label}", va='center', fontsize=11)
ax.set_yticks(range(len(numbers)))
ax.set_yticklabels(numbers)
ax.set_xlabel("Number of distinct prime factors")
ax.set_title("Prime Factorisations")
plt.tight_layout()
plt.savefig("number_theory_factors.png", dpi=100)
plt.show()
```

## Python Verification

```python
import math

# ── Prime Factorisation from scratch ────────────────────
def prime_factors(n):
    """Return dict {prime: exponent}."""
    factors = {}
    d = 2
    while d * d <= n:
        while n % d == 0:
            factors[d] = factors.get(d, 0) + 1
            n //= d
        d += 1
    if n > 1:
        factors[n] = factors.get(n, 0) + 1
    return factors

# Step 1: Factorise 180
n = 180
pf = prime_factors(n)
print(f"Prime factorisation of {n}: {pf}")
# Expected: {2: 2, 3: 2, 5: 1}

# Step 2: GCD and LCM via prime factorisation
def gcd_from_factors(fa, fb):
    primes = set(fa) | set(fb)
    return math.prod(p ** min(fa.get(p, 0), fb.get(p, 0)) for p in primes)

def lcm_from_factors(fa, fb):
    primes = set(fa) | set(fb)
    return math.prod(p ** max(fa.get(p, 0), fb.get(p, 0)) for p in primes)

fa, fb = prime_factors(60), prime_factors(18)
print(f"gcd(60, 18) = {gcd_from_factors(fa, fb)}")   # 6
print(f"lcm(60, 18) = {lcm_from_factors(fa, fb)}")   # 180

# Step 3: Verify identity gcd * lcm = a * b
g, l = gcd_from_factors(fa, fb), lcm_from_factors(fa, fb)
print(f"gcd * lcm = {g * l}, a * b = {60 * 18}, equal: {g * l == 60 * 18}")

# Step 4: Verify with math module
print(f"math.gcd(60,18) = {math.gcd(60, 18)}")
print(f"math.lcm(60,18) = {math.lcm(60, 18)}")
```

## Connection to CS / Games / AI

- **Cryptography (RSA):** The difficulty of factorising large semiprimes
  (products of two primes) is the entire security basis of RSA.
- **Hash functions:** Modular arithmetic with primes gives uniform distribution
  in hash tables.
- **Error-correcting codes:** GCD/LCM computations appear in cyclic code design.
- **Game dev:** Prime-sized grids avoid resonance artefacts in procedural generation.

## Check Your Understanding

1. Factorise $504$ by hand. Verify with the Python function.
2. Prove that $\sqrt{2}$ is irrational using the FTA (hint: assume $\sqrt{2} = a/b$
   in lowest terms and derive a contradiction on prime exponents).
3. Compute $\gcd(252, 198)$ using both the Euclidean algorithm and prime
   factorisation. Confirm they agree.
