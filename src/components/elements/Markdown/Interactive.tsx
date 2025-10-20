import { Box, BoxProps } from "@/components/elements/Box";
import { cn } from "@/utils/cn.util";

export const Interactive = (props: BoxProps) => {
  const { className, ...rest } = props;

  return (
    <Box
      className={cn(
        "flex w-full rounded-2xl border bg-background-surface-subtle text-text-body dark",
        className,
      )}
      {...rest}
    />
  );
};
