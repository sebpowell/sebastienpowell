"use client";
import { Box, BoxProps } from "@/components/elements/Box";
import { HTMLMotionProps, motion } from "motion/react";
import { ElementType } from "react";

export const TapScale = <T extends ElementType>(
  props: BoxProps<T> & Pick<HTMLMotionProps<any>, "whileTap">,
) => {
  const { as = "div", whileTap = { scale: 0.98 }, ...rest } = props;

  const Element = motion[as as keyof typeof motion] as any;

  return <Element whileTap={whileTap} {...rest} />;
};
