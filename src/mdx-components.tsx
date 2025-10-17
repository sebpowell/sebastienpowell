import { mdxComponents } from "@/components/elements/Markdown/components";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return mdxComponents(components);
}
