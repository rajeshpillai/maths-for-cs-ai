# Logic — Propositions, Truth Tables, Boolean Algebra

## Intuition

Every `if` statement you write is logic.  Every database query with `AND`,
`OR`, `NOT` is logic.  Every circuit in a CPU is built from logic gates.
Understanding formal logic means understanding the language your computer
thinks in.

## Prerequisites

- Tier 0: Number Systems (basic arithmetic)

## From First Principles

### Propositions

A **proposition** is a statement that is either **True (T)** or **False (F)**.

- "7 is prime" → T
- "4 > 10" → F
- "Close the door" → **not a proposition** (it's a command, not a claim)
- "x > 5" → **not a proposition** until we know x (it's a *predicate*)

We label propositions with letters: $p$, $q$, $r$, ...

### Logical connectives

| Symbol | Name | English | Python |
|--------|------|---------|--------|
| $\neg p$ | Negation | "not p" | `not p` |
| $p \land q$ | Conjunction | "p and q" | `p and q` |
| $p \lor q$ | Disjunction | "p or q" | `p or q` |
| $p \rightarrow q$ | Implication | "if p then q" | see below |
| $p \leftrightarrow q$ | Biconditional | "p if and only if q" | `p == q` |
| $p \oplus q$ | Exclusive or | "p or q but not both" | `p ^ q` |

### Truth tables (pen & paper)

Build these yourself — they are the foundation of everything.

**Negation ($\neg p$):**

| $p$ | $\neg p$ |
|-----|----------|
| T | F |
| F | T |

**AND ($p \land q$):**

| $p$ | $q$ | $p \land q$ |
|-----|-----|-------------|
| T | T | T |
| T | F | F |
| F | T | F |
| F | F | F |

> AND is true **only when both** inputs are true.

**OR ($p \lor q$):**

| $p$ | $q$ | $p \lor q$ |
|-----|-----|------------|
| T | T | T |
| T | F | T |
| F | T | T |
| F | F | F |

> OR is false **only when both** inputs are false.  This is *inclusive* or.

**XOR ($p \oplus q$):**

| $p$ | $q$ | $p \oplus q$ |
|-----|-----|------------|
| T | T | F |
| T | F | T |
| F | T | T |
| F | F | F |

> XOR is true when inputs **differ**.

### Implication — the tricky one

$p \rightarrow q$ means "if p, then q".

| $p$ | $q$ | $p \rightarrow q$ |
|-----|-----|-------------------|
| T | T | T |
| T | F | F |
| F | T | T |
| F | F | T |

**Why is "F → T" true?**  Think of a promise: "If it rains, I'll bring an
umbrella."  If it doesn't rain ($p$ = F), the promise isn't broken regardless
of what you do.  The promise is only broken when it rains ($p$ = T) and you
don't bring an umbrella ($q$ = F).

**Key identity:**

$$p \rightarrow q \equiv \neg p \lor q$$

**Pen & paper: Verify this identity** — compare truth tables column by column:

| $p$ | $q$ | $p \rightarrow q$ | $\neg p$ | $\neg p \lor q$ |
|-----|-----|-------------------|----------|-----------------|
| T | T | T | F | T |
| T | F | F | F | F |
| F | T | T | T | T |
| F | F | T | T | T |

Columns 3 and 5 match ✓

### Biconditional

$p \leftrightarrow q$ is true when $p$ and $q$ have the **same** truth value.

$$p \leftrightarrow q \equiv (p \rightarrow q) \land (q \rightarrow p)$$

### Compound expressions (pen & paper)

**Evaluate: $\neg(p \land q) \lor r$ where $p = T, q = F, r = T$**

1. $p \land q = T \land F = F$
2. $\neg(F) = T$
3. $T \lor r = T \lor T = T$

Result: **T**

### Boolean algebra laws

These are the rules you use to simplify expressions **on paper**.

| Law | AND form | OR form |
|-----|----------|---------|
| Identity | $p \land T = p$ | $p \lor F = p$ |
| Domination | $p \land F = F$ | $p \lor T = T$ |
| Idempotent | $p \land p = p$ | $p \lor p = p$ |
| Complement | $p \land \neg p = F$ | $p \lor \neg p = T$ |
| Commutative | $p \land q = q \land p$ | $p \lor q = q \lor p$ |
| Associative | $(p \land q) \land r = p \land (q \land r)$ | similar |
| Distributive | $p \land (q \lor r) = (p \land q) \lor (p \land r)$ | dual |

### De Morgan's Laws (memorise these)

$$\neg(p \land q) = \neg p \lor \neg q$$
$$\neg(p \lor q) = \neg p \land \neg q$$

**In English:** "not (A and B)" = "not A or not B"

**In Python:** `not (a and b)` is the same as `(not a) or (not b)`

**Pen & paper: Simplify $\neg(\neg p \lor q)$**

Apply De Morgan's: $= \neg(\neg p) \land \neg q = p \land \neg q$

### Logical equivalence vs tautology

- **Tautology**: always true regardless of inputs (e.g., $p \lor \neg p$)
- **Contradiction**: always false (e.g., $p \land \neg p$)
- **Equivalence**: two expressions have identical truth tables

**Pen & paper: Is $(p \rightarrow q) \land (q \rightarrow p)$ equivalent to $p \leftrightarrow q$?**

Build both truth tables — they match. ✓

## Python Verification

```python
# ── Logic & Boolean Algebra: verifying truth tables ─────────

# Truth table builder
def truth_table(label, func):
    print(f"\n=== {label} ===")
    print(f"{'p':<6} {'q':<6} {'Result':<6}")
    for p in [True, False]:
        for q in [True, False]:
            print(f"{str(p):<6} {str(q):<6} {str(func(p, q)):<6}")

# Basic connectives
truth_table("AND (p ∧ q)", lambda p, q: p and q)
truth_table("OR (p ∨ q)", lambda p, q: p or q)
truth_table("XOR (p ⊕ q)", lambda p, q: p ^ q)
truth_table("Implication (p → q)", lambda p, q: (not p) or q)
truth_table("Biconditional (p ↔ q)", lambda p, q: p == q)

# Verify: p → q ≡ ¬p ∨ q
# Implication: only false when p=True and q=False
print("\n=== Verify: p → q ≡ ¬p ∨ q ===")
for p in [True, False]:
    for q in [True, False]:
        impl = not (p and not q)  # p → q is false only when p=T, q=F
        alt = (not p) or q        # equivalent form
        print(f"p={p}, q={q}: (p→q)={impl}, (¬p∨q)={alt}, equal={impl == alt}")

# De Morgan's Laws
print("\n=== De Morgan's Laws ===")
for p in [True, False]:
    for q in [True, False]:
        lhs = not (p and q)
        rhs = (not p) or (not q)
        print(f"¬({p} ∧ {q}) = {lhs}, ¬p ∨ ¬q = {rhs}, Equal: {lhs == rhs}")

# Compound expression: ¬(p ∧ q) ∨ r where p=T, q=F, r=T
print("\n=== Compound: ¬(T ∧ F) ∨ T ===")
p, q, r = True, False, True
result = (not (p and q)) or r
print(f"Result: {result}")

# Tautology check: p ∨ ¬p
print("\n=== Tautology: p ∨ ¬p ===")
for p in [True, False]:
    print(f"p={p}: p ∨ ¬p = {p or (not p)}")
```

## Connection to CS / Games / AI

- **If statements** — every conditional is an implication
- **Circuit design** — AND, OR, NOT gates build CPUs; Boolean algebra simplifies circuits
- **Database queries** — `WHERE age > 18 AND status = 'active'` is propositional logic
- **Bitwise operations** — `&`, `|`, `^`, `~` apply Boolean ops to every bit simultaneously
- **SAT solvers** — "can this Boolean formula be satisfied?" is the foundational NP-complete problem
- **Neural networks** — a single perceptron can learn AND, OR, NOT (but not XOR without a hidden layer!)

### Implications and Biconditionals

We already saw $p \rightarrow q$ and $p \leftrightarrow q$ above.  Now let's
dig deeper into the *family* of statements built from a single implication.

Given the implication $p \Rightarrow q$ ("if p then q"), there are three
related statements:

| Name | Statement | In symbols |
|------|-----------|------------|
| **Original (implication)** | "if p then q" | $p \Rightarrow q$ |
| **Converse** | "if q then p" | $q \Rightarrow p$ |
| **Inverse** | "if not p then not q" | $\neg p \Rightarrow \neg q$ |
| **Contrapositive** | "if not q then not p" | $\neg q \Rightarrow \neg p$ |

**Which are logically equivalent?**

The original and the contrapositive always have the same truth value.
The converse and the inverse always have the same truth value.
But the original and the converse are **not** equivalent in general.

**Pen & paper: Build the master truth table.**

| $p$ | $q$ | $p \Rightarrow q$ | $q \Rightarrow p$ (converse) | $\neg p \Rightarrow \neg q$ (inverse) | $\neg q \Rightarrow \neg p$ (contrapositive) |
|-----|-----|--------------------|------------------------------|---------------------------------------|----------------------------------------------|
| T | T | T | T | T | T |
| T | F | F | T | T | F |
| F | T | T | F | F | T |
| F | F | T | T | T | T |

Compare columns:
- Columns 3 and 6 match: **implication ≡ contrapositive** ✓
- Columns 4 and 5 match: **converse ≡ inverse** ✓
- Columns 3 and 4 do NOT match: **implication ≢ converse** ✗

**Example in plain English:**

- Original: "If it rains, the ground is wet." (true)
- Converse: "If the ground is wet, it rained." (not necessarily — sprinklers!)
- Contrapositive: "If the ground is not wet, it didn't rain." (true)

**Biconditional revisited:**

$p \Leftrightarrow q$ means "p if and only if q" (sometimes written "p iff q").
It is true exactly when $p$ and $q$ have the **same** truth value:

| $p$ | $q$ | $p \Leftrightarrow q$ |
|-----|-----|-----------------------|
| T | T | T |
| T | F | F |
| F | T | F |
| F | F | T |

Key identity:

$$p \Leftrightarrow q \equiv (p \Rightarrow q) \land (q \Rightarrow p)$$

In other words, "p iff q" means the implication goes **both ways**.

### Truth Sets

So far our propositions have been simple T/F values.  A **predicate** is a
statement that contains a variable, like $P(x) = \text{"x > 3"}$.  It becomes
a proposition once you plug in a specific value for $x$.

Given a predicate $P(x)$ and a **universe** $U$ (the set of all values $x$
can take), the **truth set** of $P$ is:

$$\{x \in U : P(x) \text{ is true}\}$$

**Pen & paper example:**

Let $P(x) = \text{"x > 3"}$ and $U = \{1, 2, 3, 4, 5\}$.

Check each element:
- $P(1) = \text{"1 > 3"} = F$
- $P(2) = \text{"2 > 3"} = F$
- $P(3) = \text{"3 > 3"} = F$
- $P(4) = \text{"4 > 3"} = T$ ✓
- $P(5) = \text{"5 > 3"} = T$ ✓

Truth set = $\{4, 5\}$

**Combining predicates uses the same connectives:**

If $Q(x) = \text{"x is even"}$ and $U = \{1, 2, 3, 4, 5\}$:

- Truth set of $P$ = $\{4, 5\}$
- Truth set of $Q$ = $\{2, 4\}$
- Truth set of $P \land Q$ = $\{4, 5\} \cap \{2, 4\} = \{4\}$
- Truth set of $P \lor Q$ = $\{4, 5\} \cup \{2, 4\} = \{2, 4, 5\}$

> This is exactly the bridge between logic and set theory (the next lesson).

### Boolean Functions and the XOR Problem

**Any Boolean function** on $n$ inputs can be completely described by a truth
table with $2^n$ rows.  For 2 inputs, that gives $2^4 = 16$ possible Boolean
functions.  AND, OR, NAND, NOR, XOR, XNOR, etc. are all members of this family.

**XOR recap:**

$p \oplus q$ is true when **exactly one** input is true:

| $p$ | $q$ | $p \oplus q$ |
|-----|-----|--------------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

**Why XOR matters for neural networks:**

A single **perceptron** (the simplest neural network unit) computes:

$$\text{output} = \begin{cases} 1 & \text{if } w_1 x_1 + w_2 x_2 + b \geq 0 \\ 0 & \text{otherwise} \end{cases}$$

This is a **linear classifier** — geometrically, it draws a straight line in
the $(x_1, x_2)$ plane and puts everything on one side into class 1 and the
other side into class 0.

For AND, the line $x_1 + x_2 - 1.5 = 0$ separates (1,1) from the rest. ✓
For OR, the line $x_1 + x_2 - 0.5 = 0$ works. ✓

But for XOR, plot the four points:
- $(0,0) \to 0$, $(1,1) \to 0$ — these are class 0
- $(0,1) \to 1$, $(1,0) \to 1$ — these are class 1

The "1" points sit on **opposite corners** of the square.  No single straight
line can put both 1-points on one side and both 0-points on the other.  XOR
is **not linearly separable**.

This was proven by Minsky & Papert (1969) and temporarily halted neural
network research (the "AI winter").  The solution: add a **hidden layer** to
create a multi-layer perceptron (MLP).

```python
# ── XOR: why it's not linearly separable ─────────────────────
import matplotlib.pyplot as plt
import numpy as np

# XOR truth table as points
points = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
labels = np.array([0, 1, 1, 0])  # XOR outputs

fig, axes = plt.subplots(1, 3, figsize=(14, 4))

# ── Plot 1: XOR (not linearly separable) ──
ax = axes[0]
for i, (x, y) in enumerate(points):
    color = 'red' if labels[i] == 0 else 'blue'
    marker = 'o' if labels[i] == 0 else 's'
    ax.scatter(x, y, c=color, s=200, marker=marker, edgecolors='black',
               zorder=5, label=f'XOR={labels[i]}' if i < 2 else '')
ax.set_title('XOR — NOT linearly separable')
ax.set_xlabel('$x_1$')
ax.set_ylabel('$x_2$')
ax.set_xlim(-0.5, 1.5)
ax.set_ylim(-0.5, 1.5)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3)
ax.legend(['Output 0', 'Output 1'])

# ── Plot 2: AND (linearly separable) ──
ax = axes[1]
and_labels = np.array([0, 0, 0, 1])
for i, (x, y) in enumerate(points):
    color = 'red' if and_labels[i] == 0 else 'blue'
    marker = 'o' if and_labels[i] == 0 else 's'
    ax.scatter(x, y, c=color, s=200, marker=marker, edgecolors='black', zorder=5)
# Decision boundary: x1 + x2 = 1.5
x_line = np.linspace(-0.5, 1.5, 100)
ax.plot(x_line, 1.5 - x_line, 'g--', linewidth=2, label='$x_1 + x_2 = 1.5$')
ax.set_title('AND — linearly separable')
ax.set_xlabel('$x_1$')
ax.set_ylabel('$x_2$')
ax.set_xlim(-0.5, 1.5)
ax.set_ylim(-0.5, 1.5)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3)
ax.legend()

# ── Plot 3: OR (linearly separable) ──
ax = axes[2]
or_labels = np.array([0, 1, 1, 1])
for i, (x, y) in enumerate(points):
    color = 'red' if or_labels[i] == 0 else 'blue'
    marker = 'o' if or_labels[i] == 0 else 's'
    ax.scatter(x, y, c=color, s=200, marker=marker, edgecolors='black', zorder=5)
# Decision boundary: x1 + x2 = 0.5
ax.plot(x_line, 0.5 - x_line, 'g--', linewidth=2, label='$x_1 + x_2 = 0.5$')
ax.set_title('OR — linearly separable')
ax.set_xlabel('$x_1$')
ax.set_ylabel('$x_2$')
ax.set_xlim(-0.5, 1.5)
ax.set_ylim(-0.5, 1.5)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3)
ax.legend()

plt.tight_layout()
plt.savefig('xor_linear_separability.png', dpi=100, bbox_inches='tight')
plt.show()
print("Red = output 0, Blue = output 1")
print("XOR: no single line separates red from blue!")
print("AND/OR: the green dashed line separates them perfectly.")
```

## Check Your Understanding

1. **Pen & paper:** Build the complete truth table for $(p \lor q) \land \neg r$ (8 rows, since 3 variables).
2. **Pen & paper:** Use De Morgan's Laws to simplify $\neg((\neg p \land q) \lor (p \land \neg q))$.
3. **Pen & paper:** Prove that $p \rightarrow q$ is logically equivalent to $\neg q \rightarrow \neg p$ (contrapositive) using truth tables.
4. **Think about it:** Why can a single perceptron learn AND but not XOR? (Hint: draw the truth table outputs on a 2D grid and try to separate T from F with a single line.)
5. **Pen & paper:** Write the converse, inverse, and contrapositive of the statement "If $n$ is divisible by 6, then $n$ is divisible by 3." Which of these four statements are true? Which are false? Give a counterexample for each false one.
6. **Coding challenge:** Given the universe $U = \{1, 2, \ldots, 20\}$ and the predicates $P(x) = \text{"x is prime"}$ and $Q(x) = \text{"x > 10"}$, compute the truth sets of $P$, $Q$, $P \land Q$, and $P \lor Q$ in Python. How many elements are in the truth set of $P \oplus Q$?
