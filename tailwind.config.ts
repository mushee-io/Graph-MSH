import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        p: {
          50: "rgb(var(--p-50) / <alpha-value>)",
          100: "rgb(var(--p-100) / <alpha-value>)",
          200: "rgb(var(--p-200) / <alpha-value>)",
          300: "rgb(var(--p-300) / <alpha-value>)",
          400: "rgb(var(--p-400) / <alpha-value>)",
          500: "rgb(var(--p-500) / <alpha-value>)",
          600: "rgb(var(--p-600) / <alpha-value>)",
          700: "rgb(var(--p-700) / <alpha-value>)",
          800: "rgb(var(--p-800) / <alpha-value>)",
          900: "rgb(var(--p-900) / <alpha-value>)",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgb(var(--p-400) / 0.35), 0 18px 60px rgb(var(--p-900) / 0.55)",
        neon: "0 0 40px rgb(var(--p-500) / 0.35)",
      },
      keyframes: {
        floaty: { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-10px)" } },
        shimmer: { "0%": { transform: "translateX(-40%)" }, "100%": { transform: "translateX(140%)" } },
        pulseGlow: { "0%, 100%": { opacity: "0.6" }, "50%": { opacity: "1" } }
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        floaty2: "floaty 8s ease-in-out infinite",
        shimmer: "shimmer 2.2s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
