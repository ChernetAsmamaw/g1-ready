# G1 Ready

Interactive Ontario G1 road-rules and road-signs quiz (React + TypeScript + Tailwind, built with Vite into one HTML file).

- `npm install` then `npm run dev` to run locally, `npm run build` for `dist/index.html`.
- `npm run check` validates the question bank (4 options, valid answer, explanation, known sign ids, unique ids).
- Questions live in `src/data/bank-*.ts`; signs in `src/data/signs-*.tsx` (SVG, 200x200 viewBox). Sign questions
  "identify" and "what should you do" are generated from sign cards in `src/data/bank.ts`.
- Progress is saved in the browser's localStorage (`g1ready.progress.v1`).
