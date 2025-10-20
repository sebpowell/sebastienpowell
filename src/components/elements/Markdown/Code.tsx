"use client";

import { Box } from "@/components/elements/Box";
import { useEffect, useRef, useState } from "react";
import { useCopyToClipboard, useTimeoutFn, useToggle } from "react-use";
import "../../../styles/code.scss";
import { cn } from "@/utils/cn.util";
import { Check, Copy } from "lucide-react";

const MarkdownCodeBlock = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > & {
    "data-truncate"?: boolean;
  },
) => {
  const { children, className, ...rest } = props;

  const preRef = useRef<HTMLPreElement>(null);

  const [isExpanded, setIsExpanded] = useToggle(false);

  const language = /language-(\w+)/.exec(className || "")?.[1] ?? null;

  const maxHeight = 600;

  const [state, copyToClipboard] = useCopyToClipboard();

  const [showTick, setShowTick] = useState(false);

  const [, , resetTimeout] = useTimeoutFn(() => setShowTick(false), 1000);

  const isTruncated = rest["data-truncate"] === true;

  useEffect(() => {
    if (state.value) {
      setShowTick(true);
    }
  }, [state]);

  const handleClick = () => {
    copyToClipboard(preRef?.current?.textContent || "");
    resetTimeout();
  };

  return (
    <Box className="relative rounded-2xl border bg-background-surface p-[3px] pt-0 dark text-text-body">
      <Box
        as="header"
        className="flex items-center justify-between px-3 py-2 pr-2 text-xs"
      >
        <Box className="text-text-muted">{language}</Box>
        <Box className="flex items-center gap-2">
          {isTruncated && (
            <Box
              as="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="transition-colors hover:text-text-strong"
            >
              {isExpanded ? "Collapse" : "Expand"}
            </Box>
          )}
          <Box
            as="button"
            className="flex size-5 items-center justify-center rounded-md leading-none text-text-muted transition-colors hover:bg-background-surface-interactive hover:text-text-strong"
            onClick={handleClick}
          >
            {showTick ? (
              <Check className="size-3" />
            ) : (
              <Copy className="size-3" />
            )}
          </Box>
        </Box>
      </Box>
      <Box className="relative overflow-hidden rounded-[12px] border bg-background-default">
        <Box
          as="pre"
          ref={preRef}
          className={cn(
            "code relative whitespace-pre bg-background-surface-subtle text-[13px]",
            {
              "overflow-scroll": !isExpanded && isTruncated,
            },
          )}
          style={{ ...(isTruncated && !isExpanded && { maxHeight }) }}
        >
          {children}
        </Box>
      </Box>
      {!isExpanded && isTruncated && (
        <Box
          as="button"
          onClick={() => setIsExpanded(true)}
          className="absolute bottom-0 left-0 flex h-12 w-full items-center justify-center rounded-b-2xl bg-gradient-to-t from-background-surface-subtle to-transparent text-xs hover:text-text-strong transition-colors"
        >
          Expand
        </Box>
      )}
    </Box>
  );
};

export { MarkdownCodeBlock };
