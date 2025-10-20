import { Box, BoxProps } from "@/components/elements/Box";

import { Separator } from "@/components/elements/Separator";
import { ComponentType, createElement } from "react";
import { Post } from "@/lib/posts";
import { Container } from "@/components/elements/Container";
import { BlogPostHeader } from "@/components/pages/BlogPost/BlogPostHeader";
import { BlogPostFooter } from "@/components/pages/BlogPost/BlogPostFooter";

export const BlogPost = (props: {
  post: Post & {
    source: ComponentType<{}>;
    previousPost: Post | null;
    nextPost: Post | null;
  };
}) => {
  const { post } = props;

  const { source, previousPost, nextPost } = post;

  return (
    <Box className="w-full py-24">
      <Container className="space-y-6">
        <BlogPostHeader title={post.title} date={post.date} readingTime={0} />
        <Box className="space-y-6">
          <Box as="main" className="markdown">
            {createElement(source)}
          </Box>

          {(previousPost || nextPost) && (
            <>
              <Separator />
              <BlogPostFooter previousPost={previousPost} nextPost={nextPost} />
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};
