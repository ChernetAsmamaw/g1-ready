// SVG drawing kit for Ontario road signs. Every sign is drawn in a
// 200 x 200 viewBox. Colours follow the sign standards, not the app theme,
// because signs are physical objects and must look the same in dark mode.
import type { ReactNode } from 'react';

export const C = {
  black: '#111111',
  white: '#FFFFFF',
  yellow: '#FFCD00',
  orange: '#F47920',
  red: '#C8102E',
  green: '#006B3F',
  blue: '#1D4F9C',
  fyg: '#C8E62E', // fluorescent yellow-green (school signs)
  brown: '#6B3F22',
  grey: '#3A3F47',
  asphalt: '#4A4F57',
  lane: '#F2F2F2',
  lineYellow: '#F5C400',
  dim: '#2B2B2B',
};

const FONT = "Overpass, 'Arial Narrow', Arial, sans-serif";

// ---------- Plates ----------
export const Diamond = ({ fill = C.yellow, children }: { fill?: string; children?: ReactNode }) => (
  <g>
    <rect x="32" y="32" width="136" height="136" rx="11" transform="rotate(45 100 100)" fill={fill} stroke={C.black} strokeWidth="1.5" />
    <rect x="39" y="39" width="122" height="122" rx="7" transform="rotate(45 100 100)" fill="none" stroke={C.black} strokeWidth="4" />
    {children}
  </g>
);

export const Plate = ({ x = 22, y = 22, w = 156, h = 156, fill = C.white, border = C.black, rx = 10, children }:
  { x?: number; y?: number; w?: number; h?: number; fill?: string; border?: string; rx?: number; children?: ReactNode }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={C.black} strokeWidth="1.5" />
    <rect x={x + 5} y={y + 5} width={w - 10} height={h - 10} rx={Math.max(rx - 4, 2)} fill="none" stroke={border} strokeWidth="3.5" />
    {children}
  </g>
);

export const Pentagon = ({ fill = C.fyg, children, scale = 1, ty = 0 }: { fill?: string; children?: ReactNode; scale?: number; ty?: number }) => (
  <g transform={`translate(${100 - 100 * scale} ${ty}) scale(${scale})`}>
    <path d="M100 8 L188 74 L188 190 L12 190 L12 74 Z" fill={fill} stroke={C.black} strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M100 18 L180 78 L180 182 L20 182 L20 78 Z" fill="none" stroke={C.black} strokeWidth="4" strokeLinejoin="round" />
    {children}
  </g>
);

export function octagonPoints(cx: number, cy: number, r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 8; i++) {
    const a = ((22.5 + i * 45) * Math.PI) / 180;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(' ');
}

export const Octagon = ({ cx = 100, cy = 100, r = 94, text = 'STOP', size = 54 }: { cx?: number; cy?: number; r?: number; text?: string; size?: number }) => (
  <g>
    <polygon points={octagonPoints(cx, cy, r)} fill={C.red} />
    <polygon points={octagonPoints(cx, cy, r * 0.9)} fill="none" stroke={C.white} strokeWidth={r * 0.045} />
    {text && <T x={cx} y={cy + size * 0.36} s={size} fill={C.white} w={800}>{text}</T>}
  </g>
);

/** Red prohibition ring with a slash from upper-left to lower-right. */
export const NoRing = ({ cx = 100, cy = 100, r = 62, w = 13 }: { cx?: number; cy?: number; r?: number; w?: number }) => {
  const d = r * 0.707;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.red} strokeWidth={w} />
      <line x1={cx - d} y1={cy - d} x2={cx + d} y2={cy + d} stroke={C.red} strokeWidth={w} />
    </g>
  );
};

export const GreenRing = ({ cx = 100, cy = 100, r = 62, w = 13 }: { cx?: number; cy?: number; r?: number; w?: number }) => (
  <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.green} strokeWidth={w} />
);

/** Sign text. Long lines are squeezed to `max` width so they never spill off the sign, whatever font loads. */
export const T = ({ x, y, s, children, fill = C.black, w = 700, ls = 0, anchor = 'middle', max = 118 }:
  { x: number; y: number; s: number; children: ReactNode; fill?: string; w?: number; ls?: number; anchor?: 'middle' | 'start' | 'end'; max?: number }) => {
  const len = typeof children === 'string' ? children.length : 0;
  const est = len * s * (w >= 800 ? 0.64 : 0.6);
  const squeeze = len > 1 && est > max;
  return (
    <text x={x} y={y} fontSize={s} fill={fill} fontFamily={FONT} fontWeight={w} textAnchor={anchor} letterSpacing={ls}
      textLength={squeeze ? max : undefined} lengthAdjust={squeeze ? 'spacingAndGlyphs' : undefined}>{children}</text>
  );
};

// ---------- Arrows ----------
/** A stroked path that ends in a solid arrowhead at (x, y) pointing at angle a (degrees, 0 = right, -90 = up). */
export const Arrow = ({ d, x, y, a, w = 16, hl = 30, hw = 44, c = C.black }:
  { d: string; x: number; y: number; a: number; w?: number; hl?: number; hw?: number; c?: string }) => {
  const r = (a * Math.PI) / 180;
  const dx = Math.cos(r);
  const dy = Math.sin(r);
  const tip = [x + dx * hl, y + dy * hl];
  const p1 = [x - dy * (hw / 2), y + dx * (hw / 2)];
  const p2 = [x + dy * (hw / 2), y - dx * (hw / 2)];
  return (
    <g>
      <path d={d} stroke={c} strokeWidth={w} fill="none" strokeLinejoin="round" />
      <polygon points={`${tip[0]},${tip[1]} ${p1[0]},${p1[1]} ${p2[0]},${p2[1]}`} fill={c} />
    </g>
  );
};

// ---------- Pictograms ----------
export const Person = ({ x = 100, y = 100, s = 1, c = C.black, flip = false }: { x?: number; y?: number; s?: number; c?: string; flip?: boolean }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} stroke={c} strokeLinecap="round" strokeLinejoin="round" fill="none">
    <circle cx="2" cy="-38" r="9" fill={c} stroke="none" />
    <path d="M0 -25 L-3 4" strokeWidth="13" />
    <path d="M0 -20 L14 -6 L18 6" strokeWidth="8" />
    <path d="M0 -20 L-14 -8 L-20 2" strokeWidth="8" />
    <path d="M-3 4 L10 20 L14 36" strokeWidth="10" />
    <path d="M-3 4 L-12 20 L-24 32" strokeWidth="10" />
  </g>
);

export const Children = ({ x = 100, y = 104, s = 1, c = C.black }: { x?: number; y?: number; s?: number; c?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Person x={-16} y={0} s={1} c={c} />
    <Person x={20} y={10} s={0.75} c={c} />
  </g>
);

export const CarSide = ({ x = 100, y = 100, s = 1, c = C.black, bg = C.white, flip = false }: { x?: number; y?: number; s?: number; c?: string; bg?: string; flip?: boolean }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    <path d="M-40 8 L-40 -6 Q-38 -13 -28 -14 L-17 -15 L-8 -28 L18 -28 L28 -15 L37 -13 Q42 -10 42 -3 L42 8 Z" fill={c} />
    <path d="M-5 -24 L5 -24 L5 -15 L-12 -15 Z M9 -24 L16 -24 L23 -15 L9 -15 Z" fill={bg} />
    <circle cx="-22" cy="9" r="10" fill={c} stroke={bg} strokeWidth="3" />
    <circle cx="25" cy="9" r="10" fill={c} stroke={bg} strokeWidth="3" />
  </g>
);

export const CarRear = ({ x = 100, y = 100, s = 1, c = C.black, bg = C.white }: { x?: number; y?: number; s?: number; c?: string; bg?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-30 12 L-30 -4 L-22 -24 L22 -24 L30 -4 L30 12 Z" fill={c} />
    <path d="M-17 -19 L17 -19 L22 -7 L-22 -7 Z" fill={bg} />
    <rect x="-30" y="12" width="12" height="10" rx="2" fill={c} />
    <rect x="18" y="12" width="12" height="10" rx="2" fill={c} />
    <rect x="-24" y="0" width="9" height="5" rx="1" fill={bg} />
    <rect x="15" y="0" width="9" height="5" rx="1" fill={bg} />
  </g>
);

export const Truck = ({ x = 100, y = 100, s = 1, c = C.black, bg = C.yellow, flip = false }: { x?: number; y?: number; s?: number; c?: string; bg?: string; flip?: boolean }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    <rect x="-44" y="-30" width="58" height="36" rx="2" fill={c} />
    <path d="M17 -20 L33 -20 L44 -6 L44 6 L17 6 Z" fill={c} />
    <path d="M22 -16 L31 -16 L38 -7 L22 -7 Z" fill={bg} />
    <circle cx="-30" cy="9" r="8" fill={c} stroke={bg} strokeWidth="3" />
    <circle cx="-12" cy="9" r="8" fill={c} stroke={bg} strokeWidth="3" />
    <circle cx="32" cy="9" r="8" fill={c} stroke={bg} strokeWidth="3" />
  </g>
);

export const Bus = ({ x = 100, y = 100, s = 1, c = C.black, bg = C.white }: { x?: number; y?: number; s?: number; c?: string; bg?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-46" y="-26" width="92" height="36" rx="6" fill={c} />
    {[-36, -18, 0, 18].map((wx) => <rect key={wx} x={wx} y="-20" width="14" height="12" rx="2" fill={bg} />)}
    <rect x="34" y="-20" width="7" height="22" rx="1" fill={bg} />
    <circle cx="-26" cy="12" r="8" fill={c} stroke={bg} strokeWidth="3" />
    <circle cx="26" cy="12" r="8" fill={c} stroke={bg} strokeWidth="3" />
  </g>
);

export const Bike = ({ x = 100, y = 100, s = 1, c = C.black }: { x?: number; y?: number; s?: number; c?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={c} fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="-26" cy="12" r="17" strokeWidth="6" />
    <circle cx="26" cy="12" r="17" strokeWidth="6" />
    <path d="M-26 12 L-6 -12 L16 -12 L26 12 M-6 -12 L2 12 L-26 12 M2 12 L16 -12" strokeWidth="5.5" />
    <path d="M16 -12 L13 -24 L22 -24 M-10 -18 L0 -18" strokeWidth="5.5" />
  </g>
);

export const Wheelchair = ({ x = 100, y = 100, s = 1, c = C.white }: { x?: number; y?: number; s?: number; c?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={c} fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="-6" cy="-40" r="8" fill={c} stroke="none" />
    <path d="M-8 -28 L-8 2 L16 2 L24 26 L32 24" strokeWidth="9" />
    <path d="M-8 -14 L12 -14" strokeWidth="8" />
    <path d="M-20 -6 A24 24 0 1 0 18 22" strokeWidth="7" />
  </g>
);

export const Snowmobile = ({ x = 100, y = 100, s = 1, c = C.black }: { x?: number; y?: number; s?: number; c?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill={c}>
    <path d="M-42 6 L-30 -8 L-6 -10 L4 -22 L12 -22 L10 -10 L32 -4 L40 6 Z" />
    <circle cx="-14" cy="-26" r="7" />
    <path d="M-20 -18 L-8 -10 L-14 -10 Z" />
    <path d="M-46 16 L28 16 Q40 16 44 8" stroke={c} strokeWidth="5" fill="none" strokeLinecap="round" />
    <rect x="-38" y="6" width="44" height="7" rx="3" />
  </g>
);

export const Deer = ({ x = 100, y = 100, s = 1, c = C.black }: { x?: number; y?: number; s?: number; c?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill={c}>
    <path d="M-44 4 L-34 -6 L-12 -10 L12 -10 L22 -20 L21 -30 L27 -27 L30 -34 L32 -24 L40 -20 L38 -14 L28 -12 L22 -2 L24 4 L40 24 L34 28 L18 10 L6 8 L-12 10 L-28 28 L-34 24 L-24 8 L-38 14 L-42 10 Z" />
    <path d="M24 -28 L18 -42 M18 -42 L12 -46 M18 -42 L22 -50 M30 -32 L34 -46 M34 -46 L30 -52 M34 -46 L40 -50" stroke={c} strokeWidth="3.5" strokeLinecap="round" />
  </g>
);

export const Plane = ({ x = 100, y = 100, s = 1, c = C.white }: { x?: number; y?: number; s?: number; c?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill={c}>
    <path d="M0 -44 Q7 -40 7 -28 L7 -10 L46 8 L46 17 L7 7 L7 26 L18 34 L18 40 L0 35 L-18 40 L-18 34 L-7 26 L-7 7 L-46 17 L-46 8 L-7 -10 L-7 -28 Q-7 -40 0 -44 Z" />
  </g>
);

export const Worker = ({ x = 100, y = 100, s = 1, c = C.black }: { x?: number; y?: number; s?: number; c?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={c} strokeLinecap="round" strokeLinejoin="round" fill="none">
    <circle cx="-10" cy="-40" r="9" fill={c} stroke="none" />
    <path d="M-12 -28 L-2 0" strokeWidth="13" />
    <path d="M-10 -22 L10 -10 L22 6" strokeWidth="8" />
    <path d="M-2 0 L-14 20 L-16 38 M-2 0 L12 18 L20 36" strokeWidth="10" />
    <path d="M6 -24 L34 22" strokeWidth="5" />
    <path d="M28 18 L44 30 L36 38 Z" fill={c} strokeWidth="3" />
  </g>
);

export const Flagger = ({ x = 100, y = 100, s = 1, c = C.black }: { x?: number; y?: number; s?: number; c?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={c} strokeLinecap="round" strokeLinejoin="round" fill="none">
    <circle cx="-6" cy="-40" r="9" fill={c} stroke="none" />
    <path d="M-6 -28 L-6 2" strokeWidth="13" />
    <path d="M-6 2 L-14 38 M-6 2 L4 38" strokeWidth="10" />
    <path d="M-6 -22 L-24 -6" strokeWidth="8" />
    <path d="M-4 -22 L18 -30" strokeWidth="8" />
    <path d="M18 -30 L18 10" strokeWidth="4" />
    <rect x="18" y="-30" width="24" height="18" fill={c} stroke="none" />
  </g>
);

export const Surveyor = ({ x = 100, y = 100, s = 1, c = C.black }: { x?: number; y?: number; s?: number; c?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={c} strokeLinecap="round" strokeLinejoin="round" fill="none">
    <circle cx="-16" cy="-40" r="9" fill={c} stroke="none" />
    <path d="M-16 -28 L-14 2" strokeWidth="13" />
    <path d="M-14 2 L-22 38 M-14 2 L-4 38" strokeWidth="10" />
    <path d="M-14 -22 L6 -26" strokeWidth="8" />
    <rect x="4" y="-36" width="18" height="10" fill={c} stroke="none" />
    <path d="M14 -26 L4 38 M14 -26 L14 38 M14 -26 L26 38" strokeWidth="4" />
  </g>
);

export const TrafficLight = ({ x = 100, y = 100, s = 1, lit = 'all' }: { x?: number; y?: number; s?: number; lit?: 'all' | 'red' | 'yellow' | 'green' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-18" y="-46" width="36" height="92" rx="7" fill={C.black} />
    <circle cx="0" cy="-28" r="11" fill={lit === 'all' || lit === 'red' ? '#E53935' : C.dim} />
    <circle cx="0" cy="0" r="11" fill={lit === 'all' || lit === 'yellow' ? '#FFC107' : C.dim} />
    <circle cx="0" cy="28" r="11" fill={lit === 'all' || lit === 'green' ? '#2EB872' : C.dim} />
  </g>
);

/** White X crossbuck with red border. */
export const Crossbuck = ({ x = 100, y = 100, s = 1 }: { x?: number; y?: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-88" y="-17" width="176" height="34" rx="4" fill={C.red} transform="rotate(42)" />
    <rect x="-88" y="-17" width="176" height="34" rx="4" fill={C.red} transform="rotate(-42)" />
    <rect x="-82" y="-11" width="164" height="22" rx="2" fill={C.white} transform="rotate(42)" />
    <rect x="-82" y="-11" width="164" height="22" rx="2" fill={C.white} transform="rotate(-42)" />
  </g>
);

export const HovDiamond = ({ x, y, w = 40, h = 64, fill = C.black }: { x: number; y: number; w?: number; h?: number; fill?: string }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill={fill} />
    <path d={`M${x + w / 2} ${y + 10} L${x + w - 9} ${y + h / 2} L${x + w / 2} ${y + h - 10} L${x + 9} ${y + h / 2} Z`} fill="none" stroke={C.white} strokeWidth="5" />
  </g>
);

/** Top-down road scene used for pavement-marking visuals. */
export const Road = ({ children }: { children?: ReactNode }) => (
  <g>
    <rect x="0" y="0" width="200" height="200" rx="14" fill="#6E8B5A" />
    <rect x="38" y="0" width="124" height="200" fill={C.asphalt} />
    <rect x="40" y="0" width="3" height="200" fill={C.lane} />
    <rect x="157" y="0" width="3" height="200" fill={C.lane} />
    {children}
  </g>
);

export const TopCar = ({ x, y, c = '#2F6FD6', label, down = false }: { x: number; y: number; c?: string; label?: string; down?: boolean }) => (
  <g transform={`translate(${x} ${y}) rotate(${down ? 180 : 0})`}>
    <rect x="-13" y="-24" width="26" height="48" rx="7" fill={c} stroke="#0B1A33" strokeWidth="1.5" />
    <rect x="-9" y="-14" width="18" height="10" rx="2" fill="#CFE3FF" />
    <rect x="-9" y="8" width="18" height="7" rx="2" fill="#CFE3FF" />
    {label && <T x={0} y={4} s={14} fill={C.white} w={800}>{label}</T>}
  </g>
);

/** Rear view of a car with the driver's left arm signalling. */
export const HandSignal = ({ kind }: { kind: 'left' | 'right' | 'stop' }) => {
  const arm =
    kind === 'left' ? 'M64 92 L18 92' : kind === 'right' ? 'M64 92 L30 92 L30 52' : 'M64 92 L30 92 L30 134';
  const hand = kind === 'left' ? [14, 92] : kind === 'right' ? [30, 46] : [30, 140];
  return (
    <g>
      <rect x="0" y="0" width="200" height="200" rx="14" fill="#DCE6F2" />
      <rect x="0" y="150" width="200" height="50" fill="#9AA3AD" />
      <path d="M60 150 L60 104 L74 68 L150 68 L164 104 L164 150 Z" fill="#E8EDF3" stroke={C.black} strokeWidth="4" strokeLinejoin="round" />
      <path d="M80 76 L144 76 L154 102 L70 102 Z" fill="#9CC3E8" stroke={C.black} strokeWidth="3" />
      <circle cx="98" cy="90" r="8" fill="#5B4636" />
      <rect x="62" y="150" width="22" height="18" rx="3" fill={C.black} />
      <rect x="140" y="150" width="22" height="18" rx="3" fill={C.black} />
      <rect x="66" y="116" width="18" height="9" rx="2" fill="#E53935" />
      <rect x="140" y="116" width="18" height="9" rx="2" fill="#E53935" />
      <rect x="96" y="124" width="32" height="12" rx="2" fill={C.white} stroke={C.black} strokeWidth="2" />
      <path d={arm} stroke="#C68A64" strokeWidth="11" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={hand[0]} cy={hand[1]} r="8" fill="#C68A64" />
    </g>
  );
};

/** Single vehicle signal head used for traffic-light questions. */
export const SignalHead = ({ red = false, yellow = false, green = false, arrow, flash, top }:
  { red?: boolean; yellow?: boolean; green?: boolean; arrow?: 'green' | 'yellow'; flash?: 'red' | 'yellow' | 'green'; top?: boolean }) => {
  const lamp = (cy: number, on: boolean, col: string, isFlash: boolean) => (
    <g>
      {on && isFlash && (
        <g className="sig-flash" stroke={col} strokeWidth="5" strokeLinecap="round">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
            const r = (a * Math.PI) / 180;
            return <line key={a} x1={100 + Math.cos(r) * 30} y1={cy + Math.sin(r) * 30} x2={100 + Math.cos(r) * 40} y2={cy + Math.sin(r) * 40} />;
          })}
        </g>
      )}
      <circle cx="100" cy={cy} r="22" fill={on ? col : C.dim} className={on && isFlash ? 'sig-flash' : undefined} />
    </g>
  );
  const y0 = top ? 82 : 46;
  return (
    <g>
      <rect x="0" y="0" width="200" height="200" rx="14" fill="#E6ECF3" />
      {top && (
        <g>
          <rect x="72" y="6" width="56" height="56" rx="10" fill={C.black} />
          <circle cx="100" cy="34" r="22" fill="#151515" stroke="#444" strokeWidth="2" />
          <rect x="95" y="18" width="10" height="32" rx="2" fill={C.white} />
        </g>
      )}
      <rect x="66" y={y0 - 34} width="68" height={top ? 120 : 176} rx="12" fill={C.black} />
      {top ? (
        <>
          {lamp(y0, red, '#E53935', flash === 'red')}
          {lamp(y0 + 52, green, '#2EB872', flash === 'green')}
        </>
      ) : (
        <>
          {lamp(y0, red, '#E53935', flash === 'red')}
          {lamp(y0 + 54, yellow, '#FFC107', flash === 'yellow')}
          {arrow ? (
            <g>
              <circle cx="100" cy={y0 + 108} r="22" fill={C.dim} />
              <Arrow d={`M116 ${y0 + 108} L94 ${y0 + 108}`} x={94} y={y0 + 108} a={180} w={9} hl={14} hw={22} c={arrow === 'green' ? '#2EB872' : '#FFC107'} />
            </g>
          ) : (
            lamp(y0 + 108, green, '#2EB872', flash === 'green')
          )}
        </>
      )}
    </g>
  );
};
