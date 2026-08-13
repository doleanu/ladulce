import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        crema: "var(--crema)",
        pistacho: "var(--pistacho)",
        melocoton: "var(--melocoton)",
        mantequilla: "var(--mantequilla)",
        terracota: "var(--terracota)",
        espresso: "var(--espresso)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
