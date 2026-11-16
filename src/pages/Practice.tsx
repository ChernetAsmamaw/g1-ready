import { RotateCcw, Timer, Play, CheckCircle2, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { BANK, CATEGORIES, LEVEL_LABEL, SETS, topicSet, type PracticeSet } from '../data/bank';
import type { CategoryId, Difficulty } from '../data/types';
import { clearResume, useProgress, update } from '../store';
import { Bar, Button, Card, Icon } from '../components/ui';

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

const LEVEL_STYLE: Record<Difficulty, { chip: string; bar: string; blurb: string }> = {
  1: { chip: 'bg-good-soft text-good', bar: 'bg-good', blurb: 'The basics: common signs and everyday rules.' },
  2: { chip: 'bg-yellow/30 text-ink', bar: 'bg-yellow', blurb: 'Trickier situations and what to do at each sign.' },
  3: { chip: 'bg-bad-soft text-bad', bar: 'bg-bad', blurb: 'Exact distances, penalties and the fine print.' },
};
const LEVELS: Difficulty[] = [1, 2, 3];

export default function Practice({ onStartSet, onReview, openTopics }: { onStartSet: (s: PracticeSet) => void; onReview: () => void; openTopics?: boolean }) {
  const p = useProgress();
  const [topics, setTopics] = useState(!!openTopics);
  const timed = p.settings.timer;

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-extrabold tracking-tight">Practice</h1>
      <p className="mt-1 text-muted">All {BANK.length} questions, sorted into six sets of 100: two easy, two medium and two hard. Every set mixes all topics, and your place is saved if you stop part-way.</p>

      <div className="mt-6 space-y-6">
        {LEVELS.map((d) => (
          <section key={d} aria-label={`${LEVEL_LABEL[d]} sets`}>
            <div className="mb-2 flex flex-wrap items-baseline gap-x-3">
              <h2 className="text-xl font-extrabold">{LEVEL_LABEL[d]}</h2>
              <p className="text-sm text-muted">{LEVEL_STYLE[d].blurb}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {SETS.filter((s) => s.level === d).map((s) => <SetCard key={s.id} set={s} onStart={onStartSet} />)}
            </div>
          </section>
        ))}
      </div>

      <Card className="mt-8 overflow-hidden">
        <button className="flex w-full items-center justify-between gap-3 p-5 text-left" onClick={() => setTopics((v) => !v)} aria-expanded={topics}>
          <span>
            <span className="block text-lg font-extrabold">Practise one topic <span className="ml-1 rounded-full bg-raised px-2 py-0.5 text-xs font-bold text-muted">Optional</span></span>
            <span className="block text-sm text-muted">Road signs only, rules only and so on. Each button plays every question that topic has at that level.</span>
          </span>
          <ChevronDown className={`h-5 w-5 shrink-0 transition ${topics ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        {topics && (
          <div className="divide-y divide-line border-t border-line">
            {CATEGORIES.map((c) => (
              <div key={c.id} className="flex flex-wrap items-center gap-3 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-raised"><Icon name={c.icon} /></span>
                <span className="min-w-[130px] flex-1 font-bold">{c.id === 'signs' ? 'Road signs only' : c.label}</span>
                <span className="flex flex-wrap gap-2">
                  {LEVELS.map((d) => {
                    const t = topicSet(c.id, d);
                    const r = p.resume[t.id];
                    const best = p.sets[t.id];
                    return (
                      <button key={d} onClick={() => onStartSet({ ...t, label: `${c.label}: ${LEVEL_LABEL[d]}` })} disabled={!t.ids.length}
                        aria-label={`${c.label}, ${LEVEL_LABEL[d]}, ${t.ids.length} questions${r ? ', in progress' : ''}`}
                        className={`min-h-[44px] rounded-xl px-3 py-1.5 text-left text-sm font-bold transition hover:brightness-95 disabled:opacity-40 ${LEVEL_STYLE[d].chip}`}>
                        {LEVEL_LABEL[d]} <span className="font-semibold opacity-80">· {t.ids.length}</span>
                        {(r || best) && <span className="block text-[11px] font-semibold opacity-80">{r ? `At ${Math.min(r.i + 1, t.ids.length)}/${t.ids.length}` : `Best ${best!.best}%`}</span>}
                      </button>
                    );
                  })}
                </span>
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-3 p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-raised"><RotateCcw className="h-5 w-5" aria-hidden="true" /></span>
              <span className="min-w-[130px] flex-1">
                <span className="block font-bold">Missed questions</span>
                <span className="block text-sm text-muted">{p.missed.length ? `${p.missed.length} to get right again` : 'Nothing to review yet'}</span>
              </span>
              <Button size="sm" variant="navy" disabled={!p.missed.length} onClick={onReview}>Review</Button>
            </div>
          </div>
        )}
      </Card>

      <Card className="mt-4 flex items-center justify-between gap-4 p-4">
        <span className="flex items-center gap-3">
          <Timer className="h-5 w-5 text-muted" aria-hidden="true" />
          <span>
            <span className="block font-bold">Timer</span>
            <span className="block text-sm text-muted">30 seconds per question. Points are never based on speed.</span>
          </span>
        </span>
        <Toggle checked={timed} label="Timer" onChange={(v) => update((s) => ({ ...s, settings: { ...s.settings, timer: v } }))} />
      </Card>
    </div>
  );
}

function SetCard({ set, onStart }: { set: PracticeSet; onStart: (s: PracticeSet) => void }) {
  const p = useProgress();
  const r = p.resume[set.id];
  const done = p.sets[set.id];
  const total = set.ids.length;
  const st = LEVEL_STYLE[set.level];
  const at = r ? Math.min(r.i, total) : 0;
  const right = r ? r.answers.filter((a) => a.correct).length : 0;
  return (
    <Card className="flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-2xl font-extrabold tracking-tight">{set.label}</h3>
          <p className="text-sm text-muted">{total} questions · all topics</p>
        </div>
        {done ? (
          <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-extrabold ${done.best >= 80 ? 'bg-good-soft text-good' : 'bg-raised'}`}>
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />Best {done.best}%
          </span>
        ) : (
          <span className={`rounded-full px-2.5 py-1 text-xs font-extrabold ${st.chip}`}>{LEVEL_LABEL[set.level]}</span>
        )}
      </div>
      <div className="mt-4">
        <Bar value={at / total} color={st.bar} label={`${set.label} progress`} />
        <p className="mt-1.5 text-xs font-semibold text-muted">
          {r ? `In progress: ${at} of ${total} answered, ${right} correct` : done ? `Finished ${done.plays} time${done.plays === 1 ? '' : 's'}` : 'Not started'}
        </p>
      </div>
      <div className="mt-4 flex gap-2">
        <Button className="flex-1" onClick={() => onStart(set)}><Play className="h-4 w-4" aria-hidden="true" />{r ? 'Continue' : done ? 'Play again' : 'Start'}</Button>
        {r && <Button variant="ghost" onClick={() => clearResume(set.id)} aria-label={`Start ${set.label} over`}>Start over</Button>}
      </div>
    </Card>
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
