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

## Check Your Understanding

1. **Pen & paper:** Build the complete truth table for $(p \lor q) \land \neg r$ (8 rows, since 3 variables).
2. **Pen & paper:** Use De Morgan's Laws to simplify $\neg((\neg p \land q) \lor (p \land \neg q))$.
3. **Pen & paper:** Prove that $p \rightarrow q$ is logically equivalent to $\neg q \rightarrow \neg p$ (contrapositive) using truth tables.
4. **Think about it:** Why can a single perceptron learn AND but not XOR? (Hint: draw the truth table outputs on a 2D grid and try to separate T from F with a single line.)
