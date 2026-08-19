import type { Config } from 'tailwindcss'

/**
 * Semantic surfaces/ink are driven by CSS variables declared in globals.css,
 * so a component writes `bg-surface text-ink` once instead of pairing every
 * utility with a `dark:` twin. Channel-only variables (`38 36 33`) are what
 * make the `/<alpha-value>` slash syntax work.
 */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

const config: Config = {
  darkMode: 'class',
  // Every FSD layer lives under src/, so scan the whole tree rather than
  // listing folders — a new layer or slice must never silently lose its styles.
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Semantic — these flip with the theme.
        canvas: token('canvas'),
        surface: token('surface'),
        sunken: token('sunken'),
        line: token('line'),
        ink: token('ink'),
        muted: token('muted'),
        subtle: token('subtle'),

        // Moss green: the brand colour. Deeper and less neon than the stock
        // Tailwind green so large fills read as calm rather than alarming.
        primary: {
          50: '#f3f8f4',
          100: '#e3efe6',
          200: '#c7dfcf',
          300: '#9dc6ac',
          400: '#6ba585',
          500: '#478767',
          600: '#356c52',
          700: '#2b5643',
          800: '#254537',
          900: '#1f392e',
          950: '#0f2019',
        },

        // Clay: reserved for accents that must not read as "primary action" —
        // price emphasis, featured ribbons, timeline markers.
        clay: {
          50: '#fdf6f2',
          100: '#fae9df',
          200: '#f4d0bd',
          300: '#ecaf91',
          400: '#e08863',
          500: '#d46b43',
          600: '#c25334',
          700: '#a1412c',
          800: '#82372a',
          900: '#6b3127',
        },

        // Warm neutral. Replaces Tailwind's cool `neutral` so photography of
        // timber and stone sits on a ground that shares its temperature.
        stone: {
          50: '#faf9f7',
          100: '#f4f2ee',
          200: '#e8e4dd',
          300: '#d5cfc4',
          400: '#b0a89a',
          500: '#8c8376',
          600: '#6e665b',
          700: '#565049',
          800: '#3a3733',
          900: '#262421',
          950: '#171614',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      fontSize: {
        // Fluid display sizes: one class per role, no per-breakpoint overrides.
        'display-xl': ['clamp(2.75rem, 1.6rem + 5vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.25rem, 1.5rem + 3.2vw, 3.75rem)', { lineHeight: '1.06', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.75rem, 1.3rem + 2vw, 2.75rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.375rem, 1.15rem + 1vw, 1.875rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      boxShadow: {
        // Warm-tinted shadows; neutral black shadows go grey against stone.
        card: '0 1px 2px rgb(38 36 33 / 0.04), 0 8px 24px -12px rgb(38 36 33 / 0.12)',
        lift: '0 2px 4px rgb(38 36 33 / 0.05), 0 24px 48px -20px rgb(38 36 33 / 0.22)',
        pop: '0 12px 40px -12px rgb(38 36 33 / 0.28)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'rise': 'rise 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'pop-in': 'popIn 0.16s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scroll-hint': 'scrollHint 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        rise: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        popIn: {
          from: { opacity: '0', transform: 'translateY(-6px) scale(0.98)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        scrollHint: {
          '0%, 100%': { opacity: '0.2', transform: 'translateY(0)' },
          '50%': { opacity: '1', transform: 'translateY(9px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
