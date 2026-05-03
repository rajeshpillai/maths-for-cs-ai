---
strand: computation
level: intermediate
order: 4
title: Heaps and Priority Queues
prerequisites:
  - tier: strand-7-computation-intermediate
    slug: 03-minimum-spanning-trees
    description: Minimum spanning trees
connections:
  - strand-7-computation-intermediate/05-tries-and-string-algos
applications:
  - cs: "Dijkstra, Prim, scheduling, top-K queries, Huffman coding"
  - life: "When you always need the smallest (or largest) so far"
---

# Heaps and Priority Queues

## Mental

A **priority queue** stores elements with **priorities** and supports:

- **insert**(item, priority)
- **extract-min** (or extract-max)
- (sometimes) **decrease-key**

A **binary heap** is a complete binary tree where each parent is
$\le$ its children (min-heap). Stored as an array — children of
index $i$ are at $2i+1, 2i+2$; parent at $(i-1)/2$.

Operations on a binary heap:

- insert: $O(\log n)$
- extract-min: $O(\log n)$
- peek-min: $O(1)$

## Heapify — building from an array

Naive: $n$ inserts, each $O(\log n)$, total $O(n \log n)$.

**Floyd's heapify** (bottom-up sift-down): $O(n)$. Process nodes
in reverse, sifting each down. Most nodes are near leaves and don't
sift far; total work is bounded by a geometric sum.

## Heapsort

Build heap, then repeatedly extract-min. Total $O(n \log n)$, in-place.

```python
def heapsort(L):
    L = L[:]
    heapify(L)
    out = []
    while L:
        out.append(extract_min(L))
    return out
```

Worst-case $O(n \log n)$ — better worst case than quicksort's
$O(n^2)$. But quicksort wins in practice due to cache friendliness.

## Worked example

Build a min-heap from $[5, 3, 8, 1, 9, 2]$.

Heapify (bottom-up):

- Index 2 (value 8): children would be at 5, 6 — out of range. Skip.
- Index 1 (value 3): children at 3 (=1), 4 (=9). Min child=1. Swap → $[5, 1, 8, 3, 9, 2]$.
- Index 0 (value 5): children at 1 (=1), 2 (=8). Min child=1. Swap → $[1, 5, 8, 3, 9, 2]$. Sift 5 down: child at 3 (=3), swap → $[1, 3, 8, 5, 9, 2]$.

Final heap: $[1, 3, 2, 5, 9, 8]$ (after re-running properly).

extract_min returns 1, replaces root with last element (8), sifts
down → $[2, 3, 8, 5, 9]$. Next extract returns 2, etc.

## Interactive

:::widget type=numeric-input prompt="Heap insert: $O(\\log n)$. For $n = 1024$: at most $\\log_2 1024 = ?$ comparisons." answer=10 explain="$10$.":::

:::widget type=numeric-input prompt="Heapify $n$ elements: $O(?)$ — type 1 for $n$, 2 for $n \\log n$." answer=1 explain="$O(n)$.":::

:::widget type=numeric-input prompt="Heapsort time: $O(n \\log n)$. For $n = 100$: $\\sim 700$. Type 700." answer=700 tolerance=200 explain="$\\sim 700$.":::

:::widget type=numeric-input prompt="Min-heap stores parent $\\le$ children. Type 1 if true." answer=1 explain="Yes.":::

## Symbolic

**Other heap variants**:

- **Binomial heap**: meld two heaps in $O(\log n)$. Useful when
  merging is frequent.
- **Fibonacci heap**: $O(1)$ amortized insert and decrease-key,
  $O(\log n)$ extract-min. Improves Dijkstra theoretical bound.
  Rarely used in practice (high constants).
- **Pairing heap**: simple, fast in practice; theoretical analysis
  open for decades.
- **$d$-ary heap**: each node has $d$ children. Tunes the trade-off
  between insert and extract.

**Median maintenance**: keep two heaps (max-heap of lower half,
min-heap of upper half) of size $\le$ each other by 1. Median is
the heap-tops. Insert and extract-median in $O(\log n)$.

## Computational

```python
import heapq

# Python's heapq is a min-heap on a list
h = [5, 3, 8, 1, 9, 2]
heapq.heapify(h)            # O(n)
print(h)                     # [1, 3, 2, 5, 9, 8]

print(heapq.heappop(h))      # 1
print(heapq.heappop(h))      # 2

# Top-K largest in O(n log k)
def top_k(arr, k):
    return heapq.nlargest(k, arr)

print(top_k([5, 3, 8, 1, 9, 2, 7, 4, 6], 3))   # [9, 8, 7]

# Median of stream
class Median:
    def __init__(self):
        self.lo = []   # max-heap (negated)
        self.hi = []   # min-heap
    def add(self, x):
        heapq.heappush(self.lo, -x)
        heapq.heappush(self.hi, -heapq.heappop(self.lo))
        if len(self.hi) > len(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))
    def median(self):
        if len(self.lo) > len(self.hi):
            return -self.lo[0]
        return (-self.lo[0] + self.hi[0]) / 2

m = Median()
for x in [3, 1, 4, 1, 5, 9]: m.add(x)
print(m.median())    # 3.5
```

## Applied

- **Dijkstra & Prim** — both pull the lightest unfinished vertex/edge
  from a heap.
- **OS schedulers** — priority-based thread scheduling.
- **Event-driven simulation** — events sorted by timestamp in a heap.
- **Huffman coding** — repeatedly extract two lightest nodes, merge.
- **Top-K queries** in databases and search — maintain a heap of
  size $k$.
- **A\*** — open list is a priority queue keyed by $f$-score.

## Check Your Understanding

:::widget type=numeric-input prompt="Heap insert and extract-min are both $O(\\log n)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Heapify $n$ elements: $O(n)$ via bottom-up sift-down. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Top-K of $n$ elements with a heap of size $k$: $O(n \\log k)$. For $n = 10^6, k = 100$: $\\sim 7 \\cdot 10^6$. Type 1 if practical." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Heapsort worst case: $O(n \\log n)$. Type 1." answer=1 explain="Yes.":::
