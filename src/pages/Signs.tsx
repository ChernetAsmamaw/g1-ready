import { useEffect, useMemo, useState } from 'react';
import { Search, CheckCircle2, Eye, Puzzle, HelpCircle, Timer, ScanSearch, ArrowLeft, Play } from 'lucide-react';
import { ALL_SIGNS, SIGNS, SIGN_GROUPS, SignSvg } from '../data/signs';
import { shuffle } from '../data/bank';
import type { SignGroup } from '../data/types';
import { differenceSet, identifySet, whatToDoSet } from '../lib/build';
import { markSignStudied, recordAttempt, setBest, useProgress } from '../store';
import { Button, Card, Modal, Pill, pct } from '../components/ui';
import type { QuizSpec } from './Quiz';

const GROUP_STYLE: Record<SignGroup, string> = {
  regulatory: 'bg-white text-[#111] border border-[#111]/20',
  warning: 'bg-[#FFCD00] text-[#111]',
  school: 'bg-[#C8E62E] text-[#111]',
  construction: 'bg-[#F47920] text-[#111]',
  information: 'bg-[#006B3F] text-white',
  railway: 'bg-[#C8102E] text-white',
  signals: 'bg-[#1D4F9C] text-white',
};
const groupLabel = (g: SignGroup) => SIGN_GROUPS.find((x) => x.id === g)!.label;

export function SignDetail({ id, onClose, onOpen }: { id: string | null; onClose: () => void; onOpen: (id: string) => void }) {
  const s = id ? SIGNS[id] : null;
  useEffect(() => {
    if (id) markSignStudied(id);
  }, [id]);
  return (
    <Modal open={!!s} onClose={onClose} title={s?.name || ''}>
      {s && (
        <div key={s.id} className="fade-up">
          <div className="flex flex-col items-center gap-3 rounded-3xl bg-raised p-6">
            <SignSvg id={s.id} className="h-44 w-44 sm:h-52 sm:w-52" />
            <Pill className={GROUP_STYLE[s.group]}>{groupLabel(s.group)}</Pill>
          </div>
          <p className="mt-4 text-xl font-extrabold leading-snug">{s.short}</p>
          <dl className="mt-4 space-y-4">
            <Field label="What it means">{s.meaning}</Field>
            <Field label="What you must do">{s.action}</Field>
            <Field label="Where you'll see it">{s.where}</Field>
            <Field label="Common mistake" tone="bad">{s.mistake}</Field>
          </dl>
          {s.related.length > 0 && (
            <div className="mt-5">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-muted">Often confused with</h3>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {s.related.map((r) => SIGNS[r] && (
                  <button key={r} onClick={() => onOpen(r)} className="flex flex-col items-center gap-1 rounded-2xl border border-line p-2 text-center text-xs font-bold hover:border-info">
                    <SignSvg id={r} className="h-14 w-14" decorative />
                    {SIGNS[r].name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}

function Field({ label, children, tone }: { label: string; children: React.ReactNode; tone?: 'bad' }) {
  return (
    <div className={`rounded-2xl p-4 ${tone === 'bad' ? 'bg-bad-soft' : 'bg-raised'}`}>
      <dt className={`text-xs font-extrabold uppercase tracking-wider ${tone === 'bad' ? 'text-bad' : 'text-muted'}`}>{label}</dt>
      <dd className="mt-1 leading-relaxed">{children}</dd>
    </div>
  );
}

type Tab = 'library' | 'activities';

export default function Signs({ startQuiz, openSign }: { startQuiz: (s: QuizSpec) => void; openSign: (id: string) => void }) {
  const p = useProgress();
  const [tab, setTab] = useState<Tab>('library');
  const [group, setGroup] = useState<SignGroup | 'all'>('all');
  const [q, setQ] = useState('');
  const [match, setMatch] = useState(false);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return ALL_SIGNS.filter((s) => (group === 'all' || s.group === group) && (!t || `${s.name} ${s.short} ${s.meaning}`.toLowerCase().includes(t)));
  }, [group, q]);
  const studied = new Set(p.signsStudied);

  if (match) return <MatchGame onDone={() => setMatch(false)} />;

  const activities = [
    { id: 'identify', title: 'Identify the sign', desc: 'See a sign, pick its meaning. 10 questions.', icon: <Eye className="h-6 w-6" aria-hidden="true" />,
      run: () => startQuiz({ mode: 'signs', title: 'Identify the sign', questions: identifySet(10, group === 'all' ? undefined : [group]), timeLimit: 0, hints: true }) },
    { id: 'match', title: 'Match signs to meanings', desc: 'Pair four signs with four meanings, three rounds.', icon: <Puzzle className="h-6 w-6" aria-hidden="true" />, run: () => setMatch(true) },
    { id: 'todo', title: 'What should you do?', desc: 'See a sign, choose the right action. 10 questions.', icon: <HelpCircle className="h-6 w-6" aria-hidden="true" />,
      run: () => startQuiz({ mode: 'signs', title: 'What should you do?', questions: whatToDoSet(10), timeLimit: 0, hints: true }) },
    { id: 'recog', title: 'Recognition challenge', desc: '5 seconds per sign. 10 signs. Scored on accuracy, not speed.', icon: <Timer className="h-6 w-6" aria-hidden="true" />,
      run: () => startQuiz({ mode: 'signs', title: 'Recognition challenge', questions: identifySet(10), timeLimit: 5, hints: false }) },
    { id: 'diff', title: 'Find the difference', desc: 'Two look-alike signs. Pick the one that matches the meaning.', icon: <ScanSearch className="h-6 w-6" aria-hidden="true" />,
      run: () => startQuiz({ mode: 'signs', title: 'Find the difference', questions: differenceSet(8), timeLimit: 0, hints: false }) },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Road Signs Learning Centre</h1>
          <p className="mt-1 text-muted">{ALL_SIGNS.length} signs, signals and markings · {studied.size} studied</p>
        </div>
        <div className="grid grid-cols-2 gap-1 rounded-2xl bg-raised p-1.5" role="tablist" aria-label="Signs centre sections">
          {(['library', 'activities'] as Tab[]).map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
              className={`rounded-xl px-4 py-2 text-sm font-bold capitalize ${tab === t ? 'bg-surface shadow-sm' : 'text-muted'}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className="-mx-4 mt-5 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
        <div className="flex w-max gap-2" role="group" aria-label="Sign categories">
          <Chip on={group === 'all'} onClick={() => setGroup('all')}>All</Chip>
          {SIGN_GROUPS.map((g) => <Chip key={g.id} on={group === g.id} onClick={() => setGroup(g.id)}>{g.label}</Chip>)}
        </div>
      </div>
      {group !== 'all' && <p className="mt-3 text-sm text-muted">{SIGN_GROUPS.find((g) => g.id === group)!.blurb}</p>}

      {tab === 'library' ? (
        <>
          <label className="relative mt-4 block">
            <span className="sr-only">Search signs</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search signs, e.g. school, yield, curve"
              className="h-12 w-full rounded-2xl border border-line bg-surface pl-12 pr-4 text-base outline-none focus:border-info" />
          </label>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {list.map((s) => (
              <li key={s.id}>
                <button onClick={() => openSign(s.id)} className="group h-full w-full text-left">
                  <Card className="relative flex h-full flex-col items-center p-4 text-center transition group-hover:-translate-y-0.5 group-hover:border-info group-hover:shadow-md">
                    {studied.has(s.id) && <CheckCircle2 className="absolute right-2.5 top-2.5 h-5 w-5 text-good" aria-label="Studied" />}
                    <SignSvg id={s.id} className="h-24 w-24 sm:h-28 sm:w-28" />
                    <span className="mt-3 font-extrabold leading-tight">{s.name}</span>
                    <span className="mt-1 text-xs text-muted">{s.short}</span>
                  </Card>
                </button>
              </li>
            ))}
          </ul>
          {!list.length && <Card className="mt-4 p-6 text-center text-muted">No signs match "{q}".</Card>}
        </>
      ) : (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {activities.map((a) => (
            <Card key={a.id} className="flex items-center gap-4 p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow text-yellow-ink">{a.icon}</span>
              <div className="min-w-0 flex-1">
                <h2 className="font-extrabold">{a.title}</h2>
                <p className="text-sm text-muted">{a.desc}</p>
              </div>
              <Button onClick={a.run} aria-label={`Start ${a.title}`}><Play className="h-4 w-4" aria-hidden="true" /></Button>
            </Card>
          ))}
          <p className="text-sm text-muted sm:col-span-2">Best match score: {p.bests.match ?? '–'}% · Signs studied: {studied.size}/{ALL_SIGNS.length}</p>
        </div>
      )}
    </div>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-pressed={on}
      className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${on ? 'bg-navy text-white dark:bg-info' : 'border border-line bg-surface hover:border-info'}`}>{children}</button>
  );
}

// ---------- Match game ----------
function makeRound(exclude: Set<string>) {
  const pool = shuffle(ALL_SIGNS.filter((s) => !exclude.has(s.id) && !s.id.startsWith('hand-')));
  const picked: typeof pool = [];
  const shorts = new Set<string>();
  for (const s of pool) {
    if (picked.length === 4) break;
    if (shorts.has(s.short)) continue;
    shorts.add(s.short);
    picked.push(s);
  }
  return { signs: picked.map((s) => s.id), meanings: shuffle(picked.map((s) => s.id)) };
}

function MatchGame({ onDone }: { onDone: () => void }) {
  const ROUNDS = 3;
  const [round, setRound] = useState(0);
  const [used] = useState(() => new Set<string>());
  const [r, setR] = useState(() => makeRound(used));
  const [selSign, setSelSign] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [bad, setBad] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [firstTry, setFirstTry] = useState(0);
  const [missedThis, setMissedThis] = useState<Set<string>>(new Set());
  const [finished, setFinished] = useState<null | number>(null);

  const pick = (meaningId: string) => {
    if (!selSign) return;
    if (meaningId === selSign) {
      setDone((d) => [...d, selSign]);
      if (!missedThis.has(selSign)) setFirstTry((n) => n + 1);
      setSelSign(null);
    } else {
      setMistakes((m) => m + 1);
      setMissedThis((s) => new Set(s).add(selSign));
      setBad(meaningId);
      setTimeout(() => setBad(null), 400);
    }
  };

  useEffect(() => {
    if (done.length < 4) return;
    const t = setTimeout(() => {
      r.signs.forEach((s) => used.add(s));
      if (round + 1 >= ROUNDS) {
        const score = pct(firstTry, ROUNDS * 4);
        setFinished(score);
        setBest('match', score);
        recordAttempt({
          id: String(Date.now()), mode: 'signs', title: 'Match signs to meanings', date: Date.now(), total: ROUNDS * 4, correct: firstTry,
          points: firstTry * 100, durationMs: 0, byCat: { signs: [firstTry, ROUNDS * 4] }, wrong: [], answers: [],
        }, { combo: 0 });
      } else {
        setRound(round + 1);
        setR(makeRound(used));
        setDone([]);
        setMissedThis(new Set());
      }
    }, 600);
    return () => clearTimeout(t);
  }, [done]); // eslint-disable-line react-hooks/exhaustive-deps

  if (finished !== null) {
    return (
      <div className="mx-auto max-w-md text-center">
        <Card className="pop p-8">
          <Puzzle className="mx-auto h-12 w-12 text-info" aria-hidden="true" />
          <h1 className="mt-3 text-2xl font-extrabold">Matching complete</h1>
          <p className="mt-2 text-4xl font-extrabold">{finished}%</p>
          <p className="mt-1 text-muted">{firstTry} of {ROUNDS * 4} matched on the first try · {mistakes} mistake{mistakes === 1 ? '' : 's'}</p>
          <div className="mt-6 grid gap-3">
            <Button onClick={() => { used.clear(); setRound(0); setR(makeRound(used)); setDone([]); setMistakes(0); setFirstTry(0); setMissedThis(new Set()); setFinished(null); }}>Play again</Button>
            <Button variant="soft" onClick={onDone}>Back to Signs centre</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center gap-3">
        <button onClick={onDone} className="rounded-full p-2 hover:bg-raised" aria-label="Back to Signs centre"><ArrowLeft className="h-6 w-6" /></button>
        <div>
          <h1 className="text-2xl font-extrabold">Match signs to meanings</h1>
          <p className="text-sm text-muted">Round {round + 1} of {ROUNDS} · Tap a sign, then its meaning · Mistakes: {mistakes}</p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5">
        <div className="space-y-3">
          {r.signs.map((id) => {
            const ok = done.includes(id);
            return (
              <button key={id} disabled={ok} onClick={() => setSelSign(id)} aria-pressed={selSign === id} aria-label={SIGNS[id].alt}
                className={`flex h-[104px] w-full items-center justify-center rounded-2xl border-2 bg-surface transition ${ok ? 'border-good bg-good-soft opacity-70' : selSign === id ? 'border-info ring-4 ring-info/30' : 'border-line hover:border-info'}`}>
                <SignSvg id={id} className="h-20 w-20" decorative />
              </button>
            );
          })}
        </div>
        <div className="space-y-3">
          {r.meanings.map((id) => {
            const ok = done.includes(id);
            return (
              <button key={id} disabled={ok || !selSign} onClick={() => pick(id)}
                className={`flex h-[104px] w-full items-center rounded-2xl border-2 p-3 text-left text-sm font-bold transition sm:text-base ${ok ? 'border-good bg-good-soft' : bad === id ? 'shake border-bad bg-bad-soft' : selSign ? 'border-line bg-surface hover:border-info' : 'border-line bg-surface opacity-80'}`}>
                {SIGNS[id].short}
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-muted" aria-live="polite">{selSign ? 'Now tap the matching meaning.' : 'Tap a sign on the left to start.'}</p>
    </div>
  );
}
