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

export const HoverEffect = (props: BoxProps) => {
  const { className, ...rest } = props;

  return (
    <Box
      className={cn(
        "absolute z-0 scale-95 opacity-0 transition group-hover:scale-100 group-hover:opacity-100",
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
    <Box
      className="group relative "
      onClick={() => play()}
    >
      <HoverEffect className="bg-background-surface-interactive -inset-3 rounded-lg" />
      <Box className="flex w-full items-center gap-x-6 relative">
        <Box className="aspect-[4/3] w-[200px] bg-neutral-800" />
        <Box className="relative">
          <Box className="space-y-4">
            <Box className="space-y-2">
              <div>Dec 13, 2025</div>
              <Heading as="h3" size="h3" className="text-text-strong">
                {article.title}
              </Heading>
            </Box>
            <div>Summary</div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const ArticleList = (props: { articles: Post[] }) => {
  const { articles = [] } = props;

  return (
    <Box className="space-y-2">
      {articles.map((article) => {
        return (
          <Link
            href={$path({
              route: "/blog/[handle]",
              routeParams: { handle: article.slug },
            })}
            key={article.slug}
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
