import type { Component } from "solid-js";

// Registered widget types. Keep this map in sync with `:::widget type=...`
// directives used in lesson markdown. Components are lazy-loaded so adding
// a widget doesn't grow the initial bundle for lessons that don't use it.
export const WIDGETS: Record<string, () => Promise<{ default: Component<any> }>> = {
  "numeric-input": () => import("./numeric-input"),
  "mental-drill": () => import("./mental-drill"),
  "base-converter": () => import("./base-converter"),
  "fraction-visual": () => import("./fraction-visual"),
  "step-revealer": () => import("./step-revealer"),
  "probability-sim": () => import("./probability-sim"),
};

export type WidgetType = keyof typeof WIDGETS;

export function isKnownWidget(type: string): type is WidgetType {
  return type in WIDGETS;
}
