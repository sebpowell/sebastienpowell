import { ArticleList } from "@/components/elements/ArticleList";
import { Heading } from "@/components/elements/Heading";
import { Post } from "@/interfaces/post.type";

type BlogIndexProps = {
  posts: Post[];
};

export const BlogIndex = (props: BlogIndexProps) => {
  const { posts = [] } = props;

  console.log(posts);

  return (
    <div className="space-y-8">
      <Heading as="h1" size="h1" className="text-center text-text-strong">
        Blog
      </Heading>
      <ArticleList articles={posts} />
    </div>
  );
};
