/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      md: { max: '899px' },
      base: { min: '899px' },
    },
    colors: {
      blue: {
        400: '#5E81F4',
      },
    },
    extend: {},
  },
  plugins: [],
}
