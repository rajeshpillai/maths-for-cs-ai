# Joseph Ray and "Ray's Arithmetic" — Reference Notes

> **Status: scratch / research notes.** Not part of the live curriculum. Lives
> in `classical-references/` so the static-site builder (which scans `tutorials/`) ignores it.
> Captured here for possible future use as inspiration for a mental-arithmetic
> or commerce-flavoured word-problem track.

---

## Bio

**Joseph Ray** (1807–1855) was an American physician, educator, and
mathematician based in Cincinnati, Ohio. He was Professor of Mathematics at
Woodward College (later Woodward High School) and authored what became the
single most-influential American school mathematics series of the
mid-19th century: the **"Eclectic Educational Series"** of arithmetics,
algebras, and geometries published by Winthrop B. Smith & Co. (later Wilson,
Hinkle & Co. and ultimately Van Antwerp, Bragg & Co.).

By the 1880s, Ray's books had sold over **120 million copies** in the United
States and were standard issue in one-room schoolhouses across the country.
They shaped how multiple generations of Americans first encountered algebra,
arithmetic, and geometry. Their pedagogy is markedly different from modern
school maths in ways that are worth re-examining.

---

## The Ray's Series — canonical book list

The series was structured as a **graded ladder** from beginner to teacher-
training level. Most titles went through many revisions; here is the
canonical lineup as taught in the late 19th century:

### Arithmetic ladder

1. **Ray's Primary Arithmetic** (also published as **"First Book of
   Arithmetic"**)
   — counting, basic addition / subtraction / multiplication / division on
   small numbers. Heavy use of pictures and concrete objects.

2. **Ray's Intellectual Arithmetic** (also called **"Mental Arithmetic"**)
   — Ray's most distinctive book. Pure mental-arithmetic drill: no pen and
   paper allowed. Problems read aloud and solved entirely in the head.
   Strongly Socratic, with each problem building on the previous.

3. **Ray's Practical Arithmetic** (also called **"New Practical
   Arithmetic"**)
   — written arithmetic on larger numbers; fractions, decimals,
   percentages, simple and compound interest, discount, ratio and
   proportion, mensuration (areas / volumes), denominate numbers (units of
   currency, weight, length).

4. **Ray's Higher Arithmetic** (also **"New Higher Arithmetic"**)
   — capstone arithmetic: number theory (primes, factoring, GCD/LCM),
   square and cube roots by hand, advanced commercial calculations
   (annuities, exchange, alligation), more rigorous treatment of ratios.

### Algebra ladder

5. **Ray's Elementary Algebra** (Algebra Part First, **"New Elementary
   Algebra"**)
   — introduces the variable, signed numbers, simple equations, factoring,
   simultaneous equations.

6. **Ray's Higher Algebra** (Algebra Part Second, **"New Higher Algebra"**)
   — quadratics, the binomial theorem, sequences and series, logarithms,
   theory of equations (Descartes' rule, Sturm's theorem at the upper
   end), continued fractions.

### Geometry / trigonometry / surveying ladder

7. **Ray's Plane and Solid Geometry** (often co-credited with Eli Howard or
   Chauncey Hickox)
   — Euclidean geometry in the classical synthetic tradition.

8. **Ray's Geometry and Trigonometry** / **Ray's Surveying and
   Navigation** (later editions)
   — analytic and applied geometry, navigation problems, surveying
   computations.

There were also **teacher's editions** (with answer keys and
methodological notes), **"test books"** of additional drill problems, and
ancillary reference cards.

---

## Pedagogical signature

Ray's books have a recognisable house style. Five characteristics stand out:

### 1. Mental arithmetic as the primary skill

**Intellectual Arithmetic** treats mental computation as the foundation,
not an enrichment activity. Children were expected to do double-digit
multiplication, fraction operations, and percentage problems entirely in
their head before ever picking up a pencil. The "intellectual" track was a
prerequisite for the written arithmetic that came later.

The pedagogical bet: if a child can hold a problem in working memory and
manipulate it cleanly, the later move to symbolic / written manipulation
is trivial. The reverse — going from paper-and-pencil habits to mental
fluency — is much harder.

### 2. Drill, drill, drill

Each section is followed by 30–100+ problems of the same type, escalating
in difficulty. There is **no expectation that students attempt only a few
representative problems**; the design assumes they grind through dozens.

Spacing and interleaving (in the modern cognitive-science sense) appear
implicitly — old problem types reappear in mixed sets, ensuring retrieval
practice without naming it as such.

### 3. Commerce-flavoured word problems

The dominant context for word problems is **everyday commerce of the
19th-century United States**: buying and selling goods, computing simple
and compound interest, applying discounts, exchanging currencies (when
multiple regional currencies existed), measuring lots of land, computing
the cost of carpeting a room, shipping freight.

Many problems would be considered **vocational** today. Examples (in
Ray's style, paraphrased — not verbatim):

- "A merchant bought 240 yards of cloth at 75 cents per yard. He sold it
  at a 20% mark-up. What was his total profit?"
- "A father is 4 times as old as his son. In 10 years, he will be 2½
  times as old. How old are they now?"
- "How many bricks 8 inches by 4 inches by 2 inches are required to build
  a wall 30 feet long, 10 feet high, and 1 foot thick?"

This framing is striking by modern standards — the problems are
**concrete, immediately useful, and rooted in adult life** rather than in
contrived puzzle-context.

### 4. Socratic / catechetical structure

Sections are structured as questions and answers: a definition, then a
series of questions designed to elicit the definition back from the
student, then problems. Many problem sets have an explicit "preliminary
questions" section before the drills, where the student rehearses the
underlying concepts in dialogue form.

Modern textbooks have largely abandoned this "Q-and-A" presentation;
Ray's books use it relentlessly.

### 5. Compactness of explanation, density of practice

A new technique gets ~½ to 1 page of exposition. The remainder of the
section is problems. The ratio of "explanation" to "practice" is **roughly
1:10 by page count**, the inverse of most modern textbooks where it is
closer to 5:1 in the other direction.

This bet — that you learn maths primarily by doing it, not by reading
about it — has fallen out of fashion but has solid empirical support
in the cognitive-science literature on retrieval practice and overlearning.

---

## Where the books live

All of Ray's books are **public domain** in the United States. Scans are
freely available:

- **Internet Archive** (archive.org) — search for "Ray's Arithmetic",
  "Ray's Algebra", "Joseph Ray".  Multiple editions of each book are
  scanned in full, often with OCR'd text alongside the page images.
- **Google Books** — most editions are searchable and partially
  previewable; some are downloadable as PDFs.
- **Library of Congress** — selected first editions in the digital
  collections.
- Reprints by **Mott Media** and others — modern paperback reprints of
  the most popular volumes (Primary, Intellectual, Practical) are still
  in print and used in some homeschool curricula.

Search hint for high-fidelity scans: append `1880` or `1881` to the title
to get late editions, which tend to have the cleanest typography.

---

## How this could be used in this project

These are **ideas, not commitments**:

1. **Mental-arithmetic supplementary track.** A new directory under
   `tutorials/07-supplementary/supplementary-mental-math/` with 8–12
   lessons modelled on **Ray's Intellectual Arithmetic** — problems
   designed to be solved without pen and paper, organised by technique
   (doubling and halving, near-multiples-of-10, distributive shortcuts,
   percentage tricks). Would address the gap left when we deferred the
   `ref/` W1A/W1B mental-math workouts.

2. **Commerce-flavoured word problems for Foundation 1.** Augment the
   existing Foundation 1 algebra lessons with a problem set inspired by
   Ray's "Practical Arithmetic" — interest, discount, ratio, mensuration.
   Concrete and immediately applicable.

3. **Mensuration sub-track.** Ray's treatment of **areas and volumes of
   real objects** (rooms, floors, walls, fences, kegs) is more practical
   than the current curriculum's coverage. Could become a small set of
   lessons under Classical Geometry or Foundation 2.

4. **Intentional drill density.** A pattern: take an existing lesson with
   3 "Check Your Understanding" problems and produce a paired
   `<lesson>-drill.md` with 30+ problems of the same type. Would test
   whether the modern "few problems" pedagogy or Ray's "many problems"
   pedagogy plays better in a Pyodide-backed digital format.

5. **Q-and-A framing experiment.** Try one lesson written in Ray's
   catechetical style (definitions and questions) versus the current
   "Intuition → Derivation → Code" template. See which the student
   prefers.

None of these are committed work. They are bookmarked here so the next
time we want to expand the curriculum, we have a coherent inspiration to
draw from rather than starting from a blank page.

---

## Caveats

- I (the assistant writing this document) have **general knowledge** of
  Ray's books from training data but **cannot reliably quote pages
  verbatim**. Any actual problem text here is paraphrased in Ray's
  *style*, not copied from his books. For accurate transcription, the
  user should download scans from Internet Archive.
- Some of Ray's content reflects the social attitudes and economic
  assumptions of mid-19th-century America (e.g. references to
  agricultural-economy units, occasional period-appropriate language).
  Adapting his pedagogy does not mean adopting his historical context.
- The "120 million copies" figure cited above is the commonly-quoted
  estimate for total Ray's series sales; sources vary. Treat it as
  "tens of millions, definitely; over 100 million, very plausibly".

---

## Quick adjacency to existing curriculum

| Ray's book | Closest existing tier(s) | Notes |
|---|---|---|
| Primary Arithmetic | Foundation 1 (algebra basics) | Lower level than Foundation 1; would need a "Foundation 0" entry point. |
| Intellectual Arithmetic | (no current home) | Mental-math track gap — biggest opportunity. |
| Practical Arithmetic | Foundation 1, Tier 0 (number systems) | Algebra + commerce + mensuration in one. |
| Higher Arithmetic | Tier 0 + Tier 13 (number theory) | Square / cube roots by hand; primes; advanced commercial computations. |
| Elementary Algebra | Foundation 1, Foundation 3 | Largely covered. |
| Higher Algebra | Foundation 3, Tier 4 | Sequences, binomial, logs already present. |
| Plane / Solid Geometry | Classical Geometry (new sub-tier we just added) | Strong overlap — could add 3D solid-geometry lessons. |
| Geometry & Trigonometry | Foundation 2, Tier 8 | Already covered for graphics; Ray's bent is more navigational. |
| Surveying & Navigation | (no current home) | Niche — only worth adding if we want an applied / vocational track. |
