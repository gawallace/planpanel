import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        destructive: 'oklch(var(--destructive) / <alpha-value>)',
        background: 'oklch(var(--background) / <alpha-value>)',
        foreground: 'oklch(var(--foreground) / <alpha-value>)',
        // add any other tokens you're using like muted, accent, etc.
      },
    },
  },
};

export default config;
