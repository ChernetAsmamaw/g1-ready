// Validates the question bank: run with `npm run check`.
declare const process: { exit(code: number): never };
import { BANK, CATEGORIES, SETS } from '../src/data/bank';
import { ALL_SIGNS, SIGNS } from '../src/data/signs';

let errors = 0;
const fail = (m: string) => { errors++; console.error('  x ' + m); };
const ids = new Set<string>();
for (const q of BANK) {
  if (ids.has(q.id)) fail(`duplicate id ${q.id}`);
  ids.add(q.id);
  if (q.options.length !== 4) fail(`${q.id}: needs 4 options`);
  if (new Set(q.options.map((o) => o.trim().toLowerCase())).size !== 4) fail(`${q.id}: duplicate options`);
  if (!(q.answer >= 0 && q.answer < 4)) fail(`${q.id}: bad answer index`);
  if (!q.explanation || q.explanation.length < 20) fail(`${q.id}: explanation missing`);
  if (q.sign && !SIGNS[q.sign]) fail(`${q.id}: unknown sign ${q.sign}`);
  if (!q.sources.length) fail(`${q.id}: no source`);
}
const signIds = new Set<string>();
for (const s of ALL_SIGNS) {
  if (signIds.has(s.id)) fail(`duplicate sign ${s.id}`);
  signIds.add(s.id);
  for (const r of s.related) if (!SIGNS[r]) fail(`sign ${s.id}: unknown related ${r}`);
}
console.log(`${BANK.length} questions, ${ALL_SIGNS.length} signs`);
for (const d of [1, 2, 3]) if (BANK.filter((q) => q.difficulty === d).length !== 200) fail(`level ${d} has ${BANK.filter((q) => q.difficulty === d).length} questions, expected 200`);
const inSets = new Set<string>();
for (const st of SETS) {
  if (st.ids.length !== 100) fail(`${st.id} has ${st.ids.length} questions`);
  for (const id of st.ids) { if (inSets.has(id)) fail(`${id} is in two sets`); inSets.add(id); }
  const mix = CATEGORIES.map((c) => `${c.id} ${st.ids.filter((id) => BANK.find((q) => q.id === id)!.category === c.id).length}`).join(', ');
  console.log(`  ${st.label.padEnd(9)} ${st.ids.length}   (${mix})`);
}
if (inSets.size !== BANK.length) fail(`sets cover ${inSets.size} of ${BANK.length} questions`);
for (const c of CATEGORIES) {
  const qs = BANK.filter((q) => q.category === c.id);
  const d = [1, 2, 3].map((n) => qs.filter((q) => q.difficulty === n).length);
  console.log(`  ${c.id.padEnd(8)} ${String(qs.length).padStart(4)}   (beginner ${d[0]}, intermediate ${d[1]}, advanced ${d[2]})`);
}
const bySrc: Record<string, number> = {};
for (const q of BANK) for (const s of q.sources) bySrc[s] = (bySrc[s] || 0) + 1;
console.log('  sources', bySrc);
console.log('  with visuals', BANK.filter((q) => q.sign).length);
if (errors) { console.error(`${errors} problem(s)`); process.exit(1); }
console.log('OK');
