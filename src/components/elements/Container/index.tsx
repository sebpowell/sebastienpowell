import { Box, BoxProps } from "@/components/elements/Box";
import { cn } from "@/utils/cn.util";
import { cva, VariantProps } from "class-variance-authority";

const containerVariants = cva("mx-auto w-full lg:px-8 px-4", {
  variants: {
    variant: {
      default: "max-w-[680px]",
      lg: "max-w-[1440px]"
    },
  },
});

type ContainerProps = BoxProps & VariantProps<typeof containerVariants>;

const Container = (props: ContainerProps) => {
  const { className, variant = "default", ...rest } = props;

  return (
    <Box className={cn(containerVariants({ variant }), className)} {...rest} />
  );
};

export { Container };
