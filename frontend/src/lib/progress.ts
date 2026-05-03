const STORAGE_KEY = "maths-for-cs-progress";

export interface DrillScore {
  correct: number;
  total: number;
  ts: number; // last update, ms since epoch
}

export interface Progress {
  completed: Record<string, boolean>; // "tier-0/01-number-systems" → true
  drills?: Record<string, DrillScore>; // "tier/slug#widgetId" → score
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

function drillKey(tier: string, slug: string, widgetId: string): string {
  return `${tier}/${slug}#${widgetId}`;
}

export function recordDrillScore(
  tier: string,
  slug: string,
  widgetId: string,
  correct: number,
  total: number,
): void {
  const p = load();
  const drills = p.drills ?? {};
  drills[drillKey(tier, slug, widgetId)] = { correct, total, ts: Date.now() };
  p.drills = drills;
  save(p);
}

export function getDrillScore(
  tier: string,
  slug: string,
  widgetId: string,
): DrillScore | null {
  const drills = load().drills;
  return drills?.[drillKey(tier, slug, widgetId)] ?? null;
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
