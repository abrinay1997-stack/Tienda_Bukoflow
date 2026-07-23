import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        accent: 'var(--accent)',
        'accent-fg': 'var(--accent-fg)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
      spacing: {
        1: 'var(--sp-1)',
        2: 'var(--sp-2)',
        3: 'var(--sp-3)',
        4: 'var(--sp-4)',
        6: 'var(--sp-6)',
        8: 'var(--sp-8)',
        12: 'var(--sp-12)',
        16: 'var(--sp-16)',
        24: 'var(--sp-24)',
        32: 'var(--sp-32)',
        48: 'var(--sp-48)',
        64: 'var(--sp-64)',
      },
      fontSize: {
        mono: 'var(--fs-mono)',
        xs: 'var(--fs-xs)',
        sm: 'var(--fs-sm)',
        base: 'var(--fs-base)',
        lg: 'var(--fs-lg)',
        xl: 'var(--fs-xl)',
        '2xl': 'var(--fs-2xl)',
        '3xl': 'var(--fs-3xl)',
        hero: 'var(--fs-hero)',
      },
      zIndex: {
        canvas: 'var(--z-canvas)',
        content: 'var(--z-content)',
        nav: 'var(--z-nav)',
        cursor: 'var(--z-cursor)',
        overlay: 'var(--z-overlay)',
      },
    },
  },
  plugins: [],
};

export default config;
