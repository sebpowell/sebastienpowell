import { BlogArticleRouteParams } from "@/app/blog/[handle]/routeType";
import { BlogPost } from "@/components/pages/BlogPost";
import { getAllPosts, markdownProcessor } from "@/lib/posts";
import { Metadata } from "next";

import { $path } from "next-typesafe-url";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await getAllPosts();

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

  const metadata = await markdownProcessor.getBlogPostMetadata(handle);

  if (!metadata) {
    notFound();
  }

  const { title } = metadata.metadata;

  return {
    title: `${title} | Sebastien Powell`,
    twitter: {
      card: "summary_large_image",
    },
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

export default async function PostPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

  const BlogMarkdown = dynamic(
    () => import("@/content/posts/" + handle + ".mdx"),
  );

  if (!BlogMarkdown) return notFound();

  const metadata = await markdownProcessor.getBlogPostMetadata(handle);

  return (
    <BlogPost
      post={{
        title: metadata.metadata.title,
        date: "2025-10-17",
        slug: "test",
        source: BlogMarkdown,
        previousPost: null,
        nextPost: null,
        tags: [],
        capabilities: [],
      }}
    />
  );
}
