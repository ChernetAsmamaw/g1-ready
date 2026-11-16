import type { SignGroup } from './types';
import type { SignDef } from './sign-types';
import { regulatorySigns } from './signs-regulatory';
import { warningSigns } from './signs-warning';
import { constructionSigns, informationSigns, railwaySigns, schoolSigns, signalSigns } from './signs-other';

export type { SignDef } from './sign-types';

export const ALL_SIGNS: SignDef[] = [
  ...regulatorySigns,
  ...warningSigns,
  ...schoolSigns,
  ...constructionSigns,
  ...informationSigns,
  ...railwaySigns,
  ...signalSigns,
];

export const SIGNS: Record<string, SignDef> = Object.fromEntries(ALL_SIGNS.map((s) => [s.id, s]));

export const SIGN_GROUPS: { id: SignGroup; label: string; blurb: string }[] = [
  { id: 'regulatory', label: 'Regulatory', blurb: 'Rules you must obey. Mostly white rectangles; a red ring and slash means "not allowed", a green ring means "allowed".' },
  { id: 'warning', label: 'Warning', blurb: 'Yellow diamonds that warn of hazards ahead.' },
  { id: 'school', label: 'School', blurb: 'Five-sided fluorescent yellow-green signs, used only near schools, and the school bus stop arm.' },
  { id: 'construction', label: 'Construction', blurb: 'Orange signs for temporary work zones and traffic-control people.' },
  { id: 'information', label: 'Information', blurb: 'Green for directions, blue for services, brown for tourism.' },
  { id: 'railway', label: 'Railway', blurb: 'Crossbucks, crossing signals and advance warnings.' },
  { id: 'signals', label: 'Signals & markings', blurb: 'Traffic lights, pedestrian signals, hand signals and pavement markings.' },
];

export function signsInGroup(g: SignGroup) {
  return ALL_SIGNS.filter((s) => s.group === g);
}

/** Renders a sign by id as an accessible SVG. */
export function SignSvg({ id, className, decorative = false }: { id: string; className?: string; decorative?: boolean }) {
  const s = SIGNS[id];
  if (!s) return null;
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : s.alt}
    >
      {s.draw()}
    </svg>
  );
}
