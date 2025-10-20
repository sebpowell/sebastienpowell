import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import rehypePrism from "rehype-prism-plus";
import rehypeHighlightLines from "rehype-highlight-code-lines";
import rehypeUnwrapImages from "rehype-unwrap-images";
import { rehypeCodeTitles } from "./src/lib/markdown/rehype-code-titles";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [
      rehypeCodeTitles,
      [
        rehypePrism,
        {
          showLineNumbers: true,
          ignoreMissing: true,
          plugins: ["line-numbers", "show-language"],
        },
      ],
      rehypeUnwrapImages,
      rehypeHighlightLines,
    ],
  },
});

export default withMDX(nextConfig);
