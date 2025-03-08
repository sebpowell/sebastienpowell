import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Paragraph } from "@/components/elements/Paragraph";
import { MarkdownCodeBlock } from "@/components/elements/Markdown/Code";
import "./styles.scss";

type MarkdownProps = {
  content: string;
};

const Markdown = (props: MarkdownProps) => {
  const { content = "", ...rest } = props;

  return (
    <ReactMarkdown
      className="markdown"
      remarkPlugins={[remarkGfm]}
      components={{
        pre: (props) => {
          return <MarkdownCodeBlock {...props} />;
        },
        p: (props) => {
          return <Paragraph {...props} />;
        },
      }}
      {...rest}
    >
      {content}
    </ReactMarkdown>
  );
};

export { Markdown };
