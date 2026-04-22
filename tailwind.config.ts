import type { Config } from "tailwindcss";

/**
 * Design tokens map to CSS variables defined in `src/app/globals.css` (:root).
 * Utilities: `bg-dzq-fg-1`, `text-dzq-fg-2`, `rounded-dzq-radius-lg`, etc.
 */
export default {
  theme: {
    extend: {
      colors: {
        "dzq-black": "var(--dzq-black)",
        "dzq-ink": "var(--dzq-ink)",
        "dzq-fg-1": "var(--dzq-fg-1)",
        "dzq-fg-2": "var(--dzq-fg-2)",
        "dzq-fg-3": "var(--dzq-fg-3)",
        "dzq-fg-muted": "var(--dzq-fg-muted)",
        "dzq-bg": "var(--dzq-bg)",
        "dzq-bg-alt": "var(--dzq-bg-alt)",
        "dzq-bg-card": "var(--dzq-bg-card)",
        "dzq-bg-warm": "var(--dzq-bg-warm)",
        "dzq-bg-dark": "var(--dzq-bg-dark)",
        "dzq-bg-tile": "var(--dzq-bg-tile)",
        "dzq-border": "var(--dzq-border)",
        "dzq-border-hl": "var(--dzq-border-hl)",
        "dzq-border-ink": "var(--dzq-border-ink)",
        "dzq-accent-yellow": "var(--dzq-accent-yellow)",
        "dzq-accent-green": "var(--dzq-accent-green)",
        "dzq-accent-peach": "var(--dzq-accent-peach)",
        "dzq-accent-blue": "var(--dzq-accent-blue)",
        "dzq-accent-navy": "var(--dzq-accent-navy)",
      },
      spacing: {
        "dzq-space-1": "var(--dzq-space-1)",
        "dzq-space-2": "var(--dzq-space-2)",
        "dzq-space-3": "var(--dzq-space-3)",
        "dzq-space-4": "var(--dzq-space-4)",
        "dzq-space-5": "var(--dzq-space-5)",
        "dzq-space-6": "var(--dzq-space-6)",
        "dzq-space-7": "var(--dzq-space-7)",
        "dzq-space-8": "var(--dzq-space-8)",
        "dzq-space-9": "var(--dzq-space-9)",
        "dzq-space-10": "var(--dzq-space-10)",
      },
      borderRadius: {
        "dzq-radius-xs": "var(--dzq-radius-xs)",
        "dzq-radius-sm": "var(--dzq-radius-sm)",
        "dzq-radius-md": "var(--dzq-radius-md)",
        "dzq-radius-lg": "var(--dzq-radius-lg)",
        "dzq-radius-xl": "var(--dzq-radius-xl)",
        "dzq-radius-pill": "var(--dzq-radius-pill)",
      },
      boxShadow: {
        "dzq-shadow-soft": "var(--dzq-shadow-soft)",
        "dzq-shadow-card": "var(--dzq-shadow-card)",
        "dzq-shadow-lift": "var(--dzq-shadow-lift)",
      },
      maxWidth: {
        "dzq-page": "1536px",
        "dzq-content": "1664px",
      },
      fontFamily: {
        "dzq-sans": "var(--dzq-font-sans)",
        "dzq-display": "var(--dzq-font-display)",
        "dzq-mono": "var(--dzq-font-mono)",
      },
      fontSize: {
        "dzq-xs": "var(--dzq-text-xs)",
        "dzq-sm": "var(--dzq-text-sm)",
        "dzq-base": "var(--dzq-text-base)",
        "dzq-md": "var(--dzq-text-md)",
        "dzq-lg": "var(--dzq-text-lg)",
        "dzq-xl": "var(--dzq-text-xl)",
        "dzq-2xl": "var(--dzq-text-2xl)",
        "dzq-3xl": "var(--dzq-text-3xl)",
        "dzq-4xl": "var(--dzq-text-4xl)",
      },
      fontWeight: {
        "dzq-regular": "var(--dzq-weight-regular)",
        "dzq-medium": "var(--dzq-weight-medium)",
        "dzq-bold": "var(--dzq-weight-bold)",
      },
      transitionTimingFunction: {
        "dzq-out": "var(--dzq-ease-out)",
        "dzq-inout": "var(--dzq-ease-inout)",
      },
      transitionDuration: {
        "dzq-fast": "var(--dzq-dur-fast)",
        "dzq-med": "var(--dzq-dur-med)",
        "dzq-slow": "var(--dzq-dur-slow)",
      },
    },
  },
} satisfies Config;
