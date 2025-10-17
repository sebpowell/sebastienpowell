"use client";

import { Box } from "@/components/elements/Box";
import { useEffect, useRef, useState } from "react";
import { useCopyToClipboard, useTimeoutFn, useToggle } from "react-use";
import "../../../styles/code.scss";

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

  const maxHeight = 500;

  const [state, copyToClipboard] = useCopyToClipboard();

  const [showTick, setShowTick] = useState(false);

  const [, , resetTimeout] = useTimeoutFn(() => setShowTick(false), 1000);

  useEffect(() => {
    if (state.value) {
      setShowTick(true);
    }
  }, [state]);

  const handleClick = () => {
    copyToClipboard(preRef?.current?.textContent || "");
    resetTimeout();
  };

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
    <Box className="relative rounded-2xl border bg-background-surface p-[3px] pt-0 dark">
      <Box
        as="header"
        className="flex items-center justify-between px-3 py-2 text-xs"
      >
        <Box className="text-text-muted">{language}</Box>
        <Box
          as="button"
          className="rounded-full bg-background-surface-interactive px-2.5 py-1.5 leading-none text-text-muted hover:text-text-strong"
          onClick={handleClick}
        >
          {showTick ? "Copied!" : "Copy"}
        </Box>
      </Box>
      <Box className="relative overflow-hidden rounded-[12px] border bg-background-default">
        <Box
          as="pre"
          ref={preRef}
          className="code relative overflow-scroll whitespace-pre bg-background-surface-subtle p-3 text-[13px]"
          style={{ maxHeight: isExpanded ? "none" : maxHeight }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export { MarkdownCodeBlock };
