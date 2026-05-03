---
strand: structure
level: foundation
order: 0
title: Operations and Their Properties
prerequisites: []
connections:
  - strand-2-structure-foundation/01-identity-and-inverse
  - strand-1-number-quantity-foundation/02-mental-addition-subtraction
applications:
  - cs: "Why operator order matters in code; functional purity"
  - business: "Reordering tasks safely (or not)"
  - games: "Combining transformations in any order"
  - life: "When 'shoes then socks' ≠ 'socks then shoes'"
---

# Operations and Their Properties

## Mental

An **operation** combines two things to produce a third. Addition,
multiplication, function composition, and string concatenation are
all operations.

Three properties matter most:

**Associativity**: $(a \star b) \star c = a \star (b \star c)$. The
**grouping** doesn't change the result.

**Commutativity**: $a \star b = b \star a$. The **order** doesn't
change the result.

**Closure**: combining things from a set $S$ with $\star$ gives
something still in $S$.

Different operations have different combinations:

| Operation | Associative | Commutative | Closure on integers |
|---|---|---|---|
| $+$ (addition) | ✓ | ✓ | ✓ |
| $-$ (subtraction) | ✗ | ✗ | ✓ |
| $\times$ (multiplication) | ✓ | ✓ | ✓ |
| $\div$ (division) | ✗ | ✗ | ✗ ($1 \div 2 \notin \mathbb{Z}$) |
| String concatenation | ✓ | ✗ | ✓ |
| Function composition | ✓ | ✗ | depends |
| Cross product (3D) | ✗ | ✗ (anti-commutative) | ✓ |

The *combinations* of properties an operation has determine which
algebraic theorems apply to it.

## Why these matter

If $\star$ is associative, you can write $a \star b \star c$ without
parentheses. Most arithmetic depends on this.

If $\star$ is commutative, you can rearrange operands freely. This
underlies "$x + y$" and "$y + x$" being interchangeable.

If $\star$ is **not** commutative, order matters. Common examples:

- **Function composition**: $(f \circ g)(x) \ne (g \circ f)(x)$ in
  general.
- **Matrix multiplication**: $AB \ne BA$.
- **3D rotations**: rotating about $x$ then $y$ is **not** the same
  as $y$ then $x$ (Strand 3 Foundation Lesson 08 noted this).
- **Putting on shoes**: socks-then-shoes ≠ shoes-then-socks.

## Interactive

:::widget type=numeric-input prompt="Is integer addition associative? $2 + (3 + 4) = (2 + 3) + 4 = ?$" answer=9 explain="$9 = 9$. Yes — associative.":::

:::widget type=numeric-input prompt="Is integer subtraction associative? $5 - (3 - 1)$ vs $(5 - 3) - 1$. First gives $3$; second gives $1$. Equal? (1 yes, 0 no.)" answer=0 explain="$3 \\ne 1$. **Subtraction is not associative.**":::

:::widget type=numeric-input prompt="Is matrix multiplication commutative? Generally no. Type 0 if 'no'." answer=0 explain="Counter-example: most $A, B$ have $AB \\ne BA$.":::

:::widget type=numeric-input prompt="Closure: is $\\mathbb{Z}$ closed under multiplication? (Multiply two integers, get an integer.)" answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Is $\\mathbb{Z}$ closed under division? $1 \\div 2 = 0.5 \\notin \\mathbb{Z}$." answer=0 explain="No — closure fails.":::

## Symbolic

A **binary operation** on a set $S$ is a function $\star: S \times
S \to S$ — that is, takes two elements and gives one back.

**Properties**:

- **Associative**: $\forall a, b, c: (a \star b) \star c = a \star
  (b \star c)$.
- **Commutative**: $\forall a, b: a \star b = b \star a$.
- **Closure**: implicit in the codomain $S$ — the operation always
  produces something in $S$.

A weaker property: an operation can be **anti-commutative**, like
the cross product: $\mathbf{u} \times \mathbf{v} = -(\mathbf{v}
\times \mathbf{u})$.

## Computational

```python
# Test commutativity for integer addition
import random
for _ in range(100):
    a, b = random.randint(-100, 100), random.randint(-100, 100)
    assert a + b == b + a
print("Addition commutes")

# Subtraction is NOT commutative
print((5 - 3) == (3 - 5))   # False

# Matrix multiplication is NOT commutative
import numpy as np
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
print(np.array_equal(A @ B, B @ A))   # False
```

## Applied

- **Functional programming**: pure functions compose associatively.
  Effect-free computations can be reordered.
- **Database query optimisation**: commutative joins can be
  reordered for performance.
- **3D graphics**: matrix multiplication is associative but not
  commutative — order of transformations matters.

## Check Your Understanding

:::widget type=numeric-input prompt="Is multiplication commutative? Type 1 yes." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Is integer division closed (always yields an integer)?" answer=0 explain="No.":::

:::widget type=numeric-input prompt="Function composition is associative — yes (1) or no (0)?" answer=1 explain="Yes — $(f \\circ g) \\circ h = f \\circ (g \\circ h)$ always.":::

:::widget type=numeric-input prompt="Three rotations $R_x, R_y, R_z$ in 3D. Is composition commutative?" answer=0 explain="No. Order matters.":::
