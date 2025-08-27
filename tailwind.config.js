/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F2E9D8',
        accent: '#A60F37',
        therme: '#0388A6',
        sightseeing: '#5C548C',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  // 👇 Das Plugin wird hier hinzugefügt
  plugins: [
    require('@tailwindcss/typography'),
  ],
};