import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./MCMHomepage.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        jakarta: ["var(--font-jakarta)", "sans-serif"],
        h1: ["var(--font-outfit)", "sans-serif"],
      },
      maxWidth: {
        "8xl": "1280px",
      },
    },
  },
  plugins: [],
};
export default config;
