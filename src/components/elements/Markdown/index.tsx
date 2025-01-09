import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Paragraph } from "@/components/elements/Paragraph";

type MarkdownProps = {
  content: string;
};

const Markdown = (props: MarkdownProps) => {
  const { content = "", ...rest } = props;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
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
