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
      gridTemplateColumns: {
        '48': 'repeat(48, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '36': 'repeat(36, minmax(0, 1fr))',
        '30': 'repeat(30, minmax(0, 1fr))',
        '27': 'repeat(27, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      zIndex: {
        '50': '50',
        '100': '100',
      },


    },
  },
  variants: {
    extend: {
      transform: ['responsive'], // Agrega 'transform' a la lista de variantes
    },
  },
  plugins: [],
};

export default config;