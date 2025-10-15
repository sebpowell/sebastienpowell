import { Box, type BoxProps } from "@/components/elements/Box";
import { cn } from "@/utils/cn.util";
import highlight from "highlight.js";
import { forwardRef } from "react";

type CodeHeaderTitleProps = Omit<BoxProps, "children"> & {
  language?: string | null;
};

const CodeBlockTitle = (props: CodeHeaderTitleProps) => {
  const { className, language, ...rest } = props;

  const formattedLanguaged =
    (language && highlight.getLanguage(language)?.name) || language;

  return (
    <Box className={cn("text-sm", className)} {...rest}>
      {formattedLanguaged}
    </Box>
  );
};

type CodeHeaderProps = BoxProps;

const CodeBlockHeader = (props: CodeHeaderProps) => {
  const { className, ...rest } = props;

  return (
    <Box
      className={cn(
        `flex h-8 items-center justify-between border-b px-2 text-white`,
        className,
      )}
      {...rest}
    />
  );
};

export { CodeBlockHeader, CodeBlockTitle };
