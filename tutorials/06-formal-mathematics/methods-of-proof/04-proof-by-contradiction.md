# Proof by Contradiction

## Intuition

Sometimes the front door is locked, so you go around back. In a proof by
contradiction you assume the opposite of what you want to prove, then show
that this assumption leads to something impossible. Since mathematics cannot
contain contradictions, the assumption must have been wrong, so the original
statement must be true. This technique is behind two of the most famous
results in all of mathematics.

## Prerequisites

- Tier 15, Lesson 3 (Direct Proof)

## From First Principles

### The Method

To prove statement $P$:

1. **Assume** $\neg P$ (the negation of $P$).
2. **Derive** a contradiction: a statement $Q \land \neg Q$.
3. **Conclude** $\neg P$ is false, so $P$ is true.

Why it works: by the law of excluded middle, either $P$ or $\neg P$ is true.
If $\neg P$ leads to a contradiction, it is false, leaving $P$.

### Example 1: $\sqrt{2}$ is Irrational

**Claim**: $\sqrt{2} \notin \mathbb{Q}$.

**Proof**:
1. Assume for contradiction that $\sqrt{2}$ is rational.
2. Then $\sqrt{2} = \frac{a}{b}$ where $a, b \in \mathbb{Z}$, $b \neq 0$, and $\gcd(a, b) = 1$ (lowest terms).
3. Squaring: $2 = \frac{a^2}{b^2}$, so $a^2 = 2b^2$.
4. Thus $a^2$ is even, so $a$ is even (since odd squared is odd, proven in Lesson 3).
5. Write $a = 2k$. Then $(2k)^2 = 2b^2$, giving $4k^2 = 2b^2$, so $b^2 = 2k^2$.
6. Thus $b^2$ is even, so $b$ is even.
7. Both $a$ and $b$ are even, contradicting $\gcd(a, b) = 1$.
8. The assumption is false; $\sqrt{2}$ is irrational. $\square$

### Pen & Paper: Trace Every Step

Let us see why step 4 works. We proved in Lesson 3 that if $n$ is odd then $n^2$ is odd. The contrapositive is: if $n^2$ is even then $n$ is even. We use this here.

$a^2 = 2b^2$ means $2 | a^2$. By the contrapositive, $2 | a$. So $a = 2k$.

Substitute: $4k^2 = 2b^2 \Rightarrow b^2 = 2k^2 \Rightarrow 2 | b^2 \Rightarrow 2 | b$.

Now $2 | a$ and $2 | b$, but we assumed $\gcd(a,b) = 1$. Contradiction.

### Example 2: There Are Infinitely Many Primes

**Claim**: The set of primes is infinite.

**Proof** (Euclid):
1. Assume for contradiction that there are finitely many primes: $p_1, p_2, \ldots, p_n$.
2. Construct $N = p_1 \cdot p_2 \cdots p_n + 1$.
3. $N > 1$, so $N$ has a prime factor $p$.
4. $p$ must be one of $p_1, \ldots, p_n$ (our assumed complete list).
5. But $N \mod p_i = 1$ for every $i$, so $p$ divides neither $N$ nor is in the list.
6. Contradiction: $p$ is a prime not in our "complete" list.
7. The set of primes is infinite. $\square$

### Pen & Paper: Verify With Small Cases

Suppose primes are just $\{2, 3, 5\}$.
$N = 2 \cdot 3 \cdot 5 + 1 = 31$.
$31$ is prime and not in our list. Contradiction found immediately.

Suppose primes are $\{2, 3, 5, 7\}$.
$N = 2 \cdot 3 \cdot 5 \cdot 7 + 1 = 211$.
$211$ is prime and not in our list. Again a contradiction.

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

# Visualise the sqrt(2) proof: plot a/b approximations
fig, ax = plt.subplots(figsize=(7, 5))
max_b = 30
for b in range(1, max_b + 1):
    for a in range(1, int(2 * b) + 1):
        if np.gcd(a, b) == 1:  # reduced fraction
            val = a / b
            dist = abs(val - np.sqrt(2))
            color = 'red' if dist < 0.05 else 'lightgray'
            size = 20 if dist < 0.05 else 5
            ax.scatter(b, a / b, c=color, s=size, zorder=3 if dist < 0.05 else 1)

ax.axhline(np.sqrt(2), color='blue', linestyle='--', label=f'√2 ≈ {np.sqrt(2):.6f}')
ax.set_xlabel('denominator b')
ax.set_ylabel('a/b')
ax.set_title('Rational approximations to √2 — never exact')
ax.legend()
plt.tight_layout()
plt.savefig('sqrt2_irrational.png', dpi=100)
plt.show()
```

## Python Verification

```python
import math

# ── Proof by Contradiction: Verification ─────────────────

# Step 1: Verify sqrt(2) is not rational by checking a^2 = 2b^2
# has no integer solution with gcd(a,b)=1
print("=== sqrt(2) irrationality check ===")
found = False
for b in range(1, 10001):
    a_sq = 2 * b * b
    a = int(math.isqrt(a_sq))
    if a * a == a_sq:
        if math.gcd(a, b) == 1:
            print(f"FOUND: a={a}, b={b}, a/b = {a/b}")
            found = True
            break
if not found:
    print("No reduced fraction a/b with a²=2b² found for b up to 10000.")
    print("Consistent with sqrt(2) being irrational.")

# Step 2: Euclid's proof — generate "new" primes
print("\n=== Euclid's proof: infinitely many primes ===")
def is_prime(n):
    if n < 2:
        return False
    for d in range(2, int(math.isqrt(n)) + 1):
        if n % d == 0:
            return False
    return True

primes = [2]
for _ in range(10):
    N = 1
    for p in primes:
        N *= p
    N += 1
    # N may not itself be prime, but it has a prime factor not in our list
    factor = None
    for p in range(2, N + 1):
        if N % p == 0:
            factor = p
            break
    print(f"Primes so far: {primes}")
    print(f"  Product + 1 = {N}, new prime factor = {factor}")
    primes.append(factor)
    primes = sorted(set(primes))

print(f"\nGenerated primes: {primes}")

# Step 3: Demonstrate the contradiction structure
print("\n=== Contradiction structure ===")
# If sqrt(2) = a/b in lowest terms, both a and b must be even
# But lowest terms means they can't both be even
def check_contradiction(a, b):
    """Show that assuming a²=2b² forces both a,b even."""
    a_sq = a * a
    b_sq = b * b
    ratio = a_sq / b_sq
    a_even = (a % 2 == 0)
    b_even = (b % 2 == 0)
    print(f"  a={a}, b={b}: a²/b²={a_sq}/{b_sq}={ratio:.4f}, "
          f"a even={a_even}, b even={b_even}, gcd={math.gcd(a,b)}")

# Best rational approximations to sqrt(2)
print("Checking convergents of sqrt(2):")
convergents = [(1,1), (3,2), (7,5), (17,12), (41,29), (99,70), (239,169)]
for a, b in convergents:
    check_contradiction(a, b)
```

## Connection to CS / Games / AI / Business / Industry

- **Impossibility results** in CS (halting problem, no perfect compression) are proven by contradiction.
- **Correctness proofs**: showing a protocol has no deadlock often assumes a deadlock exists and derives a contradiction.
- **Adversarial reasoning** in game theory: "if my opponent had a winning strategy, then..." leads to contradiction.
- **Complexity theory**: many lower bounds ($P \neq NP$ attempts) follow the contradiction template.
- **No-arbitrage pricing in finance** — the Fundamental Theorem of Asset Pricing is a contradiction proof: if no risk-neutral measure existed, an arbitrage portfolio would, contradicting market efficiency; this is the bedrock of all derivatives desks at Goldman Sachs and Two Sigma.
- **CAP theorem in distributed systems (Brewer, Gilbert-Lynch 2002)** — contradiction proof showing no system can simultaneously offer Consistency, Availability, and Partition tolerance; shapes architectural choices at Cassandra, MongoDB, and DynamoDB across all of cloud computing.
- **Shannon's source coding theorem lower bound** — proof by contradiction shows no code beats entropy $H(X)$ on average; defines the theoretical floor for ZIP, gzip, JPEG, MP3, and Netflix H.265 encoders.
- **Boeing/Airbus collision-avoidance verification** — TCAS II and ACAS X protocols are validated using contradiction proofs ("assume aircraft collide while protocol is followed... derive impossibility"); FAA/EASA certification depends on these arguments holding under all encounter geometries.

## Check Your Understanding

1. Prove by contradiction: there is no largest integer.
2. Prove by contradiction: if $n^2$ is even, then $n$ is even. (This was used as a lemma above; now prove it standalone.)
3. Prove by contradiction: $\log_2 3$ is irrational. (Hint: assume $\log_2 3 = a/b$, then $2^{a/b} = 3$, so $2^a = 3^b$.)
