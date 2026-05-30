import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        profit: { DEFAULT: "#059669", light: "#d1fae5" },
        loss: { DEFAULT: "#dc2626", light: "#fee2e2" },
      },
    },
  },
  plugins: [],
};

export default config;
