import { createSignal, createResource, For, Show, onCleanup } from "solid-js";
import { A } from "@solidjs/router";

interface SearchEntry {
  tier: string;
  slug: string;
  title: string;
  sections: string[];
  text: string;
}

const TIER_LABELS: Record<string, string> = {
  "foundation-1": "F1", "foundation-2": "F2", "foundation-3": "F3", "foundation-4": "F4",
  "tier-0": "T0", "tier-1": "T1", "tier-2": "T2", "tier-3": "T3", "tier-4": "T4",
  "tier-5": "T5", "tier-6": "T6", "tier-7": "T7", "tier-8": "T8", "tier-9": "T9",
  "tier-10": "T10", "tier-11": "T11", "tier-12": "T12", "tier-13": "T13",
  "tier-14": "T14", "tier-15": "T15", "tier-16": "T16",
  "supplementary-graphs": "SG", "supplementary-activations": "SA",
  "supplementary-foundations": "SF", "supplementary-applied": "SM",
};

async function fetchSearchIndex(): Promise<SearchEntry[]> {
  const base = import.meta.env.BASE_URL ?? "/";
  const res = await fetch(`${base}api/search-index.json`);
  if (!res.ok) return [];
  return res.json();
}

function searchLessons(index: SearchEntry[], query: string): SearchEntry[] {
  if (!query.trim()) return [];
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  const scored = index.map(entry => {
    const titleLower = entry.title.toLowerCase();
    const textLower = entry.text.toLowerCase();
    const sectionsLower = entry.sections.join(" ").toLowerCase();

    let score = 0;
    let allMatch = true;

    for (const term of terms) {
      const inTitle = titleLower.includes(term);
      const inSections = sectionsLower.includes(term);
      const inText = textLower.includes(term);

      if (!inTitle && !inSections && !inText) {
        allMatch = false;
        break;
      }

      // Title matches score highest
      if (inTitle) score += 10;
      if (inSections) score += 5;
      if (inText) score += 1;
    }

    return { entry, score, allMatch };
  });

  return scored
    .filter(s => s.allMatch && s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 15)
    .map(s => s.entry);
}

export default function SearchBar() {
  const [index] = createResource(fetchSearchIndex);
  const [query, setQuery] = createSignal("");
  const [focused, setFocused] = createSignal(false);
  let inputRef: HTMLInputElement | undefined;

  const results = () => {
    const idx = index();
    if (!idx) return [];
    return searchLessons(idx, query());
  };

  // Close on click outside
  function handleClickOutside(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!target.closest(".search-container")) {
      setFocused(false);
    }
  }

  // Keyboard shortcut: Ctrl+K or / to focus search
  function handleKeyDown(e: KeyboardEvent) {
    if ((e.ctrlKey && e.key === "k") || (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA")) {
      e.preventDefault();
      inputRef?.focus();
      setFocused(true);
    }
    if (e.key === "Escape") {
      setFocused(false);
      inputRef?.blur();
    }
  }

  if (typeof window !== "undefined") {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    onCleanup(() => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    });
  }

  return (
    <div class="search-container">
      <div class="search-input-wrapper">
        <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          ref={inputRef}
          type="text"
          class="search-input"
          placeholder="Search lessons... (Ctrl+K)"
          value={query()}
          onInput={(e) => { setQuery(e.currentTarget.value); setFocused(true); }}
          onFocus={() => setFocused(true)}
        />
        <Show when={query()}>
          <button class="search-clear" onClick={() => { setQuery(""); inputRef?.focus(); }}>
            &times;
          </button>
        </Show>
      </div>
      <Show when={focused() && results().length > 0}>
        <div class="search-results">
          <For each={results()}>
            {(result) => (
              <A
                href={`/lesson/${result.tier}/${result.slug}`}
                class="search-result"
                onClick={() => { setFocused(false); setQuery(""); }}
              >
                <span class="search-result-tier">{TIER_LABELS[result.tier] ?? result.tier}</span>
                <span class="search-result-title">{result.title}</span>
              </A>
            )}
          </For>
        </div>
      </Show>
      <Show when={focused() && query().trim() && results().length === 0 && index()}>
        <div class="search-results">
          <div class="search-no-results">No lessons found</div>
        </div>
      </Show>
    </div>
  );
}
