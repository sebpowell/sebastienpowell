"use client";
import { TapScale } from "@/components/elements/Animations/Tap";
import { BoxProps } from "@/components/elements/Box";
import { cn } from "@/utils/cn.util";
import { useClickSound } from "@/utils/useClickSound";
import { Undo2 } from "lucide-react";
import { ElementType } from "react";

type IconButtonProps<T extends ElementType> = BoxProps<T>;

export const IconButton = <T extends ElementType>(
  props: IconButtonProps<T>,
) => {
  const { as = "button", className, ...rest } = props;

  const [play] = useClickSound();

  return (
    <TapScale
      as={as as ElementType}
      className={cn(
        "flex size-10 items-center justify-center rounded-full bg-background-surface-interactive hover:bg-background-surface-interactive-hover",
        className,
      )}
      onClick={() => play()}
      whileTap={{ scale: 0.9 }}
      {...rest}
    >
      <Undo2 className="size-4" />
    </TapScale>
  );
};
