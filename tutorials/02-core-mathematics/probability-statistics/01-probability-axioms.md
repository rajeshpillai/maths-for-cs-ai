# Sample Spaces, Events, and Probability Axioms

## Intuition

Probability quantifies uncertainty.  When you flip a coin, draw a card, or
train a neural network on random mini-batches, you're dealing with
randomness.  The axioms of probability are the three simple rules from which
**all** of probability theory follows.

## Prerequisites

- Tier 1, Lesson 2: Set Theory (unions, intersections, complements)
- Tier 1, Lesson 4: Combinatorics (counting)

## From First Principles

### Sample space

The **sample space** $\Omega$ is the set of all possible outcomes.

| Experiment | Sample space |
|-----------|-------------|
| Coin flip | $\Omega = \{H, T\}$ |
| Die roll | $\Omega = \{1, 2, 3, 4, 5, 6\}$ |
| Two coin flips | $\Omega = \{HH, HT, TH, TT\}$ |

### Events

An **event** $A$ is a subset of $\Omega$.

- "Roll an even number": $A = \{2, 4, 6\}$
- "Roll a number greater than 4": $B = \{5, 6\}$
- The **certain event**: $\Omega$ itself
- The **impossible event**: $\emptyset$

### Kolmogorov's three axioms

For any event $A$:

1. **Non-negativity:** $P(A) \ge 0$
2. **Normalisation:** $P(\Omega) = 1$
3. **Additivity:** If $A$ and $B$ are **mutually exclusive** ($A \cap B = \emptyset$):
   $$P(A \cup B) = P(A) + P(B)$$

**Everything** in probability follows from these three axioms.

### Consequences (derived from the axioms)

**Complement rule:**
$$P(\overline{A}) = 1 - P(A)$$

*Proof:* $A$ and $\overline{A}$ are mutually exclusive, $A \cup \overline{A} = \Omega$.
By axioms 2 and 3: $P(A) + P(\overline{A}) = 1$. $\square$

**Inclusion-exclusion (general addition rule):**
$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

**Pen & paper:** Roll a die. $A$ = even = $\{2, 4, 6\}$, $B$ = greater than 3 = $\{4, 5, 6\}$.

$P(A) = 3/6 = 1/2$, $P(B) = 3/6 = 1/2$, $A \cap B = \{4, 6\}$, $P(A \cap B) = 2/6 = 1/3$

$P(A \cup B) = 1/2 + 1/2 - 1/3 = 2/3$

Verify: $A \cup B = \{2, 4, 5, 6\}$, $P = 4/6 = 2/3$ ✓

### Classical probability (equally likely outcomes)

$$P(A) = \frac{|A|}{|\Omega|} = \frac{\text{favourable outcomes}}{\text{total outcomes}}$$

**Pen & paper: Poker hand**

Draw 5 cards from 52. What is $P(\text{all hearts})$?

$$P = \frac{\binom{13}{5}}{\binom{52}{5}} = \frac{1287}{2598960} \approx 0.000495$$

**Pen & paper:** Compute $\binom{13}{5}$:

$\frac{13!}{5! \cdot 8!} = \frac{13 \times 12 \times 11 \times 10 \times 9}{5 \times 4 \times 3 \times 2 \times 1} = \frac{154440}{120} = 1287$

### Independence

Events $A$ and $B$ are **independent** if:

$$P(A \cap B) = P(A) \cdot P(B)$$

**Pen & paper:** Flip two fair coins. $A$ = "first is H", $B$ = "second is H".

$P(A) = 1/2$, $P(B) = 1/2$, $P(A \cap B) = P(HH) = 1/4 = (1/2)(1/2)$ ✓ Independent.

**Pen & paper:** Draw two cards **without** replacement.
$A$ = "first is ace", $B$ = "second is ace".

$P(A) = 4/52$, $P(B|A) = 3/51 \ne P(B) = 4/52$.

$P(A \cap B) = (4/52)(3/51) \ne (4/52)(4/52)$ → **not independent**.

### Mutually exclusive vs independent

| | Mutually exclusive | Independent |
|-|-------------------|-------------|
| Definition | $A \cap B = \emptyset$ | $P(A \cap B) = P(A)P(B)$ |
| Can both happen? | No | Yes |
| $P(A \cup B)$ | $P(A) + P(B)$ | $P(A) + P(B) - P(A)P(B)$ |

> If $P(A) > 0$ and $P(B) > 0$, mutually exclusive events are **never** independent.

## Python Verification

```python
# ── Probability Axioms: verifying pen & paper work ──────────
from math import comb
from itertools import product

# Die roll
print("=== Die roll ===")
omega = {1, 2, 3, 4, 5, 6}
A = {2, 4, 6}  # even
B = {4, 5, 6}  # > 3
print(f"P(A) = {len(A)}/{len(omega)} = {len(A)/len(omega):.4f}")
print(f"P(B) = {len(B)}/{len(omega)} = {len(B)/len(omega):.4f}")
print(f"A ∩ B = {A & B}, P(A∩B) = {len(A & B)/len(omega):.4f}")
print(f"P(A∪B) = {len(A)/len(omega)} + {len(B)/len(omega)} - {len(A & B)/len(omega)} = {len(A | B)/len(omega):.4f}")

# Complement
print(f"\nP(not A) = 1 - P(A) = {1 - len(A)/len(omega):.4f}")

# Poker: all hearts
print(f"\n=== Poker: P(all 5 hearts) ===")
favourable = comb(13, 5)
total = comb(52, 5)
print(f"C(13,5) = {favourable}")
print(f"C(52,5) = {total}")
print(f"P = {favourable}/{total} = {favourable/total:.6f}")

# Independence: two coin flips
print(f"\n=== Independence: two coins ===")
omega2 = list(product(['H', 'T'], repeat=2))
A2 = [o for o in omega2 if o[0] == 'H']
B2 = [o for o in omega2 if o[1] == 'H']
AB2 = [o for o in omega2 if o[0] == 'H' and o[1] == 'H']
pA = len(A2) / len(omega2)
pB = len(B2) / len(omega2)
pAB = len(AB2) / len(omega2)
print(f"P(A) = {pA}, P(B) = {pB}, P(A∩B) = {pAB}")
print(f"P(A)·P(B) = {pA*pB}")
print(f"Independent? {abs(pAB - pA*pB) < 1e-10}")

# Simulation: die roll probabilities
print(f"\n=== Simulation: 100,000 die rolls ===")
import random
random.seed(42)
rolls = [random.randint(1, 6) for _ in range(100000)]
count_even = sum(1 for r in rolls if r % 2 == 0)
print(f"P(even) ≈ {count_even/100000:.4f} (expected: 0.5)")
```

## Visualisation — Sample spaces, events, and the inclusion–exclusion law

Probabilities live on a **sample space** (the set of every possible
outcome); events are **subsets** of that space. A Venn-style picture
makes the axioms — especially $P(A \cup B) = P(A) + P(B) - P(A \cap B)$
— literally visible as overlapping areas.

```python
# ── Visualising probability axioms with a Venn diagram ──────
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Circle, Rectangle

fig, axes = plt.subplots(1, 2, figsize=(13, 5.5))

# (1) Two-event Venn for a single die roll.
# Sample space S = {1, 2, 3, 4, 5, 6}, each outcome equally likely (P = 1/6).
# Event A = "even"   = {2, 4, 6}
# Event B = "≥ 4"    = {4, 5, 6}
# A ∩ B  = {4, 6} — the overlap.
# A ∪ B  = {2, 4, 5, 6} — everything in either circle.
ax = axes[0]
ax.add_patch(Rectangle((-2.5, -2), 5, 4, fill=False, edgecolor="black", lw=1.5))
ax.add_patch(Circle((-0.7, 0), 1.4, alpha=0.35, color="tab:blue"))     # A
ax.add_patch(Circle(( 0.7, 0), 1.4, alpha=0.35, color="tab:orange"))   # B
# Place each die outcome where it belongs.
positions = {1: (-2.0,  1.4), 3: (-2.0, -1.4), 5: ( 2.0, 0.0),         # outside A∩B
             2: (-1.4,  0.0),                                            # A only
             4: ( 0.0,  0.0), 6: ( 0.0, -0.6),                           # A ∩ B
             }
positions[5] = (1.7, 0.6)    # B only
positions[3] = (-2.1, -1.5)
for k, (x, y) in positions.items():
    ax.text(x, y, str(k), ha="center", va="center",
            fontsize=14, fontweight="bold")
ax.text(-1.9,  1.2, "A = even",    color="tab:blue",   fontsize=12, fontweight="bold")
ax.text( 1.0,  1.2, "B = (≥ 4)",   color="tab:orange", fontsize=12, fontweight="bold")
ax.text(-2.4,  1.7, "S = {1,…,6}", fontsize=11)
ax.set_xlim(-3, 3); ax.set_ylim(-2.5, 2.5); ax.set_aspect("equal"); ax.axis("off")
ax.set_title("Sample space, events, and their intersection")

# (2) Inclusion–exclusion as areas.
# Three bar groups: P(A), P(B), and three different ways to compute P(A∪B):
#   (i)  the wrong "just add"          → P(A) + P(B) (double-counts overlap)
#   (ii) the correct formula           → P(A) + P(B) − P(A ∩ B)
#   (iii) brute-force counting         → 4/6 (outcomes {2,4,5,6})
PA, PB, PAB = 3/6, 3/6, 2/6           # P(A), P(B), P(A ∩ B)
labels  = ["P(A)", "P(B)", "P(A)+P(B)\n(double-counts!)",
           "P(A)+P(B)−P(A∩B)\n(inclusion–exclusion)",
           "Brute count\nof A ∪ B"]
values  = [PA, PB, PA + PB, PA + PB - PAB, 4/6]
colors  = ["tab:blue", "tab:orange", "tab:red", "tab:green", "tab:green"]
ax = axes[1]
bars = ax.bar(range(len(values)), values, color=colors, alpha=0.85)
for bar, v in zip(bars, values):
    ax.text(bar.get_x() + bar.get_width()/2, v + 0.02,
            f"{v:.3f}", ha="center", fontsize=11, fontweight="bold")
ax.set_xticks(range(len(values)))
ax.set_xticklabels(labels, fontsize=9)
ax.axhline(1.0, color="black", lw=0.6, linestyle=":")
ax.text(4.4, 1.02, "axiom: P ≤ 1", fontsize=9)
ax.set_ylim(0, 1.2); ax.set_ylabel("probability")
ax.set_title("Inclusion–exclusion: why we subtract the overlap")

plt.tight_layout()
plt.show()

# Verify each computed value matches the picture.
print(f"P(A)            = {PA:.4f}")
print(f"P(B)            = {PB:.4f}")
print(f"P(A ∩ B)        = {PAB:.4f}")
print(f"Naive sum       = {PA + PB:.4f}    ← would exceed 1 if overlap were larger")
print(f"Correct P(A∪B)  = {PA + PB - PAB:.4f}")
print(f"Direct count    = {4/6:.4f}    (outcomes 2, 4, 5, 6 out of 6)")
```

**What this picture pins down:**

- **Sample space $S$ is a *box*** containing every outcome that could
  happen; an **event is a *region*** inside the box. Probability is
  literally area (or count, when outcomes are equally likely).
- **The intersection $A \cap B$** is the lens-shaped overlap. Adding
  $P(A) + P(B)$ counts that lens **twice** — that's why the red bar in
  the right plot exceeds the true $P(A \cup B)$. Subtracting $P(A \cap
  B)$ once fixes the over-count: this is the **inclusion–exclusion
  principle**.
- **All three axioms are visible** in the picture: probability is
  non-negative (areas can't be negative), $P(S) = 1$ (the whole box has
  area 1), and disjoint regions add up. Everything else in this lesson
  is a consequence of those three rules.

## Connection to CS / Games / AI / Business / Industry

- **Random number generation** — uniform distribution over a sample space
- **A/B testing** — comparing event probabilities between control and treatment
- **Monte Carlo methods** — estimate probabilities by simulation
- **Game AI** — probability of drawing a card, rolling a value, enemy spawn rates
- **Cryptography** — security relies on events being computationally indistinguishable from random
- **Naive Bayes classifier** — built directly on probability axioms and independence

## Check Your Understanding

1. **Pen & paper:** A bag has 5 red and 3 blue balls.  Draw two balls without replacement.  What is $P(\text{both red})$?
2. **Pen & paper:** Roll two dice.  What is $P(\text{sum} = 7)$?  List all favourable outcomes.
3. **Pen & paper:** Are "rolling a 6" and "rolling an even number" mutually exclusive?  Are they independent?
4. **Think about it:** If $P(A) = 0.3$ and $P(B) = 0.5$ and $A, B$ are independent, what is $P(A \cup B)$?
