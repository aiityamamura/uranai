import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sumi: {
          950: "#12172a",
          900: "#161d33",
          800: "#1d2540",
          700: "#26304f",
          600: "#333f61",
        },
        washi: {
          50: "#faf8f2",
          100: "#f3efe2",
          200: "#e8e1cd",
        },
        seal: {
          DEFAULT: "#b8442f",
          light: "#d9694f",
        },
        gold: {
          DEFAULT: "#c8a15a",
          light: "#ddc088",
        },
        // Five elements (五行)
        wood: "#5c8a5c",
        fire: "#c1503f",
        earth: "#b98a4a",
        metal: "#9aa3ad",
        water: "#4a6b8a",
      },
      fontFamily: {
        mincho: ["var(--font-mincho)", "serif"],
        gothic: ["var(--font-gothic)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "washi-texture":
          "radial-gradient(circle at 20% 20%, rgba(200,161,90,0.06), transparent 45%), radial-gradient(circle at 80% 60%, rgba(184,68,47,0.05), transparent 40%)",
      },
    },
  },
  plugins: [],
};

export default config;
