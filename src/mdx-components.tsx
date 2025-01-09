import { Link } from "@/components/elements/Link";
import { Paragraph } from "@/components/elements/Paragraph";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: (props) => {
      const { href, children } = props;

      return (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-strong"
        >
          {children}
        </Link>
      );
    },
    p: (props) => <Paragraph {...props} />,
    ...components,
  };
}
