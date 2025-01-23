import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'custom-text-color': "#3B3B3B",
        'new-icon-background': "#F5F5F4",
        'header-background': "#EEEEEE",
        'header-text': "#585660",
        'footer-background': "#404040",
        'disabled-button': "#585660"
      }
    },
  },
  plugins: [],
};
export default config;
