import { Theme } from '@/theme/theme.type';
import { neutral, white } from 'tailwindcss/colors';

const darkTheme: Theme = {
  'bg-root': neutral[950],
  'bg-page': neutral[900],
  "bg-background-secondary": neutral[800],
  "bg-background-tertiary": neutral[700],

  "border-primary": neutral[700],

  'text-strong': white,
  'text-body': neutral[400],
  'text-muted': neutral[500],

  'shadow-image-thumb-hover': 'rgba(00, 00, 00, 1)',
  'shadow-image-thumb-inset': 'rgba(00, 00, 00, 1)',

  'button-primary-text': neutral[950],
  'button-primary-background': white,
  'button-secondary-background-hover': neutral[700],

  'selection-background': neutral[400],
  'selection-text': 'black',
};

export { darkTheme };
