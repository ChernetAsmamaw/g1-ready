// Small geometry helpers for signs that need clipped patterns. Clipping is
// done in code (not with SVG clipPath ids) so many copies of a sign can sit
// on one page without id clashes.

type Pt = [number, number];

/** Sutherland-Hodgman clip of a polygon to an axis-aligned rectangle. */
export function clipToRect(poly: Pt[], x0: number, y0: number, x1: number, y1: number): Pt[] {
  const edges: [(p: Pt) => boolean, (a: Pt, b: Pt) => Pt][] = [
    [(p) => p[0] >= x0, (a, b) => [x0, a[1] + ((b[1] - a[1]) * (x0 - a[0])) / (b[0] - a[0])]],
    [(p) => p[0] <= x1, (a, b) => [x1, a[1] + ((b[1] - a[1]) * (x1 - a[0])) / (b[0] - a[0])]],
    [(p) => p[1] >= y0, (a, b) => [a[0] + ((b[0] - a[0]) * (y0 - a[1])) / (b[1] - a[1]), y0]],
    [(p) => p[1] <= y1, (a, b) => [a[0] + ((b[0] - a[0]) * (y1 - a[1])) / (b[1] - a[1]), y1]],
  ];
  let out = poly;
  for (const [inside, cross] of edges) {
    const input = out;
    out = [];
    for (let i = 0; i < input.length; i++) {
      const cur = input[i];
      const prev = input[(i + input.length - 1) % input.length];
      if (inside(cur)) {
        if (!inside(prev)) out.push(cross(prev, cur));
        out.push(cur);
      } else if (inside(prev)) {
        out.push(cross(prev, cur));
      }
    }
    if (!out.length) break;
  }
  return out;
}

export const pts = (p: Pt[]) => p.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

/** Diagonal stripes (falling to the right) clipped to a rectangle. */
export function stripes(x0: number, y0: number, x1: number, y1: number, band: number): string[] {
  const h = y1 - y0;
  const w = x1 - x0;
  const out: string[] = [];
  for (let k = -Math.ceil(w / band) - 2; k * band < h + w; k += 2) {
    const a = y0 + k * band;
    const poly: Pt[] = [[x0, a], [x1, a + w], [x1, a + w + band], [x0, a + band]];
    const c = clipToRect(poly, x0, y0, x1, y1);
    if (c.length >= 3) out.push(pts(c));
  }
  return out;
}
