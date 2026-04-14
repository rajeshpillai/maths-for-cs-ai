# Context-Free Grammars

## Intuition

Regular languages (DFAs) cannot count: they cannot match nested parentheses
or balanced brackets. **Context-free grammars (CFGs)** add this power by
allowing rules that recurse. Every programming language's syntax is defined
by a CFG — when your compiler reports a "syntax error," it means your code
does not fit the grammar. Parse trees show *how* a string was derived, and
ambiguity in grammars is a real problem that language designers must resolve.

## Prerequisites

- **Tier 13, Lesson 12** — DFA, NFA, regular languages

## From First Principles

### Definition

A CFG is a 4-tuple $G = (V, \Sigma, R, S)$:

- $V$: finite set of **variables** (non-terminals)
- $\Sigma$: finite set of **terminals** (the actual symbols)
- $R$: finite set of **production rules** $A \to \alpha$ where $A \in V$ and
  $\alpha \in (V \cup \Sigma)^*$
- $S \in V$: the **start variable**

### Derivation

A **derivation** replaces variables with the right side of their rules until
only terminals remain.

**Example:** Grammar for balanced parentheses:

$$S \to SS \mid (S) \mid \epsilon$$

Derive "(())":

$$S \Rightarrow (S) \Rightarrow ((S)) \Rightarrow (())$$

Derive "()(())":

$$S \Rightarrow SS \Rightarrow (S)S \Rightarrow ()S \Rightarrow ()(S) \Rightarrow ()((S)) \Rightarrow ()(())$$

### Parse Trees

A **parse tree** shows the hierarchical structure of a derivation:

- Root is $S$.
- Internal nodes are variables.
- Leaves (read left to right) form the derived string.

For "(())" derived as $S \Rightarrow (S) \Rightarrow ((S)) \Rightarrow (())$:

```
    S
   /|\
  ( S )
   /|\
  ( S )
    |
    ε
```

### Ambiguity

A grammar is **ambiguous** if some string has two different parse trees.

**Classic example:** Expression grammar:

$$E \to E + E \mid E \times E \mid (E) \mid n$$

The string "$2 + 3 \times 4$" has two parse trees:
1. $(2 + 3) \times 4 = 20$ (+ first)
2. $2 + (3 \times 4) = 14$ (* first)

**Fix:** Introduce precedence via multiple variables:

$$E \to E + T \mid T$$
$$T \to T \times F \mid F$$
$$F \to (E) \mid n$$

Now "$2 + 3 \times 4$" has only one parse tree, giving 14. Multiplication
binds tighter because $T$ (term) is "lower" in the hierarchy.

### Chomsky Normal Form (CNF)

Every CFG can be converted to CNF where every rule is either:
- $A \to BC$ (two variables)
- $A \to a$ (one terminal)
- $S \to \epsilon$ (only if $\epsilon \in L$)

CNF is the input format for the CYK parsing algorithm ($O(n^3)$).

### Visualisation

```python
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

fig, axes = plt.subplots(1, 2, figsize=(14, 6))

# Left: Parse tree for "(())"
ax = axes[0]
ax.set_title('Parse Tree for "(())"', fontsize=12)

nodes = {
    'S0': (2, 4), '(0': (0.5, 3), 'S1': (2, 3), ')0': (3.5, 3),
    '(1': (1, 2), 'S2': (2, 2), ')1': (3, 2), 'eps': (2, 1)
}
labels = {'S0':'S', '(0':'(', 'S1':'S', ')0':')', '(1':'(', 'S2':'S', ')1':')', 'eps':'e'}
tree_edges = [('S0','(0'),('S0','S1'),('S0',')0'),('S1','(1'),('S1','S2'),('S1',')1'),('S2','eps')]

for u, v in tree_edges:
    ax.plot([nodes[u][0], nodes[v][0]], [nodes[u][1], nodes[v][1]], 'k-', lw=1.2)
for name, (x, y) in nodes.items():
    is_var = labels[name] in ('S', 'E', 'T', 'F')
    color = 'lightyellow' if is_var else 'lightblue'
    ax.plot(x, y, 'o', color=color, markersize=25, markeredgecolor='black', zorder=5)
    ax.text(x, y, labels[name], ha='center', va='center', fontsize=12, fontweight='bold', zorder=6)
ax.set_xlim(-0.5, 4.5); ax.set_ylim(0.3, 4.7); ax.axis('off')

# Right: Ambiguous parse trees for "2+3*4"
ax = axes[1]
ax.set_title('Ambiguity: Two Parse Trees for "2+3*4"', fontsize=11)

# Tree 1 (left): (2+3)*4
t1 = {
    'E': (1, 4), 'E1': (0.5, 3), '*': (1, 3), 'E2': (1.5, 3),
    'E3': (0, 2), '+': (0.5, 2), 'E4': (1, 2), '4': (1.5, 2),
    '2': (0, 1), '3': (1, 1)
}
t1_labels = {'E':'E', 'E1':'E', '*':'*', 'E2':'E', 'E3':'E', '+':'+', 'E4':'E', '4':'4', '2':'2', '3':'3'}
t1_edges = [('E','E1'),('E','*'),('E','E2'),('E1','E3'),('E1','+'),('E1','E4'),('E2','4'),('E3','2'),('E4','3')]

for u, v in t1_edges:
    ax.plot([t1[u][0], t1[v][0]], [t1[u][1], t1[v][1]], 'b-', lw=1, alpha=0.7)
for name, (x, y) in t1.items():
    is_var = t1_labels[name] == 'E'
    c = 'lightyellow' if is_var else 'lightblue'
    ax.plot(x, y, 'o', color=c, markersize=18, markeredgecolor='blue', zorder=5, alpha=0.8)
    ax.text(x, y, t1_labels[name], ha='center', va='center', fontsize=10, zorder=6)
ax.text(0.75, 0.3, "= (2+3)*4 = 20", ha='center', fontsize=10, color='blue')

# Tree 2 (right): 2+(3*4)
offset = 3
t2 = {k: (v[0]+offset, v[1]) for k, v in {
    'E': (1, 4), 'E1': (0.5, 3), '+2': (1, 3), 'E2': (1.5, 3),
    '2b': (0.5, 2), 'E3': (1, 2), '*2': (1.5, 2), 'E4': (2, 2),
    '3b': (1, 1), '4b': (2, 1)
}.items()}
t2_labels = {'E':'E', 'E1':'E', '+2':'+', 'E2':'E', '2b':'2', 'E3':'E', '*2':'*', 'E4':'E', '3b':'3', '4b':'4'}
t2_edges = [('E','E1'),('E','+2'),('E','E2'),('E1','2b'),('E2','E3'),('E2','*2'),('E2','E4'),('E3','3b'),('E4','4b')]

for u, v in t2_edges:
    ax.plot([t2[u][0], t2[v][0]], [t2[u][1], t2[v][1]], 'r-', lw=1, alpha=0.7)
for name, (x, y) in t2.items():
    is_var = t2_labels[name] == 'E'
    c = 'lightyellow' if is_var else 'mistyrose'
    ax.plot(x, y, 'o', color=c, markersize=18, markeredgecolor='red', zorder=5, alpha=0.8)
    ax.text(x, y, t2_labels[name], ha='center', va='center', fontsize=10, zorder=6)
ax.text(offset+0.75, 0.3, "= 2+(3*4) = 14", ha='center', fontsize=10, color='red')

ax.set_xlim(-0.7, 5.5); ax.set_ylim(-0.2, 4.7); ax.axis('off')

plt.tight_layout()
plt.savefig("parse_trees.png", dpi=100)
plt.show()
```

## Python Verification

```python
# ── CFG parser and derivation ────────────────────────────

# Step 1: CYK algorithm for CFG in Chomsky Normal Form
def cyk_parse(grammar, start, string):
    """CYK parsing algorithm. Grammar: dict of variable -> list of productions.
    Each production is a tuple: ('A', 'B') for A->BC or ('a',) for A->a."""
    n = len(string)
    if n == 0:
        return start in grammar and ('',) in grammar[start]

    # table[i][j] = set of variables that derive string[i:j+1]
    table = [[set() for _ in range(n)] for _ in range(n)]

    # Base case: single characters
    for i, ch in enumerate(string):
        for var, prods in grammar.items():
            for prod in prods:
                if len(prod) == 1 and prod[0] == ch:
                    table[i][i].add(var)

    # Fill table for substrings of increasing length
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            for k in range(i, j):
                for var, prods in grammar.items():
                    for prod in prods:
                        if len(prod) == 2:
                            B, C = prod
                            if B in table[i][k] and C in table[k+1][j]:
                                table[i][j].add(var)

    return start in table[0][n-1]

# Balanced parentheses in CNF:
# S -> LR | SS | LS'
# S' -> SR
# L -> (
# R -> )
grammar = {
    'S':  [('L','R'), ('S','S'), ('L','X')],
    'X':  [('S','R')],
    'L':  [('(',)],
    'R':  [(')',)],
}

test_strings = ['()', '(())', '()()', '((()))', '(', '())', '(()', '']
print("CYK Parser: Balanced Parentheses")
for s in test_strings:
    result = cyk_parse(grammar, 'S', s)
    print(f"  '{s}' -> {'accepted' if result else 'rejected'}")

# Step 2: Simple recursive descent parser for expressions
# E -> E + T | T, T -> T * F | F, F -> (E) | number
def parse_expr(tokens, pos=0):
    """Recursive descent parser for arithmetic expressions."""
    val, pos = parse_term(tokens, pos)
    while pos < len(tokens) and tokens[pos] == '+':
        pos += 1  # skip '+'
        right, pos = parse_term(tokens, pos)
        val += right
    return val, pos

def parse_term(tokens, pos):
    val, pos = parse_factor(tokens, pos)
    while pos < len(tokens) and tokens[pos] == '*':
        pos += 1
        right, pos = parse_factor(tokens, pos)
        val *= right
    return val, pos

def parse_factor(tokens, pos):
    if tokens[pos] == '(':
        val, pos = parse_expr(tokens, pos + 1)
        assert tokens[pos] == ')', "Expected )"
        return val, pos + 1
    else:
        return int(tokens[pos]), pos + 1

# Tokenise and parse
import re
def tokenise(expr):
    return re.findall(r'\d+|[+*()]', expr)

print("\nRecursive Descent Parser (correct precedence):")
for expr in ['2+3*4', '(2+3)*4', '1+2+3', '2*3+4*5']:
    tokens = tokenise(expr)
    result, _ = parse_expr(tokens)
    expected = eval(expr)
    print(f"  {expr} = {result}  (Python eval: {expected})")
```

## Connection to CS / Games / AI

- **Compilers:** Every programming language is defined by a CFG. Parsers
  (LL, LR, recursive descent) turn source code into abstract syntax trees.
- **Natural language processing:** Sentence structure is modelled by CFGs —
  probabilistic CFGs (PCFGs) power many NLP parsers.
- **Game scripting:** Dialogue trees and quest logic often use grammar-like
  rule systems for branching narratives.
- **AI:** Large language models implicitly learn grammatical structure;
  constrained decoding uses CFGs to force valid output (e.g., valid JSON).

## Check Your Understanding

1. Write a CFG for the language $\{a^n b^n \mid n \ge 1\}$. Derive "aaabbb"
   showing each step.
2. Is the grammar $S \to aSb \mid ab$ ambiguous? Prove your answer.
3. Convert the grammar $S \to AB$, $A \to aA \mid a$, $B \to bB \mid b$
   into Chomsky Normal Form.
