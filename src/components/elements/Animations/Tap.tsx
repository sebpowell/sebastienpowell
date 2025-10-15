import { Box, BoxProps } from "@/components/elements/Box";
import { HTMLMotionProps, motion } from "motion/react";
import { ElementType } from "react";

export const TapScale = <T extends keyof HTMLElementTagNameMap>(
  props: BoxProps & HTMLMotionProps<"div">,
) => {
  const { as = "div", ...rest } = props;

  const MotionComponent = motion[as as keyof typeof motion] as any;

  return <Box as={MotionComponent} whileTap={{ scale: 0.9 }} {...rest} />;
};
