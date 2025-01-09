import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

type BoxOwnProps<E extends React.ElementType = React.ElementType> = {
  as?: E;
  asChild?: boolean;
  className?: string;
};

type BoxProps<E extends React.ElementType = "div"> = BoxOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof BoxOwnProps>;

const defaultElement = "div";

const Box: <E extends React.ElementType = typeof defaultElement>(
  props: BoxProps<E>,
) => React.ReactNode = React.forwardRef(function Box(
  props: BoxOwnProps,
  ref: React.Ref<Element>,
) {
  const { as, asChild, ...rest } = props;

  const Element = asChild ? Slot : as || defaultElement;

  return <Element ref={ref} {...rest} />;
});

export { Box, type BoxProps };
