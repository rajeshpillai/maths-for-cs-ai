---
strand: computation
level: advanced
order: 6
title: Probabilistic Data Structures
prerequisites:
  - tier: strand-7-computation-advanced
    slug: 05-aes-and-symmetric
    description: AES
connections:
  - strand-7-computation-advanced/07-network-flow-advanced
applications:
  - cs: "Database query optimisers, big-data approximate analytics"
  - life: "Trade tiny error for huge memory savings"
---

# Probabilistic Data Structures

## Mental

For huge data, we can't always afford exact answers. **Probabilistic
data structures** give approximate answers with controlled error
probability, using *much* less memory.

## Bloom filter

Membership test: "is $x$ in set $S$?" Returns:

- **No** — definitely not.
- **Yes** — probably yes (small false-positive rate).

Structure: bit array of $m$ bits + $k$ hash functions. To insert
$x$: set bits at positions $h_1(x), \ldots, h_k(x)$. To query: check
if all $k$ bits are set.

**Optimal parameters** for capacity $n$ with target false-positive
rate $p$:

- $m = -n \log p / (\ln 2)^2$ bits.
- $k = (m/n) \ln 2$ hash functions.

Concretely: $n = 10^6, p = 1\%$ → $m \approx 10^7$ bits ≈ 1.2 MB.
Compare to a hash set storing the elements: way more.

## Count-Min sketch

Frequency estimation in a stream. Use $d$ rows × $w$ columns of
counters; for each item $x$, increment $\text{count}[i][h_i(x) \mod w]$
for $i = 1, \ldots, d$.

Estimate of $\text{freq}(x)$: $\min_i \text{count}[i][h_i(x) \mod w]$.

Bounds: $\text{est} - \text{true} \le \epsilon \cdot \text{total stream}$
with probability $\ge 1 - \delta$ when $w = e/\epsilon, d = \ln(1/\delta)$.

For $\epsilon = 0.001, \delta = 0.01$: $w = 2718, d = 5$ — very small
state for accurate frequency on streams of *billions* of items.

## HyperLogLog

Count distinct items in a stream. Maintain a small array of "leading-
zero counts" of hashed items.

Memory: $\sim 1.5$ KB for billions of items, error ~1.6%.

Used by Redis (`PFCOUNT`), Google BigQuery (`APPROX_COUNT_DISTINCT`),
Facebook Presto.

## Interactive

:::widget type=numeric-input prompt="Bloom filter false negatives: 0 (1) or possible (0)?" answer=0 explain="Zero false negatives — never says 'not in' when it is.":::

:::widget type=numeric-input prompt="Bloom filter false positives: possible (1) or impossible (0)?" answer=1 explain="Possible — small probability.":::

:::widget type=numeric-input prompt="HyperLogLog uses about 1.5 KB for billions of items. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Count-Min sketch uses min over $d$ hash buckets per item to bound overestimate. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Quotient filter / cuckoo filter** — alternative to Bloom that
supports deletion and has slightly better memory efficiency.

**MinHash / LSH (Locality-Sensitive Hashing)** — estimate Jaccard
similarity between sets. Used in document deduplication, plagiarism
detection.

**Count-distinct lower bound**: Alon-Matias-Szegedy showed any
streaming algorithm for exact count-distinct needs $\Omega(n)$
memory. So all practical "count distinct in streams" methods use
approximation.

## Computational

```python
import hashlib

class BloomFilter:
    def __init__(self, m, k):
        self.m = m
        self.k = k
        self.bits = bytearray((m + 7) // 8)

    def _hash(self, x, i):
        return int(hashlib.sha256(f"{i}-{x}".encode()).hexdigest(), 16) % self.m

    def add(self, x):
        for i in range(self.k):
            j = self._hash(x, i)
            self.bits[j // 8] |= (1 << (j % 8))

    def query(self, x):
        for i in range(self.k):
            j = self._hash(x, i)
            if not (self.bits[j // 8] & (1 << (j % 8))):
                return False
        return True

bf = BloomFilter(m=10000, k=5)
for i in range(1000): bf.add(f"item-{i}")
print(bf.query("item-500"))            # True
print(bf.query("item-9999"))           # likely False
print(bf.query("not-in-set"))          # likely False, possibly True

# Count-Min sketch
import math, random
class CountMinSketch:
    def __init__(self, eps=0.001, delta=0.01):
        self.w = int(math.ceil(math.e / eps))
        self.d = int(math.ceil(math.log(1 / delta)))
        self.table = [[0] * self.w for _ in range(self.d)]
        self.salts = [random.randint(0, 1<<30) for _ in range(self.d)]

    def _hash(self, x, i):
        return hash((self.salts[i], x)) % self.w

    def add(self, x, count=1):
        for i in range(self.d):
            self.table[i][self._hash(x, i)] += count

    def estimate(self, x):
        return min(self.table[i][self._hash(x, i)] for i in range(self.d))

cms = CountMinSketch()
items = ["a"] * 1000 + ["b"] * 100 + ["c"] * 10
for x in items: cms.add(x)
print(cms.estimate("a"), cms.estimate("b"), cms.estimate("c"))   # ~ true counts
```

## Applied

- **Database query optimisers** — Bloom filters skip irrelevant
  partitions in joins; HyperLogLog estimates GROUP BY cardinality
  for plan choice.
- **Web caching** — Bloom filters track "what's in the cache"
  efficiently.
- **Bitcoin SPV clients** — use Bloom filters to ask full nodes for
  relevant transactions without revealing exact addresses.
- **Spam / safe-browsing filters** — Google Safe Browsing uses
  Bloom-filter-like structures.
- **Distributed systems** — gossip protocols use approximate
  distinct counters to estimate cluster size.

## Check Your Understanding

:::widget type=numeric-input prompt="Bloom filter has zero false negatives. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="HyperLogLog estimates count-distinct using $\\sim 1.5$ KB. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Count-Min uses $\\min$ over hash buckets to bound overestimate. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Exact count-distinct in a stream needs $\\Omega(n)$ memory. Type 1." answer=1 explain="Yes.":::
