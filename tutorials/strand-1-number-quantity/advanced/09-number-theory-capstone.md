---
strand: number-quantity
level: advanced
order: 9
title: Capstone — Number Theory in the Wild
prerequisites:
  - tier: strand-1-number-quantity-advanced
    slug: 08-pell-equation
    description: Pell's equation
connections:
  - strand-1-number-quantity-intermediate/09-complex-numbers
applications:
  - cs: "Modern cryptography, randomness, primality"
  - life: "Most of the math underpinning the internet"
---

# Capstone — Number Theory in the Wild

## Mental

Ten lessons later (Foundation + Intermediate + Advanced):

- Place value, prime factorisation, Euclid's GCD (Foundation,
  Intermediate).
- Modular arithmetic, exponent rules, logarithms.
- Surds and rationality.
- Floating point, complex numbers.
- Fermat, Euler totient, RSA, multiplicative order, primitive
  roots.
- Continued fractions, algebraic vs transcendental, constructibility.
- Quadratic reciprocity, p-adics, Pell's equation.

You can now follow most modern cryptography, recognise the
classical Greek impossibility theorems for what they are, work
fluently in $\mathbb{Z}/n\mathbb{Z}$, and have the conceptual
toolkit to read serious number-theory literature.

## Three integrated examples

**1. RSA-2048 in practice**: a $2048$-bit modulus $n = pq$ where $p,
q$ are random $1024$-bit primes. Generate via primality testing
(Miller-Rabin uses Fermat + quadratic-reciprocity ideas). Pick $e =
65537$ (a Fermat prime, $2^{16} + 1$). Compute $d = e^{-1} \pmod{(p-1)(q-1)}$
via extended Euclid. Encryption/decryption use fast modular
exponentiation (Strand 1 Intermediate Lesson 05).

Security: $\sim 10^{600}$ search space for factoring; brute-force
beyond reach. Quantum threats: Shor's algorithm would break it in
polynomial time, but no large-enough quantum computer yet.

**2. Repeating decimals via discrete log**: $1/p$ in base $b$
(coprime to $p$) has period $\text{ord}_p(b)$. For $p = 7$ and
$b = 10$, period $6$. The digits $142857$ are a "**cyclic number**"
— every multiplicative shift is another permutation of the same
digits.

**3. Pell + cattle**: Archimedes's cattle problem reduces to
$t^2 - 4729494 \, u^2 = 1$. Smallest solution: a $\sim 200\,000$-digit
number. Solved (computer-aided) in 1965.

## Roadmap forward

**Strand 1 Master / Research-adjacent** would cover:

- **Algebraic number theory**: number fields, rings of integers,
  ideals, class numbers.
- **L-functions**: $\zeta(s), L(s, \chi), \ldots$ — the Riemann
  hypothesis lives here.
- **Modular forms**: Wiles's proof of Fermat's Last Theorem.
- **p-adic L-functions and Iwasawa theory**.
- **Arithmetic geometry**: elliptic curves, modular curves,
  Frey-Hellegouarch, BSD conjecture.
- **Cryptanalysis frontiers**: index calculus, NFS, post-quantum
  proposals.

This is doctoral-level material — most of it. But the Foundation +
Intermediate + Advanced you've completed gives you the **language**
to read seminars, follow conferences, and recognise the major
landmarks.

## Interactive

:::widget type=numeric-input prompt="Memorable size: a $2048$-bit RSA modulus has roughly how many decimal digits?" answer=617 tolerance=10 explain="$2048 \\cdot \\log_{10}(2) \\approx 2048 \\cdot 0.301 = 616.4 \\approx 617$.":::

:::widget type=numeric-input prompt="Number of seconds in $10^{12}$ — a trillion? About $32 \\cdot 10^3$ years. Brute-forcing a 128-bit AES key at $10^9$/sec would take roughly $10^{29}$ years — about $10^{19}$ universe-ages. Type the number of bits in AES-128's full keyspace exponent." answer=128 explain="$2^{128} \\approx 3.4 \\times 10^{38}$ keys.":::

:::widget type=numeric-input prompt="$1/13$ in base $10$ has period $\\text{ord}_{13}(10)$. Compute: $10, 9, 12, 3, 4, 1$. Period?" answer=6 explain="$6$. So $1/13 = 0.\\overline{076923}$.":::

:::widget type=numeric-input prompt="A regular $n$-gon is constructible (compass-straightedge) iff $\\phi(n)$ is a power of 2. For $n = 257$ (a Fermat prime), $\\phi(257) = 256 = 2^8$. So 257-gon is constructible. The next Fermat prime constructible $n$ is..." answer=65537 explain="$65537$ is the largest known Fermat prime.":::

## Closing

Number theory is sometimes called **"the queen of mathematics"**
(Gauss). It is also the most ancient — clay tablets show Babylonians
solving Pell-style equations $\sim 1800$ BCE. Yet it is also the
most cutting-edge, with Wiles's $1995$ proof of Fermat's Last
Theorem — initiated by a $7$-year-old's curiosity, completed by an
adult's $7$-year obsession.

You now have the tools to follow this story.

## Check Your Understanding

:::widget type=numeric-input prompt="Largest known Fermat prime?" answer=65537 explain="$2^{16} + 1$. Discovered to be prime by Euler. None larger known.":::

:::widget type=numeric-input prompt="$\\phi(101) = ?$ ($101$ is prime.)" answer=100 explain="$\\phi(p) = p - 1 = 100$.":::

:::widget type=numeric-input prompt="$2^{100} \\bmod 101 = ?$ (Fermat's little theorem.)" answer=1 explain="$101$ is prime, and $\\gcd(2, 101) = 1$.":::

:::widget type=numeric-input prompt="The continued fraction $[3; 7, 15, 1] = ?$ — type the integer numerator." answer=355 explain="$355/113$ — Zu Chongzhi's approximation to $\\pi$.":::
