import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shrinkToCircle: {
          '0%': { width: '100%', height: '100%', borderRadius: '0', top: '0', left: '0' },
          '100%': { width: '50px', height: '50px', borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
        },
        shrinkAndMove: {
          '0%': { opacity: '0', transform: 'scale(3)', top: '20%' },
          '10%': { opacity: '1', transform: 'scale(3)', top: '20%' },
          '100%': { opacity: '1', transform: 'scale(1)', top: '0%' },
        },
        disappear: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        shrinkToCircle: 'shrinkToCircle 3s forwards',
        shrinkAndMove: 'shrinkAndMove 3.5s ease-in-out',
        disappear: 'disappear 1s ease-in',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        '48': 'repeat(48, minmax(0, 1fr))',
        '42': 'repeat(42, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '36': 'repeat(36, minmax(0, 1fr))',
        '30': 'repeat(30, minmax(0, 1fr))',
        '27': 'repeat(27, minmax(0, 1fr))',
        '23': 'repeat(23, minmax(0, 1fr))',
        '22': 'repeat(22, minmax(0, 1fr))',
      },
      zIndex: {
        '50': '50',
        '100': '100',
      },
      fontFamily: {
        'comic': ['"Comic Sans MS"', 'cursive'],
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