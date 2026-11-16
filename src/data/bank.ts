import { rulesBank } from './bank-rules';
import { safeBank } from './bank-safe';
import { sharingBank } from './bank-sharing';
import { licenceBank } from './bank-licence';
import { extraSignBank, sampleSignBank } from './bank-signs';
import { extraBank } from './bank-extra';
import { ALL_SIGNS, SIGNS } from './signs';
import type { SignDef } from './sign-types';
import type { CategoryId, Difficulty, Question, SourceId } from './types';

export function hashStr(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(arr: T[], rand: () => number = Math.random): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const handwritten: Question[] = [...rulesBank, ...safeBank, ...sharingBank, ...licenceBank, ...sampleSignBank, ...extraSignBank, ...extraBank];

/** Sign ids that already have a hand-written "what does it mean" style question. */
const covered = new Set(handwritten.map((q) => q.sign).filter(Boolean) as string[]);

function pickDistractors(s: SignDef, key: 'short' | 'doShort'): string[] {
  const rand = rng(hashStr(s.id + key));
  const seen = new Set([s[key].toLowerCase()]);
  const out: string[] = [];
  const take = (pool: SignDef[]) => {
    for (const o of pool) {
      if (out.length >= 3) return;
      const v = o[key];
      if (!seen.has(v.toLowerCase())) {
        seen.add(v.toLowerCase());
        out.push(v);
      }
    }
  };
  take(s.related.map((r) => SIGNS[r]).filter(Boolean));
  take(shuffle(ALL_SIGNS.filter((o) => o.group === s.group && o.id !== s.id), rand));
  take(shuffle(ALL_SIGNS.filter((o) => o.id !== s.id), rand));
  return out;
}

function promptFor(s: SignDef) {
  if (s.id.startsWith('hand-')) return 'What does this hand signal mean?';
  if (s.id.startsWith('mark-')) return 'What does this pavement marking tell you?';
  if (s.id.startsWith('light-')) return 'What does this traffic light mean?';
  if (s.id.startsWith('ped-')) return 'What does this pedestrian signal mean?';
  return 'What does this sign mean?';
}

function refFor(s: SignDef) {
  if (s.id.startsWith('mark-')) return 'Pavement markings';
  if (s.id.startsWith('light-') || s.id.startsWith('ped-')) return 'Traffic lights';
  if (s.id.startsWith('hand-')) return 'Signals';
  const map: Record<string, string> = {
    regulatory: 'Regulatory signs', warning: 'Warning signs', school: 'School zone signs', construction: 'Temporary condition signs',
    information: 'Information and direction signs', railway: 'Railway crossings', signals: 'Traffic lights',
  };
  return map[s.group];
}

const auto: Question[] = [];
for (const s of ALL_SIGNS) {
  const cat: CategoryId = s.quiz;
  const src: SourceId = 'gr';
  if (!covered.has(s.id)) {
    const d = pickDistractors(s, 'short');
    if (d.length === 3) {
      auto.push({
        id: `a-id-${s.id}`, category: cat, difficulty: 1 as Difficulty, text: promptFor(s),
        options: [s.short, d[0], d[1], d[2]], answer: 0,
        explanation: `${s.name}. ${s.meaning}`, sources: [src], ref: refFor(s), sign: s.id,
      });
    }
  }
  if (s.id.startsWith('hand-')) continue; // hand signals only get the identify question
  const d2 = pickDistractors(s, 'doShort');
  if (d2.length === 3) {
    auto.push({
      id: `a-do-${s.id}`, category: cat, difficulty: (s.id.startsWith('mark-') ? 3 : 2) as Difficulty, text: 'What should you do when you see this?',
      options: [s.doShort, d2[0], d2[1], d2[2]], answer: 0,
      explanation: s.action, sources: [src], ref: refFor(s), sign: s.id,
    });
  }
}

// ---------- Levels ----------
// The bank is levelled into three equal groups (easy, medium, hard). Authors
// tag each question 1-3; this step then moves the easiest medium questions
// down and the hardest medium questions up until the three groups are equal.
function hardScore(q: Question) {
  const nums = (q.text + ' ' + q.options[q.answer]).match(/\d[\d,.]*/g)?.length ?? 0;
  return (q.category === 'licence' ? 0.5 : 0) + Math.min(3, nums) + (q.explanation.length > 180 ? 1 : 0) + (q.id.startsWith('a-do-') ? -3 : 0);
}

function level(all: Question[]): Question[] {
  const target = Math.floor(all.length / 3);
  const out = all.map((q) => ({ ...q }));
  const count = (d: number) => out.filter((q) => q.difficulty === d).length;
  const medium = () => out.filter((q) => q.difficulty === 2);
  const needEasy = target - count(1);
  if (needEasy > 0) {
    // "What should you do?" for the most common signs first, then the lowest-scoring questions
    const cands = [...medium().filter((q) => q.id.startsWith('a-do-')), ...medium().filter((q) => !q.id.startsWith('a-do-')).sort((a, b) => hardScore(a) - hardScore(b) || a.id.localeCompare(b.id))];
    cands.slice(0, needEasy).forEach((q) => { q.difficulty = 1; });
  }
  const needHard = target - count(3);
  if (needHard > 0) {
    // keep some penalty questions at medium so Hard is not all fines and suspensions
    let fromLicence = 0;
    let moved = 0;
    for (const q of medium().sort((a, b) => hardScore(b) - hardScore(a) || a.id.localeCompare(b.id))) {
      if (moved >= needHard) break;
      if (q.category === 'licence' && ++fromLicence > 20) continue;
      q.difficulty = 3;
      moved++;
    }
  }
  return out;
}

export const BANK: Question[] = level([...handwritten, ...auto]);

// ---------- Fixed practice sets ----------
export interface PracticeSet { id: string; level: Difficulty; part: number; label: string; ids: string[] }
export const LEVEL_LABEL: Record<Difficulty, string> = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };
const CAT_ORDER: CategoryId[] = ['signs', 'rules', 'safe', 'sharing', 'licence'];

/** Splits a level into parts with the same mix of topics, in a fixed order. */
function split(qs: Question[], parts: number, seed: string): string[][] {
  const sorted = CAT_ORDER.flatMap((c) => shuffle(qs.filter((q) => q.category === c), rng(hashStr(seed + c))));
  const buckets: Question[][] = Array.from({ length: parts }, () => []);
  sorted.forEach((q, i) => buckets[i % parts].push(q));
  return buckets.map((b, i) => shuffle(b, rng(hashStr(seed + 'order' + i))).map((q) => q.id));
}

export const SETS: PracticeSet[] = ([1, 2, 3] as Difficulty[]).flatMap((d) =>
  split(BANK.filter((q) => q.difficulty === d), 2, 'set' + d).map((ids, i) => ({
    id: `${LEVEL_LABEL[d].toLowerCase()}-${i + 1}`, level: d, part: i + 1, label: `${LEVEL_LABEL[d]} ${i + 1}`, ids,
  })),
);

/** One topic at one level: every question available, in a fixed order. */
export function topicSet(cat: CategoryId, d: Difficulty): PracticeSet {
  const qs = BANK.filter((q) => q.category === cat && q.difficulty === d);
  return { id: `topic-${cat}-${d}`, level: d, part: 0, label: LEVEL_LABEL[d], ids: shuffle(qs, rng(hashStr('topic' + cat + d))).map((q) => q.id) };
}
export const BY_ID: Record<string, Question> = Object.fromEntries(BANK.map((q) => [q.id, q]));

export const CATEGORIES: { id: CategoryId; label: string; short: string; blurb: string; icon: string }[] = [
  { id: 'signs', label: 'Road signs', short: 'Signs', blurb: 'Shapes, colours, symbols and what they ask you to do.', icon: 'signpost' },
  { id: 'rules', label: 'Rules of the road', short: 'Rules', blurb: 'Right-of-way, intersections, lights, lanes, turns and parking.', icon: 'route' },
  { id: 'safe', label: 'Safe driving', short: 'Safe driving', blurb: 'Defensive driving, weather, skids, emergencies and impairment.', icon: 'shield' },
  { id: 'sharing', label: 'Sharing the road', short: 'Sharing', blurb: 'Pedestrians, cyclists, buses, trucks, motorcycles and farm vehicles.', icon: 'users' },
  { id: 'licence', label: 'Licence & penalties', short: 'Licence', blurb: 'Graduated licensing, demerit points, fines and suspensions.', icon: 'idcard' },
];

export const SOURCE_LABEL: Record<SourceId, string> = {
  mto: 'Official MTO sample question',
  sample: 'From the G1 sample test (practice material)',
  practice: 'From the G1 practice test answer list',
  fines: 'From the limits, fines & points question set',
  faq: 'From the frequently asked G1 questions set',
  guide: 'From the G1 study guide quiz',
  gr: 'Written for G1 Ready from the MTO Driver’s Handbook',
};

/** Returns a play-ready copy of a question with options shuffled (unless fixed). */
export function prepare(q: Question, rand: () => number = Math.random): Question {
  if (q.fixed) return q;
  const order = shuffle([0, 1, 2, 3], rand);
  return { ...q, options: order.map((i) => q.options[i]) as Question['options'], answer: order.indexOf(q.answer) };
}
