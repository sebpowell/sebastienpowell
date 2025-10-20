import Link from "next/link";
import { cn } from "@/utils/cn.util";
import { $path } from "next-typesafe-url";
import { Box, BoxProps } from "@/components/elements/Box";
import { Post } from "@/lib/posts";

const BlogPostNavigation = (
  props: BoxProps & { title: string; label: string },
) => {
  const { className, title, label, ...rest } = props;

  return (
    <Box
      className={cn("group flex flex-col justify-between space-y-2", className)}
      {...rest}
    >
      <Box className="text-sm font-medium leading-none text-text-muted transition-colors group-hover:text-text-strong">
        {label}
      </Box>
      <Box className="text-sm font-medium leading-none text-text-muted transition-colors group-hover:text-text-strong">
        {title}
      </Box>
    </Box>
  );
};

export const BlogPostFooter = (props: {
  previousPost: Post | null;
  nextPost: Post | null;
}) => {
  const { previousPost, nextPost } = props;

  return (
    <Box
      as="footer"
      className={cn("flex items-center", {
        "justify-between": previousPost && nextPost,
        "justify-end": !previousPost && nextPost,
      })}
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
