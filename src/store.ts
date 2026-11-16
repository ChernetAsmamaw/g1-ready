// Progress store. Everything lives in this browser's localStorage, wrapped in
// try/catch so the app still works (without saving) when storage is blocked.
import { useSyncExternalStore } from 'react';
import type { CategoryId } from './data/types';

export type Mode = 'practice' | 'daily' | 'review' | 'signs' | 'mock';

export interface AnswerRec { qid: string; chosen: number; correct: boolean; ms: number; hint?: boolean; text?: string }

export interface Attempt {
  id: string;
  mode: Mode;
  title: string;
  date: number;
  total: number;
  correct: number;
  points: number;
  durationMs: number;
  byCat: Partial<Record<CategoryId, [number, number]>>;
  wrong: string[];
  answers: AnswerRec[];
  passed?: boolean;
  sections?: { signs: [number, number]; rules: [number, number] };
}

export interface Settings {
  sound: boolean;
  timer: boolean;
  largeText: boolean;
  reduceMotion: boolean;
  theme: 'system' | 'light' | 'dark';
}

export interface Progress {
  v: 1;
  name: string;
  xp: number;
  streak: { count: number; last: string | null; best: number };
  qstats: Record<string, { s: number; c: number; last: 0 | 1 }>;
  missed: string[];
  cleared: number;
  history: Attempt[];
  daily: { date: string; correct: number; total: number } | null;
  achievements: Record<string, number>;
  signsStudied: string[];
  bests: { mock?: number; combo?: number; recognition?: number; match?: number };
  /** Best score and number of completions for each fixed practice set. */
  sets: Record<string, { best: number; plays: number }>;
  /** Saved place in a set that was left part-way through. */
  resume: Record<string, ResumeState>;
  settings: Settings;
}

export interface ResumeState { seed: number; i: number; answers: AnswerRec[]; points: number; combo: number; bestCombo: number; elapsed: number }

const KEY = 'g1ready.progress.v1';

export const fresh = (): Progress => ({
  v: 1,
  name: '',
  xp: 0,
  streak: { count: 0, last: null, best: 0 },
  qstats: {},
  missed: [],
  cleared: 0,
  history: [],
  daily: null,
  achievements: {},
  signsStudied: [],
  bests: {},
  sets: {},
  resume: {},
  settings: { sound: false, timer: false, largeText: false, reduceMotion: false, theme: 'system' },
});

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return fresh();
    const p = JSON.parse(raw) as Progress;
    const f = fresh();
    return { ...f, ...p, settings: { ...f.settings, ...(p.settings || {}) }, streak: { ...f.streak, ...(p.streak || {}) }, bests: { ...(p.bests || {}) }, sets: p.sets || {}, resume: p.resume || {} };
  } catch {
    return fresh();
  }
}

let state: Progress = load();
const listeners = new Set<() => void>();

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable: progress lasts for this visit only */
  }
}

export function getProgress() {
  return state;
}

export function update(fn: (p: Progress) => Progress) {
  state = fn(state);
  save();
  listeners.forEach((l) => l());
}

export function useProgress(): Progress {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state,
  );
}

export function resetProgress() {
  const keep = state.settings;
  state = { ...fresh(), settings: keep };
  save();
  listeners.forEach((l) => l());
}

// ---------- dates & streaks ----------
export function dayKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function daysBetween(a: string, b: string) {
  const pa = new Date(a + 'T12:00:00').getTime();
  const pb = new Date(b + 'T12:00:00').getTime();
  return Math.round((pb - pa) / 86400000);
}

/** Streak shown on the dashboard: drops to 0 if a whole day was missed. */
export function liveStreak(p: Progress) {
  if (!p.streak.last) return 0;
  const gap = daysBetween(p.streak.last, dayKey());
  return gap <= 1 ? p.streak.count : 0;
}

// ---------- levels ----------
export function levelFor(xp: number) {
  const level = 1 + Math.floor(Math.sqrt(xp / 120));
  const base = 120 * (level - 1) ** 2;
  const next = 120 * level ** 2;
  return { level, into: xp - base, span: next - base, pct: (xp - base) / (next - base) };
}

export const LEVEL_NAMES = ['Learner', 'Learner', 'Road Rookie', 'Sign Spotter', 'Lane Keeper', 'Safe Driver', 'Road Ready', 'G1 Pro', 'Road Scholar', 'Master Driver'];
export const levelName = (lvl: number) => LEVEL_NAMES[Math.min(lvl, LEVEL_NAMES.length - 1)];

// ---------- achievements ----------
export const ACHIEVEMENTS: { id: string; name: string; desc: string; icon: string }[] = [
  { id: 'first', name: 'First drive', desc: 'Finish your first quiz.', icon: 'flag' },
  { id: 'perfect', name: 'Perfect round', desc: 'Score 100% on a quiz of 10 or more questions.', icon: 'star' },
  { id: 'combo10', name: 'On a roll', desc: 'Get 10 answers right in a row.', icon: 'flame' },
  { id: 'streak3', name: 'Three-day habit', desc: 'Practise three days in a row.', icon: 'calendar' },
  { id: 'streak7', name: 'Week of practice', desc: 'Practise seven days in a row.', icon: 'calendar' },
  { id: 'daily', name: 'Daily driver', desc: 'Finish a daily challenge.', icon: 'sun' },
  { id: 'allcats', name: 'Well rounded', desc: 'Practise every topic.', icon: 'grid' },
  { id: 'signs50', name: 'Sign scholar', desc: 'Study 50 different signs in the Signs centre.', icon: 'signpost' },
  { id: 'mockpass', name: 'Test ready', desc: 'Pass a full mock G1 test.', icon: 'award' },
  { id: 'comeback', name: 'Comeback', desc: 'Fix 10 questions you had missed.', icon: 'rotate' },
  { id: 'century', name: 'Century', desc: 'Answer 100 questions correctly.', icon: 'trophy' },
];

function grant(p: Progress, id: string, out: string[]) {
  if (!p.achievements[id]) {
    p.achievements = { ...p.achievements, [id]: Date.now() };
    out.push(id);
  }
}

/** Records a finished attempt. Returns ids of achievements newly earned. */
export function recordAttempt(a: Attempt, opts: { combo: number }): string[] {
  const earned: string[] = [];
  update((prev) => {
    const p: Progress = { ...prev, qstats: { ...prev.qstats }, missed: prev.missed.slice() };
    // per-question stats and the "missed" review list
    const missed = new Set(p.missed);
    let cleared = p.cleared;
    for (const r of a.answers) {
      if (r.qid.startsWith('x-')) continue; // generated activity items are not tracked
      const s = p.qstats[r.qid] || { s: 0, c: 0, last: 0 };
      p.qstats[r.qid] = { s: s.s + 1, c: s.c + (r.correct ? 1 : 0), last: r.correct ? 1 : 0 };
      if (r.correct) {
        if (missed.delete(r.qid)) cleared++;
      } else missed.add(r.qid);
    }
    p.missed = [...missed];
    p.cleared = cleared;
    p.xp = prev.xp + Math.round(a.points / 10);
    p.history = [a, ...prev.history].slice(0, 60);
    // streak
    const today = dayKey();
    const last = prev.streak.last;
    let count = prev.streak.count;
    if (last !== today) count = last && daysBetween(last, today) === 1 ? count + 1 : 1;
    p.streak = { count, last: today, best: Math.max(prev.streak.best, count) };
    if (a.mode === 'daily') p.daily = { date: today, correct: a.correct, total: a.total };
    if (a.mode === 'mock') p.bests = { ...p.bests, mock: Math.max(prev.bests.mock || 0, a.correct) };
    p.bests = { ...p.bests, combo: Math.max(p.bests.combo || 0, opts.combo) };

    grant(p, 'first', earned);
    if (a.total >= 10 && a.correct === a.total) grant(p, 'perfect', earned);
    if (opts.combo >= 10) grant(p, 'combo10', earned);
    if (count >= 3) grant(p, 'streak3', earned);
    if (count >= 7) grant(p, 'streak7', earned);
    if (a.mode === 'daily') grant(p, 'daily', earned);
    if (a.mode === 'mock' && a.passed) grant(p, 'mockpass', earned);
    if (cleared >= 10) grant(p, 'comeback', earned);
    const totalCorrect = Object.values(p.qstats).reduce((n, s) => n + s.c, 0);
    if (totalCorrect >= 100) grant(p, 'century', earned);
    const cats = new Set<string>();
    for (const h of p.history) for (const c of Object.keys(h.byCat)) cats.add(c);
    if (cats.size >= 5) grant(p, 'allcats', earned);
    return p;
  });
  return earned;
}

export function markSignStudied(id: string) {
  const p = getProgress();
  if (p.signsStudied.includes(id)) return;
  update((prev) => {
    const next = { ...prev, signsStudied: [...prev.signsStudied, id] };
    if (next.signsStudied.length >= 50 && !next.achievements.signs50) next.achievements = { ...next.achievements, signs50: Date.now() };
    return next;
  });
}

export function setBest(key: keyof Progress['bests'], value: number) {
  update((p) => ({ ...p, bests: { ...p.bests, [key]: Math.max(p.bests[key] || 0, value) } }));
}

export function saveResume(setId: string, r: ResumeState) {
  update((p) => ({ ...p, resume: { ...p.resume, [setId]: r } }));
}

export function clearResume(setId: string) {
  if (!getProgress().resume[setId]) return;
  update((p) => {
    const resume = { ...p.resume };
    delete resume[setId];
    return { ...p, resume };
  });
}

export function recordSet(setId: string, score: number) {
  update((p) => {
    const cur = p.sets[setId] || { best: 0, plays: 0 };
    return { ...p, sets: { ...p.sets, [setId]: { best: Math.max(cur.best, score), plays: cur.plays + 1 } } };
  });
}
