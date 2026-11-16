import { Flame, Play, Sparkles, ClipboardCheck, Signpost, ChevronRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { BANK, CATEGORIES, SETS, type PracticeSet } from '../data/bank';
import { SignSvg } from '../data/signs';
import type { CategoryId } from '../data/types';
import { dayKey, levelFor, levelName, liveStreak, useProgress } from '../store';
import { Bar, Button, Card, Icon, Ring, SectionTitle, pct } from '../components/ui';
import { catAccuracy } from './Practice';

export default function Dashboard({ go, startCategory, startDaily, startReview, startSet }: {
  startSet: (s: PracticeSet) => void;
  go: (r: string) => void;
  startCategory: (c: CategoryId) => void;
  startDaily: () => void;
  startReview: () => void;
}) {
  const p = useProgress();
  const streak = liveStreak(p);
  const lvl = levelFor(p.xp);
  const mastered = Object.values(p.qstats).filter((s) => s.last === 1).length;
  const overall = mastered / BANK.length;
  const dailyDone = p.daily?.date === dayKey();
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="mx-auto max-w-5xl">
      {/* Hero */}
      <section className="fade-up relative overflow-hidden rounded-[28px] bg-navy px-6 py-8 text-white sm:px-10 sm:py-10">
        <div className="pointer-events-none absolute -right-6 -top-6 hidden h-48 w-48 rotate-12 opacity-90 sm:block" aria-hidden="true">
          <SignSvg id="stop" decorative className="h-full w-full" />
        </div>
        <div className="pointer-events-none absolute bottom-[-30px] right-36 hidden h-32 w-32 -rotate-6 opacity-80 md:block" aria-hidden="true">
          <SignSvg id="curve-right" decorative className="h-full w-full" />
        </div>
        <p className="font-bold text-yellow">{greet}{p.name ? `, ${p.name}` : ''}</p>
        <h1 className="mt-2 max-w-xl text-3xl font-extrabold leading-tight sm:text-4xl">Ready to become a confident driver?</h1>
        <p className="mt-3 max-w-lg text-white/80">Practise Ontario G1 road rules and signs with instant explanations from the MTO Driver's Handbook.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button size="lg" onClick={() => go('practice')}><Play className="h-5 w-5" aria-hidden="true" />Start practising</Button>
          <Button size="lg" variant="ghost" className="border-white/30 text-white hover:bg-white/10" onClick={() => go('mock')}>
            <ClipboardCheck className="h-5 w-5" aria-hidden="true" />Mock test
          </Button>
        </div>
      </section>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-muted"><Flame className="h-4 w-4 text-[rgb(234,120,30)]" aria-hidden="true" />Daily streak</div>
          <div className="mt-1 text-3xl font-extrabold tabular-nums">{streak}<span className="ml-1 text-base font-bold text-muted">day{streak === 1 ? '' : 's'}</span></div>
          <div className="mt-1 text-xs text-muted">Best: {p.streak.best}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-bold text-muted">Level {lvl.level} · {levelName(lvl.level)}</div>
          <div className="mt-1 text-3xl font-extrabold tabular-nums">{p.xp}<span className="ml-1 text-base font-bold text-muted">XP</span></div>
          <Bar value={lvl.pct} className="mt-2" color="bg-yellow" label="Progress to next level" />
        </Card>
        <Card className="col-span-2 flex items-center gap-4 p-4">
          <Ring value={overall} size={76} stroke={8}>
            <span className="text-lg font-extrabold tabular-nums">{Math.round(overall * 100)}%</span>
          </Ring>
          <div>
            <div className="text-sm font-bold text-muted">Overall progress</div>
            <div className="text-lg font-extrabold">{mastered} of {BANK.length} questions mastered</div>
            <div className="text-xs text-muted">Mastered = answered correctly the last time you saw it.</div>
          </div>
        </Card>
      </div>

      {/* Daily challenge & review */}
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Card className="flex items-center gap-4 p-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow text-yellow-ink"><Sparkles className="h-6 w-6" aria-hidden="true" /></span>
          <div className="min-w-0 flex-1">
            <h2 className="font-extrabold">Daily challenge</h2>
            <p className="text-sm text-muted">{dailyDone ? `Done today: ${p.daily!.correct}/${p.daily!.total}. New one tomorrow.` : 'Five questions, one from each topic. Same set for everyone today.'}</p>
          </div>
          {dailyDone ? <CheckCircle2 className="h-7 w-7 text-good" aria-label="Completed" /> : <Button onClick={startDaily}>Play</Button>}
        </Card>
        <Card className="flex items-center gap-4 p-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-info-soft text-info"><RotateCcw className="h-6 w-6" aria-hidden="true" /></span>
          <div className="min-w-0 flex-1">
            <h2 className="font-extrabold">Missed questions</h2>
            <p className="text-sm text-muted">{p.missed.length ? `${p.missed.length} question${p.missed.length === 1 ? '' : 's'} to get right again.` : 'Questions you get wrong will appear here.'}</p>
          </div>
          <Button variant="navy" onClick={startReview} disabled={!p.missed.length}>Review</Button>
        </Card>
      </div>

      <SectionTitle action={<button className="text-sm font-bold text-info" onClick={() => go('practice')}>Open Practice</button>}>Practice sets</SectionTitle>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {SETS.map((s) => {
          const r = p.resume[s.id];
          const done = p.sets[s.id];
          const tone = s.level === 1 ? 'bg-good' : s.level === 2 ? 'bg-yellow' : 'bg-bad';
          return (
            <button key={s.id} onClick={() => startSet(s)} className="group text-left" aria-label={`${s.label}, 100 questions${r ? ', in progress' : done ? `, best ${done.best}%` : ''}`}>
              <Card className="h-full p-4 transition group-hover:-translate-y-0.5 group-hover:border-info group-hover:shadow-md">
                <span className={`block h-1.5 w-8 rounded-full ${tone}`} />
                <span className="mt-2 block text-lg font-extrabold">{s.label}</span>
                <span className="block text-xs font-semibold text-muted">{r ? `Continue at ${Math.min(r.i + 1, 100)}/100` : done ? `Best ${done.best}%` : '100 questions'}</span>
                <Bar value={r ? r.i / 100 : done ? 1 : 0} className="mt-2" color={tone} label={`${s.label} progress`} />
              </Card>
            </button>
          );
        })}
      </div>

      <SectionTitle action={<button className="text-sm font-bold text-info" onClick={() => go('progress')}>See all</button>}>Topics</SectionTitle>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c) => {
          const a = catAccuracy(p.qstats, c.id);
          const acc = a.acc === null ? null : Math.round(a.acc * 100);
          return (
            <button key={c.id} onClick={() => startCategory(c.id)} className="group text-left">
              <Card className="h-full p-5 transition group-hover:-translate-y-0.5 group-hover:border-info group-hover:shadow-md">
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-raised"><Icon name={c.icon} className="h-5 w-5" /></span>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-extrabold ${acc === null ? 'bg-raised text-muted' : acc >= 80 ? 'bg-good-soft text-good' : acc >= 60 ? 'bg-yellow/25' : 'bg-bad-soft text-bad'}`}>
                    {acc === null ? 'New' : `${acc}% accuracy`}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-extrabold">{c.label}</h3>
                <p className="mt-0.5 text-sm text-muted">{c.blurb}</p>
                <div className="mt-3 flex items-center gap-3">
                  <Bar value={a.mastered / a.total} color="bg-good" label={`${c.label} mastered`} />
                  <span className="shrink-0 text-xs font-bold tabular-nums text-muted">{a.mastered}/{a.total}</span>
                </div>
              </Card>
            </button>
          );
        })}
        <button onClick={() => go('signs')} className="group text-left">
          <Card className="h-full border-dashed p-5 transition group-hover:-translate-y-0.5 group-hover:border-info">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow text-yellow-ink"><Signpost className="h-5 w-5" aria-hidden="true" /></span>
            <h3 className="mt-3 text-lg font-extrabold">Road Signs Learning Centre</h3>
            <p className="mt-0.5 text-sm text-muted">Browse every sign, then try matching and spot-the-difference games.</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-info">Open <ChevronRight className="h-4 w-4" aria-hidden="true" /></span>
          </Card>
        </button>
      </div>

      <SectionTitle>Recent results</SectionTitle>
      {p.history.length === 0 ? (
        <Card className="p-6 text-center text-muted">No quizzes yet. Your results will show up here.</Card>
      ) : (
        <Card className="divide-y divide-line">
          {p.history.slice(0, 5).map((h) => {
            const s = pct(h.correct, h.total);
            return (
              <div key={h.id} className="flex items-center gap-4 p-4">
                <span className={`flex h-11 w-14 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold ${s >= 80 ? 'bg-good-soft text-good' : s >= 60 ? 'bg-yellow/25' : 'bg-bad-soft text-bad'}`}>{s}%</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-bold">{h.title}</div>
                  <div className="text-sm text-muted">{h.correct}/{h.total} correct · {new Date(h.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
                </div>
                {h.mode === 'mock' && <span className={`rounded-full px-2.5 py-1 text-xs font-extrabold ${h.passed ? 'bg-good-soft text-good' : 'bg-bad-soft text-bad'}`}>{h.passed ? 'Pass' : 'Fail'}</span>}
              </div>
            );
          })}
        </Card>
      )}
    </div>
  );
}
