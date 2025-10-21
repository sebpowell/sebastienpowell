import { Box, BoxProps } from "@/components/elements/Box";
import { cn } from "@/utils/cn.util";
import { cva, VariantProps } from "class-variance-authority";

type HeadingProps = {
  as: "h1" | "h2" | "h3" | "h4";
} & Omit<BoxProps<"h1" | "h2" | "h3" | "h4">, "as"> &
  VariantProps<typeof headingStyles>;

const headingStyles = cva(["font-semibold"], {
  variants: {
    size: {
      h1: "text-xl",
      h2: "text-lg",
      h3: "text-base",
      h4: "text-sm",
    },
  },
});

const Heading = (props: HeadingProps) => {
  const { as, size, className, ...rest } = props;

  return (
    <Box as={as} className={cn(headingStyles({ size }), className)} {...rest} />
  );
};

export { Heading, type HeadingProps };
