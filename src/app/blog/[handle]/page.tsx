import { BlogArticleRouteParams } from "@/app/blog/[handle]/routeType";
import { BlogPost } from "@/components/pages/BlogPost";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { Metadata } from "next";
import { $path } from "next-typesafe-url";
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

  const post = await getPostBySlug(handle);

  if (!post) {
    notFound();
  }

  const { title } = post;

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

  const post = await getPostBySlug(handle);

  if (!post) return notFound();


  console.log(post)

  return <BlogPost post={post} />;
}
