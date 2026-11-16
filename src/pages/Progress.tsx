import { useState } from 'react';
import { RotateCcw, Target, ClipboardCheck } from 'lucide-react';
import { BANK, CATEGORIES } from '../data/bank';
import { ALL_SIGNS } from '../data/signs';
import type { CategoryId } from '../data/types';
import { ACHIEVEMENTS, levelFor, levelName, liveStreak, resetProgress, update, useProgress } from '../store';
import { Bar, Button, Card, Icon, Ring, SectionTitle, pct } from '../components/ui';
import { catAccuracy, Toggle } from './Practice';

export function ProgressPage({ startCategory, startReview, go }: { startCategory: (c: CategoryId) => void; startReview: () => void; go: (r: string) => void }) {
  const p = useProgress();
  const stats = CATEGORIES.map((c) => ({ c, a: catAccuracy(p.qstats, c.id) }));
  const answered = Object.values(p.qstats).reduce((n, s) => n + s.s, 0);
  const correct = Object.values(p.qstats).reduce((n, s) => n + s.c, 0);
  const mastered = Object.values(p.qstats).filter((s) => s.last === 1).length;
  const weak = stats.filter((s) => s.a.acc !== null).sort((x, y) => (x.a.acc ?? 1) - (y.a.acc ?? 1))[0];
  const mocks = p.history.filter((h) => h.mode === 'mock');
  const readiness = Math.round(
    (stats.reduce((n, s) => n + (s.a.acc ?? 0) * Math.min(1, s.a.seen / Math.max(20, s.a.total * 0.3)), 0) / stats.length) * 100,
  );

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-extrabold tracking-tight">My progress</h1>
      <p className="mt-1 text-muted">Saved in this browser, so it is here next time you visit on this device.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Card className="flex items-center gap-4 p-5 sm:col-span-1">
          <Ring value={readiness / 100} size={88} color={readiness >= 80 ? 'rgb(var(--good))' : 'rgb(var(--yellow))'}>
            <span className="text-xl font-extrabold">{readiness}%</span>
          </Ring>
          <div>
            <div className="font-extrabold">Test readiness</div>
            <div className="text-sm text-muted">Accuracy weighted by how much of each topic you've covered.</div>
          </div>
        </Card>
        <Card className="grid grid-cols-3 gap-2 p-5 text-center sm:col-span-2">
          <Stat k="Answered" v={answered} />
          <Stat k="Accuracy" v={`${pct(correct, answered)}%`} />
          <Stat k="Mastered" v={`${mastered}/${BANK.length}`} />
        </Card>
      </div>

      <SectionTitle>By topic</SectionTitle>
      <Card className="divide-y divide-line">
        {stats.map(({ c, a }) => (
          <div key={c.id} className="flex flex-wrap items-center gap-4 p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-raised"><Icon name={c.icon} /></span>
            <div className="min-w-[180px] flex-1">
              <div className="flex justify-between text-sm font-bold">
                <span>{c.label}</span>
                <span className="tabular-nums text-muted">{a.acc === null ? 'Not started' : `${Math.round(a.acc * 100)}% accuracy`}</span>
              </div>
              <Bar value={a.mastered / a.total} className="mt-1.5" label={`${c.label} mastered`} color={a.acc === null ? 'bg-line' : a.acc >= 0.8 ? 'bg-good' : a.acc >= 0.6 ? 'bg-yellow' : 'bg-bad'} />
              <div className="mt-1 text-xs text-muted">{a.mastered} of {a.total} mastered · {a.seen} seen</div>
            </div>
            <Button size="sm" variant="soft" onClick={() => startCategory(c.id)}>Practise</Button>
          </div>
        ))}
      </Card>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Card className="p-5">
          <Target className="h-6 w-6 text-bad" aria-hidden="true" />
          <h2 className="mt-2 font-extrabold">Weakest topic</h2>
          <p className="text-sm text-muted">{weak ? `${weak.c.label}, at ${Math.round((weak.a.acc ?? 0) * 100)}%` : 'Answer a few questions to find out.'}</p>
          {weak && <Button size="sm" className="mt-3" onClick={() => startCategory(weak.c.id)}>Practise it</Button>}
        </Card>
        <Card className="p-5">
          <RotateCcw className="h-6 w-6 text-info" aria-hidden="true" />
          <h2 className="mt-2 font-extrabold">Missed questions</h2>
          <p className="text-sm text-muted">{p.missed.length} waiting · {p.cleared} fixed so far</p>
          <Button size="sm" variant="navy" className="mt-3" disabled={!p.missed.length} onClick={startReview}>Review them</Button>
        </Card>
        <Card className="p-5">
          <ClipboardCheck className="h-6 w-6 text-good" aria-hidden="true" />
          <h2 className="mt-2 font-extrabold">Mock tests</h2>
          <p className="text-sm text-muted">{mocks.length ? `${mocks.filter((m) => m.passed).length} passed of ${mocks.length} · best ${p.bests.mock}/40` : 'None taken yet.'}</p>
          <Button size="sm" variant="soft" className="mt-3" onClick={() => go('mock')}>Take one</Button>
        </Card>
      </div>

      <SectionTitle>History</SectionTitle>
      {p.history.length === 0 ? <Card className="p-6 text-center text-muted">No quizzes yet.</Card> : (
        <Card className="divide-y divide-line">
          {p.history.slice(0, 20).map((h) => {
            const s = pct(h.correct, h.total);
            return (
              <div key={h.id} className="flex items-center gap-3 p-3.5 text-sm">
                <span className={`w-12 shrink-0 rounded-lg py-1.5 text-center font-extrabold ${s >= 80 ? 'bg-good-soft text-good' : s >= 60 ? 'bg-yellow/25' : 'bg-bad-soft text-bad'}`}>{s}%</span>
                <span className="min-w-0 flex-1 truncate font-bold">{h.title}</span>
                <span className="tabular-nums text-muted">{h.correct}/{h.total}</span>
                <span className="hidden w-24 text-right text-muted sm:block">{new Date(h.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
              </div>
            );
          })}
        </Card>
      )}
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string | number }) {
  return (
    <div>
      <div className="text-2xl font-extrabold tabular-nums sm:text-3xl">{v}</div>
      <div className="text-xs font-bold uppercase tracking-wide text-muted">{k}</div>
    </div>
  );
}

export function ProfilePage() {
  const p = useProgress();
  const lvl = levelFor(p.xp);
  const [confirm, setConfirm] = useState(false);
  const set = (patch: Partial<typeof p.settings>) => update((s) => ({ ...s, settings: { ...s.settings, ...patch } }));

  return (
    <div className="mx-auto max-w-3xl">
      <Card className="flex flex-wrap items-center gap-5 p-6">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow text-2xl font-extrabold text-yellow-ink" aria-hidden="true">
          {(p.name || 'G1').slice(0, 2).toUpperCase()}
        </span>
        <div className="min-w-[200px] flex-1">
          <label className="text-xs font-bold uppercase tracking-wider text-muted" htmlFor="name">Your name</label>
          <input id="name" value={p.name} maxLength={24} placeholder="Add your name"
            onChange={(e) => { const v = e.target.value; update((s) => ({ ...s, name: v })); }}
            className="mt-1 block w-full rounded-xl border border-line bg-bg px-3 py-2 text-lg font-bold outline-none focus:border-info" />
          <div className="mt-2 text-sm text-muted">Level {lvl.level} · {levelName(lvl.level)} · {p.xp} XP · {liveStreak(p)}-day streak</div>
          <Bar value={lvl.pct} className="mt-2" color="bg-yellow" label="Progress to next level" />
          <div className="mt-1 text-xs text-muted">{lvl.span - lvl.into} XP to level {lvl.level + 1}</div>
        </div>
      </Card>

      <SectionTitle>Achievements</SectionTitle>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {ACHIEVEMENTS.map((a) => {
          const got = !!p.achievements[a.id];
          return (
            <Card key={a.id} className={`p-4 ${got ? '' : 'opacity-55'}`}>
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${got ? 'bg-yellow text-yellow-ink' : 'bg-raised text-muted'}`}><Icon name={a.icon} /></span>
              <div className="mt-2 font-extrabold">{a.name}</div>
              <div className="text-xs text-muted">{a.desc}</div>
              <div className="mt-1 text-xs font-bold">{got ? 'Unlocked' : 'Locked'}</div>
            </Card>
          );
        })}
      </div>

      <SectionTitle>Personal bests</SectionTitle>
      <Card className="grid grid-cols-2 gap-3 p-5 text-center sm:grid-cols-4">
        <Stat k="Longest streak" v={`${p.streak.best}d`} />
        <Stat k="Best run" v={p.bests.combo ?? 0} />
        <Stat k="Best mock" v={p.bests.mock !== undefined ? `${p.bests.mock}/40` : '–'} />
        <Stat k="Signs studied" v={`${p.signsStudied.length}/${ALL_SIGNS.length}`} />
      </Card>
      <p className="mt-2 text-xs text-muted">A shared leaderboard needs accounts, which this version doesn't have. Your bests are tracked here instead.</p>

      <SectionTitle>Settings</SectionTitle>
      <Card className="divide-y divide-line">
        <Row label="Sound effects" sub="Short tones for right and wrong answers."><Toggle label="Sound effects" checked={p.settings.sound} onChange={(v) => set({ sound: v })} /></Row>
        <Row label="Timer in practice" sub="30 seconds per question."><Toggle label="Timer in practice" checked={p.settings.timer} onChange={(v) => set({ timer: v })} /></Row>
        <Row label="Larger text" sub="Makes all text bigger."><Toggle label="Larger text" checked={p.settings.largeText} onChange={(v) => set({ largeText: v })} /></Row>
        <Row label="Reduce motion" sub="Turns off animations and flashing lights."><Toggle label="Reduce motion" checked={p.settings.reduceMotion} onChange={(v) => set({ reduceMotion: v })} /></Row>
        <Row label="Theme" sub="Light, dark, or match your device.">
          <select value={p.settings.theme} onChange={(e) => set({ theme: e.target.value as 'system' })} aria-label="Theme"
            className="rounded-xl border border-line bg-bg px-3 py-2 font-bold">
            <option value="system">Device</option><option value="light">Light</option><option value="dark">Dark</option>
          </select>
        </Row>
      </Card>

      <SectionTitle>About the questions</SectionTitle>
      <Card className="space-y-2 p-5 text-sm leading-relaxed">
        <p>G1 Ready is a study tool. It is not made by or connected to the Ontario Ministry of Transportation, and the questions are not the official test questions.</p>
        <p>Every question shows where it came from: official MTO sample questions, the uploaded practice tests and question sets, or questions written for G1 Ready from the MTO Driver's Handbook. Where a practice source disagreed with the handbook, the handbook wins and the explanation says so.</p>
        <p>Rules, fines and licensing details change. Check the current MTO Driver's Handbook and ontario.ca before your test.</p>
      </Card>

      <SectionTitle>Reset</SectionTitle>
      <Card className="p-5">
        {!confirm ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">Clears your scores, history, streak and achievements on this device.</p>
            <Button variant="ghost" onClick={() => setConfirm(true)}>Reset progress</Button>
          </div>
        ) : (
          <div role="alert" className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-bold text-bad">This can't be undone. Reset everything?</p>
            <div className="flex gap-2">
              <Button variant="soft" onClick={() => setConfirm(false)}>Cancel</Button>
              <Button variant="danger" onClick={() => { resetProgress(); setConfirm(false); }}>Yes, reset</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function Row({ label, sub, children }: { label: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <div>
        <div className="font-bold">{label}</div>
        <div className="text-sm text-muted">{sub}</div>
      </div>
      {children}
    </div>
  );
}
