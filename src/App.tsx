import { useCallback, useEffect, useState } from 'react';
import { Home, BookOpenCheck, Signpost, ClipboardCheck, BarChart3, User } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Practice from './pages/Practice';
import Quiz, { type QuizSpec } from './pages/Quiz';
import Results, { type ResultsData } from './pages/Results';
import Signs, { SignDetail } from './pages/Signs';
import { MockIntro, MockTest } from './pages/Mock';
import { ProgressPage, ProfilePage } from './pages/Progress';
import { shuffle, type PracticeSet } from './data/bank';
import type { CategoryId } from './data/types';
import { dailySet, reviewSet, setQuestions, type PlayQ } from './lib/build';
import { ACHIEVEMENTS, getProgress, useProgress, type Attempt } from './store';
import { Toast } from './components/ui';

const ROUTES = ['home', 'practice', 'signs', 'mock', 'progress', 'profile', 'quiz', 'results', 'mocktest'] as const;
type Route = (typeof ROUTES)[number];

function readRoute(): Route {
  const h = window.location.hash.replace(/^#/, '');
  return (ROUTES as readonly string[]).includes(h) ? (h as Route) : 'home';
}

const NAV: { id: Route; label: string; mobile: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', mobile: 'Dashboard', icon: Home },
  { id: 'practice', label: 'Practice', mobile: 'Practice', icon: BookOpenCheck },
  { id: 'signs', label: 'Road Signs', mobile: 'Signs', icon: Signpost },
  { id: 'mock', label: 'Mock Test', mobile: 'Mock Test', icon: ClipboardCheck },
  { id: 'progress', label: 'My Progress', mobile: 'Progress', icon: BarChart3 },
];

function reshuffle(q: PlayQ): PlayQ {
  if (q.optionSigns) return q;
  const order = shuffle(q.options.map((_, i) => i));
  return { ...q, options: order.map((i) => q.options[i]), answer: order.indexOf(q.answer) };
}

export default function App() {
  const p = useProgress();
  const [route, setRoute] = useState<Route>(readRoute);
  const [quiz, setQuiz] = useState<QuizSpec | null>(null);
  const [results, setResults] = useState<ResultsData | null>(null);
  const [topicsOpen, setTopicsOpen] = useState(false);
  const [sign, setSign] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const go = useCallback((r: string) => {
    if (window.location.hash !== '#' + r) window.location.hash = r;
    else setRoute(r as Route);
  }, []);

  useEffect(() => {
    const on = () => setRoute(readRoute());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);

  // guard routes that need in-memory state
  useEffect(() => {
    if (route === 'quiz' && !quiz) go('practice');
    if (route === 'results' && !results) go('home');
    window.scrollTo({ top: 0 });
  }, [route]); // eslint-disable-line react-hooks/exhaustive-deps

  // apply display settings
  useEffect(() => {
    const el = document.documentElement;
    if (p.settings.theme === 'system') el.removeAttribute('data-theme');
    else el.setAttribute('data-theme', p.settings.theme);
    el.classList.toggle('large-text', p.settings.largeText);
    el.classList.toggle('reduce-motion', p.settings.reduceMotion);
  }, [p.settings]);

  const startQuiz = useCallback((spec: QuizSpec) => {
    if (!spec.questions.length) return;
    setQuiz(spec);
    go('quiz');
  }, [go]);

  /** Starts a fixed set, or picks it up where the person left off. */
  const startSet = (set: PracticeSet) => {
    const saved = getProgress().resume[set.id];
    let resume = saved;
    if (saved && saved.i >= set.ids.length) {
      // every question was answered but the results were never opened: replay the last one
      resume = { ...saved, i: set.ids.length - 1, answers: saved.answers.slice(0, set.ids.length - 1) };
    }
    const seed = resume ? resume.seed : Math.floor(Math.random() * 1e9);
    startQuiz({
      mode: 'practice', title: set.label, questions: setQuestions(set, seed), timeLimit: getProgress().settings.timer ? 30 : 0, hints: true,
      setId: set.id, seed, resume,
    });
  };
  const startCategory = (_cat: CategoryId) => { setTopicsOpen(true); go('practice'); };
  const startDaily = () => startQuiz({ mode: 'daily', title: 'Daily challenge', questions: dailySet(), timeLimit: 0, hints: false });
  const startReview = () => startQuiz({ mode: 'review', title: 'Missed questions', questions: reviewSet(getProgress().missed, 20), timeLimit: 0, hints: true });

  const finished = (a: Attempt, earned: string[], qs: PlayQ[]) => {
    setResults({ attempt: a, questions: qs, earned });
    setQuiz(null);
    if (earned.length) setToast(`Achievement unlocked: ${ACHIEVEMENTS.find((x) => x.id === earned[0])?.name}`);
    go('results');
  };

  const focusMode = route === 'quiz' || route === 'mocktest';
  const active: Route = route === 'results' || route === 'quiz' ? 'practice' : route === 'mocktest' ? 'mock' : route;

  let page: JSX.Element | null = null;
  switch (route) {
    case 'home':
      page = <Dashboard go={go} startCategory={startCategory} startDaily={startDaily} startReview={startReview} startSet={startSet} />;
      break;
    case 'practice':
      page = <Practice key={String(topicsOpen)} openTopics={topicsOpen} onStartSet={startSet} onReview={startReview} />;
      break;
    case 'quiz':
      page = quiz && <Quiz key={quiz.title + quiz.questions[0]?.id + (quiz.seed ?? '')} spec={quiz} onFinish={finished} onExit={() => { setQuiz(null); go('home'); }} />;
      break;
    case 'results':
      page = results && (
        <Results data={results} onHome={() => go('home')} onSign={setSign}
          onRetry={(qs) => startQuiz({ mode: 'review', title: 'Retry incorrect', questions: shuffle(qs).map(reshuffle), timeLimit: 0, hints: true })}
          onWeakest={(c) => startCategory(c)} />
      );
      break;
    case 'signs':
      page = <Signs startQuiz={startQuiz} openSign={setSign} />;
      break;
    case 'mock':
      page = <MockIntro onStart={() => go('mocktest')} />;
      break;
    case 'mocktest':
      page = <MockTest onFinish={finished} onExit={() => go('mock')} />;
      break;
    case 'progress':
      page = <ProgressPage startCategory={startCategory} startReview={startReview} go={go} />;
      break;
    case 'profile':
      page = <ProfilePage />;
      break;
  }

  return (
    <div className="min-h-screen bg-bg text-ink">
      <a href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-xl focus:bg-yellow focus:px-4 focus:py-2 focus:font-bold focus:text-yellow-ink">Skip to content</a>

      {!focusMode && (
        <header className="sticky top-0 z-40 bg-navy pt-[env(safe-area-inset-top,0px)] text-white shadow-md">
          <div className="gutter mx-auto flex h-16 max-w-6xl items-center gap-6">
            <button onClick={() => go('home')} className="flex items-center gap-2.5" aria-label="G1 Ready home">
              <Logo />
              <span className="text-lg font-extrabold tracking-tight">G1 <span className="text-yellow">READY</span></span>
            </button>
            <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="Main">
              {NAV.map((n) => (
                <button key={n.id} onClick={() => { if (n.id === 'practice') setTopicsOpen(false); go(n.id); }} aria-current={active === n.id ? 'page' : undefined}
                  className={`rounded-xl px-3.5 py-2 text-sm font-bold transition ${active === n.id ? 'bg-white/15 text-yellow' : 'text-white/85 hover:bg-white/10'}`}>{n.label}</button>
              ))}
            </nav>
            <button onClick={() => go('profile')} aria-label="Profile and settings" aria-current={route === 'profile' ? 'page' : undefined}
              className="ml-auto flex h-10 w-10 items-center justify-center rounded-full bg-yellow text-sm font-extrabold text-yellow-ink md:ml-2">
              {p.name ? p.name.slice(0, 2).toUpperCase() : <User className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </header>
      )}

      <main id="main" tabIndex={-1} className={`gutter mx-auto max-w-6xl outline-none ${focusMode ? 'pt-[env(safe-area-inset-top,0px)]' : 'pb-28 pt-6 md:pb-12'}`}>
        {page}
      </main>

      {!focusMode && (
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur md:hidden" aria-label="Main">
          <div className="grid grid-cols-5">
            {[NAV[0], NAV[1], NAV[2], NAV[3], { id: 'profile' as Route, label: 'Profile', mobile: 'Profile', icon: User }].map((n) => {
              const on = active === n.id;
              const I = n.icon;
              return (
                <button key={n.id} onClick={() => { if (n.id === 'practice') setTopicsOpen(false); go(n.id); }} aria-current={on ? 'page' : undefined}
                  className={`flex min-h-[60px] flex-col items-center justify-center gap-0.5 text-[11px] font-bold ${on ? 'text-info' : 'text-muted'}`}>
                  <span className={`flex h-7 w-12 items-center justify-center rounded-full ${on ? 'bg-info-soft' : ''}`}><I className="h-5 w-5" aria-hidden="true" /></span>
                  {n.mobile}
                </button>
              );
            })}
          </div>
        </nav>
      )}

      <SignDetail id={sign} onClose={() => setSign(null)} onOpen={setSign} />
      {toast && <Toast onDone={() => setToast(null)}>{toast}</Toast>}
    </div>
  );
}

function Logo() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
      <rect x="6" y="6" width="28" height="28" rx="4" transform="rotate(45 20 20)" fill="#F5C542" />
      <text x="20" y="25" textAnchor="middle" fontFamily="Overpass, Arial, sans-serif" fontWeight="800" fontSize="13" fill="#101D35">G1</text>
    </svg>
  );
}
