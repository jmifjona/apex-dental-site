/** @type {import('tailwindcss').Config} */
// "Calm premium" palette (15 Oct 2026), defined once here and used by name everywhere:
//   navy  - primary: headings, header text, dark sections, footer
//   gold  - the ONE warm accent: primary call to action, small highlights (use sparingly)
//   ivory - warm off-white surfaces between the white sections
//   slate (Tailwind's own) - secondary text
// Contrast (WCAG 2.x, checked 15 Oct 2026):
//   navy-900 on white 16.0:1, on ivory 15.2:1, on gold-400 (primary button) 8.0:1
//   gold-700 text on white 5.8:1, on ivory 5.5:1, on ivory-100 5.0:1 (never use gold-300/400 as text on light)
//   gold-300 text on navy-900 9.9:1, on navy-950 11.2:1
//   slate-600 on white 7.6:1, on ivory 7.2:1, on ivory-100 6.6:1; slate-500 on white 4.8:1, on ivory 4.5:1 (not on ivory-100)
//   slate-300 on navy-900 10.8:1, slate-400 on navy-950 7.1:1
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f2f4f8',
          100: '#e4e8f0',
          200: '#c6cedd',
          300: '#9aa8c0',
          600: '#3a5280',
          700: '#2a4068',
          800: '#1b3157',
          900: '#0f2140',
          950: '#0a1628',
        },
        gold: {
          100: '#f6eedc',
          200: '#ecdcb6',
          300: '#e2c992',
          400: '#d4b373',
          500: '#c49a52',
          600: '#9c7633',
          700: '#7f6128',
          800: '#6b5122',
        },
        ivory: {
          DEFAULT: '#fbf9f5',
          100: '#f4efe6',
          200: '#e9e1d3',
        },
      },
      fontFamily: {
        // System serif for headings: no web-font download, no new origin. Renders as Iowan Old
        // Style / New York on Apple devices, Georgia on Windows, Noto Serif on Android.
        display: ['ui-serif', '"Iowan Old Style"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
    },
  },
  plugins: [],
}
