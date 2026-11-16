/** @type {import('tailwindcss').Config} */
const v = (n) => `rgb(var(--${n}) / <alpha-value>)`;
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: v('bg'), surface: v('surface'), raised: v('raised'), ink: v('ink'), muted: v('muted'), line: v('line'),
        navy: v('navy'), 'navy-ink': v('navy-ink'), yellow: v('yellow'), 'yellow-ink': v('yellow-ink'),
        good: v('good'), 'good-soft': v('good-soft'), bad: v('bad'), 'bad-soft': v('bad-soft'),
        info: v('info'), 'info-soft': v('info-soft'),
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        sign: ['Overpass', 'Arial Narrow', 'Arial', 'sans-serif'],
      },
      borderRadius: { xl2: '1.25rem' },
    },
  },
  plugins: [],
};
