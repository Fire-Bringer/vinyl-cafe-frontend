import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-caprasimo)"],
        body: ["var(--font-kiwi-maru)"],
      },
      colors: {
        'primary': {
          DEFAULT: '#D6D533',
        },
        'secondary': {
          DEFAULT: '#541519',
        },
        'background': {
          DEFAULT: '#DCC8AB',
          600: '#C0A989',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
