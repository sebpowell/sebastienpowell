import { Theme } from "@/theme/theme.type";
import { black, neutral, white } from "tailwindcss/colors";

const lightTheme: Theme = {
  "background-default": neutral[200],
  "background-surface": white,
  "background-surface-subtle": neutral[100],
  "background-surface-interactive": neutral[200],
  "background-surface-interactive-hover": neutral[300],

  "border-default": neutral[200],

  "text-strong": neutral[950],
  "text-body": neutral[600],
  "text-muted": neutral[500],

  "button-primary-text": white,
  "button-primary-background": black,

  "selection-background": neutral[300],
  "selection-text": "black",
};

export { lightTheme };
