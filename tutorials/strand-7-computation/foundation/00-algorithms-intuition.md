---
strand: computation
level: foundation
order: 0
title: What is an Algorithm?
prerequisites: []
connections:
  - strand-7-computation-foundation/01-number-representation
applications:
  - cs: "Every program — algorithms are the units of computation"
  - life: "Recipes, decision procedures, repeatable problem-solving"
---

# What is an Algorithm?

## Explain Like I Am 7

An **algorithm** is just a recipe.  A really, really fussy recipe — one
where every step is so clear that even a forgetful kitchen helper
couldn't mess it up.  "Crack two eggs, whisk for thirty seconds, pour
into the pan" is a recipe; "make it taste nice" isn't, because nobody
knows when to stop.  The good recipes also promise to *finish* — you
don't keep stirring forever.  Computers are those forgetful kitchen
helpers, and every program you've ever used is one of these careful
recipes.

## Mental

An **algorithm** is a finite, unambiguous procedure that solves a
class of problems. Three intuitive criteria:

1. **Finite description** — the steps fit on a page.
2. **Determinate** — the same input always produces the same output.
3. **Terminates** — it stops in finitely many steps.

A recipe for chocolate cake fits. Long division of integers fits.
"Be a good person" doesn't — it's not finite or unambiguous.

## A first algorithm: maximum of a list

**Problem**: given a list of numbers, return the largest.

**Pseudocode**:

```
input: list L = [x_0, x_1, ..., x_{n-1}]
m ← x_0
for i = 1 to n - 1:
    if x_i > m:
        m ← x_i
return m
```

Every step is deterministic; the loop runs $n - 1$ times then halts.
Finite, unambiguous, terminating — an algorithm.

## Three properties to think about

For any algorithm, we ask:

- **Correctness** — does it produce the right answer?
- **Efficiency** — how does running time grow with input size? (Lesson 03.)
- **Resources** — how much memory? Energy?

A wrong but fast algorithm is useless; a correct but exponential
algorithm may be impractical.

## Worked example: linear search

```
input: list L, target t
for each x in L:
    if x == t:
        return position of x
return "not found"
```

Correct because it checks every element. Time grows linearly with
the list length — *linear search* gets its name from this.

For a sorted list, **binary search** is much faster (Lesson 04 of
Foundation introduces it; Strand 7 Intermediate goes deeper).

## Interactive

:::widget type=numeric-input prompt="Maximum of $[3, 7, 2, 9, 1]$?" answer=9 explain="$9$.":::

:::widget type=numeric-input prompt="Linear search of $[5, 2, 8, 4, 1]$ for $4$ — at what 0-indexed position?" answer=3 explain="Index $3$.":::

:::widget type=numeric-input prompt="Number of comparisons in linear search worst case for a list of length $n = 100$?" answer=100 explain="$100$ — every element checked.":::

:::widget type=numeric-input prompt="Algorithm: finite (1) or infinite (0) description?" answer=1 explain="Finite.":::

## Symbolic

**Formal model**: an algorithm is a **Turing machine** (or any
equivalent: lambda calculus, register machine, RAM model). The
**Church-Turing thesis** asserts these models are all computationally
equivalent — every effectively computable function is Turing-computable.

**Decision procedures vs computation**: some algorithms answer
*yes/no* (is this number prime?). Others *compute* a value (what is
the GCD?). Others *enumerate* a set (list all primes ≤ N).

**Halting problem** (Strand 8 Intermediate Lesson 06): no algorithm
exists to decide whether arbitrary algorithms halt. So
"algorithmically solvable" has limits.

## Computational

```python
# Maximum of a list — the algorithm above
def max_of(lst):
    m = lst[0]
    for x in lst[1:]:
        if x > m:
            m = x
    return m

print(max_of([3, 7, 2, 9, 1]))     # 9

# Linear search
def linear_search(lst, target):
    for i, x in enumerate(lst):
        if x == target:
            return i
    return -1

print(linear_search([5, 2, 8, 4, 1], 4))   # 3
print(linear_search([5, 2, 8, 4, 1], 99))  # -1

# Sum of a list
def sum_of(lst):
    s = 0
    for x in lst:
        s += x
    return s

print(sum_of([1, 2, 3, 4, 5]))    # 15
```

Each of these is a small algorithm — finite, deterministic, halting.

## Applied

- **Search engines** — ranking pages is a giant algorithm
  (PageRank started simple; modern systems combine many).
- **Compression** — the JPEG, PNG, MP3 formats are each defined by
  encode/decode algorithms.
- **Routing** — Google Maps, GPS, network routing all rest on
  algorithms (Dijkstra's shortest path, A*).
- **Recipes in cooking** — cake recipes are everyday algorithms.
- **Administrative procedures** — tax forms, court procedures are
  algorithms in legal language.

## Check Your Understanding

:::widget type=numeric-input prompt="An algorithm must terminate. Type 1 for true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Different programming languages can implement the same algorithm. Type 1." answer=1 explain="Yes — algorithm is language-independent.":::

:::widget type=numeric-input prompt="Linear search on a sorted list — still works (1) or breaks (0)?" answer=1 explain="Still works (just not the fastest method).":::

:::widget type=numeric-input prompt="Maximum of $[10, 5, 3, 12, 7]$?" answer=12 explain="$12$.":::
