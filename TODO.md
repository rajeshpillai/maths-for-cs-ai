# TODO — Maths for CS

## Project Setup

- [x] Create project directory structure (frontend, backend, tutorials)
- [x] Scaffold SolidJS + TypeScript + Vite frontend
- [x] Scaffold FastAPI backend with tier/lesson API endpoints
- [x] Create tutorial folder structure (tier-0 through tier-10)
- [x] Switch backend to uv package management
- [x] Write .gitignore
- [x] Create project README
- [x] Verify frontend and backend run

## Frontend — Web App

- [x] Set up routing (home, tier list, lesson view)
- [x] Create sidebar navigation with tier/lesson tree
- [x] Markdown renderer with LaTeX/KaTeX support
- [x] Syntax-highlighted Python code blocks
- [x] In-browser Python runner (Pyodide) for verification code
- [ ] Progress tracking (mark lessons as complete)
- [ ] Responsive layout / mobile-friendly
- [ ] Dark/light theme toggle

## Backend — API

- [x] GET /api/tiers — list all tiers and lessons
- [x] GET /api/tiers/{tier}/{slug} — return lesson markdown
- [ ] GET /api/tiers/{tier}/{slug}/meta — lesson metadata (title, prereqs)
- [ ] POST /api/progress — save lesson completion status
- [ ] POST /api/run — server-side Python code execution (optional)

## Tutorials — Content

### Tier 0 — Number Systems & Arithmetic
- [x] 01 — Number systems (N, Z, Q, R, C)
- [ ] 02 — Number bases: binary, hex
- [ ] 03 — Floating-point representation (IEEE 754)
- [ ] 04 — Modular arithmetic & clock arithmetic
- [ ] 05 — Prime numbers, GCD, LCM (Euclidean algorithm)

### Tier 1 — Discrete Mathematics
- [ ] 01 — Logic: propositions, truth tables, Boolean algebra
- [ ] 02 — Set theory: unions, intersections, power sets, Cartesian products
- [ ] 03 — Relations and functions (injective, surjective, bijective)
- [ ] 04 — Combinatorics: permutations, combinations, pigeonhole principle
- [ ] 05 — Graph theory basics: vertices, edges, paths, trees
- [ ] 06 — Proof techniques: induction, contradiction, contrapositive

### Tier 2 — Linear Algebra
- [ ] 01 — Scalars, vectors, matrices, tensors
- [ ] 02 — Vector operations: addition, scalar multiplication, dot product, cross product
- [ ] 03 — Geometric meaning of the dot product
- [ ] 04 — Matrix multiplication: why rows x columns
- [ ] 05 — Linear transformations
- [ ] 06 — Identity, inverse, transpose
- [ ] 07 — Determinants: geometric meaning
- [ ] 08 — Systems of linear equations, Gaussian elimination, LU decomposition
- [ ] 09 — Eigenvalues & eigenvectors
- [ ] 10 — SVD (Singular Value Decomposition)
- [ ] 11 — PCA derived from SVD
- [ ] 12 — Norms: L1, L2, Lp, Frobenius

### Tier 3 — Calculus & Analysis
- [ ] 01 — Limits from epsilon-delta definition
- [ ] 02 — Derivatives: slope of tangent, formal definition, rules
- [ ] 03 — Partial derivatives and the gradient
- [ ] 04 — Chain rule (backpropagation foundation)
- [ ] 05 — Jacobian and Hessian matrices
- [ ] 06 — Integrals: Riemann sums to definite integral
- [ ] 07 — Fundamental Theorem of Calculus
- [ ] 08 — Multivariable integration
- [ ] 09 — Taylor / Maclaurin series
- [ ] 10 — Numerical vs symbolic differentiation

### Tier 4 — Probability & Statistics
- [ ] 01 — Sample spaces, events, probability axioms
- [ ] 02 — Conditional probability and Bayes' Theorem
- [ ] 03 — Random variables: discrete and continuous
- [ ] 04 — Expectation, variance, standard deviation
- [ ] 05 — Key distributions (Bernoulli, Binomial, Poisson, Uniform, Gaussian)
- [ ] 06 — Central Limit Theorem
- [ ] 07 — Maximum Likelihood Estimation (MLE)
- [ ] 08 — Information theory: entropy, cross-entropy, KL divergence
- [ ] 09 — Covariance and correlation matrices

### Tier 5 — Optimisation
- [ ] 01 — Objective functions and loss functions
- [ ] 02 — Gradient Descent
- [ ] 03 — SGD and mini-batches
- [ ] 04 — Momentum, RMSProp, Adam
- [ ] 05 — Convexity, saddle points, local minima
- [ ] 06 — Lagrange multipliers
- [ ] 07 — Newton-Raphson, bisection

### Tier 6 — Linear Algebra for Neural Networks
- [ ] 01 — The neuron as dot product + activation
- [ ] 02 — Activation functions: sigmoid, tanh, ReLU, GELU
- [ ] 03 — Forward pass as matrix multiplication chains
- [ ] 04 — Backpropagation from chain rule
- [ ] 05 — Fully connected network from scratch in NumPy
- [ ] 06 — Compare with PyTorch equivalent

### Tier 7 — Convolutional Neural Networks
- [ ] 01 — 2D convolution from first principles
- [ ] 02 — Convolution vs cross-correlation
- [ ] 03 — Stride and padding: output size formula
- [ ] 04 — Pooling operations
- [ ] 05 — Implement 2D convolution kernel (pure Python, NumPy, PyTorch)
- [ ] 06 — Receptive field analysis

### Tier 8 — Geometry & Trigonometry for Game Dev
- [ ] 01 — Unit circle, radians, degrees
- [ ] 02 — Sine, cosine, tangent
- [ ] 03 — Pythagorean theorem, distance formula in N dimensions
- [ ] 04 — 2D / 3D rotation matrices
- [ ] 05 — Quaternions and gimbal lock
- [ ] 06 — Homogeneous coordinates and 4x4 transform matrices
- [ ] 07 — Projection: orthographic vs perspective
- [ ] 08 — Bezier curves and splines
- [ ] 09 — Ray-sphere / ray-plane intersection
- [ ] 10 — Collision detection math

### Tier 9 — Signals & Fourier Analysis
- [ ] 01 — Periodic functions and superposition
- [ ] 02 — Fourier Series
- [ ] 03 — Fourier Transform
- [ ] 04 — DFT and FFT algorithm
- [ ] 05 — Convolution theorem
- [ ] 06 — Applications: image filtering, audio, CNNs

### Tier 10 — Advanced Topics
- [ ] 01 — Graph neural networks (spectral convolution)
- [ ] 02 — Attention mechanism & Transformers
- [ ] 03 — Recurrent networks: BPTT
- [ ] 04 — Markov chains and MDPs
- [ ] 05 — Monte Carlo methods and MCMC
- [ ] 06 — Numerical linear algebra: iterative solvers, sparse matrices
- [ ] 07 — Automatic differentiation: forward vs reverse mode
