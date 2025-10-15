// "use client";
import { Box } from "@/components/elements/Box";
import { Heading } from "@/components/elements/Heading";
import { mdxComponents } from "@/components/elements/Markdown/components";
import { Post } from "@/interfaces/post.type";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import Link from "next/link";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

const BlogPostHeader = (props: {
  title: string;
  date: string;
  readingTime: number;
}) => {
  const { title, date, readingTime } = props;

  return (
    <Box as="header" className="space-y-6">
      <Link
        href="/blog"
        className="inline-flex size-10 items-center justify-center gap-1 rounded-full border"
      >
        <ArrowLeft className="size-3" />
      </Link>
      <Heading as="h1" size="h1" className="text-text-strong">
        {title}
      </Heading>
    </Box>
  );
};

export const BlogPost = (props: { post: Post }) => {
  const { post } = props;

  const { source } = post;

  return (
    <article className="markdown w-full">
      <BlogPostHeader title={post.title} date={post.date} readingTime={0} />

      <Box as="main" className="markdown">
        <MDXRemote
          source={source}
          components={mdxComponents({})}
          options={{
            parseFrontmatter: true,
            mdxOptions: {
              rehypePlugins: [rehypeSlug, rehypeHighlight],
            },
          }}
        />
      </Box>
      {/* {nextPost && <Box>Next</Box>} */}
      {/* {previousPost && <Box>Prev</Box>} */}
    </article>
    // </BlogPostContext>
  );
};
