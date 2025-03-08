import { Box, type BoxProps } from "@/components/elements/Box";
import { cn } from "@/utils/cn.util";
import highlight from "highlight.js";
import "./styles.scss";
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

type CodeBlockContainerProps = BoxProps;

const CodeBlockContainer = (props: CodeBlockContainerProps) => {
  const { className, ...rest } = props;

  return (
    <Box
      className={cn(
        `border`,
        className,
      )}
      {...rest}
    />
  );
};

type CodeBlockBodyProps = BoxProps<"pre">;
const CodeBlockBody = forwardRef<HTMLPreElement, CodeBlockBodyProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    // NOTE: important to keep the 'codeblock' class here to ensure code is properly formatted.
    // this will take care of formatting the code both in markdown blocks and the editor.
    return (
      <Box
        as="pre"
        ref={ref}
        className={cn(
          "codeblock overflow-x-auto p-4 text-sm text-white",
          className,
        )}
        {...rest}
      />
    );
  },
);

export { CodeBlockContainer, CodeBlockBody, CodeBlockHeader, CodeBlockTitle };

