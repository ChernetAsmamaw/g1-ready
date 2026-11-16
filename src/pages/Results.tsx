import { useState } from 'react';
import { Check, X, RotateCcw, Target, BookOpen, ArrowRight, Award, Clock, Trophy, ChevronDown } from 'lucide-react';
import { CATEGORIES } from '../data/bank';
import { SIGNS, SignSvg } from '../data/signs';
import type { CategoryId } from '../data/types';
import type { PlayQ } from '../lib/build';
import { ACHIEVEMENTS, type Attempt } from '../store';
import { Bar, Button, Card, Icon, Ring, SectionTitle, fmtTime, pct } from '../components/ui';

export interface ResultsData { attempt: Attempt; questions: PlayQ[]; earned: string[] }

export default function Results({ data, onRetry, onWeakest, onHome, onSign }: {
  data: ResultsData;
  onRetry: (qs: PlayQ[]) => void;
  onWeakest: (cat: CategoryId) => void;
  onHome: () => void;
  onSign: (id: string) => void;
}) {
  const { attempt: a, questions, earned } = data;
  const [showAll, setShowAll] = useState(false);
  const acc = pct(a.correct, a.total);
  const isMock = a.mode === 'mock';
  const wrongQs = questions.filter((_, k) => !a.answers[k]?.correct);
  const cats = (Object.keys(a.byCat) as CategoryId[]).map((c) => ({ c, v: a.byCat[c]! })).sort((x, y) => x.v[0] / x.v[1] - y.v[0] / y.v[1]);
  const weakest = cats[0];
  const wrongSigns = [...new Set(wrongQs.map((q) => q.sign).filter(Boolean) as string[])];

  const headline = isMock
    ? a.passed ? 'You passed the mock test!' : 'Not a pass yet. Keep going!'
    : acc >= 90 ? 'Outstanding!' : acc >= 80 ? 'Great work!' : acc >= 60 ? 'Good effort!' : 'Keep practising!';
  const sub = isMock
    ? a.passed ? 'You scored at least 16 out of 20 in both parts, like the real G1 test.' : 'The real G1 test needs at least 16 out of 20 in each part.'
    : acc >= 80 ? 'That is at G1 pass level (80%).' : 'The G1 test needs 80% in each part. Review the explanations below.';

  return (
    <div className="mx-auto max-w-3xl pb-10">
      <Card className="fade-up overflow-hidden">
        <div className={`px-6 py-8 text-center ${isMock ? (a.passed ? 'bg-good-soft' : 'bg-bad-soft') : 'bg-navy text-white'}`}>
          <p className="text-sm font-bold uppercase tracking-wider opacity-80">{a.title}</p>
          <div className="mt-4 flex justify-center">
            <Ring value={a.correct / a.total} size={132} stroke={12} color={acc >= 80 ? 'rgb(var(--good))' : acc >= 60 ? 'rgb(var(--yellow))' : 'rgb(var(--bad))'}>
              <div>
                <div className="text-4xl font-extrabold tabular-nums">{acc}%</div>
                <div className="text-xs font-bold opacity-80">{a.correct}/{a.total}</div>
              </div>
            </Ring>
          </div>
          <h1 className="mt-4 text-2xl font-extrabold sm:text-3xl">{headline}</h1>
          <p className="mt-1 opacity-90">{sub}</p>
        </div>
        <dl className="grid grid-cols-2 divide-line border-t border-line sm:grid-cols-4 sm:divide-x">
          {[
            { k: 'Correct', v: a.correct, icon: <Check className="h-4 w-4 text-good" aria-hidden="true" /> },
            { k: 'Incorrect', v: a.total - a.correct, icon: <X className="h-4 w-4 text-bad" aria-hidden="true" /> },
            { k: 'Time', v: fmtTime(a.durationMs), icon: <Clock className="h-4 w-4 text-info" aria-hidden="true" /> },
            { k: isMock ? 'Result' : 'Points', v: isMock ? (a.passed ? 'Pass' : 'Fail') : a.points, icon: <Trophy className="h-4 w-4 text-[rgb(200,150,20)]" aria-hidden="true" /> },
          ].map((s) => (
            <div key={s.k} className="p-4 text-center">
              <dt className="flex items-center justify-center gap-1 text-xs font-bold uppercase tracking-wide text-muted">{s.icon}{s.k}</dt>
              <dd className="mt-1 text-2xl font-extrabold tabular-nums">{s.v}</dd>
            </div>
          ))}
        </dl>
      </Card>

      {earned.length > 0 && (
        <Card className="pop mt-4 border-yellow bg-yellow/15 p-4">
          <p className="flex items-center gap-2 font-extrabold"><Award className="h-5 w-5" aria-hidden="true" />Achievement unlocked</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {earned.map((id) => {
              const ach = ACHIEVEMENTS.find((x) => x.id === id);
              return ach ? <li key={id} className="flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-sm font-bold"><Icon name={ach.icon} className="h-4 w-4" />{ach.name}</li> : null;
            })}
          </ul>
        </Card>
      )}

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {wrongQs.length > 0 && (
          <Button size="lg" onClick={() => onRetry(wrongQs)}><RotateCcw className="h-5 w-5" aria-hidden="true" />Retry incorrect ({wrongQs.length})</Button>
        )}
        {weakest && !isMock && (
          <Button size="lg" variant="navy" onClick={() => onWeakest(weakest.c)}><Target className="h-5 w-5" aria-hidden="true" />Practise weakest topic</Button>
        )}
        {isMock && (
          <Button size="lg" variant="navy" onClick={() => onWeakest(a.sections && a.sections.signs[0] / 20 < a.sections.rules[0] / 20 ? 'signs' : 'rules')}><Target className="h-5 w-5" aria-hidden="true" />Practise weaker part</Button>
        )}
        <Button size="lg" variant="soft" onClick={() => setShowAll((v) => !v)} aria-expanded={showAll}><BookOpen className="h-5 w-5" aria-hidden="true" />{showAll ? 'Hide' : 'Review'} all explanations</Button>
        <Button size="lg" variant="ghost" onClick={onHome}>Continue <ArrowRight className="h-5 w-5" aria-hidden="true" /></Button>
      </div>

      {isMock && a.sections && (
        <>
          <SectionTitle>Test sections</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            {([['signs', 'Part 1: Road signs'], ['rules', 'Part 2: Rules of the road']] as const).map(([k, label]) => {
              const [c, t] = a.sections![k];
              const ok = c >= 16;
              return (
                <Card key={k} className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{label}</span>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-extrabold ${ok ? 'bg-good-soft text-good' : 'bg-bad-soft text-bad'}`}>{ok ? 'Pass' : 'Needs 16'}</span>
                  </div>
                  <div className="mt-2 text-3xl font-extrabold tabular-nums">{c}<span className="text-lg text-muted">/{t}</span></div>
                  <Bar value={c / t} className="mt-2" color={ok ? 'bg-good' : 'bg-bad'} label={label} />
                </Card>
              );
            })}
          </div>
        </>
      )}

      <SectionTitle>Performance by topic</SectionTitle>
      <Card className="divide-y divide-line">
        {cats.map(({ c, v }) => {
          const cat = CATEGORIES.find((x) => x.id === c)!;
          const p = v[0] / v[1];
          return (
            <div key={c} className="flex items-center gap-4 p-4">
              <Icon name={cat.icon} className="h-5 w-5 text-muted" />
              <div className="min-w-0 flex-1">
                <div className="flex justify-between text-sm font-bold"><span>{cat.label}</span><span className="tabular-nums">{v[0]}/{v[1]}</span></div>
                <Bar value={p} className="mt-1.5" color={p >= 0.8 ? 'bg-good' : p >= 0.6 ? 'bg-yellow' : 'bg-bad'} label={cat.label} />
              </div>
            </div>
          );
        })}
      </Card>

      {wrongSigns.length > 0 && (
        <>
          <SectionTitle>Recommended review</SectionTitle>
          <p className="-mt-1 mb-3 text-muted">Study these signs you missed in the Signs centre.</p>
          <div className="flex flex-wrap gap-3">
            {wrongSigns.map((id) => (
              <button key={id} onClick={() => onSign(id)} className="flex w-28 flex-col items-center gap-1 rounded-2xl border border-line bg-surface p-3 text-center text-xs font-bold hover:border-info">
                <SignSvg id={id} className="h-16 w-16" decorative />
                {SIGNS[id]?.name}
              </button>
            ))}
          </div>
        </>
      )}

      <SectionTitle>{showAll ? 'All questions' : wrongQs.length ? 'Questions to review' : 'Every answer was correct'}</SectionTitle>
      <ol className="space-y-3">
        {questions.map((q, k) => {
          const r = a.answers[k];
          if (!r || (!showAll && r.correct)) return null;
          return <ReviewItem key={q.id + k} n={k + 1} q={q} chosen={r.chosen} />;
        })}
      </ol>
    </div>
  );
}

export function ReviewItem({ q, chosen, n }: { q: PlayQ; chosen: number; n: number }) {
  const [open, setOpen] = useState(true);
  const ok = chosen === q.answer;
  return (
    <li>
      <Card className="p-4">
        <button className="flex w-full items-start gap-3 text-left" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${ok ? 'bg-good text-white' : 'bg-bad text-white'}`} aria-label={ok ? 'Correct' : 'Incorrect'}>
            {ok ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </span>
          {q.sign && <SignSvg id={q.sign} className="h-14 w-14 shrink-0" />}
          {q.optionSigns && <span className="flex shrink-0 gap-1">{q.optionSigns.map((s) => <SignSvg key={s} id={s} className="h-12 w-12" />)}</span>}
          <span className="flex-1 font-bold"><span className="text-muted">{n}. </span>{q.text}</span>
          <ChevronDown className={`h-5 w-5 shrink-0 transition ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        {open && (
          <div className="mt-3 space-y-1.5 pl-10 text-sm">
            {!ok && <p><span className="font-bold text-bad">Your answer: </span>{chosen >= 0 ? q.options[chosen] : 'No answer (time ran out)'}</p>}
            <p><span className="font-bold text-good">Correct answer: </span>{q.options[q.answer]}</p>
            <p className="leading-relaxed text-ink/90">{q.explanation}</p>
          </div>
        )}
      </Card>
    </li>
  );
}
