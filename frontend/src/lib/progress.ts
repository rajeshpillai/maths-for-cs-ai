const STORAGE_KEY = "maths-for-cs-progress";

export interface Progress {
  completed: Record<string, boolean>; // "tier-0/01-number-systems" → true
}

function load(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { completed: {} };
}

function save(p: Progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export function isCompleted(tier: string, slug: string): boolean {
  return load().completed[`${tier}/${slug}`] === true;
}

export function toggleCompleted(tier: string, slug: string): boolean {
  const p = load();
  const key = `${tier}/${slug}`;
  p.completed[key] = !p.completed[key];
  if (!p.completed[key]) delete p.completed[key];
  save(p);
  return p.completed[key] ?? false;
}

export function getCompletedCount(tier: string, lessons: string[]): number {
  const p = load();
  return lessons.filter((l) => p.completed[`${tier}/${l}`]).length;
}

export function getTotalCompleted(): number {
  return Object.keys(load().completed).length;
}
