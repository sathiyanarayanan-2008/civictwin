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
        civic: {
          dark: '#060B1A',
          card: '#0D1428',
          cardHover: '#131D38',
          border: 'rgba(6, 214, 239, 0.15)',
          borderHover: 'rgba(6, 214, 239, 0.35)',
          blue: '#2563EB',
          cyan: '#06D6EF',
          purple: '#8B5CF6',
          green: '#10B981',
          amber: '#F59E0B',
          red: '#EF4444',
          text: '#F8FAFC',
          muted: '#94A3B8',
          glass: 'rgba(13, 20, 40, 0.75)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(6, 214, 239, 0.2), 0 0 10px rgba(37, 99, 235, 0.2)' },
          '100%': { boxShadow: '0 0 15px rgba(6, 214, 239, 0.5), 0 0 25px rgba(37, 99, 235, 0.4)' },
        }
      }
    },
  },
  plugins: [],
}
