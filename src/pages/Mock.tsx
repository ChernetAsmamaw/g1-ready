import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Flag, ClipboardCheck, X, Clock } from 'lucide-react';
import { SignSvg } from '../data/signs';
import { mockSet, type PlayQ } from '../lib/build';
import { recordAttempt, useProgress, type Attempt } from '../store';
import { Bar, Button, Card, fmtTime } from '../components/ui';

const LETTERS = ['A', 'B', 'C', 'D'];

export function MockIntro({ onStart }: { onStart: () => void }) {
  const p = useProgress();
  const mocks = p.history.filter((h) => h.mode === 'mock');
  return (
    <div className="mx-auto max-w-2xl">
      <Card className="fade-up overflow-hidden">
        <div className="bg-navy px-6 py-8 text-white">
          <ClipboardCheck className="h-10 w-10 text-yellow" aria-hidden="true" />
          <h1 className="mt-3 text-3xl font-extrabold">Mock G1 test</h1>
          <p className="mt-2 text-white/85">A full practice test set up like the real G1 knowledge test.</p>
        </div>
        <ul className="space-y-3 p-6 text-base">
          <li className="flex gap-3"><span className="font-extrabold text-info">40</span> questions: 20 on road signs and 20 on rules of the road.</li>
          <li className="flex gap-3"><span className="font-extrabold text-info">16/20</span> needed in each part to pass (80%).</li>
          <li className="flex gap-3"><span className="font-extrabold text-info">No</span> feedback until you submit, just like the real test. You can flag questions and come back.</li>
          <li className="flex gap-3"><span className="font-extrabold text-info">No</span> time limit. Take your time and read every option.</li>
        </ul>
        <div className="border-t border-line p-6">
          <Button size="lg" className="w-full" onClick={onStart}>Start mock test</Button>
          <p className="mt-3 text-center text-xs text-muted">Practice questions only. The real test is set by the Ministry of Transportation and taken at a DriveTest centre.</p>
        </div>
      </Card>
      {mocks.length > 0 && (
        <Card className="mt-4 p-5">
          <h2 className="font-extrabold">Your mock tests</h2>
          <ul className="mt-3 divide-y divide-line">
            {mocks.slice(0, 6).map((m) => (
              <li key={m.id} className="flex items-center justify-between py-2.5 text-sm">
                <span>{new Date(m.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                <span className="tabular-nums">Signs {m.sections?.signs[0]}/20 · Rules {m.sections?.rules[0]}/20</span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-extrabold ${m.passed ? 'bg-good-soft text-good' : 'bg-bad-soft text-bad'}`}>{m.passed ? 'Pass' : 'Fail'}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}

export function MockTest({ onFinish, onExit }: { onFinish: (a: Attempt, earned: string[], qs: PlayQ[]) => void; onExit: () => void }) {
  const [qs] = useState<PlayQ[]>(() => mockSet());
  const [i, setI] = useState(0);
  const [ans, setAns] = useState<(number | null)[]>(() => Array(40).fill(null));
  const [flags, setFlags] = useState<boolean[]>(() => Array(40).fill(false));
  const [confirm, setConfirm] = useState<null | 'submit' | 'exit'>(null);
  const [elapsed, setElapsed] = useState(0);
  const start = useRef(Date.now());
  const headRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const t = setInterval(() => setElapsed(Date.now() - start.current), 1000);
    return () => clearInterval(t);
  }, []);

  const go = (n: number) => {
    setI(Math.max(0, Math.min(39, n)));
    requestAnimationFrame(() => headRef.current?.focus());
  };
  const q = qs[i];
  const answered = ans.filter((a) => a !== null).length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (confirm || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      const map: Record<string, number> = { '1': 0, '2': 1, '3': 2, '4': 3, a: 0, b: 1, c: 2, d: 3 };
      if (k in map) setAns((p) => p.map((v, j) => (j === i ? map[k] : v)));
      else if (k === 'arrowright') go(i + 1);
      else if (k === 'arrowleft') go(i - 1);
      else if (k === 'f') setFlags((p) => p.map((v, j) => (j === i ? !v : v)));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const submit = () => {
    const recs = qs.map((qq, k) => ({ qid: qq.id, chosen: ans[k] ?? -1, correct: ans[k] === qq.answer, ms: 0 }));
    const signs = recs.slice(0, 20).filter((r) => r.correct).length;
    const rules = recs.slice(20).filter((r) => r.correct).length;
    const byCat: Attempt['byCat'] = {};
    recs.forEach((r, k) => {
      const c = qs[k].category;
      const cur = byCat[c] || [0, 0];
      byCat[c] = [cur[0] + (r.correct ? 1 : 0), cur[1] + 1];
    });
    const a: Attempt = {
      id: String(Date.now()), mode: 'mock', title: 'Mock G1 test', date: Date.now(), total: 40,
      correct: signs + rules, points: (signs + rules) * 100, durationMs: Date.now() - start.current, byCat,
      wrong: recs.filter((r) => !r.correct).map((r) => r.qid), answers: recs,
      passed: signs >= 16 && rules >= 16, sections: { signs: [signs, 20], rules: [rules, 20] },
    };
    let combo = 0, best = 0;
    for (const r of recs) { combo = r.correct ? combo + 1 : 0; best = Math.max(best, combo); }
    const earned = recordAttempt(a, { combo: best });
    onFinish(a, earned, qs);
  };

  return (
    <div className="mx-auto w-full max-w-3xl pb-28 sm:pb-10">
      <div className="sticky top-[env(safe-area-inset-top,0px)] z-20 -mx-4 mb-4 border-b border-line bg-bg/95 px-4 py-3 backdrop-blur sm:mx-0">
        <div className="flex items-center gap-3">
          <button onClick={() => setConfirm('exit')} className="rounded-full p-2 hover:bg-raised" aria-label="Exit mock test"><X className="h-6 w-6" /></button>
          <div className="flex-1">
            <div className="flex justify-between text-sm font-bold">
              <span>{i < 20 ? 'Part 1: Road signs' : 'Part 2: Rules of the road'} · Q{i + 1} of 40</span>
              <span className="flex items-center gap-1 tabular-nums text-muted"><Clock className="h-4 w-4" aria-hidden="true" />{fmtTime(elapsed)}</span>
            </div>
            <Bar value={answered / 40} className="mt-1.5" color="bg-info" label={`${answered} of 40 answered`} />
          </div>
        </div>
      </div>

      <div key={i} className="fade-up rounded-3xl border border-line bg-surface p-5 shadow-sm sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-muted">Question {i + 1}</span>
          <button onClick={() => setFlags((p) => p.map((v, j) => (j === i ? !v : v)))} aria-pressed={flags[i]}
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${flags[i] ? 'bg-yellow text-yellow-ink' : 'bg-raised'}`}>
            <Flag className="h-3.5 w-3.5" aria-hidden="true" />{flags[i] ? 'Flagged' : 'Flag for review'}
          </button>
        </div>
        {q.sign && <div className="my-4 flex justify-center"><SignSvg id={q.sign} className="h-40 w-40 sm:h-48 sm:w-48" /></div>}
        <h1 ref={headRef} tabIndex={-1} className="mt-2 text-xl font-extrabold leading-snug outline-none sm:text-2xl">{q.text}</h1>
      </div>

      <div className="mt-4 grid gap-3" role="radiogroup" aria-label="Answer options">
        {q.options.map((o, k) => {
          const sel = ans[i] === k;
          return (
            <button key={k} role="radio" aria-checked={sel} onClick={() => setAns((p) => p.map((v, j) => (j === i ? k : v)))}
              className={`flex min-h-[60px] items-center gap-3 rounded-2xl border-2 p-3 text-left text-base font-semibold transition sm:text-lg ${sel ? 'border-info bg-info-soft' : 'border-line bg-surface hover:border-info'}`}>
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold ${sel ? 'bg-info text-white' : 'bg-raised'}`} aria-hidden="true">{LETTERS[k]}</span>
              <span className="flex-1">{o}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex gap-3">
        <Button variant="soft" onClick={() => go(i - 1)} disabled={i === 0} className="flex-1"><ArrowLeft className="h-5 w-5" aria-hidden="true" />Back</Button>
        {i < 39
          ? <Button variant="navy" onClick={() => go(i + 1)} className="flex-1">Next<ArrowRight className="h-5 w-5" aria-hidden="true" /></Button>
          : <Button variant="good" onClick={() => setConfirm('submit')} className="flex-1">Submit test</Button>}
      </div>

      <Card className="mt-6 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-extrabold">All questions</h2>
          <Button size="sm" variant="good" onClick={() => setConfirm('submit')}>Submit</Button>
        </div>
        <div className="grid grid-cols-8 gap-1.5 sm:grid-cols-10">
          {qs.map((_, k) => (
            <button key={k} onClick={() => go(k)} aria-label={`Question ${k + 1}${ans[k] !== null ? ', answered' : ''}${flags[k] ? ', flagged' : ''}`}
              aria-current={k === i ? 'step' : undefined}
              className={`relative flex h-9 items-center justify-center rounded-lg text-sm font-bold ${k === i ? 'ring-2 ring-info' : ''} ${ans[k] !== null ? 'bg-info text-white' : 'bg-raised'}`}>
              {k + 1}
              {flags[k] && <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-yellow ring-2 ring-surface" />}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted">Questions 1–20 are road signs; 21–40 are rules of the road. Keys: 1–4 to answer, arrows to move, F to flag.</p>
      </Card>

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6" role="alertdialog" aria-modal="true" aria-label={confirm === 'submit' ? 'Submit test?' : 'Leave test?'}>
          <div className="pop w-full max-w-sm rounded-3xl bg-surface p-6 text-center shadow-2xl">
            {confirm === 'submit' ? (
              <>
                <h2 className="text-xl font-extrabold">Submit your test?</h2>
                <p className="mt-2 text-muted">
                  {answered < 40 ? `${40 - answered} question${40 - answered === 1 ? ' is' : 's are'} unanswered and will be marked wrong.` : 'All 40 questions are answered.'}
                  {flags.some(Boolean) ? ` ${flags.filter(Boolean).length} flagged.` : ''}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Button variant="soft" onClick={() => setConfirm(null)} autoFocus>Go back</Button>
                  <Button variant="good" onClick={submit}>Submit</Button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-extrabold">Leave the mock test?</h2>
                <p className="mt-2 text-muted">Your answers will not be saved.</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Button variant="soft" onClick={() => setConfirm(null)} autoFocus>Keep going</Button>
                  <Button variant="danger" onClick={onExit}>Leave</Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
