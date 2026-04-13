const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export interface TierInfo {
  tier: string;
  title: string;
  lessons: string[];
}

export interface LessonContent {
  tier: string;
  slug: string;
  filename: string;
  content: string;
}

export async function fetchTiers(): Promise<TierInfo[]> {
  const res = await fetch(`${API_BASE}/api/tiers`);
  if (!res.ok) throw new Error("Failed to fetch tiers");
  return res.json();
}

export async function fetchLesson(
  tier: string,
  slug: string
): Promise<LessonContent> {
  const res = await fetch(`${API_BASE}/api/tiers/${tier}/${slug}`);
  if (!res.ok) throw new Error("Lesson not found");
  return res.json();
}

export interface Prerequisite {
  tier: string;
  lesson_num: string;
  description: string;
  slug: string | null;
}

export interface LessonMeta {
  tier: string;
  slug: string;
  title: string;
  prerequisites: Prerequisite[];
  sections: string[];
}

export async function fetchLessonMeta(
  tier: string,
  slug: string
): Promise<LessonMeta> {
  const res = await fetch(`${API_BASE}/api/tiers/${tier}/${slug}/meta`);
  if (!res.ok) throw new Error("Metadata not found");
  return res.json();
}
