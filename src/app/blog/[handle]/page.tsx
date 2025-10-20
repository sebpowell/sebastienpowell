import { BlogArticleRouteParams } from "@/app/blog/[handle]/routeType";
import { BlogPost } from "@/components/pages/BlogPost";
import { postsService } from "@/lib/posts";
import { Metadata } from "next";
import { $path } from "next-typesafe-url";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await postsService.getAllPosts();

  return posts.map((post) => ({
    handle: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<BlogArticleRouteParams>;
}): Promise<Metadata> {
  const { handle } = await params;

  const metadata = await postsService.getBlogPostMetadata(handle);

  if (!metadata) {
    notFound();
  }

  const { title } = metadata;

  return {
    title: `${title}`,
    openGraph: {
      type: "website",
      url: $path({
        route: "/blog/[handle]",
        routeParams: {
          handle,
        },
      }),
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

  const BlogMarkdown = dynamic(
    () => import("@/content/posts/" + handle + ".mdx"),
  );

  if (!BlogMarkdown) return notFound();

  const [metadata, previousPost, nextPost] = await Promise.all([
    postsService.getBlogPostMetadata(handle),
    postsService.getPreviousPost(handle),
    postsService.getNextPost(handle),
  ]);

  return (
    <BlogPost
      post={{
        ...metadata,
        source: BlogMarkdown,
        previousPost,
        nextPost,
      }}
    />
  );
}
