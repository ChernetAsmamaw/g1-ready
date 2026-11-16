import type { CategoryId, Difficulty, Question, SourceId } from './types';

type Extra = Partial<Pick<Question, 'sign' | 'fixed' | 'answer' | 'hint'>>;

/**
 * Compact question builder. Options are written with the correct answer
 * first; the quiz engine shuffles them at play time. Pass `{ fixed: true,
 * answer: n }` to keep a written order (e.g. "All of the above" last).
 */
export function Q(
  id: string,
  category: CategoryId,
  difficulty: Difficulty,
  text: string,
  options: [string, string, string, string],
  explanation: string,
  sources: SourceId | SourceId[],
  ref?: string,
  extra: Extra = {},
): Question {
  return {
    id,
    category,
    difficulty,
    text,
    options,
    answer: extra.answer ?? 0,
    explanation,
    sources: Array.isArray(sources) ? sources : [sources],
    ref,
    sign: extra.sign,
    fixed: extra.fixed,
    hint: extra.hint,
  };
}
