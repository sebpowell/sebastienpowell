import { IconButton } from "@/components/elements/IconButton";
import { useClickSound } from "@/utils/useClickSound";
import Link from "next/link";

export const BackButton = () => {
  const [play] = useClickSound();

  return <IconButton />;
};
