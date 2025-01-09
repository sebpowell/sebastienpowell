import { Theme } from "@/theme/theme.type";
import { black, neutral, white } from "tailwindcss/colors";

const lightTheme: Theme = {
  "bg-root": neutral[200],
  "bg-page": neutral[100],

  "text-strong": neutral[950],
  "text-body": neutral[600],
  "text-muted": neutral[500],

  "shadow-image-thumb-hover": "rgba(00, 00, 00, 0.5)",
  "shadow-image-thumb-inset": "rgba(00, 00, 00, 1)",

  "button-primary-text": white,
  "button-primary-background": black,
  "button-secondary-background-hover": neutral[300],

  "selection-background": neutral[300],
  "selection-text": "black",
};

export { lightTheme };
