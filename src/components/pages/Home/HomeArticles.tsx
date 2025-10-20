import { ArticleList } from "@/components/elements/ArticleList";
import { Box } from "@/components/elements/Box";
import { Post } from "@/lib/posts";

export const HomeArticles = ({ articles }: { articles: Post[] }) => {
  return (
    <Box className="pt-4">
      <ArticleList articles={articles} />
    </Box>
  );
};
