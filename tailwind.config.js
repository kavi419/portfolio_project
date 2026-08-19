/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode via class
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        lightModeBg: '#FCFCFC',
        lightModeText: '#1A1A1A',
        darkModeBg: '#0A0A0A',
        darkModeText: '#F3F4F6',
      },
    },
  },
  plugins: [],
}
