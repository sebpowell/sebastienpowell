import { Box, BoxProps } from "@/components/elements/Box";
import { cn } from "@/utils/cn.util";
import { Undo2 } from "lucide-react";

type IconButtonProps = BoxProps;


export const IconButton = (props: IconButtonProps) => {
  const { className, ...rest } = props;

  return (
    <Box
      className={cn(
        "hover:bg-background-surface-interactive-hover flex size-10 items-center justify-center rounded-full bg-background-surface-interactive",
        className,
      )}
      {...rest}
    >
      <Undo2 className="size-4" />
    </Box>
  );
};
