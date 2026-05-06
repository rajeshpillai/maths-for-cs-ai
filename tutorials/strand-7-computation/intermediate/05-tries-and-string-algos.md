---
strand: computation
level: intermediate
order: 5
title: Tries and String Algorithms
prerequisites:
  - tier: strand-7-computation-intermediate
    slug: 04-heaps-and-priority-queues
    description: Heaps
connections:
  - strand-7-computation-intermediate/06-complexity-classes
applications:
  - cs: "Autocomplete, IP routing, spell-check, search index"
  - life: "Storing and matching text efficiently"
---

# Tries and String Algorithms

## Explain Like I Am 7

Imagine a giant tree of letters where each branch is one letter.  To
look up the word "cat," you start at the trunk, follow the branch
labelled *c*, then *a*, then *t*, and there it is at the leaf.  Words
that share a head — like "car," "cat," "carrot" — also share branches
near the trunk, which saves loads of room.  This letter-tree is a
**trie**, and it's how phone keyboards guess what you're about to type
after only two or three letters.

## Mental

A **trie** (prefix tree) stores a set of strings so that lookup,
insertion, and prefix queries take $O(L)$ — proportional only to the
*query length*, not to the number of stored strings.

Each edge is labelled with a character; a path from the root spells
a stored string (often marked at the terminal node).

## Trie operations

For an alphabet of size $\Sigma$:

| Op | Time | Space |
|---|---|---|
| insert(s) | $O(|s|)$ | $O(|s| \cdot \Sigma)$ added |
| search(s) | $O(|s|)$ | — |
| prefix-of(s) | $O(|s|)$ | — |
| autocomplete | $O(|s| + |\text{matches}|)$ | — |

**Compressed trie (radix tree / Patricia trie)** — collapse paths
of single-child nodes into a single edge labelled with the
substring. Saves space.

## Pattern matching: KMP

The **Knuth-Morris-Pratt** algorithm finds all occurrences of a
pattern $p$ of length $m$ in text $t$ of length $n$ in $O(n + m)$.

The trick: when a mismatch occurs, *don't restart from the next
character*. Use a precomputed "failure function" $\pi$ that tells
where to resume.

$\pi[i]$ = length of the longest proper prefix of $p[:i+1]$ that is
also a suffix.

## Worked example: KMP for $p = $ `"abab"`

$\pi = [0, 0, 1, 2]$:

- $\pi[0] = 0$ — no proper prefix.
- $\pi[1]$: $p[:2] = $ `"ab"` — no prefix-suffix match → 0.
- $\pi[2]$: $p[:3] = $ `"aba"` — prefix `"a"` = suffix `"a"` → 1.
- $\pi[3]$: $p[:4] = $ `"abab"` — prefix `"ab"` = suffix `"ab"` → 2.

When matching against text `"ababab"`, after first match at index 0,
next search resumes from $\pi[3] = 2$ — never re-checks earlier
characters of the text.

## Interactive

:::widget type=numeric-input prompt="Trie lookup of length-$L$ string: $O(?)$. Type 1 for $L$, 2 for $L^2$." answer=1 explain="$O(L)$.":::

:::widget type=numeric-input prompt="KMP time complexity: $O(n + m)$. For $n = 10^6, m = 100$: $\\sim 10^6$. Type 1 if linear in n." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Failure function $\\pi$ for `'aaa'`: $[0, 1, 2]$. Last entry?" answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="A trie storing $N$ strings of avg length $L$ over alphabet $\\Sigma$: space $\\sim N \\cdot L \\cdot \\Sigma$ in worst case. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Aho-Corasick automaton** — extends KMP to *multiple patterns*:
match all of $p_1, \ldots, p_k$ in text simultaneously, in
$O(n + \sum |p_i| + \text{matches})$. Used in virus scanners, IDS.

**Suffix array / suffix tree**: sort all suffixes of $t$. Then
substring search is binary search in $O(m \log n)$. Construction
$O(n)$ (Ukkonen, DC3, SA-IS). Used in genomics, full-text search.

**Z-array / Z-function**: for each $i$, length of the longest
substring starting at $i$ that matches a prefix of the string.
Computable in $O(n)$. Equivalent power to KMP for many tasks.

## Computational

```python
class Trie:
    def __init__(self):
        self.children = {}
        self.is_end = False

    def insert(self, s):
        node = self
        for c in s:
            if c not in node.children:
                node.children[c] = Trie()
            node = node.children[c]
        node.is_end = True

    def search(self, s):
        node = self
        for c in s:
            if c not in node.children: return False
            node = node.children[c]
        return node.is_end

    def starts_with(self, prefix):
        node = self
        for c in prefix:
            if c not in node.children: return False
            node = node.children[c]
        return True

t = Trie()
for word in ["cat", "car", "card", "dog"]:
    t.insert(word)
print(t.search("car"))         # True
print(t.search("ca"))          # False (not a complete word)
print(t.starts_with("ca"))     # True

# KMP failure function and search
def kmp_failure(p):
    pi = [0] * len(p)
    k = 0
    for i in range(1, len(p)):
        while k > 0 and p[k] != p[i]: k = pi[k-1]
        if p[k] == p[i]: k += 1
        pi[i] = k
    return pi

def kmp_search(t, p):
    pi = kmp_failure(p)
    k = 0
    for i, c in enumerate(t):
        while k > 0 and p[k] != c: k = pi[k-1]
        if p[k] == c: k += 1
        if k == len(p):
            yield i - len(p) + 1
            k = pi[k-1]

print(list(kmp_search("ababcabab", "abab")))   # [0, 5]
```

## Applied

- **Autocomplete** in search bars — trie of past queries; weighted
  variants (predicted by frequency) are used at scale.
- **IP routing tables** — longest-prefix match implemented as a
  Patricia trie (radix tree); kernel networking stacks use this.
- **Genomic sequence alignment** — suffix arrays/trees over
  reference genomes for fast substring lookup.
- **Anti-virus and intrusion detection** — Aho-Corasick scans data
  streams for thousands of known patterns simultaneously.
- **Spell-check** — trie of dictionary + edit-distance traversal.

## Check Your Understanding

:::widget type=numeric-input prompt="Trie lookup is $O(L)$, independent of $N$ (number of stored strings). Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="KMP finds all matches in $O(n + m)$ time. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Aho-Corasick generalises KMP to multiple patterns. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Patricia tries are *compressed* tries. Type 1." answer=1 explain="Yes.":::
