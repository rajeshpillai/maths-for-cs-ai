# Relations and Functions — Injective, Surjective, Bijective

## Explain Like I Am 7

Picture a row of children and a row of coat pegs.  Drawing a line from
each child to a peg is a **relation**: it says who's connected to
what.  A **function** has a stricter rule: every child goes to exactly
*one* peg.  Three special words describe how tidy the pairing is — if
no two kids share a peg, it's *injective*; if every peg gets used,
it's *surjective*; if both, it's a perfect matching, called
*bijective*.  Lots of tricky maths boils down to "what kind of
matching is this?"

## Intuition

A **relation** is a connection between elements of two sets — like "student X
is enrolled in course Y".  A **function** is a special relation where every
input maps to exactly **one** output — like a Python function that always
returns the same result for the same argument.

Understanding the types of functions (one-to-one, onto, bijection) tells you
whether information is lost, whether you can invert the mapping, and whether
two sets have the same size.

## Prerequisites

- Tier 1, Lesson 2: Set Theory (Cartesian products)

## From First Principles

### Relations

A **relation** $R$ from set $A$ to set $B$ is any subset of the Cartesian
product $A \times B$.

**Pen & paper:** $A = \{1, 2, 3\}$, $B = \{a, b\}$

$R = \{(1, a), (2, b), (3, a)\}$ is a relation from $A$ to $B$.

We write $(1, a) \in R$ or $1\;R\;a$ to mean "1 is related to a".

### Properties of relations on a single set

Let $R$ be a relation on $A$ (i.e., $R \subseteq A \times A$).

Let $A = \{1, 2, 3\}$.

**Reflexive:** Every element is related to itself.
$\forall a \in A: (a, a) \in R$

Example: $R = \{(1,1), (2,2), (3,3), (1,2)\}$ — reflexive ✓

**Symmetric:** If $a$ is related to $b$, then $b$ is related to $a$.
$(a, b) \in R \Rightarrow (b, a) \in R$

Example: $R = \{(1,2), (2,1), (1,1)\}$ — symmetric ✓

**Transitive:** If $a \to b$ and $b \to c$, then $a \to c$.
$(a, b) \in R \land (b, c) \in R \Rightarrow (a, c) \in R$

Example: $R = \{(1,2), (2,3), (1,3)\}$ — transitive ✓

**Equivalence relation:** reflexive + symmetric + transitive.

> "Equals", "same parity", "congruent modulo n" are all equivalence relations.

**Pen & paper:** Is "congruent mod 3" on $\{0, 1, 2, 3, 4, 5\}$ an equivalence relation?

- Reflexive: $a \equiv a \pmod{3}$ ✓ (remainder of $a-a=0$ is 0)
- Symmetric: $a \equiv b \Rightarrow b \equiv a$ ✓
- Transitive: $a \equiv b$ and $b \equiv c \Rightarrow a \equiv c$ ✓

Equivalence classes: $\{0, 3\}, \{1, 4\}, \{2, 5\}$ — these **partition** the set.

### Functions

A **function** $f: A \to B$ is a relation where every element of $A$ maps
to **exactly one** element of $B$.

- $A$ is the **domain** (inputs)
- $B$ is the **codomain** (possible outputs)
- The **range** (or image) is the set of outputs actually produced: $\{f(a) \mid a \in A\}$

**Pen & paper:** $f: \{1, 2, 3\} \to \{a, b, c\}$ defined by $f(1) = a, f(2) = a, f(3) = b$.

- Domain = $\{1, 2, 3\}$
- Codomain = $\{a, b, c\}$
- Range = $\{a, b\}$ (note: $c$ is never hit)

### Injective (one-to-one)

Different inputs **always** produce different outputs.

$$f(x_1) = f(x_2) \Rightarrow x_1 = x_2$$

**Pen & paper:** Is $f(x) = 2x + 1$ injective?

If $2x_1 + 1 = 2x_2 + 1$, then $2x_1 = 2x_2$, so $x_1 = x_2$. ✓ Injective.

**Pen & paper:** Is $f(x) = x^2$ injective on $\mathbb{R}$?

$f(2) = 4 = f(-2)$, but $2 \ne -2$. ✗ Not injective.

(But $f(x) = x^2$ **is** injective if we restrict the domain to $x \ge 0$.)

> **Injective = no information loss.** You can always recover the input from the output.

### Surjective (onto)

Every element of the codomain is hit by **at least one** input.

$$\forall b \in B, \exists a \in A: f(a) = b$$

Equivalently: range = codomain.

**Pen & paper:** Is $f: \mathbb{R} \to \mathbb{R}$, $f(x) = 2x + 1$ surjective?

For any $y \in \mathbb{R}$, solve: $y = 2x + 1 \Rightarrow x = (y-1)/2 \in \mathbb{R}$. ✓ Surjective.

**Pen & paper:** Is $f: \mathbb{R} \to \mathbb{R}$, $f(x) = x^2$ surjective?

Is there an $x$ such that $x^2 = -1$?  No (in reals). ✗ Not surjective.

(But if we change the codomain to $[0, \infty)$, it becomes surjective.)

### Bijective (one-to-one and onto)

A function that is **both injective and surjective**.

$$\text{Bijective} = \text{Injective} + \text{Surjective}$$

**Key property:** A bijection has an **inverse function** $f^{-1}: B \to A$.

**Pen & paper:** $f: \mathbb{R} \to \mathbb{R}$, $f(x) = 2x + 1$

- Injective ✓ (shown above)
- Surjective ✓ (shown above)
- Therefore bijective ✓
- Inverse: $f^{-1}(y) = (y - 1)/2$
- Verify: $f^{-1}(f(3)) = f^{-1}(7) = (7-1)/2 = 3$ ✓

### Composition

$(g \circ f)(x) = g(f(x))$ — apply $f$ first, then $g$.

**Pen & paper:** $f(x) = 2x$, $g(x) = x + 3$

$(g \circ f)(4) = g(f(4)) = g(8) = 11$
$(f \circ g)(4) = f(g(4)) = f(7) = 14$

> **Order matters!** $g \circ f \ne f \circ g$ in general.

### Summary table

| Type | Each input → | Each output ← | Invertible? |
|------|-------------|---------------|-------------|
| Injective | unique output | at most one input | left-invertible |
| Surjective | some output | at least one input | right-invertible |
| Bijective | unique output | exactly one input | fully invertible |

### Counting argument

If $f: A \to B$ is a bijection, then $|A| = |B|$.

This is how mathematicians prove two infinite sets have the "same size" —
e.g., $\mathbb{N}$ and $\mathbb{Z}$ have the same cardinality because we can
construct a bijection: $0 \to 0, 1 \to 1, 2 \to -1, 3 \to 2, 4 \to -2, \dots$

### Worked examples (NCERT-style)

**Example 1 — recover a set from $A \times A$.** $n(A \times A) = 9$, and the pairs $(-1, 0)$ and $(0, 1)$ both lie in $A \times A$. Find $A$.

Step 1 — fix $|A|$. $n(A \times A) = n(A)^2 = 9$, so $n(A) = 3$.

Step 2 — collect components. Both coordinates of every pair come from $A$. From $(-1, 0)$: $-1 \in A$ and $0 \in A$. From $(0, 1)$: $0 \in A$ and $1 \in A$. Therefore $A \supseteq \{-1, 0, 1\}$ — but the right side already has 3 elements, matching $n(A) = 3$.

$$A = \{-1, 0, 1\}.$$

**Example 2 — function or not?** Decide which of these are functions $f : \mathbb{Z} \to \mathbb{Z}$:

- $R_1 = \{(2, 1), (5, 1), (8, 1), (11, 1), (14, 1), (17, 1)\}$ — every first coordinate is unique. **Function** (a constant function on its domain).
- $R_2 = \{(2, 1), (4, 2), (6, 3), (8, 4)\}$ — first coordinates all distinct. **Function**.
- $R_3 = \{(1, 3), (1, 5), (2, 5)\}$ — the input $1$ is paired with both $3$ and $5$. **Not a function** (one input has two images).

**Example 3 — equivalence relation.** On $\mathbb{Z}$, define $a R b$ iff $a - b$ is divisible by $5$. Check the three properties.

- *Reflexive*: $a - a = 0$, and $5 \mid 0$. ✓
- *Symmetric*: if $5 \mid (a - b)$, then $5 \mid -(a - b) = (b - a)$, so $b R a$. ✓
- *Transitive*: if $5 \mid (a - b)$ and $5 \mid (b - c)$, then $5 \mid (a - b) + (b - c) = (a - c)$, so $a R c$. ✓

So $R$ is an equivalence relation. The equivalence classes partition $\mathbb{Z}$ into the five residue classes mod $5$: $[0], [1], [2], [3], [4]$.

**Example 4 — composition and inverse.** Let $f(x) = 2x + 3$ and $g(x) = (x - 3)/2$ on $\mathbb{R}$. Show $g = f^{-1}$.

Compute $(f \circ g)(x)$:

$$f(g(x)) = 2 \cdot \frac{x - 3}{2} + 3 = (x - 3) + 3 = x.$$

Compute $(g \circ f)(x)$:

$$g(f(x)) = \frac{(2x + 3) - 3}{2} = \frac{2x}{2} = x.$$

Both compositions return the input, so $g$ is a two-sided inverse of $f$. Equivalently $f$ is bijective (injectivity from $f(a) = f(b) \Rightarrow 2a + 3 = 2b + 3 \Rightarrow a = b$; surjectivity from "every $y$ has pre-image $(y - 3)/2$").

## Python Verification

```python
# ── Relations & Functions: verifying pen & paper work ───────

# Relation properties
print("=== Equivalence relation: mod 3 on {0..5} ===")
S = {0, 1, 2, 3, 4, 5}
R = {(a, b) for a in S for b in S if a % 3 == b % 3}

# Check reflexive
reflexive = all((a, a) in R for a in S)
# Check symmetric
symmetric = all((b, a) in R for (a, b) in R)
# Check transitive
transitive = all((a, c) in R for (a, b) in R for (b2, c) in R if b == b2)

print(f"Reflexive: {reflexive}")
print(f"Symmetric: {symmetric}")
print(f"Transitive: {transitive}")

# Equivalence classes
classes = {}
for a in sorted(S):
    key = a % 3
    classes.setdefault(key, []).append(a)
print(f"Equivalence classes: {list(classes.values())}")

# Function types
print("\n=== f(x) = 2x + 1 (R → R) ===")
f = lambda x: 2*x + 1

# Injective test on sample
test_vals = list(range(-5, 6))
outputs = [f(x) for x in test_vals]
injective = len(outputs) == len(set(outputs))
print(f"Injective (sample test): {injective}")

# Inverse
f_inv = lambda y: (y - 1) / 2
print(f"f(3) = {f(3)}")
print(f"f_inv(7) = {f_inv(7)}")
print(f"f_inv(f(3)) = {f_inv(f(3))}")

# g(x) = x^2 is NOT injective on R
print("\n=== g(x) = x² (not injective) ===")
g = lambda x: x**2
print(f"g(2) = {g(2)}, g(-2) = {g(-2)} → same output, different inputs")

# Composition
print("\n=== Composition ===")
f2 = lambda x: 2*x
g2 = lambda x: x + 3
print(f"(g ∘ f)(4) = g(f(4)) = g({f2(4)}) = {g2(f2(4))}")
print(f"(f ∘ g)(4) = f(g(4)) = f({g2(4)}) = {f2(g2(4))}")
print(f"Order matters: {g2(f2(4))} ≠ {f2(g2(4))}")

# Bijection between N and Z
print("\n=== Bijection N → Z ===")
def n_to_z(n):
    # 0→0, 1→1, 2→-1, 3→2, 4→-2, ...
    if n == 0: return 0
    if n % 2 == 1: return (n + 1) // 2
    return -(n // 2)

for i in range(8):
    print(f"  {i} → {n_to_z(i)}")
```

## Visualisation — Injective, surjective, bijective at a glance

The three classifications of a function — **injective** (one-to-one),
**surjective** (onto), and **bijective** (both) — are easiest to see
as arrow diagrams between two finite sets.

```python
# ── Visualising injective / surjective / bijective ──────────
import numpy as np
import matplotlib.pyplot as plt

# Four small functions, one of each kind, drawn as arrow diagrams.
cases = [
    {"title": "Not injective, not surjective\n(f: arbitrary)",
     "domain": [1, 2, 3, 4],
     "codomain": ["a", "b", "c"],
     "mapping": {1: "a", 2: "a", 3: "b", 4: "b"}},
    {"title": "Injective only (one-to-one)\n(every input → distinct output, but 'a' missing)",
     "domain": [1, 2, 3],
     "codomain": ["a", "b", "c", "d"],
     "mapping": {1: "b", 2: "c", 3: "d"}},
    {"title": "Surjective only (onto)\n(every output reached, but '1' and '2' both → 'a')",
     "domain": [1, 2, 3, 4],
     "codomain": ["a", "b", "c"],
     "mapping": {1: "a", 2: "a", 3: "b", 4: "c"}},
    {"title": "Bijective (both injective AND surjective)\n→ has an inverse",
     "domain": [1, 2, 3, 4],
     "codomain": ["a", "b", "c", "d"],
     "mapping": {1: "b", 2: "a", 3: "d", 4: "c"}},
]

fig, axes = plt.subplots(1, 4, figsize=(18, 5.5))

for ax, case in zip(axes, cases):
    dom = case["domain"]; cod = case["codomain"]; m = case["mapping"]
    # Place domain dots on the left, codomain on the right.
    for i, x in enumerate(dom):
        y = (len(dom) - 1) / 2 - i
        ax.scatter(0, y, color="tab:blue", s=400, zorder=5)
        ax.text(0, y, str(x), ha="center", va="center", fontsize=12,
                fontweight="bold", color="white")
    for i, y_lab in enumerate(cod):
        y = (len(cod) - 1) / 2 - i
        ax.scatter(2, y, color="tab:orange", s=400, zorder=5)
        ax.text(2, y, y_lab, ha="center", va="center", fontsize=12,
                fontweight="bold", color="white")
    # Draw arrows.
    for x in dom:
        y_in  = (len(dom) - 1) / 2 - dom.index(x)
        y_out = (len(cod) - 1) / 2 - cod.index(m[x])
        ax.annotate("", xy=(2, y_out), xytext=(0, y_in),
                    arrowprops=dict(arrowstyle="->", color="black", lw=1.5))
    ax.set_xlim(-0.5, 2.5); ax.set_ylim(-2.5, 2.5)
    ax.axis("off")
    ax.set_title(case["title"], fontsize=10)

plt.tight_layout()
plt.show()

# Print the formal checks for each.
print("Function classification cheat-sheet:")
print(" - Injective  (one-to-one): different inputs → different outputs")
print(" - Surjective (onto):       every codomain element is hit by some input")
print(" - Bijective: both → the function has a well-defined inverse")
print()
for case in cases:
    m = case["mapping"]; cod = set(case["codomain"])
    inj = len(set(m.values())) == len(m)
    sur = set(m.values()) == cod
    print(f"  {case['title'].splitlines()[0]:<55}  inj={inj}  sur={sur}  bij={inj and sur}")
```

**Three terms with three real-world consequences:**

- **Injective** (one-to-one): no two inputs share an output. **Hash
  functions** *aspire* to be injective — collisions = security
  vulnerabilities (think MD5).
- **Surjective** (onto): every codomain element is produced by *some*
  input. A surjection from "queries" → "rows of a table" means every
  row could be retrieved by some query.
- **Bijective** (both): a function has an inverse iff it is bijective.
  **Encryption is bijective** — you have to be able to decrypt
  everything you encrypt. AES is a bijection on 128-bit blocks; if it
  weren't, ciphertext could not be recovered. **Lossless compression**
  is also bijective by construction.

## Connection to CS / Games / AI / Business / Industry

- **Hash functions** — ideally injective (no collisions), but in practice collisions happen
- **Encryption** — must be bijective (so you can decrypt); AES is a bijection on 128-bit blocks
- **Database keys** — primary key → row is a function; unique constraint = injective
- **Type conversions** — `int` → `float` is injective; `float` → `int` is surjective (many-to-one via truncation)
- **Equivalence relations** — "same hash bucket", "same connected component", "same equivalence class in union-find"
- **Game dev** — mapping between world coordinates and screen coordinates is a function (projection)
- **Customer-to-account mapping (Business/CRM)** — Salesforce and HubSpot enforce many-to-one functions from contacts to accounts; many-to-many relations (campaigns × leads) are stored as junction tables — relational schema design *is* applied function/relation theory.
- **Lookup tables in industry (Engineering)** — automotive ECUs (Bosch, Continental) implement injective fuel/ignition maps; tax-bracket lookups in TurboTax/H&R Block are piecewise functions encoded as ordered relations.
- **Bijective database migrations (Operations)** — when banks (Wells Fargo, HDFC) migrate accounts between systems, every old account ID must map bijectively to a new one — auditors verify injectivity (no duplicates) and surjectivity (no orphans).
- **Genome-protein mappings (Biology/Pharma)** — the genetic code (DNA codon → amino acid) is a surjective non-injective function; pharma R&D at Roche/Moderna uses inverse mappings (protein → mRNA) to design vaccines and antibody drugs.
- **Board Exam / JEE (CBSE Class 11 Ch 2 + Class 12 Ch 1 — Relations and Functions)** — covered in NCERT Class 11 Ex 2.1–2.3 (Cartesian product, relations, functions) and Class 12 Ex 1.1–1.4 (reflexive/symmetric/transitive/equivalence relations, one-one and onto, composition, invertibility). High-weightage JEE topics: (i) classifying relations as reflexive / symmetric / transitive — e.g. "$aRb$ iff $a - b$ is divisible by $5$" on $\mathbb{Z}$ (equivalence; partitions $\mathbb{Z}$ into 5 residue classes); (ii) checking injectivity / surjectivity for $f(x) = (x-2)/(x-3)$, $f(x) = x^2$, etc.; (iii) computing $f \circ g$ and finding $f^{-1}$ when $f$ is shown to be bijective; (iv) counting relations from $A$ to $B$: $2^{n(A) \cdot n(B)}$.
- **Common pitfalls drilled in NCERT** — (a) calling every relation a function: a function needs *every* element of the domain to map to *exactly one* image; (b) confusing image and pre-image — if $f(a) = b$, then $b$ is the image of $a$ and $a$ is a pre-image of $b$; (c) range vs. codomain — codomain is what you declare, range is what you actually achieve, with equality only for onto functions; (d) "$f$ is invertible" requires $f$ to be a *bijection*, not just injective.

## Check Your Understanding

1. **Pen & paper:** Is the relation "a divides b" on $\{1, 2, 3, 6\}$ reflexive? Symmetric? Transitive?
2. **Pen & paper:** Is $f(x) = x^3$ from $\mathbb{R}$ to $\mathbb{R}$ injective? Surjective? Bijective? Find the inverse if it exists.
3. **Pen & paper:** Let $A = \{1, 2, 3\}$ and $B = \{a, b\}$. How many total functions $f: A \to B$ exist? How many are surjective?
4. **Think about it:** Why must a hash function with a fixed-size output (e.g., SHA-256 producing 256 bits) be non-injective when the input space is larger than $2^{256}$?
