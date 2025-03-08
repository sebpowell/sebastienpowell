"use client";
import {
  CodeBlockBody,
  CodeBlockContainer,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/elements/Codeblock";
import { CopyToClipboard } from "@/components/elements/CopyToClipboard";
import { useRef } from "react";

const MarkdownCodeBlock = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >,
) => {
  const { children, className } = props;
  const ref = useRef<HTMLPreElement>(null);

  const language = /language-(\w+)/.exec(className || "")?.[1] ?? null;

  return (
    <CodeBlockContainer>
      <CodeBlockHeader>
        <CodeBlockTitle language={language} />
        <CopyToClipboard textContentRef={ref} />
      </CodeBlockHeader>
      <CodeBlockBody ref={ref}>{children}</CodeBlockBody>
    </CodeBlockContainer>
  );
};

export { MarkdownCodeBlock };
