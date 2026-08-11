/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Theme-aware tokens (auto-switch with .dark / day mode)
        'dark-bg': 'rgb(var(--color-bg) / <alpha-value>)',
        'light-text': 'rgb(var(--color-text) / <alpha-value>)',
        'primary': 'rgb(var(--color-primary) / <alpha-value>)',
        'secondary': 'rgb(var(--color-secondary) / <alpha-value>)',
        'glow-effect': 'rgb(var(--color-primary) / 0.12)',
        'on-primary': 'rgb(var(--color-on-primary) / <alpha-value>)',
        'surface': 'rgb(var(--color-surface) / <alpha-value>)',
      },
      animation: {
        cursor: 'cursor 1s infinite',
        typing: 'typing 1.5s steps(40) infinite',
        blob: 'blob 7s infinite',
      },
      keyframes: {
        cursor: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
      },
      animationDelay: {
        '2000': '2000ms',
        '4000': '4000ms',
      },
    },
  },
  plugins: [],
}
