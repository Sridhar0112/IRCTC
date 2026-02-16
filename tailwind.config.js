/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#dbeafe',
          400: '#3b82f6',
          500: '#1d4ed8',
          600: '#1e40af',
          700: '#172554',
        },
        saffron: {
          400: '#fb923c',
          500: '#f97316',
        },
      },
      boxShadow: {
        glow: '0 8px 32px rgba(30,64,175,0.25)',
      },
    },
  },
  plugins: [],
};
