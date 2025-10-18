"use client";
import { Themes } from "@/theme/themes.enum";
import { useViewportHeight } from "@/utils/useViewportHeight";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

const Providers = (props: ProvidersProps) => {
  const { children } = props;

  // See: https://www.npmjs.com/package/postcss-viewport-height-correction
  useViewportHeight();

  return (
    <ThemeProvider defaultTheme={Themes.light} themes={Object.values(Themes)}>
      {children}
    </ThemeProvider>
  );
};

export { Providers };
