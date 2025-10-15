"use client";
import { TapScale } from "@/components/elements/Animations/Tap";
import { Box, BoxProps } from "@/components/elements/Box";
import { Heading } from "@/components/elements/Heading";

import { Post, PostBase } from "@/interfaces/post.type";
import { cn } from "@/utils/cn.util";
import { useClickSound } from "@/utils/useClickSound";
import { $path } from "next-typesafe-url";
import Link from "next/link";

export const HoverEffect = (props: BoxProps) => {
  const { className, ...rest } = props;

  return (
    <Box
      className={cn(
        "absolute -inset-x-2 -inset-y-2 z-0 scale-95 bg-zinc-700 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:rounded-2xl",
        className,
      )}
      {...rest}
    />
  );
};


const ArticleListItem = (props: { article: Post }) => {
  const { article } = props;

  const [play] = useClickSound();

  return (
    <Box className="group relative" onClick={() => play()}>
      <HoverEffect />
      <Box className="relative">
        <Box className="aspect-[4/3] rounded-[8px] bg-bg-background-tertiary" />
        <Box className="p-3 pb-2">
          <Heading as="h3" size="h3" className="text-text-strong">
            {article.title}
          </Heading>
          <Box>Date</Box>
        </Box>
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
