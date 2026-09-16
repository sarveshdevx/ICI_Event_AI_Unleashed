import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#040810",
          900: "#07111F",
          850: "#0B192C",
          800: "#10233E",
        },
        brand: {
          blue: "#087BFF",
          cyan: "#00E5FF",
          purple: "#8B3DFF",
          magenta: "#FF3CAC",
          coral: "#FF5A5F",
          orange: "#FF8A00",
          yellow: "#FFD83D",
          lime: "#B7F34A",
          dark: "#07111F",
          light: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "spin-slow": "spin 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

