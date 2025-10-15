import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import rehypeHighlight from "rehype-highlight";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug", rehypeHighlight],
  },
});

export default withMDX(nextConfig);
