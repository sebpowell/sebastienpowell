import type { Config } from "tailwindcss";
import { spacing } from "tailwindcss/defaultTheme";
import { createThemes } from "tw-colors";
import tailwindCssAnimate from "tailwindcss-animate";
import { darkTheme } from "./src/theme/dark.theme";
import { lightTheme } from "./src/theme/light.theme";
import { Themes } from "./src/theme/themes.enum";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      space: {
        "form-default": spacing[10],
      },
      boxShadow: {
        "button-hover":
          '-8px 0 16px -4px theme("colors.orange.500"), 0 0 16px -4px theme("colors.pink.500"), 8px 0 16px -4px theme("colors.blue.500")',
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
    },
  },
  plugins: [
    tailwindCssAnimate,
    createThemes({
      [Themes.light]: lightTheme,
      [Themes.dark]: darkTheme,
    }),
  ],
} satisfies Config;
