/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#090a0f",
          surface: "#12141d",
          hover: "#1a1d2b",
          card: "#151824",
          border: "rgba(255, 255, 255, 0.08)",
        },
        brand: {
          cyan: "#38bdf8",
          indigo: "#6366f1",
          emerald: "#10b981",
          text: "#f3f4f6",
          muted: "#9ca3af",
          subtle: "#6b7280",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)",
        'glow-cyan': "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.15), transparent 70%)",
        'glow-indigo': "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15), transparent 70%)",
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
