import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 950: "#06111F", 900: "#0A1A30", 800: "#0F2747", 700: "#173561", 600: "#234A82" },
        gold: { 300: "#E2CD9B", 400: "#CFB06B", 500: "#B8964E", 600: "#8F6F2C", 700: "#735820" },
        mist: { 50: "#F7F9FC", 100: "#EEF3F8", 200: "#DCE6F0", 300: "#C3D2E2" },
        ink: { DEFAULT: "#1B2A41", soft: "#4A5A72" },
      },
      fontFamily: {
        serif: ['"Iowan Old Style"', '"Palatino Linotype"', "Palatino", "Georgia", "Cambria", "serif"],
        sans: ["ui-sans-serif", "system-ui", '"Segoe UI"', "Roboto", '"Helvetica Neue"', "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,26,48,.05), 0 8px 24px -12px rgba(10,26,48,.18)",
        lift: "0 2px 4px rgba(10,26,48,.06), 0 18px 36px -14px rgba(10,26,48,.28)",
      },
      keyframes: {
        rise: { from: { opacity: "0", transform: "translateY(14px)" }, to: { opacity: "1", transform: "none" } },
      },
      animation: { rise: "rise .7s cubic-bezier(.2,.7,.2,1) both" },
    },
  },
  plugins: [],
};

export default config;
