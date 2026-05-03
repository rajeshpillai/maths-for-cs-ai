---
strand: computation
level: foundation
order: 6
title: Hash Functions and Hash Tables
prerequisites:
  - tier: strand-7-computation-foundation
    slug: 05-recursion-foundations
    description: Recursion
connections:
  - strand-7-computation-foundation/07-newton-method
applications:
  - cs: "Dictionaries, sets, caches, content-addressable storage, blockchain"
  - life: "How to look something up by name in O(1)"
---

# Hash Functions and Hash Tables

## Mental

A **hash function** $h : \text{Keys} \to \{0, 1, \ldots, m-1\}$ maps
arbitrary input keys to a small range of integers. Good hash
functions:

1. **Spread keys evenly** across the range.
2. **Are fast** to compute.
3. **Behave randomly enough**: small input changes give big output
   changes.

A **hash table** uses $h(\text{key})$ as a table index. Looking up
"Alice" in a phonebook becomes "compute $h(\text{Alice}) = 7$, look in
slot 7." That's $O(1)$ — independent of table size.

## Worked example: simple hash

For a string $s = s_0 s_1 \ldots s_{n-1}$:

$$
h(s) = \left( \sum_i s_i \cdot 31^i \right) \bmod m.
$$

(This is the Java `String.hashCode()` formula, with $31$ chosen
because it's prime and lets the compiler use shifts: $31x = 32x - x$.)

For $m = 100$ and $s = $ `"cat"` ($s_0 = 99, s_1 = 97, s_2 = 116$):

$h = (99 + 97 \cdot 31 + 116 \cdot 31^2) \bmod 100$
$= (99 + 3007 + 111476) \bmod 100$
$= 114582 \bmod 100 = 82$.

So `"cat"` lives in slot $82$.

## Collisions

By **pigeonhole**: if $|\text{Keys}| > m$, two keys must collide.
Real hash tables handle collisions by:

- **Chaining** — each slot holds a list of all keys hashing there.
- **Open addressing** — probe alternate slots ($h+1, h+2, \ldots$)
  when one is full.

A well-tuned hash table keeps the **load factor** $n/m$ below 0.7
or so; both schemes give *expected* $O(1)$ lookup.

## Birthday paradox

In a table of $m = 365$ slots, you only need $\sqrt{m} \approx 23$
random keys for the probability of a collision to exceed 50%.

Hashing-based attacks (HashDoS) deliberately collide many keys to
slow a service to a crawl.

## Interactive

:::widget type=numeric-input prompt="Hash table average lookup: $O(?)$. Type 1 for constant, 2 for linear." answer=1 explain="$O(1)$ on average.":::

:::widget type=numeric-input prompt="Worst-case hash-table lookup with all collisions: $O(?)$. Type 1 for constant, 2 for linear ($n$)." answer=2 explain="$O(n)$ in the worst case (all keys collide).":::

:::widget type=numeric-input prompt="Birthday paradox: how many random keys before collision likelihood exceeds 50%, with $m = 365$ slots? Approximately $\\sqrt{m} \\approx ?$" answer=23 explain="$\\sim 23$.":::

:::widget type=numeric-input prompt="Load factor of hash table = $n/m$ where $n$ = keys, $m$ = slots. For $n = 70, m = 100$, load factor?" answer=0.7 explain="$0.7$.":::

## Symbolic

**Cryptographic hash functions** (SHA-256, SHA-3, Blake3) add
properties:

- **Preimage resistance**: given $h(x)$, it's hard to find $x$.
- **Second-preimage resistance**: given $x$, hard to find $x' \ne x$
  with $h(x) = h(x')$.
- **Collision resistance**: hard to find any $x \ne x'$ with
  $h(x) = h(x')$.

Used for: digital signatures, blockchain, file integrity, password
storage (with salt).

**Universal hashing**: parametric family $\{h_a\}_{a \in A}$ such
that for any two distinct keys, the chance of collision over random
$a$ is $\le 1/m$. Removes the worst-case adversarial attack.

## Computational

```python
# Toy string hash — Java style
def java_hash(s, m):
    h = 0
    for c in s:
        h = (h * 31 + ord(c)) % m
    return h

print(java_hash("cat", 100))           # 13 (depends on iteration order)
print(java_hash("apple", 100))

# Build a hash-table from scratch (chaining)
class HashTable:
    def __init__(self, size=16):
        self.size = size
        self.table = [[] for _ in range(size)]

    def put(self, key, value):
        h = hash(key) % self.size
        for i, (k, v) in enumerate(self.table[h]):
            if k == key:
                self.table[h][i] = (key, value)
                return
        self.table[h].append((key, value))

    def get(self, key):
        h = hash(key) % self.size
        for k, v in self.table[h]:
            if k == key: return v
        raise KeyError(key)

t = HashTable()
t.put("alice", 30)
t.put("bob", 25)
print(t.get("alice"))                  # 30

# Cryptographic hash via hashlib
import hashlib
print(hashlib.sha256(b"hello").hexdigest()[:16])   # 2cf24dba5fb0a30e
```

## Applied

- **Dictionaries / sets** in Python, JavaScript, Java, C++ — all
  hash-table-backed.
- **Content-addressable storage** — git stores every blob keyed by
  its SHA-1 hash; same content ⇒ same address.
- **Blockchain** — Bitcoin's proof-of-work involves repeatedly
  hashing block headers and looking for a hash with leading zeros.
- **Bloom filters** — probabilistic set membership using multiple
  hash functions; used in CDNs, web caches, BigTable.
- **Caches** — memcached and Redis use hashing for distributed
  storage; consistent hashing handles node addition/removal.

## Check Your Understanding

:::widget type=numeric-input prompt="A hash function maps arbitrary input to a fixed-size output. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="SHA-256 outputs how many bits?" answer=256 explain="$256$.":::

:::widget type=numeric-input prompt="Two different inputs producing the same hash output: a *collision*. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hash-table average insertion time: $O(?)$. Type 1." answer=1 explain="$O(1)$ on average.":::
