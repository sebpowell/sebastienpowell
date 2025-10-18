import { Box, BoxProps } from "@/components/elements/Box";
import { cn } from "@/utils/cn.util";
import { cva } from "class-variance-authority";

type ContainerProps = BoxProps;

const containerVariants = cva("mx-auto w-full max-w-[680px] px-4", {
  variants: {
    variant: {
      default: "",
    },
  },
});

const Container = (props: ContainerProps) => {
  const { className, ...rest } = props;

  return (
    <Box
      className={cn("mx-auto w-full max-w-[680px] px-4", className)}
      {...rest}
    />
  );
};

export { Container };
