import { Box, BoxProps } from "@/components/elements/Box";
import { Heading } from "@/components/elements/Heading";
import { mdxComponents } from "@/components/elements/Markdown/components";
import { Post, PostBase } from "@/interfaces/post.type";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import rehypePrism from "rehype-prism-plus";
import rehypeHighlightLines from "rehype-highlight-code-lines";
import Link from "next/link";
import { cn } from "@/utils/cn.util";
import { Undo2 } from "lucide-react";
import { $path } from "next-typesafe-url";
import { Separator } from "@/components/elements/Separator";
import { createElement } from "react";

const BlogPostHeader = (props: {
  title: string;
  date: string;
  readingTime: number;
}) => {
  const { title, date, readingTime } = props;

  return (
    <Box as="header" className="space-y-6">
      <Link href="/">
        <Box className="flex size-10 items-center justify-center rounded-full border">
          <Undo2 className="size-4" />
        </Box>
      </Link>
      <Heading as="h1" size="h1" className="text-2xl text-text-strong">
        {title}
      </Heading>
    </Box>
  );
};

const BlogPostNavigation = (
  props: BoxProps & { title: string; label: string },
) => {
  const { className, title, label, ...rest } = props;

  return (
    <Box
      className={cn("flex flex-col justify-between space-y-2", className)}
      {...rest}
    >
      <Box className="text-sm font-medium leading-none text-text-muted">
        {label}
      </Box>
      <Box className="text-strong text-sm font-medium leading-none">
        {title}
      </Box>
    </Box>
  );
};

const BlogPostFooter = (props: {
  previousPost: PostBase | null;
  nextPost: PostBase | null;
}) => {
  const { previousPost, nextPost } = props;

  return (
    <Box
      as="footer"
      className={cn(
        "flex items-center",
        previousPost && nextPost ? "justify-between" : "justify-end",
      )}
    >
      {previousPost && (
        <Link
          href={$path({
            route: "/blog/[handle]",
            routeParams: { handle: previousPost.slug },
          })}
        >
          <BlogPostNavigation title={previousPost.title} label="Previous" />
        </Link>
      )}
      {nextPost && (
        <Link
          href={$path({
            route: "/blog/[handle]",
            routeParams: { handle: nextPost.slug },
          })}
        >
          <BlogPostNavigation
            title={nextPost.title}
            label="Next"
            className="text-right"
          />
        </Link>
      )}
    </Box>
  );
};

export const BlogPost = (props: { post: Post }) => {
  const { post } = props;

  const { source, previousPost, nextPost } = post;

  return (
    <Box className="w-full space-y-6 py-24">
      <BlogPostHeader title={post.title} date={post.date} readingTime={0} />
      <Box className="space-y-12">
        <Box as="main" className="markdown">

          {createElement(source)}
          {/* <MDXRemote
            source={source}
            components={mdxComponents({})}
            options={{
              parseFrontmatter: true,
              mdxOptions: {
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
            }}
          /> */}
        </Box>
        <Separator />
        <BlogPostFooter previousPost={previousPost} nextPost={nextPost} />
      </Box>
    </Box>
  );
};
