"use client";
import { Box } from "@/components/elements/Box";
import { Themes } from "@/theme/themes.enum";
import { useThemeToggleSound } from "@/utils/useClickSound";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const [play] = useThemeToggleSound();

  const handleToggle = () => {
    play();
    setTheme(theme === Themes.light ? Themes.dark : Themes.light);
  };

  return (
    <Box
      as="button"
      className="flex items-center justify-center rounded-full transition-colors duration-500 hover:bg-button-secondary-background-hover"
      onClick={handleToggle}
    >
      <Box className="size-2 rounded-full bg-text-strong" />
    </Box>
  );
};

export { ThemeToggle };
