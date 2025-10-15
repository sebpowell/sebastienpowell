"use client";

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

  const maxHeight = 300;

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
    <pre ref={preRef} className="relative rounded-xl border text-sm overflow-hidden">
      <div
        className="overflow-scroll"
        style={{ maxHeight: isExpanded ? "none" : maxHeight }}
      >
        {children}
      </div>

      <div
        className="absolute bottom-0 right-0 w-full bg-gradient-to-t from-bg-page to-bg-page/0 p-4 text-center text-sm text-text-strong"
        onClick={() => setIsExpanded()}
      >
        Expand
      </div>
    </pre>
  );
};

export { MarkdownCodeBlock };
