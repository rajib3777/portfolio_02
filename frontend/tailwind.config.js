/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent-color)',
        'accent-glow': 'var(--accent-glow)',
        dark: {
          bg: '#050508',
          card: '#0B0B12',
          border: 'rgba(255, 255, 255, 0.07)',
          text: '#F3F4F6',
          muted: '#9CA3AF',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      animation: {
        'grain': 'grain 8s steps(10) infinite',
        'drift': 'drift 20s ease-in-out infinite',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -8%)' },
          '20%': { transform: 'translate(-8%, 2%)' },
          '30%': { transform: 'translate(4%, -10%)' },
          '40%': { transform: 'translate(-4%, 8%)' },
          '50%': { transform: 'translate(-10%, 4%)' },
          '60%': { transform: 'translate(8%, 4%)' },
          '70%': { transform: 'translate(4%, 8%)' },
          '80%': { transform: 'translate(-8%, 4%)' },
          '90%': { transform: 'translate(6%, -4%)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.15)' },
          '66%': { transform: 'translate(-40px, 20px) scale(0.9)' },
        }
      }
    },
  },
  plugins: [],
}
