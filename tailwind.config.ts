import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#edf7f6",
          100: "#d5edea",
          200: "#aedbd6",
          300: "#7ec4bc",
          400: "#4fa99e",
          500: "#358f84",
          600: "#2a726a",
          700: "#1d383f",
          800: "#163035",
          900: "#0f2b30",
          950: "#071a1d",
        },
        accent: {
          DEFAULT: "#74c2b4",
          light: "#9dd4ca",
          dark: "#4fa99e",
        },
        gold: {
          50: "#fdf8f0",
          100: "#f8eddb",
          200: "#f0d9b5",
          300: "#e6c18a",
          400: "#d3bc9a",
          500: "#c4a06c",
          600: "#b08a52",
          700: "#8c6c3e",
          800: "#6e5430",
          900: "#503c22",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        medium: "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        large: "0 10px 40px -10px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
