---
strand: computation
level: foundation
order: 4
title: Sorting and Searching
prerequisites:
  - tier: strand-7-computation-foundation
    slug: 03-big-o-intuition
    description: Big-O notation
connections:
  - strand-7-computation-foundation/05-recursion-foundations
applications:
  - cs: "Database queries, file systems, search engines"
  - life: "Putting things in order so you can find them"
---

# Sorting and Searching

## Mental

Sorting takes a list and returns it in non-decreasing order. Searching
locates an item in a list. The two are deeply linked: a sorted list
admits a much faster search than an unsorted one.

## Two simple sorts

**Bubble sort** — repeatedly swap adjacent out-of-order pairs.

```
for i = 0 to n - 1:
  for j = 0 to n - 2 - i:
    if L[j] > L[j+1]:
      swap L[j], L[j+1]
```

Time: $O(n^2)$ — clear from the nested loops.

**Insertion sort** — like sorting cards in your hand: pick the next
card and slide it into the correct position among already-sorted cards.

```
for i = 1 to n - 1:
  key = L[i]
  j = i - 1
  while j >= 0 and L[j] > key:
    L[j+1] = L[j]
    j -= 1
  L[j+1] = key
```

Also $O(n^2)$ worst case, but $O(n)$ on already-sorted input — fast
on small or nearly-sorted lists.

## Faster sorts (preview)

**Mergesort** and **quicksort** both run in $O(n \log n)$ on average
and use **divide and conquer** (Lesson 05 introduces recursion).

For a list of $n = 10^6$:

- $O(n^2) = 10^{12}$ operations — *minutes to hours*.
- $O(n \log n) \approx 2 \times 10^7$ operations — *milliseconds*.

This is why Python's built-in `sorted()` (Timsort) is $O(n \log n)$.

## Linear vs binary search

**Linear search** of an unsorted list: $O(n)$.

**Binary search** of a sorted list: $O(\log n)$.

```
def binary_search(L, target):
    lo, hi = 0, len(L) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if L[mid] == target: return mid
        elif L[mid] < target: lo = mid + 1
        else: hi = mid - 1
    return -1
```

For $n = 10^9$:

- Linear: up to $10^9$ comparisons.
- Binary: $\log_2 10^9 \approx 30$ comparisons.

The cost of sorting once ($n \log n$) is repaid quickly if you
search many times.

## Interactive

:::widget type=numeric-input prompt="Bubble sort time complexity (worst case): $O(n^?)$" answer=2 explain="$n^2$.":::

:::widget type=numeric-input prompt="Mergesort time complexity: $O(n \\log n)$. Number of comparisons for $n = 8$ approximately: $8 \\cdot 3 = ?$" answer=24 explain="$24$ — order of magnitude.":::

:::widget type=numeric-input prompt="Binary search of $n = 1024$ sorted items: at most $\\log_2 1024 = ?$ comparisons." answer=10 explain="$10$.":::

:::widget type=numeric-input prompt="Sort once at $O(n \\log n)$, then binary-search $k$ times at $O(\\log n)$. For $n = k = 10^6$ this beats $k$ linear searches by what factor (rough estimate)? Linear: $kn = 10^{12}$. Sorted: $n \\log n + k \\log n \\approx 4 \\cdot 10^7$. Ratio $\\approx 25000$. Type 25000." answer=25000 explain="$\\sim 25\\,000\\times$ speedup.":::

## Symbolic

**Comparison sort lower bound**: any sort that only compares elements
needs $\Omega(n \log n)$ comparisons. Proof: $n!$ orderings to
distinguish; each comparison gives 1 bit; $\log_2(n!) = \Theta(n \log n)$.

So mergesort, quicksort, heapsort are *asymptotically optimal* for
comparison sorts.

**Non-comparison sorts** (counting sort, radix sort) can do $O(n)$
when the values are bounded integers — they exploit structure beyond
just comparisons.

**Stable sort**: equal elements retain relative order from input —
matters when sorting by multiple keys.

## Computational

```python
import time, random

def bubble_sort(L):
    L = L[:]
    n = len(L)
    for i in range(n):
        for j in range(n - 1 - i):
            if L[j] > L[j+1]:
                L[j], L[j+1] = L[j+1], L[j]
    return L

def binary_search(L, t):
    lo, hi = 0, len(L) - 1
    while lo <= hi:
        m = (lo + hi) // 2
        if L[m] == t: return m
        if L[m] < t: lo = m + 1
        else:        hi = m - 1
    return -1

# Time bubble sort vs Python's built-in
for n in (100, 1000, 5000):
    L = [random.random() for _ in range(n)]
    t0 = time.time(); bubble_sort(L);  tb = time.time() - t0
    t0 = time.time(); sorted(L);       ts = time.time() - t0
    print(f"n={n:>4}  bubble={tb:.4f}s  builtin={ts:.4f}s")

# Binary search demo
S = sorted(random.sample(range(10_000_000), 100_000))
print(binary_search(S, S[50_000]))     # 50000
```

## Applied

- **Database indexes** — B-trees give $O(\log n)$ lookup over
  billions of rows.
- **File systems** — ext4, NTFS, APFS all use sorted-tree directory
  structures for $O(\log n)$ filename lookup.
- **String search** — sorted suffix arrays + binary search find
  substrings in $O(m \log n)$ for length-$m$ pattern, length-$n$
  text.
- **Spell checkers** — sorted dictionaries with binary search.
- **Network routing tables** — longest-prefix-match using
  sorted/trie structures.

## Check Your Understanding

:::widget type=numeric-input prompt="Sorting 16 items with mergesort: $\\sim n \\log n = 16 \\cdot 4 = ?$" answer=64 explain="$64$ comparisons (rough).":::

:::widget type=numeric-input prompt="Binary search of 32 items: at most $\\log_2 32 = ?$ comparisons." answer=5 explain="$5$.":::

:::widget type=numeric-input prompt="Lower bound for comparison-based sorting: $\\Omega(n \\log n)$. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Python's `sorted()` is stable: equal elements keep order. Type 1." answer=1 explain="Yes — Timsort is stable.":::
