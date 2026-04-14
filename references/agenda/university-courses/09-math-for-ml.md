# Mathematics for Machine Learning

> This course provides a comprehensive foundation of the essential mathematical tools required to study modern machine learning. It is divided into three main categories: linear algebra, multivariable calculus, and probability & statistics.
>
> The linear algebra section covers crucial machine learning fundamentals such as matrices, vector spaces, diagonalization, projections, singular value decomposition, and regression, as well as dimensionality reduction techniques such as principal component analysis. The multivariable calculus section develops the tools needed for optimization and learning algorithms, including vector and matrix calculus. Finally, the probability and statistics section covers random variables, point estimation, maximum likelihood estimation, and confidence intervals.
>
> On completing this course, students will be well-prepared for a university-level machine learning course that tackles concepts such as gradient descent, neural networks, backpropagation, support vector machines, naive Bayes classifiers, and Gaussian mixture models.

**Prerequisites:** Calculus, Linear Algebra

---

## Agenda

### Unit 1: Set Theory

#### 1.1 Introduction to Set Theory
- Special Sets
- Equivalent Sets
- The Constructive Definition of a Set
- The Conditional Definition of a Set
- Describing Sets Using Set-Builder Notation
- Describing Planar Regions Using Set-Builder Notation
- Indicator Functions
- Indicator Functions for Predicates

#### 1.2 Set Operations
- The Difference of Sets
- Set Complements
- The Cartesian Product
- Visualizing Cartesian Products
- Indexed Sets
- Sets and Functions

#### 1.3 Properties of Sets
- Subsets
- Cardinality of Finite Sets
- Infinite Sets
- Interior and Boundary Points
- Interiors and Boundaries of Sets
- Open and Closed Sets
- Disjoint Sets
- The Maximum and Minimum of a Set
- Supremum and Infimum
- Argmax and Argmin Notation
- Finding Argmax and Argmin From Tables and Graphs

### Unit 2: Logic and Boolean Algebra

#### 2.4 Logical Statements
- Statements and Predicates
- The "And" and "Or" Connectives
- Truth Tables
- The "Not" Connective
- Logical Equivalence
- Logical Associative and Commutative Laws
- The Distributive Laws
- The Absorption Laws
- De Morgan's Laws for Logic

#### 2.5 Implications and Biconditionals
- Conditional Statements
- Logical Equivalence with Conditional Statements
- Biconditional Statements
- Truth Sets of Predicates
- The "And" and "Or" Connectives With Predicates
- The "Not" Connective With Predicates
- Simplifying Predicate Expressions Using De Morgan's Laws
- Conditional Statements With Predicates

#### 2.6 Introduction to Boolean Algebra
- Boolean Functions
- Boolean Functions And Logical Operations

### Unit 3: Vector Geometry, Determinants, and Gaussian Elimination

#### 3.7 Vector Geometry
- The Vector Equation of a Line
- The Parametric Equations of a Line
- The Cartesian Equation of a Line
- The Vector Equation of a Plane
- The Cartesian Equation of a Plane
- The Parametric Equations of a Plane
- The Intersection of Two Planes
- The Shortest Distance Between a Plane and a Point
- The Intersection Between a Line and a Plane

#### 3.8 Determinants
- The Determinant of an NxN Matrix
- Finding Determinants Using Laplace Expansions
- Basic Properties of Determinants
- Further Properties of Determinants
- Row and Column Operations on Determinants
- Conditions When a Determinant Equals Zero

#### 3.9 Gaussian Elimination
- Systems of Equations as Augmented Matrices
- Row Echelon Form
- Solving Systems of Equations Using Back Substitution
- Elementary Row Operations
- Creating Rows or Columns Containing Zeros Using Gaussian Elimination
- Solving 2x2 Systems of Equations Using Gaussian Elimination
- Solving 2x2 Singular Systems of Equations Using Gaussian Elimination
- Solving 3x3 Systems of Equations Using Gaussian Elimination
- Identifying the Pivot Columns of a Matrix
- Solving 3x3 Singular Systems of Equations Using Gaussian Elimination
- Reduced Row Echelon Form
- Gaussian Elimination For NxM Systems of Equations

#### 3.10 The Inverse of a Matrix
- Finding the Inverse of a 2x2 Matrix Using Row Operations
- Finding the Inverse of a 3x3 Matrix Using Row Operations
- Matrices With Easy-to-Find Inverses
- The Invertible Matrix Theorem in Terms of 2x2 Systems of Equations
- Triangular Matrices

#### 3.11 Affine Transformations
- Affine Transformations
- The Image of an Affine Transformation
- The Inverse of an Affine Transformation

### Unit 4: Vector Spaces

#### 4.12 Vectors in N-Dimensional Space
- Vectors in N-Dimensional Euclidean Space
- Linear Combinations of Vectors in N-Dimensional Euclidean Space
- Linear Span of Vectors in N-Dimensional Euclidean Space
- Linear Dependence and Independence
- The Hadamard Product

#### 4.13 Subspaces of N-Dimensional Space
- Subspaces of N-Dimensional Space
- Subspaces of N-Dimensional Space: Geometric Interpretation
- The Column Space of a Matrix
- The Null Space of a Matrix

#### 4.14 Bases of N-Dimensional Space
- Finding a Basis of a Span
- Finding a Basis of the Column Space of a Matrix
- Finding a Basis of the Null Space of a Matrix
- Expressing the Coordinates of a Vector in a Given Basis
- Writing Vectors in Different Bases
- The Change-of-Coordinates Matrix
- Changing a Basis Using the Change-of-Coordinates Matrix

#### 4.15 Dimension and Rank in N-Dimensional Space
- The Dimension of a Span
- The Rank of a Matrix
- The Dimension of the Null Space of a Matrix
- The Invertible Matrix Theorem in Terms of Dimension, Rank and Nullity
- The Rank-Nullity Theorem

### Unit 5: Eigenvalues and Diagonalization

#### 5.16 Eigenvectors and Eigenvalues
- The Eigenvalues and Eigenvectors of a 2x2 Matrix
- Calculating the Eigenvalues of a 2x2 Matrix
- Calculating the Eigenvectors of a 2x2 Matrix
- The Characteristic Equation of a Matrix
- Calculating the Eigenvectors of a 3x3 Matrix With Distinct Eigenvalues
- Calculating the Eigenvectors of a 3x3 Matrix in the General Case

#### 5.17 Diagonalization
- Diagonalizing a 2x2 Matrix
- Properties of Diagonalization
- Diagonalizing a 3x3 Matrix With Distinct Eigenvalues
- Diagonalizing a 3x3 Matrix in the General Case
- Symmetric Matrices
- Diagonalization of 2x2 Symmetric Matrices
- Diagonalization of 3x3 Symmetric Matrices

### Unit 6: Inner Products, Orthogonality, and Projections

#### 6.18 Inner Products
- The Dot Product in N-Dimensional Euclidean Space
- The Norm of a Vector in N-Dimensional Euclidean Space
- Euclidean, Manhattan, and Minkowski Distance
- Introduction to Abstract Vector Spaces
- Defining Abstract Vector Spaces
- Inner Product Spaces

#### 6.19 Orthogonality
- Orthogonal Vectors in Euclidean Spaces
- The Cauchy-Schwarz Inequality and the Angle Between Two Vectors
- Orthogonal Complements
- Orthogonal Sets in Euclidean Spaces
- Orthogonal Matrices
- Orthogonal Linear Transformations

#### 6.20 Orthogonal Projections
- Projecting Vectors Onto One-Dimensional Subspaces
- The Components of a Vector with Respect to an Orthogonal or Orthonormal Basis
- Projecting Vectors Onto Subspaces in Euclidean Spaces (Orthogonal Bases)
- Projecting Vectors Onto Subspaces in Euclidean Spaces (Arbitrary Bases)
- Projecting Vectors Onto Subspaces in Euclidean Spaces (Arbitrary Bases): Applications
- The Gram-Schmidt Process for Two Vectors

### Unit 7: Quadratic Forms and SVD

#### 7.21 Quadratic Forms
- Bilinear Forms
- Quadratic Forms
- Change of Variables in Quadratic Forms
- Positive-Definite and Negative-Definite Quadratic Forms
- Constrained Optimization of Quadratic Forms
- Constrained Optimization of Quadratic Forms: Determining Where Extrema are Attained

#### 7.22 Singular Value Decomposition
- The Singular Values of a Matrix
- Computing the Singular Values of a Matrix
- Singular Value Decomposition of 2x2 Matrices
- Singular Value Decomposition of 2x2 Matrices With Zero or Repeated Eigenvalues
- Singular Value Decomposition of Larger Matrices
- Singular Value Decomposition and the Pseudoinverse Matrix

### Unit 8: Regression and PCA

#### 8.23 Linear Least-Squares Problems
- The Least-Squares Solution of a Linear System (Without Collinearity)
- The Least-Squares Solution of a Linear System (With Collinearity)

#### 8.24 Linear Regression
- Linear Regression With Matrices
- Polynomial Regression With Matrices
- Multiple Linear Regression With Matrices

#### 8.25 Principal Component Analysis
- Introduction to Principal Component Analysis
- Computing Principal Components
- The Connection Between PCA and SVD
- Feature Extraction Using PCA

### Unit 9: Multivariable Calculus

#### 9.26 Quadric Surfaces and Cylinders
- Ellipsoids
- Hyperboloids
- Paraboloids
- Elliptic Cones
- Cylinders
- Intersections of Lines and Planes With Surfaces
- Identifying Quadric Surfaces

#### 9.27 Partial Derivatives
- The Domain of a Multivariable Function
- Level Curves
- Level Surfaces
- Limits and Continuity of Multivariable Functions
- Introduction to Partial Derivatives
- Computing Partial Derivatives Using the Rules of Differentiation
- Geometric Interpretations of Partial Derivatives
- Partial Differentiability of Multivariable Functions
- Higher-Order Partial Derivatives
- Equality of Mixed Partial Derivatives
- Tangent Planes to Surfaces
- Linearization of Multivariable Functions
- The Multivariable Chain Rule

#### 9.28 Vector-Valued Functions
- The Domain of a Vector-Valued Function
- Tangent Vectors and Tangent Lines to Curves
- The Gradient Vector
- The Gradient as a Normal Vector
- Directional Derivatives
- The Multivariable Chain Rule in Vector Form
- Gradients With Respect to a Variable Subset

#### 9.29 Differentiation
- The Jacobian
- The Inverse Function Theorem
- The Jacobian of a Three-Dimensional Transformation
- The Derivative of a Multivariable Function
- The Second Derivative of a Multivariable Function
- Second-Degree Taylor Polynomials of Multivariable Functions

#### 9.30 Matrix Calculus
- Total and Tensor Derivatives
- The Chain Rule for Total Derivatives
- Vector Gradients
- Further Vector Gradients
- Matrix Gradients

#### 9.31 Approximating Volumes With Riemann Sums
- Partitions of Intervals
- Calculating Double Summations Over Partitions
- Approximating Volumes Using Lower Riemann Sums
- Approximating Volumes Using Upper Riemann Sums
- Lower Riemann Sums Over General Rectangular Partitions
- Upper Riemann Sums Over General Rectangular Partitions
- Defining Double Integrals Using Lower and Upper Riemann Sums

#### 9.32 Double Integrals
- Double Integrals Over Rectangular Domains
- Double Integrals Over Non-Rectangular Domains
- Properties of Double Integrals
- Type I and II Regions in Two-Dimensional Space
- Double Integrals Over Type I Regions
- Double Integrals Over Type II Regions

#### 9.33 Optimization
- Global vs. Local Extrema and Critical Points of Multivariable Functions
- The Second Partial Derivatives Test
- Calculating Global Extrema of Multivariable Functions
- Lagrange Multipliers With One Constraint
- Lagrange Multipliers With Multiple Constraints
- Optimizing Multivariable Functions Using Lagrange Multipliers

### Unit 10: Probability and Expectation

#### 10.34 Probability
- Extending the Law of Total Probability
- Bayes' Theorem
- Extending Bayes' Theorem

#### 10.35 Random Variables
- Probability Density Functions of Continuous Random Variables
- Calculating Probabilities With Continuous Random Variables
- Continuous Random Variables Over Infinite Domains
- Cumulative Distribution Functions for Continuous Random Variables
- Approximating Discrete Random Variables as Continuous
- Simulating Random Observations

#### 10.36 Transformations of Random Variables
- One-to-One Transformations of Discrete Random Variables
- Many-to-One Transformations of Discrete Random Variables
- The Distribution Function Method
- The Change-of-Variables Method for Continuous Random Variables
- The Distribution Function Method With Many-to-One Transformations

#### 10.37 Expectation
- Expected Values of Discrete Random Variables
- Properties of Expectation for Discrete Random Variables
- Moments of Discrete Random Variables
- Variance of Discrete Random Variables
- Properties of Variance for Discrete Random Variables
- Expected Values of Continuous Random Variables
- Moments of Continuous Random Variables
- Variance of Continuous Random Variables
- The Rule of the Lazy Statistician
- The Law of Total Expectation for Discrete Random Variables

#### 10.38 Discrete Probability Distributions
- The Bernoulli Distribution
- Modeling With the Binomial Distribution
- The CDF of the Binomial Distribution
- Mean and Variance of the Binomial Distribution
- The Discrete Uniform Distribution
- Modeling With Discrete Uniform Distributions
- Mean and Variance of the Discrete Uniform Distribution
- The Poisson Distribution
- Modeling With the Poisson Distribution
- The CDF of the Poisson Distribution

#### 10.39 Continuous Probability Distributions
- The Continuous Uniform Distribution
- Mean and Variance of the Continuous Uniform Distribution
- Modeling With Continuous Uniform Distributions
- The Gamma Function
- The Chi-Square Distribution
- The Student's T-Distribution
- The Exponential Distribution

### Unit 11: Joint Distributions and Covariance

#### 11.40 Distributions of Two Discrete Random Variables
- Double Summations
- Joint Distributions for Discrete Random Variables
- Marginal Distributions for Discrete Random Variables
- Independence of Discrete Random Variables
- Conditional Distributions for Discrete Random Variables
- The Joint CDF of Two Discrete Random Variables

#### 11.41 Distributions of Two Continuous Random Variables
- Joint Distributions for Continuous Random Variables
- Marginal Distributions for Continuous Random Variables
- Independence of Continuous Random Variables
- Conditional Distributions for Continuous Random Variables
- The Joint CDF of Two Continuous Random Variables
- Properties of the Joint CDF of Two Continuous Random Variables

#### 11.42 Expectation for Joint Distributions
- Expected Values of Sums and Products of Random Variables
- Variance of Sums of Independent Random Variables
- Computing Expected Values From Joint Distributions
- Conditional Expectation for Discrete Random Variables
- Conditional Variance for Discrete Random Variables
- Conditional Expectation for Continuous Random Variables
- Conditional Variance for Continuous Random Variables
- The Rule of the Lazy Statistician for Two Random Variables

#### 11.43 Covariance of Random Variables
- The Covariance of Two Random Variables
- Variance of Sums of Random Variables
- The Correlation Coefficient for Two Random Variables
- The Covariance Matrix

#### 11.44 Normally Distributed Random Variables
- Normal Approximations of Binomial Distributions
- Combining Two Normally Distributed Random Variables
- Combining Multiple Normally Distributed Random Variables
- I.I.D Normal Random Variables
- The Bivariate Normal Distribution

### Unit 12: Point Estimation and Inference

#### 12.45 Point Estimation
- The Sample Mean
- Sampling Distributions
- Variance of Sample Means
- The Sample Variance
- Sample Means From Normal Populations
- The Central Limit Theorem
- Sampling Proportions From Finite Populations
- Point Estimates of Population Proportions
- The Sample Covariance Matrix

#### 12.46 Maximum Likelihood
- Product Notation
- Logarithmic Differentiation
- Likelihood Functions for Discrete Probability Distributions
- Log-Likelihood Functions for Discrete Probability Distributions
- Likelihood Functions for Continuous Probability Distributions
- Log-Likelihood Functions for Continuous Probability Distributions
- Maximum Likelihood Estimation

#### 12.47 Confidence Intervals
- Confidence Intervals for One Mean: Known Population Variance
- Confidence Intervals for One Mean: Unknown Population Variance
- Confidence Intervals for One Proportion
- Confidence Intervals for Two Means: Known and Unequal Population Variances
- Confidence Intervals for Linear Regression Slope Parameters
- Confidence Intervals for Linear Regression Intercept Parameters
