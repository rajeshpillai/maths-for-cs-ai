# Proof Techniques — Induction, Contradiction, Contrapositive

## Intuition

Proofs are how mathematicians (and computer scientists) know that something
is **always** true — not just for the examples they tested, but for every
possible input.  Testing tells you something works for 1000 cases; a proof
tells you it works for all of them.

You already use proof ideas when debugging: "If the bug were in function X,
then Y would fail — but Y works, so the bug isn't in X."  That's proof by
contradiction.

## Prerequisites

- Tier 1, Lesson 1: Logic (implications, contrapositive)
- Tier 0, Lesson 1: Number Systems (integers, naturals)

## From First Principles

### Direct proof

To prove "$p \Rightarrow q$": assume $p$ is true, then use logical steps to
show $q$ must follow.

**Pen & paper: Prove "If $n$ is even, then $n^2$ is even."**

1. Assume $n$ is even.
2. Then $n = 2k$ for some integer $k$ (definition of even).
3. $n^2 = (2k)^2 = 4k^2 = 2(2k^2)$.
4. Since $2k^2$ is an integer, $n^2 = 2m$ where $m = 2k^2$.
5. Therefore $n^2$ is even. $\square$

### Proof by contrapositive

Instead of proving $p \Rightarrow q$, prove the logically equivalent
$\neg q \Rightarrow \neg p$.

Recall from logic: $p \rightarrow q \equiv \neg q \rightarrow \neg p$

**Pen & paper: Prove "If $n^2$ is odd, then $n$ is odd."**

Contrapositive: "If $n$ is even, then $n^2$ is even."

1. Assume $n$ is even, so $n = 2k$.
2. $n^2 = 4k^2 = 2(2k^2)$ — even.
3. Contrapositive proved, so the original statement holds. $\square$

> **When to use:** When the direct approach is messy, but the contrapositive
> is clean.  Look at which direction gives you more to work with.

### Proof by contradiction

To prove statement $P$: assume $\neg P$, then derive something impossible
(a contradiction).

**Pen & paper: Prove "$\sqrt{2}$ is irrational."**

1. Assume for contradiction that $\sqrt{2}$ is rational.
2. Then $\sqrt{2} = p/q$ where $p, q \in \mathbb{Z}$, $q \ne 0$, and $p/q$ is in lowest terms (i.e., $\gcd(p, q) = 1$).
3. Squaring: $2 = p^2/q^2$, so $p^2 = 2q^2$.
4. Therefore $p^2$ is even, so $p$ is even (proved above). Write $p = 2m$.
5. Then $(2m)^2 = 2q^2 \Rightarrow 4m^2 = 2q^2 \Rightarrow q^2 = 2m^2$.
6. Therefore $q^2$ is even, so $q$ is even.
7. But both $p$ and $q$ are even, contradicting $\gcd(p, q) = 1$.
8. The assumption was wrong. $\sqrt{2}$ is irrational. $\square$

> **When to use:** When you need to prove something **doesn't** exist or
> **can't** happen.  Assume it does, show things break.

### Proof by mathematical induction

For proving statements about all natural numbers $n \ge n_0$.

**The recipe (think of dominoes):**

1. **Base case:** Prove the statement for $n = n_0$ (push the first domino).
2. **Inductive step:** Assume the statement holds for $n = k$ (**inductive hypothesis**).
   Prove it holds for $n = k + 1$ (each domino knocks the next one down).

**Pen & paper: Prove $\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$ for all $n \ge 1$.**

**Base case ($n = 1$):**

LHS: $\sum_{i=1}^{1} i = 1$

RHS: $\frac{1 \times 2}{2} = 1$

$1 = 1$ ✓

**Inductive step:**

Assume $\sum_{i=1}^{k} i = \frac{k(k+1)}{2}$ holds for some $k \ge 1$ (inductive hypothesis).

Prove it for $k + 1$:

$$\sum_{i=1}^{k+1} i = \left(\sum_{i=1}^{k} i\right) + (k+1)$$

$$= \frac{k(k+1)}{2} + (k+1) \quad \text{(by inductive hypothesis)}$$

$$= \frac{k(k+1) + 2(k+1)}{2}$$

$$= \frac{(k+1)(k+2)}{2}$$

This is $\frac{(k+1)((k+1)+1)}{2}$, which is the formula with $n = k+1$. $\square$

### Another induction example

**Pen & paper: Prove $2^n > n$ for all $n \ge 1$.**

**Base case ($n = 1$):**
$2^1 = 2 > 1$ ✓

**Inductive step:** Assume $2^k > k$ for some $k \ge 1$.

$$2^{k+1} = 2 \times 2^k > 2 \times k = 2k$$

We need $2k \ge k + 1$, i.e., $k \ge 1$.  This holds since $k \ge 1$. ✓

$$2^{k+1} > 2k \ge k + 1 \quad \square$$

### Strong induction

Instead of assuming the statement for just $n = k$, assume it for **all**
$n_0 \le j \le k$.

**Pen & paper: Prove every integer $n \ge 2$ has a prime factorisation.**

**Base case ($n = 2$):** 2 is prime — it is its own factorisation. ✓

**Strong inductive step:** Assume every integer $2 \le j \le k$ has a prime factorisation.

Consider $k + 1$:
- If $k + 1$ is prime, done.
- If $k + 1$ is composite, then $k + 1 = a \times b$ where $2 \le a, b \le k$.
- By the inductive hypothesis, both $a$ and $b$ have prime factorisations.
- Their product gives a prime factorisation of $k + 1$. $\square$

### Proof by exhaustion (case analysis)

Check every possible case.  Only practical when the cases are finite and small.

**Pen & paper: Prove $n^2 + n$ is even for all integers $n$.**

$n^2 + n = n(n + 1)$

**Case 1:** $n$ is even → $n(n+1)$ has an even factor → even. ✓
**Case 2:** $n$ is odd → $n + 1$ is even → $n(n+1)$ has an even factor → even. ✓ $\square$

### Disproof by counterexample

To disprove a universal statement, you only need **one** counterexample.

**Claim:** "All primes are odd."
**Counterexample:** $2$ is prime and even. $\square$

## Python Verification

```python
# ── Proof Techniques: verifying pen & paper proofs ──────────

# Direct proof: if n is even, n^2 is even
print("=== Direct proof: n even → n² even ===")
for n in range(0, 10, 2):  # Even numbers
    print(f"n={n}: n²={n**2}, even? {n**2 % 2 == 0}")

# Sum formula by induction: 1+2+...+n = n(n+1)/2
print("\n=== Sum formula verification ===")
for n in range(1, 11):
    lhs = sum(range(1, n + 1))
    rhs = n * (n + 1) // 2
    print(f"n={n}: sum={lhs}, formula={rhs}, match={lhs == rhs}")

# 2^n > n for all n >= 1
print("\n=== 2^n > n ===")
for n in range(1, 16):
    print(f"n={n}: 2^n={2**n} > {n}? {2**n > n}")

# sqrt(2) is irrational — show it can't be a/b
print("\n=== √2 irrationality: no fraction p/q satisfies p²=2q² in low terms ===")
from math import gcd
found = False
for q in range(1, 1000):
    p_squared = 2 * q * q
    p = int(p_squared ** 0.5)
    if p * p == p_squared:
        if gcd(p, q) == 1:
            found = True
            print(f"Found: p={p}, q={q}")
            break
if not found:
    print("No p/q in lowest terms found for q up to 999 — consistent with irrationality")

# n² + n is always even (exhaustive check for small range)
print("\n=== n² + n is even ===")
all_even = all((n**2 + n) % 2 == 0 for n in range(-100, 101))
print(f"n² + n is even for n in [-100, 100]: {all_even}")

# Counterexample: "All primes are odd"
print("\n=== Counterexample: 'All primes are odd' ===")
print(f"2 is prime: True, 2 is odd: {2 % 2 != 0} → Claim disproved!")
```

## Visualisation — Induction as a row of dominos

The clearest mental picture of induction: a row of dominos, each one
ready to fall on the next. The base case knocks down the first
domino; the inductive step says "if domino $n$ falls, domino $n+1$
will fall too." Together → all of them fall. Below we use the same
picture to *visually verify* the canonical $1 + 2 + \cdots + n =
n(n+1)/2$ identity.

```python
# ── Visualising induction and proof techniques ──────────────
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(14, 5.2))

# (1) The dominos picture: each "domino" represents proposition P(n).
# The base case fells the leftmost; the inductive step is the chain
# of arrows.
ax = axes[0]
positions = list(range(1, 9))
for n in positions:
    ax.add_patch(plt.Rectangle((n - 0.2, 0), 0.4, 1.5,
                               color="tab:blue", alpha=0.7,
                               edgecolor="navy", lw=2))
    ax.text(n, 0.75, f"P({n})", ha="center", va="center",
            color="white", fontsize=11, fontweight="bold")
# Mark the base case.
ax.scatter([1], [-0.3], color="tab:red", marker="*", s=300, zorder=5)
ax.text(1, -0.75, "base case\nP(1) holds", color="tab:red",
        ha="center", fontsize=10)
# Inductive arrows P(n) → P(n+1).
for n in positions[:-1]:
    ax.annotate("", xy=(n + 1 - 0.25, 1.7), xytext=(n + 0.25, 1.7),
                arrowprops=dict(arrowstyle="->", color="tab:green", lw=2))
ax.text(4.5, 2.2, "inductive step:  P(n) ⇒ P(n+1)",
        color="tab:green", fontsize=11, ha="center", fontweight="bold")
ax.set_xlim(0, 9); ax.set_ylim(-1.2, 2.7)
ax.axis("off")
ax.set_title("Induction = a row of dominos\nbase case + inductive step → all fall")

# (2) Visual verification of 1 + 2 + ... + n = n(n+1)/2.
# Stack rows of squares to form a triangle of total area = sum.
# Two such triangles fit together into an n × (n+1) rectangle.
ax = axes[1]
n = 6
# Triangle of squares (the sum 1 + 2 + ... + n).
for row in range(n):
    for col in range(row + 1):
        ax.add_patch(plt.Rectangle((col, row), 1, 1,
                                   color="tab:blue", alpha=0.55,
                                   edgecolor="navy"))
# Mirror triangle (rotated 180°) to make a rectangle.
for row in range(n):
    for col in range(n - row):
        ax.add_patch(plt.Rectangle((col + row + 1, row), 1, 1,
                                   color="tab:orange", alpha=0.55,
                                   edgecolor="darkorange"))
total = n * (n + 1) // 2
ax.text(n / 2 - 0.5, n + 1.2,
        f"sum = 1 + 2 + … + {n} = {total}\n"
        f"two copies form a {n} × {n+1} rectangle\n"
        f"⇒  n(n+1)/2 = {n * (n + 1) // 2}",
        ha="center", fontsize=10)
ax.set_xlim(-0.5, n + 1.5); ax.set_ylim(-0.5, n + 3); ax.set_aspect("equal")
ax.axis("off")
ax.set_title(f"Geometric proof of $1 + 2 + \\cdots + n = n(n+1)/2$")

plt.tight_layout()
plt.show()

# Numerically confirm the identity for many n.
print(f"Sum 1 + 2 + … + n = n(n+1)/2  — verified up to n = 100:")
for n in [1, 5, 10, 50, 100]:
    direct  = sum(range(1, n + 1))
    formula = n * (n + 1) // 2
    print(f"  n = {n:>3}:  direct sum = {direct:>5}    formula = {formula:>5}    "
          f"{'✓' if direct == formula else '✗'}")
```

**Three big proof patterns in one place:**

- **Induction** = the domino chain. Used for *every* loop-invariant
  proof in algorithms, Peano-axiom-style theorems, and any statement
  with a natural-number parameter. **Strong induction** lets the
  inductive step assume *all* smaller cases at once — useful for
  recursion-tree analyses (mergesort, divide-and-conquer).
- **Geometric proof** = "show by a picture". The right panel is a
  classic: two staircase triangles fit into an $n \times (n+1)$
  rectangle. Sometimes the picture *is* the proof — Bhāskara's
  Pythagorean theorem, the area-of-a-circle dissection, every
  visual-without-words you've seen on r/maths.
- **Counterexamples** disprove. To kill "all primes are odd", produce
  $2$ — done, no induction needed. **Fuzz-testing in software is the
  industrial version**: generate random inputs to find a single case
  where the program does the wrong thing.

## Connection to CS / Games / AI / Business / Industry

- **Loop invariants** — proving a loop works correctly is essentially induction (base case = before loop; inductive step = one iteration preserves the invariant)
- **Algorithm correctness** — merge sort, binary search, Dijkstra's are all proved correct by induction
- **Complexity proofs** — "this problem can't be solved in less than $O(n \log n)$" uses contradiction
- **Type systems** — type safety proofs use structural induction over syntax trees
- **Cryptographic security** — "breaking this cipher implies solving a known-hard problem" is contradiction
- **Testing vs proving** — tests check examples; proofs (and formal verification) check all inputs
- **Formal verification in regulated industry (Engineering)** — Airbus avionics, NASA flight software, and the seL4 microkernel are proven correct in Coq, Isabelle/HOL, or Lean before certification; aerospace standards (DO-178C Level A) mandate proof-based assurance.
- **Smart-contract audits (Finance/Crypto)** — firms like Trail of Bits, ChainSecurity, and Certora use SMT-solver-backed inductive proofs to verify Ethereum/Solana DeFi contracts handling billions in TVL; Aave and Compound run formal verification before mainnet deploys.
- **Pharma & medical-device reliability (Industry)** — FDA Class III device approvals (pacemakers, insulin pumps from Medtronic, Abbott) require induction-style safety arguments showing each firmware loop preserves life-critical invariants.
- **Cryptographic protocol proofs (Security)** — TLS 1.3, Signal Protocol, and AWS s2n are accompanied by machine-checked proofs (Cryptol, EasyCrypt, ProVerif) that no adversary strategy violates secrecy/authenticity — the same techniques underpin DARPA HACMS-style high-assurance systems.

## Check Your Understanding

1. **Pen & paper:** Prove by direct proof: "The product of two odd numbers is odd."
2. **Pen & paper:** Prove by induction: $\sum_{i=1}^{n} i^2 = \frac{n(n+1)(2n+1)}{6}$.
   Show the base case and the full inductive step.
3. **Pen & paper:** Prove by contradiction: "There are infinitely many prime numbers."
   (Hint: assume there are finitely many primes $p_1, p_2, \dots, p_k$.
   Consider the number $N = p_1 \times p_2 \times \cdots \times p_k + 1$.)
4. **Pen & paper:** Disprove: "For all $n \ge 1$, $n^2 - n + 41$ is prime."
   (Hint: try $n = 41$.)
