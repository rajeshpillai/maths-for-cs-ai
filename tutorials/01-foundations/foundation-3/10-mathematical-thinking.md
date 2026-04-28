# Mathematical Thinking — Problem-Solving Strategies

## Intuition

Mathematics is not about memorising formulas — it is about **thinking
systematically** when faced with a problem you have never seen before.  The
strategies in this lesson are the same ones used by algorithm designers,
game developers debugging physics engines, and researchers pushing the
boundaries of AI.  George Polya called it "How to Solve It": understand the
problem, make a plan, execute, and look back.

## Prerequisites

- Foundation 1, Lesson 3: Fractions and Rational Numbers

## From First Principles

### Strategy 1: Draw a diagram

Many problems become obvious once visualised.

**Problem:** In a room of 5 people, everyone shakes hands with everyone else
exactly once.  How many handshakes?

**Diagram approach:** Draw 5 dots.  Connect every pair.  Count the edges.

Person A shakes with 4 others, B with 3 remaining, C with 2, D with 1.
Total: $4 + 3 + 2 + 1 = 10$.

**Formula:** $\binom{n}{2} = \frac{n(n-1)}{2} = \frac{5 \times 4}{2} = 10$.

### Strategy 2: Try small cases first

When a problem involves $n$, try $n = 1, 2, 3, 4$ to see the pattern.

**Problem:** How many diagonals does a convex polygon with $n$ sides have?

| $n$ | Shape | Diagonals | Pattern |
|-----|-------|-----------|---------|
| 3 | triangle | 0 | |
| 4 | square | 2 | |
| 5 | pentagon | 5 | |
| 6 | hexagon | 9 | |

Differences: $2, 3, 4$ — increasing by 1 each time.

Each vertex connects to $n - 3$ non-adjacent vertices (exclude itself and 2
neighbours).  Total vertex-diagonal pairs: $n(n-3)$.  Each diagonal counted
twice: $\frac{n(n-3)}{2}$.

Check: $n = 6$: $\frac{6 \times 3}{2} = 9$ ✓.

### Strategy 3: Look for patterns and generalise

**Problem:** Find $1 + 3 + 5 + 7 + \cdots + (2n-1)$.

Small cases:
- $n=1$: $1 = 1$
- $n=2$: $1 + 3 = 4$
- $n=3$: $1 + 3 + 5 = 9$
- $n=4$: $1 + 3 + 5 + 7 = 16$

Pattern: the sum of the first $n$ odd numbers is $n^2$.

**Why?** The $k$-th odd number is $2k - 1$.

$$\sum_{k=1}^{n}(2k-1) = 2\sum_{k=1}^{n}k - n = 2 \cdot \frac{n(n+1)}{2} - n = n^2$$

### Strategy 4: Work backwards

**Problem:** After tripling my money and spending \$10, I have \$50.  How much
did I start with?

Work backwards: before spending, I had $50 + 10 = 60$.  Before tripling,
I had $60 / 3 = 20$.

### Strategy 5: Estimation and sanity checks

Before solving exactly, estimate the answer.  If your exact answer is wildly
different, you made an error.

**Problem:** $\sqrt{150}$ is approximately?

$12^2 = 144$, $13^2 = 169$.  So $\sqrt{150} \approx 12.2$.

Exact: $12.247\ldots$ — our estimate was close.

### Triangular numbers — a case study

Triangular numbers: $T_n = 1 + 2 + 3 + \cdots + n = \frac{n(n+1)}{2}$.

$T_1 = 1, \; T_2 = 3, \; T_3 = 6, \; T_4 = 10, \; T_5 = 15, \; T_6 = 21$.

**Visual pattern:** arrange dots in a triangle:

```
n=1:  *           → 1
n=2:  *           → 3
      * *
n=3:  *           → 6
      * *
      * * *
n=4:  *           → 10
      * *
      * * *
      * * * *
```

**Gauss's trick:** Write the sum forwards and backwards:

$$S = 1 + 2 + 3 + \cdots + n$$
$$S = n + (n-1) + (n-2) + \cdots + 1$$

Add: $2S = (n+1) + (n+1) + \cdots + (n+1) = n(n+1)$.

So $S = \frac{n(n+1)}{2}$.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Left: triangular numbers as dot patterns
ax = axes[0]
max_n = 6
for n in range(1, max_n + 1):
    for row in range(1, n + 1):
        for col in range(1, row + 1):
            # Offset each triangle horizontally
            x = (n - 1) * 3.5 + col - row/2
            y = -row
            ax.plot(x, y, 'o', color=plt.cm.Set2(n/max_n), markersize=8)
    T_n = n * (n + 1) // 2
    ax.text((n - 1) * 3.5 + 0.5, -n - 1, f'$T_{n}={T_n}$',
            ha='center', fontsize=10)

ax.set_xlim(-1, max_n * 3.5)
ax.set_ylim(-max_n - 2, 0.5)
ax.set_aspect('equal')
ax.set_title('Triangular Numbers as Dot Patterns')
ax.axis('off')

# Right: triangular numbers as bar chart with n² comparison
ax2 = axes[1]
ns = np.arange(1, 11)
T = ns * (ns + 1) // 2
ax2.bar(ns - 0.15, T, width=0.3, label=r'$T_n = n(n+1)/2$', color='steelblue')
ax2.bar(ns + 0.15, ns**2, width=0.3, label=r'$n^2$', color='coral', alpha=0.7)
ax2.set_xlabel('n')
ax2.set_ylabel('Value')
ax2.set_title(r'Triangular Numbers vs $n^2$')
ax2.legend()
ax2.grid(True, alpha=0.3, axis='y')
ax2.set_xticks(ns)

plt.tight_layout()
plt.savefig('mathematical_thinking_plot.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Mathematical Thinking ──────────────────────────────────────

# Strategy 2: Small cases for polygon diagonals
print("=== Polygon diagonals ===")
for n in range(3, 10):
    diags = n * (n - 3) // 2
    print(f"  {n}-gon: {diags} diagonals")

# Strategy 3: Sum of first n odd numbers = n²
print(f"\n=== Sum of odd numbers ===")
for n in range(1, 9):
    odd_sum = sum(2*k - 1 for k in range(1, n + 1))
    print(f"  n={n}: 1+3+...+{2*n-1} = {odd_sum} = {n}² = {n**2}, match={odd_sum == n**2}")

# Triangular numbers
print(f"\n=== Triangular numbers ===")
for n in range(1, 11):
    T = n * (n + 1) // 2
    brute = sum(range(1, n + 1))
    print(f"  T_{n:2d} = {T:3d} (brute force: {brute})")

# Handshake problem
print(f"\n=== Handshakes ===")
for people in range(2, 11):
    handshakes = people * (people - 1) // 2
    print(f"  {people:2d} people: {handshakes} handshakes")

# Strategy 5: Estimation
print(f"\n=== Estimation: sqrt(n) ===")
import math
for n in [50, 150, 500, 999]:
    low = int(math.sqrt(n))
    est = low + (n - low**2) / (2*low + 1)  # linear interpolation
    exact = math.sqrt(n)
    print(f"  sqrt({n:3d}): estimate={est:.2f}, exact={exact:.3f}, error={abs(est-exact):.3f}")

# Pattern: sum of cubes = (sum of naturals)²
print(f"\n=== Sum of cubes = (sum of naturals)² ===")
for n in [1, 2, 3, 5, 10]:
    sum_cubes = sum(k**3 for k in range(1, n + 1))
    sum_sq = (n * (n + 1) // 2) ** 2
    print(f"  n={n:2d}: Σk³={sum_cubes:>5d}, (Σk)²={sum_sq:>5d}, match={sum_cubes == sum_sq}")
```

## Connection to CS / Games / AI / Business / Industry

- **Algorithm design** — breaking a problem into small cases is how you find
  the recurrence relation for dynamic programming
- **Testing** — trying small inputs first is exactly unit testing; edge cases
  reveal bugs
- **Estimation** — back-of-envelope calculations tell you if a model needs
  1 GB or 1 TB of memory before you train it
- **Debugging** — working backwards from the wrong output to find where the
  logic diverged mirrors Strategy 4
- **Combinatorics in CS** — handshake problems map to counting edges in
  complete graphs ($K_n$ has $\binom{n}{2}$ edges), essential in network design
- **Triangular numbers** — appear in nested loop analysis: two nested loops
  over $n$ elements with $j > i$ execute $T_{n-1}$ times
- **Fermi estimation in consulting** — McKinsey, BCG, and Bain interviews are built around back-of-envelope problems ("how many piano tuners in Chicago?"); the same first-principles thinking drives product-market sizing in their client deliverables.
- **Root-cause analysis in operations** — Toyota's "5 Whys" and the DMAIC cycle in Six Sigma at GE codify the same backward-from-symptom reasoning Strategy 4 teaches.
- **Failure-Mode Effects Analysis (FMEA)** — automotive and aerospace engineers at Ford, Boeing, and Lockheed enumerate small-case failure scenarios systematically — the same case-decomposition strategy applied to safety-critical systems with thousands of components.
- **Pre-mortem & risk register** — PMI/PMBOK project-management practice asks teams to imagine a project failing then work backwards; this Strategy-4 thinking is mandated on federal acquisitions and banking model-risk reviews (SR 11-7).

## Check Your Understanding

1. **Pen & paper:** How many diagonals does a 12-sided polygon have?
2. **Pen & paper:** Find $1 + 2 + 3 + \cdots + 100$ using Gauss's trick.
3. **Pen & paper:** The sum of the first $n$ even numbers is $2 + 4 + 6 + \cdots + 2n$.  Find a closed-form formula and prove it.
4. **Problem-solving:** A tournament has 16 teams playing single elimination. How many total games are played?  (Hint: think about what each game produces.)
