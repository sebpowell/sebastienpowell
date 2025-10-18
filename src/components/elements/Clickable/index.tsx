"use client";
import { Box, BoxProps } from "@/components/elements/Box";
import { HoverEffect } from "@/components/elements/Hover";
import { cn } from "@/utils/cn.util";
import { useClickSound } from "@/utils/useClickSound";
import { motion } from "motion/react";

export const Clickable = (props: BoxProps) => {
  const { className, children, onClick, ...rest } = props;

  const [play] = useClickSound();

  return (
    <motion.div whileTap={{ scale: 0.98 }}>
      <Box
        as="div"
        className={cn("group relative", className)}
        onClick={(e) => {
          play();
          onClick?.(e);
        }}
        {...rest}
      >
        <HoverEffect />
        <Box className="relative">{children}</Box>
      </Box>
    </motion.div>
  );
};
