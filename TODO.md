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

### Foundation 1 — Algebra Foundations (grade 8 entry point)
- [x] 01 — Surds, indices, logarithms
- [x] 02 — Algebraic manipulation (expanding, factoring, completing the square)
- [x] 03 — Multi-step equations
- [x] 04 — Inequalities (linear, compound, interval notation)
- [x] 05 — Simultaneous equations (substitution, elimination)
- [x] 06 — Function notation (f(x), domain, range, composition, inverse)
- [x] 07 — Linear functions (slope, forms, parallel/perpendicular)
- [x] 08 — Quadratic functions (vertex form, discriminant, quadratic formula)
- [x] 09 — Polynomial functions (degree, end behavior, roots)
- [x] 10 — Rational expressions (simplifying, operations, undefined values)
- [x] 11 — Absolute value (equations, inequalities, piecewise)
- [x] 12 — Exponent rules mastery (zero, negative, fractional exponents)

### Foundation 2 — Functions & Graphs
- [x] 01 — The Cartesian plane (plotting, distance, midpoint)
- [x] 02 — Transformations of functions (shifts, stretches, reflections)
- [x] 03 — Exponential functions (growth, decay, natural base e)
- [x] 04 — Logarithmic functions (inverse of exp, log scales, change of base)
- [x] 05 — Coordinate geometry (lines, circles, distance, midpoint)
- [x] 06 — Basic trigonometry (SOH-CAH-TOA, unit circle, radians)
- [x] 07 — Function composition & inverses
- [x] 08 — Basic statistics (mean, median, mode, box plots)
- [x] 09 — Piecewise functions (continuity intuition, ReLU connection)
- [x] 10 — Graph reading skills (rate of change, concavity)

### Foundation 3 — Advanced Algebra
- [x] 01 — Polynomial long division & synthetic division
- [x] 02 — Polynomial roots (rational root theorem, Descartes' rule)
- [x] 03 — Factor theorem & remainder theorem
- [x] 04 — Radical functions (nth roots, rational exponents)
- [x] 05 — Exponential & logarithmic equations (growth/decay models)
- [x] 06 — Sequences & series (arithmetic, geometric, sigma, binomial)
- [x] 07 — Systems of nonlinear equations
- [x] 08 — Introduction to matrices (operations, real-world framing)
- [x] 09 — Summation notation (sigma, properties, telescoping)
- [x] 10 — Mathematical thinking (problem-solving strategies)

### Foundation 4 — Pre-Calculus
- [x] 01 — Limits — intuitive (average vs instantaneous rate)
- [x] 02 — Trigonometric functions — advanced (all six, identities, CAST)
- [x] 03 — Inverse trigonometric functions (arcsin, arccos, arctan)
- [x] 04 — Trigonometric identities (double angle, addition, R-formula)
- [x] 05 — Conic sections introduction (circles, ellipses, parabolas, hyperbolas)
- [x] 06 — Vectors — intuitive (arrows, components, magnitude)
- [x] 07 — Complex numbers (Argand, polar, De Moivre, roots of unity)
- [x] 08 — Continuity review (discontinuity types, IVT)

### Tier 0 — Number Systems & Arithmetic
- [x] 01 — Number systems (N, Z, Q, R, C)
- [x] 02 — Number bases: binary, hex
- [x] 03 — Floating-point representation (IEEE 754)
- [x] 04 — Modular arithmetic & clock arithmetic
- [x] 05 — Prime numbers, GCD, LCM (Euclidean algorithm)

### Tier 1 — Discrete Mathematics
- [x] 01 — Logic: propositions, truth tables, Boolean algebra, implications, biconditionals, XOR problem
- [x] 02 — Set theory: unions, intersections, power sets, Cartesian products, indicator functions, cardinality, sup/inf, argmax/argmin
- [x] 03 — Relations and functions (injective, surjective, bijective)
- [x] 04 — Combinatorics: permutations, combinations, pigeonhole principle
- [x] 05 — Graph theory basics: vertices, edges, paths, trees
- [x] 06 — Proof techniques: induction, contradiction, contrapositive

### Tier 2 — Linear Algebra
- [x] 01 — Scalars, vectors, matrices, tensors
- [x] 02 — Vector operations: addition, scalar multiplication, dot product, cross product
- [x] 03 — Geometric meaning of the dot product
- [x] 04 — Matrix multiplication: why rows x columns
- [x] 05 — Linear transformations (+ affine transforms)
- [x] 06 — Identity, inverse, transpose
- [x] 07 — Determinants: geometric meaning, Laplace expansion, row op properties
- [x] 08 — Systems of linear equations, Gaussian elimination
- [x] 09 — Linear combinations, span, independence, Hadamard product
- [x] 10 — Subspaces: column space & null space
- [x] 11 — Bases & change of coordinates
- [x] 12 — Dimension, rank, rank-nullity theorem
- [x] 13 — Eigenvalues & eigenvectors
- [x] 14 — Diagonalization (P D P⁻¹, matrix powers)
- [x] 15 — Symmetric matrices & spectral theorem
- [x] 16 — Norms: L1, L2, Lp, Frobenius
- [x] 17 — Orthogonality & Cauchy-Schwarz
- [x] 18 — Orthogonal projections
- [x] 19 — Gram-Schmidt process
- [x] 20 — Quadratic forms, definiteness, pseudoinverse
- [x] 21 — SVD (Singular Value Decomposition)
- [x] 22 — PCA derived from SVD

### Tier 3 — Calculus & Analysis
- [x] 01 — Limits from epsilon-delta definition
- [x] 02 — Derivatives: slope of tangent, formal definition, rules
- [x] 03 — Partial derivatives, gradient, directional derivatives, steepest ascent
- [x] 04 — Chain rule (backpropagation foundation)
- [x] 05 — Jacobian, Hessian, matrix calculus, inverse function theorem
- [x] 06 — Integrals: Riemann sums to definite integral
- [x] 07 — Fundamental Theorem of Calculus
- [x] 08 — Multivariable integration
- [x] 09 — Taylor / Maclaurin series
- [x] 10 — Numerical vs symbolic vs automatic differentiation

### Tier 4 — Probability & Statistics
- [x] 01 — Sample spaces, events, probability axioms
- [x] 02 — Conditional probability and Bayes' Theorem
- [x] 03 — Random variables: discrete and continuous, transformations of RVs
- [x] 04 — Expectation, variance, moments, moment generating functions
- [x] 05 — Discrete distributions (Bernoulli, Binomial, Poisson, Discrete Uniform)
- [x] 06 — Continuous distributions (Uniform, Gaussian, Exponential, Gamma, Chi-square, Student's t)
- [x] 07 — Central Limit Theorem
- [x] 08 — Maximum Likelihood Estimation (MLE)
- [x] 09 — Information theory: entropy, cross-entropy, KL divergence
- [x] 10 — Covariance and correlation matrices
- [x] 11 — Joint distributions (joint PMF/PDF, marginal, conditional)
- [x] 12 — Expectation for joint distributions (conditional expectation, law of total expectation)
- [x] 13 — Bivariate normal distribution
- [x] 14 — Sampling distributions & point estimation
- [x] 15 — Confidence intervals

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

### Tier 11 — Differential Equations
- [x] 01 — Introduction & classification (ODE vs PDE, order, linearity)
- [x] 02 — Separable equations
- [x] 03 — First-order linear ODEs (integrating factor)
- [x] 04 — Direction fields & qualitative analysis
- [x] 05 — Existence & uniqueness
- [x] 06 — Euler's method
- [x] 07 — Second-order homogeneous (characteristic equation)
- [x] 08 — Second-order nonhomogeneous
- [x] 09 — Spring-mass systems (SHM, damping, resonance)
- [x] 10 — Systems of ODEs (matrix form, eigenvalue method)
- [x] 11 — Phase portraits (fixed point classification)
- [x] 12 — Stability analysis (Jacobian linearization, Lyapunov)
- [x] 13 — Laplace transform basics
- [x] 14 — Solving ODEs with Laplace transforms
- [x] 15 — Convolution & Laplace
- [x] 16 — Series solutions
- [x] 17 — Fourier series for DEs
- [x] 18 — Boundary value problems
- [x] 19 — PDE introduction (heat, wave, classification)
- [x] 20 — Heat equation (separation of variables)
- [x] 21 — Wave equation (d'Alembert)
- [x] 22 — Numerical methods for ODEs (Runge-Kutta)
- [x] 23 — Stiff systems & implicit methods
- [x] 24 — Dynamical systems & chaos (Lorenz attractor)
- [x] 25 — Applications: Neural ODEs, PINNs

### Tier 12 — Multivariable Calculus
- [x] 01 — Vector-valued functions
- [x] 02 — Arc length & curvature
- [x] 03 — Multivariable limits & continuity
- [x] 04 — Partial derivatives (deeper treatment)
- [x] 05 — Tangent planes & linearization
- [x] 06 — Multivariable chain rule
- [x] 07 — Gradient & directional derivatives (deeper)
- [x] 08 — Optimization & Lagrange (deeper)
- [x] 09 — Double integrals (Fubini's theorem)
- [x] 10 — Double integrals in polar coordinates
- [x] 11 — Triple integrals (cylindrical, spherical)
- [x] 12 — Change of variables (Jacobian for integration)
- [x] 13 — Vector fields (conservative, potential functions)
- [x] 14 — Line integrals (scalar and vector)
- [x] 15 — Green's theorem
- [x] 16 — Divergence & curl
- [x] 17 — Surface integrals & flux
- [x] 18 — Stokes' theorem
- [x] 19 — Divergence theorem
- [x] 20 — Applications (fluid dynamics, electromagnetism, ML)

### Tier 13 — Advanced Discrete Mathematics
- [x] 01 — Number theory foundations
- [x] 02 — Modular arithmetic advanced (CRT)
- [x] 03 — Fermat & Euler's theorems
- [x] 04 — RSA cryptography
- [x] 05 — Boolean algebra advanced (DNF, CNF, K-maps)
- [x] 06 — Recurrence relations
- [x] 07 — Generating functions
- [x] 08 — Advanced graph theory (coloring, planar, Euler/Hamilton)
- [x] 09 — Graph algorithms (BFS, DFS, Dijkstra, MST)
- [x] 10 — Network flow (max-flow min-cut)
- [x] 11 — Matching theory (bipartite, Hall's theorem)
- [x] 12 — Automata basics (DFA, NFA)
- [x] 13 — Context-free grammars
- [x] 14 — Turing machines & halting problem
- [x] 15 — Computational complexity (P, NP, NP-complete)
- [x] 16 — Information theory advanced (channel capacity, Hamming codes)
- [x] 17 — Algorithmic game theory (Nash, minimax)
- [x] 18 — Lattices & partial orders

### Tier 14 — Advanced Statistics & Inference
- [x] 01 — Estimation theory (bias, consistency, MSE)
- [x] 02 — Method of moments
- [x] 03 — Hypothesis testing foundations (Type I/II, p-value, power)
- [x] 04 — Z-test & t-test
- [x] 05 — Chi-squared tests
- [x] 06 — ANOVA (one-way, F-distribution)
- [x] 07 — Linear regression (matrix form, OLS)
- [x] 08 — Multiple regression (R², multicollinearity)
- [x] 09 — Logistic regression (sigmoid, MLE)
- [x] 10 — Nonparametric methods (Mann-Whitney, permutation)
- [x] 11 — Bayesian inference (conjugate priors, MAP)
- [x] 12 — Bayesian computation (MCMC, Metropolis-Hastings)
- [x] 13 — Causal inference (Simpson's paradox, do-calculus)
- [x] 14 — Experimental design (A/B testing, power analysis)
- [x] 15 — Bootstrap & resampling

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

Now also covered:
- [x] Pythagoras and SOH-CAH-TOA → Tier 8-02, 8-03
- [x] Basic statistics: mean, median, mode, box plots → Foundations 07
- [x] Polynomial division, factor/remainder theorem → Foundations 08
- [x] Parametric equations and implicit differentiation → Foundations 09
- [x] Polar coordinates and curves → Foundations 10
- [x] Hyperbolic functions: sinh, cosh, tanh → Foundations 11

Final three — now also covered:
- [x] Numerical methods: trapezium rule, Simpson's rule → Applied 08
- [x] Cayley-Hamilton theorem, matrix exponential → Foundations 12
- [x] Further vectors: lines & planes in 3D → Foundations 13

ALL CAMBRIDGE CURRICULUM GAPS CLOSED. 245 lessons total (40 foundation + 127 core + 45 university + 33 advanced).
