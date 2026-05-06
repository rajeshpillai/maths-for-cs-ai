---
strand: computation
level: master
order: 0
title: Parallel and Distributed Computing
prerequisites:
  - tier: strand-7-computation-advanced
    slug: 09-computation-capstone-3
    description: Computation advanced capstone
connections:
  - strand-7-computation-master/01-gpu-programming
applications:
  - cs: "Modern data centres, multi-core, distributed systems"
  - life: "Scaling computation beyond a single core"
---

# Parallel and Distributed Computing

## Explain Like I Am 7

Imagine cleaning the school hall: one kid with one broom takes ages.
Hand brooms to twenty kids and the floor is shiny in a flash — *if*
they don't bump into each other and don't all crowd the same corner.
That's **parallel** work.  Now imagine half the kids are at *another*
school and have to phone over to share progress; the call adds delay,
and one kid's phone might break.  That's **distributed** work — same
idea, but the brooms talk over a wobbly walkie-talkie.

## Mental

**Parallel** = multiple cores in same machine, shared memory.
**Distributed** = multiple machines, communicating over network.

Models:

- **PRAM** (parallel random-access machine): theoretical model with
  simultaneous memory access.
- **BSP** (bulk-synchronous parallel): alternating compute /
  communication phases.
- **MapReduce** / Dataflow: massively parallel batch processing.
- **Actor model**: independent actors communicating via messages
  (Erlang, Akka).

## Amdahl's law

For a program with parallelisable fraction $p$ and serial $1 - p$,
max speedup with $N$ processors:

$$
S = \frac{1}{(1 - p) + p/N}.
$$

If $p = 0.95$: max speedup as $N \to \infty$ is $1/0.05 = 20$. A
**hard ceiling**.

**Gustafson's law**: more optimistic — assumes problem size grows
with $N$.

## Distributed-systems impossibilities

**FLP (Fischer-Lynch-Paterson)**: no deterministic asynchronous
consensus protocol can tolerate even one crash failure.

**CAP theorem** (Brewer): in a distributed system, you can have at
most two of:

- **Consistency**: all nodes see the same data.
- **Availability**: every request gets a response.
- **Partition tolerance**: system tolerates network splits.

**PACELC**: refines CAP — even without partitions, latency vs
consistency trade-off persists.

## Consensus algorithms

- **Paxos** (Lamport, 1989): consensus in asynchronous systems with
  crash failures, given a majority is alive.
- **Raft** (Ongaro-Ousterhout 2014): equivalent to Paxos but
  designed to be understandable; widely deployed (etcd, Consul,
  CockroachDB).
- **PBFT** (Practical Byzantine Fault Tolerance): tolerates
  malicious failures up to $\lfloor (n-1)/3 \rfloor$.

## Interactive

:::widget type=numeric-input prompt="Amdahl: $p = 0.9, N \\to \\infty$, max speedup $= ?$" answer=10 explain="$1/0.1 = 10$.":::

:::widget type=numeric-input prompt="CAP theorem: pick at most $?$ of (C, A, P)." answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="FLP: deterministic async consensus impossible with even one failure. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="PBFT tolerates $\\lfloor (n-1)/3 \\rfloor$ Byzantine failures. Type 1." answer=1 explain="Yes.":::

## Symbolic

**MapReduce** (Google 2004): map phase (parallel) + reduce phase
(parallel after shuffle). Programming model for embarrassingly
parallel batch jobs.

**Lambda architecture**: combine batch (slow, complete) and stream
(fast, approximate) processing layers.

**Vector clocks** (Lamport): order events in distributed systems
without global clock.

**CRDTs** (Conflict-free Replicated Data Types): commutative,
associative, idempotent operations enable replicas to merge without
conflicts.

## Computational

```python
import time
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

def expensive(x):
    s = 0
    for _ in range(10**6):
        s += (x * 0.001) ** 0.5
    return s

# Sequential
t0 = time.time()
results = [expensive(i) for i in range(20)]
print(f"Sequential: {time.time() - t0:.2f}s")

# Parallel via processes (workers in OS-level processes)
t0 = time.time()
with ProcessPoolExecutor(max_workers=4) as pool:
    results = list(pool.map(expensive, range(20)))
print(f"Parallel (4 procs): {time.time() - t0:.2f}s")

# Amdahl prediction
def amdahl_speedup(p, N):
    return 1 / ((1 - p) + p / N)

print("Theoretical speedup with 4 cores:")
for p in [0.5, 0.9, 0.99]:
    print(f"  p = {p}: {amdahl_speedup(p, 4):.2f}×")

# Map-reduce style: counting words
def word_count(documents):
    from functools import reduce
    pairs = [(word, 1) for doc in documents for word in doc.split()]
    pairs.sort(key=lambda x: x[0])
    counts = {}
    for w, c in pairs:
        counts[w] = counts.get(w, 0) + c
    return counts

print(word_count(["the cat sat", "the dog ran", "the cat ran"]))
```

## Applied

- **Big-data processing** — Spark, Hadoop, Flink for distributed
  analytics.
- **Cloud orchestration** — Kubernetes, etcd-based consensus.
- **Distributed databases** — Cassandra, Spanner, CockroachDB tackle
  CAP trade-offs differently.
- **Blockchain** — consensus algorithms (PoW, PoS, BFT).
- **Scientific computing** — MPI for HPC clusters; petascale
  simulations.
- **AI training** — distributed PyTorch, JAX `pmap`/`pjit` over GPU
  clusters.

## Check Your Understanding

:::widget type=numeric-input prompt="Amdahl ceiling: $1/(1 - p)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="CAP: choose 2 of consistency, availability, partition-tolerance. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Raft is consensus equivalent to Paxos. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="MapReduce was Google 2004. Type 1." answer=1 explain="Yes.":::
