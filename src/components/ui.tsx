import { forwardRef, useEffect, useRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import {
  Award, Calendar, Flag, Flame, LayoutGrid, RotateCcw, Route, Shield, Signpost, Star, Sun, Trophy, Users, IdCard, X,
} from 'lucide-react';

export const ICONS: Record<string, typeof Award> = {
  award: Award, calendar: Calendar, flag: Flag, flame: Flame, grid: LayoutGrid, rotate: RotateCcw, route: Route,
  shield: Shield, signpost: Signpost, star: Star, sun: Sun, trophy: Trophy, users: Users, idcard: IdCard,
};

export function Icon({ name, className = 'h-5 w-5' }: { name: string; className?: string }) {
  const C = ICONS[name] || Star;
  return <C className={className} aria-hidden="true" />;
}

type Variant = 'primary' | 'navy' | 'ghost' | 'soft' | 'good' | 'danger';
const VARIANTS: Record<Variant, string> = {
  primary: 'bg-yellow text-yellow-ink hover:brightness-95 shadow-sm',
  navy: 'bg-navy text-navy-ink hover:brightness-125 dark:bg-info dark:text-white',
  ghost: 'bg-transparent text-ink hover:bg-raised border border-line',
  soft: 'bg-raised text-ink hover:brightness-95',
  good: 'bg-good text-white hover:brightness-105',
  danger: 'bg-bad text-white hover:brightness-105',
};

export const Button = forwardRef<HTMLButtonElement, { variant?: Variant; size?: 'sm' | 'md' | 'lg' } & ButtonHTMLAttributes<HTMLButtonElement>>(
  function Button({ children, variant = 'primary', className = '', type = 'button', size = 'md', ...rest }, ref) {
    const sz = size === 'lg' ? 'min-h-[56px] px-6 text-lg' : size === 'sm' ? 'min-h-[38px] px-3 text-sm' : 'min-h-[46px] px-5 text-base';
    return (
      <button ref={ref} type={type}
        className={`inline-flex items-center justify-center gap-2 rounded-xl font-bold transition active:scale-[.98] disabled:opacity-50 disabled:pointer-events-none ${sz} ${VARIANTS[variant]} ${className}`}
        {...rest}>
        {children}
      </button>
    );
  },
);

export function Card({ children, className = '', as: As = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'section' | 'li' | 'article' }) {
  return <As className={`rounded-xl2 bg-surface border border-line shadow-[0_1px_2px_rgba(16,29,53,.06)] ${className}`}>{children}</As>;
}

export function Bar({ value, className = '', color = 'bg-good', label }: { value: number; className?: string; color?: string; label?: string }) {
  const v = Math.max(0, Math.min(1, value));
  return (
    <div className={`h-2.5 w-full rounded-full bg-raised overflow-hidden ${className}`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(v * 100)} aria-label={label}>
      <div className={`h-full rounded-full ${color} transition-[width] duration-500`} style={{ width: `${v * 100}%` }} />
    </div>
  );
}

export function Ring({ value, size = 88, stroke = 9, children, color = 'rgb(var(--good))' }: { value: number; size?: number; stroke?: number; children?: ReactNode; color?: string }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(1, value));
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgb(var(--raised))" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - v)} style={{ transition: 'stroke-dashoffset .6s ease' }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-center">{children}</div>
    </div>
  );
}

export function Pill({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${className}`}>{children}</span>;
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 mt-8 flex items-end justify-between gap-3">
      <h2 className="text-lg font-extrabold tracking-tight">{children}</h2>
      {action}
    </div>
  );
}

/** Accessible modal dialog with focus handling and Escape to close. */
export function Modal({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: string; children: ReactNode; wide?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const ov = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = ov;
      prev?.focus?.();
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-6" onClick={onClose}>
      <div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={title}
        className={`fade-up max-h-[92vh] w-full overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-surface text-ink shadow-2xl outline-none ${wide ? 'sm:max-w-3xl' : 'sm:max-w-lg'}`}
        onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line bg-surface px-5 py-3">
          <h2 className="text-lg font-extrabold">{title}</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-raised" aria-label="Close"><X className="h-5 w-5" /></button>
        </div>
        <div className="px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">{children}</div>
      </div>
    </div>
  );
}

export function Toast({ children, onDone }: { children: ReactNode; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div role="status" className="pop fixed left-1/2 top-[calc(env(safe-area-inset-top,0px)+72px)] z-[60] -translate-x-1/2 rounded-2xl bg-navy px-4 py-3 text-sm font-bold text-white shadow-xl dark:bg-raised dark:text-ink">
      {children}
    </div>
  );
}

export function pct(n: number, d: number) {
  return d ? Math.round((n / d) * 100) : 0;
}

export function fmtTime(ms: number) {
  const s = Math.round(ms / 1000);
  const m = Math.floor(s / 60);
  return m ? `${m}m ${String(s % 60).padStart(2, '0')}s` : `${s}s`;
}
