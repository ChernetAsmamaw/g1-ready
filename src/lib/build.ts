import { BANK, BY_ID, hashStr, prepare, rng, shuffle } from '../data/bank';
import { SIGNS } from '../data/signs';
import type { CategoryId, Difficulty, Question, SourceId } from '../data/types';
import { dayKey, getProgress } from '../store';

/** A question ready to play. Options may be 2 to 4, and may be shown as signs. */
export interface PlayQ {
  id: string;
  category: CategoryId;
  difficulty: Difficulty;
  text: string;
  options: string[];
  answer: number;
  explanation: string;
  sources: SourceId[];
  ref?: string;
  sign?: string;
  optionSigns?: string[];
  hint?: string;
}

const toPlay = (q: Question, rand?: () => number): PlayQ => {
  const p = prepare(q, rand);
  return { ...p, options: [...p.options] };
};

const LEVELS: Record<Difficulty, Difficulty[]> = { 1: [1], 2: [1, 2], 3: [2, 3] };

export interface PracticeConfig {
  cats: CategoryId[];
  difficulty: Difficulty;
  count: number;
}

/** Picks questions, favouring ones not yet seen and ones answered wrong last time. */
export function practiceSet(cfg: PracticeConfig): PlayQ[] {
  const stats = getProgress().qstats;
  const inCats = BANK.filter((q) => cfg.cats.includes(q.category));
  let pool = inCats.filter((q) => LEVELS[cfg.difficulty].includes(q.difficulty));
  if (pool.length < cfg.count) pool = inCats;
  const scored = pool.map((q) => {
    const s = stats[q.id];
    const prio = Math.random() + (!s ? 0.6 : 0) + (s && s.last === 0 ? 0.9 : 0) + (cfg.difficulty === 3 && q.difficulty === 3 ? 0.4 : 0);
    return { q, prio };
  });
  scored.sort((a, b) => b.prio - a.prio);
  const picked: Question[] = [];
  const signsUsed = new Set<string>();
  for (const { q } of scored) {
    if (picked.length >= cfg.count) break;
    if (q.sign && signsUsed.has(q.sign)) continue; // avoid the same picture twice in one quiz
    if (q.sign) signsUsed.add(q.sign);
    picked.push(q);
  }
  return shuffle(picked).map((q) => toPlay(q));
}

export function reviewSet(ids: string[], count = 20): PlayQ[] {
  return shuffle(ids.map((id) => BY_ID[id]).filter(Boolean)).slice(0, count).map((q) => toPlay(q));
}

/** Five questions, the same for everyone on a given day. */
export function dailySet(date = dayKey()): PlayQ[] {
  const rand = rng(hashStr('daily' + date));
  const cats: CategoryId[] = shuffle(['signs', 'rules', 'safe', 'sharing', 'licence'] as CategoryId[], rand);
  return cats.map((c) => {
    const pool = BANK.filter((q) => q.category === c);
    return toPlay(pool[Math.floor(rand() * pool.length)], rand);
  });
}

/** 40 questions like the real G1 knowledge test: 20 signs, 20 rules of the road. */
export function mockSet(): PlayQ[] {
  const take = (c: CategoryId, n: number) => {
    const used = new Set<string>();
    return shuffle(BANK.filter((q) => q.category === c)).filter((q) => {
      if (!q.sign) return true;
      if (used.has(q.sign)) return false;
      used.add(q.sign);
      return true;
    }).slice(0, n);
  };
  const signs = take('signs', 20);
  const rules = shuffle([...take('rules', 8), ...take('safe', 4), ...take('sharing', 4), ...take('licence', 4)]);
  return [...signs, ...rules].map((q) => toPlay(q));
}

// ---------- Signs centre activities ----------
export function identifySet(n = 10, groups?: string[]): PlayQ[] {
  const pool = BANK.filter((q) => q.sign && SIGNS[q.sign] && (q.id.startsWith('a-id-') || /^g-\d\d$/.test(q.id)))
    .filter((q) => !groups || groups.includes(SIGNS[q.sign!].group));
  const used = new Set<string>();
  const out: Question[] = [];
  for (const q of shuffle(pool)) {
    if (out.length >= n) break;
    if (used.has(q.sign!)) continue;
    used.add(q.sign!);
    out.push(q);
  }
  return out.map((q) => toPlay(q));
}

export function whatToDoSet(n = 10): PlayQ[] {
  return shuffle(BANK.filter((q) => q.id.startsWith('a-do-'))).slice(0, n).map((q) => toPlay(q));
}

export const CONFUSABLE: [string, string][] = [
  ['stop', 'yield'], ['stop', 'stop-ahead'], ['divided-begins', 'divided-ends'], ['no-right-turn', 'no-right-on-red'],
  ['green-circle', 'red-circle'], ['bike-lane', 'no-bicycles'], ['snowmobiles-permitted', 'snowmobile-crossing'],
  ['pedestrian-crossover', 'pedestrian-ahead'], ['light-flash-red', 'light-flash-yellow'], ['light-green-arrow', 'light-yellow-arrow'],
  ['mark-solid', 'mark-broken'], ['hand-left', 'hand-right'], ['hand-right', 'hand-stop'], ['speed-limit', 'advisory-speed'],
  ['no-stopping', 'no-parking'], ['curve-right', 'sharp-turn-right'], ['chevron', 'checkerboard-turn'],
  ['railway-crossbuck', 'railway-ahead'], ['school-zone', 'pedestrian-ahead'], ['road-work', 'flagger-ahead'],
  ['right-lane-ends', 'merge'], ['pavement-narrows', 'narrow-bridge'], ['two-way-traffic', 'divided-ends'],
  ['do-not-enter', 'red-circle'], ['one-way', 'two-way-left-turn'], ['intersection-ahead', 'side-road'],
  ['light-advance-green', 'light-flash-yellow'], ['no-left-turn', 'no-u-turn'], ['hospital', 'accessible-facility'],
  ['slow-moving-vehicle', 'yield'], ['school-zone', 'school-crossing'], ['lane-closed', 'right-lane-ends'],
];

export function differenceSet(n = 8): PlayQ[] {
  return shuffle(CONFUSABLE).slice(0, n).map(([a, b]) => {
    const pair = shuffle([a, b]);
    const target = Math.random() < 0.5 ? 0 : 1;
    const t = SIGNS[pair[target]];
    const o = SIGNS[pair[1 - target]];
    return {
      id: `x-diff-${a}-${b}`,
      category: t.quiz,
      difficulty: 2,
      text: `Which one means: “${t.short}”?`,
      options: pair.map((id) => SIGNS[id].name),
      optionSigns: pair,
      answer: target,
      explanation: `${t.name}: ${t.short.toLowerCase()}. The other one is ${o.name}: ${o.short.toLowerCase()}. ${t.mistake}`,
      sources: ['gr'],
      ref: 'Road signs',
    } satisfies PlayQ;
  });
}
