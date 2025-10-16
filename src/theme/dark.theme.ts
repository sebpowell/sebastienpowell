import { neutral } from "../theme/palettes";
import { Theme } from "@/theme/theme.type";
import { black, white } from "tailwindcss/colors";

const darkTheme: Theme = {
  "background-default": neutral[1200],
  "background-surface": neutral[1100],
  "background-surface-subtle": neutral[1000],
  "background-surface-interactive": neutral[900],

  "border-default": neutral[900],
  "border-strong": neutral[700],

  "text-strong": white,
  "text-body": neutral[300],
  "text-muted": neutral[400],

  "shadow-image-thumb-hover": "rgba(00, 00, 00, 1)",
  "shadow-image-thumb-inset": "rgba(00, 00, 00, 1)",

  "button-primary-text": neutral[100],
  "button-primary-background": white,
  "button-secondary-background-hover": neutral[700],

  "selection-background": neutral[400],
  "selection-text": "black",
};

export { darkTheme };
