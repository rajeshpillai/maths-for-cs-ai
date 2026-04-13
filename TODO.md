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
- [x] Prerequisite links: render "Prerequisites" section as clickable links to other lessons
- [x] Progress tracking (mark lessons as complete, localStorage persistence)
- [x] Responsive layout / mobile-friendly
- [x] Dark/light theme toggle

## Backend — API

- [x] GET /api/tiers — list all tiers and lessons
- [x] GET /api/tiers/{tier}/{slug} — return lesson markdown
- [x] GET /api/tiers/{tier}/{slug}/meta — lesson metadata (title, prereqs, sections)
- [ ] POST /api/progress — save lesson completion status
- [ ] POST /api/run — server-side Python code execution (optional)

## Tutorials — Content

### Tier 0 — Number Systems & Arithmetic
- [x] 01 — Number systems (N, Z, Q, R, C)
- [x] 02 — Number bases: binary, hex
- [x] 03 — Floating-point representation (IEEE 754)
- [x] 04 — Modular arithmetic & clock arithmetic
- [x] 05 — Prime numbers, GCD, LCM (Euclidean algorithm)

### Tier 1 — Discrete Mathematics
- [x] 01 — Logic: propositions, truth tables, Boolean algebra
- [x] 02 — Set theory: unions, intersections, power sets, Cartesian products
- [x] 03 — Relations and functions (injective, surjective, bijective)
- [x] 04 — Combinatorics: permutations, combinations, pigeonhole principle
- [x] 05 — Graph theory basics: vertices, edges, paths, trees
- [x] 06 — Proof techniques: induction, contradiction, contrapositive

### Tier 2 — Linear Algebra
- [x] 01 — Scalars, vectors, matrices, tensors
- [x] 02 — Vector operations: addition, scalar multiplication, dot product, cross product
- [x] 03 — Geometric meaning of the dot product
- [x] 04 — Matrix multiplication: why rows x columns
- [x] 05 — Linear transformations
- [x] 06 — Identity, inverse, transpose
- [x] 07 — Determinants: geometric meaning
- [x] 08 — Systems of linear equations, Gaussian elimination
- [x] 09 — Eigenvalues & eigenvectors
- [x] 10 — SVD (Singular Value Decomposition)
- [x] 11 — PCA derived from SVD
- [x] 12 — Norms: L1, L2, Lp, Frobenius

### Tier 3 — Calculus & Analysis
- [x] 01 — Limits from epsilon-delta definition
- [x] 02 — Derivatives: slope of tangent, formal definition, rules
- [x] 03 — Partial derivatives and the gradient
- [x] 04 — Chain rule (backpropagation foundation)
- [x] 05 — Jacobian and Hessian matrices
- [x] 06 — Integrals: Riemann sums to definite integral
- [x] 07 — Fundamental Theorem of Calculus
- [x] 08 — Multivariable integration
- [x] 09 — Taylor / Maclaurin series
- [x] 10 — Numerical vs symbolic vs automatic differentiation

### Tier 4 — Probability & Statistics
- [x] 01 — Sample spaces, events, probability axioms
- [x] 02 — Conditional probability and Bayes' Theorem
- [x] 03 — Random variables: discrete and continuous
- [x] 04 — Expectation, variance, standard deviation
- [x] 05 — Key distributions (Bernoulli, Binomial, Poisson, Uniform, Gaussian)
- [x] 06 — Central Limit Theorem
- [x] 07 — Maximum Likelihood Estimation (MLE)
- [x] 08 — Information theory: entropy, cross-entropy, KL divergence
- [x] 09 — Covariance and correlation matrices

### Tier 5 — Optimisation
- [x] 01 — Objective functions and loss functions
- [x] 02 — Gradient Descent
- [x] 03 — SGD and mini-batches
- [x] 04 — Momentum, RMSProp, Adam
- [x] 05 — Convexity, saddle points, local minima
- [x] 06 — Lagrange multipliers
- [x] 07 — Newton-Raphson, bisection

### Tier 6 — Linear Algebra for Neural Networks
- [x] 01 — The neuron as dot product + activation
- [x] 02 — Activation functions: sigmoid, tanh, ReLU, GELU
- [x] 03 — Forward pass as matrix multiplication chains
- [x] 04 — Backpropagation from chain rule
- [x] 05 — Fully connected network from scratch (pure Python)
- [x] 06 — Compare with PyTorch equivalent

### Tier 7 — Convolutional Neural Networks
- [x] 01 — 2D convolution from first principles
- [x] 02 — Convolution vs cross-correlation
- [x] 03 — Stride and padding: output size formula
- [x] 04 — Pooling operations
- [x] 05 — Implement 2D convolution (pure Python, multi-channel)
- [x] 06 — Receptive field analysis

### Tier 8 — Geometry & Trigonometry for Game Dev
- [x] 01 — Unit circle, radians, degrees
- [x] 02 — Sine, cosine, tangent (+ tangent as slope, cosine as similarity)
- [x] 03 — Pythagorean theorem, distance formula in N dimensions
- [x] 04 — 2D / 3D rotation matrices
- [x] 05 — Quaternions and gimbal lock
- [x] 06 — Homogeneous coordinates and 4x4 transform matrices
- [x] 07 — Projection: orthographic vs perspective
- [x] 08 — Bezier curves and splines
- [x] 09 — Ray-sphere / ray-plane intersection
- [x] 10 — Collision detection math

### Tier 9 — Signals & Fourier Analysis
- [x] 01 — Periodic functions and superposition
- [x] 02 — Fourier Series
- [x] 03 — Fourier Transform
- [x] 04 — DFT and FFT algorithm
- [x] 05 — Convolution theorem
- [x] 06 — Applications: image filtering, audio, CNNs

### Tier 10 — Advanced Topics
- [x] 01 — Graph neural networks (spectral convolution)
- [x] 02 — Attention mechanism & Transformers (scaled dot-product, multi-head)
- [x] 03 — Recurrent networks: BPTT (vanishing gradients, LSTM)
- [x] 04 — Markov chains and MDPs (PageRank, Bellman equation)
- [x] 05 — Monte Carlo methods and MCMC (Metropolis-Hastings)
- [x] 06 — Numerical linear algebra: iterative solvers, sparse matrices
- [x] 07 — Automatic differentiation: forward vs reverse mode (dual numbers, tape)

## Supplementary — Graph Shapes & Curve Types

- [x] 01 — Linear, quadratic, cubic (vertex form, discriminant, turning points)
- [x] 02 — Exponential and logarithmic (growth/decay, log laws, change of base)
- [x] 03 — Conic sections (parabola, ellipse, hyperbola, eccentricity)
- [x] 04 — Bell curve, sigmoid, step function, ReLU family (shape comparison)
- [x] 05 — Power laws, log plots, exponential growth & decay (Zipf, compound interest)

## Supplementary — Activation Functions (detailed maths)

- [x] 01 — Complete deep dive: sigmoid, tanh, ReLU, Leaky ReLU, ELU, GELU,
      Swish, softmax — all derivations, derivatives, gradient analysis,
      temperature parameter, and selection guide

## Cambridge Curriculum Integration (Year 8 → IGCSE → AS → A-Level → Further Maths)

Mapping to show which tier covers which Cambridge syllabus topic.
Gaps marked for new lessons to be added.

### Year 8–9 / IGCSE Foundation (ages 13–16)
Already covered:
- [x] Number types, HCF/LCM, primes → Tier 0
- [x] Binary, hex → Tier 0-02
- [x] Basic logic, sets, Venn diagrams → Tier 1-01, 1-02
- [x] Coordinates, plotting → embedded in examples
- [x] Ratio, proportion → Tier 0 examples
- [x] Basic probability → Tier 4 (when written)

Now covered in supplementary sections:
- [x] Surds, indices, logarithm laws → Foundations 01
- [x] Algebraic manipulation, completing the square → Foundations 02
- [x] Linear & quadratic equations, simultaneous, inequalities → Foundations 02
- [x] Graphs of functions → Supplementary Graphs 01
- [x] Coordinate geometry: lines, circles, distance, midpoint → Foundations 03
- [x] Sequences, series, binomial expansion → Foundations 04
- [x] Trig identities: double angle, addition, R-formula → Foundations 05
- [x] Complex numbers: Argand, polar, De Moivre, roots of unity → Foundations 06
- [x] Kinematics: SUVAT → Applied 01
- [x] Projectile motion → Applied 02
- [x] Forces and equilibrium → Applied 03
- [x] Simple harmonic motion → Applied 04
- [x] Differential equations: separable, 1st/2nd order → Applied 05
- [x] Hypothesis testing: z-test, t-test, chi-squared → Applied 06
- [x] Regression and R² → Applied 07
- [x] Conic sections → Supplementary Graphs 03

Remaining gaps (lower priority):
- [ ] Pythagoras and basic SOH-CAH-TOA (partially in Tier 8-02/03)
- [ ] Basic statistics: mean, median, mode, box plots
- [ ] Polynomial division, factor/remainder theorem
- [ ] Parametric equations and implicit differentiation
- [ ] Numerical methods: trapezium rule
- [ ] Polar coordinates and curves
- [ ] Hyperbolic functions: sinh, cosh, tanh
- [ ] Cayley-Hamilton theorem, matrix exponential
- [ ] Further vectors: lines & planes in 3D
