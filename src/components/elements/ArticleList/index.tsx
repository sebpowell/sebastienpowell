"use client";
import { Box } from "@/components/elements/Box";
import { Heading } from "@/components/elements/Heading";
import { TapScale } from "@/components/elements/Markdown/components";
import { Post, PostBase } from "@/interfaces/post.type";
import { useClickSound } from "@/utils/useClickSound";
import { $path } from "next-typesafe-url";
import Link from "next/link";

const ArticleListItem = (props: { article: Post }) => {
  const { article } = props;

  const [play] = useClickSound();

  return (
    <Box
      className="bg-bg-background-secondary rounded-xl p-1"
      onClick={() => play()}
    >
      <Box className="bg-bg-background-tertiary aspect-[4/3] rounded-[8px]" />
      <Box className="p-3 pb-2">
        <Heading as="h3" size="h3" className="text-text-strong">
          {article.title}
        </Heading>
        <Box>Date</Box>
      </Box>
    </Box>
  );
};

export const ArticleList = (props: { articles: Post[] }) => {
  const { articles = [] } = props;

  return (
    <Box className="grid grid-cols-12 gap-6">
      {articles.map((article) => {
        return (
          <Link
            href={$path({
              route: "/blog/[handle]",
              routeParams: { handle: article.slug },
            })}
            key={article.slug}
            className="col-span-6"
          >
            <TapScale>
              <ArticleListItem article={article} />
            </TapScale>
          </Link>
        );
      })}
    </Box>
  );
};
