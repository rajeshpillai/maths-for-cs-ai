// Mulberry32 — small fast PRNG with good distribution for drill purposes.
// Seeded from a 32-bit integer; deterministic across runs.
function mulberry32(seed: number) {
  let s = seed >>> 0;
  return function rand(): number {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randInt(rng: () => number, lo: number, hi: number): number {
  // inclusive on both ends
  return lo + Math.floor(rng() * (hi - lo + 1));
}

export interface Problem {
  prompt: string;
  answer: number;
}

export type Generator = (rng: () => number) => Problem;

// Named generators. Add to this map as new lessons need new drill flavors.
const GENERATORS: Record<string, Generator> = {
  // Two two-digit numbers, no constraint on carry. Bread-and-butter mental
  // addition practice.
  "add-2digit": (rng) => {
    const a = randInt(rng, 10, 99);
    const b = randInt(rng, 10, 99);
    return { prompt: `${a} + ${b}`, answer: a + b };
  },

  // Two-digit subtraction guaranteed non-negative. Useful as a follow-on to
  // add-2digit so the learner builds both directions in one session.
  "sub-2digit": (rng) => {
    const a = randInt(rng, 20, 99);
    const b = randInt(rng, 10, a);
    return { prompt: `${a} − ${b}`, answer: a - b };
  },

  // Standard times tables 2..12, both factors random. Forces the full table
  // rather than drilling a single row.
  "mult-table-mixed": (rng) => {
    const a = randInt(rng, 2, 12);
    const b = randInt(rng, 2, 12);
    return { prompt: `${a} × ${b}`, answer: a * b };
  },

  // 7 × n for n in [2,12]. Single-row drill — useful when a learner is
  // building fluency on a specific table.
  "mult-table-7": (rng) => {
    const n = randInt(rng, 2, 12);
    return { prompt: `7 × ${n}`, answer: 7 * n };
  },

  // Exact division: (a*b) / a so the answer is always an integer.
  "divide-exact-mixed": (rng) => {
    const a = randInt(rng, 2, 12);
    const q = randInt(rng, 2, 12);
    return { prompt: `${a * q} ÷ ${a}`, answer: q };
  },

  // Divisibility-by-3 yes/no — answer 1 for divisible, 0 for not.
  // Drills the digit-sum rule.
  "divisibility-by-3": (rng) => {
    const n = randInt(rng, 100, 999);
    return {
      prompt: `Is ${n} divisible by 3?  (1 = yes, 0 = no)`,
      answer: n % 3 === 0 ? 1 : 0,
    };
  },
};

export function listGenerators(): string[] {
  return Object.keys(GENERATORS);
}

export function generateProblems(
  name: string,
  count: number,
  seed: number,
): Problem[] {
  const gen = GENERATORS[name];
  if (!gen) throw new Error(`unknown drill generator: ${name}`);
  const rng = mulberry32(seed);
  return Array.from({ length: count }, () => gen(rng));
}
