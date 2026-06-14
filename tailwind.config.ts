import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-page': 'rgb(var(--bg-page))',
        'bg-surface': 'rgb(var(--bg-surface))',
        'bg-header': 'rgb(var(--bg-header))',
        'bg-surface-hover': 'rgb(var(--bg-surface-hover))',
        'border-dark': 'rgb(var(--border))',
        'accent-active': 'rgb(var(--accent-active))',
        'accent-cta': 'rgb(var(--accent-cta))',
        'live-indicator': 'rgb(var(--live-indicator))',
        'text-primary': 'rgb(var(--text-primary))',
        'text-secondary': 'rgb(var(--text-secondary))',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
      },
      animation: {
        'pulse-live': 'pulse-live 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-live': {
          '0%, 100%': { scale: '1', opacity: '1' },
          '50%': { scale: '1.2', opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
