import { ArticleList } from "@/components/elements/ArticleList";
import { Heading } from "@/components/elements/Heading";
import { Post } from "@/lib/posts";

type BlogIndexProps = {
  posts: Post[];
};

export const BlogIndex = (props: BlogIndexProps) => {
  const { posts = [] } = props;

  return (
    <div className="space-y-8">
      <Heading as="h1" size="h1" className="text-center text-text-strong">
        Blog
      </Heading>
      <ArticleList articles={posts} />
    </div>
  );
};
