import { HomePage } from "@/components/pages/Home";
import { postsService } from "@/lib/posts";
import { workService } from "@/lib/work";

export default async function Home() {
  const [articles, work] = await Promise.all([
    postsService.getAllPosts(),
    workService.getAllEntries(),
  ]);

  return <HomePage articles={articles} work={work} />;
}
