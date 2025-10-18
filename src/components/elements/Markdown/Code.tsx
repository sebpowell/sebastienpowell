"use client";

import { Box } from "@/components/elements/Box";
import { useEffect, useRef, useState } from "react";
import { useCopyToClipboard, useTimeoutFn, useToggle } from "react-use";
import "../../../styles/code.scss";
import { cn } from "@/utils/cn.util";

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

  const maxHeight = 300;

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
        <Box onClick={() => setIsExpanded(false)}>
          Collapse
        </Box>
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
          className={cn(
            "code relative whitespace-pre bg-background-surface-subtle text-[13px]",
            isExpanded ? "" : `overflow-hidden`,
          )}
          style={{ maxHeight: isExpanded ? "none" : maxHeight }}
        >
          {children}
        </Box>
        {!isExpanded && (
          <Box
            onClick={() => setIsExpanded(true)}
            className="tet-center absolute bottom-0 left-0 right-0 flex h-16 items-center justify-center bg-gradient-to-t from-background-surface-subtle to-transparent text-sm"
          >
            Expand
          </Box>
        )}
      </Box>
    </Box>
  );
};

export { MarkdownCodeBlock };
