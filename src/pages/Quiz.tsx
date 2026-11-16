import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Check, Clock, Lightbulb, X, ArrowRight, Zap } from 'lucide-react';
import { SignSvg } from '../data/signs';
import { SOURCE_LABEL } from '../data/bank';
import type { PlayQ } from '../lib/build';
import { clearResume, recordAttempt, recordSet, saveResume, useProgress, type AnswerRec, type Attempt, type Mode, type ResumeState } from '../store';
import { Bar, Button } from '../components/ui';
import { sfx } from '../lib/sound';

export interface QuizSpec {
  mode: Mode;
  title: string;
  questions: PlayQ[];
  /** Seconds per question; 0 = untimed. */
  timeLimit: number;
  hints: boolean;
  /** Fixed practice set: progress is saved after every answer so it can be resumed. */
  setId?: string;
  seed?: number;
  resume?: ResumeState;
}

const LETTERS = ['A', 'B', 'C', 'D'];

export default function Quiz({ spec, onFinish, onExit }: { spec: QuizSpec; onFinish: (a: Attempt, earned: string[], qs: PlayQ[]) => void; onExit: () => void }) {
  const { settings } = useProgress();
  const qs = spec.questions;
  const [i, setI] = useState(spec.resume?.i ?? 0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [eliminated, setEliminated] = useState<number | null>(null);
  const [hintUsed, setHintUsed] = useState(false);
  const [points, setPoints] = useState(spec.resume?.points ?? 0);
  const [gained, setGained] = useState(0);
  const [combo, setCombo] = useState(spec.resume?.combo ?? 0);
  const [bestCombo, setBestCombo] = useState(spec.resume?.bestCombo ?? 0);
  const [left, setLeft] = useState(spec.timeLimit);
  const [confirmExit, setConfirmExit] = useState(false);
  const answers = useRef<AnswerRec[]>(spec.resume ? spec.resume.answers.slice() : []);
  const qStart = useRef(Date.now());
  const start = useRef(Date.now() - (spec.resume?.elapsed ?? 0));
  const nextRef = useRef<HTMLButtonElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);

  const q = qs[i];
  const correct = locked && chosen === q.answer;
  const nOpts = q.options.length;

  const lock = useCallback((idx: number) => {
    if (locked) return;
    const ok = idx === q.answer;
    setChosen(idx);
    setLocked(true);
    const ms = Date.now() - qStart.current;
    answers.current.push({ qid: q.id, chosen: idx, correct: ok, ms, hint: hintUsed });
    if (ok) {
      const g = (hintUsed ? 50 : 100) + Math.min(combo, 5) * 10;
      setGained(g);
      setPoints((p) => p + g);
      setCombo((c) => {
        const n = c + 1;
        setBestCombo((b) => Math.max(b, n));
        return n;
      });
      if (settings.sound) sfx.right();
    } else {
      setGained(0);
      setCombo(0);
      if (settings.sound) sfx.wrong();
    }
  }, [locked, q, hintUsed, combo, settings.sound]);

  // per-question timer
  useEffect(() => {
    if (!spec.timeLimit || locked) return;
    if (left <= 0) {
      lock(-1);
      return;
    }
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left, locked, spec.timeLimit, lock]);

  useEffect(() => {
    if (locked) nextRef.current?.focus();
  }, [locked]);

  // save the place in a fixed set after every answer
  useEffect(() => {
    if (!spec.setId) return;
    saveResume(spec.setId, { seed: spec.seed ?? 0, i: locked ? i + 1 : i, answers: answers.current.slice(), points, combo, bestCombo, elapsed: Date.now() - start.current });
  }, [locked, i, points, combo, bestCombo]); // eslint-disable-line react-hooks/exhaustive-deps

  const finish = useCallback(() => {
    const byCat: Attempt['byCat'] = {};
    const recs = answers.current;
    recs.forEach((r, k) => {
      const c = qs[k].category;
      const cur = byCat[c] || [0, 0];
      byCat[c] = [cur[0] + (r.correct ? 1 : 0), cur[1] + 1];
    });
    const a: Attempt = {
      id: String(Date.now()),
      mode: spec.mode,
      title: spec.title,
      date: Date.now(),
      total: recs.length,
      correct: recs.filter((r) => r.correct).length,
      points,
      durationMs: Date.now() - start.current,
      byCat,
      wrong: recs.filter((r) => !r.correct).map((r) => r.qid),
      answers: recs,
    };
    const earned = recordAttempt(a, { combo: bestCombo });
    if (spec.setId) {
      clearResume(spec.setId);
      recordSet(spec.setId, Math.round((a.correct / a.total) * 100));
    }
    if (settings.sound) sfx.done();
    onFinish(a, earned, qs);
  }, [qs, spec.mode, spec.title, spec.setId, points, bestCombo, onFinish, settings.sound]);

  const next = useCallback(() => {
    if (i + 1 >= qs.length) return finish();
    setI(i + 1);
    setChosen(null);
    setLocked(false);
    setEliminated(null);
    setHintUsed(false);
    setGained(0);
    setLeft(spec.timeLimit);
    qStart.current = Date.now();
    requestAnimationFrame(() => headRef.current?.focus());
  }, [i, qs.length, finish, spec.timeLimit]);

  const useHint = () => {
    if (locked || hintUsed) return;
    const wrong = [...Array(nOpts).keys()].filter((k) => k !== q.answer);
    setEliminated(wrong[Math.floor(Math.random() * wrong.length)]);
    setHintUsed(true);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (confirmExit || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const k = e.key.toLowerCase();
      const map: Record<string, number> = { '1': 0, '2': 1, '3': 2, '4': 3, a: 0, b: 1, c: 2, d: 3 };
      if (!locked && k in map && map[k] < nOpts && map[k] !== eliminated) {
        e.preventDefault();
        lock(map[k]);
      } else if (locked && (k === 'enter' || k === 'arrowright') && document.activeElement !== nextRef.current) {
        e.preventDefault();
        next();
      } else if (!locked && k === 'h' && spec.hints) useHint();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const progress = (i + (locked ? 1 : 0)) / qs.length;
  const sourceText = useMemo(() => q.sources.map((s) => SOURCE_LABEL[s]).filter((v, k, arr) => arr.indexOf(v) === k), [q]);
  const imgOpts = !!q.optionSigns;

  return (
    <div className="mx-auto w-full max-w-2xl pb-28 sm:pb-12">
      {/* Top bar */}
      <div className="sticky top-[calc(env(safe-area-inset-top,0px))] z-20 -mx-4 mb-4 border-b border-line bg-bg/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-b-2xl">
        <div className="flex items-center gap-3">
          <button onClick={() => setConfirmExit(true)} className="rounded-full p-2 hover:bg-raised" aria-label="Exit quiz"><X className="h-6 w-6" /></button>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between text-sm font-bold">
              <span>Question {i + 1} of {qs.length}</span>
              <span className="flex items-center gap-3">
                {combo >= 2 && <span className="flex items-center gap-1 text-[rgb(234,120,30)]"><Zap className="h-4 w-4" aria-hidden="true" />{combo} in a row</span>}
                <span className="tabular-nums" aria-label={`${points} points`}>{points} pts</span>
              </span>
            </div>
            <Bar value={progress} className="mt-1.5" color="bg-yellow" label="Quiz progress" />
          </div>
          {spec.timeLimit > 0 && (
            <div className={`flex min-w-[64px] items-center justify-center gap-1 rounded-full px-3 py-1.5 text-sm font-extrabold tabular-nums ${left <= 5 && !locked ? 'bg-bad text-white' : 'bg-raised'}`} aria-label={`${left} seconds left`}>
              <Clock className="h-4 w-4" aria-hidden="true" />{locked ? '—' : `${left}s`}
            </div>
          )}
        </div>
      </div>

      <div key={q.id + i} className="fade-up">
        <div className="rounded-3xl border border-line bg-surface p-5 shadow-sm sm:p-7">
          <div className="mb-1 text-xs font-bold uppercase tracking-wider text-muted">{spec.title}</div>
          {q.sign && !imgOpts && (
            <div className="my-4 flex justify-center">
              <SignSvg id={q.sign} className="h-40 w-40 sm:h-48 sm:w-48 drop-shadow-sm" />
            </div>
          )}
          <h1 ref={headRef} tabIndex={-1} className="text-xl font-extrabold leading-snug outline-none sm:text-2xl">{q.text}</h1>
        </div>

        <div className={`mt-4 grid gap-3 ${imgOpts ? 'grid-cols-2' : ''}`} role="group" aria-label="Answer options">
          {q.options.map((opt, k) => {
            const isAns = k === q.answer;
            const isChosen = k === chosen;
            const gone = k === eliminated && !locked;
            let cls = 'border-line bg-surface hover:border-info hover:bg-info-soft';
            if (locked && isAns) cls = 'border-good bg-good-soft';
            else if (locked && isChosen) cls = 'border-bad bg-bad-soft shake';
            else if (locked) cls = 'border-line bg-surface opacity-60';
            return (
              <button key={k} onClick={() => lock(k)} disabled={locked || gone}
                aria-label={imgOpts ? `Option ${LETTERS[k]}${locked ? `: ${opt}` : ''}` : undefined}
                className={`group relative flex min-h-[60px] w-full items-center gap-3 rounded-2xl border-2 p-3 text-left text-base font-semibold transition sm:text-lg ${cls} ${gone ? 'opacity-30 line-through' : ''} ${imgOpts ? 'flex-col justify-center p-4' : ''}`}>
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold ${locked && isAns ? 'bg-good text-white' : locked && isChosen ? 'bg-bad text-white' : 'bg-raised'}`} aria-hidden="true">
                  {locked && isAns ? <Check className="h-5 w-5" /> : locked && isChosen ? <X className="h-5 w-5" /> : LETTERS[k]}
                </span>
                {imgOpts ? (
                  <>
                    <SignSvg id={q.optionSigns![k]} className="h-28 w-28 sm:h-36 sm:w-36" />
                    {locked && <span className="text-center text-sm">{opt}</span>}
                  </>
                ) : (
                  <span className="flex-1">{opt}</span>
                )}
                {locked && isAns && <span className="sr-only">(correct answer)</span>}
                {locked && isChosen && !isAns && <span className="sr-only">(your answer, incorrect)</span>}
              </button>
            );
          })}
        </div>

        {!locked && spec.hints && (
          <div className="mt-4 flex justify-center">
            <Button variant="ghost" size="sm" onClick={useHint} disabled={hintUsed}>
              <Lightbulb className="h-4 w-4" aria-hidden="true" />{hintUsed ? 'Hint used: one wrong answer removed' : 'Hint (removes a wrong answer, half points)'}
            </Button>
          </div>
        )}

        <div aria-live="polite">
          {locked && (
            <div className={`pop mt-5 rounded-3xl border-2 p-5 ${correct ? 'border-good bg-good-soft' : 'border-bad bg-bad-soft'}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className={`flex items-center gap-2 text-lg font-extrabold ${correct ? 'text-good' : 'text-bad'}`}>
                  {correct ? <Check className="h-6 w-6" aria-hidden="true" /> : <X className="h-6 w-6" aria-hidden="true" />}
                  {correct ? 'Correct!' : chosen === -1 ? 'Time’s up' : 'Not quite'}
                </p>
                {correct && <span className="rounded-full bg-good px-3 py-1 text-sm font-extrabold text-white">+{gained} pts</span>}
              </div>
              {!correct && <p className="mt-2 font-bold">Correct answer: {q.options[q.answer]}</p>}
              <p className="mt-2 leading-relaxed">{q.explanation}</p>
              <p className="mt-3 text-xs font-semibold text-muted">
                {sourceText.join(' · ')}{q.ref ? ` · Handbook: ${q.ref}` : ''}
              </p>
            </div>
          )}
        </div>

        {locked && (
          <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur sm:static sm:mt-5 sm:border-0 sm:bg-transparent sm:p-0">
            <Button ref={nextRef} onClick={next} size="lg" className="w-full" variant={i + 1 >= qs.length ? 'good' : 'navy'}>
              {i + 1 >= qs.length ? 'See results' : 'Next question'} <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>

      {confirmExit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6" role="alertdialog" aria-modal="true" aria-label="Leave quiz?">
          <div className="pop w-full max-w-sm rounded-3xl bg-surface p-6 text-center shadow-2xl">
            <h2 className="text-xl font-extrabold">Leave this quiz?</h2>
            <p className="mt-2 text-muted">{spec.setId ? 'Your place is saved. You can pick up where you left off.' : 'Answers from this quiz won\'t be saved.'}</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Button variant="soft" onClick={() => setConfirmExit(false)} autoFocus>Keep going</Button>
              <Button variant="danger" onClick={onExit}>Leave</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
