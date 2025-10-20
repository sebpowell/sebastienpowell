import { Box, BoxProps } from "@/components/elements/Box";
import { cn } from "@/utils/cn.util";

export const HoverEffect = (props: BoxProps) => {
  const { className, ...rest } = props;

  return (
    <Box
      className={cn(
        "absolute z-0 scale-95 opacity-0 transition group-hover:scale-100 group-hover:opacity-100",
        className,
      )}
      {...rest}
    />
  );
};
