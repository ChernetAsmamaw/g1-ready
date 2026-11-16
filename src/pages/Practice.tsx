import { useState } from 'react';
import { Shuffle, Signpost, RotateCcw, Timer, Play } from 'lucide-react';
import { BANK, CATEGORIES } from '../data/bank';
import type { CategoryId, Difficulty } from '../data/types';
import { useProgress, update } from '../store';
import { Button, Card, Icon, pct } from '../components/ui';

export interface PracticeChoice { cats: CategoryId[]; difficulty: Difficulty; count: number; timed: boolean; title: string; review?: boolean }

type Topic = CategoryId | 'mixed' | 'review';

export function catAccuracy(qstats: Record<string, { s: number; c: number; last: 0 | 1 }>, cat: CategoryId) {
  let s = 0, c = 0, seen = 0, mastered = 0;
  const qs = BANK.filter((q) => q.category === cat);
  for (const q of qs) {
    const st = qstats[q.id];
    if (!st) continue;
    s += st.s; c += st.c; seen++;
    if (st.last === 1) mastered++;
  }
  return { attempts: s, correct: c, acc: s ? c / s : null, seen, mastered, total: qs.length };
}

export default function Practice({ onStart, initial }: { onStart: (c: PracticeChoice) => void; initial?: Topic }) {
  const p = useProgress();
  const [topic, setTopic] = useState<Topic>(initial || 'mixed');
  const [difficulty, setDifficulty] = useState<Difficulty>(1);
  const [count, setCount] = useState(10);
  const timed = p.settings.timer;

  const topics: { id: Topic; label: string; sub: string; icon: JSX.Element }[] = [
    { id: 'mixed', label: 'Mixed practice', sub: 'Questions from every topic', icon: <Shuffle className="h-5 w-5" aria-hidden="true" /> },
    ...CATEGORIES.map((c) => {
      const a = catAccuracy(p.qstats, c.id);
      return {
        id: c.id as Topic,
        label: c.id === 'signs' ? 'Road signs only' : c.label,
        sub: a.acc === null ? `${a.total} questions · not started` : `${a.total} questions · ${pct(a.correct, a.attempts)}% accuracy`,
        icon: c.id === 'signs' ? <Signpost className="h-5 w-5" aria-hidden="true" /> : <Icon name={c.icon} />,
      };
    }),
    { id: 'review', label: 'Missed questions', sub: p.missed.length ? `${p.missed.length} to review` : 'Nothing to review yet', icon: <RotateCcw className="h-5 w-5" aria-hidden="true" /> },
  ];

  const start = () => {
    const cats = topic === 'mixed' || topic === 'review' ? CATEGORIES.map((c) => c.id) : [topic];
    const t = topics.find((x) => x.id === topic)!;
    onStart({ cats, difficulty, count, timed, title: t.label, review: topic === 'review' });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-extrabold tracking-tight">Practice</h1>
      <p className="mt-1 text-muted">Pick a topic, a level and how many questions. Every answer comes with an explanation.</p>

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-extrabold uppercase tracking-wider text-muted">1. Topic</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {topics.map((t) => {
            const disabled = t.id === 'review' && !p.missed.length;
            const sel = topic === t.id;
            return (
              <label key={t.id} className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 transition ${sel ? 'border-info bg-info-soft' : 'border-line bg-surface hover:border-info/60'} ${disabled ? 'pointer-events-none opacity-50' : ''}`}>
                <input type="radio" name="topic" className="sr-only" checked={sel} disabled={disabled} onChange={() => setTopic(t.id)} />
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${sel ? 'bg-info text-white' : 'bg-raised'}`}>{t.icon}</span>
                <span className="min-w-0">
                  <span className="block font-bold">{t.label}</span>
                  <span className="block text-sm text-muted">{t.sub}</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {topic !== 'review' && (
        <fieldset className="mt-6">
          <legend className="mb-3 text-sm font-extrabold uppercase tracking-wider text-muted">2. Level</legend>
          <div className="grid grid-cols-3 gap-2 rounded-2xl bg-raised p-1.5">
            {([[1, 'Beginner'], [2, 'Intermediate'], [3, 'Advanced']] as const).map(([d, l]) => (
              <label key={d} className={`cursor-pointer rounded-xl py-3 text-center text-sm font-bold transition sm:text-base ${difficulty === d ? 'bg-surface shadow-sm' : 'text-muted'}`}>
                <input type="radio" name="level" className="sr-only" checked={difficulty === d} onChange={() => setDifficulty(d)} />{l}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-extrabold uppercase tracking-wider text-muted">{topic === 'review' ? '2' : '3'}. Number of questions</legend>
        <div className="grid grid-cols-3 gap-2 rounded-2xl bg-raised p-1.5">
          {[10, 20, 40].map((n) => (
            <label key={n} className={`cursor-pointer rounded-xl py-3 text-center font-bold transition ${count === n ? 'bg-surface shadow-sm' : 'text-muted'}`}>
              <input type="radio" name="count" className="sr-only" checked={count === n} onChange={() => setCount(n)} />{n}
            </label>
          ))}
        </div>
      </fieldset>

      <Card className="mt-6 flex items-center justify-between gap-4 p-4">
        <span className="flex items-center gap-3">
          <Timer className="h-5 w-5 text-muted" aria-hidden="true" />
          <span>
            <span className="block font-bold">Timer</span>
            <span className="block text-sm text-muted">30 seconds per question. Points are never based on speed.</span>
          </span>
        </span>
        <Toggle checked={timed} label="Timer" onChange={(v) => update((s) => ({ ...s, settings: { ...s.settings, timer: v } }))} />
      </Card>

      <Button size="lg" className="mt-6 w-full" onClick={start}><Play className="h-5 w-5" aria-hidden="true" />Start practising</Button>
    </div>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)}
      className={`relative h-8 w-14 shrink-0 rounded-full transition ${checked ? 'bg-good' : 'bg-line'}`}>
      <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${checked ? 'left-7' : 'left-1'}`} />
    </button>
  );
}
