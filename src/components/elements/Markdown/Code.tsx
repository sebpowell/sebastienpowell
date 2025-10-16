"use client";

import { Box } from "@/components/elements/Box";
import "highlight.js/styles/stackoverflow-dark.css";
import { useEffect, useRef, useState } from "react";
import { useToggle } from "react-use";

const MarkdownCodeBlock = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >,
) => {
  const { children, className } = props;
  const preRef = useRef<HTMLPreElement>(null);

  const [isExpanded, setIsExpanded] = useToggle(false);

  const [isTruncated, setIsTruncated] = useToggle(false);

  const language = /language-(\w+)/.exec(className || "")?.[1] ?? null;

  const maxHeight = 200;

  useEffect(() => {
    const checkHeight = () => {
      if (preRef.current) {
        const actualHeight = preRef.current.scrollHeight;
        setIsTruncated(actualHeight > maxHeight);
      }
    };

    checkHeight();

    const timeoutId = setTimeout(checkHeight, 100);

    return () => clearTimeout(timeoutId);
  }, [children]);

  return (
    <Box className="bg-background-secondary relative rounded-2xl p-[3px] pt-0 border">
      <Box
        as="header"
        className="flex items-center justify-between px-3 py-2.5 text-xs"
      >
        <Box>{language}</Box>
        <Box>Copy</Box>
      </Box>
      <Box className="relative overflow-hidden rounded-[12px] border bg-bg-page">
        <Box
          as="pre"
          ref={preRef}
          className="relative overflow-scroll bg-background-surface-subtle py-3 text-[13px]"
          style={{ maxHeight: isExpanded ? "none" : maxHeight }}
        >
          {children}
        </Box>

        <div
          className="absolute bottom-0 right-0 w-full bg-gradient-to-t from-bg-page to-bg-page/0 p-4 text-center text-sm text-text-strong"
          onClick={() => setIsExpanded()}
        >
          Expand
        </div>
      </Box>
    </Box>
  );
};

export { MarkdownCodeBlock };
