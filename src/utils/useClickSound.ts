import useSound from "use-sound";

export const useClickSound = () => {
  return useSound("/audio/click.wav");
};

export const useThemeToggleSound = () => {
  return useSound("/audio/switch.wav");
};
