/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      md: { max: '899px' },
      base: { min: '899px' },
    },
    extend: {
      colors: {
        red: {
          500: '#e3342f',
        },
        yellow: {
          500: '#fedc3d',
        },
        gray: {
          200: '#F0F4F5',
          300: '#C6D5DB',
          500: '#2E2E35',
          700: '#312e38',
          950: '#202022',
        },
        orange: {
          500: '#FFBA00',
        },
        blue: {
          500: '#38B6FF',
        },
      },
    },
  },
  plugins: [],
}
