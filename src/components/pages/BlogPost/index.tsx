import { Box } from "@/components/elements/Box";
import { Heading } from "@/components/elements/Heading";
import { mdxComponents } from "@/components/elements/Markdown/components";
import { Post } from "@/interfaces/post.type";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import rehypePrism from "rehype-prism-plus";
import rehypeHighlightLines from "rehype-highlight-code-lines";

const BlogPostHeader = (props: {
  title: string;
  date: string;
  readingTime: number;
}) => {
  const { title, date, readingTime } = props;

  return (
    <Box as="header" className="space-y-6">
      <Heading as="h1" size="h1" className="text-2xl text-text-strong">
        {title}
      </Heading>
    </Box>
  );
};

export const BlogPost = (props: { post: Post }) => {
  const { post } = props;

  const { source } = post;

  return (
    <Box className="w-full space-y-6">
      <BlogPostHeader title={post.title} date={post.date} readingTime={0} />
      <Box as="main" className="markdown">
        <MDXRemote
          source={source}
          components={mdxComponents({})}
          options={{
            parseFrontmatter: true,
            mdxOptions: {
              rehypePlugins: [
                [
                  rehypePrism,
                  {
                    showLineNumbers: false,
                    ignoreMissing: true,
                    plugins: ["line-numbers", "show-language"],
                  },
                ],
                rehypeHighlightLines,
              ],
            },
          }}
        />
      </Box>
    </Box>
  );
};
