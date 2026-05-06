---
strand: computation
level: master
order: 1
title: GPU Programming
prerequisites:
  - tier: strand-7-computation-master
    slug: 00-parallel-computing
    description: Parallel computing
connections:
  - strand-7-computation-master/02-quantum-algorithms
applications:
  - cs: "Deep learning, scientific computing, graphics, crypto mining"
  - life: "Massively parallel computation on specialised hardware"
---

# GPU Programming

## Explain Like I Am 7

A normal computer is one really clever cook with eight hot plates.  A
**GPU** is a hall full of *thousands* of less clever cooks, all
following the *same* recipe at the *same* time on different
ingredients.  If your job is "fry one egg perfectly," the clever cook
wins.  If your job is "fry ten thousand eggs," the egg army wins by
miles — every cook fries one egg in lockstep.  That's why painting
pictures on a screen and training neural networks both love GPUs:
both are mountains of identical little chores.

## Mental

A **GPU** has **thousands of cores** organised into:

- **Streaming multiprocessors (SMs)**: each runs a *warp* of threads
  in lockstep (SIMT model).
- **Memory hierarchy**:
  - **Registers** (per-thread, fastest).
  - **Shared memory** (per-block, ~100 KB).
  - **Global memory** (per-device, slow but big).
- **Threads** organised hierarchically: thread → block → grid.

Programming model: launch a *kernel* — a function executed on each
of millions of threads.

## CUDA / SYCL / Triton

- **CUDA** — NVIDIA's proprietary; mature ecosystem (cuDNN, cuBLAS).
- **HIP** — AMD's CUDA equivalent.
- **Vulkan / Metal compute** — cross-vendor low-level.
- **Triton** (OpenAI 2021): high-level Python DSL for GPU kernels;
  used inside FlashAttention.
- **JAX `pmap`, PyTorch `cuda.amp`** — high-level abstractions.

## Worked example: matrix multiply

Naive $C = A \times B$ for $A: M \times K$, $B: K \times N$:

```cuda
__global__ void matmul(float *A, float *B, float *C, int M, int N, int K) {
    int i = blockIdx.y * blockDim.y + threadIdx.y;
    int j = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < M && j < N) {
        float sum = 0;
        for (int k = 0; k < K; k++)
            sum += A[i * K + k] * B[k * N + j];
        C[i * N + j] = sum;
    }
}
```

**Tiled** version: load tiles into shared memory, reuse across
threads — $\sim 10\times$ speedup. cuBLAS uses sophisticated
tilings.

## Roofline model

For each kernel:

- **Arithmetic intensity** $I = $ (FLOPs) / (bytes accessed).
- **Performance ceiling** = $\min(\text{peak FLOPs}, I \cdot \text{peak bandwidth})$.

If $I$ small: **memory-bound**. If $I$ large: **compute-bound**.

Modern transformer attention: $O(n^2)$ memory accesses, $O(n^2)$
FLOPs — memory-bound on long sequences. **FlashAttention**
reorganises to be compute-bound.

## Interactive

:::widget type=numeric-input prompt="GPU has thousands of cores organised into SMs. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="CUDA programming model: launch kernels. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Tiled matmul reuses data via shared memory. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="FlashAttention reduces memory traffic. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Tensor cores**: specialised matrix-multiply hardware in NVIDIA
GPUs since Volta; bfloat16, FP16, INT8.

**Mixed precision**: FP32 master + FP16 forward to fit larger
models / faster compute.

**Pipeline parallelism**: split a deep model across GPUs by layers.
**Tensor parallelism**: split each matmul.
**Data parallelism**: same model, different data on each GPU.
Modern training combines all three (3D parallelism).

**Communication primitives**: AllReduce (sum across GPUs), AllGather,
ReduceScatter. NCCL implements these efficiently.

## Computational

```python
# GPU programming via CuPy / PyTorch (high-level)
import numpy as np

# Pure NumPy matmul
A = np.random.randn(1000, 1000).astype(np.float32)
B = np.random.randn(1000, 1000).astype(np.float32)

import time
t0 = time.time()
for _ in range(10):
    C = A @ B
print(f"NumPy CPU: {(time.time() - t0)/10:.3f}s")

# PyTorch on GPU (if available)
try:
    import torch
    if torch.cuda.is_available():
        A_gpu = torch.from_numpy(A).cuda()
        B_gpu = torch.from_numpy(B).cuda()
        torch.cuda.synchronize()
        t0 = time.time()
        for _ in range(10):
            C_gpu = A_gpu @ B_gpu
        torch.cuda.synchronize()
        print(f"PyTorch GPU: {(time.time() - t0)/10:.3f}s")
        # Speedup typically 10x-100x
except ImportError:
    print("PyTorch not installed")

# Roofline analysis: arithmetic intensity
# Matmul: FLOPs = 2 * M * N * K, bytes accessed = (M*K + K*N + M*N) * 4
M, N, K = 1000, 1000, 1000
flops = 2 * M * N * K
bytes_accessed = (M*K + K*N + M*N) * 4
intensity = flops / bytes_accessed
print(f"Arithmetic intensity: {intensity:.2f} FLOP/byte")
```

## Applied

- **Deep learning training** — every modern foundation model trained
  on GPU clusters. H100, A100 series; TPU v5 alternatives.
- **Computer graphics** — rasterisation pipelines, ray tracing.
- **Scientific computing** — PDE solvers, molecular dynamics, climate
  simulation.
- **Cryptocurrency mining** — Bitcoin uses ASICs but smaller chains
  ran on GPUs.
- **Bioinformatics** — sequence alignment, structure prediction
  (AlphaFold).
- **Quantum simulation** — emulate small quantum circuits on GPU
  clusters.

## Check Your Understanding

:::widget type=numeric-input prompt="GPU SIMT: warps of threads in lockstep. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Tiled matmul uses shared memory for reuse. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="FlashAttention: IO-aware attention. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="3D parallelism: data + tensor + pipeline. Type 1." answer=1 explain="Yes.":::
