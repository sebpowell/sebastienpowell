import { Box, BoxProps } from "@/components/elements/Box";
import { MarkdownCodeBlock } from "@/components/elements/Markdown/Code";
import { Paragraph } from "@/components/elements/Paragraph";
import { Dropzone } from "@/content/components/Dropzone";
import { generateId } from "@/utils/generateId.util";
import { isExternalLink } from "@/utils/isExternalLink.util";
import { MDXComponents } from "mdx/types";
import { HTMLMotionProps, motion } from "motion/react";
import Link from "next/link";
import { PropsWithChildren } from "react";



export const mdxComponents = (components: MDXComponents): MDXComponents => {
  return {
    a: (props) => {
      const { href, ...rest } = props;

      if (isExternalLink(href)) {
        return (
          <Box
            as="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            {...rest}
          />
        );
      }

      return <Link as="a" href={href} {...rest} />;
    },
    h2: ({ children, ...props }) => {
      const id = generateId(String(children) || "");

      return (
        <Box as="h2" id={id} {...props}>
          {children}
        </Box>
      );
    },
    h3: ({ children, ...props }) => {
      const id = generateId(String(children) || "");

      return (
        <Box as="h3" id={id} {...props}>
          {children}
        </Box>
      );
    },
    pre: (props) => {


      console.log(props);
      return <MarkdownCodeBlock {...props} />;
    },
    p: (props) => {
      return <Paragraph {...props} />;
    },

    Dropzone,
  };
};
