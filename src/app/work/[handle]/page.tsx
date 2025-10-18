import { BlogArticleRouteParams } from "@/app/blog/[handle]/routeType";
import { Box } from "@/components/elements/Box";
import { Container } from "@/components/elements/Container";
import { WorkSampleContent } from "@/components/elements/WorkSampleContent";
import { workService } from "@/lib/work";
import { Metadata } from "next";

import { $path } from "next-typesafe-url";
import dynamic from "next/dynamic";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await workService.getAllEntries();

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

  const metadata = await workService.getEntryMetadata(handle);

  if (!metadata) {
    notFound();
  }

  const { title } = metadata;

  return {
    title: `${title} | Sebastien Powell`,
    twitter: {
      card: "summary_large_image",
    },
    openGraph: {
      type: "website",
      url: $path({
        route: "/work/[handle]",
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

  const Work = dynamic(() => import("@/content/work/" + handle + ".mdx"));

  if (!Work) return notFound();

  const metadata = await workService.getEntryMetadata(handle);

  return (
    <WorkSampleContent
      work={{
        ...metadata,
      }}
    >
      <Work />
    </WorkSampleContent>
  );
}
