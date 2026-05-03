import { For, Show, type Component } from "solid-js";

interface PointSpec {
  x: number;
  y: number;
  label?: string;
}

interface SegmentSpec {
  /** Indices into the `points` array. */
  from: number;
  to: number;
  /** Optional length label. */
  label?: string;
}

interface LineSpec {
  /** y = slope · x + intercept */
  slope: number;
  intercept: number;
  label?: string;
}

interface PolygonSpec {
  /** Indices into the `points` array, in order. The polygon closes back to `points[0]`. */
  vertices: number[];
  /** Optional fill colour reference (uses CSS variables for theme support). */
  fill?: "accent" | "muted" | "none";
  label?: string;
}

interface Props {
  points?: PointSpec[];
  segments?: SegmentSpec[];
  lines?: LineSpec[];
  polygons?: PolygonSpec[];
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
  /** Show major-tick numeric labels on axes. */
  showLabels?: boolean;
  /** Pixel width of the SVG. */
  width?: number;
  height?: number;
}

const CoordinatePlane: Component<Props> = (props) => {
  const xMin = () => props.xMin ?? -5;
  const xMax = () => props.xMax ?? 5;
  const yMin = () => props.yMin ?? -5;
  const yMax = () => props.yMax ?? 5;
  const showLabels = () => props.showLabels ?? true;
  const W = () => props.width ?? 360;
  const H = () => props.height ?? 360;

  // Map data coordinates to SVG pixel coordinates.
  // SVG y is inverted (down = positive).
  const px = (x: number) => ((x - xMin()) / (xMax() - xMin())) * W();
  const py = (y: number) => H() - ((y - yMin()) / (yMax() - yMin())) * H();

  // Major tick positions: every integer.
  const xTicks = () => {
    const ticks: number[] = [];
    for (let i = Math.ceil(xMin()); i <= Math.floor(xMax()); i++) ticks.push(i);
    return ticks;
  };
  const yTicks = () => {
    const ticks: number[] = [];
    for (let i = Math.ceil(yMin()); i <= Math.floor(yMax()); i++) ticks.push(i);
    return ticks;
  };

  const points = () => props.points ?? [];
  const segments = () => props.segments ?? [];
  const lines = () => props.lines ?? [];
  const polygons = () => props.polygons ?? [];

  return (
    <div style="text-align: center">
      <svg
        width={W()}
        height={H()}
        viewBox={`0 0 ${W()} ${H()}`}
        style="max-width: 100%; height: auto"
        role="img"
      >
        {/* Light grid lines */}
        <For each={xTicks()}>
          {(t) => (
            <line
              x1={px(t)}
              y1={0}
              x2={px(t)}
              y2={H()}
              style="stroke: var(--border); stroke-width: 0.5"
            />
          )}
        </For>
        <For each={yTicks()}>
          {(t) => (
            <line
              x1={0}
              y1={py(t)}
              x2={W()}
              y2={py(t)}
              style="stroke: var(--border); stroke-width: 0.5"
            />
          )}
        </For>

        {/* Axes */}
        <Show when={yMin() <= 0 && yMax() >= 0}>
          <line
            x1={0}
            y1={py(0)}
            x2={W()}
            y2={py(0)}
            style="stroke: var(--text-muted); stroke-width: 1.5"
          />
        </Show>
        <Show when={xMin() <= 0 && xMax() >= 0}>
          <line
            x1={px(0)}
            y1={0}
            x2={px(0)}
            y2={H()}
            style="stroke: var(--text-muted); stroke-width: 1.5"
          />
        </Show>

        {/* Axis labels */}
        <Show when={showLabels()}>
          <For each={xTicks()}>
            {(t) => (
              <Show when={t !== 0 || (xMin() > 0 || xMax() < 0)}>
                <text
                  x={px(t)}
                  y={py(0) + 14}
                  text-anchor="middle"
                  font-size="10"
                  style="fill: var(--text-muted)"
                >
                  {t}
                </text>
              </Show>
            )}
          </For>
          <For each={yTicks()}>
            {(t) => (
              <Show when={t !== 0 || (yMin() > 0 || yMax() < 0)}>
                <text
                  x={px(0) - 6}
                  y={py(t) + 3}
                  text-anchor="end"
                  font-size="10"
                  style="fill: var(--text-muted)"
                >
                  {t}
                </text>
              </Show>
            )}
          </For>
        </Show>

        {/* Polygons (drawn first so segments/points overlay) */}
        <For each={polygons()}>
          {(poly) => {
            const pts = poly.vertices
              .map((i) => points()[i])
              .filter((p) => p !== undefined);
            const pathD = pts
              .map((p, i) => `${i === 0 ? "M" : "L"} ${px(p.x)} ${py(p.y)}`)
              .join(" ") + " Z";
            const fill =
              poly.fill === "accent"
                ? "var(--accent)"
                : poly.fill === "muted"
                  ? "var(--text-muted)"
                  : "none";
            const opacity = poly.fill === "none" ? "1" : "0.18";
            return (
              <path
                d={pathD}
                style={`fill: ${fill}; fill-opacity: ${opacity}; stroke: var(--accent); stroke-width: 1.5`}
              />
            );
          }}
        </For>

        {/* Lines (extended across the visible range) */}
        <For each={lines()}>
          {(ln) => {
            const x1 = xMin();
            const x2 = xMax();
            const y1 = ln.slope * x1 + ln.intercept;
            const y2 = ln.slope * x2 + ln.intercept;
            return (
              <line
                x1={px(x1)}
                y1={py(y1)}
                x2={px(x2)}
                y2={py(y2)}
                style="stroke: var(--accent); stroke-width: 2"
              />
            );
          }}
        </For>

        {/* Segments */}
        <For each={segments()}>
          {(seg) => {
            const a = points()[seg.from];
            const b = points()[seg.to];
            if (!a || !b) return null;
            return (
              <>
                <line
                  x1={px(a.x)}
                  y1={py(a.y)}
                  x2={px(b.x)}
                  y2={py(b.y)}
                  style="stroke: var(--accent); stroke-width: 2"
                />
                <Show when={seg.label}>
                  <text
                    x={(px(a.x) + px(b.x)) / 2 + 6}
                    y={(py(a.y) + py(b.y)) / 2 - 6}
                    font-size="11"
                    style="fill: var(--accent); font-weight: 600"
                  >
                    {seg.label}
                  </text>
                </Show>
              </>
            );
          }}
        </For>

        {/* Points */}
        <For each={points()}>
          {(p) => (
            <>
              <circle
                cx={px(p.x)}
                cy={py(p.y)}
                r={4}
                style="fill: var(--accent); stroke: var(--card-bg); stroke-width: 1.5"
              />
              <Show when={p.label}>
                <text
                  x={px(p.x) + 8}
                  y={py(p.y) - 8}
                  font-size="11"
                  style="fill: var(--text); font-weight: 600"
                >
                  {p.label}
                </text>
              </Show>
            </>
          )}
        </For>
      </svg>
    </div>
  );
};

export default CoordinatePlane;
