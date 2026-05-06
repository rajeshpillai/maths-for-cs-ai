---
strand: pattern-counting
level: foundation
order: 1
title: Tree Diagrams — Counting by Branching
prerequisites:
  - tier: strand-5-pattern-counting-foundation
    slug: 00-multiplication-principle
    description: The multiplication principle
connections:
  - strand-5-pattern-counting-foundation/02-permutations-and-factorial
  - strand-5-pattern-counting-foundation/08-fibonacci-and-recursion
applications:
  - cs: "Decision trees in ML, search trees, parser ASTs, file-system hierarchies"
  - business: "Decision analysis (probability tree × outcome value)"
  - games: "Quest dialogue branches, skill-tree counts"
  - life: "Mapping out 'what could happen if I take this job'"
---

# Tree Diagrams — Counting by Branching

## Explain Like I Am 7

Think of every choice as a fork in a path through a forest.  At the
start there is one trunk; at each fork the path splits into the
choices you can make.  Keep splitting until every story is finished,
then count the *tips* of the branches at the end — those are all the
different stories that could have happened.  Tree diagrams are
specially useful when one branch is *bushier* than another, like
"flip a coin; if it lands heads you also roll a die."  Counting the
leaves does the work for you, no formulas needed.

## Mental

Lesson 00 gave you the multiplication principle: counts of
independent choices multiply. **Tree diagrams** are the visual tool
that makes the principle obvious — and that handle the awkward case
where choices *aren't* fully independent.

A tree diagram has:

- A **root** at the top (or bottom), representing the starting
  state.
- **Branches** at each step, one for each choice.
- **Leaves** at the end, each representing one complete outcome.

The total count of outcomes is the **number of leaves**. With
fully independent choices, the leaf count agrees with the
multiplication principle. When choices are restricted, you can
still count by drawing the tree carefully — eliminating branches
that aren't allowed.

A tiny example: flip a coin twice. Tree:

```
                     start
                    /     \
                   H       T
                  / \     / \
                 H   T   H   T
                 │   │   │   │
                HH  HT  TH  TT       ← 4 leaves = 2 × 2
```

For unequal stages — say flip a coin, then if heads, roll a die,
otherwise stop — the tree is **uneven**:

```
                     start
                    /     \
                   H       T          ← 1 leaf for tails
                  /│\ \ \ \
                 1 2 3 4 5 6          ← 6 leaves for heads + die
```

Total leaves: $1 + 6 = 7$. Notice — **not** $2 \times 6 = 12$, because
the die roll only happens when the coin is heads. Trees handle this
naturally.

The takeaway: **multiplication is for independent stages; trees
generalise to any branching structure.** When in doubt, draw a
tree.

## Interactive

:::widget type=numeric-input prompt="A coin is flipped, then a $4$-sided die is rolled. How many leaves does the tree have? (Both stages always happen.)" answer=8 explain="$2 \\cdot 4 = 8$. Each coin outcome (H or T) branches into $4$ die outcomes. Independent stages, multiplication applies.":::

:::widget type=numeric-input prompt="A coin is flipped. If heads, you stop. If tails, you flip again. How many possible total outcomes (leaves)?" answer=3 explain="Tree: H (stop) or T → H or T → T. Three leaves: H, TH, TT. Asymmetric tree; multiplication does **not** apply directly here.":::

:::widget type=numeric-input prompt="A pizza menu offers $3$ sizes, then for size 'large' you can pick $2$ crusts (other sizes have $1$ crust). How many size-crust combinations?" answer=4 explain="Two sizes have $1$ crust each ($2$ leaves); large has $2$ crusts ($2$ leaves). Total: $4$.":::

:::widget type=step-revealer
{
  "title": "Counting paths through a small decision tree",
  "steps": [
    {"prose": "A user signs up. Stage 1: select a country (3 options). Stage 2: select a plan — but for one specific country (UK), only 'basic' is available; the other countries have 3 plans (basic, pro, enterprise)."},
    {"math": "\\text{Total paths} = (\\text{paths from non-UK}) + (\\text{paths from UK})", "prose": "Two non-UK countries × 3 plans + 1 UK × 1 plan."},
    {"math": "= 2 \\cdot 3 + 1 \\cdot 1 = 7", "prose": "Seven distinct sign-up flows. With pure multiplication you'd guess $3 \\cdot 3 = 9$, but the UK restriction removes 2 paths."},
    {"prose": "Lesson: when choices restrict each other, **add over branches** rather than multiply across all of them. Trees show the addition explicitly."}
  ]
}
:::

:::widget type=numeric-input prompt="In the example above (3 countries, UK restricted to 1 plan, others to 3), how many sign-up paths are there?" answer=7 explain="Non-UK × plans ($2 \\cdot 3 = 6$) + UK × $1$ plan = $7$.":::

## Symbolic

A tree diagram with **independent**, equal-sized stages produces
$\prod n_i$ leaves — the multiplication principle.

When stages are **dependent** or **unequal**, the formula generalises:

$$
\text{total leaves} = \sum_{\text{branches at root}} (\text{leaves in that subtree}).
$$

This is a recursive definition. The leaves of the whole tree is the
sum of the leaves of each subtree at the root, where each subtree's
leaves is the sum of *its* subtree leaves, and so on, down to the
leaf level (where each leaf counts as $1$).

This recursion is — surprisingly — the seed of **dynamic
programming**. A tree's leaf count is a sum of subtree leaf counts;
many real-world counting problems are expressed this way (Lesson 08
will return to this with Fibonacci).

A useful general principle: **"OR" combines by addition, "AND"
combines by multiplication.**

- "Choose A *AND* choose B" — multiply.
- "Choose A *OR* B happens" — add.

Trees are diagrams that combine both: each node has children that
get **added** (each is an alternative continuation), and the depth
itself imposes **multiplication** (each level happens after the
previous).

## Computational

A tree as a Python data structure:

```python
# Each node is a dict with a label and a list of children.
# A leaf has children == [].

tree = {
    "label": "start",
    "children": [
        {"label": "country=US", "children": [
            {"label": "plan=basic", "children": []},
            {"label": "plan=pro", "children": []},
            {"label": "plan=enterprise", "children": []},
        ]},
        {"label": "country=DE", "children": [
            {"label": "plan=basic", "children": []},
            {"label": "plan=pro", "children": []},
            {"label": "plan=enterprise", "children": []},
        ]},
        {"label": "country=UK", "children": [
            {"label": "plan=basic", "children": []},   # UK restriction
        ]},
    ]
}

def leaf_count(node):
    if not node["children"]:
        return 1
    return sum(leaf_count(child) for child in node["children"])

print(leaf_count(tree))   # 7
```

That recursion is the formal version of the principle: a node's
leaf count is the **sum** of its children's leaf counts. Leaves
return $1$ as the base case.

A more interesting example — counting paths in a grid where you can
only move **right** or **down**:

```python
def count_paths(rows, cols):
    """Number of right/down lattice paths from top-left to bottom-right."""
    if rows == 0 or cols == 0:
        return 1
    return count_paths(rows - 1, cols) + count_paths(rows, cols - 1)

print(count_paths(2, 2))   # 6
print(count_paths(3, 3))   # 20
print(count_paths(4, 4))   # 70
```

Each call says "you got here by coming from above OR from the left;
add the counts." Lesson 03 will reveal that these counts are
**binomial coefficients** in disguise — the same numbers Pascal's
triangle (Lesson 04) is built on.

## Derivational

*Why* does the tree's leaf count equal the multiplication-principle
product when stages are independent?

Because the tree is **balanced**: every node at level $i$ has
exactly $n_i$ children. So:

- Level $0$: 1 node (the root).
- Level $1$: $n_1$ nodes.
- Level $2$: $n_1 \cdot n_2$ nodes.
- ...
- Level $k$: $n_1 \cdot n_2 \cdot \ldots \cdot n_k$ nodes.

The leaves are at level $k$, so leaf count $= \prod n_i$. ✓

When the tree is **unbalanced** (different parents have different
numbers of children), this regular pattern breaks, but the
sum-of-subtrees recursion still works.

A neat consequence: any counting problem that can be drawn as a tree
can be solved by traversing the tree. **Counting becomes tree
traversal**, which becomes recursion, which becomes (often) dynamic
programming. This is one of the reasons combinatorics maps so
cleanly to algorithms.

## Connective

Trees are everywhere in CS:

- **Decision trees** in ML: each internal node tests a feature; each
  leaf assigns a class. Path counts and depth-vs-breadth analyses
  use exactly these tools.
- **Search trees** (BST, B-tree, trie): counting tree size, node
  count, leaf count are foundational operations.
- **File-system hierarchies**: counting files, computing sizes — all
  recursive sums on a tree.
- **Game-tree search** in board games: chess engines explore trees
  whose leaf count grows like $b^d$ where $b$ is branching factor
  and $d$ is depth. The multiplication principle dictates the
  search-space size.
- **Parser ASTs**: every program parsed by a compiler becomes an
  abstract syntax tree. Compiler optimisation is largely tree
  manipulation.

In probability:

- **Probability trees** (Strand 6 Lesson 07): each branch labelled
  with a probability. Leaf probability = product along the path.
  Marginal probability = sum over relevant leaves.

## Applied

- **Decision analysis**: a startup decides whether to launch in
  market A. Tree: launch (succeed / fail) vs don't launch
  (competitor moves / doesn't). Each leaf has a value and a
  probability; expected value = $\sum P(\text{leaf}) \cdot
  V(\text{leaf})$ — Strand 6 Lesson 08.
- **Quest dialogue branches** in games: a typical RPG quest tree
  has ~$50$–$100$ leaves (different endings/states). Designing
  this tree carefully avoids dead ends and inconsistencies.
- **Configuration spaces**: a build system with $3$ OSes × $4$
  compilers × $5$ optimisation levels produces $60$ build
  configurations. CI systems track this count when deciding
  test coverage.
- **DNS lookups**: hostname `mail.example.com` is a path through
  the DNS tree. Counts of subdomains under a registrar are leaf
  counts in the global DNS tree.
- **Sports brackets**: a $32$-team single-elimination bracket has
  $31$ leaves. The tree's height ($\log_2 32 = 5$) is the number
  of rounds needed.

## Check Your Understanding

:::widget type=numeric-input prompt="A coin is flipped 3 times in sequence. How many leaves does the full tree have?" answer=8 explain="$2 \\cdot 2 \\cdot 2 = 2^3 = 8$. Three independent stages, two outcomes each.":::

:::widget type=numeric-input prompt="A user signs up — pick country (US or UK), then plan. US offers $3$ plans; UK offers only $1$ plan. Total sign-up paths?" answer=4 explain="$3$ (US) + $1$ (UK) = $4$. Branches at root are summed; depths are multiplied (here $1$ depth on each branch).":::

:::widget type=numeric-input prompt="In a grid where you can move right or down, how many lattice paths from $(0,0)$ to $(2,2)$?" answer=6 explain="$\\binom{4}{2} = 6$. The 6 paths: RRDD, RDRD, RDDR, DRRD, DRDR, DDRR. Lesson 03 will derive the formula.":::

:::widget type=numeric-input prompt="A binary tree of depth $4$ (root at depth 0, leaves at depth 4) has how many leaves at most?" answer=16 explain="$2^4 = 16$. A perfect binary tree doubles the node count at each level.":::
