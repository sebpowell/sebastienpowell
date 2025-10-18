import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import rehypePrism from "rehype-prism-plus";
import rehypeHighlightLines from "rehype-highlight-code-lines";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [
      [
        rehypePrism,
        {
          showLineNumbers: true,
          ignoreMissing: true,
          plugins: ["line-numbers", "show-language"],
        },
      ],
      rehypeHighlightLines,
    ],
  },
});

export default withMDX(nextConfig);
