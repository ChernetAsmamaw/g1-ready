// Shared types for the G1 Ready question bank and road-sign library.
// The bank lives in plain data files so questions and signs can be added
// without touching any UI code.

export type CategoryId = 'signs' | 'rules' | 'safe' | 'sharing' | 'licence';
export type Difficulty = 1 | 2 | 3; // 1 Beginner, 2 Intermediate, 3 Advanced

/**
 * Where a question came from.
 * mto      Official sample question printed in the MTO Driver's Handbook
 * sample   "G1 sample test" PDF (third-party practice material)
 * practice "G1 Practice Test" answer list inside the same PDF
 * fines    "70 G1 exam limits, fines & points questions" PDF
 * faq      "70 most frequently asked G1 exam questions" PDF
 * guide    Project study guide (G1_Complete_Study_Guide.md) practice quiz
 * gr       Written for G1 Ready from the MTO Driver's Handbook text
 */
export type SourceId = 'mto' | 'sample' | 'practice' | 'fines' | 'faq' | 'guide' | 'gr';

export interface Question {
  id: string;
  category: CategoryId;
  difficulty: Difficulty;
  text: string;
  /** Exactly four options. */
  options: [string, string, string, string];
  /** Index of the correct option inside `options`. */
  answer: number;
  explanation: string;
  sources: SourceId[];
  /** Handbook section the answer is grounded in. */
  ref?: string;
  /** Road-sign / signal visual shown with the question. */
  sign?: string;
  /** Keep the option order (for "All of the above" style questions). */
  fixed?: boolean;
  /** Short hint used by the hint button. */
  hint?: string;
}

export type SignGroup =
  | 'regulatory'
  | 'warning'
  | 'school'
  | 'construction'
  | 'information'
  | 'railway'
  | 'signals';
