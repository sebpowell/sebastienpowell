'use client';
import { AppContextProvider } from '@/contexts/app.context';
import { Themes } from '@/theme/themes.enum';
import { ThemeProvider } from 'next-themes';
import { ReactNode, useEffect } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

const useViewportHeight = () => {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();

    window.addEventListener('resize', setVh);

    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, []);
};

const Providers = (props: ProvidersProps) => {
  const { children } = props;

  // See: https://www.npmjs.com/package/postcss-viewport-height-correction
  useViewportHeight();

  return (
    <ThemeProvider
      enableSystem={false}
      defaultTheme={Themes.light}
      themes={Object.values(Themes)}
    >
      <AppContextProvider>{children}</AppContextProvider>
    </ThemeProvider>
  );
};

export { Providers };
