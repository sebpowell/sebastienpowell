import { neutral } from "../theme/palettes";
import { Theme } from "@/theme/theme.type";
import { black, white } from "tailwindcss/colors";

const darkTheme: Theme = {
  "background-default": neutral[1200],
  "background-surface": neutral[1100],
  "background-surface-subtle": neutral[1000],
  "background-surface-interactive": neutral[800],
  "background-surface-interactive-hover": neutral[400],

  "border-default": neutral[800],

  "text-strong": white,
  "text-body": neutral[300],
  "text-muted": neutral[400],

  "button-primary-text": black,
  "button-primary-background": white,

  "selection-background": neutral[400],
  "selection-text": "black",
};

export { darkTheme };
