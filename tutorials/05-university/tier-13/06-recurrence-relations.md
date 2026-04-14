# Recurrence Relations

## Intuition

A recurrence relation defines each term in a sequence using previous terms —
like a recipe that says "to make today's bread, use yesterday's starter."
The Fibonacci sequence is the most famous example. Solving a recurrence means
finding a **closed-form** formula so you can jump directly to the $n$-th term
without computing all predecessors. This is essential for analysing algorithm
runtime (merge sort, dynamic programming) and modelling growth processes.

## Prerequisites

- **Foundation 3, Lesson 6** — Proof by induction
- **Tier 13, Lesson 1** — Number theory foundations

## From First Principles

### First-Order Linear Recurrences

General form: $a_n = c \cdot a_{n-1} + f(n)$, with $a_0$ given.

**Homogeneous case** ($f(n) = 0$): $a_n = c \cdot a_{n-1}$.

Solution: $a_n = a_0 \cdot c^n$.

**Example:** $a_n = 3a_{n-1}$, $a_0 = 2$.
Solution: $a_n = 2 \cdot 3^n$. Check: $a_3 = 2 \cdot 27 = 54$, and
$3 \cdot a_2 = 3 \cdot 18 = 54$. Correct.

### Second-Order Linear Recurrences: Characteristic Equation

General form: $a_n = p \cdot a_{n-1} + q \cdot a_{n-2}$.

**Method:** Guess $a_n = r^n$. Substituting:

$$r^n = p \cdot r^{n-1} + q \cdot r^{n-2}$$

Divide by $r^{n-2}$:

$$r^2 = pr + q \quad \Rightarrow \quad r^2 - pr - q = 0$$

This is the **characteristic equation**. Let $r_1, r_2$ be its roots.

**Case 1: Distinct roots** ($r_1 \ne r_2$):

$$a_n = A \cdot r_1^n + B \cdot r_2^n$$

where $A, B$ are determined by initial conditions.

**Case 2: Repeated root** ($r_1 = r_2 = r$):

$$a_n = (A + Bn) \cdot r^n$$

### Fibonacci: Complete Derivation

$F_n = F_{n-1} + F_{n-2}$, with $F_0 = 0$, $F_1 = 1$.

Characteristic equation: $r^2 - r - 1 = 0$.

$$r = \frac{1 \pm \sqrt{5}}{2}$$

So $r_1 = \phi = \frac{1+\sqrt{5}}{2} \approx 1.618$ (golden ratio) and
$r_2 = \psi = \frac{1-\sqrt{5}}{2} \approx -0.618$.

General solution: $F_n = A\phi^n + B\psi^n$.

Apply initial conditions:
- $F_0 = 0$: $A + B = 0$, so $B = -A$.
- $F_1 = 1$: $A\phi - A\psi = 1$, so $A(\phi - \psi) = 1$.
  $\phi - \psi = \sqrt{5}$, giving $A = 1/\sqrt{5}$.

**Binet's Formula:**

$$F_n = \frac{\phi^n - \psi^n}{\sqrt{5}} = \frac{1}{\sqrt{5}}\left[\left(\frac{1+\sqrt{5}}{2}\right)^n - \left(\frac{1-\sqrt{5}}{2}\right)^n\right]$$

**Hand check:** $F_6 = \frac{\phi^6 - \psi^6}{\sqrt{5}}$. We know $F_6 = 8$. Verified below.

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

phi = (1 + np.sqrt(5)) / 2
psi = (1 - np.sqrt(5)) / 2

ns = np.arange(0, 16)
fib_exact = [0, 1]
for i in range(2, 16):
    fib_exact.append(fib_exact[-1] + fib_exact[-2])

fib_binet = (phi**ns - psi**ns) / np.sqrt(5)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(13, 5))

# Left: Fibonacci growth (log scale)
ax1.semilogy(ns, fib_exact, 'bo-', label='F_n (exact)', markersize=6)
ax1.semilogy(ns, phi**ns / np.sqrt(5), 'r--', label=r'$\phi^n / \sqrt{5}$ (approx)', alpha=0.7)
ax1.set_xlabel('n'); ax1.set_ylabel('F_n (log scale)')
ax1.set_title('Fibonacci Growth vs Golden Ratio')
ax1.legend(); ax1.grid(True, alpha=0.3)

# Right: Error of Binet's formula (should be ~0)
errors = [abs(fib_exact[i] - fib_binet[i]) for i in range(16)]
ax2.plot(ns, errors, 'go-', markersize=6)
ax2.set_xlabel('n'); ax2.set_ylabel('|F_n - Binet(n)|')
ax2.set_title("Binet's Formula Error (floating point)")
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig("fibonacci_growth.png", dpi=100)
plt.show()
```

## Python Verification

```python
import math

# ── Fibonacci: three methods compared ────────────────────
phi = (1 + math.sqrt(5)) / 2
psi = (1 - math.sqrt(5)) / 2

# Method 1: Recursive (slow, just for verification)
def fib_recursive(n):
    if n <= 1:
        return n
    return fib_recursive(n-1) + fib_recursive(n-2)

# Method 2: Iterative (O(n))
def fib_iterative(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

# Method 3: Binet's formula (O(1) but loses precision for large n)
def fib_binet(n):
    return round((phi**n - psi**n) / math.sqrt(5))

# Step 1: Verify all three agree
print("n  | Recursive | Iterative | Binet")
print("-" * 42)
for n in range(13):
    r = fib_recursive(n)
    i = fib_iterative(n)
    b = fib_binet(n)
    print(f"{n:2d} | {r:9d} | {i:9d} | {b:5d}")

# Step 2: Solve a general second-order recurrence
# a_n = 5*a_{n-1} - 6*a_{n-2}, a_0=1, a_1=4
# Characteristic: r^2 - 5r + 6 = 0 => r=2, r=3
# General: a_n = A*2^n + B*3^n
# a_0 = A + B = 1, a_1 = 2A + 3B = 4 => A = -1, B = 2
# Closed form: a_n = -2^n + 2*3^n
print("\nGeneral recurrence: a_n = 5*a_{n-1} - 6*a_{n-2}")
a = [1, 4]
for i in range(2, 10):
    a.append(5*a[-1] - 6*a[-2])

for n in range(10):
    closed = -2**n + 2 * 3**n
    print(f"  a_{n} = {a[n]:6d}, closed form = {closed:6d}, match: {a[n] == closed}")

# Step 3: Fibonacci ratio approaches golden ratio
print(f"\nFibonacci ratios approaching phi = {phi:.10f}:")
for n in range(2, 15):
    ratio = fib_iterative(n) / fib_iterative(n-1)
    print(f"  F_{n}/F_{n-1} = {ratio:.10f}")
```

## Connection to CS / Games / AI

- **Algorithm analysis:** Merge sort's $T(n) = 2T(n/2) + n$ is a recurrence.
  The Master Theorem solves such divide-and-conquer recurrences.
- **Dynamic programming:** Every DP solution is defined by a recurrence over
  subproblems (knapsack, shortest paths, edit distance).
- **Game dev:** Population growth, resource accumulation, and procedural
  generation often follow recurrence patterns.
- **AI/ML:** Recurrent neural networks (RNNs) compute $h_t = f(h_{t-1}, x_t)$
  — literally a recurrence relation on hidden states.

## Check Your Understanding

1. Solve $a_n = 4a_{n-1} - 4a_{n-2}$ with $a_0 = 1$, $a_1 = 3$ using the
   characteristic equation. (Hint: repeated root case.)
2. Use Binet's formula to show $F_n$ is always an integer, despite involving
   $\sqrt{5}$. (Hint: expand and show the $\sqrt{5}$ terms cancel.)
3. The Tower of Hanoi recurrence is $T_n = 2T_{n-1} + 1$, $T_1 = 1$. Find
   the closed form and verify for $n = 1, \ldots, 6$.
