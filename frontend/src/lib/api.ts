// API client — works with both static JSON files and FastAPI backend.
// Static mode: fetches from /api/tiers.json, /api/tiers/{tier}/{slug}.json
// Backend mode: fetches from http://localhost:8000/api/tiers, etc.
//
// Set VITE_API_URL to use backend mode. Unset (default) = static mode.

const API_BASE = import.meta.env.VITE_API_URL ?? "";
const IS_STATIC = !API_BASE;
const BASE_PATH = import.meta.env.BASE_URL ?? "/";

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

export async function fetchTiers(): Promise<TierInfo[]> {
  const url = IS_STATIC
    ? `${BASE_PATH}api/tiers.json`
    : `${API_BASE}/api/tiers`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch tiers");
  return res.json();
}

export async function fetchLesson(
  tier: string,
  slug: string
): Promise<LessonContent> {
  const url = IS_STATIC
    ? `${BASE_PATH}api/tiers/${tier}/${slug}.json`
    : `${API_BASE}/api/tiers/${tier}/${slug}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Lesson not found");
  return res.json();
}

export async function fetchLessonMeta(
  tier: string,
  slug: string
): Promise<LessonMeta> {
  const url = IS_STATIC
    ? `${BASE_PATH}api/tiers/${tier}/${slug}.meta.json`
    : `${API_BASE}/api/tiers/${tier}/${slug}/meta`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Metadata not found");
  return res.json();
}
