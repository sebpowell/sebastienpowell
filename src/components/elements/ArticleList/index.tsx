"use client";
import { TapScale } from "@/components/elements/Animations/Tap";
import { Box, BoxProps } from "@/components/elements/Box";
import { Heading } from "@/components/elements/Heading";
import { Post } from "@/interfaces/post.type";
import { cn } from "@/utils/cn.util";
import { useClickSound } from "@/utils/useClickSound";
import { $path } from "next-typesafe-url";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "date-fns";
import { HoverEffect } from "@/components/elements/Hover";

const ArticleListItem = (props: { article: Post }) => {
  const { article } = props;

  

  const { title, date } = article;

  const [play] = useClickSound();

  return (
    <Box className="group relative" onClick={() => play()}>
      <HoverEffect className="-inset-x-4 -inset-y-4 rounded-lg bg-background-surface-interactive" />
      <Box className="relative flex w-full items-center justify-between">
        <Heading
          as="h3"
          size="h3"
          className="font-normal leading-none text-text-strong"
        >
          {article.title}
        </Heading>
        {/* <div className="leading-none">{formatDate(date, "MMM d, yyyy")}</div> */}
      </Box>
    </Box>
  );
};

export const ArticleList = (props: { articles: Post[] }) => {
  const { articles = [] } = props;

  return (
    <Box className="space-y-8">
      {articles.map((article) => {
        return (
          <Link
            href={$path({
              route: "/blog/[handle]",
              routeParams: { handle: article.slug },
            })}
            key={article.slug}
            className="block"
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
